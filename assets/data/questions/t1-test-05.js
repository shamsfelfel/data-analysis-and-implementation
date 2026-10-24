window.DABanks = window.DABanks || {};
(function () {
  /* code(line, line, ...) -> one string with \n between lines */
  function code() { return Array.prototype.join.call(arguments, "\n"); }

  window.DABanks["t1-test-05"] = {
    title: {
      en: "Test 5 — Nested Data and APIs: JSON",
      ar: "اختبار 5 — البيانات المتشعّبة والواجهات: JSON وAPI"
    },
    intro: {
      en: "24 questions on Lesson 5: JSON and the Python types it becomes, strict parsing and writing back, reading optional nested fields safely, flattening with <code>pd.json_normalize</code>, list fields, an API as request and response, status codes, pagination, rate limits and back-off, <code>fetch_all()</code>, API keys, and validating JSON that a model returns. All outputs were produced by running the code with Python 3.13 and pandas 2.2 against the lesson's classroom server; nothing here touches the network. Plan for about 40 minutes. Every question has a hint, an answer and an explanation, hidden until you ask for them: try first, then open them. A revealed answer is not counted.",
      ar: "24 سؤالًا عن الدرس 5: JSON وأنواع بايثون التي تصيرها، والتحليل الصارم والكتابة من جديد، وقراءة الحقول المتشعّبة الاختيارية بأمان، والتسطيح بـ<code>pd.json_normalize</code>، وحقول القوائم، والواجهة طلبًا واستجابة، ورموز الحالة، والتصفيح، وحدود المعدّل والتباطؤ، و<code>fetch_all()</code>، ومفاتيح الواجهة، والتحقق من JSON الذي يعيده نموذج. كل النواتج مأخوذة من تشغيل الكود فعلًا ببايثون 3.13 وpandas 2.2 على الخادم الصفّي في الدرس؛ ولا شيء هنا يلمس الشبكة. خصّص نحو 40 دقيقة. لكل سؤال تلميح وجواب وشرح، وكلها مخفية حتى تطلبها: جرّب أولًا ثم افتحها. والجواب الذي يُظهَر لا يُحتسب."
    },
    questions: [

      /* ---------------------------------------------------------- 01 */
      {
        id: "t1l5q01",
        type: "tf",
        level: "easy",
        topics: [
          "t1-json-syntax",
          "t1-key-census"
        ],
        q: {
          en: "A reply arrives as the text below. True or false: the program prints <code>not given</code> twice, because neither the phone nor the email has a value.",
          ar: "يصل ردّ بالنصّ أدناه. صح أم خطأ: يطبع البرنامج <code>not given</code> مرتين، لأنه لا توجد قيمة للهاتف ولا للبريد."
        },
        code: code(
          "import json",
          "",
          "info = json.loads('{\"id\": 7, \"phone\": null}')",
          "print(info.get(\"phone\", \"not given\"))",
          "print(info.get(\"email\", \"not given\"))"
        ),
        truth: false,
        hint: {
          en: "Compare the two keys: one is in the dictionary, holding a value, and the other is not in it at all. When does <code>.get</code> use its second argument?",
          ar: "قارن بين المفتاحين: أحدهما موجود في القاموس ويحمل قيمة، والآخر غير موجود فيه أصلًا. متى تستعمل <code>.get</code> معاملها الثاني؟"
        },
        explain: {
          en: "False. The program prints <code>None</code> and then <code>not given</code>. JSON <code>null</code> becomes Python <code>None</code>, and the key <code>phone</code> is still there, so <code>.get</code> returns what is stored; the default is used only for a key that is absent, like <code>email</code>. 'Present with no value' and 'absent' are two situations that the key census of Concept 2 keeps apart, and the difference is exactly what breaks the chained <code>.get</code> of Version 2 when <code>contacts</code> is an explicit null. Rule to carry away: a default protects you from absence, never from <code>None</code>.",
          ar: "خطأ. يطبع البرنامج <code>None</code> ثم <code>not given</code>. القيمة <code>null</code> في JSON تصير <code>None</code> في بايثون، والمفتاح <code>phone</code> ما زال موجودًا، فتعيد <code>.get</code> ما هو مخزَّن؛ ولا تُستعمل القيمة الافتراضية إلا مع مفتاح غائب مثل <code>email</code>. «موجود بلا قيمة» و«غائب» حالتان يفصل بينهما تعداد المفاتيح في المفهوم 2، وهذا الفرق هو ما يكسر سلسلة <code>.get</code> في النسخة 2 حين تكون <code>contacts</code> قيمة null صريحة. القاعدة: القيمة الافتراضية تحميك من الغياب، لا من <code>None</code>."
        }
      },

      /* ---------------------------------------------------------- 02 */
      {
        id: "t1l5q02",
        type: "output",
        level: "easy",
        topics: [
          "t1-json-syntax"
        ],
        q: {
          en: "Write exactly what the program prints.",
          ar: "اكتب بالضبط ما يطبعه البرنامج."
        },
        code: code(
          "import json",
          "",
          "text = ('{\"id\": 7, \"ratio\": 1.0, \"n\": 3e2, \"ok\": true, '",
          "        '\"phone\": null, \"tags\": [], \"loc\": {\"lat\": 31.5}}')",
          "record = json.loads(text)",
          "print([type(v).__name__ for v in record.values()])"
        ),
        blanks: [
          {
            accept: [
              "['int', 'float', 'float', 'bool', 'NoneType', 'list', 'dict']",
              "[\"int\", \"float\", \"float\", \"bool\", \"NoneType\", \"list\", \"dict\"]",
              "['int','float','float','bool','NoneType','list','dict']",
              "[\"int\",\"float\",\"float\",\"bool\",\"NoneType\",\"list\",\"dict\"]"
            ],
            wide: true
          }
        ],
        hint: {
          en: "Look at how each value is written in the text: a dot, an exponent, quotes, brackets. What do <code>true</code> and <code>null</code> become?",
          ar: "انظر إلى طريقة كتابة كل قيمة في النص: نقطة، أُسّ، علامات اقتباس، أقواس. ماذا تصير <code>true</code> و<code>null</code>؟"
        },
        explain: {
          en: "A JSON number with a dot or an exponent becomes a <code>float</code>; only a bare integer becomes an <code>int</code>. So <code>1.0</code> is a float, and so is <code>3e2</code> (it is 300.0, not 300). <code>true</code> becomes <code>True</code> (type <code>bool</code>), <code>null</code> becomes <code>None</code> (type <code>NoneType</code>), <code>[]</code> a <code>list</code> and <code>{...}</code> a <code>dict</code>, and <code>record.values()</code> keeps the order of the text. The tempting slips are reading <code>1.0</code> and <code>3e2</code> as whole numbers, because they look like integers to a person. Rule: the way a number is written decides its Python type.",
          ar: "الرقم في JSON الذي فيه نقطة أو أُسّ يصير <code>float</code>، ولا يصير <code>int</code> إلا العدد الصحيح المجرّد. فـ<code>1.0</code> عدد عشري، وكذلك <code>3e2</code> (هو 300.0 لا 300). وتصير <code>true</code> هي <code>True</code> (النوع <code>bool</code>)، وتصير <code>null</code> هي <code>None</code> (النوع <code>NoneType</code>)، و<code>[]</code> هي <code>list</code>، و<code>{...}</code> هي <code>dict</code>، وتحافظ <code>record.values()</code> على ترتيب النص. والزلّتان المغريتان أن تقرأ <code>1.0</code> و<code>3e2</code> عددين صحيحين لأنهما يبدوان كذلك للإنسان. القاعدة: طريقة كتابة الرقم هي التي تحدّد نوعه في بايثون."
        }
      },

      /* ---------------------------------------------------------- 03 */
      {
        id: "t1l5q03",
        type: "multi",
        level: "medium",
        topics: [
          "t1-json-parse-errors",
          "t1-json-syntax"
        ],
        q: {
          en: "Which of these texts does <code>json.loads</code> accept without raising an error? (Choose all that apply.)",
          ar: "أيّ هذه النصوص تقبله <code>json.loads</code> دون أن ترفع خطأً؟ (اختر كل ما ينطبق.)"
        },
        options: [
          {
            code: "{'id': 7}"
          },
          {
            code: "{\"id\": 7, \"double_shift\": False}"
          },
          {
            code: "{\"ratio\": NaN}"
          },
          {
            code: "{\"id\": 7, \"tags\": [\"lab\", \"library\"],}"
          },
          {
            code: "{\"id\": 7, \"double_shift\": false, \"contacts\": null}"
          },
          {
            code: "Here is the JSON: {\"id\": 7}"
          }
        ],
        answer: [2, 4],
        hint: {
          en: "Check each text against the rules one at a time: quote marks, a comma before the closing brace, text outside the document, and how <code>true</code>, <code>false</code> and <code>null</code> are spelled. One of the odd-looking texts behaves differently from what the standard says.",
          ar: "افحص كل نص مقابل القواعد واحدة واحدة: علامات الاقتباس، وفاصلة قبل القوس الختامي، ونص خارج الوثيقة، وكيف تُكتب <code>true</code> و<code>false</code> و<code>null</code>. وأحد النصوص الغريبة يتصرّف خلاف ما يقوله المعيار."
        },
        explain: {
          en: "Accepted: the plain object with lowercase <code>false</code> and <code>null</code>, and, surprisingly, <code>{\"ratio\": NaN}</code>. Python's parser lets <code>NaN</code> through although the JSON standard does not allow it, so a file that Python reads happily may be rejected by another tool (<code>allow_nan=False</code> makes <code>json.dumps</code> strict). Rejected: single quotes (that is Python, not JSON), a capital <code>False</code> (a value copied from a Python <code>print</code>), a trailing comma, and prose before the object. The last two are the typical slips in a language model's reply. The common mistake is to treat JSON as 'Python literals': JSON constants are lowercase and strings take double quotes only.",
          ar: "المقبول: الكائن العادي بـ<code>false</code> و<code>null</code> بأحرف صغيرة، وكذلك، وهذا مفاجئ، <code>{\"ratio\": NaN}</code>. فمحلّل بايثون يمرّر <code>NaN</code> مع أن معيار JSON لا يسمح بها، فقد يرفض أداة أخرى ملفًّا تقرؤه بايثون بسهولة (و<code>allow_nan=False</code> تجعل <code>json.dumps</code> صارمة). والمرفوض: علامات الاقتباس المفردة (هذه بايثون لا JSON)، و<code>False</code> بحرف كبير (قيمة منسوخة من <code>print</code> في بايثون)، والفاصلة الزائدة، والنثر قبل الكائن. والأخيران هما الزلّتان المعتادتان في ردّ النموذج اللغوي. والخطأ الشائع أن تعامل JSON كأنها «قيم بايثون الحرفية»: ثوابت JSON بأحرف صغيرة والنصوص بعلامات اقتباس مزدوجة فقط."
        }
      },

      /* ---------------------------------------------------------- 04 */
      {
        id: "t1l5q04",
        type: "fill",
        level: "easy",
        topics: [
          "t1-json-load",
          "t1-json-dumps"
        ],
        q: {
          en: "Fill in the four blanks. The program must read <code>schools.json</code> (a UTF-8 file whose top level is one object), take the list of schools and print the name object of school 1 with its Arabic text readable, not as <code>\\u0645\\u062f…</code> escapes.",
          ar: "املأ الفراغات الأربعة. يجب أن يقرأ البرنامج <code>schools.json</code> (ملف UTF-8 مستواه الأعلى كائن واحد)، ويأخذ قائمة المدارس، ويطبع كائن اسم المدرسة 1 بنصّه العربي مقروءًا لا على هيئة رموز الهروب <code>\\u0645\\u062f…</code>."
        },
        code: code(
          "import json",
          "",
          "with open(\"downloads/t1/schools.json\", encoding=\"____1____\") as f:",
          "    data = json.____2____(f)                   # from a file object",
          "schools = data[\"____3____\"]                    # the list of 13 schools",
          "print(json.dumps(schools[0][\"name\"], ensure_ascii=____4____))"
        ),
        blanks: [
          {
            accept: [
              "utf-8",
              "utf8",
              "UTF-8",
              "UTF8",
              "utf-8-sig"
            ]
          },
          {
            accept: [
              "load"
            ]
          },
          {
            accept: [
              "results"
            ]
          },
          {
            accept: [
              "False"
            ]
          }
        ],
        hint: {
          en: "Which function reads from an open file, and which key did the file's single top-level object have? For the last blank, recall what <code>ensure_ascii</code> does by default.",
          ar: "أيّ دالة تقرأ من ملف مفتوح، وما المفتاح الوحيد في الكائن الأعلى للملف؟ وللفراغ الأخير تذكّر ما تفعله <code>ensure_ascii</code> افتراضيًّا."
        },
        explain: {
          en: "<code>json.load(f)</code> reads from a file object (the <code>s</code> in <code>loads</code> stands for string). The top level of this file is a dictionary with one key, <code>results</code>, whose value is the list of 13 schools, so the address is <code>data[\"results\"]</code>, not <code>data[0]</code>. Opening with <code>encoding=\"utf-8\"</code> keeps the Arabic names intact, and <code>ensure_ascii=False</code> makes <code>dumps</code> write them as letters instead of <code>\\u0645\\u062f…</code> escapes, which are valid but unreadable. The pair to remember when writing is <code>ensure_ascii=False</code> plus a file opened with <code>encoding=\"utf-8\"</code>.",
          ar: "تقرأ <code>json.load(f)</code> من كائن ملف (والحرف <code>s</code> في <code>loads</code> هو string). والمستوى الأعلى في هذا الملف قاموس بمفتاح واحد هو <code>results</code> وقيمته قائمة المدارس الثلاث عشرة، فالعنوان هو <code>data[\"results\"]</code> لا <code>data[0]</code>. وفتح الملف بـ<code>encoding=\"utf-8\"</code> يحفظ الأسماء العربية سليمة، و<code>ensure_ascii=False</code> تجعل <code>dumps</code> تكتبها حروفًا بدل رموز الهروب <code>\\u0645\\u062f…</code> التي هي صحيحة لكنها غير مقروءة. والثنائي الذي يجب تذكّره عند الكتابة: <code>ensure_ascii=False</code> مع ملف مفتوح بـ<code>encoding=\"utf-8\"</code>."
        }
      },

      /* ---------------------------------------------------------- 05 */
      {
        id: "t1l5q05",
        type: "contrast",
        level: "easy",
        topics: [
          "t1-xml",
          "t1-json-syntax"
        ],
        q: {
          en: "Place each statement under JSON (read with <code>json.loads</code>), under XML (read with <code>ElementTree</code>), or under both.",
          ar: "ضع كل عبارة تحت JSON (تُقرأ بـ<code>json.loads</code>) أو تحت XML (تُقرأ بـ<code>ElementTree</code>) أو تحت كليهما."
        },
        concepts: [
          {
            en: "JSON",
            ar: "JSON"
          },
          {
            en: "XML",
            ar: "XML"
          }
        ],
        rows: [
          {
            s: {
              en: "Python reads it with a module of the standard library, nothing to install",
              ar: "تقرؤه بايثون بوحدة من المكتبة القياسية، ولا شيء يُثبَّت"
            },
            a: 2
          },
          {
            s: {
              en: "A number such as the enrolment 272 arrives already as a number",
              ar: "يصل الرقم، مثل عدد الطلبة 272، رقمًا جاهزًا"
            },
            a: 0
          },
          {
            s: {
              en: "Every value arrives as text, so <code>'272'</code> has to be converted by you",
              ar: "تصل كل قيمة نصًّا، فعليك أنت تحويل <code>'272'</code>"
            },
            a: 1
          },
          {
            s: {
              en: "Writes its data with opening and closing tags and attributes",
              ar: "يكتب بياناته بوسوم فتح وإغلاق وسمات"
            },
            a: 1
          },
          {
            s: {
              en: "Describes a tree that you walk with keys and positions, so an optional part may be absent and the code must expect it",
              ar: "يصف شجرة تمشي عليها بالمفاتيح والمواضع، فقد يغيب جزء اختياري وعلى الكود أن يتوقع ذلك"
            },
            a: 2
          },
          {
            s: {
              en: "The format the lesson recommends when you are free to choose",
              ar: "الصيغة التي يوصي بها الدرس حين تكون حرًّا في الاختيار"
            },
            a: 0
          }
        ],
        hint: {
          en: "Ask what each format does with the number 272, and what the two have in common as a shape.",
          ar: "اسأل: ماذا تفعل كل صيغة بالرقم 272؟ وما الذي تشتركان فيه من حيث الشكل؟"
        },
        explain: {
          en: "Both formats describe a nested tree and both are read by the standard library, so the habits of the lesson (optional parts, flattening, pagination) carry over to XML; only the parser changes. They differ in what they hand over: <code>json.loads</code> returns Python types (numbers stay numbers, <code>null</code> becomes <code>None</code>), while XML is text all the way down, tags and attributes included, so <code>boys=\"272\"</code> arrives as <code>'272'</code> and you convert it yourself. That is also why the lesson's advice is 'if you choose the format, choose JSON; if the source is XML, you do not need to fear it'.",
          ar: "كلتا الصيغتين تصف شجرة متشعّبة وكلتاهما تقرؤهما المكتبة القياسية، فتنتقل عادات الدرس (الأجزاء الاختيارية والتسطيح والتصفيح) إلى XML؛ ولا يتغيّر إلا المحلّل. وتختلفان فيما تسلّمانه: تعيد <code>json.loads</code> أنواع بايثون (تبقى الأرقام أرقامًا وتصير <code>null</code> هي <code>None</code>)، أما XML فنصّ حتى الأعماق، بوسومه وسماته، فتصل <code>boys=\"272\"</code> على هيئة <code>'272'</code> وتحوّلها بنفسك. ولهذا نصيحة الدرس: «إن كان الاختيار لك فاختر JSON، وإن كان المصدر XML فلا داعي لأن تخافه»."
        }
      },

      /* ---------------------------------------------------------- 06 */
      {
        id: "t1l5q06",
        type: "compare",
        level: "medium",
        topics: [
          "t1-safe-access",
          "t1-key-census"
        ],
        q: {
          en: "<code>schools</code> is the list of 13 records from the file, and <code>dig</code> is the helper from the lesson. A new record with an explicit null, <code>{\"id\": 214, \"contacts\": None}</code>, is appended. Which statement is correct?",
          ar: "<code>schools</code> قائمة السجلات الثلاثة عشر من الملف، و<code>dig</code> الدالة المساعدة من الدرس. أُضيف سجلّ جديد بقيمة null صريحة هو <code>{\"id\": 214, \"contacts\": None}</code>. أيّ العبارات صحيحة؟"
        },
        codeA: code(
          "rows = schools + [{\"id\": 214, \"contacts\": None}]",
          "emails = [s.get(\"contacts\", {}).get(\"email\") for s in rows]",
          "print(emails.count(None), \"without an email\")"
        ),
        codeB: code(
          "rows = schools + [{\"id\": 214, \"contacts\": None}]",
          "emails = [dig(s, \"contacts\", \"email\") for s in rows]",
          "print(emails.count(None), \"without an email\")"
        ),
        options: [
          {
            en: "A is better: the default <code>{}</code> already protects the second <code>.get</code> whenever <code>contacts</code> is missing or null, it is shorter, and it needs no helper function to write and maintain.",
            ar: "أ أفضل: القيمة الافتراضية <code>{}</code> تحمي <code>.get</code> الثانية أصلًا كلما غابت <code>contacts</code> أو كانت null، وهو أقصر، ولا يحتاج إلى دالة مساعدة تُكتب وتُصان."
          },
          {
            en: "They behave the same: <code>dig</code> is only the chained <code>.get</code> moved into a function, so choosing between them is a matter of taste and of how much code you want inside the loop.",
            ar: "يتصرفان تصرفًا واحدًا: <code>dig</code> مجرد سلسلة <code>.get</code> نُقلت إلى دالة، فالاختيار بينهما مسألة ذوق ومقدار الكود الذي تريده داخل الحلقة."
          },
          {
            en: "B is better here: A raises <code>AttributeError</code> on the null record and B prints 11. But B cannot complain about a mistyped path, so check it against the census (3 emails).",
            ar: "ب أفضل هنا: يرفع أ <code>AttributeError</code> عند السجلّ ذي القيمة null ويطبع ب العدد 11. لكنّ ب لا يشتكي من مسار فيه خطأ إملائي، فقارنه بالتعداد (3 رسائل بريد)."
          },
          {
            en: "B is better, so use <code>dig</code> for every access, even <code>s[\"id\"]</code>: then required keys can never crash the program either, and no record can ever stop the run.",
            ar: "ب أفضل، فاستعمل <code>dig</code> في كل وصول، حتى <code>s[\"id\"]</code>: فلا تُسقط المفاتيح المطلوبة البرنامجَ أيضًا، ولا يستطيع أي سجلّ أن يوقف التشغيل."
          }
        ],
        answer: 2,
        hint: {
          en: "Run A on the last record: is <code>contacts</code> absent from it, or present? Then ask what B would do with a typo in its path.",
          ar: "شغّل أ على السجلّ الأخير: هل <code>contacts</code> غائبة عنه أم موجودة؟ ثم اسأل: ماذا يفعل ب مع خطأ إملائي في مساره؟"
        },
        explain: {
          en: "A raises <code>AttributeError: 'NoneType' object has no attribute 'get'</code> on record 214: the key <code>contacts</code> is present with the value <code>None</code>, so the default <code>{}</code> is never used and the second <code>.get</code> is called on <code>None</code>. B's <code>dig</code> treats an absent key, a null, a wrong type and an out-of-range position alike, and prints 11 (the 10 schools without an email plus record 214). What B leaves open is the lesson's warning: a mistyped path such as <code>dig(s, \"contact\", \"email\")</code> also 'works' and reports 14 without an email, so compare the result with the census (3 emails) or assert that at least one record produced a value. The last option overreaches: for a required key like <code>id</code> the crash is the information you want, so plain <code>[]</code> stays right there; use <code>dig</code> only where absence is a legitimate, expected state.",
          ar: "يرفع أ الخطأ <code>AttributeError: 'NoneType' object has no attribute 'get'</code> عند السجلّ 214: المفتاح <code>contacts</code> موجود بقيمة <code>None</code>، فلا تُستعمل القيمة الافتراضية <code>{}</code> أبدًا وتُستدعى <code>.get</code> الثانية على <code>None</code>. أما <code>dig</code> في ب فتعامل المفتاح الغائب وقيمة null والنوع المختلف والموضع خارج المدى معاملة واحدة، فيطبع 11 (المدارس العشر بلا بريد مع السجلّ 214). وما يتركه ب مفتوحًا هو تحذير الدرس: مسار فيه خطأ إملائي مثل <code>dig(s, \"contact\", \"email\")</code> «يعمل» أيضًا ويُبلغ عن 14 بلا بريد، فقارن النتيجة بالتعداد (3 رسائل بريد) أو تأكّد بـ assert من أن سجلًّا واحدًا على الأقل أنتج قيمة. والخيار الأخير يبالغ: ففي مفتاح مطلوب مثل <code>id</code> يكون الانهيار هو المعلومة التي تريدها، فيبقى <code>[]</code> العادي صحيحًا هناك؛ واستعمل <code>dig</code> حيث يكون الغياب حالة مشروعة متوقعة."
        }
      },

      /* ---------------------------------------------------------- 07 */
      {
        id: "t1l5q07",
        type: "compare",
        level: "medium",
        topics: [
          "t1-fetch-versions",
          "t1-pagination"
        ],
        q: {
          en: "Both functions are called as <code>load_schools(get)</code> with <code>get = make_fake_get(script={2: [429]})</code>: the server answers 429 once, on page 2. On a good day A returns 5 rows and B returns 13. Which statement is correct?",
          ar: "تُستدعى الدالتان هكذا <code>load_schools(get)</code> مع <code>get = make_fake_get(script={2: [429]})</code>: يردّ الخادم بـ429 مرة واحدة في الصفحة 2. وفي اليوم الجيد تعيد أ خمسة صفوف وتعيد ب ثلاثة عشر. أيّ العبارات صحيحة؟"
        },
        codeA: code(
          "def load_schools(get):",
          "    resp = get(URL)",
          "    if resp.status_code != 200:",
          "        raise RuntimeError(f\"registry answered {resp.status_code}\")",
          "    return resp.json()[\"results\"]"
        ),
        codeB: code(
          "def load_schools(get):",
          "    rows, url = [], URL",
          "    while url:",
          "        resp = get(url)",
          "        if resp.status_code != 200:",
          "            raise RuntimeError(f\"registry answered {resp.status_code} for {url}\")",
          "        payload = resp.json()",
          "        rows.extend(payload[\"results\"])",
          "        url = payload[\"next\"]",
          "    return rows"
        ),
        options: [
          {
            en: "A is better: it finishes without an error on the busy day, while B stops with an exception halfway through, so A is the safer script to leave running.",
            ar: "أ أفضل: ينتهي بلا خطأ في اليوم المشغول بينما يتوقف ب باستثناء في منتصف الطريق، فأ هو السكربت الأسلم لتتركه يعمل."
          },
          {
            en: "B is better: it asks for all three pages and names page 2 in its error. It still lacks a wait and a retry, so the 5 schools already fetched are thrown away.",
            ar: "ب أفضل: يطلب الصفحات الثلاث كلها ويسمّي الصفحة 2 في خطئه. وما زال ينقصه انتظار وإعادة محاولة، فتضيع المدارس الخمس التي جُلبت."
          },
          {
            en: "B is better: when it meets the 429 it waits and asks again, so it still returns all 13 schools on the busy day, which is the point of following <code>next</code>.",
            ar: "ب أفضل: حين يلقى الرمز 429 ينتظر ويعيد الطلب، فيعيد المدارس الثلاث عشرة كلها في اليوم المشغول أيضًا، وهذا هو المقصود من اتباع <code>next</code>."
          },
          {
            en: "They are equally good: both check <code>status_code</code> before they read the body, and that is all a fetch function needs to do to be trusted.",
            ar: "هما متساويان: كلاهما يفحص <code>status_code</code> قبل أن يقرأ الجسم، وهذا كل ما تحتاجه دالة الجلب لتكون موثوقة."
          }
        ],
        answer: 1,
        hint: {
          en: "Count which pages each function actually asks for. Then ask what a short table looks like to the person who receives it.",
          ar: "عُدّ الصفحات التي تطلبها كل دالة فعلًا. ثم اسأل: كيف يبدو الجدول الناقص لمن يتسلّمه؟"
        },
        explain: {
          en: "On the busy day A returns 5 rows and nothing says that a second page exists: it asks once, the 429 sits on page 2, so the shortage hides and the table is short without any error. B follows <code>next</code>, meets the 429 on page 2 and stops with <code>RuntimeError: registry answered 429 for ...?page=2</code>, which names the real cause. That fixes Version 2's defect (it ignores <code>total</code> and <code>next</code>), but B has no wait or retry, so one 429 discards the 5 schools it already had; Concept 6 adds that. 'It finishes without an error' is a poor test of a fetch function: one that quietly returns less than the whole truth is worse than one that stops.",
          ar: "في اليوم المشغول تعيد أ خمسة صفوف ولا شيء يقول إن هناك صفحة ثانية: تطلب مرة واحدة، والرمز 429 في الصفحة 2، فيختبئ النقص ويبقى الجدول قصيرًا بلا أي خطأ. أما ب فيتبع <code>next</code> ويلقى الرمز 429 في الصفحة 2 ويتوقف بالخطأ <code>RuntimeError: registry answered 429 for ...?page=2</code> الذي يسمّي السبب الحقيقي. وهذا يصلح عيب النسخة 2 (تتجاهل <code>total</code> و<code>next</code>)، لكن ب بلا انتظار ولا إعادة محاولة، فيُهدر رمز 429 واحد المدارس الخمس التي جُلبت؛ ويضيف المفهوم 6 ذلك. و«ينتهي بلا خطأ» مقياس رديء لدالة جلب: فالدالة التي تعيد بصمت أقل من الحقيقة كلها أسوأ من التي تتوقف."
        }
      },

      /* ---------------------------------------------------------- 08 */
      {
        id: "t1l5q08",
        type: "trace",
        level: "hard",
        topics: [
          "t1-flatten-recursion"
        ],
        q: {
          en: "The recursive <code>flatten</code> of the lesson runs on one record. After the last line has run, what are the three values? (Write the list as Python prints it.)",
          ar: "تعمل دالة <code>flatten</code> ذات الاستدعاء الذاتي من الدرس على سجلّ واحد. بعد تنفيذ السطر الأخير، ما القيم الثلاث؟ (اكتب القائمة كما تطبعها بايثون.)"
        },
        code: code(
          "calls = 0",
          "",
          "def flatten(d, prefix=\"\"):",
          "    global calls",
          "    calls += 1",
          "    flat = {}",
          "    for key, value in d.items():",
          "        name = prefix + key",
          "        if isinstance(value, dict):",
          "            flat.update(flatten(value, name + \".\"))",
          "        else:",
          "            flat[name] = value",
          "    return flat",
          "",
          "record = {\"id\": 203,",
          "          \"name\": {\"en\": \"School 3\", \"ar\": \"مدرسة 3\"},",
          "          \"contacts\": {\"phone\": \"08-2487610\", \"email\": None},",
          "          \"facilities\": [\"lab\", \"library\"]}",
          "result = flatten(record)"
        ),
        blanks: [
          {
            accept: [
              "3"
            ],
            label: {
              en: "calls",
              ar: "calls"
            }
          },
          {
            accept: [
              "6"
            ],
            label: {
              en: "len(result)",
              ar: "len(result)"
            }
          },
          {
            accept: [
              "['lab', 'library']",
              "[\"lab\", \"library\"]",
              "['lab','library']",
              "[\"lab\",\"library\"]"
            ],
            label: {
              en: "result[\"facilities\"]",
              ar: "result[\"facilities\"]"
            },
            wide: true
          }
        ],
        hint: {
          en: "Count a call every time the function starts, not once per record. Then ask what the function does with a value that is a list rather than a dictionary.",
          ar: "احسب استدعاءً في كل مرة تبدأ فيها الدالة، لا مرة لكل سجلّ. ثم اسأل: ماذا تفعل الدالة بقيمة هي قائمة لا قاموس؟"
        },
        explain: {
          en: "<code>flatten</code> runs once for the record itself and once more for each value that is a dictionary, <code>name</code> and <code>contacts</code>, so <code>calls</code> is 3. The leaves are copied under dotted names: <code>id</code>, <code>name.en</code>, <code>name.ar</code>, <code>contacts.phone</code>, <code>contacts.email</code> (its value is <code>None</code>, which is not a dictionary, so it is a leaf) and <code>facilities</code>: 6 keys. A list is not a dictionary, so <code>facilities</code> stays whole in a single entry, exactly as it does in a <code>json_normalize</code> cell, which is why a list field needs its own decision. The slips: 4 calls (one per top-level key), 7 keys (spreading the list into <code>facilities.0</code> and <code>facilities.1</code>), or 5 keys (dropping the empty-valued <code>contacts.email</code>).",
          ar: "تعمل <code>flatten</code> مرة للسجلّ نفسه ومرة إضافية لكل قيمة هي قاموس، أي <code>name</code> و<code>contacts</code>، فتكون <code>calls</code> مساوية 3. وتُنسخ الأوراق تحت أسماء منقّطة: <code>id</code> و<code>name.en</code> و<code>name.ar</code> و<code>contacts.phone</code> و<code>contacts.email</code> (قيمتها <code>None</code> وهي ليست قاموسًا فهي ورقة) و<code>facilities</code>: ستة مفاتيح. والقائمة ليست قاموسًا، فتبقى <code>facilities</code> كاملة في مدخل واحد، كما تبقى في خلية <code>json_normalize</code>، ولهذا يحتاج حقل القائمة إلى قرار مستقل. والزلّات: 4 استدعاءات (واحد لكل مفتاح في المستوى الأعلى)، أو 7 مفاتيح (نشر القائمة إلى <code>facilities.0</code> و<code>facilities.1</code>)، أو 5 مفاتيح (إسقاط <code>contacts.email</code> لأن قيمتها فارغة)."
        }
      },

      /* ---------------------------------------------------------- 09 */
      {
        id: "t1l5q09",
        type: "mcq",
        level: "medium",
        topics: [
          "t1-nan-after-flatten",
          "t1-key-census"
        ],
        q: {
          en: "After <code>df = pd.json_normalize(schools, sep=\"_\")</code>, the line <code>df[\"contacts_email\"].isna().sum()</code> prints <code>10</code>. A colleague writes in the report: 'ten schools have an unknown email, so the outreach team must look them up'. What is wrong with that sentence?",
          ar: "بعد <code>df = pd.json_normalize(schools, sep=\"_\")</code> تطبع <code>df[\"contacts_email\"].isna().sum()</code> العدد <code>10</code>. يكتب زميل في التقرير: «عشر مدارس بريدها مجهول، فعلى فريق التواصل البحث عنه». ما الخطأ في هذه الجملة؟"
        },
        options: [
          {
            en: "Nothing: after flattening, NaN always means that the value exists but is not yet known, so ten unknown emails is exactly what the table says.",
            ar: "لا شيء: بعد التسطيح تعني NaN دائمًا أن القيمة موجودة لكنها غير معروفة بعد، فعشرة بريدات مجهولة هي بالضبط ما يقوله الجدول."
          },
          {
            en: "<code>json_normalize</code> turned some real emails into NaN while flattening the nested <code>contacts</code> objects, so more than 3 schools actually have an email.",
            ar: "حوّلت <code>json_normalize</code> بعض رسائل البريد الحقيقية إلى NaN عند تسطيح كائنات <code>contacts</code> المتشعّبة، فلأكثر من 3 مدارس بريد فعلًا."
          },
          {
            en: "<code>isna()</code> also counts the empty strings in the column as missing, so the real number of schools without an email is smaller than 10 and the report overstates it.",
            ar: "تعدّ <code>isna()</code> النصوص الفارغة في العمود مفقودة أيضًا، فعدد المدارس بلا بريد الحقيقي أقل من 10 ويبالغ التقرير فيه."
          },
          {
            en: "The 10 NaN mix 3 schools with no <code>contacts</code> at all and 7 with <code>contacts</code> but no email; the table cannot tell them apart, so 'unknown' was never checked.",
            ar: "قيم NaN العشر تخلط 3 مدارس بلا <code>contacts</code> أصلًا و7 لديها <code>contacts</code> بلا بريد؛ ولا يستطيع الجدول التمييز بينها، فلم يُتحقَّق من «المجهول» قط."
          }
        ],
        answer: 3,
        hint: {
          en: "Ask where each of the ten NaN came from in the original tree: which of them had a <code>contacts</code> object at all?",
          ar: "اسأل من أين جاءت كل واحدة من NaN العشر في الشجرة الأصلية: أيّ المدارس كان لها كائن <code>contacts</code> أصلًا؟"
        },
        explain: {
          en: "Flattening keeps one fact about the source: 'this record has no such key'. The 10 NaN include 3 schools whose <code>contacts</code> object is absent (they have no phone either) and 7 whose <code>contacts</code> holds a phone but no email: different situations, one NaN. 'Unknown', meaning somebody should find it out, is an interpretation the table cannot support; an absent key may simply mean that the school has no email. If the difference matters, record it before flattening, for example <code>df[\"has_contacts\"] = [\"contacts\" in s for s in schools]</code>. The other options describe things that never happen: <code>json_normalize</code> does not turn a present value into NaN (the 3 emails stay), and this file holds no empty strings. Two related traps of the same lesson: an absent key and a null both become NaN, and an integer column that receives a NaN turns into floats.",
          ar: "التسطيح يحفظ حقيقة واحدة عن المصدر: «هذا السجلّ لا يحوي هذا المفتاح». وقيم NaN العشر تشمل 3 مدارس كائن <code>contacts</code> غائب فيها (ولا هاتف لها أيضًا) و7 مدارس تحمل <code>contacts</code> فيها هاتفًا بلا بريد: حالتان مختلفتان وNaN واحدة. أما «المجهول» بمعنى أن على أحد معرفته فتفسير لا يستطيع الجدول دعمه؛ فقد يعني المفتاح الغائب ببساطة أن المدرسة بلا بريد. وإن كان الفرق مهمًّا فسجّله قبل التسطيح، مثلًا <code>df[\"has_contacts\"] = [\"contacts\" in s for s in schools]</code>. والخيارات الأخرى تصف ما لا يحدث: فلا تحوّل <code>json_normalize</code> قيمة موجودة إلى NaN (تبقى رسائل البريد الثلاث)، ولا نصوص فارغة في هذا الملف. وفخّان آخران من الدرس نفسه: المفتاح الغائب وقيمة null كلاهما يصير NaN، والعمود الصحيح الذي تدخله NaN يتحول إلى أعداد عشرية."
        }
      },

      /* ---------------------------------------------------------- 10 */
      {
        id: "t1l5q10",
        type: "compare",
        level: "medium",
        topics: [
          "t1-json-normalize",
          "t1-nan-after-flatten"
        ],
        q: {
          en: "Next month the registry owner adds a new top-level field, <code>accreditation</code>, to every school. Both programs below run on <code>schools</code>, the list of 13 records. Which statement is correct?",
          ar: "الشهر القادم يضيف مالك السجلّ حقلًا جديدًا في المستوى الأعلى هو <code>accreditation</code> إلى كل مدرسة. يعمل البرنامجان أدناه على <code>schools</code>، قائمة السجلات الثلاثة عشر. أيّ العبارات صحيحة؟"
        },
        codeA: code(
          "rows = []",
          "for s in schools:",
          "    rows.append({\"id\": s[\"id\"],",
          "                 \"boys\": s[\"enrolment\"][\"boys\"],",
          "                 \"girls\": s[\"enrolment\"][\"girls\"],",
          "                 \"email\": s.get(\"contacts\", {}).get(\"email\")})",
          "df = pd.DataFrame(rows)",
          "print(df.shape)"
        ),
        codeB: code(
          "df = pd.json_normalize(schools, sep=\"_\")",
          "print(df.shape)"
        ),
        options: [
          {
            en: "B is better: it prints (13, 12), while A prints (13, 4) and drops eight columns without a word, the new field included. B still leaves absent keys as a silent NaN.",
            ar: "ب أفضل: يطبع (13, 12) بينما يطبع أ (13, 4) ويُسقط ثمانية أعمدة دون كلمة، ومنها الحقل الجديد. وما زال ب يترك المفاتيح الغائبة NaN صامتة."
          },
          {
            en: "A is better: because it names every column, the table can never contain a field nobody chose, and only a hand-written loop can read optional keys without crashing.",
            ar: "أ أفضل: لأنه يسمّي كل عمود لا يحوي الجدول أبدًا حقلًا لم يختره أحد، وحلقة مكتوبة بيدك وحدها تقرأ المفاتيح الاختيارية دون انهيار."
          },
          {
            en: "They return the same table: B is simply the shorter way to write A, and a loop and a library call give the same columns when they run on the same records.",
            ar: "يعيدان الجدول نفسه: ب مجرد طريقة أقصر لكتابة أ، والحلقة واستدعاء المكتبة يعطيان الأعمدة نفسها حين يعملان على السجلات نفسها."
          },
          {
            en: "B is better: if a key such as <code>contacts</code> is missing from some record it raises a <code>KeyError</code> at once, so nothing can slip through unnoticed, not even the new field.",
            ar: "ب أفضل: إن غاب مفتاح مثل <code>contacts</code> عن بعض السجلات رفع <code>KeyError</code> فورًا، فلا يمرّ شيء دون أن يُلاحَظ، ولا حتى الحقل الجديد."
          }
        ],
        answer: 0,
        hint: {
          en: "Compare the two shapes printed, then ask which columns of the original records A never mentions.",
          ar: "قارن الشكلين المطبوعين، ثم اسأل: أيّ أعمدة السجلات الأصلية لا يذكرها أ أبدًا؟"
        },
        explain: {
          en: "A prints (13, 4): it was written for four facts and silently drops the other eight (the level, both names, the location, the facilities, the phone and so on), and a field the server adds next month goes the same way. B prints (13, 12) and would carry <code>accreditation</code> as a thirteenth column with no change to the code. B is not perfect: it flattens whatever it is handed (give it a whole API reply and you get one row), and a key that is absent in some records is filled with NaN without a warning, never with a <code>KeyError</code>. The first option contains a truth and a falsehood: for a handful of known fields a hand-written loop is acceptable if you also compare its column count with the data's (12 here), but <code>json_normalize</code> reads optional keys perfectly well without crashing. The defect of Version 1 is its silence, not the fact that it is written by hand.",
          ar: "يطبع أ (13, 4): كُتب لأربع معلومات ويُسقط الثمانية الأخرى بصمت (المرحلة والاسمين والموقع والمرافق والهاتف وغيرها)، والحقل الذي يضيفه الخادم الشهر القادم يلقى المصير نفسه. أما ب فيطبع (13, 12) وسيحمل <code>accreditation</code> عمودًا ثالثًا عشر دون تغيير في الكود. وليس ب كاملًا: فهو يسطّح أي شيء تعطيه إياه (أعطه ردّ الواجهة كله فتحصل على صف واحد)، والمفتاح الغائب في بعض السجلات يُملأ بـNaN دون تحذير، ولا يُرفع معه <code>KeyError</code> أبدًا. والخيار الأول فيه حقيقة وباطل: فلبضعة حقول معروفة تصلح الحلقة اليدوية إذا قارنتَ عدد أعمدتها بعدد أعمدة البيانات (12 هنا)، لكنّ <code>json_normalize</code> تقرأ المفاتيح الاختيارية جيدًا دون انهيار. وعيب النسخة 1 هو صمتها لا أنها مكتوبة بيدك."
        }
      },

      /* ---------------------------------------------------------- 11 */
      {
        id: "t1l5q11",
        type: "write",
        level: "medium",
        lang: "python",
        topics: [
          "t1-json-normalize"
        ],
        q: {
          en: "<code>page</code> is the reply of the third API page: a dictionary with the keys <code>page</code>, <code>per_page</code>, <code>total</code>, <code>pages</code>, <code>next</code> and <code>results</code> (a list of 3 schools). Write code that builds a DataFrame <code>df</code> with one row per school, with column names such as <code>enrolment_boys</code> (underscore, not dot) and with the reply's <code>page</code> and <code>total</code> copied onto every row. Then print its shape.",
          ar: "<code>page</code> هو ردّ الصفحة الثالثة من الواجهة: قاموس مفاتيحه <code>page</code> و<code>per_page</code> و<code>total</code> و<code>pages</code> و<code>next</code> و<code>results</code> (قائمة 3 مدارس). اكتب كودًا يبني DataFrame اسمه <code>df</code> بصفّ لكل مدرسة، وبأسماء أعمدة مثل <code>enrolment_boys</code> (شرطة سفلية لا نقطة)، وبنسخ <code>page</code> و<code>total</code> من الردّ على كل صف. ثم اطبع شكله."
        },
        starter: code(
          "import json",
          "import pandas as pd",
          "",
          "with open(\"downloads/t1/schools_api_page3.json\", encoding=\"utf-8\") as f:",
          "    page = json.load(f)",
          "",
          "# your code here"
        ),
        lines: 8,
        checks: [
          {
            re: "json_normalize\\s*\\(",
            label: {
              en: "Flatten with <code>pd.json_normalize(...)</code>",
              ar: "سطّح بـ<code>pd.json_normalize(...)</code>"
            }
          },
          {
            re: "(record_path\\s*=\\s*|json_normalize\\s*\\(\\s*\\w+\\s*,\\s*)\\[?\\s*[\"']results[\"']",
            label: {
              en: "Name the list that holds the records: <code>record_path=\"results\"</code>",
              ar: "سمِّ القائمة التي تحمل السجلات: <code>record_path=\"results\"</code>"
            }
          },
          {
            re: "\\[(?=[^\\]]*[\"']page[\"'])(?=[^\\]]*[\"']total[\"'])",
            label: {
              en: "Copy the two top-level fields onto each row: <code>meta=[\"page\", \"total\"]</code>",
              ar: "انسخ الحقلين العلويين على كل صف: <code>meta=[\"page\", \"total\"]</code>"
            }
          },
          {
            re: "sep\\s*=\\s*[\"']_[\"']",
            label: {
              en: "Spell nested names with an underscore: <code>sep=\"_\"</code>",
              ar: "اكتب الأسماء المتشعّبة بشرطة سفلية: <code>sep=\"_\"</code>"
            }
          },
          {
            re: "print\\s*\\(.*\\.shape",
            label: {
              en: "Print the shape of the table",
              ar: "اطبع شكل الجدول"
            }
          }
        ],
        forbid: [
          {
            re: "DataFrame\\s*\\(",
            label: {
              en: "<code>pd.DataFrame(...)</code> on the records (it leaves dictionaries in the cells)",
              ar: "<code>pd.DataFrame(...)</code> على السجلات (تترك قواميس في الخلايا)"
            }
          }
        ],
        solution: {
          code: code(
            "df = pd.json_normalize(page, record_path=\"results\", meta=[\"page\", \"total\"], sep=\"_\")",
            "print(df.shape)"
          ),
          out: "(3, 13)",
          en: "<code>record_path=\"results\"</code> names the list that holds the records, <code>meta=[\"page\", \"total\"]</code> copies those two top-level fields onto each row and <code>sep=\"_\"</code> spells the nested names <code>enrolment_boys</code>. The shape is (3, 13): thirteen columns, not fourteen, because none of the three schools on this page has an email, so no <code>contacts_email</code> column exists at all.",
          ar: "يسمّي <code>record_path=\"results\"</code> القائمة التي تحمل السجلات، وينسخ <code>meta=[\"page\", \"total\"]</code> هذين الحقلين العلويين على كل صف، ويكتب <code>sep=\"_\"</code> الأسماء المتشعّبة هكذا <code>enrolment_boys</code>. والشكل (3, 13): ثلاثة عشر عمودًا لا أربعة عشر، لأن أيًّا من المدارس الثلاث في هذه الصفحة لا بريد لها، فلا يوجد عمود <code>contacts_email</code> أصلًا."
        },
        hint: {
          en: "The reply is a dictionary that <em>contains</em> the records. Which argument says where the records are, and which one carries the other fields along?",
          ar: "الردّ قاموس <em>يحتوي</em> السجلات. أيّ وسيط يقول أين السجلات، وأيّ وسيط يحمل الحقول الأخرى معها؟"
        },
        explain: {
          en: "Handed the whole reply, <code>pd.json_normalize(page)</code> would give one row with the list of schools sitting in a single cell. <code>record_path</code> tells pandas which list holds the records, <code>meta</code> copies top-level fields onto each of those rows, and <code>sep=\"_\"</code> avoids dotted names such as <code>name.en</code> that cannot be used as attributes. Passing <code>page[\"results\"]</code> instead gives the right rows but loses <code>page</code> and <code>total</code>; <code>pd.DataFrame(page[\"results\"])</code> leaves dictionaries in the cells. Note the shape (3, 13): a key that is absent from every record produces no column at all, and nothing warns you.",
          ar: "إذا أُعطيت <code>pd.json_normalize(page)</code> الردّ كله أعطت صفًّا واحدًا وقائمة المدارس كاملة في خلية واحدة. يخبر <code>record_path</code> مكتبة pandas أي قائمة تحمل السجلات، وينسخ <code>meta</code> الحقول العلوية على كل صف منها، ويتجنب <code>sep=\"_\"</code> الأسماء المنقّطة مثل <code>name.en</code> التي لا تصلح خاصيةً. أما تمرير <code>page[\"results\"]</code> فيعطي الصفوف الصحيحة لكنه يفقد <code>page</code> و<code>total</code>؛ وتترك <code>pd.DataFrame(page[\"results\"])</code> قواميس في الخلايا. ولاحظ الشكل (3, 13): المفتاح الغائب عن كل السجلات لا ينتج عمودًا أصلًا، ولا شيء يحذّرك."
        }
      },

      /* ---------------------------------------------------------- 12 */
      {
        id: "t1l5q12",
        type: "mcq",
        level: "hard",
        topics: [
          "t1-list-fields"
        ],
        q: {
          en: "<code>df</code> has one row per school and a numeric column <code>students</code> (boys plus girls); <code>df[\"students\"].mean()</code> is <code>403.2</code>. After <code>exploded = df.explode(\"facilities\")</code> (22 rows) a colleague wants the same mean per school from <code>exploded</code>. Which expression gives <code>403.2</code>?",
          ar: "في <code>df</code> صفّ لكل مدرسة وعمود رقمي <code>students</code> (البنون مع البنات)، وقيمة <code>df[\"students\"].mean()</code> هي <code>403.2</code>. بعد <code>exploded = df.explode(\"facilities\")</code> (22 صفًّا) يريد زميل المتوسط نفسه لكل مدرسة من <code>exploded</code>. أيّ تعبير يعطي <code>403.2</code>؟"
        },
        options: [
          {
            code: "exploded[\"students\"].mean()"
          },
          {
            code: "exploded.drop_duplicates(\"id\")[\"students\"].mean()"
          },
          {
            code: "exploded[\"students\"].sum() / len(df)"
          },
          {
            code: "exploded.dropna(subset=[\"facilities\"])[\"students\"].mean()"
          }
        ],
        answer: 1,
        hint: {
          en: "After an explode, ask what one row stands for and how many rows each school now has. Then check which expression counts each school once.",
          ar: "بعد التفكيك اسأل: ماذا يمثّل الصف الواحد، وكم صفًّا لكل مدرسة الآن؟ ثم انظر أيّ تعبير يعدّ كل مدرسة مرة واحدة."
        },
        explain: {
          en: "After <code>explode</code> a row is a school-facility pair: a school with three facilities appears three times and a school with an empty list once, with NaN. Plain <code>.mean()</code> therefore weights every school by its number of rows and gives 383.4, wrong in the quiet way, with no error and a plausible number. Dividing the inflated sum (8,435 instead of 5,242) by the 13 schools gives 648.8, and dropping the NaN rows only removes the three schools without facilities while the weights stay uneven (379.9). Keeping one row per school with <code>drop_duplicates(\"id\")</code> restores the unit of analysis and the true 403.2. The simplest answer is not to explode at all: compute the statistic on <code>df</code> and give the list a count or multi-hot columns. For a model the same warning applies, and the split into training and test sets must be by <code>id</code>, not by row.",
          ar: "بعد <code>explode</code> يصير الصف زوج مدرسة–مرفق: فالمدرسة ذات ثلاثة مرافق تظهر ثلاث مرات والمدرسة ذات القائمة الفارغة مرة واحدة بقيمة NaN. فتزن <code>.mean()</code> العادية كل مدرسة بعدد صفوفها وتعطي 383.4، خطأ هادئًا بلا خطأ برمجي وبرقم معقول. وقسمة المجموع المتضخم (8,435 بدل 5,242) على المدارس الثلاث عشرة تعطي 648.8، وإسقاط صفوف NaN لا يزيل إلا المدارس الثلاث بلا مرافق مع بقاء الأوزان غير متساوية (379.9). أما إبقاء صف واحد لكل مدرسة بـ<code>drop_duplicates(\"id\")</code> فيعيد وحدة التحليل ويعطي 403.2 الصحيحة. وأبسط جواب ألا تفكّك أصلًا: احسب الإحصاءة على <code>df</code> وأعطِ القائمة عدّادًا أو أعمدة multi-hot. وينطبق التحذير نفسه على النموذج، ويجب أن يكون تقسيم التدريب والاختبار بحسب <code>id</code> لا بحسب الصف."
        }
      },

      /* ---------------------------------------------------------- 13 */
      {
        id: "t1l5q13",
        type: "order",
        level: "easy",
        topics: [
          "t1-api-request-response",
          "t1-rate-limit-backoff"
        ],
        q: {
          en: "Put the steps of one conversation with the school API in order, on a day when the server answers <code>429</code> to the first request for page 2.",
          ar: "رتّب خطوات حوار واحد مع واجهة المدارس، في يوم يردّ فيه الخادم بالرمز <code>429</code> على أول طلب للصفحة 2."
        },
        items: [
          {
            en: "Build the request: the method GET, the URL with <code>?page=2</code>, an <code>Accept</code> header and a timeout.",
            ar: "ابنِ الطلب: الطريقة GET، والعنوان مع <code>?page=2</code>، وترويسة <code>Accept</code>، ومهلة زمنية."
          },
          {
            en: "Send it: the response comes back with status <code>429</code> and a <code>Retry-After: 2</code> header.",
            ar: "أرسله: يعود الردّ برمز الحالة <code>429</code> وترويسة <code>Retry-After: 2</code>."
          },
          {
            en: "Read the status code first: 429 means 'wait, then retry', so the body is not parsed.",
            ar: "اقرأ رمز الحالة أولًا: الرمز 429 يعني «انتظر ثم أعد المحاولة»، فلا يُحلَّل الجسم."
          },
          {
            en: "Wait (sleep) for the 2 seconds that the server asked for.",
            ar: "انتظر الثانيتين اللتين طلبهما الخادم (sleep)."
          },
          {
            en: "Send the same request again; this time the status is <code>200</code>.",
            ar: "أعد إرسال الطلب نفسه؛ وهذه المرة تكون الحالة <code>200</code>."
          },
          {
            en: "Only now turn the JSON body into Python dictionaries and lists and read <code>results</code> and <code>next</code>.",
            ar: "الآن فقط حوّل جسم JSON إلى قواميس وقوائم بايثون واقرأ <code>results</code> و<code>next</code>."
          }
        ],
        answer: [0, 1, 2, 3, 4, 5],
        hint: {
          en: "Which steps produce something that a later step needs? A reply must exist before it is read, and a status must be read before the body is trusted.",
          ar: "أيّ الخطوات تنتج ما تحتاجه خطوة لاحقة؟ يجب أن يوجد الردّ قبل قراءته، وأن يُقرأ الرمز قبل الوثوق بالجسم."
        },
        explain: {
          en: "A request is built before it can be sent, and the response exists only after the send. The status code is read before the body is touched: a 429 body is an error document with no <code>results</code>, and parsing it as data is the mistake of Version 1. The server's <code>Retry-After</code> is then obeyed (sleep first, retry second); retrying at once, which is the Version 1 of the retry example, only earns another refusal. The same request is repeated, and only a 200 reply is parsed into dictionaries and lists. Every API use, including a call to a hosted model, is this same pair of messages with a check in the middle.",
          ar: "يُبنى الطلب قبل أن يُرسل، ولا يوجد الردّ إلا بعد الإرسال. ويُقرأ رمز الحالة قبل لمس الجسم: فجسم الرمز 429 وثيقة خطأ لا تحوي <code>results</code>، وتحليله على أنه بيانات هو خطأ النسخة 1. ثم يُطاع <code>Retry-After</code> من الخادم (النوم أولًا ثم إعادة المحاولة)؛ أما إعادة المحاولة فورًا، وهي النسخة 1 من مثال إعادة المحاولة، فلا تجلب إلا رفضًا آخر. ويُكرَّر الطلب نفسه، ولا يُحلَّل إلى قواميس وقوائم إلا ردّ 200. وكل استعمال للواجهة، ومنه استدعاء نموذج مستضاف، هو الرسالتان نفسهما مع فحص في الوسط."
        }
      },

      /* ---------------------------------------------------------- 14 */
      {
        id: "t1l5q14",
        type: "match",
        level: "easy",
        topics: [
          "t1-status-codes"
        ],
        q: {
          en: "Match each status code to the right reaction of a script that fetches the school registry.",
          ar: "وصّل كل رمز حالة بردّ الفعل الصحيح لسكربت يجلب سجلّ المدارس."
        },
        pairs: [
          {
            l: {
              code: "301"
            },
            r: {
              en: "Nothing to do: the library follows the new address in the <code>Location</code> header",
              ar: "لا شيء: تتبع المكتبة العنوان الجديد في الترويسة <code>Location</code>"
            }
          },
          {
            l: {
              code: "401"
            },
            r: {
              en: "Fix the key and the way it is sent; repeating the request cannot help",
              ar: "أصلح المفتاح وطريقة إرساله؛ إعادة الطلب لن تفيد"
            }
          },
          {
            l: {
              code: "403"
            },
            r: {
              en: "The server knows who you are but you lack permission: ask for access",
              ar: "الخادم يعرفك لكن لا صلاحية لك: اطلب الصلاحية"
            }
          },
          {
            l: {
              code: "404"
            },
            r: {
              en: "Check the spelling of the endpoint address; do not retry",
              ar: "راجع كتابة عنوان نقطة النهاية؛ ولا تعد المحاولة"
            }
          },
          {
            l: {
              code: "429"
            },
            r: {
              en: "Wait as long as <code>Retry-After</code> says, then retry a limited number of times",
              ar: "انتظر المدة التي تقولها <code>Retry-After</code> ثم أعد المحاولة عددًا محدودًا من المرات"
            }
          },
          {
            l: {
              code: "503"
            },
            r: {
              en: "Back off (2, 4, 8 seconds), retry a few times, then give up and raise",
              ar: "تباطأ (2 ثم 4 ثم 8 ثوانٍ) وأعد المحاولة بضع مرات ثم استسلم وارفع خطأً"
            }
          }
        ],
        leftHead: {
          en: "Status code",
          ar: "رمز الحالة"
        },
        rightHead: {
          en: "Right reaction",
          ar: "ردّ الفعل الصحيح"
        },
        hint: {
          en: "Use the first digit: whose problem is it, yours or the server's? Then split the 4xx codes by what is wrong: who you are, what you may do, where you asked, or how often.",
          ar: "استعن بالرقم الأول: مشكلة من هي، مشكلتك أم مشكلة الخادم؟ ثم قسّم رموز 4xx بحسب الخطأ: من أنت، أم ما يحق لك، أم أين سألت، أم كم مرة."
        },
        explain: {
          en: "The first digit gives the family: 3xx is a redirect that the library follows, 4xx says the request is the problem, 5xx says the server is. Inside 4xx each code names a different cure, and none of them is cured by waiting: 401 'who are you?' (fix the key), 403 'I know you, but you may not' (ask for access), 404 'no such address' (fix the endpoint). The exception is 429 'too many requests': it is about timing, so you wait for <code>Retry-After</code> and retry. The 5xx codes mean that the server failed or is overloaded and may answer a moment later, so you back off and retry a bounded number of times. Mixing up 401 and 403 is the usual slip: one is about identity, the other about permission.",
          ar: "الرقم الأول يعطي العائلة: 3xx إعادة توجيه تتبعها المكتبة، و4xx يقول إن الطلب هو المشكلة، و5xx يقول إن الخادم هو المشكلة. وداخل 4xx يسمّي كل رمز علاجًا مختلفًا ولا يعالج الانتظارُ أيًّا منها: 401 «من أنت؟» (أصلح المفتاح)، و403 «أعرفك لكن لا يحق لك» (اطلب الصلاحية)، و404 «لا يوجد هذا العنوان» (أصلح نقطة النهاية). والاستثناء هو 429 «طلبات كثيرة»: فهو عن التوقيت، فتنتظر <code>Retry-After</code> وتعيد المحاولة. أما رموز 5xx فتعني أن الخادم فشل أو ازدحم وقد يجيب بعد لحظة، فتتباطأ وتعيد المحاولة عددًا محدودًا من المرات. والزلّة المعتادة خلط 401 بـ403: أحدهما عن الهوية والآخر عن الصلاحية."
        }
      },

      /* ---------------------------------------------------------- 15 */
      {
        id: "t1l5q15",
        type: "error",
        level: "medium",
        topics: [
          "t1-pagination",
          "t1-fetch-versions"
        ],
        q: {
          en: "The loop should collect all 13 schools by following <code>next</code>. It stops without an error and prints <code>30 rows, 5 distinct ids; total = 13</code>. Click the line responsible.",
          ar: "يفترض أن تجمع الحلقة المدارس الثلاث عشرة كلها باتباع <code>next</code>. لكنها تتوقف بلا خطأ وتطبع <code>30 rows, 5 distinct ids; total = 13</code>. انقر السطر المسؤول."
        },
        code: code(
          "from fake_api import make_fake_get",
          "",
          "URL = \"https://api.example.org/schools\"",
          "get = make_fake_get()",
          "",
          "rows, url = [], URL",
          "for _ in range(6):                                       # a guard against endless loops",
          "    payload = get(url, params={\"page\": 1, \"per_page\": 5}).json()",
          "    rows.extend(payload[\"results\"])",
          "    url = payload[\"next\"]",
          "print(len(rows), \"rows,\", len({r[\"id\"] for r in rows}), \"distinct ids; total =\", payload[\"total\"])"
        ),
        answer: 8,
        solution: {
          code: "    payload = get(url).json()",
          en: "The address in <code>next</code> is already complete. Adding <code>params</code> on top overrides its page number, so the server keeps returning page 1.",
          ar: "العنوان في <code>next</code> كامل أصلًا. وإضافة <code>params</code> فوقه تتغلّب على رقم الصفحة فيه، فيظل الخادم يعيد الصفحة 1."
        },
        hint: {
          en: "Look at what the request on that line says about which page it wants, and compare it with the address that <code>next</code> carries.",
          ar: "انظر ماذا يقول الطلب في ذلك السطر عن الصفحة التي يريدها، وقارنه بالعنوان الذي تحمله <code>next</code>."
        },
        explain: {
          en: "Line 8. After the first request the address in <code>next</code> is complete (it carries <code>?page=2</code>), but the explicit <code>params={\"page\": 1}</code> overrides the page inside it, so every request asks for page 1 again: six replies of 5 rows make 30 rows, but only 5 distinct ids, while <code>total</code> says 13. Nothing fails; only the numbers disagree, and without the <code>range(6)</code> guard on line 7 the loop would never end. Lines 7, 9 and 10 are right, and the guard is a good habit. Two cheap defences: a bounded loop, and a check that the ids are unique and that their count equals <code>total</code>. Use <code>next</code> exactly as the server sent it: it works for page numbers, for offsets and for cursors alike.",
          ar: "السطر 8. بعد الطلب الأول يكون العنوان في <code>next</code> كاملًا (يحمل <code>?page=2</code>)، لكنّ <code>params={\"page\": 1}</code> الصريحة تتغلّب على الصفحة الموجودة فيه، فيطلب كل طلب الصفحة 1 من جديد: ست إجابات من 5 صفوف تعطي 30 صفًّا، ولكن 5 معرّفات مختلفة فقط، بينما يقول <code>total</code> إن العدد 13. لا شيء يفشل؛ الأرقام وحدها تتناقض، ولولا الحارس <code>range(6)</code> في السطر 7 لما انتهت الحلقة أبدًا. والأسطر 7 و9 و10 صحيحة، والحارس عادة جيدة. دفاعان رخيصان: حلقة محدودة، وفحص أن المعرّفات فريدة وأن عددها يساوي <code>total</code>. واستعمل <code>next</code> كما أرسله الخادم تمامًا: فيصلح مع أرقام الصفحات والإزاحات والمؤشرات كلها."
        }
      },

      /* ---------------------------------------------------------- 16 */
      {
        id: "t1l5q16",
        type: "ordercode",
        level: "medium",
        topics: [
          "t1-fetch-versions",
          "t1-pagination"
        ],
        q: {
          en: "<code>get</code>, <code>URL</code> and <code>pd</code> are already defined. Put the statements in an order that asks for the pages one after another, checks every reply before reading it, follows <code>next</code> until there is none, builds the table, and refuses to go on if schools are missing.",
          ar: "المتغيرات <code>get</code> و<code>URL</code> و<code>pd</code> معرَّفة سلفًا. رتّب الأسطر ترتيبًا يطلب الصفحات واحدة بعد أخرى، ويفحص كل ردّ قبل قراءته، ويتبع <code>next</code> حتى لا يبقى شيء، ويبني الجدول، ويرفض المتابعة إن نقصت المدارس."
        },
        items: [
          {
            code: "rows, url = [], URL"
          },
          {
            code: "while url:"
          },
          {
            code: "    resp = get(url)"
          },
          {
            code: "    resp.raise_for_status()"
          },
          {
            code: "    payload = resp.json()"
          },
          {
            code: code(
              "    rows.extend(payload[\"results\"])",
              "    url = payload[\"next\"]"
            )
          },
          {
            code: "df = pd.json_normalize(rows, sep=\"_\")"
          },
          {
            code: "assert len(df) == payload[\"total\"], \"pages are missing\""
          }
        ],
        answer: [0, 1, 2, 3, 4, 5, 6, 7],
        hint: {
          en: "Which statements create a name that a later one uses? And which comes first: reading the body of a reply, or making sure that the reply is a good one?",
          ar: "أيّ الأسطر ينشئ اسمًا يستعمله سطر لاحق؟ وأيهما يأتي أولًا: قراءة جسم الردّ أم التأكد من أن الردّ سليم؟"
        },
        explain: {
          en: "The names decide most of the order: <code>rows</code> and <code>url</code> before the loop that uses them; <code>resp</code> before anything that reads it; <code>payload</code> before <code>rows.extend</code> and before <code>payload[\"next\"]</code>; <code>df</code> only after the loop has collected every page; and the <code>assert</code> last, because it compares the finished table with the <code>total</code> that the last reply announced. The one place that is a rule rather than a dependency is <code>raise_for_status()</code> before <code>resp.json()</code>: the status is checked before the body is touched, so that a 404 or a 500 stops the run with its real name instead of failing later at <code>[\"results\"]</code> with a KeyError. The two lines that move the loop on, <code>extend</code> and the update of <code>url</code>, belong together at the end of the loop body: when <code>next</code> is <code>None</code> the loop ends by itself.",
          ar: "الأسماء تحسم معظم الترتيب: <code>rows</code> و<code>url</code> قبل الحلقة التي تستعملهما؛ و<code>resp</code> قبل أي سطر يقرؤه؛ و<code>payload</code> قبل <code>rows.extend</code> وقبل <code>payload[\"next\"]</code>؛ و<code>df</code> بعد أن تجمع الحلقة كل الصفحات؛ و<code>assert</code> أخيرًا لأنه يقارن الجدول المكتمل بـ<code>total</code> الذي أعلنه آخر ردّ. والموضع الوحيد الذي هو قاعدة لا اعتماد هو <code>raise_for_status()</code> قبل <code>resp.json()</code>: يُفحص الرمز قبل لمس الجسم، فيوقف 404 أو 500 التشغيل باسمه الحقيقي بدل أن يفشل لاحقًا عند <code>[\"results\"]</code> بخطأ KeyError. والسطران اللذان يقدّمان الحلقة، <code>extend</code> وتحديث <code>url</code>، مكانهما معًا في آخر جسم الحلقة: فحين تصير <code>next</code> هي <code>None</code> تنتهي الحلقة وحدها."
        }
      },

      /* ---------------------------------------------------------- 17 */
      {
        id: "t1l5q17",
        type: "multi",
        level: "medium",
        topics: [
          "t1-page-size",
          "t1-pagination"
        ],
        q: {
          en: "The first reply of the school API says <code>total: 13</code>, <code>per_page: 5</code>, <code>pages: 3</code> and carries a <code>next</code> address. Which statements are correct? (Choose all that apply.)",
          ar: "يقول أول ردّ من واجهة المدارس <code>total: 13</code> و<code>per_page: 5</code> و<code>pages: 3</code> ويحمل عنوان <code>next</code>. أيّ العبارات صحيحة؟ (اختر كل ما ينطبق.)"
        },
        options: [
          {
            en: "The first reply already tells you that 8 schools are missing from <code>results</code>: <code>total</code> is 13 and <code>next</code> is not empty.",
            ar: "الردّ الأول نفسه يخبرك أن 8 مدارس غير موجودة في <code>results</code>: فـ<code>total</code> يساوي 13 و<code>next</code> ليست فارغة."
          },
          {
            en: "<code>per_page=1</code> is the safest plan: 13 tiny requests, so a failure costs almost nothing and no rate limit can be reached.",
            ar: "<code>per_page=1</code> هي الخطة الأسلم: 13 طلبًا صغيرًا، فلا يكلّف الفشل شيئًا تقريبًا ولا يمكن بلوغ حدّ المعدّل."
          },
          {
            en: "Averaging only page 1 overstates the registry's mean enrolment (475.6 instead of 403.2): replies are sorted somehow, so the first page is not a random sample.",
            ar: "حساب المتوسط من الصفحة 1 وحدها يضخّم متوسط طلبة السجلّ (475.6 بدل 403.2): فالردود مرتّبة بطريقة ما، والصفحة الأولى ليست عيّنة عشوائية."
          },
          {
            en: "Larger pages mean fewer requests, so fewer chances of a 429, but each reply is heavier and a failed page costs more to fetch again.",
            ar: "الصفحات الأكبر تعني طلبات أقل وفرصًا أقل لرمز 429، لكنّ كل ردّ أثقل وإعادة جلب صفحة فاشلة أكلف."
          },
          {
            en: "Once <code>per_page</code> is set to the largest value the server allows, the loop no longer needs to follow <code>next</code>.",
            ar: "ما إن تُضبط <code>per_page</code> على أكبر قيمة يسمح بها الخادم حتى لا تحتاج الحلقة إلى اتباع <code>next</code>."
          }
        ],
        answer: [0, 2, 3],
        hint: {
          en: "Separate what the reply itself tells you from what you assume. For each statement ask what would go wrong, quietly, if it were followed.",
          ar: "افصل بين ما يقوله الردّ نفسه وما تفترضه أنت. ولكل عبارة اسأل: ما الذي سيسوء بصمت لو اتُّبعت؟"
        },
        explain: {
          en: "A reply is a slice with instructions: 13 minus the 5 schools in hand leaves 8 missing, and a non-empty <code>next</code> says where to ask for them. Page 1 is not a sample: servers sort by id, date or popularity, and the five schools on page 1 average 475.6 students against 403.2 for all 13, an overstatement of about 18% that no metric computed on that slice would reveal. Page size is a trade-off with no universal winner: big pages need few requests but are heavy and expensive to repeat, small pages are light but multiply the requests and the chances of meeting a rate limit, so <code>per_page=1</code> is not 'safest' (13 requests instead of 3). And even at the maximum size the server may cap the page or the registry may grow, so you follow <code>next</code> and compare <code>len(rows)</code> with <code>total</code>.",
          ar: "الردّ شريحة معها تعليمات: 13 ناقص المدارس الخمس التي بين يديك يترك 8 مفقودة، وعنوان <code>next</code> غير الفارغ يقول أين تطلبها. والصفحة 1 ليست عيّنة: فالخوادم ترتّب بالمعرّف أو التاريخ أو الشعبية، ومتوسط طلبة المدارس الخمس في الصفحة 1 هو 475.6 مقابل 403.2 للمدارس الثلاث عشرة، أي تضخيم بنحو 18% لا يكشفه أي مقياس محسوب على تلك الشريحة. وحجم الصفحة مفاضلة بلا فائز مطلق: الصفحات الكبيرة قليلة الطلبات لكنها ثقيلة وغالية الإعادة، والصغيرة خفيفة لكنها تضاعف الطلبات وفرص بلوغ حدّ المعدّل، فليست <code>per_page=1</code> «الأسلم» (13 طلبًا بدل 3). وحتى عند الحجم الأقصى قد يقصّ الخادم الصفحة أو يكبر السجلّ، فتتبع <code>next</code> وتقارن <code>len(rows)</code> بـ<code>total</code>."
        }
      },

      /* ---------------------------------------------------------- 18 */
      {
        id: "t1l5q18",
        type: "compare",
        level: "hard",
        topics: [
          "t1-rate-limit-backoff",
          "t1-status-codes",
          "t1-timeouts-politeness"
        ],
        q: {
          en: "Two versions of <code>get_with_retry</code> are called with <code>sleep=waits.append</code> against a server whose page 2 answers 500 once and then times out once (<code>make_fake_get(script={2: [500, \"timeout\"]})</code>). A prints <code>500 []</code>; B prints <code>200 [2.0, 4.0]</code>. Which statement is correct?",
          ar: "تُستدعى نسختان من <code>get_with_retry</code> مع <code>sleep=waits.append</code> أمام خادم تردّ صفحته 2 بالرمز 500 مرة ثم تنتهي مهلتها مرة (<code>make_fake_get(script={2: [500, \"timeout\"]})</code>). يطبع أ <code>500 []</code> ويطبع ب <code>200 [2.0, 4.0]</code>. أيّ العبارات صحيحة؟"
        },
        codeA: code(
          "def get_with_retry(get, url, max_tries=4, sleep=time.sleep):",
          "    for attempt in range(1, max_tries + 1):",
          "        resp = get(url)",
          "        if resp.status_code != 429:",
          "            return resp",
          "        sleep(float(resp.headers.get(\"Retry-After\", 2 ** attempt)))",
          "    raise RuntimeError(f\"still rate-limited after {max_tries} tries\")"
        ),
        codeB: code(
          "RETRYABLE = {429, 500, 502, 503, 504}",
          "def get_with_retry(get, url, max_tries=4, timeout=10, sleep=time.sleep):",
          "    for attempt in range(1, max_tries + 1):",
          "        try:",
          "            resp = get(url, timeout=timeout)",
          "        except TimeoutError:",
          "            resp = None",
          "        if resp is not None and resp.status_code not in RETRYABLE:",
          "            return resp",
          "        wait = float(2 ** attempt)",
          "        if resp is not None and \"Retry-After\" in resp.headers:",
          "            wait = float(resp.headers[\"Retry-After\"])",
          "        if attempt < max_tries:",
          "            sleep(wait)",
          "    raise RuntimeError(f\"gave up on {url} after {max_tries} tries\")"
        ),
        options: [
          {
            en: "A is better: it retries only the 429 that a wait can cure, so it never repeats a request that failed for a reason a retry cannot fix, and a 500 is the caller's business.",
            ar: "أ أفضل: يعيد المحاولة مع 429 وحده الذي يعالجه الانتظار، فلا يكرّر طلبًا فشل لسبب لا تعالجه الإعادة، والرمز 500 شأن من استدعى الدالة."
          },
          {
            en: "They are equally good: both stop after 4 attempts, so both are protected against a server that stays down and neither can loop forever.",
            ar: "هما متساويان: كلاهما يتوقف بعد 4 محاولات، فكلاهما محمي من خادم يبقى معطّلًا ولا يمكن لأي منهما أن يدور إلى الأبد."
          },
          {
            en: "B is better because <code>timeout=10</code> makes the server answer faster, so fewer retries are needed and fewer waits are recorded.",
            ar: "ب أفضل لأن <code>timeout=10</code> تجعل الخادم يجيب أسرع، فتقلّ الحاجة إلى إعادة المحاولة وتقلّ مرات الانتظار."
          },
          {
            en: "B is better: it retries every transient failure (429, 5xx, a timeout) with growing waits. It still hides a flaky server unless retries are counted.",
            ar: "ب أفضل: يعيد المحاولة مع كل فشل عابر (429 وعائلة 5xx والمهلة) بانتظار متزايد. لكنه يخفي خادمًا غير مستقر ما لم تُحصَ إعادات المحاولة."
          }
        ],
        answer: 3,
        hint: {
          en: "Follow A on the first reply: what does it do with a status that is not 429? Then follow B through the second reply, the timeout.",
          ar: "تابع أ على أول ردّ: ماذا يفعل برمز غير 429؟ ثم تابع ب في الردّ الثاني، أي المهلة."
        },
        explain: {
          en: "A is Version 2: it waits only for a 429, so the 500 is returned at once \"as if it were the answer\" (the caller sees status 500 and an empty list of waits), and a timeout would escape as an uncaught exception; it also passes no <code>timeout=</code>, so a server that never replies could freeze it. B is Version 3: a 500 and a timeout are both worth another try, the waits grow (2.0 s after the first failure, 4.0 s after the second), and it returns the 200. The statement that fits A's idea is false because 5xx errors are the server's trouble, which time can cure; \"stops after 4 attempts\" is only true of B (A never retries a 500 at all); and a timeout limits how long you wait, it does not make a server faster. What B still leaves open is the honest box of the lesson: retries hide a flaky server unless you count them, there is no random jitter, and repeating a POST is not automatically safe.",
          ar: "أ هو النسخة 2: ينتظر مع 429 وحده، فيعيد الرمز 500 فورًا «كأنه الجواب» (يرى المستدعي الحالة 500 وقائمة انتظار فارغة)، وتفلت المهلة استثناءً غير ملتقَط؛ كما أنه لا يمرّر <code>timeout=</code>، فقد يجمّده خادم لا يردّ أبدًا. أما ب فهو النسخة 3: الرمز 500 والمهلة كلاهما يستحق محاولة أخرى، وتتزايد الانتظارات (2.0 ثانية بعد الفشل الأول و4.0 بعد الثاني)، ويعيد ردّ 200. والعبارة الأولى خاطئة لأن أخطاء 5xx من متاعب الخادم التي يعالجها الزمن؛ و«يتوقف بعد 4 محاولات» لا يصحّ إلا على ب (فأ لا يعيد المحاولة مع 500 أصلًا)؛ والمهلة تحدّد مدة انتظارك ولا تجعل الخادم أسرع. وما يتركه ب مفتوحًا هو صندوق الحساب الصادق في الدرس: إعادة المحاولة تُخفي خادمًا غير مستقر ما لم تُحصَ، ولا اضطراب عشوائي (jitter)، وتكرار POST ليس آمنًا تلقائيًّا."
        }
      },

      /* ---------------------------------------------------------- 19 */
      {
        id: "t1l5q19",
        type: "error",
        level: "hard",
        topics: [
          "t1-rate-limit-backoff"
        ],
        q: {
          en: "The provider answers 500 four times in a row. The function gives up and raises, as it should, but the recorded waits are <code>[2, 4, 8, 16]</code>, 30 seconds in all, where the lesson's worst case for four tries is 14 seconds. Click the line responsible.",
          ar: "يردّ المزوّد بالرمز 500 أربع مرات متتالية. تستسلم الدالة وترفع خطأً كما يجب، لكنّ الانتظارات المسجّلة هي <code>[2, 4, 8, 16]</code>، أي 30 ثانية، بينما أسوأ حالة في الدرس لأربع محاولات هي 14 ثانية. انقر السطر المسؤول."
        },
        code: code(
          "import time",
          "",
          "RETRYABLE = {429, 500, 502, 503, 504}",
          "",
          "def get_with_retry(get, url, max_tries=4, sleep=time.sleep):",
          "    for attempt in range(1, max_tries + 1):",
          "        resp = get(url, timeout=10)",
          "        if resp.status_code not in RETRYABLE:",
          "            return resp",
          "        sleep(2 ** attempt)",
          "    raise RuntimeError(f\"gave up on {url} after {max_tries} tries\")"
        ),
        answer: 10,
        solution: {
          code: code(
            "        if attempt < max_tries:",
            "            sleep(2 ** attempt)"
          ),
          en: "Sleep only when another attempt follows: after the last failure nothing is left to wait for, and 2 + 4 + 8 = 14 seconds.",
          ar: "لا تنم إلا حين تتبع الانتظارَ محاولةٌ أخرى: بعد الفشل الأخير لا يبقى ما تنتظره، فيكون المجموع 2 + 4 + 8 = 14 ثانية."
        },
        hint: {
          en: "Add up the waits the function really performs, then ask how many of them are followed by another attempt.",
          ar: "اجمع الانتظارات التي تنفّذها الدالة فعلًا، ثم اسأل: كم منها تتبعه محاولة أخرى؟"
        },
        explain: {
          en: "Line 10. The sleep runs after every failed attempt, including the fourth, after which the loop ends and the function raises: the 16-second wait buys nothing. With a wait of 2^k seconds after failed attempt k, only the first n - 1 waits are useful, 2 + 4 + 8 = 14 seconds, which is 2^4 - 2. Version 3 of the lesson guards it with <code>if attempt &lt; max_tries:</code>. The ceiling matters because it grows fast: eight tries would sleep 254 seconds, which is why <code>max_tries</code> and a cap on the wait belong together. Lines 7 to 9 are right (the timeout is passed, only transient codes are retried, anything else is returned for the caller to judge) and line 11 is the right way to stop: raise, instead of returning something half-true.",
          ar: "السطر 10. تعمل الدالة <code>sleep</code> بعد كل محاولة فاشلة، ومنها الرابعة التي تنتهي بعدها الحلقة وترفع الدالة الخطأ: فانتظار الـ16 ثانية لا يشتري شيئًا. وبانتظار قدره 2^k ثانية بعد المحاولة الفاشلة k لا يفيد إلا أول n − 1 انتظارًا، أي 2 + 4 + 8 = 14 ثانية، وهي 2^4 − 2. وتحرس النسخة 3 في الدرس ذلك بـ<code>if attempt &lt; max_tries:</code>. وسقف الانتظار مهم لأنه ينمو بسرعة: ثماني محاولات تنام 254 ثانية، ولهذا يلزم أن يجتمع <code>max_tries</code> وحدّ أعلى للانتظار. والأسطر 7 إلى 9 صحيحة (تُمرَّر المهلة، ولا يُعاد إلا الرموز العابرة، وما سواها يُعاد للمستدعي ليحكم)، والسطر 11 هو الطريقة الصحيحة للتوقف: ارفع خطأً بدل أن تعيد شيئًا نصف صحيح."
        }
      },

      /* ---------------------------------------------------------- 20 */
      {
        id: "t1l5q20",
        type: "output",
        level: "hard",
        topics: [
          "t1-fetch-all",
          "t1-rate-limit-backoff"
        ],
        q: {
          en: "<code>get_with_retry</code> (Concept 6, Version 3) and <code>fetch_all</code> (Concept 7) are defined as in the lesson. The classroom server answers <code>429</code> with the header <code>Retry-After: 2</code> and <code>500</code> with no headers. Write exactly what the program prints (three lines).",
          ar: "الدالتان <code>get_with_retry</code> (المفهوم 6، النسخة 3) و<code>fetch_all</code> (المفهوم 7) معرَّفتان كما في الدرس. يردّ الخادم الصفّي على <code>429</code> بالترويسة <code>Retry-After: 2</code> وعلى <code>500</code> بلا ترويسات. اكتب بالضبط ما يطبعه البرنامج (ثلاثة أسطر)."
        },
        code: code(
          "waits = []",
          "get = make_fake_get(script={1: [500, 500], 2: [429, 429]})",
          "df = fetch_all(get, \"https://api.example.org/schools\", sleep=waits.append)",
          "",
          "print(df.shape)",
          "print(waits)",
          "print(get.log)"
        ),
        blanks: [
          {
            accept: [
              "(13, 12)\n[2.0, 4.0, 2.0, 2.0]\n[1, 1, 1, 2, 2, 2, 3]"
            ],
            lines: 3
          }
        ],
        hint: {
          en: "Take one page at a time: the attempt counter starts again for every page. For each failed reply ask whether the server sent a <code>Retry-After</code> or the function had to choose the wait itself.",
          ar: "خذ صفحة واحدة في كل مرة: فعدّاد المحاولات يبدأ من جديد لكل صفحة. ولكل ردّ فاشل اسأل: هل أرسل الخادم <code>Retry-After</code> أم كان على الدالة أن تختار الانتظار بنفسها؟"
        },
        explain: {
          en: "Page 1: the 500s carry no <code>Retry-After</code>, so the function picks <code>2 ** attempt</code>: 2.0 s after the first failure and 4.0 s after the second, and the third try succeeds. Page 2: each 429 carries <code>Retry-After: 2</code>, and the server's instruction beats the function's guess, so both waits are 2.0 (not 4.0 for the second, which is what back-off alone would choose); the attempt counter started again at page 2, and the third try succeeds. Page 3 is asked once. So <code>waits</code> is [2.0, 4.0, 2.0, 2.0], the log is 1,1,1,2,2,2,3, and the table holds all 13 schools in 12 columns. The usual slips are doubling on and on across pages ([2, 4, 8, 16]) and forgetting that <code>Retry-After</code> overrides the back-off.",
          ar: "الصفحة 1: لا تحمل الردود 500 ترويسة <code>Retry-After</code>، فتختار الدالة <code>2 ** attempt</code>: 2.0 ثانية بعد الفشل الأول و4.0 بعد الثاني، وتنجح المحاولة الثالثة. الصفحة 2: يحمل كل 429 الترويسة <code>Retry-After: 2</code>، وتعليمات الخادم تغلب تخمين الدالة، فيكون الانتظاران 2.0 (لا 4.0 للثاني، وهو ما كان سيختاره التباطؤ وحده)؛ وبدأ عدّاد المحاولات من جديد في الصفحة 2، وتنجح المحاولة الثالثة. أما الصفحة 3 فتُطلب مرة واحدة. فتكون <code>waits</code> هي [2.0, 4.0, 2.0, 2.0]، والسجلّ 1,1,1,2,2,2,3، ويحوي الجدول المدارس الثلاث عشرة كلها في 12 عمودًا. والزلّتان المعتادتان: الاستمرار في التضعيف عبر الصفحات ([2, 4, 8, 16]) ونسيان أن <code>Retry-After</code> تغلب التباطؤ."
        }
      },

      /* ---------------------------------------------------------- 21 */
      {
        id: "t1l5q21",
        type: "write",
        level: "medium",
        lang: "python",
        topics: [
          "t1-safe-access"
        ],
        q: {
          en: "Write the helper <code>dig(data, *path, default=None)</code>. It follows a path through nested data and never raises. Each step of the path is a key (when the current value is a dictionary) or a position (when it is a list). If a step cannot be taken, because the key is absent, the current value is <code>None</code> or another type, or the position is out of range, it returns <code>default</code>. For example <code>dig(school, \"contacts\", \"email\")</code> gives <code>None</code> for a school whose <code>contacts</code> is <code>null</code>, and <code>dig(school, \"facilities\", 0)</code> gives the first facility.",
          ar: "اكتب الدالة المساعدة <code>dig(data, *path, default=None)</code>. تتبع مسارًا عبر بيانات متشعّبة ولا ترفع خطأً أبدًا. كل خطوة في المسار مفتاح (حين تكون القيمة الحالية قاموسًا) أو موضع (حين تكون قائمة). فإن تعذّرت خطوة، لأن المفتاح غائب أو القيمة الحالية <code>None</code> أو من نوع آخر أو الموضع خارج المدى، أعادت <code>default</code>. مثلًا تعطي <code>dig(school, \"contacts\", \"email\")</code> القيمة <code>None</code> لمدرسة <code>contacts</code> فيها <code>null</code>، وتعطي <code>dig(school, \"facilities\", 0)</code> أول مرفق."
        },
        starter: "# your code here",
        lines: 12,
        checks: [
          {
            re: "def\\s+dig\\s*\\(\\s*\\w+\\s*,\\s*\\*\\s*\\w+\\s*,\\s*default\\s*=\\s*None",
            label: {
              en: "The signature <code>def dig(data, *path, default=None)</code>",
              ar: "التوقيع <code>def dig(data, *path, default=None)</code>"
            }
          },
          {
            re: "for\\s+\\w+\\s+in\\s+\\w+|dig\\s*\\([^)]*\\*\\s*\\w+",
            label: {
              en: "Walk the path one step at a time (a loop over the path, or a recursive call)",
              ar: "امشِ في المسار خطوة خطوة (حلقة على المسار أو استدعاء ذاتي)"
            }
          },
          {
            re: "return\\s+default\\b",
            label: {
              en: "Return <code>default</code> when a step cannot be taken",
              ar: "أعد <code>default</code> حين تتعذّر خطوة"
            }
          },
          {
            re: "isinstance\\s*\\(|except\\s*(\\(|Exception|TypeError)",
            label: {
              en: "Test the type of the current value (or catch the errors), so that a <code>None</code> in the middle cannot crash it",
              ar: "افحص نوع القيمة الحالية (أو التقط الأخطاء) كي لا تُسقطها قيمة <code>None</code> في الوسط"
            }
          },
          {
            re: "isinstance\\s*\\([^)]*list|IndexError|len\\s*\\(",
            label: {
              en: "Handle list positions, including a position out of range",
              ar: "عالج مواضع القوائم، ومنها الموضع خارج المدى"
            }
          }
        ],
        forbid: [
          {
            re: "\\braise\\b",
            label: {
              en: "<code>raise</code> (the helper must never raise)",
              ar: "<code>raise</code> (يجب ألا ترفع الدالة المساعدة خطأً أبدًا)"
            }
          }
        ],
        solution: {
          code: code(
            "def dig(data, *path, default=None):",
            "    current = data",
            "    for step in path:",
            "        if isinstance(current, dict) and step in current:",
            "            current = current[step]",
            "        elif isinstance(current, list) and isinstance(step, int) and -len(current) <= step < len(current):",
            "            current = current[step]",
            "        else:",
            "            return default",
            "    return current"
          ),
          en: "At every step the helper asks 'can I take this step?': a dictionary that has the key, or a list that has the position. Anything else (an absent key, a null in the middle, a wrong type, a position out of range) returns <code>default</code>.",
          ar: "تسأل الدالة في كل خطوة: «هل أستطيع أن أخطو هذه الخطوة؟»: قاموس فيه المفتاح، أو قائمة فيها الموضع. وأي شيء آخر (مفتاح غائب أو null في الوسط أو نوع خاطئ أو موضع خارج المدى) يعيد <code>default</code>."
        },
        hint: {
          en: "At each step ask what the current value is before you index it. Which values have no <code>.get</code> and no <code>[key]</code> at all?",
          ar: "اسأل في كل خطوة ما القيمة الحالية قبل أن تفهرسها. أيّ القيم ليس لها <code>.get</code> ولا <code>[key]</code> أصلًا؟"
        },
        explain: {
          en: "The helper has one rule: before every step, check that the step can be taken, and stop with the default if not. <code>isinstance(current, dict) and step in current</code> covers an absent key, a <code>None</code> in the middle (None is not a dictionary) and a string or number where a dictionary was expected. For a list the position must be an integer inside <code>-len(current) &lt;= step &lt; len(current)</code>, or <code>current[step]</code> raises <code>IndexError</code>. A version built on <code>current.get(step)</code> alone survives an absent key but crashes on the null (the AttributeError of Version 2), and a bare <code>try/except KeyError</code> misses <code>TypeError</code> and <code>IndexError</code>. Remember the price: because <code>dig</code> never complains, a typo in the path looks exactly like missing data, so pair it with a census and keep plain <code>[]</code> for required keys.",
          ar: "للدالة قاعدة واحدة: قبل كل خطوة تأكّد أنها ممكنة، وإلا فتوقّف عند القيمة الافتراضية. فـ<code>isinstance(current, dict) and step in current</code> تغطي المفتاح الغائب و<code>None</code> في الوسط (فهي ليست قاموسًا) والنص أو الرقم حيث توقعت قاموسًا. وفي القائمة يجب أن يكون الموضع عددًا صحيحًا ضمن <code>-len(current) &lt;= step &lt; len(current)</code> وإلا رفعت <code>current[step]</code> الخطأ <code>IndexError</code>. والنسخة المبنية على <code>current.get(step)</code> وحدها تنجو من المفتاح الغائب لكنها تنهار عند null (وهو AttributeError في النسخة 2)، و<code>try/except KeyError</code> المجرّدة تفوّت <code>TypeError</code> و<code>IndexError</code>. وتذكّر الثمن: لأن <code>dig</code> لا تشتكي أبدًا فإن الخطأ الإملائي في المسار يشبه تمامًا بيانات ناقصة، فأرفقها بتعداد وأبقِ <code>[]</code> العادي للمفاتيح المطلوبة."
        }
      },

      /* ---------------------------------------------------------- 22 */
      {
        id: "t1l5q22",
        type: "complete",
        level: "hard",
        topics: [
          "t1-llm-json-validation",
          "t1-json-parse-errors"
        ],
        q: {
          en: "<code>data</code> is the object that <code>json.loads</code> parsed from a model's reply, so the syntax is valid. A usable reply has all three keys with the right types. These replies must raise <code>ValueError</code> with a reason: one with a missing key, <code>\"enrolment_total\": \"about 450\"</code>, <code>\"enrolment_total\": \"455\"</code> (digits in quotes) and <code>\"id\": true</code>; a clean reply must come back unchanged. Which block completes the loop body?",
          ar: "<code>data</code> هو الكائن الذي حلّلته <code>json.loads</code> من ردّ نموذج، فصياغته سليمة. والردّ الصالح فيه المفاتيح الثلاثة كلها بأنواعها الصحيحة. وهذه الردود يجب أن ترفع <code>ValueError</code> مع سبب: ردّ ينقصه مفتاح، و<code>\"enrolment_total\": \"about 450\"</code>، و<code>\"enrolment_total\": \"455\"</code> (أرقام بين علامتي اقتباس)، و<code>\"id\": true</code>؛ أما الردّ السليم فيجب أن يعود دون تغيير. أيّ كتلة تكمل جسم الحلقة؟"
        },
        code: code(
          "REQUIRED = {\"id\": int, \"governorate\": str, \"enrolment_total\": int}",
          "",
          "def check_fields(data):",
          "    \"\"\"Return data, or raise ValueError saying why the model's object is unusable.\"\"\"",
          "    for key, kind in REQUIRED.items():",
          "        ____",
          "    return data"
        ),
        options: [
          {
            code: code(
              "if key not in data:",
              "    raise ValueError(f\"missing key {key!r}\")"
            )
          },
          {
            code: code(
              "if not isinstance(data[key], kind):",
              "    raise ValueError(f\"{key!r} should be {kind.__name__}\")"
            )
          },
          {
            code: code(
              "if key not in data:",
              "    raise ValueError(f\"missing key {key!r}\")",
              "if not isinstance(data[key], kind) or isinstance(data[key], bool):",
              "    raise ValueError(f\"{key!r} should be {kind.__name__}\")"
            )
          },
          {
            code: code(
              "try:",
              "    data[key] = kind(data[key])",
              "except (KeyError, ValueError):",
              "    raise ValueError(f\"bad value for {key!r}\")"
            )
          }
        ],
        answer: 2,
        solution: {
          code: code(
            "if key not in data:",
            "    raise ValueError(f\"missing key {key!r}\")",
            "if not isinstance(data[key], kind) or isinstance(data[key], bool):",
            "    raise ValueError(f\"{key!r} should be {kind.__name__}\")"
          ),
          en: "Check the key first, then the type, and reject <code>bool</code> explicitly, because in Python <code>True</code> is also an <code>int</code>.",
          ar: "افحص المفتاح أولًا ثم النوع، وارفض <code>bool</code> صراحةً لأن <code>True</code> في بايثون هي أيضًا <code>int</code>."
        },
        hint: {
          en: "Run each block on the five replies. For the <code>true</code> reply, ask what <code>isinstance(True, int)</code> returns; for the digits in quotes, ask what the block does with them.",
          ar: "شغّل كل كتلة على الردود الخمسة. وللردّ ذي <code>true</code> اسأل ماذا تعيد <code>isinstance(True, int)</code>؛ وللأرقام بين علامتي الاقتباس اسأل ماذا تفعل الكتلة بها."
        },
        explain: {
          en: "Valid JSON is not a valid reply, so the check must cover presence and type. The first block only checks that the key exists: \"about 450\" and \"455\" pass as the number of students. The second checks the type but indexes <code>data[key]</code> first, so a missing key raises <code>KeyError</code> instead of a <code>ValueError</code> with a reason, and <code>True</code> passes as an <code>int</code> because <code>bool</code> is a subclass of <code>int</code>. The fourth tries to repair the value with <code>kind(...)</code>: it rejects \"about 450\" but quietly turns \"455\" into 455, <code>True</code> into 1 and 455.5 into 455, which hides the model's mistakes instead of counting them. The third block checks presence, then type, and refuses <code>bool</code> explicitly: each failure says why, and a loop that calls the model can count them instead of skipping them silently.",
          ar: "JSON صالحة لا تعني ردًّا صالحًا، فيجب أن يغطي الفحص الوجود والنوع. الكتلة الأولى تفحص وجود المفتاح فقط: فتمرّ «about 450» و«455» على أنهما عدد الطلبة. والثانية تفحص النوع لكنها تفهرس <code>data[key]</code> أولًا، فيرفع المفتاح الغائب <code>KeyError</code> بدل <code>ValueError</code> مع سبب، وتمرّ <code>True</code> على أنها <code>int</code> لأن <code>bool</code> صنف فرعي من <code>int</code>. والرابعة تحاول إصلاح القيمة بـ<code>kind(...)</code>: فترفض «about 450» لكنها تحوّل «455» بصمت إلى 455 و<code>True</code> إلى 1 و455.5 إلى 455، فتُخفي أخطاء النموذج بدل أن تعدّها. أما الكتلة الثالثة فتفحص الوجود ثم النوع وترفض <code>bool</code> صراحةً: يذكر كل إخفاق سببه، وتستطيع الحلقة التي تستدعي النموذج أن تعدّها بدل أن تتخطاها بصمت."
        }
      },

      /* ---------------------------------------------------------- 23 */
      {
        id: "t1l5q23",
        type: "multi",
        level: "easy",
        topics: [
          "t1-timeouts-politeness"
        ],
        q: {
          en: "Which of these habits belong to a polite, robust fetcher? (Choose all that apply.)",
          ar: "أيّ هذه العادات تعود إلى جالب مؤدّب ومتين؟ (اختر كل ما ينطبق.)"
        },
        options: [
          {
            en: "Pause briefly between pages (for example <code>time.sleep(0.2)</code>) even when no 429 has come yet.",
            ar: "توقّف قليلًا بين الصفحات (مثل <code>time.sleep(0.2)</code>) حتى لو لم يأتِ أي 429 بعد."
          },
          {
            en: "Re-download every page each time the notebook runs, so that the table is always the freshest.",
            ar: "أعد تنزيل كل الصفحات كلما شُغّل الدفتر، ليكون الجدول الأحدث دائمًا."
          },
          {
            en: "Retry a 429 at once: the rate-limit window has probably passed while the reply travelled back.",
            ar: "أعد محاولة 429 فورًا: فنافذة حدّ المعدّل انقضت غالبًا أثناء عودة الردّ."
          },
          {
            en: "Pass <code>timeout=</code> to every request, because <code>requests</code> has no default timeout and one dead connection can freeze the script.",
            ar: "مرّر <code>timeout=</code> إلى كل طلب، لأن <code>requests</code> بلا مهلة افتراضية وقد يجمّد اتصال ميت واحد السكربت."
          },
          {
            en: "Ask for a page size larger than the documentation allows, because the server will simply cut it down.",
            ar: "اطلب حجم صفحة أكبر مما تسمح به الوثائق، فالخادم سيقصّه ببساطة."
          },
          {
            en: "Send a <code>User-Agent</code> header that says who runs the script, where the provider offers a way to contact you.",
            ar: "أرسل ترويسة <code>User-Agent</code> تقول من يشغّل السكربت، حيث يتيح المزوّد وسيلة للتواصل معك."
          }
        ],
        answer: [0, 3, 5],
        hint: {
          en: "Imagine being the server that answers thousands of scripts: which habits make life easier for it, and which protect your own script from waiting forever?",
          ar: "تخيّل نفسك الخادم الذي يجيب آلاف السكربتات: أيّ العادات تسهّل عليه، وأيّها تحمي سكربتك من الانتظار إلى الأبد؟"
        },
        explain: {
          en: "A polite fetcher keeps under the limit instead of recovering from it (a short pause between pages), sets a timeout on every call (otherwise one dead connection can hang the script for hours), and identifies itself with a User-Agent. The wrong habits each cost something: re-downloading everything on every run wastes calls and bandwidth, so save the result to a file and read the file next time (Lesson 6 returns to this cache gap); retrying a 429 at once earns another refusal and sometimes a longer penalty, so wait as long as <code>Retry-After</code> says; and a page size beyond the documented maximum is a guess about behaviour that belongs to the provider, who may reject it with a 4xx or cut it silently. Read the provider's documentation for the real limit, the maximum page size and the terms of use.",
          ar: "الجالب المؤدّب يبقى تحت الحدّ بدل أن يتعافى منه (توقّف قصير بين الصفحات)، ويضبط مهلة على كل استدعاء (وإلا قد يعلّق اتصال ميت واحد السكربت ساعات)، ويعرّف بنفسه بترويسة User-Agent. أما العادات الخاطئة فلكل منها ثمن: إعادة تنزيل كل شيء في كل تشغيل تُهدر الطلبات والنطاق، فاحفظ النتيجة في ملف واقرأ الملف في المرة القادمة (ويعود الدرس 6 إلى ثغرة الذاكرة المؤقتة هذه)؛ وإعادة محاولة 429 فورًا تجلب رفضًا آخر وأحيانًا عقوبة أطول، فانتظر المدة التي تقولها <code>Retry-After</code>؛ وحجم صفحة يتجاوز الأقصى الموثَّق تخمين في سلوك يخص المزوّد، وقد يرفضه برمز 4xx أو يقصّه بصمت. اقرأ وثائق المزوّد لتعرف الحدّ الحقيقي والحجم الأقصى للصفحة وشروط الاستعمال."
        }
      },

      /* ---------------------------------------------------------- 24 */
      {
        id: "t1l5q24",
        type: "mcq",
        level: "easy",
        topics: [
          "t1-api-key-secrets"
        ],
        q: {
          en: "A teammate committed <code>API_KEY = \"reg-4f9c2e71b0d34a58\"</code> (a made-up key) to a shared repository and pushed it. An hour later they noticed and deleted the line in a second commit. What should happen next?",
          ar: "أودع زميل السطر <code>API_KEY = \"reg-4f9c2e71b0d34a58\"</code> (مفتاح مختلَق) في مستودع مشترك ودفعه. وبعد ساعة انتبه فحذف السطر في إيداع ثانٍ. ماذا ينبغي أن يحدث بعد ذلك؟"
        },
        options: [
          {
            en: "Revoke the key and issue a new one: the old key still sits in the repository history.",
            ar: "يُلغى المفتاح ويُصدَر مفتاح جديد: فالمفتاح القديم ما زال في تاريخ المستودع."
          },
          {
            en: "Nothing more: the latest version of the file no longer contains the key, so it is no longer exposed.",
            ar: "لا شيء بعد ذلك: فآخر نسخة من الملف لم تعد تحوي المفتاح، فلم يعد مكشوفًا."
          },
          {
            en: "Rename the variable in the old commit so that the automated scanners that search public repositories no longer recognise it.",
            ar: "تُغيَّر تسمية المتغير في الإيداع القديم كي لا تتعرّف عليه الماسحات الآلية التي تبحث في المستودعات العامة."
          },
          {
            en: "Move the key into the URL (<code>?api_key=...</code>) so that it is no longer written in the source code.",
            ar: "يُنقل المفتاح إلى العنوان (<code>?api_key=...</code>) كي لا يبقى مكتوبًا في الكود المصدري."
          }
        ],
        answer: 0,
        hint: {
          en: "A repository keeps every commit. Ask who could already have copied the key, and what only a new key can change.",
          ar: "المستودع يحتفظ بكل إيداع. اسأل: من الذي قد يكون نسخ المفتاح أصلًا، وما الذي لا يغيّره إلا مفتاح جديد؟"
        },
        explain: {
          en: "History is forever: deleting a committed key in a later commit does not remove it from the earlier ones, and automated scanners do search public repositories for keys, so a key that ever reached a repository is a leaked key. The only cure is to revoke it and issue a new one. The new key then lives outside the code, in an environment variable read with <code>os.environ[\"REGISTRY_API_KEY\"]</code> (square brackets, so that a missing variable fails on the spot instead of sending \"Bearer None\") and is sent in a header, never in the URL, which ends up in server logs. Hiding or renaming does not help, because anyone who already cloned the repository holds the old key.",
          ar: "التاريخ يبقى إلى الأبد: فحذف مفتاح أُودع في إيداع لاحق لا يزيله من الإيداعات السابقة، والماسحات الآلية تبحث فعلًا في المستودعات العامة عن المفاتيح، فكل مفتاح وصل يومًا إلى مستودع هو مفتاح مسرَّب. والعلاج الوحيد إلغاؤه وإصدار مفتاح جديد. ثم يعيش المفتاح الجديد خارج الكود، في متغير بيئة يُقرأ بـ<code>os.environ[\"REGISTRY_API_KEY\"]</code> (بالأقواس المربعة كي يفشل غياب المتغير في الحال بدل أن يُرسَل \"Bearer None\")، ويُرسَل في ترويسة لا في العنوان الذي ينتهي في سجلات الخادم. والإخفاء أو تغيير التسمية لا يفيد، لأن كل من استنسخ المستودع يحمل المفتاح القديم."
        }
      }

    ]
  };
})();
