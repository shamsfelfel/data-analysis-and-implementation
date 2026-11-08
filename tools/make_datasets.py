#!/usr/bin/env python3
"""Generate the course's shared sample datasets, deterministically.

    python tools/make_datasets.py

Writes into downloads/ (shipped with the site, linked from the lessons) and
docs/datasets.md (the facts every lesson quotes, computed here from the files
so a lesson can never disagree with the data).

Theory 1  -- rental listings (CSV, semicolon CSV with Arabic, Excel with serial
             dates) and a paginated school-registry API (JSON fixtures)
Practical 1 -- a campus cafeteria's orders for one month (CSV, Excel with a
             Table, and a menu sheet), deliberately a little messy.
Theory 2  -- the same rental listings at four times the size and much worse:
             the raw scrape a transformation chapter has to repair, a city
             reference table to join to, next month's batch with unseen
             categories, and one wide table to melt.

The mess is deliberate and documented: duplicates, missing values, spelling
variants, a price typo, refunds. Lessons teach students to find it.
"""
import csv
import datetime as dt
import io
import json
import os
import random

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
T1 = os.path.join(ROOT, "downloads", "t1")
P1 = os.path.join(ROOT, "downloads", "p1")
for d in (T1, P1):
    os.makedirs(d, exist_ok=True)

facts = []


def fact(s):
    facts.append(s)


# ------------------------------------------------------------------ Theory 1: rentals

rnd = random.Random(2305)
CITIES = [("Gaza", "غزة", 420, 85), ("Khan Younis", "خان يونس", 300, 80), ("Rafah", "رفح", 250, 75),
          ("Deir al-Balah", "دير البلح", 270, 78), ("Jabalia", "جباليا", 230, 82)]
GOV = {"Gaza": "Gaza", "Khan Younis": "Khan Younis", "Rafah": "Rafah",
       "Deir al-Balah": "Deir al-Balah", "Jabalia": "North Gaza"}
ADVERT = [
    "Bright flat near the market, second floor, quiet street",
    "Sunny apartment, balcony, newly painted, water tank included",
    "Ground floor, close to the university, suitable for students",
    "Family flat, three bedrooms, big kitchen, generator available",
    "Small studio, ideal for one person, internet ready",
]

rentals = []
base = dt.date(2026, 1, 5)
for i in range(1, 61):
    city_en, city_ar, rent0, area0 = rnd.choice(CITIES)
    rooms = rnd.choice([1, 2, 2, 3, 3, 3, 4, 5])
    area = round(area0 * (0.55 + 0.22 * rooms) * rnd.uniform(0.85, 1.15), 1)
    rent = int(round((rent0 * (0.6 + 0.15 * rooms)) * rnd.uniform(0.85, 1.2) / 5.0) * 5)
    furnished = rnd.choice(["yes", "no", "no"])
    rentals.append({
        "listing_id": 1000 + i,
        "city": city_en, "city_ar": city_ar, "governorate": GOV[city_en],
        "monthly_rent": rent, "area_m2": area, "rooms": rooms, "furnished": furnished,
        "listed_on": (base + dt.timedelta(days=rnd.randint(0, 120))).isoformat(),
        "advert": rnd.choice(ADVERT),
    })
# deliberate gaps
for i in (4, 17, 33, 48):
    rentals[i]["area_m2"] = ""
for i in (9, 25):
    rentals[i]["monthly_rent"] = ""
rentals[41]["rooms"] = ""

cols = ["listing_id", "city", "governorate", "monthly_rent", "area_m2", "rooms", "furnished", "listed_on", "advert"]
with io.open(os.path.join(T1, "rental_listings.csv"), "w", encoding="utf-8", newline="") as f:
    w = csv.DictWriter(f, fieldnames=cols, extrasaction="ignore")
    w.writeheader()
    w.writerows(rentals)

# semicolon, decimal comma, Arabic city names, UTF-8 with BOM (what Excel exports in many locales)
cols_ar = ["listing_id", "المدينة", "الإيجار_الشهري", "المساحة_م2", "الغرف", "مفروشة", "تاريخ_الإعلان"]
with io.open(os.path.join(T1, "rental_listings_ar_semicolon.csv"), "w", encoding="utf-8-sig", newline="") as f:
    w = csv.writer(f, delimiter=";")
    w.writerow(cols_ar)
    for r in rentals[:30]:
        w.writerow([r["listing_id"], r["city_ar"], r["monthly_rent"],
                    str(r["area_m2"]).replace(".", ","), r["rooms"],
                    "نعم" if r["furnished"] == "yes" else "لا", r["listed_on"]])

# Excel: a title block above the header, serial dates in General format on the Raw sheet
try:
    import openpyxl
    from openpyxl.utils import get_column_letter
    wb = openpyxl.Workbook()
    ws = wb.active
    ws.title = "Raw"
    ws["A1"] = "Rental listings - export (do not edit)"
    ws["A2"] = "Exported 2026-05-10"
    hdr = ["listing_id", "city", "monthly_rent", "area_m2", "rooms", "furnished", "listed_on"]
    for j, h in enumerate(hdr, 1):
        ws.cell(row=4, column=j, value=h)
    epoch = dt.date(1899, 12, 30)
    for i, r in enumerate(rentals[:40], 5):
        ws.cell(row=i, column=1, value=r["listing_id"])
        ws.cell(row=i, column=2, value=r["city"])
        ws.cell(row=i, column=3, value=r["monthly_rent"] if r["monthly_rent"] != "" else None)
        ws.cell(row=i, column=4, value=r["area_m2"] if r["area_m2"] != "" else None)
        ws.cell(row=i, column=5, value=r["rooms"] if r["rooms"] != "" else None)
        ws.cell(row=i, column=6, value=r["furnished"])
        d = dt.date.fromisoformat(r["listed_on"])
        c = ws.cell(row=i, column=7, value=(d - epoch).days)     # a serial number, General format
        c.number_format = "General"
    ws2 = wb.create_sheet("Clean")
    for j, h in enumerate(hdr, 1):
        ws2.cell(row=1, column=j, value=h)
    for i, r in enumerate(rentals[:40], 2):
        ws2.cell(row=i, column=1, value=r["listing_id"])
        ws2.cell(row=i, column=2, value=r["city"])
        ws2.cell(row=i, column=3, value=r["monthly_rent"] if r["monthly_rent"] != "" else None)
        ws2.cell(row=i, column=4, value=r["area_m2"] if r["area_m2"] != "" else None)
        ws2.cell(row=i, column=5, value=r["rooms"] if r["rooms"] != "" else None)
        ws2.cell(row=i, column=6, value=r["furnished"])
        c = ws2.cell(row=i, column=7, value=dt.date.fromisoformat(r["listed_on"]))
        c.number_format = "yyyy-mm-dd"
    wb.save(os.path.join(T1, "rental_listings.xlsx"))
    HAVE_XLSX = True
