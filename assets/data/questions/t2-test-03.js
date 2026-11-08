window.DABanks = window.DABanks || {};
(function () {
  /* code(line, line, ...) -> one string with \n between lines */
  function code() { return Array.prototype.join.call(arguments, "\n"); }

  window.DABanks["t2-test-03"] = {
    title: {
      en: "Test 3 — Duplicates, Text and Types: Making Values Comparable",
      ar: "اختبار 3 — التكرارات والنصوص والأنواع: جعل القيم قابلة للمقارنة"
    },
    intro: {
      en: "24 questions on Lesson 3: telling an exact duplicate from a repost, naming a business key and refusing a <code>subset=</code> that deletes real flats, normalising by rule and finishing by map, the silent <code>NaN</code> that <code>.map()</code> leaves behind, truthiness, a mixed-type column repaired by a recorded decision, two date conventions in one column, and a free-text column that turns out to be eight templates. Plan for about 45 minutes. Every question carries a hint, an answer and an explanation, hidden until you ask for them: try first, then open them. A revealed answer is not counted.",
      ar: "‏24 سؤالًا عن الدرس 3: التفريق بين التكرار الحرفي وإعادة النشر، وتسمية المفتاح التجاري ورفض <code>subset=</code> يحذف شققًا حقيقية، والتطبيع بقاعدة والإكمال بخريطة، وقيمة <code>NaN</code> الصامتة التي تتركها <code>.map()</code>، والصدقية، وعمودٌ مختلط الأنواع يُصلَح بقرار مسجَّل، وعُرفا تاريخ في عمود واحد، وعمود نصٍّ حرّ يتبيّن أنه ثمانية قوالب. خصّص نحو 45 دقيقة. لكل سؤال تلميح وجواب وشرح، وكلها مخفية حتى تطلبها: جرّب أولًا ثم افتحها. والجواب الذي يُظهَر لا يُحتسب."
    },
    questions: [

      /* ---------------------------------------------------------- 01 */
      {
        id: "t2l3q01", type: "output", level: "easy",
        topics: ["t2-exact-duplicate", "t2-repost"],
        q: {
          en: "Write exactly what the program prints. <code>listings_raw.csv</code> holds 503 rows and describes 480 real flats, because <code>listing_id</code> is what the rental site assigns to a flat once and never reuses.",
          ar: "اكتب بالضبط ما يطبعه البرنامج. يحمل <code>listings_raw.csv</code> ‏503 صفوف ويصف 480 شقة حقيقية، لأن <code>listing_id</code> هو ما يسنده موقع التأجير إلى الشقة مرة واحدة ولا يُعيد استعماله."
        },
        code: code(
          "raw = pd.read_csv(\"listings_raw.csv\")",
          "",
          "print(len(raw) - len(raw.drop_duplicates()))",
          "print(len(raw.drop_duplicates()) - raw[\"listing_id\"].nunique())",
          "print(int(raw.duplicated(keep=False).sum()))",
          "print(raw.drop_duplicates(subset=[\"listing_id\"]).shape[0])"
        ),
        blanks: [
          { accept: ["14\n9\n28\n480"], lines: 4 }
        ],
        hint: {
          en: "The first two lines are the two kinds of duplicate, and each is a subtraction. The third changes only which copy is spared &mdash; so ask how many rows a group of two contributes when nothing at all is spared.",
          ar: "السطران الأولان هما نوعا التكرار، وكلٌّ منهما طرح. والثالث لا يغيّر إلا أيّ نسخة تُعفى &mdash; فاسأل كم صفًّا تُسهم به مجموعةٌ من اثنين حين لا يُعفى شيء أصلًا."
        },
        explain: {
          en: "<code>503 &minus; 489 = 14</code> rows are byte-for-byte repeats, the only kind row equality can see. <code>489 &minus; 480 = 9</code> are reposts: the same <code>listing_id</code> with a later <code>listed_on</code> and the advert retyped, so two of thirteen columns differ and <code>drop_duplicates()</code> is blind to them. The third line is the one worth getting wrong once: <code>keep=</code> decides which member of a repeated group is <em>not</em> flagged, and <code>keep=False</code> spares nobody, so each of the 14 pairs contributes 2 rows and the answer is 28 &mdash; not 14, and not 23. The last line is the only one of the four that is a row count you would carry forward, because 480 is the number of flats.",
          ar: "‏<code>503 &minus; 489 = 14</code> صفًّا تكرارات حرفية، وهي النوع الوحيد الذي يراه تساوي الصفوف. و<code>489 &minus; 480 = 9</code> إعادات نشر: هو <code>listing_id</code> نفسه بـ<code>listed_on</code> لاحق وإعلان أُعيد كتابته، فيختلف عمودان من ثلاثة عشر ولا تراهما <code>drop_duplicates()</code>. والسطر الثالث يستحقّ أن تخطئه مرة: فـ<code>keep=</code> تحدّد أيّ عضو في المجموعة المكرّرة <em>لا</em> يُعلَّم، و<code>keep=False</code> لا تُعفي أحدًا، فيُسهم كل زوج من الأزواج الأربعة عشر بصفَّين فيكون الجواب 28 &mdash; لا 14 ولا 23. والسطر الأخير وحده من الأربعة عددُ صفوف تحمله معك، لأن 480 هو عدد الشقق."
        }
      },

      /* ---------------------------------------------------------- 02 */
      {
        id: "t2l3q02", type: "fill", level: "easy",
        topics: ["t2-index-is-unique"],
        q: {
          en: "Fill in the three blanks so that the program asks the file whether stage&nbsp;1 is finished, and names the offenders when it is not. The commented output is what it prints.",
          ar: "املأ الفراغات الثلاثة ليسأل البرنامجُ الملفَّ هل انتهت المرحلة 1، ويسمّي المخالفين إن لم تنتهِ. والمخرج في التعليق هو ما يطبعه."
        },
        code: code(
          "raw = pd.read_csv(\"listings_raw.csv\")              # 503 rows, 480 flats",
          "",
          "print(\"default index    :\", raw.____1____.is_unique)",
          "print(\"the business key :\", raw.set_index(\"____2____\").index.is_unique)",
          "print(\"after the dedupe :\", raw.drop_duplicates(subset=[\"listing_id\"])",
          "                               .set_index(\"listing_id\").index.is_unique)",
          "print(\"offending values :\", raw.loc[raw.____3____(subset=[\"listing_id\"], keep=False),",
          "                                    \"listing_id\"].nunique())",
          "",
          "# default index    : True",
          "# the business key : False",
          "# after the dedupe : True",
          "# offending values : 23"
        ),
        blanks: [
          { accept: ["index"] },
          { accept: ["listing_id"] },
          { accept: ["duplicated"] }
        ],
        hint: {
          en: "The first blank is the attribute <code>read_csv</code> invented for you, which is also the reason the first line tells you nothing. The third is the method whose <code>keep=</code> argument you met a moment ago.",
          ar: "الفراغ الأول هو الخاصية التي اختلقتها لك <code>read_csv</code>، وهي أيضًا سبب كون السطر الأول لا يخبرك شيئًا. والثالث هو التابع الذي قابلتَ وسيطه <code>keep=</code> قبل قليل."
        },
        explain: {
          en: "<code>raw.index.is_unique</code> is <code>True</code> on every frame <code>read_csv</code> has ever produced, because the default index is <code>0, 1, 2, &hellip;</code> and is unique by construction however corrupt the file is. The useful check names the key: <code>set_index(\"listing_id\").index.is_unique</code> is <code>False</code> on the raw frame and <code>True</code> only after a dedupe on that key &mdash; and <em>that</em> is the test that stage&nbsp;1 is finished, not &ldquo;zero duplicates&rdquo;. The last line names the offenders rather than counting them: 23 identifiers appear more than once, which is the 14 flats typed in twice plus the 9 reposted. Make it a habit to assert the key after stage&nbsp;1 and let the assertion fail loudly, rather than discovering it in a join three lessons later.",
          ar: "قيمة <code>raw.index.is_unique</code> هي <code>True</code> في كل جدول أنتجته <code>read_csv</code> يومًا، لأن الفهرس الافتراضي <code>0, 1, 2, &hellip;</code> وهو فريد بالبناء مهما كان الملف فاسدًا. والفحص المفيد يسمّي المفتاح: فـ<code>set_index(\"listing_id\").index.is_unique</code> قيمتها <code>False</code> على الجدول الخام و<code>True</code> فقط بعد حذف المكرّر على ذلك المفتاح &mdash; و<em>هذا</em> هو فحص انتهاء المرحلة 1، لا «صفر مكرّر». والسطر الأخير يسمّي المخالفين لا يعدّهم: ‏23 معرّفًا يظهر أكثر من مرة، وهي الشقق الأربع عشرة المُدخَلة مرتين مع التسع المُعاد نشرها. فاتّخذ عادةَ التأكيد على المفتاح بعد المرحلة 1 ودع التأكيد يفشل بصوت عالٍ بدل أن تكتشفه في دمجٍ بعد ثلاثة دروس."
        }
      },

      /* ---------------------------------------------------------- 03 */
      {
        id: "t2l3q03", type: "compare", level: "medium",
        topics: ["t2-keep-last"],
        q: {
          en: "Nine flats were advertised twice and you may keep one copy of each. The question this chapter serves is <em>what rent should this listing ask now?</em>, so the copy to keep is the later advert. Which statement is correct?",
          ar: "تسع شقق أُعلن عنها مرتين ولا يحقّ لك إبقاء إلا نسخة من كلٍّ. والسؤال الذي يخدمه هذا الفصل هو <em>كم ينبغي أن يطلب هذا الإعلان إيجارًا الآن؟</em>، فالنسخة التي تُبقى هي الإعلان الأحدث. فأيُّ العبارات صحيحة؟"
        },
        codeA: code(
          "reposted = [5041, 5065, 5188, 5254, 5285, 5349, 5425, 5434, 5436]",
          "once = raw.drop_duplicates()                        # the 489 survivors",
          "",
          "by_order = once.drop_duplicates(\"listing_id\", keep=\"last\")",
          "print(\"rows:\", len(by_order), \"| one row per flat:\",",
          "      by_order.set_index(\"listing_id\").index.is_unique)",
          "print(sorted(by_order.loc[by_order[\"listing_id\"].isin(reposted), \"listed_on\"]))",
          "",
          "# rows: 480 | one row per flat: True",
          "# ['2026-04-02', '2026-04-03', '2026-04-24', '2026-05-01', '2026-05-10',",
          "#  '2026-05-19', '2026-05-21', '2026-05-28', '2026-06-19']"
        ),
        codeB: code(
          "by_string = once.sort_values(\"listed_on\").drop_duplicates(\"listing_id\", keep=\"last\")",
          "print(\"rows:\", len(by_string))",
          "print(sorted(by_string.loc[by_string[\"listing_id\"].isin(reposted), \"listed_on\"]))",
          "print(\"flats where this disagrees with A:\",",
          "      int((by_order.set_index(\"listing_id\")[\"listed_on\"].sort_index()",
          "           != by_string.set_index(\"listing_id\")[\"listed_on\"].sort_index()).sum()))",
          "print(\"'13/05/2026' < '2026-05-28' ->\", \"13/05/2026\" < \"2026-05-28\")",
          "",
          "# rows: 480",
          "# ['2026-04-02', '2026-04-28', '2026-05-01', '2026-05-19', '2026-05-21',",
          "#  '2026-05-24', '2026-05-26', '2026-05-28', '2026-06-19']",
          "# flats where this disagrees with A: 3",
          "# '13/05/2026' < '2026-05-28' -> True"
        ),
        options: [
          {
            en: "They are equivalent. Both return 480 rows with a unique key, and <code>keep=</code> only decides which copy is spared, never which values survive.",
            ar: "هما متكافئتان. فكلتاهما تعيد 480 صفًّا بمفتاح فريد، و<code>keep=</code> لا تحدّد إلا أيّ نسخة تُعفى، لا أيّ قيم تنجو."
          },
          {
            en: "B is better, and its defect is its own last line. B fixes the named defect of A: <code>keep=\"last\"</code> means the last <em>row</em> in the current order, so A keeps the <em>older</em> advert for three of the nine flats while every structural check stays green. What B still leaves open: <code>listed_on</code> is a string, so the sort compares characters and every <code>DD/MM/YYYY</code> value sorts before every <code>2026-&hellip;</code> value. B is right on this file by luck, because all 23 slash-formatted rows happen to be older copies.",
            ar: "ب أفضل، وعيبها سطرُها الأخير نفسه. فـب تُصلح العيب المسمّى في أ: إذ تعني <code>keep=\"last\"</code> آخر <em>صف</em> في الترتيب الحالي، فتُبقي أ الإعلان <em>الأقدم</em> لثلاث من الشقق التسع وكل فحص بنيوي أخضر. وما تُبقيه ب مفتوحًا: <code>listed_on</code> نصٌّ، فتقارن <code>sort_values</code> المحارف، فيتقدّم كل تاريخ <code>DD/MM/YYYY</code> كلَّ تاريخ <code>2026-&hellip;</code>. فـب صحيحة على هذا الملف بالحظ، لأن صفوف الشرطة المائلة الثلاثة والعشرين كلها نسخٌ أقدم اتفاقًا."
          },
          {
            en: "A is better, because sorting before a dedupe changes which rows are compared with which, so B can merge two flats that A keeps apart.",
            ar: "أ أفضل، لأن الفرز قبل حذف المكرّر يغيّر أيّ الصفوف تُقارَن بأيّها، فتستطيع ب أن تدمج شقتين تُبقيهما أ متفرّقتين."
          },
          {
            en: "B is better because <code>sort_values</code> reads <code>listed_on</code> as dates before comparing them, so the order is chronological and the recipe is finished.",
            ar: "ب أفضل لأن <code>sort_values</code> تقرأ <code>listed_on</code> تواريخَ قبل مقارنتها، فيكون الترتيب زمنيًّا وتكون الوصفة قد تمّت."
          }
        ],
        answer: 1,
        hint: {
          en: "Read the two lists of nine dates side by side and count the differences; then read B's last printed line and ask what it is really telling you about the <em>next</em> file.",
          ar: "اقرأ قائمتَي التواريخ التسعة جنبًا إلى جنب وعُدّ الفروق؛ ثم اقرأ سطر ب المطبوع الأخير واسأل ماذا يخبرك فعلًا عن الملف <em>التالي</em>."
        },
        explain: {
          en: "Both frames have 480 rows and a unique key, and nothing in either output says which is which &mdash; the three dates that differ are the whole answer. In file order the older copy of listings 5065, 5349 and 5436 happens to be typed <em>below</em> the newer one, so <code>keep=\"last\"</code> drops the newer advert and three flats carry a rent, a condition and a date from the wrong month. The &ldquo;equivalent&rdquo; answer is the tempting one, because the row count, the key check and the dtypes are identical; <code>keep=</code> decides exactly which values survive, which is why it is a decision and not a detail. The answer that credits <code>sort_values</code> with parsing dates is refuted by B's own last line: <code>'13/05/2026' &lt; '2026-05-28'</code> is <code>True</code> because <code>'1'</code> sorts before <code>'2'</code>. Version&nbsp;3 of the lesson parses the two formats into <code>datetime64</code> first and then sorts, which is right for a reason rather than by luck.",
          ar: "للجدولَين 480 صفًّا ومفتاحٌ فريد، ولا شيء في أي من المخرجَين يقول أيّهما أيّ &mdash; والتواريخ الثلاثة المختلفة هي الجواب كله. فالنسخة الأقدم من الإعلانات 5065 و5349 و5436 مكتوبة في ترتيب الملف <em>تحت</em> الأحدث اتفاقًا، فتُسقط <code>keep=\"last\"</code> الإعلان الأحدث وتحمل ثلاث شقق إيجارًا وحالةً وتاريخًا من الشهر الخطأ. وجوابُ «التكافؤ» هو المغري، لأن عدد الصفوف وفحص المفتاح والأنواع متطابقة؛ و<code>keep=</code> تحدّد بالضبط أيّ القيم تنجو، ولهذا هي قرار لا تفصيل. والجوابُ الذي ينسب إلى <code>sort_values</code> تحليلَ التواريخ ينقضه سطر ب الأخير نفسه: فـ<code>'13/05/2026' &lt; '2026-05-28'</code> قيمتها <code>True</code> لأن <code>'1'</code> تتقدّم <code>'2'</code>. وتحلّل النسخة 3 في الدرس الصيغتين إلى <code>datetime64</code> أولًا ثم تفرز، فتكون صحيحة لسبب لا بحظّ."
        }
      },

      /* ---------------------------------------------------------- 04 */
      {
        id: "t2l3q04", type: "tf", level: "easy",
        topics: ["t2-dedupe-before-split"],
        q: {
          en: "The split below is taken on the raw 503 rows, exactly as Lesson&nbsp;1 took it. True or false: the held-out error it produces is safe to quote, because the seed is recorded, both frames have the shapes you expect, and 10 flats out of 503 is under 2% of the file.",
          ar: "التقسيم أدناه مأخوذ على الصفوف الخام الـ503، كما أخذه <a href=\"#t2-lesson-01\">الدرس 1</a> بالضبط. صح أم خطأ: الخطأ المحجوز الذي يُنتجه يُؤمَن ذكره، لأن البذرة مسجَّلة، وللجدولَين الشكلان المتوقَّعان، وعشر شقق من 503 أقلُّ من 2% من الملف."
        },
        code: code(
          "train = raw.sample(frac=0.75, random_state=3)          # split the RAW 503 rows",
          "test = raw.drop(train.index)",
          "both = sorted(set(train[\"listing_id\"]) & set(test[\"listing_id\"]))",
          "print(\"train %d rows, held out %d rows\" % (len(train), len(test)))",
          "print(\"flats on BOTH sides of the split:\", len(both))",
          "",
          "# train 377 rows, held out 126 rows",
          "# flats on BOTH sides of the split: 10"
        ),
        truth: false,
        hint: {
          en: "The 10 is not a share of the file. Ask which of the two frames those ten flats make a claim about, and divide by that denominator instead.",
          ar: "العشرة ليست نسبةً من الملف. فاسأل عن أيٍّ من الجدولَين تدّعي تلك الشقق العشر شيئًا، واقسم على ذلك المقام بدلًا من الآخر."
        },
        explain: {
          en: "False. The ten flats are ten of the <em>126 held-out rows</em> &mdash; just under 8% of the set the error is measured on &mdash; and seven of the ten are there as byte-for-byte identical rows. The model is therefore scored on flats the training rows have already memorised, and the number you would put in a report is partly a training error wearing a disguise. Reproducibility is not correctness: a seeded split reproduces the leak exactly, every time, which is what makes this failure so comfortable to live with. Deduplicate first and the problem disappears: the same seed on the 480 flats gives 360 training and 120 held-out rows with no flat on both sides. The whole reason stage&nbsp;1 is stage&nbsp;1 is that everything measured afterwards depends on one row meaning one thing.",
          ar: "خطأ. فالشقق العشر عشرٌ من <em>الصفوف المحجوزة الـ126</em> &mdash; أي أقلّ قليلًا من 8% من المجموعة التي يُقاس عليها الخطأ &mdash; وسبعٌ من العشر فيها صفوفًا متطابقة حرفيًّا. فيُقيَّم النموذج إذن على شقق حفظتها صفوف التدريب أصلًا، ويكون الرقم الذي ستضعه في تقرير خطأَ تدريبٍ متخفّيًا جزئيًّا. والقابلية للتكرار ليست صحة: فالتقسيم المبذور يُعيد إنتاج التسرّب بالضبط وفي كل مرة، وهذا ما يجعل هذا العطل مريحًا إلى هذا الحد. واحذف المكرّر أولًا فتزول المشكلة: فالبذرة نفسها على الشقق الـ480 تعطي 360 صفًّا للتدريب و120 محجوزًا ولا شقة على الجهتين. وكل سبب كون المرحلة 1 هي المرحلة 1 أن كل ما يُقاس بعدها يعتمد على أن يعني الصف الواحد شيئًا واحدًا."
        }
      },

      /* ---------------------------------------------------------- 05 */
      {
        id: "t2l3q05", type: "match", level: "easy",
        topics: ["t2-business-key", "t2-dedupe-judgement"],
        q: {
          en: "The business key of a table is the smallest set of columns that, by the rules of the thing the table describes, cannot repeat. Match each table to its key and to the reason nothing smaller will do.",
          ar: "المفتاح التجاري لجدولٍ هو أصغر مجموعة أعمدة لا يمكن أن تتكرر بحكم قواعد الشيء الذي يصفه الجدول. وصّل كل جدول بمفتاحه وبسبب عدم كفاية ما هو أصغر."
        },
        leftHead: { en: "The table", ar: "الجدول" },
        rightHead: { en: "Its key, and why nothing smaller will do", ar: "مفتاحه، ولماذا لا يكفي ما هو أصغر" },
        pairs: [
          {
            l: { en: "the scraped rental listings, one row meaning one flat", ar: "إعلانات التأجير المزحوفة، والصف الواحد يعني شقة واحدة" },
            r: {
              en: "<code>listing_id</code> &mdash; two flats in the same building can share city, rooms, area and rent, and 480 rows survive",
              ar: "‏<code>listing_id</code> &mdash; فشقتان في البناء نفسه قد تتشاركان المدينة والغرف والمساحة والإيجار، وتنجو 480 صفًّا"
            }
          },
          {
            l: { en: "the same 503 rows, one row meaning one advert, so that a repost is evidence rather than noise", ar: "الصفوف الـ503 نفسها، والصف الواحد يعني إعلانًا واحدًا، فتكون إعادة النشر دليلًا لا ضجيجًا" },
            r: {
              en: "<code>listing_id</code> + <code>listed_on</code> &mdash; it keeps both copies of each repost and still removes the 14 typed-in repeats, leaving 489 rows",
              ar: "‏<code>listing_id</code> + <code>listed_on</code> &mdash; فيُبقي نسختَي كل إعادة نشر ويحذف مع ذلك التكرارات الأربعة عشر المُدخَلة، فتبقى 489 صفًّا"
            }
          },
          {
            l: { en: "the cafeteria order lines of Practical&nbsp;1", ar: "أسطر طلبات المقصف في العملي 1" },
            r: {
              en: "<code>order_id</code> + <code>item</code> &mdash; <code>order_id</code> alone repeats, because one order has several lines",
              ar: "‏<code>order_id</code> + <code>item</code> &mdash; فـ<code>order_id</code> وحده يتكرر، لأن الطلب الواحد فيه أسطر عدة"
            }
          },
          {
            l: { en: "the school registry of Theory&nbsp;1", ar: "سجل المدارس في النظري 1" },
            r: {
              en: "<code>school_code</code> &mdash; two schools can share a name, and a code is issued once",
              ar: "‏<code>school_code</code> &mdash; فمدرستان قد تتشاركان اسمًا، والرمز يُصدر مرة"
            }
          },
          {
            l: { en: "a ledger of rent payments", ar: "دفتر دفعات إيجار" },
            r: {
              en: "there is none, so <code>drop_duplicates()</code> is not a legal operation on it &mdash; two identical payments on one day are two real payments, and dropping one deletes money",
              ar: "لا مفتاح له، فلا تكون <code>drop_duplicates()</code> عمليةً مشروعة عليه &mdash; فدفعتان متطابقتان في يوم واحد دفعتان حقيقيتان، وحذف إحداهما يحذف مالًا"
            }
          }
        ],
        hint: {
          en: "Four of the five have a key and one has none; find that row first. For the two rows that describe the same file, the only thing that differs is what you decided one row means.",
          ar: "أربعة من الخمسة لها مفتاح وواحد لا مفتاح له؛ فاعثر على ذلك السطر أولًا. وأما السطران اللذان يصفان الملف نفسه فلا يختلف فيهما إلا ما قرّرتَ أن يعنيه الصف الواحد."
        },
        explain: {
          en: "A business key is a fact about the world, not a property of the data: nothing in the file can tell it to you, and the only evidence is the source &mdash; here, that the site assigns one identifier per flat and never reuses it. The two rows that share one file are the point of the exercise. The same 503 rows have the key <code>listing_id</code> if a row is a flat, leaving 480, and the key <code>listing_id</code> + <code>listed_on</code> if a row is an advert, leaving 489; deduplication is therefore not a repair but a decision about what one row means, and the honest place for that sentence is the log beside the count. The payment ledger is the row to remember: the question &ldquo;what is the business key?&rdquo; has three possible answers &mdash; a named column, a named combination, or <em>none</em> &mdash; and only the first two let you deduplicate at all.",
          ar: "المفتاح التجاري واقعةٌ عن العالم لا خاصيةٌ للبيانات: فلا شيء في الملف يستطيع أن يخبرك بها، والدليل الوحيد هو المصدر &mdash; وهو هنا أن الموقع يُسند معرّفًا واحدًا لكل شقة ولا يُعيد استعماله قط. والسطران اللذان يتشاركان ملفًّا واحدًا هما مقصود التمرين. فللصفوف الـ503 نفسها المفتاح <code>listing_id</code> إن كان الصف شقة، فتبقى 480؛ والمفتاح <code>listing_id</code> + <code>listed_on</code> إن كان الصف إعلانًا، فتبقى 489؛ فلا يكون حذف المكرّر إصلاحًا بل قرارًا في معنى الصف الواحد، وموضع تلك الجملة الأمين هو السجل بجانب العدّ. ودفترُ الدفعات هو السطر الذي يجب تذكّره: فللسؤال «ما المفتاح التجاري؟» ثلاثة أجوبة ممكنة &mdash; عمود مسمّى، أو تركيبة مسمّاة، أو <em>لا شيء</em> &mdash; والأوّلان فقط يسمحان لك بحذف المكرّر أصلًا."
        }
      },

      /* ---------------------------------------------------------- 06 */
      {
        id: "t2l3q06", type: "output", level: "medium",
        topics: ["t2-careless-subset"],
        q: {
          en: "A colleague deduplicates on &ldquo;what a flat <em>is</em>&rdquo; &mdash; its city, its rooms and its rent &mdash; and reports 413 unique listings. Write exactly what the program prints: it takes the rows that key drops and decomposes them.",
          ar: "يحذف زميلٌ المكرّر على «ما <em>هي</em> الشقة» &mdash; مدينتها وغرفها وإيجارها &mdash; ويُبلّغ عن 413 إعلانًا فريدًا. اكتب بالضبط ما يطبعه البرنامج: فهو يأخذ الصفوف التي يُسقطها ذلك المفتاح ويفصّلها."
        },
        code: code(
          "dropped = raw.duplicated(subset=[\"city\", \"rooms\", \"monthly_rent\"], keep=\"first\")",
          "exact   = raw.duplicated(keep=\"first\")",
          "same_id = raw.duplicated(subset=[\"listing_id\"], keep=\"first\")",
          "",
          "print(int(dropped.sum()))",
          "print(int((dropped & exact).sum()))",
          "print(int((dropped & ~exact & same_id).sum()))",
          "print(int((dropped & ~same_id).sum()))",
          "print(raw.drop_duplicates(subset=[\"city\", \"rooms\", \"monthly_rent\"])[\"listing_id\"].nunique())"
        ),
        blanks: [
          { accept: ["90\n14\n9\n67\n413"], lines: 5 }
        ],
        hint: {
          en: "The three middle lines are a partition of the first, so they have to add up to it. Two of the three are numbers you already know from Concept&nbsp;1; the third is the whole objection to this key.",
          ar: "الأسطر الثلاثة الوسطى تقسيمٌ للأول، فيجب أن تساويه جمعًا. واثنان من الثلاثة رقمان تعرفهما أصلًا من المفهوم 1؛ والثالث هو الاعتراض كله على هذا المفتاح."
        },
        explain: {
          en: "The key drops 90 rows: the 14 exact repeats, which it was right to drop; the 9 reposts, which it was also right to drop, though not for a reason it could state; and 67 rows whose <code>listing_id</code> appears nowhere else in the file &mdash; each one the only record of a flat, so that after the dedupe the flat does not exist. <code>14 + 9 + 67 = 90</code>, so the three masks partition the dropped rows and nothing is double-counted. The last line is the cheapest audit in the lesson: 413 surviving identifiers against the 480 the file itself states by <code>nunique()</code>, and the single inequality <code>413 &lt; 480</code> proves 67 flats were destroyed without inspecting one row. The general shape of the error: <strong>a <code>subset=</code> that omits the business key does not remove duplicates, it merges distinct things that happen to agree on the columns you chose.</strong>",
          ar: "يُسقط المفتاح 90 صفًّا: التكرارات الحرفية الأربعة عشر، وقد أصاب في إسقاطها؛ وإعادات النشر التسع، وقد أصاب في إسقاطها أيضًا وإن لم يكن لسبب يستطيع قوله؛ وسبعةً وستين صفًّا لا يظهر <code>listing_id</code> لها في موضع آخر من الملف &mdash; كلٌّ منها السجل الوحيد لشقة، فلا تكون تلك الشقة موجودة بعد حذف المكرّر. و<code>14 + 9 + 67 = 90</code>، فالأقنعة الثلاثة تقسم الصفوف المُسقَطة ولا شيء يُحسب مرتين. والسطر الأخير أرخص تدقيق في الدرس: ‏413 معرّفًا باقيًا مقابل 480 يقولها الملف نفسه بـ<code>nunique()</code>، والمتباينة الواحدة <code>413 &lt; 480</code> تُثبت إهلاك 67 شقة دون فحص صفٍّ واحد. وشكل الخطأ العام: <strong>المفتاح <code>subset=</code> الذي يُغفل المفتاح التجاري لا يحذف مكرّرات، بل يدمج أشياء متمايزة اتّفقت على الأعمدة التي اخترتَها.</strong>"
        }
      },

      /* ---------------------------------------------------------- 07 */
      {
        id: "t2l3q07", type: "multi", level: "hard",
        topics: ["t2-dedupe-judgement", "t2-business-key"],
        q: {
          en: "Five measurements on the raw 503 rows, where <code>KEY</code> is the ten substantive columns &mdash; everything except <code>listing_id</code>, <code>listed_on</code> and <code>advert</code>. Which of these conclusions do they support? (Choose all that apply.)",
          ar: "خمسة قياسات على الصفوف الخام الـ503، و<code>KEY</code> هي الأعمدة الجوهرية العشرة &mdash; أي كل شيء إلا <code>listing_id</code> و<code>listed_on</code> و<code>advert</code>. فأيّ هذه الاستنتاجات تسندها؟ (اختر كل ما ينطبق.)"
        },
        code: code(
          "rows that agree with another row on all ten columns of KEY : 46",
          "groups they form                                           : 23",
          "groups holding more than one listing_id                    : 0",
          "duplicated(subset=every column except listing_id).sum()    : 14",
          "drop_duplicates(subset=every column except listing_id)     : (489, 13)"
        ),
        lang: "text",
        options: [
          {
            en: "The 46 rows are the 14 exact repeats and the 9 reposts and nothing else: <code>28 + 18 = 46</code> rows in <code>14 + 9 = 23</code> groups.",
            ar: "الصفوف الـ46 هي التكرارات الحرفية الأربعة عشر وإعادات النشر التسع ولا شيء غير ذلك: <code>28 + 18 = 46</code> صفًّا في <code>14 + 9 = 23</code> مجموعة."
          },
          {
            en: "On this file a dedupe on <code>KEY</code> and a dedupe on <code>listing_id</code> would have kept exactly the same 480 rows &mdash; which is a finding about this file and not a licence for next month's.",
            ar: "في هذا الملف كان حذف المكرّر على <code>KEY</code> وحذفه على <code>listing_id</code> سيُبقيان الصفوف الـ480 نفسها بالضبط &mdash; وهذا كشفٌ عن هذا الملف لا إذنٌ لملف الشهر القادم."
          },
          {
            en: "Deduplicating on every column except <code>listing_id</code> leaves 489 rows, because that key still compares <code>listed_on</code> and <code>advert</code> &mdash; the two columns a repost changes.",
            ar: "حذف المكرّر على كل عمود إلا <code>listing_id</code> يُبقي 489 صفًّا، لأن ذلك المفتاح ما زال يقارن <code>listed_on</code> و<code>advert</code> &mdash; وهما العمودان الذان تغيّرهما إعادة النشر."
          },
          {
            en: "<code>groups holding more than one listing_id: 0</code> is the evidence that <code>listing_id</code> is the business key of this table.",
            ar: "السطر <code>groups holding more than one listing_id: 0</code> هو الدليل على أن <code>listing_id</code> هو المفتاح التجاري لهذا الجدول."
          },
          {
            en: "Because no two flats in this file agree on all ten columns, <code>subset=KEY</code> is a safe substitute for <code>subset=[\"listing_id\"]</code> in the pipeline that will run next month.",
            ar: "لأن ما من شقتين في هذا الملف تتفقان في الأعمدة العشرة كلها، يكون <code>subset=KEY</code> بديلًا آمنًا لـ<code>subset=[\"listing_id\"]</code> في خط التحويل الذي سيعمل الشهر القادم."
          },
          {
            en: "The 46 rows prove that the content-based key is the stronger of the two, since it is the only one of them that also catches the nine reposts.",
            ar: "الصفوف الـ46 تُثبت أن المفتاح القائم على المحتوى أقوى الاثنين، إذ هو وحده الذي يقتنص إعادات النشر التسع أيضًا."
          }
        ],
        answer: [0, 1, 2],
        hint: {
          en: "Three of the six are arithmetic you can do on the five numbers given. Each of the other three makes a claim the numbers cannot carry: one about where a business key comes from, one about a file nobody has seen, one about a key the fourth line already measured.",
          ar: "ثلاثة من الستة حسابٌ تستطيع إجراءه على الأرقام الخمسة المعطاة. وكلٌّ من الثلاثة الأخرى يدّعي ما لا تحمله الأرقام: أحدها عن مصدر المفتاح التجاري، وآخر عن ملفٍ لم يره أحد، وآخر عن مفتاحٍ قاسه السطر الرابع أصلًا."
        },
        explain: {
          en: "The arithmetic first: 14 pairs contribute 28 rows and 9 repost pairs contribute 18, so 46 rows in 23 groups, and because no group holds two identifiers the two keys keep the same 480 rows here. The fourth measurement is the subtle one, and it is what refutes the answer that calls the content key the stronger of the two: dropping <code>listing_id</code> from the subset still leaves <code>listed_on</code> and <code>advert</code> in it, so the obvious reading of &ldquo;dedupe on the content&rdquo; returns 489 and misses the nine reposts entirely &mdash; and even the ten-column <code>KEY</code> is not &ldquo;the only one&rdquo; that catches them, since deduplicating on <code>listing_id</code> catches them too. The answer that reads the business key off the data is the sentence Concept&nbsp;2 exists to refuse: the key is a fact about the rental site, learned from the source, and a file can only ever fail to contradict it. And promoting <code>subset=KEY</code> to a substitute turns a finding into a rule: two genuinely different flats that agree on all ten columns are perfectly possible &mdash; the lesson builds the pair 5801 and 5802 to show it &mdash; and then the content key deletes one of them while the row count moves in the direction that looks like success.",
          ar: "الحساب أولًا: أربعة عشر زوجًا تُسهم بـ28 صفًّا، وتسع إعادات نشر تُسهم بـ18، فتكون 46 صفًّا في 23 مجموعة؛ ولأن ما من مجموعة تحمل معرّفَين يُبقي المفتاحان الصفوف الـ480 نفسها هنا. والقياس الرابع هو الدقيق، وهو ما ينقض الجوابَ الذي يسمّي مفتاح المحتوى أقوى الاثنين: فإخراج <code>listing_id</code> من المجموعة يُبقي فيها <code>listed_on</code> و<code>advert</code>، فتعيد القراءةُ البديهية لـ«حذف المكرّر بالمحتوى» 489 وتُغفل إعادات النشر التسع كلها &mdash; وليس <code>KEY</code> ذو الأعمدة العشرة «الوحيد» الذي يقتنصها أيضًا، إذ يقتنصها حذفُ المكرّر على <code>listing_id</code> كذلك. والجوابُ الذي يقرأ المفتاح التجاري من البيانات هو الجملة التي وُجد المفهوم 2 ليرفضها: فالمفتاح واقعةٌ عن موقع التأجير تُعلَم من المصدر، ولا يستطيع ملفٌّ إلا أن يُعجَز عن نقضها. وترقيةُ <code>subset=KEY</code> إلى بديلٍ تجعل كشفًا قاعدةً: فشقتان مختلفتان فعلًا تتفقان في الأعمدة العشرة أمرٌ ممكن تمامًا &mdash; ويبني الدرس الزوج 5801 و5802 ليُظهره &mdash; وحينها يحذف مفتاح المحتوى إحداهما وعددُ الصفوف يتحرك في الاتجاه الذي يشبه النجاح."
        }
      },

      /* ---------------------------------------------------------- 08 */
      {
        id: "t2l3q08", type: "mcq", level: "easy",
        topics: ["t2-city-spellings"],
        q: {
          en: "There are five cities in this market. <code>value_counts()</code> on the raw <code>city</code> column prints the twelve commonest strings: <code>Khan Younis</code> appears twice, with 68 and 10, and one line looks indented. What should you conclude?",
          ar: "في هذه السوق خمس مدن. وتطبع <code>value_counts()</code> على عمود <code>city</code> الخام أكثر اثنتي عشرة سلسلة نصية تكرارًا: فيظهر <code>Khan Younis</code> مرتين بعدَدَي 68 و10، ويبدو سطرٌ مُزاحًا. فماذا تستنتج؟"
        },
        code: code(
          "city",
          "Gaza             114",
          "Khan Younis       68",
          "Rafah             61",
          "Deir al-Balah     40",
          "Jabalia           33",
          "Khan-Younis       24",
          "gaza              19",
          "Khan Yunis        14",
          "GAZA              12",
          "RAFAH             11",
          "Khan Younis       10",
          "  Gaza             9"
        ),
        lang: "text",
        options: [
          {
            en: "<code>value_counts()</code> cannot handle repeated index labels; <code>groupby(\"city\").size()</code> merges them and gives the honest count.",
            ar: "‏<code>value_counts()</code> لا تتعامل مع تسميات فهرس مكرّرة؛ وتدمجها <code>groupby(\"city\").size()</code> فتعطي العدّ الأمين."
          },
          {
            en: "One of the two <code>Khan Younis</code> lines is a governorate value entered in the city column, so the repair is to compare the two columns row by row.",
            ar: "أحد سطرَي <code>Khan Younis</code> قيمةُ محافظة أُدخلت في عمود المدينة، فيكون الإصلاح مقارنةَ العمودين صفًّا صفًّا."
          },
          {
            en: "The column holds whitespace variants the display cannot show: <code>'Khan Younis '</code> and <code>'&nbsp;&nbsp;Gaza'</code> are different strings from <code>'Khan Younis'</code> and <code>'Gaza'</code>. Look at the <em>repr</em> of the values &mdash; <code>series.unique()</code> prints the quotes, <code>series.head()</code> does not.",
            ar: "العمود يحمل صورًا تختلف بالمسافات ولا يستطيع العرض إظهارها: فـ<code>'Khan Younis '</code> و<code>'&nbsp;&nbsp;Gaza'</code> سلسلتان مختلفتان عن <code>'Khan Younis'</code> و<code>'Gaza'</code>. فانظر في <em>التمثيل الحرفي</em> (repr) للقيم &mdash; فـ<code>series.unique()</code> تطبع علامات التنصيص و<code>series.head()</code> لا تطبعها."
          },
          {
            en: "The indentation is how pandas aligns a value shorter than the longest label, so the display is cosmetic and nothing in the column is wrong.",
            ar: "الإزاحة هي كيف تصفّ pandas قيمةً أقصر من أطول تسمية، فيكون العرض شكليًّا ولا شيء في العمود خاطئًا."
          }
        ],
        answer: 2,
        hint: {
          en: "Count the cities in this market, then count the lines of the table. The difference between two of those lines is a character with no ink.",
          ar: "عُدّ مدن هذه السوق، ثم عُدّ أسطر الجدول. فالفرق بين سطرين منها محرفٌ لا حبر له."
        },
        explain: {
          en: "Twenty-six strings for five cities. <code>value_counts()</code> is printing exactly what is in the column; the display simply cannot show you whitespace, so <code>'Khan Younis '</code> with a trailing space and <code>'&nbsp;&nbsp;Gaza'</code> with two leading ones look like values you have already seen. Three of the six spellings of Gaza differ only in case and three only in whitespace, and <code>groupby</code>, <code>get_dummies</code> and a join treat all six as unrelated &mdash; so a median per city is a median of twenty-six groups, five of which are one city split four ways. The <code>groupby</code> answer is the tempting one because it sounds like a stronger tool: it would print the same two lines, because the two strings really are two different keys. The habit to acquire is <code>repr</code>: <code>print(series.unique()[:10])</code> shows the quotes, and it is the only honest way to look at a text column.",
          ar: "ستٌّ وعشرون سلسلة نصية لخمس مدن. وتطبع <code>value_counts()</code> ما في العمود بالضبط؛ لكن العرض لا يستطيع أن يُظهر لك المسافات، فتبدو <code>'Khan Younis '</code> بمسافة لاحقة و<code>'&nbsp;&nbsp;Gaza'</code> بمسافتين سابقتين قيمًا رأيتَها أصلًا. وثلاث من تهجئات غزة الستّ تختلف في حالة الأحرف وحدها وثلاث في المسافات وحدها، وتعدّ <code>groupby</code> و<code>get_dummies</code> والدمجُ الستَّ كلها غير ذات صلة &mdash; فيكون وسيط الإيجار لكل مدينة وسيطًا لستٍّ وعشرين مجموعة، خمسٌ منها مدينةٌ واحدة مقسومة أربع قسمات. وجوابُ <code>groupby</code> هو المغري لأنه يبدو أداةً أقوى: وهو سيطبع السطرين نفسيهما، لأن السلسلتين مفتاحان مختلفان فعلًا. والعادةُ التي تُكتسب هي <code>repr</code>: فـ<code>print(series.unique()[:10])</code> تُظهر علامات التنصيص، وهي الطريقة الأمينة الوحيدة للنظر في عمود نصي."
        }
      },

      /* ---------------------------------------------------------- 09 */
      {
        id: "t2l3q09", type: "order", level: "easy",
        topics: ["t2-normalisation", "t2-canonical-map"],
        q: {
          en: "Put the five steps of the recommended city repair in the order the recipe forces. Each step needs what the step before it produced.",
          ar: "رتّب خطوات إصلاح المدينة الموصى به بالترتيب الذي تُلزمه الوصفة. فكل خطوة تحتاج ما أنتجته الخطوة قبلها."
        },
        items: [
          {
            en: "<strong>Normalise by rule</strong> &mdash; strip, lower-case and collapse runs of whitespace, removing the differences you have decided are formatting. 26 spellings become 11.",
            ar: "<strong>طبّع بقاعدة</strong> &mdash; شذّب المسافات وصغّر الأحرف واضغط سلاسل المسافات، فتحذف الفروق التي قرّرتَ أنها تنسيق. فتصير ستٌّ وعشرون تهجئة إحدى عشرة."
          },
          {
            en: "<strong>Map by decision</strong> &mdash; look each value up in <code>CITY_MAP</code>, whose eleven keys state as lines of code that <code>Khan Yunis</code> and <code>Khan Younis</code> are one city. 11 become 5.",
            ar: "<strong>اربط بقرار</strong> &mdash; ابحث عن كل قيمة في <code>CITY_MAP</code>، ومفاتيحها الإحدى عشرة تذكر سطورَ كودٍ بأن <code>Khan Yunis</code> و<code>Khan Younis</code> مدينة واحدة. فتصير الإحدى عشرة خمسًا."
          },
          {
            en: "<strong>Count what the map did not cover</strong> &mdash; return the normalised values that came back <code>NaN</code> as a <code>value_counts()</code>, so an unexpected spelling is a number and not a hole.",
            ar: "<strong>عُدّ ما لم تغطّه الخريطة</strong> &mdash; أعِد القيم المُطبَّعة التي رجعت <code>NaN</code> في صورة <code>value_counts()</code>، فتكون التهجئة غير المتوقَّعة رقمًا لا ثقبًا."
          },
          {
            en: "<strong>Declare the dtype</strong> &mdash; <code>astype(\"string\")</code>, rather than accepting whatever <code>.map()</code> inferred from this month's data.",
            ar: "<strong>اذكر النوع</strong> &mdash; <code>astype(\"string\")</code>، بدل قبول ما استنبطته <code>.map()</code> من بيانات هذا الشهر."
          },
          {
            en: "<strong>Return the frame beside a log row</strong> &mdash; <code>rows_in</code>, <code>rows_out</code>, <code>changed: 187</code>, and the unmatched counts in the note.",
            ar: "<strong>أعِد الجدول بجانب سطر سجل</strong> &mdash; <code>rows_in</code> و<code>rows_out</code> و<code>changed: 187</code>، والقيم غير المطابقة معدودةً في الملاحظة."
          }
        ],
        answer: [0, 1, 2, 3, 4],
        hint: {
          en: "Two of the orderings are forced by the <em>keys</em> of the dictionary and by what a missing value is counted against. And the last step cannot run until it has something to report.",
          ar: "ترتيبان يُلزمهما <em>مفاتيح</em> القاموس وما تُعدّ القيمة المفقودة في مقابله. والخطوة الأخيرة لا تستطيع العمل حتى يكون عندها ما تُبلّغ عنه."
        },
        explain: {
          en: "The order is not a matter of style. <code>CITY_MAP</code>'s keys are written in normalised form, so mapping first would match only the values that happened to arrive already trimmed and lower-cased: <code>raw[\"city\"].map(CITY_MAP)</code> names 39 rows of 503 and leaves 464 silent <code>NaN</code>s. The unmatched count can only be taken after the map, because it is <em>defined</em> as what the map did not cover. The dtype is declared on the result, and the log row reports all of it, which is why it is last. Note what does <em>not</em> have a forced order: strip, lower and the space collapse commute with each other, because each removes a different kind of character and none creates work for another &mdash; which is why they are one step here. The shape to carry away: <strong>a rule removes differences that are formatting, a map resolves differences that are decisions, and the step reports what the map did not cover.</strong>",
          ar: "ليس الترتيب مسألة ذوق. فمفاتيح <code>CITY_MAP</code> مكتوبة بالصورة المُطبَّعة، فلو رُبطت أولًا لطابقت القيم التي وصلت أصلًا مشذَّبةً وبحروف صغيرة وحدها: فـ<code>raw[\"city\"].map(CITY_MAP)</code> تسمّي 39 صفًّا من 503 وتترك 464 <code>NaN</code> صامتة. ولا يمكن أخذ عدّ غير المطابق إلا بعد الربط، لأنه <em>معرَّفٌ</em> بأنه ما لم تغطّه الخريطة. ويُذكر النوع على النتيجة، ويُبلّغ سطر السجل عن ذلك كله، ولهذا كان آخرًا. ولاحظ ما <em>ليس</em> له ترتيب مُلزَم: فالتشذيب والتصغير وضغط المسافات تتبادل فيما بينها، لأن كلًّا منها يحذف نوعًا مختلفًا من المحارف ولا يُنشئ أحدها عملًا لآخر &mdash; ولهذا كانت خطوة واحدة هنا. والشكل الذي تحمله: <strong>القاعدة تحذف الفروق التي هي تنسيق، والخريطة تحلّ الفروق التي هي قرارات، والخطوة تُبلّغ عمّا لم تغطّه الخريطة.</strong>"
        }
      },

      /* ---------------------------------------------------------- 10 */
      {
        id: "t2l3q10", type: "compare", level: "medium",
        topics: ["t2-canonical-map", "t2-city-spellings"],
        q: {
          en: "Two answers to &ldquo;make the city column comparable&rdquo;. A is the rule a real project shipped. Which statement is correct?",
          ar: "جوابان عن «اجعل عمود المدينة قابلًا للمقارنة». وأ هي القاعدة التي سلّمها مشروع حقيقي. فأيُّ العبارات صحيحة؟"
        },
        codeA: code(
          "city = raw[\"city\"].str.strip().str.title()",
          "print(\"spellings:\", city.nunique(), \"| rows changed:\", int((city != raw[\"city\"]).sum()))",
          "print(city.value_counts().head(6).to_string())",
          "",
          "# spellings: 11 | rows changed: 169",
          "# city",
          "# Gaza             170",
          "# Rafah             88",
          "# Khan Younis       87",
          "# Deir Al-Balah     44",
          "# Jabalia           44",
          "# Khan-Younis       24"
        ),
        codeB: code(
          "city, unmatched = canonicalise(raw[\"city\"], CITY_MAP)   # strip + lower + collapse, then .map()",
          "print(\"spellings:\", city.nunique(), \"| rows changed:\", int((city != raw[\"city\"]).sum()))",
          "print(\"unmatched:\", dict(unmatched) or \"none\")",
          "print(city.value_counts().to_string())",
          "",
          "# spellings: 5 | rows changed: 187",
          "# unmatched: none",
          "# city",
          "# Gaza             170",
          "# Khan Younis      125",
          "# Rafah             88",
          "# Deir al-Balah     65",
          "# Jabalia           55"
        ),
        options: [
          {
            en: "A is better: it changes 169 rows where B changes 187, and the lesson's own rule is that a cleaning step should touch the broken rows and nothing else.",
            ar: "أ أفضل: فهي تغيّر 169 صفًّا وتغيّر ب 187، وقاعدة الدرس نفسه أن خطوة التنظيف ينبغي أن تمسّ الصفوف المعطوبة ولا شيء غيرها."
          },
          {
            en: "A is the right tool for a report and B for a model, because <code>.title()</code> produces display names while a map produces internal codes a reader cannot interpret.",
            ar: "أ هي الأداة الصحيحة للتقرير وب للنموذج، لأن <code>.title()</code> تُنتج أسماءً للعرض والخريطةُ تُنتج رموزًا داخلية لا يستطيع القارئ تفسيرها."
          },
          {
            en: "They are equivalent as cleaning: both leave a column whose values are comparable, and the difference between <code>Deir Al-Balah</code> and <code>Deir al-Balah</code> is capitalisation nobody will ever join on.",
            ar: "هما متكافئتان تنظيفًا: فكلتاهما تترك عمودًا قيمُه قابلة للمقارنة، والفرق بين <code>Deir Al-Balah</code> و<code>Deir al-Balah</code> تكبيرٌ لن يدمج أحدٌ عليه قط."
          },
          {
            en: "B is better, and its extra 18 changed rows are the point. A cannot merge the six transliteration families &mdash; <code>\"Khan Yunis\".title()</code> is <code>'Khan Yunis'</code> &mdash; and 40 of its 169 changes rewrite an already-correct <code>Deir al-Balah</code> as a spelling no reference table holds. What B still leaves open: <code>CITY_MAP</code> is a literal in the source file, so a spelling nobody anticipated is reported rather than resolved.",
            ar: "ب أفضل، وصفوفها الثمانية عشر المتغيّرة الزائدة هي المقصود. فـأ لا تستطيع دمج عائلات النقل الحرفي الستّ &mdash; إذ <code>\"Khan Yunis\".title()</code> هي <code>'Khan Yunis'</code> &mdash; وأربعون من تغييراتها الـ169 تعيد كتابة <code>Deir al-Balah</code> الصحيحة أصلًا بتهجئةٍ لا يحملها جدولٌ مرجعي. وما تُبقيه ب مفتوحًا: <code>CITY_MAP</code> قيمةٌ حرفية في ملف المصدر، فتُبلَّغ التهجئةُ التي لم يتوقّعها أحد ولا تُحلّ."
          }
        ],
        answer: 3,
        hint: {
          en: "Count the groups, not the rows. Then ask of each version how many rows it rewrote that were already right &mdash; the file holds 316 cells already spelled canonically.",
          ar: "عُدّ المجموعات لا الصفوف. ثم اسأل عن كل نسخة: كم صفًّا أعادت كتابته وكان صحيحًا أصلًا &mdash; فالملف يحمل 316 خلية مكتوبة بالصورة المعيارية أصلًا."
        },
        explain: {
          en: "Eleven groups against five is the whole difference: any <code>groupby</code>, join or encoding on A still splits three of the five cities, because Title Case is a formatting rule and the collisions are transliterations of خان يونس, جباليا and دير البلح into Latin letters. A also damages what was already right &mdash; the canonical spelling has a lower-case Arabic article, so <code>.title()</code> rewrites the 40 correct <code>Deir al-Balah</code> rows as a label no reference table, no map and no reader recognises. The &ldquo;fewer changes is better&rdquo; answer is the tempting one, because <code>changed</code> really is a diagnostic the lesson recommends: it is a counter to <em>read</em>, not a number to minimise, and A's is lower only because it left six collisions standing while rewriting 40 rows the wrong way. B leaves all 316 already-canonical rows untouched and reports <code>unmatched: none</code>, which is the second free diagnostic. And the map is also <em>reviewable</em>: a colleague who disagrees that <code>Jabalya</code> is <code>Jabalia</code> can see the claim and argue with it, which they could not do with <code>.title()</code>.",
          ar: "إحدى عشرة مجموعة مقابل خمس هي الفرق كله: فأي <code>groupby</code> أو دمج أو ترميز على أ ما زال يقسم ثلاثًا من المدن الخمس، لأن Title Case قاعدةُ تنسيق والتصادمات نقلٌ حرفي لأسماء خان يونس وجباليا ودير البلح إلى حروف لاتينية. وأ تُفسد أيضًا ما كان صحيحًا أصلًا &mdash; فالتهجئة المعيارية فيها أداة تعريف عربية بحرف صغير، فتعيد <code>.title()</code> كتابة الصفوف الأربعين الصحيحة من <code>Deir al-Balah</code> بتسميةٍ لا يعرفها جدولٌ مرجعي ولا خريطة ولا قارئ. وجوابُ «الأقل تغييرًا أفضل» هو المغري، لأن <code>changed</code> فحصٌ يوصي به الدرس فعلًا: وهو عدّادٌ <em>يُقرأ</em> لا رقمٌ يُصغَّر، وعدّاد أ أقلّ لسبب واحد هو أنها تركت ستّ تصادمات قائمة وأعادت كتابة أربعين صفًّا في الاتجاه الخطأ. وتترك ب الصفوف الـ316 المعيارية أصلًا دون مساس وتُبلّغ <code>unmatched: none</code>، وهو الفحص الثاني المجاني. والخريطة <em>قابلة للمراجعة</em> أيضًا: فالزميل الذي لا يوافق على أن <code>Jabalya</code> هي <code>Jabalia</code> يرى الادّعاء ويجادل فيه، وما كان ليستطيع ذلك مع <code>.title()</code>."
        }
      },

      /* ---------------------------------------------------------- 11 */
      {
        id: "t2l3q11", type: "error", level: "medium",
        topics: ["t2-map-silent-nan", "t2-normalisation"],
        q: {
          en: "The step should put all 503 rows into five canonical cities. It prints five cities, raises nothing, and is short by 47 rows. Click the offending line.",
          ar: "ينبغي للخطوة أن تضع الصفوف الـ503 كلها في خمس مدن معيارية. وهي تطبع خمس مدن ولا ترفع شيئًا وتنقص 47 صفًّا. انقر السطر المخطئ."
        },
        code: code(
          "norm = raw[\"city\"].astype(\"string\").str.lower()",
          "city = norm.map(CITY_MAP)                             # 11 normalised keys -> 5 canonical names",
          "print(\"spellings:\", city.nunique())                   # 5",
          "print(\"named:\", int(city.notna().sum()), \"of\", len(city))          # 456 of 503",
          "print(\"sum of the value_counts:\", int(city.value_counts().sum()))  # 456"
        ),
        answer: 1,
        solution: {
          code: code(
            "norm = (raw[\"city\"].astype(\"string\").str.strip()           # strip and collapse, not just lower",
            "                   .str.lower().str.replace(r\"\\s+\", \" \", regex=True))",
            "city = norm.map(CITY_MAP)",
            "print(\"spellings:\", city.nunique())",
            "print(\"named:\", int(city.notna().sum()), \"of\", len(city))",
            "print(\"unmatched:\", norm[city.isna() & norm.notna()].value_counts().to_dict() or \"none\")"
          ),
          out: "spellings: 5\nnamed: 503 of 503\nunmatched: none",
          en: "The normalising rule has to produce the form the map's keys are written in &mdash; all three parts of it. And the step should return the unmatched values counted, so the next unexpected spelling is a line in the log rather than a hole in the column.",
          ar: "يجب أن تُنتج قاعدةُ التطبيع الصورةَ التي كُتبت بها مفاتيح الخريطة &mdash; بأجزائها الثلاثة كلها. وينبغي للخطوة أن تعيد القيم غير المطابقة معدودةً، فتكون التهجئة غير المتوقَّعة التالية سطرًا في السجل لا ثقبًا في العمود."
        },
        hint: {
          en: "The map has eleven keys and they are all written one way. Compare that way with what line&nbsp;1 actually produces for a value the scraper indented.",
          ar: "للخريطة أحد عشر مفتاحًا وكلها مكتوبة بطريقة واحدة. فقارن تلك الطريقة بما يُنتجه السطر 1 فعلًا لقيمةٍ أزاحها الزاحف."
        },
        explain: {
          en: "Line&nbsp;1 lower-cases and nothing else, so <code>' gaza'</code>, <code>'&nbsp;&nbsp;gaza'</code>, <code>'gaza '</code>, <code>'rafah '</code>, <code>' rafah'</code> and <code>'khan younis '</code> reach <code>.map()</code> still wearing their whitespace, match no key, and become <code>NaN</code> &mdash; 47 rows, in silence. The misconception it encodes is the common one: that lowercasing is the normalising rule, when it is one third of it. Line&nbsp;5 is the tempting click, because <code>value_counts()</code> is what <em>conceals</em> the loss by dropping missing values by default; but it only reports, and the two numbers it leaves you &mdash; 456 against 503 &mdash; are the whole warning this program gives. Three ways to stop believing that table: <code>value_counts(dropna=False)</code>, comparing <code>len(series)</code> with <code>series.count()</code>, or making the unmatched values part of what the step returns &mdash; and only the third survives being run by a scheduler at 3&nbsp;a.m.",
          ar: "يصغّر السطر 1 الأحرف ولا شيء غير ذلك، فتبلغ <code>' gaza'</code> و<code>'&nbsp;&nbsp;gaza'</code> و<code>'gaza '</code> و<code>'rafah '</code> و<code>' rafah'</code> و<code>'khan younis '</code> دالةَ <code>.map()</code> وهي لابسةٌ مسافاتها، فلا تطابق مفتاحًا وتصير <code>NaN</code> &mdash; سبعة وأربعون صفًّا في صمت. والوهمُ الذي يحمله هو الشائع: أن التصغير هو قاعدة التطبيع، وهو ثلثها. والسطر 5 هو النقرة المغرية، لأن <code>value_counts()</code> هي ما <em>يُخفي</em> الفقد بإسقاطها القيمَ المفقودة افتراضيًّا؛ لكنها لا تفعل إلا الإبلاغ، والرقمان الذان تتركهما لك &mdash; ‏456 مقابل 503 &mdash; هما كل تحذيرٍ يعطيه هذا البرنامج. وثلاث طرق لتكفّ عن تصديق ذلك الجدول: <code>value_counts(dropna=False)</code>، أو مقارنة <code>len(series)</code> بـ<code>series.count()</code>، أو جعل القيم غير المطابقة جزءًا من مُخرَج الخطوة &mdash; والثالثة وحدها تنجو من تشغيلٍ يجريه مجدول في الثالثة فجرًا."
        }
      },

      /* ---------------------------------------------------------- 12 */
      {
        id: "t2l3q12", type: "trace", level: "medium",
        topics: ["t2-map-silent-nan"],
        q: {
          en: "The map was built by reading the top twenty rows of <code>value_counts()</code>, and two keys were never added. After the last line has run, what are the values of the four variables?",
          ar: "بُنيت الخريطة بقراءة أعلى عشرين صفًّا من <code>value_counts()</code>، ولم يُضف مفتاحان قط. فبعد تنفيذ السطر الأخير، ما قيم المتغيرات الأربعة؟"
        },
        code: code(
          "PARTIAL = {k: v for k, v in CITY_MAP.items()",
          "           if k not in (\"khan yunis\", \"jabaliya\")}      # 9 of the 11 keys",
          "",
          "norm   = raw[\"city\"].str.strip().str.lower().str.replace(r\"\\s+\", \" \", regex=True)",
          "city   = norm.map(PARTIAL)",
          "",
          "groups = city.nunique()",
          "named  = int(city.notna().sum())",
          "shown  = int(city.value_counts().sum())",
          "khan   = int((city == \"Khan Younis\").sum())"
        ),
        blanks: [
          { accept: ["5"], label: { en: "groups", ar: "groups" } },
          { accept: ["485"], label: { en: "named", ar: "named" } },
          { accept: ["485"], label: { en: "shown", ar: "shown" } },
          { accept: ["111"], label: { en: "khan", ar: "khan" } }
        ],
        hint: {
          en: "The two missing keys belong to two different cities, so no city disappears. <code>nunique()</code> and <code>value_counts()</code> have the same opinion about a missing value, and the file holds 14 rows spelled <code>Khan Yunis</code>.",
          ar: "المفتاحان الناقصان لمدينتين مختلفتين، فلا تختفي مدينة. ولـ<code>nunique()</code> و<code>value_counts()</code> الرأي نفسه في القيمة المفقودة، والملف يحمل 14 صفًّا مكتوبًا <code>Khan Yunis</code>."
        },
        explain: {
          en: "Nine keys still cover five cities, so <code>groups</code> is 5 and the <code>value_counts()</code> looks exactly like the correct one: five cities, no error, no warning. The 14 rows spelled <code>Khan Yunis</code> and the 4 spelled <code>Jabaliya</code> are now <code>NaN</code>, so <code>named</code> is 485 and <code>khan</code> is 111 rather than the 125 the full map gives. <code>shown</code> is 485 too, because <code>value_counts()</code> drops missing values by default &mdash; so the only two numbers that differ anywhere in this session are 503 and 485, and if you print just the table you will never meet them. The eighteen unnamed rows are also not a random eighteen: they are precisely the rows from whichever data-entry source used those two transliterations, so imputing the city with the mode would fill all eighteen with <code>Gaza</code> and dropping them would silently drop a sub-population.",
          ar: "تسعة مفاتيح ما زالت تغطّي خمس مدن، فتكون <code>groups</code> خمسًا وتبدو <code>value_counts()</code> تمامًا كالصحيحة: خمس مدن، لا خطأ، لا تحذير. والصفوف الأربعة عشر المكتوبة <code>Khan Yunis</code> والأربعة المكتوبة <code>Jabaliya</code> صارت <code>NaN</code>، فتكون <code>named</code> ‏485 و<code>khan</code> ‏111 بدل 125 التي تعطيها الخريطة الكاملة. و<code>shown</code> ‏485 أيضًا، لأن <code>value_counts()</code> تُسقط القيم المفقودة افتراضيًّا &mdash; فالرقمان الوحيدان المختلفان في هذه الجلسة كلها 503 و485، وإن طبعتَ الجدول وحده فلن تقابلهما قط. والصفوف الثمانية عشر غير المسمَّاة ليست ثمانية عشر عشوائيًّا أيضًا: بل هي بالضبط الصفوف الآتية من مصدر الإدخال الذي استعمل ذلك النقل الحرفي، فتعويضُ المدينة بالمنوال يعبّئ الثمانية عشر كلها بـ<code>Gaza</code>، وحذفها يحذف فئةً فرعية بصمت."
        }
      },

      /* ---------------------------------------------------------- 13 */
      {
        id: "t2l3q13", type: "mcq", level: "hard",
        topics: ["t2-measure-canonical"],
        q: {
          en: "Four predictors, each a median fitted on the training rows of the 480 deduplicated flats and scored on the same held-out 120, with the same seed. Which conclusion does the table support?",
          ar: "أربعة متنبّئين، كلٌّ منها وسيطٌ مضبوط على صفوف التدريب من الشقق الـ480 منزوعة التكرار ومُقيَّم على الصفوف المحجوزة الـ120 نفسها بالبذرة نفسها. فأيُّ استنتاجٍ يسنده الجدول؟"
        },
        code: code(
          "                          prediction  groups  MAE train  MAE held out",
          "             one median for everyone       1    61.2392       63.6726",
          "a median per raw city (26 spellings)      26    53.5735       59.4469",
          "  a median per Title-Cased city (11)      11    55.6772       58.5619",
          "     a median per canonical city (5)       5    56.0375       58.2301"
        ),
        lang: "text",
        options: [
          {
            en: "The raw city column is the best of the four: 53.5735 is the lowest error in the table, and every repair after it makes the prediction worse.",
            ar: "عمود المدينة الخام أفضل الأربعة: فـ53.5735 أدنى خطأ في الجدول، وكل إصلاح بعده يزيد التنبؤ سوءًا."
          },
          {
            en: "The canonical map is worth its trouble because it cuts the error from 63.6726 to 58.2301, a gain of 5.44 shekels a month.",
            ar: "الخريطة المعيارية تستحقّ عناءها لأنها تهبط بالخطأ من 63.6726 إلى 58.2301، أي كسب 5.44 شيكلًا في الشهر."
          },
          {
            en: "As the spellings get cleaner the training error rises and the held-out error falls &mdash; the same fact twice: 26 groups let the predictor fit noise and 5 make it fit the market. Against the raw column, which is the comparison the map has to win, the gain is 1.2 shekels.",
            ar: "بنظافة التهجئات يرتفع خطأ التدريب ويهبط الخطأ المحجوز &mdash; وهما الواقعة نفسها مرتين: فستٌّ وعشرون مجموعة تتيح للمتنبّئ أن يضبط الضجيج، وخمسٌ تجعله يضبط السوق. وفي مقابل العمود الخام، وهي المقارنة التي على الخريطة أن تكسبها، يكون الكسب 1.2 شيكل."
          },
          {
            en: "Title Case is the best compromise: it is within 0.33 of the canonical map held out, so it buys almost all of the accuracy for one method call instead of eleven dictionary keys.",
            ar: "‏Title Case أفضل حلٍّ وسط: فهي في حدود 0.33 من الخريطة المعيارية على المحجوزة، فتشتري جُلّ الدقّة بنداء تابعٍ واحد بدل أحد عشر مفتاح قاموس."
          }
        ],
        answer: 2,
        hint: {
          en: "Read the two numeric columns together and in opposite directions. Then ask which row the map is actually competing against &mdash; and what 0.33 is worth beside a ruler whose own noise this chapter measured at about 1.5 shekels.",
          ar: "اقرأ العمودين الرقميين معًا وفي اتجاهين متعاكسين. ثم اسأل أيَّ سطرٍ تنافس الخريطةُ فعلًا &mdash; وكم تساوي 0.33 بجانب مسطرةٍ قاس هذا الفصل ضجيجها بنحو 1.5 شيكل."
        },
        explain: {
          en: "The training column gets <em>worse</em> as the spellings get cleaner, 53.57 to 56.04, and the held-out column gets <em>better</em>, 59.45 to 58.23. Both movements are one fact: twenty-six groups let the model fit noise, five groups make it fit the market. Reading 53.5735 off the training column is the single mistake this chapter is built to prevent. The 5.44-shekel answer takes the gain from the wrong baseline: one median for everyone is not what you would have shipped, the raw-city median is, and against <em>it</em> the map is worth 1.2 &mdash; real, and smaller than it sounds. Title Case genuinely sits in the middle and is honest about it, and it is still 0.33 worse held out, with the extra defect that seven of its eleven labels are spellings nothing else in the system recognises. The reason to do the work anyway is not in this table at all: the map is what makes the column <em>joinable</em> to <code>city_reference.csv</code>, <em>encodable</em> into five stable columns rather than twenty-six unstable ones, and <em>comparable</em> with next month's file.",
          ar: "يسوء عمود التدريب بنظافة التهجئات، من 53.57 إلى 56.04، ويتحسّن العمود المحجوز، من 59.45 إلى 58.23. والحركتان واقعة واحدة: ستٌّ وعشرون مجموعة تتيح للنموذج أن يضبط الضجيج، وخمسٌ تجعله يضبط السوق. وقراءةُ 53.5735 من عمود التدريب هي الخطأ الواحد الذي بُني هذا الفصل ليمنعه. وجوابُ 5.44 يأخذ الكسب من خطٍّ قاعدي خاطئ: فوسيطٌ واحد للجميع ليس ما كنت ستسلّمه، بل وسيطُ المدينة الخام هو ذاك، وفي مقابل <em>هذا الأخير</em> تساوي الخريطة 1.2 &mdash; وهو حقيقي وأصغر مما يبدو. وتقع Title Case في الوسط فعلًا وبأمانة، وهي مع ذلك أسوأ بـ0.33 على المحجوزة، مع العيب الزائد بأن سبعًا من تسمياتها الإحدى عشرة تهجئاتٌ لا يعرفها شيء آخر في النظام. وسببُ أداء العمل على أي حال ليس في هذا الجدول أصلًا: فالخريطة هي ما يجعل العمود <em>قابلًا للدمج</em> بـ<code>city_reference.csv</code>، و<em>قابلًا للترميز</em> في خمسة أعمدة مستقرّة بدل ستٍّ وعشرين غير مستقرّة، و<em>قابلًا للمقارنة</em> بملف الشهر القادم."
        }
      },

      /* ---------------------------------------------------------- 14 */
      {
        id: "t2l3q14", type: "tf", level: "easy",
        topics: ["t2-truthiness"],
        q: {
          en: "<code>furnished</code> is a yes-or-no question written twelve ways, and 334 of the 503 flats say no. True or false: this output holds no evidence of a bug &mdash; <code>astype(bool)</code> was asked for a boolean column and returned one, with the dtype requested and all 503 rows present, so the only way to find the problem is to go back and read the raw column.",
          ar: "عمود <code>furnished</code> سؤال نعم أو لا مكتوبٌ باثنتي عشرة صورة، و334 من الشقق الـ503 تقول لا. صح أم خطأ: هذا المخرج لا يحمل دليلًا على عطب &mdash; فقد طُلب من <code>astype(bool)</code> عمودٌ منطقي فأعادته، بالنوع المطلوب وبالصفوف الـ503 كلها، فلا سبيل إلى العثور على المشكلة إلا بالرجوع إلى العمود الخام وقراءته."
        },
        code: code(
          "flag = raw[\"furnished\"].astype(bool)",
          "print(\"dtype:\", flag.dtype)",
          "print(flag.value_counts().to_string())",
          "",
          "# dtype: bool",
          "# furnished",
          "# True    503"
        ),
        truth: false,
        hint: {
          en: "Count the lines of the <code>value_counts()</code>, and ask how often a real yes-or-no answer from 503 landlords is unanimous.",
          ar: "عُدّ أسطر <code>value_counts()</code>، واسأل كم مرة يكون جوابُ نعم أو لا الحقيقي من 503 مالكين بالإجماع."
        },
        explain: {
          en: "False: the evidence is right there, and it is the <code>value_counts()</code> with a single row in it. A boolean column whose <code>value_counts()</code> has one entry is almost always a bug, because real yes/no data is rarely unanimous &mdash; and &ldquo;every row is <code>True</code>&rdquo; is exactly what truthiness looks like from the outside. <code>astype(bool)</code> applies Python's rule for turning any object into a boolean: a string is <code>False</code> if it is empty and <code>True</code> otherwise, a rule about <em>length</em> and not about meaning, so <code>bool(\"no\")</code>, <code>bool(\"0\")</code> and <code>bool(\"FALSE\")</code> are all <code>True</code>. Three hundred and thirty-four flats have just been declared furnished, and the second-order damage is worse than the first: a constant column has zero variance, so it survives every correlation check, every <code>describe()</code> and every feature-importance plot by sitting at exactly zero, and gets quietly ignored rather than questioned.",
          ar: "خطأ: فالدليل هناك، وهو <code>value_counts()</code> وفيها سطر واحد. فالعمودُ المنطقي الذي فيه <code>value_counts()</code> بمدخل واحد عطبٌ في الغالب الأعمّ، لأن بيانات نعم/لا الحقيقية قلّما تكون بالإجماع &mdash; و«كل صف <code>True</code>» هو بالضبط ما تبدو عليه الصدقية من الخارج. وتطبّق <code>astype(bool)</code> قاعدةَ بايثون في تحويل أي كائن إلى منطقي: فالسلسلة النصية <code>False</code> إن كانت فارغة و<code>True</code> فيما سوى ذلك، وهي قاعدة عن <em>الطول</em> لا عن المعنى، فتكون <code>bool(\"no\")</code> و<code>bool(\"0\")</code> و<code>bool(\"FALSE\")</code> كلها <code>True</code>. فثلاثمئة وأربع وثلاثون شقة أُعلن الآن أنها مفروشة، والضرر من الدرجة الثانية أسوأ من الأول: فالعمود الثابت تباينه صفر، فينجو من كل فحص ارتباط وكل <code>describe()</code> وكل رسم أهمية خصائص بجلوسه على الصفر بالضبط، ويُتجاهل بهدوء لا أن يُسأل عنه."
        }
      },

      /* ---------------------------------------------------------- 15 */
      {
        id: "t2l3q15", type: "complete", level: "medium",
        topics: ["t2-bool-mapping", "t2-nullable-boolean"],
        q: {
          en: "The twelve spellings have been normalised and mapped, and <code>unmatched</code> is empty. Complete the line so that the program prints the wanted output &mdash; then notice how much of it the nearest wrong completion also gets right.",
          ar: "طُبّعت التهجئات الاثنتا عشرة ورُبطت، و<code>unmatched</code> فارغة. أكمل السطر ليطبع البرنامج المخرج المطلوب &mdash; ثم لاحظ كم منه يصيب أقربُ إكمالٍ خاطئ."
        },
        code: code(
          "BOOL_MAP = {\"yes\": True, \"y\": True, \"1\": True, \"true\": True, \"t\": True,",
          "            \"no\": False, \"n\": False, \"0\": False, \"false\": False, \"f\": False}",
          "",
          "furnished, unmatched = canonicalise(raw[\"furnished\"], BOOL_MAP)",
          "furnished = ____",
          "",
          "print(\"dtype: %s | true %d | false %d | unknown %d\"",
          "      % (furnished.dtype, int((furnished == True).sum()),",
          "         int((furnished == False).sum()), int(furnished.isna().sum())))",
          "print(\"(~furnished).sum():\", int((~furnished).sum()))",
          "",
          "# wanted:  dtype: boolean | true 169 | false 334 | unknown 0",
          "#          (~furnished).sum(): 334"
        ),
        options: [
          { code: "furnished.astype(\"boolean\")" },
          { code: "furnished.astype(bool)" },
          { code: "furnished.notna().astype(\"boolean\")" },
          { code: "furnished.map({\"yes\": True, \"no\": False}).astype(\"boolean\")" }
        ],
        answer: 0,
        solution: {
          code: "furnished = furnished.astype(\"boolean\")",
          out: "dtype: boolean | true 169 | false 334 | unknown 0\n(~furnished).sum(): 334",
          en: "Capital B. <code>boolean</code> is the nullable dtype, and asking for it by name is what stops the type of your column depending on this month's data.",
          ar: "بحرف B كبير. فـ<code>boolean</code> هو النوع القابل للفراغ، وطلبُه بالاسم هو ما يمنع نوعَ عمودك من أن يتوقف على بيانات هذا الشهر."
        },
        hint: {
          en: "Two of the four completions answer a different question entirely and their counts show it. Of the two that are left, read the very first word of the wanted output.",
          ar: "اثنان من الإكمالات الأربعة يجيبان سؤالًا آخر تمامًا وتُظهر ذلك أعدادُهما. وأما الباقيان فاقرأ أولَ كلمة في المخرج المطلوب."
        },
        explain: {
          en: "<code>canonicalise</code> has already done the work: the twelve spellings normalise to eight values, ten dictionary keys cover all eight, and the result is 169 furnished and 334 not &mdash; 33.6%, the first number in this concept you can defend. The completion that differs from the right one by a single letter is the instructive one: <code>astype(bool)</code> prints the same three counts and the same <code>334</code>, and fails on one word, <code>dtype: bool</code>. That word is the lesson. <code>.map()</code> infers its dtype from what it happened to produce, so the type of your column depends on this month's data: remove two keys and the same line returns <code>object</code>, where <code>~furnished</code> raises <code>TypeError</code> and <code>astype(bool)</code> quietly reports 273 furnished flats. <code>boolean</code> is <code>boolean</code> whether the map covered everything or not, and because it admits a third state a spelling the map does not hold stays visibly <code>&lt;NA&gt;</code> instead of being forced to a verdict. Of the other two, <code>notna()</code> answers &ldquo;did the map match?&rdquo; and reports 503 furnished flats, and mapping an already-boolean column with string keys reports 503 unknowns.",
          ar: "أدّت <code>canonicalise</code> العملَ أصلًا: فالتهجئات الاثنتا عشرة تُطبَّع إلى ثماني قيم، ويغطي عشرة مفاتيح قاموس الثمانيَ كلها، والنتيجة 169 مفروشة و334 غير مفروشة &mdash; أي 33.6%، وهو أول رقم في هذا المفهوم تستطيع الدفاع عنه. والإكمالُ الذي يختلف عن الصحيح بحرف واحد هو المعلِّم: فـ<code>astype(bool)</code> تطبع الأعداد الثلاثة نفسها و<code>334</code> نفسها، وتفشل في كلمة واحدة هي <code>dtype: bool</code>. وتلك الكلمة هي الدرس. فـ<code>.map()</code> تستنبط نوعها من الذي أنتجته اتفاقًا، فيتوقف نوع عمودك على بيانات هذا الشهر: احذف مفتاحين فيعيد السطر نفسه <code>object</code>، حيث ترفع <code>~furnished</code> خطأ <code>TypeError</code> وتُبلّغ <code>astype(bool)</code> بهدوء عن 273 شقة مفروشة. و<code>boolean</code> هو <code>boolean</code> سواء غطّت الخريطة كل شيء أم لا، ولأنه يقبل حالة ثالثة تبقى التهجئة التي لا تحملها الخريطة <code>&lt;NA&gt;</code> ظاهرةً لا مُكرَهةً على حكم. وأما الآخران فـ<code>notna()</code> تجيب «هل طابقت الخريطة؟» وتُبلّغ عن 503 شقق مفروشة، وربطُ عمودٍ منطقيٍّ أصلًا بمفاتيح نصية يُبلّغ عن 503 مجاهيل."
        }
      },

      /* ---------------------------------------------------------- 16 */
      {
        id: "t2l3q16", type: "mcq", level: "hard",
        topics: ["t2-nullable-boolean", "t2-truthiness"],
        q: {
          en: "Both lines use the same two-key map, written by eye after reading the top four rows of <code>value_counts()</code>. Which statement explains the two outputs?",
          ar: "السطران يستعملان خريطةَ المفتاحين نفسها، مكتوبةً بالنظر بعد قراءة أعلى أربعة صفوف من <code>value_counts()</code>. فأيُّ عبارةٍ تفسّر المخرجَين؟"
        },
        code: code(
          "PARTIAL = {\"yes\": True, \"no\": False}",
          "norm = raw[\"furnished\"].astype(\"string\").str.strip().str.lower()",
          "",
          "a = norm.map(PARTIAL).astype(\"boolean\")",
          "b = norm.map(PARTIAL).astype(bool)",
          "",
          "print(\"a:\", int((a == True).sum()), int((a == False).sum()), int(a.isna().sum()))",
          "print(\"b:\", int(b.sum()), \"of\", len(b))",
          "",
          "# a: 119 230 154",
          "# b: 273 of 503"
        ),
        options: [
          {
            en: "<code>astype(bool)</code> re-reads the original strings and applies truthiness to them a second time, which is why its count is the higher of the two.",
            ar: "‏<code>astype(bool)</code> تعيد قراءة السلاسل النصية الأصلية وتطبّق عليها الصدقية مرة ثانية، ولهذا كان عددها الأعلى."
          },
          {
            en: "<code>bool</code> stores two states and <code>boolean</code> three. The 154 values the map does not hold are <code>&lt;NA&gt;</code> in <code>a</code>, and <code>astype(bool)</code> resolves them by truthiness &mdash; <code>bool(nan)</code> is <code>True</code> &mdash; so <code>119 + 154 = 273</code>, with no error and no warning.",
            ar: "‏<code>bool</code> يحفظ حالتين و<code>boolean</code> ثلاثًا. فالقيم الـ154 التي لا تحملها الخريطة هي <code>&lt;NA&gt;</code> في <code>a</code>، وتحلّها <code>astype(bool)</code> بالصدقية &mdash; فـ<code>bool(nan)</code> هي <code>True</code> &mdash; فتكون <code>119 + 154 = 273</code>، بلا خطأ وبلا تحذير."
          },
          {
            en: "<code>astype(bool)</code> fills the unknowns with the commonest value among the rows the map did match, and in <code>a</code> that value is <code>True</code>.",
            ar: "‏<code>astype(bool)</code> تعبّئ المجاهيل بأكثر القيم تكرارًا بين الصفوف التي طابقتها الخريطة، وتلك القيمة في <code>a</code> هي <code>True</code>."
          },
          {
            en: "Both columns hold the same 273 <code>True</code> values and differ only in the sum, because <code>boolean</code> leaves <code>&lt;NA&gt;</code> out of <code>sum()</code> while <code>bool</code> counts it as 1.",
            ar: "العمودان يحملان القيم الـ273 <code>True</code> نفسها ولا يختلفان إلا في المجموع، لأن <code>boolean</code> يُخرج <code>&lt;NA&gt;</code> من <code>sum()</code> و<code>bool</code> يعدّها 1."
          }
        ],
        answer: 1,
        hint: {
          en: "Add two of the three numbers on the first line and compare the total with the second line. Then ask what Python thinks a floating-point <code>nan</code> is worth as a yes-or-no answer.",
          ar: "اجمع رقمين من الأرقام الثلاثة في السطر الأول وقارن المجموع بالسطر الثاني. ثم اسأل كم يرى بايثون أن <code>nan</code> العشرية تساوي جوابًا بنعم أو لا."
        },
        explain: {
          en: "<code>119 + 154 = 273</code> is the arithmetic, and the mechanism is that <code>.map()</code> left the six unmatched spellings as <code>NaN</code> &mdash; a float, whose truth value is <code>True</code> because it is not zero. So the partial map's honest unknowns become confident yeses, and the dtype you asked for is exactly the dtype you got. The option that credits <code>astype(bool)</code> with re-reading the strings is the tempting one, because the number really does climb back towards 503; nothing is re-read, and by the time <code>astype</code> runs the strings are gone and all that is left is 119 <code>True</code>, 230 <code>False</code> and 154 <code>NaN</code>. The option about the commonest value is refuted by the first line alone, where the majority of the matched rows is <code>False</code>. The honest answer for an unrecognised value is &ldquo;I do not know whether this flat is furnished&rdquo;, and <code>bool</code> has no way to say it &mdash; which is the whole case for a nullable dtype. Keep the near-miss too: <code>astype(bool)</code> after a <em>complete</em> map is harmless, because truthiness on real <code>True</code> and <code>False</code> is the identity. It is unsafe exactly where a <code>NaN</code> survives, which is the case you cannot rule out in advance.",
          ar: "‏<code>119 + 154 = 273</code> هو الحساب، والآليةُ أن <code>.map()</code> تركت التهجئات الستّ غير المطابقة <code>NaN</code> &mdash; وهي عددٌ عشري قيمته الصدقية <code>True</code> لأنها ليست صفرًا. فتصير مجاهيلُ الخريطة الجزئية الأمينة نعماتٍ واثقة، والنوعُ الذي طلبتَه هو بالضبط النوع الذي حصلت عليه. والخيارُ الذي ينسب إلى <code>astype(bool)</code> إعادةَ قراءة السلاسل هو المغري، لأن الرقم يصعد فعلًا نحو 503؛ ولا شيء يُعاد قراءته، فحين تعمل <code>astype</code> تكون السلاسل قد ذهبت ولم يبقَ إلا 119 <code>True</code> و230 <code>False</code> و154 <code>NaN</code>. والخيارُ عن أكثر القيم تكرارًا ينقضه السطر الأول وحده، إذ أغلبيةُ الصفوف المطابَقة <code>False</code>. والجوابُ الأمين للقيمة غير المعروفة هو «لا أعرف هل هذه الشقة مفروشة»، ولا سبيل لـ<code>bool</code> أن يقوله &mdash; وهذه هي الحجّة كلها للنوع القابل للفراغ. واحفظ القريبَ من الصواب أيضًا: فـ<code>astype(bool)</code> بعد خريطة <em>كاملة</em> غير ضارّة، لأن الصدقية على <code>True</code> و<code>False</code> الحقيقيتين هي المحايدة. وهي غير آمنة بالضبط حيث تنجو <code>NaN</code>، وهذه هي الحالة التي لا تستطيع استبعادها مقدَّمًا."
        }
      },

      /* ---------------------------------------------------------- 17 */
      {
        id: "t2l3q17", type: "output", level: "easy",
        topics: ["t2-advert-templates", "t2-text-flags", "t2-repost-flag"],
        q: {
          en: "<code>advert</code> is the column nobody knows what to do with: a sentence, so it cannot be averaged, and 47 distinct values for 503 rows, so <code>get_dummies</code> would make 47 of them. Write exactly what the program prints.",
          ar: "عمود <code>advert</code> هو العمود الذي لا يعرف أحد ما يفعل به: جملةٌ، فلا يمكن حساب متوسطه، وسبعٌ وأربعون قيمة مميّزة لـ503 صفوف، فكانت <code>get_dummies</code> ستصنع سبعة وأربعين عمودًا. اكتب بالضبط ما يطبعه البرنامج."
        },
        code: code(
          "a   = raw[\"advert\"]",
          "txt = a.str.strip().str.replace(r\"\\s+\", \" \", regex=True)",
          "low = txt.str.lower()",
          "",
          "print(a.nunique())",
          "print(a.str.strip().nunique())",
          "print(txt.nunique())",
          "print(int(low.str.contains(\"still available\").sum()))",
          "print(raw.loc[low.str.contains(\"still available\"), \"listing_id\"].nunique())"
        ),
        blanks: [
          { accept: ["47\n22\n14\n9\n9"], lines: 5 }
        ],
        hint: {
          en: "The first three lines take one column through the two halves of the normalising rule, and here it is the <em>collapse</em> that does the work. The last two lines are counting something you met in Concept&nbsp;1.",
          ar: "الأسطر الثلاثة الأولى تأخذ عمودًا واحدًا عبر شقَّي قاعدة التطبيع، و<em>الضغط</em> هنا هو الذي يؤدّي العمل. والسطران الأخيران يعدّان شيئًا قابلتَه في المفهوم 1."
        },
        explain: {
          en: "Stripping takes 47 spellings to 22 and collapsing inner runs of whitespace takes 22 to 14: eight of the 22 differed from another only by a double space in the middle of a sentence. So the column is not free text at all. It is eight advert templates the site offers, each used between 49 and 73 times, plus six of them with <code>&nbsp;- still available</code> appended on a repost &mdash; and the first thing to do with a text column is normalise it and count, because a column that looks like prose is often a short list of templates. The last two lines are the lesson's best piece of evidence: a flag that reads four words of English finds 9 rows covering 9 flats, which are exactly the nine reposts the identifier-based dedupe found by comparing <code>listing_id</code> across rows. Two completely independent methods naming the same nine flats confirms the dedupe and validates the regular expression at once.",
          ar: "يأخذ التشذيبُ سبعًا وأربعين تهجئة إلى اثنتين وعشرين، ويأخذ ضغطُ سلاسل المسافات الداخلية الاثنتين والعشرين إلى أربع عشرة: فثمانٍ من الاثنتين والعشرين لم تختلف عن غيرها إلا بمسافة مزدوجة في وسط الجملة. فليس العمود نصًّا حرًّا أصلًا، بل ثمانيَ قوالب إعلان يعرضها الموقع، يُستعمل كلٌّ منها بين 49 و73 مرة، وستّة منها بإلحاق <code>&nbsp;- still available</code> عند إعادة النشر &mdash; وأول ما تفعله بعمود نصي أن تطبّعه وتعدّ، لأن العمود الذي يبدو نثرًا كثيرًا ما يكون قائمةً قصيرة من القوالب. والسطران الأخيران أفضل دليلٍ في الدرس: فعلمٌ يقرأ أربع كلمات إنجليزية يجد 9 صفوف تغطي 9 شقق، وهي بالضبط إعادات النشر التسع التي وجدها حذفُ المكرّر بالمعرّف بمقارنة <code>listing_id</code> بين الصفوف. واتفاق طريقتين مستقلتين تمامًا على تسمية الشقق التسع نفسها يؤكد حذف المكرّر ويتحقّق من التعبير النمطي في آن."
        }
      },

      /* ---------------------------------------------------------- 18 */
      {
        id: "t2l3q18", type: "error", level: "hard",
        topics: ["t2-coercion", "t2-mixed-type-column"],
        q: {
          en: "<code>floor</code> holds the digits 0 to 6 for 475 flats, the letter <code>G</code> for nineteen and nothing at all for nine. The step should translate the nineteen by a recorded rule. It runs, prints, and disagrees with itself. Click the offending line.",
          ar: "يحمل <code>floor</code> الأرقام من 0 إلى 6 لـ475 شقة، والحرف <code>G</code> لتسع عشرة، ولا شيء أصلًا لتسع. وينبغي للخطوة أن تترجم التسعة عشر بقاعدة مسجَّلة. وهي تعمل وتطبع وتخالف نفسها. انقر السطر المخطئ."
        },
        code: code(
          "FLOOR_WORDS = {\"g\": 0, \"ground\": 0}          # a DOMAIN decision: ground is floor zero",
          "s = raw[\"floor\"].astype(\"string\").str.strip().str.lower()",
          "floor = pd.to_numeric(s, errors=\"coerce\").astype(\"Int64\")",
          "was_word = s.isin(FLOOR_WORDS)",
          "out = raw.assign(floor=floor, floor_from_word=was_word)",
          "print(int(out[\"floor\"].isna().sum()), int((out[\"floor\"] == 0).sum()), int(was_word.sum()))",
          "print(\"mean floor:\", round(float(out[\"floor\"].mean()), 4))",
          "",
          "# 28 60 19",
          "# mean floor: 2.6126"
        ),
        answer: 3,
        solution: {
          code: code(
            "FLOOR_WORDS = {\"g\": 0, \"ground\": 0}",
            "WORDS_AND_DIGITS = dict(FLOOR_WORDS, **{str(i): i for i in range(0, 20)})",
            "s = raw[\"floor\"].astype(\"string\").str.strip().str.lower()",
            "floor, unmatched = canonicalise(raw[\"floor\"], WORDS_AND_DIGITS)   # translate, do not coerce",
            "floor = floor.astype(\"Int64\")                                     # declare the dtype",
            "was_word = s.isin(FLOOR_WORDS)",
            "out = raw.assign(floor=floor, floor_from_word=was_word)",
            "print(int(out[\"floor\"].isna().sum()), int((out[\"floor\"] == 0).sum()), int(was_word.sum()))",
            "print(\"mean floor:\", round(float(out[\"floor\"].mean()), 4))"
          ),
          out: "9 79 19\nmean floor: 2.5121",
          en: "The word has to be translated <em>before</em> the numeric conversion, by the dictionary that was declared for exactly that purpose &mdash; and then the nine missing values are the nine blank cells the file actually has, the ground floor is a real group of 79, and the mean falls to 2.5121, which is lower and right.",
          ar: "يجب أن تُترجم الكلمة <em>قبل</em> التحويل الرقمي، بالقاموس الذي أُعلن لهذا الغرض بالضبط &mdash; فتكون القيم المفقودة التسع هي الخلايا الفارغة التسع التي في الملف فعلًا، ويكون الطابق الأرضي مجموعةً حقيقية من 79، ويهبط المتوسط إلى 2.5121، وهو أدنى وصحيح."
        },
        hint: {
          en: "Three numbers are printed and two of them contradict the third. Which line had the chance to use <code>FLOOR_WORDS</code> and did not take it?",
          ar: "تُطبع ثلاثة أرقام واثنان منها ينقضان الثالث. فأيُّ سطرٍ كانت عنده فرصة استعمال <code>FLOOR_WORDS</code> ولم يأخذها؟"
        },
        explain: {
          en: "Line&nbsp;3 converts the normalised text straight to numbers, so <code>errors=\"coerce\"</code> turns all nineteen <code>G</code>s into missing values: <code>FLOOR_WORDS</code> is declared on line&nbsp;1 and consulted only by the flag on line&nbsp;4, so the output claims nineteen rows were derived from a word while the column shows no sign of them. Coercion has merged two completely different kinds of ignorance &mdash; nine cells where nobody recorded a floor and nineteen where somebody recorded it clearly as the ground floor &mdash; and after this line you can no longer tell them apart. The ground-floor population is understated by 24%, 60 instead of 79, and the mean is 2.6126 instead of 2.5121, wrong in a direction you can predict, because the storey the conversion systematically excludes is the lowest one. Line&nbsp;4 is the tempting click, since it is the line whose number disagrees with the column; it is the only line in the program telling the truth, and without it nothing here would look wrong at all. The discipline that catches this in general: compare the blank count <em>before</em> a conversion with the missing count <em>after</em> it, and the difference is what the conversion destroyed.",
          ar: "يحوّل السطر 3 النصَّ المُطبَّع إلى أرقام مباشرةً، فتحوّل <code>errors=\"coerce\"</code> الـ<code>G</code>ات التسعة عشر كلها إلى قيم مفقودة: فـ<code>FLOOR_WORDS</code> معلَنة في السطر 1 ولا يستشيرها إلا العَلَم في السطر 4، فيدّعي المخرج أن تسعة عشر صفًّا استُنبطت من كلمة والعمودُ لا يُظهر منها أثرًا. وقد دمج الإكراه نوعين مختلفين تمامًا من الجهل &mdash; تسع خلايا لم يسجّل فيها أحد طابقًا، وتسع عشرة سجّله فيها أحدٌ صريحًا أنه الأرضي &mdash; وبعد هذا السطر لم تعد تستطيع التفريق بينهما. ويَنقُص سكان الطابق الأرضي 24%، ‏60 بدل 79، والمتوسط 2.6126 بدل 2.5121، وهو خاطئ في اتجاه تستطيع التنبؤ به، لأن الطبقة التي يستثنيها التحويل منهجيًّا هي أدناها. والسطر 4 هو النقرة المغرية، إذ هو السطر الذي يخالف رقمُه العمودَ؛ وهو السطر الوحيد في البرنامج الذي يقول الصدق، ولولاه لما بدا شيءٌ هنا خاطئًا أصلًا. والانضباطُ الذي يقتنص هذا عمومًا: قارن عددَ الفراغ <em>قبل</em> التحويل بعدد المفقود <em>بعده</em>، والفرقُ هو ما أهلكه التحويل."
        }
      },

      /* ---------------------------------------------------------- 19 */
      {
        id: "t2l3q19", type: "contrast", level: "medium",
        topics: ["t2-nullable-int", "t2-floor-decision"],
        q: {
          en: "Two repairs of the same mixed-type column. Place each statement under the coercion, under the recorded repair, or under both.",
          ar: "إصلاحان للعمود المختلط الأنواع نفسه. ضع كل عبارة تحت الإكراه أو تحت الإصلاح المسجَّل أو تحت كليهما."
        },
        concepts: [
          {
            en: "<code>pd.to_numeric(raw[\"floor\"], errors=\"coerce\")</code>",
            ar: "‏<code>pd.to_numeric(raw[\"floor\"], errors=\"coerce\")</code>"
          },
          {
            en: "the recorded repair: <code>FLOOR_WORDS</code>, then <code>astype(\"Int64\")</code>, then a <code>floor_from_word</code> flag",
            ar: "الإصلاح المسجَّل: <code>FLOOR_WORDS</code> ثم <code>astype(\"Int64\")</code> ثم علمُ <code>floor_from_word</code>"
          }
        ],
        rows: [
          {
            s: {
              en: "Returns a column you can sort, compare and average",
              ar: "يعيد عمودًا تستطيع ترتيبه ومقارنته وحساب متوسطه"
            },
            a: 2
          },
          {
            s: {
              en: "Raises nothing, warns about nothing, and changes no row count",
              ar: "لا يرفع شيئًا ولا يحذّر من شيء ولا يغيّر عدد صفوف"
            },
            a: 2
          },
          {
            s: {
              en: "Leaves 28 missing floors, nineteen of which are facts somebody recorded",
              ar: "يترك 28 طابقًا مفقودًا، تسعة عشر منها وقائعُ سجّلها أحد"
            },
            a: 0
          },
          {
            s: {
              en: "Prints a floor as <code>2.0</code>, which is a different dictionary key from <code>2</code> when Lesson&nbsp;5 comes to encode it",
              ar: "يطبع الطابق <code>2.0</code>، وهو مفتاح قاموس يخالف <code>2</code> حين يأتي الدرس 5 لترميزه"
            },
            a: 0
          },
          {
            s: {
              en: "Counts 79 ground-floor flats instead of 60, and moves the mean floor from 2.6126 to 2.5121",
              ar: "يعدّ 79 شقة أرضية بدل 60، وينقل متوسط الطابق من 2.6126 إلى 2.5121"
            },
            a: 1
          },
          {
            s: {
              en: "Holds a genuine <code>&lt;NA&gt;</code>, so the nine blank cells of the file stay nine",
              ar: "يحمل <code>&lt;NA&gt;</code> حقيقية، فتبقى الخلايا الفارغة التسع في الملف تسعًا"
            },
            a: 1
          },
          {
            s: {
              en: "Puts the rule it applied into the output, so a reviewer who disagrees can filter the derived rows out and redo the analysis without them",
              ar: "يضع القاعدة التي طبّقها في المخرج، فيستطيع المراجع الذي لا يوافق أن يُرشّح الصفوف المستنبطة ويُعيد التحليل بدونها"
            },
            a: 1
          }
        ],
        hint: {
          en: "Two of the seven are true of any conversion that succeeds, which is exactly why neither of them is a check. For the other five, ask what each version does with the nineteen <code>G</code>s.",
          ar: "اثنان من السبعة صحيحان في أي تحويل ينجح، ولهذا بالضبط ليس أيٌّ منهما فحصًا. وأما الخمسة الأخرى فاسأل ماذا تفعل كل نسخة بالـ<code>G</code>ات التسعة عشر."
        },
        explain: {
          en: "Both calls make the column numeric and neither complains, which is the problem: &ldquo;it ran&rdquo; is not evidence. Coercion is the policy of turning every failure into a missing value, so it merges nine cells nobody filled in with nineteen somebody filled in clearly, the count of missing floors triples, and the one storey the data systematically loses is the ground floor. The repair's three parts each answer one defect: the named dictionary translates the word, so <code>G &rarr; 0</code> is a decision a reader can see rather than an invention &mdash; and it is defensible precisely because sixty rows already record the ground floor as the number zero, so the file itself shows you the convention. <code>astype(\"Int64\")</code> states the type instead of accepting the <code>float64</code> that prints <code>2.0</code>. And the provenance flag turns an irreversible loss into a reversible one, which is usually the right trade. Note what the repair does <em>not</em> fix: nine floors are still genuinely unknown, and that is Lesson&nbsp;2's problem, not this one's.",
          ar: "النداءان يجعلان العمود رقميًّا ولا يشتكي أيٌّ منهما، وهذه هي المشكلة: فـ«قد عمل» ليس دليلًا. والإكراهُ سياسةُ تحويل كل عطل إلى قيمة مفقودة، فيدمج تسع خلايا لم يملأها أحد بتسع عشرة ملأها أحدٌ صريحًا، ويتضاعف عدد الطوابق المفقودة ثلاث مرات، وتكون الطبقة الواحدة التي تفقدها البيانات منهجيًّا هي الطابق الأرضي. وأجزاءُ الإصلاح الثلاثة يجيب كلٌّ منها عيبًا: فالقاموس المسمّى يترجم الكلمة، فتكون <code>G &rarr; 0</code> قرارًا يراه القارئ لا اختلاقًا &mdash; وهو قابل للدفاع بالضبط لأن ستين صفًّا تسجّل الطابق الأرضي بالرقم صفر أصلًا، فالملف نفسه يُظهر لك العرف. و<code>astype(\"Int64\")</code> تذكر النوع بدل قبول <code>float64</code> الذي يطبع <code>2.0</code>. وعلمُ المنشأ يحوّل فقدًا لا يُعكَس إلى فقدٍ يُعكَس، وهذه هي المقايضة الصحيحة عادةً. ولاحظ ما <em>لا</em> يصلحه الإصلاح: تسعة طوابق ما زالت مجهولة فعلًا، وهذه مشكلة الدرس 2 لا مشكلة هذا الدرس."
        }
      },

      /* ---------------------------------------------------------- 20 */
      {
        id: "t2l3q20", type: "fill", level: "medium",
        topics: ["t2-ordered-category"],
        q: {
          en: "<code>condition</code> is the strongest predictor of rent in this file and it is a word, arriving in fourteen non-blank spellings plus thirty-six blanks. Fill in the three blanks so that the program prints the commented output.",
          ar: "عمود <code>condition</code> أقوى متنبّئ بالإيجار في هذا الملف وهو كلمة، يصل بأربع عشرة صورة إملائية غير فارغة مع ستٍّ وثلاثين فارغة. املأ الفراغات الثلاثة ليطبع البرنامج المخرج الذي في التعليق."
        },
        code: code(
          "COND_ORDER = [\"poor\", \"fair\", \"good\", \"excellent\"]",
          "",
          "level, unmatched = canonicalise(raw[\"condition\"], {c: c for c in ____1____})",
          "level = level.astype(pd.CategoricalDtype(COND_ORDER, ordered=____2____))",
          "",
          "print(\"dtype:\", level.dtype, \"| levelled:\", int(level.notna().sum()),",
          "      \"| blank:\", int(level.isna().sum()), \"| unmatched:\", dict(unmatched) or \"none\")",
          "print(\"rows that are good or better:\", int((level > \"____3____\").sum()))",
          "",
          "# dtype: category | levelled: 467 | blank: 36 | unmatched: none",
          "# rows that are good or better: 267"
        ),
        blanks: [
          { accept: ["COND_ORDER"] },
          { accept: ["True"] },
          { accept: ["fair"] }
        ],
        hint: {
          en: "The map for this column is the identity on its levels, so the first blank is a list you have already named. The last blank is a boundary rather than a level: &ldquo;good or better&rdquo; is everything strictly above the rung below it.",
          ar: "خريطةُ هذا العمود هي المحايدة على مستوياته، فالفراغ الأول قائمةٌ سمّيتَها أصلًا. والفراغ الأخير حدٌّ لا مستوى: فـ«جيد أو أفضل» هو كل ما فوق الدرجة التي تحته تمامًا."
        },
        explain: {
          en: "The mapping is <code>{c: c for c in COND_ORDER}</code> &mdash; the identity on the four levels, which is all a canonical map needs to be when the normalised spellings already <em>are</em> the names you want. Fourteen spellings fold onto four levels with nothing unmatched, and the thirty-six blanks stay blank because a missing condition is missing: the mapping had nothing to say about it and correctly said nothing. <code>ordered=True</code> is what makes the last line legal. <code>level &gt; \"fair\"</code> works because the dtype carries the order you declared; on a plain <code>category</code> the same expression raises <code>TypeError: Unordered Categoricals can only compare equality or not</code>, and on a <code>string</code> column it answers lexicographically, where <code>\"poor\" &gt; \"fair\"</code> is <code>True</code> because <code>p</code> comes after <code>f</code> &mdash; a lie that never raises. And note what the order <em>is</em>: the codes 0 to 3, which is why Lesson&nbsp;5 has to pin the order down before encoding and why inserting <code>very good</code> between <code>good</code> and <code>excellent</code> is a schema change dressed as a data change.",
          ar: "الخريطة هي <code>{c: c for c in COND_ORDER}</code> &mdash; أي المحايدة على المستويات الأربعة، وهذا كل ما تحتاج الخريطةُ المعيارية أن تكونه حين تكون التهجئاتُ المُطبَّعة <em>هي</em> الأسماء التي تريدها أصلًا. فتنطوي أربع عشرة تهجئة على أربعة مستويات بلا شيء غير مطابق، وتبقى الفراغات الستّ والثلاثون فراغًا لأن الحالة المفقودة مفقودة: فلم يكن للخريطة ما تقوله عنها فلم تقل شيئًا بحق. و<code>ordered=True</code> هي ما يجعل السطر الأخير مشروعًا. فـ<code>level &gt; \"fair\"</code> تعمل لأن النوع يحمل الترتيب الذي أعلنتَه؛ وعلى <code>category</code> صِرف ترفع العبارةُ نفسها <code>TypeError: Unordered Categoricals can only compare equality or not</code>، وعلى عمود <code>string</code> تجيب معجميًّا، حيث <code>\"poor\" &gt; \"fair\"</code> هي <code>True</code> لأن <code>p</code> تأتي بعد <code>f</code> &mdash; وهي كذبةٌ لا ترفع خطأً قط. ولاحظ ما <em>هو</em> الترتيب: الرموز من 0 إلى 3، ولهذا يجب أن يثبّت الدرس 5 الترتيب قبل الترميز، ولهذا يكون إدخال <code>very good</code> بين <code>good</code> و<code>excellent</code> تغييرَ مخططٍ متلبّسًا بثوب تغيير بيانات."
        }
      },

      /* ---------------------------------------------------------- 21 */
      {
        id: "t2l3q21", type: "mcq", level: "medium",
        topics: ["t2-datetime-default"],
        q: {
          en: "480 of the 503 <code>listed_on</code> values are ISO dates and 23 are written <code>18/05/2026</code>, scattered through the file rather than clustered. Which statement describes what pandas actually did?",
          ar: "‏480 من قيم <code>listed_on</code> الـ503 تواريخ ISO و23 مكتوبة على صورة <code>18/05/2026</code>، مبثوثةً في الملف لا متجمّعة. فأيُّ عبارةٍ تصف ما فعلته pandas فعلًا؟"
        },
        code: code(
          "pd.to_datetime(raw[\"listed_on\"])",
          "",
          "# ValueError: time data \"18/05/2026\" doesn't match format \"%Y-%m-%d\", at position 15.",
          "#     You might want to try:",
          "#     - passing `format` if your strings have a consistent format;",
          "#     - passing `format='ISO8601'` if your strings are all ISO8601 but not",
          "#       necessarily in exactly the same format;",
          "#     - passing `format='mixed'`, and the format will be inferred for each",
          "#       element individually. You might want to use `dayfirst` alongside this."
        ),
        options: [
          {
            en: "It read the first value, inferred <code>%Y-%m-%d</code> from it, applied that one format to the whole column and refused at the first value that did not match &mdash; the row at position&nbsp;15. The refusal is the useful behaviour: a parser that changed its mind per value would never have told you the column holds two conventions.",
            ar: "قرأت القيمة الأولى، فاستنبطت منها <code>%Y-%m-%d</code>، وطبّقت تلك الصيغة الواحدة على العمود كله، ورفضت عند أول قيمة لا تطابق &mdash; أي الصف في الموضع 15. والرفضُ هو السلوك النافع: فمحلّلٌ يغيّر رأيه لكل قيمة ما كان ليخبرك قط أن في العمود عُرفين."
          },
          {
            en: "It tried both conventions and gave up because eleven of the slash dates are ambiguous. <code>dayfirst=True</code> is what resolves the ambiguity, and adding it to this call is enough.",
            ar: "جرّبت العُرفين واستسلمت لأن أحد عشر من تواريخ الشرطة المائلة ملتبسة. و<code>dayfirst=True</code> هي ما يحلّ الغموض، وإضافتها إلى هذا النداء تكفي."
          },
          {
            en: "Position&nbsp;15 counts the slash-formatted rows, so the message is telling you that pandas parsed fourteen of them before it met one it could not read.",
            ar: "الموضع 15 يعدّ صفوف الشرطة المائلة، فتخبرك الرسالة أن pandas حلّلت أربعة عشر منها قبل أن تقابل واحدًا لا تستطيع قراءته."
          },
          {
            en: "It failed because 23 of the values are not dates at all. <code>errors=\"coerce\"</code> is the right repair and it costs nothing, since those rows had no usable date in the first place.",
            ar: "فشلت لأن 23 من القيم ليست تواريخ أصلًا. و<code>errors=\"coerce\"</code> هي الإصلاح الصحيح ولا تكلّف شيئًا، إذ لم يكن في تلك الصفوف تاريخ قابل للاستعمال من البداية."
          }
        ],
        answer: 0,
        hint: {
          en: "Count how many formats pandas committed itself to, and ask where in the file row&nbsp;15 is. One of the options describes a behaviour pandas deliberately stopped having in version&nbsp;2.0.",
          ar: "عُدّ كم صيغةً ألزمت pandas نفسها بها، واسأل أين في الملف يقع الصف 15. وخيارٌ منها يصف سلوكًا تخلّت عنه pandas بقصد في النسخة 2.0."
        },
        explain: {
          en: "pandas looks at the first value, infers a single format, applies it to the whole column and raises at the first value that contradicts it &mdash; which is row&nbsp;15 of the file, the first slash-formatted row, not the fifteenth of anything. This is not an inability to parse your dates; it is a refusal to change its mind mid-column, and it is the behaviour you want: before pandas&nbsp;2.0 the same call printed a <code>UserWarning</code> and then parsed each value separately, which is how whole analyses were published with day and month swapped. The <code>dayfirst=True</code> answer is the tempting one and it is testable: pass it without <code>format=</code> and you get a <code>UserWarning</code> saying the two arguments contradict each other <em>and</em> the same <code>ValueError</code>, because <code>dayfirst=</code> only ever affects an ambiguous format and does nothing to an ISO string, where the field order is fixed by the standard. The <code>errors=\"coerce\"</code> answer gets the facts backwards: the 23 values are perfectly good dates in another convention, and coercing them costs 4.5% of the file plus the error message that named the value to go and look at.",
          ar: "تنظر pandas في القيمة الأولى فتستنبط صيغةً واحدة وتطبّقها على العمود كله وترفع خطأً عند أول قيمة تناقضها &mdash; وهي الصف 15 من الملف، أي أول صف بالشرطة المائلة، لا الخامس عشر من شيء. وليس هذا عجزًا عن تحليل تواريخك، بل رفضًا أن تغيّر رأيها في وسط العمود، وهو السلوك الذي تريده: فقبل pandas 2.0 كان النداء نفسه يطبع <code>UserWarning</code> ثم يحلّل كل قيمة على حِدة، وبذلك نُشرت تحليلات كاملة واليوم والشهر مبدَّلان. وجوابُ <code>dayfirst=True</code> هو المغري وهو قابل للاختبار: مرّرها بلا <code>format=</code> فتحصل على <code>UserWarning</code> يقول إن الوسيطين يتناقضان <em>و</em>على <code>ValueError</code> نفسها، لأن <code>dayfirst=</code> لا تؤثر قط إلا في صيغة ملتبسة ولا تفعل شيئًا بنصّ ISO حيث ترتيب الحقول مثبَّت بالمعيار. وجوابُ <code>errors=\"coerce\"</code> يقلب الوقائع: فالقيم الـ23 تواريخ سليمة تمامًا بعُرف آخر، وإكراهُها يكلّف 4.5% من الملف ورسالةَ الخطأ التي سمّت القيمة التي تذهب لتنظر فيها."
        }
      },

      /* ---------------------------------------------------------- 22 */
      {
        id: "t2l3q22", type: "multi", level: "hard",
        topics: ["t2-format-mixed", "t2-date-ambiguity"],
        q: {
          en: "The file was scraped between February and May 2026. Which of these conclusions do the measurements support? (Choose all that apply.)",
          ar: "جُمع الملف بالزحف بين شباط وأيار 2026. فأيّ هذه الاستنتاجات تسندها القياسات؟ (اختر كل ما ينطبق.)"
        },
        code: code(
          "to_datetime(s, format=\"mixed\")                 NaT 0   range 2026-01-03 -> 2026-12-04",
          "to_datetime(s, format=\"mixed\", dayfirst=True)  NaT 0   range 2026-02-01 -> 2026-06-19",
          "rows where the two parses disagree                                        : 10",
          "",
          "slash rows whose first field is 12 or less                               : 11 of 23",
          "rows parseable both as %d/%m/%Y and as %m/%d/%Y                          : 11",
          "   of those, the two readings fall in a different month                  : 10",
          "rows a month-first reader turns into NaT                                 : 12"
        ),
        lang: "text",
        options: [
          {
            en: "<code>format=\"mixed\"</code> keeps all 503 rows, so nothing about the shape of the result is wrong and the only thing that gives it away is the range: four months of scraping cannot span January to December.",
            ar: "تُبقي <code>format=\"mixed\"</code> الصفوف الـ503 كلها، فلا شيء في شكل النتيجة خاطئ، والشيء الوحيد الذي يفضحها هو المدى: فأربعة أشهر من الزحف لا تمتدّ من كانون الثاني إلى كانون الأول."
          },
          {
            en: "The 12 rows a month-first reader cannot parse at all are the evidence that settles the convention for this file: a column with twelve first fields above twelve cannot be month-first.",
            ar: "الصفوف الاثنا عشر التي لا يستطيع القارئ الذي يبدأ بالشهر تحليلها أصلًا هي الدليل الذي يثبّت العرف لهذا الملف: فعمودٌ فيه اثنتا عشرة قيمة حقلها الأول أكبر من اثني عشر لا يمكن أن يبدأ بالشهر."
          },
          {
            en: "<code>dayfirst=True</code> moves ten rows back into the month they belong to, and it does not make the eleven ambiguous values any less ambiguous &mdash; it chooses for them by an instruction you gave rather than by anything in the column.",
            ar: "تُعيد <code>dayfirst=True</code> عشرة صفوف إلى الشهر الذي تنتمي إليه، وهي لا تجعل القيم الملتبسة الإحدى عشرة أقلّ التباسًا &mdash; بل تختار لها بأمرٍ أعطيتَه لا بشيء في العمود."
          },
          {
            en: "Ten of the eleven ambiguous rows change month between the two readings, and <code>02/02/2026</code> is the exception because pandas special-cases a value whose two fields are equal.",
            ar: "عشرة من الصفوف الملتبسة الأحد عشر تتغير شهرًا بين القراءتين، و<code>02/02/2026</code> هي الاستثناء لأن pandas تخصّ بحالةٍ خاصة القيمةَ التي يتساوى حقلاها."
          },
          {
            en: "With <code>dayfirst=True</code> added, <code>format=\"mixed\"</code> is safe to leave in a monthly pipeline: it parses every value correctly and reports anything it cannot parse.",
            ar: "بإضافة <code>dayfirst=True</code> يُؤمَن ترك <code>format=\"mixed\"</code> في خط تحويل شهري: فهي تحلّل كل قيمة تحليلًا صحيحًا وتُبلّغ عن كل ما لا تستطيع تحليله."
          },
          {
            en: "Since <code>errors=\"coerce\"</code> loses 23 rows and <code>format=\"mixed\"</code> loses none, mixed is the better of the two whatever the file.",
            ar: "بما أن <code>errors=\"coerce\"</code> تفقد 23 صفًّا و<code>format=\"mixed\"</code> لا تفقد شيئًا، فـ mixed أفضل الاثنتين أيًّا كان الملف."
          }
        ],
        answer: [0, 1, 2],
        hint: {
          en: "Three of the six are checkable against the numbers given. One of the others is about <em>why</em> a single value agrees with itself, and plain arithmetic settles it; two more make a promise about a file nobody has seen &mdash; ask what either call would do with a format nobody has met.",
          ar: "ثلاثة من الستة قابلة للفحص في مقابل الأرقام المعطاة. وأحد الباقية عن <em>سبب</em> اتفاق قيمة واحدة مع نفسها، ويحسمه حسابٌ بسيط؛ واثنان يقطعان وعدًا عن ملفٍ لم يره أحد &mdash; فاسأل ماذا سيفعل أيٌّ من النداءين بصيغةٍ لم يقابلها أحد."
        },
        explain: {
          en: "A value <code>a/b/2026</code> reads both ways exactly when <code>a</code> and <code>b</code> are both 12 or less; here <code>b</code> is always the month, so the condition reduces to <code>a &le; 12</code> &mdash; eleven of the twenty-three rows. The two readings land in the same month exactly when <code>a = b</code>, and among the eleven that happens once, for <code>02/02/2026</code>: arithmetic, not a special case, and pandas has no idea the two readings exist. The twelve rows with a first field above twelve are the only reason you know the convention at all, and that inference is solid for this file and for no other &mdash; had those twelve happened to fall in the first twelve days of their months, nothing in the data would have told you anything, which is why the right fix is to ask whoever runs the form. The statement that <code>mixed</code> plus <code>dayfirst</code> is safe in a pipeline is the tempting one, because on this file it gives exactly the right answer: it reports nothing, so a third form sending <code>May 18, 2026</code> next month would be guessed at per value, in silence. And mixed does not beat coercion in general: it trades 23 holes you can count for 10 wrong months you cannot.",
          ar: "القيمة <code>a/b/2026</code> تُقرأ على الوجهين بالضبط حين يكون <code>a</code> و<code>b</code> كلاهما اثني عشر أو أقل؛ و<code>b</code> هنا هو الشهر دائمًا، فيتقلّص الشرط إلى <code>a &le; 12</code> &mdash; أي أحد عشر من الصفوف الثلاثة والعشرين. وتحلّ القراءتان في الشهر نفسه بالضبط حين <code>a = b</code>، وهذا يقع مرة واحدة بين الأحد عشر، في <code>02/02/2026</code>: حسابٌ لا حالةٌ خاصة، ولا تدري pandas أن للقراءتين وجودًا. والصفوف الاثنا عشر التي حقلها الأول أكبر من اثني عشر هي كل سبب معرفتك بالعرف أصلًا، وذلك الاستنباط متين لهذا الملف ولا لغيره &mdash; ولو اتفق أن وقعت تلك الاثنا عشر في الأيام الاثني عشر الأولى من أشهرها لما أخبرك شيءٌ في البيانات بشيء، ولهذا يكون الإصلاح الصحيح أن تسأل من يدير الاستمارة. والعبارةُ التي تقول إن <code>mixed</code> مع <code>dayfirst</code> آمنة في خط تحويل هي المغرية، لأنها تعطي على هذا الملف الجوابَ الصحيح بالضبط: فهي لا تُبلّغ عن شيء، فلو أرسلت استمارةٌ ثالثة <code>May 18, 2026</code> الشهر القادم لخُمِّنت قيمةً قيمةً في صمت. و mixed لا تتغلّب على الإكراه عمومًا: بل تقايض 23 ثقبًا تستطيع عدّها بعشرة أشهر خاطئة لا تستطيع."
        }
      },

      /* ---------------------------------------------------------- 23 */
      {
        id: "t2l3q23", type: "write", level: "hard",
        topics: ["t2-parse-assert"],
        q: {
          en: "Write <code>parse_dates(series, formats)</code>, the safe recipe of Concept&nbsp;6. Try each <em>named</em> format on its own with <code>errors=\"coerce\"</code>, so a value is parsed by the format it actually matches and by nothing else; combine the results; and make both assumptions executable &mdash; <strong>no value may match two formats</strong>, which would be ambiguous, and <strong>no non-blank value may match none</strong>, which would be a new format. Return the parsed column and a dictionary counting what each format parsed. Then call it on <code>listed_on</code> and print the per-format counts, the dtype, the <code>NaT</code> count and the date range.",
          ar: "اكتب <code>parse_dates(series, formats)</code>، وهي الوصفة الآمنة في المفهوم 6. جرّب كل صيغة <em>مسمّاة</em> على حِدة بـ<code>errors=\"coerce\"</code>، فتُحلَّل القيمةُ بالصيغة التي تطابقها فعلًا ولا بغيرها؛ وادمج النتائج؛ واجعل الافتراضين قابلين للتنفيذ &mdash; <strong>ألّا تطابق قيمةٌ صيغتين</strong>، وهذا التباس، و<strong>ألّا تطابق قيمةٌ غير فارغة أيَّ صيغة</strong>، وهذه صيغة جديدة. وأعِد العمود المحلَّل وقاموسًا يعدّ ما حلّلته كل صيغة. ثم نادِها على <code>listed_on</code> واطبع الأعداد لكل صيغة والنوعَ وعددَ <code>NaT</code> ومدى التواريخ."
        },
        starter: code(
          "import pandas as pd",
          "",
          "raw     = pd.read_csv(\"listings_raw.csv\")      # 503 rows: 480 ISO dates and 23 DD/MM/YYYY",
          "FORMATS = [\"%Y-%m-%d\", \"%d/%m/%Y\"]             # every convention this source is known to use",
          "",
          "# your code here"
        ),
        lines: 16,
        checks: [
          {
            re: "def\\s+parse_dates\\s*\\(\\s*\\w+\\s*,\\s*\\w+",
            label: {
              en: "A function <code>parse_dates</code> of two arguments: the column and the list of formats",
              ar: "دالة <code>parse_dates</code> بوسيطين: العمود وقائمة الصيغ"
            }
          },
          {
            re: "format\\s*=\\s*\\w+",
            label: {
              en: "Every parse names its format, so nothing is ever inferred",
              ar: "كل تحليل يسمّي صيغته، فلا يُستنبط شيء قط"
            }
          },
          {
            re: "errors\\s*=\\s*[\"']coerce[\"']",
            label: {
              en: "Each format is tried on its own with <code>errors=\"coerce\"</code>, so what it does not match becomes <code>NaT</code>",
              ar: "تُجرَّب كل صيغة على حِدة بـ<code>errors=\"coerce\"</code>، فيصير ما لا تطابقه <code>NaT</code>"
            }
          },
          {
            re: "\\.\\s*fillna\\s*\\(",
            label: {
              en: "The per-format results are combined with <code>fillna</code>",
              ar: "تُدمج نتائج الصيغ بـ<code>fillna</code>"
            }
          },
          {
            re: "assert\\s*\\(?\\s*\\w+\\s*(<=\\s*1|>\\s*1)",
            label: {
              en: "An assertion that no value matched more than one format",
              ar: "تأكيدٌ أن ما من قيمة طابقت أكثر من صيغة"
            }
          },
          {
            re: "assert\\s+not\\s+\\w+",
            label: {
              en: "An assertion that every non-blank value matched one of the named formats",
              ar: "تأكيدٌ أن كل قيمة غير فارغة طابقت إحدى الصيغ المسمّاة"
            }
          },
          {
            re: "return\\s+\\w+\\s*,\\s*\\{",
            label: {
              en: "Return the parsed column beside a per-format count",
              ar: "أعِد العمود المحلَّل بجانب عدٍّ لكل صيغة"
            }
          }
        ],
        forbid: [
          {
            re: "format\\s*=\\s*[\"']mixed[\"']",
            label: {
              en: "<code>format=\"mixed\"</code> (it guesses per value instead of naming the formats you accept, and reports nothing)",
              ar: "<code>format=\"mixed\"</code> (تخمّن لكل قيمة بدل تسمية الصيغ التي تقبلها، ولا تُبلّغ عن شيء)"
            }
          },
          {
            re: "to_datetime\\s*\\(\\s*\\w+\\s*\\)",
            label: {
              en: "a bare <code>to_datetime(series)</code> (it infers one format from the first value and raises on the rest)",
              ar: "‏<code>to_datetime(series)</code> عارية (تستنبط صيغةً واحدة من القيمة الأولى وترفع خطأً على الباقي)"
            }
          }
        ],
        solution: {
          code: code(
            "import pandas as pd",
            "",
            "raw     = pd.read_csv(\"listings_raw.csv\")",
            "FORMATS = [\"%Y-%m-%d\", \"%d/%m/%Y\"]",
            "",
            "def parse_dates(series, formats=FORMATS):",
            "    parsed = [pd.to_datetime(series, format=f, errors=\"coerce\") for f in formats]",
            "    overlap = sum(p.notna().astype(int) for p in parsed)",
            "    assert (overlap <= 1).all(), \"%d values match more than one format\" % int((overlap > 1).sum())",
            "    out = parsed[0]",
            "    for p in parsed[1:]:",
            "        out = out.fillna(p)",
            "    missing = series.notna() & out.isna()",
            "    assert not missing.any(), \"%d values match no known format, e.g. %r\" % (",
            "        int(missing.sum()), series[missing].iloc[0])",
            "    return out, {f: int(p.notna().sum()) for f, p in zip(formats, parsed)}",
            "",
            "listed, by_format = parse_dates(raw[\"listed_on\"])",
            "print(\"parsed per format:\", by_format)",
            "print(\"dtype:\", listed.dtype, \"| NaT:\", int(listed.isna().sum()))",
            "print(\"range:\", listed.min().date(), \"->\", listed.max().date())"
          ),
          out: "parsed per format: {'%Y-%m-%d': 480, '%d/%m/%Y': 23}\ndtype: datetime64[ns] | NaT: 0\nrange: 2026-02-01 -> 2026-06-19",
          en: "Each format is tried alone, so <code>overlap</code> counts how many formats claimed each value and the two assertions turn the recipe's two assumptions into failures you cannot miss. The result is identical to <code>format=\"mixed\", dayfirst=True</code> on this file &mdash; the extra lines bought the assertions, not the answer.",
          ar: "تُجرَّب كل صيغة وحدها، فتعدّ <code>overlap</code> كم صيغةً ادّعت كل قيمة، ويحوّل التأكيدان افتراضَي الوصفة إلى عطلَين لا يمكن إغفالهما. والنتيجة مطابقة لـ<code>format=\"mixed\", dayfirst=True</code> على هذا الملف &mdash; فالأسطر الزائدة اشترت التأكيدين لا الجواب."
        },
        hint: {
          en: "Build one parsed Series per format first and keep them all, because you need two different things from them: how many formats claimed each value, and the combination. <code>p.notna().astype(int)</code> summed across the list gives you the first.",
          ar: "ابنِ أولًا سلسلةً محلَّلة لكل صيغة واحفظها كلها، فأنت تحتاج منها شيئين مختلفين: كم صيغةً ادّعت كل قيمة، والدمج. ومجموعُ <code>p.notna().astype(int)</code> على القائمة يعطيك الأول."
        },
        explain: {
          en: "The result on this file is <em>identical</em> to the clever one-liner <code>format=\"mixed\", dayfirst=True</code>, so the extra lines bought you nothing today &mdash; they bought you the two assertions. If a third form starts sending <code>May 18, 2026</code> next month, the second assertion fails with the offending value in the message, where <code>format=\"mixed\"</code> would have parsed it happily and <code>errors=\"coerce\"</code> would have made it a silent <code>NaT</code>. The first assertion looks like the harmless one and is the subtler: <code>03/04/2026</code> matches both <code>%d/%m/%Y</code> and <code>%m/%d/%Y</code>, and <code>fillna</code> resolves such a clash by precedence &mdash; the first format in the list wins &mdash; so your answer would depend on the order you happened to type the list in, with nothing in the output to show it. On this file the overlap is zero and the order of <code>FORMATS</code> is irrelevant; the moment somebody adds <code>%m/%d/%Y</code> it stops being irrelevant, and the assertion is what tells them. And <code>by_format</code> is a free monitoring signal: <code>{'%Y-%m-%d': 480, '%d/%m/%Y': 23}</code> this month against the same two numbers next month tells you whether a data source changed, which is the single most useful thing a log can say.",
          ar: "النتيجة على هذا الملف <em>مطابقة</em> للسطر الذكي الواحد <code>format=\"mixed\", dayfirst=True</code>، فلم تشترِ لك الأسطر الزائدة شيئًا اليوم &mdash; بل اشترت لك التأكيدين. فإن بدأت استمارةٌ ثالثة ترسل <code>May 18, 2026</code> الشهر القادم، فشل التأكيد الثاني والقيمةُ المخالفة في الرسالة، في حين كانت <code>format=\"mixed\"</code> ستحلّلها راضيةً وكانت <code>errors=\"coerce\"</code> ستجعلها <code>NaT</code> صامتة. والتأكيد الأول يبدو غير الضارّ وهو الأدقّ: فـ<code>03/04/2026</code> تطابق <code>%d/%m/%Y</code> و<code>%m/%d/%Y</code> كلتيهما، وتحلّ <code>fillna</code> مثل هذا التصادم بالأسبقية &mdash; فتفوز الصيغة الأولى في القائمة &mdash; فيتوقف جوابك على الترتيب الذي كتبتَ به القائمة اتفاقًا، ولا شيء في المخرج يُظهر ذلك. والتقاطعُ في هذا الملف صفر وترتيبُ <code>FORMATS</code> بلا أثر؛ ومتى أضاف أحدٌ <code>%m/%d/%Y</code> كفّ عن أن يكون بلا أثر، والتأكيد هو ما يخبره. و<code>by_format</code> إشارةُ مراقبة مجانية: فـ<code>{'%Y-%m-%d': 480, '%d/%m/%Y': 23}</code> هذا الشهر مقابل الرقمين نفسيهما الشهر القادم يخبرك هل تغيّر مصدر بيانات، وهذا أنفع شيء يستطيع سجلٌّ أن يقوله."
        }
      },

      /* ---------------------------------------------------------- 24 */
      {
        id: "t2l3q24", type: "ordercode", level: "medium",
        topics: ["t2-stage12-log"],
        q: {
          en: "<code>CITY_MAP</code> and the three steps are already defined, each returning <code>(frame, log_row)</code>. Put the statements in the one order that both runs and produces a log you can interpret &mdash; three rows reading <code>503 &rarr; 503</code>, <code>503 &rarr; 480</code> and <code>480 &rarr; 480</code>, the last of them <code>changed: 178</code>.",
          ar: "‏<code>CITY_MAP</code> والخطوات الثلاث معرَّفة أصلًا، وتعيد كلٌّ منها <code>(frame, log_row)</code>. رتّب الأسطر بالترتيب الوحيد الذي يعمل ويُنتج سجلًّا تستطيع تفسيره &mdash; ثلاثة أسطر تقول <code>503 &rarr; 503</code> و<code>503 &rarr; 480</code> و<code>480 &rarr; 480</code>، وآخرها <code>changed: 178</code>."
        },
        items: [
          { code: "import pandas as pd" },
          { code: "frame = pd.read_csv(\"listings_raw.csv\")" },
          { code: "frame, r1 = step_dates(frame)                      # stage 2, first: the dedupe needs a real date" },
          { code: "frame, r2 = step_one_row_per_flat(frame)           # stage 1" },
          { code: "frame, r3 = step_text(frame, \"city\", CITY_MAP)     # stage 2 again, now on the 480 flats" },
          { code: "log = pd.DataFrame([r1, r2, r3])" },
          { code: "print(log.to_string(index=False))" }
        ],
        answer: [0, 1, 2, 3, 4, 5, 6],
        hint: {
          en: "Every statement needs a name the statements above it created. Two placements carry the lesson rather than the syntax: one is the exception the canonical order allows, and one is why a count in a log is meaningless without <code>rows_in</code>.",
          ar: "كل سطر يحتاج اسمًا أنشأته الأسطر فوقه. وموضعان يحملان الدرس لا القواعد النحوية: أحدهما الاستثناء الذي يسمح به الترتيب القياسي، والآخر سببُ كون العدّ في سجلٍّ بلا معنى دون <code>rows_in</code>."
        },
        explain: {
          en: "The chain of names fixes most of it: <code>pd</code> before <code>read_csv</code>, a frame before any step, <code>r1</code> to <code>r3</code> before the <code>DataFrame</code>, the log before it can be printed. Two placements are the lesson rather than the syntax. <code>step_dates</code> comes <em>before</em> the dedupe although parsing is stage&nbsp;2 and deduplication is stage&nbsp;1, because choosing which copy of a repost to keep needs a sortable date: <code>keep=\"last\"</code> on the file as it arrived keeps the older advert for three of the nine flats. That is not a violation of the canonical order, which orders <em>decisions</em>; what it actually forbids is a step learning a parameter from data a later step will change, and <code>parse_dates</code> learns nothing, since every value is converted on its own with no reference to any other row. And <code>step_text</code> comes after the dedupe, which is why its log row reads <code>rows_in 480</code> and <code>changed 178</code> rather than the 503 and 187 the same step reports on the raw file. Both numbers are right and they are counts of different frames &mdash; which is why a log row that does not record <code>rows_in</code> is a number nobody can interpret.",
          ar: "سلسلةُ الأسماء تثبّت معظمه: فـ<code>pd</code> قبل <code>read_csv</code>، وجدولٌ قبل أي خطوة، و<code>r1</code> إلى <code>r3</code> قبل <code>DataFrame</code>، والسجلُّ قبل أن يمكن طبعه. وموضعان هما الدرس لا القواعد النحوية. فـ<code>step_dates</code> تأتي <em>قبل</em> حذف المكرّر مع أن التحليل مرحلة 2 وحذف المكرّر مرحلة 1، لأن اختيار نسخة إعادة النشر التي تبقى يحتاج تاريخًا قابلًا للفرز: فـ<code>keep=\"last\"</code> على الملف كما وصل تُبقي الإعلان الأقدم لثلاث من الشقق التسع. وليس هذا خرقًا للترتيب القياسي، فهو يرتّب <em>القرارات</em>؛ وما يمنعه فعلًا أن تتعلّم خطوةٌ وسيطًا من بيانات ستغيّرها خطوة لاحقة، و<code>parse_dates</code> لا تتعلّم شيئًا، إذ تُحوَّل كل قيمة بنفسها بلا إشارة إلى أي صف آخر. و<code>step_text</code> تأتي بعد حذف المكرّر، ولهذا يقول سطرُ سجلّها <code>rows_in 480</code> و<code>changed 178</code> لا الـ503 والـ187 التي تُبلّغ عنها الخطوةُ نفسها على الملف الخام. والرقمان صحيحان وهما عددان لجدولَين مختلفين &mdash; ولهذا يكون سطرُ السجل الذي لا يسجّل <code>rows_in</code> رقمًا لا يستطيع أحدٌ تفسيره."
        }
      }

    ]
  };
})();
