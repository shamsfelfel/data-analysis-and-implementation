window.DABanks = window.DABanks || {};
(function () {
  /* code(line, line, ...) -> one string with \n between lines */
  function code() { return Array.prototype.join.call(arguments, "\n"); }

  window.DABanks["t2-exam-a"] = {
    title: {
      en: "Chapter Test A — Core",
      ar: "اختبار الفصل أ — الأساسيات"
    },
    intro: {
      en: "24 questions that sample the whole chapter, four per lesson: the ideas every student must own by the end of it. They run in lesson order — what a transformation is and the order of the stages, missing values and their mechanisms, duplicates and ragged values, outliers and thresholds, encoding and scaling, and reshaping, merging and the assembled pipeline. Most are easy or medium; two are hard. Every figure and every printed output here was produced by running the code on <code>downloads/t2/</code> with Python 3.13, pandas 2.2 and NumPy 2.2, so check which frame a count belongs to: the 503 raw rows, the 480 real flats, the training rows or June's 85 listings. Plan for about 40 minutes. Every question has a hint, an answer and an explanation, hidden until you ask for them: try first, then open them. A revealed answer is not counted.",
      ar: "24 سؤالًا تغطي الفصل كله بواقع أربعة أسئلة لكل درس: الأفكار التي يجب أن يتقنها كل طالب في نهايته. تسير بترتيب الدروس — ما هو التحويل وترتيب المراحل، والقيم المفقودة وآلياتها، والمكرّرات والقيم المضطربة، والقيم الشاذة والحدود، والترميز وتوحيد المقياس، ثم إعادة التشكيل والدمج وخطّ الأنابيب المجمَّع. أغلبها سهل أو متوسط، واثنان صعبان. كل رقم وكل ناتج مطبوع هنا أُنتج بتشغيل الكود على <code>downloads/t2/</code> بـPython 3.13 وpandas 2.2 وNumPy 2.2، فتحقّق دائمًا لأي إطار ينتمي العدد: الصفوف الخام 503، أو الشقق الحقيقية 480، أو صفوف التدريب، أو إعلانات حزيران 85. خصّص نحو 40 دقيقة. لكل سؤال تلميح وجواب وشرح، وكلها مخفية حتى تطلبها: جرّب أولًا ثم افتحها. والجواب الذي يُظهَر لا يُحتسب."
    },
    questions: [

      /* ============================= Lesson 1 ============================= */
      {
        id: "t2ax01",
        type: "mcq",
        level: "easy",
        topics: ["t2-transformation", "t2-transform-vs-aggregate"],
        q: {
          en: "A step fills the 19 blank rents of <code>listings_raw.csv</code> with the median of the column and hands back a frame. <code>raw.shape</code> is <code>(503, 13)</code> before it and <code>(503, 13)</code> after it. Which statement about that step is true?",
          ar: "خطوة تعبّئ الإيجارات الفارغة الـ19 في <code>listings_raw.csv</code> بوسيط العمود وتُعيد إطارًا. <code>raw.shape</code> يساوي <code>(503, 13)</code> قبلها و<code>(503, 13)</code> بعدها. أي العبارات صحيح عن هذه الخطوة؟"
        },
        options: [
          {
            en: "It is an aggregation, because a median collapses 484 rents into one number, and an aggregation can only ever end a pipeline rather than be followed by another step.",
            ar: "إنها تجميع (aggregation)، لأن الوسيط يضغط 484 إيجارًا في رقم واحد، والتجميع لا يمكن إلا أن يُنهي خطّ الأنابيب لا أن تتبعه خطوة أخرى."
          },
          {
            en: "It is neither: filling a blank repairs the file rather than the table, so it belongs with loading.",
            ar: "إنها لا هذا ولا ذاك: تعبئة الفراغ ترميم للملف لا للجدول، فموضعها مع القراءة (loading)."
          },
          {
            en: "It is a transformation — one row still means one flat — and the median inside it is an aggregation, so ask which rows it read.",
            ar: "إنها تحويل (transformation) — فالصف ما زال يعني شقة واحدة — والوسيط داخلها تجميع، فاسأل أي الصفوف قرأ."
          },
          {
            en: "It is a transformation, and since the row count did not move from 503, no parameter inside it can leak into a later step of the pipeline.",
            ar: "إنها تحويل، وبما أن عدد الصفوف لم يتحرّك عن 503 فلا يمكن لأي وسيط داخلها أن يتسرّب إلى خطوة لاحقة في خطّ الأنابيب."
          }
        ],
        answer: 2,
        hint: {
          en: "The test is the unit of a row, not the number of rows. Then ask the second question Concept 1 insists on: where did that single number come from?",
          ar: "المحك هو وحدة الصف لا عدد الصفوف. ثم اطرح السؤال الثاني الذي يُصرّ عليه المفهوم 1: من أين جاء ذلك الرقم الواحد؟"
        },
        explain: {
          en: "A transformation returns a table in which one row still means the same kind of thing, and here it does: one advert for one flat, still identified by <code>listing_id</code>. The answer that calls it an aggregation is the tempting one, because a median really is an aggregation — but it is an aggregation <em>inside</em> the step, not the step's output, which is why Lesson 1 warns that most real steps hide a tiny aggregation and that this is exactly where the chapter's two worst bugs live. The answer that declares the step leak-free because the row count held is the misconception the warning exists for: the median was computed from 484 rents, and whether those rents included the rows you promised to hold back is a question the shape cannot answer. Carry away the two-part test: does one row still mean one flat, and which rows did the number come from?",
          ar: "التحويل يُعيد جدولًا يبقى فيه معنى الصف من النوع نفسه، وهذا ما يحدث هنا: إعلان واحد لشقة واحدة، ولا يزال <code>listing_id</code> يعرّفه. والجواب الذي يسمّيها تجميعًا هو المغري، لأن الوسيط تجميع بالفعل — لكنه تجميع <em>داخل</em> الخطوة لا ناتجها، ولهذا يحذّر الدرس 1 من أن معظم الخطوات الواقعية تُخفي تجميعًا صغيرًا، وأن في هذا الموضع بالضبط يسكن أسوأ خطأين في الفصل. أما الجواب الذي يُبرّئ الخطوة من التسرّب لأن عدد الصفوف ثبت فهو المفهوم الخاطئ الذي وُضع التحذير من أجله: الوسيط حُسب من 484 إيجارًا، وهل كانت تلك الإيجارات تضمّ الصفوف التي وعدت بحجزها؟ سؤال لا يجيب عنه الشكل. فاحمل معك الاختبار المزدوج: هل ما زال الصف يعني شقة واحدة، ومن أي الصفوف جاء الرقم؟"
        }
      },

      {
        id: "t2ax02",
        type: "order",
        level: "easy",
        topics: ["t2-canonical-order", "t2-pipeline-order"],
        q: {
          en: "Five jobs on <code>listings_raw.csv</code>, written as the real operations this chapter performs. Put them in the canonical order, which follows one principle: a stage may only learn from data that no later stage will change.",
          ar: "خمس مهامّ على <code>listings_raw.csv</code>، مكتوبةً بالعمليات الحقيقية التي يؤدّيها هذا الفصل. رتّبها بالترتيب القياسي، وهو ترتيب يتبع مبدأً واحدًا: لا يحقّ لمرحلة أن تتعلّم إلا من بيانات لن تغيّرها مرحلة لاحقة."
        },
        items: [
          {
            en: "Drop the 14 byte-for-byte repeats and keep one row per <code>listing_id</code>, leaving 480 flats",
            ar: "احذف التكرارات الـ14 المتطابقة بايتًا ببايت وأبقِ صفًّا واحدًا لكل <code>listing_id</code>، فتبقى 480 شقة"
          },
          {
            en: "Rewrite the 26 city spellings as 5 canonical names, and void the rent of 99999 and the five areas recorded in dunum",
            ar: "أعِد كتابة تهجئات المدن الـ26 بخمسة أسماء معيارية، وأبطِل الإيجار 99999 والمساحات الخمس المسجَّلة بالدونم"
          },
          {
            en: "Fill the blank areas with the median area of flats that have the same number of rooms",
            ar: "عبّئ المساحات الفارغة بوسيط مساحة الشقق التي لها عدد الغرف نفسه"
          },
          {
            en: "Fit the 1.5 × IQR fence on the rent column and flag every value that falls outside it",
            ar: "اضبط سياج 1.5 × المدى الربيعي على عمود الإيجار وعلّم كل قيمة تخرج عنه"
          },
          {
            en: "One-hot the <code>city</code> column and scale <code>area_m2</code> onto [0, 1]",
            ar: "رمّز عمود <code>city</code> ترميزًا أحاديًّا ووحّد مقياس <code>area_m2</code> على المدى [0، 1]"
          }
        ],
        answer: [0, 1, 2, 3, 4],
        hint: {
          en: "Ask of each job: what number does it learn, and which of the other jobs could still move that number?",
          ar: "اسأل عن كل مهمّة: أي رقم تتعلّمه، وأي المهامّ الأخرى قادرة بعد على تحريك ذلك الرقم؟"
        },
        explain: {
          en: "Structure, values, missing, outliers, encode and scale. Deduplication is first because every parameter later in the list is an average over rows, so the set of rows has to be final before anything is averaged — a repeated row votes twice in every median that follows. Value repair comes before the hole count, because 99999 is not a rare rent and an area of 0.04 is not an area, and counting holes or quartiles before fixing them measures the typo instead of the market. Imputation comes before the fence, because a fence is computed from quartiles and filling 27 areas moves them. Scaling is always last: it learns a minimum, a maximum, a mean or a standard deviation, and every one of the four earlier stages can still change all four — with the 99999 still in the rent column, min–max puts 460 of 461 rents below 0.01 and nothing raises.",
          ar: "البنية، ثم القيم، ثم المفقود، ثم الشواذ، ثم الترميز وتوحيد المقياس. حذف المكرّر أولًا لأن كل وسيط لاحق في القائمة متوسطٌ على الصفوف، فلا بدّ أن تكون مجموعة الصفوف نهائية قبل أي متوسط — فالصف المكرّر يصوّت مرتين في كل وسيط يأتي بعده. وترميم القيم قبل عدّ الفراغات، لأن 99999 ليس إيجارًا نادرًا والمساحة 0.04 ليست مساحة، وعدّ الفراغات أو حساب الأرباع قبل الإصلاح يقيس خطأ الإدخال لا السوق. والتعويض قبل السياج، لأن السياج يُحسب من الأرباع وتعبئة 27 مساحة تحرّكها. وتوحيد المقياس أخيرًا دائمًا: فهو يتعلّم حدًّا أدنى وأعلى أو متوسطًا وانحرافًا معياريًّا، وكل مرحلة من الأربع السابقة قادرة على تغيير الأربعة — ومع بقاء 99999 في عمود الإيجار يضع توحيد الحدَّين 460 من 461 إيجارًا تحت 0.01 دون أن يُثار أي خطأ."
        }
      },

      {
        id: "t2ax03",
        type: "contrast",
        level: "medium",
        topics: ["t2-fit-apply", "t2-fitted-dict", "t2-leakage"],
        q: {
          en: "Place each statement under <em>a fitted parameter</em>, under <em>a pure apply step</em>, or under both.",
          ar: "ضع كل عبارة تحت <em>وسيط مضبوط</em>، أو تحت <em>خطوة تطبيق محض</em>، أو تحت كلتيهما."
        },
        concepts: [
          { en: "A fitted parameter", ar: "وسيط مضبوط (fitted)" },
          { en: "A pure apply step", ar: "خطوة تطبيق محض (pure apply)" }
        ],
        rows: [
          {
            s: {
              en: "The median rent of 200.0 that fills the blank rents",
              ar: "وسيط الإيجار 200.0 الذي يعبّئ الإيجارات الفارغة"
            },
            a: 0
          },
          {
            s: {
              en: "Multiplying an area recorded in dunum by 1,000 to get square metres",
              ar: "ضرب مساحة مسجَّلة بالدونم في 1000 للحصول على أمتار مربّعة"
            },
            a: 1
          },
          {
            s: {
              en: "The list of five city names the one-hot columns are built from",
              ar: "قائمة أسماء المدن الخمسة التي تُبنى عليها أعمدة الترميز الأحادي"
            },
            a: 0
          },
          {
            s: {
              en: "Changing <code>random_state=3</code> to <code>random_state=0</code> can change it",
              ar: "تغيير <code>random_state=3</code> إلى <code>random_state=0</code> قادر على تغييره"
            },
            a: 0
          },
          {
            s: {
              en: "It may touch the held-out rows, and next month's file, without leaking",
              ar: "يجوز أن يمسّ الصفوف المحجوزة وملفَّ الشهر القادم دون تسرّب"
            },
            a: 2
          },
          {
            s: {
              en: "It can be run on a file before anybody has fitted anything",
              ar: "يمكن تشغيله على ملف قبل أن يضبط أحدٌ أي شيء"
            },
            a: 1
          },
          {
            s: {
              en: "Recomputing it on June's 85 listings makes March and June incomparable",
              ar: "إعادة حسابه على إعلانات حزيران الـ85 تجعل آذار وحزيران غير قابلين للمقارنة"
            },
            a: 0
          }
        ],
        hint: {
          en: "One question separates them: does this step read many rows to produce a number? And remember that a parameter is dangerous when it is <em>learned</em>, not when it is used.",
          ar: "سؤال واحد يفصل بينهما: هل تقرأ هذه الخطوة صفوفًا كثيرة لتُنتج رقمًا؟ وتذكّر أن الوسيط خطِر حين <em>يُتعلَّم</em>، لا حين يُستخدَم."
        },
        explain: {
          en: "A fitted parameter is learned from many rows at once — a median, a category list, a fence, a minimum and a maximum — so it depends on <em>which</em> rows were read, which is why the split seed can change it and why refitting it next month makes two months incomparable for a reason no flat caused. A pure apply step learns nothing: multiplying a dunum area by 1,000 comes from the unit, not from the column, so it needs no parameters and can run on a file before anything has been fitted. The row that catches most people is the one about the held-out rows: it is true of both. Applying a stored parameter to rows you held back is not a leak — the leak is in the fitting. That is the whole reason Lesson 1 puts the parameters in a <code>fitted</code> dictionary: once they are named and stored, applying them anywhere is safe and refitting them anywhere is visible.",
          ar: "الوسيط المضبوط يُتعلَّم من صفوف كثيرة في آن — وسيط، أو قائمة فئات، أو سياج، أو حدٌّ أدنى وأعلى — فهو يعتمد على <em>أي</em> الصفوف قُرئت، ولذلك تستطيع بذرة التقسيم تغييره، ولذلك تُفسد إعادة ضبطه الشهر القادم المقارنة بين شهرين لسبب لم تُحدثه أي شقة. أما خطوة التطبيق المحض فلا تتعلّم شيئًا: ضرب مساحة بالدونم في 1000 يأتي من الوحدة لا من العمود، فلا تحتاج وسائط ويمكن تشغيلها على ملف قبل ضبط أي شيء. والسطر الذي يُسقط معظم الناس هو سطر الصفوف المحجوزة: فهو صحيح في الحالتين. تطبيق وسيط مخزَّن على صفوف حجزتها ليس تسرّبًا — التسرّب في الضبط. وهذا كلّ سبب وضع الدرس 1 للوسائط في قاموس <code>fitted</code>: فمتى سُمّيت وخُزّنت صار تطبيقها في أي مكان آمنًا، وصارت إعادة ضبطها في أي مكان مرئية."
        }
      },

      {
        id: "t2ax04",
        type: "tf",
        level: "easy",
        topics: ["t2-raw-immutable", "t2-view-copy"],
        q: {
          en: "A colleague wants to repair the 19 rows whose city is written <code>gaza</code>, while keeping the file she was given intact. True or false: after these two lines, <code>raw</code> still holds those 19 rows spelled <code>gaza</code>, because <code>.loc</code> wrote into <code>work</code>.",
          ar: "أرادت زميلة ترميم الصفوف الـ19 التي كُتبت مدينتها <code>gaza</code>، مع إبقاء الملف الذي تلقّته سليمًا. صحيح أم خطأ: بعد هذين السطرين ما زال <code>raw</code> يحمل تلك الصفوف الـ19 بتهجئة <code>gaza</code>، لأن <code>.loc</code> كتبت في <code>work</code>."
        },
        code: code(
          "work = raw",
          "work.loc[work[\"city\"] == \"gaza\", \"city\"] = \"Gaza\""
        ),
        lang: "python",
        truth: false,
        hint: {
          en: "Ask what the first line actually created. How many DataFrames exist after it has run?",
          ar: "اسأل ما الذي أنشأه السطر الأول فعلًا. كم إطار بيانات موجود بعد تنفيذه؟"
        },
        explain: {
          en: "False, and nothing warns. <code>work = raw</code> creates a second <em>name</em> for one DataFrame, not a second DataFrame: <code>work is raw</code> is <code>True</code>, so the 19 cells are rewritten in the table the caller handed over and <code>(raw[\"city\"] == \"gaza\").sum()</code> comes back 0. The belief that <code>.loc</code> protects the original is the tempting half-truth — <code>.loc</code> is exactly the right tool for writing, which is why it writes where you pointed it. The habit that makes this impossible is one line: copy once at the top (<code>work = raw.copy()</code>), then use <code>.loc</code>, <code>assign</code> and <code>pipe</code> on the copy, and the raw table still reports 503 rows, 19 blank rents and a maximum of 99999 after the whole pipeline has run.",
          ar: "خطأ، ولا شيء يحذّر. <code>work = raw</code> يُنشئ <em>اسمًا</em> ثانيًا لإطار واحد لا إطارًا ثانيًا: فـ<code>work is raw</code> يساوي <code>True</code>، وبذلك تُعاد كتابة الخلايا الـ19 في الجدول الذي سلّمه المتصل، ويعود <code>(raw[\"city\"] == \"gaza\").sum()</code> بصفر. والاعتقاد بأن <code>.loc</code> تحمي الأصل نصفُ حقيقة مغرٍ — فـ<code>.loc</code> هي الأداة الصحيحة تمامًا للكتابة، ولذلك تكتب حيث وجّهتها. والعادة التي تجعل هذا مستحيلًا سطر واحد: انسخ مرة في الأعلى (<code>work = raw.copy()</code>) ثم استخدم <code>.loc</code> و<code>assign</code> و<code>pipe</code> على النسخة، فيبقى الجدول الخام مبلّغًا عن 503 صفوف و19 إيجارًا فارغًا وحدٍّ أقصى 99999 بعد تشغيل خطّ الأنابيب كله."
        }
      },

      /* ============================= Lesson 2 ============================= */
      {
        id: "t2ax05",
        type: "mcq",
        level: "easy",
        topics: ["t2-mcar", "t2-mar", "t2-mnar"],
        q: {
          en: "Three columns of <code>listings_raw.csv</code> have holes. <code>area_m2</code> has 27, scattered with no pattern anybody can find. <code>deposit</code> has 123, and 103 of them are every single row of <code>Noor Estates</code> (74) and <code>Diwan Rentals</code> (29). <code>monthly_rent</code> has 19, and those 19 listings average 3.58 rooms against 3.04, 81.5 m² against 71.8, and are in excellent condition 32% of the time against 15% — because the site prints “price on request” for its premium flats. Which reading of the three is right?",
          ar: "ثلاثة أعمدة في <code>listings_raw.csv</code> فيها فراغات. <code>area_m2</code> فيه 27 فراغًا مبثوثةً بلا نمط يجده أحد. و<code>deposit</code> فيه 123، و103 منها هي كل صفوف <code>Noor Estates</code> (74) و<code>Diwan Rentals</code> (29) دون استثناء. و<code>monthly_rent</code> فيه 19، ومتوسط تلك الإعلانات الـ19 هو 3.58 غرفة مقابل 3.04، و81.5 م² مقابل 71.8، وحالتها ممتازة في 32% من الحالات مقابل 15% — لأن الموقع يطبع «السعر عند الطلب» لشققه الفاخرة. أي قراءة للأعمدة الثلاثة صحيحة؟"
        },
        options: [
          {
            en: "<code>area_m2</code> is MCAR; <code>deposit</code> is MAR, its blanks being every row of two agencies; and <code>monthly_rent</code> is MNAR, because the site hides the expensive prices.",
            ar: "<code>area_m2</code> فقدٌ عشوائي تامّ (MCAR)؛ و<code>deposit</code> فقدٌ عشوائي مشروط (MAR) وفراغاته كل صفوف وكالتين؛ و<code>monthly_rent</code> فقدٌ غير عشوائي (MNAR) لأن الموقع يُخفي الأسعار الغالية."
          },
          {
            en: "<code>deposit</code> is MNAR, because 123 blanks out of 503 is far too many to be the work of chance, and <code>monthly_rent</code> is MAR, because the rooms and the area of its blank rows differ from the rest of the file.",
            ar: "<code>deposit</code> فقدٌ غير عشوائي (MNAR) لأن 123 فراغًا من 503 أكثر بكثير من أن تكون صنيعةَ مصادفة، و<code>monthly_rent</code> فقدٌ عشوائي مشروط (MAR) لأن غرف صفوفه الفارغة ومساحاتها تختلف عن بقية الملف."
          },
          {
            en: "All three are MAR: for each one there is another column in the table whose values differ between the blank rows and the rest, which is exactly what MAR means.",
            ar: "الثلاثة كلها فقدٌ عشوائي مشروط (MAR): فلكل واحد منها عمود آخر في الجدول تختلف قيمه بين الصفوف الفارغة وبقية الصفوف، وهذا هو معنى MAR بالضبط."
          },
          {
            en: "<code>deposit</code> is MAR; <code>area_m2</code> and <code>monthly_rent</code> cannot be labelled at all, because a mechanism is a fact about how the data was made and is never visible in the file.",
            ar: "<code>deposit</code> فقدٌ عشوائي مشروط (MAR)؛ أما <code>area_m2</code> و<code>monthly_rent</code> فلا يمكن تسميتهما أصلًا، لأن الآلية واقعة عن كيفية إنشاء البيانات ولا تظهر في الملف قطّ."
          }
        ],
        answer: 0,
        hint: {
          en: "One question, asked three times: does being blank depend on nothing, on a column you can see, or on the value that is missing?",
          ar: "سؤال واحد يُطرح ثلاث مرات: هل يعتمد كون الخلية فارغةً على لا شيء، أم على عمود تستطيع رؤيته، أم على القيمة المفقودة نفسها؟"
        },
        explain: {
          en: "The three labels answer one question about what the blankness depends on: nothing (MCAR, <code>area_m2</code>), a column you can see (MAR, <code>deposit</code> by <code>agency</code>), or the hidden value itself (MNAR, <code>monthly_rent</code>). The answer that makes <code>deposit</code> MNAR is the tempting one, because 123 holes feels like the most serious problem in the file — but the <em>number</em> of holes says nothing about the mechanism, and here the deposit's blankness is fully explained by a column that is right there in the table. The answer that makes everything MAR confuses a hint with the mechanism: the rooms and the area of the blank-rent rows do differ, and that is evidence the rent's blankness depends on the rent, not on the rooms. And the answer that refuses to label anything overcorrects a true warning: these labels are hints rather than proof, MNAR can never be established from the file alone, and you still have to name one, because the name is what decides whether you drop, impute or flag.",
          ar: "التسميات الثلاث تجيب عن سؤال واحد: على ماذا يعتمد كون الخلية فارغة؟ على لا شيء (MCAR، أي <code>area_m2</code>)، أم على عمود تستطيع رؤيته (MAR، أي <code>deposit</code> بحسب <code>agency</code>)، أم على القيمة المخفيّة نفسها (MNAR، أي <code>monthly_rent</code>). والجواب الذي يجعل <code>deposit</code> فقدًا غير عشوائي هو المغري، لأن 123 فراغًا تبدو أخطر مشكلة في الملف — لكن <em>عدد</em> الفراغات لا يقول شيئًا عن الآلية، وهنا يُفسَّر فراغ التأمين تفسيرًا تامًّا بعمود حاضر في الجدول. والجواب الذي يجعل الكل MAR يخلط القرينة بالآلية: نعم تختلف غرف صفوف الإيجار الفارغ ومساحاتها، وهذا دليل على أن فراغ الإيجار يعتمد على الإيجار لا على الغرف. أما الجواب الذي يرفض التسمية فيُبالغ في تصحيح تحذير صحيح: هذه التسميات قرائن لا أدلّة، والـMNAR لا يُثبت من الملف وحده قطّ، ومع ذلك عليك أن تسمّي واحدة، لأن التسمية هي ما يقرّر: أتحذف أم تعوّض أم تعلّم؟"
        }
      },

      {
        id: "t2ax06",
        type: "multi",
        level: "medium",
        topics: ["t2-never-impute-target", "t2-impute-mnar-cost"],
        q: {
          en: "The chapter's question is “what rent should this listing ask?”, so <code>monthly_rent</code> is the target. Somebody proposes filling its 19 blanks with the training median of 200.0 rather than dropping those rows. Which of these statements are true? (Choose all that apply.)",
          ar: "سؤال الفصل هو «أي إيجار ينبغي أن يطلبه هذا الإعلان؟»، فـ<code>monthly_rent</code> هو الهدف (target). ويقترح أحدهم تعبئة فراغاته الـ19 بوسيط التدريب 200.0 بدل حذف تلك الصفوف. أي العبارات صحيح؟ (اختر كل ما ينطبق.)"
        },
        options: [
          {
            en: "The 19 filled cells would be answers nobody ever quoted, and a supervised method would faithfully learn to reproduce them.",
            ar: "ستكون الخلايا الـ19 المعبَّأة أجوبةً لم يُعلنها أحد قطّ، وسيتعلّم المنهج المراقَب (supervised) إنتاجها بأمانة."
          },
          {
            en: "Hiding the 19 dearest known rents and filling them with the median of the rest costs 242.37 shekels per hole, against 58.95 when 19 are hidden at random.",
            ar: "إخفاء الإيجارات المعلومة الـ19 الأغلى وتعبئتها بوسيط ما تبقّى يُكلّف 242.37 شيكلًا لكل فراغ، مقابل 58.95 حين تُخفى 19 عشوائيًّا."
          },
          {
            en: "The held-out mean absolute error of the baseline would reveal the damage, because that ruler is computed over every row of the held-out set and would see the invented rents.",
            ar: "سيكشف متوسط الخطأ المطلق المحجوز للخط القاعدي هذا الضرر، لأن تلك المسطرة تُحسب على كل صفوف المجموعة المحجوزة فسترى الإيجارات المختلقة."
          },
          {
            en: "Adding a <code>rent_missing</code> flag beside the fill would make the invention auditable, and is therefore the compromise this lesson recommends over dropping the rows.",
            ar: "إضافة عَلَم <code>rent_missing</code> إلى جانب التعبئة تجعل الاختلاق قابلًا للتدقيق، فهي الحلّ الوسط الذي يوصي به هذا الدرس بدل حذف الصفوف."
          },
          {
            en: "Because every hidden rent lies above the fill, the errors cannot cancel: the mean absolute error is simply their mean minus the fill.",
            ar: "لأن كل إيجار مخفيّ يقع فوق قيمة التعبئة، لا يمكن للأخطاء أن تتلاشى: فمتوسط الخطأ المطلق هو ببساطة متوسطها ناقصًا قيمة التعبئة."
          }
        ],
        answer: [0, 1, 4],
        hint: {
          en: "Two of these are about what the fill does to the column, and one is about whether your ruler could ever see it. Ask which rows the mean absolute error is computed on.",
          ar: "اثنتان من هذه عن أثر التعبئة في العمود، وواحدة عن قدرة مسطرتك على رؤيته أصلًا. اسأل على أي الصفوف يُحسب متوسط الخطأ المطلق."
        },
        explain: {
          en: "The rule is not a judgement call: drop the rows whose target is missing, keep the rows whose features are. A row with no rent cannot teach a rent predictor anything, and a filled target is a fabricated answer the method will learn to reproduce. The measured cost is the two statements about hiding the dearest rents, read together: that is what “price on request” does, and the median fill is then wrong by 242.37 shekels per row, every one of them in the same direction — hide 19 at random and the misses cancel to 58.95. The claim about the ruler is the dangerous false one: the mean absolute error is computed only on rows whose true rent exists, so the 19 invented labels never appear in any MAE in this chapter. A step that fills them badly is invisible to the measurement, which is exactly why Lesson 2 argues about mechanisms instead of just measuring. And the flag is the one you must never build: <code>rent_missing</code> is <code>False</code> on every row you can score and <code>True</code> on exactly the rows you need a prediction for, so no validation can ever test it.",
          ar: "القاعدة ليست مسألة تقدير: احذف الصفوف التي فُقد هدفها، وأبقِ الصفوف التي فُقدت خصائصها. فالصف الذي لا إيجار له لا يعلّم متنبّئَ إيجارٍ شيئًا، والهدف المعبَّأ جوابٌ مختلَق سيتعلّم المنهج إنتاجه. والثمن المقيس هو العبارتان المتعلّقتان بإخفاء الإيجارات الأغلى، تُقرأان معًا: فذاك ما يفعله «السعر عند الطلب»، فتُخطئ تعبئة الوسيط بـ242.37 شيكلًا لكل صف، كلها في الاتجاه نفسه — وأخفِ 19 عشوائيًّا فتتلاشى الأخطاء إلى 58.95. أما الادّعاء عن المسطرة فهو الخطأ الخطير: متوسط الخطأ المطلق لا يُحسب إلا على الصفوف التي يوجد إيجارها الحقيقي، فلا تظهر اللافتات الـ19 المختلقة في أي متوسط خطأ في هذا الفصل. والخطوة التي تعبّئها تعبئةً سيّئة غير مرئية للقياس، ولهذا بالضبط يحاجج الدرس 2 بالآليات لا بالقياس وحده. والعَلَم هو ذاك الذي لا يجوز بناؤه: <code>rent_missing</code> يساوي <code>False</code> في كل صف تستطيع تقييمه و<code>True</code> في الصفوف التي تحتاج التنبّؤ لها بالضبط، فلا يستطيع أي تحقّق اختباره."
        }
      },

      {
        id: "t2ax07",
        type: "complete",
        level: "medium",
        topics: ["t2-group-imputation", "t2-missing-decisions", "t2-missing-next-month"],
        q: {
          en: "Lesson 2 decided to fill a blank <code>area_m2</code> with the median area of flats that have the same number of rooms, and measured it: 5.16 m² of error per hole against 15.10 for one global median. The medians below were fitted on March's training rows and must not be recomputed. Complete the line so that the program prints exactly the two commented lines.",
          ar: "قرّر الدرس 2 تعبئة <code>area_m2</code> الفارغة بوسيط مساحة الشقق التي لها عدد الغرف نفسه، وقاس ذلك: 5.16 م² من الخطأ لكل فراغ مقابل 15.10 لوسيط عامّ واحد. والوسائط أدناه مضبوطة على صفوف التدريب في آذار ولا يجوز إعادة حسابها. أكمل السطر لكي يطبع البرنامج السطرين المعلَّقين بالضبط."
        },
        code: code(
          "import pandas as pd",
          "",
          "june = pd.read_csv(\"listings_new.csv\")           # 85 rows, 3 blank area_m2",
          "f = {\"area_by_rooms\": {1: 37.9, 2: 54.35, 3: 72.55, 4: 88.0, 5: 104.3},",
          "     \"area_median\": 73.45}                       # both fitted on March's training rows",
          "",
          "filled = ______",
          "",
          "print(\"blank areas:\", int(june[\"area_m2\"].isna().sum()), \"->\", int(filled.isna().sum()))",
          "print(\"values used:\", sorted(set(filled[june[\"area_m2\"].isna()])))",
          "",
          "# blank areas: 3 -> 0",
          "# values used: [54.35, 72.55]"
        ),
        options: [
          {
            code: "june[\"area_m2\"].fillna(f[\"area_median\"])"
          },
          {
            code: "june[\"area_m2\"].fillna(june.groupby(\"rooms\")[\"area_m2\"].transform(\"median\")).fillna(f[\"area_median\"])"
          },
          {
            code: "june[\"area_m2\"].fillna(june[\"rooms\"].map(f[\"area_by_rooms\"])).fillna(f[\"area_median\"])"
          },
          {
            code: "june[\"area_m2\"].ffill()"
          }
        ],
        answer: 2,
        solution: {
          code: code(
            "filled = (june[\"area_m2\"]",
            "          .fillna(june[\"rooms\"].map(f[\"area_by_rooms\"]))   # the fitted group medians",
            "          .fillna(f[\"area_median\"]))                       # the fallback, for a group never fitted",
            "",
            "print(\"blank areas:\", int(june[\"area_m2\"].isna().sum()), \"->\", int(filled.isna().sum()))",
            "print(\"values used:\", sorted(set(filled[june[\"area_m2\"].isna()])))"
          ),
          out: code(
            "blank areas: 3 -> 0",
            "values used: [54.35, 72.55]"
          ),
          en: "<code>.map()</code> looks the fitted median up by room count rather than recomputing it, so June is filled with March's numbers and the two months stay comparable. The second <code>.fillna</code> is the fallback: a room count the fit never saw maps to <code>NaN</code>, and without the fallback that cell stays silently blank.",
          ar: "<code>.map()</code> تبحث عن الوسيط المضبوط بعدد الغرف بدل إعادة حسابه، فتُعبَّأ إعلانات حزيران بأرقام آذار ويبقى الشهران قابلين للمقارنة. و<code>.fillna</code> الثانية هي البديل: عدد غرفٍ لم يره الضبط يُقابله <code>NaN</code>، وبغير البديل تبقى تلك الخلية فارغةً بصمت."
        },
        hint: {
          en: "Read the second printed line before you choose: it names the exact two numbers that went into the three cells. Where could those two numbers have come from?",
          ar: "اقرأ السطر الثاني المطبوع قبل أن تختار: فهو يسمّي الرقمين اللذين دخلا الخلايا الثلاث بالضبط. من أين يمكن أن يكون هذان الرقمان قد جاءا؟"
        },
        explain: {
          en: "The three blank areas belong to flats with 3, 2 and 2 rooms, so the fitted dictionary supplies 72.55 and 54.35 — the printed <code>values used</code> line is what identifies the answer. The <code>transform(\"median\")</code> version is the tempting one and it fills all three cells with no error at all; it just computes the medians from <em>June itself</em>, giving 73.0 and 59.25, which is both a different answer and a parameter learned from the batch it is applied to. The global median alone fills every hole with 73.45, throwing away the room count that the measurement says is worth almost 10 m² per hole. <code>ffill()</code> gives a flat the area of whatever row happens to sit above it in the file, which Lesson 2 showed giving a Khan Younis flat the area of a Rafah flat. And the second <code>.fillna</code> earns its place even though it changes nothing here: a batch with a seven-room flat and no area would otherwise come out of the pipeline with a blank cell in the feature matrix.",
          ar: "المساحات الفارغة الثلاث تنتمي إلى شقق بـ3 و2 و2 غرف، فيوفّر القاموس المضبوط 72.55 و54.35 — وسطر <code>values used</code> المطبوع هو ما يميّز الجواب. ونسخة <code>transform(\"median\")</code> هي المغرية، وهي تعبّئ الخلايا الثلاث بلا أي خطأ؛ غير أنها تحسب الوسائط من <em>حزيران نفسه</em>، فتعطي 73.0 و59.25، وهذا جوابٌ مختلف ووسيطٌ تعلّمه من الدفعة التي يُطبَّق عليها في الوقت نفسه. والوسيط العامّ وحده يعبّئ كل فراغ بـ73.45، فيهدر عدد الغرف الذي يقول القياس إنه يستحقّ نحو 10 م² لكل فراغ. و<code>ffill()</code> تعطي شقةً مساحةَ أي صف يسبقها في الملف، وقد أظهر الدرس 2 أن ذلك يمنح شقةً في خان يونس مساحةَ شقةٍ في رفح. و<code>.fillna</code> الثانية تستحقّ موضعها وإن لم تغيّر شيئًا هنا: فدفعةٌ فيها شقة بسبع غرف بلا مساحة ستخرج من خطّ الأنابيب وفي مصفوفة خصائصها خلية فارغة."
        }
      },

      {
        id: "t2ax08",
        type: "tf",
        level: "easy",
        topics: ["t2-impute-centre", "t2-missing-indicator"],
        q: {
          en: "<code>condition</code> is the strongest predictor of rent in this file. After normalising, its four levels on the 503 rows are <code>good</code> 188, <code>fair</code> 144, <code>excellent</code> 79, <code>poor</code> 56, and 36 cells are blank — so <code>good</code> is 37.4% of the file. True or false: filling the 36 blanks with the mode is a safe default here, because the mode invents no value the column does not already contain.",
          ar: "<code>condition</code> هو أقوى منبّئ بالإيجار في هذا الملف. وبعد التطبيع تكون مستوياته الأربعة على الصفوف الـ503: <code>good</code> 188 و<code>fair</code> 144 و<code>excellent</code> 79 و<code>poor</code> 56، مع 36 خلية فارغة — فتكون <code>good</code> 37.4% من الملف. صحيح أم خطأ: تعبئة الفراغات الـ36 بالمنوال خيارٌ افتراضي آمن هنا، لأن المنوال لا يختلق قيمةً لا يحتويها العمود أصلًا."
        },
        truth: false,
        hint: {
          en: "Work out what <code>good</code>'s share becomes after the fill, and then ask what a model reads that share as.",
          ar: "احسب ما تصير إليه نسبة <code>good</code> بعد التعبئة، ثم اسأل: كيف يقرأ النموذج تلك النسبة؟"
        },
        explain: {
          en: "False. “Invents no new value” is true and is not the question: the fill writes <code>good</code> into 36 rows that said nothing, which takes <code>good</code> from 37.4% to 44.5% of the column and rewrites the distribution of the strongest predictor of rent. Every one of those 36 flats is now asserted to be in good condition, and nothing anywhere records that 36 of the 224 <code>good</code> listings are an assumption. That is the general bill for imputing a category by its mode, and it is worse here than for a numeric column, because the fill is not a compromise between the possibilities — it picks one level and states it. The honest options Lesson 2 names are both cheap: write an indicator column before the fill so the invention is auditable, or give the blanks their own <code>unknown</code> level and let Lesson 5 encode it, which keeps “we were not told” as a fact rather than turning it into a claim.",
          ar: "خطأ. «لا يختلق قيمةً جديدة» عبارة صحيحة وليست هي السؤال: فالتعبئة تكتب <code>good</code> في 36 صفًّا لم تقل شيئًا، فترفع <code>good</code> من 37.4% إلى 44.5% من العمود وتعيد كتابة توزيع أقوى منبّئ بالإيجار. وكل واحدة من تلك الشقق الـ36 صار يُقال عنها إنها بحالة جيدة، ولا شيء في أي مكان يسجّل أن 36 من إعلانات <code>good</code> الـ224 افتراض. وهذه هي الفاتورة العامّة لتعويض فئةٍ بمنوالها، وهي هنا أسوأ منها في عمود عددي، لأن التعبئة ليست حلًّا وسطًا بين الاحتمالات — إنها تختار مستوًى واحدًا وتُعلنه. والخيارات الأمينة التي يسمّيها الدرس 2 كلتاهما رخيصة: اكتب عمود عَلَم قبل التعبئة ليكون الاختلاق قابلًا للتدقيق، أو أعطِ الفراغات مستوى <code>unknown</code> خاصًّا بها واجعل الدرس 5 يرمّزه، فتبقى عبارة «لم يُخبرنا أحد» واقعةً لا ادّعاءً."
        }
      },

      /* ============================= Lesson 3 ============================= */
      {
        id: "t2ax09",
        type: "contrast",
        level: "easy",
        topics: ["t2-exact-duplicate", "t2-repost"],
        q: {
          en: "The 503 rows of <code>listings_raw.csv</code> describe 480 real flats, and they contain two different kinds of duplicate. Place each statement under <em>an exact duplicate</em>, under <em>a repost</em>, or under both.",
          ar: "تصف الصفوف الـ503 في <code>listings_raw.csv</code> 480 شقة حقيقية، وفيها نوعان مختلفان من التكرار. ضع كل عبارة تحت <em>تكرار تامّ</em>، أو تحت <em>إعادة نشر</em>، أو تحت كلتيهما."
        },
        concepts: [
          { en: "An exact duplicate", ar: "تكرار تامّ (exact duplicate)" },
          { en: "A repost", ar: "إعادة نشر (repost)" }
        ],
        rows: [
          {
            s: {
              en: "<code>df.duplicated()</code> returns <code>True</code> for it",
              ar: "تُعيد <code>df.duplicated()</code> القيمة <code>True</code> له"
            },
            a: 0
          },
          {
            s: {
              en: "There are nine of them in this file",
              ar: "يوجد تسعة منها في هذا الملف"
            },
            a: 1
          },
          {
            s: {
              en: "<code>drop_duplicates()</code> leaves it in the frame",
              ar: "تُبقيه <code>drop_duplicates()</code> في الإطار"
            },
            a: 1
          },
          {
            s: {
              en: "Its <code>listing_id</code> appears more than once in the file",
              ar: "يظهر <code>listing_id</code> الخاصّ به أكثر من مرة في الملف"
            },
            a: 2
          },
          {
            s: {
              en: "All thirteen of its cells match another row's",
              ar: "خلاياه الثلاث عشرة كلها مطابقة لخلايا صف آخر"
            },
            a: 0
          },
          {
            s: {
              en: "<code>drop_duplicates(subset=[\"listing_id\"])</code> removes it",
              ar: "تحذفه <code>drop_duplicates(subset=[\"listing_id\"])</code>"
            },
            a: 2
          },
          {
            s: {
              en: "Which copy survives has to be decided by a parsed date, not by a row position",
              ar: "يجب أن يُقرّر أي نسخة تبقى بتاريخ محلَّل لا بموضع صف"
            },
            a: 1
          }
        ],
        hint: {
          en: "Count: 503 rows, 489 after <code>drop_duplicates()</code>, 480 after <code>drop_duplicates(subset=[\"listing_id\"])</code>. Each of those two gaps is one kind of duplicate.",
          ar: "عُدّ: 503 صفوف، و489 بعد <code>drop_duplicates()</code>، و480 بعد <code>drop_duplicates(subset=[\"listing_id\"])</code>. وكل فرق من هذين الفرقين نوعٌ من التكرار."
        },
        explain: {
          en: "<code>duplicated()</code> compares whole rows, so it sees only the 14 byte-for-byte repeats: 503 goes to 489. The other nine flats were advertised twice, with a later <code>listed_on</code> and the advert retyped, so not every column matches and <code>drop_duplicates()</code> cannot see them at all — which is why the test that stage 1 has finished is <code>df.set_index(\"listing_id\").index.is_unique</code> rather than “zero duplicates”. Both kinds share the business key, so both show up as a repeated <code>listing_id</code> and both are removed by <code>subset=[\"listing_id\"]</code>, which takes 489 to 480, the number of real flats. The row about the date is the repost's own problem: <code>keep=\"last\"</code> keeps the last <em>row</em>, not the latest date, and on this file it keeps the older advert for three of the nine — and sorting the raw strings is right here only by luck, because <code>'13/05/2026' &lt; '2026-05-28'</code>.",
          ar: "تقارن <code>duplicated()</code> الصفوف كاملة، فلا ترى إلا التكرارات الـ14 المتطابقة بايتًا ببايت: 503 تصير 489. أما الشقق التسع الأخرى فقد أُعلن عنها مرتين، بتاريخ <code>listed_on</code> لاحق وإعلان أُعيدت كتابته، فلا تتطابق كل الأعمدة ولا تستطيع <code>drop_duplicates()</code> رؤيتها قطّ — ولذلك فإن اختبار انتهاء المرحلة 1 هو <code>df.set_index(\"listing_id\").index.is_unique</code> لا «صفر مكرّرات». والنوعان يشتركان في المفتاح التجاري، فيظهران كلاهما كـ<code>listing_id</code> متكرّر، ويحذفهما كليهما <code>subset=[\"listing_id\"]</code> الذي يأخذ 489 إلى 480، وهو عدد الشقق الحقيقية. أما سطر التاريخ فهو مشكلة إعادة النشر وحدها: <code>keep=\"last\"</code> تُبقي <em>الصف</em> الأخير لا أحدث تاريخ، وهي في هذا الملف تُبقي الإعلان الأقدم لثلاث من التسع — وترتيب النصوص الخام صحيح هنا بالحظ فقط، لأن <code>'13/05/2026' &lt; '2026-05-28'</code>."
        }
      },

      {
        id: "t2ax10",
        type: "output",
        level: "easy",
        topics: ["t2-truthiness", "t2-bool-mapping"],
        q: {
          en: "<code>furnished</code> is a yes-or-no question written twelve ways. Five of those spellings are below, four of which mean <em>no</em>. Write exactly what the program prints.",
          ar: "<code>furnished</code> سؤال بنعم أو لا مكتوب باثنتي عشرة صورة. وخمسٌ من تلك التهجئات أدناه، أربعٌ منها تعني <em>لا</em>. اكتب بالضبط ما يطبعه البرنامج."
        },
        code: code(
          "import pandas as pd",
          "",
          "vals = pd.Series([\" no\", \"0\", \"FALSE\", \"N\", \"yes \"])",
          "",
          "print(vals.astype(bool).tolist())",
          "print(vals.str.strip().str.lower().map({\"yes\": True, \"no\": False}).tolist())"
        ),
        blanks: [
          {
            accept: [
              "[True, True, True, True, True]\n[False, nan, nan, nan, True]"
            ],
            lines: 2,
            label: { en: "the two printed lines", ar: "السطران المطبوعان" }
          }
        ],
        hint: {
          en: "For the first line, ask what Python does with a non-empty string. For the second, ask what <code>.map()</code> does with a key it was not given.",
          ar: "للسطر الأول: اسأل ما تفعله بايثون بنصٍّ غير فارغ. وللسطر الثاني: اسأل ما تفعله <code>.map()</code> بمفتاح لم تُعطَه."
        },
        explain: {
          en: "Every non-empty string is truthy, so <code>astype(bool)</code> returns <code>True</code> five times out of five — including for <code>\"0\"</code> and <code>\"FALSE\"</code> — and the dtype is exactly the <code>bool</code> you asked for. On the real column that line marks all 503 flats furnished, including the 334 that say no, and nothing in the output hints at a bug. The second line fixes the formatting and still gets three of five wrong, in the other direction: <code>.map()</code> turns a value that is not a key into <code>NaN</code> without a word said, so <code>\"0\"</code>, <code>\"false\"</code> and <code>\"n\"</code> become missing values rather than <code>False</code>, and a later <code>value_counts()</code> would hide them because it drops <code>NaN</code> by default. The recipe that survives both is normalise, map with a dictionary that lists every spelling, <code>astype(\"boolean\")</code> so an unknown stays unknown, and return the unmatched values counted so a new spelling is a line in the log.",
          ar: "كل نصٍّ غير فارغ صادق (truthy)، فتُعيد <code>astype(bool)</code> القيمة <code>True</code> خمسًا من خمس — بما في ذلك <code>\"0\"</code> و<code>\"FALSE\"</code> — والنوع هو <code>bool</code> الذي طلبته بالضبط. وعلى العمود الحقيقي يعلّم ذلك السطر الشقق الـ503 كلها «مفروشة»، ومنها الـ334 التي تقول لا، ولا شيء في الناتج يُلمح إلى خطأ. والسطر الثاني يصلح التنسيق ويُخطئ مع ذلك في ثلاث من خمس، في الاتجاه المقابل: <code>.map()</code> تحوّل القيمة التي ليست مفتاحًا إلى <code>NaN</code> دون كلمة، فتصير <code>\"0\"</code> و<code>\"false\"</code> و<code>\"n\"</code> قيمًا مفقودة لا <code>False</code>، و<code>value_counts()</code> لاحقًا ستُخفيها لأنها تُسقط <code>NaN</code> افتراضيًّا. والوصفة التي تنجو من الأمرين: طبّع، ثم اربط بقاموس يُدرج كل تهجئة، ثم <code>astype(\"boolean\")</code> ليبقى المجهول مجهولًا، ثم أعِد القيم غير المطابقة معدودةً ليكون كل تهجئة جديدة سطرًا في السجل."
        }
      },

      {
        id: "t2ax11",
        type: "write",
        level: "hard",
        topics: ["t2-canonical-map", "t2-normalisation", "t2-map-silent-nan"],
        q: {
          en: "Write <code>canonicalise(series, mapping)</code>, the step shape Lesson 3 recommends for every ragged text column. It must normalise by rule — strip the ends, lower the case and collapse runs of whitespace to one space — then finish by looking the normalised value up in <code>mapping</code>, and return <em>two</em> things: the canonical column, and a <code>value_counts()</code> of the normalised spellings that <code>mapping</code> did not match (blanks are not unmatched spellings). Then call it on <code>raw[\"city\"]</code> with the <code>CITY_MAP</code> below — written by somebody who read the top twenty rows of <code>value_counts()</code> — and print the row count, how many rows were named, how many were not, and the unmatched spellings with their counts.",
          ar: "اكتب <code>canonicalise(series, mapping)</code>، وهو شكل الخطوة الذي يوصي به الدرس 3 لكل عمود نصّي مضطرب. عليها أن تطبّع بالقاعدة — تشذيب الطرفين، وتصغير الحرف، وضغط سلاسل المسافات إلى مسافة واحدة — ثم تُنهي العمل بالبحث عن القيمة المطبَّعة في <code>mapping</code>، وأن تُعيد <em>شيئين</em>: العمود المعياري، و<code>value_counts()</code> للتهجئات المطبَّعة التي لم تطابقها <code>mapping</code> (والفراغات ليست تهجئات غير مطابقة). ثم نادِها على <code>raw[\"city\"]</code> بـ<code>CITY_MAP</code> أدناه — وقد كتبها شخصٌ قرأ العشرين صفًّا الأولى من <code>value_counts()</code> — واطبع عدد الصفوف، وكم صفًّا سُمّي، وكم لم يُسمَّ، والتهجئات غير المطابقة مع أعدادها."
        },
        starter: code(
          "import pandas as pd",
          "",
          "raw = pd.read_csv(\"listings_raw.csv\")           # 503 rows, 26 city spellings",
          "CITY_MAP = {\"gaza\": \"Gaza\", \"rafah\": \"Rafah\",",
          "            \"khan younis\": \"Khan Younis\", \"khan-younis\": \"Khan Younis\",",
          "            \"deir al-balah\": \"Deir al-Balah\", \"deir al balah\": \"Deir al-Balah\",",
          "            \"deir-al-balah\": \"Deir al-Balah\",",
          "            \"jabalia\": \"Jabalia\", \"jabalya\": \"Jabalia\"}",
          "",
          "# your code here"
        ),
        lines: 12,
        lang: "python",
        checks: [
          {
            re: "^(?=.*str\\s*\\.\\s*strip\\s*\\()(?=.*str\\s*\\.\\s*lower\\s*\\()(?=.*str\\s*\\.\\s*replace\\s*\\()",
            label: {
              en: "Normalise by rule: <code>.str.strip()</code>, <code>.str.lower()</code> and <code>.str.replace</code> for the whitespace",
              ar: "طبّع بالقاعدة: <code>.str.strip()</code> و<code>.str.lower()</code> و<code>.str.replace</code> للمسافات"
            }
          },
          {
            re: "\\.\\s*map\\s*\\(\\s*mapping\\s*\\)",
            label: {
              en: "Finish with the map, and use the parameter: <code>.map(mapping)</code>",
              ar: "أنهِ العمل بالخريطة، واستخدم الوسيط: <code>.map(mapping)</code>"
            }
          },
          {
            re: "(isna|isnull)\\s*\\(\\s*\\)",
            label: {
              en: "Find the unmatched rows from the <em>result</em> of the map, with <code>isna()</code>",
              ar: "اعثر على الصفوف غير المطابقة من <em>ناتج</em> الخريطة بـ<code>isna()</code>"
            }
          },
          {
            re: "value_counts\\s*\\(\\s*\\)",
            label: {
              en: "Return the unmatched spellings as a <code>value_counts()</code>, not as a printed message",
              ar: "أعِد التهجئات غير المطابقة كـ<code>value_counts()</code> لا كرسالة مطبوعة"
            }
          },
          {
            re: "return\\s+\\w+\\s*,\\s*\\w+",
            label: {
              en: "Return both: the column and the counts",
              ar: "أعِد الشيئين: العمود والأعداد"
            }
          }
        ],
        forbid: [
          {
            re: "str\\s*\\.\\s*title\\s*\\(",
            label: {
              en: "<code>.str.title()</code> — it leaves eleven spellings and renames 40 already-correct rows",
              ar: "<code>.str.title()</code> — تُبقي إحدى عشرة تهجئة وتُعيد تسمية 40 صفًّا صحيحًا أصلًا"
            }
          }
        ],
        solution: {
          code: code(
            "def canonicalise(series, mapping):",
            "    norm = (series.astype(\"string\").str.strip()",
            "                  .str.lower().str.replace(r\"\\s+\", \" \", regex=True))",
            "    out = norm.map(mapping)",
            "    unmatched = norm[out.isna() & norm.notna()].value_counts()",
            "    return out, unmatched",
            "",
            "city, unmatched = canonicalise(raw[\"city\"], CITY_MAP)",
            "print(\"rows %d | named %d | unnamed %d\" % (len(city), int(city.notna().sum()), int(city.isna().sum())))",
            "print(unmatched.to_string())"
          ),
          out: code(
            "rows 503 | named 485 | unnamed 18",
            "city",
            "khan yunis    14",
            "jabaliya       4"
          ),
          en: "The rule does the formatting and the map does the decisions, and the step hands back the two spellings the map is missing, with 14 and 4 rows behind them. Fixing the bug is copying two lines out of the report into <code>CITY_MAP</code>. Note <code>norm.notna()</code> in the selection: a blank city is a missing value to decide about, not a spelling to add to the map.",
          ar: "القاعدة تتولّى التنسيق والخريطة تتولّى القرارات، وتُعيد الخطوة التهجئتين الناقصتين من الخريطة ومعهما 14 صفًّا و4 صفوف. وإصلاح الخطأ هو نسخ سطرين من التقرير إلى <code>CITY_MAP</code>. ولاحظ <code>norm.notna()</code> في الاختيار: فالمدينة الفارغة قيمة مفقودة يُتّخذ قرار بشأنها، لا تهجئةٌ تُضاف إلى الخريطة."
        },
        hint: {
          en: "Two of the 26 spellings differ from the map's keys by a transliteration rather than by formatting, so no rule will ever reach them. The question is not how to avoid that — it is how the step tells you.",
          ar: "تهجئتان من الـ26 تختلفان عن مفاتيح الخريطة بنقل حرفي لا بتنسيق، فلن تصل إليهما أي قاعدة. والسؤال ليس كيف تتجنّب ذلك — بل كيف تُخبرك الخطوة به."
        },
        explain: {
          en: "<code>strip</code>, <code>lower</code> and a whitespace collapse take <code>city</code> from 26 spellings to 11; only an explicit map takes the 11 to 5, because <code>Khan Yunis</code> and <code>Khan Younis</code> differ by a transliteration decision, not by formatting. The map here is missing two keys, and this is the most dangerous line in the lesson: <code>norm.map(CITY_MAP)</code> turns 18 rows into <code>NaN</code> with no error and no warning, and <code>value_counts()</code> on the result <em>looks perfect</em> — five cities, sensible counts — because it drops missing values and so sums to 485 of 503. Printing a message would be an improvement that dies the moment a scheduler runs this at 3 a.m.; returning the counts puts the two spellings and their row counts into the log, which is the only version that still works when nobody is watching. And the forbidden shortcut is the one a real project shipped: <code>.str.title()</code> also reaches 11 spellings, and renames 40 rows that were already right on the way.",
          ar: "تأخذ <code>strip</code> و<code>lower</code> وضغط المسافات عمودَ <code>city</code> من 26 تهجئة إلى 11؛ ولا تأخذ الـ11 إلى 5 إلا خريطةٌ صريحة، لأن <code>Khan Yunis</code> و<code>Khan Younis</code> يختلفان بقرار نقل حرفي لا بتنسيق. والخريطة هنا ينقصها مفتاحان، وهذا أخطر سطر في الدرس: <code>norm.map(CITY_MAP)</code> تحوّل 18 صفًّا إلى <code>NaN</code> بلا خطأ ولا تحذير، و<code>value_counts()</code> على الناتج <em>تبدو مثالية</em> — خمس مدن وأعداد معقولة — لأنها تُسقط القيم المفقودة فيصير مجموعها 485 من 503. وطباعة رسالة تحسينٌ يموت لحظةَ يشغّل مجدولٌ هذا الكود في الثالثة فجرًا؛ أما إعادة الأعداد فتضع التهجئتين وأعداد صفوفهما في السجل، وهي النسخة الوحيدة التي تبقى عاملة حين لا يراقب أحد. والمختصر المحظور هو ما شُحن في مشروع حقيقي: <code>.str.title()</code> تصل أيضًا إلى 11 تهجئة، وتُعيد تسمية 40 صفًّا كانت صحيحة أصلًا في الطريق."
        }
      },

      {
        id: "t2ax12",
        type: "tf",
        level: "easy",
        topics: ["t2-datetime-default", "t2-format-mixed"],
        q: {
          en: "<code>listed_on</code> has 503 non-blank values: 480 ISO dates such as <code>2026-05-18</code> and 23 written <code>18/05/2026</code>, scattered through the file. <code>pd.to_datetime(raw[\"listed_on\"])</code> raises a <code>ValueError</code>, so a colleague writes <code>pd.to_datetime(raw[\"listed_on\"], errors=\"coerce\")</code> instead. True or false: that is the safe reading, because it parses every value it can and marks the rest so you can see them.",
          ar: "في <code>listed_on</code> 503 قيم غير فارغة: 480 تاريخًا بصيغة ISO مثل <code>2026-05-18</code>، و23 مكتوبة <code>18/05/2026</code>، مبثوثةً في الملف. و<code>pd.to_datetime(raw[\"listed_on\"])</code> تُثير <code>ValueError</code>، فكتبت زميلة بدلًا منها <code>pd.to_datetime(raw[\"listed_on\"], errors=\"coerce\")</code>. صحيح أم خطأ: هذه هي القراءة الآمنة، لأنها تحلّل كل قيمة تستطيع وتعلّم الباقي لتراه."
        },
        truth: false,
        hint: {
          en: "Count what comes back. How many <code>NaT</code>s are there, and what will the next person think they are?",
          ar: "عُدّ ما يعود. كم قيمة <code>NaT</code> هناك، وما الذي سيظنّه الشخص التالي عنها؟"
        },
        explain: {
          en: "False. <code>errors=\"coerce\"</code> does not mark a second format; it deletes it. The column comes back with 23 <code>NaT</code>s — every one of the slash dates — and nothing anywhere says that those 23 rows had a date all along. A reader of the result sees 23 missing dates and will handle them as missing data: Lesson 2's whole decision tree, applied to a problem that is not missingness at all. The trap is that <code>errors=\"coerce\"</code> merges two kinds of ignorance, exactly as it does on <code>floor</code>, where it turns 19 recorded ground floors and 9 blanks into 28 indistinguishable <code>NaN</code>s. The safe recipe names the formats: parse with each one separately under <code>errors=\"coerce\"</code>, combine the results, and assert that no value matched two formats and no non-blank value matched none — so a new format next month is a failed assertion rather than a silent hole. And note what <code>format=\"mixed\"</code> does instead: it keeps all 503 and puts 10 in the wrong month, which only the date range reveals.",
          ar: "خطأ. <code>errors=\"coerce\"</code> لا تعلّم صيغةً ثانية، بل تحذفها. يعود العمود وفيه 23 قيمة <code>NaT</code> — وهي تواريخ الشرطة المائلة كلها — ولا شيء في أي مكان يقول إن تلك الصفوف الـ23 كان لها تاريخ من الأصل. ومن يقرأ الناتج يرى 23 تاريخًا مفقودًا فيعاملها معاملة البيانات المفقودة: شجرةُ قرارات الدرس 2 كلها مطبَّقةً على مشكلة ليست فقدًا بالمرّة. والفخّ أن <code>errors=\"coerce\"</code> تدمج نوعين من الجهل، كما تفعل بالضبط في <code>floor</code> حيث تحوّل 19 طابقًا أرضيًّا مسجَّلًا و9 فراغات إلى 28 قيمة <code>NaN</code> لا يُفرَّق بينها. والوصفة الآمنة تسمّي الصيغ: حلّل بكل صيغة على حدة مع <code>errors=\"coerce\"</code>، ثم ادمج النتائج، وتأكّد أن لا قيمة طابقت صيغتين ولا قيمة غير فارغة طابقت صفرًا — فتكون الصيغة الجديدة الشهر القادم تأكيدًا فاشلًا لا فراغًا صامتًا. ولاحظ ما تفعله <code>format=\"mixed\"</code> بدلًا من ذلك: تُبقي الـ503 كلها وتضع 10 في الشهر الخطأ، ولا يكشف ذلك إلا مدى التواريخ."
        }
      },

      /* ============================= Lesson 4 ============================= */
      {
        id: "t2ax13",
        type: "mcq",
        level: "easy",
        topics: ["t2-outlier-kinds", "t2-rare-but-real", "t2-conflating-kinds"],
        q: {
          en: "<code>raw[[\"monthly_rent\", \"area_m2\", \"rooms\", \"deposit\"]].describe()</code> on the file as it arrives gives these extremes: rent max 99999.00 against a third quartile of 255.00; area min 0.04 against a first quartile of 61.15; rooms max 12.00; deposit max 1155.00 against a third quartile of 435.00. Which reading of those four numbers is right?",
          ar: "تعطي <code>raw[[\"monthly_rent\", \"area_m2\", \"rooms\", \"deposit\"]].describe()</code> على الملف كما يأتي هذه القيم الطرفية: أقصى إيجار 99999.00 مقابل ربيع ثالث 255.00؛ وأدنى مساحة 0.04 مقابل ربيع أول 61.15؛ وأقصى عدد غرف 12.00؛ وأقصى تأمين 1155.00 مقابل ربيع ثالث 435.00. أي قراءة لهذه الأرقام الأربعة صحيحة؟"
        },
        options: [
          {
            en: "All four sit far from the middle of their columns, so all four are outliers, and all four should be removed from the file before anything else is measured on it.",
            ar: "الأربعة كلها تقع بعيدًا عن وسط أعمدتها، فالأربعة كلها قيم شاذة، وينبغي إزالتها كلها من الملف قبل قياس أي شيء آخر عليه."
          },
          {
            en: "Three of them are not rents, areas or room counts at all; the deposit of 1155 is three months' rent on listing 5408 and perfectly correct.",
            ar: "ثلاثة منها ليست إيجارات ولا مساحات ولا أعداد غرف بالمرّة؛ أما التأمين 1155 فهو إيجار ثلاثة أشهر لإعلان 5408 وصحيح تمامًا."
          },
          {
            en: "The deposit of 1155 is the most extreme of the four, because it is more than two and a half times its own third quartile of 435, which no other column's maximum manages.",
            ar: "التأمين 1155 هو الأكثر تطرّفًا بين الأربعة، لأنه أكبر من ضعفي ربيعه الثالث 435 ونصف، وهذا ما لا يبلغه أقصى أي عمود آخر."
          },
          {
            en: "The 12 rooms is the only value that needs a decision: a rent, an area and a deposit are money and metres, and a market can always be asked to justify those.",
            ar: "الغرف الـ12 هي القيمة الوحيدة التي تحتاج قرارًا: فالإيجار والمساحة والتأمين نقودٌ وأمتار، والسوق يمكن أن تُسأل دائمًا عن تبريرها."
          }
        ],
        answer: 1,
        hint: {
          en: "Read each <code>max</code> and <code>min</code> aloud as a claim about a flat in Gaza, then try to divide one of the four by the rent of the flat it belongs to.",
          ar: "اقرأ كل <code>max</code> و<code>min</code> بصوت مرتفع كأنه ادّعاء عن شقة في غزة، ثم حاول قسمة واحد من الأربعة على إيجار الشقة التي ينتمي إليها."
        },
        explain: {
          en: "“Outlier” names a position, not a defect. The rent of 99999 is a phone number, the area of 0.04 is one of five areas recorded in dunum rather than square metres, and 12 rooms is a typo — three wrong values, each needing a different repair, and none of them a rare rent, area or flat. The deposit of 1155 is the odd member of the list on purpose: it is exactly three times 385, the rent of listing 5408, and three months' deposit on an expensive Gaza flat is not an error at all. That is why the answer calling it the most extreme is tempting and wrong — its arithmetic is right, and 1155/435 is a far smaller ratio than 99999/255, but the comparison is beside the point, because the question is not how far the value sits but whether it is possible. Remove all four and you delete a real home for being expensive; keep all four and the 99999 inflates every statistic that follows. The question to ask before any rule is: is this value impossible, mis-scaled, or merely rare?",
          ar: "كلمة «شاذّة» تسمّي موضعًا لا عيبًا. الإيجار 99999 رقم هاتف، والمساحة 0.04 واحدة من خمس مساحات سُجّلت بالدونم لا بالمتر المربّع، والغرف الـ12 خطأ إدخال — ثلاث قيم خاطئة، كلٌّ منها يحتاج ترميمًا مختلفًا، وليست واحدة منها إيجارًا نادرًا ولا مساحة نادرة ولا شقة نادرة. أما التأمين 1155 فهو العضو الشاذّ في القائمة بقصد: إنه ثلاثة أمثال 385 بالضبط، وهو إيجار إعلان 5408، وتأمين ثلاثة أشهر على شقة غالية في غزة ليس خطأً بالمرّة. ولذلك يكون الجواب الذي يسمّيه الأكثر تطرّفًا مغريًا وخاطئًا — حسابه صحيح، و1155/435 نسبة أصغر بكثير من 99999/255، لكن المقارنة بعيدة عن المقصد، لأن السؤال ليس كم تبعد القيمة بل أهي ممكنة. أزِل الأربعة كلها فتحذف بيتًا حقيقيًّا لأنه غالٍ؛ وأبقِها كلها فيُنفّخ 99999 كل إحصاء يأتي بعده. والسؤال الذي يُطرح قبل أي قاعدة: أهذه القيمة مستحيلة، أم بوحدة خاطئة، أم نادرة فحسب؟"
        }
      },

      {
        id: "t2ax14",
        type: "fill",
        level: "medium",
        topics: ["t2-filter-drops-blanks", "t2-eyeballed-threshold"],
        q: {
          en: "The line everybody writes is <code>df[df[\"monthly_rent\"] &lt; 1000]</code>, and on this file it quietly deletes twenty rows: the one impossible rent and the nineteen that are blank — the <em>expensive</em> ones. Fill in the three blanks so that the program voids the impossible value instead of deleting any row, and reports what it did.",
          ar: "السطر الذي يكتبه الجميع هو <code>df[df[\"monthly_rent\"] &lt; 1000]</code>، وهو في هذا الملف يحذف بصمت عشرين صفًّا: الإيجار المستحيل الواحد والتسعة عشر الفارغة — وهي الغالية. املأ الفراغات الثلاثة ليُبطل البرنامج القيمة المستحيلة بدل حذف أي صف، وليبلّغ عمّا فعل."
        },
        code: code(
          "import pandas as pd",
          "",
          "march = pd.read_csv(\"listings_raw.csv\")",
          "rents = march[\"monthly_rent\"]",
          "",
          "kept  = rents.____1____(rents > 1000)        # void, do not delete",
          "blank = int(kept.____2____().sum())",
          "",
          "print(\"rows:\", len(march), \"->\", len(kept))",
          "print(\"blank rents:\", int(rents.isna().sum()), \"->\", blank)",
          "print(\"largest rent kept:\", kept.____3____)",
          "",
          "# rows: 503 -> 503",
          "# blank rents: 19 -> 20",
          "# largest rent kept: 580.0"
        ),
        blanks: [
          {
            accept: ["mask"],
            label: { en: "turn the impossible value into a missing one", ar: "حوّل القيمة المستحيلة إلى قيمة مفقودة" }
          },
          {
            accept: ["isna", "isnull"],
            label: { en: "count the holes", ar: "عُدّ الفراغات" }
          },
          {
            accept: ["max()"],
            label: { en: "the largest value left", ar: "أكبر قيمة متبقّية" }
          }
        ],
        hint: {
          en: "The printed row count is the whole point of the question: 503 before and 503 after. Which pandas method changes a value without changing the frame?",
          ar: "عدد الصفوف المطبوع هو مقصد السؤال كله: 503 قبل و503 بعد. أي توابع pandas يغيّر قيمةً دون أن يغيّر الإطار؟"
        },
        explain: {
          en: "<code>mask</code> replaces the values where the condition is <code>True</code> with <code>NaN</code> and leaves every row in place, so 19 blanks become 20 and the largest surviving rent is 580.0 — a real Gaza flat. A comparison filter does something quite different and says nothing about it: <code>rents > 1000</code> is <code>False</code> for a blank as well as for a cheap flat, so <code>df[df[\"monthly_rent\"] &lt; 1000]</code> keeps 483 of 503 rows and the twenty it drops are the one typo plus every listing whose price the site withheld. That is the same deletion Lesson 2 spent a concept arguing against, performed by accident, by a line about outliers. Two habits follow: void rather than delete, and whenever a comparison selects rows, ask what it does with the missing ones — <code>(d[\"area_m2\"] &lt; 5).fillna(False)</code> exists for the same reason.",
          ar: "تستبدل <code>mask</code> القيم التي يصدق عندها الشرط بـ<code>NaN</code> وتُبقي كل صف في مكانه، فتصير الفراغات الـ19 عشرين ويكون أكبر إيجار باقٍ 580.0 — وهي شقة حقيقية في غزة. أما مرشّح المقارنة فيفعل شيئًا مختلفًا تمامًا ولا يقول عنه شيئًا: فـ<code>rents > 1000</code> تساوي <code>False</code> للفراغ كما للشقة الرخيصة، فيُبقي <code>df[df[\"monthly_rent\"] &lt; 1000]</code> 483 صفًّا من 503، والعشرون التي يُسقطها هي خطأ الإدخال الواحد مع كل إعلان حجب الموقع سعره. وهذا هو الحذف نفسه الذي أنفق الدرس 2 مفهومًا كاملًا في محاججته، مُنفَّذًا بالخطأ، بسطرٍ عن القيم الشاذة. وتتبع ذلك عادتان: أبطِل ولا تحذف، وكلما اختارت مقارنةٌ صفوفًا فاسأل ما تفعله بالمفقود — ولهذا السبب نفسه وُجدت <code>(d[\"area_m2\"] &lt; 5).fillna(False)</code>."
        }
      },

      {
        id: "t2ax15",
        type: "multi",
        level: "medium",
        topics: ["t2-actions-measured", "t2-value-error", "t2-action-remove"],
        q: {
          en: "Lesson 4 scored six actions on the rent column against one ruler — the training median, measured by mean absolute error on the held-out rents. <code>keep everything</code>: 503 rows, 120 scored, MAE 60.17. <code>remove the flagged rows</code>: 490 rows, <strong>117</strong> scored, 55.47. <code>remove flagged training rows only</code>: 493 rows, 120 scored, 60.00. <code>cap at the fitted fence</code>: 503 rows, 120 scored, 59.31. And before any of it, voiding the single rent of 99999 took the held-out MAE from 884.45 to 60.17. Which of these conclusions does the table support? (Choose all that apply.)",
          ar: "قاس الدرس 4 ستة أعمال على عمود الإيجار بمسطرة واحدة — وسيط التدريب، مقيسًا بمتوسط الخطأ المطلق على الإيجارات المحجوزة. <code>أبقِ كل شيء</code>: 503 صفوف، و120 مقيسًا، والخطأ 60.17. <code>أزِل الصفوف المعلَّمة</code>: 490 صفًّا، و<strong>117</strong> مقيسًا، و55.47. <code>أزِل الصفوف المعلَّمة من التدريب وحده</code>: 493 صفًّا، و120 مقيسًا، و60.00. <code>حدّد السقف عند السياج المضبوط</code>: 503 صفوف، و120 مقيسًا، و59.31. وقبل كل ذلك، أخذ إبطال الإيجار الواحد 99999 الخطأَ المحجوز من 884.45 إلى 60.17. أي الاستنتاجات يدعمها الجدول؟ (اختر كل ما ينطبق.)"
        },
        options: [
          {
            en: "Repairing one impossible cell was worth 824 shekels of measurement error and changed no prediction: the fitted median stayed 200.0.",
            ar: "ترميم خلية مستحيلة واحدة ساوى 824 شيكلًا من خطأ القياس ولم يغيّر أي تنبّؤ: فقد بقي الوسيط المضبوط 200.0."
          },
          {
            en: "55.47 is the best number in the table and is not a result, because it was measured on 117 held-out rents instead of 120: the action deleted part of the exam.",
            ar: "الرقم 55.47 أفضل أرقام الجدول وليس نتيجة، لأنه قيس على 117 إيجارًا محجوزًا بدل 120: فقد حذف العمل جزءًا من الامتحان."
          },
          {
            en: "Capping at the fitted fence is the best honest action here, and it buys 0.86 shekels with all 503 rows intact.",
            ar: "تحديد السقف عند السياج المضبوط هو أفضل عمل أمين هنا، وهو يكسب 0.86 شيكلًا مع بقاء الصفوف الـ503 كلها سليمة."
          },
          {
            en: "Removing the flagged rows from the training rows only bought 4.70 shekels of held-out error, which is a large enough gain to justify deleting those eleven expensive flats.",
            ar: "إزالة الصفوف المعلَّمة من صفوف التدريب وحدها كسبت 4.70 شيكلًا من الخطأ المحجوز، وهو كسبٌ كبير بما يكفي لتبرير حذف تلك الشقق الغالية الإحدى عشرة."
          },
          {
            en: "Since repair is worth hundreds of shekels and removal is worth a fraction of one, the right conclusion is that an outlier rule is not worth writing on this file.",
            ar: "بما أن الترميم يساوي مئات الشواكل والإزالة تساوي كِسْرًا من شيكل، فالاستنتاج الصحيح أن قاعدة الشواذ لا تستحقّ الكتابة في هذا الملف."
          }
        ],
        answer: [0, 1, 2],
        hint: {
          en: "Read the <code>scored</code> column before the error column: a row whose score is not 120 was measured on a different exam. Then find the two rows that apply the same removal.",
          ar: "اقرأ عمود «المقيس» قبل عمود الخطأ: فالصف الذي لا يساوي مقيسه 120 قيس في امتحان آخر. ثم اعثر على الصفين اللذين يطبّقان الإزالة نفسها."
        },
        explain: {
          en: "The headline of the lesson is the gap between repair and removal. Voiding one cell moved the measurement by 824 shekels and moved no prediction: the median was 200.0 before and after, so the improvement was entirely in the ruler, not in the pipeline — check the ruler before you trust any comparison. The two removal rows are the same action scored two ways: applied to the whole file it deletes three held-out rents, reports 55.47 on 117, and looks like the best result in the table; applied to the training rows only it is scored on all 120 and reports 60.00. So the honest gain from deleting eleven real homes is 0.17 shekels, well inside the 1.5-shekel noise of this split — which is why the statement crediting the training-only removal with 4.70 shekels is false, and why a filter applied to your held-out rows is a filter applied to your exam. Capping is the best honest action at 59.31, and it keeps the information that those flats are expensive while limiting the arithmetic damage. The statement that concludes no outlier rule is worth writing over-reads all of it: flagging costs nothing and scores exactly the baseline, so the recommendation is to flag, count and report — a measurement that says “removal buys nothing here” is precisely what stops somebody deleting eleven homes next quarter on a hunch.",
          ar: "عنوان الدرس هو الفرق بين الترميم والإزالة. إبطال خلية واحدة حرّك القياس 824 شيكلًا ولم يحرّك أي تنبّؤ: فالوسيط كان 200.0 قبل وبعد، فكان التحسّن كله في المسطرة لا في خطّ الأنابيب — تحقّق من المسطرة قبل أن تثق بأي مقارنة. وصفّا الإزالة هما العمل نفسه مقيسًا بطريقتين: فهو مطبَّقًا على الملف كله يحذف ثلاثة إيجارات محجوزة ويبلّغ 55.47 على 117 ويبدو أفضل نتيجة في الجدول؛ ومطبَّقًا على صفوف التدريب وحدها يُقاس على الـ120 كلها ويبلّغ 60.00. فالكسب الأمين من حذف أحد عشر بيتًا حقيقيًّا هو 0.17 شيكلًا، وهو داخل ضجيج هذا التقسيم البالغ 1.5 شيكلًا — ولهذا تكون العبارة التي تنسب إلى الإزالة من التدريب وحده كسبًا قدره 4.70 شيكلًا خاطئةً، ولهذا فإن مرشّحًا يُطبَّق على صفوفك المحجوزة مرشّحٌ يُطبَّق على امتحانك. وتحديد السقف أفضل عمل أمين بـ59.31، وهو يحفظ معلومة أن تلك الشقق غالية مع الحدّ من الضرر الحسابي. أما العبارة التي تستنتج أن قاعدة الشواذ لا تستحقّ الكتابة فتُفرط في القراءة: فالتعليم لا يكلّف شيئًا ويسجّل الخط القاعدي بالضبط، فالتوصية أن تعلّم وتعُدّ وتبلّغ — والقياس الذي يقول «الإزالة لا تكسب شيئًا هنا» هو بالضبط ما يمنع أحدهم من حذف أحد عشر بيتًا الربع القادم على هَوًى."
        }
      },

      {
        id: "t2ax16",
        type: "mcq",
        level: "medium",
        topics: ["t2-fence-is-fitted", "t2-iqr-convention"],
        q: {
          en: "June's 85 listings have arrived and must go through the same outlier rule as March. The 1.5 × IQR upper fence on the rent column comes out as <strong>406.875</strong> on all 484 raw rents, <strong>397.500</strong> on the 363 training rents, and <strong>451.250</strong> if it is refitted on June's 83 rents. Which statement is right?",
          ar: "وصلت إعلانات حزيران الـ85 وعليها أن تمرّ بقاعدة الشواذ نفسها التي مرّ بها آذار. والسياج الأعلى 1.5 × المدى الربيعي على عمود الإيجار يخرج <strong>406.875</strong> على الإيجارات الخام الـ484 كلها، و<strong>397.500</strong> على إيجارات التدريب الـ363، و<strong>451.250</strong> إن أُعيد ضبطه على إيجارات حزيران الـ83. أي العبارات صحيح؟"
        },
        options: [
          {
            en: "451.250 is the right fence for June, because a threshold should describe the batch it is applied to.",
            ar: "السياج 451.250 هو الصحيح لحزيران، لأن الحدّ ينبغي أن يصف الدفعة التي يُطبَّق عليها."
          },
          {
            en: "406.875 is the right fence, because it is computed from the most rents of the three and is therefore the most reliable estimate of where this column's tail begins.",
            ar: "السياج 406.875 هو الصحيح، لأنه محسوب من أكبر عدد من الإيجارات بين الثلاثة فهو أكثر التقديرات موثوقية لموضع بداية ذيل هذا العمود."
          },
          {
            en: "397.500 is the parameter to store and apply to June unchanged, because a fence is fitted rather than given.",
            ar: "السياج 397.500 هو الوسيط الذي يُخزَّن ويُطبَّق على حزيران بلا تغيير، لأن السياج مضبوط لا معطى."
          },
          {
            en: "None of the three is a parameter at all: 1.5 × IQR is a rule, so the fence is simply recomputed from whatever rows it happens to be used on.",
            ar: "لا واحد من الثلاثة وسيطٌ أصلًا: فـ1.5 × المدى الربيعي قاعدة، فيُعاد حساب السياج ببساطة من أي صفوف يُستخدم عليها."
          }
        ],
        answer: 2,
        hint: {
          en: "The three numbers come from the same formula and three different sets of rows. What does that make the fence — a rule, or something the rule produced?",
          ar: "الأرقام الثلاثة تأتي من الصيغة نفسها ومن ثلاث مجموعات مختلفة من الصفوف. فما يجعل ذلك السياج — قاعدةً أم شيئًا أنتجته القاعدة؟"
        },
        explain: {
          en: "The formula is a rule; the fence is what the rule produced from a particular set of rows, which makes it a fitted parameter exactly like a median or a category list. So it is fitted once, on the training rows, stored in <code>fitted</code>, and applied unchanged — 397.500. The answer that refits on June is the common and costly mistake: June's quartiles are higher, so the same flat would be flagged in March and not in June, and the two months stop being comparable for a reason no flat caused. The answer preferring 406.875 is tempting because more rows really do make a better estimate — but those 484 rents include the 121 you promised to hold back, so the fence has seen your exam. And the answer that denies the fence is a parameter at all is the misconception the whole concept exists to kill: “recompute it wherever it is used” is precisely what produces three different thresholds for one rule. Worth remembering alongside this: 1.5 is a convention, not a theorem — it flags about 0.7% of a normal distribution, and a Gaza rent column is not normal.",
          ar: "الصيغة قاعدة؛ والسياج هو ما أنتجته القاعدة من مجموعة صفوف معيّنة، وهذا يجعله وسيطًا مضبوطًا تمامًا كالوسيط أو قائمة الفئات. فيُضبط مرة واحدة على صفوف التدريب، ويُخزَّن في <code>fitted</code>، ويُطبَّق بلا تغيير — أي 397.500. والجواب الذي يُعيد الضبط على حزيران هو الخطأ الشائع والمكلف: فأرباع حزيران أعلى، فتُعلَّم الشقة نفسها في آذار ولا تُعلَّم في حزيران، ويكفّ الشهران عن كونهما قابلين للمقارنة لسبب لم تُحدثه أي شقة. والجواب الذي يُفضّل 406.875 مغرٍ لأن مزيد الصفوف يُحسّن التقدير فعلًا — لكن تلك الإيجارات الـ484 تضمّ الـ121 التي وعدت بحجزها، فيكون السياج قد رأى امتحانك. والجواب الذي يُنكر أن السياج وسيط هو المفهوم الخاطئ الذي وُجد هذا المفهوم كله لقتله: فـ«أعِد حسابه في كل موضع يُستخدم فيه» هو بالضبط ما يُنتج ثلاثة حدود مختلفة لقاعدة واحدة. ويجدر أن تُذكر معه: 1.5 عُرف لا مبرهنة — إنه يعلّم نحو 0.7% من توزيع طبيعي، وعمود إيجارات في غزة ليس طبيعيًّا."
        }
      },

      /* ============================= Lesson 5 ============================= */
      {
        id: "t2ax17",
        type: "trace",
        level: "medium",
        topics: ["t2-fitted-categories", "t2-unseen-report"],
        q: {
          en: "<code>CITIES</code> was fitted on March's 480 flats and must not be recomputed. June's cities are all spelled correctly, and one of them is a town March never contained. After the last line has run, what are the values of the four variables?",
          ar: "ضُبطت <code>CITIES</code> على شقق آذار الـ480 ولا يجوز إعادة حسابها. ومدن حزيران كلها مكتوبة كتابةً صحيحة، وإحداها بلدة لم يحتوِها آذار قطّ. بعد تنفيذ السطر الأخير، ما قيم المتغيّرات الأربعة؟"
        },
        code: code(
          "import pandas as pd",
          "",
          "CITIES = [\"Deir al-Balah\", \"Gaza\", \"Jabalia\", \"Khan Younis\", \"Rafah\"]   # fitted on March",
          "june_city = pd.Series([\"Gaza\", \"Beit Lahia\", \"Rafah\", \"Gaza\"])",
          "",
          "cast  = pd.Categorical(june_city, categories=CITIES)        # cast, do not infer",
          "names = sorted(set(june_city[pd.Series(cast).isna()]))",
          "",
          "M         = pd.get_dummies(cast, prefix=\"city\", dtype=\"int8\")",
          "width     = M.shape[1]",
          "zero_rows = int((M.sum(axis=1) == 0).sum())",
          "unseen    = int(pd.Series(cast).isna().sum())"
        ),
        blanks: [
          {
            accept: ["['Beit Lahia']", "[\"Beit Lahia\"]"],
            label: { en: "names", ar: "names" }
          },
          {
            accept: ["5"],
            label: { en: "width", ar: "width" }
          },
          {
            accept: ["1"],
            label: { en: "zero_rows", ar: "zero_rows" }
          },
          {
            accept: ["1"],
            label: { en: "unseen", ar: "unseen" }
          }
        ],
        hint: {
          en: "Casting to a <code>CategoricalDtype</code> does something to a value that is not in the category list. Work out what that is first, and the other three follow.",
          ar: "التحويل إلى <code>CategoricalDtype</code> يفعل شيئًا بقيمة ليست في قائمة الفئات. استخرج ذلك أولًا، فتتبعه الثلاثة الأخرى."
        },
        explain: {
          en: "The cast is the fit made visible: a value that is not in <code>categories</code> becomes a missing value, so <code>Beit Lahia</code> is reported as <code>unseen: 1</code> and <code>names</code> still holds its name. <code>get_dummies</code> on a categorical makes one column per <em>category</em>, not per observed value, so the matrix is five columns wide whatever June happens to contain — which is the whole point: fit the category list once and every batch produces the same matrix. The <code>Beit Lahia</code> row comes out as five zeros, and that is the step worth watching: a <em>named</em> problem (<code>Beit Lahia</code>) becomes an <em>unnamed</em> one (a missing value) becomes an <em>invisible</em> one (a row of zeros). Each step is correct and each loses information, which is why the unseen values must be reported <em>before</em> the encoding, not after it. On the real files June brings <code>Beit Lahia</code> twice and three agencies March never had, 5 of 85 rows — and encoding each file on its own would instead give two matrices of different widths.",
          ar: "التحويل هو الضبط وقد صار مرئيًّا: فالقيمة التي ليست في <code>categories</code> تصير قيمةً مفقودة، فيُبلَّغ عن <code>Beit Lahia</code> بـ<code>unseen: 1</code> ويبقى اسمها في <code>names</code>. و<code>get_dummies</code> على عمود فئوي تُنشئ عمودًا لكل <em>فئة</em> لا لكل قيمة مرصودة، فتكون المصفوفة بعرض خمسة أعمدة أيًّا كان ما يحتويه حزيران — وهذا هو المقصد كله: اضبط قائمة الفئات مرة واحدة فتُنتج كل دفعة المصفوفة نفسها. ويخرج صف <code>Beit Lahia</code> خمسة أصفار، وهذه هي الخطوة التي تستحقّ المراقبة: مشكلةٌ <em>مسمّاة</em> (<code>Beit Lahia</code>) تصير <em>غير مسمّاة</em> (قيمة مفقودة) تصير <em>غير مرئية</em> (صفًّا من الأصفار). وكل خطوة صحيحة وكل خطوة تفقد معلومة، ولهذا يجب أن تُبلَّغ القيم غير المرئية <em>قبل</em> الترميز لا بعده. وعلى الملفات الحقيقية يجلب حزيران <code>Beit Lahia</code> مرتين وثلاث وكالات لم يعرفها آذار، 5 صفوف من 85 — وترميز كل ملف على حدة يعطي بدلًا من ذلك مصفوفتين بعرضين مختلفين."
        }
      },

      {
        id: "t2ax18",
        type: "match",
        level: "easy",
        topics: ["t2-level-to-encoder", "t2-encoding-rule"],
        q: {
          en: "In this lesson the measurement level of a column stops being a description and becomes a permission: it decides which encoder the column is allowed. Match each column of the 480-flat frame to the encoder it is allowed.",
          ar: "في هذا الدرس يكفّ مستوى قياس العمود عن كونه وصفًا ويصير إذنًا: فهو يقرّر أي مُرمِّز يُسمح للعمود به. وصّل كل عمود من إطار الشقق الـ480 بالمُرمِّز المسموح له."
        },
        leftHead: { en: "Column", ar: "العمود" },
        rightHead: { en: "The encoder it is allowed", ar: "المُرمِّز المسموح له" },
        pairs: [
          {
            l: { en: "<code>listing_id</code> — an identifier the site assigns once and never reuses", ar: "<code>listing_id</code> — معرّف يسنده الموقع مرة ولا يعيد استخدامه" },
            r: { en: "None: leave the column out of the feature matrix altogether", ar: "لا مُرمِّز: أخرِج العمود من مصفوفة الخصائص كلها" }
          },
          {
            l: { en: "<code>city</code> — nominal, 5 levels after the canonical map", ar: "<code>city</code> — اسمي، 5 مستويات بعد الخريطة المعيارية" },
            r: { en: "One-hot against a fitted list, giving 5 columns whatever the batch contains", ar: "ترميز أحادي مقابل قائمة مضبوطة، فيعطي 5 أعمدة أيًّا كان ما تحتويه الدفعة" }
          },
          {
            l: { en: "<code>condition</code> — ordinal: <code>poor &lt; fair &lt; good &lt; excellent</code>", ar: "<code>condition</code> — رُتبي: <code>poor &lt; fair &lt; good &lt; excellent</code>" },
            r: { en: "One integer code that follows a declared order, so <code>&gt;</code> means something", ar: "رمزٌ صحيح واحد يتبع ترتيبًا معلَنًا، فتصير <code>&gt;</code> ذات معنى" }
          },
          {
            l: { en: "<code>agency</code> — nominal, 20 levels over 480 rows, 5 of them with one listing each", ar: "<code>agency</code> — اسمي، 20 مستوًى على 480 صفًّا، خمسة منها بإعلان واحد لكلٍّ" },
            r: { en: "Fold the long tail into an <code>Other</code> bucket — or measure it and drop the column", ar: "اجمع الذيل الطويل في دلو <code>Other</code> — أو قِسْه واحذف العمود" }
          },
          {
            l: { en: "<code>area_m2</code> — a measurement in metres with a true zero", ar: "<code>area_m2</code> — قياس بالأمتار له صفر حقيقي" },
            r: { en: "No encoder at all; a scaler, and only for the models that need one", ar: "لا مُرمِّز بالمرّة؛ بل مُوحِّد مقياس، وللنماذج التي تحتاجه وحدها" }
          }
        ],
        hint: {
          en: "The one rule is that an encoding may represent every relation the column really has and no relation it does not. Ask of each column: equality only, or order as well?",
          ar: "القاعدة الواحدة أن الترميز يجوز له أن يمثّل كل علاقة يملكها العمود فعلًا ولا يجوز له أن يمثّل علاقةً لا يملكها. اسأل عن كل عمود: مساواةٌ فقط، أم ترتيبٌ أيضًا؟"
        },
        explain: {
          en: "A city column has exactly one relation between its values — equality — so the encoder must add nothing else, and one-hot adds nothing else. An integer code would add order, distance and ratio, and it would take them from the alphabet: Lesson 5 fitted a slope of −12.04 on the real spellings and −0.03 after two cities were respelled to equally defensible transliterations. <code>condition</code> genuinely has an order, so one code that follows the <em>declared</em> order is a trade rather than a mistake: it still invents a distance between levels, and it took the held-out error from 64.67 to 59.48 while the alphabet only reached 63.31. <code>agency</code> is the measured case: 20 levels over 480 rows means some levels get a parameter fitted to one listing, and across ten seeds nothing honest beat a single constant, so the <code>Other</code> bucket or no column at all is the engineering. <code>listing_id</code> is the easy one to get wrong — it is a number, so it encodes silently, and it is a pure row fingerprint. And <code>area_m2</code> is already a number, so it needs no encoder: scaling is a separate decision, made for the model rather than for the column.",
          ar: "عمود المدينة له علاقة واحدة بين قيمه — المساواة — فعلى المُرمِّز ألّا يضيف غيرها، والترميز الأحادي لا يضيف غيرها. أما الرمز الصحيح فيضيف الترتيب والمسافة والنسبة، ويأخذها من الأبجدية: فقد ضبط الدرس 5 ميلًا قدره ‎−12.04 على التهجئات الحقيقية و‎−0.03 بعد إعادة كتابة مدينتين بنقلين حرفيين متساويين في المعقولية. و<code>condition</code> له ترتيب حقيقي، فرمزٌ واحد يتبع الترتيب <em>المعلَن</em> مقايضة لا خطأ: فهو لا يزال يختلق مسافةً بين المستويات، وقد أخذ الخطأ المحجوز من 64.67 إلى 59.48 حين لم تصل الأبجدية إلا إلى 63.31. و<code>agency</code> هي الحالة المقيسة: 20 مستوًى على 480 صفًّا يعني أن بعض المستويات يحصل على وسيط مضبوط على إعلان واحد، وعلى عشر بذور لم يتغلّب شيء أمين على ثابتٍ واحد، فدلو <code>Other</code> أو حذف العمود هو الهندسة الصحيحة. و<code>listing_id</code> هو الأسهل في الخطأ — فهو رقم، فيُرمَّز بصمت، وهو بصمة صفٍّ محضة. و<code>area_m2</code> رقم أصلًا فلا يحتاج مُرمِّزًا: وتوحيد المقياس قرار منفصل يُتّخذ من أجل النموذج لا من أجل العمود."
        }
      },

      {
        id: "t2ax19",
        type: "mcq",
        level: "medium",
        topics: ["t2-scale-after-repair", "t2-who-needs-scaling", "t2-tree-split-invariant"],
        q: {
          en: "Two measurements on this chapter's columns. (1) With the 99999 still in the rent column, min–max puts <strong>460 of the 461</strong> rents below 0.01 and standardisation squeezes the whole market into about a tenth of a standard deviation; after the repair, min–max gives quartiles of 0.20 / 0.28 / 0.39. (2) A one-level regression tree fitted on <code>area_m2</code> chooses the threshold 62.800000 in raw metres, 0.388688 after min–max and −0.528055 after standardising — and all three keep the same 115 listings below it and report the same total squared error, 2234077.9245. Which statement is right?",
          ar: "قياسان على أعمدة هذا الفصل. (1) مع بقاء 99999 في عمود الإيجار، يضع توحيد الحدَّين <strong>460 من 461</strong> إيجارًا تحت 0.01، ويضغط التوحيد المعياري السوق كلها في نحو عُشر انحراف معياري؛ وبعد الترميم يعطي توحيد الحدَّين أرباعًا قدرها 0.20 / 0.28 / 0.39. (2) شجرة انحدار بمستوى واحد مضبوطة على <code>area_m2</code> تختار الحدّ 62.800000 بالأمتار الخام، و0.388688 بعد توحيد الحدَّين، و‎−0.528055 بعد التوحيد المعياري — والثلاثة كلها تُبقي الإعلانات الـ115 نفسها تحته وتبلّغ مجموع المربّعات نفسه، 2234077.9245. أي العبارات صحيح؟"
        },
        options: [
          {
            en: "Because the tree is unaffected, scaling is only ever a presentation choice: no model actually needs it.",
            ar: "بما أن الشجرة لا تتأثّر، فتوحيد المقياس خيارُ عرضٍ لا أكثر: فلا نموذج يحتاجه فعلًا."
          },
          {
            en: "Scaling belongs last, after the value repair, and only for the models that need it — for the tree, two parameters stored for nothing.",
            ar: "موضع توحيد المقياس أخيرًا، بعد ترميم القيم، وللنماذج التي تحتاجه وحدها — أما الشجرة فوسيطان يُخزَّنان بلا مقابل."
          },
          {
            en: "Min–max collapsed because it is the wrong formula for money; standardising the column instead would have survived the typo.",
            ar: "انهار توحيد الحدَّين لأنه الصيغة الخاطئة للنقود؛ ولو وُحِّد العمود توحيدًا معياريًّا بدلًا منه لصمد أمام خطأ الإدخال."
          },
          {
            en: "Robust scaling makes the stage order irrelevant: its quartiles are −0.45 / 0.00 / 0.55 with the typo and without it, so it can safely be run before the value repair.",
            ar: "التوحيد الحصين يجعل ترتيب المراحل غير ذي أثر: فأرباعه ‎−0.45 / 0.00 / 0.55 مع خطأ الإدخال ودونه، فيمكن تشغيله قبل ترميم القيم بأمان."
          }
        ],
        answer: 1,
        hint: {
          en: "Two separate questions are hiding here: <em>when</em> in the pipeline scaling runs, and <em>whether</em> a particular model wants it at all.",
          ar: "هنا سؤالان منفصلان مستترّان: <em>متى</em> يُشغَّل توحيد المقياس في خطّ الأنابيب، و<em>هل</em> يريده نموذجٌ معيّن أصلًا."
        },
        explain: {
          en: "The first measurement is the canonical order asserting itself: both scalers learn their two parameters from the column as it is, so one phone number ruins the feature and nothing raises. Hence stage 2 before stage 5, always. The second is the other half: a tree splits on <em>order</em>, and no monotone rescaling changes the order of the values, so the partition and the error are identical to four decimal places — storing a minimum and a maximum for a random forest is two parameters kept for nothing, and the readable units are worth more. The answer that generalises that into “no model needs scaling” is the dangerous half-truth: kNN, support vector machines, k-means, PCA, neural networks and any penalised linear model all do, because they measure distances or penalise coefficient sizes, and unscaled, <code>area_m2</code> owns almost all of the squared distance between two listings. Robust scaling is the genuinely tempting distractor, because its quartiles really are unchanged — but the typo itself comes out at 997.99 instead of 3.80, so the broken value is still in the feature; the quartiles being stable is a property of the ranks, not an excuse to skip stage 2.",
          ar: "القياس الأول هو الترتيب القياسي يفرض نفسه: فكلا المُوحِّدين يتعلّم وسيطيه من العمود كما هو، فيُفسد رقم هاتف واحد الخاصيةَ ولا يُثار أي خطأ. فالمرحلة 2 قبل المرحلة 5، دائمًا. والقياس الثاني هو النصف الآخر: الشجرة تقسم على <em>الترتيب</em>، ولا تغيّر إعادةُ قياسٍ رتيبةٌ ترتيبَ القيم، فتتطابق التجزئة والخطأ إلى أربع خانات عشرية — وتخزين حدٍّ أدنى وأعلى لغابة عشوائية وسيطان يُحفظان بلا مقابل، والوحدات المقروءة أنفع. والجواب الذي يعمّم ذلك إلى «لا نموذج يحتاج توحيد المقياس» هو نصف الحقيقة الخطير: فـkNN وآلات الأشعّة الداعمة وk-means وتحليل المكوّنات الرئيسية والشبكات العصبية وكل نموذج خطّي معاقَب تحتاجه كلها، لأنها تقيس مسافات أو تعاقب أحجام المعاملات، و<code>area_m2</code> دون توحيد يملك جُلّ المسافة المربّعة بين إعلانين. والتوحيد الحصين هو المُشتِّت المغري حقًّا، لأن أرباعه لم تتغيّر فعلًا — لكن خطأ الإدخال نفسه يخرج بقيمة 997.99 بدل 3.80، فالقيمة المكسورة ما زالت في الخاصية؛ وثبات الأرباع خاصيةٌ للرُّتب لا عذرٌ لتخطّي المرحلة 2."
        }
      },

      {
        id: "t2ax20",
        type: "contrast",
        level: "medium",
        topics: ["t2-one-hot", "t2-ordinal-encoding", "t2-encoding-rule"],
        q: {
          en: "Two encoders, each the right one for its own column. Place each statement under <em>one-hot encoding of <code>city</code></em>, under <em>one ordered integer code for <code>condition</code></em>, or under both.",
          ar: "مُرمِّزان، كلٌّ منهما هو الصحيح لعموده. ضع كل عبارة تحت <em>الترميز الأحادي لـ<code>city</code></em>، أو تحت <em>رمز صحيح مرتَّب لـ<code>condition</code></em>، أو تحت كلتيهما."
        },
        concepts: [
          { en: "One-hot encoding of <code>city</code>", ar: "الترميز الأحادي لـ<code>city</code>" },
          { en: "One ordered integer code for <code>condition</code>", ar: "رمز صحيح مرتَّب لـ<code>condition</code>" }
        ],
        rows: [
          {
            s: {
              en: "It adds one column per level",
              ar: "يضيف عمودًا لكل مستوى"
            },
            a: 0
          },
          {
            s: {
              en: "It tells the model that one level is greater than another",
              ar: "يُخبر النموذج أن مستوًى أكبر من آخر"
            },
            a: 1
          },
          {
            s: {
              en: "The list of levels it uses is a parameter that has to be stored and shipped",
              ar: "قائمة المستويات التي يستخدمها وسيطٌ يجب تخزينه وشَحنه"
            },
            a: 2
          },
          {
            s: {
              en: "Inserting a new level between two old ones renumbers every level above it",
              ar: "إدخال مستوى جديد بين مستويين قديمين يعيد ترقيم كل مستوى أعلى منه"
            },
            a: 1
          },
          {
            s: {
              en: "A value the fit never saw arrives as a row of zeros, with no name left",
              ar: "القيمة التي لم يرها الضبط تصل صفًّا من الأصفار بلا اسم باقٍ"
            },
            a: 0
          },
          {
            s: {
              en: "It is the right encoder for a column whose only relation between values is equality",
              ar: "هو المُرمِّز الصحيح لعمود علاقته الوحيدة بين قيمه هي المساواة"
            },
            a: 0
          },
          {
            s: {
              en: "It states a distance between two levels that the column does not actually contain",
              ar: "يُعلن مسافةً بين مستويين لا يحتويها العمود فعلًا"
            },
            a: 1
          }
        ],
        hint: {
          en: "Go relation by relation: equality, order, distance, ratio. Which of them does each encoder give the model, and which does each column really have?",
          ar: "امضِ علاقةً علاقة: المساواة، ثم الترتيب، ثم المسافة، ثم النسبة. أيها يعطي كل مُرمِّز للنموذج، وأيها يملكه كل عمود فعلًا؟"
        },
        explain: {
          en: "The two differ in what they give the model and agree in what they cost you to maintain. One-hot adds one column per category and no order at all, which is exactly right for a column whose only relation is equality — and an unseen value becomes a row of zeros, a named problem turned invisible, which is why the unseen values are counted before the encoding. An ordered code is one column and represents the order, which is the relation <code>condition</code> really has; the price is a distance it does not have (the gap from <code>poor</code> to <code>fair</code> is declared equal to the gap from <code>good</code> to <code>excellent</code>), and the fact that the code of a level depends on the whole list — inserting <code>very good</code> between <code>good</code> and <code>excellent</code> moves <code>excellent</code> from 3 to 4 and changes the code of 75 of 480 flats, with no change to the data and no error raised. The row that is true of both is the one to carry away: a category list and a declared order are both fitted parameters, so both belong in <code>fitted</code> and both must be shipped with the model rather than left in a module constant somebody can edit.",
          ar: "يختلف المُرمِّزان في ما يعطيانه للنموذج ويتّفقان في ما يكلّفانك في الصيانة. فالترميز الأحادي يضيف عمودًا لكل فئة ولا يضيف ترتيبًا بالمرّة، وهذا هو الصحيح تمامًا لعمود علاقته الوحيدة هي المساواة — والقيمة غير المرئية تصير صفًّا من الأصفار، أي مشكلةً مسمّاة صارت غير مرئية، ولذلك تُعدّ القيم غير المرئية قبل الترميز. والرمز المرتَّب عمودٌ واحد ويمثّل الترتيب، وهو العلاقة التي يملكها <code>condition</code> فعلًا؛ وثمنه مسافةٌ لا يملكها (فالفجوة من <code>poor</code> إلى <code>fair</code> تُعلَن مساويةً للفجوة من <code>good</code> إلى <code>excellent</code>)، وكون رمز المستوى يعتمد على القائمة كلها — فإدخال <code>very good</code> بين <code>good</code> و<code>excellent</code> ينقل <code>excellent</code> من 3 إلى 4 ويغيّر رمز 75 شقة من 480، دون تغيير في البيانات ودون إثارة أي خطأ. والسطر الصحيح في الحالتين هو ما تحمله معك: قائمة الفئات والترتيب المعلَن وسيطان مضبوطان كلاهما، فموضعهما <code>fitted</code> ويجب شحنهما مع النموذج لا تركهما في ثابت وحدةٍ يستطيع أحدٌ تحريره."
        }
      },

      /* ============================= Lesson 6 ============================= */
      {
        id: "t2ax21",
        type: "error",
        level: "medium",
        topics: ["t2-pivot-table", "t2-pivot-back", "t2-repost"],
        q: {
          en: "The program should put the long rent history back into a grid a housing officer can read: one rent per flat per quarter. Listing 5002 was advertised twice, the second advert 40 shekels dearer, so the history holds two rents for each of its quarters. The program prints <code>grid: (40, 4)</code>, then <code>on record for 5002 in Q1: [110.0, 150.0]</code>, then <code>the grid cell: 130.0</code> — a number that appears nowhere in the data and belongs to no advert. Nothing is raised and no warning appears. Click the offending line.",
          ar: "ينبغي للبرنامج أن يُعيد سجلّ الإيجارات الطويل إلى شبكة يقرؤها موظّف إسكان: إيجار واحد لكل شقة في كل ربع. وقد أُعلن عن الإعلان 5002 مرتين، والإعلان الثاني أغلى بـ40 شيكلًا، فيحمل السجل إيجارين لكل ربع من أرباعه. ويطبع البرنامج <code>grid: (40, 4)</code> ثم <code>on record for 5002 in Q1: [110.0, 150.0]</code> ثم <code>the grid cell: 130.0</code> — وهو رقم لا يظهر في البيانات في أي موضع ولا ينتمي إلى أي إعلان. ولا يُثار شيء ولا يظهر أي تحذير. انقر السطر المسؤول."
        },
        code: code(
          "import pandas as pd",
          "",
          "wide = pd.read_csv(\"rent_history_wide.csv\")           # 40 listings x 4 quarter columns",
          "QUARTERS = [c for c in wide.columns if c.startswith(\"rent_\")]",
          "long = wide.melt(id_vars=[\"listing_id\", \"city\"], value_vars=QUARTERS,",
          "                 var_name=\"quarter\", value_name=\"rent\")",
          "",
          "repost  = long[long[\"listing_id\"] == 5002].assign(rent=lambda d: d[\"rent\"] + 40)",
          "history = pd.concat([long, repost], ignore_index=True)   # 5002 was advertised twice",
          "",
          "grid = history.pivot_table(index=\"listing_id\", columns=\"quarter\", values=\"rent\")",
          "",
          "print(\"grid:\", grid.shape)",
          "print(\"on record for 5002 in Q1:\",",
          "      history.loc[(history[\"listing_id\"] == 5002)",
          "                  & (history[\"quarter\"] == \"rent_2026q1\"), \"rent\"].tolist())",
          "print(\"the grid cell:\", grid.loc[5002, \"rent_2026q1\"])"
        ),
        answer: 11,
        solution: {
          code: code(
            "one_per_cell = history.drop_duplicates([\"listing_id\", \"quarter\"], keep=\"last\")",
            "grid = one_per_cell.pivot(index=\"listing_id\", columns=\"quarter\", values=\"rent\")",
            "",
            "print(\"history rows:\", len(history), \"-> one per cell:\", len(one_per_cell))",
            "print(\"the grid cell:\", grid.loc[5002, \"rent_2026q1\"])"
          ),
          out: code(
            "history rows: 164 -> one per cell: 160",
            "the grid cell: 150.0"
          ),
          en: "<code>pivot</code> has the guarantee <code>pivot_table</code> lacks: handed a duplicated cell it refuses the job — <code>ValueError: Index contains duplicate entries, cannot reshape</code> — instead of averaging it. So decide which copy survives first, which is Lesson 3's decision and here the later advert, and the cell becomes 150.0: a rent somebody actually quoted. If you must use <code>pivot_table</code>, the diagnostic is one line — pivot the same thing again with <code>aggfunc=\"count\"</code> and look for a cell that is not 1; all four of 5002's read 2 where every other row reads 1.",
          ar: "لـ<code>pivot</code> ضمانٌ تفتقر إليه <code>pivot_table</code>: فهي إذا سُلّمت خليةً مكرَّرة ترفض المهمّة — <code>ValueError: Index contains duplicate entries, cannot reshape</code> — بدل أن تحسب متوسطها. فاقرِر أولًا أي نسخة تبقى، وهو قرار الدرس 3، وهو هنا الإعلان الأحدث، فتصير الخلية 150.0: إيجارًا أعلنه أحدٌ فعلًا. وإن كان لا بدّ من <code>pivot_table</code> فالتشخيص سطر واحد — استقطِب الشيء نفسه مرةً أخرى بـ<code>aggfunc=\"count\"</code> وابحث عن خلية لا تساوي 1؛ فخلايا 5002 الأربع كلها تقرأ 2 حيث يقرأ كل صف آخر 1."
        },
        hint: {
          en: "Two rents have to become one cell, so something chose how. Find the line that made that choice, and ask where the choice is written down.",
          ar: "إيجاران يجب أن يصيرا خلية واحدة، فلا بدّ أن شيئًا اختار الكيفية. اعثر على السطر الذي اتّخذ ذلك الاختيار، واسأل: أين هو مكتوب؟"
        },
        explain: {
          en: "Line 11 is where two rents silently become one number. <code>pivot</code> and <code>pivot_table</code> are not two names for one operation: <code>pivot</code> refuses a duplicated cell outright, while <code>pivot_table</code> accepts the job and averages, because <code>aggfunc</code> defaults to <code>\"mean\"</code>. So the defect is not the averaging — averaging is precisely what this call asked for. The defect is that the decision to average was made by a default rather than by the author, and what comes out is a 130.0 that belongs to no flat and no advert, inside a grid of the right shape with the right dtype and nothing missing. Line 9 is the tempting wrong click, and it is worth saying why it is wrong: a repost is real data, this chapter's file holds nine of them, so the pipeline has to cope with one — and Lesson 3 already decided how, by keeping one row per business key and choosing the copy by its parsed date. Making that decision visibly, upstream, is the pipeline's job; having <code>pivot_table</code> make it with arithmetic is the bug. The habit to carry away: any cell of a <code>pivot_table</code> computed from more than one row should either be intended or be a bug, and the count table is how you tell.",
          ar: "في السطر 11 يصير إيجاران رقمًا واحدًا بصمت. فـ<code>pivot</code> و<code>pivot_table</code> ليسا اسمين لعملية واحدة: <code>pivot</code> ترفض الخلية المكرَّرة رفضًا صريحًا، أما <code>pivot_table</code> فتقبل المهمّة وتحسب المتوسط، لأن <code>aggfunc</code> قيمتها الافتراضية <code>\"mean\"</code>. فالعيب ليس حساب المتوسط — فحساب المتوسط هو بالضبط ما طلبه هذا النداء. العيب أن قرار حساب المتوسط اتّخذته قيمةٌ افتراضية لا المؤلّف، والذي يخرج هو 130.0 لا ينتمي إلى أي شقة ولا إلى أي إعلان، داخل شبكة بالشكل الصحيح والنوع الصحيح ولا ناقص فيها. والسطر 9 هو النقرة الخاطئة المغرية، ويجدر بيان سبب خطئها: إعادة النشر بيانات حقيقية، وملفّ هذا الفصل يحمل تسعًا منها، فعلى خطّ الأنابيب أن يتعامل مع واحدة — وقد قرّر الدرس 3 الكيفية أصلًا، بإبقاء صفّ واحد لكل مفتاح تجاري واختيار النسخة بتاريخها المحلَّل. واتّخاذ ذلك القرار على نحو مرئيّ في الأعلى هو عمل خطّ الأنابيب؛ أما أن تتّخذه <code>pivot_table</code> بالحساب فذاك هو الخطأ. والعادة التي تحملها معك: أي خلية في <code>pivot_table</code> حُسبت من أكثر من صف واحد فإمّا أن تكون مقصودة وإمّا أن تكون خطأً، وجدول الأعداد هو ما يكشف أيّهما."
        }
      },

      {
        id: "t2ax22",
        type: "compare",
        level: "medium",
        topics: ["t2-raw-key-merge", "t2-clean-key-merge", "t2-merge-defences"],
        q: {
          en: "<code>city_reference.csv</code> holds one row per city with its governorate, population, whether it is coastal and how far it is from Gaza City. Both programs add those columns to the 503 March listings. A prints <code>(316, 17)</code>; B prints <code>(503, 17)</code>. Which statement is correct?",
          ar: "يحمل <code>city_reference.csv</code> صفًّا واحدًا لكل مدينة مع محافظتها وسكّانها وهل هي ساحلية وكم تبعد عن مدينة غزة. والبرنامجان يضيفان تلك الأعمدة إلى إعلانات آذار الـ503. والأول يطبع <code>(316, 17)</code>؛ والثاني يطبع <code>(503, 17)</code>. أي العبارات صحيح؟"
        },
        codeA: code(
          "ref = pd.read_csv(\"city_reference.csv\")",
          "",
          "out = march.merge(ref, on=\"city\", how=\"inner\")",
          "print(out.shape)"
        ),
        codeB: code(
          "ref = pd.read_csv(\"city_reference.csv\")",
          "key = (march[\"city\"].str.strip().str.lower()",
          "                    .str.replace(r\"\\s+\", \" \", regex=True).map(CITY_MAP))",
          "",
          "n   = len(march)",
          "out = march.assign(city=key).merge(ref, on=\"city\", how=\"left\", validate=\"m:1\")",
          "assert len(out) == n, \"the reference join changed the row count\"",
          "print(out.shape)"
        ),
        options: [
          {
            en: "B is right, and the key rather than the <code>how=</code> is what kept 503 rows: only 5 of the 26 raw spellings match the reference, so A's join deleted 187 listings in silence.",
            ar: "الثاني صحيح، والمفتاح لا <code>how=</code> هو ما أبقى 503 صفوف: فخمسٌ فقط من التهجئات الخام الـ26 تطابق المرجع، فحذف دمجُ الأول 187 إعلانًا بصمت."
          },
          {
            en: "A is the safer of the two, because <code>how=\"inner\"</code> guarantees that every row of the result has its reference columns filled in, while B's left join leaves behind blanks that nobody will ever read.",
            ar: "الأول أأمن من الثاني، لأن <code>how=\"inner\"</code> يضمن أن كل صف في الناتج معبَّأةٌ أعمدته المرجعية، بينما يترك الدمج الأيسر في الثاني خلفه فراغات لن يقرأها أحد قطّ."
          },
          {
            en: "Both are correct and A is simply the smaller table: on this key <code>how=\"inner\"</code> and <code>how=\"left\"</code> return the same rows, so the join kind is the only real difference between them.",
            ar: "كلاهما صحيح والأول جدول أصغر فحسب: فعلى هذا المفتاح يُعيد <code>how=\"inner\"</code> و<code>how=\"left\"</code> الصفوف نفسها، فيكون نوع الدمج هو الفرق الحقيقي الوحيد بينهما."
          },
          {
            en: "B's assertion is redundant: <code>how=\"left\"</code> cannot change the row count, so <code>validate=\"m:1\"</code> is the only one of its two defences that does anything.",
            ar: "تأكيد الثاني زائد: فـ<code>how=\"left\"</code> لا يستطيع تغيير عدد الصفوف، فيكون <code>validate=\"m:1\"</code> هو الوحيد من دفاعيه الذي يفعل شيئًا."
          }
        ],
        answer: 0,
        hint: {
          en: "Lesson 3 found 26 spellings of five cities. How many of them would a reference file, written once and correctly, happen to contain?",
          ar: "وجد الدرس 3 ستًّا وعشرين تهجئة لخمس مدن. فكم واحدة منها يحتويها ملفٌ مرجعي كُتب مرة واحدة كتابةً صحيحة؟"
        },
        explain: {
          en: "A's failure is in the key, not in the join: <code>Deir al-Balah</code>, <code>Gaza</code>, <code>Jabalia</code>, <code>Khan Younis</code> and <code>Rafah</code> happen to be spelled as the reference spells them and carry 316 rows, and the other 21 spellings — <code>gaza</code>, <code>KHAN YOUNIS</code>, <code>jabalya</code>, <code>Deir al Balah</code> — match nothing, so <code>how=\"inner\"</code> deletes their 187 listings. The frame that comes back is not broken in any way a check would notice: 17 sensible columns, no blanks in the reference columns, every city spelled correctly. It is a clean table of a market that does not exist — and it even looks <em>better</em>, because listing 5062, whose rent is a phone number, has its city written <code>JABALIA</code> and is thrown away with the rest. That is why the answer praising A for having no blanks is tempting: “no missing values” is the symptom of the deletion, not evidence of correctness. The answer calling the join kind the only difference misses that A merges on the raw column, where inner and left are 316 and 503; on the cleaned key they are both 503, and that equality is itself the one-line test that nothing was dropped. And the answer that calls B's assertion redundant states the most common belief about merges: <code>how=\"left\"</code> promises that no left row is <em>lost</em>, never that none is <em>duplicated</em> — one repeated reference row takes 480 flats to 644, which is what <code>validate=\"m:1\"</code> catches and what the row assertion catches if a future edit removes it.",
          ar: "فشل الأول في المفتاح لا في الدمج: فـ<code>Deir al-Balah</code> و<code>Gaza</code> و<code>Jabalia</code> و<code>Khan Younis</code> و<code>Rafah</code> تصادف أنها مكتوبة كما يكتبها المرجع وتحمل 316 صفًّا، والتهجئات الـ21 الأخرى — <code>gaza</code> و<code>KHAN YOUNIS</code> و<code>jabalya</code> و<code>Deir al Balah</code> — لا تطابق شيئًا، فيحذف <code>how=\"inner\"</code> إعلاناتها الـ187. والإطار العائد غير مكسور بأي صورة يلحظها تحقّق: 17 عمودًا معقولًا، ولا فراغات في الأعمدة المرجعية، وكل مدينة مكتوبة كتابةً صحيحة. إنه جدول نظيف لسوقٍ غير موجودة — وهو يبدو <em>أحسن</em> حتى، لأن إعلان 5062 الذي إيجاره رقم هاتف مكتوبةٌ مدينته <code>JABALIA</code> فيُطرح مع الباقي. ولهذا يكون الجواب الذي يمدح الأول لخلوّه من الفراغات مغريًا: فـ«لا قيم مفقودة» عَرَضُ الحذف لا دليلُ الصحة. والجواب الذي يسمّي نوع الدمج الفرق الوحيد يُفوّت أن الأول يدمج على العمود الخام حيث يكون الداخلي والأيسر 316 و503؛ وعلى المفتاح المنظَّف يكونان 503 كلاهما، وهذا التساوي نفسه هو اختبار السطر الواحد على أن شيئًا لم يُسقط. أما الجواب الذي يسمّي تأكيدَ الثاني زائدًا فيُعلن أشيعَ اعتقاد عن الدمج: فـ<code>how=\"left\"</code> يَعِد بأن لا صفًّا أيسر <em>يُفقَد</em>، لا بأن لا صفًّا <em>يُكرَّر</em> — وصفٌّ مرجعي واحد مكرَّر يأخذ 480 شقة إلى 644، وهذا ما يلتقطه <code>validate=\"m:1\"</code> وما يلتقطه تأكيد عدد الصفوف إن حذفه تحريرٌ مستقبلي."
        }
      },

      {
        id: "t2ax23",
        type: "ordercode",
        level: "medium",
        topics: ["t2-melt", "t2-which-shape", "t2-pivot-table"],
        q: {
          en: "<code>rent_history_wide.csv</code> is 40 listings by 4 quarter columns, and a housing officer has asked for one table: the median rent per city per quarter, with the number of flats behind each median beside it. Put the statements in the one order that runs — compute in long, present in wide, and never print a median without its sample size.",
          ar: "ملف <code>rent_history_wide.csv</code> هو 40 إعلانًا في 4 أعمدة أرباع، وقد طلب موظّف إسكان جدولًا واحدًا: وسيط الإيجار لكل مدينة في كل ربع، ومعه عدد الشقق التي يقوم عليها كل وسيط. رتّب العبارات بالترتيب الوحيد الذي يعمل — احسب في الشكل الطويل، واعرض في الشكل العريض، ولا تطبع وسيطًا بلا حجم عيّنته."
        },
        items: [
          {
            code: "wide = pd.read_csv(\"rent_history_wide.csv\")"
          },
          {
            code: "QUARTERS = [c for c in wide.columns if c.startswith(\"rent_\")]"
          },
          {
            code: code(
              "long = wide.melt(id_vars=[\"listing_id\", \"city\"], value_vars=QUARTERS,",
              "                 var_name=\"quarter\", value_name=\"rent\")"
            )
          },
          {
            code: code(
              "city_median = long.pivot_table(index=\"city\", columns=\"quarter\",",
              "                               values=\"rent\", aggfunc=\"median\")"
            )
          },
          {
            code: code(
              "behind = (long.pivot_table(index=\"city\", columns=\"quarter\", values=\"rent\", aggfunc=\"size\")",
              "              .reindex(index=city_median.index, columns=city_median.columns))"
            )
          },
          {
            code: "report = city_median.round(1).astype(str) + \" (n=\" + behind.astype(str) + \")\""
          },
          {
            code: "print(report.to_string())"
          }
        ],
        answer: [0, 1, 2, 3, 4, 5, 6],
        hint: {
          en: "Every statement needs a name that an earlier one created. Find the one that needs <em>two</em> of them.",
          ar: "كل عبارة تحتاج اسمًا أنشأته عبارةٌ أسبق. اعثر على العبارة التي تحتاج <em>اسمين</em> منها."
        },
        explain: {
          en: "The chain is forced at every step: you cannot list the quarter columns before the file is read, cannot melt before you know which columns are values, cannot pivot before the long frame exists, cannot align the counts before there is a median table to align them to, and cannot paste the two together before both exist. That dependency <em>is</em> the lesson's rule — compute in long, present in wide. The wide file is the shape a spreadsheet produces and a person reads, and it is also the shape in which a fifth quarter means a new column and therefore an edit to every formula; melting turns the quarter from a header into a value, so a fifth quarter is 40 more rows. Note that <code>melt</code> does not drop the 7 blank quarter cells, it turns them into 7 rows — 160 rows of which 153 carry a rent — which is better, because a hole you can count is a hole you can decide about, and a trap if you forget: <code>groupby(\"quarter\").mean()</code> will quietly average 38 flats in one quarter and 40 in another. The <code>behind</code> table is the sentence that must go under the medians: 5 flats in Deir al-Balah against 16 in Gaza. A median of five numbers is a weak statement about a city, and these are real homes in a real market, so a table that hides its sample size is a table that overclaims.",
          ar: "السلسلة مفروضة في كل خطوة: لا تستطيع سرد أعمدة الأرباع قبل قراءة الملف، ولا الإذابة قبل أن تعرف أي الأعمدة قيم، ولا الاستقطاب قبل وجود الإطار الطويل، ولا محاذاة الأعداد قبل وجود جدول وسائط تُحاذيها إليه، ولا لصق الاثنين قبل وجودهما. وهذا الاعتماد <em>هو</em> قاعدة الدرس — احسب في الطويل واعرض في العريض. فالملف العريض هو الشكل الذي تُنتجه جداول الحساب ويقرؤه الإنسان، وهو أيضًا الشكل الذي يعني فيه ربعٌ خامس عمودًا جديدًا ومن ثمّ تحريرًا لكل صيغة؛ والإذابة تحوّل الربع من عنوان إلى قيمة، فيصير الربع الخامس 40 صفًّا إضافيًّا. ولاحظ أن <code>melt</code> لا تُسقط خلايا الأرباع الفارغة السبع بل تحوّلها إلى 7 صفوف — 160 صفًّا يحمل 153 منها إيجارًا — وهذا أحسن، لأن الفراغ الذي تستطيع عدّه فراغٌ تستطيع أن تقرّر فيه، وهو فخٌّ إن نسيته: فـ<code>groupby(\"quarter\").mean()</code> ستحسب بصمت متوسط 38 شقة في ربع و40 في آخر. وجدول <code>behind</code> هو الجملة التي يجب أن توضع تحت الوسائط: خمس شقق في دير البلح مقابل ستّ عشرة في غزة. ووسيط خمسة أرقام قولٌ ضعيف عن مدينة، وهذه بيوت حقيقية في سوق حقيقية، فالجدول الذي يُخفي حجم عيّنته جدولٌ يُفرط في الادّعاء."
        }
      },

      {
        id: "t2ax24",
        type: "multi",
        level: "hard",
        topics: ["t2-undefended-numbers", "t2-fitted-in-memory", "t2-one-split"],
        q: {
          en: "The assembled pipeline takes 503 scraped rows to a 480 × 18 matrix, carries 17 fitted parameters, produces a 17-row report, and refuses to return a frame that fails any of its three assertions — and the held-out error of “what rent should this flat ask?” falls from 63.67 shekels to 36.96. Lesson 6 then spends a concept arguing against it. Which of these are limits the lesson names, with the measurement it gives? (Choose all that apply.)",
          ar: "يأخذ خطّ الأنابيب المجمَّع 503 صفوف مكشوطة إلى مصفوفة 480 × 18، ويحمل 17 وسيطًا مضبوطًا، ويُنتج تقريرًا من 17 سطرًا، ويرفض إعادة إطار يُخلّ بأي من تأكيداته الثلاثة — ويهبط الخطأ المحجوز لسؤال «أي إيجار ينبغي أن تطلبه هذه الشقة؟» من 63.67 شيكلًا إلى 36.96. ثم ينفق الدرس 6 مفهومًا كاملًا في محاججته. أي هذه حدودٌ يسمّيها الدرس مع القياس الذي يقدّمه؟ (اختر كل ما ينطبق.)"
        },
        options: [
          {
            en: "<code>fitted</code> is a dictionary in memory: nothing dates it or records which rows it was measured on, so editing the module's <code>COND_ORDER</code> renumbers 75 of 480 flats — 15.6% of the file — with every assertion still passing.",
            ar: "<code>fitted</code> قاموس في الذاكرة: لا شيء يؤرّخه ولا يسجّل على أي صفوف قيس، فتحرير <code>COND_ORDER</code> في الوحدة يعيد ترقيم 75 شقة من 480 — أي 15.6% من الملف — مع نجاح كل التأكيدات."
          },
          {
            en: "<code>dep_months_all</code> looks derived and is not: the deposit-to-rent multiple has a median of 1.0 that stands on 185 rows against 176, and the same calculation on Lesson 2's sample gave 2.0.",
            ar: "<code>dep_months_all</code> يبدو مستنبَطًا وليس كذلك: فمضاعِف التأمين إلى الإيجار وسيطه 1.0 يقوم على 185 صفًّا مقابل 176، وأعطى الحساب نفسه على عيّنة الدرس 2 القيمة 2.0."
          },
          {
            en: "The three assertions close exactly these gaps, which is why a frame that passes all of them can be trusted: the matrix is the right width, it has no blank cells anywhere, and its column set is the fitted one in the fitted order.",
            ar: "التأكيدات الثلاثة تُغلق هذه الثغرات بالضبط، ولهذا يمكن الثقة بإطار ينجح فيها كلها: فالمصفوفة بالعرض الصحيح، ولا خلية فارغة فيها في أي موضع، ومجموعة أعمدتها هي المضبوطة بالترتيب المضبوط."
          },
          {
            en: "Every number in the final table comes from one 75/25 split with one seed over 113 held-out rents, so a difference under about two shekels in that table means nothing at all.",
            ar: "كل رقم في الجدول النهائي يأتي من تقسيم واحد 75/25 ببذرة واحدة على 113 إيجارًا محجوزًا، فالفرق الأقل من نحو شيكلين في ذلك الجدول لا يعني شيئًا بالمرّة."
          },
          {
            en: "Writing <code>fitted</code> to a JSON file closes the artefact gap on its own, because <code>json.dumps</code> round-trips the dictionary unchanged and the parameters then have a date and a source beside them.",
            ar: "كتابة <code>fitted</code> في ملف JSON تُغلق ثغرة الأثر وحدها، لأن <code>json.dumps</code> تُعيد القاموس كما هو دون تغيير فيصير للوسائط تاريخ ومصدر إلى جانبها."
          }
        ],
        answer: [0, 1, 3],
        hint: {
          en: "An assertion you have never seen fail is a claim you have never tested — and three assertions can only ever check the things somebody thought to assert. Ask what each failure the lesson stages has in common.",
          ar: "التأكيد الذي لم ترَه يفشل قطّ ادّعاءٌ لم تختبره قطّ — وثلاثة تأكيدات لا تتحقّق إلا من الأشياء التي فكّر أحدٌ في تأكيدها. اسأل: ما الذي يجمع كل فشل يُخرجه الدرس على المسرح؟"
        },
        explain: {
          en: "A pipeline that passes its assertions can still be wrong, and the lesson proves it three ways. <code>fitted</code> lives in memory, so the parameters and the module constants can disagree: swap <code>COND_ORDER</code> for a five-level list and 75 <code>excellent</code> flats go from code 3 to code 4 — 15.6% of the file, worth 25.05 shekels each — while the matrix stays 480 × 18 with no blanks and the right column names, so all three assertions pass. <code>dep_months_all</code> is the subtler one, and worse than an eyeballed threshold precisely because it looks measured: 185 ones against 176 above one means the median flips between 1.0 and 2.0 with the sample, and it is applied to 97 of the 117 blank deposits. And every figure in the final table is one split with one seed on 113 rents, so the recommendation to drop the agency block rests on its being free rather than on 36.96 beating 37.09. The answer trusting the assertions inverts the concept: they check the width, the blanks and the column set, which is exactly why none of the three failures above touches them. And the JSON answer is the trap inside the fix — <code>json.dumps</code> turns every dictionary key into a string, so <code>area_by_rooms</code> comes back with keys <code>\"1.0\"</code>, <code>\"2.0\"</code>, …, <code>d[\"rooms\"].map(...)</code> looks up a float and matches none of them, and all 26 blank areas fall silently through to the global fallback, 12.05 m² out on average. Nothing raises, because the matrix is still the right shape.",
          ar: "خطّ الأنابيب الذي ينجح في تأكيداته قد يكون خاطئًا مع ذلك، ويُثبت الدرس هذا بثلاث طرق. فـ<code>fitted</code> يسكن الذاكرة، فيمكن أن تتعارض الوسائط وثوابت الوحدة: استبدل <code>COND_ORDER</code> بقائمة من خمسة مستويات فتنتقل 75 شقة <code>excellent</code> من الرمز 3 إلى الرمز 4 — 15.6% من الملف، بقيمة 25.05 شيكلًا لكل واحدة — وتبقى المصفوفة 480 × 18 بلا فراغات وبأسماء الأعمدة الصحيحة، فتنجح التأكيدات الثلاثة كلها. و<code>dep_months_all</code> هو الأدقّ، وهو أسوأ من حدٍّ مقدَّر بالنظر لأنه يبدو مقيسًا بالضبط: فـ185 واحدًا مقابل 176 فوق الواحد يعني أن الوسيط يتقلّب بين 1.0 و2.0 بتقلّب العيّنة، وهو يُطبَّق على 97 من التأمينات الفارغة الـ117. وكل رقم في الجدول النهائي تقسيمٌ واحد ببذرة واحدة على 113 إيجارًا، فتوصية حذف كتلة الوكالة تقوم على كونها مجانية لا على تغلّب 36.96 على 37.09. والجواب الذي يثق بالتأكيدات يقلب المفهوم: فهي تتحقّق من العرض والفراغات ومجموعة الأعمدة، ولهذا بالضبط لا يمسّها أي من الأعطال الثلاثة أعلاه. أما جواب JSON فهو الفخّ الكامن في العلاج — فـ<code>json.dumps</code> تحوّل كل مفاتيح القاموس إلى نصوص، فيعود <code>area_by_rooms</code> بمفاتيح <code>\"1.0\"</code> و<code>\"2.0\"</code> وهكذا، وتبحث <code>d[\"rooms\"].map(...)</code> عن عدد عشري فلا تطابق واحدًا منها، فتهبط المساحات الفارغة الـ26 كلها بصمت إلى البديل العامّ، بفارق 12.05 م² في المتوسط. ولا يُثار شيء، لأن المصفوفة ما زالت بالشكل الصحيح."
        }
      }
    ]
  };
})();