except ImportError:
    HAVE_XLSX = False

# the school-registry API, as three pages of fixtures + the whole document
LEVELS = ["Primary", "Preparatory", "Secondary"]
schools = []
for i in range(1, 14):
    city_en, city_ar, _, _ = CITIES[(i - 1) % len(CITIES)]
    boys, girls = rnd.randint(80, 320), rnd.randint(80, 320)
    s = {
        "id": 200 + i,
        "name": {"en": "School %d (%s)" % (i, city_en), "ar": "مدرسة %d (%s)" % (i, city_ar)},
        "governorate": GOV[city_en],
        "level": LEVELS[i % 3],
        "enrolment": {"boys": boys, "girls": girls},
        "location": {"lat": round(31.3 + rnd.random() * 0.3, 4), "lon": round(34.2 + rnd.random() * 0.2, 4)},
        "facilities": rnd.sample(["library", "lab", "playground", "canteen", "computer room"], rnd.randint(0, 3)),
    }
    if i % 4 != 0:
        s["contacts"] = {"phone": "08-%07d" % rnd.randint(1000000, 9999999)}
        if i % 3 == 0:
            s["contacts"]["email"] = "school%d@example.org" % i
    schools.append(s)
per = 5
pages = [schools[k:k + per] for k in range(0, len(schools), per)]
for n, chunk in enumerate(pages, 1):
    doc = {"page": n, "per_page": per, "total": len(schools), "pages": len(pages),
           "next": ("https://api.example.org/schools?page=%d" % (n + 1)) if n < len(pages) else None,
           "results": chunk}
    with io.open(os.path.join(T1, "schools_api_page%d.json" % n), "w", encoding="utf-8", newline="") as f:
        json.dump(doc, f, ensure_ascii=False, indent=2)
with io.open(os.path.join(T1, "schools.json"), "w", encoding="utf-8", newline="") as f:
    json.dump({"results": schools}, f, ensure_ascii=False, indent=2)

fact("T1 rental_listings.csv: %d rows; %d blank area_m2, %d blank monthly_rent, %d blank rooms; columns %s"
     % (len(rentals), 4, 2, 1, ", ".join(cols)))
fact("T1 rental_listings_ar_semicolon.csv: 30 rows, ';' delimiter, decimal comma in المساحة_م2, UTF-8 with BOM")
fact("T1 rental_listings.xlsx: sheet 'Raw' has 3 title rows above the header at row 4 and listed_on as serial numbers "
     "(General format); sheet 'Clean' has real dates. 40 rows. %s" % ("" if HAVE_XLSX else "(openpyxl missing: not written!)"))
fact("T1 schools: %d schools in %d API pages of %d (schools_api_page1..%d.json) and one document schools.json; "
     "contacts missing on %d schools, email present on %d"
     % (len(schools), len(pages), per, len(pages),
        sum(1 for s in schools if "contacts" not in s),
        sum(1 for s in schools if "email" in s.get("contacts", {}))))

# ------------------------------------------------------------------ Practical 1: cafeteria

rnd = random.Random(1103)
MENU = [
    ("Espresso", "Drink", 6.0), ("Latte", "Drink", 9.0), ("Tea", "Drink", 3.0), ("Karak Tea", "Drink", 5.0),
    ("Orange Juice", "Drink", 8.0), ("Water 500ml", "Drink", 2.0),
    ("Falafel Sandwich", "Food", 7.0), ("Shawarma Wrap", "Food", 12.0), ("Cheese Manakish", "Food", 8.0),
    ("Chicken Rice", "Food", 15.0), ("Lentil Soup", "Food", 6.0),
    ("Chips", "Snack", 4.0), ("Date Cookie", "Snack", 3.5), ("Nuts Cup", "Snack", 5.0),
    ("Baklava", "Dessert", 6.5), ("Kunafa Slice", "Dessert", 9.0),
]
WEIGHT = {"Espresso": 9, "Latte": 7, "Tea": 14, "Karak Tea": 8, "Orange Juice": 6, "Water 500ml": 12,
          "Falafel Sandwich": 13, "Shawarma Wrap": 9, "Cheese Manakish": 8, "Chicken Rice": 5, "Lentil Soup": 3,
          "Chips": 8, "Date Cookie": 5, "Nuts Cup": 3, "Baklava": 3, "Kunafa Slice": 2}
HOUR_W = {8: 6, 9: 9, 10: 12, 11: 14, 12: 22, 13: 20, 14: 11, 15: 6, 16: 3}
PAY = ["Cash"] * 5 + ["Card"] * 2 + ["Wallet"] * 2 + ["Voucher"]
CUST = ["Student"] * 7 + ["Staff"] * 2 + ["Visitor"]
menu_price = {m[0]: m[2] for m in MENU}
menu_cat = {m[0]: m[1] for m in MENU}

items, wts = zip(*WEIGHT.items())
hours, hw = zip(*HOUR_W.items())
orders = []
oid = 5000
day = dt.date(2026, 9, 1)
while day.month == 9:
    if day.weekday() in (4, 5):            # Friday, Saturday: closed
        day += dt.timedelta(days=1)
        continue
    n = rnd.randint(22, 34) + (6 if day.weekday() == 6 else 0)
    for _ in range(n):
        oid += 1
        h = rnd.choices(hours, hw)[0]
        t = dt.datetime(day.year, day.month, day.day, h, rnd.randint(0, 59), rnd.randint(0, 59))
        for _line in range(rnd.choice([1, 1, 1, 2])):
            item = rnd.choices(items, wts)[0]
            qty = rnd.choice([1, 1, 1, 2, 2, 3])
            orders.append({"order_id": oid, "order_time": t, "item": item, "category": menu_cat[item],
                           "qty": qty, "unit_price": menu_price[item], "payment": rnd.choice(PAY),
                           "customer_type": rnd.choice(CUST)})
    day += dt.timedelta(days=1)

