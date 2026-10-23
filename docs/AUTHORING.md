# Authoring a Chapter

The mechanics of this repository and every data format an author touches. The
rules a chapter must satisfy are in [SPEC.md](SPEC.md). The sibling course
`../Programming-AI` is the visual and structural reference; where this file
differs from it, this file wins.

> **Golden rule.** Never edit a *generated* file by hand. Generated: `index.html`,
> `chapters/ lessons/ tests/ exams/ labs/ glossary/`, `assets/js/registry.js`,
> `assets/js/anchors.js`, `assets/data/traces/*.js`, `assets/data/glossary-*.js`,
> `assets/diagrams/*.html`, `sw.js`. Edit the sources and rebuild.

## 1. Layout

```
src/registry.json            THE REGISTRY: tracks, chapters, pages, titles, order
src/content/home.html        course home (both tracks)
src/content/<key>/index.html     chapter home prose         -> section id <key>-chapter
src/content/<key>/lesson-NN.html one lesson                 -> section id <key>-lesson-NN
src/content/<key>/lab.html       execution lab prose        -> section id <key>-lab
src/glossary/<key>.json      the chapter glossary (source)
src/traces/<id>.json         execution-trace specs (source)
src/diagrams/<id>.<lang>.mmd Mermaid sources (en + ar)
assets/data/questions/<bank>.js   question banks (hand-written, loaded by tests)
assets/data/topics/<key>.js       topic tags -> heading ids
downloads/<key>/             sample datasets / files the lessons link to
```

`<key>` is the chapter key: `t1` (Theory chapter 1), `p1` (Practical chapter 1).
Tests, exams and the glossary page are **synthesised by `build.py` from the
registry** — nobody writes their HTML. Only lessons, the chapter home and the lab
are authored.

Page ids (unique across the whole course):

| Page | id | built to |
|---|---|---|
| chapter home | `t1-chapter` | `chapters/t1.html` |
| lesson n | `t1-lesson-01` | `lessons/t1-lesson-01.html` |
| lesson test n | `t1-test-01` | `tests/t1-test-01.html` |
| execution lab | `t1-lab` | `labs/t1-lab.html` |
| glossary | `t1-glossary` | `glossary/t1-glossary.html` |
| chapter test | `t1-exam-a`, `-b`, `-c` | `exams/t1-exam-a.html` … |

Reading order of a chapter: chapter home → (lesson, its test)×N → lab → glossary
→ exam A → exam B → exam C.

## 2. Build & check

```bash
python build.py                    # registry + content -> every page, anchors.js, registry.js, glossary data
python tools/trace_gen.py          # src/traces/*.json -> assets/data/traces/*.js (runs the code in CPython)
node tools/render_diagrams.mjs     # src/diagrams/*.mmd -> assets/diagrams/*.html (Mermaid, via Playwright)
python scripts/build-sw.py         # precache list
python tools/verify_chapter.py     # structure, links, anchors, banks, parity, coverage
npx playwright test                # drive the real thing in a real browser
npm run serve                      # no-cache authoring server at :8088
```

Run order for a full rebuild: `trace_gen` → `render_diagrams` → `build.py` →
`build-sw.py` → `verify_chapter.py`.

## 3. Writing a lesson (`src/content/<key>/lesson-NN.html`)

One file = one `<section class="page" id="t1-lesson-01">…</section>`.

**Bilingual markup.** Every visible sentence is written twice: `<p class="en">…</p>`
then `<p class="ar">…</p>`; inline text uses `<span class="en">…</span><span class="ar">…</span>`.
`h1/h2/h3` contain both spans. Code, numbers and identifiers stay inside `<code>`
(LTR).

**Skeleton** (follow `../Programming-AI/src/content/chapter-01.html`, lesson 1, for tone and depth):

