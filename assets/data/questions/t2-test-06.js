window.DABanks = window.DABanks || {};
(function () {
  /* code(line, line, ...) -> one string with \n between lines */
  function code() { return Array.prototype.join.call(arguments, "\n"); }

  window.DABanks["t2-test-06"] = {
    title: {
      en: "Test 6 — Reshape, Combine, and the Pipeline",
      ar: "اختبار 6 — إعادة التشكيل والدمج وخط التحويل"
    },
    intro: {
      en: "24 questions on Lesson 6, the lesson that is the chapter. Long and wide and what a round trip does not restore; the <code>pivot_table</code> cell that belongs to no flat; the assignment that fills 0 of 480 rows and its quieter cousin that fills 5; four kinds of join and four row counts, the 187 listings a dirty key deletes and the 164 rows a duplicated reference row invents; two months, two column sets and 4,491 blanks that are better than no blanks at all; and then the whole chapter in one function — seventeen steps, eighteen parameters, a report per batch, three assertions, and 63.6726 shekels down to 36.9553 on rows the parameters never saw. The last six questions are the honest ones: everything this pipeline still gets wrong while all three assertions pass. Every number comes from the 503 March rows, the 480 flats, the 85 June listings and the 40-listing rent history of the lesson. Plan for about 55 minutes. Every question carries a hint, an answer and an explanation, hidden until you ask for them: try first, then open them. A revealed answer is not counted.",
      ar: "‏24 سؤالًا على الدرس 6، الدرس الذي هو الفصل. الطويل والعريض وما لا تستعيده رحلةُ الذهاب والعودة؛ وخليةُ <code>pivot_table</code> التي لا تخصّ أي شقة؛ والإسنادُ الذي يعبّئ صفرًا من 480 صفًّا وابنُ عمّه الأهدأ الذي يعبّئ خمسة؛ وأربعةُ أنواع دمج وأربعةُ أعداد صفوف، والإعلاناتُ الـ187 التي يحذفها مفتاحٌ غير منظَّف والصفوفُ الـ164 التي يختلقها صفُّ مرجع مكرَّر؛ وشهران ومجموعتا أعمدة و4491 فراغًا هي خيرٌ من لا فراغ؛ ثم الفصلُ كلُّه في دالة واحدة &mdash; سبعَ عشرة خطوة وثمانيةَ عشر وسيطًا وتقريرٌ لكل دفعة وثلاثةُ تأكيدات، ومن 63.6726 شيكلًا إلى 36.9553 على صفوف لم ترَها الوسائطُ قط. والأسئلةُ الستة الأخيرة هي الأمينة: كلُّ ما ما زال هذا الخط يخطئ فيه والتأكيداتُ الثلاثة كلُّها ناجحة. وكلُّ رقم من صفوف آذار الـ503 والشقق الـ480 وإعلانات حزيران الـ85 وتاريخِ إيجار الأربعين إعلانًا في الدرس. قدّر نحو 55 دقيقة. ولكل سؤال تلميح وجواب وشرح، مخفيّة حتى تطلبها: جرّب أولًا ثم افتحها. والجواب المكشوف لا يُحسب."
    },
    questions: [

      /* ---------------------------------------------------------- 01 */
      {
        id: "t2l6q01", type: "tf", level: "easy",
        topics: ["t2-tidy-data", "t2-which-shape"],
        q: {
          en: "<code>rent_history_wide.csv</code> holds one row per listing and one column per quarter: 40&nbsp;&times;&nbsp;6. The 480-flat frame of <a href=\"#t2l3-s32\">Lesson&nbsp;3</a> holds one row per flat. <strong>True or false:</strong> the wide file is untidy and the 480-flat frame is tidy, so tidiness is a property of a table that you can check by looking at it.",
          ar: "يحمل <code>rent_history_wide.csv</code> صفًّا لكل إعلان وعمودًا لكل ربع سنة: ‏40 × 6. ويحمل إطارُ الشقق الـ480 في <a href=\"#t2l3-s32\">الدرس 3</a> صفًّا لكل شقة. <strong>صح أم خطأ:</strong> الملفُّ العريض غيرُ مرتَّب وإطارُ الشقق الـ480 مرتَّب، فتكون المرتَّبيةُ خاصيةً في الجدول تستطيع فحصَها بالنظر إليه."
        },
        truth: false,
        hint: {
          en: "Read the second clause of the definition &mdash; <em>each observation is a row</em> &mdash; and then ask what one observation is for the question &ldquo;how did rents move over the year?&rdquo; and what it is for &ldquo;what rent should this flat ask?&rdquo;",
          ar: "اقرأ الشرطَ الثاني من التعريف &mdash; <em>كلُّ مشاهدة صفٌّ</em> &mdash; ثم اسأل ما هي المشاهدةُ الواحدة لسؤال «كيف تحرّكت الإيجارات خلال السنة؟» وما هي لسؤال «كم ينبغي أن تطلب هذه الشقة إيجارًا؟»."
        },
        explain: {
          en: "The first half of the claim is true, which is what makes the sentence sound right: for a quarterly question the wide file <em>is</em> untidy, because one observation is one flat in one quarter and it is spread across four columns while the variable called <em>quarter</em> exists only in the header. The conclusion is what fails. <strong>What counts as one observation depends on the question</strong>, so tidiness is a relation between a table and a question and never a property you can read off a schema. For the chapter's question &mdash; what rent should this flat ask? &mdash; one observation is one flat and the 480-row frame is tidy; for the quarterly question that same frame is untidy, because it has no quarter column either. The test is a question, not a preference: <em>are these columns the same measurement under different conditions?</em> If yes, long; if no, leave it alone &mdash; <code>area_m2</code> and <code>monthly_rent</code> are not two values of one measurement, and melting them together would be nonsense.",
          ar: "النصفُ الأول من الادّعاء صحيح، وهذا ما يجعل الجملة تبدو سليمة: فبالنسبة لسؤال ربعيّ يكون الملفُّ العريض غيرَ مرتَّب <em>فعلًا</em>، لأن المشاهدةَ الواحدة شقةٌ واحدة في ربع واحد وهي موزّعة على أربعة أعمدة، والمتغيّرُ المسمّى <em>الربع</em> لا يوجد إلا في الترويسة. والخلاصةُ هي ما يسقط. فـ<strong>ما يُعَدّ مشاهدةً واحدة يتبع السؤال</strong>، فالمرتَّبيةُ علاقةٌ بين جدول وسؤال لا خاصيةً تقرؤها من مخطَّط. فبالنسبة لسؤال الفصل &mdash; كم ينبغي أن تطلب هذه الشقة إيجارًا؟ &mdash; المشاهدةُ الواحدة شقةٌ واحدة وإطارُ الـ480 صفًّا مرتَّب؛ وبالنسبة للسؤال الربعيّ يكون ذلك الإطارُ نفسه غيرَ مرتَّب، فلا عمودَ ربعٍ فيه هو أيضًا. والمحكُّ سؤالٌ لا تفضيل: <em>هل هذه الأعمدة القياسُ نفسه في ظروف مختلفة؟</em> فإن كان نعم فالطويل، وإن كان لا فاتركه &mdash; فـ<code>area_m2</code> و<code>monthly_rent</code> ليستا قيمتين لقياس واحد، وإذابتهما معًا عبثٌ."
        }
      },

      /* ---------------------------------------------------------- 02 */
      {
        id: "t2l6q02", type: "output", level: "easy",
        topics: ["t2-melt"],
        q: {
          en: "Write exactly what the program prints. <code>wide</code> is the 40&nbsp;&times;&nbsp;6 rent history: <code>listing_id</code>, <code>city</code> and four quarter columns, with seven blank quarter cells in the grid.",
          ar: "اكتب بالضبط ما يطبعه البرنامج. و<code>wide</code> هو تاريخُ الإيجار 40 × 6: ‏<code>listing_id</code> و<code>city</code> وأربعةُ أعمدة ربعية، وفي الشبكة سبعُ خلايا ربعية فارغة."
        },
        code: code(
          "QUARTERS = [\"rent_2026q1\", \"rent_2026q2\", \"rent_2026q3\", \"rent_2026q4\"]",
          "",
          "long  = wide.melt(id_vars=[\"listing_id\", \"city\"], value_vars=QUARTERS,",
          "                  var_name=\"quarter\", value_name=\"rent\")",
          "loose = wide.melt(id_vars=[\"listing_id\"])              # value_vars left out",
          "",
          "print(long.shape, int(long[\"rent\"].notna().sum()), int(long[\"rent\"].isna().sum()))",
          "print(loose.shape, loose[\"value\"].dtype)"
        ),
        blanks: [
          { accept: ["(160, 4) 153 7\n(200, 3) object"], lines: 2 }
        ],
        hint: {
          en: "Forty listings, four quarters &mdash; and <code>melt</code> does not drop a blank cell, it turns it into a row. For the second line, read the default of <code>value_vars</code> and count what is left over when only <code>listing_id</code> is named.",
          ar: "أربعون إعلانًا وأربعةُ أرباع &mdash; و<code>melt</code> لا تُسقط الخليةَ الفارغة بل تحوّلها صفًّا. وأما السطرُ الثاني فاقرأ القيمةَ الافتراضية لـ<code>value_vars</code> وعُدَّ ما يتبقّى حين يُذكَر <code>listing_id</code> وحده."
        },
        explain: {
          en: "Melting moves the information out of the header and into a column: 40&nbsp;&times;&nbsp;4&nbsp;=&nbsp;160 rows, of which 153 carry a rent and <strong>seven do not</strong>. That seven is the first thing worth saying about <code>melt</code> &mdash; it does not drop blank cells, it turns them into explicit rows saying &ldquo;this flat, this quarter, no rent recorded&rdquo;, which is better, because a hole you can count is a hole you can decide about. It is also a trap if you forget they are there: <code>groupby(\"quarter\").mean()</code> will quietly average 38 flats in one quarter and 40 in another. The second line is the silent failure. <code>value_vars</code> defaults to <em>every column not named in <code>id_vars</code></em>, so forgetting <code>city</code> melts the city too: 40&nbsp;&times;&nbsp;5&nbsp;=&nbsp;200 rows, a column of text stacked underneath a column of numbers, and the value column comes out <code>object</code>. No error, no warning, and every subsequent arithmetic silently wrong.",
          ar: "تنقل الإذابةُ المعلومةَ من الترويسة إلى عمود: ‏40 × 4 = 160 صفًّا، منها 153 تحمل إيجارًا و<strong>سبعةٌ لا تحمل</strong>. وهذه السبعةُ أولُ ما يستحق أن يُقال عن <code>melt</code> &mdash; فهي لا تُسقط الخلايا الفارغة بل تحوّلها صفوفًا صريحة تقول «هذه الشقة، هذا الربع، لا إيجار مسجَّل»، وهذا أفضل، لأن الثقبَ الذي تستطيع عدّه ثقبٌ تستطيع أن تقرّر فيه. وهو كذلك فخٌّ إن نسيت وجودها: فـ<code>groupby(\"quarter\").mean()</code> ستحسب بهدوء متوسطَ 38 شقة في ربع و40 في آخر. والسطرُ الثاني هو العطلُ الصامت. فقيمةُ <code>value_vars</code> الافتراضية هي <em>كلُّ عمود غير مذكور في <code>id_vars</code></em>، فنسيانُ <code>city</code> يُذيب المدينةَ أيضًا: ‏40 × 5 = 200 صف، وعمودُ نصّ مرصوصٌ تحت عمود أرقام، ويخرج عمودُ القيم من نوع <code>object</code>. بلا خطأ وبلا تحذير، وكلُّ حساب لاحق خاطئ بصمت."
        }
      },

      /* ---------------------------------------------------------- 03 */
      {
        id: "t2l6q03", type: "mcq", level: "easy",
        topics: ["t2-pivot-back", "t2-melt"],
        q: {
          en: "The 160-row long frame is pivoted back: <code>back = long.pivot(index=\"listing_id\", columns=\"quarter\", values=\"rent\")</code> returns 40&nbsp;&times;&nbsp;4 with the four quarter names as columns, and <code>back.equals(orig)</code> returns <code>True</code> &mdash; where <code>orig</code> is <code>wide.set_index(\"listing_id\")[QUARTERS].astype(float)</code>. Which option names what the round trip did <em>not</em> restore?",
          ar: "يُستقطَب الإطارُ الطويل ذو الـ160 صفًّا عودةً: فتُرجع <code>back = long.pivot(index=\"listing_id\", columns=\"quarter\", values=\"rent\")</code> ‏40 × 4 بأسماء الأرباع الأربعة أعمدةً، وتُرجع <code>back.equals(orig)</code> ‏<code>True</code> &mdash; حيث <code>orig</code> هي <code>wide.set_index(\"listing_id\")[QUARTERS].astype(float)</code>. فأيُّ الخيارات يسمّي ما <em>لم</em> تستعده الرحلة؟"
        },
        options: [
          {
            en: "<code>listing_id</code> is now the index rather than a column, so <code>back[\"listing_id\"]</code> raises; <code>city</code> is gone, because it was neither the index nor the columns nor the values; and <code>rent_2026q1</code> came back <code>float64</code> where the file held <code>int64</code>.",
            ar: "صار <code>listing_id</code> فهرسًا لا عمودًا، فترفع <code>back[\"listing_id\"]</code> خطأً؛ واختفى <code>city</code> لأنه لم يكن الفهرسَ ولا الأعمدةَ ولا القيم؛ وعاد <code>rent_2026q1</code> من نوع <code>float64</code> وقد حمله الملفُّ <code>int64</code>."
          },
          {
            en: "Nothing at all: <code>equals</code> returned <code>True</code>, which is exactly the statement that the frame and the file are the same table.",
            ar: "لا شيء على الإطلاق: فقد أرجعت <code>equals</code> ‏<code>True</code>، وهذه بالضبط هي العبارةُ التي تقول إن الإطار والملفَّ جدولٌ واحد."
          },
          {
            en: "Seven rents, because a grid has nowhere to put a row whose rent is blank, so <code>pivot</code> drops those seven and 153 cells come back out of 160.",
            ar: "سبعةُ إيجارات، لأن الشبكةَ لا تملك موضعًا لصفٍّ إيجارُه فارغ، فتُسقط <code>pivot</code> تلك السبعة فيعود 153 خلية من 160."
          },
          {
            en: "The column order, because <code>pivot</code> sorts the new columns alphabetically instead of keeping the order the file had them in.",
            ar: "ترتيبُ الأعمدة، لأن <code>pivot</code> تفرز الأعمدةَ الجديدة أبجديًّا بدل أن تُبقي الترتيبَ الذي كانت به في الملف."
          }
        ],
        answer: 0,
        hint: {
          en: "Count the cells on the way out and back: 240, then 640, then 160. Then ask which column has nowhere to go when you name an index, some columns and a set of values &mdash; and read the <code>astype(float)</code> in the definition of <code>orig</code>.",
          ar: "عُدَّ الخلايا ذهابًا وعودةً: ‏240 ثم 640 ثم 160. ثم اسأل أيُّ عمود لا يجد موضعًا حين تسمّي فهرسًا وأعمدةً ومجموعةَ قيم &mdash; واقرأ <code>astype(float)</code> في تعريف <code>orig</code>."
        },
        explain: {
          en: "Three things changed and all three are worth knowing. <code>listing_id</code> became the index. <code>city</code> is gone, which is why 160 cells come back and not 240: <code>pivot</code> takes an index, columns and values, and a fourth column has nowhere to go &mdash; a full round trip needs <code>index=[\"listing_id\", \"city\"]</code> and then a <code>reset_index()</code>. And the dtype widened: melting stacked <code>rent_2026q1</code> into one column alongside quarters that have blanks, a NumPy integer cannot hold a <code>NaN</code>, and nothing narrows the type on the way back because by then the information that this column had no blanks is gone &mdash; <a href=\"#t2l3-s22\">Lesson&nbsp;3's <code>Int64</code> argument</a> arriving by a new route. The &ldquo;nothing was lost&rdquo; answer is the tempting one because <code>equals</code> really did return <code>True</code> &mdash; but only against an <code>orig</code> that had already been re-indexed, had <code>city</code> dropped and had been cast to <code>float</code> to make the comparison possible. The seven-rents answer is a real misconception and the opposite of the truth: the blanks survive as cells, so the frame is 40&nbsp;&times;&nbsp;4 and not 39-point-something. And the column-order answer is half right in the wrong way &mdash; <code>pivot</code> does sort the new columns, and here the file's order already <em>is</em> the sorted order, so nothing was lost there.",
          ar: "تغيّرت ثلاثةُ أمور وكلُّها يستحقّ المعرفة. فصار <code>listing_id</code> فهرسًا. واختفى <code>city</code>، ولهذا يعود 160 خلية لا 240: فتأخذ <code>pivot</code> فهرسًا وأعمدةً وقيمًا، والعمودُ الرابع لا يجد موضعًا &mdash; فالرحلةُ التامّة تحتاج <code>index=[\"listing_id\", \"city\"]</code> ثم <code>reset_index()</code>. واتّسع النوع: فقد رصّت الإذابةُ <code>rent_2026q1</code> في عمود واحد مع أرباعٍ فيها فراغات، والعددُ الصحيح في NumPy لا يستطيع حملَ <code>NaN</code>، ولا شيء يضيّق النوعَ في العودة لأن المعلومةَ بأن هذا العمود لم يكن فيه فراغٌ قد ذهبت &mdash; وهو <a href=\"#t2l3-s22\">درسُ <code>Int64</code> في الدرس 3</a> يصل من طريق جديد. والجوابُ «لم يُفقَد شيء» هو المغري لأن <code>equals</code> أرجعت <code>True</code> فعلًا &mdash; لكن في مقابل <code>orig</code> كانت قد أُعيدت فهرستُها وأُسقط منها <code>city</code> وحُوّلت إلى <code>float</code> ليصير التطابقُ ممكنًا. وجوابُ الإيجارات السبعة وهمٌ حقيقي وهو نقيضُ الحقيقة: فالفراغاتُ تنجو خلايا، فيكون الإطارُ 40 × 4 لا 39 وكسرًا. وجوابُ ترتيب الأعمدة نصفُ صحيح في الجهة الخطأ &mdash; فـ<code>pivot</code> تفرز الأعمدةَ الجديدة فعلًا، وترتيبُ الملف هنا <em>هو</em> الترتيبُ المفروز أصلًا، فلم يُفقَد هناك شيء."
        }
      },

      /* ---------------------------------------------------------- 04 */
      {
        id: "t2l6q04", type: "compare", level: "medium",
        topics: ["t2-pivot-table", "t2-pivot-back"],
        q: {
          en: "In the long frame below, listing&nbsp;5002 appears twice, its second copy forty shekels higher &mdash; a repost that survived deduplication. The file's own Q1 rent for that flat is 110, and the retyped copy says 150. Which statement describes both versions correctly?",
          ar: "في الإطار الطويل أدناه يظهر الإعلانُ 5002 مرتين، ونسخته الثانية أعلى بأربعين شيكلًا &mdash; إعلانٌ معاد نشره نجا من إزالة التكرار. وإيجارُ الربع الأول لتلك الشقة في الملف 110، وتقول النسخةُ المعاد كتابتها 150. فأيُّ العبارات يصف النسختين وصفًا صحيحًا؟"
        },
        codeA: code(
          "dup = pd.concat([long, long[long[\"listing_id\"] == 5002]",
          "                       .assign(rent=lambda d: d[\"rent\"] + 40)])   # 164 rows",
          "",
          "grid = dup.pivot(index=\"listing_id\", columns=\"quarter\", values=\"rent\")",
          "print(grid.shape)"
        ),
        codeB: code(
          "dup = pd.concat([long, long[long[\"listing_id\"] == 5002]",
          "                       .assign(rent=lambda d: d[\"rent\"] + 40)])   # 164 rows",
          "",
          "grid = dup.pivot_table(index=\"listing_id\", columns=\"quarter\", values=\"rent\")",
          "print(grid.shape, grid.loc[5002, \"rent_2026q1\"])"
        ),
        options: [
          {
            en: "A raises <code>ValueError: Index contains duplicate entries, cannot reshape</code> and never builds a frame. B prints <code>(40, 4) 130.0</code>, and 130.0 is the mean of 110 and 150 &mdash; a number that appears nowhere in the data and belongs to no flat. B's defect is not that it averaged but that <code>aggfunc</code> defaults to <code>\"mean\"</code>, so the decision to average was made by a default rather than by the author.",
            ar: "ترفع A خطأ <code>ValueError: Index contains duplicate entries, cannot reshape</code> ولا تبني إطارًا قط. وتطبع B ‏<code>(40, 4) 130.0</code>، و130.0 هي متوسطُ 110 و150 &mdash; رقمٌ لا يظهر في البيانات في أي موضع ولا يخصّ أي شقة. وعيبُ B ليس أنها حسبت متوسطًا بل أن قيمةَ <code>aggfunc</code> الافتراضية <code>\"mean\"</code>، فالقرارُ بحساب المتوسط اتخذته قيمةٌ افتراضية لا المؤلّف."
          },
          {
            en: "Both raise. A grid has exactly one cell for each (listing, quarter) pair, so neither function can place two values in it, and the error message is the same in both cases.",
            ar: "ترفع كلتاهما خطأً. فللشبكة خليةٌ واحدة بالضبط لكل زوج (إعلان، ربع)، فلا تستطيع أيُّ دالة أن تضع فيها قيمتين، ورسالةُ الخطأ هي نفسها في الحالتين."
          },
          {
            en: "B is the safe choice precisely because it does not crash: <code>pivot_table</code> detects the duplicate and keeps the first value it met, so <code>grid.loc[5002, \"rent_2026q1\"]</code> is the 110 the file actually holds.",
            ar: "‏B هي الاختيارُ الآمن بالضبط لأنها لا تنهار: فتكشف <code>pivot_table</code> التكرارَ وتُبقي أولَ قيمة قابلتها، فتكون <code>grid.loc[5002, \"rent_2026q1\"]</code> هي الـ110 التي يحملها الملفُّ فعلًا."
          },
          {
            en: "A is the broken one: refusing a frame that the other function builds without complaint is never useful behaviour, and a library that raises where a sibling succeeds is a library you cannot rely on in a pipeline.",
            ar: "‏A هي المعطوبة: فرفضُ إطارٍ تبنيه الدالةُ الأخرى بلا تشكٍّ ليس سلوكًا نافعًا قط، والمكتبةُ التي ترفع خطأً حيث تنجح شقيقتُها مكتبةٌ لا تستطيع الاعتماد عليها في خط تحويل."
          }
        ],
        answer: 0,
        hint: {
          en: "One of the two never gets as far as printing anything. For the other, write down the two values the long frame holds for listing&nbsp;5002 in Q1 and ask what a single cell can possibly do with both of them.",
          ar: "واحدةٌ من الاثنتين لا تبلغ طبعَ شيء أصلًا. وأما الأخرى فاكتب القيمتين اللتين يحملهما الإطارُ الطويل للإعلان 5002 في الربع الأول واسأل ما يمكن أن تفعله خليةٌ واحدة بكلتيهما."
        },
        explain: {
          en: "Read the two together and the point is the <em>contract</em>, not the crash. <code>pivot</code> promises a reshape, which is only defined when the (index, columns) pair is unique, so it refuses the job and tells you why &mdash; and that refusal is the useful behaviour whenever you believe the key is unique, because the failure happens where the cause is. <code>pivot_table</code> promises an aggregation, so it accepts the job and averages: the shape is right, the dtype is right, nothing is missing, and the cell is an invention. The dangerous case is believing you have <code>pivot</code>'s guarantee while calling <code>pivot_table</code>, which is why the option that calls B &ldquo;safe because it does not crash&rdquo; is the most tempting wrong answer and also factually wrong twice over: <code>pivot_table</code> does not keep the first value and it does not detect anything for you. The one-line diagnostic is to pivot the same thing twice, once for the number and once for the count behind it: <code>aggfunc=\"count\"</code> prints a 2 for listing 5002 where every other row has a 1. <strong>Any cell of a <code>pivot_table</code> computed from more than one row should either be intended or be a bug, and the count table is how you tell.</strong> Note that this is <a href=\"#t2l3-s1\">Lesson&nbsp;3's duplicate problem</a> wearing a different hat: a repost that survived deduplication reappears here as a cell nobody typed.",
          ar: "اقرأهما معًا فيكون المغزى <em>العقدَ</em> لا الانهيار. فـ<code>pivot</code> تَعِد بإعادة تشكيل، وهي غيرُ معرَّفة إلا إذا كان زوجُ (الفهرس، الأعمدة) فريدًا، فترفض المهمة وتقول لماذا &mdash; وذلك الرفضُ هو السلوكُ النافع كلما كنتَ تعتقد أن المفتاح فريد، فيحدث العطلُ حيث السبب. وتَعِد <code>pivot_table</code> بتجميع، فتقبل المهمة وتحسب المتوسط: فالشكلُ صحيح والنوعُ صحيح ولا شيء مفقود والخليةُ مختلَقة. والحالةُ الخطيرة هي أن تعتقد أن لديك ضمانةَ <code>pivot</code> وأنت تنادي <code>pivot_table</code>، ولهذا يكون الخيارُ الذي يسمّي B «آمنةً لأنها لا تنهار» أغرى الأجوبة الخاطئة وأخطأَها واقعيًّا مرتين: فـ<code>pivot_table</code> لا تُبقي أولَ قيمة ولا تكشف لك شيئًا. والتشخيصُ بسطر واحد أن تستقطب الشيءَ نفسه مرتين، مرةً للرقم ومرةً للعدد الذي وراءه: فتطبع <code>aggfunc=\"count\"</code> اثنين للإعلان 5002 حيث لكل صف آخر واحد. <strong>وأيُّ خلية في <code>pivot_table</code> حُسبت من أكثر من صف ينبغي أن تكون مقصودة أو أن تكون عطبًا، وجدولُ العدد هو كيف تعرف.</strong> ولاحظ أن هذا <a href=\"#t2l3-s1\">مشكلةُ التكرار في الدرس 3</a> بقبّعة أخرى: فالإعلانُ المعاد نشره الذي نجا من إزالة التكرار يظهر هنا خليةً لم يكتبها أحد."
        }
      },

      /* ---------------------------------------------------------- 05 */
      {
        id: "t2l6q05", type: "fill", level: "easy",
        topics: ["t2-which-shape", "t2-pivot-table"],
        q: {
          en: "Fill the three blanks so that the program prints the two tables in the comment: a presentation table a housing officer could read, and underneath it the sentence that must always go with it. Each blank is one word.",
          ar: "املأ الفراغات الثلاثة ليطبع البرنامجُ الجدولين في التعليق: جدولَ عرضٍ يستطيع موظفُ إسكان قراءته، وتحته الجملةَ التي يجب أن تمضي معه دائمًا. وكلُّ فراغٍ كلمةٌ واحدة."
        },
        code: code(
          "print(long.pivot_table(index=\"____1____\", columns=\"quarter\",",
          "                       values=\"rent\", aggfunc=\"____2____\").to_string())",
          "print()",
          "print(long.pivot_table(index=\"city\", columns=\"quarter\",",
          "                       values=\"rent\", aggfunc=\"____3____\").to_string())",
          "",
          "# quarter        rent_2026q1  rent_2026q2  rent_2026q3  rent_2026q4",
          "# city",
          "# Deir al-Balah        140.0        145.0        155.0        160.0",
          "# Gaza                 267.5        265.0        275.0        320.0",
          "# Jabalia              177.5        187.5        202.5        205.0",
          "# Khan Younis          175.0        170.0        200.0        187.5",
          "# Rafah                177.5        185.0        197.5        207.5",
          "#",
          "# quarter        rent_2026q1  rent_2026q2  rent_2026q3  rent_2026q4",
          "# city",
          "# Deir al-Balah            5            5            5            5",
          "# Gaza                    16           16           16           16",
          "# Jabalia                  6            6            6            6",
          "# Khan Younis              5            5            5            5",
          "# Rafah                    8            8            8            8"
        ),
        blanks: [
          { accept: ["city"], label: { en: "blank 1", ar: "الفراغ 1" } },
          { accept: ["median"], label: { en: "blank 2", ar: "الفراغ 2" } },
          { accept: ["size"], label: { en: "blank 3", ar: "الفراغ 3" } }
        ],
        hint: {
          en: "The first table is a middle, not an average, and the lesson says which one a rent column deserves. The second counts <em>rows</em> &mdash; including the ones whose rent is blank &mdash; which is why every quarter shows the same number even though seven quarter cells are empty.",
          ar: "الجدولُ الأول وسطٌ لا متوسط، والدرسُ يقول أيَّهما يستحقّه عمودُ إيجار. والجدولُ الثاني يعدّ <em>الصفوف</em> &mdash; ومنها التي إيجارُها فارغ &mdash; ولهذا يُظهر كلُّ ربع العددَ نفسه مع أن سبعَ خلايا ربعية فارغة."
        },
        explain: {
          en: "<strong>Compute in long, present in wide.</strong> Every grouping, join, time axis and feature matrix wants one row per observation, because that is what <code>groupby</code>, <code>merge</code> and a model all assume; every table a human is about to read wants the categories across the top, because an eye compares along a row faster than down a column of labels. So the wide table at the end of an analysis is a <em>presentation</em> step produced from the long frame you actually computed on. The third blank is the one that matters most and it is not decoration. <code>size</code> counts rows and reports 5 flats in Deir al-Balah against 16 in Gaza, and a median of five numbers is a weak statement about a city: printing the counts beside the medians is what stops a reader treating 140.0 and 267.5 as equally solid. <code>count</code> would also run, and it answers a different question &mdash; it counts <em>recorded rents</em>, so Khan Younis reads 5, 4, 5, 4 and Gaza 16, 15, 15, 14 across the quarters, which tells you where the seven blanks are but no longer tells you how many flats the city has. These are real homes in a real market; a table that hides its sample size is a table that overclaims.",
          ar: "<strong>احسب في الطويل واعرض في العريض.</strong> فكلُّ تجميع ودمج ومحور زمن ومصفوفة خصائص يريد صفًّا لكل مشاهدة، لأن هذا ما تفترضه <code>groupby</code> و<code>merge</code> والنموذجُ جميعًا؛ وكلُّ جدول يوشك إنسانٌ أن يقرأه يريد الفئات في أعلاه، لأن العينَ تقارن على طول الصف أسرعَ مما تقارن نزولًا في عمود لافتات. فالجدولُ العريض في آخر التحليل خطوةُ <em>عرض</em> تُنتَج من الإطار الطويل الذي حسبتَ عليه فعلًا. والفراغُ الثالث هو الأهمّ وهو ليس زينة. فـ<code>size</code> تعدّ الصفوف وتُبلّغ عن خمس شقق في دير البلح مقابل ستّ عشرة في غزة، ووسيطُ خمسة أرقام قولٌ ضعيف عن مدينة: فطبعُ الأعداد بجانب الوسائط هو ما يمنع القارئ من أن يحسب 140.0 و267.5 متساويتين في الرصانة. و<code>count</code> ستعمل أيضًا وتجيب سؤالًا آخر &mdash; فهي تعدّ <em>الإيجارات المسجَّلة</em>، فتقرأ خان يونس 5 و4 و5 و4 وغزة 16 و15 و15 و14 على الأرباع، وهذا يخبرك أين الفراغاتُ السبعة ولا يخبرك بعدها كم شقةً في المدينة. فهذه بيوتٌ حقيقية في سوق حقيقية؛ والجدولُ الذي يخفي حجمَ عيّنته جدولٌ يدّعي أكثر مما يملك."
        }
      },

      /* ---------------------------------------------------------- 06 */
      {
        id: "t2l6q06", type: "tf", level: "easy",
        topics: ["t2-agg-row-meaning", "t2-transform"],
        q: {
          en: "On the 480 flats, <code>flats.groupby(\"city\")[\"monthly_rent\"].median()</code> returns 5 values and <code>flats.groupby(\"city\")[\"monthly_rent\"].transform(\"median\")</code> returns 480. <strong>True or false:</strong> both compute the same five medians, so <code>transform</code> is simply the faster route to the same object and choosing between them is a performance decision.",
          ar: "على الشقق الـ480 تُرجع <code>flats.groupby(\"city\")[\"monthly_rent\"].median()</code> خمسَ قيم وتُرجع <code>flats.groupby(\"city\")[\"monthly_rent\"].transform(\"median\")</code> ‏480. <strong>صح أم خطأ:</strong> كلتاهما تحسب الوسائطَ الخمسة نفسها، فتكون <code>transform</code> مجردَ طريق أسرع إلى الكائن نفسه ويكون الاختيارُ بينهما قرارَ أداء."
        },
        truth: false,
        hint: {
          en: "Ask what the <em>index</em> of each result is, and then ask which of the two could be a column of a 480-row table. Then ask which one has to compute the five medians <em>and</em> expand them.",
          ar: "اسأل ما <em>فهرسُ</em> كلِّ ناتج، ثم اسأل أيُّ الاثنين يستطيع أن يكون عمودًا في جدول من 480 صفًّا. ثم اسأل أيُّهما عليه أن يحسب الوسائطَ الخمسة <em>ويوسّعها</em>."
        },
        explain: {
          en: "The five medians really are the same numbers, which is why the sentence sounds reasonable &mdash; and the two calls return different objects answering different questions. <code>agg</code> answers a question about <em>groups</em> and gives one row per group: five values whose index is five city names, a perfectly good table and not a column of anything, because nothing it is indexed by appears in the frame's index. <code>transform</code> answers a question about <em>rows</em> and gives one value per row, indexed exactly like the frame it came from, which is the only one you can assign in. The performance claim is backwards as well: <code>transform</code> computes the statistic per group and <em>then</em> expands it, so it is the slower of the two, and on a high-cardinality key &mdash; ten million rows over three million customer ids &mdash; that expansion is the whole cost. Say the difference in one sentence and you will never confuse them again: <strong><code>agg</code> changes what a row means; <code>transform</code> does not.</strong>",
          ar: "الوسائطُ الخمسة هي الأرقامُ نفسها فعلًا، ولهذا تبدو الجملةُ معقولة &mdash; والنداءان يُرجعان كائنين مختلفين يجيبان سؤالين مختلفين. فتجيب <code>agg</code> عن سؤال في <em>المجموعات</em> فتعطي صفًّا لكل مجموعة: خمسَ قيم فهرسُها خمسةُ أسماء مدن، جدولٌ سليم تمامًا وليس عمودًا في شيء، لأن لا شيء مفهرسةً به يظهر في فهرس الإطار. وتجيب <code>transform</code> عن سؤال في <em>الصفوف</em> فتعطي قيمةً لكل صف مفهرسةً كالإطار الذي جاءت منه، وهي الوحيدةُ التي تستطيع إسنادَها. وادّعاءُ الأداء مقلوبٌ أيضًا: فـ<code>transform</code> تحسب المقياسَ لكل مجموعة <em>ثم</em> توسّعه، فهي الأبطأُ من الاثنتين، وعلى مفتاح عالي التعدّد &mdash; عشرةُ ملايين صف على ثلاثة ملايين معرّف عميل &mdash; يكون ذلك التوسيعُ هو الثمنَ كلَّه. قل الفرقَ في جملة فلن تخلط بينهما أبدًا: <strong>تغيّر <code>agg</code> معنى الصف؛ و<code>transform</code> لا تغيّره.</strong>"
        }
      },

      /* ---------------------------------------------------------- 07 */
      {
        id: "t2l6q07", type: "error", level: "medium",
        topics: ["t2-groupby-nan-bug", "t2-transform"],
        q: {
          en: "This should give every flat the median rent of its own city, so that you can ask whether the flat is dear or cheap for where it is. It runs without a warning, the dtype is a sensible <code>float64</code>, and the column is empty from top to bottom. Click the offending line.",
          ar: "ينبغي لهذا أن يُعطي كلَّ شقة وسيطَ إيجار مدينتها، لتسأل هل الشقةُ غالية أم رخيصة لمكانها. وهو يعمل بلا تحذير، والنوعُ <code>float64</code> معقول، والعمودُ فارغٌ من أعلاه إلى أسفله. انقر السطر المخطئ."
        },
        code: code(
          "flats, _ = make_comparable(march)                    # 480 flats, one row per flat",
          "bug = flats.copy()",
          "per_city = flats.groupby(\"city\")[\"monthly_rent\"].median()",
          "bug[\"city_median\"] = per_city",
          "bug[\"rent_vs_city\"] = bug[\"monthly_rent\"] / bug[\"city_median\"]",
          "",
          "print(\"dtype:\", bug[\"city_median\"].dtype)",
          "print(\"non-blank city_median cells:\", int(bug[\"city_median\"].notna().sum()), \"of\", len(bug))",
          "print(\"mean rent_vs_city:\", bug[\"rent_vs_city\"].mean())",
          "",
          "# dtype: float64",
          "# non-blank city_median cells: 0 of 480",
          "# mean rent_vs_city: nan"
        ),
        answer: 4,
        solution: {
          code: code(
            "flats, _ = make_comparable(march)                    # 480 flats, one row per flat",
            "bug = flats.copy()",
            "bug[\"city_median\"] = flats.groupby(\"city\")[\"monthly_rent\"].transform(\"median\")",
            "bug[\"rent_vs_city\"] = bug[\"monthly_rent\"] / bug[\"city_median\"]",
            "",
            "print(\"dtype:\", bug[\"city_median\"].dtype)",
            "print(\"non-blank city_median cells:\", int(bug[\"city_median\"].notna().sum()), \"of\", len(bug))",
            "print(\"mean rent_vs_city: %.4f\" % bug[\"rent_vs_city\"].mean())"
          ),
          out: code(
            "dtype: float64",
            "non-blank city_median cells: 480 of 480",
            "mean rent_vs_city: 1.0381"
          ),
          en: "One method name. <code>transform(\"median\")</code> computes the same five medians and then broadcasts each group's value back onto every row of that group, so what comes out is indexed like the frame it came from and the assignment becomes legal: 480 of 480. If you want to keep the aggregation as well, <code>flats[\"city\"].map(per_city)</code> is the other correct line &mdash; it applies the lookup to a Series that already has the frame's index &mdash; but note the one difference: a city missing from the lookup becomes a silent <code>NaN</code> with <code>.map()</code>, while <code>transform</code> cannot fail that way, because its groups come from the column itself.",
          ar: "اسمُ دالة واحد. فتحسب <code>transform(\"median\")</code> الوسائطَ الخمسة نفسها ثم تبثّ قيمةَ كل مجموعة على كل صف من صفوفها، فيخرج الناتجُ مفهرسًا كالإطار الذي جاء منه فيصير الإسنادُ مشروعًا: ‏480 من 480. وإن أردتَ الإبقاء على التجميع أيضًا فـ<code>flats[\"city\"].map(per_city)</code> هي السطرُ الصحيح الآخر &mdash; فهي تطبّق جدولَ البحث على متسلسلة لها فهرسُ الإطار أصلًا &mdash; ولاحظ الفرقَ الواحد: فالمدينةُ الغائبة عن جدول البحث تصير <code>NaN</code> صامتة مع <code>.map()</code>، بينما لا تستطيع <code>transform</code> أن تُعطِب هكذا لأن مجموعاتها تأتي من العمود نفسه."
        },
        hint: {
          en: "Line 3 is correct: it produces five medians, and their index is five city names. Ask what the index of <code>bug</code> is &mdash; <code>136, 106, 400, &hellip;</code> &mdash; and then ask what pandas does when it is asked to put one into the other.",
          ar: "السطر 3 صحيح: فهو ينتج خمسةَ وسائط وفهرسُها خمسةُ أسماء مدن. فاسأل ما فهرسُ <code>bug</code> &mdash; ‏<code>136</code> و<code>106</code> و<code>400</code> و… &mdash; ثم اسأل ماذا يفعل بانداس حين يُطلب منه أن يضع أحدهما في الآخر."
        },
        explain: {
          en: "Line 4 is the damage, and the reason is the single most important rule in pandas: <strong>assigning a Series into a DataFrame aligns it by index.</strong> pandas looks at the left-hand index (480 row labels &mdash; 136, 106, 400, &hellip;) and the right-hand index (five city names), finds not one label in common, and fills every row with <code>NaN</code>. It is not a bug and it cannot warn, because alignment <em>is</em> the definition of assignment: the same mechanism is what lets you write <code>df.loc[mask, \"x\"] = other_series</code> and have the right values land on the right rows. Line 3 is the tempting click because it is where the numbers come from, and it is simply correct &mdash; the groupby was right and the median was right; the assignment threw all of it away. Line 5 is the second tempting click, and it is the <em>symptom</em>: dividing by a column of <code>NaN</code> gives a column of <code>NaN</code>, and the saving grace of this bug is that the next <code>mean()</code> returns <code>nan</code> rather than a plausible number. The two-second check before assigning any Series into a frame is <code>s.index.equals(df.index)</code>, and the shortcut that never needs the question is shorter still: if you are assigning the result of a <code>groupby</code>, you wanted <code>transform</code>.",
          ar: "السطر 4 هو الضرر، والسببُ أهمُّ قاعدة في بانداس: <strong>إسنادُ متسلسلة إلى إطار يوفّق بينهما بالفهرس.</strong> فينظر بانداس إلى فهرس اليسار (‏480 لافتة صف &mdash; 136 و106 و400 و…) وإلى فهرس اليمين (خمسةُ أسماء مدن) فلا يجد لافتةً واحدة مشتركة فيعبّئ كلَّ صف بـ<code>NaN</code>. وهذا ليس عطبًا ولا يستطيع أن يحذّر، لأن التوفيقَ بالفهرس <em>هو</em> تعريفُ الإسناد: فالآليةُ ذاتها هي ما يتيح لك أن تكتب <code>df.loc[mask, \"x\"] = other_series</code> فتهبط القيمُ الصحيحة على الصفوف الصحيحة. والسطر 3 هو النقرةُ المغرية لأنه موضعُ الأرقام، وهو صحيحٌ بلا مزيد &mdash; فالتجميعُ كان صحيحًا والوسيطُ كان صحيحًا؛ والإسنادُ ألقى بذلك كله. والسطر 5 هو النقرةُ المغرية الثانية وهو <em>العَرَض</em>: فالقسمةُ على عمودٍ من <code>NaN</code> تعطي عمودًا من <code>NaN</code>، ونعمةُ هذا العطل أن <code>mean()</code> التالية تُرجع <code>nan</code> لا رقمًا معقولًا. والفحصُ في ثانيتين قبل إسناد أي متسلسلة إلى إطار هو <code>s.index.equals(df.index)</code>، والطريقُ المختصر الذي لا يحتاج السؤالَ أقصرُ منه: إن كنت تُسند ناتجَ <code>groupby</code> فقد أردتَ <code>transform</code>."
        }
      },

      /* ---------------------------------------------------------- 08 */
      {
        id: "t2l6q08", type: "trace", level: "medium",
        topics: ["t2-index-alignment"],
        q: {
          en: "The same bug, grouped by <code>rooms</code> instead of <code>city</code>, on a frame whose index was reset to <code>0 &hellip; 479</code>. The aggregation's index is now <code>[1.0, 2.0, 3.0, 4.0, 5.0]</code> and its values are 120.0, 165.0, 200.0, 235.0 and 265.0 &mdash; and those labels <em>are</em> row labels of the frame. Row label 1 holds listing&nbsp;5293, a three-room flat. After the last line, what are the four variables?",
          ar: "العطبُ نفسه مجمَّعًا على <code>rooms</code> بدل <code>city</code>، على إطارٍ أُعيد فهرسُه إلى <code>0 … 479</code>. فصار فهرسُ التجميع <code>[1.0, 2.0, 3.0, 4.0, 5.0]</code> وقيمُه 120.0 و165.0 و200.0 و235.0 و265.0 &mdash; وتلك اللافتاتُ <em>هي</em> لافتاتُ صفوف في الإطار. ولافتةُ الصف 1 تحمل الإعلانَ 5293، وهو شقةٌ من ثلاث غرف. فبعد السطر الأخير، ما قيمُ المتغيرات الأربعة؟"
        },
        code: code(
          "rows = flats.reset_index(drop=True)          # the index is now 0 .. 479",
          "bad  = rows.copy()",
          "bad[\"rooms_median\"] = rows.groupby(\"rooms\")[\"monthly_rent\"].median()",
          "good = rows.groupby(\"rooms\")[\"monthly_rent\"].transform(\"median\")",
          "",
          "filled = int(bad[\"rooms_median\"].notna().sum())",
          "wrong  = int((bad[\"rooms_median\"].notna() & (bad[\"rooms_median\"] != good)).sum())",
          "lucky  = int((bad[\"rooms_median\"].notna() & (bad[\"rooms_median\"] == good)).sum())",
          "cell   = bad.loc[1, \"rooms_median\"]"
        ),
        blanks: [
          { accept: ["5"], label: { en: "filled", ar: "filled" } },
          { accept: ["2"], label: { en: "wrong", ar: "wrong" } },
          { accept: ["3"], label: { en: "lucky", ar: "lucky" } },
          { accept: ["120.0", "120"], label: { en: "cell", ar: "cell" } }
        ],
        hint: {
          en: "Write down the labels the two indexes have in common, and count them: that is <code>filled</code>. Then, for each of those labels, ask how many rooms the flat <em>sitting at that position</em> actually has, and compare it with the label.",
          ar: "اكتب اللافتاتِ المشتركة بين الفهرسين وعُدَّها: فتلك هي <code>filled</code>. ثم اسأل عن كل لافتة منها كم غرفةً للشقة <em>الجالسة في ذلك الموضع</em> فعلًا، وقارِنها باللافتة."
        },
        explain: {
          en: "Only the labels 1, 2, 3, 4 and 5 appear on both sides, so <strong>5 cells of 480</strong> receive a number and 475 are blank. Three of the five are correct by pure coincidence &mdash; row label 2 happens to hold a two-room flat and so picks up the two-room group, and labels 3 and 5 are lucky in the same way. Two are the median of a different room count, assigned to a flat because of where it happened to sit in the file: listing&nbsp;5293 at label 1 has three rooms and is told its group median is <strong>120.0</strong>, which is the median of the <em>one</em>-room flats, and listing&nbsp;5288 at label 4 has three rooms and is given the four-room median of 235.0. Nothing warns, the dtype is a clean <code>float64</code>, and <code>describe()</code> will not save you. This is why 480 cells of <code>NaN</code> &mdash; the <code>city</code> version &mdash; is the <em>lucky</em> outcome: an all-blank column is obvious the moment you print it, and the next <code>mean()</code> returns <code>NaN</code> rather than a plausible number. The dangerous case is a group key whose values happen to look like row labels, and if this frame had ten thousand rows the five filled cells would be invisible.",
          ar: "اللافتاتُ 1 و2 و3 و4 و5 وحدها تظهر في الطرفين، فتنال <strong>خمسُ خلايا من 480</strong> رقمًا و475 فارغة. وثلاثٌ من الخمس صحيحةٌ بمحض المصادفة &mdash; فلافتةُ الصف 2 تصادف أن تحمل شقةً من غرفتين فتلتقط مجموعةَ الغرفتين، واللافتتان 3 و5 محظوظتان كذلك. واثنتان وسيطُ عدد غرف مختلف أُسنِد إلى شقة بسبب موضعها الذي صادف أن تجلس فيه في الملف: فالإعلانُ 5293 عند اللافتة 1 له ثلاث غرف ويُقال له إن وسيطَ مجموعته <strong>120.0</strong>، وهو وسيطُ شقق الغرفة <em>الواحدة</em>؛ والإعلانُ 5288 عند اللافتة 4 له ثلاث غرف ويُعطى وسيطَ الأربع غرف 235.0. ولا شيء يحذّر، والنوعُ <code>float64</code> نظيف، ولن تنجّيك <code>describe()</code>. ولهذا تكون 480 خليةَ <code>NaN</code> &mdash; نسخةُ <code>city</code> &mdash; هي النتيجةَ <em>المحظوظة</em>: فالعمودُ الفارغ كلُّه واضحٌ لحظةَ طبعه، و<code>mean()</code> التالية تُرجع <code>NaN</code> لا رقمًا معقولًا. والحالةُ الخطيرة مفتاحُ مجموعة قيمه تشبه لافتاتِ الصفوف، ولو كان لهذا الإطار عشرةُ آلاف صف لكانت الخلايا الخمس المعبَّأة غيرَ مرئية."
        }
      },

      /* ---------------------------------------------------------- 09 */
      {
        id: "t2l6q09", type: "multi", level: "medium",
        topics: ["t2-group-feature", "t2-transform"],
        q: {
          en: "<code>rent_vs_city</code> is built on all 480 flats with <code>transform</code>: <code>city_median = flats.groupby(\"city\")[\"monthly_rent\"].transform(\"median\")</code>, then <code>rent_vs_city = monthly_rent / city_median</code>. The city counts are Gaza 164, Khan Younis 122, Rafah 82, Deir al-Balah 61, Jabalia 51. Select <strong>every</strong> statement that is true of this feature on this file.",
          ar: "تُبنى <code>rent_vs_city</code> على الشقق الـ480 كلها بـ<code>transform</code>: فـ<code>city_median = flats.groupby(\"city\")[\"monthly_rent\"].transform(\"median\")</code> ثم <code>rent_vs_city = monthly_rent / city_median</code>. وأعدادُ المدن: غزة 164 وخان يونس 122 ورفح 82 ودير البلح 61 وجباليا 51. اختر <strong>كلَّ</strong> عبارة صحيحة عن هذه الخاصية على هذا الملف."
        },
        options: [
          {
            en: "Over the 459 flats with a recorded rent the ratio runs from 0.2817 to 2.3662 with a median of exactly 1.0000; 7 flats cost more than twice their own city's median and 17 less than half.",
            ar: "على الشقق الـ459 التي لها إيجار مسجَّل تمتدّ النسبةُ من 0.2817 إلى 2.3662 ووسيطها 1.0000 بالضبط؛ وسبعُ شقق تكلّف أكثر من ضِعف وسيط مدينتها وسبعَ عشرة تكلّف أقلَّ من نصفه."
          },
          {
            en: "It is a better outlier screen than one global fence, because it asks the question inside the group where the comparison is fair: 130 shekels is unremarkable in Deir al-Balah and striking in Gaza, and a fence computed over the whole column cannot see the difference.",
            ar: "هي مرشَحُ شواذٍّ أفضل من سياج عالمي واحد، لأنها تسأل السؤالَ داخل المجموعة التي تكون فيها المقارنةُ عادلة: فـ130 شيكلًا عاديةٌ في دير البلح ولافتةٌ في غزة، والسياجُ المحسوب على العمود كله لا يستطيع أن يرى الفرق."
          },
          {
            en: "Computed this way it must not go into the pipeline: <code>transform</code> computes each median from <em>whatever frame you call it on</em>, so calling it on all 480 flats computes every median from the held-out rows as well, and each held-out flat's own rent has contributed to the median it is being divided by.",
            ar: "لا يجوز لها محسوبةً هكذا أن تدخل الخط: فـ<code>transform</code> تحسب كلَّ وسيط من <em>أي إطار تناديها عليه</em>، فمناداتها على الشقق الـ480 كلها تحسب كلَّ وسيط من الصفوف المحجوزة أيضًا، ويكون إيجارُ كل شقة محجوزة قد ساهم في الوسيط الذي تُقسَم عليه."
          },
          {
            en: "The 7 above and the 17 below are comparable counts, so the file is measurably skewed towards flats that are cheap for their city.",
            ar: "السبعةُ أعلى والسبعةَ عشر أدنى عددان قابلان للمقارنة، فيكون الملفُّ مائلًا بقدرٍ قابل للقياس نحو الشقق الرخيصة لمدينتها."
          },
          {
            en: "Jabalia's flats get no information from the feature, because with 51 listings the city is too small for a median to carry any.",
            ar: "لا تحصل شققُ جباليا على معلومة من الخاصية، لأن المدينةَ بـ51 إعلانًا أصغرُ من أن يحمل وسيطٌ فيها شيئًا."
          },
          {
            en: "Replacing <code>transform(\"median\")</code> with <code>flats[\"city\"].map(per_city)</code> removes the leak, because <code>.map()</code> looks a value up instead of recomputing it.",
            ar: "استبدالُ <code>transform(\"median\")</code> بـ<code>flats[\"city\"].map(per_city)</code> يحذف التسرّب، لأن <code>.map()</code> تبحث عن قيمة بدل أن تُعيد حسابها."
          }
        ],
        answer: [0, 1, 2],
        hint: {
          en: "Three of the six are measurements or arguments the lesson makes. Of the other three: check the two tails against the arithmetic of a ratio, check which <em>column</em> in this file actually has groups of one, and ask where <code>per_city</code> itself came from before it was looked up.",
          ar: "ثلاثةٌ من الستة قياساتٌ أو حججٌ يقولها الدرس. وأما الثلاثةُ الأخرى: فافحص الذيلين في مقابل حساب النسبة، وافحص أيُّ <em>عمود</em> في هذا الملف له فعلًا مجموعاتٌ من عضو واحد، واسأل من أين جاء <code>per_city</code> نفسه قبل أن يُبحَث فيه."
        },
        explain: {
          en: "The three true statements are the measurement, the argument for it and the warning that comes with it. A value on every row is what lets you compare a row with its own group, which no aggregation can do, because the arithmetic needs the row and the group at the same time &mdash; and that makes group statistics the most productive feature family in tabular machine learning and the most common source of silent leakage, from the same line of code. The answer about the two tails is the arithmetic trap: a ratio is bounded below by zero and unbounded above, so 7 and 17 are <em>not</em> comparable counts and the screen says &ldquo;look at these 24 flats&rdquo; rather than &ldquo;the file leans cheap&rdquo;. The answer about Jabalia misplaces a real problem: 51 listings is a perfectly usable median, and the group-of-one problem belongs to the <code>agency</code> column, where 5 of the 20 agencies appear exactly once on the 480 flats, so an agency-level statistic is a memorised value for those five rows. And the <code>.map()</code> answer is the subtle one: <code>.map()</code> does look up rather than recompute, and it fixes an <em>index</em> problem beautifully &mdash; but the lookup table it reads was still built from all 480 rows, so the leak is untouched. What removes the leak is computing the medians <em>once</em> on the training rows, storing them in <code>fitted</code>, and applying them with <code>.map()</code>; use <code>transform</code> freely for a feature you compute inside one batch, and a stored parameter for anything that crosses a batch boundary.",
          ar: "العباراتُ الثلاث الصحيحة هي القياسُ والحجّةُ له والتحذيرُ الذي يرافقه. فالقيمةُ على كل صف هي ما يتيح لك أن تقارن الصفَّ بمجموعته، وهذا ما لا يستطيعه أي تجميع، لأن الحسابَ يحتاج الصفَّ والمجموعةَ في وقت واحد &mdash; وهذا ما يجعل مقاييسَ المجموعات أكثرَ عائلات الخصائص إنتاجًا في تعلُّم الآلة الجدولي وأكثرَ مصادر التسرّب الصامت شيوعًا، من سطر الكود نفسه. وجوابُ الذيلين فخُّ الحساب: فالنسبةُ محدودةٌ من الأسفل بالصفر وغيرُ محدودة من الأعلى، فالسبعةُ والسبعةَ عشر <em>ليسا</em> عددين قابلين للمقارنة، والمرشَحُ يقول «انظر إلى هذه الشقق الأربع والعشرين» لا «الملفُّ يميل إلى الرخيص». وجوابُ جباليا يُسيء موضعَ مشكلة حقيقية: فـ51 إعلانًا وسيطٌ صالح تمامًا، ومشكلةُ المجموعة من عضو واحد تخصّ عمودَ <code>agency</code>، حيث تظهر خمسٌ من الوكالات العشرين مرةً واحدة بالضبط على الشقق الـ480، فيكون مقياسُ مستوى الوكالة قيمةً محفوظة لتلك الصفوف الخمسة. وجوابُ <code>.map()</code> هو الدقيق: فـ<code>.map()</code> تبحث ولا تُعيد الحساب فعلًا، وهي تُصلح مشكلةَ <em>الفهرس</em> إصلاحًا جميلًا &mdash; لكن جدولَ البحث الذي تقرؤه ما زال مبنيًّا من الصفوف الـ480 كلها، فالتسرّبُ لم يُمَسّ. والذي يحذف التسرّبَ هو حسابُ الوسائط <em>مرةً واحدة</em> على صفوف التدريب وحفظُها في <code>fitted</code> وتطبيقُها بـ<code>.map()</code>؛ فاستعمل <code>transform</code> بحرية لخاصية تحسبها داخل دفعة واحدة، ووسيطًا محفوظًا لكل ما يعبر حدَّ دفعة."
        }
      },

      /* ---------------------------------------------------------- 10 */
      {
        id: "t2l6q10", type: "match", level: "easy",
        topics: ["t2-join-kinds", "t2-outer-unmatched"],
        q: {
          en: "Four kinds of join and two defences, all measured on the real files: the 503 March listings against the six-row <code>city_reference.csv</code>, on the <em>cleaned</em> city key. Match each one to what it does.",
          ar: "أربعةُ أنواع دمج ودفاعان، كلُّها مقيسةٌ على الملفات الحقيقية: إعلاناتُ آذار الـ503 في مقابل <code>city_reference.csv</code> ذي الصفوف الستة، على مفتاح المدينة <em>المنظَّف</em>. وصّل كلًّا منها بما يفعله."
        },
        leftHead: { en: "The argument", ar: "الوسيط" },
        rightHead: { en: "What it does on these files", ar: "ما يفعله على هذه الملفات" },
        pairs: [
          {
            l: { code: "how=\"inner\"" },
            r: {
              en: "503 rows: only rows matched on both sides survive. Equal to the left count here, which is the signature of a join that worked &mdash; and a one-line test cheaper than reading the <code>_merge</code> column.",
              ar: "‏503 صفوف: الصفوفُ المطابقة في الطرفين وحدها تبقى. وهو مساوٍ لعدد اليسار هنا، وذاك توقيعُ دمجٍ نجح &mdash; واختبارٌ بسطر واحد أرخصُ من قراءة عمود <code>_merge</code>."
            }
          },
          {
            l: { code: "how=\"left\"" },
            r: {
              en: "503 rows: every listing kept, blanks where nothing matched. Almost always the right choice, because adding reference columns to a table of facts must not change which facts you have.",
              ar: "‏503 صفوف: كلُّ إعلان يبقى، وفراغاتٌ حيث لا مطابقة. وهو الاختيارُ الصحيح في معظم الأحوال، لأن إضافةَ أعمدة مرجع إلى جدول وقائع لا يجوز أن تغيّر أيَّ الوقائع تملك."
            }
          },
          {
            l: { code: "how=\"right\"" },
            r: {
              en: "504 rows: every reference row kept, so a city with no listings arrives carrying a blank <code>listing_id</code>. Rarely written, because it is a left join with the arguments swapped, which reads better.",
              ar: "‏504 صفوف: كلُّ صف مرجع يبقى، فتصل مدينةٌ بلا إعلانات حاملةً <code>listing_id</code> فارغًا. وهو قليلُ الكتابة، فهو دمجٌ أيسر بوسيطين مقلوبين، وذاك أحسنُ قراءةً."
            }
          },
          {
            l: { code: "how=\"outer\"" },
            r: {
              en: "504 rows: both sides kept. The audit that found Beit Lahia &mdash; a real town of roughly ninety thousand people in North Gaza with not one of the 503 March listings in it, which is a question worth asking rather than a row worth deleting.",
              ar: "‏504 صفوف: الطرفان يبقيان. وهو التدقيقُ الذي وجد بيت لاهيا &mdash; بلدةٌ حقيقية فيها نحو تسعين ألف نسمة في شمال غزة ولا واحد من إعلانات آذار الـ503 فيها، وهذا سؤالٌ يستحقّ أن يُسأل لا صفًّا يستحقّ أن يُحذف."
            }
          },
          {
            l: { code: "validate=\"m:1\"" },
            r: {
              en: "Not a kind of join: a claim about the key. It raises <code>MergeError: Merge keys are not unique in right dataset</code> <em>before</em> any frame is built, so the failure happens where the cause is.",
              ar: "ليس نوعَ دمج: بل ادّعاءٌ عن المفتاح. فهو يرفع <code>MergeError: Merge keys are not unique in right dataset</code> <em>قبل</em> أن يُبنى أي إطار، فيحدث العطلُ حيث السبب."
            }
          },
          {
            l: { code: "indicator=True" },
            r: {
              en: "Not a kind of join: a report. It adds a <code>_merge</code> column &mdash; <code>both 316, left_only 187</code> on the raw key &mdash; and after a fan-out it would read <code>both 644</code>, which says nothing at all about the duplication.",
              ar: "ليس نوعَ دمج: بل تقريرٌ. فهو يضيف عمودَ <code>_merge</code> &mdash; ‏<code>both 316, left_only 187</code> على المفتاح الخام &mdash; وبعد تضاعفٍ كان سيقرأ <code>both 644</code>، وهذا لا يقول شيئًا على الإطلاق عن التكرار."
            }
          }
        ],
        hint: {
          en: "Two of the four row counts are the same number, so read the <em>second</em> sentence of each item: it says which rows the join keeps rather than how many. And two of the six are not kinds of join at all &mdash; one of them raises and one of them only reports.",
          ar: "اثنان من أعداد الصفوف الأربعة هما الرقمُ نفسه، فاقرأ الجملةَ <em>الثانية</em> من كل بند: فهي تقول أيَّ الصفوف يُبقي الدمجُ لا كم يُبقي. واثنان من الستة ليسا نوعَي دمج أصلًا &mdash; أحدهما يرفع خطأً والآخرُ يُبلّغ فحسب."
        },
        explain: {
          en: "<code>how=</code> decides which non-matching rows survive, and that decision is the entire difference between the four kinds &mdash; four words, each one a different promise about the row count. Inner can fall (or rise on a repeated key), left can never fall but can rise, right can go either way, outer can only rise. On the cleaned key inner and left agree at 503, which is what a working reference join looks like; right and outer return 504, and that one extra row is the point of running them. The two defences are not kinds of join and they catch different things: <code>validate=</code> asserts something about the key and fails early, while <code>indicator=</code> counts what matched and is blind to duplication &mdash; which is why the lesson's rule is both, plus an assertion on the row count. <strong>A merge is the only operation in this chapter that can both delete and duplicate rows, so it is the only one that deserves two assertions.</strong>",
          ar: "تقرّر <code>how=</code> أيُّ الصفوف غير المطابقة يبقى، وذلك القرارُ هو كلُّ الفرق بين الأنواع الأربعة &mdash; أربعُ كلمات، وكلٌّ منها وعدٌ مختلف بشأن عدد الصفوف. فالداخليُّ ينقص (أو يرتفع على مفتاح مكرَّر)، والأيسرُ لا ينقص قط لكنه يرتفع، والأيمنُ في الاتجاهين، والخارجيُّ يرتفع فقط. وعلى المفتاح المنظَّف يتوافق الداخليُّ والأيسر عند 503، وهذا ما يبدو عليه دمجُ مرجعٍ ناجح؛ ويُرجع الأيمنُ والخارجيُّ 504، وذلك الصفُّ الزائد الواحد هو مغزى تشغيلهما. والدفاعان ليسا نوعَي دمج وهما يُسقطان أمورًا مختلفة: فـ<code>validate=</code> يؤكّد شيئًا عن المفتاح ويفشل مبكرًا، و<code>indicator=</code> يعدّ ما طابق وهو أعمى عن التكرار &mdash; ولهذا تكون قاعدةُ الدرس كليهما، مع تأكيدٍ على عدد الصفوف. <strong>فالدمجُ هو العملية الوحيدة في هذا الفصل التي تستطيع حذفَ الصفوف وتكرارها معًا، فهو الوحيدُ الذي يستحقّ تأكيدين.</strong>"
        }
      },

      /* ---------------------------------------------------------- 11 */
      {
        id: "t2l6q11", type: "mcq", level: "medium",
        topics: ["t2-raw-key-merge"],
        q: {
          en: "<code>march.merge(ref, on=\"city\", how=\"inner\")</code> on the file exactly as it was scraped returns <code>(316, 17)</code>. The same merge with <code>how=\"left\", indicator=True</code> reports <code>both 316, left_only 187, right_only 0</code>; <code>march[\"city\"].nunique()</code> is 26, no city cell is blank, and the spellings that matched are the five the reference writes. A population-weighted mean rent on the 316 rows reads <strong>229.9955</strong>, against <strong>380.4478</strong> on the correctly joined 503. Which reading is right?",
          ar: "تُرجع <code>march.merge(ref, on=\"city\", how=\"inner\")</code> على الملف كما زُحف تمامًا <code>(316, 17)</code>. والدمجُ نفسه بـ<code>how=\"left\", indicator=True</code> يُبلّغ <code>both 316, left_only 187, right_only 0</code>؛ و<code>march[\"city\"].nunique()</code> هي 26، ولا خليةَ مدينة فارغة، والصورُ الإملائية التي طابقت هي الخمسُ التي يكتبها المرجع. ومتوسطُ إيجار مرجَّح بالسكان على الصفوف الـ316 يقرأ <strong>229.9955</strong> مقابل <strong>380.4478</strong> على الصفوف الـ503 المدموجة صحيحةً. فأيُّ القراءات صحيحة؟"
        },
        options: [
          {
            en: "Five of the 26 spellings happen to be written exactly as the reference writes them and carry 316 rows; the other 21 &mdash; <code>gaza</code>, <code>KHAN YOUNIS</code>, <code>jabalya</code>, <code>Deir al Balah</code> and the rest &mdash; match nothing, and <code>how=\"inner\"</code> deleted their 187 listings. The 229.9955 looks <em>more</em> reasonable than the truth because listing&nbsp;5062, the rent of 99999 that is a phone number, has its city written <code>JABALIA</code> and was thrown away with them.",
            ar: "خمسٌ من الصور الإملائية الستّ والعشرين تصادف أن تُكتب كما يكتبها المرجعُ بالضبط وتحمل 316 صفًّا؛ والإحدى والعشرون الأخرى &mdash; ‏<code>gaza</code> و<code>KHAN YOUNIS</code> و<code>jabalya</code> و<code>Deir al Balah</code> وغيرها &mdash; لا تطابق شيئًا، و<code>how=\"inner\"</code> حذفت إعلاناتها الـ187. و229.9955 تبدو <em>أعقل</em> من الحقيقة لأن الإعلانَ 5062، أي إيجارَ 99999 الذي هو رقمُ هاتف، مدينتُه مكتوبة <code>JABALIA</code> فأُلقي به معها."
          },
          {
            en: "The merge found 316 real matches and 187 listings that are genuinely outside the six reference cities, so the inner join is correct; 229.9955 is the honest figure and the 380.4478 is inflated by rows the reference cannot describe.",
            ar: "وجد الدمجُ 316 مطابقةً حقيقية و187 إعلانًا تقع فعلًا خارج المدن المرجعية الست، فيكون الدمجُ الداخلي صحيحًا؛ و229.9955 هي الرقمُ الأمين و380.4478 منفوخةٌ بصفوفٍ لا يستطيع المرجعُ وصفها."
          },
          {
            en: "A merge cannot change the row count by itself, so the 187 must have been removed by an earlier <code>dropna</code> and the frame is fine; the two means differ only because the population weights are applied to different city sets.",
            ar: "لا يستطيع الدمجُ أن يغيّر عددَ الصفوف بذاته، فلا بدّ أن <code>dropna</code> أسبقَ حذف الـ187 والإطارُ سليم؛ والمتوسطان يختلفان فقط لأن أوزانَ السكان مطبَّقةٌ على مجموعتَي مدن مختلفتين."
          },
          {
            en: "The 187 are the rows whose <code>city</code> cell is blank, which no join can match; filling them with the commonest city before merging brings the count back to 503 and the mean back to 380.4478.",
            ar: "الـ187 هي الصفوفُ التي خليةُ <code>city</code> فيها فارغة، ولا يستطيع أي دمج مطابقتَها؛ وتعبئتُها بأشيع مدينة قبل الدمج تُعيد العددَ إلى 503 والمتوسطَ إلى 380.4478."
          }
        ],
        answer: 0,
        hint: {
          en: "The raw column holds 26 distinct spellings of five cities and the reference holds six rows. Count how many of the 26 the printed list of matches contains, and then ask which single listing in this file you would least want a step to delete silently.",
          ar: "يحمل العمودُ الخام ستًّا وعشرين صورة إملائية لخمس مدن ويحمل المرجعُ ستةَ صفوف. فعُدَّ كم من الستّ والعشرين تحتوي قائمةُ المطابقات المطبوعة، ثم اسأل أيَّ إعلان في هذا الملف هو آخرُ ما تريد أن تحذفه خطوةٌ بصمت."
        },
        explain: {
          en: "The frame that comes back is not broken in any way a check would notice: 17 sensible columns, no blanks in the reference columns, every city spelled correctly. It is a clean table of a market that does not exist, and every number computed from here is a number about a different market. Then read the two means together, because that is the nastiest part: the broken join silently threw away the worst value error in the file, so the <em>wrong</em> frame produces the <em>more plausible</em> statistic. <strong>A broken step that improves a statistic is the hardest kind of bug to find, because the symptom is a number that looks more reasonable than the truth.</strong> The option that calls the inner join correct is the one a tired reviewer accepts; the <code>dropna</code> option is the named misconception &mdash; a merge is precisely the operation that can delete and duplicate rows, which is why it earns two assertions; and the blank-city option is factually wrong twice, because no city cell is blank and because filling a <em>key</em> with a mode would invent facts rather than find them. The fix is not in the merge at all: <a href=\"#t2l3-s12\">Lesson&nbsp;3's <code>CITY_MAP</code></a> makes the key joinable, and then one line of <code>merge</code> matches 503 of 503. Four concepts of text cleaning exist so that one line of <code>merge</code> can be correct.",
          ar: "الإطارُ الذي يرجع ليس معطوبًا بأي صورة يلاحظها فحص: سبعةَ عشر عمودًا معقولًا، ولا فراغات في أعمدة المرجع، وكلُّ مدينة مكتوبة صحيحة. إنه جدولٌ نظيف لسوق لا وجود لها، وكلُّ رقم يُحسب من هنا رقمٌ عن سوق أخرى. ثم اقرأ المتوسطين معًا، فذاك أخبثُ ما في الأمر: فقد ألقى الدمجُ المعطوب بصمت بأسوأ خطأ قيمة في الملف، فينتج الإطارُ <em>الخاطئ</em> المقياسَ <em>الأعقل</em>. <strong>والخطوةُ المعطوبة التي تُحسّن مقياسًا أصعبُ أنواع الأعطال عثورًا، لأن العَرَضَ رقمٌ يبدو أعقل من الحقيقة.</strong> والخيارُ الذي يسمّي الدمجَ الداخلي صحيحًا هو الذي يقبله مراجعٌ متعب؛ وخيارُ <code>dropna</code> هو الوهمُ المسمّى &mdash; فالدمجُ هو بالضبط العملية التي تستطيع حذفَ الصفوف وتكرارها، ولهذا يستحقّ تأكيدين؛ وخيارُ المدينة الفارغة خاطئٌ واقعيًّا مرتين، لأن لا خليةَ مدينة فارغة ولأن تعبئةَ <em>مفتاح</em> بمنوالٍ تختلق وقائع لا تجدها. والعلاجُ ليس في الدمج أصلًا: فـ<a href=\"#t2l3-s12\"><code>CITY_MAP</code> في الدرس 3</a> يجعل المفتاح قابلًا للدمج، فيطابق سطرُ <code>merge</code> واحد 503 من 503. فأربعةُ مفاهيم من تنظيف النصّ موجودةٌ ليستطيع سطرُ <code>merge</code> واحد أن يكون صحيحًا."
        }
      },

      /* ---------------------------------------------------------- 12 */
      {
        id: "t2l6q12", type: "tf", level: "medium",
        topics: ["t2-clean-key-merge", "t2-fan-out"],
        q: {
          en: "On the cleaned key, <code>how=\"inner\"</code> and <code>how=\"left\"</code> both return 503 rows, and the lesson calls that equality the signature of a join that worked. <strong>True or false:</strong> because the two counts agree, the one-line test <code>len(inner) == len(left)</code> is enough to prove that the merge neither dropped nor duplicated a listing.",
          ar: "على المفتاح المنظَّف تُرجع <code>how=\"inner\"</code> و<code>how=\"left\"</code> كلتاهما 503 صفوف، ويسمّي الدرسُ ذلك التوافقَ توقيعَ دمجٍ نجح. <strong>صح أم خطأ:</strong> لأن العددين يتوافقان، يكون الاختبارُ بسطر واحد <code>len(inner) == len(left)</code> كافيًا لإثبات أن الدمجَ لم يُسقط إعلانًا ولم يكرّره."
        },
        truth: false,
        hint: {
          en: "Append the reference file to itself so that Gaza appears twice, then run both joins again and compare the two counts with each other &mdash; not with 503. Does <code>how=</code> have anything at all to say about a key that repeats on the right?",
          ar: "ألحِق ملفَّ المرجع بنفسه فتظهر غزة مرتين، ثم شغّل الدمجين مرةً أخرى وقارِن العددين أحدَهما بالآخر &mdash; لا بـ503. فهل لـ<code>how=</code> ما تقوله أصلًا عن مفتاح يتكرّر في اليمين؟"
        },
        explain: {
          en: "The equality really does rule out dropped rows, and that is the half the lesson asserts &mdash; which is exactly why the overreach is tempting. It says nothing about duplication, because a repeated right-hand key fans <em>both</em> joins out by exactly the same amount: with Gaza appearing twice in the reference, inner and left both return 673 rows on the 503 clean listings (and both return 644 on the 480 flats), still equal to each other, still wrong. Read the mechanism and the reason is obvious: the row count of a merge is a sum of products, one term per key value, and <code>how=</code> decides what happens to a term whose right-hand count is <em>zero</em> &mdash; left keeps it as one blank row, inner drops it &mdash; while saying nothing at all about a term whose right-hand count is two. <strong>The defence is a statement about the key, not about the join.</strong> That is why the pipeline's enrich step carries both <code>validate=\"m:1\"</code>, which raises before the frame exists, and <code>assert len(out) == n</code>, which catches the same damage from any other cause, including a future edit that changes <code>how=</code>.",
          ar: "التوافقُ ينفي الصفوفَ المُسقَطة فعلًا، وهذا هو النصفُ الذي يؤكّده الدرس &mdash; ولهذا بالضبط يكون التجاوزُ مغريًا. وهو لا يقول شيئًا عن التكرار، لأن المفتاحَ المكرَّر في اليمين يضاعف <em>الدمجين</em> بالمقدار نفسه بالضبط: فبظهور غزة مرتين في المرجع يُرجع الداخليُّ والأيسر كلاهما 673 صفًّا على الإعلانات المنظَّفة الـ503 (ويُرجع كلاهما 644 على الشقق الـ480)، متوافقين أحدَهما مع الآخر، وخاطئين. واقرأ الآليةَ فيظهر السبب: فعددُ صفوف الدمج مجموعُ حواصل ضرب، حدٌّ لكل قيمة مفتاح، وتقرّر <code>how=</code> ما يحدث لحدٍّ عددُه الأيمن <em>صفر</em> &mdash; فالأيسرُ يُبقيه صفًّا فارغًا والداخليُّ يُسقطه &mdash; ولا تقول شيئًا على الإطلاق عن حدٍّ عددُه الأيمن اثنان. <strong>فالدفاعُ ادّعاءٌ عن المفتاح لا عن الدمج.</strong> ولهذا تحمل خطوةُ الإغناء في الخط <code>validate=\"m:1\"</code> التي ترفع قبل أن يوجد الإطار، و<code>assert len(out) == n</code> التي تُسقط الضررَ نفسه من أي سبب آخر، ومنه تعديلٌ لاحق يغيّر <code>how=</code>."
        }
      },

      /* ---------------------------------------------------------- 13 */
      {
        id: "t2l6q13", type: "output", level: "medium",
        topics: ["t2-fan-out"],
        q: {
          en: "Somebody re-sent <code>city_reference.csv</code> and it was appended rather than replaced, so Gaza appears twice. The file still looks fine: sensible values, nothing missing. <code>flats</code> is the 480-flat frame with 23 columns, and its city counts are Gaza 164, Khan Younis 122, Rafah 82, Deir al-Balah 61, Jabalia 51. Write exactly what the program prints.",
          ar: "أعاد أحدهم إرسال <code>city_reference.csv</code> فأُلحق بدل أن يُستبدَل، فظهرت غزة مرتين. والملفُّ ما زال يبدو سليمًا: قيمٌ معقولة ولا شيء مفقود. و<code>flats</code> هو إطارُ الشقق الـ480 بثلاثة وعشرين عمودًا، وأعدادُ مدنه: غزة 164 وخان يونس 122 ورفح 82 ودير البلح 61 وجباليا 51. اكتب بالضبط ما يطبعه البرنامج."
        },
        code: code(
          "ref_dup = pd.concat([ref, ref[ref[\"city\"] == \"Gaza\"]], ignore_index=True)   # 7 rows",
          "fan = flats.merge(ref_dup, on=\"city\", how=\"left\")",
          "",
          "print(fan.shape, len(fan) - len(flats))",
          "print(fan[\"listing_id\"].is_unique)",
          "print(\"%.4f %.4f\" % (flats[\"monthly_rent\"].mean(), fan[\"monthly_rent\"].mean()))",
          "",
          "# the mean rent of the 480 flats is 211.0458"
        ),
        blanks: [
          { accept: ["(644, 27) 164\nFalse\n211.0458 223.5878"], lines: 3 }
        ],
        hint: {
          en: "The row count of a merge is a sum of products, one term per key value: count the rows per key on each side and multiply. Only one city's term changes. <code>ref</code> has five columns and the key is shared. And <code>how=\"left\"</code> promises that no left row is <em>lost</em>, which is not the same promise as no left row is <em>duplicated</em>.",
          ar: "عددُ صفوف الدمج مجموعُ حواصل ضرب، حدٌّ لكل قيمة مفتاح: فعُدَّ الصفوفَ لكل مفتاح في كل طرف واضرب. ويتغيّر حدُّ مدينة واحدة فقط. و<code>ref</code> فيه خمسةُ أعمدة والمفتاحُ مشترك. و<code>how=\"left\"</code> تَعِد بأن لا يُفقَد صفٌّ أيسر، وذاك ليس وعدَ ألّا يُكرَّر صفٌّ أيسر."
        },
        explain: {
          en: "Gaza's term is 164&nbsp;&times;&nbsp;2&nbsp;=&nbsp;328 and every other city's is <code>n &times; 1 = n</code>, so the sum of products is 644 and the increase, 328&nbsp;&minus;&nbsp;164&nbsp;=&nbsp;164, is exactly the number of Gaza flats. The width is 23&nbsp;+&nbsp;4: five reference columns, of which <code>city</code> is the shared key. This is a <strong>cartesian fan-out</strong>, and <code>how=\"left\"</code> does not protect you from it &mdash; the promise of a left join is &ldquo;no left row is lost&rdquo;, never &ldquo;no left row is duplicated&rdquo;. Read the last line for the damage: not one cell was edited, and the mean rent moved by 12.54 shekels (and the median by 10), because the Gaza flats now vote twice each and Gaza is the dearest of the five cities. Every later <code>groupby</code>, every count and every model weight is now computed on a file in which one city is over-represented by a factor of two &mdash; and worse, a fan-out <em>before</em> a split is a leak and not merely an imbalance, because the duplicates land on both sides of the split and one flat can appear in training and in testing at once. Three consequences follow from the formula: a key that is unique on one side cannot fan out (which is the claim <code>validate=\"m:1\"</code> enforces), a fan-out is multiplicative rather than additive, and <code>how=</code> is the wrong place to look for the defence.",
          ar: "حدُّ غزة 164 × 2 = 328 وحدُّ كل مدينة أخرى <code>n × 1 = n</code>، فيكون مجموعُ حواصل الضرب 644 وتكون الزيادةُ 328 &minus; 164 = 164 هي بالضبط عددَ شقق غزة. والعرضُ 23 + 4: خمسةُ أعمدة مرجع، منها <code>city</code> المفتاحُ المشترك. وهذا <strong>تضاعفٌ ديكارتي</strong>، و<code>how=\"left\"</code> لا تحميك منه &mdash; فوعدُ الدمج الأيسر «لا يُفقد صفٌّ أيسر» لا «لا يُكرَّر صفٌّ أيسر». واقرأ السطرَ الأخير لترى الضرر: لم تُحرَّر خليةٌ واحدة، وانزاح متوسطُ الإيجار 12.54 شيكلًا (والوسيطُ عشرةً)، لأن شقق غزة تصوّت الآن مرتين لكلٍّ منها وغزةُ أغلى المدن الخمس. وكلُّ <code>groupby</code> لاحقة وكلُّ عدّ وكلُّ وزن نموذج محسوبٌ الآن على ملفٍ مدينةٌ فيه ممثَّلةٌ بضِعفَي حقها &mdash; والأسوأ أن التضاعفَ <em>قبل</em> التقسيم تسريبٌ لا مجردُ اختلال توازن، لأن المكرَّرات تهبط في طرفَي القسمة وتستطيع شقةٌ أن تظهر في التدريب والاختبار معًا. وثلاثُ نتائج تتبع الصيغة: فالمفتاحُ الفريد في طرف لا يستطيع التضاعف (وهذا هو ادّعاءُ <code>validate=\"m:1\"</code>)، والتضاعفُ ضربيٌّ لا جمعيّ، و<code>how=</code> هي الموضعُ الخطأ للبحث عن الدفاع."
        }
      },

      /* ---------------------------------------------------------- 14 */
      {
        id: "t2l6q14", type: "order", level: "medium",
        topics: ["t2-merge-defences", "t2-fan-out"],
        q: {
          en: "Four versions of the pipeline's <code>enrich</code> step, the one that adds the reference columns. Put them in the order the lesson develops them, where each version fixes a <em>named</em> defect of the one before it and the last is the recommended form.",
          ar: "أربعُ نسخ من خطوة <code>enrich</code> في الخط، وهي التي تضيف أعمدةَ المرجع. رتّبها بالترتيب الذي يُنمّيها به الدرس، حيث تُصلح كلُّ نسخة عيبًا <em>مسمًّى</em> في التي قبلها وتكون الأخيرةُ هي الصورةَ الموصى بها."
        },
        items: [
          {
            en: "<strong>One line, no questions</strong> &mdash; <code>return d.merge(REF, on=\"city\", how=\"left\")</code>. Correct on a good day and silent on a bad one: it survives an unmatched city (the reference columns come back blank, which you may never look at) and it survives a duplicated reference row (the frame grows, which you will certainly not look at). <em>Nothing in the function says what the author believed about the key.</em>",
            ar: "<strong>سطرٌ واحد بلا أسئلة</strong> &mdash; ‏<code>return d.merge(REF, on=\"city\", how=\"left\")</code>. صحيحةٌ في يوم جيّد وصامتةٌ في يوم سيّئ: فهي تنجو من مدينة غير مطابقة (فتعود أعمدةُ المرجع فارغة، وقد لا تنظر إليها قط) وتنجو من صف مرجع مكرَّر (فينمو الإطار، وأنت بالتأكيد لن تنظر). <em>ولا شيء في الدالة يقول ما اعتقده المؤلّف بشأن المفتاح.</em>"
          },
          {
            en: "<strong>Add <code>indicator=True</code></strong> &mdash; count the <code>left_only</code> rows, drop <code>_merge</code> again straight away, and return the count beside the frame. <em>Fixes the first named defect:</em> an unmatched city is now a number you can print and act on rather than a column of blanks nobody reads. <em>Still open:</em> a duplicated reference row still multiplies the frame, and <code>unmatched</code> would read <code>0</code> while the row count doubled.",
            ar: "<strong>أضِف <code>indicator=True</code></strong> &mdash; عُدَّ صفوفَ <code>left_only</code> وأسقِط <code>_merge</code> على الفور وأرجِع العددَ بجانب الإطار. <em>تُصلح العيبَ الأول المسمّى:</em> فصارت المدينةُ غير المطابقة رقمًا تستطيع طبعه والتصرّفَ به لا عمودَ فراغات لا يقرؤه أحد. <em>وما زال مفتوحًا:</em> فصفُّ المرجع المكرَّر ما زال يضاعف الإطار، وستقرأ <code>unmatched</code> صفرًا وعددُ الصفوف قد تضاعف."
          },
          {
            en: "<strong>Add <code>validate=\"m:1\"</code> and a row-count assertion</strong> &mdash; the first raises <code>MergeError</code> <em>before</em> the frame exists, the second catches the same damage from any other cause, including a future edit that changes <code>how=</code>. Belt and braces, justified because this is the one operation in the chapter that can change the row count in both directions. <em>Still open:</em> the function cannot be reused for a second reference table, and the columns it adds are not idempotent.",
            ar: "<strong>أضِف <code>validate=\"m:1\"</code> وتأكيدًا على عدد الصفوف</strong> &mdash; فالأولُ يرفع <code>MergeError</code> <em>قبل</em> أن يوجد الإطار، والثاني يُسقط الضررَ نفسه من أي سبب آخر، ومنه تعديلٌ لاحق يغيّر <code>how=</code>. والحزامُ والحمّالتان معًا، وهما مبرَّران لأن هذه هي العملية الوحيدة في الفصل التي تستطيع تغييرَ عدد الصفوف في الاتجاهين. <em>وما زال مفتوحًا:</em> فالدالةُ لا تصلح لإعادة الاستعمال مع جدول مرجع ثانٍ، والأعمدةُ التي تضيفها غير متماثلة عند التكرار."
          },
          {
            en: "<strong>A pipeline step that reports</strong> &mdash; returns the <code>(frame, log_row)</code> pair so the unmatched count lands in the pipeline's report instead of on somebody's screen; <strong>drops the reference columns before adding them</strong>, which is what makes the step idempotent, because without that line a second run gives you <code>population_x</code> and <code>population_y</code> and a <code>KeyError</code> at the next step; and restores the caller's index, because <code>merge</code> always returns a fresh <code>RangeIndex</code>.",
            ar: "<strong>خطوةُ خطٍّ تُبلِّغ</strong> &mdash; تُرجع الزوجَ <code>(frame, log_row)</code> فيهبط عددُ غير المطابق في تقرير الخط لا على شاشة أحدهم؛ و<strong>تُسقط أعمدةَ المرجع قبل إضافتها</strong>، وهذا ما يجعل الخطوةَ متماثلةً عند التكرار، فبدون ذلك السطر يعطيك تشغيلٌ ثانٍ <code>population_x</code> و<code>population_y</code> و<code>KeyError</code> في الخطوة التالية؛ وتعيد فهرسَ المنادي، لأن <code>merge</code> تُرجع دائمًا <code>RangeIndex</code> جديدًا."
          }
        ],
        answer: [0, 1, 2, 3],
        hint: {
          en: "Read the <em>named defect</em> at the end of each item and find the one whose first sentence the next item repairs. One of the four is the only one that can be run twice on the same frame, and one of them fails before a frame exists rather than after.",
          ar: "اقرأ <em>العيبَ المسمّى</em> في آخر كل بند واعثر على الذي تُصلحه الجملةُ الأولى من البند التالي. وواحدٌ من الأربعة هو الوحيدُ الذي يمكن تشغيله مرتين على الإطار نفسه، وواحدٌ منها يفشل قبل أن يوجد إطار لا بعده."
        },
        explain: {
          en: "The chain is a chain of defects, not of polish. Version&nbsp;1 is what everybody writes, and its two silent failures are the two a merge can have: a key that matches nothing and a key that matches twice. <code>indicator=</code> makes the first one audible and is blind to the second &mdash; it would report <code>both: 644</code> after a fan-out, which tells you nothing is unmatched and says nothing at all about the duplication. <code>validate=\"m:1\"</code> plus an assertion closes the second twice over on purpose: the first fails where the cause is, the second survives a future edit to the line. And Version&nbsp;4 earns its place with three changes that are about living in a pipeline rather than about being correct: the log row, so the number reaches the report; the <code>drop</code> before the <code>merge</code>, which is what idempotence costs; and the restored index, because <a href=\"#t2l6-s7\">Concept&nbsp;2</a> has just shown what a changed index does to an assignment. The rule to carry away is shorter than all four: <strong>assert the row count after every merge, and prefer <code>validate=</code> to finding out later.</strong>",
          ar: "السلسلةُ سلسلةُ عيوب لا سلسلةُ صقل. فالنسخةُ 1 هي ما يكتبه الجميع، وعطلاها الصامتان هما العطلان اللذان يستطيع الدمجُ أن يُصاب بهما: مفتاحٌ لا يطابق شيئًا ومفتاحٌ يطابق مرتين. وتُسمِع <code>indicator=</code> الأولَ وهي عمياء عن الثاني &mdash; فكانت ستُبلّغ <code>both: 644</code> بعد تضاعف، وهذا يخبرك أن لا شيء غير مطابق ولا يقول شيئًا عن التكرار. وتُغلق <code>validate=\"m:1\"</code> مع تأكيدٍ الثانيَ مرتين عن قصد: فالأولُ يفشل حيث السبب، والثاني ينجو من تعديل لاحق للسطر. وتستحقّ النسخةُ 4 موضعها بثلاثة تغييرات تتعلّق بالسكن في خط تحويل لا بالصحّة: سطرُ السجل فيبلغ الرقمُ التقرير؛ و<code>drop</code> قبل <code>merge</code>، وهذا ثمنُ التماثل عند التكرار؛ والفهرسُ المستعاد، فقد أرى <a href=\"#t2l6-s7\">المفهوم 2</a> لحظةً ما يفعله فهرسٌ متغيّر بالإسناد. والقاعدةُ التي تحملها معك أقصرُ من الأربع: <strong>أكّد عددَ الصفوف بعد كل دمج، وفضّل <code>validate=</code> على أن تعرف لاحقًا.</strong>"
        }
      },

      /* ---------------------------------------------------------- 15 */
      {
        id: "t2l6q15", type: "fill", level: "medium",
        topics: ["t2-concat-nan"],
        q: {
          en: "June's file has arrived, each month is encoded on its own, and the two are stacked. March's dummies are 52 columns wide and June's 13; the stacked frame is 54 wide, and the two columns June has that March does not are <code>city_Beit Lahia</code> and <code>condition_very good</code>. Fill the three blanks so that the second line reproduces the blank count by hand and the third shows the dtype of a column present on both sides beside the dtype of the column that records June's new <em>condition</em> level.",
          ar: "وصل ملفُّ حزيران، ورُمِّز كلُّ شهر على انفراد، ثم رُصّ الاثنان. ومؤشِّراتُ آذار عرضها 52 عمودًا ومؤشِّراتُ حزيران 13؛ والإطارُ المرصوص عرضه 54، والعمودان اللذان يملكهما حزيران ولا يملكهما آذار هما <code>city_Beit Lahia</code> و<code>condition_very good</code>. املأ الفراغات الثلاثة ليُعيد السطرُ الثاني إنتاجَ عدد الفراغات باليد ويُظهر الثالثُ نوعَ عمود موجود في الطرفين بجانب نوع العمود الذي يسجّل مستوى <em>الحالة</em> الجديد في حزيران."
        },
        code: code(
          "COLS = [\"city\", \"condition\", \"furnished\"]",
          "A = pd.get_dummies(march[COLS], dtype=\"int8\")      # (503, 52)",
          "B = pd.get_dummies(june[COLS],  dtype=\"int8\")      # (85, 13)",
          "stacked = pd.concat([A, B], axis=0)                # join=\"outer\", the default",
          "",
          "print(stacked.shape, int(stacked.isna().sum().sum()))",
          "print(len(B) * ____1____ + len(A) * ____2____)",
          "print(stacked[\"city_Gaza\"].dtype, stacked[\"____3____\"].dtype)",
          "",
          "# (588, 54) 4491",
          "# 4491",
          "# int8 float64"
        ),
        blanks: [
          { accept: ["41"], label: { en: "blank 1", ar: "الفراغ 1" } },
          { accept: ["2"], label: { en: "blank 2", ar: "الفراغ 2" } },
          { accept: ["condition_very good"], label: { en: "blank 3", ar: "الفراغ 3" } }
        ],
        hint: {
          en: "Every June row is blank in the columns that only March had, and every March row is blank in the columns that only June has. Those two counts add up to 43, the number of columns that hold a blank at all, and 54&nbsp;&minus;&nbsp;43&nbsp;=&nbsp;11 is what the two files agree on.",
          ar: "كلُّ صف من حزيران فارغٌ في الأعمدة التي كانت لآذار وحده، وكلُّ صف من آذار فارغٌ في الأعمدة التي لحزيران وحده. والعددان يبلغان معًا 43، وهو عددُ الأعمدة التي تحمل فراغًا أصلًا، و54 &minus; 43 = 11 هو ما يتوافق عليه الملفان."
        },
        explain: {
          en: "<code>concat</code> is not a merge: nothing is matched on a key. It lines up <em>columns by name</em> and stacks the rows, which is the whole mechanism and the reason two independently encoded files cannot be stacked safely. Fifty-four columns is 52 plus the two June has; 43 of them hold a blank, and the arithmetic is worth doing by hand because it says exactly what happened: <strong>85&nbsp;&times;&nbsp;41&nbsp;+&nbsp;503&nbsp;&times;&nbsp;2&nbsp;=&nbsp;3485&nbsp;+&nbsp;1006&nbsp;=&nbsp;4491</strong>. The 41 are <code>city_gaza</code>, <code>city_KHAN YOUNIS</code>, <code>furnished_ no</code> and the rest of <a href=\"#t2l3-s10\">Lesson&nbsp;3's</a> twenty-six spellings. The dtype line is the cheapest signal you have: a column present on both sides stays <code>int8</code>, and every column present on one side only has been promoted to <code>float64</code> to hold the <code>NaN</code> &mdash; <strong>a silent dtype change is the cheapest sign that a <code>concat</code> did something you did not intend.</strong> And the tempting repair, <code>.fillna(0)</code>, is wrong in a way that is hard to see: a zero in <code>condition_very good</code> for a March flat is the positive claim &ldquo;this flat is not in very good condition&rdquo;, and March never offered that option, so the claim is unfounded for all 503 of them. A blank in a dummy column means <em>unknown</em>, not <em>no</em>.",
          ar: "‏<code>concat</code> ليست دمجًا: فلا شيء يُطابَق على مفتاح. بل تصطفّ <em>الأعمدةَ بالاسم</em> وترُصّ الصفوف، وهذه هي الآليةُ كلها وسببُ أن ملفين رُمِّزا على انفراد لا يمكن رصُّهما رصًّا آمنًا. فأربعةٌ وخمسون عمودًا هي 52 زائد العمودين اللذين يملكهما حزيران؛ وثلاثةٌ وأربعون منها تحمل فراغًا، والحسابُ يستحقّ أن يُجرى باليد لأنه يقول بالضبط ما حدث: <strong>‏85 × 41 + 503 × 2 = 3485 + 1006 = 4491</strong>. والـ41 هي <code>city_gaza</code> و<code>city_KHAN YOUNIS</code> و<code>furnished_ no</code> وبقيةُ الصور الإملائية الستّ والعشرين في <a href=\"#t2l3-s10\">الدرس 3</a>. وسطرُ النوع أرخصُ إشارة عندك: فالعمودُ الموجود في الطرفين يبقى <code>int8</code>، وكلُّ عمود موجود في طرف واحد قد رُقِّي إلى <code>float64</code> ليحمل <code>NaN</code> &mdash; <strong>وتغيُّرُ النوع الصامت أرخصُ علامة على أن <code>concat</code> فعلت ما لم تقصده.</strong> والإصلاحُ المغري <code>.fillna(0)</code> خاطئٌ بصورة يصعب رؤيتها: فالصفرُ في <code>condition_very good</code> لشقة من آذار ادّعاءٌ موجب يقول «هذه الشقة ليست في حالة جيدة جدًّا»، وآذارُ لم يعرض ذلك الخيار قط، فالادّعاءُ بلا أساس للـ503 كلها. فالفراغُ في عمود مؤشِّر يعني <em>غيرَ معروف</em> لا <em>لا</em>."
        }
      },

      /* ---------------------------------------------------------- 16 */
      {
        id: "t2l6q16", type: "error", level: "hard",
        topics: ["t2-concat-join-inner", "t2-stacking-fix"],
        q: {
          en: "This cell is meant to stack two months into one frame in which a row with no city flag at all means exactly one thing &mdash; <em>a city the level list does not cover</em> &mdash; so that the two Beit Lahia listings are findable in one line. It runs, it reports no blank cells, and it has made that impossible. Click the line that destroys the information.",
          ar: "تهدف هذه الخليةُ إلى رصّ شهرين في إطار واحد يعني فيه الصفُّ الذي لا علمَ مدينة له شيئًا واحدًا بالضبط &mdash; <em>مدينةٌ لا تغطّيها قائمةُ المستويات</em> &mdash; ليكون إعلانا بيت لاهيا قابلين للعثور عليهما بسطر واحد. وهي تعمل وتُبلّغ ألّا خلايا فارغة وقد جعلت ذلك مستحيلًا. انقر السطر الذي يُهلك المعلومة."
        },
        code: code(
          "COLS = [\"city\", \"condition\", \"furnished\"]",
          "A = pd.get_dummies(march[COLS], dtype=\"int8\")          # March on its own: (503, 52)",
          "B = pd.get_dummies(june[COLS],  dtype=\"int8\")          # June on its own:  (85, 13)",
          "",
          "stacked = pd.concat([A, B], axis=0)                    # (588, 54), 4491 blank cells",
          "fixed   = pd.concat([A, B], axis=0, join=\"inner\")      # \"and now the blanks are gone\"",
          "",
          "city = [c for c in fixed.columns if c.startswith(\"city_\")]",
          "print(\"shape:\", fixed.shape, \"| blank cells:\", int(fixed.isna().sum().sum()))",
          "print(\"rows with no city flag at all:\", int((fixed[city].sum(axis=1) == 0).sum()))",
          "print(\"columns dropped:\", stacked.shape[1] - fixed.shape[1])",
          "",
          "# shape: (588, 11) | blank cells: 0",
          "# rows with no city flag at all: 189",
          "# columns dropped: 43"
        ),
        answer: 6,
        solution: {
          code: code(
            "CITY_LEVELS = sorted(march[\"city\"].str.strip().str.lower()",
            "                          .str.replace(r\"\\s+\", \" \", regex=True).map(CITY_MAP).dropna().unique())",
            "",
            "def encode_city(d, levels):",
            "    \"\"\"Encode against a FITTED list, not against whatever this file happens to contain.\"\"\"",
            "    c = d[\"city\"].str.strip().str.lower().str.replace(r\"\\s+\", \" \", regex=True).map(CITY_MAP)",
            "    return pd.get_dummies(pd.Categorical(c, categories=levels),",
            "                          prefix=\"city\", dtype=\"int8\").set_index(d.index)",
            "",
            "both = pd.concat([encode_city(march, CITY_LEVELS), encode_city(june, CITY_LEVELS)],",
            "                 keys=[\"march\", \"june\"], names=[\"batch\"])",
            "",
            "print(\"levels:\", CITY_LEVELS)",
            "print(\"stacked:\", both.shape, \"| blank cells:\", int(both.isna().sum().sum()))",
            "print(\"rows no level covers:\", int((both.sum(axis=1) == 0).sum()))"
          ),
          out: code(
            "levels: ['Deir al-Balah', 'Gaza', 'Jabalia', 'Khan Younis', 'Rafah']",
            "stacked: (588, 5) | blank cells: 0",
            "rows no level covers: 2"
          ),
          en: "Do not reconcile two column sets after they have diverged; stop them diverging. Both batches are encoded against the same fitted list of five names, so their column sets are <strong>identical by construction</strong> and <code>concat</code> has nothing to reconcile: five columns, 588 rows, no blanks, nothing dropped &mdash; and exactly 2 rows that no level covers, which are the Beit Lahia listings and are now findable. The difference between this and <code>join=\"inner\"</code> is not the number of columns; it is that here the two unseen rows can be found and there they were indistinguishable from 187 correctly-spelled ones.",
          ar: "لا توفّق بين مجموعتَي أعمدة بعد أن تفارقتا؛ بل امنع تفارقهما. فتُرمَّز الدفعتان على قائمة الأسماء الخمسة المضبوطة نفسها، فتكون مجموعتا أعمدتهما <strong>مطابقتين بحكم البناء</strong> ولا يكون لـ<code>concat</code> شيءٌ توفّق بينه: خمسةُ أعمدة و588 صفًّا وبلا فراغات ولم يُسقَط شيء &mdash; وصفّان بالضبط لا يغطّيهما أي مستوى، وهما إعلانا بيت لاهيا وقد صارا قابلين للعثور. والفرقُ بين هذه و<code>join=\"inner\"</code> ليس عددَ الأعمدة؛ بل أن الصفّين غير المرئيين هنا يمكن العثورُ عليهما، وهناك كانا لا يُميَّزان عن 187 صفًّا صحيحةِ الإملاء."
        },
        hint: {
          en: "Line 10 counts 189 rows with no city flag. Two of them are the Beit Lahia listings; work out where the other 187 came from, and then ask which line made the two kinds of row look the same.",
          ar: "يعدّ السطر 10 ‏189 صفًّا بلا علم مدينة. واثنان منها إعلانا بيت لاهيا؛ فاستنتج من أين جاءت الـ187 الأخرى، ثم اسأل أيُّ سطر جعل نوعَي الصف يبدوان متشابهين."
        },
        explain: {
          en: "Line 6 is the damage. <code>join=\"inner\"</code> keeps the columns present on both sides and throws the other 43 away &mdash; so the twenty-one misspelled city columns are gone, which is good, and so are <code>city_Beit Lahia</code> and <code>condition_very good</code>, which is not, because those were the only places June's new values were recorded. The 187 March rows whose city was misspelled now have an all-zero city block, and so do the two genuine Beit Lahia flats: <strong>189 all-zero rows, and the frame cannot tell you which is which.</strong> Zero blanks looks like a clean result and is a catastrophe, because a blank is <em>information</em> &mdash; it says &ldquo;this column was not defined for this batch&rdquo;, and <code>isna().sum()</code> finds all 4,491 of them in one line &mdash; while an all-zero row says nothing at all. Be sure of what <code>join=</code> does and does not do: it controls which <em>columns</em> survive, never which rows; a <code>concat</code> on <code>axis=0</code> keeps every row of every frame, always, which is why the shape is still 588. Line 5 is the tempting click, and the 4,491 blanks really are a problem &mdash; but they are the visible record of a disagreement, and <code>.fillna(0)</code> on them is the second wrong repair. The real mistake is earlier than either line: the two files were encoded independently, so each invented its own columns, and the fix is the fitted category list.",
          ar: "السطر 6 هو الضرر. فيُبقي <code>join=\"inner\"</code> الأعمدةَ الموجودة في الطرفين ويُلقي بالأعمدة الـ43 الأخرى &mdash; فتذهب أعمدةُ المدن الواحدة والعشرون الخاطئة الإملاء، وهذا جيّد، ويذهب كذلك <code>city_Beit Lahia</code> و<code>condition_very good</code>، وهذا غيرُ جيّد، لأن تلك كانت المواضعَ الوحيدة التي سُجّلت فيها قيمُ حزيران الجديدة. فصفوفُ آذار الـ187 التي أُخطئ في إملاء مدينتها صار لها الآن مقطعُ مدينة كلُّه أصفار، وكذلك شقتا بيت لاهيا الحقيقيتان: <strong>‏189 صفًّا كلُّه أصفار، ولا يستطيع الإطار أن يقول لك أيٌّ أيٌّ.</strong> وصفرُ فراغات يبدو نتيجةً نظيفة وهو كارثة، لأن الفراغَ <em>معلومة</em> &mdash; فهو يقول «هذا العمود لم يكن معرَّفًا لهذه الدفعة»، وتجد <code>isna().sum()</code> الـ4491 كلها في سطر واحد &mdash; أما الصفُّ الذي كلُّه أصفار فلا يقول شيئًا على الإطلاق. وتثبّت من فعل <code>join=</code> وما ليس من فعله: فهي تتحكّم في أيِّ <em>الأعمدة</em> يبقى لا في أيِّ الصفوف؛ و<code>concat</code> على <code>axis=0</code> تُبقي كلَّ صف من كل إطار دائمًا، ولهذا ما زال الشكلُ 588. والسطر 5 هو النقرةُ المغرية، والفراغاتُ الـ4491 مشكلةٌ فعلًا &mdash; لكنها السجلُّ المرئي لخلاف، و<code>.fillna(0)</code> عليها هي الإصلاحُ الخاطئ الثاني. والخطأُ الحقيقي أسبقُ من السطرين: فقد رُمِّز الملفان على انفراد فاختلق كلٌّ أعمدته، والعلاجُ هو قائمةُ الفئات المضبوطة."
        }
      },

      /* ---------------------------------------------------------- 17 */
      {
        id: "t2l6q17", type: "complete", level: "easy",
        topics: ["t2-concat-index"],
        q: {
          en: "Both files were read with a default <code>RangeIndex</code>, so after a plain <code>concat</code> the labels 0 to 84 appear twice. Complete the line so that the program prints exactly the three lines in the comment.",
          ar: "قُرئ الملفان بفهرس <code>RangeIndex</code> افتراضي، فصارت اللافتاتُ من 0 إلى 84 تظهر مرتين بعد <code>concat</code> عادية. أكمِل السطرَ ليطبع البرنامجُ الأسطرَ الثلاثة في التعليق بالضبط."
        },
        code: code(
          "A = pd.get_dummies(march[COLS], dtype=\"int8\")      # (503, 52), index 0 .. 502",
          "B = pd.get_dummies(june[COLS],  dtype=\"int8\")      # (85, 13),  index 0 .. 84",
          "",
          "stacked = ______",
          "",
          "print(\"index unique:\", stacked.index.is_unique)",
          "print(\"index levels:\", stacked.index.names)",
          "print(\"rows in each batch:\", stacked.groupby(level=\"batch\").size().to_dict())",
          "",
          "# index unique: True",
          "# index levels: ['batch', None]",
          "# rows in each batch: {'june': 85, 'march': 503}"
        ),
        options: [
          { code: "pd.concat([A, B], axis=0)" },
          { code: "pd.concat([A, B], axis=0, ignore_index=True)" },
          { code: "pd.concat([A, B], axis=0, keys=[\"march\", \"june\"], names=[\"batch\"])" },
          { code: "pd.concat([A, B], axis=1, keys=[\"march\", \"june\"], names=[\"batch\"])" }
        ],
        answer: 2,
        solution: {
          code: code(
            "A = pd.get_dummies(march[COLS], dtype=\"int8\")      # (503, 52), index 0 .. 502",
            "B = pd.get_dummies(june[COLS],  dtype=\"int8\")      # (85, 13),  index 0 .. 84",
            "",
            "stacked = pd.concat([A, B], axis=0, keys=[\"march\", \"june\"], names=[\"batch\"])",
            "",
            "print(\"index unique:\", stacked.index.is_unique)",
            "print(\"index levels:\", stacked.index.names)",
            "print(\"rows in each batch:\", stacked.groupby(level=\"batch\").size().to_dict())"
          ),
          out: code(
            "index unique: True",
            "index levels: ['batch', None]",
            "rows in each batch: {'june': 85, 'march': 503}"
          ),
          en: "<code>keys=</code> builds a two-level index whose outer level records which batch each row came from, and <code>names=[\"batch\"]</code> gives that level the name the <code>groupby</code> asks for. The labels become unique as a side effect, and you also gain the answer to &ldquo;which month is this row?&rdquo; &mdash; a question you will ask within the hour.",
          ar: "تبني <code>keys=</code> فهرسًا من مستويين يسجّل مستواه الخارجي من أي دفعة جاء كل صف، وتُعطي <code>names=[\"batch\"]</code> ذلك المستوى الاسمَ الذي تطلبه <code>groupby</code>. وتصير اللافتاتُ فريدةً أثرًا جانبيًّا، وتكسب أيضًا جوابَ «من أي شهر هذا الصف؟» &mdash; وهو سؤالٌ ستسأله في خلال ساعة."
        },
        hint: {
          en: "Read the third printed line first: it groups by a level <em>called</em> <code>batch</code>, so the index has to have a level of that name. Two of the four candidates renumber or stack in a direction that cannot produce one.",
          ar: "اقرأ السطرَ الثالث المطبوع أولًا: فهو يجمّع على مستوًى <em>اسمه</em> <code>batch</code>، فيجب أن يكون للفهرس مستوًى بذلك الاسم. واثنان من المرشّحين الأربعة يُعيدان الترقيم أو يرُصّان في اتجاه لا يستطيع إنتاجَ واحد."
        },
        explain: {
          en: "Duplicated index labels are not cosmetic: <code>stacked.loc[3]</code> returns two rows, a later assignment of a Series aligns to the wrong places &mdash; which is <a href=\"#t2l6-s7\">Concept&nbsp;2's</a> bug arriving by a second route &mdash; and <code>stacked.loc[3, \"city_Gaza\"] = 1</code> writes to a March row and a June row at once. Two arguments fix it and they are not interchangeable. The plain <code>concat</code> leaves 85 duplicated labels and an index whose <code>names</code> is <code>[None]</code>. <code>ignore_index=True</code> renumbers, so the labels are unique, and it is the right choice when the old labels meant nothing &mdash; but it builds no level, so <code>index.names</code> prints <code>[None]</code> and the <code>groupby</code> raises. <code>keys=</code> is strictly better here, because it records <em>which batch each row came from</em> rather than merely making the labels distinct. And <code>axis=1</code> is the real trap: it puts the two blocks side by side instead of stacking them &mdash; 503 rows by 65 columns &mdash; so <code>batch</code> becomes a level of the <em>columns</em>, <code>index.names</code> is <code>[None]</code> and the <code>groupby</code> raises a <code>KeyError</code>. Note that <code>axis=1</code> is exactly the right call for a different job: assembling a frame column by column, which is how <a href=\"#t2l5-s32\">Lesson&nbsp;5's <code>apply_encoder</code></a> builds its matrix out of a city block, an agency block and five numeric columns.",
          ar: "اللافتاتُ المكرَّرة في الفهرس ليست مسألةَ شكل: فـ<code>stacked.loc[3]</code> تُرجع صفَّين، وإسنادٌ لاحق لمتسلسلة يتوافق مع مواضع خاطئة &mdash; وهذا عطبُ <a href=\"#t2l6-s7\">المفهوم 2</a> يصل من طريق ثانٍ &mdash; و<code>stacked.loc[3, \"city_Gaza\"] = 1</code> تكتب في صف من آذار وصف من حزيران في وقت واحد. ووسيطان يُصلحان ذلك وهما غيرُ متكافئين. فـ<code>concat</code> العادية تترك 85 لافتةً مكرَّرة وفهرسًا <code>names</code> فيه <code>[None]</code>. و<code>ignore_index=True</code> تُعيد الترقيم فتصير اللافتاتُ فريدة، وهي الاختيارُ الصحيح حين لا تعني اللافتاتُ القديمة شيئًا &mdash; لكنها لا تبني مستوًى، فتطبع <code>index.names</code> ‏<code>[None]</code> وترفع <code>groupby</code> خطأً. و<code>keys=</code> أفضلُ قطعًا هنا، لأنها تسجّل <em>من أي دفعة جاء كل صف</em> لا مجردَ تمييز اللافتات. و<code>axis=1</code> هي الفخُّ الحقيقي: فهي تضع المقطعين جنبًا إلى جنب بدل رصّهما &mdash; ‏503 صفوف في 65 عمودًا &mdash; فيصير <code>batch</code> مستوًى في <em>الأعمدة</em>، ويكون <code>index.names</code> ‏<code>[None]</code> وترفع <code>groupby</code> ‏<code>KeyError</code>. ولاحظ أن <code>axis=1</code> هي النداءُ الصحيح بالضبط لمهمة أخرى: تركيبُ إطار عمودًا عمودًا، وهذا كيف تبني <a href=\"#t2l5-s32\"><code>apply_encoder</code> في الدرس 5</a> مصفوفتها من مقطع مدن ومقطع وكالات وخمسة أعمدة عددية."
        }
      },

      /* ---------------------------------------------------------- 18 */
      {
        id: "t2l6q18", type: "write", level: "hard",
        topics: ["t2-stacking-fix", "t2-concat-index"],
        q: {
          en: "Write the fix Concept&nbsp;4 arrives at: encode <code>city</code> for both months against one <em>fitted</em> level list, so that the two column sets are identical by construction and <code>concat</code> has nothing to reconcile. Define <code>fit_city_levels(d)</code>, which normalises the raw spelling (strip, lower, collapse runs of spaces) and maps it through <code>CITY_MAP</code>, then returns the <strong>sorted</strong> list of names it found. Define <code>encode_city(d, levels)</code>, a pure apply that returns the dummy block beside a log row recording <code>rows_in</code>, <code>rows_out</code>, the number of columns, and how many rows <em>no level covers</em>. Then fit on <code>march</code>, apply to both months, assert the two column sets agree, stack them with a <code>batch</code> level, and print the hot-flag total beside the row count. Do not reconcile the columns after the fact with <code>join=\"inner\"</code>, and do not fill anything with zero.",
          ar: "اكتب العلاجَ الذي يصل إليه المفهوم 4: رمِّز <code>city</code> للشهرين على قائمة مستويات <em>مضبوطة</em> واحدة، فتكون مجموعتا الأعمدة مطابقتين بحكم البناء ولا يكون لـ<code>concat</code> شيءٌ توفّق بينه. عرِّف <code>fit_city_levels(d)</code> التي تنظّم الصورةَ الإملائية الخام (قصٌّ وتصغيرٌ وضغطُ تتابعات المسافات) وتمرّرها على <code>CITY_MAP</code> ثم تُرجع القائمةَ <strong>المفروزة</strong> بالأسماء التي وجدتها. وعرِّف <code>encode_city(d, levels)</code>، وهي تطبيقٌ محض يُرجع مقطعَ المؤشِّرات بجانب سطر سجل يسجّل <code>rows_in</code> و<code>rows_out</code> وعددَ الأعمدة وكم صفًّا <em>لا يغطّيه أي مستوى</em>. ثم اضبط على <code>march</code> وطبّق على الشهرين وأكّد أن مجموعتَي الأعمدة متوافقتان وارُصّهما بمستوى <code>batch</code> واطبع مجموعَ الأعلام الساخنة بجانب عدد الصفوف. ولا توفّق بين الأعمدة بعد الواقعة بـ<code>join=\"inner\"</code>، ولا تعبّئ شيئًا بصفر."
        },
        starter: code(
          "import pandas as pd",
          "",
          "# march: 503 raw listings, 26 spellings of five cities",
          "# june:  85 listings nobody has read, two of them in Beit Lahia",
          "# CITY_MAP: Lesson 3's twenty-six spellings -> five names, plus Beit Lahia",
          "",
          "# your code here"
        ),
        lines: 22,
        checks: [
          {
            re: "def\\s+fit_city_levels\\s*\\(\\s*\\w+",
            label: {
              en: "A fit, <code>fit_city_levels</code>, taking the frame to learn the list from",
              ar: "ضبطٌ، <code>fit_city_levels</code>، يأخذ الإطارَ الذي يتعلّم القائمةَ منه"
            }
          },
          {
            re: "sorted\\s*\\(",
            label: {
              en: "The level list is <code>sorted</code>, so the column order is a decision and not an accident of the file",
              ar: "قائمةُ المستويات <code>sorted</code>، فيكون ترتيبُ الأعمدة قرارًا لا مصادفةَ ملف"
            }
          },
          {
            re: "def\\s+encode_city\\s*\\(\\s*\\w+\\s*,\\s*\\w+",
            label: {
              en: "An apply, <code>encode_city</code>, of two arguments: the frame and the fitted list",
              ar: "تطبيقٌ، <code>encode_city</code>، بوسيطين: الإطارُ والقائمةُ المضبوطة"
            }
          },
          {
            re: "categories\\s*=",
            label: {
              en: "The columns come from the fitted list (<code>pd.Categorical(..., categories=levels)</code>), never from this file's own values",
              ar: "الأعمدةُ تأتي من القائمة المضبوطة (<code>pd.Categorical(..., categories=levels)</code>) لا من قيم هذا الملف قط"
            }
          },
          {
            re: "sum\\s*\\(\\s*axis\\s*=\\s*1\\s*\\)",
            label: {
              en: "A row sum counts the rows no level covers, instead of letting them pass as ordinary zeros",
              ar: "مجموعُ الصف يعدّ الصفوفَ التي لا يغطّيها أي مستوى بدل أن يتركها تمرّ أصفارًا عادية"
            }
          },
          {
            re: "keys\\s*=\\s*\\[",
            label: {
              en: "The two batches are stacked with <code>keys=</code>, so each row records which month it came from",
              ar: "تُرَصّ الدفعتان بـ<code>keys=</code>، فيسجّل كلُّ صف من أي شهر جاء"
            }
          },
          {
            re: "assert",
            label: {
              en: "An assertion that the two column sets agree &mdash; the claim this whole design exists to make",
              ar: "تأكيدٌ بأن مجموعتَي الأعمدة متوافقتان &mdash; وهو الادّعاءُ الذي وُجد هذا التصميمُ كلُّه ليقوله"
            }
          }
        ],
        forbid: [
          {
            re: "join\\s*=\\s*[\"']inner[\"']",
            label: {
              en: "<code>join=\"inner\"</code> &mdash; it deletes the disagreement instead of preventing it, and leaves all-zero rows nobody can tell apart",
              ar: "‏<code>join=\"inner\"</code> &mdash; فهو يحذف الخلافَ بدل أن يمنعه ويترك صفوفًا كلها أصفار لا يستطيع أحد تمييزَها"
            }
          },
          {
            re: "fillna\\s*\\(\\s*0",
            label: {
              en: "<code>.fillna(0)</code> on a dummy column &mdash; a zero is the positive claim &ldquo;not this city&rdquo;, which you have no grounds for",
              ar: "‏<code>.fillna(0)</code> على عمود مؤشِّر &mdash; فالصفرُ ادّعاءٌ موجب يقول «ليست هذه المدينة» ولا سندَ لك فيه"
            }
          }
        ],
        solution: {
          code: code(
            "def fit_city_levels(d):",
            "    \"\"\"The fitted parameter: one sorted list of names, learned from March and nowhere else.\"\"\"",
            "    c = (d[\"city\"].astype(\"string\").str.strip().str.lower()",
            "                  .str.replace(r\"\\s+\", \" \", regex=True).map(CITY_MAP))",
            "    return sorted(c.dropna().unique())",
            "",
            "def encode_city(d, levels):",
            "    \"\"\"A pure apply: the columns come from the fitted list, never from this file.\"\"\"",
            "    c = (d[\"city\"].astype(\"string\").str.strip().str.lower()",
            "                  .str.replace(r\"\\s+\", \" \", regex=True).map(CITY_MAP))",
            "    X = pd.get_dummies(pd.Categorical(c, categories=levels),",
            "                       prefix=\"city\", dtype=\"int8\").set_index(d.index)",
            "    uncovered = int((X.sum(axis=1) == 0).sum())",
            "    return X, {\"rows_in\": len(d), \"rows_out\": len(X),",
            "               \"cols\": X.shape[1], \"uncovered\": uncovered}",
            "",
            "LEVELS = fit_city_levels(march)",
            "XA, la = encode_city(march, LEVELS)",
            "XB, lb = encode_city(june, LEVELS)",
            "assert list(XA.columns) == list(XB.columns), \"the two batches disagree on columns\"",
            "",
            "both = pd.concat([XA, XB], keys=[\"march\", \"june\"], names=[\"batch\"])",
            "print(\"fitted levels:\", LEVELS)",
            "print(pd.DataFrame([la, lb], index=[\"march\", \"june\"]).to_string())",
            "print(\"stacked:\", both.shape, \"| blank cells:\", int(both.isna().sum().sum()))",
            "print(\"hot flags %d of %d rows\" % (int(both.to_numpy().sum()), len(both)))"
          ),
          out: code(
            "fitted levels: ['Deir al-Balah', 'Gaza', 'Jabalia', 'Khan Younis', 'Rafah']",
            "       rows_in  rows_out  cols  uncovered",
            "march      503       503     5          0",
            "june        85        85     5          2",
            "stacked: (588, 5) | blank cells: 0",
            "hot flags 586 of 588 rows"
          ),
          en: "The fit is five names; the apply reads them and infers nothing, which is what makes <code>list(XA.columns) == list(XB.columns)</code> true by construction rather than by luck. Then read the last line, because it is what makes this version <em>honest</em> rather than merely tidy: the column sums come to 586 and not 588, so <strong><code>M.to_numpy().sum() == len(M)</code> is a one-line assertion that finds the two unseen rows</strong> &mdash; the Beit Lahia listings the <a href=\"#t2l6-s14\">outer join</a> found empty in March. <code>sorted</code> matters more than it looks: without it the column order would depend on the order the names happen to appear in March's file, and a column order that moves between runs is a matrix a model cannot be given twice.",
          ar: "الضبطُ خمسةُ أسماء؛ والتطبيقُ يقرأها ولا يستنبط شيئًا، وهذا ما يجعل <code>list(XA.columns) == list(XB.columns)</code> صحيحةً بحكم البناء لا بالحظ. ثم اقرأ السطرَ الأخير، فهو ما يجعل هذه النسخة <em>أمينة</em> لا مجردَ مرتَّبة: فمجاميعُ الأعمدة تبلغ 586 لا 588، فـ<strong><code>M.to_numpy().sum() == len(M)</code> تأكيدٌ بسطر واحد يجد الصفّين غير المرئيين</strong> &mdash; إعلانَي بيت لاهيا الذين وجدهما <a href=\"#t2l6-s14\">الدمجُ الخارجي</a> خاليين في آذار. و<code>sorted</code> أهمُّ مما تبدو: فبدونها كان ترتيبُ الأعمدة سيتبع الترتيبَ الذي تصادف أن تظهر به الأسماءُ في ملف آذار، وترتيبُ الأعمدة الذي يتحرّك بين التشغيلات مصفوفةٌ لا يمكن أن يُعطاها نموذجٌ مرتين."
        },
        hint: {
          en: "The apply must be able to run next month on a file whose cities you have not seen, so it may read nothing except <code>d[\"city\"]</code> and the <code>levels</code> it was handed. The count you are asked for is not a count of blanks: after a <code>Categorical</code> with fixed categories there are no blanks, only rows whose whole dummy block is zero.",
          ar: "على التطبيق أن يستطيع العملَ الشهرَ القادم على ملفٍ لم ترَ مدنَه، فلا يحقّ له أن يقرأ شيئًا غير <code>d[\"city\"]</code> و<code>levels</code> التي سُلِّمت إليه. والعدُّ المطلوب ليس عدَّ فراغات: فبعد <code>Categorical</code> بفئات ثابتة لا توجد فراغات، بل صفوفٌ مقطعُ مؤشِّراتها كلُّه صفر."
        },
        explain: {
          en: "Every repair in Concept&nbsp;4 before this one was an attempt to reconcile two column sets <em>after</em> they diverged, and the mistake was earlier: the two files were encoded independently, so each invented its own columns. <strong>If both batches are encoded against the same fitted category list, their column sets are identical by construction and <code>concat</code> has nothing to reconcile.</strong> That is the whole fix, and it is worth noticing what it buys over <code>join=\"inner\"</code>, which also produced a frame with no blanks: the difference is not the number of columns, it is that here two rows no level covers are <em>findable</em> and there they were indistinguishable from 187 correctly-spelled ones. The <code>uncovered</code> count in the log row is the production habit underneath all of this: <code>handle_unknown=\"ignore\"</code> in a library encoder zeroes an unseen value silently and does not count it, which is the one thing a hand-written version can do better, and the reason June's report carries the line <code>unseen {'city': {'Beit Lahia': 2}}</code> rather than nothing at all.",
          ar: "كلُّ إصلاح في المفهوم 4 قبل هذا كان محاولةً للتوفيق بين مجموعتَي أعمدة <em>بعد</em> أن تفارقتا، والخطأُ كان أسبق: فقد رُمِّز الملفان على انفراد فاختلق كلٌّ أعمدته. <strong>فإن رُمِّزت الدفعتان على قائمة الفئات المضبوطة نفسها كانت مجموعتا أعمدتهما مطابقتين بحكم البناء، ولم يكن لـ<code>concat</code> شيءٌ توفّق بينه.</strong> وهذا هو العلاجُ كلُّه، ويستحقّ أن تلاحظ ما يكسبه على <code>join=\"inner\"</code> التي أنتجت أيضًا إطارًا بلا فراغات: فالفرقُ ليس عددَ الأعمدة بل أن صفَّين لا يغطّيهما أي مستوى <em>يمكن العثورُ عليهما</em> هنا، وهناك كانا لا يُميَّزان عن 187 صفًّا صحيحةِ الإملاء. وعدُّ <code>uncovered</code> في سطر السجل هو العادةُ الإنتاجية تحت ذلك كلِّه: فـ<code>handle_unknown=\"ignore\"</code> في مُرمِّز مكتبة يُصفِّر القيمةَ غير المرئية بصمت ولا يعدّها، وهذا الشيءُ الوحيد الذي تفعله نسخةٌ مكتوبة باليد أحسن، وسببُ حملِ تقرير حزيران سطرَ <code>unseen {'city': {'Beit Lahia': 2}}</code> لا لا شيء."
        }
      },

      /* ---------------------------------------------------------- 19 */
      {
        id: "t2l6q19", type: "ordercode", level: "medium",
        topics: ["t2-decisions-gathered", "t2-transform-listings"],
        q: {
          en: "The step functions and the three <code>fit_*</code> functions are already defined in <code>pipe.py</code>; what is left is the assembly. Put the statements in the one order that runs and produces the chapter's two deliverables &mdash; a 480&nbsp;&times;&nbsp;18 matrix with a seventeen-row report, and an 85&nbsp;&times;&nbsp;18 matrix with the same eighteen column names in the same order.",
          ar: "دوالُ الخطوات ودوالُ <code>fit_*</code> الثلاث معرَّفةٌ أصلًا في <code>pipe.py</code>؛ والباقي هو التجميع. رتّب الأسطر بالترتيب الوحيد الذي يعمل ويُنتج مُخرَجَي الفصل &mdash; مصفوفةً 480 × 18 بتقرير من سبعةَ عشر سطرًا، ومصفوفةً 85 × 18 بأسماء الأعمدة الثمانية عشر نفسها بالترتيب نفسه."
        },
        items: [
          { code: "import pandas as pd" },
          { code: "REF = pd.read_csv(\"city_reference.csv\")[[\"city\", \"population\", \"coastal\", \"km_to_gaza_city\"]]" },
          { code: "STEPS  = [s2_dates, s1_one_row_per_flat, s2_city, s2_furnished,\n          s2_floor, s2_condition, s2_advert, s2_units_and_limits]   # stages 1 and 2: nothing is fitted" },
          { code: "STEPS += [s2_enrich]                     # still stage 2: a join adds columns and must not add rows" },
          { code: "STEPS += [s3_target, s3_area, s3_rooms, s3_floor, s3_condition, s3_deposit]   # stage 3" },
          { code: "STEPS += [s4_review_rent]                # stage 4: flags with counts, never a deletion" },
          { code: "X,  report,   fitted = transform_listings(march)           # FIT on March: 480 x 18" },
          { code: "Xj, report_j, _      = transform_listings(june, fitted)    # APPLY to June: nothing refitted" }
        ],
        answer: [0, 1, 2, 3, 4, 5, 6, 7],
        hint: {
          en: "Every statement needs a name the statements above it created, and the list is extended with <code>+=</code>, so the order of the four additions <em>is</em> the canonical order. The last two carry the lesson rather than the syntax: read the second argument of each.",
          ar: "كلُّ سطر يحتاج اسمًا أنشأته الأسطرُ فوقه، والقائمةُ تُمدّ بـ<code>+=</code>، فيكون ترتيبُ الإضافات الأربع <em>هو</em> الترتيبَ القانوني. والسطران الأخيران يحملان الدرس لا القواعدَ النحوية: فاقرأ الوسيطَ الثاني في كلٍّ منهما."
        },
        explain: {
          en: "Two chains fix the order and each teaches something. The chain of <em>names</em> is the easy half: <code>pd</code> before the <code>read_csv</code>, <code>STEPS = [...]</code> before any <code>STEPS += [...]</code> (a <code>+=</code> above the assignment is a <code>NameError</code>), and the whole list before either call. The chain of <em>decisions</em> is the lesson: because the list is extended rather than rebuilt, its order is <a href=\"#t2l1-s8\">the canonical order</a> &mdash; stages 1 and 2 first, because they learn nothing and so can run before a split; the reference join next, still stage 2, because a join adds columns and must not add rows; then the imputations of stage 3, which must come after the join so that the join cannot be handed imputed values; then stage 4, which flags and never deletes, so no step after stage 1 changes the row count. Note the one apparent violation, which <a href=\"#t2l3-s32\">Lesson&nbsp;3 already defended</a>: <code>s2_dates</code> sits before <code>s1_one_row_per_flat</code>, because the canonical order orders <em>decisions</em>, and parsing a date learns nothing from any other row, so it is free to run wherever a later step &mdash; here the dedupe, which needs a sortable date to choose which repost survives &mdash; needs it. And the last two lines are the whole point of the module: the same function, called twice, and the second argument is the entire difference between a pipeline and a script.",
          ar: "سلسلتان تثبّتان الترتيبَ وكلٌّ منهما تعلّم شيئًا. فسلسلةُ <em>الأسماء</em> هي النصفُ السهل: ‏<code>pd</code> قبل <code>read_csv</code>، و<code>STEPS = [...]</code> قبل أي <code>STEPS += [...]</code> (فـ<code>+=</code> فوق الإسناد <code>NameError</code>)، والقائمةُ كلُّها قبل أي نداء. وسلسلةُ <em>القرارات</em> هي الدرس: فلأن القائمةَ تُمدّ لا تُبنى من جديد يكون ترتيبُها <a href=\"#t2l1-s8\">الترتيبَ القانوني</a> &mdash; المرحلتان 1 و2 أولًا لأنهما لا تتعلّمان شيئًا فيمكن تشغيلهما قبل التقسيم؛ ثم دمجُ المرجع، وهو ما زال المرحلةَ 2، لأن الدمجَ يضيف أعمدةً ولا يجوز أن يضيف صفوفًا؛ ثم تعويضاتُ المرحلة 3، ويجب أن تأتي بعد الدمج لئلّا يُسلَّم الدمجُ قيمًا معوَّضة؛ ثم المرحلةُ 4 التي تُعلّم ولا تحذف قط، فلا تغيّر خطوةٌ بعد المرحلة 1 عددَ الصفوف. ولاحظ المخالفةَ الظاهرة الواحدة التي <a href=\"#t2l3-s32\">دافع عنها الدرس 3 سابقًا</a>: فـ<code>s2_dates</code> يجلس قبل <code>s1_one_row_per_flat</code>، لأن الترتيبَ القانوني يرتّب <em>القرارات</em>، وتحليلُ التاريخ لا يتعلّم شيئًا من أي صف آخر، فهو حرٌّ أن يعمل حيث تحتاجه خطوةٌ لاحقة &mdash; وهي هنا إزالةُ التكرار التي تحتاج تاريخًا قابلًا للترتيب لتختار أي إعلان معاد نشره يبقى. والسطران الأخيران هما مغزى الوحدة كلُّه: الدالةُ نفسها منادةً مرتين، والوسيطُ الثاني هو كلُّ الفرق بين خط تحويل وسكربت."
        }
      },

      /* ---------------------------------------------------------- 20 */
      {
        id: "t2l6q20", type: "mcq", level: "easy",
        topics: ["t2-march-report", "t2-june-applied"],
        q: {
          en: "March's report has the stage-3 row <code>MNAR, 21 rows have no rent: never filled</code>, and <code>listings_raw.csv</code> has <strong>19</strong> blank rents. June's report has <code>MNAR, 2 rows have no rent</code>, and <code>listings_new.csv</code> has <strong>2</strong> blank rents, with <code>0 dunum areas x 1000, 0 cells voided</code> at stage 2. Where do March's other two come from?",
          ar: "في تقرير آذار سطرُ المرحلة 3: ‏<code>MNAR, 21 rows have no rent: never filled</code>، وفي <code>listings_raw.csv</code> ‏<strong>19</strong> إيجارًا فارغًا. وفي تقرير حزيران <code>MNAR, 2 rows have no rent</code>، وفي <code>listings_new.csv</code> ‏<strong>2</strong>، ومعه <code>0 dunum areas x 1000, 0 cells voided</code> في المرحلة 2. فمن أين يأتي الاثنان الآخران في آذار؟"
        },
        options: [
          {
            en: "<code>LIMITS</code>, in stage 2, voided two rents before stage 3 ever read the column &mdash; the 99999 that is a phone number and the daily rate of 25, both outside <code>(50, 2000)</code>. A log that read <code>19</code> here would prove the canonical order had been broken.",
            ar: "أفرغت <code>LIMITS</code> في المرحلة 2 إيجارين قبل أن تقرأ المرحلةُ 3 العمودَ أصلًا &mdash; أي 99999 الذي هو رقمُ هاتف وأجرةَ اليوم 25، وكلاهما خارج <code>(50, 2000)</code>. والسجلُّ الذي يقرأ <code>19</code> هنا كان سيُثبت أن الترتيبَ القانوني قد انكسر."
          },
          {
            en: "<code>s1_one_row_per_flat</code> removed 23 rows &mdash; 14 exact repeats and 9 reposts &mdash; and two of the rows it kept had a rent that the flag then counted twice.",
            ar: "حذفت <code>s1_one_row_per_flat</code> ‏23 صفًّا &mdash; ‏14 تكرارًا تامًّا و9 إعلانات معاد نشرها &mdash; وصفّان من الصفوف التي أبقتها كان لهما إيجارٌ عدّه العلمُ مرتين."
          },
          {
            en: "The reference join left two rows unmatched, so their rent came back blank along with the reference columns.",
            ar: "ترك دمجُ المرجع صفَّين غير مطابقين، فعاد إيجارُهما فارغًا مع أعمدة المرجع."
          },
          {
            en: "Two rents fell outside the fitted fence of <code>(5.0, 405.0)</code>, so stage 4 voided them before the count was taken.",
            ar: "وقع إيجاران خارج السياج المضبوط <code>(5.0, 405.0)</code>، فأفرغتهما المرحلةُ 4 قبل أن يُؤخذ العدّ."
          }
        ],
        answer: 0,
        hint: {
          en: "Both files go through the same seventeen steps in the same order. Find the step that is allowed to <em>empty</em> a cell, and then check whether it runs before or after the step that counts the empty ones.",
          ar: "يمرّ الملفان بالخطوات السبعَ عشرة نفسها بالترتيب نفسه. فاعثر على الخطوة التي يحقّ لها أن <em>تُفرِغ</em> خلية، ثم افحص هل تعمل قبل الخطوة التي تعدّ الفارغةَ أم بعدها."
        },
        explain: {
          en: "This is <a href=\"#t2l1-s8\">the canonical order</a> appearing as arithmetic: 19 blanks in the file, plus two cells <code>LIMITS</code> voided in stage 2, is 21 by the time stage 3 counts them. The order is what makes the number right, and the number is what proves the order &mdash; which is the real answer to &ldquo;why keep a log at all?&rdquo;. Each wrong option is wrong for a reason you can check in the report. Stage 1 <em>removes</em> rows and takes their blanks with them, which is why 26 areas are blank and not 27 and why 117 deposits are blank and not 123; it cannot create a blank rent. The reference join reports <code>m:1 on the clean city, 0 rows unmatched</code>, and even unmatched it would blank only the reference columns, never <code>monthly_rent</code>. And stage 4 is <code>fence 11, robust z 6, odd ratio 0 - flags only</code>: it counts and flags and never voids, which is <a href=\"#t2l4-s23\">Lesson&nbsp;4's</a> discipline, and it runs after stage 3 anyway. Read the two reports side by side and most of June's steps did nothing &mdash; no duplicates, no slash dates, no <code>G</code> floors, no dunum areas, nothing outside <code>LIMITS</code> &mdash; and <strong>a step that does nothing on clean data is a step that is safe to leave in for ever</strong>. Its three alarms are all correctly ringing: <code>unmatched very good=1</code>, <code>unseen {'city': {'Beit Lahia': 2}}</code>, and one <code>area_minmax</code> of 1.004813.",
          ar: "هذا <a href=\"#t2l1-s8\">الترتيبُ القانوني</a> يظهر حسابًا: ‏19 فراغًا في الملف زائد خليتين أفرغتهما <code>LIMITS</code> في المرحلة 2 يكون 21 لحظةَ تعدّها المرحلةُ 3. فالترتيبُ هو ما يجعل العددَ صحيحًا، والعددُ هو ما يُثبت الترتيب &mdash; وهذا هو الجوابُ الحقيقي عن «لماذا نحفظ سجلًّا أصلًا؟». وكلُّ خيار خاطئ خاطئٌ لسبب تستطيع فحصَه في التقرير. فالمرحلةُ 1 <em>تحذف</em> صفوفًا وتأخذ فراغاتها معها، ولهذا تكون 26 مساحةً فارغة لا 27 و117 تأمينًا فارغًا لا 123؛ ولا تستطيع أن تُنشئ إيجارًا فارغًا. ودمجُ المرجع يُبلّغ <code>m:1 on the clean city, 0 rows unmatched</code>، وحتى غيرَ مطابق كان سيُفرِغ أعمدةَ المرجع وحدها لا <code>monthly_rent</code> قط. والمرحلةُ 4 هي <code>fence 11, robust z 6, odd ratio 0 - flags only</code>: تعدّ وتُعلّم ولا تُفرِغ قط، وذاك انضباطُ <a href=\"#t2l4-s23\">الدرس 4</a>، وهي تعمل بعد المرحلة 3 أصلًا. واقرأ التقريرين جنبًا إلى جنب فتجد معظمَ خطوات حزيران لم تفعل شيئًا &mdash; لا تكرارات ولا تواريخ بشرطة مائلة ولا طوابق <code>G</code> ولا مساحات بالدونم ولا شيء خارج <code>LIMITS</code> &mdash; و<strong>الخطوةُ التي لا تفعل شيئًا على بيانات نظيفة خطوةٌ يُؤمَن تركُها إلى الأبد</strong>. وإنذاراتها الثلاثة كلُّها ترنّ بحق: ‏<code>unmatched very good=1</code> و<code>unseen {'city': {'Beit Lahia': 2}}</code> و<code>area_minmax</code> واحدة تساوي 1.004813."
        }
      },

      /* ---------------------------------------------------------- 21 */
      {
        id: "t2l6q21", type: "contrast", level: "hard",
        topics: ["t2-sklearn-preview", "t2-decisions-gathered"],
        q: {
          en: "The chapter's pipeline is hand-written pandas, deliberately. In production nobody writes it by hand. Place each property under the hand-written module, under the <code>scikit-learn</code> objects that would replace it, or under both.",
          ar: "خطُّ الفصل pandas مكتوبة باليد، عن قصد. وفي الإنتاج لا يكتبه أحدٌ باليد. ضع كلَّ خاصية تحت الوحدة المكتوبة باليد أو تحت كائنات <code>scikit-learn</code> التي ستستبدلها أو تحت كليهما."
        },
        concepts: [
          {
            en: "<code>pipe.py</code> &mdash; the chapter's module: the constants, four lists of step functions, and <code>transform_listings(df, fitted=None)</code> with its <code>fitted</code> dictionary",
            ar: "‏<code>pipe.py</code> &mdash; وحدةُ الفصل: الثوابتُ وأربعُ قوائم من دوال الخطوات و<code>transform_listings(df, fitted=None)</code> مع قاموس <code>fitted</code>"
          },
          {
            en: "<code>scikit-learn</code> &mdash; <code>Pipeline</code>, <code>ColumnTransformer</code>, <code>SimpleImputer</code>, <code>OneHotEncoder</code>, <code>OrdinalEncoder</code>, the scalers and <code>KFold</code>",
            ar: "‏<code>scikit-learn</code> &mdash; ‏<code>Pipeline</code> و<code>ColumnTransformer</code> و<code>SimpleImputer</code> و<code>OneHotEncoder</code> و<code>OrdinalEncoder</code> والمُقايِسات و<code>KFold</code>"
          }
        ],
        rows: [
          {
            s: {
              en: "Routes named columns to named transformers and concatenates the result in a fixed column order",
              ar: "يوجّه أعمدةً مسمّاة إلى محوّلات مسمّاة ويرُصّ الناتجَ بترتيب أعمدة ثابت"
            },
            a: 2
          },
          {
            s: {
              en: "Returns a log row per step, so each run documents what it did to <em>this</em> batch and the description cannot go stale",
              ar: "يُرجع سطرَ سجل لكل خطوة، فيوثّق كلُّ تشغيل ما فعله بـ<em>هذه</em> الدفعة ولا يستطيع الوصفُ أن يتعفّن"
            },
            a: 0
          },
          {
            s: {
              en: "The apply path physically cannot refit, because <code>transform</code> has no access to the fitting code at all",
              ar: "مسارُ التطبيق لا يستطيع ماديًّا إعادةَ الضبط، لأن <code>transform</code> لا تملك الوصولَ إلى كود الضبط على الإطلاق"
            },
            a: 1
          },
          {
            s: {
              en: "Keeps every fitted parameter in one readable object you can print in sorted order, diff against last month's and date",
              ar: "يُبقي كلَّ وسيط مضبوط في كائن واحد مقروء تستطيع طبعَه مرتَّبًا ومقارنتَه بوسائط الشهر الماضي وتأريخَه"
            },
            a: 0
          },
          {
            s: {
              en: "Can remove the 14 exact repeats and the 9 reposts, so that one row means one flat",
              ar: "يستطيع حذفَ الـ14 تكرارًا تامًّا والـ9 إعلانات المعاد نشرها، فيصير الصفُّ الواحد يعني شقةً واحدة"
            },
            a: 0
          },
          {
            s: {
              en: "Can be cross-validated as a single object over k folds, so a step's value comes with a spread and not just a number",
              ar: "يمكن التحقّقُ المتقاطع له ككائن واحد على k طيّات، فتأتي قيمةُ الخطوة بانتشارٍ لا برقم واحد فحسب"
            },
            a: 1
          },
          {
            s: {
              en: "Takes the declared order of <code>condition</code> as an explicit argument, so the alphabetical-codes trap cannot happen",
              ar: "يأخذ الترتيبَ المعلَن لـ<code>condition</code> وسيطًا صريحًا، فلا يستطيع فخُّ الرموز الأبجدية أن يحدث"
            },
            a: 2
          }
        ],
        hint: {
          en: "Read the last row of the preview table twice: it says which half of a pipeline the library takes over and which half it does not touch at all. Two of the seven properties are true of both, and each of the ones that is true of only one is a <em>loss</em> somebody accepted on purpose.",
          ar: "اقرأ السطرَ الأخير من جدول الاستباق مرتين: فهو يقول أيَّ نصفٍ من الخط تتولّاه المكتبةُ وأيَّ نصف لا تمسّه على الإطلاق. واثنتان من الخصائص السبع صحيحتان في كليهما، وكلُّ واحدة صحيحة في واحد فقط هي <em>فقدٌ</em> قبله أحدٌ عن قصد."
        },
        explain: {
          en: "<code>scikit-learn</code> replaces stages 3, 4 and 5 almost completely and <strong>stages 1 and 2 not at all</strong> &mdash; and stages 1 and 2 are where four of this chapter's six lessons live. What the library gains you is structural: <code>transform</code> physically cannot refit, so the fit/apply split becomes impossible to get wrong rather than merely remembered, and the whole chain can be cross-validated as one object, which is the fix for the single-split defect of <a href=\"#t2l6-s29\">Concept&nbsp;6</a>. What you lose is the per-step log row and the single readable dictionary: the parameters become fitted attributes scattered across estimators (<code>categories_</code>, <code>data_min_</code>, <code>statistics_</code>), which nothing prints in one sorted block and nothing dates. Two properties are true of both: <code>ColumnTransformer</code> is the object that replaces <code>s5_encode</code> almost exactly, and <code>OrdinalEncoder(categories=[COND_ORDER])</code> takes the declared order as an argument exactly as <code>pd.Categorical(..., ordered=True)</code> does. The dedupe is ours alone for a structural reason worth remembering: <strong>an estimator may not change the row count</strong>, so <code>s1_one_row_per_flat</code> cannot live in a <code>Pipeline</code> at all. And there is no estimator for &ldquo;twenty-six spellings are five cities&rdquo; and there cannot be, because that is a decision rather than a parameter. The library takes over the mechanical half, which is the half that is easy to get right once you understand it, and leaves you the half that consists of decisions about a particular rental market in a particular city.",
          ar: "تستبدل <code>scikit-learn</code> المراحلَ 3 و4 و5 استبدالًا شبه كامل و<strong>المرحلتين 1 و2 لا على الإطلاق</strong> &mdash; والمرحلتان 1 و2 هما حيث تسكن أربعةٌ من دروس هذا الفصل الستة. وما تكسبه المكتبةُ بنيويٌّ: فـ<code>transform</code> لا تستطيع ماديًّا إعادةَ الضبط، فيصير فصلُ الضبط عن التطبيق مستحيلَ الخطأ لا مُتذكَّرًا فحسب، ويمكن التحقّقُ المتقاطع للسلسلة كلها ككائن واحد، وذاك علاجُ عيب التقسيم الواحد في <a href=\"#t2l6-s29\">المفهوم 6</a>. وما تفقده سطرُ السجل لكل خطوة والقاموسُ الواحد المقروء: فتصير الوسائطُ سماتِ ضبط مبثوثةً في المقدِّرات (<code>categories_</code> و<code>data_min_</code> و<code>statistics_</code>)، ولا شيء يطبعها في مقطع واحد مرتَّب ولا شيء يؤرّخها. وخاصيتان صحيحتان في كليهما: فـ<code>ColumnTransformer</code> هو الكائنُ الذي يستبدل <code>s5_encode</code> استبدالًا شبه تامّ، و<code>OrdinalEncoder(categories=[COND_ORDER])</code> يأخذ الترتيبَ المعلَن وسيطًا كما تفعل <code>pd.Categorical(..., ordered=True)</code> بالضبط. وإزالةُ التكرار لنا وحدنا لسبب بنيوي يستحقّ التذكّر: <strong>لا يحقّ لمقدِّر أن يغيّر عددَ الصفوف</strong>، فلا تستطيع <code>s1_one_row_per_flat</code> أن تسكن <code>Pipeline</code> أصلًا. ولا مقدِّرَ لـ«ستٌّ وعشرون صورة إملائية هي خمسُ مدن» ولا يمكن أن يوجد، فذاك قرارٌ لا وسيط. فالمكتبةُ تتولّى النصفَ الآلي، وهو النصفُ الذي يسهل إصابتُه متى فهمتَه، وتترك لك النصفَ المؤلَّف من قرارات عن سوق تأجير بعينها في مدينة بعينها."
        }
      },

      /* ---------------------------------------------------------- 22 */
      {
        id: "t2l6q22", type: "compare", level: "hard",
        topics: ["t2-transform-listings", "t2-pipeline-assertions"],
        q: {
          en: "Two versions of <code>transform_listings</code>. Everything above the shown lines is identical in both: <code>make_comparable</code>, the reference join, the three <code>fit_*</code> calls and stages 3, 4 and 5, producing <code>X</code>, <code>log</code>, <code>fitted</code> and <code>n_rows</code> &mdash; the row count stage&nbsp;1 settled. Which statement is correct?",
          ar: "نسختان من <code>transform_listings</code>. وكلُّ ما فوق الأسطر المعروضة مطابقٌ في كلتيهما: ‏<code>make_comparable</code> ودمجُ المرجع ونداءاتُ <code>fit_*</code> الثلاثة والمراحلُ 3 و4 و5، منتجةً <code>X</code> و<code>log</code> و<code>fitted</code> و<code>n_rows</code> &mdash; وهو عددُ الصفوف الذي حسمته المرحلةُ 1. فأيُّ العبارات صحيحة؟"
        },
        codeA: code(
          "    # ... the first fourteen lines, identical in both versions ...",
          "",
          "    fitted.setdefault(\"columns\", list(X.columns))",
          "",
          "    return X, pd.DataFrame(log), fitted"
        ),
        codeB: code(
          "    # ... the first fourteen lines, identical in both versions ...",
          "",
          "    fitted.setdefault(\"columns\", list(X.columns))",
          "",
          "    # --- three claims this function will not return without ---",
          "    assert len(X) == n_rows, \"row count changed after stage 1: %d -> %d\" % (n_rows, len(X))",
          "    blank = X.columns[X.isna().any()].tolist()",
          "    assert not blank, \"blank cells in the feature matrix: %s\" % blank",
          "    assert list(X.columns) == fitted[\"columns\"], \"column set differs from the fitted one\"",
          "",
          "    return X, pd.DataFrame(log), fitted"
        ),
        options: [
          {
            en: "B, and the gap is measurable. With a duplicated Gaza row in <code>city_reference.csv</code> and <code>validate=</code> removed from the enrich step, A returns a 113-row matrix for June &mdash; 85 listings of which 28 are duplicated &mdash; and quietly trains or scores a model on it, while B raises <code>AssertionError: the reference join changed the row count: 85 -&gt; 113</code>. Each of B's three lines is a sentence the function now refuses to break.",
            ar: "‏B، والفجوةُ قابلة للقياس. فبصفِّ غزة مكرَّرًا في <code>city_reference.csv</code> و<code>validate=</code> محذوفةً من خطوة الإغناء تُرجع A مصفوفةً من 113 صفًّا لحزيران &mdash; ‏85 إعلانًا منها 28 مكرَّرًا &mdash; وتدرّب نموذجًا عليها أو تقيّمه به بهدوء، بينما ترفع B ‏<code>AssertionError: the reference join changed the row count: 85 -&gt; 113</code>. وكلُّ سطر من أسطر B الثلاثة جملةٌ ترفض الدالةُ الآن أن تخالفها."
          },
          {
            en: "They are equivalent in practice. A's report already prints <code>rows_in</code> and <code>rows_out</code> for all seventeen steps, so everything the three assertions check is in the output already; adding them only moves the same information somewhere else.",
            ar: "هما متكافئتان عمليًّا. فتقريرُ A يطبع أصلًا <code>rows_in</code> و<code>rows_out</code> للخطوات السبعَ عشرة كلها، فكلُّ ما تفحصه التأكيداتُ الثلاثة موجودٌ في المخرج أصلًا؛ وإضافتُها تنقل المعلومةَ نفسها إلى موضع آخر فحسب."
          },
          {
            en: "A, because B's assertions reject a batch that carries a condition level the fitted order does not contain, and June has one (<code>unmatched very good=1</code>), so B cannot process June at all.",
            ar: "‏A، لأن تأكيداتَ B ترفض دفعةً تحمل مستوى حالة لا يحتويه الترتيبُ المضبوط، ولحزيران واحدٌ (<code>unmatched very good=1</code>)، فلا تستطيع B معالجةَ حزيران أصلًا."
          },
          {
            en: "B, and it is now safe: a frame that passes all three assertions has been transformed correctly, which is what makes <code>fitted</code> trustworthy enough to pass to next month without writing it down anywhere.",
            ar: "‏B، وقد صارت آمنة: فالإطارُ الذي ينجح في التأكيدات الثلاثة كلها قد حُوِّل تحويلًا صحيحًا، وهذا ما يجعل <code>fitted</code> جديرًا بالثقة بما يكفي لتسليمه للشهر القادم دون كتابته في أي مكان."
          }
        ],
        answer: 0,
        hint: {
          en: "Three of the four statements are about what the assertions catch; one is about what they <em>cannot</em>. Think of a one-word edit to <code>pipe.py</code> that leaves the row count, the blank count and the column names all exactly as they were.",
          ar: "ثلاثٌ من العبارات الأربع عمّا تُسقطه التأكيدات؛ وواحدةٌ عمّا <em>لا تستطيع</em> إسقاطه. وتصوّر تعديلًا بكلمة واحدة في <code>pipe.py</code> يترك عددَ الصفوف وعددَ الفراغات وأسماءَ الأعمدة كما كانت بالضبط."
          },
        solution: {
          code: code(
            "    # --- three claims this function will not return without ---",
            "    assert len(X) == n_rows, \"row count changed after stage 1: %d -> %d\" % (n_rows, len(X))",
            "    blank = X.columns[X.isna().any()].tolist()",
            "    assert not blank, \"blank cells in the feature matrix: %s\" % blank",
            "    assert list(X.columns) == fitted[\"columns\"], \"column set differs from the fitted one\""
          ),
          out: code(
            "1. a duplicated reference row -> MergeError: Merge keys are not unique in right dataset",
            "2. the same thing without validate= -> AssertionError: the reference join changed the row count: 85 -> 113",
            "3. a stale fitted of 17 columns -> AssertionError: column set differs from the fitted one",
            "4. s3_area without its fallback -> AssertionError: blank cells in the feature matrix: ['area_minmax']"
          ),
          en: "Three lines, and each one names the step and the number when it fires. <strong>The row count has not moved since stage&nbsp;1</strong> catches a fan-out, a stray <code>dropna</code> and a merge somebody changed to <code>how=\"inner\"</code>. <strong>No column of the matrix contains a blank</strong> catches a fill whose fallback was removed and a new column added without one &mdash; a seven-room flat with no area recorded is enough, because <code>LIMITS</code> allows up to eight rooms and the training rows only reached five. <strong>The column set is exactly the fitted one, in order</strong> catches a stale artefact, a renamed column and the two-column-sets problem of Concept&nbsp;4. They cost microseconds and run on every batch for ever.",
          ar: "ثلاثةُ أسطر، وكلٌّ منها يسمّي الخطوةَ والرقم حين يُفعَّل. فـ<strong>عددُ الصفوف لم يتحرّك منذ المرحلة 1</strong> يُسقط التضاعفَ و<code>dropna</code> شاردةً ودمجًا غيّره أحدهم إلى <code>how=\"inner\"</code>. و<strong>لا عمودَ في المصفوفة يحمل فراغًا</strong> يُسقط تعويضًا أُزيل احتياطيُّه وعمودًا جديدًا أُضيف بلا احتياطي &mdash; وشقةٌ بسبع غرف بلا مساحة مسجَّلة تكفي، فـ<code>LIMITS</code> تسمح بثماني غرف وصفوفُ التدريب لم تبلغ غير خمس. و<strong>مجموعةُ الأعمدة هي المضبوطةُ بالضبط وبالترتيب</strong> يُسقط أثرًا بائتًا وعمودًا أُعيد تسميته ومشكلةَ مجموعتَي الأعمدة في المفهوم 4. وثمنُها أجزاءٌ من المليون من الثانية، وتعمل على كل دفعة إلى الأبد."
        },
        explain: {
          en: "An assertion you have never seen fail is a claim you have never tested, and all three of B's fire on real causes: a duplicated reference row, a stale <code>fitted</code> of seventeen columns, and a fill whose fallback was deleted. Without them, the duplicated-reference case silently scores a model on 113 rows of which 28 are copies, the stale-artefact case feeds a seventeen-column model an eighteen-column matrix with the columns shifted by one from <code>km_to_gaza</code> onwards, and the missing-fallback case puts a <code>NaN</code> into a matrix that a model will either reject with an obscure message or &mdash; worse, with some libraries &mdash; quietly treat as zero. The &ldquo;equivalent in practice&rdquo; answer is the thoughtful wrong one, and it is wrong for the reason that justifies the whole technique: <strong>a number in a table nobody compares is not a check, and the difference between an assertion and a comment is that a comment cannot stop a bad frame reaching a model.</strong> The stale-artefact case would not appear in the report at all, because the matrix is a perfectly good 85&nbsp;&times;&nbsp;18. The answer that says B cannot process June is a factual error worth being sure about: nothing in this pipeline drops a row for an unrecognised value &mdash; <code>very good</code> becomes a blank that stage 3 fills with the mode, and the step reports it. And the last answer is the trap <a href=\"#t2l6-s27\">Concept&nbsp;6</a> exists to close: add <code>\"very good\"</code> to <code>COND_ORDER</code> and 75 of the 480 flats are renumbered from 3 to 4, the matrix stays 480&nbsp;&times;&nbsp;18 with no blanks and the same column names, and <em>all three assertions pass</em>. An assertion proves the claim it makes and nothing else.",
          ar: "التأكيدُ الذي لم ترَه يفشل قط ادّعاءٌ لم تختبره قط، وتأكيداتُ B الثلاثة كلُّها تُفعَّل بأسباب حقيقية: صفُّ مرجع مكرَّر، و<code>fitted</code> بائتٌ من سبعة عشر عمودًا، وتعويضٌ حُذِف احتياطيُّه. وبدونها تقيّم حالةُ المرجع المكرَّر نموذجًا بصمت على 113 صفًّا منها 28 نسخة، وتُغذّي حالةُ الأثر البائت نموذجًا من سبعة عشر عمودًا بمصفوفة من ثمانية عشر عمودًا أعمدتُها منزاحة بواحد من <code>km_to_gaza</code> فما بعد، وتضع حالةُ الاحتياطي المفقود <code>NaN</code> في مصفوفة سيرفضها نموذجٌ برسالة غامضة أو &mdash; وهذا أسوأ، في بعض المكتبات &mdash; يعدّها صفرًا بهدوء. وجوابُ «متكافئتان عمليًّا» هو الخاطئُ المتأمِّل، وهو خاطئٌ للسبب الذي يبرّر التقنيةَ كلَّها: <strong>فالرقمُ في جدول لا يقارنه أحد ليس فحصًا، والفرقُ بين التأكيد والتعليق أن التعليقَ لا يستطيع أن يمنع إطارًا سيئًا من الوصول إلى نموذج.</strong> وحالةُ الأثر البائت لم تكن ستظهر في التقرير أصلًا، فالمصفوفةُ 85 × 18 سليمةٌ تمامًا. والجوابُ الذي يقول إن B لا تستطيع معالجةَ حزيران خطأٌ واقعي يستحقّ التثبّت: فلا شيء في هذا الخط يُسقط صفًّا لقيمة غير معروفة &mdash; فتصير <code>very good</code> فراغًا تعبّئه المرحلةُ 3 بالمنوال وتُبلّغ الخطوةُ عنه. والجوابُ الأخير هو الفخُّ الذي وُجد <a href=\"#t2l6-s27\">المفهوم 6</a> ليُغلقه: أضِف <code>\"very good\"</code> إلى <code>COND_ORDER</code> فيُعاد ترقيم 75 شقة من 480 من 3 إلى 4، وتبقى المصفوفةُ 480 × 18 بلا فراغات وبأسماء الأعمدة نفسها، و<em>تنجح التأكيداتُ الثلاثة كلُّها</em>. فالتأكيدُ يُثبت الادّعاءَ الذي يقوله ولا شيء غيره."
        }
      },

      /* ---------------------------------------------------------- 23 */
      {
        id: "t2l6q23", type: "mcq", level: "hard",
        topics: ["t2-whole-chapter-mae", "t2-one-split", "t2-no-feature-eng"],
        q: {
          en: "The 480 flats are split 75/25 with the chapter's seed, the pipeline is fitted on the training half and applied to both, and least squares is run on a ladder of feature sets &mdash; 346 training rents, 113 held out. <code>one median for everyone</code>: 0 cols, 60.9104 / 63.6726. <code>numbers only</code>: 4, 49.2657 / 53.6625. <code>+ city, one-hot</code>: 9, 39.4462 / 40.6052. <code>+ condition, ordered code</code>: 10, 37.1710 / <strong>36.9553</strong>. <code>+ agency, top 5 + Other</code>: 16, 37.1946 / 37.0908. <code>+ km_to_gaza</code>: 17, 37.1946 / 37.0908. <code>+ area_was_missing</code>: 18, 37.2086 / 37.0980. Which reading is correct?",
          ar: "تُقسَم الشقق الـ480 بنسبة 75 إلى 25 ببذرة الفصل، ويُضبط الخطُّ على نصف التدريب ويُطبَّق على النصفين، وتُشغَّل المربعاتُ الصغرى على سلّم من مجموعات الخصائص &mdash; ‏346 إيجارًا تدريبيًّا و113 محجوزًا. ‏<code>one median for everyone</code>: صفر أعمدة، 60.9104 / 63.6726. ‏<code>numbers only</code>: ‏4، ‏49.2657 / 53.6625. ‏<code>+ city, one-hot</code>: ‏9، ‏39.4462 / 40.6052. ‏<code>+ condition, ordered code</code>: ‏10، ‏37.1710 / <strong>36.9553</strong>. ‏<code>+ agency, top 5 + Other</code>: ‏16، ‏37.1946 / 37.0908. ‏<code>+ km_to_gaza</code>: ‏17، ‏37.1946 / 37.0908. ‏<code>+ area_was_missing</code>: ‏18، ‏37.2086 / 37.0980. فأيُّ القراءات صحيحة؟"
        },
        options: [
          {
            en: "The ladder stops at ten columns. The five city dummies are the biggest single gain in the chapter &mdash; 13.1 shekels, the thing four lessons of text cleaning exist for &mdash; and the three rungs after <code>condition</code> are worth &minus;0.14, 0.0000 and &minus;0.007, all far inside the shekel or two of noise on one 113-row split. So the recommended matrix is the ten-column one, and a pipeline that produces eighteen columns is producing eight it cannot justify.",
            ar: "يتوقّف السلّم عند عشرة أعمدة. فمؤشِّراتُ المدن الخمسة أكبرُ كسب منفرد في الفصل &mdash; ‏13.1 شيكلًا، وهي الشيءُ الذي وُجدت له أربعةُ دروس من تنظيف النصّ &mdash; والدرجاتُ الثلاث بعد <code>condition</code> تساوي &minus;0.14 و0.0000 و&minus;0.007، وكلُّها داخل الشيكل أو الاثنين من ضجيج تقسيم واحد على 113 صفًّا. فالمصفوفةُ الموصى بها هي ذاتُ الأعمدة العشرة، والخطُّ الذي ينتج ثمانيةَ عشر عمودًا ينتج ثمانيةً لا يستطيع تبريرها."
          },
          {
            en: "The eighteen-column matrix is the one to ship: it is the only row that uses every column the pipeline produces, 37.0980 is still 42% below the baseline, and nothing has been lost by keeping the extra eight.",
            ar: "مصفوفةُ الأعمدة الثمانية عشر هي التي تُرسَل: فهي السطرُ الوحيد الذي يستعمل كلَّ عمود ينتجه الخط، و37.0980 ما زالت أدنى بـ42% من خط الأساس، ولم يُفقَد شيءٌ بإبقاء الأعمدة الثمانية الزائدة."
          },
          {
            en: "<code>km_to_gaza</code> changed the held-out error by 0.0000 because the reference join left those rows unmatched, so the column is blank, and a blank column cannot change a fit.",
            ar: "غيّرت <code>km_to_gaza</code> خطأَ الصفوف المحجوزة بـ0.0000 لأن دمجَ المرجع ترك تلك الصفوف غيرَ مطابقة، فالعمودُ فارغ، والعمودُ الفارغ لا يستطيع تغييرَ ضبط."
          },
          {
            en: "Adding the <code>deposit</code> column lowers the training error to 33.0754 <em>and</em> the held-out error to 35.6282, beating every row of this table in both columns at once, so the honest conclusion is that the chapter stopped one feature too early.",
            ar: "إضافةُ عمود <code>deposit</code> تُنزل خطأَ التدريب إلى 33.0754 <em>و</em>خطأَ الصفوف المحجوزة إلى 35.6282، فتهزم كلَّ سطر في هذا الجدول في العمودين معًا، فتكون الخلاصةُ الأمينة أن الفصلَ توقّف قبل خاصية واحدة."
          }
        ],
        answer: 0,
        hint: {
          en: "Read the <em>increments</em>, not the total, and then read the last three increments against the noise <a href=\"#t2l1-s28\">Lesson&nbsp;1</a> measured on this ruler. One of the four options quotes a genuine improvement in both columns and is still wrong &mdash; ask where the <code>deposit</code> of a flat with no recorded deposit came from.",
          ar: "اقرأ <em>الزيادات</em> لا المجموع، ثم اقرأ الزياداتِ الثلاث الأخيرة في مقابل الضجيج الذي قاسه <a href=\"#t2l1-s28\">الدرس 1</a> على هذه المسطرة. وواحدٌ من الخيارات الأربعة يذكر تحسُّنًا حقيقيًّا في العمودين وهو خاطئ مع ذلك &mdash; فاسأل من أين جاء <code>deposit</code> لشقةٍ لا تأمينَ مسجَّلًا لها."
        },
        explain: {
          en: "From 63.6726 shekels to 36.9553 is 42% below the one-number baseline, and every rung that <em>matters</em> moves both columns in the same direction, which is the signature of a gain that is real rather than fitted. Read the increments: the four numeric columns are worth 10.0 shekels, the five city dummies another 13.1, the ordered <code>condition</code> code another 3.6 &mdash; and then the ladder stops, with the training error even rising. Note what the recommendation rests on: not that 36.9553 beats 37.0908, because <a href=\"#t2l1-s28\">Lesson&nbsp;1</a> measured the noise on this ruler at a shekel or two and <strong>differences under about two shekels in this table mean nothing</strong>; the agency block goes because it is free, and one split with one seed cannot tell you whether a step helps <em>reliably</em>, only whether it helped once. The <code>km_to_gaza</code> option is a real misconception with a precise answer: the join reports <code>0 rows unmatched</code> and the column is full, and the distance adds nothing because it is a <em>linear combination</em> of the city dummies &mdash; the rank of the design matrix is 5 with the intercept and five dummies and still 5 with the distance added, and fitting the distance from the dummies alone leaves a residual of 1.38&times;10<sup>&minus;25</sup>. And the <code>deposit</code> option is the most interesting wrong answer in this bank, because its numbers are correct: for 87 of the 360 training rows &mdash; 24.2% &mdash; the deposit <em>is</em> a multiple of the rent, because <a href=\"#t2l2-s23\">Lesson&nbsp;2's rule</a> computed it as <code>months &times; monthly_rent</code>. A quarter of that column is the answer, arithmetically transformed, and because the leak sits inside each row's own feature it flatters the held-out score too, so the measurement you would use to catch it has been contaminated by it. <strong>A feature you will not have when you need the prediction is not a feature, however well it measures.</strong>",
          ar: "من 63.6726 شيكلًا إلى 36.9553 أدنى بـ42% من خط الأساس بالرقم الواحد، وكلُّ درجة <em>تهمّ</em> تُحرّك العمودين في الاتجاه نفسه، وهذا توقيعُ كسبٍ حقيقي لا مضبوط على البيانات. واقرأ الزيادات: فالأعمدةُ العددية الأربعة تساوي 10.0 شيكلات، ومؤشِّراتُ المدن الخمسة 13.1 أخرى، ورمزُ <code>condition</code> المرتَّب 3.6 أخرى &mdash; ثم يتوقّف السلّم، وخطأُ التدريب يرتفع. ولاحظ على ماذا تستند التوصية: ليس على أن 36.9553 تهزم 37.0908، فقد قاس <a href=\"#t2l1-s28\">الدرس 1</a> ضجيجَ هذه المسطرة بشيكل أو اثنين و<strong>الفروقُ أقلَّ من نحو شيكلين في هذا الجدول لا تعني شيئًا</strong>؛ فمقطعُ الوكالات يذهب لأنه مجاني، والتقسيمُ الواحد ببذرة واحدة لا يستطيع أن يخبرك هل تُفيد خطوةٌ <em>بانتظام</em>، بل هل أفادت مرة. وخيارُ <code>km_to_gaza</code> وهمٌ حقيقي له جوابٌ دقيق: فالدمجُ يُبلّغ <code>0 rows unmatched</code> والعمودُ مملوء، والمسافةُ لا تضيف شيئًا لأنها <em>تركيبٌ خطّي</em> لمؤشِّرات المدن &mdash; فرتبةُ مصفوفة التصميم 5 بالمقطع والمؤشِّرات الخمسة وتبقى 5 بإضافة المسافة، وضبطُ المسافة على المؤشِّرات وحدها يترك بَقِيّةً مقدارها 1.38×10<sup>&minus;25</sup>. وخيارُ <code>deposit</code> أطرفُ جواب خاطئ في هذا البنك، لأن أرقامه صحيحة: فلـ87 صفًّا من صفوف التدريب الـ360 &mdash; أي 24.2% &mdash; يكون التأمينُ مضاعفًا للإيجار، لأن <a href=\"#t2l2-s23\">قاعدةَ الدرس 2</a> حسبته <code>months × monthly_rent</code>. فرُبعُ ذلك العمود هو الجوابُ محوَّلًا حسابيًّا، ولأن التسرّبَ داخل خاصية كل صف فهو يُجمّل درجةَ الصفوف المحجوزة أيضًا، فيكون القياسُ الذي كنت ستستعمله لكشفه قد لوّثه. <strong>فالخاصيةُ التي لن تملكها حين تحتاج التنبّؤ ليست خاصية، مهما قاست حسنًا.</strong>"
        }
      },

      /* ---------------------------------------------------------- 24 */
      {
        id: "t2l6q24", type: "multi", level: "hard",
        topics: ["t2-fitted-in-memory", "t2-undefended-numbers"],
        q: {
          en: "Each of these happens to the pipeline of Concept&nbsp;5 without a single cell of data being edited. Select <strong>every</strong> one that the three assertions of Version&nbsp;4 &mdash; the row count, no blank cells, the fitted column set in order &mdash; would let through.",
          ar: "كلٌّ من هذه يحدث لخط المفهوم 5 دون أن تُحرَّر خليةُ بيانات واحدة. اختر <strong>كلَّ</strong> ما تتركه التأكيداتُ الثلاثة في النسخة 4 &mdash; عددُ الصفوف وألّا خلايا فارغة ومجموعةُ الأعمدة المضبوطة بالترتيب &mdash; يمرّ."
        },
        options: [
          {
            en: "Somebody adds <code>\"very good\"</code> to <code>COND_ORDER</code> in <code>pipe.py</code>: 75 of the 480 flats &mdash; 15.6% of the file, every one of them an <code>excellent</code> listing &mdash; have their <code>condition_code</code> renumbered from 3 to 4, at a fitted slope of about 25 shekels a step.",
            ar: "يُضيف أحدهم <code>\"very good\"</code> إلى <code>COND_ORDER</code> في <code>pipe.py</code>: فيُعاد ترقيم <code>condition_code</code> لـ75 شقة من 480 &mdash; أي 15.6% من الملف، وكلُّها إعلاناتٌ <code>excellent</code> &mdash; من 3 إلى 4، بميل مضبوط نحو 25 شيكلًا للدرجة."
          },
          {
            en: "<code>fitted</code> is written to JSON and read back. <code>json.dumps</code> turns every dictionary key into a string, so <code>area_by_rooms</code> comes back keyed <code>\"1.0\"</code>, <code>\"2.0\"</code>, &hellip; and <code>d[\"rooms\"].map(...)</code>, which looks up a float, matches none of them: all 26 blank areas fall through to the global median, 12.05&nbsp;m&sup2; out on average and 35.55&nbsp;m&sup2; at worst.",
            ar: "يُكتب <code>fitted</code> إلى JSON ويُقرأ عودةً. فتحوّل <code>json.dumps</code> كلَّ مفتاح قاموس إلى نصّ، فيعود <code>area_by_rooms</code> بمفاتيح <code>\"1.0\"</code> و<code>\"2.0\"</code> و… ولا تطابق <code>d[\"rooms\"].map(...)</code> &mdash; وهي تبحث عن عدد عشري &mdash; واحدًا منها: فتسقط المساحاتُ الفارغة الستّ والعشرون كلُّها إلى الوسيط العالمي، بفارق 12.05 م² في المتوسط و35.55 م² في الأسوأ."
          },
          {
            en: "<code>city_reference.csv</code> is re-sent and appended rather than replaced, so Gaza appears twice in the reference table.",
            ar: "يُعاد إرسال <code>city_reference.csv</code> فيُلحَق بدل أن يُستبدَل، فتظهر غزة مرتين في جدول المرجع."
          },
          {
            en: "<code>s1_one_row_per_flat</code> sorts by <code>listed</code> with the default, non-stable sort. The same 480 flats come back with the same values, and 215 of the 480 positions move &mdash; which redraws the 75/25 split, because <code>sample()</code> selects by position, and swaps 82 of the 360 training rows for others.",
            ar: "تفرز <code>s1_one_row_per_flat</code> بـ<code>listed</code> بالفرز الافتراضي غير المستقرّ. فتعود الشققُ الـ480 نفسها بالقيم نفسها، ويتحرّك 215 موضعًا من 480 &mdash; فتُعاد رسمُ قسمة 75 إلى 25، لأن <code>sample()</code> تختار بالموضع، ويُستبدَل 82 صفًّا من صفوف التدريب الـ360 بغيرها."
          },
          {
            en: "The <code>.fillna(f[\"area_median\"])</code> fallback is deleted from <code>s3_area</code>, and a seven-room flat with no area recorded arrives &mdash; outside the <code>area_by_rooms</code> that covers 1 to 5 rooms.",
            ar: "يُحذَف احتياطيُّ <code>.fillna(f[\"area_median\"])</code> من <code>s3_area</code>، وتصل شقةٌ بسبع غرف بلا مساحة مسجَّلة &mdash; خارج <code>area_by_rooms</code> الذي يغطّي من غرفة إلى خمس."
          },
          {
            en: "<code>dep_months_all</code> is refitted on a different sample of the same market. On the 480 flats the recorded multiples are 185 ones, 115 twos and 61 threes, so the median is 1.0; on <a href=\"#t2l2-s24\">Lesson&nbsp;2's 377-row sample</a> the same calculation gives 2.0 &mdash; doubling the value used to fill 97 of the 117 blank deposits.",
            ar: "يُعاد ضبطُ <code>dep_months_all</code> على عيّنة أخرى من السوق نفسها. فعلى الشقق الـ480 تكون المضاعفاتُ المسجَّلة 185 آحادًا و115 ثنائيًّا و61 ثلاثيًّا، فالوسيطُ 1.0؛ وعلى <a href=\"#t2l2-s24\">عيّنة الدرس 2 ذات 377 صفًّا</a> يعطي الحسابُ نفسه 2.0 &mdash; فيتضاعف المقدارُ المستعمل لتعبئة 97 من التأمينات الفارغة الـ117."
          }
        ],
        answer: [0, 1, 3, 5],
        hint: {
          en: "The three assertions check a row count, a blank count and a list of column <em>names</em>. Ask of each item whether it changes any of those three &mdash; and remember that an ordinal code is one column whose name does not change when its meaning does.",
          ar: "تفحص التأكيداتُ الثلاثة عددَ صفوف وعددَ فراغات وقائمةَ <em>أسماء</em> أعمدة. فاسأل عن كل بند هل يغيّر أيًّا من الثلاثة &mdash; وتذكّر أن الرمزَ الترتيبي عمودٌ واحد لا يتغيّر اسمُه حين يتغيّر معناه."
        },
        explain: {
          en: "Four of the six are silent and two are loud, and the line between them is exactly the line the three assertions draw. The two loud ones: a duplicated reference row raises <code>MergeError: Merge keys are not unique in right dataset</code> before a frame exists &mdash; and with <code>validate=</code> removed the row assertion still fires, <code>85 -&gt; 113</code>; and a fill with no fallback gives <code>AssertionError: blank cells in the feature matrix: ['area_minmax']</code>. The four silent ones each change a <em>meaning</em> while leaving the shape alone. Inserting a level renumbers every level above it, and an ordinal encoding is one column at any number of levels, so the width genuinely does not change &mdash; it <em>would</em> have changed, and the third assertion <em>would</em> have fired, if <code>condition</code> had been one-hot encoded instead. The JSON round trip does not raise, which is the problem: the matrix is the right shape, has no blanks and passes every assertion, and 26 flats are quietly given the wrong area. The non-stable sort leaves the content <em>idempotent</em> &mdash; the same 480 flats with the same values &mdash; and the order is not, which on its own is harmless and in the next line is not, because <code>sample()</code> selects by position. Note that the one-word fix, <code>kind=\"stable\"</code>, cannot be applied quietly: it redraws the split and moves every measured number in Lessons 4, 5 and 6 by a shekel or two. It is a correct change <em>and</em> a versioned change, and the difference between those two sentences is the subject of the concept. And <code>dep_months_all</code> is the fitted parameter that is worse than an eyeballed one, because it <em>looks</em> derived: the median is 1.0 by nine rows out of 361, so a parameter that doubles depending on which rows you happen to fit it to is not a measurement but a coin-flip with a decimal point &mdash; and it is applied to 97 deposits. What all four have in common is the lesson: <strong><code>fitted</code> is a dictionary in memory that nothing writes down, dates, or ties to the file and the rows it was measured on.</strong> A pipeline that read its order from a dated artefact rather than from a module constant could not be affected by the first one at all.",
          ar: "أربعةٌ من الستة صامتة واثنان مسموعان، والخطُّ بينهما هو بالضبط الخطُّ الذي ترسمه التأكيداتُ الثلاثة. فالمسموعان: صفُّ المرجع المكرَّر يرفع <code>MergeError: Merge keys are not unique in right dataset</code> قبل أن يوجد إطار &mdash; وبحذف <code>validate=</code> يُفعَّل تأكيدُ الصفوف مع ذلك، <code>85 -&gt; 113</code>؛ والتعويضُ بلا احتياطي يعطي <code>AssertionError: blank cells in the feature matrix: ['area_minmax']</code>. والصامتةُ الأربع يغيّر كلٌّ منها <em>معنًى</em> ويترك الشكلَ كما هو. فإدخالُ مستوى يُعيد ترقيم كل مستوى فوقه، والترميزُ الترتيبي عمودٌ واحد عند أي عدد من المستويات، فالعرضُ لا يتغيّر فعلًا &mdash; وكان <em>سيتغيّر</em> وكان التأكيدُ الثالث <em>سيُفعَّل</em> لو كانت <code>condition</code> مرمَّزةً ترميزًا أحاديًّا. ورحلةُ JSON لا ترفع خطأً، وهذه هي المشكلة: فالمصفوفةُ بالشكل الصحيح وبلا فراغات وتنجح في كل تأكيد، وتُعطى 26 شقةً مساحةً خاطئة بهدوء. والفرزُ غير المستقرّ يترك المضمونَ <em>متماثلًا عند التكرار</em> &mdash; الشققُ الـ480 نفسها بالقيم نفسها &mdash; والترتيبُ ليس كذلك، وهذا بذاته غيرُ ضارّ وفي السطر التالي ضارٌّ، لأن <code>sample()</code> تختار بالموضع. ولاحظ أن العلاجَ بكلمة واحدة، <code>kind=\"stable\"</code>، لا يمكن تطبيقه بهدوء: فهو يُعيد رسم القسمة ويُزيح كلَّ رقم مقيس في الدروس 4 و5 و6 بشيكل أو اثنين. وهو تغييرٌ صحيح <em>وتغييرٌ ذو نسخة</em>، والفرقُ بين هاتين الجملتين هو موضوعُ المفهوم. و<code>dep_months_all</code> هو الوسيطُ المضبوط الأسوأ من المقدَّر بالنظر، لأنه <em>يبدو</em> مستنبَطًا: فالوسيطُ 1.0 بفارق تسعة صفوف من 361، فالوسيطُ الذي يتضاعف تبعًا للصفوف التي تصادف أن تضبطه عليها ليس قياسًا بل رميةُ عملة بفاصلة عشرية &mdash; وهو مطبَّقٌ على 97 تأمينًا. والمشتركُ بين الأربعة كلِّها هو الدرس: <strong>فـ<code>fitted</code> قاموسٌ في الذاكرة لا يكتبه شيء ولا يؤرّخه ولا يصله بالملف والصفوف التي قِيس عليها.</strong> والخطُّ الذي يقرأ ترتيبَه من أثرٍ مؤرَّخ لا من ثابت وحدة لم يكن الأولُ ليستطيع التأثيرَ فيه على الإطلاق."
        }
      }

    ]
  };
})();