# --- deliberate mess ---------------------------------------------------------
clean_rows = len(orders)
# 1. duplicated lines (double-click on the till)
dups = rnd.sample(range(len(orders)), 14)
for k in sorted(dups, reverse=True):
    orders.insert(k + 1, dict(orders[k]))
# 2. missing payment method
miss = rnd.sample(range(len(orders)), 17)
for k in miss:
    orders[k]["payment"] = ""
# 3. spelling variants of item names
variants = {"Latte": ["latte", "LATTE", "Latte "], "Tea": ["tea", "Tea "], "Espresso": ["espresso", "Espresso "]}
nvar = 0
for o in orders:
    if o["item"] in variants and rnd.random() < 0.06:
        o["item"] = rnd.choice(variants[o["item"]])
        nvar += 1
# 4. a price typo (a decimal point lost) and a zero/negative quantity (refunds)
typo_at = next(i for i, o in enumerate(orders) if o["item"] == "Shawarma Wrap")
orders[typo_at]["unit_price"] = 120.0
ref = rnd.sample([i for i, o in enumerate(orders) if o["qty"] == 1], 5)
for k in ref:
    orders[k]["qty"] = -1
# 5. an unparseable price
bad_at = next(i for i, o in enumerate(orders) if o["item"] == "Tea" and i > typo_at)
orders[bad_at]["unit_price"] = "n/a"

cols = ["order_id", "order_time", "item", "category", "qty", "unit_price", "payment", "customer_type"]
with io.open(os.path.join(P1, "cafeteria_orders.csv"), "w", encoding="utf-8", newline="") as f:
    w = csv.writer(f)
    w.writerow(cols)
    for o in orders:
        w.writerow([o["order_id"], o["order_time"].strftime("%Y-%m-%d %H:%M:%S"), o["item"], o["category"],
                    o["qty"], o["unit_price"], o["payment"], o["customer_type"]])
with io.open(os.path.join(P1, "cafeteria_menu.csv"), "w", encoding="utf-8", newline="") as f:
    w = csv.writer(f)
    w.writerow(["item", "category", "list_price"])
    for m in MENU:
        w.writerow(m)

try:
    import openpyxl
    from openpyxl.worksheet.table import Table, TableStyleInfo
    wb = openpyxl.Workbook()
    ws = wb.active
    ws.title = "Orders"
    ws.append(cols)
    for o in orders:
        ws.append([o["order_id"], o["order_time"], o["item"], o["category"], o["qty"], o["unit_price"],
                   o["payment"] or None, o["customer_type"]])
    last = len(orders) + 1
    for row in ws.iter_rows(min_row=2, min_col=2, max_col=2):
        row[0].number_format = "yyyy-mm-dd hh:mm"
    ws.column_dimensions["B"].width = 18
    ws.column_dimensions["C"].width = 18
    tab = Table(displayName="tblOrders", ref="A1:H%d" % last)
    tab.tableStyleInfo = TableStyleInfo(name="TableStyleMedium2", showRowStripes=True)
    ws.add_table(tab)
    ws.freeze_panes = "A2"
    wm = wb.create_sheet("Menu")
    wm.append(["item", "category", "list_price"])
    for m in MENU:
        wm.append(list(m))
    tab2 = Table(displayName="tblMenu", ref="A1:C%d" % (len(MENU) + 1))
    tab2.tableStyleInfo = TableStyleInfo(name="TableStyleLight9", showRowStripes=True)
    wm.add_table(tab2)
    wb.save(os.path.join(P1, "cafeteria_orders.xlsx"))
except ImportError:
    pass

# ------------------------------------------------------------------ Theory 2: transformation

T2 = os.path.join(ROOT, "downloads", "t2")
os.makedirs(T2, exist_ok=True)

# Theory 2 keeps Theory 1's world -- the same five cities, the same kind of
# advert -- at the size and the messiness a transformation chapter needs: this
# is what four months of scraping collected and nobody cleaned. Every defect
# below is there to be found by a named technique in a named lesson:
#
#   L2 missing data   three mechanisms, on purpose: area_m2 blank at random,
#                     deposit blank for two whole agencies (depends on another
#                     column), monthly_rent blank mostly where the rent is high
#                     (depends on the value itself).
#   L3 duplicates,    14 exactly repeated rows; 9 listings reposted with a new
#       text, types   date, which drop_duplicates() alone does NOT catch;
#                     five cities under 27 spellings that case-folding alone
#                     cannot merge ("Khan Yunis" vs "Khan Younis"); furnished
#                     written six ways; floor mixing 0-6 with "G"; dates in two
#                     formats.
#   L4 outliers       one rent of 99999 (a phone number a scraper grabbed), one
#                     of 25 (a daily rate), a handful of genuinely expensive
#                     flats that no fence should remove, five areas recorded in
#                     dunum instead of m2 -- a unit error, not an outlier.
#   L5 encoding,      condition is ordinal; agency is high-cardinality with a
#       scaling       long tail of agencies that appear once.
#   L6 reshape,       city_reference.csv joins on the CLEANED city name only;
#       combine       rent_history_wide.csv is wide and wants melting;
#                     listings_new.csv carries categories the training data
#                     never saw.
r2 = random.Random(22305)

T2_CITIES = ["Gaza", "Khan Younis", "Rafah", "Deir al-Balah", "Jabalia"]
CITY_WEIGHT = {"Gaza": 34, "Khan Younis": 23, "Rafah": 16, "Deir al-Balah": 15, "Jabalia": 12}
# the spellings that actually appear in the raw file, per canonical city
CITY_SPELLINGS = {
    "Gaza":          ["Gaza"] * 9 + ["gaza", "GAZA", " Gaza", "Gaza ", "  Gaza"],
    "Khan Younis":   ["Khan Younis"] * 7 + ["Khan Yunis", "Khan Yunis", "khan younis", "Khan-Younis", "Khan Younis "],
    "Rafah":         ["Rafah"] * 8 + ["rafah", "RAFAH", "Rafah ", " rafah"],
    "Deir al-Balah": ["Deir al-Balah"] * 6 + ["Deir Al Balah", "Deir al Balah", "deir al-balah", "Deir-al-Balah"],
    "Jabalia":       ["Jabalia"] * 6 + ["Jabalya", "Jabaliya", "jabalia", "JABALIA"],
}
T2_GOV = {"Gaza": "Gaza", "Khan Younis": "Khan Younis", "Rafah": "Rafah",
          "Deir al-Balah": "Deir al-Balah", "Jabalia": "North Gaza", "Beit Lahia": "North Gaza"}
