#!/usr/bin/env python3
"""Generate execution-trace data for the step-through widget.

    python tools/trace_gen.py [--src DIR] [--out DIR] [--check] [files...]

For every spec JSON in --src (default src/traces; names starting with "_" are
skipped) this RUNS the spec's code in CPython (a child process, 20 s timeout,
cwd = a fresh temp dir holding spec["files"]) under sys.settrace and writes
<out>/<id>.js containing

    window.DATraces = window.DATraces || {};
    window.DATraces["<id>"] = {id,title,lede,code,lang,steps:[...],viz,...};

Manual specs ("manual": true) are validated and passed through unchanged.
--check regenerates in memory and exits 1 if any output file is stale/missing.
The schema is documented in docs/AUTHORING.md section 5; deviations and
additions are listed in the "Schema as implemented" block at the bottom of
this file.
"""
import argparse
import json
import os
import re
import subprocess
import sys
import tempfile
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent
RUNNER = HERE / "_trace_runner.py"

TIMEOUT = 20
DEFAULT_MAX_STEPS = 120
HARD_MAX_STEPS = 400
ID_RE = re.compile(r"^[a-z0-9][a-z0-9_-]*$")
VIZ_KINDS = ("table", "array", "dict", "tree", "bars", "cells")
LANGS = ("python", "excel", "dax", "m", "text", "sql", "json", "bash", "csv")
NOTE_KEY_RE = re.compile(r"^(?:(\d+)(?:#(\d+))?(@ret)?|end|error)$")
CELL_RE = re.compile(r"^[A-Z]{1,3}[1-9][0-9]*(?::[A-Z]{1,3}[1-9][0-9]*)?$")
KNOWN_KEYS = {
    "id", "title", "lede", "files", "code", "notes", "watch", "watch_locals", "viz",
    "pointers", "max_steps", "manual", "steps", "lang", "expect_error", "layout", "labels",
}
LABEL_KEYS = ("vars", "globals", "stack", "out", "note")
SILENT_KEYS = {"chapter", "tags", "comment", "lesson", "$schema"}


class SpecError(Exception):
    pass


# --------------------------------------------------------------------------- io

def read_json(path):
    try:
        with open(path, encoding="utf-8") as f:
            return json.load(f)
    except json.JSONDecodeError as e:
        raise SpecError("invalid JSON: %s" % e)
    except OSError as e:
        raise SpecError("cannot read: %s" % e)


def child_env():
    env = {}
    for k, v in os.environ.items():
        ku = k.upper()
        if ku.startswith("PYTHON") or ku in ("COLUMNS", "LINES"):
            continue
        env[k] = v
    env.update({
        "PYTHONHASHSEED": "0",       # set/dict-of-str iteration order is repeatable
        "PYTHONUTF8": "1",
        "PYTHONIOENCODING": "utf-8",
        "PYTHONDONTWRITEBYTECODE": "1",
        "NO_COLOR": "1",
    })
    return env


# ---------------------------------------------------------------- validation

def is_bilingual(o):
    return (isinstance(o, dict) and isinstance(o.get("en"), str) and o["en"].strip() != ""
            and isinstance(o.get("ar"), str) and o["ar"].strip() != "")


