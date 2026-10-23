#!/usr/bin/env python3
"""Structural checks on the built site. Exits non-zero on any failure.

Covers what a browser will not tell you until a student hits it: a topic chip
pointing at a heading that was renamed, a link to a page that is not there, a
question shipped without an explanation, a trace step naming a line its program
does not have, an English sentence with no Arabic beside it.

Since the course became many pages, two of those checks got harder and more
worth having: a link now has to name both a file and an anchor inside it, and
the question banks live on pages separate from the headings their topics point
at. Both are resolved here across the whole built site, not one file at a time.

    python3 tools/verify_chapter.py
"""
import io
import json
import os
import posixpath
import re
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REQUIRED_TYPES = ["tf", "mcq", "multi", "fill", "order", "match",
                  "error", "complete", "compare", "output", "trace"]

PAGE_DIRS = ["chapters", "lessons", "tests", "exams", "labs"]

problems = []
notes = []


def fail(msg):
    problems.append(msg)


def read(rel):
    return io.open(os.path.join(ROOT, rel), encoding="utf-8").read()


def built_pages():
    """{site-relative path: html} for every page build.py wrote."""
    pages = {}
    if os.path.exists(os.path.join(ROOT, "index.html")):
        pages["index.html"] = read("index.html")
    for d in PAGE_DIRS:
        full = os.path.join(ROOT, d)
        if not os.path.isdir(full):
            continue
        for f in sorted(os.listdir(full)):
            if f.endswith(".html"):
                rel = "%s/%s" % (d, f)
                pages[rel] = read(rel)
    return pages


def dump_data():
    """Run the data files under node and hand back what they define."""
    d = os.path.join(ROOT, "assets", "data")
    files = sorted(f for f in os.listdir(d) if f.endswith(".js"))
    script = "global.window = {};\n"
    for f in files:
        script += "require(%s);\n" % json.dumps(os.path.join(d, f))
    script += ("process.stdout.write(JSON.stringify({"
               "banks: global.window.DABanks || {},"
               "topics: global.window.DATopics || {},"
               "traces: global.window.DATraces || {}}));")
    out = subprocess.run(["node", "-e", script], capture_output=True, text=True, encoding="utf-8")
    if out.returncode != 0:
        fail("data files do not load under node:\n" + out.stderr.strip())
        return None
    return json.loads(out.stdout)


def check_build():
    r = subprocess.run([sys.executable, os.path.join(ROOT, "build.py"), "--check"],
                       capture_output=True, text=True, encoding="utf-8", cwd=ROOT)
    if r.returncode != 0:
        fail("the built pages are stale - run python3 build.py\n    " +
             r.stderr.strip())

    r = subprocess.run([sys.executable, os.path.join(ROOT, "scripts", "build-sw.py"),
                        "--check"], capture_output=True, text=True, encoding="utf-8", cwd=ROOT)
    if r.returncode != 0:
        fail("sw.js is out of step with the site - run python3 scripts/build-sw.py\n    " +
             r.stderr.strip())


def check_syntax():
    for sub in ("js", "data"):
        d = os.path.join(ROOT, "assets", sub)
        for f in sorted(os.listdir(d)):
            if not f.endswith(".js"):
                continue
            r = subprocess.run(["node", "--check", os.path.join(d, f)],
                               capture_output=True, text=True, encoding="utf-8")
            if r.returncode != 0:
                fail("syntax error in assets/%s/%s:\n%s" % (sub, f, r.stderr.strip()))


def strip_scripts(html):
    """Links are checked in markup only: a `href="#` inside a JavaScript
    string concatenation is not a link, it is half of one."""
    return re.sub(r"<script\b.*?</script>", "", html, flags=re.S)


def ids_of(html):
    return set(re.findall(r'\sid="([^"]+)"', strip_scripts(html)))


def check_links(pages):
    """Every link lands somewhere that exists: the file, and the anchor in it.

    Only <a> is followed. A <link rel="stylesheet"> also has an href, but it
    points at a file rather than a page, and those are checked separately by
    check_assets().
    """
    ids = {path: ids_of(html) for path, html in pages.items()}
    internal = 0

    for path, html in pages.items():
        body = strip_scripts(html)
        here = posixpath.dirname(path)
        for href in re.findall(r'<a [^>]*?href="([^"]+)"', body):
            if href.startswith(("http://", "https://", "mailto:")):
                continue
            internal += 1
            file_part, _, anchor = href.partition("#")

            if not file_part:                       # "#x" - same page
                target = path
            else:
                target = posixpath.normpath(posixpath.join(here, file_part))
                if target not in pages:
                    fail("%s links to %s, which is not a page" % (path, file_part))
                    continue

            if anchor and anchor not in ids[target]:
                fail("%s links to #%s on %s, which has no such anchor"
                     % (path, anchor, target))

    notes.append("%d pages, %d internal links, %d anchors"
                 % (len(pages), internal, sum(len(v) for v in ids.values())))