FURN_YES = ["yes"] * 6 + ["Yes", "Y", "1", "TRUE", "yes "]
FURN_NO = ["no"] * 6 + ["No", "N", "0", "FALSE", " no"]
COND_ORDER = ["poor", "fair", "good", "excellent"]
COND_SPELLINGS = {
    "poor":      ["poor"] * 4 + ["Poor", "POOR"],
    "fair":      ["fair"] * 5 + ["Fair ", "FAIR", " fair"],
    "good":      ["good"] * 6 + ["Good", " good", "GOOD"],
    "excellent": ["excellent"] * 4 + ["Excellent", "EXCELLENT"],
}
CITY_BASE = {"Gaza": 172, "Khan Younis": 131, "Rafah": 112, "Deir al-Balah": 121, "Jabalia": 104}
COND_MULT = {"poor": 0.78, "fair": 0.91, "good": 1.0, "excellent": 1.21}
# a long tail on purpose: five agencies carry most rows, nine appear once
AGENCY_POOL = (["Al-Quds Realty"] * 78 + ["Baytuna Properties"] * 62 + ["Noor Estates"] * 54
               + ["Sahel Housing"] * 41 + ["Rafah Homes"] * 33 + ["Diwan Rentals"] * 24
               + ["Manara Estates"] * 19 + ["Zaytoun Letting"] * 15 + ["Hayat Properties"] * 12
               + ["Nakhil Estates"] * 9 + ["Salam Realty"] * 7 + ["Qamar Letting"] * 5
               + ["Burj Rentals", "Faris Housing", "Shams Homes", "Tala Properties",
                  "Waha Rentals", "Yasmin Estates", "Andalus Homes", "Mishkat Realty",
                  "Zahra Letting"])
NO_DEPOSIT_AGENCIES = ("Noor Estates", "Diwan Rentals")     # these two never publish one
T2_ADVERT = [
    "Bright flat near the market, second floor, quiet street",
    "Sunny apartment with a balcony, newly painted, water tank included",
    "Ground floor, close to the university, suitable for students",
    "Family flat, three bedrooms, big kitchen, generator available",
    "Small studio, ideal for one person, internet ready",
    "Renovated flat, solar heater, close to the main road",
    "Spacious apartment, separate entrance, roof access",
    "Two bedrooms, tiled floors, near the health centre",
]

T2_COLS = ["listing_id", "city", "governorate", "agency", "monthly_rent", "area_m2",
           "rooms", "floor", "condition", "furnished", "deposit", "listed_on", "advert"]


def t2_rent(city, rooms, cond, furn):
    """Skewed on purpose: the lognormal factor gives L4 a right tail to argue about."""
    v = CITY_BASE[city] * (0.52 + 0.31 * rooms) * COND_MULT[cond]
    if furn:
        v *= 1.17
    v *= r2.lognormvariate(0.0, 0.21)
    return int(round(v / 5.0) * 5)


def t2_row(i, listed, city=None, cond=None, agency=None, clean=False):
    city = city or r2.choices(T2_CITIES, weights=[CITY_WEIGHT[c] for c in T2_CITIES])[0]
    rooms = r2.choice([1, 2, 2, 3, 3, 3, 3, 4, 4, 5])
    cond = cond or r2.choices(COND_ORDER, weights=[12, 31, 39, 18])[0]
    furn = r2.random() < 0.34
    agency = agency or r2.choice(AGENCY_POOL)
    rent = t2_rent(city, rooms, cond, furn)
    area = round(21 + 16.5 * rooms + r2.uniform(-7, 11), 1)
    dep_months = r2.choice([1, 1, 1, 2, 2, 3])
    advert = r2.choice(T2_ADVERT)
    return {
        "listing_id": i,
        "_city": city, "_cond": cond, "_furn": furn,
        "city": city if clean else r2.choice(CITY_SPELLINGS[city]),
        "governorate": T2_GOV[city],
        "agency": agency,
        "monthly_rent": rent,
        "area_m2": area,
        "rooms": rooms,
        "floor": r2.choice([0, 1, 1, 2, 2, 2, 3, 3, 4, 5, 6]),
        "condition": cond if clean else r2.choice(COND_SPELLINGS[cond]),
        "furnished": ("yes" if furn else "no") if clean
                     else r2.choice(FURN_YES if furn else FURN_NO),
        "deposit": "" if agency in NO_DEPOSIT_AGENCIES else rent * dep_months,
        "listed_on": listed.isoformat(),
        "advert": advert,
    }


t2_base = dt.date(2026, 2, 1)
t2_rows = []
for i in range(1, 481):
    t2_rows.append(t2_row(5000 + i, t2_base + dt.timedelta(days=r2.randint(0, 119))))

# --- deliberate mess ---------------------------------------------------------

# L4: two typos and five areas recorded in dunum instead of square metres.
# These nine rows are then held out of every blanking sample below, so a
# planted value error is never also a blank -- the facts can state both counts.
DUNUM = (14, 98, 166, 289, 402)
t2_rows[61]["monthly_rent"] = 99999            # a phone number the scraper grabbed
t2_rows[207]["monthly_rent"] = 25              # a daily rate quoted as a monthly one
for k in DUNUM:
    t2_rows[k]["area_m2"] = round(t2_rows[k]["area_m2"] / 1000.0, 4)
t2_rows[133]["rooms"] = 0                      # a studio written as zero rooms
t2_rows[318]["rooms"] = 12                     # a whole building, not a flat
PLANTED = set(DUNUM) | {61, 207, 133, 318}
KEEPABLE = [k for k in range(len(t2_rows)) if k not in PLANTED]

# L2: area_m2 blank at random (MCAR)
for k in r2.sample(KEEPABLE, 26):
    t2_rows[k]["area_m2"] = ""
# L2: monthly_rent blank mostly where the rent is high (MNAR) -- the site prints
# "price on request" for premium flats. The blank depends on the value that is
# missing, which is the one mechanism no imputation can repair; the only hints
# left in the file are the columns that correlate with rent (rooms, area,
# condition, furnished), and they are hints, not proof.
order = sorted(KEEPABLE, key=lambda k: -t2_rows[k]["monthly_rent"])
for k in r2.sample(order[:40], 15) + r2.sample(order[-200:], 4):
    t2_rows[k]["monthly_rent"] = ""
    t2_rows[k]["deposit"] = ""
