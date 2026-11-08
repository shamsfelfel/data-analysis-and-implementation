window.DABanks = window.DABanks || {};
(function () {
  /* code(line, line, ...) -> one string with \n between lines */
  function code() { return Array.prototype.join.call(arguments, "\n"); }

  window.DABanks["t2-test-02"] = {
    title: {
      en: "Test 2 — Missing Data: Find It, Understand It, Decide",
      ar: "اختبار 2 — البيانات المفقودة: اعثر عليها، وافهمها، وقرّر"
    },
    intro: {
      en: "24 questions on Lesson 2: counting holes and noticing when the count is a lie, reading a missingness pattern as a table, naming the mechanism in the words MCAR, MAR and MNAR, pricing drop against impute against flag with a real measurement, and ending with a decision log the code produced. Plan for about 45 minutes. Every question carries a hint, an answer and an explanation, hidden until you ask for them: try first, then open them. A revealed answer is not counted.",
      ar: "‏24 سؤالًا عن الدرس 2: عدّ الثقوب وملاحظة متى يكون العدّ كذبًا، وقراءة نمط الفقد (missingness pattern) جدولًا، وتسمية الآلية بمصطلحات MCAR وMAR وMNAR، وتحديد ثمن الحذف مقابل التعويض مقابل التعليم بقياس حقيقي، والانتهاء بسجل قرارات أنتجه الكود. خصّص نحو 45 دقيقة. لكل سؤال تلميح وجواب وشرح، وكلها مخفية حتى تطلبها: جرّب أولًا ثم افتحها. والجواب الذي يُظهَر لا يُحتسب."
    },
    questions: [

      /* ---------------------------------------------------------- 01 */
      {
        id: "t2l2q01", type: "tf", level: "easy",
        topics: ["t2-sentinel"],
        q: {
          en: "A colleague loads the file with <code>keep_default_na=False</code> and the report says <code>0</code>. True or false: the 214 empty cells are simply being skipped, exactly as <code>mean()</code> always skips a missing value, so the last line still prints the average of the published rents.",
          ar: "يحمّل زميلٌ الملف بـ<code>keep_default_na=False</code> فيقول التقرير <code>0</code>. صح أم خطأ: الخلايا الفارغة الـ214 تُتخطّى فقط، كما تتخطّى <code>mean()</code> القيمة المفقودة دائمًا، فيطبع السطر الأخير متوسط الإيجارات المنشورة."
        },
        code: code(
          "hidden = pd.read_csv(\"listings_raw.csv\", keep_default_na=False)",
          "print(\"cells pandas calls missing:\", int(hidden.isna().sum().sum()))   # 0",
          "print(hidden[\"monthly_rent\"].mean())"
        ),
        truth: false,
        hint: {
          en: "Ask what an empty cell in a CSV becomes under that flag &mdash; and then what dtype a column holding 484 numbers and 19 of <em>those</em> things ends up with.",
          ar: "اسأل ماذا تصير الخليةُ الفارغة في ملف CSV تحت ذلك الوسيط &mdash; ثم ما نوع (dtype) عمودٍ فيه 484 رقمًا وتسعة عشر من <em>تلك</em> الأشياء."
        },
        explain: {
          en: "False, and for two separate reasons. Nothing is being skipped: under <code>keep_default_na=False</code> an empty cell arrives as <code>\"\"</code>, a string of length zero, which is a <em>value</em> &mdash; so <code>isna()</code> has nothing to find and the report of 0 is honest about a question nobody asked. And because <code>\"\"</code> is a string, <code>monthly_rent</code> arrives as <code>object</code>, so the last line raises <code>TypeError</code> instead of answering. The word &ldquo;skipped&rdquo; is the tempting part, because it is true of the <em>ordinary</em> read, where <code>count()</code> is 484 and <code>mean()</code> really does ignore the 19 holes. Rule to carry away: a missing-data report cannot be read without knowing how the file was loaded.",
          ar: "خطأ، ولسببين منفصلين. لا شيء يُتخطّى: فتحت <code>keep_default_na=False</code> تصل الخليةُ الفارغة <code>\"\"</code>، أي سلسلةً طولها صفر، وهي <em>قيمة</em> &mdash; فلا تجد <code>isna()</code> شيئًا، ويكون تقرير الصفر أمينًا عن سؤال لم يسأله أحد. ولأن <code>\"\"</code> سلسلةٌ يصل <code>monthly_rent</code> بنوع <code>object</code>، فيرفع السطر الأخير <code>TypeError</code> ولا يجيب. وكلمة «يُتخطّى» هي المغرية، لأنها صحيحة في القراءة <em>العادية</em>، حيث تساوي <code>count()</code> ‏484 وتهمل <code>mean()</code> الثقوب التسعة عشر فعلًا. والقاعدة: لا يمكن قراءة تقرير المفقود دون معرفة كيف حُمِّل الملف."
        }
      },

      /* ---------------------------------------------------------- 02 */
      {
        id: "t2l2q02", type: "fill", level: "easy",
        topics: ["t2-missing-count"],
        q: {
          en: "Fill in the three blanks so that the report counts the holes per column, as a number and as a share, and then as a share of every cell in the table.",
          ar: "املأ الفراغات الثلاثة ليعدّ التقرير الثقوب لكل عمود، رقمًا ونسبةً، ثم نسبةً من كل خلية في الجدول."
        },
        code: code(
          "raw = pd.read_csv(\"listings_raw.csv\")              # 503 rows, 13 columns",
          "",
          "holes  = raw.____1____().sum()",
          "report = pd.DataFrame({\"missing\": holes,",
          "                       \"percent\": (100 * holes / ____2____).round(1)})",
          "print(report[report[\"missing\"] > 0].to_string())",
          "print(\"missing cells: %d (%.2f%%)\" % (holes.sum(), 100 * holes.sum() / raw.____3____))",
          "",
          "#               missing  percent",
          "# monthly_rent       19      3.8",
          "# area_m2            27      5.4",
          "# floor               9      1.8",
          "# condition          36      7.2",
          "# deposit           123     24.5",
          "# missing cells: 214 (3.27%)"
        ),
        blanks: [
          { accept: ["isna", "isnull"] },
          { accept: ["len(raw)", "503", "raw.shape[0]"] },
          { accept: ["size"] }
        ],
        hint: {
          en: "The first blank is the method that turns the frame into a table of <code>True</code> and <code>False</code>. The second and third blanks are two different denominators &mdash; one counts rows, the other counts cells.",
          ar: "الفراغ الأول هو التابع الذي يحوّل الجدول إلى جدول <code>True</code> و<code>False</code>. والفراغان الثاني والثالث مقامان مختلفان &mdash; أحدهما يعدّ الصفوف والآخر يعدّ الخلايا."
        },
        explain: {
          en: "<code>isna()</code> returns a frame of booleans of the same shape, and summing it adds <code>True</code> as 1, so <code>raw.isna().sum()</code> is a count per column. The share is what the decision actually turns on: 9 blank floors and 123 blank deposits are not the same kind of problem, and &ldquo;1.8%&rdquo; and &ldquo;24.5%&rdquo; say so where &ldquo;9&rdquo; and &ldquo;123&rdquo; do not. The third blank is <code>raw.size</code>, which is 6539 cells &mdash; 503&nbsp;&times;&nbsp;13 &mdash; and it produces the one statistic in this lesson to distrust first: 3.27% of the cells are blank, which sounds healthy and hides that the holes sit in five of thirteen columns.",
          ar: "تعيد <code>isna()</code> جدولًا منطقيًّا بالشكل نفسه، ويجمع المجموعُ <code>True</code> بقيمة 1، فتكون <code>raw.isna().sum()</code> عدًّا لكل عمود. والنسبة هي ما يتوقف عليه القرار فعلًا: فتسعة طوابق فارغة ومئة وثلاثة وعشرون تأمينًا فارغًا ليستا مشكلة من نوع واحد، و«1.8%» و«24.5%» تقولان ذلك حيث لا تقوله «9» و«123». والفراغ الثالث <code>raw.size</code> أي 6539 خلية &mdash; ‏503&nbsp;&times;&nbsp;13 &mdash; وهو ينتج الإحصاء الوحيد في هذا الدرس الذي ينبغي أن تشكّ فيه أولًا: ‏3.27% من الخلايا فارغة، وهذا يبدو سليمًا ويخفي أن الثقوب في خمسة أعمدة من ثلاثة عشر."
        }
      },

      /* ---------------------------------------------------------- 03 */
      {
        id: "t2l2q03", type: "match", level: "easy",
        topics: ["t2-missing-spellings"],
        q: {
          en: "Four objects in the pandas world mean &ldquo;no value&rdquo; and two more look like it and are not. Match each written form to what it is and to what <code>isna()</code> does about it.",
          ar: "أربعة كائنات في عالم pandas تعني «لا قيمة»، واثنان آخران يشبهانها وليسا منها. وصّل كل صورة مكتوبة بما هي وبما تفعله <code>isna()</code> حيالها."
        },
        leftHead: { en: "Written", ar: "الصورة المكتوبة" },
        rightHead: { en: "What it is, and what <code>isna()</code> does", ar: "ما هي، وما تفعله <code>isna()</code>" },
        pairs: [
          {
            l: { code: "np.nan" },
            r: {
              en: "a float that is not a number &mdash; the default hole of a <code>float64</code> column; <code>isna()</code> sees it, and it is the 19 rents, 27 areas and 123 deposits",
              ar: "عددٌ عشري ليس رقمًا &mdash; وهو الثقب الافتراضي لعمود <code>float64</code>؛ و<code>isna()</code> تراه، وهو الإيجارات التسعة عشر والمساحات السبع والعشرون والتأمينات المئة والثلاثة والعشرون"
            }
          },
          {
            l: { code: "None" },
            r: {
              en: "Python's own empty object; <code>isna()</code> sees it, but in a numeric column pandas has already turned it into <code>NaN</code> before you look, so you cannot tell afterwards which one the file held",
              ar: "الكائن الفارغ الخاصّ ببايثون؛ و<code>isna()</code> تراه، لكن pandas في عمود رقمي تكون قد حوّلته إلى <code>NaN</code> قبل أن تنظر، فلا تستطيع بعدها أن تعرف أيّهما كان في الملف"
            }
          },
          {
            l: { code: "NaT" },
            r: {
              en: "&ldquo;not a time&rdquo;, the hole of a <code>datetime64</code> column; <code>isna()</code> sees it, and it is what an unparsed <code>listed_on</code> becomes",
              ar: "«ليس وقتًا»، وهو ثقب عمود <code>datetime64</code>؛ و<code>isna()</code> تراه، وهو ما يصير إليه <code>listed_on</code> غير المحلَّل"
            }
          },
          {
            l: { code: "pd.NA" },
            r: {
              en: "pandas' own type-neutral hole, used by <code>Int64</code>, <code>boolean</code> and <code>string</code>; <code>isna()</code> sees it, and comparing it with itself gives <code>&lt;NA&gt;</code> rather than <code>True</code> or <code>False</code>",
              ar: "ثقب pandas المحايد للنوع، تستعمله <code>Int64</code> و<code>boolean</code> و<code>string</code>؛ و<code>isna()</code> تراه، ومقارنته بنفسه تعطي <code>&lt;NA&gt;</code> لا <code>True</code> ولا <code>False</code>"
            }
          },
          {
            l: { code: "\"\"" },
            r: {
              en: "a value: a string of length zero, so <code>isna()</code> is <strong>blind</strong> to it &mdash; all 214 holes under <code>keep_default_na=False</code>",
              ar: "قيمة: سلسلةٌ طولها صفر، فتكون <code>isna()</code> <strong>عمياء</strong> عنها &mdash; وهي الثقوب الـ214 كلها تحت <code>keep_default_na=False</code>"
            }
          },
          {
            l: { code: "\"n/a\"" },
            r: {
              en: "a value: a human's way of writing &ldquo;I do not know&rdquo;, so <code>isna()</code> is <strong>blind</strong> to it unless you pass <code>na_values=</code> at read time",
              ar: "قيمة: طريقة إنسانٍ في كتابة «لا أعرف»، فتكون <code>isna()</code> <strong>عمياء</strong> عنها إلا أن تمرّر <code>na_values=</code> عند القراءة"
            }
          }
        ],
        hint: {
          en: "Four of the six are holes and two are ordinary values wearing a hole's clothes. Sort that out first, then separate the four by the dtype each one belongs to.",
          ar: "أربعة من الستة ثقوب، واثنان قيمتان عاديتان بثياب ثقب. افصل ذلك أولًا، ثم فرّق بين الأربعة بالنوع الذي ينتمي إليه كلٌّ منها."
        },
        explain: {
          en: "<code>isna()</code> sees exactly four of these six, and every decision later in the lesson starts with <code>isna()</code> &mdash; which is why the two impostors are the whole danger. The difference is that arithmetic works on a sentinel: <code>NaN + 5</code> is <code>NaN</code> and <code>mean()</code> skips it, while a column of rents containing nine zeros has a mean and the mean is wrong and nothing warns you. Two details are worth memorising from the right-hand column: in a <code>float64</code> column <code>None</code> and <code>np.nan</code> are indistinguishable after the read, and <code>pd.NA == pd.NA</code> is <code>&lt;NA&gt;</code>, which is correct and a trap if you put it in an <code>if</code>. And never write <code>s == np.nan</code>: it is all <code>False</code>, raises nothing, and finds no missing value ever.",
          ar: "ترى <code>isna()</code> أربعة من هذه الستة بالضبط، وكل قرار لاحق في الدرس يبدأ بـ<code>isna()</code> &mdash; ولهذا يكون المتنكّران كلَّ الخطر. والفرق أن الحساب يعمل على القيمة النائبة: فـ<code>NaN + 5</code> هي <code>NaN</code> وتتخطّاها <code>mean()</code>، أما عمود إيجارات فيه تسعة أصفار فله متوسط، والمتوسط خاطئ، ولا شيء يحذّرك. وتفصيلان في العمود الأيمن يستحقّان الحفظ: في عمود <code>float64</code> لا يتمايز <code>None</code> و<code>np.nan</code> بعد القراءة، و<code>pd.NA == pd.NA</code> تساوي <code>&lt;NA&gt;</code>، وهذا صحيح وفخٌّ إن وضعتَه في <code>if</code>. ولا تكتب <code>s == np.nan</code> قط: فهي <code>False</code> كلها، ولا ترفع شيئًا، ولا تجد قيمة مفقودة أبدًا."
        }
      },

      /* ---------------------------------------------------------- 04 */
      {
        id: "t2l2q04", type: "output", level: "medium",
        topics: ["t2-missing-per-row", "t2-missing-count"],
        q: {
          en: "Write exactly what the program prints. The file has 503 rows and 13 columns, and 214 of its 6539 cells are blank: 19 rents, 27 areas, 9 floors, 36 conditions and 123 deposits. Think about the <em>rows</em> before you answer.",
          ar: "اكتب بالضبط ما يطبعه البرنامج. في الملف 503 صفوف وثلاثة عشر عمودًا، و214 من خلاياه الـ6539 فارغة: تسعة عشر إيجارًا، وسبع وعشرون مساحة، وتسعة طوابق، وستٌّ وثلاثون حالة، ومئة وثلاثة وعشرون تأمينًا. وفكّر في <em>الصفوف</em> قبل أن تجيب."
        },
        code: code(
          "per_row = raw.isna().sum(axis=1)",
          "print(int((per_row == 0).sum()))",
          "print(int((per_row > 0).sum()))",
          "print(\"%.2f%%\" % (100 * raw.isna().sum().sum() / raw.size))",
          "print(\"%.1f%%\" % (100 * (per_row > 0).mean()))"
        ),
        blanks: [
          { accept: ["329\n174\n3.27%\n34.6%"], lines: 4 }
        ],
        hint: {
          en: "The third line is a share of the <em>cells</em> and the fourth a share of the <em>rows</em>, and they describe the same 214 blanks. Work out the fourth from the first two before you reach for arithmetic on 214.",
          ar: "السطر الثالث نسبةٌ من <em>الخلايا</em> والرابع نسبةٌ من <em>الصفوف</em>، وكلاهما يصف الفراغات الـ214 نفسها. فاستخرج الرابع من الأولين قبل أن تمدّ يدك إلى حسابٍ على 214."
        },
        explain: {
          en: "<code>sum(axis=1)</code> counts along each row instead of each column, and the distribution is 329 rows with no hole, 139 with one, 30 with two and 5 with three &mdash; so 174 rows carry at least one. Three point two seven per cent of the cells and thirty-four point six per cent of the rows describe the same 214 blanks, and the factor of ten between them is the whole arithmetic of <code>dropna()</code>: a hole anywhere in a thirteen-column row condemns the row, so a small share of cells spread thinly over many rows is the worst possible case for row-wise deletion. Had the same 214 holes been concentrated in 17 rows, dropping them would have cost almost nothing. The tempting answer for the last line is 3.27% again, read off the line above.",
          ar: "تعدّ <code>sum(axis=1)</code> على كل صف بدل كل عمود، والتوزيع 329 صفًّا بلا ثقب و139 بثقب واحد و30 باثنين و5 بثلاثة &mdash; فيكون 174 صفًّا فيه ثقب واحد على الأقل. و3.27% من الخلايا و34.6% من الصفوف تصفان الفراغات الـ214 نفسها، ومعامل العشرة بينهما هو كل حساب <code>dropna()</code>: فالثقب في أي موضع من صفٍّ ذي ثلاثة عشر عمودًا يُهلِك الصف، فتكون نسبةٌ صغيرة من الخلايا موزّعةً رقيقًا على صفوف كثيرة أسوأَ حالٍ ممكنة للحذف الصفّي. ولو تكدّست الثقوب الـ214 نفسها في 17 صفًّا لما كلّف حذفها شيئًا تقريبًا. والجواب المغري للسطر الأخير هو 3.27% مرة أخرى، مقروءًا من السطر فوقه."
        }
      },

      /* ---------------------------------------------------------- 05 */
      {
        id: "t2l2q05", type: "output", level: "medium",
        topics: ["t2-missing-cooccurrence"],
        q: {
          en: "Write exactly what the program prints. There are 19 blank rents and 123 blank deposits in the 503 rows, and a deposit on this site is quoted as a multiple of the monthly rent.",
          ar: "اكتب بالضبط ما يطبعه البرنامج. في الصفوف الـ503 تسعة عشر إيجارًا فارغًا ومئة وثلاثة وعشرون تأمينًا فارغًا، والتأمين في هذا الموقع يُقتبس مضاعفًا للإيجار الشهري."
        },
        code: code(
          "r = raw[\"monthly_rent\"].isna()",
          "d = raw[\"deposit\"].isna()",
          "",
          "print(int((r & d).sum()))        # rent blank AND deposit blank",
          "print(int((r & ~d).sum()))       # rent blank, deposit present",
          "print(int((~r & d).sum()))       # rent present, deposit blank",
          "print(int(d.sum()))              # deposit blank in all"
        ),
        blanks: [
          { accept: ["19\n0\n104\n123", "19 0 104 123"], lines: 4 }
        ],
        hint: {
          en: "One of the four numbers is the most interesting number a crosstab can contain, and the sentence about how a deposit is quoted tells you which one it is. The last two lines must agree with the first two.",
          ar: "أحد الأرقام الأربعة هو أكثر رقمٍ يمكن أن يحتويه جدول تقاطع إثارةً، والجملةُ عن كيف يُقتبس التأمين تخبرك أيُّها هو. وعلى السطرين الأخيرين أن يتوافقا مع الأولين."
        },
        explain: {
          en: "The zero is the finding. Not one of the 19 listings without a rent has a deposit &mdash; 19 out of 19, no exceptions &mdash; and a relationship that holds perfectly on 19 rows is almost never a coincidence. Here the explanation is mechanical rather than statistical: a deposit is quoted as a multiple of the rent, so a listing that refuses to publish a rent has nothing to quote a deposit from. So the 123 blank deposits split in two before any statistics: 104 on rows that do have a rent, which are worth a rule, and 19 dragged along by the missing rent, which will leave the table anyway. The tempting answers are a non-zero second line (two independent columns with 3.8% and 24.5% blank would give about one such row) and 142 for the last line, double-counting the 19.",
          ar: "الصفر هو المكتشَف. فلا واحد من الإعلانات التسعة عشر التي لا إيجار لها له تأمين &mdash; تسعة عشر من تسعة عشر بلا استثناء &mdash; وعلاقةٌ تصحّ تمامًا على تسعة عشر صفًّا تكاد لا تكون مصادفة أبدًا. والتفسير هنا ميكانيكيٌّ لا إحصائيّ: فالتأمين يُقتبس مضاعفًا للإيجار، فالإعلان الذي يرفض نشر إيجار لا شيء عنده يقتبس منه تأمينًا. فتنقسم التأمينات الفارغة الـ123 قسمين قبل أي إحصاء: ‏104 على صفوف لها إيجار فعلًا وتستحقّ قاعدة، وتسعة عشر جرّها الإيجارُ المفقود وستخرج من الجدول على أي حال. والجوابان المغريان سطرٌ ثانٍ غير صفري (فعمودان مستقلّان بفراغ 3.8% و24.5% يعطيان نحو صفٍّ واحد من ذلك) و142 للسطر الأخير بعدّ التسعة عشر مرتين."
        }
      },

      /* ---------------------------------------------------------- 06 */
      {
        id: "t2l2q06", type: "order", level: "easy",
        topics: ["t2-missingness-pattern", "t2-missing-per-row"],
        q: {
          en: "Put the five questions in the order the lesson asks them, from the cheapest count to the one that finally names a mechanism. Each question needs the answer to the one before it.",
          ar: "رتّب الأسئلة الخمسة كما يسألها الدرس، من أرخص عدٍّ إلى الذي يسمّي آلية في النهاية. وكل سؤال يحتاج جواب الذي قبله."
        },
        items: [
          {
            en: "<strong>Per column</strong> &mdash; how many cells are blank in each column, as a count and as a share? Five numbers: 19, 27, 9, 36, 123.",
            ar: "<strong>لكل عمود</strong> &mdash; كم خلية فارغة في كل عمود، عدًّا ونسبةً؟ خمسة أرقام: ‏19 و27 و9 و36 و123."
          },
          {
            en: "<strong>Per row</strong> &mdash; how many holes does each row carry, and how many rows are complete? 329 of 503, which is what makes <code>dropna()</code> expensive.",
            ar: "<strong>لكل صف</strong> &mdash; كم ثقبًا يحمل كل صف، وكم صفًّا تامًّا؟ ‏329 من 503، وهذا ما يجعل <code>dropna()</code> مكلفة."
          },
          {
            en: "<strong>Which columns go blank together</strong> &mdash; is a blank rent accompanied by a blank deposit? Nineteen out of nineteen, with no exception.",
            ar: "<strong>أيّ الأعمدة تفرغ معًا</strong> &mdash; هل يصحب الإيجارَ الفارغ تأمينٌ فارغ؟ تسعة عشر من تسعة عشر بلا استثناء."
          },
          {
            en: "<strong>The flag against a column you can see</strong> &mdash; does being blank line up with <code>agency</code>? 103 of the 123 are every row of two agencies.",
            ar: "<strong>العَلَم في مقابل عمودٍ تراه</strong> &mdash; هل يتوافق كونُ الخلية فارغة مع <code>agency</code>؟ ‏103 من الـ123 هي كل صفوف وكالتين."
          },
          {
            en: "<strong>The mechanism</strong> &mdash; given that pattern, is this MCAR, MAR or MNAR, and what would a person have to tell you to settle it?",
            ar: "<strong>الآلية</strong> &mdash; بذلك النمط، هل هذا MCAR أم MAR أم MNAR، وماذا يجب أن يخبرك به إنسانٌ ليحسم الأمر؟"
          }
        ],
        answer: [0, 1, 2, 3, 4],
        hint: {
          en: "Two of the five are plain counts and differ only in the axis they sum along. The last one is not a computation at all.",
          ar: "اثنان من الخمسة عدٌّ محض ولا يختلفان إلا في المحور الذي يُجمع عليه. والأخير ليس حسابًا أصلًا."
        },
        explain: {
          en: "A count is a number; a pattern is a table. The first two questions cost one argument between them &mdash; <code>isna().sum()</code> and <code>isna().sum(axis=1)</code> &mdash; and they already change the decision, because 3.27% of the cells and 34.6% of the rows are the same 214 blanks. The third question asks about a relationship between two columns and is answered by one crosstab. The fourth crosses the blank flag against a column you can see, and it is the one that turns &ldquo;123 blank deposits&rdquo; into &ldquo;103 of them are two agencies with a policy&rdquo;. Only then does the mechanism have any evidence to rest on &mdash; and the fifth step ends outside the file, in a sentence somebody has to tell you, which is why there is no <code>df.missingness_mechanism()</code> and never will be.",
          ar: "العدّ رقمٌ، والنمط جدول. والسؤالان الأولان يكلّفان وسيطًا واحدًا بينهما &mdash; ‏<code>isna().sum()</code> و<code>isna().sum(axis=1)</code> &mdash; وهما يغيّران القرار أصلًا، لأن 3.27% من الخلايا و34.6% من الصفوف هي الفراغات الـ214 نفسها. والسؤال الثالث يسأل عن علاقة بين عمودين ويجيبه جدول تقاطع واحد. والرابع يقطع علمَ الفراغ مع عمودٍ تراه، وهو الذي يحوّل «123 تأمينًا فارغًا» إلى «103 منها وكالتان لهما سياسة». وحينها فقط يكون للآلية دليلٌ تستند إليه &mdash; وتنتهي الخطوة الخامسة خارج الملف، في جملةٍ يجب أن يخبرك بها أحد، ولهذا لا توجد <code>df.missingness_mechanism()</code> ولن توجد."
        }
      },

      /* ---------------------------------------------------------- 07 */
      {
        id: "t2l2q07", type: "contrast", level: "medium",
        topics: ["t2-mcar", "t2-mnar"],
        q: {
          en: "Place each statement under <strong>MCAR</strong>, under <strong>MNAR</strong>, or under both.",
          ar: "ضع كل عبارة تحت <strong>MCAR</strong> أو تحت <strong>MNAR</strong> أو تحت كليهما."
        },
        concepts: [
          { en: "MCAR &mdash; missing completely at random", ar: "‏MCAR &mdash; الفقد العشوائي التامّ" },
          { en: "MNAR &mdash; missing not at random", ar: "‏MNAR &mdash; الفقد غير العشوائي" }
        ],
        rows: [
          {
            s: {
              en: "Being blank depends on nothing at all &mdash; not on the hidden value and not on any other column",
              ar: "كونُ الخلية فارغة لا يتوقف على شيء أصلًا &mdash; لا على القيمة المحجوبة ولا على أي عمود آخر"
            },
            a: 0
          },
          {
            s: {
              en: "Being blank depends on the value that is not there",
              ar: "كونُ الخلية فارغة يتوقف على القيمة التي ليست هناك"
            },
            a: 1
          },
          {
            s: {
              en: "On this file it is the label the lesson gives <code>area_m2</code>, whose 27 blank rows look like the rest on every column we have",
              ar: "في هذا الملف هو الوصف الذي يعطيه الدرس لـ<code>area_m2</code>، إذ تشبه صفوفه الفارغة السبعة والعشرون باقي الصفوف في كل عمود عندنا"
            },
            a: 0
          },
          {
            s: {
              en: "The rows you can see are a fair sample of all the rows, so dropping the blank ones costs precision and nothing else",
              ar: "الصفوف التي تراها عيّنة عادلة من كل الصفوف، فحذف الفارغة يكلّف دقّةً ولا شيء غيرها"
            },
            a: 0
          },
          {
            s: {
              en: "Filling with a central value writes errors that all point the same way, so they add instead of cancelling",
              ar: "التعبئة بقيمة مركزية تكتب أخطاءً تتجه كلها جهةً واحدة، فتتراكم ولا تتقاصّ"
            },
            a: 1
          },
          {
            s: {
              en: "The grounds for it are a sentence that is not in the table: the site prints <em>price on request</em> for premium flats",
              ar: "سنده جملةٌ ليست في الجدول: فالموقع يطبع <em>السعر عند الطلب</em> للشقق المميزة"
            },
            a: 1
          },
          {
            s: {
              en: "No computation on this file can prove it",
              ar: "لا يستطيع حسابٌ على هذا الملف أن يبرهنه"
            },
            a: 2
          }
        ],
        hint: {
          en: "Ask of each row whether it is a claim about the <em>other columns</em> or about the <em>hidden value</em>. One row is about what neither of them can be given by code.",
          ar: "اسأل عن كل سطر هل هو ادّعاء عن <em>الأعمدة الأخرى</em> أم عن <em>القيمة المحجوبة</em>. وسطرٌ واحد عمّا لا يستطيع الكود أن يعطيه لأيٍّ منهما."
        },
        explain: {
          en: "MCAR and MNAR are the two ends of one question: does being blank depend on nothing, or on the very thing you cannot see? The consequences are as far apart as the definitions. Under MCAR the 476 areas you have are an unbiased sample of all 503, so dropping costs precision and filling costs spread. Under MNAR every filled value is wrong in the same direction, which is why 19 random holes cost 58.95 shekels of error and the 19 dearest cost 242.37. The row about proof is the one worth arguing about, and it is &ldquo;both&rdquo;: MCAR can only fail to be disproved, because the test compares the blank rows with the present rows on the columns you <em>have</em>; MNAR can never be established at all, because the claim is about values no amount of code can reach. The difference is that MNAR has a second kind of evidence &mdash; how the file was made &mdash; and MCAR has none.",
          ar: "‏MCAR وMNAR طرفا سؤال واحد: هل يتوقف كونُ الخلية فارغة على لا شيء، أم على الشيء الذي لا تستطيع أن تراه؟ والنتائج متباعدة كالتعريفين. فتحت MCAR تكون المساحات الـ476 التي عندك عيّنة غير متحيّزة من الـ503 كلها، فيكلّف الحذفُ دقّةً وتكلّف التعبئةُ تشتّتًا. وتحت MNAR تكون كل قيمة معبَّأة خاطئة في الاتجاه نفسه، ولهذا تكلّف تسعة عشر ثقبًا عشوائيًّا 58.95 شيكلًا من الخطأ وتكلّف التسعة عشر الأغلى 242.37. والسطرُ عن البرهان هو الذي يستحقّ الجدال، وهو «كلاهما»: فـMCAR لا يمكن إلا أن يُعجَز عن نقضها، لأن الاختبار يقارن الصفوف الفارغة بالحاضرة في الأعمدة التي <em>عندك</em>؛ وMNAR لا يمكن إثباتها أصلًا، لأن الادّعاء عن قيم لا يبلغها كودٌ قطّ. والفرق أن لـMNAR نوعًا ثانيًا من الدليل &mdash; كيف صُنع الملف &mdash; ولا شيء لـMCAR."
        }
      },

      /* ---------------------------------------------------------- 08 */
      {
        id: "t2l2q08", type: "mcq", level: "easy",
        topics: ["t2-mar"],
        q: {
          en: "Which fact about this file is the evidence that <code>deposit</code> is <strong>MAR</strong> &mdash; that whether a deposit is blank depends on a column you can see?",
          ar: "أيُّ واقعةٍ عن هذا الملف هي الدليل على أن <code>deposit</code> فقدُه <strong>MAR</strong> &mdash; أي أن كونَ التأمين فارغًا يتوقف على عمودٍ تراه؟"
        },
        options: [
          {
            en: "<code>deposit</code> is blank in 123 of the 503 rows, 24.5% of the column &mdash; by far the highest share of the five holed columns.",
            ar: "‏<code>deposit</code> فارغ في 123 من الصفوف الـ503، أي 24.5% من العمود &mdash; وهي أعلى نسبة بفارق كبير بين الأعمدة المثقوبة الخمسة."
          },
          {
            en: "The deposit correlates 0.6034 with the monthly rent, so the rent is the column the blank depends on.",
            ar: "التأمين مرتبط بـ0.6034 بالإيجار الشهري، فيكون الإيجار هو العمود الذي يتوقف عليه الفراغ."
          },
          {
            en: "It is blank in all 29 <code>Diwan Rentals</code> rows and all 74 <code>Noor Estates</code> rows, while the other eighteen agencies sit between 0 and 11.1%.",
            ar: "هو فارغ في صفوف <code>Diwan Rentals</code> الـ29 كلها وصفوف <code>Noor Estates</code> الـ74 كلها، بينما تقع الوكالات الثماني عشرة الأخرى بين 0 و11.1%."
          },
          {
            en: "All 19 blank rents also have a blank deposit, so the deposit's blanks depend on the rent column.",
            ar: "الإيجارات الفارغة الـ19 كلها تأمينها فارغ أيضًا، فتتوقف فراغات التأمين على عمود الإيجار."
          }
        ],
        answer: 2,
        hint: {
          en: "MAR means &ldquo;random <em>within</em> the groups of some visible column&rdquo;. Which option names a visible column and shows the blank flag splitting its groups apart?",
          ar: "تعني MAR «عشوائيٌّ <em>داخل</em> مجموعات عمودٍ مرئيّ». فأيّ خيارٍ يسمّي عمودًا مرئيًّا ويُظهر علمَ الفراغ يفرّق مجموعاته؟"
        },
        explain: {
          en: "Two agencies at exactly 100% and eighteen between 0 and 11.1% is not a gradient, it is a step &mdash; and a visible column that splits the rows into &ldquo;always blank&rdquo; and &ldquo;mostly present&rdquo; is the signature of MAR. The 24.5% answer is the tempting one, because that is the number everybody quotes; but a column total is a count and MAR is a claim about a pattern, and 123 would look identical if the blanks were spread at 24% across all twenty agencies. The 0.6034 correlation describes a relationship between the deposit's <em>values</em> and the rent, which is a different claim from where its holes are &mdash; keeping those two apart is the hardest idea in this lesson. The blank-rent answer names a real and useful co-occurrence, but it explains only 19 of the 123, and the column it points at is itself full of holes rather than something you can see.",
          ar: "وكالتان على 100% بالضبط وثماني عشرة بين 0 و11.1% ليس تدرّجًا بل درجة &mdash; وعمودٌ مرئيٌّ يقسم الصفوف إلى «فارغ دائمًا» و«حاضر غالبًا» هو بصمة MAR. وجوابُ 24.5% هو المغري، لأنه الرقم الذي يقتبسه الجميع؛ لكن مجموع العمود عدٌّ وMAR ادّعاءٌ عن نمط، و123 ستبدو هي نفسها لو انتشرت الفراغات بنسبة 24% على الوكالات العشرين كلها. وارتباطُ 0.6034 يصف علاقةً بين <em>قيم</em> التأمين والإيجار، وهذا ادّعاء آخر غير موضع ثقوبه &mdash; والتفريق بين الاثنين أصعب فكرة في هذا الدرس. وجوابُ الإيجارات الفارغة يسمّي تلازمًا حقيقيًّا نافعًا، لكنه لا يفسّر إلا 19 من 123، والعمود الذي يشير إليه مثقوبٌ هو نفسه لا شيئًا تستطيع أن تراه."
        }
      },

      /* ---------------------------------------------------------- 09 */
      {
        id: "t2l2q09", type: "tf", level: "medium",
        topics: ["t2-mechanism-evidence", "t2-mnar"],
        q: {
          en: "The 19 listings with no published rent average 3.58 rooms against 3.04, 81.5&nbsp;m&sup2; against 71.8, are in excellent condition 32% of the time against 15%, and are furnished 42% against 33%. True or false: four measurements all pointing the same way prove that <code>monthly_rent</code> is MNAR on this file.",
          ar: "الإعلانات التسعة عشر التي لا إيجار منشورًا لها متوسطها 3.58 غرفة مقابل 3.04، و81.5&nbsp;م&sup2; مقابل 71.8، وحالتها ممتازة في 32% من الحالات مقابل 15%، ومفروشة 42% مقابل 33%. صح أم خطأ: أربعة قياسات تتجه كلها جهةً واحدة تُثبت أن فقد <code>monthly_rent</code> في هذا الملف MNAR."
        },
        truth: false,
        hint: {
          en: "Read the four numbers again and ask which columns they are measured on. Then read the definition of MAR and check whether that table satisfies it.",
          ar: "اقرأ الأرقام الأربعة مرة أخرى واسأل على أي أعمدة قِيست. ثم اقرأ تعريف MAR وافحص هل يحقّقه ذلك الجدول."
        },
        explain: {
          en: "False &mdash; and the reason is worth more than the answer. The table is the right kind of work and it is the proxy evidence the lesson builds, but notice what it technically shows: the hole depends on <code>rooms</code>, <code>area_m2</code>, <code>condition</code> and <code>furnished</code>, which are columns you <em>can</em> see, and that is the definition of MAR. The same table would appear if agents simply forgot to type rents for large flats. MNAR is a claim about the relationship between the blank flag and values that are <em>not in the file</em>, so no computation on the file can establish it, by construction. Only one piece of evidence distinguishes &ldquo;blank for big flats&rdquo; from &ldquo;blank because the price is high&rdquo;: the sentence that the site prints <em>price on request</em> for premium listings, which you learn by reading the site, asking the scraper's author or looking at the raw HTML. Write down &ldquo;consistent with&rdquo;, not &ldquo;proved&rdquo;.",
          ar: "خطأ &mdash; والسبب أثمن من الجواب. الجدول هو النوع الصحيح من العمل، وهو الدليل البديل الذي يبنيه الدرس، لكن انظر ما يُظهره تقنيًّا: الثقب يتوقف على <code>rooms</code> و<code>area_m2</code> و<code>condition</code> و<code>furnished</code>، وهي أعمدة <em>تستطيع</em> أن تراها، وذلك تعريف MAR. والجدول نفسه كان سيظهر لو نسي الوكلاء كتابة إيجارات الشقق الكبيرة فقط. وMNAR ادّعاءٌ عن العلاقة بين علم الفراغ وقيمٍ <em>ليست في الملف</em>، فلا يستطيع حسابٌ على الملف أن يثبته بحكم البناء. ودليلٌ واحد فقط يفرّق بين «فارغ للشقق الكبيرة» و«فارغ لأن السعر مرتفع»: الجملةُ القائلة إن الموقع يطبع <em>السعر عند الطلب</em> للإعلانات المميزة، وتعرفها بقراءة الموقع أو بسؤال كاتب الكاشط أو بالنظر في HTML الخام. فاكتب «متوافق مع» لا «مُثبَت»."
        }
      },

      /* ---------------------------------------------------------- 10 */
      {
        id: "t2l2q10", type: "multi", level: "medium",
        topics: ["t2-listwise-deletion"],
        q: {
          en: "<code>raw.dropna()</code> on this file. Which of these statements are true? (Choose all that apply.)",
          ar: "‏<code>raw.dropna()</code> على هذا الملف. فأيّ هذه العبارات صحيح؟ (اختر كل ما ينطبق.)"
        },
        code: code(
          "print(\"raw        :\", raw.shape)",
          "print(\"dropna()   :\", raw.dropna().shape)",
          "print(\"agencies   :\", raw[\"agency\"].nunique(), \"->\", raw.dropna()[\"agency\"].nunique())"
        ),
        options: [
          {
            en: "It leaves 329 of the 503 rows, because 174 rows carry at least one blank somewhere in their thirteen columns.",
            ar: "تُبقي 329 من الصفوف الـ503، لأن 174 صفًّا تحمل فراغًا واحدًا على الأقل في مكان من أعمدتها الثلاثة عشر."
          },
          {
            en: "155 of the 174 deleted rows had a rent, so it throws away 155 labelled examples in order to be rid of 19 unlabelled ones.",
            ar: "‏155 من الصفوف الـ174 المحذوفة كان لها إيجار، فهي تُلقي 155 مثالًا مُعلَّمًا للتخلّص من تسعة عشر غير مُعلَّم."
          },
          {
            en: "It deletes every row of <code>Noor Estates</code> and <code>Diwan Rentals</code>, so the surviving table describes the part of the market that publishes a deposit rather than the market.",
            ar: "تحذف كل صفوف <code>Noor Estates</code> و<code>Diwan Rentals</code>، فيصف الجدولُ الباقي الجزء من السوق الذي ينشر تأمينًا لا السوقَ نفسها."
          },
          {
            en: "123 of the deletions were paid to protect <code>deposit</code>, a column that is not the target and may not even be a feature.",
            ar: "دُفع 123 من الحذوفات حمايةً لـ<code>deposit</code>، وهو عمود ليس الهدف وقد لا يكون خاصية أصلًا."
          },
          {
            en: "The 174 deleted rows are a smaller but unbiased sample of the same market, so the only thing lost is precision.",
            ar: "الصفوف الـ174 المحذوفة عيّنة أصغر وغير متحيّزة من السوق نفسها، فالمفقود الوحيد هو الدقّة."
          },
          {
            en: "pandas prints a warning when <code>dropna()</code> removes more than a tenth of the rows, so a loss of this size is hard to miss.",
            ar: "تطبع pandas تحذيرًا حين تحذف <code>dropna()</code> أكثر من عُشر الصفوف، فيكون فقدٌ بهذا الحجم صعبَ الإغفال."
          }
        ],
        answer: [0, 1, 2, 3],
        hint: {
          en: "Four of the six are arithmetic you can do from Concept 2's numbers. The two that are false say something about what the <em>survivors</em> are, and about what pandas tells you.",
          ar: "أربعة من الستة حسابٌ تستطيع إجراءه من أرقام المفهوم 2. والخاطئان يقولان شيئًا عمّا <em>يبقى</em>، وعمّا تخبرك به pandas."
        },
        explain: {
          en: "One method call, a third of the file gone, and the damage is invisible in the result: the surviving 329 rows look immaculate and the shape is the only trace. The two false options are the two comfortable beliefs. &ldquo;Smaller but unbiased&rdquo; is exactly what listwise deletion is not here, because the mechanism that makes a column's holes predictable from <code>agency</code> is the same mechanism that makes deletion delete an <code>agency</code>: every other agency kept 70&ndash;100% of its rows and those two kept 0%, so any median rent or model fitted on the 329 answers a question about a different population. And no warning is printed &mdash; nothing in pandas knows that 123 of the deletions were paid to protect a column you might have dropped instead, for 91 rows and both agencies back.",
          ar: "نداءُ تابعٍ واحد، وثلثُ الملف يذهب، والضرر غير مرئيّ في النتيجة: فالصفوف الـ329 الباقية تبدو ناصعة والشكل هو الأثر الوحيد. والخياران الخاطئان هما الاعتقادان المريحان. فـ«أصغر وغير متحيّزة» هو بالضبط ما ليس عليه الحذفُ الصفّي هنا، لأن الآلية التي تجعل ثقوب العمود متوقَّعة من <code>agency</code> هي الآلية نفسها التي تجعل الحذف يحذف <code>agency</code>: فكل وكالة أخرى أبقت 70&ndash;100% من صفوفها وأبقت هاتان 0%، فأيُّ وسيط إيجار أو نموذج يُضبط على الـ329 يجيب سؤالًا عن مجتمع آخر. ولا يُطبع تحذير &mdash; فلا شيء في pandas يعرف أن 123 من الحذوفات دُفعت حمايةً لعمود كان يمكنك حذفه بدلًا منها، مقابل 91 صفًّا ورجوع الوكالتين."
        }
      },

      /* ---------------------------------------------------------- 11 */
      {
        id: "t2l2q11", type: "mcq", level: "medium",
        topics: ["t2-dropna-options"],
        q: {
          en: "Eight deletion rules, side by side on the same 503 rows. Which reading of the table is correct?",
          ar: "ثماني قواعد حذف جنبًا إلى جنب على الصفوف الـ503 نفسها. فأيُّ قراءةٍ للجدول صحيحة؟"
        },
        code: code(
          "dropna()                                   (329, 13)",
          "dropna(how='all')                          (503, 13)",
          "dropna(subset=['monthly_rent'])            (484, 13)",
          "dropna(subset=['monthly_rent','area_m2'])  (457, 13)",
          "dropna(thresh=11)                          (498, 13)",
          "dropna(thresh=12)                          (468, 13)",
          "dropna(axis=1)                             (503, 8)",
          "drop(columns=['deposit'])                  (503, 12)"
        ),
        lang: "text",
        options: [
          {
            en: "<code>dropna(how='all')</code> removes nothing, because no row of this file is entirely empty &mdash; it is the right tool for a different problem.",
            ar: "‏<code>dropna(how='all')</code> لا تحذف شيئًا، لأن لا صفَّ في هذا الملف فارغٌ تمامًا &mdash; فهي الأداة الصحيحة لمشكلة أخرى."
          },
          {
            en: "<code>dropna(subset=['monthly_rent','area_m2'])</code> costs the same 19 rows as naming the rent alone, because every blank area is on a row that already has a blank rent.",
            ar: "‏<code>dropna(subset=['monthly_rent','area_m2'])</code> تكلّف الصفوف التسعة عشر نفسها كتسمية الإيجار وحده، لأن كل مساحة فارغة على صفٍّ إيجاره فارغ أصلًا."
          },
          {
            en: "<code>dropna(axis=1)</code> is the row-count-preserving option, so it is the safe choice whenever you cannot afford to lose a listing.",
            ar: "‏<code>dropna(axis=1)</code> هي الخيار الذي يحفظ عدد الصفوف، فتكون الاختيار الآمن كلما لم تستطع تحمّل فقد إعلان."
          },
          {
            en: "<code>dropna(thresh=12)</code> is the best of the eight: it keeps 468 rows and 468 rents, so it removed exactly the rows with no rent to learn from.",
            ar: "‏<code>dropna(thresh=12)</code> أفضل الثمانية: فهي تُبقي 468 صفًّا و468 إيجارًا، أي أنها حذفت بالضبط الصفوف التي لا إيجار فيها يُتعلَّم منه."
          }
        ],
        answer: 0,
        hint: {
          en: "Three of the four options each contradict one number in the table. Find that number before you argue about the sentence.",
          ar: "ثلاثة من الخيارات الأربعة يناقض كلٌّ منها رقمًا في الجدول. فابحث عن ذلك الرقم قبل أن تجادل في الجملة."
        },
        explain: {
          en: "<code>how=\"all\"</code> drops a row only when every one of its thirteen columns is blank, and no row of this file is, so it returns 503 &mdash; it is for removing junk rows, not for managing missing data. The <code>thresh=12</code> answer is the tempting one, and the table itself refutes its reasoning: 503&nbsp;&minus;&nbsp;468 is 35 rows, not 19, and the rule catches all 19 blank rents only because each of them also has a blank deposit, so those rows hold 11 of 13 values rather than 12. It deleted the right rows for entirely the wrong reason, and took 15 <code>Noor Estates</code> listings with it. The two-column <code>subset=</code> answer contradicts <code>(457, 13)</code>: adding <code>area_m2</code> costs 27 more rows, and the co-occurrence in this file is rent with deposit, not rent with area. The <code>axis=1</code> answer reads &ldquo;no missing values&rdquo; as the goal: it keeps all 503 rows by throwing away five of thirteen columns, <code>monthly_rent</code> among them &mdash; a table with nothing left to predict.",
          ar: "‏<code>how=\"all\"</code> لا تحذف الصف إلا إذا كان كل عمود من أعمدته الثلاثة عشر فارغًا، ولا صفَّ في هذا الملف كذلك، فتعيد 503 &mdash; فهي لإزالة صفوف النفاية لا لإدارة المفقود. وجوابُ <code>thresh=12</code> هو المغري، والجدول نفسه ينقض استدلاله: فـ503&nbsp;&minus;&nbsp;468 تساوي 35 صفًّا لا تسعة عشر، ولا تلتقط القاعدةُ الإيجارات الفارغة الـ19 كلها إلا لأن لكلٍّ منها تأمينًا فارغًا أيضًا، فيكون في تلك الصفوف 11 قيمة من 13 لا 12. فهي حذفت الصفوف الصحيحة لسببٍ خاطئ تمامًا، وأخذت معها خمسة عشر إعلانًا لـ<code>Noor Estates</code>. وجوابُ <code>subset=</code> ذي العمودين يناقض <code>(457, 13)</code>: فإضافة <code>area_m2</code> تكلّف 27 صفًّا إضافيًّا، والتلازمُ في هذا الملف بين الإيجار والتأمين لا بين الإيجار والمساحة. وجوابُ <code>axis=1</code> يقرأ «لا قيم مفقودة» غايةً: فهو يُبقي الصفوف الـ503 كلها بإلقاء خمسة أعمدة من ثلاثة عشر، ومنها <code>monthly_rent</code> &mdash; أي جدول لا شيء فيه يُتنبَّأ به."
        }
      },

      /* ---------------------------------------------------------- 12 */
      {
        id: "t2l2q12", type: "compare", level: "medium",
        topics: ["t2-never-impute-target", "t2-listwise-deletion"],
        q: {
          en: "The same decision &mdash; what to do about the holes before anything else happens &mdash; written two ways. Which statement is correct?",
          ar: "القرار نفسه &mdash; ماذا تفعل بالثقوب قبل أن يحدث أي شيء آخر &mdash; مكتوبًا بطريقتين. فأيُّ العبارات صحيحة؟"
        },
        codeA: code(
          "out = raw.dropna()",
          "print(\"rows:\", len(raw), \"->\", len(out))",
          "print(\"rents to learn from:\", int(out[\"monthly_rent\"].count()), \"of\", int(raw[\"monthly_rent\"].count()))",
          "print(\"agencies:\", raw[\"agency\"].nunique(), \"->\", out[\"agency\"].nunique())",
          "",
          "# rows: 503 -> 329",
          "# rents to learn from: 329 of 484",
          "# agencies: 20 -> 17"
        ),
        codeB: code(
          "out = raw.dropna(subset=[\"monthly_rent\"])",
          "print(\"rows:\", len(raw), \"->\", len(out))",
          "print(\"rents to learn from:\", int(out[\"monthly_rent\"].count()), \"of\", int(raw[\"monthly_rent\"].count()))",
          "print(\"blanks still in the table:\", out.isna().sum()[lambda s: s > 0].to_dict())",
          "",
          "# rows: 503 -> 484",
          "# rents to learn from: 484 of 484",
          "# blanks still in the table: {'area_m2': 27, 'floor': 9, 'condition': 33, 'deposit': 104}"
        ),
        options: [
          {
            en: "A is better: it is the only one that leaves a table with no missing values at all, which is the goal of the missing-data stage, while B deliberately leaves 173 holes behind.",
            ar: "أ أفضل: فهي الوحيدة التي تترك جدولًا بلا قيم مفقودة أصلًا، وهذه غاية مرحلة المفقود، أما ب فتترك 173 ثقبًا بتعمّد."
          },
          {
            en: "They are equivalent on the question this chapter serves, since both end with a table in which every remaining rent is a number a human typed.",
            ar: "هما متكافئتان في السؤال الذي يخدمه هذا الفصل، فكلتاهما تنتهي إلى جدول كل إيجار باقٍ فيه رقمٌ كتبه إنسان."
          },
          {
            en: "B is better: 19 rows instead of 174, every one of the 484 labelled examples kept, and all 20 agencies still in the table. What B still leaves open: nothing is recorded, so next month &mdash; when the site hides 180 rents instead of 19 &mdash; the same line will delete a third of the file and print nothing.",
            ar: "ب أفضل: تسعة عشر صفًّا بدل 174، وبقاء كل واحد من الأمثلة المعلَّمة الـ484، وبقاء الوكالات العشرين كلها في الجدول. وما يبقى مفتوحًا في ب: لا شيء يُسجَّل، فالشهر القادم &mdash; حين يحجب الموقع 180 إيجارًا بدل 19 &mdash; سيحذف السطر نفسه ثلثَ الملف ولن يطبع شيئًا."
          },
          {
            en: "B is better because <code>subset=</code> imputes the other four columns instead of dropping their rows, which is why 173 blanks become visible in its output.",
            ar: "ب أفضل لأن <code>subset=</code> تعوّض الأعمدة الأربعة الأخرى بدل حذف صفوفها، ولهذا تظهر 173 فراغًا في مخرجها."
          }
        ],
        answer: 2,
        hint: {
          en: "Count what each version loses, then ask what the third printed line of each one is really measuring. One of the four options describes a cost as if it were a benefit, and one invents a behaviour <code>subset=</code> does not have.",
          ar: "عُدّ ما تفقده كل نسخة، ثم اسأل ما الذي يقيسه السطر المطبوع الثالث في كلٍّ منهما فعلًا. وخيارٌ من الأربعة يصف ثمنًا كأنه فائدة، وآخر يختلق سلوكًا ليس لـ<code>subset=</code>."
        },
        explain: {
          en: "The target is the column a model is asked to predict &mdash; here <code>monthly_rent</code> &mdash; and the asymmetry is not a convention: drop the rows whose target is missing, keep the rows whose features are missing. A row with no rent cannot teach a rent predictor anything, because there is no answer to compare a prediction with; a row with a rent and no area still carries eleven other columns. The answer that praises A for leaving no missing values is the tempting one, because &ldquo;no missing values&rdquo; feels like the goal and A really is the version with none left: it is exactly backwards, and A's clean table costs 155 labelled examples and three whole agencies. The answer that credits <code>subset=</code> with imputing the other columns invents a behaviour: <code>subset=</code> restricts the <em>check</em> to the columns you name and imputes nothing; those 173 blanks are cells left in the table on purpose, each one a decision still to be made. B's own gap is the silence, which Version 3 of the lesson closes by returning <code>(frame, log_row)</code>.",
          ar: "الهدف هو العمود الذي يُطلب من النموذج أن يتنبأ به &mdash; هنا <code>monthly_rent</code> &mdash; وعدمُ التناظر ليس عُرفًا: احذف الصفوف التي يغيب هدفها، وأبقِ الصفوف التي تغيب خصائصها. فالصف الذي لا إيجار له لا يعلّم متنبِّئَ إيجارٍ شيئًا، إذ لا جواب يُقارَن به التنبؤ؛ والصف الذي له إيجار ولا مساحة له يحمل أحد عشر عمودًا آخر. والجوابُ الذي يمدح أ لأنها لا تترك قيمًا مفقودة هو المغري، لأن «لا قيم مفقودة» تُشعرك أنها الغاية وأ هي فعلًا النسخة التي لا يبقى فيها شيء: وهو مقلوبٌ تمامًا، وجدولُ أ النظيف يكلّف 155 مثالًا معلَّمًا وثلاث وكالات كاملة. والجوابُ الذي ينسب إلى <code>subset=</code> تعويضَ الأعمدة الأخرى يختلق سلوكًا: فـ<code>subset=</code> تقصر <em>الفحص</em> على الأعمدة التي تسمّيها ولا تعوّض شيئًا؛ وتلك الفراغات الـ173 خلايا تُركت في الجدول عن قصد، كلٌّ منها قرارٌ لم يُتّخذ بعد. وثُلمة ب نفسها هي الصمت، وتسدّها النسخة 3 في الدرس بإعادة <code>(frame, log_row)</code>."
        }
      },

      /* ---------------------------------------------------------- 13 */
      {
        id: "t2l2q13", type: "mcq", level: "easy",
        topics: ["t2-impute-centre"],
        q: {
          en: "Mean, median and mode as fillers on this file. Which statement is correct?",
          ar: "المتوسط والوسيط والمنوال معوِّضات في هذا الملف. فأيُّ العبارات صحيحة؟"
        },
        code: code(
          "area_m2 : 476 values, 27 blank | mean 72.1828 | median 73.45 | mode 63.6",
          "monthly_rent (484 values)      | mean 416.3  | median 200.0",
          "condition (467 values, 36 blank): good 188, fair 144, excellent 79, poor 56"
        ),
        lang: "text",
        options: [
          {
            en: "The mode is the safest of the three for any column, because it is the only one of them that is a value which really occurs in the column.",
            ar: "المنوال أأمن الثلاثة لأي عمود، لأنه الوحيد منها الذي هو قيمةٌ تحدث فعلًا في العمود."
          },
          {
            en: "<code>condition</code> is ordinal, so the mean is the legal choice and the mode is the one to avoid.",
            ar: "‏<code>condition</code> رُتبيّ، فالمتوسط هو الاختيار المشروع والمنوال هو ما يُتجنَّب."
          },
          {
            en: "Mean-imputing <code>monthly_rent</code> is the safer of the two central values for it, because the mean is computed from every value in the column while the median reads only the middle one.",
            ar: "تعويض <code>monthly_rent</code> بالمتوسط أأمن القيمتين المركزيتين له، لأن المتوسط يُحسب من كل قيمة في العمود والوسيط لا يقرأ إلا الوسطى."
          },
          {
            en: "For <code>area_m2</code> the mean and the median are close enough that the choice hardly matters, while its mode is the commonest of 476 near-unique decimals and is nonsense as a fill.",
            ar: "في <code>area_m2</code> يتقارب المتوسط والوسيط إلى حدٍّ لا يكاد الاختيار معه يهمّ، أما منواله فهو أكثر 476 عددًا عشريًّا شبه فريد تكرارًا ولا معنى له معوِّضًا."
          }
        ],
        answer: 3,
        hint: {
          en: "Three rules decide this: median for a skewed numeric column, mean only when it is roughly symmetric, mode only for a category. Check each option against the one rule it is about.",
          ar: "ثلاث قواعد تحسم هذا: الوسيط للعمود الرقمي الملتوي، والمتوسط فقط إذا كان متناظرًا تقريبًا، والمنوال فقط للفئة. فافحص كل خيار في مقابل القاعدة الواحدة التي يتعلق بها."
        },
        explain: {
          en: "72.18 against 73.45 is a gap of about a square metre, because the areas are roughly symmetric, so for <code>area_m2</code> either central value will do &mdash; and 63.6 will not, because it is an accident of rounding rather than a typical flat. The answer that prefers the mean for the rent is the tempting one, and the two numbers beside it refute it: 416.3 against a median of 200.0, so mean-imputing the rent would write a value higher than 95% of the rents in the file. Using every value is a virtue only when no value is extreme. The answer about <code>condition</code> is exactly inverted: the column is ordinal, so the mean of the word <em>excellent</em> does not exist and the mode, <code>good</code>, is the only legal fill &mdash; which is also the one that does the most visible damage, pushing <code>good</code> from 37.4% to 44.5% of the column. And &ldquo;the mode is always safest&rdquo; generalises a property of the mode into a safety claim it cannot support.",
          ar: "‏72.18 مقابل 73.45 فرقٌ نحو متر مربع، لأن المساحات متناظرة تقريبًا، فتكفي أيُّ قيمة مركزية لـ<code>area_m2</code> &mdash; ولا تكفي 63.6، لأنها مصادفةُ تدوير لا شقةٌ نمطية. والجوابُ الذي يفضّل المتوسط للإيجار هو المغري، والرقمان بجانبه ينقضانه: ‏416.3 مقابل وسيط 200.0، فتعويضُ الإيجار بالمتوسط يكتب قيمةً أعلى من 95% من إيجارات الملف. واستعمالُ كل قيمة فضيلةٌ فقط حين لا تكون قيمةٌ متطرفة. والجوابُ عن <code>condition</code> مقلوبٌ تمامًا: فالعمود رُتبيّ، فلا وجود لمتوسط كلمة <em>ممتاز</em>، والمنوال <code>good</code> هو التعويض المشروع الوحيد &mdash; وهو أيضًا الذي يُحدث أظهرَ ضرر، إذ يدفع <code>good</code> من 37.4% إلى 44.5% من العمود. و«المنوال أأمن دائمًا» يعمّم خاصيةً في المنوال إلى ادّعاء أمانٍ لا يسنده."
        }
      },

      /* ---------------------------------------------------------- 14 */
      {
        id: "t2l2q14", type: "tf", level: "easy",
        topics: ["t2-ffill-wrong"],
        q: {
          en: "True or false: <code>ffill()</code> is a defensible fill for <code>area_m2</code> here, because listing 5349 is given 79.4&nbsp;m&sup2; &mdash; the area of listing 5126, which is also in Khan Younis &mdash; so the estimate uses a comparable flat.",
          ar: "صح أم خطأ: <code>ffill()</code> تعويضٌ يمكن الدفاع عنه لـ<code>area_m2</code> هنا، لأن الإعلان 5349 يُعطى 79.4&nbsp;م&sup2; &mdash; مساحة الإعلان 5126 وهو في خان يونس أيضًا &mdash; فيستعمل التقديرُ شقةً مقارنة."
        },
        code: code(
          " listing_id          city  area_m2  ffill",
          "       5126   Khan Younis     79.4   79.4",
          "       5349   Khan Younis      NaN   79.4",
          "       5052          GAZA     43.8   43.8",
          "       5477         RAFAH     53.7   53.7",
          "       5284   Khan Younis      NaN   53.7",
          "       5049          Gaza    103.5  103.5"
        ),
        lang: "text",
        truth: false,
        hint: {
          en: "Read two rows further down the same table. Then ask the one question that decides every <code>ffill</code>: if you sorted the table differently, would the filled values change?",
          ar: "اقرأ سطرين أبعد في الجدول نفسه. ثم اسأل السؤال الواحد الذي يحسم كل <code>ffill</code>: لو رتّبتَ الجدول ترتيبًا آخر، هل تتغير القيم المعبَّأة؟"
        },
        explain: {
          en: "False, and the table you were given contains the refutation. Listing 5284, also in Khan Younis, is given 53.7&nbsp;m&sup2; &mdash; the area of listing 5477, a flat in Rafah. There is no relationship between those two flats at all; the only thing they have in common is that a scraper wrote one line after the other. That 5349 came out plausible is the danger, not the defence: <code>ffill</code> is right for exactly one kind of data, a series whose rows have a meaningful order and in which a value persists until it changes &mdash; a daily temperature, a monthly stock level. These rows are each a different flat. The test is one question: if I sorted this table by <code>listing_id</code>, or by rent, or not at all, would the filled values change? Here the answer is yes, and the 27 filled areas are 27 different numbers each time. Any imputation whose result depends on the row order is not an estimate; it is a coin toss with a straight face.",
          ar: "خطأ، والجدول الذي أُعطيتَه يحمل النقض. فالإعلان 5284، وهو في خان يونس أيضًا، يُعطى 53.7&nbsp;م&sup2; &mdash; مساحة الإعلان 5477، وهو شقة في رفح. ولا علاقة بين الشقتين أصلًا؛ وكل ما يجمعهما أن كاشطًا كتب سطرًا بعد سطر. وخروجُ 5349 معقولًا هو الخطر لا الحجّة: فـ<code>ffill</code> صحيحةٌ لنوعٍ واحد بالضبط من البيانات، متسلسلةٌ لصفوفها ترتيبٌ ذو معنى وتدوم فيها القيمة حتى تتغير &mdash; حرارةٌ يومية، أو مستوى مخزون شهري. وهذه الصفوف كلٌّ منها شقة أخرى. والاختبار سؤالٌ واحد: لو رتّبتُ هذا الجدول بـ<code>listing_id</code>، أو بالإيجار، أو لم أرتّبه، هل تتغير القيم المعبَّأة؟ والجواب هنا نعم، فتكون المساحات المعبَّأة السبع والعشرون سبعةً وعشرين رقمًا مختلفًا كل مرة. وكلُّ تعويضٍ تتوقف نتيجته على ترتيب الصفوف ليس تقديرًا، بل قرعةٌ بوجه جادّ."
        }
      },

      /* ---------------------------------------------------------- 15 */
      {
        id: "t2l2q15", type: "fill", level: "medium",
        topics: ["t2-imputation-variance"],
        q: {
          en: "Fill in the three blanks. The shrinkage mean imputation causes is not a property of your data at all &mdash; it depends only on the share of the column you filled, so you can predict it before you run anything.",
          ar: "املأ الفراغات الثلاثة. التقلّصُ الذي يُحدثه التعويض بالمتوسط ليس خاصيةً في بياناتك أصلًا &mdash; بل يتوقف على نسبة العمود التي عبّأتها وحدها، فتستطيع أن تتوقعه قبل أن تشغّل أي شيء."
        },
        code: code(
          "a    = raw[\"area_m2\"]",
          "n, k = int(a.count()), int(a.isna().sum())        # 476 observed, 27 filled",
          "",
          "filled = a.fillna(a.____1____())                  # the only fill the formula is exact for",
          "ratio  = np.sqrt((n - 1) / (____2____))",
          "",
          "print(\"%.4f -> %.4f\" % (a.std(), filled.std()))   # 20.1745 -> 19.6244",
          "print(\"ratio %.6f | spread lost %s\" % (ratio, \"____3____\"))",
          "#        ratio 0.972736 | spread lost ____3____"
        ),
        blanks: [
          { accept: ["mean"] },
          { accept: ["n + k - 1", "n+k-1"] },
          { accept: ["2.73%", "2.73"] }
        ],
        hint: {
          en: "The variance is a sum of squared distances from the mean over <code>n &minus; 1</code>. Work out what each of the <code>k</code> new values contributes to the numerator, and what happens to the denominator.",
          ar: "التباين مجموعُ مربعات المسافات عن المتوسط مقسومًا على <code>n &minus; 1</code>. فاستخرج ما يساهم به كلٌّ من القيم الجديدة <code>k</code> في البسط، وما يحدث للمقام."
        },
        explain: {
          en: "Fill <code>k</code> holes with the mean itself and every new value contributes <code>(mean &minus; mean)&sup2; = 0</code> to the numerator, while the denominator grows from <code>n &minus; 1</code> to <code>n + k &minus; 1</code>. The numerator is unchanged and the denominator is larger, so the standard deviation falls by exactly <code>sqrt((n&minus;1)/(n+k&minus;1))</code> &mdash; here <code>sqrt(475/502) = 0.972736</code>, which is 2.73% of the spread, and <code>20.1745 &times; 0.972736 = 19.6244</code> to the last decimal. The median is the tempting fill for the first blank, and it is usually the better choice: but a median fill adds values that are <em>not</em> at the mean, so the numerator grows a little as well and the identity is no longer exact. This is the number that tells you how much to care: 2.73% for a column with 5% holes, and 13.11% for <code>deposit</code> with 25% &mdash; which is why a 5% column and a 25% column are different problems.",
          ar: "عبّئ <code>k</code> ثقبًا بالمتوسط نفسه فتساهم كل قيمة جديدة بـ<code>(المتوسط &minus; المتوسط)&sup2; = 0</code> في البسط، وينمو المقام من <code>n &minus; 1</code> إلى <code>n + k &minus; 1</code>. فالبسط لم يتغير والمقام أكبر، فيهبط الانحراف المعياري بمقدار <code>sqrt((n&minus;1)/(n+k&minus;1))</code> بالضبط &mdash; وهو هنا <code>sqrt(475/502) = 0.972736</code>، أي 2.73% من التشتّت، و<code>20.1745 &times; 0.972736 = 19.6244</code> إلى آخر منزلة. والوسيط هو المعوِّض المغري للفراغ الأول، وهو عادةً الاختيار الأفضل: لكن التعويض بالوسيط يضيف قيمًا <em>ليست</em> عند المتوسط، فينمو البسط قليلًا أيضًا ولا تبقى المساواة مضبوطة. وهذا هو الرقم الذي يخبرك قدرَ ما ينبغي أن تهتمّ: ‏2.73% لعمودٍ ثقوبه 5%، و13.11% لـ<code>deposit</code> بـ25% &mdash; ولهذا يكون عمود 5% وعمود 25% مشكلتين مختلفتين."
        }
      },

      /* ---------------------------------------------------------- 16 */
      {
        id: "t2l2q16", type: "complete", level: "hard",
        topics: ["t2-deposit-rule", "t2-group-imputation"],
        q: {
          en: "The experiment hides a quarter of the known deposits on five splits and scores one fill rule against the truth. Complete the <code>guess</code> line so that the program prints the wanted number. <code>d</code> holds the 379 rows that have both a deposit and a rent.",
          ar: "تحجب التجربةُ ربعَ التأمينات المعروفة في خمسة تقسيمات وتُقيّم قاعدةَ تعبئة واحدة في مقابل الحقيقة. أكمل سطر <code>guess</code> ليطبع البرنامج الرقم المطلوب. و<code>d</code> فيها الصفوف الـ379 التي لها تأمين وإيجار معًا."
        },
        code: code(
          "d    = rep.dropna(subset=[\"deposit\", \"monthly_rent\"]).copy()     # 379 rows",
          "errs = []",
          "for seed in range(5):",
          "    hidden = d.sample(frac=0.25, random_state=seed).index        # 95 rows",
          "    seen   = d[\"deposit\"].mask(d.index.isin(hidden))             # pretend these are blank",
          "    truth  = d.loc[hidden, \"deposit\"]",
          "    months = seen / d[\"monthly_rent\"]",
          "    guess  = ____",
          "    errs.append(float((truth - guess[hidden]).abs().mean()))",
          "",
          "print(\"MAE over five splits: %.2f\" % (sum(errs) / 5))",
          "# wanted:  MAE over five splits: 146.00"
        ),
        options: [
          { code: "seen.groupby(d[\"agency\"]).transform(\"median\").fillna(seen.median())" },
          { code: "months.median() * d[\"monthly_rent\"]" },
          { code: "(months.groupby(d[\"agency\"]).transform(\"median\") * d[\"monthly_rent\"])\n             .fillna(months.median() * d[\"monthly_rent\"])" },
          { code: "months.groupby(d[\"agency\"]).transform(\"median\") * d[\"monthly_rent\"]" }
        ],
        answer: 2,
        solution: {
          code: "guess = ((months.groupby(d[\"agency\"]).transform(\"median\") * d[\"monthly_rent\"])\n             .fillna(months.median() * d[\"monthly_rent\"]))",
          out: "MAE over five splits: 146.00",
          en: "The quantity worth learning per agency is the <em>multiple</em> of the rent, not the number of shekels &mdash; and the global multiple is the fallback for an agency with no deposit to learn from.",
          ar: "الكمية التي تستحقّ أن تُتعلَّم لكل وكالة هي <em>مضاعف</em> الإيجار لا عددُ الشواكل &mdash; والمضاعف العامّ هو البديل لوكالةٍ لا تأمين لها يُتعلَّم منه."
        },
        hint: {
          en: "A deposit on this site is one, two or three months' rent, so the parameter worth fitting is a ratio and the shekel figure is computed per row. Two of the four options fit a ratio; what separates them is what happens to an agency the split left with nothing.",
          ar: "التأمين في هذا الموقع إيجارُ شهر أو شهرين أو ثلاثة، فالوسيط الذي يستحقّ الضبط نسبةٌ ويُحسب رقمُ الشواكل لكل صف. واثنان من الخيارات الأربعة يضبطان نسبة؛ والذي يفرّق بينهما ما يحدث لوكالةٍ لم يُبقِ لها التقسيمُ شيئًا."
        },
        explain: {
          en: "All four completions run, and each one is a measured number from the lesson. The per-agency median in shekels gives 164.01, <em>worse</em> than the global median's 156.41, because ten of the eighteen agencies hold fewer than ten deposits and because the agency barely influences the value. The global multiple times the rent gives 148.10, the first rule to beat the global median, since the deposit correlates 0.6034 with the rent against 0.1375 with its own agency's mean. The per-agency multiple <em>without</em> the <code>fillna</code> is the closest trap: an agency whose deposits were all hidden gets <code>NaN</code>, those rows drop out of <code>abs().mean()</code>, and it prints 145.88 &mdash; a <em>better-looking</em> number measured on 92 deposits instead of 95, while in production that cell would simply stay blank. Only the completion that fits the multiple per agency <em>and</em> falls back to the global multiple gives the 146.00 the lesson reports.",
          ar: "الإكمالات الأربعة كلها تعمل، وكلٌّ منها رقمٌ مقيس في الدرس. فوسيطُ كل وكالة بالشواكل يعطي 164.01، وهو <em>أسوأ</em> من وسيط الملف العامّ 156.41، لأن عشرًا من الوكالات الثماني عشرة فيها أقلّ من عشرة تأمينات ولأن الوكالة تكاد لا تؤثر في القيمة. والمضاعفُ العامّ في الإيجار يعطي 148.10، وهو أول قاعدة تتغلّب على الوسيط العامّ، إذ يرتبط التأمين بـ0.6034 بالإيجار مقابل 0.1375 بمتوسط وكالته. ومضاعفُ كل وكالة <em>بلا</em> <code>fillna</code> أقربُ فخّ: فتحصل الوكالةُ التي حُجبت تأميناتها كلها على <code>NaN</code>، فتخرج تلك الصفوف من <code>abs().mean()</code>، فيطبع 145.88 &mdash; رقمًا <em>أحسنَ مظهرًا</em> مقيسًا على 92 تأمينًا بدل 95، وفي الإنتاج تبقى تلك الخلية فارغة وحسب. ولا يعطي الـ146.00 الذي يُبلّغ عنه الدرس إلا الإكمالُ الذي يضبط المضاعفَ لكل وكالة <em>ويرجع</em> إلى المضاعف العامّ."
        }
      },

      /* ---------------------------------------------------------- 17 */
      {
        id: "t2l2q17", type: "compare", level: "medium",
        topics: ["t2-group-imputation", "t2-missing-indicator"],
        q: {
          en: "Two versions of the same area fill. The hide-a-quarter measurement scored a median per <code>city</code>&nbsp;+&nbsp;<code>rooms</code> at 5.39&nbsp;m&sup2; of error per hole and a median per <code>rooms</code> alone at 5.16, on five splits. Which statement is correct?",
          ar: "نسختان من تعبئة المساحة نفسها. قيّس حجبِ الربع أعطى وسيطَ <code>city</code>&nbsp;+&nbsp;<code>rooms</code> خطأً 5.39&nbsp;م&sup2; لكل ثقب، ووسيطَ <code>rooms</code> وحده 5.16، على خمسة تقسيمات. فأيُّ العبارات صحيحة؟"
        },
        codeA: code(
          "fitted = {\"area_by_city_rooms\": train.assign(c=tr_city).groupby([\"c\", \"rooms\"])[\"area_m2\"].median().to_dict(),",
          "          \"area_by_rooms\":      train.groupby(\"rooms\")[\"area_m2\"].median().to_dict(),",
          "          \"area_median\":        float(train[\"area_m2\"].median())}",
          "",
          "grp = pd.Series([fitted[\"area_by_city_rooms\"].get(k) for k in zip(city, rep[\"rooms\"])], index=rep.index)",
          "out = rep.assign(area_m2=rep[\"area_m2\"].fillna(grp)",
          "                                        .fillna(rep[\"rooms\"].map(fitted[\"area_by_rooms\"]))",
          "                                        .fillna(fitted[\"area_median\"]))",
          "",
          "# groups fitted: 48 city+rooms, 7 rooms",
          "# filled from a city+rooms group: 27 of 27 | from rooms alone: 0 | from the global median: 0",
          "# std: observed 20.1745 -> group-filled 20.0215"
        ),
        codeB: code(
          "def fit_area(df):",
          "    return {\"area_by_rooms\": df.groupby(\"rooms\")[\"area_m2\"].median().to_dict(),",
          "            \"area_median\":   float(df[\"area_m2\"].median())}",
          "",
          "def impute_area(d, fitted):",
          "    n = int(d[\"area_m2\"].isna().sum())",
          "    guess = d[\"rooms\"].map(fitted[\"area_by_rooms\"]).fillna(fitted[\"area_median\"])",
          "    unseen = int((d[\"area_m2\"].isna() & ~d[\"rooms\"].isin(fitted[\"area_by_rooms\"])).sum())",
          "    out = d.assign(area_m2_missing=d[\"area_m2\"].isna(),      # FLAG FIRST",
          "                   area_m2=d[\"area_m2\"].fillna(guess))",
          "    return out, {\"step\": \"impute_area\", \"rows_in\": len(d), \"rows_out\": len(out), \"cells_changed\": n,",
          "                 \"note\": \"median per rooms; %d of %d fell back\" % (unseen, n)}",
          "",
          "# impute_area area_m2  483  483  27  median per rooms; 0 of 27 fell back",
          "# flag set on 27 rows; mean rent where it is set 233.5, where it is not 208.8"
        ),
        options: [
          {
            en: "A is better: 48 groups are finer than 7, every one of the 27 holes was filled from a city-and-rooms group, and its filled column keeps more of the spread (20.0215 against the observed 20.1745).",
            ar: "أ أفضل: ‏48 مجموعة أدقّ من 7، وقد عُبِّئ كل واحد من الثقوب السبعة والعشرين من مجموعة مدينة وغرف، ويحفظ عمودها المعبَّأ تشتّتًا أكثر (‏20.0215 مقابل 20.1745 المرصودة)."
          },
          {
            en: "B is better: it drops <code>city</code> because the measurement said 48 groups over 377 training rows memorise flats rather than learn a market, and it writes the flag before the fill and reports what it did in a log row. What B still leaves open: the log records what happened without the mechanism that justified it.",
            ar: "ب أفضل: فهي تُسقط <code>city</code> لأن القياس قال إن 48 مجموعة على 377 صفًّا من التدريب تحفظ شققًا ولا تتعلّم سوقًا، وهي تكتب العَلَم قبل التعبئة وتُبلّغ بما فعلته في سطر سجل. وما يبقى مفتوحًا في ب: السجلّ يسجّل ما حدث دون الآلية التي بَرَّرَته."
          },
          {
            en: "They are equivalent: both fill all 27 holes with no <code>NaN</code> left, and the fallback chain in A never fires, so the extra grouping column costs nothing.",
            ar: "هما متكافئتان: فكلتاهما تعبّئ الثقوب السبعة والعشرين كلها بلا <code>NaN</code> باقٍ، وسلسلةُ البديل في أ لا تُستدعى قطّ، فلا يكلّف عمودُ التجميع الزائد شيئًا."
          },
          {
            en: "B is better because a flag can only be computed by a function that returns <code>(frame, log_row)</code>, and because <code>map</code> on a dictionary is faster than a <code>groupby</code> lookup.",
            ar: "ب أفضل لأن العَلَم لا يمكن حسابه إلا بدالةٍ تعيد <code>(frame, log_row)</code>، ولأن <code>map</code> على قاموس أسرع من استعلام <code>groupby</code>."
          }
        ],
        answer: 1,
        hint: {
          en: "Count the groups against the training rows that have to support them, and remember which of the two groupings actually won the measurement. One option is right about B and gives two reasons that are both false.",
          ar: "عُدّ المجموعات في مقابل صفوف التدريب التي يجب أن تسندها، وتذكّر أيُّ التجميعين فاز بالقياس فعلًا. وخيارٌ صائبٌ في ب ويعطي سببين كلاهما باطل."
        },
        explain: {
          en: "Finer is not better. 48 city-and-rooms groups over 377 training rows means some groups hold two flats, and a median of two flats is a memorised flat &mdash; the same bias-variance story as Lesson 1's 26 city spellings, and the reason rooms alone scored 5.16 against 5.39 in four of the five splits. The answer that prefers A for its 48 finer groups is the tempting one, because every number it quotes is real: it mistakes a better fit on the rows you have for a better rule, which is exactly what a held-out measurement exists to prevent. The &ldquo;equivalent&rdquo; answer treats a fallback chain that never fires as decoration: it is insurance for the combination the training rows did not contain, and it is what stops this step producing <code>NaN</code> on next month's file. And the answer that picks B for the <code>(frame, log_row)</code> shape and for <code>map</code> being fast reaches the right verdict from two false reasons &mdash; a flag is one line of <code>assign</code> and needs no particular function shape, and speed is never the argument. B's own gap is the log: it says what happened and not why, which is Concept 7.",
          ar: "الأدقّ ليس الأفضل. فـ48 مجموعةَ مدينةٍ وغرف على 377 صفًّا من التدريب تعني أن بعض المجموعات فيها شقتان، ووسيطُ شقتين شقةٌ محفوظة &mdash; وهي حكاية التحيّز والتشتّت نفسها في صور المدن الستّ والعشرين في الدرس 1، وهي سبب تسجيل الغرف وحدها 5.16 مقابل 5.39 في أربعة من التقسيمات الخمسة. والجوابُ الذي يفضّل أ لمجموعاتها الثماني والأربعين الأدقّ هو المغري، لأن كل رقم يقتبسه حقيقيّ: فهو يخلط مواءمةً أفضل على الصفوف التي عندك بقاعدةٍ أفضل، وهذا بالضبط ما لأجله يوجد القياس على صفوف محجوزة. وجوابُ «متكافئتان» يعدّ سلسلةَ بديلٍ لا تُستدعى زينةً: فهي تأمينٌ للتركيبة التي لم تحتوها صفوف التدريب، وهي ما يمنع هذه الخطوة من إنتاج <code>NaN</code> على ملف الشهر القادم. والجوابُ الذي يختار ب لشكل <code>(frame, log_row)</code> ولأن <code>map</code> سريعة يبلغ الحكمَ الصحيح من سببين باطلين &mdash; فالعَلَم سطرُ <code>assign</code> واحد ولا يحتاج شكلَ دالةٍ معيّنًا، والسرعة ليست الحجّة قطّ. وثُلمةُ ب نفسها هي السجل: يقول ما حدث ولا يقول لماذا، وذاك المفهوم 7."
        }
      },

      /* ---------------------------------------------------------- 18 */
      {
        id: "t2l2q18", type: "mcq", level: "hard",
        topics: ["t2-mar", "t2-deposit-rule"],
        q: {
          en: "A colleague reads Concept 3 and writes: &ldquo;<code>deposit</code> is MAR by <code>agency</code>, therefore the agency median is the right fill.&rdquo; The measurement says a per-agency median scores 164.01 over five splits and a global median 156.41. Where exactly does the inference break?",
          ar: "يقرأ زميلٌ المفهوم 3 فيكتب: «فقدُ <code>deposit</code> هو MAR بحسب <code>agency</code>، فيكون وسيطُ الوكالة هو التعويض الصحيح». ويقول القياس إن وسيط كل وكالة يسجّل 164.01 على خمسة تقسيمات والوسيطَ العامّ 156.41. فأين ينكسر الاستدلال بالضبط؟"
        },
        options: [
          {
            en: "The diagnosis was wrong: the measurement shows <code>deposit</code> is not MAR by <code>agency</code> after all, so the rule had nothing to stand on.",
            ar: "التشخيص كان خاطئًا: فالقياس يُظهر أن فقد <code>deposit</code> ليس MAR بحسب <code>agency</code> بعد كل شيء، فلم يكن للقاعدة ما تستند إليه."
          },
          {
            en: "MAR says the agency predicts <em>whether</em> the cell is blank; it never said the agency predicts <em>what</em> the number is. The deposit correlates 0.6034 with the rent and 0.1375 with its own agency's mean, and within-agency spread is 201.8 against 206.5 for the whole file.",
            ar: "تقول MAR إن الوكالة تتنبأ بـ<em>هل</em> الخليةُ فارغة؛ ولم تقل قطّ إن الوكالة تتنبأ بـ<em>ما</em> هو الرقم. فالتأمين مرتبط بـ0.6034 بالإيجار وبـ0.1375 بمتوسط وكالته، والتشتّت داخل الوكالة 201.8 مقابل 206.5 للملف كله."
          },
          {
            en: "The inference is sound and only the sample let it down: ten of the eighteen agencies hold fewer than ten deposits, so with more listings per agency the agency median would win.",
            ar: "الاستدلال سليم ولم تخذله إلا العيّنة: فعشرٌ من الوكالات الثماني عشرة فيها أقلّ من عشرة تأمينات، فبإعلانات أكثر لكل وكالة يفوز وسيطُ الوكالة."
          },
          {
            en: "Group imputation is always worse than global imputation when the groups are unbalanced, and 29 rows against 94 is as unbalanced as this file gets.",
            ar: "التعويض بالمجموعات أسوأ دائمًا من التعويض العامّ حين تكون المجموعات غير متوازنة، و29 صفًّا مقابل 94 أقصى ما يبلغه عدمُ التوازن في هذا الملف."
          }
        ],
        answer: 1,
        hint: {
          en: "The diagnosis and the fill rule are two claims about two different things. Decide which of them the 164.01 actually tested, and look up what the deposit on this site is quoted from.",
          ar: "التشخيصُ وقاعدةُ التعبئة ادّعاءان عن شيئين مختلفين. فاحسم أيَّهما اختبر الـ164.01 فعلًا، وانظر عمّا يُقتبس منه التأمين في هذا الموقع."
        },
        explain: {
          en: "&ldquo;74 of 74 <code>Noor Estates</code> rows are blank&rdquo; remains a fact about the file whatever any imputation measurement says, so the answer that calls the diagnosis wrong is the one to rule out first: a measurement of a fill cannot refute a diagnosis of a hole. Two separate things sank the agency median, and the appendix separates them: the groups are too small, and &mdash; worse &mdash; the agency barely influences the value, since the deposits inside Al-Quds Realty vary by 201.8 shekels against 206.5 across the whole file, so grouping removes about 2% of the spread. The answer that blames only the sample size is the tempting one, because small groups really are one of the two defects; but more listings per agency would only sharpen an estimate of a number the agency does not determine. The answer that bans group imputation for unbalanced groups overgeneralises a single result into a rule, and the same lesson refutes it: grouping won decisively on <code>area_m2</code>, 5.16&nbsp;m&sup2; against 15.10. The fix was to keep the agency and change what it predicts &mdash; the multiple of the rent &mdash; which brought the error to 146.00.",
          ar: "«‏74 من 74 صفًّا لـ<code>Noor Estates</code> فارغة» تبقى واقعةً عن الملف أيًّا كان ما يقوله قياسُ تعويض، فيكون الجوابُ الذي يسمّي التشخيصَ خاطئًا أولَ ما يُستبعد: فقياسُ تعبئةٍ لا ينقض تشخيصَ ثقب. وشيئان منفصلان أغرقا وسيطَ الوكالة، ويفصل الملحق بينهما: المجموعات أصغر من اللازم، و&mdash; وهذا أسوأ &mdash; الوكالةُ تكاد لا تؤثر في القيمة، إذ تتباين تأمينات Al-Quds Realty داخليًّا بـ201.8 شيكل مقابل 206.5 في الملف كله، فيُزيل التجميعُ نحو 2% من التشتّت. والجوابُ الذي يلوم حجمَ العيّنة وحده هو المغري، لأن صغر المجموعات أحد العيبين فعلًا؛ لكن إعلانات أكثر لكل وكالة لا تزيد إلا حدَّ تقديرٍ لرقمٍ لا تحدّده الوكالة. والجوابُ الذي يمنع التعويضَ بالمجموعات عند عدم التوازن يعمّم نتيجةً واحدة إلى قاعدة، والدرس نفسه ينقضه: فالتجميعُ فاز فوزًا حاسمًا في <code>area_m2</code>، ‏5.16&nbsp;م&sup2; مقابل 15.10. وكان العلاجُ إبقاءَ الوكالة وتغييرَ ما تتنبأ به &mdash; مضاعفَ الإيجار &mdash; فبلغ الخطأ 146.00."
        }
      },

      /* ---------------------------------------------------------- 19 */
      {
        id: "t2l2q19", type: "trace", level: "hard",
        topics: ["t2-impute-mnar-cost"],
        q: {
          en: "The 19 hidden rents cannot be measured, so the mechanism is rebuilt on rows where the answer is known: hide the 19 dearest of the 483 published rents, which is what &ldquo;price on request&rdquo; does, and fill them with the median of what is left. After the last line has run, what are the values of the four variables?",
          ar: "لا يمكن قياس الإيجارات التسعة عشر المحجوبة، فتُبنى الآلية من جديد على صفوفٍ جوابها معروف: احجب أغلى تسعة عشر إيجارًا من الإيجارات المنشورة الـ483، وهو ما يفعله «السعر عند الطلب»، وعبّئها بوسيط ما بقي. فبعد تنفيذ السطر الأخير، ما قيم المتغيرات الأربعة؟"
        },
        code: code(
          "obs   = rep.dropna(subset=[\"monthly_rent\"])        # 483 rows that have a rent",
          "truth = obs[\"monthly_rent\"]",
          "",
          "top   = truth.nlargest(19)                         # the 19 dearest: 580 down to 375",
          "seen  = truth.drop(top.index)                      # the 464 the scraper would publish",
          "",
          "fill  = seen.median()",
          "dear  = round(top.mean(), 4)",
          "err   = round((top - fill).abs().mean(), 4)",
          "below = int((top < fill).sum())"
        ),
        blanks: [
          { accept: ["195.0", "195"], label: { en: "fill", ar: "fill" } },
          { accept: ["437.3684"], label: { en: "dear", ar: "dear" } },
          { accept: ["242.3684"], label: { en: "err", ar: "err" } },
          { accept: ["0"], label: { en: "below", ar: "below" } }
        ],
        hint: {
          en: "Work out <code>below</code> first &mdash; it follows from the definition of <code>top</code> alone. Then ask what the absolute value in <code>err</code> can still do once you know that number.",
          ar: "استخرج <code>below</code> أولًا &mdash; فهو يُستنتج من تعريف <code>top</code> وحده. ثم اسأل ماذا تستطيع القيمة المطلقة في <code>err</code> أن تفعله بعد أن تعرف ذلك الرقم."
        },
        explain: {
          en: "<code>below</code> is 0, by construction: every one of the 19 dearest rents is above the median of the 464 that remain. Once nothing is below the fill the absolute value does nothing at all, so <code>mean(|x &minus; c|)</code> collapses to <code>mean(x) &minus; c</code>, and the error is pure subtraction: <code>437.3684 &minus; 195.0 = 242.3684</code>. Compare the same experiment with 19 rents hidden at random: the fill is 200.0, twelve of the nineteen misses point downwards and seven upwards, and the error is 58.95 &mdash; four times smaller, because the misses cancel. That is the whole difference between a bias and noise. The tempting answer for <code>fill</code> is 200.0, the median of the published column, and the five-shekel drop to 195.0 is real but explains none of the 183-shekel gap; the direction of the misses explains all of it. Under MCAR the error shrinks as you collect more rows. Under MNAR it does not shrink at all: ten thousand listings with &ldquo;price on request&rdquo; on the dear ones give the same 242-shekel lie on every one.",
          ar: "‏<code>below</code> يساوي 0 بحكم البناء: فكلُّ واحد من أغلى تسعة عشر إيجارًا أعلى من وسيط الأربعمئة والأربعة والستين الباقية. ومتى لم يكن شيء تحت التعبئة لم تفعل القيمةُ المطلقة شيئًا أصلًا، فتنهار <code>mean(|x &minus; c|)</code> إلى <code>mean(x) &minus; c</code>، ويكون الخطأ طرحًا محضًا: <code>437.3684 &minus; 195.0 = 242.3684</code>. وقارن التجربة نفسها بحجب تسعة عشر إيجارًا عشوائيًّا: التعبئةُ 200.0، واثنا عشر من الأخطاء التسعة عشر تتجه إلى أسفل وسبعة إلى أعلى، والخطأ 58.95 &mdash; أصغر أربع مرات، لأن الأخطاء تتقاصّ. وهذا كلُّ الفرق بين التحيّز والضجيج. والجواب المغري لـ<code>fill</code> هو 200.0، وسيطُ العمود المنشور، وهبوطُ الخمسة شواكل إلى 195.0 حقيقيٌّ ولا يفسّر شيئًا من فجوة الـ183 شيكلًا؛ واتجاهُ الأخطاء يفسّرها كلها. فتحت MCAR يتقلّص الخطأ كلما جمعتَ صفوفًا أكثر. وتحت MNAR لا يتقلّص أصلًا: فعشرة آلاف إعلان بـ«السعر عند الطلب» على الغالية تعطي الكذبةَ نفسها بمقدار 242 شيكلًا على كل واحد."
        }
      },

      /* ---------------------------------------------------------- 20 */
      {
        id: "t2l2q20", type: "error", level: "easy",
        topics: ["t2-missing-indicator"],
        q: {
          en: "The step should fill the 27 blank areas and leave behind a column saying which rows were invented. The log row is right and the new column is wrong, and nothing raises. Click the offending line.",
          ar: "ينبغي للخطوة أن تعبّئ المساحات الفارغة السبع والعشرين وتترك عمودًا يقول أيُّ الصفوف اختُرعت. وسطر السجل صحيح والعمود الجديد خاطئ، ولا شيء يرفع خطأً. انقر السطر المخطئ."
        },
        code: code(
          "def impute_area(d, fitted):",
          "    n   = int(d[\"area_m2\"].isna().sum())",
          "    out = d.assign(area_m2=d[\"area_m2\"].fillna(fitted[\"area_median\"]))",
          "    out = out.assign(area_m2_missing=out[\"area_m2\"].isna())",
          "    return out, {\"step\": \"impute_area\", \"cells_changed\": n}",
          "",
          "out, row = impute_area(rep.dropna(subset=[\"monthly_rent\"]), {\"area_median\": 73.45})",
          "print(row[\"cells_changed\"], int(out[\"area_m2_missing\"].sum()))     # 27 0"
        ),
        answer: 4,
        solution: {
          code: code(
            "def impute_area(d, fitted):",
            "    n   = int(d[\"area_m2\"].isna().sum())",
            "    out = d.assign(area_m2_missing=d[\"area_m2\"].isna(),          # FLAG FIRST, from the original column",
            "                   area_m2=d[\"area_m2\"].fillna(fitted[\"area_median\"]))",
            "    return out, {\"step\": \"impute_area\", \"cells_changed\": n}"
          ),
          out: "27 27",
          en: "One <code>assign</code> with the flag first. Inside a single <code>assign</code> both arguments are evaluated against the frame as it was on entry, so the flag sees the original column however the two are ordered &mdash; split it across two statements and the order becomes load-bearing.",
          ar: "‏<code>assign</code> واحدة والعَلَم أولًا. وداخل <code>assign</code> واحدة يُقيَّم الوسيطان في مقابل الجدول كما كان عند الدخول، فيرى العَلَمُ العمودَ الأصلي أيًّا كان ترتيبهما &mdash; وافصلهما إلى عبارتين فيصير الترتيب حاملًا للمعنى."
        },
        hint: {
          en: "The two printed numbers disagree, so one of them was computed from a frame the other had already changed. Which line reads a column <em>after</em> something was written into it?",
          ar: "الرقمان المطبوعان لا يتوافقان، فأحدهما حُسب من جدولٍ كان الآخر قد غيّره. فأيُّ سطرٍ يقرأ عمودًا <em>بعد</em> أن كُتب فيه شيء؟"
        },
        explain: {
          en: "Line 4 computes the flag from <code>out</code>, whose <code>area_m2</code> has no holes left, so it is <code>False</code> on all 483 rows: a syntactically perfect column of zeros that a model will happily accept as a feature with no variance. This is the most ordinary mistake in the lesson, and the log row is what exposes it &mdash; <code>cells_changed</code> was taken from <code>d</code> on line 2, before anything was written, so it still says 27 and the two numbers disagree. Line 3 is the tempting click, because it is the line that fills the holes; filling is what the step is for, and the fill itself is correct. The fix is to write the flag before the fill, which inside one <code>assign</code> means passing both in the same call: the arguments are evaluated against the frame as it was on entry, so the flag reads the original column. Compute it in a second statement and you get a valid column, no error, and no information.",
          ar: "يحسب السطر 4 العَلَمَ من <code>out</code>، التي لم يبقَ في <code>area_m2</code> فيها ثقب، فيكون <code>False</code> على الصفوف الـ483 كلها: عمود أصفارٍ سليمٌ نحويًّا يقبله النموذج راضيًا خاصيةً بلا تباين. وهذا أعتى خطأٍ عاديّ في الدرس، وسطرُ السجل هو ما يفضحه &mdash; فقد أُخذ <code>cells_changed</code> من <code>d</code> في السطر 2، قبل أن يُكتب شيء، فبقي يقول 27 ولم يتوافق الرقمان. والسطر 3 هو النقرة المغرية، لأنه السطر الذي يعبّئ الثقوب؛ والتعبئةُ هي ما لأجله الخطوةُ، والتعبئةُ نفسها صحيحة. والعلاج أن يُكتب العَلَم قبل التعبئة، وهذا داخل <code>assign</code> واحدة يعني تمريرهما في النداء نفسه: فتُقيَّم الوسائطُ في مقابل الجدول كما كان عند الدخول، فيقرأ العَلَمُ العمودَ الأصلي. واحسبه في عبارةٍ ثانية فتحصل على عمود صالح وبلا خطأ وبلا معلومة."
        }
      },

      /* ---------------------------------------------------------- 21 */
      {
        id: "t2l2q21", type: "multi", level: "hard",
        topics: ["t2-indicator-cost", "t2-indicator-leak"],
        q: {
          en: "Four missing indicators, each added to the per-governorate baseline one at a time and scored on rows nobody fitted. Which of these conclusions does the measurement support? (Choose all that apply.)",
          ar: "أربعةُ أعلام فقد، أُضيف كلٌّ منها إلى الخط القاعدي لكل محافظة مرة واحدة وقُيّم على صفوف لم يُضبط عليها أحد. فأيّ هذه الاستنتاجات يسنده القياس؟ (اختر كل ما ينطبق.)"
        },
        code: code(
          "per governorate alone            : held-out MAE 56.4167",
          "  + area_m2_missing    : held-out MAE 56.1667   (flagged: 21 train, 6 held out)",
          "  + condition_missing  : held-out MAE 57.6250   (flagged: 26 train, 10 held out)",
          "  + floor_missing      : held-out MAE 57.4792   (flagged: 6 train, 3 held out)",
          "  + deposit_missing    : held-out MAE 59.1250   (flagged: 81 train, 42 held out)"
        ),
        lang: "text",
        options: [
          {
            en: "<code>area_m2_missing</code> is the only one of the four that improves the prediction, and it improves it by a quarter of a shekel &mdash; a real signal on 21 rows of 377, with not enough of it to move an average over 120 held-out listings.",
            ar: "‏<code>area_m2_missing</code> هو الوحيد من الأربعة الذي يحسّن التنبؤ، ويحسّنه بربع شيكل &mdash; إشارةٌ حقيقية على 21 صفًّا من 377، وليس منها ما يكفي لتحريك متوسط على 120 إعلانًا محجوزًا."
          },
          {
            en: "<code>deposit_missing</code> is the worst of the four, and too few flagged rows is not the reason: it is flagged on 81 training rows and the problem is that a blank deposit is almost the statement &ldquo;this listing belongs to <code>Noor Estates</code> or <code>Diwan Rentals</code>&rdquo;, which the <code>agency</code> column already carries.",
            ar: "‏<code>deposit_missing</code> أسوأ الأربعة، وقلّةُ الصفوف المعلَّمة ليست السبب: فهو معلَّم على 81 صفًّا من التدريب، والمشكلة أن التأمينَ الفارغ يكاد يكون عبارةَ «هذا الإعلان لـ<code>Noor Estates</code> أو <code>Diwan Rentals</code>»، وهي واقعةٌ يحملها عمود <code>agency</code> أصلًا."
          },
          {
            en: "<code>floor_missing</code> fails for a different reason: six flagged training rows split across five governorates means some cells of the table are fitted on one listing, and 57.48 is what memorisation costs.",
            ar: "‏<code>floor_missing</code> يفشل لسبب آخر: فستّةُ صفوف معلَّمة في التدريب موزّعة على خمس محافظات تعني أن بعض خلايا الجدول مضبوطة على إعلان واحد، و57.48 هو ثمن الحفظ."
          },
          {
            en: "A flag that does not improve the held-out error should be left out of the table altogether, since a column that costs a parameter and buys no accuracy has no other job.",
            ar: "العَلَمُ الذي لا يحسّن الخطأ المحجوز ينبغي أن يُستبعد من الجدول جملةً، فالعمودُ الذي يكلّف وسيطًا ولا يشتري دقّةً لا وظيفةَ أخرى له."
          },
          {
            en: "A flag for <code>monthly_rent</code> would be constant on every row the model can be trained or scored on, and informative on exactly the rows you need a prediction for &mdash; a feature that cannot be validated.",
            ar: "عَلَمٌ لـ<code>monthly_rent</code> سيكون ثابتًا على كل صفٍّ يمكن تدريبُ النموذج أو تقييمُه عليه، ومُفيدًا بالضبط على الصفوف التي تحتاج تنبؤًا لها &mdash; أي خاصيةٌ لا يمكن التحقّق منها."
          },
          {
            en: "Because <code>condition_missing</code> made the error worse at 57.6250, the 36 blank conditions should be left blank rather than imputed.",
            ar: "لأن <code>condition_missing</code> زاد الخطأ سوءًا عند 57.6250، ينبغي أن تُترك الحالاتُ الفارغة الستُّ والثلاثون فارغةً لا أن تُعوَّض."
          }
        ],
        answer: [0, 1, 2, 4],
        hint: {
          en: "Read the flagged counts beside the errors: they refute one explanation that sounds obvious. Two of the six options draw a conclusion about something the table does not measure at all.",
          ar: "اقرأ أعداد الصفوف المعلَّمة بجانب الأخطاء: فهي تنقض تفسيرًا يبدو بيّنًا. وخيارانِ من الستة يستنتجان شيئًا عمّا لا يقيسه الجدول أصلًا."
        },
        explain: {
          en: "One of the four flags helps and three make the prediction worse, and the three fail for three nameable reasons &mdash; which is more useful than an enthusiastic rule. The counts are what settle it: 81 flagged training rows for <code>deposit_missing</code> against 21 for <code>area_m2_missing</code>, so the count is not what separates them; duplication is. The statement that a useless flag should be left out of the table altogether is the tempting one, because it follows from accuracy alone: the lesson's rule is to keep such a flag <em>out of the feature set</em> and still <em>write it into the table</em>, because its other job &mdash; telling a human which cells were invented &mdash; costs nothing and is worth a great deal when somebody asks in October where a number came from. The statement about leaving <code>condition</code> blank draws a decision about the fill from a measurement of the flag: the decision table still imputes <code>condition</code> with the mode and flags it, and the two choices are separate. So the rule is neither &ldquo;always add an indicator&rdquo; nor &ldquo;never&rdquo;: add one to the features when the column has enough blanks to carry weight, the blank is not already implied by a column you keep, and you have measured that it helps.",
          ar: "واحدٌ من الأعلام الأربعة يُفيد وثلاثة تزيد التنبؤ سوءًا، والثلاثة تفشل لثلاثة أسباب تُسمّى &mdash; وهذا أنفع من قاعدةٍ متحمّسة. والأعدادُ هي ما يحسم: ‏81 صفًّا معلَّمًا في التدريب لـ<code>deposit_missing</code> مقابل 21 لـ<code>area_m2_missing</code>، فالعددُ ليس ما يفرّق بينهما، بل التكرار. والعبارةُ التي تقول إن العَلَم غير المفيد يُستبعد من الجدول جملةً هي المغرية، لأنها تُستنتج من الدقّة وحدها: وقاعدةُ الدرس أن يُبقى مثلُ هذا العَلَم <em>خارج مجموعة الخصائص</em> وأن <em>يُكتب في الجدول</em> مع ذلك، لأن وظيفته الأخرى &mdash; إخبار إنسانٍ أيُّ الخلايا اختُرعت &mdash; لا تكلّف شيئًا وتساوي كثيرًا حين يسأل أحدهم في تشرين الأول من أين جاء رقم. والعبارةُ عن ترك <code>condition</code> فارغةً تستنتج قرارًا في التعبئة من قياسٍ للعَلَم: فجدولُ القرارات يعوّض <code>condition</code> بالمنوال ويعلّمها، والاختيارانِ منفصلان. فالقاعدةُ ليست «أضف عَلَمًا دائمًا» ولا «لا تضف قطّ»: أضفه إلى الخصائص حين يكون في العمود فراغاتٌ تكفي لأن يحمل العَلَم وزنًا، ولا يكون الفراغُ مدلولًا عليه أصلًا بعمودٍ تُبقيه، وتكون قستَ أنه يُفيد."
        }
      },

      /* ---------------------------------------------------------- 22 */
      {
        id: "t2l2q22", type: "error", level: "hard",
        topics: ["t2-never-impute-target", "t2-impute-centre"],
        q: {
          en: "One line was supposed to deal with every hole at once, and the program runs and prints. Click every line that breaks a rule this lesson states.",
          ar: "كان على سطرٍ واحد أن يعالج كل ثقب دفعةً واحدة، والبرنامج يعمل ويطبع. انقر كل سطرٍ ينقض قاعدةً يذكرها هذا الدرس."
        },
        code: code(
          "raw    = pd.read_csv(\"listings_raw.csv\")",
          "rep    = raw.assign(monthly_rent=raw[\"monthly_rent\"].mask(raw[\"monthly_rent\"] > 5000))",
          "train  = rep.sample(frac=0.75, random_state=3)",
          "fitted = {\"centre\": rep.mean(numeric_only=True)}",
          "out    = rep.fillna(fitted[\"centre\"])",
          "print(out.shape, int(out[\"monthly_rent\"].isna().sum()), out.isna().sum()[lambda s: s > 0].to_dict())",
          "# (503, 13) 0 {'floor': 9, 'condition': 36}"
        ),
        answer: [4, 5],
        solution: {
          code: code(
            "train  = rep.sample(frac=0.75, random_state=3)",
            "fitted = {\"area_by_rooms\": train.groupby(\"rooms\")[\"area_m2\"].median().to_dict(),   # FIT: training rows only",
            "          \"area_median\":   float(train[\"area_m2\"].median()),",
            "          \"cond_mode\":     train[\"condition\"].str.strip().str.lower().mode()[0]}",
            "",
            "tgt = rep.dropna(subset=[\"monthly_rent\"])                   # the target is dropped, not filled",
            "out = tgt.assign(area_m2_missing=tgt[\"area_m2\"].isna(),",
            "                 area_m2=tgt[\"area_m2\"].fillna(tgt[\"rooms\"].map(fitted[\"area_by_rooms\"])",
            "                                                           .fillna(fitted[\"area_median\"])),",
            "                 condition_missing=tgt[\"condition\"].isna(),",
            "                 condition=tgt[\"condition\"].fillna(fitted[\"cond_mode\"]))"
          ),
          out: "(483, 17) 0 {'floor': 9}",
          en: "One fitted parameter per column, learned from <code>train</code> alone; the target dropped rather than filled; a group median instead of one number for 27 different flats; and the text columns given a fill of their own instead of being skipped in silence.",
          ar: "وسيطٌ مضبوط واحد لكل عمود، متعلَّمٌ من <code>train</code> وحدها؛ والهدفُ محذوفٌ لا معبَّأ؛ ووسيطُ مجموعة بدل رقمٍ واحد لسبعٍ وعشرين شقة مختلفة؛ والأعمدةُ النصية تُعطى تعبئتها الخاصة بدل أن تُتخطّى في صمت."
        },
        hint: {
          en: "Line 3 computes something and the lines after it never use it, which is the tell. And look hard at <em>which</em> columns the printed dictionary still reports as blank &mdash; and which column is missing from it that should not have been filled.",
          ar: "السطر 3 يحسب شيئًا ولا تستعمله الأسطر بعده، وهذه هي العلامة. وانظر جيدًا في <em>أيّ</em> الأعمدة ما زال القاموسُ المطبوع يُبلّغ عنها فارغةً &mdash; وأيُّ عمود غائب عنه كان لا ينبغي أن يُعبَّأ."
        },
        explain: {
          en: "Line 4 fits the parameter on all 503 rows, held-out rows included, which is leakage &mdash; <code>train</code> is computed on line 3 and then never used, and the honest rent mean is 211.9008 against the leaky 210.1449. Line 5 then does three forbidden things in one call: it fills <code>monthly_rent</code>, the target, with a central value, so nineteen fabricated answers go into the column the model is trying to learn; it uses a single number for a whole column, which the measurement prices at about 15&nbsp;m&sup2; per hole against 5 for a group fill; and because <code>mean(numeric_only=True)</code> has nothing to say about text, it silently skips <code>floor</code> and <code>condition</code>, so the step claims success while 45 holes remain &mdash; which is exactly what the printed dictionary is telling you. Lines 2 and 6 are the tempting clicks: masking the 99999 is stage 2 of the canonical order done correctly, and the print is the only honest thing in the program, since it is the line that reveals the 45 survivors.",
          ar: "يضبط السطر 4 الوسيطَ على الصفوف الـ503 كلها، وفيها الصفوف المحجوزة، وهذا تسرّب &mdash; فـ<code>train</code> يُحسب في السطر 3 ثم لا يُستعمل قطّ، ومتوسطُ الإيجار الأمين 211.9008 مقابل المتسرِّب 210.1449. ثم يفعل السطر 5 ثلاثةَ ممنوعات في نداء واحد: يعبّئ <code>monthly_rent</code>، وهو الهدف، بقيمة مركزية، فتدخل تسعةَ عشر جوابًا مختلقًا في العمود الذي يحاول النموذج أن يتعلّمه؛ ويستعمل رقمًا واحدًا لعمود كامل، ويقدّر القياسُ ثمنه بنحو 15&nbsp;م&sup2; لكل ثقب مقابل 5 للتعبئة بالمجموعات؛ ولأن <code>mean(numeric_only=True)</code> لا تقول شيئًا عن النص فهو يتخطّى <code>floor</code> و<code>condition</code> في صمت، فتدّعي الخطوةُ النجاح وقد بقي 45 ثقبًا &mdash; وهذا بالضبط ما يخبرك به القاموس المطبوع. والسطران 2 و6 هما النقرتان المغريتان: فتقنيعُ 99999 هو المرحلة 2 من الترتيب القياسي منفَّذةً تنفيذًا صحيحًا، والطباعةُ هي الشيء الأمين الوحيد في البرنامج، إذ هي السطر الذي يفضح الناجين الـ45."
        }
      },

      /* ---------------------------------------------------------- 23 */
      {
        id: "t2l2q23", type: "ordercode", level: "medium",
        topics: ["t2-missing-decision-table", "t2-missing-decisions"],
        q: {
          en: "<code>fit_missing</code>, the five steps and <code>run</code> are already defined, and <code>MISSING_STAGE</code> lists the steps in order. Put the statements in the one order that runs, and in which no parameter is learned from a row that is not allowed to teach it.",
          ar: "‏<code>fit_missing</code> والخطوات الخمس و<code>run</code> معرَّفة أصلًا، وتسرد <code>MISSING_STAGE</code> الخطواتَ بترتيبها. رتّب الأسطر بالترتيب الوحيد الذي يعمل، والذي لا يُتعلَّم فيه وسيطٌ من صفٍّ لا يحقّ له أن يعلّمه."
        },
        items: [
          { code: "import pandas as pd" },
          { code: "raw = pd.read_csv(\"listings_raw.csv\")" },
          { code: "rep = raw.assign(monthly_rent=raw[\"monthly_rent\"].mask(raw[\"monthly_rent\"] > 5000))" },
          { code: "train = rep.sample(frac=0.75, random_state=3)" },
          { code: "fitted = fit_missing(train)" },
          { code: "out, log = run(rep, MISSING_STAGE, fitted)" },
          { code: "print(log[[\"column\", \"n\", \"mechanism\", \"decision\", \"rows_in\", \"rows_out\"]].to_string(index=False))" }
        ],
        answer: [0, 1, 2, 3, 4, 5, 6],
        hint: {
          en: "Every statement needs a name the statements above it created. Two of the orderings carry the lesson rather than the syntax: one is about the canonical order, and one about which rows a parameter is entitled to.",
          ar: "كل سطر يحتاج اسمًا أنشأته الأسطر فوقه. وترتيبان يحملان الدرس لا القواعد النحوية: أحدهما عن الترتيب القياسي، والآخر عمّا يحقّ لوسيطٍ من صفوف."
        },
        explain: {
          en: "The chain of names fixes most of it: <code>pd</code> before <code>read_csv</code>, <code>raw</code> before <code>rep</code>, <code>train</code> before <code>fitted</code>, <code>fitted</code> before <code>run</code>, <code>log</code> before it can be printed. Two placements are the lesson rather than the syntax. <code>rep</code> comes before the split and before the fit, because stage 2 of the canonical order has to have turned the 99999 into a hole first &mdash; and the proof is in the log, whose first row reports <code>n = 20</code> blank rents and not 19. And the split comes before <code>fit_missing</code>, because a condition mode, a per-rooms median and a deposit multiple fitted on all 503 rows would be the one-word leak with no symptom that Lesson 1 warned about. Note that <code>run</code> is handed <code>rep</code>, not <code>train</code>: the five steps are applied to every row, while only the 377 training rows taught the parameters. The log that comes out is the document: five rows naming a column, a count, a mechanism and a decision, 503&nbsp;&rarr;&nbsp;483 rows, 13&nbsp;&rarr;&nbsp;18 columns and 215&nbsp;&rarr;&nbsp;18 blank cells.",
          ar: "سلسلةُ الأسماء تثبّت معظمه: فـ<code>pd</code> قبل <code>read_csv</code>، و<code>raw</code> قبل <code>rep</code>، و<code>train</code> قبل <code>fitted</code>، و<code>fitted</code> قبل <code>run</code>، و<code>log</code> قبل أن يمكن طبعه. وموضعانِ هما الدرس لا القواعد النحوية. فـ<code>rep</code> تأتي قبل التقسيم وقبل الضبط، لأن المرحلة 2 من الترتيب القياسي يجب أن تكون قد حوّلت 99999 إلى ثقب أولًا &mdash; والدليلُ في السجل، إذ يُبلّغ سطرُه الأول عن <code>n = 20</code> إيجارًا فارغًا لا تسعة عشر. ويأتي التقسيمُ قبل <code>fit_missing</code>، لأن منوالَ حالةٍ ووسيطَ غرفٍ ومضاعفَ تأمين مضبوطةً على الصفوف الـ503 كلها تكون التسرّبَ ذا الكلمة الواحدة بلا عَرَض الذي حذّر منه الدرس 1. ولاحظ أن <code>run</code> تُسلَّم <code>rep</code> لا <code>train</code>: فالخطوات الخمس تُطبَّق على كل صف، ولم تعلّم الوسائطَ إلا صفوفُ التدريب الـ377. والسجلُّ الخارج هو الوثيقة: خمسةُ أسطر تسمّي عمودًا وعدًّا وآليةً وقرارًا، و503&nbsp;&rarr;&nbsp;483 صفًّا، و13&nbsp;&rarr;&nbsp;18 عمودًا، و215&nbsp;&rarr;&nbsp;18 خليةً فارغة."
        }
      },

      /* ---------------------------------------------------------- 24 */
      {
        id: "t2l2q24", type: "write", level: "hard",
        topics: ["t2-missing-next-month", "t2-missing-decision-table"],
        q: {
          en: "Write <code>impute_condition(d, fitted)</code> in the <code>(frame, log_row)</code> shape of Concept 7, so that the same function can be run on next month's file with last month's parameter. It must take the fill from <code>fitted[\"cond_mode\"]</code> and never recompute it, write <code>condition_missing</code> from the original column <em>before</em> the fill, never write into <code>d</code>, and return the new frame with one log row holding <code>step</code>, <code>column</code>, <code>n</code>, <code>mechanism</code>, <code>decision</code>, <code>rows_in</code>, <code>rows_out</code> and <code>cells_changed</code>. The mechanism for this column is <code>\"unknown\"</code>. Then call it on June's 85 rows and print the log row as a one-row DataFrame.",
          ar: "اكتب <code>impute_condition(d, fitted)</code> بشكل <code>(frame, log_row)</code> في المفهوم 7، بحيث يمكن تشغيل الدالة نفسها على ملف الشهر القادم بوسيط الشهر الماضي. يجب أن تأخذ التعبئة من <code>fitted[\"cond_mode\"]</code> ولا تعيد حسابها قطّ، وأن تكتب <code>condition_missing</code> من العمود الأصلي <em>قبل</em> التعبئة، وألّا تكتب في <code>d</code> قطّ، وأن تعيد الجدول الجديد مع سطر سجل واحد فيه <code>step</code> و<code>column</code> و<code>n</code> و<code>mechanism</code> و<code>decision</code> و<code>rows_in</code> و<code>rows_out</code> و<code>cells_changed</code>. وآليةُ هذا العمود <code>\"unknown\"</code>. ثم نادِها على صفوف حزيران الـ85 واطبع سطرَ السجل جدولًا من صف واحد."
        },
        starter: code(
          "import pandas as pd",
          "",
          "new    = pd.read_csv(\"listings_new.csv\")   # 85 rows for June, one blank condition",
          "fitted = {\"cond_mode\": \"good\"}             # fitted in March, on the 377 training rows",
          "",
          "# your code here"
        ),
        lines: 12,
        checks: [
          {
            re: "def\\s+impute_condition\\s*\\(\\s*\\w+\\s*,\\s*\\w+\\s*\\)",
            label: {
              en: "A function <code>impute_condition</code> of two arguments: the frame and the fitted parameters",
              ar: "دالة <code>impute_condition</code> بوسيطين: الجدول والوسائط المضبوطة"
            }
          },
          {
            re: "\\[\\s*[\"']cond_mode[\"']\\s*\\]",
            label: {
              en: "The fill comes from <code>fitted[\"cond_mode\"]</code>, never from the frame being transformed",
              ar: "التعبئة تأتي من <code>fitted[\"cond_mode\"]</code> لا من الجدول الذي يُحوَّل"
            }
          },
          {
            re: "\\.\\s*assign\\s*\\(",
            label: {
              en: "Build a new frame with <code>assign</code>, so <code>d</code> is never written into",
              ar: "ابنِ جدولًا جديدًا بـ<code>assign</code> حتى لا يُكتَب في <code>d</code> قطّ"
            }
          },
          {
            re: "condition_missing\\s*=\\s*\\w+\\s*\\[\\s*[\"']condition[\"']\\s*\\]\\s*\\.\\s*isna\\s*\\(\\s*\\)",
            label: {
              en: "The flag is read from the original <code>condition</code> column, before the fill",
              ar: "العَلَم يُقرأ من عمود <code>condition</code> الأصلي قبل التعبئة"
            }
          },
          {
            re: "\\.\\s*fillna\\s*\\(",
            label: {
              en: "Fill the blank conditions with the fitted mode",
              ar: "عبّئ الحالات الفارغة بالمنوال المضبوط"
            }
          },
          {
            re: "return\\s+\\w+\\s*,\\s*\\{",
            label: {
              en: "Return the frame and the log row together",
              ar: "أعِد الجدول وسطر السجل معًا"
            }
          },
          {
            re: "[\"']mechanism[\"']\\s*:[^,]*[\"']unknown[\"']",
            label: {
              en: "The log row names the mechanism, and for this column it is <code>unknown</code>",
              ar: "سطر السجل يسمّي الآلية، وهي في هذا العمود <code>unknown</code>"
            }
          },
          {
            re: "[\"']cells_changed[\"']\\s*:",
            label: {
              en: "The log row counts the cells the step changed",
              ar: "سطر السجل يعدّ الخلايا التي غيّرتها الخطوة"
            }
          }
        ],
        forbid: [
          {
            re: "\\.\\s*mode\\s*\\(",
            label: {
              en: "recomputing the mode inside the step (that refits on June, and the two months stop being comparable)",
              ar: "إعادة حساب المنوال داخل الخطوة (فذلك إعادةُ ضبطٍ على حزيران، فيتوقف الشهران عن كونهما قابلين للمقارنة)"
            }
          },
          {
            re: "inplace\\s*=\\s*True",
            label: {
              en: "<code>inplace=True</code> (it writes into the caller's frame, returns <code>None</code>, and saves no memory)",
              ar: "<code>inplace=True</code> (يكتب في جدول المنادي ويعيد <code>None</code> ولا يوفّر ذاكرة)"
            }
          },
          {
            re: "\\.\\s*dropna\\s*\\(",
            label: {
              en: "dropping the rows whose condition is blank &mdash; <code>condition</code> is a feature, not the target",
              ar: "حذف الصفوف التي حالتها فارغة &mdash; فـ<code>condition</code> خاصية لا الهدف"
            }
          }
        ],
        solution: {
          code: code(
            "import pandas as pd",
            "",
            "new    = pd.read_csv(\"listings_new.csv\")",
            "fitted = {\"cond_mode\": \"good\"}",
            "",
            "def impute_condition(d, fitted):",
            "    n = int(d[\"condition\"].isna().sum())",
            "    out = d.assign(condition_missing=d[\"condition\"].isna(),          # FLAG FIRST",
            "                   condition=d[\"condition\"].fillna(fitted[\"cond_mode\"]))",
            "    return out, {\"step\": \"impute_condition\", \"column\": \"condition\", \"n\": n,",
            "                 \"mechanism\": \"unknown\", \"decision\": \"mode + flag\",",
            "                 \"rows_in\": len(d), \"rows_out\": len(out), \"cells_changed\": n}",
            "",
            "out, row = impute_condition(new, fitted)",
            "print(pd.DataFrame([row]).to_string(index=False))"
          ),
          out: "            step    column  n mechanism    decision  rows_in  rows_out  cells_changed\nimpute_condition condition  1   unknown mode + flag       85        85              1",
          en: "<code>n</code> is read from <code>d</code> before anything is written, and both <code>assign</code> arguments are evaluated against the frame as it was on entry, so the flag sees the original column. The fill arrives as a parameter, so June's single blank condition becomes March's <code>good</code> rather than June's own mode &mdash; which is what makes the two months comparable at all.",
          ar: "يُقرأ <code>n</code> من <code>d</code> قبل أن يُكتب شيء، ويُقيَّم وسيطا <code>assign</code> في مقابل الجدول كما كان عند الدخول، فيرى العَلَمُ العمودَ الأصلي. وتأتي التعبئةُ وسيطًا، فتصير حالةُ حزيران الفارغة الواحدة <code>good</code> آذار لا منوالَ حزيران نفسه &mdash; وهذا ما يجعل الشهرين قابلين للمقارنة أصلًا."
        },
        hint: {
          en: "Read the count into a name before you build anything: you need it twice, in <code>n</code> and in <code>cells_changed</code>, and after the fill it would be zero. And remember that this file has never been inspected &mdash; the only thing the step may know about June is what is inside <code>fitted</code>.",
          ar: "اقرأ العدّ في اسمٍ قبل أن تبني شيئًا: فأنت تحتاجه مرتين، في <code>n</code> وفي <code>cells_changed</code>، وبعد التعبئة يكون صفرًا. وتذكّر أن هذا الملف لم يُفتَّش قطّ &mdash; فلا يحقّ للخطوة أن تعرف عن حزيران إلا ما في <code>fitted</code>."
        },
        explain: {
          en: "A step in this shape takes the frame and the fitted parameters and gives back a new frame plus one dictionary describing what it did, so five steps produce a five-row decision table. Three details carry the question. The count is taken from <code>d</code> first, because reading it after the fill would report 0 and the log would disagree with the step &mdash; the same ordering bug as the flag, in a different place. The flag is written inside the same <code>assign</code> as the fill, which is safe because both arguments are evaluated against the frame on entry; split across two statements and the order becomes load-bearing and silently gives a column of <code>False</code>. And the mode arrives in <code>fitted</code> rather than being computed from <code>d</code>: refit on June and the same 83 listings come out with different numbers for a reason that has nothing to do with any flat. The classic wrong shortcut is <code>dropna(subset=[\"condition\"])</code> &mdash; but <code>condition</code> is a feature, and a row with a rent and no condition still carries eleven other columns the model can learn from.",
          ar: "الخطوة بهذا الشكل تأخذ الجدول والوسائط المضبوطة وتعيد جدولًا جديدًا مع قاموس واحد يصف ما فعلته، فتنتج خمسُ خطوات جدولَ قراراتٍ من خمسة أسطر. وثلاثة تفاصيل تحمل السؤال. فالعدُّ يُؤخذ من <code>d</code> أولًا، لأن قراءته بعد التعبئة تُبلّغ عن 0 فيخالف السجلُّ الخطوةَ &mdash; وهو عطبُ الترتيب نفسه الذي في العَلَم، في موضع آخر. ويُكتب العَلَم داخل <code>assign</code> نفسها التي فيها التعبئة، وهذا آمنٌ لأن الوسيطين يُقيَّمان في مقابل الجدول عند الدخول؛ وافصلهما إلى عبارتين فيصير الترتيبُ حاملًا للمعنى ويعطي عمودَ <code>False</code> في صمت. ويأتي المنوال في <code>fitted</code> ولا يُحسب من <code>d</code>: فأعِد الضبطَ على حزيران تخرج الإعلاناتُ الـ83 نفسها بأرقام أخرى لسببٍ لا علاقة له بأي شقة. والاختصارُ الخاطئ الكلاسيكي هو <code>dropna(subset=[\"condition\"])</code> &mdash; لكن <code>condition</code> خاصية، والصفُّ الذي له إيجار ولا حالة له يحمل أحد عشر عمودًا آخر يتعلّم منها النموذج."
        }
      }

    ]
  };
})();
