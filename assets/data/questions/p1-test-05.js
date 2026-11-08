/* Practical Chapter 1 - Lesson test 5: Power BI Desktop: First Tour.
   24 questions: p1l5q01 ... p1l5q24. Topics: assets/data/topics/p1-l5.js
   Power BI cannot be run in the build, so every value asserted here was recomputed with pandas
   on downloads/p1/cafeteria_orders.csv and cafeteria_menu.csv (scratch: .tmp/p1-test-05/). */
window.DABanks = window.DABanks || {};
(function () {
  /* code(line, line, ...) -> one string with \n between lines */
  function code() { return Array.prototype.join.call(arguments, "\n"); }

  window.DABanks["p1-test-05"] = {
    title: {
      en: "Test 5 — Power BI Desktop: First Tour",
      ar: "اختبار 5 — Power BI Desktop: الجولة الأولى"
    },
    intro: {
      en: "24 questions on the whole lesson: the three products and the three jobs, Get data and the two connectors, Load against Transform Data, automatic type detection and the locale, the Applied Steps as a recorded recipe, reading M, why the order of steps changes the answer, Merge Queries and the Left Anti check, query folding, relationships and the star, choosing a visual, default summarisation, measures against calculated columns and dragged fields, filter context, the eight quiet ways to be wrong, and what travels inside a <code>.pbix</code>. Allow about 40 minutes. You do not need Power BI installed: every value you are asked for can be worked out from the steps, the formulas and the tables shown, and every figure quoted from the cafeteria file (771 → 748 lines, 611 orders, 8,062.00 …) was recomputed with pandas on the real data. The hint, the answer and the explanation stay hidden until you ask for them: try first, then open them. A revealed answer is not counted, and the Review links under each question lead back to the part of the lesson it tests.",
      ar: "24 سؤالًا على الدرس كله: المنتجات الثلاثة والمهام الثلاث، وGet data والموصِّلان، وLoad مقابل Transform Data، والكشف التلقائي عن الأنواع واللغة الإقليمية، والخطوات المطبَّقة وصفةً مسجّلة، وقراءة M، ولماذا يغيّر ترتيب الخطوات الجواب، وMerge Queries وفحص Left Anti، وطيّ الاستعلام، والعلاقات والمخطط النجمي، واختيار العنصر المرئي، والتلخيص الافتراضي، والمقاييس مقابل الأعمدة المحسوبة والحقول المسحوبة، وسياق المرشِّح، والطرق الثماني الهادئة للخطأ، وما يسافر داخل ملف <code>.pbix</code>. خصّص نحو 40 دقيقة. ولا تحتاج إلى Power BI مثبَّتًا: كل قيمة مطلوبة منك يمكن استخراجها من الخطوات والصيغ والجداول المعروضة، وكل رقم مقتبس من ملف الكافتيريا (771 ← 748 سطرًا، و611 طلبًا، و8,062.00 …) أُعيد حسابه بـ pandas على البيانات الحقيقية. التلميح والجواب والشرح مخفية حتى تطلبها: جرّب أولًا ثم افتحها. والجواب الذي يُظهَر لا يُحتسب، وروابط المراجعة تحت كل سؤال تعيدك إلى الجزء من الدرس الذي يختبره."
    },
    questions: [

      /* ---------------------------------------------------------- 01 */
      {
        id: "p1l5q01", type: "tf", level: "easy",
        topics: ["p1-powerbi-parts"],
        q: {
          en: "Your university lab PC has Power BI Desktop installed, you have no Power BI account, and the university will not give you one. Claim: <em>you therefore cannot do the work of this lesson</em> — loading the cafeteria file, recording the cleaning steps, relating <code>Orders</code> to <code>Menu</code> and drawing the report all need an account, because Power BI is a cloud product. True or false?",
          ar: "في حاسوب مختبر جامعتك Power BI Desktop مثبَّت، وليس لديك حساب Power BI ولن تمنحك الجامعة واحدًا. والادعاء: <em>إذن لا تستطيع أن تنجز عمل هذا الدرس</em> — فتحميل ملف الكافتيريا وتسجيل خطوات التنظيف وربط <code>Orders</code> بـ <code>Menu</code> ورسم التقرير كلها تحتاج حسابًا، لأن Power BI منتج سحابي. صح أم خطأ؟"
        },
        truth: false,
        hint: {
          en: "Split the family into its three products, then ask which one of them asks you to sign in, and what it is for.",
          ar: "افصل العائلة إلى منتجاتها الثلاثة، ثم اسأل أيّها يطلب منك تسجيل الدخول، ولماذا."
        },
        explain: {
          en: "False. Power BI Desktop is a Windows application: it connects, transforms, models and draws, and saves one <code>.pbix</code> file, all without signing in — everything in Concepts 1–7 works offline on your own PC. The account belongs to the Power BI <em>Service</em>, the website where a published report lives so that other readers can open it, where you schedule a refresh and share; sharing may need a licence on top of the account. The claim is tempting because “Power BI” names a family and the Service is the part people see in a browser. You build in Desktop and only ever <em>read</em> in the Service and in Mobile. What this lesson really needs is Windows: that, not the account, is what stops a student on macOS.",
          ar: "خطأ. Power BI Desktop تطبيق ويندوز: يتصل ويحوّل وينمذج ويرسم ويحفظ ملفًّا واحدًا بامتداد <code>.pbix</code>، وكل ذلك دون تسجيل دخول — فكل ما في المفاهيم 1–7 يعمل دون اتصال على حاسوبك. أما الحساب فينتمي إلى <em>خدمة Power BI (Service)</em>، وهي الموقع الذي يعيش فيه التقرير المنشور ليفتحه قراء آخرون، وفيه تجدول التحديث وتشارك؛ وقد تحتاج المشاركة إلى ترخيص فوق الحساب. والادعاء مغرٍ لأن «Power BI» اسم عائلة، والخدمة هي الجزء الذي يراه الناس في المتصفح. أنت تبني في Desktop، ولا <em>تقرأ</em> إلا في الخدمة وفي Mobile. وما يحتاجه هذا الدرس فعلًا هو ويندوز: هذا هو ما يوقف طالبًا على macOS، لا الحساب."
        }
      },

      /* ---------------------------------------------------------- 02 */
      {
        id: "p1l5q02", type: "match", level: "easy",
        topics: ["p1-powerbi-three-jobs", "p1-powerbi-parts", "p1-pbi-ai-features"],
        q: {
          en: "Match each task with the place in the Power BI family where it is done.",
          ar: "اربط كل مهمة بالموضع الذي تُنجز فيه في عائلة Power BI."
        },
        leftHead: { en: "The task", ar: "المهمة" },
        rightHead: { en: "Where it is done", ar: "أين تُنجز" },
        pairs: [
          {
            l: {
              en: "Remove the 16 exactly-duplicated order lines once, so that every visual and every measure sees the same rows.",
              ar: "احذف الأسطر الـ 16 المكرَّرة تمامًا مرة واحدة، فترى كل عنصر مرئي وكل مقياس الصفوف نفسها."
            },
            r: {
              en: "Job 1, connect and transform — the Power Query Editor, recorded as a step in M",
              ar: "المهمة 1، الاتصال والتحويل — محرر Power Query، مسجّلة خطوةً بلغة M"
            }
          },
          {
            l: {
              en: "Say that one <code>Menu</code> row belongs to many <code>Orders</code> lines, and define <code>Total Revenue</code>.",
              ar: "قل إن صفًّا واحدًا في <code>Menu</code> يخص أسطرًا كثيرة في <code>Orders</code>، وعرّف <code>Total Revenue</code>."
            },
            r: {
              en: "Job 2, model — Model view and the formula bar, written in DAX",
              ar: "المهمة 2، النمذجة — عرض النموذج وشريط الصيغة، بلغة DAX"
            }
          },
          {
            l: {
              en: "Keep only the three highest-earning items on a bar chart.",
              ar: "أبقِ الأصناف الثلاثة الأعلى دخلًا وحدها في مخطط شريطي."
            },
            r: {
              en: "Job 3, visualise — Report view, the Filters pane of that visual",
              ar: "المهمة 3، التصوير — عرض التقرير، ولوحة المرشِّحات لذلك العنصر"
            }
          },
          {
            l: {
              en: "Let a colleague who owns no Windows PC open the finished page in a browser.",
              ar: "دع زميلة لا تملك حاسوب ويندوز تفتح الصفحة المنتهية في متصفح."
            },
            r: {
              en: "Publish to the Power BI Service — the one step in the lesson that needs an account",
              ar: "النشر إلى خدمة Power BI — الخطوة الوحيدة في الدرس التي تحتاج حسابًا"
            }
          },
          {
            l: {
              en: "Type a question in words and have a chart drawn from it.",
              ar: "اكتب سؤالًا بالكلمات فيُرسم منه مخطط."
            },
            r: {
              en: "The Q&amp;A visual — optional, and dependent on your version, region and licence",
              ar: "عنصر Q&amp;A المرئي — اختياري، ويعتمد على إصدارك ومنطقتك وترخيصك"
            }
          }
        ],
        hint: {
          en: "Three of the five are the three jobs, in the order they run. For the other two, ask what the step needs that your own PC cannot give it.",
          ar: "ثلاث من الخمس هي المهام الثلاث بترتيب تنفيذها. وللاثنتين الأخريين اسأل: ما الذي تحتاجه الخطوة ولا يستطيع حاسوبك أن يمنحه؟"
        },
        explain: {
          en: "The three jobs run in a fixed order, and the rule “fix a problem at the earliest job that can fix it” follows from it: a duplicate removed in Power Query is gone for every measure and every visual, while a duplicate hidden by one chart’s filter is still there for the next chart. Relationships and measures are modelling, written in DAX; a Top N filter is a property of one visual, in Report view. Publishing is the only step in the lesson that needs an account — normally a work or school one — and the Q&amp;A visual is one of Power BI’s optional AI features: it works only as well as your table and column names, so treat its answer as a hypothesis to check against a total you already trust.",
          ar: "تجري المهام الثلاث بترتيب ثابت، ومنه تنتج القاعدة «أصلح المشكلة في أبكر مهمة تستطيع إصلاحها»: فالسطر المكرَّر المحذوف في Power Query يغيب عن كل مقياس وكل عنصر مرئي، أما المخفيّ بمرشِّح مخطط واحد فيبقى موجودًا للمخطط التالي. والعلاقات والمقاييس نمذجة تُكتب بـ DAX؛ ومرشِّح Top N خصيصة لعنصر مرئي واحد في عرض التقرير. والنشر هو الخطوة الوحيدة في الدرس التي تحتاج حسابًا — عادةً حساب عمل أو مدرسة — وعنصر Q&amp;A المرئي واحد من ميزات الذكاء الاصطناعي الاختيارية في Power BI: لا يعمل أفضل من أسماء جداولك وأعمدتك، فعامل جوابه فرضيةً تتحقق منها بإجمالي تثق به أصلًا."
        }
      },

      /* ---------------------------------------------------------- 03 */
      {
        id: "p1l5q03", type: "contrast", level: "medium",
        topics: ["p1-applied-steps", "p1-xl-duplicates"],
        q: {
          en: "The same cleaning of the same 771 lines, done in Excel (Lesson 4) and recorded as Power Query Applied Steps. Place each statement under one, the other, or both.",
          ar: "التنظيف نفسه للأسطر الـ 771 نفسها، منجَزًا في Excel (الدرس 4) ومسجَّلًا خطوات مطبَّقة في Power Query. ضع كل عبارة تحت واحدة منهما أو تحت كلتيهما."
        },
        concepts: [
          { en: "Excel: cells and clicks", ar: "Excel: خلايا ونقرات" },
          { en: "Power Query: Applied Steps", ar: "Power Query: الخطوات المطبَّقة" }
        ],
        rows: [
          {
            s: {
              en: "Remove Duplicates takes the rows out of the sheet you are working in, and leaves no list of what went",
              ar: "يُخرج Remove Duplicates الصفوف من الورقة التي تعمل فيها، ولا يترك قائمة بما ذهب"
            },
            a: 0
          },
          {
            s: {
              en: "The cleaning is a numbered, readable list that a colleague can follow, change or delete a line of",
              ar: "التنظيف قائمة مرقَّمة مقروءة يستطيع زميل أن يتبعها أو يغيّرها أو يحذف سطرًا منها"
            },
            a: 1
          },
          {
            s: {
              en: "Re-running the whole cleaning on next month’s file is one button",
              ar: "إعادة تشغيل التنظيف كله على ملف الشهر القادم زرّ واحد"
            },
            a: 1
          },
          {
            s: {
              en: "A step in the wrong order can change the answer with no error message at all",
              ar: "خطوة في الترتيب الخطأ قد تغيّر الجواب دون أي رسالة خطأ"
            },
            a: 2
          },
          {
            s: {
              en: "The formulas that produce the answer live in the cells of a sheet, beside the data",
              ar: "الصيغ التي تنتج الجواب تعيش في خلايا ورقة، بجانب البيانات"
            },
            a: 0
          },
          {
            s: {
              en: "The threshold <code>&lt; 50</code> on the price is still a number a human picked after looking at the month",
              ar: "العتبة <code>&lt; 50</code> على السعر تبقى رقمًا اختاره إنسان بعد أن نظر إلى الشهر"
            },
            a: 2
          },
          {
            s: {
              en: "You can click an earlier point in the cleaning and see the table exactly as it was then",
              ar: "تستطيع أن تنقر نقطة أسبق في التنظيف فترى الجدول كما كان تمامًا في تلك اللحظة"
            },
            a: 1
          }
        ],
        hint: {
          en: "Separate <em>where the work is written down</em> from <em>whether the work is right</em>. A recorded recipe changes the first and not the second.",
          ar: "افصل <em>أين يُكتب العمل</em> عن <em>هل العمل صحيح</em>. الوصفة المسجّلة تغيّر الأولى لا الثانية."
        },
        explain: {
          en: "Excel’s cleaning is destructive and silent: Remove Duplicates deletes rows in the only copy you have, the formulas live in cells beside the data, and next month you repeat every click. Applied Steps are a readable list — each step takes the table the step before produced — the source CSV is never modified, you can select an older step and inspect the table as it was then, and Refresh replays the lot. What the recording does <em>not</em> buy you is correctness: a step in the wrong order still changes the answer without a word (an Index column before Remove Duplicates leaves 764 lines and 8,237.00), and the hand-picked <code>&lt; 50</code> is a judgement in both tools. The tempting mistake is to read “repeatable” as “right”; it means auditable. Version 3 of the query says out loud that the threshold was chosen after seeing the data.",
          ar: "تنظيف Excel مُدمِّر وصامت: يحذف Remove Duplicates صفوفًا من النسخة الوحيدة التي تملكها، والصيغ تعيش في خلايا بجانب البيانات، وفي الشهر القادم تعيد كل نقرة. أما الخطوات المطبَّقة فقائمة مقروءة — تأخذ كل خطوة الجدول الذي أنتجته التي قبلها — ولا يُعدَّل ملف CSV المصدر أبدًا، وتستطيع أن تختار خطوة أقدم وتتفحّص الجدول كما كان، ويعيد Refresh تشغيل الكل. وما لا يمنحه التسجيل هو الصحة: فخطوة في الترتيب الخطأ تغيّر الجواب دون كلمة (عمود فهرس قبل Remove Duplicates يترك 764 سطرًا و8,237.00)، والعتبة <code>&lt; 50</code> المختارة يدويًّا حكمٌ في الأداتين. والخطأ المغري أن تقرأ «قابل للتكرار» بمعنى «صحيح»؛ إنما معناه «قابل للتدقيق». والنسخة 3 من الاستعلام تقول صراحةً إن العتبة اختيرت بعد رؤية البيانات."
        }
      },

      /* ---------------------------------------------------------- 04 */
      {
        id: "p1l5q04", type: "mcq", level: "easy",
        topics: ["p1-load-vs-transform"],
        q: {
          en: "The preview window of the <em>Text/CSV</em> connector ends with two buttons, <em>Load</em> and <em>Transform Data</em>. Which statement about the choice is correct?",
          ar: "تنتهي نافذة المعاينة في موصِّل <em>Text/CSV</em> بزرَّين: <em>Load</em> و<em>Transform Data</em>. أي عبارة عن هذا الاختيار صحيحة؟"
        },
        options: [
          {
            en: "Load skips the automatic type detection; Transform Data is the step that applies it, which is why the lesson prefers Transform Data for an unknown file.",
            ar: "يتخطى Load الكشف التلقائي عن الأنواع، وTransform Data هو الخطوة التي تطبّقه، ولهذا يفضّل الدرس Transform Data لملف غير معروف."
          },
          {
            en: "Clicking Load is irreversible: the table is now in the model and the Power Query Editor cannot be opened for that query again.",
            ar: "النقر على Load نهائي: فالجدول الآن في النموذج ولا يمكن فتح محرر Power Query لذلك الاستعلام مرة أخرى."
          },
          {
            en: "Both bring in the table exactly as the connector read it; Transform Data only shows it to you before anything is drawn from it.",
            ar: "كلاهما يُدخل الجدول كما قرأه الموصِّل تمامًا؛ وTransform Data يعرضه عليك فقط قبل أن يُرسم منه شيء."
          },
          {
            en: "Transform Data works on a copy while Load works on the file itself, so a careless Load can change <code>cafeteria_orders.csv</code> on your disk.",
            ar: "يعمل Transform Data على نسخة بينما يعمل Load على الملف نفسه، فقد يغيّر Load متهاون ملف <code>cafeteria_orders.csv</code> على قرصك."
          }
        ],
        answer: 2,
        hint: {
          en: "Ask what each button actually does to the data, and then what it does to <em>you</em> — which one leaves a card on screen before anybody has looked at a type?",
          ar: "اسأل ما يفعله كل زر بالبيانات فعلًا، ثم ما يفعله <em>بك</em>: أيّهما يترك بطاقة على الشاشة قبل أن ينظر أحد إلى نوع عمود؟"
        },
        explain: {
          en: "Load copies the data as the connector read it into the model and takes you straight to the canvas; Transform Data opens the Power Query Editor first, so you see the table before anything is drawn from it. Neither changes the file on disk — the steps only describe how to <em>read</em> it — and neither skips type detection: the <em>Changed Type</em> step is added right after loading in both cases, which is exactly why you want to look at it. Load is not irreversible either: Home → <em>Transform data</em> reopens the editor whenever you like. The real cost of Load is psychological, and that is the point of the rule: the fields are already in the pane, dragging them is effortless, and a card reading 771 looks like a result. For any file you did not create yourself, choose Transform Data.",
          ar: "ينسخ Load البيانات إلى النموذج كما قرأها الموصِّل وينقلك مباشرةً إلى اللوحة؛ أما Transform Data فيفتح محرر Power Query أولًا فترى الجدول قبل أن يُرسم منه شيء. ولا يغيّر أيّهما الملف على القرص — فالخطوات تصف كيف <em>يُقرأ</em> فقط — ولا يتخطى أيّهما الكشف عن الأنواع: فخطوة <em>Changed Type</em> تُضاف مباشرة بعد التحميل في الحالتين، ولهذا بالضبط تريد أن تنظر إليها. وLoad ليس نهائيًّا كذلك: فـ Home ← <em>Transform data</em> يعيد فتح المحرر وقتما تشاء. أما ثمن Load الحقيقي فنفسي، وهو مقصد القاعدة: الحقول في اللوحة أصلًا، وسحبها لا يكلّف شيئًا، وبطاقة تعرض 771 تبدو نتيجة. فلأي ملف لم تصنعه بنفسك اختر Transform Data."
        }
      },

      /* ---------------------------------------------------------- 05 */
      {
        id: "p1l5q05", type: "multi", level: "medium",
        topics: ["p1-pbi-get-data", "p1-type-detection"],
        q: {
          en: "You open <code>cafeteria_orders.csv</code> with <em>Text/CSV</em> and leave <em>Data Type Detection</em> at its default. Which statements are true? Choose all that apply.",
          ar: "تفتح <code>cafeteria_orders.csv</code> بـ <em>Text/CSV</em> وتترك <em>Data Type Detection</em> على إعداده الافتراضي. أي العبارات صحيحة؟ اختر كل ما ينطبق."
        },
        options: [
          {
            en: "Detection reads a <em>sample</em> — by default the first 200 rows of a CSV — and fixes each column’s type once.",
            ar: "يقرأ الكشف <em>عيّنة</em> — افتراضيًّا أول 200 صف في ملف CSV — ويثبّت نوع كل عمود مرة واحدة."
          },
          {
            en: "<code>unit_price</code> arrives as text, because the <code>n/a</code> on row 5 is inside that sample.",
            ar: "يصل <code>unit_price</code> نصًّا، لأن <code>n/a</code> في الصف 5 داخل تلك العيّنة."
          },
          {
            en: "Power Query drops the <code>n/a</code> line while detecting, so the table shows 770 rows instead of 771.",
            ar: "تحذف Power Query سطر <code>n/a</code> أثناء الكشف، فيعرض الجدول 770 صفًّا بدل 771."
          },
          {
            en: "Had the same <code>n/a</code> sat on row 5,000, the column would have been typed as a number and that one cell would have become an <em>Error</em> value.",
            ar: "لو كان <code>n/a</code> نفسه في الصف 5,000 لضُبط العمود عددًا ولأصبحت تلك الخلية وحدها قيمة <em>خطأ (Error)</em>."
          },
          {
            en: "Opening the workbook <code>cafeteria_orders.xlsx</code> instead removes the problem, because a workbook stores a type for every cell.",
            ar: "فتح المصنّف <code>cafeteria_orders.xlsx</code> بدلًا من ذلك يُزيل المشكلة، لأن المصنّف يخزّن نوعًا لكل خلية."
          }
        ],
        answer: [0, 1, 3],
        hint: {
          en: "Detection decides a <em>type</em>; it never decides which rows to keep. And ask what a workbook can store about a column that holds numbers <em>and</em> one word.",
          ar: "يقرر الكشف <em>نوعًا</em>؛ ولا يقرر أبدًا أي الصفوف يُبقي. ثم اسأل: ما الذي يستطيع مصنّف أن يخزّنه عن عمود يحوي أعدادًا <em>وكلمة</em> واحدة؟"
        },
        explain: {
          en: "Detection looks at a sample — the first 200 rows of an unstructured source by default, and the menu lets you choose the whole dataset or no detection at all — and decides once. In this file the <code>n/a</code> happens to sit on row 5, inside any sample, so <code>unit_price</code> is typed as text: it cannot be summed and cannot be compared with 50. Put the same value on row 5,000 and the column becomes a number with one Error cell, which surfaces in the preview if you look and at refresh time if you do not — the trap the lesson calls “detection is a draft, not a decision”. Nothing is ever dropped: the table has 771 rows whichever way the type goes, which is why the third statement is tempting and wrong. And the workbook is not a cure: it does store a type per cell (<code>order_time</code> arrives as a real date-time, <code>qty</code> as a number), but <code>unit_price</code> holds numbers <em>and</em> the text <code>n/a</code>, so no single type fits the column and the mess is still in the file.",
          ar: "ينظر الكشف إلى عيّنة — افتراضيًّا أول 200 صف في مصدر غير مهيكل، وتتيح القائمة اختيار المجموعة الكاملة أو عدم الكشف إطلاقًا — ويقرر مرة واحدة. وفي هذا الملف تقع <code>n/a</code> في الصف 5، داخل أي عيّنة، فيُضبط <code>unit_price</code> نصًّا: لا يُجمع ولا يُقارن بـ 50. وضع القيمة نفسها في الصف 5,000 فيصبح العمود عددًا فيه خلية خطأ واحدة، تظهر في المعاينة إن نظرت ووقت التحديث إن لم تنظر — وهو الفخ الذي يسمّيه الدرس «الكشف مسودة لا قرار». ولا يُحذف شيء أبدًا: ففي الجدول 771 صفًّا أيًّا كان النوع، ولهذا تكون العبارة الثالثة مغرية وخاطئة. وليس المصنّف علاجًا: فهو يخزّن نوعًا لكل خلية (يصل <code>order_time</code> تاريخًا ووقتًا حقيقيًّا و<code>qty</code> عددًا)، لكن <code>unit_price</code> يحوي أعدادًا <em>والنص</em> <code>n/a</code>، فلا يناسب العمود نوع واحد وتبقى الفوضى في الملف."
        }
      },

      /* ---------------------------------------------------------- 06 */
      {
        id: "p1l5q06", type: "fill", level: "easy",
        topics: ["p1-locale", "p1-m-code"],
        lang: "m",
        q: {
          en: "Complete the <code>Typed</code> step so that <code>unit_price</code> becomes a decimal number, read with the culture in which a dot is the decimal mark.",
          ar: "أكمل خطوة <code>Typed</code> حتى يصبح <code>unit_price</code> عددًا عشريًّا، مقروءًا بالثقافة التي تكون فيها النقطة الفاصلة العشرية."
        },
        code: code(
          "    Typed = Table.TransformColumnTypes(Promoted,",
          '        {{"order_id", Int64.Type}, {"order_time", type datetime},',
          '         {"item", type text}, {"category", type text},',
          '         {"qty", Int64.Type}, {"unit_price", type ____1____},',
          '         {"payment", type text}, {"customer_type", type text}},',
          '        "____2____"),'
        ),
        blanks: [
          { accept: ["number"], label: { en: "the type of <code>unit_price</code>", ar: "نوع <code>unit_price</code>" } },
          { accept: ["en-US", "en-us", "EN-US"], label: { en: "the culture name", ar: "اسم الثقافة" } }
        ],
        hint: {
          en: "One blank names a <em>kind</em> of number — whole or decimal. The other names whose idea of a decimal point to use; the lesson chose English (United States).",
          ar: "خانة تسمّي <em>نوع</em> العدد — صحيح أم عشري. والأخرى تسمّي صاحب فكرة الفاصلة العشرية التي ستُستعمل؛ وقد اختار الدرس الإنجليزية (الولايات المتحدة)."
        },
        explain: {
          en: "<code>type number</code> is a decimal number; <code>Int64.Type</code> is a whole number and would throw away the <code>.5</code> of a Date Cookie. The third argument of <code>Table.TransformColumnTypes</code> is a culture name, which <em>Transform → Data Type → Using Locale…</em> with English (United States) records as <code>\"en-US\"</code>. Saying the locale out loud is what makes the answer independent of the computer that opens the file: on a machine whose locale uses a decimal comma, a plain conversion can read the dot of <code>12.0</code> as a thousands separator and give 120, and <code>3.5</code> becomes 35. In pandas the same mistake is <code>read_csv(…, thousands=\".\", decimal=\",\")</code>, and every price in this file comes out ten times too large, with no error anywhere. This step is also what turns the text <code>n/a</code> into an Error value, which is why Replace Errors has to come after it.",
          ar: "<code>type number</code> عدد عشري؛ أما <code>Int64.Type</code> فعدد صحيح يرمي <code>.5</code> من كعكة التمر. والوسيط الثالث لـ <code>Table.TransformColumnTypes</code> اسم ثقافة، يسجّله <em>Transform ← Data Type ← Using Locale…</em> مع الإنجليزية (الولايات المتحدة) على هيئة <code>\"en-US\"</code>. وذِكر اللغة الإقليمية صراحةً هو ما يجعل الجواب مستقلًّا عن الحاسوب الذي يفتح الملف: فعلى جهاز لغته الإقليمية تستعمل الفاصلة العشرية قد يقرأ التحويل العادي نقطة <code>12.0</code> فاصلَ آلاف فيعطي 120، ويصبح <code>3.5</code> العدد 35. وفي pandas الخطأ نفسه هو <code>read_csv(…, thousands=\".\", decimal=\",\")</code>، فيخرج كل سعر في هذا الملف أكبر بعشر مرات دون أي خطأ. وهذه الخطوة هي أيضًا ما يحوّل النص <code>n/a</code> إلى قيمة خطأ، ولهذا يجب أن تأتي Replace Errors بعدها."
        }
      },

      /* ---------------------------------------------------------- 07 */
      {
        id: "p1l5q07", type: "output", level: "easy",
        topics: ["p1-applied-steps", "p1-pq-cleaning-steps"],
        lang: "m",
        q: {
          en: "The <code>Orders</code> query of Version 3 is open in the Power Query Editor. You click each step in Applied Steps and read the row count the editor reports for the whole file. Type the counts, and in the last box the sum of <code>line_total</code> to two decimals.",
          ar: "استعلام <code>Orders</code> للنسخة 3 مفتوح في محرر Power Query. تنقر كل خطوة في الخطوات المطبَّقة وتقرأ عدد الصفوف الذي يذكره المحرر للملف كله. اكتب الأعداد، وفي الخانة الأخيرة مجموع <code>line_total</code> بمنزلتين عشريتين."
        },
        code: code(
          "    Promoted  = Table.PromoteHeaders(Source, [PromoteAllScalars = true]),",
          '    Typed     = Table.TransformColumnTypes(Promoted, {...}, "en-US"),',
          '    NoErrors  = Table.ReplaceErrorValues(Typed, {{"unit_price", null}}),',
          '    Tidy      = Table.TransformColumns(NoErrors,',
          '                    {{"item", each Text.Proper(Text.Trim(Text.Clean(_))), type text}}),',
          "    Valid     = Table.SelectRows(Tidy,",
          "                    each [qty] > 0 and [unit_price] <> null and [unit_price] < 50),",
          "    Unique    = Table.Distinct(Valid),",
          '    WithTotal = Table.AddColumn(Unique, "line_total", each [qty] * [unit_price], type number)'
        ),
        blanks: [
          { accept: ["771"], label: { en: "rows after <code>Promoted</code>", ar: "الصفوف بعد <code>Promoted</code>" } },
          { accept: ["771"], label: { en: "rows after <code>NoErrors</code>", ar: "الصفوف بعد <code>NoErrors</code>" } },
          { accept: ["764"], label: { en: "rows after <code>Valid</code>", ar: "الصفوف بعد <code>Valid</code>" } },
          { accept: ["748"], label: { en: "rows after <code>Unique</code>", ar: "الصفوف بعد <code>Unique</code>" } },
          { accept: ["8062.00", "8062", "8062.0", "8,062.00"], label: { en: "the sum of <code>line_total</code>", ar: "مجموع <code>line_total</code>" } }
        ],
        hint: {
          en: "Ask of every step whether it can remove a row <em>at all</em>. Replacing an error and trimming text change cells, not the number of lines.",
          ar: "اسأل عن كل خطوة: هل تستطيع <em>أصلًا</em> أن تحذف صفًّا؟ فاستبدال خطأ وتقليم نص يغيّران الخلايا لا عدد الأسطر."
        },
        explain: {
          en: "Only two of these steps change the row count. <code>Table.SelectRows</code> drops 7 lines: the five refunds with <code>qty = -1</code>, the Shawarma Wrap typed 120.0 and the line whose price was <code>n/a</code> and is now null — 771 becomes 764. <code>Table.Distinct</code> then removes the 16 whole-row duplicates, 764 becomes 748, and those 748 <code>line_total</code> values add up to 8,062.00, the number every tool in this chapter has to reproduce. Replace Errors and the trim/clean/capitalise step repair cells and remove nothing, so the count stays at 771 through them; promoting the header turns the first of the 772 text lines into column names. Reading the count on every step is the first of the lesson’s three reconciliations: a step that loses rows you did not expect is how you find the pitfall.",
          ar: "خطوتان فقط من هذه الخطوات تغيّران عدد الصفوف. تحذف <code>Table.SelectRows</code> سبعة أسطر: الاستردادات الخمسة بـ <code>qty = -1</code>، والشاورما المكتوبة 120.0، والسطر الذي كان سعره <code>n/a</code> وأصبح null — فتصبح 771 العدد 764. ثم تحذف <code>Table.Distinct</code> المكرَّرات الـ 16 الكاملة الصف، فتصبح 764 العدد 748، وتجمع قيم <code>line_total</code> الـ 748 إلى 8,062.00، وهو الرقم الذي على كل أداة في هذا الفصل أن تعيد إنتاجه. أما Replace Errors وخطوة التقليم والتنظيف والتكبير فتُصلح خلايا ولا تحذف شيئًا، فيبقى العدد 771 عبرهما؛ وترقية العنوان تحوّل أول الأسطر النصية الـ 772 إلى أسماء أعمدة. وقراءة العدد عند كل خطوة هي أولى المطابقات الثلاث في الدرس: فالخطوة التي تُفقِد صفوفًا لم تتوقعها هي الطريق إلى اكتشاف المطبّ."
        }
      },

      /* ---------------------------------------------------------- 08 */
      {
        id: "p1l5q08", type: "ordercode", level: "medium",
        topics: ["p1-pq-cleaning-steps", "p1-step-order"],
        lang: "m",
        q: {
          en: "The <code>Source</code> step is already in place. Put the other seven steps of the Version 3 query in the order that works — each step names the step it reads, and the comments say what each one needs from the ones before it.",
          ar: "خطوة <code>Source</code> موجودة أصلًا. رتّب خطوات النسخة 3 السبع الأخرى بالترتيب الذي ينجح — تسمّي كل خطوة الخطوة التي تقرأها، وتقول التعليقات ما تحتاجه كل واحدة من التي قبلها."
        },
        items: [
          { code: "// the first row becomes the column names\nPromoted = Table.PromoteHeaders(Source, [PromoteAllScalars = true])" },
          { code: '// types first: every later step compares or multiplies numbers\nTyped = Table.TransformColumnTypes(Promoted, {{"unit_price", type number}, ...}, "en-US")' },
          { code: '// n/a became an Error one step ago: replace it after that step, never before\nNoErrors = Table.ReplaceErrorValues(Typed, {{"unit_price", null}})' },
          { code: '// one spelling per item, on both sides of the later join with Menu\nTidy = Table.TransformColumns(NoErrors, {{"item", each Text.Proper(Text.Trim(Text.Clean(_))), type text}})' },
          { code: "// the lines that must not be counted; null is tested explicitly\nValid = Table.SelectRows(Tidy, each [qty] > 0 and [unit_price] <> null and [unit_price] < 50)" },
          { code: "// whole-row duplicates, before any column that makes rows unique\nUnique = Table.Distinct(Valid)" },
          { code: '// the revenue column, computed row by row, from clean numbers\nWithTotal = Table.AddColumn(Unique, "line_total", each [qty] * [unit_price], type number)' }
        ],
        hint: {
          en: "Read the name inside each step’s first argument: it tells you which step must already exist. Then ask which step <em>creates</em> the Error that another step replaces.",
          ar: "اقرأ الاسم داخل الوسيط الأول لكل خطوة: يقول لك أي خطوة يجب أن تكون موجودة أصلًا. ثم اسأل أي خطوة <em>تُنشئ</em> الخطأ الذي تستبدله خطوة أخرى."
        },
        explain: {
          en: "Every step takes the previous step’s name as its input, so the chain of names <em>is</em> the order: Promoted → Typed → NoErrors → Tidy → Valid → Unique → WithTotal. Three of those dependencies are real and not cosmetic. Types come before any comparison, because <code>[unit_price] &lt; 50</code> on a text column raises an error. Replace Errors comes <em>after</em> the type step, because the Error does not exist until the type is applied — put it first and it replaces nothing, with the message “0 replaced”. And the custom column comes last: it needs clean numbers, and a new column is the classic way to spoil Remove Duplicates (an Index column makes every line unique, so nothing is removed and 175.00 of duplicated sales stay in — 764 lines and 8,237.00). Two of the steps are freer than they look: the trim/capitalise may sit anywhere after Typed, and swapping <code>Valid</code> and <code>Unique</code> still gives 748 lines and 8,062.00, because no removed line is a duplicate of another.",
          ar: "تأخذ كل خطوة اسم الخطوة السابقة وسيطًا لها، فسلسلة الأسماء <em>هي</em> الترتيب: Promoted ← Typed ← NoErrors ← Tidy ← Valid ← Unique ← WithTotal. وثلاث من هذه التبعيات حقيقية لا شكلية. فالأنواع تأتي قبل أي مقارنة، لأن <code>[unit_price] &lt; 50</code> على عمود نصي يرفع خطأً. وتأتي Replace Errors <em>بعد</em> خطوة النوع، لأن الخطأ لا يوجد قبل تطبيق النوع — فإن قدّمتها لم تستبدل شيئًا، وأظهرت «0 replaced». ويأتي العمود المخصص أخيرًا: فهو يحتاج أعدادًا نظيفة، والعمود الجديد هو الطريقة الكلاسيكية لإفساد Remove Duplicates (عمود الفهرس يجعل كل سطر فريدًا فلا يُحذف شيء وتبقى 175.00 من المبيعات المكرَّرة — 764 سطرًا و8,237.00). وخطوتان أحرّ مما تبدو: التقليم والتكبير يصلح في أي مكان بعد Typed، وتبديل <code>Valid</code> و<code>Unique</code> يبقي 748 سطرًا و8,062.00، لأن ما من سطر محذوف مكرَّرٌ لآخر."
        }
      },

      /* ---------------------------------------------------------- 09 */
      {
        id: "p1l5q09", type: "error", level: "medium",
        topics: ["p1-step-order"],
        lang: "text",
        q: {
          en: "These are the Applied Steps of somebody else’s <code>Orders</code> query, in the order the editor lists them. The query runs without a single error message and returns 764 lines and 8,237.00 instead of 748 and 8,062.00. Click the step that is in the wrong place.",
          ar: "هذه الخطوات المطبَّقة في استعلام <code>Orders</code> لشخص آخر، بالترتيب الذي يسردها المحرر. يعمل الاستعلام دون أي رسالة خطأ ويعيد 764 سطرًا و8,237.00 بدل 748 و8,062.00. انقر الخطوة التي في المكان الخطأ."
        },
        code: code(
          "Source",
          "Promoted Headers",
          "Changed Type           unit_price -> number, using locale en-US",
          "Replaced Errors        unit_price: Error -> null",
          "Added Index            a running row number, 1..n",
          "Removed Duplicates     all columns selected",
          "Trimmed / Capitalized  item",
          "Filtered Rows          qty > 0, unit_price <> null, unit_price < 50",
          "Added Custom Column    line_total = qty * unit_price"
        ),
        answer: 5,
        solution: {
          code: code(
            "Source",
            "Promoted Headers",
            "Changed Type           unit_price -> number, using locale en-US",
            "Replaced Errors        unit_price: Error -> null",
            "Trimmed / Capitalized  item",
            "Filtered Rows          qty > 0, unit_price <> null, unit_price < 50     771 -> 764",
            "Removed Duplicates     all columns selected                            764 -> 748",
            "Added Index            a running row number, 1..n   (now harmless)",
            "Added Custom Column    line_total = qty * unit_price",
            "",
            "-> 748 lines, revenue 8,062.00"
          ),
          en: "Move the index after Remove Duplicates — or delete it, since nothing in the report uses it. The 16 duplicates then go and the total is 8,062.00 again.",
          ar: "انقل الفهرس بعد Remove Duplicates — أو احذفه، فلا شيء في التقرير يستعمله. فتذهب المكرَّرات الـ 16 ويعود الإجمالي 8,062.00."
        },
        hint: {
          en: "Only one of the nine steps can stop another step from doing anything at all. Ask exactly what Remove Duplicates compares.",
          ar: "خطوة واحدة فقط من التسع تستطيع أن تمنع خطوة أخرى من أن تفعل أي شيء. اسأل بدقة: ما الذي يقارنه Remove Duplicates؟"
        },
        explain: {
          en: "<em>Added Index</em> gives every line a different number, so <em>Removed Duplicates</em> — which compares all the selected columns — finds no two identical lines and removes none. Nothing fails, no message appears, and the 16 duplicates keep 175.00 of phantom revenue in the total: 764 lines and 8,237.00. The other steps that look out of place are the trap, because they are safe here. <em>Trimmed / Capitalized</em> after Remove Duplicates still leaves 755 lines, since no duplicate pair differs only in spelling; and <em>Filtered Rows</em> may sit on either side of Remove Duplicates — 748 either way — now that the type step has already run. A row number is a column that makes every row unique, so it belongs after the duplicates are gone, if you need it at all.",
          ar: "تمنح <em>Added Index</em> كل سطر رقمًا مختلفًا، فلا تجد <em>Removed Duplicates</em> — التي تقارن كل الأعمدة المحدَّدة — سطرين متطابقين فلا تحذف أيًّا منها. ولا يفشل شيء ولا تظهر رسالة، وتُبقي المكرَّرات الـ 16 مبلغ 175.00 من الإيراد الوهمي في الإجمالي: 764 سطرًا و8,237.00. والخطوات الأخرى التي تبدو في غير مكانها هي الفخ، لأنها آمنة هنا. فـ <em>Trimmed / Capitalized</em> بعد Removed Duplicates تبقي 755 سطرًا، إذ ما من زوج مكرَّر يختلف بالتهجئة وحدها؛ و<em>Filtered Rows</em> يصلح على أي من جانبي Removed Duplicates — 748 في الحالتين — بعد أن جرت خطوة النوع. ورقم الصف عمود يجعل كل صف فريدًا، فمكانه بعد زوال المكرَّرات، إن احتجته أصلًا."
        }
      },
      /* ---------------------------------------------------------- 10 */
      {
        id: "p1l5q10", type: "compare", level: "hard",
        topics: ["p1-pq-cleaning-steps", "p1-step-order"],
        lang: "m",
        q: {
          en: "Version A is what Power BI writes for you when you choose <em>Transform Data</em> and change nothing; Version B is the recorded cleaning of the lesson. Which statement is correct?",
          ar: "النسخة A هي ما يكتبه Power BI نيابةً عنك حين تختار <em>Transform Data</em> ولا تغيّر شيئًا؛ والنسخة B هي التنظيف المسجَّل في الدرس. أي عبارة صحيحة؟"
        },
        codeA: code(
          "let",
          '    Source = Csv.Document(File.Contents("C:\\cafeteria\\cafeteria_orders.csv"),',
          '        [Delimiter = ",", Columns = 8, Encoding = 65001]),',
          "    Promoted = Table.PromoteHeaders(Source, [PromoteAllScalars = true]),",
          "    Typed = Table.TransformColumnTypes(Promoted,",
          '        {{"order_id", Int64.Type}, {"order_time", type datetime},',
          '         {"item", type text}, {"category", type text}, {"qty", Int64.Type},',
          '         {"unit_price", type text}, {"payment", type text},',
          '         {"customer_type", type text}})',
          "in",
          "    Typed"
        ),
        codeB: code(
          "let",
          '    Source = Csv.Document(File.Contents("C:\\cafeteria\\cafeteria_orders.csv"),',
          '        [Delimiter = ",", Columns = 8, Encoding = 65001]),',
          "    Promoted = Table.PromoteHeaders(Source, [PromoteAllScalars = true]),",
          "    Typed = Table.TransformColumnTypes(Promoted,",
          '        {{"order_id", Int64.Type}, ..., {"unit_price", type number}, ...}, "en-US"),',
          '    NoErrors = Table.ReplaceErrorValues(Typed, {{"unit_price", null}}),',
          "    Tidy = Table.TransformColumns(NoErrors,",
          '        {{"item", each Text.Proper(Text.Trim(Text.Clean(_))), type text}}),',
          "    Unique = Table.Distinct(Tidy),",
          "    Valid = Table.SelectRows(Unique,",
          "        each [qty] > 0 and [unit_price] <> null and [unit_price] < 50),",
          '    WithTotal = Table.AddColumn(Valid, "line_total",',
          "        each [qty] * [unit_price], type number)",
          "in",
          "    WithTotal"
        ),
        options: [
          {
            en: "They are equivalent as far as the answer goes: both return 771 lines, and B only gives the steps nicer names. The difference is readability, not arithmetic.",
            ar: "هما متكافئتان من جهة الجواب: فكلتاهما تعيد 771 سطرًا، وB تمنح الخطوات أسماء أجمل فقط. والفرق في الوضوح لا في الحساب."
          },
          {
            en: "B is better. In A <code>unit_price</code> is text, so there is nothing to add up at all; B types it as a number with the culture <code>\"en-US\"</code>, replaces the resulting Error, unifies the spellings and drops the duplicates and the bad lines, so 771 → 755 → 748 and the revenue is 8,062.00. What B still leaves open is the path typed into <code>Source</code>.",
            ar: "B أفضل. في A يكون <code>unit_price</code> نصًّا فلا يوجد ما يُجمع أصلًا؛ وB تضبطه عددًا بالثقافة <code>\"en-US\"</code> وتستبدل الخطأ الناتج وتوحّد التهجئات وتحذف المكرَّرات والأسطر الفاسدة، فتصبح 771 ← 755 ← 748 والإيراد 8,062.00. وما يبقى مفتوحًا في B هو المسار المكتوب داخل <code>Source</code>."
          },
          {
            en: "A is better: it keeps every line, so no sale is thrown away. B’s filter deletes 23 real lines, which is why its revenue is 272.00 below the 8,334.00 that the raw lines add up to.",
            ar: "A أفضل: فهي تُبقي كل سطر، فلا تُرمى أي مبيعة. ومرشِّح B يحذف 23 سطرًا حقيقيًّا، ولهذا يقلّ إيرادها 272.00 عن 8,334.00 التي تجمعها الأسطر الخام."
          },
          {
            en: "B is wrong as written: <code>Table.ReplaceErrorValues</code> runs before any step has created an Error, so it replaces nothing and the <code>n/a</code> cell survives into <code>line_total</code>.",
            ar: "B خاطئة كما هي مكتوبة: فـ <code>Table.ReplaceErrorValues</code> تجري قبل أن تُنشئ أي خطوة خطأً، فلا تستبدل شيئًا وتبقى خلية <code>n/a</code> حتى <code>line_total</code>."
          }
        ],
        answer: 1,
        hint: {
          en: "Find the one difference in the <code>Typed</code> step of each version, then ask what every later step would be able to do if that difference were not there.",
          ar: "ابحث عن الفرق الوحيد في خطوة <code>Typed</code> بين النسختين، ثم اسأل: ما كان يستطيع كل ما بعدها أن يفعله لو لم يكن ذلك الفرق موجودًا؟"
        },
        explain: {
          en: "In A the price column is text: it cannot be summed, cannot be compared with 50, and sorts 12 before 3. Compute the revenue of A’s raw lines in another tool, skipping the <code>n/a</code>, and you get 8,334.00 — the right three item names with the wrong numbers (Shawarma Wrap 1,512.00, because of the one line typed 120.0) and a busiest hour that is a tie, 12:00 and 13:00 both with 119 orders. B is Version 2 of the evolve: one culture, the Error replaced by null, one spelling per item, 771 → 755 → 748 lines, 8,062.00, and 12:00 now clearly ahead with 119 against 117. Option 2 is the tempting one, because “do not throw data away” is a good instinct — but the 23 lines are 16 copies of lines already counted, 5 refunds, a price typed ten times too high and a price that does not exist; keeping them is not keeping data, it is counting the same sale twice. And in B <code>Table.ReplaceErrorValues</code> does come after <code>Typed</code>, which is the only place it can work at all. B’s honest flaw is the one it admits: <code>C:\\cafeteria\\</code> is typed into the query, so the file breaks on any other computer — which is what Version 3’s parameter fixes.",
          ar: "في A يكون عمود السعر نصًّا: لا يُجمع ولا يُقارن بـ 50 ويُرتَّب 12 قبل 3. واحسب إيراد أسطر A الخام في أداة أخرى، متجاوزًا <code>n/a</code>، فتحصل على 8,334.00 — أسماء الأصناف الثلاثة الصحيحة بأرقام خاطئة (الشاورما 1,512.00 بسبب السطر الواحد المكتوب 120.0)، وساعة ذروة متعادلة: 12:00 و13:00 بـ 119 طلبًا لكل منهما. وB هي النسخة 2 من التطوّر: ثقافة واحدة، والخطأ مستبدَلٌ بـ null، وتهجئة واحدة لكل صنف، و771 ← 755 ← 748 سطرًا، و8,062.00، و12:00 متقدمة الآن بوضوح 119 مقابل 117. والخيار الثالث هو المغري، لأن «لا تَرمِ البيانات» حدس جيد — لكن الأسطر الـ 23 هي 16 نسخة من أسطر محسوبة أصلًا، وخمسة استردادات، وسعر مكتوب أكبر بعشر مرات، وسعر غير موجود؛ فإبقاؤها ليس إبقاءً للبيانات بل حسابًا للمبيعة نفسها مرتين. وفي B تأتي <code>Table.ReplaceErrorValues</code> فعلًا بعد <code>Typed</code>، وهو الموضع الوحيد الذي تعمل فيه. أما عيب B الصادق فهو ما تعترف به: <code>C:\\cafeteria\\</code> مكتوب داخل الاستعلام، فينكسر الملف على أي حاسوب آخر — وهذا ما يصلحه وسيط النسخة 3."
        }
      },

      /* ---------------------------------------------------------- 11 */
      {
        id: "p1l5q11", type: "trace", level: "medium",
        topics: ["p1-applied-steps", "p1-m-code"],
        lang: "m",
        q: {
          en: "The step-through widget of this lesson runs the <code>Orders</code> query on a real excerpt of ten lines (five of the eight columns are drawn). Below is the excerpt as the <code>Tidy</code> step leaves it, and the three steps that follow. Work out what the widget shows. Type numbers only.",
          ar: "ينفّذ عنصر التتبّع في هذا الدرس استعلام <code>Orders</code> على مقتطف حقيقي من عشرة أسطر (تُرسم خمسة من الأعمدة الثمانية). وفي الأسفل المقتطف كما تتركه خطوة <code>Tidy</code>، ثم الخطوات الثلاث التي تليها. استنتج ما يعرضه العنصر. اكتب أعدادًا فقط."
        },
        code: code(
          "    Valid     = Table.SelectRows(Tidy,",
          "                    each [qty] > 0 and [unit_price] <> null and [unit_price] < 50),",
          "    Unique    = Table.Distinct(Valid),",
          '    WithTotal = Table.AddColumn(Unique, "line_total", each [qty] * [unit_price], type number)',
          "",
          "after Tidy:",
          "order_id  item            qty  unit_price  payment",
          "5001      Shawarma Wrap     1  120         Cash",
          "5002      Shawarma Wrap     1   12         Cash",
          "5002      Latte             3    9         Wallet",
          "5004      Tea               1  null        Wallet",
          "5012      Tea              -1    3",
          "5050      Latte             1    9         Cash",
          "5076      Date Cookie       1    3.5       Cash",
          "5076      Date Cookie       1    3.5       Cash",
          "5089      Espresso          1    6         Card",
          "5454      Tea               1    3         Cash"
        ),
        blanks: [
          { accept: ["7"], label: { en: "lines left after <code>Valid</code>", ar: "الأسطر الباقية بعد <code>Valid</code>" } },
          { accept: ["6"], label: { en: "lines left after <code>Unique</code>", ar: "الأسطر الباقية بعد <code>Unique</code>" } },
          { accept: ["27"], label: { en: "<code>line_total</code> of the <code>5002  Latte</code> line", ar: "<code>line_total</code> لسطر <code>5002  Latte</code>" } },
          { accept: ["60.5", "60.50"], label: { en: "the sum of <code>line_total</code> over the excerpt", ar: "مجموع <code>line_total</code> في المقتطف" } }
        ],
        hint: {
          en: "Take the three conditions of <code>Valid</code> one at a time. Then remember that <code>Table.Distinct</code> compares every column of a line, not the id alone.",
          ar: "خُذ شروط <code>Valid</code> الثلاثة واحدًا واحدًا. ثم تذكّر أن <code>Table.Distinct</code> تقارن كل أعمدة السطر، لا المعرّف وحده."
        },
        explain: {
          en: "<code>Valid</code> drops three lines, one per condition: 5001 (price 120, not below 50 — the typo), 5004 (price null, the <code>n/a</code> that the previous step replaced) and 5012 (<code>qty = -1</code>, a refund), leaving 7. <code>Table.Distinct</code> then removes the second of the two 5076 Date Cookie lines, which are identical in <em>every</em> column — that is what makes a line a duplicate rather than a second cookie — leaving 6. <code>line_total</code> is computed row by row, so the Latte line of order 5002 is 3 × 9 = 27, and the six values 12 + 27 + 9 + 3.5 + 6 + 3 add up to 60.5. Notice what did not happen: order 5002 keeps two lines, because they are two different items in one order, and order 5012’s blank payment never mattered — the filter was never asked about it. Over the whole file the same three steps give 771 → 764 → 748 lines and 8,062.00.",
          ar: "تحذف <code>Valid</code> ثلاثة أسطر، واحدًا لكل شرط: 5001 (السعر 120، ليس أقل من 50 — الخطأ المطبعي)، و5004 (السعر null، وهو <code>n/a</code> الذي استبدلته الخطوة السابقة)، و5012 (<code>qty = -1</code>، استرداد)، فتبقى 7. ثم تحذف <code>Table.Distinct</code> ثاني سطري 5076 لكعكة التمر، وهما متطابقان في <em>كل</em> عمود — وهذا ما يجعل السطر مكرَّرًا لا كعكة ثانية — فتبقى 6. ويُحسب <code>line_total</code> صفًّا صفًّا، فسطر اللاتيه في الطلب 5002 هو 3 × 9 = 27، وتجمع القيم الست 12 + 27 + 9 + 3.5 + 6 + 3 إلى 60.5. وانظر ما لم يحدث: أبقى الطلب 5002 سطرين، لأنهما صنفان مختلفان في طلب واحد، ولم يكن لطريقة الدفع الفارغة في 5012 أي أثر — فلم يُسأل المرشِّح عنها. وعلى الملف كله تعطي الخطوات الثلاث نفسها 771 ← 764 ← 748 سطرًا و8,062.00."
        }
      },

      /* ---------------------------------------------------------- 12 */
      {
        id: "p1l5q12", type: "mcq", level: "hard",
        topics: ["p1-report-visuals", "p1-summarization", "p1-xl-pivot-hours"],
        q: {
          en: "The hour chart of the one-page report is a clustered column chart with <code>hour</code> on the X axis, built on the cleaned 748 lines. Amal drags <code>order_id</code> into the value well and leaves the default <em>Count</em>; Dina switches the same field to <em>Count (Distinct)</em>. Amal’s chart makes 13:00 the tallest column, Dina’s makes 12:00. Who has answered “in which hour are we busiest?”, and why?",
          ar: "مخطط الساعات في تقرير الصفحة الواحدة مخطط عموديّ متجمِّع، على محور X فيه <code>hour</code>، مبنيٌّ على الأسطر الـ 748 النظيفة. تسحب أمل <code>order_id</code> إلى خانة القيمة وتترك <em>Count</em> الافتراضي؛ وتحوّل دينا الحقل نفسه إلى <em>Count (Distinct)</em>. فيجعل مخطط أمل 13:00 أطول عمود، ويجعل مخطط دينا 12:00. مَن أجابت عن «في أي ساعة نزدحم؟» ولماذا؟"
        },
        options: [
          {
            en: "Dina. <em>Count</em> counts order <em>lines</em> — 13:00 has 148 against 12:00’s 144 — while <em>Count (Distinct)</em> counts different orders: 12:00 has 119 against 13:00’s 117. “Busiest” is a question about orders served, and the two charts disagree with no error anywhere.",
            ar: "دينا. يعدّ <em>Count</em> <em>أسطر</em> الطلبات — 13:00 فيها 148 مقابل 144 في 12:00 — بينما يعدّ <em>Count (Distinct)</em> الطلبات المختلفة: 12:00 فيها 119 مقابل 117 في 13:00. و«الأزحم» سؤال عن الطلبات المخدومة، والمخططان يتناقضان دون أي خطأ."
          },
          {
            en: "Amal. <em>Count</em> and <em>Count (Distinct)</em> differ only when a column holds blanks, and <code>order_id</code> has none, so the two charts cannot disagree for that reason: 13:00 is the answer and Dina’s visual has a filter left on it.",
            ar: "أمل. لا يختلف <em>Count</em> عن <em>Count (Distinct)</em> إلا حين يحوي العمود فراغات، ولا فراغ في <code>order_id</code>، فلا يمكن أن يتناقض المخططان لهذا السبب: 13:00 هي الجواب، وعلى عنصر دينا مرشِّح منسيّ."
          },
          {
            en: "Neither. With <code>hour</code> stored as text Power BI cannot sort the axis by time, so both charts list the hours alphabetically and no column on either of them can be read as a maximum.",
            ar: "لا هذه ولا تلك. فبتخزين <code>hour</code> نصًّا لا يستطيع Power BI ترتيب المحور زمنيًّا، فيسرد المخططان الساعات أبجديًّا ولا يمكن قراءة أي عمود في أيّهما قيمةً عظمى."
          },
          {
            en: "Dina, but only by accident: <em>Count (Distinct)</em> counts the distinct <em>hours</em> inside each column, which is always 1, so what she is reading is the line count again, drawn on a different scale.",
            ar: "دينا، لكن بالمصادفة: فـ <em>Count (Distinct)</em> يعدّ <em>الساعات</em> المختلفة داخل كل عمود، وهي 1 دائمًا، فما تقرأه هو عدد الأسطر نفسه مرسومًا بمقياس آخر."
          }
        ],
        answer: 0,
        hint: {
          en: "Both summaries are computed from the same column without error. Decide first which <em>thing</em> the manager is counting: a till keystroke, or a customer.",
          ar: "يُحسَب التلخيصان من العمود نفسه دون خطأ. فقرّر أولًا ما <em>الشيء</em> الذي يعدّه المدير: ضغطة على الصندوق أم عميلًا."
        },
        explain: {
          en: "<em>Count</em> and <em>Count (Distinct)</em> answer two different questions about the same column, and both answers are arithmetically correct. The cleaned lines hold 144 lines at 12:00 and 148 at 13:00, but 119 distinct orders at 12:00 against 117 at 13:00: some of the 13:00 orders are bigger baskets. “In which hour are we busiest?” is a question about orders, so the lesson’s chart uses <code>Orders Count = DISTINCTCOUNT(Orders[order_id])</code> and reads 12:00 = 119, 13:00 = 117, 11:00 = 99. Amal’s number is not meaningless — “lines per hour” is a real question about work at the till — it is simply not the question that was asked, and nothing in the report says which of the two a reader is looking at. That is the whole argument for a <em>measure</em>, whose meaning is written down, over a field whose meaning lives in a drop-down. Blanks have nothing to do with it, the text <code>hour</code> values <code>08:00 … 16:00</code> sort correctly (which is exactly why the lesson made the column text), and <em>Count (Distinct)</em> is applied to the field in the well, not to the axis. The same lines-versus-orders distinction decided the PivotTable of Lesson 4.",
          ar: "يجيب <em>Count</em> و<em>Count (Distinct)</em> عن سؤالين مختلفين حول العمود نفسه، والجوابان صحيحان حسابيًّا. ففي الأسطر النظيفة 144 سطرًا في 12:00 و148 في 13:00، لكن 119 طلبًا مختلفًا في 12:00 مقابل 117 في 13:00: فبعض طلبات 13:00 سلال أكبر. و«في أي ساعة نزدحم؟» سؤال عن الطلبات، فيستعمل مخطط الدرس <code>Orders Count = DISTINCTCOUNT(Orders[order_id])</code> ويقرأ 12:00 = 119 و13:00 = 117 و11:00 = 99. ورقم أمل ليس بلا معنى — فـ «الأسطر في الساعة» سؤال حقيقي عن العمل على الصندوق — لكنه ليس السؤال المطروح، ولا شيء في التقرير يقول للقارئ أيّ الاثنين ينظر إليه. وهذه هي الحجة كلها لصالح <em>مقياس</em> معناه مكتوب على حقل معناه يعيش في قائمة منسدلة. ولا شأن للفراغات بالأمر، وقيم <code>hour</code> النصية <code>08:00 … 16:00</code> تُرتَّب ترتيبًا صحيحًا (ولهذا بالضبط جعل الدرس العمود نصًّا)، و<em>Count (Distinct)</em> يُطبَّق على الحقل في الخانة لا على المحور. والتمييز نفسه بين الأسطر والطلبات هو ما حسم الجدول المحوري في الدرس 4."
        }
      },

      /* ---------------------------------------------------------- 13 */
      {
        id: "p1l5q13", type: "multi", level: "medium",
        topics: ["p1-merge-queries"],
        q: {
          en: "<em>Merge Queries</em> joins <code>Orders</code> to <code>Menu</code> on <code>item</code>. Which statements are true? Choose all that apply.",
          ar: "يَصِل <em>Merge Queries</em> بين <code>Orders</code> و<code>Menu</code> على <code>item</code>. أي العبارات صحيحة؟ اختر كل ما ينطبق."
        },
        options: [
          {
            en: "A <em>Left Anti</em> merge of the raw orders against the raw menu returns 8 lines; the cleaned orders against the cleaned menu return 0 — and that zero is the check to re-run after every refresh.",
            ar: "يعيد دمج <em>Left Anti</em> للطلبات الخام مقابل القائمة الخام 8 أسطر؛ وتعيد الطلبات النظيفة مقابل القائمة النظيفة 0 — وذلك الصفر هو الفحص الذي يُعاد بعد كل تحديث."
          },
          {
            en: "Cleaning <code>item</code> in <code>Orders</code> alone is enough, because the join compares the cleaned side.",
            ar: "يكفي تنظيف <code>item</code> في <code>Orders</code> وحدها، لأن الوصل يقارن الجهة النظيفة."
          },
          {
            en: "An <em>Inner</em> join would drop the order lines whose item is not on the menu, and the line count would fall with no message.",
            ar: "يحذف وصل <em>Inner</em> أسطر الطلبات التي ليس صنفها في القائمة، فينقص عدد الأسطر دون أي رسالة."
          },
          {
            en: "A merge and a relationship do the same work; the only difference is that a relationship is drawn as a line in Model view.",
            ar: "الدمج والعلاقة يؤديان العمل نفسه؛ والفرق الوحيد أن العلاقة تُرسم خطًّا في عرض النموذج."
          },
          {
            en: "If the menu listed <code>Tea</code> twice — an old price and a new one — the merge would match every Tea line twice: 748 lines become 840 and the revenue 8,524.00.",
            ar: "لو سردت القائمة <code>Tea</code> مرتين — سعرًا قديمًا وآخر جديدًا — لطابق الدمج كل سطر شاي مرتين: فتصبح 748 سطرًا العدد 840 والإيراد 8,524.00."
          }
        ],
        answer: [0, 2, 4],
        hint: {
          en: "A join compares two keys, so ask what has to be true of <em>both</em> of them. And ask what each join kind does to the line count.",
          ar: "يقارن الوصل مفتاحين، فاسأل ما الذي يجب أن يصحّ في <em>كليهما</em>. ثم اسأل ما يفعله كل نوع وصل بعدد الأسطر."
        },
        explain: {
          en: "Left Anti keeps only the first table’s lines that found <em>no</em> match, which turns the spelling problem into a number: 8 on the raw data, 0 once the same cleaning has been applied to both keys, and that zero is a cheap check to repeat after every refresh. Inner keeps only the lines that match on both sides, so an unknown item disappears without a word — useful to know, dangerous to click by accident. And a non-unique key on the second side multiplies rows: a second <code>Tea</code> row in the menu turns 748 lines into 840 and 8,062.00 into 8,524.00, with Tea alone reading 924.00 instead of 462.00. The two false statements are the commonest beliefs about joins. Cleaning one side only makes the check look <em>worse</em>: the cleaned orders against the <em>raw</em> menu leave 76 unmatched lines, all of them <code>Water 500ml</code>, because capitalising each word turns it into <code>Water 500Ml</code> — apply the same steps to the key on both sides. And a merge is not a relationship: a merge <em>copies</em> menu columns into the orders table, row by row, once, at refresh time, which is what you want when you need the menu value on each row (comparing <code>unit_price</code> with <code>list_price</code>); a relationship keeps the tables apart and lets a filter travel from one to the other, which is what you want for slicing and grouping.",
          ar: "يُبقي Left Anti أسطر الجدول الأول التي <em>لم</em> تجد مطابقًا، فيحوّل مشكلة التهجئة إلى رقم: 8 على البيانات الخام، و0 بعد تطبيق التنظيف نفسه على المفتاحين، وذلك الصفر فحص رخيص يُعاد بعد كل تحديث. ويُبقي Inner الأسطر المتطابقة في الجهتين فقط، فيختفي الصنف المجهول دون كلمة — من المفيد معرفته ومن الخطر النقر عليه سهوًا. ومفتاح غير فريد في الجهة الثانية يضاعف الصفوف: فصفّ <code>Tea</code> ثانٍ في القائمة يحوّل 748 سطرًا إلى 840 و8,062.00 إلى 8,524.00، ويصبح الشاي وحده 924.00 بدل 462.00. والعبارتان الخاطئتان هما أشهر ما يُعتقد عن الوصل. فتنظيف جهة واحدة يجعل الفحص <em>أسوأ</em>: الطلبات النظيفة مقابل القائمة <em>الخام</em> تترك 76 سطرًا غير مطابق، كلها <code>Water 500ml</code>، لأن تكبير أول كل كلمة يحوّلها إلى <code>Water 500Ml</code> — فطبّق الخطوات نفسها على المفتاح في الجهتين. والدمج ليس علاقة: فالدمج <em>ينسخ</em> أعمدة القائمة إلى جدول الطلبات صفًّا صفًّا مرة واحدة وقت التحديث، وهو ما تريده حين تحتاج قيمة القائمة على كل صف (كمقارنة <code>unit_price</code> بـ <code>list_price</code>)؛ أما العلاقة فتُبقي الجدولين منفصلين وتدع مرشِّحًا يسافر من أحدهما إلى الآخر، وهو ما تريده للتقطيع والتجميع."
        }
      },

      /* ---------------------------------------------------------- 14 */
      {
        id: "p1l5q14", type: "tf", level: "easy",
        topics: ["p1-query-folding"],
        q: {
          en: "Claim: with <code>cafeteria_orders.csv</code> as the source, none of the Applied Steps <em>folds</em> — Power Query reads the whole file and performs every step itself, in memory, on your own PC. True or false?",
          ar: "الادعاء: حين يكون المصدر <code>cafeteria_orders.csv</code> لا <em>تُطوى</em> أي خطوة من الخطوات المطبَّقة — فتقرأ Power Query الملف كله وتنفّذ كل خطوة بنفسها، في الذاكرة، على حاسوبك. صح أم خطأ؟"
        },
        truth: true,
        hint: {
          en: "Folding hands your steps to something else to do. Ask what sits at the other end of a <em>Text/CSV</em> connector.",
          ar: "الطيّ يسلّم خطواتك إلى شيء آخر لينفّذها. فاسأل: ما الذي يقف في الطرف الآخر من موصِّل <em>Text/CSV</em>؟"
        },
        explain: {
          en: "True. Query folding is Power Query translating your steps — filter rows, remove columns, group — into <em>one</em> statement for the source, typically SQL, so that the source does the work and only the answer travels to your PC. A flat file has no engine to hand work to: Power Query reads all 771 lines and runs the eight steps itself. That is perfectly fine for 771 lines and painful for 50 million, which is why folding is a database question and you will meet it again when the source is SQL. The tempting reading is that folding is a setting you switch on for speed; it is not. It is a property of the connector and of the steps you chose, and the way to check is to right-click a step and look for <em>View Native Query</em> — greyed out means that step did not fold, and depending on the connector neither will most steps after it.",
          ar: "صح. طيّ الاستعلام هو أن تترجم Power Query خطواتك — ترشيح الصفوف وإزالة الأعمدة والتجميع — إلى عبارة <em>واحدة</em> للمصدر، غالبًا SQL، فيؤدي المصدر العمل ولا يسافر إلى حاسوبك إلا الجواب. والملف المسطّح لا يملك محرّكًا يُسلَّم إليه العمل: فتقرأ Power Query الأسطر الـ 771 كلها وتنفّذ الخطوات الثماني بنفسها. وهذا مناسب تمامًا لـ 771 سطرًا ومُرهِق لخمسين مليونًا، ولهذا كان الطيّ سؤال قواعد البيانات وستلقاه مرة أخرى حين يكون المصدر SQL. والقراءة المغرية أن الطيّ إعداد تشغّله للسرعة؛ وهو ليس كذلك. إنه خصيصة في الموصِّل وفي الخطوات التي اخترتها، وطريقة التحقق أن تنقر الخطوة بالزر الأيمن وتبحث عن <em>View Native Query</em> — فكونه باهتًا يعني أن الخطوة لم تُطوَ، وبحسب الموصِّل لن تُطوى معها معظم الخطوات التالية."
        }
      },

      /* ---------------------------------------------------------- 15 */
      {
        id: "p1l5q15", type: "order", level: "medium",
        topics: ["p1-model-relationships", "p1-filter-context"],
        q: {
          en: "The model is <code>Orders[item]</code> → <code>Menu[item]</code>, Many to one, cross filter direction Single. A reader clicks <em>Drink</em> in a slicer built from <code>Menu[category]</code>. Put what happens in order, from the click to the number on the card.",
          ar: "النموذج هو <code>Orders[item]</code> ← <code>Menu[item]</code>، متعدد إلى واحد، واتجاه الترشيح المتقاطع Single. ينقر قارئ <em>Drink</em> في مقطِّع مبنيّ على <code>Menu[category]</code>. رتّب ما يحدث من النقرة إلى الرقم على البطاقة."
        },
        items: [
          {
            en: "A filter is created on <code>Menu</code> — the table the slicer’s field comes from — and not on <code>Orders</code>.",
            ar: "يُنشَأ مرشِّح على <code>Menu</code> — الجدول الذي جاء منه حقل المقطِّع — لا على <code>Orders</code>."
          },
          {
            en: "Six of the 16 <code>Menu</code> rows survive: Espresso, Karak Tea, Latte, Orange Juice, Tea and Water 500ml.",
            ar: "تبقى ستة من صفوف <code>Menu</code> الـ 16: Espresso وKarak Tea وLatte وOrange Juice وTea وWater 500ml."
          },
          {
            en: "The relationship hands that list of six items from the “one” side to the “many” side.",
            ar: "تسلّم العلاقة قائمة الأصناف الستة من جهة «الواحد» إلى جهة «المتعدد»."
          },
          {
            en: "<code>Orders</code> is narrowed to the 347 lines whose item is one of the six drinks.",
            ar: "يضيق <code>Orders</code> إلى الأسطر الـ 347 التي صنفها أحد المشروبات الستة."
          },
          {
            en: "The measures are evaluated over those lines and nothing else: <code>Total Revenue</code> 2,769.00 and <code>Orders Count</code> 311.",
            ar: "تُحسَب المقاييس على تلك الأسطر وحدها: <code>Total Revenue</code> 2,769.00 و<code>Orders Count</code> 311."
          }
        ],
        answer: [0, 1, 2, 3, 4],
        hint: {
          en: "Start where the click lands: a slicer filters its own table first. The relationship is what moves the filter on — and it moves it one way only.",
          ar: "ابدأ من حيث تقع النقرة: يرشّح المقطِّع جدوله أولًا. والعلاقة هي ما ينقل المرشِّح — وينقله في اتجاه واحد فقط."
        },
        explain: {
          en: "A slicer filters the table its field comes from, so the Drink click lands on <code>Menu</code> and leaves six rows there. The relationship then passes those six item values from the “one” side to the “many” side — Single direction means it can only go that way — and <code>Orders</code> shrinks to 347 of its 748 lines. Only then are the measures evaluated, in that filter context: 2,769.00, which is exactly the Drink row of the category table (Food 4,205.00, Drink 2,769.00, Snack 747.00, Dessert 341.00), and 311 distinct orders rather than 347, because some orders hold two drink lines. Run the story the other way and you have the other half of the lesson: a slicer on <code>Orders[customer_type]</code> set to Staff narrows <code>Orders</code> to 158 lines and leaves all 16 <code>Menu</code> rows untouched, which is why a slicer built from <code>Menu[item]</code> keeps listing every item. Switching the direction to Both would change that, at the price of ambiguity and speed — a decision to take deliberately, not to click in frustration.",
          ar: "يرشّح المقطِّع الجدول الذي جاء منه حقله، فتقع نقرة Drink على <code>Menu</code> وتُبقي فيه ستة صفوف. ثم تمرّر العلاقة قيم الأصناف الستة من جهة «الواحد» إلى جهة «المتعدد» — واتجاه Single يعني أنها لا تسير إلا هكذا — فيتقلّص <code>Orders</code> إلى 347 من أسطره الـ 748. وعندها فقط تُحسَب المقاييس في ذلك السياق: 2,769.00، وهو بالضبط صفّ Drink في جدول الفئات (Food 4,205.00، Drink 2,769.00، Snack 747.00، Dessert 341.00)، و311 طلبًا مختلفًا لا 347، لأن بعض الطلبات تحوي سطري مشروبات. وأجرِ الحكاية في الاتجاه المعاكس فتحصل على نصف الدرس الآخر: مقطِّع على <code>Orders[customer_type]</code> مضبوط على Staff يضيّق <code>Orders</code> إلى 158 سطرًا ويترك صفوف <code>Menu</code> الـ 16 كلها كما هي، ولهذا يظل مقطِّع مبنيّ على <code>Menu[item]</code> يسرد كل صنف. وتحويل الاتجاه إلى Both يغيّر ذلك بثمن من الالتباس والسرعة — قرارٌ يُتَّخذ بتدبُّر لا يُنقَر في لحظة ضيق."
        }
      },

      /* ---------------------------------------------------------- 16 */
      {
        id: "p1l5q16", type: "mcq", level: "easy",
        topics: ["p1-star-schema"],
        q: {
          en: "After <em>Close &amp; Apply</em> the model holds <code>Orders</code> with 748 rows and <code>Menu</code> with 16. Which description is right, and what follows from it?",
          ar: "بعد <em>Close &amp; Apply</em> يحوي النموذج <code>Orders</code> بـ 748 صفًّا و<code>Menu</code> بـ 16. أي وصف صحيح، وما ينتج عنه؟"
        },
        options: [
          {
            en: "Both are dimension tables — each one describes something, an order and an item — and the fact of the model is the <code>line_total</code> column that the numbers are added up from.",
            ar: "كلاهما جدول أبعاد — فكل واحد يصف شيئًا، طلبًا وصنفًا — وحقيقة النموذج هي عمود <code>line_total</code> الذي تُجمع منه الأرقام."
          },
          {
            en: "<code>Menu</code> is the fact table, because it holds the authoritative <code>list_price</code>; <code>Orders</code> is the dimension that describes when each price was used.",
            ar: "<code>Menu</code> هو جدول الحقائق لأنه يحوي <code>list_price</code> المرجعي؛ و<code>Orders</code> هو جدول الأبعاد الذي يصف متى استُعمل كل سعر."
          },
          {
            en: "Neither name applies yet: a star needs at least three tables, so the two become a fact and a dimension only once a Calendar table is added.",
            ar: "لا ينطبق أي من الاسمين بعد: فالنجمة تحتاج ثلاثة جداول على الأقل، فلا يصبح الاثنان حقائق وأبعادًا إلا بعد إضافة جدول تقويم."
          },
          {
            en: "<code>Orders</code> is the fact table — one row per thing that happened, with the numbers you add up — and <code>Menu</code> is a dimension that describes the items, so filters start at <code>Menu</code> and flow to <code>Orders</code>.",
            ar: "<code>Orders</code> هو جدول الحقائق — صفّ لكل ما حدث، مع الأرقام التي تجمعها — و<code>Menu</code> جدول أبعاد يصف الأصناف، فتبدأ المرشِّحات من <code>Menu</code> وتسير إلى <code>Orders</code>."
          }
        ],
        answer: 3,
        hint: {
          en: "One of the two tables records <em>events</em>; the other describes the things those events refer to. Then ask which side of the relationship has to be unique.",
          ar: "أحد الجدولين يسجّل <em>أحداثًا</em>؛ والآخر يصف الأشياء التي تشير إليها تلك الأحداث. ثم اسأل: أي جهة من العلاقة يجب أن تكون فريدة؟"
        },
        explain: {
          en: "A fact table records events, one row per thing that happened, and holds the numbers you aggregate: <code>Orders</code> is one row per order line, with <code>qty</code>, <code>unit_price</code> and <code>line_total</code>. A dimension table describes the things those events refer to: <code>Menu</code> is one row per item, with its category and list price. The fact table sits in the middle with a many-to-one relationship to each dimension, which is why the picture is a star, and filters start at a dimension and flow inwards to the fact table, never between dimensions. Option 1 inverts the two, which is tempting because the menu holds the “official” numbers — but <code>list_price</code> is an attribute of an item, not an event, and the “one” side of a relationship must be the unique one (<code>Menu</code>: 16 rows, 16 distinct items). A column is never a table, and a star with one point is still a star: the Calendar dimension arrives when time analysis does. Honestly: with one flat file and one question, a relationship adds a table, a line and a place to make a mistake — build the star when a second table appears or when an attribute is reused.",
          ar: "جدول الحقائق يسجّل الأحداث، صفًّا لكل ما حدث، ويحوي الأرقام التي تُجمَع: <code>Orders</code> صفٌّ لكل سطر طلب، فيه <code>qty</code> و<code>unit_price</code> و<code>line_total</code>. وجدول الأبعاد يصف الأشياء التي تشير إليها تلك الأحداث: <code>Menu</code> صفٌّ لكل صنف، فيه فئته وسعره المعلن. ويجلس جدول الحقائق في الوسط بعلاقة متعدد إلى واحد مع كل جدول أبعاد، ولهذا تكون الصورة نجمة، وتبدأ المرشِّحات من بُعدٍ وتسير إلى الداخل نحو جدول الحقائق، لا بين الأبعاد. والخيار الثاني يعكس الاثنين، وهو مغرٍ لأن القائمة تحوي الأرقام «الرسمية» — لكن <code>list_price</code> صفةٌ لصنف لا حدثٌ، وجهة «الواحد» في العلاقة يجب أن تكون الفريدة (<code>Menu</code>: 16 صفًّا و16 صنفًا مختلفًا). والعمود ليس جدولًا أبدًا، والنجمة ذات الرأس الواحد نجمةٌ أيضًا: فبُعد التقويم يأتي حين يأتي تحليل الزمن. وبصدق: مع ملف مسطّح واحد وسؤال واحد تضيف العلاقة جدولًا وخطًّا وموضعًا للخطأ — فابنِ النجمة حين يظهر جدول ثانٍ أو تُعاد صفةٌ."
        }
      },
      /* ---------------------------------------------------------- 17 */
      {
        id: "p1l5q17", type: "output", level: "medium",
        topics: ["p1-summarization"],
        lang: "text",
        q: {
          en: "Each line below is a field dragged into the value well of a card over the cleaned 748 lines, with the summary Power BI was left on or switched to. Type the number the card shows, with two decimals where the value has them.",
          ar: "كل سطر في الأسفل حقلٌ مسحوب إلى خانة القيمة في بطاقة، على الأسطر الـ 748 النظيفة، مع التلخيص الذي تُرك عليه Power BI أو حُوّل إليه. اكتب الرقم الذي تعرضه البطاقة، بمنزلتين عشريتين حين تكون للقيمة منزلتان."
        },
        code: code(
          "qty         -> Sum",
          "order_id    -> Sum",
          "unit_price  -> Average",
          "line_total  -> Average",
          "",
          "and one card built from two dragged fields:",
          "Sum of qty   x   Average of unit_price"
        ),
        blanks: [
          { accept: ["1240", "1,240"], label: { en: "<code>qty</code> → Sum", ar: "<code>qty</code> ← Sum" } },
          { accept: ["3973001", "3,973,001"], label: { en: "<code>order_id</code> → Sum", ar: "<code>order_id</code> ← Sum" } },
          { accept: ["6.52"], label: { en: "<code>unit_price</code> → Average", ar: "<code>unit_price</code> ← Average" } },
          { accept: ["10.78"], label: { en: "<code>line_total</code> → Average", ar: "<code>line_total</code> ← Average" } },
          { accept: ["8084.87", "8,084.87"], label: { en: "Sum of <code>qty</code> × Average of <code>unit_price</code>", ar: "Sum لـ <code>qty</code> × Average لـ <code>unit_price</code>" } }
        ],
        hint: {
          en: "Four of the five are arithmetic you can do from the lesson’s totals. For the fifth, ask whether multiplying two summaries can give the sum of the products.",
          ar: "أربعة من الخمسة حسابٌ تؤديه من إجماليات الدرس. وللخامس اسأل: هل يعطي ضربُ تلخيصين مجموعَ الحواصل؟"
        },
        explain: {
          en: "Only two of these five numbers mean anything. 1,240 is units sold, and the sum of <code>line_total</code> (8,062.00, not asked here) is revenue. 3,973,001 is the sum of an <em>identifier</em> — a label added up as though it were a quantity, drawn happily under the heading “Sum of order_id”, and it would be just as meaningless on perfectly clean data. The average price 6.52 is “the average line’s price”, not the price of anything; the average <code>line_total</code> 10.78 is revenue per <em>line</em>, not per order (13.19), and one click on a drop-down is all that separates the two. The last one is the trap: 1,240 × 6.52 = 8,084.87, which is 22.87 away from the true 8,062.00 with no error to say so, because the sum of products is not the product of sums. The cures in order of strength: make identifiers text in Power Query, set Column tools → Summarization → <em>Don’t summarize</em>, and compute money with a measure — <code>SUMX</code> multiplies first and adds afterwards.",
          ar: "رقمان فقط من هذه الخمسة لهما معنى. فـ 1,240 هو الوحدات المبيعة، ومجموع <code>line_total</code> (8,062.00، وليس مطلوبًا هنا) هو الإيراد. أما 3,973,001 فمجموع <em>معرّف</em> — لافتةٌ جُمعت كأنها كمية، ويرسمها التقرير بسرور تحت عنوان «Sum of order_id»، وكان سيبقى بلا معنى على بيانات نظيفة تمامًا. ومتوسط السعر 6.52 هو «سعر السطر المتوسط» لا سعر شيء؛ ومتوسط <code>line_total</code> 10.78 هو الإيراد لكل <em>سطر</em> لا لكل طلب (13.19)، ولا يفصل بين الاثنين إلا نقرة واحدة في قائمة منسدلة. والأخير هو الفخ: 1,240 × 6.52 = 8,084.87، أي 22.87 بعيدًا عن 8,062.00 الحقيقية دون خطأ يقول ذلك، لأن مجموع الحواصل ليس حاصل المجاميع. والعلاجات مرتَّبة بالقوة: اجعل المعرّفات نصًّا في Power Query، واضبط Column tools ← Summarization ← <em>Don’t summarize</em>، واحسب المال بمقياس — فـ <code>SUMX</code> يضرب أولًا ثم يجمع."
        }
      },

      /* ---------------------------------------------------------- 18 */
      {
        id: "p1l5q18", type: "error", level: "hard",
        topics: ["p1-dax-measures", "p1-summarization"],
        lang: "dax",
        q: {
          en: "Five measures in a model of the cleaned cafeteria data. Four are the lesson’s; one returns a wrong number with no error, no blank and no warning — and every measure built on it inherits the mistake. Click it.",
          ar: "خمسة مقاييس في نموذج لبيانات الكافتيريا النظيفة. أربعة منها من الدرس؛ وواحد يعيد رقمًا خاطئًا دون خطأ ولا فراغ ولا تحذير — ويورّث خطأه كل مقياس يُبنى عليه. انقره."
        },
        code: code(
          "Units Sold = SUM(Orders[qty])",
          "Orders Count = DISTINCTCOUNT(Orders[order_id])",
          "Total Revenue = SUM(Orders[qty]) * AVERAGE(Orders[unit_price])",
          "Revenue per Order = DIVIDE([Total Revenue], [Orders Count])",
          "Units per Order = DIVIDE([Units Sold], [Orders Count])"
        ),
        answer: 3,
        solution: {
          code: code(
            "Total Revenue = SUMX(Orders, Orders[qty] * Orders[unit_price])",
            "",
            "// the five cards with no filter:",
            "//   Units Sold 1,240 | Orders Count 611 | Total Revenue 8,062.00",
            "//   Revenue per Order 13.19 | Units per Order 2.03"
          ),
          en: "<code>SUMX</code> evaluates <code>qty * unit_price</code> on each row and adds the results, so the product is taken before the sum. The other four measures are already right.",
          ar: "يحسب <code>SUMX</code> حاصل <code>qty * unit_price</code> على كل صف ثم يجمع النواتج، فيُؤخذ الضرب قبل الجمع. والمقاييس الأربعة الأخرى صحيحة أصلًا."
        },
        hint: {
          en: "Write out what one of the five lines computes for just two rows — one Tea at 3.00 and one line of three Lattes at 9.00 — and compare it with the revenue of those two rows.",
          ar: "اكتب ما يحسبه أحد الأسطر الخمسة لصفّين فقط — شاي واحد بـ 3.00 وسطر فيه ثلاثة لاتيه بـ 9.00 — وقارنه بإيراد هذين الصفّين."
        },
        explain: {
          en: "The third line multiplies two aggregates: 1,240 units × the average line price 6.52 = 8,084.87, against the true revenue of 8,062.00 — and <code>Revenue per Order</code>, which reuses it, then reads 13.23 instead of 13.19. The sum of products is not the product of sums: one Tea at 3.00 and one line of three Lattes at 9.00 give 4 × 6.00 = 24.00 instead of the true 30.00, and the gap grows with the spread of the prices. The fix is an iterator — a function whose name ends in X: <code>SUMX(Orders, Orders[qty] * Orders[unit_price])</code> evaluates the product on each row and adds the results. The other four lines are right, each for a reason worth keeping: <code>SUM</code> is enough for <code>Units Sold</code> because no row needs a product first; <code>DISTINCTCOUNT</code> answers “how many orders” (611) where <code>COUNTROWS(Orders)</code> would answer “how many lines” (748); and <code>DIVIDE</code> returns a blank rather than an error or Infinity when a slice has no orders, so an empty slicer selection shows nothing rather than nonsense.",
          ar: "يضرب السطر الثالث تلخيصين: 1,240 وحدة × متوسط سعر السطر 6.52 = 8,084.87، مقابل الإيراد الحقيقي 8,062.00 — ثم يقرأ <code>Revenue per Order</code>، الذي يعيد استعماله، 13.23 بدل 13.19. فمجموع الحواصل ليس حاصل المجاميع: شايٌ بـ 3.00 وسطرٌ فيه ثلاثة لاتيه بـ 9.00 يعطيان 4 × 6.00 = 24.00 بدل 30.00 الصحيحة، وتكبر الفجوة بتباعد الأسعار. والعلاج مُكرِّرٌ (iterator) ينتهي اسمه بحرف X: فـ <code>SUMX(Orders, Orders[qty] * Orders[unit_price])</code> يحسب الحاصل على كل صف ثم يجمع النواتج. والأسطر الأربعة الأخرى صحيحة، ولكل واحد سببٌ يستحق الحفظ: <code>SUM</code> يكفي لـ <code>Units Sold</code> لأن لا صفّ يحتاج ضربًا أولًا؛ و<code>DISTINCTCOUNT</code> يجيب عن «كم طلبًا» (611) حيث يجيب <code>COUNTROWS(Orders)</code> عن «كم سطرًا» (748)؛ و<code>DIVIDE</code> يعيد فراغًا لا خطأً ولا ما لا نهاية حين لا تحوي الشريحة طلبات، فيعرض اختيارٌ فارغ في المقطِّع لا شيء بدل الهُراء."
        }
      },

      /* ---------------------------------------------------------- 19 */
      {
        id: "p1l5q19", type: "compare", level: "hard",
        topics: ["p1-measure-vs-column", "p1-dax-measures"],
        lang: "dax",
        q: {
          en: "Two ways to put the cafeteria’s revenue on a card. Both show 8,062.00 today. Which statement is correct?",
          ar: "طريقتان لوضع إيراد الكافتيريا على بطاقة. وكلتاهما تعرض 8,062.00 اليوم. أي عبارة صحيحة؟"
        },
        codeA: code(
          "// Table view > Column tools > New column   (a calculated column)",
          "line_total = Orders[qty] * Orders[unit_price]",
          "",
          "// Report view: drag line_total into a card.",
          '// the card is headed "Sum of line_total"   ->   8,062.00',
          "// one click on the field's drop-down -> Average   ->   10.78"
        ),
        codeB: code(
          "Total Revenue = SUMX(Orders, Orders[qty] * Orders[unit_price])",
          "Orders Count = DISTINCTCOUNT(Orders[order_id])",
          "Revenue per Order = DIVIDE([Total Revenue], [Orders Count])",
          "",
          "// three cards, no filter       ->  8,062.00 | 611 | 13.19",
          "// the Falafel Sandwich bar     ->    917.00 |  84 | 10.92",
          "// Staff selected in a slicer   ->  1,716.50 | 154 | 11.15"
        ),
        options: [
          {
            en: "A is the better choice for a card: the column is stored, so the card reads 748 ready values instead of recomputing anything, and the drop-down lets one field answer both “how much” and “how much on average”.",
            ar: "A الخيار الأفضل لبطاقة: فالعمود مخزَّن، فتقرأ البطاقة 748 قيمة جاهزة بدل إعادة حساب أي شيء، وتدع القائمة المنسدلة حقلًا واحدًا يجيب عن «كم» و«كم في المتوسط»."
          },
          {
            en: "They are equivalent: a dragged <code>Sum of line_total</code> and the measure <code>[Total Revenue]</code> are the same thing under two names, so the choice is a matter of taste.",
            ar: "هما متكافئتان: فـ <code>Sum of line_total</code> المسحوب والمقياس <code>[Total Revenue]</code> شيء واحد باسمين، فالاختيار مسألة ذوق."
          },
          {
            en: "B is better: the meaning of the number is written down and cannot be turned into an average by one click, nothing is stored, and the measures can be reused by name — which is what makes <code>Revenue per Order</code> possible at all.",
            ar: "B أفضل: فمعنى الرقم مكتوب ولا يمكن أن يُحوّل إلى متوسط بنقرة، ولا يُخزَّن شيء، ويمكن إعادة استعمال المقاييس بالاسم — وهو ما يجعل <code>Revenue per Order</code> ممكنًا أصلًا."
          },
          {
            en: "B is wrong where it matters: <code>DISTINCTCOUNT</code> keeps only 611 of the 748 lines, so B divides by too small a denominator; A’s average <code>line_total</code> of 10.78 is the real figure per order.",
            ar: "B خاطئة في الموضع المهم: فـ <code>DISTINCTCOUNT</code> يُبقي 611 من 748 سطرًا فقط، فتقسم B على مقام أصغر من اللازم؛ ومتوسط <code>line_total</code> في A، 10.78، هو الرقم الحقيقي لكل طلب."
          }
        ],
        answer: 2,
        hint: {
          en: "Both give 8,062.00 today. Ask what each one gives when somebody wants revenue <em>per order</em>, and where the meaning of the number is recorded.",
          ar: "كلتاهما تعطي 8,062.00 اليوم. فاسأل ما تعطيه كل واحدة حين يطلب أحدهم الإيراد <em>لكل طلب</em>، وأين يُسجَّل معنى الرقم."
        },
        explain: {
          en: "The tempting option is the first one, “stored, therefore faster”: here the store buys a bigger file (748 values that grow the <code>.pbix</code>) and nothing else, and the drop-down is the defect rather than the feature — the same field becomes 10.78 with one click, which is revenue per <em>line</em>, and nothing in the report tells a reader which of the two is on screen. A calculated column holds one value per row and is fixed at refresh, so a ratio of two <em>totals</em> cannot be built from it; an average of per-row ratios is a different, wrong number. 611 is not a subset of the 748 lines: it is the number of different <code>order_id</code> values, which is exactly the denominator that “per order” asks for, and 8,062.00 / 611 = 13.19 is right in every context — 10.92 for the Falafel Sandwich bar, 11.15 for Staff. The rule of thumb: derive row-level values in Power Query, the earliest job that can; write a measure for anything you add up, count or divide. What Version 3 still leaves open is its own warning: distinct counts do not add up, so orders by customer type are 448 + 154 + 75 = 677, not 611, because 66 orders hold lines with different <code>customer_type</code> values.",
          ar: "الخيار المغري هو الأول، «مخزَّن إذن أسرع»: والتخزين هنا يشتري ملفًّا أكبر (748 قيمة تُنمّي ملف <code>.pbix</code>) ولا شيء غير ذلك، والقائمة المنسدلة عيبٌ لا ميزة — فالحقل نفسه يصبح 10.78 بنقرة، وهو الإيراد لكل <em>سطر</em>، ولا شيء في التقرير يخبر القارئ أيّ الاثنين على الشاشة. والعمود المحسوب يحمل قيمة واحدة لكل صف وتُثبَّت عند التحديث، فلا يمكن أن تُبنى منه نسبة بين <em>إجماليين</em>؛ ومتوسط النسب الصفّية رقمٌ آخر وخاطئ. و611 ليست جزءًا من الأسطر الـ 748: إنها عدد قيم <code>order_id</code> المختلفة، وهو بالضبط المقام الذي يطلبه «لكل طلب»، و8,062.00 ÷ 611 = 13.19 صحيحٌ في كل سياق — 10.92 لشريط فلافل ساندويتش و11.15 لـ Staff. والقاعدة العملية: استخرج القيم الصفّية في Power Query، أبكر مهمة تستطيع؛ واكتب مقياسًا لكل ما تجمعه أو تعدّه أو تقسمه. وما تبقيه النسخة 3 مفتوحًا هو تحذيرها نفسه: العدّ المختلف لا يُجمع، فطلبات أنواع العملاء 448 + 154 + 75 = 677 لا 611، لأن 66 طلبًا تحوي أسطرًا بقيم <code>customer_type</code> مختلفة."
        }
      },

      /* ---------------------------------------------------------- 20 */
      {
        id: "p1l5q20", type: "trace", level: "hard",
        topics: ["p1-filter-context", "p1-dax-measures"],
        lang: "dax",
        q: {
          en: "The report has one bar per item. Drawing the <code>Chicken Rice</code> bar evaluates the three measures in that bar’s filter context. On the cleaned data Chicken Rice appears on 40 order lines, in 39 different orders (one order holds two Chicken Rice lines), and 68 portions were sold, every one of them at the menu’s 15.00. Give the values the bar reports. Type numbers only.",
          ar: "في التقرير شريطٌ لكل صنف. ورسم شريط <code>Chicken Rice</code> يحسب المقاييس الثلاثة في سياق مرشِّح ذلك الشريط. وفي البيانات النظيفة يظهر Chicken Rice في 40 سطر طلب، في 39 طلبًا مختلفًا (طلبٌ واحد يحوي سطري Chicken Rice)، وبِيعت 68 حصة، كلها بسعر القائمة 15.00. اذكر القيم التي يعرضها الشريط. اكتب أعدادًا فقط."
        },
        code: code(
          '// the Chicken Rice bar sets the filter context:  Menu[item] = "Chicken Rice"',
          "Total Revenue = SUMX(Orders, Orders[qty] * Orders[unit_price])",
          "Orders Count = DISTINCTCOUNT(Orders[order_id])",
          "Revenue per Order = DIVIDE([Total Revenue], [Orders Count])"
        ),
        blanks: [
          { accept: ["40"], label: { en: "rows <code>SUMX</code> walks over", ar: "الصفوف التي يمرّ عليها <code>SUMX</code>" } },
          { accept: ["1020.00", "1020", "1,020.00", "1020.0"], label: { en: "<code>Total Revenue</code>", ar: "<code>Total Revenue</code>" } },
          { accept: ["39"], label: { en: "<code>Orders Count</code>", ar: "<code>Orders Count</code>" } },
          { accept: ["26.15"], label: { en: "<code>Revenue per Order</code>", ar: "<code>Revenue per Order</code>" } }
        ],
        hint: {
          en: "<code>SUMX</code> sees the rows the context leaves visible, not the whole table. Then ask which of the two counts — lines or orders — <code>DISTINCTCOUNT</code> answers.",
          ar: "يرى <code>SUMX</code> الصفوف التي يُبقيها السياق مرئية، لا الجدول كله. ثم اسأل: أي العدّين — الأسطر أم الطلبات — يجيب عنه <code>DISTINCTCOUNT</code>؟"
        },
        explain: {
          en: "The bar’s own category is a filter. It starts on <code>Menu</code>, travels through the relationship to <code>Orders</code>, and leaves only the 40 Chicken Rice lines visible, so <code>SUMX</code> walks over those 40 rows and no others: 68 portions at 15.00 is 1,020.00. <code>DISTINCTCOUNT(Orders[order_id])</code> asks a different question of the same 40 rows and answers 39, because one order holds two Chicken Rice lines; <code>COUNTROWS(Orders)</code> would have said 40 and <code>SUM(Orders[qty])</code> 68 — three defensible numbers for three different questions. <code>DIVIDE(1020, 39)</code> is 26.1538, shown as 26.15: the highest revenue per order of the top three items, because Chicken Rice is the most expensive thing on the menu (compare the Falafel Sandwich bar, 917.00 over 84 orders, 10.92). Not one character of the three formulas changed between this bar and the next; remove every filter and the same three lines give 8,062.00, 611 and 13.19. That is what “a measure is a question asked in a context” means.",
          ar: "فئة الشريط نفسها مرشِّح. يبدأ على <code>Menu</code> ويسافر عبر العلاقة إلى <code>Orders</code>، فلا يُبقي مرئيًّا إلا أسطر Chicken Rice الـ 40، فيمرّ <code>SUMX</code> على تلك الصفوف الأربعين ولا غيرها: 68 حصة بـ 15.00 تساوي 1,020.00. ويسأل <code>DISTINCTCOUNT(Orders[order_id])</code> سؤالًا آخر عن الصفوف الأربعين نفسها فيجيب 39، لأن طلبًا واحدًا يحوي سطري Chicken Rice؛ وكان <code>COUNTROWS(Orders)</code> سيقول 40 و<code>SUM(Orders[qty])</code> سيقول 68 — ثلاثة أرقام يمكن الدفاع عنها لثلاثة أسئلة مختلفة. و<code>DIVIDE(1020, 39)</code> يساوي 26.1538، ويُعرَض 26.15: وهو أعلى إيراد لكل طلب بين الأصناف الثلاثة الأولى، لأن Chicken Rice أغلى ما في القائمة (قارن شريط فلافل ساندويتش: 917.00 على 84 طلبًا، أي 10.92). ولم يتغيّر حرفٌ واحد من الصيغ الثلاث بين هذا الشريط والذي يليه؛ وأزِل كل مرشِّح فتعطي الأسطر الثلاثة نفسها 8,062.00 و611 و13.19. وهذا معنى «المقياس سؤالٌ يُطرَح في سياق»."
        }
      },

      /* ---------------------------------------------------------- 21 */
      {
        id: "p1l5q21", type: "write", level: "medium",
        topics: ["p1-dax-measures", "p1-measure-vs-column"],
        lang: "dax",
        q: {
          en: "The model holds <code>Orders</code> (748 rows: <code>order_id</code>, <code>order_time</code>, <code>item</code>, <code>category</code>, <code>qty</code>, <code>unit_price</code>, <code>payment</code>, <code>customer_type</code>) and no <code>line_total</code> column. Write the three measures so that three cards read 8,062.00 | 611 | 13.19 with no filter, and 1,716.50 | 154 | 11.15 when a slicer is set to Staff. Keep the three names, and build the third one out of the first two.",
          ar: "يحوي النموذج <code>Orders</code> (748 صفًّا: <code>order_id</code> و<code>order_time</code> و<code>item</code> و<code>category</code> و<code>qty</code> و<code>unit_price</code> و<code>payment</code> و<code>customer_type</code>) ولا عمود <code>line_total</code> فيه. اكتب المقاييس الثلاثة حتى تقرأ ثلاث بطاقات 8,062.00 | 611 | 13.19 دون مرشِّح، و1,716.50 | 154 | 11.15 حين يُضبط مقطِّع على Staff. أبقِ الأسماء الثلاثة، وابنِ الثالث من الأولين."
        },
        starter: code(
          "Total Revenue = ",
          "Orders Count = ",
          "Revenue per Order = "
        ),
        lines: 5,
        checks: [
          {
            re: "SUMX\\s*\\(\\s*Orders\\s*,",
            flags: "i",
            label: {
              en: "Iterate the rows of <code>Orders</code> with <code>SUMX</code>",
              ar: "مُرّ على صفوف <code>Orders</code> بـ <code>SUMX</code>"
            }
          },
          {
            re: "Orders\\s*\\[\\s*qty\\s*\\]\\s*\\*\\s*Orders\\s*\\[\\s*unit_price\\s*\\]|Orders\\s*\\[\\s*unit_price\\s*\\]\\s*\\*\\s*Orders\\s*\\[\\s*qty\\s*\\]",
            flags: "i",
            label: {
              en: "Multiply <code>qty</code> by <code>unit_price</code> row by row, inside the iterator",
              ar: "اضرب <code>qty</code> في <code>unit_price</code> صفًّا صفًّا داخل المُكرِّر"
            }
          },
          {
            re: "DISTINCTCOUNT\\s*\\(\\s*Orders\\s*\\[\\s*order_id\\s*\\]\\s*\\)",
            flags: "i",
            label: {
              en: "Count different orders with <code>DISTINCTCOUNT(Orders[order_id])</code>",
              ar: "عُدّ الطلبات المختلفة بـ <code>DISTINCTCOUNT(Orders[order_id])</code>"
            }
          },
          {
            re: "DIVIDE\\s*\\(\\s*\\[\\s*Total Revenue\\s*\\]\\s*,\\s*\\[\\s*Orders Count\\s*\\]\\s*\\)",
            flags: "i",
            label: {
              en: "Divide safely with <code>DIVIDE</code>, reusing the two measures by name",
              ar: "اقسم بأمان بـ <code>DIVIDE</code>، معيدًا استعمال المقياسين بالاسم"
            }
          }
        ],
        forbid: [
          {
            re: "COUNTROWS",
            flags: "i",
            label: {
              en: "<code>COUNTROWS</code>, which counts lines (748), not orders (611)",
              ar: "<code>COUNTROWS</code>، فهو يعدّ الأسطر (748) لا الطلبات (611)"
            }
          },
          {
            re: "AVERAGE\\s*\\(",
            flags: "i",
            label: {
              en: "<code>AVERAGE</code> of a price: the product of two summaries is not the sum of the products",
              ar: "<code>AVERAGE</code> لسعر: فحاصل ضرب تلخيصين ليس مجموع الحواصل"
            }
          },
          {
            re: "\\]\\s*/\\s*\\[",
            label: {
              en: "plain division of one measure by another, which errors or returns Infinity on an empty slice",
              ar: "القسمة العادية لمقياس على آخر، فهي تُخطئ أو تعيد ما لا نهاية على شريحة فارغة"
            }
          }
        ],
        solution: {
          code: code(
            "Total Revenue = SUMX(Orders, Orders[qty] * Orders[unit_price])",
            "Orders Count = DISTINCTCOUNT(Orders[order_id])",
            "Revenue per Order = DIVIDE([Total Revenue], [Orders Count])",
            "",
            "// no filter      ->  8,062.00 | 611 | 13.19",
            "// Staff slicer   ->  1,716.50 | 154 | 11.15"
          ),
          en: "<code>SUMX</code> multiplies on each row and adds afterwards, so no <code>line_total</code> column is needed; <code>DISTINCTCOUNT</code> counts orders rather than lines; and <code>DIVIDE</code> reuses the other two by name, so the ratio is right in every filter context and blank rather than broken when a slice is empty.",
          ar: "يضرب <code>SUMX</code> على كل صف ثم يجمع، فلا حاجة إلى عمود <code>line_total</code>؛ ويعدّ <code>DISTINCTCOUNT</code> الطلبات لا الأسطر؛ ويعيد <code>DIVIDE</code> استعمال الآخرين بالاسم، فتصحّ النسبة في كل سياق مرشِّح وتكون فراغًا لا كسرًا حين تفرغ الشريحة."
        },
        hint: {
          en: "Revenue needs a product <em>before</em> a sum, so plain <code>SUM</code> cannot do it. Then ask which count answers “how many orders” on 748 lines, and which division survives an empty slicer selection.",
          ar: "يحتاج الإيراد ضربًا <em>قبل</em> الجمع، فلا يستطيع <code>SUM</code> العادي ذلك. ثم اسأل: أي عدٍّ يجيب عن «كم طلبًا» على 748 سطرًا، وأي قسمة تنجو من اختيار فارغ في المقطِّع؟"
        },
        explain: {
          en: "<code>SUMX(table, expression)</code> is an iterator — its name ends in X — and that is the whole point: it evaluates <code>qty * unit_price</code> on each of the visible rows and adds the results, so the model needs no stored <code>line_total</code> at all. <code>SUM(Orders[qty]) * AVERAGE(Orders[unit_price])</code> is the tempting shortcut and gives 8,084.87, because the sum of products is not the product of sums. <code>DISTINCTCOUNT</code> counts different <code>order_id</code> values, 611, where <code>COUNTROWS(Orders)</code> would count the 748 lines; “how much per order” is a question about orders. <code>DIVIDE</code> is not decoration either: it returns a blank instead of an error or Infinity when the denominator is zero or blank, so a slicer selection with no orders shows nothing rather than nonsense. Because the third measure refers to the other two by name, all three follow every filter: no filter gives 8,062.00 | 611 | 13.19, and Staff gives 1,716.50 | 154 | 11.15.",
          ar: "<code>SUMX(table, expression)</code> مُكرِّرٌ — ينتهي اسمه بحرف X — وهذا هو المقصد كله: فهو يحسب <code>qty * unit_price</code> على كل صف مرئي ثم يجمع النواتج، فلا يحتاج النموذج إلى عمود <code>line_total</code> مخزَّن أصلًا. و<code>SUM(Orders[qty]) * AVERAGE(Orders[unit_price])</code> هو الاختصار المغري ويعطي 8,084.87، لأن مجموع الحواصل ليس حاصل المجاميع. ويعدّ <code>DISTINCTCOUNT</code> قيم <code>order_id</code> المختلفة، 611، حيث كان <code>COUNTROWS(Orders)</code> سيعدّ الأسطر الـ 748؛ و«كم لكل طلب» سؤال عن الطلبات. و<code>DIVIDE</code> ليس زينة كذلك: فهو يعيد فراغًا بدل خطأ أو ما لا نهاية حين يكون المقام صفرًا أو فراغًا، فيُظهر اختيارٌ بلا طلبات لا شيء بدل الهُراء. ولأن المقياس الثالث يشير إلى الآخرين بالاسم تتبع الثلاثة كل مرشِّح: فبلا مرشِّح 8,062.00 | 611 | 13.19، ومع Staff 1,716.50 | 154 | 11.15."
        }
      },

      /* ---------------------------------------------------------- 22 */
      {
        id: "p1l5q22", type: "complete", level: "medium",
        topics: ["p1-report-visuals", "p1-one-page-layout"],
        lang: "text",
        q: {
          en: "Version 2 of the visual evolve turns the default sixteen-column chart into the chart the manager asked for. One line of the recipe is missing. Which line belongs in the gap?",
          ar: "تحوّل النسخة 2 من تطوّر العنصر المرئي المخططَ الافتراضيَّ ذا الأعمدة الستة عشر إلى المخطط الذي طلبه المدير. وسطرٌ من الوصفة ناقص. أي سطر يلائم الفراغ؟"
        },
        code: code(
          "Visual   : Clustered bar chart",
          "Y-axis   : item                 (from Menu)",
          "X-axis   : Total Revenue        (the measure of Concept 6)",
          "Filters  : on this visual > item > ____",
          "Format   : Data labels On,  Display units None,  2 decimal places",
          'Title    : "Top 3 items by revenue"',
          "Expected : Shawarma Wrap 1,368.00 | Chicken Rice 1,020.00 | Falafel Sandwich 917.00"
        ),
        options: [
          { code: "Filter type: Top N  >  Show items: Top, 3  >  By value: Total Revenue  >  Apply filter" },
          { code: "Filter type: Basic filtering  >  tick Shawarma Wrap, Chicken Rice, Falafel Sandwich" },
          { code: "Filter type: Top N  >  Show items: Top, 3  >  By value: item  >  Apply filter" },
          { code: 'Filter type: Advanced filtering  >  item contains "Shawarma", "Chicken", "Falafel"' }
        ],
        answer: 0,
        solution: {
          code: code(
            "Filters  : on this visual > item >",
            "           Filter type: Top N",
            "           Show items: Top, 3",
            "           By value: Total Revenue",
            "           Apply filter",
            "",
            "-> Shawarma Wrap 1,368.00 | Chicken Rice 1,020.00 | Falafel Sandwich 917.00",
            "   (together 3,305.00 = 41% of 8,062.00)"
          ),
          en: "A Top N filter needs the N and a measure to rank by, then <em>Apply filter</em>. It keeps answering the question after a refresh, because it ranks rather than lists.",
          ar: "يحتاج مرشِّح Top N إلى العدد وإلى مقياس يرتّب به، ثم <em>Apply filter</em>. ويظل يجيب عن السؤال بعد التحديث، لأنه يرتّب ولا يسرد."
        },
        hint: {
          en: "A Top N filter needs two things: how many, and by what. Then ask which of the four options still shows the right three items next month.",
          ar: "يحتاج مرشِّح Top N إلى شيئين: كم، وبأي شيء. ثم اسأل: أي الخيارات الأربعة سيعرض الأصناف الثلاثة الصحيحة في الشهر القادم؟"
        },
        explain: {
          en: "<em>Top N</em> ranks a field by a <em>measure</em>, so it needs both the N (3) and the value to rank by (<code>Total Revenue</code>), and then <em>Apply filter</em>. Today it shows Shawarma Wrap 1,368.00, Chicken Rice 1,020.00 and Falafel Sandwich 917.00 — together 3,305.00, 41% of 8,062.00 — and next month it shows next month’s top three. The tempting option is the basic filter with the three names ticked: it produces exactly the same chart today, which is why it survives review, and it freezes today’s answer into the report — after a refresh it still shows those three even if a fourth item has overtaken them, with no error and no blank. Ranking “by value: item” is not a ranking at all, because Top N needs a number, and an Advanced text filter matches spelling rather than rank, so a new item called Chicken Shawarma would walk straight in. Version 2 is still one chart on a blank page: no total for scale, no way to ask “and for Staff?”, and no answer to the second half of the manager’s question — which is what Version 3’s three cards, hour chart and slicer add.",
          ar: "يرتّب <em>Top N</em> حقلًا بحسب <em>مقياس</em>، فيحتاج العدد (3) والقيمة التي يرتّب بها (<code>Total Revenue</code>)، ثم <em>Apply filter</em>. ويعرض اليوم Shawarma Wrap 1,368.00 وChicken Rice 1,020.00 وFalafel Sandwich 917.00 — ومجموعها 3,305.00، أي 41% من 8,062.00 — وفي الشهر القادم يعرض أعلى ثلاثة في ذلك الشهر. والخيار المغري هو المرشِّح الأساسي بالأسماء الثلاثة مؤشَّرة: فهو ينتج المخطط نفسه تمامًا اليوم، ولهذا ينجو من المراجعة، وهو يجمّد جواب اليوم داخل التقرير — فبعد التحديث يظل يعرض تلك الثلاثة وإن سبقها صنف رابع، دون خطأ ودون فراغ. والترتيب «by value: item» ليس ترتيبًا أصلًا، لأن Top N يحتاج رقمًا، ومرشِّح النص المتقدّم يطابق التهجئة لا الرتبة، فيدخل صنفٌ جديد اسمه Chicken Shawarma مباشرةً. والنسخة 2 تبقى مخططًا واحدًا على صفحة خالية: لا إجمالي للمقياس، ولا سبيل لسؤال «وماذا عن Staff؟»، ولا جواب للنصف الثاني من سؤال المدير — وهو ما تضيفه بطاقات النسخة 3 الثلاث ومخطط الساعات والمقطِّع."
        }
      },
      /* ---------------------------------------------------------- 23 */
      {
        id: "p1l5q23", type: "multi", level: "hard",
        topics: ["p1-pbi-pitfalls"],
        q: {
          en: "Your one-page report is finished and right: 8,062.00, 611 orders, 12:00 the busiest hour. October’s file arrives with the same eight columns and the same name, you put it in the <code>DataFolder</code> and press <em>Refresh</em>. Which statements are true? Choose all that apply.",
          ar: "تقرير صفحتك الواحدة منتهٍ وصحيح: 8,062.00 و611 طلبًا و12:00 ساعة الذروة. ويصل ملف أكتوبر بالأعمدة الثمانية نفسها والاسم نفسه، فتضعه في <code>DataFolder</code> وتضغط <em>Refresh</em>. أي العبارات صحيحة؟ اختر كل ما ينطبق."
        },
        options: [
          {
            en: "A new Shawarma Wrap typed <code>45.0</code> passes the <code>&lt; 50</code> test, and its 45.00 joins the revenue with no warning.",
            ar: "شاورما جديدة مكتوبة <code>45.0</code> تجتاز اختبار <code>&lt; 50</code>، وتنضم 45.00 إلى الإيراد دون أي تحذير."
          },
          {
            en: "Refresh re-detects the column types from the new rows, so a file whose <code>n/a</code> price arrives on row 5,000 is handled correctly this time.",
            ar: "يعيد Refresh كشف أنواع الأعمدة من الصفوف الجديدة، فيُعالَج صحيحًا هذه المرة ملفٌّ يصل فيه سعر <code>n/a</code> في الصف 5,000."
          },
          {
            en: "An item that is not on the menu shows up as a <em>(Blank)</em> group in any visual grouped by <code>Menu[category]</code> — the Left Anti check, drawn as a chart.",
            ar: "صنفٌ ليس في القائمة يظهر مجموعة <em>(Blank)</em> في أي عنصر مرئي مجمَّع بـ <code>Menu[category]</code> — فحص Left Anti مرسومًا مخططًا."
          },
          {
            en: "Because the report was right before the refresh, the totals can only change if the new data is genuinely different; a cleaning failure would show as an error or an empty visual.",
            ar: "ولأن التقرير كان صحيحًا قبل التحديث فلا تتغير الإجماليات إلا إذا كانت البيانات الجديدة مختلفة فعلًا؛ وفشل التنظيف سيظهر خطأً أو عنصرًا مرئيًّا فارغًا."
          },
          {
            en: "The three reconciliations — the row count at each Applied Step, a control total reached by an independent route, and a Left Anti query that must return zero rows — are the cheapest way to find out, and they belong to building the page.",
            ar: "المطابقات الثلاث — عدد الصفوف عند كل خطوة مطبَّقة، وإجمالي ضابط يُبلَغ بطريق مستقل، واستعلام Left Anti يجب أن يعيد صفرًا من الصفوف — هي أرخص طريقة لمعرفة الحال، وهي من بناء الصفحة."
          }
        ],
        answer: [0, 2, 4],
        hint: {
          en: "Refresh replays something. Ask exactly what it replays, and which of the lesson’s eight pitfalls announces itself with a message.",
          ar: "يعيد Refresh تشغيل شيء. فاسأل بدقة: ما الذي يعيد تشغيله؟ وأي مطبّ من مطبّات الدرس الثمانية يعلن عن نفسه برسالة؟"
        },
        explain: {
          en: "Refresh reads the source files again, replays <em>these</em> Applied Steps on whatever is in them, and reloads the model. Nothing more happens: no new cleaning rule appears, so a price of 45.0 is a plausible-looking number below a hand-picked threshold and flows straight through, and an unknown item gets no <code>category</code> and no <code>list_price</code> and lands in a <em>(Blank)</em> group — which is the Left Anti check showing up as a bar you have to notice. The two false statements are the two comfortable beliefs the lesson exists to break. Type detection is not re-run: it is a recorded step, the type was decided once, and a late <code>n/a</code> becomes an Error cell at refresh time instead — possibly months after you stopped looking. And “it was right before, so it is right now” is the whole danger of a polished page: none of the eight pitfalls raises an error message, each one is found only by somebody who knows what number to expect, and a well-aligned visual makes a wrong number <em>more</em> convincing, not less. Hence the three reconciliations, and watching <code>Orders Count</code> and <code>Revenue per Order</code> for jumps.",
          ar: "يقرأ Refresh ملفات المصدر مرة أخرى، ويعيد تشغيل <em>هذه</em> الخطوات المطبَّقة على ما فيها، ويعيد تحميل النموذج. ولا يحدث شيء غير ذلك: فلا تظهر قاعدة تنظيف جديدة، فيكون سعر 45.0 رقمًا معقول المنظر تحت عتبة اختارها إنسان فيمرّ مباشرة، ويبقى الصنف المجهول بلا <code>category</code> وبلا <code>list_price</code> فيحلّ في مجموعة <em>(Blank)</em> — وهي فحص Left Anti يظهر شريطًا عليك أن تلاحظه. والعبارتان الخاطئتان هما الاعتقادان المريحان اللذان وُجد هذا الدرس لكسرهما. فالكشف عن الأنواع لا يُعاد: إنه خطوة مسجّلة، وقد قُرِّر النوع مرة واحدة، فتصبح <code>n/a</code> متأخرة خلية خطأ وقت التحديث — ربما بعد شهور من توقفك عن النظر. و«كان صحيحًا قبلًا فهو صحيح الآن» هو خطر الصفحة الأنيقة كله: فما من مطبّ من الثمانية يرفع رسالة خطأ، ولا يجد كلَّ واحد منها إلا من يعرف الرقم الذي يتوقعه، والعنصر المرئي المحاذى بعناية يجعل الرقم الخاطئ <em>أكثر</em> إقناعًا لا أقل. ومن هنا كانت المطابقات الثلاث، ومراقبة <code>Orders Count</code> و<code>Revenue per Order</code> تحسُّبًا للقفزات."
        }
      },

      /* ---------------------------------------------------------- 24 */
      {
        id: "p1l5q24", type: "mcq", level: "easy",
        topics: ["p1-pbix-refresh", "p1-publish-export"],
        q: {
          en: "You e-mail your finished <code>.pbix</code> to a classmate who has Power BI Desktop and no Power BI account. She opens it, the whole report draws correctly, and then she presses <em>Refresh</em> and gets “Could not find file …” with a path on <em>your</em> disk. Which answer is right?",
          ar: "ترسل ملف <code>.pbix</code> المنتهي بالبريد إلى زميلة تملك Power BI Desktop ولا تملك حساب Power BI. تفتحه فيُرسم التقرير كله صحيحًا، ثم تضغط <em>Refresh</em> فتحصل على «Could not find file …» مع مسار على قرصك <em>أنت</em>. أي جواب صحيح؟"
        },
        options: [
          {
            en: "The report drew because the visuals are pictures stored in the file; the model is empty until a refresh succeeds, so she cannot read a single number until the path is fixed.",
            ar: "رُسم التقرير لأن العناصر المرئية صور مخزَّنة في الملف؛ والنموذج فارغ إلى أن ينجح التحديث، فلا تستطيع أن تقرأ رقمًا واحدًا قبل إصلاح المسار."
          },
          {
            en: "A <code>.pbix</code> carries a compressed copy of the data, which is why the report drew offline; only Refresh needs the sources, so she edits the <code>DataFolder</code> parameter to her own folder and both queries follow.",
            ar: "يحمل ملف <code>.pbix</code> نسخة مضغوطة من البيانات، ولهذا رُسم التقرير دون اتصال؛ والتحديث وحده يحتاج المصادر، فتعدّل وسيط <code>DataFolder</code> إلى مجلّدها فيتبعه الاستعلامان."
          },
          {
            en: "She should publish the file to the Power BI Service, which stores the CSV files for her and fetches them at refresh time; that is what Publish is for, and it works with any e-mail address.",
            ar: "عليها أن تنشر الملف في خدمة Power BI، فهي تخزّن ملفات CSV نيابةً عنها وتجلبها وقت التحديث؛ وهذا هو الغرض من Publish، ويعمل بأي عنوان بريد."
          },
          {
            en: "Send her a <code>.pbit</code> template instead: a template carries the rows as well as the report, so there is no refresh to do and no path to fix.",
            ar: "أرسل لها قالب <code>.pbit</code> بدلًا من ذلك: فالقالب يحمل الصفوف مع التقرير، فلا تحديث يُجرى ولا مسار يُصلَح."
          }
        ],
        answer: 1,
        hint: {
          en: "The report drew without the CSV files — so what came with it inside the file? Then ask where Version 3 put the only machine-specific fact.",
          ar: "رُسم التقرير دون ملفات CSV — فما الذي جاء معه داخل الملف؟ ثم اسأل: أين وضعت النسخة 3 الحقيقة الوحيدة الخاصة بالجهاز؟"
        },
        explain: {
          en: "Inside a <code>.pbix</code> are the report pages, the data model, the queries with their Applied Steps and — because a CSV or Excel source is always <em>imported</em> — a compressed copy of the data itself. That is why the file opens offline and every visual works without the CSV, and it is also the reason not to e-mail a file holding real student or customer records to people who may not see them. Refresh is the one thing that needs the sources again, and Version 3 put the only machine-specific fact in a single place: Home → Transform data → <em>Edit parameters</em>, type her folder, and both the <code>Orders</code> and the <code>Menu</code> query follow it. Publishing is the tempting answer, because “the cloud has the file” sounds right: it needs an account, normally a work or school one, and a scheduled refresh of a file on a private disk needs an on-premises data gateway, because the Service cannot reach into your <code>C:</code> drive. The template is the opposite of what the last option says — a <code>.pbit</code> holds the report, model and queries but <em>no</em> rows, which is how you share the structure without the data. Routes that need no account at all: the <code>.pbix</code> itself, or File → Export → <em>Export to PDF</em>.",
          ar: "داخل ملف <code>.pbix</code> صفحاتُ التقرير ونموذج البيانات والاستعلامات بخطواتها المطبَّقة و— لأن مصدر CSV أو Excel <em>مستورد</em> دائمًا — نسخةٌ مضغوطة من البيانات نفسها. ولهذا يُفتح الملف دون اتصال ويعمل كل عنصر مرئي بغير ملف CSV، ولهذا أيضًا لا تُرسل بالبريد ملفًّا يحوي سجلات طلبة أو عملاء حقيقية إلى من قد لا يُسمح لهم برؤيتها. والتحديث هو الشيء الوحيد الذي يحتاج المصادر مرة أخرى، وقد وضعت النسخة 3 الحقيقة الوحيدة الخاصة بالجهاز في موضع واحد: Home ← Transform data ← <em>Edit parameters</em>، فتكتب مجلّدها فيتبعه استعلام <code>Orders</code> واستعلام <code>Menu</code> معًا. والنشر هو الجواب المغري، لأن «السحابة تملك الملف» يبدو صحيحًا: فهو يحتاج حسابًا، عادةً حساب عمل أو مدرسة، ويحتاج التحديث المجدول لملف على قرص خاص بوابة بيانات محلية (on-premises data gateway)، لأن الخدمة لا تستطيع الوصول إلى قرصك <code>C:</code>. والقالب عكس ما يقوله الخيار الأخير — فملف <code>.pbit</code> يحوي التقرير والنموذج والاستعلامات ولا يحوي <em>صفوفًا</em>، وهذه هي طريقة مشاركة البنية دون البيانات. والطرق التي لا تحتاج حسابًا إطلاقًا: ملف <code>.pbix</code> نفسه، أو File ← Export ← <em>Export to PDF</em>."
        }
      }

    ]
  };
})();
