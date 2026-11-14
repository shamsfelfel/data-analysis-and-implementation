# Problem threads

A **thread** is one kind of problem that comes back, chapter after chapter, solved
better each time. Every appearance carries a `Thread` box (see AUTHORING §3) that
names the earlier solution, the **side effect or gap** it had, and what the new tool
closes — and says honestly what is still open. The tests then ask which solution
fits and why (`compare`, `contrast`, `complete`, `write`).

Add a row here whenever a lesson opens or continues a thread, so the chain stays
coherent as chapters are written. "Gap" = what the solution on that row still gets wrong.

## T-LOAD — Load a file into something analysable

| Where | Solution | Gap that the next row closes |
|---|---|---|
| T1 L1 | one loader per shape chosen by eye (`open`, `json.loads`, `pd.read_csv`) | each assumes its shape, nothing checks the result, types are guessed — `read_csv` on the free-text adverts file silently returns a (7, 5) table whose header is the first advert |
| T1 L3 | hand-written loop over lines, `split(",")`, every value a string | no types, breaks on a comma inside a field, no header handling |
| T1 L3 | `csv` module → `list[dict]` | still all strings; no vectorised arithmetic; nothing checks the data |
| T1 L3–L4 | `pd.read_csv(path)` | silently guesses dtypes: one stray `"1,200"` or `"TBD"` turns a number column into `object` (text) — note `"n/a"`, `"NA"`, `"NaN"`, `"null"` and empty cells are read as missing by default; dates stay strings |
| T1 L4 | `read_csv(sep=, encoding=, dtype=, parse_dates=, na_values=)` | correct for this file, but the knowledge lives in one call nobody validates |
| T1 L6 | `load_listings(path)` — reads everything as text, types each column from a schema dict, counts blank and failed cells, validates, returns (typed DataFrame, report) | one file layout only; a source change shows only when it fails the schema; Excel, Power Query and Power BI have their own silent defaults (P1) |
| P1 L3/L6 | the same load in a notebook / Power Query / Excel Table | three tools, three different silent defaults: `n/a` → `NaN` in pandas (the column loads `float64`), text in Excel (only `ISNUMBER` finds it), an Error in Power Query (survives until Replace Errors); item text compares case-sensitively in pandas and Power Query but not in Excel's criteria, so a TRIM-only `item_clean` leaves 19 spellings and still reports the right total |
| T2 L1 | the validated loader's output becomes the *input*: a canonical order for the repair, a fit/apply split, an untouched raw table, a per-step log and a held-out measurement | the frame repairs nothing yet, it still only reports — it sees the 19 `G` floors a schema cannot type, but it cannot see that 26 spellings are 5 cities, that 14 rows are one flat typed twice, or that a rent of 99999 is a phone number: those are facts about *values*, and a schema describes *types* |
| T2 L2–L5 | the repairs themselves: the missing-data decision per column, the canonical map, the named limits, the fitted encoders | each is still a step somebody remembers to call in the right order |
| T2 L6 | loading is now two or more files: a reference join defended by `validate="m:1"`, `indicator=` and a row-count assertion, all inside one `transform_listings(df, fitted=None) -> (matrix, report, fitted)` | nothing versions the reference file itself — `city_reference.csv` is read, not dated, so a scraper that starts covering Beit Lahia next month changes the answer in silence (P2) |
| P2 (planned) | `pd.read_*` with a schema, in the lab | — |

## T-MEANING — What may I do with this column?

| Where | Solution | Gap |
|---|---|---|
| T1 L1 | "is it a table?" — structured vs semi vs unstructured | says nothing about the *values* |
| T1 L2 | measurement levels: nominal / ordinal / interval / ratio decide the legal summary and chart; naive baseline `df.select_dtypes("number")` picks `listing_id` | a level is a human judgement; pandas selects by storage, not by meaning |
| T1 L2 | `FAMILY`/`LEVEL`/`ORDER` dicts plus `summary_for(series, level, order)` | the level is code stored beside the data: nothing checks it against the data or dtype, and a value missing from `order` silently becomes `NaN` — L3 closes this by putting the level into the dtype |
| T1 L3 | encode the level in the dtype (`category`, ordered `CategoricalDtype`, `Int64`, `datetime64`) | dtype ≠ level (a city code stored as `int64` is still nominal) |
| T2 L2 | the level now also decides the legal *fill*: ordinal `condition` may only take the mode, ratio `area_m2` takes a group median, and the target `monthly_rent` may not be filled at all, whatever its level | the mode is a poor answer for 36 unknown ordinal cells — it moves `good` from 37.4% to 44.5% of the column; an explicit `unknown` level needs an encoder (T2 L5) |
| T2 L3 | the level goes into the dtype for real: `condition` becomes an ordered `CategoricalDtype` so `level > "fair"` is legal (267 rows), `floor` becomes `Int64`, `furnished` becomes a nullable `boolean` | inserting a new level — June's `very good` — renumbers the codes, so an ordered category is a schema a later step has to be told about |
| T2 L5, T3–T4 (planned) | encoding, scaling, binning, EDA summaries chosen by level | — |