def check_value(v, where, errs, depth=0):
    """Validate one typed value V (recursively)."""
    if depth > 12:
        errs.append("%s: value nested too deeply" % where)
        return
    if not isinstance(v, dict) or "t" not in v:
        errs.append("%s: a typed value must be an object with a 't' field, got %r" % (where, v))
        return
    t = v["t"]

    def need(key, types, what):
        if key in v and isinstance(v[key], types):
            return True
        errs.append("%s: %s needs '%s' (%s)" % (where, t, key, what))
        return False

    if t in ("num", "str", "bool"):
        if need("v", str, "a string"):
            if t == "bool" and v["v"] not in ("True", "False"):
                errs.append("%s: bool v must be 'True' or 'False'" % where)
    elif t in ("none", "nan"):
        pass
    elif t == "repr":
        need("v", str, "a string")
    elif t == "list":
        if v.get("kind") not in ("list", "tuple", "set", "ndarray"):
            errs.append("%s: list needs kind list|tuple|set|ndarray" % where)
        if need("v", list, "an array of values"):
            for i, x in enumerate(v["v"]):
                check_value(x, "%s[%d]" % (where, i), errs, depth + 1)
    elif t == "dict":
        if need("v", list, "an array of [key, value] pairs"):
            for i, pair in enumerate(v["v"]):
                if not (isinstance(pair, list) and len(pair) == 2):
                    errs.append("%s: dict entry %d must be [key, value]" % (where, i))
                    continue
                check_value(pair[0], "%s key %d" % (where, i), errs, depth + 1)
                check_value(pair[1], "%s value %d" % (where, i), errs, depth + 1)
    elif t == "obj":
        need("cls", str, "a class name")
        if need("v", list, "an array of [attr, value] pairs"):
            for i, pair in enumerate(v["v"]):
                if not (isinstance(pair, list) and len(pair) == 2 and isinstance(pair[0], str)):
                    errs.append("%s: obj entry %d must be [attr, value]" % (where, i))
                    continue
                check_value(pair[1], "%s.%s" % (where, pair[0]), errs, depth + 1)
    elif t == "df":
        ok = need("cols", list, "column names") & need("index", list, "index labels") & need(
            "rows", list, "rows of strings") & need("shape", list, "[rows, cols]") & need(
            "dtypes", list, "dtype names")
        if ok:
            nc, nr = len(v["cols"]), len(v["index"])
            if len(v["rows"]) != nr:
                errs.append("%s: df has %d index labels but %d rows" % (where, nr, len(v["rows"])))
            for r in v["rows"]:
                if not isinstance(r, list) or len(r) != nc or not all(isinstance(c, str) for c in r):
                    errs.append("%s: every df row must be %d strings" % (where, nc))
                    break
            if len(v["dtypes"]) != nc:
                errs.append("%s: df dtypes must have one entry per column" % where)
            if len(v["shape"]) != 2 or not all(isinstance(x, int) for x in v["shape"]):
                errs.append("%s: df shape must be [rows, cols] integers" % where)
    elif t == "series":
        ok = need("index", list, "index labels") & need("values", list, "strings") & need(
            "dtype", str, "dtype name")
        if ok and len(v["index"]) != len(v["values"]):
            errs.append("%s: series index and values differ in length" % where)
    elif t == "sheet":
        ok = need("rows", list, "rows of cells")
        if "cols" in v and not isinstance(v["cols"], list):
            errs.append("%s: sheet cols must be a list" % where)
        if ok:
            for r in v["rows"]:
                if not isinstance(r, list):
                    errs.append("%s: every sheet row must be a list" % where)
                    break
        for ref in v.get("hl", []):
            if not isinstance(ref, str) or not CELL_RE.match(ref):
                errs.append("%s: bad cell reference %r in hl (use e.g. B2 or B2:B4)" % (where, ref))
        if "active" in v and not (isinstance(v["active"], str) and CELL_RE.match(v["active"])):
            errs.append("%s: bad 'active' cell reference" % where)
    elif t == "flow":
        if need("nodes", list, "an array of labels"):
            if "active" in v and not (isinstance(v["active"], int) and 0 <= v["active"] < len(v["nodes"])):
                errs.append("%s: flow active index out of range" % where)
    else:
        errs.append("%s: unknown value type %r" % (where, t))


def code_lines_of(spec):
    return spec["code"].split("\n") if spec.get("code") else []


