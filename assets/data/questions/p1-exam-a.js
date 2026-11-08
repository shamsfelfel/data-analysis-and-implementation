window.DABanks = window.DABanks || {};
(function () {
  /* code(line, line, ...) -> one string with \n between lines */
  function code() { return Array.prototype.join.call(arguments, "\n"); }

  window.DABanks["p1-exam-a"] = {
    title: {
      en: "Chapter Test A — Core",
      ar: "اختبار الفصل أ — الأساسيات"
    },
    intro: {
      en: "24 questions that sample the whole chapter, four per lesson: the ideas every student must own. They run in lesson order — the analysis lifecycle and the question card, the workbench (virtual environment, pinned versions, <code>check_env.py</code>), notebooks and hidden state, Excel Tables and PivotTables, Power BI's Applied Steps and measures, and the five cleaning rules with the reconciliation and the brief. Everything is the one cafeteria file: 771 raw lines, 748 counted, revenue 8,062.00. Most questions are easy or medium. Python outputs are from Python 3.13, pandas 2.2 and NumPy 2.2; the Excel and Power BI figures were computed from the same file. Plan for about 40 minutes. Every question has a hint, an answer and an explanation, hidden until you ask for them: try first, then open them. A revealed answer is not counted.",
      ar: "24 سؤالًا تغطي الفصل كله بواقع أربعة أسئلة لكل درس: الأفكار التي يجب أن يتقنها كل طالب. تسير بترتيب الدروس &mdash; دورة حياة التحليل وبطاقة السؤال، وبيئة العمل (البيئة الافتراضية وتثبيت الإصدارات و<code>check_env.py</code>)، والدفاتر والحالة الخفية، وجداول Excel والجداول المحورية، وخطوات Power BI المطبَّقة ومقاييسه، ثم قواعد التنظيف الخمس مع المطابقة والموجز. وكل شيء على ملف الكافتيريا الواحد: 771 سطرًا خامًا، و748 سطرًا معدودًا، وإيراد 8,062.00. أغلب الأسئلة سهل أو متوسط. نواتج Python من Python 3.13 وpandas 2.2 وNumPy 2.2؛ وأرقام Excel وPower BI محسوبة من الملف نفسه. خصّص نحو 40 دقيقة. لكل سؤال تلميح وجواب وشرح، وكلها مخفية حتى تطلبها: جرّب أولًا ثم افتحها. والجواب الذي يُظهَر لا يُحتسب."
    },
    questions: [
      {
        id: "p1ax01",
        type: "match",
        level: "easy",
        topics: [
          "p1-four-kinds",
          "p1-data-analysis"
        ],
        q: {
          en: "The cafeteria manager asks four things. Match each question to its kind and to what that kind needs before it can be answered.",
          ar: "يسأل مدير الكافتيريا أربعة أسئلة. وصّل كل سؤال بنوعه وبما يحتاجه هذا النوع قبل أن يمكن الإجابة عنه."
        },
        pairs: [
          {
            l: {
              en: "&ldquo;What was the total revenue in September 2026?&rdquo;",
              ar: "«كم بلغ إجمالي الإيراد في أيلول 2026؟»"
            },
            r: {
              en: "Descriptive &mdash; needs correct records and a clear counting rule",
              ar: "وصفي &mdash; يحتاج سجلات صحيحة وقاعدة عدّ واضحة"
            }
          },
          {
            l: {
              en: "&ldquo;Why was Sunday busier than Monday?&rdquo;",
              ar: "«لماذا كان الأحد أكثر ازدحامًا من الاثنين؟»"
            },
            r: {
              en: "Diagnostic &mdash; needs comparisons, and context the order file may not contain",
              ar: "تشخيصي &mdash; يحتاج مقارنات وسياقًا قد لا يحتويه ملف الطلبات"
            }
          },
          {
            l: {
              en: "&ldquo;How many orders will arrive in the 12:00 hour next Sunday?&rdquo;",
              ar: "«كم طلبًا سيصل في الساعة 12:00 يوم الأحد القادم؟»"
            },
            r: {
              en: "Predictive &mdash; needs history, and a pattern that is likely to continue",
              ar: "تنبؤي &mdash; يحتاج تاريخًا ونمطًا يُرجَّح أن يستمر"
            }
          },
          {
            l: {
              en: "&ldquo;How many wraps should we prepare on Sunday morning?&rdquo;",
              ar: "«كم ساندويتش شاورما نحضّر صباح الأحد؟»"
            },
            r: {
              en: "Prescriptive &mdash; needs a forecast, the costs, and the rules about what is allowed",
              ar: "توجيهي &mdash; يحتاج توقعًا والتكاليف والقواعد التي تحدّد المسموح"
            }
          }
        ],
        leftHead: {
          en: "What the manager asked",
          ar: "ما سأله المدير"
        },
        rightHead: {
          en: "Kind, and what it needs",
          ar: "النوع وما يحتاجه"
        },
        hint: {
          en: "Four words decide it: <em>what</em> happened, <em>why</em> it happened, what <em>will</em> happen, what we <em>should</em> do.",
          ar: "أربع كلمات تحسم الأمر: <em>ماذا</em> حدث، و<em>لماذا</em> حدث، وماذا <em>سيحدث</em>، وماذا <em>يجب</em> أن نفعل."
        },
        explain: {
          en: "The kind of question decides what you need and what can go wrong. A descriptive question is arithmetic over the right rows, so its trap is counting rows that should not count (the 16 repeated lines, the 5 refunds). A diagnostic question asks for a reason, and the reason &mdash; weather, an exam, a closed gate &mdash; is often not in the file at all. A predictive question needs history and the assumption that the pattern holds. A prescriptive question needs a forecast <em>plus</em> things the data never recorded: staff, waste, cost. It is a ladder, not a ranking of worth: most cafeteria decisions need only the first rung done carefully, and a forecast built on a miscounted total is a wrong forecast.",
          ar: "نوع السؤال يحدّد ما تحتاجه وما الذي قد يفسد. السؤال الوصفي حسابٌ على الصفوف الصحيحة، ففخّه عدّ صفوف لا ينبغي عدّها (الأسطر الـ16 المكررة والمرتجعات الخمسة). والسؤال التشخيصي يطلب سببًا، والسبب &mdash; طقس أو امتحان أو بوابة مغلقة &mdash; غالبًا ليس في الملف أصلًا. والسؤال التنبؤي يحتاج تاريخًا وافتراض أن النمط سيستمر. والسؤال التوجيهي يحتاج توقعًا <em>مع</em> أشياء لم تسجّلها البيانات قط: العاملون والهدر والتكلفة. وهو سلّم لا ترتيب للقيمة: فمعظم قرارات الكافتيريا تحتاج الدرجة الأولى منجزة بعناية فقط، والتوقع المبني على مجموع خاطئ توقع خاطئ."
        }
      },
      {
        id: "p1ax02",
        type: "mcq",
        level: "medium",
        topics: [
          "p1-measure-changes-answer",
          "p1-question-refinement",
          "p1-question-card"
        ],
        q: {
          en: "Three analysts answer <em>&ldquo;what sells?&rdquo;</em> on the same cleaned table. By order lines the top item is Tea (92 lines); by units it is Tea again (154 cups); by money it is Shawarma Wrap (1,368.00, against Tea's 462.00). All three did the arithmetic correctly and all three used September 2026. What has to be written down before anyone computes, so that two analysts working separately get the <em>same number</em>?",
          ar: "يجيب ثلاثة محللين عن <em>«ما الذي يُباع؟»</em> على الجدول المنظَّف نفسه. بعدّ أسطر الطلبات يتصدّر الشاي (92 سطرًا)؛ وبالوحدات يتصدّر الشاي أيضًا (154 كوبًا)؛ وبالمال تتصدّر الشاورما (1,368.00 مقابل 462.00 للشاي). وقد حسب الثلاثة حسابهم بشكل صحيح، واستعملوا جميعًا أيلول 2026. فما الذي يجب كتابته قبل أن يحسب أحد، كي يحصل محللان يعملان منفصلين على <em>الرقم نفسه</em>؟"
        },
        options: [
          {
            en: "The period: <code>in September 2026</code>. Once the month is fixed the three lists collapse into one.",
            ar: "الفترة: <code>in September 2026</code>. فبتثبيت الشهر تندمج القوائم الثلاث في قائمة واحدة."
          },
          {
            en: "A <code>DECISION</code> line naming who will act on the answer; without it nobody can check the number.",
            ar: "سطر <code>DECISION</code> يسمّي من سيتصرف بناءً على الجواب؛ فبدونه لا يستطيع أحد التحقق من الرقم."
          },
          {
            en: "A <code>MEASURE</code> line that writes the formula: <code>revenue = qty x unit_price, summed per item</code>.",
            ar: "سطر <code>MEASURE</code> يكتب المعادلة: <code>revenue = qty x unit_price, summed per item</code>."
          },
          {
            en: "A cleaning rule for the 16 repeated lines; the disagreement comes from counting dirty rows.",
            ar: "قاعدة تنظيف للأسطر الـ16 المكررة؛ فالخلاف ناتج عن عدّ صفوف متسخة."
          }
        ],
        answer: 2,
        hint: {
          en: "The three analysts differ in one word of the request. Which word, and what would pin it down to one arithmetic?",
          ar: "يختلف المحللون الثلاثة في كلمة واحدة من الطلب. أي كلمة؟ وما الذي يثبّتها على حساب واحد؟"
        },
        explain: {
          en: "&ldquo;Sells&rdquo; can mean lines, units, money or profit, and the file answers all four. Writing the measure is what removes the choice: Version 3 of the question card adds <code>Which three items earned the most revenue in September 2026?</code> and the <code>MEASURE</code> line, and from then on two analysts compute the same number. The period is already the same for all three, so it changes nothing here. The <code>DECISION</code> line is Version 4's job and it is genuinely important &mdash; it is what lets you judge whether the answer is <em>useful</em> &mdash; but it does not change the number. And the cleaning is not the culprit: all three worked on the same cleaned table, which is why the disagreement is so dangerous. Nothing crashes and nothing warns; stock by the first list and you buy tea, by the third and you buy wraps and rice.",
          ar: "كلمة «يُباع» قد تعني أسطرًا أو وحدات أو مالًا أو ربحًا، والملف يجيب عن الأربعة. وكتابة المقياس هي التي تُلغي الاختيار: فالنسخة 3 من بطاقة السؤال تضيف <code>Which three items earned the most revenue in September 2026?</code> وسطر <code>MEASURE</code>، ومن تلك اللحظة يحسب محللان الرقم نفسه. والفترة واحدة للثلاثة أصلًا، فلا تغيّر شيئًا هنا. وسطر <code>DECISION</code> عمل النسخة 4 وهو مهم فعلًا &mdash; فهو ما يجعلك تحكم هل الجواب <em>مفيد</em> &mdash; لكنه لا يغيّر الرقم. والتنظيف ليس المتهم: فقد عمل الثلاثة على الجدول المنظَّف نفسه، ولهذا كان الخلاف خطيرًا إلى هذا الحد. لا شيء ينهار ولا شيء يحذّر؛ فإن خزّنت بحسب القائمة الأولى اشتريت شايًا، وبحسب الثالثة اشتريت شاورما وأرزًا."
        }
      },
      {
        id: "p1ax03",
        type: "order",
        level: "easy",
        topics: [
          "p1-lifecycle-stages",
          "p1-loop-back"
        ],
        q: {
          en: "Put the seven stages of the analysis lifecycle in the order in which they run, each named by the artifact it leaves behind.",
          ar: "رتّب أطوار دورة حياة التحليل السبعة بالترتيب الذي تجري به، وكل طور مسمّى بالناتج الذي يتركه."
        },
        items: [
          {
            en: "Ask &mdash; a question card the person who asked has read and agreed",
            ar: "اسأل &mdash; بطاقة سؤال قرأها صاحب الطلب ووافق عليها"
          },
          {
            en: "Acquire &mdash; an untouched raw copy, a source note and a data dictionary",
            ar: "اجمع &mdash; نسخة خام لم تُمسّ، وملاحظة مصدر، وقاموس بيانات"
          },
          {
            en: "Clean &mdash; the clean table, and a log of every line set aside and why",
            ar: "نظّف &mdash; الجدول المنظَّف، وسجل بكل سطر استُبعد ولماذا"
          },
          {
            en: "Explore &mdash; summaries, checks that the totals agree, and a list of surprises",
            ar: "استطلِع &mdash; ملخّصات، وفحوص تثبت اتفاق المجاميع، وقائمة بالمفاجآت"
          },
          {
            en: "Analyse / Model &mdash; the numbers the card asked for (or a model and its evaluation)",
            ar: "حلّل / نمذج &mdash; الأرقام التي طلبتها البطاقة (أو نموذج وتقييمه)"
          },
          {
            en: "Communicate &mdash; the deliverable: a one-page brief the manager can restate",
            ar: "أبلِغ &mdash; المُخرَج: موجز من صفحة واحدة يستطيع المدير أن يعيد صياغته"
          },
          {
            en: "Act &amp; Monitor &mdash; a decision, a KPI to track, and a date to look again",
            ar: "تصرّف وراقب &mdash; قرار، ومؤشر أداء يُتابَع، وتاريخ لإعادة النظر"
          }
        ],
        answer: [0, 1, 2, 3, 4, 5, 6],
        hint: {
          en: "Each stage needs the artifact the stage before it produced. Which one produces a question, and which one produces a decision?",
          ar: "كل طور يحتاج الناتج الذي أنتجه الطور الذي قبله. أي طور ينتج سؤالًا؟ وأي طور ينتج قرارًا؟"
        },
        explain: {
          en: "A stage is defined by what it leaves behind, and each artifact is the next stage's input: you cannot acquire data until a card says which data, cannot clean until the dictionary says what a value means, cannot explore a table that does not exist, and cannot communicate a number you have not computed. The last stage is the one most often skipped, and it is the one that closes the loop: monitoring is what sends you back to Ask or Acquire when the world moves. The lifecycle is a loop, not a line &mdash; and the cheapest loop-back is the earliest one. Finding at the card review that the file has no cost column costs one conversation; finding it after a model is deployed costs the features, the split, the training, the evaluation and some of the manager's trust.",
          ar: "يُعرَّف الطور بما يتركه خلفه، وكل ناتج هو مدخل الطور التالي: لا تستطيع جمع البيانات قبل أن تقول البطاقة أي بيانات، ولا التنظيف قبل أن يقول القاموس ما تعنيه القيمة، ولا استطلاع جدول غير موجود، ولا الإبلاغ عن رقم لم تحسبه. والطور الأخير هو الأكثر تخطّيًا، وهو الذي يُقفل الحلقة: فالمراقبة هي ما يعيدك إلى «اسأل» أو «اجمع» حين يتحرّك العالم. دورة الحياة حلقة لا خط مستقيم &mdash; وأرخص رجوع هو الأبكر. فكشف غياب عمود التكلفة عند مراجعة البطاقة يكلّف حوارًا واحدًا؛ وكشفه بعد نشر نموذج يكلّف السمات والتقسيم والتدريب والتقييم وشيئًا من ثقة المدير."
        }
      },
      {
        id: "p1ax04",
        type: "tf",
        level: "medium",
        topics: [
          "p1-skipped-stages",
          "p1-reproducibility"
        ],
        q: {
          en: "Marwan skips the cleaning stage and sums the raw file. His top three are Shawarma&nbsp;Wrap 1,512.00, Chicken&nbsp;Rice 1,050.00 and Falafel&nbsp;Sandwich 931.00, and his grand total is 8,334.00. The 748 cleaned lines give <em>the same three items in the same order</em> and a total of 8,062.00. True or false: because the ranking is identical, skipping the cleaning stage cost nothing this month.",
          ar: "يتخطّى مروان طور التنظيف ويجمع الملف الخام. أعلى ثلاثة أصناف عنده: الشاورما 1,512.00 وأرز الدجاج 1,050.00 وساندويتش الفلافل 931.00، ومجموعه الكلي 8,334.00. والأسطر الـ748 المنظَّفة تعطي <em>الأصناف الثلاثة نفسها بالترتيب نفسه</em> ومجموعًا قدره 8,062.00. صح أم خطأ: بما أن الترتيب متطابق، فإن تخطّي طور التنظيف لم يكلّف شيئًا هذا الشهر."
        },
        truth: false,
        hint: {
          en: "The manager is not only choosing which items to stock; he is choosing how much. Compare the amounts, not the order.",
          ar: "المدير لا يختار أي الأصناف يخزّن فقط، بل يختار كم يخزّن. قارن المقادير لا الترتيب."
        },
        explain: {
          en: "False. The ranking survived, the amounts did not: the top item is overstated by 144.00 (10.5%) and the grand total by 272.00 (3.4%), and the decision the card names is <em>how much</em> to stock, not only which items. The reconciliation is 8,334.00 &minus; 175.00 (16 repeated lines) + 23.00 (5 refunds, which were subtracting) &minus; 120.00 (one price typed ten times too large) = 8,062.00. Worse, the agreement of the ranking is luck, not evidence: nothing failed, nothing warned, and the one line whose price reads <code>n/a</code> was skipped without a word because <code>pd.read_csv</code> treats that text as missing. That is what skipping a stage really buys &mdash; errors that are silent rather than absent, of a size that looks plausible. The cure is not better arithmetic but the untouched raw file, the rules and a log that says how many lines each rule removed.",
          ar: "خطأ. نجا الترتيب ولم تنجُ المقادير: فالصنف الأول مبالغ فيه بمقدار 144.00 (10.5%) والمجموع الكلي بمقدار 272.00 (3.4%)، والقرار الذي تسمّيه البطاقة هو <em>كم</em> نخزّن لا أي الأصناف فقط. والمطابقة هي: 8,334.00 &minus; 175.00 (16 سطرًا مكررًا) + 23.00 (خمسة مرتجعات كانت تطرح) &minus; 120.00 (سعر كُتب أكبر عشر مرات) = 8,062.00. والأسوأ أن اتفاق الترتيب حظ لا دليل: لم يفشل شيء ولم يحذّر شيء، والسطر الوحيد الذي سعره <code>n/a</code> تُخطّي بلا كلمة لأن <code>pd.read_csv</code> يعدّ هذا النص مفقودًا. هذا ما يشتريه تخطّي طور فعلًا &mdash; أخطاء صامتة لا غائبة، بحجم يبدو معقولًا. والعلاج ليس حسابًا أفضل، بل الملف الخام الذي لم يُمسّ والقواعد وسجل يقول كم سطرًا أزالت كل قاعدة."
        }
      },
      {
        id: "p1ax05",
        type: "contrast",
        level: "medium",
        topics: [
          "p1-venv",
          "p1-pip-install",
          "p1-requirements"
        ],
        q: {
          en: "Place each statement under <em>the system Python</em>, under <em>a project virtual environment</em>, under both, or under neither.",
          ar: "ضع كل عبارة تحت <em>بايثون النظام</em> أو تحت <em>بيئة افتراضية للمشروع</em> أو تحت كلتيهما أو تحت لا هذه ولا تلك."
        },
        concepts: [
          {
            en: "The system Python",
            ar: "بايثون النظام (system Python)"
          },
          {
            en: "A project virtual environment (<code>.venv</code>)",
            ar: "بيئة افتراضية للمشروع (<code>.venv</code>)"
          }
        ],
        neither: true,
        rows: [
          {
            s: {
              en: "<code>python -m pip install pandas</code> puts a package into it",
              ar: "الأمر <code>python -m pip install pandas</code> يضع حزمة فيها"
            },
            a: 2
          },
          {
            s: {
              en: "On the lesson's machine it already holds 223 packages that nobody chose for this project",
              ar: "على حاسوب الدرس فيها 223 حزمة لم يخترها أحد لهذا المشروع"
            },
            a: 0
          },
          {
            s: {
              en: "Deleting one folder removes every package the project installed",
              ar: "حذف مجلد واحد يزيل كل حزمة ثبّتها المشروع"
            },
            a: 1
          },
          {
            s: {
              en: "While it is in use, <code>sys.prefix</code> and <code>sys.base_prefix</code> are different",
              ar: "أثناء استعمالها تختلف <code>sys.prefix</code> عن <code>sys.base_prefix</code>"
            },
            a: 1
          },
          {
            s: {
              en: "Activating it puts its <code>Scripts</code> folder first on the PATH of that one terminal",
              ar: "تفعيلها يضع مجلد <code>Scripts</code> الخاص بها أول المسار PATH في تلك النافذة وحدها"
            },
            a: 1
          },
          {
            s: {
              en: "A newer Debian, Ubuntu or Homebrew may refuse the install with <code>error: externally-managed-environment</code>",
              ar: "قد ترفض نسخ Debian أو Ubuntu أو Homebrew الأحدث التثبيت بالخطأ <code>error: externally-managed-environment</code>"
            },
            a: 0
          },
          {
            s: {
              en: "It records which versions this project needs",
              ar: "تسجّل أي إصدارات يحتاجها هذا المشروع"
            },
            a: 3
          }
        ],
        hint: {
          en: "Two of these are about <em>isolation</em> and one is about <em>memory</em>. Ask which file, not which folder, remembers a version number.",
          ar: "اثنتان من هذه عن <em>العزل</em> وواحدة عن <em>التذكّر</em>. اسأل: أي ملف &mdash; لا أي مجلد &mdash; يتذكّر رقم الإصدار؟"
        },
        explain: {
          en: "Both are Pythons and <code>python -m pip install</code> works into either &mdash; that is exactly why the wrong one is so easy to install into. The system Python is one shared toolbox: 223 packages nobody chose, another project's upgrade can change the version yours sees, and newer Debian, Ubuntu and Homebrew now refuse to let you touch it at all. A virtual environment is a folder, so it can be deleted; it announces itself through <code>sys.prefix != sys.base_prefix</code> (which is exactly the test <code>check_env.py</code> runs); and activation is nothing more than an edit to one terminal's PATH &mdash; which is why a second window is not activated, and why activation is not installation. The last row is the one that catches people: an environment holds packages but remembers nothing. What records the versions is <code>requirements.txt</code>, and without it <code>pip install pandas</code> gives whatever is newest that day &mdash; pandas 3.1.0 where the course was written against 2.2.3.",
          ar: "كلتاهما بايثون، و<code>python -m pip install</code> يعمل في أي منهما &mdash; ولهذا بالضبط يسهل التثبيت في الخطأ منهما. بايثون النظام صندوق أدوات واحد مشترك: 223 حزمة لم يخترها أحد، وترقية مشروع آخر قد تغيّر الإصدار الذي يراه مشروعك، ونسخ Debian وUbuntu وHomebrew الأحدث ترفض الآن أن تلمسه أصلًا. والبيئة الافتراضية مجلد، فيمكن حذفها؛ وتعلن عن نفسها بأن <code>sys.prefix != sys.base_prefix</code> (وهو بالضبط الفحص الذي يجريه <code>check_env.py</code>)؛ والتفعيل ليس إلا تعديلًا على مسار PATH في نافذة واحدة &mdash; ولهذا لا تكون النافذة الثانية مفعَّلة، ولهذا التفعيل ليس تثبيتًا. والصف الأخير هو الذي يُسقط الناس: البيئة تحمل الحزم ولا تتذكر شيئًا. والذي يسجّل الإصدارات هو <code>requirements.txt</code>، وبدونه يعطيك <code>pip install pandas</code> أحدث ما وُجد ذلك اليوم &mdash; pandas 3.1.0 حيث كُتب المنهج على 2.2.3."
        }
      },
      {
        id: "p1ax06",
        type: "write",
        level: "medium",
        topics: [
          "p1-venv-activate",
          "p1-requirements",
          "p1-env-check"
        ],
        lang: "bash",
        lines: 6,
        q: {
          en: "A fresh Windows machine with Python 3.13 installed. You are in the project folder <code>cafeteria-lab</code>, which already holds <code>requirements.txt</code> (the five pinned packages) and <code>check_env.py</code>, with the data under <code>data/raw/</code>. Write the four PowerShell commands that create a virtual environment, activate it, install the pinned packages <em>into it</em>, and prove the workbench works.",
          ar: "حاسوب ويندوز جديد مثبَّت عليه Python 3.13. أنت في مجلد المشروع <code>cafeteria-lab</code>، وفيه أصلًا <code>requirements.txt</code> (الحزم الخمس المثبَّتة الإصدار) و<code>check_env.py</code>، والبيانات في <code>data/raw/</code>. اكتب أوامر PowerShell الأربعة التي تُنشئ بيئة افتراضية وتفعّلها وتثبّت الحزم المثبَّتة الإصدار <em>فيها</em> وتُثبت أن بيئة العمل تعمل."
        },
        starter: "# PowerShell, standing in the cafeteria-lab folder\n",
        checks: [
          {
            re: "python\\s+-m\\s+venv\\s+\\.?venv",
            label: {
              en: "create the environment: <code>python -m venv .venv</code>",
              ar: "أنشئ البيئة: <code>python -m venv .venv</code>"
            }
          },
          {
            re: "Activate\\.ps1",
            label: {
              en: "activate it: <code>.\\.venv\\Scripts\\Activate.ps1</code>",
              ar: "فعّلها: <code>.\\.venv\\Scripts\\Activate.ps1</code>"
            }
          },
          {
            re: "python\\s+-m\\s+pip\\s+install\\s+-r\\s+requirements\\.txt",
            label: {
              en: "install from the pinned file, with <code>python -m pip</code>",
              ar: "ثبّت من الملف المثبَّت الإصدار بـ<code>python -m pip</code>"
            }
          },
          {
            re: "python\\s+check_env\\.py",
            label: {
              en: "run the Workbench Check: <code>python check_env.py</code>",
              ar: "شغّل فحص بيئة العمل: <code>python check_env.py</code>"
            }
          }
        ],
        forbid: [
          {
            re: "install\\s+pandas(?!==)",
            label: {
              en: "installing packages by name (<code>pip install pandas &hellip;</code>) instead of from the pinned <code>requirements.txt</code>",
              ar: "تثبيت الحزم بالاسم (<code>pip install pandas &hellip;</code>) بدل التثبيت من <code>requirements.txt</code> المثبَّت الإصدار"
            }
          }
        ],
        solution: {
          code: code(
            "python -m venv .venv",
            ".\\.venv\\Scripts\\Activate.ps1",
            "python -m pip install -r requirements.txt",
            "python check_env.py"
          ),
          en: "Four commands, in that order. The finished bench prints nine <code>PASS</code> lines &mdash; the Python version, the active environment, the five packages with their versions, the 771-row CSV and the workbook's <code>tblOrders</code> &mdash; then <code>9 passed, 0 failed</code> and exit code 0, plus the honest line that Excel and Power BI Desktop are not checked here and must be opened by hand. On macOS or Linux only two lines change: <code>python3 -m venv .venv</code> and <code>source .venv/bin/activate</code>.",
          ar: "أربعة أوامر بهذا الترتيب. وبيئة العمل المكتملة تطبع تسعة أسطر <code>PASS</code> &mdash; إصدار بايثون، والبيئة المفعَّلة، والحزم الخمس بإصداراتها، وملف CSV ذو الـ771 صفًّا، وجدول <code>tblOrders</code> في المصنَّف &mdash; ثم <code>9 passed, 0 failed</code> ورمز الخروج 0، مع السطر الصريح بأن Excel وPower BI Desktop غير مفحوصين هنا ولا بد من فتحهما يدويًّا. وعلى macOS أو Linux يتغير سطران فقط: <code>python3 -m venv .venv</code> و<code>source .venv/bin/activate</code>."
        },
        hint: {
          en: "Order matters more than spelling: one of the four is useless unless it runs after another. And the lesson never writes a bare <code>pip</code>.",
          ar: "الترتيب أهم من الإملاء: فأحد الأوامر الأربعة لا نفع له إلا إذا جاء بعد غيره. والدرس لا يكتب <code>pip</code> مجردة أبدًا."
        },
        explain: {
          en: "Create, activate, install, check. The order is the whole lesson: installing before activating is the commonest silent error on this bench &mdash; pip reports <code>Successfully installed</code> into the system Python, and the notebook later answers <code>ModuleNotFoundError</code>. Always <code>python -m pip</code>, never a bare <code>pip</code>: <code>pip</code> is found through the PATH and may belong to another Python, while <code>python -m pip</code> is by construction the pip of the Python that is about to run your code. Installing from <code>requirements.txt</code> rather than by name is what makes &ldquo;same code, same answer&rdquo; true next month. And the fourth command is not ceremony: &ldquo;it seems to work&rdquo; is a failure that arrives a week later, in the middle of something else.",
          ar: "أنشئ، فعّل، ثبّت، افحص. والترتيب هو الدرس كله: فالتثبيت قبل التفعيل أشهر خطأ صامت على هذه المنصة &mdash; يقول pip <code>Successfully installed</code> في بايثون النظام، ثم يجيب الدفتر لاحقًا بـ<code>ModuleNotFoundError</code>. واستعمل <code>python -m pip</code> دائمًا لا <code>pip</code> مجردة: فـ<code>pip</code> يُعثر عليها عبر PATH وقد تخصّ بايثون أخرى، أما <code>python -m pip</code> فهي بحكم بنائها pip الخاصة ببايثون التي ستشغّل كودك. والتثبيت من <code>requirements.txt</code> بدل التثبيت بالاسم هو ما يجعل «الكود نفسه، الجواب نفسه» صحيحًا الشهر القادم. والأمر الرابع ليس طقسًا: فعبارة «يبدو أنه يعمل» إخفاق يصل بعد أسبوع في وسط شيء آخر."
        }
      },
      {
        id: "p1ax07",
        type: "compare",
        level: "medium",
        topics: [
          "p1-version-pinning",
          "p1-requirements",
          "p1-pip-install"
        ],
        lang: "bash",
        q: {
          en: "Two ways to fill the same new virtual environment. A classmate follows one of them in October, after the course was written. Which statement is true?",
          ar: "طريقتان لتعبئة البيئة الافتراضية الجديدة نفسها. تتبع زميلة إحداهما في تشرين الأول بعد كتابة المنهج. أيّ العبارات صحيحة؟"
        },
        codeA: code(
          "python -m venv .venv",
          ".\\.venv\\Scripts\\Activate.ps1",
          "python -m pip install pandas numpy matplotlib openpyxl jupyterlab"
        ),
        codeB: code(
          "python -m venv .venv",
          ".\\.venv\\Scripts\\Activate.ps1",
          "python -m pip install -r requirements.txt",
          "",
          "# requirements.txt - five lines, written and maintained by hand",
          "#   pandas==2.2.3",
          "#   numpy==2.2.5",
          "#   matplotlib==3.10.6",
          "#   openpyxl==3.1.5",
          "#   jupyterlab==4.6.4"
        ),
        options: [
          {
            en: "They are equivalent: both isolate the project in <code>.venv</code> and both name the same five packages, so the two environments hold the same code.",
            ar: "النسختان متكافئتان: كلتاهما تعزل المشروع في <code>.venv</code> وكلتاهما تسمّي الحزم الخمس نفسها، فتحتوي البيئتان الكود نفسه."
          },
          {
            en: "B is better: A installs whatever is newest on the day it runs, so in October she gets pandas 3.1.0 where the course was written against 2.2.3 &mdash; silently.",
            ar: "ب أفضل: أ تثبّت أحدث ما وُجد يوم تشغيلها، فتحصل في تشرين الأول على pandas 3.1.0 حيث كُتب المنهج على 2.2.3 &mdash; وبصمت."
          },
          {
            en: "A is better: the pins in B freeze security fixes, and a pinned file cannot be rebuilt on another operating system at all.",
            ar: "أ أفضل: فالتثبيت في ب يجمّد إصلاحات الأمان، والملف المثبَّت الإصدار لا يمكن بناؤه على نظام تشغيل آخر إطلاقًا."
          },
          {
            en: "B only helps if <code>requirements.txt</code> is the full <code>pip freeze</code>; a five-line file proves nothing, because the dependencies are not listed.",
            ar: "ب لا تفيد إلا إذا كان <code>requirements.txt</code> هو ناتج <code>pip freeze</code> الكامل؛ فملف من خمسة أسطر لا يثبت شيئًا لأن التبعيات غير مذكورة."
          }
        ],
        answer: 1,
        hint: {
          en: "Both commands will succeed. Ask what each one <em>means</em> on a different day, and what the environment itself can remember.",
          ar: "سينجح الأمران كلاهما. اسأل: ماذا يعني كل منهما في يوم مختلف؟ وما الذي تستطيع البيئة نفسها أن تتذكره؟"
        },
        explain: {
          en: "A virtual environment isolates, but it does not remember a version: A asks for five names and gets whatever PyPI offers that morning. The drift is real and measured &mdash; pandas 2.2.3 against 3.1.0, NumPy 2.2.5 against 2.5.4 &mdash; and it is silent: with the newer pandas the very same line reports the dtype of a text column as <code>str</code> rather than <code>object</code>, so a classmate's output &ldquo;disagrees&rdquo; with the lesson although her data and her code are identical. The third option is half true and wrongly concluded: pins do age, which is an argument for upgrading <em>deliberately</em> and re-freezing, not for pinning nothing. The fourth has it backwards: the 102-line <code>pip freeze</code> is the record, and it is the platform-bound one (<code>pywinpty</code> has no macOS build, so the install fails on that line) &mdash; the short file is the portable one you install from.",
          ar: "البيئة الافتراضية تعزل لكنها لا تتذكر إصدارًا: فـأ تطلب خمسة أسماء فتأخذ ما يعرضه PyPI صباح ذلك اليوم. والانزياح حقيقي ومقيس &mdash; pandas 2.2.3 مقابل 3.1.0، وNumPy 2.2.5 مقابل 2.5.4 &mdash; وهو صامت: فمع pandas الأحدث يُبلغ السطر نفسه عن نوع عمود نصي بأنه <code>str</code> لا <code>object</code>، فيبدو ناتج الزميلة «مخالفًا» للدرس مع أن بياناتها وكودها متطابقان. والخيار الثالث نصف صحيح وخاتمته خاطئة: نعم تتقادم الإصدارات المثبَّتة، وهذه حجة للترقية <em>عن قصد</em> ثم إعادة التجميد، لا حجة لعدم التثبيت. والرابع مقلوب: فـ<code>pip freeze</code> بأسطره الـ102 هو السجل، وهو المرتبط بالمنصة (<code>pywinpty</code> لا بناء له على macOS فيفشل التثبيت عند ذلك السطر) &mdash; أما الملف القصير فهو المحمول الذي تثبّت منه."
        }
      },
      {
        id: "p1ax08",
        type: "mcq",
        level: "easy",
        topics: [
          "p1-env-check",
          "p1-troubleshoot"
        ],
        lang: "text",
        q: {
          en: "A classmate runs <code>python check_env.py</code> in her project folder and gets this, and her shell reports exit code 1. Which statement about the run is right?",
          ar: "تشغّل زميلة الأمر <code>python check_env.py</code> في مجلد مشروعها فيظهر هذا، وتُبلغ صدفتها برمز الخروج 1. أيّ العبارات عن هذا التشغيل صحيحة؟"
        },
        code: code(
          "PASS  Python 3.11 or newer                3.13.3",
          "PASS  virtual environment is active       .venv",
          "PASS  package pandas                      3.1.0",
          "PASS  package numpy                       2.5.4",
          "FAIL  package matplotlib                  ModuleNotFoundError: No module named 'matplotlib'",
          "FAIL  package openpyxl                    ModuleNotFoundError: No module named 'openpyxl'",
          "FAIL  package jupyterlab                  ModuleNotFoundError: No module named 'jupyterlab'",
          "PASS  cafeteria_orders.csv has 771 rows   found 771 rows, 8 columns",
          "FAIL  read cafeteria_orders.xlsx          ModuleNotFoundError: No module named 'openpyxl'",
          "",
          "5 passed, 4 failed",
          "Not checked here (do by hand): Excel opens the .xlsx; Power BI Desktop starts (Windows only)."
        ),
        options: [
          {
            en: "The script should have installed the three missing packages itself; a check that only reports is half a check.",
            ar: "كان على السكربت أن يثبّت الحزم الثلاث الناقصة بنفسه؛ فالفحص الذي يُبلغ فقط نصف فحص."
          },
          {
            en: "The run also proves Excel and Power BI Desktop are ready, because reading the workbook is one of the checks in the list.",
            ar: "يُثبت التشغيل أيضًا أن Excel وPower BI Desktop جاهزان، لأن قراءة المصنَّف أحد الفحوص المذكورة في القائمة."
          },
          {
            en: "The line <code>PASS package pandas 3.1.0</code> means her environment matches the course, because the version was printed.",
            ar: "السطر <code>PASS package pandas 3.1.0</code> يعني أن بيئتها مطابقة للمنهج، لأن الإصدار طُبع."
          },
          {
            en: "One run named every independent problem at once, and the exit code 1 is what lets a scheduler react to the failure.",
            ar: "سمّى تشغيل واحد كل مشكلة مستقلة في وقت واحد، ورمز الخروج 1 هو ما يتيح لمجدول مهام أن يتصرف تجاه الإخفاق."
          }
        ],
        answer: 3,
        hint: {
          en: "Count the failures, then ask how many runs it would have taken to find them all if the script had stopped at the first one.",
          ar: "عُدّ الإخفاقات، ثم اسأل: كم تشغيلًا كان سيلزم للعثور عليها كلها لو توقف السكربت عند أولها؟"
        },
        explain: {
          en: "The whole point of collecting verdicts instead of crashing is on the screen: four independent problems in one run, and one <code>python -m pip install -r requirements.txt</code> clears all four. A smoke test that simply imported the five packages would have stopped at <code>matplotlib</code> and said nothing about <code>openpyxl</code> or <code>jupyterlab</code>, so she would have discovered them one crash at a time. The exit code is the second half of the design: 0 when everything passed, 1 when anything failed, which is what makes the check usable by something other than a human reading a screen. The script deliberately never installs &mdash; installing would hide the fact that the environment does not match its own <code>requirements.txt</code>. It is also honest about its blind spot: the last line says Excel and Power BI cannot be checked from Python, and the <code>openpyxl</code> failure is Python being unable to read the workbook, not Excel being broken. And printing a version is not comparing it: 3.1.0 is a <code>PASS</code> here although the course pins 2.2.3.",
          ar: "مقصد جمع الأحكام بدل الانهيار معروض على الشاشة: أربع مشكلات مستقلة في تشغيل واحد، وأمر <code>python -m pip install -r requirements.txt</code> واحد يزيلها كلها. فاختبار دخان يستورد الحزم الخمس فقط كان سيتوقف عند <code>matplotlib</code> ولا يقول شيئًا عن <code>openpyxl</code> ولا <code>jupyterlab</code>، فكانت ستكتشفها انهيارًا انهيارًا. ورمز الخروج هو النصف الثاني من التصميم: 0 حين ينجح كل شيء، و1 حين يفشل أي شيء، وهذا ما يجعل الفحص صالحًا لغير إنسان يقرأ شاشة. والسكربت لا يثبّت عن قصد &mdash; فالتثبيت سيخفي أن البيئة لا تطابق <code>requirements.txt</code> الخاص بها. وهو صريح أيضًا في نقطته العمياء: يقول السطر الأخير إن Excel وPower BI لا يمكن فحصهما من بايثون، وإخفاق <code>openpyxl</code> هو عجز بايثون عن قراءة المصنَّف لا عطب في Excel. وطباعة إصدار ليست مقارنته: فالإصدار 3.1.0 هنا <code>PASS</code> مع أن المنهج يثبّت 2.2.3."
        }
      },
      {
        id: "p1ax09",
        type: "tf",
        level: "easy",
        topics: [
          "p1-nb-stale-outputs",
          "p1-nb-anatomy"
        ],
        q: {
          en: "You open last week's notebook. Under one cell the page shows <code>Out[12]: 8062.0</code>. You have not run anything yet. True or false: that number proves the kernel is holding the cleaned revenue, so the next cell can go on and use the table it came from.",
          ar: "تفتح دفتر الأسبوع الماضي. وتحت إحدى الخلايا تعرض الصفحة <code>Out[12]: 8062.0</code>. ولم تشغّل شيئًا بعد. صح أم خطأ: هذا الرقم يثبت أن النواة تحمل الإيراد المنظَّف، فيمكن للخلية التالية أن تمضي وتستعمل الجدول الذي جاء منه."
        },
        truth: false,
        hint: {
          en: "Three things make a notebook: the cells, the file and the kernel. Which of the three does opening the file start, and what does it contain?",
          ar: "ثلاثة أشياء تصنع الدفتر: الخلايا والملف والنواة. أي الثلاثة يبدأ عند فتح الملف؟ وماذا يحتوي؟"
        },
        explain: {
          en: "False. Outputs are a photograph; the kernel is the room. The text <code>Out[12]: 8062.0</code> was saved into the <code>.ipynb</code> file the last time that cell ran, perhaps on other data, perhaps from code that has since been edited. Opening the notebook starts a fresh kernel that holds nothing and runs nothing, so the very next cell answers <code>NameError: name 'orders' is not defined</code>. A notebook file never holds variables &mdash; only cells, metadata and the saved outputs. Two habits follow: before you trust, share or quote a number, use Kernel&nbsp;&#9656;&nbsp;Restart Kernel and Run All Cells, which rebuilds every variable from the code on the page; and read the execution counters, because a gap or a decrease down the page (<code>In [1] [2] [3] [8] [9]</code>) means the kernel ran things the page does not show.",
          ar: "خطأ. النواتج صورة فوتوغرافية، والنواة هي الغرفة. فالنص <code>Out[12]: 8062.0</code> حُفظ في ملف <code>.ipynb</code> آخر مرة نُفّذت تلك الخلية، ربما على بيانات أخرى، وربما من كود عُدِّل بعد ذلك. وفتح الدفتر يبدأ نواة جديدة لا تحمل شيئًا ولا تنفّذ شيئًا، فتجيب الخلية التالية مباشرة بـ<code>NameError: name 'orders' is not defined</code>. وملف الدفتر لا يحمل متغيرات أبدًا &mdash; بل خلايا وبيانات وصفية ونواتج محفوظة. ومن ذلك عادتان: قبل أن تثق برقم أو تشاركه أو تنقله، استعمل Kernel&nbsp;&#9656;&nbsp;Restart Kernel and Run All Cells، فهي تعيد بناء كل متغير من الكود الموجود في الصفحة؛ واقرأ عدّادات التنفيذ، فالفجوة أو النقصان نزولًا في الصفحة (<code>In [1] [2] [3] [8] [9]</code>) يعني أن النواة نفّذت أشياء لا تعرضها الصفحة."
        }
      },
      {
        id: "p1ax10",
        type: "output",
        level: "easy",
        topics: [
          "p1-nb-spelling-variants",
          "p1-nb-dirty-rows"
        ],
        lang: "python",
        q: {
          en: "The first look at the raw cafeteria file, in a fresh notebook. Write exactly what the program prints (three lines). The menu in <code>cafeteria_menu.csv</code> lists 16 items.",
          ar: "النظرة الأولى إلى ملف الكافتيريا الخام في دفتر جديد. اكتب بالضبط ما يطبعه البرنامج (ثلاثة أسطر). والقائمة في <code>cafeteria_menu.csv</code> تسرد 16 صنفًا."
        },
        code: code(
          "import pandas as pd",
          "",
          "orders = pd.read_csv(\"cafeteria_orders.csv\")",
          "print(orders.shape)",
          "print(orders[\"order_id\"].nunique())",
          "print(orders[\"item\"].nunique())"
        ),
        blanks: [
          {
            accept: [
              "(771, 8)\n616\n22"
            ],
            lines: 3
          }
        ],
        hint: {
          en: "The first number counts <em>lines</em>. An order can be rung up as several lines &mdash; and <code>nunique</code> compares strings exactly.",
          ar: "الرقم الأول يعدّ <em>الأسطر</em>. والطلب الواحد قد يُسجَّل في عدة أسطر &mdash; و<code>nunique</code> تقارن النصوص مقارنة تامة."
        },
        explain: {
          en: "771 lines and 8 columns, but only 616 distinct <code>order_id</code> values: a row of this file is one order <em>line</em>, not one order, so <code>len(orders)</code> answers &ldquo;how much did the till record?&rdquo; and not &ldquo;how many customers were served?&rdquo;. That is why the project card writes a grain line. The third number is the other surprise: 22 distinct item strings for a menu of 16, because <code>'Latte'</code>, <code>'Latte '</code> and <code>'latte'</code> are three different strings to pandas, which compares text exactly &mdash; so a <code>groupby(\"item\")</code> would split Latte's revenue three ways with no error at all. The tempting answers are 771 for the orders (the grain mistake) and 16 for the items (the menu's count, not the file's); the repair is <code>.str.strip().str.title()</code>, which brings 22 back to 16.",
          ar: "‏771 سطرًا و8 أعمدة، لكن 616 قيمة <code>order_id</code> مميزة فقط: فصفّ هذا الملف هو <em>سطر</em> طلب لا طلب، لذا يجيب <code>len(orders)</code> عن «كم سجّلت الصندوق؟» لا عن «كم عميلًا خُدِم؟». ولهذا تكتب بطاقة المشروع سطرًا للحبيبة. والرقم الثالث هو المفاجأة الأخرى: 22 نصًّا مميزًا للأصناف مقابل قائمة من 16، لأن <code>'Latte'</code> و<code>'Latte '</code> و<code>'latte'</code> ثلاثة نصوص مختلفة عند pandas التي تقارن النص مقارنة تامة &mdash; فـ<code>groupby(\"item\")</code> كانت ستقسم إيراد اللاتيه ثلاث حصص بلا أي خطأ. والجوابان المغريان هما 771 للطلبات (خطأ الحبيبة) و16 للأصناف (عدّ القائمة لا عدّ الملف)؛ والإصلاح <code>.str.strip().str.title()</code> الذي يعيد الـ22 إلى 16."
        }
      },
      {
        id: "p1ax11",
        type: "error",
        level: "medium",
        topics: [
          "p1-nb-hidden-state",
          "p1-nb-drift-ways",
          "p1-nb-run-all"
        ],
        lang: "python",
        q: {
          en: "Cell&nbsp;1 of a notebook read the raw file and added a <code>line_total</code> column; it is not run again. Cell&nbsp;3, below, is the what-if: Staff lines get 10% off. From a fresh kernel it prints <code>8156.95</code>; press <kbd>Shift</kbd>+<kbd>Enter</kbd> on it a second time and it prints <code>7997.605</code>, a third time <code>7854.1945</code>. Nothing is ever raised. Click the line that makes the cell unsafe to re-run.",
          ar: "قرأت الخلية 1 من دفتر الملف الخام وأضافت عمود <code>line_total</code>، ولا تُشغَّل مرة أخرى. والخلية 3 أدناه هي سؤال «ماذا لو»: خصم 10% على أسطر الموظفين. من نواة جديدة تطبع <code>8156.95</code>؛ واضغط <kbd>Shift</kbd>+<kbd>Enter</kbd> عليها ثانيةً فتطبع <code>7997.605</code>، وثالثةً <code>7854.1945</code>. ولا شيء يُرفع أبدًا. انقر السطر الذي يجعل الخلية غير آمنة لإعادة التشغيل."
        },
        code: code(
          "STAFF_OFF = 0.10",
          "is_staff = orders[\"customer_type\"] == \"Staff\"",
          "orders.loc[is_staff, \"line_total\"] *= 1 - STAFF_OFF",
          "print(orders[\"line_total\"].sum())"
        ),
        answer: 3,
        solution: {
          code: "orders[\"whatif_total\"] = orders[\"line_total\"] * (1 - STAFF_OFF * is_staff)",
          en: "Derive a <em>new</em> column from one this cell does not touch. <code>True</code> counts as 1 and <code>False</code> as 0, so Staff lines are multiplied by 0.9 and every other line by 1.0 &mdash; and the cell prints <code>8156.95</code> however many times you run it.",
          ar: "اشتقّ عمودًا <em>جديدًا</em> من عمود لا تلمسه هذه الخلية. فـ<code>True</code> تُحسب 1 و<code>False</code> تُحسب 0، فتُضرب أسطر الموظفين في 0.9 وكل سطر آخر في 1.0 &mdash; وتطبع الخلية <code>8156.95</code> أيًّا كان عدد مرات تشغيلها."
        },
        hint: {
          en: "Ask of each line: if I ran it twice, would the table be in the same state as after running it once?",
          ar: "اسأل عن كل سطر: لو شغّلته مرتين، هل يكون الجدول في الحالة نفسها التي بعد تشغيله مرة واحدة؟"
        },
        explain: {
          en: "Line 3 updates the column <em>in place</em>, so each run multiplies the Staff lines by 0.9 again: the raw total 8,334.00 loses 177.05, then 0.81 and then 0.729 of the original Staff revenue &mdash; 8156.95, 7997.605, 7854.1945. Nothing is raised because <code>*=</code> is a perfectly legal statement; the defect is that the answer now depends on how often somebody pressed <kbd>Shift</kbd>+<kbd>Enter</kbd>, and the page cannot show that. A cell is safe to re-run when running it twice leaves the same state as running it once: <code>orders = orders.drop_duplicates()</code> is safe; <code>*=</code>, <code>+=</code>, <code>total += x</code> and <code>inplace=True</code> are not. Prefer adding or naming things over quietly rewriting what an earlier cell made, and prove it with Restart&nbsp;&amp;&nbsp;Run&nbsp;All. The tempting clicks are lines 2 and 4, where the mask and the number appear &mdash; but both are innocent, and so is <code>STAFF_OFF</code>.",
          ar: "السطر 3 يحدّث العمود <em>في مكانه</em>، فكل تشغيل يضرب أسطر الموظفين في 0.9 من جديد: فيفقد المجموع الخام 8,334.00 مقدار 177.05، ثم 0.81 ثم 0.729 من إيراد الموظفين الأصلي &mdash; أي 8156.95 ثم 7997.605 ثم 7854.1945. ولا شيء يُرفع لأن <code>*=</code> عبارة مشروعة تمامًا؛ والعيب أن الجواب صار يعتمد على عدد مرات ضغط أحدهم <kbd>Shift</kbd>+<kbd>Enter</kbd>، والصفحة لا تستطيع إظهار ذلك. والخلية آمنة لإعادة التشغيل حين يتركها تشغيلها مرتين في حالة تشغيلها مرة: فـ<code>orders = orders.drop_duplicates()</code> آمنة؛ أما <code>*=</code> و<code>+=</code> و<code>total += x</code> و<code>inplace=True</code> فليست كذلك. فاختر الإضافة والتسمية بدل إعادة كتابة ما صنعته خلية سابقة بصمت، وأثبت ذلك بـRestart&nbsp;&amp;&nbsp;Run&nbsp;All. والنقرتان المغريتان هما السطران 2 و4 حيث يظهر القناع والرقم &mdash; وكلاهما بريء، وكذلك <code>STAFF_OFF</code>."
        }
      },
      {
        id: "p1ax12",
        type: "fill",
        level: "easy",
        topics: [
          "p1-nb-paths",
          "p1-nb-header-config"
        ],
        lang: "python",
        q: {
          en: "The settings cell of a notebook, written so that a classmate who put the data in the project's own folder can run it unchanged. Fill in the two blanks.",
          ar: "خلية الإعدادات في دفتر، مكتوبة كي تستطيع زميلة وضعت البيانات في مجلد المشروع نفسه أن تشغّلها دون تعديل. املأ الفراغين."
        },
        code: code(
          "from pathlib import Path",
          "import pandas as pd",
          "",
          "DATA = ____1____(\"data/raw\")",
          "ORDERS = DATA / \"cafeteria_orders.csv\"",
          "assert ORDERS.____2____(), f\"put cafeteria_orders.csv in {DATA.resolve()}\"",
          "",
          "orders = pd.read_csv(ORDERS)",
          "print(orders.shape)          # (771, 8)"
        ),
        blanks: [
          {
            accept: [
              "Path"
            ]
          },
          {
            accept: [
              "exists"
            ]
          }
        ],
        hint: {
          en: "The first blank is already named on the import line. The second is the method that answers &ldquo;is there really a file there?&rdquo; before <code>read_csv</code> has to.",
          ar: "الفراغ الأول مذكور أصلًا في سطر الاستيراد. والثاني هو الدالة التي تجيب عن سؤال «هل يوجد ملف هناك فعلًا؟» قبل أن تُضطر <code>read_csv</code> إلى ذلك."
        },
        explain: {
          en: "<code>Path(\"data/raw\")</code> is the one setting the rest of the notebook joins paths onto with <code>/</code>, so the location appears once instead of in five cells, and the page names no computer. Compare the version it replaces: <code>pd.read_csv(r\"C:\\Users\\me\\Desktop\\cafeteria_orders.csv\")</code> describes the author's machine, fails on a classmate's with <code>FileNotFoundError</code>, has no <code>C:</code> at all on macOS or Linux &mdash; and written without the <code>r</code> prefix it does not even reach the file system, because <code>\\U</code> in <code>\\Users</code> starts an escape and Python raises a <code>SyntaxError</code>. <code>ORDERS.exists()</code> turns the silent version of the failure into a message naming the folder the file belongs in. The remaining slip is a bare <code>pd.read_csv(\"cafeteria_orders.csv\")</code>: it looks portable, but it quietly requires the file to sit next to the notebook, which is exactly what breaks the moment the notebook moves into <code>notebooks/</code> &mdash; or runs in Colab, which starts in <code>/content</code>.",
          ar: "‏<code>Path(\"data/raw\")</code> هو الإعداد الواحد الذي يصل إليه بقية الدفتر مساراته بـ<code>/</code>، فيظهر الموضع مرة واحدة بدل خمس خلايا، ولا تسمّي الصفحة أي حاسوب. وقارن النسخة التي يحلّ محلها: <code>pd.read_csv(r\"C:\\Users\\me\\Desktop\\cafeteria_orders.csv\")</code> تصف حاسوب المؤلف، وتفشل على حاسوب زميلة بـ<code>FileNotFoundError</code>، ولا يوجد <code>C:</code> أصلًا على macOS أو Linux &mdash; وإن كُتبت دون البادئة <code>r</code> فلن تصل إلى نظام الملفات أبدًا، لأن <code>\\U</code> في <code>\\Users</code> تبدأ محرَف هروب فترفع بايثون <code>SyntaxError</code>. و<code>ORDERS.exists()</code> تحوّل النسخة الصامتة من الإخفاق إلى رسالة تسمّي المجلد الذي ينتمي إليه الملف. والزلّة الباقية هي <code>pd.read_csv(\"cafeteria_orders.csv\")</code> مجردة: تبدو محمولة، لكنها تشترط بصمت أن يكون الملف بجوار الدفتر، وهذا بالضبط ما ينكسر لحظة انتقال الدفتر إلى <code>notebooks/</code> &mdash; أو تشغيله في Colab الذي يبدأ في <code>/content</code>."
        }
      },
      {
        id: "p1ax13",
        type: "compare",
        level: "medium",
        topics: [
          "p1-xl-tables",
          "p1-xl-structured-refs"
        ],
        lang: "excel",
        q: {
          en: "Both totals were written on the sheet while <code>tblOrders</code> covered <code>A1:H772</code>, and both reported 1,263. Then the cashier pastes three new order lines directly under the last row, so the Table grows to <code>A1:H775</code>. Which statement is true?",
          ar: "كُتب المجموعان على الورقة حين كان <code>tblOrders</code> يغطي <code>A1:H772</code>، وأبلغ كلاهما بالقيمة 1,263. ثم يلصق الصرّاف ثلاثة أسطر طلبات جديدة أسفل الصف الأخير مباشرة، فيتوسّع الجدول إلى <code>A1:H775</code>. أيّ العبارات صحيحة؟"
        },
        codeA: "=SUM(Orders!E2:E772)",
        codeB: "=SUM(tblOrders[qty])",
        options: [
          {
            en: "B follows the Table and counts the three new lines; A still adds rows 2 to 772 and quietly reports the old 1,263.",
            ar: "ب تتبع الجدول فتعدّ الأسطر الثلاثة الجديدة؛ وأ تبقى تجمع الصفوف من 2 إلى 772 فتبلّغ بهدوء بالقيمة القديمة 1,263."
          },
          {
            en: "Both now count the new quantities: pasting <em>inside</em> a Table makes every formula that points at the sheet grow with it.",
            ar: "صار المجموعان يعدّان الكميات الجديدة: فاللصق <em>داخل</em> جدول يجعل كل صيغة تشير إلى الورقة تنمو معه."
          },
          {
            en: "A is safer: because it names the sheet, it keeps working if somebody renames the Table or its <code>qty</code> header, which would break B.",
            ar: "أ أأمن: فلأنها تسمّي الورقة تبقى تعمل إذا أعاد أحد تسمية الجدول أو عنوان عموده <code>qty</code>، وهو ما سيعطّل ب."
          },
          {
            en: "Neither counts them until the workbook is recalculated with <kbd>F9</kbd>; both are correct once it is.",
            ar: "لا يعدّهما أي منهما حتى يُعاد حساب المصنَّف بالمفتاح <kbd>F9</kbd>؛ وكلاهما صحيح بعد ذلك."
          }
        ],
        answer: 0,
        hint: {
          en: "One of the two says what it means (&ldquo;the <code>qty</code> column of this Table&rdquo;); the other says where it looked once.",
          ar: "واحدة من الاثنتين تقول ما تعنيه («عمود <code>qty</code> في هذا الجدول»)؛ والأخرى تقول أين نظرت مرة واحدة."
        },
        explain: {
          en: "A range is a guess frozen in place; a Table is a declaration. <code>E2:E772</code> is a rectangle on the sheet, and nothing about the Table growing rewrites it: the three new lines fall outside, the total does not change, nothing errors, and the report is quietly stale &mdash; the classic spreadsheet failure, and the one behind the 2010 public-debt paper whose average stopped short of five countries. <code>tblOrders[qty]</code> means &ldquo;the <code>qty</code> column of that Table, however long it is today&rdquo;. The third option gets the rename exactly backwards: renaming the header to <code>quantity</code> rewrites every structured formula, which is the point &mdash; B follows the rename, while A would keep pointing at a column that now means something else. And recalculation cannot lengthen a fixed range; a total that refuses to move while the status bar reads <em>Calculate</em> is a different fault altogether (Formulas&nbsp;&#9656;&nbsp;Calculation Options set to Manual).",
          ar: "النطاق تخمين مجمَّد في موضعه، والجدول إعلان. فـ<code>E2:E772</code> مستطيل على الورقة، ولا شيء في نمو الجدول يعيد كتابته: تقع الأسطر الثلاثة الجديدة خارجه، ولا يتغير المجموع، ولا يظهر خطأ، ويصير التقرير قديمًا بهدوء &mdash; وهو إخفاق جداول البيانات الكلاسيكي، ونفسه الذي وقع في ورقة الدين العام لعام 2010 حين توقف متوسطها قبل خمس دول. أما <code>tblOrders[qty]</code> فتعني «عمود <code>qty</code> في ذلك الجدول أيًّا كان طوله اليوم». والخيار الثالث يعكس مسألة إعادة التسمية تمامًا: فتغيير العنوان إلى <code>quantity</code> يعيد كتابة كل صيغة مُهيكلة، وهذا هو المقصود &mdash; ب تتبع التسمية الجديدة، وأ تبقى تشير إلى عمود صار يعني شيئًا آخر. وإعادة الحساب لا تستطيع إطالة نطاق ثابت؛ والمجموع الذي يرفض التحرك وشريط الحالة يقول <em>Calculate</em> عطب مختلف تمامًا (‏Formulas&nbsp;&#9656;&nbsp;Calculation Options مضبوطة على Manual)."
        }
      },
      {
        id: "p1ax14",
        type: "complete",
        level: "easy",
        topics: [
          "p1-xl-sumifs",
          "p1-xl-helper-columns"
        ],
        lang: "excel",
        q: {
          en: "The <code>Summary</code> sheet lists the 16 menu items in <code>A2:A17</code>. <code>B2</code> must hold the revenue of the item in <code>A2</code> counting <em>only</em> the lines the rules keep &mdash; the ones whose <code>status</code> helper column reads <code>ok</code>. Which ending completes it, so that <code>B18</code> comes to 8,062.00 and the check cell <code>B19</code> reads 0.00?",
          ar: "تسرد ورقة <code>Summary</code> أصناف القائمة الـ16 في <code>A2:A17</code>. ويجب أن يحمل <code>B2</code> إيراد الصنف الموجود في <code>A2</code> بعدّ <em>الأسطر التي تحتفظ بها القواعد فقط</em> &mdash; أي التي يقرأ عمودها المساعد <code>status</code> فيها <code>ok</code>. أيّ نهاية تكمّلها، فيبلغ <code>B18</code> القيمة 8,062.00 وتقرأ خانة الفحص <code>B19</code> القيمة 0.00؟"
        },
        code: code(
          "B2    =SUMIFS(tblOrders[line_total], tblOrders[item_clean], A2, ____)",
          "B18   =SUM(B2:B17)",
          "B19   =B18-SUMIFS(tblOrders[line_total], tblOrders[status], \"ok\")"
        ),
        options: [
          {
            code: "tblOrders[status], \"<>ok\""
          },
          {
            code: "tblOrders[dup_n], 1"
          },
          {
            code: "tblOrders[status], \"ok\""
          },
          {
            code: "\"ok\""
          }
        ],
        answer: 2,
        solution: {
          code: "B2    =SUMIFS(tblOrders[line_total], tblOrders[item_clean], A2, tblOrders[status], \"ok\")",
          en: "Every condition in a <code>SUMIFS</code> is a <em>pair</em>: the column to test, then the criterion. With the <code>status</code> pair in place <code>B2</code> gives Shawarma Wrap 1,368.00, <code>B18</code> gives 8,062.00, and <code>B19</code> &mdash; the same total reached a second way &mdash; reads 0.00.",
          ar: "كل شرط في <code>SUMIFS</code> <em>زوج</em>: العمود المختبَر ثم المعيار. وبوجود زوج <code>status</code> يعطي <code>B2</code> للشاورما 1,368.00، ويعطي <code>B18</code> القيمة 8,062.00، وتقرأ <code>B19</code> &mdash; وهي المجموع نفسه محسوبًا بطريق ثانٍ &mdash; القيمة 0.00."
        },
        hint: {
          en: "Count the arguments. After the sum range, <code>SUMIFS</code> reads them two at a time.",
          ar: "عُدّ الوسائط. فبعد نطاق الجمع تقرأ <code>SUMIFS</code> الوسائط اثنين اثنين."
        },
        explain: {
          en: "<code>SUMIFS</code> takes the sum range first and then pairs: a criteria range and its criterion. Testing <code>status</code> against <code>&quot;&lt;&gt;ok&quot;</code> sums exactly the lines the rules throw away &mdash; the 16 duplicates, the 5 refunds, the 120.0 typo and the <code>n/a</code> line &mdash; so <code>B18</code> would read 272.00. Testing <code>dup_n</code> against 1 keeps the first copy of every repeated line but still counts the refunds and the typo, giving 8,159.00. A bare <code>&quot;ok&quot;</code> is not a pair at all: a criterion with no column to test it against is a broken formula. The slip to be really afraid of is leaving the <code>status</code> pair out altogether: Shawarma Wrap then reads 1,512.00 and the grand total 8,334.00 &mdash; plausible numbers, same ranking, no error, no warning. That is why <code>B19</code> exists: it reaches the counted total by a second route and must read 0.00, so a forgotten condition shows up as a number instead of staying a secret.",
          ar: "تأخذ <code>SUMIFS</code> نطاق الجمع أولًا ثم أزواجًا: نطاق معيار ومعياره. واختبار <code>status</code> مقابل <code>&quot;&lt;&gt;ok&quot;</code> يجمع بالضبط الأسطر التي ترميها القواعد &mdash; المكررات الـ16 والمرتجعات الخمسة وخطأ 120.0 وسطر <code>n/a</code> &mdash; فيقرأ <code>B18</code> القيمة 272.00. واختبار <code>dup_n</code> مقابل 1 يُبقي النسخة الأولى من كل سطر مكرر لكنه يبقي عدّ المرتجعات والخطأ المطبعي، فيعطي 8,159.00. و<code>&quot;ok&quot;</code> مجردة ليست زوجًا أصلًا: فالمعيار بلا عمود يُختبر تجاهه صيغة معطوبة. أما الزلّة التي يجب الخوف منها حقًّا فهي إسقاط زوج <code>status</code> كلّيًّا: فتقرأ الشاورما 1,512.00 والمجموع الكلي 8,334.00 &mdash; أرقام معقولة، والترتيب نفسه، ولا خطأ ولا تحذير. ولهذا توجد <code>B19</code>: فهي تبلغ المجموع المعدود بطريق ثانٍ ويجب أن تقرأ 0.00، فيظهر الشرط المنسي رقمًا بدل أن يبقى سرًّا."
        }
      },
      {
        id: "p1ax15",
        type: "mcq",
        level: "medium",
        topics: [
          "p1-xl-pivot-hours",
          "p1-xl-pivot-caveats"
        ],
        q: {
          en: "A PivotTable on <code>tblOrders</code> with no filter: Rows = <code>hour</code>, Values = Count of <code>order_id</code>. It reports 155 at 13:00 against 149 at 12:00, so a colleague writes &ldquo;we are busiest at 13:00&rdquo;. The project card defines the busiest hour as the hour with the most <em>distinct</em> <code>order_id</code> values, over the lines the rules keep. What is wrong, and what is the answer?",
          ar: "جدول محوري على <code>tblOrders</code> بلا مرشِّح: الصفوف = <code>hour</code>، والقيم = Count of <code>order_id</code>. يبلّغ بالقيمة 155 عند الساعة 13:00 مقابل 149 عند 12:00، فيكتب زميل «نزدحم أكثر عند 13:00». وتعرّف بطاقة المشروع الساعة الأكثر ازدحامًا بأنها الساعة التي فيها أكبر عدد من قيم <code>order_id</code> <em>المميزة</em> على الأسطر التي تحتفظ بها القواعد. ما الخطأ؟ وما الجواب؟"
        },
        options: [
          {
            en: "Nothing is wrong: the field counts <code>order_id</code> values, and 155 beats 149, so 13:00 is the busiest hour.",
            ar: "لا خطأ: فالحقل يعدّ قيم <code>order_id</code>، والقيمة 155 تسبق 149، فالساعة 13:00 هي الأكثر ازدحامًا."
          },
          {
            en: "The PivotTable simply needs refreshing: after <em>Refresh All</em> the same field reports the distinct orders, 119 and 117.",
            ar: "الجدول المحوري يحتاج تحديثًا فقط: فبعد <em>Refresh All</em> يبلّغ الحقل نفسه بالطلبات المميزة، 119 و117."
          },
          {
            en: "Count of <code>order_id</code> is the wrong aggregation: Sum of <code>order_id</code> ranks the hours correctly, because every order contributes its own id.",
            ar: "الحقل Count of <code>order_id</code> تجميع خاطئ: فـSum of <code>order_id</code> يرتّب الساعات ترتيبًا صحيحًا لأن كل طلب يساهم بمعرّفه."
          },
          {
            en: "It counts <em>lines</em>, and the Table still holds the dirty rows; counting distinct orders over the counted lines gives 12:00, 119 against 117.",
            ar: "إنه يعدّ <em>الأسطر</em>، والجدول ما زال يحتوي الصفوف المتسخة؛ وعدّ الطلبات المميزة على الأسطر المعدودة يعطي 12:00 بـ119 مقابل 117."
          }
        ],
        answer: 3,
        hint: {
          en: "Two separate things are wrong at once, and fixing only one of them still names 13:00.",
          ar: "شيئان مختلفان خاطئان في الوقت نفسه، وإصلاح أحدهما وحده يبقى يسمّي الساعة 13:00."
        },
        explain: {
          en: "Count of <code>order_id</code> counts how many <em>lines</em> carry an id, and an order can be rung up as several lines, so 155 answers &ldquo;how many lines at 13:00&rdquo;. The count is not wrong; it answers a different question. Both corrections are needed, which is what makes this a good trap: on the raw lines 13:00 wins 155 to 149, and on the <em>cleaned</em> lines it still wins, 148 to 144 &mdash; cleaning alone does not change the verdict. Counting distinct orders over the counted lines gives 119 at 12:00 and 117 at 13:00. In Excel you get there either by ticking <em>Add this data to the Data Model</em> when the PivotTable is created and setting Value Field Settings to <em>Distinct Count</em>, or with the <code>order_first</code> helper column, which puts a 1 on the first counted line of each order and 0 elsewhere, and summing it. Refresh re-reads the Table; it cannot change what a Count counts. And summing identifiers is meaningless &mdash; it comes to 3,973,001 over the counted lines.",
          ar: "الحقل Count of <code>order_id</code> يعدّ كم <em>سطرًا</em> يحمل معرّفًا، والطلب الواحد قد يُسجَّل في عدة أسطر، فالقيمة 155 تجيب عن «كم سطرًا عند 13:00». والعدّ ليس خاطئًا؛ بل يجيب عن سؤال آخر. والتصحيحان كلاهما لازم، وهذا ما يجعل الفخّ جيدًا: فعلى الأسطر الخام يفوز 13:00 بـ155 مقابل 149، وعلى الأسطر <em>المنظَّفة</em> يبقى فائزًا بـ148 مقابل 144 &mdash; فالتنظيف وحده لا يغيّر الحكم. أما عدّ الطلبات المميزة على الأسطر المعدودة فيعطي 119 عند 12:00 و117 عند 13:00. وفي Excel تصل إلى ذلك بتأشير <em>Add this data to the Data Model</em> عند إنشاء الجدول المحوري وضبط Value Field Settings على <em>Distinct Count</em>، أو بالعمود المساعد <code>order_first</code> الذي يضع 1 على أول سطر معدود في كل طلب و0 فيما سواه ثم تجمعه. والتحديث يعيد قراءة الجدول؛ ولا يستطيع تغيير ما يعدّه العدّ. وجمع المعرّفات لا معنى له &mdash; فهو يبلغ 3,973,001 على الأسطر المعدودة."
        }
      },
      {
        id: "p1ax16",
        type: "error",
        level: "hard",
        topics: [
          "p1-xl-duplicates",
          "p1-xl-helper-columns"
        ],
        lang: "excel",
        q: {
          en: "The helper columns of a colleague's workbook. Filtering <code>dup_n &gt; 1</code> shows 32 rows instead of the 16 the lesson expects: each of the 16 double-entered lines appears together with the original it copies, so deleting what the filter shows would take a real sale away with every duplicate. Nothing returns an error. Click the line that is responsible.",
          ar: "الأعمدة المساعدة في مصنَّف زميل. ترشيح <code>dup_n &gt; 1</code> يُظهر 32 صفًّا بدل الـ16 التي يتوقعها الدرس: فكل سطر من الأسطر الـ16 المُدخَلة مرتين يظهر مع الأصل الذي ينسخه، فحذف ما يظهره المرشِّح سيُخرج بيعة حقيقية مع كل مكرر. ولا شيء يُعيد خطأً. انقر السطر المسؤول."
        },
        code: code(
          "item_clean   =TRIM([@item])",
          "menu_price   =XLOOKUP([@item_clean], tblMenu[item], tblMenu[list_price], \"not on menu\")",
          "line_key     =TEXTJOIN(\"|\", FALSE, [@[order_id]:[customer_type]])",
          "dup_n        =COUNTIF(tblOrders[line_key], [@line_key])",
          "line_total   =IF(ISNUMBER([@unit_price]), [@qty]*[@unit_price], \"\")",
          "status       =IFS([@dup_n]>1, \"duplicate\", [@qty]<=0, \"refund\", NOT(ISNUMBER([@unit_price])), \"bad price\", TRUE, \"ok\")"
        ),
        answer: 4,
        solution: {
          code: "dup_n        =COUNTIFS(INDEX([line_key],1):[@line_key], [@line_key])",
          en: "The range must grow with the row. <code>INDEX([line_key],1):[@line_key]</code> counts from the first row down to <em>this</em> one only, so the first copy reads 1 and its repeat reads 2 &mdash; and <code>=COUNTIFS(tblOrders[dup_n],\"&gt;1\")</code> returns 16 against <code>=COUNTIFS(tblOrders[dup_n],\"&lt;=1\")</code>'s 755.",
          ar: "يجب أن ينمو النطاق مع الصف. فـ<code>INDEX([line_key],1):[@line_key]</code> يعدّ من الصف الأول نزولًا إلى <em>هذا</em> الصف فقط، فتقرأ النسخة الأولى 1 ويقرأ تكرارها 2 &mdash; وتُعيد <code>=COUNTIFS(tblOrders[dup_n],\"&gt;1\")</code> القيمة 16 مقابل 755 من <code>=COUNTIFS(tblOrders[dup_n],\"&lt;=1\")</code>."
        },
        hint: {
          en: "The flag is meant to mark the <em>second</em> copy, not the pair. Which part of the formula knows which row it is on?",
          ar: "المقصود من العلامة أن تعلّم النسخة <em>الثانية</em> لا الزوج. أي جزء من الصيغة يعرف على أي صف هو؟"
        },
        explain: {
          en: "Line 4 counts the <em>whole</em> column, so both members of every identical pair get 2 and the filter shows 32 rows &mdash; 16 duplicates plus the 16 legitimate lines they copy. What spares the first copy is a <em>running</em> range: <code>INDEX([line_key],1):[@line_key]</code> grows as it is filled down, so the original reads 1 and the repeat reads 2. The tempting clicks are the <code>status</code> line, because that is where the <code>&gt;1</code> test is written, and <code>line_key</code>, because people suspect the key &mdash; but the key is right, and it is right for a reason: a duplicate here means a line whose <em>eight original columns</em> all repeat, not a repeated <code>order_id</code>. Order 5103 has Tea &times; 3 by card and Tea &times; 1 in cash, and must not be flagged; ticking only <code>order_id</code> in <em>Remove Duplicates</em> is what removes 155 lines of which 139 are real sales. A flag, unlike a deletion, leaves the evidence on the sheet &mdash; but only if it marks the copy and not the original.",
          ar: "السطر 4 يعدّ العمود <em>كله</em>، فيأخذ طرفا كل زوج متطابق القيمة 2 ويُظهر المرشِّح 32 صفًّا &mdash; 16 مكررًا مع 16 سطرًا شرعيًّا تنسخها. والذي يُعفي النسخة الأولى نطاق <em>متنامٍ</em>: فـ<code>INDEX([line_key],1):[@line_key]</code> ينمو أثناء السحب نزولًا، فيقرأ الأصل 1 ويقرأ التكرار 2. والنقرتان المغريتان هما سطر <code>status</code> لأن اختبار <code>&gt;1</code> مكتوب فيه، و<code>line_key</code> لأن الناس تشك في المفتاح &mdash; لكن المفتاح صحيح، وصحيح لسبب: فالمكرر هنا سطر تتكرر <em>أعمدته الأصلية الثمانية</em> كلها، لا سطر يتكرر <code>order_id</code> فيه. فالطلب 5103 فيه شاي &times; 3 بالبطاقة وشاي &times; 1 نقدًا، ولا يجوز وسمه؛ وتأشير <code>order_id</code> وحده في <em>Remove Duplicates</em> هو ما يحذف 155 سطرًا منها 139 بيعة حقيقية. والعلامة، بخلاف الحذف، تُبقي الدليل على الورقة &mdash; لكن بشرط أن تعلّم النسخة لا الأصل."
        }
      },
      {
        id: "p1ax17",
        type: "ordercode",
        level: "medium",
        topics: [
          "p1-applied-steps",
          "p1-pq-cleaning-steps",
          "p1-step-order"
        ],
        lang: "m",
        q: {
          en: "The Applied Steps of the orders query, as the M that Power Query generates. The step <code>Source</code> already reads the CSV. Put the seven steps that follow it in the order in which they must run &mdash; each one names the step before it, and the row counts then read 771, 771, 771, 771, 755, 748, 748.",
          ar: "الخطوات المطبَّقة في استعلام الطلبات، بصيغة M التي يولّدها Power Query. والخطوة <code>Source</code> تقرأ ملف CSV أصلًا. رتّب الخطوات السبع التي تليها بالترتيب الذي يجب أن تجري به &mdash; فكل خطوة تسمّي التي قبلها، وتقرأ أعداد الصفوف حينئذ 771 و771 و771 و771 و755 و748 و748."
        },
        items: [
          {
            code: "Promoted = Table.PromoteHeaders(Source, [PromoteAllScalars = true])"
          },
          {
            code: code(
              "Typed = Table.TransformColumnTypes(Promoted,",
              "    {{\"qty\", Int64.Type}, {\"unit_price\", type number}}, \"en-US\")"
            )
          },
          {
            code: "NoErrors = Table.ReplaceErrorValues(Typed, {{\"unit_price\", null}})"
          },
          {
            code: code(
              "Tidy = Table.TransformColumns(NoErrors,",
              "    {{\"item\", each Text.Proper(Text.Trim(_)), type text}})"
            )
          },
          {
            code: "Unique = Table.Distinct(Tidy)"
          },
          {
            code: code(
              "Valid = Table.SelectRows(Unique,",
              "    each [qty] > 0 and [unit_price] <> null and [unit_price] < 50)"
            )
          },
          {
            code: code(
              "WithTotal = Table.AddColumn(Valid, \"line_total\",",
              "    each [qty] * [unit_price], type number)"
            )
          }
        ],
        answer: [0, 1, 2, 3, 4, 5, 6],
        hint: {
          en: "Every statement needs a table an earlier statement made. Ask which step turns the text <code>n/a</code> into an Error, and whether you can compare a price with 50 before the column is a number.",
          ar: "كل عبارة تحتاج جدولًا صنعته عبارة سابقة. اسأل: أي خطوة تحوّل النص <code>n/a</code> إلى قيمة Error؟ وهل تستطيع مقارنة سعر بالعدد 50 قبل أن يصير العمود رقمًا؟"
        },
        explain: {
          en: "Types come first, because every later step compares or multiplies numbers: filter <code>[unit_price] &lt; 50</code> while the column is still text and the step raises an error, and run <code>Table.ReplaceErrorValues</code> <em>before</em> <code>Table.TransformColumnTypes</code> and it replaces nothing at all &mdash; the text <code>n/a</code> only becomes an Error when the type is applied. The item names are tidied next, before the de-duplication and before any join to the menu, so that both sides of the join spell an item the same way. <code>Table.Distinct</code> compares whole rows, so it must come before anything that adds a column: a column that is unique per row (an index, a row number, a timestamp) makes every row distinct, so the step removes nothing, the count reads 764 instead of 748 and revenue reads 8,237.00 &mdash; 175.00 of phantom money, with no message. <code>line_total</code> is last, because it needs clean numbers. The row counts are the cheapest check you have: read them down the Applied Steps list and ask where the count was <em>supposed</em> to change.",
          ar: "الأنواع أولًا، لأن كل خطوة لاحقة تقارن أرقامًا أو تضربها: فلو رشّحت <code>[unit_price] &lt; 50</code> والعمود ما زال نصًّا رفعت الخطوة خطأً، ولو شغّلت <code>Table.ReplaceErrorValues</code> <em>قبل</em> <code>Table.TransformColumnTypes</code> لما استبدلت شيئًا على الإطلاق &mdash; فالنص <code>n/a</code> لا يصير Error إلا حين يُطبَّق النوع. ثم تُهذَّب أسماء الأصناف قبل إزالة المكرر وقبل أي ضمّ إلى القائمة، كي يتهجّأ طرفا الضمّ الصنف بالطريقة نفسها. و<code>Table.Distinct</code> يقارن صفوفًا كاملة، فيجب أن يأتي قبل أي شيء يضيف عمودًا: فالعمود الفريد لكل صف (فهرس أو رقم صف أو طابع زمني) يجعل كل صف مميزًا، فلا تزيل الخطوة شيئًا، ويقرأ العدد 764 بدل 748 ويقرأ الإيراد 8,237.00 &mdash; أي 175.00 من المال الوهمي، بلا أي رسالة. و<code>line_total</code> أخيرًا لأنه يحتاج أرقامًا نظيفة. وأعداد الصفوف أرخص فحص لديك: اقرأها نزولًا في قائمة الخطوات المطبَّقة واسأل: أين كان <em>يُفترض</em> أن يتغير العدد؟"
        }
      },
      {
        id: "p1ax18",
        type: "match",
        level: "easy",
        topics: [
          "p1-dax-measures",
          "p1-measure-vs-column",
          "p1-summarization"
        ],
        lang: "dax",
        q: {
          en: "Six cards on the Power BI page, all built on the same 748 counted lines. Match each measure or field to the number it puts on its card.",
          ar: "ستة عناصر بطاقة في صفحة Power BI، كلها مبنية على الأسطر المعدودة الـ748 نفسها. وصّل كل مقياس أو حقل بالرقم الذي يضعه في بطاقته."
        },
        pairs: [
          {
            l: {
              code: "Total Revenue = SUMX(Orders, Orders[qty] * Orders[unit_price])"
            },
            r: {
              code: "8,062.00"
            }
          },
          {
            l: {
              code: "Orders Count = DISTINCTCOUNT(Orders[order_id])"
            },
            r: {
              code: "611"
            }
          },
          {
            l: {
              code: "Revenue per Order = DIVIDE([Total Revenue], [Orders Count])"
            },
            r: {
              code: "13.19"
            }
          },
          {
            l: {
              code: "Units Sold = SUM(Orders[qty])"
            },
            r: {
              code: "1,240"
            }
          },
          {
            l: {
              code: "Line Count = COUNTROWS(Orders)"
            },
            r: {
              code: "748"
            }
          },
          {
            l: {
              code: "the line_total column dragged in, Sum switched to Average"
            },
            r: {
              code: "10.78"
            }
          }
        ],
        leftHead: {
          en: "Measure or field",
          ar: "المقياس أو الحقل"
        },
        rightHead: {
          en: "What its card shows",
          ar: "ما تعرضه بطاقته"
        },
        hint: {
          en: "Ask of each number whether it is money, a number of orders, a number of lines, a number of portions, or a ratio. Two of the six are counts of different things.",
          ar: "اسأل عن كل رقم: هل هو مال أم عدد طلبات أم عدد أسطر أم عدد حصص أم نسبة؟ واثنان من الستة عدّان لشيئين مختلفين."
        },
        explain: {
          en: "The name ending in X is an iterator: <code>SUMX</code> multiplies <code>qty</code> by <code>unit_price</code> on each of the 748 rows and only then adds, which is why plain <code>SUM</code> cannot do this job &mdash; <code>SUM(Orders[qty]) * AVERAGE(Orders[unit_price])</code> comes to 8,084.87, which is 22.87 out with no error anywhere. <code>DISTINCTCOUNT</code> answers &ldquo;how many orders?&rdquo;, 611, where <code>COUNTROWS</code> answers &ldquo;how many lines?&rdquo;, 748: the grain again, and the gap is the same reason the raw file has 771 lines in 616 orders. <code>DIVIDE</code> divides two <em>totals</em> (8,062.00 / 611 = 13.19), not an average of per-row ratios, and it returns blank instead of an error if the count is ever zero. <code>SUM(Orders[qty])</code> counts portions, 1,240, not orders. And the last row is the warning: a single click on a field's drop-down turns 8,062.00 into 10.78 &mdash; revenue per <em>line</em> &mdash; under a heading that still reads like a total. That is why money and counts belong in named measures, not in a drop-down a reader can change.",
          ar: "الاسم المنتهي بحرف X مكرِّر: فـ<code>SUMX</code> تضرب <code>qty</code> في <code>unit_price</code> في كل صف من الصفوف الـ748 ثم تجمع بعد ذلك، ولهذا لا تستطيع <code>SUM</code> العادية أداء هذا العمل &mdash; فـ<code>SUM(Orders[qty]) * AVERAGE(Orders[unit_price])</code> تبلغ 8,084.87، أي بفارق 22.87 بلا أي خطأ في أي مكان. و<code>DISTINCTCOUNT</code> تجيب عن «كم طلبًا؟» بالقيمة 611، حيث تجيب <code>COUNTROWS</code> عن «كم سطرًا؟» بالقيمة 748: الحبيبة مرة أخرى، والفارق هو السبب نفسه الذي يجعل الملف الخام 771 سطرًا في 616 طلبًا. و<code>DIVIDE</code> تقسم <em>مجموعين</em> (‏8,062.00 ÷ 611 = 13.19) لا متوسط نسب الصفوف، وتُعيد قيمة فارغة بدل خطأ إن صار العدد صفرًا يومًا. و<code>SUM(Orders[qty])</code> تعدّ الحصص، 1,240، لا الطلبات. والصف الأخير هو التحذير: فنقرة واحدة على قائمة الحقل المنسدلة تحوّل 8,062.00 إلى 10.78 &mdash; الإيراد لكل <em>سطر</em> &mdash; تحت عنوان ما زال يُقرأ كأنه مجموع. ولهذا ينتمي المال والأعداد إلى مقاييس مسمّاة، لا إلى قائمة منسدلة يستطيع القارئ تغييرها."
        }
      },
      {
        id: "p1ax19",
        type: "mcq",
        level: "easy",
        topics: [
          "p1-summarization",
          "p1-pbi-pitfalls"
        ],
        q: {
          en: "A reader drags <code>order_id</code> onto a card to see how many orders there were. The card is headed <em>Sum of order_id</em> and shows 3,973,001. What happened?",
          ar: "يسحب قارئ الحقل <code>order_id</code> إلى بطاقة ليرى كم طلبًا كان. فتُعنوَن البطاقة <em>Sum of order_id</em> وتعرض 3,973,001. ماذا حدث؟"
        },
        options: [
          {
            en: "The duplicates were never removed, so the ids are being added twice over; after the <em>Remove Duplicates</em> step the card will show 611.",
            ar: "لم تُزَل المكررات قط، فتُجمع المعرّفات مرتين؛ وبعد خطوة <em>Remove Duplicates</em> ستعرض البطاقة 611."
          },
          {
            en: "Power BI applied its default summarisation, Sum, to a whole-number column that is really an identifier.",
            ar: "طبّق Power BI تلخيصه الافتراضي Sum على عمود من نوع عدد صحيح هو في الحقيقة معرّف."
          },
          {
            en: "The relationship to <code>Menu</code> is sending the filter the wrong way, so every menu row is being counted once per order line.",
            ar: "العلاقة مع <code>Menu</code> ترسل المرشِّح في الاتجاه الخاطئ، فيُعدّ كل صف من القائمة مرة لكل سطر طلب."
          },
          {
            en: "A card is the wrong visual for a count: a card can only add numbers up, so the question needs a table or a matrix instead.",
            ar: "البطاقة عنصر مرئي خاطئ للعدّ: فالبطاقة لا تستطيع إلا جمع الأرقام، فالسؤال يحتاج جدولًا أو مصفوفة بدلًا منها."
          }
        ],
        answer: 1,
        hint: {
          en: "Look at the heading the card gave itself, and ask who chose the word <em>Sum</em>.",
          ar: "انظر إلى العنوان الذي أعطته البطاقة لنفسها، واسأل: من اختار كلمة <em>Sum</em>؟"
        },
        explain: {
          en: "The default reads a column's <em>type</em> as its <em>meaning</em>: anything Power BI typed as a whole number gets a sigma in the Data pane and is summed the moment it is dragged. The sum of identifiers would be just as meaningless on perfectly clean data, which is why blaming the duplicates misses the point &mdash; and in this file the duplicates <em>were</em> removed; 748 counted lines are what produces 3,973,001. A relationship cannot turn a count into a sum, and a card shows whatever its field's summarisation produces, so neither of the last two options touches the cause. Three cures, weakest to strongest: change the field's summarisation in the well, make the column text in Power Query so that nothing can ever add it up, or write a named measure. The rule to carry away: a number is not always a quantity, and the most durable place to decide what a column means is a measure, not a drop-down a reader can click.",
          ar: "الافتراض يقرأ <em>نوع</em> العمود على أنه <em>معناه</em>: فكل ما حدّده Power BI عددًا صحيحًا يأخذ رمز سيجما في لوحة البيانات ويُجمع لحظة سحبه. ومجموع المعرّفات بلا معنى أيضًا على بيانات نظيفة تمامًا، ولهذا يُخطئ لوم المكررات المقصد &mdash; وفي هذا الملف قد أُزيلت المكررات <em>فعلًا</em>؛ فالأسطر المعدودة الـ748 هي ما ينتج 3,973,001. والعلاقة لا تستطيع تحويل عدّ إلى جمع، والبطاقة تعرض ما ينتجه تلخيص حقلها، فلا يمسّ أي من الخيارين الأخيرين السبب. وثلاثة علاجات من الأضعف إلى الأقوى: غيّر تلخيص الحقل في الحوض، أو اجعل العمود نصًّا في Power Query فلا يستطيع شيء جمعه أبدًا، أو اكتب مقياسًا مسمّى. والقاعدة التي تُحمَل: ليس كل رقم كمّية، وأدوم موضع لتقرير معنى العمود هو المقياس، لا قائمة منسدلة يستطيع القارئ نقرها."
        }
      },
      {
        id: "p1ax20",
        type: "tf",
        level: "medium",
        topics: [
          "p1-model-relationships",
          "p1-star-schema"
        ],
        q: {
          en: "<code>Orders</code> and <code>Menu</code> are joined on <code>item</code> with cardinality <em>Many to one</em> (<code>*:1</code>), <code>Menu</code> on the one side, and cross filter direction <em>Single</em>. A reader clicks <em>Staff</em> in a slicer built on <code>Orders[customer_type]</code>. True or false: the bar chart of revenue by <code>Menu[item]</code> will shrink to the items Staff actually bought.",
          ar: "الجدولان <code>Orders</code> و<code>Menu</code> موصولان على <code>item</code> بتعدّدية <em>Many to one</em> (<code>*:1</code>) و<code>Menu</code> في جانب الواحد، واتجاه الترشيح المتقاطع <em>Single</em>. ينقر قارئ <em>Staff</em> في مُقسِّم مبني على <code>Orders[customer_type]</code>. صح أم خطأ: سيتقلّص مخطط الأعمدة لإيراد <code>Menu[item]</code> إلى الأصناف التي اشتراها الموظفون فعلًا."
        },
        truth: false,
        hint: {
          en: "<em>Single</em> is a one-way street. Which side is it pointing from, and which side is the slicer on?",
          ar: "كلمة <em>Single</em> تعني طريقًا باتجاه واحد. من أي جانب يتجه؟ وفي أي جانب المُقسِّم؟"
        },
        explain: {
          en: "False. <em>Single</em> means one way: the filter travels from the one side, <code>Menu</code>, to the many side, <code>Orders</code> &mdash; not back. The slicer does reach the measure, because the lines themselves are being filtered: <code>Total Revenue</code> drops to 1,716.50 over 154 orders. But the axis is <code>Menu[item]</code>, and nothing has filtered <code>Menu</code>, so all 16 items stay on the chart and the ones Staff never bought simply draw nothing. People expect otherwise because &ldquo;the tables are connected&rdquo; &mdash; connected is not symmetrical. Setting the direction to <em>Both</em> would propagate it, at the price of ambiguous models and slower queries; the honest fix is to put the axis on the column the question is about. And the one-way rule explains the related surprise in reverse: a slicer built on <code>Menu[category]</code> leaves the revenue card at 8,062.00 when no relationship exists at all, because then the filter has no path to travel along.",
          ar: "خطأ. كلمة <em>Single</em> تعني اتجاهًا واحدًا: ينتقل المرشِّح من جانب الواحد، <code>Menu</code>، إلى جانب المتعدّد، <code>Orders</code> &mdash; لا العكس. والمُقسِّم يصل إلى المقياس فعلًا لأن الأسطر نفسها تُرشَّح: فينزل <code>Total Revenue</code> إلى 1,716.50 على 154 طلبًا. لكن المحور هو <code>Menu[item]</code>، ولم يرشّح شيء <code>Menu</code>، فتبقى الأصناف الـ16 كلها على المخطط ولا ترسم التي لم يشترها الموظفون شيئًا. والناس يتوقعون غير ذلك لأن «الجدولين موصولان» &mdash; والوصل ليس متناظرًا. وضبط الاتجاه على <em>Both</em> ينشر المرشِّح، بثمن نماذج غامضة واستعلامات أبطأ؛ والإصلاح الصريح أن تضع المحور على العمود الذي يتعلق به السؤال. وقاعدة الاتجاه الواحد تفسّر المفاجأة المقابلة بالمقلوب: فمُقسِّم مبني على <code>Menu[category]</code> يُبقي بطاقة الإيراد على 8,062.00 حين لا توجد علاقة أصلًا، لأن المرشِّح لا يجد حينها طريقًا يسير فيه."
        }
      },
      {
        id: "p1ax21",
        type: "trace",
        level: "medium",
        topics: [
          "p1-rules-r1-r5",
          "p1-lines-in-out",
          "p1-rule-order"
        ],
        lang: "python",
        q: {
          en: "R1 (drop a line when all eight original columns repeat an earlier line), R2 (drop a line with <code>qty &lt;= 0</code>) and R3 (drop a line whose <code>unit_price</code> is missing or above 50), applied in that order to the raw file. After the last line has run, what are the five variables? (Write the revenue as the program would show it.)",
          ar: "القاعدة R1 (احذف السطر إذا تكررت أعمدته الأصلية الثمانية كلها عن سطر سابق) وR2 (احذف السطر الذي <code>qty &lt;= 0</code> فيه) وR3 (احذف السطر الذي <code>unit_price</code> فيه مفقود أو أكبر من 50)، مطبَّقة بهذا الترتيب على الملف الخام. بعد تنفيذ السطر الأخير، ما قيم المتغيرات الخمسة؟ (اكتب الإيراد كما يعرضه البرنامج.)"
        },
        code: code(
          "import pandas as pd",
          "",
          "raw = pd.read_csv(\"cafeteria_orders.csv\")",
          "n0 = len(raw)",
          "",
          "step1 = raw.drop_duplicates()                       # R1",
          "n1 = len(step1)",
          "",
          "step2 = step1[step1[\"qty\"] > 0]                      # R2",
          "n2 = len(step2)",
          "",
          "price = step2[\"unit_price\"]",
          "step3 = step2[price.notna() & (price <= 50)]         # R3",
          "n3 = len(step3)",
          "",
          "revenue = round((step3[\"qty\"] * step3[\"unit_price\"]).sum(), 2)"
        ),
        blanks: [
          {
            accept: [
              "771"
            ],
            label: {
              en: "<code>n0</code>",
              ar: "<code>n0</code>"
            }
          },
          {
            accept: [
              "755"
            ],
            label: {
              en: "<code>n1</code>",
              ar: "<code>n1</code>"
            }
          },
          {
            accept: [
              "750"
            ],
            label: {
              en: "<code>n2</code>",
              ar: "<code>n2</code>"
            }
          },
          {
            accept: [
              "748"
            ],
            label: {
              en: "<code>n3</code>",
              ar: "<code>n3</code>"
            }
          },
          {
            accept: [
              "8062.0",
              "8062.00",
              "8062"
            ],
            label: {
              en: "<code>revenue</code>",
              ar: "<code>revenue</code>"
            }
          }
        ],
        hint: {
          en: "The chapter's removal log is 16, 5 and 2. Watch R2: a refund line carries negative money, so leaving it out moves the total the other way.",
          ar: "سجل الإزالة في الفصل هو 16 و5 و2. وراقب R2: فسطر المرتجع يحمل مالًا سالبًا، فاستبعاده يحرّك المجموع في الاتجاه الآخر."
        },
        explain: {
          en: "771 lines in. R1 removes the 16 double-entered lines, R2 the 5 refunds, R3 the price typed 120.0 instead of 12.0 and the line whose price read <code>n/a</code>: 16 + 5 + 2 = 23 removed, so 748 counted lines and 8,062.00 against the raw 8,334.00. The arithmetic runs 8,334.00 &minus; 175.00 + 23.00 &minus; 120.00 = 8,062.00 &mdash; excluding a refund <em>raises</em> the total, because the refund was subtracting, and the <code>n/a</code> line carries no money at all, so R3 removes two lines but only one amount. That is exactly why a reconciliation reports lines <em>and</em> revenue: a rule can be missing without the money moving. Reordering these three rules gives the same 748 and the same 8,062.00, because each judges a line on its own fields and none of the 16 duplicates is also a refund or badly priced &mdash; but that is a measurement on this file, not a theorem, so quote the log your run printed, never the one you remember.",
          ar: "‏771 سطرًا داخلًا. تزيل R1 الأسطر الـ16 المُدخَلة مرتين، وتزيل R2 المرتجعات الخمسة، وتزيل R3 السعر المكتوب 120.0 بدل 12.0 والسطر الذي سعره <code>n/a</code>: أي 16 + 5 + 2 = 23 سطرًا مُزالًا، فتبقى 748 سطرًا معدودًا و8,062.00 مقابل 8,334.00 الخام. والحساب يسير 8,334.00 &minus; 175.00 + 23.00 &minus; 120.00 = 8,062.00 &mdash; فاستبعاد المرتجع <em>يرفع</em> المجموع لأنه كان يطرح، وسطر <code>n/a</code> لا يحمل مالًا أصلًا، فتزيل R3 سطرين ومبلغًا واحدًا فقط. ولهذا بالضبط تُبلغ المطابقة بالأسطر <em>والإيراد</em>: فقد تغيب قاعدة دون أن يتحرك المال. وإعادة ترتيب هذه القواعد الثلاث تعطي 748 نفسها و8,062.00 نفسها، لأن كل قاعدة تحكم على السطر بحقوله وحدها ولأن أيًّا من المكررات الـ16 ليس مرتجعًا ولا سيئ السعر &mdash; لكن هذا قياس على هذا الملف لا نظرية، فانقل السجل الذي طبعه تشغيلك لا السجل الذي تتذكره."
        }
      },
      {
        id: "p1ax22",
        type: "output",
        level: "medium",
        topics: [
          "p1-rules-as-data",
          "p1-invisible-rules",
          "p1-reconciliation"
        ],
        lang: "python",
        q: {
          en: "R1, R2 and R3 have been applied; rule R5 &mdash; replace a blank <code>payment</code> with <code>\"Unknown\"</code> &mdash; has not. 17 lines of the raw file have no recorded payment. Write exactly what the program prints (three lines).",
          ar: "طُبِّقت R1 وR2 وR3؛ ولم تُطبَّق القاعدة R5 &mdash; أي استبدال <code>payment</code> الفارغ بـ<code>\"Unknown\"</code>. و17 سطرًا من الملف الخام بلا طريقة دفع مسجَّلة. اكتب بالضبط ما يطبعه البرنامج (ثلاثة أسطر)."
        },
        code: code(
          "import pandas as pd",
          "",
          "raw = pd.read_csv(\"cafeteria_orders.csv\")",
          "clean = raw.drop_duplicates()",
          "clean = clean[(clean[\"qty\"] > 0) & (clean[\"unit_price\"] <= 50)]",
          "clean = clean.assign(line_total=clean[\"qty\"] * clean[\"unit_price\"])",
          "",
          "print(len(clean))",
          "print(round(clean[\"line_total\"].sum(), 2))",
          "print(round(clean.groupby(\"payment\")[\"line_total\"].sum().sum(), 2))"
        ),
        blanks: [
          {
            accept: [
              "748\n8062.0\n7901.0"
            ],
            lines: 3
          }
        ],
        hint: {
          en: "The first two numbers are the chapter's headline figures. For the third, ask what <code>groupby</code> does with a row whose key is missing.",
          ar: "الرقمان الأولان هما الرقمان الرئيسيان في الفصل. وللثالث اسأل: ماذا تفعل <code>groupby</code> بصف مفتاحه مفقود؟"
        },
        explain: {
          en: "748 counted lines and 8,062.00 of revenue &mdash; and a payment breakdown that adds up to only 7,901.00. <code>groupby</code> drops rows whose key is missing, so the 16 counted lines with no recorded payment, carrying 161.00 of perfectly real revenue, are simply not in the breakdown: four rows that look complete, sum to the wrong number, and raise nothing. (The 17th blank sits on a refund line, which R2 had already removed.) That is what R5 is for, and R5 is the rule whose absence the headline numbers cannot see: lines, revenue, the item count and the busiest hour are all identical with and without it, so a tool that never applied it passes a check built on the manager's three answers. Two habits follow. Check that the parts sum to the whole, every time you break a total down. And give the reconciliation a column for every rule that would otherwise move nothing &mdash; here a count of blank payments, which reads 0 when R5 ran and 16 when it did not.",
          ar: "‏748 سطرًا معدودًا و8,062.00 إيرادًا &mdash; وتوزيعًا لطرق الدفع يبلغ مجموعه 7,901.00 فقط. فـ<code>groupby</code> تُسقط الصفوف التي مفتاحها مفقود، فالأسطر الـ16 المعدودة التي لا طريقة دفع مسجَّلة لها، وتحمل 161.00 من إيراد حقيقي تمامًا، ليست في التوزيع ببساطة: أربعة صفوف تبدو كاملة، ومجموعها رقم خاطئ، ولا شيء يُرفع. (والفراغ السابع عشر على سطر مرتجع كانت R2 قد أزالته.) هذا ما وُجدت له R5، وR5 هي القاعدة التي لا تراها الأرقام الرئيسية حين تغيب: فالأسطر والإيراد وعدّ الأصناف والساعة الأكثر ازدحامًا كلها متطابقة بوجودها وبغيابها، فتنجح أداة لم تطبّقها قط في فحص مبني على أجوبة المدير الثلاثة. ومن ذلك عادتان. تحقّق أن الأجزاء تجمع إلى الكل في كل مرة تفصّل فيها مجموعًا. وأعطِ المطابقة عمودًا لكل قاعدة لا تحرّك شيئًا بدونه &mdash; وهو هنا عدّ طرق الدفع الفارغة، يقرأ 0 حين تُطبَّق R5 و16 حين لا تُطبَّق."
        }
      },
      {
        id: "p1ax23",
        type: "compare",
        level: "hard",
        topics: [
          "p1-reconciliation",
          "p1-tolerance",
          "p1-per-rule-audit"
        ],
        lang: "python",
        q: {
          en: "Two ways to line Excel's answer up against the pandas answer. <code>res</code> is the row one tool produced: <code>lines</code>, <code>revenue</code>, <code>items</code>, <code>orders</code>, <code>blank_payment</code>, the top three, the busiest hour and the per-rule log <code>removed</code>. Which statement about the two versions is true?",
          ar: "طريقتان لمقابلة جواب Excel بجواب pandas. والمتغير <code>res</code> هو الصف الذي أنتجته أداة واحدة: <code>lines</code> و<code>revenue</code> و<code>items</code> و<code>orders</code> و<code>blank_payment</code> والأصناف الثلاثة الأولى والساعة الأكثر ازدحامًا وسجل كل قاعدة <code>removed</code>. أيّ العبارات عن النسختين صحيحة؟"
        },
        codeA: code(
          "# two numbers, read off two screens, compared as text",
          "excel = \"8,062.00\"",
          "python = f\"{res['revenue']:,.2f}\"",
          "print(\"Same. Ship it.\" if excel == python else \"They differ.\")"
        ),
        codeB: code(
          "import math",
          "",
          "TOL = 0.005",
          "FIELDS = (\"lines\", \"items\", \"orders\", \"blank_payment\")",
          "",
          "def differences(a, ref, tol=TOL):",
          "    out = [f\"{f} {a[f]} != {ref[f]}\" for f in FIELDS if a[f] != ref[f]]",
          "    if not math.isclose(a[\"revenue\"], ref[\"revenue\"], abs_tol=tol):",
          "        out.append(f\"revenue {a['revenue']:,.2f} != {ref['revenue']:,.2f}\")",
          "    out += [f\"{r} removed {a['removed'].get(r, 0)} not {n}\"",
          "            for r, n in ref[\"removed\"].items() if a['removed'].get(r) != n]",
          "    return out"
        ),
        options: [
          {
            en: "B is better: A compares one of eight numbers, and compares them as <em>formatted strings</em>; B checks every field, and the per-rule log besides.",
            ar: "ب أفضل: فـأ تقارن رقمًا واحدًا من ثمانية، وتقارنه نصًّا <em>منسَّقًا</em>؛ أما ب فتفحص كل حقل، وسجل كل قاعدة فوق ذلك."
          },
          {
            en: "They do the same job: A compares the money, B compares the money with a tolerance, so the choice between them is only a matter of tidiness.",
            ar: "النسختان تؤديان العمل نفسه: أ تقارن المال، وب تقارن المال بتسامح، فالاختيار بينهما مسألة أناقة فقط."
          },
          {
            en: "A is better for money: comparing the formatted text is exactly the right way to avoid floating-point noise, which <code>math.isclose</code> only hides.",
            ar: "أ أفضل للمال: فمقارنة النص المنسَّق هي الطريقة الصحيحة تمامًا لتجنّب ضجيج الفاصلة العائمة، وهو ما تخفيه <code>math.isclose</code> فقط."
          },
          {
            en: "B is better only because of the tolerance; the counts should use <code>math.isclose</code> as well, so that a run which removed 15 duplicates instead of 16 is not reported as a failure.",
            ar: "ب أفضل بسبب التسامح وحده؛ وكان على الأعداد أن تستعمل <code>math.isclose</code> أيضًا، كي لا يُبلَّغ عن تشغيل أزال 15 مكررًا بدل 16 على أنه إخفاق."
          }
        ],
        answer: 0,
        hint: {
          en: "Count how many of the eight numbers each version actually looks at. Then ask what would happen if somebody formatted the workbook's total with no decimals.",
          ar: "عُدّ كم رقمًا من الثمانية تنظر إليه كل نسخة فعلًا. ثم اسأل: ماذا يحدث لو نسّق أحدهم مجموع المصنَّف بلا منازل عشرية؟"
        },
        explain: {
          en: "A looks at one of the eight numbers, and looks at it through a formatter. Formatting is not comparing: with zero decimals a difference of 0.49 would vanish, and a tool that applied none of the item rules &mdash; 22 spellings instead of 16 &mdash; passes A untouched, because R4 moves no money at all. B states the policy instead of hiding it: counts must be <em>equal</em>, money has to agree within 0.005, half a piastre, and the per-rule log is compared too, because &ldquo;Excel: 764 lines, 8,237.00, R1 removed 0 not 16&rdquo; names the step, where &ldquo;Excel is wrong&rdquo; names nothing. The third option has it backwards: <code>==</code> on floats fails for a genuine match (<code>13.19 == 8062 / 611</code> is <code>False</code>), and a tolerance is a stated policy, not noise suppression. The fourth is the dangerous one: a tolerance on counts would quietly accept a missing rule, which is the very failure the table exists to catch. And when the two rows do differ, do not vote and do not average: the mean of 8,062.00 and 8,237.00 is 8,149.50, a number no tool computed and nobody can ever reproduce.",
          ar: "تنظر أ إلى رقم واحد من الثمانية، وتنظر إليه عبر مُنسِّق. والتنسيق ليس مقارنة: فبصفر منازل عشرية يختفي فارق قدره 0.49، وأداة لم تطبّق أي قاعدة من قواعد الأصناف &mdash; 22 تهجئة بدل 16 &mdash; تنجح في أ بلا مساس، لأن R4 لا تحرّك مالًا على الإطلاق. أما ب فتعلن السياسة بدل إخفائها: الأعداد يجب أن تكون <em>متساوية</em>، والمال يجب أن يتفق في حدود 0.005 أي نصف قرش، ويُقارَن سجل كل قاعدة أيضًا، لأن «‏Excel: 764 سطرًا و8,237.00 وR1 أزالت 0 لا 16» تسمّي الخطوة، بينما «‏Excel مخطئ» لا تسمّي شيئًا. والخيار الثالث مقلوب: فـ<code>==</code> على الأعداد العشرية تفشل في تطابق حقيقي (‏<code>13.19 == 8062 / 611</code> تساوي <code>False</code>)، والتسامح سياسة معلنة لا كبتًا للضجيج. والرابع هو الخطير: فالتسامح على الأعداد يقبل بهدوء قاعدة غائبة، وهو بالضبط الإخفاق الذي وُجد الجدول لاقتناصه. وحين يختلف الصفان فعلًا، لا تصوّت ولا تحسب متوسطًا: فمتوسط 8,062.00 و8,237.00 هو 8,149.50، وهو رقم لم تحسبه أي أداة ولا يستطيع أحد إعادة إنتاجه أبدًا."
        }
      },
      {
        id: "p1ax24",
        type: "multi",
        level: "medium",
        topics: [
          "p1-brief-headings",
          "p1-brief-filled",
          "p1-caveats"
        ],
        q: {
          en: "The deliverable is a one-page brief under five headings: ANSWER, SO WHAT, HOW, CAVEATS, NEXT. Choose every statement that the brief for this chapter's project gets right.",
          ar: "المُخرَج موجز من صفحة واحدة تحت خمسة عناوين: ANSWER وSO WHAT وHOW وCAVEATS وNEXT. اختر كل عبارة يصيبها موجز مشروع هذا الفصل."
        },
        options: [
          {
            en: "ANSWER gives the three items with their revenue &mdash; Shawarma Wrap 1,368.00, Chicken Rice 1,020.00, Falafel Sandwich 917.00 &mdash; and 12:00 with 119 orders.",
            ar: "يعطي ANSWER الأصناف الثلاثة بإيراداتها &mdash; الشاورما 1,368.00 وأرز الدجاج 1,020.00 وساندويتش الفلافل 917.00 &mdash; والساعة 12:00 بـ119 طلبًا."
          },
          {
            en: "HOW says the file had 771 lines, that R1&ndash;R5 ran in order removing 16, 5 and 2, that 748 lines remain, and that three tools agree within 0.005.",
            ar: "يقول HOW إن الملف كان 771 سطرًا، وإن R1&ndash;R5 جرت بالترتيب فأزالت 16 و5 و2، وإن 748 سطرًا بقيت، وإن ثلاث أدوات تتفق في حدود 0.005."
          },
          {
            en: "CAVEATS leaves out the refunds and the price limit of 50, because naming what you excluded only invites the reader to argue with a number that is already checked.",
            ar: "يُسقط CAVEATS المرتجعات وحدّ السعر 50، لأن تسمية ما استبعدته لا تفعل إلا دعوة القارئ إلى الجدال في رقم مفحوص أصلًا."
          },
          {
            en: "SO WHAT turns the answer into an action: stock the top three first for October, and open a second till in the 12:00&ndash;14:00 window.",
            ar: "يحوّل SO WHAT الجواب إلى إجراء: خزّن الأصناف الثلاثة الأولى أولًا لتشرين الأول، وافتح صندوقًا ثانيًا في نافذة 12:00&ndash;14:00."
          },
          {
            en: "NEXT can be dropped once the three tools agree within the tolerance, because an answer that reconciles in three tools needs no review date.",
            ar: "يمكن إسقاط NEXT بعد أن تتفق الأدوات الثلاث في حدود التسامح، لأن الجواب الذي يُطابق في ثلاث أدوات لا يحتاج تاريخ مراجعة."
          },
          {
            en: "CAVEATS should end with the sentence &ldquo;the data may contain errors&rdquo;, which covers anything the reader might later object to without naming a number.",
            ar: "ينبغي أن ينتهي CAVEATS بعبارة «قد تحتوي البيانات أخطاء»، فهي تغطي كل ما قد يعترض عليه القارئ لاحقًا دون تسمية أي رقم."
          }
        ],
        answer: [0, 1, 3],
        hint: {
          en: "Each heading answers one question a manager will actually ask. Work out which question each statement is answering &mdash; and whether it answers it with a number or with a hedge.",
          ar: "كل عنوان يجيب عن سؤال سيطرحه المدير فعلًا. حدّد عن أي سؤال تجيب كل عبارة &mdash; وهل تجيب برقم أم بتحوّط."
        },
        explain: {
          en: "The five headings answer five questions: what did you find, what should I do differently, where did the number come from and what did you throw away, how far may I push this, and when do we look again. ANSWER carries the numbers with their units; SO WHAT is the action, and it is a window rather than a single hour because 12:00 beats 13:00 by two orders out of 119; HOW is the provenance, including the removal counts &mdash; leave them out and the 23 removed lines become a secret, so anyone who recomputes from the raw file gets 8,334.00 and thinks you were wrong. The three rejected options are the three ways this page goes bad. Hiding the exclusions does not prevent the argument, it only means you lose it later. Dropping NEXT lets the answer become permanent: the first fortnight of this very month makes 13:00 busiest, 55 against 54, so 12:00 is September's answer and not a fact about the cafeteria. And &ldquo;the data may contain errors&rdquo; is noise, not a caveat: a caveat is a number or a consequence &mdash; refunds excluded (&minus;23.00), one month only, sales are not demand, no cost data so no profit, and the price limit of 50 is a judgement rather than a measurement.",
          ar: "العناوين الخمسة تجيب عن خمسة أسئلة: ماذا وجدت، وماذا يجب أن أفعل بشكل مختلف، ومن أين جاء الرقم وما الذي رميته، وإلى أي حد أستطيع المضيّ بهذا، ومتى ننظر من جديد. فـANSWER يحمل الأرقام بوحداتها؛ وSO WHAT هو الإجراء، وهو نافذة لا ساعة واحدة لأن 12:00 تسبق 13:00 بطلبين من 119؛ وHOW هو الأصل والمنشأ وفيه أعداد الإزالة &mdash; فإن أسقطتها صارت الأسطر الـ23 المُزالة سرًّا، فيحصل كل من يعيد الحساب من الملف الخام على 8,334.00 ويظن أنك أخطأت. والخيارات الثلاثة المرفوضة هي الطرق الثلاث التي تفسد بها هذه الصفحة. فإخفاء الاستبعادات لا يمنع الجدال، بل يعني فقط أنك ستخسره لاحقًا. وإسقاط NEXT يجعل الجواب دائمًا: فأول نصف من هذا الشهر نفسه يجعل 13:00 الأكثر ازدحامًا، 55 مقابل 54، فالساعة 12:00 جواب أيلول لا حقيقة عن الكافتيريا. وعبارة «قد تحتوي البيانات أخطاء» ضجيج لا تحفّظ: فالتحفّظ رقم أو نتيجة &mdash; المرتجعات مستبعدة (&minus;23.00)، وشهر واحد فقط، والمبيعات ليست الطلب، ولا بيانات تكلفة فلا ربح، وحدّ السعر 50 حكم لا قياس."
        }
      }
    ]
  };
})();