## T-PARSE — Turn a messy text value into a number or a date

| Where | Solution | Gap |
|---|---|---|
| T1 L1 | read a rent out of an advert by `str.split` by position → a regex per field → `None` for "not found" → ranges plus a `problems` column | only knows the phrasings we anticipated ("1,200 NIS/month" vs "650 USD") |
| T1 L2 | `read_csv(dtype={"school_code": str})` to keep an identifier as text | `"007"` parses "too well" to the integer 7 when you forget; L4's `dtype=`, `parse_dates=`, `na_values=` complete the recipe |
| T1 L3 | `pd.to_numeric(errors="coerce")` | turns every failure into `NaN` — the *reason* is lost, and so is the count unless you ask |
| T1 L4 | `thousands=`, `decimal=`, `parse_dates=` at read time; Excel serial dates → `pd.to_datetime(unit="D", origin="1899-12-30")` | fixes known formats; unknown formats still become `NaN` |
| T1 L5 | `pd.json_normalize` for nested fields | missing nested keys become `NaN` without warning |
| T1 L6 | blank cells are counted before parsing and missing cells after, so the difference is the per-column parse failures (with an example), and any failure makes the decision STOP | unknown formats are reported, not fixed (T2) |
| T1 L6 | (T-MEANING recap) the measurement level is written as data beside the schema, and a helper refuses a mean for nominal or ordinal columns | the level is still a human judgement |
| T2 L3 | the failures T1 L6 could only report are fixed by named rules: `FLOOR_WORDS` turns the 19 `G` floors into 0 behind a provenance flag, and `FORMATS` + `parse_dates()` reads 480 ISO and 23 `DD/MM` dates behind two assertions (no value matches two formats, none matches zero) | an *ambiguous* value is still unfixable from the file: 11 of the 23 slash dates read both ways and 10 of them land in a different month, so `03/04/2026` can only be settled by the source |

## T-FETCH — Get data from another system

| Where | Solution | Gap |
|---|---|---|
| T1 L5 | `requests.get(url).json()` | assumes 200 OK, one page, no limit |
| T1 L5 | check `status_code`, `raise_for_status()`, follow `next`, wait on 429 with bounded tries, retry 429/5xx/timeout with back-off, wrapped in `fetch_all()` with a `timeout=` and a count/id check | checks the transport, not the content: nothing validates the fields the server sent; no snapshot, no cache |
| T1 L6 | field-level validation with the same `validate()` as the file loaders, plus a dated snapshot of the pages | no expiry or refresh policy for the snapshot |

## P-QUESTION — Answer a business question from a table

The same question — *"which three items earn the most, and in which hour are we busiest?"* — answered
three ways on the cafeteria data (`docs/datasets.md` has the numbers).

| Where | Solution | Gap |
|---|---|---|
| P1 L1 | a written question card (question, decision, scope, success criteria, "so what" test) | computes nothing; two people can still disagree if they clean differently — closed by the L3/L4/L5 answers and the L6 line-up |
| P1 L4 | Excel: Table + `SUMIFS` + PivotTable (count ORDERS not lines: an `order_first` helper; raw line counts make 13:00 look busiest, 155 vs 149, but distinct orders after cleaning give 12:00, 119 vs 117) | the dirty rows are in the table; deleting them by hand is not repeatable; formulas live in cells |
| P1 L5 | Power BI: Get Data → Power Query steps → visual | steps are repeatable, but the model hides assumptions (summarisation, auto date hierarchy) |
| P1 L3 | pandas in a notebook | repeatable and diff-able, but only if the notebook runs top to bottom |
| P1 L6 | the three results lined up: they agree only after **the same cleaning rules** are applied in all three | the Excel and Power BI rows of the reconciliation are still typed in by a human |
| P2, P3, P8, P9 (planned) | faster, more robust versions per tool | — |