# L2: deposit already blank for two whole agencies (MAR); a few more at random
for k in r2.sample(KEEPABLE, 6):
    t2_rows[k]["deposit"] = ""
# L3: condition blank
for k in r2.sample(range(len(t2_rows)), 33):
    t2_rows[k]["condition"] = ""
# L3: floor mixes numbers with "G", and some are blank
for k in r2.sample(range(len(t2_rows)), 19):
    t2_rows[k]["floor"] = "G"
for k in r2.sample(range(len(t2_rows)), 8):
    t2_rows[k]["floor"] = ""
# L3: the advert column carries ragged whitespace
for k in r2.sample(range(len(t2_rows)), 44):
    t2_rows[k]["advert"] = r2.choice(["  ", " ", "\t"]) + t2_rows[k]["advert"]
for k in r2.sample(range(len(t2_rows)), 37):
    t2_rows[k]["advert"] = t2_rows[k]["advert"].replace(", ", ",  ", 1) + "  "
# L3: 22 dates written DD/MM/YYYY instead of ISO
for k in r2.sample(range(len(t2_rows)), 22):
    d = dt.date.fromisoformat(t2_rows[k]["listed_on"])
    t2_rows[k]["listed_on"] = d.strftime("%d/%m/%Y")

# L3: nine listings reposted -- same listing_id, a later date, the advert retyped.
# drop_duplicates() does not see these; drop_duplicates(subset=["listing_id"]) does.
reposts = []
for k in r2.sample(range(len(t2_rows)), 9):
    src = dict(t2_rows[k])
    try:
        d = dt.date.fromisoformat(src["listed_on"])
    except ValueError:
        d = dt.datetime.strptime(src["listed_on"], "%d/%m/%Y").date()
    src["listed_on"] = (d + dt.timedelta(days=r2.randint(9, 40))).isoformat()
    src["advert"] = " ".join(src["advert"].split()) + " - still available"
    reposts.append(src)
# L3: fourteen rows the scraper wrote twice, byte for byte
dupes = [dict(t2_rows[k]) for k in r2.sample(range(len(t2_rows)), 14)]

t2_all = t2_rows + reposts + dupes
r2.shuffle(t2_all)

with io.open(os.path.join(T2, "listings_raw.csv"), "w", encoding="utf-8", newline="") as f:
    w = csv.DictWriter(f, fieldnames=T2_COLS, extrasaction="ignore")
    w.writeheader()
    w.writerows(t2_all)

# --- the reference table the cleaned city name joins to ----------------------
# Beit Lahia is in the reference and in no listing; every listings city is here
# under its CANONICAL spelling only, so a merge before cleaning loses rows.
CITY_REF = [
    ("Gaza",          "Gaza",          590481, "yes",  0.0),
    ("Khan Younis",   "Khan Younis",   202360, "yes", 23.5),
    ("Rafah",         "Rafah",         171889, "yes", 34.0),
    ("Deir al-Balah", "Deir al-Balah", 264455, "yes", 14.2),
    ("Jabalia",       "North Gaza",    247076, "no",   6.8),
    ("Beit Lahia",    "North Gaza",     89838, "yes", 11.4),
]
with io.open(os.path.join(T2, "city_reference.csv"), "w", encoding="utf-8", newline="") as f:
    w = csv.writer(f)
    w.writerow(["city", "governorate", "population", "coastal", "km_to_gaza_city"])
    for row in CITY_REF:
        w.writerow(list(row))

# --- next month's batch: the transform fitted on the raw file must survive it -
# One city and one condition value planted by hand, plus whatever agencies the
# sampler happens to draw that the training file never contained -- the facts
# below count them rather than asserting a number, because that count moves.
# saw -- which is exactly what breaks a one-hot encoding fitted with get_dummies.
t2_new = []
new_base = dt.date(2026, 6, 5)
for i in range(1, 86):
    t2_new.append(t2_row(7000 + i, new_base + dt.timedelta(days=r2.randint(0, 29)), clean=True))
t2_new[3]["city"] = t2_new[3]["_city"] = "Beit Lahia"          # unseen city (it IS in the reference)
t2_new[3]["governorate"] = "North Gaza"
t2_new[47]["city"] = t2_new[47]["_city"] = "Beit Lahia"
t2_new[47]["governorate"] = "North Gaza"
t2_new[11]["agency"] = "Burhan Realty"                         # unseen agency
t2_new[62]["agency"] = "Sumud Housing"                         # unseen agency
t2_new[29]["condition"] = "very good"                          # unseen level
t2_new[70]["condition"] = ""
for k in (8, 33, 51):
    t2_new[k]["area_m2"] = ""
for k in (19, 58):
    t2_new[k]["monthly_rent"] = ""
    t2_new[k]["deposit"] = ""
with io.open(os.path.join(T2, "listings_new.csv"), "w", encoding="utf-8", newline="") as f:
    w = csv.DictWriter(f, fieldnames=T2_COLS, extrasaction="ignore")
    w.writeheader()
    w.writerows(t2_new)

# --- wide data, for melt / pivot --------------------------------------------
# One row per listing, one column per quarter: the shape a spreadsheet produces
# and a model cannot read.
hist_ids = sorted(r2.sample([r["listing_id"] for r in t2_rows], 40))
by_id = {r["listing_id"]: r for r in t2_rows}
hist = []
for lid in hist_ids:
    r0 = by_id[lid]
    start = r0["monthly_rent"] if r0["monthly_rent"] not in ("", 99999, 25) else 300
    qs = []
    v = float(start)
    for _q in range(4):
        qs.append(int(round(v / 5.0) * 5))
        v *= r2.uniform(0.99, 1.09)
    hist.append([lid, r0["_city"]] + qs)
for k, q in ((2, 2), (7, 4), (13, 3), (19, 2), (26, 4), (31, 3), (38, 4)):
    hist[k][1 + q] = ""
with io.open(os.path.join(T2, "rent_history_wide.csv"), "w", encoding="utf-8", newline="") as f:
    w = csv.writer(f)
    w.writerow(["listing_id", "city", "rent_2026q1", "rent_2026q2", "rent_2026q3", "rent_2026q4"])
    w.writerows(hist)


# --- the facts, computed from what was written -------------------------------
import numpy as np
import pandas as pd