def check_assets(pages):
    """Every stylesheet, script and icon a page pulls in exists on disk.

    This is the check that catches a wrong number of ../ in a generated page,
    which otherwise shows up as an unstyled page in one directory only.
    """
    refs = 0
    for path, html in pages.items():
        here = posixpath.dirname(path)
        found = (re.findall(r'<link [^>]*?href="([^"]+)"', html) +
                 re.findall(r'<script [^>]*?src="([^"]+)"', html))
        for ref in found:
            if ref.startswith(("http://", "https://", "data:")):
                continue
            refs += 1
            target = posixpath.normpath(posixpath.join(here, ref.split("#")[0]))
            if not os.path.exists(os.path.join(ROOT, target.replace("/", os.sep))):
                fail("%s loads %s, which does not exist" % (path, ref))
    notes.append("%d asset references, all resolved" % refs)


def check_bilingual():
    """Every English span in the authored content has an Arabic one beside it."""
    src = os.path.join(ROOT, "src", "content")
    total_en = 0
    for f in sorted(os.listdir(src)):
        if not f.endswith(".html"):
            continue
        html = read("src/content/" + f)
        en = len(re.findall(r'<span class="en">', html))
        ar = len(re.findall(r'<span class="ar">', html))
        if en != ar:
            fail("bilingual spans unbalanced in %s: %d en vs %d ar" % (f, en, ar))
        total_en += en
    notes.append("%d bilingual span pairs in markup" % total_en)


def walk_bilingual(obj, where, seen):
    """Any {en: ...} dict in the data must carry a non-empty ar, and vice versa."""
    if isinstance(obj, dict):
        has_en, has_ar = "en" in obj, "ar" in obj
        if has_en or has_ar:
            if not (obj.get("en") or "").strip():
                seen.append("%s: empty or missing English" % where)
            if not (obj.get("ar") or "").strip():
                seen.append("%s: empty or missing Arabic" % where)
        for k, v in obj.items():
            if k not in ("en", "ar"):
                walk_bilingual(v, where + "." + str(k), seen)
    elif isinstance(obj, list):
        for i, v in enumerate(obj):
            walk_bilingual(v, "%s[%d]" % (where, i), seen)


def check_anchor_map(pages):
    """The generated map has to agree with the pages that were written."""
    src = read("assets/js/anchors.js")
    m = re.search(r"window\.DAAnchors = (\{.*?\});", src, re.S)
    if not m:
        fail("assets/js/anchors.js does not define DAAnchors")
        return {}
    anchors = json.loads(m.group(1))
    for anchor, page in sorted(anchors.items()):
        if page not in pages:
            fail("anchors.js maps #%s to %s, which is not a page" % (anchor, page))
        elif anchor not in ids_of(pages[page]):
            fail("anchors.js maps #%s to %s, which has no such id" % (anchor, page))
    notes.append("%d anchors mapped to pages" % len(anchors))
    return anchors


