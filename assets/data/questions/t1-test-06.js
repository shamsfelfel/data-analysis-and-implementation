window.DABanks = window.DABanks || {};
window.DABanks["t1-test-06"] = {
  title: {
    "en": "Test 6 — Did It Really Load? Validation & Capstone",
    "ar": "اختبار 6 — هل تحمّلت فعلًا؟ التحقّق والمشروع الختامي"
  },
  intro: {
    "en": "24 questions on Lesson 6: the ten-line validation ritual, assertions, a schema and validate(), the five dimensions of data quality, choosing a format, the school-damage capstone and the load_listings() loader. All outputs are from pandas 2.2 and Python 3.13. Plan for about 45 minutes. Every question has a hint, an answer and an explanation, hidden until you ask for them: try first, then open them. A revealed answer is not counted.",
    "ar": "24 سؤالًا عن الدرس 6: طقس التحقّق ذو الأسطر العشرة، والتأكيدات، والمخطط ودالة validate()، وأبعاد جودة البيانات الخمسة، واختيار الصيغة، والمشروع الختامي لتقييم أضرار المدارس، والمحمِّل load_listings(). كل المخرجات من pandas 2.2 وبايثون 3.13. خصّص نحو 45 دقيقة. لكل سؤال تلميح وجواب وشرح، وكلها مخفية حتى تطلبها: جرّب أولًا ثم افتحها. والجواب الذي يُظهَر لا يُحتسب."
  },
  questions: [
      /* ---------------------------------------------------------- 01 */
      {
        "id": "t1l6q01",
        "type": "match",
        "level": "easy",
        "topics": [
          "t1-silent-load",
          "t1-validation-ritual"
        ],
        "q": {
          "en": "The update file (61 rows) loaded without a single error. Match each ritual line to what it shows about this file.",
          "ar": "تحمّل ملف التحديث (61 صفًّا) دون أي خطأ. وصّل كل سطر من الطقس بما يُظهره عن هذا الملف."
        },
        "leftHead": {
          "en": "Ritual line",
          "ar": "سطر الطقس"
        },
        "rightHead": {
          "en": "What it shows in the update file",
          "ar": "ما يُظهره في ملف التحديث"
        },
        "pairs": [
          {
            "l": {
              "code": "df.shape"
            },
            "r": {
              "en": "61 rows where last month had 60",
              "ar": "61 صفًّا بينما كان الشهر الماضي 60"
            }
          },
          {
            "l": {
              "code": "df.dtypes"
            },
            "r": {
              "en": "<code>monthly_rent</code> is <code>object</code>: a column of numbers has become text",
              "ar": "العمود <code>monthly_rent</code> من النوع <code>object</code>: عمود أرقام صار نصًّا"
            }
          },
          {
            "l": {
              "code": "df.isna().sum()"
            },
            "r": {
              "en": "the same 2 blank rents as last month, and no sign of the text “1,150”",
              "ar": "الفراغان نفسهما في الإيجار كالشهر الماضي، ولا أثر للنص «1,150»"
            }
          },
          {
            "l": {
              "code": "df.describe()"
            },
            "r": {
              "en": "a minimum area of 0.0, and no <code>monthly_rent</code> column at all",
              "ar": "حدّ أدنى للمساحة 0.0، ولا عمود <code>monthly_rent</code> إطلاقًا"
            }
          },
          {
            "l": {
              "code": "df[\"city\"].value_counts(dropna=False)"
            },
            "r": {
              "en": "six city labels for five cities",
              "ar": "ست تسميات للمدن لخمس مدن"
            }
          },
          {
            "l": {
              "code": "df[\"listing_id\"].nunique()"
            },
            "r": {
              "en": "60 distinct ids on 61 rows",
              "ar": "60 معرّفًا مختلفًا على 61 صفًّا"
            }
          }
        ],
        "hint": {
          "en": "Ask what each call looks at: the size of the table, the type of each column, the holes, the numeric summary, the labels, the identifiers.",
          "ar": "اسأل عمّا ينظر إليه كل استدعاء: حجم الجدول، ونوع كل عمود، والثقوب، والملخّص الرقمي، والتسميات، والمعرّفات."
        },
        "explain": {
          "en": "Each ritual line is a question with its own typical catch. <code>shape</code> sees the 61st row, <code>dtypes</code> sees that <code>monthly_rent</code> is text, and <code>describe()</code> leaves that column out altogether and shows an area of 0.0. The instructive pair is <code>isna().sum()</code>: it reports the same two blanks as last month, because the cell “1,150” is present, only unusable, so a count of missing values can never certify a column. <code>value_counts</code> exposes “jabalia ” as a sixth city and <code>nunique()</code> against <code>len()</code> exposes the repeated id. Several defects, found by different lines, and not one exception: “it loaded” only means that no error was raised.",
          "ar": "كل سطر من الطقس سؤال له صيده المعتاد. فـ<code>shape</code> يرى الصف الحادي والستين، و<code>dtypes</code> يرى أن <code>monthly_rent</code> نص، و<code>describe()</code> يُسقط ذلك العمود كليًّا ويُظهر مساحة 0.0. والزوج الأكثر إفادة هو <code>isna().sum()</code>: يقول الفراغين نفسيهما كالشهر الماضي، لأن الخلية «1,150» موجودة لكنها غير صالحة، فلا يستطيع عدّ المفقود وحده أن يزكّي عمودًا. ويكشف <code>value_counts</code> أن «jabalia » مدينة سادسة، ويكشف <code>nunique()</code> مقابل <code>len()</code> المعرّف المكرّر. عيوب عدة وجدتها أسطر مختلفة، ولم يقع استثناء واحد: «تحمّل» تعني فقط أنه لم يُرفع خطأ."
        }
      },

      /* ---------------------------------------------------------- 02 */
      {
        "id": "t1l6q02",
        "type": "mcq",
        "level": "easy",
        "topics": [
          "t1-validate-function",
          "t1-validation-ritual"
        ],
        "q": {
          "en": "The lesson improves its validator in four versions. Version 1 is a glance at <code>df.head(3)</code>. Version 2 wraps the ritual in one function, <code>ritual(df)</code>, that prints the shape, the number of duplicated rows, an audit table (dtype, missing, unique), <code>describe()</code> and the value counts of every category column. What does Version 2 fix, and what does it still leave open?",
          "ar": "يحسّن الدرس أداة التحقّق في أربع نسخ. النسخة 1 نظرة إلى <code>df.head(3)</code>. والنسخة 2 تضع الطقس في دالة واحدة <code>ritual(df)</code> تطبع الشكل وعدد الصفوف المكرّرة وجدول تدقيق (النوع والمفقود والقيم المميزة) و<code>describe()</code> وتكرار القيم لكل عمود فئوي. ماذا تصلح النسخة 2، وماذا تترك مفتوحًا؟"
        },
        "options": [
          {
            "en": "It fixes nothing new: <code>head(3)</code> already shows the defects of the file, and the function only saves some typing each time you load a table.",
            "ar": "لا تصلح شيئًا جديدًا: فـ<code>head(3)</code> يُظهر عيوب الملف أصلًا، والدالة توفّر بعض الكتابة في كل مرة تحمّل فيها جدولًا."
          },
          {
            "en": "It fixes the missing decision: <code>ritual(df)</code> returns a list of problems, so code can test whether that list is empty before the analysis starts.",
            "ar": "تصلح غياب القرار: فـ<code>ritual(df)</code> تعيد قائمة بالمشكلات، فيستطيع الكود اختبار هل هذه القائمة فارغة قبل أن يبدأ التحليل."
          },
          {
            "en": "It fixes coverage (every column and row, in a fixed order) but only prints: a person must read two dozen lines, nothing stops a bad file, nothing is recorded.",
            "ar": "تصلح التغطية (كل عمود وكل صف وبترتيب ثابت) لكنها تطبع فقط: على إنسان أن يقرأ أربعة وعشرين سطرًا، ولا شيء يمنع ملفًّا سيئًا، ولا شيء يُسجَّل."
          },
          {
            "en": "It fixes everything: because the audit table shows each column's dtype, a wrong dtype now stops the pipeline by itself, so nobody has to read the printout.",
            "ar": "تصلح كل شيء: فبما أن جدول التدقيق يعرض نوع كل عمود فإن النوع الخاطئ يوقف خط المعالجة من تلقاء نفسه، فلا يحتاج أحد إلى قراءة المطبوع."
          }
        ],
        "answer": 2,
        "hint": {
          "en": "Think about what a function that only <em>prints</em> can and cannot do for the next person who runs the notebook.",
          "ar": "فكّر فيما تستطيع دالة <em>تطبع</em> فقط أن تفعله وما لا تستطيعه لمن يشغّل الدفتر بعدك."
        },
        "explain": {
          "en": "Version 1 shows five of 61 rows and leaves no trace: the rent 1,150 sits in the fourth row, and the duplicate and the zero area are out of sight. Version 2 fixes coverage: one call, every column and row, in a fixed order. What it lacks is a result that code can use. It prints, so a human must read about two dozen lines and remember what is normal (“was it 60 rows last time?”); nothing stops a bad file from flowing into the analysis; nothing is recorded. A returned list of problems is Version 3, and only Version 4 adds a severity and a decision. The tempting “it fixes everything” confuses showing a dtype with acting on it.",
          "ar": "تعرض النسخة 1 خمسة صفوف من 61 ولا تترك أثرًا: الإيجار 1,150 في الصف الرابع، والتكرار والمساحة الصفرية خارج النظر. وتصلح النسخة 2 التغطية: استدعاء واحد، كل عمود وكل صف، بترتيب ثابت. وما ينقصها نتيجة يستطيع الكود استعمالها. فهي تطبع، فعلى إنسان أن يقرأ نحو أربعة وعشرين سطرًا وأن يتذكر ما هو الطبيعي («هل كانت 60 صفًّا في المرة السابقة؟»)؛ ولا شيء يمنع ملفًّا سيئًا من التدفق إلى التحليل؛ ولا شيء يُسجَّل. أما قائمة المشكلات المُعادة فهي النسخة 3، ولا تضيف درجة الخطورة والقرار إلا النسخة 4. والإجابة المغرية «تصلح كل شيء» تخلط بين عرض النوع والتصرف بناءً عليه."
        }
      },

      /* ---------------------------------------------------------- 03 */
      {
        "id": "t1l6q03",
        "type": "output",
        "level": "medium",
        "topics": [
          "t1-ritual-limits"
        ],
        "q": {
          "en": "Write exactly what the program prints (three lines). Listings 1008 and 1061 describe the same flat in Rafah under two ids; the last two rows are an exact repeat.",
          "ar": "اكتب بالضبط ما يطبعه البرنامج (ثلاثة أسطر). الإعلانان 1008 و1061 يصفان الشقة نفسها في رفح بمعرّفين مختلفين، والصفان الأخيران تكرار حرفي."
        },
        "code": "import pandas as pd\n\ndf = pd.DataFrame({\n    \"listing_id\":   [1008, 1061, 1009, 1009],\n    \"city\":         [\"Rafah\", \"Rafah\", \"Jabalia\", \"Jabalia\"],\n    \"monthly_rent\": [285, 285, 320, 320],\n})\nprint(df.duplicated().sum())\nprint(df.duplicated(subset=[\"city\", \"monthly_rent\"]).sum())\nprint(df[\"listing_id\"].nunique(), len(df))",
        "blanks": [
          {
            "accept": [
              "1\n2\n3 4",
              "1\n2\n3  4"
            ],
            "lines": 3
          }
        ],
        "hint": {
          "en": "<code>duplicated()</code> compares whole rows unless you tell it which columns to compare. What does it make of two rows that differ only in the id?",
          "ar": "تقارن <code>duplicated()</code> الصفوف كاملة ما لم تقل لها أي الأعمدة تقارن. فماذا تفعل بصفين يختلفان في المعرّف وحده؟"
        },
        "explain": {
          "en": "Whole-row <code>duplicated()</code> sees only the exact repeat of 1009 (the second copy is marked), so it prints 1; the Rafah pair differs in <code>listing_id</code> and is invisible to it. With <code>subset=[\"city\", \"monthly_rent\"]</code> the id is left out of the comparison and both pairs count: 2. The ids give 3 distinct values on 4 rows, which says that something repeats but not what. This is the ritual's third limit: it trusts the identifier. A flat entered twice under two ids needs a comparison that ignores the id, and a person who judges that those columns really identify a flat (two different flats can share a city and a rent).",
          "ar": "ترى <code>duplicated()</code> على الصفوف كاملة التكرار الحرفي للإعلان 1009 فقط (النسخة الثانية تُعلَّم)، فتطبع 1؛ أما زوج رفح فيختلف في <code>listing_id</code> فلا تراه. ومع <code>subset=[\"city\", \"monthly_rent\"]</code> يُسقط المعرّف من المقارنة ويُحسب الزوجان: 2. وتعطي المعرّفات 3 قيم مختلفة على 4 صفوف، وهذا يقول إن شيئًا يتكرر لا ما هو. هذا هو الحدّ الثالث للطقس: يثق بالمعرّف. فالشقة المُدخلة مرتين بمعرّفين تحتاج مقارنة تتجاهل المعرّف، وشخصًا يحكم أن هذه الأعمدة تحدد الشقة فعلًا (فقد تتشارك شقتان مختلفتان المدينة والإيجار)."
        }
      },

      /* ---------------------------------------------------------- 04 */
      {
        "id": "t1l6q04",
        "type": "error",
        "level": "medium",
        "topics": [
          "t1-assert-first-failure",
          "t1-validate-function"
        ],
        "q": {
          "en": "<code>validate</code> should return <em>every</em> problem it finds. On a file that contains a monthly rent of 3,780 it stops with an error instead, and the problems found before that point are lost. Click the responsible line.",
          "ar": "يُفترض أن تعيد <code>validate</code> <em>كل</em> مشكلة تجدها. لكنها على ملف فيه إيجار شهري 3,780 تتوقف بخطأ بدل ذلك، وتضيع المشكلات التي وجدتها قبل تلك النقطة. انقر السطر المسؤول."
        },
        "code": "def validate(df, schema):\n    problems = []\n    for col, rule in schema.items():\n        if col not in df.columns:\n            problems.append(f\"{col}: column is missing\")\n            continue\n        s = df[col]\n        if str(s.dtype) != str(rule[\"dtype\"]):\n            problems.append(f\"{col}: dtype is {s.dtype}, expected {rule['dtype']}\")\n        if \"max\" in rule:\n            assert not (s > rule[\"max\"]).any(), f\"{col}: value(s) above {rule['max']}\"\n        if \"allowed\" in rule and not s.dropna().isin(rule[\"allowed\"]).all():\n            problems.append(f\"{col}: value outside the allowed set\")\n    return problems",
        "answer": 11,
        "solution": {
          "code": "        if \"max\" in rule and (s > rule[\"max\"]).any():\n            problems.append(f\"{col}: value(s) above {rule['max']}\")",
          "en": "Replace the assertion (and the <code>if</code> above it) with a check that <em>appends</em> a sentence and lets the loop go on.",
          "ar": "استبدل التأكيد (والشرط <code>if</code> فوقه) بفحص <em>يضيف</em> جملة إلى القائمة ويدع الحلقة تكمل."
        },
        "hint": {
          "en": "Look for the line that ends the whole function the moment one rule fails, instead of adding a sentence to the list.",
          "ar": "ابحث عن السطر الذي يُنهي الدالة كلها لحظة تفشل قاعدة واحدة، بدل أن يضيف جملة إلى القائمة."
        },
        "explain": {
          "en": "Line 11 is an assertion. When one rent exceeds the limit it raises <code>AssertionError</code>: the function ends, the problems already appended (a wrong dtype, a spelling outside the allowed set) are thrown away with it, and the columns after <code>monthly_rent</code> are never checked. That is the first weakness of assertions: they stop at the first failure and say one thing per run, so four defects cost four runs. (Two more: Python removes them entirely under <code>python -O</code>, and a chain of them is a script nobody can reuse.) The other lines are sound: the guard on lines 4–6 reports a vanished column instead of crashing on <code>df[col]</code>, and lines 8–9 and 12–13 append and continue. The fix keeps the check and changes what a failure does.",
          "ar": "السطر 11 تأكيد. فحين يتجاوز إيجار واحد الحدّ يرفع <code>AssertionError</code>: تنتهي الدالة، وتضيع معها المشكلات التي أُضيفت قبله (نوع خاطئ، وإملاء خارج المجموعة المسموحة)، ولا تُفحص الأعمدة التي بعد <code>monthly_rent</code> أبدًا. وهذا أول ضعف في التأكيدات: تتوقف عند أول إخفاق وتقول شيئًا واحدًا في كل تشغيل، فأربعة عيوب تكلّف أربع تجارب. (وضعفان آخران: يحذفها بايثون كليًّا مع <code>python -O</code>، وسلسلة منها سكربت لا يعيد أحد استعماله.) أما بقية الأسطر فسليمة: الحارس في الأسطر 4–6 يبلّغ عن عمود اختفى بدل أن ينهار عند <code>df[col]</code>، والأسطر 8–9 و12–13 تضيف وتكمل. والإصلاح يُبقي الفحص ويغيّر ما يفعله الإخفاق."
        }
      },

      /* ---------------------------------------------------------- 05 */
      {
        "id": "t1l6q05",
        "type": "complete",
        "level": "easy",
        "topics": [
          "t1-expected-schema"
        ],
        "q": {
          "en": "In the library survey, <code>books_count</code> uses -1 for “not counted”. Complete the rule so that <code>validate()</code> reports the -1 values as errors, while a library with 0 books is accepted and two libraries may hold the same number of books.",
          "ar": "في مسح المكتبات يستعمل العمود <code>books_count</code> القيمة -1 بمعنى «لم يُعدّ». أكمل القاعدة بحيث تُبلغ <code>validate()</code> عن القيم -1 خطأً، وتقبل مكتبة فيها 0 كتاب، وتسمح بأن تحوي مكتبتان العدد نفسه من الكتب."
        },
        "code": "SCHEMA = {\n    \"school_id\":   {\"dtype\": \"string\", \"unique\": True},\n    \"books_count\": {\"dtype\": \"Int64\", ____, \"max_missing\": 0.10},\n}",
        "options": [
          {
            "code": "\"unique\": True"
          },
          {
            "code": "\"allowed\": [-1, 0]"
          },
          {
            "code": "\"min\": 0"
          },
          {
            "code": "\"max\": 0"
          }
        ],
        "answer": 2,
        "solution": {
          "code": "\"books_count\": {\"dtype\": \"Int64\", \"min\": 0, \"max_missing\": 0.10},",
          "en": "A lower bound of 0: every negative count is reported, a count of 0 is fine.",
          "ar": "حدّ أدنى 0: يُبلَّغ عن كل عدد سالب، ويُقبل العدد 0."
        },
        "hint": {
          "en": "Which rule key states a plausible range, and on which side of the range does the sentinel -1 fall?",
          "ar": "أي مفتاح من مفاتيح القواعد يصف مدى معقولًا؟ وفي أي جهة من المدى تقع القيمة الرمزية -1؟"
        },
        "explain": {
          "en": "<code>min</code> is the lower end of a plausible range, so <code>\"min\": 0</code> reports every negative value (validate prints “2 value(s) below 0”) and accepts 0. <code>\"max\": 0</code> has the bound on the wrong side: it would flag every real count above 0. <code>\"unique\": True</code> reports repeated counts, but two libraries can legitimately hold 210 books, and a single -1 would pass. <code>\"allowed\": [-1, 0]</code> does the opposite of the intent: it permits the sentinel and rejects real counts. The thresholds are your judgement about the data, and a sentinel is exactly what a range rule exists to catch before it drags a mean down.",
          "ar": "<code>min</code> هو الطرف الأدنى لمدى معقول، فـ<code>\"min\": 0</code> يُبلغ عن كل قيمة سالبة (تطبع validate «2 value(s) below 0») ويقبل 0. أما <code>\"max\": 0</code> فالحدّ فيه في الجهة الخطأ: سيعلّم كل عدد حقيقي فوق 0. و<code>\"unique\": True</code> يبلّغ عن الأعداد المكرّرة، لكن مكتبتين قد تحويان 210 كتابًا بحق، وقد تمرّ -1 واحدة. و<code>\"allowed\": [-1, 0]</code> يفعل عكس المقصود: يسمح بالقيمة الرمزية ويرفض الأعداد الحقيقية. والحدود حكمك أنت على البيانات، والقيمة الرمزية هي بالضبط ما وُجدت قاعدة المدى لتلتقطه قبل أن يسحب وسطًا إلى أسفل."
        }
      },

      /* ---------------------------------------------------------- 06 */
      {
        "id": "t1l6q06",
        "type": "compare",
        "level": "medium",
        "topics": [
          "t1-validate-function"
        ],
        "q": {
          "en": "Both functions check the same two things about <code>area_m2</code> (a missing share over 5%, an area below 20); each is followed by the caller's rule for stopping the job (B stores each problem as a (level, text) pair). Next month's file has no impossible area, only the same four blank areas (6.6%). Which statement is correct?",
          "ar": "تفحص الدالتان الأمرين نفسيهما في <code>area_m2</code> (نسبة مفقود فوق 5%، ومساحة أقل من 20)، وتتبع كلًّا منهما قاعدة المستدعي لإيقاف المهمة (وتخزّن ب كل مشكلة زوجًا من (الدرجة، النص)). وفي ملف الشهر القادم لا مساحة مستحيلة، بل المساحات الأربع الفارغة نفسها (6.6%). أي العبارات صحيحة؟"
        },
        "codeA": "def check_area(df):\n    out = []\n    if df[\"area_m2\"].isna().mean() > 0.05:\n        out.append(\"many blanks\")\n    if (df[\"area_m2\"] < 20).any():\n        out.append(\"area below 20\")\n    return out\n\nout = check_area(df)\nif out:\n    raise SystemExit(\"; \".join(out))",
        "codeB": "def check_area(df):\n    out = []\n    if df[\"area_m2\"].isna().mean() > 0.05:\n        out.append((\"warning\", \"many blanks\"))\n    if (df[\"area_m2\"] < 20).any():\n        out.append((\"error\", \"area below 20\"))\n    return out\n\nout = check_area(df)\nif any(lv == \"error\" for lv, _ in out):\n    raise SystemExit(\"stop\")",
        "options": [
          {
            "en": "A is better: a list of plain sentences is simpler than a list of dictionaries, and any problem at all, however small, should stop a job.",
            "ar": "أ أفضل: قائمة جمل عادية أبسط من قائمة قواميس، وأي مشكلة مهما كانت صغيرة يجب أن توقف المهمة."
          },
          {
            "en": "B is better: the caller tells a warning from an error without reading, so the four blanks no longer stop the job; the levels stay fixed in the function.",
            "ar": "ب أفضل: يستطيع المستدعي التمييز بين تحذير وخطأ دون قراءة، فلا توقف الفراغات الأربعة المهمة؛ لكن الدرجات ما زالت مثبّتة في الدالة."
          },
          {
            "en": "They are equivalent: both return a list, and the caller of A can read the severity out of each sentence whenever it needs it.",
            "ar": "هما متكافئتان: كلتاهما تعيد قائمة، ويستطيع مستدعي أ أن يقرأ الخطورة من كل جملة كلما احتاج إليها."
          },
          {
            "en": "B is better because it raises as soon as it meets an error, so the job stops sooner, wastes less time and never lists a second problem.",
            "ar": "ب أفضل لأنها ترفع استثناءً فور مقابلة خطأ، فتتوقف المهمة أبكر وتضيع وقتًا أقل ولا تسرد مشكلة ثانية أبدًا."
          }
        ],
        "answer": 1,
        "hint": {
          "en": "What can the caller of each version do with a problem that is only over a tolerance, and can it tell that kind from an impossible value?",
          "ar": "ماذا يستطيع مستدعي كل نسخة أن يفعل بمشكلة تجاوزت التسامح فقط؟ وهل يميّزها من قيمة مستحيلة؟"
        },
        "explain": {
          "en": "In A every problem is a sentence of equal weight, so the simplest policy (“stop if the list is not empty”) halts the job on four blank areas, a hole known since Lesson 3, and a team that is stopped by every warning learns to ignore stops. In B each problem carries a level, so the caller acts without reading: only errors stop the job, and the warning stays in the report (the decision becomes GO WITH CARE). What B still leaves open: the levels are the author's policy, hard-coded in the function; a different analysis might tolerate a repeated row but not a missing rent, so the next step is to put the level in the schema rule. The “equivalent” option rebuilds by hand, with string matching, what <code>level</code> gives for free; and B does not raise at the first error, it collects first and decides afterwards.",
          "ar": "في أ كل مشكلة جملة بوزن واحد، فتوقف أبسط سياسة («توقف إن لم تكن القائمة فارغة») المهمة بسبب أربع مساحات فارغة، وهو ثقب معروف منذ الدرس 3؛ وفريق يوقفه كل تحذير يتعلّم أن يتجاهل التوقف. وفي ب تحمل كل مشكلة درجة، فيتصرف المستدعي دون قراءة: الأخطاء وحدها توقف المهمة، ويبقى التحذير في التقرير (فيصير القرار GO WITH CARE). وما تتركه ب مفتوحًا: الدرجات سياسة المؤلف مثبّتة في الدالة؛ وقد يتسامح تحليل آخر مع صف مكرّر لكن لا مع إيجار مفقود، فالخطوة التالية أن توضع الدرجة في قاعدة المخطط. وخيار «متكافئتان» يعيد بناء ما تعطيه <code>level</code> مجانًا بمطابقة النصوص يدويًّا؛ وب لا ترفع عند أول خطأ، بل تجمع أولًا ثم تقرر."
        }
      },

      /* ---------------------------------------------------------- 07 */
      {
        "id": "t1l6q07",
        "type": "mcq",
        "level": "easy",
        "topics": [
          "t1-schema-drift"
        ],
        "q": {
          "en": "Next month's export silently renames <code>monthly_rent</code> to <code>rent_nis</code>; the numbers in the column are unchanged. What do these two columns contribute to the output of Version 4's <code>validate(df, SCHEMA)</code>, and what does the rename alone make <code>decide()</code> return?",
          "ar": "يعيد تصدير الشهر القادم تسمية <code>monthly_rent</code> إلى <code>rent_nis</code> بصمت؛ والأرقام في العمود لم تتغير. ماذا يضيف هذان العمودان إلى مخرجات <code>validate(df, SCHEMA)</code> من النسخة 4، وماذا يجعل التغيير وحده <code>decide()</code> تعيد؟"
        },
        "options": [
          {
            "en": "An error “monthly_rent: column is missing” and a warning “rent_nis: column is not in the schema”; the decision is STOP.",
            "ar": "خطأ «monthly_rent: column is missing» وتحذير «rent_nis: column is not in the schema»؛ والقرار STOP."
          },
          {
            "en": "Nothing: the numbers are the same, and the schema only looks at the values it finds.",
            "ar": "لا شيء: الأرقام نفسها، والمخطط لا ينظر إلا إلى القيم التي يجدها."
          },
          {
            "en": "A warning for the missing <code>monthly_rent</code> and an error for the unknown <code>rent_nis</code>; the decision is GO WITH CARE.",
            "ar": "تحذير لـ<code>monthly_rent</code> المفقود وخطأ لـ<code>rent_nis</code> المجهول؛ والقرار GO WITH CARE."
          },
          {
            "en": "A <code>KeyError: 'monthly_rent'</code>, because the function reads <code>df[col]</code> for every column of the schema.",
            "ar": "الخطأ <code>KeyError: 'monthly_rent'</code>، لأن الدالة تقرأ <code>df[col]</code> لكل عمود في المخطط."
          }
        ],
        "answer": 0,
        "hint": {
          "en": "The schema is a promise about which columns arrive. Which is worse: a column you expected that is gone, or a column you did not expect that appeared?",
          "ar": "المخطط وعد بشأن الأعمدة التي ستصل. أيهما أسوأ: عمود توقعته واختفى، أم عمود لم تتوقعه وظهر؟"
        },
        "explain": {
          "en": "This is schema drift: the source stops matching the shape the code was written for. Version 4 checks both directions. A column that the schema expects but the file lacks is an <code>error</code>: everything that depends on rent is now blind. A column that the file has but the schema does not list is only a <code>warning</code>: an unused column cannot corrupt the ones you use. One error is enough for STOP. The function does not crash, because it skips the value checks of a missing column (<code>if col not in df.columns: continue</code>), and it does not stay quiet, because the schema is a promise, not a filter over whatever arrives.",
          "ar": "هذا هو انجراف المخطط: يتوقف المصدر عن مطابقة الشكل الذي كُتب الكود له. وتفحص النسخة 4 الاتجاهين. فعمود يتوقعه المخطط ويفتقده الملف <code>خطأ</code>: كل ما يعتمد على الإيجار صار أعمى. وعمود في الملف لا يذكره المخطط <code>تحذير</code> فقط: فالعمود غير المستعمل لا يفسد الأعمدة التي تستعملها. وخطأ واحد يكفي للقرار STOP. ولا تنهار الدالة لأنها تتخطى فحوص القيم لعمود مفقود (<code>if col not in df.columns: continue</code>)، ولا تسكت لأن المخطط وعد لا مرشّح لما يصل."
        }
      },

      /* ---------------------------------------------------------- 08 */
      {
        "id": "t1l6q08",
        "type": "multi",
        "level": "hard",
        "topics": [
          "t1-schema-drift",
          "t1-expected-schema"
        ],
        "q": {
          "en": "Three of the 54 clean listings with a rent and an area (1004, 1013, 1024) were typed as annual rent instead of monthly: 3,780, 3,060 and 4,680. The real rents run from 195 to 590. Which statements are true? (Choose all that apply.)",
          "ar": "ثلاثة من الإعلانات النظيفة الأربعة والخمسين التي لها إيجار ومساحة (1004 و1013 و1024) كُتبت إيجارًا سنويًّا بدل الشهري: 3,780 و3,060 و4,680. وتتراوح الإيجارات الحقيقية بين 195 و590. أيّ العبارات صحيحة؟ (اختر كل ما ينطبق.)"
        },
        "options": [
          {
            "en": "A rule <code>\"dtype\": \"float64\"</code> cannot catch them: the column is a perfectly good float64 column, only the scale is wrong.",
            "ar": "قاعدة <code>\"dtype\": \"float64\"</code> لا تستطيع التقاطها: فالعمود float64 سليم تمامًا، والخطأ في المقياس فقط."
          },
          {
            "en": "<code>df.isna().sum()</code> would show three extra missing rents, so line 5 of the ritual catches them.",
            "ar": "كان <code>df.isna().sum()</code> سيُظهر ثلاثة إيجارات مفقودة إضافية، فيلتقطها السطر 5 من الطقس."
          },
          {
            "en": "A rule <code>\"max\": 1500</code> flags exactly these three rows before any model sees them.",
            "ar": "قاعدة <code>\"max\": 1500</code> تعلّم هذه الصفوف الثلاثة بالضبط قبل أن يراها أي نموذج."
          },
          {
            "en": "<code>pd.to_numeric(..., errors=\"coerce\")</code> would turn them into NaN, which keeps them out of the fit.",
            "ar": "كانت <code>pd.to_numeric(..., errors=\"coerce\")</code> ستحوّلها إلى NaN فتُبعدها عن التلاؤم."
          },
          {
            "en": "Three wrong rows in 54 (5.6%) barely move a fitted line, so the model stays usable.",
            "ar": "ثلاثة صفوف خاطئة من 54 (5.6%) بالكاد تحرّك الخط الملائم، فيبقى النموذج صالحًا."
          },
          {
            "en": "They lift the mean rent from 334.0 to 529.5 and turn the slope of rent on area from +1.91 to -4.34, and the fit raises no error.",
            "ar": "ترفع متوسط الإيجار من 334.0 إلى 529.5 وتقلب ميل الإيجار على المساحة من +1.91 إلى -4.34، ولا يرفع التلاؤم أي خطأ."
          }
        ],
        "answer": [
          0,
          2,
          5
        ],
        "hint": {
          "en": "For each statement ask what property of the cells it relies on: their type, their presence, or the size of the value.",
          "ar": "لكل عبارة اسأل: على أي خاصية في الخلايا تعتمد؟ نوعها أم وجودها أم حجم القيمة؟"
        },
        "explain": {
          "en": "The slip changes only the size of three values. They are valid floats, present, in the right column, so the dtype rule, <code>isna()</code> and <code>to_numeric</code> all see nothing wrong (the second and fourth options fail for that reason). Only a rule about plausible values sees it: <code>\"max\": 1500</code>, a judgement taken from the real range 195–590. The damage is large and silent: the mean goes from 334.0 to 529.5, the slope from +1.91 to -4.34 (the model now believes bigger flats are cheaper) and a 100 m² flat is priced at 535 instead of 332, and nothing crashes. 5.6% of the rows is enough because the wrong values are twelve times too big, and a few extreme values dominate a least-squares line. This is garbage in, garbage out with numbers.",
          "ar": "الزلة تغيّر حجم ثلاث قيم فقط. فهي أعداد عشرية صالحة وموجودة وفي العمود الصحيح، ولذلك لا ترى قاعدة النوع ولا <code>isna()</code> ولا <code>to_numeric</code> شيئًا خاطئًا (وبهذا يفشل الخياران الثاني والرابع). والقاعدة عن القيم المعقولة وحدها ترى ذلك: <code>\"max\": 1500</code>، حكم مأخوذ من المدى الحقيقي 195–590. والضرر كبير وصامت: يقفز المتوسط من 334.0 إلى 529.5، والميل من +1.91 إلى -4.34 (يظن النموذج الآن أن الشقق الأكبر أرخص)، وتُسعَّر شقة 100 م² بـ535 بدل 332، ولا ينهار شيء. و5.6% من الصفوف تكفي لأن القيم الخاطئة أكبر اثنتي عشرة مرة، وقليل من القيم المتطرفة يهيمن على خط المربعات الصغرى. هذا هو «مدخلات فاسدة تعطي نتائج فاسدة» بالأرقام."
        }
      },

      /* ---------------------------------------------------------- 09 */
      {
        "id": "t1l6q09",
        "type": "match",
        "level": "medium",
        "topics": [
          "t1-quality-dimensions",
          "t1-quality-report"
        ],
        "q": {
          "en": "Place each finding under the quality dimension it belongs to. (Accuracy is the sixth word that people add to the five.)",
          "ar": "ضع كل ملاحظة تحت بُعد الجودة الذي تنتمي إليه. (الدقة هي الكلمة السادسة التي يضيفها الناس إلى الخمس.)"
        },
        "leftHead": {
          "en": "Finding",
          "ar": "الملاحظة"
        },
        "rightHead": {
          "en": "Dimension",
          "ar": "البعد"
        },
        "pairs": [
          {
            "l": {
              "en": "Four of the 61 flats have no area",
              "ar": "أربع شقق من 61 بلا مساحة"
            },
            "r": {
              "en": "Completeness",
              "ar": "الاكتمال"
            }
          },
          {
            "l": {
              "en": "The same flat is entered on two identical lines",
              "ar": "الشقة نفسها مُدخلة على سطرين متطابقين"
            },
            "r": {
              "en": "Uniqueness",
              "ar": "التفرّد"
            }
          },
          {
            "l": {
              "en": "One flat has a floor area of 0.0 m²",
              "ar": "شقة مساحتها 0.0 م²"
            },
            "r": {
              "en": "Validity",
              "ar": "الصلاحية"
            }
          },
          {
            "l": {
              "en": "One city is written “Jabalia” on eight lines and “jabalia ” on a ninth",
              "ar": "مدينة واحدة مكتوبة «Jabalia» في ثمانية أسطر و«jabalia » في سطر تاسع"
            },
            "r": {
              "en": "Consistency",
              "ar": "الاتساق"
            }
          },
          {
            "l": {
              "en": "The newest listing in the table is from January, and the report is about this month's rents",
              "ar": "أحدث إعلان في الجدول من كانون الثاني/يناير، والتقرير عن إيجارات هذا الشهر"
            },
            "r": {
              "en": "Timeliness",
              "ar": "الحداثة"
            }
          },
          {
            "l": {
              "en": "A rent of 315 passes every check, but the landlord really charges 350",
              "ar": "إيجار 315 يجتاز كل فحص، لكن المالك يطلب فعلًا 350"
            },
            "r": {
              "en": "Accuracy (needs a second source)",
              "ar": "الدقة (تحتاج مصدرًا ثانيًا)"
            }
          }
        ],
        "hint": {
          "en": "Turn each dimension into its plain question (is it all here? once? obeying the rules of its kind? written the same way? recent enough? true?) and find the finding that answers “no”.",
          "ar": "حوّل كل بُعد إلى سؤاله البسيط (هل هو كله هنا؟ مرة واحدة؟ يطيع قواعد نوعه؟ مكتوب بالطريقة نفسها؟ حديث بما يكفي؟ صحيح؟) وابحث عن الملاحظة التي جوابها «لا»."
        },
        "explain": {
          "en": "The lesson's <code>quality_report</code> puts every number under one of these words: cells filled (completeness), repeated ids and repeated rows (uniqueness), areas outside 20–300 (validity), city labels 6 → 5 and dates not written as YYYY-MM-DD (consistency), and days since the newest listing (timeliness; <code>as_of</code> is passed in so that the answer does not change with the clock). “Jabalia” against “jabalia ” is consistency, not validity: each string is a perfectly good string, the trouble is that they disagree. The sixth word, accuracy, cannot be tested by a file against itself: 315 can be complete, unique, valid, consistent and timely and still be wrong, and only a second source (a receipt, a visit, last year's file) can say so. Be suspicious of a report that gives a table “100% quality” from the table alone. And note that one defect often shows under two dimensions (a repeated row also repeats its id).",
          "ar": "يضع <code>quality_report</code> في الدرس كل رقم تحت إحدى هذه الكلمات: الخلايا المعبّأة (الاكتمال)، والمعرّفات والصفوف المكرّرة (التفرّد)، والمساحات خارج 20–300 (الصلاحية)، وتسميات المدن 6 → 5 والتواريخ غير المكتوبة بصيغة YYYY-MM-DD (الاتساق)، وعدد الأيام منذ أحدث إعلان (الحداثة؛ يُمرَّر <code>as_of</code> حتى لا يتغير الجواب بتغير الساعة). و«Jabalia» مقابل «jabalia » اتساق لا صلاحية: كل نص منهما سليم تمامًا، والعيب أنهما يختلفان. أما الكلمة السادسة، الدقة، فلا يستطيع ملف أن يختبرها بنفسه: قد يكون 315 مكتملًا وفريدًا وصالحًا ومتسقًا وحديثًا ومع ذلك خاطئًا، ولا يقول ذلك إلا مصدر ثانٍ (إيصال أو زيارة أو ملف العام الماضي). وكن متشككًا في تقرير يمنح جدولًا «جودة 100%» من الجدول وحده. ولاحظ أن العيب الواحد كثيرًا ما يظهر تحت بعدين (فالصف المكرّر يكرّر معرّفه أيضًا)."
        }
      },

      /* ---------------------------------------------------------- 10 */
      {
        "id": "t1l6q10",
        "type": "multi",
        "level": "medium",
        "topics": [
          "t1-invisible-inconsistency",
          "t1-quality-report"
        ],
        "q": {
          "en": "On screen, the damage levels below look like the same word three times and then another word. In fact the third one ends in ى (U+0649) instead of ي (U+064A). Which checks would reveal that it is a different string? (Choose all that apply.)",
          "ar": "على الشاشة تبدو مستويات الضرر أدناه كلمة واحدة ثلاث مرات ثم كلمة أخرى. لكن الثالثة تنتهي في الحقيقة بـ ى (U+0649) بدل ي (U+064A). أيّ الفحوص يكشف أنها نص مختلف؟ (اختر كل ما ينطبق.)"
        },
        "code": "labels = pd.Series([\n    \"جزئي\",\n    \"جزئي\",\n    \"جزئى\",      # the third ends in a different letter\n    \"كلي\",\n])",
        "options": [
          {
            "en": "<code>labels.isna().sum()</code> shows one missing value, the odd word, so the problem is a hole in the column.",
            "ar": "يُظهر <code>labels.isna().sum()</code> قيمة مفقودة واحدة هي الكلمة الشاذة، فالمشكلة ثقب في العمود."
          },
          {
            "en": "<code>labels.value_counts()</code> shows three labels for four values, two of which look identical.",
            "ar": "يُظهر <code>labels.value_counts()</code> ثلاث تسميات لأربع قيم، اثنتان منها تبدوان متطابقتين."
          },
          {
            "en": "An <code>allowed</code> rule that lists the three valid spellings reports the odd word between quotation marks.",
            "ar": "قاعدة <code>allowed</code> تسرد التهجئات الثلاث الصحيحة تُبلغ عن الكلمة الشاذة بين علامتي اقتباس."
          },
          {
            "en": "<code>labels.str.strip().str.title().nunique()</code> returns 2, because cleaning merges the odd word with the others.",
            "ar": "يعيد <code>labels.str.strip().str.title().nunique()</code> القيمة 2، لأن التنظيف يدمج الكلمة الشاذة مع الأخريات."
          },
          {
            "en": "<code>labels.dtype</code> shows <code>object</code> for the odd word and <code>string</code> for the others.",
            "ar": "يُظهر <code>labels.dtype</code> النوع <code>object</code> للكلمة الشاذة و<code>string</code> للأخريات."
          },
          {
            "en": "<code>[hex(ord(s[-1])) for s in labels]</code> prints <code>0x64a</code> for three words and <code>0x649</code> for the odd one.",
            "ar": "تطبع <code>[hex(ord(s[-1])) for s in labels]</code> القيمة <code>0x64a</code> لثلاث كلمات و<code>0x649</code> للشاذة."
          }
        ],
        "answer": [
          1,
          2,
          5
        ],
        "hint": {
          "en": "Ask what each check really compares. Is the odd word missing, is it spelled with different spaces or case, or is it simply a different string?",
          "ar": "اسأل عمّا يقارنه كل فحص فعلًا. هل الكلمة الشاذة مفقودة؟ هل تختلف في المسافات أو الحالة؟ أم هي ببساطة نص مختلف؟"
        },
        "explain": {
          "en": "Four values, three “categories”, and no eye can tell why. <code>value_counts()</code> exposes it as a third line next to a line that looks identical; an <code>allowed</code> rule names the spellings that exist and reports the intruder between quotation marks, so you can inspect its code points; printing the code points shows U+0649 against U+064A. <code>isna()</code> finds nothing because nothing is missing. <code>strip()</code> and <code>title()</code> remove spaces and change case and do not touch an Arabic letter, so the quality report's line “city labels before and after strip+title” would still say 3 → 3 here. And a dtype belongs to the whole column, never to a single value. The dimension is consistency: one thing written in two ways. Repairing such text is the next chapter's cleaning work; here we only need to find it, because in a model the odd word becomes a class of its own with one example.",
          "ar": "أربع قيم، «فئات» ثلاث، ولا تعرف عين السبب. يكشفها <code>value_counts()</code> سطرًا ثالثًا بجانب سطر يبدو مطابقًا؛ وتسمّي قاعدة <code>allowed</code> التهجئات الموجودة وتُبلغ عن الدخيل بين علامتي اقتباس فتستطيع فحص رموزه؛ وطباعة الرموز تُظهر U+0649 مقابل U+064A. أما <code>isna()</code> فلا يجد شيئًا لأن لا شيء مفقودًا. و<code>strip()</code> و<code>title()</code> تنزعان المسافات وتغيّران الحالة ولا تمسّان حرفًا عربيًّا، فسيقول سطر تقرير الجودة «تسميات المدن قبل strip+title وبعدها» هنا 3 → 3. والنوع (dtype) للعمود كله لا لقيمة واحدة. والبعد هو الاتساق: شيء واحد مكتوب بطريقتين. وإصلاح نص كهذا عمل التنظيف في الفصل التالي؛ وهنا نحتاج فقط أن نجده، لأن الكلمة الشاذة تصير في النموذج صنفًا قائمًا بذاته بمثال واحد."
        }
      },

      /* ---------------------------------------------------------- 11 */
      {
        "id": "t1l6q11",
        "type": "tf",
        "level": "easy",
        "topics": [
          "t1-data-lineage"
        ],
        "q": {
          "en": "Last month's run and this month's run of the same job both read a file called <code>rental_listings_update.csv</code>; their lineage records are shown below. True or false: since the byte count and the number of rows are identical, both runs read the same data.",
          "ar": "قرأ تشغيل الشهر الماضي وتشغيل هذا الشهر للمهمة نفسها ملفًّا اسمه <code>rental_listings_update.csv</code>؛ وسجلا نسب البيانات لهما أدناه. صح أم خطأ: بما أن عدد البايتات وعدد الصفوف متطابقان فإن التشغيلين قرآ البيانات نفسها."
        },
        "code": "last month: {'bytes': 6773, 'sha256': '77b69b7f0a00', 'rows': 61}\nthis month: {'bytes': 6773, 'sha256': '3c1f9d02ab44', 'rows': 61}",
        "truth": false,
        "hint": {
          "en": "Compare the two records field by field: which fields could stay equal even if one value inside the file changed?",
          "ar": "قارن السجلين حقلًا حقلًا: أي الحقول قد تبقى متساوية حتى لو تغيرت قيمة واحدة داخل الملف؟"
        },
        "explain": {
          "en": "False. A file name, a size and a row count can all stay the same while a value changes: a rent corrected from 315 to 351 changes no length and no count. The fingerprint, the first 12 characters of the SHA-256 hash of the file's bytes, changes if a single byte changes, so two different fingerprints mean two different files whatever the name says, and a chart that moved between the runs may be explained by the data, not only by the code. That is why the lineage record is saved next to every result, why a raw file is never overwritten, and why a dated name, the schema and the validation report travel with it. The honest cost: it is bookkeeping, and for a one-afternoon exploration a dated file name is enough.",
          "ar": "خطأ. قد يبقى الاسم والحجم وعدد الصفوف كلها كما هي بينما تتغير قيمة: إيجار صُحّح من 315 إلى 351 لا يغيّر طولًا ولا عدًّا. أما البصمة، أي أول 12 محرفًا من تجزئة SHA-256 لبايتات الملف، فتتغير لو تغيّر بايت واحد، فبصمتان مختلفتان تعنيان ملفين مختلفين أيًّا كان الاسم، وقد يفسّر البياناتُ لا الكودَ وحده رسمًا تحرّك بين التشغيلين. ولهذا يُحفظ سجل النسب بجانب كل نتيجة، ولا يُكتب فوق ملف خام أبدًا، ويسافر معه اسم مؤرَّخ والمخطط وتقرير التحقّق. والكلفة بصراحة: هي مسك دفاتر، وفي استكشاف يدوم عصرًا واحدًا يكفي اسم ملف مؤرَّخ."
        }
      },

      /* ---------------------------------------------------------- 12 */
      {
        "id": "t1l6q12",
        "type": "contrast",
        "level": "medium",
        "topics": [
          "t1-format-decision-table",
          "t1-format-roundtrip"
        ],
        "q": {
          "en": "The lesson wrote typed tables to disk and read them back with default arguments. Place each statement under CSV, under Parquet, or under both.",
          "ar": "كتب الدرس جداول منمَّطة إلى القرص وقرأها من جديد بالوسائط الافتراضية. ضع كل عبارة تحت CSV أو تحت Parquet أو تحت كليهما."
        },
        "concepts": [
          {
            "en": "CSV",
            "ar": "CSV"
          },
          {
            "en": "Parquet",
            "ar": "Parquet"
          }
        ],
        "rows": [
          {
            "s": {
              "en": "Reading it back with default arguments returns an ordered category as an ordered category",
              "ar": "قراءته بالوسائط الافتراضية تُعيد الفئة المرتّبة فئة مرتّبة"
            },
            "a": 1
          },
          {
            "s": {
              "en": "Plain text that any editor can open, compare line by line and attach to an email",
              "ar": "نص عادي يفتحه أي محرر ويمكن مقارنته سطرًا سطرًا وإرفاقه ببريد"
            },
            "a": 0
          },
          {
            "s": {
              "en": "pandas needs an extra package (<code>pyarrow</code>) to read and write it",
              "ar": "تحتاج pandas إلى حزمة إضافية (<code>pyarrow</code>) لقراءته وكتابته"
            },
            "a": 1
          },
          {
            "s": {
              "en": "After the cleaned school table is written and read back, the id <code>0071</code> has become <code>71</code>",
              "ar": "بعد كتابة جدول المدارس المنظَّف وقراءته من جديد يصير المعرّف <code>0071</code> هو <code>71</code>"
            },
            "a": 0
          },
          {
            "s": {
              "en": "It stores a flat with a floor area of 0.0 m² without a word of complaint",
              "ar": "يحفظ شقة مساحتها 0.0 م² دون كلمة اعتراض"
            },
            "a": 2
          },
          {
            "s": {
              "en": "For the 60-row listings table it gives the smaller file (6,771 bytes against 7,953)",
              "ar": "في جدول الإعلانات ذي الصفوف الستين يعطي الملف الأصغر (6,771 بايتًا مقابل 7,953)"
            },
            "a": 0
          },
          {
            "s": {
              "en": "An <code>Int64</code> column with three gaps comes back as <code>Int64</code> with the same three gaps",
              "ar": "عمود <code>Int64</code> فيه ثلاث فجوات يعود <code>Int64</code> بالفجوات الثلاث نفسها"
            },
            "a": 1
          }
        ],
        "hint": {
          "en": "One of them is plain text and must guess the types again on reading; the other stores each column's type inside the file. Which consequences follow, and which do not depend on the format at all?",
          "ar": "أحدهما نص عادي ويجب أن يخمّن الأنواع من جديد عند القراءة؛ والآخر يخزّن نوع كل عمود داخل الملف. ما النتائج المترتبة على ذلك، وأيها لا يتعلق بالصيغة أصلًا؟"
        },
        "explain": {
          "en": "In the round trip, CSV and JSON lost the dtype of 7 of the 9 listing columns, Excel 6, Parquet none. On the capstone table, CSV gave back the id 0071 as 71, the ordered damage level as plain text, the dates as text and the Int64 counts as float64; Parquet returned every column unchanged, still ordered, with the three gaps. The costs run the other way: Parquet is binary (no text editor, and an extra package), and at 60 rows it is not even smaller than the CSV. Neither format checks anything: a zero-area flat is stored by both. Format is about fidelity, <code>validate()</code> is about truth. The honest summary is not “Parquet good, CSV bad”: CSV is an excellent exchange format and a poor store for your own work unless the schema travels with it.",
          "ar": "في الذهاب والإياب فقدت CSV وJSON نوع 7 أعمدة من 9 في الإعلانات، وExcel ستة، وParquet لا شيء. وفي جدول المشروع الختامي أعادت CSV المعرّف 0071 هو 71، ومستوى الضرر المرتّب نصًّا عاديًّا، والتواريخ نصوصًا، وأعداد Int64 بالنوع float64؛ بينما أعادت Parquet كل عمود كما هو، وما زال مرتّبًا، وبالفجوات الثلاث. أما الكلفة فتسير في الاتجاه المعاكس: Parquet ثنائية (لا محرر نصوص، وحزمة إضافية)، وعند 60 صفًّا ليست أصغر من CSV. ولا صيغة منهما تتحقق من شيء: كلتاهما تحفظ الشقة ذات المساحة الصفرية. الصيغة تخص الأمانة في الحفظ، و<code>validate()</code> تخص الحقيقة. والخلاصة الأمينة ليست «Parquet جيدة وCSV سيئة»: بل أن CSV صيغة تبادل ممتازة وصيغة حفظ رديئة لعملك ما لم يسافر المخطط معها."
        }
      },

      /* ---------------------------------------------------------- 13 */
      {
        "id": "t1l6q13",
        "type": "mcq",
        "level": "medium",
        "topics": [
          "t1-format-decision-tree",
          "t1-format-decision-table"
        ],
        "q": {
          "en": "Every Sunday you send the cleaned 300-row school table to two colleagues who open it in Excel and sometimes attach it to an email. Nobody reloads it in Python. Which choice do the lesson's decision tree and its honesty box support?",
          "ar": "كل أحد ترسل جدول المدارس المنظَّف ذا الصفوف الثلاثمئة إلى زميلين يفتحانه في Excel ويرفقانه أحيانًا ببريد. لا أحد يعيد تحميله في بايثون. أي الاختيارات تسنده شجرة القرار في الدرس وصندوق الصراحة؟"
        },
        "options": [
          {
            "en": "Parquet, because it is the only format that keeps dtypes, and dtypes always decide the choice of a format.",
            "ar": "Parquet، لأنها الصيغة الوحيدة التي تحفظ الأنواع، والأنواع هي التي تحسم اختيار الصيغة دائمًا."
          },
          {
            "en": "A UTF-8 CSV with a dated name and a one-line note of the dtypes: the easiest file to open, compare and attach.",
            "ar": "ملف CSV بترميز UTF-8 واسم مؤرَّخ وسطر ملاحظة عن الأنواع: أسهل ملف في الفتح والمقارنة والإرفاق."
          },
          {
            "en": "A database, because constraints refuse bad rows, and three people will share the table every week.",
            "ar": "قاعدة بيانات، لأن القيود ترفض الصفوف الرديئة، وسيتشارك ثلاثة أشخاص الجدول كل أسبوع."
          },
          {
            "en": "JSON, because it stores numbers and strings separately, so the dtypes survive the trip to Excel.",
            "ar": "JSON، لأنها تخزّن الأرقام والنصوص كلًّا على حدة فتنجو الأنواع من الرحلة إلى Excel."
          }
        ],
        "answer": 1,
        "hint": {
          "en": "Start from the first question of the tree: who produces and who receives the file? Then ask what the receiver needs to survive the trip.",
          "ar": "ابدأ بالسؤال الأول في الشجرة: من ينتج الملف ومن يستقبله؟ ثم اسأل: ما الذي يحتاجه المستقبِل لينجو من الرحلة؟"
        },
        "explain": {
          "en": "Fidelity of dtypes matters to whoever reloads the table in Python; these two colleagues read it with their eyes in Excel, so the simplest file wins: a UTF-8 CSV is easy to open, to diff and to attach, and a one-line note covers the dtypes. Parquet is binary (a colleague cannot open it in Excel, and pandas needs an extra package), JSON needs flattening and has no category, date or Int64, and a database is a different job (many writers, constraints, queries): installing one to store 300 rows is how a Friday afternoon disappears. No format validates anything, so none of the four removes the need to run <code>validate()</code>. Parquet is the right answer to a different question: a cleaned table that tomorrow's notebook or a training job must reload with its types.",
          "ar": "تهمّ أمانة الأنواع من يعيد تحميل الجدول في بايثون؛ وهذان الزميلان يقرآنه بأعينهما في Excel، فيفوز الملف الأبسط: CSV بترميز UTF-8 سهل الفتح والمقارنة والإرفاق، وسطر ملاحظة واحد يغطي الأنواع. أما Parquet فثنائية (لا يفتحها زميل في Excel وتحتاج pandas إلى حزمة إضافية)، وJSON تحتاج تسطيحًا وليس فيها فئة ولا تاريخ ولا Int64، وقاعدة البيانات عمل آخر (كتّاب كثر وقيود واستعلامات): وتثبيتها لحفظ 300 صف هو الطريقة التي يضيع بها عصر الجمعة. ولا صيغة تتحقق من شيء، فلا تُغني واحدة من الأربع عن تشغيل <code>validate()</code>. وParquet هي الجواب الصحيح عن سؤال آخر: جدول منظَّف يجب أن يعيد دفتر الغد أو مهمة تدريب تحميله بأنواعه."
        }
      },

      /* ---------------------------------------------------------- 14 */
      {
        "id": "t1l6q14",
        "type": "order",
        "level": "easy",
        "topics": [
          "t1-capstone-classify",
          "t1-capstone-dtypes",
          "t1-capstone-findings"
        ],
        "q": {
          "en": "Put the steps of the school-damage capstone in the order in which each step can be done: every step needs something that an earlier step produced.",
          "ar": "رتّب خطوات المشروع الختامي لتقييم أضرار المدارس بالترتيب الذي تُنجَز به: كل خطوة تحتاج إلى شيء أنتجته خطوة سابقة."
        },
        "items": [
          {
            "en": "Classify each column by measurement level and by kind (categorical or numerical, discrete or continuous).",
            "ar": "صنّف كل عمود بمستوى القياس وبنوعه (فئوي أم عددي، منفصل أم متصل)."
          },
          {
            "en": "Choose a dtype for each column from that classification, noting the traps: an identifier, a possible false zero, an ordinal.",
            "ar": "اختر لكل عمود نوعًا انطلاقًا من هذا التصنيف، مع تسجيل المصائد: معرّف، وصفر قد يكون كاذبًا، وعمود ترتيبي."
          },
          {
            "en": "Write the exact <code>read_csv</code> call: the encoding, the dtype map and the strings that count as missing.",
            "ar": "اكتب استدعاء <code>read_csv</code> الدقيق: الترميز وخريطة الأنواع والنصوص التي تُعدّ مفقودة."
          },
          {
            "en": "Run the ritual on the loaded frame and write findings that each name a dimension and quote a number.",
            "ar": "نفّذ الطقس على الجدول المحمَّل واكتب ملاحظات يسمّي كل منها بُعدًا ويقتبس رقمًا."
          },
          {
            "en": "Repair what can honestly be repaired (two explicit date parses, zeros marked as not counted) and measure again.",
            "ar": "أصلح ما يمكن إصلاحه بأمانة (تحليلان صريحان للتاريخ، وأصفار تُعلَّم بأنها لم تُحصَ) وقِس من جديد."
          },
          {
            "en": "Run <code>validate()</code> on the repaired table and read its decision.",
            "ar": "شغّل <code>validate()</code> على الجدول المصلَح واقرأ قرارها."
          }
        ],
        "answer": [
          0,
          1,
          2,
          3,
          4,
          5
        ],
        "hint": {
          "en": "Name what each step hands to the next: a classification, a dtype map, a loaded frame, a list of findings, a repaired table.",
          "ar": "سمِّ ما تسلّمه كل خطوة للتي بعدها: تصنيفًا، وخريطة أنواع، وجدولًا محمَّلًا، وقائمة ملاحظات، وجدولًا مصلَحًا."
        },
        "explain": {
          "en": "The order follows the dependencies. The dtypes come from the classification (a nominal identifier must be a string, an ordinal an ordered category); the <code>read_csv</code> call is built from the dtypes; the ritual needs the loaded frame, and it is what tells you what is wrong (three zeros that are exactly the total-damage schools, one empty classroom count, two date formats); the repair acts on those findings and is counted before and after; the validator then checks the repaired table, and its decision (GO WITH CARE, with honest warnings about the missing enrolments) is the last word. The lesson also validates the table as read, which says STOP: the order matters because a repair made before you know what is wrong is a guess.",
          "ar": "يتبع الترتيب الاعتماد بين الخطوات. تأتي الأنواع من التصنيف (المعرّف الاسمي يجب أن يكون string والترتيبي فئة مرتّبة)؛ ويُبنى استدعاء <code>read_csv</code> من الأنواع؛ ويحتاج الطقس إلى الجدول المحمَّل وهو ما يخبرك بما هو خاطئ (ثلاثة أصفار هي بالضبط مدارس الضرر الكلي، وعدد فصول فارغ واحد، وصيغتا تاريخ)؛ ويعمل الإصلاح على تلك الملاحظات ويُعَدّ قبل وبعد؛ ثم تفحص دالة التحقّق الجدول المصلَح، وقرارها (GO WITH CARE مع تحذيرات صادقة عن أعداد الطلبة المفقودة) هو الكلمة الأخيرة. ويتحقق الدرس أيضًا من الجدول كما قُرئ فيقول STOP: والترتيب مهم لأن إصلاحًا قبل أن تعرف ما هو الخطأ تخمين."
        }
      },

      /* ---------------------------------------------------------- 15 */
      {
        "id": "t1l6q15",
        "type": "multi",
        "level": "hard",
        "topics": [
          "t1-capstone-classify",
          "t1-capstone-traps",
          "t1-capstone-findings"
        ],
        "q": {
          "en": "Which statements about the nine-school damage file are true? (Choose all that apply.)",
          "ar": "أيّ العبارات الآتية عن ملف أضرار المدارس التسع صحيحة؟ (اختر كل ما ينطبق.)"
        },
        "options": [
          {
            "en": "<code>avg_temp_c</code> is interval and continuous, so <code>float64</code>: it is measured, and 22 °C is not twice 11 °C.",
            "ar": "<code>avg_temp_c</code> فتري ومتصل، فنوعه <code>float64</code>: فهو مقيس، و22 °C ليست ضعف 11 °C."
          },
          {
            "en": "<code>school_id</code> is best read as <code>int64</code>: its values are digits, and numbers sort, join and compare faster than text.",
            "ar": "الأفضل أن يُقرأ <code>school_id</code> بالنوع <code>int64</code>: قيمه أرقام، والأرقام تُرتَّب وتُربط وتُقارَن أسرع من النص."
          },
          {
            "en": "<code>assessment_date</code> is ratio-level, because a date has a zero: 1 January is where the calendar starts counting.",
            "ar": "<code>assessment_date</code> نسبي المستوى لأن للتاريخ صفرًا: الأول من كانون الثاني/يناير حيث يبدأ التقويم العدّ."
          },
          {
            "en": "The three zeros in <code>students_count</code> are exactly the three total-damage schools, so the gap is not random; filling it with the mean would erase that pattern.",
            "ar": "الأصفار الثلاثة في <code>students_count</code> هي بالضبط مدارس الضرر الكلي الثلاث، فالفجوة ليست عشوائية؛ وملؤها بالمتوسط سيمحو هذا النمط."
          },
          {
            "en": "<code>df[\"damage_level\"].median()</code> raises <code>TypeError</code> for the ordered category in pandas 2.2, so the middle school comes from the sorted column.",
            "ar": "<code>df[\"damage_level\"].median()</code> يرفع <code>TypeError</code> للفئة المرتّبة في pandas 2.2، فتؤخذ المدرسة الوسطى من العمود المرتّب."
          },
          {
            "en": "<code>students_count</code> deserves <code>int64</code>: it is a count, counts are whole numbers, and a whole-number dtype is the most compact.",
            "ar": "يستحق <code>students_count</code> النوع <code>int64</code>: فهو عدّ، والأعداد المعدودة صحيحة، والنوع الصحيح أكثر الأنواع إيجازًا."
          }
        ],
        "answer": [
          0,
          3,
          4
        ],
        "hint": {
          "en": "Ask of each statement whether it describes what the column <em>means</em> or only what pandas would guess from the digits in the file.",
          "ar": "اسأل عن كل عبارة: هل تصف ما يعنيه العمود، أم ما كانت pandas ستخمّنه من الأرقام في الملف فقط؟"
        },
        "explain": {
          "en": "A level is a judgement about meaning that no function can read off the file. Temperature has an arbitrary zero (interval) and is measured (continuous) even when it is written as 21; the identifier is a label, so <code>0071</code> must stay text; the calendar has no true zero, so a date is interval. The zeros in <code>students_count</code> coincide with the total-damage schools in the cross-tabulation (3 of 3, and 0 of the other 6), which is a finding about completeness, not a nuisance to be averaged away. pandas will not give the median of an ordered category, so you take the middle element of the sorted column (for an even number of rows there is no single middle category). <code>int64</code> for the counts is the tempting guess, but after the repair three enrolments are missing and only the nullable <code>Int64</code> holds them without turning into floats.",
          "ar": "المستوى حكم عن المعنى لا تستطيع دالة أن تقرأه من الملف. فللحرارة صفر اعتباطي (فتري) وهي مقيسة (متصلة) حتى حين تُكتب 21؛ والمعرّف تسمية، فيجب أن يبقى <code>0071</code> نصًّا؛ وليس للتقويم صفر حقيقي، فالتاريخ فتري. وتتطابق الأصفار في <code>students_count</code> مع مدارس الضرر الكلي في الجدول المتقاطع (3 من 3، و0 من الست الأخرى)، وهذه ملاحظة عن الاكتمال لا إزعاج يُمحى بالمتوسط. ولا تعطي pandas وسيط فئة مرتّبة، فتأخذ العنصر الأوسط من العمود المرتّب (وللعدد الزوجي من الصفوف لا فئة وسطى وحيدة). و<code>int64</code> للعدّ هو التخمين المغري، لكن بعد الإصلاح تغيب ثلاثة أعداد طلبة، ولا يحملها دون أن تصير عشرية إلا النوع القابل للنقص <code>Int64</code>."
        }
      },

      /* ---------------------------------------------------------- 16 */
      {
        "id": "t1l6q16",
        "type": "fill",
        "level": "easy",
        "topics": [
          "t1-capstone-traps",
          "t1-capstone-repair"
        ],
        "q": {
          "en": "Fill in the three blanks. <code>df</code> is the school table read with the Version 3 dtype map. The program should treat the three zeros as “not counted”, then print how many enrolments are now missing, the mean enrolment of the schools that have a figure, and the total enrolment of all nine.",
          "ar": "املأ الفراغات الثلاثة. <code>df</code> هو جدول المدارس المقروء بخريطة أنواع النسخة 3. يجب أن يعامل البرنامج الأصفار الثلاثة على أنها «لم تُحصَ»، ثم يطبع كم عدد طلبة صار مفقودًا، ومتوسط عدد الطلبة في المدارس التي لها رقم، وإجمالي الطلبة في المدارس التسع."
        },
        "code": "counted = df[\"students_count\"].____1____(df[\"students_count\"].eq(0))\nprint(counted.isna().sum())                    # 3\nprint(round(counted.____2____(), 1))           # 901.7\nprint(df[\"students_count\"].____3____())        # 5410",
        "blanks": [
          {
            "accept": [
              "mask"
            ]
          },
          {
            "accept": [
              "mean"
            ]
          },
          {
            "accept": [
              "sum"
            ]
          }
        ],
        "lang": "python",
        "hint": {
          "en": "One Series method puts a missing value wherever a condition is true (its twin does the opposite). The other two are aggregations you have used since Lesson 3.",
          "ar": "هناك دالة في Series تضع قيمة مفقودة حيثما يتحقق الشرط (وتوأمها تفعل العكس). والاثنتان الأخريان تجميعان تستعملهما منذ الدرس 3."
        },
        "explain": {
          "en": "<code>mask(cond)</code> hides the values where the condition is true, so the three zeros become <code>&lt;NA&gt;</code> (3 missing); its twin <code>where(cond)</code> would keep exactly those zeros and hide the rest. <code>mean()</code> then skips the missing values and divides by six: 901.7, the size of a typical school among those with a figure, against 601.1 over all nine. The total is 5,410 either way, because zeros add nothing: “how many pupils are in these nine schools?” keeps the zeros, “how large is a typical school?” needs the six. The file does not say whether 0 means “no pupils enrolled” or “nobody could count”, so the lesson states the assumption and, in real work, asks the office. No row was deleted.",
          "ar": "تُخفي <code>mask(cond)</code> القيم حيث يتحقق الشرط، فتصير الأصفار الثلاثة <code>&lt;NA&gt;</code> (3 مفقودة)؛ أما توأمها <code>where(cond)</code> فكانت ستُبقي هذه الأصفار بالضبط وتخفي الباقي. ثم يتخطى <code>mean()</code> القيم المفقودة ويقسم على ستة: 901.7، حجم المدرسة النموذجية بين التي لها رقم، مقابل 601.1 على التسع كلها. والمجموع 5,410 في الحالتين لأن الأصفار لا تضيف شيئًا: «كم طالبًا في هذه المدارس التسع؟» يُبقي الأصفار، و«ما حجم المدرسة النموذجية؟» يحتاج الست. ولا يقول الملف هل يعني الصفر «لا طلبة مسجّلين» أم «لم يستطع أحد أن يعدّ»، فيذكر الدرس الافتراض، وفي العمل الحقيقي تسأل المكتب. ولم يُحذف أي صف."
        }
      },

      /* ---------------------------------------------------------- 17 */
      {
        "id": "t1l6q17",
        "type": "compare",
        "level": "medium",
        "topics": [
          "t1-capstone-read-csv",
          "t1-capstone-dtypes"
        ],
        "q": {
          "en": "Both programs read <code>school_damage_assessment.csv</code>: A is Version 2 of the lesson's <code>read_csv</code>, B is Version 3 (shortened: the schema lists only some of the columns, and <code>LEVELS</code> stands for the three damage words, minor &lt; partial &lt; total). Which statement is correct?",
          "ar": "يقرأ البرنامجان الملف <code>school_damage_assessment.csv</code>: أ هو النسخة 2 من <code>read_csv</code> في الدرس، وب هو النسخة 3 (مختصرتان: يسرد المخطط بعض الأعمدة فقط، وتمثّل <code>LEVELS</code> الكلمات الثلاث لمستوى الضرر: طفيف &lt; جزئي &lt; كلي). أي العبارات صحيحة؟"
        },
        "codeA": "df = pd.read_csv(\n    \"school_damage_assessment.csv\",\n    encoding=\"utf-8-sig\",\n    dtype={\"school_id\": \"string\"},\n    na_values=[\"\", \"NA\", \"-\"],\n)",
        "codeB": "DAMAGE = pd.CategoricalDtype(\n    LEVELS, ordered=True)\nSCHEMA = {\n    \"school_id\": {\"dtype\": \"string\"},\n    \"damage_level\": {\"dtype\": DAMAGE},\n    \"classrooms\": {\"dtype\": \"Int64\"},\n    # ... the other five columns\n}\ndtype = {c: r[\"dtype\"]\n         for c, r in SCHEMA.items()}\ndf = pd.read_csv(\n    \"school_damage_assessment.csv\",\n    encoding=\"utf-8-sig\",\n    dtype=dtype,\n    na_values=[\"\", \"NA\", \"-\"],\n)",
        "options": [
          {
            "en": "A is better: pandas guesses the columns that are not listed correctly from the data (whole numbers stay integers, words become categories), so listing them adds nothing.",
            "ar": "أ أفضل: تخمّن pandas الأعمدة غير المذكورة تخمينًا صحيحًا من البيانات (تبقى الأعداد الصحيحة صحيحة وتصير الكلمات فئات)، فلا تضيف قائمتها شيئًا."
          },
          {
            "en": "They are equivalent: <code>dtype=</code> only matters for the identifier columns, which are the same in both programs, and everything else is left to pandas in both.",
            "ar": "هما متكافئتان: لا يهم <code>dtype=</code> إلا في أعمدة المعرّف، وهي نفسها في البرنامجين، ويُترك كل ما عداها لـpandas في كليهما."
          },
          {
            "en": "B is better because declaring the ordered damage levels in the read makes a misspelt level raise an error, so no stray spelling can get into the table unnoticed.",
            "ar": "ب أفضل لأن إعلان مستويات الضرر المرتّبة في القراءة يجعل المستوى المكتوب خطأً يرفع استثناءً، فلا يدخل الجدول إملاء شارد دون أن يلحظه أحد."
          },
          {
            "en": "B is better: every column arrives with the dtype it deserves (<code>classrooms</code> as <code>Int64</code>, <code>damage_level</code> ordered) and the same <code>SCHEMA</code> can feed <code>validate()</code>; the dates are still text.",
            "ar": "ب أفضل: يصل كل عمود بالنوع الذي يستحقه (<code>classrooms</code> من النوع <code>Int64</code> و<code>damage_level</code> مرتّب)، ويستطيع <code>SCHEMA</code> نفسه أن يغذّي <code>validate()</code>؛ لكن التواريخ ما زالت نصًّا."
          }
        ],
        "answer": 3,
        "hint": {
          "en": "Run A in your head: which dtypes do the columns that are not listed get? Then ask where the knowledge “classrooms is a nullable integer” lives in each program, and what else could use it.",
          "ar": "شغّل أ في رأسك: ما أنواع الأعمدة التي لم تُذكر؟ ثم اسأل: أين تسكن معرفة «classrooms عدد صحيح قابل للنقص» في كل برنامج، وما الذي يستطيع استعمالها أيضًا؟"
        },
        "explain": {
          "en": "Version 1 (the default call) lost the zeros of the ids and left the dates as text; Version 2 (A) fixed the ids, but everything it does not list is still guessed: <code>classrooms</code> is <code>float64</code> because of one empty cell (18.0), and the categories are plain <code>object</code>. Its dtype knowledge is also typed into the call, where nothing else can reuse it. Version 3 (B) moves the dtypes into a <code>SCHEMA</code> dictionary and builds the <code>dtype=</code> map from it, so every column arrives typed and the same dictionary feeds <code>validate()</code>: reading and checking cannot drift apart. It still leaves two things open: the dates need a separate, counted step because of their two formats, and the zeros are still zeros. The tempting third option is wrong in a dangerous way: a declared ordered dtype does not raise on a stray spelling, it turns it into NaN silently, so the holes must be counted after the read.",
          "ar": "ضيّعت النسخة 1 (الاستدعاء الافتراضي) أصفار المعرّفات وتركت التواريخ نصًّا؛ وأصلحت النسخة 2 (أ) المعرّفات، لكن كل ما لم تذكره يبقى مخمَّنًا: فـ<code>classrooms</code> من النوع <code>float64</code> بسبب خلية فارغة واحدة (18.0)، والفئات <code>object</code> عادي. كما أن معرفتها بالأنواع مكتوبة في الاستدعاء حيث لا يستطيع شيء آخر إعادة استعمالها. وتنقل النسخة 3 (ب) الأنواع إلى قاموس <code>SCHEMA</code> وتبني خريطة <code>dtype=</code> منه، فيصل كل عمود منمَّطًا ويغذّي القاموس نفسه <code>validate()</code>: فلا ينفصل القراءة والفحص. ويبقى أمران مفتوحان: التواريخ تحتاج خطوة منفصلة محسوبة بسبب صيغتيها، والأصفار ما زالت أصفارًا. والخيار الثالث المغري خاطئ خطأً خطيرًا: فالنوع المرتّب المعلَن لا يرفع استثناءً عند إملاء شارد، بل يحوّله إلى NaN بصمت، فيجب عدّ الثقوب بعد القراءة."
        }
      },

      /* ---------------------------------------------------------- 18 */
      {
        "id": "t1l6q18",
        "type": "output",
        "level": "hard",
        "topics": [
          "t1-capstone-read-csv",
          "t1-invisible-inconsistency"
        ],
        "q": {
          "en": "A column of cities is read with a declared set of categories. Write exactly what the program prints (three lines).",
          "ar": "يُقرأ عمود مدن بمجموعة فئات معلَنة. اكتب بالضبط ما يطبعه البرنامج (ثلاثة أسطر)."
        },
        "code": "import io\nimport pandas as pd\n\nCITY = pd.CategoricalDtype([\"Gaza\", \"Khan Younis\", \"Rafah\"])\ntext = \"id,city\\n1,Rafah\\n2,rafah \\n3,Gaza\\n\"      # the second city: lower-case r, trailing space\n\ncities = pd.read_csv(io.StringIO(text), dtype={\"city\": CITY})[\"city\"]\nprint(cities.tolist())\nprint(cities.isna().sum())\nprint(cities.cat.categories.tolist())",
        "blanks": [
          {
            "accept": [
              "['Rafah', nan, 'Gaza']\n1\n['Gaza', 'Khan Younis', 'Rafah']",
              "['Rafah',nan,'Gaza']\n1\n['Gaza','Khan Younis','Rafah']"
            ],
            "lines": 3
          }
        ],
        "hint": {
          "en": "A declared category set is a list of the only labels allowed. What does pandas do with a text that is not on the list, and does the list grow?",
          "ar": "مجموعة الفئات المعلَنة قائمة بالتسميات الوحيدة المسموحة. ماذا تفعل pandas بنص ليس في القائمة؟ وهل تكبر القائمة؟"
        },
        "explain": {
          "en": "A declared dtype is a filter as well as a label. “rafah ” differs from “Rafah” by one letter's case and a trailing space, so it is not on the list; pandas does not raise and does not add a fourth category, it turns the cell into a missing value (<code>nan</code> in the list, 1 in the count) and the categories stay the three declared ones. Nothing complains, which is why the lesson says to count the holes after the read. The same happens to the damage levels when one word ends in ى instead of ي: an ordered dtype turns a stray spelling into NaN. A report that counts only blanks before the read would show nothing, so compare <code>isna().sum()</code> before and after, or read as text first and count the failures, as the loader does.",
          "ar": "النوع المعلَن مرشّح وتسمية معًا. فـ«rafah » تختلف عن «Rafah» بحالة حرف واحد ومسافة زائدة، فليست في القائمة؛ ولا ترفع pandas استثناءً ولا تضيف فئة رابعة، بل تحوّل الخلية إلى قيمة مفقودة (<code>nan</code> في القائمة و1 في العدّ) وتبقى الفئات الثلاث المعلَنة كما هي. لا شيء يشتكي، ولهذا يقول الدرس: عُدّ الثقوب بعد القراءة. والأمر نفسه يحدث لمستويات الضرر حين تنتهي كلمة بـ ى بدل ي: النوع المرتّب يحوّل الإملاء الشارد إلى NaN. وتقرير يعدّ الفراغات قبل القراءة فقط لن يُظهر شيئًا، فقارن <code>isna().sum()</code> قبل القراءة وبعدها، أو اقرأ نصًّا أولًا وعُدّ الإخفاقات كما يفعل المحمِّل."
        }
      },

      /* ---------------------------------------------------------- 19 */
      {
        "id": "t1l6q19",
        "type": "error",
        "level": "hard",
        "topics": [
          "t1-capstone-repair"
        ],
        "q": {
          "en": "The program must stop if the two-pass date parse loses a row. It runs to the end and prints <code>datetime64[ns]</code>, although “31/02/2024” (there is no 31 February) could not be parsed. Click the wrong line.",
          "ar": "يجب أن يتوقف البرنامج إن أضاع تحليل التواريخ بمرحلتين صفًّا. لكنه يصل إلى النهاية ويطبع <code>datetime64[ns]</code> مع أن «31/02/2024» (لا يوجد 31 شباط/فبراير) تعذّر تحليله. انقر السطر الخاطئ."
        },
        "code": "import pandas as pd\n\ndf = pd.DataFrame({\"assessment_date\": [\"2024-03-05\", \"05/04/2024\", \"31/02/2024\", \"18/03/2024\"]})\niso = pd.to_datetime(df[\"assessment_date\"], format=\"%Y-%m-%d\", errors=\"coerce\")\ndmy = pd.to_datetime(df[\"assessment_date\"], format=\"%d/%m/%Y\", errors=\"coerce\")\nassert df[\"assessment_date\"].notna().all()          # not one row lost\ndf[\"assessment_date\"] = iso.fillna(dmy)\nprint(df[\"assessment_date\"].dtype)",
        "answer": 6,
        "solution": {
          "code": "df[\"assessment_date\"] = iso.fillna(dmy)\nassert df[\"assessment_date\"].notna().all()          # not one row lost",
          "en": "Run the assertion after the assignment, so that it looks at the parsed dates.",
          "ar": "نفّذ التأكيد بعد الإسناد ليفحص التواريخ بعد تحليلها."
        },
        "hint": {
          "en": "When the assertion runs, what exactly is in the column it tests, and has the result of the conversion been stored there yet?",
          "ar": "عندما يعمل التأكيد، ماذا يوجد بالضبط في العمود الذي يفحصه؟ وهل خُزّنت نتيجة التحويل فيه بعد؟"
        },
        "explain": {
          "en": "Line 6 checks the right thing at the wrong time. At that point <code>df[\"assessment_date\"]</code> is still the original text, and text never contains a missing value, so the assertion passes whatever the two parses did. The NaT that “31/02/2024” produced lives in <code>iso.fillna(dmy)</code> and only appears in the column after line 7. Moving the assertion below the assignment lets it see the result of the conversion and stop the run. A check that cannot fail is worse than none, because it earns trust it has not earned: this is the same family of mistake as validating after a coercion has already repaired the evidence. (Here an assertion is the right tool, because the invariant is your own, in a notebook; for an external file you would count the failures and report them all.) Lines 4, 5 and 7 are the lesson's two-pass parse and are correct.",
          "ar": "السطر 6 يفحص الشيء الصحيح في الوقت الخطأ. ففي تلك اللحظة ما زال <code>df[\"assessment_date\"]</code> هو النص الأصلي، والنص لا يحوي قيمة مفقودة أبدًا، فيمرّ التأكيد أيًّا كان ما فعله التحليلان. أما NaT الذي أنتجه «31/02/2024» فيسكن <code>iso.fillna(dmy)</code> ولا يظهر في العمود إلا بعد السطر 7. ونقل التأكيد تحت الإسناد يتيح له أن يرى نتيجة التحويل فيوقف التشغيل. وفحص لا يستطيع أن يفشل أسوأ من لا فحص، لأنه يكسب ثقة لم يستحقها: وهذه من عائلة الخطأ نفسها كالتحقق بعد أن يكون القسر قد أصلح الدليل. (والتأكيد هنا هو الأداة الصحيحة لأن الثابت من وضعك وفي دفتر؛ أما لملف خارجي فتعدّ الإخفاقات وتبلّغ عنها كلها.) والأسطر 4 و5 و7 هي التحليل بمرحلتين في الدرس وصحيحة."
        }
      },

      /* ---------------------------------------------------------- 20 */
      {
        "id": "t1l6q20",
        "type": "write",
        "level": "hard",
        "topics": [
          "t1-capstone-validate",
          "t1-validate-function"
        ],
        "q": {
          "en": "Write <code>validate(df)</code> for the school table as read by the Version 3 dtype map. It must <em>return a list of problem sentences</em> (an empty list when all is well) for three rules: the <code>school_id</code> values must be unique; every <code>students_count</code> must be at least 1; and no more than 10% of <code>classrooms</code> may be missing. Do not stop at the first problem.",
          "ar": "اكتب <code>validate(df)</code> لجدول المدارس المقروء بخريطة أنواع النسخة 3. يجب أن <em>تعيد قائمة بجمل المشكلات</em> (قائمة فارغة حين يكون كل شيء سليمًا) لثلاث قواعد: قيم <code>school_id</code> يجب أن تكون فريدة؛ وكل <code>students_count</code> لا يقل عن 1؛ ولا يزيد المفقود في <code>classrooms</code> على 10%. لا تتوقف عند أول مشكلة."
        },
        "starter": "# your code here",
        "lines": 10,
        "lang": "python",
        "checks": [
          {
            "re": "def\\s+validate\\s*\\(\\s*\\w+\\s*\\)",
            "label": {
              "en": "Define <code>validate(df)</code>",
              "ar": "عرّف <code>validate(df)</code>"
            }
          },
          {
            "re": "\\.append\\s*\\(|\\+=\\s*\\[|\\.extend\\s*\\(",
            "label": {
              "en": "Collect each finding in a list (<code>append</code>) instead of stopping at it",
              "ar": "اجمع كل ملاحظة في قائمة (<code>append</code>) بدل أن تتوقف عندها"
            }
          },
          {
            "re": "return\\s+\\w+",
            "label": {
              "en": "<code>return</code> the list",
              "ar": "أعِد القائمة بـ<code>return</code>"
            }
          },
          {
            "re": "(duplicated|is_unique|nunique)",
            "label": {
              "en": "A uniqueness check on <code>school_id</code> (<code>duplicated()</code> or <code>is_unique</code>)",
              "ar": "فحص تفرّد لـ<code>school_id</code> (بـ<code>duplicated()</code> أو <code>is_unique</code>)"
            }
          },
          {
            "re": "students_count[\\\"']?\\s*\\]?\\s*(<\\s*1|<=\\s*0|==\\s*0|\\.(lt|le|eq)\\s*\\(|\\.min\\s*\\()",
            "label": {
              "en": "A lower-bound check on <code>students_count</code> (below 1)",
              "ar": "فحص حدّ أدنى لـ<code>students_count</code> (أقل من 1)"
            }
          },
          {
            "re": "classrooms[\\\"']?\\s*\\]?\\s*\\.\\s*(isna|isnull|notna|notnull|count)\\s*\\(",
            "label": {
              "en": "The missing share of <code>classrooms</code>, measured with <code>isna()</code>",
              "ar": "نسبة المفقود في <code>classrooms</code> مقيسة بـ<code>isna()</code>"
            }
          }
        ],
        "forbid": [
          {
            "re": "\\bassert\\b|\\braise\\b",
            "label": {
              "en": "<code>assert</code> / <code>raise</code> (they stop at the first failure and hide the rest)",
              "ar": "<code>assert</code> / <code>raise</code> (يتوقفان عند أول إخفاق ويُخفيان الباقي)"
            }
          }
        ],
        "solution": {
          "code": "def validate(df):\n    problems = []\n    if df[\"school_id\"].duplicated().any():\n        problems.append(\"school_id: repeated value(s)\")\n    if (df[\"students_count\"] < 1).any():\n        problems.append(\"students_count: value(s) below 1\")\n    if df[\"classrooms\"].isna().mean() > 0.10:\n        problems.append(\"classrooms: more than 10% missing\")\n    return problems\n\nprint(validate(df))",
          "out": "['students_count: value(s) below 1', 'classrooms: more than 10% missing']",
          "en": "Each rule appends a sentence and the function returns the whole list. On the nine-school table it reports the three zeros and the classroom count (1 missing of 9 is 11.1%, over the 10% tolerance); the ids are unique.",
          "ar": "كل قاعدة تضيف جملة وتعيد الدالة القائمة كاملة. وعلى جدول المدارس التسع تُبلغ عن الأصفار الثلاثة وعن عدد الفصول (واحد مفقود من 9 أي 11.1%، فوق تسامح 10%)؛ والمعرّفات فريدة."
        },
        "hint": {
          "en": "Build the function like the lesson's validator: start from an empty list, let every rule that fails add one sentence, and return the list at the end.",
          "ar": "ابنِ الدالة كما في دالة التحقّق في الدرس: ابدأ بقائمة فارغة، ودع كل قاعدة تفشل تضيف جملة واحدة، وأعد القائمة في النهاية."
        },
        "explain": {
          "en": "The shape is the lesson's: <code>problems = []</code>, one <code>if</code> per rule that appends a sentence, and <code>return problems</code>. Nothing raises, so one run reports everything: here the three zeros (“below 1”) and the classroom count, 1 missing of 9 (11.1%), over the 10% tolerance. The ids are unique, so that rule stays silent. An <code>assert</code> or a <code>raise</code> would stop at the first failure and hide the other rule, and it is removed entirely under <code>python -O</code>. The validator only knows what you told it: it says nothing about the two date formats, because no rule here looks at them, and the thresholds (1, 10%) are your judgement. Deciding what the problems mean (STOP, GO WITH CARE) is the caller's job.",
          "ar": "الشكل هو شكل الدرس: <code>problems = []</code> وشرط <code>if</code> لكل قاعدة يضيف جملة، و<code>return problems</code>. لا شيء يرفع استثناءً، فيُبلغ تشغيل واحد عن كل شيء: هنا الأصفار الثلاثة («أقل من 1») وعدد الفصول، واحد مفقود من 9 (11.1%) فوق تسامح 10%. والمعرّفات فريدة فتسكت تلك القاعدة. أما <code>assert</code> أو <code>raise</code> فيتوقفان عند أول إخفاق ويُخفيان القاعدة الأخرى، ويُحذفان كليًّا مع <code>python -O</code>. ودالة التحقّق لا تعرف إلا ما أخبرتها به: لا تقول شيئًا عن صيغتي التاريخ لأن لا قاعدة هنا تنظر إليهما، والحدود (1 و10%) حكمك أنت. وتقرير معنى المشكلات (STOP أو GO WITH CARE) عمل المستدعي."
        }
      },

      /* ---------------------------------------------------------- 21 */
      {
        "id": "t1l6q21",
        "type": "compare",
        "level": "hard",
        "topics": [
          "t1-loader-versions",
          "t1-loader-thread",
          "t1-blank-vs-failed"
        ],
        "q": {
          "en": "Both are versions of <code>load_listings(path)</code>, run on <code>rental_listings_update.csv</code>, where the rent of listing 1004 is written “1,150” and listing 1040 has the date 14/02/2026. The schema tolerates 5% missing rents, and <code>coerce</code> in B is the lesson's helper: it types a column from its schema rule and also returns the cells that were filled in but could not be parsed (<code>bad</code>). Both listings are shortened. Which statement is correct?",
          "ar": "كلاهما نسخة من <code>load_listings(path)</code>، تعمل على <code>rental_listings_update.csv</code> حيث كُتب إيجار الإعلان 1004 هكذا «1,150» وفي الإعلان 1040 التاريخ 14/02/2026. ويتسامح المخطط مع 5% من الإيجارات المفقودة، و<code>coerce</code> في ب هي الدالة المساعدة في الدرس: تنمّط عمودًا من قاعدته في المخطط وتعيد أيضًا الخلايا التي كانت معبّأة وتعذّر تحويلها (<code>bad</code>). والشيفرتان مختصرتان. أي العبارات صحيحة؟"
        },
        "codeA": "def load_listings(path):\n    df = pd.read_csv(path)\n    df[\"monthly_rent\"] = pd.to_numeric(\n        df[\"monthly_rent\"], errors=\"coerce\")\n    df[\"listed_on\"] = pd.to_datetime(\n        df[\"listed_on\"], errors=\"coerce\",\n        format=\"%Y-%m-%d\")\n    # ... the other columns, typed the same way\n    return df, validate(df, SCHEMA)",
        "codeB": "def load_listings(path):\n    raw = pd.read_csv(path, dtype=str,\n                      keep_default_na=False)\n    cols, parse = {}, {}\n    for col in raw.columns:\n        cols[col], bad = coerce(\n            raw[col], SCHEMA[col])\n        blank = raw[col].str.strip().eq(\"\")\n        parse[col] = (blank.sum(), len(bad))\n    df = pd.DataFrame(cols)\n    problems = validate(df, SCHEMA)\n    # ... one error for every failed parse\n    return df, problems",
        "options": [
          {
            "en": "A is better: it keeps pandas' own dtype inference, and reading everything as text in B throws information away and makes the loader slower for no gain in what it reports.",
            "ar": "أ أفضل: تُبقي استنتاج pandas للأنواع، وقراءة كل شيء نصًّا في ب تُضيّع معلومات وتُبطئ المحمِّل دون مكسب فيما يُبلَّغ عنه."
          },
          {
            "en": "They report the same findings: both end with <code>validate(df, SCHEMA)</code>, so the repeated id, the spelling and the zero area are reported alike, and B only counts differently.",
            "ar": "يُبلغان عن الاكتشافات نفسها: كلاهما ينتهي بـ<code>validate(df, SCHEMA)</code>، فيُبلَّغ عن المعرّف المكرّر والإملاء والمساحة الصفرية بالطريقة نفسها، وب لا تختلف إلا في العدّ."
          },
          {
            "en": "B is better: in A the cell “1,150” becomes NaN, so the rent column shows 3 missing of 61 (4.9%), inside the 5% tolerance and unnamed; B counts blanks before parsing, so the cell is reported with its value.",
            "ar": "ب أفضل: في أ تصير الخلية «1,150» هي NaN، فيُظهر عمود الإيجار 3 مفقودة من 61 (4.9%)، داخل تسامح 5% وبلا اسم؛ وتعدّ ب الفراغات قبل التحويل فتُبلَّغ الخلية بقيمتها."
          },
          {
            "en": "B is better because it also repairs “1,150” to 1150 and 14/02/2026 to 14 February before it validates, so its report contains no parsing problem at all.",
            "ar": "ب أفضل لأنها تصلح أيضًا «1,150» إلى 1150 و14/02/2026 إلى 14 شباط/فبراير قبل أن تتحقق، فلا يحوي تقريرها أي مشكلة تحويل."
          }
        ],
        "answer": 2,
        "hint": {
          "en": "Follow the cell “1,150” through A: what is it after <code>to_numeric</code>, and which rule of the schema could notice it? Then ask what B does before it converts anything.",
          "ar": "تتبّع الخلية «1,150» في أ: ما هي بعد <code>to_numeric</code>؟ وأي قاعدة في المخطط تستطيع أن تلاحظها؟ ثم اسأل: ماذا تفعل ب قبل أن تحوّل أي شيء؟"
        },
        "explain": {
          "en": "Version 1 of the loader was a script of cells that printed 3 and 1 missing where the clean file had 2 and 0: would you have noticed? Version 2 (A) turns it into a function that validates, which fixes reuse and shows the duplicate, the spelling and the zero area, but it hides the very thing coercion does: “1,150” becomes NaN, the column has 3 missing of 61 (4.9%), just under the 5% tolerance, so a parse failure disguises itself as a legitimate missing rate, and the date failure appears only as “1 missing”. Version 3 (B) reads as text so that nothing is guessed before it can be counted, counts blanks before and missing after, and reports each failure by name (“1,150”, “14/02/2026”), so the decision is STOP for the right reasons. B reports and does not repair: the fix for “1,150” is a fact about the file's format (<code>thousands=\",\"</code>) and belongs in the schema, and which of two date formats is right is a conversation with the producer. The speed argument is backwards: reading as text is slower and heavier, and the price is worth paying only where the report matters.",
          "ar": "كانت النسخة 1 من المحمِّل سكربتًا من خلايا طبع 3 و1 مفقودة حيث كان في الملف النظيف 2 و0: فهل كنت ستلاحظ؟ والنسخة 2 (أ) تحوّله إلى دالة تتحقق، فتصلح إعادة الاستعمال وتُظهر المكرّر والإملاء والمساحة الصفرية، لكنها تُخفي ما يفعله القسر نفسه: تصير «1,150» هي NaN، وفي العمود 3 مفقودة من 61 (4.9%) أي تحت تسامح 5% بقليل، فيتنكر إخفاق التحويل في صورة نسبة نقص مشروعة، ولا يظهر إخفاق التاريخ إلا «1 مفقودة». وتقرأ النسخة 3 (ب) نصًّا حتى لا يُخمَّن شيء قبل أن يمكن عدّه، وتعدّ الفراغات قبل التحويل والمفقود بعده، وتبلّغ عن كل إخفاق باسمه («1,150» و«14/02/2026»)، فيكون القرار STOP لأسبابه الصحيحة. وب تبلّغ ولا تصلح: فإصلاح «1,150» حقيقة عن صيغة الملف (<code>thousands=\",\"</code>) ومكانها المخطط، وأي صيغتي التاريخ هي الصحيحة حديث مع من ينتج التصدير. وحجة السرعة معكوسة: القراءة نصًّا أبطأ وأثقل، وثمنها يستحق الدفع حيث يهمّ التقرير."
        }
      },

      /* ---------------------------------------------------------- 22 */
      {
        "id": "t1l6q22",
        "type": "ordercode",
        "level": "medium",
        "topics": [
          "t1-loader-thread",
          "t1-loader-versions",
          "t1-blank-vs-failed"
        ],
        "q": {
          "en": "Put the statements of a miniature loader for the rent column of the update file in an order that runs and that counts blank cells and parse failures separately.",
          "ar": "رتّب أسطر محمِّل مصغّر لعمود الإيجار في ملف التحديث بترتيب يعمل ويعدّ الخلايا الفارغة وإخفاقات التحويل كلًّا على حدة."
        },
        "items": [
          {
            "code": "raw = pd.read_csv(\"rental_listings_update.csv\", dtype=str, keep_default_na=False)"
          },
          {
            "code": "blank = raw[\"monthly_rent\"].str.strip().eq(\"\")"
          },
          {
            "code": "rent = pd.to_numeric(raw[\"monthly_rent\"].mask(blank), errors=\"coerce\")"
          },
          {
            "code": "failed = rent.isna() & ~blank"
          },
          {
            "code": "report = {\"blank\": int(blank.sum()), \"failed\": int(failed.sum())}"
          },
          {
            "code": "decision = \"STOP\" if report[\"failed\"] else \"GO\""
          },
          {
            "code": "print(report, decision)"
          }
        ],
        "answer": [
          0,
          1,
          2,
          3,
          4,
          5,
          6
        ],
        "hint": {
          "en": "Each statement uses a name that an earlier statement created. Start from what must exist before anything can be counted, and remember that a blank must be identified before the conversion hides it.",
          "ar": "كل سطر يستعمل اسمًا أنشأه سطر سابق. ابدأ بما يجب أن يوجد قبل أن يمكن عدّ أي شيء، وتذكّر أن الفراغ يجب أن يُحدَّد قبل أن يخفيه التحويل."
        },
        "explain": {
          "en": "The file is read as text first (<code>dtype=str</code>, <code>keep_default_na=False</code>), so that nothing is decided before it can be counted: an empty cell stays <code>\"\"</code> and “1,150” stays text. The blanks are found <em>before</em> the conversion, because afterwards a blank and a failure are both just NaN; the conversion then masks them so they are not mistaken for text. A failure is a cell that is missing after and was not blank before (<code>rent.isna() &amp; ~blank</code>), the report counts both kinds, and the decision follows from the failures. It prints <code>{'blank': 2, 'failed': 1} STOP</code>: two true blanks, and the one failure is “1,150”. Counting blanks after the conversion, or counting <code>rent.isna()</code> as the failures, would say 3.",
          "ar": "يُقرأ الملف نصًّا أولًا (<code>dtype=str</code> و<code>keep_default_na=False</code>) حتى لا يُقرَّر شيء قبل أن يمكن عدّه: تبقى الخلية الفارغة <code>\"\"</code> وتبقى «1,150» نصًّا. وتُحدَّد الفراغات <em>قبل</em> التحويل لأنها بعده تصير كالإخفاقات مجرد NaN؛ ثم يخفيها التحويل بالقناع حتى لا تُحسب نصًّا. والإخفاق خلية مفقودة بعد وكانت غير فارغة قبل (<code>rent.isna() &amp; ~blank</code>)، ويعدّ التقرير النوعين، ويأتي القرار من الإخفاقات. ويطبع <code>{'blank': 2, 'failed': 1} STOP</code>: فراغان حقيقيان، والإخفاق الوحيد هو «1,150». وعدّ الفراغات بعد التحويل، أو عدّ <code>rent.isna()</code> إخفاقات، كان سيقول 3."
        }
      },

      /* ---------------------------------------------------------- 23 */
      {
        "id": "t1l6q23",
        "type": "trace",
        "level": "medium",
        "topics": [
          "t1-blank-vs-failed"
        ],
        "q": {
          "en": "After the last line has run, what are the values of the three variables?",
          "ar": "بعد تنفيذ السطر الأخير، ما قيم المتغيرات الثلاثة؟"
        },
        "code": "import pandas as pd\n\ntext = pd.Series([\"415\", \"\", \"1,150\", \"TBD\", \"380\"])\nblank = text.str.strip().eq(\"\")\nnumber = pd.to_numeric(text.mask(blank), errors=\"coerce\")\nn_missing = int(number.isna().sum())\nn_blank = int(blank.sum())\nn_failed = int((number.isna() & ~blank).sum())",
        "blanks": [
          {
            "accept": [
              "3"
            ],
            "label": {
              "en": "n_missing",
              "ar": "n_missing"
            }
          },
          {
            "accept": [
              "1"
            ],
            "label": {
              "en": "n_blank",
              "ar": "n_blank"
            }
          },
          {
            "accept": [
              "2"
            ],
            "label": {
              "en": "n_failed",
              "ar": "n_failed"
            }
          }
        ],
        "hint": {
          "en": "After <code>to_numeric(..., errors=\"coerce\")</code>, which cells are NaN? Then split them by asking which were blank before the conversion.",
          "ar": "بعد <code>to_numeric(..., errors=\"coerce\")</code> أي الخلايا NaN؟ ثم افصلها بسؤال: أيها كانت فارغة قبل التحويل؟"
        },
        "explain": {
          "en": "Three cells end up missing: the empty string, “1,150” (the comma makes it unreadable for <code>to_numeric</code>) and “TBD”, so <code>n_missing</code> is 3. Only one of them was blank before the conversion, so <code>n_blank</code> is 1, and the other two, the cells that were filled in and could not be parsed, are the failures: <code>n_failed</code> is 2. Reporting only the missing count would hide two failures inside a missing rate that looks legitimate; that is exactly how Version 2 of the loader let “1,150” through (3 of 61 is 4.9%, under the 5% tolerance). The difference between “missing after” and “blank before” is the number of failures, and it is what <code>load_listings</code> reports per column, with an example.",
          "ar": "تنتهي ثلاث خلايا مفقودة: السلسلة الفارغة و«1,150» (الفاصلة تجعلها غير مقروءة لـ<code>to_numeric</code>) و«TBD»، فـ<code>n_missing</code> يساوي 3. وواحدة منها فقط كانت فارغة قبل التحويل، فـ<code>n_blank</code> يساوي 1، والاثنتان الأخريان، أي الخلايا التي كانت معبّأة وتعذّر تحويلها، هما الإخفاقان: <code>n_failed</code> يساوي 2. والاكتفاء بعدّ المفقود يُخفي إخفاقين داخل نسبة نقص تبدو مشروعة؛ وهكذا بالضبط مرّرت النسخة 2 من المحمِّل «1,150» (3 من 61 هي 4.9% أي تحت تسامح 5%). والفرق بين «مفقود بعد» و«فارغ قبل» هو عدد الإخفاقات، وهو ما تبلّغ عنه <code>load_listings</code> لكل عمود مع مثال."
        }
      },

      /* ---------------------------------------------------------- 24 */
      {
        "id": "t1l6q24",
        "type": "mcq",
        "level": "easy",
        "topics": [
          "t1-api-validation"
        ],
        "q": {
          "en": "Lesson 5's <code>fetch_all()</code> already checks the status codes, follows the pages, backs off when it is rate-limited, and compares the number of rows and the ids with the server's total. This lesson also runs the flattened table through <code>validate()</code> with a schema of its own. Which problem would only this extra step catch?",
          "ar": "تفحص <code>fetch_all()</code> من الدرس 5 رموز الحالة، وتتبع الصفحات، وتتباطأ عند تحديد المعدّل، وتقارن عدد الصفوف والمعرّفات بمجموع الخادم. ويمرّر هذا الدرس الجدول المسطَّح أيضًا عبر <code>validate()</code> بمخطط خاص به. أي مشكلة لا يلتقطها إلا هذا الإجراء الإضافي؟"
        },
        "options": [
          {
            "en": "Page 2 delivered twice, which makes the table longer than the server's total and repeats five ids.",
            "ar": "الصفحة 2 سُلّمت مرتين، فصار الجدول أطول من مجموع الخادم وتكرر فيه خمسة معرّفات."
          },
          {
            "en": "A reply with status 500 on page 3, in the middle of an otherwise normal download.",
            "ar": "ردّ بالحالة 500 على الصفحة 3، في منتصف تنزيل عادي لولا ذلك."
          },
          {
            "en": "A rate-limit reply (429) in the middle of the download, after pages 1 and 2 arrived normally.",
            "ar": "ردّ تحديد معدّل (429) في منتصف التنزيل، بعد أن وصلت الصفحتان 1 و2 عاديتين."
          },
          {
            "en": "A school with <code>enrolment_boys</code> of -5 in an otherwise well-formed reply.",
            "ar": "مدرسة فيها <code>enrolment_boys</code> بقيمة -5 في ردّ سليم الشكل لولا ذلك."
          }
        ],
        "answer": 3,
        "hint": {
          "en": "Sort the four problems by what they damage: the transport, the shape of the reply, or the values inside the fields.",
          "ar": "افرز المشكلات الأربع بحسب ما تُتلفه: النقل، أم شكل الردّ، أم القيم داخل الحقول."
        },
        "explain": {
          "en": "<code>fetch_all()</code> guards the journey and the shape: status codes, pages, back-off, the count and the ids. It does not look at the fields, so a negative enrolment, an unknown governorate or a phone column that is suddenly mostly empty flows into the table. A schema of its own (<code>\"min\": 0</code>, <code>\"allowed\"</code>, <code>\"max_missing\"</code>) makes the same <code>validate()</code> read the values: it reports “enrolment_boys: 1 value(s) below 0”. The doubled page is real and <code>validate()</code> catches it too (a repeated id, 5 duplicated rows), but the count and id checks of Lesson 5 already stopped it, so it is not what the extra step is for. One detail: <code>duplicated()</code> cannot hash a list, so the <code>facilities</code> list is joined into text first. And since every run asks the server again, the pages are saved with the date as a snapshot; when a snapshot is too old is the timeliness question again.",
          "ar": "تحرس <code>fetch_all()</code> الرحلة والشكل: رموز الحالة والصفحات والتباطؤ والعدد والمعرّفات. ولا تنظر إلى الحقول، فيتدفق إلى الجدول عدد طلبة سالب أو محافظة مجهولة أو عمود هواتف صار فجأة فارغًا في معظمه. ومخطط خاص (<code>\"min\": 0</code> و<code>\"allowed\"</code> و<code>\"max_missing\"</code>) يجعل <code>validate()</code> نفسها تقرأ القيم: فتبلّغ «enrolment_boys: 1 value(s) below 0». والصفحة المضاعفة حقيقية وتلتقطها <code>validate()</code> أيضًا (معرّف مكرّر و5 صفوف مكرّرة)، لكن فحصي العدد والمعرّفات من الدرس 5 أوقفاها أصلًا، فليست هي ما وُجد الإجراء الإضافي من أجله. وتفصيل واحد: لا تستطيع <code>duplicated()</code> تجزئة قائمة، فتُضمّ قائمة <code>facilities</code> في نص أولًا. وبما أن كل تشغيل يسأل الخادم من جديد فتُحفظ الصفحات بتاريخها لقطةً؛ ومتى تصبح اللقطة قديمة جدًّا هو سؤال الحداثة من جديد."
        }
      }
  ]
};