def validate_common(spec, name, errs, warns):
    for k in spec:
        if k not in KNOWN_KEYS and k not in SILENT_KEYS and not k.startswith("_"):
            warns.append("unknown top-level key %r (ignored)" % k)
    sid = spec.get("id")
    if not isinstance(sid, str) or not ID_RE.match(sid):
        errs.append("'id' must be lowercase letters/digits/-/_ (got %r)" % (sid,))
    elif sid != name:
        errs.append("'id' (%s) must equal the file name (%s.json)" % (sid, name))
    for key in ("title", "lede"):
        if not is_bilingual(spec.get(key)):
            errs.append("'%s' must be an object with non-empty 'en' and 'ar' strings" % key)
    code = spec.get("code")
    if not isinstance(code, str):
        errs.append("'code' must be a string")
    lang = spec.get("lang", "python")
    if lang not in LANGS:
        errs.append("'lang' must be one of %s" % ", ".join(LANGS))
    viz = spec.get("viz", {})
    if not isinstance(viz, dict):
        errs.append("'viz' must be an object {name: kind}")
    else:
        for k, v in viz.items():
            if v not in VIZ_KINDS:
                errs.append("viz[%r] = %r: must be one of %s" % (k, v, "|".join(VIZ_KINDS)))
    if spec.get("layout") not in (None, "side", "stack"):
        errs.append("'layout' must be 'side' (default) or 'stack'")
    labels = spec.get("labels")
    if labels is not None:
        if not isinstance(labels, dict):
            errs.append("'labels' must be an object {vars|globals|stack|out|note: {en, ar}}")
        else:
            for k, v in labels.items():
                if k not in LABEL_KEYS or not is_bilingual(v):
                    errs.append("labels[%r]: key must be one of %s with non-empty en/ar" % (k, "|".join(LABEL_KEYS)))
    ptr = spec.get("pointers")
    if ptr is not None and ptr is not False:
        if not (isinstance(ptr, dict) and all(isinstance(v, list) for v in ptr.values())):
            errs.append("'pointers' must be false or {listVar: [indexVarNames]}")
    for key in ("watch", "watch_locals"):
        w = spec.get(key)
        if w is not None and not (isinstance(w, list) and all(isinstance(x, str) for x in w)):
            errs.append("'%s' must be a list of names" % key)
    ms = spec.get("max_steps", DEFAULT_MAX_STEPS)
    if not isinstance(ms, int) or isinstance(ms, bool) or ms < 1 or ms > HARD_MAX_STEPS:
        errs.append("'max_steps' must be an integer 1..%d" % HARD_MAX_STEPS)


def validate_notes(spec, nlines, errs):
    notes = spec.get("notes", {})
    if not isinstance(notes, dict):
        errs.append("'notes' must be an object")
        return
    for k, n in notes.items():
        m = NOTE_KEY_RE.match(k)
        if not m:
            errs.append("notes key %r: use 'N', 'N#K', 'N@ret', 'end' or 'error'" % k)
            continue
        if m.group(1):
            ln = int(m.group(1))
            if not (1 <= ln <= nlines):
                errs.append("notes key %r: line %d does not exist (code has %d lines)" % (k, ln, nlines))
            if m.group(2) is not None and int(m.group(2)) < 1:
                errs.append("notes key %r: visit numbers start at 1" % k)
        if not is_bilingual(n):
            errs.append("notes[%r] needs non-empty 'en' and 'ar' strings" % k)


def validate_steps(steps, nlines, errs, manual):
    if not isinstance(steps, list) or not steps:
        errs.append("no steps")
        return
    for i, s in enumerate(steps):
        w = "step %d" % (i + 1)
        if not isinstance(s, dict):
            errs.append("%s is not an object" % w)
            continue
        ln = s.get("line")
        if ln is None:
            if not manual or nlines:
                errs.append("%s: missing 'line'" % w)
        elif not isinstance(ln, int) or isinstance(ln, bool) or not (1 <= ln <= max(nlines, 1)):
            errs.append("%s: line %r is outside the code (1..%d)" % (w, ln, nlines))
        for key in ("vars", "locals"):
            d = s.get(key)
            if d is None:
                continue
            if not isinstance(d, dict):
                errs.append("%s: '%s' must be an object {name: V}" % (w, key))
                continue
            for name, v in d.items():
                check_value(v, "%s %s.%s" % (w, key, name), errs)
        if "ret" in s:
            check_value(s["ret"], "%s ret" % w, errs)
        if s.get("note") is not None and not is_bilingual(s["note"]):
            errs.append("%s: note needs non-empty 'en' and 'ar'" % w)
        if s.get("out") is not None and not isinstance(s["out"], str):
            errs.append("%s: out must be a string" % w)
        st = s.get("stack")
        if st is not None:
            if not isinstance(st, list):
                errs.append("%s: stack must be a list" % w)
            else:
                for fr in st:
                    if not (isinstance(fr, dict) and isinstance(fr.get("fn"), str)):
                        errs.append("%s: each stack frame needs {fn, args, line}" % w)
                        break
                    for an, av in (fr.get("args") or {}).items():
                        check_value(av, "%s stack %s(%s)" % (w, fr["fn"], an), errs)
        if "error" in s and not (isinstance(s["error"], dict) and "type" in s["error"]):
            errs.append("%s: error must be {type, msg}" % w)