def check_banks(data, pages, anchors):
    banks, topics = data["banks"], data["topics"]
    all_html = "\n".join(pages.values())
    seen_ids = {}
    types = {}
    levels = {}
    total = 0

    for key in sorted(topics):
        href = topics[key].get("href")
        if href not in anchors:
            fail("topic %r points at #%s, which is on no page" % (key, href))

    for bname in sorted(banks):
        bank = banks[bname]
        if ('data-bank="%s"' % bname) not in all_html:
            fail("bank %r has no placeholder on any page" % bname)
        qs = bank.get("questions") or []
        if not qs:
            fail("bank %r has no questions" % bname)
        for q in qs:
            total += 1
            qid = q.get("id") or "<no id>"
            at = "%s/%s" % (bname, qid)
            if qid in seen_ids:
                fail("duplicate question id %r (%s and %s)" % (qid, seen_ids[qid], bname))
            seen_ids[qid] = bname

            if q.get("level") not in ("easy", "medium", "hard"):
                fail("%s: level is %r" % (at, q.get("level")))
            levels[q.get("level")] = levels.get(q.get("level"), 0) + 1

            t = q.get("type")
            if t not in REQUIRED_TYPES:
                fail("%s: unknown type %r" % (at, t))
            types[t] = types.get(t, 0) + 1

            if not q.get("topics"):
                fail("%s: no topics" % at)
            for tk in q.get("topics") or []:
                if tk not in topics:
                    fail("%s: unknown topic %r" % (at, tk))

            if not q.get("explain"):
                fail("%s: no explanation" % at)

            # the answer shape has to match the type
            if t == "tf":
                if not isinstance(q.get("truth"), bool):
                    fail("%s: tf needs a boolean `truth`" % at)
            elif t in ("mcq", "compare") or (t in ("complete", "output", "trace", "error") and q.get("options")):
                if not q.get("options"):
                    fail("%s: no options" % at)
                elif not isinstance(q.get("answer"), int):
                    fail("%s: answer must be an index" % at)
                elif not (0 <= q["answer"] < len(q["options"])):
                    fail("%s: answer %r out of range" % (at, q["answer"]))
            elif t == "multi":
                if not isinstance(q.get("answer"), list) or not q["answer"]:
                    fail("%s: multi needs a list answer" % at)
                elif any(not (0 <= i < len(q.get("options") or [])) for i in q["answer"]):
                    fail("%s: answer index out of range" % at)
            elif t == "order":
                items, ans = q.get("items") or [], q.get("answer") or []
                if sorted(ans) != list(range(len(items))):
                    fail("%s: answer must be a permutation of all %d items" % (at, len(items)))
            elif t == "match":
                if len(q.get("pairs") or []) < 2:
                    fail("%s: match needs at least two pairs" % at)
            elif t == "error":
                lines = len(str(q.get("code", "")).strip("\n").split("\n"))
                ans = q.get("answer")
                ans = ans if isinstance(ans, list) else [ans]
                for n in ans:
                    if not isinstance(n, int) or not (1 <= n <= lines):
                        fail("%s: answer line %r outside 1..%d" % (at, n, lines))
            else:
                blanks = q.get("blanks") or []
                if not blanks:
                    fail("%s: no blanks" % at)
                for i, b in enumerate(blanks):
                    if not (b.get("accept") or []):
                        fail("%s: blank %d accepts nothing" % (at, i + 1))

            bl = []
            walk_bilingual(q, at, bl)
            for m in bl:
                fail(m)

    for t in REQUIRED_TYPES:
        if not types.get(t):
            fail("question type %r is never used" % t)

    notes.append("%d questions in %d banks" % (total, len(banks)))
    notes.append("types: " + ", ".join("%s=%d" % (t, types.get(t, 0)) for t in REQUIRED_TYPES))
    notes.append("levels: " + ", ".join("%s=%d" % (l, levels.get(l, 0))
                                        for l in ("easy", "medium", "hard")))


def check_traces(data, pages):
    traces = data["traces"]
    all_html = "\n".join(pages.values())
    for key in sorted(traces):
        tr = traces[key]
        n = len(str(tr.get("code", "")).strip("\n").split("\n"))
        steps = tr.get("steps") or []
        if not steps:
            fail("trace %r has no steps" % key)
        for i, s in enumerate(steps):
            line = s.get("line")
            if not isinstance(line, int) or not (1 <= line <= n):
                fail("trace %r step %d: line %r outside 1..%d" % (key, i + 1, line, n))
        bl = []
        walk_bilingual(tr, "trace " + key, bl)
        for m in bl:
            fail(m)
    for key in re.findall(r'data-trace-id="([^"]+)"', all_html):
        if key not in traces:
            fail("content mounts trace %r, which is not defined" % key)
    notes.append("%d traces, %d steps"
                 % (len(traces), sum(len(t.get("steps") or []) for t in traces.values())))


def check_page_assets(pages):
    """Every page loads the shell, and only the pages that need the heavy
    files load them. This is the promise the split was made for."""
    for path, html in pages.items():
        for must in ("assets/js/course.js", "assets/js/app.js",
                     "assets/css/tokens.css", "assets/css/base.css"):
            if must.rsplit("/", 1)[-1] not in html:
                fail("%s does not load %s" % (path, must))

        has_bank = 'data-bank="' in html
        loads_assess = "assess.js" in html
        if has_bank and not loads_assess:
            fail("%s has a question bank but does not load assess.js" % path)
        if loads_assess and not has_bank:
            fail("%s loads assess.js but has no question bank" % path)

        has_trace = "data-trace-id=" in html
        loads_trace = "assets/js/trace.js" in html
        if has_trace and not loads_trace:
            fail("%s mounts a trace but does not load trace.js" % path)
        if loads_trace and not has_trace:
            fail("%s loads trace.js but mounts no trace" % path)

        banks_loaded = re.findall(r'assets/data/questions-([a-z0-9-]+)\.js', html)
        if len(banks_loaded) > 1:
            fail("%s loads %d question banks; a page needs only its own"
                 % (path, len(banks_loaded)))


def main():
    check_build()
    check_syntax()
    pages = built_pages()
    if not pages:
        fail("no built pages found - run python3 build.py")
        print("\n%d problem(s):" % len(problems))
        for p in problems:
            print("  - " + p)
        return 1

    check_links(pages)
    check_assets(pages)
    check_bilingual()
    check_page_assets(pages)
    anchors = check_anchor_map(pages)
    data = dump_data()
    if data:
        check_banks(data, pages, anchors)
        check_traces(data, pages)

    for n in notes:
        print("  " + n)
    if problems:
        print("\n%d problem(s):" % len(problems))
        for p in problems:
            print("  - " + p)
        return 1
    print("\nall checks passed")
    return 0


if __name__ == "__main__":
    sys.exit(main())
