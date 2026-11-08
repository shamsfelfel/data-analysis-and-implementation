window.DABanks = window.DABanks || {};
(function () {
  /* code(line, line, ...) -> one string with \n between lines */
  function code() { return Array.prototype.join.call(arguments, "\n"); }

  window.DABanks["p1-exam-b"] = {
    title: {
      en: "Chapter Test B — Applied",
      ar: "اختبار الفصل ب — التطبيق"
    },
    intro: {
      en: "24 applied questions on the whole of Practical Chapter 1. Your hands are on the keyboard: you read code, trace it, fix it, complete it, write it, and judge which version of a solution is better — in pandas, in Excel formulas, in Power Query's M and in DAX, all on the chapter's own data (<code>cafeteria_orders.csv</code>, 771 lines, September 2026). Several questions chain two lessons, for example cleaning in a notebook and then auditing the same rules in a recorded Power Query recipe. Every Python output was produced by running the program (Python 3.13, pandas 2.2, NumPy 2.2); the Excel and Power BI figures were computed with pandas on the same file, exactly as Lesson 6's appendix does. Plan for about 60 minutes. Every question has a hint, an answer and an explanation, hidden until you ask for them: try first, then open them. A revealed answer is not counted.",
      ar: "24 سؤالًا تطبيقيًّا على الفصل العملي الأول كله. يداك على لوحة المفاتيح هنا: تقرأ الكود وتتتبّعه وتصلحه وتكمله وتكتبه، وتحكم أيّ نسخة من الحل أفضل — في pandas وفي صيغ Excel وفي شيفرة M في Power Query وفي DAX، وكله على بيانات الفصل نفسها (<code>cafeteria_orders.csv</code>، 771 سطرًا، أيلول 2026). وتربط أسئلة عدّة بين درسين، مثل التنظيف في دفتر ثم تدقيق القواعد نفسها في وصفة Power Query المسجَّلة. كل ناتج بايثون مأخوذ من تشغيل البرنامج فعلًا (بايثون 3.13 وpandas 2.2 وNumPy 2.2)، وأرقام Excel وPower BI محسوبة بـpandas على الملف نفسه، كما يفعل ملحق الدرس 6 بالضبط. خصّص نحو 60 دقيقة. لكل سؤال تلميح وجواب وشرح، وكلها مخفية حتى تطلبها: جرّب أولًا ثم افتحها. والجواب الذي يُظهَر لا يُحتسب."
    },
    questions: [
      {
        id: "p1bx01",
        type: "output",
        level: "easy",
        lang: "python",
        topics: [
          "p1-raw-vs-parsed",
          "p1-first-look"
        ],
        q: {
          en: "Lesson 1 looks at the raw file twice: once letting pandas guess, once as pure text. Write exactly what the program prints (four lines).",
          ar: "ينظر الدرس 1 إلى الملف الخام مرتين: مرة يَدَع pandas تخمّن، ومرة نصًّا خالصًا. اكتب بالضبط ما يطبعه البرنامج (أربعة أسطر)."
        },
        code: code(
          "import pandas as pd",
          "",
          "txt = pd.read_csv(\"cafeteria_orders.csv\", dtype=str, keep_default_na=False)",
          "num = pd.read_csv(\"cafeteria_orders.csv\")",
          "print(txt.shape, num.shape)",
          "print(txt[\"unit_price\"].dtype, num[\"unit_price\"].dtype)",
          "print((txt[\"unit_price\"] == \"n/a\").sum(), num[\"unit_price\"].isna().sum())",
          "print((txt[\"payment\"] == \"\").sum(), num[\"payment\"].isna().sum())"
        ),
        blanks: [
          {
            accept: [
              code(
                "(771, 8) (771, 8)",
                "object float64",
                "1 1",
                "17 17"
              )
            ],
            lines: 4
          }
        ],
        hint: {
          en: "Which strings does <code>read_csv</code> treat as missing before you ask it to? And what exactly do <code>dtype=str</code> and <code>keep_default_na=False</code> switch off?",
          ar: "أيّ السلاسل تعدّها <code>read_csv</code> مفقودة قبل أن تطلب ذلك؟ وما الذي يعطّله بالضبط <code>dtype=str</code> و<code>keep_default_na=False</code>؟"
        },
        explain: {
          en: "Both reads see the same grid of 771 lines and 8 columns — the options change what the cells <em>become</em>, not how many there are. With the defaults, the text <code>n/a</code> is on pandas' list of missing-value strings, so <code>unit_price</code> arrives as <code>float64</code> with one NaN, and the 17 empty <code>payment</code> cells become NaN too. Read as text with <code>keep_default_na=False</code> and both markers stay visible as themselves (<code>object</code> dtype), so you can count them <em>before</em> deciding what they mean. The counts agree, 1 and 17; what the text read buys you is the ability to tell &ldquo;no price was recorded&rdquo; from &ldquo;the price is not a number&rdquo; (Lesson 1, Version 3 of the first look).",
          ar: "ترى القراءتان الشبكة نفسها: 771 سطرًا و8 أعمدة &mdash; فالخيارات تغيّر ما <em>تصير</em> إليه الخلايا لا عددها. فمع الافتراضات تكون السلسلة <code>n/a</code> في قائمة pandas لسلاسل القيم المفقودة، فيصل <code>unit_price</code> من نوع <code>float64</code> وفيه NaN واحدة، وتصير خلايا <code>payment</code> الفارغة السبعة عشرة NaN أيضًا. أما القراءة نصًّا مع <code>keep_default_na=False</code> فتُبقي العلامتين ظاهرتين كما هما (النوع <code>object</code>)، فتستطيع عدّهما <em>قبل</em> أن تقرر ما تعنيان. والعددان متفقان: 1 و17؛ وما تكسبه القراءة النصية هو القدرة على التمييز بين «لم يُسجَّل سعر» و«السعر ليس عددًا» (الدرس 1، النسخة 3 من النظرة الأولى)."
        }
      },
      {
        id: "p1bx02",
        type: "error",
        level: "easy",
        lang: "python",
        topics: [
          "p1-skipped-stages",
          "p1-nb-dirty-rows",
          "p1-lines-in-out"
        ],
        q: {
          en: "The three cleaning rules should leave 748 lines and a revenue of 8062.0. The program prints <code>764 8237.0</code> and raises nothing. Click the line responsible.",
          ar: "يُفترض أن تُبقي قواعد التنظيف الثلاث 748 سطرًا وإيرادًا 8062.0. لكن البرنامج يطبع <code>764 8237.0</code> ولا يرفع شيئًا. انقر السطر المسؤول."
        },
        code: code(
          "import pandas as pd",
          "",
          "orders = pd.read_csv(\"cafeteria_orders.csv\")",
          "orders.drop_duplicates()                       # R1: drop the exact repeats",
          "orders = orders[orders[\"qty\"] > 0]             # R2: drop the refunds",
          "orders = orders[orders[\"unit_price\"] <= 50]    # R3: drop the typo and the missing price",
          "print(len(orders), round((orders[\"qty\"] * orders[\"unit_price\"]).sum(), 2))"
        ),
        answer: 4,
        solution: {
          code: "orders = orders.drop_duplicates()              # R1: drop the exact repeats",
          en: "<code>drop_duplicates()</code> returns a new table; it changes nothing in place unless you assign the result back.",
          ar: "تعيد <code>drop_duplicates()</code> جدولًا جديدًا؛ ولا تغيّر شيئًا في مكانه إلا إذا أسندت الناتج إليها."
        },
        hint: {
          en: "The two lines below it do the same job in a different shape. Compare them with line 4 word by word: what happens to what each one produces?",
          ar: "السطران تحته يقومان بالعمل نفسه بصيغة مختلفة. قارنهما بالسطر 4 كلمة كلمة: ما الذي يحدث لما ينتجه كل منهما؟"
        },
        explain: {
          en: "pandas methods return a new object instead of changing yours, so line 4 builds the de-duplicated table and throws it away; the next two lines keep their results, which is why only R1 went missing. 764 is 771 &minus; 5 refunds &minus; 2 bad prices, and the 16 repeated lines carry exactly 175.00: 8237.00 &minus; 175.00 = 8062.00. Nothing is raised because the statement is perfectly legal, and that is the whole danger &mdash; the only sign is the line count, which is why <code>clean()</code> returns a removal log and the golden answer checks <code>lines</code> as well as the money (Lesson 6).",
          ar: "تعيد دوال pandas كائنًا جديدًا بدلًا من تغيير كائنك، فيبني السطر 4 الجدول منزوع التكرار ثم يرميه؛ أما السطران التاليان فيحفظان ناتجهما، ولذلك غابت R1 وحدها. والعدد 764 هو 771 &minus; 5 مرتجعات &minus; 2 أسعار رديئة، والأسطر الستة عشر المكررة تحمل 175.00 بالضبط: 8237.00 &minus; 175.00 = 8062.00. ولا يُرفع شيء لأن العبارة مشروعة تمامًا، وهذا هو الخطر كله &mdash; فالدليل الوحيد هو عدد الأسطر، ولهذا تُعيد <code>clean()</code> سجلّ الإزالة وتفحص الإجابة المرجعية <code>lines</code> كما تفحص المال (الدرس 6)."
        }
      },
      {
        id: "p1bx03",
        type: "compare",
        level: "medium",
        lang: "python",
        topics: [
          "p1-nb-hidden-state",
          "p1-nb-run-all"
        ],
        q: {
          en: "Both notebooks answer &ldquo;what would a 10% staff discount cost us?&rdquo; on the same loaded <code>orders</code> table (<code>line_total</code> already exists, <code>STAFF_OFF = 0.10</code>). You press Shift+Enter on the discount cell, then on the total cell, three times over. Which statement is correct?",
          ar: "يجيب الدفتران عن سؤال «كم يكلّفنا خصم 10% للعاملين؟» على جدول <code>orders</code> المحمَّل نفسه (العمود <code>line_total</code> موجود، و<code>STAFF_OFF = 0.10</code>). تضغط Shift+Enter على خلية الخصم ثم على خلية المجموع، ثلاث مرات. أيّ العبارات صحيحة؟"
        },
        codeA: code(
          "# %% cell 3  (the discount)",
          "orders.loc[orders[\"customer_type\"] == \"Staff\", \"line_total\"] *= 1 - STAFF_OFF",
          "",
          "# %% cell 4  (the total)",
          "print(round(orders[\"line_total\"].sum(), 4))"
        ),
        codeB: code(
          "# %% cell 3  (the discount)",
          "is_staff = orders[\"customer_type\"] == \"Staff\"",
          "orders[\"whatif_total\"] = orders[\"line_total\"] * (1 - STAFF_OFF * is_staff)",
          "",
          "# %% cell 4  (the total)",
          "print(round(orders[\"whatif_total\"].sum(), 4))"
        ),
        options: [
          {
            en: "They are equivalent: both apply the discount to the staff lines only, and the two cells print the same number every time, because a notebook cell always starts from the saved outputs on the page.",
            ar: "هما متكافئتان: كلتاهما تطبّق الخصم على أسطر العاملين فقط، وتطبع الخليتان الرقم نفسه في كل مرة، لأن خلية الدفتر تبدأ دائمًا من النواتج المحفوظة على الصفحة."
          },
          {
            en: "A is better: it writes into the existing <code>line_total</code> instead of adding a column, so the table stays small and every later cell automatically sees the discounted figure.",
            ar: "أ أفضل: تكتب في <code>line_total</code> الموجود بدلًا من إضافة عمود، فيبقى الجدول صغيرًا وترى كل خلية لاحقة الرقم المخفَّض تلقائيًّا."
          },
          {
            en: "B is better: A's <code>*=</code> overwrites its own input, so the printed total depends on how many times you pressed Shift+Enter &mdash; 8156.95, then 7997.605, then 7854.1945. B computes a new column from <code>line_total</code>, which it never changes, so it prints 8156.95 however often it is re-run and Restart &amp; Run All gives the same number as your session.",
            ar: "ب أفضل: إذ تكتب <code>*=</code> في أ فوق مدخلها هو، فيتوقف المجموع المطبوع على عدد مرات ضغطك Shift+Enter &mdash; 8156.95 ثم 7997.605 ثم 7854.1945. أما ب فتحسب عمودًا جديدًا من <code>line_total</code> الذي لا تغيّره أبدًا، فتطبع 8156.95 كم أُعيد تشغيلها، ويعطي Restart &amp; Run All الرقم نفسه الذي رأيته في جلستك."
          },
          {
            en: "B is better, but only because <code>is_staff</code> has a name: A would be just as safe if the mask were stored in a variable before the <code>*=</code> line.",
            ar: "ب أفضل، لكن فقط لأن <code>is_staff</code> له اسم: وكانت أ ستكون آمنة مثلها لو خُزِّن القناع في متغير قبل سطر <code>*=</code>."
          }
        ],
        answer: 2,
        hint: {
          en: "Ask of each cell: if I run it twice, does it do its job twice? Which of the two reads a column that it also writes?",
          ar: "اسأل عن كل خلية: إن شغّلتها مرتين، هل تؤدي عملها مرتين؟ وأيّهما تقرأ عمودًا تكتب فيه أيضًا؟"
        },
        explain: {
          en: "A's cell is not safe to re-run: <code>*=</code> multiplies the column by 0.9 again each time, so the staff lines are discounted twice, then three times, and the total slides from 8156.95 to 7997.605 to 7854.1945 with no error and no warning. B's cell is a function of <code>line_total</code> alone, so running it again recomputes the same <code>whatif_total</code> &mdash; the number depends on the code, not on your clicking history (Lesson 3, Version 3 of the what-if notebook). The tempting option is the first: saved outputs on the page are a photograph, while the kernel is the room, and the kernel is what the next cell sees. Rule: a cell that writes a column it also reads turns your execution order into part of the answer.",
          ar: "خلية أ ليست آمنة لإعادة التشغيل: فـ<code>*=</code> تضرب العمود في 0.9 من جديد في كل مرة، فتُخصَم أسطر العاملين مرتين ثم ثلاثًا، وينزلق المجموع من 8156.95 إلى 7997.605 إلى 7854.1945 دون خطأ ولا تحذير. أما خلية ب فدالة في <code>line_total</code> وحده، فإعادة تشغيلها تعيد حساب <code>whatif_total</code> نفسه &mdash; فالرقم يتبع الكود لا تاريخ نقراتك (الدرس 3، النسخة 3 من دفتر «ماذا لو»). والخيار المغري هو الأول: النواتج المحفوظة على الصفحة صورة فوتوغرافية، والنواة هي الغرفة، والنواة هي ما تراه الخلية التالية. القاعدة: الخلية التي تكتب في عمود تقرؤه تجعل ترتيب تنفيذك جزءًا من الجواب."
        }
      },
      {
        id: "p1bx04",
        type: "trace",
        level: "medium",
        lang: "python",
        topics: [
          "p1-rule-order",
          "p1-rules-as-data"
        ],
        q: {
          en: "This <code>clean()</code> applies the same three rules as Lesson 6, but in the order R3, R2, R1. State what the two <code>print</code> lines show.",
          ar: "تطبّق هذه <code>clean()</code> القواعد الثلاث نفسها كما في الدرس 6، لكن بالترتيب R3 ثم R2 ثم R1. اذكر ما يظهره سطرا <code>print</code>."
        },
        code: code(
          "import pandas as pd",
          "",
          "raw = pd.read_csv(\"cafeteria_orders.csv\")",
          "",
          "def clean(df):",
          "    removed, n = {}, len(df)",
          "    price = pd.to_numeric(df[\"unit_price\"], errors=\"coerce\")      # R3",
          "    keep = price.notna() & (price <= 50)",
          "    df = df[keep].assign(unit_price=price[keep])",
          "    removed[\"R3\"], n = n - len(df), len(df)",
          "    df = df[df[\"qty\"] > 0]                                       # R2",
          "    removed[\"R2\"], n = n - len(df), len(df)",
          "    df = df.drop_duplicates()                                    # R1",
          "    removed[\"R1\"], n = n - len(df), len(df)",
          "    return df, removed",
          "",
          "df, removed = clean(raw)",
          "print(removed)",
          "print(len(df), round((df[\"qty\"] * df[\"unit_price\"]).sum(), 2))"
        ),
        blanks: [
          {
            accept: [
              "{'R3': 2, 'R2': 5, 'R1': 16}",
              "{\"R3\": 2, \"R2\": 5, \"R1\": 16}"
            ],
            label: {
              en: "print(removed)",
              ar: "print(removed)"
            },
            wide: true
          },
          {
            accept: [
              "748 8062.0"
            ],
            label: {
              en: "print(len(df), …)",
              ar: "print(len(df), …)"
            },
            wide: true
          }
        ],
        hint: {
          en: "Each rule removes the lines it is about, whoever went first. Are any of the 23 removed lines removable by two different rules?",
          ar: "تحذف كل قاعدة الأسطر التي تخصّها، أيًّا كانت التي سبقتها. وهل من الأسطر الثلاثة والعشرين المحذوفة ما تحذفه قاعدتان مختلفتان؟"
        },
        explain: {
          en: "Lesson 6 states it as a rule: the order of R1&ndash;R3 changes the <em>log</em>, not the answer. Here the log is keyed in the order the rules ran &mdash; <code>{'R3': 2, 'R2': 5, 'R1': 16}</code> &mdash; while the counts are the familiar 2, 5 and 16 and the table is the same 748 lines worth 8062.0. The reason is that the three rules describe disjoint sets of lines: no repeated line is also a refund, and no refund also has a bad price, so moving a rule earlier cannot let it claim a line another rule would have taken. Printing a dict shows the keys in insertion order, which is exactly why the log is worth reading: it tells you which rule took what, in the order you applied them.",
          ar: "يقولها الدرس 6 قاعدة: ترتيب R1 إلى R3 يغيّر <em>السجل</em> لا الإجابة. والسجل هنا مفاتيحه بترتيب تنفيذ القواعد &mdash; <code>{'R3': 2, 'R2': 5, 'R1': 16}</code> &mdash; أما الأعداد فهي 2 و5 و16 المعروفة، والجدول هو نفسه 748 سطرًا بقيمة 8062.0. والسبب أن القواعد الثلاث تصف مجموعات أسطر منفصلة: فلا سطر مكرر هو مرتجع أيضًا، ولا مرتجع سعره رديء أيضًا، فتقديم قاعدة لا يتيح لها أن تطالب بسطر كانت ستأخذه قاعدة أخرى. وطباعة القاموس تُظهر المفاتيح بترتيب الإدخال، وهذا بالضبط ما يجعل السجل جديرًا بالقراءة: فهو يخبرك أيّ قاعدة أخذت ماذا، بالترتيب الذي طبّقتها به."
        }
      },
      {
        id: "p1bx05",
        type: "output",
        level: "medium",
        lang: "python",
        topics: [
          "p1-hour-grain",
          "p1-xl-pivot-hours",
          "p1-nb-chart-hour"
        ],
        q: {
          en: "&ldquo;When are we busy?&rdquo; is counted four ways: lines and distinct orders, on the raw file and on the clean table. Write exactly what the program prints (four lines).",
          ar: "يُعدّ سؤال «متى نزدحم؟» بأربع طرق: بالأسطر وبالطلبات المميّزة، على الملف الخام وعلى الجدول المنظَّف. اكتب بالضبط ما يطبعه البرنامج (أربعة أسطر)."
        },
        code: code(
          "import pandas as pd",
          "",
          "raw = pd.read_csv(\"cafeteria_orders.csv\")",
          "df = raw.drop_duplicates()",
          "df = df[df[\"qty\"] > 0]",
          "df = df[df[\"unit_price\"].notna() & (df[\"unit_price\"] <= 50)]",
          "for name, t in [(\"raw\", raw), (\"clean\", df)]:",
          "    h = pd.to_datetime(t[\"order_time\"]).dt.hour",
          "    lines, orders = t.groupby(h).size(), t.groupby(h)[\"order_id\"].nunique()",
          "    print(name, \"by lines:\", lines.idxmax(), lines.max())",
          "    print(name, \"by orders:\", orders.idxmax(), orders.max())"
        ),
        blanks: [
          {
            accept: [
              code(
                "raw by lines: 13 155",
                "raw by orders: 12 119",
                "clean by lines: 13 148",
                "clean by orders: 12 119"
              )
            ],
            lines: 4
          }
        ],
        hint: {
          en: "One row of this file is an order <em>line</em>, not an order. Which of the two measures can a three-line order push around, and which cannot?",
          ar: "صفّ هذا الملف <em>سطر</em> طلب لا طلب. وأيّ المقياسين يستطيع طلب من ثلاثة أسطر أن يزحزحه، وأيّهما لا يستطيع؟"
        },
        explain: {
          en: "The grain decides the answer. Counting lines, 13:00 wins (155 raw, 148 clean), because the lunch hour holds the orders with the most lines; counting distinct <code>order_id</code>, 12:00 wins with 119 both before and after cleaning. So the honest sentence is &ldquo;12:00 has the most orders, 13:00 the most lines&rdquo;, and the decision the card named &mdash; when a second till should open &mdash; is about people at the till, which is orders. Note also how little cleaning moves the hour columns (155 to 148, 119 to 119): the busiest hour is robust here, while the revenue is not &mdash; a number can be fragile in one measure and solid in another.",
          ar: "الحبيبة هي التي تحدّد الجواب. فبعدّ الأسطر يفوز 13:00 (155 خامًا و148 منظَّفًا) لأن ساعة الغداء تحمل الطلبات الأكثر أسطرًا؛ وبعدّ <code>order_id</code> المميّزة يفوز 12:00 بـ119 قبل التنظيف وبعده. فالجملة الأمينة هي «12:00 أكثر الساعات طلبات و13:00 أكثرها أسطرًا»، والقرار الذي سمّته البطاقة &mdash; متى يُفتح صندوق ثانٍ &mdash; يتعلق بأشخاص عند الصندوق، أي بالطلبات. ولاحظ أيضًا كم قليلًا يزحزح التنظيف أعمدة الساعات (155 إلى 148 و119 إلى 119): فأكثر ساعة ازدحامًا متينة هنا والإيراد ليس كذلك &mdash; فقد يكون الرقم هشًّا في مقياس وصلبًا في آخر."
        }
      },
      {
        id: "p1bx06",
        type: "write",
        level: "medium",
        lang: "python",
        topics: [
          "p1-nb-chart-hour",
          "p1-three-counts",
          "p1-nb-module-main"
        ],
        q: {
          en: "The 748 counted lines are already in <code>df</code>. Add the code that answers the second half of the question card &mdash; the hour of the day with the most <strong>distinct orders</strong> &mdash; and prints the hour and the count, so that the program ends with <code>12 119</code>. Do not count order lines.",
          ar: "الأسطر المعدودة الـ748 موجودة في <code>df</code>. أضف الكود الذي يجيب عن النصف الثاني من بطاقة السؤال &mdash; ساعة اليوم ذات أكثر <strong>الطلبات المميّزة</strong> &mdash; ويطبع الساعة والعدد، فينتهي البرنامج بـ<code>12 119</code>. ولا تعدّ أسطر الطلبات."
        },
        starter: code(
          "import pandas as pd",
          "",
          "raw = pd.read_csv(\"cafeteria_orders.csv\")",
          "df = raw.drop_duplicates()",
          "df = df[df[\"qty\"] > 0]",
          "df = df[df[\"unit_price\"].notna() & (df[\"unit_price\"] <= 50)]   # the 748 counted lines",
          "",
          "# your code here"
        ),
        lines: 8,
        checks: [
          {
            re: "to_datetime\\s*\\(",
            label: {
              en: "Turn <code>order_time</code> into a datetime with <code>pd.to_datetime(...)</code> &mdash; it arrives as text",
              ar: "حوّل <code>order_time</code> إلى تاريخ ووقت بـ<code>pd.to_datetime(...)</code> &mdash; فهو يصل نصًّا"
            }
          },
          {
            re: "\\.dt\\.hour",
            label: {
              en: "Take the hour of the day with <code>.dt.hour</code>",
              ar: "خُذ ساعة اليوم بـ<code>.dt.hour</code>"
            }
          },
          {
            re: "groupby\\s*\\(",
            label: {
              en: "Group by that hour",
              ar: "جمّع بحسب تلك الساعة"
            }
          },
          {
            re: "nunique\\s*\\(",
            label: {
              en: "Count <em>distinct</em> <code>order_id</code> values with <code>nunique()</code>",
              ar: "عُدّ قيم <code>order_id</code> <em>المميّزة</em> بـ<code>nunique()</code>"
            }
          },
          {
            re: "idxmax\\s*\\(",
            label: {
              en: "Report which hour is the largest, with <code>idxmax()</code>",
              ar: "اذكر أيّ ساعة هي الأكبر، بـ<code>idxmax()</code>"
            }
          }
        ],
        forbid: [
          {
            re: "\\.size\\s*\\(|\\.count\\s*\\(|value_counts\\s*\\(",
            label: {
              en: "Counting <em>lines</em> per hour (<code>size()</code>, <code>count()</code>, <code>value_counts()</code>) &mdash; that answers 13:00",
              ar: "عدّ <em>الأسطر</em> في كل ساعة (<code>size()</code> أو <code>count()</code> أو <code>value_counts()</code>) &mdash; فهذا يجيب 13:00"
            }
          }
        ],
        solution: {
          code: code(
            "hours = pd.to_datetime(df[\"order_time\"]).dt.hour",
            "per_hour = df.groupby(hours)[\"order_id\"].nunique()",
            "print(int(per_hour.idxmax()), int(per_hour.max()))"
          ),
          out: "12 119",
          en: "<code>order_time</code> is text in the file, so it is parsed first; <code>.dt.hour</code> gives the hour of the day; grouping by it and taking <code>nunique()</code> of <code>order_id</code> counts orders, not lines; <code>idxmax()</code> names the winning hour and <code>max()</code> its count.",
          ar: "العمود <code>order_time</code> نص في الملف فيُحلَّل أولًا؛ و<code>.dt.hour</code> تعطي ساعة اليوم؛ والتجميع بها مع <code>nunique()</code> على <code>order_id</code> يعدّ الطلبات لا الأسطر؛ و<code>idxmax()</code> تسمّي الساعة الفائزة و<code>max()</code> عددها."
        },
        hint: {
          en: "Two steps before you can group: the time is text, and you want the hour only. Then ask yourself which aggregation counts <em>orders</em> rather than rows.",
          ar: "خطوتان قبل أن تستطيع التجميع: الوقت نص، وأنت تريد الساعة وحدها. ثم اسأل نفسك أيّ تجميع يعدّ <em>الطلبات</em> لا الصفوف."
        },
        explain: {
          en: "<code>pd.to_datetime</code> is needed because <code>order_time</code> is loaded as <code>object</code>; without it <code>.dt</code> raises. The one decision that matters is the aggregation: <code>size()</code> and <code>count()</code> count order <em>lines</em> and make 13:00 look busiest (148 lines), while <code>nunique()</code> on <code>order_id</code> counts the visits to the till and gives 12:00 with 119 &mdash; one order with three lines is one person waiting. Lesson 3 wrote exactly this in three lines, and Lesson 4's PivotTable needed a whole helper column to do the same job in Excel.",
          ar: "نحتاج <code>pd.to_datetime</code> لأن <code>order_time</code> يُحمَّل من نوع <code>object</code>؛ ومن دونه ترفع <code>.dt</code> خطأً. والقرار الوحيد المهم هو التجميع: فـ<code>size()</code> و<code>count()</code> تعدّان <em>أسطر</em> الطلبات فتُظهران 13:00 الأكثر ازدحامًا (148 سطرًا)، أما <code>nunique()</code> على <code>order_id</code> فتعدّ الزيارات إلى الصندوق فتعطي 12:00 بـ119 &mdash; فالطلب ذو الأسطر الثلاثة شخص واحد ينتظر. وقد كتب الدرس 3 هذا بالضبط في ثلاثة أسطر، واحتاج الجدول المحوري في الدرس 4 إلى عمود مساعد كامل ليؤدي العمل نفسه في Excel."
        }
      },
      {
        id: "p1bx07",
        type: "ordercode",
        level: "medium",
        lang: "python",
        topics: [
          "p1-rules-as-data",
          "p1-lines-in-out"
        ],
        q: {
          en: "Put the body of <code>clean()</code> in an order that both cleans the table and produces the correct removal log <code>{'R1': 16, 'R2': 5, 'R3': 2}</code>. Two dependencies decide it: a count must be taken before the table it describes is replaced, and a mask must be built from the table it will filter.",
          ar: "رتّب متن <code>clean()</code> ترتيبًا ينظّف الجدول ويُنتج سجلّ الإزالة الصحيح <code>{'R1': 16, 'R2': 5, 'R3': 2}</code>. ويحدّده اعتمادان: يجب أخذ العدّ قبل استبدال الجدول الذي يصفه، ويجب بناء القناع من الجدول الذي سيرشّحه."
        },
        items: [
          {
            code: "removed, n = {}, len(df)"
          },
          {
            code: "df = df.drop_duplicates()                        # R1"
          },
          {
            code: "removed[\"R1\"], n = n - len(df), len(df)"
          },
          {
            code: "df = df[df[\"qty\"] > 0]                           # R2"
          },
          {
            code: "removed[\"R2\"], n = n - len(df), len(df)"
          },
          {
            code: "price = pd.to_numeric(df[\"unit_price\"], errors=\"coerce\")   # R3"
          },
          {
            code: "keep = price.notna() & (price <= 50)"
          },
          {
            code: "df = df[keep].assign(unit_price=price[keep])"
          }
        ],
        answer: [0, 1, 2, 3, 4, 5, 6, 7],
        hint: {
          en: "Walk the variables: when is <code>n</code> still the old count, and whose index does <code>keep</code> have to match?",
          ar: "تابع المتغيرات: متى يكون <code>n</code> ما يزال العدّ القديم، وبفهرس من يجب أن يتطابق <code>keep</code>؟"
        },
        explain: {
          en: "<code>n</code> is the number of lines <em>before</em> the next rule, so each <code>removed[...]</code> line must sit immediately after its own filter and before the next one; move one of them and the log blames the wrong rule. <code>price</code> must be computed from the table R2 left behind, because a boolean <code>keep</code> built on a different index cannot index <code>df</code> at all (pandas refuses an unalignable boolean Series), and <code>price[keep]</code> must line up with the rows that survive. The first line has to come first: it opens the log and takes the 771. This is Lesson 6's Version 3: the function returns the answer <em>and</em> the log, which is what lets another tool be audited against it.",
          ar: "المتغير <code>n</code> هو عدد الأسطر <em>قبل</em> القاعدة التالية، فيجب أن يأتي كل سطر <code>removed[...]</code> بعد مرشِّحه مباشرة وقبل الذي يليه؛ وإن نقلت أحدها نسب السجل الحذف إلى القاعدة الخطأ. ويجب حساب <code>price</code> من الجدول الذي تركته R2، لأن <code>keep</code> المنطقي المبني على فهرس مختلف لا يستطيع فهرسة <code>df</code> أصلًا (ترفض pandas سلسلة منطقية غير قابلة للمحاذاة)، ويجب أن تتوافق <code>price[keep]</code> مع الصفوف الباقية. والسطر الأول لا بد أن يكون أولًا: فهو يفتح السجل ويأخذ العدد 771. هذه هي النسخة 3 في الدرس 6: الدالة تعيد الإجابة <em>والسجل</em>، وهو ما يسمح بتدقيق أداة أخرى عليها."
        }
      },
      {
        id: "p1bx08",
        type: "error",
        level: "hard",
        lang: "python",
        topics: [
          "p1-golden-answer",
          "p1-failing-check",
          "p1-raw-vs-parsed"
        ],
        q: {
          en: "The program prints <code>{'lines': 749, 'revenue': 8062.0}</code>: the money passes the tolerance check exactly, and then the line count fails with <code>AssertionError: lines 749 != 748</code>. Click the line responsible for the extra line.",
          ar: "يطبع البرنامج <code>{'lines': 749, 'revenue': 8062.0}</code>: فيجتاز المال فحص التسامح بالضبط، ثم يفشل عدد الأسطر بالخطأ <code>AssertionError: lines 749 != 748</code>. انقر السطر المسؤول عن السطر الزائد."
        },
        code: code(
          "import math",
          "import pandas as pd",
          "",
          "GOLDEN = {\"lines\": 748, \"revenue\": 8062.00}",
          "",
          "df = pd.read_csv(\"cafeteria_orders.csv\").drop_duplicates()            # R1",
          "df = df[df[\"qty\"] > 0]                                                # R2",
          "price = pd.to_numeric(df[\"unit_price\"], errors=\"coerce\").fillna(0)    # R3",
          "keep = price <= 50",
          "df = df[keep].assign(unit_price=price[keep])",
          "res = {\"lines\": len(df), \"revenue\": round(float((df[\"qty\"] * df[\"unit_price\"]).sum()), 2)}",
          "print(res)",
          "assert math.isclose(res[\"revenue\"], GOLDEN[\"revenue\"], abs_tol=0.005), res[\"revenue\"]",
          "assert res[\"lines\"] == GOLDEN[\"lines\"], f\"lines {res['lines']} != {GOLDEN['lines']}\""
        ),
        answer: 8,
        solution: {
          code: code(
            "price = pd.to_numeric(df[\"unit_price\"], errors=\"coerce\")              # R3",
            "keep = price.notna() & (price <= 50)"
          ),
          en: "Leave the missing price missing and test for it explicitly: <code>notna()</code> removes the line that has no price instead of pricing it at zero.",
          ar: "اترك السعر المفقود مفقودًا واختبره صراحةً: فـ<code>notna()</code> تحذف السطر الذي لا سعر له بدلًا من أن تسعّره صفرًا."
        },
        hint: {
          en: "Which of the 23 lines that R1&ndash;R3 should remove is still in the table? And what does it contribute to the revenue?",
          ar: "أيّ الأسطر الثلاثة والعشرين التي يجب أن تحذفها R1 إلى R3 ما يزال في الجدول؟ وبماذا يساهم في الإيراد؟"
        },
        explain: {
          en: "<code>fillna(0)</code> turns the missing price of the <code>n/a</code> line into a real 0, so <code>price &lt;= 50</code> keeps it: 749 lines, one of them a Tea sold for nothing. The revenue is untouched because 1 &times; 0 = 0 &mdash; this is the failure mode the chapter keeps warning about, a wrong table whose headline number is right to the piastre. Only the count betrays it, which is why <code>check()</code> asserts <code>lines</code> <em>and</em> the money, and why R3 in Lesson 6 writes <code>price.notna() &amp; (price &lt;= max_price)</code>: a line whose revenue cannot be computed is dropped, never priced at zero. (<code>errors=\"coerce\"</code> is not the culprit: it is the safety net that makes any other text in the column visible as NaN.)",
          ar: "تحوّل <code>fillna(0)</code> السعر المفقود في سطر <code>n/a</code> إلى صفر حقيقي، فتُبقيه <code>price &lt;= 50</code>: 749 سطرًا، أحدها شاي بيع بلا مقابل. ولا يتغيّر الإيراد لأن 1 &times; 0 = 0 &mdash; وهذا هو نمط الفشل الذي يحذّر منه الفصل مرارًا: جدول خاطئ ورقمه الرئيسي صحيح إلى القرش. ولا يفضحه إلا العدّ، ولهذا تفحص <code>check()</code> عدد الأسطر <em>والمال</em>، ولهذا تكتب R3 في الدرس 6 <code>price.notna() &amp; (price &lt;= max_price)</code>: فالسطر الذي لا يمكن حساب إيراده يُحذَف ولا يُسعَّر صفرًا أبدًا. (ولا ذنب لـ<code>errors=\"coerce\"</code>: فهي شبكة الأمان التي تُظهر أي نص آخر في العمود NaN.)"
        }
      },
      {
        id: "p1bx09",
        type: "contrast",
        level: "medium",
        lang: "dax",
        topics: [
          "p1-measure-vs-column",
          "p1-dax-measures"
        ],
        q: {
          en: "Lesson 5 computes the same 8,062.00 two ways: a calculated column <code>line_total = Orders[qty] * Orders[unit_price]</code> dragged into a card, and the measure <code>Total Revenue = SUMX(Orders, Orders[qty] * Orders[unit_price])</code>. Place each statement under the calculated column, under the measure, or under both.",
          ar: "يحسب الدرس 5 المبلغ 8,062.00 نفسه بطريقتين: عمود محسوب <code>line_total = Orders[qty] * Orders[unit_price]</code> يُسحب إلى بطاقة، والمقياس <code>Total Revenue = SUMX(Orders, Orders[qty] * Orders[unit_price])</code>. ضع كل عبارة تحت العمود المحسوب أو تحت المقياس أو تحت كليهما."
        },
        concepts: [
          {
            en: "Calculated column <code>line_total</code>",
            ar: "العمود المحسوب <code>line_total</code>"
          },
          {
            en: "Measure <code>Total Revenue</code>",
            ar: "المقياس <code>Total Revenue</code>"
          }
        ],
        rows: [
          {
            s: {
              en: "Is computed once per row and stored in the model, so the file grows with the table",
              ar: "يُحسب مرة لكل صف ويُخزَّن في النموذج، فيكبر الملف بكبر الجدول"
            },
            a: 0
          },
          {
            s: {
              en: "Is computed when a visual asks, over the rows the filter context has left",
              ar: "يُحسب حين يطلب عنصر مرئي، على الصفوف التي تركها سياق المرشِّح"
            },
            a: 1
          },
          {
            s: {
              en: "Appears in the Fields pane and can be dragged straight onto a card",
              ar: "يظهر في جزء الحقول ويمكن سحبه إلى بطاقة مباشرة"
            },
            a: 2
          },
          {
            s: {
              en: "The card is headed &ldquo;Sum of &hellip;&rdquo;, and one click on the field's drop-down turns the 8,062.00 into the average 10.78",
              ar: "تُعنوَن البطاقة «Sum of &hellip;»، ونقرة واحدة على قائمة الحقل تحوّل 8,062.00 إلى المتوسط 10.78"
            },
            a: 0
          },
          {
            s: {
              en: "Needs no extra column in the table: the multiplication happens inside the formula, row by row, before the sum",
              ar: "لا يحتاج عمودًا زائدًا في الجدول: فالضرب يحدث داخل الصيغة، صفًّا صفًّا، قبل الجمع"
            },
            a: 1
          },
          {
            s: {
              en: "Shows 8,062.00 on an unfiltered card over the 748 clean lines",
              ar: "يُظهر 8,062.00 على بطاقة بلا مرشِّح على الأسطر المنظَّفة الـ748"
            },
            a: 2
          },
          {
            s: {
              en: "Version 3 of the lesson deletes it, because the other form made it unnecessary",
              ar: "تحذفه النسخة 3 في الدرس، لأن الصيغة الأخرى جعلته غير ضروري"
            },
            a: 0
          }
        ],
        hint: {
          en: "Ask of each one: when is the arithmetic done &mdash; while the data loads, or while the visual is drawn? And who decides how the number is aggregated?",
          ar: "اسأل عن كل منهما: متى يُجرى الحساب &mdash; أثناء تحميل البيانات أم أثناء رسم العنصر المرئي؟ ومن يقرر كيف يُجمَّع الرقم؟"
        },
        explain: {
          en: "A calculated column is part of the table: it is evaluated row by row at refresh, stored, and shown in the Data view, so a reader (or a stray click) can change <em>how</em> it is aggregated &mdash; the same field gives 8,062.00 as a Sum and 10.78 as an Average, and nothing in the report says which was meant. A measure carries its own aggregation: <code>SUMX</code> multiplies within each row and then sums, over whatever rows the filter context leaves, so the Falafel Sandwich bar gives 917.00 and the Staff slicer 1,716.50 from the one formula. Both appear in the Fields pane and both give 8,062.00 unfiltered, which is why the choice looks cosmetic; the difference shows the moment someone changes the summarisation or another measure needs to reuse the number (<code>Revenue per Order = DIVIDE([Total Revenue], [Orders Count])</code>).",
          ar: "العمود المحسوب جزء من الجدول: يُقيَّم صفًّا صفًّا عند التحديث ويُخزَّن ويظهر في عرض البيانات، فيستطيع قارئ (أو نقرة طائشة) أن يغيّر <em>كيفية</em> تجميعه &mdash; فالحقل نفسه يعطي 8,062.00 جمعًا و10.78 متوسطًا، ولا شيء في التقرير يقول أيّهما المقصود. أما المقياس فيحمل تجميعه معه: تضرب <code>SUMX</code> داخل كل صف ثم تجمع، على أي صفوف يتركها سياق المرشِّح، فيعطي عمود Falafel Sandwich 917.00 ويعطي مرشِّح Staff 1,716.50 من الصيغة الواحدة. وكلاهما يظهر في جزء الحقول وكلاهما يعطي 8,062.00 بلا ترشيح، ولهذا يبدو الاختيار شكليًّا؛ لكن الفرق يظهر لحظة تغيير أحدهم للتلخيص أو حين يحتاج مقياس آخر إلى إعادة استعمال الرقم (<code>Revenue per Order = DIVIDE([Total Revenue], [Orders Count])</code>)."
        }
      },
      {
        id: "p1bx10",
        type: "complete",
        level: "medium",
        lang: "excel",
        topics: [
          "p1-xl-helper-columns",
          "p1-xl-cell-types"
        ],
        q: {
          en: "In Excel, row 6 of <code>tblOrders</code> is the line whose <code>unit_price</code> reads the text <code>n/a</code>. Which <code>line_total</code> formula produces exactly the three results shown &mdash; a total that still counts every good line, 770 numbers, and an average over those 770?",
          ar: "في Excel، الصف 6 من <code>tblOrders</code> هو السطر الذي يقرأ فيه <code>unit_price</code> النص <code>n/a</code>. أيّ صيغة لـ<code>line_total</code> تُنتج النتائج الثلاث المعروضة بالضبط &mdash; مجموعًا يعدّ كل سطر سليم، و770 رقمًا، ومتوسطًا على تلك الـ770؟"
        },
        code: code(
          "line_total   ____",
          "",
          "=SUM(tblOrders[line_total])      ->  8334",
          "=COUNT(tblOrders[line_total])    ->  770",
          "=AVERAGE(tblOrders[line_total])  ->  10.8234"
        ),
        options: [
          {
            code: "=[@qty]*[@unit_price]"
          },
          {
            code: "=IFERROR([@qty]*[@unit_price],0)"
          },
          {
            code: "=IF(ISNUMBER([@unit_price]),[@qty]*[@unit_price],\"\")"
          },
          {
            code: "=IF([@unit_price]<>\"\",[@qty]*[@unit_price],\"\")"
          }
        ],
        answer: 2,
        solution: {
          code: "line_total   =IF(ISNUMBER([@unit_price]),[@qty]*[@unit_price],\"\")",
          en: "Test the one thing you actually need &mdash; that the price is a number &mdash; and leave the cell empty when it is not. <code>SUM</code> ignores the empty cell (8334), <code>COUNT</code> counts 770 numbers and <code>AVERAGE</code> divides by those 770 (10.8234).",
          ar: "اختبر الشيء الوحيد الذي تحتاجه فعلًا &mdash; أن السعر عدد &mdash; واترك الخلية فارغة إن لم يكن. فتتجاهل <code>SUM</code> الخلية الفارغة (8334)، وتعدّ <code>COUNT</code> 770 رقمًا، وتقسم <code>AVERAGE</code> على تلك الـ770 (10.8234)."
        },
        hint: {
          en: "771 lines, 770 numbers: one cell must end up holding nothing at all. Then ask which test distinguishes the text <code>n/a</code> from an <em>empty</em> cell.",
          ar: "771 سطرًا و770 رقمًا: فلا بد أن تنتهي خلية واحدة فارغة تمامًا. ثم اسأل أيّ اختبار يميّز النص <code>n/a</code> من الخلية <em>الفارغة</em>."
        },
        explain: {
          en: "Version 1 (plain multiplication) gives <code>#VALUE!</code> in row 6, and one error poisons the whole column: <code>SUM</code> returns <code>#VALUE!</code> too. Version 2 swallows the error with <code>IFERROR(&hellip;,0)</code> and is the tempting answer &mdash; the total is right (8334), but a line with no price now claims to have earned 0, so <code>COUNT</code> is 771 and the average drops to 10.8093. The last option tests emptiness, and <code>n/a</code> is not empty, so it multiplies and gives <code>#VALUE!</code> again. Version 3 tests the thing it actually depends on: a blank is honest (the cell holds nothing), the three results come out as shown, and <code>=COUNTA(&hellip;)-COUNT(&hellip;)</code> tells you how many lines were skipped.",
          ar: "تعطي النسخة 1 (الضرب المباشر) <code>#VALUE!</code> في الصف 6، وخطأ واحد يسمّم العمود كله: فتعيد <code>SUM</code> كذلك <code>#VALUE!</code>. وتبتلع النسخة 2 الخطأ بـ<code>IFERROR(&hellip;,0)</code> وهي الجواب المغري &mdash; فالمجموع صحيح (8334)، لكن سطرًا لا سعر له يزعم الآن أنه أدرّ 0، فتصير <code>COUNT</code> 771 وينزل المتوسط إلى 10.8093. والخيار الأخير يختبر الفراغ، و<code>n/a</code> ليس فراغًا، فيضرب ويعطي <code>#VALUE!</code> من جديد. أما النسخة 3 فتختبر ما تعتمد عليه فعلًا: الفراغ أمين (الخلية لا تحمل شيئًا)، وتخرج النتائج الثلاث كما هي، وتخبرك <code>=COUNTA(&hellip;)-COUNT(&hellip;)</code> كم سطرًا تُرك."
        }
      },
      {
        id: "p1bx11",
        type: "output",
        level: "medium",
        lang: "python",
        topics: [
          "p1-silent-defaults",
          "p1-nb-spelling-variants"
        ],
        q: {
          en: "R4 standardises the item names. The program measures what each half of the rule is worth. Write exactly what it prints (four lines).",
          ar: "توحّد القاعدة R4 أسماء الأصناف. ويقيس البرنامج ما يستحقه كل نصف من القاعدة. اكتب بالضبط ما يطبعه (أربعة أسطر)."
        },
        code: code(
          "import pandas as pd",
          "",
          "it = pd.read_csv(\"cafeteria_orders.csv\")[\"item\"]",
          "print(it.nunique())",
          "print(it.str.strip().nunique())",
          "print(it.str.strip().str.title().nunique())",
          "print(int((it != it.str.strip().str.title()).sum()))"
        ),
        blanks: [
          {
            accept: [
              code(
                "22",
                "19",
                "16",
                "84"
              )
            ],
            lines: 4
          }
        ],
        hint: {
          en: "The menu has 16 items. Two different things are wrong with the raw spellings &mdash; strip fixes one of them. And the last line counts <em>lines</em>, not spellings.",
          ar: "في القائمة 16 صنفًا. وفي التهجئات الخامة عيبان مختلفان &mdash; تُصلح strip أحدهما. والسطر الأخير يعدّ <em>الأسطر</em> لا التهجئات."
        },
        explain: {
          en: "The raw column holds 22 spellings of 16 menu items: some differ by stray spaces (<code>\"Tea \"</code>), some by capitals (<code>\"tea\"</code>, <code>\"espresso\"</code>). Stripping alone gets you to 19 &mdash; this is exactly Excel's TRIM-only <code>item_clean</code>, which still reports the right grand total while leaving three phantom items in a PivotTable. Adding Title Case closes the last three and lands on the 16 the menu names. The fourth number is the surprising one: 84 of the 771 lines are rewritten by R4, but only 4 of those are the space problem &mdash; the other 80 are case alone, and 75 of them are <code>Water 500ml</code> becoming <code>Water 500Ml</code>, a rename R4 makes for no good reason (the chapter's honest admission that R4 is the weakest of the five rules).",
          ar: "يحمل العمود الخام 22 تهجئة لـ16 صنفًا في القائمة: بعضها يختلف بمسافات شاردة (<code>\"Tea \"</code>) وبعضها بحالة الأحرف (<code>\"tea\"</code> و<code>\"espresso\"</code>). والتجريد وحده يوصلك إلى 19 &mdash; وهذا بالضبط عمود <code>item_clean</code> في Excel بـTRIM وحدها، وهو يذكر المجموع الكلي الصحيح مع إبقاء ثلاثة أصناف وهمية في الجدول المحوري. وإضافة Title Case تُغلق الثلاثة الباقية فتحطّ على الـ16 التي تسمّيها القائمة. والرقم الرابع هو المفاجئ: 84 من 771 سطرًا تعيد R4 كتابتها، لكن 4 منها فقط هي مشكلة المسافات &mdash; والثمانون الباقية حالةُ أحرف فقط، و75 منها <code>Water 500ml</code> تصير <code>Water 500Ml</code>، وهي إعادة تسمية تفعلها R4 بلا سبب وجيه (وهو إقرار الفصل الصريح بأن R4 أضعف القواعد الخمس)."
        }
      },
      {
        id: "p1bx12",
        type: "error",
        level: "medium",
        lang: "m",
        topics: [
          "p1-step-order",
          "p1-applied-steps",
          "p1-m-code"
        ],
        q: {
          en: "This Power Query recipe should leave 748 rows and a revenue of 8,062.00. The Applied Steps list ends with 764 rows and the card reads 8,237.00; no step shows an error. Click the step responsible.",
          ar: "يُفترض أن تُبقي وصفة Power Query هذه 748 صفًّا وإيرادًا 8,062.00. لكن قائمة الخطوات المطبَّقة تنتهي بـ764 صفًّا وتقرأ البطاقة 8,237.00، ولا خطوة تُظهر خطأً. انقر الخطوة المسؤولة."
        },
        code: code(
          "let",
          "    Source = Csv.Document(File.Contents(DataFolder & \"cafeteria_orders.csv\"),",
          "        [Delimiter = \",\", Columns = 8, Encoding = 65001]),",
          "    Promoted = Table.PromoteHeaders(Source, [PromoteAllScalars = true]),",
          "    Typed = Table.TransformColumnTypes(Promoted,",
          "        {{\"order_id\", Int64.Type}, {\"order_time\", type datetime},",
          "         {\"qty\", Int64.Type}, {\"unit_price\", type number}}, \"en-US\"),",
          "    NoErrors = Table.ReplaceErrorValues(Typed, {{\"unit_price\", null}}),",
          "    Tidy = Table.TransformColumns(NoErrors,",
          "        {{\"item\", each Text.Proper(Text.Trim(_)), type text}}),",
          "    Valid = Table.SelectRows(Tidy,",
          "        each [qty] > 0 and [unit_price] <> null and [unit_price] < 50),",
          "    Indexed = Table.AddIndexColumn(Valid, \"Index\", 1, 1, Int64.Type),",
          "    Unique = Table.Distinct(Indexed),",
          "    WithTotal = Table.AddColumn(Unique, \"line_total\",",
          "        each [qty] * [unit_price], type number)",
          "in",
          "    WithTotal"
        ),
        answer: 13,
        solution: {
          code: code(
            "    Unique = Table.Distinct(Valid),",
            "    Indexed = Table.AddIndexColumn(Unique, \"Index\", 1, 1, Int64.Type),"
          ),
          en: "Remove the duplicates first, and add the index afterwards &mdash; if you need one at all.",
          ar: "احذف المكررات أولًا، وأضف الفهرس بعدها &mdash; إن كنت تحتاجه أصلًا."
        },
        hint: {
          en: "<code>Table.Distinct</code> keeps one copy of each row that is identical in <em>every</em> column. Look at what the step just above it gave every row.",
          ar: "تُبقي <code>Table.Distinct</code> نسخة واحدة من كل صف يتطابق في <em>كل</em> عمود. فانظر إلى ما أعطته الخطوة التي تسبقها لكل صف."
        },
        explain: {
          en: "<code>Table.AddIndexColumn</code> gives every surviving row a different number, 1, 2, 3&hellip;, so by the time <code>Table.Distinct</code> runs no two rows are identical any more and it removes nothing: 764 rows instead of 748, carrying the 16 repeated lines and their 175.00 &mdash; which is the 8,237.00 on the card. Nothing shows an error because every step did exactly what it was told; the only visible trace is the row count beside the step. Lesson 5's rule: deduplicate before adding any column that makes rows unique, and read the row counts down the Applied Steps list rather than trusting the last one. (Deduplicating after the filter is fine &mdash; that order gives 748 and 8,062.00 too.)",
          ar: "تعطي <code>Table.AddIndexColumn</code> كل صف باقٍ رقمًا مختلفًا، 1 و2 و3&hellip;، فحين تعمل <code>Table.Distinct</code> لا يبقى صفّان متطابقان فلا تحذف شيئًا: 764 صفًّا بدل 748، تحمل الأسطر الستة عشر المكررة و175.00 معها &mdash; وهي 8,237.00 التي على البطاقة. ولا تُظهر أي خطوة خطأً لأن كل خطوة فعلت ما قيل لها بالضبط؛ والأثر الظاهر الوحيد هو عدد الصفوف إلى جانب الخطوة. وقاعدة الدرس 5: احذف المكررات قبل إضافة أي عمود يجعل الصفوف مميّزة، واقرأ أعداد الصفوف على طول قائمة الخطوات بدل أن تثق بالأخيرة. (وحذف المكررات بعد الترشيح لا بأس به &mdash; فذلك الترتيب يعطي 748 و8,062.00 أيضًا.)"
        }
      },
      {
        id: "p1bx13",
        type: "compare",
        level: "hard",
        lang: "m",
        topics: [
          "p1-step-order",
          "p1-type-detection",
          "p1-m-code"
        ],
        q: {
          en: "Two Power Query recipes keep the same rows, in a different step order. B reaches 748 rows and 8,062.00. A reports <code>Expression.Error: We cannot apply operator &lt; to types Text and Number</code> on every row of its <code>Valid</code> step. Which statement is correct?",
          ar: "وصفتان في Power Query تُبقيان الصفوف نفسها بترتيب خطوات مختلف. تصل ب إلى 748 صفًّا و8,062.00. أما أ فتذكر <code>Expression.Error: We cannot apply operator &lt; to types Text and Number</code> على كل صف في خطوة <code>Valid</code>. أيّ العبارات صحيحة؟"
        },
        codeA: code(
          "    Promoted = Table.PromoteHeaders(Source, [PromoteAllScalars = true]),",
          "    Valid = Table.SelectRows(Promoted,",
          "        each [qty] > 0 and [unit_price] < 50),",
          "    Typed = Table.TransformColumnTypes(Valid,",
          "        {{\"qty\", Int64.Type}, {\"unit_price\", type number}}, \"en-US\"),",
          "    NoErrors = Table.ReplaceErrorValues(Typed, {{\"unit_price\", null}})"
        ),
        codeB: code(
          "    Promoted = Table.PromoteHeaders(Source, [PromoteAllScalars = true]),",
          "    Typed = Table.TransformColumnTypes(Promoted,",
          "        {{\"qty\", Int64.Type}, {\"unit_price\", type number}}, \"en-US\"),",
          "    NoErrors = Table.ReplaceErrorValues(Typed, {{\"unit_price\", null}}),",
          "    Valid = Table.SelectRows(NoErrors,",
          "        each [qty] > 0 and [unit_price] <> null and [unit_price] < 50)"
        ),
        options: [
          {
            en: "A is better: filtering first leaves fewer rows to convert, and Power Query converts the surviving text to numbers anyway as soon as a later step needs them.",
            ar: "أ أفضل: الترشيح أولًا يُبقي صفوفًا أقل للتحويل، وPower Query تحوّل النص الباقي إلى أعداد بنفسها بمجرد أن تحتاجها خطوة لاحقة."
          },
          {
            en: "They are equivalent: Applied Steps are independent instructions, so Power Query re-orders them into whichever order works and both recipes end at 748 rows.",
            ar: "هما متكافئتان: الخطوات المطبَّقة أوامر مستقلة، فتعيد Power Query ترتيبها إلى الترتيب الذي يعمل، وتنتهي الوصفتان إلى 748 صفًّا."
          },
          {
            en: "B is better: straight after <code>PromoteHeaders</code> every column of a CSV is text, so A's <code>[unit_price] &lt; 50</code> compares text with a number and fails for every row. B types the column first (with <code>\"en-US\"</code>, so the dot is a decimal point, not a thousands separator), turns the <code>n/a</code> error into <code>null</code>, and only then filters &mdash; and because <code>null</code> is tested explicitly, the missing price is removed by a rule you can name rather than by accident.",
            ar: "ب أفضل: فبعد <code>PromoteHeaders</code> مباشرة تكون كل أعمدة ملف CSV نصًّا، فتقارن <code>[unit_price] &lt; 50</code> في أ نصًّا بعدد فتفشل في كل صف. أما ب فتُنوِّع العمود أولًا (بـ<code>\"en-US\"</code> فتكون النقطة فاصلة عشرية لا فاصل آلاف)، ثم تحوّل خطأ <code>n/a</code> إلى <code>null</code>، ثم ترشّح &mdash; ولأن <code>null</code> مُختبَرة صراحةً، يُحذف السعر المفقود بقاعدة تستطيع تسميتها لا بالمصادفة."
          },
          {
            en: "B is better, but only because of <code>ReplaceErrorValues</code>: the single <code>n/a</code> cell is what breaks A, and A's filter would work on the other 770 rows if that one line were deleted first.",
            ar: "ب أفضل، لكن بسبب <code>ReplaceErrorValues</code> وحدها: فخلية <code>n/a</code> الواحدة هي ما يكسر أ، وكان مرشِّح أ سيعمل على الصفوف السبعمئة والسبعين الأخرى لو حُذف ذلك السطر أولًا."
          }
        ],
        answer: 2,
        hint: {
          en: "What is the type of every column of a CSV before any <code>TransformColumnTypes</code> step? Count how many rows A's comparison can possibly succeed on.",
          ar: "ما نوع كل عمود في ملف CSV قبل أي خطوة <code>TransformColumnTypes</code>؟ وأحصِ على كم صف يمكن أن تنجح مقارنة أ."
        },
        explain: {
          en: "A CSV has no types: after <code>PromoteHeaders</code> every value is text, so <code>\"12.0\" &lt; 50</code> is not a smaller number, it is a type error &mdash; and it happens on all 771 rows, not just the <code>n/a</code> one, which is why the last option is wrong even though it sounds precise. Applied Steps are a <em>sequence</em>: each step takes the table the previous one returned, and nothing re-orders them for you, so the second option is wrong too. Typing first also settles the locale question (<code>\"en-US\"</code> reads <code>12.0</code> as twelve, not as one hundred and twenty), and only after typing can the <code>n/a</code> error become <code>null</code> and be tested by name &mdash; which is how R3 removes it on purpose instead of by side effect.",
          ar: "لا أنواع في ملف CSV: فبعد <code>PromoteHeaders</code> كل قيمة نص، فليست <code>\"12.0\" &lt; 50</code> عددًا أصغر بل خطأ نوع &mdash; ويحدث على الصفوف الـ771 كلها لا على سطر <code>n/a</code> فحسب، ولهذا يخطئ الخيار الأخير وإن بدا دقيقًا. والخطوات المطبَّقة <em>متتالية</em>: كل خطوة تأخذ الجدول الذي أعادته التي قبلها، ولا أحد يعيد ترتيبها عنك، فيخطئ الخيار الثاني أيضًا. والتنويع أولًا يحسم مسألة اللغة الإقليمية أيضًا (<code>\"en-US\"</code> تقرأ <code>12.0</code> اثني عشر لا مئة وعشرين)، وبعد التنويع فقط يمكن أن يصير خطأ <code>n/a</code> قيمة <code>null</code> تُختبَر بالاسم &mdash; وهكذا تحذفها R3 عن قصد لا كأثر جانبي."
        }
      },
      {
        id: "p1bx14",
        type: "match",
        level: "easy",
        topics: [
          "p1-which-python",
          "p1-kernel-pick",
          "p1-nb-pip-env"
        ],
        q: {
          en: "Match each command of the workbench with the question it actually answers.",
          ar: "وصّل كل أمر من أوامر بيئة العمل بالسؤال الذي يجيب عنه فعلًا."
        },
        pairs: [
          {
            l: {
              code: "python -c \"import sys; print(sys.prefix != sys.base_prefix)\""
            },
            r: {
              en: "Is a virtual environment active in this shell?",
              ar: "هل هناك بيئة افتراضية مفعّلة في هذه الصدفة؟"
            }
          },
          {
            l: {
              code: "where.exe python"
            },
            r: {
              en: "Which python.exe files PATH finds, and in what order",
              ar: "أيّ ملفات python.exe يجدها PATH، وبأي ترتيب"
            }
          },
          {
            l: {
              code: "python -m pip --version"
            },
            r: {
              en: "Which pip will run, and which Python it installs into",
              ar: "أيّ pip سيعمل، وإلى أيّ بايثون يثبّت"
            }
          },
          {
            l: {
              code: "import sys; sys.executable"
            },
            r: {
              en: "Which Python is running this notebook's cells",
              ar: "أيّ بايثون يشغّل خلايا هذا الدفتر"
            }
          },
          {
            l: {
              code: "jupyter kernelspec list"
            },
            r: {
              en: "Which kernels JupyterLab offers you to choose from",
              ar: "أيّ النوى يعرضها JupyterLab لتختار منها"
            }
          }
        ],
        leftHead: {
          en: "The command",
          ar: "الأمر"
        },
        rightHead: {
          en: "What it proves",
          ar: "ما يُثبته"
        },
        hint: {
          en: "Two of them are about the shell you typed in, two about the kernel behind a notebook, and one about the list of kernels on the machine.",
          ar: "اثنان منها عن الصدفة التي كتبت فيها، واثنان عن النواة خلف الدفتر، وواحد عن قائمة النوى على الجهاز."
        },
        explain: {
          en: "Every one of these is a different question, and answering the wrong one is how the ten classic setup failures of Lesson 2 happen. <code>sys.prefix != sys.base_prefix</code> is the only honest test of &ldquo;am I in the venv?&rdquo; &mdash; a prompt prefix can be stale. <code>where.exe python</code> shows the order PATH searches, which is how a Microsoft Store stub ends up answering. <code>python -m pip</code> ties pip to the interpreter that ran it, which is why <code>%pip</code> in a notebook is safe and <code>!pip</code> is not. <code>sys.executable</code> inside a cell is the kernel's own Python, and <code>jupyter kernelspec list</code> shows which kernels exist at all &mdash; the pair that explains &ldquo;pip says it is installed, the notebook says it is not&rdquo;.",
          ar: "كل واحد من هذه سؤال مختلف، والإجابة عن السؤال الخطأ هي الطريق إلى أعطال الإعداد العشرة الكلاسيكية في الدرس 2. فـ<code>sys.prefix != sys.base_prefix</code> هو الاختبار الأمين الوحيد لسؤال «هل أنا داخل البيئة؟» &mdash; فبادئة المحث قد تكون قديمة. و<code>where.exe python</code> تُظهر ترتيب بحث PATH، وهو ما يجعل بديل متجر مايكروسوفت هو من يجيب. و<code>python -m pip</code> تربط pip بالمفسّر الذي شغّله، ولهذا يكون <code>%pip</code> في الدفتر آمنًا و<code>!pip</code> غير آمن. و<code>sys.executable</code> داخل خلية هو بايثون النواة نفسها، و<code>jupyter kernelspec list</code> تُظهر أي النوى موجودة أصلًا &mdash; وهما الزوج الذي يشرح «pip يقول إنها مثبَّتة والدفتر يقول لا»."
        }
      },
      {
        id: "p1bx15",
        type: "order",
        level: "easy",
        topics: [
          "p1-pq-cleaning-steps",
          "p1-applied-steps"
        ],
        q: {
          en: "Put the seven Power Query steps for <code>cafeteria_orders.csv</code> in the order Lesson 5 records, given three facts: the row count beside the Applied Steps must read 771, 771, 771, 771, 764, 748, 748; the column types and the errors they produce are settled before the text of <code>item</code> is cleaned; and the custom column comes last, on the rows you decided to count (748, summing to 8,062.00).",
          ar: "رتّب خطوات Power Query السبع لملف <code>cafeteria_orders.csv</code> بالترتيب الذي يسجّله الدرس 5، بحسب ثلاث حقائق: عدد الصفوف إلى جانب الخطوات المطبَّقة يجب أن يقرأ 771 و771 و771 و771 و764 و748 و748؛ وأنواع الأعمدة والأخطاء الناتجة عنها تُحسم قبل تنظيف نصّ <code>item</code>؛ والعمود المخصّص آخرًا، على الصفوف التي قررت عدّها (748 ومجموعها 8,062.00)."
        },
        items: [
          {
            en: "Use First Row as Headers",
            ar: "Use First Row as Headers &mdash; اعتبار الصف الأول ترويسة"
          },
          {
            en: "Change Type: <code>unit_price</code> to a number, using locale English (US)",
            ar: "Change Type: تحويل <code>unit_price</code> إلى عدد باللغة الإقليمية الإنجليزية (الولايات المتحدة)"
          },
          {
            en: "Replace Errors in <code>unit_price</code> with <code>null</code>",
            ar: "Replace Errors: استبدال الأخطاء في <code>unit_price</code> بـ<code>null</code>"
          },
          {
            en: "Trim, Clean and Capitalize Each Word on <code>item</code>",
            ar: "Trim وClean وCapitalize Each Word على <code>item</code>"
          },
          {
            en: "Filter rows: <code>qty &gt; 0</code>, <code>unit_price</code> not <code>null</code> and below 50",
            ar: "Filter Rows: ترشيح الصفوف بـ<code>qty &gt; 0</code> و<code>unit_price</code> ليست <code>null</code> وأقل من 50"
          },
          {
            en: "Remove duplicate rows (all columns selected)",
            ar: "Remove Duplicates: حذف الصفوف المكررة (بتحديد كل الأعمدة)"
          },
          {
            en: "Add Custom Column <code>line_total = qty * unit_price</code>",
            ar: "Add Custom Column: إضافة عمود <code>line_total = qty * unit_price</code>"
          }
        ],
        answer: [0, 1, 2, 3, 4, 5, 6],
        hint: {
          en: "Nothing can be done to a column before it has a name, and nothing can be compared with 50 before it is a number. Which step must come after the one that <em>creates</em> the errors?",
          ar: "لا يمكن فعل شيء بعمود قبل أن يكون له اسم، ولا مقارنة شيء بالعدد 50 قبل أن يكون عددًا. وأيّ خطوة يجب أن تأتي بعد الخطوة التي <em>تُنشئ</em> الأخطاء؟"
        },
        explain: {
          en: "Headers first: until the first row is promoted the columns are called <code>Column1</code>&hellip; and no step can name <code>unit_price</code>. Then Change Type with the <code>en-US</code> locale, which is the step that turns <code>n/a</code> into an Error &mdash; so Replace Errors has to come after it, never before. Cleaning <code>item</code> can sit anywhere after the headers, but before any join with the menu. Filter (771 &rarr; 764) and only then Remove Duplicates (764 &rarr; 748): the other way round also gives 748 here, but the row counts in the step list then read differently, and a step that makes rows unique must never come between them. The custom column goes last, on the rows you decided to count: 748 rows summing to 8,062.00.",
          ar: "الترويسة أولًا: فحتى يُرقَّى الصف الأول تُسمّى الأعمدة <code>Column1</code>&hellip; ولا تستطيع خطوة أن تسمّي <code>unit_price</code>. ثم Change Type باللغة الإقليمية <code>en-US</code>، وهي الخطوة التي تحوّل <code>n/a</code> إلى Error &mdash; فلا بد أن تأتي Replace Errors بعدها لا قبلها. وتنظيف <code>item</code> يصلح في أي موضع بعد الترويسة، لكن قبل أي دمج مع القائمة. ثم Filter (771 &rarr; 764) وبعدها فقط Remove Duplicates (764 &rarr; 748): والعكس يعطي 748 هنا أيضًا، لكن أعداد الصفوف في قائمة الخطوات تُقرأ حينها مختلفة، ولا يجوز أبدًا أن تقع بينهما خطوة تجعل الصفوف مميّزة. والعمود المخصّص آخرًا، على الصفوف التي قررت عدّها: 748 صفًّا مجموعها 8,062.00."
        }
      },
      {
        id: "p1bx16",
        type: "complete",
        level: "easy",
        lang: "python",
        topics: [
          "p1-three-counts",
          "p1-hour-grain"
        ],
        q: {
          en: "The table is already clean (748 lines). Which expression completes the line so that the program prints <code>12 119</code>?",
          ar: "الجدول منظَّف أصلًا (748 سطرًا). أيّ تعبير يكمل السطر فيطبع البرنامج <code>12 119</code>؟"
        },
        code: code(
          "import pandas as pd",
          "",
          "raw = pd.read_csv(\"cafeteria_orders.csv\")",
          "df = raw.drop_duplicates()",
          "df = df[df[\"qty\"] > 0]",
          "df = df[df[\"unit_price\"].notna() & (df[\"unit_price\"] <= 50)]   # 748 lines",
          "d = df.assign(hour=pd.to_datetime(df[\"order_time\"]).dt.hour)",
          "per_hour = d.groupby(\"hour\")____",
          "print(int(per_hour.idxmax()), int(per_hour.max()))              # must print 12 119"
        ),
        options: [
          {
            code: ".size()"
          },
          {
            code: "[\"order_id\"].count()"
          },
          {
            code: "[\"order_id\"].nunique()"
          },
          {
            code: "[\"qty\"].sum()"
          }
        ],
        answer: 2,
        solution: {
          code: "per_hour = d.groupby(\"hour\")[\"order_id\"].nunique()",
          en: "<code>nunique()</code> counts how many <em>different</em> <code>order_id</code> values fall in each hour, which is the number of visits to the till.",
          ar: "تعدّ <code>nunique()</code> كم قيمة <code>order_id</code> <em>مختلفة</em> تقع في كل ساعة، وهو عدد الزيارات إلى الصندوق."
        },
        hint: {
          en: "One order can be three lines. Which of the four expressions is the only one that cannot count the same visit twice?",
          ar: "الطلب الواحد قد يكون ثلاثة أسطر. وأيّ التعبيرات الأربعة هو الوحيد الذي لا يستطيع عدّ الزيارة نفسها مرتين؟"
        },
        explain: {
          en: "Only <code>nunique()</code> changes the grain from lines to orders, and only it gives 12 and 119. <code>size()</code> counts rows and <code>[\"order_id\"].count()</code> counts non-missing <code>order_id</code> values in those rows &mdash; since no id is missing, the two are identical here and both print <code>13 148</code>, the busiest hour <em>by lines</em>. <code>[\"qty\"].sum()</code> changes the measure instead of the grain: it adds up portions and prints <code>13 265</code>. The trap is that all four run without complaint, so the grain is a decision you make, not something the code will remind you of (Lesson 6, &ldquo;lines, orders and counted orders&rdquo;).",
          ar: "وحدها <code>nunique()</code> تغيّر الحبيبة من الأسطر إلى الطلبات، ووحدها تعطي 12 و119. فـ<code>size()</code> تعدّ الصفوف، و<code>[\"order_id\"].count()</code> تعدّ قيم <code>order_id</code> غير المفقودة في تلك الصفوف &mdash; ولأن لا معرّف مفقودًا تتطابق الاثنتان هنا وتطبعان <code>13 148</code>، أي أكثر ساعة ازدحامًا <em>بالأسطر</em>. أما <code>[\"qty\"].sum()</code> فتغيّر المقياس لا الحبيبة: فتجمع الحصص وتطبع <code>13 265</code>. والفخ أن الأربعة كلها تعمل بلا اعتراض، فالحبيبة قرار تتخذه أنت لا شيء يذكّرك به الكود (الدرس 6: «الأسطر والطلبات والطلبات المعدودة»)."
        }
      },
      {
        id: "p1bx17",
        type: "trace",
        level: "hard",
        lang: "python",
        topics: [
          "p1-nb-hidden-state",
          "p1-nb-drift-ways"
        ],
        q: {
          en: "In a fresh kernel the four cells are run in this order: 1, 2, 3, 4, then the author scrolls back up, re-runs cell 3, and runs cell 4 again &mdash; so the execution counters read <code>In [1] [2] [3] [4] [5] [6]</code>. What does cell 4 print the first time, and what the second time?",
          ar: "في نواة جديدة تُنفَّذ الخلايا الأربع بهذا الترتيب: 1 و2 و3 و4، ثم يرجع الكاتب إلى الأعلى ويعيد تنفيذ الخلية 3 ثم يشغّل الخلية 4 مرة أخرى &mdash; فتقرأ عدّادات التنفيذ <code>In [1] [2] [3] [4] [5] [6]</code>. فماذا تطبع الخلية 4 أول مرة، وماذا تطبع في الثانية؟"
        },
        code: code(
          "# %% cell 1",
          "import pandas as pd",
          "STAFF_OFF = 0.10",
          "",
          "# %% cell 2",
          "orders = pd.read_csv(\"cafeteria_orders.csv\")",
          "orders[\"line_total\"] = orders[\"qty\"] * orders[\"unit_price\"]",
          "",
          "# %% cell 3",
          "orders.loc[orders[\"customer_type\"] == \"Staff\", \"line_total\"] *= 1 - STAFF_OFF",
          "",
          "# %% cell 4",
          "print(orders[\"line_total\"].sum())"
        ),
        blanks: [
          {
            accept: [
              "8156.95"
            ],
            label: {
              en: "first run of cell 4",
              ar: "أول تنفيذ للخلية 4"
            }
          },
          {
            accept: [
              "7997.605"
            ],
            label: {
              en: "second run of cell 4",
              ar: "ثاني تنفيذ للخلية 4"
            }
          }
        ],
        hint: {
          en: "Cell 3 does not set the staff lines to a discounted value; it multiplies whatever is there now. The raw total of the file is 8334.0, and the staff lines carry 1907.5 of it.",
          ar: "الخلية 3 لا تضبط أسطر العاملين على قيمة مخفَّضة؛ بل تضرب ما فيها الآن. والمجموع الخام للملف 8334.0، وتحمل أسطر العاملين 1907.5 منه."
        },
        explain: {
          en: "The first pass discounts the staff lines once: 8334.0 &minus; 10% of 1907.5 = 8156.95. Re-running cell 3 does not recompute the discount, it applies it again &mdash; <code>*=</code> reads the column it writes &mdash; so the staff lines are now at 0.9 &times; 0.9 and the total falls to 7997.605 (a third run would give 7854.1945). Nothing is raised, the page still shows the old output next to cell 4 until it is re-run, and a reader who only sees the saved notebook cannot tell which number was produced by which execution order. That is why Lesson 3 ends each session with Restart &amp; Run All, and why Version 3 of that notebook computes a <em>new</em> column instead of overwriting <code>line_total</code>.",
          ar: "المرور الأول يخصم أسطر العاملين مرة واحدة: 8334.0 &minus; 10% من 1907.5 = 8156.95. وإعادة تنفيذ الخلية 3 لا تعيد حساب الخصم بل تطبّقه من جديد &mdash; فـ<code>*=</code> تقرأ العمود الذي تكتب فيه &mdash; فتصير أسطر العاملين عند 0.9 &times; 0.9 وينزل المجموع إلى 7997.605 (ومرور ثالث يعطي 7854.1945). ولا يُرفع شيء، وتظل الصفحة تُظهر الناتج القديم إلى جانب الخلية 4 حتى يُعاد تنفيذها، ولا يستطيع قارئ لا يرى إلا الدفتر المحفوظ أن يعرف أيّ رقم أنتجه أيّ ترتيب تنفيذ. ولهذا يُنهي الدرس 3 كل جلسة بـRestart &amp; Run All، ولهذا تحسب النسخة 3 من ذلك الدفتر عمودًا <em>جديدًا</em> بدل أن تكتب فوق <code>line_total</code>."
        }
      },
      {
        id: "p1bx18",
        type: "error",
        level: "easy",
        lang: "python",
        topics: [
          "p1-nb-run-all",
          "p1-nb-hygiene"
        ],
        q: {
          en: "The notebook shows <code>8156.95</code> under cell 4 and the author says it works. <code>jupyter nbconvert --to notebook --execute whatif.ipynb</code> stops with <code>NameError: name 'STAFF_OFF' is not defined</code>. Click the line that cannot run in a fresh kernel.",
          ar: "يُظهر الدفتر <code>8156.95</code> تحت الخلية 4 ويقول كاتبه إنه يعمل. لكن <code>jupyter nbconvert --to notebook --execute whatif.ipynb</code> يتوقف بالخطأ <code>NameError: name 'STAFF_OFF' is not defined</code>. انقر السطر الذي لا يمكن تنفيذه في نواة جديدة."
        },
        code: code(
          "# %% cell 1",
          "import pandas as pd",
          "",
          "# %% cell 2",
          "orders = pd.read_csv(\"data/raw/cafeteria_orders.csv\")",
          "orders[\"line_total\"] = orders[\"qty\"] * orders[\"unit_price\"]",
          "",
          "# %% cell 3",
          "orders.loc[orders[\"customer_type\"] == \"Staff\", \"line_total\"] *= 1 - STAFF_OFF",
          "",
          "# %% cell 4",
          "print(round(orders[\"line_total\"].sum(), 2))"
        ),
        answer: 9,
        solution: {
          code: code(
            "# %% cell 1",
            "import pandas as pd",
            "STAFF_OFF = 0.10            # every name a cell uses is defined on the page"
          ),
          en: "Put the definition back on the page, in the settings cell next to the imports, so the notebook does not depend on a cell that was deleted.",
          ar: "أعد التعريف إلى الصفحة، في خلية الإعدادات إلى جانب الاستيرادات، فلا يعتمد الدفتر على خلية حُذفت."
        },
        hint: {
          en: "Read only the page, as a fresh kernel does: which name is used by a cell although no cell on the page creates it?",
          ar: "اقرأ الصفحة وحدها كما تفعل النواة الجديدة: أيّ اسم تستعمله خلية ولا تُنشئه أي خلية على الصفحة؟"
        },
        explain: {
          en: "<code>STAFF_OFF</code> exists only in the author's kernel &mdash; it was typed in a cell that was later deleted, and the deletion removed the definition but not its effect, because the variable stays alive in memory. The saved outputs are a photograph of that room; <code>nbconvert --execute</code> starts an empty one and stops on line 9. Nothing about the error is in cell 4, even though cell 4 is where the number was: the failing line is the first one that uses a name nothing on the page defines. The discipline is Restart &amp; Run All before you share, and one settings cell near the top where every constant is defined.",
          ar: "لا وجود لـ<code>STAFF_OFF</code> إلا في نواة الكاتب &mdash; فقد كُتب في خلية حُذفت بعدها، والحذف أزال التعريف لا أثره، لأن المتغير يبقى حيًّا في الذاكرة. والنواتج المحفوظة صورة لتلك الغرفة؛ أما <code>nbconvert --execute</code> فيبدأ غرفة فارغة ويتوقف عند السطر 9. ولا شيء من الخطأ في الخلية 4 وإن كان الرقم فيها: فالسطر الفاشل هو أول سطر يستعمل اسمًا لا تعرّفه الصفحة. والنظام هو Restart &amp; Run All قبل المشاركة، وخلية إعدادات واحدة قريبة من الأعلى يُعرَّف فيها كل ثابت."
        }
      },
      {
        id: "p1bx19",
        type: "compare",
        level: "medium",
        lang: "python",
        topics: [
          "p1-xl-duplicates",
          "p1-rules-r1-r5",
          "p1-nb-dirty-rows"
        ],
        q: {
          en: "Both versions implement R1 (&ldquo;drop the exactly repeated lines&rdquo;) and then R2 and R3. A prints <code>748 8062.0 611</code>; B prints <code>610 6598.5 610</code>. Which statement is correct?",
          ar: "تنفّذ النسختان القاعدة R1 («احذف الأسطر المكررة تمامًا») ثم R2 وR3. تطبع أ <code>748 8062.0 611</code> وتطبع ب <code>610 6598.5 610</code>. أيّ العبارات صحيحة؟"
        },
        codeA: code(
          "df = raw.drop_duplicates()",
          "df = df[(df[\"qty\"] > 0) & df[\"unit_price\"].notna() & (df[\"unit_price\"] <= 50)]",
          "print(len(df), round((df[\"qty\"] * df[\"unit_price\"]).sum(), 2), df[\"order_id\"].nunique())"
        ),
        codeB: code(
          "df = raw.drop_duplicates(subset=[\"order_id\"])",
          "df = df[(df[\"qty\"] > 0) & df[\"unit_price\"].notna() & (df[\"unit_price\"] <= 50)]",
          "print(len(df), round((df[\"qty\"] * df[\"unit_price\"]).sum(), 2), df[\"order_id\"].nunique())"
        ),
        options: [
          {
            en: "A is right: a line is a repeat only when all eight columns match an earlier line. B deduplicates on <code>order_id</code>, which is <em>not</em> unique here &mdash; 771 lines carry 616 ids &mdash; so it keeps only the first line of each order: 155 lines go, of which just 16 are the real repeats and the other 139 are genuine second and third lines, taking 1,463.50 of real revenue with them.",
            ar: "أ صحيحة: فالسطر مكرر فقط حين تتطابق أعمدته الثمانية مع سطر سابق. أما ب فتحذف المكررات بحسب <code>order_id</code> وهو <em>ليس</em> مميّزًا هنا &mdash; 771 سطرًا تحمل 616 معرّفًا &mdash; فتُبقي أول سطر من كل طلب وحده: فيذهب 155 سطرًا، 16 منها فقط هي المكررات الحقيقية و139 أسطر ثانية وثالثة حقيقية، تأخذ معها 1,463.50 من إيراد فعلي."
          },
          {
            en: "B is right: <code>order_id</code> is the identifier of the row, so deduplicating on it is the precise way to say &ldquo;one row per order&rdquo;, and A's full-row comparison only works by accident on this file.",
            ar: "ب صحيحة: فـ<code>order_id</code> معرّف الصف، فالحذف بحسبه هو الطريقة الدقيقة لقول «صفّ واحد لكل طلب»، ومقارنة أ للصف الكامل لا تنجح على هذا الملف إلا بالمصادفة."
          },
          {
            en: "They answer different questions and both are defensible: A counts order lines and B counts orders, so B's 6,598.50 is simply the revenue of the orders rather than of the lines.",
            ar: "هما تجيبان سؤالين مختلفين وكلتاهما قابلة للدفاع: فأ تعدّ أسطر الطلبات وب تعدّ الطلبات، فليست 6,598.50 في ب إلا إيراد الطلبات لا إيراد الأسطر."
          },
          {
            en: "A is right, but only because <code>drop_duplicates()</code> defaults to <code>keep=\"first\"</code>; with <code>keep=False</code> it would behave like B and drop both copies of each repeated line.",
            ar: "أ صحيحة، لكن فقط لأن <code>drop_duplicates()</code> تفترض <code>keep=\"first\"</code>؛ ومع <code>keep=False</code> كانت ستتصرف كـب وتحذف نسختي كل سطر مكرر."
          }
        ],
        answer: 0,
        hint: {
          en: "How many distinct <code>order_id</code> values are in a file of 771 lines? The data dictionary of Lesson 1 answers it in one line.",
          ar: "كم قيمة <code>order_id</code> مميّزة في ملف من 771 سطرًا؟ يجيب قاموس البيانات في الدرس 1 عن ذلك بسطر واحد."
        },
        explain: {
          en: "The grain of this file is the order <em>line</em>: one <code>order_id</code> repeats on every line of the same visit, which is why 771 lines carry only 616 ids. R1 removes lines that are identical in all eight columns &mdash; 16 of them, a double entry at the till. Deduplicating on <code>order_id</code> instead keeps one line per order and deletes the rest: Excel says it plainly when you tick only that column, &ldquo;155 duplicate values found and removed; 616 unique values remain&rdquo;. The third option is the tempting one, because 610 orders sounds like a legitimate grain &mdash; but 6,598.50 is not the revenue of those orders, it is the revenue of their first lines only. Nothing raises, and the money is 18% short.",
          ar: "حبيبة هذا الملف هي <em>سطر</em> الطلب: فـ<code>order_id</code> الواحد يتكرر في كل سطر من الزيارة نفسها، ولهذا تحمل 771 سطرًا 616 معرّفًا فقط. وتحذف R1 الأسطر المتطابقة في الأعمدة الثمانية كلها &mdash; وهي 16 سطرًا، إدخال مزدوج عند الصندوق. أما الحذف بحسب <code>order_id</code> فيُبقي سطرًا واحدًا لكل طلب ويحذف الباقي: ويقولها Excel صريحةً حين تحدّد ذلك العمود وحده: «وُجد 155 قيمة مكررة وحُذفت؛ وبقيت 616 قيمة مميّزة». والخيار الثالث هو المغري لأن 610 طلبات تبدو حبيبة مشروعة &mdash; لكن 6,598.50 ليست إيراد تلك الطلبات بل إيراد أسطرها الأولى وحدها. ولا شيء يُرفع، والمال ناقص 18%."
        }
      },
      {
        id: "p1bx20",
        type: "write",
        level: "hard",
        lang: "python",
        topics: [
          "p1-golden-answer",
          "p1-tolerance"
        ],
        q: {
          en: "Write the body of <code>check(res)</code>, the gate the capstone script passes before it prints &ldquo;reconciled with the golden answer: OK&rdquo;. It must fail loudly &mdash; with the offending value in the message &mdash; when the line count, the revenue, or the order of the top three has drifted from <code>GOLDEN</code>. Money is compared within <code>TOL</code>, counts and names exactly.",
          ar: "اكتب متن <code>check(res)</code>، وهي البوابة التي يجتازها سكربت الخاتمة قبل أن يطبع «reconciled with the golden answer: OK». ويجب أن تفشل بصوت عالٍ &mdash; وفي الرسالة القيمة المخالفة &mdash; حين ينزلق عدد الأسطر أو الإيراد أو ترتيب الثلاثة الأوائل عن <code>GOLDEN</code>. ويُقارَن المال داخل <code>TOL</code> وتُقارَن الأعداد والأسماء بالضبط."
        },
        starter: code(
          "import math",
          "",
          "TOL = 0.005                      # half a piastre",
          "GOLDEN = {\"lines\": 748, \"revenue\": 8062.00,",
          "          \"top3\": {\"Shawarma Wrap\": 1368.00, \"Chicken Rice\": 1020.00,",
          "                   \"Falafel Sandwich\": 917.00}}",
          "",
          "# res comes from answer(): res[\"lines\"], res[\"revenue\"], res[\"top3\"] (same shape)",
          "def check(res):",
          "    # your code here"
        ),
        lines: 9,
        checks: [
          {
            re: "assert\\s+res\\s*\\[\\s*[\"']lines[\"']\\s*\\]\\s*==",
            label: {
              en: "Assert the line count exactly: <code>assert res[\"lines\"] == GOLDEN[\"lines\"]</code>",
              ar: "تحقّق من عدد الأسطر بالضبط: <code>assert res[\"lines\"] == GOLDEN[\"lines\"]</code>"
            }
          },
          {
            re: "math\\.isclose\\s*\\(",
            label: {
              en: "Compare the money with <code>math.isclose(...)</code>, not with <code>==</code>",
              ar: "قارن المال بـ<code>math.isclose(...)</code> لا بـ<code>==</code>"
            }
          },
          {
            re: "abs_tol\\s*=\\s*TOL",
            label: {
              en: "Use the stated tolerance: <code>abs_tol=TOL</code>",
              ar: "استعمل التسامح المعلَن: <code>abs_tol=TOL</code>"
            }
          },
          {
            re: "list\\s*\\(\\s*res\\s*\\[\\s*[\"']top3[\"']\\s*\\]\\s*\\)",
            label: {
              en: "Check the <em>order</em> of the top three, e.g. <code>list(res[\"top3\"]) == list(GOLDEN[\"top3\"])</code>",
              ar: "افحص <em>ترتيب</em> الثلاثة الأوائل، مثلًا <code>list(res[\"top3\"]) == list(GOLDEN[\"top3\"])</code>"
            }
          },
          {
            re: "assert[^;]*,\\s*(f?[\"']|res\\s*\\[|list\\s*\\()",
            label: {
              en: "Give an <code>assert</code> a message that names the value that failed, e.g. <code>, res[\"revenue\"]</code>",
              ar: "أعطِ <code>assert</code> رسالةً تسمّي القيمة التي فشلت، مثل <code>, res[\"revenue\"]</code>"
            }
          }
        ],
        forbid: [
          {
            re: "res\\s*\\[\\s*[\"']revenue[\"']\\s*\\]\\s*==|==\\s*GOLDEN\\s*\\[\\s*[\"']revenue[\"']\\s*\\]|round\\s*\\(\\s*res\\s*\\[\\s*[\"']revenue[\"']",
            label: {
              en: "Comparing money with <code>==</code> (or rounding it first) instead of a tolerance",
              ar: "مقارنة المال بـ<code>==</code> (أو تقريبه أولًا) بدلًا من التسامح"
            }
          }
        ],
        solution: {
          code: code(
            "def check(res):",
            "    assert res[\"lines\"] == GOLDEN[\"lines\"], f\"lines {res['lines']} != {GOLDEN['lines']}\"",
            "    assert math.isclose(res[\"revenue\"], GOLDEN[\"revenue\"], abs_tol=TOL), res[\"revenue\"]",
            "    assert list(res[\"top3\"]) == list(GOLDEN[\"top3\"]), list(res[\"top3\"])",
            "    for item, value in GOLDEN[\"top3\"].items():",
            "        assert math.isclose(res[\"top3\"][item], value, abs_tol=TOL), (item, res[\"top3\"][item])"
          ),
          out: "reconciled with the golden answer: OK",
          en: "Counts and names are compared exactly; every money figure goes through <code>math.isclose(&hellip;, abs_tol=TOL)</code>. Comparing the lists of keys checks the <em>order</em> of the top three, and the loop then checks each item's own total.",
          ar: "تُقارَن الأعداد والأسماء بالضبط؛ ويمرّ كل مبلغ عبر <code>math.isclose(&hellip;, abs_tol=TOL)</code>. ومقارنة قائمتي المفاتيح تفحص <em>ترتيب</em> الثلاثة الأوائل، ثم تفحص الحلقة مجموع كل صنف."
        },
        hint: {
          en: "Three kinds of value, two kinds of comparison. And an <code>assert</code> whose message is empty tells the next person nothing: what should travel in the message?",
          ar: "ثلاثة أنواع من القيم ونوعان من المقارنة. و<code>assert</code> برسالة فارغة لا تخبر من يأتي بعدك شيئًا: فما الذي يجب أن تحمله الرسالة؟"
        },
        explain: {
          en: "<code>8062 / 611</code> is 13.194762&hellip;, and <code>0.1 + 0.2</code> is 0.30000000000000004: binary floats make <code>==</code> the wrong operator for money, so a half-piastre <code>abs_tol</code> is the honest comparison. Counts and names are a different matter &mdash; 748 is 748, and &ldquo;Chicken Rice second&rdquo; is either true or not &mdash; so those stay exact; rounding the revenue to two places before comparing is the classic wrong shortcut, because it hides a drift of 0.004 and still breaks on 0.005. The message matters as much as the test: <code>AssertionError: 8305.0</code> or <code>lines 749 != 748</code> tells the next person which rule to audit, while a bare <code>assert</code> only says that something, somewhere, moved.",
          ar: "<code>8062 / 611</code> تساوي 13.194762&hellip;، و<code>0.1 + 0.2</code> تساوي 0.30000000000000004: فالأعداد العشرية الثنائية تجعل <code>==</code> المعامل الخطأ للمال، فيكون <code>abs_tol</code> بنصف قرش هو المقارنة الأمينة. أما الأعداد والأسماء فأمر آخر &mdash; فـ748 هي 748، و«أرز الدجاج ثانيًا» صحيح أو ليس صحيحًا &mdash; فتبقى مقارنتها بالضبط؛ وتقريب الإيراد إلى منزلتين قبل المقارنة هو الاختصار الخاطئ الكلاسيكي، لأنه يخفي انزلاقًا بـ0.004 ويظل يتعطّل عند 0.005. والرسالة بأهمية الفحص: فـ<code>AssertionError: 8305.0</code> أو <code>lines 749 != 748</code> تخبر من يأتي بعدك أيّ قاعدة يدقّق، أما <code>assert</code> العارية فلا تقول إلا أن شيئًا ما في مكان ما قد تحرّك."
        }
      },
      {
        id: "p1bx21",
        type: "fill",
        level: "easy",
        lang: "python",
        topics: [
          "p1-env-check",
          "p1-venv"
        ],
        q: {
          en: "Fill the two blanks in <code>check_env.py</code> so that it reports honestly whether the virtual environment is active, and so that a scheduler or a README step can tell from the exit code alone that a check failed.",
          ar: "املأ الفراغين في <code>check_env.py</code> ليذكر بصدق هل البيئة الافتراضية مفعّلة، وليعرف مُجدوِل أو خطوة في README من رمز الخروج وحده أن فحصًا قد فشل."
        },
        code: code(
          "import sys",
          "from pathlib import Path",
          "",
          "results = []                                   # (ok, label, detail)",
          "",
          "def check(ok, label, detail=\"\"):",
          "    results.append((ok, label, detail))",
          "",
          "in_venv = sys.prefix != ____1____",
          "check(in_venv, \"virtual environment is active\",",
          "      Path(sys.prefix).name if in_venv else \"you are using the system Python\")",
          "",
          "failed = [label for ok, label, _ in results if not ok]",
          "print(f\"{len(results) - len(failed)} passed, {len(failed)} failed\")",
          "sys.exit(____2____ if failed else 0)"
        ),
        blanks: [
          {
            accept: [
              "sys.base_prefix"
            ],
            label: {
              en: "the prefix to compare with",
              ar: "البادئة التي تُقارَن بها"
            },
            wide: true
          },
          {
            accept: [
              "1"
            ],
            label: {
              en: "the failure exit code",
              ar: "رمز الخروج عند الفشل"
            }
          }
        ],
        hint: {
          en: "A venv keeps two prefixes: where it lives, and where the Python it was built from lives. And by convention, which exit code means &ldquo;this program failed&rdquo;?",
          ar: "تحفظ البيئة الافتراضية بادئتين: مكانها هي، ومكان بايثون التي بُنيت منها. وبالاصطلاح، أيّ رمز خروج يعني «فشل هذا البرنامج»؟"
        },
        explain: {
          en: "Inside an active venv <code>sys.prefix</code> points at the project's <code>.venv</code> while <code>sys.base_prefix</code> still points at the Python that created it, so the two differ; outside one they are equal. That is the only test that cannot be fooled &mdash; the <code>(.venv)</code> in the prompt is just text, and it survives in a shell whose PATH has already moved on. The exit code is the second half of the job: <code>sys.exit(1)</code> on any failure and <code>0</code> when the list is empty, so <code>python check_env.py</code> can be a step in a README (&ldquo;must end with 0 failed&rdquo;), and <code>echo $LASTEXITCODE</code> &mdash; or a scheduler &mdash; can read the verdict without reading the report.",
          ar: "داخل بيئة افتراضية مفعّلة تشير <code>sys.prefix</code> إلى <code>.venv</code> في المشروع بينما تظل <code>sys.base_prefix</code> تشير إلى بايثون التي أنشأتها، فتختلف الاثنتان؛ وخارجها تتساويان. وهذا هو الاختبار الوحيد الذي لا يمكن خداعه &mdash; فعبارة <code>(.venv)</code> في المحث نص فقط، وتبقى في صدفة تحرّك PATH فيها بعدها. ورمز الخروج هو نصف العمل الآخر: <code>sys.exit(1)</code> عند أي فشل و<code>0</code> حين تكون القائمة فارغة، فيصير <code>python check_env.py</code> خطوةً في README («يجب أن ينتهي بـ0 failed»)، ويستطيع <code>echo $LASTEXITCODE</code> &mdash; أو مُجدوِل &mdash; أن يقرأ الحكم دون قراءة التقرير."
        }
      },
      {
        id: "p1bx22",
        type: "ordercode",
        level: "easy",
        lang: "python",
        topics: [
          "p1-capstone-script",
          "p1-nb-module-main"
        ],
        q: {
          en: "Put the body of <code>main()</code> in <code>cafeteria_answer.py</code> in order. Two things are not free choices: a value must exist before it is used, and the numbers must reach the screen even on the day the reconciliation fails.",
          ar: "رتّب متن <code>main()</code> في <code>cafeteria_answer.py</code>. وأمران ليسا اختيارًا حرًّا: القيمة يجب أن توجد قبل استعمالها، والأرقام يجب أن تصل إلى الشاشة حتى في اليوم الذي تفشل فيه المطابقة."
        },
        items: [
          {
            code: "raw = pd.read_csv(path)"
          },
          {
            code: "df, removed = clean(raw)"
          },
          {
            code: "res = answer(df)"
          },
          {
            code: code(
              "print(f\"read {len(raw)} lines from {path.name}\")",
              "for rule, n in removed.items():",
              "    print(f\"  {rule:<14} removed {n:>3}\")",
              "print(f\"clean lines : {res['lines']}   revenue : {res['revenue']:,.2f}\")"
            )
          },
          {
            code: "check(res)"
          },
          {
            code: "print(\"reconciled with the golden answer: OK\")"
          }
        ],
        answer: [0, 1, 2, 3, 4, 5],
        hint: {
          en: "<code>check()</code> raises an <code>AssertionError</code> when the answer has drifted. What would you want to be able to read on the screen at that moment?",
          ar: "ترفع <code>check()</code> خطأ <code>AssertionError</code> حين ينزلق الجواب. فما الذي تريد أن تستطيع قراءته على الشاشة في تلك اللحظة؟"
        },
        explain: {
          en: "The data dependencies fix most of it: the file is read, then cleaned, then turned into an answer, and nothing can be printed about <code>res</code> before it exists. The one judgement is where <code>check()</code> goes: it has to come <em>after</em> the printing, because it raises on failure, and a traceback with no numbers above it tells you nothing. The failing runs in Lesson 6 look exactly like this &mdash; the full report, then <code>AssertionError: 8305.0</code>, then exit code 1 &mdash; so you can see at a glance that the lines and the removals were right and only the money moved. The final line claims reconciliation, so it must be the only thing after the gate.",
          ar: "تحدّد اعتمادات البيانات معظم الترتيب: يُقرأ الملف ثم يُنظَّف ثم يُحوَّل إلى جواب، ولا يمكن طباعة شيء عن <code>res</code> قبل أن توجد. والحكم الوحيد هو موضع <code>check()</code>: فلا بد أن تأتي <em>بعد</em> الطباعة، لأنها ترفع عند الفشل، وتتبّع الاستدعاءات بلا أرقام فوقه لا يخبرك شيئًا. وتشبه التشغيلات الفاشلة في الدرس 6 هذا تمامًا &mdash; التقرير كاملًا ثم <code>AssertionError: 8305.0</code> ثم رمز الخروج 1 &mdash; فترى بنظرة واحدة أن الأسطر والإزالات كانت صحيحة وأن المال وحده تحرّك. والسطر الأخير يزعم المطابقة، فيجب أن يكون الشيء الوحيد بعد البوابة."
        }
      },
      {
        id: "p1bx23",
        type: "complete",
        level: "hard",
        lang: "excel",
        topics: [
          "p1-xl-duplicates",
          "p1-xl-sumifs"
        ],
        q: {
          en: "Lesson 4's Version 3 flags the repeated lines instead of deleting them: <code>line_key</code> joins the eight columns, and <code>dup_n</code> must number the copies so that the first one gets 1 and a later copy gets 2 &mdash; which makes the check below report 16 and 755. Which formula completes <code>dup_n</code>?",
          ar: "تُعلِّم النسخة 3 في الدرس 4 الأسطر المكررة بدل حذفها: فـ<code>line_key</code> يصل الأعمدة الثمانية، وعلى <code>dup_n</code> أن يرقّم النسخ فتأخذ الأولى 1 وتأخذ النسخة اللاحقة 2 &mdash; فيذكر الفحص أدناه 16 و755. أيّ صيغة تكمل <code>dup_n</code>؟"
        },
        code: code(
          "line_key  =TEXTJOIN(\"|\",FALSE,[@[order_id]:[customer_type]])",
          "dup_n     ____",
          "",
          "=COUNTIFS(tblOrders[dup_n],\">1\")    ->  16",
          "=COUNTIFS(tblOrders[dup_n],\"<=1\")   ->  755"
        ),
        options: [
          {
            code: "=COUNTIFS(tblOrders[line_key],[@line_key])"
          },
          {
            code: "=COUNTIFS(INDEX([line_key],1):[@line_key],[@line_key])"
          },
          {
            code: "=COUNTIF([@line_key],[@line_key])"
          },
          {
            code: "=COUNTIFS(tblOrders[line_key],[@line_key])-1"
          }
        ],
        answer: 1,
        solution: {
          code: "dup_n     =COUNTIFS(INDEX([line_key],1):[@line_key],[@line_key])",
          en: "The range grows as the formula is filled down &mdash; from the first row of the column to this row &mdash; so <code>dup_n</code> counts how many times this key has been seen <em>so far</em>: 1 on the first copy, 2 on the second.",
          ar: "ينمو النطاق مع تعبئة الصيغة إلى الأسفل &mdash; من أول صف في العمود إلى هذا الصف &mdash; فيعدّ <code>dup_n</code> كم مرة ظهر هذا المفتاح <em>حتى الآن</em>: 1 في النسخة الأولى و2 في الثانية."
        },
        hint: {
          en: "16 lines must be flagged, not 32. What is different about a range that ends at <code>[@line_key]</code> compared with one that is the whole column?",
          ar: "يجب تعليم 16 سطرًا لا 32. فما الفرق بين نطاق ينتهي عند <code>[@line_key]</code> ونطاق هو العمود كله؟"
        },
        explain: {
          en: "An expanding range is what turns a count into a running count: <code>INDEX([line_key],1)</code> is the first cell of the column and <code>[@line_key]</code> is this row, so each row sees only the rows above it plus itself. The first option counts the whole column and gives 2 to <em>both</em> copies, so the check reports 32 duplicates and 739 keepers &mdash; the tempting answer, because 32 looks like a count of something real. Option 4 shifts the same whole-column count down by one, so both copies read 1 and nothing is ever flagged. Option 3 compares the cell with itself and always returns 1. The point of the flag over Remove Duplicates is that nothing is deleted: the 16 lines stay visible, the <code>status</code> column names why each is excluded, and <code>SUMIFS</code> on <code>status=\"duplicate\"</code> shows that they carried 175.00.",
          ar: "النطاق المتمدّد هو ما يحوّل العدّ إلى عدّ جارٍ: فـ<code>INDEX([line_key],1)</code> أول خلية في العمود و<code>[@line_key]</code> هذا الصف، فلا يرى كل صف إلا ما فوقه ونفسه. والخيار الأول يعدّ العمود كله فيعطي 2 لـ<em>كلتا</em> النسختين، فيذكر الفحص 32 مكررًا و739 باقيًا &mdash; وهو الجواب المغري لأن 32 تبدو عدًّا لشيء حقيقي. والخيار الرابع يُنزل عدّ العمود الكامل نفسه بواحد، فتقرأ النسختان 1 ولا يُعلَّم شيء أبدًا. والخيار الثالث يقارن الخلية بنفسها فيعيد 1 دائمًا. وفائدة العلامة على Remove Duplicates أن شيئًا لا يُحذف: فتبقى الأسطر الستة عشر ظاهرة، ويسمّي عمود <code>status</code> سبب استثناء كل منها، ويُظهر <code>SUMIFS</code> على <code>status=\"duplicate\"</code> أنها كانت تحمل 175.00."
        }
      },
      {
        id: "p1bx24",
        type: "output",
        level: "hard",
        lang: "python",
        topics: [
          "p1-per-rule-audit",
          "p1-diagnose-mismatch",
          "p1-lines-in-out"
        ],
        q: {
          en: "This is the per-rule audit of Lesson 6: run the cleaning three times, each time with one rule switched off, and print the lines, the revenue and the orders. Write exactly what it prints (three lines).",
          ar: "هذا تدقيق كل قاعدة في الدرس 6: شغّل التنظيف ثلاث مرات، في كل مرة بقاعدة واحدة معطَّلة، واطبع الأسطر والإيراد والطلبات. اكتب بالضبط ما يطبعه (ثلاثة أسطر)."
        },
        code: code(
          "import pandas as pd",
          "",
          "raw = pd.read_csv(\"cafeteria_orders.csv\")",
          "for skip in (\"R1\", \"R2\", \"R3\"):",
          "    d = raw.drop_duplicates() if skip != \"R1\" else raw",
          "    if skip != \"R2\":",
          "        d = d[d[\"qty\"] > 0]",
          "    if skip != \"R3\":",
          "        d = d[d[\"unit_price\"].notna() & (d[\"unit_price\"] <= 50)]",
          "    print(skip, len(d), f\"{(d['qty'] * d['unit_price']).sum():,.2f}\", d[\"order_id\"].nunique())"
        ),
        blanks: [
          {
            accept: [
              code(
                "R1 764 8,237.00 611",
                "R2 753 8,039.00 614",
                "R3 750 8,182.00 613"
              )
            ],
            lines: 3
          }
        ],
        hint: {
          en: "771 lines in, 23 out: 16 by R1, 5 by R2, 2 by R3. For each row, give back the lines that rule would have removed, then ask what money and which orders came back with them &mdash; the refunds carry &minus;23.00, the price typo +120.00, and the <code>n/a</code> line nothing at all.",
          ar: "771 سطرًا داخلًا و23 خارجًا: 16 بـR1 و5 بـR2 و2 بـR3. وفي كل صف أعِد الأسطر التي كانت تلك القاعدة ستحذفها، ثم اسأل أيّ مال وأيّ طلبات عادت معها &mdash; فالمرتجعات تحمل &minus;23.00، وخطأ السعر +120.00، وسطر <code>n/a</code> لا يحمل شيئًا."
        },
        explain: {
          en: "Each row is 748 plus the lines that rule would have taken. Without R1 the 16 repeated lines stay and carry their 175.00: 764 lines, 8,237.00 &mdash; and the order count does not move, because a repeated line repeats an <code>order_id</code> that was already counted. Without R2 the 5 refunds return; they carry &minus;23.00, so the revenue <em>falls</em> to 8,039.00, and three of those refunds are the only line of their order, so the orders rise to 614. Without R3 the price typo (+120.00) and the <code>n/a</code> line (which contributes nothing, because NaN is skipped by <code>sum</code>) come back: 750 lines, 8,182.00, 613 orders. This is the diagnostic table: when one tool disagrees, you do not argue about the total &mdash; you compare the per-rule rows and read off which rule is missing.",
          ar: "كل صف هو 748 زائدًا الأسطر التي كانت تلك القاعدة ستأخذها. فبلا R1 تبقى الأسطر الستة عشر المكررة وتحمل 175.00 معها: 764 سطرًا و8,237.00 &mdash; ولا يتحرك عدد الطلبات، لأن السطر المكرر يكرّر <code>order_id</code> معدودًا أصلًا. وبلا R2 تعود المرتجعات الخمسة؛ وهي تحمل &minus;23.00، فيَنزل الإيراد إلى 8,039.00، وثلاثة منها هي السطر الوحيد في طلبها فترتفع الطلبات إلى 614. وبلا R3 يعود خطأ السعر (+120.00) وسطر <code>n/a</code> (ولا يساهم بشيء لأن <code>sum</code> تتجاهل NaN): 750 سطرًا و8,182.00 و613 طلبًا. وهذا هو الجدول التشخيصي: فحين تختلف أداة لا تتجادل في المجموع &mdash; بل تقارن صفوف كل قاعدة وتقرأ أيّ قاعدة غائبة."
        }
      }
    ]
  };
}());
