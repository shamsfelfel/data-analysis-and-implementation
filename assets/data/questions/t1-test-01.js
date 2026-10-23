/* Question bank for Theory Chapter 1, Lesson 1 (The Three Shapes of Data).
   24 questions; every answer was verified against Python 3.13 / pandas 2.2.3. ES5 only. */
window.DABanks = window.DABanks || {};
window.DABanks["t1-test-01"] = {
  title: { en: "Test 1 — The Three Shapes of Data", ar: "اختبار 1 — أشكال البيانات الثلاثة" },
  intro: {
    en: "24 questions on Lesson 1: telling a table, a self-describing document and raw content apart; bringing each into Python; and pulling fields out of free text without silent errors. Allow about 40 minutes. Every question has a hint, an explanation and the answer, all hidden until you ask for them, so try first.",
    ar: "24 سؤالًا عن الدرس 1: التمييز بين الجدول والمستند الذي يصف نفسه والمحتوى الخام، وإدخال كل منها إلى بايثون، واستخراج الحقول من نص حر دون أخطاء صامتة. خصّص نحو 40 دقيقة. لكل سؤال تلميح وتفسير وجواب، وكلها مخفية حتى تطلبها، فجرّب أولًا."
  },
  questions: [
    {
      id: "t1l1q01",
      type: "tf",
      level: "easy",
      topics: ["t1-record-field-schema", "t1-structured-table"],
      q: {
        en: "A CSV file's header row is a complete schema: it fixes the column names, the type of each column and which columns may be left empty.",
        ar: "صف العناوين في ملف CSV مخطط كامل: فهو يحدد أسماء الأعمدة ونوع كل عمود وأي الأعمدة يجوز تركه فارغًا."
      },
      truth: false,
      hint: {
        en: "Put the header row of rental_listings.csv next to the definition of a database table. Which of the three things in the claim does each one actually state?",
        ar: "ضع صف العناوين في rental_listings.csv إلى جانب تعريف جدول في قاعدة بيانات. أيّ الأشياء الثلاثة في العبارة يذكرها كل منهما فعلًا؟"
      },
      explain: {
        en: "False. A CSV header gives names and nothing else: <code>read_csv</code> has to guess every type (which is how a phone number loses its leading zero), and nothing stops a text value or a blank in any column. A database table declares names, types and rules and enforces them on every new row. The header looks like a declaration, which is the tempting part, but an agreement that nobody enforces is only a label. Rule to keep: with a CSV, check the types and the blanks yourself.",
        ar: "خطأ. صف عناوين CSV يعطي الأسماء فقط: على <code>read_csv</code> أن يخمّن كل نوع (وهكذا يفقد رقم الهاتف صفره الأول)، ولا شيء يمنع نصًّا أو خانة فارغة في أي عمود. أما جدول قاعدة البيانات فيعلن الأسماء والأنواع والقواعد ويفرضها على كل صف جديد. يبدو صف العناوين تصريحًا، وهذا هو الجزء المغري، لكن اتفاقًا لا يفرضه أحد ليس إلا لافتة. القاعدة: مع CSV افحص الأنواع والفراغات بنفسك."
      }
    },
    {
      id: "t1l1q02",
      type: "match",
      level: "easy",
      topics: ["t1-record-field-schema", "t1-semi-structured"],
      q: {
        en: "In schools.json, match each description to the word the lesson uses for it.",
        ar: "في schools.json، وصّل كل وصف بالكلمة التي يسمّيه بها الدرس."
      },
      leftHead: { en: "Description", ar: "الوصف" },
      rightHead: { en: "Word", ar: "الكلمة" },
      pairs: [
        {
          l: {
            en: "One school: a whole <code>{…}</code> object inside <code>results</code>",
            ar: "مدرسة واحدة: كائن <code>{…}</code> كامل داخل <code>results</code>"
          },
          r: { en: "record", ar: "سجل (record)" }
        },
        {
          l: { en: "One fact about a school, such as its governorate", ar: "معلومة واحدة عن المدرسة، مثل محافظتها" },
          r: { en: "field", ar: "حقل (field)" }
        },
        {
          l: {
            en: "The agreement: a school has a name, a governorate and an enrolment; contacts are optional",
            ar: "الاتفاق: للمدرسة اسم ومحافظة وأعداد طلبة، وجهات الاتصال اختيارية"
          },
          r: { en: "schema", ar: "مخطط (schema)" }
        },
        {
          l: {
            en: "The key names that travel inside every school object",
            ar: "أسماء المفاتيح التي تسافر داخل كل كائن مدرسة"
          },
          r: { en: "metadata", ar: "بيانات وصفية (metadata)" }
        }
      ],
      hint: {
        en: "Think of the three words for taking a dataset apart: the one thing, one fact about it, and the agreement on the fields. Then ask what kind of data the key names themselves are.",
        ar: "فكّر في الكلمات الثلاث لتفكيك مجموعة بيانات: الشيء الواحد، والمعلومة الواحدة عنه، والاتفاق على الحقول. ثم اسأل أي نوع من البيانات هي أسماء المفاتيح نفسها."
      },
      explain: {
        en: "The object of school 203 is a record; <code>governorate</code> is a field (a key); the agreement about which fields exist, their types and which may be missing is the schema. The keys themselves are metadata, data about the data: in a table the field names are written once in the header, here they are repeated inside every record. The commonest slip is to mix up record and field: a nested object such as <code>enrolment</code> is a field of the school whose value happens to be an object.",
        ar: "الكائن الذي يمثل المدرسة 203 سجل؛ و<code>governorate</code> حقل (مفتاح)؛ أما الاتفاق على أي الحقول موجودة وأنواعها وأيها يجوز أن يغيب فهو المخطط. والمفاتيح نفسها بيانات وصفية (metadata)، أي بيانات عن البيانات: ففي الجدول تُكتب أسماء الحقول مرة واحدة في الترويسة، وهنا تتكرر داخل كل سجل. وأشيع خلط هو بين السجل والحقل: فالكائن المتداخل مثل <code>enrolment</code> حقل في المدرسة قيمته كائن."
      }
    },
    {
      id: "t1l1q03",
      type: "output",
      level: "medium",
      lang: "python",
      topics: ["t1-wrong-loader-silent", "t1-three-loaders"],
      q: {
        en: "Three adverts, one per line, are read with <code>read_csv</code>. Write exactly what the program prints.",
        ar: "تُقرأ ثلاثة إعلانات، إعلان في كل سطر، بـ <code>read_csv</code>. اكتب بالضبط ما يطبعه البرنامج."
      },
      code: [
          "import io",
          "import pandas as pd",
          "",
          "text = (\"Flat in Rafah, 3 rooms, 95 m2\\n\"",
          "        \"Studio in Gaza, 1 room, 30 m2\\n\"",
          "        \"Annex in Jabalia, 1 room, 28 m2\\n\")",
          "",
          "df = pd.read_csv(io.StringIO(text))",
          "print(df.shape)",
          "print(df.columns[0])",
          "print(df.iloc[0, 0])"
        ].join("\n"),
      blanks: [
        {
          accept: ["(2, 3)\nFlat in Rafah\nStudio in Gaza", "(2,3)\nFlat in Rafah\nStudio in Gaza"],
          lines: 3
        }
      ],
      hint: {
        en: "Which line does <code>read_csv</code> always use for the column names, and what is left over as data?",
        ar: "أي سطر يعدّه <code>read_csv</code> دائمًا صف أسماء الأعمدة، وماذا يبقى بيانات؟"
      },
      explain: {
        en: "<code>read_csv</code> takes line 1 as the header, so the first advert is not data: it becomes three column names. Two adverts remain as rows, giving the shape <code>(2, 3)</code>; the first column is called <code>Flat in Rafah</code> and the first data row starts with <code>Studio in Gaza</code>. Nothing fails, which is the danger: it is the same mechanism that turned the eight adverts of adverts_sample.txt into a (7, 5) table. Rule: a loader that does not crash proves nothing; read the first lines and check the shape and the columns.",
        ar: "يأخذ <code>read_csv</code> السطر 1 صف عناوين، فالإعلان الأول ليس بيانات: يصير ثلاثة أسماء أعمدة. ويبقى إعلانان صفين، فيكون الشكل <code>(2, 3)</code>؛ واسم العمود الأول <code>Flat in Rafah</code>، وأول صف بيانات يبدأ بـ <code>Studio in Gaza</code>. لا شيء يفشل، وهذا هو الخطر: فهي الآلية نفسها التي حوّلت إعلانات adverts_sample.txt الثمانية إلى جدول (7, 5). القاعدة: المحمِّل الذي لا ينهار لا يثبت شيئًا؛ اقرأ أول الأسطر وافحص الشكل والأعمدة."
      }
    },
    {
      id: "t1l1q04",
      type: "compare",
      level: "medium",
      lang: "python",
      topics: ["t1-lists-to-dataframe"],
      q: {
        en: "Both versions receive the same lists. Listing 1002 was withdrawn, but its area stayed in the list (four areas for three listings). Which statement is true?",
        ar: "تتلقى النسختان القوائم نفسها. سُحب الإعلان 1002 لكن مساحته بقيت في القائمة (أربع مساحات لثلاثة إعلانات). أي عبارة صحيحة؟"
      },
      codeA: [
          "ids   = [1001, 1003, 1004]",
          "areas = [119.2, 115.7, 126.7, 109.2]",
          "",
          "for i in range(len(ids)):",
          "    print(ids[i], areas[i])"
        ].join("\n"),
      codeB: [
          "import pandas as pd",
          "",
          "ids   = [1001, 1003, 1004]",
          "areas = [119.2, 115.7, 126.7, 109.2]",
          "",
          "data = {\"id\": ids, \"area_m2\": areas}",
          "table = pd.DataFrame(data)",
          "print(table)"
        ].join("\n"),
      options: [
        {
          en: "Neither is better: B's crash throws away the three good listings, which A at least keeps on printing for you.",
          ar: "لا أفضلية لإحداهما: انهيار ب يضيّع الإعلانات الثلاثة السليمة، بينما تواصل أ طباعتها لك على الأقل."
        },
        {
          en: "A is more robust: it keeps running and prints a row for every listing, while B stops and gives the reader nothing at all.",
          ar: "النسخة أ أمتن: تواصل العمل وتطبع صفًّا لكل إعلان، بينما تتوقف النسخة ب ولا تعطي القارئ شيئًا على الإطلاق."
        },
        {
          en: "B is better: the mismatch stops the program when the table is built, while A prints plausible rows with wrong areas and says nothing.",
          ar: "النسخة ب أفضل: يتوقف البرنامج لحظة بناء الجدول، بينما تطبع النسخة أ صفوفًا معقولة المظهر بمساحات خاطئة ولا تقول شيئًا."
        },
        {
          en: "B is better because a DataFrame also checks that each area is a sensible number for the listing it is attached to.",
          ar: "النسخة ب أفضل لأن الـ DataFrame يتحقق أيضًا من أن كل مساحة رقم معقول للإعلان الذي ترتبط به."
        }
      ],
      answer: 2,
      solution: {
        out: "A:\n1001 119.2\n1003 115.7\n1004 126.7\n\nB:\nValueError: All arrays must be of the same length",
        en: "A pairs 1003 with 115.7 (its real area is 126.7) and 1004 with 126.7 (real: 109.2), without a warning. B refuses to build the table.",
        ar: "تقرن أ الإعلان 1003 بالمساحة 115.7 (ومساحته الحقيقية 126.7) والإعلان 1004 بـ 126.7 (والحقيقية 109.2) دون أي تحذير. وترفض ب بناء الجدول."
      },
      hint: {
        en: "Write down by hand which area A prints next to each id, and compare it with the real areas of those listings.",
        ar: "اكتب بيدك أي مساحة تطبعها أ بجانب كل معرّف، وقارنها بالمساحات الحقيقية لتلك الإعلانات."
      },
      explain: {
        en: "A is the parallel lists of Version 1: the link between a listing and its area is only \"same position\", so the extra value shifts every area after the first one without a sound (1003 is shown with 115.7 although its area is 126.7). B, the DataFrame of Version 3, insists on equal lengths and fails loudly at once with a ValueError. The first option is tempting because it mistakes \"does not crash\" for \"robust\"; the second weighs three good listings against wrong data, but A's rows are not good: wrong numbers are worse than none. The last option overstates what a DataFrame does: it checks the shape, not the values (text in a rent column is accepted, and the max of \"590\", \"1200\" and \"95\" is \"95\").",
        ar: "النسخة أ هي القوائم المتوازية في النسخة 1: الصلة بين الإعلان ومساحته هي «الموضع نفسه» فقط، فتزيح القيمة الزائدة كل مساحة بعد الأولى بصمت (يظهر الإعلان 1003 بمساحة 115.7 مع أن مساحته 126.7). أما النسخة ب (الـ DataFrame في النسخة 3) فتشترط تساوي الأطوال وتفشل بصوت مسموع فورًا بخطأ ValueError. والخيار الثاني مغرٍ لأنه يخلط بين «لا ينهار» و«متين»؛ والأول يزن ثلاثة إعلانات سليمة مقابل بيانات مغلوطة، لكن صفوف أ ليست سليمة: الأرقام الخاطئة أسوأ من لا شيء. والخيار الأخير يبالغ فيما يفعله DataFrame: فهو يتحقق من الشكل لا من القيم (يقبل نصًّا في عمود الإيجار، وأكبر قيمة بين \"590\" و\"1200\" و\"95\" هي \"95\")."
      }
    },
    {
      id: "t1l1q05",
      type: "error",
      level: "medium",
      lang: "python",
      topics: ["t1-lists-to-dataframe", "t1-structured-table"],
      q: {
        en: "This program ends with <code>KeyError: 'rent'</code>. Click the line that has to be fixed: the cause, not the place where the crash is reported.",
        ar: "ينتهي هذا البرنامج بالخطأ <code>KeyError: 'rent'</code>. انقر السطر الذي يجب إصلاحه: السبب لا الموضع الذي يُبلَّغ فيه عن الانهيار."
      },
      code: [
          "listings = [",
          "    {\"id\": 1001, \"city\": \"Khan Younis\", \"rent\": 415},",
          "    {\"id\": 1002, \"city\": \"Gaza\",        \"rent\": 445},",
          "    {\"id\": 1003, \"city\": \"Gaza\",        \"rent\": 590},",
          "]",
          "",
          "listings.append({\"id\": 1004, \"city\": \"Rafah\", \"rnet\": 285})",
          "",
          "total = 0",
          "for d in listings:",
          "    total += d[\"rent\"]",
          "print(\"total rent:\", total)"
        ].join("\n"),
      answer: 7,
      skip: [6, 8],
      solution: {
        code: "listings.append({\"id\": 1004, \"city\": \"Rafah\", \"rent\": 285})",
        en: "Line 7 is the cause: the key is misspelled (<code>rnet</code>). The crash is reported on line 11, but changing line 11, for example to <code>d.get(\"rent\", 0)</code>, would only hide the typo and produce a wrong total.",
        ar: "السطر 7 هو السبب: كُتب المفتاح خطأً (<code>rnet</code>). يُبلَّغ عن الانهيار في السطر 11، لكن تعديل السطر 11، مثلًا إلى <code>d.get(\"rent\", 0)</code>، لا يفعل إلا إخفاء الخطأ المطبعي وإعطاء مجموع خاطئ."
      },
      hint: {
        en: "The traceback names the line where Python gave up. Ask which line created a record that does not have the key.",
        ar: "يذكر التتبّع السطر الذي استسلمت عنده بايثون. اسأل أي سطر صنع سجلًّا لا يحمل المفتاح."
      },
      explain: {
        en: "The crash is reported on line 11, but line 11 is correct: it asks for a key that every record is supposed to have. The cause is line 7, where the new record was written with the key <code>rnet</code>, and a list of dicts accepted it without a murmur. That is the weakness of Version 2: nothing says that all the dicts share the same keys, so the error appears far from its cause. Changing line 11 to <code>d.get(\"rent\", 0)</code> would be worse: the program would finish and announce a total that silently leaves out 285.",
        ar: "يُبلَّغ عن الانهيار في السطر 11، لكنه صحيح: فهو يطلب مفتاحًا يُفترض أن يحمله كل سجل. والسبب هو السطر 7 حيث كُتب السجل الجديد بالمفتاح <code>rnet</code>، وقبلته قائمة القواميس دون همس. وهذا ضعف النسخة 2: لا شيء يقول إن القواميس كلها تحمل المفاتيح نفسها، فيظهر الخطأ بعيدًا عن سببه. وتعديل السطر 11 إلى <code>d.get(\"rent\", 0)</code> أسوأ: سينتهي البرنامج ويعلن مجموعًا يُسقط 285 بصمت."
      }
    },
    {
      id: "t1l1q06",
      type: "tf",
      level: "hard",
      topics: ["t1-schema-on-write", "t1-structured-table"],
      q: {
        en: "A SQLite table created with the column <code>monthly_rent INTEGER</code> rejects a row whose rent is the text <code>'negotiable'</code>, because a database enforces the types it declares.",
        ar: "جدول SQLite أُنشئ بالعمود <code>monthly_rent INTEGER</code> يرفض الصف الذي إيجاره النص <code>'negotiable'</code>، لأن قاعدة البيانات تفرض الأنواع التي أعلنتها."
      },
      truth: false,
      hint: {
        en: "Remember the caveat the lesson put in brackets after its SQLite example, and why its CREATE TABLE had an extra line.",
        ar: "تذكّر التنبيه الذي وضعه الدرس بين قوسين بعد مثال SQLite، ولماذا كان في CREATE TABLE سطر إضافي."
      },
      explain: {
        en: "False. SQLite is unusually relaxed about declared column types: it stores the text next to the integers unless you add a rule such as <code>CHECK (typeof(monthly_rent) = 'integer')</code>. Server databases such as PostgreSQL do reject text in an integer column on their own. The idea of schema-on-write (check at the door) is right; the lesson is that the door must really be locked, so try it once with a deliberately bad row. The claim is tempting because \"database = enforced schema\" is the headline.",
        ar: "خطأ. يتساهل SQLite في أنواع الأعمدة المعلنة تساهلًا غير معتاد: فيخزّن النص بجوار الأعداد الصحيحة ما لم تضف قاعدة مثل <code>CHECK (typeof(monthly_rent) = 'integer')</code>. أما قواعد بيانات الخوادم مثل PostgreSQL فترفض النص في عمود الأعداد الصحيحة من تلقاء نفسها. فكرة المخطط عند الكتابة (افحص عند الباب) صحيحة؛ والدرس أن الباب يجب أن يكون مغلقًا فعلًا، فجرّبه مرة بصف معيب عمدًا. والعبارة مغرية لأن «قاعدة بيانات = مخطط مفروض» هو العنوان العريض."
      }
    },
    {
      id: "t1l1q07",
      type: "complete",
      level: "easy",
      lang: "python",
      topics: ["t1-sql-vs-dataframe"],
      q: {
        en: "The SQL query in the comment counts every listing in each city. Complete the pandas twin so that <code>n</code> gives the same numbers as the SQL <code>COUNT(*)</code>.",
        ar: "يعدّ استعلام SQL في التعليق كل إعلان في كل مدينة. أكمل ما يقابله في pandas بحيث يعطي <code>n</code> الأعداد نفسها التي يعطيها <code>COUNT(*)</code> في SQL."
      },
      code: [
          "# SELECT city, COUNT(*) AS n, ROUND(AVG(monthly_rent), 1) AS avg_rent",
          "# FROM listings GROUP BY city",
          "",
          "import pandas as pd",
          "",
          "df = pd.read_csv(\"rental_listings.csv\")",
          "by_city = df.groupby(\"city\")[\"monthly_rent\"].agg(n=____, avg_rent=\"mean\")",
          "print(by_city.round(1))"
        ].join("\n"),
      options: [
        {
          code: "\"count\""
        },
        {
          code: "\"size\""
        },
        {
          code: "\"nunique\""
        },
        {
          code: "\"sum\""
        }
      ],
      answer: 1,
      solution: {
        code: "by_city = df.groupby(\"city\")[\"monthly_rent\"].agg(n=\"size\", avg_rent=\"mean\")",
        en: "<code>\"size\"</code> counts all the rows of each group, blank rents included, exactly like <code>COUNT(*)</code>.",
        ar: "<code>\"size\"</code> يعدّ كل صفوف كل مجموعة، بما فيها الإيجارات الفارغة، تمامًا مثل <code>COUNT(*)</code>."
      },
      hint: {
        en: "One of these aggregations counts the rows of the group; another counts only the rows whose rent is not blank. Two listings have a blank rent.",
        ar: "إحدى هذه الدوال التجميعية تعدّ صفوف المجموعة، وأخرى تعدّ الصفوف التي إيجارها غير فارغ فقط. وفي إعلانين إيجار فارغ."
      },
      explain: {
        en: "<code>\"size\"</code> counts all the rows of each group, exactly like <code>COUNT(*)</code>, so the five cities add up to 60. <code>\"count\"</code> is the tempting answer: it counts only the non-blank rents, so Jabalia would show 8 instead of 9 and Khan Younis 13 instead of 14 (the two listings with a blank rent). <code>\"nunique\"</code> counts different rents and <code>\"sum\"</code> adds the rents up. Rule: <code>n</code> and <code>avg_rent</code> answer different questions: how many listings, and the mean of the rents that exist.",
        ar: "<code>\"size\"</code> يعدّ كل صفوف كل مجموعة تمامًا كما يفعل <code>COUNT(*)</code>، فتجمع المدن الخمس 60. و<code>\"count\"</code> هو الجواب المغري: فهو يعدّ الإيجارات غير الفارغة فقط، فتظهر جباليا 8 بدل 9 وخان يونس 13 بدل 14 (الإعلانان اللذان إيجارهما فارغ). أما <code>\"nunique\"</code> فيعدّ الإيجارات المختلفة، و<code>\"sum\"</code> يجمعها. القاعدة: <code>n</code> و<code>avg_rent</code> يجيبان عن سؤالين مختلفين: كم إعلانًا، وما متوسط الإيجارات الموجودة."
      }
    },
    {
      id: "t1l1q08",
      type: "trace",
      level: "medium",
      lang: "python",
      topics: ["t1-schema-on-read", "t1-semi-structured"],
      q: {
        en: "Trace the program. After the loop has finished, what are the values of these three expressions?",
        ar: "تتبّع البرنامج. بعد انتهاء الحلقة، ما قيم هذه التعابير الثلاثة؟"
      },
      code: [
          "from collections import Counter",
          "",
          "schools = [",
          "    {\"id\": 1, \"contacts\": {\"phone\": \"08-111\"}},",
          "    {\"id\": 2},",
          "    {\"id\": 3, \"contacts\": {\"phone\": \"08-333\", \"email\": \"c@x.org\"}},",
          "]",
          "",
          "top, inner = Counter(), Counter()",
          "for s in schools:",
          "    top.update(s.keys())",
          "    inner.update(s.get(\"contacts\", {}).keys())"
        ].join("\n"),
      blanks: [
        {
          label: { en: "top[\"contacts\"]", ar: "top[\"contacts\"]" },
          accept: ["2"]
        },
        {
          label: { en: "inner[\"phone\"]", ar: "inner[\"phone\"]" },
          accept: ["2"]
        },
        {
          label: { en: "inner[\"email\"]", ar: "inner[\"email\"]" },
          accept: ["1"]
        }
      ],
      hint: {
        en: "Follow school 2 through both updates: what does <code>s.get(\"contacts\", {})</code> hand to <code>inner.update</code>?",
        ar: "تتبّع المدرسة 2 عبر التحديثين: ماذا يسلّم <code>s.get(\"contacts\", {})</code> إلى <code>inner.update</code>؟"
      },
      explain: {
        en: "<code>top</code> counts how many schools carry each top-level key: school 2 has no <code>contacts</code>, so that key appears 2 times, while <code>id</code> appears 3 times. School 2 adds nothing to <code>inner</code>, because <code>s.get(\"contacts\", {})</code> gives an empty dict with no keys. Schools 1 and 3 have a phone (2) and only school 3 has an e-mail (1). This survey is the first thing to do with any unfamiliar JSON: a key counted fewer times than there are records is optional and is read with <code>.get</code>; a key found in every record may be indexed with square brackets.",
        ar: "يعدّ <code>top</code> كم مدرسة تحمل كل مفتاح من المستوى الأعلى: المدرسة 2 بلا <code>contacts</code>، فيظهر ذلك المفتاح مرتين، بينما يظهر <code>id</code> ثلاث مرات. ولا تسهم المدرسة 2 بشيء في <code>inner</code>، لأن <code>s.get(\"contacts\", {})</code> يعيد قاموسًا فارغًا لا مفاتيح فيه. وللمدرستين 1 و3 هاتف (2)، والبريد الإلكتروني للمدرسة 3 وحدها (1). وهذا المسح أول ما يُفعل مع أي JSON غير مألوف: المفتاح الذي عدّه أقل من عدد السجلات اختياري فيُقرأ بـ <code>.get</code>، والمفتاح الموجود في كل سجل يجوز فهرسته بالأقواس المربعة."
      }
    },
    {
      id: "t1l1q09",
      type: "fill",
      level: "easy",
      lang: "python",
      topics: ["t1-optional-keys"],
      q: {
        en: "Complete the line so that a school without a phone is stated as missing, not hidden behind a made-up value.",
        ar: "أكمل السطر بحيث يُسجَّل غياب هاتف المدرسة على أنه «مفقود»، لا مختبئًا خلف قيمة مختلقة."
      },
      code: [
          "import numpy as np",
          "",
          "contacts = s.get(\"contacts\", {})",
          "row = {",
          "    \"school\": s[\"name\"][\"en\"],",
          "    \"phone\":  contacts.get(\"phone\", ____1____),",
          "}"
        ].join("\n"),
      blanks: [
        {
          accept: ["np.nan", "numpy.nan", "float('nan')", "float(\"nan\")", "None"],
          label: { en: "default", ar: "القيمة الافتراضية" }
        }
      ],
      solution: {
        code: [
            "import numpy as np",
            "",
            "contacts = s.get(\"contacts\", {})",
            "row = {",
            "    \"school\": s[\"name\"][\"en\"],",
            "    \"phone\":  contacts.get(\"phone\", np.nan),",
            "}"
          ].join("\n")
      },
      hint: {
        en: "Which value tells pandas that something is missing, so that <code>isna()</code> counts it?",
        ar: "أي قيمة تخبر pandas أن شيئًا مفقود فيعدّها <code>isna()</code>؟"
      },
      explain: {
        en: "A default of <code>np.nan</code> (or <code>None</code>, which becomes NaN in a table) says \"not stated\". An empty string, 0 or \"unknown\" looks like a real answer: <code>notna().sum()</code> would report 13 of 13 schools with a phone when only 10 have one, and a mean that includes a 0 is dragged down. The same lines show the rule of the lesson: square brackets for what the registry promises on every record (the name), and <code>.get</code> with a missing-value marker for what may be absent (the phone).",
        ar: "القيمة الافتراضية <code>np.nan</code> (أو <code>None</code> الذي يصير NaN في الجدول) تقول «غير مذكور». أما السلسلة الفارغة أو 0 أو \"unknown\" فتبدو جوابًا حقيقيًّا: وسيعلن <code>notna().sum()</code> أن 13 من 13 مدرسة لها هاتف مع أن عشرًا منها فقط لها، وسيُسحب إلى الأسفل أي متوسط يشمل 0. وتُري الأسطر أيضًا قاعدة الدرس: الأقواس المربعة لما يعد به السجل في كل مدرسة (الاسم)، و<code>.get</code> مع علامة «مفقود» لما يجوز غيابه (الهاتف)."
      }
    },
    {
      id: "t1l1q10",
      type: "compare",
      level: "hard",
      lang: "python",
      topics: ["t1-optional-keys", "t1-schema-on-read"],
      q: {
        en: "Both versions build a table from the 13 schools of schools.json, and three of those schools have no <code>contacts</code> at all. Which statement is true?",
        ar: "تبني النسختان جدولًا من المدارس الثلاث عشرة في schools.json، وفي ثلاث منها لا يوجد <code>contacts</code> إطلاقًا. أي عبارة صحيحة؟"
      },
      codeA: [
          "rows = []",
          "for s in schools:",
          "    c = s.get(\"contacts\", {})",
          "    rows.append({",
          "        \"school\": s[\"name\"][\"en\"],",
          "        \"phone\": c.get(\"phone\", \"\"),",
          "    })",
          "",
          "table = pd.DataFrame(rows)",
          "n = table[\"phone\"].notna().sum()",
          "print(n, \"of\", len(table))"
        ].join("\n"),
      codeB: [
          "rows = []",
          "for s in schools:",
          "    c = s.get(\"contacts\", {})",
          "    rows.append({",
          "        \"school\": s[\"name\"][\"en\"],",
          "        \"phone\": c.get(\"phone\", np.nan),",
          "    })",
          "",
          "table = pd.DataFrame(rows)",
          "n = table[\"phone\"].notna().sum()",
          "print(n, \"of\", len(table))"
        ].join("\n"),
      options: [
        {
          en: "A is safer: an empty string can be filtered out later, whereas <code>np.nan</code> makes later calculations fail.",
          ar: "النسخة أ أكثر أمانًا: يمكن تصفية السلسلة الفارغة لاحقًا، بينما تُفشل <code>np.nan</code> الحسابات اللاحقة."
        },
        {
          en: "They print the same count, because <code>.get</code> changes only what is stored, not how many schools there are.",
          ar: "يطبعان العدد نفسه، لأن <code>.get</code> لا يغيّر إلا ما يُخزَّن لا عدد المدارس."
        },
        {
          en: "B is worse: <code>np.nan</code> is a number, so the phone column can no longer hold phone numbers written as text.",
          ar: "النسخة ب أسوأ: <code>np.nan</code> عدد، فلم يعد عمود الهاتف يتسع لأرقام هواتف مكتوبة نصًّا."
        },
        {
          en: "A prints <code>13 of 13</code> because <code>\"\"</code> counts as a value; B prints <code>10 of 13</code>, the true figure, so B is better.",
          ar: "تطبع أ <code>13 of 13</code> لأن <code>\"\"</code> تُعدّ قيمة؛ وتطبع ب <code>10 of 13</code>، وهو الرقم الحقيقي، فالنسخة ب أفضل."
        }
      ],
      answer: 3,
      solution: {
        out: "A: 13 of 13\nB: 10 of 13",
        en: "A hides three missing phones as empty answers; B states them as NaN, so <code>isna()</code> counts them (and the three schools can be listed by name).",
        ar: "تُخفي أ ثلاثة هواتف مفقودة في هيئة أجوبة فارغة؛ وتقولها ب NaN فيعدّها <code>isna()</code> (ويمكن سرد المدارس الثلاث بأسمائها)."
      },
      hint: {
        en: "Follow a school with no <code>contacts</code> through each version: what value does it store for the phone, and does <code>notna()</code> count that value as present?",
        ar: "تتبّع مدرسة بلا <code>contacts</code> في كل نسخة: ما القيمة التي تخزّنها للهاتف، وهل يعدّها <code>notna()</code> موجودة؟"
      },
      explain: {
        en: "A uses a default of \"\" (Version 2): the loop finishes, but an empty string is a value, so <code>notna()</code> counts the three schools without contacts as having a phone and the table says 13 of 13. B uses <code>np.nan</code> (Version 3): the count is the true 10 of 13 and the three schools can be listed by name. B still leaves a decision open: what to do about the three NaN (Lesson 3). The first option is the tempting one: filtering \"\" later sounds easy, but every later count, average and model has to remember to do it, and the first one that forgets is silently wrong. And <code>np.nan</code> does not break calculations: pandas skips it in <code>mean()</code> and <code>sum()</code>.",
        ar: "تستعمل النسخة أ القيمة الافتراضية \"\" (النسخة 2): تنتهي الحلقة، لكن السلسلة الفارغة قيمة، فيعدّ <code>notna()</code> المدارس الثلاث التي بلا جهات اتصال مدارسَ لها هاتف، ويقول الجدول 13 من 13. وتستعمل النسخة ب <code>np.nan</code> (النسخة 3): العدد هو الحقيقي 10 من 13، ويمكن سرد المدارس الثلاث بأسمائها. وتبقى في ب مسألة مفتوحة: ماذا نفعل بالقيم NaN الثلاث (الدرس 3). والخيار الأول هو المغري: تصفية \"\" لاحقًا تبدو سهلة، لكن كل عدّ ومتوسط ونموذج لاحق عليه أن يتذكر ذلك، وأول من ينسى يخطئ بصمت. و<code>np.nan</code> لا يكسر الحسابات: فpandas يتخطاه في <code>mean()</code> و<code>sum()</code>."
      }
    },
    {
      id: "t1l1q11",
      type: "write",
      level: "hard",
      lang: "python",
      topics: ["t1-flatten-nested-record", "t1-optional-keys"],
      q: {
        en: "Write a function <code>flat_listing(rec)</code> that turns one listing record into one flat dict with the keys <code>id</code>, <code>city</code>, <code>amount</code> and <code>landlord_name</code>. Every listing has <code>id</code>, <code>city</code> and a <code>rent</code> object that holds an <code>amount</code>; only some listings have a <code>landlord</code> object that holds a <code>name</code>. When there is no landlord, <code>landlord_name</code> must be <code>None</code>. A required key that is missing must still make the program fail loudly. Example: <code>{\"id\": 1005, \"city\": \"Rafah\", \"rent\": {\"amount\": 285}}</code> becomes <code>{'id': 1005, 'city': 'Rafah', 'amount': 285, 'landlord_name': None}</code>.",
        ar: "اكتب دالة <code>flat_listing(rec)</code> تحوّل سجل إعلان واحدًا إلى قاموس مسطح واحد بالمفاتيح <code>id</code> و<code>city</code> و<code>amount</code> و<code>landlord_name</code>. لكل إعلان <code>id</code> و<code>city</code> وكائن <code>rent</code> يحوي <code>amount</code>؛ وبعض الإعلانات فقط فيها كائن <code>landlord</code> يحوي <code>name</code>. وحين لا يوجد مالك يجب أن تكون <code>landlord_name</code> هي <code>None</code>. والمفتاح المطلوب إذا غاب يجب أن يفشل البرنامج بصوت مسموع. مثال: <code>{\"id\": 1005, \"city\": \"Rafah\", \"rent\": {\"amount\": 285}}</code> يصير <code>{'id': 1005, 'city': 'Rafah', 'amount': 285, 'landlord_name': None}</code>."
      },
      starter: [
          "def flat_listing(rec):",
          "    # return one flat dict: id, city, amount, landlord_name",
          "    ..."
        ].join("\n"),
      lines: 10,
      checks: [
        {
          re: "def\\s+flat_listing\\s*\\(\\s*rec\\s*\\)",
          label: { en: "defines flat_listing(rec)", ar: "يعرّف الدالة flat_listing(rec)" }
        },
        {
          re: "rec\\s*\\[\\s*[\"']rent[\"']\\s*\\]\\s*\\[\\s*[\"']amount[\"']\\s*\\]",
          label: {
            en: "reads the required rent amount with square brackets",
            ar: "يقرأ مبلغ الإيجار المطلوب بالأقواس المربعة"
          }
        },
        {
          re: "\\.get\\s*\\(\\s*[\"']landlord[\"']|[\"']landlord[\"']\\s+in\\s+rec",
          label: {
            en: "treats landlord as optional (.get, or an in test)",
            ar: "يعامل landlord اختياريًّا (.get أو اختبار in)"
          }
        },
        {
          re: "[\"']landlord_name[\"']",
          label: { en: "returns the key landlord_name", ar: "يعيد المفتاح landlord_name" }
        }
      ],
      forbid: [
        {
          re: "\\.get\\s*\\(\\s*[\"'](?:id|city|rent)[\"']",
          label: {
            en: "reading a required key with .get, which hides a broken promise",
            ar: "قراءة مفتاح مطلوب بـ .get، فهذا يخفي إخلالًا بالوعد"
          }
        },
        {
          re: "except\\s*:",
          label: { en: "a bare except that swallows every error", ar: "except عارية تبتلع كل خطأ" }
        }
      ],
      solution: {
        code: [
            "def flat_listing(rec):",
            "    landlord = rec.get(\"landlord\", {})",
            "    return {",
            "        \"id\": rec[\"id\"],",
            "        \"city\": rec[\"city\"],",
            "        \"amount\": rec[\"rent\"][\"amount\"],",
            "        \"landlord_name\": landlord.get(\"name\"),",
            "    }"
          ].join("\n"),
        en: "Brackets for what every listing promises, so a broken record fails loudly; <code>.get</code> for the optional landlord. <code>rec.get(\"landlord\", {})</code> gives an empty dict when the landlord is absent, and the second <code>.get(\"name\")</code> then returns <code>None</code>.",
        ar: "أقواس مربعة لما يعد به كل إعلان، فيفشل السجل المعيب بصوت مسموع؛ و<code>.get</code> للمالك الاختياري. تعطي <code>rec.get(\"landlord\", {})</code> قاموسًا فارغًا عند غياب المالك، ثم يعيد <code>.get(\"name\")</code> الثاني القيمة <code>None</code>."
      },
      hint: {
        en: "Which keys does every listing promise? Use brackets for those and <code>.get</code> only for the one that may be absent. What does <code>.get</code> return for a missing key when you give it no default?",
        ar: "ما المفاتيح التي يعد بها كل إعلان؟ استعمل الأقواس لها و<code>.get</code> للمفتاح الذي قد يغيب وحده. وماذا تعيد <code>.get</code> لمفتاح غائب حين لا تعطيها قيمة افتراضية؟"
      },
      explain: {
        en: "Required keys (id, city, rent, amount) are read with square brackets, so a record that breaks the registry's promise fails loudly. The optional landlord is read with <code>.get(\"landlord\", {})</code>, which gives an empty dict when it is absent; the second <code>.get(\"name\")</code> then returns <code>None</code>, which becomes NaN as soon as the rows meet in a DataFrame. The tempting alternatives: <code>.get</code> everywhere (a missing id would quietly become a row with no id), or a default of <code>\"\"</code> or <code>0</code> (a missing landlord would look like a landlord with an empty name). Note what flattening does not do: lists such as tags stay lists inside a cell.",
        ar: "تُقرأ المفاتيح المطلوبة (id وcity وrent وamount) بالأقواس المربعة، فيفشل السجل الذي يخلّ بوعد المصدر بصوت مسموع. ويُقرأ المالك الاختياري بـ <code>.get(\"landlord\", {})</code> فيعطي قاموسًا فارغًا عند غيابه؛ ثم يعيد <code>.get(\"name\")</code> الثاني القيمة <code>None</code> التي تصير NaN حين تلتقي الصفوف في DataFrame. والبدائل المغرية: <code>.get</code> في كل مكان (فيصير الـ id الغائب صفًّا بلا id بهدوء)، أو قيمة افتراضية <code>\"\"</code> أو <code>0</code> (فيبدو غياب المالك مالكًا باسم فارغ). ولاحظ ما لا يفعله التسطيح: القوائم مثل tags تبقى قوائم داخل خلية."
      }
    },
    {
      id: "t1l1q12",
      type: "output",
      level: "easy",
      lang: "python",
      topics: ["t1-unstructured"],
      q: {
        en: "A tiny grey-scale photo is stored as a grid of numbers, one per pixel. Write what this program prints.",
        ar: "تُخزَّن صورة رمادية صغيرة على هيئة شبكة من الأرقام، رقم لكل بكسل. اكتب ما يطبعه هذا البرنامج."
      },
      code: [
          "import numpy as np",
          "",
          "photo = np.zeros((4, 6))          # a 4 x 6 grey-scale \"photo\"",
          "print(photo.shape)",
          "print(photo.size, \"numbers\")"
        ].join("\n"),
      blanks: [
        {
          accept: ["(4, 6)\n24 numbers", "(4,6)\n24 numbers"],
          lines: 2
        }
      ],
      hint: {
        en: "How many cells does a grid of 4 rows and 6 columns have?",
        ar: "كم خلية في شبكة من 4 صفوف و6 أعمدة؟"
      },
      explain: {
        en: "<code>np.zeros((4, 6))</code> makes 4 rows of 6 pixels: the shape is <code>(4, 6)</code> and there are 24 numbers. To a computer a photograph is just such a grid (a 12-megapixel photo has 12 million numbers per colour channel), and none of the numbers is named \"has a balcony\": the meaning lives in patterns across many numbers. That is why unstructured data needs feature extraction (or an embedding) before a table or a model can use it. Compare <code>monthly_rent</code>, a column that pandas can describe in one call.",
        ar: "ينشئ <code>np.zeros((4, 6))</code> 4 صفوف من 6 بكسلات: الشكل <code>(4, 6)</code> وفيه 24 رقمًا. والصورة عند الحاسوب شبكة كهذه (الصورة بدقة 12 ميغابكسل فيها 12 مليون رقم لكل قناة لونية)، ولا يُسمّى أي رقم منها «فيه شرفة»: المعنى يسكن في أنماط عبر أرقام كثيرة. ولهذا تحتاج البيانات غير المُهيكلة إلى استخراج السمات (أو التضمين) قبل أن يستعملها جدول أو نموذج. قارن بـ <code>monthly_rent</code>، عمود يصفه pandas باستدعاء واحد."
      }
    },
    {
      id: "t1l1q13",
      type: "error",
      level: "easy",
      lang: "python",
      topics: ["t1-feature-extraction", "t1-unstructured"],
      q: {
        en: "This program should print <code>[True, False, False]</code> (only the first advert is furnished) but prints <code>[True, True, True]</code>. Click the line that makes the unfurnished adverts count as furnished.",
        ar: "ينبغي أن يطبع هذا البرنامج <code>[True, False, False]</code> (الإعلان الأول وحده مفروش) لكنه يطبع <code>[True, True, True]</code>. انقر السطر الذي يجعل الإعلانات غير المفروشة تُحسب مفروشة."
      },
      code: [
          "ads = [",
          "    \"Furnished flat in Gaza\",",
          "    \"Unfurnished flat in Rafah\",",
          "    \"Studio in Khan Younis, unfurnished\",",
          "]",
          "",
          "furnished = []",
          "for ad in ads:",
          "    text = ad.lower()",
          "    furnished.append(\"furnished\" in text)",
          "",
          "print(furnished)"
        ].join("\n"),
      answer: 10,
      skip: [6, 11],
      solution: {
        code: "furnished.append(bool(re.search(r\"\\bfurnished\\b\", text)))   # needs: import re",
        en: "Line 10 is a substring test, and \"unfurnished\" contains \"furnished\". A whole-word pattern fixes it, and a sample of the matches should still be read by eye (the repaired rule still flags \"furnished kitchen only\").",
        ar: "السطر 10 اختبار جزء من النص، وكلمة \"unfurnished\" تحوي \"furnished\". ويصلحه نمط الكلمة الكاملة، مع قراءة عينة من المطابقات بالعين (فالقاعدة المصلَّحة ما زالت تعلّم \"furnished kitchen only\")."
      },
      hint: {
        en: "Read the word <code>unfurnished</code> letter by letter and ask what the operator <code>in</code> asks about it.",
        ar: "اقرأ كلمة <code>unfurnished</code> حرفًا حرفًا واسأل عما يسأل عنه المعامل <code>in</code>."
      },
      explain: {
        en: "<code>\"furnished\" in text</code> asks whether those letters occur anywhere, and <i>un</i>furnished contains them. The error is not random: it hits every unfurnished advert, so a classifier trained on this flag would be taught, with full confidence, that unfurnished flats are furnished. Line 9 (<code>.lower()</code>) is the tempting wrong pick, but changing the case changes nothing here. The repair is a whole-word pattern, <code>\\bfurnished\\b</code>, plus reading a sample of the matches by eye: even the repaired rule still flags \"furnished kitchen only\".",
        ar: "<code>\"furnished\" in text</code> يسأل هل ترد هذه الأحرف في أي موضع، و<i>un</i>furnished تحويها. والخطأ ليس عشوائيًّا: فهو يصيب كل إعلان غير مفروش، فسيُعلَّم مصنِّف يتدرب على هذه العلامة، بثقة تامة، أن الشقق غير المفروشة مفروشة. والسطر 9 (<code>.lower()</code>) هو الاختيار الخاطئ المغري، لكن تغيير حالة الأحرف لا يغيّر شيئًا هنا. والإصلاح نمط كلمة كاملة <code>\\bfurnished\\b</code> مع قراءة عينة من المطابقات بالعين: فحتى القاعدة المصلَّحة ما زالت تعلّم \"furnished kitchen only\"."
      }
    },
    {
      id: "t1l1q14",
      type: "mcq",
      level: "easy",
      topics: ["t1-embeddings-intro", "t1-feature-extraction"],
      q: {
        en: "Counting words over a vocabulary you chose gives <code>[1, 0, 0, 1]</code> for “Sunny apartment, balcony, newly painted” and <code>[0, 1, 0, 1]</code> for “Bright flat with a terrace, newly painted”. The two adverts share only the <i>painted</i> column, although a tenant would call them alike. What does an embedding change?",
        ar: "يعطي عدّ الكلمات على مفردات اخترتها <code>[1, 0, 0, 1]</code> للإعلان «Sunny apartment, balcony, newly painted» و<code>[0, 1, 0, 1]</code> للإعلان «Bright flat with a terrace, newly painted». يشترك الإعلانان في عمود <i>painted</i> وحده مع أن المستأجر سيراهما متشابهين. ماذا يغيّر التضمين (embedding)؟"
      },
      options: [
        {
          en: "A model reads each text and returns a learned list of numbers, so that texts of similar meaning get similar lists.",
          ar: "يقرأ نموذج كل نص ويعيد قائمة أرقام متعلَّمة، بحيث تحصل النصوص المتقاربة في المعنى على قوائم متقاربة."
        },
        {
          en: "It extends your vocabulary with the synonyms it finds, but every word still becomes a column of its own that you could have counted by hand.",
          ar: "يوسّع مفرداتك بالمرادفات التي يجدها، لكن كل كلمة تبقى عمودًا خاصًّا بها كان يمكنك عدّه يدويًّا."
        },
        {
          en: "It labels each advert, for example as furnished or not, so that you no longer have to write extraction rules of your own.",
          ar: "يضع وسمًا لكل إعلان، مثل مفروش أو غير مفروش، فلا تحتاج بعدها إلى كتابة قواعد استخراج خاصة بك."
        },
        {
          en: "It keeps all the information of the advert, so the numbers need no checking and no sample has to be read by eye.",
          ar: "يحتفظ بكل معلومات الإعلان، فلا تحتاج الأرقام إلى أي فحص ولا إلى قراءة عينة منها بالعين."
        }
      ],
      answer: 0,
      hint: {
        en: "Ask who chooses the columns in each approach, and what the numbers are arranged to reflect.",
        ar: "اسأل من يختار الأعمدة في كل طريقة، وماذا ترتَّب الأرقام لتعكس."
      },
      explain: {
        en: "An embedding is learned: a model reads a piece of text and returns a list of numbers arranged so that texts of similar meaning get similar lists, so the \"balcony\" advert and the \"terrace\" advert end up close without you listing synonyms. The second option describes a bigger vocabulary, which is still hand-made counting. Embeddings do not provide a label (the label is a separate question), and, like any extraction, they lose information, so they make the step less manual, not less important: a feature the model did not capture cannot be learned.",
        ar: "التضمين متعلَّم: يقرأ نموذج قطعة نص ويعيد قائمة من الأرقام مرتبة بحيث تحصل النصوص المتقاربة في المعنى على قوائم متقاربة، فيقترب إعلان «balcony» من إعلان «terrace» دون أن تسرد المرادفات. والخيار الثاني يصف مفردات أكبر، وهذا ما زال عدًّا يدويًّا. ولا يعطي التضمين وسمًا (فالوسم سؤال آخر)، وهو كأي استخراج يفقد معلومات، فيجعل الخطوة أقل يدوية لا أقل أهمية: فسمة لم يلتقطها النموذج لا يمكن تعلّمها."
      }
    },
    {
      id: "t1l1q15",
      type: "contrast",
      level: "hard",
      topics: ["t1-shape-comparison", "t1-where-data-lives", "t1-schema-on-write"],
      q: {
        en: "Place each statement under the way of keeping a schema that it describes.",
        ar: "ضع كل عبارة تحت طريقة حفظ المخطط التي تصفها."
      },
      concepts: [
        { en: "Schema-on-write", ar: "المخطط عند الكتابة (schema-on-write)" },
        { en: "Schema-on-read", ar: "المخطط عند القراءة (schema-on-read)" }
      ],
      rows: [
        {
          s: {
            en: "A faulty rent is rejected at the moment it is inserted, before anyone reads it.",
            ar: "يُرفض الإيجار المعيب لحظة إدخاله، قبل أن يقرأه أحد."
          },
          a: 0
        },
        {
          s: {
            en: "The producer can add a new key tomorrow without asking anyone.",
            ar: "يستطيع المُنتِج إضافة مفتاح جديد غدًا دون أن يستأذن أحدًا."
          },
          a: 1
        },
        {
          s: {
            en: "Every reader has to repeat the checks: survey the keys, decide which are optional.",
            ar: "على كل قارئ أن يكرر الفحوص: يمسح المفاتيح ويقرر أيها اختياري."
          },
          a: 1
        },
        {
          s: {
            en: "The code that reads the data depends on field names and types that the records are expected to have.",
            ar: "الكود الذي يقرأ البيانات يعتمد على أسماء حقول وأنواع يُفترض أن تحملها السجلات."
          },
          a: 2
        },
        {
          s: {
            en: "Typical home: a relational database or a data warehouse.",
            ar: "البيت المعتاد: قاعدة بيانات علائقية أو مستودع بيانات."
          },
          a: 0
        },
        {
          s: {
            en: "A data lake, which keeps raw data in whatever shape it arrives, works this way at the scale of a whole organisation.",
            ar: "بحيرة البيانات، التي تحفظ البيانات الخام بالشكل الذي تصل به، تعمل هكذا على مقياس مؤسسة كاملة."
          },
          a: 1
        },
        {
          s: {
            en: "Wins when many people read the data and it must be trustworthy; the effort is paid once, up front.",
            ar: "يفوز حين يقرأ البيانات ناس كثيرون ويجب أن تكون موثوقة؛ والجهد يُدفع مرة واحدة في البداية."
          },
          a: 0
        }
      ],
      hint: {
        en: "For each statement ask: who does the checking, and when?",
        ar: "اسأل لكل عبارة: من يقوم بالفحص، ومتى؟"
      },
      explain: {
        en: "Schema-on-write checks at the door: the table is designed first, a bad row is rejected on insert and every reader receives clean rows (relational databases and warehouses; the effort is paid once). Schema-on-read accepts whatever arrives and the consumer discovers and checks the schema while reading (document stores, JSON files, data lakes); it costs nothing at the door and a little at every read, by every reader, forever. Both have a schema that code depends on; they differ in when it is written down and who enforces it, so that row belongs to both. Neither is better in general, and these pairings are tendencies, not laws: PostgreSQL can store a JSON column, so ask the three questions of the data, not of the product name.",
        ar: "المخطط عند الكتابة يفحص عند الباب: يُصمَّم الجدول أولًا، ويُرفض الصف المعيب عند إدخاله، فيستلم كل قارئ صفوفًا نظيفة (قواعد البيانات العلائقية والمستودعات؛ والجهد يُدفع مرة واحدة). والمخطط عند القراءة يقبل كل ما يصل ويكتشف المستهلك المخطط ويفحصه أثناء القراءة (مخازن المستندات وملفات JSON وبحيرات البيانات)؛ فلا يكلّف شيئًا عند الباب ويكلّف قليلًا عند كل قراءة، على كل قارئ، إلى الأبد. وفي الاثنين مخطط يعتمد عليه الكود، والفرق في متى يُكتب وفي من يفرضه، ولهذا تنتمي تلك العبارة إلى الاثنين معًا. وليس أحدهما أفضل مطلقًا، وهذه الاقترانات ميول لا قوانين: فبوسع PostgreSQL أن يخزّن عمود JSON، فاطرح الأسئلة الثلاثة عن البيانات لا عن اسم المنتج."
      }
    },
    {
      id: "t1l1q16",
      type: "multi",
      level: "medium",
      topics: ["t1-hybrid-shapes", "t1-three-questions"],
      q: {
        en: "Which of these datasets are hybrids, where you should name the dominant shape and give each part its own first step? Choose all that apply.",
        ar: "أي مجموعات البيانات هذه هجينة، يجب أن تسمّي فيها الشكل الغالب وتعطي كل جزء خطوته الأولى الخاصة؟ اختر كل ما ينطبق."
      },
      options: [
        {
          en: "A PostgreSQL table <code>enrolment(school_id, year, boys, girls)</code> with NOT NULL constraints",
          ar: "جدول PostgreSQL باسم <code>enrolment(school_id, year, boys, girls)</code> بقيود NOT NULL"
        },
        {
          en: "An e-mail export: Subject, From and Date lines plus the message text",
          ar: "تصدير رسائل بريد: أسطر Subject وFrom وDate ونص الرسالة"
        },
        {
          en: "10,000 customer reviews stored in one text column",
          ar: "10,000 مراجعة عملاء مخزّنة في عمود نصي واحد"
        },
        {
          en: "A survey exported to CSV: 20 numeric answers per person and one comments column",
          ar: "استبيان مُصدَّر إلى CSV: 20 جوابًا رقميًّا لكل شخص وعمود تعليقات واحد"
        },
        {
          en: "rental_listings.csv: eight structured columns and the free-text advert column",
          ar: "rental_listings.csv: ثمانية أعمدة مُهيكلة وعمود الإعلان النصي الحر"
        }
      ],
      answer: [1, 3, 4],
      hint: {
        en: "A hybrid mixes parts of different shapes inside one dataset. Which of these datasets are made of a single shape only?",
        ar: "المجموعة الهجينة تخلط أجزاء من أشكال مختلفة داخل مجموعة بيانات واحدة. أي هذه المجموعات مصنوعة من شكل واحد فقط؟"
      },
      explain: {
        en: "A hybrid has parts of different shapes: the e-mail has a semi-structured header (named fields) and an unstructured body; the survey and rental_listings.csv are mostly structured tables with one free-text column inside them. The PostgreSQL table is purely structured (a declared schema, checked on write). The reviews look as if they live in a column, which is the tempting part, but that column is the whole dataset and its content has no fields, so the dataset is unstructured. Do not force a box: name the dominant shape (mostly structured, mostly unstructured) and the parts that differ.",
        ar: "المجموعة الهجينة فيها أجزاء من أشكال مختلفة: لرسالة البريد ترويسة شبه مُهيكلة (حقول مسمّاة) وجسم غير مُهيكل؛ والاستبيان وrental_listings.csv جدولان مُهيكلان في معظمهما وفي كل منهما عمود نصي حر. أما جدول PostgreSQL فمُهيكل خالصًا (مخطط معلن يُفحص عند الكتابة). وتبدو المراجعات كأنها تعيش في عمود، وهذا هو الجزء المغري، لكن ذلك العمود هو مجموعة البيانات كلها ومحتواه بلا حقول، فالمجموعة غير مُهيكلة. لا تفرض صندوقًا: سمِّ الشكل الغالب (مُهيكلة في معظمها، أو غير مُهيكلة في معظمها) والأجزاء المختلفة."
      }
    },
    {
      id: "t1l1q17",
      type: "multi",
      level: "easy",
      topics: ["t1-one-listing-three-shapes", "t1-three-loaders"],
      q: {
        en: "Listing 1003 reaches you three ways: as a row of the CSV, as a JSON document from a listings platform and as the landlord's own advert. Choose all the true statements.",
        ar: "يصلك الإعلان 1003 بثلاث طرق: صفًّا في ملف CSV، ومستند JSON من منصة إعلانات، وإعلان المالك نفسه نصًّا. اختر كل العبارات الصحيحة."
      },
      options: [
        {
          en: "The three carry the same facts at the same precision, so any one of them would do.",
          ar: "الأشكال الثلاثة تحمل الحقائق نفسها بالدقة نفسها، فأي منها يكفي."
        },
        {
          en: "The CSV row never says which currency 590 is; the JSON document and the advert both do.",
          ar: "صف CSV لا يقول بأي عملة الرقم 590؛ أما مستند JSON والإعلان النصي فيقولان."
        },
        {
          en: "Loaded into Python they become a DataFrame, a nested dict and a str, so “the rent” is reached in three different ways.",
          ar: "عند تحميلها في بايثون تصير DataFrame وقاموسًا متداخلًا ونصًّا str، فيُوصل إلى «الإيجار» بثلاث طرق مختلفة."
        },
        {
          en: "The CSV row is the most reliable of the three, because structured data cannot contain a wrong value.",
          ar: "صف CSV أوثق الثلاثة، لأن البيانات المُهيكلة لا يمكن أن تحوي قيمة خاطئة."
        },
        {
          en: "The advert says “about 127 m2”, so a regular expression gets 127.0 where the table has 126.7.",
          ar: "يقول الإعلان «about 127 m2»، فيحصل التعبير النمطي على 127.0 حيث في الجدول 126.7."
        }
      ],
      answer: [1, 2, 4],
      hint: {
        en: "Compare the rent and the area of listing 1003 in the three versions, and what you would type to get “the rent” out of each loaded object.",
        ar: "قارن إيجار الإعلان 1003 ومساحته في الأشكال الثلاثة، وما الذي ستكتبه لتستخرج «الإيجار» من كل كائن محمَّل."
      },
      explain: {
        en: "True: the CSV never states the currency of 590 (the JSON has a currency field and the advert says USD); the three loaders return three different objects, which is why we impose a contract of the same keys on all of them; and the advert rounds the area to “about 127”. False: no shape is \"the truth\": each knows something the others do not (the currency, the landlord, the tags, how the landlord chose to describe the flat) and they even differ in precision. And \"structured\" does not mean \"clean\": the CSV has blanks, guessed types and a currency it does not state.",
        ar: "الصحيح: لا يذكر CSV عملة الرقم 590 أبدًا (في JSON حقل للعملة والإعلان يقول USD)؛ والمحمِّلات الثلاثة تعيد ثلاثة كائنات مختلفة، ولهذا نفرض عليها عقدًا من المفاتيح نفسها؛ والإعلان يقرّب المساحة إلى «about 127». والخطأ: لا يوجد شكل هو «الحقيقة»: لكل منها ما لا تعرفه الأخرى (العملة والمالك والوسوم وكيف اختار المالك وصف الشقة) وهي تختلف حتى في الدقة. و«مُهيكل» لا يعني «نظيف»: ففي CSV فراغات وأنواع مخمَّنة وعملة لا يذكرها."
      }
    },
    {
      id: "t1l1q18",
      type: "order",
      level: "medium",
      topics: ["t1-model-needs-table", "t1-wrong-loader-silent"],
      q: {
        en: "A folder holds 5,000 landlord adverts typed as free text, and you want a model that predicts the rent from them. Put the steps in the order in which they have to happen.",
        ar: "في مجلد 5000 إعلان كتبها ملّاك نصًّا حرًّا، وتريد نموذجًا يتنبأ بالإيجار منها. رتّب الخطوات بالترتيب الذي يجب أن تجري به."
      },
      items: [
        {
          en: "Read the first lines of the file yourself and decide what shape it is",
          ar: "اقرأ أول أسطر الملف بنفسك وقرّر ما شكله"
        },
        {
          en: "Write one pattern per field (rooms, area, rent) that gives None when the advert does not say",
          ar: "اكتب نمطًا لكل حقل (rooms وarea وrent) يعطي None حين لا يذكر الإعلان الحقل"
        },
        {
          en: "Run the parser on every advert and collect the results in a DataFrame: one row per advert",
          ar: "شغّل المحلِّل على كل إعلان واجمع النتائج في DataFrame: صف لكل إعلان"
        },
        {
          en: "Check each value against a plausible range and write the reason for every problem in a problems column",
          ar: "افحص كل قيمة بالنسبة إلى نطاق معقول واكتب سبب كل مشكلة في عمود problems"
        },
        {
          en: "Count the rows that have a problem and decide how to treat the missing values, without filling them with 0",
          ar: "عُدّ الصفوف التي فيها مشكلة وقرّر كيف تعامل القيم المفقودة، دون ملئها بـ 0"
        },
        { en: "Train the model on the numeric columns", ar: "درّب النموذج على الأعمدة الرقمية" },
        {
          en: "Run every new advert through the same parser function before asking the model for a prediction",
          ar: "مرّر كل إعلان جديد على دالة المحلِّل نفسها قبل أن تطلب من النموذج تنبؤًا"
        }
      ],
      answer: [0, 1, 2, 3, 4, 5, 6],
      hint: {
        en: "Each step needs the result of an earlier one: you cannot check a value that was never extracted, or train on rows that do not exist yet.",
        ar: "كل خطوة تحتاج إلى نتيجة خطوة سابقة: لا تستطيع فحص قيمة لم تُستخرج، ولا التدريب على صفوف لم توجد بعد."
      },
      explain: {
        en: "First look: a loader or parser chosen for the wrong shape fails silently (the (7, 5) table). Then extract with one pattern per field and say \"not found\" as None; only then can the results be collected into a table with one row per advert, and only then can you check ranges and record the reasons. Counting the problem rows and deciding about the missing values comes before training, because dropping every row with a NaN would remove all the studios and filling with 0 would teach the model that some flats have no rooms. The last step is the rule of the AI lens: the extraction code is part of the model, so live adverts must go through the same function, or the model will quietly read shekel prices as dollars.",
        ar: "أولًا انظر: المحمِّل أو المحلِّل المختار لشكل خاطئ يفشل بصمت (جدول (7, 5)). ثم استخرج بنمط لكل حقل وقل «لم يوجد» بـ None؛ وبعد ذلك فقط تُجمع النتائج في جدول بصف لكل إعلان، وبعده فقط تفحص النطاقات وتسجّل الأسباب. وعدّ الصفوف المعيبة والقرار في شأن القيم المفقودة يسبقان التدريب، لأن حذف كل صف فيه NaN يزيل كل الاستوديوهات، والملء بـ 0 يعلّم النموذج أن في الشقق ما لا غرف له. والخطوة الأخيرة هي قاعدة منظور الذكاء الاصطناعي: كود الاستخراج جزء من النموذج، فيجب أن تمرّ الإعلانات الحية على الدالة نفسها وإلا قرأ النموذج أسعار الشيكل دولارات بهدوء."
      }
    },
    {
      id: "t1l1q19",
      type: "complete",
      level: "medium",
      lang: "python",
      topics: ["t1-regex-primer", "t1-advert-parser-evolution"],
      q: {
        en: "Complete the pattern so that the program prints <code>1200</code> for the advert whose rent is “1,200 NIS”.",
        ar: "أكمل النمط بحيث يطبع البرنامج <code>1200</code> للإعلان الذي إيجاره «1,200 NIS»."
      },
      code: [
          "import re",
          "",
          "ad = \"Family apartment in Gaza City, 4 rooms, 120 sqm, 1,200 NIS/month\"",
          "",
          "m = re.search(r\"____\\s*(?:USD|NIS)\", ad)",
          "print(int(m.group(1).replace(\",\", \"\")))"
        ].join("\n"),
      options: [
        {
          code: "(\\d+)"
        },
        {
          code: "\\d[\\d,]*"
        },
        {
          code: "(\\d[\\d,]*)"
        },
        {
          code: "(\\d{4})"
        }
      ],
      answer: 2,
      solution: {
        code: "m = re.search(r\"(\\d[\\d,]*)\\s*(?:USD|NIS)\", ad)",
        en: "<code>(\\d[\\d,]*)</code> starts at a digit, accepts any run of digits and commas, and captures all of it; <code>replace(\",\", \"\")</code> then lets <code>int</code> read 1200.",
        ar: "يبدأ <code>(\\d[\\d,]*)</code> برقم، ويقبل أي سلسلة من الأرقام والفواصل، ويلتقطها كلها؛ ثم تتيح <code>replace(\",\", \"\")</code> لـ <code>int</code> أن يقرأ 1200."
      },
      hint: {
        en: "The number contains a comma, so the pattern must accept it, and it must capture the whole number in group 1. Try each option on “1,200” by hand.",
        ar: "العدد يحوي فاصلة، فيجب أن يقبلها النمط، وأن يلتقط العدد كله في المجموعة 1. جرّب كل خيار على «1,200» بيدك."
      },
      explain: {
        en: "The number contains a comma, so the pattern has to accept it, and a pair of parentheses has to capture it. <code>(\\d[\\d,]*)</code> starts at a digit, takes any run of digits and commas, and captures all of it; <code>replace</code> removes the comma and <code>int</code> reads 1200. <code>(\\d+)</code> is the tempting option because it is shortest: it captures only <code>200</code>, stops at the comma, and the program prints 200 with no error at all. <code>\\d[\\d,]*</code> has no parentheses, so there is no group 1 and <code>m.group(1)</code> raises an IndexError. <code>(\\d{4})</code> expects four digits in a row, finds none, so <code>re.search</code> returns None and <code>.group</code> fails with an AttributeError.",
        ar: "العدد يحوي فاصلة، فيجب أن يقبلها النمط، ويجب أن يلتقطه قوسان. <code>(\\d[\\d,]*)</code> يبدأ برقم ويأخذ أي سلسلة من الأرقام والفواصل ويلتقطها كلها؛ فتحذف <code>replace</code> الفاصلة ويقرأ <code>int</code> العدد 1200. أما <code>(\\d+)</code> فهو الخيار المغري لأنه الأقصر: يلتقط <code>200</code> فقط (يتوقف عند الفاصلة)، فيطبع البرنامج 200 دون أي خطأ. و<code>\\d[\\d,]*</code> بلا قوسين، فلا توجد مجموعة 1 وترفع <code>m.group(1)</code> خطأ IndexError. و<code>(\\d{4})</code> يتوقع أربعة أرقام متصلة ولا يجدها، فتعيد <code>re.search</code> القيمة None وتفشل <code>.group</code> بخطأ AttributeError."
      }
    },
    {
      id: "t1l1q20",
      type: "trace",
      level: "medium",
      lang: "python",
      topics: ["t1-regex-trace", "t1-regex-primer"],
      q: {
        en: "Trace the program. Give the values asked for below.",
        ar: "تتبّع البرنامج. اذكر القيم المطلوبة أدناه."
      },
      code: [
          "import re",
          "",
          "ad = \"Family apartment in Gaza City, 4 rooms, 120 sqm, 1,200 NIS/month\"",
          "fields = {}",
          "",
          "m = re.search(r\"(\\d+)\\s*rooms?\", ad)",
          "if m:",
          "    fields[\"rooms\"] = int(m.group(1))",
          "",
          "m = re.search(r\"(\\d+)\\s*(?:m2|m²)\", ad)",
          "if m:",
          "    fields[\"area_m2\"] = int(m.group(1))",
          "",
          "m = re.search(r\"(\\d[\\d,]*)\\s*(USD|NIS)\", ad)",
          "if m:",
          "    fields[\"rent\"] = int(m.group(1).replace(\",\", \"\"))",
          "    fields[\"currency\"] = m.group(2)"
        ].join("\n"),
      blanks: [
        {
          label: { en: "m, right after the second search (line 10)", ar: "m، بعد البحث الثاني مباشرة (السطر 10)" },
          accept: ["None"]
        },
        {
          label: { en: "len(fields) at the end", ar: "len(fields) في النهاية" },
          accept: ["3"]
        },
        {
          label: { en: "fields[\"rent\"] at the end", ar: "fields[\"rent\"] في النهاية" },
          accept: ["1200"]
        }
      ],
      hint: {
        en: "Check each pattern against the advert: which unit words does the second pattern know, and which unit does the advert use?",
        ar: "افحص كل نمط على الإعلان: ما كلمات الوحدة التي يعرفها النمط الثاني، وأي وحدة يستعمل الإعلان؟"
      },
      explain: {
        en: "The second pattern knows <code>m2</code> and <code>m²</code>, but the advert writes <code>120 sqm</code>, so <code>re.search</code> returns None, the body of the <code>if</code> is skipped and <code>area_m2</code> is never created: no error, no warning, the dictionary simply does not grow. The other two searches succeed: rooms 4, and rent 1200 (the pattern accepts the comma and <code>replace(\",\", \"\")</code> removes it before <code>int</code>), with currency \"NIS\". So <code>len(fields)</code> is 3. Lesson: a pattern knows only the phrasings its author anticipated, and \"not found\" must be recorded explicitly (Version 3's None, Version 4's problems column), or the missing area disappears unnoticed.",
        ar: "يعرف النمط الثاني <code>m2</code> و<code>m²</code>، لكن الإعلان يكتب <code>120 sqm</code>، فتعيد <code>re.search</code> القيمة None، ويُتخطى جسم <code>if</code> ولا يُنشأ <code>area_m2</code> أبدًا: لا خطأ ولا تحذير، القاموس لا ينمو ببساطة. وينجح البحثان الآخران: الغرف 4، والإيجار 1200 (يقبل النمط الفاصلة وتحذفها <code>replace(\",\", \"\")</code> قبل <code>int</code>) والعملة \"NIS\". فتكون قيمة <code>len(fields)</code> هي 3. الدرس: النمط لا يعرف إلا الصياغات التي توقعها كاتبه، ويجب تسجيل «لم يوجد» صراحة (None في النسخة 3 وعمود problems في النسخة 4) وإلا اختفت المساحة الناقصة دون أن يلحظ أحد."
      }
    },
    {
      id: "t1l1q21",
      type: "output",
      level: "hard",
      lang: "python",
      topics: ["t1-advert-parser-evolution"],
      q: {
        en: "This is Version 1 of the advert parser: split at the commas and take the pieces by position. Write exactly what the program prints.",
        ar: "هذه النسخة 1 من محلِّل الإعلانات: القصّ عند الفواصل وأخذ القطع بحسب مواضعها. اكتب بالضبط ما يطبعه البرنامج."
      },
      code: [
          "def parse_v1(ad):",
          "    parts = ad.split(\",\")",
          "    rooms = int(parts[1].split()[0])",
          "    area = int(parts[2].split()[0])",
          "    rent = int(parts[3].split()[0])",
          "    return rooms, area, rent",
          "",
          "ads = [",
          "    \"Flat in Rafah, 2 rooms, 80 m2, 250 USD/month\",",
          "    \"Flat in Rafah, 80 m2, 2 rooms, 250 USD/month\",",
          "    \"Flat in Rafah, 2 rooms, 80 m2, 1,150 NIS/month\",",
          "]",
          "for ad in ads:",
          "    print(*parse_v1(ad))"
        ].join("\n"),
      blanks: [
        {
          accept: ["2 80 250\n80 2 250\n2 80 1"],
          lines: 3
        }
      ],
      hint: {
        en: "Write out the list that <code>ad.split(\",\")</code> returns for each advert and index it by hand: parts 1, 2 and 3.",
        ar: "اكتب القائمة التي تعيدها <code>ad.split(\",\")</code> لكل إعلان وفهرسها بيدك: القطع 1 و2 و3."
      },
      explain: {
        en: "Version 1 reads positions: piece 1 is taken as the rooms, piece 2 as the area, piece 3 as the rent. Advert 1 follows the assumed template, so it is right. In advert 2 the same facts come in another order, so rooms becomes 80 and area 2, with no warning. In advert 3 the comma inside <code>1,150</code> cuts the number in two: piece 3 is <code> 1</code>, so the rent becomes 1. Nothing crashes, and the output looks like three valid rows: the meaning of a number is in the word next to it, not in its position.",
        ar: "تقرأ النسخة 1 المواضع: القطعة 1 تؤخذ غرفًا، والقطعة 2 مساحة، والقطعة 3 إيجارًا. الإعلان 1 يتبع القالب المفترض فهو صحيح. وفي الإعلان 2 تأتي الحقائق نفسها بترتيب آخر، فتصير الغرف 80 والمساحة 2 دون تحذير. وفي الإعلان 3 تشطر الفاصلة داخل <code>1,150</code> العدد نصفين: القطعة 3 هي <code> 1</code>، فيصير الإيجار 1. لا شيء ينهار ويبدو الناتج ثلاثة صفوف سليمة: فمعنى الرقم في الكلمة المجاورة له لا في موضعه."
      }
    },
    {
      id: "t1l1q22",
      type: "ordercode",
      level: "medium",
      lang: "python",
      topics: ["t1-advert-parser-evolution", "t1-not-found-and-ranges"],
      q: {
        en: "These seven statements pull a rent out of one advert and check it against the plausible range for USD (50 to 3000). Put them in the order in which they can run.",
        ar: "هذه العبارات السبع تستخرج إيجارًا من إعلان واحد وتفحصه بالنسبة إلى النطاق المعقول بالدولار (من 50 إلى 3000). رتّبها بالترتيب الذي يمكن أن تعمل به."
      },
      items: [
        {
          code: "import re"
        },
        {
          code: "RENT = re.compile(r\"(\\d[\\d,]*)\\s*(USD|NIS)\")"
        },
        {
          code: "m = RENT.search(\"Quiet annex in Rafah, 1 room, 28 m2, rent 9000 USD\")"
        },
        {
          code: "rent = int(m.group(1).replace(\",\", \"\")) if m else None"
        },
        {
          code: "ok = rent is not None and 50 <= rent <= 3000"
        },
        {
          code: "problem = \"\" if ok else \"rent not found or out of range\""
        },
        {
          code: "print(problem)"
        }
      ],
      answer: [0, 1, 2, 3, 4, 5, 6],
      hint: {
        en: "Each statement uses a name that an earlier statement created. Start from the one that needs nothing.",
        ar: "كل عبارة تستعمل اسمًا أنشأته عبارة سابقة. ابدأ بالتي لا تحتاج إلى شيء."
      },
      explain: {
        en: "The chain is forced by what each line uses: <code>re</code> must be imported before the pattern is compiled; the pattern must exist before it can search the advert; the match <code>m</code> must exist before the number is read from <code>m.group(1)</code>; <code>rent</code> must be a number (or None) before it is compared with the limits; <code>ok</code> must exist before the problem text is chosen, and the text before it is printed. The conditional expression <code>... if m else None</code> is Version 3's way of saying \"not found\", and the range test with a recorded reason is Version 4's: the 9000 USD annex of 28 m2 is flagged instead of passing as a valid rent.",
        ar: "السلسلة تفرضها ما تستعمله كل عبارة: يجب استيراد <code>re</code> قبل تصريف النمط؛ ويجب أن يوجد النمط قبل أن يبحث في الإعلان؛ ويجب أن توجد المطابقة <code>m</code> قبل قراءة العدد من <code>m.group(1)</code>؛ ويجب أن يكون <code>rent</code> عددًا (أو None) قبل مقارنته بالحدود؛ ويجب أن يوجد <code>ok</code> قبل اختيار نص المشكلة، والنص قبل طباعته. والتعبير الشرطي <code>... if m else None</code> هو طريقة النسخة 3 في قول «لم يوجد»، واختبار النطاق مع تسجيل السبب هو طريقة النسخة 4: فملحق 28 م2 بإيجار 9000 دولار يُعلَّم بدل أن يمرّ إيجارًا سليمًا."
      }
    },
    {
      id: "t1l1q23",
      type: "write",
      level: "medium",
      lang: "python",
      topics: ["t1-regex-primer", "t1-not-found-and-ranges"],
      q: {
        en: "Write a function <code>get_area(text)</code> that returns the area of an advert as a float, or <code>None</code> when the advert gives no area. The unit is written <code>m2</code> or <code>sqm</code>, with or without a space before it, and the number may have decimals. Examples: <code>\"Flat, 95 m2\"</code> gives <code>95.0</code>; <code>\"70m2\"</code> gives <code>70.0</code>; <code>\"120 sqm\"</code> gives <code>120.0</code>; <code>\"62.5 m2\"</code> gives <code>62.5</code>; <code>\"Studio near the market\"</code> gives <code>None</code>.",
        ar: "اكتب دالة <code>get_area(text)</code> تعيد مساحة الإعلان عددًا عشريًّا float، أو <code>None</code> حين لا يذكر الإعلان مساحة. تُكتب الوحدة <code>m2</code> أو <code>sqm</code>، بمسافة قبلها أو بدونها، وقد يكون في العدد كسر عشري. أمثلة: <code>\"Flat, 95 m2\"</code> يعطي <code>95.0</code>؛ و<code>\"70m2\"</code> يعطي <code>70.0</code>؛ و<code>\"120 sqm\"</code> يعطي <code>120.0</code>؛ و<code>\"62.5 m2\"</code> يعطي <code>62.5</code>؛ و<code>\"Studio near the market\"</code> يعطي <code>None</code>."
      },
      starter: [
          "import re",
          "",
          "def get_area(text):",
          "    ..."
        ].join("\n"),
      lines: 8,
      checks: [
        {
          re: "def\\s+get_area\\s*\\(\\s*text\\s*\\)",
          label: { en: "defines get_area(text)", ar: "يعرّف الدالة get_area(text)" }
        },
        {
          re: "(?=.*\\.(?:search|findall|finditer)\\s*\\()(?=.*\\\\d)",
          label: {
            en: "searches the text with a pattern that captures digits (\\d)",
            ar: "يبحث في النص بنمط يلتقط الأرقام (\\d)"
          }
        },
        {
          re: "(?=.*m2)(?=.*sqm)",
          label: { en: "recognises both units: m2 and sqm", ar: "يتعرف على الوحدتين: m2 وsqm" }
        },
        {
          re: "\\\\\\.|\\[\\\\d\\.\\]|\\[\\.\\\\d\\]",
          label: { en: "allows a decimal part", ar: "يسمح بجزء عشري" }
        },
        {
          re: "(?=.*float\\s*\\()(?=.*\\bNone\\b)",
          label: {
            en: "converts with float() and gives None when nothing is found",
            ar: "يحوّل بـ float() ويعطي None حين لا يجد شيئًا"
          }
        }
      ],
      forbid: [
        {
          re: "\\.split\\s*\\(",
          label: { en: "cutting the text with split (position, not meaning)", ar: "قصّ النص بـ split (موضع لا معنى)" }
        },
        {
          re: "\\breturn\\s+(?:0|-1)\\b|\\belse\\s+(?:0|-1)\\b",
          label: { en: "0 or -1 standing for “not found”", ar: "0 أو -1 تعني «لم يوجد»" }
        }
      ],
      solution: {
        code: [
            "import re",
            "",
            "def get_area(text):",
            "    m = re.search(r\"(\\d+(?:\\.\\d+)?)\\s*(?:m2|sqm)\", text)",
            "    return float(m.group(1)) if m else None"
          ].join("\n"),
        en: "The pattern looks for the number next to its unit word wherever the sentence puts it, allows an optional decimal part, and the conditional expression turns “no match” into <code>None</code> instead of an AttributeError.",
        ar: "يبحث النمط عن الرقم المجاور لكلمة وحدته أينما وضعته الجملة، ويسمح بجزء عشري اختياري، ويحوّل التعبير الشرطي «لا مطابقة» إلى <code>None</code> بدل خطأ AttributeError."
      },
      hint: {
        en: "A group captures the number, and <code>re.search</code> returns None when nothing matches. What must you test before calling <code>.group</code> on its result?",
        ar: "المجموعة تلتقط الرقم، وتعيد <code>re.search</code> القيمة None حين لا يطابق شيء. ماذا يجب أن تختبر قبل أن تستدعي <code>.group</code> على نتيجتها؟"
      },
      explain: {
        en: "The model answer searches for the number next to its unit word, wherever the sentence puts it, allows an optional decimal part, and returns <code>None</code> when <code>re.search</code> finds nothing, through <code>float(m.group(1)) if m else None</code>. The common slips: calling <code>.group</code> on None (an AttributeError), splitting by position (the facts come in any order), and returning 0 for \"not found\", which a table would treat as a real area of zero square metres and a model would learn from. A None becomes NaN in a DataFrame, and <code>isna()</code> can count it.",
        ar: "تبحث الإجابة النموذجية عن الرقم المجاور لكلمة وحدته أينما وضعته الجملة، وتسمح بجزء عشري اختياري، وتعيد <code>None</code> حين لا تجد <code>re.search</code> شيئًا، عبر <code>float(m.group(1)) if m else None</code>. والزلات الشائعة: استدعاء <code>.group</code> على None (خطأ AttributeError)، والقصّ بالموضع (فالحقائق تأتي بأي ترتيب)، وإعادة 0 لـ «لم يوجد»، وسيعامله الجدول مساحة حقيقية قدرها صفر متر مربع ويتعلم منها النموذج. وتصير None في الـ DataFrame القيمة NaN، ويستطيع <code>isna()</code> عدّها."
      }
    },
    {
      id: "t1l1q24",
      type: "mcq",
      level: "hard",
      topics: ["t1-not-found-and-ranges", "t1-advert-parser-evolution"],
      q: {
        en: "Version 4 of the advert parser prints <code>adverts with a problem: 3 of 8</code>. Its <code>rent</code> column holds 300 and 300 (USD), then 1200 (an advert written in NIS), and so on, and the 9000 USD annex is flagged <code>rent out of range</code>. Which statement about the finished table is true?",
        ar: "تطبع النسخة 4 من محلِّل الإعلانات <code>adverts with a problem: 3 of 8</code>. وفي عمود <code>rent</code> القيم 300 و300 (دولار) ثم 1200 (إعلان مكتوب بالشيكل) وهكذا، ويُعلَّم ملحق 9000 دولار بـ <code>rent out of range</code>. أي عبارة عن الجدول النهائي صحيحة؟"
      },
      options: [
        {
          en: "The rent column is on one scale now, because the parser has given the currency a column of its own and so keeps NIS and USD apart.",
          ar: "عمود الإيجار على سُلّم واحد الآن، لأن المحلِّل جعل للعملة عمودًا خاصًّا بها فصار يفصل بين الشيكل والدولار."
        },
        {
          en: "NIS and USD rents still share one column on different scales; converting them needs an exchange rate for a date, which is the analyst's call.",
          ar: "ما زالت إيجارات الشيكل والدولار في عمود واحد على سلّمين مختلفين؛ وتحويلها يحتاج إلى سعر صرف لتاريخ معيّن، وهو قرار المحلل."
        },
        {
          en: "An advert phrased in a way the patterns do not know now raises an error that names the field it could not find, so nothing slips through.",
          ar: "الإعلان الذي صيغ بطريقة لا تعرفها الأنماط يرفع الآن خطأً يسمّي الحقل الذي لم يجده، فلا يفلت شيء."
        },
        {
          en: "Because every bad row is flagged, the three flagged rows can safely be dropped before training, with no loss of useful information.",
          ar: "ما دامت كل صفوف المشاكل معلَّمة، يمكن حذف الصفوف الثلاثة المعلَّمة قبل التدريب بأمان ودون فقدان معلومات نافعة."
        }
      ],
      answer: 1,
      hint: {
        en: "Version 4 added a table of limits and a problems column. Ask what each of them can and cannot decide, and whether anything in the code converts one currency into another.",
        ar: "أضافت النسخة 4 جدول حدود وعمود problems. اسأل ماذا يستطيع كل منهما أن يقرر وماذا لا يستطيع، وهل في الكود ما يحوّل عملة إلى أخرى."
      },
      explain: {
        en: "Version 4 fixes the missing reasons and the absurd values, not the scale: the currency is now data in its own column, but 1200 NIS and 300 USD still sit side by side, and turning them into one unit needs an exchange rate for a date, which is the analyst's decision. A phrasing nobody anticipated does not raise an error (third option): it lands in \"not found\", and the problems column at least tells you so. Dropping the flagged rows (fourth option) would remove the studio with no rooms and every advert like it; the point of keeping them is that the reason and the count survive: \"3 of 8\" is a number to report and to watch fall as the patterns improve. The first option is tempting because a column called currency looks like a conversion, but labelling is not converting.",
        ar: "أصلحت النسخة 4 الأسباب المفقودة والقيم الشاذة، لا السلّم: فالعملة صارت بيانات في عمودها الخاص، لكن 1200 شيكل و300 دولار ما زالتا جنبًا إلى جنب، وتحويلهما إلى وحدة واحدة يحتاج إلى سعر صرف لتاريخ معيّن، وهو قرار المحلل. والصياغة التي لم يتوقعها أحد لا ترفع خطأً (الخيار الثالث): بل تسقط في «لم يوجد»، وعمود problems يخبرك بذلك على الأقل. وحذف الصفوف المعلَّمة (الخيار الرابع) سيزيل الاستوديو بلا غرف وكل إعلان مثله؛ وفائدة إبقائها أن السبب والعدد يبقيان: «3 من 8» رقم تبلّغ عنه وتراقب انخفاضه كلما تحسنت الأنماط. والخيار الأول مغرٍ لأن عمودًا اسمه currency يبدو تحويلًا، لكن التسمية ليست تحويلًا."
      }
    }
  ]
};
