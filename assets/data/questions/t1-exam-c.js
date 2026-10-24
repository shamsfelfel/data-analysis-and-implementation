window.DABanks = window.DABanks || {};
(function () {
  /* code(line, line, ...) -> one string with \n between lines */
  function code() { return Array.prototype.join.call(arguments, "\n"); }

  window.DABanks["t1-exam-c"] = {
    title: {
      en: "Chapter Test C — Advanced",
      ar: "اختبار الفصل ج — المتقدم"
    },
    intro: {
      en: "24 advanced questions that cross the lessons of Chapter 1. They take the hard corners (programs that run and print a plausible wrong number), the trade-offs («which approach, and why?»), the four problem threads of the chapter (load a file, say what a column means, parse a messy value, fetch from another system: which solution fits, what gap it leaves, what the next one closes and what stays open) and the consequences for a model (what it would learn from a wrong type, a wrong encoding, mixed units, duplicated rows or a shifted schema). All outputs were produced by running the code with Python 3.13 and pandas 2.2; the data are the course files or small invented frames, and invented numbers are labelled as such. Plan for about 70 minutes. Every question has a hint, an answer and an explanation, hidden until you ask for them: try first, then open them. A revealed answer is not counted.",
      ar: "24 سؤالًا متقدمًا تعبر دروس الفصل 1. تتناول الزوايا الصعبة (برامج تعمل وتطبع رقمًا خاطئًا معقولًا)، والمفاضلات («أيّ طريقة ولماذا؟»)، وخيوط المشكلات الأربعة في الفصل (حمّل ملفًّا، وقل ماذا يعني عمود، وحلّل قيمة فوضوية، واجلب من نظام آخر: أيّ حل يناسب، وأيّ فجوة يترك، وماذا يغلق التالي وما الذي يبقى مفتوحًا)، وعواقب ذلك على النموذج (ماذا سيتعلّم من نوع خاطئ أو ترميز خاطئ أو وحدات مخلوطة أو صفوف مكرّرة أو مخطط منزاح). كل النواتج مأخوذة من تشغيل الكود فعلًا ببايثون 3.13 وpandas 2.2؛ والبيانات هي ملفات المقرر أو جداول صغيرة مخترَعة، والأرقام المخترَعة موسومة بذلك. خصّص نحو 70 دقيقة. لكل سؤال تلميح وجواب وشرح، وكلها مخفية حتى تطلبها: جرّب أولًا ثم افتحها. والجواب الذي يُظهَر لا يُحتسب."
    },
    questions: [

      /* ---------------------------------------------------------- 01 */
      {
        id: "t1cx01",
        type: "mcq",
        level: "easy",
        topics: ["t1-wrong-loader-silent", "t1-check-after-load", "t1-validate-function"],
        q: {
          en: "<code>pd.read_csv(\"adverts_sample.txt\")</code> returns a table of shape <code>(7, 5)</code> whose column names are pieces of the first advert (<code>'Flat in Rafah'</code>, <code>' 3 rooms'</code>, …), and nothing is raised. The listings pipeline expects a table with the nine columns <code>listing_id</code> … <code>advert</code>. Which habit from the later lessons would have flagged this load on the very first run, without anyone reading the file?",
          ar: "تُعيد <code>pd.read_csv(\"adverts_sample.txt\")</code> جدولًا شكله <code>(7, 5)</code> أسماء أعمدته قطع من الإعلان الأول (<code>'Flat in Rafah'</code> و<code>' 3 rooms'</code> …) دون أن يُرفع أي خطأ. وخط المعالجة يتوقّع جدولًا من تسعة أعمدة هي <code>listing_id</code> … <code>advert</code>. أيّ عادة من دروس الفصل اللاحقة كانت ستنبّه إلى هذا التحميل من أول تشغيل، دون أن يقرأ أحد الملف؟"
        },
        options: [
          {
            en: "<code>df.isna().sum()</code>: the rows padded with <code>NaN</code> show where the holes are, so a table with strange gaps would stand out at once.",
            ar: "<code>df.isna().sum()</code>: الصفوف المحشوّة بـ<code>NaN</code> تُظهر مواضع الفراغات، فيبرز جدول فيه فراغات غريبة من النظرة الأولى."
          },
          {
            en: "<code>df.duplicated().sum()</code>: a table built from the wrong shape has been cut at the wrong places, so it is bound to contain repeated rows.",
            ar: "<code>df.duplicated().sum()</code>: الجدول المبني على شكل خاطئ قُطع في مواضع خاطئة، فلا بد أن يحوي صفوفًا مكرّرة."
          },
          {
            en: "Comparing the table with the expected schema (<code>check(df)</code>, Lesson 4; <code>validate(df, SCHEMA)</code>, Lesson 6): nine expected columns are missing, five unknown ones are present.",
            ar: "مقارنة الجدول بالمخطط المتوقَّع (<code>check(df)</code> في الدرس 4، و<code>validate(df, SCHEMA)</code> في الدرس 6): تسعة أعمدة متوقَّعة غائبة وخمسة غير معروفة موجودة."
          },
          {
            en: "<code>df.describe()</code>: the summary of a table built from the wrong shape shows impossible minimums and maximums for its columns.",
            ar: "<code>df.describe()</code>: ملخّص جدول مبني على شكل خاطئ يُظهر لأعمدته حدودًا دنيا وعليا مستحيلة."
          }
        ],
        answer: 2,
        hint: {
          en: "Three of these tools only describe the table you have. What would a tool need in order to notice that it is the wrong table?",
          ar: "ثلاث من هذه الأدوات تصف الجدول الذي عندك فقط. ماذا تحتاج أداة لتلاحظ أنه الجدول الخطأ؟"
        },
        explain: {
          en: "The ritual lines of Lesson 6 all describe the table you got; none of them knows what you meant to get. A table of 7 rows and 5 odd columns, all <code>object</code>, looks to <code>isna()</code>, <code>duplicated()</code> and <code>describe()</code> like any other messy table: the holes look like ordinary gaps, no row repeats, and there are no numbers for <code>describe()</code> to summarise. Only an expectation written down as data (<code>EXPECTED</code> in Lesson 4, <code>SCHEMA</code> in Lesson 6) says at once that nine columns are missing and five are not in the schema. That is the answer to the warning of Lesson 1: a loader that does not crash has proved nothing, and the proof has to come from a comparison with what the file should have been.",
          ar: "أسطر الطقس في الدرس 6 كلها تصف الجدول الذي وصلك، ولا يعرف أيٌّ منها ما قصدتَ أن يصلك. جدول من سبعة صفوف وخمسة أعمدة غريبة كلها من النوع <code>object</code> يبدو لـ<code>isna()</code> و<code>duplicated()</code> و<code>describe()</code> كأي جدول فوضوي آخر: الفراغات تبدو فراغات عادية، ولا صف يتكرّر، ولا أرقام يلخّصها <code>describe()</code> أصلًا. وحدها التوقّعات المكتوبة كبيانات (<code>EXPECTED</code> في الدرس 4 و<code>SCHEMA</code> في الدرس 6) تقول دفعة واحدة إن تسعة أعمدة غائبة وإن خمسة منها ليست في المخطط. وهذا هو جواب تحذير الدرس 1: المحمِّل الذي لا يتعطّل لم يُثبت شيئًا، والإثبات يأتي من مقارنة الجدول بما كان ينبغي أن يكون عليه الملف."
        }
      },

      /* ---------------------------------------------------------- 02 */
      {
        id: "t1cx02",
        type: "order",
        level: "easy",
        topics: ["t1-csv-layers", "t1-loader-versions", "t1-data-lineage"],
        q: {
          en: "The agency sends this month's export, and the table will be used to retrain a rent model. Put the steps in the order a careful analyst takes them.",
          ar: "أرسلت الوكالة تصدير هذا الشهر، وسيُستعمل الجدول لإعادة تدريب نموذج للإيجارات. رتّب الخطوات بالترتيب الذي يتبعه محلّل حريص."
        },
        items: [
          {
            en: "Look at the first lines and the raw bytes of the file: delimiter, quoting, decimal mark, byte-order mark.",
            ar: "انظر إلى الأسطر الأولى وإلى بايتات الملف الخام: الفاصل والاقتباس والفاصلة العشرية وعلامة ترتيب البايت."
          },
          {
            en: "Write the read call from that evidence: <code>sep</code>, <code>decimal</code>, <code>encoding</code>, the ID as text, the missing-value markers, the date format.",
            ar: "اكتب استدعاء القراءة من هذا الدليل: <code>sep</code> و<code>decimal</code> و<code>encoding</code> والمعرّف نصًّا وعلامات القيم المفقودة وصيغة التاريخ."
          },
          {
            en: "Load the file, counting for every column the blank cells and the cells that failed to parse.",
            ar: "حمّل الملف مع عدّ الخلايا الفارغة والخلايا التي فشل تحليلها في كل عمود."
          },
          {
            en: "Check the typed table against the expected schema and collect every problem with its severity.",
            ar: "افحص الجدول المنمَّط بالمقارنة مع المخطط المتوقَّع واجمع كل المشكلات مع درجة خطورتها."
          },
          {
            en: "Read the decision (STOP, GO WITH CARE or GO), and only then clean or fit anything.",
            ar: "اقرأ القرار (STOP أو GO WITH CARE أو GO)، ثم نظّف أو درّب بعد ذلك فقط."
          },
          {
            en: "Keep the dated raw file, the schema and the report beside the trained model.",
            ar: "احتفظ بالملف الخام المؤرَّخ والمخطط والتقرير إلى جانب النموذج المدرَّب."
          }
        ],
        answer: [0, 1, 2, 3, 4, 5],
        hint: {
          en: "Evidence comes before arguments, a decision comes before action, and what comes last is what makes next month's difference explainable.",
          ar: "الدليل قبل الوسائط، والقرار قبل الفعل، وما يأتي أخيرًا هو ما يجعل فرق الشهر القادم قابلًا للتفسير."
        },
        explain: {
          en: "Each step needs the one before it. You cannot choose reading arguments before you have seen the bytes (Lesson 4: a CSV is text in layers, and 'it opens in Excel' proves nothing). Counting blank cells against failed parses needs the read to be typed (the loader of Lesson 6). A validator can only judge a typed table, and its report collapses into one decision that must come before cleaning or fitting; skipping ahead is how a model gets trained on a table nobody checked. The last step is the lineage habit: with the dated file and the report, 'why did accuracy change in March?' has an answer.",
          ar: "كل خطوة تحتاج التي قبلها. لا تستطيع اختيار وسائط القراءة قبل أن ترى البايتات (الدرس 4: ملف CSV نص في طبقات، وعبارة «يُفتح في Excel» لا تثبت شيئًا). وعدّ الفارغ مقابل الفاشل يحتاج قراءة منمَّطة (محمِّل الدرس 6). والمدقِّق لا يحكم إلا على جدول منمَّط، وتقريره يتكثّف في قرار واحد يجب أن يسبق التنظيف والتدريب؛ والقفز فوقه هو ما يدرّب نموذجًا على جدول لم يفحصه أحد. والخطوة الأخيرة عادة النسب (lineage): مع الملف المؤرَّخ والتقرير يصير لسؤال «لماذا تغيّرت الدقة في آذار؟» جواب."
        }
      },

      /* ---------------------------------------------------------- 03 */
      {
        id: "t1cx03",
        type: "fill",
        level: "easy",
        topics: ["t1-declare-category", "t1-ordered-categorical", "t1-inspect-dtypes"],
        lang: "python",
        q: {
          en: "<code>school_conditions_demo.csv</code> is the 13-school sheet. Fill in the blanks so that the dtypes say what each column <em>is</em>: the identifier becomes a name, the damage level an ordered scale, and the numeric selection keeps only the three genuine quantities. The program must print those three column names, then <code>total</code>, the highest damage level.",
          ar: "<code>school_conditions_demo.csv</code> هو جدول المدارس الثلاث عشرة. املأ الفراغات بحيث تقول الأنواع ما <em>هو</em> كل عمود: المعرّف يصير اسمًا، ومستوى الضرر مقياسًا مرتَّبًا، والاختيار العددي يُبقي الكميات الثلاث الحقيقية فقط. يجب أن يطبع البرنامج أسماء هذه الأعمدة الثلاثة ثم <code>total</code>، أعلى مستوى ضرر."
        },
        code: code(
          "import pandas as pd",
          "",
          "schools = pd.read_csv(\"school_conditions_demo.csv\")",
          "schools[\"school_id\"] = schools[\"school_id\"].astype(\"____1____\")",
          "DAMAGE = pd.CategoricalDtype([\"slight\", \"partial\", \"total\"], ordered=____2____)",
          "schools[\"damage_level\"] = schools[\"damage_level\"].astype(DAMAGE)",
          "",
          "print(schools.select_dtypes(include=\"____3____\").columns.tolist())",
          "print(schools[\"damage_level\"].max())"
        ),
        blanks: [
          {
            accept: ["category"]
          },
          {
            accept: ["True"]
          },
          {
            accept: ["number"]
          }
        ],
        hint: {
          en: "Ask what each dtype tells pandas about its column: a name, an order, a quantity.",
          ar: "اسأل عمّا يقوله كل نوع لـpandas عن عموده: اسم، أو ترتيب، أو كمية."
        },
        explain: {
          en: "Declaring is how a level reaches pandas (Lessons 2 and 3). <code>astype(\"category\")</code> turns the identifier into a name: it drops out of the numeric selection, so a scaler built on that selection never sees it, and a mean on it raises a <code>TypeError</code> instead of a quiet 207.0. <code>ordered=True</code> makes <code>max()</code>, <code>min()</code> and comparisons follow the scale (on an unordered category <code>max()</code> raises). And <code>select_dtypes(include=\"number\")</code> then returns <code>students</code>, <code>classroom_temp_c</code> and <code>repair_weeks</code>. Without the first line the same selection would also have returned <code>school_id</code>, because pandas selects by storage, not by meaning.",
          ar: "التصريح هو الطريق الذي يصل به المستوى إلى pandas (الدرسان 2 و3). <code>astype(\"category\")</code> يحوّل المعرّف إلى اسم: فيخرج من الاختيار العددي، فلا يراه أي مقياس (scaler) مبنيّ على ذلك الاختيار، ويرفع المتوسط عليه <code>TypeError</code> بدل أن يعطي 207.0 بهدوء. و<code>ordered=True</code> يجعل <code>max()</code> و<code>min()</code> والمقارنات تتبع المقياس (وعلى فئة غير مرتَّبة يرفع <code>max()</code> خطأً). ثم يعيد <code>select_dtypes(include=\"number\")</code> الأعمدة <code>students</code> و<code>classroom_temp_c</code> و<code>repair_weeks</code>. ولولا السطر الأول لأعاد الاختيار نفسه <code>school_id</code> أيضًا، لأن pandas تختار بالتخزين لا بالمعنى."
        }
      },

      /* ---------------------------------------------------------- 04 */
      {
        id: "t1cx04",
        type: "tf",
        level: "medium",
        topics: ["t1-category-ordered", "t1-numbers-that-name", "t1-capstone-dtypes"],
        q: {
          en: "Lesson 3 writes the measurement level into the dtype: <code>category</code> for nominal columns, an ordered <code>CategoricalDtype</code> for ordinal ones, <code>Int64</code> for counts. True or false: once the level is in the dtype, pandas also checks it against the values, so declaring the identifier <code>listing_id</code> as <code>Int64</code> (a count type) would be refused, because all 60 of its values are different.",
          ar: "كتب الدرس 3 مستوى القياس في النوع: <code>category</code> للأعمدة الاسمية، و<code>CategoricalDtype</code> مرتَّبًا للترتيبية، و<code>Int64</code> للأعداد. صح أم خطأ: ما دام المستوى في النوع فإن pandas تفحصه أيضًا بالقيم، فتصريح المعرّف <code>listing_id</code> بالنوع <code>Int64</code> (نوع الأعداد) سيُرفض لأن قيمه الستين كلها مختلفة."
        },
        truth: false,
        hint: {
          en: "Does pandas know what <code>listing_id</code> means? What does <code>astype(\"Int64\")</code> actually test?",
          ar: "هل تعرف pandas ماذا يعني <code>listing_id</code>؟ وما الذي يفحصه <code>astype(\"Int64\")</code> فعلًا؟"
        },
        explain: {
          en: "False. pandas enforces what you declare; it has no idea what a column means. <code>Int64</code> accepts sixty distinct whole numbers without a murmur, and <code>.mean()</code> returns 1030.5, 'the average listing', exactly as plain <code>int64</code> did. This is why the thread «what may I do with this column?» is only half closed by Lesson 3: a dtype can carry a level that a human judged, and it makes the wrong operation fail (a mean on a <code>category</code> raises), but it does not verify the judgement. A city code left as <code>int64</code> stays nominal to you and a quantity to pandas. Rule: the declaration is yours, the enforcement is pandas'.",
          ar: "خطأ. pandas تفرض ما تصرّح به، ولا تعرف شيئًا عمّا يعنيه العمود. يقبل <code>Int64</code> ستين عددًا صحيحًا مختلفًا بلا اعتراض، ويعيد <code>.mean()</code> القيمة 1030.5 «متوسط الإعلانات» كما فعل <code>int64</code> العادي. ولهذا فإن خيط «ماذا يجوز أن أفعل بهذا العمود؟» لا يُغلقه الدرس 3 إلا إلى نصفه: النوع يحمل مستوى حكم به إنسان، ويجعل العملية الخاطئة تفشل (المتوسط على <code>category</code> يرفع خطأً)، لكنه لا يتحقّق من صحة الحكم. ورمز المدينة المتروك <code>int64</code> يبقى اسميًّا عندك وكمية عند pandas. القاعدة: التصريح عليك، والإنفاذ على pandas."
        }
      },

      /* ---------------------------------------------------------- 05 */
      {
        id: "t1cx05",
        type: "match",
        level: "medium",
        topics: ["t1-list-of-dicts-limits", "t1-csv-reader-recipe", "t1-loader-thread"],
        q: {
          en: "These are the solutions along the thread «load a file into something analysable». Match each solution to the gap it leaves open: the gap that the next solution on the thread was written to close (the last one leaves the open end of the thread).",
          ar: "هذه هي الحلول على طول خيط «حمّل ملفًّا إلى شيء قابل للتحليل». وصّل كل حل بالفجوة التي يتركها مفتوحة: الفجوة التي جاء الحل التالي على الخيط ليغلقها (والأخير يترك طرف الخيط مفتوحًا)."
        },
        pairs: [
          {
            l: {
              code: "for line in lines: line.split(\",\")"
            },
            r: {
              en: "Cuts a quoted advert at its commas, so every column to its right shifts — and nothing is raised",
              ar: "يقطع الإعلان المقتبَس عند فواصله فتنزاح كل الأعمدة التي على يمينه — ولا يُرفع شيء"
            }
          },
          {
            l: {
              code: "csv.DictReader(f)"
            },
            r: {
              en: "Quoting is right, but every cell is still a string, a blank is <code>''</code>, and nothing can be added up",
              ar: "الاقتباس صحيح، لكن كل خلية ما زالت نصًّا، والفارغ <code>''</code>، ولا شيء يمكن جمعه"
            }
          },
          {
            l: {
              code: "pd.read_csv(path)"
            },
            r: {
              en: "Guesses the types: one <code>1,200</code> turns a number column into text, and <code>007</code> becomes 7",
              ar: "تخمّن الأنواع: <code>1,200</code> واحدة تحوّل عمودًا عدديًّا إلى نص، و<code>007</code> تصير 7"
            }
          },
          {
            l: {
              code: "pd.read_csv(path, sep=…, decimal=…, dtype=…, na_values=…)"
            },
            r: {
              en: "Right for the files seen so far, but the knowledge sits in one call nobody checks: a new missing-value marker makes a column text again",
              ar: "صحيحة للملفات التي رأيناها، لكن المعرفة في استدعاء واحد لا يفحصه أحد: علامة فقدان جديدة تعيد العمود نصًّا"
            }
          },
          {
            l: {
              code: "load_listings(path)"
            },
            r: {
              en: "Describes one file layout and reports problems without repairing them; a changed source shows only when it fails the schema",
              ar: "يصف تخطيط ملف واحدًا ويبلغ عن المشكلات دون إصلاحها؛ والمصدر المتغيّر لا يظهر إلا حين يفشل أمام المخطط"
            }
          }
        ],
        leftHead: {
          en: "Solution",
          ar: "الحل"
        },
        rightHead: {
          en: "The gap it leaves",
          ar: "الفجوة التي يتركها"
        },
        hint: {
          en: "Read each gap as the complaint that the next solution on the thread was written to answer, and put the solutions in the order of the lessons first.",
          ar: "اقرأ كل فجوة كشكوى كُتب الحل التالي على الخيط ليجيب عنها، ورتّب الحلول أولًا بترتيب الدروس."
        },
        explain: {
          en: "The thread of Lessons 3, 4 and 6 is a chain of repairs, each leaving a smaller hole. <code>split(\",\")</code> knows nothing of quotes; the <code>csv</code> module fixes that and leaves you with strings; <code>read_csv</code> builds typed columns by guessing; the read arguments of Lesson 4 replace the guess with your decision, but that decision lives in one call that is never validated; <code>load_listings()</code> reads text first, types from a schema, counts, validates and returns a report. What stays open even then: one layout, a report instead of a repair, and Excel, Power Query and Power BI with silent defaults of their own (Practical chapter 1).",
          ar: "خيط الدروس 3 و4 و6 سلسلة إصلاحات يترك كلٌّ منها ثقبًا أصغر. <code>split(\",\")</code> لا يعرف شيئًا عن الاقتباس؛ ووحدة <code>csv</code> تصلح ذلك وتتركك مع نصوص؛ و<code>read_csv</code> تبني أعمدة منمَّطة بالتخمين؛ ووسائط القراءة في الدرس 4 تستبدل بالتخمين قرارك، لكن القرار يعيش في استدعاء واحد لا يتحقّق منه أحد؛ و<code>load_listings()</code> يقرأ النص أولًا ثم ينمِّط من مخطط ويعدّ ويتحقّق ويعيد تقريرًا. وما يبقى مفتوحًا حتى حينئذ: تخطيط واحد، وتقرير بدل إصلاح، وExcel وPower Query وPower BI ولكلٍّ منها افتراضاته الصامتة (الفصل العملي 1)."
        }
      },

      /* ---------------------------------------------------------- 06 */
      {
        id: "t1cx06",
        type: "contrast",
        level: "medium",
        topics: ["t1-coerce-and-count", "t1-blank-vs-failed", "t1-nan-aggregations"],
        q: {
          en: "A rent column ends up with <code>NaN</code> in two very different ways. Place each statement under the blank cell, under the filled cell that cannot be parsed, under both, or under neither.",
          ar: "يصل عمود الإيجار إلى <code>NaN</code> بطريقتين مختلفتين جدًّا. ضع كل عبارة تحت الخلية الفارغة، أو تحت الخلية المملوءة التي لا يمكن تحليلها، أو تحتهما معًا، أو تحت لا أحد منهما."
        },
        concepts: [
          {
            en: "A blank cell (the source says nothing)",
            ar: "خلية فارغة (المصدر لا يقول شيئًا)"
          },
          {
            en: "A filled cell that cannot be parsed (<code>1,150</code> before the comma is handled, <code>TBD</code>)",
            ar: "خلية مملوءة لا يمكن تحليلها (<code>1,150</code> قبل معالجة الفاصلة، <code>TBD</code>)"
          }
        ],
        neither: true,
        rows: [
          {
            s: {
              en: "After <code>pd.to_numeric(..., errors=\"coerce\")</code> it is <code>NaN</code>",
              ar: "بعد <code>pd.to_numeric(..., errors=\"coerce\")</code> تصير <code>NaN</code>"
            },
            a: 2
          },
          {
            s: {
              en: "Its count is read off before any parsing, as <code>raw.str.strip().eq(\"\").sum()</code>",
              ar: "عددها يُقرأ قبل أي تحليل: <code>raw.str.strip().eq(\"\").sum()</code>"
            },
            a: 0
          },
          {
            s: {
              en: "Its count is the number of <code>NaN</code> after parsing minus the number that were blank before",
              ar: "عددها هو عدد <code>NaN</code> بعد التحليل مطروحًا منه عدد الفارغ قبله"
            },
            a: 1
          },
          {
            s: {
              en: "In the report of the Lesson 6 loader it comes with an example of the offending text and makes the decision STOP",
              ar: "في تقرير محمِّل الدرس 6 تأتي مع مثال من النص المخالف وتجعل القرار STOP"
            },
            a: 1
          },
          {
            s: {
              en: "It can be an honest, expected state of the source, such as a landlord who did not state the rent",
              ar: "قد تكون حالة صادقة متوقَّعة في المصدر، كمالك لم يذكر الإيجار"
            },
            a: 0
          },
          {
            s: {
              en: "A plain <code>isna().sum()</code> counts it, but cannot tell it from the other kind",
              ar: "يعدّها <code>isna().sum()</code> البسيط، لكنه لا يميّزها من النوع الآخر"
            },
            a: 2
          },
          {
            s: {
              en: "It can be replaced by <code>fillna(0)</code> without biasing the average",
              ar: "يمكن استبدالها بـ<code>fillna(0)</code> دون أن يتحيّز المتوسط"
            },
            a: 3
          }
        ],
        hint: {
          en: "For each statement ask where this kind of <code>NaN</code> comes from and what it is evidence of: the source's silence, or a mismatch between the file and the code.",
          ar: "اسأل عن كل عبارة: من أين يأتي هذا النوع من <code>NaN</code> وما الذي يدلّ عليه؟ صمت المصدر، أم عدم تطابق بين الملف والكود."
        },
        explain: {
          en: "After coercion the two kinds are the same <code>NaN</code> (row 1), and a plain <code>isna().sum()</code> adds them into one number (row 6): that is the loss Lesson 3 warned about, 'the reason is lost'. Lesson 6 recovers the reason by counting before parsing: blanks are counted from the text (row 2), failures are what the parse added (row 3), and only failures say that the file and the code disagree, so only they stop the run and are reported with an example (row 4). A blank can be a perfectly honest fact (row 5). <code>fillna(0)</code> is right for neither: it invents a zero rent, lowers the mean and hides the count (row 7).",
          ar: "بعد القسر يصير النوعان <code>NaN</code> واحدة (الصف 1)، ويجمعهما <code>isna().sum()</code> البسيط في رقم واحد (الصف 6): وهذا هو الضياع الذي حذّر منه الدرس 3، «ضاع السبب». ويستعيد الدرس 6 السبب بالعدّ قبل التحليل: يُعدّ الفارغ من النص (الصف 2)، والفاشل هو ما أضافه التحليل (الصف 3)، والفاشل وحده يقول إن الملف والكود مختلفان، ولذلك يوقف التشغيل ويُبلَّغ عنه بمثال (الصف 4). أمّا الفارغ فقد يكون حقيقة صادقة (الصف 5). و<code>fillna(0)</code> لا يصلح لأيٍّ منهما: يخترع إيجارًا صفرًا، ويخفض المتوسط، ويخفي العدد (الصف 7)."
        }
      },

      /* ---------------------------------------------------------- 07 */
      {
        id: "t1cx07",
        type: "trace",
        level: "medium",
        topics: ["t1-model-beliefs", "t1-encoding-by-level", "t1-model-needs-table"],
        q: {
          en: "A rent model was trained on governorate codes made by order of appearance. The next day the same kind of code is built for the new batch to be priced. After the program has run, what are the four values? (<code>weight</code> is invented: what a linear model learned per code step.)",
          ar: "دُرِّب نموذج للإيجارات على رموز المحافظات المصنوعة بترتيب الظهور. وفي اليوم التالي يُبنى الرمز نفسه للدفعة الجديدة التي يُراد تسعيرها. بعد تنفيذ البرنامج، ما القيم الأربع؟ (<code>weight</code> مخترَع: ما تعلّمه نموذج خطي لكل خطوة رمز.)"
        },
        code: code(
          "train_gov = [\"Gaza\", \"Rafah\", \"Gaza\", \"Khan Younis\", \"Rafah\"]",
          "new_gov = [\"Gaza\", \"Khan Younis\", \"Rafah\"]",
          "",
          "train_map = {g: i for i, g in enumerate(dict.fromkeys(train_gov))}",
          "new_map = {g: i for i, g in enumerate(dict.fromkeys(new_gov))}",
          "",
          "weight = 40.0      # NIS of rent per code step, learned in training (invented)",
          "changed = [g for g in train_map if train_map[g] != new_map[g]]",
          "shift = weight * (new_map[\"Rafah\"] - train_map[\"Rafah\"])"
        ),
        blanks: [
          {
            accept: ["1"],
            label: {
              en: "train_map[\"Rafah\"]",
              ar: "train_map[\"Rafah\"]"
            }
          },
          {
            accept: ["2"],
            label: {
              en: "new_map[\"Rafah\"]",
              ar: "new_map[\"Rafah\"]"
            }
          },
          {
            accept: ["2"],
            label: {
              en: "len(changed)",
              ar: "len(changed)"
            }
          },
          {
            accept: ["40.0", "40"],
            label: {
              en: "shift",
              ar: "shift"
            }
          }
        ],
        hint: {
          en: "<code>dict.fromkeys</code> keeps the order in which values first appear. Which value comes first in each list?",
          ar: "<code>dict.fromkeys</code> يحفظ الترتيب الذي تظهر به القيم أول مرة. أيّ قيمة تأتي أولًا في كل قائمة؟"
        },
        explain: {
          en: "The codes depend on which rows happen to come first. In training Rafah is 1; in today's batch it is 2, and Khan Younis moves from 2 to 1. Only Gaza keeps its code, which is why a spot check on one flat would pass. For a model that learned 40 NIS per step, every Rafah flat is now priced 40 NIS higher and every Khan Younis flat 40 lower, and nothing raises: it looks like drift in the data when it is really two different encoders (the AI lens of Lesson 1: the extraction code is part of the model). Fix the categories once, at training time (a fixed <code>CategoricalDtype</code> list, or one-hot columns with a stored column list) and apply that same object to every batch. Better still, as Lesson 2 argued, do not give a nominal column an order at all.",
          ar: "الرموز تتوقف على أيّ الصفوف جاء أولًا. في التدريب رفح 1، وفي دفعة اليوم هي 2، وتنتقل خان يونس من 2 إلى 1. وحدها غزة تحتفظ برمزها، ولذلك يمرّ الفحص السريع على شقة واحدة. ولنموذج تعلّم 40 شيكلًا لكل خطوة، تُسعَّر كل شقة في رفح الآن بزيادة 40 شيكلًا وكل شقة في خان يونس بنقص 40، ولا يُرفع شيء: يبدو الأمر انجرافًا (drift) في البيانات وهو في الحقيقة مشفِّران مختلفان (منظور الذكاء الاصطناعي في الدرس 1: كود الاستخراج جزء من النموذج). ثبّت الفئات مرة واحدة وقت التدريب (قائمة <code>CategoricalDtype</code> ثابتة، أو أعمدة one-hot مع قائمة أعمدة محفوظة) وطبّق الكائن نفسه على كل دفعة. والأفضل، كما جادل الدرس 2، ألا تُعطى الأعمدة الاسمية ترتيبًا أصلًا."
        }
      },

      /* ---------------------------------------------------------- 08 */
      {
        id: "t1cx08",
        type: "output",
        level: "medium",
        topics: ["t1-advert-parser-evolution", "t1-int-float-nan", "t1-not-found-and-ranges"],
        q: {
          en: "Four adverts are parsed with one pattern per field and a <code>None</code> for 'not found' (Lesson 1), then put into a table (Lesson 3). Write exactly what the program prints (three lines).",
          ar: "تُحلَّل أربعة إعلانات بنمط لكل حقل مع <code>None</code> عند «لم يُوجد» (الدرس 1)، ثم توضع في جدول (الدرس 3). اكتب بالضبط ما يطبعه البرنامج (ثلاثة أسطر)."
        },
        code: code(
          "import re",
          "import pandas as pd",
          "",
          "ads = [",
          "    \"Flat in Rafah, 3 rooms, 95 m2, 300 USD/month, furnished\",",
          "    \"Family apartment in Gaza City, 4 rooms, 120 sqm, 1,200 NIS/month\",",
          "    \"Studio in Khan Younis - 45 m2 - 150 USD monthly\",",
          "    \"Flat in Jabalia, 2 rooms, 70 m2\",",
          "]",
          "",
          "def grab(pattern, text):",
          "    m = re.search(pattern, text)",
          "    return int(m.group(1).replace(\",\", \"\")) if m else None",
          "",
          "table = pd.DataFrame({",
          "    \"rooms\": [grab(r\"(\\d+)\\s*rooms?\", ad) for ad in ads],",
          "    \"rent\": [grab(r\"(\\d[\\d,]*)\\s*(?:USD|NIS)\", ad) for ad in ads],",
          "})",
          "print(table[\"rooms\"].dtype)",
          "print(len(table.dropna()), \"of\", len(table), \"rows survive dropna\")",
          "print(table.dropna()[\"rent\"].mean())"
        ),
        blanks: [
          {
            accept: ["float64\n2 of 4 rows survive dropna\n750.0"],
            lines: 3
          }
        ],
        hint: {
          en: "A <code>None</code> in a list of whole numbers changes the column's dtype. Then ask which adverts have both fields, and what unit each rent is in.",
          ar: "وجود <code>None</code> في قائمة أعداد صحيحة يغيّر نوع العمود. ثم اسأل: أيّ الإعلانات فيها الحقلان معًا، وبأي وحدة كل إيجار؟"
        },
        explain: {
          en: "Two <code>None</code> values turn <code>rooms</code> from whole numbers into <code>float64</code> (a gap forces a float, Lesson 3). <code>dropna()</code> keeps only the two adverts that have both fields, so 2 of 4 survive, and the survivors are the two adverts written in the expected template: the studio (dashes, no rooms) and the advert without a rent are gone. A model trained on them has never seen a studio (the AI lens of Lesson 1: which rows go missing is rarely random). The mean 750.0 is (300 + 1200) / 2, a dollar rent and a shekel rent added as if they were the same unit: a number in no currency, and no error anywhere. The parser needs the currency in its own column (Version 3 of Lesson 1) and the missing rows need a decision, not a <code>dropna()</code>.",
          ar: "قيمتا <code>None</code> تحوّلان <code>rooms</code> من أعداد صحيحة إلى <code>float64</code> (الفراغ يفرض نوعًا عشريًّا، الدرس 3). ويُبقي <code>dropna()</code> الإعلانين اللذين فيهما الحقلان معًا فقط، فينجو 2 من 4، والناجيان هما الإعلانان المكتوبان على القالب المتوقَّع: ذهب الاستوديو (شرطات وبلا غرف) وذهب الإعلان بلا إيجار. ونموذج يتدرّب عليهما لم ير استوديو قط (منظور الذكاء الاصطناعي في الدرس 1: الصفوف المفقودة نادرًا ما تكون عشوائية). والمتوسط 750.0 هو (300 + 1200) / 2، إيجار بالدولار وإيجار بالشيكل جُمعا كأنهما وحدة واحدة: رقم بلا عملة ولا خطأ في أي مكان. يحتاج المحلِّل إلى العملة في عمود مستقل (النسخة 3 من الدرس 1)، وتحتاج الصفوف المفقودة إلى قرار لا إلى <code>dropna()</code>."
        }
      },

      /* ---------------------------------------------------------- 09 */
      {
        id: "t1cx09",
        type: "ordercode",
        level: "medium",
        topics: ["t1-fetch-all", "t1-api-validation", "t1-validate-function"],
        lang: "python",
        q: {
          en: "The registry is fetched, checked and analysed in one script. <code>make_fake_get</code>, <code>fetch_all</code>, <code>validate</code>, <code>decide</code>, <code>SCHOOLS</code>, <code>URL</code> and <code>pd</code> are already defined as in Lessons 5 and 6. Put the statements in an order that runs, with three rules: the validator must be able to hash every cell of the table, a rejected table must never reach the saved snapshot, and the analysis must read the snapshot, not the live table.",
          ar: "يُجلَب سجل المدارس ويُفحص ويُحلَّل في سكربت واحد. الدوال <code>make_fake_get</code> و<code>fetch_all</code> و<code>validate</code> و<code>decide</code> والمتغيرات <code>SCHOOLS</code> و<code>URL</code> و<code>pd</code> معرَّفة سلفًا كما في الدرسين 5 و6. رتّب العبارات ترتيبًا يعمل، بثلاث قواعد: يجب أن يستطيع المدقِّق تجزئة (hash) كل خلية في الجدول، ويجب ألا يصل جدول مرفوض إلى اللقطة المحفوظة، ويجب أن يقرأ التحليل اللقطةَ لا الجدول الحيّ."
        },
        items: [
          {
            code: "get = make_fake_get()"
          },
          {
            code: "df = fetch_all(get, URL)"
          },
          {
            code: "df[\"facilities\"] = df[\"facilities\"].map(\",\".join)"
          },
          {
            code: "problems = validate(df, SCHOOLS)"
          },
          {
            code: code(
              "if decide(problems) == \"STOP\":",
              "    raise SystemExit(\"registry table rejected\")"
            )
          },
          {
            code: "df.to_csv(\"schools_2026-05-10.csv\", index=False)"
          },
          {
            code: "snapshot = pd.read_csv(\"schools_2026-05-10.csv\")"
          },
          {
            code: "print(snapshot.groupby(\"governorate\")[\"enrolment_boys\"].mean().round(1))"
          }
        ],
        answer: [0, 1, 2, 3, 4, 5, 6, 7],
        hint: {
          en: "Follow what each statement produces for the next one. Which statement fails with a <code>TypeError</code> if the list column is still a list?",
          ar: "تتبّع ما تنتجه كل عبارة للتي بعدها. أيّ عبارة تفشل بـ<code>TypeError</code> إن بقي عمود القوائم قائمة؟"
        },
        explain: {
          en: "The getter comes first, then <code>fetch_all</code> (Lesson 5), which already guarantees the status codes, the pages and the count. The <code>facilities</code> lists must become text before the validator runs, because <code>validate()</code> calls <code>df.duplicated()</code>, which cannot hash a list and raises a <code>TypeError</code> (Lesson 6). <code>validate</code> produces the problems that <code>decide</code> turns into one word, and the stop must come before the file is written; otherwise the 'snapshot' would hold a table that was rejected. Writing the dated file and then reading the analysis from it is the lineage habit of Lesson 6: tomorrow the same number can be reproduced from the same bytes. The only silent order here is a snapshot written before the check: it runs, and it pollutes the cache.",
          ar: "يأتي المُحصِّل (getter) أولًا، ثم <code>fetch_all</code> (الدرس 5) الذي يضمن سلفًا رموز الحالة والصفحات والعدد. ويجب تحويل قوائم <code>facilities</code> إلى نص قبل تشغيل المدقِّق، لأن <code>validate()</code> تستدعي <code>df.duplicated()</code> التي لا تستطيع تجزئة قائمة فترفع <code>TypeError</code> (الدرس 6). ثم تنتج <code>validate</code> المشكلات التي تحوّلها <code>decide</code> إلى كلمة واحدة، ويجب أن يأتي التوقف قبل كتابة الملف وإلا حوت «اللقطة» جدولًا مرفوضًا. وكتابة الملف المؤرَّخ ثم قراءة التحليل منه هي عادة النسب في الدرس 6: غدًا يمكن إعادة الرقم نفسه من البايتات نفسها. والترتيب الصامت الوحيد هنا لقطة تُكتب قبل الفحص: تعمل، وتلوّث الذاكرة المخبّأة."
        }
      },

      /* ---------------------------------------------------------- 10 */
      {
        id: "t1cx10",
        type: "mcq",
        level: "medium",
        topics: ["t1-casting-tools", "t1-coerce-and-count", "t1-loader-versions"],
        q: {
          en: "A ministry file should contain only clean whole numbers in its <code>students</code> column. It arrives every month with about 20,000 rows, and one wrong cell would silently change a funding report. Which way of turning the text column into numbers is the best default, and why?",
          ar: "يُفترض أن يحوي ملف وزارة أعدادًا صحيحة نظيفة فقط في عمود <code>students</code>. يصل كل شهر بنحو 20 ألف صف، وخلية خاطئة واحدة ستغيّر تقريرًا للتمويل بصمت. ما أفضل طريقة افتراضية لتحويل العمود النصي إلى أرقام، ولماذا؟"
        },
        options: [
          {
            en: "<code>raw.astype(\"Int64\")</code>: it is strict and stops the run at the first surprise, so it is always the best default for a column that should be clean.",
            ar: "<code>raw.astype(\"Int64\")</code>: فهو صارم ويوقف التشغيل عند أول مفاجأة، ولذلك فهو دائمًا أفضل خيار افتراضي لعمود يُفترض أنه نظيف."
          },
          {
            en: "<code>pd.to_numeric(raw, errors=\"coerce\")</code>, then count what the conversion swallowed (<code>out.isna() &amp; raw.notna()</code>), list the offending cells, and stop when the count is above zero.",
            ar: "<code>pd.to_numeric(raw, errors=\"coerce\")</code> ثم عدّ ما ابتلعه التحويل (<code>out.isna() &amp; raw.notna()</code>)، واعرض الخلايا المخالفة، وتوقّف إن زاد العدد على صفر."
          },
          {
            en: "<code>pd.to_numeric(raw, errors=\"coerce\")</code> followed by <code>dropna()</code>: the conversion never raises, the bad rows disappear, and the report runs on the clean part.",
            ar: "<code>pd.to_numeric(raw, errors=\"coerce\")</code> يتبعها <code>dropna()</code>: لا يرفع التحويل خطأً قط، وتختفي الصفوف السيئة، ويعمل التقرير على الجزء النظيف."
          },
          {
            en: "<code>pd.to_numeric(raw, errors=\"coerce\").fillna(0)</code>: zero students is a valid count, so the column stays complete and nothing is lost.",
            ar: "<code>pd.to_numeric(raw, errors=\"coerce\").fillna(0)</code>: صفر طالب عدد صالح، فيبقى العمود كاملًا ولا يضيع شيء."
          }
        ],
        answer: 1,
        hint: {
          en: "Compare what the owner of the file learns from each policy after a single run, and what each one does to the bad rows.",
          ar: "قارن ما يتعلّمه صاحب الملف من كل سياسة بعد تشغيل واحد، وما تفعله كل منها بالصفوف السيئة."
        },
        explain: {
          en: "The choice is a trade-off. The strict <code>astype</code> is a good default when a column should be clean and small (Lesson 3, honest accounting): it stops at the first surprise. But its message names one cell, so on a file of 20,000 rows the owner receives the list one crash at a time, and every fix-and-rerun costs a full read of the file. Coerce, count, list and stop keeps the same safety and adds the whole list in one run, which is the rule the Lesson 6 loader applies (any failed parse means STOP). <code>dropna()</code> deletes the evidence together with the rows, and <code>fillna(0)</code> invents zero-student schools; both end in a report that runs and is wrong. Rule: coerce is a tool, never a policy; the policy is the count and the stop.",
          ar: "الاختيار مفاضلة. <code>astype</code> الصارم خيار افتراضي جيد حين يُفترض أن يكون العمود نظيفًا وصغيرًا (الدرس 3، الحصر الأمين): يتوقف عند أول مفاجأة. لكن رسالته تسمّي خلية واحدة، فيتلقّى صاحب ملف من 20 ألف صف القائمة خطأً بعد خطأ، وكل إصلاح وإعادة تشغيل يكلّف قراءة كاملة للملف. أما القسر مع العدّ وسرد الخلايا والتوقف فيحفظ الأمان نفسه ويضيف القائمة كلها في تشغيل واحد، وهي القاعدة التي يطبّقها محمِّل الدرس 6 (أي تحليل فاشل يعني STOP). أمّا <code>dropna()</code> فيحذف الدليل مع الصفوف، و<code>fillna(0)</code> يخترع مدارس بلا طلاب؛ وكلاهما ينتهي بتقرير يعمل وهو خاطئ. القاعدة: القسر أداة وليس سياسة؛ السياسة هي العدّ والتوقف."
        }
      },

      /* ---------------------------------------------------------- 11 */
      {
        id: "t1cx11",
        type: "multi",
        level: "medium",
        topics: ["t1-list-of-dicts-limits", "t1-id-leading-zeros", "t1-safe-access"],
        q: {
          en: "A training table is built from four sources. Which of these slips run to the end and hand the model a table that looks plausible but is wrong, with no exception anywhere? (Choose all that apply.)",
          ar: "يُبنى جدول تدريب من أربعة مصادر. أيّ هذه الهفوات يعمل حتى النهاية ويسلّم النموذج جدولًا يبدو معقولًا وهو خاطئ، دون أي استثناء؟ (اختر كل ما ينطبق.)"
        },
        options: [
          {
            en: "Reading <code>landlords.csv</code> with <code>pd.read_csv(path)</code> when the IDs are <code>0071</code>, <code>0102</code>, <code>0345</code>",
            ar: "قراءة <code>landlords.csv</code> بـ<code>pd.read_csv(path)</code> حين تكون المعرّفات <code>0071</code> و<code>0102</code> و<code>0345</code>"
          },
          {
            en: "Converting a rent column that contains <code>n/a</code> with <code>raw.astype(float)</code>",
            ar: "تحويل عمود إيجارات فيه <code>n/a</code> بـ<code>raw.astype(float)</code>"
          },
          {
            en: "Reading a cp1256 file with <code>encoding=\"utf-8\"</code>",
            ar: "قراءة ملف cp1256 بـ<code>encoding=\"utf-8\"</code>"
          },
          {
            en: "Counting the emails with <code>dig(s, \"contact\", \"email\")</code>, a typo for <code>contacts</code>",
            ar: "عدّ البريد الإلكتروني بـ<code>dig(s, \"contact\", \"email\")</code>، وهي خطأ مطبعي عن <code>contacts</code>"
          },
          {
            en: "Taking <code>s[\"contacts\"][\"email\"]</code> for every school of the registry",
            ar: "أخذ <code>s[\"contacts\"][\"email\"]</code> لكل مدرسة في السجل"
          },
          {
            en: "Reading the rents of a <code>csv.DictReader</code> with <code>float(x or 0)</code>",
            ar: "قراءة إيجارات <code>csv.DictReader</code> بـ<code>float(x or 0)</code>"
          },
          {
            en: "Calling the result of <code>get(URL).json()[\"results\"]</code> «the registry» on a good day",
            ar: "تسمية ناتج <code>get(URL).json()[\"results\"]</code> «السجل» في يوم هادئ"
          },
          {
            en: "Calling <code>json.loads</code> on a model reply that starts with «Sure! Here is the JSON:»",
            ar: "استدعاء <code>json.loads</code> على ردّ نموذج يبدأ بـ«Sure! Here is the JSON:»"
          }
        ],
        answer: [0, 3, 5, 6],
        hint: {
          en: "For each slip ask: does Python have anything to complain about, or is every value a perfectly legal value of its type?",
          ar: "اسأل عن كل هفوة: هل عند بايثون ما تشتكي منه، أم أن كل قيمة قيمة قانونية تمامًا في نوعها؟"
        },
        explain: {
          en: "Silent: the IDs become the integers 71, 102, 345 (Lesson 4), the typo in <code>dig</code> answers «0 of 13 schools have an email» (Lesson 5), <code>float(x or 0)</code> turns an unknown rent into a rent of zero (Lesson 3), and the first page alone returns 5 schools of 13 (Lesson 5). Each leaves a legal table. Loud: <code>astype(float)</code> raises on <code>n/a</code>, a cp1256 byte such as <code>c7</code> is almost never valid UTF-8, <code>[\"contacts\"][\"email\"]</code> raises a <code>KeyError</code>, and <code>json.loads</code> rejects the polite sentence in front of the JSON. A loud failure is the good kind: it costs you an afternoon, not a model. The dangerous direction is always the one in which every value is legal and the whole is false.",
          ar: "الصامت: المعرّفات تصير الأعداد 71 و102 و345 (الدرس 4)، والخطأ المطبعي في <code>dig</code> يجيب «0 من 13 مدرسة لها بريد» (الدرس 5)، و<code>float(x or 0)</code> يحوّل إيجارًا مجهولًا إلى إيجار صفر (الدرس 3)، والصفحة الأولى وحدها تعيد 5 مدارس من 13 (الدرس 5). وكل منها يترك جدولًا قانونيًّا. أمّا الصاخب: فـ<code>astype(float)</code> يرفع خطأً عند <code>n/a</code>، وبايت cp1256 مثل <code>c7</code> نادرًا ما يكون UTF-8 صالحًا، و<code>[\"contacts\"][\"email\"]</code> يرفع <code>KeyError</code>، و<code>json.loads</code> يرفض الجملة المهذّبة التي قبل JSON. والفشل الصاخب هو النوع الجيد: يكلّفك عصرًا لا نموذجًا. والاتجاه الخطِر دائمًا هو الذي تكون فيه كل قيمة قانونية والكل زائفًا."
        }
      },

      /* ---------------------------------------------------------- 12 */
      {
        id: "t1cx12",
        type: "error",
        level: "medium",
        topics: ["t1-id-leading-zeros", "t1-zero-in-identifiers", "t1-numbers-that-name"],
        q: {
          en: "Two of the three landlords are verified, so the share should print <code>0.67</code>. The program prints <code>0.0</code>, and nothing is raised. (The merge first raised a <code>ValueError</code>, int against text; the <code>astype(str)</code> line was the quick fix.) Click the line that is the <em>cause</em>, not a line where the damage becomes visible.",
          ar: "اثنان من المالكين الثلاثة موثَّقان، فيجب أن تطبع النسبة <code>0.67</code>. لكن البرنامج يطبع <code>0.0</code> ولا يُرفع شيء. (رفع الدمج أولًا <code>ValueError</code>، عدد صحيح مقابل نص؛ وسطر <code>astype(str)</code> كان الحل السريع.) انقر السطر الذي هو <em>السبب</em>، لا سطرًا يظهر فيه الضرر."
        },
        code: code(
          "import io",
          "import pandas as pd",
          "",
          "landlords = \"landlord_id,name,units\\n0071,Abu Samir,3\\n0102,Um Khaled,1\\n0345,Abu Ahmad,2\\n\"",
          "labels = pd.DataFrame({\"landlord_id\": [\"0071\", \"0102\", \"0345\"], \"verified\": [1, 0, 1]})",
          "",
          "df = pd.read_csv(io.StringIO(landlords))",
          "df[\"landlord_id\"] = df[\"landlord_id\"].astype(str)",
          "train = df.merge(labels, on=\"landlord_id\", how=\"left\")",
          "train[\"verified\"] = train[\"verified\"].fillna(0)",
          "print(\"verified share:\", round(train[\"verified\"].mean(), 2))"
        ),
        answer: 7,
        solution: {
          code: code(
            "df = pd.read_csv(io.StringIO(landlords), dtype={\"landlord_id\": \"string\"})",
            "train = df.merge(labels, on=\"landlord_id\", how=\"left\")",
            "print(train[\"verified\"].isna().sum(), \"labels missing\")",
            "print(\"verified share:\", round(train[\"verified\"].mean(), 2))"
          ),
          out: "0 labels missing\nverified share: 0.67",
          en: "Read the ID as text at the reader, drop the quick fix, and count the labels the join could not match before filling anything.",
          ar: "اقرأ المعرّف نصًّا عند القارئ، واحذف الحل السريع، وعدّ العلامات التي لم يستطع الدمج مطابقتها قبل أن تملأ أي شيء."
        },
        hint: {
          en: "Follow the ID <code>0071</code> from the string to the merge. At which line does it stop being <code>0071</code>?",
          ar: "تتبّع المعرّف <code>0071</code> من النص إلى الدمج. في أي سطر يتوقف عن أن يكون <code>0071</code>؟"
        },
        explain: {
          en: "The cause is the reader (line 7). Without <code>dtype</code>, <code>0071</code>, <code>0102</code> and <code>0345</code> become the integers 71, 102 and 345 and the zeros are gone for good. The merge then complained, which was the good news; <code>astype(str)</code> made both sides text, so the merge ran and matched nothing (<code>'71'</code> is not <code>'0071'</code>), the left join filled every label with <code>NaN</code>, and <code>fillna(0)</code> turned that into «not verified» for every landlord. Each later line hides the symptom a little more, but only line 7 is wrong. A model fitted on this learns that nobody is verified, and its accuracy will not tell you why. Rule: an ID is a name (Lesson 2), so say so at the reader (Lesson 4), and count the unmatched labels after a join before you fill.",
          ar: "السبب هو القارئ (السطر 7). بلا <code>dtype</code> تصير <code>0071</code> و<code>0102</code> و<code>0345</code> الأعداد 71 و102 و345 وتضيع الأصفار نهائيًّا. اشتكى الدمج بعد ذلك، وكان هذا هو الخبر الجيد؛ ثم جعل <code>astype(str)</code> الطرفين نصًّا فعمل الدمج ولم يطابق شيئًا (<code>'71'</code> ليست <code>'0071'</code>)، وملأ الدمج الأيسر كل العلامات بـ<code>NaN</code>، وحوّلها <code>fillna(0)</code> إلى «غير موثَّق» لكل مالك. كل سطر لاحق يخفي العَرَض أكثر، لكن السطر 7 وحده هو الخطأ. ونموذج يُدرَّب على هذا يتعلّم أن لا أحد موثَّق، ولن تقول لك دقته لماذا. القاعدة: المعرّف اسم (الدرس 2)، فقلها عند القارئ (الدرس 4)، وعدّ العلامات غير المطابقة بعد الدمج قبل أن تملأ."
        }
      },

      /* ---------------------------------------------------------- 13 */
      {
        id: "t1cx13",
        type: "contrast",
        level: "hard",
        topics: ["t1-summary-by-level", "t1-category-ordered", "t1-capstone-dtypes"],
        q: {
          en: "Two answers to «what may I do with this column?» sit on the same thread. Place each statement under the level kept in a dictionary beside the data (<code>LEVEL</code>, <code>ORDER</code> and <code>summary_for</code>, Lesson 2), under the level written into the dtype (<code>category</code>, ordered <code>CategoricalDtype</code>, <code>Int64</code>, <code>datetime64</code>, Lesson 3), under both, or under neither.",
          ar: "جوابان عن «ماذا يجوز أن أفعل بهذا العمود؟» يقعان على الخيط نفسه. ضع كل عبارة تحت المستوى المحفوظ في قاموس بجانب البيانات (<code>LEVEL</code> و<code>ORDER</code> و<code>summary_for</code>، الدرس 2)، أو تحت المستوى المكتوب في النوع (<code>category</code> و<code>CategoricalDtype</code> مرتَّبًا و<code>Int64</code> و<code>datetime64</code>، الدرس 3)، أو تحتهما معًا، أو تحت لا أحد منهما."
        },
        concepts: [
          {
            en: "The level in a dictionary beside the data (Lesson 2)",
            ar: "المستوى في قاموس بجانب البيانات (الدرس 2)"
          },
          {
            en: "The level in the dtype (Lesson 3)",
            ar: "المستوى في النوع (الدرس 3)"
          }
        ],
        neither: true,
        rows: [
          {
            s: {
              en: "Asking for the mean of a nominal column makes pandas itself raise a <code>TypeError</code>",
              ar: "طلب متوسط عمود اسمي يجعل pandas نفسها ترفع <code>TypeError</code>"
            },
            a: 1
          },
          {
            s: {
              en: "It needs nothing but plain dictionaries and an <code>if/elif</code> chain",
              ar: "لا يحتاج إلا إلى قواميس عادية وسلسلة <code>if/elif</code>"
            },
            a: 0
          },
          {
            s: {
              en: "A spelling missing from the declared order silently becomes <code>NaN</code>",
              ar: "تهجئة غائبة عن الترتيب المعلَن تصير <code>NaN</code> بصمت"
            },
            a: 2
          },
          {
            s: {
              en: "It can tell, without being told, that the integer column <code>listing_id</code> is a name and not a quantity",
              ar: "يستطيع أن يعرف، دون أن يُخبَر، أن العمود الصحيح <code>listing_id</code> اسم لا كمية"
            },
            a: 3
          },
          {
            s: {
              en: "The declaration travels with the DataFrame into the next function",
              ar: "يسافر التصريح مع الجدول (DataFrame) إلى الدالة التالية"
            },
            a: 1
          },
          {
            s: {
              en: "It can say that <code>classroom_temp_c</code> is interval while <code>repair_weeks</code> is ratio, although both are <code>float64</code>",
              ar: "يستطيع أن يقول إن <code>classroom_temp_c</code> فتري و<code>repair_weeks</code> نسبي مع أن كليهما <code>float64</code>"
            },
            a: 0
          },
          {
            s: {
              en: "The median of an ordinal column still has to be taken through integer codes or ranks",
              ar: "ما زال لا بد من أخذ وسيط العمود الترتيبي عبر رموز صحيحة أو رتب"
            },
            a: 2
          }
        ],
        hint: {
          en: "For each statement ask who does the work: a person who typed the level, pandas that enforces a declaration, or nobody.",
          ar: "اسأل عن كل عبارة: من يقوم بالعمل؟ شخص كتب المستوى، أم pandas التي تفرض تصريحًا، أم لا أحد."
        },
        explain: {
          en: "Only the dtype makes pandas itself refuse the wrong operation (a mean on a <code>category</code>) and carry the declaration along (rows 1 and 5). Only the dictionary can say more than a dtype can: for plain numbers, interval against ratio is a distinction that no dtype has (row 6), and it needs nothing but plain Python (row 2). They share the same gap: a value outside the declared order becomes <code>NaN</code> in both (row 3), the median still goes through codes or ranks in both (row 7), and neither can tell that an integer column is an identifier, because a level is a human judgement (row 4). That is the «still open» of the thread: the dtype is not the level, it is where you write the level down.",
          ar: "وحده النوع يجعل pandas نفسها ترفض العملية الخاطئة (المتوسط على <code>category</code>) ويحمل التصريح معه (الصفان 1 و5). ووحده القاموس يستطيع أن يقول أكثر مما يقوله النوع: التفريق بين الفتري والنسبي في الأعداد العادية لا يملكه أي نوع (الصف 6)، ولا يحتاج إلا إلى بايثون عادية (الصف 2). وللاثنين الفجوة نفسها: القيمة الخارجة عن الترتيب المعلَن تصير <code>NaN</code> في كليهما (الصف 3)، وما زال الوسيط يمرّ بالرموز أو الرتب في كليهما (الصف 7)، ولا يستطيع أيٌّ منهما أن يعرف أن عمودًا صحيحًا معرّف، لأن المستوى حكم بشري (الصف 4). وهذا هو «ما زال مفتوحًا» في الخيط: النوع ليس المستوى، بل هو المكان الذي تكتب فيه المستوى."
        }
      },

      /* ---------------------------------------------------------- 14 */
      {
        id: "t1cx14",
        type: "complete",
        level: "hard",
        topics: ["t1-blank-vs-failed", "t1-coerce-and-count", "t1-loader-versions"],
        lang: "python",
        q: {
          en: "The loader of Lesson 6 reads the file as text (<code>dtype=str, keep_default_na=False</code>), so a blank cell arrives as <code>''</code> and nothing is <code>NaN</code> yet. Complete <code>failed</code> so that, for the texts <code>[\"415\", \"1,150\", \"\", \"TBD\"]</code>, only <code>TBD</code> is reported as a parse failure: the blank is a blank, and <code>1,150</code> parses once its comma is removed.",
          ar: "يقرأ محمِّل الدرس 6 الملف نصًّا (<code>dtype=str, keep_default_na=False</code>)، فتصل الخلية الفارغة <code>''</code> ولا شيء <code>NaN</code> بعد. أكمل <code>failed</code> بحيث يُبلَّغ في النصوص <code>[\"415\", \"1,150\", \"\", \"TBD\"]</code> عن <code>TBD</code> وحدها كتحليل فاشل: الفارغ فارغ، و<code>1,150</code> تُحلَّل بعد حذف فاصلتها."
        },
        code: code(
          "def coerce_number(text):",
          "    blank = text.str.strip().eq(\"\")",
          "    cells = text.mask(blank)                         # blanks become <NA>",
          "    typed = pd.to_numeric(cells.str.replace(\",\", \"\", regex=False), errors=\"coerce\")",
          "    failed = ____",
          "    return typed, text[failed]"
        ),
        options: [
          {
            code: "typed.isna() & text.notna()"
          },
          {
            code: "typed.isna()"
          },
          {
            code: "typed.isna() & cells.isna()"
          },
          {
            code: "typed.isna() & cells.notna()"
          }
        ],
        answer: 3,
        solution: {
          code: code(
            "def coerce_number(text):",
            "    blank = text.str.strip().eq(\"\")",
            "    cells = text.mask(blank)                         # blanks become <NA>",
            "    typed = pd.to_numeric(cells.str.replace(\",\", \"\", regex=False), errors=\"coerce\")",
            "    failed = typed.isna() & cells.notna()            # missing now, but something was in the cell",
            "    return typed, text[failed]"
          ),
          out: "typed: [415.0, 1150.0, nan, nan]; text[failed]: ['TBD']",
          en: "The mask of Lesson 3 needs the column in which the blanks were already marked: cells, not text.",
          ar: "قناع الدرس 3 يحتاج إلى العمود الذي عُلِّمت فيه الفراغات سلفًا: cells لا text."
        },
        hint: {
          en: "Lesson 3's mask was <code>rent.isna() &amp; raw.notna()</code>. What does <code>text.notna()</code> say for the empty string when nothing was read as missing?",
          ar: "قناع الدرس 3 كان <code>rent.isna() &amp; raw.notna()</code>. ماذا تقول <code>text.notna()</code> عن السلسلة الفارغة حين لا شيء قُرئ مفقودًا؟"
        },
        explain: {
          en: "<code>typed.isna() &amp; text.notna()</code> is the mask of Lesson 3 copied unchanged. There, <code>raw</code> came from <code>read_csv</code>, where a blank was already <code>NaN</code>, so <code>notna()</code> meant «something was in the cell». Here <code>keep_default_na=False</code> keeps the text intact, so <code>text.notna()</code> is true everywhere, the option collapses into <code>typed.isna()</code>, and the blank is reported as a failure: the loader would STOP on every file that has an honest blank. <code>typed.isna() &amp; cells.isna()</code> selects exactly the blanks, the opposite of what is wanted. The right mask uses <code>cells</code>, the text in which the blanks were already marked: «missing now, but something was in the cell». A mask is only as good as the column it asks about.",
          ar: "<code>typed.isna() &amp; text.notna()</code> هو قناع الدرس 3 منسوخًا كما هو. هناك كان <code>raw</code> قادمًا من <code>read_csv</code> حيث الفارغ <code>NaN</code> سلفًا، فكانت <code>notna()</code> تعني «كان في الخلية شيء». أما هنا فـ<code>keep_default_na=False</code> يترك النص كما هو، فتكون <code>text.notna()</code> صحيحة في كل موضع، ويتحوّل الخيار إلى <code>typed.isna()</code>، ويُبلَّغ عن الفارغ كأنه فشل: وسيتوقف المحمِّل عند كل ملف فيه فراغ صادق. أمّا <code>typed.isna() &amp; cells.isna()</code> فتختار الفارغات بالضبط، عكس المطلوب. القناع الصحيح يستعمل <code>cells</code>، النص الذي عُلِّمت فيه الفراغات سلفًا: «مفقود الآن، لكن كان في الخلية شيء». والقناع لا يكون أحسن من العمود الذي يسأل عنه."
        }
      },

      /* ---------------------------------------------------------- 15 */
      {
        id: "t1cx15",
        type: "compare",
        level: "hard",
        topics: ["t1-coerce-and-count", "t1-na-values", "t1-blank-vs-failed"],
        q: {
          en: "Both programs read the same text, <code>txt = 'id,rent\\n1,415\\n2,\"1,150\"\\n3,n/a\\n4,TBD\\n5,\\n6,445\\n'</code> (<code>io</code> and <code>pd</code> are imported), and convert the rents after removing the comma of <code>1,150</code>. A is the count of Lesson 3 on a default read; B is the way of the Lesson 6 loader. Which statement is correct?",
          ar: "يقرأ البرنامجان النص نفسه، <code>txt = 'id,rent\\n1,415\\n2,\"1,150\"\\n3,n/a\\n4,TBD\\n5,\\n6,445\\n'</code> (<code>io</code> و<code>pd</code> مستورَدتان)، ويحوّلان الإيجارات بعد حذف فاصلة <code>1,150</code>. أ هو عدّ الدرس 3 على قراءة افتراضية؛ وب هو طريقة محمِّل الدرس 6. أيّ العبارات صحيحة؟"
        },
        codeA: code(
          "col = pd.read_csv(io.StringIO(txt))[\"rent\"]",
          "cells = col.str.replace(\",\", \"\")",
          "rent = pd.to_numeric(cells, errors=\"coerce\")",
          "print((rent.isna() & col.notna()).sum(), \"swallowed\")"
        ),
        codeB: code(
          "raw = pd.read_csv(io.StringIO(txt), dtype=str,",
          "    keep_default_na=False)[\"rent\"]",
          "blank = raw.str.strip().eq(\"\")",
          "cells = raw.mask(blank).str.replace(\",\", \"\")",
          "rent = pd.to_numeric(cells, errors=\"coerce\")",
          "failed = rent.isna() & ~blank",
          "print(blank.sum(), \"blank\")",
          "print(failed.sum(), \"failed\", raw[failed].tolist())"
        ),
        options: [
          {
            en: "A prints <code>1 swallowed</code>; B prints <code>1 blank</code> and <code>2 failed ['n/a', 'TBD']</code>: <code>read_csv</code> had already turned <code>n/a</code> into <code>NaN</code> before A's count could look, while B decides about <code>n/a</code> in the open.",
            ar: "تطبع أ <code>1 swallowed</code>؛ وتطبع ب <code>1 blank</code> و<code>2 failed ['n/a', 'TBD']</code>: كانت <code>read_csv</code> قد حوّلت <code>n/a</code> إلى <code>NaN</code> قبل أن يتمكن عدّ أ من النظر، بينما تقرّر ب بشأن <code>n/a</code> علنًا."
          },
          {
            en: "They report the same problem: B is only a longer way to write A, because both end by counting the cells that became <code>NaN</code> although they held something in the file.",
            ar: "يبلّغان عن المشكلة نفسها: ب مجرد طريقة أطول لكتابة أ، لأن كليهما ينتهي بعدّ الخلايا التي صارت <code>NaN</code> مع أنها كانت تحمل شيئًا في الملف."
          },
          {
            en: "A is wrong because it counts the empty cell as a failure, and B repairs that by not counting it; the two agree on <code>n/a</code>, which both report as a failure to be fixed.",
            ar: "أ خاطئة لأنها تعدّ الخلية الفارغة فشلًا، وتصلح ب ذلك بألّا تعدّها؛ ويتفقان على <code>n/a</code> الذي يبلّغان كلاهما عنه فشلًا يجب إصلاحه."
          },
          {
            en: "B reports more problems because it is stricter about numbers: unlike A, it refuses <code>1,150</code> and counts it as a failed parse, which is why its tally is larger.",
            ar: "تبلّغ ب عن مشكلات أكثر لأنها أشدّ صرامة في الأرقام: تَرفض <code>1,150</code> خلافًا لأ وتعدّها تحليلًا فاشلًا، ولهذا يكبر عدّها."
          }
        ],
        answer: 0,
        hint: {
          en: "Which cells are already <code>NaN</code> when A's mask runs? Check the default list of missing-value strings in Lesson 4.",
          ar: "أيّ الخلايا تكون <code>NaN</code> سلفًا حين يعمل قناع أ؟ راجع القائمة الافتراضية لنصوص القيم المفقودة في الدرس 4."
        },
        explain: {
          en: "Running both gives: A prints <code>1 swallowed</code>, B prints <code>1 blank</code> and <code>2 failed ['n/a', 'TBD']</code>. <code>n/a</code> is on pandas' default list of missing-value strings, so in A it is a <code>NaN</code> before the count starts: its mask sees one filled cell that failed (<code>TBD</code>) and cannot tell the empty cell from <code>n/a</code>. B reads everything as text, so <code>n/a</code> is just a word that did not parse, and the loader must be told, in the schema, that it means «missing» (<code>na_values</code>). That is what «the decision in the open» means: the default list of Lesson 4 is a decision made for you. Both remove the comma of <code>1,150</code>, so neither rejects it, which rules out «B is stricter about numbers»; and A does not count the empty cell as a failure, because <code>read_csv</code> already made it <code>NaN</code>, which rules out «A counts the blank». The price of B is a stricter first run; the gain is a count you can trust.",
          ar: "تشغيل الاثنين يعطي: تطبع أ <code>1 swallowed</code> وتطبع ب <code>1 blank</code> و<code>2 failed ['n/a', 'TBD']</code>. <code>n/a</code> في القائمة الافتراضية لنصوص القيم المفقودة في pandas، فهي في أ <code>NaN</code> قبل أن يبدأ العدّ: يرى قناعها خلية مملوءة واحدة فشلت (<code>TBD</code>) ولا يميّز الخلية الفارغة من <code>n/a</code>. أما ب فتقرأ كل شيء نصًّا، فتكون <code>n/a</code> مجرد كلمة لم تُحلَّل، ويجب أن يُقال للمحمِّل في المخطط إنها تعني «مفقود» (<code>na_values</code>). وهذا معنى «القرار علنًا»: القائمة الافتراضية في الدرس 4 قرار اتُّخذ نيابةً عنك. وكلاهما يحذف فاصلة <code>1,150</code> فلا يرفضها أيٌّ منهما، وهذا يُسقط «ب أشدّ صرامة في الأرقام»؛ ولا تعدّ أ الخلية الفارغة فشلًا لأن <code>read_csv</code> جعلتها <code>NaN</code> سلفًا، وهذا يُسقط «أ تعدّ الفارغ». ثمن ب تشغيل أول أشدّ صرامة؛ وربحها عدّ يمكن الوثوق به."
        }
      },

      /* ---------------------------------------------------------- 16 */
      {
        id: "t1cx16",
        type: "compare",
        level: "hard",
        topics: ["t1-fetch-all", "t1-api-validation"],
        q: {
          en: "A bug on the provider's side sends school 213 with <code>enrolment.girls = -1</code>; every reply is a normal 200, <code>total</code> is 13 and the ids are unique. <code>fetch_all</code> is the function of Lesson 5, and <code>validate</code>, <code>decide</code> and <code>SCHOOLS</code> are those of Lesson 6 (<code>SCHOOLS</code> gives <code>enrolment_girls</code> a minimum of 0). Both programs finish. Which statement is correct?",
          ar: "خلل عند المزوّد يرسل المدرسة 213 بـ<code>enrolment.girls = -1</code>؛ وكل ردّ هو 200 عادي، و<code>total</code> يساوي 13 والمعرّفات فريدة. الدالة <code>fetch_all</code> هي دالة الدرس 5، وأما <code>validate</code> و<code>decide</code> و<code>SCHOOLS</code> فهي من الدرس 6 (يعطي <code>SCHOOLS</code> للعمود <code>enrolment_girls</code> حدًّا أدنى 0). ينتهي البرنامجان. أيّ العبارات صحيحة؟"
        },
        codeA: code(
          "df = fetch_all(get, URL)",
          "students = df[\"enrolment_boys\"] + df[\"enrolment_girls\"]",
          "print(df.shape, round(students.mean(), 1))"
        ),
        codeB: code(
          "df = fetch_all(get, URL)",
          "df[\"facilities\"] = df[\"facilities\"].map(\",\".join)",
          "problems = validate(df, SCHOOLS)",
          "for p in problems:",
          "    print(p[\"level\"].upper(), p[\"column\"], p[\"message\"])",
          "print(decide(problems))"
        ),
        options: [
          {
            en: "Both stop with an error: <code>fetch_all</code> raises on any bad reply, so <code>validate</code> only repeats a check that has already been made on the same table.",
            ar: "كلاهما يتوقف بخطأ: <code>fetch_all</code> ترفع عند أي ردّ سيئ، فلا تفعل <code>validate</code> إلا أن تكرّر فحصًا تم على الجدول نفسه."
          },
          {
            en: "A is the safer script: <code>fetch_all</code> compares <code>len(df)</code> with <code>total</code> and checks the ids, so every field of the table it returns must be valid; B only adds a second pass over the same checks.",
            ar: "أ هي السكربت الأكثر أمانًا: <code>fetch_all</code> تقارن <code>len(df)</code> بـ<code>total</code> وتفحص المعرّفات، فكل حقل في الجدول الذي تعيده لا بد أن يكون صالحًا؛ وب لا تضيف إلا مرورًا ثانيًا على الفحوص نفسها."
          },
          {
            en: "A prints <code>(13, 12) 395.2</code> and carries on with an impossible value in the table (the true mean is 403.2); B prints an ERROR for <code>enrolment_girls</code> and the decision <code>STOP</code>. <code>fetch_all</code> checks transport and count, not fields.",
            ar: "تطبع أ <code>(13, 12) 395.2</code> وتواصل بقيمة مستحيلة في الجدول (المتوسط الصحيح 403.2)؛ وتطبع ب ERROR للعمود <code>enrolment_girls</code> والقرار <code>STOP</code>. <code>fetch_all</code> تفحص النقل والعدد لا الحقول."
          },
          {
            en: "B is better only because the validator would also catch a page served twice, which the function of Lesson 5 would let through, and nothing else is gained.",
            ar: "ب أفضل فقط لأن المدقِّق سيلتقط أيضًا صفحة قُدِّمت مرتين، وهو ما تتركه دالة الدرس 5 يمرّ، ولا يُكسَب شيء آخر."
          }
        ],
        answer: 2,
        hint: {
          en: "List what <code>fetch_all</code> checks: status codes, pages, the count against <code>total</code>, unique ids. Is a value inside a field on that list?",
          ar: "عدِّد ما تفحصه <code>fetch_all</code>: رموز الحالة والصفحات والعدد مقابل <code>total</code> والمعرّفات الفريدة. هل قيمة داخل حقل في هذه القائمة؟"
        },
        explain: {
          en: "Running both against a fake server with the bug shows it. <code>fetch_all</code> keeps its promise (a complete table, 13 distinct schools) and is still blind to what is inside the fields: A returns <code>(13, 12)</code> and a mean of 395.2 instead of 403.2, a plausible number with no error. B adds the validator, which reports <code>ERROR enrolment_girls 1 value(s) below 0</code> (and the three missing phones as a warning) and decides <code>STOP</code>. That is the open gap of the T-FETCH thread after Lesson 5, closed in Lesson 6. The claim that only B would catch a page served twice is wrong, because <code>fetch_all</code> already catches it: <code>df[\"id\"].is_unique</code> fails. What still stays open: the validator judges one run, and nothing here says how old the data may be before it is refetched.",
          ar: "تشغيل الاثنين على خادم مزيَّف فيه الخلل يُظهر ذلك. <code>fetch_all</code> تفي بوعدها (جدول كامل، 13 مدرسة مختلفة) وهي مع ذلك عمياء عمّا داخل الحقول: تعيد أ <code>(13, 12)</code> ومتوسطًا 395.2 بدل 403.2، رقمًا معقولًا بلا خطأ. وتضيف ب المدقِّق الذي يبلّغ <code>ERROR enrolment_girls 1 value(s) below 0</code> (وتحذيرًا بالهواتف الثلاثة الناقصة) ويقرّر <code>STOP</code>. هذه هي الفجوة المفتوحة في خيط T-FETCH بعد الدرس 5، أغلقها الدرس 6. وزعم أن ب وحدها تلتقط صفحة قُدِّمت مرتين خاطئ، لأن <code>fetch_all</code> تلتقطها أصلًا: <code>df[\"id\"].is_unique</code> تفشل. وما يبقى مفتوحًا: المدقِّق يحكم على تشغيل واحد، ولا شيء هنا يقول كم يجوز أن يكون عمر البيانات قبل إعادة الجلب."
        }
      },

      /* ---------------------------------------------------------- 17 */
      {
        id: "t1cx17",
        type: "compare",
        level: "hard",
        topics: ["t1-list-fields", "t1-schema-drift", "t1-quality-dimensions"],
        q: {
          en: "<code>df</code> is the flattened registry, one row per school (13 rows, with a <code>facilities</code> list). To train a model on schools, the lists are exploded into one row per school–facility pair (22 rows) and the rows are split 80/20 into training and test sets. Both programs run. Which statement is correct?",
          ar: "<code>df</code> هو السجل المسطَّح، صف لكل مدرسة (13 صفًّا، فيه قائمة <code>facilities</code>). ولتدريب نموذج على المدارس تُفجَّر القوائم إلى صف لكل زوج مدرسة–مرفق (22 صفًّا) وتُقسَّم الصفوف 80/20 إلى مجموعتي تدريب واختبار. يعمل البرنامجان. أيّ العبارات صحيحة؟"
        },
        codeA: code(
          "exploded = df.explode(\"facilities\")",
          "exploded = exploded.reset_index(drop=True)",
          "train = exploded.sample(frac=0.8, random_state=0)",
          "test = exploded.drop(train.index)",
          "both = set(train[\"id\"]) & set(test[\"id\"])",
          "print(len(train), len(test), len(both))"
        ),
        codeB: code(
          "exploded = df.explode(\"facilities\")",
          "exploded = exploded.reset_index(drop=True)",
          "ids = df[\"id\"].sample(frac=0.8, random_state=0)",
          "train = exploded[exploded[\"id\"].isin(ids)]",
          "test = exploded[~exploded[\"id\"].isin(ids)]",
          "both = set(train[\"id\"]) & set(test[\"id\"])",
          "print(len(train), len(test), len(both))"
        ),
        options: [
          {
            en: "A is better: its split is a true 80/20 of the rows (18 and 4), while B gives 15 and 7, which is neither 80/20 nor a split anyone would choose on purpose.",
            ar: "أ أفضل: تقسيمها 80/20 حقيقي للصفوف (18 و4)، بينما تعطي ب 15 و7، وهذا ليس 80/20 ولا تقسيمًا يختاره أحد عن قصد."
          },
          {
            en: "B is better: no school has rows on both sides (the last number is 0), so the test rows are schools the model has never seen. In A, 2 schools appear in both sets, so the test score partly measures memory.",
            ar: "ب أفضل: لا مدرسة لها صفوف على الجانبين (الرقم الأخير 0)، فصفوف الاختبار مدارس لم يرها النموذج قط. وفي أ تظهر مدرستان في المجموعتين، فتقيس نتيجة الاختبار الحفظ جزئيًّا."
          },
          {
            en: "They are equivalent: after <code>explode</code> every row is an independent example, so splitting by row is the standard way and needs no further care.",
            ar: "هما متكافئان: بعد <code>explode</code> يصير كل صف مثالًا مستقلًّا، فالتقسيم بالصفوف هو الطريقة المعتادة ولا يحتاج إلى عناية أخرى."
          },
          {
            en: "A leaks only because of the seed: with another <code>random_state</code> it would also show 0 schools on both sides, so the comparison proves nothing.",
            ar: "تسرّب أ سببه البذرة وحدها: مع <code>random_state</code> آخر كانت ستُظهر هي أيضًا 0 مدرسة على الجانبين، فلا تثبت المقارنة شيئًا."
          }
        ],
        answer: 1,
        hint: {
          en: "After <code>explode</code>, how many rows does one school have, and what do those rows share? Which of them can land on different sides?",
          ar: "بعد <code>explode</code>، كم صفًّا لمدرسة واحدة، وماذا تتشارك هذه الصفوف؟ وأيّها يمكن أن يقع على جانبين مختلفين؟"
        },
        explain: {
          en: "Running both gives <code>18 4 2</code> and <code>15 7 0</code>. <code>explode</code> changes what a row means (Lesson 5): 13 schools became 22 school–facility pairs, and each school's governorate and enrolment are repeated on every one of its rows. A split by row puts sibling rows on both sides, here 2 schools, so half of the 4 test rows describe a school already seen in training: the leakage of duplicated rows from Lesson 6, with a score flattered for a reason nobody will find. It is not the seed: seeds 0 to 11 all leak, between 1 and 4 schools. Splitting the ids first and selecting the rows afterwards keeps each school on one side, at the price of a split that is only roughly 80/20 in rows (15 and 7). Rule: split by the unit that must be independent, here the school, not by the row.",
          ar: "تشغيل البرنامجين يعطي <code>18 4 2</code> و<code>15 7 0</code>. <code>explode</code> يغيّر معنى الصف (الدرس 5): صارت 13 مدرسة 22 زوج مدرسة–مرفق، ويتكرر إقبال كل مدرسة ومحافظتها في كل صف من صفوفها. والتقسيم بالصفوف يضع صفوفًا شقيقة على الجانبين، هنا مدرستان، فنصف صفوف الاختبار الأربعة تصف مدرسة رآها النموذج في التدريب: هذا تسرّب الصفوف المكرّرة من الدرس 6، بنتيجة مضخَّمة لسبب لن يجده أحد. وليست البذرة السبب: البذور من 0 إلى 11 كلها تسرّب، بين مدرسة وأربع. أما تقسيم المعرّفات أولًا ثم اختيار الصفوف فيُبقي كل مدرسة على جانب واحد، بثمن تقسيم قريب من 80/20 في الصفوف فقط (15 و7). القاعدة: قسّم بالوحدة التي يجب أن تكون مستقلة، هنا المدرسة، لا بالصف."
        }
      },

      /* ---------------------------------------------------------- 18 */
      {
        id: "t1cx18",
        type: "write",
        level: "hard",
        topics: ["t1-blank-vs-failed", "t1-coerce-and-count", "t1-casting-tools"],
        lang: "python",
        q: {
          en: "A rent column was read as text with <code>dtype=str, keep_default_na=False</code>, so <code>raw</code> is a Series of strings in which a blank cell is <code>''</code> (or only spaces). Write <code>parse_report(raw)</code>. It returns three things, in this order: the rents as numbers (a thousands comma is allowed, so <code>'1,150'</code> means 1150), the number of blank cells, and the list of non-blank texts that could not be parsed. Blank and failed must never be confused, and no gap may be filled with 0.",
          ar: "قُرئ عمود الإيجار نصًّا بـ<code>dtype=str, keep_default_na=False</code>، فـ<code>raw</code> سلسلة (Series) من النصوص الخلية الفارغة فيها <code>''</code> (أو مسافات فقط). اكتب <code>parse_report(raw)</code>. تعيد ثلاثة أشياء بهذا الترتيب: الإيجارات أرقامًا (فاصلة الآلاف مسموحة، فـ<code>'1,150'</code> تعني 1150)، وعدد الخلايا الفارغة، وقائمة النصوص غير الفارغة التي تعذّر تحليلها. يجب ألا يُخلط الفارغ بالفاشل أبدًا، ولا يجوز ملء أي فراغ بـ0."
        },
        starter: code(
          "import pandas as pd",
          "",
          "def parse_report(raw):",
          "    # your code here"
        ),
        lines: 10,
        checks: [
          {
            re: "^(?=.*to_numeric\\s*\\()(?=.*errors\\s*=\\s*[\"']coerce[\"'])",
            label: {
              en: "Convert with <code>pd.to_numeric(..., errors=\"coerce\")</code>",
              ar: "حوّل بـ<code>pd.to_numeric(..., errors=\"coerce\")</code>"
            }
          },
          {
            re: "replace\\s*\\(\\s*r?[\"'],[\"']\\s*,\\s*[\"'][\"']",
            label: {
              en: "Remove the thousands comma before converting: <code>.str.replace(\",\", \"\")</code>",
              ar: "احذف فاصلة الآلاف قبل التحويل: <code>.str.replace(\",\", \"\")</code>"
            }
          },
          {
            re: "(strip\\s*\\(\\s*\\)\\s*(==|!=|\\.eq\\s*\\(|\\.ne\\s*\\(|\\.str\\.len)|fullmatch\\s*\\(|\\.str\\.match\\s*\\()",
            label: {
              en: "Find the blank cells from the text itself, after stripping the spaces: <code>raw.str.strip() == \"\"</code>",
              ar: "اعثر على الخلايا الفارغة من النص نفسه بعد حذف المسافات: <code>raw.str.strip() == \"\"</code>"
            }
          },
          {
            re: "isna\\s*\\(\\s*\\)\\s*&|&\\s*\\(?\\s*\\w+\\.isna\\s*\\(",
            label: {
              en: "A failure is a cell that is <code>NaN</code> now <em>and</em> was not blank: <code>rent.isna() &amp; ~blank</code>",
              ar: "الفاشل خلية <code>NaN</code> الآن <em>وكانت</em> غير فارغة: <code>rent.isna() &amp; ~blank</code>"
            }
          },
          {
            re: "return\\s+[^,]+,[^,]+,[^,]+",
            label: {
              en: "Return the three things in one <code>return</code>, in the order asked",
              ar: "أعد الأشياء الثلاثة في <code>return</code> واحد بالترتيب المطلوب"
            }
          }
        ],
        forbid: [
          {
            re: "fillna\\s*\\(\\s*0",
            label: {
              en: "<code>fillna(0)</code>: it turns unknown rents into zero rents",
              ar: "<code>fillna(0)</code>: يحوّل الإيجارات المجهولة إلى إيجارات صفر"
            }
          },
          {
            re: "errors\\s*=\\s*[\"']ignore[\"']",
            label: {
              en: "<code>errors=\"ignore\"</code>: it leaves the text in the column and counts nothing",
              ar: "<code>errors=\"ignore\"</code>: يترك النص في العمود ولا يعدّ شيئًا"
            }
          }
        ],
        solution: {
          code: code(
            "import pandas as pd",
            "",
            "def parse_report(raw):",
            "    blank = raw.str.strip().eq(\"\")",
            "    cells = raw.mask(blank).str.replace(\",\", \"\", regex=False)",
            "    rent = pd.to_numeric(cells, errors=\"coerce\")",
            "    failed = rent.isna() & ~blank",
            "    return rent, int(blank.sum()), raw[failed].tolist()"
          ),
          out: "For pd.Series([\"415\", \"1,150\", \"\", \"TBD\", \" \", \"445\"]) it returns the rents [415.0, 1150.0, nan, nan, nan, 445.0], 2 blank cells, and the failed texts ['TBD'].",
          en: "The blank mask comes from the text before parsing; the rents come from a forgiving conversion after the known thousands pattern is removed; the failures are the cells missing now that were not blank.",
          ar: "قناع الفارغ يأتي من النص قبل التحليل؛ والإيجارات من تحويل متسامح بعد حذف نمط الآلاف المعروف؛ والفاشل هو الخلايا المفقودة الآن التي لم تكن فارغة."
        },
        hint: {
          en: "Keep three groups apart: blanks are counted from the text before any parsing, rents come from the conversion, failures are what the conversion added.",
          ar: "أبقِ ثلاث مجموعات منفصلة: الفارغ يُعدّ من النص قبل أي تحليل، والإيجارات تأتي من التحويل، والفاشل هو ما أضافه التحويل."
        },
        explain: {
          en: "This is the <code>coerce()</code> idea of the Lesson 6 loader in a few lines. The blank mask is taken from the text (strip first, so a cell of spaces is a blank too). The known thousands pattern is removed before converting (Version 4 of Lesson 3), and <code>errors=\"coerce\"</code> then makes the conversion forgiving; the failures are the cells that are missing now but were not blank, which is why <code>rent.isna()</code> alone is not enough: it would merge blanks and failures and leave the report unable to say which is which. <code>fillna(0)</code> would invent zero rents, and <code>errors=\"ignore\"</code> would leave text in a numeric column and count nothing. Returning the offending cells, not only their number, is what lets the owner of the file fix the source.",
          ar: "هذه فكرة <code>coerce()</code> في محمِّل الدرس 6 في بضعة أسطر. يُؤخذ قناع الفارغ من النص (مع حذف المسافات أولًا، فخلية المسافات فارغة أيضًا). وتُحذف فاصلة الآلاف المعروفة قبل التحويل (النسخة 4 من الدرس 3)، ثم يجعل <code>errors=\"coerce\"</code> التحويل متسامحًا؛ والفاشل هو الخلايا المفقودة الآن التي لم تكن فارغة، ولهذا لا يكفي <code>rent.isna()</code> وحده: فهو يخلط الفارغ بالفاشل ويعجز التقرير عن القول أيهما أيهما. و<code>fillna(0)</code> يخترع إيجارات صفرًا، و<code>errors=\"ignore\"</code> يترك نصًّا في عمود عددي ولا يعدّ شيئًا. وإعادة الخلايا المخالفة نفسها لا عددها فقط هي ما يتيح لصاحب الملف إصلاح المصدر."
        }
      },

      /* ---------------------------------------------------------- 19 */
      {
        id: "t1cx19",
        type: "write",
        level: "hard",
        topics: ["t1-api-validation", "t1-expected-schema", "t1-assert-first-failure"],
        lang: "python",
        q: {
          en: "<code>df</code> is the flattened registry table returned by <code>fetch_all</code>, with the columns <code>id</code>, <code>governorate</code>, <code>enrolment_boys</code> and <code>enrolment_girls</code> (among others). <code>ALLOWED</code> is the list of the five governorate names. Write <code>check_schools(df)</code>, which returns a list of problem sentences (an empty list when all is well) and reports everything it finds in one run: repeated ids, governorates outside <code>ALLOWED</code>, and negative enrolments. It must not stop at the first problem.",
          ar: "<code>df</code> هو جدول السجل المسطَّح الذي تعيده <code>fetch_all</code>، وفيه الأعمدة <code>id</code> و<code>governorate</code> و<code>enrolment_boys</code> و<code>enrolment_girls</code> (وغيرها). و<code>ALLOWED</code> قائمة أسماء المحافظات الخمس. اكتب <code>check_schools(df)</code> التي تعيد قائمة جمل المشكلات (قائمة فارغة حين كل شيء سليم) وتبلّغ بكل ما تجده في تشغيل واحد: معرّفات مكرّرة، ومحافظات خارج <code>ALLOWED</code>، وإقبال سالب. يجب ألا تتوقف عند أول مشكلة."
        },
        starter: code(
          "ALLOWED = [\"Gaza\", \"North Gaza\", \"Deir al-Balah\", \"Khan Younis\", \"Rafah\"]",
          "",
          "def check_schools(df):",
          "    problems = []",
          "    # your code here",
          "    return problems"
        ),
        lines: 12,
        checks: [
          {
            re: "duplicated\\s*\\(|is_unique|nunique\\s*\\(|value_counts\\s*\\(",
            label: {
              en: "Look for repeated ids: <code>df[\"id\"].duplicated()</code> or <code>is_unique</code>",
              ar: "ابحث عن المعرّفات المكرّرة: <code>df[\"id\"].duplicated()</code> أو <code>is_unique</code>"
            }
          },
          {
            re: "isin\\s*\\(\\s*ALLOWED\\s*\\)|\\bin\\s+ALLOWED\\b",
            label: {
              en: "Check the governorates against the allowed set: <code>isin(ALLOWED)</code>",
              ar: "افحص المحافظات مقابل المجموعة المسموحة: <code>isin(ALLOWED)</code>"
            }
          },
          {
            re: "<\\s*0\\b|>=\\s*0\\b|\\.lt\\s*\\(\\s*0\\s*\\)|\\.ge\\s*\\(\\s*0\\s*\\)",
            label: {
              en: "Check the enrolments for values below 0",
              ar: "افحص الإقبال بحثًا عن قيم أقل من 0"
            }
          },
          {
            re: "\\.append\\s*\\(|\\.extend\\s*\\(|\\w+\\s*\\+=\\s*\\[|\\w+\\s*=\\s*\\w+\\s*\\+\\s*\\[|return\\s*\\[",
            label: {
              en: "Collect each finding into the list instead of stopping",
              ar: "اجمع كل ملاحظة في القائمة بدل التوقف"
            }
          }
        ],
        forbid: [
          {
            re: "\\bassert\\b|\\braise\\b",
            label: {
              en: "<code>assert</code> or <code>raise</code>: they stop at the first failure and hide the rest",
              ar: "<code>assert</code> أو <code>raise</code>: يتوقفان عند أول فشل ويخفيان الباقي"
            }
          }
        ],
        solution: {
          code: code(
            "ALLOWED = [\"Gaza\", \"North Gaza\", \"Deir al-Balah\", \"Khan Younis\", \"Rafah\"]",
            "",
            "def check_schools(df):",
            "    problems = []",
            "    if df[\"id\"].duplicated().any():",
            "        problems.append(f\"id: {df['id'].duplicated().sum()} repeated value(s)\")",
            "    bad = df.loc[~df[\"governorate\"].isin(ALLOWED), \"governorate\"]",
            "    if len(bad) > 0:",
            "        problems.append(f\"governorate: {len(bad)} value(s) outside the allowed set, e.g. {bad.iloc[0]!r}\")",
            "    for col in [\"enrolment_boys\", \"enrolment_girls\"]:",
            "        n = int((df[col] < 0).sum())",
            "        if n > 0:",
            "            problems.append(f\"{col}: {n} value(s) below 0\")",
            "    return problems"
          ),
          out: "On the good registry it returns []. With the first school appended a second time, one governorate written 'Rafah ' and one girls value of -1, it returns three sentences in one run: ['id: 1 repeated value(s)', \"governorate: 1 value(s) outside the allowed set, e.g. 'Rafah '\", 'enrolment_girls: 1 value(s) below 0']",
          en: "Each rule appends a sentence and goes on; an empty list means the table passed all three. This is validate() of Lesson 6 in miniature, aimed at an API table.",
          ar: "كل قاعدة تضيف جملة وتواصل؛ والقائمة الفارغة تعني أن الجدول اجتاز الثلاث. هذه هي validate() في الدرس 6 مصغَّرةً ومحوَّلةً إلى جدول من API."
        },
        hint: {
          en: "One rule per kind of problem, each adding a sentence to <code>problems</code> and going on to the next rule.",
          ar: "قاعدة لكل نوع من المشكلات، تضيف كلٌّ منها جملة إلى <code>problems</code> وتنتقل إلى القاعدة التالية."
        },
        explain: {
          en: "<code>fetch_all</code> checks the transport and the count, so the content needs a validator of its own (the closing move of the T-FETCH thread in Lesson 6). A list of problems rather than an <code>assert</code> or a <code>raise</code> is the lesson of Concept 2: an assertion stops at the first failure, and the file that has three defects needs three runs to find them. Each rule here matches one dimension of data quality: uniqueness (repeated ids), validity (an allowed set, a minimum). A trailing space in <code>'Rafah '</code> is exactly what the allowed set catches and a dtype check would not. What this still cannot do is say that the data are accurate, or decide how old a snapshot may be.",
          ar: "تفحص <code>fetch_all</code> النقل والعدد، فيحتاج المحتوى إلى مدقِّق خاص به (حركة إغلاق خيط T-FETCH في الدرس 6). وقائمة المشكلات بدل <code>assert</code> أو <code>raise</code> هي درس المفهوم 2: التوكيد يتوقف عند أول فشل، والملف الذي فيه ثلاثة عيوب يحتاج ثلاث مرات تشغيل ليجدها. وكل قاعدة هنا تطابق بُعدًا من أبعاد جودة البيانات: التفرّد (المعرّفات المكرّرة)، والصلاحية (مجموعة مسموحة وحد أدنى). والمسافة الزائدة في <code>'Rafah '</code> هي بالضبط ما تلتقطه المجموعة المسموحة ولا يلتقطه فحص النوع. وما لا يزال عاجزًا عنه أن يقول إن البيانات دقيقة، أو أن يقرّر كم يجوز أن يكون عمر اللقطة."
        }
      },

      /* ---------------------------------------------------------- 20 */
      {
        id: "t1cx20",
        type: "output",
        level: "hard",
        topics: ["t1-json-parse-errors", "t1-missing-spellings", "t1-schema-on-read"],
        q: {
          en: "A model was asked to answer in JSON, and a type check like the one in the AI lens of Lesson 1 accepts every key that is a number. The reply contains the word <code>NaN</code> where the area should be. Write exactly what the program prints (four lines).",
          ar: "طُلب من نموذج أن يجيب بصيغة JSON، وفحص أنواع كالذي في منظور الذكاء الاصطناعي بالدرس 1 يقبل كل مفتاح قيمته رقم. يحوي الردّ كلمة <code>NaN</code> حيث ينبغي أن تكون المساحة. اكتب بالضبط ما يطبعه البرنامج (أربعة أسطر)."
        },
        code: code(
          "import json",
          "",
          "REQUIRED = {\"rooms\": int, \"rent\": (int, float), \"area_m2\": (int, float)}",
          "",
          "def usable(data):",
          "    return all(isinstance(data.get(k), t) for k, t in REQUIRED.items())",
          "",
          "data = json.loads('{\"rooms\": 3, \"area_m2\": NaN, \"rent\": 300}')",
          "print(usable(data))",
          "print(data[\"area_m2\"] == data[\"area_m2\"])",
          "print(data[\"rent\"] / data[\"area_m2\"])",
          "print(json.dumps(data))"
        ),
        blanks: [
          {
            accept: ["True\nFalse\nnan\n{\"rooms\": 3, \"area_m2\": NaN, \"rent\": 300}"],
            lines: 4
          }
        ],
        hint: {
          en: "Python's JSON parser is more generous than the JSON standard. What type does <code>NaN</code> become, and what does it equal?",
          ar: "محلّل JSON في بايثون أكرم من معيار JSON. أيّ نوع تصير <code>NaN</code>؟ وماذا تساوي؟"
        },
        explain: {
          en: "<code>json.loads</code> accepts <code>NaN</code>, which the JSON standard does not allow, and turns it into the float <code>nan</code> (Lesson 5). So the type check passes: <code>nan</code> is a <code>float</code>, and the first line is <code>True</code>. Then Lesson 3 applies: <code>nan</code> is not equal even to itself (<code>False</code>), arithmetic with it gives <code>nan</code> (a rent per m² that is not a number), and <code>json.dumps</code> writes it back as <code>NaN</code>, which another tool may reject. A reply that passes a type check can still carry a number that is not a number; model JSON needs a check for <code>NaN</code> (<code>math.isfinite</code>, or <code>allow_nan=False</code> when writing), a range, and a count of the failures. Fed to a model, that <code>nan</code> turns into a <code>NaN</code> loss.",
          ar: "تقبل <code>json.loads</code> الكلمة <code>NaN</code> مع أن معيار JSON لا يسمح بها، وتحوّلها إلى العدد العشري <code>nan</code> (الدرس 5). فيمرّ فحص النوع: <code>nan</code> من النوع <code>float</code> والسطر الأول <code>True</code>. ثم ينطبق الدرس 3: <code>nan</code> لا تساوي نفسها (<code>False</code>)، وأي حساب بها يعطي <code>nan</code> (إيجار للمتر المربع ليس رقمًا)، ويكتبها <code>json.dumps</code> من جديد <code>NaN</code>، وقد ترفضها أداة أخرى. فالردّ الذي يجتاز فحص النوع قد يحمل رقمًا ليس رقمًا؛ ويحتاج JSON النموذج إلى فحص للـ<code>NaN</code> (<code>math.isfinite</code>، أو <code>allow_nan=False</code> عند الكتابة) وإلى مدى وعدّ للإخفاقات. وحين يُغذَّى به نموذج يصير ذلك <code>nan</code> خسارة <code>NaN</code>."
        }
      },

      /* ---------------------------------------------------------- 21 */
      {
        id: "t1cx21",
        type: "error",
        level: "hard",
        topics: ["t1-mojibake", "t1-encoding-diagnose", "t1-invisible-inconsistency"],
        q: {
          en: "The two monthly files are exactly as the comments say: January is an old cp1256 export, February is UTF-8. The program should print <code>2 cities</code> and <code>448.0</code>, the mean of 445 and 451 for Gaza. It prints <code>4 cities</code> and <code>445.0</code>, and no exception is raised. Click the line that is responsible.",
          ar: "الملفان الشهريان كما تقول التعليقات تمامًا: كانون الثاني تصدير قديم بترميز cp1256، وشباط UTF-8. يجب أن يطبع البرنامج <code>2 cities</code> و<code>448.0</code>، متوسط 445 و451 لغزة. لكنه يطبع <code>4 cities</code> و<code>445.0</code> ولا يُرفع أي استثناء. انقر السطر المسؤول."
        },
        code: code(
          "import io",
          "import pandas as pd",
          "",
          "GAZA = \"غزة\"",
          "RAFAH = \"رفح\"",
          "jan = f\"city,rent\\n{GAZA},445\\n{RAFAH},262\\n\".encode(\"cp1256\")   # an old Windows export",
          "feb = f\"city,rent\\n{GAZA},451\\n{RAFAH},270\\n\".encode(\"utf-8\")     # the new export",
          "",
          "frames = []",
          "for raw in (jan, feb):",
          "    frames.append(pd.read_csv(io.BytesIO(raw), encoding=\"cp1256\"))",
          "df = pd.concat(frames, ignore_index=True)",
          "",
          "print(df[\"city\"].nunique(), \"cities\")",
          "print(df[df[\"city\"] == GAZA][\"rent\"].mean())"
        ),
        answer: 11,
        solution: {
          code: code(
            "for raw, enc in ((jan, \"cp1256\"), (feb, \"utf-8\")):",
            "    frames.append(pd.read_csv(io.BytesIO(raw), encoding=enc))"
          ),
          out: "2 cities\n448.0",
          en: "Choose the encoding per file, from evidence (strict UTF-8 attempt, then cp1256), and check the city names against a vocabulary you trust.",
          ar: "اختر الترميز لكل ملف من الأدلة (محاولة UTF-8 صارمة ثم cp1256)، وافحص أسماء المدن بمقارنتها بمفردات تثق بها."
        },
        hint: {
          en: "Both files go through the same call. Is every byte of a UTF-8 file legal in cp1256?",
          ar: "الملفان يمرّان بالاستدعاء نفسه. هل كل بايت في ملف UTF-8 قانوني في cp1256؟"
        },
        explain: {
          en: "Line 11 reads both files with <code>encoding=\"cp1256\"</code>. Every byte value is a legal character in cp1256, so the UTF-8 file raises nothing: it decodes into real Arabic letters that are the wrong letters, and «غزة» of February becomes a different string from «غزة» of January. The table has 4 'cities', the Gaza filter finds only January (445.0 instead of 448.0), and a model would receive two categories for one place (Lesson 6: consistency you cannot see). The fix is to choose the encoding per file from evidence (does it start with a BOM, does it decode as strict UTF-8? if not, try cp1256, as in Lesson 4) and to check the result against a vocabulary you trust; <code>encoding_errors=\"replace\"</code> would only make things worse. Rule: wrong text is not damaged text, it is right bytes read through the wrong table.",
          ar: "السطر 11 يقرأ الملفين بـ<code>encoding=\"cp1256\"</code>. كل قيمة بايت هي حرف قانوني في cp1256، فلا يرفع ملف UTF-8 شيئًا: يُفكَّك إلى حروف عربية حقيقية هي الحروف الخطأ، وتصير «غزة» شباط سلسلة تختلف عن «غزة» كانون الثاني. فيصير في الجدول 4 «مدن»، ويجد مرشِّح غزة كانون الثاني وحده (445.0 بدل 448.0)، ويتلقّى النموذج فئتين لمكان واحد (الدرس 6: اتساق لا يُرى). والإصلاح اختيار الترميز لكل ملف من الأدلة (هل يبدأ بعلامة BOM؟ هل يُفكَّك كـUTF-8 صارم؟ وإلا فجرّب cp1256 كما في الدرس 4) وفحص النتيجة بمفردات تثق بها؛ أما <code>encoding_errors=\"replace\"</code> فلا يفعل إلا أن يزيد الأمر سوءًا. القاعدة: النص الخطأ ليس نصًّا تالفًا، هو بايتات صحيحة مقروءة بجدول خطأ."
        }
      },

      /* ---------------------------------------------------------- 22 */
      {
        id: "t1cx22",
        type: "multi",
        level: "hard",
        topics: ["t1-expected-schema", "t1-ritual-limits", "t1-dayfirst-ambiguity"],
        q: {
          en: "The schema of the listings (Lesson 6) gives every column its <code>dtype</code>, declares <code>listing_id</code> <code>unique</code>, lists the five city names as <code>allowed</code>, sets the ranges 100 to 1500 for <code>monthly_rent</code> and 20 to 300 for <code>area_m2</code>, and expects <code>datetime64[ns]</code> for <code>listed_on</code> with no range. Next month's loads each have one of these slips. Which of them would <code>validate()</code> report as a problem? (Choose all that apply.)",
          ar: "يعطي مخطط الإعلانات (الدرس 6) كل عمود نوعه <code>dtype</code>، ويصرّح بأن <code>listing_id</code> <code>unique</code>، ويعدّد أسماء المدن الخمس <code>allowed</code>، ويضع المدى 100 إلى 1500 للعمود <code>monthly_rent</code> و20 إلى 300 للعمود <code>area_m2</code>، ويتوقع <code>datetime64[ns]</code> للعمود <code>listed_on</code> دون مدى. وفي كل تحميل من تحميلات الشهر القادم هفوة واحدة من هذه. أيّ هذه الهفوات ستبلّغ عنها <code>validate()</code> مشكلة؟ (اختر كل ما ينطبق.)"
        },
        options: [
          {
            en: "The export now stores <code>listed_on</code> as Excel serial numbers and the column arrives as <code>int64</code>",
            ar: "صار التصدير يخزّن <code>listed_on</code> أرقامًا تسلسلية لـExcel ويصل العمود <code>int64</code>"
          },
          {
            en: "Day-first dates are parsed month-first: 5 April becomes 4 May, and the column is a proper <code>datetime64[ns]</code>",
            ar: "تاريخ يوم/شهر يُحلَّل شهرًا أولًا: 5 نيسان تصير 4 أيار، والعمود <code>datetime64[ns]</code> سليم"
          },
          {
            en: "A file decoded with the wrong table gives city names such as <code>ط®ط§ظ† ظٹظˆظ†ط³</code>",
            ar: "ملف فُكَّ بجدول خطأ يعطي أسماء مدن مثل <code>ط®ط§ظ† ظٹظˆظ†ط³</code>"
          },
          {
            en: "Annual rents (3,780 and 4,680) are typed into the monthly rent column",
            ar: "إيجارات سنوية (3,780 و4,680) تُكتب في عمود الإيجار الشهري"
          },
          {
            en: "The same flat is entered twice under two different <code>listing_id</code> values, every other column identical",
            ar: "الشقة نفسها تُدخل مرتين بقيمتين مختلفتين لـ<code>listing_id</code> وكل عمود آخر متطابق"
          },
          {
            en: "A rent of 350 is recorded where the landlord really charges 315",
            ar: "يُسجَّل إيجار 350 حيث يتقاضى المالك فعلًا 315"
          },
          {
            en: "The whole file is exported twice and appended, so every row appears twice with its id",
            ar: "يُصدَّر الملف كله مرتين ويُلحَق، فيظهر كل صف مرتين بمعرّفه"
          }
        ],
        answer: [0, 2, 3, 6],
        hint: {
          en: "A validator checks only what the schema says. For each slip, find the rule that would fire (a dtype, a set, a range, a uniqueness) or admit that there is none.",
          ar: "المدقِّق لا يفحص إلا ما يقوله المخطط. لكل هفوة، اعثر على القاعدة التي ستطلق التنبيه (نوع أو مجموعة أو مدى أو تفرّد) أو سلِّم بأنه لا توجد."
        },
        explain: {
          en: "Reported: serial numbers break the dtype rule (<code>int64</code> against <code>datetime64[ns]</code>); the garbled cities are outside the <code>allowed</code> set; the annual rents are above the maximum of 1500; and a doubled export repeats every <code>listing_id</code> and every row. Not reported: month-first dates give a perfectly good <code>datetime64[ns]</code> and, with no range on <code>listed_on</code>, no rule fires, so a time split would silently move April into May (Lesson 4); the same flat under two ids is two different rows to <code>unique</code> and to <code>duplicated()</code> (the limits of the ritual, Lesson 6); and a 350 where 315 is true is complete, valid, unique and consistent: accuracy needs a second source. A validator knows what you told it. The cure for the first gap is one more rule (a date range), for the second a comparison that ignores the id, and for the third a witness outside the file.",
          ar: "يُبلَّغ عن: الأرقام التسلسلية تكسر قاعدة النوع (<code>int64</code> مقابل <code>datetime64[ns]</code>)؛ والمدن المشوّهة خارج المجموعة <code>allowed</code>؛ والإيجارات السنوية فوق الحدّ الأقصى 1500؛ والتصدير المضاعف يكرّر كل <code>listing_id</code> وكل صف. ولا يُبلَّغ عن: التواريخ بالشهر أولًا فهي <code>datetime64[ns]</code> سليمة تمامًا، ولما كان لا مدى لـ<code>listed_on</code> فلا قاعدة تطلق التنبيه، فيُنقل نيسان بصمت إلى أيار في أي تقسيم زمني (الدرس 4)؛ والشقة نفسها بمعرّفين صفّان مختلفان عند <code>unique</code> وعند <code>duplicated()</code> (حدود الطقس، الدرس 6)؛ وإيجار 350 حيث الصحيح 315 كامل وصالح وفريد ومتسق: الدقة تحتاج مصدرًا ثانيًا. المدقِّق يعرف ما أخبرته به. وعلاج الفجوة الأولى قاعدة أخرى (مدى للتاريخ)، وللثانية مقارنة تتجاهل المعرّف، وللثالثة شاهد من خارج الملف."
        }
      },

      /* ---------------------------------------------------------- 23 */
      {
        id: "t1cx23",
        type: "mcq",
        level: "hard",
        topics: ["t1-model-needs-table", "t1-advert-parser-evolution", "t1-schema-drift"],
        q: {
          en: "A «too expensive?» classifier was trained on adverts parsed with the Lesson 1 parser, which keeps the currency; the training pipeline converts NIS to USD (at 3.6, an assumed rate) before the model sees a rent. The live service, written later by someone else, takes the number before the unit word with its own quick regex and ignores the currency. Two weeks after launch the dashboard shows the average incoming rent up by a third and many more adverts called «too expensive». No error was logged. What is the best first move?",
          ar: "دُرِّب مصنِّف «غالٍ جدًّا؟» على إعلانات حُلِّلت بمحلِّل الدرس 1 الذي يحتفظ بالعملة؛ ويحوّل خط التدريب الشيكل إلى الدولار (بسعر 3.6 مفترَض) قبل أن يرى النموذج الإيجار. أما الخدمة الحيّة، التي كتبها لاحقًا شخص آخر، فتأخذ الرقم الذي قبل كلمة الوحدة بتعبير نمطي سريع خاص بها وتتجاهل العملة. بعد أسبوعين من الإطلاق تُظهر لوحة المتابعة أن متوسط الإيجار الوارد ارتفع بمقدار الثلث وأن إعلانات أكثر بكثير وُصفت بـ«غالٍ جدًّا». لم يُسجَّل أي خطأ. ما أفضل خطوة أولى؟"
        },
        options: [
          {
            en: "Run the training parser and the live parser on the same twenty live adverts and compare their outputs; keep the extraction in one function that both import.",
            ar: "شغّل محلِّل التدريب والمحلِّل الحي على الإعلانات الحيّة العشرين نفسها وقارن مخرجاتهما؛ وأبقِ الاستخراج في دالة واحدة يستوردها الاثنان."
          },
          {
            en: "Retrain on the latest adverts: the market has moved, and a fresh fit will absorb the shift in rents without anyone touching the code.",
            ar: "أعد التدريب على أحدث الإعلانات: السوق تحرّك، والملاءمة الجديدة ستمتص إزاحة الإيجارات دون أن يلمس أحد الكود."
          },
          {
            en: "Plot the rent distribution against last month's, call it data drift, and ask the product team whether the market really moved.",
            ar: "ارسم توزيع الإيجارات مقابل الشهر الماضي، وسمِّه انجراف بيانات، واسأل فريق المنتج هل تحرّك السوق فعلًا."
          },
          {
            en: "Add a missing-value flag and fill the gaps with the training mean, since the live adverts seem to contain more gaps.",
            ar: "أضف علامة للقيم المفقودة واملأ الفراغات بمتوسط التدريب، فالإعلانات الحيّة يبدو أن فيها فراغات أكثر."
          }
        ],
        answer: 0,
        hint: {
          en: "Two pieces of code now turn the same advert into a number. What is the cheapest experiment that needs no new data?",
          ar: "قطعتا كود تحوّلان الآن الإعلان نفسه إلى رقم. ما أرخص تجربة لا تحتاج إلى بيانات جديدة؟"
        },
        explain: {
          en: "The extraction code is part of the model (the AI lens of Lesson 1): the model learned rents in dollars, and the live parser feeds it shekel amounts as if they were dollars, so shekel adverts look 3.6 times more expensive. Nothing fails, and the symptom looks like drift. The decisive test is cheap: same adverts, both parsers, diff the numbers. Retraining would bake the bug into the training data. A distribution plot (the drift option) shows the symptom you already see and cannot tell a changed market from a changed parser. The missing-value flag answers a problem nobody measured. Afterwards, keep the parser in one function imported by training and serving, and check at both doors with the same schema, including an allowed set for the currency (Lesson 6).",
          ar: "كود الاستخراج جزء من النموذج (منظور الذكاء الاصطناعي في الدرس 1): تعلّم النموذج إيجارات بالدولار، والمحلِّل الحي يغذّيه بمبالغ بالشيكل كأنها دولارات، فتبدو إعلانات الشيكل أغلى 3.6 مرات. لا شيء يفشل، ويشبه العَرَض الانجراف. والاختبار الحاسم رخيص: الإعلانات نفسها، المحلِّلان معًا، قارن الأرقام. وإعادة التدريب ستخبز الخلل في بيانات التدريب. ورسم التوزيع (خيار الانجراف) يعرض العَرَض الذي تراه أصلًا ولا يفرّق بين سوق تغيّر ومحلِّل تغيّر. وعلامة القيم المفقودة تجيب عن مشكلة لم يقسها أحد. وبعد ذلك أبقِ المحلِّل في دالة واحدة يستوردها التدريب والخدمة، وافحص عند البابين بالمخطط نفسه، ومعه مجموعة مسموحة للعملة (الدرس 6)."
        }
      },

      /* ---------------------------------------------------------- 24 */
      {
        id: "t1cx24",
        type: "multi",
        level: "hard",
        topics: ["t1-loader-versions", "t1-api-validation", "t1-capstone-dtypes"],
        q: {
          en: "Lesson 6 closes each problem thread of the chapter a little further, and says honestly what stays open. Which of these statements describe something that is <em>still open</em> after Lesson 6? (Choose all that apply.)",
          ar: "يغلق الدرس 6 كل خيط مشكلات في الفصل إغلاقًا أبعد قليلًا، ويقول بأمانة ما يبقى مفتوحًا. أيّ هذه العبارات تصف شيئًا <em>ما زال مفتوحًا</em> بعد الدرس 6؟ (اختر كل ما ينطبق.)"
        },
        options: [
          {
            en: "The loader describes one file layout, so a source that changes its layout is noticed only when the new file fails the schema.",
            ar: "يصف المحمِّل تخطيط ملف واحدًا، فالمصدر الذي يغيّر تخطيطه لا يُلاحَظ إلا حين يفشل الملف الجديد أمام المخطط."
          },
          {
            en: "A date format nobody anticipated is reported as a failed parse and stops the run; repairing it is the cleaning work of the next chapter.",
            ar: "صيغة تاريخ لم يتوقعها أحد يُبلَّغ عنها تحليلًا فاشلًا وتوقف التشغيل؛ وإصلاحها هو عمل التنظيف في الفصل التالي."
          },
          {
            en: "The measurement level of a column is still a human judgement; the code enforces only what someone wrote down.",
            ar: "مستوى قياس العمود ما زال حكمًا بشريًّا؛ والكود لا يفرض إلا ما كتبه أحد."
          },
          {
            en: "A saved snapshot of the API pages has no rule for when it is too old to use.",
            ar: "اللقطة المحفوظة لصفحات الـAPI ليس لها قاعدة تحدد متى تصير أقدم من أن تُستعمل."
          },
          {
            en: "<code>read_csv</code> still guesses the dtype of every column inside the loader, so one stray <code>1,150</code> can still turn a number column into text.",
            ar: "ما زالت <code>read_csv</code> تخمّن نوع كل عمود داخل المحمِّل، فـ<code>1,150</code> شاردة واحدة ما زالت قادرة على تحويل عمود عددي إلى نص."
          },
          {
            en: "<code>fetch_all()</code> can still return only the first two pages as if they were everything when page 3 keeps failing.",
            ar: "ما زالت <code>fetch_all()</code> قادرة على إعادة الصفحتين الأوليين وحدهما كأنهما كل شيء حين تظل الصفحة 3 تفشل."
          },
          {
            en: "A blank cell and a cell that failed to parse still end up as the same unexplained <code>NaN</code>, so the report cannot tell them apart.",
            ar: "الخلية الفارغة والخلية التي فشل تحليلها ما زالتا تنتهيان إلى <code>NaN</code> واحدة بلا تفسير، فلا يستطيع التقرير التمييز بينهما."
          }
        ],
        answer: [0, 1, 2, 3],
        hint: {
          en: "Sort the statements by the thread they belong to (load, parse, meaning, fetch). For each, ask whether the Lesson 6 code already does it, or whether the lesson itself says it does not.",
          ar: "رتّب العبارات بحسب الخيط الذي تنتمي إليه (التحميل، التحليل، المعنى، الجلب). واسأل عن كل منها: هل يفعله كود الدرس 6 فعلًا، أم يقول الدرس نفسه إنه لا يفعله؟"
        },
        explain: {
          en: "Still open, one per thread: <b>load</b> (one layout, a changed source shows only when it fails the schema), <b>parse</b> (an unknown format is reported, not fixed; that is the cleaning chapter), <b>meaning</b> (the level is a judgement, and the code enforces only what was written down) and <b>fetch</b> (a snapshot has no expiry or refresh policy, the timeliness question about a cache). The other three are what Lesson 6 closes: the loader reads text first and types each column from the schema, so <code>read_csv</code> no longer guesses; <code>fetch_all()</code> raises when a page keeps failing and checks the count against <code>total</code>; and the report counts blank cells and failed parses separately. The skill is to read a «Still open» line as a promise about the next chapter, not as a defect to patch with a clever hack today.",
          ar: "المفتوح، واحد لكل خيط: <b>التحميل</b> (تخطيط واحد، والمصدر المتغيّر لا يظهر إلا حين يفشل أمام المخطط)، و<b>التحليل</b> (صيغة مجهولة يُبلَّغ عنها ولا تُصلح؛ وهذا عمل فصل التنظيف)، و<b>المعنى</b> (المستوى حكم، والكود لا يفرض إلا ما كُتب)، و<b>الجلب</b> (اللقطة بلا سياسة انتهاء أو تجديد، وهو سؤال الحداثة مطبَّقًا على ذاكرة مخبّأة). أما الثلاث الأخرى فهي ما يغلقه الدرس 6: المحمِّل يقرأ النص أولًا وينمِّط كل عمود من المخطط، فلم تعد <code>read_csv</code> تخمّن؛ و<code>fetch_all()</code> ترفع حين تظل صفحة تفشل وتقارن العدد بـ<code>total</code>؛ والتقرير يعدّ الخلايا الفارغة والتحليلات الفاشلة منفصلة. والمهارة أن تقرأ سطر «ما زال مفتوحًا» وعدًا بالفصل التالي لا عيبًا يُرقَّع اليوم بحيلة ذكية."
        }
      }

    ]
  };
})();