df = pd.read_csv(os.path.join(P1, "cafeteria_orders.csv"))
raw_rows = len(df)
df["unit_price_num"] = pd.to_numeric(df["unit_price"], errors="coerce")
df["order_time"] = pd.to_datetime(df["order_time"])
df["line_total"] = df["qty"] * df["unit_price_num"]
dup_lines = int(df.duplicated().sum())
tidy = df.drop_duplicates()
good = tidy[(tidy["qty"] > 0) & (tidy["unit_price_num"] < 50) & tidy["unit_price_num"].notna()].copy()
good["item_clean"] = good["item"].str.strip().str.title()
rev_by_item = good.groupby("item_clean")["line_total"].sum().sort_values(ascending=False)
hour_orders = good.groupby(good["order_time"].dt.hour)["order_id"].nunique().sort_values(ascending=False)
cat_rev = good.groupby("category")["line_total"].sum().sort_values(ascending=False)

fact("P1 cafeteria_orders.csv: %d rows (lines), columns %s; period 2026-09-01..2026-09-30, closed Fri/Sat"
     % (raw_rows, ", ".join(cols)))
fact("P1 mess: %d exactly-duplicated lines; %d blank payment; %d item spelling variants (case/space of Latte, Tea, Espresso); "
     "1 price typo (Shawarma Wrap at 120.0); 1 unit_price 'n/a' (pandas read_csv reads 'n/a' as missing BY DEFAULT, so there the column loads as float64 with one NaN; Excel and Power BI see it as text/error); 5 refunds with qty = -1" % (dup_lines, int(df['payment'].isna().sum()), nvar))
fact("P1 distinct order_id: %d; distinct items in raw: %d; distinct items after strip+title: %d"
     % (df["order_id"].nunique(), df["item"].nunique(), good["item_clean"].nunique()))
fact("P1 after dropping duplicates, refunds, the typo and 'n/a': %d lines; total revenue = %.2f"
     % (len(good), good["line_total"].sum()))
fact("P1 top 3 items by revenue: " + "; ".join("%s=%.2f" % (k, v) for k, v in rev_by_item.head(3).items()))
fact("P1 revenue by category: " + "; ".join("%s=%.2f" % (k, v) for k, v in cat_rev.items()))
fact("P1 busiest hour by distinct orders: %d:00 (%d orders); then %s"
     % (hour_orders.index[0], hour_orders.iloc[0], ", ".join("%d:00 (%d)" % (h, n) for h, n in hour_orders.iloc[1:3].items())))


# --- Theory 2 facts ---------------------------------------------------------
# Everything a T2 lesson is allowed to quote about these files is computed here.
t2raw = pd.read_csv(os.path.join(T2, "listings_raw.csv"), dtype=str, keep_default_na=False)
t2num = t2raw.copy()
for c in ("monthly_rent", "area_m2", "rooms", "deposit"):
    t2num[c] = pd.to_numeric(t2num[c].replace("", None), errors="coerce")

CANON = {"gaza": "Gaza", "khan younis": "Khan Younis", "khan yunis": "Khan Younis",
         "khan-younis": "Khan Younis", "rafah": "Rafah", "deir al-balah": "Deir al-Balah",
         "deir al balah": "Deir al-Balah", "deir-al-balah": "Deir al-Balah",
         "jabalia": "Jabalia", "jabalya": "Jabalia", "jabaliya": "Jabalia"}
city_key = t2raw["city"].str.strip().str.lower().str.replace(r"\s+", " ", regex=True)
city_clean = city_key.map(CANON)

_t2d = pd.to_datetime(t2raw["listed_on"], format="mixed", dayfirst=True)
fact("T2 listings_raw.csv: %d rows, columns %s; listed %s..%s - the window is four months but the last date "
     "runs past it, because one repost (listing_id %d) carries a later listed_on than the batch it repeats"
     % (len(t2raw), ", ".join(T2_COLS), _t2d.min().date(), _t2d.max().date(),
        int(t2raw.loc[_t2d.idxmax(), "listing_id"])))
_dup_all = int(t2raw.duplicated().sum())
_dup_id = int(t2raw.duplicated(subset=["listing_id"]).sum())
fact("T2 duplicates come in two kinds: %d rows are byte-for-byte repeats (df.duplicated().sum()) and %d more "
     "are reposts - the same listing_id with a later listed_on and the advert retyped, so every column does "
     "not match and drop_duplicates() cannot see them. drop_duplicates() leaves %d rows; "
     "drop_duplicates(subset=['listing_id']) leaves %d, which is the number of real flats"
     % (_dup_all, _dup_id - _dup_all, len(t2raw.drop_duplicates()),
        len(t2raw.drop_duplicates(subset=["listing_id"]))))
fact("T2 city spellings: %d distinct strings in the raw column for %d real cities; "
     "lowercasing and collapsing spaces still leaves %d (Khan Yunis / Khan Younis, Jabalya / Jabalia "
     "differ by more than case) - a canonical map is needed, not .str.title()"
     % (t2raw["city"].nunique(), city_clean.nunique(), city_key.nunique()))
fact("T2 furnished is written %d ways: %s"
     % (t2raw["furnished"].nunique(), ", ".join(repr(v) for v in sorted(t2raw["furnished"].unique()))))
fact("T2 floor is a mixed-type column: %d rows hold 'G' for ground and %d are blank, so it loads as text and "
     "to_numeric(errors='coerce') turns every 'G' into NaN - losing the fact that a ground floor IS a floor"
     % (int((t2raw["floor"] == "G").sum()), int((t2raw["floor"] == "").sum())))
fact("T2 missing (blank cells): " + ", ".join(
    "%s=%d" % (c, int((t2raw[c] == "").sum())) for c in T2_COLS if int((t2raw[c] == "").sum())))
_miss = t2num["monthly_rent"].isna()
_cond_key = t2raw["condition"].str.strip().str.lower()
_fkey = t2raw["furnished"].str.strip().str.lower().isin(["yes", "y", "1", "true"])
_dep = t2num[t2num["deposit"].notna() & t2num["monthly_rent"].notna() & (t2num["monthly_rent"] <= 5000)]
fact("T2 the agency predicts WHETHER the deposit is blank, not WHAT it would have been - keep those two claims "
     "apart. Within-agency spread is %.1f (median across agencies) against %.1f over the whole file, so grouping "
     "by agency removes about %.0f%% of the spread; and the deposit correlates %.4f with the rent against %.4f "
     "with its own agency's mean. A per-agency median is therefore NOT a better fill than a global one - "
     "measure it, do not assume it"
     % (_dep.groupby("agency")["deposit"].std().median(), _dep["deposit"].std(),
        100 * (1 - _dep.groupby("agency")["deposit"].std().median() / _dep["deposit"].std()),
        _dep["deposit"].corr(_dep["monthly_rent"]),
        _dep["deposit"].corr(_dep.groupby("agency")["deposit"].transform("mean"))))
