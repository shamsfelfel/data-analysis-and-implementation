# Brief for a lesson author

You are writing **one lesson** of a bilingual (English + Arabic) data-analysis course, plus the
material that travels with it. Read `docs/SPEC.md`, `docs/AUTHORING.md`, `docs/ENGINE.md`,
`docs/THREADS.md` and `docs/datasets.md` first; they are the contract. This file says *how to
do the job well*.

ROOT = `C:\Shams-UCAS\data analysis and implementation` (use absolute paths; Windows; use
`python -I` for scripts that read data files). The sibling course `C:\Shams-UCAS\Programming-AI`
is a read-only style reference: read `src/content/chapter-01.html` from its top through the first
~500 lines of Lesson 1 to feel the voice, structure, density, markup (problem box, bad/good code,
`.output`, quiz, exercise with hidden solution, takeaways).

## What you deliver (all of it, in your own files only)

1. `src/content/<key>/lesson-NN.html` — the lesson (one `<section class="page" id="<key>-lesson-NN">…</section>`).
2. `assets/data/topics/<key>-lN.js` — topic tags for the lesson (≥ 12), each `href` a heading id in your lesson.
3. `src/glossary/<key>/lesson-NN.json` — 8–12 terms this lesson *introduces* (bilingual).
4. `src/traces/<key>-<slug>.json` — 1–3 execution traces for the programs worth stepping through (spec in AUTHORING §5; the generator is `tools/trace_gen.py`; run it if it exists, otherwise just write the spec). Mount them in the lesson with `<div data-trace-id="…"></div>`.
5. `src/diagrams/<key>-<slug>.en.mmd` + `.ar.mmd` — 2–3 Mermaid diagrams (AUTHORING §6; renderer `node tools/render_diagrams.mjs`, run it if it exists). Reference them with `<figure class="diagram" data-diagram="…">`.
6. Optional extra files the lesson needs in `downloads/<key>/` (prefer the shared datasets in `docs/datasets.md`; quote *its* numbers).

Do **not** write the lesson's test questions (a separate author does that after you, from your finished lesson) and do not touch any file you do not own: `build.py`, `assets/js/*`, `assets/css/*`, `docs/*`, other lessons, `src/registry.json`. Do not run git. Write each file in one go (a complete valid file at all times) because other authors run `python build.py` while you work.

## The shape of a great lesson (what "good" means here)

* **Basics to advanced inside the lesson.** Concept 1 must be understandable to someone who has only the prerequisites; by the last concept the student is doing something a working analyst would be proud of. Number the concepts and let the difficulty climb visibly.
* **Every concept = problem → naive code → what it really does → the fix → why it works → what it costs.** Start from code that *runs and looks fine but is subtly wrong or painful* and show the evidence (real output). Then improve it.
* **Evolve blocks are the spine.** Use the `evolve` component for the main example of ≥ 3 concepts (Version 1 → 2 → 3[→ 4]). Each version must fix a *named* defect of the previous one, and the prose under each version says (a) what changed, (b) what it fixes, (c) what is still imperfect. The final version is the recommended practice. The tests will ask which version is better and why, so make the differences crisp and checkable.
* **Silent failures first.** Data work fails quietly. For each concept, show at least one way it goes wrong without an error message, then how to detect it.
* **AI lens in every concept** (the `.ai-lens` box): one concrete way this decides whether a model trains well or fails silently — features/labels, leakage, encoding, class balance, API/LLM JSON, unstructured text/images, embeddings, drift, evaluation data. Be specific (a column, a number, a consequence), not generic hype.
* **Honesty box**: name what each technique costs and when the simpler thing wins.
* **Something to do every 5–10 minutes**: ≥ 6 inline `.quiz` checks (one-question MCQs with feedback that explains the tempting wrong answer), ≥ 4 `.exercise` blocks (each with a starter, expected result, and a hidden worked solution with verified output), ≥ 1–2 inline trace widgets, and "predict the output" prompts before showing outputs.
* **Threads**: if `docs/THREADS.md` lists your lesson in a thread, include the `.thread` box with the earlier solution, its gap, and what this lesson closes, with real links (`href="#t1-lesson-03"`). Add any new thread rows to your final report (do not edit THREADS.md).
* **Cross-links both ways**: back to what you assume (`href="#<id>"` of earlier lessons/headings), forward to where an idea is finished. Every link must resolve (the build warns on unknown anchors).
* **Definitions before use.** Every term of art is defined in the running text before it is used; mark the mention with `<span class="term" data-term="id">…</span>` (once per section where it matters) and give it a glossary entry. Every derivation goes to a clearly-labelled appendix box at the end of the lesson, not the body.
* **Domain consistency.** Use the chapter's domain (see the chapter index file `src/content/<key>/index.html` and `docs/datasets.md`). Do not invent different numbers for the shared datasets: run the code on the real files in `downloads/` and quote real output.
* **Arabic is written, not translated.** Natural technical Arabic (see the original chapter for T1), with the English term in parentheses at first use in each lesson. Numbers, code and identifiers stay LTR inside `<code>`. Both languages must carry exactly the same content: every `.en` paragraph has an `.ar` twin; every span pair is balanced.
* **Accuracy.** Every printed output, every claimed library behaviour (pandas 2.2, NumPy 2.2, Python 3.13 are installed) and every tool instruction (Excel for Microsoft 365, Power BI Desktop, JupyterLab) must be true. Run code; do not reason about outputs. If you cannot verify a tool-UI step, describe the stable concept and menu name, and say "menu names vary slightly by version".
* **Sensitive context.** Education data from Gaza (schools, damage levels) is real-world and sensitive: treat it factually and respectfully; no jokes, no invented casualty-style statistics.
* **Size.** A lesson is substantial: roughly 5–7 numbered concept sections (`h2`), 45–100 KB of HTML. The verifier fails a lesson under 25 KB, with fewer than 2 evolve blocks, fewer than 3 exercises, no inline quiz, no takeaways, no link to its own test, an `h2/h3` without an id, ids not starting with `<key>l<N>-`, or unbalanced en/ar.

## Procedure

1. Read the contract docs, the sibling style reference, your lesson spec (in your task message), and any source material it points to.
2. Create the datasets you need only if the shared ones do not cover it.
3. Write snippets to a scratch file under `ROOT/.tmp/<your-id>/`, **run them**, and paste real output into the lesson.
4. Write the lesson file, topics, glossary fragment, traces, diagram sources. Keep heading ids sequential (`<key>lN-h1…`, `<key>lN-s1…`).
5. `python build.py` (warnings about *other* authors' missing files are expected; yours must be clean), then `python tools/verify_chapter.py --scope <key>-lesson-NN` and fix every problem it reports for your lesson (ignore "test bank not defined" for your own test — the next author writes it, but do make sure the lesson links to `#<key>-test-NN`).
6. Look at your page in a browser if the engines are ready (serve ROOT with `python -m http.server <port>` on 127.0.0.1, open `lessons/<key>-lesson-NN.html` via Playwright from `ROOT/node_modules/@playwright/test`, take a screenshot, and check it with the Read tool in English and Arabic, light and dark). If the engines are mid-development, skip this and say so.
7. Final report (≤ 20 lines): files written (with sizes), counts (concept sections, evolve blocks, quizzes, exercises, traces, diagrams, glossary terms, topics), the list of topic keys with the heading each points to, new thread rows, anything you could not verify, and any file outside your ownership that needs a change.
