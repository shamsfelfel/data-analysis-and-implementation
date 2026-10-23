window.DABanks = window.DABanks || {};
(function () {
  /* code(line, line, ...) -> one string with \n between lines */
  function code() { return Array.prototype.join.call(arguments, "\n"); }

  window.DABanks["t1-test-04"] = {
    title: {
      en: "Test 4 — Flat Files: CSV and Excel",
      ar: "اختبار 4 — الملفات المسطّحة: CSV وExcel"
    },
    intro: {
      en: "24 questions on Lesson 4: what a CSV file physically is, the delimiter, the decimal mark and the thousands separator, encodings and mojibake, telling pandas the types (IDs, missing-value markers, dates), Excel sheets with title rows and serial dates, and writing files back safely. All outputs and dtypes are from pandas 2.2. Plan for about 40 minutes. Every question has a hint, an answer and an explanation, hidden until you ask for them: try first, then open them. A revealed answer is not counted.",
      ar: "24 سؤالًا عن الدرس 4: ما هو ملف CSV فعليًّا، والفاصل والعلامة العشرية وفاصل الآلاف، والترميزات والحروف المشوّهة، وإخبار pandas بالأنواع (المعرّفات ورموز القيم المفقودة والتواريخ)، وأوراق Excel ذات أسطر العنوان والتواريخ التسلسلية، وكتابة الملفات من جديد بأمان. كل النواتج وأسماء الأنواع من pandas 2.2. خصّص نحو 40 دقيقة. لكل سؤال تلميح وجواب وشرح، وكلها مخفية حتى تطلبها: جرّب أولًا ثم افتحها. والجواب الذي يُظهَر لا يُحتسب."
    },
    questions: [

      /* ---------------------------------------------------------- 01 */
      {
        id: "t1l4q01", type: "tf", level: "easy",
        topics: ["t1-csv-layers", "t1-csv-quoting"],
        q: {
          en: "The text below is a CSV with a header and two listings, and <code>len(ads.splitlines())</code> is <code>4</code>. True or false: <code>pd.read_csv(io.StringIO(ads))</code> returns a table with 3 rows, one for each line after the header.",
          ar: "النص أدناه ملف CSV فيه سطر عناوين وإعلانان، وقيمة <code>len(ads.splitlines())</code> هي <code>4</code>. صح أم خطأ: تعيد <code>pd.read_csv(io.StringIO(ads))</code> جدولًا من 3 صفوف، صفًّا لكل سطر بعد سطر العناوين."
        },
        code: code(
          "import io",
          "import pandas as pd",
          "",
          "ads = ('listing_id,advert\\n'",
          "       '1001,\"Quiet street,\\nclose to the market\"\\n'",
          "       '1002,\"Sea view\"\\n')",
          "print(len(ads.splitlines()))          # 4"
        ),
        truth: false,
        hint: {
          en: "Ask what, besides a comma, a pair of quote marks is allowed to protect.",
          ar: "اسأل: ماذا يستطيع زوج علامتي التنصيص أن يحمي غير الفاصلة؟"
        },
        explain: {
          en: "False: the table has 2 rows. The first advert contains a comma <em>and</em> a line break, both inside quote marks, so they are data and lines 2 and 3 of the text are one record. That is why a row count taken with <code>wc -l</code> or <code>len(f.readlines())</code> can be wrong, and why the parser's count is the one to trust. Counting lines is the same mistake as <code>split(',')</code>: it ignores the one bit of memory a CSV reader needs, 'am I inside quotes?'. When the line count and the record count disagree, look at the quoting.",
          ar: "خطأ: في الجدول صفّان. يحتوي الإعلان الأول فاصلة <em>وفاصل سطر</em> كلاهما بين علامتي تنصيص، فهما بيانات، والسطران 2 و3 من النص سجلّ واحد. ولهذا قد يكون عدّ الصفوف بـ<code>wc -l</code> أو <code>len(f.readlines())</code> خاطئًا، وعدّ المحلّل هو الذي يوثق به. وعدّ الأسطر هو الخطأ نفسه في <code>split(',')</code>: يتجاهل خانة الذاكرة الوحيدة التي يحتاجها قارئ CSV: «هل أنا داخل تنصيص؟». فإذا اختلف عدّ الأسطر عن عدّ السجلّات فانظر في التنصيص."
        }
      },

      /* ---------------------------------------------------------- 02 */
      {
        id: "t1l4q02", type: "output", level: "medium",
        topics: ["t1-csv-quoting"],
        q: {
          en: "Write exactly what the program prints (three lines).",
          ar: "اكتب بالضبط ما يطبعه البرنامج (ثلاثة أسطر)."
        },
        code: code(
          "import csv",
          "",
          "line = '1002,Rafah,\"Says \"\"sea view\"\", quiet\",285'",
          "print(len(line.split(\",\")))",
          "row = next(csv.reader([line]))",
          "print(len(row))",
          "print(row[2])"
        ),
        blanks: [
          {
            accept: [
              "5\n4\nSays \"sea view\", quiet"
            ],
            lines: 3
          }
        ],
        hint: {
          en: "Cut the raw line at every comma for the first number. For the parser, recall the two quoting rules: a comma between quote marks is data, and a doubled quote inside a quoted field is one literal quote mark.",
          ar: "اقطع السطر الخام عند كل فاصلة لتحصل على الرقم الأول. وللمحلّل تذكّر قاعدتي التنصيص: الفاصلة بين علامتي التنصيص بيانات، وعلامة التنصيص المضاعفة داخل الحقل المنصَّص تعني علامة حرفية واحدة."
        },
        explain: {
          en: "<code>split(',')</code> cuts at every comma, quoted or not, so it gives five pieces: <code>1002</code>, <code>Rafah</code>, <code>\"Says \"\"sea view\"\"</code>, <code> quiet\"</code> and <code>285</code>, two of them broken halves of the advert. <code>csv.reader</code> keeps one bit of state, 'am I inside quotes?': the comma after <code>\"\"sea view\"\"</code> is still inside the outer quotes, so it is data; the doubled quotes become one literal <code>\"</code>; and the quote marks around the field are consumed. That gives 4 fields, and field 2 is <code>Says \"sea view\", quiet</code>. The usual slips are to count three pieces (as if the quotes protected everything) or to expect the doubled quotes to survive.",
          ar: "تقطع <code>split(',')</code> عند كل فاصلة، منصَّصة أو لا، فتخرج خمس قطع: <code>1002</code> و<code>Rafah</code> و<code>\"Says \"\"sea view\"\"</code> و<code> quiet\"</code> و<code>285</code>، منها قطعتان هما نصفا الإعلان المكسور. أما <code>csv.reader</code> فتحمل خانة ذاكرة واحدة: «هل أنا داخل تنصيص؟»؛ فالفاصلة بعد <code>\"\"sea view\"\"</code> ما زالت داخل علامتي التنصيص الخارجيتين فهي بيانات، وتصير علامتا التنصيص المضاعفتان علامة حرفية واحدة <code>\"</code>، وتُستهلك علامتا التنصيص المحيطتان بالحقل. فتكون النتيجة 4 حقول، والحقل الثالث هو <code>Says \"sea view\", quiet</code>. والخطآن المعتادان أن تعدّ ثلاث قطع (كأن التنصيص يحمي كل شيء) أو أن تتوقع بقاء علامتي التنصيص المضاعفتين."
        }
      },

      /* ---------------------------------------------------------- 03 */
      {
        id: "t1l4q03", type: "trace", level: "hard",
        topics: ["t1-csv-quoting", "t1-csv-layers"],
        q: {
          en: "This is the quote-tracking state machine from the lesson, run on a line whose closing quote is missing. After the last line has run, what are the three values? (Type text without quote marks.)",
          ar: "هذه آلة الحالات التي تتتبّع التنصيص في الدرس، مشغَّلة على سطر ينقصه علامة التنصيص الختامية. بعد تنفيذ السطر الأخير، ما قيم المتغيرات الثلاثة؟ (اكتب النص بلا علامات تنصيص.)"
        },
        code: code(
          "line = '1001,\"Gaza, Rimal,415'          # the closing quote is missing",
          "fields = []",
          "field = \"\"",
          "in_quotes = False",
          "for ch in line:",
          "    if ch == '\"':",
          "        in_quotes = not in_quotes",
          "    elif ch == \",\" and not in_quotes:",
          "        fields.append(field)",
          "        field = \"\"",
          "    else:",
          "        field += ch",
          "fields.append(field)"
        ),
        blanks: [
          {
            accept: ["2"],
            label: {
              en: "len(fields)",
              ar: "len(fields)"
            }
          },
          {
            accept: ["Gaza, Rimal,415", "'Gaza, Rimal,415'", "\"Gaza, Rimal,415\""],
            label: {
              en: "fields[1]",
              ar: "fields[1]"
            },
            wide: true
          },
          {
            accept: ["True"],
            label: {
              en: "in_quotes",
              ar: "in_quotes"
            }
          }
        ],
        hint: {
          en: "Follow <code>in_quotes</code> character by character: while it is <code>True</code>, what happens to a comma?",
          ar: "تابع <code>in_quotes</code> حرفًا حرفًا: وما دامت <code>True</code> فماذا يحدث للفاصلة؟"
        },
        explain: {
          en: "The quote before <code>Gaza</code> flips <code>in_quotes</code> to True and nothing ever flips it back. From then on the commas after <code>Gaza</code> and before <code>415</code> fail the test <code>ch == \",\" and not in_quotes</code>, so they are appended to the field like any other character. Only the first comma splits: <code>fields</code> is <code>['1001', 'Gaza, Rimal,415']</code>, two fields, and <code>in_quotes</code> is still True. A missing closing quote raises nothing here; it swallows the rest of the line, and in a real file the following lines too, because a quoted field may contain a newline. The tempting wrong answers are 3 fields (every comma splits) and False (quotes always balance).",
          ar: "علامة التنصيص قبل <code>Gaza</code> تقلب <code>in_quotes</code> إلى True ولا يعيدها شيء إلى False. ومنذ ذلك الحين تفشل الفاصلتان بعد <code>Gaza</code> وقبل <code>415</code> في الشرط <code>ch == \",\" and not in_quotes</code>، فتُضافان إلى الحقل كأي حرف آخر. وتقسم الفاصلة الأولى وحدها: فالقائمة <code>fields</code> هي <code>['1001', 'Gaza, Rimal,415']</code> أي حقلان، و<code>in_quotes</code> ما زالت True. نقص علامة التنصيص الختامية لا يرفع هنا أي خطأ؛ إنه يبتلع بقية السطر، وفي ملف حقيقي يبتلع الأسطر التالية أيضًا لأن الحقل المنصَّص قد يحتوي سطرًا جديدًا. والإجابتان المغريتان الخاطئتان: 3 حقول (كأن كل فاصلة تقسم) وFalse (كأن علامات التنصيص متوازنة دائمًا)."
        }
      },

      /* ---------------------------------------------------------- 04 */
      {
        id: "t1l4q04", type: "match", level: "easy",
        topics: ["t1-csv-delimiter", "t1-csv-decimal-thousands", "t1-encoding-basics"],
        q: {
          en: "Match each symptom after a default <code>pd.read_csv</code> to the argument that fixes it.",
          ar: "وصّل كل عَرَض يظهر بعد <code>pd.read_csv</code> الافتراضية بالوسيط الذي يصلحه."
        },
        pairs: [
          {
            l: {
              en: "One column only, and the index looks like data",
              ar: "عمود واحد فقط، والفهرس يشبه البيانات"
            },
            r: { code: "sep=\";\"" }
          },
          {
            l: {
              en: "A number column is <code>object</code>, with values like <code>'119,2'</code>",
              ar: "عمود أرقام من النوع <code>object</code> وقيمه مثل <code>'119,2'</code>"
            },
            r: { code: "decimal=\",\"" }
          },
          {
            l: {
              en: "A number column is <code>object</code>, with values like <code>'1,250'</code>",
              ar: "عمود أرقام من النوع <code>object</code> وقيمه مثل <code>'1,250'</code>"
            },
            r: { code: "thousands=\",\"" }
          },
          {
            l: {
              en: "The first column name starts with odd characters such as <code>ï»؟</code>",
              ar: "اسم العمود الأول تسبقه حروف غريبة مثل <code>ï»؟</code>"
            },
            r: { code: "encoding=\"utf-8-sig\"" }
          },
          {
            l: {
              en: "<code>UnicodeDecodeError</code> at byte <code>0xc7</code> on an Arabic file from an old Windows computer",
              ar: "الخطأ <code>UnicodeDecodeError</code> عند البايت <code>0xc7</code> في ملف عربي من حاسوب ويندوز قديم"
            },
            r: { code: "encoding=\"cp1256\"" }
          }
        ],
        leftHead: {
          en: "What you see",
          ar: "ما تراه"
        },
        rightHead: {
          en: "The fix",
          ar: "العلاج"
        },
        hint: {
          en: "Ask what each wrong default changes: the number of columns, the type of one column, or the letters themselves.",
          ar: "اسأل: ماذا يغيّر كل اختيار افتراضي خاطئ؟ عدد الأعمدة، أم نوع عمود واحد، أم الحروف نفسها."
        },
        explain: {
          en: "Each wrong default leaves its own fingerprint. A wrong field separator gives one column with data in the index; a decimal comma leaves text like '119,2' (to pandas a comma is not a decimal mark); a thousands separator leaves text like '1,250'; a BOM read through the wrong table leaves odd characters before the first header, and <code>utf-8-sig</code> removes them; and bytes that are not UTF-8 fail loudly with <code>UnicodeDecodeError</code>, which for Arabic from an older Windows machine points to cp1256. Fixing one often exposes the next, so reload and look again after every change.",
          ar: "لكل اختيار افتراضي خاطئ بصمته. فاصل حقول خاطئ يعطي عمودًا واحدًا وبيانات في الفهرس؛ وفاصلة عشرية تترك نصوصًا مثل '119,2' (فالفاصلة ليست علامة عشرية عند pandas)؛ وفاصل آلاف يترك نصوصًا مثل '1,250'؛ وعلامة BOM قُرئت بجدول خاطئ تترك حروفًا غريبة قبل أول عنوان ويزيلها <code>utf-8-sig</code>؛ وبايتات ليست UTF-8 تفشل بصوت عالٍ بالخطأ <code>UnicodeDecodeError</code>، وهو مع عربية من حاسوب ويندوز أقدم يشير إلى cp1256. وإصلاح شيء واحد كثيرًا ما يكشف الذي بعده، فأعد التحميل وانظر من جديد بعد كل تغيير."
        }
      },

      /* ---------------------------------------------------------- 05 */
      {
        id: "t1l4q05", type: "output", level: "hard",
        topics: ["t1-csv-delimiter", "t1-csv-layers"],
        q: {
          en: "Write exactly what the program prints (three lines).",
          ar: "اكتب بالضبط ما يطبعه البرنامج (ثلاثة أسطر)."
        },
        code: code(
          "import io",
          "import pandas as pd",
          "",
          "txt = \"city;rent;area\\nGaza;445;115,7\\nRafah;285;90,8\\n\"",
          "df = pd.read_csv(io.StringIO(txt))",
          "print(df.shape)",
          "print(df.index[0])",
          "print(df.iloc[0, 0])"
        ),
        blanks: [
          {
            accept: [
              "(2, 1)\nGaza;445;115\n7",
              "(2,1)\nGaza;445;115\n7"
            ],
            lines: 3
          }
        ],
        hint: {
          en: "Count the commas in the header line and in each data line. A decimal comma is still a comma.",
          ar: "عُدّ الفواصل في سطر العناوين وفي كل سطر بيانات. والفاصلة العشرية تبقى فاصلة."
        },
        explain: {
          en: "There is no error, and no trace of the three columns. The header <code>city;rent;area</code> contains no comma, so pandas decides the file has one column. Each data line contains exactly one comma (the decimal comma in <code>115,7</code>), so it has two fields: one more than the header, and when that happens pandas takes the extra leading field as the index. The first index label is therefore <code>Gaza;445;115</code>, the single column holds what follows the comma (7, an integer, because <code>115,7</code> was cut in two), and the shape is (2, 1). This is the 30 × 1 load of the lesson in miniature: <code>sep=\";\"</code> is the cure, and <code>decimal=\",\"</code> is the second cure it exposes.",
          ar: "لا خطأ، ولا أثر للأعمدة الثلاثة. سطر العناوين <code>city;rent;area</code> لا فاصلة فيه، فيقرّر pandas أن للملف عمودًا واحدًا. وفي كل سطر بيانات فاصلة واحدة بالضبط (الفاصلة العشرية في <code>115,7</code>)، فله حقلان: أي أكثر من العناوين بحقل، وحين يحدث ذلك يعدّ pandas الحقل الإضافي الأول فهرسًا. فتسمية الفهرس الأولى هي <code>Gaza;445;115</code>، ويحمل العمود الوحيد ما بعد الفاصلة (العدد 7، صحيحًا لأن <code>115,7</code> قُطعت إلى نصفين)، والشكل (2, 1). هذا تحميل الـ30 × 1 في الدرس بحجم مصغّر: علاجه <code>sep=\";\"</code>، وبعده يظهر علاج ثانٍ هو <code>decimal=\",\"</code>."
        }
      },

      /* ---------------------------------------------------------- 06 */
      {
        id: "t1l4q06", type: "mcq", level: "medium",
        topics: ["t1-csv-decimal-thousands"],
        q: {
          en: "The rent column of a CSV holds <code>\"1,250\"</code> (in quote marks) and <code>980</code>, and by default it loads as <code>object</code>. A colleague tries <code>decimal=\",\"</code>. What does the program print, and what does that mean?",
          ar: "يحتوي عمود الإيجار في ملف CSV على <code>\"1,250\"</code> (بين علامتي تنصيص) و<code>980</code>، ويُحمَّل افتراضيًّا بنوع <code>object</code>. جرّب زميل <code>decimal=\",\"</code>. ماذا يطبع البرنامج، وماذا يعني ذلك؟"
        },
        code: code(
          "us = 'rent\\n\"1,250\"\\n980\\n'",
          "print(pd.read_csv(io.StringIO(us), decimal=\",\")[\"rent\"].tolist())"
        ),
        options: [
          {
            en: "<code>[1250, 980]</code>: <code>decimal=\",\"</code> strips the comma, so it cures thousands separators just as well as decimal commas",
            ar: "<code>[1250, 980]</code>: يزيل <code>decimal=\",\"</code> الفاصلة، فيعالج فاصل الآلاف كما يعالج الفاصلة العشرية"
          },
          {
            en: "<code>[1.25, 980.0]</code>: the comma is read as a decimal mark, so 1,250 silently becomes 1.25",
            ar: "<code>[1.25, 980.0]</code>: تُقرأ الفاصلة علامةً عشرية، فتصير 1,250 هي 1.25 بصمت"
          },
          {
            en: "<code>['1,250', '980']</code>: <code>decimal</code> has no effect on a quoted field, so the column stays <code>object</code>",
            ar: "<code>['1,250', '980']</code>: لا أثر لـ<code>decimal</code> على حقل منصَّص، فيبقى العمود <code>object</code>"
          },
          {
            en: "<code>ValueError</code>: <code>decimal=\",\"</code> cannot be combined with a field that is wrapped in quote marks",
            ar: "<code>ValueError</code>: لا يصلح <code>decimal=\",\"</code> مع حقل ملفوف بعلامتي تنصيص"
          }
        ],
        answer: 1,
        hint: {
          en: "What role does the comma play in 1,250: a mark after the units, or a mark between groups of digits? And what does <code>decimal=</code> tell the reader to do with it?",
          ar: "ما دور الفاصلة في 1,250: علامة بعد الآحاد أم علامة بين مجموعات الأرقام؟ وماذا يطلب <code>decimal=</code> من القارئ أن يفعل بها؟"
        },
        explain: {
          en: "<code>decimal=\",\"</code> tells the reader that a comma inside a number is the decimal mark, so \"1,250\" becomes 1.250, that is 1.25, and 980 becomes 980.0. The column turns <code>float64</code> and looks perfectly clean, and nothing is raised, which is worse than the <code>object</code> column you started with. The other options describe behaviour that does not exist: <code>decimal</code> never strips a comma (<code>[1250, 980]</code> is what <code>thousands=\",\"</code> gives), the column does change, and quote marks do not block it. The symptom 'values like 1,250' calls for <code>thousands=\",\"</code>, the symptom 'values like 119,2' for <code>decimal=\",\"</code>; read the raw text to tell them apart (three digits after the comma are usually a thousands group, one or two a fraction). It is the lesson's pattern again: a wrong notation argument can turn a visible failure into a silent one.",
          ar: "يخبر <code>decimal=\",\"</code> القارئ أن الفاصلة داخل الرقم علامة عشرية، فتصير \"1,250\" هي 1.250 أي 1.25، وتصير 980 هي 980.0. ويصبح العمود float64 ويبدو نظيفًا تمامًا ولا يُرفع شيء، وهذا أسوأ من عمود <code>object</code> الذي بدأت منه. أما الخيارات الأخرى فتصف سلوكًا غير موجود: فلا يزيل <code>decimal</code> الفاصلة أبدًا (فالناتج <code>[1250, 980]</code> هو ما يعطيه <code>thousands=\",\"</code>)، والعمود يتغيّر فعلًا، ولا تمنعه علامتا التنصيص. فالعَرَض «قيم مثل 1,250» يستدعي <code>thousands=\",\"</code>، والعَرَض «قيم مثل 119,2» يستدعي <code>decimal=\",\"</code>؛ وتميّز بينهما بقراءة النص الخام (ثلاثة أرقام بعد الفاصلة تعني عادةً مجموعة آلاف، ورقم أو رقمان يعنيان كسرًا). إنها قاعدة الدرس نفسها: وسيط كتابة خاطئ قد يحوّل فشلًا ظاهرًا إلى فشل صامت."
        }
      },

      /* ---------------------------------------------------------- 07 */
      {
        id: "t1l4q07", type: "error", level: "medium",
        topics: ["t1-csv-decimal-thousands", "t1-csv-reader-recipe"],
        q: {
          en: "The program should print the areas of the first two listings, doubled: <code>[238.4, 231.4]</code>. It prints <code>object</code> and then <code>['119,2119,2', '115,7115,7']</code>, and nothing is raised. Click the line responsible.",
          ar: "يُفترض أن يطبع البرنامج مساحتَي أول إعلانين مضروبتين في 2: <code>[238.4, 231.4]</code>. لكنه يطبع <code>object</code> ثم <code>['119,2119,2', '115,7115,7']</code>، ولا شيء يُرفع. انقر السطر المسؤول."
        },
        code: code(
          "import pandas as pd",
          "",
          "path = \"rental_listings_ar_semicolon.csv\"",
          "df = pd.read_csv(path, sep=\";\", encoding=\"utf-8-sig\")",
          "area = df.iloc[:, 3]                    # the fourth column: the area",
          "print(area.dtype)",
          "print((area * 2).head(2).tolist())"
        ),
        answer: 4,
        solution: {
          code: "df = pd.read_csv(path, sep=\";\", decimal=\",\", encoding=\"utf-8-sig\")",
          en: "Line 4 is missing <code>decimal=\",\"</code>: the semicolon file writes its numbers with a decimal comma.",
          ar: "ينقص السطر 4 الوسيط <code>decimal=\",\"</code>: فالملف المفصول بفاصلة منقوطة يكتب أرقامه بفاصلة عشرية."
        },
        hint: {
          en: "Look at the first thing printed: what dtype should a column of numbers have? Then ask which argument describes how the numbers are written in the file.",
          ar: "انظر إلى أول ما يُطبع: ما النوع الذي يجب أن يكون لعمود أرقام؟ ثم اسأل: أيّ وسيط يصف كيف تُكتب الأرقام في الملف؟"
        },
        explain: {
          en: "Line 4. The separator and the encoding are right (seven columns, nothing garbled), but nothing tells pandas that this file writes numbers like 119,2. To pandas a comma is not a decimal mark, so every cell of the area column stays text, hence <code>object</code>, and multiplying text by 2 repeats it. Lines 5 and 7 are fine: the arithmetic is correct, it is the data that is text. <code>dtype=float</code> would not rescue it (it raises <code>ValueError</code>), because <code>dtype</code> names the target type but does not teach the reader the notation; <code>decimal=\",\"</code> does.",
          ar: "السطر 4. الفاصل والترميز صحيحان (سبعة أعمدة ولا تشويه)، لكن لا شيء يخبر pandas أن هذا الملف يكتب الأرقام هكذا 119,2. والفاصلة عند pandas ليست علامة عشرية، فتبقى كل خلية في عمود المساحة نصًّا، ولذلك <code>object</code>، وضرب النص في 2 يكرّره. أما السطران 5 و7 فسليمان: الحساب صحيح، والبيانات هي التي صارت نصًّا. ولن ينقذ <code>dtype=float</code> الموقف (يرفع <code>ValueError</code>)، لأن <code>dtype</code> يسمّي النوع المقصود ولا يعلّم القارئ طريقة كتابة الرقم؛ أما <code>decimal=\",\"</code> فيعلّمه."
        }
      },

      /* ---------------------------------------------------------- 08 */
      {
        id: "t1l4q08", type: "contrast", level: "medium",
        topics: ["t1-encoding-basics", "t1-mojibake", "t1-csv-write-roundtrip"],
        q: {
          en: "Place each statement under <code>encoding=\"utf-8\"</code>, under <code>encoding=\"utf-8-sig\"</code>, under both, or under neither.",
          ar: "ضع كل عبارة تحت <code>encoding=\"utf-8\"</code> أو تحت <code>encoding=\"utf-8-sig\"</code> أو تحت كليهما أو تحت لا هذا ولا ذاك."
        },
        concepts: [
          {
            en: "<code>encoding=\"utf-8\"</code>",
            ar: "<code>encoding=\"utf-8\"</code>"
          },
          {
            en: "<code>encoding=\"utf-8-sig\"</code>",
            ar: "<code>encoding=\"utf-8-sig\"</code>"
          }
        ],
        neither: true,
        rows: [
          {
            s: {
              en: "With <code>pd.read_csv</code>, a file that starts with a BOM comes back with a clean first column name",
              ar: "مع <code>pd.read_csv</code>، يعود الملف الذي يبدأ بـBOM باسم عمود أول نظيف"
            },
            a: 2
          },
          {
            s: {
              en: "With the <code>csv</code> module, a file that starts with a BOM keeps an invisible character in front of the first header",
              ar: "مع وحدة <code>csv</code>، يحتفظ الملف الذي يبدأ بـBOM بحرف غير مرئي أمام أول عنوان"
            },
            a: 0
          },
          {
            s: {
              en: "Used with <code>to_csv</code>, it writes the three bytes <code>ef bb bf</code> at the start of the file",
              ar: "حين يُستعمل مع <code>to_csv</code> يكتب البايتات الثلاث <code>ef bb bf</code> في أول الملف"
            },
            a: 1
          },
          {
            s: {
              en: "Reads a file that has no BOM correctly",
              ar: "يقرأ ملفًا لا BOM فيه قراءة صحيحة"
            },
            a: 2
          },
          {
            s: {
              en: "Reads a file saved by an old Windows Arabic export (cp1256) without raising an error",
              ar: "يقرأ ملفًا محفوظًا بتصدير ويندوز عربي قديم (cp1256) دون أن يرفع خطأً"
            },
            a: 3
          },
          {
            s: {
              en: "The safest default when you do not know whether the files start with a BOM",
              ar: "هو الافتراضي الأسلم حين لا تعرف أتبدأ الملفات بـBOM أم لا"
            },
            a: 1
          }
        ],
        hint: {
          en: "Think about what each name does to the first three bytes when it reads and when it writes, and what neither can do for a file made with a different table.",
          ar: "فكّر ماذا يفعل كل اسم بالبايتات الثلاث الأولى حين يقرأ وحين يكتب، وماذا لا يستطيعه أيّ منهما أمام ملف صُنع بجدول مختلف."
        },
        explain: {
          en: "<code>utf-8-sig</code> is <code>utf-8</code> plus one rule about the BOM: drop it when reading, write it when writing. pandas strips a leading BOM even under plain <code>utf-8</code>, so the two read the same table there (rows 1 and 4); the standard library's <code>csv</code> module does not, so U+FEFF stays glued to the first header and <code>row[\"listing_id\"]</code> raises a KeyError that looks impossible (row 2). Writing with <code>utf-8-sig</code> puts the BOM in, which is how Excel on Windows recognises Arabic on a double-click (row 3), and reading with it is safe whether or not a BOM is there (row 6). Neither can read cp1256 bytes: <code>c7</code> is almost never valid UTF-8, so both raise <code>UnicodeDecodeError</code> (row 5), the loud failure; the dangerous ones are silent, where cp1256 or latin-1 turn UTF-8 into other letters.",
          ar: "الاسم <code>utf-8-sig</code> هو <code>utf-8</code> مع قاعدة واحدة إضافية عن BOM: تُسقَط عند القراءة وتُكتب عند الكتابة. وتُسقط pandas علامة BOM الأولى حتى مع <code>utf-8</code> العادي، فيقرأ الاسمان الجدول نفسه هناك (الصفان 1 و4)؛ أما وحدة <code>csv</code> في المكتبة القياسية فلا تفعل، فيبقى U+FEFF ملتصقًا بأول عنوان ويرفع <code>row[\"listing_id\"]</code> خطأ KeyError يبدو مستحيلًا (الصف 2). والكتابة بـ<code>utf-8-sig</code> تضع BOM، وبها يتعرّف Excel على ويندوز على العربية عند النقر المزدوج (الصف 3)، والقراءة بها آمنة سواء وُجدت BOM أم لا (الصف 6). ولا يقرأ أيٌّ منهما بايتات cp1256: فالبايت <code>c7</code> نادرًا ما يكون صالحًا في UTF-8، فيرفع كلاهما <code>UnicodeDecodeError</code> (الصف 5)، وهو الفشل العالي؛ أما الخطر فالفشل الصامت حين يحوّل cp1256 أو latin-1 بايتات UTF-8 إلى حروف أخرى."
        }
      },

      /* ---------------------------------------------------------- 09 */
      {
        id: "t1l4q09", type: "output", level: "hard",
        topics: ["t1-mojibake", "t1-encoding-basics"],
        q: {
          en: "Write exactly what the program prints (three lines).",
          ar: "اكتب بالضبط ما يطبعه البرنامج (ثلاثة أسطر)."
        },
        code: code(
          "city = \"غزة\"",
          "raw = city.encode(\"utf-8\")",
          "wrong = raw.decode(\"cp1256\")",
          "print(len(raw), len(wrong))",
          "print(wrong == city)",
          "print(wrong.encode(\"cp1256\").decode(\"utf-8\") == city)"
        ),
        blanks: [
          {
            accept: [
              "6 6\nFalse\nTrue"
            ],
            lines: 3
          }
        ],
        hint: {
          en: "How many bytes does each Arabic letter take in UTF-8, and how many characters does cp1256 make of those bytes? Then ask whether the wrong decoding threw anything away.",
          ar: "كم بايتًا يأخذه كل حرف عربي في UTF-8، وكم حرفًا يصنع cp1256 من هذه البايتات؟ ثم اسأل: هل ضاع شيء في فك الترميز الخاطئ؟"
        },
        explain: {
          en: "غزة has 3 letters, each 2 bytes in UTF-8, so <code>raw</code> has 6 bytes. cp1256 turns every byte into exactly one character (it is a one-byte encoding in which every byte value is legal), so <code>wrong</code> has 6 characters: real Arabic letters, but not غزة. That is why the comparison is False and no error appears. Nothing was lost, though: encoding the wrong string with the same table gives back the original 6 bytes, and decoding those as UTF-8 returns غزة, so the last line is True. The repair works only because the wrong decode lost nothing (it would not after <code>encoding_errors=\"replace\"</code>); it is a rescue, not a method, so re-read the file with the right <code>encoding=</code> whenever you can.",
          ar: "في «غزة» ثلاثة حروف، لكل منها بايتان في UTF-8، فعدد بايتات <code>raw</code> هو 6. ويحوّل cp1256 كل بايت إلى حرف واحد بالضبط (فهو ترميز ببايت واحد وكل قيمة بايت فيه مشروعة)، فيكون في <code>wrong</code> ستة حروف: حروف عربية حقيقية لكنها ليست «غزة». ولذلك تكون المقارنة False ولا يظهر خطأ. ومع ذلك لم يضِع شيء: فترميز النص الخاطئ بالجدول نفسه يعيد البايتات الستّ الأصلية، وفكّها بـUTF-8 يعيد «غزة»، فيكون السطر الأخير True. وهذا الإصلاح ينجح فقط لأن فك الترميز الخاطئ لم يُضيّع شيئًا (ولا ينجح بعد <code>encoding_errors=\"replace\"</code>)؛ وهو إنقاذ لا منهج، فأعد قراءة الملف بـ<code>encoding=</code> الصحيح كلما استطعت."
        }
      },

      /* ---------------------------------------------------------- 10 */
      {
        id: "t1l4q10", type: "order", level: "easy",
        topics: ["t1-encoding-diagnose"],
        q: {
          en: "Put the steps for finding out which encoding a CSV file uses, and for checking the result, in a sensible order.",
          ar: "رتّب خطوات معرفة الترميز الذي يستعمله ملف CSV والتحقق من النتيجة ترتيبًا معقولًا."
        },
        items: [
          {
            en: "Open the file as raw bytes and look at its start: does it begin with a BOM, <code>ef bb bf</code>?",
            ar: "افتح الملف بايتات خامًا وانظر إلى بدايته: هل يبدأ بـBOM أي <code>ef bb bf</code>؟"
          },
          {
            en: "Try a strict UTF-8 decode of all the bytes; if it raises, the file is not UTF-8 (for Arabic, probably cp1256).",
            ar: "جرّب فك ترميز UTF-8 صارمًا لكل البايتات؛ فإن رفع خطأً فالملف ليس UTF-8 (وهو للعربية غالبًا cp1256)."
          },
          {
            en: "Load the file with the encoding the evidence points to: <code>utf-8-sig</code>, <code>utf-8</code> or <code>cp1256</code>.",
            ar: "حمّل الملف بالترميز الذي يدلّ عليه الدليل: <code>utf-8-sig</code> أو <code>utf-8</code> أو <code>cp1256</code>."
          },
          {
            en: "Compare the loaded text with a vocabulary you trust, such as the five city names: any other string means mojibake.",
            ar: "قارن النص المحمَّل بمفردات تثق بها، مثل أسماء المدن الخمس: أي سلسلة أخرى تعني حروفًا مشوّهة."
          },
          {
            en: "If unknown names remain, change <code>encoding=</code> and load again; never hide the problem with <code>encoding_errors=\"replace\"</code>.",
            ar: "إن بقيت أسماء غير معروفة فغيّر <code>encoding=</code> وحمّل من جديد؛ ولا تُخفِ المشكلة بـ<code>encoding_errors=\"replace\"</code>."
          }
        ],
        answer: [0, 1, 2, 3, 4],
        hint: {
          en: "Which steps produce information, and which steps need that information as an input? A check needs something to check.",
          ar: "أيّ الخطوات تُنتج معلومة، وأيّها يحتاج تلك المعلومة مدخلًا؟ والفحص يحتاج إلى شيء يفحصه."
        },
        explain: {
          en: "Evidence first, then a choice, then a test of the result. The first bytes and a strict UTF-8 decode classify the file (UTF-8 with a BOM, UTF-8 without, or 'not UTF-8'); only then does it make sense to choose <code>encoding=</code> and load. Loading cannot tell you the text is right, because mojibake loads without an error, so the vocabulary check must come after the load and it decides whether to go round again. The last step names the shortcut to avoid: <code>encoding_errors=\"replace\"</code> or <code>\"ignore\"</code> turns a loud failure into permanent damage. Trying encodings until one 'looks right' skips all of this.",
          ar: "الدليل أولًا، ثم الاختيار، ثم اختبار النتيجة. البايتات الأولى وفك UTF-8 الصارم يصنّفان الملف (UTF-8 مع BOM أو بدونها أو «ليس UTF-8»)، وبعد ذلك فقط يصير لاختيار <code>encoding=</code> والتحميل معنى. والتحميل لا يخبرك أن النص صحيح، فالحروف المشوّهة تُحمَّل بلا خطأ، ولذلك يأتي فحص المفردات بعد التحميل وهو الذي يقرّر هل تدور دورة أخرى. وتسمّي الخطوة الأخيرة الاختصار الذي يجب تجنّبه: يحوّل <code>encoding_errors=\"replace\"</code> أو <code>\"ignore\"</code> فشلًا عاليًا إلى تلف دائم. أما تجريب الترميزات حتى «يبدو» أحدها صحيحًا فيتجاوز هذا كله."
        }
      },

      /* ---------------------------------------------------------- 11 */
      {
        id: "t1l4q11", type: "fill", level: "easy",
        topics: ["t1-read-csv-layout", "t1-id-leading-zeros"],
        q: {
          en: "Fill in the three blanks so that the text without a header line loads as a 2 × 3 table, with the landlord IDs kept as text.",
          ar: "املأ الفراغات الثلاثة ليُحمَّل النص الذي لا سطر عناوين فيه جدولًا من 2 × 3، مع بقاء معرّفات الملّاك نصًّا."
        },
        code: code(
          "import io",
          "import pandas as pd",
          "",
          "body = \"0071,Abu Samir,3\\n0102,Um Khaled,1\\n\"          # no header line",
          "df = pd.read_csv(io.StringIO(body),",
          "                 ____1____=None,",
          "                 ____2____=[\"landlord_id\", \"name\", \"units\"],",
          "                 dtype={\"landlord_id\": ____3____})",
          "print(df.shape, df[\"landlord_id\"].tolist())            # (2, 3) ['0071', '0102']"
        ),
        blanks: [
          { accept: ["header"] },
          { accept: ["names"] },
          { accept: ["str", "\"string\"", "'string'", "\"str\"", "'str'", "object", "\"object\"", "'object'"] }
        ],
        hint: {
          en: "One argument says where the header row is (or that there is none); another supplies the column names. For the ID column, recall that an ID is a name, not a quantity.",
          ar: "أحد الوسيطين يقول أين سطر العناوين (أو أنه لا سطر)، والآخر يزوّد أسماء الأعمدة. وللمعرّف تذكّر أنه اسم لا كمّية."
        },
        explain: {
          en: "<code>header=None</code> says that the first line is data and <code>names=[...]</code> supplies the column names; without them the record <code>0071,Abu Samir,3</code> would become the column names and the table would silently have one row too few. <code>dtype={\"landlord_id\": str}</code> (or <code>\"string\"</code>) tells the reader at read time that the column is text, so 0071 stays 0071. By the time a later <code>astype(str)</code> runs the zeros are gone, and a merge on the ID matches nothing. Decide types at the reader, not after it.",
          ar: "يقول <code>header=None</code> إن السطر الأول بيانات، ويزوّد <code>names=[...]</code> أسماء الأعمدة؛ ودونهما يصير السجلّ <code>0071,Abu Samir,3</code> هو أسماء الأعمدة ويفقد الجدول صفًّا بصمت. ويخبر <code>dtype={\"landlord_id\": str}</code> (أو <code>\"string\"</code>) القارئ لحظة القراءة أن العمود نص، فيبقى 0071 كما هو. وحين يعمل <code>astype(str)</code> لاحقًا تكون الأصفار قد ضاعت، وأي دمج على المعرّف لا يطابق شيئًا. قرّر الأنواع عند القارئ لا بعده."
        }
      },

      /* ---------------------------------------------------------- 12 */
      {
        id: "t1l4q12", type: "multi", level: "medium",
        topics: ["t1-na-values"],
        q: {
          en: "A column of a CSV holds these six text cells, one per line. When you call <code>pd.read_csv</code> with no extra arguments, which of them become <code>NaN</code>? (Choose all that apply.)",
          ar: "يحتوي عمود في ملف CSV هذه الخلايا النصية الست، واحدة في كل سطر. حين تستدعي <code>pd.read_csv</code> دون أي وسيط إضافي، أيّها يصير <code>NaN</code>؟ (اختر كل ما ينطبق.)"
        },
        options: [
          { code: "-" },
          { code: "NA" },
          { code: "n.a." },
          { code: "null" },
          { code: "غير متوفر" },
          { code: "None" }
        ],
        answer: [1, 3, 5],
        hint: {
          en: "pandas has a fixed list of spellings that it treats as missing. A spelling that is obvious to a person is not necessarily on it.",
          ar: "لدى pandas قائمة ثابتة من الكتابات تعدّها مفقودة. وما هو بديهي للإنسان على أنه «غائب» ليس بالضرورة فيها."
        },
        explain: {
          en: "<code>NA</code>, <code>null</code> and <code>None</code> are on pandas' default list (so are <code>N/A</code>, <code>n/a</code>, <code>NULL</code>, <code>NaN</code>, <code>nan</code> and the empty cell). A dash, <code>n.a.</code> and غير متوفر ('not available') are not: they are ordinary strings, and one of them is enough to make a whole number column <code>object</code>, after which <code>sum()</code> glues the cells together instead of adding them. Name them with <code>na_values=[\"-\", \"n.a.\", \"غير متوفر\"]</code>. The opposite risk is real too: <code>None</code> is a legitimate answer in a generator column ('no generator'), and the default list turns it into NaN; <code>keep_default_na=False, na_values=[\"\"]</code> keeps it. Every NaN should mean exactly one thing.",
          ar: "<code>NA</code> و<code>null</code> و<code>None</code> على قائمة pandas الافتراضية (وكذلك <code>N/A</code> و<code>n/a</code> و<code>NULL</code> و<code>NaN</code> و<code>nan</code> والخلية الفارغة). أما الشرطة و<code>n.a.</code> و«غير متوفر» فليست عليها: هي سلاسل عادية، وواحدة منها تكفي لتجعل عمود أرقام كاملًا <code>object</code>، فتلصق <code>sum()</code> الخلايا بعضها ببعض بدل أن تجمعها. سمِّها بـ<code>na_values=[\"-\", \"n.a.\", \"غير متوفر\"]</code>. والخطر المقابل حقيقي أيضًا: <code>None</code> جواب مشروع في عمود generator («لا مولّد») وتحوّله القائمة الافتراضية إلى NaN؛ ويحفظه <code>keep_default_na=False, na_values=[\"\"]</code>. وكل NaN يجب أن تعني شيئًا واحدًا بالضبط."
        }
      },

      /* ---------------------------------------------------------- 13 */
      {
        id: "t1l4q13", type: "compare", level: "medium",
        topics: ["t1-csv-reader-recipe", "t1-parse-dates"],
        q: {
          en: "Both calls read the semicolon file correctly (30 rows, 7 columns, the area as <code>float64</code>). Which statement about them is correct?",
          ar: "يقرأ الاستدعاءان ملف الفاصلة المنقوطة قراءة صحيحة (30 صفًّا و7 أعمدة والمساحة <code>float64</code>). أيّ العبارات عنهما صحيحة؟"
        },
        codeA: code(
          "df = pd.read_csv(\"rental_listings_ar_semicolon.csv\",",
          "                 sep=\";\", decimal=\",\", encoding=\"utf-8-sig\")"
        ),
        codeB: code(
          "COLS = [\"listing_id\", \"city\", \"monthly_rent\", \"area_m2\",",
          "        \"rooms\", \"furnished\", \"listed_on\"]",
          "df = pd.read_csv(\"rental_listings_ar_semicolon.csv\",",
          "                 sep=\";\", decimal=\",\", encoding=\"utf-8-sig\",",
          "                 header=0, names=COLS,",
          "                 dtype={\"listing_id\": \"string\"},",
          "                 parse_dates=[\"listed_on\"])"
        ),
        options: [
          {
            en: "A is better: it is shorter, and a shorter call has fewer ways to go wrong when next month's export arrives, because every extra argument in B is one more assumption about the file.",
            ar: "أ أفضل: هو أقصر، والاستدعاء الأقصر فيه مواضع أقل للخطأ حين يصل تصدير الشهر القادم، لأن كل وسيط إضافي في ب افتراض آخر عن الملف."
          },
          {
            en: "They return the same table: <code>sep</code>, <code>decimal</code> and <code>encoding</code> change the data, while <code>names</code>, <code>dtype</code> and <code>parse_dates</code> only change how the table is labelled or displayed, never its values or types.",
            ar: "الجدولان واحد: <code>sep</code> و<code>decimal</code> و<code>encoding</code> تغيّر البيانات، أما <code>names</code> و<code>dtype</code> و<code>parse_dates</code> فتغيّر تسمية الجدول أو شكل عرضه فقط، لا قيمه ولا أنواعه."
          },
          {
            en: "B is better: ID kept as text, English column names, a real date column. But it is still fragile: a <code>-</code> written for a blank number next month turns both numeric columns into <code>object</code> without an error.",
            ar: "ب أفضل: المعرّف نصٌّ، والأعمدة بأسماء إنجليزية، والتاريخ عمود تاريخ حقيقي. لكنه ما زال هشًّا: شرطة <code>-</code> تُكتب للرقم الفارغ في الشهر القادم تحوّل العمودين الرقميين إلى <code>object</code> بلا خطأ."
          },
          {
            en: "B is better: with <code>dtype</code> and <code>parse_dates</code> in the call, pandas checks every value against them, so a bad row in next month's file would be rejected with an error instead of passing through.",
            ar: "ب أفضل: مع <code>dtype</code> و<code>parse_dates</code> في الاستدعاء تفحص pandas كل قيمة مقابلهما، فيُرفض أي صفّ سيّئ في ملف الشهر القادم بخطأ بدل أن يمرّ."
          }
        ],
        answer: 2,
        hint: {
          en: "List what A leaves wrong in the table (look at the ID, the dates and the headers), then ask what B still assumes about the file.",
          ar: "عدّد ما يتركه أ خاطئًا في الجدول (انظر إلى المعرّف والتواريخ والعناوين)، ثم اسأل: ماذا ما زال ب يفترضه عن الملف؟"
        },
        explain: {
          en: "Version 2 (A) fixes the layers that broke the load, namely separator, decimal mark and encoding, but it leaves <code>listing_id</code> an <code>int64</code> although an ID is a name, <code>listed_on</code> as text (so <code>.dt.month</code> would fail) and Arabic headers that no code written for the English file will match. Version 3 (B) closes all three. What it does not do is protect itself: it is written for this month's file, and a <code>-</code> in a number column, which is not on pandas' list of missing-value strings, turns <code>monthly_rent</code> and <code>area_m2</code> into <code>object</code> without an error (Version 4 adds <code>na_values=[\"-\"]</code> for that). B is not 'checking' anything: <code>parse_dates</code> silently gives up on a date that does not fit. And the tables differ: A's dates are text, B's are <code>datetime64[ns]</code>.",
          ar: "تصلح النسخة 2 (أ) الطبقات التي كسرت التحميل، أي الفاصل والعلامة العشرية والترميز، لكنها تترك <code>listing_id</code> من النوع <code>int64</code> مع أن المعرّف اسم، و<code>listed_on</code> نصًّا (فيفشل <code>.dt.month</code>)، وعناوين عربية لا يطابقها أي كود كُتب للملف الإنجليزي. وتسدّ النسخة 3 (ب) الثلاثة. لكنها لا تحمي نفسها: فهي مكتوبة لملف هذا الشهر، وشرطة <code>-</code> في عمود أرقام، وهي ليست في قائمة pandas للسلاسل المفقودة، تحوّل <code>monthly_rent</code> و<code>area_m2</code> إلى <code>object</code> بلا خطأ (والنسخة 4 تضيف <code>na_values=[\"-\"]</code> لهذا). وليس ب «يفحص» شيئًا: يتخلّى <code>parse_dates</code> بصمت حين لا يناسبه تاريخ. والجدولان مختلفان أيضًا: تواريخ أ نصوص، وتواريخ ب من النوع <code>datetime64[ns]</code>."
        }
      },

      /* ---------------------------------------------------------- 14 */
      {
        id: "t1l4q14", type: "complete", level: "easy",
        topics: ["t1-csv-reader-recipe", "t1-na-values"],
        q: {
          en: "Next month's export writes every blank number as <code>-</code>. Complete the call so that <code>monthly_rent</code> and <code>area_m2</code> load as <code>float64</code>, with their blanks as <code>NaN</code>.",
          ar: "يكتب تصدير الشهر القادم كل رقم فارغ شرطةً <code>-</code>. أكمل الاستدعاء ليُحمَّل <code>monthly_rent</code> و<code>area_m2</code> بنوع <code>float64</code> وتصير فراغاتهما <code>NaN</code>."
        },
        code: code(
          "df = pd.read_csv(\"rental_listings_ar_semicolon_next.csv\",",
          "                 sep=\";\", decimal=\",\", encoding=\"utf-8-sig\",",
          "                 header=0, names=COLS,",
          "                 dtype={\"listing_id\": \"string\"},",
          "                 parse_dates=[\"listed_on\"],",
          "                 ____)",
          "print(df[[\"monthly_rent\", \"area_m2\"]].dtypes.astype(str).tolist())   # ['float64', 'float64']"
        ),
        options: [
          { code: "errors=\"coerce\"" },
          { code: "na_values=[\"-\"]" },
          { code: "keep_default_na=False" },
          { code: "thousands=\"-\"" }
        ],
        answer: 1,
        solution: {
          code: "na_values=[\"-\"]",
          en: "Naming the marker is Version 4 of the reader recipe: one argument, and the new file is read like the old one.",
          ar: "تسمية الرمز هي النسخة 4 من وصفة القارئ: وسيط واحد، ويُقرأ الملف الجديد كما قُرئ القديم."
        },
        hint: {
          en: "Which argument lists extra strings that should count as missing? One of the options belongs to a different function.",
          ar: "أيّ وسيط يسرد سلاسل إضافية يجب أن تُعدّ مفقودة؟ وأحد الخيارات يخص دالة أخرى."
        },
        explain: {
          en: "A <code>-</code> is not on pandas' default list of missing-value strings, so one dash leaves the whole column as text, and Version 3 of the recipe fails silently on next month's file. <code>na_values=[\"-\"]</code> adds the marker: Version 4. <code>errors=\"coerce\"</code> is an argument of <code>pd.to_numeric</code> and <code>pd.to_datetime</code>; <code>read_csv</code> has none and raises <code>TypeError</code>. <code>keep_default_na=False</code> switches the default list off, which makes things worse, and <code>thousands=\"-\"</code> declares the dash to be a digit-grouping mark, which it never is. What Version 4 still leaves open: nothing checks that the recipe fits the file, so if the agency switches to <code>n.a.</code> next quarter the failure is silent again (the job of Lesson 6).",
          ar: "الشرطة ليست في قائمة pandas الافتراضية للسلاسل المفقودة، فتكفي شرطة واحدة لتترك العمود كله نصًّا، وتفشل النسخة 3 من الوصفة بصمت على ملف الشهر القادم. و<code>na_values=[\"-\"]</code> يضيف الرمز: النسخة 4. أما <code>errors=\"coerce\"</code> فوسيط في <code>pd.to_numeric</code> و<code>pd.to_datetime</code> وليس في <code>read_csv</code>، فيرفع <code>TypeError</code>. وأما <code>keep_default_na=False</code> فيوقف القائمة الافتراضية فيزيد الأمر سوءًا، وأما <code>thousands=\"-\"</code> فيعلن الشرطة علامة تجميع أرقام وهي ليست كذلك قط. وما تتركه النسخة 4 مفتوحًا: لا شيء يتحقق أن الوصفة تناسب الملف، فإن بدّلت الوكالة الرمز إلى <code>n.a.</code> في الربع القادم عاد الفشل صامتًا (وهذه مهمة الدرس 6)."
        }
      },

      /* ---------------------------------------------------------- 15 */
      {
        id: "t1l4q15", type: "tf", level: "easy",
        topics: ["t1-dayfirst-ambiguity", "t1-parse-dates", "t1-date-parsing-evolve"],
        q: {
          en: "The agency writes day/month/year, and these are the listings of 5, 6 and 7 April 2024. True or false: because the dtype is <code>datetime64[ns]</code>, the column now holds those three dates.",
          ar: "تكتب الوكالة يوم/شهر/سنة، وهذه إعلانات 5 و6 و7 أبريل 2024. صح أم خطأ: بما أن النوع هو <code>datetime64[ns]</code> فالعمود يحمل الآن هذه التواريخ الثلاثة."
        },
        code: code(
          "txt = \"listing_id,listed_on\\n2001,05/04/2024\\n2002,06/04/2024\\n2003,07/04/2024\\n\"",
          "df = pd.read_csv(io.StringIO(txt), parse_dates=[\"listed_on\"])",
          "print(df[\"listed_on\"].dtype)           # datetime64[ns]"
        ),
        truth: false,
        hint: {
          en: "What does pandas do with 05/04/2024 when nobody tells it which part is the day? And does a dtype say which month a date falls in?",
          ar: "ماذا تفعل pandas بالسلسلة 05/04/2024 حين لا يخبرها أحد أي جزء فيها هو اليوم؟ وهل يقول النوع في أي شهر يقع التاريخ؟"
        },
        explain: {
          en: "False. Without <code>dayfirst=True</code> or an exact format, pandas reads an ambiguous string month first, so the rows become 4 May, 4 June and 4 July. 4 May is a perfectly valid date, so nothing can raise, and the dtype is exactly the one you wanted, so every check that looks only at dtypes passes while every date is a month wrong. This is Version 1 of the date example; Version 2 adds <code>dayfirst=True</code>. A dtype says that a value is a date, not which date. When the source is not ISO, state the order in the reader (<code>dayfirst=True</code> or <code>format=\"%d/%m/%Y\"</code>) and look at real values, at least <code>min()</code> and <code>max()</code>.",
          ar: "خطأ. من دون <code>dayfirst=True</code> أو صيغة دقيقة تقرأ pandas السلسلة الملتبسة بالشهر أولًا، فتصير الصفوف 4 مايو و4 يونيو و4 يوليو. و4 مايو تاريخ صالح تمامًا فلا يمكن أن يُرفع خطأ، والنوع هو بالضبط الذي أردته فتنجح كل فحوص تنظر إلى الأنواع وحدها بينما كل تاريخ أخطأ بشهر. هذه النسخة 1 من مثال التواريخ، وتضيف النسخة 2 الوسيط <code>dayfirst=True</code>. النوع يقول إن القيمة تاريخ ولا يقول أي تاريخ هي. فحين لا يكون المصدر بصيغة ISO اذكر الترتيب في القارئ (<code>dayfirst=True</code> أو <code>format=\"%d/%m/%Y\"</code>) وانظر إلى القيم الفعلية، وأقلّه <code>min()</code> و<code>max()</code>."
        }
      },

      /* ---------------------------------------------------------- 16 */
      {
        id: "t1l4q16", type: "compare", level: "hard",
        topics: ["t1-date-parsing-evolve", "t1-dayfirst-ambiguity"],
        q: {
          en: "The later export is written day/month/year, but next to two good rows it holds a month-first row and an impossible day: <code>stray</code> has the rows <code>05/04/2024</code>, <code>04/13/2024</code>, <code>07/04/2024</code> and <code>31/04/2024</code>. Both programs run to the end. Which statement is correct?",
          ar: "التصدير اللاحق مكتوب يوم/شهر/سنة، لكن إلى جانب صفّين جيدين فيه صفّ بالشهر أولًا ويوم مستحيل: يحمل النص <code>stray</code> الصفوف <code>05/04/2024</code> و<code>04/13/2024</code> و<code>07/04/2024</code> و<code>31/04/2024</code>. ويعمل البرنامجان حتى النهاية. أيّ العبارات صحيحة؟"
        },
        codeA: code(
          "df = pd.read_csv(io.StringIO(stray), parse_dates=[\"listed_on\"], dayfirst=True)",
          "print(df[\"listed_on\"].dtype)"
        ),
        codeB: code(
          "raw = pd.read_csv(io.StringIO(stray), dtype={\"listed_on\": \"string\"})[\"listed_on\"]",
          "dates = pd.to_datetime(raw, format=\"%d/%m/%Y\", errors=\"coerce\")",
          "failed = dates.isna() & raw.notna()",
          "print(failed.sum(), \"of\", len(raw), \"failed:\", raw[failed].tolist())"
        ),
        options: [
          {
            en: "A is better: it stops the run at the first bad row instead of carrying on, which is exactly what a monthly feed needs, because a wrong date should never reach the table silently.",
            ar: "أ أفضل: يوقف التشغيل عند أول صفّ سيّئ بدل أن يواصل، وهذا بالضبط ما يحتاجه تصدير شهري، لأن التاريخ الخاطئ يجب ألا يصل إلى الجدول بصمت."
          },
          {
            en: "They behave alike: both turn the two bad rows into <code>NaT</code> and keep the two good dates as real datetimes, so the only difference is that B needs four lines for what A does in two.",
            ar: "يتصرفان تصرفًا واحدًا: كلاهما يحوّل الصفّين السيّئين إلى <code>NaT</code> ويُبقي التاريخين الجيدين تاريخين حقيقيين، فلا فرق إلا أن ب يحتاج أربعة أسطر لما يفعله أ في سطرين."
          },
          {
            en: "A is better: <code>dayfirst=True</code> is only a preference, so pandas falls back to month first for <code>04/13/2024</code> and reads it correctly as 13 April, while B throws that row away as <code>NaT</code>.",
            ar: "أ أفضل: <code>dayfirst=True</code> مجرد تفضيل، فترجع pandas إلى الشهر أولًا مع <code>04/13/2024</code> وتقرؤه قراءة صحيحة على أنه 13 أبريل، بينما يرمي ب ذلك الصفّ على أنه <code>NaT</code>."
          },
          {
            en: "B is better: A prints <code>object</code>, so even the two good rows stay text, with no warning; B keeps them as dates and names the two bad strings, but still leaves <code>NaT</code> in the table (counting is not stopping).",
            ar: "ب أفضل: يطبع أ <code>object</code>، فيبقى حتى الصفّان الجيدان نصًّا بلا تحذير؛ أما ب فيُبقيهما تاريخين ويسمّي السلسلتين السيّئتين، لكنه يترك <code>NaT</code> في الجدول (فالعدّ ليس إيقافًا)."
          }
        ],
        answer: 3,
        hint: {
          en: "Run A in your head on the whole column: what happens to the good rows when one row cannot be read the same way? Then ask what B tells you that A does not.",
          ar: "شغّل أ في رأسك على العمود كله: ماذا يحدث للصفوف الجيدة حين يتعذّر قراءة صفّ واحد بالطريقة نفسها؟ ثم اسأل: ماذا يقول لك ب مما لا يقوله أ؟"
        },
        explain: {
          en: "A is Version 2 of the date example. <code>parse_dates</code> tries to read the whole column in one format; when it meets <code>04/13/2024</code> (no thirteenth month) or <code>31/04/2024</code> (no 31 April) it gives up silently and leaves the column as <code>object</code>, so the two good rows are lost along with the bad ones. It does not stop the run, and <code>dayfirst=True</code> is a preference that neither rescues <code>04/13/2024</code> nor changes that. B is Version 3: it reads the column as text, converts with the one format the agency uses, lets unreadable strings become <code>NaT</code>, and counts the failures with <code>dates.isna() &amp; raw.notna()</code>: 2 of 4, both named. What B still leaves open: <code>NaT</code> values remain in the table until a validation step (Lesson 6) decides what to do with them.",
          ar: "أ هو النسخة 2 من مثال التواريخ. يحاول <code>parse_dates</code> قراءة العمود كله بصيغة واحدة؛ فإذا لقي <code>04/13/2024</code> (لا شهر ثالث عشر) أو <code>31/04/2024</code> (لا 31 أبريل) تخلّى بصمت وترك العمود <code>object</code>، فيضيع الصفّان الجيدان مع السيّئين. ولا يوقف التشغيل، و<code>dayfirst=True</code> مجرد تفضيل لا ينقذ <code>04/13/2024</code> ولا يغيّر ذلك. أما ب فهو النسخة 3: يقرأ العمود نصًّا، ويحوّله بالصيغة الوحيدة التي تستعملها الوكالة، ويدع السلاسل غير المقروءة تصير <code>NaT</code>، ويعدّ الإخفاقات بـ<code>dates.isna() &amp; raw.notna()</code>: 2 من 4 وكلتاهما مسمّاة. وما يتركه ب مفتوحًا: تبقى قيم <code>NaT</code> في الجدول حتى تقرّر خطوة تحقق (الدرس 6) ما يُفعل بها."
        }
      },

      /* ---------------------------------------------------------- 17 */
      {
        id: "t1l4q17", type: "mcq", level: "medium",
        topics: ["t1-mixed-date-formats", "t1-dayfirst-ambiguity"],
        q: {
          en: "What do these lines print, and what do they show about <code>format=\"mixed\"</code>?",
          ar: "ماذا تطبع هذه الأسطر، وماذا تبيّن عن <code>format=\"mixed\"</code>؟"
        },
        code: code(
          "col = pd.Series([\"2026-01-16\", \"03/04/2026\", \"2026-02-03\"])     # two formats in one column",
          "print(pd.to_datetime(col, format=\"mixed\").dt.month.tolist())",
          "print(pd.to_datetime(col, format=\"mixed\", dayfirst=True).dt.month.tolist())"
        ),
        options: [
          {
            en: "<code>ValueError</code> on the first call: <code>03/04/2026</code> does not match the format <code>%Y-%m-%d</code> inferred from the first value",
            ar: "<code>ValueError</code> في الاستدعاء الأول: لأن <code>03/04/2026</code> لا تطابق الصيغة <code>%Y-%m-%d</code> المستنتجة من القيمة الأولى"
          },
          {
            en: "<code>[1, 4, 2]</code> twice: from the ISO rows pandas works out that this source writes the day first",
            ar: "<code>[1, 4, 2]</code> مرتين: تستنتج pandas من صفوف ISO أن هذا المصدر يكتب اليوم أولًا"
          },
          {
            en: "<code>[1, 3, 2]</code> then <code>[1, 4, 2]</code>: every cell is guessed on its own, so the ambiguous one follows <code>dayfirst</code>",
            ar: "<code>[1, 3, 2]</code> ثم <code>[1, 4, 2]</code>: تُخمَّن كل خلية على حدة، فتتبع الخلية الملتبسة وسيط <code>dayfirst</code>"
          },
          {
            en: "<code>[1, 3, 2]</code> twice: <code>dayfirst</code> has no effect on a column parsed with <code>format=\"mixed\"</code>",
            ar: "<code>[1, 3, 2]</code> مرتين: لا أثر لـ<code>dayfirst</code> على عمود يُحلَّل بـ<code>format=\"mixed\"</code>"
          }
        ],
        answer: 2,
        hint: {
          en: "'Mixed' asks pandas to decide separately for every element. What could settle an element such as 03/04/2026?",
          ar: "تطلب «mixed» من pandas أن تقرّر لكل عنصر على حدة. فما الذي قد يحسم عنصرًا مثل 03/04/2026؟"
        },
        explain: {
          en: "<code>\"mixed\"</code> is not a format; it means 'decide again for every element'. The ISO cells (<code>2026-01-16</code>) have only one reading. <code>03/04/2026</code> is read month first unless you say <code>dayfirst=True</code>: the first list is <code>[1, 3, 2]</code> (3 March), the second <code>[1, 4, 2]</code> (3 April). Nothing in the column tells pandas what the sender meant, and there is no error or warning, so either result can be silently wrong. The <code>ValueError</code> option is what <code>pd.to_datetime(col)</code> does without <code>mixed</code>: it ties the column to the format of the first value and refuses the rest. So <code>\"mixed\"</code> is a rescue; the real cure for day/month ambiguity is an exact format, or a source that writes ISO dates.",
          ar: "الصيغة <code>\"mixed\"</code> ليست صيغة؛ معناها «قرّر من جديد لكل عنصر». فخلايا ISO (<code>2026-01-16</code>) لا تحتمل إلا قراءة واحدة. أما <code>03/04/2026</code> فتقرؤها pandas بالشهر أولًا ما لم تقل <code>dayfirst=True</code>: فأولى القائمتين <code>[1, 3, 2]</code> (3 مارس) وثانيتهما <code>[1, 4, 2]</code> (3 أبريل). ولا شيء في العمود يخبر pandas ما الذي قصده المرسل، ولا خطأ ولا تحذير، فقد يكون أي النتيجتين خاطئًا بصمت. وخيار <code>ValueError</code> هو ما تفعله <code>pd.to_datetime(col)</code> بلا <code>mixed</code>: تربط العمود بصيغة القيمة الأولى وترفض الباقي. فـ<code>\"mixed\"</code> إنقاذ، والعلاج الحقيقي لالتباس اليوم والشهر صيغة دقيقة أو مصدر يكتب تواريخ ISO."
        }
      },

      /* ---------------------------------------------------------- 18 */
      {
        id: "t1l4q18", type: "mcq", level: "easy",
        topics: ["t1-excel-sheets", "t1-excel-title-rows", "t1-excel-serial-dates"],
        q: {
          en: "The Raw sheet has three title rows above the header (one of them blank), then the header, then 40 listings. What does the program print?",
          ar: "في الورقة Raw ثلاثة أسطر عنوان فوق سطر العناوين (أحدها فارغ)، ثم سطر العناوين، ثم 40 إعلانًا. ماذا يطبع البرنامج؟"
        },
        code: code(
          "book = pd.ExcelFile(\"rental_listings.xlsx\")",
          "print(book.sheet_names)",
          "raw = pd.read_excel(book, sheet_name=\"Raw\", header=3)",
          "print(raw.shape)",
          "print(raw[\"listed_on\"].dtype, raw[\"listed_on\"].iloc[0])"
        ),
        options: [
          {
            code: "['Raw', 'Clean']\n(40, 7)\nint64 46038"
          },
          {
            code: "['Raw', 'Clean']\n(40, 7)\ndatetime64[ns] 2026-01-16 00:00:00"
          },
          {
            code: "['Raw', 'Clean']\n(41, 7)\nobject listed_on"
          },
          {
            code: "['Raw']\n(40, 7)\nint64 46038"
          }
        ],
        answer: 0,
        hint: {
          en: "Rows are counted from 0 and the blank row counts. And what does Excel store in a cell that is not formatted as a date?",
          ar: "تُعدّ الصفوف من 0 والصف الفارغ يُحسب. وماذا يخزّن Excel في خلية ليست بتنسيق تاريخ؟"
        },
        explain: {
          en: "<code>sheet_names</code> lists every tab, whichever sheet you read afterwards. <code>header=3</code> means that the header is the row with index 3, the fourth one, below the three title rows (the blank one counts), so the 40 listings come back as 40 rows with real names and numeric dtypes. But <code>listed_on</code> is <code>int64</code>: the Raw sheet stores its dates in General format, as serial numbers, and <code>read_excel</code> returns what is stored, not what Excel would display. 46038 is 16 January 2026 only after <code>pd.to_datetime(..., unit=\"D\", origin=\"1899-12-30\")</code>. The Clean sheet has date-formatted cells, and there <code>read_excel</code> does return real dates. The <code>(41, 7)</code> option is what <code>header=2</code> gives: the blank row becomes the header.",
          ar: "يسرد <code>sheet_names</code> كل التبويبات أيًّا كانت الورقة التي تقرؤها بعد ذلك. ويعني <code>header=3</code> أن العناوين في الصف ذي الفهرس 3، أي الرابع، تحت أسطر العنوان الثلاثة (والفارغ منها محسوب)، فتعود الإعلانات الأربعون أربعين صفًّا بأسمائها الحقيقية وأنواعها الرقمية. لكن <code>listed_on</code> من النوع <code>int64</code>: تخزّن الورقة Raw تواريخها بتنسيق General أي أرقامًا تسلسلية، وتعيد <code>read_excel</code> ما هو مخزَّن لا ما كان Excel سيعرضه. والعدد 46038 هو 16 يناير 2026 فقط بعد <code>pd.to_datetime(..., unit=\"D\", origin=\"1899-12-30\")</code>. أما الورقة Clean فخلاياها بتنسيق تاريخ، وهناك تعيد <code>read_excel</code> تواريخ حقيقية. وخيار <code>(41, 7)</code> هو ما يعطيه <code>header=2</code>: يصير الصف الفارغ هو العناوين."
        }
      },

      /* ---------------------------------------------------------- 19 */
      {
        id: "t1l4q19", type: "error", level: "hard",
        topics: ["t1-excel-serial-dates", "t1-excel-sheets"],
        q: {
          en: "The program prints <code>2026-01-11 2026-05-07</code> and then <code>False</code>, although the two sheets hold the same 40 listings. The printed dates look perfectly plausible. Click the line responsible.",
          ar: "يطبع البرنامج <code>2026-01-11 2026-05-07</code> ثم <code>False</code>، مع أن الورقتين تحملان الإعلانات الأربعين نفسها. والتاريخان المطبوعان يبدوان معقولين تمامًا. انقر السطر المسؤول."
        },
        code: code(
          "import pandas as pd",
          "",
          "raw = pd.read_excel(\"rental_listings.xlsx\", sheet_name=\"Raw\", header=3)",
          "raw[\"listed_on\"] = pd.to_datetime(raw[\"listed_on\"], unit=\"D\", origin=\"1900-01-01\")",
          "clean = pd.read_excel(\"rental_listings.xlsx\", sheet_name=\"Clean\")",
          "print(raw[\"listed_on\"].min().date(), raw[\"listed_on\"].max().date())",
          "print(raw.equals(clean))"
        ),
        answer: 4,
        solution: {
          code: "raw[\"listed_on\"] = pd.to_datetime(raw[\"listed_on\"], unit=\"D\", origin=\"1899-12-30\")",
          en: "Excel's serial dates count days from 1899-12-30; with that origin the two sheets agree and the program prints <code>True</code>.",
          ar: "تعدّ التواريخ التسلسلية في Excel الأيام من 1899-12-30؛ ومع هذه النقطة تتفق الورقتان ويطبع البرنامج <code>True</code>."
        },
        hint: {
          en: "Both printed dates fall in January and May 2026, so a plausibility check passes. What does the <code>False</code> say that a range cannot?",
          ar: "يقع التاريخان المطبوعان في يناير ومايو 2026 فينجح فحص المعقولية. فماذا تقول <code>False</code> مما لا يستطيع المدى قوله؟"
        },
        explain: {
          en: "Line 4. Excel's serial 1 is 1 January 1900, but Excel also counts a day that never existed (29 February 1900), so for modern dates the origin pandas needs is 1899-12-30 (serial 45321 is 30 January 2024, and 45322 the next day). With <code>origin=\"1900-01-01\"</code> every date lands two days late: 16 January becomes 18 January, and the range 2026-01-11 to 2026-05-07 still looks entirely plausible. Only an independent witness exposes it: the Clean sheet holds real dates, and <code>equals(clean)</code> is False. That is why Version 4 of the Raw-sheet example compares the sheets after converting, and why <code>min()</code> and <code>max()</code> are not enough: they catch the 1970 and 2096 mistakes, not a shift of days. Line 3 (<code>header=3</code>) is right; it is what gives 40 rows and seven named columns. Two sheets that agree prove the conversion, not the data.",
          ar: "السطر 4. الرقم التسلسلي 1 في Excel هو 1 يناير 1900، لكن Excel يعدّ أيضًا يومًا لم يوجد قط (29 فبراير 1900)، فتكون نقطة الأصل التي يحتاجها pandas للتواريخ الحديثة هي 1899-12-30 (فالرقم 45321 هو 30 يناير 2024، و45322 هو اليوم التالي). ومع <code>origin=\"1900-01-01\"</code> يتأخر كل تاريخ يومين: يصير 16 يناير هو 18 يناير، ويبقى المدى من 2026-01-11 إلى 2026-05-07 معقولًا تمامًا. ولا يكشف الخطأ إلا شاهد مستقل: فالورقة Clean تحمل تواريخ حقيقية، و<code>equals(clean)</code> تساوي False. ولهذا تقارن النسخة 4 من مثال الورقة Raw الورقتين بعد التحويل، ولهذا لا يكفي <code>min()</code> و<code>max()</code>: فهما يلتقطان خطأي 1970 و2096 لا إزاحة أيام. والسطر 3 (<code>header=3</code>) صحيح؛ وهو الذي يعطي 40 صفًّا وسبعة أعمدة مسمّاة. وورقتان متفقتان تثبتان التحويل لا البيانات."
        }
      },

      /* ---------------------------------------------------------- 20 */
      {
        id: "t1l4q20", type: "multi", level: "medium",
        topics: ["t1-excel-merged-formulas", "t1-id-leading-zeros"],
        q: {
          en: "Which of these statements about what <code>pd.read_excel</code> returns are true? (Choose all that apply.)",
          ar: "أيّ هذه العبارات عمّا تعيده <code>pd.read_excel</code> صحيحة؟ (اختر كل ما ينطبق.)"
        },
        options: [
          {
            en: "A cell that holds the number 71 with the number format <code>0000</code> (Excel displays <code>0071</code>) comes back as <code>'0071'</code> when you pass <code>dtype={\"landlord_id\": str}</code>.",
            ar: "الخلية التي تحمل العدد 71 بتنسيق الأرقام <code>0000</code> (فيعرض Excel <code>0071</code>) تعود <code>'0071'</code> حين تمرّر <code>dtype={\"landlord_id\": str}</code>."
          },
          {
            en: "When a city name is merged over two rows (<code>A3:A4</code>), the first row gets the name and the second row gets <code>NaN</code>.",
            ar: "حين يُدمج اسم مدينة على صفّين (<code>A3:A4</code>) يحصل الصف الأول على الاسم ويحصل الصف الثاني على <code>NaN</code>."
          },
          {
            en: "pandas recalculates every formula while it reads the sheet, so a stale stored result is never read.",
            ar: "تعيد pandas حساب كل معادلة أثناء قراءة الورقة، فلا تُقرأ أبدًا نتيجة مخزَّنة قديمة."
          },
          {
            en: "A formula such as <code>=A2*12</code>, written by a script that never opened Excel, comes back as <code>NaN</code>.",
            ar: "المعادلة مثل <code>=A2*12</code> التي كتبها سكربت لم يفتح Excel قط تعود <code>NaN</code>."
          },
          {
            en: "A text cell <code>\"0102\"</code> comes back as the number 102 unless <code>dtype</code> says otherwise.",
            ar: "الخلية النصية <code>\"0102\"</code> تعود العدد 102 ما لم يقل <code>dtype</code> غير ذلك."
          }
        ],
        answer: [1, 3, 4],
        hint: {
          en: "For each statement ask what the cell really stores (a number, a text, a formula with or without a stored result, a value with a merge) and remember that <code>read_excel</code> reads what is stored, not what the screen shows.",
          ar: "لكل عبارة اسأل ماذا تخزّن الخلية فعلًا (رقم، أو نص، أو معادلة بنتيجة مخزَّنة أو بدونها، أو قيمة مع دمج)، وتذكّر أن <code>read_excel</code> تقرأ ما هو مخزَّن لا ما تعرضه الشاشة."
        },
        explain: {
          en: "Merged cells: only the top cell holds the value, so the rest arrive as NaN (<code>ffill()</code> copies the name down, but only after you have checked that 'same as the cell above' is what the merge meant). Formulas: pandas never calculates, it reads the result that Excel stored beside the formula; a workbook written by a program that stored none gives NaN, and a stale stored result is read as it is, so the 'recalculates' option is false. Text cells: Excel keeps the kind of each cell, but <code>read_excel</code> converts digit-only text such as \"0102\" to a number, so an ID loses its zeros here as well unless you pass <code>dtype</code>. The first option is the trap: the cell stores 71 and <code>0000</code> is only how Excel displays it, so <code>dtype=str</code> returns <code>'71'</code> and no argument can bring the zeros back. The cure is upstream: store IDs as text cells.",
          ar: "الخلايا المدمجة: تحمل الخلية العليا القيمة وحدها، فتصل الباقية NaN (ويعمل <code>ffill()</code> على نسخ الاسم إلى الأسفل، لكن بعد أن تتأكد أن «مثل الخلية فوقها» هو ما قصده الدمج). المعادلات: لا تحسب pandas شيئًا أبدًا، إنها تقرأ النتيجة التي خزّنها Excel بجوار المعادلة؛ والدفتر الذي كتبه برنامج لم يخزّن نتيجة يعطي NaN، وتُقرأ النتيجة المخزَّنة القديمة كما هي، فخيار «تعيد الحساب» خاطئ. الخلايا النصية: يحفظ Excel نوع كل خلية، لكن <code>read_excel</code> تحوّل النص المكوّن من أرقام فقط مثل \"0102\" إلى عدد، فيفقد المعرّف أصفاره هنا أيضًا ما لم تمرّر <code>dtype</code>. والخيار الأول هو الفخ: تخزّن الخلية 71 و<code>0000</code> مجرد طريقة عرض في Excel، فيعيد <code>dtype=str</code> القيمة <code>'71'</code> ولا وسيط يعيد الأصفار. والعلاج عند المنبع: خزّن المعرّفات في خلايا نصية."
        }
      },

      /* ---------------------------------------------------------- 21 */
      {
        id: "t1l4q21", type: "ordercode", level: "medium",
        topics: ["t1-csv-write-roundtrip", "t1-check-after-load"],
        q: {
          en: "<code>RECIPE</code> and <code>check</code> (which reports missing, extra and wrongly typed columns) are already defined. Put the statements in an order that loads the file, checks the table exactly as the reader built it, adds a column, saves it safely and proves that the round trip changed nothing.",
          ar: "المتغيران <code>RECIPE</code> و<code>check</code> (التي تُبلغ عن الأعمدة الناقصة والزائدة وذات النوع الخاطئ) معرَّفان سلفًا. رتّب الأسطر ترتيبًا يحمّل الملف، ويفحص الجدول كما بناه القارئ تمامًا، ويضيف عمودًا، ثم يحفظه بأمان ويثبت أن الذهاب والعودة لم يغيّر شيئًا."
        },
        items: [
          { code: "import pandas as pd" },
          { code: "df = pd.read_csv(\"rental_listings_ar_semicolon.csv\", **RECIPE)" },
          { code: "print(check(df) or \"all columns as expected\")" },
          { code: "df[\"rent_per_room\"] = (df[\"monthly_rent\"] / df[\"rooms\"]).round(1)" },
          {
            code: "df.to_csv(\"out.csv\", index=False, sep=\";\", decimal=\",\", encoding=\"utf-8-sig\")"
          },
          {
            code: code(
              "back = pd.read_csv(\"out.csv\", sep=\";\", decimal=\",\", encoding=\"utf-8-sig\",",
              "                   dtype={\"listing_id\": \"string\"}, parse_dates=[\"listed_on\"])"
            )
          },
          { code: "pd.testing.assert_frame_equal(df, back)" }
        ],
        answer: [0, 1, 2, 3, 4, 5, 6],
        hint: {
          en: "Which statements create a name that a later statement uses? And should the check see the new column?",
          ar: "أيّ الأسطر ينشئ اسمًا يستعمله سطر لاحق؟ وهل ينبغي أن يرى الفحص العمود الجديد؟"
        },
        explain: {
          en: "The dependencies decide: <code>pd</code> first; <code>df</code> exists only after the read; <code>to_csv</code> needs the derived column; <code>back</code> needs the file that <code>to_csv</code> writes; <code>assert_frame_equal</code> needs both <code>df</code> and <code>back</code>. The one place that is a choice rather than a dependency is the check: it belongs right after the load and before any column is added, because <code>check</code> reports extra columns, so run after the new column it would complain about <code>rent_per_room</code>, and run before the read there is no <code>df</code>. Note that the read-back repeats what a CSV cannot carry (<code>dtype</code> for the ID, <code>parse_dates</code> for the date); without them the round trip fails, which is the point of running it.",
          ar: "الاعتماد بين الأسطر يحسم: <code>pd</code> أولًا؛ و<code>df</code> لا يوجد إلا بعد القراءة؛ ويحتاج <code>to_csv</code> إلى العمود المشتق؛ ويحتاج <code>back</code> إلى الملف الذي يكتبه <code>to_csv</code>؛ ويحتاج <code>assert_frame_equal</code> إلى <code>df</code> و<code>back</code> معًا. والموضع الوحيد الذي هو اختيار لا اعتماد هو الفحص: مكانه بعد التحميل مباشرة وقبل إضافة أي عمود، لأن <code>check</code> تُبلغ عن الأعمدة الزائدة، فلو شُغّلت بعد العمود الجديد لاشتكت من <code>rent_per_room</code>، ولو شُغّلت قبل القراءة لما وُجد <code>df</code>. ولاحظ أن القراءة الراجعة تكرّر ما لا يحمله CSV (<code>dtype</code> للمعرّف و<code>parse_dates</code> للتاريخ)؛ وبدونهما يفشل الذهاب والعودة، وهذا غرض تشغيله."
        }
      },

      /* ---------------------------------------------------------- 22 */
      {
        id: "t1l4q22", type: "complete", level: "medium",
        topics: ["t1-check-after-load"],
        q: {
          en: "This is Version 3 of the check-after-load example with one line missing. A new export has lost its <code>rooms</code> column and gained a <code>notes</code> column, and <code>check</code> must report both of these as well as any wrongly typed column. Which line completes it?",
          ar: "هذه النسخة 3 من مثال الفحص بعد التحميل وينقصها سطر واحد. فقد تصدير جديد عمود <code>rooms</code> وأضاف عمودًا اسمه <code>notes</code>، ويجب أن تُبلغ <code>check</code> عن هذين العمودين وعن أي عمود نوعه خاطئ. أيّ سطر يكمّلها؟"
        },
        code: code(
          "EXPECTED = {\"listing_id\": \"string\", \"city\": \"object\", \"monthly_rent\": \"float64\",",
          "            \"area_m2\": \"float64\", \"rooms\": \"int64\", \"furnished\": \"object\",",
          "            \"listed_on\": \"datetime64[ns]\"}",
          "",
          "def check(df):",
          "    actual = df.dtypes.astype(str).to_dict()",
          "    names = ____",
          "    return {c: (EXPECTED.get(c), actual.get(c)) for c in names",
          "            if EXPECTED.get(c) != actual.get(c)}"
        ),
        options: [
          { code: "list(EXPECTED) + [c for c in EXPECTED if c not in actual]" },
          { code: "list(actual) + [c for c in actual if c in EXPECTED]" },
          { code: "[c for c in EXPECTED if c in actual]" },
          { code: "list(EXPECTED) + [c for c in actual if c not in EXPECTED]" }
        ],
        answer: 3,
        solution: {
          code: "names = list(EXPECTED) + [c for c in actual if c not in EXPECTED]",
          en: "The expected names first, then any extra names found in the actual table: a missing column, an extra column and a wrong dtype all show up in one answer.",
          ar: "الأسماء المتوقعة أولًا ثم أي أسماء زائدة في الجدول الفعلي: فيظهر العمود الناقص والعمود الزائد والنوع الخاطئ في جواب واحد."
        },
        hint: {
          en: "Run it in your head on the new export: which names must the loop visit for <code>rooms</code> and for <code>notes</code> to be looked at at all?",
          ar: "شغّلها في رأسك على التصدير الجديد: أيّ الأسماء يجب أن تزورها الحلقة ليُنظر في <code>rooms</code> وفي <code>notes</code> أصلًا؟"
        },
        explain: {
          en: "The comprehension only looks at the names in <code>names</code>, so that list decides what <code>check</code> can see. The first option visits the expected names (the second part adds nothing new): it reports <code>rooms</code> (expected int64, actual None) but never looks at <code>notes</code>. The second visits the actual names: it reports <code>notes</code> (expected None, actual object) but never visits <code>rooms</code>. The intersection sees neither. Only the union, the expected names followed by any extra ones, covers a missing column, an extra column and a wrong dtype in one answer, and the result is empty when all is well, so it can gate a pipeline. That is what Version 2 (print the shape and dtypes) cannot do: it works only when a human reads the output and remembers what 'right' looks like. What Version 3 leaves open: it compares names and dtypes, not values, so a rent column of zeros passes.",
          ar: "لا تنظر الاستيعابية (comprehension) إلا في الأسماء الموجودة في <code>names</code>، فهذه القائمة هي ما تراه <code>check</code>. يزور الخيار الأول الأسماء المتوقعة (وجزؤه الثاني لا يضيف جديدًا): فيُبلغ عن <code>rooms</code> (المتوقع int64 والفعلي None) لكنه لا ينظر أبدًا في <code>notes</code>. ويزور الثاني الأسماء الفعلية: فيُبلغ عن <code>notes</code> (المتوقع None والفعلي object) لكنه لا يزور <code>rooms</code> أبدًا. والتقاطع لا يرى أيًّا منهما. والاتحاد وحده، أي الأسماء المتوقعة ثم أي أسماء زائدة، يغطي العمود الناقص والعمود الزائد والنوع الخاطئ في جواب واحد، والنتيجة فارغة حين يكون كل شيء سليمًا فيصلح أن تحرس خط المعالجة. وهذا ما لا تستطيعه النسخة 2 (طباعة الشكل والأنواع): فهي تعمل فقط حين يقرأ إنسان الناتج ويتذكر كيف يبدو «الصحيح». وما تتركه النسخة 3 مفتوحًا: تقارن الأسماء والأنواع لا القيم، فعمود إيجارات كلها أصفار يمرّ."
        }
      },

      /* ---------------------------------------------------------- 23 */
      {
        id: "t1l4q23", type: "contrast", level: "easy",
        topics: ["t1-csv-vs-excel"],
        q: {
          en: "Place each statement under CSV, under Excel (<code>.xlsx</code>), or under both.",
          ar: "ضع كل عبارة تحت CSV أو تحت Excel (<code>.xlsx</code>) أو تحت كليهما."
        },
        concepts: [
          {
            en: "CSV (.csv)",
            ar: "ملف CSV"
          },
          {
            en: "Excel (.xlsx)",
            ar: "ملف Excel"
          }
        ],
        rows: [
          {
            s: {
              en: "Keeps the kind of every cell (number, text, date), so a date-formatted cell can arrive as a real date",
              ar: "يحفظ نوع كل خلية (رقم أو نص أو تاريخ)، فقد تصل الخلية المنسَّقة تاريخًا تاريخًا حقيقيًّا"
            },
            a: 1
          },
          {
            s: {
              en: "Reading a big table into pandas is much faster",
              ar: "قراءة جدول كبير إلى pandas أسرع بكثير"
            },
            a: 0
          },
          {
            s: {
              en: "Can be compared line by line in version control",
              ar: "يمكن مقارنته سطرًا سطرًا في نظام التحكم بالإصدارات"
            },
            a: 0
          },
          {
            s: {
              en: "Can hold several tables, one per sheet, in a single file",
              ar: "يستطيع حمل عدة جداول، جدولًا لكل ورقة، في ملف واحد"
            },
            a: 1
          },
          {
            s: {
              en: "Typical traps: merged cells, dates stored as serial numbers, formulas whose result was never stored",
              ar: "مزالقه المعتادة: خلايا مدمجة وتواريخ مخزَّنة أرقامًا تسلسلية ومعادلات لم تُخزَّن نتيجتها"
            },
            a: 1
          },
          {
            s: {
              en: "An ID such as <code>0102</code> can arrive as the number 102 unless you pass <code>dtype</code>",
              ar: "قد يصل معرّف مثل <code>0102</code> العدد 102 ما لم تمرّر <code>dtype</code>"
            },
            a: 2
          },
          {
            s: {
              en: "A date may reach pandas as something other than a date (as text, or as a bare number)",
              ar: "قد يصل التاريخ إلى pandas وهو ليس تاريخًا (نصًّا أو رقمًا مجرّدًا)"
            },
            a: 2
          }
        ],
        hint: {
          en: "Think about what each format physically is (plain text, or a zip archive of XML) and which of the lesson's problems showed up with each.",
          ar: "فكّر ما هو كل من الصيغتين فعليًّا (نص عادي أم أرشيف مضغوط من ملفات XML)، وأيّ مشكلات الدرس ظهرت مع كل منهما."
        },
        explain: {
          en: "A CSV is plain text: nothing but characters, so it is fast to read and easy to compare line by line, and every type is a decision of the reader; its traps are the layers of Concepts 1 to 3 (delimiter, decimal mark, encoding). An <code>.xlsx</code> is a zip of XML: it keeps a kind per cell, can hold several sheets and is the right container when a person will read, annotate or chart the data, but pandas reads it tens of times slower (2.18 s against 0.06 s for 18,000 rows in the lesson) and it brings its own traps (title rows, merged cells, serial dates, stored formula results). Two problems belong to neither format but to the reader: an ID like 0102 becomes 102 in both unless <code>dtype</code> says otherwise, and a date arrives as text (CSV) or as a bare serial number (Excel, General format). The verdict is not a winner: CSV between programs and organisations, Excel when a human is the reader.",
          ar: "ملف CSV نصّ عادي: حروف فقط، فهو سريع القراءة ويسهل مقارنته سطرًا سطرًا، وكل نوع فيه قرار من القارئ؛ ومزالقه هي طبقات المفاهيم من 1 إلى 3 (الفاصل والعلامة العشرية والترميز). أما ملف <code>.xlsx</code> فأرشيف مضغوط من XML: يحفظ نوعًا لكل خلية، ويستطيع حمل عدة أوراق، وهو الوعاء الصحيح حين سيقرأ إنسان البيانات أو يعلّق عليها أو يرسمها، لكن pandas تقرؤه أبطأ بعشرات المرات (2.18 ثانية مقابل 0.06 لـ18,000 صف في الدرس) وله مزالقه الخاصة (أسطر العنوان والخلايا المدمجة والتواريخ التسلسلية ونتائج المعادلات المخزَّنة). ومشكلتان لا تخصّان صيغة بعينها بل القارئ: المعرّف مثل 0102 يصير 102 في الصيغتين ما لم يقل <code>dtype</code> غير ذلك، والتاريخ يصل نصًّا (CSV) أو رقمًا تسلسليًّا مجرّدًا (Excel بتنسيق General). والحكم ليس فائزًا واحدًا: CSV بين البرامج والمؤسسات، وExcel حين يكون القارئ إنسانًا."
        }
      },

      /* ---------------------------------------------------------- 24 */
      {
        id: "t1l4q24", type: "write", level: "hard",
        topics: ["t1-csv-reader-recipe", "t1-na-values", "t1-encoding-basics"],
        q: {
          en: "The agency's file <code>landlords.csv</code> was exported on an old Windows computer: its Arabic text is encoded in cp1256, fields are separated by semicolons, the <code>deposit</code> column uses a decimal comma and a <code>-</code> for 'unknown', and the <code>since</code> column holds dates written day/month/year. Values of <code>landlord_id</code> such as <code>0071</code> must keep their zeros. Write one <code>pd.read_csv</code> call that gives <code>landlord_id</code> as text, <code>deposit</code> as <code>float64</code> with the dashes as <code>NaN</code>, and <code>since</code> as real dates read day first.",
          ar: "ملف الوكالة <code>landlords.csv</code> مُصدَّر من حاسوب ويندوز قديم: نصه العربي مرمَّز بـcp1256، وحقوله مفصولة بفاصلة منقوطة، وعمود <code>deposit</code> يستعمل فاصلة عشرية وشرطة <code>-</code> بمعنى «غير معروف»، وعمود <code>since</code> فيه تواريخ مكتوبة يوم/شهر/سنة. ويجب أن تحتفظ قيم <code>landlord_id</code> مثل <code>0071</code> بأصفارها. اكتب استدعاء <code>pd.read_csv</code> واحدًا يعطي <code>landlord_id</code> نصًّا، و<code>deposit</code> من النوع <code>float64</code> مع صيرورة الشرطات <code>NaN</code>، و<code>since</code> تواريخ حقيقية مقروءة باليوم أولًا."
        },
        starter: code(
          "import pandas as pd",
          "",
          "# your code here"
        ),
        lines: 9,
        checks: [
          {
            re: "^(?=.*read_csv\\s*\\()(?=.*sep\\s*=\\s*[\"\\'];[\"\\'])(?=.*decimal\\s*=\\s*[\"\\'],[\"\\'])",
            label: {
              en: "<code>pd.read_csv</code> with the separator <code>sep=\";\"</code> and the decimal mark <code>decimal=\",\"</code>",
              ar: "<code>pd.read_csv</code> مع الفاصل <code>sep=\";\"</code> والعلامة العشرية <code>decimal=\",\"</code>"
            }
          },
          {
            re: "encoding\\s*=\\s*[\"\\'](cp1256|windows-1256)[\"\\']",
            flags: "i",
            label: {
              en: "Name the encoding: <code>encoding=\"cp1256\"</code>",
              ar: "سمِّ الترميز: <code>encoding=\"cp1256\"</code>"
            }
          },
          {
            re: "dtype\\s*=\\s*\\{[^}]*[\"\\']landlord_id[\"\\']\\s*:\\s*(str\\b|object\\b|[\"\\'](str|string|object)[\"\\'])",
            label: {
              en: "Read the ID as text at read time: <code>dtype={\"landlord_id\": \"string\"}</code>",
              ar: "اقرأ المعرّف نصًّا عند القراءة: <code>dtype={\"landlord_id\": \"string\"}</code>"
            }
          },
          {
            re: "na_values\\s*=\\s*\\[?\\s*[\"\\']-[\"\\']",
            label: {
              en: "Name the missing-value marker: <code>na_values=[\"-\"]</code>",
              ar: "سمِّ رمز القيمة المفقودة: <code>na_values=[\"-\"]</code>"
            }
          },
          {
            re: "^(?=.*parse_dates\\s*=\\s*\\[?\\s*[\"\\']since[\"\\'])(?=.*(dayfirst\\s*=\\s*True|date_format\\s*=\\s*[\"\\']%d/%m/%Y[\"\\']))",
            label: {
              en: "Parse <code>since</code> as dates, day first: <code>parse_dates=[\"since\"]</code> with <code>dayfirst=True</code>",
              ar: "حلّل <code>since</code> تواريخَ باليوم أولًا: <code>parse_dates=[\"since\"]</code> مع <code>dayfirst=True</code>"
            }
          }
        ],
        forbid: [
          {
            re: "\\.astype\\s*\\(",
            label: {
              en: "<code>astype</code> after the read (the zeros are already gone: say it to the reader)",
              ar: "<code>astype</code> بعد القراءة (فقد ضاعت الأصفار: قلها للقارئ)"
            }
          },
          {
            re: "encoding_errors\\s*=",
            label: {
              en: "<code>encoding_errors</code> (it hides the problem instead of naming the encoding)",
              ar: "<code>encoding_errors</code> (يُخفي المشكلة بدل أن يسمّي الترميز)"
            }
          }
        ],
        solution: {
          code: code(
            "import pandas as pd",
            "",
            "landlords = pd.read_csv(\"landlords.csv\",",
            "                        sep=\";\", decimal=\",\", encoding=\"cp1256\",",
            "                        dtype={\"landlord_id\": \"string\"},",
            "                        na_values=[\"-\"],",
            "                        parse_dates=[\"since\"], dayfirst=True)"
          ),
          out: "landlord_id string, name object, deposit float64, since datetime64[ns]",
          en: "Every fact about the file becomes one argument: separator, decimal mark, encoding, the ID as text, the marker for 'unknown', and the date column read day first.",
          ar: "كل حقيقة عن الملف تصير وسيطًا: الفاصل والعلامة العشرية والترميز والمعرّف نصًّا ورمز «غير معروف» وعمود التاريخ مقروءًا باليوم أولًا."
        },
        hint: {
          en: "Go through the description sentence by sentence: each fact about the file becomes one argument of <code>read_csv</code>.",
          ar: "اذهب مع الوصف جملةً جملة: كل حقيقة عن الملف تصير وسيطًا في <code>read_csv</code>."
        },
        explain: {
          en: "Each observation about the file becomes one argument, and none can be left to a default. <code>sep=\";\"</code> (otherwise one column); <code>decimal=\",\"</code> (otherwise <code>deposit</code> is text); <code>encoding=\"cp1256\"</code> (the bytes are not UTF-8, so <code>utf-8</code> raises <code>UnicodeDecodeError</code>, and latin-1 would give mojibake with no error at all); <code>dtype={\"landlord_id\": \"string\"}</code> (an ID is a name, and an <code>astype</code> after the load comes too late for 0071); <code>na_values=[\"-\"]</code> (a dash is not on the default list, so it would turn <code>deposit</code> into <code>object</code>); and <code>parse_dates=[\"since\"]</code> with <code>dayfirst=True</code> (otherwise 05/04/2024 is read as 4 May). Afterwards print <code>dtypes</code> and the <code>min()</code> and <code>max()</code> of <code>since</code>: the recipe is correct only for the file you wrote it for.",
          ar: "كل ملاحظة عن الملف تصير وسيطًا، ولا شيء منها يُترك لقيمة افتراضية. <code>sep=\";\"</code> (وإلا عمود واحد)؛ و<code>decimal=\",\"</code> (وإلا بقي <code>deposit</code> نصًّا)؛ و<code>encoding=\"cp1256\"</code> (فالبايتات ليست UTF-8، فيرفع <code>utf-8</code> الخطأ <code>UnicodeDecodeError</code>، ويعطي latin-1 حروفًا مشوّهة بلا أي خطأ)؛ و<code>dtype={\"landlord_id\": \"string\"}</code> (المعرّف اسم، وأي <code>astype</code> بعد التحميل يأتي متأخرًا على 0071)؛ و<code>na_values=[\"-\"]</code> (فالشرطة ليست في القائمة الافتراضية، فكانت ستجعل <code>deposit</code> من النوع <code>object</code>)؛ و<code>parse_dates=[\"since\"]</code> مع <code>dayfirst=True</code> (وإلا قُرئت 05/04/2024 على أنها 4 مايو). وبعد ذلك اطبع <code>dtypes</code> و<code>min()</code> و<code>max()</code> لـ<code>since</code>: فالوصفة صحيحة للملف الذي كُتبت له فقط."
        }
      }

    ]
  };
})();