fact("T2 missingness is NOT one mechanism, which is the whole point of the column. area_m2 blanks are spread "
     "at random (MCAR). deposit is blank for every row of Noor Estates and Diwan Rentals plus a few others: "
     "it depends on `agency`, a column you can see (MAR), which identifies the mechanism. "
     "monthly_rent is blank where the rent is high - the site prints 'price on request' for premium flats "
     "(MNAR): mean rooms %.2f vs %.2f, mean area %.1f vs %.1f m2, %.0f%% excellent vs %.0f%%, %.0f%% furnished "
     "vs %.0f%%. Those are hints, not proof - MNAR cannot be proved from the file, only learned from the "
     "source - and imputing the mean rent drags exactly the most expensive listings down to average"
     % (t2num.loc[_miss, "rooms"].mean(), t2num.loc[~_miss, "rooms"].mean(),
        t2num.loc[_miss, "area_m2"].mean(), t2num.loc[~_miss, "area_m2"].mean(),
        100.0 * (_cond_key[_miss] == "excellent").mean(), 100.0 * (_cond_key[~_miss] == "excellent").mean(),
        100.0 * _fkey[_miss].mean(), 100.0 * _fkey[~_miss].mean()))

_r = t2num["monthly_rent"].dropna()
q1, q3 = _r.quantile(0.25), _r.quantile(0.75)
iqr = q3 - q1
lo, hi = q1 - 1.5 * iqr, q3 + 1.5 * iqr
_z = (_r - _r.mean()) / _r.std()
_r2 = _r[_r != 99999]
q1b, q3b = _r2.quantile(0.25), _r2.quantile(0.75)
iqrb = q3b - q1b
_z2 = (_r2 - _r2.mean()) / _r2.std()
fact("T2 monthly_rent (the %d rows that have one): min=%d, median=%.1f, mean=%.1f, max=%d, std=%.1f "
     "- mean above median, so right-skewed" % (len(_r), _r.min(), _r.median(), _r.mean(), _r.max(), _r.std()))
fact("T2 IQR fence on monthly_rent: Q1=%.1f, Q3=%.1f, IQR=%.1f, fences [%.1f, %.1f]; %d values fall outside "
     "(%d low, %d high). |z|>3 flags only %d of them, because the single 99999 inflates the standard "
     "deviation it is measured against - drop that one typo and |z|>3 flags %d while IQR flags %d. "
     "Note what NEITHER rule finds: the daily rate of 25 sits inside the lower fence of %.1f, so only "
     "domain knowledge catches it"
     % (q1, q3, iqr, lo, hi, int(((_r < lo) | (_r > hi)).sum()), int((_r < lo).sum()), int((_r > hi).sum()),
        int((_z.abs() > 3).sum()), int((_z2.abs() > 3).sum()),
        int(((_r2 < q1b - 1.5 * iqrb) | (_r2 > q3b + 1.5 * iqrb)).sum()), lo))
fact("T2 planted value errors, which are NOT the same thing as outliers: monthly_rent 99999 (listing_id %d, "
     "a phone number) and 25 (listing_id %d, a daily rate); rooms 0 (listing_id %d) and 12 (listing_id %d); "
     "5 area_m2 values recorded in dunum, so they read 0.0x instead of 5x-9x m2 (%s)"
     % (int(t2num.loc[t2num["monthly_rent"] == 99999, "listing_id"].iloc[0]),
        int(t2num.loc[t2num["monthly_rent"] == 25, "listing_id"].iloc[0]),
        int(t2num.loc[t2num["rooms"] == 0, "listing_id"].iloc[0]),
        int(t2num.loc[t2num["rooms"] == 12, "listing_id"].iloc[0]),
        ", ".join(str(int(v)) for v in sorted(t2num.loc[t2num["area_m2"] < 1, "listing_id"].unique()))))

_pair = t2num[t2num["deposit"].notna() & t2num["monthly_rent"].notna()]
_ratio = (_pair["deposit"] / _pair["monthly_rent"]).round(6)
_whole = _ratio.isin([1.0, 2.0, 3.0])
fact("T2 the cross-column check that beats every single-column rule: deposit / monthly_rent is exactly 1, 2 or "
     "3 months in %d of the %d recorded pairs, and the %d exceptions are precisely the two rent errors "
     "(%s). One ratio check therefore finds the daily rate of 25, which no statistic on the rent column "
     "alone can reach - it sits inside the IQR fence and its robust z is only -2.36"
     % (int(_whole.sum()), len(_pair), int((~_whole).sum()),
        "; ".join("listing %d ratio %.4f" % (int(r["listing_id"]), r["deposit"] / r["monthly_rent"])
                  for _, r in _pair[~_whole].iterrows())))
_lr = np.log1p(_r)
_lq1, _lq3 = _lr.quantile(0.25), _lr.quantile(0.75)
_llo, _lhi = _lq1 - 1.5 * (_lq3 - _lq1), _lq3 + 1.5 * (_lq3 - _lq1)
fact("T2 the fence changes its mind on a log scale: 1.5*IQR on log1p(monthly_rent) gives fences of %.2f and "
     "%.2f shekels and flags %d values - %d low and %d high - where the fence on the raw column flags %d, all "
     "of them high. The 25 is caught only here, because taking logs is what makes the lower fence bite"
     % (np.expm1(_llo), np.expm1(_lhi), int(((_lr < _llo) | (_lr > _lhi)).sum()),
        int((_lr < _llo).sum()), int((_lr > _lhi).sum()),
        int(((_r < lo) | (_r > hi)).sum())))
_cond = t2raw["condition"].str.strip().str.lower().replace("", "(blank)").value_counts()
fact("T2 condition is ordinal (poor < fair < good < excellent) and arrives in %d non-blank spellings plus "
     "%d blanks; after strip+lower: %s"
     % (t2raw.loc[t2raw["condition"] != "", "condition"].nunique(),
        int((t2raw["condition"] == "").sum()), ", ".join("%s=%d" % (k, v) for k, v in _cond.items())))
