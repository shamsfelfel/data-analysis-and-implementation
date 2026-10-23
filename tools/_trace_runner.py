"""Child-process half of tools/trace_gen.py.

Usage (always started by trace_gen.py, never by hand):

    python -P -s _trace_runner.py <spec.json> <result.json>

It compiles spec["code"] under the filename "<trace>", runs it with
sys.settrace restricted to frames of that file (so pandas / NumPy internals
never appear), and records the state of the program BEFORE every statement
and at every function return.  The result is a JSON document of steps in the
typed-value schema documented in docs/AUTHORING.md section 5.

Nothing in this file imports pandas or NumPy: it inspects them lazily through
sys.modules, only if the traced program imported them itself.
"""
import ast
import builtins
import io
import json
import re
import sys
import types

CO_NEWLOCALS = 0x2
CO_VARARGS = 0x4
CO_VARKEYWORDS = 0x8
CO_GENERATORLIKE = 0x20 | 0x80 | 0x200  # generator, coroutine, async generator

SKIP_NAMES = frozenset(["<genexpr>", "<lambda>", "<listcomp>", "<dictcomp>", "<setcomp>"])
ADDR_RE = re.compile(r" at 0x[0-9A-Fa-f]+")
MAX_EVENTS = 600000
OUT_CAP = 6000

# serialisation limits: (normal, "small" - used for call-stack arguments)
LIM = {
    "str": (200, 40),
    "list": (30, 8),
    "dict": (20, 6),
    "obj": (20, 6),
    "rows": (12, 4),
    "cols": (10, 4),
    "nd1": (24, 8),
    "ndr": (12, 4),
    "ndc": (12, 6),
    "cell": (40, 16),
}
MAX_DEPTH = 4
NODE_BUDGET = 450


class Abort(BaseException):
    """Stops the traced program (step limit / event limit)."""


class Rec(object):
    __slots__ = ("frame", "name", "fid", "func", "args", "exc", "line", "gen")

    def __init__(self, frame, name, fid, func, args, gen):
        self.frame = frame
        self.name = name
        self.fid = fid
        self.func = func
        self.args = args
        self.exc = None
        self.line = frame.f_code.co_firstlineno
        self.gen = gen


# ----------------------------------------------------------------- AST helpers

def build_line_map(tree):
    """line -> first line of the innermost statement covering it."""
    nodes = []
    for n in ast.walk(tree):
        if isinstance(n, (ast.stmt, ast.ExceptHandler)):
            end = getattr(n, "end_lineno", None) or n.lineno
            nodes.append((end - n.lineno, n.lineno, end))
    nodes.sort(key=lambda t: (-t[0], t[1]))
    lm = {}
    for _, start, end in nodes:
        for ln in range(start, end + 1):
            lm[ln] = start
    return lm


def user_assigned_names(tree):
    names = set()
    for n in ast.walk(tree):
        if isinstance(n, ast.Name) and isinstance(n.ctx, ast.Store):
            names.add(n.id)
        elif isinstance(n, ast.ExceptHandler) and n.name:
            names.add(n.name)
        elif isinstance(n, ast.Global):
            names.update(n.names)
        elif isinstance(n, (ast.FunctionDef, ast.AsyncFunctionDef, ast.ClassDef)):
            pass
    return names


# ------------------------------------------------------------- value serialiser

def short_repr(o, n=80):
    try:
        r = repr(o)
    except Exception:
        r = "<%s>" % type(o).__name__
    r = ADDR_RE.sub("", r)
    if len(r) > n:
        r = r[: n - 1] + "…"
    return r


def tname(o):
    return type(o).__name__


