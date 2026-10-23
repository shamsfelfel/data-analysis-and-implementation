# Brief for a question author

You write **one question bank**: a lesson test or one of the three chapter tests of a bilingual
(English + Arabic) data-analysis course. Read `docs/SPEC.md` (§3), `docs/AUTHORING.md` (§4 Questions, §8
Topics), `docs/ENGINE.md`, then the lesson(s) your bank covers **in full** — you are testing what
they teach, in the way they teach it. ROOT = `C:\Shams-UCAS\data analysis and implementation`
(absolute paths; `python -I` for scripts; do not run git; touch only your own files).

## Deliverable

`assets/data/questions/<bank>.js` — exactly **24 questions** (a lesson test may have more, never fewer
than 20; the three chapter tests are exactly 24 each). Optional `assets/data/topics/<bank>-extra.js`
if you need topic keys the lesson authors did not define (keys `<chapterkey>-<slug>`, each `href` an
existing heading id; never redefine an existing key).

```js
window.DABanks = window.DABanks || {};
window.DABanks["t1-test-01"] = {
  title: { en: "Test 1 — The Three Shapes of Data", ar: "اختبار 1 — أشكال البيانات الثلاثة" },
  intro: { en: "…what this covers, how long, reminder that hint/answer/explanation are hidden…", ar: "…" },
  questions: [ { id: "t1l1q01", type: "tf", level: "easy", topics: ["t1-schema"], q: {…}, truth: true, hint: {…}, explain: {…} }, … ]
};
```

Field reference and per-type data shapes: AUTHORING §4. Ids: lesson tests `t1l1q01`…, chapter tests
`t1ax01`/`t1bx01`/`t1cx01`… (practical chapter: `p1…`). ES5 syntax, valid under `node --check`.

## Composition

Mix of difficulty ≈ 8 easy / 10 medium / 6 hard. At least 8 different `type`s per bank, never more than 5 of
any one type. The chapter as a whole must use all 14 types, so include these **at minimum** in every bank
unless your task message says otherwise: 1 `write`, 1 `ordercode`, 1 `contrast`, 2 `compare`, 2 `error`,
2 `output`, 1 `trace`, 1 `order`, 1 `match`, plus tf/mcq/multi/fill/complete in the remaining places.

* **Lesson tests** cover that lesson only, every concept section and **every evolve block** (ask which version
  is better and why, which defect version N fixes, what version N still leaves open, complete the missing
  improvement, find the error that version N−1 hides). Tag every question with the lesson's topic keys so that
  every topic of the lesson is used by at least one question.
* **Chapter test A — Core**: easy/medium, samples every lesson (≈ 4 questions each), the ideas every student must own.
  **B — Applied**: code-centred — read, trace, fix, complete and write code on the chapter's datasets; judging
  which version of a solution is better. **C — Advanced**: hard corners that cross lesson boundaries — silent
  failures, trade-offs, combining two lessons' ideas, threads across chapters. The three together cover the
  whole chapter; avoid asking the same thing twice across A/B/C (vary the angle).

## Quality rules (these are what separates a test from a quiz)

1. **Test understanding, not wording.** A student who read the lesson carefully and can apply it should pass;
   one who memorised sentences should not. Prefer "what happens / which is better / why / fix it" over "define X".
2. **Every distractor is wrong for a reason the `explain` names** and is tempting because of a real misconception
   (the lesson's silent failures are the best source). No joke options, no "all of the above", no giveaway lengths.
   Spread the correct option across positions; never make it the longest by habit.
3. **`hint` nudges, never gives the answer away** (point at what to look at or which idea to recall).
4. **`explain` teaches** (2–5 sentences): why the right answer is right, why the most tempting wrong answer is
   tempting, the rule to carry away. Bilingual, same content in both languages.
5. **Verify every code output by running it** (Python 3.13, pandas 2.2, NumPy 2.2) — `output` and `trace` answers
   must be the real thing; for `fill`/`complete`/`write` run the model solution. For Excel/Power BI questions that
   cannot be executed, compute the expected value with pandas on the shared dataset (`docs/datasets.md`) and keep
   the tool steps to what the lesson taught. Put your scratch scripts under `ROOT/.tmp/<bank>/`.
6. **One consistent domain per chapter**: reuse the lesson's datasets and names; do not invent different numbers
   for the shared data.
7. **Arabic is written, not translated**; technical terms with the English in parentheses where the lesson did that.
   Code, identifiers, numbers stay LTR inside `<code>`.
8. **Right-sized**: a question is answerable in ≤ 90 seconds (hard ones ≤ 3 minutes). Code listings ≤ 15 lines
   except `error`/`trace` programs (≤ 20).
9. `write` questions: `checks` must be tolerant (allow both quote styles `["']`, optional spaces `\s*`, any variable
   name unless the question fixes it) and each check must be satisfied by your `solution.code` once whitespace is
   collapsed — the verifier proves it. Prefer 3–5 checks capturing the *essential* parts (the right function, the right
   arguments, the right order of steps), plus `forbid` for the classic wrong shortcut where it teaches something.
10. `contrast`: 5–7 rows; use it for pairs the lesson distinguishes (nominal/ordinal; astype/to_numeric; CSV/JSON; Excel
    Table/range; notebook/script…); make rows discriminating — avoid rows that are all "both".
11. `ordercode`: 5–8 statements whose order matters because of a dependency (not alphabetical coincidence); items are
    `{code: "…"}`; the correct order is the identity permutation `answer: [0,1,2,…]` in the order you list them
    (the engine shuffles).
12. Sensitive context (education data from Gaza): factual and respectful.

## Procedure

1. Read the docs and the lesson(s) completely. List their concepts, evolve blocks, silent failures and AI-lens points.
2. Draft the question plan (a table of 24: id, type, level, concept/evolve block, topic keys) — check it against
   the composition rules before writing prose.
3. Write the bank file in one go. Run `node --check` on it, then `python build.py` and
   `python tools/verify_chapter.py --scope <page id>` (e.g. `t1-test-01` or `t1-exam-a`) and fix everything it
   reports about your bank.
4. If `tools/check_banks.mjs` exists, run `node tools/check_banks.mjs <bank>`: it opens the real test page in a browser,
   answers every question correctly from its data and expects a "Correct" verdict each time — failures mean a
   data-shape mistake (wrong answer index, wrong accept list, regex that does not match your own solution…).
5. Final report (≤ 15 lines): the 24-row plan with types and levels, counts per type and level, topic keys used,
   anything you could not verify, and files outside your ownership that need changes.