```html
<section class="page" id="t1-lesson-01">

  <span class="kicker">Lesson 1</span>
  <h1><span class="en">…</span><span class="ar">…</span></h1>
  <p class="lede en">By the end of this lesson you will …</p>
  <p class="lede ar">…</p>

  <div class="note"> The setting + prerequisites (links to earlier lessons) </div>
  <div class="objectives"> 3–5 measurable objectives </div>

  <h2 id="t1l1-h1"><span class="en">Concept 1 — …</span><span class="ar">…</span></h2>
  <div class="problem"> the pain, concretely </div>
  <h3 id="t1l1-s1">…</h3>
  <pre class="code bad" data-lang="python"><code>…</code></pre>
  <div class="output">…verified real output…</div>
  <div class="ai-lens"> why this matters for a model </div>
  <div class="quiz"> …inline single-question check… </div>

  … more concepts, simple -> subtle -> professional …

  <h2 id="t1l1-h5">Exercises</h2>   <!-- 3–5 .exercise blocks, each with <details class="solution"> -->
  <div class="card takeaways"> key takeaways + the mistakes cheat-sheet </div>
  <div class="callout ahead"> link to this lesson's test and the next lesson </div>
</section>
```

**Heading ids.** Give *every* `h2`/`h3` an explicit id, numbered in document order:
`t1l1-h1, t1l1-h2 …` for `h2`, `t1l1-s1, t1l1-s2 …` for `h3` (continuing across the
lesson, not restarting per `h2`). Topics, glossary entries and cross-links point at
these ids. Chapter home uses `t1idx-…`, the lab `t1lab-…`.

**Links.** Write in-site links as `href="#t1-lesson-02"` (a page) or
`href="#t1l2-s3"` (a heading) — `build.py` rewrites them to real relative paths.
Links to files in `downloads/` are `href="@/downloads/t1/rents.csv"`. Every claim
"you will meet X in Lesson N" must be a real link.

**Components**

| Markup | Use |
|---|---|
| `<div class="note">` `.problem` `.tip` `.warn` | info / the pain / a pro tip / a trap |
| `<div class="callout prereq">` `.ahead` | what to read before / where to go next |
| `<pre class="code [good\|bad]" data-lang="python"><code>` | code. `data-lang`: `python` (default) `json` `excel` `dax` `m` `sql` `bash` `csv` `text` |
| `<div class="output">` | verified program output |
| `<div class="exercise"><h4>…</h4>…<details class="solution"><summary>…</summary>…</details></div>` | practice with a hidden worked solution |
| `<div class="quiz"><p class="q">…</p><ul class="options"><li><button class="opt" data-correct="true">…</button></li>…</ul><div class="feedback" hidden>…</div></div>` | inline check (see the sibling course for exact markup) |
| `<div class="ai-lens"><h4><span class="en">AI lens</span><span class="ar">منظور الذكاء الاصطناعي</span></h4>…</div>` | the AI flavour box (≥ 1 per concept section) |
| `<div class="thread"><h4>Thread · name</h4>…</div>` | link this problem to its solutions in other chapters; state the gap |
| `<figure class="diagram" data-diagram="t1-three-shapes"><figcaption><span class="en">…</span><span class="ar">…</span></figcaption></figure>` | a pre-rendered Mermaid diagram (see §6) |
| `<div class="evolve">` | **versioned code evolution** (see below) |
| `<div data-trace-id="t1-csv-read"></div>` | a step-through widget (see §5); also allowed inline in lessons |
| `<div class="obj-table">` / plain `<table>` | tables (wrap wide ones in `<div class="table-wrap">`) |

**Evolve (the primary teaching device).**

```html
<div class="evolve" id="t1l3-e1">
  <div class="ver" data-title-en="Version 1 — loop and hope" data-title-ar="النسخة 1 — حلقة وأمل">
    <pre class="code bad" data-lang="python"><code>…</code></pre>
    <p class="en">What it does, what silently goes wrong.</p><p class="ar">…</p>
  </div>
  <div class="ver" data-title-en="Version 2 — …" data-title-ar="…">
    <pre class="code" data-lang="python"><code>…</code></pre>
    <p class="en">What changed and which problem it closes; what is still open.</p><p class="ar">…</p>
  </div>
  <!-- 2–4 versions. The last is the recommended form. -->
</div>
```
The engine renders tabs; lines new in a version (vs the previous one) are marked.
Each lesson has **≥ 2 evolve blocks**; every version after the first must fix a
*named* defect of the previous one, and the tests must ask about them.

**Density rules.** An exercise, inline quiz, or trace at least every two screens.
Verify every printed output by running it (`python -I`, real pandas/NumPy).

