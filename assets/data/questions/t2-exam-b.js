window.DABanks = window.DABanks || {};
(function () {
  /* code(line, line, ...) -> one string with \n between lines */
  function code() { return Array.prototype.join.call(arguments, "\n"); }

  window.DABanks["t2-exam-b"] = {
    title: {
      en: "Chapter Test B — Applied",
      ar: "اختبار الفصل ب — التطبيق"
    },
    intro: {
      en: "24 questions on the code of the whole chapter. Nothing here asks you to recite a rule: you read a program and say what it prints, you trace a value, you click the line that breaks a contract, you choose the expression that completes a step, you judge which of two versions can be run again next month, and you write two functions from scratch. Every frame is one of the chapter's own &mdash; the 503 scraped rows of <code>listings_raw.csv</code>, the 489 that survive <code>drop_duplicates()</code>, the 480 real flats, the 85 June listings of <code>listings_new.csv</code>, the six-city reference table and the forty-by-four rent history &mdash; so read the comments carefully: which frame a figure belongs to is half of most answers. Every printed number was produced by running the program. Plan for about 60 minutes. Every question carries a hint, an answer and an explanation, hidden until you ask for them: try first, then open them. A revealed answer is not counted.",
      ar: "‏24 سؤالًا على كود الفصل كله. ولا يطلب منك شيءٌ هنا أن تسترجع قاعدة: فأنت تقرأ برنامجًا وتقول ماذا يطبع، وتتبع قيمةً، وتنقر السطر الذي يخرق عقدًا، وتختار العبارة التي تُكمل خطوة، وتحكم أيُّ النسختين يمكن تشغيلها مرةً أخرى الشهر القادم، وتكتب دالّتين من الصفر. وكل جدول من جداول الفصل نفسها &mdash; الصفوف الـ503 المسحوبة في <code>listings_raw.csv</code>، والـ489 التي تنجو من <code>drop_duplicates()</code>، والشقق الـ480 الحقيقية، وإعلانات حزيران الـ85 في <code>listings_new.csv</code>، وجدول المدن الستّ المرجعي، وتاريخُ الإيجار أربعين في أربعة &mdash; فاقرأ التعليقات بتمعّن: فمعرفةُ الجدول الذي ينتمي إليه رقمٌ ما هي نصف معظم الأجوبة. وكلُّ رقم مطبوع هنا أنتجه تشغيلُ البرنامج. قدّر نحو 60 دقيقة. ولكل سؤال تلميح وجواب وشرح، مخفيّة حتى تطلبها: جرّب أولًا ثم افتحها. والجواب المكشوف لا يُحسب."
    },
    questions: [

      /* ---------------------------------------------------------- 01 */
      {
        id: "t2bx01", type: "output", level: "easy",
        topics: ["t2-view-copy", "t2-raw-immutable"],
        q: {
          en: "Write exactly what the program prints. The file is read twice, and the only difference between the two halves is one method call.",
          ar: "اكتب بالضبط ما يطبعه البرنامج. يُقرأ الملف مرتين، والفرقُ الوحيد بين النصفين نداءُ تابعٍ واحد."
        },
        code: code(
          "raw  = pd.read_csv(\"listings_raw.csv\")      # 503 rows, 13 columns",
          "work = raw                                  # not a copy: a second name",
          "work[\"rent_per_m2\"] = work[\"monthly_rent\"] / work[\"area_m2\"]",
          "print(work is raw, raw.shape[1])",
          "",
          "raw  = pd.read_csv(\"listings_raw.csv\")      # read again, 13 columns again",
          "safe = raw.copy()",
          "safe[\"rent_per_m2\"] = safe[\"monthly_rent\"] / safe[\"area_m2\"]",
          "print(safe is raw, raw.shape[1], safe.shape[1])"
        ),
        blanks: [
          { accept: ["True 14\nFalse 13 14"], lines: 2 }
        ],
        hint: {
          en: "<code>=</code> binds a name; it does not build a table. Ask of each half how many <em>objects</em> exist after the first line, then count the columns of each one.",
          ar: "‏<code>=</code> تربط اسمًا ولا تبني جدولًا. فاسأل في كل نصف: كم <em>كائنًا</em> يوجد بعد السطر الأول؟ ثم عُدّ أعمدة كلٍّ منها."
        },
        explain: {
          en: "In the first half there is one DataFrame with two names, so <code>work is raw</code> is <code>True</code> and the new column appears in <code>raw</code> as well: 13 columns become 14, and the raw table is no longer what the file holds. In the second half <code>.copy()</code> builds a second object, so <code>safe is raw</code> is <code>False</code>, <code>raw</code> keeps its 13 columns and only <code>safe</code> has 14. Note what did <em>not</em> happen in the first half: no warning, no error, no <code>SettingWithCopyWarning</code> &mdash; that warning fires on a slice, and this is not a slice, it is the whole frame under a second name. One line, <code>work = raw.copy()</code>, removes the entire problem.",
          ar: "في النصف الأول جدولٌ واحد باسمين، فـ<code>work is raw</code> تساوي <code>True</code> ويظهر العمود الجديد في <code>raw</code> أيضًا: فتصير الأعمدة الـ13 أربعةَ عشر، ولا يبقى الجدولُ الخام ما يحمله الملف. وفي النصف الثاني تبني <code>.copy()</code> كائنًا ثانيًا، فـ<code>safe is raw</code> تساوي <code>False</code>، ويُبقي <code>raw</code> أعمدته الـ13 ولا يكون عند غير <code>safe</code> أربعةَ عشر. ولاحظ ما <em>لم</em> يحدث في النصف الأول: لا تحذير ولا خطأ ولا <code>SettingWithCopyWarning</code> &mdash; فذلك التحذيرُ يُطلق على مقطع، وهذا ليس مقطعًا بل الجدولُ كله تحت اسمٍ ثان. وسطرٌ واحد، <code>work = raw.copy()</code>، يحذف المشكلة كلها."
        }
      },

      /* ---------------------------------------------------------- 02 */
      {
        id: "t2bx02", type: "complete", level: "medium",
        topics: ["t2-frame-log-row", "t2-step-report"],
        q: {
          en: "Each of the three steps in <code>PIPELINE</code> takes <code>(frame, fitted)</code> and returns <code>(frame, log_row)</code>: <code>drop_exact_duplicates</code>, <code>void_impossible_rent</code> and <code>fill_rent_with_median</code>, in that order. Complete the body of the loop so that the runner prints the line in the comment.",
          ar: "كلُّ خطوةٍ من الخطوات الثلاث في <code>PIPELINE</code> تأخذ <code>(frame, fitted)</code> وتعيد <code>(frame, log_row)</code>: وهي <code>drop_exact_duplicates</code> و<code>void_impossible_rent</code> و<code>fill_rent_with_median</code> بهذا الترتيب. أكمِل جسم الحلقة ليطبع المشغِّلُ السطرَ الذي في التعليق."
        },
        code: code(
          "def run(df, steps, fitted):",
          "    \"\"\"Apply every step in order; return the frame and the log as a DataFrame.\"\"\"",
          "    log = []",
          "    for fn in steps:",
          "        ____",
          "        log.append(row)",
          "    return df, pd.DataFrame(log)",
          "",
          "raw    = pd.read_csv(\"listings_raw.csv\")        # 503 rows, 14 exact repeats, 19 blank rents",
          "fitted = {\"rent_max_plausible\": 5000, \"rent_median\": 200.0}",
          "",
          "out, log = run(raw, PIPELINE, fitted)",
          "print(log[\"rows_out\"].tolist(), int(out[\"monthly_rent\"].isna().sum()))",
          "",
          "# [489, 489, 489] 0"
        ),
        options: [
          { code: "row = fn(df, fitted)" },
          { code: "df, row = fn(df, fitted)" },
          { code: "df, row = fn(raw, fitted)" },
          { code: "df = fn(df, fitted)" }
        ],
        answer: 1,
        solution: {
          code: code(
            "def run(df, steps, fitted):",
            "    \"\"\"Apply every step in order; return the frame and the log as a DataFrame.\"\"\"",
            "    log = []",
            "    for fn in steps:",
            "        df, row = fn(df, fitted)",
            "        log.append(row)",
            "    return df, pd.DataFrame(log)",
            "",
            "raw    = pd.read_csv(\"listings_raw.csv\")",
            "fitted = {\"rent_max_plausible\": 5000, \"rent_median\": 200.0}",
            "",
            "out, log = run(raw, PIPELINE, fitted)",
            "print(log[\"rows_out\"].tolist(), int(out[\"monthly_rent\"].isna().sum()))"
          ),
          out: code("[489, 489, 489] 0"),
          en: "Unpack the pair and rebind <code>df</code>, so the frame one step returns is the frame the next step receives while the log row goes to the list. The three counts are then 489, 489, 489: step 1 removes the 14 byte-for-byte repeats, and the two steps after it change cells without touching the row count.",
          ar: "فُكَّ الزوجَ وأعِد ربطَ <code>df</code>، ليكون الجدولُ الذي تعيده خطوةٌ هو الجدولَ الذي تستقبله الخطوةُ التالية، ويذهب سطرُ السجل إلى القائمة. فتكون الأعدادُ الثلاثة 489 و489 و489: فالخطوة الأولى تحذف المكرَّرات الـ14 حرفًا بحرف، والخطوتان بعدها تغيّران خلايا ولا تمسّان عددَ الصفوف."
        },
        hint: {
          en: "A step hands back two things. Follow the frame: which name has to point at the step's output before the next turn of the loop?",
          ar: "تُعيد الخطوةُ شيئين. فاتبع الجدول: أيُّ اسمٍ يجب أن يشير إلى خَرج الخطوة قبل الدورة التالية للحلقة؟"
        },
        explain: {
          en: "<code>df, row = fn(df, fitted)</code> is the whole idea of the <code>(frame, log_row)</code> shape: the frame is threaded through the steps and the log rows are collected beside it. Each wrong candidate fails in a way worth recognising. <code>row = fn(df, fitted)</code> makes <code>row</code> the whole tuple and never advances the frame, so <code>log[\"rows_out\"]</code> does not exist and the line raises a <code>KeyError</code>. <code>fn(raw, fitted)</code> is the subtle one: it runs every step on the original 503 rows instead of on what the previous step produced, printing <code>[489, 503, 503]</code> &mdash; three steps that each report truthfully about a frame nobody is building. And <code>df = fn(df, fitted)</code> binds the tuple to <code>df</code>, so <code>log.append(row)</code> raises a <code>NameError</code> on the first turn. The log is only trustworthy because every row in it describes the frame the next row starts from.",
          ar: "‏<code>df, row = fn(df, fitted)</code> هي فكرةُ شكل <code>(frame, log_row)</code> كلها: فالجدولُ يُمرَّر عبر الخطوات وتُجمع أسطرُ السجل بجانبه. ويخطئ كلُّ مرشَّح خاطئ خطأً يستحقّ التعرّف عليه. فـ<code>row = fn(df, fitted)</code> تجعل <code>row</code> الزوجَ كله ولا تُقدّم الجدولَ قط، فلا يوجد <code>log[\"rows_out\"]</code> ويُطلق السطرُ <code>KeyError</code>. و<code>fn(raw, fitted)</code> هي الخفيّة: فهي تُشغّل كل خطوة على الصفوف الـ503 الأصلية بدل ما أنتجته الخطوةُ السابقة، فتطبع <code>[489, 503, 503]</code> &mdash; ثلاثُ خطوات يُبلّغ كلٌّ منها بصدقٍ عن جدولٍ لا يبنيه أحد. وأما <code>df = fn(df, fitted)</code> فتربط الزوجَ بـ<code>df</code>، فيُطلق <code>log.append(row)</code> خطأ <code>NameError</code> في الدورة الأولى. والسجلُّ لا يُؤتمن إلا لأن كلَّ سطر فيه يصف الجدولَ الذي يبدأ منه السطرُ الذي بعده."
        }
      },

      /* ---------------------------------------------------------- 03 */
      /* ---------------------------------------------------------- 04 */
      {
        id: "t2bx04", type: "match", level: "easy",
        topics: ["t2-transform-vs-aggregate", "t2-transformation"],
        q: {
          en: "<code>raw</code> is the 503-row, 13-column scraped file. Match each one-liner to the shape it returns. The shape alone tells you whether a line transformed the table or aggregated it &mdash; and two of these are not what they look like.",
          ar: "‏<code>raw</code> هو الملفُّ المسحوب بـ503 صفوف و13 عمودًا. وصّل كلَّ سطرٍ بالشكل الذي يعيده. والشكلُ وحده يخبرك هل حوّل السطرُ الجدولَ أم جمّعه &mdash; واثنان من هذه ليسا ما يبدوان عليه."
        },
        leftHead: { en: "The line", ar: "السطر" },
        rightHead: { en: "What it returns", ar: "ما يعيده" },
        pairs: [
          { l: { code: "raw.drop_duplicates()" }, r: { code: "(489, 13)" } },
          { l: { code: "raw.sort_values(\"monthly_rent\")" }, r: { code: "(503, 13)" } },
          { l: { code: "raw.assign(r=raw[\"monthly_rent\"] / raw[\"area_m2\"])" }, r: { code: "(503, 14)" } },
          { l: { code: "pd.get_dummies(raw[\"governorate\"])" }, r: { code: "(503, 5)" } },
          { l: { code: "raw.dropna(axis=1)" }, r: { code: "(503, 8)" } },
          { l: { code: "raw.groupby(\"governorate\")[\"monthly_rent\"].mean()" }, r: { code: "(5,)" } },
          { l: { code: "raw.pivot_table(index=\"agency\", values=\"deposit\", aggfunc=\"median\")" }, r: { code: "(18, 1)" } }
        ],
        hint: {
          en: "Three facts settle almost all of it: 14 rows are byte-for-byte repeats, five columns hold a blank somewhere, and the file names 20 agencies &mdash; but two of them never recorded a deposit at all.",
          ar: "ثلاثُ وقائع تحسم معظمه: 14 صفًّا مكرَّراتٌ حرفًا بحرف، وخمسةُ أعمدة تحمل فراغًا في مكان ما، ويُسمّي الملفُّ عشرين وكالة &mdash; غير أن اثنتين منها لم تسجّلا تأمينًا قط."
        },
        explain: {
          en: "A transformation keeps one row meaning one listing: <code>sort_values</code> and <code>assign</code> return 503 rows (the second with a fourteenth column), <code>get_dummies</code> returns 503 rows of five indicator columns, and <code>drop_duplicates</code> returns 503 &minus; 14 = 489. An aggregation changes what a row <em>is</em>: the <code>groupby</code> returns a Series of 5 numbers, one governorate each, and after it no row is a flat any more. The two surprises are the ones worth remembering. <code>dropna(axis=1)</code> keeps all 503 rows and deletes the five columns that hold a blank &mdash; it looks like a row filter and is a column filter. And the <code>pivot_table</code> returns 18 rows, not 20: Noor Estates and Diwan Rentals never published a deposit, so the median has nothing to compute and the group disappears from the result without a word &mdash; an aggregation that silently drops the two agencies you most needed to ask about.",
          ar: "التحويلُ يُبقي الصفَّ الواحد يعني إعلانًا واحدًا: فـ<code>sort_values</code> و<code>assign</code> تعيدان 503 صفوف (والثانيةُ بعمودٍ رابعَ عشر)، وتعيد <code>get_dummies</code> ‏503 صفوف من خمسة أعمدة مؤشِّرة، وتعيد <code>drop_duplicates</code> ‏503 &minus; 14 = 489. وأما التجميعُ فيغيّر <em>ماهيةَ</em> الصف: فتعيد <code>groupby</code> متسلسلةً من خمسة أرقام، لكل محافظة رقم، ولا يكون الصفُّ بعدها شقةً أبدًا. والمفاجأتان هما الجديرتان بالحفظ. فـ<code>dropna(axis=1)</code> تُبقي الصفوفَ الـ503 كلها وتحذف الأعمدةَ الخمسة التي تحمل فراغًا &mdash; فهي تشبه مرشّحَ صفوف وهي مرشّحُ أعمدة. و<code>pivot_table</code> تعيد 18 صفًّا لا 20: فـNoor Estates وDiwan Rentals لم تنشرا تأمينًا قط، فلا يكون للوسيط ما يحسبه وتختفي المجموعةُ من النتيجة بلا كلمة &mdash; تجميعٌ يُسقط بصمتٍ الوكالتين اللتين كان سؤالُك عنهما أوجب."
        }
      },

      /* ---------------------------------------------------------- 05 */
      {
        id: "t2bx05", type: "complete", level: "medium",
        topics: ["t2-group-imputation", "t2-missing-next-month"],
        q: {
          en: "The area fill of Lesson 2, applied to June. <code>fitted</code> is measured on March's 377 training rows: <code>area_by_rooms</code> comes out as <code>{0: 37.4, 1: 37.0, 2: 54.4, 3: 72.5, 4: 88.0, 5: 104.3, 12: 34.0}</code> and <code>area_median</code> as 73.45. Complete the line so that the program prints exactly the two lines in the comment.",
          ar: "تعبئةُ المساحة في الدرس 2 مطبَّقةً على حزيران. و<code>fitted</code> مقيسٌ على صفوف التدريب الـ377 في آذار: فتخرج <code>area_by_rooms</code> ‏<code>{0: 37.4, 1: 37.0, 2: 54.4, 3: 72.5, 4: 88.0, 5: 104.3, 12: 34.0}</code> وتخرج <code>area_median</code> ‏73.45. أكمِل السطر ليطبع البرنامجُ السطرين في التعليق بالضبط."
        },
        code: code(
          "train  = pd.read_csv(\"listings_raw.csv\").sample(frac=0.75, random_state=3)",
          "fitted = {\"area_by_rooms\": train.groupby(\"rooms\")[\"area_m2\"].median().to_dict(),",
          "          \"area_median\":   float(train[\"area_m2\"].median())}",
          "",
          "def impute_area(d, f):",
          "    guess = ____",
          "    return d.assign(area_m2_missing=d[\"area_m2\"].isna(),",
          "                    area_m2=d[\"area_m2\"].fillna(guess))",
          "new = pd.read_csv(\"listings_new.csv\")   # 85 June rows, rooms 1 to 5, 3 blank areas",
          "out = impute_area(new, fitted)",
          "print(int(new[\"area_m2\"].isna().sum()), int(out[\"area_m2\"].isna().sum()))",
          "print(round(float(out[\"area_m2\"].mean()), 4))",
          "",
          "# 3 0",
          "# 74.0276"
        ),
        options: [
          { code: "d.groupby(\"rooms\")[\"area_m2\"].transform(\"median\")" },
          { code: "d[\"area_m2\"].median()" },
          { code: "d[\"rooms\"].map(f[\"area_by_rooms\"]).fillna(f[\"area_median\"])" },
          { code: "f[\"area_median\"]" }
        ],
        answer: 2,
        solution: {
          code: code(
            "def impute_area(d, f):",
            "    guess = d[\"rooms\"].map(f[\"area_by_rooms\"]).fillna(f[\"area_median\"])",
            "    return d.assign(area_m2_missing=d[\"area_m2\"].isna(),",
            "                    area_m2=d[\"area_m2\"].fillna(guess))",
            "",
            "new = pd.read_csv(\"listings_new.csv\")",
            "out = impute_area(new, fitted)",
            "print(int(new[\"area_m2\"].isna().sum()), int(out[\"area_m2\"].isna().sum()))",
            "print(round(float(out[\"area_m2\"].mean()), 4))"
          ),
          out: code("3 0", "74.0276"),
          en: "<code>.map()</code> looks each row's <code>rooms</code> up in the stored table, and <code>.fillna(f[\"area_median\"])</code> catches any rooms count the fit never saw. Both numbers come out of <code>f</code> and nothing is measured on June, which is exactly why the line also works on a single listing.",
          ar: "تبحث <code>.map()</code> عن <code>rooms</code> كلِّ صف في الجدول المخزَّن، وتُدرك <code>.fillna(f[\"area_median\"])</code> أيَّ عددِ غرفٍ لم يرَه الضبطُ قط. فالرقمان كلاهما من <code>f</code> ولا يُقاس شيءٌ على حزيران، وهذا بالضبط ما يجعل السطرَ يعمل أيضًا على إعلانٍ واحد."
        },
        hint: {
          en: "Everything the step is allowed to know is in <code>f</code>. Two of the candidates read a number out of <code>d</code> instead, and one of those two still fills all three holes, so compare the means rather than the counts.",
          ar: "كلُّ ما يحقّ للخطوة أن تعرفه في <code>f</code>. ويقرأ مرشَّحان رقمًا من <code>d</code> عوضًا عن ذلك، وأحدُهما يعبّئ الثقوبَ الثلاثة كلها، فقارن المتوسطات لا الأعداد."
        },
        explain: {
          en: "The step is a pure apply: it reads the two parameters out of <code>f</code> and measures nothing on the frame it is given, which is why it prints the same 74.0276 whether it is handed June's 85 rows or one of them. The other three all fill the three holes, so the first printed line cannot separate them &mdash; the mean can. <code>transform(\"median\")</code> refits the group medians on June itself and gives 74.1482: a step whose answer changes with the batch it is run on, and on a batch where a whole rooms group has no area it silently returns <code>NaN</code>. <code>d[\"area_m2\"].median()</code> refits a global centre on June (74.6) for 74.5282, which is the same refit without even the group. <code>f[\"area_median\"]</code> is honestly fitted and gives 74.4876, but it throws away the only thing the step was built for: a 1-room flat and a 5-room flat are both given 73.45 m&sup2;. And note why the fallback in the right answer is not decoration: June's rooms run 1 to 5, so it is never used here &mdash; hand the same function a 7-room flat and without it the hole stays open and the assertion at the end of the pipeline fires.",
          ar: "الخطوةُ تطبيقٌ محض: فهي تقرأ الوسيطين من <code>f</code> ولا تقيس شيئًا على الجدول الذي تُعطاه، ولذلك تطبع 74.0276 نفسها سواءٌ أُعطيت صفوفَ حزيران الـ85 أم صفًّا واحدًا منها. والثلاثةُ الأخرى تعبّئ الثقوبَ الثلاثة كلها، فلا يستطيع السطرُ المطبوع الأول أن يفرّق بينها &mdash; والمتوسطُ يستطيع. فـ<code>transform(\"median\")</code> تعيد ضبطَ وسائط المجموعات على حزيران نفسه فتعطي 74.1482: خطوةٌ يتغيّر جوابها بتغيّر الدفعة التي تُشغَّل عليها، وفي دفعةٍ تخلو فيها مجموعةُ غرفٍ كاملة من أي مساحة تعيد <code>NaN</code> بصمت. و<code>d[\"area_m2\"].median()</code> تعيد ضبطَ مركزٍ عامٍّ على حزيران (74.6) فتعطي 74.5282، وهي إعادةُ الضبط نفسها بلا مجموعةٍ حتى. و<code>f[\"area_median\"]</code> مضبوطةٌ بأمانة وتعطي 74.4876، لكنها ترمي الشيءَ الوحيد الذي بُنيت الخطوةُ له: فتُعطى شقةُ الغرفة الواحدة وشقةُ الغرف الخمس 73.45 م² كلتاهما. ولاحظ لمَ البديلُ في الجواب الصحيح ليس زينة: فغرفُ حزيران تجري من 1 إلى 5، فلا يُستعمل هنا قط &mdash; وأعطِ الدالّةَ نفسها شقةً بسبع غرف فيبقى الثقبُ بدونه مفتوحًا ويُطلق التأكيدُ في آخر المسار."
        }
      },

      /* ---------------------------------------------------------- 06 */
      {
        id: "t2bx06", type: "fill", level: "easy",
        topics: ["t2-listwise-deletion", "t2-dropna-options"],
        q: {
          en: "Fill in the three blanks so that the program prices listwise deletion on the 503 scraped rows: how many rows it costs, how many of those rows had the target the model is meant to learn, and how many rows giving up one column buys back. The comments are what it prints.",
          ar: "املأ الفراغات الثلاثة ليُسعّر البرنامجُ الحذفَ الصفّي الكامل على الصفوف الـ503 المسحوبة: كم صفًّا يكلّف، وكم من تلك الصفوف كان يحمل الهدفَ الذي يُراد للنموذج أن يتعلّمه، وكم صفًّا يستردّه التنازلُ عن عمود واحد. والتعليقاتُ هي ما يطبعه."
        },
        code: code(
          "raw  = pd.read_csv(\"listings_raw.csv\")              # 503 rows, 13 columns",
          "kept = raw.____1____()                              # 329 rows with no blank anywhere",
          "",
          "print(len(raw) - len(kept))                                                   # 174",
          "print(int((raw[\"monthly_rent\"].____2____() & raw.isna().any(axis=1)).sum()))   # 155",
          "print(len(raw.drop(____3____=[\"deposit\"]).dropna()) - len(kept))               # 91"
        ),
        blanks: [
          { accept: ["dropna"], label: { en: "1", ar: "1" } },
          { accept: ["notna", "notnull"], label: { en: "2", ar: "2" } },
          { accept: ["columns"], label: { en: "3", ar: "3" } }
        ],
        hint: {
          en: "The first blank is the one-word rule everybody writes first. The second has to be the opposite of <code>isna()</code>, because the line counts rows that <em>had</em> a rent and were deleted anyway. The third is the keyword that makes <code>drop</code> delete a column instead of a row label.",
          ar: "الفراغُ الأول هو القاعدةُ ذاتُ الكلمة الواحدة التي يكتبها الجميعُ أولًا. والثاني يجب أن يكون نقيضَ <code>isna()</code>، لأن السطرَ يعدّ صفوفًا <em>كانت</em> تحمل إيجارًا وحُذفت رغم ذلك. والثالثُ هو الوسيطُ الذي يجعل <code>drop</code> تحذف عمودًا لا وسمَ صف."
        },
        explain: {
          en: "<code>dropna()</code> deletes a row for any blank at all, so it costs 174 of the 503 rows &mdash; and 155 of those 174 had a published rent. That is the number that makes the rule indefensible here: the deletions are not paying for missing targets, they are paying for a blank <code>deposit</code> on a row whose rent was there all along. The third line prices the alternative: drop the <code>deposit</code> column, whose blanks caused most of the damage, and 420 rows survive instead of 329 &mdash; 91 rows bought with one column. <code>notna()</code> rather than <code>isna()</code> is the whole point of the middle line; <code>notnull()</code> is its older alias and does the same thing. And <code>drop(columns=[...])</code> is the explicit form worth preferring over <code>axis=1</code>, because it says in the call which kind of label it is deleting.",
          ar: "تحذف <code>dropna()</code> صفًّا لأيّ فراغ كان، فتكلّف 174 من الصفوف الـ503 &mdash; و155 من تلك الـ174 كانت تحمل إيجارًا منشورًا. وهذا هو الرقمُ الذي يجعل القاعدةَ هنا بلا مدافع: فالحذفُ لا يُسدّد عن أهدافٍ مفقودة، بل يُسدّد عن <code>deposit</code> فارغ في صفٍّ كان إيجارُه موجودًا طولَ الوقت. ويُسعّر السطرُ الثالث البديل: احذف عمودَ <code>deposit</code> الذي سبّبت فراغاتُه معظمَ الضرر، فينجو 420 صفًّا بدل 329 &mdash; أي 91 صفًّا اشتُريت بعمودٍ واحد. و<code>notna()</code> لا <code>isna()</code> هي مقصودُ السطر الأوسط كله؛ و<code>notnull()</code> اسمُها الأقدم وتفعل الشيءَ نفسه. و<code>drop(columns=[...])</code> هي الصورةُ الصريحة التي تُفضَّل على <code>axis=1</code>، لأنها تقول في النداء أيَّ نوعٍ من الأوسمة تحذف."
        }
      },

      /* ---------------------------------------------------------- 07 */
      {
        id: "t2bx07", type: "error", level: "medium",
        topics: ["t2-deposit-rule", "t2-missing-decision-table"],
        q: {
          en: "The deposit step of Lesson 2's decision table. <code>fit_missing</code> is the fit: it measures the months-of-rent multiple per agency on the rows it is given. <code>impute_deposit</code> is meant to be a pure apply &mdash; it may read <code>f</code> and it may learn nothing. It runs, it fills every deposit it can, it raises nothing, and the two commented lines show what happens when it is handed a frame it was not fitted on. Click the offending line.",
          ar: "خطوةُ التأمين في جدول قرارات الدرس 2. فـ<code>fit_missing</code> هي الضبط: تقيس مضاعفَ أشهر الإيجار لكل وكالة على الصفوف التي تُعطاها. و<code>impute_deposit</code> يُراد لها أن تكون تطبيقًا محضًا &mdash; يحقّ لها أن تقرأ <code>f</code> ولا يحقّ لها أن تتعلّم شيئًا. وهي تعمل وتعبّئ كلَّ تأمينٍ تستطيعه ولا تُطلق شيئًا، والسطران المعلَّقان يُظهران ما يحدث إذا أُعطيت جدولًا لم تُضبط عليه. انقر السطر المخطئ."
        },
        code: code(
          "def fit_missing(df):",
          "    ok = df[\"deposit\"].notna() & df[\"monthly_rent\"].notna()",
          "    months = df.loc[ok, \"deposit\"] / df.loc[ok, \"monthly_rent\"]",
          "    return {\"dep_months\": months.groupby(df[\"agency\"][ok]).median().to_dict(),",
          "            \"dep_months_all\": float(months.median())}",
          "",
          "def impute_deposit(d, f):                  # APPLY: may read f, may learn nothing",
          "    n = int(d[\"deposit\"].isna().sum())",
          "    ok = d[\"deposit\"].notna() & d[\"monthly_rent\"].notna()",
          "    mult = (d.loc[ok, \"deposit\"] / d.loc[ok, \"monthly_rent\"]).groupby(d[\"agency\"][ok]).median()",
          "    guess = d[\"agency\"].map(mult).fillna(f[\"dep_months_all\"]) * d[\"monthly_rent\"]",
          "    out = d.assign(deposit_missing=d[\"deposit\"].isna(),",
          "                   deposit=d[\"deposit\"].fillna(guess))",
          "    return out, {\"step\": \"impute_deposit\", \"n\": n, \"rows_out\": len(out)}",
          "",
          "fitted = fit_missing(train)                # FIT: the 377 training rows of March",
          "out, row = impute_deposit(held, fitted)    # the 126 rows nothing may learn from",
          "",
          "# fit_missing(train) : 15 agencies, dep_months_all 2.0",
          "# inside the apply   : 13 agencies, global 1.0 -> 36 of its 42 fills differ"
        ),
        answer: 10,
        solution: {
          code: code(
            "def impute_deposit(d, f):                  # APPLY: may read f, may learn nothing",
            "    n = int(d[\"deposit\"].isna().sum())",
            "    mult = pd.Series(f[\"dep_months\"])      # the stored multiples; nothing is measured",
            "    guess = d[\"agency\"].map(mult).fillna(f[\"dep_months_all\"]) * d[\"monthly_rent\"]",
            "    out = d.assign(deposit_missing=d[\"deposit\"].isna(),",
            "                   deposit=d[\"deposit\"].fillna(guess))",
            "    return out, {\"step\": \"impute_deposit\", \"n\": n, \"rows_out\": len(out)}"
          ),
          out: code(
            "mean deposit on the 126 held-out rows, stored multiples : 339.1322",
            "mean deposit on the 126 held-out rows, refitted inside  : 282.2934"
          ),
          en: "Delete the measurement and read the multiples out of <code>f</code>. <code>fit_missing</code> already computed them and already put them in <code>dep_months</code>; the apply only has to look each row's agency up and fall back to the stored global multiple. Both the <code>ok</code> mask and the <code>groupby</code> can go with it, because nothing in the step needs to know which rows have a deposit except the <code>fillna</code> itself.",
          ar: "احذف القياسَ واقرأ المضاعفاتِ من <code>f</code>. فقد حسبتها <code>fit_missing</code> أصلًا ووضعتها في <code>dep_months</code>؛ ولا يبقى على التطبيق إلا أن يبحث عن وكالة كلِّ صف وأن يرتدّ إلى المضاعف العامّ المخزَّن. ويذهب معها قناعُ <code>ok</code> و<code>groupby</code> كلاهما، لأن لا شيءَ في الخطوة يحتاج أن يعرف أيَّ الصفوف له تأمين إلا <code>fillna</code> نفسها."
        },
        hint: {
          en: "Read the signature's comment and then find every line that measures something. <code>f</code> is used exactly once in the body &mdash; and the parameter it supplies is not the one the step mainly fills with.",
          ar: "اقرأ تعليقَ الترويسة ثم اعثر على كل سطرٍ يقيس شيئًا. فـ<code>f</code> تُستعمل مرةً واحدة بالضبط في الجسم &mdash; والوسيطُ الذي تُقدّمه ليس هو الذي تعبّئ به الخطوةُ في الأغلب."
        },
        explain: {
          en: "Line 10 measures a parameter inside the apply. Everything else in the function is fine: the flag is taken from the original column before the fill, <code>assign</code> leaves the caller's frame alone, the log row counts the cells it changed, and <code>f[\"dep_months_all\"]</code> on line 11 is read correctly from the fit. But <code>mult</code> is learned from whatever frame <code>d</code> happens to be, which makes the step a fit disguised as an apply, and the two consequences are both in the comment. On the held-out rows it finds only 13 agencies instead of 15 and a global multiple of 1.0 instead of 2.0, so 36 of the 42 deposits it fills come out different &mdash; the held-out rows were used to choose the numbers they are then scored with, which is leakage with no visible symptom. And it cannot run at all on a batch that carries no deposits: hand it three July listings whose deposit column is blank and <code>months</code> is empty, its median is <code>NaN</code>, and the step leaves all three holes open while reporting that it tried. The rule the lesson states is short: a function whose job is to apply may read parameters, never produce them.",
          ar: "السطرُ 10 يقيس وسيطًا داخلَ التطبيق. وكلُّ ما سواه في الدالّة حسن: فالعلَمُ يُؤخذ من العمود الأصلي قبل التعبئة، و<code>assign</code> تترك جدولَ المنادي وحده، وسطرُ السجل يعدّ الخلايا التي غيّرها، و<code>f[\"dep_months_all\"]</code> في السطر 11 تُقرأ من الضبط قراءةً صحيحة. غير أن <code>mult</code> متعلَّمةٌ من أيِّ جدولٍ كان <code>d</code>، وهذا يجعل الخطوةَ ضبطًا متلبّسًا بثوب تطبيق، والنتيجتان كلتاهما في التعليق. فهي تجد على الصفوف المحجوزة 13 وكالة لا 15 ومضاعفًا عامًّا 1.0 لا 2.0، فتخرج 36 من التأمينات الـ42 التي تعبّئها مختلفةً &mdash; أي إن الصفوفَ المحجوزة استُعملت لاختيار الأرقام التي ستُقيَّم بها، وهذا تسرّبٌ بلا عَرَضٍ ظاهر. وهي لا تستطيع العملَ أصلًا على دفعةٍ لا تحمل تأمينات: أعطِها ثلاثةَ إعلانات من تموز عمودُ تأمينها فارغ، فتكون <code>months</code> خاليةً ووسيطُها <code>NaN</code>، وتترك الخطوةُ الثقوبَ الثلاثة مفتوحةً وهي تُبلّغ أنها حاولت. والقاعدةُ التي يقولها الدرسُ قصيرة: الدالّةُ التي عملها التطبيقُ يحقّ لها أن تقرأ وسائط ولا يحقّ لها أن تُنتجها قط."
        }
      },

      /* ---------------------------------------------------------- 08 */
      {
        id: "t2bx08", type: "multi", level: "medium",
        topics: ["t2-missing-decision-table", "t2-missing-decisions", "t2-never-impute-target"],
        q: {
          en: "The five steps of Lesson 2's missing-data stage, run on <code>rep</code> &mdash; the 503 scraped rows with listing 5062's 99999 already voided &mdash; with parameters fitted on the training rows. The raw file holds 36 blank conditions. Which of these readings of the log are true? (Choose all that apply.)",
          ar: "الخطواتُ الخمس لمرحلة المفقود في الدرس 2، مُشغَّلةً على <code>rep</code> &mdash; الصفوف الـ503 المسحوبة وقد أُبطلت 99999 في الإعلان 5062 &mdash; بوسائط مضبوطة على صفوف التدريب. ويحمل الملفُّ الخام 36 حالةً فارغة. فأيُّ هذه القراءات للسجل صحيح؟ (اختر كل ما ينطبق.)"
        },
        code: code(
          "      column   n mechanism                            decision  rows_in  rows_out  cells_changed",
          "monthly_rent  20      MNAR                        drop the row      503       483              0",
          "     area_m2  27      MCAR             median per rooms + flag      483       483             27",
          "       floor   9      MCAR                leave blank, flag it      483       483              0",
          "   condition  33   unknown                         mode + flag      483       483             33",
          "     deposit 104       MAR agency months-of-rent x rent + flag      483       483             104",
          "",
          "rep : (503, 13) with 215 blank cells",
          "out : (483, 18) with 18 blank cells",
          "what is still blank: {'floor': 9, 'floor_num': 9}"
        ),
        options: [
          {
            en: "The 18 cells still blank are the nine blank floors counted twice &mdash; once in <code>floor</code> and once in the <code>floor_num</code> the step derives &mdash; because the decision for that column was to flag the hole and not to fill it.",
            ar: "الخلايا الـ18 التي ما زالت فارغة هي الطوابقُ الفارغة التسعة معدودةً مرتين &mdash; مرةً في <code>floor</code> ومرةً في <code>floor_num</code> التي تُشتقّها الخطوة &mdash; لأن القرارَ في ذلك العمود كان أن يُعلَّم الثقبُ لا أن يُعبَّأ."
          },
          {
            en: "<code>condition</code> reports 33 rather than the 36 the raw file holds because the mode fill had already reached three of them by the time the count was taken.",
            ar: "يُبلّغ <code>condition</code> عن 33 لا عن الـ36 التي يحملها الملفُّ الخام لأن تعبئةَ المنوال كانت قد أدركت ثلاثًا منها حين أُخذ العدّ."
          },
          {
            en: "Five columns were added &mdash; four <code>_missing</code> flags and <code>floor_num</code> &mdash; which is how a 13-column frame became an 18-column one.",
            ar: "أُضيفت خمسةُ أعمدة &mdash; أربعةُ أعلام <code>_missing</code> و<code>floor_num</code> &mdash; وبهذا صار الجدولُ ذو الأعمدة الـ13 ذا ثمانيةَ عشرَ عمودًا."
          },
          {
            en: "<code>deposit</code>'s 104 blanks were filled with the median deposit of each row's own agency, which the lesson's hide-a-quarter experiment measured as the best of the four candidate rules.",
            ar: "عُبّئت فراغاتُ <code>deposit</code> الـ104 بوسيط تأمين وكالة كلِّ صف، وهي القاعدةُ التي قاسها تجريبُ إخفاء الربع في الدرس أفضلَ القواعد الأربع المرشَّحة."
          },
          {
            en: "<code>monthly_rent</code> is the only column whose blanks were answered by deleting rows: 20 rows leave and <code>cells_changed</code> is 0, because a target is dropped and never filled.",
            ar: "‏<code>monthly_rent</code> هو العمودُ الوحيد الذي أُجيبت فراغاتُه بحذف صفوف: فتخرج 20 صفًّا وتكون <code>cells_changed</code> صفرًا، لأن الهدفَ يُحذف ولا يُعبَّأ قط."
          },
          {
            en: "Every step after the first reports <code>rows_out</code> equal to <code>rows_in</code>, so the stage is idempotent and may safely be run a second time on its own output.",
            ar: "يُبلّغ كلُّ خطوة بعد الأولى عن <code>rows_out</code> مساويةٍ لـ<code>rows_in</code>، فتكون المرحلةُ خاملةَ التكرار ويجوز تشغيلها مرةً ثانية على خَرجها بأمان."
          }
        ],
        answer: [0, 2, 4],
        hint: {
          en: "Work out which rows left the frame in step one, and then ask what they were carrying. Two of the options are arithmetic you can check against the printed shapes; two are claims about what a decision <em>means</em> that the log itself contradicts.",
          ar: "استخرج أيَّ الصفوف خرجت من الجدول في الخطوة الأولى، ثم اسأل: ماذا كانت تحمل؟ فخياران حسابٌ تستطيع فحصه في مقابل الأشكال المطبوعة؛ وخيارانِ ادّعاءان عن <em>معنى</em> قرارٍ ما يُكذّبهما السجلُّ نفسه."
        },
        explain: {
          en: "The 18 remaining blanks are the nine blank floors in two columns, which is the decision working as designed: a floor nobody typed is left missing and flagged, because the alternative &mdash; calling it floor 2 because that is the commonest &mdash; invents a fact. The five new columns (<code>area_m2_missing</code>, <code>floor_missing</code>, <code>floor_num</code>, <code>condition_missing</code>, <code>deposit_missing</code>) are what take 13 columns to 18. And the target is the one column the stage answers by deletion: <code>cells_changed</code> is 0 on that row because filling a rent would be inventing the answer the model is asked to predict. Of the three wrong readings, the <code>condition</code> one is the trap: 36 &minus; 33 = 3 is right arithmetic with the causation reversed &mdash; those three rows were among the 20 that left with the target in step one, so they were never offered to the mode fill at all; step order, not the fill, explains the count. The deposit option quietly upgrades the decision: the step multiplies the agency's months-of-rent by <em>this row's</em> rent, which is not the agency's median deposit, and the lesson measured the per-agency median losing to the global one (164.01 against 156.41 over five splits). And idempotence does not follow from equal row counts: run the stage again and the flags are recomputed from columns that are now full, so every <code>_missing</code> column comes back all <code>False</code> &mdash; the same silent failure as flagging after filling.",
          ar: "الفراغاتُ الـ18 الباقية هي الطوابقُ الفارغة التسعة في عمودين، وهذا هو القرارُ يعمل كما صُمّم: فالطابقُ الذي لم يكتبه أحد يُترك مفقودًا ويُعلَّم، لأن البديلَ &mdash; أن نسمّيه الطابقَ الثاني لأنه الأشيع &mdash; اختلاقُ واقعة. والأعمدةُ الخمسة الجديدة (<code>area_m2_missing</code> و<code>floor_missing</code> و<code>floor_num</code> و<code>condition_missing</code> و<code>deposit_missing</code>) هي التي تأخذ 13 عمودًا إلى 18. والهدفُ هو العمودُ الوحيد الذي تجيبه المرحلةُ بالحذف: فـ<code>cells_changed</code> صفرٌ في ذلك السطر لأن تعبئةَ إيجارٍ اختلاقٌ للجواب الذي يُطلب من النموذج أن يتنبأ به. ومن القراءات الثلاث الخاطئة تكون قراءةُ <code>condition</code> هي الفخّ: فـ36 &minus; 33 = 3 حسابٌ صحيح بسببيّةٍ مقلوبة &mdash; فتلك الصفوفُ الثلاثة كانت من الـ20 التي خرجت مع الهدف في الخطوة الأولى، فلم تُعرض على تعبئة المنوال قط؛ فترتيبُ الخطوات لا التعبئةُ هو ما يفسّر العدّ. وأما خيارُ التأمين فيُرقّي القرارَ بهدوء: فالخطوةُ تضرب أشهرَ إيجار الوكالة في إيجار <em>هذا الصف</em>، وهذا ليس وسيطَ تأمين الوكالة، وقد قاس الدرسُ وسيطَ الوكالة خاسرًا أمام العامّ (164.01 في مقابل 156.41 على خمس قسمات). وخمولُ التكرار لا يلزم من تساوي أعداد الصفوف: فأعِد تشغيلَ المرحلة فتُحسب الأعلامُ من جديد من أعمدةٍ صارت ممتلئة، فيرجع كلُّ عمود <code>_missing</code> كلَّه <code>False</code> &mdash; وهو العطبُ الصامت نفسه الذي في التعليم بعد التعبئة."
        }
      },

      /* ---------------------------------------------------------- 09 */
      {
        id: "t2bx09", type: "output", level: "easy",
        topics: ["t2-normalisation", "t2-city-spellings", "t2-advert-templates"],
        q: {
          en: "Write exactly what the program prints. One normalising rule, applied step by step to three columns of the 503 scraped rows: <code>city</code> (five real cities), <code>advert</code> (eight template sentences, some retyped) and <code>furnished</code> (one yes-or-no question). Each tuple counts the distinct strings after each step of the rule.",
          ar: "اكتب بالضبط ما يطبعه البرنامج. قاعدةُ تنميطٍ واحدة مطبَّقة خطوةً خطوة على ثلاثة أعمدة من الصفوف الـ503 المسحوبة: <code>city</code> (خمسُ مدن حقيقية) و<code>advert</code> (ثماني جمل قالبية بعضها أُعيد كتابته) و<code>furnished</code> (سؤالٌ واحد بنعم أو لا). ويعدّ كلُّ ثلاثيٍّ السلاسلَ المميّزة بعد كل خطوة من القاعدة."
        },
        code: code(
          "def ladder(s):",
          "    return (s.nunique(),",
          "            s.str.strip().nunique(),",
          "            s.str.strip().str.lower().nunique(),",
          "            s.str.strip().str.lower()",
          "             .str.replace(r\"\\s+\", \" \", regex=True).nunique())",
          "",
          "print(ladder(raw[\"city\"]))",
          "print(ladder(raw[\"advert\"]))",
          "print(ladder(raw[\"furnished\"]))"
        ),
        blanks: [
          { accept: ["(26, 20, 11, 11)\n(47, 22, 22, 14)\n(12, 10, 8, 8)"], lines: 3 }
        ],
        hint: {
          en: "Each step can only ever lower the count or leave it. Ask of each column which kind of difference it actually contains: the one at the ends of the string, the one in the capitals, or the one in a run of two spaces in the middle.",
          ar: "لا تستطيع الخطوةُ إلا أن تُنزل العدّ أو تُبقيه. فاسأل في كل عمود: أيَّ نوعٍ من الاختلاف يحتويه فعلًا؟ الذي في طرفَي السلسلة، أم الذي في الحروف الكبيرة، أم الذي في جَرْيةِ مسافتين في الوسط."
        },
        explain: {
          en: "Three columns, one rule, three different stories. <code>city</code> arrives in 26 spellings; stripping the ends removes 6 of them, lowercasing removes 9 more, and collapsing inner space runs removes none &mdash; it stops at 11, because <em>Khan Yunis</em> and <em>Khan Younis</em>, and <em>Jabalya</em> and <em>Jabalia</em>, differ by letters no rule can reconcile. That 11 is where a canonical map has to take over. <code>advert</code> is the mirror image: 47 down to 22 on the strip, nothing from lowercasing (the sentences are typed in one case), and then 22 down to 14 on the collapse, because the retyped adverts carry a double space in the middle. <code>furnished</code> is the third pattern: 12 down to 10 on the strip (<code>' no'</code> and <code>'yes '</code> join their neighbours), down to 8 on the lowercase (<code>'FALSE'</code>, <code>'N'</code>, <code>'No'</code>, <code>'Y'</code>, <code>'Yes'</code>, <code>'TRUE'</code> collapse into existing spellings), and nothing from the collapse. The rule to carry away: the same four lines are worth running on every text column, and what they cannot close is exactly what you have to decide by hand.",
          ar: "ثلاثةُ أعمدة وقاعدةٌ واحدة وثلاثُ حكايات مختلفة. فـ<code>city</code> يصل بـ26 تهجئة؛ يحذف تشذيبُ الطرفين ستًّا منها، ويحذف التصغيرُ تسعًا أخرى، ولا يحذف ضغطُ جَرْيات المسافات الداخلية شيئًا &mdash; فيتوقف عند 11، لأن <em>Khan Yunis</em> و<em>Khan Younis</em>، و<em>Jabalya</em> و<em>Jabalia</em>، تفترقان بحروفٍ لا تستطيع قاعدةٌ أن تجمعها. وعند الـ11 يجب أن تتولّى خريطةٌ معيارية. و<code>advert</code> صورتُه المعكوسة: 47 إلى 22 بالتشذيب، ولا شيء من التصغير (فالجملُ مكتوبة بحالةٍ واحدة)، ثم 22 إلى 14 بالضغط، لأن الإعلاناتَ المعادَ كتابتها تحمل مسافةً مزدوجة في الوسط. و<code>furnished</code> هو النمطُ الثالث: 12 إلى 10 بالتشذيب (فتنضمّ <code>' no'</code> و<code>'yes '</code> إلى جارتيهما)، إلى 8 بالتصغير (فتندمج <code>'FALSE'</code> و<code>'N'</code> و<code>'No'</code> و<code>'Y'</code> و<code>'Yes'</code> و<code>'TRUE'</code> في تهجئاتٍ قائمة)، ولا شيء من الضغط. والقاعدةُ التي تُحمَل: الأسطرُ الأربعة نفسها تستحقّ أن تُشغَّل على كل عمود نصّي، والذي لا تستطيع إغلاقَه هو بالضبط ما عليك أن تقرّره بيدك."
        }
      },

      /* ---------------------------------------------------------- 10 */
      {
        id: "t2bx10", type: "complete", level: "medium",
        topics: ["t2-text-flags", "t2-repost-flag"],
        q: {
          en: "<code>advert</code> is a sentence, so it cannot be averaged, and it arrives in 47 spellings of 8 templates, so one-hot encoding it is useless. Lesson 3's answer is a handful of honest flags. The text has already been stripped and collapsed and lowercased once. Complete the comprehension so that the program prints exactly the two lines in the comment.",
          ar: "‏<code>advert</code> جملةٌ فلا يمكن حسابُ متوسطها، ويصل بـ47 تهجئة لثمانية قوالب فيكون ترميزُه الأحادي عاطلًا. وجوابُ الدرس 3 حُزمةُ أعلامٍ أمينة. وقد شُذِّب النصُّ وضُغط وصُغِّر مرةً واحدة. أكمِل الاستيعابَ ليطبع البرنامجُ السطرين في التعليق بالضبط."
        },
        code: code(
          "FLAGS = {\"has_generator\":   r\"generator\",",
          "         \"has_solar\":       r\"solar\",",
          "         \"near_university\": r\"universit\",      # university and universities",
          "         \"is_repost\":       r\"still available\"}",
          "",
          "txt  = raw[\"advert\"].str.strip().str.replace(r\"\\s+\", \" \", regex=True)",
          "low  = txt.str.lower()                           # normalise ONCE, match many times",
          "feat = pd.DataFrame({name: ____ for name, pattern in FLAGS.items()})",
          "",
          "print(feat.sum().to_dict())",
          "print(int(feat[\"is_repost\"].sum()), raw.loc[feat[\"is_repost\"], \"listing_id\"].nunique())",
          "",
          "# {'has_generator': 71, 'has_solar': 62, 'near_university': 50, 'is_repost': 9}",
          "# 9 9"
        ),
        options: [
          { code: "low.isin([pattern])" },
          { code: "low.str.find(pattern)" },
          { code: "low.str.match(pattern)" },
          { code: "low.str.contains(pattern, regex=True)" }
        ],
        answer: 3,
        solution: {
          code: code(
            "feat = pd.DataFrame({name: low.str.contains(pattern, regex=True)",
            "                     for name, pattern in FLAGS.items()})",
            "",
            "print(feat.sum().to_dict())",
            "print(int(feat[\"is_repost\"].sum()), raw.loc[feat[\"is_repost\"], \"listing_id\"].nunique())"
          ),
          out: code(
            "{'has_generator': 71, 'has_solar': 62, 'near_university': 50, 'is_repost': 9}",
            "9 9"
          ),
          en: "<code>str.contains</code> asks whether the pattern appears <em>anywhere</em> in the sentence, which is the only question a flag like this can be asking: <code>generator</code> sits in the middle of &ldquo;Family flat, three bedrooms, big kitchen, generator available&rdquo;. The result is a boolean column per flag, so <code>.sum()</code> counts the rows and the frame can be used directly as a mask.",
          ar: "تسأل <code>str.contains</code> هل يظهر النمطُ في <em>أيّ موضع</em> من الجملة، وهذا هو السؤالُ الوحيد الذي يستطيع علَمٌ كهذا أن يسأله: فـ<code>generator</code> تقع في وسط «Family flat, three bedrooms, big kitchen, generator available». والنتيجةُ عمودٌ منطقي لكل علَم، فتعدّ <code>.sum()</code> الصفوفَ ويمكن استعمالُ الجدول قناعًا مباشرةً."
        },
        hint: {
          en: "Read where in the sentence each pattern actually sits, then ask of each candidate what part of the string it is allowed to look at &mdash; and what <em>type</em> of value it hands back, because the second printed line uses the column as a mask.",
          ar: "اقرأ أين تقع كلُّ نمطٍ فعلًا في الجملة، ثم اسأل كلَّ مرشَّح: أيَّ جزءٍ من السلسلة يحقّ له أن ينظر فيه؟ وأيَّ <em>نوعٍ</em> من القيم يعيد؟ لأن السطرَ المطبوع الثاني يستعمل العمودَ قناعًا."
        },
        explain: {
          en: "The counts are the measurement that makes the flags worth having: 71 adverts mention a generator, 62 a solar heater, 50 the university, and 9 end in &ldquo;- still available&rdquo; &mdash; and those 9 rows are 9 distinct <code>listing_id</code>s, exactly the nine reposted flats that <code>drop_duplicates()</code> could not see. A text flag found the structural duplicate. Each wrong candidate is a real confusion with a different symptom. <code>str.match</code> anchors the pattern at the <em>start</em> of the string, so every flag is 0 and the frame of six honest features becomes six columns of <code>False</code> without a word of complaint &mdash; the worst kind of failure, because <code>feat.sum()</code> still prints. <code>low.isin([pattern])</code> asks for exact equality against a whole sentence, which is also all zeros, for a different reason: it is a membership test, not a substring test. And <code>str.find</code> returns the <em>position</em> of the match, or &minus;1 when it is absent, so the dtype is integer and the printed sums are 2550, 551, 897 and 14 &mdash; numbers that look like data and mean nothing, and the second line would then raise, because an integer column is not a mask.",
          ar: "الأعدادُ هي القياسُ الذي يجعل الأعلامَ تستحقّ أن تُبنى: فـ71 إعلانًا تذكر مولّدًا، و62 سخّانًا شمسيًّا، و50 الجامعة، وتنتهي 9 بـ«- still available» &mdash; وتلك الصفوفُ التسعة تسعةُ <code>listing_id</code> مميّزة، وهي بالضبط الشققُ التسع المعادُ نشرها التي لم تستطع <code>drop_duplicates()</code> أن تراها. فعلَمٌ نصّي وجد المكرَّرَ البنيوي. وكلُّ مرشَّح خاطئ التباسٌ حقيقي بعَرَضٍ مختلف. فـ<code>str.match</code> تُرسي النمطَ في <em>بداية</em> السلسلة، فيكون كلُّ علَمٍ صفرًا ويصير جدولُ الخصائص الأمينة الستّ ستةَ أعمدة من <code>False</code> بلا كلمةِ شكوى &mdash; وهو أسوأُ أنواع العطب، لأن <code>feat.sum()</code> تطبع رغم ذلك. و<code>low.isin([pattern])</code> تطلب تساويًا تامًّا في مقابل جملةٍ كاملة، وهي أصفارٌ كلها أيضًا لسببٍ آخر: فهي اختبارُ انتماء لا اختبارُ سلسلةٍ جزئية. وأما <code>str.find</code> فتعيد <em>موضعَ</em> المطابقة أو &minus;1 عند غيابها، فيكون النوعُ عددًا صحيحًا وتكون المجاميعُ المطبوعة 2550 و551 و897 و14 &mdash; أرقامٌ تبدو بيانات ولا تعني شيئًا، ويُطلق السطرُ الثاني خطأً بعدها، لأن العمودَ الصحيح ليس قناعًا."
        }
      },

      /* ---------------------------------------------------------- 11 */
      {
        id: "t2bx11", type: "compare", level: "medium",
        topics: ["t2-dedupe-before-split", "t2-exact-duplicate", "t2-repost"],
        q: {
          en: "The same seed, the same fraction, the same file &mdash; and the split is taken at two different moments. <code>one_row_per_flat</code> is Lesson 3's finished stage 1: it removes the 14 byte-for-byte repeats, parses <code>listed_on</code>, sorts on the real date and keeps the latest copy of each of the 9 reposted flats. A prints <code>377 126</code> and <code>flats on both sides: 10</code>; B prints <code>360 120</code> and <code>flats on both sides: 0</code>. Which statement is correct?",
          ar: "البذرةُ نفسها والكسرُ نفسه والملفُّ نفسه &mdash; والقسمةُ تُؤخذ في لحظتين مختلفتين. و<code>one_row_per_flat</code> هي المرحلةُ الأولى في الدرس 3 تامّةً: تحذف المكرَّرات الـ14 حرفًا بحرف، وتحلّل <code>listed_on</code>، وترتّب على التاريخ الحقيقي، وتُبقي أحدثَ نسخة من كل شقة من الشقق التسع المعادِ نشرُها. يطبع «أ» ‏<code>377 126</code> و<code>flats on both sides: 10</code>؛ ويطبع «ب» ‏<code>360 120</code> و<code>flats on both sides: 0</code>. فأيُّ العبارات صحيح؟"
        },
        codeA: code(
          "raw   = pd.read_csv(\"listings_raw.csv\")      # 503 rows describing 480 real flats",
          "train = raw.sample(frac=0.75, random_state=3)",
          "test  = raw.drop(train.index)",
          "",
          "print(len(train), len(test))",
          "print(\"flats on both sides:\",",
          "      len(set(train[\"listing_id\"]) & set(test[\"listing_id\"])))"
        ),
        codeB: code(
          "raw   = pd.read_csv(\"listings_raw.csv\")      # 503 rows describing 480 real flats",
          "flats = one_row_per_flat(raw)                # stage 1 finished: 480 rows, id unique",
          "",
          "train = flats.sample(frac=0.75, random_state=3)",
          "test  = flats.drop(train.index)",
          "",
          "print(len(train), len(test))",
          "print(\"flats on both sides:\",",
          "      len(set(train[\"listing_id\"]) & set(test[\"listing_id\"])))"
        ),
        options: [
          {
            en: "B is the defensible one. In A ten flats have a copy on each side of the split, so their rent is learned from the training copy and then scored on the held-out copy as though it were a new flat: A's held-out error is optimistic by construction, and no seed, no fraction and no larger file would fix it. Stage 1 has to finish before the split is taken.",
            ar: "«ب» هو القابل للدفاع. فعشرُ شقق في «أ» لها نسخةٌ على كل جانب من القسمة، فيُتعلَّم إيجارُها من نسخة التدريب ثم يُقيَّم على النسخة المحجوزة كأنها شقةٌ جديدة: فخطأُ «أ» المحجوز متفائلٌ بالبناء، ولا تُصلحه بذرةٌ ولا كسرٌ ولا ملفٌّ أكبر. فيجب أن تتمّ المرحلةُ الأولى قبل أن تُؤخذ القسمة."
          },
          {
            en: "Both splits are sound, because <code>sample</code> draws rows without replacement: no row can appear in <code>train</code> and in <code>test</code> at once, and <code>drop(train.index)</code> guarantees the two halves are disjoint.",
            ar: "القسمتان سليمتان، لأن <code>sample</code> تسحب الصفوفَ بلا إرجاع: فلا يستطيع صفٌّ أن يظهر في <code>train</code> وفي <code>test</code> معًا، و<code>drop(train.index)</code> تضمن انفصالَ النصفين."
          },
          {
            en: "A is the better program: it fits on 377 rows rather than 360, and the 10 shared flats are 2% of the file, far too few to move a mean absolute error measured over 120 held-out rows.",
            ar: "«أ» هو البرنامجُ الأفضل: فهو يَضبط على 377 صفًّا لا على 360، والشققُ العشرُ المشتركة 2% من الملف، وهي أقلُّ بكثير من أن تُزحزح متوسطَ خطأٍ مطلق مقيسًا على 120 صفًّا محجوزًا."
          },
          {
            en: "A's problem is the 9 reposts only. The 14 byte-for-byte repeats are harmless here, because two identical rows carry identical information, so whichever side of the split they land on the model learns the same thing.",
            ar: "مشكلةُ «أ» هي الإعلاناتُ التسعةُ المعادُ نشرها وحدها. أما المكرَّرات الـ14 حرفًا بحرف فلا ضرر منها هنا، لأن الصفين المتطابقين يحملان المعلومةَ نفسها، فيتعلّم النموذجُ الشيءَ نفسه أيَّ جانبٍ من القسمة وقعا فيه."
          }
        ],
        answer: 0,
        hint: {
          en: "<code>sample</code> really does draw each row at most once, so the second claim's premise is true. Count what is actually shared: not rows, but the thing a row is supposed to be about.",
          ar: "تسحب <code>sample</code> كلَّ صفٍّ مرةً واحدة على الأكثر حقًّا، فمقدّمةُ الادّعاء الثاني صادقة. فعُدَّ ما هو مشترَكٌ فعلًا: لا الصفوف، بل الشيءُ الذي يُفترض أن يكون الصفُّ عنه."
        },
        explain: {
          en: "The split is row-disjoint in both programs; that is why the answer built on sampling without replacement is the tempting one, and why its premise is true and its question the wrong one. What matters is whether the two halves are disjoint in <em>flats</em>, and in A they are not: 10 of the 480 flats have one copy in <code>train</code> and another in <code>test</code>, so for those the held-out score measures memory rather than prediction. The fix is an ordering fact, not a parameter: stage 1 settles what a row is, and only then can the rows be divided into evidence and measurement. The answer that prefers A for its 17 extra rows is reading the split as a sample-size question; the 17 rows are duplicates, so they are not extra evidence at all. And the answer that forgives the 14 exact repeats gets the direction right and the conclusion wrong: identical rows carry no new information, which is exactly why one of them on the held-out side is a free pass &mdash; and in passing they also let a repeated row vote twice in any parameter fitted afterwards.",
          ar: "القسمةُ منفصلةُ الصفوف في البرنامجين؛ ولهذا كان الجوابُ المبنيُّ على السحب بلا إرجاع أغراها، ولهذا كانت مقدّمتُه صادقةً وسؤالُه خطأً. فالذي يهمّ هو: هل النصفان منفصلان في <em>الشقق</em>؟ وفي «أ» ليسا كذلك: فعشرٌ من الشقق الـ480 لها نسخةٌ في <code>train</code> وأخرى في <code>test</code>، فيقيس الدرجةُ المحجوزة لتلك حفظًا لا تنبؤًا. والعلاجُ واقعةُ ترتيبٍ لا وسيط: فالمرحلةُ الأولى تحسم ماهيةَ الصف، وبعدها فقط يمكن تقسيمُ الصفوف إلى دليلٍ وقياس. والجوابُ الذي يُفضّل «أ» لصفوفه السبعةَ عشرَ الزائدة يقرأ القسمةَ مسألةَ حجمِ عيّنة؛ وتلك الصفوفُ مكرَّرات، فليست دليلًا زائدًا أصلًا. والجوابُ الذي يعفو عن المكرَّرات الـ14 التامّة يُصيب الاتجاهَ ويُخطئ النتيجة: فالصفوفُ المتطابقة لا تحمل معلومةً جديدة، وهذا بالضبط سببُ كون إحداها على الجانب المحجوز تذكرةَ مرورٍ مجانية &mdash; وهي في طريقها تدع الصفَّ المكرَّر يصوّت مرتين في أي وسيط يُضبط بعد ذلك."
        }
      },

      /* ---------------------------------------------------------- 12 */
      {
        id: "t2bx12", type: "write", level: "hard",
        topics: ["t2-normalisation", "t2-canonical-map", "t2-map-silent-nan"],
        q: {
          en: "Write <code>canonicalise(series, mapping)</code>, the helper the whole chapter is built on. It must normalise by <strong>rule</strong> &mdash; strip the ends, lowercase, collapse every run of whitespace to one space &mdash; and then name by <strong>decision</strong>, by looking the normalised value up in <code>mapping</code>. It returns two things: the canonical series, and a <code>value_counts()</code> of the normalised values the mapping does not cover, so an unexpected spelling comes back as a counted line and not as a silent hole. Then call it on <code>raw[\"city\"]</code> with the 11-key <code>CITY_MAP</code> and print how many of the 503 rows were named, how many spellings came out, and the unmatched counts.",
          ar: "اكتب <code>canonicalise(series, mapping)</code>، المُعين الذي بُني عليه الفصلُ كله. عليها أن تُنمّط بـ<strong>قاعدة</strong> &mdash; تشذيبُ الطرفين، والتصغير، وضغطُ كل جَرْيةِ فراغ إلى مسافةٍ واحدة &mdash; ثم تُسمّي بـ<strong>قرار</strong>، بالبحث عن القيمة المنمَّطة في <code>mapping</code>. وتعيد شيئين: المتسلسلةَ المعيارية، و<code>value_counts()</code> للقيم المنمَّطة التي لا تغطّيها الخريطة، لترجع التهجئةُ غيرُ المتوقَّعة سطرًا معدودًا لا ثقبًا صامتًا. ثم نادِها على <code>raw[\"city\"]</code> بـ<code>CITY_MAP</code> ذات المفاتيح الأحدَ عشرَ واطبع كم صفًّا من الـ503 سُمّي، وكم تهجئةً خرجت، وأعدادَ غير المطابق."
        },
        starter: code(
          "import pandas as pd",
          "",
          "raw = pd.read_csv(\"listings_raw.csv\")   # city: 26 spellings of 5 real cities",
          "# CITY_MAP: 11 normalised keys -> 5 canonical names",
          "",
          "# your code here"
        ),
        lines: 14,
        checks: [
          {
            re: "def\\s+canonicalise\\s*\\(\\s*\\w+\\s*,\\s*\\w+",
            label: {
              en: "A function <code>canonicalise</code> taking the series and the mapping",
              ar: "دالّةٌ <code>canonicalise</code> تأخذ المتسلسلة والخريطة"
            }
          },
          {
            re: "\\.str\\.strip\\s*\\(",
            label: {
              en: "Strip the ends of the string",
              ar: "تشذيبُ طرفَي السلسلة"
            }
          },
          {
            re: "\\.str\\.lower\\s*\\(",
            label: {
              en: "Lowercase it",
              ar: "تصغيرُها"
            }
          },
          {
            re: "\\.str\\.replace\\s*\\([^)]*regex\\s*=\\s*True",
            label: {
              en: "Collapse runs of whitespace with a regular expression",
              ar: "ضغطُ جَرْيات الفراغ بتعبير نمطي"
            }
          },
          {
            re: "\\.map\\s*\\(",
            label: {
              en: "Name the normalised value by looking it up in the mapping",
              ar: "تسميةُ القيمة المنمَّطة بالبحث عنها في الخريطة"
            }
          },
          {
            re: "value_counts\\s*\\(",
            label: {
              en: "Count the normalised values the mapping does not cover",
              ar: "عدُّ القيم المنمَّطة التي لا تغطّيها الخريطة"
            }
          }
        ],
        forbid: [
          {
            re: "\\.str\\.title\\s*\\(",
            label: {
              en: "<code>.str.title()</code> &mdash; it stops at 11 spellings and invents <em>Deir Al-Balah</em>",
              ar: "‏<code>.str.title()</code> &mdash; تتوقف عند 11 تهجئة وتختلق <em>Deir Al-Balah</em>"
            }
          },
          {
            re: "fillna\\s*\\(\\s*[\"']",
            label: {
              en: "Filling the unmatched values with a string &mdash; they must be counted, not hidden",
              ar: "تعبئةُ القيم غير المطابقة بسلسلة &mdash; فعليها أن تُعدّ لا أن تُخفى"
            }
          }
        ],
        solution: {
          code: code(
            "def canonicalise(series, mapping):",
            "    \"\"\"Normalise by rule, then map by decision.",
            "",
            "    Returns (canonical series, value_counts of the normalised values the",
            "    mapping does not cover) - so an unexpected spelling is a number, not a hole.\"\"\"",
            "    norm = (series.astype(\"string\").str.strip()",
            "                  .str.lower().str.replace(r\"\\s+\", \" \", regex=True))",
            "    out = norm.map(mapping)",
            "    unmatched = norm[out.isna() & norm.notna()].value_counts()",
            "    return out, unmatched",
            "",
            "city, unmatched = canonicalise(raw[\"city\"], CITY_MAP)",
            "print(\"rows %d | named %d | spellings %d\" % (len(city), int(city.notna().sum()), city.nunique()))",
            "print(\"unmatched:\", dict(unmatched) or \"none\")"
          ),
          out: code(
            "rows 503 | named 503 | spellings 5",
            "unmatched: none"
          ),
          en: "Four lines of rule, one line of decision, one line of accounting. <code>astype(\"string\")</code> first so the accessors work on a nullable column; then strip, lower and <code>replace(r\"\\s+\", \" \", regex=True)</code> in that order. <code>.map()</code> gives the canonical name and <code>NaN</code> for anything the mapping has no key for, and the <code>unmatched</code> line turns exactly those rows into a counted report: drop two keys from <code>CITY_MAP</code> and the same function prints <code>{'khan yunis': 14, 'jabaliya': 4}</code> instead of losing 18 rows in silence.",
            ar: "أربعةُ أسطر من القاعدة، وسطرٌ من القرار، وسطرٌ من المحاسبة. فـ<code>astype(\"string\")</code> أولًا لتعمل المُوصِلاتُ على عمود قابل للفراغ؛ ثم التشذيبُ والتصغير و<code>replace(r\"\\s+\", \" \", regex=True)</code> بهذا الترتيب. وتعطي <code>.map()</code> الاسمَ المعياري و<code>NaN</code> لكل ما لا مفتاحَ له في الخريطة، ويحوّل سطرُ <code>unmatched</code> تلك الصفوفَ بالضبط إلى تقريرٍ معدود: فاحذف مفتاحين من <code>CITY_MAP</code> فتطبع الدالّةُ نفسها <code>{'khan yunis': 14, 'jabaliya': 4}</code> بدل أن تفقد 18 صفًّا في صمت."
        },
        hint: {
          en: "The rule and the decision do different jobs and must happen in that order: the mapping's keys are already normalised, so a value that has not been normalised yet can never match one. For the second return value you need the rows where the map produced nothing <em>and</em> the original was not blank &mdash; a blank cell is not an unexpected spelling.",
          ar: "القاعدةُ والقرارُ يعملان عملين مختلفين ويجب أن يحدثا بهذا الترتيب: فمفاتيحُ الخريطة منمَّطةٌ أصلًا، فلا تستطيع قيمةٌ لم تُنمَّط بعد أن تطابق مفتاحًا قط. وأما القيمةُ المعادة الثانية فتحتاج الصفوفَ التي لم تُنتج الخريطةُ فيها شيئًا <em>و</em>لم يكن الأصلُ فارغًا &mdash; فالخليةُ الفارغة ليست تهجئةً غيرَ متوقَّعة."
        },
        explain: {
          en: "This is the shape every text repair in the chapter reuses, and the two halves are not interchangeable. The rule half is mechanical and needs no domain knowledge: it removes the differences that are invisible on screen, and on <code>city</code> it takes 26 spellings down to 11. The decision half is a human claim written where a reviewer can read it: <em>khan yunis</em>, <em>khan-younis</em> and <em>khan younis</em> are the same town, and no rule can say so. Returning the unmatched counts is what makes the function safe to re-run: <code>value_counts()</code> on an empty selection is an empty Series, so a clean run says <code>none</code>, and the first month a new spelling appears it says how many rows it cost. The two forbidden shortcuts both fail silently. <code>.str.title()</code> also reaches 11, which is why a real project shipped it, but it merges nothing further and prints <em>Deir Al-Balah</em> with a capital A that matches neither the file nor the reference table. And filling the unmatched with a string &mdash; <code>\"Unknown\"</code>, or worse the normalised value itself &mdash; replaces the one number you needed with a category the next stage will one-hot encode.",
          ar: "هذا هو الشكلُ الذي يعيد كلُّ إصلاحٍ نصّي في الفصل استعمالَه، والنصفان غيرُ قابلين للتبادل. فنصفُ القاعدة آليٌّ ولا يحتاج معرفةً ميدانية: يحذف الاختلافاتَ غيرَ المرئية على الشاشة، ويأخذ في <code>city</code> ‏26 تهجئة إلى 11. ونصفُ القرار ادّعاءٌ بشري مكتوبٌ حيث يستطيع المراجعُ أن يقرأه: فـ<em>khan yunis</em> و<em>khan-younis</em> و<em>khan younis</em> هي البلدةُ نفسها، ولا تستطيع قاعدةٌ أن تقول ذلك. وإعادةُ أعدادِ غير المطابق هي ما يجعل الدالّةَ آمنةَ الإعادة: فـ<code>value_counts()</code> على اختيارٍ خالٍ متسلسلةٌ خالية، فتقول التشغيلةُ النظيفة <code>none</code>، وأولَ شهرٍ تظهر فيه تهجئةٌ جديدة تقول كم صفًّا كلّفت. والمختصران المحظوران يعطبان في صمتٍ كلاهما. فـ<code>.str.title()</code> تبلغ 11 أيضًا، ولهذا شحنها مشروعٌ حقيقي، لكنها لا تدمج شيئًا بعد ذلك وتطبع <em>Deir Al-Balah</em> بألفٍ كبيرة لا تطابق الملفَّ ولا الجدولَ المرجعي. وأما تعبئةُ غير المطابق بسلسلة &mdash; <code>\"Unknown\"</code> أو ما هو أسوأ، القيمةُ المنمَّطة نفسها &mdash; فتستبدل الرقمَ الوحيد الذي احتجته بفئةٍ ترمّزها المرحلةُ التالية ترميزًا أحاديًّا."
        }
      },

      /* ---------------------------------------------------------- 13 */
      {
        id: "t2bx13", type: "tf", level: "easy",
        topics: ["t2-action-cap", "t2-filter-drops-blanks"],
        q: {
          en: "<code>base</code> is the 503 scraped rows with listing 5062's 99999 already voided, so it holds 20 blank rents: the 19 the site never published plus that one. The fence <code>[17.5, 397.5]</code> was fitted on the 363 training rents. <strong>True or false:</strong> <code>base[\"monthly_rent\"].clip(17.5, 397.5)</code> returns a column with 13 values rewritten and all 20 blanks still blank, because <code>clip</code> moves a value to the nearer bound and leaves a missing value missing.",
          ar: "‏<code>base</code> هو الصفوف الـ503 المسحوبة وقد أُبطلت 99999 في الإعلان 5062، فيحمل 20 إيجارًا فارغًا: التسعةَ عشرَ التي لم ينشرها الموقعُ قط وذلك الواحد. وسياجُ <code>[17.5, 397.5]</code> مضبوطٌ على إيجارات التدريب الـ363. <strong>صح أم خطأ:</strong> تعيد <code>base[\"monthly_rent\"].clip(17.5, 397.5)</code> عمودًا فيه 13 قيمةً أُعيدت كتابتها والفراغاتُ الـ20 كلها ما زالت فارغة، لأن <code>clip</code> تنقل القيمةَ إلى الحدّ الأقرب وتترك المفقودَ مفقودًا."
        },
        truth: true,
        hint: {
          en: "Count the rents outside the fence first &mdash; the fitted fence flags 13 of the 483 rents, 10 in the training rows and 3 held out. Then ask what <code>clip</code> can possibly compare a <code>NaN</code> against.",
          ar: "عُدَّ أولًا الإيجاراتَ خارج السياج &mdash; فالسياجُ المضبوط يعلّم 13 من الإيجارات الـ483، عشرًا في صفوف التدريب وثلاثًا محجوزة. ثم اسأل: بماذا تستطيع <code>clip</code> أن تقارن <code>NaN</code>؟"
        },
        explain: {
          en: "Both halves of the claim hold. 13 rents fall outside <code>[17.5, 397.5]</code> and each is moved to the bound it crossed, which is why the mean falls from 210.14 to 208.41 while the median stays at 200.0 and the row count stays at 503. And a comparison against a missing value is neither true nor false, so <code>clip</code> has nothing to move and returns <code>NaN</code> untouched: 20 blanks in, 20 blanks out. That second half is exactly what separates capping from the line everybody writes first. <code>base[base[\"monthly_rent\"] &lt; 1000]</code> looks like the same decision and deletes 20 rows rather than 1, because <code>np.nan &lt; 1000</code> is <code>False</code> and a filter keeps only the rows that answered <code>True</code>. Capping rewrites 13 cells and tells you so; the filter deletes the 19 rows Lesson 2 fought for and tells you nothing.",
          ar: "نصفا الادّعاء صادقان. فـ13 إيجارًا تقع خارج <code>[17.5, 397.5]</code> ويُنقل كلٌّ منها إلى الحدّ الذي عبره، ولهذا ينزل المتوسطُ من 210.14 إلى 208.41 ويبقى الوسيطُ 200.0 ويبقى عددُ الصفوف 503. والمقارنةُ في مقابل قيمةٍ مفقودة ليست صادقةً ولا كاذبة، فلا يكون لـ<code>clip</code> ما تنقله وتعيد <code>NaN</code> كما هي: عشرون فراغًا دخلت وعشرون خرجت. وذلك النصفُ الثاني هو بالضبط ما يفصل تحديدَ السقف عن السطر الذي يكتبه الجميعُ أولًا. فـ<code>base[base[\"monthly_rent\"] &lt; 1000]</code> يبدو القرارَ نفسه ويحذف 20 صفًّا لا صفًّا واحدًا، لأن <code>np.nan &lt; 1000</code> تساوي <code>False</code> والمرشّحُ لا يُبقي إلا الصفوفَ التي أجابت <code>True</code>. فتحديدُ السقف يعيد كتابة 13 خلية ويخبرك بذلك؛ والمرشّحُ يحذف الصفوفَ الـ19 التي قاتل الدرسُ 2 من أجلها ولا يخبرك بشيء."
        }
      },

      /* ---------------------------------------------------------- 14 */
      /* ---------------------------------------------------------- 15 */
      {
        id: "t2bx15", type: "fill", level: "medium",
        topics: ["t2-robust-z", "t2-mad-constant", "t2-threshold-next-month"],
        q: {
          en: "Fill in the three blanks so that the robust rule is fitted on March's training rents and then applied to June without being refitted. <code>base</code> is the 503 rows with the 99999 voided; the comments are what it prints.",
          ar: "املأ الفراغات الثلاثة لتُضبط القاعدةُ الحصينة على إيجارات التدريب في آذار ثم تُطبَّق على حزيران بلا إعادة ضبط. و<code>base</code> هو الصفوف الـ503 وقد أُبطلت 99999؛ والتعليقاتُ هي ما يطبعه."
        },
        code: code(
          "tr     = base.loc[train.index, \"monthly_rent\"]      # the 363 training rents",
          "fitted = {\"rent_median\": float(tr.____1____()),",
          "          \"rent_mad\":    float((tr - tr.median()).____2____().median())}",
          "",
          "new = pd.read_csv(\"listings_new.csv\")               # 85 June rows, 83 with a rent",
          "rz  = ____3____ * (new[\"monthly_rent\"] - fitted[\"rent_median\"]) / fitted[\"rent_mad\"]",
          "",
          "print(fitted[\"rent_median\"], fitted[\"rent_mad\"])    # 200.0 50.0",
          "print(int((rz.abs() > 3.5).sum()))                  # 0"
        ),
        blanks: [
          { accept: ["median"], label: { en: "1", ar: "1" } },
          { accept: ["abs"], label: { en: "2", ar: "2" } },
          { accept: ["0.6745", ".6745"], label: { en: "3", ar: "3" } }
        ],
        hint: {
          en: "Both parameters are positions rather than sums, which is the whole point of the rule. The constant in the third blank is the number that makes the second parameter comparable with a standard deviation: it is the quartile of a standard normal, to four places.",
          ar: "الوسيطان موضعان لا مجموعان، وهذا هو مقصودُ القاعدة كله. والثابتُ في الفراغ الثالث هو الرقمُ الذي يجعل الوسيطَ الثاني قابلًا للمقارنة بانحرافٍ معياري: وهو ربيعُ التوزيع الطبيعي المعياري بأربع منازل."
        },
        explain: {
          en: "The robust z is <code>0.6745 * (x &minus; median) / MAD</code>, where the MAD is the median of the absolute deviations from the median &mdash; so the two blanks are <code>median</code> and <code>abs</code>, and both parameters are positions: a quarter of the column could be wrong before either moves. On the 363 training rents they come out at 200.0 and 50.0, and 50.0 / 0.6745 = 74.13 is the standard deviation those 363 rents would have if they were normal, against the 81.46 they actually have &mdash; which is why the constant is there at all. Then the rule is applied to June unchanged, and June's dearest flat at 440 shekels has a robust z of 3.24: inside the threshold, so 0 flags. That zero is the result, not a failure. The same batch refitting its own fence would have produced <code>[&minus;38.75, 451.25]</code> and flagged nothing either, but it would have been a different rule each month, and two months scored by two different rules cannot be compared. A stored threshold is the only kind you can report.",
          ar: "‏z الحصينة هي <code>0.6745 * (x &minus; median) / MAD</code>، والانحرافُ المطلق الوسيط هو وسيطُ الانحرافات المطلقة عن الوسيط &mdash; فالفراغان <code>median</code> و<code>abs</code>، والوسيطان موضعان: فقد يكون ربعُ العمود خاطئًا قبل أن يتزحزح أيٌّ منهما. وعلى إيجارات التدريب الـ363 يخرجان 200.0 و50.0، و50.0 ÷ 0.6745 = 74.13 هو الانحرافُ المعياري الذي كانت تلك الإيجاراتُ الـ363 ستحمله لو كانت طبيعية، في مقابل 81.46 الذي تحمله فعلًا &mdash; ولهذا وُجد الثابتُ أصلًا. ثم تُطبَّق القاعدةُ على حزيران بلا تغيير، وأغلى شقةٍ في حزيران بـ440 شيكلًا لها z حصينة 3.24: داخلَ الحدّ، فلا علَمَ واحد. وذلك الصفرُ هو النتيجةُ لا العطب. فلو أعادت الدفعةُ نفسها ضبطَ سياجها لأنتجت <code>[&minus;38.75, 451.25]</code> ولم تعلّم شيئًا أيضًا، لكنها كانت ستكون قاعدةً مختلفة كلَّ شهر، وشهران مُقيَّمان بقاعدتين مختلفتين لا يمكن مقارنتهما. والحدُّ المخزَّن هو الوحيد الذي تستطيع أن تُقرّره."
        }
      },

      /* ---------------------------------------------------------- 16 */
      {
        id: "t2bx16", type: "mcq", level: "hard",
        topics: ["t2-actions-measured", "t2-action-flag", "t2-action-transform"],
        q: {
          en: "Seven actions on the same thirteen flagged rents, all on <code>base</code> (503 rows, the 99999 voided), all with the fence <code>[17.5, 397.5]</code> fitted on the 363 training rents, all scored by the same one-parameter baseline: predict the training median. <code>scored</code> is how many held-out rents the ruler had to measure against. Which reading of the table is correct?",
          ar: "سبعةُ أعمال على الإيجارات الثلاثةَ عشرَ المعلَّمة نفسها، كلُّها على <code>base</code> (503 صفوف وقد أُبطلت 99999)، وكلُّها بالسياج <code>[17.5, 397.5]</code> المضبوط على إيجارات التدريب الـ363، وكلُّها مُقيَّمة بخط القاعدة ذي الوسيط الواحد: تنبّأ بوسيط التدريب. و<code>scored</code> هو عددُ الإيجارات المحجوزة التي وجدت المسطرةُ أن تقيس في مقابلها. فأيُّ قراءةٍ للجدول صحيحة؟"
        },
        code: code(
          "                        action  rows  scored  median   mean  MAE train  MAE held out",
          "             0 keep everything   503     120   200.0 210.14      61.74         60.17",
          "     1 remove the flagged rows   490     117   195.0 203.18      55.74         55.47",
          "2 remove flagged TRAINING rows   493     120   195.0 204.63      55.74         60.00",
          "           3 cap at the fences   503     120   200.0 208.41      59.71         59.31",
          "        4 winsorise at p01/p99   503     120   200.0 209.81      60.84         60.13",
          "            5 log1p the column   503     120   200.0 195.16      61.74         60.17",
          "               6 flag and keep   503     120   200.0 210.14      61.74         60.17"
        ),
        options: [
          {
            en: "Action 1's 55.47 is not comparable with the rest: it deleted three held-out rents, so it is measured on 117 rows instead of 120 and the three it removed were the hardest ones. Action 2 removes the same rows from the training side only, keeps all 120 in the ruler, and reports 60.00 &mdash; which is the honest version of the same action and is barely better than keeping everything.",
            ar: "رقمُ 55.47 في العمل 1 غيرُ قابل للمقارنة بالبقية: فقد حذف ثلاثةَ إيجارات محجوزة، فهو مقيسٌ على 117 صفًّا لا على 120، والثلاثةُ التي أزالها كانت أصعبَها. والعملُ 2 يُزيل الصفوفَ نفسها من جانب التدريب وحده، ويُبقي الـ120 كلها في المسطرة، ويُبلّغ عن 60.00 &mdash; وهي الصورةُ الأمينة للعمل نفسه، وهي أفضلُ بالكاد من إبقاء كل شيء."
          },
          {
            en: "Actions 0, 5 and 6 print identical errors because the log transform and the flag are both no-ops on this column: <code>np.log1p</code> leaves a value it cannot change and the flag column is never read, so neither line has any effect on the frame at all.",
            ar: "تطبع الأعمالُ 0 و5 و6 أخطاءً متطابقة لأن التحويلَ اللوغاريتمي والعلَمَ كليهما لا يفعلان شيئًا في هذا العمود: فـ<code>np.log1p</code> تترك القيمةَ التي لا تستطيع تغييرها وعمودُ العلَم لا يُقرأ قط، فلا يكون لأيٍّ من السطرين أثرٌ في الجدول أصلًا."
          },
          {
            en: "Capping at the fences is the best of the seven, because it is the only action that lowers the held-out error without deleting a row: 59.31 against 60.17, on all 120 held-out rents, with the row count unchanged at 503.",
            ar: "تحديدُ السقف عند السياج أفضلُ السبعة، لأنه العملُ الوحيد الذي يُنزل الخطأَ المحجوز دون حذف صف: 59.31 في مقابل 60.17، على الإيجارات المحجوزة الـ120 كلها، وعددُ الصفوف لم يتغيّر عن 503."
          },
          {
            en: "Winsorising at the 1st and 99th training percentiles is strictly safer than capping at the fences, because percentiles are fitted on the training rows while the fence is a property of the whole column, so action 4 is the only one of the two that cannot leak.",
            ar: "الوِنْزَرةُ عند المئينين الأول والتاسع والتسعين من التدريب أأمنُ قطعًا من تحديد السقف عند السياج، لأن المئينات مضبوطةٌ على صفوف التدريب أما السياجُ فخاصيةُ العمود كله، فيكون العملُ 4 الوحيدَ من الاثنين الذي لا يمكن أن يتسرّب."
          }
        ],
        answer: 0,
        hint: {
          en: "Read the <code>scored</code> column before any of the error columns. One row of the table is measured against a different set of flats from the other six, and that is the only reason its number looks good.",
          ar: "اقرأ عمودَ <code>scored</code> قبل أي عمودٍ من أعمدة الخطأ. فسطرٌ واحد من الجدول مقيسٌ في مقابل مجموعةٍ من الشقق غيرِ الستّة الأخرى، وهذا هو السببُ الوحيد لحسن رقمه."
          },
        explain: {
          en: "The table's real lesson is about the ruler, not the actions. Action 1 removes every flagged row, three of which are held out, so its 55.47 is the error on an easier test set &mdash; the dearest held-out flats were deleted before being measured. Action 2 is the repair: flag everywhere, remove in the training rows only, so the 120 held-out rents all stay in the ruler, and the honest gain over keeping everything is 60.17 &minus; 60.00 = 0.17 shekels. The claim that 0, 5 and 6 are identical because nothing happened is the most interesting wrong answer: <code>np.log1p</code> changes every value in the column and is exactly reversible, and the flag adds a real column &mdash; they print the same error because a <em>median</em> predictor is invariant to any monotone transformation of the target and cannot read a feature at all. Same number, entirely different reason. Capping is not best either: its 59.31 is measured on a column in which 13 rows now carry 397.5, a rent nobody asked, and the 0.86-shekel gain is smaller than the difference between two seeds. And the answer that calls winsorising strictly safer gets the fence backwards: the fence in this table was fitted on the 363 training rents, exactly like the percentiles, so both are stored parameters and neither is a property of the column.",
          ar: "درسُ الجدول الحقيقي عن المسطرة لا عن الأعمال. فالعملُ 1 يُزيل كلَّ صفٍّ معلَّم، وثلاثةٌ منها محجوزة، فيكون 55.47 خطأً على مجموعة اختبارٍ أسهل &mdash; فقد حُذفت أغلى الشقق المحجوزة قبل أن تُقاس. والعملُ 2 هو العلاج: علِّم في كل مكان، وأزِل في صفوف التدريب وحدها، فتبقى الإيجاراتُ المحجوزة الـ120 كلها في المسطرة، ويكون الربحُ الأمين على إبقاء كل شيء 60.17 &minus; 60.00 = 0.17 شيكلًا. والادّعاءُ بأن 0 و5 و6 متطابقة لأن شيئًا لم يحدث هو أطرفُ الأجوبة الخاطئة: فـ<code>np.log1p</code> تغيّر كلَّ قيمة في العمود وهي قابلةٌ للعكس بالضبط، والعلَمُ يضيف عمودًا حقيقيًّا &mdash; وإنما تطبع الخطأَ نفسه لأن متنبئَ <em>الوسيط</em> لا يتغيّر بأي تحويلٍ رتيب للهدف ولا يستطيع قراءةَ خاصيةٍ أصلًا. الرقمُ نفسه والسببُ مختلفٌ كلَّ الاختلاف. وتحديدُ السقف ليس أفضلَها أيضًا: فـ59.31 مقيسٌ على عمودٍ يحمل فيه 13 صفًّا الآن 397.5، وهو إيجارٌ لم يطلبه أحد، والربحُ بـ0.86 شيكلًا أصغرُ من الفرق بين بذرتين. والجوابُ الذي يسمّي الوِنْزَرةَ أأمنَ قطعًا يقلب السياج: فالسياجُ في هذا الجدول مضبوطٌ على إيجارات التدريب الـ363، كالمئينات بعينها، فكلاهما وسيطٌ مخزَّن ولا أحدَ منهما خاصيةُ العمود."
        }
      },

      /* ---------------------------------------------------------- 17 */
      {
        id: "t2bx17", type: "compare", level: "medium",
        topics: ["t2-encode-together", "t2-fitted-categories", "t2-shape-mismatch"],
        q: {
          en: "Two answers to the shape mismatch: March's 480 flats one-hot encoded on <code>city</code> and <code>agency</code> give 25 columns, June's 85 listings give 19, and June brings one city and three agencies March never had. A prints <code>concatenated: (565, 29)</code>, <code>March slice: (480, 29)</code> and <code>June slice: (85, 29)</code>; B prints <code>March: (480, 25)</code>, <code>June: (85, 19) -&gt; (85, 25)</code>, <code>June rows with no city flag: 2</code> and <code>no agency flag: 3</code>. Which statement is correct?",
          ar: "جوابان على عدم تطابق الشكل: شققُ آذار الـ480 مُرمَّزةً ترميزًا أحاديًّا على <code>city</code> و<code>agency</code> تعطي 25 عمودًا، وإعلاناتُ حزيران الـ85 تعطي 19، ويجلب حزيرانُ مدينةً وثلاثَ وكالات لم تكن لآذار قط. يطبع «أ» ‏<code>concatenated: (565, 29)</code> و<code>March slice: (480, 29)</code> و<code>June slice: (85, 29)</code>؛ ويطبع «ب» ‏<code>March: (480, 25)</code> و<code>June: (85, 19) -&gt; (85, 25)</code> و<code>June rows with no city flag: 2</code> و<code>no agency flag: 3</code>. فأيُّ العبارات صحيح؟"
        },
        codeA: code(
          "CAT = [\"city\", \"agency\"]",
          "",
          "both = pd.get_dummies(pd.concat([flats[CAT], june[CAT]], ignore_index=True),",
          "                      columns=CAT, prefix=CAT, dtype=\"int8\")",
          "",
          "print(\"concatenated:\", both.shape)",
          "print(\"March slice:\", both.iloc[:len(flats)].shape,",
          "      \"| June slice:\", both.iloc[len(flats):].shape)"
        ),
        codeB: code(
          "CAT = [\"city\", \"agency\"]",
          "",
          "march  = pd.get_dummies(flats[CAT], columns=CAT, prefix=CAT, dtype=\"int8\")",
          "fitted = {\"columns\": list(march.columns)}        # FIT: on March alone",
          "",
          "newer   = pd.get_dummies(june[CAT], columns=CAT, prefix=CAT, dtype=\"int8\")",
          "aligned = newer.reindex(columns=fitted[\"columns\"], fill_value=0)   # APPLY",
          "",
          "city = [c for c in fitted[\"columns\"] if c.startswith(\"city_\")]",
          "ag   = [c for c in fitted[\"columns\"] if c.startswith(\"agency_\")]",
          "print(\"March:\", march.shape, \"| June:\", newer.shape, \"->\", aligned.shape)",
          "print(\"June rows with no city flag:\", int((aligned[city].sum(axis=1) == 0).sum()),",
          "      \"| no agency flag:\", int((aligned[ag].sum(axis=1) == 0).sum()))"
        ),
        options: [
          {
            en: "B is the only one that is a transform. The column list is a parameter fitted on March, June is reindexed onto it, and the five rows carrying a value the list does not contain come back as all-zero blocks the frame itself can count. A cannot encode one new listing on its own, four of the 29 columns it hands a model trained on March came out of June, and it learns that a new category arrived only if somebody compares two column lists by hand.",
            ar: "«ب» هو الوحيد الذي يكون تحويلًا. فقائمةُ الأعمدة وسيطٌ مضبوط على آذار، ويُعاد فهرسةُ حزيران عليها، وترجع الصفوفُ الخمسة التي تحمل قيمةً لا تحتويها القائمةُ مربّعاتٍ صفرية يستطيع الجدولُ نفسه أن يعدّها. وأما «أ» فلا يستطيع ترميزَ إعلانٍ جديد واحد وحده، وأربعةٌ من الأعمدة الـ29 التي يسلّمها نموذجًا مُدرَّبًا على آذار جاءت من حزيران، ولا يعلم بوصول فئةٍ جديدة إلا إذا قارن أحدٌ قائمتي أعمدة بيده."
          },
          {
            en: "A is better because it loses nothing: Beit Lahia and the three new agencies each get their own column, so no row is misrepresented, whereas B silently records those five rows as if every city and every agency had answered no.",
            ar: "«أ» أفضل لأنه لا يفقد شيئًا: فتأخذ Beit Lahia والوكالاتُ الجديدة الثلاث كلٌّ عمودَها، فلا يُمثَّل صفٌّ تمثيلًا خاطئًا، أما «ب» فيسجّل تلك الصفوفَ الخمسة بصمتٍ كأن كلَّ مدينة وكلَّ وكالة أجابت بلا."
          },
          {
            en: "A is the serious leak and B is clean, because A's matrix was built from a frame containing June's rents: any column computed while the held-out rows were in memory carries their target into the training matrix.",
            ar: "«أ» هو التسرّبُ الجسيم و«ب» نظيف، لأن مصفوفةَ «أ» بُنيت من جدولٍ يحتوي إيجاراتَ حزيران: فكلُّ عمود يُحسب وصفوفُ الحجز في الذاكرة يحمل هدفَها إلى مصفوفة التدريب."
          },
          {
            en: "Both are wrong and the fix is neither: <code>reindex</code> should be given <code>fill_value=None</code> so that an unseen city becomes a blank rather than a zero, and the model can then be told to treat that row as missing.",
            ar: "كلاهما خطأ والعلاجُ ليس أيًّا منهما: فينبغي أن تُعطى <code>reindex</code> ‏<code>fill_value=None</code> لتصير المدينةُ غيرُ المرئية فراغًا لا صفرًا، فيمكن حينئذٍ أن يُقال للنموذج أن يعامل ذلك الصفَّ معاملةَ المفقود."
          }
        ],
        answer: 0,
        hint: {
          en: "Count the columns A would hand a model: 29, of which how many could have existed before June's file was read? Then ask the question that settles it &mdash; can either program encode a single listing that arrives on its own in July?",
          ar: "عُدَّ الأعمدة التي سيسلّمها «أ» نموذجًا: 29، فكم منها كان يمكن أن يوجد قبل أن يُقرأ ملفُّ حزيران؟ ثم اسأل السؤالَ الحاسم &mdash; هل يستطيع أيٌّ من البرنامجين ترميزَ إعلانٍ واحد يصل وحده في تموز؟"
        },
        explain: {
          en: "The objection to A is about <em>time</em> rather than about information. Encoding the two files together does leak a little &mdash; four of its 29 columns exist only because June arrived &mdash; but a column name carries almost nothing, and that is not what makes it unusable. What makes it unusable is that it is not a transform at all: it is a one-off analysis that needs every file in hand at once, so it cannot score one listing, its training matrix depends on test data, and a new category shows up only as a column count somebody has to notice. B fixes all three: 25 columns always, nothing from June in the fit, and five counted all-zero rows. The answer that prefers A for &ldquo;losing nothing&rdquo; is the tempting one, and the thing it calls a loss is the diagnostic: an all-zero city block means <em>this row's city is not in the fitted list</em>, and counting those per batch is a drift monitor you get for free &mdash; whereas a 26th column no model was trained on is not information, it is an error waiting for the matrix multiply. The leak option overstates it: no target is involved in either program. And <code>fill_value=None</code> would put <code>NaN</code> into a dummy block, which the chapter's own assertion refuses: a blank in an indicator column means &ldquo;unknown&rdquo;, and nothing downstream knows what to do with it.",
          ar: "الاعتراضُ على «أ» عن <em>الزمن</em> لا عن المعلومة. فترميزُ الملفين معًا يتسرّب قليلًا &mdash; فأربعةٌ من أعمدته الـ29 لا توجد إلا لأن حزيران وصل &mdash; لكن اسمَ العمود لا يحمل شيئًا تقريبًا، وليس هذا ما يجعله غيرَ قابل للاستعمال. وإنما يجعله كذلك أنه ليس تحويلًا أصلًا: بل تحليلٌ لمرةٍ واحدة يحتاج كلَّ ملفٍّ في اليد معًا، فلا يستطيع تقييمَ إعلانٍ واحد، ومصفوفةُ تدريبه تتوقف على بيانات الاختبار، ولا تظهر الفئةُ الجديدة إلا عدَّ أعمدةٍ على أحدٍ أن يلاحظه. و«ب» يُصلح الثلاثةَ كلها: 25 عمودًا دائمًا، ولا شيءَ من حزيران في الضبط، وخمسةُ صفوف صفرية معدودة. والجوابُ الذي يُفضّل «أ» لأنه «لا يفقد شيئًا» هو أغراها، والذي يسمّيه فقدًا هو التشخيصُ نفسه: فالمربّعُ الصفري في المدينة يعني <em>أن مدينةَ هذا الصف ليست في القائمة المضبوطة</em>، وعدُّ تلك في كل دفعة مراقبُ انحرافٍ مجاني &mdash; أما العمودُ السادسُ والعشرون الذي لم يُدرَّب عليه نموذجٌ فليس معلومةً بل خطأً ينتظر ضربَ المصفوفات. وخيارُ التسرّب يبالغ: فلا هدفَ في أي من البرنامجين. و<code>fill_value=None</code> ستضع <code>NaN</code> في مربّعٍ مؤشِّر، وهذا ما يرفضه تأكيدُ الفصل نفسه: فالفراغُ في عمودٍ مؤشِّر يعني «غيرَ معروف»، ولا يعرف شيءٌ بعده ما يفعل به."
        }
      },

      /* ---------------------------------------------------------- 18 */
      {
        id: "t2bx18", type: "mcq", level: "medium",
        topics: ["t2-sparse-dummies", "t2-cardinality", "t2-level-to-encoder"],
        q: {
          en: "Eight candidate columns of the 480-flat frame, each measured for what one-hot encoding it would cost. <code>rows per column</code> is 480 divided by the width the encoding would produce. Which reading of the table is correct?",
          ar: "ثمانيةُ أعمدة مرشَّحة من جدول الشقق الـ480، قيس كلٌّ منها بما سيكلّفه ترميزُه الأحادي. و<code>rows per column</code> هو 480 مقسومًا على العرض الذي سينتجه الترميز. فأيُّ قراءةٍ للجدول صحيح؟"
        },
        code: code(
          "     column          dtype  distinct  one-hot columns  rows per column",
          "       city         string         5                5             96.0",
          "governorate         object         5                5             96.0",
          "     agency         object        20               20             24.0",
          "  condition       category         4                4            120.0",
          "  furnished        boolean         2                2            240.0",
          "     listed datetime64[ns]       117              117              4.1",
          "     advert         string        14               14             34.3",
          "      floor          Int64         7                7             68.6"
        ),
        options: [
          {
            en: "<code>listed</code> is the column the table disqualifies outright: 117 dummies over 480 rows is 4.1 rows of evidence per column, and each one asks &ldquo;was this flat advertised on exactly this day?&rdquo; &mdash; a question whose answer cannot repeat next month. A date belongs in derived features such as the month or the day of the week, not in a one-hot block.",
            ar: "‏<code>listed</code> هو العمودُ الذي يستبعده الجدولُ قطعًا: فـ117 مؤشِّرًا على 480 صفًّا يعني 4.1 صفوف دليلٍ لكل عمود، ويسأل كلٌّ منها «هل أُعلن عن هذه الشقة في هذا اليوم بالضبط؟» &mdash; وهو سؤالٌ لا يستطيع جوابُه أن يتكرّر الشهرَ القادم. فالتاريخُ ينتمي إلى خصائص مشتقّة كالشهر أو يوم الأسبوع، لا إلى مربّعٍ أحادي."
          },
          {
            en: "<code>furnished</code> is the cheapest column in the table at 240 rows per column, so it is the one to encode first; <code>city</code> and <code>governorate</code> are then redundant with each other, since both produce exactly five columns.",
            ar: "‏<code>furnished</code> أرخصُ أعمدة الجدول بـ240 صفًّا لكل عمود، فهو الأولُ بالترميز؛ وتكون <code>city</code> و<code>governorate</code> فائضتين إحداهما عن الأخرى، إذ تُنتج كلتاهما خمسةَ أعمدة بالضبط."
          },
          {
            en: "<code>agency</code> is safe to one-hot encode because 24 rows per column is well above the 10 the lesson requires, and the five agencies with a single listing each will simply contribute a column of zeros that the fit ignores.",
            ar: "‏<code>agency</code> آمنُ الترميز الأحادي لأن 24 صفًّا لكل عمود أعلى بكثير من العشرة التي يشترطها الدرس، وستُسهم الوكالاتُ الخمس ذاتُ الإعلان الواحد بعمودٍ من الأصفار يتجاهله الضبط."
          },
          {
            en: "<code>condition</code> at four columns and 120 rows each is the best candidate in the table, because a column with few levels and plenty of rows behind each one is what one-hot encoding is for.",
            ar: "‏<code>condition</code> بأربعة أعمدة و120 صفًّا لكلٍّ منها أفضلُ مرشَّحي الجدول، لأن العمودَ قليلَ المستويات الكثيرَ الصفوف وراء كل مستوى هو ما وُجد له الترميزُ الأحادي."
          }
        ],
        answer: 0,
        hint: {
          en: "Two of the columns here should not be one-hot encoded for reasons the width alone shows, and one should not be one-hot encoded for a reason no width can show. Read the <code>dtype</code> column as well as the counts.",
          ar: "عمودان هنا لا ينبغي ترميزُهما ترميزًا أحاديًّا لأسبابٍ يُظهرها العرضُ وحده، وعمودٌ لا ينبغي ترميزه لسببٍ لا يُظهره عرضٌ أصلًا. فاقرأ عمودَ <code>dtype</code> كما تقرأ الأعداد."
          },
        explain: {
          en: "<code>listed</code> is the one the table rules out on sight: 117 columns, 4.1 rows each, and every column is a question about one specific day that will never be asked again &mdash; the encoding would be memorisation with a timestamp. The answer that calls <code>condition</code> the best candidate is true as far as it goes and misses the point of the lesson: <code>condition</code> is <em>ordinal</em>, so one-hot throws away the only thing that makes it the strongest predictor in the file, which is that <code>poor &lt; fair &lt; good &lt; excellent</code>; the measured held-out error of one ordered code (59.48) and of three dummies (59.45) is the same, and the ordered code costs one column instead of three. The <code>agency</code> answer invents a threshold the lesson never states and then misreads the arithmetic: 24 rows per column is an average over a distribution in which the top five agencies hold 349 of the 480 rows and five agencies hold one row each, so those five coefficients are each fitted to a single observation &mdash; that is memorisation, not a column of zeros. And the <code>furnished</code> answer is wrong twice: a two-level column needs one indicator, not two, and <code>city</code> and <code>governorate</code> are not redundant for having the same width &mdash; they happen to be nearly collinear in <em>this</em> file, which is a fact about the file and not about the shape of the table.",
          ar: "‏<code>listed</code> هو الذي يستبعده الجدولُ من النظرة الأولى: 117 عمودًا، و4.1 صفوف لكلٍّ منها، وكلُّ عمود سؤالٌ عن يومٍ واحد بعينه لن يُسأل مرةً أخرى قط &mdash; فيكون الترميزُ حفظًا مع طابعٍ زمني. والجوابُ الذي يسمّي <code>condition</code> أفضلَ المرشَّحين صادقٌ في حدوده ويُفوّت مقصودَ الدرس: فـ<code>condition</code> <em>ترتيبي</em>، فيرمي الترميزُ الأحادي الشيءَ الوحيد الذي يجعله أقوى متنبئ في الملف، وهو أن <code>poor &lt; fair &lt; good &lt; excellent</code>؛ والخطأُ المحجوز المقيس لرمزٍ مرتَّب واحد (59.48) ولثلاثة مؤشِّرات (59.45) هو نفسه، ويكلّف الرمزُ المرتَّب عمودًا واحدًا لا ثلاثة. وجوابُ <code>agency</code> يختلق حدًّا لا يقوله الدرسُ قط ثم يُخطئ الحساب: فـ24 صفًّا لكل عمود متوسطٌ على توزيعٍ تحمل فيه الوكالاتُ الخمس الأُوَل 349 من الصفوف الـ480 وتحمل خمسُ وكالات صفًّا واحدًا لكلٍّ منها، فيكون كلٌّ من تلك المعاملات الخمسة مضبوطًا على مشاهدةٍ واحدة &mdash; وهذا حفظٌ لا عمودُ أصفار. وجوابُ <code>furnished</code> خاطئٌ مرتين: فالعمودُ ذو المستويين يحتاج مؤشِّرًا واحدًا لا اثنين، و<code>city</code> و<code>governorate</code> ليستا فائضتين لتساوي عرضهما &mdash; وإنما تكادان تكونان خطّيتين معًا في <em>هذا</em> الملف، وتلك واقعةٌ عن الملف لا عن شكل الجدول."
        }
      },

      /* ---------------------------------------------------------- 19 */
      {
        id: "t2bx19", type: "output", level: "medium",
        topics: ["t2-frequency-encoding", "t2-cardinality"],
        q: {
          en: "Write exactly what the program prints. Frequency encoding replaces an agency with its share of the training rows, so twenty agencies become one column instead of twenty. <code>TR</code> is the 346 training rows that carry a rent and they name 18 agencies; four of those have exactly one training row each, and the largest has 68.",
          ar: "اكتب بالضبط ما يطبعه البرنامج. يستبدل الترميزُ بالتكرار الوكالةَ بنصيبها من صفوف التدريب، فتصير عشرون وكالةً عمودًا واحدًا لا عشرين. و<code>TR</code> هي صفوفُ التدريب الـ346 التي تحمل إيجارًا وتسمّي 18 وكالة؛ لأربعٍ منها صفُّ تدريبٍ واحد بالضبط، ولأكبرها 68."
        },
        code: code(
          "freq = TR[\"agency\"].value_counts(normalize=True)   # FIT: one share per agency",
          "enc  = TR[\"agency\"].map(freq)                      # APPLY: one column",
          "",
          "print(TR[\"agency\"].nunique(), enc.nunique())",
          "print(int((enc == enc.min()).sum()), TR.loc[enc == enc.min(), \"agency\"].nunique())",
          "print(round(float(freq.max()), 4))"
        ),
        blanks: [
          { accept: ["18 15\n4 4\n0.1965"], lines: 3 }
        ],
        hint: {
          en: "The second line counts rows on the left and agencies on the right, and for the smallest share those two numbers are the same for a reason that is also the first line's answer. The third is 68 out of 346.",
          ar: "السطرُ الثاني يعدّ صفوفًا على اليسار ووكالاتٍ على اليمين، وهذان الرقمان عند أصغر نصيبٍ متساويان لسببٍ هو أيضًا جوابُ السطر الأول. والثالثُ هو 68 من 346."
        },
        explain: {
          en: "The first line is the whole objection to frequency encoding in three characters: 18 agencies, 15 distinct values. Two agencies with the same number of training rows receive <em>the same number</em>, so the encoder cannot tell them apart at all &mdash; and the four agencies with a single row each collapse into one value, 1/346 = 0.00289, which is what the second line counts: 4 rows, 4 different agencies, one code. Al-Quds Realty's 68 of 346 gives 0.1965. The encoding is honest about what it keeps (how common an agency is) and silent about what it drops (which agency it was), and the lesson's measurement is the verdict: 64.58 shekels held out against 63.67 for predicting one constant for everybody. One column instead of twenty, and the one column is worse than no column. Note that <code>value_counts(normalize=True)</code> is a fitted parameter like any other: the shares are measured on the 346 training rows, and a June agency the table has no key for maps to <code>NaN</code>, which is why the lesson's version ends in <code>.fillna(0.0)</code> &mdash; a share of zero is the honest answer for an agency nobody has seen.",
          ar: "السطرُ الأول هو الاعتراضُ كلُّه على الترميز بالتكرار في ثلاثة محارف: 18 وكالة و15 قيمةً مميّزة. فالوكالتان ذاتا عدد صفوف التدريب نفسه تتلقّيان <em>الرقمَ نفسه</em>، فلا يستطيع المُرمِّز أن يفرّق بينهما أصلًا &mdash; وتنطوي الوكالاتُ الأربع ذاتُ الصف الواحد في قيمةٍ واحدة، 1 ÷ 346 = 0.00289، وهي ما يعدّه السطرُ الثاني: أربعةُ صفوف وأربعُ وكالات مختلفة ورمزٌ واحد. و68 من 346 عند Al-Quds Realty تعطي 0.1965. فالترميزُ أمينٌ في ما يُبقيه (كم الوكالةُ شائعة) وصامتٌ عن ما يُسقطه (أيَّ وكالةٍ كانت)، وقياسُ الدرس هو الحكم: 64.58 شيكلًا محجوزًا في مقابل 63.67 للتنبؤ بثابتٍ واحد للجميع. عمودٌ واحد بدل عشرين، والعمودُ الواحد أسوأُ من لا عمود. ولاحظ أن <code>value_counts(normalize=True)</code> وسيطٌ مضبوط كأي وسيط: فالأنصبةُ مقيسةٌ على صفوف التدريب الـ346، ووكالةُ حزيران التي لا مفتاحَ لها في الجدول تُرسَم إلى <code>NaN</code>، ولهذا تنتهي نسخةُ الدرس بـ<code>.fillna(0.0)</code> &mdash; فنصيبُ الصفر هو الجوابُ الأمين لوكالةٍ لم يرَها أحد."
        }
      },

      /* ---------------------------------------------------------- 20 */
      {
        id: "t2bx20", type: "write", level: "hard",
        topics: ["t2-fitted-categories", "t2-unseen-report", "t2-shape-mismatch"],
        q: {
          en: "Write <code>encode_nominal(d, f)</code>, the one-hot step of stage 5, in the <code>(matrix, log_row)</code> shape. It one-hot encodes <code>city</code> and <code>agency</code> with the prefixes <code>city</code> and <code>agency</code> and dtype <code>int8</code>, then forces the result onto the fitted column list <code>f[\"columns\"]</code> so that every frame it is ever given comes back the same width and in the same order, with a 0 wherever a fitted column is absent. Before encoding, it must count the values of each column that <code>f[\"city\"]</code> and <code>f[\"agency\"]</code> do not contain &mdash; by name, because once a row has been encoded the name is gone. The log row records <code>rows_in</code>, <code>rows_out</code>, <code>columns</code>, how many rows carry a value the fit has never seen, and the <code>unseen</code> report. Then call it on <code>flats</code> and on <code>june</code> and print the two log rows.",
          ar: "اكتب <code>encode_nominal(d, f)</code>، خطوةَ الترميز الأحادي في المرحلة 5، في شكل <code>(matrix, log_row)</code>. ترمّز <code>city</code> و<code>agency</code> ترميزًا أحاديًّا بالبادئتين <code>city</code> و<code>agency</code> والنوعِ <code>int8</code>، ثم تُجبر النتيجةَ على قائمة الأعمدة المضبوطة <code>f[\"columns\"]</code> ليرجع كلُّ جدولٍ تُعطاه بالعرض نفسه وبالترتيب نفسه، وفيه صفرٌ حيث يغيب عمودٌ مضبوط. وعليها قبل الترميز أن تعدّ قيمَ كل عمودٍ لا تحتويها <code>f[\"city\"]</code> و<code>f[\"agency\"]</code> &mdash; بالاسم، لأن الاسمَ يذهب بعد ترميز الصف. ويسجّل سطرُ السجل <code>rows_in</code> و<code>rows_out</code> و<code>columns</code> وكم صفًّا يحمل قيمةً لم يرَها الضبطُ قط وتقريرَ <code>unseen</code>. ثم نادِها على <code>flats</code> وعلى <code>june</code> واطبع سطرَي السجل."
        },
        starter: code(
          "import pandas as pd",
          "",
          "# flats: 480 March flats   june: 85 listings nobody has read",
          "# f = {\"columns\": [25 names, in order],",
          "#      \"city\":   [5 names],  \"agency\": [20 names]}",
          "",
          "# your code here"
        ),
        lines: 18,
        checks: [
          {
            re: "def\\s+encode_nominal\\s*\\(\\s*\\w+\\s*,\\s*\\w+",
            label: {
              en: "A function <code>encode_nominal</code> taking the frame and the fitted dictionary",
              ar: "دالّةٌ <code>encode_nominal</code> تأخذ الجدولَ وقاموسَ الوسائط المضبوطة"
            }
          },
          {
            re: "get_dummies\\s*\\(",
            label: {
              en: "One-hot encode with <code>pd.get_dummies</code>",
              ar: "الترميزُ الأحادي بـ<code>pd.get_dummies</code>"
            }
          },
          {
            re: "\\.reindex\\s*\\(\\s*columns\\s*=",
            label: {
              en: "Force the result onto the fitted column list with <code>reindex(columns=&hellip;)</code>",
              ar: "إجبارُ النتيجة على قائمة الأعمدة المضبوطة بـ<code>reindex(columns=&hellip;)</code>"
            }
          },
          {
            re: "fill_value\\s*=\\s*0",
            label: {
              en: "A missing fitted column is filled with 0, not left blank",
              ar: "العمودُ المضبوط الغائب يُعبَّأ بصفر لا يُترك فارغًا"
            }
          },
          {
            re: "\\.isin\\s*\\(",
            label: {
              en: "Test each value against the fitted list of levels",
              ar: "اختبارُ كل قيمة في مقابل قائمة المستويات المضبوطة"
            }
          },
          {
            re: "value_counts\\s*\\(",
            label: {
              en: "Report the unseen values by name and count",
              ar: "التبليغُ عن القيم غير المرئية بالاسم والعدد"
            }
          }
        ],
        forbid: [
          {
            re: "pd\\.concat\\s*\\(",
            label: {
              en: "Concatenating the two frames and encoding them together",
              ar: "ضمُّ الجدولين وترميزُهما معًا"
            }
          },
          {
            re: "drop_first\\s*=\\s*True",
            label: {
              en: "<code>drop_first=True</code> &mdash; it destroys the all-zero row that reports an unseen value",
              ar: "‏<code>drop_first=True</code> &mdash; تُهلك الصفَّ الصفري الذي يُبلّغ عن قيمةٍ غير مرئية"
            }
          }
        ],
        solution: {
          code: code(
            "def encode_nominal(d, f):",
            "    \"\"\"One-hot city and agency against a FITTED list; return (matrix, log_row).\"\"\"",
            "    unseen = {}",
            "    for col in (\"city\", \"agency\"):",
            "        bad = d.loc[d[col].notna() & ~d[col].isin(f[col]), col]",
            "        if len(bad):",
            "            unseen[col] = bad.value_counts().to_dict()",
            "",
            "    M = pd.get_dummies(d[[\"city\", \"agency\"]], columns=[\"city\", \"agency\"],",
            "                       prefix=[\"city\", \"agency\"], dtype=\"int8\")",
            "    M = M.reindex(columns=f[\"columns\"], fill_value=0)",
            "",
            "    return M, {\"step\": \"one-hot city + agency\", \"rows_in\": len(d), \"rows_out\": len(M),",
            "               \"columns\": M.shape[1],",
            "               \"rows_with_an_unseen_value\": int((M.sum(axis=1) < 2).sum()),",
            "               \"unseen\": unseen or \"none\"}",
            "",
            "M_march, log_march = encode_nominal(flats, f)",
            "M_june,  log_june  = encode_nominal(june,  f)",
            "print(pd.DataFrame([log_march, log_june]).to_string(index=False))"
          ),
          out: code(
            "                 step  rows_in  rows_out  columns  rows_with_an_unseen_value                                                                                              unseen",
            "one-hot city + agency      480       480       25                          0                                                                                                none",
            "one-hot city + agency       85        85       25                          5 {'city': {'Beit Lahia': 2}, 'agency': {'Andalus Homes': 1, 'Burhan Realty': 1, 'Sumud Housing': 1}}"
          ),
          en: "Three moves, in this order. Count the unseen values first, by name, while the names still exist. Then encode whatever this frame happens to contain. Then <code>reindex(columns=f[\"columns\"], fill_value=0)</code>, which does both jobs at once: it adds the fitted columns June never produced, filled with 0, and it drops the four columns June produced that the fit has no place for &mdash; so the matrix is 25 wide and in the fitted order whichever file it came from. The row count in the log is the cheap integrity check: a complete row sums to exactly 2, one city and one agency, so <code>&lt; 2</code> counts the rows with an unseen value &mdash; 0 for March, 5 for June.",
          ar: "ثلاثُ حركات بهذا الترتيب. عُدَّ القيمَ غيرَ المرئية أولًا بالاسم، والأسماءُ ما زالت موجودة. ثم رمّز ما يحتويه هذا الجدولُ أيًّا كان. ثم <code>reindex(columns=f[\"columns\"], fill_value=0)</code>، وهي تؤدّي العملين معًا: تضيف الأعمدةَ المضبوطة التي لم يُنتجها حزيران معبَّأةً بصفر، وتُسقط الأعمدةَ الأربعة التي أنتجها حزيران ولا موضعَ لها في الضبط &mdash; فتكون المصفوفةُ 25 عمودًا وبالترتيب المضبوط من أيِّ ملفٍّ جاءت. وعدُّ الصفوف في السجل هو فحصُ السلامة الرخيص: فالصفُّ الكامل مجموعُه 2 بالضبط، مدينةٌ ووكالة، فتعدّ <code>&lt; 2</code> الصفوفَ ذاتَ قيمةٍ غير مرئية &mdash; صفرٌ لآذار وخمسةٌ لحزيران."
        },
        hint: {
          en: "The order of the three moves is the question. Casting a value to a fitted category list, or reindexing away the column it produced, both turn a named problem into an unnamed one &mdash; so the report has to be taken before either. For the row count, ask what a complete row of this matrix sums to.",
          ar: "ترتيبُ الحركات الثلاث هو السؤال. فإلحاقُ قيمةٍ بقائمة فئات مضبوطة، أو إزالةُ العمود الذي أنتجته بإعادة الفهرسة، كلاهما يحوّل مشكلةً مسمّاة إلى مشكلةٍ بلا اسم &mdash; فيجب أن يُؤخذ التقريرُ قبل أيٍّ منهما. وأما عدُّ الصفوف فاسأل: كم مجموعُ الصفِّ الكامل في هذه المصفوفة؟"
        },
        explain: {
          en: "This is the step that makes a model trained on March able to score June, and the three moves are not interchangeable. The report has to come first because every later move erases a name: casting to the fitted categories turns <em>Beit Lahia</em> into <code>&lt;NA&gt;</code>, and the reindex turns the <code>city_Beit Lahia</code> column into nothing at all, so by the time you have a matrix the only trace left is a row of five zeros. <code>reindex</code> rather than any kind of merge or concat is what guarantees the width, and <code>fill_value=0</code> rather than the default <code>NaN</code> is what keeps the block an integer matrix a model can multiply. Both forbidden shortcuts are tempting for real reasons. Concatenating the two files and encoding them together produces a matrix that fits every row, and it is not a transform: it cannot encode one listing, and four of its columns would exist only because June happened to be in memory. And <code>drop_first=True</code> is the right choice when you are reading coefficients, but here it costs the diagnostic: without it exactly 2 of June's 85 rows have an all-zero city block and they are the unseen city; with it 17 do, because the 15 legitimate <em>Deir al-Balah</em> listings look identical to the 2 unseen ones and nothing in the matrix can tell them apart.",
          ar: "هذه هي الخطوةُ التي تُمكّن نموذجًا مُدرَّبًا على آذار من تقييم حزيران، والحركاتُ الثلاث غيرُ قابلة للتبادل. فيجب أن يأتي التقريرُ أولًا لأن كلَّ حركةٍ بعده تمحو اسمًا: فالإلحاقُ بالفئات المضبوطة يحوّل <em>Beit Lahia</em> إلى <code>&lt;NA&gt;</code>، وإعادةُ الفهرسة تحوّل عمودَ <code>city_Beit Lahia</code> إلى لا شيء أصلًا، فلا يبقى حين تصير عندك مصفوفةٌ إلا أثرُ صفٍّ من خمسة أصفار. و<code>reindex</code> لا أيُّ دمجٍ أو ضمّ هي ما يضمن العرض، و<code>fill_value=0</code> لا <code>NaN</code> الافتراضية هي ما يُبقي المربّعَ مصفوفةً صحيحة يستطيع نموذجٌ أن يضربها. والمختصران المحظوران مغريان لأسبابٍ حقيقية كلاهما. فضمُّ الملفين وترميزُهما معًا يُنتج مصفوفةً تلائم كلَّ صف، وهو ليس تحويلًا: فلا يستطيع ترميزَ إعلانٍ واحد، وأربعةٌ من أعمدته لا توجد إلا لأن حزيران كان في الذاكرة اتفاقًا. و<code>drop_first=True</code> هو الاختيارُ الصحيح حين تقرأ معاملات، لكنه يكلّف هنا التشخيصَ: فبدونه يكون لصفّين بالضبط من صفوف حزيران الـ85 مربّعٌ صفري في المدينة وهما المدينةُ غيرُ المرئية؛ ومعه يكون لسبعةَ عشرَ صفًّا، لأن إعلانات <em>Deir al-Balah</em> الخمسةَ عشرَ المشروعة تبدو مطابقةً للصفّين غير المرئيَّين ولا شيءَ في المصفوفة يستطيع التفريقَ بينهما."
        }
      },

      /* ---------------------------------------------------------- 21 */
      {
        id: "t2bx21", type: "ordercode", level: "medium",
        topics: ["t2-transform-listings", "t2-june-applied", "t2-whole-chapter-mae"],
        q: {
          en: "<code>make_comparable(df)</code> is stages 1 and 2, which learn nothing. <code>transform_listings(df)</code> with no second argument learns its parameters from the rows it is given and hands them back; <code>transform_listings(df, par)</code> applies the parameters it is given and recomputes nothing. Put the statements in the one order that runs and prints <code>360 120 True</code> &mdash; the matrix the model is fitted on, the matrix it is measured on, and the claim that they have the same columns in the same order.",
          ar: "‏<code>make_comparable(df)</code> هي المرحلتان 1 و2، ولا تتعلّمان شيئًا. و<code>transform_listings(df)</code> بلا وسيطٍ ثانٍ تتعلّم وسائطها من الصفوف التي تُعطاها وتعيدها؛ و<code>transform_listings(df, par)</code> تطبّق الوسائطَ التي تُعطاها ولا تحسب شيئًا من جديد. رتّب الأسطرَ بالترتيب الوحيد الذي يعمل ويطبع <code>360 120 True</code> &mdash; المصفوفةُ التي يُضبط عليها النموذج، والمصفوفةُ التي يُقاس عليها، والادّعاءُ بأن لهما الأعمدةَ نفسها بالترتيب نفسه."
        },
        items: [
          { code: "flats, _ = make_comparable(march)                 # stage 1 settles what a row is" },
          { code: "train_ids = set(flats.sample(frac=0.75, random_state=3)[\"listing_id\"])" },
          { code: "train = flats[flats[\"listing_id\"].isin(train_ids)]\nheld  = flats[~flats[\"listing_id\"].isin(train_ids)]" },
          { code: "Xtr, _, par = transform_listings(train)           # FIT: from these rows only" },
          { code: "Xte, _, _   = transform_listings(held, par)       # APPLY: nothing is refitted" },
          { code: "print(len(Xtr), len(Xte), list(Xtr.columns) == list(Xte.columns))" }
        ],
        answer: [0, 1, 2, 3, 4, 5],
        hint: {
          en: "Every statement needs a name the statement above it created. Two of the placements are the chapter rather than the syntax: one is the reason the split is taken on <code>listing_id</code> and not on row positions, and one is the word &ldquo;only&rdquo;.",
          ar: "كلُّ سطرٍ يحتاج اسمًا أنشأه السطرُ الذي فوقه. وموضعان يحملان الفصلَ لا القواعدَ النحوية: أحدهما سببُ أخذ القسمة على <code>listing_id</code> لا على مواضع الصفوف، والآخرُ كلمةُ «وحدها»."
        },
        explain: {
          en: "The chain of names fixes most of the order: <code>flats</code> before the sample, <code>train_ids</code> before the two frames, <code>train</code> before the fit, <code>par</code> before the apply, both matrices before the print. Two placements carry the chapter. <code>make_comparable</code> has to run first because stage 1 decides what a row <em>is</em>: split the 503 scraped rows instead and ten flats land on both sides, so the held-out error measures memory. And the split is taken on <code>listing_id</code> rather than by position for the same reason one step further on &mdash; a flat, not a row, is the unit that may be held back. Then <code>transform_listings(train)</code> has to come before <code>transform_listings(held, par)</code>, and not merely because <code>par</code> would be undefined: calling the no-argument form twice would refit every median, mode, fence and category list on the held-out rows, and the two matrices would be built by two different transforms. The printed <code>True</code> is the assertion that makes the pair usable at all: 18 column names, in the same order, so the coefficients fitted on <code>Xtr</code> mean the same thing in <code>Xte</code>.",
          ar: "سلسلةُ الأسماء تحسم معظمَ الترتيب: <code>flats</code> قبل السحب، و<code>train_ids</code> قبل الجدولين، و<code>train</code> قبل الضبط، و<code>par</code> قبل التطبيق، والمصفوفتان قبل الطبع. وموضعان يحملان الفصل. فعلى <code>make_comparable</code> أن تعمل أولًا لأن المرحلةَ الأولى تحسم <em>ماهيةَ</em> الصف: فاقسم الصفوفَ الـ503 المسحوبة عوضًا عن ذلك فتقع عشرُ شقق على الجانبين، فيقيس الخطأُ المحجوز حفظًا. وتُؤخذ القسمةُ على <code>listing_id</code> لا بالموضع للسبب نفسه خطوةً أبعد &mdash; فالشقةُ لا الصفُّ هي الوحدةُ التي يجوز حجزُها. ثم على <code>transform_listings(train)</code> أن تسبق <code>transform_listings(held, par)</code>، ولا لمجرّد أن <code>par</code> ستكون غيرَ معرَّفة: فنداءُ الصورة بلا وسيطٍ مرتين سيعيد ضبطَ كل وسيط ومنوال وسياج وقائمةِ فئات على الصفوف المحجوزة، وستُبنى المصفوفتان بتحويلين مختلفين. و<code>True</code> المطبوعة هي التأكيدُ الذي يجعل الزوجَ قابلًا للاستعمال أصلًا: ثمانيةَ عشرَ اسمَ عمود بالترتيب نفسه، فتعني المعاملاتُ المضبوطة على <code>Xtr</code> الشيءَ نفسه في <code>Xte</code>."
        }
      },

      /* ---------------------------------------------------------- 22 */
      {
        id: "t2bx22", type: "error", level: "hard",
        topics: ["t2-groupby-nan-bug", "t2-index-alignment", "t2-transform"],
        q: {
          en: "The step wants a group statistic as a feature: beside every flat, the median rent of flats with the same number of rooms. <code>rows</code> has a clean <code>RangeIndex</code> of 0 to 479, and after the repairs of Lesson 4 the <code>rooms</code> column holds 1.0 to 5.0 with two blanks. The program runs, raises nothing, and prints the three commented lines. Click the offending line.",
          ar: "تريد الخطوةُ مقياسَ مجموعةٍ خاصيةً: أن يكون بجانب كل شقة وسيطُ إيجار الشقق ذاتِ عدد الغرف نفسه. ولـ<code>rows</code> فهرسٌ نظيف <code>RangeIndex</code> من 0 إلى 479، وبعد إصلاحات الدرس 4 يحمل عمودُ <code>rooms</code> ‏1.0 حتى 5.0 وفراغين. والبرنامجُ يعمل ولا يُطلق شيئًا ويطبع الأسطرَ الثلاثة المعلَّقة. انقر السطر المخطئ."
        },
        code: code(
          "flats, _ = make_comparable(march)                  # 480 flats, index 136, 106, 400 ...",
          "rows = flats.reset_index(drop=True)                # index is now 0 .. 479",
          "work = rows.copy()",
          "work[\"rooms_median\"] = rows.groupby(\"rooms\")[\"monthly_rent\"].median()",
          "truth = rows.groupby(\"rooms\")[\"monthly_rent\"].transform(\"median\")",
          "",
          "print(\"filled:\", int(work[\"rooms_median\"].notna().sum()), \"of\", len(work))",
          "print(\"of those, wrong:\", int((work[\"rooms_median\"].notna() &",
          "      (work[\"rooms_median\"] != truth)).sum()))",
          "print(\"right by luck :\", int((work[\"rooms_median\"].notna() &",
          "      (work[\"rooms_median\"] == truth)).sum()))",
          "",
          "# filled: 5 of 480",
          "# of those, wrong: 2",
          "# right by luck : 3"
        ),
        answer: 4,
        solution: {
          code: code(
            "flats, _ = make_comparable(march)",
            "rows = flats.reset_index(drop=True)",
            "work = rows.copy()",
            "work[\"rooms_median\"] = rows.groupby(\"rooms\")[\"monthly_rent\"].transform(\"median\")",
            "truth = rows.groupby(\"rooms\")[\"monthly_rent\"].transform(\"median\")",
            "",
            "print(\"filled:\", int(work[\"rooms_median\"].notna().sum()), \"of\", len(work))",
            "print(\"of those, wrong:\", int((work[\"rooms_median\"].notna() &",
            "      (work[\"rooms_median\"] != truth)).sum()))",
            "print(\"right by luck :\", int((work[\"rooms_median\"].notna() &",
            "      (work[\"rooms_median\"] == truth)).sum()))"
          ),
          out: code(
            "filled: 478 of 480",
            "of those, wrong: 0",
            "right by luck : 3"
          ),
          en: "Replace the aggregation with <code>transform(\"median\")</code>, which returns one value per <em>original row</em> rather than one per group, already aligned to the frame's own index. 478 of the 480 rows are then filled &mdash; the two left blank are the flats whose <code>rooms</code> Lesson 4's limits voided, which is the honest answer for a row with no group.",
          ar: "استبدل التجميعَ بـ<code>transform(\"median\")</code>، التي تعيد قيمةً لكل <em>صفٍّ أصلي</em> لا قيمةً لكل مجموعة، مُحاذاةً أصلًا على فهرس الجدول نفسه. فيُعبَّأ 478 من الصفوف الـ480 &mdash; والصفّان المتروكان فارغين هما الشقتان اللتان أبطلت حدودُ الدرس 4 ‏<code>rooms</code> فيهما، وهذا هو الجوابُ الأمين لصفٍّ لا مجموعةَ له."
        },
        hint: {
          en: "Count what each side of the assignment is: how many values does the right-hand side hold, and what are their labels? Then ask how pandas decides which row of <code>work</code> each of those values belongs to.",
          ar: "عُدَّ ما على كل جانبٍ من الإسناد: كم قيمةً يحمل الجانبُ الأيمن؟ وما أوسمتها؟ ثم اسأل: كيف تقرّر pandas إلى أيِّ صفٍّ من <code>work</code> تنتمي كلٌّ من تلك القيم؟"
        },
        explain: {
          en: "Line 4 assigns an <em>aggregation</em> to a column. The right-hand side is a Series of five numbers whose index is <code>[1.0, 2.0, 3.0, 4.0, 5.0]</code> &mdash; the rooms counts, not row labels &mdash; and assigning a Series to a column aligns on the index, so pandas matches those five labels against row labels 0 to 479. Five of them exist, so five cells are filled and 475 become <code>NaN</code>, and the five that are filled got the median of a rooms group chosen by a numeric coincidence: the flat at row label 3 is handed the median of the 3-room flats whatever its own rooms count is. Two of the five are wrong and three are right by luck, which is the worst possible outcome &mdash; a column that is 475 blanks and 2 wrong numbers would at least be noticed, and the three coincidences are what make a reviewer believe the line worked. The lucky version of this bug is the one the chapter warns about hardest: on a frame whose index happens to be the group labels, every cell would be filled and some would be silently wrong. <code>transform</code> is not a convenience for <code>agg</code>; it is a different question. <code>agg</code> answers &ldquo;what is true of each group&rdquo; and returns one row per group; <code>transform</code> answers &ldquo;what is true of this row's group&rdquo; and returns one value per original row. The two-second check is <code>len()</code>: 5 against 480.",
          ar: "السطرُ 4 يُسند <em>تجميعًا</em> إلى عمود. فالجانبُ الأيمن متسلسلةٌ من خمسة أرقام فهرسها <code>[1.0, 2.0, 3.0, 4.0, 5.0]</code> &mdash; أعدادُ الغرف لا أوسمةُ الصفوف &mdash; وإسنادُ متسلسلةٍ إلى عمود يُحاذي على الفهرس، فتطابق pandas تلك الأوسمةَ الخمسة في مقابل أوسمة الصفوف من 0 إلى 479. وخمسةٌ منها موجودة، فتُعبَّأ خمسُ خلايا ويصير 475 منها <code>NaN</code>، والخمسُ المعبَّأة أخذت وسيطَ مجموعةِ غرفٍ اختارتها مصادفةٌ رقمية: فالشقةُ عند الوسم 3 تُعطى وسيطَ شقق الثلاث غرف أيًّا كان عددُ غرفها. واثنتان من الخمس خاطئتان وثلاثٌ صحيحةٌ بالحظ، وهذه أسوأُ نتيجةٍ ممكنة &mdash; فعمودٌ فيه 475 فراغًا ورقمان خاطئان كان سيُلاحَظ على الأقل، والمصادفاتُ الثلاث هي ما يجعل المراجعَ يعتقد أن السطرَ عمل. والصورةُ المحظوظة من هذا العطب هي التي يحذّر الفصلُ منها أشدَّ تحذيره: فعلى جدولٍ يكون فهرسُه أوسمةَ المجموعات اتفاقًا تُعبَّأ كلُّ خلية ويكون بعضُها خاطئًا في صمت. و<code>transform</code> ليست تسهيلًا لـ<code>agg</code>؛ بل هي سؤالٌ آخر. فـ<code>agg</code> تجيب «ما يصحّ عن كل مجموعة» وتعيد صفًّا لكل مجموعة؛ و<code>transform</code> تجيب «ما يصحّ عن مجموعة هذا الصف» وتعيد قيمةً لكل صفٍّ أصلي. والفحصُ في ثانيتين هو <code>len()</code>: خمسةٌ في مقابل 480."
        }
      },

      /* ---------------------------------------------------------- 23 */
      {
        id: "t2bx23", type: "trace", level: "hard",
        topics: ["t2-raw-key-merge", "t2-clean-key-merge", "t2-outer-unmatched"],
        q: {
          en: "<code>city_reference.csv</code> holds one row per city &mdash; the five of this market under their canonical spelling, plus Beit Lahia, which no March listing names. The 503 scraped rows spell their city 26 ways. <code>CITY_MAP</code> is the 11-key map of Lesson 3. After the last line has run, what are the values of the four variables?",
          ar: "يحمل <code>city_reference.csv</code> صفًّا لكل مدينة &mdash; خمسُ هذه السوق بتهجئتها المعيارية، وBeit Lahia التي لا يسمّيها إعلانٌ من آذار. وتهجّي الصفوفُ الـ503 المسحوبة مدينتَها بستٍّ وعشرين صورة. و<code>CITY_MAP</code> هي خريطةُ الدرس 3 ذاتُ المفاتيح الأحدَ عشرَ. فبعد تنفيذ السطر الأخير، ما قيم المتغيرات الأربعة؟"
        },
        code: code(
          "march = pd.read_csv(\"listings_raw.csv\")      # 503 rows",
          "ref   = pd.read_csv(\"city_reference.csv\")    # 6 rows, city unique",
          "",
          "clean = march.assign(city=march[\"city\"].str.strip().str.lower()",
          "                     .str.replace(r\"\\s+\", \" \", regex=True).map(CITY_MAP))",
          "",
          "raw_inner   = len(march.merge(ref, on=\"city\", how=\"inner\"))",
          "clean_inner = len(clean.merge(ref, on=\"city\", how=\"inner\"))",
          "clean_outer = len(clean.merge(ref, on=\"city\", how=\"outer\"))",
          "unmatched   = int((march.merge(ref, on=\"city\", how=\"left\",",
          "                               indicator=True)[\"_merge\"] == \"left_only\").sum())"
        ),
        blanks: [
          { accept: ["316"], label: { en: "raw_inner", ar: "raw_inner" } },
          { accept: ["503"], label: { en: "clean_inner", ar: "clean_inner" } },
          { accept: ["504"], label: { en: "clean_outer", ar: "clean_outer" } },
          { accept: ["187"], label: { en: "unmatched", ar: "unmatched" } }
        ],
        hint: {
          en: "Only five of the 26 raw spellings are the canonical ones, and they are not the commonest ones by as much as you might think. The reference key is unique and every listing matches at most one row, so no join here can multiply a row &mdash; but one of the four joins can add a row that is not a listing.",
          ar: "خمسٌ فقط من التهجئات الـ26 الخام هي المعيارية، وهي ليست أشيعَها بالقدر الذي قد تظنّه. ومفتاحُ المرجع مميّز ويطابق كلُّ إعلانٍ صفًّا واحدًا على الأكثر، فلا يستطيع دمجٌ هنا أن يضاعف صفًّا &mdash; غير أن واحدًا من الدمجات الأربعة يستطيع أن يضيف صفًّا ليس إعلانًا."
        },
        explain: {
          en: "Merging on the raw column matches the 316 rows that happen to be spelled canonically and an inner join silently drops the other 187 &mdash; 37% of the file, with no error and no warning, and <code>len()</code> is the only thing that would ever tell you. <code>unmatched</code> is the same 187 counted properly, which is what <code>indicator=True</code> is for: a left join keeps every listing and the <code>_merge</code> column says which ones found nothing, so the loss becomes a number in the log instead of a silent deletion. On the cleaned key all 503 match, and because the reference key is unique the row count cannot grow: 503 in, 503 out. The outer join is the audit: 504, because it adds the one reference row that matched nothing &mdash; Beit Lahia, a real town of 89,838 people with no listing in March, which is exactly the row you want to see before next month's file arrives with two of them. The rule the chapter repeats: assert the row count after every merge, because the only difference between these four calls is a keyword, and three of the four row counts look plausible.",
          ar: "الدمجُ على العمود الخام يطابق الصفوفَ الـ316 التي اتفق أن تكون مهجّأةً تهجئةً معيارية ويُسقط الدمجُ الداخلي الـ187 الأخرى بصمت &mdash; أي 37% من الملف، بلا خطأ ولا تحذير، و<code>len()</code> هي الشيءُ الوحيد الذي كان سيخبرك. و<code>unmatched</code> هي الـ187 نفسها معدودةً كما ينبغي، وهذا ما وُجدت له <code>indicator=True</code>: فالدمجُ الأيسر يُبقي كلَّ إعلان ويقول عمودُ <code>_merge</code> أيُّها لم يجد شيئًا، فيصير الفقدُ رقمًا في السجل لا حذفًا صامتًا. وعلى المفتاح المنظَّف تطابق الـ503 كلها، ولأن مفتاحَ المرجع مميّزٌ لا يستطيع عددُ الصفوف أن ينمو: 503 دخلت و503 خرجت. والدمجُ الخارجي هو التدقيق: 504، لأنه يضيف صفَّ المرجع الواحد الذي لم يطابق شيئًا &mdash; Beit Lahia، بلدةٌ حقيقية فيها 89,838 نسمة بلا إعلانٍ في آذار، وهي بالضبط الصفُّ الذي تريد أن تراه قبل أن يصل ملفُّ الشهر القادم وفيه إعلانان منها. والقاعدةُ التي يعيدها الفصل: أكّد عددَ الصفوف بعد كل دمج، لأن الفرقَ الوحيد بين هذه النداءات الأربعة وسيطٌ واحد، وثلاثةٌ من أعداد الصفوف الأربعة تبدو معقولة."
        }
      },

      /* ---------------------------------------------------------- 24 */
      {
        id: "t2bx24", type: "mcq", level: "hard",
        topics: ["t2-concat-nan", "t2-concat-join-inner", "t2-stacking-fix"],
        q: {
          en: "Two months, each one-hot encoded on its own and then stacked. March's 503 rows give 52 dummy columns (26 city spellings among them), June's 85 give 13, and June brings <code>city_Beit Lahia</code> and <code>condition_very good</code> that March has no column for. The third block encodes both files against one <em>fitted</em> list of five canonical cities instead. Which statement is correct?",
          ar: "شهران، رُمِّز كلٌّ منهما ترميزًا أحاديًّا وحده ثم رُصّا. فصفوفُ آذار الـ503 تعطي 52 عمودًا مؤشِّرًا (فيها 26 تهجئةَ مدينة)، وصفوفُ حزيران الـ85 تعطي 13، ويجلب حزيران <code>city_Beit Lahia</code> و<code>condition_very good</code> ولا عمودَ لهما في آذار. أما المربّعُ الثالث فيرمّز الملفين في مقابل قائمةٍ <em>مضبوطة</em> واحدة من خمس مدن معيارية. فأيُّ العبارات صحيح؟"
        },
        code: code(
          "pd.concat([A, B], axis=0)                 -> (588, 54)  blanks 4491  in 43 columns",
          "pd.concat([A, B], axis=0, join=\"inner\")   -> (588, 11)  blanks 0",
          "    columns kept   : the 5 canonical cities, 4 conditions, furnished_no, furnished_yes",
          "    columns dropped: 43, among them city_Beit Lahia and condition_very good",
          "    all-zero city rows in the result: 189",
          "",
          "pd.concat([EA, EB], keys=[\"march\", \"june\"], names=[\"batch\"])",
          "                                          -> (588, 5)   blanks 0",
          "    rows whose city no fitted level covers: 2"
        ),
        options: [
          {
            en: "<code>join=\"inner\"</code> is not the fix: it keeps only the 11 columns both files happened to produce, so <code>city_Beit Lahia</code> and <code>condition_very good</code> &mdash; the only places June's new values were written down &mdash; are deleted without a line of output, and March's 187 misspelled rows now have an all-zero city block that is indistinguishable from the 2 genuine Beit Lahia flats. Encoding both months against the fitted list of five gives 5 columns, 0 blanks and a count of exactly the 2 rows no level covers.",
            ar: "‏<code>join=\"inner\"</code> ليس العلاج: فهو لا يُبقي إلا الأعمدة الـ11 التي اتفق أن ينتجها الملفان، فتُحذف <code>city_Beit Lahia</code> و<code>condition_very good</code> &mdash; وهما الموضعان الوحيدان اللذان كُتبت فيهما قيمُ حزيران الجديدة &mdash; بلا سطرِ خَرج، ويصير لصفوف آذار الـ187 المهجَّأة خطأً مربّعٌ صفري في المدينة لا يُفرَّق عن شقتَي Beit Lahia الحقيقيتين. وترميزُ الشهرين في مقابل القائمة المضبوطة ذاتِ الخمس يعطي 5 أعمدة وصفرَ فراغات وعدَّ الصفّين اللذين لا يغطّيهما مستوًى بالضبط."
          },
          {
            en: "The 4,491 blanks of the outer concat are simply zeros pandas has not written yet, so <code>.fillna(0)</code> repairs the stacked frame exactly and the first call becomes the right answer.",
            ar: "فراغاتُ الضمّ الخارجي الـ4491 ليست إلا أصفارًا لم تكتبها pandas بعد، فتُصلح <code>.fillna(0)</code> الجدولَ المرصوص إصلاحًا تامًّا ويصير النداءُ الأول هو الجواب الصحيح."
          },
          {
            en: "The real problem in all three calls is the index: both files were read with a default <code>RangeIndex</code>, so 85 labels appear twice. <code>ignore_index=True</code> renumbers them, and with unique labels the blanks and the all-zero rows do not arise.",
            ar: "المشكلةُ الحقيقية في النداءات الثلاثة هي الفهرس: فقد قُرئ الملفان بـ<code>RangeIndex</code> افتراضي، فيظهر 85 وسمًا مرتين. وتعيد <code>ignore_index=True</code> ترقيمَها، وبأوسمةٍ مميّزة لا تنشأ الفراغاتُ ولا الصفوفُ الصفرية."
          },
          {
            en: "The third block is the worst of the three, because it is the only one that loses June's Beit Lahia listings entirely: 5 columns cannot represent 6 cities, so those two rows are dropped from the stacked frame.",
            ar: "المربّعُ الثالث أسوأُ الثلاثة، لأنه الوحيد الذي يفقد إعلانات Beit Lahia في حزيران فقدًا تامًّا: فخمسةُ أعمدة لا تستطيع تمثيلَ ستّ مدن، فيُحذف ذلك الصفّان من الجدول المرصوص."
          }
        ],
        answer: 0,
        hint: {
          en: "Zero blanks is what <code>join=\"inner\"</code> is bought with, so ask what it was paid for: count the columns before and after, and read the one line of the output that is about rows rather than columns.",
          ar: "صفرُ الفراغات هو ما يُشترى به <code>join=\"inner\"</code>، فاسأل: بماذا دُفع ثمنه؟ عُدَّ الأعمدة قبله وبعده، واقرأ السطرَ الوحيد من الخَرج الذي يتكلّم عن صفوفٍ لا عن أعمدة."
        },
        explain: {
          en: "<code>join=\"inner\"</code> prints 588 rows, 11 columns and no blanks, which looks like a clean result and is the worst of the three. Three quarters of the columns are gone, including the two that were the only record of June's new city and new condition level, and the 189 all-zero city rows mix March's 187 misspellings with the 2 real Beit Lahia flats so that nothing in the frame can separate them. The <code>fillna(0)</code> answer is the tempting one because for most of the cells a zero is true: March really is not in Beit Lahia. But a zero in <code>condition_very good</code> for a March flat is the positive claim &ldquo;this flat is not in very good condition&rdquo;, and March never offered that option, so the claim is unfounded for all 503 of them &mdash; a blank in a dummy column means <em>unknown</em>, not <em>no</em>. The dtype says the same thing for free: <code>city_Gaza</code> is still <code>int8</code> because it exists on both sides, while every one-sided column has been promoted to <code>float64</code> to hold the <code>NaN</code>. The index answer names a real second bug &mdash; 85 duplicated labels, so <code>stacked.loc[3]</code> returns two rows &mdash; and then claims a fix for the wrong problem: renumbering the rows cannot invent a column. And the third block does not lose the Beit Lahia rows: they are kept, their city block is five zeros, and the step counts them, which is the whole point of encoding against a fitted list rather than against whatever a file happens to contain.",
          ar: "يطبع <code>join=\"inner\"</code> ‏588 صفًّا و11 عمودًا ولا فراغات، وهذا يبدو نتيجةً نظيفة وهو أسوأُ الثلاثة. فثلاثةُ أرباع الأعمدة ذهبت، وفيها العمودان اللذان كانا السجلَّ الوحيد لمدينة حزيران الجديدة ومستوى حالته الجديد، وتخلط الصفوفُ الصفرية الـ189 في المدينة تهجئاتِ آذار الخاطئة الـ187 بشقتَي Beit Lahia الحقيقيتين فلا يستطيع شيءٌ في الجدول أن يفصلهما. وجوابُ <code>fillna(0)</code> هو الأغرى لأن الصفرَ صادقٌ في معظم الخلايا: فآذار ليس في Beit Lahia حقًّا. لكن الصفرَ في <code>condition_very good</code> لشقةٍ من آذار هو الادّعاءُ الموجب «هذه الشقة ليست في حالٍ جيدة جدًّا»، وآذار لم يعرض ذلك الخيارَ قط، فيكون الادّعاءُ بلا أساس في الـ503 كلها &mdash; فالفراغُ في عمودٍ مؤشِّر يعني <em>غيرَ معروف</em> لا <em>لا</em>. ويقول النوعُ الشيءَ نفسه مجانًا: فـ<code>city_Gaza</code> ما زال <code>int8</code> لأنه موجود على الجانبين، أما كلُّ عمودٍ من جانبٍ واحد فقد رُقّي إلى <code>float64</code> ليحمل <code>NaN</code>. وجوابُ الفهرس يسمّي عطبًا ثانيًا حقيقيًّا &mdash; 85 وسمًا مكرَّرًا، فتعيد <code>stacked.loc[3]</code> صفّين &mdash; ثم يدّعي علاجًا لمشكلةٍ أخرى: فإعادةُ ترقيم الصفوف لا تستطيع اختلاقَ عمود. والمربّعُ الثالث لا يفقد صفّي Beit Lahia: بل يُبقيهما، ومربّعُ مدينتهما خمسةُ أصفار، وتعدّهما الخطوة، وهذا هو مقصودُ الترميز في مقابل قائمةٍ مضبوطة لا في مقابل ما يحتويه ملفٌّ اتفاقًا."
        }
      }
,

      /* ================ Lesson 7 ============================= */
      {
        id: "t2bx25",
        type: "compare",
        level: "hard",
        topics: ["t2-fit-before-split", "t2-what-fits"],
        q: {
          en: "Both versions fill the blank areas with a median per <code>rooms</code> &mdash; Lesson 2's rule &mdash; and apply the same fill to all three parts. Which statement is true?",
          ar: "تعوّض النسختان المساحاتِ الفارغة بوسيطٍ لكل <code>rooms</code> &mdash; قاعدةُ الدرس 2 &mdash; وتطبّقان التعويضَ نفسه على الأقسام الثلاثة. فأيُّ العبارات صادقة؟"
        },
        codeA: "fill = flats.groupby(\"rooms\")[\"area_m2\"].median()\nparts, _ = split_listings(rep)\nfor k in parts:\n    parts[k] = parts[k].assign(area_m2=parts[k][\"area_m2\"].fillna(parts[k][\"rooms\"].map(fill)))",
        codeB: "parts, _ = split_listings(rep)\nfill = parts[\"train\"].groupby(\"rooms\")[\"area_m2\"].median()\nfor k in parts:\n    parts[k] = parts[k].assign(area_m2=parts[k][\"area_m2\"].fillna(parts[k][\"rooms\"].map(fill)))",
        options: [
          { en: "Only B can be reported: A's per-rooms medians were computed from a frame that includes the validation and test areas, and applying one fill to all three parts does not undo where that fill came from.",
            ar: "ب وحدها يمكن الإبلاغ عنها: فوسائط أ لكل عدد غرف حُسبت من إطار يشمل مساحات التحقّق والاختبار، وتطبيقُ تعويض واحد على الأقسام الثلاثة لا يُلغي من أين جاء ذلك التعويض." },
          { en: "The two are equivalent, because both apply exactly the same fill to exactly the same rows.",
            ar: "الاثنان مكافئان، فكلتاهما تطبّق التعويضَ نفسه بعينه على الصفوف نفسها بعينها." },
          { en: "A is preferable, because a median over 480 rows is a better estimate than one over 288 and the fill is not the thing being predicted.",
            ar: "أ أفضلُ، فالوسيطُ على 480 صفًّا تقديرٌ أحسن من وسيط على 288، والتعويضُ ليس الشيءَ المتنبَّأ به." },
          { en: "Both leak, because the fill is applied to the test rows at all; a leak-free version would leave their areas blank.",
            ar: "كلتاهما تسرّب، فالتعويضُ يُطبَّق على صفوف الاختبار أصلًا؛ والنسخةُ بلا تسريب ستترك مساحاتها فارغة." }
        ],
        answer: 0,
        hint: {
          en: "The question is never where a parameter is applied. It is where the parameter was computed.",
          ar: "السؤالُ ليس قط أين يُطبَّق الوسيط. بل أين حُسب الوسيط."
        },
        explain: {
          en: "Applying a fitted parameter to the test rows is not merely allowed, it is the whole point of storing one &mdash; which is what makes the last option wrong, and tempting, because it sounds maximally careful. The leak in A is upstream: <code>flats</code> is all 480 rows, so each per-rooms median already contains the areas it will later be used to fill. Option three is the most dangerous distractor because its statistics are correct: 480 rows really do give a steadier median than 288. That is the cost you accept in exchange for a number you can defend, and it is the same trade Lesson 7 names when it moves 76 rows out of training.",
          ar: "تطبيقُ وسيط مضبوط على صفوف الاختبار ليس مباحًا فقط بل هو مغزى حفظه كلُّه &mdash; وهذا ما يجعل الخيارَ الأخير خاطئًا ومغريًا، فهو يبدو أقصى ما يكون من الحذر. والتسريبُ في أ أعلى من ذلك: فـ<code>flats</code> هي الصفوف الـ480 كلها، فكلُّ وسيط لكل عدد غرف يحتوي سلفًا المساحاتِ التي سيُستعمل لتعويضها لاحقًا. والخيارُ الثالث أخطرُ المضلّلات فإحصاؤه صحيح: فـ480 صفًّا تعطي فعلًا وسيطًا أثبتَ من 288. وتلك هي الكلفةُ التي تقبلها مقابل رقم تستطيع الدفاع عنه، وهي المبادلةُ نفسها التي يسمّيها الدرس 7 حين ينقل 76 صفًّا خارج التدريب."
        }
      },

      {
        id: "t2bx26",
        type: "output",
        level: "easy",
        topics: ["t2-overlap-leak", "t2-dedupe-then-split"],
        q: {
          en: "The 503 raw rows are split 60/20/20 without de-duplicating first. Type the two numbers this prints.",
          ar: "تُقسَّم الصفوف الخام الـ503 بنسبة 60/20/20 بلا إزالة التكرار أولًا. اكتب الرقمين الذين يطبعهما هذا."
        },
        code: "shuffled = rep.sample(frac=1.0, random_state=3)\nn_train, n_valid = int(len(shuffled) * 0.60), int(len(shuffled) * 0.20)\ntr = shuffled.iloc[:n_train]\nte = shuffled.iloc[n_train + n_valid:]\n\nseen = te[\"listing_id\"].isin(set(tr[\"listing_id\"]))\nprint(\"%d of %d\" % (seen.sum(), len(te)))",
        blanks: [
          { accept: ["6"], label: { en: "test rows with a twin in train", ar: "صفوف اختبار لها توأم في التدريب" } },
          { accept: ["102"], label: { en: "test rows in total", ar: "صفوف الاختبار كلها" } }
        ],
        hint: {
          en: "Lesson 3 counted fourteen byte-identical repeats and nine reposts. Only some of the 23 can straddle this particular cut.",
          ar: "عدّ الدرس 3 أربعةَ عشرَ تكرارًا متطابقًا حرفيًّا وتسعةَ إعلانات معادة. وبعضُ الـ23 فقط يستطيع تخطّي هذا القطع بعينه."
        },
        explain: {
          en: "6 of 102. Six is small and that is the point: the model is scored on those six rows at 21.6667 shekels against 62.2043 on the other 96, so the overall figure of 59.7475 looks entirely ordinary while being wrong. The leak is invisible in the headline and obvious the moment you group by it, which is why the one-line <code>isin</code> check belongs in every split you write. De-duplicating on <code>listing_id</code> first takes the file to 480 rows and makes the count zero by construction.",
          ar: "6 من 102. والستةُ قليلة وهذا هو المغزى: فالنموذجُ يُقاس على تلك الصفوف الستة بـ21.6667 شيكل مقابل 62.2043 على الـ96 الأخرى، فيبدو الرقمُ الكلي 59.7475 عاديًّا تمامًا وهو خاطئ. والتسريبُ غيرُ مرئي في العنوان وبديهيٌّ لحظةَ تجمّع عليه، ولهذا ينتمي فحصُ <code>isin</code> ذو السطر الواحد إلى كل تقسيم تكتبه. وإزالةُ التكرار على <code>listing_id</code> أولًا تأخذ الملفَّ إلى 480 صفًّا وتجعل العددَ صفرًا بحكم البناء."
        }
      }
    ]
  };
})();
