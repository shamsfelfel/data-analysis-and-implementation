#!/usr/bin/env python3
"""Assemble the authored chapter fragments into the pages of the site.

The course is authored as a few large files under ``src/content/`` -- one per
chapter, plus one for its tests -- each a sequence of ``<section class="page"
id="...">`` blocks. That is a comfortable way to write a chapter and a poor way
to ship one: a reader opening Lesson 1 should not download Lesson 7, and a
service worker should be able to cache a page that changed without re-fetching
the whole course.

So this script takes those fragments apart and writes one real HTML file per
section, each loading only the stylesheets, engines and question banks that its
own content needs. Where a page lives, what it is called and what it loads all
come from the registry in ``assets/js/course.js`` -- the same list the drawer,
the pager and the service worker read, so the site cannot disagree with itself.

Two things are rewritten on the way out:

* **Links.** The author writes ``href="#lesson-03"`` because in one file that is
  what it is. Here that becomes a real path to the page the id now lives on.
* **Anchors.** Every id is recorded in ``assets/js/anchors.js`` so the topic
  chips under a question can link to the heading that teaches the idea, wherever
  that heading ended up.

    python3 build.py            # write the site
    python3 build.py --check    # build to memory and diff against what is on disk
"""
import argparse
import io
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.abspath(__file__))

CONTENT = [
    "src/content/home.html",
    "src/content/chapter-01.html",
    "src/content/chapter-01-tests.html",
]

# Written by this script; listed here so --check can diff it too.
ANCHORS_JS = "assets/js/anchors.js"

SITE_NAME = {"en": "Python OOP by Example", "ar": "البرمجة الكائنية بلغة بايثون"}

DESCRIPTION = ("Object-oriented Python taught one problem at a time, in English "
               "and Arabic, with tests, worked solutions and a step-through "
               "execution lab.")

# --------------------------------------------------------------------------
# The registry, read out of assets/js/course.js.
#
# That file is the single source of truth for the shape of the course, and it
# has to be JavaScript because the browser reads it too. Rather than keep a
# second copy here in Python, the object literals are pulled out of it with a
# regular expression -- the file is written by hand in a fixed shape, and
# verify_chapter.py fails the build if a page listed there has no section to
# match it.
# --------------------------------------------------------------------------

COURSE_JS = "assets/js/course.js"


def read(rel):
    path = os.path.join(ROOT, rel)
    if not os.path.exists(path):
        return None
    return io.open(path, encoding="utf-8").read()


def js_pages():
    """Every page in the registry, as dicts, in reading order per chapter."""
    src = read(COURSE_JS)
    if src is None:
        raise SystemExit("missing %s" % COURSE_JS)

    chapters = []
    for chunk in re.finditer(r"\{\s*\n\s*num:\s*(\d+),(.*?)\n    \}", src, re.S):
        num = int(chunk.group(1))
        body = chunk.group(2)
        pages = []
        for m in re.finditer(r"\{\s*id:\s*\"([^\"]+)\",\s*kind:\s*\"([^\"]+)\"(.*?)\}",
                             body, re.S):
            entry = {"id": m.group(1), "kind": m.group(2)}
            tail = m.group(3)
            href = re.search(r'href:\s*"([^"]+)"', tail)
            bank = re.search(r'bank:\s*"([^"]+)"', tail)
            n = re.search(r'\bn:\s*(\d+)', tail)
            en = re.search(r'\ben:\s*"((?:[^"\\]|\\.)*)"', tail)
            ar = re.search(r'\bar:\s*"((?:[^"\\]|\\.)*)"', tail)
            if not href:
                raise SystemExit("registry entry %s has no href" % entry["id"])
            entry["href"] = href.group(1)
            entry["bank"] = bank.group(1) if bank else None
            entry["n"] = int(n.group(1)) if n else None
            entry["en"] = en.group(1) if en else entry["id"]
            entry["ar"] = ar.group(1) if ar else entry["id"]
            pages.append(entry)
        if pages:
            chapters.append({"num": num, "pages": pages})
    if not chapters:
        raise SystemExit("no chapters found in %s" % COURSE_JS)
    return chapters


# --------------------------------------------------------------------------
# Taking the fragments apart
# --------------------------------------------------------------------------

SECTION_RE = re.compile(
    r'<section class="page" id="([^"]+)">(.*?)\n</section>', re.S)


def sections():
    """{id: inner html} for every authored page section, source order kept."""
    out = {}
    order = []
    for rel in CONTENT:
        text = read(rel)
        if text is None:
            continue
        found = SECTION_RE.findall(text)
        if not found:
            raise SystemExit("no page sections in %s" % rel)
        for page_id, body in found:
            if page_id in out:
                raise SystemExit("duplicate page id %r (in %s)" % (page_id, rel))
            out[page_id] = body
            order.append(page_id)
    return out, order


