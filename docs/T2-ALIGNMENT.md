# Aligning Theory 2 with the official `Ch02 - Preprocessing` deck

> **Done.** Everything in §3 is built and verified: `t2-lesson-07` with 7 concepts, 3 evolve
> blocks, 3 diagrams, 2 traces, 11 glossary terms and 27 topics; `t2-test-07` with 24 questions
> covering all 14 types; the two recap tables in L4 and L5; L6's closing re-pointed at L7; and
> two Lesson 7 questions in each of exams A, B and C (same type and level as the questions they
> replaced, so each bank's composition is unchanged). `verify_chapter.py --scope t2` passes, and
> `check_banks.mjs` drives all four touched banks in a browser with every correct answer accepted.
> One defect was found and fixed on the way: this lesson's first draft redefined
> `t2-dedupe-before-split`, a topic key L3 already owned, which would have silently re-pointed
> L3's review links at L7; the L7 key is now `t2-dedupe-then-split`.

The university's own lecture deck for this chapter (`C:\Shams-UCAS\5\Ch02 - Preprocessing.pptx`,
70 slides) arrived **after** T2 was built. T2 was written from the Syllabus PDF and committed
on 9 Nov 2026; both deck files are dated 13 Nov. The chapter therefore reaches most of the
deck's material by its own route, in the rental-listings domain, using none of the deck's
Titanic examples.

This file records what the audit found, what is genuinely missing, and the spec for the one
lesson that closes it. The deck itself is not in the repository (it is courseware we do not
own); everything we take from it is restated in the chapter's own domain.

## 1. What the deck covers, and where T2 already covers it

| Deck section | Slides | Where T2 teaches it |
|---|---|---|
| Missing values: MCAR / MAR / MNAR | 7–13 | L2 `h3` (`t2l2-s7`…`s10`), the three mechanisms named and each one demonstrated on a real column |
| The ~5 % deletion guideline, drop vs flag | 10 | L2 `h4`, `h6` |
| Fill by data type; grouped median | 11–12 | L2 `h5` (`t2l2-s14`, `s17`) |
| What imputation costs | 13 | L2 `h5` (`t2l2-s16`) and appendix A |
| Types lie; `df.info()`; dtype repairs | 16–18 | L3 `h5`, and T1 L4 for the read-time arguments |
| String cleaning before encoding | 20, 22 | L3 `h3` (26 spellings → 5 cities) |
| Dates: two formats, `to_datetime`, `NaT` | 23–25 | L3 `h6` |
| Duplicates: exact, key-level, the unit of a row | 26–29 | L3 `h1`, `h2` — including the split that straddles a duplicate (`t2l3-s5`) |
| Outliers: IQR, quartiles, the 1.5 fence | 33–36 | L4 `h4`, and appendix A derives the 1.5 |
| The z-score, and masking | 37–40 | L4 `h5` (`t2l4-s20`…`s24`), plus the robust z with the MAD |
| Detect → understand → decide; five treatments | 41–43 | L4 `h6`, `h7` (remove, cap, transform, impute, keep+flag) |
| Why scale; who needs it and who does not | 46–51 | L5 `h6`, `h7` (kNN: 99 % of the distance from one column) |
| Encoding: ordinal, one-hot, frequency, target | 52–57 | L5 `h2`, `h4`, `h5` — target encoding's leak and the out-of-fold fix included |
| Combining categories; rare → `Other` | 58–59 | L5 `h5` (`t2l5-s22`) |
| Merge / concat / reshape (promised on slide 3) | — | L6 `h1`–`h4`. The deck promises this on slide 3 and never delivers it; T2 does |

**Conclusion: sections 1–4 of the deck are covered, in several places more deeply than the
deck covers them.** No new lesson is needed for them. Two one-screen recap artifacts are
worth adding anyway (§3).

## 2. What is genuinely missing

Everything missing sits in the deck's **section 5** plus its unfulfilled "feature creation"
promise — and the chapter already names both as open limits at the end of L6:

* `t2l6-s29` *"One split, one seed, no cross-validation"*
* `t2l6-s30` *"Feature engineering has not started"*

So the gap is not a disagreement with the deck; it is a debt the chapter booked itself.

1. **The three-way split.** T2 splits train / held-out only. The deck's three parts with three
   jobs (train = practice, validation = mock exams, test = the final, read once) is not taught.
   This matters more here than in the deck, because **the chapter has been choosing things on
   the held-out rows** — the fill rule in L2, the fence in L4, the encoder in L5, the pipeline
   in L6 — which means its "honest" number stopped being honest several lessons ago. That is
   the lesson's opening argument and it is true of our own chapter.
