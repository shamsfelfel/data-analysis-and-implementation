window.DABanks = window.DABanks || {};
(function () {
  /* code(line, line, ...) -> one string with \n between lines */
  function code() { return Array.prototype.join.call(arguments, "\n"); }

  window.DABanks["t1-test-03"] = {
    title: {
      en: "Test 3 — From Python Containers to pandas dtypes",
      ar: "اختبار 3 — من حاويات بايثون إلى أنواع pandas"
    },
    intro: {
      en: "24 questions on Lesson 3: Python containers, NumPy arrays, Series and DataFrames, pandas dtypes, missing values and safe casting. Plan for about 40 minutes. Every question has a hint, an answer and an explanation, hidden until you ask for them: try first, then open them. A revealed answer is not counted.",
      ar: "24 سؤالًا عن الدرس 3: حاويات بايثون ومصفوفات NumPy وSeries وDataFrame وأنواع pandas والقيم المفقودة والتحويل الآمن. خصّص نحو 40 دقيقة. لكل سؤال تلميح وجواب وشرح، وكلها مخفية حتى تطلبها: جرّب أولًا ثم افتحها. والجواب الذي يُظهَر لا يُحتسب."
    },
    questions: [

      /* ---------------------------------------------------------- 01 */
      {
        id: "t1l3q01", type: "tf", level: "easy",
        topics: ["t1-total-rent-evolution", "t1-list-of-dicts-limits"],
        q: {
          en: "This loop (Version 1 of the total-rent example) prints <code>19500.0</code>. True or false: that number is the total monthly rent asked across all 60 listings.",
          ar: "تطبع هذه الحلقة (النسخة 1 من مثال إجمالي الإيجار) <code>19500.0</code>. صح أم خطأ: هذا الرقم هو إجمالي الإيجار الشهري المطلوب في الإعلانات الستين كلها."
        },
        code: code(
          "total = 0.0",
          "for row in rows:                       # rows = list(csv.DictReader(f))",
          "    if row[\"monthly_rent\"] != \"\":      # float(\"\") would crash",
          "        total += float(row[\"monthly_rent\"])",
          "print(total)                           # 19500.0"
        ),
        truth: false,
        hint: {
          en: "Count which rows the <code>if</code> lets through, then ask whether the printed line says anything about the rows it skipped.",
          ar: "عُدّ الصفوف التي يسمح لها الشرط <code>if</code> بالمرور، ثم اسأل: هل يقول السطر المطبوع شيئًا عن الصفوف التي تخطّاها؟"
        },
        explain: {
          en: "False. Listings 1010 and 1026 have a blank rent, which <code>csv.DictReader</code> hands over as the empty string, and the <code>if</code> skips them silently: 19500.0 is the total of 58 listings. The loop neither crashes nor says it skipped anything, so the number reads like a total over 60. Delete the <code>if</code> and the run stops with <code>ValueError</code>; replace it with <code>float(x or 0)</code> and you invent two zero rents. Rule to keep: whenever a total is computed over data with gaps, report how many values it used.",
          ar: "خطأ. في الإعلانين 1010 و1026 إيجار فارغ تسلّمه <code>csv.DictReader</code> سلسلةً فارغة، ويتخطاهما الشرط <code>if</code> بصمت: فالرقم 19500.0 هو إجمالي 58 إعلانًا. لا تنهار الحلقة ولا تقول إنها تخطّت شيئًا، فيُقرأ الرقم كأنه إجمالي ستين. احذف الشرط فيتوقف التشغيل بالخطأ <code>ValueError</code>؛ واستبدله بـ<code>float(x or 0)</code> فتخترع إيجارين قيمتهما صفر. القاعدة: كلما حُسب إجمالي على بيانات فيها فجوات فاذكر كم قيمة استُعملت."
        }
      },

      /* ---------------------------------------------------------- 02 */
      {
        id: "t1l3q02", type: "mcq", level: "easy",
        topics: ["t1-containers-four"],
        q: {
          en: "The record has no <code>rooms</code> key. What do the two print lines do, and which form would warn you that the key is missing?",
          ar: "ليس في السجل مفتاح <code>rooms</code>. ماذا يفعل سطرا الطباعة، وأيّ الصيغتين تنبّهك إلى أن المفتاح مفقود؟"
        },
        code: code(
          "listing = {\"listing_id\": 1042, \"city\": \"Rafah\", \"monthly_rent\": 290}",
          "print(listing.get(\"rooms\"))",
          "print(listing[\"rooms\"])"
        ),
        options: [
          {
            en: "Both print <code>None</code>, so neither form warns you.",
            ar: "كلاهما يطبع <code>None</code>، فلا تنبّهك أي من الصيغتين."
          },
          {
            en: "<code>get</code> returns <code>None</code> quietly; <code>[ ]</code> raises <code>KeyError</code>, so only <code>[ ]</code> warns you.",
            ar: "<code>get</code> تعيد <code>None</code> بهدوء، والأقواس المربعة ترفع <code>KeyError</code>؛ فالأقواس وحدها تنبّهك."
          },
          {
            en: "<code>get</code> raises <code>KeyError</code>; <code>[ ]</code> returns <code>None</code>, so only <code>get</code> warns you.",
            ar: "<code>get</code> ترفع <code>KeyError</code>، والأقواس المربعة تعيد <code>None</code>؛ فـ<code>get</code> وحدها تنبّهك."
          },
          {
            en: "Both raise <code>KeyError</code>, so either form warns you.",
            ar: "كلاهما يرفع <code>KeyError</code>، فتنبّهك أي من الصيغتين."
          }
        ],
        answer: 1,
        hint: {
          en: "Compare the two ways of asking: one is a method call that can carry a default, the other is the plain lookup.",
          ar: "قارن بين طريقتي السؤال: إحداهما استدعاء دالة يمكن أن يحمل قيمة افتراضية، والأخرى بحث عادي بالمفتاح."
        },
        explain: {
          en: "A dictionary reports a missing key in two ways. <code>listing.get('rooms')</code> returns <code>None</code> without a complaint (you may pass a default as a second argument); <code>listing['rooms']</code> raises <code>KeyError: 'rooms'</code>. The quiet form is convenient, and it is also the one that lets a gap travel unnoticed into later arithmetic, which is why missing values return in Concept 5. The wrong options swap the two behaviours or make them identical.",
          ar: "يبلّغ القاموس عن المفتاح المفقود بطريقتين. فـ<code>listing.get('rooms')</code> تعيد <code>None</code> دون أي شكوى (ويمكنك تمرير قيمة افتراضية معاملًا ثانيًا)، أما <code>listing['rooms']</code> فترفع <code>KeyError: 'rooms'</code>. الصيغة الهادئة مريحة، وهي أيضًا الصيغة التي تدع الفجوة تمرّ دون أن يلاحظها أحد إلى حسابات لاحقة، ولهذا تعود القيم المفقودة في المفهوم 5. أما الخيارات الخاطئة فتعكس السلوكين أو تجعلهما متطابقين."
        }
      },

      /* ---------------------------------------------------------- 03 */
      {
        id: "t1l3q03", type: "tf", level: "easy",
        topics: ["t1-numpy-speed"],
        q: {
          en: "The lesson timed <code>data.sum()</code> against a Python loop over one million rents and found NumPy about 32 times faster. True or false: for the four rents of listings 1001 to 1004, <code>data.sum()</code> will also be about 32 times faster than a loop.",
          ar: "قاس الدرس زمن <code>data.sum()</code> مقابل حلقة بايثون على مليون إيجار فوجد NumPy أسرع بنحو 32 مرة. صح أم خطأ: في حالة الإيجارات الأربعة للإعلانات من 1001 إلى 1004 ستكون <code>data.sum()</code> أيضًا أسرع بنحو 32 مرة من الحلقة."
        },
        truth: false,
        hint: {
          en: "What does a call have to do before it adds the first number, and how long does it take to add just four numbers?",
          ar: "ماذا يجب على الاستدعاء أن يفعل قبل أن يجمع أول رقم؟ وكم يستغرق جمع أربعة أرقام فقط؟"
        },
        explain: {
          en: "False. The speed comes from a contiguous block of numbers and a loop in compiled code, but every NumPy call also has a fixed set-up cost. For four numbers that cost is larger than the work itself, so NumPy is not faster at all; the ratio belongs to large arrays. Even there the milliseconds change from machine to machine. The figure you can trust to reproduce is the memory ratio (the array takes about a quarter of what the list takes), because it is a property of the layout. Read the ratio, not the milliseconds, and do not apply it to a size that was not measured.",
          ar: "خطأ. تأتي السرعة من كتلة متصلة من الأرقام ومن حلقة بكود مترجَم، لكن لكل استدعاء في NumPy كلفة تهيئة ثابتة. وفي أربعة أرقام تفوق هذه الكلفة العمل نفسه، فلا تكون NumPy أسرع أصلًا؛ فالنسبة تخصّ المصفوفات الكبيرة. وحتى فيها تتغير الملّي ثانية من جهاز إلى آخر. والرقم الذي يمكنك الوثوق بتكراره هو نسبة الذاكرة (تأخذ المصفوفة نحو ربع ما تأخذه القائمة) لأنها خاصية في تخطيط البيانات. اقرأ النسبة لا الملّي ثانية، ولا تطبّقها على حجم لم يُقَس."
        }
      },

      /* ---------------------------------------------------------- 04 */
      {
        id: "t1l3q04", type: "mcq", level: "easy",
        topics: ["t1-ndarray-basics"],
        q: {
          en: "Which line does the last statement print?",
          ar: "أيّ سطر تطبعه العبارة الأخيرة؟"
        },
        code: code(
          "grid = np.array([[415.0, 119.2, 4],",
          "                 [445.0, 115.7, 3]])",
          "print(grid.shape, grid.ndim, grid.dtype)"
        ),
        options: [
          { code: "(3, 2) 2 float64" },
          { code: "(2, 3) 2 int64" },
          { code: "(6,) 1 float64" },
          { code: "(2, 3) 2 float64" }
        ],
        answer: 3,
        hint: {
          en: "A shape lists the rows first. And how many dtypes may one array hold?",
          ar: "يذكر الشكل (shape) الصفوف أولًا. وكم نوعًا (dtype) تسمح به المصفوفة الواحدة؟"
        },
        explain: {
          en: "The grid has 2 rows and 3 columns, so its shape is (2, 3) and it has 2 axes. An array has exactly one dtype for all its cells: the decimal numbers decide it, and the whole-looking 4 and 3 are stored as 4.0 and 3.0, so the dtype is float64, not int64. (3, 2) swaps rows and columns; (6,) forgets that the data has two axes.",
          ar: "للشبكة صفّان وثلاثة أعمدة، فشكلها (2, 3) وعدد محاورها 2. وللمصفوفة نوع واحد لكل خلاياها: الأعداد العشرية هي التي تحسم النوع، فتُخزَّن 4 و3 على أنهما 4.0 و3.0، فالنوع float64 لا int64. أما (3, 2) فتبدّل الصفوف والأعمدة، وأما (6,) فينسى أن للبيانات محورين."
        }
      },

      /* ---------------------------------------------------------- 05 */
      {
        id: "t1l3q05", type: "fill", level: "easy",
        topics: ["t1-vectorisation-masks"],
        q: {
          en: "Fill in the three blanks. The program should print how many listings are above 400, what share of the listings that is, and the rents of the listings at or below 400.",
          ar: "املأ الفراغات الثلاثة. يجب أن يطبع البرنامج كم إعلانًا إيجاره فوق 400، وما نسبتها من الإعلانات، وإيجارات الإعلانات التي إيجارها 400 فما دون."
        },
        code: code(
          "rent = np.array([415.0, 445.0, 590.0, 315.0])",
          "big = rent > 400                    # a boolean mask: one True/False per listing",
          "print(big.____1____())              # how many are above 400",
          "print(big.____2____())              # what share of the listings",
          "print(rent[____3____].tolist())     # the rents at or below 400"
        ),
        blanks: [
          { accept: ["sum"] },
          { accept: ["mean"] },
          { accept: ["~big", "~(big)", "~ big", "rent <= 400", "rent<=400", "rent <= 400.0", "np.logical_not(big)"], wide: true }
        ],
        hint: {
          en: "True counts as 1 when you add or average a mask. To keep the opposite listings you need the negation of the whole mask; the word <code>not</code> is for a single value.",
          ar: "تُحسب True واحدًا عند الجمع أو أخذ المتوسط. ولإبقاء الإعلانات المعاكسة تحتاج إلى نفي القناع كله؛ والكلمة <code>not</code> لقيمة واحدة."
        },
        explain: {
          en: "<code>big.sum()</code> counts the True values (3), <code>big.mean()</code> is their share (0.75), and <code>rent[~big]</code> keeps the positions where the mask is False: [315.0]. The tilde <code>~</code> inverts a whole mask in one step; Python's <code>not</code> works on a single value and raises an error on an array with several elements. The mask and the data have the same length, which is what makes <code>rent[mask]</code> mean 'keep these positions'.",
          ar: "تعدّ <code>big.sum()</code> قيم True (3)، و<code>big.mean()</code> هي نسبتها (0.75)، و<code>rent[~big]</code> تُبقي المواضع التي يكون القناع فيها False: [315.0]. تقلب علامة <code>~</code> القناع كله في خطوة واحدة؛ أما <code>not</code> في بايثون فتعمل على قيمة واحدة وترفع خطأً على مصفوفة فيها عدة عناصر. والقناع والبيانات بالطول نفسه، وهذا ما يجعل <code>rent[mask]</code> تعني «أبقِ هذه المواضع»."
        }
      },

      /* ---------------------------------------------------------- 06 */
      {
        id: "t1l3q06", type: "multi", level: "hard",
        topics: ["t1-broadcasting"],
        q: {
          en: "Which of these expressions run without an error? (Choose all that apply.)",
          ar: "أيّ هذه التعبيرات يعمل دون خطأ؟ (اختر كل ما ينطبق.)"
        },
        code: code(
          "X = np.array([[415.0, 119.2, 4],",
          "              [445.0, 115.7, 3],",
          "              [590.0, 126.7, 5],",
          "              [315.0, 109.2, 3]])      # shape (4, 3): 4 listings, 3 features",
          "col_mean = X.mean(axis=0)              # shape (3,)",
          "row_sum = X.sum(axis=1)                # shape (4,)"
        ),
        options: [
          { code: "X - col_mean" },
          { code: "X / row_sum" },
          { code: "row_sum.reshape(4, 1) + col_mean" },
          { code: "col_mean + row_sum" },
          { code: "X / row_sum.reshape(4, 1)" },
          { code: "X.T - col_mean" }
        ],
        answer: [0, 2, 4],
        hint: {
          en: "Line the two shapes up from the right and compare the sizes in each position: equal, or one of them is 1. Do this for each expression.",
          ar: "صُفَّ الشكلين من اليمين وقارن الحجمين في كل موضع: متساويان أو أحدهما 1. افعل ذلك لكل تعبير."
        },
        explain: {
          en: "Shapes meet from the right. <code>X - col_mean</code>: (4, 3) against (3,) works, and the row of means is reused for each of the 4 rows. <code>row_sum.reshape(4, 1) + col_mean</code>: (4, 1) against (3,) stretches both and gives (4, 3), a table pairing every row sum with every column mean; it runs without a complaint, which is exactly the silent trap. <code>X / row_sum.reshape(4, 1)</code> divides each row by its own total. The failing ones: <code>X / row_sum</code> and <code>col_mean + row_sum</code> put 3 against 4, and <code>X.T - col_mean</code> is (3, 4) against (3,), so 4 meets 3. A value per row needs a column shape (4, 1); a value per column needs a row shape (3,).",
          ar: "تتقابل الأشكال من اليمين. في <code>X - col_mean</code> يقابل (4, 3) الشكلَ (3,) فيُعاد استعمال صفّ المتوسطات على الصفوف الأربعة. وفي <code>row_sum.reshape(4, 1) + col_mean</code> يقابل (4, 1) الشكلَ (3,) فيُمَدّ كلاهما ويخرج (4, 3): جدول يقرن كل مجموع صفّ بكل متوسط عمود، ويعمل دون أي اعتراض، وهذا هو الفخّ الصامت. أما <code>X / row_sum.reshape(4, 1)</code> فتقسم كل صف على مجموعه. والتعبيرات الفاشلة: <code>X / row_sum</code> و<code>col_mean + row_sum</code> تقابلان 3 بـ4، و<code>X.T - col_mean</code> شكله (3, 4) مقابل (3,) فيقابل 4 العددَ 3. القيمة لكل صف تحتاج شكل عمود (4, 1)، والقيمة لكل عمود تحتاج شكل صف (3,)."
        }
      },

      /* ---------------------------------------------------------- 07 */
      {
        id: "t1l3q07", type: "mcq", level: "medium",
        topics: ["t1-numpy-upcasting", "t1-missing-spellings"],
        q: {
          en: "In the lesson, <code>pd.Series([415, 445, None])</code> became a float64 column with a NaN. What dtype does NumPy give <code>np.array([415, 445, None])</code>?",
          ar: "في الدرس صارت <code>pd.Series([415, 445, None])</code> عمود float64 فيه NaN. فما النوع الذي تعطيه NumPy للمصفوفة <code>np.array([415, 445, None])</code>؟"
        },
        options: [
          {
            en: "<code>int64</code>: the <code>None</code> is stored as 0",
            ar: "<code>int64</code>: تُخزَّن <code>None</code> صفرًا"
          },
          {
            en: "<code>float64</code>: NumPy turns <code>None</code> into NaN, as pandas does",
            ar: "<code>float64</code>: تحوّل NumPy قيمة <code>None</code> إلى NaN كما تفعل pandas"
          },
          {
            en: "<code>object</code>: the <code>None</code> stays a Python object",
            ar: "<code>object</code>: تبقى <code>None</code> كائن بايثون"
          },
          {
            en: "<code>&lt;U4</code>: every value becomes text",
            ar: "<code>&lt;U4</code>: تصير كل القيم نصًّا"
          }
        ],
        answer: 2,
        hint: {
          en: "NumPy never throws a value away and never invents one; it only picks a dtype that can hold everything you gave it.",
          ar: "لا ترمي NumPy قيمة ولا تخترع قيمة؛ هي فقط تختار نوعًا يتسع لكل ما أعطيتها."
        },
        explain: {
          en: "NumPy upcasts to the one dtype that holds every element, and no numeric dtype can hold <code>None</code>, so the array becomes <code>object</code>: a list in disguise, slow and without vector maths. pandas goes further: it reads the list, recognises <code>None</code> as a gap in a numeric column, converts it to NaN and returns float64. The int64 option would invent a rent of 0, the float64 option credits NumPy with pandas' behaviour, and text is what numbers become when they are mixed with strings, not with <code>None</code>.",
          ar: "ترقّي NumPy المصفوفة إلى النوع الوحيد الذي يتسع لكل العناصر، ولا نوع عددي يتسع لـ<code>None</code>، فتصير المصفوفة <code>object</code>: قائمة متنكّرة، بطيئة وبلا حساب متجهي. أما pandas فتذهب أبعد: تقرأ القائمة فتتعرف على <code>None</code> فجوةً في عمود عددي، وتحوّلها إلى NaN، وتعيد float64. وخيار int64 يخترع إيجارًا قيمته 0، وخيار float64 ينسب إلى NumPy سلوك pandas، والنص هو ما تصير إليه الأرقام حين تُخلط بنصوص لا بـ<code>None</code>."
        }
      },

      /* ---------------------------------------------------------- 08 */
      {
        id: "t1l3q08", type: "output", level: "medium",
        topics: ["t1-series-alignment"],
        q: {
          en: "Write exactly what the program prints.",
          ar: "اكتب بالضبط ما يطبعه البرنامج."
        },
        code: code(
          "a = pd.Series([1, 2, 3], index=[\"a\", \"b\", \"c\"])",
          "b = pd.Series([10, 20, 30], index=[\"c\", \"a\", \"b\"])",
          "print((a + b).tolist())",
          "print(a.iloc[0] + b.iloc[0])"
        ),
        blanks: [
          { accept: ["[21, 32, 13]\n11", "[21,32,13]\n11"], lines: 2 }
        ],
        hint: {
          en: "Two Series are added label by label. The second line, however, asks for positions.",
          ar: "تُجمع السلسلتان تسميةً تسمية. أما السطر الثاني فيسأل عن المواضع."
        },
        explain: {
          en: "<code>a + b</code> lines the values up by index label, not by position: <code>a</code> gives 1 + 20 = 21, <code>b</code> gives 2 + 30 = 32, <code>c</code> gives 3 + 10 = 13, and the labels come back as a, b, c, so the first line is <code>[21, 32, 13]</code>. The by-position answer <code>[11, 22, 33]</code> is what two NumPy arrays would give. The second line uses <code>.iloc[0]</code>, the first position of each Series (1 and 10), so it prints 11: positions and labels are different things. The same alignment is why filtering the features but not the labels (or the reverse) before a subtraction returns a long result full of NaN instead of an error.",
          ar: "يصفّ <code>a + b</code> القيم بتسمية الفهرس لا بالموضع: فالتسمية <code>a</code> تعطي 1 + 20 = 21، و<code>b</code> تعطي 2 + 30 = 32، و<code>c</code> تعطي 3 + 10 = 13، وترجع التسميات في النتيجة a وb وc، فالسطر الأول <code>[21, 32, 13]</code>. أما جواب الموضع <code>[11, 22, 33]</code> فهو ما تعطيه مصفوفتا NumPy. والسطر الثاني يستعمل <code>.iloc[0]</code> أي الموضع الأول في كل سلسلة (1 و10) فيطبع 11: المواضع والتسميات شيئان مختلفان. وهذه المحاذاة هي سبب أن ترشيح الخصائص دون التسميات (أو العكس) قبل الطرح يعطي نتيجة طويلة مليئة بـNaN بدل أن يعطي خطأً."
        }
      },

      /* ---------------------------------------------------------- 09 */
      {
        id: "t1l3q09", type: "multi", level: "medium",
        topics: ["t1-loc-iloc-select"],
        q: {
          en: "Listing 1008 is the first Rafah listing. Which expressions return its row? (Choose all that apply.)",
          ar: "الإعلان 1008 هو أول إعلان في رفح. أيّ التعبيرات تعيد صفّه؟ (اختر كل ما ينطبق.)"
        },
        code: code(
          "df = pd.read_csv(\"rental_listings.csv\")",
          "rafah = df[df[\"city\"] == \"Rafah\"]      # 11 rows, with the labels 7, 14, 16, 21, ..."
        ),
        options: [
          { code: "rafah.loc[0]" },
          { code: "rafah.iloc[0]" },
          { code: "rafah.iloc[7]" },
          { code: "rafah.loc[7]" },
          { code: "rafah[0]" }
        ],
        answer: [1, 3],
        hint: {
          en: "After a filter the rows keep the labels they had in the full table. Which expressions ask for a label, and which for a position?",
          ar: "بعد الترشيح تحتفظ الصفوف بتسمياتها التي كانت لها في الجدول الكامل. أيّ التعبيرات تسأل عن تسمية، وأيّها عن موضع؟"
        },
        explain: {
          en: "A boolean filter keeps each row's old label, so the first Rafah row still carries label 7, the label it had in the full table. <code>.iloc[0]</code> asks for the first position and <code>.loc[7]</code> for label 7: both reach listing 1008. <code>.loc[0]</code> asks for a label that no longer exists and raises <code>KeyError</code> (the lucky outcome: on a frame whose labels did include 0 it would quietly return a different row). <code>.iloc[7]</code> is the eighth Rafah listing (1045), not the first. <code>rafah[0]</code> looks for a column called 0 and raises <code>KeyError</code>.",
          ar: "يُبقي الترشيح المنطقي لكل صف تسميته القديمة، فالصف الأول في رفح ما زال يحمل التسمية 7، وهي تسميته في الجدول الكامل. تسأل <code>.iloc[0]</code> عن الموضع الأول وتسأل <code>.loc[7]</code> عن التسمية 7: وكلتاهما تصلان إلى الإعلان 1008. أما <code>.loc[0]</code> فتسأل عن تسمية لم تعد موجودة وترفع <code>KeyError</code> (وهذه النتيجة المحظوظة: ففي جدول تتضمن تسمياته 0 فعلًا ستعيد صفًّا آخر بصمت). وأما <code>.iloc[7]</code> فهو إعلان رفح الثامن (1045) لا الأول. وأما <code>rafah[0]</code> فيبحث عن عمود اسمه 0 ويرفع <code>KeyError</code>."
        }
      },

      /* ---------------------------------------------------------- 10 */
      {
        id: "t1l3q10", type: "error", level: "medium",
        topics: ["t1-filter-new-column"],
        q: {
          en: "The program should give every Rafah listing a 10% discount and print the size of the discount. It prints <code>0.0</code> instead of <code>288.5</code>, and nothing stops it. Click the wrong line.",
          ar: "يُفترض أن يمنح البرنامج كل إعلان في رفح خصمًا قدره 10% ويطبع مقدار الخصم. لكنه يطبع <code>0.0</code> بدل <code>288.5</code>، ولا شيء يوقفه. انقر السطر الخاطئ."
        },
        code: code(
          "import pandas as pd",
          "",
          "df = pd.read_csv(\"rental_listings.csv\")",
          "total_before = df[\"monthly_rent\"].sum()",
          "rafah = df[\"city\"] == \"Rafah\"",
          "df[rafah][\"monthly_rent\"] = df[rafah][\"monthly_rent\"] * 0.9    # 10% discount",
          "total_after = df[\"monthly_rent\"].sum()",
          "print(total_before - total_after)      # expected: the size of the discount"
        ),
        answer: 6,
        solution: {
          code: "df.loc[rafah, \"monthly_rent\"] = df.loc[rafah, \"monthly_rent\"] * 0.9",
          en: "One <code>.loc</code> call, with the row mask and the column name together, writes into the table itself.",
          ar: "استدعاء <code>.loc</code> واحد، بقناع الصفوف واسم العمود معًا، يكتب في الجدول نفسه."
        },
        hint: {
          en: "Count how many operations the left-hand side of the assignment performs, and ask which of them returns a copy.",
          ar: "عُدّ العمليات التي يجريها الطرف الأيسر من التعيين، واسأل أيّها يعيد نسخة."
        },
        explain: {
          en: "Line 6 is a chained assignment: <code>df[rafah]</code> first returns a temporary copy of the Rafah rows, and <code>[\"monthly_rent\"] = ...</code> then writes into that copy, which is thrown away. <code>df</code> is unchanged, so the difference is 0.0; the only evidence is a <code>SettingWithCopyWarning</code>, which you should treat as an error. A single <code>.loc[row_mask, \"column\"] = value</code> call writes into the table itself. The other lines are fine: the mask in line 5 is ordinary, and the sums in lines 4 and 7 skip the two blank rents in both cases.",
          ar: "السطر 6 تعيين متسلسل (chained): فـ<code>df[rafah]</code> تعيد أولًا نسخة مؤقتة من صفوف رفح، ثم يكتب <code>[\"monthly_rent\"] = ...</code> في هذه النسخة التي تُرمى. فيبقى <code>df</code> كما هو ويكون الفرق 0.0، والدليل الوحيد هو تحذير <code>SettingWithCopyWarning</code> الذي يجب أن تعامله معاملة الخطأ. أما استدعاء <code>.loc[قناع_الصفوف, \"العمود\"] = قيمة</code> الواحد فيكتب في الجدول نفسه. والأسطر الأخرى سليمة: بناء القناع في السطر 5 عادي، والمجموعان في السطرين 4 و7 يتخطيان الإيجارين الفارغين في الحالتين."
        }
      },

      /* ---------------------------------------------------------- 11 */
      {
        id: "t1l3q11", type: "compare", level: "medium",
        topics: ["t1-total-rent-evolution", "t1-nan-aggregations"],
        q: {
          en: "Both programs add up the monthly rents of the 60 listings (two rents are blank). Which statement about them is correct?",
          ar: "يجمع البرنامجان الإيجارات الشهرية للإعلانات الستين (إيجاران منها فارغان). أيّ العبارات عنهما صحيحة؟"
        },
        codeA: code(
          "import csv",
          "import numpy as np",
          "",
          "with open(\"rental_listings.csv\", newline=\"\", encoding=\"utf-8\") as f:",
          "    rows = list(csv.DictReader(f))",
          "",
          "rents = np.array([float(r[\"monthly_rent\"]) if r[\"monthly_rent\"] else np.nan",
          "                  for r in rows])",
          "print(rents.sum())",
          "print(np.nansum(rents))"
        ),
        codeB: code(
          "import pandas as pd",
          "",
          "df = pd.read_csv(\"rental_listings.csv\", index_col=\"listing_id\")",
          "rent = df[\"monthly_rent\"]",
          "print(rent.sum(), \"from\", rent.count(), \"of\", len(rent), \"listings\")",
          "print(rent[rent.isna()].index.tolist())"
        ),
        options: [
          {
            en: "A is better: <code>np.nansum</code> gives the total, and the array keeps the listing ids beside the rents, so it also tells you which listings it skipped.",
            ar: "أ أفضل: <code>np.nansum</code> تعطي الإجمالي، والمصفوفة تحتفظ بأرقام الإعلانات بجانب الإيجارات، فتخبرك أيضًا أي الإعلانات تخطّتها."
          },
          {
            en: "B is better: the sum skips blanks, <code>count()</code> says 58 of 60 were used, the index names listings 1010 and 1026; the skipping is still silent.",
            ar: "ب أفضل: المجموع يتخطى الفراغات، وتقول <code>count()</code> إن 58 من 60 استُعملت، ويسمّي الفهرس الإعلانين 1010 و1026؛ لكن التخطي ما زال صامتًا."
          },
          {
            en: "They behave the same: the first lines of both print <code>19500.0</code>, so the choice between an array and a Series is only style.",
            ar: "يتصرفان تصرفًا واحدًا: يطبع سطراهما الأولان <code>19500.0</code>، فالاختيار بين المصفوفة والسلسلة ذوق فقط."
          },
          {
            en: "B is better: <code>read_csv</code> fills the two blank rents with 0 on loading, so the total quietly covers all 60 listings.",
            ar: "ب أفضل: تملأ <code>read_csv</code> الإيجارين الفارغين بـ0 عند التحميل، فيغطي الإجمالي الإعلانات الستين بهدوء."
          }
        ],
        answer: 1,
        hint: {
          en: "Run each program in your head: what does the first print line of A show, and what can you still tell about position 9 of its array?",
          ar: "شغّل كل برنامج في رأسك: ماذا يُظهر أول سطر طباعة في أ؟ وماذا يمكنك أن تعرف عن الموضع 9 في مصفوفته؟"
        },
        explain: {
          en: "A's first line prints <code>nan</code>, because one NaN poisons a NumPy sum, so you must remember <code>np.nansum</code>; and the array has no labels, so you must keep a second list to know that position 9 is listing 1010. B fixes both: <code>.sum()</code> skips missing values by default, <code>.count()</code> reports how many values were really there, and the index names the missing listings. What B leaves open: the skipping is still silent, so the report must say 19500 over 58 of 60 listings, and the dtype was guessed by <code>read_csv</code>. B does not fill the blanks with 0 (that would change the average, Concept 5), and <code>np.nansum</code> in A skips values just as silently.",
          ar: "يطبع أول سطر في أ <code>nan</code> لأن NaN واحدة تسمّم مجموع NumPy، فعليك أن تتذكر <code>np.nansum</code>؛ وليس للمصفوفة تسميات، فعليك أن تحتفظ بقائمة ثانية لتعرف أن الموضع 9 هو الإعلان 1010. ويصلح ب الأمرين: تتخطى <code>.sum()</code> القيم المفقودة افتراضيًّا، وتخبر <code>.count()</code> كم قيمة كانت موجودة فعلًا، ويسمّي الفهرس الإعلانات المفقودة. وما يبقى مفتوحًا في ب: التخطي صامت، فيجب أن يقول التقرير «19500 على 58 من 60 إعلانًا»، ونوع العمود خمّنته <code>read_csv</code>. ولا تملأ <code>read_csv</code> الفراغات بـ0 (فهذا يغيّر المتوسط، المفهوم 5)، و<code>np.nansum</code> في أ تتخطى القيم بالصمت نفسه."
        }
      },

      /* ---------------------------------------------------------- 12 */
      {
        id: "t1l3q12", type: "mcq", level: "medium",
        topics: ["t1-dtype-table", "t1-nullable-dtypes"],
        q: {
          en: "What do these lines print, and how do you keep the flags as flags with a gap?",
          ar: "ماذا تطبع هذه الأسطر، وكيف تُبقي الأعلام أعلامًا مع فجوة؟"
        },
        code: code(
          "flags = pd.Series([True, False, None])",
          "print(flags.dtype)"
        ),
        options: [
          {
            en: "<code>float64</code>; <code>True</code> and <code>False</code> become 1.0 and 0.0, and <code>None</code> becomes nan",
            ar: "<code>float64</code>؛ تصير <code>True</code> و<code>False</code> هما 1.0 و0.0 وتصير <code>None</code> هي nan"
          },
          {
            en: "<code>bool</code>; the <code>None</code> is stored as <code>False</code>",
            ar: "<code>bool</code>؛ تُخزَّن <code>None</code> قيمة <code>False</code>"
          },
          {
            en: "<code>boolean</code>; pandas picks the nullable type as soon as it sees the gap",
            ar: "<code>boolean</code>؛ تختار pandas النوع القابل للنقص ما إن ترى الفجوة"
          },
          {
            en: "<code>object</code>; ask for <code>dtype=\"boolean\"</code> to keep True/False with a real <code>&lt;NA&gt;</code>",
            ar: "<code>object</code>؛ اطلب <code>dtype=\"boolean\"</code> لتبقى True/False مع <code>&lt;NA&gt;</code> حقيقية"
          }
        ],
        answer: 3,
        hint: {
          en: "Booleans plus a gap: does pandas find a numeric type that holds True, False and nothing? And who chooses the nullable types?",
          ar: "قيم منطقية مع فجوة: هل تجد pandas نوعًا عدديًّا يتسع لـTrue وFalse ولا شيء؟ ومن يختار الأنواع القابلة للنقص؟"
        },
        explain: {
          en: "Integers with a gap land in float64 because NaN is a float. True/False with <code>None</code> has no such home (<code>bool</code> cannot hold a gap), so pandas falls back to <code>object</code>, where each cell is an ordinary Python object. It never picks the nullable <code>boolean</code> on its own: you have to ask with <code>dtype=\"boolean\"</code>, and then the gap is a real <code>&lt;NA&gt;</code> that keeps its meaning (unknown), not False. The float64 option is the tempting one, because it is what <code>[1, 2, None]</code> does.",
          ar: "الأعداد الصحيحة مع فجوة تهبط إلى float64 لأن NaN عدد عشري؛ أما True/False مع <code>None</code> فلا مأوى لها كذلك (النوع <code>bool</code> لا يحمل فجوة)، فترجع pandas إلى <code>object</code> حيث كل خلية كائن بايثون عادي. ولا تختار النوع القابل للنقص <code>boolean</code> من تلقاء نفسها: عليك أن تطلبه بـ<code>dtype=\"boolean\"</code>، فتصير الفجوة <code>&lt;NA&gt;</code> حقيقية تحتفظ بمعناها (مجهول) لا False. وخيار float64 هو المغري لأنه ما تفعله <code>[1, 2, None]</code>."
        }
      },

      /* ---------------------------------------------------------- 13 */
      {
        id: "t1l3q13", type: "contrast", level: "medium",
        topics: ["t1-missing-spellings", "t1-nullable-dtypes"],
        q: {
          en: "Place each statement under <code>np.nan</code>, under <code>pd.NA</code>, or under both.",
          ar: "ضع كل عبارة تحت <code>np.nan</code> أو تحت <code>pd.NA</code> أو تحت كليهما."
        },
        concepts: [
          { en: "np.nan", ar: "np.nan" },
          { en: "pd.NA", ar: "pd.NA" }
        ],
        rows: [
          {
            s: {
              en: "A genuine floating-point value defined by the IEEE standard, not a pandas invention",
              ar: "قيمة عشرية حقيقية يحدّدها معيار IEEE، وليست من اختراع pandas"
            },
            a: 0
          },
          {
            s: {
              en: "<code>x + 1</code> gives a missing result, not an error",
              ar: "<code>x + 1</code> تعطي نتيجة مفقودة لا خطأً"
            },
            a: 2
          },
          {
            s: {
              en: "<code>if x:</code> raises <code>TypeError</code> on purpose",
              ar: "<code>if x:</code> ترفع <code>TypeError</code> عمدًا"
            },
            a: 1
          },
          {
            s: {
              en: "<code>x == x</code> gives <code>False</code>",
              ar: "<code>x == x</code> تعطي <code>False</code>"
            },
            a: 0
          },
          {
            s: {
              en: "<code>pd.isna(x)</code> returns <code>True</code>",
              ar: "<code>pd.isna(x)</code> تعيد <code>True</code>"
            },
            a: 2
          },
          {
            s: {
              en: "The single marker used for a gap in <code>Int64</code>, <code>boolean</code> and <code>string</code> columns",
              ar: "العلامة الواحدة للفجوة في أعمدة <code>Int64</code> و<code>boolean</code> و<code>string</code>"
            },
            a: 1
          },
          {
            s: {
              en: "<code>x == x</code> gives a missing value, neither True nor False",
              ar: "<code>x == x</code> تعطي قيمة مفقودة، لا True ولا False"
            },
            a: 1
          }
        ],
        hint: {
          en: "Think about which dtypes each one lives in, and what happens when you compare it with itself or put it in an <code>if</code>.",
          ar: "فكّر في الأنواع التي تعيش فيها كل منهما، وفي ما يحدث عند مقارنتها بنفسها أو وضعها في <code>if</code>."
        },
        explain: {
          en: "NaN is an IEEE floating-point value, which is why it is at home in float64 columns, and it is not equal even to itself: that is why <code>df[rent == np.nan]</code> finds nothing and you ask with <code>.isna()</code>. <code>pd.NA</code> is pandas' single marker for Int64, boolean and string columns; comparing it with anything gives <code>&lt;NA&gt;</code> (an unknown cannot be said to equal an unknown), and using it as a condition raises, so an unknown cannot quietly choose a branch. What they share: arithmetic with either gives a missing result, and <code>.isna()</code> finds both.",
          ar: "NaN قيمة عشرية في معيار IEEE ولذلك تعيش في أعمدة float64، ولا تساوي حتى نفسها، ولذلك لا تجد <code>df[rent == np.nan]</code> شيئًا فاسأل بـ<code>.isna()</code>. أما <code>pd.NA</code> فعلامة pandas الواحدة في أعمدة Int64 وboolean وstring؛ ومقارنتها بأي شيء تعطي <code>&lt;NA&gt;</code> (فالمجهول لا يمكن القول إنه يساوي مجهولًا)، واستعمالها شرطًا يرفع خطأً حتى لا يختار مجهولٌ فرعًا بهدوء. وما يجمعهما: الحساب مع أيٍّ منهما يعطي نتيجة مفقودة، و<code>.isna()</code> تجدهما معًا."
        }
      },

      /* ---------------------------------------------------------- 14 */
      {
        id: "t1l3q14", type: "match", level: "easy",
        topics: ["t1-silent-casts"],
        q: {
          en: "Match each cast to what it really does.",
          ar: "وصّل كل تحويل بما ينتجه فعلًا."
        },
        leftHead: { en: "The cast", ar: "التحويل" },
        rightHead: { en: "What it gives", ar: "ما ينتجه" },
        pairs: [
          {
            l: { code: "pd.Series([2.9, -1.5]).astype(int).tolist()" },
            r: { code: "[2, -1]" }
          },
          {
            l: { code: "pd.Series([\"no\", \"yes\"]).astype(bool).tolist()" },
            r: { code: "[True, True]" }
          },
          {
            l: { code: "pd.Series([300, 70000]).astype(\"int16\").tolist()" },
            r: { code: "[300, 4464]" }
          },
          {
            l: { code: "pd.Series([1.0, np.nan]).astype(str).tolist()" },
            r: { code: "['1.0', 'nan']" }
          },
          {
            l: { code: "pd.Series([2.5, 3.0]).astype(\"Int64\")" },
            r: { en: "raises TypeError: it refuses to cut the 0.5", ar: "يرفع TypeError: يرفض بتر الكسر 0.5" }
          }
        ],
        hint: {
          en: "Work out each result separately; do not assume that <code>astype</code> only fails when the conversion is impossible.",
          ar: "احسب كل نتيجة على حدة؛ ولا تفترض أن <code>astype</code> لا يفشل إلا حين يستحيل التحويل."
        },
        explain: {
          en: "'Strict' means strict about the impossible, not about the lossy. <code>astype(int)</code> cuts the fraction toward zero (2.9 becomes 2, -1.5 becomes -1); it does not round. <code>astype(bool)</code> only asks whether a string is non-empty, so 'no' is True: use an explicit <code>.map({'yes': True, 'no': False})</code>. A narrow target wraps around: 70000 does not fit in 16 bits and becomes 4464. <code>astype(str)</code> turns NaN into the four-letter text 'nan', after which <code>isna()</code> sees nothing (use <code>astype('string')</code>). The nullable <code>Int64</code> cast is the careful one: it refuses to truncate 2.5.",
          ar: "«صارم» تعني صارمًا فيما هو مستحيل لا فيما هو مُتلِف. يقطع <code>astype(int)</code> الكسر باتجاه الصفر (تصير 2.9 هي 2 وتصير -1.5 هي -1)، ولا يقرّب. ويسأل <code>astype(bool)</code> فقط هل السلسلة غير فارغة، فتصير 'no' هي True: استعمل <code>.map({'yes': True, 'no': False})</code> صريحًا. والنوع الهدف الضيق يلتف حول نفسه: لا تتسع 70000 في 16 بتًّا فتصير 4464. ويحوّل <code>astype(str)</code> قيمة NaN إلى النص ذي الأحرف الأربعة 'nan' فلا تجد <code>isna()</code> شيئًا بعدها (استعمل <code>astype('string')</code>). أما التحويل إلى <code>Int64</code> القابل للنقص فهو الحذر: يرفض بتر 2.5."
        }
      },

      /* ---------------------------------------------------------- 15 */
      {
        id: "t1l3q15", type: "trace", level: "medium",
        topics: ["t1-nan-aggregations"],
        q: {
          en: "After the last line has run, what are the values of the three variables? (Type <code>nan</code> if the result is not a number.)",
          ar: "بعد تنفيذ السطر الأخير، ما قيم المتغيرات الثلاثة؟ (اكتب <code>nan</code> إن لم تكن النتيجة رقمًا.)"
        },
        code: code(
          "import pandas as pd",
          "",
          "rent = pd.Series([415.0, 445.0, None, 590.0])",
          "mean = round(rent.mean(), 2)",
          "mean_zero = round(rent.fillna(0).mean(), 2)",
          "total_np = rent.to_numpy().sum()"
        ),
        blanks: [
          { accept: ["483.33"], label: { en: "mean", ar: "mean" } },
          { accept: ["362.5"], label: { en: "mean_zero", ar: "mean_zero" } },
          { accept: ["nan", "NaN"], label: { en: "total_np", ar: "total_np" } }
        ],
        hint: {
          en: "pandas aggregations and NumPy sums treat a missing value differently, and <code>fillna(0)</code> changes how many values the average divides by.",
          ar: "تعامل مجاميع pandas ومجاميع NumPy القيمة المفقودة معاملتين مختلفتين، وتغيّر <code>fillna(0)</code> عدد القيم التي يقسم عليها المتوسط."
        },
        explain: {
          en: "<code>rent.mean()</code> skips the missing value: (415 + 445 + 590) / 3 = 483.33. <code>fillna(0)</code> turns the gap into a rent of 0 and divides by 4: 1450 / 4 = 362.5, so the invented zero drags the average down. <code>rent.to_numpy().sum()</code> is a NumPy sum, and NumPy does not skip NaN, so one NaN makes the whole sum <code>nan</code>; you would need <code>np.nansum</code>. The same numbers give three different answers depending on the library and the policy, which is why a mean should be reported together with its count.",
          ar: "تتخطى <code>rent.mean()</code> القيمة المفقودة: (415 + 445 + 590) / 3 = 483.33. وتحوّل <code>fillna(0)</code> الفجوة إلى إيجار قيمته 0 وتقسم على 4: 1450 / 4 = 362.5، فيسحب الصفر المختلَق المتوسط إلى أسفل. أما <code>rent.to_numpy().sum()</code> فمجموع NumPy، وهي لا تتخطى NaN، فتجعل قيمةٌ واحدة المجموع كله <code>nan</code>؛ وتحتاج <code>np.nansum</code>. فالأرقام نفسها تعطي ثلاثة أجوبة بحسب المكتبة والسياسة، ولهذا يُذكر المتوسط مع عدده."
        }
      },

      /* ---------------------------------------------------------- 16 */
      {
        id: "t1l3q16", type: "error", level: "hard",
        topics: ["t1-coerce-and-count"],
        q: {
          en: "<code>convert_rent</code> should report how many texts could not be converted. For this input it prints a count that is too high. Click the line responsible.",
          ar: "يُفترض أن تبلّغ الدالة <code>convert_rent</code> كم نصًّا تعذّر تحويله. وهي تطبع لهذا المدخل عددًا أكبر من الصحيح. انقر السطر المسؤول."
        },
        code: code(
          "import pandas as pd",
          "",
          "def convert_rent(raw):",
          "    clean = raw.str.replace(\",\", \"\", regex=False)",
          "    rent = pd.to_numeric(clean, errors=\"coerce\")",
          "    lost = rent.isna().sum()",
          "    print(lost, \"of\", len(raw), \"values could not be converted\")",
          "    return rent",
          "",
          "raw = pd.Series([\"415\", \"1,050\", None, \"TBD\", \"380\", \"290\"])",
          "rent = convert_rent(raw)"
        ),
        answer: 6,
        solution: {
          code: "lost = (rent.isna() & raw.notna()).sum()",
          en: "Count only the cells that held a text before and hold nothing now.",
          ar: "عُدّ فقط الخلايا التي كان فيها نص ولم يعد فيها شيء."
        },
        hint: {
          en: "Ask what <code>rent.isna()</code> counts exactly, and whether every NaN in the result was caused by the conversion.",
          ar: "اسأل: ماذا تعدّ <code>rent.isna()</code> بالضبط؟ وهل كل NaN في النتيجة سببها التحويل؟"
        },
        explain: {
          en: "Line 6 counts every NaN in the result, including the one that was already missing in <code>raw</code> before any conversion happened (the <code>None</code>), so it prints 2 although only 'TBD' was swallowed ('1,050' was rescued by the cleaning in line 4). The honest count isolates 'a value was there and is now gone': <code>rent.isna() &amp; raw.notna()</code>. <code>len(raw) - rent.count()</code> would have the same flaw. Lines 4 and 5 are right: the separator is stripped before the conversion, and coerce does not crash.",
          ar: "السطر 6 يعدّ كل NaN في النتيجة، بما فيها تلك التي كانت مفقودة أصلًا في <code>raw</code> قبل أي تحويل (القيمة <code>None</code>)، فيطبع 2 مع أن 'TBD' وحدها ابتلعها التحويل (أما '1,050' فأنقذها التنظيف في السطر 4). والعدّ الأمين يعزل «كانت القيمة موجودة وصارت مفقودة»: <code>rent.isna() &amp; raw.notna()</code>. وكذلك <code>len(raw) - rent.count()</code> فيه العيب نفسه. والسطران 4 و5 سليمان: تُنزع الفاصلة قبل التحويل، ولا ينهار القسر."
        }
      },

      /* ---------------------------------------------------------- 17 */
      {
        id: "t1l3q17", type: "compare", level: "medium",
        topics: ["t1-int-float-nan"],
        q: {
          en: "Both versions end with <code>rooms</code> as <code>Int64</code> and one <code>&lt;NA&gt;</code>. Which statement about them is correct?",
          ar: "تنتهي النسختان بالعمود <code>rooms</code> من النوع <code>Int64</code> وفيه <code>&lt;NA&gt;</code> واحدة. أيّ العبارات عنهما صحيحة؟"
        },
        codeA: code(
          "df = pd.read_csv(\"rental_listings.csv\")",
          "df[\"rooms\"] = df[\"rooms\"].astype(\"Int64\")"
        ),
        codeB: code(
          "df = pd.read_csv(\"rental_listings.csv\", dtype={\"rooms\": \"Int64\"})"
        ),
        options: [
          {
            en: "A is better: <code>astype</code> can round 2.5 rooms to 2, whereas <code>dtype=</code> in <code>read_csv</code> would refuse the whole file.",
            ar: "أ أفضل: يستطيع <code>astype</code> تقريب 2.5 غرفة إلى 2، بينما سترفض <code>dtype=</code> في <code>read_csv</code> الملف كله."
          },
          {
            en: "They are identical: the column is float64 only for a moment after the load, and nothing can go wrong in between.",
            ar: "النسختان متطابقتان: يكون العمود float64 للحظة بعد التحميل فقط، ولا شيء يمكن أن يسوء بين الخطوتين."
          },
          {
            en: "B is better: the dtype is declared in the load call, so no script can forget the cast; nothing yet checks the result against it.",
            ar: "ب أفضل: يُعلَن النوع في استدعاء التحميل فلا يستطيع سكربت أن ينسى التحويل؛ ولا شيء يفحص بعد أن النتيجة تطابقه."
          },
          {
            en: "A is better: <code>read_csv</code> cannot be given nullable dtypes, so a cast after loading is the only way to get <code>Int64</code>.",
            ar: "أ أفضل: لا تقبل <code>read_csv</code> أنواعًا قابلة للنقص، فالتحويل بعد التحميل هو السبيل الوحيد إلى <code>Int64</code>."
          }
        ],
        answer: 2,
        hint: {
          en: "Between the load and the cast in A, what dtype does the column have, and who has to remember to run the cast?",
          ar: "بين التحميل والتحويل في أ، ما نوع العمود؟ ومن عليه أن يتذكر تنفيذ التحويل؟"
        },
        explain: {
          en: "Version A repeats a cast after every load, in every notebook; until you do, <code>rooms</code> is float64 and a generated label reads '4.0-room flat'. Version B moves the knowledge 'rooms is a nullable integer' into the read call, next to the file name where the next reader will see it, and a surprising value such as 3.5 rooms fails at load time. Both are strict: <code>astype(\"Int64\")</code> also refuses to truncate 2.5 (TypeError), so the 'rounds' option is false, and <code>read_csv</code> does accept nullable dtypes. What B still leaves open: you must know which dtype each column deserves, and nothing yet checks that the loaded table matches what you declared (Lesson 6).",
          ar: "تكرّر النسخة أ التحويل بعد كل تحميل وفي كل دفتر؛ وإلى أن تفعل يبقى <code>rooms</code> من النوع float64 وتُقرأ التسمية المولَّدة «4.0-room flat». أما النسخة ب فتنقل معرفة «rooms عدد صحيح قابل للنقص» إلى استدعاء القراءة، بجانب اسم الملف حيث يراها القارئ التالي، وقيمة مفاجئة كـ3.5 غرفة تفشل عند التحميل. والاثنتان صارمتان: <code>astype(\"Int64\")</code> يرفض أيضًا بتر 2.5 (TypeError)، فخيار «يقرّب» خاطئ، و<code>read_csv</code> تقبل الأنواع القابلة للنقص. وما تتركه ب مفتوحًا: عليك أن تعرف النوع الذي يستحقه كل عمود، ولا شيء يفحص بعد أن الجدول المحمَّل يطابق ما أعلنتَه (الدرس 6)."
        }
      },

      /* ---------------------------------------------------------- 18 */
      {
        id: "t1l3q18", type: "complete", level: "easy",
        topics: ["t1-int-float-nan", "t1-nullable-dtypes"],
        q: {
          en: "Complete the call so that <code>rooms</code> loads as whole numbers, with its one blank cell kept as a real missing value.",
          ar: "أكمل الاستدعاء بحيث يُحمَّل <code>rooms</code> أعدادًا صحيحة، وتبقى خليته الفارغة الوحيدة قيمة مفقودة حقيقية."
        },
        code: code(
          "import pandas as pd",
          "",
          "df = pd.read_csv(\"rental_listings.csv\", ____)",
          "print(df[\"rooms\"].dtype)               # Int64",
          "print(f\"{df['rooms'][0]}-room flat\")     # 4-room flat"
        ),
        options: [
          { code: "dtype={\"rooms\": \"int64\"}" },
          { code: "dtype={\"rooms\": \"Float64\"}" },
          { code: "dtype={\"rooms\": \"Int64\"}" },
          { code: "na_values={\"rooms\": 0}" }
        ],
        answer: 2,
        solution: {
          code: "df = pd.read_csv(\"rental_listings.csv\", dtype={\"rooms\": \"Int64\"})",
          en: "Declaring the nullable integer at read time is Version 3 of the rooms example.",
          ar: "إعلان النوع الصحيح القابل للنقص عند القراءة هو النسخة 3 من مثال الغرف."
        },
        hint: {
          en: "Which dtype can hold whole numbers and a gap at the same time? And what happens to a plain integer type when the column contains a blank?",
          ar: "أيّ نوع يتسع لأعداد صحيحة وفجوة معًا؟ وماذا يحدث للنوع الصحيح العادي حين يحتوي العمود خلية فارغة؟"
        },
        explain: {
          en: "The capital I in <code>Int64</code> marks pandas' nullable integer: whole numbers plus <code>&lt;NA&gt;</code>. A plain <code>int64</code> cannot hold the blank, so <code>read_csv</code> stops with <code>ValueError: Integer column has NA values</code>. <code>Float64</code> is nullable too, but it is still a decimal type, so the label would read '4.0-room flat'. <code>na_values={\"rooms\": 0}</code> only changes which cells count as missing (the zeros) and leaves the column float64.",
          ar: "الحرف الكبير في <code>Int64</code> يدل على النوع الصحيح القابل للنقص في pandas: أعداد صحيحة مع <code>&lt;NA&gt;</code>. أما <code>int64</code> العادي فلا يحمل الفراغ، فتتوقف <code>read_csv</code> بالخطأ <code>ValueError: Integer column has NA values</code>. و<code>Float64</code> قابل للنقص أيضًا لكنه ما زال نوعًا عشريًّا، فتُقرأ التسمية «4.0-room flat». وأما <code>na_values={\"rooms\": 0}</code> فيغيّر فقط أي الخلايا تُعدّ مفقودة (الأصفار) ويترك العمود float64."
        }
      },

      /* ---------------------------------------------------------- 19 */
      {
        id: "t1l3q19", type: "ordercode", level: "medium",
        topics: ["t1-coerce-and-count", "t1-casting-tools"],
        q: {
          en: "Put the statements in an order that runs correctly and counts only what the conversion swallowed. The values are enrolments from the school registry, stored as text; one has a thousands separator.",
          ar: "رتّب الأسطر بترتيب يعمل صحيحًا ويعدّ ما ابتلعه التحويل وحده. القيم أعداد المقيدين في سجل المدارس مخزَّنة نصًّا، وإحداها بفاصل آلاف."
        },
        items: [
          { code: "import pandas as pd" },
          { code: "raw = pd.Series([\"455\", \"1,020\", \"unknown\", None, \"380\"])" },
          { code: "clean = raw.str.replace(\",\", \"\", regex=False)" },
          { code: "enrol = pd.to_numeric(clean, errors=\"coerce\")" },
          { code: "bad = enrol.isna() & raw.notna()" },
          { code: "print(bad.sum(), \"of\", len(raw), \"values swallowed:\", raw[bad].tolist())" }
        ],
        hint: {
          en: "Which statements create a name that a later statement uses? And the cleaning has to happen while the comma is still there.",
          ar: "أيّ الأسطر ينشئ اسمًا يستعمله سطر لاحق؟ والتنظيف يجب أن يتم والفاصلة ما زالت موجودة."
        },
        explain: {
          en: "Each statement needs the names created above it: <code>pd</code> must exist before the Series is built, <code>clean</code> is built from <code>raw</code>, <code>enrol</code> from <code>clean</code>, <code>bad</code> from <code>enrol</code> and <code>raw</code>, and the report uses <code>bad</code>. Two orderings carry the lesson: strip the separator before <code>to_numeric</code>, otherwise '1,020' is coerced to NaN and lost (Version 4 against Version 2), and build the mask from <code>raw</code>, the unconverted text, because that is the only place that remembers which cells were present before. The program prints <code>1 of 5 values swallowed: ['unknown']</code>; the <code>None</code> was never a text.",
          ar: "كل سطر يحتاج الأسماء التي أنشأتها الأسطر قبله: فـ<code>pd</code> يجب أن تكون موجودة قبل بناء السلسلة، وتُبنى <code>clean</code> من <code>raw</code>، و<code>enrol</code> من <code>clean</code>، و<code>bad</code> من <code>enrol</code> و<code>raw</code>، ويستعمل التقرير <code>bad</code>. وترتيبان يحملان درس المثال: انزع الفاصل قبل <code>to_numeric</code> وإلا قُسرت '1,020' إلى NaN وضاعت (النسخة 4 مقابل النسخة 2)، وابنِ القناع من <code>raw</code> أي النص قبل التحويل لأنه المكان الوحيد الذي يتذكر أي الخلايا كانت موجودة. يطبع البرنامج <code>1 of 5 values swallowed: ['unknown']</code>؛ أما <code>None</code> فلم تكن نصًّا قط."
        }
      },

      /* ---------------------------------------------------------- 20 */
      {
        id: "t1l3q20", type: "write", level: "hard",
        topics: ["t1-dates-format", "t1-casting-tools", "t1-coerce-and-count"],
        q: {
          en: "A scraper delivers listing dates as day/month/year text, with a blank and an impossible date: <code>raw = pd.Series([\"03/02/2026\", \"25/02/2026\", \"unknown\", None, \"30/02/2026\", \"14/03/2026\"])</code>. Write code that converts <code>raw</code> to dates, stating the format and letting unreadable values become missing, and then prints how many non-blank texts failed to convert and which ones they were. The blank must not be counted as a failure.",
          ar: "يسلّمك مستخلص بيانات تواريخ الإعلانات نصًّا بصيغة يوم/شهر/سنة، وفيها خلية فارغة وتاريخ مستحيل: <code>raw = pd.Series([\"03/02/2026\", \"25/02/2026\", \"unknown\", None, \"30/02/2026\", \"14/03/2026\"])</code>. اكتب كودًا يحوّل <code>raw</code> إلى تواريخ مع ذكر الصيغة وترك القيم غير المقروءة تصير مفقودة، ثم يطبع كم نصًّا غير فارغ فشل تحويله وما هي. يجب ألا تُحسب الخلية الفارغة إخفاقًا."
        },
        starter: code(
          "import pandas as pd",
          "",
          "raw = pd.Series([\"03/02/2026\", \"25/02/2026\", \"unknown\", None, \"30/02/2026\", \"14/03/2026\"])",
          "",
          "# your code here"
        ),
        lines: 9,
        checks: [
          {
            re: "to_datetime\\s*\\(",
            label: { en: "Convert with <code>pd.to_datetime</code>", ar: "التحويل بـ<code>pd.to_datetime</code>" }
          },
          {
            re: "format\\s*=\\s*[\"']%d/%m/%Y[\"']",
            label: { en: "Name the format: <code>format=\"%d/%m/%Y\"</code>", ar: "ذكر الصيغة: <code>format=\"%d/%m/%Y\"</code>" }
          },
          {
            re: "errors\\s*=\\s*[\"']coerce[\"']",
            label: { en: "<code>errors=\"coerce\"</code>, so unreadable values become NaT", ar: "<code>errors=\"coerce\"</code> لتصير القيم غير المقروءة NaT" }
          },
          {
            re: "(notna|notnull)\\s*\\(|~\\s*\\w+\\s*\\.\\s*(isna|isnull)\\s*\\(",
            label: { en: "A mask for 'text before, nothing now': a missing result combined with <code>raw.notna()</code>", ar: "قناع «كان فيها نص ولم يعد»: نتيجة مفقودة مع <code>raw.notna()</code>" }
          }
        ],
        forbid: [
          {
            re: "errors\\s*=\\s*[\"']ignore[\"']",
            label: { en: "<code>errors=\"ignore\"</code> (it hands the text back unchanged and hides the failures)", ar: "<code>errors=\"ignore\"</code> (يعيد النص كما هو ويخفي الإخفاقات)" }
          }
        ],
        solution: {
          code: code(
            "import pandas as pd",
            "",
            "raw = pd.Series([\"03/02/2026\", \"25/02/2026\", \"unknown\", None, \"30/02/2026\", \"14/03/2026\"])",
            "dates = pd.to_datetime(raw, format=\"%d/%m/%Y\", errors=\"coerce\")",
            "failed = dates.isna() & raw.notna()",
            "print(failed.sum(), \"of\", len(raw), \"failed:\", raw[failed].tolist())"
          ),
          out: "2 of 6 failed: ['unknown', '30/02/2026']",
          en: "The mask <code>dates.isna() &amp; raw.notna()</code> is true only where there was a text and there is now no date.",
          ar: "القناع <code>dates.isna() &amp; raw.notna()</code> صحيح فقط حيث كان هناك نص ولم يعد هناك تاريخ."
        },
        hint: {
          en: "Name the format, coerce the failures, then ask which cells hold a text in <code>raw</code> and nothing in the result.",
          ar: "سمِّ الصيغة، واقسِر الإخفاقات، ثم اسأل: أي الخلايا فيها نص في <code>raw</code> ولا شيء في النتيجة؟"
        },
        explain: {
          en: "Without a format pandas guesses it from the first value, and 03/02/2026 could be 2 March or 3 February; with <code>format=\"%d/%m/%Y\"</code> the reading is stated. <code>errors=\"coerce\"</code> turns what cannot be read into NaT instead of stopping the run, so the damage has to be counted: <code>dates.isna() &amp; raw.notna()</code> is true exactly where there was a text and there is now no date. Here that is 'unknown' and '30/02/2026' (no such day). The blank (<code>None</code>) was missing before the conversion and is not a failure; a plain <code>dates.isna().sum()</code> would report 3.",
          ar: "دون صيغة تخمّن pandas من القيمة الأولى، وقد تكون 03/02/2026 هي 2 مارس أو 3 فبراير؛ ومع <code>format=\"%d/%m/%Y\"</code> تصير القراءة معلنة. ويحوّل <code>errors=\"coerce\"</code> ما لا يُقرأ إلى NaT بدل أن يوقف التشغيل، ولذلك يجب عدّ الضرر: <code>dates.isna() &amp; raw.notna()</code> صحيحة بالضبط حيث كان هناك نص ولم يعد هناك تاريخ. وهنا هما 'unknown' و'30/02/2026' (لا يوجد هذا اليوم). أما الخلية الفارغة (<code>None</code>) فكانت مفقودة قبل التحويل وليست إخفاقًا؛ وكان <code>dates.isna().sum()</code> وحده سيعطي 3."
        }
      },

      /* ---------------------------------------------------------- 21 */
      {
        id: "t1l3q21", type: "output", level: "hard",
        topics: ["t1-datetime-dtype", "t1-int-float-nan"],
        q: {
          en: "Write exactly what the program prints (three lines).",
          ar: "اكتب بالضبط ما يطبعه البرنامج (ثلاثة أسطر)."
        },
        code: code(
          "d = pd.to_datetime(pd.Series([\"2026-01-16\", \"2026-05-05\", None]))",
          "print(d.dtype)",
          "print((d[1] - d[0]).days)",
          "print(d.dt.month.tolist())"
        ),
        blanks: [
          { accept: ["datetime64[ns]\n109\n[1.0, 5.0, nan]", "datetime64[ns]\n109\n[1.0,5.0,nan]"], lines: 3 }
        ],
        hint: {
          en: "A date minus a date is a duration. And what can the month of a missing date be, in a column that otherwise holds whole numbers?",
          ar: "طرح تاريخ من تاريخ يعطي مدة. وماذا يمكن أن يكون شهر تاريخ مفقود في عمود يحمل أعدادًا صحيحة؟"
        },
        explain: {
          en: "<code>to_datetime</code> gives <code>datetime64[ns]</code>, and the missing text becomes <code>NaT</code>. The difference of two dates is a timedelta: 16 January to 5 May is 109 days, and <code>.days</code> extracts the whole number. The third line is the trap: the month of a missing date is missing, and whole numbers with a gap are float64 (the same rule as <code>rooms</code>), so the list is <code>[1.0, 5.0, nan]</code>, not <code>[1, 5, nan]</code>. As text none of this would be possible: the <code>.dt</code> accessor raises <code>AttributeError</code> on a column of strings.",
          ar: "تعطي <code>to_datetime</code> النوع <code>datetime64[ns]</code>، ويصير النص المفقود <code>NaT</code>. وفرق تاريخين مدة (timedelta)؛ من 16 يناير إلى 5 مايو 109 أيام، وتستخرج <code>.days</code> العدد الصحيح. والسطر الثالث هو الفخ: شهر التاريخ المفقود مفقود، وأعداد صحيحة فيها فجوة تكون float64 (القاعدة نفسها التي مرت في <code>rooms</code>)، فالقائمة هي <code>[1.0, 5.0, nan]</code> لا <code>[1, 5, nan]</code>. وكنص لا يمكن شيء من هذا: فالمُدخَل <code>.dt</code> يرفع <code>AttributeError</code> على عمود من النصوص."
        }
      },

      /* ---------------------------------------------------------- 22 */
      {
        id: "t1l3q22", type: "multi", level: "hard",
        topics: ["t1-category-ordered", "t1-dtype-memory", "t1-dtype-table"],
        q: {
          en: "Which of these statements are true? (Choose all that apply.)",
          ar: "أيّ هذه العبارات صحيحة؟ (اختر كل ما ينطبق.)"
        },
        code: code(
          "stage = pd.CategoricalDtype([\"Primary\", \"Preparatory\", \"Secondary\"], ordered=True)",
          "level = pd.Series([\"Preparatory\", \"Secondary\", \"Primary\", \"Preparatory\"], dtype=stage)"
        ),
        options: [
          {
            en: "<code>pd.Series([\"Primary\", \"Primry\"], dtype=stage)</code> raises <code>ValueError</code> at the misspelt label.",
            ar: "<code>pd.Series([\"Primary\", \"Primry\"], dtype=stage)</code> ترفع <code>ValueError</code> عند التسمية الخاطئة إملائيًّا."
          },
          {
            en: "<code>level.sort_values()</code> follows school order (Primary, Preparatory, Secondary); the same words as plain text sort alphabetically.",
            ar: "<code>level.sort_values()</code> تتبع ترتيب المراحل المدرسية (Primary ثم Preparatory ثم Secondary)؛ أما الكلمات نفسها نصًّا عاديًّا فتُرتَّب أبجديًّا."
          },
          {
            en: "<code>level &lt; \"Secondary\"</code> is a valid comparison for this ordered dtype.",
            ar: "المقارنة <code>level &lt; \"Secondary\"</code> مقارنة صالحة لهذا النوع المرتّب."
          },
          {
            en: "Converting a column of 50,000 different ids to <code>category</code> makes it smaller than the text.",
            ar: "تحويل عمود من 50,000 معرّف مختلف إلى <code>category</code> يجعله أصغر من النص."
          },
          {
            en: "A governorate column with 5 repeating names costs about 1 byte per row as <code>category</code>, against about 58 as text.",
            ar: "عمود محافظات فيه 5 أسماء مكررة يكلّف نحو بايت واحد للصف نوعًا <code>category</code> مقابل نحو 58 نصًّا."
          },
          {
            en: "A rent column converted to <code>category</code> saves memory and still supports <code>mean()</code>.",
            ar: "عمود إيجارات محوَّل إلى <code>category</code> يوفّر ذاكرة ويبقى يدعم <code>mean()</code>."
          }
        ],
        answer: [1, 2, 4],
        hint: {
          en: "For each statement ask what a category stores: a small table of labels plus one small code per row. Does that help when labels rarely repeat, and does it keep arithmetic?",
          ar: "لكل عبارة اسأل ماذا يخزّن النوع category: جدولًا صغيرًا من التسميات ورمزًا صغيرًا لكل صف. هل ينفع ذلك حين لا تتكرر التسميات؟ وهل يُبقي الحساب؟"
        },
        explain: {
          en: "An ordered category carries a rank: sorting and comparing follow the declared order, which plain text cannot do (Preparatory would sort before Primary). A category stores each label once plus a small code per row, so five governorate names over many rows shrink from about 58 bytes to about 1 per row. A label outside the list is not rejected: 'Primry' silently becomes NaN, so count the NaN after the conversion. With 50,000 different ids the table of labels is as long as the data and the codes come on top, so memory grows (2.8 MB to 4.1 MB in the lesson). A rent is a quantity, not a label: category turns arithmetic into a lookup, and <code>mean()</code> raises <code>TypeError</code>.",
          ar: "للفئات المرتّبة رتبة: يتبع الترتيب والمقارنة الترتيبَ المُعلَن، وهذا ما لا يقدر عليه النص العادي (فتأتي Preparatory قبل Primary). ويخزّن category كل تسمية مرة واحدة مع رمز صغير لكل صف، فتتقلص خمسة أسماء محافظات على صفوف كثيرة من نحو 58 بايتًا إلى نحو 1 للصف. والتسمية الخارجة عن القائمة لا تُرفض: تصير 'Primry' هي NaN بهدوء، فعُدّ NaN بعد التحويل. أما مع 50,000 معرّف مختلف فجدول التسميات بطول البيانات والرموز زيادة عليه، فتكبر الذاكرة (من 2.8 إلى 4.1 ميغابايت في الدرس). والإيجار كمية لا تسمية: يحوّل category الحساب إلى بحث وترفع <code>mean()</code> الخطأ <code>TypeError</code>."
        }
      },

      /* ---------------------------------------------------------- 23 */
      {
        id: "t1l3q23", type: "mcq", level: "hard",
        topics: ["t1-coerce-and-count", "t1-casting-tools"],
        q: {
          en: "Version 4 of the cleaning example works for '1,200'. But the areas in <code>rental_listings_ar_semicolon.csv</code> are written with a decimal comma. What does this program print, and what does it mean?",
          ar: "تنجح النسخة 4 من مثال التنظيف مع '1,200'. لكن المساحات في الملف <code>rental_listings_ar_semicolon.csv</code> مكتوبة بفاصلة عشرية. ماذا يطبع هذا البرنامج، وماذا يعني ذلك؟"
        },
        code: code(
          "area = pd.Series([\"119,2\", \"115,7\", \"126,7\"])        # decimal comma",
          "clean = area.str.replace(\",\", \"\", regex=False)       # Version 4: strip the separator",
          "out = pd.to_numeric(clean, errors=\"coerce\")",
          "bad = out.isna() & area.notna()",
          "print(bad.sum(), out.tolist())"
        ),
        options: [
          {
            en: "<code>0 [1192, 1157, 1267]</code>: nothing was swallowed, yet every area is ten times too large",
            ar: "<code>0 [1192, 1157, 1267]</code>: لم يُبتلع شيء، ومع ذلك صارت كل مساحة أكبر عشر مرات من حقيقتها"
          },
          {
            en: "<code>3 [nan, nan, nan]</code>: '119,2' is not a valid number, and the count shows all three values lost",
            ar: "<code>3 [nan, nan, nan]</code>: '119,2' ليست عددًا صالحًا، ويُظهر العدّ ضياع القيم الثلاث"
          },
          {
            en: "<code>0 [119.2, 115.7, 126.7]</code>: <code>to_numeric</code> reads the decimal comma correctly",
            ar: "<code>0 [119.2, 115.7, 126.7]</code>: تقرأ <code>to_numeric</code> الفاصلة العشرية قراءة صحيحة"
          },
          {
            en: "It stops with a <code>ValueError</code> in the <code>str.replace</code> line",
            ar: "يتوقف بالخطأ <code>ValueError</code> في سطر <code>str.replace</code>"
          }
        ],
        answer: 0,
        hint: {
          en: "Version 4 assumes one particular meaning of the comma. What does the count measure, and can it see an error that produces a perfectly valid number?",
          ar: "تفترض النسخة 4 معنى بعينه للفاصلة. ماذا يقيس العدّ، وهل يستطيع أن يرى خطأً ينتج عددًا صالحًا تمامًا؟"
        },
        explain: {
          en: "Removing the comma turns '126,7' into '1267', a perfectly valid number, so nothing is coerced to NaN, the count says 0, and every area is multiplied by ten without a single warning. The count only sees values that became missing, not values that became wrong. Version 4 assumes the comma is a thousands separator, which is a fact about the file, not about pandas: with a decimal comma the right move is to tell the reader so (Lesson 4 sets <code>thousands=</code> and <code>decimal=</code> at read time), and Lesson 6 turns 'the numbers must be plausible' into a check that stops the run. A rent per square metre computed from these areas would silently be ten times too small.",
          ar: "إزالة الفاصلة تحوّل '126,7' إلى '1267' وهو عدد صالح تمامًا، فلا يُقسر شيء إلى NaN، ويقول العدّ 0، وتُضرب كل مساحة في عشرة دون تحذير واحد. فالعدّ لا يرى إلا القيم التي صارت مفقودة، لا القيم التي صارت خاطئة. تفترض النسخة 4 أن الفاصلة فاصل آلاف، وهذه حقيقة عن الملف لا عن pandas: ومع الفاصلة العشرية يكون الصواب أن تُخبر القارئ بذلك (يضبط الدرس 4 المعاملين <code>thousands=</code> و<code>decimal=</code> عند القراءة)، ويحوّل الدرس 6 «يجب أن تكون الأرقام معقولة» إلى فحص يوقف التشغيل. وكان الإيجار للمتر المربع المحسوب من هذه المساحات سيخرج أصغر عشر مرات بصمت."
        }
      },

      /* ---------------------------------------------------------- 24 */
      {
        id: "t1l3q24", type: "order", level: "easy",
        topics: ["t1-inspect-dtypes", "t1-typed-table"],
        q: {
          en: "Put the steps for turning a freshly loaded table into a typed table in a sensible order.",
          ar: "رتّب خطوات تحويل جدول محمَّل لتوّه إلى جدول مضبوط الأنواع ترتيبًا معقولًا."
        },
        items: [
          {
            en: "Load the file with <code>pd.read_csv</code> and leave every dtype as pandas guessed it.",
            ar: "حمّل الملف بـ<code>pd.read_csv</code> واترك كل نوع كما خمّنته pandas."
          },
          {
            en: "Inspect it: <code>df.dtypes</code>, <code>df.info()</code> and an audit of dtype, missing count, distinct values and bytes per column.",
            ar: "افحصه: <code>df.dtypes</code> و<code>df.info()</code> وتدقيق يعطي النوع وعدد المفقود وعدد القيم المميزة والبايتات لكل عمود."
          },
          {
            en: "Decide the dtype each column deserves from what it means: identifier, quantity, repeated label, flag or date.",
            ar: "قرّر النوع الذي يستحقه كل عمود من معناه: معرّف أم كمية أم تسمية متكررة أم علَم أم تاريخ."
          },
          {
            en: "Cast on purpose: an explicit <code>map</code> for yes/no flags, <code>to_datetime</code> with a format, <code>astype</code> for the rest, and count anything coercion swallowed.",
            ar: "حوّل عن قصد: <code>map</code> صريح لأعلام نعم/لا، و<code>to_datetime</code> بصيغة محددة، و<code>astype</code> لما تبقّى، وعُدّ كل ما ابتلعه القسر."
          },
          {
            en: "Run the audit again and compare it with the first one: dtypes as chosen, no new missing values.",
            ar: "شغّل التدقيق مرة أخرى وقارنه بالأول: الأنواع كما اخترتَ ولا قيم مفقودة جديدة."
          }
        ],
        answer: [0, 1, 2, 3, 4],
        hint: {
          en: "A column cannot be given a better dtype before you have seen what it is now, and a cast cannot be trusted before its result has been checked.",
          ar: "لا يمكن أن تُعطى الأعمدة نوعًا أفضل قبل أن ترى ما هي عليه الآن، ولا يمكن الوثوق بتحويل قبل فحص نتيجته."
        },
        explain: {
          en: "The order follows the dependencies. You cannot judge a dtype before you have looked at what pandas chose (steps 1 and 2), the cast needs the decision (step 3), and the final audit only means something after the casts, compared with the first one: a column that gained missing values means a conversion swallowed something. The audit is the cheapest data-quality test you own; run it again on next month's file.",
          ar: "الترتيب يتبع الاعتماد بين الخطوات. لا تستطيع أن تحكم على نوع قبل أن تنظر فيما اختارته pandas (الخطوتان 1 و2)، والتحويل يحتاج إلى القرار (الخطوة 3)، ولا معنى للتدقيق الأخير إلا بعد التحويلات، مقارنًا بالأول: فالعمود الذي زادت فيه القيم المفقودة يعني أن تحويلًا ابتلع شيئًا. والتدقيق أرخص اختبار لجودة البيانات تملكه؛ شغّله مرة أخرى على ملف الشهر القادم."
        }
      }

    ]
  };
})();