## 4. Questions (`assets/data/questions/<bank>.js`)

One file per bank: `t1-test-01.js` … and `t1-exam-a.js` `-b` `-c`.

```js
window.DABanks = window.DABanks || {};
window.DABanks["t1-test-01"] = {
  title: { en: "Test 1 — …", ar: "اختبار 1 — …" },
  intro: { en: "…", ar: "…" },
  questions: [ { … }, … ]          // lesson test: >= 20 (target 24); exam: exactly 24
};
```

Common fields: `id` (unique across the course: `t1l1q01`, exams `t1ax01`), `type`, `level`
(`easy|medium|hard`), `topics: ["t1-nominal", …]` (keys from `topics/<key>.js`),
`q` `{en,ar}`, optional `code` / `codeA` + `codeB`, **`hint {en,ar}` (required)**,
**`explain {en,ar}` (required)**, optional `solution {code?, out?, en?, ar?}`.
HTML is allowed in bilingual strings; code fields are raw text (write `>` not `&gt;`).

| `type` | extra fields |
|---|---|
| `tf` | `truth: true\|false` |
| `mcq` | `options: [{en,ar}\|{code}]`, `answer: <index>` |
| `multi` | `options`, `answer: [i, j]` |
| `fill` | `blanks: [{accept: ["x","X"], label?, wide?, lines?, ph?, hint?}]` (use `____1____` markers in `code`) |
| `output` | `code`; `blanks:[{accept:[…], lines?}]` (typed) **or** `options` (choice) |
| `trace` | `code`; `blanks` (typed values) **or** `options` |
| `order` | `items: [{en,ar}]` (already in the correct order is fine; the engine shuffles), `answer: [0,1,2…]` |
| `ordercode` | `items: [{code:"…"}]`, `answer: […]` — order *code statements* |
| `match` | `pairs: [{l,r}]` (`l`/`r` are `{en,ar}` or `{code}`), optional `leftHead`/`rightHead` |
| `error` | `code`, `answer: <1-based line or [lines]>`, optional `solution` |
| `complete` | `code` with a gap; `options:[{code}]` + `answer`, or `blanks` |
| `compare` | `codeA`, `codeB`, `options: [{en,ar}]` (statements), `answer` |
| `contrast` | `concepts: [{en,ar},{en,ar}]`, `rows: [{s:{en,ar}, a:0\|1\|2}]` — `0`=only first, `1`=only second, `2`=both |
| `write` | `starter?`, `lines?`, `checks: [{re:"read_csv\\s*\\(", flags?:"i", label:{en,ar}}]` (all must match), optional `forbid: [{re,label}]`, `solution:{code, en, ar}` |

Rules: every distractor is wrong for a reason the `explain` names; `hint` never
states the answer; tag 1–3 `topics` (these render as the "Review" links, so tag
what a student should re-read); `level` mix per test ≈ 35% easy / 40% medium / 25% hard.
A **chapter** must use all 14 types somewhere across its banks; **each test should
use ≥ 7 different types**.

`checks[].re` is matched against the student's code with whitespace collapsed;
allow both quote styles (`["']`) and optional spaces. The checks verify *required
parts*, not behaviour — write them tolerant, and make `solution.code` the model.

## 5. Execution traces (`src/traces/<id>.json` → `assets/data/traces/<id>.js`)

Python traces are produced by **running the code under `sys.settrace` in CPython**:

```json
{
  "id": "t1-csv-read",
  "title": {"en": "…", "ar": "…"},
  "lede":  {"en": "…", "ar": "…"},
  "files": {"rents.csv": "id,city,rent\n1,Gaza,300\n2,Rafah,250\n"},
  "code": "import pandas as pd\ndf = pd.read_csv('rents.csv')\nprint(df.dtypes)\n",
  "notes": { "2": {"en": "…", "ar": "…"}, "3#2": {"en": "second visit to line 3", "ar": "…"} },
  "watch": ["df"],
  "viz": { "df": "table", "nums": "array", "cfg": "tree" },
  "max_steps": 80
}
```
`files` are written to a temp working directory before the run (so `read_csv`
works). `notes` key = line number (`"7"` = every visit; `"7#2"` = only the second
visit). `viz` overrides the automatic choice (`table|array|dict|tree|bars|cells`).
For spreadsheet / Power BI / Jupyter walkthroughs there is no CPython to run: write
`"manual": true` and give `steps` directly, each `{line, vars: {name: V}, out, note, stack?}`
where `V` uses the typed-value schema below (including `sheet` and `flow`).

