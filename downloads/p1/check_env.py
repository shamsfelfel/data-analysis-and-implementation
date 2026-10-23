"""check_env.py - the Workbench Check.   Run:  python check_env.py
Exit code 0 = every check passed, 1 = at least one FAIL."""
import importlib
import importlib.metadata as md
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent          # the project folder, wherever you run from
REQUIRED = ["pandas", "numpy", "matplotlib", "openpyxl", "jupyterlab"]
CSV = HERE / "data" / "raw" / "cafeteria_orders.csv"
XLSX = HERE / "data" / "raw" / "cafeteria_orders.xlsx"
EXPECTED_ROWS = 771

results = []                                    # (ok, label, detail)


def check(ok, label, detail=""):
    results.append((ok, label, detail))


v = sys.version_info
check(v >= (3, 11), "Python 3.11 or newer", f"{v.major}.{v.minor}.{v.micro}")
in_venv = sys.prefix != sys.base_prefix
check(in_venv, "virtual environment is active",
      Path(sys.prefix).name if in_venv else "you are using the system Python")

for name in REQUIRED:
    try:
        importlib.import_module(name)
        check(True, f"package {name}", md.version(name))
    except Exception as err:                    # missing OR broken
        check(False, f"package {name}", f"{type(err).__name__}: {err}")

try:
    import pandas as pd
    df = pd.read_csv(CSV)
    check(len(df) == EXPECTED_ROWS, f"{CSV.name} has {EXPECTED_ROWS} rows",
          f"found {len(df)} rows, {df.shape[1]} columns")
except Exception as err:
    check(False, f"read {CSV.name}", f"{type(err).__name__}: {err}")

try:
    import openpyxl
    tables = list(openpyxl.load_workbook(XLSX)["Orders"].tables)
    check("tblOrders" in tables, f"{XLSX.name} has Table tblOrders", ", ".join(tables))
except Exception as err:
    check(False, f"read {XLSX.name}", f"{type(err).__name__}: {err}")

width = max(len(label) for _, label, _ in results)
for ok, label, detail in results:
    print(f"{'PASS' if ok else 'FAIL'}  {label:<{width}}  {detail}")
failed = [label for ok, label, _ in results if not ok]
print(f"\n{len(results) - len(failed)} passed, {len(failed)} failed")
print("Not checked here (do by hand): Excel opens the .xlsx; "
      "Power BI Desktop starts (Windows only).")
sys.exit(1 if failed else 0)