ID_RE = re.compile(r'\sid="([^"]+)"')


def anchor_map(bodies, placement):
    """Every id in the content, mapped to the page file it now lives on.

    The page ids themselves are included, so ``href="#lesson-03"`` resolves
    just as well as ``href="#l3-h1"``.
    """
    anchors = {}
    for page_id, body in bodies.items():
        path = placement.get(page_id)
        if not path:
            continue
        anchors[page_id] = path
        for found in ID_RE.findall(body):
            if found in anchors and anchors[found] != path:
                raise SystemExit("anchor %r appears on two pages" % found)
            anchors[found] = path
    return anchors


def rewrite_links(body, path, anchors, base):
    """Turn the author's in-file ``href="#x"`` into a link that still works.

    An anchor on this same page keeps its bare form -- that is a scroll, not a
    navigation. One that moved to another page becomes a relative path to it.
    An unknown anchor is left exactly as written rather than silently pointed
    somewhere wrong; verify_chapter.py reports those.
    """
    def sub(m):
        anchor = m.group(1)
        target = anchors.get(anchor)
        if not target or target == path:
            return m.group(0)
        return 'href="%s%s#%s"' % (base, target, anchor)

    return re.sub(r'href="#([^"]+)"', sub, body)


# --------------------------------------------------------------------------
# Writing a page
# --------------------------------------------------------------------------

CSS_ALWAYS = ["assets/css/tokens.css", "assets/css/base.css",
              "assets/css/chrome.css", "assets/css/components.css"]

JS_ALWAYS = ["assets/js/course.js", "assets/js/i18n.js", "assets/js/theme.js",
             "assets/js/progress.js", "assets/js/anchors.js",
             "assets/js/chrome.js", "assets/js/code.js"]

BANK_FILE = {
    "test-01": "assets/data/questions-lesson-01.js",
    "test-02": "assets/data/questions-lesson-02.js",
    "test-03": "assets/data/questions-lesson-03.js",
    "test-04": "assets/data/questions-lesson-04.js",
    "test-05": "assets/data/questions-lesson-05.js",
    "test-06": "assets/data/questions-lesson-06.js",
    "test-07": "assets/data/questions-lesson-07.js",
    "chapter-test-a": "assets/data/questions-chapter-a.js",
    "chapter-test-b": "assets/data/questions-chapter-b.js",
}


def page_assets(page):
    """The stylesheets and scripts this one page needs, and nothing else."""
    css = list(CSS_ALWAYS)
    js = list(JS_ALWAYS)

    if page["kind"] in ("home", "chapter"):
        js.append("assets/js/home.js")

    if page.get("bank"):
        css.append("assets/css/assess.css")
        js.append("assets/data/topics.js")
        bank = BANK_FILE.get(page["bank"])
        if not bank:
            raise SystemExit("no question file for bank %r" % page["bank"])
        js.append(bank)
        js.append("assets/js/assess.js")

    if page["kind"] == "lab":
        css.append("assets/css/trace.css")
        js.append("assets/data/traces.js")
        js.append("assets/js/trace.js")

    js.append("assets/js/app.js")
    return css, js


def title_for(page, chapter_num):
    """The <title>, in both languages, specific enough to tell tabs apart."""
    if page["kind"] == "home":
        return SITE_NAME["en"], SITE_NAME["ar"]
    label_en = page["en"].replace("&", "&amp;")
    label_ar = page["ar"]
    if page["kind"] == "chapter":
        return ("Chapter %d · %s" % (chapter_num, SITE_NAME["en"]),
                "الفصل %d · %s" % (chapter_num, SITE_NAME["ar"]))
    return ("%s · %s" % (label_en, SITE_NAME["en"]),
            "%s · %s" % (label_ar, SITE_NAME["ar"]))


HEAD = u"""<!doctype html>
<html lang="en" dir="ltr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="{description}">
<title data-en="{title_en}" data-ar="{title_ar}">{title_en}</title>
<script>
/* Theme, language and the path back to the site root, all before the
   first paint: a dark reader must not see a white flash, and an Arabic
   reader must not see a left-to-right page redraw itself. */
(function () {{
  window.DA_BASE = "{base}";
  try {{
    var l = localStorage.getItem("da.lang");
    if (l === "ar" || l === "en") {{
      document.documentElement.lang = l;
      document.documentElement.dir = l === "ar" ? "rtl" : "ltr";
    }}
    var t = localStorage.getItem("da.theme");
    if (t === "dark" || t === "light") document.documentElement.setAttribute("data-theme", t);
    else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {{
      document.documentElement.setAttribute("data-theme", "dark");
    }}
  }} catch (e) {{}}
}})();
</script>
<meta name="theme-color" content="#0d6f6a">
<meta name="color-scheme" content="light dark">
<link rel="manifest" href="{base}manifest.webmanifest">
<link rel="icon" href="{base}icons/icon-192.png" sizes="192x192" type="image/png">
<link rel="apple-touch-icon" href="{base}icons/apple-touch-icon.png">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="apple-mobile-web-app-title" content="Python OOP">
<meta name="mobile-web-app-capable" content="yes">
{styles}
</head>
<body data-chapter="{chapter}" data-page="{page_id}" data-path="{path}">
<main>
"""