class Serializer(object):
    def __init__(self):
        self.budget = NODE_BUDGET
        self.path = set()
        self.small = False

    # -- entry ---------------------------------------------------------
    def top(self, o, small=False):
        self.budget = NODE_BUDGET if not small else 60
        self.path = set()
        self.small = small
        try:
            return self.ser(o, 0)
        except Exception as e:  # never let a quirky object kill the trace
            return {"t": "repr", "v": short_repr(o), "ty": tname(o)}

    def lim(self, key):
        return LIM[key][1 if self.small else 0]

    # -- scalars -------------------------------------------------------
    def ser(self, o, depth):
        self.budget -= 1
        if self.budget < 0:
            return {"t": "repr", "v": "…"}
        t = type(o)
        if o is None:
            return {"t": "none"}
        if t is bool:
            return {"t": "bool", "v": "True" if o else "False"}
        if t is int:
            return {"t": "num", "v": repr(o) if len(repr(o)) <= 40 else repr(o)[:39] + "…"}
        if t is float:
            if o != o:
                return {"t": "nan"}
            return {"t": "num", "v": repr(o)}
        if t is str:
            return self.ser_str(o)

        np = sys.modules.get("numpy")
        pd = sys.modules.get("pandas")
        if np is not None:
            if isinstance(o, np.generic):
                return self.ser_np_scalar(o, np)
            if isinstance(o, np.ndarray):
                return self.ser_ndarray(o, np, depth)
        if pd is not None:
            if isinstance(o, pd.DataFrame):
                return self.ser_df(o, pd)
            if isinstance(o, pd.Series):
                return self.ser_series(o, pd)
            if o is pd.NaT:
                return {"t": "repr", "v": "NaT", "ty": "NaTType"}
            if o is pd.NA:
                return {"t": "repr", "v": "<NA>", "ty": "NAType"}

        if isinstance(o, bool):
            return {"t": "bool", "v": "True" if o else "False"}
        if isinstance(o, (int, float)) and not isinstance(o, type):
            # int / float subclasses (enums excluded by repr check below)
            if type(o).__module__ == "builtins":
                if isinstance(o, float) and o != o:
                    return {"t": "nan"}
                return {"t": "num", "v": repr(o)}
            return {"t": "repr", "v": short_repr(o), "ty": tname(o)}
        if isinstance(o, str):
            return self.ser_str(str(o))

        if isinstance(o, (list, tuple, set, frozenset, dict)):
            return self.ser_container(o, depth)

        if isinstance(o, (types.ModuleType, types.FunctionType, types.BuiltinFunctionType,
                          types.MethodType, type)):
            return {"t": "repr", "v": short_repr(o), "ty": tname(o)}

        d = getattr(o, "__dict__", None)
        if (d is not None and type(o).__module__ == "__main__" and isinstance(d, dict)
                and not isinstance(o, BaseException)):
            return self.ser_obj(o, d, depth)

        return {"t": "repr", "v": short_repr(o), "ty": tname(o)}

    def ser_str(self, s):
        n = self.lim("str")
        if len(s) > n:
            return {"t": "str", "v": s[:n], "more": True}
        return {"t": "str", "v": s}

    def ser_np_scalar(self, o, np):
        if isinstance(o, np.bool_):
            return {"t": "bool", "v": "True" if o else "False"}
        if isinstance(o, np.integer):
            return {"t": "num", "v": str(int(o)), "ty": str(o.dtype)}
        if isinstance(o, np.floating):
            if o != o:
                return {"t": "nan"}
            v = repr(float(o)) if o.dtype.itemsize >= 8 else str(o)
            return {"t": "num", "v": v, "ty": str(o.dtype)}
        return {"t": "repr", "v": short_repr(o), "ty": str(getattr(o, "dtype", tname(o)))}

    # -- containers ----------------------------------------------------
    def ser_container(self, o, depth):
        if depth >= MAX_DEPTH:
            return {"t": "repr", "v": short_repr(o), "ty": tname(o)}
        oid = id(o)
        if oid in self.path:
            return {"t": "repr", "v": "<cycle>"}
        self.path.add(oid)
        try:
            if isinstance(o, dict):
                n = self.lim("dict")
                items = []
                for i, (k, v) in enumerate(o.items()):
                    if i >= n:
                        break
                    items.append([self.ser(k, depth + 1), self.ser(v, depth + 1)])
                r = {"t": "dict", "v": items}
                if len(o) > n:
                    r["more"] = True
                    r["n"] = len(o)
                if type(o) is not dict:
                    r["ty"] = tname(o)
                return r
            if isinstance(o, tuple) and hasattr(o, "_fields"):
                v = [[f, self.ser(x, depth + 1)] for f, x in zip(o._fields, o)]
                return {"t": "obj", "cls": tname(o), "v": v}
            kind = "list" if isinstance(o, list) else "tuple" if isinstance(o, tuple) else "set"
            n = self.lim("list")
            v = []
            for i, x in enumerate(o):
                if i >= n:
                    break
                v.append(self.ser(x, depth + 1))
            r = {"t": "list", "kind": kind, "v": v}
            if len(o) > n:
                r["more"] = True
                r["n"] = len(o)
            if type(o) not in (list, tuple, set):
                r["ty"] = tname(o)
            return r
        finally:
            self.path.discard(oid)

    def ser_obj(self, o, d, depth):
        if depth >= MAX_DEPTH:
            return {"t": "repr", "v": short_repr(o), "ty": tname(o)}
        oid = id(o)
        if oid in self.path:
            return {"t": "repr", "v": "<cycle>"}
        self.path.add(oid)
        try:
            n = self.lim("obj")
            v = []
            for name, val in list(d.items()):
                if name.startswith("_"):
                    continue
                if len(v) >= n:
                    break
                v.append([name, self.ser(val, depth + 1)])
            return {"t": "obj", "cls": tname(o), "v": v}
        finally:
            self.path.discard(oid)

    # -- numpy ---------------------------------------------------------
    def nd_elem(self, x, arr, np):
        if arr.dtype.kind == "f" and arr.dtype.itemsize < 8:
            if x != x:
                return {"t": "nan"}
            return {"t": "num", "v": str(arr.dtype.type(x))}
        return None

    def ser_ndarray(self, a, np, depth):
        shape = [int(x) for x in a.shape]
        dtype = str(a.dtype)
        if a.ndim == 0:
            return self.ser(a.item(), depth + 1)
        if a.ndim > 2 or a.dtype.kind in "OSUVmM" and a.ndim > 1:
            return {"t": "repr", "v": "ndarray shape=%s dtype=%s" % (tuple(shape), dtype), "ty": "ndarray"}
        low_prec = a.dtype.kind == "f" and a.dtype.itemsize < 8

        def conv(x):
            if low_prec:
                if x != x:
                    return {"t": "nan"}
                return {"t": "num", "v": str(a.dtype.type(x))}
            return self.ser(x, depth + 2)

        if a.ndim == 1:
            n = self.lim("nd1")
            sub = a[:n]
            vals = [conv(x) for x in (list(sub) if low_prec else sub.tolist())]
            r = {"t": "list", "kind": "ndarray", "v": vals, "shape": shape, "dtype": dtype}
            if a.shape[0] > n:
                r["more"] = True
            return r
        rl, cl = self.lim("ndr"), self.lim("ndc")
        sub = a[:rl, :cl]
        rows = []
        src = [list(r) for r in sub] if low_prec else sub.tolist()
        for row in src:
            rows.append({"t": "list", "kind": "ndarray", "v": [conv(x) for x in row]})
        r = {"t": "list", "kind": "ndarray", "v": rows, "shape": shape, "dtype": dtype}
        if a.shape[0] > rl or a.shape[1] > cl:
            r["more"] = True
        return r

    # -- pandas --------------------------------------------------------
    def cell_str(self, v, pd):
        n = self.lim("cell")
        if v is None:
            return "None"
        if v is pd.NaT:
            return "NaT"
        if v is pd.NA:
            return "<NA>"
        if isinstance(v, float) and v != v:
            return "NaN"
        if isinstance(v, tuple):
            s = ", ".join(str(x) for x in v)
        elif isinstance(v, str):
            s = v
        elif isinstance(v, (list, dict, set)):
            s = short_repr(v, n)
        else:
            s = str(v)
        s = s.replace("\n", "\\n")
        if len(s) > n:
            s = s[: n - 1] + "…"
        return s

    def fmt_series_cells(self, s, pd):
        """Strings as pandas would print them for this column."""
        kind = getattr(s.dtype, "kind", "O")
        cnt = len(s)
        if cnt == 0:
            return []
        if kind in "iufbMm" and str(s.dtype) not in ("category",):
            try:
                lines = s.to_string(index=False, header=False).split("\n")
                if len(lines) == cnt:
                    return [ln.strip() for ln in lines]
            except Exception:
                pass
        return [self.cell_str(v, pd) for v in s.tolist()]

    def label(self, x, pd):
        return self.cell_str(x, pd)

    def index_labels(self, index, pd):
        try:
            if index.nlevels > 1:
                return [self.label(x, pd) for x in index]
            return self.fmt_series_cells(pd.Series(list(index), dtype=index.dtype), pd)
        except Exception:
            return [self.label(x, pd) for x in index]

    def ser_df(self, df, pd):
        R, C = int(df.shape[0]), int(df.shape[1])
        nr, nc = self.lim("rows"), self.lim("cols")
        sub = df.iloc[:nr, :nc]
        cols = []
        for c in sub.columns:
            cols.append(" / ".join(str(x) for x in c) if isinstance(c, tuple) else str(c))
        idx = self.index_labels(sub.index, pd)
        cells = []
        for j in range(sub.shape[1]):
            cells.append(self.fmt_series_cells(sub.iloc[:, j], pd))
        rows = [[cells[j][i] for j in range(len(cells))] for i in range(sub.shape[0])]
        out = {
            "t": "df", "cols": cols, "index": idx, "rows": rows,
            "shape": [R, C], "dtypes": [str(d) for d in sub.dtypes],
            "more": bool(R > nr or C > nc),
        }
        names = [n for n in sub.index.names if n is not None]
        if names:
            out["index_name"] = " / ".join(str(n) for n in names)
        return out

    def ser_series(self, s, pd):
        n = len(s)
        nr = self.lim("rows")
        sub = s.iloc[:nr]
        idx = self.index_labels(sub.index, pd)
        out = {
            "t": "series",
            "name": None if s.name is None else (" / ".join(str(x) for x in s.name)
                                                  if isinstance(s.name, tuple) else str(s.name)),
            "index": idx, "values": self.fmt_series_cells(sub, pd), "dtype": str(s.dtype),
            "len": int(n), "more": bool(n > nr),
        }
        names = [x for x in sub.index.names if x is not None]
        if names:
            out["index_name"] = " / ".join(str(x) for x in names)
        return out