# ------------------------------------------------------------------- running

def run_code(spec, name):
    """Execute spec['code'] in a child process; return the runner's result dict."""
    files = spec.get("files") or {}
    if not isinstance(files, dict):
        raise SpecError("'files' must be an object {name: text}")
    with tempfile.TemporaryDirectory(prefix="trace_ctl_", ignore_cleanup_errors=True) as ctl, \
            tempfile.TemporaryDirectory(prefix="trace_run_", ignore_cleanup_errors=True) as work:
        for fname, text in files.items():
            p = Path(fname)
            if p.is_absolute() or ".." in p.parts or not isinstance(text, str):
                raise SpecError("bad entry in 'files': %r" % fname)
            dest = Path(work) / p
            dest.parent.mkdir(parents=True, exist_ok=True)
            with open(dest, "w", encoding="utf-8", newline="\n") as f:
                f.write(text)
        payload = {
            "code": spec["code"],
            "watch": spec.get("watch"),
            "watch_locals": spec.get("watch_locals"),
            "viz": spec.get("viz") or {},
            "max_steps": spec.get("max_steps", DEFAULT_MAX_STEPS),
        }
        sp = os.path.join(ctl, "spec.json")
        rp = os.path.join(ctl, "result.json")
        with open(sp, "w", encoding="utf-8") as f:
            json.dump(payload, f)
        cmd = [sys.executable, "-P", "-s", "-B", str(RUNNER), sp, rp]
        try:
            cp = subprocess.run(cmd, cwd=work, env=child_env(), stdin=subprocess.DEVNULL,
                                capture_output=True, timeout=TIMEOUT)
        except subprocess.TimeoutExpired:
            raise SpecError("the program did not finish within %d s (infinite loop? use fewer "
                            "iterations or a smaller input)" % TIMEOUT)
        if not os.path.exists(rp):
            err = cp.stderr.decode("utf-8", "replace").strip()
            raise SpecError("the runner crashed (exit %s):\n%s" % (cp.returncode, err[-1500:]))
        with open(rp, encoding="utf-8") as f:
            return json.load(f)


def attach_notes(spec, steps, warns):
    notes = spec.get("notes") or {}
    visits = {}
    used = set()
    for s in steps:
        kind = s.pop("_k", "line")
        s["note"] = None
        ln = s["line"]
        cand = []
        if kind == "line":
            visits[ln] = visits.get(ln, 0) + 1
            cand = ["%d#%d" % (ln, visits[ln]), str(ln)]
        elif kind == "ret":
            cand = ["%d@ret" % ln]
        elif kind == "end":
            cand = ["end"]
        elif kind == "err":
            cand = ["error"]
        for key in cand:
            if key in notes:
                s["note"] = {"en": notes[key]["en"], "ar": notes[key]["ar"]}
                used.add(key)
                break
    for key in notes:
        if key not in used:
            warns.append("note %r never matched a step" % key)


