# Engine contract (runtime globals)

Everything runs in the browser from static files, ES5, no framework. Every page
is built by `build.py` as:

```html
<html lang="en|ar" dir="ltr|rtl" data-theme="light|dark">
<body data-chapter="t1" data-page="t1-lesson-01" data-path="lessons/t1-lesson-01.html">
<main><section class="page" id="t1-lesson-01"> <nav class="crumbs"></nav> … </section> <nav class="pager"></nav></main>
<footer class="site">…</footer>
scripts…  (app.js last; it sets <body data-booted="1"> when the page is ready)
```

`window.DA_BASE` is the `../` prefix back to the site root ("" at the root).

| Global | Defined by | Shape |
|---|---|---|
| `DA_REGISTRY` | `assets/js/registry.js` (generated) | raw `src/registry.json` with every page `href` filled in |
| `COURSE` | `course.js` | `tracks`, `chapters[]` (`key, track, num, title{en,ar}, blurb, ready, pages[]`), `planned[]`, `UI` strings; `chapter(key)`, `pages(key)`, `page(key,id)`, `indexOf(key,id)`, `allPages()`, `pageById(id) -> {chapter,page}`, `pageByHref(href) -> {chapter,page}`. A page: `{id, kind, n?, of?, bank?, href, en, ar, blurb?{en,ar}}` (`en`/`ar` are the flattened title) |
| `I18N` | `i18n.js` | `lang`, `t(key, vars)`, `pick({en,ar})`, `toggle()`, `relabel()`; fires `da:lang` on `document` |
| `THEME` | `theme.js` | `current()`, `toggle()`; fires `da:theme` |
| `PROGRESS` | `progress.js` | `isSeen(chapterKey,id)`, `bankScore(bankId)`, `chapterProgress(chapterKey)` … |
| `DAAnchors` | `anchors.js` (generated) | `{ headingId: "lessons/t1-lesson-01.html" }` |
| `DAHeadings` | `anchors.js` (generated) | `{ headingId: {en, ar} }` plain-text heading titles |
| `DATopics` | `data/topics/<key>.js` | `{ topicKey: {href: headingId, en, ar} }` |
| `DABanks` | `data/questions/<bank>.js` | `{ bankId: {title, intro, questions[]} }` |
| `DAGlossary` | `data/glossary-<key>.js` (generated) | `{ chapterKey: [entry…] }` |
| `DATraces` | `data/traces/<id>.js` (generated) | `{ traceId: spec }` |
| `DAHighlight(src, lang)` | `code.js` | returns highlighted HTML for a code string |

`localStorage` keys: `da.lang`, `da.theme`, `da.seen`, `da.last`, `da.bank.<bankId>`.
Bilingual UI labels the engines draw at run time come from their own `UI` tables
(`{en, ar}`) and relabel on `da:lang`; authored prose carries both languages and CSS
(`html[lang=en] .ar {display:none}`) picks one.

Page widgets are mounted by `app.js` from data attributes:

| Attribute | Engine |
|---|---|
| `[data-bank="t1-test-01"][data-mode="test"]` | `DAAssess.renderAll()` |
| `[data-trace-id="x"]` | `DATrace.mountAll()` |
| `[data-glossary="t1"]` | `DAGlossary.mountAll()` (glossary.js; global name `DAGlossaryUI`) |
| `.evolve`, `pre.code`, `.quiz` | `CODE.init()` |

Pages load only what they use (see `build.py: page_assets`).