# ------------------------------------------------------------------- the tracer

class Tracer(object):
    def __init__(self, spec, tree, buf, g):
        self.max_steps = int(spec["max_steps"])
        self.buf = buf
        self.g = g
        self.watch = spec.get("watch")
        self.watch_locals = spec.get("watch_locals")
        self.viz = spec.get("viz") or {}
        self.user_names = user_assigned_names(tree)
        self.line_map = build_line_map(tree)
        self.ser = Serializer()
        self.steps = []
        self.stack = []
        self.recs = {}
        self.next_fid = 0
        self.last_key = None
        self.exc_snaps = {}
        self.events = 0
        self.last_mod_line = None
        self.mod_rec = None
        self.overflow = False

    # -- helpers -------------------------------------------------------
    def map_line(self, ln):
        return self.line_map.get(ln)

    def out_text(self):
        s = self.buf.getvalue()
        if len(s) > OUT_CAP:
            s = s[:OUT_CAP] + "\n…"
        return s

    def hidden_type(self, v):
        return isinstance(v, (types.ModuleType, types.FunctionType, types.BuiltinFunctionType,
                              types.MethodType, type))

    def ser_globals(self):
        out = {}
        watch = self.watch
        items = dict(self.g)
        if watch is not None:
            for k in watch:
                if k in items:
                    out[k] = self.ser.top(items[k])
            return out
        for k, v in items.items():
            if k.startswith("_"):
                continue
            if k not in self.user_names and k not in self.viz:
                continue
            if self.hidden_type(v) and k not in self.viz:
                continue
            out[k] = self.ser.top(v)
        return out

    def ser_locals(self, frame):
        out = {}
        try:
            loc = dict(frame.f_locals)
        except Exception:
            return out
        wl = self.watch_locals
        if wl is not None:
            for k in wl:
                if k in loc:
                    out[k] = self.ser.top(loc[k])
            return out
        for k, v in loc.items():
            if k.startswith("_") or k.startswith("."):
                continue
            if self.hidden_type(v) and k not in self.viz:
                continue
            out[k] = self.ser.top(v)
        return out

    def ser_stack(self):
        res = []
        for rec in self.stack:
            args = {}
            for name, obj in rec.args:
                args[name] = self.ser.top(obj, small=True)
            res.append({"fn": rec.name if rec.func else "<module>", "fid": rec.fid,
                        "args": args, "line": rec.line})
        return res

    def make_step(self, rec, line, kind):
        st = {
            "line": line,
            "vars": self.ser_globals(),
            "locals": self.ser_locals(rec.frame) if rec.func else None,
            "frame": rec.name if rec.func else None,
            "fid": rec.fid,
            "stack": self.ser_stack(),
            "out": self.out_text(),
            "_k": kind,
        }
        return st

    def add(self, step):
        if len(self.steps) >= self.max_steps:
            self.overflow = True
            raise Abort()
        self.steps.append(step)

    # -- sys.settrace hooks ----------------------------------------------
    def on_call(self, frame, event, arg):
        co = frame.f_code
        if co.co_filename != "<trace>":
            return None
        name = co.co_name
        func = True
        if name == "<module>":
            func = False
        elif name in SKIP_NAMES or not (co.co_flags & CO_NEWLOCALS):
            return None
        args = []
        qual = name
        if func:
            n = co.co_argcount + co.co_kwonlyargcount
            names = list(co.co_varnames[:n])
            if co.co_flags & CO_VARARGS:
                names.append(co.co_varnames[n])
                n += 1
            if co.co_flags & CO_VARKEYWORDS:
                names.append(co.co_varnames[n])
            try:
                loc = frame.f_locals
                args = [(nm, loc[nm]) for nm in names if nm in loc and nm not in ("self", "cls")]
            except Exception:
                args = []
            qual = getattr(co, "co_qualname", name).split("<locals>.")[-1]
        rec = Rec(frame, qual, self.next_fid, func, args, bool(co.co_flags & CO_GENERATORLIKE))
        self.next_fid += 1
        if not func:
            self.mod_rec = rec
        self.stack.append(rec)
        self.recs[id(frame)] = rec
        return self.on_event

    def on_event(self, frame, event, arg):
        self.events += 1
        if self.events > MAX_EVENTS:
            self.overflow = True
            raise Abort()
        rec = self.recs.get(id(frame))
        if rec is None:
            return self.on_event
        if event == "line":
            rec.exc = None
            start = self.map_line(frame.f_lineno)
            if start is None:
                return self.on_event
            rec.line = start
            if not rec.func:
                self.last_mod_line = start
            key = (id(frame), start)
            if key == self.last_key:
                return self.on_event
            self.last_key = key
            self.add(self.make_step(rec, start, "line"))
        elif event == "return":
            if rec.func and rec.exc is None and not rec.gen:
                start = self.map_line(frame.f_lineno) or rec.line
                rec.line = start
                step = self.make_step(rec, start, "ret")
                step["ret"] = self.ser.top(arg)
                self.last_key = None
                self.add(step)
            self.recs.pop(id(frame), None)
            if self.stack and self.stack[-1] is rec:
                self.stack.pop()
            elif rec in self.stack:
                self.stack.remove(rec)
        elif event == "exception":
            rec.exc = arg[1]
            eid = id(arg[1])
            if eid not in self.exc_snaps:
                start = self.map_line(frame.f_lineno) or rec.line
                rec.line = start
                try:
                    self.exc_snaps[eid] = (arg[1], self.make_step(rec, start, "err"))
                except Exception:
                    pass
        return self.on_event