2. **Data leakage as named vocabulary.** The three types (a feature that copies the target or
   the same row in both halves; train/test overlap from fitting before the split; time leakage)
   and the prevention checklist. T2 practises the discipline everywhere and never names it.
3. **Cross-validation.** Not covered at all.
4. **Feature creation.** Binning a number into a band as a *feature* (`cut` vs `qcut`, the
   interval midpoint) and features derived from a date (`.dt.month`, `.dt.day_name()`,
   `is_weekend`, recency). L4 `t2l4-s8` uses equal-width and equal-count bins to *look at* a
   distribution; using them as model inputs is a different move and is not taught.

## 3. The plan

**One new lesson** — `t2-lesson-07`, the chapter's new final lesson — plus its test, plus two
small recap tables folded into existing lessons. L6 keeps its place as the hand-rolled
capstone; L7 names the discipline and hands the order to a library.

| Change | File |
|---|---|
| New lesson 7 | `src/content/t2/lesson-07.html` (+ topics, glossary, traces, diagrams) |
| New lesson test 7 | `assets/data/questions/t2-test-07.js`, 24 questions |
| Registry entries | `src/registry.json`: `t2-lesson-07`, `t2-test-07` after `t2-test-06` |
| IQR vs z recap table (deck slide 40) | `src/content/t2/lesson-04.html`, end of `h5` |
| Choose-an-encoder recap table (deck slide 60) | `src/content/t2/lesson-05.html`, end of `h5` |
| L6's closing line stops calling itself the chapter's end | `src/content/t2/lesson-06.html` (`t2l6-s36`) |
| Chapter tests gain L7 coverage | `t2-exam-a.js`, `-b.js`, `-c.js` |
| New thread rows | `docs/THREADS.md` (P-REPRO, and a new T-HONEST row) |

### Lesson 7 spec — "The Split, the Leak, and the Order You Can Prove"

Seven concepts, climbing. Every number below is **measured**, by
`.tmp/t2l7/measure*.py`, on `downloads/t2/listings_raw.csv`. Reproduce them in the lesson from
the lesson's own code.

**Concept 1 — The held-out rows we have been spending.** The chapter's own split
(`sample(frac=0.75, random_state=3)`) gives 377 / 126 rows, 363 / 120 with a rent, baseline
median 200.0, MAE 61.7355 train and 60.1667 held out — L1's number, reproduced. Then count the
decisions taken by looking at that held-out number across L2, L4, L5 and L6. A number you
optimised against is a training number wearing a disguise.

**Concept 2 — Three parts, three jobs.** 60/20/20 on the 503 raw rows (`random_state=3`):
train 301 rows / 291 rents, validation 100 / 93, test 102 / 99; fitted median 195.0; MAE
59.8625 train, 64.9462 validation, 62.3737 test. Then choose a grouping on *validation* only:

| prediction | train | validation | test |
|---|---:|---:|---:|
| one median for everyone | 59.8625 | 64.9462 | 62.3737 |
| median per governorate | 53.0584 | 61.9086 | 58.4596 |
| median per agency | 57.6460 | 64.8118 | 63.5859 |
| median per raw city | 51.1340 | 63.0108 | 59.7475 |

The raw-city grouping has the best **training** score (51.1340) and loses on validation. That
is the whole argument for the middle set, visible in one table.

**Concept 3 — Leak one: the same fact in both halves.** On the 503-row file, 6 of the 102 test
rows carry a `listing_id` that is also in train. MAE on those 6 rows is **21.6667**; on the
other 96 it is **62.2043** — three times better on the rows the model has already seen. De-duplicate
*before* splitting (480 rows → train 288 / validation 96 / test 96) and the test MAE is 60.9140.
Links back to L3 `t2l3-s5`, which found the straddling duplicate but did not measure what it buys.

**Concept 4 — Leak two: fitting before the split.** Target-encode `agency` (L5 `h5`) with the
median fitted on **all** rows: test MAE 62.4242. Fitted on train only: **63.5859**. The leak is
worth 1.16 shekels here — be honest that it is small, and say exactly when it is not (a rare
category whose mean is one row; a scaler whose min and max come from a test outlier; a feature
selected by correlation over the whole file).

