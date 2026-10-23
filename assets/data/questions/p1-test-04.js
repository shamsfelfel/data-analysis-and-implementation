/* Practical Chapter 1 - Lesson test 4: Excel as an Analysis Tool.
   24 questions: p1l4q01 ... p1l4q24. Topics: assets/data/topics/p1-l4.js
   Excel cannot be run in the build, so every value asserted here was recomputed with pandas
   on downloads/p1/cafeteria_orders.csv (scratch: .tmp/p1-test-04/). */
window.DABanks = window.DABanks || {};
(function () {
  /* code(line, line, ...) -> one string with \n between lines */
  function code() { return Array.prototype.join.call(arguments, "\n"); }

  /* pieces of the write-question regexes: a [@column] reference in any of its spellings */
  var P_PRICE = "(?:\\[@unit_price\\]|\\[@\\[unit_price\\]\\]|tblOrders\\[\\[#This Row\\],\\s*\\[unit_price\\]\\])";
  var P_QTY = "(?:\\[@qty\\]|\\[@\\[qty\\]\\]|tblOrders\\[\\[#This Row\\],\\s*\\[qty\\]\\])";

  window.DABanks["p1-test-04"] = {
    title: {
      en: "Test 4 — Excel as an Analysis Tool",
      ar: "اختبار 4 — إكسل أداةً للتحليل"
    },
    intro: {
      en: "24 questions on the whole lesson: the two doors into a workbook, Tables and structured references, types and Excel’s silent conversions, serial dates, TRIM and VALUE, the duplicate flag and the helper columns, SUMIFS and the lookups, absolute references, PivotTables (revenue by item, orders by hour, their caveats), the habits that corrupt an analysis, auditing, and when to leave Excel. Allow about 40 minutes. You do not need Excel: every value you are asked for can be worked out from the cells and formulas shown, and every figure quoted from the cafeteria file (8,062.00, 771 lines, 616 orders …) was recomputed with pandas on the real data. The hint, the answer and the explanation stay hidden until you ask for them: try first, then open them. A revealed answer is not counted, and the Review links under each question lead back to the part of the lesson it tests.",
      ar: "24 سؤالًا على الدرس كله: بابا الدخول إلى المصنّف، والجداول والمراجع المُهيكلة، والأنواع وتحويلات إكسل الصامتة، والتواريخ التسلسلية، وTRIM وVALUE، وعلامة التكرار والأعمدة المساعدة، وSUMIFS وصيغ البحث، والمراجع المطلقة، والجداول المحورية (الإيراد حسب الصنف والطلبات حسب الساعة ومحاذيرها)، والعادات التي تُفسد التحليل، والتدقيق، ومتى يُترك إكسل. خصّص نحو 40 دقيقة. لا تحتاج إلى إكسل: كل قيمة مطلوبة منك يمكن استخراجها من الخلايا والصيغ المعروضة، وكل رقم مقتبس من ملف الكافتيريا (8,062.00 و771 بندًا و616 طلبًا …) أُعيد حسابه بـ pandas على البيانات الحقيقية. التلميح والجواب والشرح مخفية حتى تطلبها: جرّب أولًا ثم افتحها. والجواب الذي يُظهَر لا يُحتسب، وروابط المراجعة تحت كل سؤال تعيدك إلى الجزء من الدرس الذي يختبره."
    },
    questions: [

      /* ---------------------------------------------------------- 01 */
      {
        id: "p1l4q01", type: "tf", level: "easy",
        topics: ["p1-xl-doors"],
        q: {
          en: "Double-clicking <code>cafeteria_orders.csv</code> and opening <code>cafeteria_orders.xlsx</code> give two different pictures of the data: because the workbook stores the type of every cell, the text price <code>n/a</code> on row 6 is already gone when you open the .xlsx. True or false?",
          ar: "النقر المزدوج على <code>cafeteria_orders.csv</code> وفتح <code>cafeteria_orders.xlsx</code> يعطيان صورتين مختلفتين للبيانات: فلأن المصنّف يخزّن نوع كل خلية، يكون السعر النصي <code>n/a</code> في الصف 6 قد اختفى أصلًا حين تفتح ملف .xlsx. صح أم خطأ؟"
        },
        truth: false,
        hint: {
          en: "Where does <code>n/a</code> live: in the way Excel reads the file, or in the data itself?",
          ar: "أين يعيش <code>n/a</code>؟ في طريقة قراءة إكسل للملف أم في البيانات نفسها؟"
        },
        explain: {
          en: "False. The two doors differ in what Excel does on the way in: a double-click guesses each cell’s type from your regional settings, while the .xlsx keeps the stored types and both Tables arrive intact. Neither door changes the data. The text <code>n/a</code> in the price column and the 17 blank payments are in the file, so they are still there whichever door you use. The tempting idea is that a file that remembers types is a clean file, but a type says how a value is stored, not whether it is right. A better door never replaces the first look at the sheet: 771 lines, 616 orders, what is blank, what repeats.",
          ar: "خطأ. يختلف البابان فيما يفعله إكسل عند الإدخال: النقر المزدوج يخمّن نوع كل خلية من إعداداتك الإقليمية، بينما يُبقي ملف .xlsx الأنواع المخزّنة فيصل الجدولان سليمين. لكن أيًّا من البابين لا يغيّر البيانات. فالنص <code>n/a</code> في عمود الأسعار وطرائق الدفع الفارغة الـ 17 موجودة في الملف نفسه، فتبقى أيًّا كان الباب. والفكرة المغرية أن الملف الذي يتذكّر الأنواع ملف نظيف، لكن النوع يصف طريقة تخزين القيمة لا صحتها. ولا يغني باب أفضل عن النظرة الأولى على الورقة: 771 بندًا و616 طلبًا، وما الفارغ، وما المتكرر."
        }
      },

      /* ---------------------------------------------------------- 02 */
      {
        id: "p1l4q02", type: "contrast", level: "easy",
        topics: ["p1-xl-tables", "p1-xl-structured-refs", "p1-xl-cell-types"],
        q: {
          en: "Place each statement under a plain range of cells, under an Excel Table, or under both.",
          ar: "ضع كل عبارة تحت النطاق العادي من الخلايا أو تحت جدول إكسل (Table) أو تحت كليهما."
        },
        concepts: [
          { en: "Plain range", ar: "نطاق عادي" },
          { en: "Excel Table", ar: "جدول إكسل (Table)" }
        ],
        rows: [
          {
            s: {
              en: "A total such as <code>=SUM(Orders!E2:E772)</code> keeps ending at row 772 after the cashier pastes three lines under the last row",
              ar: "إجمالي مثل <code>=SUM(Orders!E2:E772)</code> يظل منتهيًا عند الصف 772 بعد أن يلصق أمين الصندوق ثلاثة بنود تحت آخر صف"
            },
            a: 0
          },
          {
            s: {
              en: "A formula can point at a column by name, such as <code>tblOrders[qty]</code>, and the pointer survives a renamed header",
              ar: "تستطيع الصيغة أن تشير إلى عمود باسمه، مثل <code>tblOrders[qty]</code>، ويصمد المؤشر أمام تغيير اسم الترويسة"
            },
            a: 1
          },
          {
            s: {
              en: "A formula typed once in a new column fills itself down, and again for every future row",
              ar: "الصيغة التي تُكتب مرة واحدة في عمود جديد تملأ نفسها نزولًا، وتملأ نفسها من جديد لكل صف مستقبلي"
            },
            a: 1
          },
          {
            s: {
              en: "Sorting a single selected column on its own can tear the rows apart (Excel warns you)",
              ar: "فرز عمود واحد محدَّد وحده قد يمزّق الصفوف (ويحذّرك إكسل)"
            },
            a: 0
          },
          {
            s: {
              en: "Can be filtered with the header buttons (Data → Filter)",
              ar: "يمكن تصفيته بأزرار الترويسة (Data → Filter)"
            },
            a: 2
          },
          {
            s: {
              en: "A PivotTable built on it includes the rows added below it, after a Refresh",
              ar: "الجدول المحوري المبني عليه يشمل الصفوف المضافة تحته، بعد التحديث (Refresh)"
            },
            a: 1
          },
          {
            s: {
              en: "A price pasted as the text <code>12 NIS</code> is still skipped by SUM, without any error",
              ar: "السعر الملصوق نصًّا <code>12 NIS</code> ما زالت SUM تتخطاه دون أي خطأ"
            },
            a: 2
          }
        ],
        hint: {
          en: "Separate what a Table declares (a name, a header, growth) from what is true of any cells, whatever block they sit in.",
          ar: "افصل ما يعلنه الجدول (اسم وترويسة ونمو) عمّا يصدق على أي خلايا مهما كانت الكتلة التي تقع فيها."
        },
        explain: {
          en: "A plain range is just cells that happen to hold data: a formula carries the corners of the rectangle (E2:E772) and knows nothing else, so pasted rows fall outside it and a lone sorted column can be torn away from its row. A Table is a declaration: the block has a name, a header row and a size that grows, so structured references, calculated columns and PivotTables follow it. Both can be filtered, and neither changes what a cell holds: a text price is text in a range and in a Table, and SUM skips it quietly in both. A Table gives structure, not clean data.",
          ar: "النطاق العادي مجرد خلايا تحمل بيانات: تحمل الصيغة زوايا المستطيل (E2:E772) ولا تعرف شيئًا غيرها، فتقع الصفوف الملصوقة خارجه وقد يُفصل عمود مفرد مفروز عن صفه. أما الجدول فإعلان: للكتلة اسم وصف ترويسة وحجم ينمو، فتتبعه المراجع المُهيكلة والأعمدة المحسوبة والجداول المحورية. ويمكن تصفية كليهما، ولا يغيّر أي منهما ما تحمله الخلية: السعر النصي نص في النطاق وفي الجدول، وتتخطاه SUM بهدوء في الحالتين. فالجدول يمنح بنية لا بيانات نظيفة."
        }
      },

      /* ---------------------------------------------------------- 03 */
      {
        id: "p1l4q03", type: "output", level: "easy",
        topics: ["p1-xl-cell-types"],
        lang: "text",
        q: {
          en: "Cells <code>B2:B7</code> of a scratch sheet hold, from top to bottom: the number 12, the number 9, the text <code>12 NIS</code>, the text <code>n/a</code>, an empty cell and the number 3. Type the value each formula returns (for an error, type its name).",
          ar: "تحوي الخلايا <code>B2:B7</code> في ورقة تجريبية، من الأعلى إلى الأسفل: الرقم 12، والرقم 9، والنص <code>12 NIS</code>، والنص <code>n/a</code>، وخلية فارغة، والرقم 3. اكتب القيمة التي تُعيدها كل صيغة (وإن كانت خطأً فاكتب اسمه)."
        },
        code: code(
          "      B",
          " 2    12",
          " 3    9",
          " 4    12 NIS        (text)",
          " 5    n/a           (text)",
          " 6                  (empty)",
          " 7    3"
        ),
        blanks: [
          { accept: ["3"], label: { en: "<code>=COUNT(B2:B7)</code>", ar: "<code>=COUNT(B2:B7)</code>" } },
          { accept: ["5"], label: { en: "<code>=COUNTA(B2:B7)</code>", ar: "<code>=COUNTA(B2:B7)</code>" } },
          { accept: ["24"], label: { en: "<code>=SUM(B2:B7)</code>", ar: "<code>=SUM(B2:B7)</code>" } },
          { accept: ["#VALUE!", "#value!", "#Value!", "#VALUE", "#value", "#Value"], label: { en: "<code>=B2*B5</code>", ar: "<code>=B2*B5</code>" } }
        ],
        hint: {
          en: "COUNT counts only numbers; COUNTA counts everything that is not empty. And a function and an operator treat text differently.",
          ar: "تعدّ COUNT الأرقام فقط، وتعدّ COUNTA كل ما ليس فارغًا. والدالة والمعامل يعاملان النص بطريقتين مختلفتين."
        },
        explain: {
          en: "COUNT sees three numbers (12, 9 and 3) and COUNTA five non-empty cells (the two texts count), so their difference, 2, is the number of cells that are non-empty but not numbers. SUM adds the numbers and skips the text without a word: 12 + 9 + 3 = 24, with no hint that <code>12 NIS</code> was left out. The operator is stricter: <code>=B2*B5</code> multiplies 12 by the text <code>n/a</code> and returns <code>#VALUE!</code>. This is the cafeteria price column in miniature (COUNT 770, COUNTA 771, SUM 5,120 and #VALUE! on row 6): functions fail silently, operators fail loudly, and COUNTA minus COUNT is the cheap audit.",
          ar: "ترى COUNT ثلاثة أرقام (12 و9 و3) وترى COUNTA خمس خلايا غير فارغة (النصان يُعدّان)، فالفرق بينهما، 2، هو عدد الخلايا غير الفارغة وليست أرقامًا. وتجمع SUM الأرقام وتتخطى النص دون كلمة: 12 + 9 + 3 = 24، بلا أي تلميح إلى أن <code>12 NIS</code> تُركت. أما المعامل فأشد: <code>=B2*B5</code> يضرب 12 في النص <code>n/a</code> فيُعيد <code>#VALUE!</code>. وهذا عمود أسعار الكافتيريا مصغّرًا (COUNT تعطي 770 وCOUNTA 771 وSUM 5,120 و#VALUE! في الصف 6): الدوال تفشل بصمت والمعاملات تفشل بصوت عالٍ، والفرق COUNTA − COUNT فحص رخيص."
        }
      },

      /* ---------------------------------------------------------- 04 */
      {
        id: "p1l4q04", type: "fill", level: "easy",
        topics: ["p1-xl-serial-dates"],
        lang: "excel",
        q: {
          en: "Cell <code>A2</code> holds an order’s date-time as Excel stores it: the number <code>46266.75</code>, shown as 2026-09-01 18:00 by its format. Fill in the three function names so that each cell returns what its comment says.",
          ar: "تحمل الخلية <code>A2</code> تاريخ ووقت طلب كما يخزّنه إكسل: الرقم <code>46266.75</code>، ويعرضه تنسيقها 2026-09-01 18:00. املأ أسماء الدوال الثلاث بحيث تُعيد كل خلية ما يقوله تعليقها."
        },
        code: code(
          "A2   46266.75                    // shown as 2026-09-01 18:00",
          "B2   =____1____(A2)              // 46266   the day number",
          "C2   =____2____(A2,1)            // 0.75    the time of day",
          "D2   =____3____(A2)              // 18      the hour"
        ),
        blanks: [
          { accept: ["INT", "int", "Int", "TRUNC", "trunc", "Trunc"] },
          { accept: ["MOD", "mod", "Mod"] },
          { accept: ["HOUR", "hour", "Hour"] }
        ],
        hint: {
          en: "A date-time is whole days plus a fraction of a day. Which function keeps the whole part, which keeps what is left after dividing by 1, and which reads the clock?",
          ar: "التاريخ والوقت أيام كاملة زائدًا كسر من يوم. أي دالة تُبقي الجزء الصحيح، وأيها تُبقي ما يتبقى بعد القسمة على 1، وأيها تقرأ الساعة؟"
        },
        explain: {
          en: "Excel stores 2026-09-01 18:00 as 46,266 whole days since 30 December 1899 plus 0.75 of a day (18 hours out of 24). <code>INT</code> keeps the whole part, <code>MOD(x,1)</code> keeps the remainder after dividing by 1, which is the time of day, and <code>HOUR</code> reads the clock hour, the key to “when are we busy?”. The format changes only the picture: the cell shows a date but holds a number, which is why the same cell formatted as General shows 46266.75. On row 2 of the real Table, the first order (13:43:29) is stored as 46266.5718634259 and HOUR returns 13.",
          ar: "يخزّن إكسل 2026-09-01 18:00 على أنه 46,266 يومًا كاملًا منذ 30 ديسمبر 1899 زائدًا 0.75 من اليوم (18 ساعة من 24). تُبقي <code>INT</code> الجزء الصحيح، وتُبقي <code>MOD(x,1)</code> الباقي بعد القسمة على 1 أي وقت اليوم، وتقرأ <code>HOUR</code> ساعة الساعة، وهي مفتاح «متى نزدحم؟». والتنسيق يغيّر الصورة فقط: تعرض الخلية تاريخًا وتحمل رقمًا، ولهذا تُظهر الخلية نفسها 46266.75 إذا نُسّقت General. وفي الصف 2 من الجدول الفعلي يُخزَّن أول طلب (13:43:29) بالقيمة 46266.5718634259 وتُعيد HOUR القيمة 13."
        }
      },

      /* ---------------------------------------------------------- 05 */
      {
        id: "p1l4q05", type: "multi", level: "medium",
        topics: ["p1-xl-silent-conversions", "p1-xl-text-repairs"],
        q: {
          en: "A voucher export is about to be pasted into Excel. Which of these statements are true? (Choose all that apply.)",
          ar: "يوشك تصدير قسائم أن يُلصق في إكسل. أيّ هذه العبارات صحيحة؟ (اختر كل ما ينطبق.)"
        },
        options: [
          {
            en: "Formatting the target column as Text before you paste prevents the conversion.",
            ar: "تنسيق العمود الهدف نصًّا (Text) قبل اللصق يمنع التحويل."
          },
          {
            en: "Once <code>007</code> has become the number 7, changing the cell’s format to Text brings <code>007</code> back.",
            ar: "بعد أن تتحول <code>007</code> إلى الرقم 7، يعيد تغيير تنسيق الخلية إلى Text القيمة <code>007</code>."
          },
          {
            en: "<code>=TRIM(x)</code> removes every kind of space, including the non-breaking space (<code>CHAR(160)</code>) that web pages add.",
            ar: "تحذف <code>=TRIM(x)</code> كل أنواع الفراغات، ومنها الفراغ غير القابل للكسر (<code>CHAR(160)</code>) الذي تضيفه صفحات الويب."
          },
          {
            en: "A price typed as <code>12 NIS</code> is stored as text: SUM skips it without an error, and <code>COUNTA - COUNT</code> over the column exposes it.",
            ar: "السعر المكتوب <code>12 NIS</code> يُخزَّن نصًّا: تتخطاه SUM دون خطأ، ويكشفه الفرق <code>COUNTA - COUNT</code> على العمود."
          },
          {
            en: "Formatting a text cell as Number turns the text <code>7.5</code> into a number.",
            ar: "تنسيق خلية نصية على أنها Number يحوّل النص <code>7.5</code> إلى رقم."
          },
          {
            en: "A 16-digit card number typed into a number cell keeps only 15 significant digits, so its last digit becomes 0.",
            ar: "رقم بطاقة من 16 رقمًا يُكتب في خلية رقمية لا يحتفظ إلا بـ 15 رقمًا معنويًّا، فيصبح رقمه الأخير 0."
          }
        ],
        answer: [0, 3, 5],
        hint: {
          en: "For each statement ask whether it changes what is stored in the cell or only how the cell looks.",
          ar: "لكل عبارة اسأل: هل تغيّر ما هو مخزّن في الخلية أم مظهر الخلية فقط؟"
        },
        explain: {
          en: "Three are true. Formatting the column as Text before pasting is the prevention that works, because the conversion happens at entry. A price such as 12 NIS is stored as text, so SUM skips it silently, and COUNTA minus COUNT counts what is non-empty but not a number. Excel keeps 15 significant digits, so the 16th digit of a card number becomes 0. The false ones: after 007 has become 7 the original text is gone and a Text format only shows the stored number (cure is impossible, as with SEPT2 turning into 2-Sep); TRIM removes ordinary spaces only, so a CHAR(160) needs <code>SUBSTITUTE</code> first; and a number format changes how a number looks, it never converts text, which stays text until it is re-entered.",
          ar: "ثلاث عبارات صحيحة. تنسيق العمود نصًّا قبل اللصق هو الوقاية التي تنفع، لأن التحويل يحدث عند الإدخال. والسعر مثل 12 NIS يُخزَّن نصًّا فتتخطاه SUM بصمت، ويعدّ الفرق COUNTA − COUNT ما هو غير فارغ وليس رقمًا. ويحتفظ إكسل بـ 15 رقمًا معنويًّا فيصبح الرقم الـ 16 من رقم البطاقة صفرًا. والعبارات الخاطئة: بعد أن تصبح 007 هي 7 يضيع النص الأصلي ولا يُظهر تنسيق Text إلا الرقم المخزّن (والعلاج مستحيل، كما في SEPT2 حين تصير 2-Sep)؛ وتزيل TRIM الفراغات العادية فقط، فيلزم أن يسبقها <code>SUBSTITUTE</code> في حالة CHAR(160)؛ وتنسيق الأرقام يغيّر مظهر الرقم ولا يحوّل نصًّا إلى رقم، فيبقى النص نصًّا حتى يُعاد إدخاله."
        }
      },

      /* ---------------------------------------------------------- 06 */
      {
        id: "p1l4q06", type: "output", level: "medium",
        topics: ["p1-xl-text-repairs"],
        lang: "excel",
        q: {
          en: "Two cells came from a web page. <code>A2</code> is the word Latte followed by a non-breaking space (<code>CHAR(160)</code>). <code>A3</code> is two spaces, <code>Iced</code>, three spaces, <code>Latte</code> and one space. Type the value of each formula.",
          ar: "جاءت خليتان من صفحة ويب. الخلية <code>A2</code> هي كلمة Latte يتبعها فراغ غير قابل للكسر (<code>CHAR(160)</code>). والخلية <code>A3</code> هي فراغان ثم <code>Iced</code> ثم ثلاثة فراغات ثم <code>Latte</code> ثم فراغ واحد. اكتب قيمة كل صيغة."
        },
        code: code(
          'A2  ="Latte"&CHAR(160)',
          'A3  ="  Iced   Latte "'
        ),
        blanks: [
          { accept: ["6"], label: { en: "<code>=LEN(TRIM(A2))</code>", ar: "<code>=LEN(TRIM(A2))</code>" } },
          { accept: ["5"], label: { en: "<code>=LEN(TRIM(SUBSTITUTE(A2,CHAR(160),\" \")))</code>", ar: "<code>=LEN(TRIM(SUBSTITUTE(A2,CHAR(160),\" \")))</code>" } },
          { accept: ["10"], label: { en: "<code>=LEN(TRIM(A3))</code>", ar: "<code>=LEN(TRIM(A3))</code>" } }
        ],
        hint: {
          en: "Count the characters of A2 before and after TRIM. Which kind of space does TRIM know about?",
          ar: "عُدّ محارف A2 قبل TRIM وبعدها. أيّ نوع من الفراغات تعرفه TRIM؟"
        },
        explain: {
          en: "TRIM removes ordinary spaces only: leading and trailing ones go, and runs inside are squeezed to one. It leaves <code>CHAR(160)</code> alone, so A2 is still 6 characters long after TRIM. The cell looks clean and still fails to match Latte in a lookup. Replacing <code>CHAR(160)</code> by a normal space first lets TRIM remove it, giving 5. For A3, 15 characters become 10: <code>Iced Latte</code> keeps its single inner space. Rule to carry away: when TRIM does not change the length, the culprit is not an ordinary space.",
          ar: "تزيل TRIM الفراغات العادية فقط: تذهب الأولى والأخيرة، وتُختزل المتتالية في الداخل إلى فراغ واحد. وهي تترك <code>CHAR(160)</code> كما هو، فتبقى A2 طولها 6 محارف بعد TRIM. تبدو الخلية نظيفة ومع ذلك لا تطابق Latte في البحث. وإذا استبدلنا <code>CHAR(160)</code> بفراغ عادي أولًا استطاعت TRIM إزالته فيصبح الطول 5. أما A3 فتتحول من 15 محرفًا إلى 10: تحتفظ <code>Iced Latte</code> بفراغها الداخلي الواحد. القاعدة التي تحملها معك: إذا لم تغيّر TRIM الطول فالمتهم ليس فراغًا عاديًّا."
        }
      },

      /* ---------------------------------------------------------- 07 */
      {
        id: "p1l4q07", type: "mcq", level: "medium",
        topics: ["p1-xl-conditional-format", "p1-xl-duplicates"],
        q: {
          en: "The manager wants the 16 repeated lines to stand out, and you also want to count them with a formula. Which plan works?",
          ar: "يريد المدير أن تبرز البنود المكررة الـ 16، وتريد أنت أيضًا أن تعدّها بصيغة. أي خطة تنجح؟"
        },
        options: [
          {
            en: "Select the <code>order_id</code> column, apply Duplicate Values, and take the coloured cells as the repeated lines.",
            ar: "حدّد عمود <code>order_id</code> وطبّق Duplicate Values، واعتبر الخلايا الملوّنة هي البنود المكررة."
          },
          {
            en: "Select <code>A2:H772</code> and apply Duplicate Values once, so that Excel compares the eight cells of each row with the rows above it.",
            ar: "حدّد <code>A2:H772</code> وطبّق Duplicate Values مرة واحدة، فيقارن إكسل الخلايا الثماني في كل صف بالصفوف التي فوقه."
          },
          {
            en: "Build the running-count flag <code>dup_n</code> in a helper column, count and filter on it, and, if you like, add a rule such as <code>=$L2&gt;1</code> only to paint the rows.",
            ar: "ابنِ علامة العدّ التراكمي <code>dup_n</code> في عمود مساعد، وعُدّ وصفِّ بحسبها، وأضف إن شئت قاعدة مثل <code>=$L2&gt;1</code> لتلوين الصفوف فقط."
          },
          {
            en: "Paint the 16 rows yellow by hand and count the yellow rows with a formula, filtering by colour whenever the number is needed.",
            ar: "لوّن الصفوف الـ 16 بالأصفر يدويًّا وعدّ الصفوف الصفراء بصيغة، وصفِّ بحسب اللون كلما احتجت إلى الرقم."
          }
        ],
        answer: 2,
        hint: {
          en: "Which plan leaves evidence in a cell, so that a formula, not only an eye, can read it?",
          ar: "أي خطة تترك دليلًا في خلية، فتقرؤه صيغة لا عين فقط؟"
        },
        explain: {
          en: "A colour is a highlighter, not a detector. Duplicate Values on the order_id column answers “does this value appear again in the column?”: 151 orders have more than one line, so 306 of the 771 order_id cells light up although only 16 lines are repeats. Applying it to A2:H772 is worse: Duplicate Values treats the whole selection as one pool of values, so a cell such as Cash, Food or 1 counts as a duplicate just because it appears elsewhere, and most of the sheet lights up. Painting rows by hand is a manual edit with no trail, and no formula can read a fill colour. Only the helper column holds the fact (dup_n above 1 on exactly 16 lines); the rule merely paints it. Colour the helper column, not the logic.",
          ar: "اللون قلم تمييز لا كاشف. تطبيق Duplicate Values على عمود order_id يجيب عن «هل تظهر هذه القيمة مرة أخرى في العمود؟»: في 151 طلبًا أكثر من بند، فتتلوّن 306 خلايا من خلايا order_id الـ 771 مع أن 16 بندًا فقط مكررة. وتطبيقها على A2:H772 أسوأ: فـ Duplicate Values تعامل التحديد كله مجموعة واحدة من القيم، فتُعدّ خلية مثل Cash أو Food أو 1 مكررة لمجرد ظهورها في موضع آخر، فيضيء معظم الورقة. وتلوين الصفوف يدويًّا تعديل بلا أثر، ولا صيغة تقرأ لون التعبئة. والعمود المساعد وحده يحمل الحقيقة (dup_n أكبر من 1 في 16 بندًا بالضبط)؛ أما القاعدة فتلوّنه فقط. لوّن العمود المساعد لا المنطق."
        }
      },

      /* ---------------------------------------------------------- 08 */
      {
        id: "p1l4q08", type: "mcq", level: "easy",
        topics: ["p1-xl-duplicates"],
        q: {
          en: "Remove Duplicates with all eight columns ticked and the <code>dup_n</code> flag both deal with the 16 repeated lines and leave 755. Why is the flag the better habit?",
          ar: "Remove Duplicates مع تحديد الأعمدة الثمانية كلها وعلامة <code>dup_n</code> كلتاهما تتعامل مع البنود المكررة الـ 16 وتُبقي 755. لماذا العلامة هي العادة الأفضل؟"
        },
        options: [
          {
            en: "Nothing is deleted: the 16 rows stay in the Table, with a value you can filter, count and defend, whereas Remove Duplicates leaves no list of what went.",
            ar: "لا شيء يُحذف: تبقى الصفوف الـ 16 في الجدول، بقيمة تستطيع تصفيتها وعدّها والدفاع عنها، بينما لا تترك Remove Duplicates قائمة بما ذهب."
          },
          {
            en: "The flag finds repeated lines that Remove Duplicates cannot find, because a formula can compare more columns than the command can, however many boxes are ticked.",
            ar: "تجد العلامة بنودًا مكررة لا تستطيع Remove Duplicates إيجادها، لأن الصيغة تقارن أعمدة أكثر مما يقارن الأمر مهما كثرت الخانات المحدَّدة."
          },
          {
            en: "The flag is faster on a large table, because the running COUNTIFS looks at each row only once and never goes back up the column to recount.",
            ar: "العلامة أسرع على الجدول الكبير، لأن COUNTIFS المتوسعة تنظر إلى كل صف مرة واحدة فقط ولا ترجع إلى أعلى العمود لتعيد العدّ."
          },
          {
            en: "Remove Duplicates is unreliable because it keeps the last copy of each line instead of the first, so it is the wrong row that survives every time.",
            ar: "Remove Duplicates غير موثوقة لأنها تُبقي آخر نسخة من كل بند بدل الأولى، فيبقى الصف الخطأ في كل مرة."
          }
        ],
        answer: 0,
        hint: {
          en: "Both reach the same count. Think about what is left behind afterwards, and what you could show a colleague who asks “which 16?”.",
          ar: "كلتاهما تصل إلى العدد نفسه. فكّر فيما يبقى بعد ذلك، وما تستطيع أن تُريه لزميل يسأل «أي 16؟»."
        },
        explain: {
          en: "Both end with 16 repeats found and 755 lines, so they are equal on the count. The flag wins on evidence: nothing is deleted, the 16 rows are visible and sortable, and the result can be checked and repeated. Remove Duplicates is destructive and silent, and a single wrong tick is a disaster (with only order_id ticked it removes 155 lines, 139 of them legitimate sales). The other options are myths the lesson corrects: Remove Duplicates can compare all eight columns too; the expanding COUNTIFS recounts from the top for every row, so it is slower, not faster, on a large table; and Remove Duplicates keeps the first copy. Whatever you do, record how many rows each rule touched: that count is the lineage of the file you hand to a model.",
          ar: "كلتاهما تنتهي إلى 16 تكرارًا مكتشفًا و755 بندًا، فهما متساويتان في العدد. وتفوز العلامة بالدليل: لا شيء يُحذف، والصفوف الـ 16 مرئية وقابلة للفرز، ويمكن فحص النتيجة وتكرارها. أما Remove Duplicates فمدمّرة وصامتة، وعلامة تحديد واحدة خاطئة كارثة (فمع تحديد order_id وحدها تحذف 155 بندًا منها 139 مبيعات مشروعة). والخيارات الأخرى خرافات يصححها الدرس: تستطيع Remove Duplicates مقارنة الأعمدة الثمانية أيضًا؛ وتعيد COUNTIFS المتوسعة العدّ من الأعلى لكل صف فهي أبطأ لا أسرع في الجدول الكبير؛ وتُبقي Remove Duplicates النسخة الأولى. ومهما فعلت، سجّل كم صفًّا مسّته كل قاعدة: فهذا العدد هو سلالة الملف الذي تسلّمه إلى نموذج."
        }
      },

      /* ---------------------------------------------------------- 09 */
      {
        id: "p1l4q09", type: "compare", level: "hard",
        topics: ["p1-xl-duplicates", "p1-xl-helper-columns"],
        lang: "excel",
        q: {
          en: "A colleague says: “two lines are duplicates when they have the same <code>order_id</code> and the same <code>item_clean</code>”. Version A is the lesson’s key over all eight fields; Version B is the colleague’s. Both use the running-count pattern, and a line is flagged when its count is above 1. Which statement is correct?",
          ar: "يقول زميل: «بندان مكرران إذا تساوى <code>order_id</code> و<code>item_clean</code>». الصيغة أ هي مفتاح الدرس على الحقول الثمانية كلها، والصيغة ب مفتاح الزميل. كلتاهما تستعمل نمط العدّ التراكمي، ويُعلَّم البند حين يزيد عدّه على 1. أي العبارات صحيحة؟"
        },
        codeA: code(
          'line_key  =TEXTJOIN("|",FALSE,[@[order_id]:[customer_type]])',
          "dup_n     =COUNTIFS(INDEX([line_key],1):[@line_key],[@line_key])"
        ),
        codeB: code(
          'key2  =[@order_id]&"|"&[@item_clean]',
          "dup2  =COUNTIFS(INDEX([key2],1):[@key2],[@key2])"
        ),
        options: [
          {
            en: "B is better: it is shorter, and flagging 22 lines instead of 16 catches more of the till’s double-clicks, so the counted revenue ends up cleaner and no repeat is left in the data; the narrower key costs nothing.",
            ar: "ب أفضل: هي أقصر، وتعليم 22 بندًا بدل 16 يلتقط مزيدًا من نقرات الصندوق المزدوجة، فيصبح الإيراد المحتسب أنظف ولا يبقى في البيانات أي تكرار، والمفتاح الأضيق بلا كلفة."
          },
          {
            en: "A is better: it flags 16 lines, the repeats of lines whose eight fields are all equal. B flags 22, and the extra 6 are legitimate second lines of an order (Tea ×3 by card and Tea ×1 in cash on order 5103, for one); excluding them would cut the counted revenue by 80.00.",
            ar: "أ أفضل: تعلّم 16 بندًا هي تكرارات البنود المتطابقة في حقولها الثمانية كلها. وتعلّم ب 22 بندًا، والـ 6 الزائدة بنود ثانية مشروعة في طلبات (شاي ×3 بالبطاقة وشاي ×1 نقدًا في الطلب 5103 مثلًا)؛ واستبعادها ينقص الإيراد المحتسب بمقدار 80.00."
          },
          {
            en: "They are equivalent: both use <code>COUNTIFS(INDEX(…,1):[@…],[@…])</code>, so both give the first copy 1 and the repeat 2, and the wider key in A only adds typing without changing which lines are flagged, so either one can be used.",
            ar: "هما متكافئتان: كلتاهما تستعمل <code>COUNTIFS(INDEX(…,1):[@…],[@…])</code>، فتعطيان النسخة الأولى 1 والتكرار 2، والمفتاح الأوسع في أ لا يضيف إلا كتابة دون أن يغيّر البنود المعلَّمة، فيصلح أيهما."
          },
          {
            en: "B is better: it avoids the defect of A, whose count runs over the whole column and so marks both members of every pair (32 lines, not 16), deleting the original sales too.",
            ar: "ب أفضل: تتجنب عيب أ التي يمتد عدّها على العمود كله فتعلّم كلا عضوَي كل زوج (32 بندًا لا 16)، فتحذف المبيعات الأصلية أيضًا."
          }
        ],
        answer: 1,
        hint: {
          en: "Ask what “the same event recorded twice” requires you to compare, and what else a narrower key will match by accident.",
          ar: "اسأل: ما الذي يلزم أن تقارنه كي يعني التطابق «الحدث نفسه سُجّل مرتين»؟ وماذا سيطابق المفتاح الأضيق بالمصادفة؟"
        },
        explain: {
          en: "A is Version 3 of the duplicate evolve: a key wide enough that a match means “the same event recorded twice”. B’s key is too narrow. Order 5103 legitimately holds two Tea lines (×3 by card, ×1 in cash), and 6 such lines (rows 49, 129, 241, 334, 481 and 650) get flagged with the 16 real repeats, so a status built on dup2 would drop 80.00 of real sales (7,982.00 instead of 8,062.00). More flags is not better flags. The statement that B avoids a whole-column count confuses A with the one-column <code>COUNTIF([line_key],[@line_key])&gt;1</code>, which does mark both members of each pair; A and B both use the running count. A is not perfect (one retyped field escapes, the result depends on row order, the expanding range is slow on large tables): say which error you accept, and count it.",
          ar: "أ هي النسخة 3 من تطوّر علامة التكرار: مفتاح واسع بما يكفي كي يعني التطابق «الحدث نفسه سُجّل مرتين». ومفتاح ب أضيق مما ينبغي. فالطلب 5103 يحوي بصورة مشروعة بندَي شاي (×3 بالبطاقة و×1 نقدًا)، ويُعلَّم 6 بنود من هذا النوع (الصفوف 49 و129 و241 و334 و481 و650) مع التكرارات الحقيقية الـ 16، فيحذف status المبني على dup2 مبيعات حقيقية بقيمة 80.00 (يصبح الإيراد 7,982.00 بدل 8,062.00). فزيادة العلامات ليست علامات أفضل. ووالعبارة التي تقول إن ب تتجنب عدّ العمود كله تخلط أ بالصيغة ذات العمود الواحد <code>COUNTIF([line_key],[@line_key])&gt;1</code> التي تعلّم فعلًا كلا عضوَي كل زوج؛ أما أ وب فكلتاهما تستعمل العدّ التراكمي. وأ ليست كاملة (حقل واحد أُعيدت كتابته يفلت، والنتيجة تعتمد على ترتيب الصفوف، والنطاق المتوسع بطيء في الجداول الكبيرة): قل أي الخطأين تقبل وعُدّه."
        }
      },

      /* ---------------------------------------------------------- 10 */
      {
        id: "p1l4q10", type: "ordercode", level: "medium",
        topics: ["p1-xl-duplicates", "p1-xl-helper-columns"],
        lang: "excel",
        q: {
          en: "Put these cells in an order that works. Nothing is deleted from <code>tblOrders</code>; the last cell is a check that must show 0.",
          ar: "رتّب هذه الخلايا بترتيب يعمل. لا يُحذف شيء من <code>tblOrders</code>؛ والخلية الأخيرة فحص يجب أن يظهر 0."
        },
        items: [
          { code: 'line_key  =TEXTJOIN("|",FALSE,[@[order_id]:[customer_type]])' },
          { code: "dup_n     =COUNTIFS(INDEX([line_key],1):[@line_key],[@line_key])" },
          { code: 'status    =IF([@dup_n]>1,"duplicate","ok")' },
          { code: 'B2  =COUNTIFS(tblOrders[status],"duplicate")' },
          { code: "B3  =ROWS(tblOrders)-B2" },
          { code: 'B4  =B3-COUNTIFS(tblOrders[status],"ok")' }
        ],
        hint: {
          en: "Work backwards from the check in the last cell: which cells does it read, and which cells do those read in turn?",
          ar: "ابدأ من الخلية الأخيرة، الفحص: أي خلايا تقرؤها؟ وأي خلايا تقرؤها تلك بدورها؟"
        },
        explain: {
          en: "Each cell reads something built by the cell before it. line_key glues the eight fields into one text; dup_n counts how often that text has appeared from the first row down to this row (1 for the first copy, 2 for the repeat); status turns the count into a reason; B2 counts the 16 flagged lines; B3 is the 755 lines that remain; and B4 proves that exactly those 755 are “ok”, so a 0 means no row escaped. This is Version 3 of the duplicate evolve: the 16 rows stay in the Table, each carrying its reason, where Version 2’s Remove Duplicates would have deleted them and left no list of what went. Reverse the order and the first formula would point at a column that does not exist yet.",
          ar: "كل خلية تقرأ شيئًا بنته الخلية التي قبلها. يلصق line_key الحقول الثمانية في نص واحد؛ ويعدّ dup_n كم مرة ظهر ذلك النص من الصف الأول نزولًا إلى هذا الصف (1 للنسخة الأولى و2 للتكرار)؛ ويحوّل status العدّ إلى سبب؛ وتعدّ B2 البنود الـ 16 المعلَّمة؛ وB3 هي البنود الـ 755 الباقية؛ وتثبت B4 أن هذه الـ 755 بالضبط هي «ok»، فالصفر يعني أنه لم يفلت صف. وهذه النسخة 3 من تطوّر التكرار: تبقى الصفوف الـ 16 في الجدول وكل منها يحمل سببه، بينما كانت Remove Duplicates في النسخة 2 ستحذفها ولا تترك قائمة بما ذهب. ولو عكست الترتيب لأشارت الصيغة الأولى إلى عمود لم يوجد بعد."
        }
      },

      /* ---------------------------------------------------------- 11 */
      {
        id: "p1l4q11", type: "trace", level: "medium",
        topics: ["p1-xl-duplicates"],
        lang: "excel",
        q: {
          en: "Six lines of a tiny <code>tblOrders</code> (four fields, in this order) and three helper columns. Work out what the formulas give. Type numbers only.",
          ar: "ستة بنود من <code>tblOrders</code> صغير (أربعة حقول بهذا الترتيب) وثلاثة أعمدة مساعدة. استخرج ما تعطيه الصيغ. اكتب أرقامًا فقط."
        },
        code: code(
          'line_key  =TEXTJOIN("|",FALSE,[@[order_id]:[payment]])',
          "dup_n     =COUNTIFS(INDEX([line_key],1):[@line_key],[@line_key])",
          "flag      =COUNTIF([line_key],[@line_key])>1",
          "",
          "row  order_id  item   qty  payment",
          " 1   6001      Tea    3    Card",
          " 2   6001      Tea    3    Card",
          " 3   6001      Tea    1    Cash",
          " 4   6002      Latte  1    Wallet",
          " 5   6002      Latte  1    Wallet",
          " 6   6002      Latte  1    Wallet"
        ),
        blanks: [
          { accept: ["1"], label: { en: "<code>dup_n</code> on row 3", ar: "<code>dup_n</code> في الصف 3" } },
          { accept: ["3"], label: { en: "<code>dup_n</code> on row 6", ar: "<code>dup_n</code> في الصف 6" } },
          { accept: ["3"], label: { en: "<code>=COUNTIFS(tblOrders[dup_n],\"&gt;1\")</code>", ar: "<code>=COUNTIFS(tblOrders[dup_n],\"&gt;1\")</code>" } },
          { accept: ["5"], label: { en: "Rows where <code>flag</code> is TRUE", ar: "الصفوف التي تكون فيها <code>flag</code> قيمة TRUE" } }
        ],
        hint: {
          en: "Write each row’s key first: only completely equal keys repeat. Then ask whether each formula looks at the rows above, or at the whole column.",
          ar: "اكتب مفتاح كل صف أولًا: لا يتكرر إلا المفتاح المتطابق تمامًا. ثم اسأل: هل تنظر كل صيغة إلى الصفوف التي فوقها أم إلى العمود كله؟"
        },
        explain: {
          en: "The keys are 6001|Tea|3|Card (rows 1 and 2), 6001|Tea|1|Cash (row 3) and 6002|Latte|1|Wallet (rows 4 to 6). Row 3 shares the order and the item with rows 1 and 2 but not the quantity and the payment, so its key is new and dup_n is 1. The running count gives 1, 2, 1, 1, 2, 3, so three rows are above 1 (rows 2, 5 and 6): the repeats, with the first copy of each kept. The one-column <code>flag</code> counts the whole column, so it is TRUE for both members of the pair and for all three of the triple: 5 rows. Delete everything it flags and the original sales go with the duplicates. The running count is what lets the first copy survive.",
          ar: "المفاتيح هي 6001|Tea|3|Card (الصفان 1 و2) و6001|Tea|1|Cash (الصف 3) و6002|Latte|1|Wallet (الصفوف من 4 إلى 6). يشترك الصف 3 مع الصفين 1 و2 في الطلب والصنف لا في الكمية وطريقة الدفع، فمفتاحه جديد وقيمة dup_n فيه 1. ويعطي العدّ التراكمي 1 و2 و1 و1 و2 و3، فثلاثة صفوف فوق 1 (الصفوف 2 و5 و6): هي التكرارات، وتبقى النسخة الأولى من كل منها. أما <code>flag</code> ذات العمود الواحد فتعدّ العمود كله، فتكون TRUE لكلا عضوَي الزوج وللأعضاء الثلاثة في الثلاثية: 5 صفوف. ولو حذفت كل ما تعلّمه لذهبت المبيعات الأصلية مع المكررات. والعدّ التراكمي هو ما يُبقي النسخة الأولى."
        }
      },

      /* ---------------------------------------------------------- 12 */
      {
        id: "p1l4q12", type: "compare", level: "hard",
        topics: ["p1-xl-helper-columns"],
        lang: "excel",
        q: {
          en: "In <code>tblOrders</code> the price on row 6 is the text <code>n/a</code>. Version A and Version B are two ways to write the <code>line_total</code> column. Which statement is correct?",
          ar: "في <code>tblOrders</code> السعر في الصف 6 هو النص <code>n/a</code>. الصيغتان أ وب طريقتان لكتابة عمود <code>line_total</code>. أي العبارات صحيحة؟"
        },
        codeA: "line_total  =[@qty]*[@unit_price]",
        codeB: "line_total  =IFERROR([@qty]*[@unit_price],0)",
        options: [
          {
            en: "B is better: it removes the error, the sum works, and the average is still right, because a line of 0 adds nothing to a total and changes nothing in a mean, so no other check is needed once the total works and the report can go out.",
            ar: "ب أفضل: تزيل الخطأ ويعمل المجموع ويبقى المتوسط صحيحًا، لأن بندًا قيمته 0 لا يضيف شيئًا إلى المجموع ولا يغيّر شيئًا في المتوسط، فلا حاجة إلى فحص آخر ما دام المجموع يعمل ويمكن إصدار التقرير."
          },
          {
            en: "A is better: a visible error is always safer than a number, so wrapping a formula in IFERROR is never acceptable in an analysis, and the error should simply be left in place for everyone to see and report.",
            ar: "أ أفضل: الخطأ الظاهر أسلم دائمًا من الرقم، فلا يجوز أبدًا في التحليل أن تُغلَّف صيغة بـ IFERROR، وينبغي ترك الخطأ في مكانه ببساطة ليراه الجميع ويبلّغوا عنه."
          },
          {
            en: "They are equivalent for everything the manager reads: both give a sum of 8,334, and a single unknown price among 771 lines cannot move an average in any way that matters to a reader of the report.",
            ar: "هما متكافئتان في كل ما يقرؤه المدير: كلتاهما تعطي مجموعًا قدره 8,334، وسعر مجهول واحد بين 771 بندًا لا يحرّك المتوسط بما يهم قارئ التقرير."
          },
          {
            en: "B unblocks the sum (8,334) but turns the unknown price into 0: AVERAGE divides by all 771 lines (10.8093), and IFERROR would equally hide a #NAME? or #REF!. A is loud but honest; a better fix tests only the case you expect and leaves the cell blank (10.8234 over the 770 priced lines).",
            ar: "تفكّ ب انسداد المجموع (8,334) لكنها تحوّل السعر المجهول إلى 0: فيقسم AVERAGE على البنود الـ 771 كلها (10.8093)، وكانت IFERROR ستخفي بالقدر نفسه #NAME? أو #REF!. وأ مسموعة لكنها صادقة؛ وإصلاح أفضل يختبر الحالة التي تتوقعها فقط ويترك الخلية فارغة (10.8234 على البنود الـ 770 ذات السعر)."
          }
        ],
        answer: 3,
        hint: {
          en: "Compute what each version does to SUM, to AVERAGE and to COUNT of the column, and ask what else IFERROR would swallow.",
          ar: "احسب ما تفعله كل صيغة بـ SUM وبـ AVERAGE وبـ COUNT للعمود، واسأل عمّا ستبتلعه IFERROR أيضًا."
        },
        explain: {
          en: "This is Version 1 against Version 2 of the line_total evolve. In A the text price makes row 6 #VALUE! and every sum, average and PivotTable total that touches the column inherits the error: loud, which beats silent, but nothing can be reported. B fixes that, and the total is 8,334, but 0 is a claim that the line was free: the average now divides by 771 (10.8093), and any other error, from a mistyped function to a deleted column, is turned into a plausible 0 as well. Neither extreme is the answer: version 3 tests the one thing you expect (is the price a number?) and leaves the cell blank, so the average is taken over the 770 priced lines (10.8234) and COUNT of the column exposes the missing one. Unknown should stay unknown.",
          ar: "هذه النسخة 1 مقابل النسخة 2 من تطوّر line_total. في أ يجعل السعر النصي الصف 6 هو #VALUE! ويرث كل مجموع ومتوسط وإجمالي جدول محوري يلمس العمود الخطأ: مسموع وهذا أفضل من الصامت، لكن لا يمكن إعلان شيء. وتصلح ب ذلك فيصبح المجموع 8,334، لكن الصفر ادّعاء بأن البند مجاني: فيقسم المتوسط الآن على 771 (10.8093)، ويتحول أي خطأ آخر، من دالة كُتبت خطأً إلى عمود حُذف، إلى صفر معقول المظهر أيضًا. وليس أي من الطرفين هو الجواب: تختبر النسخة 3 الشيء الوحيد الذي تتوقعه (هل السعر رقم؟) وتترك الخلية فارغة، فيُؤخذ المتوسط على البنود الـ 770 ذات السعر (10.8234) وتكشف COUNT للعمود الناقص. فالمجهول ينبغي أن يبقى مجهولًا."
        }
      },

      /* ---------------------------------------------------------- 13 */
      {
        id: "p1l4q13", type: "write", level: "medium",
        topics: ["p1-xl-helper-columns", "p1-xl-cell-types"],
        lang: "excel",
        q: {
          en: "Write the formula of the calculated column <code>line_total</code> in <code>tblOrders</code>: <code>qty</code> times <code>unit_price</code>, but when the price is not a number (like the text <code>n/a</code> on row 6) the cell must stay blank, with no error and no 0. Test only that one case, so that any other error still shows. Use <code>[@column]</code> references.",
          ar: "اكتب صيغة العمود المحسوب <code>line_total</code> في <code>tblOrders</code>: <code>qty</code> مضروبة في <code>unit_price</code>، لكن حين لا يكون السعر رقمًا (مثل النص <code>n/a</code> في الصف 6) تبقى الخلية فارغة، بلا خطأ وبلا 0. اختبر هذه الحالة وحدها كي يبقى أي خطأ آخر ظاهرًا. استعمل مراجع <code>[@column]</code>."
        },
        starter: "line_total  =",
        lines: 3,
        checks: [
          {
            re: "\\bIF\\s*\\(",
            flags: "i",
            label: {
              en: "Branch with <code>IF</code>: one result for a numeric price, another for the rest",
              ar: "تفرّع بـ <code>IF</code>: نتيجة للسعر الرقمي وأخرى لما عداه"
            }
          },
          {
            re: "ISNUMBER\\s*\\(\\s*" + P_PRICE + "\\s*\\)",
            flags: "i",
            label: {
              en: "Test the price with <code>ISNUMBER([@unit_price])</code>",
              ar: "اختبر السعر بـ <code>ISNUMBER([@unit_price])</code>"
            }
          },
          {
            re: P_QTY + "\\s*\\*\\s*" + P_PRICE + "|" + P_PRICE + "\\s*\\*\\s*" + P_QTY,
            flags: "i",
            label: {
              en: "Multiply <code>[@qty]</code> by <code>[@unit_price]</code>",
              ar: "اضرب <code>[@qty]</code> في <code>[@unit_price]</code>"
            }
          },
          {
            re: "\"\"",
            label: {
              en: "Return an empty text <code>\"\"</code> for the unknown price",
              ar: "أعِد نصًّا فارغًا <code>\"\"</code> للسعر المجهول"
            }
          }
        ],
        forbid: [
          {
            re: "IFERROR\\s*\\(",
            flags: "i",
            label: {
              en: "<code>IFERROR</code>, which swallows every error, not only the one you expect",
              ar: "<code>IFERROR</code> التي تبتلع كل خطأ لا الخطأ الذي تتوقعه وحده"
            }
          },
          {
            re: ",\\s*0\\s*\\)\\s*$",
            label: {
              en: "Returning 0 for the unknown price (unknown is not zero)",
              ar: "إعادة 0 للسعر المجهول (المجهول ليس صفرًا)"
            }
          }
        ],
        solution: {
          code: code(
            'line_total  =IF(ISNUMBER([@unit_price]),[@qty]*[@unit_price],"")',
            "",
            "row 6                           ->  (blank)",
            "=SUM(tblOrders[line_total])     ->  8334",
            "=COUNT(tblOrders[line_total])   ->  770"
          ),
          en: "The formula tests exactly the case we know about and leaves the cell blank otherwise, so unknown stays unknown; the sum is unchanged, the average is taken over the 770 priced lines, and COUNT exposes the missing one.",
          ar: "تختبر الصيغة الحالة التي نعرفها بالضبط وتترك الخلية فارغة وإلا، فيبقى المجهول مجهولًا؛ يبقى المجموع كما هو، ويُؤخذ المتوسط على البنود الـ 770 ذات السعر، وتكشف COUNT الناقص."
        },
        hint: {
          en: "You need a test on the price that returns TRUE or FALSE, and an IF with two results. Which result do you give when the price is not a number?",
          ar: "تحتاج إلى اختبار للسعر يُعيد TRUE أو FALSE، وإلى IF بنتيجتين. أي نتيجة تعطي حين لا يكون السعر رقمًا؟"
        },
        explain: {
          en: "This is Version 3 of the line_total evolve. <code>ISNUMBER</code> asks the one question we expect to matter, so row 6 becomes blank instead of #VALUE! or a false 0, and a real mistake (a mistyped function, a deleted column) still shows as an error. The sum stays 8,334, COUNT of the column is 770 and AVERAGE divides by those 770 lines. Two things it leaves open: a column that mixes numbers and <code>\"\"</code> is again a mixed-type column, and nothing in the cell says why it is blank, which is the job of the status column.",
          ar: "هذه النسخة 3 من تطوّر line_total. تسأل <code>ISNUMBER</code> السؤال الوحيد الذي نتوقع أن يهم، فيصبح الصف 6 فارغًا بدل #VALUE! أو صفر كاذب، ويبقى الخطأ الحقيقي (دالة كُتبت خطأً أو عمود حُذف) ظاهرًا خطأً. ويبقى المجموع 8,334، وتعطي COUNT للعمود 770، ويقسم AVERAGE على هذه البنود الـ 770. وفي الصيغة أمران ما زالا مفتوحين: العمود الذي يخلط أرقامًا و<code>\"\"</code> هو مجددًا عمود مختلط الأنواع، ولا شيء في الخلية يقول لماذا هي فارغة، وهذا عمل عمود status."
        }
      },

      /* ---------------------------------------------------------- 14 */
      {
        id: "p1l4q14", type: "write", level: "easy",
        topics: ["p1-xl-sumifs", "p1-xl-structured-refs"],
        lang: "excel",
        q: {
          en: "Write one formula for the revenue of the counted lines (<code>status</code> = ok) of the Drink category paid with Wallet. Use the helper columns and structured references such as <code>tblOrders[line_total]</code>.",
          ar: "اكتب صيغة واحدة لإيراد البنود المحتسبة (<code>status</code> = ok) من فئة Drink المدفوعة بـ Wallet. استعمل الأعمدة المساعدة والمراجع المُهيكلة مثل <code>tblOrders[line_total]</code>."
        },
        starter: "=",
        lines: 3,
        checks: [
          {
            re: "SUMIFS\\s*\\(\\s*tblOrders\\[\\s*line_total\\s*\\]\\s*,",
            flags: "i",
            label: {
              en: "<code>SUMIFS</code> with the numbers to add (<code>tblOrders[line_total]</code>) as the first argument",
              ar: "<code>SUMIFS</code> والأرقام المراد جمعها (<code>tblOrders[line_total]</code>) وسيطها الأول"
            }
          },
          {
            re: "tblOrders\\[\\s*status\\s*\\]\\s*,\\s*\"ok\"",
            flags: "i",
            label: {
              en: "Keep only counted lines: <code>tblOrders[status],\"ok\"</code>",
              ar: "أبقِ البنود المحتسبة فقط: <code>tblOrders[status],\"ok\"</code>"
            }
          },
          {
            re: "tblOrders\\[\\s*category\\s*\\]\\s*,\\s*\"Drink\"",
            flags: "i",
            label: {
              en: "Condition on the category: <code>tblOrders[category],\"Drink\"</code>",
              ar: "شرط على الفئة: <code>tblOrders[category],\"Drink\"</code>"
            }
          },
          {
            re: "tblOrders\\[\\s*payment\\s*\\]\\s*,\\s*\"Wallet\"",
            flags: "i",
            label: {
              en: "Condition on the payment: <code>tblOrders[payment],\"Wallet\"</code>",
              ar: "شرط على الدفع: <code>tblOrders[payment],\"Wallet\"</code>"
            }
          }
        ],
        forbid: [
          {
            re: "\\$?[A-Z]{1,3}\\$?\\d+\\s*:\\s*\\$?[A-Z]{1,3}\\$?\\d+",
            flags: "i",
            label: {
              en: "A fixed range such as <code>E2:E772</code> instead of the Table’s columns",
              ar: "نطاق ثابت مثل <code>E2:E772</code> بدل أعمدة الجدول"
            }
          }
        ],
        solution: {
          code: code(
            '=SUMIFS(tblOrders[line_total],tblOrders[status],"ok",tblOrders[category],"Drink",tblOrders[payment],"Wallet")',
            "",
            "->  606.00   (71 counted lines)"
          ),
          en: "The amounts to add come first, then one (range, condition) pair per rule; every pair must pass for a line to be added.",
          ar: "الأرقام المراد جمعها أولًا، ثم زوج (نطاق، شرط) لكل قاعدة؛ ويجب أن ينجح كل زوج كي يُضاف البند."
        },
        hint: {
          en: "Which argument of SUMIFS comes first, and how many (range, condition) pairs does the question describe?",
          ar: "أي وسيط في SUMIFS يأتي أولًا، وكم زوجًا (نطاق، شرط) يصفه السؤال؟"
        },
        explain: {
          en: "SUMIFS takes the numbers to add first and then pairs of a range and its condition; a line is added only when every condition is true. Here that is three pairs: status, category and payment. The classic slip is leaving out the status pair: without it the formula returns 622.00 instead of 606.00, because it also includes two repeated lines (18.00 and 6.00) and a refund (-8.00) that the rules exclude. (The older SUMIF puts the sum range last, SUMIFS puts it first.) The Table references also keep working when next month’s lines are added.",
          ar: "تأخذ SUMIFS الأرقام المراد جمعها أولًا ثم أزواجًا من نطاق وشرطه؛ ولا يُضاف البند إلا إذا صحّت كل الشروط. وهنا ثلاثة أزواج: status وcategory وpayment. والزلة الكلاسيكية نسيان زوج status: فبدونه تعطي الصيغة 622.00 بدل 606.00، لأنها تشمل أيضًا بندين مكررين (18.00 و6.00) واسترجاعًا (-8.00) تستبعدها القواعد. (و SUMIF القديمة تضع نطاق الجمع أخيرًا، أما SUMIFS فتضعه أولًا.) والمراجع إلى الجدول تواصل العمل أيضًا حين تُضاف بنود الشهر القادم."
        }
      },

      /* ---------------------------------------------------------- 15 */
      {
        id: "p1l4q15", type: "error", level: "hard",
        topics: ["p1-xl-lookup"],
        lang: "excel",
        q: {
          en: "Four colleagues wrote the <code>menu_price</code> column of <code>tblOrders</code> in four ways. The table <code>tblMenu</code> (columns <code>item</code>, <code>category</code>, <code>list_price</code>) is in the order of the menu sheet, not alphabetical, and nobody will insert a column in it. Click the line that can return the price of the wrong item without any error message.",
          ar: "كتب أربعة زملاء عمود <code>menu_price</code> في <code>tblOrders</code> بأربع طرق. الجدول <code>tblMenu</code> (الأعمدة <code>item</code> و<code>category</code> و<code>list_price</code>) بترتيب ورقة القائمة لا ترتيبًا أبجديًّا، ولن يُدرج أحد عمودًا فيه. انقر السطر الذي قد يُعيد سعر الصنف الخطأ دون أي رسالة خطأ."
        },
        code: code(
          "menu_price  =XLOOKUP([@item_clean],tblMenu[item],tblMenu[list_price])",
          "menu_price  =INDEX(tblMenu[list_price],MATCH([@item_clean],tblMenu[item],0))",
          "menu_price  =VLOOKUP([@item_clean],tblMenu,3,FALSE)",
          "menu_price  =VLOOKUP([@item_clean],tblMenu,3)"
        ),
        answer: 4,
        solution: {
          code: "menu_price  =VLOOKUP([@item_clean],tblMenu,3,FALSE)",
          en: "The last argument FALSE asks for an exact match: the item is found or the result is #N/A. Better still, name the columns with XLOOKUP.",
          ar: "الوسيط الأخير FALSE يطلب مطابقة تامة: إما أن يوجد الصنف أو تكون النتيجة #N/A. والأفضل أن تُسمّى الأعمدة بـ XLOOKUP."
        },
        hint: {
          en: "Compare the last argument of the four formulas. What does Excel assume when it is left out, and what does that assume about the first column?",
          ar: "قارن الوسيط الأخير في الصيغ الأربع. ماذا يفترض إكسل حين يُحذف؟ وماذا يفترض ذلك عن العمود الأول؟"
        },
        explain: {
          en: "Line 4 leaves out the last argument of VLOOKUP, which then switches silently to approximate matching. That mode assumes the first column is sorted; on an unsorted menu it can land on a neighbouring item and return its price, and for an item that is missing it returns some price instead of #N/A, with no complaint. Line 3 spells out FALSE, so it is exact: found or #N/A. (Its hard-coded 3 is a hazard if a column is ever inserted, but the question rules that out.) Lines 1 and 2 are exact too: XLOOKUP matches exactly by default, and the 0 in MATCH asks for it, so leave the 0 out and MATCH becomes approximate as well.",
          ar: "يحذف السطر 4 الوسيط الأخير من VLOOKUP، فتتحول بصمت إلى المطابقة التقريبية. وهذا الوضع يفترض أن العمود الأول مرتّب؛ وفي قائمة غير مرتبة قد يقع على صنف مجاور فيعيد سعره، وللصنف الغائب يعيد سعرًا ما بدل #N/A، دون أي شكوى. أما السطر 3 فيكتب FALSE صراحة، فهو تام: يوجد الصنف أو تظهر #N/A. (والرقم 3 المكتوب فيه خطر إن أُدرج عمود يومًا، لكن السؤال يستبعد ذلك.) والسطران 1 و2 تامّان أيضًا: تطابق XLOOKUP تطابقًا تامًّا افتراضيًّا، ويطلبه الصفر في MATCH، فإن حذفت الصفر صارت MATCH تقريبية هي الأخرى."
        }
      },

      /* ---------------------------------------------------------- 16 */
      {
        id: "p1l4q16", type: "complete", level: "easy",
        topics: ["p1-xl-lookup"],
        lang: "excel",
        q: {
          en: "Complete the fourth argument of <code>XLOOKUP</code> so that an item missing from the menu is reported by a message you can count, instead of a number that hides the problem.",
          ar: "أكمل الوسيط الرابع في <code>XLOOKUP</code> بحيث يُبلَّغ عن الصنف الغائب عن القائمة برسالة تستطيع عدّها، بدل رقم يخفي المشكلة."
        },
        code: "menu_price  =XLOOKUP([@item_clean],tblMenu[item],tblMenu[list_price],____)",
        options: [
          { code: "0" },
          { code: '"not on menu"' },
          { code: '""' },
          { code: "FALSE" }
        ],
        answer: 1,
        solution: {
          code: 'menu_price  =XLOOKUP([@item_clean],tblMenu[item],tblMenu[list_price],"not on menu")',
          en: "The fourth argument, if_not_found, returns a message that =COUNTIF(tblOrders[menu_price],\"not on menu\") can count; that check must be 0.",
          ar: "الوسيط الرابع if_not_found يُعيد رسالة تستطيع =COUNTIF(tblOrders[menu_price],\"not on menu\") عدّها؛ ويجب أن يكون هذا الفحص 0."
        },
        hint: {
          en: "Ask which of the four would let you find a missing item with a count, and which would let it pass for a real price or for a blank.",
          ar: "اسأل: أي الخيارات الأربعة يتيح لك العثور على الصنف الغائب بعدّ، وأيها يتركه يمر سعرًا حقيقيًّا أو خلية فارغة؟"
        },
        explain: {
          en: "The fourth argument, if_not_found, is what XLOOKUP returns when the item is not in the list. A message is something you can count: <code>=COUNTIF(tblOrders[menu_price],\"not on menu\")</code> must be 0, and a new item such as Mango Juice shows up at once. The tempting 0 is the <code>IFERROR(…,0)</code> habit: a price of 0 is a believable number, so every Mango Juice line is priced at 0 and revenue shrinks quietly. An empty text hides the item among all the other blanks. FALSE is a VLOOKUP habit (its last argument means exact match; here the fourth argument is not that) and would put FALSE in a price column.",
          ar: "الوسيط الرابع if_not_found هو ما تُعيده XLOOKUP حين لا يكون الصنف في القائمة. والرسالة شيء تستطيع عدّه: يجب أن تكون <code>=COUNTIF(tblOrders[menu_price],\"not on menu\")</code> صفرًا، ويظهر الصنف الجديد مثل عصير المانجو فورًا. والصفر المغري هو عادة <code>IFERROR(…,0)</code>: السعر 0 رقم معقول المظهر، فيُسعَّر كل بند مانجو بصفر ويقل الإيراد بهدوء. والنص الفارغ يخبّئ الصنف بين سائر الخلايا الفارغة. و FALSE عادة من VLOOKUP (وسيطها الأخير يعني المطابقة التامة؛ أما الوسيط الرابع هنا فليس ذلك) وتضع FALSE في عمود أسعار."
        }
      },

      /* ---------------------------------------------------------- 17 */
      {
        id: "p1l4q17", type: "multi", level: "hard",
        topics: ["p1-xl-lookup"],
        lang: "excel",
        q: {
          en: "The price lookup evolved in three versions: pasted prices (Version 1), <code>VLOOKUP(…,3,FALSE)</code> (Version 2) and <code>menu_price = XLOOKUP([@item_clean], tblMenu[item], tblMenu[list_price], \"not on menu\")</code> followed by <code>price_check = IF([@unit_price]=[@menu_price],\"match\",\"MISMATCH\")</code> (Version 3). Which statements are true? (Choose all that apply.)",
          ar: "تطوّر بحث السعر في ثلاث نسخ: أسعار ملصوقة (النسخة 1)، و<code>VLOOKUP(…,3,FALSE)</code> (النسخة 2)، و<code>menu_price = XLOOKUP([@item_clean], tblMenu[item], tblMenu[list_price], \"not on menu\")</code> يتبعها <code>price_check = IF([@unit_price]=[@menu_price],\"match\",\"MISMATCH\")</code> (النسخة 3). أيّ العبارات صحيحة؟ (اختر كل ما ينطبق.)"
        },
        options: [
          {
            en: "Version 3 still breaks silently if someone inserts a column in <code>tblMenu</code> before <code>list_price</code>, just as the hard-coded 3 in Version 2 does.",
            ar: "ما زالت النسخة 3 تتعطل بصمت إذا أدرج أحدهم عمودًا في <code>tblMenu</code> قبل <code>list_price</code>، مثلما يفعل الرقم 3 المكتوب مباشرة في النسخة 2."
          },
          {
            en: "Version 2 fixes the staleness of Version 1: when the menu price changes, every line follows, whereas pasted prices keep saying the old price.",
            ar: "تصلح النسخة 2 تقادم النسخة 1: حين يتغير سعر القائمة تتبعه كل البنود، بينما تظل الأسعار الملصوقة تقول السعر القديم."
          },
          {
            en: "Version 3 still fails to find the 4 lines whose item name ends with a space, because the lookup uses the raw <code>item</code>.",
            ar: "ما زالت النسخة 3 تفشل في العثور على البنود الأربعة التي ينتهي اسم صنفها بفراغ، لأن البحث يستعمل <code>item</code> الخام."
          },
          {
            en: "A genuine mid-month price rise would be flagged <code>MISMATCH</code> in Version 3, because the check compares each line with the current menu.",
            ar: "سيُعلَّم ارتفاع سعر حقيقي في منتصف الشهر <code>MISMATCH</code> في النسخة 3، لأن الفحص يقارن كل بند بالقائمة الحالية."
          },
          {
            en: "<code>price_check</code> repairs the 120 typo by replacing it with the menu price of 12.",
            ar: "يصلح <code>price_check</code> خطأ 120 باستبداله بسعر القائمة 12."
          },
          {
            en: "The message “not on menu” only helps if somebody counts it: <code>=COUNTIF(tblOrders[menu_price],\"not on menu\")</code> must be 0.",
            ar: "الرسالة «not on menu» لا تفيد إلا إذا عدّها أحد: يجب أن تكون <code>=COUNTIF(tblOrders[menu_price],\"not on menu\")</code> صفرًا."
          }
        ],
        answer: [1, 3, 5],
        hint: {
          en: "For each statement, name the version it is about and the defect that version fixed or left open.",
          ar: "لكل عبارة سمِّ النسخة التي تتحدث عنها والعيب الذي أصلحته أو تركته مفتوحًا."
        },
        explain: {
          en: "Version 2 replaces a copy of the truth that cannot update (the pasted prices) by a live link, so staleness is fixed. Version 3 compares with the current menu, so a real mid-month rise would be flagged: a real analysis would keep a dated price table. A message such as “not on menu” only works if the count is watched. The false ones are the defects Version 3 closed: it names its columns (<code>tblMenu[list_price]</code>), so inserting a column no longer shifts anything; it searches the trimmed <code>item_clean</code>, so the four trailing-space names are found; and <code>price_check</code> only flags the two disagreeing lines (the 120 against 12 and the text n/a against 3), it repairs nothing. XLOOKUP also needs Excel 2021 or Microsoft 365, where INDEX/MATCH works on older versions.",
          ar: "تستبدل النسخة 2 نسخةً من الحقيقة لا تستطيع التحديث (الأسعار الملصوقة) برابط حيّ، فيُصلَح التقادم. وتقارن النسخة 3 بالقائمة الحالية، فيُعلَّم ارتفاع حقيقي في منتصف الشهر: والتحليل الواقعي يحتفظ بجدول أسعار مؤرَّخ. ورسالة مثل «not on menu» لا تعمل إلا إذا روقب العدّ. أما العبارات الخاطئة فهي العيوب التي أغلقتها النسخة 3: فهي تسمّي أعمدتها (<code>tblMenu[list_price]</code>) فلا يزحزح إدراج عمود شيئًا بعد الآن؛ وتبحث عن <code>item_clean</code> المشذَّب فتُوجد الأسماء الأربعة ذات الفراغ الأخير؛ ولا يفعل <code>price_check</code> سوى تعليم البندين المختلفين (120 مقابل 12 والنص n/a مقابل 3)، ولا يصلح شيئًا. ويحتاج XLOOKUP أيضًا إلى Excel 2021 أو Microsoft 365، بينما يعمل INDEX/MATCH في الإصدارات الأقدم."
        }
      },

      /* ---------------------------------------------------------- 18 */
      {
        id: "p1l4q18", type: "error", level: "medium",
        topics: ["p1-xl-absolute-refs", "p1-xl-sumifs"],
        lang: "excel",
        q: {
          en: "On a Summary sheet, <code>A2</code> lists the 16 menu items (it fills <code>A2:A17</code> by itself). <code>B2</code> and <code>C2</code> are each written once and then filled down to row 17. Click the line whose formula gives wrong shares after the fill.",
          ar: "في ورقة Summary تسرد <code>A2</code> أصناف القائمة الـ 16 (وتملأ <code>A2:A17</code> بنفسها). وتُكتب <code>B2</code> و<code>C2</code> مرة واحدة ثم تُملآن نزولًا حتى الصف 17. انقر السطر الذي تعطي صيغته نسبًا خاطئة بعد الملء."
        },
        code: code(
          "A2   =tblMenu[item]",
          'B2   =SUMIFS(tblOrders[line_total],tblOrders[item_clean],A2,tblOrders[status],"ok")',
          "B18  =SUM(B2:B17)",
          "C2   =B2/B18",
          'B19  =B18-SUMIFS(tblOrders[line_total],tblOrders[status],"ok")'
        ),
        answer: 4,
        solution: {
          code: "C2   =B2/$B$18",
          en: "The numerator must slide (B2, B3, …) and the denominator must stay on the grand total, so it is pinned with dollar signs.",
          ar: "يجب أن ينزلق البسط (B2 ثم B3 …) ويبقى المقام على الإجمالي الكبير، فيُثبَّت بعلامتي الدولار."
        },
        hint: {
          en: "Fill C2 down by hand: what does the reference to B18 become in C3 and in C4? Then ask which reference in B2 is supposed to move.",
          ar: "املأ C2 نزولًا بيدك: ماذا يصير المرجع B18 في C3 وفي C4؟ ثم اسأل: أي مرجع في B2 يجب أن يتحرك؟"
        },
        explain: {
          en: "Line 4 is the culprit. A relative reference is re-aimed by the same offset as the formula, so filled down, <code>=B2/B18</code> becomes <code>=B3/B19</code>, then <code>=B4/B20</code>: B19 is the check cell and the rest are empty, so the shares come out as #DIV/0!. Excel has no idea that B18 is a total. The denominator needs <code>$B$18</code>. Line 2 is deliberately relative: A2 must slide to A3, A4 … so each row sums its own item (a tempting “fix” that pins it would give every row the first item). Lines 3 and 5 are single cells that are not filled, and line 1 is a dynamic array. The check in B19, which must be 0.00, guards the other danger: an item in the orders that is missing from the menu list.",
          ar: "السطر 4 هو المتهم. المرجع النسبي تُعاد وجهته بالإزاحة نفسها للصيغة، فـ <code>=B2/B18</code> إذا ملئت نزولًا تصبح <code>=B3/B19</code> ثم <code>=B4/B20</code>: B19 هي خلية الفحص وبقية الخلايا فارغة، فتظهر النسب #DIV/0!. ولا يعرف إكسل أن B18 إجمالي. ويحتاج المقام إلى <code>$B$18</code>. والسطر 2 نسبي عن قصد: يجب أن تنزلق A2 إلى A3 وA4 … كي يجمع كل صف صنفه (و«الإصلاح» المغري الذي يثبّتها يعطي كل الصفوف الصنف الأول). والسطران 3 و5 خليتان مفردتان لا تُملآن، والسطر 1 مصفوفة ديناميكية. أما الفحص في B19، وهو يجب أن يكون 0.00، فيحرس الخطر الآخر: صنف في الطلبات غائب عن قائمة الأصناف الـ 16."
        }
      },

      /* ---------------------------------------------------------- 19 */
      {
        id: "p1l4q19", type: "multi", level: "medium",
        topics: ["p1-xl-pivot-revenue"],
        q: {
          en: "The revenue per item was produced three ways: Version 1 reads the status bar and types the number, Version 2 uses one <code>SUMIFS</code> per item, Version 3 is a PivotTable with a status filter. Which statements are true? (Choose all that apply.)",
          ar: "حُسب الإيراد لكل صنف بثلاث طرق: النسخة 1 تقرأ شريط الحالة وتكتب الرقم، والنسخة 2 تستعمل <code>SUMIFS</code> لكل صنف، والنسخة 3 جدول محوري بمرشِّح للحالة. أيّ العبارات صحيحة؟ (اختر كل ما ينطبق.)"
        },
        options: [
          {
            en: "Version 2 ranks the items from the biggest earner down by itself.",
            ar: "تُرتّب النسخة 2 الأصناف من الأعلى إيرادًا إلى الأدنى من تلقاء نفسها."
          },
          {
            en: "Version 1’s typed 1,368 for Shawarma Wrap is right on the day, but it has no link to its source and stays 1,368 when the data changes.",
            ar: "الرقم 1,368 المكتوب لـ Shawarma Wrap صحيح في يومه، لكن لا رابط له بمصدره ويبقى 1,368 حين تتغير البيانات."
          },
          {
            en: "A PivotTable built on <code>tblOrders</code> updates by itself the moment a new line is typed under the Table.",
            ar: "الجدول المحوري المبني على <code>tblOrders</code> يتحدّث من تلقاء نفسه لحظة يُكتب بند جديد تحت الجدول."
          },
          {
            en: "In Version 2 the check cell (the grand total minus the counted revenue) stops being 0 if an item appears in the orders that is not in the list of 16.",
            ar: "في النسخة 2 تتوقف خلية الفحص (الإجمالي الكبير ناقص الإيراد المحتسب) عن كونها 0 إذا ظهر في الطلبات صنف ليس في قائمة الأصناف الـ 16."
          },
          {
            en: "In Version 3, if the status filter is removed, the Grand Total becomes 8,334.00 and Shawarma Wrap 1,512.00, with no warning.",
            ar: "في النسخة 3، إذا أُزيل مرشِّح الحالة صار الإجمالي الكبير 8,334.00 وShawarma Wrap 1,512.00، دون أي تحذير."
          },
          {
            en: "Without the status filter the top three items change: other items overtake Shawarma Wrap, Chicken Rice and Falafel Sandwich.",
            ar: "بلا مرشِّح الحالة يتغير ترتيب الأصناف الثلاثة الأعلى: تتجاوز أصناف أخرى Shawarma Wrap وChicken Rice وFalafel Sandwich."
          }
        ],
        answer: [1, 3, 4],
        hint: {
          en: "For each statement, name the version it is about and ask what that version fixed and what it left open.",
          ar: "لكل عبارة سمِّ النسخة التي تتحدث عنها واسأل: ماذا أصلحت وماذا تركت مفتوحًا؟"
        },
        explain: {
          en: "Version 1 is a photograph: it can be right on the day, but nothing links it to the data. Version 2 puts the rule inside the formulas and adds a check cell that stops being 0 when the list of 16 misses an item (it needs somebody to look at it). Version 3 lists whatever items exist and ranks them with a click, but it summarises whatever is in the Table: without the status filter the Grand Total is 8,334.00 and Shawarma Wrap 1,512.00, with no warning. The false statements: Version 2 has no ranking until you sort; a PivotTable is a snapshot until you press Refresh; and the unfiltered top three are 1,512 / 1,050 / 931, the same ranking as the counted 1,368 / 1,020 / 917, so the ranking survives and every amount is wrong, which is exactly why the error is easy to miss.",
          ar: "النسخة 1 صورة فوتوغرافية: قد تصح في يومها لكن لا شيء يربطها بالبيانات. والنسخة 2 تضع القاعدة داخل الصيغ وتضيف خلية فحص تتوقف عن كونها 0 حين تفوّت قائمة الأصناف الـ 16 صنفًا (ويحتاج الأمر إلى من ينظر إليها). والنسخة 3 تسرد أي أصناف موجودة وترتّبها بنقرة، لكنها تلخّص ما في الجدول: بلا مرشِّح الحالة يكون الإجمالي الكبير 8,334.00 وShawarma Wrap 1,512.00 دون تحذير. أما العبارات الخاطئة: فلا ترتيب في النسخة 2 حتى تفرز؛ والجدول المحوري لقطة ثابتة حتى تضغط Refresh؛ والأصناف الثلاثة الأعلى بلا مرشِّح 1,512 / 1,050 / 931 وهي الترتيب نفسه للمحتسب 1,368 / 1,020 / 917، فالترتيب ينجو وكل مبلغ خاطئ، وهذا بالذات ما يجعل الخطأ سهل الإفلات."
        }
      },

      /* ---------------------------------------------------------- 20 */
      {
        id: "p1l4q20", type: "trace", level: "hard",
        topics: ["p1-xl-pivot-hours", "p1-xl-helper-columns"],
        lang: "excel",
        q: {
          en: "Nine lines of a tiny <code>tblOrders</code> with the lesson’s <code>order_first</code> helper column. A PivotTable has Rows = <code>hour</code>, one column <code>Count of order_id</code> (no filter) and one column <code>Sum of order_first</code>. Work out the values. Type numbers only.",
          ar: "تسعة بنود من <code>tblOrders</code> صغير مع العمود المساعد <code>order_first</code> من الدرس. في الجدول المحوري الصفوف = <code>hour</code>، وعمود <code>Count of order_id</code> (بلا مرشِّح)، وعمود <code>Sum of order_first</code>. استخرج القيم. اكتب أرقامًا فقط."
        },
        code: code(
          'order_first  =IF([@status]<>"ok",0,IF(COUNTIFS(INDEX([order_id],1):[@order_id],[@order_id],INDEX([status],1):[@status],"ok")=1,1,0))',
          "",
          "row  order_id  hour  status",
          " 1   7001      12    ok",
          " 2   7001      12    ok",
          " 3   7002      13    ok",
          " 4   7002      13    duplicate",
          " 5   7003      13    refund",
          " 6   7004      13    ok",
          " 7   7004      13    ok",
          " 8   7005      12    ok",
          " 9   7006      12    ok"
        ),
        blanks: [
          { accept: ["0"], label: { en: "<code>order_first</code> on row 7", ar: "<code>order_first</code> في الصف 7" } },
          { accept: ["5"], label: { en: "<code>Count of order_id</code> at 13", ar: "<code>Count of order_id</code> عند 13" } },
          { accept: ["2"], label: { en: "<code>Sum of order_first</code> at 13", ar: "<code>Sum of order_first</code> عند 13" } },
          { accept: ["3"], label: { en: "<code>Sum of order_first</code> at 12", ar: "<code>Sum of order_first</code> عند 12" } }
        ],
        hint: {
          en: "order_first is 1 only on the first counted line of an order. Fill it in row by row, then add per hour.",
          ar: "تساوي order_first القيمة 1 على أول بند محتسب في الطلب فقط. املأها صفًّا صفًّا ثم اجمع لكل ساعة."
        },
        explain: {
          en: "Row by row, order_first is 1, 0, 1, 0, 0, 1, 0, 1, 1: a line that is not “ok” gets 0 (the duplicate and the refund), and of two “ok” lines of the same order only the first gets 1 (row 7 is the second line of order 7004, so 0). Hour 13 has 5 lines but only 2 orders, because 7002 has a repeat and 7003 is a refund that never counts; hour 12 has 4 lines and 3 orders. Counting rows names 13:00 the busiest, counting orders after the rules names 12:00. The real file does the same: 13:00 has 155 lines against 149 at 12:00, but counted orders are 12:00 = 119 and 13:00 = 117. Always say whether you counted lines, orders, or orders after the rules.",
          ar: "تساوي order_first صفًّا بصف: 1 و0 و1 و0 و0 و1 و0 و1 و1؛ فالبند الذي ليس «ok» يأخذ 0 (التكرار والاسترجاع)، ومن بندين «ok» في طلب واحد لا يأخذ 1 إلا الأول (الصف 7 هو البند الثاني في الطلب 7004 فقيمته 0). وللساعة 13 خمسة بنود لكن طلبين فقط، لأن في 7002 تكرارًا ولأن 7003 استرجاع لا يُحتسب أبدًا؛ وللساعة 12 أربعة بنود وثلاثة طلبات. فعدّ الصفوف يسمّي 13:00 الأكثر ازدحامًا، وعدّ الطلبات بعد القواعد يسمّي 12:00. والملف الحقيقي يفعل الشيء نفسه: في 13:00 عدد 155 بندًا مقابل 149 في 12:00، لكن الطلبات المحتسبة 12:00 = 119 و13:00 = 117. فقل دائمًا هل عددت بنودًا أم طلبات أم طلبات بعد القواعد."
        }
      },

      /* ---------------------------------------------------------- 21 */
      {
        id: "p1l4q21", type: "mcq", level: "hard",
        topics: ["p1-xl-pivot-caveats"],
        q: {
          en: "The counted Tea lines of one day are: qty 3 at price 3, qty 1 at price 3 and qty 2 at price 3. A PivotTable has Rows = item and a calculated field <code>=qty*unit_price</code> (PivotTable Analyze → Fields, Items &amp; Sets → Calculated Field) in Values. <code>SUMIFS</code> over the helper column <code>line_total</code> gives 18 for these lines. What does the calculated field show for Tea?",
          ar: "بنود Tea المحتسبة في يوم واحد هي: qty = 3 بسعر 3، وqty = 1 بسعر 3، وqty = 2 بسعر 3. في جدول محوري الصفوف = item وفي القيم حقل محسوب <code>=qty*unit_price</code> (PivotTable Analyze → Fields, Items &amp; Sets → Calculated Field). وتعطي <code>SUMIFS</code> على العمود المساعد <code>line_total</code> القيمة 18 لهذه البنود. ماذا يعرض الحقل المحسوب لـ Tea؟"
        },
        options: [
          {
            en: "18, the same as SUMIFS, because a calculated field multiplies row by row and then adds.",
            ar: "18، مثل SUMIFS، لأن الحقل المحسوب يضرب صفًّا صفًّا ثم يجمع."
          },
          {
            en: "54, because it multiplies the sum of qty (6) by the sum of unit_price (9).",
            ar: "54، لأنه يضرب مجموع qty (6) في مجموع unit_price (9)."
          },
          {
            en: "6, because the PivotTable averages the two fields first and then multiplies them (2 × 3).",
            ar: "6، لأن الجدول المحوري يأخذ متوسط الحقلين أولًا ثم يضربهما (2 × 3)."
          },
          {
            en: "#VALUE!, because a calculated field cannot multiply two fields.",
            ar: "#VALUE!، لأن الحقل المحسوب لا يستطيع ضرب حقلين."
          }
        ],
        answer: 1,
        hint: {
          en: "A PivotTable first summarises each field for the item and only then applies the calculated field. What does it have to multiply?",
          ar: "يلخّص الجدول المحوري كل حقل للصنف أولًا ثم يطبّق الحقل المحسوب. ماذا عليه أن يضرب إذن؟"
        },
        explain: {
          en: "A calculated field is evaluated on the aggregated (summed) fields, not row by row: Sum(qty) × Sum(unit_price) = 6 × 9 = 54, three times the true 18; the factor is the number of lines. On the real file the counted Shawarma Wrap gives 114 wraps × 828 (the sum of 69 prices of 12) = 94,392 against a true 1,368. The answer 18 is the one everybody expects, which is exactly why this error is dangerous: no error appears, only a wrong number. Compute the row-level value in a helper column (<code>line_total</code>) and sum that. The sum of products is not the product of sums.",
          ar: "يُحسب الحقل المحسوب على الحقول المجمَّعة (المجموعة) لا صفًّا بصف: Sum(qty) × Sum(unit_price) = 6 × 9 = 54، أي ثلاثة أمثال الـ 18 الصحيحة؛ والعامل هو عدد البنود. وفي الملف الحقيقي يعطي Shawarma Wrap المحتسب 114 شاورما × 828 (مجموع 69 سعرًا قيمة كل منها 12) = 94,392 مقابل 1,368 الصحيحة. والجواب 18 هو ما يتوقعه الجميع، ولهذا بالذات يكون هذا الخطأ خطرًا: لا يظهر خطأ بل رقم خاطئ فقط. احسب قيمة الصف في عمود مساعد (<code>line_total</code>) واجمعها. فمجموع الحواصل ليس حاصل المجاميع."
        }
      },

      /* ---------------------------------------------------------- 22 */
      {
        id: "p1l4q22", type: "order", level: "medium",
        topics: ["p1-xl-audit", "p1-xl-pivot-caveats"],
        q: {
          en: "Calculation is set to Automatic. You correct one wrong <code>qty</code> in <code>tblOrders</code>. Put what happens next in order, from the edit to the moment everything agrees again.",
          ar: "الحساب مضبوط على Automatic. تصحّح قيمة <code>qty</code> خاطئة واحدة في <code>tblOrders</code>. رتّب ما يحدث بعد ذلك، من التعديل إلى اللحظة التي يتفق فيها كل شيء من جديد."
        },
        items: [
          {
            en: "You press Enter on the corrected <code>qty</code>.",
            ar: "تضغط Enter على <code>qty</code> المصحّحة."
          },
          {
            en: "Excel marks every cell that reads it, directly or through other cells: the row’s <code>line_total</code>, then <code>status</code>, <code>order_first</code> and the formulas that read those columns.",
            ar: "يعلّم إكسل كل خلية تقرؤها، مباشرة أو عبر خلايا أخرى: <code>line_total</code> في ذلك الصف، ثم <code>status</code> و<code>order_first</code> والصيغ التي تقرأ هذه الأعمدة."
          },
          {
            en: "It recalculates those cells in dependency order, so the <code>SUMIFS</code> totals on the Summary sheet change at once.",
            ar: "يعيد حساب تلك الخلايا بترتيب الاعتماد، فتتغير إجماليات <code>SUMIFS</code> في ورقة Summary فورًا."
          },
          {
            en: "A PivotTable built on the Table still shows the old numbers: it is not part of the recalculation chain, so it now disagrees with the SUMIFS totals.",
            ar: "ما زال الجدول المحوري المبني على الجدول يعرض الأرقام القديمة: فهو ليس جزءًا من سلسلة إعادة الحساب، فيخالف الآن إجماليات SUMIFS."
          },
          {
            en: "You press Refresh (<code>Alt+F5</code>): the PivotTable reads the Table again and agrees with the SUMIFS totals.",
            ar: "تضغط Refresh (<code>Alt+F5</code>): يقرأ الجدول المحوري الجدول من جديد ويتفق مع إجماليات SUMIFS."
          }
        ],
        answer: [0, 1, 2, 3, 4],
        hint: {
          en: "Follow the dependency chain from the edited cell outwards, and ask which output is not part of that chain.",
          ar: "تتبّع سلسلة الاعتماد من الخلية المعدّلة إلى الخارج، واسأل: أي ناتج ليس جزءًا من تلك السلسلة؟"
        },
        explain: {
          en: "Excel keeps a dependency map: when you edit a cell it marks everything that reads it, directly or through others, and recalculates those cells in order. That is why a SUMIFS total follows a corrected qty at once. A PivotTable is not part of the chain until you refresh it, so for a moment two numbers for the “same” revenue disagree, and the disagreement is the finding that tells you a Refresh is due. In Manual calculation mode the second and third steps would wait for F9 as well (the status bar shows Calculate). Reaching the same total by independent routes, SUMIFS, PivotTable and the Summary sheet, is the best audit.",
          ar: "يحتفظ إكسل بخريطة اعتماديات: حين تعدّل خلية يعلّم كل ما يقرؤها، مباشرة أو عبر غيره، ويعيد حساب تلك الخلايا بالترتيب. ولهذا يتبع إجمالي SUMIFS الكمية المصحّحة فورًا. والجدول المحوري ليس جزءًا من السلسلة حتى تحدّثه، فيختلف رقمان لـ«الإيراد نفسه» لحظة، والاختلاف هو الاكتشاف الذي يقول إن التحديث مستحق. وفي وضع الحساب اليدوي ستنتظر الخطوتان الثانية والثالثة F9 أيضًا (ويعرض شريط الحالة Calculate). والوصول إلى الإجمالي نفسه بطرق مستقلة، SUMIFS والجدول المحوري وورقة Summary، هو أفضل تدقيق."
        }
      },

      /* ---------------------------------------------------------- 23 */
      {
        id: "p1l4q23", type: "mcq", level: "medium",
        topics: ["p1-xl-habits"],
        q: {
          en: "Management announces a 10% staff discount to be applied to the <code>line_total</code> of Staff lines. Which way of building it will still be right in a month, when the rate changes to 15% and a colleague takes over the workbook?",
          ar: "تعلن الإدارة خصمًا قدره 10% للموظفين يُطبَّق على <code>line_total</code> لبنود Staff. أي طريقة لبنائه ستبقى صحيحة بعد شهر، حين يتغير المعدل إلى 15% ويتسلّم زميل المصنّف؟"
        },
        options: [
          {
            en: "Compute the discounted amounts in a spare column, copy them and paste them as values over <code>line_total</code>, so the report shows the new figures straight away.",
            ar: "احسب المبالغ المخفَّضة في عمود جانبي وانسخها والصقها قيمًا فوق <code>line_total</code>، فيعرض التقرير الأرقام الجديدة فورًا."
          },
          {
            en: "Colour the Staff rows yellow and tell the whole team that yellow means “discounted”, so anyone opening the sheet can see it at a glance.",
            ar: "لوّن صفوف Staff بالأصفر وأخبر الفريق كله أن الأصفر يعني «مخفَّض»، فيراه أي شخص يفتح الورقة من النظرة الأولى."
          },
          {
            en: "Keep the rate in a named input cell (<code>StaffDiscount</code>) and add a column <code>=IF([@customer_type]=\"Staff\",[@line_total]*(1-StaffDiscount),[@line_total])</code>; <code>line_total</code> stays as it is.",
            ar: "احتفظ بالمعدل في خلية إدخال مسمّاة (<code>StaffDiscount</code>) وأضف عمودًا <code>=IF([@customer_type]=\"Staff\",[@line_total]*(1-StaffDiscount),[@line_total])</code>؛ ويبقى <code>line_total</code> كما هو."
          },
          {
            en: "Type <code>=[@line_total]*0.9</code> in the Staff lines and add a cell comment next to it explaining that the 0.9 means 10% off for staff.",
            ar: "اكتب <code>=[@line_total]*0.9</code> في بنود Staff وأضف تعليقًا على الخلية بجانبها يشرح أن الرقم 0.9 يعني خصم 10% للموظفين."
          }
        ],
        answer: 2,
        hint: {
          en: "Each wrong option is a habit from the lesson’s list. Ask what each one costs when the rate changes, and whether a formula, a CSV export or pandas could see it.",
          ar: "كل خيار خاطئ عادة من قائمة الدرس. اسأل: ماذا يكلّف كل منها حين يتغير المعدل؟ وهل تراه صيغة أو تصدير CSV أو pandas؟"
        },
        explain: {
          en: "Pasted values are a photograph: when the rate or the data changes they do not, and the original amounts are gone. Colour is invisible to formulas, to a CSV export and to pandas. A 0.9 inside a formula is a hard-coded number: when the rate changes somebody must find every copy, and a comment is easy to miss. A named input cell shows the assumption, changes in one place, and the raw column stays as the evidence. This also matters for a model: if a training file was “cleaned in Excel” by pasting values and colouring rows, nobody can say which rows were changed or why, so the file cannot be reproduced or defended.",
          ar: "القيم الملصوقة صورة فوتوغرافية: حين يتغير المعدل أو البيانات لا تتغير، وتضيع المبالغ الأصلية. واللون غير مرئي للصيغ ولتصدير CSV ولـ pandas. والرقم 0.9 داخل الصيغة رقم مكتوب مباشرة: حين يتغير المعدل يجب أن يجد أحدهم كل النسخ، والتعليق يسهل أن يفوت. أما خلية الإدخال المسمّاة فتُظهر الافتراض وتتغير في موضع واحد، ويبقى العمود الخام دليلًا. وهذا يهم النموذج أيضًا: فإذا «نُظّف» ملف تدريب في إكسل بلصق القيم وتلوين الصفوف فلا يستطيع أحد القول أي الصفوف تغيّرت ولماذا، فلا يمكن إعادة إنتاج الملف ولا الدفاع عنه."
        }
      },

      /* ---------------------------------------------------------- 24 */
      {
        id: "p1l4q24", type: "match", level: "easy",
        topics: ["p1-xl-limits-graduate"],
        q: {
          en: "Match each situation with the tool the lesson says to reach for.",
          ar: "وصّل كل موقف بالأداة التي يقول الدرس إنها الأنسب له."
        },
        leftHead: { en: "Situation", ar: "الموقف" },
        rightHead: { en: "Reach for", ar: "الأنسب" },
        pairs: [
          {
            l: {
              en: "A one-off look at 771 lines, and the manager wants a number today.",
              ar: "نظرة لمرة واحدة على 771 بندًا، والمدير يريد رقمًا اليوم."
            },
            r: {
              en: "Excel: a Table with SUMIFS or a PivotTable",
              ar: "إكسل: جدول (Table) مع SUMIFS أو جدول محوري"
            }
          },
          {
            l: {
              en: "The same cleaning must be applied to a new CSV every week, with the steps recorded and replayed.",
              ar: "يجب تطبيق التنظيف نفسه على ملف CSV جديد كل أسبوع، مع تسجيل الخطوات وإعادة تشغيلها."
            },
            r: {
              en: "Power Query (in Excel or Power BI) or a script",
              ar: "Power Query (في إكسل أو Power BI) أو سكربت"
            }
          },
          {
            l: {
              en: "An interactive report with visuals and sharing, for many readers.",
              ar: "تقرير تفاعلي بمرئيات ومشاركة لقرّاء كثيرين."
            },
            r: { en: "Power BI", ar: "Power BI" }
          },
          {
            l: {
              en: "Millions of rows, tests, and a model to train on the result.",
              ar: "ملايين الصفوف واختبارات ونموذج يُدرَّب على الناتج."
            },
            r: { en: "Python and pandas", ar: "بايثون وpandas" }
          },
          {
            l: {
              en: "A quick labelling sheet where annotators must pick from fixed values instead of typing.",
              ar: "ورقة وسم سريعة يجب أن يختار فيها واسمو البيانات من قيم ثابتة بدل أن يكتبوا."
            },
            r: {
              en: "Excel’s Data Validation → List",
              ar: "قائمة التحقق في إكسل (Data Validation → List)"
            }
          }
        ],
        hint: {
          en: "Ask how many times the work will be repeated, how many people will read it, and how big the data is.",
          ar: "اسأل: كم مرة سيتكرر العمل؟ وكم شخصًا سيقرؤه؟ وما حجم البيانات؟"
        },
        explain: {
          en: "Excel wins the small, one-off, visible question: a Table with SUMIFS or a PivotTable answers it in minutes and your manager already reads it. Repetition is the signal to graduate: Power Query or a script records the steps and replays them, so the weekly clean-up stops depending on clicks. Power BI is built for interactive reports that many people read; Python and pandas for millions of rows, tests and model training, where code can be reviewed, versioned and rerun. Excel is also a good labelling sheet when annotators choose from a Data Validation list, because typing is where “Positive”, “positive” and “Positive ” come from. The test to carry away: if you cannot answer “how did you get this number?” in one minute, or you are doing the same steps a second time, move the steps somewhere that records them.",
          ar: "يفوز إكسل في السؤال الصغير لمرة واحدة والظاهر: يجيب عنه جدول مع SUMIFS أو جدول محوري في دقائق، ومديرك يقرؤه أصلًا. والتكرار هو إشارة التخرّج: يسجّل Power Query أو السكربت الخطوات ويعيد تشغيلها، فلا يبقى التنظيف الأسبوعي رهن النقرات. ويناسب Power BI التقارير التفاعلية التي يقرؤها كثيرون؛ وتناسب بايثون وpandas الملايين من الصفوف والاختبارات وتدريب النماذج، حيث يمكن مراجعة الكود وإصداره وإعادة تشغيله. وإكسل أيضًا ورقة وسم جيدة حين يختار واسمو البيانات من قائمة Data Validation، لأن الكتابة الحرة هي مصدر «Positive» و«positive» و«Positive ». والاختبار الذي تحمله معك: إن لم تستطع الإجابة عن «كيف وصلت إلى هذا الرقم؟» في دقيقة، أو كنت تكرر الخطوات نفسها للمرة الثانية، فانقل الخطوات إلى مكان يسجلها."
        }
      }

    ]
  };
})();