FOOT = u"""</main>
<footer class="site">
  <span class="en">Works fully offline · nothing you answer leaves this device</span>
  <span class="ar">يعمل دون اتصال بالكامل · لا تغادر إجاباتك هذا الجهاز</span>
</footer>
{scripts}
</body>
</html>
"""


def render(page, chapter_num, body, anchors):
    path = page["href"]
    depth = path.count("/")
    base = "../" * depth

    css, js = page_assets(page)
    styles = "\n".join('<link rel="stylesheet" href="%s%s">' % (base, p) for p in css)
    scripts = "\n".join('<script src="%s%s"></script>' % (base, p) for p in js)
    title_en, title_ar = title_for(page, chapter_num)

    head = HEAD.format(
        description=DESCRIPTION,
        title_en=title_en,
        title_ar=title_ar,
        base=base,
        styles=styles,
        chapter=chapter_num,
        page_id=page["id"],
        path=path,
    )

    inner = rewrite_links(body, path, anchors, base)

    # Breadcrumbs and the pager belong to the shell, not to the author: one
    # empty element each, filled in by chrome.js from the registry, so
    # reordering a chapter is a registry edit and not eighteen page edits.
    crumbs = '<nav class="crumbs"></nav>\n' if page["kind"] != "home" else ""
    section = ('<section class="page" id="%s">\n%s%s\n</section>\n'
               % (page["id"], crumbs, inner))

    pager = '<nav class="pager"></nav>\n' if page["kind"] != "home" else ""

    return head + section + pager + FOOT.format(scripts=scripts)


# --------------------------------------------------------------------------
# Build
# --------------------------------------------------------------------------

def build():
    """{output path: text} for every file this script owns."""
    chapters = js_pages()
    bodies, _order = sections()

    # Which file each authored section ends up in.
    placement = {}
    owner = {}
    for ch in chapters:
        for page in ch["pages"]:
            placement[page["id"]] = page["href"]
            owner[page["id"]] = (ch["num"], page)
    placement["home"] = "index.html"
    owner["home"] = (1, {"id": "home", "kind": "home", "href": "index.html",
                         "bank": None, "en": SITE_NAME["en"], "ar": SITE_NAME["ar"]})

    missing = [pid for pid in placement if pid not in bodies]
    if missing:
        raise SystemExit("registry lists pages with no content section: %s"
                         % ", ".join(sorted(missing)))
    extra = [pid for pid in bodies if pid not in placement]
    if extra:
        raise SystemExit("content has sections no page claims: %s"
                         % ", ".join(sorted(extra)))

    anchors = anchor_map(bodies, placement)

    out = {}
    for page_id, (chapter_num, page) in owner.items():
        out[page["href"]] = render(page, chapter_num, bodies[page_id], anchors)

    out[ANCHORS_JS] = (
        "/* Generated by build.py -- do not edit.\n"
        "   Every id in the chapter content, mapped to the page it lives on,\n"
        "   so a topic chip under a question can link to the paragraph that\n"
        "   teaches the idea now that the chapter is many files. */\n"
        "window.DAAnchors = " +
        json.dumps(anchors, indent=0, sort_keys=True, ensure_ascii=False)
            .replace("\n", "\n") + ";\n")

    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--check", action="store_true",
                    help="compare the build against the files on disk instead of writing them")
    args = ap.parse_args()

    files = build()

    if args.check:
        stale = []
        for rel in sorted(files):
            path = os.path.join(ROOT, rel)
            current = io.open(path, encoding="utf-8").read() if os.path.exists(path) else None
            if current != files[rel]:
                stale.append(rel)
        if stale:
            print("STALE: %s" % ", ".join(stale), file=sys.stderr)
            return 1
        print("up to date: %d files" % len(files))
        return 0

    total = 0
    for rel in sorted(files):
        path = os.path.join(ROOT, rel)
        directory = os.path.dirname(path)
        if directory and not os.path.isdir(directory):
            os.makedirs(directory)
        io.open(path, "w", encoding="utf-8", newline="\n").write(files[rel])
        total += len(files[rel].encode("utf-8"))
    print("wrote %d files (%.0f KB)" % (len(files), total / 1024.0))
    return 0


if __name__ == "__main__":
    sys.exit(main())