**Concept 5 — Leak three: time, and the as-of date.** The file spans 2026-02-01 → 2026-06-19.
Chronological split at 2026-05-01: past 340 rows / 327 rents, future 140 / 133. A per-city median
fitted on the past scores **55.4511** on the future, *better* than the 60.9140 of the random split —
because the market barely moved (past median 200.0, future 195.0). Report that honestly: the random
split flattered nothing here, and you could not have known that in advance. Then the as-of trap: a
recency feature built from `max(listed_on)` over the rows you happen to hold is a parameter read out
of the data. On this file the newest advert (2026-06-19) lands in the training rows under every seed
tried (3, 7, 11, 42), so the bug would never show up in a test — which is the reason to declare the
as-of date rather than compute it.

**Concept 6 — One split, one seed, and what it cannot tell you.** 5-fold CV over the 384
train+validation rows (`random_state=7`):

| prediction | folds | mean | sd |
|---|---|---:|---:|
| one median for everyone | 58.33, 70.14, 56.60, 69.73, 56.22 | 62.2042 | 7.1056 |
| median per governorate | 55.53, 62.92, 53.75, 64.67, 47.43 | 56.8610 | 7.0358 |
| median per raw city | 60.53, 66.55, 55.28, 61.83, 48.38 | 58.5144 | 6.9438 |

The fold-to-fold spread is about **7 shekels**, so the 1.65-shekel gap between governorate and raw
city — a gap Concept 2 treated as a decision — is inside the noise. This is the honest retraction of
part of Concept 2 and it must be stated as one.

**Concept 7 — Feature creation, under the rule.** Two derivations, one that pays and one that does
not, both measured on the 480-row split (train 288, median 200.0).

*Dates earn nothing here.* Baseline train 57.0863 / validation 77.6404; median per month 55.9173 /
77.8652; per weekday 55.9712 / 79.7753; per `is_weekend` 56.9424 / 77.7528. Training improves,
validation gets worse: that is overfitting, not a feature.

*Bands do pay.* `qcut` edges fitted on train, after repairing the five dunum areas (L4 `t2l4-s3`):
`[32.3, 61.82, 72.95, 86.72, 113.6]`.

| prediction | train | validation | test |
|---|---:|---:|---:|
| baseline: one median | 57.0863 | 77.6404 | 60.9140 |
| median per governorate | 51.6906 | 72.1348 | 57.9570 |
| median per area band | 49.3525 | 63.2022 | 53.6290 |
| governorate × area band | 37.9137 | 54.5787 | 48.2796 |

Read the test column **once**: 60.9140 → 48.2796 shekels. Note the widening train-validation gap on
the last row (37.91 against 54.58) and say plainly that the interaction has started to overfit.

*The silent failure worth a `.warn`:* bin before repairing units and the bands are nonsense. With the
five dunum areas left at 0.0x, `pd.cut(area, bins=4)` puts **4, 55, 140, 73** rows in its four bands;
after the ×1000 repair it puts **45, 91, 94, 42**. The validation MAE moves 64.1011 → 73.7640, which
is about one standard deviation of the fold spread from Concept 6 — so it is *not* evidence that the
repair hurt. It is evidence that the bins were meaningless before and that one split cannot settle it.
Both halves of that sentence matter.

**Appendix** — the arithmetic: why a validation set shrinks the training rows and when that costs more
than it buys; the interval midpoint (`IntervalIndex.mid`) as a numeric feature and what it throws away
(areas 70.1 and 89.9 share a band and get one prediction); the `scikit-learn` form of the whole thing
(`Pipeline` + `ColumnTransformer` + `cross_val_score`), promoted from L6 appendix D, and the one line
that makes it leak-proof inside cross-validation.

### Threads

`T-HONEST` is a new thread: *how do you know the number you are reporting is real?* Rows — P1 L1 (a
written decision log), T2 L1 (a single held-out split), T2 L6 (three assertions, one seed), T2 L7
(three parts, cross-validation, a declared as-of date; gap: no nested CV, and the test set is now read
twice in this chapter — once in L6 and once here). Add a row to `P-REPRO` for L7 as well.

## 4. Honest notes

* The deck teaches on the Titanic; T2 teaches on Gaza rental listings. SPEC §4 requires one domain
  per chapter, so the deck's examples are **restated**, never imported. Where the deck's number is
  famous enough to be worth meeting (the 1.5 fence, |z| > 3, the 5 % rule) the chapter already has it.
* The deck's slide 3 promises merge / concat / reshape / aggregate / feature creation. The deck never
  delivers it. T2 L6 delivers the first four and L7 delivers the last.
* `missingno`, `KNNImputer` and `IterativeImputer` are named in L2 but not used; the course adds no
  runtime dependency for them. That stays as it is — naming the tool is the right depth here.
* Nothing in this plan changes an existing lesson's numbers, so the stale-prose sweep that bit Theory 2
  does not apply. The two recap tables and L6's closing line are additive edits.