## P-CLEAN — Remove the rows that should not be counted

| Where | Solution | Gap |
|---|---|---|
| P1 L4 | Excel *Remove Duplicates* / filter and delete | destructive, silent, not repeatable, no record of what was removed |
| P1 L4 | Excel helper-column flag (`COUNTIFS` `dup_n` + `status`), reconciled 8,334.00 → 8,062.00 | the rules still live in cell formulas, not in a recorded recipe; `COUNTIFS` slows on large tables |
| P1 L5 | Power Query steps (Remove Duplicates, Replace Values, Filter Rows) | repeatable and recorded, but a step in the wrong order changes the answer |
| P1 L3 | `drop_duplicates()`, boolean masks, `str.strip().str.title()` | still hand-picked thresholds (what is an outlier price?) — see T2 |
| P1 L6 | R1–R5 written once outside all three tools, each with a reason and a removal count; `clean()` returns the log (16/5/2) so a tool can be audited against it | thresholds are still eyeballed (price ≤ 50), and R4's Title Case renames 76 correct "Water 500ml" lines (75 survive, carrying 256.00, unmatched against the raw menu) — T2/P3 |
| T2 L2 | removal decided by *mechanism*, not by habit: drop only the rows whose target is missing (19, not the 174 that `dropna()` takes — it deletes 155 labelled rows and 100% of two agencies). Otherwise keep the row, fill from a parameter fitted on the training rows, and flag the hole; the choice is recorded per column in a `(frame, log_row)` log carrying mechanism, decision and count, and applied unchanged to next month's file | the row count is still not the count of real flats (14 repeats + 9 reposts, T2 L3), and the `rent > 5000` limit it leans on is still eyeballed (T2 L4) |
| T2 L3 | the two halves separated at last: a *rule* (strip + lower + collapse) removes formatting, an explicit `CITY_MAP` + `.map()` resolves the decisions, and `canonicalise()` returns `(series, unmatched_counts)` so an unanticipated spelling is a counted line in the log instead of a silent `NaN` — 26 spellings to 5 with 0 unmatched, against P1 L6's `.str.title()`, which reaches only 11 and changes 169 rows, 40 of them from correct to incorrect | the maps are literals in the source rather than fitted parameters stored beside their output (T2 L6), and a correctly-spelled *unseen* category (`beit lahia`, `very good` in June) is reported but not handled (T2 L5) |
| T2 L4 | three named rules replace one eyeballed number. A `LIMITS` dict per column applied as a `mask` (`monthly_rent (50, 2000)`, `area_m2 (15, 400)`, `rooms (1, 8)`) voids 9 cells and deletes no rows — and catches the daily rate of 25 that both P1 L6's `price <= 50` and T2 L2's `rent > 5000` miss. A robust z (median 200.0, MAD 50.0, × 0.6745) is fitted on the training rents and stored. A cross-column ratio check finishes the job: `deposit / monthly_rent` is exactly 1, 2 or 3 in 378 of 380 pairs, and the 2 exceptions are precisely the 2 rent errors. Every finding is a flag with a count in the log, never a deletion, and a removal applies to the training rows only — dropping the 3 flagged held-out rows reads 55.47 against the honest 60.00 | the six numbers in `LIMITS`, the fence's `1.5` and the robust z's `3.5` are still human judgements — written down, counted and reviewable, but not derived; and the median, the MAD and the fence are refitted per call rather than stored beside the output they produced (T2 L6) |
| T2 L6 | removal is one step in a 17-step log, it happens exactly once, and any later change in the row count fails an assertion — which is only possible because `LIMITS` voids a cell instead of deleting a row | the six `LIMITS` numbers, the fence's `1.5` and the robust z's `3.5` are still underived judgements, and a *fitted* parameter has now joined them: `dep_months_all` is a median that flips between 1 and 2 with the sample, and it fills 97 of 117 deposits |
| T2 L7 | the removal that matters most is the one that happens *before* the split: de-duplicating on `listing_id` first, because 6 of 102 test rows otherwise share a flat with training and score 21.6667 against 62.2043 on the rest. `split_listings` asserts that no key is shared, so a contaminated split cannot be returned | the key is `listing_id`, and two genuinely different ids can still describe one flat advertised twice — T2 L3 found two such rows and this assertion cannot see them either |

## P-REPRO — Run it again next month and get the same answer