def build_generated(spec, name, warns):
    errs = []
    code = spec["code"].replace("\r\n", "\n").rstrip()
    spec = dict(spec)
    spec["code"] = code
    nlines = len(code.split("\n"))
    validate_notes(spec, nlines, errs)
    if spec.get("lang", "python") != "python":
        errs.append("a non-manual spec must have lang 'python' (use \"manual\": true for other languages)")
    if errs:
        raise SpecError("\n  ".join(errs))
    res = run_code(spec, name)
    if not res.get("ok"):
        if res.get("overflow"):
            ms = spec.get("max_steps", DEFAULT_MAX_STEPS)
            if res.get("steps_so_far", 0) < ms:
                raise SpecError(
                    "the program ran %d trace events without finishing (infinite loop, or a loop "
                    "that is far too long for a step-through; use a smaller input)" % res.get("events", 0))
            raise SpecError(
                "the program needs more than max_steps=%d steps (stopped after %d steps / %d "
                "events). Raise 'max_steps' (hard cap %d) or shorten the program / its loops."
                % (ms, res.get("steps_so_far", 0), res.get("events", 0), HARD_MAX_STEPS))
        tb = res.get("traceback")
        raise SpecError(res.get("message", "run failed") + ("\n" + "\n".join(tb) if tb else ""))
    err = res.get("error")
    if err and not spec.get("expect_error"):
        raise SpecError("the program raised %s: %s\n%s\n  (set \"expect_error\": true if this is "
                        "intended)" % (err["type"], err["msg"], "\n".join(res.get("traceback") or [])))
    if not err and spec.get("expect_error"):
        raise SpecError("\"expect_error\" is set but the program finished without an exception")
    steps = res["steps"]
    for s in steps:
        if not (1 <= s["line"] <= nlines):
            errs.append("internal: step line %r outside code" % s["line"])
    attach_notes(spec, steps, warns)
    validate_steps(steps, nlines, errs, manual=False)
    if errs:
        raise SpecError("\n  ".join(errs))
    out = {
        "id": spec["id"], "title": spec["title"], "lede": spec["lede"],
        "code": code, "lang": "python", "steps": steps,
        "viz": spec.get("viz") or {},
    }
    for extra in ("pointers", "layout", "labels"):
        if extra in spec:
            out[extra] = spec[extra]
    if err:
        out["expect_error"] = True
    return out


def build_manual(spec, name, warns):
    errs = []
    code = (spec.get("code") or "").replace("\r\n", "\n").rstrip()
    spec = dict(spec)
    spec["code"] = code
    nlines = len(code.split("\n")) if code else 0
    validate_notes(spec, nlines, errs)
    steps = spec.get("steps")
    validate_steps(steps, nlines, errs, manual=True)
    if errs:
        raise SpecError("\n  ".join(errs))
    norm = []
    for s in steps:
        n = {
            "line": s.get("line"),
            "vars": s.get("vars") or {},
            "locals": s.get("locals"),
            "frame": s.get("frame"),
            "stack": s.get("stack") or [],
            "out": s.get("out") or "",
            "note": s.get("note"),
        }
        for extra in ("ret", "error", "fid", "end"):
            if extra in s:
                n[extra] = s[extra]
        norm.append(n)
    out = {
        "id": spec["id"], "title": spec["title"], "lede": spec["lede"],
        "code": code, "lang": spec.get("lang", "python"), "manual": True, "steps": norm,
        "viz": spec.get("viz") or {},
    }
    for extra in ("pointers", "layout", "labels"):
        if extra in spec:
            out[extra] = spec[extra]
    return out


# ------------------------------------------------------------------ rendering

def dumps(o):
    return json.dumps(o, ensure_ascii=True, separators=(",", ":"))


def render_js(trace):
    head = {k: v for k, v in trace.items() if k != "steps"}
    steps = trace["steps"]
    head_txt = dumps(head)
    # one step per line keeps diffs readable; key order is fixed by construction
    body = ",\n".join(dumps(s) for s in steps)
    obj = head_txt[:-1] + (',"steps":[\n' if head else '"steps":[\n') + body + "\n]}"
    return ("/* generated by tools/trace_gen.py - do not edit; edit src/traces/%s.json */\n"
            "window.DATraces = window.DATraces || {};\n"
            "window.DATraces[%s] = %s;\n") % (trace["id"], dumps(trace["id"]), obj)


def read_existing(path):
    try:
        with open(path, encoding="utf-8", newline="") as f:
            return f.read()
    except OSError:
        return None


