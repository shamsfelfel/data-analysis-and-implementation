window.DABanks = window.DABanks || {};
(function () {
  /* code(line, line, ...) -> one string with \n between lines */
  function code() { return Array.prototype.join.call(arguments, "\n"); }

  window.DABanks["t2-test-01"] = {
    title: {
      en: "Test 1 — From Typed Table to Model-Ready",
      ar: "اختبار 1 — من جدول مضبوط الأنواع إلى جدول جاهز للنموذج"
    },
    intro: {
      en: "24 questions on Lesson 1: transformation against aggregation, the order of the five stages, fit against apply and the leak between them, never writing into the raw table, a step that returns <code>(frame, log_row)</code>, and the held-out mean absolute error that decides whether a step helped. Plan for about 45 minutes. Every question carries a hint, an answer and an explanation, hidden until you ask for them: try first, then open them. A revealed answer is not counted.",
      ar: "‏24 سؤالًا عن الدرس 1: التحويل مقابل التجميع، وترتيب المراحل الخمس، والضبط مقابل التطبيق والتسرّب بينهما، وألّا تكتب في الجدول الخام قط، وخطوة تعيد <code>(frame, log_row)</code>، ومتوسط الخطأ المطلق على صفوف محجوزة الذي يحسم هل أفادت الخطوة. خصّص نحو 45 دقيقة. لكل سؤال تلميح وجواب وشرح، وكلها مخفية حتى تطلبها: جرّب أولًا ثم افتحها. والجواب الذي يُظهَر لا يُحتسب."
    },
    questions: [

      /* ---------------------------------------------------------- 01 */
      {
        id: "t2l1q01", type: "tf", level: "easy",
        topics: ["t2-transformation"],
        q: {
          en: "Two one-liners on the 503-row table. True or false: the first is a transformation and the second is not, because the second changed the number of rows.",
          ar: "سطران مفردان على جدول الصفوف الـ503. صح أم خطأ: الأول تحويل والثاني ليس تحويلًا، لأن الثاني غيّر عدد الصفوف."
        },
        code: code(
          "print(raw.assign(rent_per_m2=raw[\"monthly_rent\"] / raw[\"area_m2\"]).shape)",
          "print(raw.drop_duplicates().shape)"
        ),
        truth: false,
        hint: {
          en: "The lesson's one test asks something about a row. Does it ask how many rows there are, or what one row means?",
          ar: "اختبار الدرس الواحد يسأل شيئًا عن الصف. فهل يسأل كم صفًّا هناك، أم ماذا يعني الصف الواحد؟"
        },
        explain: {
          en: "False — both are transformations. The first prints <code>(503, 14)</code> and the second <code>(489, 13)</code>, and the test is not the count but the <em>unit</em>: after <code>drop_duplicates()</code> one row is still one advert for one flat and <code>listing_id</code> still identifies it, so another transformation can follow. &ldquo;Preserves the row count&rdquo; is the tempting definition because it is easy to check, but it would also disqualify an ordinary filter, and it would promote <code>raw.groupby(\"governorate\")[\"monthly_rent\"].median()</code>, whose five rows are governorates and not flats at all. Rule to carry away: a transformation keeps the unit of a row; an aggregation replaces it.",
          ar: "خطأ &mdash; كلاهما تحويل. يطبع الأول <code>(503, 14)</code> ويطبع الثاني <code>(489, 13)</code>، والاختبار ليس العدد بل <em>الوحدة</em>: فبعد <code>drop_duplicates()</code> يبقى الصف الواحد إعلانًا واحدًا لشقة واحدة ويبقى <code>listing_id</code> يعرّفه، فيستطيع تحويل آخر أن يتبعه. و«يحفظ عدد الصفوف» تعريف مغرٍ لأنه سهل الفحص، لكنه يُخرج الترشيح العادي من التحويلات أيضًا، ويُدخل فيها <code>raw.groupby(\"governorate\")[\"monthly_rent\"].median()</code> التي صفوفها الخمسة محافظات لا شقق. والقاعدة: التحويل يحفظ وحدة الصف، والتجميع يستبدلها."
        }
      },

      /* ---------------------------------------------------------- 02 */
      {
        id: "t2l1q02", type: "mcq", level: "easy",
        topics: ["t2-model-ready"],
        q: {
          en: "The typed table loaded with the right shape and every dtype the schema asked for, and then three one-line questions declared it unusable: 6 of 13 columns are numeric, <code>pd.get_dummies(df).shape</code> is <code>(503, 266)</code>, and <code>describe()</code> on the rent says this. Which reading of the rent column is the one the lesson defends?",
          ar: "حُمِّل الجدول المضبوط بالشكل الصحيح وبكل نوع طلبه المخطط، ثم أعلنت ثلاثة أسئلة من سطر واحد أنه غير قابل للاستعمال: ستة أعمدة من ثلاثة عشر رقمية، و<code>pd.get_dummies(df).shape</code> تساوي <code>(503, 266)</code>، وتقول <code>describe()</code> عن الإيجار هذا. فأيّ قراءة لعمود الإيجار هي التي يدافع عنها الدرس؟"
        },
        code: code(
          "count      484.0",
          "mean       416.3",
          "std       4536.6",
          "min         25.0",
          "25%        153.8",
          "50%        200.0",
          "75%        255.0",
          "max      99999.0"
        ),
        lang: "text",
        options: [
          {
            en: "A mean well above the median is normal for rents &mdash; most flats are cheap and a few are expensive &mdash; so 416.3 is about what a flat here asks.",
            ar: "المتوسط الأعلى بكثير من الوسيط عاديٌّ في الإيجارات &mdash; فمعظم الشقق رخيصة وقليلها غالٍ &mdash; فيكون 416.3 قريبًا من الإيجار المطلوب لشقة هنا."
          },
          {
            en: "The mean is more than twice the median, so a handful of values are dragging it, and the maximum names them: 99999 is not a rent, and a standard deviation of 4536.6 on quartiles of 153.8 and 255.0 measures that one typo rather than the market.",
            ar: "المتوسط أكثر من ضعف الوسيط، فحفنة قيم تجرّه، والقيمة العظمى تسمّيها: فـ99999 ليس إيجارًا، وانحراف معياري 4536.6 على ربيعين 153.8 و255.0 يقيس خطأ الإدخال الواحد لا السوق."
          },
          {
            en: "The mean and the median measure different things, so the gap between them carries no information about the column.",
            ar: "المتوسط والوسيط يقيسان شيئين مختلفين، فالفجوة بينهما لا تحمل معلومة عن العمود."
          },
          {
            en: "The gap comes from the 19 missing rents, which pandas counts as zero when it averages a column.",
            ar: "الفجوة ناتجة عن الإيجارات التسعة عشر المفقودة، وتعدّها pandas أصفارًا عند حساب متوسط العمود."
          }
        ],
        answer: 1,
        hint: {
          en: "Read the mean beside the maximum and the standard deviation, not on its own. And check what <code>count</code> is: 484, not 503.",
          ar: "اقرأ المتوسط بجانب القيمة العظمى والانحراف المعياري، لا وحده. وافحص ما تعنيه <code>count</code>: ‏484 لا 503."
        },
        explain: {
          en: "The mean of a rent column should sit near its median; more than twice tells you a few values are pulling it, and <code>max 99999</code> names the culprit &mdash; listing 5062, whose &ldquo;rent&rdquo; is a phone number. Drop that one cell and the standard deviation falls from 4536.6 to 81.5. The tempting answer is the one that calls the gap ordinary right-skew and then reads 416.3 as &ldquo;about what a flat here asks&rdquo;: right-skew really is normal for rents and the sentence sounds like statistics, but it quietly gives the mean the median's job. The answer that blames the 19 missing rents is false twice over: <code>count</code> is 484, so pandas skipped those blanks rather than counting them as zero.",
          ar: "ينبغي أن يكون متوسط عمود الإيجار قريبًا من وسيطه؛ وزيادته على الضعف تخبرك أن قيمًا قليلة تجرّه، و<code>max 99999</code> تسمّي الفاعل &mdash; الإعلان 5062 الذي «إيجاره» رقم هاتف. أسقِط تلك الخلية وحدها فيهبط الانحراف المعياري من 4536.6 إلى 81.5. والمغري هو الجواب الذي يسمّي الفجوة التواءً عاديًّا إلى اليمين ثم يقرأ 416.3 على أنها «قريبة من الإيجار المطلوب لشقة هنا»، لأن الالتواء إلى اليمين عاديٌّ فعلًا في الإيجارات والجملة تبدو إحصائية؛ لكنه يعطي المتوسط بهدوء وظيفة الوسيط. والجواب الذي يحمّل الإيجارات التسعة عشر المفقودة المسؤولية خاطئ مرتين: فـ<code>count</code> تساوي 484، أي أن pandas تخطّت تلك الفراغات ولم تعدّها أصفارًا."
        }
      },

      /* ---------------------------------------------------------- 03 */
      {
        id: "t2l1q03", type: "contrast", level: "medium",
        topics: ["t2-transform-vs-aggregate", "t2-transformation"],
        q: {
          en: "Place each statement under <strong>transformation</strong>, under <strong>aggregation</strong>, or under both.",
          ar: "ضع كل عبارة تحت <strong>التحويل</strong> أو تحت <strong>التجميع</strong> أو تحت كليهما."
        },
        concepts: [
          { en: "transformation", ar: "التحويل (transformation)" },
          { en: "aggregation", ar: "التجميع (aggregation)" }
        ],
        rows: [
          {
            s: {
              en: "After it, one row still means one advert for one flat",
              ar: "بعده يبقى الصف الواحد يعني إعلانًا واحدًا لشقة واحدة"
            },
            a: 0
          },
          {
            s: {
              en: "<code>raw.groupby(\"governorate\")[\"monthly_rent\"].median()</code>, which returns five values",
              ar: "‏<code>raw.groupby(\"governorate\")[\"monthly_rent\"].median()</code> التي تعيد خمس قيم"
            },
            a: 1
          },
          {
            s: {
              en: "It may change the number of rows",
              ar: "قد يغيّر عدد الصفوف"
            },
            a: 2
          },
          {
            s: {
              en: "Another step of the same pipeline can be applied to its result",
              ar: "يمكن تطبيق خطوة أخرى من الخط نفسه على نتيجته"
            },
            a: 0
          },
          {
            s: {
              en: "<code>raw.pivot_table(index=\"agency\", values=\"deposit\", aggfunc=\"median\")</code>, which returns a DataFrame of 18 rows",
              ar: "‏<code>raw.pivot_table(index=\"agency\", values=\"deposit\", aggfunc=\"median\")</code> التي تعيد جدولًا من ثمانية عشر صفًّا"
            },
            a: 1
          },
          {
            s: {
              en: "One of its steps may still compute a single number from many rows &mdash; a median to fill a blank with",
              ar: "قد تحسب إحدى خطواته رقمًا واحدًا من صفوف كثيرة &mdash; وسيطًا لتعبئة فراغ"
            },
            a: 0
          },
          {
            s: {
              en: "It is the end of the pipeline: a report, a chart, an answer",
              ar: "هو نهاية الخط: تقرير أو رسم أو جواب"
            },
            a: 1
          }
        ],
        hint: {
          en: "Ask one question of every row: after this operation, does one row still mean one flat? Two of the rows are decided by what the result's rows <em>are</em>, not by how many there are.",
          ar: "اسأل عن كل سطر سؤالًا واحدًا: بعد هذه العملية هل يبقى الصف الواحد يعني شقة واحدة؟ وسطران يُحسمان بما <em>هي</em> صفوف النتيجة لا بعددها."
        },
        explain: {
          en: "The single test is the unit of a row. <code>drop_duplicates()</code> takes 503 rows to 489 and stays a transformation; a <code>groupby</code> median returns five numbers that are governorates, and <code>pivot_table</code> returns a real DataFrame whose rows are agencies &mdash; which is the trap, because a DataFrame feels like a table of listings. &ldquo;May change the number of rows&rdquo; belongs to both, which is exactly why the count cannot be the test. And a transformation is allowed to contain a small aggregation: filling a blank rent with the median aggregates many rents into one number and still hands back 503 rows &mdash; that is legal, and it is where the chapter's two worst bugs live, so whenever a step computes one number from many rows, stop and ask which rows it read.",
          ar: "الاختبار الواحد هو وحدة الصف. فـ<code>drop_duplicates()</code> تأخذ 503 صفوف إلى 489 وتبقى تحويلًا؛ ووسيط <code>groupby</code> يعيد خمسة أرقام هي محافظات، و<code>pivot_table</code> تعيد جدولًا حقيقيًّا صفوفه وكالات &mdash; وهذا هو الفخّ، لأن الجدول يُشعرك أنه جدول إعلانات. و«قد يغيّر عدد الصفوف» تنتمي إلى الاثنين، ولهذا بالضبط لا يصلح العدد اختبارًا. ويُسمح للتحويل أن يحتوي تجميعًا صغيرًا: فتعبئة إيجار فارغ بالوسيط تجمّع إيجارات كثيرة في رقم واحد وتعيد 503 صفوف &mdash; وهذا مشروع، وفيه يسكن أسوأ عطبَين في الفصل، فكلما حسبت خطوةٌ رقمًا واحدًا من صفوف كثيرة فتوقّف واسأل أي الصفوف قرأت."
        }
      },

      /* ---------------------------------------------------------- 04 */
      {
        id: "t2l1q04", type: "output", level: "medium",
        topics: ["t2-pipeline-order", "t2-duplicate-weight"],
        q: {
          en: "Write exactly what the program prints. The two orders differ only in which line comes first; <code>deposit</code> is blank in 123 of the 503 rows, and 14 rows are byte-for-byte repeats.",
          ar: "اكتب بالضبط ما يطبعه البرنامج. لا يختلف الترتيبان إلا في أي سطر يأتي أولًا؛ و<code>deposit</code> فارغ في 123 صفًّا من 503، وأربعة عشر صفًّا مكرّرة حرفًا بحرف."
        },
        code: code(
          "raw = pd.read_csv(\"listings_raw.csv\")",
          "a = raw.copy()                                  # order A: fill, then dedupe",
          "par_a = a[\"deposit\"].median()",
          "a[\"deposit\"] = a[\"deposit\"].fillna(par_a)",
          "a = a.drop_duplicates()",
          "b = raw.drop_duplicates().copy()                # order B: dedupe, then fill",
          "par_b = b[\"deposit\"].median()",
          "print(par_a)",
          "print(par_b)",
          "print(len(a) == len(b))"
        ),
        blanks: [
          { accept: ["287.5\n290.0\nTrue"], lines: 3 }
        ],
        hint: {
          en: "Each median is learned from a different number of rows. The last line asks about the row count after both programs have finished, not about the parameters.",
          ar: "كل وسيط متعلَّم من عدد مختلف من الصفوف. والسطر الأخير يسأل عن عدد الصفوف بعد انتهاء البرنامجين، لا عن الوسيطَين."
        },
        explain: {
          en: "Order A learns the deposit median from all 503 rows, where the fourteen repeated listings vote twice: 287.5. Order B removes them first and learns from 489 rows: 290.0. Both tables then end with 489 rows and no blank deposit, so the third line is <code>True</code> &mdash; and that is the danger, not the comfort: two and a half shekels of parameter difference ends up in 120 of the 489 deposits, and nothing in either table records which order produced it. The tempting answer is that both medians are 287.5, because the row count is identical at the end and the deduplication &ldquo;only removed duplicates&rdquo;; a duplicated row is a vote, and a parameter learned from a table with duplicates is a weighted average.",
          ar: "يتعلّم الترتيب أ وسيط التأمين من الصفوف الـ503 كلها، وفيها تصوّت الإعلانات المكرّرة الأربعة عشر مرتين: ‏287.5. ويحذفها الترتيب ب أولًا فيتعلّم من 489 صفًّا: ‏290.0. ثم ينتهي الجدولان إلى 489 صفًّا وبلا تأمين فارغ، فيكون السطر الثالث <code>True</code> &mdash; وهذا هو الخطر لا الطمأنينة: فشيكلان ونصف من فرق الوسيط ينتهيان في 120 تأمينًا من 489، ولا شيء في أي من الجدولين يسجّل أي ترتيب أنتجه. والجواب المغري أن الوسيطَين 287.5 كلاهما، لأن عدد الصفوف متطابق في النهاية ولأن حذف المكرّر «أزال مكرّرات فقط»؛ لكن الصف المكرّر صوتٌ، والوسيط المتعلَّم من جدول فيه تكرارات متوسطٌ موزون."
        }
      },

      /* ---------------------------------------------------------- 05 */
      {
        id: "t2l1q05", type: "tf", level: "easy",
        topics: ["t2-duplicate-weight", "t2-pipeline-order"],
        q: {
          en: "On this file the median rent is 200.0 whether you compute it on all 503 rows or on the 489 that survive <code>drop_duplicates()</code>. True or false: that proves the median is a parameter for which the deduplication order no longer matters.",
          ar: "في هذا الملف يكون وسيط الإيجار 200.0 سواء حسبتَه على الصفوف الـ503 كلها أو على الـ489 الباقية بعد <code>drop_duplicates()</code>. صح أم خطأ: هذا يُثبت أن الوسيط وسيطٌ لم يبقَ ترتيب حذف المكرّر مهمًّا له."
        },
        truth: false,
        hint: {
          en: "The global median is one number over 484 rents. What happens to each median when you do what you would actually do &mdash; split the column by governorate first?",
          ar: "الوسيط العام رقم واحد على 484 إيجارًا. فماذا يحدث لكل وسيط إذا فعلتَ ما ستفعله فعلًا &mdash; أي قسمتَ العمود بحسب المحافظة أولًا؟"
        },
        explain: {
          en: "False. The global median survived because <em>this</em> column has a wide plateau at its centre: nineteen listings ask exactly 200, so the middle value stays 200 whichever fourteen rows you remove. Group the same column &mdash; which is what you would actually do, since a Rafah flat and a Gaza City flat are not comparable &mdash; and three of the five governorate medians move: Deir al-Balah 160.0&nbsp;&rarr;&nbsp;165.0, Khan Younis 187.5&nbsp;&rarr;&nbsp;185.0, Rafah 175.0&nbsp;&rarr;&nbsp;177.5. The rule is not &ldquo;prefer robust statistics&rdquo; (though you should); it is <strong>never rely on a step being order-independent, because you cannot tell by looking</strong>.",
          ar: "خطأ. نجا الوسيط العام لأن <em>هذا</em> العمود له هضبة عريضة في مركزه: فتسعة عشر إعلانًا تطلب 200 بالضبط، فتبقى القيمة الوسطى 200 أيًّا كانت الصفوف الأربعة عشر التي تحذفها. وجمّع العمود نفسه &mdash; وهذا ما ستفعله فعلًا، لأن شقة في رفح وشقة في مدينة غزة غير قابلتين للمقارنة &mdash; فتتحرك ثلاثة من وسطاء المحافظات الخمسة: دير البلح 160.0&nbsp;&rarr;&nbsp;165.0، وخان يونس 187.5&nbsp;&rarr;&nbsp;185.0، ورفح 175.0&nbsp;&rarr;&nbsp;177.5. والقاعدة ليست «فضّل الإحصاءات الحصينة» (وإن كان ينبغي أن تفعل)، بل <strong>لا تعتمد قط على كون خطوة مستقلة عن الترتيب، لأنك لا تستطيع أن تعرف ذلك بالنظر</strong>."
        }
      },

      /* ---------------------------------------------------------- 06 */
      {
        id: "t2l1q06", type: "order", level: "easy",
        topics: ["t2-canonical-order"],
        q: {
          en: "Put the five stages of the canonical order where the single principle puts them: a stage may only learn from data that no later stage will change.",
          ar: "رتّب مراحل الترتيب القياسي الخمس كما يرتّبها المبدأ الواحد: لا يحقّ لمرحلة أن تتعلّم إلا من بيانات لن تغيّرها مرحلة لاحقة."
        },
        items: [
          {
            en: "<strong>Structure</strong> &mdash; what is one row? Drop the 14 byte-for-byte repeats and decide what to do with the 9 reposts.",
            ar: "<strong>البنية</strong> &mdash; ما هو الصف الواحد؟ احذف التكرارات الحرفية الأربعة عشر وقرّر ما تفعله بإعادات النشر التسع."
          },
          {
            en: "<strong>Values</strong> &mdash; is each cell legal? 26 city spellings, <code>furnished</code> in 12 forms, <code>G</code> for ground floor, a rent of 99999, an area of 0.0379.",
            ar: "<strong>القيم</strong> &mdash; هل كل خلية مشروعة؟ ستٌّ وعشرون صورة للمدن، و<code>furnished</code> بـ12 صورة، و<code>G</code> للطابق الأرضي، وإيجار 99999، ومساحة 0.0379."
          },
          {
            en: "<strong>Missing</strong> &mdash; count, explain, decide: 19 rents, 27 areas, 36 conditions, 123 deposits, by three different mechanisms.",
            ar: "<strong>المفقود</strong> &mdash; عُدّ وفسِّر وقرّر: تسعة عشر إيجارًا وسبع وعشرون مساحة وستٌّ وثلاثون حالة ومئة وثلاثة وعشرون تأمينًا، بثلاث آليات مختلفة."
          },
          {
            en: "<strong>Outliers</strong> &mdash; a rule and a threshold: the 12 rents outside the IQR fence, and the daily rate of 25 that no rule catches.",
            ar: "<strong>القيم الشاذة</strong> &mdash; قاعدة وحدّ: الإيجارات الاثنا عشر خارج سياج الربيعات، وأجرة اليوم 25 التي لا تلتقطها قاعدة."
          },
          {
            en: "<strong>Encode and scale</strong> &mdash; 5 cities, 4 condition levels, 20 agencies; areas and rents onto one range.",
            ar: "<strong>الترميز وتوحيد المقاييس</strong> &mdash; خمس مدن، وأربعة مستويات حالة، وعشرون وكالة؛ والمساحات والإيجارات على مدى واحد."
          }
        ],
        answer: [0, 1, 2, 3, 4],
        hint: {
          en: "Work out what each stage learns from the data, then ask which other stage can still change it. Two of the five places follow from that alone.",
          ar: "استخرج ما تتعلّمه كل مرحلة من البيانات، ثم اسأل أي مرحلة أخرى تستطيع أن تغيّره بعد. ويُستنتج موضعان من الخمسة من ذلك وحده."
        },
        explain: {
          en: "Deduplication is first because every learned parameter is an average over rows, so the set of rows has to be final before anything is learned from it. Scaling is last because it learns a mean, a standard deviation or a minimum and a maximum, and every earlier stage changes all four. A value error is repaired before you look for outliers, because 99999 is not a rare rent &mdash; it is not a rent at all, and leaving it in makes the rule measure itself: <code>|z| &gt; 3</code> then flags one value out of 489, because the single typo inflates the very standard deviation it is compared against. And the holes are counted after the values are repaired, because before that <code>G</code> and <code>'n/a'</code> hide among the values rather than in the hole count.",
          ar: "حذف المكرّر أولًا لأن كل وسيط متعلَّم متوسطٌ على الصفوف، فيجب أن تُحسم مجموعة الصفوف قبل أن يُتعلَّم منها شيء. وتوحيد المقاييس آخرًا لأنه يتعلّم متوسطًا أو انحرافًا معياريًّا أو حدَّين، وكل مرحلة قبله تغيّر الأربعة. ويُصلح خطأ القيمة قبل البحث عن الشواذ، لأن 99999 ليس إيجارًا نادرًا &mdash; ليس إيجارًا أصلًا، وإبقاؤه يجعل القاعدة تقيس نفسها: فتعلّم <code>|z| &gt; 3</code> حينها قيمة واحدة من 489، لأن خطأ الإدخال الواحد ينفخ الانحراف المعياري نفسه الذي يُقاس به. وتُعَدّ الثقوب بعد إصلاح القيم، لأن <code>G</code> و<code>'n/a'</code> قبل ذلك يتواريان بين القيم لا في عدّ الثقوب."
        }
      },

      /* ---------------------------------------------------------- 07 */
      {
        id: "t2l1q07", type: "compare", level: "medium",
        topics: ["t2-canonical-order", "t2-step-list"],
        q: {
          en: "The same three decisions, in two orders. A prints quartiles of &minus;0.0565 and &minus;0.0367, a maximum of 21.9510 and <code>|z| &gt; 3: 1</code>; B prints quartiles of &minus;0.6283 and 0.4935, a maximum of 4.6067 and <code>|z| &gt; 3: 6</code>. Which statement is correct?",
          ar: "القرارات الثلاثة نفسها بترتيبين. يطبع أ ربيعين ‎&minus;0.0565 و‎&minus;0.0367 وقيمة عظمى 21.9510 و<code>|z| &gt; 3: 1</code>؛ ويطبع ب ربيعين ‎&minus;0.6283 و0.4935 وقيمة عظمى 4.6067 و<code>|z| &gt; 3: 6</code>. فأيّ العبارات صحيحة؟"
        },
        codeA: code(
          "df = pd.read_csv(\"listings_raw.csv\")",
          "",
          "rent = df[\"monthly_rent\"]                                     # 1. scale",
          "df[\"rent_z\"] = (rent - rent.mean()) / rent.std()",
          "df = df.drop_duplicates()                                     # 2. dedupe",
          "df[\"rent_z\"] = df[\"rent_z\"].fillna(df[\"rent_z\"].median())     # 3. impute",
          "",
          "print(df[\"rent_z\"].describe().round(4).to_string())",
          "print(\"rows:\", len(df), \"| |z| > 3:\", int((df[\"rent_z\"].abs() > 3).sum()))"
        ),
        codeB: code(
          "df = pd.read_csv(\"listings_raw.csv\")",
          "",
          "df = df.drop_duplicates()                                   # 1. structure",
          "df.loc[df[\"monthly_rent\"] > 5000, \"monthly_rent\"] = None    # 2. values",
          "med = df[\"monthly_rent\"].median()                           # 3. missing",
          "df[\"monthly_rent\"] = df[\"monthly_rent\"].fillna(med)",
          "rent = df[\"monthly_rent\"]                                   # 5. scale",
          "df[\"rent_z\"] = (rent - rent.mean()) / rent.std()",
          "",
          "print(df[\"rent_z\"].describe().round(4).to_string())",
          "print(\"rows:\", len(df), \"| median used:\", med, \"| |z| > 3:\", int((df[\"rent_z\"].abs() > 3).sum()))"
        ),
        options: [
          {
            en: "They are equivalent. Both end with 489 rows and a <code>rent_z</code> column with no missing values, so the order of the three steps is a matter of taste.",
            ar: "هما متكافئان. فكلاهما ينتهي إلى 489 صفًّا وعمود <code>rent_z</code> بلا قيم مفقودة، فترتيب الخطوات الثلاث مسألة ذوق."
          },
          {
            en: "A is better: it scales before anything is removed, so all 503 original rents are represented in the mean and the standard deviation that <code>rent_z</code> is built from.",
            ar: "أ أفضل: فهو يوحّد المقياس قبل حذف أي شيء، فتكون الإيجارات الخام الـ503 كلها ممثَّلة في المتوسط والانحراف المعياري الذي يُبنى عليه <code>rent_z</code>."
          },
          {
            en: "B is better: the mean and the standard deviation are fitted after the repeats are gone and the 99999 is voided, so <code>rent_z</code> is a usable feature and the outlier rule flags 6 rents instead of 1 typo. What B still leaves open: the stage numbers are comments, and a comment cannot be executed, counted or reviewed.",
            ar: "ب أفضل: يُضبط المتوسط والانحراف المعياري بعد زوال المكرّرات وإفراغ 99999، فيصير <code>rent_z</code> خاصية صالحة وتعلّم قاعدة الشواذ ستة إيجارات بدل خطأ إدخال واحد. وما يبقى مفتوحًا في ب: أرقام المراحل تعليقات، والتعليق لا يُنفَّذ ولا يُعَدّ ولا يُراجَع."
          },
          {
            en: "B is better because <code>.loc</code> is faster than the chained assignment A uses, and because <code>fillna</code> cannot run on a column that has already been scaled.",
            ar: "ب أفضل لأن <code>.loc</code> أسرع من الإسناد المتسلسل الذي يستعمله أ، ولأن <code>fillna</code> لا تعمل على عمود وُحِّد مقياسه أصلًا."
          }
        ],
        answer: 2,
        hint: {
          en: "Look at A's quartiles: 488 of its 489 scaled rents sit between &minus;0.09 and &minus;0.03. Ask what the mean and the standard deviation in A's second line were computed from.",
          ar: "انظر في ربيعي أ: ‏488 من إيجاراته الموحَّدة الـ489 بين ‎&minus;0.09 و‎&minus;0.03. واسأل من أي شيء حُسب المتوسط والانحراف المعياري في سطر أ الثاني."
        },
        explain: {
          en: "A learns its mean and standard deviation from a column that still contains 99999, so the scaling encodes one phone number and flattens the whole rental market into a band 0.06 wide; the final <code>std</code> of 0.9949 instead of 1.0 is the fingerprint of a scaler fitted to rows that were then deleted. Nothing crashes, which is why it is dangerous. The tempting wrong answer is the one that prefers B because <code>.loc</code> is faster and because <code>fillna</code> supposedly cannot run on an already-scaled column: its conclusion is right and both reasons are false &mdash; <code>fillna</code> runs perfectly well on a scaled column, as A proves, and that is exactly the danger. A wrong reason generalises badly: it would license scaling first whenever you remember to use <code>.loc</code>.",
          ar: "يتعلّم أ متوسطه وانحرافه المعياري من عمود ما زال فيه 99999، فيرمّز التوحيد رقم هاتف واحد ويسطّح سوق التأجير كلها في نطاق عرضه 0.06؛ و<code>std</code> النهائي 0.9949 لا 1.0 بصمةُ مُقايِس ضُبط على صفوف حُذفت بعده. ولا شيء ينهار، ولهذا هو خطر. والمغري الخاطئ هو الجواب الذي يفضّل ب لأن <code>.loc</code> أسرع ولأن <code>fillna</code> لا تعمل &mdash; بحسب زعمه &mdash; على عمود وُحِّد مقياسه أصلًا: استنتاجه صحيح وسبباه باطلان &mdash; فـ<code>fillna</code> تعمل تمامًا على عمود موحَّد كما يُثبت أ، وهذا هو الخطر بعينه. والسبب الخاطئ يعمّم تعميمًا سيئًا: فهو يُجيز توحيد المقياس أولًا كلما تذكّرتَ استعمال <code>.loc</code>."
        }
      },

      /* ---------------------------------------------------------- 08 */
      {
        id: "t2l1q08", type: "complete", level: "medium",
        topics: ["t2-step-list", "t2-pipeline-order"],
        q: {
          en: "The four named steps of Version 3 are already defined: <code>drop_exact_duplicates(d)</code>, <code>void_impossible_rent(d, limit)</code>, <code>fill_rent_with_median(d, value)</code> and <code>scale_rent(d)</code>. Complete the chain so that it prints the wanted line.",
          ar: "خطوات النسخة 3 الأربع المسمّاة معرَّفة أصلًا: <code>drop_exact_duplicates(d)</code> و<code>void_impossible_rent(d, limit)</code> و<code>fill_rent_with_median(d, value)</code> و<code>scale_rent(d)</code>. أكمل السلسلة لتطبع السطر المطلوب."
        },
        code: code(
          "raw = pd.read_csv(\"listings_raw.csv\")",
          "",
          "out = (raw.pipe(drop_exact_duplicates)          # stage 1: structure",
          "          ____",
          "          .pipe(scale_rent))                    # stage 5: encode and scale",
          "",
          "print(out.shape, out[\"monthly_rent\"].max(), int(out[\"monthly_rent\"].isna().sum()))",
          "# wanted:  (489, 14) 580.0 0"
        ),
        options: [
          {
            code: ".pipe(void_impossible_rent, limit=5000)\n          .pipe(fill_rent_with_median, value=200.0)"
          },
          {
            code: ".pipe(fill_rent_with_median, value=200.0)\n          .pipe(void_impossible_rent, limit=5000)"
          },
          {
            code: ".pipe(fill_rent_with_median, value=200.0)"
          },
          {
            code: ".pipe(void_impossible_rent, limit=5000)"
          }
        ],
        answer: 0,
        solution: {
          code: code(
            "out = (raw.pipe(drop_exact_duplicates)          # stage 1: structure",
            "          .pipe(void_impossible_rent, limit=5000)    # stage 2: values",
            "          .pipe(fill_rent_with_median, value=200.0)  # stage 3: missing",
            "          .pipe(scale_rent))                    # stage 5: encode and scale"
          ),
          out: "(489, 14) 580.0 0",
          en: "Values before missing: void the 99999 first, so the hole it leaves is filled by the same step that fills the other nineteen.",
          ar: "القيم قبل المفقود: أفرِغ 99999 أولًا ليُعبَّأ الثقب الذي تتركه بالخطوة نفسها التي تعبّئ التسعة عشر الأخرى."
        },
        hint: {
          en: "Three of the four completions run without an error. Check each one against all three printed numbers &mdash; the maximum and the count of blank rents are what separate them.",
          ar: "ثلاثة من الإكمالات الأربعة تعمل بلا خطأ. افحص كل واحد في مقابل الأرقام المطبوعة الثلاثة &mdash; فالقيمة العظمى وعدد الإيجارات الفارغة هما ما يفرّق بينها."
        },
        explain: {
          en: "The canonical order puts values (stage 2) before missing (stage 3), and the printed line is the proof. The completion that pipes <code>fill_rent_with_median</code> before <code>void_impossible_rent</code> reverses them: the fill runs first, then the void empties the 99999 again, so the output ends with <strong>1</strong> blank rent and a step that undid part of its predecessor. The completion that pipes the fill alone skips the value stage, so the maximum stays <strong>99999.0</strong> and <code>scale_rent</code> is fitted to a phone number. The completion that pipes the void alone skips the fill, leaving <strong>20</strong> blank rents &mdash; the original 19 plus the cell the void step just emptied. Only voiding before filling satisfies all three numbers at once, and all four run without raising, which is the whole reason the order has to be argued rather than tested by whether the code works.",
          ar: "يضع الترتيب القياسي القيم (المرحلة 2) قبل المفقود (المرحلة 3)، والسطر المطبوع هو الدليل. فالإكمال الذي يمرّر <code>fill_rent_with_median</code> قبل <code>void_impossible_rent</code> يعكسهما: تجري التعبئة أولًا ثم يُفرِغ الإفراغُ 99999 مرة أخرى، فينتهي المخرج بإيجار فارغ <strong>واحد</strong> وبخطوةٍ نقضت جزءًا مما فعلته التي قبلها. والإكمال الذي يمرّر التعبئة وحدها يتخطّى مرحلة القيم، فتبقى القيمة العظمى <strong>99999.0</strong> وتُضبط <code>scale_rent</code> على رقم هاتف. والإكمال الذي يمرّر الإفراغ وحده يتخطّى التعبئة، فيترك <strong>عشرين</strong> إيجارًا فارغًا &mdash; التسعة عشر الأصلية زائدَ الخلية التي أفرغتها خطوة الإفراغ. ولا يحقّق الأرقام الثلاثة معًا إلا الإفراغُ قبل التعبئة، وتعمل الأربعة كلها بلا رفع خطأ، وهذا كل السبب في أن الترتيب يُجادل فيه ولا يُفحص بسؤال «هل يعمل الكود»."
        }
      },

      /* ---------------------------------------------------------- 09 */
      {
        id: "t2l1q09", type: "match", level: "easy",
        topics: ["t2-fit-apply"],
        q: {
          en: "Match each step to what it fits &mdash; the numbers it learns from many rows before it can be applied to one.",
          ar: "وصّل كل خطوة بما تضبطه &mdash; أي الأرقام التي تتعلّمها من صفوف كثيرة قبل أن تستطيع تطبيقها على صف واحد."
        },
        leftHead: { en: "The step", ar: "الخطوة" },
        rightHead: { en: "What it fits (learns)", ar: "ما تضبطه (تتعلّمه)" },
        pairs: [
          {
            l: { en: "fill a blank rent with the median", ar: "تعبئة إيجار فارغ بالوسيط" },
            r: { en: "one number: 200.0", ar: "رقم واحد: 200.0" }
          },
          {
            l: { en: "fill a blank deposit per agency", ar: "تعبئة تأمين فارغ لكل وكالة" },
            r: { en: "a table of 20 medians, one per agency, plus a fallback", ar: "جدول عشرين وسيطًا، واحد لكل وكالة، مع بديل" }
          },
          {
            l: { en: "standardise an area", ar: "توحيد مقياس المساحة معياريًّا" },
            r: { en: "a mean and a standard deviation", ar: "متوسط وانحراف معياري" }
          },
          {
            l: { en: "min&ndash;max scale a rent", ar: "توحيد مقياس الإيجار بالحدَّين" },
            r: { en: "a minimum and a maximum", ar: "حدٌّ أدنى وحدٌّ أعلى" }
          },
          {
            l: { en: "one-hot encode <code>city</code>", ar: "ترميز <code>city</code> ترميزًا أحاديًّا" },
            r: { en: "the list of categories, in a fixed order", ar: "قائمة الفئات بترتيب ثابت" }
          },
          {
            l: { en: "drop the byte-for-byte duplicates", ar: "حذف المكرّرات الحرفية" },
            r: { en: "nothing at all &mdash; it is pure apply", ar: "لا شيء أصلًا &mdash; فهي تطبيق صِرف" }
          }
        ],
        hint: {
          en: "Ask of each step: to decide what to do with <em>this</em> row, does it have to read any other row? If yes, whatever it read is the fitted parameter.",
          ar: "اسأل عن كل خطوة: لتقرّر ما تفعله بـ<em>هذا</em> الصف، هل عليها أن تقرأ صفًّا آخر؟ فإن كان الجواب نعم فما قرأته هو الوسيط المضبوط."
        },
        explain: {
          en: "Fitting looks at many rows and produces a few values; applying looks at one row at a time and needs no other row. Dropping the byte-for-byte duplicates is the safe one, because it fits nothing at all: a step that learns nothing can be run on any file at any time and cannot be wrong about rows it has not seen &mdash; lower-casing a city name is the same kind. Every other pair is a liability you have to manage, and the two easiest to forget are the category list (it is a parameter exactly like a median, which is why <code>get_dummies</code> gives 52 columns on one file and 13 on the next) and the per-agency table, which needs a fallback because three agencies have no deposit at all in the training rows.",
          ar: "الضبط ينظر في صفوف كثيرة وينتج قيمًا قليلة، والتطبيق ينظر في صف واحد في كل مرة ولا يحتاج صفًّا آخر. وحذف المكرّرات الحرفية هو الآمن لأنه لا يضبط شيئًا أصلًا: فالخطوة التي لا تتعلّم شيئًا يمكن تشغيلها على أي ملف في أي وقت ولا يمكن أن تُخطئ في صفوف لم ترها &mdash; وتصغير حروف اسم مدينة من النوع نفسه. وكل زوج آخر مسؤولية عليك أن تديرها، وأسهل اثنين نسيانًا هما قائمة الفئات (فهي وسيطٌ تمامًا كالوسيط الحسابي، ولهذا تعطي <code>get_dummies</code> ‏52 عمودًا في ملف و13 في الذي يليه) وجدول كل وكالة، الذي يحتاج بديلًا لأن ثلاث وكالات لا تأمين لها أصلًا في صفوف التدريب."
        }
      },

      /* ---------------------------------------------------------- 10 */
      {
        id: "t2l1q10", type: "fill", level: "easy",
        topics: ["t2-train-test-split"],
        q: {
          en: "Fill in the two blanks so that the file is split into rows every parameter may be learned from and rows nothing may learn from.",
          ar: "املأ الفراغين ليُقسَم الملف إلى صفوف يُسمح بتعلُّم كل وسيط منها وصفوف لا يُسمح لشيء بالتعلُّم منها."
        },
        code: code(
          "raw   = pd.read_csv(\"listings_raw.csv\")             # 503 rows",
          "",
          "train = raw.____1____(frac=0.75, random_state=3)    # 75% to learn from",
          "test  = raw.____2____(train.index)                  # 25% nobody may look at",
          "",
          "print(len(train), len(test))                        # 377 126",
          "print(len(set(train.index) & set(test.index)))      # 0"
        ),
        blanks: [
          { accept: ["sample"] },
          { accept: ["drop"] }
        ],
        hint: {
          en: "One method draws a random fraction of the rows. The other removes rows by their index labels &mdash; which is what makes the last printed number 0.",
          ar: "أحد التابعَين يسحب جزءًا عشوائيًّا من الصفوف. والآخر يحذف صفوفًا بتسميات فهرسها &mdash; وهذا ما يجعل الرقم المطبوع الأخير صفرًا."
        },
        explain: {
          en: "<code>raw.sample(frac=0.75, random_state=3)</code> draws 377 of the 503 rows, and <code>random_state=3</code> fixes the shuffle so the result is reproducible; without a seed every run is a different split and no number can be repeated. <code>raw.drop(train.index)</code> then removes exactly those rows by label, which is what guarantees the two halves share no row. A second <code>sample</code> call is the tempting way to build <code>test</code>, and it would draw rows the training set already contains, so the &ldquo;held-out&rdquo; set would be part training data. Note what this split still does not fix: it was taken on the raw 503 rows, so the fourteen repeats put eight <code>listing_id</code> values in both halves &mdash; in a serious pipeline the structure stage runs first, or you split on <code>listing_id</code>.",
          ar: "تسحب <code>raw.sample(frac=0.75, random_state=3)</code> ‏377 من الصفوف الـ503، ويثبّت <code>random_state=3</code> الخلط فتكون النتيجة قابلة للتكرار؛ وبلا بذرة يكون كل تشغيل تقسيمًا آخر ولا يمكن تكرار أي رقم. ثم تحذف <code>raw.drop(train.index)</code> تلك الصفوف بالتسمية بالضبط، وهذا ما يضمن ألّا يشترك النصفان في صف. ونداء <code>sample</code> ثانٍ هو الطريق المغري لبناء <code>test</code>، وكان سيسحب صفوفًا تحتويها مجموعة التدريب أصلًا، فتكون المجموعة «المحجوزة» بعضَ بيانات التدريب. ولاحظ ما لا يُصلحه هذا التقسيم بعد: أُخذ على الصفوف الخام الـ503، فتضع التكرارات الأربعة عشر ثماني قيم <code>listing_id</code> في النصفين &mdash; وفي خط تحويل جادّ تجري مرحلة البنية أولًا، أو يُقسَّم على <code>listing_id</code>."
        }
      },

      /* ---------------------------------------------------------- 11 */
      {
        id: "t2l1q11", type: "mcq", level: "medium",
        topics: ["t2-leakage", "t2-train-test-split"],
        q: {
          en: "After the <code>random_state=3</code> split you write <code>raw[\"monthly_rent\"].median()</code> and get 200.0. The honest parameter, <code>train[\"monthly_rent\"].median()</code>, is also 200.0. What follows?",
          ar: "بعد التقسيم بـ<code>random_state=3</code> تكتب <code>raw[\"monthly_rent\"].median()</code> فتحصل على 200.0. والوسيط الأمين <code>train[\"monthly_rent\"].median()</code> هو 200.0 أيضًا. فما النتيجة؟"
        },
        options: [
          {
            en: "Nothing is wrong with the first line: it produced the same parameter, so no information crossed the split.",
            ar: "لا عيب في السطر الأول: فقد أنتج الوسيط نفسه، فلم تعبر معلومة التقسيم."
          },
          {
            en: "The first line is safe for a median but not for a mean, so leakage is a property of the statistic you chose rather than of which rows it read.",
            ar: "السطر الأول آمن للوسيط لا للمتوسط، فالتسرّب خاصية في الإحصاء الذي اخترته لا في الصفوف التي قرأها."
          },
          {
            en: "Same number, two different claims: 121 of the 484 rents behind the first one are held-out rows, so the leak is real and has no symptom &mdash; which is why it must be prevented by construction rather than detected by inspection.",
            ar: "الرقم نفسه وادّعاءان مختلفان: ‏121 من الإيجارات الـ484 وراء الأول صفوف محجوزة، فالتسرّب حقيقي ولا عَرَض له &mdash; ولهذا يجب أن يُمنَع بالبناء لا أن يُكتشف بالتفتيش."
          },
          {
            en: "The held-out rows should have been dropped before the split, so that the two medians could not agree in the first place.",
            ar: "كان ينبغي حذف الصفوف المحجوزة قبل التقسيم حتى لا يتطابق الوسيطان من أصله."
          }
        ],
        answer: 2,
        hint: {
          en: "Count the evidence behind the first parameter rather than reading its value: how many of the 484 rents it averaged are rows you promised not to look at?",
          ar: "عُدّ الدليل وراء الوسيط الأول بدل أن تقرأ قيمته: كم من الإيجارات الـ484 التي توسّطها صفوف وعدتَ ألّا تنظر فيها؟"
        },
        explain: {
          en: "Leakage is information reaching a step from rows it was supposed to know nothing about, and it is defined by which rows were read, not by what came out. Here <code>121 / 484 = 25.0%</code> of the evidence is held out, and among the nineteen listings asking exactly 200 &mdash; the plateau that fixes the median &mdash; six are held-out rows, so rows you promised not to look at are part of why the parameter is 200 and not 195. The answer that finds nothing wrong because the same parameter came out is the tempting one, because &ldquo;the number came out the same&rdquo; feels like proof of innocence; it is the reason leakage is dangerous, since a leaky pipeline and an honest one are then indistinguishable from the parameter alone. The answer that makes leakage a property of the statistic &mdash; safe for a median, unsafe for a mean &mdash; inverts cause and symptom: the mean (416.32 against 211.90) makes the leak <em>visible</em>, it does not make it worse.",
          ar: "التسرّب هو وصول معلومات إلى خطوة من صفوف كان مفروضًا ألّا تعرف عنها شيئًا، وتعريفه بالصفوف التي قُرئت لا بما خرج. وهنا <code>121 / 484 = 25.0%</code> من الدليل محجوز، ومن الإعلانات التسعة عشر التي تطلب 200 بالضبط &mdash; أي الهضبة التي تثبّت الوسيط &mdash; ستة صفوف محجوزة، فالصفوف التي وعدتَ ألّا تنظر فيها جزء من سبب أن الوسيط 200 لا 195. والمغري هو الجواب الذي لا يرى عيبًا لأن الوسيط نفسه خرج، إذ تبدو «خرج الرقم نفسه» برهان براءة؛ وهي سبب خطورة التسرّب، إذ لا يتمايز الخط المتسرِّب والأمين حينها بالنظر في الوسيط وحده. والجواب الذي يجعل التسرّب خاصية في الإحصاء &mdash; آمنًا للوسيط وغير آمن للمتوسط &mdash; يقلب السبب والعَرَض: فالمتوسط (‏416.32 مقابل 211.90) يجعل التسرّب <em>مرئيًّا</em> ولا يجعله أسوأ."
        }
      },

      /* ---------------------------------------------------------- 12 */
      {
        id: "t2l1q12", type: "trace", level: "hard",
        topics: ["t2-leak-parameters", "t2-leakage"],
        q: {
          en: "After the last line has run, what are the values of the four variables? The split is the lesson's: 377 training rows, 126 held out, and listing 5062 &mdash; whose rent is a phone number &mdash; is one of the held-out rows.",
          ar: "بعد تنفيذ السطر الأخير، ما قيم المتغيرات الأربعة؟ والتقسيم هو تقسيم الدرس: ‏377 صفًّا للتدريب و126 محجوزة، والإعلان 5062 &mdash; الذي إيجاره رقم هاتف &mdash; أحد الصفوف المحجوزة."
        },
        code: code(
          "raw   = pd.read_csv(\"listings_raw.csv\")",
          "train = raw.sample(frac=0.75, random_state=3)",
          "",
          "leaky_mean  = round(raw[\"monthly_rent\"].mean(), 4)",
          "honest_mean = round(train[\"monthly_rent\"].mean(), 4)",
          "leaky_max   = raw[\"monthly_rent\"].max()",
          "honest_max  = train[\"monthly_rent\"].max()"
        ),
        blanks: [
          { accept: ["416.3202"], label: { en: "leaky_mean", ar: "leaky_mean" } },
          { accept: ["211.9008"], label: { en: "honest_mean", ar: "honest_mean" } },
          { accept: ["99999.0", "99999"], label: { en: "leaky_max", ar: "leaky_max" } },
          { accept: ["580.0", "580"], label: { en: "honest_max", ar: "honest_max" } }
        ],
        hint: {
          en: "The median hid this leak completely. Two of these four parameters cannot hide a single extreme value &mdash; work out what one row of 99999 does to a sum over 484 rents, and to a maximum.",
          ar: "خفى الوسيطُ هذا التسرّب تمامًا. واثنان من هذه الوسائط الأربعة لا يستطيعان إخفاء قيمة متطرفة واحدة &mdash; فاستخرج ما يفعله صفٌّ واحد قيمته 99999 بمجموع 484 إيجارًا، وبالقيمة العظمى."
        },
        explain: {
          en: "The leaky mean is 416.3202 and the honest one 211.9008 &mdash; a difference of 204.42, of which 206.18 is the contribution of a single held-out row. Use the leaky mean to fill the 19 blank rents and you have written a held-out phone number into nineteen training rows. The maximum is worse, because min&ndash;max scaling divides by it: fitted leakily, every real rent in the file lands between 0.0 and 0.0056 and the rest of the <code>[0, 1]</code> range is reserved for one typo; fitted honestly on 25 to 580, the real rents spread over 0.08 to 0.81 and the typo comes out at 180.13 &mdash; far outside <code>[0, 1]</code>, which is the alarm you want, not a bug. The tempting answers are 200.0 for both means, because that is what the median did, and 99999 for both maxima, because the typo feels like part of the file.",
          ar: "المتوسط المتسرِّب 416.3202 والأمين 211.9008 &mdash; أي فرق 204.42، منه 206.18 مساهمةُ صفٍّ محجوز واحد. واستعمل المتوسط المتسرِّب لتعبئة الإيجارات الفارغة التسعة عشر فتكون قد كتبتَ رقم هاتف محجوزًا في تسعة عشر صفًّا من صفوف التدريب. والقيمة العظمى أسوأ، لأن توحيد المقياس بالحدَّين يقسم عليها: فبالضبط المتسرِّب يقع كل إيجار حقيقي في الملف بين 0.0 و0.0056 ويُحجز باقي المجال <code>[0, 1]</code> لخطأ إدخال واحد؛ وبالضبط الأمين من 25 إلى 580 تنتشر الإيجارات الحقيقية من 0.08 إلى 0.81 ويخرج خطأ الإدخال بقيمة 180.13 &mdash; بعيدًا خارج <code>[0, 1]</code>، وهذا هو الجرس الذي تريده لا عطبًا. والجوابان المغريان هما 200.0 للمتوسطين، لأن هذا ما فعله الوسيط، و99999 للقيمتين العظميين، لأن خطأ الإدخال يُشعرك أنه جزء من الملف."
        }
      },

      /* ---------------------------------------------------------- 13 */
      {
        id: "t2l1q13", type: "compare", level: "medium",
        topics: ["t2-fitted-dict", "t2-fit-apply", "t2-unseen-category"],
        q: {
          en: "Both programs fit on the training rows only, so neither leaks. B prints <code>26 cities</code> and reports two rows whose city it has never seen (<code>Beit Lahia</code>). Which statement is correct?",
          ar: "يضبط البرنامجان على صفوف التدريب وحدها، فلا يتسرّب أيٌّ منهما. ويطبع ب <code>26 cities</code> ويُبلّغ عن صفَّين مدينتهما لم يرها قط (<code>Beit Lahia</code>). فأيّ العبارات صحيحة؟"
        },
        codeA: code(
          "raw   = pd.read_csv(\"listings_raw.csv\")",
          "train = raw.sample(frac=0.75, random_state=3)",
          "test  = raw.drop(train.index)",
          "",
          "rent_median = train[\"monthly_rent\"].median()      # FIT: training rows only",
          "dep_median  = train[\"deposit\"].median()",
          "",
          "train = train.assign(monthly_rent=train[\"monthly_rent\"].fillna(rent_median),",
          "                     deposit=train[\"deposit\"].fillna(dep_median))",
          "test  = test.assign(monthly_rent=test[\"monthly_rent\"].fillna(rent_median),",
          "                    deposit=test[\"deposit\"].fillna(dep_median))"
        ),
        codeB: code(
          "def fit(df):",
          "    return {\"rent_median\":    float(df[\"monthly_rent\"].median()),",
          "            \"deposit_median\": float(df[\"deposit\"].median()),",
          "            \"cities\":         sorted(df[\"city\"].dropna().unique())}",
          "",
          "def apply_fitted(df, f):",
          "    return df.assign(monthly_rent=df[\"monthly_rent\"].fillna(f[\"rent_median\"]),",
          "                     deposit=df[\"deposit\"].fillna(f[\"deposit_median\"]),",
          "                     city_known=df[\"city\"].isin(f[\"cities\"]))",
          "",
          "train  = pd.read_csv(\"listings_raw.csv\").sample(frac=0.75, random_state=3)",
          "fitted = fit(train)                               # FIT once, on the training rows",
          "scored = apply_fitted(pd.read_csv(\"listings_new.csv\"), fitted)   # APPLY, no refit"
        ),
        options: [
          {
            en: "They do the same work; B only moves two local variables into a dictionary, so the choice between them is style.",
            ar: "يؤدّيان العمل نفسه؛ وب ينقل متغيّرَين محليَّين إلى قاموس فقط، فالاختيار بينهما ذوق."
          },
          {
            en: "A is better: keeping the two medians beside the rows they came from is clearer than a dictionary, and a dictionary cannot be asserted on by a test.",
            ar: "أ أفضل: فإبقاء الوسيطين بجانب الصفوف التي جاءا منها أوضح من قاموس، والقاموس لا يستطيع اختبار أن يتأكّد منه."
          },
          {
            en: "B is better because <code>fit</code> is called again for every file it is given, so each month is imputed with the median that describes that month.",
            ar: "ب أفضل لأن <code>fit</code> تُنادى مرة أخرى لكل ملف يُعطى لها، فيُعوَّض كل شهر بالوسيط الذي يصفه."
          },
          {
            en: "B is better: the parameters are one named dictionary and <code>apply_fitted</code> can read nothing but <code>f</code>, so June's 85 rows are imputed with March's numbers and the two unseen cities are named instead of silently encoded. What B still leaves open: the value stage has not run, so <code>cities</code> holds 26 spellings rather than 5 categories.",
            ar: "ب أفضل: فالوسائط قاموس واحد بأسماء، و<code>apply_fitted</code> لا تستطيع أن تقرأ شيئًا غير <code>f</code>، فتُعوَّض صفوف حزيران الـ85 بأرقام آذار وتُسمّى المدينتان غير المرئيتين بدل ترميزهما بصمت. وما يبقى مفتوحًا في ب: مرحلة القيم لم تجرِ، فيحمل <code>cities</code> ستًّا وعشرين صورة إملائية لا خمس فئات."
          }
        ],
        answer: 3,
        hint: {
          en: "Ask what each program can do with next month's file, and what <code>apply_fitted</code> is able to look at. Then ask whether 26 is a plausible number of cities in this governorate.",
          ar: "اسأل ماذا يستطيع كل برنامج أن يفعل بملف الشهر القادم، وما الذي تستطيع <code>apply_fitted</code> أن تنظر فيه. ثم اسأل: هل 26 عدد مدن معقول في هذه المحافظة؟"
        },
        explain: {
          en: "A is already honest, so this is not a leakage question: it is about whether the parameters survive the call. In A they live in two loose local variables &mdash; add a column and you add a variable, and applying the same transform next month means remembering all of them by hand. In B they are one dictionary you can print, save beside the result and hand to a function that has no access to anything else, so a refit is impossible by construction. The tempting wrong answer is the one that praises B for calling <code>fit</code> again on every file it is given, so that each month is imputed with its own median, because refitting <em>sounds</em> like keeping the parameters up to date; it is the bug: June's own median is 210.0, so refitting would shift every June prediction by ten shekels for a reason no flat caused. What B still leaves open is real: 26 &ldquo;cities&rdquo; are spellings of five, which is why <code>Beit Lahia</code> is reported as unseen while <code>Khan Yunis</code> would not be.",
          ar: "أ أمين أصلًا، فهذا ليس سؤال تسرّب: بل سؤال هل تبقى الوسائط بعد النداء. فهي في أ في متغيّرَين محليَّين سائبَين &mdash; أضِف عمودًا فتضيف متغيّرًا، وتطبيق التحويل نفسه الشهر القادم يعني تذكّرها كلها يدويًّا. وهي في ب قاموس واحد تستطيع أن تطبعه وتحفظه بجانب النتيجة وتسلّمه إلى دالة لا تصل إلى شيء غيره، فتصير إعادة الضبط مستحيلة بالبناء. والمغري الخاطئ هو الجواب الذي يمدح ب لأنها تنادي <code>fit</code> مرة أخرى على كل ملف يُعطى لها فيُعوَّض كل شهر بوسيطه، لأن إعادة الضبط <em>تبدو</em> كتحديث للوسائط؛ وهي العطب: فوسيط حزيران نفسه 210.0، فكانت إعادة الضبط ستُزيح كل تنبؤ في حزيران بعشرة شواكل لسبب لم تسبّبه أي شقة. وما يبقى مفتوحًا في ب حقيقي: فالمدن الستّ والعشرون تهجئاتٌ لخمس، ولهذا تُبلَّغ <code>Beit Lahia</code> غير مرئية ولا تُبلَّغ <code>Khan Yunis</code>."
        }
      },

      /* ---------------------------------------------------------- 14 */
      {
        id: "t2l1q14", type: "error", level: "hard",
        topics: ["t2-inplace", "t2-raw-immutable"],
        q: {
          en: "<code>clean</code> was supposed to hand back a cleaned table and leave the caller's alone. Instead <code>raw</code> is the cleaned table and <code>out is raw</code> is <code>True</code>. Click every line that writes into the caller's table.",
          ar: "كان على <code>clean</code> أن تسلّم جدولًا منظَّفًا وتترك جدول المنادي وحده. وبدل ذلك صارت <code>raw</code> هي الجدول المنظَّف و<code>out is raw</code> تساوي <code>True</code>. انقر كل سطر يكتب في جدول المنادي."
        },
        code: code(
          "def clean(df):",
          "    df.drop_duplicates(inplace=True)",
          "    df[\"monthly_rent\"] = df[\"monthly_rent\"].fillna(df[\"monthly_rent\"].median())",
          "    return df",
          "raw = pd.read_csv(\"listings_raw.csv\")",
          "print(\"raw before:\", len(raw), int(raw[\"monthly_rent\"].isna().sum()))   # 503 19",
          "out = clean(raw)",
          "print(\"raw after :\", len(raw), int(raw[\"monthly_rent\"].isna().sum()))   # 489 0",
          "print(\"out is raw:\", out is raw)                                      # True"
        ),
        answer: [2, 3],
        solution: {
          code: code(
            "def clean(df):",
            "    out = df.copy()                                    # the caller's frame is now safe",
            "    out = out.drop_duplicates()",
            "    out[\"monthly_rent\"] = out[\"monthly_rent\"].fillna(out[\"monthly_rent\"].median())",
            "    return out"
          ),
          out: "raw : 503 rows, 19 blank rents\nout : 489 rows, 0 blank rents",
          en: "One line, <code>out = df.copy()</code>, and <code>inplace=True</code> gone: the function is now safe to call twice and <code>raw</code> is still the evidence.",
          ar: "سطر واحد هو <code>out = df.copy()</code> وزوال <code>inplace=True</code>: فتصير الدالة آمنة للنداء مرتين وتبقى <code>raw</code> دليلًا."
        },
        hint: {
          en: "Assignment in Python never copies a DataFrame, so <code>df</code> inside the function is not a copy of anything. Which lines of the body put something into it?",
          ar: "الإسناد في بايثون لا ينسخ جدولًا قط، فـ<code>df</code> داخل الدالة ليست نسخة من شيء. فأيّ أسطر الجسم تضع فيها شيئًا؟"
        },
        explain: {
          en: "Both lines of the body write into the caller's frame. Line&nbsp;2's <code>inplace=True</code> drops the fourteen repeats inside <code>raw</code> itself, and line&nbsp;3 assigns a column into that same frame, so after the call the original is gone from the session: to compare two orders you must re-read the file, and if you forget you will compare the cleaned table with itself. <code>inplace=True</code> bought nothing in exchange &mdash; pandas builds the new data anyway and then swaps it in, so peak memory is the same, and the method returns <code>None</code>, so it cannot appear in a chain. Line&nbsp;4 is the tempting click: <code>return df</code> is what creates the comfortable illusion of two tables where there is one, but returning a frame writes nothing. In a notebook this is the classic hidden-state bug: run the cell twice and the second run deduplicates an already-deduplicated table and imputes with a different median.",
          ar: "يكتب سطرا الجسم كلاهما في جدول المنادي. فـ<code>inplace=True</code> في السطر 2 تحذف التكرارات الأربعة عشر داخل <code>raw</code> نفسها، ويُسند السطر 3 عمودًا في الجدول نفسه، فيذهب الأصل من الجلسة بعد النداء: فلتقارن ترتيبين عليك أن تعيد قراءة الملف، فإن نسيتَ قارنتَ الجدول المنظَّف بنفسه. ولم يشترِ <code>inplace=True</code> شيئًا في المقابل &mdash; فـpandas تبني البيانات الجديدة على أي حال ثم تبدّلها في الداخل، فتكون الذاكرة القصوى واحدة، والتابع يعيد <code>None</code> فلا يستطيع أن يظهر في سلسلة. والسطر 4 هو النقرة المغرية: فـ<code>return df</code> هي ما يخلق الوهم المريح بجدولين حيث لا يوجد إلا واحد، لكن إعادة جدول لا تكتب شيئًا. وفي الدفتر يكون هذا عطب الحالة الخفية الكلاسيكي: شغّل الخلية مرتين فيحذف التشغيل الثاني المكرّر من جدول مُنزوع المكرّر أصلًا ويعوّض بوسيط آخر."
        }
      },

      /* ---------------------------------------------------------- 15 */
      {
        id: "t2l1q15", type: "error", level: "medium",
        topics: ["t2-view-copy", "t2-raw-immutable"],
        q: {
          en: "The program should fill the blank rents of the Gaza listings with the Gaza median, leaving 5 blank rents in the file. The first line it prints is right, the second is wrong, and nothing stops the run. Click the offending line.",
          ar: "يُفترض أن يعبّئ البرنامج الإيجارات الفارغة لإعلانات غزة بوسيط غزة، فتبقى خمسة إيجارات فارغة في الملف. وسطره المطبوع الأول صحيح والثاني خاطئ، ولا شيء يوقف التشغيل. انقر السطر المخطئ."
        },
        code: code(
          "raw = pd.read_csv(\"listings_raw.csv\")      # 19 blank rents in all, 14 of them in Gaza",
          "gaza = raw[raw[\"governorate\"] == \"Gaza\"]",
          "gaza[\"monthly_rent\"] = gaza[\"monthly_rent\"].fillna(gaza[\"monthly_rent\"].median())",
          "print(len(gaza), \"rows,\", int(gaza[\"monthly_rent\"].isna().sum()), \"blank rents\")",
          "print(int(raw[\"monthly_rent\"].isna().sum()), \"blank rents left in raw\")"
        ),
        answer: 3,
        solution: {
          code: code(
            "work = raw.copy()                                   # never write into the evidence",
            "mask = work[\"governorate\"] == \"Gaza\"",
            "gaza_median = work.loc[mask, \"monthly_rent\"].median()        # 252.5",
            "work.loc[mask, \"monthly_rent\"] = work.loc[mask, \"monthly_rent\"].fillna(gaza_median)",
            "print(int(work[\"monthly_rent\"].isna().sum()))       # 5",
            "print(int(raw[\"monthly_rent\"].isna().sum()))        # 19, untouched"
          ),
          out: "5\n19",
          en: "Copy once, then one <code>.loc</code> call naming rows and column together &mdash; and <code>raw</code> is still the evidence.",
          ar: "انسخ مرة واحدة، ثم نداء <code>.loc</code> واحد يسمّي الصفوف والعمود معًا &mdash; وتبقى <code>raw</code> دليلًا."
        },
        hint: {
          en: "Count the operations on the left-hand side of the assignment, and ask which of them returns something that is thrown away on the next line.",
          ar: "عُدّ العمليات في الطرف الأيسر من الإسناد، واسأل أيّها يعيد شيئًا يُرمى في السطر التالي."
        },
        explain: {
          en: "Line&nbsp;3 is a chained assignment: <code>raw[mask]</code> has already produced a separate object, and writing a column into it reaches that object only. The repair really happens &mdash; the slice prints <code>170 rows, 0 blank rents</code> &mdash; and it exists nowhere else, so <code>raw</code> still reports 19. The only notice you get is a <code>SettingWithCopyWarning</code> on the error stream, whose wording is &ldquo;a value is trying to be set&rdquo;, because pandas itself does not know whether the selection was a view or a copy: that depends on the dtypes, on whether the selection is contiguous in memory, and on the pandas version, and there is no supported way to ask. Line&nbsp;2 is the tempting click and it is innocent: selecting a slice is an ordinary, legal operation. The fix is a copy plus one <code>.loc[rows, column] = value</code>, which is a single unambiguous indexing operation.",
          ar: "السطر 3 إسنادٌ متسلسل: فـ<code>raw[mask]</code> أنتجت كائنًا منفصلًا أصلًا، وكتابةُ عمود فيه لا تصل إلا إلى ذلك الكائن. والإصلاح يحدث فعلًا &mdash; فالقطعة تطبع <code>170 rows, 0 blank rents</code> &mdash; ولا يوجد في مكان آخر، فتبقى <code>raw</code> تُبلّغ عن 19. والإشعار الوحيد الذي تحصل عليه <code>SettingWithCopyWarning</code> على مجرى الأخطاء، وصيغته «تحاول قيمةٌ أن تُضبَط»، لأن pandas نفسها لا تعرف هل كان الانتقاء إطلالة أم نسخة: فذلك يتوقف على الأنواع، وعلى كون الانتقاء متراصًّا في الذاكرة، وعلى إصدار pandas، ولا سبيل مدعومًا للسؤال. والسطر 2 هو النقرة المغرية وهو بريء: فانتقاء قطعة عملية عادية مشروعة. والعلاج نسخةٌ مع نداء <code>.loc[الصفوف, العمود] = قيمة</code> واحد، وهو عملية فهرسة واحدة بلا لبس."
        }
      },

      /* ---------------------------------------------------------- 16 */
      {
        id: "t2l1q16", type: "complete", level: "medium",
        topics: ["t2-chaining", "t2-raw-immutable"],
        q: {
          en: "Complete the chain so that it prints the wanted line and <code>raw</code> keeps all 19 of its blank rents and its maximum of 99999.0.",
          ar: "أكمل السلسلة لتطبع السطر المطلوب وتبقى <code>raw</code> محتفظةً بإيجاراتها الفارغة التسعة عشر كلها وبقيمتها العظمى 99999.0."
        },
        code: code(
          "raw = pd.read_csv(\"listings_raw.csv\")",
          "RENT_MEDIAN = 200.0                       # fitted elsewhere, on the training rows",
          "",
          "out = (raw",
          "       .drop_duplicates()",
          "       .assign(monthly_rent=lambda d: d[\"monthly_rent\"].mask(d[\"monthly_rent\"] > 5000))",
          "       .assign(monthly_rent=____)",
          "       .assign(rent_per_m2=lambda d: d[\"monthly_rent\"] / d[\"area_m2\"]))",
          "",
          "print(out.shape, int(out[\"monthly_rent\"].isna().sum()), out[\"monthly_rent\"].max())",
          "# wanted:  (489, 14) 0 580.0"
        ),
        options: [
          { code: "raw[\"monthly_rent\"].fillna(RENT_MEDIAN)" },
          { code: "lambda d: d[\"monthly_rent\"].fillna(RENT_MEDIAN)" },
          { code: "lambda d: d[\"monthly_rent\"].fillna(d[\"monthly_rent\"].mean())" },
          { code: "lambda d: d[\"monthly_rent\"].fillna(RENT_MEDIAN, inplace=True)" }
        ],
        answer: 1,
        solution: {
          code: ".assign(monthly_rent=lambda d: d[\"monthly_rent\"].fillna(RENT_MEDIAN))",
          out: "(489, 14) 0 580.0",
          en: "A <code>lambda</code> inside <code>assign</code> receives the frame <em>as it is at that point in the chain</em>, so it sees the masked column, not the original.",
          ar: "تتسلّم <code>lambda</code> داخل <code>assign</code> الجدول <em>كما هو في تلك النقطة من السلسلة</em>، فترى العمود المقنَّع لا الأصلي."
        },
        hint: {
          en: "The <code>assign</code> above has already returned a new frame. Which of the four expressions looks at that new frame, and which look somewhere else?",
          ar: "أعادت <code>assign</code> أعلاه جدولًا جديدًا أصلًا. فأيّ التعبيرات الأربعة ينظر في ذلك الجدول الجديد، وأيّها ينظر في مكان آخر؟"
        },
        explain: {
          en: "The <code>lambda</code> is what makes a long chain possible: it is handed the frame produced by the step before it, so <code>d[\"monthly_rent\"]</code> is the <em>masked</em> column and the fill lands in 20 holes &mdash; the 19 blanks plus the cell the mask just emptied. The completion that reaches back to <code>raw[\"monthly_rent\"]</code> is the tempting one, and it runs: it reads <code>raw</code>'s own column, which pandas aligns by index, so the 99999 comes straight back and the printed maximum is 99999.0 &mdash; a step that silently undoes its predecessor. The completion that fills with <code>d[\"monthly_rent\"].mean()</code> fits a parameter inside the chain instead of being given one: it fills with 210.8529, the mean of the frame at that point, so the value changes whenever an earlier step changes and the month-to-month comparison is gone. The completion that adds <code>inplace=True</code> is the <code>inplace</code> trap: <code>fillna(..., inplace=True)</code> returns <code>None</code>, so <code>assign</code> writes <code>None</code> into every row and the column becomes 489 missing values, with only a <code>FutureWarning</code> to say so.",
          ar: "‏<code>lambda</code> هي ما يجعل السلسلة الطويلة ممكنة: فهي تتسلّم الجدول الذي أنتجته الخطوة قبلها، فيكون <code>d[\"monthly_rent\"]</code> هو العمود <em>المقنَّع</em> وتهبط التعبئة في عشرين ثقبًا &mdash; الفراغات التسعة عشر زائدَ الخلية التي أفرغها القناع. والمغري هو الإكمال الذي يرجع إلى <code>raw[\"monthly_rent\"]</code>، وهو يعمل: فهو يقرأ عمود <code>raw</code> نفسه، وتحاذيه pandas بالفهرس، فترجع 99999 مباشرة وتكون القيمة العظمى المطبوعة 99999.0 &mdash; أي خطوة تنقض التي قبلها بصمت. والإكمال الذي يعبّئ بـ<code>d[\"monthly_rent\"].mean()</code> يضبط وسيطًا داخل السلسلة بدل أن يُعطى واحدًا: فيعبّئ بـ210.8529، وهو متوسط الجدول في تلك النقطة، فتتغير القيمة كلما تغيّرت خطوة سابقة وتذهب المقارنة بين الشهرين. والإكمال الذي يضيف <code>inplace=True</code> هو فخّ <code>inplace</code>: فـ<code>fillna(..., inplace=True)</code> تعيد <code>None</code>، فتكتب <code>assign</code> القيمة <code>None</code> في كل صف ويصير العمود 489 قيمة مفقودة، ولا يقول ذلك إلا <code>FutureWarning</code>."
        }
      },

      /* ---------------------------------------------------------- 17 */
      {
        id: "t2l1q17", type: "multi", level: "medium",
        topics: ["t2-step-report"],
        q: {
          en: "Each of these two steps prints what it did, which is better than silence and is not a report. Which of the statements are reasons the lesson gives? (Choose all that apply.)",
          ar: "تطبع كلٌّ من هاتين الخطوتين ما فعلته، وهذا أفضل من الصمت وليس تقريرًا. فأيّ العبارات أسبابٌ يذكرها الدرس؟ (اختر كل ما ينطبق.)"
        },
        code: code(
          "def drop_exact_duplicates(d):",
          "    out = d.drop_duplicates()",
          "    print(\"dropped\", len(d) - len(out), \"duplicate rows\")",
          "    return out",
          "",
          "def fill_rent(d, value):",
          "    print(\"filled\", int(d[\"monthly_rent\"].isna().sum()), \"blank rents with\", value)",
          "    return d.assign(monthly_rent=d[\"monthly_rent\"].fillna(value))"
        ),
        options: [
          {
            en: "The numbers go to the screen, so nothing can test them, compare them with last month's or store them beside the result.",
            ar: "تذهب الأرقام إلى الشاشة، فلا يستطيع شيء أن يختبرها ولا أن يقارنها بأرقام الشهر الماضي ولا أن يحفظها بجانب النتيجة."
          },
          {
            en: "They are prose, so a count can only be read by a human.",
            ar: "وهي نثرٌ، فلا يقرأ العدّ إلا إنسان."
          },
          {
            en: "<code>print</code> writes to the error stream, so a script redirected to a log file loses the counts.",
            ar: "تكتب <code>print</code> على مجرى الأخطاء، فيفقد العدَّ سكربتٌ موجَّه إلى ملف سجل."
          },
          {
            en: "The step now does two jobs, which makes it untestable in a suite that captures output.",
            ar: "صارت الخطوة تؤدّي وظيفتين، فلا يمكن اختبارها في مجموعة اختبارات تحتجز المخرج."
          },
          {
            en: "Inside a loop over 40 files the two steps produce 120 lines nobody reads.",
            ar: "وداخل حلقة على أربعين ملفًّا تُنتج الخطوتان مئة وعشرين سطرًا لا يقرأها أحد."
          },
          {
            en: "<code>print</code> is slow enough on 503 rows to make the pipeline measurably slower, so the counts should be returned instead.",
            ar: "و<code>print</code> بطيئة على 503 صفوف بما يكفي لإبطاء الخط إبطاءً ملحوظًا، فينبغي إعادة العدّ بدلًا منها."
          }
        ],
        answer: [0, 1, 3, 4],
        hint: {
          en: "Four faults, each biting in a different situation: a test suite, a monitoring comparison, a machine reader, a loop. Two of the six options describe something else entirely.",
          ar: "أربعة عيوب يعضّ كلٌّ منها في وضع مختلف: مجموعة اختبارات، ومقارنة مراقبة، وقارئ آليّ، وحلقة. وخياران من الستة يصفان شيئًا آخر تمامًا."
        },
        explain: {
          en: "The fix is to make the report a return value: each step gives back <code>(frame, log_row)</code>, and a list of log rows is a DataFrame you can assert on, save beside the output and diff against last month's. The statement that puts <code>print</code> on the error stream is the tempting wrong one, because the lesson really does have a message that goes to <code>stderr</code> and gets lost &mdash; but that is <code>SettingWithCopyWarning</code>, not <code>print</code>, which writes to standard output; two different problems with a similar-sounding symptom. The statement that calls <code>print</code> slow enough to matter invents a performance argument the lesson never makes: printing two lines costs nothing, and speed is not why a step should report rather than print.",
          ar: "العلاج أن يُصبح التقرير قيمةً معادة: فتعيد كل خطوة <code>(frame, log_row)</code>، وقائمة أسطر السجل جدولٌ تستطيع أن تتأكّد منه وتحفظه بجانب المخرج وتفرق بينه وبين سجل الشهر الماضي. والمغري الخاطئ هو العبارة التي تضع <code>print</code> على مجرى الأخطاء، لأن في الدرس فعلًا رسالةً تذهب إلى <code>stderr</code> فتضيع &mdash; لكنها <code>SettingWithCopyWarning</code> لا <code>print</code> التي تكتب على المخرج القياسي؛ فهما مشكلتان مختلفتان بعَرَضٍ متشابه اللفظ. والعبارة التي تعدّ <code>print</code> بطيئة بما يُحسب له حساب تختلق حجة أداءٍ لا يقولها الدرس: فطباعة سطرين لا تكلّف شيئًا، والسرعة ليست سبب أن تُبلّغ الخطوة بدل أن تطبع."
        }
      },

      /* ---------------------------------------------------------- 18 */
      {
        id: "t2l1q18", type: "ordercode", level: "medium",
        topics: ["t2-frame-log-row", "t2-decision-log"],
        q: {
          en: "The three steps, <code>run</code> and <code>PIPELINE</code> of Version 3 are already defined. Put the statements in the one order that runs, and in which no parameter is learned from a row that is not allowed to teach it.",
          ar: "خطوات النسخة 3 الثلاث و<code>run</code> و<code>PIPELINE</code> معرَّفة أصلًا. رتّب الأسطر بالترتيب الوحيد الذي يعمل، والذي لا يُتعلَّم فيه وسيطٌ من صفٍّ لا يحقّ له أن يعلّمه."
        },
        items: [
          { code: "import pandas as pd" },
          { code: "raw = pd.read_csv(\"listings_raw.csv\")" },
          { code: "train = raw.sample(frac=0.75, random_state=3)" },
          {
            code: "fitted = {\"rent_max_plausible\": 5000,\n          \"rent_median\": float(train.loc[train[\"monthly_rent\"] <= 5000, \"monthly_rent\"].median())}"
          },
          { code: "out, log = run(raw, PIPELINE, fitted)" },
          { code: "print(log.to_string(index=False))" }
        ],
        answer: [0, 1, 2, 3, 4, 5],
        hint: {
          en: "Every statement needs a name the statements above it created. One of them also has to come after the split, or the parameter is not one you are entitled to.",
          ar: "كل سطر يحتاج اسمًا أنشأته الأسطر فوقه. وعلى أحدها أيضًا أن يأتي بعد التقسيم، وإلا لم يكن الوسيط وسيطًا يحقّ لك."
        },
        explain: {
          en: "The chain of names fixes the order: <code>pd</code> before <code>read_csv</code>, <code>raw</code> before the split, <code>train</code> before <code>fitted</code>, <code>fitted</code> before <code>run</code>, and <code>log</code> before it can be printed. Two orderings carry the lesson rather than the syntax. The split comes before the parameter, because a median fitted on <code>raw</code> would be the one-word leak with no symptom. And the median is fitted with <code>monthly_rent &lt;= 5000</code>, so the parameter is not poisoned by the very value a later step removes &mdash; the canonical order asserting itself inside a single expression. Note that <code>run</code> is handed <code>raw</code>, not <code>train</code>: the steps are applied to every row, while only the training rows taught the parameter.",
          ar: "سلسلة الأسماء تثبّت الترتيب: فـ<code>pd</code> قبل <code>read_csv</code>، و<code>raw</code> قبل التقسيم، و<code>train</code> قبل <code>fitted</code>، و<code>fitted</code> قبل <code>run</code>، و<code>log</code> قبل أن يمكن طبعه. وترتيبان يحملان الدرس لا القواعد النحوية. فالتقسيم يأتي قبل الوسيط، لأن وسيطًا مضبوطًا على <code>raw</code> يكون التسرّبَ ذا الكلمة الواحدة بلا عَرَض. ويُضبط الوسيط بشرط <code>monthly_rent &lt;= 5000</code> حتى لا تسمّمه القيمة نفسها التي تُزيلها خطوة لاحقة &mdash; أي الترتيب القياسي يفرض نفسه داخل تعبير واحد. ولاحظ أن <code>run</code> تُسلَّم <code>raw</code> لا <code>train</code>: فالخطوات تُطبَّق على كل صف، ولم يعلّم الوسيطَ إلا صفوف التدريب."
        }
      },

      /* ---------------------------------------------------------- 19 */
      {
        id: "t2l1q19", type: "output", level: "hard",
        topics: ["t2-decision-log", "t2-frame-log-row"],
        q: {
          en: "Write exactly what the program prints. The three steps are <code>drop_exact_duplicates</code>, <code>void_impossible_rent</code> and <code>fill_rent_with_median</code>, in that order; each returns <code>(frame, log_row)</code> and <code>run</code> threads the frame and collects the rows. The file has 503 rows, 14 of them byte-for-byte repeats, 19 blank rents and one rent of 99999.",
          ar: "اكتب بالضبط ما يطبعه البرنامج. والخطوات الثلاث هي <code>drop_exact_duplicates</code> و<code>void_impossible_rent</code> و<code>fill_rent_with_median</code> بهذا الترتيب؛ وتعيد كلٌّ منها <code>(frame, log_row)</code> وتمرّر <code>run</code> الجدول وتجمع الأسطر. وفي الملف 503 صفوف، أربعة عشر منها مكرّرة حرفًا بحرف، وتسعة عشر إيجارًا فارغًا، وإيجار واحد قيمته 99999."
        },
        code: code(
          "fitted = {\"rent_max_plausible\": 5000, \"rent_median\": 200.0}",
          "out, log = run(raw, PIPELINE, fitted)",
          "",
          "print(log[\"rows_in\"].tolist())",
          "print(log[\"cells_changed\"].tolist())"
        ),
        blanks: [
          {
            accept: ["[503, 489, 489]\n[0, 1, 20]", "[503,489,489]\n[0,1,20]"],
            lines: 2
          }
        ],
        hint: {
          en: "Each step receives the previous step's output, not the file. Which step changes no cell at all, and what does the step before the fill leave behind?",
          ar: "تتسلّم كل خطوة مخرج التي قبلها لا الملف. فأيّ خطوة لا تغيّر خلية واحدة، وماذا تتركه الخطوة التي قبل التعبئة؟"
        },
        explain: {
          en: "<code>rows_in</code> of each step is <code>rows_out</code> of the step before it, which is why 503 is followed by 489 twice: only the first step removes rows, and voiding a value or filling a hole leaves every row in place. The interesting number is the last one. <code>drop_exact_duplicates</code> changes no cell &mdash; it deletes rows, which is a different kind of damage, and that is precisely what <code>cells_changed</code> separates from the row count. <code>void_impossible_rent</code> empties one cell, the 99999. So the fill step sees 19&nbsp;+&nbsp;1 = <strong>20</strong> holes, not 19. The tempting answer is 19, read off the file; a whole-pipeline comparison would indeed have said &ldquo;19 blank rents became 0&rdquo; and lost the fact that a value error had been turned into an imputed value. That 19&nbsp;&rarr;&nbsp;20 is the order of operations appearing in the log, which is exactly what a decision log is for.",
          ar: "‏<code>rows_in</code> لكل خطوة هي <code>rows_out</code> للخطوة قبلها، ولهذا تتبع 503 القيمةُ 489 مرتين: فالخطوة الأولى وحدها تحذف صفوفًا، وإفراغ قيمة أو تعبئة ثقب يُبقي كل صف في مكانه. والرقم المثير هو الأخير. فـ<code>drop_exact_duplicates</code> لا تغيّر خلية &mdash; بل تحذف صفوفًا، وهذا ضرر من نوع آخر، وهذا بالضبط ما يفصله <code>cells_changed</code> عن عدد الصفوف. وتُفرِغ <code>void_impossible_rent</code> خلية واحدة هي 99999. فترى خطوة التعبئة 19&nbsp;+&nbsp;1 = <strong>عشرين</strong> ثقبًا لا تسعة عشر. والجواب المغري 19 مقروءًا من الملف؛ وكانت مقارنة الخط كلّه ستقول فعلًا «تسعة عشر إيجارًا فارغًا صارت صفرًا» وتُفقد واقعةَ أن خطأ قيمة تحوّل إلى قيمة معوَّضة. وهذا الانتقال من 19 إلى 20 هو ترتيب العمليات ظاهرًا في السجل، وهذا بالضبط ما لأجله سجل القرارات."
        }
      },

      /* ---------------------------------------------------------- 20 */
      {
        id: "t2l1q20", type: "write", level: "hard",
        topics: ["t2-step-report", "t2-apply-next-month"],
        q: {
          en: "Write <code>void_impossible_rent(d, fitted)</code> in the <code>(frame, log_row)</code> shape of Concept 5, so that the same function can be run on next month's file with last month's parameters. It must take its threshold from <code>fitted[\"rent_max_plausible\"]</code>, turn every rent above it into a missing value, leave every row in place, never write into <code>d</code>, and return the new frame together with one log row holding <code>step</code>, <code>rows_in</code>, <code>rows_out</code> and <code>cells_changed</code>. Then call it with a threshold of 5000 and print the log row as a one-row DataFrame.",
          ar: "اكتب <code>void_impossible_rent(d, fitted)</code> بشكل <code>(frame, log_row)</code> في المفهوم 5، بحيث يمكن تشغيل الدالة نفسها على ملف الشهر القادم بوسائط الشهر الماضي. يجب أن تأخذ حدَّها من <code>fitted[\"rent_max_plausible\"]</code>، وتحوّل كل إيجار فوقه إلى قيمة مفقودة، وتُبقي كل صف في مكانه، ولا تكتب في <code>d</code> قط، وتعيد الجدول الجديد مع سطر سجل واحد فيه <code>step</code> و<code>rows_in</code> و<code>rows_out</code> و<code>cells_changed</code>. ثم نادِها بحدٍّ قيمته 5000 واطبع سطر السجل جدولًا من صف واحد."
        },
        starter: code(
          "import pandas as pd",
          "",
          "raw = pd.read_csv(\"listings_raw.csv\")      # 503 rows, one rent of 99999",
          "",
          "# your code here"
        ),
        lines: 11,
        checks: [
          {
            re: "def\\s+void_impossible_rent\\s*\\(\\s*\\w+\\s*,\\s*\\w+\\s*\\)",
            label: {
              en: "A function <code>void_impossible_rent</code> of two arguments: the frame and the fitted parameters",
              ar: "دالة <code>void_impossible_rent</code> بوسيطين: الجدول والوسائط المضبوطة"
            }
          },
          {
            re: "fitted\\s*\\[\\s*[\"']rent_max_plausible[\"']\\s*\\]",
            label: {
              en: "The threshold comes from <code>fitted[\"rent_max_plausible\"]</code>, not from the column",
              ar: "الحدّ يأتي من <code>fitted[\"rent_max_plausible\"]</code> لا من العمود"
            }
          },
          {
            re: "\\.\\s*assign\\s*\\(",
            label: {
              en: "Build a new frame with <code>assign</code>, so <code>d</code> is never written into",
              ar: "ابنِ جدولًا جديدًا بـ<code>assign</code> حتى لا يُكتَب في <code>d</code> قط"
            }
          },
          {
            re: "\\.\\s*(mask|where)\\s*\\(",
            label: {
              en: "Void the impossible rents with <code>mask</code> (or <code>where</code>)",
              ar: "أفرِغ الإيجارات المستحيلة بـ<code>mask</code> (أو <code>where</code>)"
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
            re: "[\"']cells_changed[\"']\\s*:",
            label: {
              en: "The log row counts the cells the step changed",
              ar: "سطر السجل يعدّ الخلايا التي غيّرتها الخطوة"
            }
          }
        ],
        forbid: [
          {
            re: "inplace\\s*=\\s*True",
            label: {
              en: "<code>inplace=True</code> (it writes into the caller's frame, returns <code>None</code>, and saves no memory)",
              ar: "<code>inplace=True</code> (يكتب في جدول المنادي ويعيد <code>None</code> ولا يوفّر ذاكرة)"
            }
          },
          {
            re: "\\.\\s*drop\\s*\\(|\\.\\s*dropna\\s*\\(",
            label: {
              en: "dropping the row instead of voiding the cell &mdash; the rent is wrong, the flat is real",
              ar: "حذف الصف بدل إفراغ الخلية &mdash; فالإيجار خاطئ والشقة حقيقية"
            }
          }
        ],
        solution: {
          code: code(
            "import pandas as pd",
            "",
            "raw = pd.read_csv(\"listings_raw.csv\")",
            "",
            "def void_impossible_rent(d, fitted):",
            "    bad = d[\"monthly_rent\"] > fitted[\"rent_max_plausible\"]",
            "    out = d.assign(monthly_rent=d[\"monthly_rent\"].mask(bad))",
            "    return out, {\"step\": \"void_impossible_rent\", \"rows_in\": len(d), \"rows_out\": len(out),",
            "                 \"cells_changed\": int(bad.sum())}",
            "",
            "out, row = void_impossible_rent(raw, {\"rent_max_plausible\": 5000})",
            "print(pd.DataFrame([row]).to_string(index=False))"
          ),
          out: "                step  rows_in  rows_out  cells_changed\nvoid_impossible_rent      503       503              1",
          en: "<code>bad</code> is computed once and used twice &mdash; to build the new column and to count the cells &mdash; which is why the log cannot disagree with what the step did. <code>assign</code> returns a new frame, so <code>raw</code> still holds its 99999, and the threshold arrives as a parameter, so the same function runs on June's file with March's number.",
          ar: "يُحسب <code>bad</code> مرة ويُستعمل مرتين &mdash; لبناء العمود الجديد ولعدّ الخلايا &mdash; ولهذا لا يستطيع السجل أن يخالف ما فعلته الخطوة. وتعيد <code>assign</code> جدولًا جديدًا فتبقى <code>raw</code> محتفظةً بـ99999، ويأتي الحدّ وسيطًا فتعمل الدالة نفسها على ملف حزيران برقم آذار."
        },
        hint: {
          en: "Compute the boolean mask into a name first: you need it twice, once to void the cells and once to count them. And ask which pandas call adds a column without writing into the frame you were given.",
          ar: "احسب القناع المنطقي في اسم أولًا: فأنت تحتاجه مرتين، مرة لإفراغ الخلايا ومرة لعدّها. واسأل أيّ نداء في pandas يضيف عمودًا دون أن يكتب في الجدول الذي أُعطيته."
        },
        explain: {
          en: "A step in this shape takes the frame and the fitted parameters and gives back a new frame plus one dictionary describing what it did, so a list of steps produces a table of log rows. Three details carry the question. <code>assign</code> means <code>raw</code> keeps its 99999 and its 13 columns, so the function is safe to call twice and the raw table is still the evidence. The threshold is an argument rather than a quantile of the column, which is what makes the step pure apply &mdash; it can be run on the held-out rows and on next month's file without leaking, because 5000 came from knowing the market, not from the data. And <code>rows_in == rows_out == 503</code> with <code>cells_changed: 1</code> is a log row no before-and-after comparison of the whole pipeline could produce: nothing about the table's size changed, so only a per-step report can say that something happened. The classic wrong shortcut is <code>d.dropna()</code> or dropping the row: the rent is wrong, but the flat is real and its area, rooms and city are still evidence.",
          ar: "الخطوة بهذا الشكل تأخذ الجدول والوسائط المضبوطة وتعيد جدولًا جديدًا مع قاموس واحد يصف ما فعلته، فتنتج قائمةُ خطوات جدولَ أسطر سجل. وثلاثة تفاصيل تحمل السؤال. فـ<code>assign</code> تعني أن <code>raw</code> تُبقي 99999 وأعمدتها الثلاثة عشر، فتكون الدالة آمنة للنداء مرتين ويبقى الجدول الخام دليلًا. والحدّ وسيطٌ لا ربيعٌ من العمود، وهذا ما يجعل الخطوة تطبيقًا صِرفًا &mdash; فتصلح للتشغيل على الصفوف المحجوزة وعلى ملف الشهر القادم دون تسرّب، لأن 5000 جاءت من معرفة السوق لا من البيانات. و<code>rows_in == rows_out == 503</code> مع <code>cells_changed: 1</code> سطرُ سجل لا تستطيع مقارنةُ الخط كلّه قبلًا وبعدًا أن تنتجه: فلم يتغير شيء في حجم الجدول، فلا يستطيع إلا تقريرٌ لكل خطوة أن يقول إن شيئًا حدث. والاختصار الخاطئ الكلاسيكي هو <code>d.dropna()</code> أو حذف الصف: فالإيجار خاطئ، والشقة حقيقية ومساحتها وغرفها ومدينتها ما زالت دليلًا."
        }
      },

      /* ---------------------------------------------------------- 21 */
      {
        id: "t2l1q21", type: "fill", level: "easy",
        topics: ["t2-baseline", "t2-mae"],
        q: {
          en: "Fill in the three blanks. The baseline predicts one constant for every listing, and the ruler reports how far the prediction is from the truth.",
          ar: "املأ الفراغات الثلاثة. يتنبأ الخط القاعدي بثابت واحد لكل إعلان، وتُبلّغ المسطرة عن بُعد التنبؤ من الحقيقة."
        },
        code: code(
          "train_rents = pd.Series([170.0, 200.0, 260.0, 200.0, 300.0])   # rows you may learn from",
          "held_out    = pd.Series([260.0, 170.0])                        # rows nobody looked at",
          "",
          "pred = train_rents.____1____()              # the baseline's only parameter: 200.0",
          "print((held_out - pred).____2____().mean())  # the held-out MAE: ____3____"
        ),
        blanks: [
          { accept: ["median"] },
          { accept: ["abs"] },
          { accept: ["45.0", "45"] }
        ],
        hint: {
          en: "The lesson's baseline is the middle of the training rents, not their average. And the ruler ignores the <em>direction</em> of each miss &mdash; ask what would happen to a miss of +60 and a miss of &minus;30 if it did not.",
          ar: "الخط القاعدي في الدرس هو وسط إيجارات التدريب لا متوسطها. والمسطرة تهمل <em>اتجاه</em> كل خطأ &mdash; فاسأل ماذا كان سيحدث لخطأٍ قيمته ‎+60 وخطأٍ قيمته ‎&minus;30 لو لم تفعل."
        },
        explain: {
          en: "The baseline has exactly one parameter &mdash; the median of the training rents, 200.0 &mdash; so it cannot overfit, and that is its whole purpose: a fixed reference an improvement has to be an improvement over. The mean absolute error is the average distance between prediction and truth with the sign thrown away: the two held-out misses are |260 &minus; 200| = 60 and |170 &minus; 200| = 30, so the MAE is 45.0, in shekels a month &mdash; a number a landlord can argue with. Leave out <code>abs</code> and you get 15.0, the two errors cancelling, which is exactly what the absolute value prevents. On the real file this same baseline scores 61.74 on the training rents and 60.17 held out.",
          ar: "للخط القاعدي وسيطٌ واحد بالضبط &mdash; وسيط إيجارات التدريب، 200.0 &mdash; فلا يستطيع الإفراط في المواءمة، وهذا غرضه كله: مرجعٌ ثابت يجب أن يكون التحسّن تحسّنًا عليه. ومتوسط الخطأ المطلق هو المتوسط لبُعد التنبؤ من الحقيقة مع طرح الإشارة: فالخطآن على المحجوزة |‏260 &minus; 200| = 60 و|‏170 &minus; 200| = 30، فيكون متوسط الخطأ المطلق 45.0 بالشيكل في الشهر &mdash; وهو رقم يستطيع مالك عقار أن يجادل فيه. واحذف <code>abs</code> فتحصل على 15.0 بتقاصّ الخطأين، وهذا بالضبط ما تمنعه القيمة المطلقة. وعلى الملف الحقيقي يسجّل هذا الخط القاعدي نفسه 61.74 على إيجارات التدريب و60.17 على المحجوزة."
        }
      },

      /* ---------------------------------------------------------- 22 */
      {
        id: "t2l1q22", type: "mcq", level: "hard",
        topics: ["t2-broken-ruler", "t2-mae"],
        q: {
          en: "The one-parameter baseline scores an MAE of 61.74 on the 363 training rents and 884.45 on the 121 held-out rents. You then void every rent above 5000 across the whole file &mdash; one cell &mdash; and measure again: the fitted median is still 200.0, the training MAE is still 61.7355, and the held-out MAE is 60.17 over 120 rents. What did that repair improve?",
          ar: "يسجّل الخط القاعدي ذو الوسيط الواحد متوسط خطأ مطلق 61.74 على إيجارات التدريب الـ363 و884.45 على الإيجارات المحجوزة الـ121. ثم تُفرِغ كل إيجار فوق 5000 في الملف كله &mdash; خلية واحدة &mdash; وتقيس مرة أخرى: الوسيط المضبوط ما زال 200.0، وخطأ التدريب ما زال 61.7355، وخطأ المحجوزة 60.17 على 120 إيجارًا. فماذا حسّن ذلك الإصلاح؟"
        },
        options: [
          {
            en: "The pipeline: the baseline now predicts 824 shekels closer on the held-out rows, the largest single improvement in the lesson.",
            ar: "خط التحويل: فالخط القاعدي يتنبأ الآن أقرب بـ824 شيكلًا على الصفوف المحجوزة، وهو أكبر تحسّن مفرد في الدرس."
          },
          {
            en: "The measurement. Every prediction is identical, since the fitted median is unchanged; what changed is the ruler &mdash; one held-out row contributed |99999 &minus; 200| = 99799, which is 825 of the 884.",
            ar: "القياس. فكل تنبؤ مطابق لما كان، إذ لم يتغير الوسيط المضبوط؛ وما تغيّر هو المسطرة &mdash; فصفٌّ محجوز واحد ساهم بـ|‏99999 &minus; 200| = 99799، أي 825 من الـ884."
          },
          {
            en: "Nothing that counts: the held-out error fell only because a row was removed from the scoring, and a measurement you shrink by dropping rows is not a measurement.",
            ar: "لا شيء يُحتسب: فخطأ المحجوزة هبط فقط لأن صفًّا أُزيل من التقييم، والقياس الذي تُصغّره بحذف صفوف ليس قياسًا."
          },
          {
            en: "The split: the 99999 moved out of the held-out rows into the training rows, so the two halves are finally comparable.",
            ar: "التقسيم: فقد انتقلت 99999 من الصفوف المحجوزة إلى صفوف التدريب، فصار النصفان قابلين للمقارنة أخيرًا."
          }
        ],
        answer: 1,
        hint: {
          en: "Compare the two things the repair could have changed: the predictions, and the rows the predictions are scored against. Which of the two moved?",
          ar: "قارن الشيئين اللذين كان يمكن للإصلاح أن يغيّرهما: التنبؤات، والصفوف التي تُقيَّم التنبؤات عليها. فأيّهما تحرّك؟"
        },
        explain: {
          en: "A fourteen-fold gap between training and held-out error normally means a model has memorised its training rows &mdash; except this one has a single parameter and nothing to memorise with. The cause is listing 5062, whose &ldquo;rent&rdquo; is a phone number and which this split put in the held-out rows: it alone carries 825 of the 884 shekels. Voiding it changed no prediction at all; it repaired the yardstick. The answer that says nothing that counts improved, since a row was merely removed from the scoring, is the tempting wrong one, because a row really did leave the scoring and shrinking a metric by deleting data is usually cheating &mdash; the difference is that 99999 was never a rent, so scoring against it measured a typo, not a prediction. The test for a broken ruler is whether the predictions changed: here they did not. Note too that the held-out error is now slightly <em>below</em> the training error (60.17 against 61.74), which is correct for a one-parameter constant and calibrates the noise of this measurement at about 1.5 shekels &mdash; a later step has to beat 60.17 by rather more than that before you can claim it helped.",
          ar: "الفجوة بأربعة عشر ضعفًا بين خطأ التدريب وخطأ المحجوزة تعني عادةً أن نموذجًا حفظ صفوف تدريبه &mdash; إلا أن لهذا وسيطًا واحدًا ولا شيء يحفظ به. والسبب الإعلان 5062 الذي «إيجاره» رقم هاتف والذي وضعه هذا التقسيم في الصفوف المحجوزة: فهو وحده يحمل 825 من الـ884 شيكلًا. وإفراغه لم يغيّر أي تنبؤ؛ بل أصلح المسطرة. والمغري الخاطئ هو الجواب الذي يقول إن لا شيء يُحتسب قد تحسّن وإنما أُزيل صفٌّ من التقييم، لأن صفًّا خرج فعلًا من التقييم ولأن تصغير مقياسٍ بحذف بيانات غشٌّ في العادة &mdash; والفرق أن 99999 لم تكن إيجارًا قط، فكان التقييم عليها قياسًا لخطأ إدخال لا لتنبؤ. واختبار المسطرة المكسورة هو: هل تغيّرت التنبؤات؟ وهنا لم تتغير. ولاحظ أيضًا أن خطأ المحجوزة صار الآن <em>أقل</em> قليلًا من خطأ التدريب (‏60.17 مقابل 61.74)، وهذا صحيح لثابتٍ ذي وسيط واحد ويعاير ضجيج هذا القياس عند نحو شيكل ونصف &mdash; فعلى خطوة لاحقة أن تتغلّب على 60.17 بأكثر من ذلك بكثير قبل أن تستطيع الادّعاء بأنها أفادت."
        }
      },

      /* ---------------------------------------------------------- 23 */
      {
        id: "t2l1q23", type: "tf", level: "easy",
        topics: ["t2-held-out-check"],
        q: {
          en: "A step replaces the one global median with one median per agency &mdash; 20 groups fitted on the 377 training rows &mdash; and the training MAE falls from 61.74 to 59.49. True or false: that is evidence the step helps.",
          ar: "خطوةٌ تستبدل الوسيط العام الواحد بوسيط لكل وكالة &mdash; عشرين مجموعة مضبوطة على صفوف التدريب الـ377 &mdash; فيهبط خطأ التدريب من 61.74 إلى 59.49. صح أم خطأ: هذا دليل على أن الخطوة تُفيد."
        },
        truth: false,
        hint: {
          en: "Count the rows behind each of the twenty parameters, then ask what the other column of the table says.",
          ar: "عُدّ الصفوف وراء كل وسيط من العشرين، ثم اسأل ماذا يقول العمود الآخر في الجدول."
        },
        explain: {
          en: "False. Held out, the same step takes 60.17 to 62.25 &mdash; it made the prediction <em>worse</em>. Twenty agencies over 377 training rows leaves some groups with three rows and four with exactly one, so their &ldquo;median&rdquo; is a single listing's rent memorised and relabelled a market rate. A training-set improvement is what memorising looks like from the inside, which is why the two columns must be read together. Compare the per-governorate step: 61.74&nbsp;&rarr;&nbsp;55.67 on the training rows and 60.17&nbsp;&rarr;&nbsp;56.42 held out &mdash; both moved, in the same direction, by about the same amount, which is what a transformation that genuinely adds information looks like.",
          ar: "خطأ. فعلى المحجوزة تأخذ الخطوة نفسها 60.17 إلى 62.25 &mdash; أي إنها أسوأت التنبؤ. فعشرون وكالة على 377 صفًّا تدريبيًّا تُبقي بعض المجموعات بثلاثة صفوف وأربعًا منها بصفٍّ واحد بالضبط، فيكون «وسيطها» إيجار إعلان واحد محفوظًا ومُسمًّى سعرَ سوق. والتحسّن على صفوف التدريب هو شكل الحفظ من الداخل، ولهذا يجب أن يُقرأ العمودان معًا. وقارن خطوة كل محافظة: ‏61.74&nbsp;&rarr;&nbsp;55.67 على صفوف التدريب و60.17&nbsp;&rarr;&nbsp;56.42 على المحجوزة &mdash; تحرّك الاثنان في الاتجاه نفسه وبالمقدار نفسه تقريبًا، وهكذا يبدو التحويل الذي يضيف معلومة حقًّا."
        }
      },

      /* ---------------------------------------------------------- 24 */
      {
        id: "t2l1q24", type: "multi", level: "hard",
        topics: ["t2-ruler-limits", "t2-held-out-check"],
        q: {
          en: "The held-out mean absolute error of a one-parameter baseline is the lesson's ruler, and a crude one. Which of these are limits the lesson names? (Choose all that apply.)",
          ar: "متوسط الخطأ المطلق على الصفوف المحجوزة لخطٍّ قاعدي بوسيط واحد هو مسطرة الدرس، وهي خشنة. فأيّ هذه حدودٌ يسمّيها الدرس؟ (اختر كل ما ينطبق.)"
        },
        options: [
          {
            en: "It never sees the imputation it rewards: the MAE is computed only on rows whose true rent exists, so the 19 blank rents &mdash; the expensive flats &mdash; appear in none of these numbers.",
            ar: "لا يرى التعويض الذي يُثيبه: فمتوسط الخطأ المطلق يُحسب على الصفوف التي يوجد إيجارها الحقيقي وحدها، فلا تظهر الإيجارات الفارغة التسعة عشر &mdash; وهي الشقق الغالية &mdash; في أي من هذه الأرقام."
          },
          {
            en: "It is one split of 503 rows: change <code>random_state</code> and every number moves by a shekel or two, so a 0.5-shekel difference is the seed rather than a signal.",
            ar: "إنه تقسيم واحد لـ503 صفوف: بدّل <code>random_state</code> فيتحرك كل رقم بشيكل أو شيكلين، فيكون الفرق بنصف شيكل هو البذرة لا إشارة."
          },
          {
            en: "It averages, so a 10-shekel miss on a 150-shekel studio and a 10-shekel miss on a 580-shekel villa count as the same error.",
            ar: "يأخذ متوسطًا، فيُعَدّ خطأ عشرة شواكل في استوديو بمئة وخمسين وخطأ عشرة شواكل في فيلا بخمس مئة وثمانين خطأً واحدًا."
          },
          {
            en: "Tuning twenty steps against the same held-out set quietly turns that set into training data, and its error becomes optimistic again.",
            ar: "ضبط عشرين خطوة على المجموعة المحجوزة نفسها يحوّل تلك المجموعة بهدوء إلى بيانات تدريب، فيعود خطؤها متفائلًا."
          },
          {
            en: "It cannot be computed at all when the prediction is a single constant rather than one value per row.",
            ar: "لا يمكن حسابه أصلًا حين يكون التنبؤ ثابتًا واحدًا لا قيمةً لكل صف."
          },
          {
            en: "It punishes one large miss harder than several small ones, so it overstates the cost of a single bad prediction.",
            ar: "يعاقب خطأً كبيرًا واحدًا أشدّ من عدة أخطاء صغيرة، فيُبالغ في كلفة تنبؤ سيئ واحد."
          }
        ],
        answer: [0, 1, 2, 3],
        hint: {
          en: "Four of the six are costs the lesson states plainly. One of the other two describes a different ruler, and one describes something the lesson actually did on every line of its table.",
          ar: "أربعة من الستة كلفٌ يذكرها الدرس صريحًا. وأحد الاثنين الباقيين يصف مسطرة أخرى، والآخر يصف شيئًا فعله الدرس في كل سطر من جدوله."
        },
        explain: {
          en: "The four limits are real and each one changes what you may conclude: the ruler is blind to the imputation of exactly the rows that matter most, it is noisy at about 1.5 shekels on 120 rows, it is indifferent to where the money is, and it is spent every time you look at it. The claim that the MAE cannot be computed at all against a single constant is wrong, because computing it against a constant is what the whole lesson does &mdash; a scalar is broadcast over the rows, which is the point of a baseline. The claim that it punishes one large miss harder than several small ones describes the root mean squared error, which squares each miss before averaging; MAE is linear, so it treats a 100-shekel miss exactly as ten 10-shekel ones, and choosing between the two rulers is a decision about the business rather than about statistics.",
          ar: "الحدود الأربعة حقيقية، ويغيّر كلٌّ منها ما يحقّ لك أن تستنتجه: فالمسطرة عمياء عن تعويض الصفوف الأهمّ بعينها، وفيها ضجيج بنحو شيكل ونصف على 120 صفًّا، ولا تبالي بموضع المال، وتُستهلك في كل مرة تنظر فيها. والادّعاء بأنه لا يمكن حسابه أصلًا مقابل ثابت واحد خاطئ، لأن حسابه مقابل ثابت هو ما يفعله الدرس كله &mdash; فالقيمة المفردة تُبثّ على الصفوف، وهذا مغزى الخط القاعدي. والادّعاء بأنه يعاقب خطأً كبيرًا واحدًا أشدّ من عدة أخطاء صغيرة يصف الجذر التربيعي لمتوسط مربّع الخطأ، الذي يربّع كل خطأ قبل أخذ المتوسط؛ أما متوسط الخطأ المطلق فخطّي، فيعدّ خطأ مئة شيكل مثل عشرة أخطاء بعشرة شواكل بالضبط، والاختيار بين المسطرتين قرار يتعلّق بالعمل لا بالإحصاء."
        }
      }

    ]
  };
})();
