"""cafeteria_answer.py -- one question, one script, run from the raw file.

    python cafeteria_answer.py                      # reads cafeteria_orders.csv next to this script
    python cafeteria_answer.py path/to/orders.csv

Question: which three items earned the most revenue in September 2026,
and in which hour of the day are we busiest?

The five cleaning rules (write them once, apply them everywhere):
  R1  drop exact duplicate lines
  R2  drop refund lines (qty <= 0)
  R3  drop lines whose unit_price is missing, not a number, or implausible (> 50)
  R4  standardise item names (strip spaces, Title Case)
  R5  blank payment -> "Unknown"
line_total = qty x unit_price, and revenue is the sum of line_total.
"Busiest hour" = the hour of the day with the most DISTINCT order_ids
(an order with three lines is one order).
"""
import math
import sys
from pathlib import Path

import pandas as pd

MAX_PRICE = 50          # R3: a price above this is a typo (the 120.0 line)
TOL = 0.005             # half a piastre: money is compared with a tolerance

# The answer we reconcile against (computed once, reviewed by a person).
GOLDEN = {
    "lines": 748,
    "revenue": 8062.00,
    "top3": {"Shawarma Wrap": 1368.00, "Chicken Rice": 1020.00, "Falafel Sandwich": 917.00},
    "busiest": [(12, 119), (13, 117), (11, 99)],
}


def clean(df):
    """Apply R1-R5 in this order.  Returns (clean_df, removed) where
    removed says how many lines each rule took out."""
    removed = {}
    n = len(df)

    df = df.drop_duplicates()                                   # R1
    removed["R1 duplicates"], n = n - len(df), len(df)

    df = df[df["qty"] > 0]                                      # R2
    removed["R2 refunds"], n = n - len(df), len(df)

    # R3.  read_csv already turned the text 'n/a' into NaN (a default missing-value
    # string); to_numeric is the safety net for any other text in the column.
    price = pd.to_numeric(df["unit_price"], errors="coerce")
    keep = price.notna() & (price <= MAX_PRICE)
    df = df[keep].assign(unit_price=price[keep])
    removed["R3 bad price"], n = n - len(df), len(df)

    df = df.assign(item=df["item"].str.strip().str.title(),     # R4
                   payment=df["payment"].fillna("Unknown"))     # R5
    return df, removed


def answer(df):
    """The answer, as a plain dict, from CLEAN lines."""
    d = df.assign(line_total=df["qty"] * df["unit_price"],
                  hour=pd.to_datetime(df["order_time"]).dt.hour)
    by_item = d.groupby("item")["line_total"].sum().sort_values(ascending=False, kind="stable")
    by_hour = d.groupby("hour")["order_id"].nunique().sort_values(ascending=False, kind="stable")
    return {
        "lines": len(d),
        "revenue": round(float(d["line_total"].sum()), 2),
        "top3": {k: round(float(v), 2) for k, v in by_item.head(3).items()},
        "busiest": [(int(h), int(n)) for h, n in by_hour.head(3).items()],
        "tie": bool(by_hour.iloc[0] == by_hour.iloc[1]),
    }


def check(res):
    """Fail loudly if the result drifts from the golden answer."""
    assert res["lines"] == GOLDEN["lines"], f"lines {res['lines']} != {GOLDEN['lines']}"
    assert math.isclose(res["revenue"], GOLDEN["revenue"], abs_tol=TOL), res["revenue"]
    assert list(res["top3"]) == list(GOLDEN["top3"]), list(res["top3"])
    for item, value in GOLDEN["top3"].items():
        assert math.isclose(res["top3"][item], value, abs_tol=TOL), (item, res["top3"][item])
    assert res["busiest"] == GOLDEN["busiest"], res["busiest"]
    assert not res["tie"], "the busiest hour is a tie - report both"


def main(path=None):
    path = Path(path) if path else Path(__file__).with_name("cafeteria_orders.csv")
    raw = pd.read_csv(path)
    df, removed = clean(raw)
    res = answer(df)

    print(f"read {len(raw)} lines from {path.name}")
    for rule, n in removed.items():
        print(f"  {rule:<14} removed {n:>3}")
    print(f"clean lines : {res['lines']}")
    print(f"revenue     : {res['revenue']:,.2f}")
    for rank, (item, value) in enumerate(res["top3"].items(), start=1):
        print(f"  top {rank}: {item:<18} {value:>9,.2f}")
    (h1, n1), (h2, n2), (h3, n3) = res["busiest"]
    print(f"busiest hour: {h1}:00 ({n1} orders), then {h2}:00 ({n2}), {h3}:00 ({n3})")

    check(res)
    print("reconciled with the golden answer: OK")
    return res


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else None)