# ------------------------------------------------------------------------ main

def fail(result_path, msg, **extra):
    d = {"ok": False, "message": msg}
    d.update(extra)
    with open(result_path, "w", encoding="utf-8") as f:
        json.dump(d, f)
    sys.exit(0)


def user_traceback(exc, code_lines):
    out = []
    tb = exc.__traceback__
    while tb is not None:
        if tb.tb_frame.f_code.co_filename == "<trace>":
            ln = tb.tb_lineno
            src = code_lines[ln - 1].strip() if 0 < ln <= len(code_lines) else ""
            out.append("  line %d, in %s: %s" % (ln, tb.tb_frame.f_code.co_name, src))
        tb = tb.tb_next
    return out


def main():
    spec_path, result_path = sys.argv[1], sys.argv[2]
    with open(spec_path, encoding="utf-8") as f:
        spec = json.load(f)
    code = spec["code"]
    code_lines = code.split("\n")
    try:
        tree = ast.parse(code, "<trace>", "exec")
        compiled = compile(tree, "<trace>", "exec")
    except SyntaxError as e:
        fail(result_path, "SyntaxError: %s (line %s)" % (e.msg, e.lineno))

    real_out = sys.stdout
    buf = io.StringIO()
    g = {"__name__": "__main__", "__builtins__": builtins}
    tr = Tracer(spec, tree, buf, g)

    exc = None
    sys.stdout = buf
    sys.settrace(tr.on_call)
    try:
        exec(compiled, g)
    except BaseException as e:  # noqa
        exc = e
    finally:
        sys.settrace(None)
        sys.stdout = real_out

    if tr.overflow or isinstance(exc, Abort):
        fail(result_path, "overflow", overflow=True, steps_so_far=len(tr.steps),
             events=tr.events)

    error = None
    if exc is not None and not isinstance(exc, SystemExit):
        # the step that was on screen when the exception was first raised
        snap = tr.exc_snaps.get(id(exc))
        tb_lines = user_traceback(exc, code_lines)
        msg = str(exc)
        if len(msg) > 300:
            msg = msg[:299] + "…"
        error = {"type": type(exc).__name__, "msg": msg}
        if snap is not None:
            step = snap[1]
        else:
            # raised where no user frame saw it (e.g. at module level before any step)
            mod = tr.mod_rec
            line = tr.last_mod_line or 1
            if mod is not None:
                mod.line = line
                tr.stack = [mod]
                step = tr.make_step(mod, line, "err")
            else:
                fail(result_path, "no code ran", traceback=tb_lines, error=error)
        step["error"] = error
        step["_k"] = "err"
        if len(tr.steps) >= tr.max_steps:
            fail(result_path, "overflow", overflow=True, steps_so_far=len(tr.steps), events=tr.events)
        tr.steps.append(step)
        result = {"ok": True, "steps": tr.steps, "error": error, "traceback": tb_lines}
    else:
        mod = tr.mod_rec
        if mod is None or not tr.steps:
            fail(result_path, "the program executed no statements")
        line = tr.last_mod_line or tr.steps[-1]["line"]
        mod.line = line
        tr.stack = [mod]
        end = tr.make_step(mod, line, "end")
        end["end"] = True
        if len(tr.steps) >= tr.max_steps:
            fail(result_path, "overflow", overflow=True, steps_so_far=len(tr.steps), events=tr.events)
        tr.steps.append(end)
        result = {"ok": True, "steps": tr.steps, "error": None, "traceback": []}

    with open(result_path, "w", encoding="utf-8") as f:
        json.dump(result, f)


if __name__ == "__main__":
    main()
