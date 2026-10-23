/* Practical Chapter 1 - Lesson test 1: The Data Analysis Lifecycle.
   24 questions: p1l1q01 ... p1l1q24. Topics: assets/data/topics/p1-l1.js */
window.DABanks = window.DABanks || {};
window.DABanks["p1-test-01"] = {
  title: { en: "Test 1 — The Data Analysis Lifecycle", ar: "اختبار 1 — دورة حياة تحليل البيانات" },
  intro: {
    en: "24 questions on the whole lesson: the four kinds of question, the question card, the seven stages and what each leaves behind, documenting a file before you touch it (source note, first look, data dictionary), reproducibility and privacy, and what an AI project adds (target, split, leakage, drift). Allow about 35 minutes. Several questions read short programs on the cafeteria file; you can answer all of them without running anything. The hint, the answer and the explanation stay hidden until you ask for them, and the Review links under each question lead back to the part of the lesson it tests.",
    ar: "24 سؤالًا على الدرس كله: أنواع الأسئلة الأربعة، وبطاقة السؤال، والأطوار السبعة وما يتركه كل طور، وتوثيق الملف قبل أن تلمسه (ملاحظة المصدر والنظرة الأولى وقاموس البيانات)، وقابلية إعادة الإنتاج والخصوصية، وما يضيفه مشروع الذكاء الاصطناعي (الهدف والتقسيم والتسرّب والانجراف). خصّص نحو 35 دقيقة. تقرأ عدة أسئلة برامج قصيرة على ملف الكافتيريا، ويمكنك الإجابة عنها كلها دون تشغيل أي شيء. يبقى التلميح والجواب والشرح مخفيًّا حتى تطلبه، وتقودك روابط «المراجعة» تحت كل سؤال إلى الجزء من الدرس الذي يختبره."
  },
  questions: [

    /* ---------- Concept 1: data analysis is answering a question with data ---------- */

    { id: "p1l1q01", type: "match", level: "easy", topics: ["p1-four-kinds", "p1-data-analysis"],
      q: { en: "Match each cafeteria question to the <b>kind</b> of question it is.",
           ar: "وصّل كل سؤال من أسئلة الكافتيريا بـ<b>نوعه</b>." },
      leftHead: { en: "The question", ar: "السؤال" }, rightHead: { en: "Its kind", ar: "نوعه" },
      pairs: [
        { l: { en: "What share of September’s revenue came from drinks?", ar: "ما حصّة المشروبات من إيراد أيلول؟" },
          r: { en: "Descriptive: what happened?", ar: "وصفي: ماذا حدث؟" } },
        { l: { en: "Why is Sunday busier than Monday?", ar: "لماذا يزدحم الأحد أكثر من الاثنين؟" },
          r: { en: "Diagnostic: why did it happen?", ar: "تشخيصي: لماذا حدث؟" } },
        { l: { en: "How many wraps will we sell next week?", ar: "كم ساندويتش شاورما سنبيع الأسبوع القادم؟" },
          r: { en: "Predictive: what will happen?", ar: "تنبؤي: ماذا سيحدث؟" } },
        { l: { en: "Should a second till open at noon on Sundays?", ar: "هل نفتح صندوقًا ثانيًا عند الظهر أيام الأحد؟" },
          r: { en: "Prescriptive: what should we do?", ar: "توجيهي: ماذا يجب أن نفعل؟" } }
      ],
      hint: { en: "Ask what job the answer must do: report the past, give a reason, look ahead, or choose an action.",
              ar: "اسأل: ما المهمة التي على الجواب أداؤها؟ أن يروي الماضي، أم يعطي سببًا، أم ينظر إلى الأمام، أم يختار فعلًا؟" },
      explain: { en: "The kind is set by the job the answer must do: report (descriptive), explain a difference (diagnostic), look ahead (predictive) or choose an action (prescriptive). The tempting slip is to call “Why is Sunday busier?” descriptive because you would start by counting Sundays and Mondays; but the count is only the rung underneath — the question asks for a reason, and the order file alone may not contain one. It is a ladder, not a ranking of worth: each rung rests on the one below, so a forecast built on a miscounted total inherits the error and hides it.",
                 ar: "يتحدّد النوع بالمهمة التي يؤدّيها الجواب: أن يروي ما حدث (وصفي)، أو يفسّر فرقًا (تشخيصي)، أو ينظر إلى الأمام (تنبؤي)، أو يختار فعلًا (توجيهي). والزلّة المغرية أن تعدّ «لماذا يزدحم الأحد؟» سؤالًا وصفيًّا لأنك ستبدأ بعدّ طلبات الأحد والاثنين؛ لكن العدّ هو الدرجة التي تحته فقط — فالسؤال يطلب سببًا، وملف الطلبات وحده قد لا يحتويه. إنه سلّم لا ترتيب للقيمة: كل درجة تستند إلى التي قبلها، فالتوقع المبني على مجموع مَعدود خطأً يرث الخطأ ويخفيه." } },

    { id: "p1l1q02", type: "mcq", level: "easy", topics: ["p1-analysis-neighbours"],
      q: { en: "The manager wants a screen beside the till that shows yesterday’s revenue and the number of orders per hour, refreshed every morning without anyone re-running anything. Which field does this belong to, mainly?",
           ar: "يريد المدير شاشة بجانب الصندوق تعرض إيراد الأمس وعدد الطلبات في كل ساعة، وتتحدّث كل صباح دون أن يعيد أحد تشغيل شيء. إلى أي حقل ينتمي هذا في الأساس؟" },
      options: [
        { en: "Data analysis: a new question, answered once, with a recommendation.", ar: "تحليل البيانات: سؤال جديد يُجاب مرة واحدة مع توصية." },
        { en: "Business intelligence (BI): known questions, answered again and again automatically.", ar: "ذكاء الأعمال (BI): أسئلة معروفة تُجاب مرارًا وتلقائيًا." },
        { en: "Statistics: how sure can we be, given that we saw only a sample?", ar: "الإحصاء: ما درجة يقيننا ونحن لم نرَ إلا عيّنة؟" },
        { en: "Machine learning: can a method learn a pattern from examples and predict new cases?", ar: "التعلّم الآلي: هل تستطيع طريقة أن تتعلّم نمطًا من الأمثلة وتتنبأ بحالات جديدة؟" }
      ],
      answer: 1,
      hint: { en: "What part of this request repeats every day, and who has to do the work each time?",
              ar: "أي جزء من هذا الطلب يتكرر كل يوم؟ ومن يضطر إلى العمل في كل مرة؟" },
      explain: { en: "A refreshed dashboard is the typical BI output: the questions are known in advance and the answer renews itself. Data analysis is the tempting choice because it uses the same file, but it answers a new question once and ends with a recommendation. Statistics would ask whether Sunday is really busier or September is just noisy, and machine learning would be the forecasting engine behind a prep list. These are tendencies, not borders — in a small cafeteria one person may do all four.",
                 ar: "لوحة المعلومات المتجددة هي الناتج المعتاد لذكاء الأعمال: الأسئلة معروفة سلفًا والجواب يتجدّد من تلقاء نفسه. وتحليل البيانات هو الخيار المغري لأنه يستعمل الملف نفسه، لكنه يجيب عن سؤال جديد مرة واحدة وينتهي بتوصية. أما الإحصاء فسيسأل هل الأحد أكثر ازدحامًا حقًّا أم أن أيلول متقلب فحسب، والتعلّم الآلي هو محرك التوقع خلف قائمة التحضير. هذه ميول لا حدود — ففي كافتيريا صغيرة قد يقوم شخص واحد بالأربعة كلها." } },

    { id: "p1l1q03", type: "multi", level: "medium", topics: ["p1-so-what-test", "p1-data-analysis"],
      q: { en: "Apply the “so what” test to each card exactly as it is written. For which cards would a <em>different answer</em> lead to a <em>different action</em>? (Choose all that apply.)",
           ar: "طبّق اختبار «وماذا بعد؟» على كل بطاقة كما هي مكتوبة. في أي البطاقات يؤدي <em>جواب مختلف</em> إلى <em>فعل مختلف</em>؟ (اختر كل ما ينطبق.)" },
      options: [
        { en: "Which three items earned the most revenue? If wraps and rice, we stock them first; if tea, we plan very differently.", ar: "ما أعلى ثلاثة أصناف إيرادًا؟ إن كانت الشاورما والأرز خزّنّاها أولًا؛ وإن كان الشاي خطّطنا بشكل مختلف تمامًا." },
        { en: "Is Sunday busier than Monday? The manager will keep the same staff rota on both days whatever the answer.", ar: "هل الأحد أكثر ازدحامًا من الاثنين؟ سيُبقي المدير جدول العاملين نفسه في اليومين أيًّا كان الجواب." },
        { en: "Which payment method appears on the most lines? No purpose is stated.", ar: "ما طريقة الدفع الأكثر ظهورًا في الأسطر؟ لا غرض معلن." },
        { en: "In which hour do most orders arrive? A second till will open in that hour.", ar: "في أي ساعة تصل معظم الطلبات؟ سيُفتح صندوق ثانٍ في تلك الساعة." },
        { en: "What share of revenue is paid by wallet? Above a third we buy a second card reader; below it we do not.", ar: "ما نسبة الإيراد المدفوعة بالمحفظة؟ إن زادت على الثلث اشترينا جهاز بطاقات ثانيًا، وإلا فلا." }
      ],
      answer: [0, 3, 4],
      hint: { en: "For each card, imagine the answer coming out as X and then as Y. Would anyone do something different?",
              ar: "تخيّل في كل بطاقة أن الجواب خرج س ثم خرج ص. هل سيفعل أحد شيئًا مختلفًا؟" },
      explain: { en: "The test asks: if the answer is X what will you do, and if it is Y what will you do instead? The revenue ranking, the busiest hour and the wallet share each have a named action that depends on the answer. The Sunday-versus-Monday card fails because both answers lead to the same rota: it is interesting but changes nothing. The payment-method card is the tempting one because it sounds like business, yet with no purpose stated nobody knows what to do with “Cash on 380 of 754 lines”. A question can be perfectly answerable from the file and still fail the test.",
                 ar: "يسأل الاختبار: إن كان الجواب س فماذا ستفعل، وإن كان ص فماذا ستفعل بدلًا من ذلك؟ ترتيب الإيراد وأكثر الساعات ازدحامًا ونسبة المحفظة لكلٍّ منها فعل مسمّى يتوقف على الجواب. أما بطاقة الأحد مقابل الاثنين فتسقط لأن الجوابين يؤديان إلى الجدول نفسه: سؤال طريف لكنه لا يغيّر شيئًا. وبطاقة طريقة الدفع هي المغرية لأنها تبدو تجارية، ومع غياب الغرض لا يعرف أحد ماذا يفعل بعبارة «النقد في 380 من 754 سطرًا». قد يكون السؤال قابلًا للإجابة من الملف تمامًا ومع ذلك يسقط في الاختبار." } },

    /* ---------- Concept 2: from a vague request to an answerable question ---------- */

    { id: "p1l1q04", type: "output", level: "medium", topics: ["p1-measure-changes-answer"], lang: "python",
      q: { en: "Three analysts answer “what sells?” on this small table: one ranks by order lines, one by units, one by money. What does the program print? Type the three names separated by single spaces.",
           ar: "يجيب ثلاثة محللين عن «ما الذي يُباع؟» على هذا الجدول الصغير: الأول يرتّب بحسب أسطر الطلبات، والثاني بحسب الوحدات، والثالث بحسب المال. ماذا يطبع البرنامج؟ اكتب الأسماء الثلاثة تفصل بينها مسافة واحدة." },
      code: 'import pandas as pd\n\nd = pd.DataFrame({\n    "item":       ["Tea", "Tea", "Tea", "Falafel", "Falafel", "Wrap", "Wrap"],\n    "qty":        [1, 1, 1, 2, 2, 1, 1],\n    "unit_price": [3.0, 3.0, 3.0, 5.0, 5.0, 12.0, 12.0]})\nd["revenue"] = d["qty"] * d["unit_price"]\ng = d.groupby("item")\nprint(g.size().idxmax(), g["qty"].sum().idxmax(), g["revenue"].sum().idxmax())',
      blanks: [ { accept: ["Tea Falafel Wrap"], ph: "…" } ],
      hint: { en: "Make three small totals per item first: how many lines, how many units, how much money. Then take the top of each.",
              ar: "احسب أولًا ثلاثة مجاميع صغيرة لكل صنف: كم سطرًا، وكم وحدة، وكم مالًا. ثم خذ الأعلى في كل منها." },
      explain: { en: "Tea has the most lines (3 against 2 and 2), Falafel has the most units (2 + 2 = 4), and Wrap has the most money (2 × 12.0 = 24.0, against 20.0 for Falafel and 9.0 for Tea). Same table, same word “sells”, three different winners — and nothing crashes. That is why the question card needs a MEASURE line: on the real file the same split puts Tea first by lines and by units, and Shawarma Wrap first by money.",
                 ar: "الشاي له أكثر الأسطر (3 مقابل 2 و2)، والفلافل لها أكثر الوحدات (2 + 2 = 4)، والشاورما لها أكثر المال (2 × 12.0 = 24.0 مقابل 20.0 للفلافل و9.0 للشاي). جدول واحد، وكلمة «يُباع» نفسها، وثلاثة فائزين مختلفين — ولا شيء ينهار. ولهذا تحتاج بطاقة السؤال إلى سطر للمقياس: ففي الملف الحقيقي يضع التقسيم نفسه الشاي أولًا بالأسطر وبالوحدات، والشاورما أولًا بالمال." } },

    { id: "p1l1q05", type: "compare", level: "medium", topics: ["p1-question-refinement", "p1-question-card"], lang: "text",
      q: { en: "Both cards describe the same analysis. Which statement about them is true?",
           ar: "كلتا البطاقتين تصف التحليل نفسه. أي عبارة عنهما صحيحة؟" },
      codeA: "REQUEST   what sells?\nQUESTION  Which three items earned the most\n          revenue in September 2026?\nMEASURE   revenue = qty x unit_price,\n          summed per item",
      codeB: "REQUEST   what sells?\nQUESTION  Which three items earned the most\n          revenue in September 2026?\nMEASURE   revenue = qty x unit_price,\n          summed per item\nDECISION  The manager decides what to\n          stock first for October\nSCOPE     completed sales only (refunds\n          out); all customer types; open\n          days\nSUCCESS   three items and their revenue,\n          readable in one minute; the grand\n          total can be checked against the\n          till report",
      options: [
        { en: "B is better because only B pins down what “sells” means; A still allows lines, units or money.", ar: "B أفضل لأنها وحدها تحدّد معنى «يُباع»؛ أما A فما زالت تسمح بالأسطر أو الوحدات أو المال." },
        { en: "A is better: B’s extra lines do not change the number, so they only add paperwork.", ar: "A أفضل: أسطر B الإضافية لا تغيّر الرقم، فهي تزيد الأوراق فقط." },
        { en: "B is better: it adds a decision, a scope and a success test, so the work can be judged by the use it serves and checked by someone else; A leaves all three open.", ar: "B أفضل: تضيف قرارًا ونطاقًا واختبار نجاح، فيمكن الحكم على العمل بالغاية التي يخدمها وفحصه من شخص آخر؛ بينما تترك A الثلاثة مفتوحة." },
        { en: "They are equally good: once the measure, the limit and the period are written, a question is complete.", ar: "هما متساويتان: ما إن يُكتب المقياس والحد والفترة حتى يكتمل السؤال." }
      ],
      answer: 2,
      hint: { en: "List the lines B adds, and ask what each one lets somebody do that A does not.",
              ar: "اكتب الأسطر التي تضيفها B، واسأل: ماذا يتيح كل منها لشخص ما لا تتيحه A؟" },
      explain: { en: "Version 3 (card A) already fixed the “sells” ambiguity with its MEASURE line, so crediting Version 4 with pinning down “sells” gives it work Version 3 did. The claim that B only adds paperwork is the tempting one, because it is true that Version 4 does not change the number — but a number nobody can judge or check is exactly the problem Version 4 closes: the DECISION says what the number is for, the SCOPE says which rows count (refunds, closed days), and the SUCCESS line gives a check anyone can run against the till report. The measure fixes the number; the decision, scope and success test make it usable.",
                 ar: "النسخة 3 (البطاقة A) عالجت أصلًا غموض «يُباع» بسطر المقياس، فنسبة تحديد معنى «يُباع» إلى النسخة 4 تعطيها عملًا أنجزته النسخة 3. والقول إن أسطر B ورق زائد هو المغري، لأن النسخة 4 فعلًا لا تغيّر الرقم — لكن رقمًا لا يستطيع أحد الحكم عليه أو فحصه هو المشكلة التي تسدّها النسخة 4: فالقرار يقول لماذا الرقم، والنطاق يقول أي الصفوف تُحتسب (المرتجعات والأيام المغلقة)، وسطر النجاح يعطي فحصًا يستطيع أي شخص إجراءه مقابل تقرير الصندوق. المقياس يثبّت الرقم؛ والقرار والنطاق واختبار النجاح تجعله صالحًا للاستعمال." },
      solution: { code: "REQUEST   what sells?\nQUESTION  Which three items earned the most\n          revenue in September 2026?\nMEASURE   revenue = qty x unit_price, summed per item\nDECISION  The manager decides what to stock first for October\nSCOPE     completed sales only (refunds out); all customer types; open days\nSUCCESS   three items and their revenue, readable in one minute;\n          the grand total can be checked against the till report",
                  en: "Card B (Version 4) is the recommended form. It is still a plan, not an answer, and it may change when you meet the data.",
                  ar: "البطاقة B (النسخة 4) هي الصيغة الموصى بها. وهي ما زالت خطة لا جوابًا، وقد تتغيّر حين تقابل البيانات." } },

    { id: "p1l1q06", type: "error", level: "easy", topics: ["p1-question-card", "p1-question-refinement"], lang: "text",
      q: { en: "This question card went wrong when someone edited it. Click the line that contradicts the rest of the card.",
           ar: "فسدت بطاقة السؤال هذه حين عدّلها أحدهم. انقر السطر الذي يناقض بقية البطاقة." },
      code: "REQUEST   what sells?\nQUESTION  Which three items earned the most revenue in September 2026?\nMEASURE   units = qty, summed per item\nDECISION  The manager decides what to stock first for October\nSCOPE     completed sales only (refunds out); all customer types; open days\nSUCCESS   three items and their revenue, readable in one minute;\n          the grand total can be checked against the till report",
      answer: 3,
      hint: { en: "Compare the thing the QUESTION asks for with the formula on the MEASURE line.",
              ar: "قارن ما يطلبه سطر السؤال بالمعادلة المكتوبة في سطر المقياس." },
      explain: { en: "The QUESTION asks for revenue and the SUCCESS line promises “their revenue”, but the MEASURE line sums units. Following the card as written, an analyst would put Tea (154 units) and Falafel Sandwich (131) on top — and Tea earns only 462.00. Nothing would crash. A MEASURE line only helps if it agrees with the question, so read the card as one piece.",
                 ar: "يسأل سطر السؤال عن الإيراد ويَعِد سطر النجاح بـ«إيرادها»، لكن سطر المقياس يجمع الوحدات. وبحسب البطاقة كما هي مكتوبة سيضع المحلل الشاي (154 وحدة) وساندويتش الفلافل (131) في الصدارة — والشاي لا يُدرّ إلا 462.00. ولن ينهار شيء. سطر المقياس لا ينفع إلا إن اتفق مع السؤال، فاقرأ البطاقة قطعة واحدة." },
      solution: { code: "MEASURE   revenue = qty x unit_price, summed per item",
                  en: "The measure must be the revenue formula, so that QUESTION, MEASURE and SUCCESS all talk about the same thing.",
                  ar: "يجب أن يكون المقياس معادلة الإيراد ليتحدث السؤال والمقياس والنجاح عن الشيء نفسه." } },

    /* ---------- Concept 3: the lifecycle - seven stages and a loop ---------- */

    { id: "p1l1q07", type: "trace", level: "hard", topics: ["p1-skipped-stages"], lang: "python",
      q: { en: "Marwan’s shortcut, tried on five invented lines that carry the three messes of the real file: a repeated line, a refund and a price typed ten times too large. After the last line runs, what are <code>a</code>, <code>b</code> and <code>c</code>?",
           ar: "اختصار مروان مجرَّبًا على خمسة أسطر مصطنعة تحمل الفوضى الثلاث في الملف الحقيقي: سطر مكرر، ومرتجع، وسعر مكتوب أكبر عشر مرات. بعد تنفيذ السطر الأخير، ما قيمة <code>a</code> و<code>b</code> و<code>c</code>؟" },
      code: 'import pandas as pd\n\nraw = pd.DataFrame({\n    "item":       ["Wrap", "Wrap", "Wrap", "Tea", "Tea"],\n    "qty":        [1, 1, 1, 2, -1],\n    "unit_price": [12.0, 12.0, 120.0, 3.0, 3.0]})\nraw["revenue"] = raw["qty"] * raw["unit_price"]\n\na = raw["revenue"].sum()\nb = raw.drop_duplicates()["revenue"].sum()\nc = raw.drop_duplicates().query("qty > 0 and unit_price < 100")["revenue"].sum()',
      blanks: [
        { accept: ["147.0", "147"], label: { en: "<code>a</code>", ar: "<code>a</code>" } },
        { accept: ["135.0", "135"], label: { en: "<code>b</code>", ar: "<code>b</code>" } },
        { accept: ["18.0", "18"], label: { en: "<code>c</code>", ar: "<code>c</code>" } }
      ],
      hint: { en: "Write down each line’s revenue first. Then decide which lines each step removes.",
              ar: "اكتب أولًا إيراد كل سطر. ثم حدّد أي الأسطر تزيلها كل خطوة." },
      explain: { en: "The revenues are 12, 12, 120, 6 and −3, so a = 147.0. The first two lines are exact copies; counting the repeat once takes off 12, so b = 135.0. In c the refund line (qty −1) and the 120.0 line are also left out: removing the refund <em>raises</em> the total by 3 because it was subtracting, and removing the typo lowers it by 120, so c = 135 + 3 − 120 = 18.0. On the real file the same three moves take 8334.00 down by 175.00, up by 23.00 and down by 120.00 to 8062.00. Rules move the total in both directions, which is why skipping a stage makes errors silent rather than absent.",
                 ar: "إيرادات الأسطر 12 و12 و120 و6 و−3، فـ a = 147.0. السطران الأولان نسختان متطابقتان؛ وعدّ المكرر مرة واحدة ينقص 12، فـ b = 135.0. وفي c يُستبعد أيضًا سطر المرتجع (qty = −1) وسطر 120.0: استبعاد المرتجع <em>يرفع</em> المجموع بمقدار 3 لأنه كان يطرح، واستبعاد الخطأ المطبعي ينقصه 120، فـ c = 135 + 3 − 120 = 18.0. وفي الملف الحقيقي تُنزل الحركات الثلاث نفسها المجموع 8334.00 بمقدار 175.00 ثم تُصعّده 23.00 ثم تُنزله 120.00 إلى 8062.00. القواعد تحرّك المجموع في الاتجاهين، ولهذا يجعل تخطّي طور الأخطاء صامتة لا غائبة." } },

    { id: "p1l1q08", type: "order", level: "easy", topics: ["p1-lifecycle-stages"],
      q: { en: "Each task belongs to one stage of the analysis lifecycle. Put the tasks in the order of the stages they belong to, from the first stage to the last.",
           ar: "تنتمي كل مهمة إلى طور من أطوار دورة حياة التحليل. رتّب المهامّ بحسب ترتيب الأطوار التي تنتمي إليها، من الطور الأول إلى الأخير." },
      items: [
        { en: "Ask the manager what decision the numbers will support", ar: "اسأل المدير عن القرار الذي ستدعمه الأرقام" },
        { en: "Export September’s orders from the till and keep an untouched copy", ar: "صدِّر طلبات أيلول من الصندوق واحتفظ بنسخة لم تُمسّ" },
        { en: "Delete the 16 exactly repeated lines and log how many were removed", ar: "احذف الأسطر الستة عشر المكررة تمامًا وسجّل كم أُزيل" },
        { en: "Plot the number of orders in each hour to see where the rush starts", ar: "ارسم عدد الطلبات في كل ساعة لترى أين يبدأ الازدحام" },
        { en: "Rank the items by revenue and keep the first three", ar: "رتّب الأصناف بحسب الإيراد واحتفظ بالثلاثة الأولى" },
        { en: "Write the one-page brief the manager will read", ar: "اكتب الموجز من صفحة واحدة الذي سيقرؤه المدير" },
        { en: "Check next month whether the top three items have changed", ar: "افحص الشهر القادم هل تغيّرت الأصناف الثلاثة الأولى" }
      ],
      answer: [0, 1, 2, 3, 4, 5, 6],
      hint: { en: "Name what each task leaves behind: a card, a raw copy, a clean table, summaries, numbers, a brief, a date.",
              ar: "سمِّ ما تتركه كل مهمة: بطاقة، نسخة خام، جدولًا نظيفًا، ملخصات، أرقامًا، موجزًا، موعدًا." },
      explain: { en: "In order: Ask (the decision belongs on the question card), Acquire (the raw copy is an artifact of this stage), Clean (a written rule plus a log entry, never a quiet delete), Explore (looking at the data to see what it holds), Analyse (the calculation the card asked for), Communicate (the brief is the deliverable) and Act & Monitor (a scheduled re-check of a tracked number). The order is not arbitrary: each stage works on what the one before it left behind, and plotting hours before cleaning would build charts on repeated lines.",
                 ar: "بالترتيب: السؤال (القرار مكانه بطاقة السؤال)، والحصول (النسخة الخام ناتج هذا الطور)، والتنظيف (قاعدة مكتوبة مع سطر في السجل، لا حذفًا هادئًا)، والاستكشاف (النظر في البيانات لترى ما تحويه)، والتحليل (الحساب الذي طلبته البطاقة)، والتواصل (الموجز هو المُخرَج)، والتنفيذ والمتابعة (فحص مجدول لرقم يُتابَع). والترتيب ليس اعتباطيًّا: كل طور يعمل على ما تركه الذي قبله، ورسم الساعات قبل التنظيف يبني مخططات على أسطر مكررة." } },

    { id: "p1l1q09", type: "multi", level: "medium", topics: ["p1-loop-back", "p1-lifecycle-stages"],
      q: { en: "A project often loops back to an earlier stage. Which of these events send it back to <b>Ask</b>, the question card? (Choose all that apply.)",
           ar: "يرجع المشروع كثيرًا إلى طور سابق. أي هذه الأحداث تعيده إلى <b>السؤال</b>، أي بطاقة السؤال؟ (اختر كل ما ينطبق.)" },
      options: [
        { en: "While writing the data dictionary you notice there is no cost column, yet the manager asked which items make the most profit.", ar: "وأنت تكتب قاموس البيانات تلاحظ أنه لا يوجد عمود للتكلفة، مع أن المدير سأل أي الأصناف تدرّ أعلى ربح." },
        { en: "Plotting orders per hour shows one Shawarma Wrap priced 120.0 beside hundreds priced 12.0.", ar: "رسم الطلبات لكل ساعة يُظهر ساندويتش شاورما واحدًا بسعر 120.0 بجانب مئات بسعر 12.0." },
        { en: "Two analysts clean the file with different rules and their totals disagree.", ar: "ينظّف محللان الملف بقواعد مختلفة فتختلف مجاميعهما." },
        { en: "After reading the brief, the manager replies: “Good. Now in which hour should the second till open?”", ar: "بعد قراءة الموجز يردّ المدير: «جيد. والآن في أي ساعة نفتح الصندوق الثاني؟»" }
      ],
      answer: [0, 3],
      hint: { en: "The question card holds the question and the decision. Which events change one of those, and which merely reveal dirt?",
              ar: "بطاقة السؤال تحمل السؤال والقرار. أي الأحداث يغيّر أحدهما، وأيها يكشف أوساخًا فقط؟" },
      explain: { en: "The lesson names four loop-backs: the data cannot answer the question → Ask; Explore finds something dirty → Clean; the stakeholder reacts to the brief with a new question → Ask; monitoring shows the world has moved → Acquire or Ask. The missing cost column and the manager’s follow-up both change the question, so they go to Ask. The 120.0 price is the tempting one, because it is a surprise and surprises feel like question problems; but dirt sends you from Explore back to Clean. Disagreeing totals are also a Clean matter: the fix is one written set of rules, not a new question.",
                 ar: "يسمّي الدرس أربع حالات رجوع: البيانات لا تستطيع الإجابة عن السؤال ← السؤال؛ الاستكشاف يجد شيئًا متسخًا ← التنظيف؛ صاحب المصلحة يردّ على الموجز بسؤال جديد ← السؤال؛ المتابعة تُظهر أن العالم تحرّك ← الحصول أو السؤال. غياب عمود التكلفة ومتابعة المدير كلاهما يغيّر السؤال فيرجعان إلى السؤال. وسعر 120.0 هو المغري، لأنه مفاجأة والمفاجآت تبدو مشكلات في السؤال؛ لكن الأوساخ تعيدك من الاستكشاف إلى التنظيف. واختلاف المجاميع شأن تنظيف أيضًا: علاجه مجموعة قواعد واحدة مكتوبة لا سؤال جديد." } },

    { id: "p1l1q10", type: "match", level: "easy", topics: ["p1-crisp-dm", "p1-lifecycle-stages"],
      q: { en: "CRISP-DM has six phases and our lifecycle has seven stages. Match each CRISP-DM phase to our stage.",
           ar: "لنموذج CRISP-DM ست مراحل ولدورة حياتنا سبعة أطوار. وصّل كل مرحلة من CRISP-DM بطورنا المقابل." },
      leftHead: { en: "CRISP-DM phase", ar: "مرحلة CRISP-DM" }, rightHead: { en: "Our stage", ar: "طورنا" },
      pairs: [
        { l: { en: "Business understanding", ar: "فهم العمل" },
          r: { en: "1 Ask: the question card", ar: "1 السؤال: بطاقة السؤال" } },
        { l: { en: "Data understanding", ar: "فهم البيانات" },
          r: { en: "2 Acquire and the first part of 4 Explore: source note, dictionary, first look", ar: "2 الحصول والجزء الأول من 4 الاستكشاف: ملاحظة المصدر والقاموس والنظرة الأولى" } },
        { l: { en: "Data preparation", ar: "إعداد البيانات" },
          r: { en: "3 Clean (in AI projects it also builds the features)", ar: "3 التنظيف (وفي مشاريع الذكاء الاصطناعي يبني الخصائص أيضًا)" } },
        { l: { en: "Modeling", ar: "النمذجة" },
          r: { en: "5 Analyse / Model", ar: "5 التحليل / النمذجة" } },
        { l: { en: "Deployment", ar: "النشر" },
          r: { en: "7 Act & Monitor: a decision for a person, a running service for a model", ar: "7 التنفيذ والمتابعة: قرار للشخص، وخدمة تعمل للنموذج" } }
      ],
      hint: { en: "Match by what each phase leaves behind: a card, a dictionary, a clean table, numbers or a model, a decision.",
              ar: "وصّل بحسب ما تتركه كل مرحلة: بطاقة، قاموس، جدول نظيف، أرقام أو نموذج، قرار." },
      explain: { en: "CRISP-DM is drawn as a circle with arrows that go back and forth — the same message as our loop — so the two vocabularies line up almost one to one. Two pairs are not one stage to one phase: “Data understanding” covers Acquire and the first look of Explore, and “Deployment” means a decision when the product is a brief but a running service when it is a model. “Evaluation” has no single stage of its own: it is the checks in Explore and Analyse plus Communicate, asking whether the result meets the success criteria on the card.",
                 ar: "يُرسم CRISP-DM دائرةً بأسهم تذهب وتجيء — الرسالة نفسها التي في حلقتنا — فتتقابل المفردتان تقريبًا واحدًا لواحد. لكن زوجين ليسا طورًا لكل مرحلة: «فهم البيانات» يشمل الحصول والنظرة الأولى من الاستكشاف، و«النشر» يعني قرارًا حين يكون المنتج موجزًا وخدمة تعمل حين يكون نموذجًا. أما «التقييم» فلا طور واحد له: هو فحوص الاستكشاف والتحليل مع التواصل، وسؤاله: هل تحقق النتيجة معايير النجاح في البطاقة؟" } },

    { id: "p1l1q11", type: "compare", level: "medium", topics: ["p1-analysis-plan", "p1-reproducibility"], lang: "text",
      q: { en: "The cafeteria report will be re-run every month and handed from one analyst to the next. Which statement about these two plans is true?",
           ar: "سيُعاد إنتاج تقرير الكافتيريا كل شهر ويُسلَّم من محلل إلى آخر. أي عبارة عن هاتين الخطتين صحيحة؟" },
      codeA: "1. Agree the question and the decision\n   with the manager\n2. Get September's orders and keep an\n   untouched copy\n3. Write down what each column means\n4. Remove what should not count, and\n   note each removal\n5. Check counts and totals\n6. Rank items by revenue, keep the top 3\n7. Write a one-page brief\n8. Re-check next month",
      codeB: "1 Ask          question card (analyst)\n               done: manager has agreed\n2 Acquire      raw copy + dictionary (analyst)\n               done: every column described\n3 Clean        clean table + log (analyst)\n               done: 771 lines reconcile\n4 Explore      checks + surprises (analyst)\n               done: totals agree\n5 Analyse      top-three table (analyst)\n               done: a second person agrees\n6 Communicate  one-page brief (analyst)\n               done: manager can restate it\n7 Act+Monitor  decision + check (manager)\n               done: next check is booked",
      options: [
        { en: "A is better: it has the same steps in the same order, and a numbered list is easier to follow than a table.", ar: "A أفضل: فيها الخطوات نفسها بالترتيب نفسه، والقائمة المرقّمة أسهل متابعة من الجدول." },
        { en: "B is better, because A forgets to start from the question and never keeps an untouched copy.", ar: "B أفضل، لأن A تنسى أن تبدأ من السؤال ولا تحتفظ بنسخة لم تُمسّ." },
        { en: "They are equally good: a plan only needs the right steps in the right order.", ar: "هما متساويتان: الخطة لا تحتاج إلا الخطوات الصحيحة بالترتيب الصحيح." },
        { en: "B is better: for every stage it says what must exist when the stage is finished, who owns it and how to tell it is done, so a hand-over can be checked; A only lists tasks.", ar: "B أفضل: تقول لكل طور ما يجب أن يوجد عند انتهائه ومن يملكه وكيف يُعرف أنه انتهى، فيمكن فحص التسليم؛ بينما تسرد A مهامّ فقط." }
      ],
      answer: 3,
      hint: { en: "Which defects did Version 2 already fix? Then ask what a new analyst would still not know from A.",
              ar: "أي العيوب عالجتها النسخة 2 أصلًا؟ ثم اسأل: ماذا سيبقى محلل جديد لا يعرفه من A؟" },
      explain: { en: "Plan A already starts from the question and keeps an untouched copy — those were the defects of the ad-hoc Version 1, fixed in Version 2, so blaming A for missing them is wrong. What A still lacks is any statement of what each step leaves behind, who owns it, and when it is finished, so nobody can check a hand-over. B adds exactly those three columns and turns the dictionary and the decision log into named deliverables. For a ten-minute one-off B is overkill; for a report that is repeated and handed on it is the plan to keep, updating it (and keeping the old versions) whenever a loop-back changes it.",
                 ar: "الخطة A تبدأ أصلًا من السؤال وتحتفظ بنسخة لم تُمسّ — وهذان عيبا النسخة 1 العشوائية، عالجتهما النسخة 2 — فلومُ A على غيابهما خاطئ. أما ما ينقص A فهو أي بيان بما تتركه كل خطوة ومن يملكها ومتى تنتهي، فلا يستطيع أحد فحص التسليم. وتضيف B هذه الأعمدة الثلاثة بالضبط وتجعل القاموس وسجل القرارات مُخرَجين مسمّيين. في عدّ عابر من عشر دقائق تكون B مبالغة؛ أما لتقرير يتكرر ويُسلَّم لغيرك فهي الخطة التي تُبقيها، وتحدّثها (مع الاحتفاظ بالنسخ القديمة) كلما غيّر رجوع إلى الخلف شيئًا." },
      solution: { code: "1 Ask          question card (analyst)\n               done: manager has agreed\n2 Acquire      raw copy + dictionary (analyst)\n               done: every column described\n3 Clean        clean table + log (analyst)\n               done: 771 lines reconcile\n4 Explore      checks + surprises (analyst)\n               done: totals agree\n5 Analyse      top-three table (analyst)\n               done: a second person agrees\n6 Communicate  one-page brief (analyst)\n               done: manager can restate it\n7 Act+Monitor  decision + check (manager)\n               done: next check is booked",
                  en: "Version 3, the lifecycle table with artifacts and owners, is the recommended form.",
                  ar: "النسخة 3، جدول دورة الحياة بالنواتج والمالكين، هي الصيغة الموصى بها." } },

    /* ---------- Concept 4: acquire and document the data ---------- */

    { id: "p1l1q12", type: "error", level: "medium", topics: ["p1-provenance", "p1-reproducibility"], lang: "text",
      q: { en: "A colleague wrote this source note for <code>cafeteria_orders.csv</code>. One line shows a practice that makes every later number impossible to reproduce. Click it.",
           ar: "كتب زميل ملاحظة المصدر هذه للملف <code>cafeteria_orders.csv</code>. سطر واحد يُظهر ممارسة تجعل كل رقم لاحق مستحيل إعادة الإنتاج. انقره." },
      code: "FILE      cafeteria_orders.csv\nSOURCE    till (point-of-sale) export, one row per item line\nPERIOD    2026-09-01 to 2026-09-30 (open Sunday to Thursday)\nSIZE      771 data lines + 1 header line, 8 columns\nRECEIVED  <date>, from the cafeteria manager\nCHANGES   repeated rows deleted in Excel; file saved over the original\nUSE       internal: the manager's October stock decision",
      answer: 6,
      hint: { en: "A source note records what has been done to the file since the export. Which entry would leave you with nothing to start from?",
              ar: "تسجّل ملاحظة المصدر ما جرى للملف منذ التصدير. أي مدخل يتركك دون شيء تبدأ منه؟" },
      explain: { en: "The CHANGES line admits that the only copy was edited and saved over. Nothing remains to rebuild the numbers from, and nothing says which rows went. This is Layla’s story: her chart said 8159.00, a colleague’s fuller rules gave 8062.00, and she could not explain the gap because the file she started from was gone. The first habit of reproducibility is to keep the raw file untouched and read-only and to work on copies; the note should then say “none - the raw copy is kept read-only”, with every cleaning rule in a separate decision log.",
                 ar: "يعترف سطر التغييرات بأن النسخة الوحيدة عُدّلت وحُفظ فوقها. فلا يبقى شيء تُعاد منه الأرقام، ولا شيء يقول أي الصفوف ذهبت. هذه حكاية ليلى: قال مخططها 8159.00 وأعطت قواعد زميلها الأوفى 8062.00، فلم تستطع تفسير الفرق لأن الملف الذي بدأت منه ضاع. أولى عادات قابلية إعادة الإنتاج أن تُبقي الملف الخام دون مساس وللقراءة فقط وتعمل على نسخ؛ وعندها تقول الملاحظة «لا شيء — النسخة الخام محفوظة للقراءة فقط»، وكل قاعدة تنظيف في سجل قرارات منفصل." },
      solution: { code: "CHANGES   none - the raw copy is kept read-only",
                  en: "Clean a copy, never the original, and record each rule in the decision log.",
                  ar: "نظِّف نسخة لا الأصل، وسجّل كل قاعدة في سجل القرارات." } },

    { id: "p1l1q13", type: "multi", level: "medium", topics: ["p1-first-look", "p1-data-dictionary"], lang: "csv",
      q: { en: "These are the first eight data lines of <code>cafeteria_orders.csv</code>. Using <b>only</b> these lines, which statements can you honestly make? (Choose all that apply.)",
           ar: "هذه أول ثمانية أسطر بيانات من <code>cafeteria_orders.csv</code>. مستعملًا هذه الأسطر <b>وحدها</b>، أي العبارات يمكنك قولها بصدق؟ (اختر كل ما ينطبق.)" },
      code: "order_id,order_time,item,category,qty,unit_price,payment,customer_type\n5001,2026-09-01 13:43:29,Shawarma Wrap,Food,1,120.0,Cash,Student\n5002,2026-09-01 09:25:59,Shawarma Wrap,Food,1,12.0,Cash,Visitor\n5002,2026-09-01 09:25:59,Latte,Drink,3,9.0,Wallet,Student\n5003,2026-09-01 11:58:29,Shawarma Wrap,Food,1,12.0,Card,Staff\n5004,2026-09-01 09:37:30,Tea,Drink,1,n/a,Wallet,Visitor\n5005,2026-09-01 13:46:53,Chips,Snack,1,4.0,Voucher,Student\n5006,2026-09-01 16:06:26,Karak Tea,Drink,1,5.0,Cash,Student\n5007,2026-09-01 11:12:51,Espresso,Drink,1,6.0,Wallet,Student",
      options: [
        { en: "The file contains no refunds.", ar: "لا يحتوي الملف أي مرتجعات." },
        { en: "A line is not an order: order 5002 spans two lines.", ar: "السطر ليس طلبًا: الطلب 5002 يمتد على سطرين." },
        { en: "Prices are in shekels.", ar: "الأسعار بالشيكل." },
        { en: "The price of Shawarma Wrap is not consistent: 120.0 on order 5001, 12.0 on orders 5002 and 5003.", ar: "سعر ساندويتش الشاورما غير متسق: 120.0 في الطلب 5001 و12.0 في الطلبين 5002 و5003." },
        { en: "The unit_price of order 5004 is the text <code>n/a</code>, not a number.", ar: "قيمة unit_price في الطلب 5004 هي النص <code>n/a</code> وليست رقمًا." }
      ],
      answer: [1, 3, 4],
      hint: { en: "Separate what you can see on these eight lines from what you would have to assume about the other 763.",
              ar: "افصل بين ما تراه على هذه الأسطر الثمانية وما سيكون عليك افتراضه عن الأسطر الـ763 الباقية." },
      explain: { en: "Three claims rest on the lines themselves: order 5002 has two lines, the wrap is priced both 120.0 and 12.0, and 5004 holds text where a number belongs. “No refunds” is the tempting one: absence in a sample is not absence in the file, and five lines with qty −1 sit further down. The currency is written nowhere in the file, so it is a question for the data owner, not a fact. Reading lines against each other is a habit worth more than any function; what the lines cannot tell you becomes an entry in the dictionary to check or ask about.",
                 ar: "ثلاث دعاوى تقوم على الأسطر نفسها: الطلب 5002 له سطران، والشاورما مسعَّرة 120.0 و12.0، والطلب 5004 يحمل نصًّا حيث يجب أن يكون رقم. و«لا مرتجعات» هي المغرية: غياب الشيء في عيّنة ليس غيابه في الملف، وخمسة أسطر بكمية −1 موجودة أسفل الملف. أما العملة فلا تُكتب في أي مكان من الملف، فهي سؤال لمالك البيانات لا حقيقة. ومقارنة الأسطر ببعضها عادة أنفع من أي دالة؛ وما لا تقوله الأسطر يصير مدخلًا في القاموس تفحصه أو تسأل عنه." } },

    { id: "p1l1q14", type: "output", level: "hard", topics: ["p1-raw-vs-parsed", "p1-first-look"], lang: "python",
      q: { en: "A student wants the faithful first look but forgets one argument. The file has 771 data lines, one <code>unit_price</code> that reads <code>n/a</code>, 17 empty <code>payment</code> cells and five lines with <code>qty</code> −1. What does this program print?",
           ar: "يريد طالب النظرة الأولى الأمينة لكنه ينسى معاملًا واحدًا. في الملف 771 سطر بيانات، وقيمة <code>unit_price</code> واحدة نصها <code>n/a</code>، و17 خلية <code>payment</code> فارغة، وخمسة أسطر فيها <code>qty</code> تساوي −1. ماذا يطبع هذا البرنامج؟" },
      code: 'import pandas as pd\n\ntxt = pd.read_csv("cafeteria_orders.csv", dtype=str)\nprint(txt.shape)\nprint((txt["unit_price"] == "n/a").sum())\nprint((txt["payment"] == "").sum())\nprint((txt["qty"] == "-1").sum())',
      options: [
        { code: "(771, 8)\n1\n17\n5" },
        { code: "(771, 8)\n0\n17\n5" },
        { code: "(771, 8)\n0\n0\n5" },
        { code: "TypeError" }
      ],
      answer: 2,
      hint: { en: "<code>dtype=str</code> says how to store the values that survive. Which values might never reach that stage?",
              ar: "<code>dtype=str</code> تقول كيف تُخزَّن القيم التي تنجو. أي القيم قد لا تصل إلى تلك المرحلة أصلًا؟" },
      explain: { en: "dtype=str only controls how surviving values are stored. Before that, read_csv still turns its default “missing” words — n/a, NA and the empty string — into NaN, and NaN == “n/a” is simply False (no TypeError). So the n/a price and the 17 empty payments both vanish from the counts (0 and 0), while “-1” is an ordinary string and is still found (5). The first output (1, 17, 5) belongs to Version 3, which needs <em>both</em> dtype=str and keep_default_na=False. The shape (771, 8) looks the same either way, which is why nothing warns you.",
                 ar: "تتحكم dtype=str فقط في كيفية تخزين القيم التي تنجو. أما قبل ذلك فما زالت read_csv تحوّل كلماتها «المفقودة» الافتراضية — n/a وNA والنص الفارغ — إلى NaN، والمقارنة NaN == «n/a» تعطي False ببساطة (لا TypeError). فيختفي السعر n/a والدفعات الفارغة الـ17 من العدّ (0 و0)، بينما «-1» نص عادي ويُعثر عليه (5). والناتج الأول (1 و17 و5) يخصّ النسخة 3 التي تحتاج <em>الاثنين معًا</em>: dtype=str وkeep_default_na=False. والشكل (771, 8) يبدو نفسه في الحالتين، ولهذا لا شيء يحذّرك." } },

    { id: "p1l1q15", type: "fill", level: "easy", topics: ["p1-raw-vs-parsed"], lang: "python",
      q: { en: "Complete Version 3 of the first look so that every value stays the text that was written (nothing is turned into a missing value) and the program counts the lines whose <code>unit_price</code> is exactly the text <code>n/a</code>. It should print <code>1</code>.",
           ar: "أكمل النسخة 3 من النظرة الأولى بحيث تبقى كل قيمة النص كما كُتب (فلا يتحول شيء إلى قيمة مفقودة) ويعدّ البرنامج الأسطر التي قيمة <code>unit_price</code> فيها هي النص <code>n/a</code> بالضبط. يجب أن يطبع <code>1</code>." },
      code: 'import pandas as pd\n\ntxt = pd.read_csv("cafeteria_orders.csv", dtype=____1____, ____2____=False)\nprint((txt["unit_price"] == ____3____).sum())',
      blanks: [
        { accept: ["str", "\"str\"", "'str'"] },
        { accept: ["keep_default_na"] },
        { accept: ["\"n/a\"", "'n/a'"] }
      ],
      hint: { en: "One argument keeps every value as text; another stops the parser from treating words like n/a as missing. The third blank is a string to compare with.",
              ar: "معامل يُبقي كل قيمة نصًّا؛ وآخر يمنع المحلّل من معاملة كلمات مثل n/a كقيم مفقودة. والفراغ الثالث نص تُقارن به." },
      explain: { en: "<code>dtype=str</code> keeps each value as the text that was written, and <code>keep_default_na=False</code> stops pandas converting n/a (and empty cells) into NaN. With only the first, the count would be 0 and the problem would be tidied away before you saw it; with the default parse, <code>isna()</code> reports “one missing value” in a file that has no empty cell there. What the faithful look costs: every column is text, so no arithmetic yet — converting types is a separate, deliberate step.",
                 ar: "<code>dtype=str</code> تُبقي كل قيمة نصًّا كما كُتبت، و<code>keep_default_na=False</code> تمنع pandas من تحويل n/a (والخلايا الفارغة) إلى NaN. ومع الأولى وحدها يكون العدّ 0 وتُرتَّب المشكلة وتُخفى قبل أن تراها؛ ومع التحليل الافتراضي تُبلّغ <code>isna()</code> عن «قيمة مفقودة واحدة» في ملف لا خلية فارغة فيه هناك. وكلفة النظرة الأمينة: كل عمود نص، فلا حساب بعد — وتحويل الأنواع خطوة مستقلة ومقصودة." } },

    { id: "p1l1q16", type: "complete", level: "medium", topics: ["p1-data-dictionary"], lang: "text",
      q: { en: "This is the data-dictionary entry for <code>unit_price</code>, Version 3. Choose the text that completes the <code>meaning</code> line.",
           ar: "هذا مدخل قاموس البيانات للعمود <code>unit_price</code> في النسخة 3. اختر النص الذي يكمل سطر <code>meaning</code>." },
      code: "unit_price      decimal number\n    meaning : ???\n    unit    : currency units; the file does not name the currency\n    level   : ratio\n    allowed : the item's list price in cafeteria_menu.csv\n    problem : 1 line reads \"n/a\"; 1 Shawarma Wrap line reads 120.0 (menu: 12.0)",
      options: [
        { code: "price of ONE unit, before multiplying by qty" },
        { code: "price of the whole line, already multiplied by qty" },
        { code: "the item's list price from the menu, whatever was charged" },
        { code: "price of the whole order, shared by all its lines" }
      ],
      answer: 0,
      hint: { en: "Think of how revenue is computed from this column and qty. What must the column mean for that formula to be right?",
              ar: "فكّر في كيف يُحسب الإيراد من هذا العمود ومن qty. ماذا يجب أن يعني العمود لتكون تلك المعادلة صحيحة؟" },
      explain: { en: "A storage type (Version 2: “decimal number”) is not a meaning. The price is for one unit, so revenue = qty × unit_price. A reader who believed it was the line total would skip the multiplication and understate every line with qty 2 or 3. The file records what was charged, not the menu price, which is why 120.0 can appear and why the <code>allowed</code> line (the menu) is separate. And order 5002’s two lines carry different prices, so the price is not shared across an order.",
                 ar: "نوع التخزين (النسخة 2: «عدد عشري») ليس معنى. السعر لوحدة واحدة، فالإيراد = qty × unit_price. ومن ظنّ أنه إجمالي السطر سيتخطى الضرب ويُنقص إيراد كل سطر كميته 2 أو 3. والملف يسجّل ما حُصّل فعلًا لا سعر القائمة، ولهذا يمكن أن يظهر 120.0 ولهذا سطر <code>allowed</code> (القائمة) منفصل. وسطرا الطلب 5002 لهما سعران مختلفان، فالسعر لا يُشارَك عبر الطلب." },
      solution: { code: "meaning : price of ONE unit, before multiplying by qty",
                  en: "State the meaning in the entry; a type alone leaves it to each reader’s guess.",
                  ar: "اكتب المعنى في المدخل؛ فالنوع وحده يترك المعنى لتخمين كل قارئ." } },

    { id: "p1l1q17", type: "mcq", level: "hard", topics: ["p1-data-dictionary", "p1-leakage-clock"],
      q: { en: "The dictionary says <code>order_id</code> is nominal. Yet in this file it correlates <b>0.997</b> with the order’s time, because the till numbers orders as they arrive. A teammate wants to feed it into the noon-orders forecast as a numeric feature, “since it tracks time so closely”. What is the right response?",
           ar: "يقول القاموس إن <code>order_id</code> اسمي. ومع ذلك يرتبط في هذا الملف بوقت الطلب بمعامل <b>0.997</b> لأن الصندوق يرقّم الطلبات حسب وصولها. يريد زميل أن يُدخله في توقع طلبات الظهيرة كخاصية رقمية «لأنه يتتبّع الزمن بدقة». ما الردّ الصحيح؟" },
      options: [
        { en: "Use it: a feature that tracks time so closely can only help a forecast of something that changes with time.", ar: "استعمله: خاصية تتتبّع الزمن بهذه الدقة لا يمكن إلا أن تفيد توقع شيء يتغير مع الزمن." },
        { en: "Use it, but rescale it first, so that large ids do not outweigh the small ones.", ar: "استعمله لكن أعد تحجيمه أولًا حتى لا تطغى الأرقام الكبيرة على الصغيرة." },
        { en: "Do not use it: it is a label that doubles as a clock, so a model would learn the month’s trend, and tomorrow’s ids do not exist yet.", ar: "لا تستعمله: هو وسم يؤدي دور الساعة أيضًا، فسيتعلم النموذج اتجاه الشهر، وأرقام طلبات الغد غير موجودة بعد." },
        { en: "Use it, because a correlation of 0.997 shows it is a better predictor than any other column.", ar: "استعمله، فمعامل ارتباط 0.997 يدل على أنه متنبئ أفضل من أي عمود آخر." }
      ],
      answer: 2,
      hint: { en: "Two separate questions: what does the dictionary’s level line say about this column, and will its value exist when the forecast must be made?",
              ar: "سؤالان منفصلان: ماذا يقول سطر المستوى في القاموس عن هذا العمود؟ وهل ستوجد قيمته حين يجب إعداد التوقع؟" },
      explain: { en: "Level of measurement is about meaning: order_id only labels orders, and its size is nothing but arrival order, so it is a clock in disguise. A model fed with it can “predict” anything that changes over the month, then fail on the first day of October — and for tomorrow’s orders the id does not exist at prediction time, which is leakage. Rescaling changes the numbers but not their meaning; the high correlation is exactly the warning, not the reassurance; and “it can only help” mistakes a clock for a cause. Ask of every feature: will I have it when I must predict, and does it mean what I think?",
                 ar: "مستوى القياس يتعلق بالمعنى: order_id لا يُسمّي إلا الطلبات، وحجمه لا يعني سوى ترتيب الوصول، فهو ساعة متنكّرة. والنموذج الذي يُغذّى به يستطيع أن «يتنبأ» بأي شيء يتغير على امتداد الشهر ثم يفشل في أول أيام تشرين الأول — وفي طلبات الغد لا يوجد الرقم وقت التوقع، وهذا تسرّب. وإعادة التحجيم تغيّر الأرقام لا معناها؛ والارتباط المرتفع هو التحذير نفسه لا الطمأنينة؛ وعبارة «لا يمكن إلا أن تفيد» تحسب الساعة سببًا. اسأل عن كل خاصية: هل سأملكها حين يجب أن أتنبأ؟ وهل تعني ما أظنه؟" } },

    /* ---------- Concept 5: reproducibility and ethics ---------- */

    { id: "p1l1q18", type: "mcq", level: "easy", topics: ["p1-data-minimisation"],
      q: { en: "Next month the manager also wants to know how many students come back more than three times a week. The current export has no student column. What is the best change to the export?",
           ar: "في الشهر القادم يريد المدير أيضًا أن يعرف كم طالبًا يعود أكثر من ثلاث مرات في الأسبوع. التصدير الحالي لا عمود فيه للطالب. ما أفضل تغيير في التصدير؟" },
      options: [
        { en: "Add the student’s university id number to every line, since it identifies a visit exactly.", ar: "أضف رقم الطالب الجامعي إلى كل سطر، فهو يحدّد الزيارة بدقة." },
        { en: "Add the student’s phone number, since it is also unique to one person.", ar: "أضف رقم هاتف الطالب، فهو أيضًا فريد لشخص واحد." },
        { en: "Add faculty and cashier name; together they usually point to the same students anyway.", ar: "أضف الكلية واسم الصرّاف؛ فهما معًا يشيران غالبًا إلى الطلاب أنفسهم على أي حال." },
        { en: "Add a random visitor code made by the till, keep any key linking it to a person apart, and tell the students.", ar: "أضف رمز زائر عشوائيًّا يصنعه الصندوق، واحفظ أي مفتاح يربطه بشخص بعيدًا، وأخبر الطلاب." }
      ],
      answer: 3,
      hint: { en: "What does the new question really need: to know <em>who</em> a student is, or to recognise that it is the <em>same</em> student?",
              ar: "ماذا يحتاج السؤال الجديد حقًّا: أن تعرف <em>من</em> هو الطالب، أم أن تتعرّف أنه <em>الطالب نفسه</em>؟" },
      explain: { en: "The question needs to recognise a repeat visit, not to know who the person is. The pattern is “replace”: keep the analytical value (repeat visits) and drop the identifying part, with the code random, the key stored apart and the people told. The university id and the phone number are direct identifiers the question does not need, and joined with another list they reveal habits. Faculty plus cashier is no replacement at all: it adds more personal data and a re-identification risk. Minimisation has a cost — without ids you can never count repeat customers — so make the choice on purpose and write it in the source note.",
                 ar: "يحتاج السؤال إلى التعرّف على زيارة متكررة لا إلى معرفة من هو الشخص. والنمط هو «الاستبدال»: احتفظ بالقيمة التحليلية (الزيارات المتكررة) واحذف الجزء المعرِّف، برمز عشوائي ومفتاح محفوظ بعيدًا وإخبار الأشخاص. أما رقم الطالب الجامعي ورقم الهاتف فمعرِّفان مباشران لا يحتاجهما السؤال، وإذا رُبطا بقائمة أخرى كشفا العادات. والكلية مع الصرّاف ليسا بديلًا أصلًا: فهما يضيفان بيانات شخصية أكثر وخطر كشف الهوية. وللحد الأدنى من البيانات كلفة — بلا أرقام تعريفية لا تعدّ الزبائن المتكررين أبدًا — فاجعل الاختيار مقصودًا واكتبه في ملاحظة المصدر." } },

    { id: "p1l1q19", type: "tf", level: "hard", topics: ["p1-who-is-counted"],
      q: { en: "A demand model is trained only on till records. Chicken Rice sells out at 12:30 every day, so the model learns that its demand ends at 12:30 and recommends cooking less for the late shift. If the cafeteria follows the advice, next month’s file will show even fewer late sales — and so will look like a confirmation of the model.",
           ar: "يُدرَّب نموذج طلب على سجلات الصندوق وحدها. أرز الدجاج ينفد عند 12:30 كل يوم، فيتعلّم النموذج أن طلبه ينتهي عند 12:30 ويوصي بطهي أقل للوردية المتأخرة. إن اتّبعت الكافتيريا النصيحة فسيُظهر ملف الشهر القادم مبيعات متأخرة أقل — فيبدو كأنه يؤكد النموذج." },
      truth: true,
      hint: { en: "What does a till record when an item has run out? And what will the next file contain if less is cooked?",
              ar: "ماذا يسجّل الصندوق حين ينفد الصنف؟ وماذا سيحوي الملف التالي إن طُهي أقل؟" },
      explain: { en: "True. Sales are not demand: after the sell-out the file records zero sales, which the model reads as zero demand. If its advice is followed, less is cooked, the dish sells out even earlier, and the next file shows even fewer late sales — the model shapes its own training data, a feedback loop that no test score reveals. The remedy lies upstream: ask who and what the file did not count, record when items sell out, and write “sales are not demand” in the caveats.",
                 ar: "صحيح. المبيعات ليست الطلب: بعد النفاد يسجّل الملف مبيعات صفرًا، ويقرؤها النموذج طلبًا صفرًا. وإن اتُّبعت نصيحته طُهي أقل، فينفد الصنف أبكر، ويُظهر الملف التالي مبيعات متأخرة أقل — فيشكّل النموذج بيانات تدريبه بنفسه، وهي حلقة تغذية راجعة لا تكشفها أي درجة اختبار. والعلاج في المنبع: اسأل من وماذا لم يعدّه الملف، وسجّل وقت نفاد الأصناف، واكتب «المبيعات ليست الطلب» في التحفظات." } },

    /* ---------- Concept 7 (project) - a write question on the busiest hour ---------- */

    { id: "p1l1q20", type: "write", level: "hard", topics: ["p1-project-sketch", "p1-measure-changes-answer"], lang: "python", lines: 6,
      q: { en: "The table <code>clean</code> (the 748 cleaned lines) has an <code>hour</code> column made from <code>order_time</code>. The chapter project defines the <b>busiest hour</b> as the hour of the day with the most <em>distinct</em> <code>order_id</code> values. Write code that prints that hour.",
           ar: "في الجدول <code>clean</code> (الأسطر الـ748 المنظَّفة) عمود <code>hour</code> مشتق من <code>order_time</code>. يعرّف مشروع الفصل <b>الساعة الأكثر ازدحامًا</b> بأنها الساعة التي فيها أكبر عدد من قيم <code>order_id</code> <em>المميزة</em>. اكتب كودًا يطبع تلك الساعة." },
      starter: "# clean already exists, with an \"hour\" column\n",
      checks: [
        { re: "groupby\\s*\\(\\s*\\[?\\s*[\"']hour[\"']", label: { en: "groups the lines by <code>hour</code>", ar: "يجمّع الأسطر حسب <code>hour</code>" } },
        { re: "nunique\\s*\\(|drop_duplicates\\s*\\(", label: { en: "counts <em>distinct</em> <code>order_id</code> values (<code>nunique</code>), not lines", ar: "يعدّ قيم <code>order_id</code> <em>المميزة</em> (<code>nunique</code>) لا الأسطر" } },
        { re: "idxmax\\s*\\(|nlargest\\s*\\(|sort_values\\s*\\(", label: { en: "picks the hour with the largest count (<code>idxmax</code>, <code>nlargest</code> or a sort)", ar: "يختار الساعة ذات العدد الأكبر (<code>idxmax</code> أو <code>nlargest</code> أو ترتيب)" } },
        { re: "print\\s*\\(", label: { en: "prints the result", ar: "يطبع النتيجة" } }
      ],
      forbid: [ { re: "value_counts\\s*\\(|\\.count\\s*\\(", label: { en: "counting lines (<code>value_counts</code>, <code>count</code>) instead of distinct orders", ar: "عدّ الأسطر (<code>value_counts</code> أو <code>count</code>) بدل الطلبات المميزة" } } ],
      hint: { en: "An order can have several lines, so counting lines inflates busy hours. Which pandas method counts different values?",
              ar: "قد يكون للطلب الواحد عدة أسطر، فعدّ الأسطر يضخّم الساعات المزدحمة. أي دالة في pandas تعدّ القيم المختلفة؟" },
      explain: { en: "Group by hour, count the distinct order_id values in each group, and take the hour with the largest count. The measure matters: on the real file counting <em>lines</em> names 13:00 (148 lines against 144 at 12:00), while counting <em>distinct orders</em>, as the project card defines it, names 12:00 (119 orders against 117). Same file, same word “busy”, two answers — the three-analysts problem again, this time hidden inside a groupby.",
                 ar: "جمّع بحسب الساعة، وعُدّ قيم order_id المميزة في كل مجموعة، وخذ الساعة ذات العدد الأكبر. والمقياس هنا مهم: ففي الملف الحقيقي يسمّي عدّ <em>الأسطر</em> الساعة 13:00 (148 سطرًا مقابل 144 عند 12:00)، بينما يسمّي عدّ <em>الطلبات المميزة</em>، كما تعرّفه بطاقة المشروع، الساعة 12:00 (119 طلبًا مقابل 117). الملف نفسه، وكلمة «مزدحم» نفسها، وجوابان — مشكلة المحللين الثلاثة مرة أخرى، لكنها هذه المرة مخبّأة داخل groupby." },
      solution: { code: "orders_per_hour = clean.groupby(\"hour\")[\"order_id\"].nunique()\nprint(orders_per_hour.idxmax())", out: "12",
                  en: "On the real file this prints 12 (119 distinct orders). Counting lines with .size() would have named 13.",
                  ar: "في الملف الحقيقي يطبع هذا 12 (119 طلبًا مميزًا). وعدّ الأسطر بـ .size() كان سيسمّي 13." } },

    /* ---------- Concept 6: where AI projects differ ---------- */

    { id: "p1l1q21", type: "mcq", level: "easy", topics: ["p1-framing-target", "p1-drift-monitoring"],
      q: { en: "A team trained and deployed a model that predicts the <b>units</b> of each item tomorrow. After three weeks the manager says: “I meant, what should I stock first to earn the most?” Which statement is true?",
           ar: "درّب فريق نموذجًا ونشره ليتنبأ بـ<b>وحدات</b> كل صنف غدًا. بعد ثلاثة أسابيع يقول المدير: «قصدتُ: ماذا أخزّن أولًا لأربح أكثر؟» أي عبارة صحيحة؟" },
      options: [
        { en: "The target is a framing choice that belonged on the question card. Changing it now means redoing features, split, training and evaluation, and the stocking decisions already made on the old advice.", ar: "الهدف اختيار صياغة كان مكانه بطاقة السؤال. وتغييره الآن يعني إعادة الخصائص والتقسيم والتدريب والتقييم، والقرارات التي اتُّخذت فعلًا على النصيحة القديمة." },
        { en: "Only the chart needs changing: units and revenue come from the same data, so the model is still right.", ar: "الذي يحتاج تغييرًا هو المخطط فقط: الوحدات والإيراد من البيانات نفسها، فالنموذج ما زال صحيحًا." },
        { en: "The team should have chosen a more accurate model; a lower error would have fixed the mismatch.", ar: "كان على الفريق اختيار نموذج أدق؛ فخطأ أقل كان سيعالج عدم التطابق." },
        { en: "Fixing it costs ten times what it would have cost at the card review; that is the standard multiple for late fixes.", ar: "إصلاحه يكلّف عشرة أضعاف ما كان سيكلّفه عند مراجعة البطاقة؛ فهذا هو المضاعِف المعتاد للإصلاح المتأخر." }
      ],
      answer: 0,
      hint: { en: "Which of the three “what sells?” readings did the team encode, and what advice does that reading give?",
              ar: "أي القراءات الثلاث لـ«ما الذي يُباع؟» ضمّنها الفريق في نموذجه، وأي نصيحة تعطيها تلك القراءة؟" },
      explain: { en: "Framing decides the target: a model trained on units quietly learns that tea and falafel are the stars, while one trained on revenue puts wraps and rice first. The model answers the question you encoded, not the one you meant, and no extra accuracy fixes that. The earlier the mismatch is found, the less is built on top of it; after deployment, everything above must be redone plus decisions already taken and some of the manager’s trust. The tenfold multiple is a guess: it is a pattern, not a measured ratio, and the direction is what matters.",
                 ar: "الصياغة تحدّد الهدف: النموذج المدرَّب على الوحدات يتعلّم بصمت أن الشاي والفلافل هما النجمان، والمدرَّب على الإيراد يضع الشاورما والأرز أولًا. النموذج يجيب عن السؤال الذي شفّرته لا الذي قصدته، ولا دقة إضافية تعالج ذلك. وكلما اكتُشف عدم التطابق مبكرًا قلّ ما بُني فوقه؛ وبعد النشر يجب إعادة كل ما سبق مع القرارات المتخذة فعلًا وشيء من ثقة المدير. أما المضاعِف بعشرة أضعاف فتخمين: إنه نمط لا نسبة مقيسة، والمهم الاتجاه." } },

    { id: "p1l1q22", type: "ordercode", level: "medium", topics: ["p1-leakage-clock", "p1-ai-lifecycle"], lang: "python",
      q: { en: "<code>daily</code> has one row per open day (22 rows) with the columns <code>day</code> and <code>noon</code> (distinct orders in the 12:00 hour). Put the statements in the order that gives an honest baseline score: guess every test day with the average of the training days, then measure the average miss.",
           ar: "في <code>daily</code> صف لكل يوم عمل (22 صفًّا) بالعمودين <code>day</code> و<code>noon</code> (الطلبات المميزة في الساعة 12:00). رتّب العبارات بالترتيب الذي يعطي درجة خط أساس صادقة: خمّن كل يوم اختبار بمتوسط أيام التدريب، ثم قِس متوسط الخطأ." },
      items: [
        { code: 'daily = daily.sort_values("day")' },
        { code: "train = daily.iloc[:15]\ntest = daily.iloc[15:]" },
        { code: 'guess = train["noon"].mean()' },
        { code: 'errors = (test["noon"] - guess).abs()' },
        { code: "print(round(errors.mean(), 2))" }
      ],
      answer: [0, 1, 2, 3, 4],
      hint: { en: "The test days must come after the training days, and the guess may use only what the training days know.",
              ar: "يجب أن تأتي أيام الاختبار بعد أيام التدريب، ولا يجوز أن يستعمل التخمين إلا ما تعرفه أيام التدريب." },
      explain: { en: "Sort first, so that “the first 15” really means the first 15 in time; split by position, never at random; compute the guess from <code>train</code> only; measure the errors on <code>test</code>; print last. Sorting after the split changes nothing, and averaging all 22 days would let the guess see the days it is later judged on. The printed 1.17 orders is the lesson’s baseline: the number any model must beat, by an amount that changes the roster, to earn its place.",
                 ar: "رتّب أولًا ليعني «أول 15» حقًّا أول 15 يومًا في الزمن؛ ثم قسّم بالموضع لا عشوائيًّا؛ واحسب التخمين من <code>train</code> وحده؛ وقِس الأخطاء على <code>test</code>؛ واطبع أخيرًا. الترتيب بعد التقسيم لا يغيّر شيئًا، وأخذ متوسط الأيام الـ22 كلها يتيح للتخمين أن يرى الأيام التي سيُحكم عليه بها لاحقًا. والرقم المطبوع 1.17 طلب هو خط الأساس في الدرس: العدد الذي على أي نموذج أن يتغلب عليه، بمقدار يغيّر توزيع الصرّافين، ليستحق مكانه." } },

    { id: "p1l1q23", type: "contrast", level: "hard", topics: ["p1-leakage-clock", "p1-drift-monitoring", "p1-ai-lifecycle"],
      q: { en: "Two silent failures of an AI project. For each statement, say which one it describes — or both.",
           ar: "فشلان صامتان في مشروع الذكاء الاصطناعي. لكل عبارة، حدّد أيهما تصف — أو كليهما." },
      concepts: [ { en: "Leakage", ar: "التسرّب (Leakage)" }, { en: "Drift", ar: "الانجراف (Drift)" } ],
      rows: [
        { s: { en: "The model worked for weeks; then a second till and a lunch deal changed the noon pattern and its error began to grow.", ar: "عمل النموذج أسابيع؛ ثم غيّر صندوق ثانٍ وعرض غداء نمط الظهيرة فبدأ خطؤه يكبر." }, a: 1 },
        { s: { en: "The test score looks excellent, but the model has nothing to read in real use.", ar: "تبدو درجة الاختبار ممتازة، لكن النموذج لا يجد ما يقرؤه في الاستعمال الفعلي." }, a: 0 },
        { s: { en: "Nothing crashes and no warning appears.", ar: "لا شيء ينهار ولا يظهر أي تحذير." }, a: 2 },
        { s: { en: "It is found by comparing forecasts with the real counts, week after week.", ar: "يُكتشف بمقارنة التوقعات بالأعداد الحقيقية أسبوعًا بعد أسبوع." }, a: 1 },
        { s: { en: "A feature, such as the total of the very day being predicted, would not exist at the moment of prediction.", ar: "خاصية، مثل مجموع اليوم المطلوب توقعه نفسه، لن تكون موجودة لحظة التوقع." }, a: 0 },
        { s: { en: "A random shuffle of time-ordered days before splitting can cause it.", ar: "يمكن أن يسبّبه خلط الأيام المرتبة زمنيًّا عشوائيًّا قبل التقسيم." }, a: 0 },
        { s: { en: "Agreeing in advance what size of error means “stop and re-check” is the guard against it.", ar: "الاتفاق مسبقًا على حجم الخطأ الذي يعني «توقف وأعد الفحص» هو الحارس منه." }, a: 1 }
      ],
      hint: { en: "Ask <em>when</em> the problem exists: already in how the model was built and tested, or only after the world changes?",
              ar: "اسأل <em>متى</em> توجد المشكلة: في طريقة بناء النموذج واختباره أصلًا، أم بعد أن يتغير العالم فقط؟" },
      explain: { en: "Leakage is a flaw in the evaluation: an input would not exist at prediction time (the day’s own total, “next week’s numbers” hidden inside a shuffled split), so the score answers “how well can it recall the past?”. Drift is a change after deployment: the world moves, the learned pattern stops holding, and only monitoring against real counts, with an agreed error that triggers a re-check, will show it. What they share is silence: neither raises an error, and the leaky model even looks better than an honest one.",
                 ar: "التسرّب عيب في التقييم: مدخل لن يوجد وقت التوقع (مجموع اليوم نفسه، أو «أرقام الأسبوع القادم» المخبّأة في تقسيم مخلوط)، فتجيب الدرجة عن «ما مدى قدرته على تذكّر الماضي؟». أما الانجراف فتغيّر بعد النشر: يتحرك العالم ولا يعود النمط المتعلَّم صالحًا، ولا يكشفه إلا رصد مقابل الأعداد الحقيقية مع خطأ متفق عليه يستدعي الفحص. وما يجمعهما الصمت: لا يرفع أيٌّ منهما خطأً، والنموذج المتسرّب يبدو أفضل من الصادق." } },

    { id: "p1l1q24", type: "mcq", level: "medium", topics: ["p1-one-page-brief", "p1-project-sketch"],
      q: { en: "A colleague fills the HOW line of the one-page brief with “Data: cafeteria_orders.csv” and staples the whole notebook behind it “for the details”. What does the page itself still need?",
           ar: "يملأ زميل سطر «كيف» في الموجز من صفحة واحدة بعبارة «البيانات: cafeteria_orders.csv» ويرفق الدفتر كله خلفه «للتفاصيل». ماذا تحتاج الصفحة نفسها بعد؟" },
      options: [
        { en: "The notebook’s code pasted in, so the manager can follow every step.", ar: "كود الدفتر ملصوقًا فيها، ليتابع المدير كل خطوة." },
        { en: "A paragraph on how pandas reads CSV files, in case the manager asks.", ar: "فقرة عن كيفية قراءة pandas لملفات CSV، تحسبًا لسؤال المدير." },
        { en: "The list of every removed line, since the decision log is part of the brief.", ar: "قائمة بكل سطر أُزيل، فسجل القرارات جزء من الموجز." },
        { en: "The rules applied (D1–D5), how many lines remain, and whether the three tools agree.", ar: "القواعد المطبَّقة (D1–D5)، وكم سطرًا بقي، وهل اتفقت الأدوات الثلاث." }
      ],
      answer: 3,
      hint: { en: "The deliverable is not the work behind it. What must a manager read in one minute to trust the number, and what must the next analyst know to repeat it?",
              ar: "المُخرَج ليس العمل الذي وراءه. ماذا يجب أن يقرأ المدير في دقيقة ليثق بالرقم، وماذا يجب أن يعرف المحلل التالي ليكرره؟" },
      explain: { en: "The deliverable is not the notebook, the workbook or the dashboard — those are the work. It is one page, and one page forces choices: the answer, the “so what”, and how sure to be. The HOW line must say which rules were applied, how many lines remain, and whether the tools agree, which is the SUCCESS test the project card set (same top three and same busiest hour in all three tools). Pasting code or a pandas tutorial buries that; the full list of removed lines belongs in the decision log kept beside the work, not on the page.",
                 ar: "المُخرَج ليس الدفتر ولا المصنّف ولا لوحة المعلومات — هذه هي العمل. هو صفحة واحدة، والصفحة الواحدة تفرض الاختيارات: الجواب، و«وماذا بعد؟»، وإلى أي حد نطمئن. ويجب أن يقول سطر «كيف» أي القواعد طُبّقت وكم سطرًا بقي وهل اتفقت الأدوات، وهو اختبار النجاح الذي وضعته بطاقة المشروع (الأصناف الثلاثة نفسها والساعة الأكثر ازدحامًا نفسها في الأدوات الثلاث). ولصق الكود أو شرح pandas يدفن ذلك؛ أما قائمة الأسطر المُزالة كاملة فمكانها سجل القرارات بجانب العمل لا الصفحة." }
    }

  ]
};
