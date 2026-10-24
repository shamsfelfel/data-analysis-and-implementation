window.DABanks = window.DABanks || {};
(function () {
  /* code(line, line, ...) -> one string with \n between lines */
  function code() { return Array.prototype.join.call(arguments, "\n"); }

  window.DABanks["t1-exam-b"] = {
    title: {
      en: "Chapter Test B — Applied: Reading, Fixing and Writing Code",
      ar: "اختبار الفصل ب — التطبيق: قراءة الكود وإصلاحه وكتابته"
    },
    intro: {
      en: "24 applied questions on the whole of Chapter 1. You read, trace, fix, complete and write code on the chapter's own data (the rental listings, the school sheet, the school registry and its API pages) and you judge which version of a solution is better. Several questions chain two lessons, for example loading a semicolon file and then counting what the conversion swallowed, or flattening a JSON reply and then validating its fields. Every output was produced by running the code with Python 3.13, pandas 2.2 and NumPy 2.2 (pandas 3 prints text columns as <code>str</code>; no question depends on that). Plan for about 60 minutes. Every question has a hint, an answer and an explanation, hidden until you ask for them: try first, then open them. A revealed answer is not counted.",
      ar: "24 سؤالًا تطبيقيًّا على الفصل الأول كله. تقرأ الكود وتتتبّعه وتصلحه وتكمله وتكتبه على بيانات الفصل نفسها (إعلانات الإيجار وجدول المدارس وسجلّ المدارس وصفحات واجهته)، وتحكم أيّ نسخة من الحل أفضل. وتربط أسئلة عدّة بين درسين، مثل تحميل ملف بفاصلة منقوطة ثم عدّ ما ابتلعه التحويل، أو تسطيح ردّ JSON ثم التحقق من حقوله. كل النواتج مأخوذة من تشغيل الكود فعلًا ببايثون 3.13 وpandas 2.2 وNumPy 2.2 (تطبع pandas 3 الأعمدة النصية بالنوع <code>str</code>، ولا يعتمد أي سؤال على ذلك). خصّص نحو 60 دقيقة. لكل سؤال تلميح وجواب وشرح، وكلها مخفية حتى تطلبها: جرّب أولًا ثم افتحها. والجواب الذي يُظهَر لا يُحتسب."
    },
    questions: [
      {
        id: "t1bx01",
        type: "output",
        level: "easy",
        topics: [
          "t1-regex-primer",
          "t1-not-found-and-ranges"
        ],
        q: {
          en: "Three adverts are searched with a pattern that also accepts the Arabic word <code>غرف</code>. Write exactly what the program prints (four lines).",
          ar: "يُبحث في ثلاثة إعلانات بنمط يقبل أيضًا الكلمة العربية <code>غرف</code>. اكتب بالضبط ما يطبعه البرنامج (أربعة أسطر)."
        },
        code: code(
          "import re",
          "",
          "ads = [",
          "    \"Flat in Rafah, 3 rooms, 95 m2\",",
          "    \"شقة في غزة، ٣ غرف، 70 متر\",",
          "    \"Studio near the university, 28 m2\",",
          "]",
          "for ad in ads:",
          "    m = re.search(r\"(\\d+)\\s*(?:rooms?|غرف)\", ad)",
          "    print(int(m.group(1)) if m else None)",
          "print([int(x) for x in re.findall(r\"\\d+\", ads[1])])"
        ),
        blanks: [
          {
            accept: [
              code(
                "3",
                "3",
                "None",
                "[3, 70]"
              )
            ],
            lines: 4
          }
        ],
        hint: {
          en: "In Python 3, does <code>\\d</code> match only the digits 0 to 9? And what does the conditional expression give when <code>search</code> finds nothing?",
          ar: "في بايثون 3، هل يطابق <code>\\d</code> الأرقام 0 إلى 9 فقط؟ وماذا يعطي التعبير الشرطي حين لا تجد <code>search</code> شيئًا؟"
        },
        explain: {
          en: "<code>\\d</code> matches a decimal digit of any script, so the Arabic-Indic <code>٣</code> is found and <code>int(\"٣\")</code> is 3: the second advert gives 3, like the first. The studio never mentions rooms, so <code>search</code> returns <code>None</code> and the line prints <code>None</code>, not 0: a number that was not found must stay visibly not found (Version 3 of the advert parser). The last line shows the same digits through <code>findall</code>: the strings <code>'٣'</code> and <code>'70'</code> become the list <code>[3, 70]</code>. Rule: the pattern does not care which digits the writer used, but 'not found' must never be turned into a number.",
          ar: "الرمز <code>\\d</code> يطابق أي رقم عشري من أي نظام كتابة، فيُلتقط الرقم الهندي العربي <code>٣</code> وتحوّله <code>int(\"٣\")</code> إلى 3؛ ولهذا يعطي الإعلان الثاني 3 كالأول. أما الاستوديو فلا يذكر غرفًا، فتعيد <code>search</code> القيمة <code>None</code> ويطبع السطر <code>None</code> لا 0: العدد الذي لم يوجد يجب أن يبقى ظاهرًا أنه غير موجود (النسخة 3 من محلِّل الإعلانات). ويُظهر السطر الأخير الأرقام نفسها عبر <code>findall</code>: السلسلتان <code>'٣'</code> و<code>'70'</code> تصيران القائمة <code>[3, 70]</code>. القاعدة: النمط لا يبالي بأي أرقام كتبها الكاتب، لكن «لم يوجد» لا يجوز أن يتحوّل إلى رقم."
        }
      },
      {
        id: "t1bx02",
        type: "mcq",
        level: "medium",
        topics: [
          "t1-lists-to-dataframe",
          "t1-structured-table",
          "t1-schema-on-read"
        ],
        q: {
          en: "A colleague says: 'Put the records into a DataFrame and the typo in the last key will be caught, because a table has a fixed schema.' What do these lines print?",
          ar: "يقول زميل: «ضع السجلات في DataFrame وسيُكتشف الخطأ الإملائي في المفتاح الأخير، فالجدول له مخطط ثابت». ماذا تطبع هذه الأسطر؟"
        },
        code: code(
          "import pandas as pd",
          "",
          "rows = [",
          "    {\"id\": 1001, \"city\": \"Khan Younis\", \"rent\": 415},",
          "    {\"id\": 1002, \"city\": \"Gaza\",        \"rent\": 445},",
          "    {\"id\": 1005, \"city\": \"Rafah\",       \"rnet\": 285},    # a typo in the key",
          "]",
          "df = pd.DataFrame(rows)",
          "print(df.shape)",
          "print(df[\"rent\"].count(), df[\"rent\"].mean())"
        ),
        options: [
          {
            en: "<code>KeyError: 'rent'</code>, raised while the DataFrame is built, because the third record has no such key",
            ar: "<code>KeyError: 'rent'</code> تُرفع أثناء بناء DataFrame، لأن السجل الثالث لا يملك هذا المفتاح"
          },
          {
            en: "<code>(3, 3)</code> and then <code>3 381.67</code>: pandas recognises <code>rnet</code> as a misspelling of <code>rent</code> and merges the two",
            ar: "<code>(3, 3)</code> ثم <code>3 381.67</code>: تتعرّف pandas على <code>rnet</code> بوصفها تهجئة خاطئة لـ<code>rent</code> وتدمج العمودين"
          },
          {
            en: "<code>ValueError</code>, because the records do not all have the same keys, just as lists of different lengths are refused",
            ar: "<code>ValueError</code>، لأن السجلات لا تحمل المفاتيح نفسها كلها، كما تُرفض القوائم المختلفة الطول"
          },
          {
            en: "<code>(3, 4)</code> and then <code>2 430.0</code>: a fourth column <code>rnet</code> appears and the third rent is silently missing from the mean",
            ar: "<code>(3, 4)</code> ثم <code>2 430.0</code>: يظهر عمود رابع اسمه <code>rnet</code> ويغيب الإيجار الثالث عن المتوسط بصمت"
          }
        ],
        answer: 3,
        hint: {
          en: "What did the lesson say a DataFrame checks (think of lists of different lengths), and what does it accept without a word?",
          ar: "ماذا قال الدرس إن DataFrame تفحصه (فكّر في قوائم مختلفة الطول)، وماذا تقبله بلا اعتراض؟"
        },
        explain: {
          en: "A DataFrame built from dictionaries takes the union of all the keys; a record that lacks a key gets NaN there. Nothing is wrong with the shape, so nothing is raised: the typo becomes a new column <code>rnet</code> with a single value, and the real <code>rent</code> column has a gap, so the mean is 430.0 over 2 listings. A <code>KeyError</code> would need code that asks for the missing key by name (<code>row[\"rent\"]</code>), and building the table does not. A <code>ValueError</code> is raised only when arrays of different lengths are given, and pandas never merges spellings. The table checks the shape of what it receives, not the names or the values: comparing <code>df.columns</code> with the expected columns is your job (Lesson 6 turns it into a schema).",
          ar: "تأخذ DataFrame المبنية من قواميس اتحاد كل المفاتيح؛ والسجل الذي ينقصه مفتاح يأخذ NaN في ذلك العمود. لا عيب في الشكل فلا يُرفع شيء: يصير الخطأ الإملائي عمودًا جديدًا <code>rnet</code> بقيمة واحدة، ويصير في عمود <code>rent</code> الحقيقي فراغ، فيكون المتوسط 430.0 على إعلانين. ولن يظهر <code>KeyError</code> إلا لكود يطلب المفتاح الناقص بالاسم (<code>row[\"rent\"]</code>)، وبناء الجدول لا يفعل ذلك. ولا يُرفع <code>ValueError</code> إلا حين تُعطى مصفوفات مختلفة الطول، ولا تدمج pandas التهجئات أبدًا. الجدول يفحص شكل ما يتلقاه لا أسماءه ولا قيمه: ومقارنة <code>df.columns</code> بالأعمدة المتوقعة مهمتك أنت (والدرس 6 يحوّلها إلى مخطط)."
        }
      },
      {
        id: "t1bx03",
        type: "trace",
        level: "medium",
        topics: [
          "t1-schema-on-write",
          "t1-structured-table"
        ],
        q: {
          en: "A table is created with three rules (a primary key, a city that may not be empty and a rent above 0), and five rows are inserted one by one. After the last line has run, what are the values of <code>rejected</code> and <code>n_rows</code>? (Write the list as Python prints it.)",
          ar: "يُنشأ جدول بثلاث قواعد (مفتاح أساسي، ومدينة لا يجوز أن تكون فارغة، وإيجار أكبر من 0)، وتُدرج خمسة صفوف واحدًا واحدًا. بعد تنفيذ السطر الأخير، ما قيمتا <code>rejected</code> و<code>n_rows</code>؟ (اكتب القائمة كما تطبعها بايثون.)"
        },
        code: code(
          "import sqlite3",
          "",
          "con = sqlite3.connect(\":memory:\")",
          "con.execute(\"\"\"",
          "    CREATE TABLE listings (",
          "        id   INTEGER PRIMARY KEY,",
          "        city TEXT NOT NULL,",
          "        rent INTEGER CHECK (rent > 0))\"\"\")",
          "",
          "rejected = []",
          "for row in [(1001, \"Gaza\", 445), (1002, None, 300), (1003, \"Rafah\", -5),",
          "            (1004, \"Rafah\", 285), (1004, \"Rafah\", 290)]:",
          "    try:",
          "        con.execute(\"INSERT INTO listings VALUES (?, ?, ?)\", row)",
          "    except sqlite3.IntegrityError:",
          "        rejected.append(row[0])",
          "",
          "n_rows = con.execute(\"SELECT COUNT(*) FROM listings\").fetchone()[0]"
        ),
        blanks: [
          {
            accept: [
              "[1002, 1003, 1004]"
            ],
            label: {
              en: "rejected",
              ar: "rejected"
            },
            wide: true
          },
          {
            accept: [
              "2"
            ],
            label: {
              en: "n_rows",
              ar: "n_rows"
            }
          }
        ],
        hint: {
          en: "Read the <code>CREATE TABLE</code> statement as three rules and check every row against all three, the fifth row too.",
          ar: "اقرأ عبارة <code>CREATE TABLE</code> بوصفها ثلاث قواعد وافحص كل صف عليها جميعًا، والصف الخامس أيضًا."
        },
        explain: {
          en: "A database checks every row at the door (schema-on-write). Row 1002 has no city, so <code>NOT NULL</code> refuses it. Row 1003 has a rent of -5, so <code>CHECK (rent &gt; 0)</code> refuses it. Row 1004 is stored the first time (285); the fifth row repeats the primary key 1004, so it is refused and the first one stays. Hence <code>rejected = [1002, 1003, 1004]</code> and two rows are stored, 1001 and 1004. A DataFrame built from the same five rows would hold all five, with the missing city, the negative rent and the repeated id, and would say nothing: pandas checks the shape, not the rules. The price of a declared schema is that some rows are turned away; the profit is that nobody downstream has to clean them.",
          ar: "تفحص قاعدة البيانات كل صف عند الباب (المخطط عند الكتابة). الصف 1002 بلا مدينة فيرفضه <code>NOT NULL</code>. والصف 1003 إيجاره -5 فيرفضه <code>CHECK (rent &gt; 0)</code>. والصف 1004 يُخزَّن في المرة الأولى (285)؛ أما الصف الخامس فيكرّر المفتاح الأساسي 1004 فيُرفض وتبقى الأولى. إذن <code>rejected = [1002, 1003, 1004]</code> ويُخزَّن صفّان هما 1001 و1004. أما DataFrame المبنية من الصفوف الخمسة نفسها فتحمل الخمسة كلها، بالمدينة الفارغة والإيجار السالب والمعرّف المكرّر، ولا تقول شيئًا: pandas تفحص الشكل لا القواعد. ثمن المخطط المعلَن أن بعض الصفوف تُردّ، وربحه أن لا أحد بعده مضطر إلى تنظيفها."
        }
      },
      {
        id: "t1bx04",
        type: "tf",
        level: "easy",
        topics: [
          "t1-ordered-categorical",
          "t1-allowed-operations"
        ],
        q: {
          en: "The school stage is ordinal, and an ordered category knows its order. True or false: the last line prints <code>Preparatory</code>, the median stage.",
          ar: "مرحلة المدرسة ترتيبية، والنوع الفئوي المرتّب يعرف ترتيبه. صح أم خطأ: يطبع السطر الأخير <code>Preparatory</code>، أي المرحلة الوسيطة."
        },
        code: code(
          "import pandas as pd",
          "",
          "schools = pd.read_csv(\"school_conditions_demo.csv\")",
          "stage = pd.CategoricalDtype([\"Primary\", \"Preparatory\", \"Secondary\"], ordered=True)",
          "level = schools[\"level\"].astype(stage)",
          "print(level.min(), level.max())",
          "print(level.median())"
        ),
        truth: false,
        hint: {
          en: "'The level permits it' and 'the library provides it' are two different questions. Which of them does this last line depend on?",
          ar: "«المستوى يسمح به» و«المكتبة توفّره» سؤالان مختلفان. بأيّهما يرتبط هذا السطر الأخير؟"
        },
        explain: {
          en: "The first <code>print</code> shows <code>Primary Secondary</code>, because minimum and maximum need only the order. The second raises <code>TypeError: 'Categorical' with dtype category does not support reduction 'median'</code> (pandas 2.2): the median is legal for an ordinal column, but pandas does not implement it for categories. The way round it is short and honest: take the median of <code>level.cat.codes</code> with <code>quantile(0.5, interpolation=\"lower\")</code> and translate the code back to a name, which gives <code>Preparatory</code>. Knowing that a statistic is legal for the level does not mean that the library implements it.",
          ar: "تُظهر أولى الطباعتين <code>Primary Secondary</code> لأن الحد الأدنى والأقصى لا يحتاجان إلا إلى الترتيب. أما الثانية فترفع <code>TypeError: 'Categorical' with dtype category does not support reduction 'median'</code> (في pandas 2.2): الوسيط مشروع للعمود الترتيبي، لكن pandas لا تنفّذه للأنواع الفئوية. والحيلة قصيرة وأمينة: خذ وسيط <code>level.cat.codes</code> بـ<code>quantile(0.5, interpolation=\"lower\")</code> ثم ترجم الرمز إلى اسم، فتحصل على <code>Preparatory</code>. ومعرفة أن إحصاءً ما مشروع للمستوى لا تعني أن المكتبة تنفّذه."
        }
      },
      {
        id: "t1bx05",
        type: "match",
        level: "easy",
        topics: [
          "t1-allowed-operations",
          "t1-levels-of-measurement",
          "t1-summary-by-level"
        ],
        q: {
          en: "Match each line of the school sheet code to the lowest level of measurement at which the number it prints is still meaningful.",
          ar: "وصّل كل سطر من كود جدول المدارس بأدنى مستوى قياس يبقى عنده الرقم الذي يطبعه ذا معنى."
        },
        pairs: [
          {
            l: {
              code: "schools[\"governorate\"].mode().tolist()"
            },
            r: {
              en: "Nominal: only same or different",
              ar: "اسمي: متشابه أو مختلف فقط"
            }
          },
          {
            l: {
              code: "schools[\"level\"].cat.codes.quantile(0.5, interpolation=\"lower\")"
            },
            r: {
              en: "Ordinal: an order, unknown gaps",
              ar: "ترتيبي: ترتيب وفوارق مجهولة"
            }
          },
          {
            l: {
              code: "schools[\"classroom_temp_c\"].mean()"
            },
            r: {
              en: "Interval: equal gaps, arbitrary zero",
              ar: "فتري: فوارق متساوية وصفر اعتباطي"
            }
          },
          {
            l: {
              code: "schools[\"students\"].max() / schools[\"students\"].min()"
            },
            r: {
              en: "Ratio: a true zero",
              ar: "نسبي: صفر حقيقي"
            }
          }
        ],
        leftHead: {
          en: "The line",
          ar: "السطر"
        },
        rightHead: {
          en: "Lowest level that allows it",
          ar: "أدنى مستوى يسمح به"
        },
        hint: {
          en: "Ask what each line needs from the numbers: only equality, an order, subtraction with equal gaps, or a division that needs a true zero.",
          ar: "اسأل عمّا يحتاجه كل سطر من الأرقام: المساواة فقط، أم ترتيبًا، أم طرحًا بفوارق متساوية، أم قسمةً تحتاج إلى صفر حقيقي."
        },
        explain: {
          en: "The mode needs only 'same or different', so a nominal column can have one. The median needs an order but no gaps, which is the ordinal level. The mean adds values and divides, so it needs equal gaps: interval is the lowest level that allows it. The largest-to-smallest ratio divides two values, and a ratio means something only when zero means 'none of it': ratio level. Every line is also legal above its level (a ratio column can have a mode), which is why the match asks for the lowest. Temperature shows the other side: 22 °C is not 'twice' 11 °C, so the ratio line would be illegal for <code>classroom_temp_c</code>.",
          ar: "المنوال لا يحتاج إلا إلى «متشابه أو مختلف»، فيصحّ للعمود الاسمي. والوسيط يحتاج إلى ترتيب دون فوارق، وهذا هو المستوى الترتيبي. والمتوسط يجمع القيم ويقسم، فيحتاج إلى فوارق متساوية: الفتري أدنى مستوى يسمح به. ونسبة الأكبر إلى الأصغر قسمة قيمتين، ولا معنى للنسبة إلا حين يعني الصفر «لا شيء»: المستوى النسبي. وكل سطر يصحّ أيضًا فوق مستواه (يملك العمود النسبي منوالًا)، ولذلك يسأل التوصيل عن الأدنى. وتُظهر الحرارة الوجه الآخر: 22 °م ليست «ضعف» 11 °م، فسطر النسبة غير مشروع للعمود <code>classroom_temp_c</code>."
        }
      },
      {
        id: "t1bx06",
        type: "write",
        level: "medium",
        lang: "python",
        topics: [
          "t1-encoding-by-level",
          "t1-one-hot",
          "t1-ordered-categorical"
        ],
        q: {
          en: "Build the feature table <code>X</code> for a model that predicts <code>repair_weeks</code>. It must hold: one 0/1 column per governorate (nominal); <code>level</code> as the codes 0, 1, 2 for Primary &lt; Preparatory &lt; Secondary and <code>damage_level</code> as the codes 0, 1, 2 for slight &lt; partial &lt; total (you declare both orders); <code>students</code> and <code>classroom_temp_c</code> unchanged. The identifier and the target must not be in <code>X</code>. Print <code>X.shape</code>.",
          ar: "ابنِ جدول السمات <code>X</code> لنموذج يتنبأ بـ<code>repair_weeks</code>. يجب أن يحوي: عمودًا من 0/1 لكل محافظة (اسمي)؛ و<code>level</code> رموزًا 0 و1 و2 بحسب Primary &lt; Preparatory &lt; Secondary، و<code>damage_level</code> رموزًا 0 و1 و2 بحسب slight &lt; partial &lt; total (وأنت من يعلن الترتيبين)؛ و<code>students</code> و<code>classroom_temp_c</code> دون تغيير. ولا يجوز أن يكون المعرّف ولا الهدف في <code>X</code>. اطبع <code>X.shape</code>."
        },
        starter: code(
          "import pandas as pd",
          "",
          "schools = pd.read_csv(\"school_conditions_demo.csv\")",
          "",
          "# your code here"
        ),
        lines: 9,
        checks: [
          {
            re: "get_dummies\\s*\\(",
            label: {
              en: "One-hot the nominal column with <code>pd.get_dummies(...)</code>",
              ar: "رمّز العمود الاسمي أحاديًّا بـ<code>pd.get_dummies(...)</code>"
            }
          },
          {
            re: "(CategoricalDtype\\s*\\(|categories\\s*=|\\.map\\s*\\(\\s*\\{)",
            label: {
              en: "Declare the order of the ordinal columns (a <code>CategoricalDtype</code> or an explicit map)",
              ar: "أعلن ترتيب العمودين الترتيبيين (<code>CategoricalDtype</code> أو خريطة صريحة)"
            }
          },
          {
            re: "(?=.*[\"']damage_level[\"'])(?=.*[\"']level[\"'])",
            label: {
              en: "Encode both ordinal columns, <code>level</code> and <code>damage_level</code>",
              ar: "رمّز العمودين الترتيبيين معًا: <code>level</code> و<code>damage_level</code>"
            }
          },
          {
            re: "print\\s*\\(.*\\.shape",
            label: {
              en: "Print the shape of <code>X</code>",
              ar: "اطبع شكل <code>X</code>"
            }
          }
        ],
        forbid: [
          {
            re: "factorize\\s*\\(|astype\\(\\s*[\"']category[\"']\\s*\\)\\s*\\.cat\\.codes",
            label: {
              en: "Numbering the categories by appearance or alphabet (<code>factorize</code>, a plain <code>astype(\"category\").cat.codes</code>)",
              ar: "ترقيم الفئات بحسب الظهور أو الأبجدية (<code>factorize</code> أو <code>astype(\"category\").cat.codes</code> العادية)"
            }
          }
        ],
        solution: {
          code: code(
            "STAGE = pd.CategoricalDtype([\"Primary\", \"Preparatory\", \"Secondary\"], ordered=True)",
            "DAMAGE = pd.CategoricalDtype([\"slight\", \"partial\", \"total\"], ordered=True)",
            "",
            "X = pd.get_dummies(schools[\"governorate\"], prefix=\"gov\", dtype=int)",
            "X[\"level\"] = schools[\"level\"].astype(STAGE).cat.codes",
            "X[\"damage\"] = schools[\"damage_level\"].astype(DAMAGE).cat.codes",
            "X[\"students\"] = schools[\"students\"]",
            "X[\"temp_c\"] = schools[\"classroom_temp_c\"]",
            "print(X.shape)"
          ),
          out: "(13, 9)",
          en: "Governorate is nominal, so it gets one 0/1 column per name (five columns): no governorate is 'between' two others. Stage and damage are ordinal, so each gets codes from an order you declared once; codes from appearance or alphabet would leak the order of the file into the model. Students and temperature are quantities and stay as they are. <code>school_id</code> (an identifier) and <code>repair_weeks</code> (the target) are left out. The shape is (13, 9): five + two + two columns.",
          ar: "المحافظة اسمية، فتأخذ عمود 0/1 لكل اسم (خمسة أعمدة): لا محافظة «بين» محافظتين. والمرحلة والضرر ترتيبيان، فيأخذ كل منهما رموزًا من ترتيب أعلنته مرة واحدة؛ أما الرموز بحسب الظهور أو الأبجدية فتُدخل ترتيب الملف إلى النموذج. والطلاب والحرارة كميتان فتبقيان كما هما. ويُترك <code>school_id</code> (معرّف) و<code>repair_weeks</code> (الهدف). والشكل (13, 9): خمسة + اثنان + اثنان."
        },
        hint: {
          en: "One encoding per level: names get one column each, ordered labels get codes from a declared order, quantities stay. Which two columns must not enter at all?",
          ar: "ترميز واحد لكل مستوى: الأسماء لكل منها عمود، والتسميات المرتّبة لها رموز من ترتيب معلَن، والكميات تبقى. وأيّ عمودين يجب ألا يدخلا أصلًا؟"
        },
        explain: {
          en: "Each column gets the encoding its level allows: one-hot for the nominal governorate (so the model invents no distance between places), codes from a declared order for the two ordinal columns, the raw numbers for the interval and ratio ones. The common slips are numbering governorates 0 to 4 (the model then believes the places lie on a line, one to four steps apart), coding damage by order of appearance (a different model every time the rows are shuffled) and leaving <code>school_id</code> in, so that the model fits a slope through labels. Declaring the order costs two lines and is the whole difference.",
          ar: "ينال كل عمود الترميز الذي يسمح به مستواه: أحادي للمحافظة الاسمية (فلا يخترع النموذج مسافة بين الأماكن)، ورموز من ترتيب معلَن للعمودين الترتيبيين، والأرقام كما هي للفتري والنسبي. والزلّات الشائعة: ترقيم المحافظات من 0 إلى 4 (فيعتقد النموذج أن الأماكن تقع على خط، بين كل اثنتين منها خطوة إلى أربع)، وترميز الضرر بحسب الظهور (نموذج مختلف كلما خُلطت الصفوف)، وترك <code>school_id</code> في الجدول فيمرّر النموذج ميلًا خلال تسميات. إعلان الترتيب يكلّف سطرين وهو كل الفرق."
        }
      },
      {
        id: "t1bx07",
        type: "complete",
        level: "hard",
        topics: [
          "t1-model-beliefs",
          "t1-encoding-by-level"
        ],
        q: {
          en: "An encoding must not depend on the order of the rows in the file. <code>order_independent</code> fits the same linear model on the file order and on a shuffled copy. It must print <code>False</code> for <code>encode_v1</code> (governorates numbered by order of appearance, damage coded from its declared order) and <code>True</code> for <code>encode_v3</code> (one-hot governorates). Which expression completes the <code>return</code> line?",
          ar: "يجب ألا يعتمد الترميز على ترتيب الصفوف في الملف. تُدرِّب الدالة <code>order_independent</code> النموذج الخطي نفسه على ترتيب الملف وعلى نسخة مخلوطة. ويجب أن تطبع <code>False</code> للترميز <code>encode_v1</code> (المحافظات مرقَّمة بحسب الظهور والضرر مرمَّز من ترتيب معلَن) و<code>True</code> للترميز <code>encode_v3</code> (محافظات أحادية الترميز). أيّ تعبير يكمل سطر <code>return</code>؟"
        },
        code: code(
          "import numpy as np",
          "",
          "def fit(X, y):",
          "    X1 = np.column_stack([np.ones(len(X)), X])",
          "    return np.linalg.lstsq(X1, y, rcond=None)[0].round(2)   # intercept, then one weight per column",
          "",
          "def order_independent(encode, df, target):",
          "    shuffled = df.sample(frac=1, random_state=56).reset_index(drop=True)",
          "    w1 = fit(encode(df), df[target].to_numpy())",
          "    w2 = fit(encode(shuffled), shuffled[target].to_numpy())",
          "    return ____",
          "",
          "print(order_independent(encode_v1, schools, \"repair_weeks\"))   # must print False",
          "print(order_independent(encode_v3, schools, \"repair_weeks\"))   # must print True"
        ),
        options: [
          {
            code: "w1.shape == w2.shape"
          },
          {
            code: "np.allclose(w1, w2, atol=30)"
          },
          {
            code: "w1 == w2"
          },
          {
            code: "np.allclose(w1, w2)"
          }
        ],
        answer: 3,
        solution: {
          code: "return np.allclose(w1, w2)",
          en: "<code>np.allclose</code> compares the two weight vectors element by element with a tiny tolerance and returns one True/False.",
          ar: "تقارن <code>np.allclose</code> متجهَي الأوزان عنصرًا بعنصر بتسامح ضئيل وتعيد قيمة واحدة True أو False."
        },
        hint: {
          en: "The function must return one True/False that is False as soon as any weight moves. Test each candidate against that sentence, on both encodings.",
          ar: "يجب أن تعيد الدالة قيمة واحدة True/False تكون False بمجرد أن يتحرك أي وزن. اختبر كل مرشح بهذه الجملة، على الترميزين معًا."
        },
        explain: {
          en: "<code>np.allclose(w1, w2)</code> asks whether every weight is the same after shuffling: it is False for <code>encode_v1</code> (the weights move, because the numbering of the places follows the order of the file) and True for the one-hot version. <code>w1.shape == w2.shape</code> is True for any encoding with the same number of columns, so the test could never fail. <code>atol=30</code> allows differences as large as the weights themselves (all below 20 here), so that test cannot fail either. <code>w1 == w2</code> returns an array of booleans, not one value, and using it in an <code>if</code> or an <code>assert</code> raises <code>ValueError</code>. Lesson 2 turned the sentence 'the model believes whatever the encoding says' into a test: shuffle, refit, and the weights must not move.",
          ar: "تسأل <code>np.allclose(w1, w2)</code> هل بقي كل وزن كما هو بعد الخلط: وجوابها False للترميز <code>encode_v1</code> (إذ تتحرك الأوزان لأن ترقيم الأماكن يتبع ترتيب الملف) وTrue للترميز الأحادي. أما <code>w1.shape == w2.shape</code> فصحيحة لأي ترميز له عدد الأعمدة نفسه، فلا يمكن أن يفشل الاختبار أبدًا. و<code>atol=30</code> تسمح بفروق بحجم الأوزان نفسها (وكلها أقل من 20 هنا)، فلا يفشل هذا الاختبار أيضًا. و<code>w1 == w2</code> تعيد مصفوفة من القيم المنطقية لا قيمة واحدة، واستعمالها في <code>if</code> أو <code>assert</code> يرفع <code>ValueError</code>. حوّل الدرس 2 عبارة «النموذج يصدّق ما يقوله الترميز» إلى اختبار: اخلط وأعد التدريب، ويجب ألا تتحرك الأوزان."
        }
      },
      {
        id: "t1bx08",
        type: "error",
        level: "easy",
        topics: [
          "t1-loc-iloc-select"
        ],
        q: {
          en: "The program should print the mean rent of the first two listings (430.0). It prints 483.3 and raises nothing. Click the line responsible.",
          ar: "يُفترض أن يطبع البرنامج متوسط إيجار أول إعلانين (430.0). لكنه يطبع 483.3 ولا يرفع شيئًا. انقر السطر المسؤول."
        },
        code: code(
          "import pandas as pd",
          "",
          "df = pd.read_csv(\"rental_listings.csv\")",
          "first_two = df.loc[0:2, \"monthly_rent\"]",
          "print(\"mean rent of the first two listings:\", round(first_two.mean(), 1))"
        ),
        answer: 4,
        solution: {
          code: "first_two = df.iloc[0:2][\"monthly_rent\"]",
          en: "<code>.iloc[0:2]</code> slices by position and stops before 2. (<code>.loc[0:1, ...]</code> would also give two rows.)",
          ar: "تقطع <code>.iloc[0:2]</code> بالموضع وتتوقف قبل 2. (وكانت <code>.loc[0:1, ...]</code> تعطي صفّين أيضًا.)"
        },
        hint: {
          en: "How many values does <code>first_two</code> hold? Compare what a slice by label and a slice by position do at their end.",
          ar: "كم قيمة تحمل <code>first_two</code>؟ قارن ما تفعله الشريحة بالتسمية والشريحة بالموضع عند نهايتها."
        },
        explain: {
          en: "<code>.loc</code> slices by label, and a label range has no 'one past the end', so it includes both ends: <code>0:2</code> is the three listings 0, 1 and 2 (rents 415, 445 and 590, mean 483.3). <code>.iloc[0:2]</code> slices by position like a Python list and stops before 2: two rows, mean 430.0. Nothing is raised because both slices are legal; a quick <code>len(first_two)</code> would have shown 3. Rule: label slices include the end, position slices exclude it.",
          ar: "تقطع <code>.loc</code> بالتسمية، ولا يوجد في مدى التسميات «ما بعد النهاية»، فتشمل الطرفين: <code>0:2</code> هي الإعلانات الثلاثة 0 و1 و2 (إيجاراتها 415 و445 و590 ومتوسطها 483.3). أما <code>.iloc[0:2]</code> فتقطع بالموضع كقوائم بايثون وتتوقف قبل 2: صفّان ومتوسط 430.0. لا يُرفع شيء لأن الشريحتين كلتيهما مشروعة؛ ولو جرّبت <code>len(first_two)</code> لرأيت 3. القاعدة: شرائح التسميات تشمل النهاية وشرائح المواضع تستثنيها."
        }
      },
      {
        id: "t1bx09",
        type: "contrast",
        level: "medium",
        topics: [
          "t1-casting-tools",
          "t1-coerce-and-count",
          "t1-silent-casts"
        ],
        q: {
          en: "<code>raw</code> is a column of text. Place each statement under the strict conversion <code>raw.astype(float)</code>, under the forgiving one <code>pd.to_numeric(raw, errors=\"coerce\")</code>, under both, or under neither.",
          ar: "العمود <code>raw</code> نصوص. ضع كل عبارة تحت التحويل الصارم <code>raw.astype(float)</code> أو تحت التحويل المتسامح <code>pd.to_numeric(raw, errors=\"coerce\")</code> أو تحت كليهما أو تحت لا هذا ولا ذاك."
        },
        concepts: [
          {
            en: "<code>astype(float)</code> (strict)",
            ar: "<code>astype(float)</code> (صارم)"
          },
          {
            en: "<code>to_numeric(coerce)</code> (forgiving)",
            ar: "<code>to_numeric(coerce)</code> (متسامح)"
          }
        ],
        neither: true,
        rows: [
          {
            s: {
              en: "Stops the run with a <code>ValueError</code> at the first text it cannot read",
              ar: "تُوقِف التشغيل بالخطأ <code>ValueError</code> عند أول نص لا تستطيع قراءته"
            },
            a: 0
          },
          {
            s: {
              en: "Stores NaN in place of every text it cannot read and carries on",
              ar: "تضع NaN مكان كل نص لا تستطيع قراءته وتتابع"
            },
            a: 1
          },
          {
            s: {
              en: "Leaves you to compute <code>out.isna() &amp; raw.notna()</code> yourself before you can say how many values were lost",
              ar: "تترك لك أن تحسب <code>out.isna() &amp; raw.notna()</code> بنفسك قبل أن تعرف كم قيمة ضاعت"
            },
            a: 1
          },
          {
            s: {
              en: "Reads the text <code>'415'</code> as the number 415",
              ar: "تقرأ النص <code>'415'</code> على أنه العدد 415"
            },
            a: 2
          },
          {
            s: {
              en: "Reads <code>'1,200'</code> as 1200 without any help",
              ar: "تقرأ <code>'1,200'</code> على أنها 1200 دون أي مساعدة"
            },
            a: 3
          },
          {
            s: {
              en: "Turns a missing <code>None</code> in the text column into NaN",
              ar: "تحوّل <code>None</code> المفقودة في عمود النصوص إلى NaN"
            },
            a: 2
          },
          {
            s: {
              en: "The better choice for a column that should be clean, because a surprise must stop the run",
              ar: "الخيار الأفضل لعمود يُفترض أن يكون نظيفًا، لأن المفاجأة يجب أن توقف التشغيل"
            },
            a: 0
          }
        ],
        hint: {
          en: "Think about what is left of a bad value after each call, and whether either call can repair a thousands separator.",
          ar: "فكّر فيما يبقى من القيمة الرديئة بعد كل استدعاء، وهل تستطيع إحداهما إصلاح فاصل الآلاف."
        },
        explain: {
          en: "<code>astype(float)</code> is strict: it raises at the first text that is not a number, naming it, so nothing is lost silently; that is what you want when the column should be clean. <code>to_numeric(errors=\"coerce\")</code> is forgiving: every failure becomes NaN, the run finishes, and the damage stays invisible until you count it with <code>out.isna() &amp; raw.notna()</code>. Both turn <code>'415'</code> into the number 415 and both map a missing value to NaN. Neither understands <code>'1,200'</code>: the strict call stops on it, the forgiving one swallows it as NaN, and the repair (strip the separator, or read with <code>thousands=</code>) is always yours. Neither rounds, guesses or repairs anything else.",
          ar: "<code>astype(float)</code> صارمة: ترفع خطأً عند أول نص ليس عددًا وتسمّيه، فلا يضيع شيء بصمت؛ وهذا ما تريده حين يُفترض أن يكون العمود نظيفًا. أما <code>to_numeric(errors=\"coerce\")</code> فمتسامحة: كل فشل يصير NaN وينتهي التشغيل ويبقى الضرر خفيًّا حتى تعدّه بـ<code>out.isna() &amp; raw.notna()</code>. وكلتاهما تحوّل <code>'415'</code> إلى العدد 415 وكلتاهما تحوّل القيمة المفقودة إلى NaN. ولا تفهم إحداهما <code>'1,200'</code>: الصارمة تتوقف عندها والمتسامحة تبتلعها NaN، والإصلاح (إزالة الفاصل أو القراءة بـ<code>thousands=</code>) عليك دائمًا. ولا تقرّب إحداهما الأعداد ولا تخمّن ولا تصلح غير ما سبق."
        }
      },
      {
        id: "t1bx10",
        type: "compare",
        level: "medium",
        topics: [
          "t1-broadcasting",
          "t1-ndarray-basics"
        ],
        q: {
          en: "<code>X</code> holds three features of the first four schools of the school sheet: students, classroom temperature and repair weeks (shape (4, 3)). Both versions centre the features (subtract a mean) before a model sees them, and print whether every column now has mean 0. A prints <code>False</code>, B prints <code>True</code>, and neither raises an error. Which statement is correct?",
          ar: "يحمل <code>X</code> ثلاث سمات لأول أربع مدارس في جدول المدارس: الطلاب وحرارة الصف وأسابيع الإصلاح (الشكل (4, 3)). تُمركز النسختان السمات (تطرحان متوسطًا) قبل أن يراها نموذج، وتطبعان هل صار متوسط كل عمود 0. تطبع أ <code>False</code> وتطبع ب <code>True</code> ولا ترفع أيٌّ منهما خطأً. أيّ العبارات صحيحة؟"
        },
        codeA: code(
          "X = schools.loc[:3, [\"students\", \"classroom_temp_c\", \"repair_weeks\"]].to_numpy()",
          "centred = X - X.mean()",
          "print(np.allclose(centred.mean(axis=0), 0))"
        ),
        codeB: code(
          "X = schools.loc[:3, [\"students\", \"classroom_temp_c\", \"repair_weeks\"]].to_numpy()",
          "centred = X - X.mean(axis=0)",
          "print(np.allclose(centred.mean(axis=0), 0))"
        ),
        options: [
          {
            en: "A is better: one mean for the whole matrix is a single number, so every column is shifted by the same amount and the columns keep their relation to each other.",
            ar: "أ أفضل: متوسط واحد للمصفوفة كلها رقم واحد، فيُزاح كل عمود بالمقدار نفسه وتبقى الأعمدة محتفظة بعلاقتها بعضها ببعض."
          },
          {
            en: "They are equivalent: subtraction broadcasts in the same way whatever is subtracted, so both centre every column, and the <code>False</code> of A is only a rounding effect.",
            ar: "هما متكافئتان: يُبَثّ الطرح بالطريقة نفسها أيًّا كان المطروح، فتُمركز كلتاهما كل عمود، وليست <code>False</code> في أ إلا أثر تقريب."
          },
          {
            en: "A should raise a <code>ValueError</code>, because a single number and a (4, 3) array cannot be broadcast together; that is why B has to pass <code>axis=0</code>.",
            ar: "كان على أ أن ترفع <code>ValueError</code> لأن رقمًا واحدًا ومصفوفة (4, 3) لا يُبثّان معًا؛ ولهذا تحتاج ب إلى تمرير <code>axis=0</code>."
          },
          {
            en: "B is better: <code>X.mean(axis=0)</code> has one mean per column (shape (3,)) and is reused on every row, so each column is centred on its own mean. A subtracts the mean of all twelve values (165.5) from every cell, so the students column stays near 300 and the temperature turns negative, without an error, because a single number always broadcasts.",
            ar: "ب أفضل: يحمل <code>X.mean(axis=0)</code> متوسطًا لكل عمود (الشكل (3,)) ويُعاد استعماله على كل صف، فيتمركز كل عمود على متوسطه هو. أما أ فتطرح متوسط القيم الاثنتي عشرة كلها (165.5) من كل خلية، فيبقى عمود الطلاب قرب 300 وتصير الحرارة سالبة، دون خطأ، لأن الرقم الواحد يُبَثّ دائمًا."
          }
        ],
        answer: 3,
        hint: {
          en: "Compare the shapes of <code>X.mean()</code> and <code>X.mean(axis=0)</code>, and ask which numbers each version subtracts from the temperature column.",
          ar: "قارن بين شكلَي <code>X.mean()</code> و<code>X.mean(axis=0)</code>، واسأل أيّ الأرقام تطرحه كل نسخة من عمود الحرارة."
        },
        explain: {
          en: "<code>X.mean()</code> is one number, the mean of all twelve cells. It broadcasts to every cell, so the code runs, but it centres nothing: the column means after the subtraction are about 300.8, -151.8 and -149.0, and <code>allclose</code> says False. <code>X.mean(axis=0)</code> has shape (3,), one mean per column; lined up from the right it meets the three columns and is reused on each row, so every column is centred on its own mean. The two options that excuse A are wrong: a scalar never fails to broadcast, and the False is not rounding. Centring and scaling are column operations (and, as in Lesson 2, only meaningful for interval and ratio columns), so the <code>axis</code> is part of the meaning.",
          ar: "<code>X.mean()</code> رقم واحد هو متوسط الخلايا الاثنتي عشرة. يُبَثّ إلى كل خلية فيعمل الكود، لكنه لا يُمركز شيئًا: فمتوسطات الأعمدة بعد الطرح نحو 300.8 و-151.8 و-149.0، وتقول <code>allclose</code> إنها False. أما <code>X.mean(axis=0)</code> فشكله (3,) أي متوسط لكل عمود؛ وإذا صُفَّ من اليمين قابل الأعمدة الثلاثة وأُعيد استعماله على كل صف، فيتمركز كل عمود على متوسطه. والخياران اللذان يبرّران أ خاطئان: فالرقم الواحد لا يفشل في البثّ أبدًا، وليست False أثر تقريب. والتمركز والتحجيم عمليتان على الأعمدة (ولا معنى لهما، كما في الدرس 2، إلا للأعمدة الفترية والنسبية)، فـ<code>axis</code> جزء من المعنى."
        }
      },
      {
        id: "t1bx11",
        type: "ordercode",
        level: "medium",
        topics: [
          "t1-dtype-memory",
          "t1-category-ordered",
          "t1-inspect-dtypes"
        ],
        q: {
          en: "Put the statements in an order that measures what turning three text columns into categories saves in memory: the table must be measured before it is changed, and again after.",
          ar: "رتّب الأسطر ترتيبًا يقيس ما يوفّره تحويل ثلاثة أعمدة نصية إلى فئوية في الذاكرة: يجب أن يُقاس الجدول قبل أن يتغير، ثم مرة أخرى بعده."
        },
        items: [
          {
            code: "import pandas as pd"
          },
          {
            code: "df = pd.read_csv(\"rental_listings.csv\")"
          },
          {
            code: "before = df.memory_usage(deep=True).sum()"
          },
          {
            code: "df = df.astype({\"city\": \"category\", \"governorate\": \"category\", \"furnished\": \"category\"})"
          },
          {
            code: "after = df.memory_usage(deep=True).sum()"
          },
          {
            code: "print(before, \"->\", after, \"bytes\")"
          }
        ],
        answer: [0, 1, 2, 3, 4, 5],
        hint: {
          en: "Find the statement that replaces <code>df</code>. What does each measurement describe: the table as it was, or the table as it has become?",
          ar: "اعثر على السطر الذي يستبدل <code>df</code>. ماذا يصف كل قياس: الجدول كما كان أم الجدول كما صار؟"
        },
        explain: {
          en: "<code>df</code> is read first, and <code>before</code> must be taken while it still holds the text columns: once the <code>astype</code> line has replaced <code>df</code>, the original table is gone and the 'before' would describe the new one. <code>after</code> can only be measured after the replacement, and the print needs both. The result is <code>21876 -&gt; 13266 bytes</code> (about 39% less), measured with <code>deep=True</code>, which counts the text inside the object columns; without it the figure would be a small lower bound. Five labels repeated over 60 rows are the case where <code>category</code> pays (Lesson 3). The order matters because <code>df = df.astype(...)</code> overwrites its own input.",
          ar: "تُقرأ <code>df</code> أولًا، ويجب أخذ <code>before</code> وهي ما تزال تحمل الأعمدة النصية: فبعد أن يستبدل سطر <code>astype</code> الجدول لا يبقى الأصلي ويصف «قبل» الجدول الجديد. ولا يمكن قياس <code>after</code> إلا بعد الاستبدال، وتحتاج الطباعة إلى الاثنين. والناتج <code>21876 -&gt; 13266 bytes</code> (أقل بنحو 39%) مقيسًا بـ<code>deep=True</code> التي تعدّ النص داخل أعمدة object؛ ومن دونها يكون الرقم حدًّا أدنى صغيرًا. وخمس تسميات تتكرر في 60 صفًّا هي الحالة التي يربح فيها <code>category</code> (الدرس 3). والترتيب مهم لأن <code>df = df.astype(...)</code> تكتب فوق مدخلها."
        }
      },
      {
        id: "t1bx12",
        type: "fill",
        level: "easy",
        topics: [
          "t1-encoding-basics",
          "t1-csv-delimiter"
        ],
        q: {
          en: "The semicolon file starts with a byte order mark. Fill in the two blanks so that the <code>csv</code> module reads it correctly and the program prints <code>1001 30</code>.",
          ar: "يبدأ الملف المفصول بفاصلة منقوطة بعلامة ترتيب بايتات (BOM). املأ الفراغين لتقرأه وحدة <code>csv</code> قراءة صحيحة ويطبع البرنامج <code>1001 30</code>."
        },
        code: code(
          "import csv",
          "",
          "with open(\"rental_listings_ar_semicolon.csv\", encoding=\"____1____\", newline=\"\") as f:",
          "    rows = list(csv.DictReader(f, delimiter=\"____2____\"))",
          "print(rows[0][\"listing_id\"], len(rows))      # 1001 30"
        ),
        blanks: [
          {
            accept: [
              "utf-8-sig",
              "utf_8_sig",
              "UTF-8-SIG",
              "UTF-8-sig"
            ],
            label: {
              en: "encoding",
              ar: "الترميز"
            }
          },
          {
            accept: [
              ";"
            ],
            label: {
              en: "delimiter",
              ar: "الفاصل"
            }
          }
        ],
        hint: {
          en: "Which codec name means 'UTF-8, and drop a BOM if there is one'? And which character separates the fields in this file?",
          ar: "أي اسم ترميز يعني «UTF-8 مع حذف BOM إن وُجدت»؟ وأي حرف يفصل بين الحقول في هذا الملف؟"
        },
        explain: {
          en: "pandas strips a leading BOM by itself, but the <code>csv</code> module does not: with plain <code>utf-8</code> the first header becomes <code>'\\ufefflisting_id'</code> (eleven characters, one of them invisible), and <code>rows[0][\"listing_id\"]</code> raises a <code>KeyError</code> that looks impossible. <code>utf-8-sig</code> drops the mark when it is there and behaves as plain UTF-8 when it is not, so it is the safe default. The delimiter is the semicolon: with the default comma every line is one long field, and the key <code>listing_id</code> does not exist either.",
          ar: "تحذف pandas علامة BOM الأولى من تلقاء نفسها، أما وحدة <code>csv</code> فلا: ومع <code>utf-8</code> العادي يصير أول عنوان <code>'\\ufefflisting_id'</code> (أحد عشر حرفًا أحدها غير مرئي)، ويرفع <code>rows[0][\"listing_id\"]</code> الخطأ <code>KeyError</code> الذي يبدو مستحيلًا. أما <code>utf-8-sig</code> فيُسقط العلامة إن وُجدت ويعمل كـUTF-8 العادي إن لم توجد، فهو الافتراضي الآمن. والفاصل هو الفاصلة المنقوطة: ومع الفاصلة الافتراضية يصير كل سطر حقلًا طويلًا واحدًا ولا يوجد المفتاح <code>listing_id</code> أيضًا."
        }
      },
      {
        id: "t1bx13",
        type: "error",
        level: "hard",
        topics: [
          "t1-na-values",
          "t1-csv-reader-recipe"
        ],
        q: {
          en: "The program should report how many flats answer <code>None</code> for the generator (they have none; the answer is 2) and how many left the cell empty (1). It prints 0 and 3, and nothing is raised. Click the line responsible.",
          ar: "يُفترض أن يذكر البرنامج كم شقة أجابت <code>None</code> عن المولّد (لا مولّد فيها؛ والجواب 2) وكم تركت الخلية فارغة (1). لكنه يطبع 0 و3 ولا شيء يُرفع. انقر السطر المسؤول."
        },
        code: code(
          "import io",
          "import pandas as pd",
          "",
          "text = (\"listing_id,generator\\n\"",
          "        \"2001,Own\\n\"",
          "        \"2002,None\\n\"",
          "        \"2003,Shared\\n\"",
          "        \"2004,None\\n\"",
          "        \"2005,\\n\")",
          "df = pd.read_csv(io.StringIO(text))",
          "none_answers = (df[\"generator\"] == \"None\").sum()",
          "no_answer = df[\"generator\"].isna().sum()",
          "print(none_answers, \"say None;\", no_answer, \"left it empty\")"
        ),
        answer: 10,
        solution: {
          code: "df = pd.read_csv(io.StringIO(text), keep_default_na=False, na_values=[\"\"])",
          en: "Switch the default missing markers off and name the one that is a real gap: only the empty cell becomes NaN, and <code>None</code> stays an answer.",
          ar: "عطِّل العلامات الافتراضية للقيم المفقودة وسمِّ العلامة التي هي فجوة حقيقية: فتصير الخلية الفارغة وحدها NaN وتبقى <code>None</code> إجابة."
        },
        hint: {
          en: "A word can be a fact or a gap. Which strings does <code>read_csv</code> already treat as missing before you ask it to?",
          ar: "الكلمة قد تكون حقيقة وقد تكون فجوة. أيّ السلاسل تعدّها <code>read_csv</code> مفقودة أصلًا قبل أن تطلب ذلك؟"
        },
        explain: {
          en: "<code>None</code> is on pandas' default list of missing-value strings (with <code>NA</code>, <code>n/a</code>, <code>null</code>, <code>NaN</code> and the empty string), so both <code>None</code> cells become NaN: the comparison finds 0 and <code>isna()</code> finds 3. A fact ('this flat has no generator') and a gap ('nobody answered') are merged into one value, and no later line can separate them again. With <code>keep_default_na=False, na_values=[\"\"]</code> only the empty cell is missing and the program prints 2 and 1. Rule: every NaN should mean exactly one thing; look at the default list before you trust a count.",
          ar: "تقع <code>None</code> ضمن قائمة pandas الافتراضية لسلاسل القيم المفقودة (مع <code>NA</code> و<code>n/a</code> و<code>null</code> و<code>NaN</code> والسلسلة الفارغة)، فتصير خليتا <code>None</code> كلتاهما NaN: فتجد المقارنة 0 وتجد <code>isna()</code> 3. فاندمجت حقيقة («لا مولّد في هذه الشقة») وفجوة («لم يجب أحد») في قيمة واحدة، ولا يستطيع سطر لاحق أن يفصلهما من جديد. ومع <code>keep_default_na=False, na_values=[\"\"]</code> تكون الخلية الفارغة وحدها مفقودة ويطبع البرنامج 2 و1. القاعدة: كل NaN يجب أن تعني شيئًا واحدًا بالضبط؛ فانظر في القائمة الافتراضية قبل أن تثق بعدٍّ."
        }
      },
      {
        id: "t1bx14",
        type: "order",
        level: "easy",
        topics: [
          "t1-csv-delimiter",
          "t1-encoding-diagnose",
          "t1-csv-decimal-thousands"
        ],
        q: {
          en: "A partner's export loads without an error but the table looks wrong. The diagnostic of Lesson 4 asks its questions in a fixed order and fixes one thing at a time, because fixing one layer often exposes the next. Put the checks in that order.",
          ar: "يُحمَّل تصدير الشريك دون خطأ لكن الجدول يبدو خاطئًا. يطرح تشخيص الدرس 4 أسئلته بترتيب ثابت ويصلح شيئًا واحدًا في كل مرة، لأن إصلاح طبقة يكشف غالبًا التي بعدها. رتّب الفحوص بذلك الترتيب."
        },
        items: [
          {
            en: "Look at the shape and the index: one column, or data sitting in the index? Then the delimiter is wrong: set <code>sep=</code>.",
            ar: "انظر إلى الشكل والفهرس: عمود واحد أم بيانات في الفهرس؟ فالفاصل خاطئ إذن: اضبط <code>sep=</code>."
          },
          {
            en: "Read the Arabic text: garbled letters, or a <code>UnicodeDecodeError</code>? Then the encoding is wrong: <code>utf-8-sig</code> or <code>cp1256</code>.",
            ar: "اقرأ النص العربي: حروف مشوّهة أم <code>UnicodeDecodeError</code>؟ فالترميز خاطئ إذن: <code>utf-8-sig</code> أو <code>cp1256</code>."
          },
          {
            en: "Look at the number columns: dtype <code>object</code> with values such as '119,2', '1,250' or '-'? Then set <code>decimal=</code>, <code>thousands=</code> or <code>na_values=</code>.",
            ar: "انظر إلى أعمدة الأرقام: النوع <code>object</code> بقيم مثل '119,2' أو '1,250' أو '-'؟ فاضبط <code>decimal=</code> أو <code>thousands=</code> أو <code>na_values=</code>."
          },
          {
            en: "Look at the dates: still text, or a month off? Then use <code>parse_dates=</code> with <code>dayfirst=</code>, or convert with an exact <code>format=</code>.",
            ar: "انظر إلى التواريخ: ما تزال نصًّا أم شهرها خاطئ؟ فاستعمل <code>parse_dates=</code> مع <code>dayfirst=</code>، أو حوّل بصيغة <code>format=</code> دقيقة."
          },
          {
            en: "Check the table you ended up with: shape, dtypes and value ranges.",
            ar: "افحص الجدول الذي انتهيت إليه: الشكل والأنواع ومدى القيم."
          }
        ],
        answer: [0, 1, 2, 3, 4],
        hint: {
          en: "Ask which problem hides the others: what must be right before you can even see a column, and before you can trust a letter or a number?",
          ar: "اسأل أيّ المشكلات تُخفي غيرها: ما الذي يجب أن يكون صحيحًا قبل أن ترى عمودًا أصلًا، وقبل أن تثق بحرف أو برقم؟"
        },
        explain: {
          en: "The order follows what hides what. With the wrong delimiter there are no columns to inspect (the whole header is one name and data sits in the index), so the delimiter comes first. Once the fields are split, the letters must be right before any value can be trusted: an encoding error changes the text itself. Numbers stored as text are visible only in split, correctly decoded columns, and the notation (<code>decimal=</code>, <code>thousands=</code>, the markers) is a fact about the file. Dates come after numbers in the lesson's flowchart, and the last look at shape, dtypes and ranges proves that the sequence of fixes produced the table you meant. Fix one thing, look again: the semicolon file needs <code>sep</code> and then <code>decimal</code>, and only the second failure appears after the first fix.",
          ar: "يتبع الترتيب ما تُخفيه كل مشكلة عن غيرها. فمع الفاصل الخاطئ لا توجد أعمدة تُفحص (العنوان كله اسم واحد والبيانات في الفهرس)، ولذلك يأتي الفاصل أولًا. وبعد أن تنقسم الحقول يجب أن تصحّ الحروف قبل أن يوثق بأي قيمة: فخطأ الترميز يغيّر النص نفسه. والأرقام المخزَّنة نصًّا لا تظهر إلا في أعمدة مقسَّمة ومفكوكة الترميز صحيحًا، وصيغة الكتابة (<code>decimal=</code> و<code>thousands=</code> والعلامات) حقيقة عن الملف. وتأتي التواريخ بعد الأرقام في مخطط الدرس، وآخر نظرة على الشكل والأنواع والمدى تثبت أن سلسلة الإصلاحات أنتجت الجدول الذي أردته. أصلح شيئًا واحدًا ثم انظر من جديد: يحتاج الملف المفصول بفاصلة منقوطة إلى <code>sep</code> ثم إلى <code>decimal</code>، ولا يظهر الفشل الثاني إلا بعد الإصلاح الأول."
        }
      },
      {
        id: "t1bx15",
        type: "write",
        level: "hard",
        lang: "python",
        topics: [
          "t1-csv-reader-recipe",
          "t1-date-parsing-evolve",
          "t1-coerce-and-count"
        ],
        q: {
          en: "Next month's export is the text below: semicolons, a decimal comma, <code>-</code> for a missing rent, day/month/year dates and two cells in <code>listed_on</code> that are not dates. Write code that (1) reads it so that <code>listing_id</code> keeps its zeros and <code>monthly_rent</code> and <code>area_m2</code> arrive as numbers, (2) converts <code>listed_on</code> with its exact format and lets unreadable dates become missing, and (3) prints how many non-blank dates failed and which ones.",
          ar: "تصدير الشهر القادم هو النص أدناه: فواصل منقوطة وفاصلة عشرية و<code>-</code> للإيجار المفقود وتواريخ يوم/شهر/سنة وخليتان في <code>listed_on</code> ليستا تاريخين. اكتب كودًا (1) يقرؤه بحيث يحتفظ <code>listing_id</code> بأصفاره ويصل <code>monthly_rent</code> و<code>area_m2</code> أعدادًا، و(2) يحوّل <code>listed_on</code> بصيغته الدقيقة ويدع التواريخ غير المقروءة تصير مفقودة، و(3) يطبع كم تاريخًا غير فارغ فشل وأيّها."
        },
        starter: code(
          "import io",
          "import pandas as pd",
          "",
          "export = (\"listing_id;monthly_rent;area_m2;listed_on\\r\\n\"",
          "          \"0412;415;119,2;05/04/2024\\r\\n\"",
          "          \"0413;-;115,7;13/04/2024\\r\\n\"",
          "          \"0414;590;126,7;31/04/2024\\r\\n\"",
          "          \"0415;315;109,2;not recorded\\r\\n\"",
          "          \"0416;445;90,8;\\r\\n\"",
          "          \"0417;380;101,5;22/04/2024\\r\\n\")",
          "",
          "# your code here"
        ),
        lines: 14,
        checks: [
          {
            re: "read_csv\\s*\\((?=.*sep\\s*=\\s*[\"'];[\"'])(?=.*decimal\\s*=\\s*[\"'],[\"'])",
            label: {
              en: "Read with <code>sep=\";\"</code> and <code>decimal=\",\"</code>",
              ar: "اقرأ بـ<code>sep=\";\"</code> و<code>decimal=\",\"</code>"
            }
          },
          {
            re: "dtype\\s*=\\s*\\{[^}]*[\"']listing_id[\"']\\s*:\\s*(str\\b|[\"'](string|str)[\"'])",
            label: {
              en: "Keep <code>listing_id</code> as text with <code>dtype</code>",
              ar: "أبقِ <code>listing_id</code> نصًّا بـ<code>dtype</code>"
            }
          },
          {
            re: "na_values\\s*=\\s*\\[?\\s*[\"']-[\"']",
            label: {
              en: "Name the missing marker: <code>na_values=[\"-\"]</code>",
              ar: "سمِّ علامة المفقود: <code>na_values=[\"-\"]</code>"
            }
          },
          {
            re: "to_datetime\\s*\\((?=.*format\\s*=\\s*[\"']%d/%m/%Y[\"'])(?=.*errors\\s*=\\s*[\"']coerce[\"'])",
            label: {
              en: "Convert with <code>format=\"%d/%m/%Y\"</code> and <code>errors=\"coerce\"</code>",
              ar: "حوّل بـ<code>format=\"%d/%m/%Y\"</code> و<code>errors=\"coerce\"</code>"
            }
          },
          {
            re: "(isna\\(\\).*notna\\(\\)|notna\\(\\).*isna\\(\\))",
            label: {
              en: "Count failures as 'missing now and present before' (<code>isna()</code> together with <code>notna()</code>)",
              ar: "عُدّ الفشل بوصفه «مفقودًا الآن وموجودًا قبل» (<code>isna()</code> مع <code>notna()</code>)"
            }
          }
        ],
        forbid: [
          {
            re: "parse_dates",
            label: {
              en: "<code>parse_dates=</code> on this column: when one value fails it silently leaves the whole column as text, and nothing is counted",
              ar: "<code>parse_dates=</code> على هذا العمود: إذا فشلت قيمة واحدة تركت العمود كله نصًّا بصمت ولا يُعدّ شيء"
            }
          }
        ],
        solution: {
          code: code(
            "df = pd.read_csv(io.StringIO(export), sep=\";\", decimal=\",\",",
            "                 dtype={\"listing_id\": \"string\"}, na_values=[\"-\"])",
            "raw = df[\"listed_on\"]",
            "dates = pd.to_datetime(raw, format=\"%d/%m/%Y\", errors=\"coerce\")",
            "failed = dates.isna() & raw.notna()",
            "print(failed.sum(), \"of\", len(raw), \"dates failed:\", raw[failed].tolist())"
          ),
          out: "2 of 6 dates failed: ['31/04/2024', 'not recorded']",
          en: "The facts about the file go into the reader: <code>sep</code>, <code>decimal</code>, an ID kept as text, <code>-</code> as a missing marker, so both number columns arrive as float64. The dates are converted afterwards with an exact format and <code>errors=\"coerce\"</code>, and the mask <code>dates.isna() &amp; raw.notna()</code> separates what failed (31/04/2024 does not exist; 'not recorded' is not a date) from the genuinely empty cell, which is not counted.",
          ar: "تدخل حقائق الملف في القارئ: <code>sep</code> و<code>decimal</code> ومعرّف يبقى نصًّا و<code>-</code> علامةً للمفقود، فيصل عمودا الأعداد float64. وتُحوَّل التواريخ بعد ذلك بصيغة دقيقة و<code>errors=\"coerce\"</code>، ويفصل القناع <code>dates.isna() &amp; raw.notna()</code> ما فشل (31/04/2024 غير موجود و«not recorded» ليس تاريخًا) عن الخلية الفارغة فعلًا التي لا تُعدّ."
        },
        hint: {
          en: "Split the work in two: what you can tell the reader once, at read time, and what has to be converted afterwards and counted.",
          ar: "قسّم العمل قسمين: ما تستطيع أن تقوله للقارئ مرة واحدة عند القراءة، وما يجب أن يُحوَّل بعد ذلك ويُعدّ."
        },
        explain: {
          en: "Lessons 3 and 4 work as one recipe. At read time you state everything you know about the file: <code>sep=\";\"</code> (otherwise one column), <code>decimal=\",\"</code> (otherwise the area is text), <code>dtype</code> for the ID (otherwise 0412 becomes 412) and <code>na_values=[\"-\"]</code> (otherwise the rent is text). The dates are the part you cannot fix by declaration, so you convert them with an exact format and <code>errors=\"coerce\"</code> and then count: <code>dates.isna() &amp; raw.notna()</code> gives 2 failures (<code>31/04/2024</code> and <code>not recorded</code>) and ignores the empty cell, which was already missing. <code>parse_dates</code> would have left the whole column as text without saying a word.",
          ar: "الدرسان 3 و4 وصفة واحدة. عند القراءة تقول كل ما تعرفه عن الملف: <code>sep=\";\"</code> (وإلا عمود واحد) و<code>decimal=\",\"</code> (وإلا تصير المساحة نصًّا) و<code>dtype</code> للمعرّف (وإلا يصير 0412 هو 412) و<code>na_values=[\"-\"]</code> (وإلا يصير الإيجار نصًّا). والتواريخ هي الجزء الذي لا يُصلحه الإعلان، فتحوّلها بصيغة دقيقة و<code>errors=\"coerce\"</code> ثم تعدّ: يعطي <code>dates.isna() &amp; raw.notna()</code> فشلين (<code>31/04/2024</code> و<code>not recorded</code>) ويتجاهل الخلية الفارغة التي كانت مفقودة أصلًا. أما <code>parse_dates</code> فكانت ستترك العمود كله نصًّا دون كلمة."
        }
      },
      {
        id: "t1bx16",
        type: "compare",
        level: "hard",
        topics: [
          "t1-read-csv-layout",
          "t1-excel-title-rows"
        ],
        q: {
          en: "<code>text</code> holds a CSV with two title lines, an empty line and then the table (header <code>listing_id,city</code> and two listings). Both versions want the table without the title block. A prints <code>(1, 2) ['1001', 'Gaza']</code>; B prints <code>(2, 2) ['listing_id', 'city']</code>; neither raises an error. Which statement is correct?",
          ar: "يحمل المتغير <code>text</code> نصّ CSV فيه سطرا عنوان وسطر فارغ ثم الجدول (عناوينه <code>listing_id,city</code> وفيه إعلانان). تريد النسختان الجدول دون كتلة العنوان. تطبع أ <code>(1, 2) ['1001', 'Gaza']</code> وتطبع ب <code>(2, 2) ['listing_id', 'city']</code> ولا ترفع أيٌّ منهما خطأً. أيّ العبارات صحيحة؟"
        },
        codeA: code(
          "text = (\"Rental export\\n\"",
          "          \"exported 2026-05-10\\n\"",
          "          \"\\n\"",
          "          \"listing_id,city\\n\"",
          "          \"1001,Gaza\\n\"",
          "          \"1002,Rafah\\n\")",
          "df = pd.read_csv(io.StringIO(text), header=3)",
          "print(df.shape, df.columns.tolist())"
        ),
        codeB: code(
          "text = (\"Rental export\\n\"",
          "          \"exported 2026-05-10\\n\"",
          "          \"\\n\"",
          "          \"listing_id,city\\n\"",
          "          \"1001,Gaza\\n\"",
          "          \"1002,Rafah\\n\")",
          "df = pd.read_csv(io.StringIO(text), skiprows=3)",
          "print(df.shape, df.columns.tolist())"
        ),
        options: [
          {
            en: "They are equivalent: both skip the first three lines, and the different output of A comes from the data, not from the argument.",
            ar: "هما متكافئتان: كلتاهما تتخطى الأسطر الثلاثة الأولى، وسبب اختلاف ناتج أ هو البيانات لا الوسيط."
          },
          {
            en: "A is better: <code>header=3</code> names the row that holds the column names, which is exactly what we mean, while <code>skiprows</code> merely deletes lines and cannot know where the header is.",
            ar: "أ أفضل: يسمّي <code>header=3</code> الصف الذي يحمل أسماء الأعمدة وهذا ما نعنيه تمامًا، أما <code>skiprows</code> فتحذف أسطرًا فحسب ولا تعرف أين العناوين."
          },
          {
            en: "B is better here: <code>skiprows=3</code> skips three physical lines, the empty one included, so the header is the fourth line. <code>header=3</code> counts rows after the empty line has been dropped, so row 3 is the first listing and it is eaten as the header, which leaves one listing and the wrong column names.",
            ar: "ب أفضل هنا: تتخطى <code>skiprows=3</code> ثلاثة أسطر مادية بما فيها الفارغ، فيكون السطر الرابع هو العناوين. أما <code>header=3</code> فتعدّ الصفوف بعد حذف السطر الفارغ، فيكون الصف 3 هو أول إعلان ويُؤكل بوصفه عناوين، فيبقى إعلان واحد وأسماء أعمدة خاطئة."
          },
          {
            en: "B is better only because <code>skiprows</code> is faster: it never parses the lines it skips, while <code>header=3</code> parses them first; apart from speed the two give the same table.",
            ar: "ب أفضل بسبب السرعة وحدها: لا تحلّل <code>skiprows</code> الأسطر التي تتخطاها بينما تحلّلها <code>header=3</code> أولًا؛ وفيما عدا السرعة يعطي الوسيطان الجدول نفسه."
          }
        ],
        answer: 2,
        hint: {
          en: "Count the lines of <code>text</code> as a person would, and then as a parser that ignores empty lines would. Which of the two arguments uses which count?",
          ar: "عُدّ أسطر <code>text</code> كما يعدّها إنسان، ثم كما يعدّها محلِّل يتجاهل الأسطر الفارغة. أيّ الوسيطين يستعمل أيّ العدّين؟"
        },
        explain: {
          en: "The lesson's tip in action: <code>skiprows=3</code> skips three physical lines, blank ones included, so the table starts at the fourth line and loads as (2, 2) with the right names. <code>header=3</code> counts rows after the parser has dropped blank lines, so the rows are: title, exported, <code>listing_id,city</code>, <code>1001,Gaza</code>. Row 3 is <code>1001,Gaza</code>: the first listing becomes the header and one record is left. No error, a plausible table and a wrong one: the same silent failure as <code>read_csv</code> on the adverts. In <code>read_excel</code> blank rows are counted, which is why <code>header=3</code> was right for the workbook. The first option and the fourth are wrong: the two arguments do not give the same table, because they count differently, and speed is not the difference.",
          ar: "نصيحة الدرس عمليًّا: تتخطى <code>skiprows=3</code> ثلاثة أسطر مادية بما فيها الفارغة، فيبدأ الجدول من السطر الرابع ويُحمَّل (2, 2) بالأسماء الصحيحة. أما <code>header=3</code> فتعدّ الصفوف بعد أن يحذف المحلِّل الأسطر الفارغة، فتكون الصفوف: العنوان وexported و<code>listing_id,city</code> و<code>1001,Gaza</code>. والصف 3 هو <code>1001,Gaza</code>: يصير أول إعلان هو العناوين ويبقى سجل واحد. لا خطأ، وجدول مقبول وخاطئ: هي الزلّة الصامتة نفسها مثل <code>read_csv</code> على الإعلانات. وفي <code>read_excel</code> تُعدّ الصفوف الفارغة، ولهذا كان <code>header=3</code> صحيحًا للدفتر. والخياران الأول والرابع خاطئان: فالوسيطان لا يعطيان الجدول نفسه لأنهما يعدّان بطريقتين مختلفتين، والسرعة ليست الفرق."
        }
      },
      {
        id: "t1bx17",
        type: "output",
        level: "hard",
        topics: [
          "t1-json-normalize",
          "t1-nan-after-flatten"
        ],
        q: {
          en: "Four school records are flattened. Record 302 carries an explicit <code>null</code> for its contacts, record 303 has no <code>contacts</code> key at all. Write exactly what the program prints (three lines).",
          ar: "تُسطَّح أربعة سجلات مدارس. يحمل السجل 302 القيمة الصريحة <code>null</code> لجهات الاتصال، ولا يملك السجل 303 المفتاح <code>contacts</code> أصلًا. اكتب بالضبط ما يطبعه البرنامج (ثلاثة أسطر)."
        },
        code: code(
          "import pandas as pd",
          "",
          "rows = [",
          "    {\"id\": 301, \"contacts\": {\"phone\": \"08-1111111\", \"email\": \"a@example.org\"}},",
          "    {\"id\": 302, \"contacts\": None},",
          "    {\"id\": 303},",
          "    {\"id\": 304, \"contacts\": {\"phone\": \"08-2222222\"}},",
          "]",
          "df = pd.json_normalize(rows, sep=\"_\")",
          "print(df.columns.tolist())",
          "print(df.shape)",
          "print(df[\"contacts_email\"].isna().sum())"
        ),
        blanks: [
          {
            accept: [
              code(
                "['id', 'contacts_phone', 'contacts_email', 'contacts']",
                "(4, 4)",
                "3"
              )
            ],
            lines: 3
          }
        ],
        hint: {
          en: "Records 301 and 304 hold objects that can be opened into columns. What can <code>json_normalize</code> do with the value of record 302, which is not an object? Count the columns as carefully as the rows.",
          ar: "السجلان 301 و304 يحملان كائنين يمكن فتحهما إلى أعمدة. ماذا تستطيع <code>json_normalize</code> أن تفعل بقيمة السجل 302 وهي ليست كائنًا؟ عُدّ الأعمدة بالعناية التي تعدّ بها الصفوف."
        },
        explain: {
          en: "Records 301 and 304 are objects, so they are opened into <code>contacts_phone</code> and <code>contacts_email</code>. Record 302's <code>None</code> is a plain value, not an object, so pandas keeps it under its own key: a stray fourth column <code>contacts</code>, all NaN, appears next to the opened ones, and the shape is <code>(4, 4)</code>, not <code>(4, 3)</code>. The three NaN in <code>contacts_email</code> have three different causes: an explicit null (302), an absent key (303) and an object without that key (304). After flattening they are the same NaN. Lesson 5: a NaN is a fact about the source, not a failed measurement, and the census of keys, taken before flattening, is the only record of why.",
          ar: "السجلان 301 و304 كائنان، فيُفتحان إلى <code>contacts_phone</code> و<code>contacts_email</code>. أما <code>None</code> في السجل 302 فقيمة بسيطة لا كائن، فتُبقيها pandas تحت مفتاحها: يظهر عمود رابع شارد اسمه <code>contacts</code> كله NaN بجانب الأعمدة المفتوحة، ويكون الشكل <code>(4, 4)</code> لا <code>(4, 3)</code>. وللقيم NaN الثلاث في <code>contacts_email</code> ثلاثة أسباب مختلفة: قيمة null صريحة (302) ومفتاح غائب (303) وكائن لا يحمل هذا المفتاح (304). وبعد التسطيح تصير NaN واحدة. الدرس 5: NaN حقيقة عن المصدر لا قياس فاشل، وإحصاء المفاتيح المأخوذ قبل التسطيح هو السجل الوحيد لسبب ذلك."
        }
      },
      {
        id: "t1bx18",
        type: "error",
        level: "hard",
        topics: [
          "t1-json-normalize",
          "t1-list-fields"
        ],
        q: {
          en: "The program should give every one of the 13 schools a facility count (three schools have no facilities, so their count is 0). It prints 10 schools with a count, and nothing is raised. Click the line responsible.",
          ar: "يُفترض أن يعطي البرنامج كل مدرسة من المدارس الثلاث عشرة عدد مرافقها (لثلاث مدارس لا مرافق فيها فعددها 0). لكنه يطبع 10 مدارس لها عدد، ولا شيء يُرفع. انقر السطر المسؤول."
        },
        code: code(
          "import json",
          "import pandas as pd",
          "",
          "with open(\"downloads/t1/schools.json\", encoding=\"utf-8\") as f:",
          "    schools = json.load(f)[\"results\"]",
          "",
          "pairs = pd.json_normalize(schools, record_path=\"facilities\", meta=[\"id\"])",
          "per_school = pairs.groupby(\"id\").size()",
          "print(len(schools), \"schools in the registry\")",
          "print(len(per_school), \"schools with a facility count\")",
          "print(per_school.sum(), \"facility entries\")"
        ),
        answer: 7,
        solution: {
          code: code(
            "df = pd.json_normalize(schools, sep=\"_\")",
            "df[\"n_facilities\"] = df[\"facilities\"].str.len()"
          ),
          en: "Flatten the schools themselves and count the list in a column: a school with an empty list keeps its row, with a count of 0.",
          ar: "سطِّح المدارس نفسها وعُدّ القائمة في عمود: فالمدرسة ذات القائمة الفارغة تُبقي صفّها بعدد 0."
        },
        hint: {
          en: "<code>record_path</code> makes one row for each item of the list. What does a school with an empty list contribute?",
          ar: "يصنع <code>record_path</code> صفًّا لكل عنصر في القائمة. ماذا تقدّم المدرسة ذات القائمة الفارغة؟"
        },
        explain: {
          en: "<code>record_path=\"facilities\"</code> turns each <em>item</em> of the list into a row (and the items are plain strings, so their column is even called <code>0</code>). A school whose list is empty has no item, so it contributes no row at all and silently vanishes: 19 facility entries for 10 schools, while the registry has 13. Nothing is raised, and every count that is printed looks reasonable. The tool answers 'which facilities exist' and cannot answer 'how many does each school have' for the schools that have none. Flatten the schools (one row each) and use <code>str.len()</code> for the count: it gives 0 for an empty list. <code>explode</code> would keep the three schools as NaN rows (22 rows), but it changes what a row means.",
          ar: "يحوّل <code>record_path=\"facilities\"</code> كل <em>عنصر</em> في القائمة إلى صف (والعناصر نصوص بسيطة فيسمّى عمودها <code>0</code> أيضًا). والمدرسة التي قائمتها فارغة بلا عناصر، فلا تقدّم صفًّا واحدًا وتختفي بصمت: 19 مدخل مرفق لعشر مدارس بينما في السجل 13. ولا يُرفع شيء، وكل عدد مطبوع يبدو معقولًا. تجيب الأداة عن «ما المرافق الموجودة» ولا تجيب عن «كم مرفقًا لكل مدرسة» للمدارس التي لا مرافق فيها. سطِّح المدارس (صف لكل منها) واستعمل <code>str.len()</code> للعدّ: فهي تعطي 0 للقائمة الفارغة. وكان <code>explode</code> سيُبقي المدارس الثلاث صفوفًا NaN (22 صفًّا)، لكنه يغيّر معنى الصف."
        }
      },
      {
        id: "t1bx19",
        type: "write",
        level: "medium",
        lang: "python",
        topics: [
          "t1-list-fields",
          "t1-json-normalize"
        ],
        q: {
          en: "<code>schools</code> is the list of the 13 records of <code>schools.json</code>. Write code that builds <code>df = pd.json_normalize(schools, sep=\"_\")</code>, adds a column <code>n_facilities</code> (how many facilities each school has, 0 for a school with none) and one 0/1 column per facility type named <code>has_lab</code>, <code>has_library</code>, … (spaces become underscores), without changing the number of rows. Then print the number of schools with a lab and the shape of <code>df</code>.",
          ar: "المتغير <code>schools</code> قائمة السجلات الثلاثة عشر في <code>schools.json</code>. اكتب كودًا يبني <code>df = pd.json_normalize(schools, sep=\"_\")</code> ويضيف عمودًا <code>n_facilities</code> (كم مرفقًا لكل مدرسة، و0 لمدرسة لا مرافق فيها) وعمودًا من 0/1 لكل نوع مرفق باسم <code>has_lab</code> و<code>has_library</code> وهكذا (تصير المسافات شرطات سفلية)، دون أن يتغير عدد الصفوف. ثم اطبع عدد المدارس التي فيها مختبر وشكل <code>df</code>."
        },
        starter: code(
          "import json",
          "import pandas as pd",
          "",
          "with open(\"downloads/t1/schools.json\", encoding=\"utf-8\") as f:",
          "    schools = json.load(f)[\"results\"]",
          "",
          "# your code here"
        ),
        lines: 10,
        checks: [
          {
            re: "json_normalize\\s*\\(",
            label: {
              en: "Flatten with <code>pd.json_normalize(...)</code>",
              ar: "سطِّح بـ<code>pd.json_normalize(...)</code>"
            }
          },
          {
            re: "(\\.str\\.len\\s*\\(\\s*\\)|\\.apply\\s*\\(\\s*len\\s*\\)|\\.map\\s*\\(\\s*len\\s*\\))",
            label: {
              en: "Count the items of the list with <code>.str.len()</code>",
              ar: "عُدّ عناصر القائمة بـ<code>.str.len()</code>"
            }
          },
          {
            re: "(?=.*get_dummies\\s*\\()(?=.*has_)",
            label: {
              en: "Spread the list into 0/1 columns (<code>str.get_dummies</code>) named <code>has_...</code>",
              ar: "وزّع القائمة على أعمدة 0/1 (<code>str.get_dummies</code>) بأسماء <code>has_...</code>"
            }
          },
          {
            re: "print\\s*\\(.*\\.shape",
            label: {
              en: "Print the shape of <code>df</code>",
              ar: "اطبع شكل <code>df</code>"
            }
          }
        ],
        forbid: [
          {
            re: "explode\\s*\\(",
            label: {
              en: "<code>explode()</code>: it changes the number of rows and what a row means, and inflates every sum",
              ar: "<code>explode()</code>: تغيّر عدد الصفوف ومعنى الصف وتنفخ كل مجموع"
            }
          }
        ],
        solution: {
          code: code(
            "df = pd.json_normalize(schools, sep=\"_\")",
            "df[\"n_facilities\"] = df[\"facilities\"].str.len()",
            "flags = df[\"facilities\"].str.join(\"|\").str.get_dummies()",
            "flags = flags.rename(columns=lambda name: \"has_\" + name.replace(\" \", \"_\"))",
            "df = df.join(flags)",
            "print(df[\"has_lab\"].sum(), df.shape)"
          ),
          out: "6 (13, 18)",
          en: "The list is turned into a string with <code>str.join(\"|\")</code> and <code>str.get_dummies()</code> makes one 0/1 column per distinct item (multi-hot), so each school keeps exactly one row: the shape is (13, 18), the 12 flattened columns plus <code>n_facilities</code> plus five <code>has_...</code> columns, and 6 schools have a lab. <code>str.len()</code> gives 0 for an empty list.",
          ar: "تُحوَّل القائمة نصًّا بـ<code>str.join(\"|\")</code> ثم تصنع <code>str.get_dummies()</code> عمودًا من 0/1 لكل عنصر مختلف (multi-hot)، فتحتفظ كل مدرسة بصف واحد بالضبط: الشكل (13, 18)، أي الأعمدة الاثنا عشر المسطَّحة زائد <code>n_facilities</code> زائد خمسة أعمدة <code>has_...</code>، وفي 6 مدارس مختبر. وتعطي <code>str.len()</code> الصفر لقائمة فارغة."
        },
        hint: {
          en: "A list cell cannot be spread by itself: turn it into one string first, with a separator, and let pandas split that string into indicator columns. Which choice keeps one row per school?",
          ar: "لا يمكن توزيع خلية قائمة بنفسها: حوّلها أولًا إلى نص واحد بفاصل، ودع pandas تقسّم هذا النص إلى أعمدة مؤشرات. أيّ خيار يُبقي صفًّا واحدًا لكل مدرسة؟"
        },
        explain: {
          en: "A list field has three honest treatments (Lesson 5): summarise it (a count), spread it (multi-hot) or explode it (one row per item). Here the question needs the first two, and both keep the unit of analysis: one row is still one school. <code>str.len()</code> counts the items, and <code>str.join(\"|\").str.get_dummies()</code> gives one 0/1 column per facility type, which a model can use; <code>rename</code> makes the names valid (<code>has_computer_room</code>). <code>explode</code> would make 22 rows, count each school once per facility and inflate every sum (5,242 pupils would become 8,435), and a random split of the rows would put the same school on both sides.",
          ar: "لحقل القائمة ثلاث معالجات أمينة (الدرس 5): تلخيصه (عدّ) أو توزيعه (multi-hot) أو تفجيره (صف لكل عنصر). والسؤال هنا يحتاج الأولى والثانية، وكلتاهما تُبقي وحدة التحليل: الصف ما يزال مدرسة. تعدّ <code>str.len()</code> العناصر، وتعطي <code>str.join(\"|\").str.get_dummies()</code> عمودًا من 0/1 لكل نوع مرفق يستطيع النموذج استعماله؛ وتجعل <code>rename</code> الأسماء صالحة (<code>has_computer_room</code>). أما <code>explode</code> فتصنع 22 صفًّا وتحسب كل مدرسة مرة لكل مرفق وتنفخ كل مجموع (فيصير 5,242 طالبًا 8,435)، وكان التقسيم العشوائي للصفوف سيضع المدرسة نفسها في الطرفين."
        }
      },
      {
        id: "t1bx20",
        type: "ordercode",
        level: "medium",
        topics: [
          "t1-nan-after-flatten",
          "t1-key-census",
          "t1-json-normalize"
        ],
        q: {
          en: "Put the statements in an order that separates the two kinds of missing e-mail in the registry: the schools that have no <code>contacts</code> object at all, and the schools that have contacts but no e-mail. The variable <code>schools</code> is reused on purpose.",
          ar: "رتّب الأسطر ترتيبًا يفصل نوعَي البريد المفقود في السجل: المدارس التي لا كائن <code>contacts</code> عندها أصلًا، والمدارس التي لها جهات اتصال دون بريد. والمتغير <code>schools</code> يُعاد استعماله عمدًا."
        },
        items: [
          {
            code: code(
              "import json",
              "import pandas as pd"
            )
          },
          {
            code: code(
              "with open(\"downloads/t1/schools.json\", encoding=\"utf-8\") as f:",
              "    schools = json.load(f)[\"results\"]"
            )
          },
          {
            code: "no_contacts = sum(\"contacts\" not in s for s in schools)"
          },
          {
            code: "schools = pd.json_normalize(schools, sep=\"_\")"
          },
          {
            code: "no_email = schools[\"contacts_email\"].isna().sum()"
          },
          {
            code: "print(no_contacts, \"schools have no contacts object;\", no_email - no_contacts, \"have contacts but no e-mail\")"
          }
        ],
        answer: [0, 1, 2, 3, 4, 5],
        hint: {
          en: "Look at what <code>schools</code> is before and after the <code>json_normalize</code> line, and ask which statement can still use it as a list of records.",
          ar: "انظر إلى ما هو <code>schools</code> قبل سطر <code>json_normalize</code> وبعده، واسأل أيّ الأسطر ما يزال يستطيع استعماله قائمة سجلات."
        },
        explain: {
          en: "After <code>schools = pd.json_normalize(...)</code> the name holds a DataFrame, and iterating a DataFrame gives its column names, not the records. So the count of schools without a <code>contacts</code> key must be taken from the list of records first, while the keys still exist; moved after the flattening, <code>\"contacts\" not in s</code> would test substrings of column names and quietly print 10 (and 0 for the other count). Afterwards the flat table can count its NaN in <code>contacts_email</code> (10), and the difference is the schools that do have contacts: <code>3 schools have no contacts object; 7 have contacts but no e-mail</code>. After flattening, those two causes are the same NaN; the census taken before is their only record (Lesson 5).",
          ar: "بعد <code>schools = pd.json_normalize(...)</code> يحمل الاسم DataFrame، وتكرار DataFrame يعطي أسماء أعمدتها لا السجلات. لذلك يجب أخذ عدد المدارس التي لا مفتاح <code>contacts</code> فيها من قائمة السجلات أولًا، ما دامت المفاتيح موجودة؛ فلو نُقل بعد التسطيح لاختبر <code>\"contacts\" not in s</code> سلاسل جزئية من أسماء الأعمدة وطبع بصمت 10 (و0 للعدد الآخر). وبعدها يستطيع الجدول المسطَّح أن يعدّ NaN في <code>contacts_email</code> (10)، والفرق هو المدارس التي لها جهات اتصال: <code>3 schools have no contacts object; 7 have contacts but no e-mail</code>. وبعد التسطيح يصير السببان NaN واحدة؛ والإحصاء المأخوذ قبله سجلّهما الوحيد (الدرس 5)."
        }
      },
      {
        id: "t1bx21",
        type: "multi",
        level: "medium",
        topics: [
          "t1-silent-load",
          "t1-validation-ritual",
          "t1-inspect-dtypes"
        ],
        q: {
          en: "Next month's file was read with the defaults: <code>df = pd.read_csv(\"rental_listings_update.csv\")</code>. <code>df.info()</code> shows <code>monthly_rent</code> as <code>object</code> (59 non-null: one cell is the text <code>'1,150'</code>) and <code>listed_on</code> as <code>object</code> (one date is written 14/02/2026). Which of these lines run to the end without raising an error? (Choose all that apply.)",
          ar: "قُرئ ملف الشهر القادم بالإعدادات الافتراضية: <code>df = pd.read_csv(\"rental_listings_update.csv\")</code>. يُظهر <code>df.info()</code> أن <code>monthly_rent</code> من النوع <code>object</code> (59 قيمة غير فارغة: إحداها النص <code>'1,150'</code>) وأن <code>listed_on</code> من النوع <code>object</code> (وأحد التواريخ مكتوب 14/02/2026). أيّ هذه الأسطر ينتهي تنفيذه دون أن يرفع خطأً؟ (اختر كل ما ينطبق.)"
        },
        options: [
          {
            code: "df[\"listed_on\"].dt.month"
          },
          {
            code: "df[\"monthly_rent\"] * 2"
          },
          {
            code: "(df[\"monthly_rent\"] > 400).sum()"
          },
          {
            code: "df.describe()"
          },
          {
            code: "df[\"monthly_rent\"].mean()"
          },
          {
            code: "df[\"listed_on\"].min()"
          }
        ],
        answer: [1, 3, 5],
        hint: {
          en: "An <code>object</code> column holds Python strings (and NaN). Which operations are defined for strings, and which mix a string with a number or with NaN?",
          ar: "عمود <code>object</code> يحمل سلاسل بايثون (وNaN). أيّ العمليات معرَّفة للسلاسل، وأيّها يخلط سلسلة برقم أو بـNaN؟"
        },
        explain: {
          en: "Three lines run, and all three are silently wrong. <code>* 2</code> repeats each text (<code>'415'</code> becomes <code>'415415'</code>). <code>min()</code> compares texts character by character and returns <code>'14/02/2026'</code> as the 'earliest' listing. <code>describe()</code> leaves out every column that is not numeric, so the rent column simply vanishes from the summary. Three lines raise: <code>.dt.month</code> (<code>AttributeError</code>: not a datetime column), <code>mean()</code> (<code>TypeError</code>: text and NaN cannot be added) and <code>&gt; 400</code> (<code>TypeError</code>: text against a number). 'It ran' is not 'it is right'; the <code>object</code> in the dtype line is the only warning (ritual lines 3 and 6 of Lesson 6).",
          ar: "تنتهي ثلاثة أسطر وكلها خاطئة بصمت. فـ<code>* 2</code> تكرّر كل نص (<code>'415'</code> تصير <code>'415415'</code>). و<code>min()</code> تقارن النصوص حرفًا بحرف وتعيد <code>'14/02/2026'</code> بوصفه «أقدم» إعلان. و<code>describe()</code> تُسقط كل عمود غير عددي، فيختفي عمود الإيجار من الملخص ببساطة. وترفع ثلاثة أسطر خطأً: <code>.dt.month</code> (<code>AttributeError</code>: العمود ليس تاريخًا)، و<code>mean()</code> (<code>TypeError</code>: لا يُجمع نص مع NaN)، و<code>&gt; 400</code> (<code>TypeError</code>: نص مقابل عدد). «اشتغل» ليست «صحيح»؛ والتحذير الوحيد هو كلمة <code>object</code> في سطر الأنواع (سطرا الطقس 3 و6 في الدرس 6)."
        }
      },
      {
        id: "t1bx22",
        type: "error",
        level: "hard",
        topics: [
          "t1-validate-function"
        ],
        q: {
          en: "<code>decide</code> must return STOP as soon as the list holds one error, GO WITH CARE when it holds only warnings, and GO when it is empty. The nightly job prints STOP for the clean file and GO WITH CARE for the file that has an error, and raises nothing. Click the line responsible.",
          ar: "يجب أن تعيد <code>decide</code> القيمة STOP بمجرد أن تحوي القائمة خطأً واحدًا، وGO WITH CARE حين لا تحوي إلا تحذيرات، وGO حين تكون فارغة. تطبع المهمة الليلية STOP للملف النظيف وGO WITH CARE للملف الذي فيه خطأ، ولا ترفع شيئًا. انقر السطر المسؤول."
        },
        code: code(
          "def decide(problems):",
          "    if all(p[\"level\"] == \"error\" for p in problems):",
          "        return \"STOP\"",
          "    return \"GO WITH CARE\" if problems else \"GO\"",
          "",
          "clean = []",
          "mixed = [{\"level\": \"error\", \"message\": \"listing_id: 1 repeated value(s)\"},",
          "         {\"level\": \"warning\", \"message\": \"area_m2: 4 missing (6.6%), allowed 5%\"}]",
          "warnings_only = [{\"level\": \"warning\", \"message\": \"area_m2: 4 missing (6.6%), allowed 5%\"}]",
          "",
          "for name, problems in [(\"clean file\", clean), (\"one error, one warning\", mixed), (\"warnings only\", warnings_only)]:",
          "    print(f\"{name:<24}{decide(problems)}\")"
        ),
        answer: 2,
        solution: {
          code: "    if any(p[\"level\"] == \"error\" for p in problems):",
          en: "The rule is 'at least one error', which is <code>any</code>. <code>all</code> asks for 'every problem is an error', and it is True for an empty list.",
          ar: "القاعدة «خطأ واحد على الأقل»، وهذه هي <code>any</code>. أما <code>all</code> فتسأل «كل مشكلة خطأ»، وهي True للقائمة الفارغة."
        },
        hint: {
          en: "Run the three inputs through the first condition by hand, starting with the empty list: which of the three results is wrong, and what makes it so?",
          ar: "مرّر المدخلات الثلاثة على الشرط الأول بيدك، بادئًا بالقائمة الفارغة: أيّ النتائج الثلاث خاطئة، وما الذي يجعلها كذلك؟"
        },
        explain: {
          en: "The printed lines are <code>clean file  STOP</code>, <code>one error, one warning  GO WITH CARE</code> and <code>warnings only  GO WITH CARE</code>; the right answers are GO, STOP and GO WITH CARE. One word causes both mistakes. <code>all(...)</code> is True for an empty list (nothing contradicts it), so a clean file stops the job; and it is False as soon as one problem is a warning, so a file with an error and a warning slips through as 'with care'. The policy 'any error stops' needs <code>any</code>. A decision function is where the policy of Lesson 6 lives, so it deserves three test inputs: empty, mixed, warnings only.",
          ar: "الأسطر المطبوعة هي <code>clean file  STOP</code> و<code>one error, one warning  GO WITH CARE</code> و<code>warnings only  GO WITH CARE</code>؛ والجواب الصحيح GO وSTOP وGO WITH CARE. كلمة واحدة تسبّب الخطأين. فـ<code>all(...)</code> تساوي True للقائمة الفارغة (لا شيء ينقضها)، فيوقف الملف النظيف المهمة؛ وتساوي False بمجرد أن تكون إحدى المشكلات تحذيرًا، فيمرّ ملف فيه خطأ وتحذير «بحذر». وسياسة «أي خطأ يوقف» تحتاج إلى <code>any</code>. ودالة القرار هي موضع سياسة الدرس 6، فتستحق ثلاثة مدخلات اختبار: فارغ ومختلط وتحذيرات فقط."
        }
      },
      {
        id: "t1bx23",
        type: "complete",
        level: "medium",
        topics: [
          "t1-quality-report",
          "t1-quality-dimensions"
        ],
        q: {
          en: "The timeliness line of the quality report asks how old the newest listing is on a stated day. The function must give the same answer on every machine, today and next year. Which expression completes it?",
          ar: "يسأل سطر الحداثة في تقرير الجودة كم عمر أحدث إعلان في يوم محدد. ويجب أن تعطي الدالة الجواب نفسه على كل جهاز، اليوم والعام القادم. أيّ تعبير يكملها؟"
        },
        code: code(
          "import pandas as pd",
          "",
          "df = pd.read_csv(\"rental_listings.csv\")",
          "",
          "def newest_age_days(df, as_of):",
          "    dates = pd.to_datetime(df[\"listed_on\"], format=\"%Y-%m-%d\", errors=\"coerce\")",
          "    return (____ - dates.max()).days",
          "",
          "print(newest_age_days(df, \"2026-05-20\"))      # 15: the newest listing is from 2026-05-05",
          "print(newest_age_days(df, \"2026-06-01\"))      # 27"
        ),
        options: [
          {
            code: "pd.Timestamp.now()"
          },
          {
            code: "pd.Timestamp(as_of)"
          },
          {
            code: "as_of"
          },
          {
            code: "pd.Timestamp(\"2026-05-20\")"
          }
        ],
        answer: 1,
        solution: {
          code: "    return (pd.Timestamp(as_of) - dates.max()).days",
          en: "Turn the text argument into a Timestamp and use that as 'today': the function depends on its arguments only.",
          ar: "حوِّل وسيط النص إلى Timestamp واستعمله بوصفه «اليوم»: فتعتمد الدالة على وسائطها وحدها."
        },
        hint: {
          en: "Imagine running the function on another machine, next year, with a different date as the second argument: it must depend on its arguments and on nothing else.",
          ar: "تخيّل أنك تشغّل الدالة على جهاز آخر في العام القادم وبتاريخ مختلف وسيطًا ثانيًا: يجب أن تعتمد على وسائطها وعلى لا شيء غيرها."
        },
        explain: {
          en: "'How old is the newest listing?' has no answer until you say what today is. <code>pd.Timestamp.now()</code> reads the clock, so the function returns a different number each day and a test written today fails next week. The string <code>as_of</code> cannot be subtracted from a Timestamp (<code>TypeError: unsupported operand type(s) for -: 'str' and 'Timestamp'</code>). A hard-coded <code>pd.Timestamp(\"2026-05-20\")</code> gives 15 for the first call and then 15 again for the second, where 27 is expected, because the argument is ignored. <code>pd.Timestamp(as_of)</code> converts the argument and honours it: 15 and 27 on every machine. Timeliness is a dimension of quality; a function that reads the clock cannot be tested.",
          ar: "«كم عمر أحدث إعلان؟» لا جواب لها حتى تقول ما هو اليوم. تقرأ <code>pd.Timestamp.now()</code> الساعة، فتعيد الدالة رقمًا مختلفًا كل يوم ويفشل اختبار كُتب اليوم بعد أسبوع. والنص <code>as_of</code> لا يُطرح من Timestamp (<code>TypeError: unsupported operand type(s) for -: 'str' and 'Timestamp'</code>). و<code>pd.Timestamp(\"2026-05-20\")</code> المكتوبة في الكود تعطي 15 للاستدعاء الأول ثم 15 مرة ثانية للثاني حيث يُنتظر 27، لأن الوسيط مُهمَل. أما <code>pd.Timestamp(as_of)</code> فتحوّل الوسيط وتحترمه: 15 و27 على كل جهاز. الحداثة بُعد من أبعاد الجودة؛ والدالة التي تقرأ الساعة لا يمكن اختبارها."
        }
      },
      {
        id: "t1bx24",
        type: "mcq",
        level: "hard",
        topics: [
          "t1-format-roundtrip",
          "t1-id-leading-zeros",
          "t1-format-decision-table"
        ],
        q: {
          en: "A cleaned table has string ids with leading zeros, an ordered category and an <code>Int64</code> column with a gap. It is saved as CSV and read back with the defaults. What do the last two lines print?",
          ar: "جدول منظَّف فيه معرّفات نصية بأصفار بادئة ونوع فئوي مرتّب وعمود <code>Int64</code> فيه فجوة. حُفظ بصيغة CSV ثم قُرئ بالإعدادات الافتراضية. ماذا يطبع السطران الأخيران؟"
        },
        code: code(
          "import pandas as pd",
          "",
          "schools = pd.DataFrame({",
          "    \"school_id\": pd.array([\"0071\", \"0072\", \"0073\"], dtype=\"string\"),",
          "    \"damage\": pd.Categorical([\"partial\", \"total\", \"slight\"],",
          "                             categories=[\"slight\", \"partial\", \"total\"], ordered=True),",
          "    \"students\": pd.array([842, None, 1130], dtype=\"Int64\"),",
          "})",
          "schools.to_csv(\"schools.csv\", index=False)",
          "back = pd.read_csv(\"schools.csv\")",
          "print(back[\"school_id\"].tolist())",
          "print(back[\"damage\"].dtype, back[\"students\"].dtype)"
        ),
        options: [
          {
            code: code(
              "[71, 72, 73]",
              "object float64"
            )
          },
          {
            code: code(
              "['0071', '0072', '0073']",
              "category Int64"
            )
          },
          {
            code: code(
              "[71, 72, 73]",
              "category float64"
            )
          },
          {
            code: code(
              "['0071', '0072', '0073']",
              "object float64"
            )
          }
        ],
        answer: 0,
        hint: {
          en: "A CSV file holds only characters. What does <code>read_csv</code> have to guess for each of the three columns, and what does one gap do to a column of whole numbers?",
          ar: "ملف CSV لا يحمل إلا حروفًا. ماذا يجب أن تخمّن <code>read_csv</code> لكل عمود من الأعمدة الثلاثة، وماذا تفعل فجوة واحدة بعمود أعداد صحيحة؟"
        },
        explain: {
          en: "The file contains the text <code>0071,partial,842</code> and nothing about dtypes. The reader sees digits in the id column and makes integers of them: 71, 72, 73, and the zeros are gone for good. It sees words in <code>damage</code> and makes plain <code>object</code> text: the declared order, and the category itself, did not travel. The <code>Int64</code> column has an empty cell, so the reader falls back to <code>float64</code> (842.0, NaN, 1130.0). Nothing is raised at any step. Each tempting option believes that the file carries a type; a CSV does not. Keeping the dtypes needs a typed format such as Parquet, or a reader told everything again (<code>dtype=</code> with the ordered dtype) and a schema check right after the load.",
          ar: "يحتوي الملف على النص <code>0071,partial,842</code> ولا شيء عن الأنواع. يرى القارئ أرقامًا في عمود المعرّف فيصنع منها أعدادًا صحيحة: 71 و72 و73، وتذهب الأصفار إلى الأبد. ويرى كلمات في <code>damage</code> فيصنع نصًّا عاديًّا <code>object</code>: الترتيب المعلَن، والنوع الفئوي نفسه، لم يسافرا. وفي العمود <code>Int64</code> خلية فارغة، فيرتدّ القارئ إلى <code>float64</code> (842.0 وNaN و1130.0). ولا يُرفع شيء في أي خطوة. وكل خيار مغرٍ يظن أن الملف يحمل نوعًا؛ وملف CSV لا يحمل. وللاحتفاظ بالأنواع تلزم صيغة مُنوَّعة مثل Parquet، أو قارئ يُقال له كل شيء من جديد (<code>dtype=</code> مع النوع المرتّب) وفحص مخطط بعد التحميل مباشرة."
        }
      }
    ]
  };
})();
