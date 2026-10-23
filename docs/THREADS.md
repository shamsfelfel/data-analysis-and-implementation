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
| T1 L6 | `load_listings()` — a function that loads **and validates** (shape, dtypes, ranges, missing, duplicates) | covers one file; changes in the source schema are still found only when it fails |
| P1 L3/L6 | the same load in a notebook / Power Query / Excel Table | three tools, three different silent defaults (see T-QUESTION) |
| T2, P2 (planned) | cleaning pipeline; `pd.read_*` with a schema | — |

## T-MEANING — What may I do with this column?

| Where | Solution | Gap |
|---|---|---|
| T1 L1 | "is it a table?" — structured vs semi vs unstructured | says nothing about the *values* |
| T1 L2 | measurement levels: nominal / ordinal / interval / ratio decide the legal summary and chart; naive baseline `df.select_dtypes("number")` picks `listing_id` | a level is a human judgement; pandas selects by storage, not by meaning |
| T1 L2 | `FAMILY`/`LEVEL`/`ORDER` dicts plus `summary_for(series, level, order)` | the level is code stored beside the data: nothing checks it against the data or dtype, and a value missing from `order` silently becomes `NaN` — L3 closes this by putting the level into the dtype |
| T1 L3 | encode the level in the dtype (`category`, ordered `CategoricalDtype`, `Int64`, `datetime64`) | dtype ≠ level (a city code stored as `int64` is still nominal) |
| T2–T4 (planned) | encoding, scaling, binning, EDA summaries chosen by level | — |

## T-PARSE — Turn a messy text value into a number or a date

| Where | Solution | Gap |
|---|---|---|
| T1 L1 | read a rent out of an advert by `str.split` by position → a regex per field → `None` for "not found" → ranges plus a `problems` column | only knows the phrasings we anticipated ("1,200 NIS/month" vs "650 USD") |
| T1 L2 | `read_csv(dtype={"school_code": str})` to keep an identifier as text | `"007"` parses "too well" to the integer 7 when you forget; L4's `dtype=`, `parse_dates=`, `na_values=` complete the recipe |
| T1 L3 | `pd.to_numeric(errors="coerce")` | turns every failure into `NaN` — the *reason* is lost, and so is the count unless you ask |
| T1 L4 | `thousands=`, `decimal=`, `parse_dates=` at read time; Excel serial dates → `pd.to_datetime(unit="D", origin="1899-12-30")` | fixes known formats; unknown formats still become `NaN` |
| T1 L5 | `pd.json_normalize` for nested fields | missing nested keys become `NaN` without warning |
| T1 L6 | validation counts the `NaN`s *before* and *after* parsing and fails loudly if they grew | — |

## T-FETCH — Get data from another system

| Where | Solution | Gap |
|---|---|---|
| T1 L5 | `requests.get(url).json()` | assumes 200 OK, one page, no limit |
| T1 L5 | check `status_code`, `raise_for_status()`, follow `next`, sleep on 429 | still no retry/back-off policy, no timeout |
| T1 L6 | wrap in a function with `timeout=`, bounded retries, and a validated result | no caching: every run hits the server again |

## P-QUESTION — Answer a business question from a table

The same question — *"which three items earn the most, and in which hour are we busiest?"* — answered
three ways on the cafeteria data (`docs/datasets.md` has the numbers).

| Where | Solution | Gap |
|---|---|---|
| P1 L1 | a written question card (question, decision, scope, success criteria, "so what" test) | computes nothing; two people can still disagree if they clean differently — closed by the L3/L4/L5 answers and the L6 line-up |
| P1 L4 | Excel: Table + `SUMIFS` + PivotTable | the dirty rows are in the table; deleting them by hand is not repeatable; formulas live in cells |
| P1 L5 | Power BI: Get Data → Power Query steps → visual | steps are repeatable, but the model hides assumptions (summarisation, auto date hierarchy) |
| P1 L3 | pandas in a notebook | repeatable and diff-able, but only if the notebook runs top to bottom |
| P1 L6 | the three results lined up: they agree only after **the same cleaning rules** are applied in all three | — |
| P2, P3, P8, P9 (planned) | faster, more robust versions per tool | — |

## P-CLEAN — Remove the rows that should not be counted

| Where | Solution | Gap |
|---|---|---|
| P1 L4 | Excel *Remove Duplicates* / filter and delete | destructive, silent, not repeatable, no record of what was removed |
| P1 L5 | Power Query steps (Remove Duplicates, Replace Values, Filter Rows) | repeatable and recorded, but a step in the wrong order changes the answer |
| P1 L3 | `drop_duplicates()`, boolean masks, `str.strip().str.title()` | still hand-picked thresholds (what is an outlier price?) — see T2 |
| T2 (planned) | systematic cleaning: IQR / z-score, type and string cleaning | — |

## P-REPRO — Run it again next month and get the same answer

| Where | Solution | Gap |
|---|---|---|
| P1 L1 | a written decision log (rule, lines removed, reason) beside an untouched raw file | it is prose, so it can go stale and nothing checks it against what was actually done |
| P1 L2 | a README with install steps | steps go stale |
| P1 L3 | notebook "Restart & Run All" | hidden-state bugs when cells are run out of order |
| P1 L4 | Excel: named Table and formulas | manual clicks leave no trail |
| P1 L5 | Power Query applied steps | tied to Power BI |
| P1 L6 | one script/notebook that rebuilds the answer from the raw file | — |
