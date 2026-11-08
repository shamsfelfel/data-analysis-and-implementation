window.DABanks = window.DABanks || {};
(function () {
  /* code(line, line, ...) -> one string with \n between lines */
  function code() { return Array.prototype.join.call(arguments, "\n"); }

  window.DABanks["p1-exam-c"] = {
    title: {
      en: "Chapter Test C — Advanced",
      ar: "اختبار الفصل ج — المتقدم"
    },
    intro: {
      en: "24 advanced questions that cross the six lessons of Practical Chapter 1. They take the hard corners of the cafeteria project: the failures that leave a plausible number and no error message, the trade-offs («which rule, which grain, which tool, and what does the choice cost?»), and the four problem threads of the chapter — answer a business question from a table, remove the rows that should not be counted, run it again next month and get the same answer, and load a file into something analysable (which reaches back into Theory Chapter 1). Expect to need two lessons at once in most questions. Every pandas output was produced by running the code against <code>cafeteria_orders.csv</code> with Python 3.13, pandas 2.2 and NumPy 2.2; Excel and Power BI cannot be run here, so every number attributed to them was computed a second time in pandas by applying exactly the steps Lessons 4 and 5 taught. Plan for about 70 minutes. Every question has a hint, an answer and an explanation, hidden until you ask for them: try first, then open them. A revealed answer is not counted.",
      ar: "24 سؤالًا متقدمًا تعبر دروس الفصل العملي 1 الستة. تتناول الزوايا الصعبة في مشروع الكافتيريا: الإخفاقات التي تترك رقمًا معقولًا دون أي رسالة خطأ، والمفاضلات («أيّ قاعدة، وأيّ حبيبة، وأيّ أداة، وما ثمن الاختيار؟»)، وخيوط المشكلات الأربعة في الفصل — أجب عن سؤال عمل من جدول، وأزل الصفوف التي لا ينبغي عدّها، وأعد التشغيل الشهر القادم واحصل على الجواب نفسه، وحمّل ملفًّا إلى شيء قابل للتحليل (وهذا يمدّ يده إلى الفصل النظري 1). توقّع أن تحتاج في معظم الأسئلة إلى درسين في الوقت نفسه. كل نواتج pandas مأخوذة من تشغيل الكود فعلًا على <code>cafeteria_orders.csv</code> ببايثون 3.13 وpandas 2.2 وNumPy 2.2؛ وExcel وPower BI لا يمكن تشغيلهما هنا، فكل رقم نُسب إليهما حُسب مرة ثانية في pandas بتطبيق الخطوات التي علّمها الدرسان 4 و5 بالضبط. خصّص نحو 70 دقيقة. لكل سؤال تلميح وجواب وشرح، وكلها مخفية حتى تطلبها: جرّب أولًا ثم افتحها. والجواب الذي يُظهَر لا يُحتسب."
    },
    questions: [

      /* ---------------------------------------------------------- 01 */
      {
        id: "p1cx01",
        type: "tf",
        level: "easy",
        topics: ["p1-nb-run-all", "p1-version-pinning", "p1-golden-answer"],
        q: {
          en: "Lesson 3 called <em>Kernel → Restart Kernel and Run All Cells</em> the honest test of a notebook. True or false: a notebook that passes Restart &amp; Run All has proved that the number it prints is right.",
          ar: "وصف الدرس 3 الأمر <em>Kernel → Restart Kernel and Run All Cells</em> بأنه الاختبار الأمين للدفتر. صح أم خطأ: الدفتر الذي ينجح في Restart &amp; Run All قد أثبت أن الرقم الذي يطبعه صحيح."
        },
        truth: false,
        hint: {
          en: "Ask what the test actually compares. What would still be free to change between two runs that both pass?",
          ar: "اسأل عمّا يقارنه الاختبار فعلًا. ما الذي يبقى حرًّا في التغيّر بين تشغيلين ينجحان كلاهما؟"
        },
        explain: {
          en: "False. Restart &amp; Run All proves that the page explains the number — that no variable came from a deleted cell, an out-of-order run or an in-place update — and nothing more. It cannot see an unseeded random step, a data file that changed since yesterday, or a library version that behaves differently: the same three lines printed <code>object</code> under the course's pandas 2.2.3 and <code>str</code> in an unpinned environment with pandas 3.1.0. That is why the P-REPRO thread does not stop at the notebook: Lesson 2's pinned <code>requirements.txt</code> and <code>check_env.py</code> fix the environment, and Lesson 6's golden answer fixes the result, so that reproducing a number becomes a check with an exit code instead of a hope. The rule to carry away: Restart &amp; Run All answers «does this page produce this number?», never «is this number right?».",
          ar: "خطأ. يثبت Restart &amp; Run All أن الصفحة تفسّر الرقم — أي أن لا متغيّر جاء من خلية محذوفة أو من تشغيل خارج الترتيب أو من تحديث في المكان — ولا شيء أكثر من ذلك. ولا يرى بذرة عشوائية غير مثبّتة، ولا ملف بيانات تغيّر عن الأمس، ولا إصدار مكتبة يتصرّف تصرّفًا آخر: فالأسطر الثلاثة نفسها طبعت <code>object</code> على pandas 2.2.3 في المقرر و<code>str</code> في بيئة غير مثبّتة بـpandas 3.1.0. ولهذا لا يتوقف خيط P-REPRO عند الدفتر: فملف <code>requirements.txt</code> المثبَّت و<code>check_env.py</code> في الدرس 2 يثبّتان البيئة، والجواب المرجعي في الدرس 6 يثبّت النتيجة، فتصير إعادة إنتاج الرقم فحصًا له رمز خروج لا أملًا. القاعدة التي تأخذها: يجيب Restart &amp; Run All عن «هل تُنتج هذه الصفحة هذا الرقم؟» لا عن «هل هذا الرقم صحيح؟»."
        }
      },

      /* ---------------------------------------------------------- 02 */
      {
        id: "p1cx02",
        type: "match",
        level: "easy",
        topics: ["p1-three-counts", "p1-lines-in-out", "p1-xl-pivot-hours"],
        q: {
          en: "Every one of these counts is correct on <code>cafeteria_orders.csv</code>; each belongs to a different question. Match each number to the question it answers.",
          ar: "كل واحد من هذه الأعداد صحيح على <code>cafeteria_orders.csv</code>، وكلٌّ منها ينتمي إلى سؤال مختلف. وصّل كل رقم بالسؤال الذي يجيب عنه."
        },
        pairs: [
          {
            l: { code: "771" },
            r: {
              en: "How many order lines did the till record in September?",
              ar: "كم سطر طلب سجّلته الخزينة (till) في أيلول؟"
            }
          },
          {
            l: { code: "748" },
            r: {
              en: "How many lines go into the counted revenue of 8,062.00?",
              ar: "كم سطرًا يدخل في الإيراد المعدود 8,062.00؟"
            }
          },
          {
            l: { code: "616" },
            r: {
              en: "How many customers were served, before any rule removed anything?",
              ar: "كم عميلًا خُدِم، قبل أن تحذف أي قاعدة شيئًا؟"
            }
          },
          {
            l: { code: "611" },
            r: {
              en: "How many orders does the counted revenue come from?",
              ar: "من كم طلبًا يأتي الإيراد المعدود؟"
            }
          },
          {
            l: { code: "155" },
            r: {
              en: "How many lines were rung up between 13:00 and 13:59, duplicates and refunds included?",
              ar: "كم سطرًا سُجِّل بين 13:00 و13:59، بما في ذلك المكرّر والمرتجَع؟"
            }
          }
        ],
        leftHead: {
          en: "The number",
          ar: "الرقم"
        },
        rightHead: {
          en: "The question it answers",
          ar: "السؤال الذي يجيب عنه"
        },
        hint: {
          en: "Two of the five are counts of lines and two are counts of orders; sort them that way first, then ask which of each pair is before the rules and which is after.",
          ar: "اثنان من الخمسة عدد أسطر واثنان عدد طلبات؛ رتّبها بهذا أولًا، ثم اسأل: أيّ عضو في كل زوج قبل القواعد وأيّه بعدها؟"
        },
        explain: {
          en: "The grain — what one row stands for — decides which number answers which question. A row of this file is an order <em>line</em>, so 771 is lines and 616 is the distinct <code>order_id</code> values behind them; after R1–R3 the counts become 748 lines and 611 orders, and the five orders that disappeared were single-line orders whose only line was removed. 155 is the one that does the damage in practice: it is the number of raw <em>lines</em> in the 13:00 hour, and a PivotTable with <code>Count of order_id</code> prints it under the word «orders», which is how 13:00 is reported as the busiest hour when the answer is 12:00 with 119. None of the five is a mistake; printing one of them under a label that means another is.",
          ar: "الحبيبة (grain) — أي ما يمثّله الصف الواحد — هي ما يحدّد أيّ رقم يجيب عن أيّ سؤال. صف هذا الملف <em>سطر</em> طلب، فـ771 عدد الأسطر و616 عدد قيم <code>order_id</code> المختلفة وراءها؛ وبعد R1–R3 يصير العدد 748 سطرًا و611 طلبًا، والطلبات الخمسة التي اختفت كانت طلبات من سطر واحد حُذف سطرها الوحيد. و155 هو الذي يُحدث الضرر عمليًّا: فهو عدد <em>الأسطر</em> الخام في ساعة 13:00، ويطبعه جدول محوري بـ<code>Count of order_id</code> تحت كلمة «طلبات»، وهكذا يُبلَّغ عن 13:00 أكثر ساعة ازدحامًا والجواب 12:00 بـ119. ولا واحد من الخمسة خطأ؛ الخطأ أن تطبع أحدها تحت تسمية تعني غيره."
        }
      },

      /* ---------------------------------------------------------- 03 */
      {
        id: "p1cx03",
        type: "contrast",
        level: "medium",
        topics: ["p1-raw-vs-parsed", "p1-xl-cell-types", "p1-silent-defaults"],
        q: {
          en: "The same <code>cafeteria_orders.csv</code> goes through two doors: <code>pd.read_csv(path)</code> with no arguments, and a double-click that opens it in Excel. Place each statement under the pandas load, under the Excel open, under both, or under neither.",
          ar: "يمرّ الملف <code>cafeteria_orders.csv</code> نفسه من بابين: <code>pd.read_csv(path)</code> بلا وسائط، ونقرة مزدوجة تفتحه في Excel. ضع كل عبارة تحت تحميل pandas، أو تحت فتح Excel، أو تحتهما معًا، أو تحت لا أحد منهما."
        },
        concepts: [
          {
            en: "<code>pd.read_csv(path)</code>, no arguments (Lesson 3)",
            ar: "<code>pd.read_csv(path)</code> بلا وسائط (الدرس 3)"
          },
          {
            en: "Double-clicking the CSV in Excel (Lesson 4)",
            ar: "النقر المزدوج على ملف CSV في Excel (الدرس 4)"
          }
        ],
        neither: true,
        rows: [
          {
            s: {
              en: "The text <code>n/a</code> in <code>unit_price</code> is turned into a missing value with no message, and the column arrives as <code>float64</code>",
              ar: "النص <code>n/a</code> في <code>unit_price</code> يُحوَّل إلى قيمة مفقودة بلا أي رسالة، ويصل العمود من النوع <code>float64</code>"
            },
            a: 0
          },
          {
            s: {
              en: "That cell survives as text inside a column of numbers, so a count of numbers against a count of non-empty cells (770 against 771) is the only way to find it",
              ar: "تلك الخلية تنجو نصًّا داخل عمود أرقام، فعدّ الأرقام مقابل عدّ الخلايا غير الفارغة (770 مقابل 771) هو الطريق الوحيد لاكتشافها"
            },
            a: 1
          },
          {
            s: {
              en: "Multiplying the quantity by the price on that one row produces a loud error that spreads into the column's total",
              ar: "ضرب الكمية في السعر في ذلك الصف الواحد يعطي خطأً صاخبًا يسري إلى مجموع العمود كله"
            },
            a: 1
          },
          {
            s: {
              en: "<code>Latte</code> and <code>latte</code> are two different labels when revenue is totalled per item",
              ar: "<code>Latte</code> و<code>latte</code> تسميتان مختلفتان عند جمع الإيراد لكل صنف"
            },
            a: 0
          },
          {
            s: {
              en: "The timestamps arrive as real date-times, so the hour can be taken from them without converting anything first",
              ar: "تصل الطوابع الزمنية تواريخ وأوقاتًا حقيقية، فتُؤخذ الساعة منها دون تحويل أي شيء أولًا"
            },
            a: 1
          },
          {
            s: {
              en: "The door leaves behind a named step you can read and replay on next month's export",
              ar: "يترك الباب خطوة مسمّاة يمكنك قراءتها وإعادة تشغيلها على تصدير الشهر القادم"
            },
            a: 3
          },
          {
            s: {
              en: "All 771 data lines and 8 columns arrive, and the two defects of the file arrive with them",
              ar: "تصل كل الأسطر 771 والأعمدة الثمانية، ويصل معها عيبا الملف"
            },
            a: 2
          }
        ],
        hint: {
          en: "Take the one <code>n/a</code> cell and the three lower-case item spellings through both doors and ask, for each, who decided what and whether anybody was told.",
          ar: "خُذ خلية <code>n/a</code> الواحدة وتهجئات الأصناف الثلاث بأحرف صغيرة عبر البابين، واسأل عن كل منها: من قرّر ماذا؟ وهل أُخبر أحد؟"
        },
        explain: {
          en: "This is the T-LOAD thread, measured on one cell and one column. <code>n/a</code> is on pandas' default list of missing-value strings, so pandas decides for you before you look: the column is a tidy <code>float64</code> with «one missing value», the product is <code>NaN</code>, and the sum of 8,334.00 quietly leaves it out (row 1). Excel keeps the text, so the defect is still there to be found — and the operator <code>*</code> refuses it with <code>#VALUE!</code> which poisons the total, while <code>SUM</code> skips it silently (rows 2 and 3): a loud failure is the good kind. Excel also folds letter case in its criteria, so <code>latte</code> and <code>Latte</code> count as one there while pandas compares strings exactly (row 4), and double-clicking does convert the timestamps, which pandas leaves as text (row 5). Neither door records a step: that is what Power Query's Applied Steps add in Lesson 5 (row 6). Both doors deliver the same 771 lines and the same two defects (row 7) — the difference is which of them each tool hides.",
          ar: "هذا خيط T-LOAD مقيسًا على خلية واحدة وعمود واحد. النص <code>n/a</code> في القائمة الافتراضية لنصوص القيم المفقودة في pandas، فتقرّر pandas نيابةً عنك قبل أن تنظر: يصير العمود <code>float64</code> أنيقًا فيه «قيمة مفقودة واحدة»، ويصير الضرب <code>NaN</code>، ويتركها مجموع 8,334.00 خارجًا بهدوء (الصف 1). أمّا Excel فيحفظ النص، فيبقى العيب موجودًا ليُكتشَف — والعامل <code>*</code> يرفضه بـ<code>#VALUE!</code> فيسمّم المجموع، في حين يتجاوزه <code>SUM</code> بصمت (الصفان 2 و3): والفشل الصاخب هو النوع الجيد. ويطوي Excel أيضًا حالة الأحرف في معاييره، فتُحسَب <code>latte</code> و<code>Latte</code> واحدة عنده بينما تقارن pandas النصوص بالحرف (الصف 4)، والنقر المزدوج يحوّل الطوابع الزمنية فعلًا وهو ما تتركه pandas نصًّا (الصف 5). ولا يسجّل أيّ من البابين خطوة: وهذا ما تضيفه خطوات Power Query المطبَّقة في الدرس 5 (الصف 6). ويوصل البابان الأسطر 771 نفسها والعيبين نفسيهما (الصف 7) — والفرق في أيّهما تخفيه كل أداة."
        }
      },

      /* ---------------------------------------------------------- 04 */
      {
        id: "p1cx04",
        type: "order",
        level: "medium",
        topics: ["p1-reconcile-sequence", "p1-question-executable", "p1-diagnose-mismatch"],
        q: {
          en: "September's numbers must be produced in three tools and defended. Put the steps of the reconciliation protocol in the order that makes each one possible.",
          ar: "يجب إنتاج أرقام أيلول بثلاث أدوات والدفاع عنها. رتّب خطوات بروتوكول المطابقة بالترتيب الذي يجعل كل خطوة ممكنة."
        },
        items: [
          {
            en: "Write the question as a contract: the two measures, the grain, the five rules in their agreed order, and the tolerance for money.",
            ar: "اكتب السؤال عقدًا: المقياسان، والحبيبة، والقواعد الخمس بترتيبها المتّفق عليه، وحدّ التسامح للمال."
          },
          {
            en: "Apply the same five rules in each tool, and make each one report how many lines every rule removed.",
            ar: "طبّق القواعد الخمس نفسها في كل أداة، واجعل كل أداة تبلّغ بعدد الأسطر التي حذفتها كل قاعدة."
          },
          {
            en: "Collect one row per tool: lines, revenue, distinct items, orders, blank payments, top three, busiest hour and the three rule counts.",
            ar: "اجمع صفًّا واحدًا لكل أداة: الأسطر والإيراد والأصناف المختلفة والطلبات والدفعات الفارغة والثلاثة الأوائل وأكثر ساعة ازدحامًا وأعداد القواعد الثلاثة."
          },
          {
            en: "Compare the rows by machine: counts and names exactly, money with <code>abs_tol=0.005</code>.",
            ar: "قارن الصفوف بالآلة: الأعداد والأسماء بالتساوي التام، والمال بـ<code>abs_tol=0.005</code>."
          },
          {
            en: "On a row that differs, read the per-rule columns, name the missing step in that one tool, fix it and run that tool again.",
            ar: "في الصف المختلف، اقرأ أعمدة القواعد، وسمِّ الخطوة الناقصة في تلك الأداة وحدها، وأصلحها وأعد تشغيلها."
          },
          {
            en: "Write the one-page brief: the answer, the rules and the removals, the check that was run, the caveats and the next date.",
            ar: "اكتب الموجز من صفحة واحدة: الجواب، والقواعد والمحذوفات، والفحص الذي أُجري، والتحفّظات، والموعد القادم."
          },
          {
            en: "Freeze the reconciled result as the golden answer for this period, with the date and the name of whoever reviewed it.",
            ar: "ثبّت النتيجة المتطابقة جوابًا مرجعيًّا لهذه الفترة، مع التاريخ واسم من راجعها."
          }
        ],
        answer: [0, 1, 2, 3, 4, 5, 6],
        hint: {
          en: "Nothing can be compared before the thing being compared is defined, and nothing should be frozen before it has been compared.",
          ar: "لا شيء يُقارَن قبل تعريف ما يُقارَن، ولا شيء يُثبَّت قبل أن يُقارَن."
        },
        explain: {
          en: "Each step exists because of the one before it. The contract comes first because «the same» is not a criterion until somebody says what the measure, the grain and the tolerance are — that was the honest gap of Lesson 1's prose card. The rules must be applied before a row can be collected, and the rule counts must be collected before they can diagnose anything: «R1 removed 0 not 16» is the sentence that turns an afternoon of hunting into a two-minute fix, and it is only available if step 2 asked each tool for it. The comparison is by machine because three formatted strings read by a tired human at five o'clock is Version 1 of the reconciliation. The fix goes back to the tool, never to the data, and never to a vote or an average of the three answers. The brief comes after the check so that it can state the check, and the golden answer comes last of all: freeze a result you have not reconciled and every later run will faithfully confirm your bug.",
          ar: "كل خطوة موجودة بسبب التي قبلها. العقد أولًا لأن «التساوي» ليس معيارًا حتى يقول أحد ما المقياس والحبيبة وحدّ التسامح — وهذه كانت الفجوة الصريحة في بطاقة الدرس 1 النثرية. ويجب تطبيق القواعد قبل جمع أي صف، ويجب جمع أعداد القواعد قبل أن تشخّص شيئًا: فجملة «R1 حذفت 0 لا 16» هي التي تحوّل عصرًا من البحث إلى إصلاح من دقيقتين، ولا تتوفّر إلا إذا طلبتها الخطوة 2 من كل أداة. والمقارنة بالآلة لأن ثلاث سلاسل منسَّقة يقرأها إنسان متعب في الخامسة هي النسخة الأولى من المطابقة. والإصلاح يعود إلى الأداة، لا إلى البيانات، ولا إلى تصويت أو متوسط للأجوبة الثلاثة. ويأتي الموجز بعد الفحص ليقدر على ذكره، ويأتي الجواب المرجعي آخر الكل: فمن يثبّت نتيجة لم يطابقها سيؤكّد كل تشغيل لاحق خطأه بأمانة."
        }
      },

      /* ---------------------------------------------------------- 05 */
      {
        id: "p1cx05",
        type: "mcq",
        level: "medium",
        topics: ["p1-xl-duplicates", "p1-rules-r1-r5", "p1-per-rule-audit"],
        q: {
          en: "A colleague rebuilds the workbook's duplicate flag on a narrower key: <code>key2 = [@order_id]&amp;\"|\"&amp;[@item_clean]</code>, with the same running <code>COUNTIFS</code>. <code>=COUNTIFS(tblOrders[dup2],\">1\")</code> returns 22, against 16 for the eight-column key, and if <code>status</code> used <code>dup2</code> the counted revenue would be 7,982.00 instead of 8,062.00. What is the right reading?",
          ar: "يعيد زميل بناء علامة التكرار في المصنف على مفتاح أضيق: <code>key2 = [@order_id]&amp;\"|\"&amp;[@item_clean]</code> مع <code>COUNTIFS</code> التراكمي نفسه. تُعيد <code>=COUNTIFS(tblOrders[dup2],\">1\")</code> القيمة 22 مقابل 16 لمفتاح الأعمدة الثمانية، ولو استعمل <code>status</code> العمود <code>dup2</code> لصار الإيراد المعدود 7,982.00 بدلًا من 8,062.00. ما القراءة الصحيحة؟"
        },
        options: [
          {
            en: "The narrower key is safer: it needs only two fields to agree, so it catches repeats that differ in a retyped payment method, and the six extra lines are the ones the eight-column key missed.",
            ar: "المفتاح الأضيق أكثر أمانًا: يكفيه تطابق حقلين، فيلتقط التكرارات التي تختلف في طريقة دفع أُعيد كتابتها، والأسطر الستة الزائدة هي التي فوّتها مفتاح الأعمدة الثمانية."
          },
          {
            en: "The six extra lines are real second lines of an order (order 5103 holds Tea ×3 paid by card and Tea ×1 in cash), so the narrow key would exclude 80.00 of genuine sales. A duplicate key must be wide enough that a match means «the same event recorded twice» — and the price of a wider key is the opposite error, a repeat that differs in one retyped field and escapes. Choose which error you accept, and count it.",
            ar: "الأسطر الستة الزائدة أسطر ثانية حقيقية في طلبات (الطلب 5103 فيه شاي ×3 بالبطاقة وشاي ×1 نقدًا)، فالمفتاح الأضيق يستبعد 80.00 من مبيعات حقيقية. ويجب أن يكون مفتاح التكرار واسعًا بما يكفي ليعني التطابق «الحادثة نفسها سُجِّلت مرتين» — وثمن المفتاح الأوسع هو الخطأ المعاكس، تكرار يختلف في حقل واحد أُعيد كتابته فيفلت. اختر أيّ الخطأين تقبل، وعدّه."
          },
          {
            en: "Six lines out of 771 is 0.8%, and the gap of 80.00 is far below the chapter's tolerance of 0.005, so either key may be used and the reconciliation will still say RECONCILED.",
            ar: "ستة أسطر من 771 هي 0.8%، والفارق 80.00 أدنى بكثير من حدّ التسامح 0.005 في الفصل، فيصلح أيّ المفتاحين وستظل المطابقة تقول RECONCILED."
          },
          {
            en: "Both keys are the wrong tool: a duplicate is whatever Excel's Remove Duplicates removes, so run it with every column ticked and take the 755 rows it leaves as the definition.",
            ar: "كلا المفتاحين أداة خاطئة: التكرار هو ما يحذفه Remove Duplicates في Excel، فشغّله مع تحديد كل الأعمدة وخذ الصفوف 755 التي يتركها تعريفًا."
          }
        ],
        answer: 1,
        hint: {
          en: "Find out what the six extra lines actually are before you judge the key. Ask what event each of them records.",
          ar: "اعرف ما هي الأسطر الستة الزائدة فعلًا قبل أن تحكم على المفتاح. واسأل عن الحادثة التي يسجّلها كلٌّ منها."
        },
        explain: {
          en: "R1 is a rule about events, not about similar-looking rows: «all eight original columns equal an earlier line». The narrow key breaks that, because one order can legitimately carry the same item on two lines — order 5103's Tea ×3 on card and Tea ×1 in cash is one customer, two lines, one order — so it flags 22 lines of which only 16 are duplicates, and excluding the other six removes 80.00 of real sales (7,982.00). The tolerance option is wrong twice over: 0.005 is an absolute amount of money, not a percentage, and a tolerance is never applied to a count — 748 and 742 lines are not nearly equal, they are a different rule. Remove Duplicates is not a definition either; with one box mis-ticked it removes 155 lines of which 139 are real. The habit to keep is the one in the rule table: say what a duplicate means, say how many lines the rule removed (16), and say which error you chose to accept.",
          ar: "R1 قاعدة عن الحوادث لا عن الصفوف المتشابهة: «كل الأعمدة الأصلية الثمانية تساوي سطرًا سابقًا». والمفتاح الأضيق يكسر ذلك، لأن الطلب الواحد قد يحمل الصنف نفسه على سطرين بحق — فشاي ×3 بالبطاقة وشاي ×1 نقدًا في الطلب 5103 عميل واحد وسطران وطلب واحد — فيعلّم 22 سطرًا منها 16 فقط مكرّرة، واستبعاد الستة الأخرى يحذف 80.00 من مبيعات حقيقية (7,982.00). وخيار التسامح خاطئ من وجهين: 0.005 مبلغ مطلق من المال لا نسبة مئوية، والتسامح لا يُطبَّق على عدد أبدًا — فـ748 و742 سطرًا ليسا متقاربين، بل قاعدة مختلفة. وRemove Duplicates ليس تعريفًا كذلك؛ فبمربع واحد خاطئ التحديد يحذف 155 سطرًا منها 139 حقيقي. والعادة التي تبقى هي عادة جدول القواعد: قل ماذا يعني التكرار، وقل كم سطرًا حذفت القاعدة (16)، وقل أيّ خطأ اخترت أن تقبل."
        }
      },

      /* ---------------------------------------------------------- 06 */
      {
        id: "p1cx06",
        type: "output",
        level: "medium",
        topics: ["p1-nb-spelling-variants", "p1-caveats", "p1-rules-as-data"],
        q: {
          en: "R4 is <code>item.str.strip().str.title()</code>, and the appendix of Lesson 6 calls it the weakest of the five rules. This program measures it on the raw column: the three counts of distinct spellings, then how many lines the rule changes, then how many of those need only <code>strip()</code>. Write exactly what it prints (three lines).",
          ar: "القاعدة R4 هي <code>item.str.strip().str.title()</code>، ويسمّيها ملحق الدرس 6 أضعف القواعد الخمس. يقيسها هذا البرنامج على العمود الخام: الأعداد الثلاثة للتهجئات المختلفة، ثم كم سطرًا تغيّره القاعدة، ثم كم من هذه الأسطر يحتاج إلى <code>strip()</code> وحدها. اكتب بالضبط ما يطبعه (ثلاثة أسطر)."
        },
        code: code(
          "import pandas as pd",
          "",
          "raw = pd.read_csv(\"cafeteria_orders.csv\")",
          "item = raw[\"item\"]",
          "print(item.nunique(), item.str.strip().nunique(), item.str.strip().str.title().nunique())",
          "print((item != item.str.strip().str.title()).sum(), \"lines change\")",
          "print((item != item.str.strip()).sum(), \"of them need only strip()\")"
        ),
        blanks: [
          {
            accept: ["22 19 16\n84 lines change\n4 of them need only strip()"],
            lines: 3
          }
        ],
        hint: {
          en: "The menu has 16 items. Count the spellings the lesson listed (three of them end in a space, three are lower-case), then ask which menu name Title Case rewrites although it was already correct.",
          ar: "في القائمة 16 صنفًا. عُدّ التهجئات التي سردها الدرس (ثلاث منها تنتهي بمسافة وثلاث بأحرف صغيرة)، ثم اسأل: أيّ اسم في القائمة تعيد Title Case كتابته مع أنه كان صحيحًا؟"
        },
        explain: {
          en: "22 spellings become 19 after <code>strip()</code> alone and 16 after Title Case as well, which is the repair R4 was written for: eight lines spelled <code>Latte </code>, <code>latte</code>, <code>Tea </code>, <code>tea</code>, <code>Espresso </code> and <code>espresso</code> join the menu's 16 names. But the rule touches 84 lines, and only 4 of them needed a <code>strip()</code>: the other 80 are case changes, and 76 of those are the menu's own correct <code>Water 500ml</code> being rewritten as <code>Water 500Ml</code>, because Title Case starts a new word after a digit. The 75 of them that survive the other rules carry 256.00 of counted revenue and match nothing on the raw menu — so the rule that merges 8 bad names breaks 76 good ones. R4 is not wrong, it is fragile: it works only as long as every table it is ever joined to has been mangled the same way. Exercise 6.3's repair is to map each item to the menu's own spelling on the stripped, lower-cased name.",
          ar: "تصير 22 تهجئة 19 بعد <code>strip()</code> وحدها و16 بعد Title Case أيضًا، وهذا هو الإصلاح الذي كُتبت R4 من أجله: ثمانية أسطر مكتوبة <code>Latte </code> و<code>latte</code> و<code>Tea </code> و<code>tea</code> و<code>Espresso </code> و<code>espresso</code> تلتحق بأسماء القائمة الستة عشر. لكن القاعدة تلمس 84 سطرًا، أربعة منها فقط كانت تحتاج <code>strip()</code>: والثمانون الباقية تغييرات حالة أحرف، و76 منها هي اسم القائمة الصحيح <code>Water 500ml</code> يُعاد كتابته <code>Water 500Ml</code>، لأن Title Case تبدأ كلمة جديدة بعد الرقم. والخمسة والسبعون منها التي تنجو من القواعد الأخرى تحمل 256.00 من الإيراد المعدود ولا تطابق شيئًا في القائمة الخام — فالقاعدة التي تدمج ثمانية أسماء سيئة تكسر ستة وسبعين اسمًا سليمًا. وR4 ليست خاطئة بل هشّة: لا تعمل إلا ما دام كل جدول ستُوصَل به قد شُوِّه بالطريقة نفسها. وإصلاح التمرين 6.3 أن تُطابق كل صنف باسم القائمة نفسه عبر الاسم بعد حذف المسافات وتصغير الأحرف."
        }
      },

      /* ---------------------------------------------------------- 07 */
      {
        id: "p1cx07",
        type: "error",
        level: "medium",
        topics: ["p1-hour-grain", "p1-xl-pivot-hours", "p1-three-counts"],
        q: {
          en: "The card's second measure is «the hour of <code>order_time</code> with the most distinct <code>order_id</code>», and the reviewed answer is <code>12</code> with 119 orders. This program prints <code>busiest hour: 13 with 148 orders</code>, and nothing is raised. Click the line that is the <em>cause</em> — not a line where the wrong number becomes visible.",
          ar: "المقياس الثاني في البطاقة هو «ساعة <code>order_time</code> التي فيها أكبر عدد من <code>order_id</code> المختلفة»، والجواب المراجَع هو <code>12</code> بـ119 طلبًا. يطبع هذا البرنامج <code>busiest hour: 13 with 148 orders</code> ولا يُرفع شيء. انقر السطر الذي هو <em>السبب</em>، لا سطرًا يظهر فيه الرقم الخاطئ."
        },
        code: code(
          "import pandas as pd",
          "",
          "raw = pd.read_csv(\"cafeteria_orders.csv\")",
          "df = raw.drop_duplicates()",
          "df = df[df[\"qty\"] > 0]",
          "price = pd.to_numeric(df[\"unit_price\"], errors=\"coerce\")",
          "keep = price.notna() & (price <= 50)",
          "df = df[keep].assign(unit_price=price[keep],",
          "                     hour=pd.to_datetime(df.loc[keep, \"order_time\"]).dt.hour)",
          "",
          "per_hour = df.groupby(\"hour\").size().sort_values(ascending=False)",
          "print(\"busiest hour:\", per_hour.index[0], \"with\", per_hour.iloc[0], \"orders\")"
        ),
        answer: 11,
        solution: {
          code: code(
            "per_hour = df.groupby(\"hour\")[\"order_id\"].nunique().sort_values(ascending=False)",
            "print(\"busiest hour:\", per_hour.index[0], \"with\", per_hour.iloc[0], \"orders\")",
            "print(per_hour.head(3).to_dict())"
          ),
          out: "busiest hour: 12 with 119 orders\n{12: 119, 13: 117, 11: 99}",
          en: "Count the key the measure names, not the rows: <code>nunique()</code> on <code>order_id</code>. Print the next two hours as well, so a two-order margin cannot be mistaken for a fact.",
          ar: "عُدّ المفتاح الذي يسمّيه المقياس لا الصفوف: <code>nunique()</code> على <code>order_id</code>. واطبع الساعتين التاليتين أيضًا، فلا يُظَنّ فارق طلبين حقيقةً راسخة."
        },
        hint: {
          en: "The rules were applied correctly: 748 lines survive. So ask what <code>.size()</code> counts, and what a row of this table is.",
          ar: "طُبِّقت القواعد تطبيقًا صحيحًا: نجا 748 سطرًا. فاسأل: ماذا يعدّ <code>.size()</code>؟ وما هو صف هذا الجدول؟"
        },
        explain: {
          en: "The cleaning is right — lines 4 to 9 are R1, R2 and R3 plus the hour column, and they leave the 748 lines the card asks for. Line 11 is the cause: <code>.size()</code> counts rows, and a row is an order <em>line</em>, so an order of four items is counted four times. On the clean table that gives 148 at 13:00 against 144 at 12:00, which is the «clean lines» column of Lesson 6: cleaning the rows and counting the right thing are two independent mistakes, and either one alone reports 13:00. This is the same defect as a PivotTable with <code>Count of order_id</code> (155 raw lines at 13:00) and as a Power BI table that shows <code>Count of order_id</code> instead of <code>DISTINCTCOUNT</code>. Line 12 only prints the result and attaches the word «orders» to it, which is where you notice — but nothing there is wrong. The rule: decide whether the question is about lines, units or orders before you choose the function.",
          ar: "التنظيف صحيح — فالأسطر من 4 إلى 9 هي R1 وR2 وR3 مع عمود الساعة، وتترك الأسطر 748 التي تطلبها البطاقة. والسطر 11 هو السبب: <code>.size()</code> يعدّ الصفوف، والصف <em>سطر</em> طلب، فالطلب من أربعة أصناف يُعدّ أربع مرات. وعلى الجدول المنظَّف يعطي ذلك 148 في 13:00 مقابل 144 في 12:00، وهو عمود «الأسطر المنظَّفة» في الدرس 6: فتنظيف الصفوف وعدّ الشيء الصحيح خطأان مستقلان، وكلٌّ منهما وحده يبلّغ 13:00. وهذا هو العيب نفسه في جدول محوري بـ<code>Count of order_id</code> (155 سطرًا خامًا في 13:00) وفي جدول Power BI يُظهر <code>Count of order_id</code> بدل <code>DISTINCTCOUNT</code>. أمّا السطر 12 فيطبع النتيجة ويُلحق بها كلمة «طلبات» وهو موضع الملاحظة — لكن لا شيء فيه خاطئ. والقاعدة: اقرّر هل السؤال عن الأسطر أم الوحدات أم الطلبات قبل أن تختار الدالة."
        }
      },

      /* ---------------------------------------------------------- 08 */
      {
        id: "p1cx08",
        type: "multi",
        level: "medium",
        topics: ["p1-ai-lifecycle", "p1-leakage-clock", "p1-three-counts"],
        q: {
          en: "The cafeteria wants a model, and the training table will be built from the same September file. Which of these decisions hand the model a table that is wrong in a way no error message will report? (Choose all that apply.)",
          ar: "تريد الكافتيريا نموذجًا، وسيُبنى جدول التدريب من ملف أيلول نفسه. أيّ هذه القرارات يسلّم النموذج جدولًا خاطئًا خطأً لا تبلّغ عنه أي رسالة خطأ؟ (اختر كل ما ينطبق.)"
        },
        options: [
          {
            en: "Predicting «will this customer order again?» from the 771-line table, so a customer who bought three items contributes three rows",
            ar: "التنبؤ بـ«هل سيطلب هذا العميل مرة أخرى؟» من جدول الأسطر 771، فيساهم عميل اشترى ثلاثة أصناف بثلاثة صفوف"
          },
          {
            en: "Feeding <code>order_id</code> in as a numeric feature, when the till numbers orders as they arrive (it correlates with <code>order_time</code> at 0.997)",
            ar: "إدخال <code>order_id</code> سمةً عددية، مع أن الخزينة ترقّم الطلبات بترتيب وصولها (ويرتبط بـ<code>order_time</code> بمعامل 0.997)"
          },
          {
            en: "Predicting a line's revenue from a <code>line_total</code> feature computed as <code>qty * unit_price</code>",
            ar: "التنبؤ بإيراد السطر من سمة <code>line_total</code> محسوبة بـ<code>qty * unit_price</code>"
          },
          {
            en: "Shuffling the 22 open days and holding out a random 30% of them for testing",
            ar: "خلط أيام العمل الـ22 وحجز 30% منها عشوائيًّا للاختبار"
          },
          {
            en: "Storing, beside the training table, how many lines each of R1–R5 removed (16, 5, 2, 0, 0)",
            ar: "تخزين عدد الأسطر التي حذفتها كل قاعدة من R1–R5 (16 و5 و2 و0 و0) إلى جانب جدول التدريب"
          },
          {
            en: "Reporting the model's error against a baseline such as «the same weekday last week»",
            ar: "عرض خطأ النموذج مقابل خط أساس مثل «اليوم نفسه من الأسبوع الماضي»"
          },
          {
            en: "Deriving the training table from the untouched raw file by running a script, rather than from a hand-cleaned copy",
            ar: "استخلاص جدول التدريب من الملف الخام غير الممسوس بتشغيل سكربت، لا من نسخة نُظّفت يدويًّا"
          }
        ],
        answer: [0, 1, 2, 3],
        hint: {
          en: "Four of the seven are habits the chapter recommends. For each of the others ask: what will this column or this split know that it should not?",
          ar: "ثلاث من السبع عادات يوصي بها الفصل. واسأل عن كل من الباقي: ماذا سيعرف هذا العمود أو هذا التقسيم مما لا ينبغي أن يعرفه؟"
        },
        explain: {
          en: "The first four are the chapter's silent failures wearing a model's clothes. Grain: one row must be one of whatever you are predicting, so a per-customer question built on order lines weights a three-item customer three times — and if those rows land on both sides of a split, the model is graded on a customer it has already seen. <code>order_id</code> is nominal and also a clock, so a model fed it «predicts» anything that changes over the month and fails on the first day of October. <code>line_total</code> is leakage by construction: predicting revenue from revenue scores perfectly and teaches nothing. And a random split of time-ordered days lets the model learn from days that come after the days it is tested on. The other three are the habits that make a model auditable: the per-rule counts are the drift detector (23 of 771 last month, 400 of 780 this month is a changed world, not changed code), a baseline is what stops a one-line rule from looking like a win, and a training table derived from the raw file is the only one you can rebuild when someone asks what the model was trained on.",
          ar: "الأربعة الأولى هي الإخفاقات الصامتة في الفصل بثوب نموذج. الحبيبة: يجب أن يكون الصف واحدًا من الشيء الذي تتنبّأ به، فسؤال لكل عميل مبنيّ على أسطر الطلبات يعطي عميلًا بثلاثة أصناف ثلاثة أوزان — وإن وقعت هذه الصفوف على جانبي التقسيم قُيِّم النموذج على عميل رآه سلفًا. و<code>order_id</code> اسمي وهو أيضًا ساعة، فالنموذج الذي يُغذَّى به «يتنبّأ» بكل ما يتغيّر على مدى الشهر ويفشل في أول يوم من تشرين الأول. و<code>line_total</code> تسرّب بالبناء: التنبؤ بالإيراد من الإيراد يصيب إصابة تامة ولا يعلّم شيئًا. والتقسيم العشوائي لأيام مرتَّبة زمنيًّا يجعل النموذج يتعلّم من أيام تأتي بعد الأيام التي يُختبر عليها. والثلاثة الأخرى هي العادات التي تجعل النموذج قابلًا للتدقيق: أعداد القواعد هي كاشف الانجراف (23 من 771 الشهر الماضي و400 من 780 هذا الشهر عالَم تغيّر لا كود تغيّر)، وخط الأساس هو ما يمنع قاعدة من سطر واحد أن تبدو انتصارًا، وجدول التدريب المستخلص من الملف الخام هو الوحيد الذي تستطيع إعادة بنائه حين يسأل أحد: على أيّ شيء دُرِّب النموذج؟"
        }
      },

      /* ---------------------------------------------------------- 09 */
      {
        id: "p1cx09",
        type: "mcq",
        level: "medium",
        topics: ["p1-version-pinning", "p1-requirements", "p1-env-check"],
        q: {
          en: "Your 102-line <code>pip freeze</code>, taken on Windows inside the finished environment, reproduced that environment line for line on a second Windows machine. A classmate installs it on a MacBook and the install stops on <code>pywinpty==3.1.0</code>. Her notebook then prints <code>str</code> where the lesson prints <code>object</code>. What is the right move?",
          ar: "ملف <code>pip freeze</code> من 102 سطر، أُخذ على ويندوز داخل البيئة المكتملة، أعاد بناء تلك البيئة سطرًا بسطر على جهاز ويندوز ثانٍ. تثبّته زميلة على MacBook فيتوقف التثبيت عند <code>pywinpty==3.1.0</code>. ثم يطبع دفترها <code>str</code> حيث يطبع الدرس <code>object</code>. ما الخطوة الصحيحة؟"
        },
        options: [
          {
            en: "Drop the <code>==</code> pins so that pip resolves whatever each platform can install; the dtype label is cosmetic and the data is the same either way.",
            ar: "احذف تثبيتات <code>==</code> ليحلّ pip ما يمكن تثبيته على كل منصّة؛ فتسمية النوع شكلية والبيانات هي نفسها في الحالتين."
          },
          {
            en: "Keep a short <code>requirements.txt</code> that pins only the five packages you chose, so another operating system resolves the rest, and keep the 102-line freeze beside it as a dated record of what worked here.",
            ar: "احتفظ بملف <code>requirements.txt</code> قصير يثبّت الحزم الخمس التي اخترتها فقط، فيحلّ نظام تشغيل آخر الباقي، واحتفظ بملف الـ102 سطر إلى جانبه سجلًّا مؤرَّخًا لما عمل هنا."
          },
          {
            en: "Zip your <code>.venv</code> folder and send it to her, so both machines hold exactly the same 22,000 files.",
            ar: "اضغط مجلد <code>.venv</code> وأرسله إليها، فيحمل الجهازان الملفات نفسها البالغة 22 ألفًا بالضبط."
          },
          {
            en: "Add a <code>requirements-mac.txt</code> that pins the same 102 lines with <code>pywinpty</code> and <code>colorama</code> moved to the bottom, so pip reaches them last.",
            ar: "أضف <code>requirements-mac.txt</code> يثبّت الأسطر 102 نفسها مع نقل <code>pywinpty</code> و<code>colorama</code> إلى الأسفل، فيصل إليهما pip آخرًا."
          }
        ],
        answer: 1,
        hint: {
          en: "Two different problems arrived together. One is about which platform can install a line; the other is about which version prints which dtype. Which answer treats both?",
          ar: "وصلت مشكلتان مختلفتان معًا: إحداهما عن أيّ منصّة تستطيع تثبيت سطر، والأخرى عن أيّ إصدار يطبع أيّ نوع. أيّ جواب يعالج الاثنتين؟"
        },
        explain: {
          en: "Two files, two jobs — which is Version 4 of Lesson 2's evolution. The short file names only what you chose (pandas, numpy, matplotlib, openpyxl, jupyterlab) with exact versions, so it is readable, portable, and still answers the dtype question: pinning pandas at 2.2.3 is exactly what stops a fresh install of 3.1.0 from relabelling the text columns. The full freeze is kept as a lock record of what worked on one machine on one day, not as something other platforms install, because <code>pywinpty</code> and <code>colorama</code> are Windows-only helpers that other packages request there. Dropping the pins (the tempting first option) cures the platform error and causes the dtype drift, which is the gap the thread opened on; and the label is not cosmetic — a feature that depended on the old type can change behaviour with no error. Copying a <code>.venv</code> cannot work: its scripts hold absolute paths and the wrong operating system's binaries. Pip reads a requirements file as a set, so moving a line to the bottom changes nothing.",
          ar: "ملفان ووظيفتان — وهذه هي النسخة الرابعة في تطوّر الدرس 2. فالملف القصير يسمّي ما اخترته وحده (pandas وnumpy وmatplotlib وopenpyxl وjupyterlab) بإصدارات دقيقة، فيكون مقروءًا وقابلًا للنقل، وما زال يجيب عن سؤال النوع: فتثبيت pandas على 2.2.3 هو بالضبط ما يمنع تثبيتًا جديدًا لـ3.1.0 من إعادة تسمية الأعمدة النصية. ويُحفَظ الـfreeze الكامل سجلًّا لما عمل على جهاز واحد في يوم واحد، لا شيئًا تثبّته منصّات أخرى، لأن <code>pywinpty</code> و<code>colorama</code> مساعدان خاصّان بويندوز تطلبهما الحزم الأخرى هناك. وحذف التثبيتات (الخيار الأول المغري) يشفي خطأ المنصّة ويسبّب انجراف الأنواع، وهو الفجوة التي فُتح بها الخيط؛ والتسمية ليست شكلية — فسمة اعتمدت على النوع القديم قد تغيّر سلوكها بلا أي خطأ. ونسخ <code>.venv</code> لا يعمل: فسكربتاته تحمل مسارات مطلقة وملفات نظام تشغيل آخر التنفيذية. وpip يقرأ ملف المتطلبات مجموعةً، فنقل سطر إلى الأسفل لا يغيّر شيئًا."
        }
      },

      /* ---------------------------------------------------------- 10 */
      {
        id: "p1cx10",
        type: "trace",
        level: "hard",
        topics: ["p1-step-order", "p1-pq-cleaning-steps", "p1-rule-order"],
        lang: "python",
        q: {
          en: "Four students build the same Power Query recipe and differ only in how they removed duplicates. Lesson 5's appendix reproduces each one in pandas, as below. After the program has run, what are the four line counts? (<code>valid()</code> is the <code>Table.SelectRows</code> step; the file has 771 lines.)",
          ar: "يبني أربعة طلاب وصفة Power Query نفسها ولا يختلفون إلا في طريقة حذف المكرّر. ويعيد ملحق الدرس 5 إنتاج كل واحدة منها في pandas كما في الأسفل. بعد تنفيذ البرنامج، ما أعداد الأسطر الأربعة؟ (<code>valid()</code> هي خطوة <code>Table.SelectRows</code>؛ وفي الملف 771 سطرًا.)"
        },
        code: code(
          "import pandas as pd",
          "",
          "raw = pd.read_csv(\"cafeteria_orders.csv\")",
          "x = raw.assign(unit_price=pd.to_numeric(raw[\"unit_price\"], errors=\"coerce\"),",
          "               item=raw[\"item\"].str.strip().str.title())",
          "",
          "def valid(t):",
          "    return t[(t[\"qty\"] > 0) & t[\"unit_price\"].notna() & (t[\"unit_price\"] < 50)]",
          "",
          "recipe     = len(valid(x.drop_duplicates()))",
          "indexed    = len(valid(x.assign(idx=range(len(x))).drop_duplicates()))",
          "by_id      = len(valid(x.drop_duplicates(subset=[\"order_id\"])))",
          "by_id_item = len(valid(x.drop_duplicates(subset=[\"order_id\", \"item\"])))"
        ),
        blanks: [
          {
            accept: ["748"],
            label: {
              en: "recipe",
              ar: "recipe"
            }
          },
          {
            accept: ["764"],
            label: {
              en: "indexed",
              ar: "indexed"
            }
          },
          {
            accept: ["610"],
            label: {
              en: "by_id",
              ar: "by_id"
            }
          },
          {
            accept: ["742"],
            label: {
              en: "by_id_item",
              ar: "by_id_item"
            }
          }
        ],
        hint: {
          en: "For each of the four, ask how many lines the duplicate step can possibly remove: 16 whole-row repeats, nothing at all, or every line of an order after its first. 616 orders hold 771 lines.",
          ar: "اسأل عن كل واحدة من الأربع: كم سطرًا تستطيع خطوة المكرّر أن تحذف أصلًا؟ ستة عشر تكرارًا لصف كامل، أو لا شيء، أو كل سطر في الطلب بعد أوّله. و616 طلبًا تحمل 771 سطرًا."
        },
        explain: {
          en: "The recipe gives 748 and 8,062.00: 16 whole-row repeats, then 7 lines the filter rejects (5 refunds, the 120.0 typo, the <code>n/a</code> price). <code>indexed</code> is 764 because an index column has a different value on every line, so no two lines are identical any more and <code>Table.Distinct</code> removes nothing: 175.00 of phantom revenue stays in, with no error and no warning — the Index belongs after the de-duplication, never before. <code>by_id</code> is 610 because de-duplicating on the identifier alone keeps one line per order and deletes every other line of every order, 6,598.50 instead of 8,062.00. <code>by_id_item</code> is 742: it also deletes the 6 real second lines that repeat an item inside one order, costing 80.00. Four orders of the same list of clicks, four different answers, and three of them are silent. The rule of thumb: remove whole-row duplicates before you add any column that makes rows unique, and never after.",
          ar: "تعطي الوصفة 748 و8,062.00: ستة عشر تكرارًا لصف كامل، ثم سبعة أسطر يرفضها المرشِّح (خمسة مرتجعات، وخطأ 120.0، وسعر <code>n/a</code>). و<code>indexed</code> هو 764 لأن عمود الفهرس له قيمة مختلفة في كل سطر، فلا يبقى سطران متطابقين ولا يحذف <code>Table.Distinct</code> شيئًا: فيبقى 175.00 من إيراد وهمي بلا خطأ ولا تحذير — والفهرس مكانه بعد حذف المكرّر لا قبله. و<code>by_id</code> هو 610 لأن حذف المكرّر بالمعرّف وحده يُبقي سطرًا واحدًا لكل طلب ويحذف كل سطر آخر في كل طلب، 6,598.50 بدل 8,062.00. و<code>by_id_item</code> هو 742: فهو يحذف أيضًا الأسطر الستة الثانية الحقيقية التي تكرّر صنفًا داخل طلب واحد، بكلفة 80.00. أربعة ترتيبات لقائمة النقرات نفسها، وأربعة أجوبة مختلفة، وثلاثة منها صامتة. والقاعدة العملية: احذف مكرّرات الصف الكامل قبل أن تضيف أي عمود يجعل الصفوف فريدة، ولا بعده أبدًا."
        }
      },

      /* ---------------------------------------------------------- 11 */
      {
        id: "p1cx11",
        type: "compare",
        level: "hard",
        topics: ["p1-xl-lookup", "p1-rules-as-data", "p1-golden-answer"],
        q: {
          en: "Two versions of R3, the rule about the price column. A is the chapter's <code>price &lt;= 50</code>; B is Exercise 6.3's rule, «the price must equal the menu's <code>list_price</code>». Both run on September, and then on next month's file, in which one Shawarma Wrap has been typed <code>45.0</code>. R1 and R2 have already run in both. Which statement is correct?",
          ar: "نسختان من R3، القاعدة الخاصة بعمود السعر. أ هي <code>price &lt;= 50</code> في الفصل؛ وب هي قاعدة التمرين 6.3: «يجب أن يساوي السعر <code>list_price</code> في القائمة». تعمل النسختان على أيلول ثم على ملف الشهر القادم الذي كُتب فيه سعر شاورما رِب واحدة <code>45.0</code>. وقد عملت R1 وR2 في كلتيهما. أيّ العبارات صحيحة؟"
        },
        codeA: code(
          "price = pd.to_numeric(df[\"unit_price\"], errors=\"coerce\")",
          "keep = price.notna() & (price <= 50)",
          "df = df[keep].assign(unit_price=price[keep])",
          "print(len(df), format((df[\"qty\"] * df[\"unit_price\"]).sum(), \",.2f\"))"
        ),
        codeB: code(
          "key = df[\"item\"].str.strip().str.lower()",
          "listed = {m.strip().lower(): p for m, p in zip(menu[\"item\"], menu[\"list_price\"])}",
          "price = pd.to_numeric(df[\"unit_price\"], errors=\"coerce\")",
          "keep = price.notna() & (price == key.map(listed))",
          "df = df[keep].assign(unit_price=price[keep])",
          "print(len(df), format((df[\"qty\"] * df[\"unit_price\"]).sum(), \",.2f\"))"
        ),
        options: [
          {
            en: "On September both print <code>748 8,062.00</code> and reject the same two lines. On next month's file A keeps the 45.0 line: its rule log still reads R3 = 2 and its line count is still 748, so only the revenue moves, to 8,095.00 — 33.00 that never existed, which nothing in the rules saw. B rejects it as a third removal (747 lines) and can name the menu price it should have had, at the price of a dependency on <code>cafeteria_menu.csv</code> and of rejecting a genuinely new item wholesale.",
            ar: "على أيلول تطبع النسختان <code>748 8,062.00</code> وترفضان السطرين نفسيهما. وعلى ملف الشهر القادم تُبقي أ سطر 45.0: فيبقى سجل قواعدها R3 = 2 ويبقى عدد أسطرها 748، فلا يتحرك إلا الإيراد إلى 8,095.00 — أي 33.00 لم توجد قط، ولم ترها القواعد. وترفضه ب حذفًا ثالثًا (747 سطرًا) وتستطيع أن تسمّي سعر القائمة الذي كان ينبغي أن يكون، بثمن تبعية لملف <code>cafeteria_menu.csv</code> ورفضٍ جملةً لصنف جديد حقًّا."
          },
          {
            en: "A is the better rule because it needs no second file, so it cannot be broken by a change to the menu: a rule whose answer depends on another table is not a rule about this file at all.",
            ar: "أ هي القاعدة الأفضل لأنها لا تحتاج ملفًّا ثانيًا، فلا يكسرها تغيير في القائمة: والقاعدة التي يتوقف جوابها على جدول آخر ليست قاعدة عن هذا الملف أصلًا."
          },
          {
            en: "They are equivalent: both reject exactly the 120.0 line and the <code>n/a</code> line and both give 748 lines and 8,062.00, so which one you use is a matter of taste.",
            ar: "النسختان متكافئتان: كلتاهما ترفض سطر 120.0 وسطر <code>n/a</code> بالضبط، وكلتاهما تعطي 748 سطرًا و8,062.00، فاستعمال إحداهما مسألة ذوق."
          },
          {
            en: "B is wrong, because a genuine mid-month price rise would be rejected as an error; a rule that cannot tell a typo from a new price must not be used on money.",
            ar: "ب خاطئة، لأن ارتفاع سعر حقيقيًّا في منتصف الشهر سيُرفض كأنه خطأ؛ والقاعدة التي لا تميّز الخطأ المطبعي من السعر الجديد لا يصحّ استعمالها على المال."
          }
        ],
        answer: 0,
        hint: {
          en: "Run both on September and they agree, so the comparison has to be made on the file you have not seen yet. Ask of A: which of its outputs moves, and which one the golden check is watching.",
          ar: "شغّل النسختين على أيلول فتتفقان، فلا بدّ أن تكون المقارنة على الملف الذي لم تره بعد. واسأل عن أ: أيّ مخرجاتها يتحرك، وأيّها يراقبه الفحص المرجعي."
          },
        explain: {
          en: "Running both: on September each prints <code>748 8,062.00</code>; with the 45.0 line, A prints <code>748 8,095.00</code> and B removes a third line (747). The point is what A's own diagnostics say — R1 16, R2 5, R3 2, 748 lines, exactly September's log — so a reader who checks the rule counts sees a clean run and a revenue 33.00 too big. The threshold 50 is a number somebody chose after looking at this month's data, and 45.0 is plausible precisely because it is under it. B replaces the eyeball with the menu, so the rejection can say «the menu says 12.00, the till says 45.00», gives the same 748 and 8,062.00 on September, and as a bonus fixes R4's worst defect by taking the menu's own spelling of <code>Water 500ml</code>. Its costs are real but are not what «wrong» means: it needs the menu file, and a genuinely new seasonal item would be dropped wholesale — which is why a production version reports unmatched items as a warning and stops instead of dropping them silently. «They are equivalent» is the tempting answer because it is true of September and false of every month after it.",
          ar: "بتشغيل النسختين: على أيلول تطبع كلٌّ منهما <code>748 8,062.00</code>؛ ومع سطر 45.0 تطبع أ <code>748 8,095.00</code> وتحذف ب سطرًا ثالثًا (747). والمهم ما تقوله تشخيصات أ نفسها — R1 16 وR2 5 وR3 2 و748 سطرًا، أي سجل أيلول بالضبط — فالقارئ الذي يفحص أعداد القواعد يرى تشغيلًا نظيفًا وإيرادًا يزيد 33.00. والعتبة 50 رقم اختاره شخص بعد النظر في بيانات هذا الشهر، و45.0 معقول لأنه تحتها بالضبط. وتستبدل ب النظرَ بالقائمة، فيصير الرفض قادرًا على القول «القائمة تقول 12.00 والخزينة تقول 45.00»، وتعطي 748 و8,062.00 نفسها على أيلول، وتصلح زيادةً أسوأ عيوب R4 بأخذ تهجئة القائمة نفسها لـ<code>Water 500ml</code>. وكلفتها حقيقية لكنها ليست معنى «خاطئة»: فهي تحتاج ملف القائمة، وصنف موسمي جديد حقًّا سيُحذَف جملةً — ولهذا تبلّغ النسخة الإنتاجية عن الأصناف غير المطابقة تحذيرًا وتتوقف بدل حذفها بصمت. و«النسختان متكافئتان» هو الجواب المغري لأنه صحيح في أيلول وخاطئ في كل شهر بعده."
        }
      },

      /* ---------------------------------------------------------- 12 */
      {
        id: "p1cx12",
        type: "compare",
        level: "medium",
        topics: ["p1-hour-grain", "p1-nb-chart-hour", "p1-dax-measures"],
        q: {
          en: "Both programs start from <code>df</code>, the cleaned 748-line table with an <code>hour</code> column, and both answer «in which hour are we busiest?». Both run. Which statement is correct?",
          ar: "يبدأ البرنامجان من <code>df</code>، الجدول المنظَّف من 748 سطرًا وفيه عمود <code>hour</code>، ويجيبان كلاهما عن «في أي ساعة نحن أكثر ازدحامًا؟». ويعمل البرنامجان. أيّ العبارات صحيحة؟"
        },
        codeA: code(
          "per_hour = df.groupby(\"hour\").size()",
          "print(per_hour.idxmax(), per_hour.max())"
        ),
        codeB: code(
          "per_hour = df.groupby(\"hour\")[\"order_id\"].nunique()",
          "print(per_hour.idxmax(), per_hour.max())"
        ),
        options: [
          {
            en: "A prints <code>13 148</code> and B prints <code>12 119</code>. Both read the same cleaned rows, so the whole difference is the grain — and the raw table hides a third trap: there 12:00 and 13:00 are tied at 119 distinct orders, and <code>idxmax()</code> would report 12 without mentioning the tie.",
            ar: "تطبع أ <code>13 148</code> وتطبع ب <code>12 119</code>. يقرأ البرنامجان الصفوف المنظَّفة نفسها، فالفرق كله هو الحبيبة — ويخفي الجدول الخام فخًّا ثالثًا: هناك تتعادل 12:00 و13:00 عند 119 طلبًا مختلفًا، و<code>idxmax()</code> يبلّغ 12 دون أن يذكر التعادل."
          },
          {
            en: "They must agree, because both read the cleaned table; a difference between them means the cleaning rules were applied twice to one of the two.",
            ar: "لا بدّ أن يتفقا، لأن كليهما يقرأ الجدول المنظَّف؛ وأي فرق بينهما يعني أن قواعد التنظيف طُبِّقت مرتين على أحدهما."
          },
          {
            en: "A is the better answer: a busy hour is an hour with many items to make, so counting lines is the honest unit and 13:00 really is the hour that needs the staff.",
            ar: "أ هي الجواب الأفضل: الساعة المزدحمة هي ساعة فيها أصناف كثيرة تُعَدّ، فعدّ الأسطر هو الوحدة الأمينة، و13:00 هي بالفعل الساعة التي تحتاج الموظفين."
          },
          {
            en: "B is wrong because <code>nunique()</code> counts an order once even when its lines fall in two different hours, so orders that straddle 12:00 are lost.",
            ar: "ب خاطئة لأن <code>nunique()</code> يعدّ الطلب مرة واحدة حتى لو وقعت أسطره في ساعتين مختلفتين، فتضيع الطلبات التي تمتد عبر 12:00."
          }
        ],
        answer: 0,
        hint: {
          en: "Check the measure on the card before you judge which unit is honest. Then ask which of the two numbers 148 and 119 could be read off the Excel PivotTable of Lesson 4.",
          ar: "راجع المقياس المكتوب في البطاقة قبل أن تحكم أيّ وحدة أمينة. ثم اسأل: أيّ الرقمين 148 و119 يمكن قراءته من الجدول المحوري في الدرس 4؟"
        },
        explain: {
          en: "Running both gives <code>13 148</code> and <code>12 119</code>. Cleaning and grain are independent mistakes: these two programs clean identically and still disagree, because 13:00 genuinely has more lines (148 against 144) while 12:00 has more orders (119 against 117). «Lines are the honest unit» is the tempting option, and it is not wrong about kitchens — it is wrong about this question, because MEASURE 2 on the executable card says «the most distinct <code>order_id</code>», and a measure you can reinterpret at reading time is the three-analysts problem of Lesson 1 all over again. The fourth option misreads the data dictionary: every line of one order carries the same <code>order_time</code>, so no order straddles two hours. The third trap is the one that catches careful people: in the raw table the two hours tie at 119 and <code>idxmax()</code> returns the first maximum silently, which is why the chapter's <code>check()</code> asserts that the busiest hour is not a tie, and why you print the next two hours beside it.",
          ar: "تشغيل البرنامجين يعطي <code>13 148</code> و<code>12 119</code>. والتنظيف والحبيبة خطأان مستقلان: فهذان البرنامجان ينظّفان تنظيفًا متطابقًا ويختلفان مع ذلك، لأن 13:00 فيها أسطر أكثر فعلًا (148 مقابل 144) وفي 12:00 طلبات أكثر (119 مقابل 117). و«الأسطر هي الوحدة الأمينة» هو الخيار المغري، وهو ليس خاطئًا بشأن المطابخ — بل بشأن هذا السؤال، لأن المقياس الثاني في البطاقة القابلة للتنفيذ يقول «أكبر عدد من <code>order_id</code> المختلفة»، والمقياس الذي يُعاد تأويله وقت القراءة هو مشكلة المحلّلين الثلاثة في الدرس 1 من جديد. والخيار الرابع يسيء قراءة قاموس البيانات: فكل أسطر الطلب الواحد تحمل <code>order_time</code> نفسه، فلا طلب يمتد عبر ساعتين. والفخ الثالث هو الذي يصطاد الحرصين: في الجدول الخام تتعادل الساعتان عند 119 ويعيد <code>idxmax()</code> أول قيمة عظمى بصمت، ولهذا تؤكّد الدالة <code>check()</code> في الفصل أن أكثر ساعة ازدحامًا ليست تعادلًا، ولهذا تطبع الساعتين التاليتين إلى جانبها."
        }
      },

      /* ---------------------------------------------------------- 13 */
      {
        id: "p1cx13",
        type: "compare",
        level: "hard",
        topics: ["p1-silent-defaults", "p1-xl-text-repairs", "p1-rules-dialects"],
        q: {
          en: "R4 says «strip the spaces around <code>item</code> and put it in Title Case». Lesson 4's workbook implemented the first half only. Here are the two versions of the helper column, each with the two checks a reviewer would run in Excel. Which statement is correct?",
          ar: "تقول R4: «احذف المسافات حول <code>item</code> واكتبه بحالة العنوان». ونفّذ مصنف الدرس 4 نصفها الأول فقط. وهاتان نسختا العمود المساعد، مع الفحصين الذين سيجريهما مراجع في Excel. أيّ العبارات صحيحة؟"
        },
        codeA: code(
          "item_clean   =TRIM([@item])",
          "",
          "=ROWS(UNIQUE(tblOrders[item_clean]))                      ->  16",
          "=SUMIFS(tblOrders[line_total],tblOrders[item_clean],\"Latte\",",
          "        tblOrders[status],\"ok\")                           ->  693.00"
        ),
        codeB: code(
          "item_clean   =PROPER(TRIM([@item]))",
          "",
          "=ROWS(UNIQUE(tblOrders[item_clean]))                      ->  16",
          "=SUMIFS(tblOrders[line_total],tblOrders[item_clean],\"Latte\",",
          "        tblOrders[status],\"ok\")                           ->  693.00"
        ),
        options: [
          {
            en: "Inside Excel the two columns are indistinguishable, because <code>UNIQUE</code> and text criteria both ignore letter case — A gets the right number from a default instead of from the rule. Its column still holds 19 distinct strings, so the moment <code>item_clean</code> is exported and grouped in pandas or Power BI, Latte splits into 666.00 and 27.00 and the reconciliation's <code>items</code> field reads 19 instead of 16.",
            ar: "داخل Excel لا يمكن التمييز بين العمودين، لأن <code>UNIQUE</code> ومعايير النص يتجاهلان حالة الأحرف — فتحصل أ على الرقم الصحيح من افتراضٍ لا من القاعدة. وما زال عمودها يحوي 19 سلسلة مختلفة، فلحظة تصدير <code>item_clean</code> وتجميعه في pandas أو Power BI ينقسم لاتيه إلى 666.00 و27.00 ويقرأ حقل <code>items</code> في المطابقة 19 بدل 16."
          },
          {
            en: "A returns 19 and 666.00 where B returns 16 and 693.00, so the missing half of R4 is visible inside the workbook and the reviewer's two checks are enough to catch it.",
            ar: "تعيد أ 19 و666.00 حيث تعيد ب 16 و693.00، فالنصف الناقص من R4 ظاهر داخل المصنف وفحصا المراجع كافيان لالتقاطه."
          },
          {
            en: "The two columns are the same: <code>PROPER</code> changes how the text is drawn, not what the cell stores, so both hold the same 16 names and the checks must agree.",
            ar: "العمودان متماثلان: <code>PROPER</code> يغيّر كيف يُرسَم النص لا ما تخزّنه الخلية، فيحوي كلاهما الأسماء الستة عشر نفسها ولا بدّ أن يتفق الفحصان."
          },
          {
            en: "A is the better column: <code>PROPER</code> is what rewrites the menu's own <code>Water 500ml</code> as <code>Water 500Ml</code> on 76 lines, so B breaks the join to the menu for 256.00 of revenue and should not be used.",
            ar: "أ هي العمود الأفضل: <code>PROPER</code> هو ما يعيد كتابة <code>Water 500ml</code> الصحيح في القائمة <code>Water 500Ml</code> في 76 سطرًا، فتكسر ب الوصل بالقائمة على 256.00 من الإيراد ولا ينبغي استعمالها."
          }
        ],
        answer: 0,
        hint: {
          en: "Lesson 4 said <code>UNIQUE</code> ignores letter case, and so do <code>SUMIFS</code> criteria. So ask where the difference between the two columns could possibly show up.",
          ar: "قال الدرس 4 إن <code>UNIQUE</code> يتجاهل حالة الأحرف، وكذلك معايير <code>SUMIFS</code>. فاسأل: أين يمكن أن يظهر الفرق بين العمودين أصلًا؟"
        },
        explain: {
          en: "Both checks pass in both versions, which is exactly the problem: Excel folded the case for you, so the workbook reported the full 693.00 for Latte with no <code>PROPER</code> anywhere, and <code>UNIQUE</code> counted 16 names in a column that really holds 19 strings. A right answer for the wrong reason is a defect, for three reasons the lesson spells out. The column is still wrong, so anything downstream of Excel inherits a defect Excel itself hid — exported and grouped case-sensitively, Latte is 666.00 plus 27.00, and the reconciliation's <code>items</code> witness reads 19. The rule is unwritten, so nobody can review or change it. And the behaviour is a default, not a promise: a case-sensitive comparison, another locale or an <code>EXACT()</code> written later, and the number moves. Option two is the arithmetic people expect and the reason the defect survived a review. Option three confuses a number format with a stored value, which is the <code>2-Sep</code> lesson of Lesson 4. And option four is right about the damage — Title Case really does break 76 correct names, worth 256.00 — but wrong about the remedy: the fix is Exercise 6.3's menu lookup, not an unwritten rule, and R4's join is repaired by applying the same rule to the menu, as Lesson 5's Menu query does.",
          ar: "ينجح الفحصان في النسختين، وهذا هو المشكل بالضبط: فقد طوى Excel حالة الأحرف نيابةً عنك، فأبلغ المصنف بكامل 693.00 لِلاتيه دون <code>PROPER</code> في أي موضع، وعدّ <code>UNIQUE</code> ستة عشر اسمًا في عمود يحوي حقًّا 19 سلسلة. والجواب الصحيح لسبب خاطئ عيبٌ، لثلاثة أسباب يذكرها الدرس. العمود ما زال خاطئًا، فكل ما يأتي بعد Excel يرث عيبًا أخفاه Excel نفسه — فبالتصدير والتجميع حسّاسًا لحالة الأحرف يصير لاتيه 666.00 زائد 27.00، ويقرأ شاهد <code>items</code> في المطابقة 19. والقاعدة غير مكتوبة، فلا يستطيع أحد مراجعتها أو تغييرها. والسلوك افتراض لا وعد: فمقارنة حسّاسة لحالة الأحرف، أو لغة إقليمية أخرى، أو <code>EXACT()</code> يُكتب لاحقًا، ويتحرك الرقم. والخيار الثاني هو الحساب الذي يتوقعه الناس وهو سبب نجاة العيب من المراجعة. والخيار الثالث يخلط صيغة العرض بالقيمة المخزَّنة، وهذا درس <code>2-Sep</code> في الدرس 4. والخيار الرابع صائب في الضرر — فحالة العنوان تكسر فعلًا 76 اسمًا صحيحًا بقيمة 256.00 — وخاطئ في العلاج: فالإصلاح هو بحث القائمة في التمرين 6.3 لا قاعدة غير مكتوبة، ووصل R4 يُصلَح بتطبيق القاعدة نفسها على القائمة كما يفعل استعلام Menu في الدرس 5."
        }
      },

      /* ---------------------------------------------------------- 14 */
      {
        id: "p1cx14",
        type: "contrast",
        level: "hard",
        topics: ["p1-xl-duplicates", "p1-applied-steps", "p1-capstone-script"],
        q: {
          en: "Two answers to «remove the rows that should not be counted» sit next to each other on the P-CLEAN thread. Place each statement under Excel's helper columns (<code>line_key</code>, <code>dup_n</code>, <code>status</code>), under Power Query's Applied Steps, under both, or under neither.",
          ar: "جوابان عن «أزل الصفوف التي لا ينبغي عدّها» يقعان جنبًا إلى جنب على خيط P-CLEAN. ضع كل عبارة تحت أعمدة Excel المساعدة (<code>line_key</code> و<code>dup_n</code> و<code>status</code>)، أو تحت خطوات Power Query المطبَّقة، أو تحتهما معًا، أو تحت لا أحد منهما."
        },
        concepts: [
          {
            en: "Excel's helper columns and the <code>status</code> rules (Lesson 4)",
            ar: "أعمدة Excel المساعدة وقواعد <code>status</code> (الدرس 4)"
          },
          {
            en: "Power Query's Applied Steps (Lesson 5)",
            ar: "خطوات Power Query المطبَّقة (الدرس 5)"
          }
        ],
        neither: true,
        rows: [
          {
            s: {
              en: "Not one row is deleted from the export the till produced",
              ar: "لا يُحذف صف واحد من التصدير الذي أنتجته الخزينة"
            },
            a: 2
          },
          {
            s: {
              en: "All 771 rows stay in sight, each carrying beside the data the reason it does or does not count",
              ar: "تبقى الصفوف 771 كلها مرئية، ويحمل كل صف إلى جانب البيانات سببَ عدّه أو عدم عدّه"
            },
            a: 0
          },
          {
            s: {
              en: "The whole cleaning is a named list that one click replays on next month's export",
              ar: "التنظيف كله قائمة مسمّاة تعيد نقرة واحدة تشغيلها على تصدير الشهر القادم"
            },
            a: 1
          },
          {
            s: {
              en: "A row count after every step (771, 771, 771, 771, 755, 748) is there to click through as a per-step audit",
              ar: "عدد الصفوف بعد كل خطوة (771 و771 و771 و771 و755 و748) موجود لتنقر عبره تدقيقًا خطوةً بخطوة"
            },
            a: 1
          },
          {
            s: {
              en: "<code>latte</code> and <code>Latte</code> are folded together by the tool's own default, with no rule written anywhere",
              ar: "تُدمَج <code>latte</code> و<code>Latte</code> بافتراض الأداة نفسها، دون قاعدة مكتوبة في أي مكان"
            },
            a: 0
          },
          {
            s: {
              en: "A column added before the duplicate check makes every key unique, so nothing is flagged and 175.00 stays in",
              ar: "عمود يُضاف قبل فحص المكرّر يجعل كل مفتاح فريدًا، فلا يُعلَّم شيء ويبقى 175.00 داخلًا"
            },
            a: 2
          },
          {
            s: {
              en: "It can be re-run at 08:00 on Monday with nobody at the keyboard, and exit non-zero if the answer has drifted",
              ar: "يمكن إعادة تشغيله في الثامنة صباح الاثنين بلا أحد على لوحة المفاتيح، والخروج برمز غير صفري إن انجرف الجواب"
            },
            a: 3
          }
        ],
        hint: {
          en: "Two rows are about what the artefact lets a reader see, two about what it lets a machine replay, and one is a trap that both share. For the last row, ask which of the three tools owns an exit code.",
          ar: "صفّان عن ما يسمح به الناتج للقارئ أن يراه، وصفّان عن ما يسمح به للآلة أن تعيد تشغيله، وواحد فخٌّ يتشاركانه. وعن الصف الأخير اسأل: أيّ الأدوات الثلاث تملك رمز خروج؟"
        },
        explain: {
          en: "Each tool's strength and its cost are the same property seen from two sides. Excel shows the cleaning beside the data, because the rules live in cells: all 771 rows stay, labelled, and the five <code>status</code> counts must add to 771 or a row has escaped — which is also why nothing in the workbook defines «duplicate», and why the case folding happens without a rule anyone could review. Power Query records the recipe, because the engine owns the transformation: the steps are named, <code>Refresh</code> replays them, and the per-step row counts are an audit you can click through — which is also why a step in the wrong order can change the answer. Neither deletes anything from the source, and both fall to the same trap: a column added before the de-duplication makes every row unique (Excel's <code>line_key</code> spans <code>order_id</code> to <code>customer_type</code>; <code>Table.Distinct</code> with no column list compares every column), so no duplicate is removed and the 175.00 of phantom revenue survives. And neither can run unattended with an exit code: that is the pandas script of Concept 6, which is why the chapter ends there and not in a workbook.",
          ar: "قوة كل أداة وكلفتها خصيصة واحدة من وجهين. فExcel يُظهر التنظيف إلى جانب البيانات لأن القواعد تعيش في الخلايا: تبقى الصفوف 771 كلها موسومة، ويجب أن تجمع أعداد <code>status</code> الخمسة 771 وإلا أفلت صف — وهذا أيضًا سبب أن لا شيء في المصنف يعرّف «المكرّر»، وسبب أن طيّ حالة الأحرف يحدث دون قاعدة يراجعها أحد. وPower Query يسجّل الوصفة لأن المحرّك يملك التحويل: فالخطوات مسمّاة، و<code>Refresh</code> يعيد تشغيلها، وأعداد الصفوف بعد كل خطوة تدقيق تنقر عبره — وهذا أيضًا سبب أن خطوة في الموضع الخطأ قد تغيّر الجواب. ولا يحذف أيٌّ منهما شيئًا من المصدر، ويسقط كلاهما في الفخ نفسه: عمود يُضاف قبل حذف المكرّر يجعل كل صف فريدًا (فـ<code>line_key</code> في Excel يمتد من <code>order_id</code> إلى <code>customer_type</code>، و<code>Table.Distinct</code> بلا قائمة أعمدة يقارن كل عمود)، فلا يُحذف مكرّر ويبقى 175.00 من الإيراد الوهمي. ولا يستطيع أيٌّ منهما العمل بلا حضور مع رمز خروج: وهذا سكربت pandas في المفهوم 6، ولهذا ينتهي الفصل هناك لا في مصنف."
        }
      },

      /* ---------------------------------------------------------- 15 */
      {
        id: "p1cx15",
        type: "ordercode",
        level: "hard",
        topics: ["p1-m-code", "p1-step-order", "p1-pq-cleaning-steps"],
        q: {
          en: "The Orders query is being rebuilt in the Advanced Editor. <code>Source = Csv.Document(File.Contents(DataFolder &amp; \"cafeteria_orders.csv\"), …)</code> is already written, and the query ends with <code>in WithTotal</code>. Put the seven steps in an order that runs and gives 748 lines and 8,062.00.",
          ar: "يُعاد بناء استعلام Orders في المحرر المتقدم. السطر <code>Source = Csv.Document(File.Contents(DataFolder &amp; \"cafeteria_orders.csv\"), …)</code> مكتوب سلفًا، وينتهي الاستعلام بـ<code>in WithTotal</code>. رتّب الخطوات السبع ترتيبًا يعمل ويعطي 748 سطرًا و8,062.00."
        },
        items: [
          {
            code: "Promoted = Table.PromoteHeaders(Source, [PromoteAllScalars = true]),"
          },
          {
            code: code(
              "Typed = Table.TransformColumnTypes(Promoted,",
              "    {{\"order_id\", Int64.Type}, {\"order_time\", type datetime},",
              "     {\"qty\", Int64.Type}, {\"unit_price\", type number}}, \"en-US\"),"
            )
          },
          {
            code: "NoErrors = Table.ReplaceErrorValues(Typed, {{\"unit_price\", null}}),"
          },
          {
            code: code(
              "Tidy = Table.TransformColumns(NoErrors,",
              "    {{\"item\", each Text.Proper(Text.Trim(Text.Clean(_))), type text}}),"
            )
          },
          {
            code: "Unique = Table.Distinct(Tidy),"
          },
          {
            code: code(
              "Valid = Table.SelectRows(Unique,",
              "    each [qty] > 0 and [unit_price] <> null and [unit_price] < 50),"
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
          en: "Every step names the step it reads. Follow the names, and check two things against the rules of thumb: when does the Error in <code>unit_price</code> come into existence, and what must be true before a price is compared with 50?",
          ar: "كل خطوة تسمّي الخطوة التي تقرأها. تتبّع الأسماء، وافحص أمرين مقابل القواعد العملية: متى يوجد الخطأ (Error) في <code>unit_price</code>؟ وما الذي يجب أن يصحّ قبل مقارنة سعر بالعدد 50؟"
        },
        explain: {
          en: "In M each step takes the previous step's name as its input, so the names are the dependency graph and only one order runs. The order is also the rules of thumb, in sequence. Headers first, or the column names are a data row. Types before any arithmetic or comparison: <code>Table.SelectRows</code> comparing <code>[unit_price]</code> with 50 while the column is still text raises, and that is the quiet one, because the column is text precisely when the sample contained the <code>n/a</code>. Replace errors <em>after</em> the step that creates them: run <code>Table.ReplaceErrorValues</code> before <code>Typed</code> and it replaces nothing at all, because the Error value comes into existence one step later. Clean the key before anything that joins on it, or <code>Latte </code> is not <code>Latte</code> and 8 lines find no menu row. Whole-row duplicates before any column that makes rows unique — put <code>WithTotal</code> or an index column before <code>Table.Distinct</code> and nothing is removed, 764 lines and 8,237.00, with no message. Filtering may sit either side of <code>Table.Distinct</code> here: both give 748 and 8,062.00, which is why the chapter writes the agreed order down rather than trusting that it does not matter.",
          ar: "في M تأخذ كل خطوة اسم الخطوة السابقة مدخلًا، فالأسماء هي مخطط التبعية ولا يعمل إلا ترتيب واحد. والترتيب هو نفسه القواعد العملية بالتتابع. الترويسة أولًا وإلا كانت أسماء الأعمدة صفَّ بيانات. والأنواع قبل أي حساب أو مقارنة: فـ<code>Table.SelectRows</code> التي تقارن <code>[unit_price]</code> بالعدد 50 والعمود ما زال نصًّا ترفع خطأً، وهذا هو الهادئ، لأن العمود يكون نصًّا تحديدًا حين تحوي العيّنة <code>n/a</code>. واستبدال الأخطاء <em>بعد</em> الخطوة التي تنشئها: شغّل <code>Table.ReplaceErrorValues</code> قبل <code>Typed</code> فلا يستبدل شيئًا أصلًا، لأن قيمة الخطأ توجد بعد خطوة واحدة. ونظّف المفتاح قبل أي وصل يجري عليه وإلا لم تكن <code>Latte </code> هي <code>Latte</code> ولم تجد ثمانية أسطر صفًّا في القائمة. ومكرّرات الصف الكامل قبل أي عمود يجعل الصفوف فريدة — ضع <code>WithTotal</code> أو عمود فهرس قبل <code>Table.Distinct</code> فلا يُحذف شيء، 764 سطرًا و8,237.00 بلا أي رسالة. والترشيح يصلح على جانبي <code>Table.Distinct</code> هنا: كلاهما يعطي 748 و8,062.00، ولهذا يكتب الفصل الترتيب المتّفق عليه بدل أن يثق بأنه لا يهم."
        }
      },

      /* ---------------------------------------------------------- 16 */
      {
        id: "p1cx16",
        type: "output",
        level: "hard",
        topics: ["p1-golden-answer", "p1-failing-check", "p1-rules-as-data"],
        q: {
          en: "Next month the till operator types a Latte quantity of 3 as 30 (line 2 of the file: order 5002, Latte, 3 × 9.0). The chapter's five rules are applied exactly as before. Write exactly what the program prints (three lines).",
          ar: "في الشهر القادم يكتب موظف الخزينة كمية لاتيه 3 على أنها 30 (السطر 2 في الملف: الطلب 5002، لاتيه، 3 × 9.0). وتُطبَّق قواعد الفصل الخمس كما كانت بالضبط. اكتب بالضبط ما يطبعه البرنامج (ثلاثة أسطر)."
        },
        code: code(
          "import pandas as pd",
          "",
          "raw = pd.read_csv(\"cafeteria_orders.csv\")",
          "raw.loc[2, \"qty\"] = 30                      # a Latte 3 typed as 30",
          "df = raw.drop_duplicates()",
          "df = df[df[\"qty\"] > 0]",
          "price = pd.to_numeric(df[\"unit_price\"], errors=\"coerce\")",
          "keep = price.notna() & (price <= 50)",
          "df = df[keep].assign(unit_price=price[keep],",
          "                     item=df.loc[keep, \"item\"].str.strip().str.title())",
          "df[\"line_total\"] = df[\"qty\"] * df[\"unit_price\"]",
          "print(771 - len(df), \"lines removed,\", len(df), \"kept\")",
          "print(format(df[\"line_total\"].sum(), \",.2f\"))",
          "print(list(df.groupby(\"item\")[\"line_total\"].sum().nlargest(3).index))"
        ),
        blanks: [
          {
            accept: ["23 lines removed, 748 kept\n8,305.00\n['Shawarma Wrap', 'Chicken Rice', 'Latte']"],
            lines: 3
          }
        ],
        hint: {
          en: "Ask of each of the five rules whether a quantity of 30 breaks it. Then do the arithmetic: 27 extra units at 9.0, on a Latte whose September revenue was 693.00, against Falafel Sandwich's 917.00.",
          ar: "اسأل عن كل قاعدة من الخمس: هل تكسرها كمية 30؟ ثم احسب: سبع وعشرون وحدة زائدة بسعر 9.0، على لاتيه كان إيراده في أيلول 693.00، مقابل 917.00 لسندويش الفلافل."
        },
        explain: {
          en: "A quantity of 30 is not a duplicate, not a refund, not a missing price and not above 50, so every rule passes it: 23 lines are removed exactly as in September and 748 are kept. The file looks perfectly clean, and the per-rule log — the diagnostic this chapter built — says R1 16, R2 5, R3 2, unchanged. Only the revenue moves, by 27 × 9.0 = 243.00, to 8,305.00, and that is enough to lift Latte from 693.00 to 936.00, past Falafel Sandwich's 917.00 and into the top three the manager will stock for. Without a reviewed golden answer this run prints a plausible brief and nobody notices; with one, <code>math.isclose(8305.0, 8062.0, abs_tol=0.005)</code> is false, the script names the number it got and exits non-zero. The lesson is not that the rules are bad: validation rules and a reconciliation are different defences, and a quantity typo is the sort of thing only the second one sees.",
          ar: "الكمية 30 ليست تكرارًا ولا مرتجعًا ولا سعرًا مفقودًا ولا أعلى من 50، فتمرّرها كل قاعدة: فيُحذف 23 سطرًا كما في أيلول بالضبط ويُبقى 748. ويبدو الملف نظيفًا تمامًا، ويقول سجل القواعد — التشخيص الذي بناه هذا الفصل — R1 16 وR2 5 وR3 2 بلا تغيير. ولا يتحرك إلا الإيراد، بمقدار 27 × 9.0 = 243.00، إلى 8,305.00، وهذا يكفي لرفع لاتيه من 693.00 إلى 936.00، فيتجاوز 917.00 لسندويش الفلافل ويدخل الثلاثة الأوائل الذين سيخزّن المدير لهم. وبلا جواب مرجعي مراجَع يطبع هذا التشغيل موجزًا معقولًا ولا يلاحظ أحد؛ ومعه تكون <code>math.isclose(8305.0, 8062.0, abs_tol=0.005)</code> كاذبة، فيسمّي السكربت الرقم الذي حصل عليه ويخرج برمز غير صفري. والدرس ليس أن القواعد سيئة: فقواعد التحقق والمطابقة دفاعان مختلفان، وخطأ الكمية المطبعي من النوع الذي لا يراه إلا الثاني."
        }
      },

      /* ---------------------------------------------------------- 17 */
      {
        id: "p1cx17",
        type: "error",
        level: "hard",
        topics: ["p1-golden-answer", "p1-rerun-next-month", "p1-capstone-script"],
        q: {
          en: "This is a colleague's version of <code>cafeteria_answer.py</code>. It prints <code>reconciled with the golden answer: OK</code> on September's file, on next month's file, on a file with the quantity typo of the previous question, and on the first fortnight on its own. Click the line that is the <em>cause</em>, not a line where the check looks sound.",
          ar: "هذه نسخة زميل من <code>cafeteria_answer.py</code>. تطبع <code>reconciled with the golden answer: OK</code> على ملف أيلول، وعلى ملف الشهر القادم، وعلى ملف فيه خطأ الكمية المطبعي في السؤال السابق، وعلى النصف الأول من الشهر وحده. انقر السطر الذي هو <em>السبب</em>، لا سطرًا يبدو فيه الفحص سليمًا."
        },
        code: code(
          "\"\"\"Rebuild the cafeteria answer and reconcile it with the golden answer.\"\"\"",
          "import math",
          "import sys",
          "import pandas as pd",
          "from cafeteria_answer import clean, answer",
          "",
          "TOL = 0.005                       # half a piastre",
          "",
          "res = answer(*clean(pd.read_csv(sys.argv[1])))",
          "GOLDEN = dict(res)                # the answer we reconcile against",
          "",
          "def check(r):",
          "    assert r[\"lines\"] == GOLDEN[\"lines\"], r[\"lines\"]",
          "    assert math.isclose(r[\"revenue\"], GOLDEN[\"revenue\"], abs_tol=TOL), r[\"revenue\"]",
          "    assert r[\"top3\"] == GOLDEN[\"top3\"], r[\"top3\"]",
          "    assert r[\"removed\"] == GOLDEN[\"removed\"], r[\"removed\"]",
          "",
          "check(res)",
          "print(\"reconciled with the golden answer: OK\")"
        ),
        answer: 10,
        solution: {
          code: code(
            "# The answer we reconcile against: computed once, reconciled in three tools,",
            "# reviewed by a person, dated. One row per period, never overwritten.",
            "GOLDEN = {",
            "    \"period\": \"2026-09\", \"reviewed_on\": \"2026-10-05\",",
            "    \"lines\": 748, \"revenue\": 8062.00,",
            "    \"top3\": [\"Shawarma Wrap\", \"Chicken Rice\", \"Falafel Sandwich\"],",
            "    \"removed\": {\"R1\": 16, \"R2\": 5, \"R3\": 2},",
            "}"
          ),
          out: "On September: reconciled with the golden answer: OK\nOn the file with the quantity typo: AssertionError: 8305.0 (exit code 1)",
          en: "A golden answer is a constant a person reviewed and dated, not something the run computes. Keep one row per period in a file beside the script, never overwritten, and stop with «no reviewed answer for October» when the period is missing.",
          ar: "الجواب المرجعي ثابت راجعه إنسان وأرّخه، لا شيء يحسبه التشغيل. احتفظ بصفّ لكل فترة في ملف إلى جانب السكربت، لا يُستبدل أبدًا، وتوقّف برسالة «لا جواب مراجَع لتشرين الأول» إذا غابت الفترة."
        },
        hint: {
          en: "Everything in <code>check()</code> is the real thing: exact on counts and names, a tolerance on money, a message on every assertion. So ask what it is comparing the result with.",
          ar: "كل ما في <code>check()</code> صحيح: تساوٍ تامّ في الأعداد والأسماء، وتسامح على المال، ورسالة مع كل توكيد. فاسأل: بأي شيء يقارن النتيجة؟"
        },
        explain: {
          en: "Line 10 is the cause: <code>GOLDEN = dict(res)</code> copies the answer out of the run that is about to be checked, so the four assertions compare the result with itself and can never fail — on any file, in any month, with any bug. Every line of <code>check()</code> is exactly right, which is what makes this dangerous: a reader scanning the file sees a careful check (<code>==</code> for counts and names, <code>isclose(abs_tol=TOL)</code> for money, a value attached to every assertion) and concludes the script is guarded. It is the failure mode the lesson warns about in one sentence: a golden answer is only as good as the review, and one written from a run nobody checked is strictly worse than no check, because now you trust it. The discipline is the one in Concept 6: reconcile in three tools first, then freeze the result as a constant with the period and the date of its review, keep the old rows, and make a missing period stop the run — because a check that is silently absent is worse than one that fails.",
          ar: "السطر 10 هو السبب: <code>GOLDEN = dict(res)</code> ينسخ الجواب من التشغيل الذي سيُفحَص، فتقارن التوكيدات الأربعة النتيجة بنفسها ولا تفشل أبدًا — على أي ملف وفي أي شهر ومع أي خلل. وكل سطر في <code>check()</code> صحيح تمامًا، وهذا ما يجعل الأمر خطِرًا: فالقارئ الذي يمرّ على الملف يرى فحصًا حريصًا (<code>==</code> للأعداد والأسماء، و<code>isclose(abs_tol=TOL)</code> للمال، وقيمة ملحقة بكل توكيد) فيستنتج أن السكربت محميّ. وهذا هو نمط الإخفاق الذي يحذّر منه الدرس في جملة واحدة: الجواب المرجعي ليس أفضل من مراجعته، والمكتوب من تشغيل لم يفحصه أحد أسوأ قطعًا من لا فحص، لأنك تثق به الآن. والانضباط هو انضباط المفهوم 6: طابِق في ثلاث أدوات أولًا، ثم ثبّت النتيجة ثابتًا مع الفترة وتاريخ مراجعتها، واحفظ الصفوف القديمة، واجعل الفترة الغائبة توقف التشغيل — فالفحص الغائب بصمت أسوأ من الفحص الفاشل."
        }
      },

      /* ---------------------------------------------------------- 18 */
      {
        id: "p1cx18",
        type: "complete",
        level: "hard",
        topics: ["p1-invisible-rules", "p1-reconciliation", "p1-rules-dialects"],
        lang: "python",
        q: {
          en: "<code>agree()</code> decides whether the brief may say «agree». One line is missing: the backstop that still catches a tool which skipped a rule even if somebody later deletes the <code>items</code> and <code>blank_payment</code> fields from the row. Which line is it?",
          ar: "تقرّر <code>agree()</code> هل يجوز للموجز أن يقول «agree». وسطر واحد ناقص: الحارس الذي يظل يلتقط أداةً تخطّت قاعدة، حتى لو حذف أحدٌ لاحقًا الحقلين <code>items</code> و<code>blank_payment</code> من الصف. أيّ سطر هو؟"
        },
        code: code(
          "EXACT = (\"lines\", \"items\", \"orders\", \"blank_payment\")",
          "",
          "def agree(answers, tol=0.005):",
          "    \"\"\"True only when every tool's row matches the first one.\"\"\"",
          "    ref = answers[next(iter(answers))]",
          "    for a in answers.values():",
          "        if any(a[f] != ref[f] for f in EXACT):",
          "            return False",
          "        if not math.isclose(a[\"revenue\"], ref[\"revenue\"], abs_tol=tol):",
          "            return False",
          "        if a[\"top3\"] != ref[\"top3\"] or a[\"busiest\"] != ref[\"busiest\"]:",
          "            return False",
          "        if ____:",
          "            return False",
          "    return True"
        ),
        options: [
          {
            code: "sum(a[\"removed\"].values()) != 23"
          },
          {
            code: "not math.isclose(sum(a[\"removed\"].values()), sum(ref[\"removed\"].values()), abs_tol=tol)"
          },
          {
            code: "a[\"removed\"] != ref[\"removed\"]"
          },
          {
            code: "len(a[\"removed\"]) != len(ref[\"removed\"])"
          }
        ],
        answer: 2,
        solution: {
          code: code(
            "        if a[\"removed\"] != ref[\"removed\"]:",
            "            return False"
          ),
          out: "pandas / Excel / Power BI all 16, 5, 2 -> True; an Excel row with R1 = 0 -> False, even with items and blank_payment removed from the row",
          en: "Compare the whole log, rule by rule: a tool that skipped R1 reports <code>{'R1': 0, 'R2': 5, 'R3': 2}</code>, which no total and no length can see.",
          ar: "قارن السجل كله قاعدةً بقاعدة: فالأداة التي تخطّت R1 تبلّغ <code>{'R1': 0, 'R2': 5, 'R3': 2}</code>، وهذا لا يراه مجموع ولا طول."
        },
        hint: {
          en: "Write down the rule log of a tool that skipped R1 and the log of a tool that skipped R2, and test each option against both.",
          ar: "اكتب سجل قواعد أداةٍ تخطّت R1 وسجل أداةٍ تخطّت R2، واختبر كل خيار عليهما."
        },
        explain: {
          en: "Comparing the dictionaries compares every rule separately, which is the whole value of the log: a tool that skipped R1 reports <code>{'R1': 0, 'R2': 5, 'R3': 2}</code> and is caught on the rule that failed, not on a total. Each wrong option loses exactly that. <code>sum(...) != 23</code> hard-codes this month's number, so it fails on October by construction and passes a tool whose R1 and R2 counts are swapped. The <code>isclose</code> version does the same damage twice: it compares only the total, and it puts a tolerance on a count — 23 and 24 removed lines are not nearly equal, they are a rule that fired once more, and a tolerance on an integer is the one comparison the chapter forbids outright. Comparing lengths asks whether the two logs have the same number of keys, which is true of every tool that implements the same five rules and reports a zero for a rule it skipped. This is why Exercise 6.2 keeps the log comparison even though <code>items</code> and <code>blank_payment</code> already catch R4 and R5: the log is the backstop, and a check should not depend on nobody tidying the row.",
          ar: "مقارنة القاموسين تقارن كل قاعدة على حدة، وهذه هي قيمة السجل كلها: فالأداة التي تخطّت R1 تبلّغ <code>{'R1': 0, 'R2': 5, 'R3': 2}</code> فتُلتقط عند القاعدة التي فشلت لا عند مجموع. وكل خيار خاطئ يفقد ذلك بالضبط. فـ<code>sum(...) != 23</code> يثبّت رقم هذا الشهر، فيفشل على تشرين الأول بالبناء ويمرّر أداةً تبادل فيها عدّا R1 وR2. ونسخة <code>isclose</code> تُحدث الضرر نفسه مرتين: تقارن المجموع وحده، وتضع تسامحًا على عدد — و23 و24 سطرًا محذوفًا ليسا متقاربين، بل قاعدة انطلقت مرة أخرى، والتسامح على عدد صحيح هو المقارنة الوحيدة التي يحرّمها الفصل صراحةً. ومقارنة الطول تسأل هل للسجلّين العدد نفسه من المفاتيح، وهذا صحيح في كل أداة تنفّذ القواعد الخمس نفسها وتبلّغ بصفر عن قاعدة تخطّتها. ولهذا يحتفظ التمرين 6.2 بمقارنة السجل مع أن <code>items</code> و<code>blank_payment</code> يلتقطان R4 وR5 سلفًا: فالسجل هو الحارس، ولا ينبغي أن يتوقف فحص على ألّا يرتّب أحدٌ الصفّ."
        }
      },

      /* ---------------------------------------------------------- 19 */
      {
        id: "p1cx19",
        type: "write",
        level: "hard",
        topics: ["p1-tolerance", "p1-reconciliation", "p1-per-rule-audit"],
        lang: "python",
        q: {
          en: "A tool's row is a dict with the integer fields <code>lines</code>, <code>items</code>, <code>orders</code> and <code>blank_payment</code>, the float <code>revenue</code>, and <code>removed</code>, a dict of the lines each of R1, R2 and R3 removed. Write <code>disagreements(row, golden, tol=0.005)</code>: it returns a list of sentences, one per field that differs from the golden row, and an empty list when the row agrees. It must report everything it finds in one call, compare counts exactly and money within the tolerance, and name the value it got as well as the value it expected.",
          ar: "صفّ الأداة قاموس فيه الحقول الصحيحة <code>lines</code> و<code>items</code> و<code>orders</code> و<code>blank_payment</code>، والعدد العشري <code>revenue</code>، و<code>removed</code> وهو قاموس بعدد الأسطر التي حذفتها كل من R1 وR2 وR3. اكتب <code>disagreements(row, golden, tol=0.005)</code>: تعيد قائمة جمل، جملةً لكل حقل يختلف عن الصف المرجعي، وقائمة فارغة إن توافق الصف. ويجب أن تبلّغ بكل ما تجده في استدعاء واحد، وأن تقارن الأعداد بالتساوي التام والمال داخل حدّ التسامح، وأن تسمّي القيمة التي حصلت عليها والقيمة المتوقَّعة."
        },
        starter: code(
          "import math",
          "",
          "COUNTS = (\"lines\", \"items\", \"orders\", \"blank_payment\")",
          "",
          "def disagreements(row, golden, tol=0.005):",
          "    # your code here"
        ),
        lines: 12,
        checks: [
          {
            re: "^(?=.*\\bisclose\\s*\\()(?=.*abs_tol\\s*=)",
            label: {
              en: "Compare the money with <code>math.isclose(..., abs_tol=tol)</code>",
              ar: "قارن المال بـ<code>math.isclose(..., abs_tol=tol)</code>"
            }
          },
          {
            re: "(!=|==)\\s*golden\\s*\\[",
            label: {
              en: "Compare the counts with the golden row exactly",
              ar: "قارن الأعداد بالصف المرجعي تساويًا تامًّا"
            }
          },
          {
            re: "\\[\\s*[\"']removed[\"']\\s*\\]",
            label: {
              en: "Compare the per-rule removal log as well",
              ar: "قارن أيضًا سجل الحذف لكل قاعدة"
            }
          },
          {
            re: "(\\.append\\s*\\(|\\.extend\\s*\\(|\\+=\\s*\\[)",
            label: {
              en: "Collect each difference instead of returning at the first one",
              ar: "اجمع كل فرق بدل العودة عند أوّلها"
            }
          },
          {
            re: "return\\s+\\w+",
            label: {
              en: "Return the list of sentences",
              ar: "أعد قائمة الجمل"
            }
          }
        ],
        forbid: [
          {
            re: "isclose\\s*\\([^)]*\\b(lines|orders|items|removed)\\b",
            label: {
              en: "A tolerance on a count: 748 and 749 lines are not nearly equal, they are a missing rule",
              ar: "تسامح على عدد: 748 و749 سطرًا ليسا متقاربين، بل قاعدة ناقصة"
            }
          },
          {
            re: "rel_tol",
            label: {
              en: "<code>rel_tol</code>: a relative tolerance scales with the number; money needs an absolute amount",
              ar: "<code>rel_tol</code>: التسامح النسبي يتناسب مع حجم الرقم؛ والمال يحتاج مبلغًا مطلقًا"
            }
          },
          {
            re: "\\breturn\\s+(True|False)\\b",
            label: {
              en: "A bare <code>True</code>/<code>False</code>: a verdict with no field name sends the reader back to all four artefacts",
              ar: "<code>True</code>/<code>False</code> مجرّدة: حكمٌ بلا اسم حقل يعيد القارئ إلى النواتج الأربعة كلها"
            }
          }
        ],
        solution: {
          code: code(
            "import math",
            "",
            "COUNTS = (\"lines\", \"items\", \"orders\", \"blank_payment\")",
            "",
            "def disagreements(row, golden, tol=0.005):",
            "    bad = []",
            "    for field in COUNTS:",
            "        if row[field] != golden[field]:",
            "            bad.append(f\"{field} {row[field]} not {golden[field]}\")",
            "    if not math.isclose(row[\"revenue\"], golden[\"revenue\"], abs_tol=tol):",
            "        bad.append(f\"revenue {row['revenue']:,.2f} not {golden['revenue']:,.2f}\")",
            "    for rule in (\"R1\", \"R2\", \"R3\"):",
            "        if row[\"removed\"][rule] != golden[\"removed\"][rule]:",
            "            bad.append(f\"{rule} removed {row['removed'][rule]} not {golden['removed'][rule]}\")",
            "    return bad"
          ),
          out: "On the reconciled pandas row it returns []. On the Excel row that skipped R1 it returns, in one call: ['lines 764 not 748', 'revenue 8,237.00 not 8,062.00', 'R1 removed 0 not 16']",
          en: "Counts and the rule log are compared with <code>!=</code>, money with <code>math.isclose(abs_tol=tol)</code>, and every finding is appended rather than raised, so one call names every field that moved.",
          ar: "تُقارَن الأعداد وسجل القواعد بـ<code>!=</code>، والمال بـ<code>math.isclose(abs_tol=tol)</code>، وتُضاف كل ملاحظة بدل أن تُرفع، فيسمّي استدعاء واحد كل حقل تحرّك."
        },
        hint: {
          en: "Three groups of fields and three different comparisons: integers, one amount of money, and a dictionary of rule counts. Collect, do not raise.",
          ar: "ثلاث مجموعات من الحقول وثلاث مقارنات مختلفة: أعداد صحيحة، ومبلغ مال واحد، وقاموس أعداد قواعد. اجمع ولا ترفع."
        },
        explain: {
          en: "This is the <code>differences()</code> of Lesson 6 in a few lines, and every choice in it is one the chapter argued for. Counts are integers produced by counting, so any difference is a real difference and <code>!=</code> is the right operator — a tolerance on them would quietly accept a missing rule. Money needs <code>abs_tol=0.005</code>, half a piastre: Excel's card shows 13.19 while pandas holds 13.194762684124386, so <code>==</code> on money either passes by luck or raises a false alarm, and a check that cries wolf gets switched off. <code>rel_tol</code> is the wrong instrument for an amount, because the acceptable error would grow with the total. Collecting instead of raising is the lesson of the three-FAIL workbench check: a workbook with three defects should need one run, not three. And naming the value you got next to the value you expected is what turns «NOT RECONCILED» into «R1 removed 0 not 16» — a sentence that points at one helper column in one tool.",
          ar: "هذه هي <code>differences()</code> في الدرس 6 في بضعة أسطر، وكل اختيار فيها اختيار جادل عنه الفصل. فالأعداد أعداد صحيحة أنتجها عدّ، فأي فرق فيها فرق حقيقي و<code>!=</code> هو العامل الصحيح — والتسامح عليها يقبل قاعدةً ناقصة بهدوء. والمال يحتاج <code>abs_tol=0.005</code>، أي نصف قرش: فبطاقة Excel تُظهر 13.19 وتحمل pandas 13.194762684124386، فـ<code>==</code> على المال إمّا ينجح بالحظ أو يرفع إنذارًا كاذبًا، والفحص الذي يصيح كثيرًا يُطفأ. و<code>rel_tol</code> آلة خاطئة لمبلغ، لأن الخطأ المقبول سيكبر بكبر المجموع. والجمع بدل الرفع هو درس فحص بيئة العمل ذي الإخفاقات الثلاثة: المصنف الذي فيه ثلاثة عيوب يحتاج تشغيلًا واحدًا لا ثلاثة. وتسمية القيمة التي حصلت عليها إلى جانب المتوقَّعة هي ما يحوّل «NOT RECONCILED» إلى «R1 removed 0 not 16» — جملة تشير إلى عمود مساعد واحد في أداة واحدة."
        }
      },

      /* ---------------------------------------------------------- 20 */
      {
        id: "p1cx20",
        type: "multi",
        level: "hard",
        topics: ["p1-reconciliation", "p1-caveats", "p1-who-is-counted"],
        q: {
          en: "The reconciliation table says RECONCILED: all three tools agree on every field, money within 0.005, and all three rule counts match. Which of these would still be wrong, with nothing in that table able to see it? (Choose all that apply.)",
          ar: "يقول جدول المطابقة RECONCILED: تتفق الأدوات الثلاث في كل حقل، والمال داخل 0.005، وتتطابق أعداد القواعد الثلاثة. أيّ هذه الأمور يظل خاطئًا دون أن يراه شيء في ذلك الجدول؟ (اختر كل ما ينطبق.)"
        },
        options: [
          {
            en: "A quantity of 3 typed as 30 at the till",
            ar: "كمية 3 كُتبت 30 على الخزينة"
          },
          {
            en: "A Shawarma Wrap typed <code>45.0</code>, which passes the price limit of 50",
            ar: "شاورما رِب كُتب سعرها <code>45.0</code>، فتجتاز حدّ السعر 50"
          },
          {
            en: "The export covers 1–30 September, while the manager's decision is about the whole term",
            ar: "يغطي التصدير 1–30 أيلول، وقرار المدير عن الفصل الدراسي كله"
          },
          {
            en: "One tool counts <code>Count of order_id</code> per hour where the other two count distinct orders",
            ar: "أداة تعدّ <code>Count of order_id</code> لكل ساعة حيث تعدّ الأخريان الطلبات المختلفة"
          },
          {
            en: "Chicken Rice sells out at 12:30 every day, so the file records no late sales of it — and no demand either",
            ar: "ينتهي أرز الدجاج كل يوم عند 12:30، فلا يسجّل الملف مبيعات متأخرة له — ولا طلبًا عليه"
          },
          {
            en: "Excel's <code>item_clean</code> is <code>TRIM([@item])</code>, with no <code>PROPER</code>",
            ar: "العمود <code>item_clean</code> في Excel هو <code>TRIM([@item])</code> بلا <code>PROPER</code>"
          },
          {
            en: "The Power Query recipe has an Index column before Remove Duplicates, so R1 removed nothing",
            ar: "في وصفة Power Query عمود فهرس قبل Remove Duplicates، فلم تحذف R1 شيئًا"
          }
        ],
        answer: [0, 1, 2, 4],
        hint: {
          en: "Ask what the table compares. Three of the seven would make one row differ from the other two; the rest are things all three tools would get identically.",
          ar: "اسأل: ماذا يقارن الجدول؟ ثلاثة من السبعة تجعل صفًّا يختلف عن الصفين الآخرين؛ والباقي أمور تحصل عليها الأدوات الثلاث على السواء."
        },
        explain: {
          en: "The reconciliation compares tools, not data, so anything the three tools share is invisible to it. The quantity typo passes every rule and leaves all three with 748 lines and 8,305.00: only a golden answer sees it. The 45.0 price is under the hand-picked threshold of 50, so all three accept it and agree on a revenue 33.00 too big. The period is not in the table at all: it is a scope question that belongs on the question card, and «one month only» is the first caveat of the brief. And «sales are not demand» is not a number any tool can compute — the file records what was bought, and an item that sold out at 12:30 looks exactly like an item nobody wanted. The other three would all show up as a differing row: a tool counting lines per hour reports 13:00, so the busiest-hour column differs; Excel's TRIM-only column exports 19 distinct spellings, so the <code>items</code> field reads 19 instead of 16; and an Index before Remove Duplicates gives 764 lines, 8,237.00 and R1 = 0, which is the worked example of Concept 4. Three agreeing tools prove the computation; the golden answer, the question card and the caveats are what cover the rest.",
          ar: "المطابقة تقارن الأدوات لا البيانات، فكل ما تتشاركه الأدوات الثلاث غير مرئي لها. خطأ الكمية يجتاز كل قاعدة ويترك الثلاث عند 748 سطرًا و8,305.00: ولا يراه إلا جواب مرجعي. والسعر 45.0 تحت العتبة المختارة بالنظر 50، فتقبله الثلاث وتتفق على إيراد يزيد 33.00. والفترة ليست في الجدول أصلًا: فهي سؤال نطاق مكانه بطاقة السؤال، و«شهر واحد فقط» أول تحفّظ في الموجز. و«المبيعات ليست الطلب» ليس رقمًا تحسبه أي أداة — فالملف يسجّل ما اشتُري، والصنف الذي ينتهي عند 12:30 يبدو تمامًا كصنف لم يرغبه أحد. والثلاثة الأخرى تظهر كلها صفًّا مختلفًا: فالأداة التي تعدّ الأسطر لكل ساعة تبلّغ 13:00 فيختلف عمود أكثر ساعة ازدحامًا؛ وعمود Excel بـTRIM وحدها يصدّر 19 تهجئة مختلفة فيقرأ حقل <code>items</code> القيمة 19 بدل 16؛ وفهرسٌ قبل Remove Duplicates يعطي 764 سطرًا و8,237.00 وR1 = 0، وهذا هو المثال المشروح في المفهوم 4. فالأدوات الثلاث المتفقة تُثبت الحساب؛ والجواب المرجعي وبطاقة السؤال والتحفّظات هي ما يغطّي الباقي."
        }
      },

      /* ---------------------------------------------------------- 21 */
      {
        id: "p1cx21",
        type: "multi",
        level: "hard",
        topics: ["p1-rerun-next-month", "p1-caveats", "p1-tool-costs"],
        q: {
          en: "Lesson 6 closes each thread of the chapter a little further and says honestly what stays open. Which of these describe something that is <em>still open</em> after the script, the golden answer and the reconciliation table? (Choose all that apply.)",
          ar: "يغلق الدرس 6 كل خيط في الفصل إغلاقًا أبعد قليلًا، ويقول بأمانة ما يبقى مفتوحًا. أيّ هذه العبارات تصف شيئًا <em>ما زال مفتوحًا</em> بعد السكربت والجواب المرجعي وجدول المطابقة؟ (اختر كل ما ينطبق.)"
        },
        options: [
          {
            en: "The Excel and the Power BI rows of the reconciliation are still read off two screens and typed in by a human.",
            ar: "صفّا Excel وPower BI في المطابقة ما زالا يُقرآن من شاشتين ويُكتبان بيد إنسان."
          },
          {
            en: "The golden answer belongs to a period, so it has to be recomputed, reviewed and dated every month, and the old rows kept.",
            ar: "الجواب المرجعي ينتمي إلى فترة، فلا بدّ من إعادة حسابه ومراجعته وتأريخه كل شهر، وحفظ الصفوف القديمة."
          },
          {
            en: "The price limit of 50 and «Title Case» are judgements of somebody who looked at this one file; R4 even renames 76 correct <code>Water 500ml</code> lines.",
            ar: "حدّ السعر 50 و«حالة العنوان» حكمان لشخص نظر في هذا الملف وحده؛ وR4 تعيد تسمية 76 سطرًا صحيحًا من <code>Water 500ml</code>."
          },
          {
            en: "Nothing here watches the data between runs, so a change is only seen when somebody runs the script.",
            ar: "لا شيء هنا يراقب البيانات بين تشغيلين، فلا يُرى التغيّر إلا حين يشغّل أحد السكربت."
          },
          {
            en: "The cleaning rules live only inside the notebook, so the Excel and Power Query versions were written from memory.",
            ar: "قواعد التنظيف تعيش داخل الدفتر وحده، فكُتبت نسختا Excel وPower Query من الذاكرة."
          },
          {
            en: "Nothing records how many lines each rule removed, so a tool cannot be audited rule by rule.",
            ar: "لا شيء يسجّل عدد الأسطر التي حذفتها كل قاعدة، فلا يمكن تدقيق أداة قاعدةً بقاعدة."
          },
          {
            en: "The busiest hour is reported by <code>idxmax()</code>, so a tie between two hours is still hidden from the reader.",
            ar: "تُبلَّغ أكثر ساعة ازدحامًا بـ<code>idxmax()</code>، فيبقى التعادل بين ساعتين مخفيًّا عن القارئ."
          }
        ],
        answer: [0, 1, 2, 3],
        hint: {
          en: "Three of the seven are gaps the lesson closed, each with a named piece of work. Find those three first.",
          ar: "ثلاث من السبع فجوات أغلقها الدرس، ولكلٍّ منها عمل مسمّى. اعثر على هذه الثلاث أولًا."
        },
        explain: {
          en: "Still open, one per thread. P-QUESTION: the comparison is only as good as its weakest row, and two of the three rows arrive through a human reading a card and a cell — which cannot be removed without exporting from both tools. P-REPRO: the rules, the measures, the grain and the tolerance are the invariants that travel from month to month, but the golden answer is per period, so «no reviewed answer for October» must stop the run rather than be patched by editing a constant. P-CLEAN: the thresholds are still eyeballed, and R4 is a known fragility with a known fix (the menu lookup of Exercise 6.3). And nothing in the chapter watches the data over time: scheduling, monitoring and alerting come with the dashboard and time-series chapters. The other three are exactly what this lesson closed: R1–R5 are written once, outside all three tools, with a reason and a count each; <code>clean()</code> returns the log, which is what makes «R1 removed 0 not 16» possible; and <code>check()</code> asserts that the busiest hour is not a tie, because <code>idxmax()</code> on the raw hours would have returned 12 without mentioning the 119 beside it. Read a «still open» line as a promise about the next chapter, not as a defect to patch with a clever hack today.",
          ar: "ما زال مفتوحًا، واحدٌ لكل خيط. P-QUESTION: المقارنة ليست أفضل من أضعف صفّ فيها، وصفّان من الثلاثة يصلان عبر إنسان يقرأ بطاقة وخلية — ولا يُزال ذلك إلا بالتصدير من الأداتين. P-REPRO: القواعد والمقاييس والحبيبة وحدّ التسامح هي الثوابت التي تسافر من شهر إلى شهر، أمّا الجواب المرجعي فلكل فترة، فيجب أن توقف رسالة «لا جواب مراجَع لتشرين الأول» التشغيل بدل أن تُرقَّع بتعديل ثابت. P-CLEAN: العتبات ما زالت مختارة بالنظر، وR4 هشاشة معروفة لها إصلاح معروف (بحث القائمة في التمرين 6.3). ولا شيء في الفصل يراقب البيانات على مدى الزمن: فالجدولة والمراقبة والتنبيه تأتي مع فصلي لوحات المتابعة والسلاسل الزمنية. والثلاثة الأخرى هي بالضبط ما أغلقه هذا الدرس: فالقواعد R1–R5 مكتوبة مرة واحدة خارج الأدوات الثلاث، لكلٍّ منها سبب وعدد؛ و<code>clean()</code> تعيد السجل، وهو ما يجعل «R1 removed 0 not 16» ممكنة؛ و<code>check()</code> تؤكّد أن أكثر ساعة ازدحامًا ليست تعادلًا، لأن <code>idxmax()</code> على الساعات الخام كان سيعيد 12 دون أن يذكر 119 التي بجانبها. اقرأ سطر «ما زال مفتوحًا» وعدًا بالفصل التالي لا عيبًا يُرقَّع اليوم بحيلة ذكية."
        }
      },

      /* ---------------------------------------------------------- 22 */
      {
        id: "p1cx22",
        type: "tf",
        level: "hard",
        topics: ["p1-rule-order", "p1-rules-as-data", "p1-per-rule-audit"],
        q: {
          en: "Running R1, R2 and R3 in three different orders on September's file gives 748 lines, 8,062.00 and the same log <code>{'R1': 16, 'R2': 5, 'R3': 2}</code> every time. True or false: that proves the log is order-independent, because each of the three rules selects rows by a condition on that row alone.",
          ar: "تشغيل R1 وR2 وR3 بثلاثة ترتيبات مختلفة على ملف أيلول يعطي 748 سطرًا و8,062.00 والسجل نفسه <code>{'R1': 16, 'R2': 5, 'R3': 2}</code> في كل مرة. صح أم خطأ: هذا يُثبت أن السجل لا يتوقف على الترتيب، لأن كل قاعدة من الثلاث تختار الصفوف بشرط على الصف وحده."
        },
        truth: false,
        hint: {
          en: "Ask what would have to be true of the data for one line to be removable by two different rules, and then whether this file happens to contain such a line.",
          ar: "اسأل: ما الذي يجب أن يصحّ في البيانات ليكون سطر واحد قابلًا للحذف بقاعدتين مختلفتين؟ ثم: هل يحوي هذا الملف مثل هذا السطر؟"
        },
        explain: {
          en: "False — and the distinction is the point. The three identical logs are a measurement on this file, not a theorem about these rules. Row-wise conditions make the surviving <em>set</em> independent of the order, which is why the total is 748 and 8,062.00 whatever you do; they do not make the <em>attribution</em> independent, because a line that two rules would both remove is credited to whichever rule ran first. September happens to contain no such line: none of the 16 duplicated lines is a refund or badly priced. Add one — append a second copy of a refund line — and R1 first reports <code>{'R1': 17, 'R2': 5, 'R3': 2}</code> while R2 first reports <code>{'R1': 16, 'R2': 6, 'R3': 2}</code>, both ending at 748 lines and 8,062.00. So the totals are robust and the diagnostics are not, which is exactly why the agreed order is written on the card beside the rules: the per-rule counts are what you hold three tools to, and a number you compare across tools must mean the same thing in each.",
          ar: "خطأ — والتفريق هو المقصود. فالسجلّات الثلاثة المتطابقة قياسٌ على هذا الملف لا نظريةٌ عن هذه القواعد. الشروط على الصف الواحد تجعل <em>مجموعة</em> الناجين مستقلة عن الترتيب، ولهذا يكون المجموع 748 و8,062.00 مهما فعلت؛ لكنها لا تجعل <em>النسبة</em> مستقلة، لأن السطر الذي تحذفه قاعدتان يُنسَب إلى القاعدة التي عملت أولًا. وأيلول لا يحوي مثل هذا السطر: فلا واحد من الأسطر الستة عشر المكرّرة مرتجعٌ ولا سيّئ السعر. أضف واحدًا — ألحِق نسخة ثانية من سطر مرتجَع — فتبلّغ R1 أولًا <code>{'R1': 17, 'R2': 5, 'R3': 2}</code> وتبلّغ R2 أولًا <code>{'R1': 16, 'R2': 6, 'R3': 2}</code>، وينتهي كلاهما عند 748 سطرًا و8,062.00. فالمجاميع صامدة والتشخيصات ليست كذلك، ولهذا بالضبط يُكتب الترتيب المتّفق عليه في البطاقة بجانب القواعد: فأعداد القواعد هي ما تُحاسِب به ثلاث أدوات، والرقم الذي تقارنه بين أدوات يجب أن يعني الشيء نفسه في كلٍّ منها."
        }
      },

      /* ---------------------------------------------------------- 23 */
      {
        id: "p1cx23",
        type: "mcq",
        level: "hard",
        topics: ["p1-dax-measures", "p1-pbi-pitfalls", "p1-three-counts"],
        q: {
          en: "A Power BI table has <code>customer_type</code> in Rows and the measure <code>Orders Count = DISTINCTCOUNT(Orders[order_id])</code> in Values. It shows Student 448, Staff 154, Visitor 75 — and the card beside it says 611, while 448 + 154 + 75 = 677. Nothing is filtered and no relationship is involved. What is the right move?",
          ar: "في جدول Power BI حقل <code>customer_type</code> في الصفوف والمقياس <code>Orders Count = DISTINCTCOUNT(Orders[order_id])</code> في القيم. يُظهر طالب 448 وموظف 154 وزائر 75 — والبطاقة بجانبه تقول 611، و448 + 154 + 75 = 677. ولا ترشيح ولا علاقة في الأمر. ما الخطوة الصحيحة؟"
        },
        options: [
          {
            en: "Set the relationship between Orders and Menu to a <em>Both</em> cross filter direction, so that the filter reaches every row and the parts add up to the whole.",
            ar: "اضبط العلاقة بين Orders وMenu على اتجاه ترشيح <em>Both</em>، فيصل المرشِّح إلى كل صف وتجمع الأجزاء الكل."
          },
          {
            en: "Report the three figures without a total, and ask the cafeteria whether a customer type belongs to an order or to a line: 66 of the 611 orders have lines with two different types, so the same order is counted under two of them. A distinct count of a key does not add up across a grouping when the key can appear in more than one group.",
            ar: "اعرض الأرقام الثلاثة دون مجموع، واسأل الكافتيريا: هل نوع العميل خصيصةُ طلب أم خصيصةُ سطر؟ فستة وستون من الطلبات 611 فيها أسطر بنوعين مختلفين، فيُعدّ الطلب نفسه تحت اثنين منهما. والعدّ المميّز لمفتاح لا يجمع عبر تصنيف إذا جاز أن يظهر المفتاح في أكثر من مجموعة."
          },
          {
            en: "Replace <code>DISTINCTCOUNT</code> with <code>COUNTROWS(Orders)</code>, which makes the three figures add up to the grand total exactly.",
            ar: "استبدل <code>DISTINCTCOUNT</code> بـ<code>COUNTROWS(Orders)</code>، فتجمع الأرقام الثلاثة الإجماليَّ بالضبط."
          },
          {
            en: "Scale each figure by 611 / 677 so that the three parts sum to 611, and note the factor under the table.",
            ar: "اضرب كل رقم في 611 / 677 لتجمع الأجزاء الثلاثة 611، واذكر المعامل أسفل الجدول."
          }
        ],
        answer: 1,
        hint: {
          en: "The card and the rows use the same measure on the same table, so neither is miscomputed. Ask what one order can belong to.",
          ar: "البطاقة والصفوف تستعملان المقياس نفسه على الجدول نفسه، فلا أحدهما محسوب خطأً. اسأل: إلى كم شيء يمكن أن ينتمي الطلب الواحد؟"
        },
        explain: {
          en: "Both numbers are right, and that is the finding. A measure is exact about its filter context: in the Student cell it counts the distinct orders that have at least one Student line, and an order with one Student line and one Staff line satisfies two cells, so it is counted twice. 66 of the 611 orders are like that. The honest report is the three figures with no total row, plus the question for the data owner — can one order carry two customer types? — because that is a question about the business, not about DAX. The cross filter direction has nothing to do with it: no relationship is involved, and switching a direction to Both to make a number look tidy is how ambiguous models are born. <code>COUNTROWS</code> is the tempting fix because the parts really would add up — to 748, the number of lines, which answers a different question and re-introduces the grain mistake the chapter spent six lessons on. And scaling by 611 / 677 invents a number no tool computed, which is the averaging mistake of Concept 4 wearing a percentage.",
          ar: "الرقمان صحيحان، وهذا هو الاكتشاف. فالمقياس دقيق في سياق مرشِّحه: في خلية «طالب» يعدّ الطلبات المختلفة التي فيها سطر طالب واحد على الأقل، والطلب الذي فيه سطر طالب وسطر موظف يستوفي خليتين فيُعدّ مرتين. وستة وستون من الطلبات 611 كذلك. والتقرير الأمين هو الأرقام الثلاثة بلا صفّ مجموع، مع السؤال لصاحب البيانات — هل يجوز أن يحمل الطلب الواحد نوعي عملاء؟ — لأن هذا سؤال عن العمل لا عن DAX. واتجاه الترشيح لا علاقة له بالأمر: فلا علاقة في المسألة، وتحويل الاتجاه إلى Both لتبدو الأرقام أنيقة هو كيف تُولَد النماذج الغامضة. و<code>COUNTROWS</code> هو الإصلاح المغري لأن الأجزاء ستجمع فعلًا — ستجمع 748، أي عدد الأسطر، وهذا يجيب عن سؤال آخر ويعيد خطأ الحبيبة الذي أنفق الفصل ستة دروس عليه. والضرب في 611 / 677 يخترع رقمًا لم تحسبه أي أداة، وهو خطأ المتوسطات في المفهوم 4 بثوب نسبة مئوية."
        }
      },

      /* ---------------------------------------------------------- 24 */
      {
        id: "p1cx24",
        type: "mcq",
        level: "hard",
        topics: ["p1-reconciliation", "p1-tolerance", "p1-diagnose-mismatch"],
        q: {
          en: "Your reconciliation prints RECONCILED. The pandas row came from <code>answer(*clean(raw))</code>; the Excel and the Power BI rows were typed into a dict by you, from a card and a PivotTable, at ten to five. Lesson 6 calls that the weakest link in the chain. Which change does most to reduce the risk that the table says RECONCILED while a tool is wrong?",
          ar: "تطبع مطابقتك RECONCILED. صفّ pandas جاء من <code>answer(*clean(raw))</code>؛ وصفّا Excel وPower BI كتبتهما بنفسك في قاموس، من بطاقة ومن جدول محوري، في الخامسة إلّا عشرًا. ويسمّي الدرس 6 ذلك أضعف حلقة في السلسلة. أيّ تغيير يقلّل أكثر من خطر أن يقول الجدول RECONCILED وأداةٌ مخطئة؟"
        },
        options: [
          {
            en: "Have each tool produce its own row — a PivotTable copied out as a CSV, a Power BI table exported — and read those rows into the comparison; whatever must still be typed, write down from the screen in the same session, never from yesterday's memory.",
            ar: "اجعل كل أداة تُنتج صفّها — جدول محوري يُنسَخ ملفَّ CSV، وجدول Power BI يُصدَّر — واقرأ هذه الصفوف في المقارنة؛ وما يبقى لا بدّ من كتابته، اكتبه من الشاشة في الجلسة نفسها، لا من ذاكرة الأمس."
          },
          {
            en: "Use the pandas row for the two tools you cannot export, so that all three rows go through the same code path and no typing is involved at all.",
            ar: "استعمل صفّ pandas للأداتين التي لا تستطيع تصديرهما، فتمرّ الصفوف الثلاثة بالمسار البرمجي نفسه ولا كتابة بالمرّة."
          },
          {
            en: "Widen the tolerance to 0.5 so that a small typing slip in the last digits cannot raise a false alarm and get the check switched off.",
            ar: "وسّع حدّ التسامح إلى 0.5 فلا ترفع زلّةُ كتابة صغيرة في الأرقام الأخيرة إنذارًا كاذبًا يُطفأ الفحص بسببه."
          },
          {
            en: "Compare only the three numbers the manager asked for — the top three, the busiest hour and the revenue — since the other five fields are what a tired reader gets wrong.",
            ar: "قارن الأرقام الثلاثة التي طلبها المدير فقط — الثلاثة الأوائل وأكثر ساعة ازدحامًا والإيراد — فالحقول الخمسة الأخرى هي ما يخطئ فيه القارئ المتعب."
          }
        ],
        answer: 0,
        hint: {
          en: "Three of the four make the check pass more often. Ask which one makes it able to fail for the right reason.",
          ar: "ثلاثة من الأربعة تجعل الفحص ينجح أكثر. اسأل: أيّها يجعله قادرًا على الفشل للسبب الصحيح؟"
        },
        explain: {
          en: "The risk is a row that is not independent evidence. Making each tool emit its own row keeps the three routes independent, which is the whole premise of a reconciliation: a number computed twice by different means, not once and copied. Where an export is impossible, the discipline is the small one the lesson states — write it down from the screen in the same session — because a row reconstructed from memory agrees with whatever you remember. Option two is the rubber stamp: <code>dict(good)</code> pretending to be Excel's row is the same defect as a golden answer computed from the run, and it guarantees RECONCILED. Widening the tolerance to 0.5 moves the goalposts: 0.005 is half the smallest unit of money in the data, chosen so that a difference you could never print is forgiven and one piastre is not, and 0.5 would forgive a real error. And dropping five fields is backwards: <code>items</code> and <code>blank_payment</code> were added precisely because R4 and R5 move no headline number at all, so a tool that skipped them passes a three-field check with every number the manager asked for correct.",
          ar: "الخطر صفٌّ ليس دليلًا مستقلًّا. وجَعل كل أداة تُصدر صفّها يُبقي الطرق الثلاث مستقلة، وهذا هو فرض المطابقة كله: رقمٌ حُسب مرتين بطريقين مختلفين، لا مرة واحدة ونُسخ. وحيث يتعذّر التصدير يكون الانضباط هو الصغير الذي يذكره الدرس — اكتبه من الشاشة في الجلسة نفسها — لأن الصفّ المعاد بناؤه من الذاكرة يوافق ما تتذكّره أنت. والخيار الثاني ختم مطاطي: فـ<code>dict(good)</code> يتنكّر صفَّ Excel هو العيب نفسه الذي في جواب مرجعي يحسبه التشغيل، ويضمن RECONCILED. وتوسيع التسامح إلى 0.5 نقلٌ للأهداف: فـ0.005 نصف أصغر وحدة مال في البيانات، اختيرت ليُغفَر فرقٌ لا تستطيع طبعه ولا يُغفَر قرش واحد، و0.5 ستغفر خطأً حقيقيًّا. وحذف خمسة حقول عكسُ الصواب: فقد أُضيف <code>items</code> و<code>blank_payment</code> تحديدًا لأن R4 وR5 لا تحرّكان أي رقم رئيسي، فالأداة التي تخطّتهما تجتاز فحصًا من ثلاثة حقول وكل رقم طلبه المدير صحيح."
        }
      }

    ]
  };
})();
