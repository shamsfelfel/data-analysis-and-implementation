/* Practical Chapter 1 - Lesson test 6: One Question, Three Tools.
   24 questions: p1l6q01 ... p1l6q24. Topics: assets/data/topics/p1-l6.js
   Excel and Power BI cannot be run in the build, so every value attributed to them was recomputed
   with pandas on downloads/p1/cafeteria_orders.csv and cafeteria_menu.csv, by applying exactly the
   steps Lessons 4 and 5 taught (scratch: .tmp/p1-test-06/). */
window.DABanks = window.DABanks || {};
(function () {
  /* code(line, line, ...) -> one string with \n between lines */
  function code() { return Array.prototype.join.call(arguments, "\n"); }

  window.DABanks["p1-test-06"] = {
    title: {
      en: "Test 6 — One Question, Three Tools",
      ar: "اختبار 6 — سؤال واحد بثلاث أدوات"
    },
    intro: {
      en: "24 questions on the chapter capstone: the question card made executable, the four answers to “how many?”, the five rules R1–R5 written once as data with the count each removes, the same rules in three dialects, why the order changes the log and not the answer, the reconciliation table and the tolerance of 0.005, the per-rule audit that names the missing step, the two rules whose absence no headline number can see, the three silent defaults, the one-page brief and its measured caveats, the golden answer and what a failing check looks like, and the six questions that choose a tool. Allow about 45 minutes. You need neither Excel nor Power BI: every number you are asked for can be worked out from the code, the tables and the rules shown, and every figure quoted from the cafeteria file (771 → 755 → 748 lines, 8,062.00, 616 → 611 orders, 12:00 with 119, R1 16 / R2 5 / R3 2 …) was recomputed with pandas on the real data. The hint, the answer and the explanation stay hidden until you ask for them: try first, then open them. A revealed answer is not counted, and the Review links under each question lead back to the part of the lesson it tests.",
      ar: "24 سؤالًا على خاتمة الفصل: بطاقة السؤال وقد صارت قابلة للتنفيذ، والإجابات الأربع عن «كم؟»، والقواعد الخمس R1–R5 مكتوبةً مرة واحدة على شكل بيانات مع عدد ما تحذفه كل واحدة، والقواعد نفسها بثلاث لهجات، ولماذا يغيّر الترتيب السجل لا الإجابة، وجدول المطابقة وتسامح 0.005، وتدقيق كل قاعدة الذي يسمّي الخطوة الناقصة، والقاعدتان اللتان لا يرى غيابهما أي رقم رئيسي، والافتراضات الصامتة الثلاثة، والموجز من صفحة واحدة وتحفظاته المقيسة، والإجابة المرجعية وكيف يبدو الفحص الفاشل، والأسئلة الستة التي تختار الأداة. خصّص نحو 45 دقيقة. ولا تحتاج إلى Excel ولا إلى Power BI: فكل رقم مطلوب منك يمكن استخراجه من الشيفرة والجداول والقواعد المعروضة، وكل رقم مقتبس من ملف الكافتيريا (771 ← 755 ← 748 سطرًا، و8,062.00، و616 ← 611 طلبًا، و12:00 بـ 119، وR1 16 / R2 5 / R3 2 …) أُعيد حسابه بـ pandas على البيانات الحقيقية. التلميح والجواب والشرح مخفية حتى تطلبها: جرّب أولًا ثم افتحها. والجواب الذي يُظهَر لا يُحتسب، وروابط المراجعة تحت كل سؤال تعيدك إلى الجزء من الدرس الذي يختبره."
    },
    questions: [

      /* ---------------------------------------------------------- 01 */
      {
        id: "p1l6q01", type: "tf", level: "easy",
        topics: ["p1-question-executable"],
        q: {
          en: "The executable form of the project card adds four lines the prose card never had: <code>MEASURE</code>, <code>GRAIN</code>, <code>TOLERANCE</code> and <code>ON FAILURE</code>. A colleague wants to drop one: <em>the <code>TOLERANCE</code> line is presentation, not substance. <code>MEASURE</code> already says revenue is the sum of <code>qty × unit_price</code> and <code>GRAIN</code> already says a row is a line, so “all three tools return the same revenue” is checkable without it.</em> True or false?",
          ar: "تضيف الصورة القابلة للتنفيذ من بطاقة المشروع أربعة أسطر لم تكن في البطاقة النصية: <code>MEASURE</code> و<code>GRAIN</code> و<code>TOLERANCE</code> و<code>ON FAILURE</code>. ويريد زميل حذف أحدها: <em>سطر <code>TOLERANCE</code> عرضٌ لا جوهر. فـ <code>MEASURE</code> يقول أصلًا إن الإيراد مجموع <code>qty × unit_price</code>، و<code>GRAIN</code> يقول أصلًا إن الصف سطر، فجملة «تُرجع الأدوات الثلاث الإيراد نفسه» قابلة للفحص دونه.</em> صح أم خطأ؟"
        },
        truth: false,
        hint: {
          en: "Write down what each of the three tools actually puts on the screen for the same total, then say which operator you would use to compare two of those strings.",
          ar: "اكتب ما تعرضه كل أداة من الثلاث فعلًا للمجموع نفسه، ثم قل بأي عامل تقارن سلسلتين منها."
        },
        explain: {
          en: "False. The three tools hold and show the same total differently — Excel a cell formatted to two decimals, Power BI a card whose format you chose, pandas <code>8062.0</code> — and a tired human at five o'clock comparing two formatted strings against a criterion nobody defined is the commonest way an analysis goes wrong. The arithmetic makes it concrete: revenue per order is <code>13.194762684124386</code>, Excel's card shows <code>13.19</code>, and <code>13.19 == 8062 / 611</code> is <code>False</code> although nothing is wrong. <code>TOLERANCE  money agrees within 0.005</code> is what turns “the same” into something that can pass or fail, and it is a policy, not a fact: 0.005 is half a piastre here, and a business that rounds to whole shekels needs a different number. The claim is tempting because <code>MEASURE</code> and <code>GRAIN</code> really are the two biggest holes — they are the difference between 8,334.00 and 8,062.00 and between 13:00 and 12:00. But a check with no tolerance either passes by luck or fails constantly, and a check that fails constantly gets switched off. Counts are the other half of the same line: 748 and 749 lines are not nearly equal, they are a missing rule, so they stay on <code>==</code>.",
          ar: "خطأ. تحمل الأدوات الثلاث المجموع نفسه وتعرضه بصور مختلفة — Excel في خلية منسَّقة إلى منزلتين، وPower BI في بطاقة أنت اخترت تنسيقها، وpandas على هيئة <code>8062.0</code> — ومقارنة إنسان متعب في الخامسة مساءً سلسلتين منسَّقتين في مقابل معيار لم يحدّده أحد هي أشيع طريقة يفسد بها التحليل. والحساب يجعل ذلك ملموسًا: الإيراد لكل طلب <code>13.194762684124386</code>، وبطاقة Excel تعرض <code>13.19</code>، وقيمة <code>13.19 == 8062 / 611</code> هي <code>False</code> مع أن لا خطأ هناك. وسطر <code>TOLERANCE  money agrees within 0.005</code> هو ما يحوّل «نفسه» إلى شيء يستطيع أن ينجح أو يفشل، وهو سياسة لا واقعة: فـ 0.005 نصف قرش هنا، والمنشأة التي تقرّب إلى الشيكل الكامل تحتاج رقمًا غيره. والادعاء مغرٍ لأن <code>MEASURE</code> و<code>GRAIN</code> هما فعلًا أكبر الثغرتين — فهما الفرق بين 8,334.00 و8,062.00 وبين 13:00 و12:00. لكن الفحص بلا تسامح إما ينجح بالحظ أو يفشل دائمًا، والفحص الذي يفشل دائمًا يُطفأ. والأعداد هي النصف الآخر من السطر نفسه: فـ 748 و749 سطرًا ليسا متقاربين بل قاعدةً ناقصة، ولهذا تبقى على <code>==</code>."
        }
      },

      /* ---------------------------------------------------------- 02 */
      {
        id: "p1l6q02", type: "match", level: "easy",
        topics: ["p1-three-counts", "p1-lines-in-out"],
        q: {
          en: "Five numbers from the September file. Match each with what it is a count of. None of them is a mistake; each belongs to a different question.",
          ar: "خمسة أرقام من ملف سبتمبر. اربط كل واحد بما يعدّه. ولا واحد منها خطأ؛ فكل واحد ينتمي إلى سؤال مختلف."
        },
        leftHead: { en: "The number", ar: "الرقم" },
        rightHead: { en: "What it counts", ar: "ما يعدّه" },
        pairs: [
          {
            l: { code: "771" },
            r: {
              en: "order <em>lines</em> as the till recorded them, before any rule has run — “how much did the till record?”",
              ar: "<em>أسطر</em> الطلبات كما سجّلتها نقطة البيع، قبل تشغيل أي قاعدة — «كم سجّلت نقطة البيع؟»"
            }
          },
          {
            l: { code: "748" },
            r: {
              en: "order <em>lines</em> that go into the revenue, after R1, R2 and R3 have removed 23 between them",
              ar: "<em>أسطر</em> الطلبات التي تدخل في الإيراد، بعد أن حذفت R1 وR2 وR3 ثلاثة وعشرين سطرًا بينها"
            }
          },
          {
            l: { code: "616" },
            r: {
              en: "distinct <code>order_id</code> values in the raw file — “how many customers were served?”",
              ar: "قيم <code>order_id</code> المميّزة في الملف الخام — «كم عميلًا خُدِم؟»"
            }
          },
          {
            l: { code: "611" },
            r: {
              en: "distinct <code>order_id</code> values that still have a counted line — “how many orders does the revenue come from?”",
              ar: "قيم <code>order_id</code> المميّزة التي لا يزال لها سطر معدود — «من كم طلبًا جاء الإيراد؟»"
            }
          },
          {
            l: { code: "22" },
            r: {
              en: "spellings of <code>item</code> in the raw file, for a menu that has 16 items",
              ar: "كتابات <code>item</code> في الملف الخام، لقائمة فيها 16 صنفًا"
            }
          }
        ],
        hint: {
          en: "Two of the five count lines and two count orders; for each of those pairs ask whether a rule has run yet. The fifth counts neither.",
          ar: "اثنان من الخمسة يعدّان أسطرًا واثنان يعدّان طلبات؛ واسأل في كل زوج: هل عملت قاعدة بعد؟ والخامس لا يعدّ هذا ولا ذاك."
        },
        explain: {
          en: "The <span class=\"term\">grain</span> — what one row stands for — decides which number answers which question, and the mistake is never to compute one of them, it is to print one under a label that means another: “771 orders in September” is wrong in one word, because an order of three items is three lines. 771 − 23 = 748 is the lines ladder; 616 − 5 = 611 is the orders ladder, and the five that vanish are five single-line orders whose only line a rule removed. The pair 748 and 611 is the one people mix up most, because both are “after cleaning” — but 748 counts lines and 611 counts orders, and the question asked for the hour with the most <em>distinct orders</em>, which is why 611 and not 748 is the number behind 12:00 with 119. The 22 is not a grain at all: it is how many ways the same 16 menu items were typed, and R4 is the rule that brings it back to 16.",
          ar: "<span class=\"term\">الحبيبة</span> — أي ما يمثّله الصف الواحد — هي التي تحدد أي رقم يجيب أي سؤال، والخطأ ليس في حساب أحدها بل في طباعة أحدها تحت تسمية تعني غيره: فجملة «771 طلبًا في سبتمبر» خاطئة بكلمة واحدة، لأن الطلب ذا الأصناف الثلاثة ثلاثة أسطر. والعلاقة 771 − 23 = 748 هي سلّم الأسطر؛ و616 − 5 = 611 سلّم الطلبات، والخمسة المختفية خمسة طلبات ذات سطر واحد حذفت قاعدةٌ سطرها الوحيد. والزوج 748 و611 هو أكثر ما يُخلَط، لأن كليهما «بعد التنظيف» — لكن 748 يعدّ أسطرًا و611 يعدّ طلبات، والسؤال طلب الساعة ذات أكثر <em>الطلبات المميّزة</em>، ولهذا كان 611 لا 748 هو الرقم الذي وراء 12:00 بـ 119. أما 22 فليس حبيبة أصلًا: بل عدد الصور التي كُتب بها 16 صنفًا من القائمة، وR4 هي القاعدة التي تعيده إلى 16."
        }
      },

      /* ---------------------------------------------------------- 03 */
      {
        id: "p1l6q03", type: "mcq", level: "easy",
        topics: ["p1-rules-r1-r5"],
        q: {
          en: "Lesson 1's decision log said <code>D3</code> “leave out the Shawarma Wrap priced 120.0” and <code>D4</code> “leave out the line whose price reads <code>n/a</code>”. The two became one rule, <code>R3</code>: <em>drop a line whose <code>unit_price</code> is missing, not a number, or above 50</em>. Which statement says what that change bought and what it cost?",
          ar: "قال سجل قرارات الدرس 1 في <code>D3</code>: «استبعد الشاورما بسعر 120.0»، وفي <code>D4</code>: «استبعد السطر الذي سعره <code>n/a</code>». وصارت القاعدتان قاعدةً واحدة، <code>R3</code>: <em>احذف السطر الذي <code>unit_price</code> فيه مفقود أو غير رقمي أو فوق 50</em>. أي عبارة تقول ما كسبه هذا التغيير وما كلّفه؟"
        },
        options: [
          {
            en: "It traded two lists of exceptions for one condition, so the policy has a future: it can run on October's file, where the typo will be a different row. The cost is that the limit of 50 is a number somebody chose by looking, and writing it in a rule table makes it look like a measurement.",
            ar: "استبدل قائمتي استثناءات بشرط واحد، فصار للسياسة مستقبل: تستطيع أن تعمل على ملف أكتوبر حيث يكون الخطأ الطباعي في صف آخر. والثمن أن حدّ 50 رقمٌ اختاره أحدهم بالنظر، وكتابته في جدول قواعد تجعله يبدو قياسًا."
          },
          {
            en: "It halved the work: one rule instead of two means one fewer helper column in Excel and one fewer Power Query step, and the count of lines R3 removes drops from 2 to 1.",
            ar: "خفّض العمل إلى النصف: فقاعدة واحدة بدل اثنتين تعني عمودًا مساعدًا أقل في Excel وخطوة Power Query أقل، وينزل عدد الأسطر التي تحذفها R3 من 2 إلى 1."
          },
          {
            en: "It made the removals bigger: a condition that catches “missing, not a number, or above 50” removes more lines than the two that were named, which is how the revenue fell from 8,334.00 to 8,062.00.",
            ar: "وسّع الحذوف: فالشرط الذي يصطاد «المفقود وغير الرقمي وما فوق 50» يحذف أسطرًا أكثر من السطرين المسمّيين، وهكذا نزل الإيراد من 8,334.00 إلى 8,062.00."
          },
          {
            en: "It is a renaming and nothing more: the same two lines leave the table either way, so no property of the policy has changed and the only gain is a shorter table.",
            ar: "إنه تسمية جديدة فحسب: فالسطران نفسهما يخرجان من الجدول في الحالتين، فلم تتغير أي خاصية للسياسة والمكسب الوحيد جدول أقصر."
          }
        ],
        answer: 0,
        hint: {
          en: "Ask what each wording does next month, when the 120.0 is in a different row and the price that is wrong is 95.0.",
          ar: "اسأل: ماذا تفعل كل صياغة الشهر القادم، حين يكون 120.0 في صف آخر ويكون السعر الخاطئ 95.0؟"
        },
        explain: {
          en: "A rule has a future; a list of row numbers does not. “The Shawarma Wrap priced 120.0” identifies one cell of one file, so it cannot be applied to October at all, while “missing, not a number, or above 50” can — and it is the same move the chapter makes everywhere, from <code>qty = -1</code> widened to <code>qty &lt;= 0</code> because next month's refund may be −2. On <em>this</em> file R3 still removes exactly 2 lines and moves exactly 120.00, so the third and fourth options are measurably wrong: the 272.00 that separates 8,334.00 from 8,062.00 is R1 (−175.00), R2 (+23.00) and R3 (−120.00) together, and the count stays 2 because the <code>n/a</code> line is caught by “missing” and the 120.0 by “above 50”. The second option sounds like a saving and is not one — a rule is a sentence, not a step, and R3 is still two clauses in every tool. The honest cost is the one the lesson keeps naming: 50 was chosen by eye, and Exercise 6.3's R6 (“the price must equal the menu's <code>list_price</code>”) is the version with a reason, which catches a Shawarma Wrap typed 45.0 that R3 waves straight through.",
          ar: "للقاعدة مستقبل، ولقائمة أرقام الصفوف لا مستقبل. فجملة «الشاورما بسعر 120.0» تعيّن خلية واحدة في ملف واحد، فلا يمكن تطبيقها على أكتوبر أصلًا، أما «مفقود أو غير رقمي أو فوق 50» فتُطبَّق — وهي الحركة نفسها التي يصنعها الفصل في كل موضع، من <code>qty = -1</code> التي وُسِّعت إلى <code>qty &lt;= 0</code> لأن مرتجع الشهر القادم قد يكون −2. وفي <em>هذا</em> الملف تحذف R3 سطرين بالضبط وتحرّك 120.00 بالضبط، فالخياران الثالث والرابع خاطئان قياسًا: فالمبلغ 272.00 الذي يفصل 8,334.00 عن 8,062.00 هو R1 (−175.00) وR2 (+23.00) وR3 (−120.00) معًا، ويبقى العدد 2 لأن سطر <code>n/a</code> يصطاده «المفقود» و120.0 يصطاده «فوق 50». والخيار الثاني يبدو توفيرًا وليس كذلك — فالقاعدة جملة لا خطوة، وR3 لا تزال شرطين في كل أداة. والثمن الصادق هو الذي يسمّيه الدرس مرارًا: اختير 50 بالنظر، وR6 في التمرين 6.3 («يجب أن يساوي السعر <code>list_price</code> في القائمة») هي النسخة التي لها سبب، وهي تصطاد شاورما مكتوبة 45.0 تمرّرها R3 مباشرة."
        }
      },

      /* ---------------------------------------------------------- 04 */
      {
        id: "p1l6q04", type: "ordercode", level: "easy",
        topics: ["p1-rules-as-data", "p1-rule-order"],
        lang: "python",
        q: {
          en: "Put the body of Version 3's <code>clean()</code> in the order that works. Each line's comment records what it produces on the September file, and every count depends on a line that must already have run.",
          ar: "رتّب متن <code>clean()</code> في النسخة 3 بالترتيب الذي ينجح. ويسجّل تعليق كل سطر ما ينتجه على ملف سبتمبر، وكل عدد يتوقف على سطر يجب أن يكون قد عمل قبله."
        },
        items: [
          { code: "removed, n = {}, len(df)      # the log, and the running count: n = 771" },
          { code: "df = df.drop_duplicates()                                    # R1" },
          { code: 'removed["R1"], n = n - len(df), len(df)   # 16 removed, n is now 755' },
          { code: 'df = df[df["qty"] > 0]                                       # R2' },
          { code: 'removed["R2"], n = n - len(df), len(df)   # 5 removed, n is now 750' },
          {
            code: code(
              'price = pd.to_numeric(df["unit_price"], errors="coerce")      # R3',
              "keep = price.notna() & (price <= max_price)",
              "df = df[keep].assign(unit_price=price[keep])"
            )
          },
          { code: 'removed["R3"], n = n - len(df), len(df)   # 2 removed, n is now 748' },
          {
            code: code(
              'return df.assign(item=df["item"].str.strip().str.title(),     # R4',
              '                 payment=df["payment"].fillna("Unknown")), removed   # R5')
          }
        ],
        hint: {
          en: "A count of what a rule removed can only be taken after that rule has run — and <code>n</code> has to hold the number of lines <em>before</em> it. Two of the five rules remove nothing, so they have no bookkeeping at all.",
          ar: "لا يمكن أخذ عدد ما حذفته قاعدة إلا بعد أن تعمل — ويجب أن يحمل <code>n</code> عدد الأسطر <em>قبلها</em>. وقاعدتان من الخمس لا تحذفان شيئًا، فلا محاسبة لهما أصلًا."
        },
        explain: {
          en: "Each rule is followed immediately by its own bookkeeping line, and that pairing is the dependency: <code>removed[\"R1\"] = n - len(df)</code> is only 16 if <code>n</code> still holds 771 and <code>drop_duplicates()</code> has already run. So the chain is initialise, R1, log R1, R2, log R2, R3, log R3, then R4 and R5 with the return. R3 is three lines that cannot be split: <code>to_numeric(errors=\"coerce\")</code> is the safety net that turns any other text into <code>NaN</code> instead of raising, the mask then rejects both the <code>NaN</code> and the 120.0, and <code>.assign(unit_price=price[keep])</code> puts the numbers back. R4 and R5 come last and report nothing, because they change values and not rows — which is exactly why a tool can forget them and still pass a reconciliation that holds only counts. One honest caveat on the order: on <em>this</em> file R1, R2 and R3 may be run in any order and both the 748 and the log <code>16 5 2</code> come out the same, because each condition judges a row on its own fields and no duplicate line is also a refund or a bad price. That is a measurement, not a theorem — make one duplicate a refund and the counts move between rules while the total stays 748 — so the agreed order is part of the policy.",
          ar: "تتبع كل قاعدةَ سطرُ محاسبتها مباشرة، وهذا الاقتران هو التبعية: فقيمة <code>removed[\"R1\"] = n - len(df)</code> لا تكون 16 إلا إذا كان <code>n</code> لا يزال يحمل 771 وكانت <code>drop_duplicates()</code> قد عملت. فالسلسلة: تهيئة، ثم R1، ثم تسجيل R1، ثم R2، ثم تسجيل R2، ثم R3، ثم تسجيل R3، ثم R4 وR5 مع الإرجاع. وR3 ثلاثة أسطر لا تُفصل: فـ <code>to_numeric(errors=\"coerce\")</code> شبكة الأمان التي تحوّل أي نص آخر إلى <code>NaN</code> بدل أن ترفع خطأً، ثم يرفض القناع <code>NaN</code> و120.0 معًا، وتُعيد <code>.assign(unit_price=price[keep])</code> الأرقام. وتأتي R4 وR5 أخيرًا ولا تُبلغان عن شيء، لأنهما تغيّران القيم لا الصفوف — وهذا بالضبط سبب قدرة أداةٍ على نسيانهما والنجاح مع ذلك في مطابقة لا تحمل إلا أعدادًا. وتحفظ صادق على الترتيب: في <em>هذا</em> الملف يمكن تشغيل R1 وR2 وR3 بأي ترتيب فيخرج 748 والسجل <code>16 5 2</code> نفسهما، لأن كل شرط يحكم على الصف بحقوله وحدها ولا يكون سطر مكرر مرتجعًا ولا سعره خاطئًا. وهذا قياس لا نظرية — اجعل مكررًا واحدًا مرتجعًا فتنتقل الأعداد بين القواعد مع بقاء المجموع 748 — ولهذا فالترتيب المتفق عليه جزء من السياسة."
        }
      },

      /* ---------------------------------------------------------- 05 */
      {
        id: "p1l6q05", type: "compare", level: "medium",
        topics: ["p1-rules-as-data", "p1-per-rule-audit"],
        lang: "python",
        q: {
          en: "Version A writes the five rules down once, in English. Version B writes them as a function that returns two things. Which statement about the pair is correct?",
          ar: "النسخة A تكتب القواعد الخمس مرة واحدة بالكلمات. والنسخة B تكتبها دالةً تُرجع شيئين. أي عبارة عن الزوج صحيحة؟"
        },
        codeA: code(
          "RULES = [",
          '    ("R1", "drop exact duplicate lines",          "all eight columns equal an earlier line"),',
          '    ("R2", "drop refunds (qty <= 0)",             "a refund is not a sale"),',
          '    ("R3", "drop a missing or implausible price", "no price, or above 50"),',
          '    ("R4", "strip spaces, Title Case the item",   "one spelling per menu item"),',
          '    ("R5", \'blank payment -> "Unknown"\',          "a blank is not a payment method"),',
          "]",
          "for rule, what, why in RULES:",
          '    print(f"{rule}  {what:<34} {why}")'
        ),
        codeB: code(
          "def clean(df, max_price=50):",
          '    """Apply R1-R5 in this order. Returns (clean table, lines removed per rule)."""',
          "    removed, n = {}, len(df)",
          "    df = df.drop_duplicates()                                    # R1",
          '    removed["R1"], n = n - len(df), len(df)',
          '    df = df[df["qty"] > 0]                                       # R2',
          '    removed["R2"], n = n - len(df), len(df)',
          '    price = pd.to_numeric(df["unit_price"], errors="coerce")      # R3',
          "    keep = price.notna() & (price <= max_price)",
          "    df = df[keep].assign(unit_price=price[keep])",
          '    removed["R3"], n = n - len(df), len(df)',
          '    return df.assign(item=df["item"].str.strip().str.title(),    # R4',
          '                     payment=df["payment"].fillna("Unknown")), removed   # R5'
        ),
        options: [
          {
            en: "They are two halves of one idea and A is enough on its own: the manager can read A, and the counts B returns can always be recomputed from the file later, so B only saves typing.",
            ar: "هما نصفا فكرة واحدة وA تكفي وحدها: فالمديرة تستطيع قراءة A، وأعداد B يمكن حسابها من الملف لاحقًا على أي حال، فـ B لا توفّر إلا الكتابة."
          },
          {
            en: "B is better, and the reason is the second return value. <code>removed</code> is a sentence every one of the three tools can produce — “R1 removed 16” — so a tool that reports 0 has not applied the rule and you no longer have to guess, where A's list is a comment that nothing keeps in step with the code. What B still cannot report is R4 and R5, because they remove no lines.",
            ar: "B أفضل، والسبب هو القيمة الثانية المُرجَعة. فـ <code>removed</code> جملة تستطيع كل أداة من الثلاث إنتاجها — «حذفت R1 ستة عشر» — فالأداة التي تُبلغ عن صفر لم تطبّق القاعدة ولم تبقَ حاجة إلى التخمين، أما قائمة A فتعليق لا يُبقيه شيء متسقًا مع الشيفرة. وما لا تستطيع B الإبلاغ عنه هو R4 وR5، لأنهما لا تحذفان أسطرًا."
          },
          {
            en: "A is better: five named tuples can be read by someone who writes no code and pasted into the workbook's Rules sheet, while B buries the policy inside a function, so B is the step backwards.",
            ar: "A أفضل: فخمس ثلاثيات مسمّاة يقرؤها من لا يكتب شيفرة ويمكن لصقها في ورقة القواعد في المصنّف، أما B فتدفن السياسة داخل دالة، فـ B هي الخطوة إلى الوراء."
          },
          {
            en: "B is wrong as written: <code>to_numeric(errors=\"coerce\")</code> turns the 120.0 typo into <code>NaN</code>, so R3's count of 2 is an accident and would be 1 on a file whose price column is already numeric.",
            ar: "B خاطئة كما هي مكتوبة: فـ <code>to_numeric(errors=\"coerce\")</code> تحوّل الخطأ الطباعي 120.0 إلى <code>NaN</code>، فعدد R3 البالغ 2 مصادفة وسيكون 1 في ملف عمود سعره رقمي أصلًا."
          }
        ],
        answer: 1,
        hint: {
          en: "Both versions name the rules. Ask which of the two produces something you can hold Excel and Power BI <em>to</em> — and then ask what neither of them can say about R4.",
          ar: "النسختان تسمّيان القواعد. فاسأل: أيّهما يُنتج شيئًا تستطيع <em>محاسبة</em> Excel وPower BI به؟ ثم اسأل: ما لا تستطيع أي منهما قوله عن R4؟"
        },
        explain: {
          en: "A fixes the first defect — the policy exists outside all three tools, with a name and a reason per rule — and leaves the second: nothing connects <code>RULES</code> to the code that cleans, so the two can drift apart, and there is still no number to measure a tool against. B's <code>removed</code> is that number. “R1 removed 16, R2 5, R3 2” is a sentence Excel can produce from its <code>status</code> column and Power Query from its Applied Steps row counts, so a workbook whose R1 column reads 0 is diagnosed in one second — 764 lines and 8,237.00 — instead of hunting through eight helper columns at ten to five. The third option is the tempting one, because “a non-programmer can read it” is a real and good argument, and the answer is that B does not replace A: the rule table stays, pasted into the Rules sheet, and B makes it checkable. The fourth option misreads <code>coerce</code>: it turns non-numeric <em>text</em> into <code>NaN</code>, and 120.0 is a perfectly good number rejected by <code>price &lt;= max_price</code>, so R3 removes 2 for two different reasons. B's own honest gap is the one its own log shows: <code>{'R1': 16, 'R2': 5, 'R3': 2}</code> has no entry for R4 or R5, which is why the reconciliation needs an item count and a blank count as well.",
          ar: "تُصلح A العيب الأول — فتوجد السياسة خارج الأدوات الثلاث، باسم وسبب لكل قاعدة — وتترك الثاني: فلا شيء يربط <code>RULES</code> بالشيفرة التي تنظّف، فيمكن أن يتباعدا، ولا يزال لا يوجد رقم تُقاس به أداة. والقيمة <code>removed</code> في B هي ذلك الرقم. فجملة «حذفت R1 ستة عشر وR2 خمسة وR3 اثنين» جملة يستطيع Excel إنتاجها من عمود <code>status</code> ويستطيع Power Query إنتاجها من أعداد صفوف خطواته المطبَّقة، فيُشخَّص مصنّفٌ عموده R1 صفرٌ في ثانية واحدة — 764 سطرًا و8,237.00 — بدل البحث في ثمانية أعمدة مساعدة في الخامسة إلا عشر دقائق. والخيار الثالث هو المغري، لأن «يستطيع غير المبرمج قراءتها» حجة حقيقية وجيدة، والجواب أن B لا تحلّ محلّ A: فجدول القواعد يبقى، ملصوقًا في ورقة القواعد، وB تجعله قابلًا للفحص. والخيار الرابع يسيء قراءة <code>coerce</code>: فهي تحوّل <em>النص</em> غير الرقمي إلى <code>NaN</code>، و120.0 عدد سليم تمامًا يرفضه <code>price &lt;= max_price</code>، فتحذف R3 سطرين لسببين مختلفين. وثغرة B الصادقة هي ما يُظهره سجلها نفسه: فالقاموس <code>{'R1': 16, 'R2': 5, 'R3': 2}</code> لا مدخل فيه لـ R4 ولا R5، ولهذا تحتاج المطابقة عدد أصناف وعدد فراغات أيضًا."
        }
      },

      /* ---------------------------------------------------------- 06 */
      {
        id: "p1l6q06", type: "fill", level: "easy",
        topics: ["p1-rules-dialects"],
        lang: "text",
        q: {
          en: "Two rows of the three-dialects table, with one cell of each rubbed out. Fill in the pandas method and the Power Query function.",
          ar: "صفّان من جدول اللهجات الثلاث، وقد مُسحت خلية من كل صف. اكتب تابع pandas ودالة Power Query."
        },
        code: code(
          "R1   pandas        df.____1____()",
          '     Excel         the dup_n helper column, then status = "duplicate"',
          "     Power Query   Table.____2____          (Remove Duplicates, all columns)",
          "",
          "R4   pandas        df[\"item\"].str.strip().str.____3____()",
          "     Excel         item_clean = TRIM([@item])      <-- PROPER is missing",
          "     Power Query   Text.Proper(Text.Trim(Text.Clean(_)))"
        ),
        blanks: [
          {
            accept: ["drop_duplicates", "drop_duplicates()"],
            label: { en: "R1 in pandas", ar: "R1 في pandas" }
          },
          {
            accept: ["Distinct", "distinct"],
            label: { en: "R1 in Power Query", ar: "R1 في Power Query" }
          },
          {
            accept: ["title", "Title", "title()"],
            label: { en: "the second half of R4 in pandas", ar: "النصف الثاني من R4 في pandas" }
          }
        ],
        hint: {
          en: "R1 compares whole rows, so its pandas name says “duplicates” and its M name says “distinct”. For R4, the Power Query cell names the two halves in order — strip, then capitalise — and pandas has one string method for each.",
          ar: "تقارن R1 صفوفًا كاملة، فاسمها في pandas يقول «المكرّرات» واسمها في M يقول «المميّز». وفي R4 تسمّي خلية Power Query النصفين بالترتيب — إزالة المسافات ثم تكبير الحروف — ولـ pandas تابع نصّي لكل نصف."
        },
        explain: {
          en: "The grid exists so that a missing cell is visible: every row is one rule and every column is one tool saying the same thing in its own language. <code>df.drop_duplicates()</code> and <code>Table.Distinct</code> both compare <em>whole rows</em> — all eight original columns — which is why adding any column before them (an index, a row number, a timestamp) makes every row unique and removes nothing: 764 lines and 8,237.00. <code>.str.strip().str.title()</code> is R4's two halves, and <code>Text.Proper(Text.Trim(Text.Clean(_)))</code> is the same two in M. The interesting cell is the Excel one, and it is why the table is worth drawing at all: Lesson 4's helper column is <code>TRIM</code> with no <code>PROPER</code>, so Excel implements half of R4 and leaves 19 distinct spellings in a column it can export — and it still reported the right total, because Excel's text criteria ignore letter case. A right answer from a default rather than from the rule is a defect; the fix is <code>item_clean = PROPER(TRIM([@item]))</code>, which matches pandas exactly, including turning the menu's <code>Water 500ml</code> into <code>Water 500Ml</code>.",
          ar: "توجد الشبكة لتكون الخلية الناقصة ظاهرة: فكل صف قاعدة وكل عمود أداة تقول الشيء نفسه بلغتها. و<code>df.drop_duplicates()</code> و<code>Table.Distinct</code> كلتاهما تقارنان <em>صفوفًا كاملة</em> — الأعمدة الثمانية الأصلية كلها — ولهذا فإن إضافة أي عمود قبلهما (فهرسة أو رقم صف أو طابع زمني) تجعل كل صف فريدًا فلا يُحذف شيء: 764 سطرًا و8,237.00. و<code>.str.strip().str.title()</code> هما نصفا R4، و<code>Text.Proper(Text.Trim(Text.Clean(_)))</code> هما النصفان نفسهما في M. والخلية المثيرة هي خلية Excel، وهي سبب رسم الجدول أصلًا: فالعمود المساعد في الدرس 4 فيه <code>TRIM</code> ولا <code>PROPER</code>، أي أن Excel ينفّذ نصف R4 ويترك 19 كتابة مميّزة في عمود يستطيع تصديره — ومع ذلك أبلغ عن المجموع الصحيح، لأن معايير النصوص في Excel لا تميّز حالة الأحرف. والإجابة الصحيحة من افتراض لا من القاعدة عيبٌ؛ والإصلاح هو <code>item_clean = PROPER(TRIM([@item]))</code>، وهي تطابق pandas بالضبط، بما في ذلك تحويل <code>Water 500ml</code> في القائمة إلى <code>Water 500Ml</code>."
        }
      },

      /* ---------------------------------------------------------- 07 */
      {
        id: "p1l6q07", type: "output", level: "medium",
        topics: ["p1-rules-as-data", "p1-failing-check"],
        lang: "python",
        q: {
          en: "A colleague raises <code>MAX_PRICE</code> from 50 to 200, because a legitimately expensive item appeared and the filter got in the way, and re-runs the chapter script on the <em>same</em> September file. Type the four values it prints.",
          ar: "يرفع زميل <code>MAX_PRICE</code> من 50 إلى 200، لأن صنفًا غاليًا مشروعًا ظهر ووقف المرشّح في الطريق، ويعيد تشغيل سكربت الفصل على ملف سبتمبر <em>نفسه</em>. اكتب القيم الأربع التي يطبعها."
        },
        code: code(
          "df, removed = clean(raw, max_price=200)",
          'd = df.assign(line_total=df["qty"] * df["unit_price"])',
          "by_item = d.groupby(\"item\")[\"line_total\"].sum()",
          "",
          'print("  R3 bad price   removed", removed["R3"])',
          'print("clean lines :", len(d))',
          "print(\"revenue     :\", f\"{d['line_total'].sum():,.2f}\")",
          "print(\"  top 1:\", by_item.idxmax(), f\"{by_item.max():,.2f}\")"
        ),
        blanks: [
          {
            accept: ["1"],
            label: { en: "lines R3 removed", ar: "الأسطر التي حذفتها R3" }
          },
          {
            accept: ["749"],
            label: { en: "clean lines", ar: "الأسطر النظيفة" }
          },
          {
            accept: ["8,182.00", "8182.00", "8182.0", "8182"],
            label: { en: "revenue", ar: "الإيراد" }
          },
          {
            accept: ["1,488.00", "1488.00", "1488.0", "1488"],
            label: { en: "the top item's revenue", ar: "إيراد الصنف الأول" }
          }
        ],
        hint: {
          en: "R3 is two clauses, not one. Raising the limit disables only one of them — so ask which of the two lines R3 used to remove is still removed, and what the other one was worth.",
          ar: "R3 شرطان لا شرط واحد. ورفع الحدّ يُطفئ واحدًا منهما فقط — فاسأل: أي السطرين الذين كانت R3 تحذفهما لا يزال محذوفًا، وبكم كان الآخر؟"
        },
        explain: {
          en: "Raising the limit keeps the <code>price.notna()</code> half of R3 and disables the <code>price &lt;= max_price</code> half, so the <code>n/a</code> line is still removed and the Shawarma Wrap typed 120.0 is not: <code>R3 removed 1</code>, 749 clean lines, and the 120.00 joins the revenue — 8,062.00 + 120.00 = 8,182.00, with Shawarma Wrap rising from 1,368.00 to 1,488.00. Read the rule log before the traceback and the diagnosis is already there: <code>R3 removed 1</code>, not 2, is the whole story, and the golden answer then stops the run on <code>AssertionError: lines 749 != 748</code> and exits non-zero. Notice what the change did <em>not</em> touch: R1 still removes 16 and R2 still removes 5, the top three are the same three items in the same order, and the busiest hour is still 12:00 — a loosened threshold is a local defect with a loud signature, which is the best kind. And notice that the colleague's motive was reasonable; the mistake was to edit a threshold in the one place that is also the policy, instead of arguing about the rule and re-reviewing the golden answer.",
          ar: "رفع الحدّ يُبقي نصف R3 الذي هو <code>price.notna()</code> ويُطفئ نصفها الذي هو <code>price &lt;= max_price</code>، فيبقى سطر <code>n/a</code> محذوفًا ولا تبقى الشاورما المكتوبة 120.0 محذوفة: <code>R3 removed 1</code>، و749 سطرًا نظيفًا، وتنضم 120.00 إلى الإيراد — 8,062.00 + 120.00 = 8,182.00، وترتفع Shawarma Wrap من 1,368.00 إلى 1,488.00. واقرأ سجل القواعد قبل التتبع فالتشخيص هناك أصلًا: فجملة <code>R3 removed 1</code> لا 2 هي الحكاية كلها، ثم توقف الإجابة المرجعية التشغيل بـ <code>AssertionError: lines 749 != 748</code> وتخرج برمز غير صفري. ولاحظ ما <em>لم</em> يلمسه التغيير: فـ R1 لا تزال تحذف 16 وR2 لا تزال تحذف 5، والأصناف الثلاثة الأولى هي نفسها بالترتيب نفسه، وأكثر ساعة ازدحامًا لا تزال 12:00 — فالحدّ المُرخى عيبٌ موضعي ببصمة عالية الصوت، وهو أفضل الأنواع. ولاحظ أن دافع الزميل كان معقولًا؛ والخطأ أن يُعدَّل حدٌّ في الموضع الذي هو أيضًا السياسة، بدل مناقشة القاعدة وإعادة مراجعة الإجابة المرجعية."
        }
      },

      /* ---------------------------------------------------------- 08 */
      {
        id: "p1l6q08", type: "mcq", level: "medium",
        topics: ["p1-hour-grain", "p1-three-counts"],
        q: {
          en: "All you are handed is one line of somebody's report: <em>busiest hour: 13:00 with 148</em>. The busiest-hour table of this lesson has four columns — raw lines (13:00 with 155), raw orders (12:00 and 13:00 tied at 119), clean lines (13:00 with 148) and clean orders (12:00 with 119, 13:00 with 117). What can you say about how that line was produced?",
          ar: "كل ما سُلّم إليك سطر واحد من تقرير أحدهم: <em>أكثر ساعة ازدحامًا: 13:00 بـ 148</em>. وجدول أكثر ساعة ازدحامًا في هذا الدرس فيه أربعة أعمدة — الأسطر الخام (13:00 بـ 155)، والطلبات الخام (12:00 و13:00 متعادلتان عند 119)، والأسطر المنظَّفة (13:00 بـ 148)، والطلبات المنظَّفة (12:00 بـ 119 و13:00 بـ 117). فماذا تستطيع أن تقول عن كيفية إنتاج ذلك السطر؟"
        },
        options: [
          {
            en: "The rows were cleaned and the count counted rows: 148 is the clean-lines figure at 13:00, against 144 at 12:00. The cleaning was right and the grain was wrong, and either mistake on its own gets you 13:00.",
            ar: "نُظِّفت الصفوف وعدّ العدُّ الصفوف: فالعدد 148 هو رقم الأسطر المنظَّفة في 13:00 مقابل 144 في 12:00. فالتنظيف كان صحيحًا والحبيبة خاطئة، وأي الخطأين وحده يوصلك إلى 13:00."
          },
          {
            en: "Nothing was cleaned and the count counted rows: 148 is the raw line count at 13:00, which is why it is higher than any of the order counts.",
            ar: "لم يُنظَّف شيء وعدّ العدُّ الصفوف: فالعدد 148 هو عدد الأسطر الخام في 13:00، ولهذا كان أعلى من أي من أعداد الطلبات."
          },
          {
            en: "The rows were cleaned and the count counted distinct orders, so 148 is simply this month's answer; the 12:00 that other people report comes from the raw file, before the rules ran.",
            ar: "نُظِّفت الصفوف وعدّ العدُّ الطلبات المميّزة، فالعدد 148 هو إجابة هذا الشهر ببساطة؛ وأما 12:00 التي يُبلغ عنها آخرون فمن الملف الخام قبل تشغيل القواعد."
          },
          {
            en: "The rows were cleaned and the count counted distinct orders, and 148 is what you get when <code>idxmax()</code> breaks the 12:00 / 13:00 tie in favour of the later hour.",
            ar: "نُظِّفت الصفوف وعدّ العدُّ الطلبات المميّزة، والعدد 148 هو ما تحصل عليه حين يكسر <code>idxmax()</code> تعادل 12:00 و13:00 لصالح الساعة الأخيرة."
          }
        ],
        answer: 0,
        hint: {
          en: "The number itself identifies the column. Find 148 in the table, then read off what that column was counting and whether the rules had run.",
          ar: "الرقم نفسه يحدد العمود. ابحث عن 148 في الجدول، ثم اقرأ ما كان يعدّه ذلك العمود وهل عملت القواعد."
        },
        explain: {
          en: "148 appears in exactly one of the four columns, so the line diagnoses itself: the rules did run (155 would be the raw count) and the count counted rows rather than distinct orders (117 would be the clean order count). That is the pairing the chapter exists to separate — cleaning and grain are two independent mistakes, and either one alone reports 13:00. Cleaning does not help by itself, because 13:00 genuinely has more lines, cleaned or not; counting orders does not help by itself either, because in the raw data 12:00 and 13:00 are <em>tied</em> at 119 and <code>idxmax()</code> would have printed 12 without mentioning the 13 beside it. You need both: clean the rows <em>and</em> count the right thing — <code>nunique()</code>, <code>DISTINCTCOUNT</code>, a <em>Distinct Count</em> value field or the <code>order_first</code> helper column. Only then is there one busiest hour, 12:00 with 119 against 13:00's 117, and the two orders that moved have names: 5001 (the 120.0 typo at 13:43) and 5028 (a refund at 13:45), both single-line orders at 13:00, while 12:00 loses no whole order at all.",
          ar: "يظهر العدد 148 في عمود واحد بالضبط من الأربعة، فالسطر يشخّص نفسه: فالقواعد عملت فعلًا (ولو لم تعمل لكان 155)، وعدّ العدُّ الصفوف لا الطلبات المميّزة (ولو عدّها لكان 117). وهذا هو الاقتران الذي يوجد الفصل ليفصله — فالتنظيف والحبيبة خطآن مستقلان، وأي واحد منهما وحده يُبلغ عن 13:00. والتنظيف وحده لا يفيد، لأن 13:00 فيها أسطر أكثر فعلًا، نُظِّفت أو لم تُنظَّف؛ وعدّ الطلبات وحده لا يفيد أيضًا، لأن 12:00 و13:00 <em>متعادلتان</em> في البيانات الخام عند 119 وكان <code>idxmax()</code> سيطبع 12 دون أن يذكر 13 بجانبها. فأنت تحتاج الأمرين: نظّف الصفوف <em>و</em>عُدَّ الشيء الصحيح — <code>nunique()</code> أو <code>DISTINCTCOUNT</code> أو حقل قيم بـ <em>Distinct Count</em> أو العمود المساعد <code>order_first</code>. وحينها فقط تكون هناك ساعة واحدة أكثر ازدحامًا، 12:00 بـ 119 مقابل 117 للساعة 13:00، والطلبان الذان انتقلا لهما أسماء: 5001 (الخطأ الطباعي 120.0 في 13:43) و5028 (مرتجع في 13:45)، وكلاهما طلب ذو سطر واحد في 13:00، بينما لا تفقد 12:00 أي طلب كامل."
        }
      },

      /* ---------------------------------------------------------- 09 */
      {
        id: "p1l6q09", type: "output", level: "hard",
        topics: ["p1-invisible-rules", "p1-rules-as-data"],
        lang: "python",
        q: {
          en: "R5 removes no lines and moves no money, so what does switching it off actually change? Run the breakdown the rule exists for, with R5 and without — <code>skip=</code> is Concept 4's perturbation switch, which applies the five rules with the named ones turned off. Type the four values.",
          ar: "لا تحذف R5 أسطرًا ولا تحرّك مالًا، فماذا يغيّر إطفاؤها فعلًا؟ شغّل التوزيع الذي توجد القاعدة لأجله، مع R5 وبدونها — و<code>skip=</code> هو مفتاح التشويش في المفهوم 4، وهو يطبّق القواعد الخمس مع إطفاء المسمّى منها. اكتب القيم الأربع."
        },
        code: code(
          "df,   _ = clean(raw)                   # R1-R5, as the lesson defines them",
          'no_r5, _ = clean(raw, skip=("R5",))    # the same five rules, with R5 switched off',
          "",
          'for label, t in [("with R5", df), ("no R5", no_r5)]:',
          '    d = t.assign(line_total=t["qty"] * t["unit_price"])',
          '    by = d.groupby("payment")["line_total"].sum()',
          '    print(f"{label:<8} lines {len(d)}  rows {len(by)}  sum {by.sum():,.2f}")'
        ),
        blanks: [
          {
            accept: ["5"],
            label: { en: "rows in the breakdown, with R5", ar: "صفوف التوزيع، مع R5" }
          },
          {
            accept: ["8,062.00", "8062.00", "8062.0", "8062"],
            label: { en: "sum of the breakdown, with R5", ar: "مجموع التوزيع، مع R5" }
          },
          {
            accept: ["4"],
            label: { en: "rows in the breakdown, without R5", ar: "صفوف التوزيع، بدون R5" }
          },
          {
            accept: ["7,901.00", "7901.00", "7901.0", "7901"],
            label: { en: "sum of the breakdown, without R5", ar: "مجموع التوزيع، بدون R5" }
          }
        ],
        hint: {
          en: "Both runs have the same 748 lines. Ask what <code>groupby</code> does with a row whose key is missing, and then whether the sum of the groups can still be the sum of the table.",
          ar: "في التشغيلين 748 سطرًا نفسها. فاسأل: ماذا يفعل <code>groupby</code> بصفٍّ مفتاحه مفقود؟ ثم: هل يستطيع مجموع الفئات أن يبقى مجموع الجدول؟"
        },
        explain: {
          en: "With R5 the breakdown has five rows — Cash 3,956.50, Card 1,643.50, Wallet 1,551.00, Voucher 750.00 and <code>Unknown</code> 161.00 — and they add up to 8,062.00, the control total of the whole chapter. Without it there are four rows adding to 7,901.00, because <code>groupby</code> drops rows whose key is missing by default: 161.00 of real revenue, on 16 real lines, is simply not in the table, and nothing in the output says so. That is the whole case for a rule that changes no total. Both runs have 748 lines and both report revenue 8,062.00 if you ask for it directly, so every headline number is identical and the reconciliation of Concept 3 would have passed the broken tool; only <code>blank_payment</code> — 0 against 16 — can see the difference, which is why that field is in the row at all. The same disappearing act happens in all three tools: an Excel PivotTable shows a <code>(blank)</code> row only if you go looking for it, and a Power BI visual just leaves the slice out. One honest detail worth checking: the raw file has <em>17</em> blank payments, not 16; the seventeenth is on a refund line that R2 removes first, which is why the reconciliation reports 16.",
          ar: "مع R5 يكون في التوزيع خمسة صفوف — Cash 3,956.50 وCard 1,643.50 وWallet 1,551.00 وVoucher 750.00 و<code>Unknown</code> 161.00 — وتجمع 8,062.00، وهو الإجمالي الضابط للفصل كله. وبدونها تكون أربعة صفوف تجمع 7,901.00، لأن <code>groupby</code> يحذف الصفوف ذات المفاتيح المفقودة افتراضيًّا: فـ 161.00 من الإيراد الحقيقي، على 16 سطرًا حقيقيًّا، غائبة عن الجدول ببساطة، ولا شيء في الناتج يقول ذلك. وهذه هي الحجة كلها لقاعدة لا تغيّر أي مجموع. وفي التشغيلين 748 سطرًا، ويُبلغ كلاهما عن إيراد 8,062.00 إن سألته مباشرة، فتتطابق كل الأرقام الرئيسية وكانت مطابقة المفهوم 3 ستنجح مع الأداة المعطوبة؛ ولا يرى الفرق إلا <code>blank_payment</code> — صفر في مقابل 16 — ولهذا يوجد ذلك الحقل في الصف أصلًا. ويحدث الاختفاء نفسه في الأدوات الثلاث: فالجدول المحوري في Excel يعرض صفّ <code>(blank)</code> إن بحثتَ عنه فقط، والعنصر المرئي في Power BI يُسقط القطعة. وتفصيل صادق يستحق الفحص: في الملف الخام <em>سبعة عشر</em> دفعًا فارغًا لا ستة عشر؛ والسابع عشر على سطر مرتجع تحذفه R2 أولًا، ولهذا تُبلغ المطابقة عن 16."
        }
      },

      /* ---------------------------------------------------------- 10 */
      {
        id: "p1l6q10", type: "trace", level: "medium",
        topics: ["p1-rules-as-data", "p1-lines-in-out"],
        lang: "text",
        q: {
          en: "The step-through of <code>clean()</code> then <code>answer()</code> runs on a twelve-line excerpt of the real file. Below is the excerpt as R1 (one exact duplicate gone) and R2 (one refund gone) leave it, with the hour already read out of <code>order_time</code>, and the widget is stopped on the line marked <code>&lt;--</code>. Type numbers only.",
          ar: "ينفّذ عنصر التتبّع <code>clean()</code> ثم <code>answer()</code> على مقتطف من اثني عشر سطرًا من الملف الحقيقي. وفي الأسفل المقتطف كما تتركه R1 (ذهب تكرار تامّ واحد) وR2 (ذهب مرتجع واحد)، والساعة مقروءة أصلًا من <code>order_time</code>، والعنصر متوقف على السطر المعلَّم بـ <code>&lt;--</code>. اكتب أعدادًا فقط."
        },
        code: code(
          "order_id  item            qty  unit_price  hour",
          "5001      Shawarma Wrap     1     120.0     13",
          "5002      Shawarma Wrap     1      12.0      9",
          "5002      Latte             3       9.0      9",
          "5004      Tea               1       NaN       9",
          "5007      Tea               1       3.0      11",
          "5050      Latte             1       9.0      10",
          "5076      Date Cookie       1       3.5       9",
          "5089      espresso          1       6.0      12",
          "5341      Water 500ml       2       2.0       9",
          "5474      latte             3       9.0      14",
          "",
          "    before = len(df)",
          '    price = pd.to_numeric(df["unit_price"], errors="coerce")   # R3',
          "    keep  = price.notna() & (price <= 50)",
          "    df    = df[keep].assign(unit_price=price[keep])",
          '    removed["R3"] = before - len(df)                           <--'
        ),
        blanks: [
          {
            accept: ["10"],
            label: { en: "<code>before</code>, on the marked line", ar: "<code>before</code> عند السطر المعلَّم" }
          },
          {
            accept: ["2"],
            label: { en: "<code>removed[\"R3\"]</code>, once it has run", ar: "<code>removed[\"R3\"]</code> بعد تنفيذه" }
          },
          {
            accept: ["8"],
            label: { en: "<code>result[\"lines\"]</code>", ar: "<code>result[\"lines\"]</code>" }
          },
          {
            accept: ["91.5", "91.50"],
            label: { en: "<code>result[\"revenue\"]</code>", ar: "<code>result[\"revenue\"]</code>" }
          },
          {
            accept: ["9"],
            label: { en: "<code>result[\"busiest\"]</code>", ar: "<code>result[\"busiest\"]</code>" }
          }
        ],
        hint: {
          en: "<code>keep</code> is <code>False</code> for exactly two of the ten lines, for two different reasons. For the last box, remember that <code>busiest</code> comes from <code>nunique()</code>, so an order with two lines counts once.",
          ar: "قيمة <code>keep</code> هي <code>False</code> لسطرين بالضبط من العشرة، لسببين مختلفين. وللخانة الأخيرة تذكّر أن <code>busiest</code> تأتي من <code>nunique()</code>، فالطلب ذو السطرين يُعدّ مرة واحدة."
        },
        explain: {
          en: "<code>before</code> holds 10, the count after R1 and R2 and before R3 — the running count is what makes the log a number you can hand to another tool. <code>keep</code> rejects two lines for two different reasons: the <code>NaN</code> of order 5004 (the file said <code>n/a</code>, and <code>read_csv</code> turned it into a missing value at load time, so the column arrived as <code>float64</code>) fails <code>notna()</code>, and the 120.0 of order 5001 fails <code>price &lt;= 50</code>. So <code>removed[\"R3\"]</code> is 2 and 12 − 1 − 1 − 2 = 8 lines remain. Their revenue is 12 + 27 + 3 + 9 + 3.5 + 6 + 4 + 27 = 91.50. The busiest hour is 9, and this is the one box where counting carefully matters: hour 9 has <em>four</em> lines left but only <strong>three</strong> distinct orders — 5002 appears twice, once for the Shawarma Wrap and once for the Latte — so <code>nunique()</code> gives 3 while <code>count()</code> would have given 4. That is the chapter's central silent failure in miniature, and the same two functions on the whole file give 748 lines, 8,062.00 and 12:00.",
          ar: "يحمل <code>before</code> القيمة 10، وهي العدد بعد R1 وR2 وقبل R3 — والعدد الجاري هو ما يجعل السجل رقمًا تستطيع تسليمه إلى أداة أخرى. ويرفض <code>keep</code> سطرين لسببين مختلفين: فقيمة <code>NaN</code> في الطلب 5004 (قال الملف <code>n/a</code>، وحوّلها <code>read_csv</code> إلى قيمة مفقودة عند التحميل، فوصل العمود بالنوع <code>float64</code>) ترسب في <code>notna()</code>، وقيمة 120.0 في الطلب 5001 ترسب في <code>price &lt;= 50</code>. فتكون <code>removed[\"R3\"]</code> هي 2، و12 − 1 − 1 − 2 = 8 أسطر تبقى. وإيرادها 12 + 27 + 3 + 9 + 3.5 + 6 + 4 + 27 = 91.50. وأكثر ساعة ازدحامًا هي 9، وهذه هي الخانة الوحيدة التي يهمّ فيها العدّ المتأني: ففي الساعة 9 بقيت <em>أربعة</em> أسطر لكن فيها <strong>ثلاثة</strong> طلبات مميّزة فقط — فالطلب 5002 يظهر مرتين، مرة للشاورما ومرة للاتيه — فتعطي <code>nunique()</code> العدد 3 بينما كان <code>count()</code> سيعطي 4. وهذا هو الإخفاق الصامت المركزي في الفصل مصغَّرًا، والدالتان نفسهما على الملف الكامل تعطيان 748 سطرًا و8,062.00 والساعة 12:00."
        }
      },

      /* ---------------------------------------------------------- 11 */
      {
        id: "p1l6q11", type: "compare", level: "hard",
        topics: ["p1-reconciliation", "p1-tolerance"],
        lang: "python",
        q: {
          en: "Two versions of the reconciliation. Both print RECONCILED on the September file, where all three tools agree. Which statement about the pair is correct?",
          ar: "نسختان من المطابقة. وكلتاهما تطبعان RECONCILED على ملف سبتمبر، حيث تتفق الأدوات الثلاث. أي عبارة عن الزوج صحيحة؟"
        },
        codeA: code(
          "pandas_row = answer(*clean(raw))",
          'excel_row  = {"lines": 748, "revenue": 8062.00, "items": 16, "orders": 611,',
          '              "blank_payment": 0, "top3": ["Shawarma Wrap", "Chicken Rice",',
          '              "Falafel Sandwich"], "busiest": (12, 119),',
          '              "removed": {"R1": 16, "R2": 5, "R3": 2}}',
          "",
          "for field in pandas_row:",
          "    same = pandas_row[field] == excel_row[field]",
          "    print(f\"{field:<14} {'same' if same else 'DIFFERS'}\")"
        ),
        codeB: code(
          "TOL = 0.005                                  # half a piastre",
          'FIELDS = ("lines", "items", "orders", "blank_payment")',
          "",
          "def differences(a, ref, tol=TOL):",
          '    bad = [f"{f} {a[f]}" for f in FIELDS if a[f] != ref[f]]',
          '    if not math.isclose(a["revenue"], ref["revenue"], abs_tol=tol):',
          '        bad.append(f"revenue {a[\'revenue\']:,.2f}")',
          '    if a["top3"] != ref["top3"]:',
          '        bad.append(f"top3 {a[\'top3\'][0]}")',
          '    if a["busiest"] != ref["busiest"]:',
          '        bad.append(f"busiest {a[\'busiest\'][0]}:00")',
          '    return bad + [f"{r} removed {a[\'removed\'][r]} not {ref[\'removed\'][r]}"',
          '                  for r in ("R1", "R2", "R3") if a["removed"][r] != ref["removed"][r]]'
        ),
        options: [
          {
            en: "B is better for one reason, and it is not about money: a row that differs names the field and the value, where A only prints <code>DIFFERS</code>. The <code>==</code> on revenue is harmless, because both sides really are 8,062.00 exactly.",
            ar: "B أفضل لسبب واحد، وهو ليس عن المال: فالصف الذي يختلف يسمّي الحقل والقيمة، أما A فتطبع <code>DIFFERS</code> فقط. والعامل <code>==</code> على الإيراد غير ضار، لأن الطرفين 8,062.00 بالضبط فعلًا."
          },
          {
            en: "A is better: <code>==</code> is the strictest test there is, so A cannot miss anything B would catch, and B's tolerance is exactly how a figure such as 8,237.00 gets waved through.",
            ar: "A أفضل: فـ <code>==</code> أصرم اختبار موجود، فلا تستطيع A أن تفوتها ما ستصطاده B، وتسامح B هو بالضبط كيف يُمرَّر رقم مثل 8,237.00."
          },
          {
            en: "B is better on both counts: money goes through <code>isclose(abs_tol=0.005)</code> while counts stay on <code>==</code>, and a differing row names the field, the value and the rule. So the check is strict enough to catch a missing rule — 0.005 does not forgive 8,237.00, nor even 8,062.01 — and loose enough not to cry wolf over <code>13.19</code> against <code>8062 / 611</code>. What B still cannot fix is that the Excel and Power BI rows are typed in by a human reading two screens.",
            ar: "B أفضل في الأمرين: فالمال يمرّ بـ <code>isclose(abs_tol=0.005)</code> بينما تبقى الأعداد على <code>==</code>، والصف المختلف يسمّي الحقل والقيمة والقاعدة. فصار الفحص صارمًا بما يكفي لاصطياد قاعدة ناقصة — فـ 0.005 لا تغفر 8,237.00 ولا حتى 8,062.01 — ومتسامحًا بما يكفي ليكفّ عن الإنذار الكاذب على <code>13.19</code> في مقابل <code>8062 / 611</code>. وما لا تستطيع B إصلاحه أن صفّي Excel وPower BI يُكتبان بيد إنسان يقرأ شاشتين."
          },
          {
            en: "They are equivalent on this file — both print RECONCILED, and the eight fields are compared in both — so the difference is presentation and not behaviour.",
            ar: "هما متكافئتان في هذا الملف — فكلتاهما تطبعان RECONCILED وتُقارَن الحقول الثمانية في كلتيهما — فالفرق في العرض لا في السلوك."
          }
        ],
        answer: 2,
        hint: {
          en: "Both versions compare all eight fields, so look at <em>how</em> each field is compared. Then ask what each version does on the day a row differs, and what it does on a day when nothing is wrong but the numbers are displayed differently.",
          ar: "النسختان تقارنان الحقول الثمانية، فانظر <em>كيف</em> يُقارن كل حقل. ثم اسأل: ماذا تفعل كل نسخة في اليوم الذي يختلف فيه صف، وماذا تفعل في يوم لا خطأ فيه لكن الأرقام معروضة بصور مختلفة؟"
        },
        explain: {
          en: "A already fixes the worst defect of all — it compares every field, by machine, instead of eyeballing one total — so a wrong busiest hour or a wrong item count can no longer slip past. Two things remain, and B fixes both. <code>==</code> is the wrong operator for money: it works here because both sides happen to be 8,062.00 exactly, but the revenue <em>per order</em> that the two tools display makes <code>13.19 == 8062 / 611</code> come out <code>False</code>, and a check that raises false alarms is a check somebody switches off. And when a field does differ, A says only <code>DIFFERS</code>, where B hands you the diagnosis — “lines 764; revenue 8,237.00; R1 removed 0 not 16” names the tool, the field, the value and the step. The first option is the most tempting because it is half right, and the half it gets wrong is the interesting half: “harmless because both sides are exactly equal” is a property of this field on this file, not of the operator. The second option inverts the argument: a tolerance of 0.005 is not loose — it forgives a difference you could never print and refuses one piastre, so 8,237.00, 8,062.50 and even 8,062.01 all fail. B's own stated cost is the human in the loop: write the two rows down the moment you read them, in the same session, never from yesterday's memory.",
          ar: "تُصلح A أسوأ العيوب أصلًا — فهي تقارن كل حقل بالآلة بدل تأمّل مجموع واحد بالعين — فلم تبقَ ساعة خطأ ولا عدد أصناف خطأ يستطيع التسلل. ويبقى أمران، وB تصلحهما. فالعامل <code>==</code> ليس العامل الصحيح للمال: وهو يعمل هنا لأن الطرفين 8,062.00 بالضبط بالمصادفة، لكن الإيراد <em>لكل طلب</em> الذي تعرضه الأداتان يجعل قيمة <code>13.19 == 8062 / 611</code> هي <code>False</code>، والفحص الذي يطلق إنذارات كاذبة فحصٌ يُطفئه أحدهم. وحين يختلف حقل فعلًا تقول A <code>DIFFERS</code> فقط، أما B فتسلّمك التشخيص — فجملة «lines 764؛ revenue 8,237.00؛ R1 removed 0 not 16» تسمّي الأداة والحقل والقيمة والخطوة. والخيار الأول أكثرها إغراءً لأنه نصف صحيح، والنصف الذي يخطئ فيه هو النصف المثير: فجملة «غير ضار لأن الطرفين متساويان بالضبط» خاصيةُ هذا الحقل في هذا الملف لا خاصيةُ العامل. والخيار الثاني يقلب الحجة: فتسامح 0.005 ليس متراخيًا — إنه يغفر فرقًا لا تستطيع طباعته ويرفض قرشًا واحدًا، فترسب 8,237.00 و8,062.50 وحتى 8,062.01. وثمن B المعلَن هو الإنسان في الحلقة: فاكتب الصفين لحظة قراءتهما، في الجلسة نفسها، ولا تكتبهما من ذاكرة الأمس أبدًا."
        }
      },

      /* ---------------------------------------------------------- 12 */
      {
        id: "p1l6q12", type: "error", level: "hard",
        topics: ["p1-rules-as-data", "p1-invisible-rules"],
        lang: "python",
        q: {
          en: "This <code>clean()</code> runs with no error and its reconciliation row reads <code>lines 748 · revenue 8,062.00 · items 16 · orders 611 · busiest 12:00 · R1 16 R2 5 R3 2</code> — every one of those right — and <code>blank_payment 16</code>. Click the line that is wrong.",
          ar: "تعمل هذه <code>clean()</code> دون خطأ، ويقرأ صفّ مطابقتها <code>lines 748 · revenue 8,062.00 · items 16 · orders 611 · busiest 12:00 · R1 16 R2 5 R3 2</code> — وكلها صحيحة — و<code>blank_payment 16</code>. انقر السطر الخاطئ."
        },
        code: code(
          "def clean(df, max_price=50):",
          '    """Apply R1-R5 in this order. Returns (clean table, lines removed per rule)."""',
          "    removed, n = {}, len(df)",
          "    df = df.drop_duplicates()                                    # R1",
          '    removed["R1"], n = n - len(df), len(df)',
          '    df = df[df["qty"] > 0]                                       # R2',
          '    removed["R2"], n = n - len(df), len(df)',
          '    price = pd.to_numeric(df["unit_price"], errors="coerce")      # R3',
          "    keep = price.notna() & (price <= max_price)",
          "    df = df[keep].assign(unit_price=price[keep])",
          '    removed["R3"], n = n - len(df), len(df)',
          '    df = df.assign(item=df["item"].str.strip().str.title())      # R4',
          '    df["payment"].fillna("Unknown")                              # R5',
          "    return df, removed"
        ),
        answer: 13,
        solution: {
          code: code(
            '    df = df.assign(item=df["item"].str.strip().str.title(),      # R4',
            '                   payment=df["payment"].fillna("Unknown"))      # R5',
            "",
            "# or, equivalently:",
            '#     df["payment"] = df["payment"].fillna("Unknown")',
            "",
            "-> blank_payment 0, and the payment breakdown has five rows summing to 8,062.00"
          ),
          en: "<code>fillna</code> returns a new Series; it does not change the column. Assign it back — as a second keyword of the same <code>assign</code> that does R4, which is how Version 3 writes it.",
          ar: "تُرجع <code>fillna</code> سلسلة جديدة ولا تغيّر العمود. فأعِد إسنادها — وسيطًا ثانيًا في <code>assign</code> نفسها التي تنفّذ R4، وهكذا تكتبها النسخة 3."
        },
        hint: {
          en: "Every number in the row is right except one, so look for the rule that number belongs to — then ask what that line actually does with the value it computes.",
          ar: "كل رقم في الصف صحيح إلا واحدًا، فابحث عن القاعدة التي ينتمي إليها ذلك الرقم — ثم اسأل: ماذا يفعل ذلك السطر فعلًا بالقيمة التي يحسبها؟"
        },
        explain: {
          en: "<code>df[\"payment\"].fillna(\"Unknown\")</code> computes a new Series and throws it away: without <code>inplace=</code> or an assignment, nothing in <code>df</code> changes, and Python raises nothing because an expression statement is perfectly legal. So R5 never runs, and this is the quietest failure in the chapter. Every headline number is untouched — the line count, the revenue, the top three, the busiest hour and all three removal counts — because R5 removes no lines and moves no money. The only witness is <code>blank_payment</code>, which reads 16 instead of 0, and the consequence is downstream: <code>groupby(\"payment\")</code> drops rows whose key is missing, so the payment breakdown has four rows summing to 7,901.00 and 161.00 of real revenue is silently absent from it. Line 12 is the tempting place to click, because it is the line that was edited to make room for the bug, and it is correct: <code>.assign(item=…)</code> does return a new frame and it <em>is</em> assigned back. Line 11 is correct too — <code>removed[\"R3\"]</code> is taken after R3 ran. The rule to carry away is the one the perturbation table teaches: for every rule, ask which number in your table would move if the rule were switched off, and if the answer is “none”, the table needs another column.",
          ar: "تحسب <code>df[\"payment\"].fillna(\"Unknown\")</code> سلسلة جديدة وترميها: فبلا <code>inplace=</code> وبلا إسناد لا يتغير شيء في <code>df</code>، ولا ترفع بايثون شيئًا لأن عبارة التعبير مشروعة تمامًا. فلا تعمل R5 أبدًا، وهذا أهدأ إخفاق في الفصل. فكل رقم رئيسي بلا مساس — عدد الأسطر والإيراد والأصناف الثلاثة الأولى وأكثر ساعة ازدحامًا وأعداد الحذف الثلاثة — لأن R5 لا تحذف أسطرًا ولا تحرّك مالًا. والشاهد الوحيد هو <code>blank_payment</code>، ويقرأ 16 بدل صفر، والنتيجة فيما بعده: فـ <code>groupby(\"payment\")</code> يحذف الصفوف ذات المفاتيح المفقودة، فيكون في توزيع الدفع أربعة صفوف تجمع 7,901.00 وتغيب عنه 161.00 من الإيراد الحقيقي بصمت. والسطر 12 هو الموضع المغري للنقر، لأنه السطر الذي عُدِّل ليُفسح للخلل، وهو صحيح: فـ <code>.assign(item=…)</code> تُرجع إطارًا جديدًا وهو <em>مُسنَد</em> فعلًا. والسطر 11 صحيح أيضًا — فـ <code>removed[\"R3\"]</code> تُؤخَذ بعد عمل R3. والقاعدة التي تُحمَل هي ما يعلّمه جدول التشويش: خُذ كل قاعدة واسأل أي رقم في جدولك سيتحرك لو أُطفئت، فإن كانت الإجابة «لا شيء» فالجدول يحتاج عمودًا آخر."
        }
      },

      /* ---------------------------------------------------------- 13 */
      {
        id: "p1l6q13", type: "error", level: "hard",
        topics: ["p1-hour-grain", "p1-reconciliation"],
        lang: "python",
        q: {
          en: "This is the function that produces one tool's reconciliation row. On the cleaned 748 lines it returns <code>lines 748 · revenue 8,062.00 · items 16 · orders 611 · blank_payment 0 · top3 Shawarma Wrap / Chicken Rice / Falafel Sandwich · R1 16 R2 5 R3 2</code> — all correct — and <code>busiest (13, 148)</code>. Click the line that is wrong.",
          ar: "هذه هي الدالة التي تنتج صفّ المطابقة لأداة واحدة. وعلى الأسطر المنظَّفة 748 تُرجع <code>lines 748 · revenue 8,062.00 · items 16 · orders 611 · blank_payment 0 · top3 Shawarma Wrap / Chicken Rice / Falafel Sandwich · R1 16 R2 5 R3 2</code> — وكلها صحيحة — و<code>busiest (13, 148)</code>. انقر السطر الخاطئ."
        },
        code: code(
          "def answer(df, removed):",
          '    """One tool\'s whole row: the headline numbers, the two quiet ones, and the log."""',
          '    d = df.assign(line_total=df["qty"] * df["unit_price"],',
          '                  hour=pd.to_datetime(df["order_time"]).dt.hour)',
          '    by_item = d.groupby("item")["line_total"].sum().sort_values(ascending=False, kind="stable")',
          '    by_hour = d.groupby("hour")["order_id"].count().sort_values(ascending=False, kind="stable")',
          '    return {"lines": len(d), "revenue": round(float(d["line_total"].sum()), 2),',
          '            "items": int(d["item"].nunique()), "orders": int(d["order_id"].nunique()),',
          '            "blank_payment": int(d["payment"].isna().sum()),',
          '            "top3": list(by_item.head(3).index),',
          '            "busiest": (int(by_hour.index[0]), int(by_hour.iloc[0])),',
          '            "removed": removed}'
        ),
        answer: 6,
        solution: {
          code: code(
            '    by_hour = d.groupby("hour")["order_id"].nunique().sort_values(ascending=False, kind="stable")',
            "",
            "-> busiest (12, 119), with 13:00 second at 117",
            "   the same fix in the other two tools: DISTINCTCOUNT(Orders[order_id]) in DAX,",
            "   a Distinct Count value field or the order_first helper column in Excel"
          ),
          en: "<code>count()</code> counts rows; <code>nunique()</code> counts different values. The question asked for the hour with the most <em>distinct</em> orders, so the measure, not the cleaning, is what has to change.",
          ar: "تعدّ <code>count()</code> الصفوف، وتعدّ <code>nunique()</code> القيم المختلفة. والسؤال طلب الساعة ذات أكثر الطلبات <em>المميّزة</em>، فالمقياس هو ما يجب أن يتغير لا التنظيف."
        },
        hint: {
          en: "Seven of the eight fields are right, so the defect is inside the one line that produces the eighth. Compare that line with the line above it, and with the way <code>orders</code> is computed two lines below.",
          ar: "سبعة من الحقول الثمانية صحيحة، فالعيب داخل السطر الواحد الذي ينتج الثامن. قارن ذلك السطر بالسطر الذي فوقه، وبطريقة حساب <code>orders</code> سطرين تحته."
        },
        explain: {
          en: "<code>.count()</code> on <code>order_id</code> counts the rows in each hour — <code>order_id</code> is never missing, so it is just a line count — and the clean table has 148 lines at 13:00 against 144 at 12:00. <code>nunique()</code> counts <em>different</em> <code>order_id</code> values, and then 12:00 leads 119 to 117. The rows were cleaned correctly and the wrong thing was counted, which is why this row passes every other check: lines, revenue, items, orders and all three rule counts are identical to the reference, and even <code>orders</code> on line 8 is right, because that one does use <code>nunique()</code>. That contrast is the diagnosis: the same frame, the same column, two different functions, two different answers — and one of them silently answers a question nobody asked. Line 5 is the tempting click, because a sum over a group looks like the same kind of thing, but revenue really is a sum over rows and 8,062.00 is right. Line 11 is correct too: <code>index[0]</code> and <code>iloc[0]</code> read the top of an already sorted Series, and <code>kind=\"stable\"</code> is there so that a tie never looks like a change from one run to the next. The fix is the same idea in all three tools — <code>nunique()</code>, <code>DISTINCTCOUNT</code>, or a <em>Distinct Count</em> value field — and it is the single most expensive line in this chapter.",
          ar: "تعدّ <code>.count()</code> على <code>order_id</code> صفوف كل ساعة — فـ <code>order_id</code> لا يكون مفقودًا أبدًا، فهي عدّ أسطر لا أكثر — وفي الجدول النظيف 148 سطرًا في 13:00 مقابل 144 في 12:00. أما <code>nunique()</code> فتعدّ قيم <code>order_id</code> <em>المختلفة</em>، وحينها تتقدم 12:00 بـ 119 على 117. فقد نُظِّفت الصفوف تنظيفًا صحيحًا وعُدَّ الشيء الخطأ، ولهذا ينجح هذا الصف في كل فحص آخر: فالأسطر والإيراد والأصناف والطلبات وأعداد القواعد الثلاثة كلها مطابقة للمرجع، وحتى <code>orders</code> في السطر 8 صحيح، لأن ذاك يستعمل <code>nunique()</code> فعلًا. وهذا التباين هو التشخيص: الإطار نفسه والعمود نفسه ودالتان مختلفتان وإجابتان مختلفتان — وإحداهما تجيب بصمت عن سؤال لم يسأله أحد. والسطر 5 هو النقرة المغرية، لأن المجموع على فئة يبدو من النوع نفسه، لكن الإيراد مجموعٌ على صفوف فعلًا و8,062.00 صحيح. والسطر 11 صحيح أيضًا: فـ <code>index[0]</code> و<code>iloc[0]</code> يقرآن قمة سلسلة مرتَّبة أصلًا، و<code>kind=\"stable\"</code> موجودة لئلا يبدو التعادل تغييرًا من تشغيل إلى تشغيل. والإصلاح هو الفكرة نفسها في الأدوات الثلاث — <code>nunique()</code> أو <code>DISTINCTCOUNT</code> أو حقل قيم بـ <em>Distinct Count</em> — وهو أغلى سطر في هذا الفصل."
        }
      },

      /* ---------------------------------------------------------- 14 */
      {
        id: "p1l6q14", type: "mcq", level: "medium",
        topics: ["p1-per-rule-audit", "p1-diagnose-mismatch"],
        q: {
          en: "Your reconciliation comes back with the Power BI row reading <code>lines 753 · revenue 8,039.00 · items 16 · orders 614 · blank 0 · busiest 12:00 · R1 16 · R2 0 · R3 2</code>, against pandas at 748 and 8,062.00. What is the diagnosis, and what about the revenue is worth saying out loud?",
          ar: "تعود مطابقتك وفيها صفّ Power BI يقرأ <code>lines 753 · revenue 8,039.00 · items 16 · orders 614 · blank 0 · busiest 12:00 · R1 16 · R2 0 · R3 2</code>، في مقابل pandas عند 748 و8,062.00. ما التشخيص، وما الذي يستحق أن يُقال بصوت عالٍ عن الإيراد؟"
        },
        options: [
          {
            en: "R2 is missing — the <code>[qty] &gt; 0</code> filter, or a mask written <code>!= -1</code>. The five refund lines are back, and because they carry −23.00 between them the revenue went <em>down</em>, from 8,062.00 to 8,039.00: a missing rule does not always inflate a total, so “the number looks too big” is not a diagnosis.",
            ar: "R2 ناقصة — مرشّح <code>[qty] &gt; 0</code>، أو قناع مكتوب <code>!= -1</code>. فعادت أسطر المرتجعات الخمسة، ولأنها تحمل بينها −23.00 نزل الإيراد من 8,062.00 إلى 8,039.00: فالقاعدة الناقصة لا تضخّم المجموع دائمًا، ولهذا فجملة «الرقم يبدو كبيرًا جدًّا» ليست تشخيصًا."
          },
          {
            en: "R1 is missing: 753 is 748 plus five of the sixteen duplicated lines, and because duplicates carry +175.00 in total the revenue fell when only some of them came back.",
            ar: "R1 ناقصة: فـ 753 هي 748 زائد خمسة من الأسطر المكررة الستة عشر، ولأن المكررات تحمل +175.00 في مجموعها نزل الإيراد حين عاد بعضها فقط."
          },
          {
            en: "R3 is missing: the line whose price reads <code>n/a</code> is back, and because that line has no price at all it drags the revenue down by 23.00.",
            ar: "R3 ناقصة: فعاد السطر الذي سعره <code>n/a</code>، ولأن ذلك السطر لا سعر له أصلًا فهو يسحب الإيراد إلى الأسفل بمقدار 23.00."
          },
          {
            en: "Nothing is missing. 8,039.00 against 8,062.00 is 0.3%, well inside any sensible tolerance, and <code>orders</code> moving from 611 to 614 is the usual rounding of a distinct count across a model.",
            ar: "لا شيء ناقص. فـ 8,039.00 في مقابل 8,062.00 نسبةُ 0.3%، وهي داخل أي تسامح معقول، وانتقال <code>orders</code> من 611 إلى 614 هو التقريب المعتاد لعدٍّ مميّز عبر نموذج."
          }
        ],
        answer: 0,
        hint: {
          en: "Read the three rule columns before you read anything else; one of them is a zero. Then check the arithmetic of the revenue against that rule, and mind the sign.",
          ar: "اقرأ أعمدة القواعد الثلاثة قبل أي شيء آخر؛ فأحدها صفر. ثم افحص حساب الإيراد في مقابل تلك القاعدة، وراقب الإشارة."
        },
        explain: {
          en: "The rule columns end the search in one second: <code>R2 0</code> where the reference says 5 means “this tool removed no refund lines”, which is a sentence you can act on without opening anything else. Everything else in the row then confirms it: 748 + 5 = 753 lines, and <code>orders</code> rises from 611 to 614 because three of the five refunds were single-line orders that come back whole — a second, independent witness to the same defect. The money is the part worth saying out loud. The five refunds carry −23.00 between them, so keeping them <em>lowers</em> the revenue: 8,062.00 − 23.00 = 8,039.00. Learn the three signatures and you can diagnose from the revenue alone — missing R1 is +175.00 and gives 764 lines and 8,237.00; missing R2 is −23.00; missing R3 is +120.00 and gives 750 lines, 8,182.00 and 613 orders — and option 2 and option 3 are each the right arithmetic attached to the wrong rule, which the rule columns would have ruled out before you started. Option 4 is the dangerous one: a tolerance belongs to money and 23.00 is more than four thousand times 0.005, while counts are compared with <code>==</code> because a distinct count is an integer produced by counting and does not round.",
          ar: "تنهي أعمدة القواعد البحث في ثانية: فقولها <code>R2 0</code> حيث يقول المرجع 5 يعني «لم تحذف هذه الأداة أي سطر مرتجع»، وهي جملة تستطيع العمل بها دون أن تفتح شيئًا آخر. ثم يؤكد كل ما في الصف ذلك: 748 + 5 = 753 سطرًا، وترتفع <code>orders</code> من 611 إلى 614 لأن ثلاثة من المرتجعات الخمسة كانت طلبات ذات سطر واحد تعود كاملة — شاهدٌ ثانٍ مستقل على العيب نفسه. والمال هو الجزء الذي يستحق أن يُقال بصوت عالٍ. فالمرتجعات الخمسة تحمل بينها −23.00، فإبقاؤها <em>يخفض</em> الإيراد: 8,062.00 − 23.00 = 8,039.00. وتعلّم البصمات الثلاث فتستطيع التشخيص من الإيراد وحده — فنقص R1 هو +175.00 ويعطي 764 سطرًا و8,237.00؛ ونقص R2 هو −23.00؛ ونقص R3 هو +120.00 ويعطي 750 سطرًا و8,182.00 و613 طلبًا — والخياران الثاني والثالث كلٌّ منهما حسابٌ صحيح أُلحق بقاعدة خاطئة، وكانت أعمدة القواعد ستستبعده قبل أن تبدأ. والخيار الرابع هو الخطر: فالتسامح للمال و23.00 أكثر من أربعة آلاف ضعف 0.005، أما الأعداد فتُقارن بـ <code>==</code> لأن العدّ المميّز عددٌ صحيح ناتج عن العدّ ولا يُقرَّب."
        }
      },

      /* ---------------------------------------------------------- 15 */
      {
        id: "p1l6q15", type: "multi", level: "hard",
        topics: ["p1-silent-defaults", "p1-invisible-rules"],
        q: {
          en: "Lesson 4's helper column is <code>item_clean = TRIM([@item])</code> — <code>TRIM</code> and no <code>PROPER</code> — so the workbook never implemented half of R4, and it still reported the right top three and the right 693.00 for Latte. Which statements are true? Choose all that apply.",
          ar: "العمود المساعد في الدرس 4 هو <code>item_clean = TRIM([@item])</code> — فيه <code>TRIM</code> ولا <code>PROPER</code> — أي أن المصنّف لم ينفّذ نصف R4 أبدًا، ومع ذلك أبلغ عن الأصناف الثلاثة الأولى صحيحةً وعن 693.00 لـ Latte صحيحةً. أي العبارات صحيحة؟ اختر كل ما ينطبق."
        },
        options: [
          {
            en: "<code>item_clean</code> holds 19 distinct spellings, not 16: <code>TRIM</code> fixed the four lines with stray spaces and left <code>latte</code>, <code>tea</code> and <code>espresso</code> exactly as they were.",
            ar: "يحمل <code>item_clean</code> 19 كتابة مميّزة لا 16: فقد أصلحت <code>TRIM</code> الأسطر الأربعة التي فيها مسافات شاردة وتركت <code>latte</code> و<code>tea</code> و<code>espresso</code> كما هي تمامًا."
          },
          {
            en: "The 693.00 is right because Excel's text criteria ignore letter case, so <code>SUMIFS(…, item_clean, \"Latte\", …)</code> adds <code>latte</code> and <code>Latte</code> together without a <code>PROPER</code> anywhere in the workbook.",
            ar: "القيمة 693.00 صحيحة لأن معايير النصوص في Excel لا تميّز حالة الأحرف، فتجمع <code>SUMIFS(…, item_clean, \"Latte\", …)</code> القيمتين <code>latte</code> و<code>Latte</code> معًا دون أي <code>PROPER</code> في المصنّف."
          },
          {
            en: "Export <code>item_clean</code> to a CSV and load it in pandas or Power BI and the 19 spellings come back, because those tools compare text case-sensitively — so anything downstream of the workbook inherits a defect that Excel itself hid.",
            ar: "صدّر <code>item_clean</code> إلى CSV وحمّله في pandas أو Power BI فتعود الكتابات التسع عشرة، لأن تلك الأدوات تقارن النص مميِّزةً حالة الأحرف — فيرث كل ما بعد المصنّف عيبًا أخفاه Excel نفسه."
          },
          {
            en: "Because the workbook's totals are right, R4 was in effect implemented, so the <code>item_clean</code> formula needs no change and the rule table can record R4 as done in all three tools.",
            ar: "ولأن مجاميع المصنّف صحيحة فقد نُفِّذت R4 فعليًّا، فلا تحتاج صيغة <code>item_clean</code> إلى تغيير ويمكن لجدول القواعد أن يسجّل R4 منجَزةً في الأدوات الثلاث."
          },
          {
            en: "Adding <code>PROPER</code> would repair the column without touching a single name that was already correct, which is why it is the one safe one-word fix in the chapter.",
            ar: "إضافة <code>PROPER</code> تُصلح العمود دون أن تمسّ اسمًا واحدًا كان صحيحًا أصلًا، ولهذا هي الإصلاح الوحيد الآمن بكلمة واحدة في الفصل."
          },
          {
            en: "A reconciliation carrying only the revenue, the top three and the busiest hour would have passed this workbook, which is the reason the row has an <code>items</code> column at all.",
            ar: "المطابقة التي تحمل الإيراد والأصناف الثلاثة الأولى وأكثر ساعة ازدحامًا وحدها كانت ستُنجح هذا المصنّف، وهذا هو سبب وجود عمود <code>items</code> في الصف أصلًا."
          }
        ],
        answer: [0, 1, 2, 5],
        hint: {
          en: "Count what is actually in the column, then ask <em>why</em> the total came out right. Two of the six options are the comfortable conclusions to draw from a right answer — and one of them is about what the obvious fix also does to <code>Water 500ml</code>.",
          ar: "عُدَّ ما في العمود فعلًا، ثم اسأل <em>لماذا</em> خرج المجموع صحيحًا. واثنان من الخيارات الستة هما الاستنتاجان المريحان من إجابة صحيحة — وأحدهما عمّا يفعله الإصلاح الواضح بـ <code>Water 500ml</code> أيضًا."
        },
        explain: {
          en: "Count the column and it holds 19 spellings, both over the 771 raw rows and over the 748 counted ones: <code>TRIM</code> removed the stray spaces from four lines and left the lower-case ones alone. The total was still right for two reasons, one of them luck and one of them a documented default. The luck is that the eight misspelled lines are all Latte, Tea and Espresso and none of those is in the top three, so the headline was never at risk. The default is that Excel's text criteria ignore letter case, so <code>SUMIFS</code> treats <code>latte</code> and <code>Latte</code> as one criterion and returns the full 693.00 — where pandas' <code>groupby</code> compares strings exactly and found 22 items, and Power Query does the same, which is why Lesson 5 had to write <code>Text.Proper</code> as a step. A right answer for the wrong reason is still a defect, which is why the fourth option is wrong even though every number it relies on is right: the column is wrong, the rule is unwritten so nobody can review it, and the behaviour is a default rather than a promise — a case-sensitive comparison in another product, a different locale or an <code>EXACT()</code> in a formula written later, and the number moves. And the honest reconciliation column is a third number: a workbook reporting its <code>items</code> cell truthfully would say <strong>19</strong> — neither the 16 of a tool that applies R4 nor the 22 of a tool that applies none of it. The fifth option is the subtle one: <code>PROPER(TRIM([@item]))</code> matches <code>.str.strip().str.title()</code> exactly, and that includes turning the menu's own correct <code>Water 500ml</code> into <code>Water 500Ml</code> on 76 lines, 75 of which survive cleaning and carry 256.00 that then matches nothing on the raw menu. The fix makes Excel agree with pandas, damage included; the repair with a future is Exercise 6.3's menu lookup.",
          ar: "عُدّ العمود فتجد فيه 19 كتابة، على الصفوف الخام 771 وعلى المعدودة 748 معًا: فقد أزالت <code>TRIM</code> المسافات الشاردة من أربعة أسطر وتركت الكتابات الصغيرة كما هي. وبقي المجموع صحيحًا لسببين، أحدهما حظ والآخر افتراض موثَّق. فالحظ أن الأسطر الثمانية الخاطئة الكتابة كلها Latte وTea وEspresso وليس واحد منها في الثلاثة الأولى، فلم يكن الرقم الرئيسي في خطر أصلًا. والافتراض أن معايير النصوص في Excel لا تميّز حالة الأحرف، فتعامل <code>SUMIFS</code> القيمتين <code>latte</code> و<code>Latte</code> معيارًا واحدًا وتُرجع 693.00 كاملةً — حيث يقارن <code>groupby</code> في pandas السلاسل مقارنةً تامة فوجد 22 صنفًا، ويفعل Power Query ذلك أيضًا، ولهذا اضطر الدرس 5 إلى كتابة <code>Text.Proper</code> خطوةً. والإجابة الصحيحة لسبب خاطئ تبقى عيبًا، ولهذا فالخيار الرابع خاطئ وإن كان كل رقم يستند إليه صحيحًا: فالعمود خاطئ، والقاعدة غير مكتوبة فلا يستطيع أحد مراجعتها، والسلوك افتراض لا وعد — فمقارنة تميّز الحالة في برنامج آخر، أو لغة إقليمية مختلفة، أو <code>EXACT()</code> في صيغة تُكتب لاحقًا، ويتحرك الرقم. وعمود المطابقة الصادق رقمٌ ثالث: فالمصنّف الذي يُبلغ عن خلية <code>items</code> بصدق سيقول <strong>19</strong> — لا 16 التي لأداة تطبّق R4 ولا 22 التي لأداة لا تطبّق منها شيئًا. والخيار الخامس هو الخفيّ: فـ <code>PROPER(TRIM([@item]))</code> تطابق <code>.str.strip().str.title()</code> بالضبط، وهذا يتضمن تحويل كتابة القائمة الصحيحة <code>Water 500ml</code> إلى <code>Water 500Ml</code> في 76 سطرًا، يبقى 75 منها بعد التنظيف وتحمل 256.00 لا تطابق بعدها شيئًا في القائمة الخام. فالإصلاح يجعل Excel يوافق pandas بإفسادها؛ والإصلاح الذي له مستقبل هو البحث في القائمة في التمرين 6.3."
        }
      },

      /* ---------------------------------------------------------- 16 */
      {
        id: "p1l6q16", type: "contrast", level: "medium",
        topics: ["p1-rules-as-data", "p1-golden-answer"],
        q: {
          en: "“Validation rules and a reconciliation are different defences.” Place each statement under the cleaning rules R1–R5, under the golden answer that <code>check()</code> asserts, or under both.",
          ar: "«قواعد التحقق والمطابقة دفاعان مختلفان». ضع كل عبارة تحت قواعد التنظيف R1–R5، أو تحت الإجابة المرجعية التي تؤكّدها <code>check()</code>، أو تحت كلتيهما."
        },
        concepts: [
          { en: "The cleaning rules R1–R5", ar: "قواعد التنظيف R1–R5" },
          { en: "The golden answer and <code>check()</code>", ar: "الإجابة المرجعية و<code>check()</code>" }
        ],
        rows: [
          {
            s: {
              en: "Stops a line whose <code>qty</code> is &minus;1 before it ever reaches the revenue",
              ar: "يوقف السطر الذي <code>qty</code> فيه &minus;1 قبل أن يصل إلى الإيراد أصلًا"
            },
            a: 0
          },
          {
            s: {
              en: "Catches a <code>qty</code> of 3 typed as 30, which leaves all three removal counts and the 748 lines at exactly what they should be",
              ar: "يصطاد كمية 3 كُتبت 30، وهي تُبقي أعداد الحذف الثلاثة والأسطر 748 كما ينبغي بالضبط"
            },
            a: 1
          },
          {
            s: {
              en: "Travels from September to October unchanged; a change to it is itself the thing to review",
              ar: "ينتقل من سبتمبر إلى أكتوبر دون تغيير؛ وتغييره نفسه هو ما يُراجَع"
            },
            a: 0
          },
          {
            s: {
              en: "Belongs to a period: recomputed, re-reviewed and dated each month, with the previous one kept",
              ar: "ينتمي إلى فترة: يُعاد حسابه ومراجعته وتأريخه كل شهر، وتُحفظ السابقة"
            },
            a: 1
          },
          {
            s: {
              en: "Is worth no more than the judgement of the person who wrote it down and reviewed it once",
              ar: "لا يساوي أكثر من حكم الشخص الذي كتبه وراجعه مرة واحدة"
            },
            a: 2
          },
          {
            s: {
              en: "Can be stated once outside the tools and implemented in pandas, Excel and Power Query alike",
              ar: "يمكن أن يُكتب مرة واحدة خارج الأدوات ويُنفَّذ في pandas وExcel وPower Query على السواء"
            },
            a: 0
          },
          {
            s: {
              en: "Turns a number that has moved into a non-zero exit code a scheduler notices",
              ar: "يحوّل رقمًا تحرّك إلى رمز خروج غير صفري يلاحظه المُجدوِل"
            },
            a: 1
          }
        ],
        hint: {
          en: "One defence looks at <em>rows</em> as they go past, one at the <em>totals</em> at the end. Sort the rows by which of those two could possibly see the thing described — and keep one row for the weakness they share.",
          ar: "دفاعٌ ينظر في <em>الصفوف</em> وهي تمرّ، ودفاعٌ ينظر في <em>المجاميع</em> في النهاية. فصنّف العبارات بحسب أي الدفاعين يستطيع أن يرى ما توصفه — وأبقِ عبارة واحدة للضعف المشترك بينهما."
        },
        explain: {
          en: "The rules judge rows, one at a time, on their own fields, so they catch a refund, a duplicate and a missing price — and they can be written once outside every tool and implemented in three dialects, which is the whole of Concept 2. The golden answer judges the totals at the end, so it catches what no row-level rule can see: a quantity of 30 is not a duplicate, not a refund and not a bad price, so the log still reads R1 16, R2 5, R3 2 and the file still leaves 748 lines — it looks perfectly clean — and only the revenue moves, from 8,062.00 to 8,305.00, enough to push Latte at 936.00 into the top three ahead of Falafel Sandwich at 917.00. Because it is a check and not a filter, it carries the things a filter cannot: a tolerance for money, an exit code a scheduler understands, and a date, because a golden answer belongs to a period while the rules belong to the question. The one row that is “both” is the honest one: <code>price &lt;= 50</code> is a number somebody chose by looking, and a golden answer written from a run nobody checked enshrines a bug that every later run will faithfully confirm — which is strictly worse than no check, because now you trust it. The discipline that follows is the same for both: reconcile in three tools first, then freeze, then date the freeze.",
          ar: "تحكم القواعد على الصفوف، صفًّا صفًّا، بحقوله وحدها، فتصطاد مرتجعًا ومكرَّرًا وسعرًا مفقودًا — ويمكن أن تُكتب مرة واحدة خارج كل أداة وتُنفَّذ بثلاث لهجات، وهذا هو المفهوم 2 كله. أما الإجابة المرجعية فتحكم على المجاميع في النهاية، فتصطاد ما لا تستطيع أي قاعدة على مستوى الصف رؤيته: فالكمية 30 ليست تكرارًا ولا مرتجعًا ولا سعرًا خاطئًا، فيبقى السجل R1 16 وR2 5 وR3 2 ويبقى في الملف 748 سطرًا — فيبدو نظيفًا تمامًا — ويتحرك الإيراد وحده، من 8,062.00 إلى 8,305.00، وهو ما يكفي لدفع Latte بـ 936.00 إلى الثلاثة الأولى أمام Falafel Sandwich بـ 917.00. ولأنها فحص لا مرشِّح فهي تحمل ما لا يحمله المرشِّح: تسامحًا للمال، ورمز خروج يفهمه المُجدوِل، وتاريخًا، لأن الإجابة المرجعية تنتمي إلى فترة أما القواعد فتنتمي إلى السؤال. والعبارة الوحيدة التي هي «كلتاهما» هي الصادقة: فـ <code>price &lt;= 50</code> رقم اختاره أحدهم بالنظر، والإجابة المرجعية المكتوبة من تشغيل لم يفحصه أحد تقدّس خللًا سيؤكده كل تشغيل لاحق بإخلاص — وهذا أسوأ قطعًا من لا فحص، لأنك صرتَ تثق به. والانضباط الذي يتبع ذلك واحد في الحالتين: طابِق في ثلاث أدوات أولًا، ثم جمّد، ثم أرّخ التجميد."
        }
      },

      /* ---------------------------------------------------------- 17 */
      {
        id: "p1l6q17", type: "order", level: "easy",
        topics: ["p1-reconcile-sequence", "p1-diagnose-mismatch"],
        q: {
          en: "Put the reconciliation protocol in order, from the written question to the brief.",
          ar: "رتّب بروتوكول المطابقة، من السؤال المكتوب إلى الموجز."
        },
        items: [
          {
            en: "Write the question, the two measures, the grain, the rules R1–R5 and the tolerance down once, before any tool is opened.",
            ar: "اكتب السؤال والمقياسين والحبيبة والقواعد R1–R5 والتسامح مرة واحدة، قبل أن تُفتح أي أداة."
          },
          {
            en: "Each tool applies those same five rules to the same raw file and produces a whole <em>row</em>, not a number: lines, revenue, items, orders, blanks, top three, busiest hour and the lines each rule removed.",
            ar: "تطبّق كل أداة القواعد الخمس نفسها على الملف الخام نفسه وتُنتج <em>صفًّا</em> كاملًا لا رقمًا: الأسطر والإيراد والأصناف والطلبات والفراغات والأصناف الثلاثة الأولى وأكثر ساعة ازدحامًا والأسطر التي حذفتها كل قاعدة."
          },
          {
            en: "Put the three rows in one table and compare them field by field: counts with <code>==</code>, money within 0.005.",
            ar: "ضع الصفوف الثلاثة في جدول واحد وقارنها حقلًا حقلًا: الأعداد بـ <code>==</code>، والمال داخل 0.005."
          },
          {
            en: "On the row that differs, read the per-rule columns first: “R1 removed 0, not 16” names the step, where “Excel is wrong” names nothing.",
            ar: "في الصف الذي يختلف، اقرأ أعمدة القواعد أولًا: فجملة «حذفت R1 صفرًا لا ستة عشر» تسمّي الخطوة، وجملة «Excel خاطئ» لا تسمّي شيئًا."
          },
          {
            en: "Go back to that <em>tool</em>, fix the named step, and run the whole reconciliation again — never average the rows, and never take the two that agree as a majority.",
            ar: "ارجع إلى تلك <em>الأداة</em>، وأصلح الخطوة المسمّاة، وأعد تشغيل المطابقة كلها — ولا توسّط الصفوف أبدًا، ولا تأخذ المتفقين منها أغلبيةً."
          },
          {
            en: "Only once the table says RECONCILED, write the one-page brief, and say in it which tolerance the check was run at.",
            ar: "وحين يقول الجدول RECONCILED فقط، اكتب الموجز من صفحة واحدة، وقل فيه بأي تسامح أُجري الفحص."
          }
        ],
        answer: [0, 1, 2, 3, 4, 5],
        hint: {
          en: "Two things have to be true before any comparison is possible at all, and they are not in the same place. At the other end, ask what the last arrow of the sequence diagram points at — the data, or the tool.",
          ar: "أمران يجب أن يصحّا قبل أن تكون أي مقارنة ممكنة أصلًا، وهما ليسا في موضع واحد. وفي الطرف الآخر اسأل: إلى أي شيء يشير آخر سهم في المخطط التسلسلي — إلى البيانات أم إلى الأداة؟"
        },
        explain: {
          en: "The rules cross the lanes once and the clicks, formulas and steps never cross: that is why the written question and the five rules come first and why all three tools work from the <em>same</em> raw file. Each tool then produces a row rather than a number, because a reconciliation needs every number a tool could get wrong — and two of the eight fields, <code>items</code> and <code>blank_payment</code>, exist only because somebody asked “what change would this table <em>not</em> see?”. The comparison is where a disagreement can be detected at all, and it is deliberately two mechanisms: <code>==</code> for counts, because 748 and 749 are a missing rule, and <code>abs_tol=0.005</code> for money, because <code>13.19</code> and <code>8062 / 611</code> are the same amount shown twice. Then the per-rule columns, and then the direction that matters most: the last arrow of the sequence diagram goes back to the <em>tool</em>, not to the data. Two tools agreeing is not evidence — if the same person wrote the notebook and the query from the same misreading, the two wrong answers would agree perfectly and out-vote the one correct workbook — and averaging 8,062.00 with 8,237.00 gives 8,149.50, a number no tool computed, no rule set would produce and nobody can ever reproduce. The brief comes last, and it names the tolerance, because a check whose result only the author sees is half a check.",
          ar: "تعبر القواعد المسارات مرة واحدة، ولا تعبر النقرات ولا الصيغ ولا الخطوات أبدًا: ولهذا يأتي السؤال المكتوب والقواعد الخمس أولًا، ولهذا تعمل الأدوات الثلاث على الملف الخام <em>نفسه</em>. ثم تُنتج كل أداة صفًّا لا رقمًا، لأن المطابقة تحتاج كل رقم يمكن أن تخطئ فيه أداة — واثنان من الحقول الثمانية، <code>items</code> و<code>blank_payment</code>، لا يوجدان إلا لأن أحدهم سأل: «أي تغيير <em>لن</em> يراه هذا الجدول؟». والمقارنة هي الموضع الذي يمكن فيه كشف الاختلاف أصلًا، وهي آليتان بقصد: <code>==</code> للأعداد، لأن 748 و749 قاعدةٌ ناقصة، و<code>abs_tol=0.005</code> للمال، لأن <code>13.19</code> و<code>8062 / 611</code> مقدار واحد معروض مرتين. ثم أعمدة القواعد، ثم الاتجاه الأهم: فآخر سهم في المخطط التسلسلي يرجع إلى <em>الأداة</em> لا إلى البيانات. واتفاق أداتين ليس دليلًا — فلو كتب الشخص نفسه الدفتر والاستعلام من القراءة الخاطئة نفسها لاتفقت الإجابتان الخاطئتان اتفاقًا تامًّا وتغلّبتا بالأصوات على المصنّف الصحيح الواحد — وتوسيط 8,062.00 مع 8,237.00 يعطي 8,149.50، وهو رقم لم تحسبه أداة، ولن تنتجه مجموعة قواعد، ولا يستطيع أحد إعادة إنتاجه أبدًا. والموجز أخيرًا، ويسمّي التسامح، لأن الفحص الذي لا يرى نتيجته إلا مؤلفه نصف فحص."
        }
      },

      /* ---------------------------------------------------------- 18 */
      {
        id: "p1l6q18", type: "mcq", level: "medium",
        topics: ["p1-brief-headings", "p1-brief-filled"],
        q: {
          en: "Your brief has four of the five headings — ANSWER with numbers, SO WHAT with an action, HOW with the file, the five rules and the removal counts, NEXT with a date and a thing to watch — and no CAVEATS block. Every sentence in it is true. What failure does the missing heading invite, and why do the other four not prevent it?",
          ar: "في موجزك أربعة من العناوين الخمسة — ANSWER بأرقام، وSO WHAT بعمل، وHOW بالملف والقواعد الخمس وأعداد الحذف، وNEXT بموعد وشيء يُراقَب — ولا كتلة CAVEATS. وكل جملة فيه صحيحة. فأي إخفاق يدعو إليه العنوان الغائب، ولماذا لا تمنعه الأربعة الأخرى؟"
        },
        options: [
          {
            en: "The reader cannot tell how far to push the finding, so one month of sales becomes a forecast of demand and then a staffing plan for the term. The other four describe the computation; none of them says that 12:00 beats 13:00 by two orders, or that the first fortnight on its own says 13:00.",
            ar: "لا يستطيع القارئ أن يعرف إلى أي حد يمضي بالنتيجة، فيصير شهر من المبيعات تنبؤًا بالطلب ثم خطةَ توظيف للفصل الدراسي. والأربعة الأخرى تصف الحساب؛ ولا واحد منها يقول إن 12:00 تسبق 13:00 بطلبين، ولا إن النصف الأول من الشهر وحده يقول 13:00."
          },
          {
            en: "Nobody can reproduce the number, because CAVEATS is where the 23 removed lines are listed; without it a colleague who recomputes from the raw file gets 8,334.00 and concludes you were wrong.",
            ar: "لا يستطيع أحد إعادة إنتاج الرقم، لأن CAVEATS هي موضع سرد الأسطر الثلاثة والعشرين المحذوفة؛ وبدونها يحصل الزميل الذي يعيد الحساب من الملف الخام على 8,334.00 ويستنتج أنك مخطئ."
          },
          {
            en: "The reader has no action to take, because CAVEATS is where the recommendation and its size live — “a second till earns its hour between 12:00 and 14:00” belongs there.",
            ar: "لا يكون للقارئ عملٌ يفعله، لأن CAVEATS هي موضع التوصية وحجمها — فجملة «الصندوق الثاني يستحق ساعته بين 12:00 و14:00» تنتمي إليها."
          },
          {
            en: "Nothing is invited: with HOW giving the rules and the counts and NEXT giving a review date, a reader who recomputes gets the same 8,062.00 and can see for herself when the answer expires, so the brief is complete.",
            ar: "لا شيء يُدعى إليه: فمع HOW التي تعطي القواعد والأعداد وNEXT التي تعطي موعد مراجعة، يحصل القارئ الذي يعيد الحساب على 8,062.00 نفسها ويرى بنفسه متى تنتهي صلاحية الإجابة، فالموجز كامل."
          }
        ],
        answer: 0,
        hint: {
          en: "Each heading answers a question the reader would otherwise ask you by email tomorrow. Work out which question is left unanswered, and notice that the removals and the recommendation already have homes.",
          ar: "كل عنوان يجيب عن سؤال سيسألك القارئ إياه بالبريد غدًا لو لم يُجَب. فاستنتج أي سؤال يبقى بلا جواب، ولاحظ أن الحذوف والتوصية لهما موضعان أصلًا."
        },
        explain: {
          en: "CAVEATS answers “how far may I push this?”, and nothing else in the brief can. HOW answers “where did the number come from and what did you throw away?” — that is where the 771 lines, the five rules and <code>R1 -16, R2 -5, R3 -2</code> live, which is what option 2 misplaces. SO WHAT answers “what should I do differently?”, which is where the second till belongs, so option 3 misplaces that. Option 4 is the one worth arguing with, because it is the mistake a careful person makes: it treats reproducibility as calibration. A colleague really can recompute 8,062.00 from the brief, and that is a different thing from knowing that the busiest-hour finding is a two-order margin, that the first fifteen days of the same file make 13:00 busiest by 55 to 54, that refunds were excluded by a business decision worth 23.00, and that sales are not demand. Without those, the first use of the page is a staffing decision for the whole term, taken from a true sentence. Keep the block to four sentences, make each one say a number or a consequence, and never write a caveat you cannot act on: “data may contain errors” is noise, “the price limit of 50 is a judgement” is an invitation to argue with a specific decision.",
          ar: "تجيب CAVEATS عن سؤال «إلى أي حد أستطيع المضي بهذا؟»، ولا يستطيع شيء آخر في الموجز أن يجيبه. وتجيب HOW عن «من أين جاء الرقم وماذا رميت؟» — وهي موضع الأسطر 771 والقواعد الخمس و<code>R1 -16, R2 -5, R3 -2</code>، وهذا ما يُخطئ الخيار الثاني في موضعه. وتجيب SO WHAT عن «ماذا أفعل بشكل مختلف؟»، وهي موضع الصندوق الثاني، فيُخطئ الخيار الثالث في موضعه. والخيار الرابع هو ما يستحق المجادلة، لأنه الخطأ الذي يقع فيه الشخص المتأني: فهو يعامل قابلية إعادة الإنتاج معايرةً. فالزميلة تستطيع فعلًا إعادة حساب 8,062.00 من الموجز، وهذا شيء مختلف عن أن تعرف أن نتيجة أكثر ساعة ازدحامًا هامشها طلبان، وأن أول خمسة عشر يومًا من الملف نفسه تجعل 13:00 الأكثر ازدحامًا بـ 55 مقابل 54، وأن المرتجعات استُبعدت بقرار عمل قيمته 23.00، وأن المبيعات ليست الطلب. وبلا هذه يكون أول استعمال للصفحة قرارَ توظيف للفصل الدراسي كله، مأخوذًا من جملة صحيحة. فأبقِ الكتلة أربع جمل، واجعل كل جملة تقول رقمًا أو نتيجة، ولا تكتب تحفظًا لا تستطيع العمل به: فجملة «قد تحتوي البيانات أخطاءً» ضجيج، وجملة «حدّ السعر 50 حكم» دعوة إلى مناقشة قرار محدَّد."
        }
      },

      /* ---------------------------------------------------------- 19 */
      {
        id: "p1l6q19", type: "complete", level: "medium",
        topics: ["p1-brief-generated", "p1-brief-filled", "p1-caveats"],
        lang: "python",
        q: {
          en: "<code>brief(path)</code> computes every number in the page and only the sentences are written by a person. One line of the CAVEATS block is missing. Which line belongs in the gap?",
          ar: "تحسب <code>brief(path)</code> كل رقم في الصفحة، والجمل وحدها يكتبها شخص. وسطرٌ من كتلة CAVEATS ناقص. أي سطر يلائم الفراغ؟"
        },
        code: code(
          "        f\"3. HOW      Data: {Path(path).name}, {len(raw)} lines, untouched.\",",
          '        "            Rules R1-R5 applied in order: "',
          '        + ", ".join(f"{k} -{v}" for k, v in removed.items()) + f"; {len(d)} lines remain.",',
          '        f"            Checked in three tools ({\', \'.join(tools)}), tolerance 0.005: agree.",',
          '        "4. CAVEATS  Refunds excluded (-23.00) and one line had no price.",',
          "        ____,",
          '        "            Sales are not demand. No cost data, so no profit.",',
          '        "            The price limit of 50 is a judgement, not a measurement.",',
          '        "5. NEXT     Re-run in October from the raw file with the same rules;",'
        ),
        options: [
          { code: '"            One month only; the first fortnight alone says 13:00."' },
          { code: '"            Data may contain errors and should be interpreted with care."' },
          { code: 'f"            Checked in {len(tools)} tools, tolerance 0.005: {verdict}."' },
          { code: 'f"            Busiest hour {hours.index[0]}:00 with {hours.iloc[0]} orders."' }
        ],
        answer: 0,
        solution: {
          code: code(
            '        "4. CAVEATS  Refunds excluded (-23.00) and one line had no price.",',
            '        "            One month only; the first fortnight alone says 13:00.",',
            '        "            Sales are not demand. No cost data, so no profit.",',
            '        "            The price limit of 50 is a judgement, not a measurement.",',
            "",
            "# the four caveats are hard-coded strings on purpose: a caveat is a judgement",
            "# about the world, not a property of the table, and a program cannot discover",
            "# that sales are not demand. The measurement behind this one:",
            "#   1-15 Sep -> 13:00 (55 orders), 12:00 (54);  whole month -> 12:00 (119), 13:00 (117)"
          ),
          en: "A caveat earns its line by carrying a number or a consequence. This one is a measurement, not modesty: the first fifteen days of the same file really do make 13:00 busiest, 55 orders against 54, which is the sentence that stops a two-order margin becoming a year-long staffing decision.",
          ar: "التحفظ يستحق سطره بأن يحمل رقمًا أو نتيجة. وهذا قياس لا تواضع: فأول خمسة عشر يومًا من الملف نفسه تجعل 13:00 الأكثر ازدحامًا فعلًا، 55 طلبًا مقابل 54، وهي الجملة التي تمنع هامشًا من طلبين أن يصير قرار توظيف لسنة."
        },
        hint: {
          en: "Three of the four are true sentences; only one of them is a caveat. Ask of each: does it carry a number the reader can act on, and is it a judgement about the world or a fact about the table?",
          ar: "ثلاث من الأربع جمل صحيحة؛ وواحدة منها فقط تحفظ. فاسأل عن كل واحدة: هل تحمل رقمًا يستطيع القارئ العمل به، وهل هي حكم على العالم أم واقعة عن الجدول؟"
        },
        explain: {
          en: "The missing line is the one that tells the reader how far the busiest-hour finding goes: run the same five rules on the two halves of September and the first half says 13:00 with 55 orders against 54, while the whole month says 12:00 with 119 against 117. A two-order margin on one month is not a stable fact about the cafeteria, and this is the sentence that turns the recommendation into a window — 12:00 to 14:00 — instead of a time. The second option is the caveat people actually write and it is noise: no number, no consequence, nothing a reader can do differently after reading it. The third is a real and important sentence in the wrong place: “checked in three tools, tolerance 0.005” belongs in HOW, where it already is, and a check is not a limitation. The fourth is the ANSWER computed a second time; it reads like humility and says nothing new. And notice what is correct about the whole block: the four caveats are hard-coded strings while every number in HOW is computed — which is the right division of labour, because a caveat is a judgement about the world and no program can discover that sales are not demand, or that there is no cost data so no profit.",
          ar: "السطر الناقص هو الذي يقول للقارئ إلى أي حد تمضي نتيجة أكثر ساعة ازدحامًا: شغّل القواعد الخمس نفسها على نصفي سبتمبر فيقول النصف الأول 13:00 بـ 55 طلبًا مقابل 54، ويقول الشهر كله 12:00 بـ 119 مقابل 117. وهامش طلبين في شهر واحد ليس واقعةً مستقرة عن الكافتيريا، وهذه هي الجملة التي تحوّل التوصية إلى نافذة — من 12:00 إلى 14:00 — بدل وقت. والخيار الثاني هو التحفظ الذي يكتبه الناس فعلًا وهو ضجيج: لا رقم ولا نتيجة ولا شيء يستطيع القارئ أن يفعله بشكل مختلف بعد قراءته. والثالث جملة حقيقية ومهمة في الموضع الخطأ: فجملة «فُحص في ثلاث أدوات بتسامح 0.005» تنتمي إلى HOW وهي فيها أصلًا، والفحص ليس قيدًا. والرابع هو ANSWER محسوبةً مرة ثانية؛ يبدو تواضعًا ولا يقول جديدًا. ولاحظ ما هو صحيح في الكتلة كلها: فالتحفظات الأربعة سلاسل مكتوبة في الشيفرة بينما كل رقم في HOW محسوب — وهذا هو التقسيم الصحيح للعمل، لأن التحفظ حكم على العالم ولا يستطيع برنامج أن يكتشف أن المبيعات ليست الطلب، ولا أن لا بيانات تكلفة فلا ربح."
        }
      },

      /* ---------------------------------------------------------- 20 */
      {
        id: "p1l6q20", type: "write", level: "medium",
        topics: ["p1-golden-answer", "p1-capstone-script", "p1-tolerance"],
        lang: "python",
        q: {
          en: "Version 2 of the capstone's check was three bare <code>assert</code>s with the expected numbers scattered through the code, exact equality on money and no message. Write Version 3's <code>check(res)</code> instead: compare the line count and the busiest-hour list against <code>GOLDEN</code> exactly, the revenue with a tolerance, attach to each assertion the value it actually got, and add the one assertion that catches something no number can show you — that the busiest hour is not a tie (<code>res[\"tie\"]</code> is <code>True</code> when the top two hours have the same count).",
          ar: "كان فحص المشروع الختامي في النسخة 2 ثلاثة <code>assert</code> عارية، أرقامها المتوقعة مبثوثة في الشيفرة، ومقارنةُ المال فيها تامة، وبلا رسالة. اكتب <code>check(res)</code> في النسخة 3 بدلًا منها: قارن عدد الأسطر وقائمة أكثر الساعات ازدحامًا بـ <code>GOLDEN</code> مقارنةً تامة، والإيراد بتسامح، وأرفِق بكل تأكيد القيمة التي حصل عليها فعلًا، وأضف التأكيد الوحيد الذي يصطاد ما لا يستطيع أي رقم أن يُظهره لك — أن أكثر ساعة ازدحامًا ليست تعادلًا (<code>res[\"tie\"]</code> تكون <code>True</code> حين تتساوى أعلى ساعتين في العدد)."
        },
        starter: code(
          "import math",
          "",
          "TOL = 0.005             # half a piastre: money is compared with a tolerance",
          "",
          "# The answer we reconcile against (computed once, reviewed by a person).",
          "GOLDEN = {",
          '    "lines": 748,',
          '    "revenue": 8062.00,',
          '    "busiest": [(12, 119), (13, 117), (11, 99)],',
          "}",
          "",
          "",
          "def check(res):",
          '    """Fail loudly if the result drifts from the golden answer."""'
        ),
        lines: 18,
        checks: [
          {
            re: "assert\\s+res\\s*\\[\\s*[\"']lines[\"']\\s*\\]\\s*==\\s*GOLDEN\\s*\\[\\s*[\"']lines[\"']\\s*\\]",
            label: {
              en: "Assert the line count <em>exactly</em> against <code>GOLDEN[\"lines\"]</code>",
              ar: "أكّد عدد الأسطر <em>مقارنةً تامة</em> بـ <code>GOLDEN[\"lines\"]</code>"
            }
          },
          {
            re: "math\\.isclose\\s*\\(\\s*res\\s*\\[\\s*[\"']revenue[\"']\\s*\\]\\s*,\\s*GOLDEN\\s*\\[\\s*[\"']revenue[\"']\\s*\\]\\s*,\\s*abs_tol\\s*=",
            label: {
              en: "Compare the revenue with <code>math.isclose(..., abs_tol=TOL)</code>",
              ar: "قارن الإيراد بـ <code>math.isclose(..., abs_tol=TOL)</code>"
            }
          },
          {
            re: "assert\\s+math\\.isclose\\s*\\([^)]*\\)\\s*,",
            label: {
              en: "Give the money assertion a message, so a failure says what it got",
              ar: "أعطِ تأكيد المال رسالةً، فيقول الإخفاق على ماذا حصل"
            }
          },
          {
            re: "res\\s*\\[\\s*[\"']busiest[\"']\\s*\\]\\s*==\\s*GOLDEN\\s*\\[\\s*[\"']busiest[\"']\\s*\\]",
            label: {
              en: "Assert the whole busiest-hour list, not just its first hour",
              ar: "أكّد قائمة أكثر الساعات ازدحامًا كاملةً، لا ساعتها الأولى وحدها"
            }
          },
          {
            re: "assert\\s+not\\s+res\\s*\\[\\s*[\"']tie[\"']\\s*\\]",
            label: {
              en: "Assert that the busiest hour is not a tie",
              ar: "أكّد أن أكثر ساعة ازدحامًا ليست تعادلًا"
            }
          }
        ],
        forbid: [
          {
            re: "res\\s*\\[\\s*[\"']revenue[\"']\\s*\\]\\s*==",
            label: {
              en: "exact equality on money, which Concept 3 showed is the wrong operator",
              ar: "المقارنة التامة على المال، وقد أظهر المفهوم 3 أنها العامل الخطأ"
            }
          },
          {
            re: "isclose\\s*\\(\\s*res\\s*\\[\\s*[\"'](lines|orders|items)[\"']",
            label: {
              en: "a tolerance on a count: 748 and 749 lines are not nearly equal, they are a missing rule",
              ar: "تسامحٌ مع عدد: فـ 748 و749 سطرًا ليسا متقاربين بل قاعدةً ناقصة"
            }
          },
          {
            re: "rel_tol",
            label: {
              en: "<code>rel_tol</code> on money: a relative tolerance scales with the number, so 5% would accept 8,237.00",
              ar: "<code>rel_tol</code> مع المال: فالتسامح النسبي يتناسب مع الرقم، فتسامح 5% يقبل 8,237.00"
            }
          }
        ],
        solution: {
          code: code(
            "import math",
            "",
            "TOL = 0.005             # half a piastre: money is compared with a tolerance",
            "",
            "# The answer we reconcile against (computed once, reviewed by a person).",
            "GOLDEN = {",
            '    "lines": 748,',
            '    "revenue": 8062.00,',
            '    "busiest": [(12, 119), (13, 117), (11, 99)],',
            "}",
            "",
            "",
            "def check(res):",
            '    """Fail loudly if the result drifts from the golden answer."""',
            "    assert res[\"lines\"] == GOLDEN[\"lines\"], f\"lines {res['lines']} != {GOLDEN['lines']}\"",
            '    assert math.isclose(res["revenue"], GOLDEN["revenue"], abs_tol=TOL), res["revenue"]',
            '    assert res["busiest"] == GOLDEN["busiest"], res["busiest"]',
            '    assert not res["tie"], "the busiest hour is a tie - report both"'
          ),
          en: "One dictionary holds the whole agreed answer, with a comment saying a person reviewed it. Counts and the hour list are compared exactly; money goes through <code>isclose(abs_tol=TOL)</code>; every assertion carries the value it got, so a failure reads <code>lines 749 != 748</code> and not <code>AssertionError</code>; and the last line checks what no number can show — a tie, which <code>idxmax()</code> would have hidden.",
          ar: "قاموس واحد يحمل الإجابة المتفق عليها كلها، ومعه تعليق يقول إن شخصًا راجعها. وتُقارن الأعداد وقائمة الساعات مقارنةً تامة؛ ويمرّ المال بـ <code>isclose(abs_tol=TOL)</code>؛ ويحمل كل تأكيد القيمة التي حصل عليها، فيقرأ الإخفاق <code>lines 749 != 748</code> لا <code>AssertionError</code>؛ ويفحص السطر الأخير ما لا يستطيع أي رقم إظهاره — التعادل، وكان <code>idxmax()</code> سيخفيه."
        },
        hint: {
          en: "Four assertions, and each one answers a different objection to Version 2. Two of them are about <em>which operator</em> (a count is not money), one is about what the failure message says, and one is about something that is not a number at all.",
          ar: "أربعة تأكيدات، وكل واحد يجيب اعتراضًا مختلفًا على النسخة 2. اثنان عن <em>أي عامل</em> (فالعدد ليس مالًا)، وواحد عمّا تقوله رسالة الإخفاق، وواحد عن شيء ليس رقمًا أصلًا."
        },
        explain: {
          en: "Version 2 raised <code>AssertionError</code> and exited non-zero, which already beats printing four numbers and exiting 0 whatever they are — a scheduler cannot see a halved revenue in an exit code of 0. Version 3 fixes the three things left. The agreed answer lives in one reviewed dictionary, so a human can read it, challenge it and date it, instead of hunting for literals in the code. Money goes through <code>isclose(abs_tol=TOL)</code> while counts and names stay on <code>==</code>, which is the pairing of Concept 3: <code>== 8062.00</code> on a float is the operator that cries wolf, and a tolerance on a line count is the one that quietly accepts a missing rule. Every assertion carries the value it got, so the failure reads <code>AssertionError: lines 749 != 748</code> — which, together with the rule log two lines above it (<code>R3 removed 1</code>, not 2), is a diagnosis and not an alarm. And the last assertion checks something that is not in any number: a tie. In the raw data 12:00 and 13:00 both have 119 distinct orders, and <code>idxmax()</code> would have reported 12:00 without a word about the 13:00 beside it. What this still costs is real: a golden answer is only as good as its review, so write it from a run you have reconciled in three tools, freeze it, date it — and break it once on purpose, because a check you have never seen fail is a check you do not know works.",
          ar: "كانت النسخة 2 ترفع <code>AssertionError</code> وتخرج برمز غير صفري، وهذا أفضل أصلًا من طباعة أربعة أرقام والخروج بـ 0 أيًّا كانت — فالمُجدوِل لا يرى إيرادًا انخفض إلى النصف في رمز خروج 0. وتُصلح النسخة 3 الأمور الثلاثة الباقية. فالإجابة المتفق عليها تسكن قاموسًا واحدًا مُراجَعًا، فيستطيع إنسان أن يقرأه ويجادله ويؤرّخه، بدل البحث عن قيم حرفية في الشيفرة. ويمرّ المال بـ <code>isclose(abs_tol=TOL)</code> بينما تبقى الأعداد والأسماء على <code>==</code>، وهذا هو اقتران المفهوم 3: فـ <code>== 8062.00</code> على عدد عائم هو العامل الذي يطلق الإنذار الكاذب، والتسامح مع عدد أسطر هو الذي يقبل بهدوء قاعدةً ناقصة. ويحمل كل تأكيد القيمة التي حصل عليها، فيقرأ الإخفاق <code>AssertionError: lines 749 != 748</code> — وهو مع سجل القواعد سطرين فوقه (<code>R3 removed 1</code> لا 2) تشخيصٌ لا جرس إنذار. ويفحص التأكيد الأخير شيئًا ليس في أي رقم: التعادل. فـ 12:00 و13:00 كلتاهما فيها 119 طلبًا مميّزًا في البيانات الخام، وكان <code>idxmax()</code> سيُبلغ عن 12:00 دون كلمة عن 13:00 بجانبها. وما يكلّفه هذا حقيقي: فالإجابة المرجعية لا تساوي أكثر من مراجعتها، فاكتبها من تشغيل طابقته في ثلاث أدوات، وجمّدها، وأرّخها — واكسرها مرة متعمِّدًا، فالفحص الذي لم ترَه يفشل قطُّ فحصٌ لا تعرف أنه يعمل."
        }
      },

      /* ---------------------------------------------------------- 21 */
      {
        id: "p1l6q21", type: "tf", level: "easy",
        topics: ["p1-failing-check", "p1-capstone-script"],
        q: {
          en: "Next month's draft file arrives with one typo: a <code>qty</code> of 3 typed as 30. Claim: <em>the rule log will show it</em> — one of <code>R1</code>, <code>R2</code> or <code>R3</code> will report a different count, because a quantity of 30 in a cafeteria is implausible and R3 is the plausibility rule. True or false?",
          ar: "يصل ملف الشهر القادم المسوَّد وفيه خطأ طباعي واحد: كمية 3 كُتبت 30. والادعاء: <em>سيُظهره سجل القواعد</em> — فستُبلغ إحدى <code>R1</code> أو <code>R2</code> أو <code>R3</code> عن عدد مختلف، لأن كمية 30 في كافتيريا غير معقولة وR3 هي قاعدة المعقولية. صح أم خطأ؟"
        },
        truth: false,
        hint: {
          en: "Take the three rules one at a time and ask whether a quantity of 30 trips any of their conditions. Then ask which of the eight fields of the reconciliation row can move at all.",
          ar: "خُذ القواعد الثلاث واحدة واحدة واسأل: هل تُسقِط كمية 30 أي شرط من شروطها؟ ثم اسأل: أي حقل من حقول صفّ المطابقة الثمانية يستطيع أن يتحرك أصلًا؟"
        },
        explain: {
          en: "False, and this is exactly why a rule set and a golden answer are two different defences. A quantity of 30 is not a duplicate of an earlier line, it is not a refund (<code>qty &gt; 0</code> passes it) and it is not a bad price, so the log still reads <code>R1 16, R2 5, R3 2</code> and the file still leaves 748 clean lines — it looks perfectly clean. Only the revenue moves: 27 extra units at 9.00 is 243.00, so the script prints 8,305.00, and it moves enough to change the answer the manager reads, because Latte rises from 693.00 to 936.00 and overtakes Falafel Sandwich at 917.00 in the top three. Without the golden answer that run produces a plausible-looking brief and nobody notices; with it, <code>check()</code> stops on <code>AssertionError: 8305.0</code> and exits non-zero, so a scheduler reports a failure. The claim is tempting because R3 <em>is</em> a plausibility rule — but it is a plausibility rule about <code>unit_price</code>, and nobody ever wrote one for <code>qty</code>. Validation rules look at rows as they pass; a reconciliation looks at the totals at the end. You need both, and the way to know the second one works is to break something on purpose and read what comes out.",
          ar: "خطأ، وهذا بالضبط سبب كون مجموعة القواعد والإجابة المرجعية دفاعين مختلفين. فالكمية 30 ليست تكرارًا لسطر سابق، وليست مرتجعًا (فشرط <code>qty &gt; 0</code> يمرّرها)، وليست سعرًا خاطئًا، فيبقى السجل <code>R1 16, R2 5, R3 2</code> ويبقى في الملف 748 سطرًا نظيفًا — فيبدو نظيفًا تمامًا. ويتحرك الإيراد وحده: فسبع وعشرون وحدة إضافية بـ 9.00 تساوي 243.00، فيطبع السكربت 8,305.00، ويتحرك بما يكفي لتغيير الإجابة التي تقرؤها المديرة، لأن Latte ترتفع من 693.00 إلى 936.00 وتسبق Falafel Sandwich بـ 917.00 في الثلاثة الأولى. وبلا الإجابة المرجعية يُنتج ذلك التشغيل موجزًا يبدو معقولًا ولا يلاحظ أحد؛ ومعها يتوقف <code>check()</code> عند <code>AssertionError: 8305.0</code> ويخرج برمز غير صفري، فيُبلّغ المُجدوِل عن إخفاق. والادعاء مغرٍ لأن R3 قاعدة معقولية <em>فعلًا</em> — لكنها قاعدة معقولية عن <code>unit_price</code>، ولم يكتب أحد قاعدةً لـ <code>qty</code> قطُّ. فقواعد التحقق تنظر في الصفوف وهي تمرّ، والمطابقة تنظر في المجاميع في النهاية. وأنت تحتاج الأمرين، والسبيل إلى معرفة أن الثاني يعمل هو أن تكسر شيئًا متعمِّدًا وتقرأ ما يخرج."
        }
      },

      /* ---------------------------------------------------------- 22 */
      {
        id: "p1l6q22", type: "fill", level: "medium",
        topics: ["p1-rerun-next-month", "p1-lines-in-out", "p1-hour-grain"],
        lang: "text",
        q: {
          en: "<code>period_rows()</code> applies the same five rules to the two halves of September and to the whole month. Three cells of the middle row have been rubbed out. Fill them in from the rows above and below, and give the hour the second half reports as busiest.",
          ar: "تطبّق <code>period_rows()</code> القواعد الخمس نفسها على نصفي سبتمبر وعلى الشهر كله. ومُسحت ثلاث خلايا من الصف الأوسط. اكتبها من الصفين فوقه وتحته، وأعطِ الساعة التي يُبلغ النصف الثاني أنها الأكثر ازدحامًا."
        },
        code: code(
          "     period  lines_in  lines  revenue           top1      busiest   R1  R2  R3",
          "   1-15 Sep       379    363   3820.5  Shawarma Wrap   13:00 (55)  11   3   2",
          "  16-30 Sep       392  ____1____  ____2____  Shawarma Wrap  ____3____:00 (65)  ____4____   2   0",
          " whole month      771    748   8062.0  Shawarma Wrap  12:00 (119)  16   5   2"
        ),
        blanks: [
          {
            accept: ["385"],
            label: { en: "clean lines, 16&ndash;30 Sep", ar: "الأسطر النظيفة، 16&ndash;30 سبتمبر" }
          },
          {
            accept: ["4241.5", "4241.50", "4,241.50", "4,241.5"],
            label: { en: "revenue, 16&ndash;30 Sep", ar: "الإيراد، 16&ndash;30 سبتمبر" }
          },
          {
            accept: ["12"],
            label: { en: "busiest hour, 16&ndash;30 Sep", ar: "أكثر ساعة ازدحامًا، 16&ndash;30 سبتمبر" }
          },
          {
            accept: ["5"],
            label: { en: "lines R1 removed, 16&ndash;30 Sep", ar: "الأسطر التي حذفتها R1، 16&ndash;30 سبتمبر" }
          }
        ],
        hint: {
          en: "Every count in this table is an addition you can check without the file: the two halves must make the month, rule by rule. For the hour, the whole month is 12:00 and the first half is not — so what has to be true of the second?",
          ar: "كل عدد في هذا الجدول جمعٌ تستطيع فحصه بلا الملف: فالنصفان يجب أن يصنعا الشهر، قاعدةً قاعدةً. وأما الساعة فالشهر كله 12:00 والنصف الأول ليس كذلك — فماذا يجب أن يصحّ عن الثاني؟"
        },
        explain: {
          en: "Every column of this table is a <span class=\"term\">control total</span> computed a second, independent way: 379 + 392 = 771, 363 + 385 = 748, 3,820.50 + 4,241.50 = 8,062.00, and the rule counts too — 11 + 5 = 16, 3 + 2 = 5, 2 + 0 = 2. That is why the missing cells can be filled without opening the file, and it is a real check, not an exercise: an off-by-one in a <code>between</code> on timestamps is exactly the kind of bug it catches instantly. It also says something about the rules themselves — because each of R1, R2 and R3 judges a row on its own fields, splitting the file splits their counts cleanly; a rule that compared a row with its neighbours would not add up, and that failure would itself be the diagnosis. The busiest hour is the column that does <em>not</em> add up, and that is the point: the two halves disagree, 13:00 in the first and 12:00 in the second, and the whole-month answer of 12:00 with 119 against 13:00's 117 is a two-order margin. So “12:00 is the busiest hour” is true of September and is not a stable fact about the cafeteria — which is the measurement behind the caveat in the brief, the reason the recommendation is a window rather than a time, and the reason the golden answer belongs to a period while the rules belong to the question.",
          ar: "كل عمود في هذا الجدول <span class=\"term\">إجمالي ضابط</span> محسوبٌ بطريق ثانٍ مستقل: فـ 379 + 392 = 771، و363 + 385 = 748، و3,820.50 + 4,241.50 = 8,062.00، وأعداد القواعد كذلك — 11 + 5 = 16، و3 + 2 = 5، و2 + 0 = 2. ولهذا يمكن ملء الخلايا الناقصة دون فتح الملف، وهو فحص حقيقي لا تمرين: فخطأ بمقدار واحد في <code>between</code> على طوابع زمنية هو بالضبط نوع الخلل الذي يصطاده فورًا. وهو يقول شيئًا عن القواعد نفسها أيضًا — فلأن كل واحدة من R1 وR2 وR3 تحكم على الصف بحقوله وحدها، فإن شطر الملف يشطر أعدادها شطرًا نظيفًا؛ والقاعدة التي تقارن الصف بجيرانه لن تتجمّع، وذلك الإخفاق نفسه هو التشخيص. وأكثر ساعة ازدحامًا هي العمود الذي <em>لا</em> يتجمّع، وهذا هو المقصد: فالنصفان يختلفان، 13:00 في الأول و12:00 في الثاني، وإجابة الشهر كله 12:00 بـ 119 مقابل 117 للساعة 13:00 هامشها طلبان. فجملة «12:00 أكثر ساعة ازدحامًا» صحيحة في سبتمبر وليست واقعة مستقرة عن الكافتيريا — وهذا هو القياس الذي وراء التحفظ في الموجز، وسبب كون التوصية نافذةً لا وقتًا، وسبب انتماء الإجابة المرجعية إلى فترة وانتماء القواعد إلى السؤال."
        }
      },

      /* ---------------------------------------------------------- 23 */
      {
        id: "p1l6q23", type: "multi", level: "hard",
        topics: ["p1-tool-decision-tree", "p1-tool-costs"],
        q: {
          en: "Which statements about choosing a tool, and about what each tool actually cost on these 771 lines, are true? Choose all that apply.",
          ar: "أي العبارات عن اختيار الأداة، وعمّا كلّفته كل أداة فعلًا على هذه الأسطر 771، صحيحة؟ اختر كل ما ينطبق."
        },
        options: [
          {
            en: "“Will it run again?” is the first of the six questions, because a one-off answer may be produced any way that gets it right today while a recurring one has to survive you.",
            ar: "سؤال «هل ستتكرر؟» هو أول الأسئلة الستة، لأن الإجابة لمرة واحدة يمكن إنتاجها بأي طريقة تصيبها اليوم، أما المتكررة فعليها أن تبقى بعدك."
          },
          {
            en: "Excel was the only tool where the cleaning is visible beside the data: the <code>status</code> column labels all 771 rows with a reason and deletes none, so 748 + 16 + 5 + 1 + 1 must add up to 771 or a row has escaped — and a reader who writes no code can audit it.",
            ar: "Excel هي الأداة الوحيدة التي يكون التنظيف فيها مرئيًّا بجانب البيانات: فعمود <code>status</code> يعلّم الصفوف 771 كلها بسبب ولا يحذف منها شيئًا، فيجب أن تجمع 748 + 16 + 5 + 1 + 1 إلى 771 وإلا فقد أفلت صف — ويستطيع قارئ لا يكتب شيفرة أن يدقّقه."
          },
          {
            en: "Power BI's Applied Steps row counts are a per-step audit you can click through and Refresh replays them on next month's file — and the same model that records the recipe is the one in which a single click on a field's drop-down turned 8,062.00 into 10.78 under a card that was still headed correctly.",
            ar: "أعداد صفوف الخطوات المطبَّقة في Power BI تدقيقٌ لكل خطوة تستطيع التنقّل فيه بالنقر، ويعيد Refresh تشغيلها على ملف الشهر القادم — والنموذج الذي يسجّل الوصفة هو النموذج نفسه الذي حوّلت فيه نقرةٌ واحدة على قائمة حقل القيمة 8,062.00 إلى 10.78 تحت بطاقة لا يزال عنوانها صحيحًا."
          },
          {
            en: "pandas is the right answer whenever the question will run again, because only a script can be asserted and only a script can be diffed and reviewed; a workbook is never the correct choice for recurring work.",
            ar: "pandas هي الإجابة الصحيحة كلما كان السؤال سيتكرر، لأن السكربت وحده يمكن تأكيده ومقارنته ومراجعته؛ والمصنّف ليس الاختيار الصحيح للعمل المتكرر أبدًا."
          },
          {
            en: "Because all three tools agreed on 8,062.00, each tool's strengths and its costs are independent of one another: Power BI happens to record the recipe and happens, separately, to hide an assumption.",
            ar: "ولأن الأدوات الثلاث اتفقت على 8,062.00 فإن مزايا كل أداة وتكاليفها مستقلة بعضها عن بعض: فـ Power BI يصادف أن يسجّل الوصفة ويصادف، منفصلًا عن ذلك، أن يخفي افتراضًا."
          },
          {
            en: "pandas was the only tool here that silently turned the text <code>n/a</code> into <code>NaN</code> at load time, so its most convenient default is also its quietest one.",
            ar: "pandas هي الأداة الوحيدة هنا التي حوّلت النص <code>n/a</code> بصمت إلى <code>NaN</code> عند التحميل، فأكثر افتراضاتها راحةً هو أهدؤها أيضًا."
          }
        ],
        answer: [0, 1, 2, 5],
        hint: {
          en: "Four of the six are things that actually happened in this chapter. Of the other two, one ignores the last question of the flowchart and the thing that overrides the whole chart, and the other denies a relationship the chapter states about every tool.",
          ar: "أربعة من الستة أمور حدثت فعلًا في هذا الفصل. وأما الاثنان الآخران فأحدهما يتجاهل السؤال الأخير في المخطط والشيء الذي يتقدّم على المخطط كله، والآخر ينفي علاقة يقولها الفصل عن كل أداة."
        },
        explain: {
          en: "The order of the six questions is the content: “will it run again?” first, because it changes everything; “do others click and filter it?” before “does it need code?”, because who consumes the result is a harder constraint than how it is produced; and “does it feed a model or a test?” last, where a yes closes every other branch. Nothing in the chart asks which tool you know best. The fourth option is wrong for two reasons the lesson states out loud: the last question — “does a colleague edit the numbers?” — sends work back to Excel on purpose, because a budget a department head must change in place is an Excel job and putting it in a script makes it worse; and three things override the chart entirely, of which the first is who will maintain it — the theoretically right pandas script is the wrong answer if you leave in June and nobody else writes Python. The fifth option denies the pattern that holds for all three: each tool's strength and its cost are the same property seen from two sides. Excel shows the cleaning beside the data <em>because</em> the rules are in cells, which is also why nothing in the workbook defines “duplicate”, and why it got R4 right by a case-insensitive default while leaving 19 spellings in the column it exports. Power BI records the recipe <em>because</em> the model owns the transformation, which is also how the model can hide an assumption — and why a step in the wrong order turned 748 into 764. pandas can be asserted <em>because</em> everything is text, which is also why the manager cannot read it and always needs a second artefact, the brief.",
          ar: "ترتيب الأسئلة الستة هو المضمون: «هل ستتكرر؟» أولًا لأنه يغيّر كل شيء؛ و«هل ينقر آخرون ويصفّون؟» قبل «هل تحتاج شيفرة؟» لأن من يستهلك النتيجة قيدٌ أصعب من كيفية إنتاجها؛ و«هل تغذّي نموذجًا أو اختبارًا؟» أخيرًا، و«نعم» فيه تُغلق كل فرع آخر. ولا شيء في المخطط يسأل أي أداة تعرفها أكثر. والخيار الرابع خاطئ لسببين يقولهما الدرس بصوت عالٍ: فالسؤال الأخير — «هل يعدّل زميل الأرقام؟» — يرسل العمل إلى Excel بقصد، لأن الميزانية التي يجب أن يستطيع رئيس قسم تغييرها في موضعها مهمةُ Excel ووضعها في سكربت يجعلها أسوأ؛ وثلاثة أمور تتقدّم على المخطط كله، أولها من سيصونه — فسكربت pandas الصحيح نظريًّا هو الإجابة الخاطئة إن سافرتَ في يونيو ولا يكتب غيرك بايثون. والخيار الخامس ينفي النمط الذي يصحّ على الثلاث: فقوة كل أداة وكلفتها هما الخاصية نفسها منظورًا إليها من وجهين. فيعرض Excel التنظيف بجانب البيانات <em>لأن</em> القواعد في خلايا، وهذا أيضًا سبب عدم وجود شيء في المصنّف يعرّف «المكرر»، وسبب إصابته R4 بافتراض لا يميّز الحالة مع تركه 19 كتابة في العمود الذي يصدّره. ويسجّل Power BI الوصفة <em>لأن</em> النموذج يملك التحويل، وهكذا أيضًا يستطيع النموذج إخفاء افتراض — ولهذا حوّلت خطوة في غير موضعها 748 إلى 764. ويمكن تأكيد pandas <em>لأن</em> كل شيء نص، وهذا أيضًا سبب عجز المديرة عن قراءته وحاجته الدائمة إلى صناعة ثانية هي الموجز."
        }
      },

      /* ---------------------------------------------------------- 24 */
      {
        id: "p1l6q24", type: "tf", level: "easy",
        topics: ["p1-two-tools", "p1-tool-decision-tree"],
        q: {
          en: "One branch of the flowchart ends in <em>pandas, then Power BI</em>: the script owns the five rules, the counts and the golden answer, and the report connects to the clean table instead of the raw file, so the Applied Steps list shrinks to almost nothing. Claim: <em>because the cleaning now lives in exactly one place, the report can no longer show a stale or wrong number.</em> True or false?",
          ar: "ينتهي فرع من المخطط بـ <em>pandas ثم Power BI</em>: فالسكربت يملك القواعد الخمس والأعداد والإجابة المرجعية، ويتصل التقرير بالجدول النظيف بدل الملف الخام، فتتقلّص قائمة الخطوات المطبَّقة إلى ما يشبه الصفر. والادعاء: <em>ولأن التنظيف يسكن الآن موضعًا واحدًا بالضبط فلا يستطيع التقرير أن يعرض رقمًا متقادمًا ولا خاطئًا بعد اليوم.</em> صح أم خطأ؟"
        },
        truth: false,
        hint: {
          en: "The report no longer refreshes against the raw file. Ask what it <em>does</em> refresh against, and what has to happen first for that thing to be this month's.",
          ar: "لم يعد التقرير يُحدَّث في مقابل الملف الخام. فاسأل: في مقابل ماذا <em>يُحدَّث</em>، وما الذي يجب أن يحدث أولًا ليكون ذلك الشيء لهذا الشهر؟"
        },
        explain: {
          en: "False. The split really does remove one whole failure mode — what travels between the two tools is a table and a log, not a formula, so there is no second place where the cleaning could drift, and the pandas side owns the rules, the counts and the golden answer. But it creates a new one, and the lesson names it: the report refreshes against the <em>clean table</em>, not against the raw file, so if nobody re-runs the script the page refreshes happily against last month's clean output and looks completely current — no error, no blank, a correctly headed card. The defence is cheap: put the date of the clean file on the page, and the reader can see for herself. There is a second honest cost in the same sentence — a second artefact to keep in step — and the claim is tempting because “one source of truth” is the right instinct. The honest version is “one source of truth, plus a visible date”. This two-tool shape is still the standard professional answer, and the chapter's own job landed on the other branch: the manager wanted one page and one answer rather than a slicer, so the chart chose a pandas script with assertions. Had she said “I want to look at this by customer type and by day myself”, the same chart would have chosen Power BI, and the honest version of the chapter would have ended with a published report instead of a script.",
          ar: "خطأ. يُزيل التقسيم فعلًا نمط إخفاق كاملًا — فما ينتقل بين الأداتين جدول وسجل لا صيغة، فلا يبقى موضع ثانٍ يمكن أن ينحرف فيه التنظيف، ويملك جانب pandas القواعد والأعداد والإجابة المرجعية. لكنه يُنشئ نمطًا جديدًا، ويسمّيه الدرس: فالتقرير يُحدَّث في مقابل <em>الجدول النظيف</em> لا في مقابل الملف الخام، فإن لم يُعِد أحد تشغيل السكربت فستُحدَّث الصفحة بسرور في مقابل ناتج الشهر الماضي النظيف وتبدو حديثة تمامًا — لا خطأ ولا فراغ، وبطاقة عنوانها صحيح. والدفاع رخيص: ضع تاريخ الملف النظيف على الصفحة، فترى القارئة بنفسها. وفي الجملة نفسها ثمن صادق ثانٍ — صناعة ثانية يجب إبقاؤها متسقة — والادعاء مغرٍ لأن «مصدر حقيقة واحد» حدسٌ صحيح. والنسخة الصادقة: «مصدر حقيقة واحد، وتاريخ ظاهر». وصورة الأداتين هذه تبقى الإجابة المهنية القياسية، وقد هبطت مهمة الفصل نفسها على الفرع الآخر: فالمديرة أرادت صفحة واحدة وإجابة واحدة لا مُقطِّعًا، فاختار المخطط سكربت pandas مع تأكيدات. ولو قالت: «أريد أن أنظر في هذا بحسب نوع العميل وبحسب اليوم بنفسي»، لاختار المخطط نفسه Power BI، ولانتهت النسخة الصادقة من الفصل بتقرير منشور لا بسكربت."
        }
      }

    ]
  };
})();