**Typed value schema `V`** (what the generator emits and the widget draws):
`{t:"num"|"str"|"bool", v:"…"}` · `{t:"none"}` · `{t:"nan"}` ·
`{t:"list", kind:"list|tuple|set|ndarray", v:[V…]}` · `{t:"dict", v:[[V,V]…]}` ·
`{t:"df", cols:[…], index:[…], rows:[[…]], shape:[r,c], dtypes:[…], more:bool}` ·
`{t:"series", name, index:[…], values:[…], dtype}` ·
`{t:"obj", cls:"Name", v:[[attr,V]…]}` · `{t:"repr", v:"…"}` ·
manual-only: `{t:"sheet", cols:[…], rows:[[…]], hl:["B2"], formula:"=SUM(B2:B4)", result:"…"}` and
`{t:"flow", nodes:["Get data","Clean",…], active:1}`.
The widget also shows the **call stack** (`stack:[{fn, args, line}]`) when a program
defines functions.

Place a trace with `<div data-trace-id="t1-csv-read"></div>`; the build loads the
trace file and the widget CSS/JS on that page automatically. Each chapter has a
**lab page** (`<key>-lab`) that collects its traces with a lede for each; the best
2–3 are also placed inline in lessons. Target ≥ 6 traces per chapter, each
5–60 steps, at least two with recursion or functions (stack) and at least two with
DataFrames or nested JSON.

## 6. Diagrams (`src/diagrams/<id>.<lang>.mmd`)

Each diagram has an English and an Arabic Mermaid source (`t1-three-shapes.en.mmd`,
`t1-three-shapes.ar.mmd`). `node tools/render_diagrams.mjs` renders both languages in
both themes to `assets/diagrams/<id>.html`; `build.py` inlines it where
`<figure class="diagram" data-diagram="<id>">` is. Use `flowchart`, `sequenceDiagram`,
`classDiagram`, `erDiagram`, `stateDiagram-v2`, `mindmap`, `timeline`, `quadrantChart`.
Keep node text short (≤ 5 words/line); do not use colours in the source — the
renderer themes them. **≥ 6 diagrams per chapter**, including ≥ 1 sequence diagram.

## 7. Glossary (`src/glossary/<key>.json`)

```json
[
  { "id": "nominal",
    "term": {"en": "Nominal", "ar": "اسمي"},
    "def":  {"en": "…", "ar": "…"},
    "cat":  {"en": "Meaning", "ar": "المعنى"},
    "used": ["t1l2-s1", "t1l2-s4"],
    "see":  ["ordinal"] }
]
```
Every term of art a chapter introduces (≥ 40 per chapter). `used` lists heading ids
where the term is defined or used in earnest (the page shows them as links labelled
with the lesson and heading). Each term must be **defined in the running text of the
first lesson that uses it**.

## 8. Topics (`assets/data/topics/<key>.js`)

```js
window.DATopics = window.DATopics || {};
(function (T) {
  T["t1-nominal"] = { href: "t1l2-s1", en: "nominal data", ar: "البيانات الاسمية" };
})(window.DATopics);
```
`href` is a heading id. Every topic is used by ≥ 1 question and points at a real heading;
every heading that teaches a concept should have a topic.

## 9. Registry (`src/registry.json`)

See the file itself. `build.py` derives every `href` from the page `id`/`kind`; the
drawer, breadcrumbs, pager, home pages, precache list and e2e suite all read the
generated `assets/js/registry.js`. Add a page by adding an entry — nothing else needs
telling.

## 10. Conventions

- Vanilla ES5 JavaScript (`var`, no arrows, no `const`).
- `localStorage` keys are namespaced `da.*`.
- Bilingual strings are `{en, ar}`; markup carries both languages and CSS switches.
- Arabic is written, not translated; technical terms in Arabic with the English in
  parentheses on first use per lesson.
- A mistake that would make a student's analysis *silently wrong* (not crash) gets a
  `.warn` and a question — silent failures are the heart of data work.