def process(path, out_dir, check):
    """Return (status, messages).  status: ok | changed | stale | error"""
    name = path.stem
    warns = []
    try:
        spec = read_json(path)
        if not isinstance(spec, dict):
            raise SpecError("the spec must be a JSON object")
        errs = []
        validate_common(spec, name, errs, warns)
        if errs:
            raise SpecError("\n  ".join(errs))
        if spec.get("manual"):
            trace = build_manual(spec, name, warns)
        else:
            trace = build_generated(spec, name, warns)
        text = render_js(trace)
    except SpecError as e:
        return "error", ["%s: %s" % (path.name, e)] + ["  warning: " + w for w in warns]
    dest = out_dir / (name + ".js")
    msgs = ["  warning: %s: %s" % (path.name, w) for w in warns]
    cur = read_existing(dest)
    if check:
        if cur is None:
            return "stale", ["%s: output missing (%s)" % (path.name, dest)] + msgs
        if cur != text:
            return "stale", ["%s: output is stale (%s)" % (path.name, dest)] + msgs
        return "ok", msgs
    if cur == text:
        return "ok", msgs
    out_dir.mkdir(parents=True, exist_ok=True)
    with open(dest, "w", encoding="utf-8", newline="\n") as f:
        f.write(text)
    return "changed", ["%s -> %s (%d steps)" % (path.name, dest, len(trace["steps"]))] + msgs


def main(argv=None):
    ap = argparse.ArgumentParser(description="Generate execution traces by running the spec code in CPython.")
    ap.add_argument("--src", default=str(ROOT / "src" / "traces"))
    ap.add_argument("--out", default=str(ROOT / "assets" / "data" / "traces"))
    ap.add_argument("--check", action="store_true", help="exit 1 if any output is stale or missing")
    ap.add_argument("files", nargs="*", help="spec files (default: every *.json in --src)")
    a = ap.parse_args(argv)
    src, out_dir = Path(a.src), Path(a.out)
    if a.files:
        specs = []
        for f in a.files:
            p = Path(f)
            if not p.exists() and (src / f).exists():
                p = src / f
            specs.append(p)
    else:
        if not src.is_dir():
            print("no spec folder: %s" % src)
            return 0 if a.check else 1
        specs = sorted(p for p in src.glob("*.json") if not p.name.startswith("_"))
    bad = 0
    changed = 0
    for p in specs:
        status, msgs = process(p, out_dir, a.check)
        for m in msgs:
            print(m)
        if status == "error" or status == "stale":
            bad += 1
        elif status == "changed":
            changed += 1
    if a.check and not a.files and out_dir.is_dir():
        have = {p.stem for p in specs}
        for f in sorted(out_dir.glob("*.js")):
            if f.stem not in have:
                print("%s: orphan output with no spec in %s" % (f.name, src))
                bad += 1
    if bad:
        print("trace_gen: %d problem(s)" % bad)
        return 1
    if a.check:
        print("trace_gen: %d trace(s) up to date" % len(specs))
    else:
        print("trace_gen: %d trace(s), %d written" % (len(specs), changed))
    return 0


if __name__ == "__main__":
    sys.exit(main())

# Schema as implemented
# ---------------------
# step = {
#   line:   1-based statement line the program is ABOUT to run (state is BEFORE the line);
#           on a return step the `return` line; on the final step the last line that ran
#   vars:   {name: V}  module globals the user assigned (definition order; _x hidden unless watched)
#   locals: {name: V} | null   locals of the current function frame (null at module level)
#   frame:  "fn" | null        qualified name of the current function (Class.method) or null
#   fid:    int                activation id (0 = module; 1.. = each call) - lets the widget diff
#                              the right frame's locals
#   stack:  [{fn, fid, args:{name:V}, line}]  outermost first; stack[0] is {fn:"<module>"}
#   out:    cumulative stdout (capped at 6000 chars)
#   note:   {en, ar} | null
#   ret:    V          present only on a return step of a user function
#   end:    true       present only on the final "program finished" step
#   error:  {type,msg} present only on the final step of an expect_error program
# V extras: num.ty (numpy dtype), list.n / dict.n (true length when truncated) + more:true,
#   list.shape/dtype (ndarray), df.index_name, series{name,len,index_name}, repr.ty, list.ty / dict.ty
#   (container subclass name), nan has no payload.