| Where | Solution | Gap |
|---|---|---|
| P1 L1 | a written decision log (rule, lines removed, reason) beside an untouched raw file | it is prose, so it can go stale and nothing checks it against what was actually done |
| P1 L2 | a README with install steps | steps go stale |
| P1 L2 | `python -m venv` + a pinned `requirements.txt` + a `check_env.py` PASS/FAIL script (exit code 0/1) | pins age; a full `pip freeze` is platform-bound (`pywinpty`, `colorama`); unpinned dependencies float (a fresh `pip install pandas` now gives 3.x, where text columns print `str` not `object`); Excel and Power BI cannot be checked from Python |
| P1 L3 | notebook "Restart & Run All" | hidden-state bugs when cells are run out of order |
| P1 L3 | a script with `main()` run from a terminal or scheduler | data files change and package versions drift unnoticed — Lesson 6 adds a golden-dataset reconciliation |
| P1 L4 | Excel: named Table and formulas | manual clicks leave no trail |
| P1 L5 | Power Query applied steps | tied to Power BI |
| P1 L6 | one script/notebook that rebuilds the answer from the raw file | the golden answer must be re-reviewed and dated per period; Excel and Power BI still cannot be re-run from Python |
| T2 L1 | every step returns `(frame, log_row)` and a four-line `run()` prints the decision log as a DataFrame — the log is produced by the code it describes, so it cannot go stale the way P1 L1's prose log can; the fitted parameters are applied to next month's file without refitting | the log records what happened, not whether the answer is right, and `fitted` is a dict in memory rather than an artefact stored beside its output (T2 L6) |
| T2 L6 | one function, one canonical order, 17 steps, 18 fitted parameters, a per-batch report, a structural fit/apply split, and three assertions that refuse to return a bad frame (the row count is unchanged since stage 1, no blank survives in the matrix, the column set equals `fitted["columns"]`). Measured end to end: 63.6726 → 36.9553 shekels held out | `fitted` is still a dict in memory — nothing dates it or stores it beside its output, so editing `COND_ORDER` renumbers 75 of 480 flats with every assertion still passing. The row order is not even reproducible, because `sort_values` is not stable. On that axis P1 L6's dated golden answer is still ahead of this chapter |
| T2 L7 | the split itself becomes a recorded artefact: a `SPLIT` dict carrying the seed, the proportions, the business key, the ordering column and a declared `as_of` date, returned beside the three frames with two assertions (nothing lost, nothing shared). The one-seed problem is answered by measurement rather than by hope — 5-fold CV puts the fold-to-fold spread at 7.0358 shekels, which retires T2 L7's own Concept 2 conclusion and leaves `governorate` preferred for having 5 parameters rather than 26 | nothing *dates* any of it. `SPLIT`, `AS_OF` and `fitted` are literals in a module, so changing `q=4` to `q=5` re-bins every flat with every assertion still passing and no record that the answer moved. P1 L6's dated golden answer is still ahead on that axis |

## T-HONEST — How do you know the number you are reporting is real?

The newest thread, and the only one whose subject is the analyst rather than the data. Opened
by T2 L7, which found the chapter failing it.

| Where | Solution | Gap that the next row closes |
|---|---|---|
| P1 L1 | a written decision log beside an untouched raw file | prose, so nothing checks it against what the code did |
| P1 L6 | a dated golden answer, re-reviewed per period | only covers the final figure, and Excel and Power BI cannot be re-run from Python |
| T2 L1 | a held-out split: a median fitted on 75% of the rows, the error read on the other 25% (60.1667) | honest exactly once — nothing stops the next five lessons from *choosing* by reading it |
| T2 L2–L6 | every comparison measured on the same held-out rows: the deposit fill, the canonical map, the outlier rule, the encoder, the whole pipeline | six readings, six decisions, one set: the reported 36.9553 is the smallest of six draws and is no longer a test score |
| T2 L7 | three parts with three jobs; the three leak types each measured (overlap 21.6667 vs 62.2043; fit-before-split 1.5323 shekels; a chronological split that cost nothing here and had to be run anyway); a declared `as_of`; 5-fold CV giving a 7-shekel spread that retires one earlier conclusion; and a test column read once, 60.9140 → 46.9355 | the test set has now been read twice in this chapter — once in L6 and once in L7 — so it is a validation set from here on; there is no nested CV, and `q=4` is still a preference nothing defends |
| T3–T4 (planned) | reading a distribution instead of asserting a threshold | — |