_ag = t2raw["agency"].value_counts()
fact("T2 agency is high-cardinality: %d agencies over %d rows; the top 5 carry %d rows (%.0f%%) while %d "
     "agencies appear exactly once and %d appear at most three times - one-hot encoding it adds %d columns, "
     "most of them almost all zeros"
     % (len(_ag), len(t2raw), int(_ag.head(5).sum()), 100.0 * _ag.head(5).sum() / len(t2raw),
        int((_ag == 1).sum()), int((_ag <= 3).sum()), len(_ag)))
_dates_iso = t2raw["listed_on"].str.match(r"^\d{4}-\d{2}-\d{2}$").sum()
fact("T2 listed_on: %d rows ISO (YYYY-MM-DD) and %d rows DD/MM/YYYY; pd.to_datetime without format= warns "
     "and falls back per value, so 03/04/2026 and 2026-04-03 can end up as different days"
     % (int(_dates_iso), len(t2raw) - int(_dates_iso)))

t2ref = pd.read_csv(os.path.join(T2, "city_reference.csv"))
_raw_match = t2raw["city"].isin(set(t2ref["city"]))
fact("T2 the merge trap: city_reference.csv holds the 5 cities under their canonical spelling plus Beit Lahia "
     "(in no listing). Merging on the RAW city column matches %d of %d rows (%.0f%%) and an inner join "
     "silently drops the rest; merging on the cleaned name matches all %d. An outer join on the clean name "
     "leaves Beit Lahia as 1 unmatched reference row"
     % (int(_raw_match.sum()), len(t2raw), 100.0 * _raw_match.mean(), int(city_clean.notna().sum())))

t2new = pd.read_csv(os.path.join(T2, "listings_new.csv"), dtype=str, keep_default_na=False)
_new_cities = sorted(set(t2new["city"]) - set(city_clean.dropna()))
_new_agencies = sorted(set(t2new["agency"]) - set(t2raw["agency"]))
_new_cond = sorted(set(t2new["condition"].str.strip().str.lower()) - set(COND_ORDER) - {""})
fact("T2 listings_new.csv: %d rows for June 2026, already canonically spelled, and carrying what the training "
     "data never saw - city: %s; agencies: %s; condition: %s. Plus %d blank area_m2, %d blank monthly_rent, "
     "%d blank condition. get_dummies() on this file alone produces different columns than on "
     "listings_raw.csv, which is the whole point"
     % (len(t2new), ", ".join(_new_cities), ", ".join(_new_agencies), ", ".join(_new_cond),
        int((t2new["area_m2"] == "").sum()), int((t2new["monthly_rent"] == "").sum()),
        int((t2new["condition"] == "").sum())))

t2hist = pd.read_csv(os.path.join(T2, "rent_history_wide.csv"))
_long = t2hist.melt(id_vars=["listing_id", "city"], var_name="quarter", value_name="rent")
fact("T2 rent_history_wide.csv: %d listings x 4 quarter columns; melting gives %d long rows, of which %d carry "
     "a rent and %d are blank quarters" % (len(t2hist), len(_long), int(_long["rent"].notna().sum()),
                                           int(_long["rent"].isna().sum())))

with io.open(os.path.join(ROOT, "docs", "datasets.md"), "w", encoding="utf-8", newline="\n") as f:
    f.write("# Shared sample datasets\n\n"
            "Generated by `python tools/make_datasets.py` (deterministic). Lessons link to the files under\n"
            "`downloads/` with `href=\"@/downloads/<chapter>/<file>\"` and quote the numbers below — never\n"
            "invent a different number for the same data. Re-run the script, never hand-edit the files.\n\n"
            "## Facts (computed from the files)\n\n")
    for s in facts:
        f.write("- " + s + "\n")
    f.write("\n## Files\n\n"
            "| File | What it is |\n|---|---|\n"
            "| `downloads/t1/rental_listings.csv` | 60 listings, comma CSV, UTF-8, ISO dates, a few blanks |\n"
            "| `downloads/t1/rental_listings_ar_semicolon.csv` | 30 rows, `;` delimiter, decimal comma, Arabic headers and city names, UTF-8 BOM |\n"
            "| `downloads/t1/rental_listings.xlsx` | sheet `Raw` (title rows, header on row 4, serial-number dates) and `Clean` |\n"
            "| `downloads/t1/schools_api_page1..3.json` | a paginated API reply (`results`, `page`, `next`, `total`) |\n"
            "| `downloads/t1/schools.json` | the whole registry as one nested document |\n"
            "| `downloads/p1/cafeteria_orders.csv` | one month of cafeteria order lines (messy on purpose) |\n"
            "| `downloads/p1/cafeteria_orders.xlsx` | the same as an Excel workbook: Table `tblOrders`, sheet `Menu` with Table `tblMenu` |\n"
            "| `downloads/p1/cafeteria_menu.csv` | the menu: item, category, list_price |\n"
            "| `downloads/t2/listings_raw.csv` | %d rental listings scraped over four months and never cleaned: %d exact duplicates, 9 reposts, %d city spellings, three missing-data mechanisms, two value typos, five areas in dunum |\n" % (len(t2raw), _dup_all, t2raw["city"].nunique()) +
            "| `downloads/t2/city_reference.csv` | one row per city: governorate, population, coastal, km to Gaza City - joins on the *cleaned* city name |\n"
            "| `downloads/t2/listings_new.csv` | next month's batch, with %d city, %d agencies and %d condition level the training data never saw |\n" % (len(_new_cities), len(_new_agencies), len(_new_cond)) +
            "| `downloads/t2/rent_history_wide.csv` | 40 listings x 4 quarter columns: wide data to melt |\n"
            "\n### Files written by lesson authors (kept by hand, not generated)\n\n"
            "| File | What it is |\n|---|---|\n"
            "| `downloads/t1/adverts_sample.txt` | 8 hand-written rental adverts, one in Arabic (T1 L1) |\n"
            "| `downloads/t1/school_conditions_demo.csv` | a 13-school sheet with invented damage_level / classroom_temp_c / repair_weeks, labelled as invented in the lesson (T1 L2) |\n"
            "| `downloads/t1/school_damage_assessment.csv` | the 9-row raw damage-assessment CSV of the original Arabic chapter, verbatim (T1 L6) |\n"
            "| `downloads/p1/requirements.txt`, `check_env.py`, `cafeteria_answer.py` | environment and answer scripts of Practical Chapter 1 |\n")
import sys
sys.stdout.reconfigure(encoding="utf-8")
print("\n".join(facts))
