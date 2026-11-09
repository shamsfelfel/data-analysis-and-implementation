window.DABanks = window.DABanks || {};
(function () {
  /* code(line, line, ...) -> one string with \n between lines */
  function code() { return Array.prototype.join.call(arguments, "\n"); }

  window.DABanks["t2-test-05"] = {
    title: {
      en: "Test 5 — Encoding Categories, Scaling Numbers",
      ar: "اختبار 5 — ترميز الفئات وتوحيد مقاييس الأرقام"
    },
    intro: {
      en: "24 questions on Lesson 5: the one rule an encoding may not break, one-hot against a <em>fitted</em> category list, the city that arrives for the first time in June, an ordered code from a declared order and what inserting a level does to it, twenty agencies over 480 rows and the honest measurement that says not to encode them at all, three scalers and why the order of the stages decides whether any of them works, which models cannot tell the difference, and the ten keys in <code>fitted</code> that encode next month's file into the same sixteen columns. Every number in this test comes from the 480 flats and the 85 June listings of the lesson. Plan for about 50 minutes. Every question carries a hint, an answer and an explanation, hidden until you ask for them: try first, then open them. A revealed answer is not counted.",
      ar: "‏24 سؤالًا على الدرس 5: القاعدة الواحدة التي لا يحقّ للترميز أن يخرقها، والترميز الأحادي على قائمة فئات <em>مضبوطة</em>، والمدينة التي تصل أول مرة في حزيران، والرمز المرتَّب من ترتيب معلَن وما يفعله إدخال مستوًى به، وعشرون وكالة على 480 صفًّا والقياس الأمين الذي يقول ألّا تُرمَّز أصلًا، وثلاثة مُقايِسات ولماذا يحدّد ترتيبُ المراحل هل يعمل أيٌّ منها، وأيُّ النماذج لا تلاحظ الفرق، والمفاتيح العشرة في <code>fitted</code> التي ترمّز ملف الشهر القادم إلى الأعمدة الستة عشر نفسها. وكل رقم في هذا الاختبار من الشقق الـ480 وإعلانات حزيران الـ85 في الدرس. قدّر نحو 50 دقيقة. ولكل سؤال تلميح وجواب وشرح، مخفيّة حتى تطلبها: جرّب أولًا ثم افتحها. والجواب المكشوف لا يُحسب."
    },
    questions: [

      /* ---------------------------------------------------------- 01 */
      {
        id: "t2l5q01", type: "tf", level: "easy",
        topics: ["t2-why-numbers"],
        q: {
          en: "One line turns the five city names into numbers: <code>flats[\"city\"].astype(\"category\").cat.codes</code> gives <code>Deir al-Balah</code> 0, <code>Gaza</code> 1, <code>Jabalia</code> 2, <code>Khan Younis</code> 3 and <code>Rafah</code> 4. Fitted against the 459 rents, the line comes out as intercept 235.3086 and slope &minus;12.0396. <strong>True or false:</strong> because the category list and the codes together recover every original city name exactly, the encoding loses nothing, so the slope of &minus;12.0396 is a fact about the Gaza rental market.",
          ar: "سطرٌ واحد يحوّل أسماء المدن الخمس إلى أرقام: فـ<code>flats[\"city\"].astype(\"category\").cat.codes</code> تعطي <code>Deir al-Balah</code> صفرًا و<code>Gaza</code> واحدًا و<code>Jabalia</code> اثنين و<code>Khan Younis</code> ثلاثة و<code>Rafah</code> أربعة. وبضبط الخط على الإيجارات الـ459 يخرج المقطع 235.3086 والميل &minus;12.0396. <strong>صح أم خطأ:</strong> لأن قائمة الفئات والرموز معًا تستعيد كل اسم مدينة أصلي بالضبط، فالترميز لا يفقد شيئًا، فيكون الميل &minus;12.0396 واقعةً عن سوق الإيجار في غزة."
        },
        truth: false,
        hint: {
          en: "The claim about recovering the names is true. Check the second half against the market: Deir al-Balah's median rent is 165 and Gaza's is 252.5. What does the fitted line predict for each?",
          ar: "الادّعاء باستعادة الأسماء صحيح. فافحص النصف الثاني في مقابل السوق: وسيط إيجار Deir al-Balah ‏165 ووسيط Gaza ‏252.5. فماذا يتنبأ الخط المضبوط لكلٍّ منهما؟"
        },
        explain: {
          en: "The encoding is lossless as <em>storage</em> &mdash; that half of the claim is right, and it is exactly why the bug survives review. What it is not is a faithful <em>feature</em>. The slope says every step down the alphabet costs 12.04 shekels, so the line prices Deir al-Balah highest at 235.31 when it is the cheapest of the five cities at a median of 165, and prices Gaza second at 223.27 when it is the dearest at 252.5 across 150 listings. The slope is a fact about the alphabet, not about the market: it is <code>D &lt; G &lt; J &lt; K &lt; R</code>, dressed as a quantity. No cell is missing, the dtype is a clean <code>int8</code>, nothing warns, and the feature is a fabrication.",
          ar: "الترميز لا يفقد شيئًا بوصفه <em>تخزينًا</em> &mdash; وهذا النصف من الادّعاء صحيح، وهو بالضبط سببُ نجاة هذا العطل من المراجعة. وأما ما ليس كذلك فهو كونه <em>خاصيةً</em> أمينة. فالميل يقول إن كل خطوة نزولًا في الأبجدية تكلّف 12.04 شيكلًا، فيُسعّر الخطُّ Deir al-Balah أعلى الخمس عند 235.31 وهي أرخصها بوسيط 165، ويُسعّر Gaza ثانيةً عند 223.27 وهي أغلاها عند 252.5 على 150 إعلانًا. فالميل واقعةٌ عن الأبجدية لا عن السوق: إنه <code>D &lt; G &lt; J &lt; K &lt; R</code> متلبّسًا بثوب كمّية. ولا خلية مفقودة، والنوع <code>int8</code> نظيف، ولا شيء يحذّر، والخاصية اختلاق."
        }
      },

      /* ---------------------------------------------------------- 02 */
      {
        id: "t2l5q02", type: "output", level: "easy",
        topics: ["t2-code-is-arbitrary", "t2-alphabetical-codes"],
        q: {
          en: "Write exactly what the program prints. Two cities are respelled to equally defensible transliterations &mdash; <em>Ghazzah</em> for Gaza and <em>Afah</em> for Rafah &mdash; and nothing else changes: the same 459 flats, the same 459 rents, the same model, the same line of code.",
          ar: "اكتب بالضبط ما يطبعه البرنامج. أُعيدت كتابة مدينتين بنقلٍ حرفي قابل للدفاع مثله &mdash; <em>Ghazzah</em> لـGaza و<em>Afah</em> لـRafah &mdash; ولم يتغير شيء آخر: الشقق الـ459 نفسها، والإيجارات الـ459 نفسها، والنموذج نفسه، وسطر الكود نفسه."
        },
        code: code(
          "sub = flats[flats[\"monthly_rent\"].notna()]          # 459 flats with a rent",
          "",
          "before = sub[\"city\"].astype(\"category\")",
          "after  = sub[\"city\"].replace({\"Gaza\": \"Ghazzah\", \"Rafah\": \"Afah\"}).astype(\"category\")",
          "",
          "print(list(before.cat.categories).index(\"Gaza\"),",
          "      list(after.cat.categories).index(\"Ghazzah\"))",
          "print(int((before.cat.codes != after.cat.codes).sum()))",
          "",
          "y  = sub[\"monthly_rent\"].to_numpy(float)",
          "b1 = fit(before.cat.codes.to_numpy().reshape(-1, 1), y)",
          "b2 = fit(after.cat.codes.to_numpy().reshape(-1, 1), y)",
          "print(\"%.4f %.4f\" % (b1[1], b2[1]))"
        ),
        blanks: [
          { accept: ["1 2\n459\n-12.0396 -0.0274"], lines: 3 }
        ],
        hint: {
          en: "Write the two alphabets out and read the codes off them. For the middle line, ask how many of the five cities keep the code they had &mdash; <code>A</code> now comes before <code>D</code>.",
          ar: "اكتب الأبجديتين واقرأ الرموز منهما. وأما السطر الأوسط فاسأل كم مدينةً من الخمس تُبقي رمزها &mdash; فـ<code>A</code> صارت تتقدّم <code>D</code>."
        },
        explain: {
          en: "<code>Gaza</code> is second in <code>['Deir al-Balah', 'Gaza', 'Jabalia', 'Khan Younis', 'Rafah']</code>, so its code is 1; <code>Ghazzah</code> is third in <code>['Afah', 'Deir al-Balah', 'Ghazzah', 'Jabalia', 'Khan Younis']</code>, so its code is 2. The middle line is the one worth getting wrong once: <code>Afah</code> sorts first, so <em>every</em> city shifts up one and <code>Rafah</code> wraps from 4 to 0 &mdash; all 459 codes change, not the 2 cities' worth you might expect. And the conclusion collapses with them: from &ldquo;rent falls 12.04 shekels per step across the cities&rdquo; to &ldquo;&minus;0.0274, the city does not matter at all&rdquo;. A result that depends on a transliteration choice is not a result. Note that the respelling is not even a typo to be cleaned: both spellings are in print, and a reposted advert really can arrive spelled the other way.",
          ar: "‏<code>Gaza</code> ثانيةٌ في <code>['Deir al-Balah', 'Gaza', 'Jabalia', 'Khan Younis', 'Rafah']</code> فرمزها 1؛ و<code>Ghazzah</code> ثالثةٌ في <code>['Afah', 'Deir al-Balah', 'Ghazzah', 'Jabalia', 'Khan Younis']</code> فرمزها 2. والسطر الأوسط يستحقّ أن تخطئه مرة: فـ<code>Afah</code> تتقدّم الجميع، فتصعد <em>كل</em> مدينة درجةً وتلتفّ <code>Rafah</code> من 4 إلى 0 &mdash; فتتغير الرموز الـ459 كلها، لا ما يقابل مدينتين كما قد تتوقع. وتنهار النتيجة معها: من «ينزل الإيجار 12.04 شيكلًا في كل خطوة بين المدن» إلى «&minus;0.0274، فالمدينة لا تهمّ أصلًا». والنتيجةُ التي تتوقف على اختيار نقلٍ حرفي ليست نتيجة. ولاحظ أن إعادة الكتابة ليست حتى خطأ إدخال يُنظَّف: فالتهجئتان مطبوعتان، وإعلانٌ معاد النشر قد يصل فعلًا بالتهجئة الأخرى."
        }
      },

      /* ---------------------------------------------------------- 03 */
      {
        id: "t2l5q03", type: "contrast", level: "medium",
        topics: ["t2-encoding-rule", "t2-level-to-encoder"],
        q: {
          en: "Two single-number encodings, each of one column of this file. Place each statement under the city code, under the condition code, or under both.",
          ar: "ترميزان برقم واحد، كلٌّ منهما لعمودٍ من هذا الملف. ضع كل عبارة تحت رمز المدينة أو تحت رمز الحالة أو تحت كليهما."
        },
        concepts: [
          {
            en: "<code>city</code> as one integer code &mdash; <code>flats[\"city\"].astype(\"category\").cat.codes</code>, 5 nominal levels",
            ar: "‏<code>city</code> رمزًا صحيحًا واحدًا &mdash; <code>flats[\"city\"].astype(\"category\").cat.codes</code>، خمسة مستويات اسمية"
          },
          {
            en: "<code>condition</code> as one integer code from the declared order &mdash; <code>flats[\"condition\"].cat.codes</code>, 4 ordinal levels",
            ar: "‏<code>condition</code> رمزًا صحيحًا واحدًا من الترتيب المعلَن &mdash; <code>flats[\"condition\"].cat.codes</code>، أربعة مستويات ترتيبية"
          }
        ],
        rows: [
          {
            s: {
              en: "Replaces a column of words with a single number, so a linear model fits one weight instead of several",
              ar: "يستبدل عمودَ كلماتٍ برقم واحد، فيضبط النموذج الخطي وزنًا واحدًا بدل عدة أوزان"
            },
            a: 2
          },
          {
            s: {
              en: "Asserts an <em>order</em> the column does not have, which makes the encoding wrong rather than approximate",
              ar: "يزعم <em>ترتيبًا</em> لا يملكه العمود، فيكون الترميز خاطئًا لا تقريبيًّا"
            },
            a: 0
          },
          {
            s: {
              en: "Asserts that consecutive levels are <em>equally spaced</em> &mdash; something the file cannot test, and which the medians 165, 185, 205, 230 only happen to flatter",
              ar: "يزعم أن المستويات المتتالية <em>متساوية التباعد</em> &mdash; وهذا ما لا يستطيع الملف اختباره، وما تجمّله الوسائط 165 و185 و205 و230 اتفاقًا"
            },
            a: 1
          },
          {
            s: {
              en: "Its numbers come from the alphabet, so a defensible change of transliteration is a different feature: the fitted slope moves from &minus;12.0396 to &minus;0.0274",
              ar: "أرقامه من الأبجدية، فيكون تغييرُ نقلٍ حرفي قابلٌ للدفاع خاصيةً أخرى: فينتقل الميل المضبوط من &minus;12.0396 إلى &minus;0.0274"
            },
            a: 0
          },
          {
            s: {
              en: "Takes the held-out error from 64.6698 to 59.4828 &mdash; within 0.03 shekels of what three dummies buy for three times the parameters",
              ar: "ينقل الخطأ على الصفوف المحجوزة من 64.6698 إلى 59.4828 &mdash; في حدود 0.03 شيكل من الذي تشتريه ثلاثة مؤشِّرات بثلاثة أمثال الوسائط"
            },
            a: 1
          },
          {
            s: {
              en: "Permitted by the column's measurement level, so the relations it adds are a priced trade rather than a fabrication",
              ar: "يُجيزه مستوى قياس العمود، فتكون العلاقات التي يضيفها مقايضةً مسعَّرة لا اختلاقًا"
            },
            a: 1
          },
          {
            s: {
              en: "Stays one column when a new level arrives next month, so the <em>width</em> of the feature matrix does not change",
              ar: "يبقى عمودًا واحدًا حين يصل مستوًى جديد الشهر القادم، فلا يتغير <em>عرض</em> مصفوفة الخصائص"
            },
            a: 2
          }
        ],
        hint: {
          en: "Go back to the four relations: equality, order, distance, ratio. An integer code carries all four, always. The only question per column is which of them the column really has &mdash; and that is what makes one of these two a trade and the other a mistake.",
          ar: "ارجع إلى العلاقات الأربع: التساوي والترتيب والمسافة والنسبة. فالرمز الصحيح يحمل الأربع كلها دائمًا. والسؤال الوحيد لكل عمود أيُّها يملكه العمود فعلًا &mdash; وهذا ما يجعل أحد هذين مقايضةً والآخر خطأً."
        },
        explain: {
          en: "The whole lesson is in one row of the relations table. <code>city</code> has exactly one relation, equality, so an integer code adds <em>three</em> facts that were never in the data and the encoding is simply wrong. <code>condition</code> has equality <em>and</em> order, so the same code adds <em>two</em> &mdash; distance and ratio &mdash; while representing the one relation that matters; that is a trade, and Concept 4 prices it at 0.03 shekels against three dummies. Note the two rows that are true of both, because they are why the mistake is tempting: a single number really is cheaper in parameters and really does keep the matrix the same width next month. Cheapness is not permission. The permission comes from the measurement level and from nothing else, which is why the <code>condition</code> code is the only single-number encoding of a categorical column this lesson allows.",
          ar: "الدرس كله في سطر واحد من جدول العلاقات. فلـ<code>city</code> علاقةٌ واحدة بالضبط هي التساوي، فيضيف الرمز الصحيح <em>ثلاث</em> وقائع لم تكن في البيانات قط ويكون الترميز خاطئًا بلا مزيد. ولـ<code>condition</code> التساوي <em>والترتيب</em>، فيضيف الرمز نفسه <em>اثنتين</em> &mdash; المسافة والنسبة &mdash; وهو يمثّل العلاقة الوحيدة التي تهمّ؛ وهذه مقايضة، ويسعّرها المفهوم 4 بـ0.03 شيكل في مقابل ثلاثة مؤشِّرات. ولاحظ السطرين الصحيحين في كليهما، فهما سببُ كون الخطأ مغريًا: فالرقم الواحد أرخصُ في الوسائط فعلًا، ويُبقي المصفوفة بالعرض نفسه الشهر القادم فعلًا. والرخص ليس إذنًا. فالإذن من مستوى القياس ولا من شيء غيره، ولهذا كان رمز <code>condition</code> هو الترميز الوحيد برقم واحد لعمود فئوي يسمح به هذا الدرس."
        }
      },

      /* ---------------------------------------------------------- 04 */
      {
        id: "t2l5q04", type: "fill", level: "easy",
        topics: ["t2-one-hot", "t2-get-dummies-args"],
        q: {
          en: "Fill in the three blanks so that the program one-hot encodes <code>city</code> and nothing else, stores the result in the smallest sensible dtype, and finishes with the one-line integrity check every one-hot block deserves. The program must print <code>(480, 5) int8</code> and then <code>{1: 480}</code>.",
          ar: "املأ الفراغات الثلاثة ليرمّز البرنامج <code>city</code> ترميزًا أحاديًّا ولا شيء غيره، ويخزّن النتيجة في أصغر نوع معقول، وينتهي بفحص السلامة ذي السطر الواحد الذي يستحقّه كل مربّع ترميز أحادي. وعلى البرنامج أن يطبع <code>(480, 5) int8</code> ثم <code>{1: 480}</code>."
        },
        code: code(
          "D = pd.get_dummies(flats[[\"city\"]], ____1____=[\"city\"],",
          "                   prefix=\"city\", ____2____=\"int8\")",
          "print(D.shape, D.dtypes.iloc[0])",
          "print(D.sum(axis=____3____).value_counts().to_dict())"
        ),
        blanks: [
          { accept: ["columns"], label: { en: "blank 1", ar: "الفراغ 1" } },
          { accept: ["dtype"], label: { en: "blank 2", ar: "الفراغ 2" } },
          { accept: ["1"], label: { en: "blank 3", ar: "الفراغ 3" } }
        ],
        hint: {
          en: "Two of the blanks are keyword arguments named in the lesson's section heading. The third decides whether you are adding up a row or a column &mdash; and the check you want is &ldquo;exactly one flag per flat&rdquo;.",
          ar: "فراغان وسيطان بالاسم ورَدا في عنوان قسم الدرس. والثالث يحدّد هل تجمع صفًّا أم عمودًا &mdash; والفحص الذي تريده «علمٌ واحد بالضبط لكل شقة»."
        },
        explain: {
          en: "<code>columns=[\"city\"]</code> is what keeps the call from encoding every text column it can find: without it, <code>pd.get_dummies(flats)</code> returns 200 columns for 480 rows. <code>dtype=\"int8\"</code> matters more than it looks &mdash; pandas 2.2 otherwise returns a nullable <code>boolean</code>, twice the memory and a dtype some downstream code will refuse arithmetic on, and <code>dtype=int</code> gives <code>int64</code>, eight times the memory for a column that only ever holds 0 or 1. <code>axis=1</code> sums <em>across</em> the five dummies of one row, and because exactly one is hot in a healthy row the result is a complete integrity check in one line: <code>{1: 480}</code> is what you want. A 0 in that dictionary is a missing or unrecognised city; a 2 means the source column held a list rather than a category. Print it after every encoding &mdash; it costs one line and it catches a bug you would otherwise meet three steps later, with a model already fitted.",
          ar: "‏<code>columns=[\"city\"]</code> هي ما يمنع النداء من ترميز كل عمود نصي يجده: فبدونها تعيد <code>pd.get_dummies(flats)</code> ‏200 عمود لـ480 صفًّا. و<code>dtype=\"int8\"</code> أهمّ مما تبدو &mdash; فبانداس 2.2 تعيد بدونها <code>boolean</code> قابلًا للفراغ، وهو ضعف الذاكرة ونوعٌ سيرفض بعض الكود اللاحق الحساب عليه، و<code>dtype=int</code> تعطي <code>int64</code>، أي ثمانية أمثال الذاكرة لعمود لا يحمل إلا صفرًا أو واحدًا. و<code>axis=1</code> تجمع <em>عَرضًا</em> على المؤشِّرات الخمسة للصف الواحد، ولأن واحدًا بالضبط ساخنٌ في الصف السليم تكون النتيجةُ فحصَ سلامةٍ كاملًا في سطر واحد: فـ<code>{1: 480}</code> هو ما تريد. والصفرُ في ذلك القاموس مدينةٌ مفقودة أو غير معروفة؛ والاثنان يعني أن العمود المصدر حمل قائمةً لا فئة. فاطبعه بعد كل ترميز &mdash; يكلّف سطرًا ويقتنص عطلًا كنت ستقابله بعد ثلاث خطوات ونموذجٌ مضبوط أصلًا."
        }
      },

      /* ---------------------------------------------------------- 05 */
      {
        id: "t2l5q05", type: "compare", level: "medium",
        topics: ["t2-drop-first", "t2-dummy-trap"],
        q: {
          en: "The same five cities, encoded twice and fitted against the same 459 rents. The group means are Deir al-Balah 178.25, Gaza 261.9667, Jabalia 182.2, Khan Younis 192.438 and Rafah 185.7051. Which statement is correct?",
          ar: "المدن الخمس نفسها، مرمَّزةً مرتين ومضبوطةً على الإيجارات الـ459 نفسها. ومتوسطات المجموعات هي Deir al-Balah ‏178.25 وGaza ‏261.9667 وJabalia ‏182.2 وKhan Younis ‏192.438 وRafah ‏185.7051. فأيُّ العبارات صحيحة؟"
        },
        codeA: code(
          "D5 = pd.get_dummies(sub[[\"city\"]], columns=[\"city\"], prefix=\"city\", dtype=\"int8\")",
          "X5 = np.column_stack([np.ones(len(D5)), D5.to_numpy()])",
          "print(\"shape\", X5.shape, \"rank\", np.linalg.matrix_rank(X5))",
          "b = fit(D5.to_numpy(), sub[\"monthly_rent\"].to_numpy(float))",
          "print(\"intercept %.4f\" % b[0], np.round(b[1:], 4).tolist())",
          "",
          "# shape (459, 6) rank 5",
          "# intercept 166.7600 [11.49, 95.2067, 15.44, 25.678, 18.9452]"
        ),
        codeB: code(
          "D4 = pd.get_dummies(sub[[\"city\"]], columns=[\"city\"], prefix=\"city\", dtype=\"int8\",",
          "                    drop_first=True)",
          "X4 = np.column_stack([np.ones(len(D4)), D4.to_numpy()])",
          "print(\"shape\", X4.shape, \"rank\", np.linalg.matrix_rank(X4))",
          "b = fit(D4.to_numpy(), sub[\"monthly_rent\"].to_numpy(float))",
          "print(\"intercept %.4f\" % b[0], np.round(b[1:], 4).tolist())",
          "",
          "# shape (459, 5) rank 5",
          "# intercept 178.2500 [83.7167, 3.95, 14.188, 7.4551]"
        ),
        options: [
          {
            en: "A's design matrix has six columns and a rank of five, so <code>np.linalg.lstsq</code> cannot solve it: A's coefficients are arbitrary noise and its predictions differ from B's.",
            ar: "لمصفوفة تصميم أ ستة أعمدة ورتبةٌ خمسة، فلا تستطيع <code>np.linalg.lstsq</code> حلّها: فمعاملات أ ضجيجٌ اعتباطي وتنبؤاتها تخالف تنبؤات ب."
          },
          {
            en: "B is strictly better and is the right default everywhere: dropping one dummy removes a genuine redundancy, which helps every model, trees included.",
            ar: "ب أفضل بالقطع وهي الافتراض الصحيح في كل مكان: فإسقاط مؤشِّر واحد يحذف تكرارًا حقيقيًّا، وهذا ينفع كل نموذج، والأشجار منها."
          },
          {
            en: "Neither predicts better &mdash; the predictions are identical &mdash; and they differ in what you can do with them. B is the one you can read: its intercept 178.2500 <em>is</em> the dropped city's mean and every coefficient is a difference from it (<code>261.9667 &minus; 178.25 = 83.7167</code>), while A's six columns have rank 5, so its coefficients are one of infinitely many exact solutions and its intercept 166.7600 is nobody's mean. A is the one to ship, because with all five dummies an all-zero city block means &ldquo;a city the fitted list never had&rdquo; and nothing else.",
            ar: "لا واحدةَ منهما تتنبأ أفضل &mdash; فالتنبؤات متطابقة &mdash; وإنما تختلفان في ما تستطيع فعله بهما. فـب هي التي تستطيع قراءتها: مقطعها 178.2500 <em>هو</em> متوسط المدينة المُسقَطة وكل معامل فرقٌ عنه (<code>261.9667 &minus; 178.25 = 83.7167</code>)، وأما أعمدة أ الستة فرتبتها خمسة، فمعاملاتها واحدةٌ من حلول دقيقة لا نهاية لها ومقطعها 166.7600 ليس متوسط أحد. وأ هي التي تُرسَل إلى الإنتاج، لأن المربّع الصفري للمدينة مع المؤشِّرات الخمسة كلها يعني «مدينة لم تكن في القائمة المضبوطة قط» ولا شيء غير ذلك."
          },
          {
            en: "They disagree by 11.49 shekels &mdash; the coefficient A gives Deir al-Balah and B does not &mdash; so A over-predicts every Deir al-Balah flat by exactly that amount.",
            ar: "تختلفان بـ11.49 شيكلًا &mdash; وهو المعامل الذي تعطيه أ لـDeir al-Balah ولا تعطيه ب &mdash; فتُفرِط أ في تنبؤ كل شقة في Deir al-Balah بذلك المقدار بالضبط."
          }
        ],
        answer: 2,
        hint: {
          en: "Both blocks print the same rank. Check one coefficient of B against the list of group means in the question, then ask the same of A's intercept. And then ask what each version does to a row whose city is not in the list at all.",
          ar: "يطبع المربّعان الرتبة نفسها. فافحص معاملًا واحدًا من ب في مقابل قائمة متوسطات المجموعات في السؤال، ثم اسأل الأمر نفسه عن مقطع أ. ثم اسأل ماذا تفعل كل نسخة بصفٍّ مدينتُه ليست في القائمة أصلًا."
        },
        explain: {
          en: "Five city dummies always sum to 1, and the intercept is a column of 1s, so the five add up to the intercept exactly in every row: six columns, rank five, one redundant column &mdash; the dummy-variable trap. A rank-deficient system has infinitely many exact solutions (add <em>c</em> to the intercept, subtract <em>c</em> from all five coefficients, and nothing predicted changes), and <code>lstsq</code> does not fail on it: it returns the minimum-norm solution, which is why A's intercept is 166.7600 and not any city's anything. That is what makes the answer calling A unsolvable wrong, and tempting &mdash; &ldquo;rank deficient&rdquo; sounds like &ldquo;no solution&rdquo;. Dropping a dummy makes the dropped category the reference level and the arithmetic readable, which is a gain in interpretation and not in accuracy. And the answer that calls B the universal default misses both warnings in the lesson: a tree has no intercept, so it has no trap and the drop only costs it depth; and on June's 85 listings the all-zero city rows number 2 without <code>drop_first</code> and 17 with it, so the drop destroys the only diagnostic that finds an unseen category from the matrix alone.",
          ar: "مؤشِّرات المدينة الخمسة مجموعها واحد دائمًا، والمقطع عمودٌ من الواحدات، فتجمع الخمسة إلى عمود المقطع بالضبط في كل صف: ستة أعمدة ورتبة خمسة وعمودٌ زائد واحد &mdash; وهو فخّ المتغيّر المؤشِّر. وللنظام ناقص الرتبة حلولٌ دقيقة لا نهاية لها (أضِف <em>c</em> إلى المقطع واطرح <em>c</em> من المعاملات الخمسة فلا يتغير شيء متنبَّأ به)، ولا تتعطّل <code>lstsq</code> عليه: بل تعيد حلّ أصغر معيار، ولهذا كان مقطع أ ‏166.7600 لا شيئًا لأي مدينة. وهذا ما يجعل الجوابَ الذي يسمّي أ غيرَ قابلة للحل خاطئًا ومغريًا &mdash; فـ«ناقص الرتبة» يبدو كأنه «لا حلَّ له». وإسقاط مؤشِّر يجعل الفئة المُسقَطة مستوى المرجع والحسابَ مقروءًا، وهذا ربحٌ في التفسير لا في الدقة. والجوابُ الذي يسمّي ب الافتراضَ الكلي يُغفل تحذيرَي الدرس كليهما: فالشجرة لا مقطعَ لها فلا فخَّ لها والإسقاط لا يكلّفها إلا عمقًا؛ وعلى إعلانات حزيران الـ85 تكون صفوف المدينة الصفرية اثنين دون <code>drop_first</code> وسبعةَ عشر معها، فيهدم الإسقاط الفحصَ الوحيد الذي يجد فئةً غير مرئية من المصفوفة وحدها."
        }
      },

      /* ---------------------------------------------------------- 06 */
      {
        id: "t2l5q06", type: "multi", level: "medium",
        topics: ["t2-sparse-dummies", "t2-cardinality"],
        q: {
          en: "One-hot encoding <code>agency</code> on the 480 flats gives <code>(480, 20)</code> and the block is 95.00% zeros. The value counts run from Al-Quds Realty with 92 listings down to five agencies with exactly one each, eight have at most three, and the top five cover 349 of the 480 rows. <code>pd.get_dummies(flats)</code> with no <code>columns=</code> returns <code>(480, 200)</code>. Which of these statements are true? (Choose all that apply.)",
          ar: "ترميز <code>agency</code> ترميزًا أحاديًّا على الشقق الـ480 يعطي <code>(480, 20)</code> والمربّع 95.00% أصفار. وتنزل أعداد القيم من Al-Quds Realty بـ92 إعلانًا إلى خمس وكالات لكلٍّ منها إعلان واحد بالضبط، وثمانٍ لكلٍّ منها ثلاثة على الأكثر، وتغطّي الخمس الأُوَل 349 من الصفوف الـ480. و<code>pd.get_dummies(flats)</code> دون <code>columns=</code> تعيد <code>(480, 200)</code>. فأيُّ هذه العبارات صحيحة؟ (اختر كل ما ينطبق.)"
        },
        options: [
          {
            en: "Five agencies have exactly one listing each, so the block hands a linear model five coefficients with a single row of evidence behind them &mdash; a parameter fitted to one observation is that observation memorised.",
            ar: "خمس وكالات لكلٍّ منها إعلان واحد بالضبط، فيسلّم المربّع النموذجَ الخطي خمسة معاملات وراء كلٍّ منها صفٌّ واحد من الدليل &mdash; والوسيطُ المضبوط على مشاهدة واحدة هو تلك المشاهدة محفوظةً."
          },
          {
            en: "The 95% zeros is the cheap part of the bill: the 20 <code>int8</code> columns cost 9,600 bytes against 30,195 for the text column they replace, so what one-hot really costs here is parameters, not memory.",
            ar: "الـ95% أصفارًا هي الجزء الرخيص من الفاتورة: فالأعمدة العشرون بنوع <code>int8</code> تكلّف 9,600 بايت في مقابل 30,195 للعمود النصي الذي تستبدله، فالذي يكلّفه الترميز الأحادي هنا فعلًا وسائطُ لا ذاكرة."
          },
          {
            en: "The 200 columns come from <code>get_dummies</code> encoding every text-like column it can find when <code>columns=</code> is left out, and <code>listed_on</code> alone &mdash; still 135 distinct date strings at this point &mdash; contributes 135 of them.",
            ar: "الأعمدة الـ200 آتيةٌ من ترميز <code>get_dummies</code> كلَّ عمود شبيه بالنص تجده حين تُترك <code>columns=</code>، و<code>listed_on</code> وحده &mdash; وهو ما زال 135 سلسلة تاريخ مميّزة عند هذه النقطة &mdash; يُسهم بـ135 منها."
          },
          {
            en: "The sparsity is the real problem, so returning the block as a <code>scipy.sparse</code> matrix instead of 20 dense columns would remove the difficulty this column presents.",
            ar: "التخلخل هو المشكلة الحقيقية، فإعادةُ المربّع مصفوفةً من <code>scipy.sparse</code> بدل عشرين عمودًا كثيفًا كانت ستحذف الصعوبة التي يطرحها هذا العمود."
          },
          {
            en: "A tree is safe from this: with only 346 training rows it cannot split on a dummy column that has one row behind it, so the problem belongs to linear models alone.",
            ar: "الشجرة في أمان من هذا: فبـ346 صفًّا تدريبيًّا فقط لا تستطيع التقسيم على عمود مؤشِّر وراءه صفٌّ واحد، فتكون المشكلة للنماذج الخطية وحدها."
          },
          {
            en: "<code>dtype=\"int8\"</code> is the defect: 20 categories are more than an <code>int8</code> column can represent, so the block silently overflows and some flags wrap to negative values.",
            ar: "‏<code>dtype=\"int8\"</code> هو العيب: فعشرون فئة أكثر مما يستطيع عمود <code>int8</code> تمثيله، فيفيض المربّع بصمت وتلتفّ بعض الأعلام إلى قيم سالبة."
          }
        ],
        answer: [0, 1, 2],
        hint: {
          en: "The lesson says in so many words that one of the two obvious costs is <em>not</em> the problem. And for the option about trees, look at what the last concept's honest accounting says trees still need.",
          ar: "يقول الدرس صريحًا إن أحد الثمنَين الظاهرَين <em>ليس</em> المشكلة. وأما الخيار المتعلق بالأشجار فانظر ما يقول الحساب الأمين في المفهوم الأخير إن الأشجار ما زالت تحتاجه."
        },
        explain: {
          en: "Count the rows behind each column, not the zeros in it. The sparsity is cheap and <code>int8</code> makes it cheaper &mdash; 9,600 bytes against 30,195 &mdash; so the answer that blames the zeros, and the one that offers a sparse matrix as the cure, are solving an accounting problem the lesson explicitly dismisses. What is expensive is five coefficients with one listing each: that is five observations written into the model and applied with full confidence to every future listing of those agencies. The 200-column line is the same lesson at the frame level: without <code>columns=</code>, <code>get_dummies</code> encodes <code>city</code>, <code>governorate</code>, <code>agency</code>, <code>condition</code>, <code>advert</code> and the still-textual <code>listed_on</code>, and that last one alone is 135 columns &mdash; at which point a linear model can reproduce every training rent exactly and has learned nothing. The tree option is the instructive miss: trees do not need <em>scaling</em>, and the lesson's honest accounting lists cardinality among the four things they still do need, because a tree with twenty candidate dummies and 346 rows will happily split on a column with one row behind it. And <code>int8</code> holds &minus;128 to 127; it stores the <em>values</em> 0 and 1, not the number of categories.",
          ar: "عُدّ الصفوف وراء كل عمود، لا الأصفار فيه. فالتخلخل رخيص و<code>int8</code> يجعله أرخص &mdash; ‏9,600 بايت في مقابل 30,195 &mdash; فالجوابُ الذي يلوم الأصفار، والذي يعرض مصفوفةً متخلخلة علاجًا، يحلّان مشكلةً محاسبية ينفيها الدرس صريحًا. وأما الغالي فخمسة معاملات لكلٍّ منها إعلان واحد: وهذه خمس مشاهدات مكتوبة في النموذج وتُطبَّق بثقة تامة على كل إعلان قادم لتلك الوكالات. وسطر الأعمدة الـ200 هو الدرس نفسه على مستوى الجدول: فبدون <code>columns=</code> ترمّز <code>get_dummies</code> ‏<code>city</code> و<code>governorate</code> و<code>agency</code> و<code>condition</code> و<code>advert</code> و<code>listed_on</code> الذي ما زال نصًّا، وهذا الأخير وحده 135 عمودًا &mdash; وعندها يستطيع النموذج الخطي أن يُعيد إنتاج كل إيجار تدريبي بالضبط وما تعلّم شيئًا. وخيارُ الشجرة هو الإغفال المفيد: فالأشجار لا تحتاج <em>توحيد المقياس</em>، ويذكر الحساب الأمين في الدرس التعدّدَ بين الأربعة التي ما زالت تحتاجها، لأن شجرةً بعشرين مؤشِّرًا مرشَّحًا و346 صفًّا ستقسم راضيةً على عمود وراءه صفٌّ واحد. و<code>int8</code> يحمل من &minus;128 إلى 127؛ وهو يخزّن <em>القيمتين</em> صفرًا وواحدًا لا عددَ الفئات."
        }
      },

      /* ---------------------------------------------------------- 07 */
      {
        id: "t2l5q07", type: "compare", level: "medium",
        topics: ["t2-shape-mismatch", "t2-encode-together"],
        q: {
          en: "March's 480 flats and June's 85 listings, one-hot encoded on <code>city</code> and <code>agency</code> two ways. June brings one city March never had (<code>Beit Lahia</code>, 2 rows) and three agencies it never had (one row each), while ten March agencies sent nothing in June. Which statement is correct?",
          ar: "شقق آذار الـ480 وإعلانات حزيران الـ85، مرمَّزةً ترميزًا أحاديًّا على <code>city</code> و<code>agency</code> بطريقتين. ويجلب حزيران مدينةً لم تكن في آذار قط (<code>Beit Lahia</code>، صفّان) وثلاث وكالات لم تكن فيه قط (لكلٍّ صفّ واحد)، في حين أن عشر وكالات من آذار لم تُرسل شيئًا في حزيران. فأيُّ العبارات صحيحة؟"
        },
        codeA: code(
          "CAT = [\"city\", \"agency\"]",
          "march = pd.get_dummies(flats[CAT], columns=CAT, prefix=CAT, dtype=\"int8\")",
          "newer = pd.get_dummies(june[CAT],  columns=CAT, prefix=CAT, dtype=\"int8\")",
          "print(march.shape, newer.shape)",
          "print(sorted(set(newer.columns) - set(march.columns)))",
          "weights = np.zeros(march.shape[1] + 1)          # pretend a model was fitted on March",
          "newer.to_numpy() @ weights[1:]                  # score June with March's model",
          "",
          "# (480, 25) (85, 19)",
          "# ['agency_Andalus Homes', 'agency_Burhan Realty', 'agency_Sumud Housing', 'city_Beit Lahia']",
          "# ValueError: matmul: Input operand 1 has a mismatch in its core dimension 0"
        ),
        codeB: code(
          "both = pd.get_dummies(pd.concat([flats[CAT], june[CAT]], ignore_index=True),",
          "                      columns=CAT, prefix=CAT, dtype=\"int8\")",
          "print(\"concatenated:\", both.shape)",
          "print(\"March slice:\", both.iloc[:len(flats)].shape,",
          "      \"| June slice:\", both.iloc[len(flats):].shape)",
          "print(\"columns that exist only because June arrived:\",",
          "      len(set(both.columns) - set(march.columns)))",
          "",
          "# concatenated: (565, 29)",
          "# March slice: (480, 29) | June slice: (85, 29)",
          "# columns that exist only because June arrived: 4"
        ),
        options: [
          {
            en: "B fixes A's named defect and is still the worse answer, for a reason that has nothing to do with this file. Four of B's 29 columns exist only because June arrived, so the <em>structure</em> of the training matrix was designed with the data the model is about to be scored on; and B cannot be run at all on a file that has not arrived yet, which is the one thing a transform has to do. One July listing through B is a one-column matrix.",
            ar: "ب تُصلح العيب المسمّى في أ وتبقى الجواب الأسوأ، لسببٍ لا علاقة له بهذا الملف. فأربعة من أعمدة ب الـ29 موجودة لأن حزيران وصل فقط، فيكون <em>بناء</em> مصفوفة التدريب مصمَّمًا بالبيانات التي يوشك النموذج أن يُقاس عليها؛ ولا تستطيع ب العمل أصلًا على ملف لم يصل بعد، وهذا هو الشيء الوحيد الذي على التحويل أن يفعله. وإعلانُ تموز الواحد عبر ب مصفوفةٌ بعمود واحد."
          },
          {
            en: "A is the shippable version: a <code>ValueError</code> is a loud failure and B is silent, and a loud failure is always better, so A should be kept and the mismatch handled by a <code>try</code> block at scoring time.",
            ar: "أ هي النسخة القابلة للإرسال: فـ<code>ValueError</code> عطلٌ صاخب وب صامتة، والعطلُ الصاخب أفضل دائمًا، فتُبقى أ ويُعالَج عدم التطابق بمربّع <code>try</code> وقت القياس."
          },
          {
            en: "B is correct and complete. One call sees every value, so its 29 columns are the true column list, and next month July can be concatenated in exactly the same way.",
            ar: "ب صحيحة وتامّة. فنداءٌ واحد يرى كل قيمة، فتكون أعمدتها الـ29 قائمة الأعمدة الحقيقية، ويمكن الشهر القادم دمجُ تموز بالطريقة نفسها بالضبط."
          },
          {
            en: "They are equivalent on this file, because the four columns June adds are all zero in the March slice and the ten missing March agencies are all zero in the June slice, so both routes produce the same 29-column matrix.",
            ar: "هما متكافئتان على هذا الملف، لأن الأعمدة الأربعة التي يضيفها حزيران صفريةٌ كلها في شريحة آذار والوكالات العشر الغائبة من آذار صفريةٌ كلها في شريحة حزيران، فيُنتج المسلكان المصفوفةَ ذاتَ الـ29 عمودًا نفسها."
          }
        ],
        answer: 0,
        hint: {
          en: "A's crash is the good news, not the defect &mdash; name what A actually does wrong. Then ask of B the only question that matters about a transform: could you run this line in July, with a fitted model, a server, and one row to score?",
          ar: "عطلُ أ هو الخبر السارّ لا العيب &mdash; فسمِّ ما تفعله أ خطأً فعلًا. ثم اسأل ب السؤالَ الوحيد الذي يهمّ في التحويل: هل تستطيع تشغيل هذا السطر في تموز، ولديك نموذج مضبوط وخادم وصفٌّ واحد تقيسه؟"
        },
        explain: {
          en: "A's named defect is not the crash; it is that the encoder fits its column list to whichever file it is given, so it is a different encoder every month. The <code>ValueError</code> is the <em>best</em> outcome available to A: the quiet version of this bug is the one that costs a week, because had June's values happened to be a subset of March's the widths could have matched while the column <em>meanings</em> shifted, and <code>agency_Sahel Housing</code> would have been read as <code>agency_Rafah Homes</code> with no complaint from anyone. B is the fix most people reach for and the one that cannot be rescued. The leak is real and mild &mdash; a column name carries little information &mdash; but the fatal objection is about time: a transform you can only run once you already have all the data is not a transform, it is a one-off analysis. The right answer is a stored column list, fitted on March alone and applied with <code>reindex(columns=..., fill_value=0)</code>: 25 columns always, nothing from June in the fit, and the unseen values counted in a log line.",
          ar: "عيبُ أ المسمّى ليس العطل؛ بل أن المُرمِّز يضبط قائمة أعمدته على أي ملف يُعطاه، فيكون مُرمِّزًا مختلفًا كل شهر. و<code>ValueError</code> هو <em>أفضل</em> نتيجة متاحة لـأ: فالنسخة الهادئة من هذا العطل هي التي تكلّف أسبوعًا، إذ لو كانت قيم حزيران مجموعةً جزئية من قيم آذار اتفاقًا لأمكن أن تتطابق الأعراض ويتزحزح <em>معنى</em> الأعمدة، فيُقرأ <code>agency_Sahel Housing</code> على أنه <code>agency_Rafah Homes</code> ولا يشتكي أحد. وب هي الإصلاح الذي يمدّ إليه معظم الناس أيديهم وهي التي لا يمكن إنقاذها. والتسرّب حقيقي وخفيف &mdash; فاسمُ العمود يحمل معلومةً قليلة &mdash; وأما الاعتراض القاتل فعن الزمن: فالتحويلُ الذي لا تستطيع تشغيله إلا بعد أن تكون البيانات كلها عندك ليس تحويلًا، بل تحليلٌ لمرة واحدة. والجوابُ الصحيح قائمةُ أعمدة مخزَّنة، مضبوطةٌ على آذار وحده ومطبَّقةٌ بـ<code>reindex(columns=..., fill_value=0)</code>: ‏25 عمودًا دائمًا، ولا شيء من حزيران في الضبط، والقيمُ غير المرئية معدودةٌ في سطر سجل."
        }
      },

      /* ---------------------------------------------------------- 08 */
      {
        id: "t2l5q08", type: "output", level: "easy",
        topics: ["t2-fitted-categories", "t2-unseen-report"],
        q: {
          en: "Write exactly what the program prints. The column list is fitted on March's 480 flats and June's 85 listings are forced onto it. June's cities are all spelled correctly and one of them, <code>Beit Lahia</code> with 2 listings, is a town March never contained; three of June's agencies are new, with one listing each; every June row has a city and an agency recorded.",
          ar: "اكتب بالضبط ما يطبعه البرنامج. قائمة الأعمدة مضبوطة على شقق آذار الـ480 وإعلانات حزيران الـ85 مُلزَمة بها. ومدن حزيران كلها مكتوبة صحيحة، وإحداها <code>Beit Lahia</code> بإعلانين بلدةٌ لم تكن في آذار قط؛ وثلاث من وكالات حزيران جديدة لكلٍّ منها إعلان واحد؛ ولكل صف في حزيران مدينةٌ ووكالة مسجَّلتان."
        },
        code: code(
          "CAT    = [\"city\", \"agency\"]",
          "march  = pd.get_dummies(flats[CAT], columns=CAT, prefix=CAT, dtype=\"int8\")",
          "fitted = {\"columns\": list(march.columns)}                 # FIT: on March alone",
          "",
          "newer   = pd.get_dummies(june[CAT], columns=CAT, prefix=CAT, dtype=\"int8\")",
          "aligned = newer.reindex(columns=fitted[\"columns\"], fill_value=0)   # APPLY",
          "",
          "print(len(fitted[\"columns\"]), newer.shape[1], aligned.shape[1])",
          "print(int(aligned.sum(axis=1).eq(2).sum()), int(aligned.sum(axis=1).lt(2).sum()))",
          "print(int(aligned.sum().sum()))"
        ),
        blanks: [
          { accept: ["25 19 25\n80 5\n165"], lines: 3 }
        ],
        hint: {
          en: "A healthy row has exactly two flags, one per encoded column. The last line is the grand total of flags, so count how many of the 85 rows contributed a city flag and how many contributed an agency flag, and add.",
          ar: "للصف السليم علمان بالضبط، واحدٌ لكل عمود مرمَّز. والسطر الأخير مجموعُ الأعلام الكلي، فعُدّ كم صفًّا من الـ85 أسهم بعلم مدينة وكم أسهم بعلم وكالة، واجمع."
        },
        explain: {
          en: "The first line is the point of the fit: 25 columns learned from March, 19 produced from June on its own, and 25 again after the reindex, which drops what the list does not contain and creates and zero-fills what the file did not produce. The shape is now right and the content is not, which is the whole danger. A healthy row sums to 2, one city flag and one agency flag, so <code>&lt; 2</code> catches both kinds of hole in one expression: 5 of the 85 rows &mdash; 2 for <code>Beit Lahia</code> and 1 each for the three new agencies &mdash; against 80 clean ones. The grand total follows: 83 rows contributed a city flag and 82 an agency flag, so 165 rather than the 170 a perfect batch would give. Note that nothing here raised and no shape disagreed: the two <code>Beit Lahia</code> listings have just been encoded as flats with no city, and the only reason you know is that the program was asked. Take the report <em>before</em> the encoding, because after it a row of zeros has no name.",
          ar: "السطر الأول هو مقصود الضبط: ‏25 عمودًا متعلَّمًا من آذار، و19 منتَجًا من حزيران وحده، و25 مرة أخرى بعد إعادة الفهرسة، التي تُسقط ما لا تحتويه القائمة وتُنشئ ما لم يُنتجه الملف وتعبّئه أصفارًا. فصار الشكل صحيحًا والمحتوى غير صحيح، وهذا هو الخطر كله. والصف السليم مجموعه 2، علمُ مدينة وعلمُ وكالة، فتقتنص <code>&lt; 2</code> نوعَي الثقب كليهما في تعبير واحد: ‏5 من الصفوف الـ85 &mdash; اثنان لـ<code>Beit Lahia</code> وواحد لكل وكالة من الثلاث الجديدة &mdash; في مقابل 80 نظيفًا. ويتبع المجموع الكلي: ‏83 صفًّا أسهم بعلم مدينة و82 بعلم وكالة، فيكون 165 لا 170 التي كانت ستعطيها دفعةٌ تامّة. ولاحظ أن لا شيء هنا رفع خطأً ولا شكلَ خالف: فالإعلانان في <code>Beit Lahia</code> رُمِّزا للتوّ شقتين بلا مدينة، والسببُ الوحيد لعلمك أن البرنامج سُئل. فخُذ التقرير <em>قبل</em> الترميز، فبعده لا اسمَ لصفٍّ من الأصفار."
        }
      },

      /* ---------------------------------------------------------- 09 */
      {
        id: "t2l5q09", type: "mcq", level: "hard",
        topics: ["t2-all-zero-row", "t2-drop-first"],
        q: {
          en: "June's <code>city</code> is cast to the fitted five-level <code>CategoricalDtype</code> and one-hot encoded, and the all-zero rows are counted: <strong>2 of 85</strong> without <code>drop_first</code>, and <strong>17 of 85</strong> with it. A colleague concludes that <code>drop_first=True</code> has introduced 15 extra unseen cities and asks you to stop using it for that reason. What is the right reading?",
          ar: "يُحوَّل <code>city</code> في حزيران إلى <code>CategoricalDtype</code> المضبوط بخمسة مستويات ويُرمَّز ترميزًا أحاديًّا، وتُعدّ الصفوف الصفرية: <strong>اثنان من 85</strong> دون <code>drop_first</code>، و<strong>سبعة عشر من 85</strong> معها. فيستنتج زميل أن <code>drop_first=True</code> أدخلت خمس عشرة مدينةً غير مرئية زائدة ويطلب منك التوقف عن استعمالها لذلك السبب. فما القراءة الصحيحة؟"
        },
        options: [
          {
            en: "The colleague is right about the count and wrong about the cause: <code>drop_first</code> drops the alphabetically first column, whose listings genuinely become unrecognisable to the model, so those 15 rows really are scored as unseen cities.",
            ar: "الزميل مُحقٌّ في العدّ مخطئ في السبب: فـ<code>drop_first</code> تُسقط العمودَ الأول أبجديًّا، وتصير إعلاناتُه فعلًا غيرَ معروفة للنموذج، فتُقاس تلك الصفوف الخمسة عشر فعلًا مدنًا غير مرئية."
          },
          {
            en: "Nothing about June changed. Fifteen of the 17 are the 15 legitimate <code>Deir al-Balah</code> listings, which are all-zero by construction once their own column is the dropped reference level, and only 2 are the unseen <code>Beit Lahia</code>. <code>drop_first</code> did not create unseen rows; it destroyed the one diagnostic that tells an unseen city apart from the reference category.",
            ar: "لم يتغير شيء عن حزيران. فخمسة عشر من السبعة عشر هي إعلانات <code>Deir al-Balah</code> المشروعة الخمسة عشر، وهي صفريةٌ بالبناء متى صار عمودُها مستوى المرجع المُسقَط، واثنان فقط هما <code>Beit Lahia</code> غير المرئية. فـ<code>drop_first</code> لم تُنشئ صفوفًا غير مرئية؛ بل هدمت الفحصَ الوحيد الذي يفرّق المدينةَ غير المرئية من فئة المرجع."
          },
          {
            en: "Both counts are wrong and the fix is <code>dummy_na=True</code>, which adds a <code>city_nan</code> column so that the unseen listings are flagged explicitly and both counts fall to 0.",
            ar: "العدّان خاطئان والإصلاحُ <code>dummy_na=True</code>، التي تضيف عمود <code>city_nan</code> فتُعلَّم الإعلانات غير المرئية صريحًا ويهبط العدّان إلى صفر."
          },
          {
            en: "The two counts are interchangeable, because a linear model with an intercept reads an all-zero row as the reference category either way, so nothing is lost and the colleague's objection is empty.",
            ar: "العدّان متبادلان، لأن النموذج الخطي ذا المقطع يقرأ الصفَّ الصفري فئةَ مرجعٍ في الحالين، فلا يُفقد شيء ويكون اعتراض الزميل فارغًا."
          }
        ],
        answer: 1,
        hint: {
          en: "June has 15 listings in Deir al-Balah and 2 in Beit Lahia. Add those two numbers before you blame the argument for anything, then ask what you could still <em>detect</em> from each matrix.",
          ar: "في حزيران خمسة عشر إعلانًا في Deir al-Balah واثنان في Beit Lahia. فاجمع هذين العددين قبل أن تلوم الوسيط على شيء، ثم اسأل ماذا تستطيع أن <em>تكتشفه</em> من كل مصفوفة."
        },
        explain: {
          en: "<code>15 + 2 = 17</code>, and that is the whole answer. With all five dummies an all-zero city block means one thing and one thing only &mdash; a city the fitted list has never seen &mdash; so the matrix itself is the alarm. With <code>drop_first</code> it means <code>Deir al-Balah</code> <em>or</em> an unseen city, and nothing in the matrix distinguishes them. The answer that calls the two counts interchangeable is the dangerous one, because it is right about the arithmetic and wrong about the job: a linear model with an intercept does read both all-zero rows as the reference level, which is exactly why the two cases become indistinguishable to <em>you</em> while remaining perfectly scoreable to it &mdash; the 2 unseen listings are silently priced as Deir al-Balah flats. <code>dummy_na=True</code> is a real option with a real use (it says &ldquo;the absence is itself a fact&rdquo;, which is Lesson 2's missing indicator), but it would add a sixth column that the fitted list of 25 does not contain, and it does nothing about the 15 ambiguous reference rows. The rule the lesson settles on: keep all <em>k</em> dummies in the pipeline that produces predictions, and fit a <code>drop_first</code> version separately when you need to explain coefficients to a person.",
          ar: "‏<code>15 + 2 = 17</code>، وهذا هو الجواب كله. فمع المؤشِّرات الخمسة كلها يعني المربّعُ الصفري للمدينة شيئًا واحدًا لا غير &mdash; مدينةً لم ترها القائمة المضبوطة قط &mdash; فتكون المصفوفةُ نفسها هي الإنذار. ومع <code>drop_first</code> يعني <code>Deir al-Balah</code> <em>أو</em> مدينةً غير مرئية، ولا شيء في المصفوفة يفرّقهما. والجوابُ الذي يسمّي العدَّين متبادلين هو الخطير، لأنه مُحقٌّ في الحساب مخطئ في المهمة: فالنموذج الخطي ذو المقطع يقرأ الصفَّين الصفريين كليهما مستوى المرجع فعلًا، ولهذا بالضبط تصير الحالتان غيرَ متمايزتين <em>لك</em> وتبقيان قابلتين للقياس تمامًا له &mdash; فيُسعَّر الإعلانان غير المرئيين بصمت شقتين في Deir al-Balah. و<code>dummy_na=True</code> خيارٌ حقيقي له استعمال حقيقي (يقول «الغيابُ نفسه واقعة»، وهو مؤشِّر النقص في الدرس 2)، لكنه كان سيضيف عمودًا سادسًا لا تحتويه القائمة المضبوطة ذات الـ25، ولا يفعل شيئًا في صفوف المرجع الملتبسة الخمسة عشر. والقاعدةُ التي يستقرّ عليها الدرس: أبقِ المؤشِّرات <em>k</em> كلها في خط الأنابيب الذي يُنتج التنبؤات، واضبط نسخةَ <code>drop_first</code> على حِدة حين تحتاج أن تشرح المعاملات لإنسان."
        }
      },

      /* ---------------------------------------------------------- 10 */
      {
        id: "t2l5q10", type: "error", level: "medium",
        topics: ["t2-alphabetical-codes", "t2-ordinal-encoding"],
        q: {
          en: "<code>COND_ORDER</code> is the order Lesson 3 declared and put into the dtype: <code>poor &lt; fair &lt; good &lt; excellent</code>. This step should turn <code>condition</code> into one integer code that follows it. It runs, it prints, and it has the market upside down. Click the offending line.",
          ar: "‏<code>COND_ORDER</code> هو الترتيب الذي أعلنه الدرس 3 ووضعه في النوع: <code>poor &lt; fair &lt; good &lt; excellent</code>. وينبغي لهذه الخطوة أن تحوّل <code>condition</code> إلى رمز صحيح واحد يتبعه. وهي تعمل وتطبع والسوق عندها مقلوب. انقر السطر المخطئ."
        },
        code: code(
          "COND_ORDER = [\"poor\", \"fair\", \"good\", \"excellent\"]        # the order Lesson 3 declared",
          "sub   = flats[flats[\"monthly_rent\"].notna() & flats[\"condition\"].notna()]   # 429 flats",
          "plain = sub[\"condition\"].astype(\"string\").astype(\"category\")",
          "coded = plain.cat.codes",
          "y     = sub[\"monthly_rent\"].to_numpy(float)",
          "b     = fit(coded.to_numpy().reshape(-1, 1), y)",
          "print(\"code order:\", plain.cat.categories.tolist())",
          "print(\"intercept %.4f slope %.4f\" % (b[0], b[1]))",
          "print(\"a poor flat is priced at %.2f, an excellent one at %.2f\"",
          "      % (b[0] + 3 * b[1], b[0]))",
          "",
          "# code order: ['excellent', 'fair', 'good', 'poor']",
          "# intercept 235.0515 slope -16.4665",
          "# a poor flat is priced at 185.65, an excellent one at 235.05"
        ),
        answer: 3,
        solution: {
          code: code(
            "COND_ORDER = [\"poor\", \"fair\", \"good\", \"excellent\"]        # the order Lesson 3 declared",
            "sub   = flats[flats[\"monthly_rent\"].notna() & flats[\"condition\"].notna()]   # 429 flats",
            "coded = sub[\"condition\"].cat.codes        # the ordered dtype already carries the order",
            "y     = sub[\"monthly_rent\"].to_numpy(float)",
            "b     = fit(coded.to_numpy().reshape(-1, 1), y)",
            "print(\"code order:\", sub[\"condition\"].cat.categories.tolist())",
            "print(\"intercept %.4f slope %.4f\" % (b[0], b[1]))",
            "print(\"a poor flat is priced at %.2f, an excellent one at %.2f\"",
            "      % (b[0], b[0] + 3 * b[1]))"
          ),
          out: code(
            "code order: ['poor', 'fair', 'good', 'excellent']",
            "intercept 170.2312 slope 25.0519",
            "a poor flat is priced at 170.23, an excellent one at 245.39"
          ),
          en: "Delete the round trip through <code>string</code> and <code>category</code> and ask the column for its codes directly. <a href=\"#t2l3-s23\">Lesson&nbsp;3</a> already made <code>condition</code> an ordered <code>CategoricalDtype</code>, so <code>.cat.codes</code> reads <em>your</em> list rather than the alphabet: the slope becomes +25.05 shekels per step up the ladder, and the ordering of the two printed prices has to be swapped back as well, because they were written to match a reversed code.",
          ar: "احذف الرحلةَ عبر <code>string</code> ثم <code>category</code> واطلب من العمود رموزه مباشرة. فقد جعل <a href=\"#t2l3-s23\">الدرس 3</a> ‏<code>condition</code> ‏<code>CategoricalDtype</code> مرتَّبًا أصلًا، فتقرأ <code>.cat.codes</code> قائمتَك <em>أنت</em> لا الأبجدية: فيصير الميل +25.05 شيكلًا لكل خطوة صعودًا في السلّم، ويجب أيضًا إعادة ترتيب السعرَين المطبوعَين، لأنهما كُتبا على رمزٍ معكوس."
        },
        hint: {
          en: "<code>COND_ORDER</code> is declared on line 1 and never used again. Which line had the order already in its hands and threw it away?",
          ar: "‏<code>COND_ORDER</code> معلَنٌ في السطر 1 ولا يُستعمل بعده قط. فأيُّ سطرٍ كان الترتيبُ في يده أصلًا فرماه؟"
        },
        explain: {
          en: "Line 3 is the damage: <code>astype(\"string\")</code> throws the ordered dtype away and <code>astype(\"category\")</code> then has nothing to go on, so pandas numbers the levels alphabetically &mdash; <code>excellent</code> 0, <code>fair</code> 1, <code>good</code> 2, <code>poor</code> 3. The feature now runs backwards, and the fitted slope of &minus;16.4665 says every step towards a worse flat is worth sixteen and a half shekels <em>more</em> rent. Read the printed prices and notice how nearly it gets away with it: 185.65 for a poor flat and 235.05 for an excellent one is the right <em>direction</em>, because the alphabet here happens to be an almost perfect reversal of the severity order, so a reversed ladder still separates the levels &mdash; wrongly. Measured properly the gap is real money: the declared order scores 59.4828 held out against the alphabetical code's 63.3131, which is 3.83 shekels of the measurement level, priced. Line 4 is the tempting click because it is where the numbers are produced, and it is the one line that is simply correct &mdash; <code>.cat.codes</code> does exactly what it says on whatever dtype it is handed. On a column whose levels were <code>low</code>, <code>medium</code>, <code>high</code> the same bug would have given <code>high</code> 0, <code>low</code> 1, <code>medium</code> 2, which is not a ladder at all, and the gain would have been zero.",
          ar: "السطر 3 هو الضرر: فـ<code>astype(\"string\")</code> ترمي النوعَ المرتَّب و<code>astype(\"category\")</code> لا يبقى عندها ما تعتمد عليه، فترقّم بانداس المستوياتِ أبجديًّا &mdash; ‏<code>excellent</code> صفرًا و<code>fair</code> واحدًا و<code>good</code> اثنين و<code>poor</code> ثلاثة. فصارت الخاصية تجري بالمقلوب، ويقول الميلُ المضبوط &minus;16.4665 إن كل خطوة نحو شقة أسوأ تستحقّ ستة عشر شيكلًا ونصفًا <em>أكثر</em> إيجارًا. واقرأ السعرَين المطبوعَين ولاحظ كم كاد ينجو: فـ185.65 لشقة سيئة و235.05 لممتازة هو <em>الاتجاه</em> الصحيح، لأن الأبجدية هنا تكاد تكون عكسًا تامًّا لترتيب السوء اتفاقًا، فالسلّمُ المعكوس ما زال يفصل المستويات &mdash; فصلًا خاطئًا. وبالقياس الصحيح تكون الفجوةُ مالًا حقيقيًّا: فالترتيب المعلَن يسجّل 59.4828 على الصفوف المحجوزة في مقابل 63.3131 للرمز الأبجدي، وهذه 3.83 شيكلًا من مستوى القياس مسعَّرًا. والسطر 4 هو النقرة المغرية لأنه موضع إنتاج الأرقام، وهو السطر الوحيد الصحيح بلا مزيد &mdash; فـ<code>.cat.codes</code> تفعل ما تقوله بالضبط على أي نوع تُعطاه. وعلى عمودٍ مستوياته <code>low</code> و<code>medium</code> و<code>high</code> كان العطلُ نفسه سيعطي <code>high</code> صفرًا و<code>low</code> واحدًا و<code>medium</code> اثنين، وهذا ليس سلّمًا أصلًا، ولكان الربحُ صفرًا."
        }
      },

      /* ---------------------------------------------------------- 11 */
      {
        id: "t2l5q11", type: "trace", level: "medium",
        topics: ["t2-ordinal-encoding"],
        q: {
          en: "This is the explicit-map version of the ordinal encoding: the decision is written down where a reviewer can read it and argue with it. Of the 480 flats, 54 are <code>poor</code>, 138 <code>fair</code>, 180 <code>good</code>, 75 <code>excellent</code> and 33 blank. After the last line has run, what are the values of the four variables?",
          ar: "هذه نسخةُ الخريطة الصريحة من الترميز الترتيبي: فالقرار مكتوب حيث يستطيع المراجع أن يقرأه ويجادله. ومن الشقق الـ480 ‏54 <code>poor</code> و138 <code>fair</code> و180 <code>good</code> و75 <code>excellent</code> و33 فارغة. فبعد تنفيذ السطر الأخير، ما قيم المتغيرات الأربعة؟"
        },
        code: code(
          "COND_CODE = {\"poor\": 0, \"fair\": 1, \"good\": 2, \"excellent\": 3}   # the decision, written down",
          "",
          "m     = flats[\"condition\"].astype(\"string\").map(COND_CODE)",
          "",
          "kind  = str(m.dtype)",
          "blank = int(m.isna().sum())",
          "top   = int(m.value_counts().idxmax())",
          "three = int((m == 3).sum())"
        ),
        blanks: [
          { accept: ["float64"], label: { en: "kind", ar: "kind" } },
          { accept: ["33"], label: { en: "blank", ar: "blank" } },
          { accept: ["2"], label: { en: "top", ar: "top" } },
          { accept: ["75"], label: { en: "three", ar: "three" } }
        ],
        hint: {
          en: "The map's four values are all integers, and <code>.map()</code> infers the dtype from what it actually produced on <em>this</em> file. <code>idxmax()</code> returns the index label of the largest count, not the count.",
          ar: "قيم الخريطة الأربع كلها أعداد صحيحة، و<code>.map()</code> تستنبط النوع من الذي أنتجته فعلًا على <em>هذا</em> الملف. و<code>idxmax()</code> تعيد وسمَ الفهرس لأكبر عدّ، لا العدّ."
        },
        explain: {
          en: "The codes now run the right way and the 33 blanks stay missing instead of becoming a numeric <code>-1</code>, which are exactly the two defects of the <code>.cat.codes</code> version. The dtype is the trap: every value in <code>COND_CODE</code> is an <code>int</code>, but <code>.map()</code> had 33 cells with no key to look up, so it produced <code>NaN</code> and inferred <code>float64</code> from the result. Next month a file with no blank conditions would give you <code>int64</code> from the identical line &mdash; a dtype that depends on the data rather than on the decision, which is what <a href=\"#t2l3-s13\">Lesson&nbsp;3</a> warned about. <code>top</code> is 2 because <code>good</code> is the commonest level at 180 rows, and <code>idxmax()</code> returns the label 2.0, not the 180; <code>three</code> is the 75 <code>excellent</code> flats. The remaining defect the next version fixes: the order now exists in two places, in <code>COND_CODE</code> here and in the <code>CategoricalDtype</code> Lesson 3 built, so they can drift apart &mdash; and a value the map has no key for disappears into a silent <code>NaN</code>, which is how June's <code>very good</code> would be lost without a name.",
          ar: "صارت الرموز تجري في الاتجاه الصحيح وبقيت الفراغات الـ33 مفقودةً بدل أن تصير <code>-1</code> رقميًّا، وهذان بالضبط عيبا نسخة <code>.cat.codes</code>. والنوعُ هو الفخّ: فكل قيمة في <code>COND_CODE</code> عددٌ صحيح، لكن <code>.map()</code> وجدت 33 خلية لا مفتاح لها تبحث عنه، فأنتجت <code>NaN</code> واستنبطت <code>float64</code> من النتيجة. والشهرَ القادم كان ملفٌّ بلا حالات فارغة سيعطيك <code>int64</code> من السطر عينه &mdash; أي نوعًا يتوقف على البيانات لا على القرار، وهذا ما حذّر منه <a href=\"#t2l3-s13\">الدرس 3</a>. و<code>top</code> هي 2 لأن <code>good</code> أشيع المستويات بـ180 صفًّا، و<code>idxmax()</code> تعيد الوسمَ 2.0 لا الـ180؛ و<code>three</code> هي الشقق الممتازة الـ75. والعيبُ الباقي الذي تُصلحه النسخة التالية: أن الترتيب صار موجودًا في موضعين، في <code>COND_CODE</code> هنا وفي <code>CategoricalDtype</code> الذي بناه الدرس 3، فيمكن أن يتباعدا &mdash; والقيمةُ التي لا مفتاح لها في الخريطة تختفي في <code>NaN</code> صامتة، وهكذا كان مستوى <code>very good</code> في حزيران سيُفقَد بلا اسم."
        }
      },

      /* ---------------------------------------------------------- 12 */
      {
        id: "t2l5q12", type: "mcq", level: "medium",
        topics: ["t2-ordinal-measured"],
        q: {
          en: "Four encodings of <code>condition</code>, fitted on 323 training rows and scored on 106 held-out rows. <code>one median for everyone</code>: 0 columns, MAE train 60.7740, held out 64.6698. <code>alphabetical cat.codes</code>: 1 column, 61.6320, 63.3131. <code>ordered code 0..3</code>: 1 column, 60.5441, <strong>59.4828</strong>. <code>one-hot, 3 dummies</code>: 3 columns, <strong>60.5215</strong>, <strong>59.4548</strong>. Which reading of the table is correct?",
          ar: "أربعة ترميزات لـ<code>condition</code>، مضبوطةٌ على 323 صفًّا تدريبيًّا ومقيسةٌ على 106 صفوف محجوزة. ‏<code>one median for everyone</code>: صفر أعمدة، وخطأ التدريب 60.7740، والمحجوز 64.6698. ‏<code>alphabetical cat.codes</code>: عمود واحد، 61.6320، ‏63.3131. ‏<code>ordered code 0..3</code>: عمود واحد، 60.5441، <strong>59.4828</strong>. ‏<code>one-hot, 3 dummies</code>: ثلاثة أعمدة، <strong>60.5215</strong>، <strong>59.4548</strong>. فأيُّ قراءات الجدول صحيحة؟"
        },
        options: [
          {
            en: "The three dummies win: they have the lowest error in <em>both</em> columns, which is as unambiguous as a measurement gets, so three columns is the encoding to ship.",
            ar: "المؤشِّرات الثلاثة تفوز: فلها أدنى خطأ في <em>العمودين</em> كليهما، وهذا أوضح ما يكون القياس، فتكون الأعمدة الثلاثة هي الترميز الذي يُرسَل."
          },
          {
            en: "The ordered code is the real gain &mdash; 64.6698 down to 59.4828 held out, 5.19 shekels on a median rent of about 200 &mdash; and the 0.0280 by which three dummies beat it is an order of magnitude below the noise on this split, so one column is the better engineering: one parameter instead of three, one column that stays one column when a fifth level arrives, and a coefficient you can quote.",
            ar: "الرمزُ المرتَّب هو الربح الحقيقي &mdash; من 64.6698 إلى 59.4828 على المحجوز، أي 5.19 شيكلًا على وسيط إيجار نحو 200 &mdash; والـ0.0280 التي تتقدّمه بها ثلاثة مؤشِّرات أدنى بمرتبة من ضجيج هذا التقسيم، فيكون العمود الواحد هندسةً أفضل: وسيطٌ واحد بدل ثلاثة، وعمودٌ يبقى عمودًا واحدًا حين يصل مستوًى خامس، ومعاملٌ تستطيع أن تقتبسه."
          },
          {
            en: "The alphabetical code is vindicated: 63.3131 beats the constant's 64.6698, so label encoding a four-level column is fine after all and the fuss about inventing an order is theoretical.",
            ar: "الرمزُ الأبجدي مُبرَّأ: فـ63.3131 يتقدّم 64.6698 للثابت، فيكون ترميز الوسم لعمود بأربعة مستويات حسنًا على كل حال وتكون الجلبةُ على اختلاق ترتيبٍ نظريةً."
          },
          {
            en: "The ordered code wins because its four medians are 20, 20 and 25 shekels apart, which proves the levels really are equally spaced and therefore that one slope is the correct model for the column.",
            ar: "الرمزُ المرتَّب يفوز لأن وسائطه الأربعة تتباعد 20 و20 و25 شيكلًا، وهذا يُثبت أن المستويات متساوية التباعد فعلًا، فيكون الميلُ الواحد هو النموذج الصحيح للعمود."
          }
        ],
        answer: 1,
        hint: {
          en: "Two of the four readings pick the right winner for the wrong reason. Compare the size of the one-hot margin with the size of the gain the ordered code made, and recall what Lesson 1 measured the noise on this split to be.",
          ar: "اثنتان من القراءات الأربع تختاران الفائزَ الصحيح لسبب خاطئ. فقارن حجمَ فارق الترميز الأحادي بحجم الربح الذي حقّقه الرمزُ المرتَّب، وتذكّر ما قاسه الدرس 1 ضجيجًا على هذا التقسيم."
          },
        explain: {
          en: "The ordered code moves both columns in the same direction by a similar amount, which is what a transformation that adds genuine information looks like. The answer that crowns the three dummies is the one to resist, and it is tempting precisely because it is <em>numerically true</em> &mdash; 59.4548 really is lower than 59.4828. The margin is 0.0280 shekels, an order of magnitude smaller than the shekel or two of noise Lesson 1 measured on this split, so it is not a difference at all; and its training column is the real trap, because a version with more parameters almost always has the lowest training error, and choosing on that column would have picked one-hot by 0.02 for a reason that has nothing to do with the data. &ldquo;The lowest error wins&rdquo; is not a decision rule; &ldquo;the lowest error <em>by more than the noise</em>, on rows nobody fitted, with the fewest parameters&rdquo; is. The alphabetical answer mistakes an accident for a method: it keeps 1.36 of the 5.19 shekels only because the alphabet here is nearly the reverse of the severity order, and on <code>low</code>, <code>medium</code>, <code>high</code> it would have given 0 to <code>high</code> and gained nothing. And the answer that reads the even-looking medians as a proof of equal spacing has the logic backwards &mdash; the medians say 20, 20, 25 and the means say 25.95, 19.64, 33.55, so nothing here proves anything of the kind; the measurement shows the assumption cost 0.03 shekels <em>on this column</em>, which is a narrow and honest claim, not a proof.",
          ar: "الرمزُ المرتَّب ينقل العمودين في الاتجاه نفسه بمقدار متشابه، وهذا هو شكلُ التحويل الذي يضيف معلومةً حقيقية. والجوابُ الذي يُتوِّج المؤشِّرات الثلاثة هو الذي يجب مقاومته، وهو مغرٍ بالضبط لأنه <em>صحيحٌ عدديًّا</em> &mdash; فـ59.4548 أدنى من 59.4828 فعلًا. والفارقُ 0.0280 شيكل، أصغر بمرتبة من الشيكل أو الشيكلين من الضجيج الذي قاسه الدرس 1 على هذا التقسيم، فليس فرقًا أصلًا؛ وعمودُ تدريبه هو الفخ الحقيقي، لأن النسخةَ ذات الوسائط الأكثر لها أدنى خطأ تدريب في الغالب، ولكان الاختيار على ذلك العمود قد اختار الترميز الأحادي بـ0.02 لسبب لا علاقة له بالبيانات. فـ«أدنى خطأ يفوز» ليست قاعدة قرار؛ وأما «أدنى خطأ <em>بأكثر من الضجيج</em>، على صفوف لم يضبطها أحد، بأقلّ الوسائط» فهي القاعدة. والجوابُ الأبجدي يغلط فيحسب العرضَ منهجًا: فهو يُبقي 1.36 من الـ5.19 شيكلًا لأن الأبجدية هنا تكاد تكون عكسَ ترتيب السوء فقط، وعلى <code>low</code> و<code>medium</code> و<code>high</code> كان سيعطي <code>high</code> صفرًا ولا يربح شيئًا. والجوابُ الذي يقرأ الوسائطَ المتقاربةَ المظهر إثباتًا لتساوي التباعد منطقُه مقلوب &mdash; فالوسائط تقول 20 و20 و25 والمتوسطات تقول 25.95 و19.64 و33.55، فلا شيء هنا يُثبت شيئًا من ذلك؛ والقياسُ يُظهر أن الافتراض كلّف 0.03 شيكل <em>على هذا العمود</em>، وهذا ادّعاءٌ ضيّق أمين لا إثبات."
        }
      },

      /* ---------------------------------------------------------- 13 */
      {
        id: "t2l5q13", type: "output", level: "hard",
        topics: ["t2-level-insertion"],
        q: {
          en: "Write exactly what the program prints. One June listing was <code>very good</code>, and the source has now answered the question Lesson 3 left open: the new form offers <em>very good</em> between <em>good</em> and <em>excellent</em>. The 480 March flats are 54 <code>poor</code>, 138 <code>fair</code>, 180 <code>good</code>, 75 <code>excellent</code> and 33 blank &mdash; and not one of them says <code>very good</code>. No cell is edited and no file is re-read.",
          ar: "اكتب بالضبط ما يطبعه البرنامج. كان إعلانٌ واحد في حزيران <code>very good</code>، وقد أجاب المصدرُ الآن السؤالَ الذي تركه الدرس 3 مفتوحًا: فالاستمارةُ الجديدة تعرض <em>very good</em> بين <em>good</em> و<em>excellent</em>. وشقق آذار الـ480 هي 54 <code>poor</code> و138 <code>fair</code> و180 <code>good</code> و75 <code>excellent</code> و33 فارغة &mdash; ولا واحدة منها تقول <code>very good</code>. ولا خليةَ تُحرَّر ولا ملفَّ يُعاد قراءته."
        },
        code: code(
          "FIVE  = [\"poor\", \"fair\", \"good\", \"very good\", \"excellent\"]",
          "after = flats[\"condition\"].astype(\"string\").astype(pd.CategoricalDtype(FIVE, ordered=True))",
          "",
          "old, new = flats[\"condition\"].cat.codes, after.cat.codes",
          "",
          "print(int((new != old).sum()), \"of\", len(flats))",
          "print(sorted(set(flats.loc[new != old, \"condition\"].dropna())))",
          "print(int((old == 3).sum()), int((new == 3).sum()), int((new == 4).sum()))",
          "print(int((new == -1).sum()))"
        ),
        blanks: [
          { accept: ["75 of 480\n['excellent']\n75 0 75\n33"], lines: 4 }
        ],
        hint: {
          en: "Write the two code tables side by side: <code>poor fair good excellent</code> against <code>poor fair good very good excellent</code>. Which levels keep their number? And ask what code a level with no rows in the file occupies.",
          ar: "اكتب جدولَي الرموز جنبًا إلى جنب: <code>poor fair good excellent</code> في مقابل <code>poor fair good very good excellent</code>. فأيُّ المستويات تُبقي رقمها؟ واسأل أيَّ رمزٍ يحتلّه مستوًى لا صفوفَ له في الملف."
        },
        explain: {
          en: "Inserting a level renumbers every level above it and nothing below it: <code>poor</code>, <code>fair</code> and <code>good</code> keep 0, 1 and 2, and <code>excellent</code> moves from 3 to 4. So the rows that change are exactly the 75 excellent flats, 15.6% of the file, and the third line says it twice over: the code 3 held 75 rows before and holds <strong>0</strong> after, because <code>very good</code> now owns that number and no March flat is <code>very good</code>. A category with no rows still occupies a code &mdash; that is the surprise, and it is the whole mechanism of the bug. The fourth line is the control: the 33 blanks were <code>-1</code> before and are <code>-1</code> after, so nothing about the missing data moved. Nothing in the data changed, nothing raised, and a model fitted on the old codes is now wrong about every excellent flat in the file: it reads a 4 where it learned a 3 and adds one step of 25.05 shekels &mdash; an 11% over-prediction on a median rent of 230, applied to a sixth of the market, caused by editing a list in a source file. A declared order is a schema, and inserting a level is a schema change: refit the model with the five-level order, or map <code>very good</code> onto <code>good</code> and write that down. What you may not do is edit the list and keep scoring with yesterday's weights.",
          ar: "إدخالُ مستوًى يعيد ترقيم كل مستوًى فوقه ولا شيء تحته: فـ<code>poor</code> و<code>fair</code> و<code>good</code> تُبقي 0 و1 و2، و<code>excellent</code> ينتقل من 3 إلى 4. فالصفوفُ التي تتغير هي بالضبط الشقق الممتازة الـ75، أي 15.6% من الملف، ويقول السطر الثالث ذلك مرتين: فالرمز 3 حمل 75 صفًّا قبلًا ويحمل <strong>صفرًا</strong> بعدًا، لأن <code>very good</code> صار يملك ذلك الرقم ولا شقةَ في آذار <code>very good</code>. والفئةُ التي لا صفوفَ لها تحتلّ رمزًا مع ذلك &mdash; وهذه هي المفاجأة، وهي ميكانيكا العطل كلها. والسطرُ الرابع هو الضابط: فالفراغات الـ33 كانت <code>-1</code> قبلًا وهي <code>-1</code> بعدًا، فلم يتزحزح شيء عن البيانات المفقودة. ولم يتغير شيء في البيانات ولم يرفع شيءٌ خطأً، ونموذجٌ مضبوط على الرموز القديمة صار مخطئًا في كل شقة ممتازة في الملف: فيقرأ 4 حيث تعلّم 3 ويضيف خطوةً من 25.05 شيكلًا &mdash; أي إفراطًا في التنبؤ بـ11% على وسيط إيجار 230، مطبَّقًا على سدس السوق، سببه تحريرُ قائمة في ملف مصدري. والترتيبُ المعلَن مخطط، وإدخالُ مستوًى تغييرٌ في المخطط: فأعِد ضبط النموذج بالترتيب الخماسي، أو اربط <code>very good</code> بـ<code>good</code> واكتب ذلك. وأما ما لا يحقّ لك فتحريرُ القائمة ومواصلةُ القياس بأوزان الأمس."
        }
      },

      /* ---------------------------------------------------------- 14 */
      {
        id: "t2l5q14", type: "order", level: "easy",
        topics: ["t2-cardinality", "t2-frequency-encoding", "t2-other-bucket"],
        q: {
          en: "Five encodings of <code>agency</code> &mdash; 18 agencies over the 346 training rows that have a rent, a short head and a long thin tail, four agencies with a single training row each. Put the five in the order the lesson develops them, where each one fixes the <em>named</em> defect of the one before it.",
          ar: "خمسة ترميزات لـ<code>agency</code> &mdash; ‏18 وكالة على الصفوف التدريبية الـ346 التي لها إيجار، ورأسٌ قصير وذيلٌ طويل رقيق، وأربع وكالات لكلٍّ منها صفٌّ تدريبي واحد. رتّب الخمسة بالترتيب الذي يُنمّيها به الدرس، حيث يُصلح كلٌّ منها العيبَ <em>المسمّى</em> في الذي قبله."
        },
        items: [
          {
            en: "<strong>One-hot all eighteen</strong> &mdash; 17 free parameters for 346 rows, four of them fitted to a single listing each. <em>The named defect:</em> the encoding gives the same weight of representation to an agency with 68 listings and one with a single listing.",
            ar: "<strong>ترميز أحادي للثمانية عشر كلها</strong> &mdash; ‏17 وسيطًا حرًّا لـ346 صفًّا، أربعةٌ منها مضبوطة على إعلان واحد لكلٍّ. <em>العيب المسمّى:</em> يعطي الترميزُ وزنَ التمثيل نفسه لوكالةٍ بـ68 إعلانًا ولأخرى بإعلان واحد."
          },
          {
            en: "<strong>Frequency encoding</strong> &mdash; one column holding each agency's share of the training rows, so 17 columns become 1 and it cannot leak, because it never looks at the rent. <em>Still open:</em> the four agencies with one listing each share the value 0.002890, so 15 distinct numbers stand for 18 agencies, and two agencies with the same count and different rents are the same value to the model.",
            ar: "<strong>الترميز بالتكرار</strong> &mdash; عمودٌ واحد يحمل نصيبَ كل وكالة من صفوف التدريب، فتصير سبعةَ عشر عمودًا واحدًا ولا يستطيع التسرّب، لأنه لا ينظر إلى الإيجار قط. <em>وما يبقى مفتوحًا:</em> الوكالات الأربع التي لكلٍّ منها إعلان واحد تتشارك القيمة 0.002890، فتقف 15 قيمةً مميّزة مكان 18 وكالة، وتكون وكالتان بالعدد نفسه وإيجارَين مختلفَين القيمةَ نفسها عند النموذج."
          },
          {
            en: "<strong>Target encoding on the training rows</strong> &mdash; one column holding each agency's mean rent, so the number finally means something about rent rather than about traffic. <em>Still open:</em> for the four one-row agencies the feature <em>is</em> that row's own rent &mdash; listing 5477 asks 180 and is handed the feature 180 &mdash; and least squares returns intercept 0.000000, slope 1.000000.",
            ar: "<strong>الترميز بالهدف على صفوف التدريب</strong> &mdash; عمودٌ واحد يحمل متوسطَ إيجار كل وكالة، فيصير الرقم أخيرًا يعني شيئًا عن الإيجار لا عن الحركة. <em>وما يبقى مفتوحًا:</em> للوكالات الأربع ذات الصف الواحد تكون الخاصيةُ <em>هي</em> إيجارَ ذلك الصف نفسه &mdash; فالإعلان 5477 يطلب 180 ويُعطى الخاصية 180 &mdash; وتعيد المربعات الصغرى مقطعًا 0.000000 وميلًا 1.000000."
          },
          {
            en: "<strong>Out of fold, and smoothed</strong> &mdash; each training row encoded from the means of the other four folds, so no row contributes to its own feature (Shams Homes was 180.0 and becomes 209.98), and every group mean pulled towards the global mean in proportion to how little data it has (Yasmin Estates 160.00 &rarr; 205.63 at <code>m = 10</code>, Zaytoun Letting 223.85 &rarr; 217.91). <em>Still open:</em> the folds, the seed and the smoothing weight are three parameters with no principled value on 346 rows, and the held-out rows are still encoded from the full training means, so the training and the serving feature are computed differently.",
            ar: "<strong>خارج الطيّة ومُملَّسًا</strong> &mdash; يُرمَّز كل صف تدريبي من متوسطات الطيّات الأربع الأخرى، فلا يُسهم صفٌّ في خاصيته (كان Shams Homes ‏180.0 فصار 209.98)، ويُجذَب كل متوسط مجموعة نحو المتوسط العام بنسبة قلّة بياناتها (فينتقل Yasmin Estates من 160.00 إلى 205.63 عند <code>m = 10</code>، وZaytoun Letting من 223.85 إلى 217.91). <em>وما يبقى مفتوحًا:</em> الطيّاتُ والبذرة ووزنُ التمليس ثلاثةُ وسائط لا قيمةَ مبدئية لها على 346 صفًّا، وما زالت الصفوف المحجوزة تُرمَّز من متوسطات التدريب الكاملة، فتُحسب خاصيةُ التدريب وخاصيةُ الخدمة حسابين مختلفين."
          },
          {
            en: "<strong>Top 5 + <code>Other</code></strong> &mdash; the fitted parameter is a list of five names, and every other agency (rare, absent from training, or arriving for the first time in June) shares one level fitted on 97 real listings, so every column has at least 28 rows behind it and next month's <code>Andalus Homes</code> gets a <em>trained</em> answer rather than a row of zeros. <em>Still open:</em> it pools agencies that are not alike, the threshold of five is a parameter you chose, and &mdash; the table says it plainly &mdash; it does not win.",
            ar: "<strong>الخمس الأُوَل + <code>Other</code></strong> &mdash; الوسيطُ المضبوط قائمةٌ بخمسة أسماء، وكل وكالة أخرى (نادرةٌ أو غائبةٌ عن التدريب أو واصلةٌ أول مرة في حزيران) تتشارك مستوًى واحدًا مضبوطًا على 97 إعلانًا حقيقيًّا، فيكون وراء كل عمود 28 صفًّا على الأقل وتحصل <code>Andalus Homes</code> في الشهر القادم على جوابٍ <em>مدرَّب</em> لا على صفٍّ من الأصفار. <em>وما يبقى مفتوحًا:</em> يجمع ما ليس متشابهًا، وعتبةُ الخمس وسيطٌ اخترته، و&mdash; يقول الجدول ذلك صريحًا &mdash; لا يفوز."
          }
        ],
        answer: [0, 1, 2, 3, 4],
        hint: {
          en: "Do not sort by how clever each one sounds. Read the <em>named defect</em> at the end of each item and find the one that the next item's first sentence repairs; one of the five fixes a leak, and a leak cannot be fixed before it has been introduced.",
          ar: "لا ترتّبها بمقدار ما يبدو كلٌّ منها ذكيًّا. اقرأ <em>العيب المسمّى</em> في آخر كل بند واعثر على الذي تُصلحه الجملةُ الأولى من البند التالي؛ فواحدٌ من الخمسة يُصلح تسرّبًا، والتسرّبُ لا يُصلَح قبل أن يُدخَل."
        },
        explain: {
          en: "The chain is a chain of defects, not of sophistication. One-hot is what Concept 2 prescribes, applied without looking at the tail, and its defect is representation: 17 parameters, four of them memorised rows. Frequency encoding kills the parameter count completely and cannot leak, and in exchange it answers a different question &mdash; &ldquo;how busy is this agency?&rdquo; rather than &ldquo;which agency is this?&rdquo; &mdash; and collides. Target encoding removes the collision by putting rent into the number, and in doing so introduces the leak, which is why it must come before the repair of that leak. Out-of-fold and smoothing are that repair, and they are two independent repairs of two different halves: out-of-fold removes the row from its own parameter, smoothing removes the instability that made the leak matter. The <code>Other</code> bucket comes last because it is the recommended form and because its honest accounting is the lesson's conclusion: measured over ten splits it beats the full one-hot and the honest target encoding and still does not beat one constant, so on 480 rows this column should not be encoded at all. Note that the bucket is the only one of the five that was <em>fitted with the unseen case in mind</em>, which is why it is the form to keep if you keep the column.",
          ar: "السلسلةُ سلسلةُ عيوب لا سلسلةُ تطوّر. فالترميز الأحادي هو الذي يأمر به المفهوم 2 مطبَّقًا بلا نظرٍ في الذيل، وعيبُه التمثيل: ‏17 وسيطًا، أربعةٌ منها صفوفٌ محفوظة. والترميزُ بالتكرار يقتل عددَ الوسائط تمامًا ولا يستطيع التسرّب، وهو في المقابل يجيب سؤالًا آخر &mdash; «كم هذه الوكالة مشغولة؟» لا «أيُّ وكالةٍ هذه؟» &mdash; ويتصادم. والترميزُ بالهدف يحذف التصادمَ بوضع الإيجار في الرقم، وهو بذلك يُدخل التسرّب، ولهذا وجب أن يتقدّم إصلاحَ ذلك التسرّب. وخارجُ الطيّة والتمليس هما ذلك الإصلاح، وهما إصلاحان مستقلان لنصفَين مختلفَين: فخارج الطيّة يحذف الصفَّ من وسيطه، والتمليسُ يحذف عدمَ الاستقرار الذي جعل التسرّب يهمّ. ويأتي دلو <code>Other</code> آخرًا لأنه الصورةُ الموصى بها ولأن حسابه الأمين هو خلاصةُ الدرس: فمقيسًا على عشرة تقسيمات يتقدّم الترميزَ الأحادي الكامل والترميزَ بالهدف الأمين ولا يتقدّم مع ذلك ثابتًا واحدًا، فلا ينبغي على 480 صفًّا أن يُرمَّز هذا العمود أصلًا. ولاحظ أن الدلو هو الوحيد من الخمسة الذي <em>ضُبط والحالةُ غير المرئية في الحسبان</em>، ولهذا كان الصورةَ التي تُبقيها إن أبقيتَ العمود."
        }
      },

      /* ---------------------------------------------------------- 15 */
      {
        id: "t2l5q15", type: "mcq", level: "hard",
        topics: ["t2-target-encoding", "t2-target-is-onehot"],
        q: {
          en: "Target encoding of <code>agency</code>, fitted on the 346 training rows, is handed to least squares as a single feature. The fitted coefficients come back as intercept <strong>0.000000</strong> and slope <strong>1.000000</strong>, and the training MAE of that one column is <strong>60.7217</strong> &mdash; the same four decimals as the seventeen-dummy one-hot model on the same rows. Which statement explains both facts at once?",
          ar: "يُسلَّم الترميزُ بالهدف لـ<code>agency</code>، مضبوطًا على صفوف التدريب الـ346، إلى المربعات الصغرى خاصيةً واحدة. فتخرج المعاملات المضبوطة مقطعًا <strong>0.000000</strong> وميلًا <strong>1.000000</strong>، ويكون خطأُ التدريب المطلق المتوسط لذلك العمود الواحد <strong>60.7217</strong> &mdash; أربعةُ العشريات نفسها لنموذج الترميز الأحادي ذي السبعة عشر مؤشِّرًا على الصفوف نفسها. فأيُّ العبارات يشرح الواقعتين معًا؟"
        },
        options: [
          {
            en: "The encoding is perfectly calibrated, which is the property you want from a feature, and the matching MAE confirms that the compression from 17 columns to 1 was lossless.",
            ar: "الترميزُ معايَرٌ تمامًا، وهذه هي الخاصية التي تريدها من خاصية، ويؤكّد تطابقُ الخطأ أن الضغطَ من 17 عمودًا إلى 1 لم يفقد شيئًا."
          },
          {
            en: "A linear model on a complete set of dummies predicts each group's own mean, so the one-hot model's fitted values <em>are</em> the per-agency means &mdash; which is exactly what the target encoding puts in the column. The feature is already the prediction, so the best line through it is the identity; and the compression from 17 columns to 1 removed parameters and not one unit of overfitting.",
            ar: "النموذجُ الخطي على مجموعة مؤشِّرات كاملة يتنبأ بمتوسط كل مجموعة، فتكون القيمُ المضبوطة للنموذج الأحادي <em>هي</em> متوسطاتِ الوكالات &mdash; وهذا بالضبط ما يضعه الترميزُ بالهدف في العمود. فالخاصيةُ هي التنبؤ أصلًا، فيكون أفضلُ خطٍّ عبرها خطَّ الهوية؛ والضغطُ من 17 عمودًا إلى 1 حذف وسائط ولا وحدةً واحدة من فرط المطابقة."
          },
          {
            en: "A slope of 1 means the agency has no effect on rent: the model found that no rescaling of the column was needed, so the feature is uninformative and the matching MAE is the baseline's.",
            ar: "الميلُ 1 يعني أن الوكالة لا أثر لها في الإيجار: فقد وجد النموذج أن العمود لا يحتاج إعادةَ قياس، فتكون الخاصية بلا معلومة ويكون الخطأُ المتطابق خطأَ خط الأساس."
          },
          {
            en: "Target encoding regularises the one-hot model, and the two numbers prove it: one parameter instead of seventeen is by definition less overfitting, which is why it is listed among the advanced feature-engineering techniques.",
            ar: "الترميزُ بالهدف يُنظّم النموذجَ الأحادي، والرقمان يُثبتان ذلك: فوسيطٌ واحد بدل سبعة عشر أقلُّ فرطَ مطابقةٍ بالتعريف، ولهذا يُذكر بين تقنيات هندسة الخصائص المتقدّمة."
          }
        ],
        answer: 1,
        hint: {
          en: "Ask what a linear model on a complete set of dummies can possibly predict for the rows of one group, given that the dummies partition the rows and the best constant for a group is its own mean. Then ask what is left for a model to do once the feature already holds that prediction.",
          ar: "اسأل بماذا يمكن للنموذج الخطي على مجموعة مؤشِّرات كاملة أن يتنبأ لصفوف مجموعة واحدة، بما أن المؤشِّرات تُجزّئ الصفوف وأفضلُ ثابت لمجموعة هو متوسطها. ثم اسأل ماذا يبقى للنموذج أن يفعل متى حملت الخاصيةُ ذلك التنبؤ أصلًا."
        },
        explain: {
          en: "Least squares with one feature finds the line that best predicts <code>y</code> from <code>x</code>; getting back <code>y = 0 + 1&times;x</code> means the feature was already the best prediction of the target that column can give. That is the definition of target encoding and also its indictment. The answer that calls the regularisation argument a proof is the one the brief of every tutorial encourages, and the two numbers refute it: identical training error to four decimals is identical <em>memorisation</em> &mdash; target encoding does not reduce overfitting, it reduces column count, and those are different things. The 60.7217 is the same memorisation in a smaller container. &ldquo;Perfectly calibrated&rdquo; is the subtlest wrong answer, because calibration is a real and desirable property of a <em>prediction</em>; here it is a property of a <em>feature</em>, and a feature that is already the prediction has left the model nothing to do and nothing to regularise. And a slope of 1 is not an absence of effect: it is the model copying the column. Two things follow that are worth keeping. The part of Concept 5 that actually regularises is the <em>smoothing</em>, because pulling a one-row group towards the global mean is what a one-hot model with a ridge penalty does to a one-row dummy. And the identity slope is a diagnostic you can use: a near-1 slope with a near-0 intercept on a target-encoded column is the signature of the leak, not of a good feature.",
          ar: "المربعاتُ الصغرى بخاصية واحدة تجد الخطَّ الذي يتنبأ بـ<code>y</code> من <code>x</code> أفضلَ تنبؤ؛ واستعادةُ <code>y = 0 + 1&times;x</code> تعني أن الخاصية كانت أصلًا أفضلَ تنبؤ بالهدف يستطيعه ذلك العمود. وهذا تعريفُ الترميز بالهدف وهو إدانتُه أيضًا. والجوابُ الذي يسمّي حجةَ التنظيم إثباتًا هو الذي يشجّعه كل درسٍ تعليمي، والرقمان ينقضانه: فخطأُ تدريبٍ متطابق إلى أربع عشريات <em>حفظٌ</em> متطابق &mdash; فالترميزُ بالهدف لا يقلّل فرطَ المطابقة بل يقلّل عددَ الأعمدة، وهذان أمران مختلفان. والـ60.7217 هو الحفظُ نفسه في وعاء أصغر. و«معايَرٌ تمامًا» هو أدقُّ الأجوبة الخاطئة، لأن المعايرة خاصيةٌ حقيقية مرغوبة لـ<em>تنبؤ</em>؛ وهي هنا خاصيةٌ لـ<em>خاصية</em>، والخاصيةُ التي هي التنبؤ أصلًا لم تترك للنموذج ما يفعله ولا ما يُنظّمه. والميلُ 1 ليس غيابَ أثر: بل هو النموذجُ ينسخ العمود. ويتبع ذلك أمران يستحقّان الحفظ. فالذي يُنظّم فعلًا في المفهوم 5 هو <em>التمليس</em>، لأن جذبَ مجموعةٍ ذات صف واحد نحو المتوسط العام هو ما يفعله نموذجٌ أحادي بعقوبة حِدّية بمؤشِّرٍ ذي صف واحد. والميلُ الهويّة فحصٌ تستطيع استعماله: فميلٌ قريب من 1 بمقطع قريب من 0 على عمود مرمَّز بالهدف هو توقيعُ التسرّب لا توقيعُ خاصيةٍ جيدة."
        }
      },

      /* ---------------------------------------------------------- 16 */
      {
        id: "t2l5q16", type: "compare", level: "hard",
        topics: ["t2-out-of-fold", "t2-target-encoding"],
        q: {
          en: "Two target encodings of <code>agency</code>, both scored on the same 113 held-out rows that nobody fitted anything on. For reference, the one-parameter baseline &mdash; predict the training median for every flat &mdash; scores MAE train 60.9104 and held out <strong>63.6726</strong>. Which statement is correct?",
          ar: "ترميزان بالهدف لـ<code>agency</code>، مقيسان كلاهما على الصفوف المحجوزة الـ113 نفسها التي لم يضبط أحدٌ عليها شيئًا. وللمرجع، خطُّ الأساس ذو الوسيط الواحد &mdash; تنبَّأ بوسيط التدريب لكل شقة &mdash; يسجّل خطأ تدريب 60.9104 ومحجوزًا <strong>63.6726</strong>. فأيُّ العبارات صحيحة؟"
        },
        codeA: code(
          "ALL   = flats[flats[\"monthly_rent\"].notna()]        # all 459 labelled rows",
          "amean = ALL.groupby(\"agency\", observed=True)[\"monthly_rent\"].mean()",
          "fb    = float(ALL[\"monthly_rent\"].mean())",
          "",
          "A = TR[\"agency\"].map(amean).fillna(fb).to_numpy().reshape(-1, 1)",
          "B = TE[\"agency\"].map(amean).fillna(fb).to_numpy().reshape(-1, 1)",
          "b = fit(A, ytr)",
          "print(\"MAE train %.4f  held out %.4f\" % (mae(ytr, predict(b, A)), mae(yte, predict(b, B))))",
          "",
          "# MAE train 60.9033  held out 63.9125"
        ),
        codeB: code(
          "def oof_target(df, k=5, seed=3):",
          "    \"\"\"Encode each row from the OTHER folds, so no row is in its own parameter.\"\"\"",
          "    out = pd.Series(np.nan, index=df.index, dtype=float)",
          "    for part in np.array_split(np.array(df.sample(frac=1.0, random_state=seed).index), k):",
          "        rest = df.drop(part)",
          "        m = rest.groupby(\"agency\", observed=True)[\"monthly_rent\"].mean()",
          "        out.loc[part] = df.loc[part, \"agency\"].map(m).fillna(",
          "            float(rest[\"monthly_rent\"].mean())).to_numpy()",
          "    return out",
          "",
          "tmean = TR.groupby(\"agency\", observed=True)[\"monthly_rent\"].mean()   # FIT on train only",
          "b = fit(oof_target(TR).to_numpy().reshape(-1, 1), ytr)",
          "print(\"MAE train %.4f  held out %.4f\" % (mae(ytr, predict(b, oof_target(TR).to_numpy().reshape(-1, 1))),",
          "      mae(yte, TE[\"agency\"].map(tmean).fillna(float(ytr.mean())).to_numpy() * b[1] + b[0])))",
          "",
          "# MAE train 61.6040  held out 64.4313"
        ),
        options: [
          {
            en: "A has the better held-out error and A is the one to throw away. Fitting the means on every labelled row puts each held-out row's own rent inside its own feature, so the leak does not merely inflate the training score &mdash; it contaminates the very measurement you would use to detect it. B's 64.4313 is the honest number, and the honest number says this column does not beat the constant's 63.6726.",
            ar: "لـأ خطأٌ محجوزٌ أفضل وأ هي التي تُرمى. فضبطُ المتوسطات على كل صفٍّ موسوم يضع إيجارَ كل صف محجوز في خاصيته، فلا يكتفي التسرّبُ بتضخيم خطأ التدريب &mdash; بل يُلوّث القياسَ نفسه الذي كنت ستستعمله لكشفه. والـ64.4313 في ب هو الرقمُ الأمين، والرقمُ الأمين يقول إن هذا العمود لا يتقدّم 63.6726 للثابت."
          },
          {
            en: "A is better and the result stands: 63.9125 against 64.4313 on rows neither model was fitted on, measured with the chapter's own ruler, is exactly the comparison this chapter says to trust.",
            ar: "أ أفضل والنتيجةُ قائمة: فـ63.9125 في مقابل 64.4313 على صفوف لم يُضبط عليها أيٌّ من النموذجين، مقيسةً بمسطرة الفصل نفسها، هي بالضبط المقارنةُ التي يقول هذا الفصل أن تثق بها."
          },
          {
            en: "B is better and the margin proves the principle: out-of-fold encoding always lowers the held-out error, because removing a row from its own parameter removes overfitting.",
            ar: "ب أفضل والفارقُ يُثبت المبدأ: فالترميزُ خارج الطيّة يُخفّض الخطأ المحجوز دائمًا، لأن حذفَ الصف من وسيطه يحذف فرطَ المطابقة."
          },
          {
            en: "They are the same model with different arithmetic: out-of-fold changes only which rows the group means are computed on, and the means of 346 rows and of 459 rows differ by rounding, so the 0.5-shekel gap is floating-point noise.",
            ar: "هما النموذجُ نفسه بحسابٍ مختلف: فخارج الطيّة لا يغيّر إلا أيَّ الصفوف تُحسب عليها متوسطات المجموعات، ومتوسطاتُ 346 صفًّا و459 صفًّا تختلف بالتدوير، فتكون فجوةُ نصف الشيكل ضجيجَ فاصلة عائمة."
          }
        ],
        answer: 0,
        hint: {
          en: "Ask where each held-out row's own rent is, in each version. Then ask whether a measurement that has the answer inside it can be used to judge the thing that put it there.",
          ar: "اسأل أين يكون إيجارُ كل صف محجوز في كل نسخة. ثم اسأل هل يمكن لقياسٍ فيه الجوابُ أن يُستعمل في الحكم على الذي وضعه فيه."
        },
        explain: {
          en: "A changes one word &mdash; which rows the group means are fitted on &mdash; and buys two shekels of apparent accuracy with a feature that is strictly worse. The mechanism is the thing to carry: a leak in an imputer or a scaler inflates the <em>training</em> score, which a careful person catches by looking at the held-out column; target encoding fitted on every labelled row puts each held-out row's own rent inside that row's own feature, so it inflates the <em>held-out</em> score too. A leaked measurement cannot detect leakage. That is why the chapter's rule is &ldquo;fit on train, by construction&rdquo; and not &ldquo;check whether the score looks suspicious&rdquo;. The answer that accepts A's number is the trap this question exists for, and it is tempting because it invokes the right ruler &mdash; held-out MAE &mdash; while forgetting that the ruler is only a ruler if the parameters never saw those rows. The answer that calls out-of-fold a guaranteed improvement is wrong in the other direction: B is worse than A here and worse than the constant, which is the honest finding, and &ldquo;always&rdquo; is never available. And A's training error, 60.9033, is <em>worse</em> than the honest train-only version's 60.7217, which looks backwards and is correct: means fitted on 459 rows are less tailored to the 346 training rows than means fitted on the 346 themselves. A leak does not always show up as a better training score; it shows up wherever the information crossed.",
          ar: "أ تغيّر كلمةً واحدة &mdash; أيَّ الصفوف تُضبَط عليها متوسطات المجموعات &mdash; فتشتري شيكلين من دقةٍ ظاهرة بخاصيةٍ أسوأ بالقطع. والميكانيكا هي ما يُحمل: فتسرّبٌ في مُعوِّضٍ أو مُقايِس يضخّم خطأ <em>التدريب</em>، ويقتنصه الحريصُ بالنظر في العمود المحجوز؛ وأما الترميزُ بالهدف مضبوطًا على كل صف موسوم فيضع إيجارَ كل صف محجوز في خاصية ذلك الصف، فيضخّم الخطأ <em>المحجوز</em> أيضًا. والقياسُ المتسرَّب إليه لا يستطيع كشفَ التسرّب. ولهذا كانت قاعدةُ الفصل «اضبط على التدريب، بالبناء» لا «افحص هل يبدو الرقم مريبًا». والجوابُ الذي يقبل رقمَ أ هو الفخُّ الذي وُجد هذا السؤال له، وهو مغرٍ لأنه يستدعي المسطرةَ الصحيحة &mdash; الخطأَ المحجوز &mdash; وينسى أن المسطرة لا تكون مسطرةً إلا إن لم ترَ الوسائطُ تلك الصفوف قط. والجوابُ الذي يسمّي خارجَ الطيّة تحسينًا مضمونًا خاطئٌ في الاتجاه الآخر: فـب أسوأ من أ هنا وأسوأ من الثابت، وهذه هي النتيجةُ الأمينة، و«دائمًا» غيرُ متاح قط. وخطأُ تدريب أ، ‏60.9033، <em>أسوأ</em> من 60.7217 للنسخة الأمينة على التدريب وحده، وهذا يبدو مقلوبًا وهو صحيح: فمتوسطاتٌ مضبوطة على 459 صفًّا أقلُّ تخصيصًا لصفوف التدريب الـ346 من متوسطات مضبوطة على الـ346 نفسها. فالتسرّبُ لا يظهر دائمًا خطأَ تدريبٍ أفضل؛ بل يظهر حيث عبرت المعلومة."
        }
      },

      /* ---------------------------------------------------------- 17 */
      {
        id: "t2l5q17", type: "multi", level: "hard",
        topics: ["t2-other-bucket", "t2-cardinality"],
        q: {
          en: "A single split of 459 labelled rows cannot tell 64.58 from 65.03, so the whole comparison was repeated for <code>random_state</code> 0 to 9. The mean held-out MAE over the ten splits: <strong>one constant 61.26</strong>, leaky target encoding 61.20, frequency encoding 62.11, top&nbsp;5&nbsp;+&nbsp;<code>Other</code> 62.20, full one-hot 63.58, honest target encoding 63.63. Across those ten splits the full one-hot, the frequency encoding, the bucket and the honest target encoding beat the constant in 1, 2, 2 and 1 of the ten respectively &mdash; and the leaky one in 6. Which conclusions does this support? (Choose all that apply.)",
          ar: "تقسيمٌ واحد لـ459 صفًّا موسومًا لا يفرّق 64.58 من 65.03، فأُعيدت المقارنةُ كلها لـ<code>random_state</code> من 0 إلى 9. ومتوسطُ الخطأ المحجوز على التقسيمات العشرة: <strong>ثابتٌ واحد 61.26</strong>، والترميزُ بالهدف المتسرِّب 61.20، والترميزُ بالتكرار 62.11، والخمسُ الأُوَل + <code>Other</code> ‏62.20، والترميزُ الأحادي الكامل 63.58، والترميزُ بالهدف الأمين 63.63. وعلى تلك التقسيمات العشرة يتقدّم الترميزُ الأحادي الكامل والترميزُ بالتكرار والدلو والترميزُ بالهدف الأمين الثابتَ في 1 و2 و2 و1 من العشرة على الترتيب &mdash; والمتسرِّب في 6. فأيُّ الخلاصات يدعمها هذا؟ (اختر كل ما ينطبق.)"
        },
        options: [
          {
            en: "On this file <code>agency</code> should not be encoded at all: no honest encoding of it beats predicting one constant for every flat, and that is a conclusion you can only reach by measuring.",
            ar: "لا ينبغي على هذا الملف أن يُرمَّز <code>agency</code> أصلًا: فما من ترميزٍ أمين له يتقدّم التنبؤَ بثابتٍ واحد لكل شقة، وهذه خلاصةٌ لا تبلغها إلا بالقياس."
          },
          {
            en: "The <code>Other</code> bucket and the frequency encoding really are better than the full one-hot and than honest target encoding, and that ordering survives ten splits rather than resting on one.",
            ar: "دلو <code>Other</code> والترميزُ بالتكرار أفضلُ فعلًا من الترميز الأحادي الكامل ومن الترميز بالهدف الأمين، وهذا الترتيب ينجو من عشرة تقسيمات لا يستند إلى واحد."
          },
          {
            en: "The only predictor on the board that beats the constant is the one that is cheating, which is why &ldquo;the lowest held-out error wins&rdquo; is not a decision rule.",
            ar: "المتنبِّئُ الوحيد على اللوح الذي يتقدّم الثابت هو الذي يغشّ، ولهذا لا تكون «أدنى خطأ محجوز يفوز» قاعدةَ قرار."
          },
          {
            en: "If you kept the column anyway &mdash; because you expected it to matter at a larger scale &mdash; the <code>Other</code> bucket is the form to keep, because it is the only one of them that gives June's three new agencies a trained answer instead of a row of zeros.",
            ar: "إن أبقيتَ العمود على كل حال &mdash; لأنك تتوقع أن يهمّ على نطاق أكبر &mdash; فدلو <code>Other</code> هو الصورةُ التي تُبقيها، لأنه الوحيد منها الذي يعطي وكالات حزيران الثلاث الجديدة جوابًا مدرَّبًا بدل صفٍّ من الأصفار."
          },
          {
            en: "Averaging ten splits removes the noise, so the 0.06-shekel gap between the leaky encoding's 61.20 and the constant's 61.26 is now a real difference and the leaky feature is genuinely the strongest predictor here.",
            ar: "متوسطُ عشرة تقسيمات يحذف الضجيج، فتصير فجوةُ 0.06 شيكل بين 61.20 للمتسرِّب و61.26 للثابت فرقًا حقيقيًّا ويكون المتسرِّب أقوى متنبِّئ هنا فعلًا."
          },
          {
            en: "The full one-hot is the worst honest encoding in the table, which identifies the 95%-zeros sparsity of its block as the cause and points at a sparse representation as the cure.",
            ar: "الترميزُ الأحادي الكامل أسوأُ ترميزٍ أمين في الجدول، وهذا يحدّد تخلخلَ مربّعه بنسبة 95% أصفارًا سببًا ويشير إلى تمثيلٍ متخلخل علاجًا."
          },
          {
            en: "Frequency encoding comes out ahead of the other honest encodings because it carries the most information about the agency, so information content is what the ten splits are ranking.",
            ar: "الترميزُ بالتكرار يتقدّم الترميزاتِ الأمينة الأخرى لأنه يحمل أكثرَ معلومةٍ عن الوكالة، فيكون محتوى المعلومة هو ما ترتّبه التقسيمات العشرة."
          }
        ],
        answer: [0, 1, 2, 3],
        hint: {
          en: "Three of the seven go beyond what ten numbers can carry. One of them turns a 0.06-shekel gap into a finding; one of them explains the one-hot result with a cost the lesson explicitly says is not the problem; and one of them gets the frequency encoding's nature backwards.",
          ar: "ثلاثة من السبعة تتجاوز ما تستطيع عشرةُ أرقام حمله. فواحدٌ منها يحوّل فجوةَ 0.06 شيكل إلى نتيجة؛ وواحدٌ يشرح نتيجةَ الترميز الأحادي بثمنٍ يقول الدرس صريحًا إنه ليس المشكلة؛ وواحدٌ يقلب طبيعةَ الترميز بالتكرار."
        },
        explain: {
          en: "Ten seeds were run for one reason: to find out which of the single-split differences were real. Two things survive, and they are the first two correct answers &mdash; the ordering of the honest encodings, and the headline that none of them beats a constant. The third correct answer is the lesson's sharpest sentence in the whole concept: the only row that beats the constant is the leaky one, and it beats it because it is cheating, so a pipeline that selects on held-out error alone will select the leak every time. The fourth is the honest qualification: measurement says drop the column, and if a judgement about the future says keep it, keep the bucket, because it is the only encoding here that was fitted with the unseen case in mind &mdash; 97 training rows went into <code>Other</code>, so a brand-new agency is predicted like the other small agencies rather than like nothing. Of the three wrong answers, the 0.06-shekel one is the dangerous one: averaging reduces noise but does not abolish it, and the per-split count says so out loud &mdash; the leaky encoding beats the constant in 6 of 10, which is close to a coin, not a finding, and in any case the leak is disqualified by construction rather than by margin. The sparsity answer names a cost the lesson measures and dismisses (9,600 bytes against 30,195 for the text column); the cost is rows per parameter. And the frequency answer is exactly backwards: frequency encoding is the <em>least</em> informative of the five &mdash; it never looks at the rent and it collapses four agencies with different rents into one number &mdash; which is the finding the lesson says it did not expect to write.",
          ar: "شُغّلت عشرُ بذور لسبب واحد: لمعرفة أيُّ فروق التقسيم الواحد كان حقيقيًّا. وينجو أمران، وهما الجوابان الصحيحان الأولان &mdash; ترتيبُ الترميزات الأمينة، والعنوانُ أن لا واحدَ منها يتقدّم ثابتًا. والجوابُ الصحيح الثالث أحدُّ جملةٍ في المفهوم كله: فالسطرُ الوحيد الذي يتقدّم الثابتَ هو المتسرِّب، وهو يتقدّمه لأنه يغشّ، فخطُّ أنابيبٍ يختار على الخطأ المحجوز وحده سيختار التسرّبَ كل مرة. والرابعُ هو التحفّظ الأمين: فالقياسُ يقول أسقِط العمود، وإن قال حكمٌ عن المستقبل أبقِه فأبقِ الدلو، لأنه الترميزُ الوحيد هنا الذي ضُبط والحالةُ غير المرئية في الحسبان &mdash; فقد دخل 97 صفًّا تدريبيًّا في <code>Other</code>، فتُتنبَّأ وكالةٌ جديدة تمامًا كما تُتنبَّأ الوكالاتُ الصغيرة الأخرى لا كما يُتنبَّأ لا شيء. ومن الأجوبة الخاطئة الثلاثة يكون جوابُ الـ0.06 شيكل هو الخطير: فالمتوسطُ يقلّل الضجيج ولا يُبطله، ويقول عدُّ التقسيمات ذلك صريحًا &mdash; فالمتسرِّب يتقدّم الثابتَ في 6 من 10، وهذا قريبٌ من قطعة نقد لا نتيجة، والتسرّبُ على كل حال مستبعَدٌ بالبناء لا بالفارق. وجوابُ التخلخل يسمّي ثمنًا يقيسه الدرس ويطرحه (‏9,600 بايت في مقابل 30,195 للعمود النصي)؛ والثمنُ صفوفٌ لكل وسيط. وجوابُ التكرار مقلوبٌ بالضبط: فالترميزُ بالتكرار <em>أقلُّ</em> الخمسة معلومةً &mdash; فهو لا ينظر إلى الإيجار قط ويطوي أربعَ وكالات بإيجارات مختلفة في رقم واحد &mdash; وهذه هي النتيجةُ التي يقول الدرس إنه لم يتوقع أن يكتبها."
        }
      },

      /* ---------------------------------------------------------- 18 */
      {
        id: "t2l5q18", type: "match", level: "easy",
        topics: ["t2-why-scale", "t2-three-scalers"],
        q: {
          en: "Each scaler learns exactly two numbers from a column and applies them to every value one at a time. Match each one to its two fitted parameters and to the one thing that breaks it &mdash; measured on <code>monthly_rent</code> as <a href=\"#t2-lesson-03\">Lesson&nbsp;3</a> handed it over, with the 99999 phone number still in the column.",
          ar: "كل مُقايِس يتعلّم رقمين بالضبط من عمود ويطبّقهما على كل قيمة على حِدة. وصّل كلًّا منها بوسيطيه المضبوطين وبالشيء الواحد الذي يُعطبه &mdash; مقيسًا على <code>monthly_rent</code> كما سلّمه <a href=\"#t2-lesson-03\">الدرس 3</a>، ورقمُ الهاتف 99999 ما زال في العمود."
        },
        leftHead: { en: "The scaler", ar: "المُقايِس" },
        rightHead: { en: "Its two fitted parameters, and what breaks it", ar: "وسيطاه المضبوطان وما يُعطبه" },
        pairs: [
          {
            l: {
              en: "min&ndash;max: <code>(x &minus; min) / (max &minus; min)</code>",
              ar: "الحدّان: <code>(x &minus; min) / (max &minus; min)</code>"
            },
            r: {
              en: "the smallest and the largest training value &mdash; both parameters <em>are</em> extremes, so one cell that is not a rent sets both: the range becomes 99974, and 460 of the 461 values land below 0.01",
              ar: "أصغرُ قيمة تدريبية وأكبرها &mdash; والوسيطان <em>هما</em> طرفان، فتضبط خليةٌ واحدة ليست إيجارًا كليهما: فيصير المدى 99974 وتهبط 460 من القيم الـ461 دون 0.01"
            }
          },
          {
            l: {
              en: "standardisation: <code>(x &minus; mean) / std</code>",
              ar: "التوحيد المعياري: <code>(x &minus; mean) / std</code>"
            },
            r: {
              en: "the mean and the standard deviation &mdash; both are sums over every row, so one typo multiplies the divisor by 56.9 and squeezes the whole market into a band 0.12 of a standard deviation wide",
              ar: "المتوسطُ والانحراف المعياري &mdash; وكلاهما مجموعٌ على كل صف، فيضرب خطأُ إدخال واحد المقسومَ عليه بـ56.9 ويضغط السوقَ كلها في نطاق عرضه 0.12 من انحراف معياري"
            }
          },
          {
            l: {
              en: "robust: <code>(x &minus; median) / IQR</code>",
              ar: "الحصين: <code>(x &minus; median) / IQR</code>"
            },
            r: {
              en: "the median and the interquartile range &mdash; both are positions, so nothing moves until more than a quarter of the column is wrong: the quartiles are &minus;0.45, 0.00 and 0.55 before the repair and after it, and the phone number stands out at 997.99",
              ar: "الوسيطُ والمدى الربيعي &mdash; وكلاهما موضع، فلا يتزحزح شيء حتى يكون أكثرُ من ربع العمود خاطئًا: فالأرباع &minus;0.45 و0.00 و0.55 قبل الإصلاح وبعده، ويبرز رقمُ الهاتف عند 997.99"
            }
          },
          {
            l: {
              en: "robust scaling applied to <code>rooms</code>",
              ar: "التوحيد الحصين مطبَّقًا على <code>rooms</code>"
            },
            r: {
              en: "the median 3.0 and the IQR 2.0 &mdash; fine here, and the formula divides by zero and returns <code>inf</code> on any discrete column where more than half the rows share one value",
              ar: "الوسيط 3.0 والمدى الربيعي 2.0 &mdash; وهو حسنٌ هنا، وتقسم الصيغةُ على صفر فتعيد <code>inf</code> في أي عمود منفصل يتشارك أكثرُ من نصف صفوفه قيمةً واحدة"
            }
          },
          {
            l: {
              en: "no scaler at all, because the model is a decision tree",
              ar: "لا مُقايِس أصلًا، لأن النموذج شجرةُ قرار"
            },
            r: {
              en: "no parameters to fit, store or version &mdash; and nothing to break, because a monotone transformation renames every candidate threshold and moves no partition: the same 115 rows below 62.80&nbsp;m&sup2; and the same SSE of 2234077.9245",
              ar: "لا وسائطَ تُضبط أو تُخزَّن أو تُؤرَّخ &mdash; ولا شيءَ يُعطب، لأن التحويلَ الرتيب يعيد تسمية كل عتبةٍ مرشَّحة ولا يزحزح تقسيمًا: فالصفوف الـ115 نفسها تحت 62.80 م² ومجموعُ المربعات نفسه 2234077.9245"
            }
          }
        ],
        hint: {
          en: "Sort the five right-hand entries by <em>what kind of statistic</em> each parameter is: an extreme, a sum, or a position. The breaking point follows from that alone &mdash; one value, slowly, or a quarter of the column.",
          ar: "رتّب المدخلات اليمنى الخمسة بـ<em>نوع الإحصاءة</em> التي هي كل وسيط: طرفٌ أم مجموعٌ أم موضع. ونقطةُ العطب تتبع من ذلك وحده &mdash; قيمةٌ واحدة، أو ببطء، أو ربعُ العمود."
        },
        explain: {
          en: "Three formulas, two parameters each, and the whole question is <em>which two numbers</em> &mdash; because the kind of statistic a parameter is decides exactly how much damage one wrong cell can do. The breaking point of a maximum, or of a mean, is <strong>one value</strong>; the breaking point of a median is 50% of the column and of the quartiles 25%. That is the formal content of the word &ldquo;robust&rdquo;: a statistic is robust when a bounded fraction of arbitrarily wrong values changes it by a bounded amount. Note what the robust row does <em>not</em> claim: it did not hide the 99999 or repair it. The parameters were untouched, so every genuine rent got the same score either way, and the bad value was left standing a thousand units from the rest of the column where any check will find it &mdash; which is the opposite of what min&ndash;max did, where the typo took the whole output range and the market got 0.5% of it. The two extra rows are the practical corners. An IQR of zero is a real failure mode on a discrete column, and <code>rooms</code> escapes it only because its quartiles are 2 and 4. And a tree needs no scaler at all, which means two parameters per column that you do not have to store, version and deploy correctly for a year &mdash; the cheapest kind of correctness there is.",
          ar: "ثلاثُ صيغ، لكلٍّ وسيطان، والسؤالُ كله <em>أيُّ رقمين</em> &mdash; لأن نوعَ الإحصاءة التي هي الوسيط يحدّد بالضبط كم ضررًا تستطيع خليةٌ خاطئة واحدة أن تُحدثه. فنقطةُ عطب الأقصى، أو المتوسط، <strong>قيمةٌ واحدة</strong>؛ ونقطةُ عطب الوسيط 50% من العمود وللأرباع 25%. وهذا هو المحتوى الصوري لكلمة «حصين»: فالإحصاءةُ حصينة متى غيّرتها نسبةٌ محدودة من القيم الخاطئة اعتباطيًّا بمقدار محدود. ولاحظ ما <em>لا</em> يدّعيه سطرُ الحصين: فهو لم يُخفِ الـ99999 ولم يُصلحها. فالوسيطان لم يُمسّا، فحصل كل إيجارٍ حقيقي على الدرجة نفسها في الحالين، وبقيت القيمةُ السيئة واقفةً على بعد ألف وحدة من بقية العمود حيث سيجدها أي فحص &mdash; وهذا عكسُ ما فعله الحدّان، حيث أخذ خطأُ الإدخال مدى المخرج كلَّه وحصلت السوقُ على 0.5% منه. والسطران الزائدان هما الزاويتان العمليتان. فالمدى الربيعي الصفري عطبٌ حقيقي في عمود منفصل، ولا يُفلت <code>rooms</code> منه إلا لأن ربعيه 2 و4. والشجرةُ لا تحتاج مُقايِسًا أصلًا، ومعنى ذلك وسيطان لكل عمود لا يلزمك تخزينهما وتأريخهما ونشرهما صحيحةً سنةً كاملة &mdash; وهذا أرخصُ أنواع الصواب."
        }
      },

      /* ---------------------------------------------------------- 19 */
      {
        id: "t2l5q19", type: "error", level: "medium",
        topics: ["t2-scale-after-repair"],
        q: {
          en: "The step should hand a model a scaled rent column it can learn from. Every line of arithmetic in it is flawless, it raises nothing, and the column it produces is a constant with rounding error. Click the offending line.",
          ar: "ينبغي للخطوة أن تسلّم النموذجَ عمودَ إيجارٍ موحَّد المقياس يستطيع التعلّم منه. وكل سطر حساب فيها سليم، ولا ترفع شيئًا، والعمودُ الذي تُنتجه ثابتٌ بخطأ تدوير. انقر السطر المخطئ."
        },
        code: code(
          "def minmax(s):",
          "    return (s - s.min()) / (s.max() - s.min())",
          "raw = load(\"listings_raw.csv\", repair=False)        # exactly as Lesson 3 left it",
          "out = raw.assign(rent_minmax=minmax(raw[\"monthly_rent\"]))",
          "out = repair_values(out)                            # Lesson 4's two stage-2 repairs",
          "print(out[\"rent_minmax\"].quantile([.25, .5, .75]).round(4).to_dict())",
          "print(\"rents scaled below 0.01:\", int((out[\"rent_minmax\"] < 0.01).sum()))",
          "print(\"monthly_rent now: min %.1f max %.1f\"",
          "      % (out[\"monthly_rent\"].min(), out[\"monthly_rent\"].max()))",
          "",
          "# {0.25: 0.0013, 0.5: 0.0018, 0.75: 0.0023}",
          "# rents scaled below 0.01: 460",
          "# monthly_rent now: min 50.0 max 580.0"
        ),
        answer: 4,
        solution: {
          code: code(
            "def minmax(s):",
            "    return (s - s.min()) / (s.max() - s.min())",
            "raw = load(\"listings_raw.csv\", repair=False)        # exactly as Lesson 3 left it",
            "out = repair_values(raw)                            # stage 2 FIRST",
            "out = out.assign(rent_minmax=minmax(out[\"monthly_rent\"]))   # then stage 5",
            "print(out[\"rent_minmax\"].quantile([.25, .5, .75]).round(4).to_dict())",
            "print(\"rents scaled below 0.01:\", int((out[\"rent_minmax\"] < 0.01).sum()))",
            "print(\"monthly_rent now: min %.1f max %.1f\"",
            "      % (out[\"monthly_rent\"].min(), out[\"monthly_rent\"].max()))"
          ),
          out: code(
            "{0.25: 0.1981, 0.5: 0.283, 0.75: 0.3868}",
            "rents scaled below 0.01: 3",
            "monthly_rent now: min 50.0 max 580.0"
          ),
          en: "Not one character of the scaler changes. The two statements swap places, so <code>minmax</code> is fitted on a column whose two impossible rents have already been voided: quartiles at 0.1981, 0.2830 and 0.3868, and 3 values near the bottom of the range instead of 460. That is the canonical stage order paying for itself in one comparison &mdash; <em>repair values at stage 2, scale at stage 5</em>.",
          ar: "لا يتغير حرفٌ واحد من المُقايِس. فيتبادل السطران موضعيهما، فتُضبط <code>minmax</code> على عمودٍ أُبطلت فيه أصلًا قيمتا الإيجار المستحيلتان: فتكون الأرباع 0.1981 و0.2830 و0.3868، وثلاثُ قيم قرب أسفل المدى بدل 460. وهذا هو الترتيبُ القياسي للمراحل يدفع ثمنَ نفسه في مقارنةٍ واحدة &mdash; <em>أصلِح القيم في المرحلة 2، ووحّد المقياس في المرحلة 5</em>."
        },
        hint: {
          en: "The third printed line says the repair worked: the rent column really does end at 50 and 580. So ask when the scaler read that column &mdash; before or after the line that fixed it.",
          ar: "السطر المطبوع الثالث يقول إن الإصلاح عمل: فعمودُ الإيجار ينتهي فعلًا عند 50 و580. فاسأل متى قرأ المُقايِسُ ذلك العمود &mdash; قبل السطر الذي أصلحه أم بعده."
        },
        explain: {
          en: "Line 4 runs stage 5 before stage 2. At that moment <code>monthly_rent</code> still holds the 99999 that is really a phone number, so the fitted range is <code>99999 &minus; 25 = 99974</code> while every real rent lies in an interval of 555 &mdash; the entire rental market of Gaza is mapped into 0.0056 of the output range, and 460 of the 461 values land below 0.01. The quartiles say it in three numbers: 0.0013, 0.0018, 0.0023. Line 5 then repairs the rent column beautifully and far too late: <code>rent_minmax</code> was computed from the old values and is never recomputed, which is why the third printed line looks healthy and contradicts the first two. Line 5 is the tempting click for exactly that reason &mdash; it is the line whose output disagrees with the feature &mdash; and it is doing its job correctly; it is simply in the wrong place. Note what the symptom looks like from inside a training run, because nothing in the logs says &ldquo;feature destroyed&rdquo;: a gradient-descent model takes steps proportional to each feature's contribution, so a column whose whole usable spread is 0.001 wide will barely move its weight from its initialisation, and a regularised model will drive that weight to zero and drop the feature silently. The check to carry: when a feature you believe in sits at zero in an importance table, look at the scaler and the order of the stages above it before you look at the model.",
          ar: "السطر 4 يُشغّل المرحلة 5 قبل المرحلة 2. وفي تلك اللحظة ما زال <code>monthly_rent</code> يحمل الـ99999 التي هي رقمُ هاتف فعلًا، فيكون المدى المضبوط <code>99999 &minus; 25 = 99974</code> وكلُّ إيجار حقيقي في مجالٍ عرضه 555 &mdash; فتُرسَم سوقُ الإيجار في غزة كلها في 0.0056 من مدى المخرج، وتهبط 460 من القيم الـ461 دون 0.01. وتقول الأرباعُ ذلك بثلاثة أرقام: 0.0013 و0.0018 و0.0023. ثم يُصلح السطر 5 عمودَ الإيجار إصلاحًا جميلًا متأخرًا جدًّا: فـ<code>rent_minmax</code> حُسب من القيم القديمة ولا يُعاد حسابه قط، ولهذا يبدو السطر المطبوع الثالث سليمًا ويناقض الأولَين. والسطر 5 هو النقرةُ المغرية لذلك السبب بالضبط &mdash; فهو السطر الذي يخالف مخرجُه الخاصية &mdash; وهو يؤدّي عمله صحيحًا؛ وإنما هو في الموضع الخطأ. ولاحظ كيف يبدو العَرَض من داخل تشغيلة تدريب، فلا شيء في السجلات يقول «أُهلكت الخاصية»: فنموذجُ الانحدار بالتدرّج يخطو خطواتٍ تتناسب مع إسهام كل خاصية، فعمودٌ مداه النافع كله عرضه 0.001 لن يُزحزح وزنَه عن تهيئته إلا قليلًا، والنموذجُ المنظَّم سيدفع ذلك الوزن إلى الصفر ويُسقط الخاصية بصمت. والفحصُ الذي تحمله: متى جلست خاصيةٌ تؤمن بها عند الصفر في جدول أهمية فانظر في المُقايِس وترتيبِ المراحل فوقه قبل أن تنظر في النموذج."
        }
      },

      /* ---------------------------------------------------------- 20 */
      {
        id: "t2l5q20", type: "complete", level: "easy",
        topics: ["t2-three-scalers", "t2-scale-area"],
        q: {
          en: "Complete the robust scaler so that the program prints exactly the two lines in the comment. Both columns have had <a href=\"#t2l4-s23\">Lesson&nbsp;4's</a> repairs applied, so <code>monthly_rent</code> runs from 50 to 580 and <code>area_m2</code> from 30.5 to 113.6.",
          ar: "أكمِل المُقايِس الحصين ليطبع البرنامجُ السطرين في التعليق بالضبط. وقد طُبّقت إصلاحاتُ <a href=\"#t2l4-s23\">الدرس 4</a> على العمودين، فيجري <code>monthly_rent</code> من 50 إلى 580 و<code>area_m2</code> من 30.5 إلى 113.6."
        },
        code: code(
          "def robust(s):",
          "    \"\"\"robust: median 0, IQR 1. Both parameters are positions, not sums.\"\"\"",
          "    q1, q3 = s.quantile(.25), s.quantile(.75)",
          "    ______",
          "",
          "for col in (\"monthly_rent\", \"area_m2\"):",
          "    print(col, robust(flats[col]).quantile([.25, .5, .75]).round(4).tolist())",
          "",
          "# monthly_rent [-0.45, 0.0, 0.55]",
          "# area_m2 [-0.4975, 0.0, 0.5025]"
        ),
        options: [
          { code: "return (s - s.mean()) / (q3 - q1)" },
          { code: "return (s - s.median()) / (q3 - q1)" },
          { code: "return (s - s.median()) / s.std()" },
          { code: "return (s - q1) / (q3 - q1)" }
        ],
        answer: 1,
        solution: {
          code: code(
            "def robust(s):",
            "    \"\"\"robust: median 0, IQR 1. Both parameters are positions, not sums.\"\"\"",
            "    q1, q3 = s.quantile(.25), s.quantile(.75)",
            "    return (s - s.median()) / (q3 - q1)",
            "",
            "for col in (\"monthly_rent\", \"area_m2\"):",
            "    print(col, robust(flats[col]).quantile([.25, .5, .75]).round(4).tolist())"
          ),
          out: code(
            "monthly_rent [-0.45, 0.0, 0.55]",
            "area_m2 [-0.4975, 0.0, 0.5025]"
          ),
          en: "Subtract the <strong>median</strong> and divide by the <strong>interquartile range</strong> &mdash; the two parameters already computed on the line above. Both printed medians are then 0.0000 by construction, and neither parameter is a sum, so no single wrong cell can move either one.",
          ar: "اطرح <strong>الوسيط</strong> واقسم على <strong>المدى الربيعي</strong> &mdash; وهما الوسيطان المحسوبان في السطر الذي فوق. فيكون الوسيطان المطبوعان 0.0000 بالبناء، ولا يكون أيٌّ من الوسيطين مجموعًا، فلا تستطيع خليةٌ خاطئة واحدة أن تُزحزح أيًّا منهما."
        },
        hint: {
          en: "Read the printed median of each column first: it is exactly 0.0000 both times. Only one of the four candidates can guarantee that, whatever the column looks like.",
          ar: "اقرأ الوسيطَ المطبوع لكل عمود أولًا: فهو 0.0000 بالضبط في المرتين. وواحدٌ فقط من المرشّحين الأربعة يستطيع ضمان ذلك، كيفما كان شكلُ العمود."
        },
        explain: {
          en: "Robust scaling centres on the <strong>median</strong> and divides by the <strong>interquartile range</strong>, and both printed medians are 0.0000 by construction, which is the giveaway the question hands you. Each wrong candidate fails for a different and nameable reason. Centring on the mean reintroduces a sum, so the rent's median comes out at &minus;0.1105 instead of 0 and one wrong cell moves the whole column &mdash; which is the failure robust scaling exists to avoid. Dividing by <code>s.std()</code> reintroduces the other sum: the median stays 0 and the spread becomes hostage to a single extreme value, so the column is only half robust, which is worse than knowing it is not. And <code>(s - q1) / (q3 - q1)</code> is a real transformation with a different name &mdash; min&ndash;max on the quartiles &mdash; and it prints 0.0, 0.45, 1.0 for the rent: the median lands near the middle of a unit interval rather than at zero, so the output is bounded-looking without being bounded and no longer says &ldquo;this value is half an IQR above the middle of the column&rdquo;. Note what the two correct lines show when you read them together: the rent's quartiles are a tidy &minus;0.45 / 0.00 / 0.55 and the area's are &minus;0.4975 / 0.00 / 0.5025, and the area's are the <em>repaired</em> figures &mdash; the five dunum rows were 0.05&nbsp;m&sup2; before Lesson 4 multiplied them by a thousand, and robust scaling would not have made them obvious: at <code>-2.9483</code> they just look like very small flats. Robustness protects the good values from the bad ones; it does not find the bad ones for you.",
          ar: "التوحيدُ الحصين يتمركز على <strong>الوسيط</strong> ويقسم على <strong>المدى الربيعي</strong>، والوسيطان المطبوعان كلاهما 0.0000 بالبناء، وهذه هي العلامةُ التي يسلّمك السؤال. وكلُّ مرشّح خاطئ يسقط لسبب مختلف يُسمّى. فالتمركزُ على المتوسط يُعيد مجموعًا، فيخرج وسيطُ الإيجار &minus;0.1105 بدل صفر وتُزحزح خليةٌ خاطئة واحدة العمودَ كلَّه &mdash; وهذا هو العطبُ الذي وُجد التوحيدُ الحصين ليجتنبه. والقسمةُ على <code>s.std()</code> تُعيد المجموعَ الآخر: فيبقى الوسيطُ صفرًا ويصير التبدّدُ رهينةَ قيمةٍ طرفية واحدة، فيكون العمودُ حصينًا نصفَ حصانة، وهذا أسوأ من أن تعلم أنه غيرُ حصين. و<code>(s - q1) / (q3 - q1)</code> تحويلٌ حقيقي باسم آخر &mdash; الحدّان على الأرباع &mdash; ويطبع 0.0 و0.45 و1.0 للإيجار: فيهبط الوسيط قرب وسط مجالٍ واحدي لا عند الصفر، فيكون المخرجُ شبيهًا بالمحدود دون أن يكون محدودًا ولا يقول بعدها «هذه القيمة تعلو وسطَ العمود بنصف مدى ربيعي». ولاحظ ما يُظهره السطران الصحيحان إذا قرأتهما معًا: فأرباعُ الإيجار أنيقة &minus;0.45 و0.00 و0.55 وأرباعُ المساحة &minus;0.4975 و0.00 و0.5025، وأرقامُ المساحة هي أرقامُ ما <em>بعد الإصلاح</em> &mdash; فصفوفُ الدونم الخمسة كانت 0.05 م² قبل أن يضربها الدرس 4 بألف، ولم يكن التوحيدُ الحصين ليجعلها ظاهرة: فهي عند <code>-2.9483</code> تبدو شققًا صغيرة جدًّا فحسب. فالحصانةُ تحمي القيمَ الجيدة من السيئة؛ ولا تجد لك السيئة."
        }
      },

      /* ---------------------------------------------------------- 21 */
      {
        id: "t2l5q21", type: "tf", level: "easy",
        topics: ["t2-tree-split-invariant", "t2-who-needs-scaling"],
        q: {
          en: "A one-level regression tree is fitted on <code>area_m2</code> three times: in raw metres it chooses the threshold 62.800000, after min&ndash;max 0.388688, after standardising &minus;0.528055 &mdash; and all three keep the same 115 listings below the threshold and report the same total squared error, 2234077.9245. <strong>True or false:</strong> this shows that the three scalers happen to agree on this column, so a fourth scaler &mdash; robust, say &mdash; could still move the tree's partition.",
          ar: "تُضبط شجرةُ انحدار بمستوًى واحد على <code>area_m2</code> ثلاثَ مرات: فتختار بالأمتار الخام العتبة 62.800000، وبعد توحيد الحدَّين 0.388688، وبعد التوحيد المعياري &minus;0.528055 &mdash; وتُبقي الثلاثُ الإعلانات الـ115 نفسها تحت العتبة وتُبلّغ عن مجموع المربعات نفسه، ‏2234077.9245. <strong>صح أم خطأ:</strong> يُظهر هذا أن المُقايِسات الثلاثة تتفق على هذا العمود اتفاقًا، فيمكن لمُقايِسٍ رابع &mdash; الحصين مثلًا &mdash; أن يزحزح تقسيم الشجرة."
        },
        truth: false,
        hint: {
          en: "Ask what the tree actually reads. It tries every candidate split point and keeps the one that separates the target best &mdash; and the only operation in that sentence is a comparison.",
          ar: "اسأل ماذا تقرأ الشجرةُ فعلًا. فهي تجرّب كل نقطة تقسيم مرشَّحة وتُبقي التي تفصل الهدفَ أفضلَ فصل &mdash; والعمليةُ الوحيدة في تلك الجملة مقارنة."
        },
        explain: {
          en: "It is not an agreement between three scalers; it is an identity, and it holds for every scaler of this kind. A tree asks one question &mdash; <em>is this value below a threshold?</em> &mdash; so the only operation it performs on a feature is <code>&le;</code>, and a monotone transformation preserves every <code>&le;</code> comparison. Rescaling therefore renames every candidate threshold and changes no <em>partition</em>: the split at 0.388688 in min&ndash;max units <em>is</em> the split at 62.8 square metres, since <code>0.388688 &times; (113.6 &minus; 30.5) + 30.5 = 62.8</code>, and the same 115 listings fall below it, so the leaf means and the total squared error cannot differ. Run it with the robust scaler and the threshold prints as &minus;0.418699 with the same SSE of 2234077.9245 to four decimals. The claim is tempting because &ldquo;happen to agree&rdquo; sounds like the cautious reading, and caution is usually right about measurements &mdash; but this is not a measurement that came out equal, it is an arithmetic fact that could not have come out otherwise. The same is true of random forests and gradient boosting, which are made of trees, so scaling a feature for <code>XGBoost</code> or <code>RandomForestRegressor</code> is work you can simply not do &mdash; and the honest reading of that is narrow: trees still need the unseen category handled, the cardinality controlled, a sensible ordinal code and the missing values dealt with. Scaling is the one stage-5 decision a tree is indifferent to, not the only one.",
          ar: "ليس هذا اتفاقًا بين ثلاثة مُقايِسات؛ بل هوية، وهي صحيحة لكل مُقايِس من هذا النوع. فالشجرةُ تسأل سؤالًا واحدًا &mdash; <em>هل هذه القيمة تحت عتبة؟</em> &mdash; فالعمليةُ الوحيدة التي تجريها على خاصية هي <code>&le;</code>، والتحويلُ الرتيب يحفظ كل مقارنة <code>&le;</code>. فإعادةُ القياس تعيد تسمية كل عتبةٍ مرشَّحة ولا تغيّر <em>تقسيمًا</em>: فالتقسيمُ عند 0.388688 بوحدات الحدَّين <em>هو</em> التقسيمُ عند 62.8 مترًا مربعًا، إذ <code>0.388688 &times; (113.6 &minus; 30.5) + 30.5 = 62.8</code>، وتهبط الإعلانات الـ115 نفسها تحته، فلا يمكن أن تختلف متوسطاتُ الأوراق ولا مجموعُ المربعات. وشغّلها بالمُقايِس الحصين فتُطبع العتبةُ &minus;0.418699 بمجموع المربعات نفسه 2234077.9245 إلى أربع عشريات. والادّعاءُ مغرٍ لأن «تتفق اتفاقًا» تبدو القراءةَ الحذرة، والحذرُ صائبٌ في القياسات غالبًا &mdash; لكن هذا ليس قياسًا خرج متساويًا، بل واقعةٌ حسابية ما كانت لتخرج على غير ذلك. والأمرُ نفسه في الغابات العشوائية والتعزيز بالتدرّج، وهما مصنوعان من أشجار، فتوحيدُ مقياس خاصيةٍ لـ<code>XGBoost</code> أو <code>RandomForestRegressor</code> عملٌ تستطيع ألّا تفعله &mdash; والقراءةُ الأمينة لذلك ضيّقة: فالأشجارُ ما زالت تحتاج معالجةَ الفئة غير المرئية، وضبطَ التعدّد، ورمزًا ترتيبيًّا معقولًا، ومعالجةَ القيم المفقودة. فتوحيدُ المقياس هو قرارُ المرحلة 5 الوحيد الذي لا تهتمّ له الشجرة، لا القرارَ الوحيد."
        }
      },

      /* ---------------------------------------------------------- 22 */
      {
        id: "t2l5q22", type: "mcq", level: "medium",
        topics: ["t2-knn-distance", "t2-who-needs-scaling"],
        q: {
          en: "k-nearest-neighbours is asked for the five flats most like listing 5009 (90.3&nbsp;m&sup2;, 4 rooms, floor 2, asking 275) over the columns <code>area_m2</code>, <code>rooms</code> and <code>floor</code>. Unscaled, those three own <strong>99.11%</strong>, 0.32% and 0.57% of the total squared distance; their standard deviations are 18.6128, 1.0902 and 1.8781. Standardised, the shares become 39.83%, 37.53% and 22.64%, the two neighbour lists share three rows of five, and the predicted rent moves from 239.0 to 253.0. Which statement is correct?",
          ar: "يُسأل خوارزمُ أقرب الجيران عن الشقق الخمس الأشبه بالإعلان 5009 (‏90.3 م²، أربع غرف، الطابق 2، يطلب 275) على الأعمدة <code>area_m2</code> و<code>rooms</code> و<code>floor</code>. فبلا توحيد مقياس تملك الثلاثةُ <strong>99.11%</strong> و0.32% و0.57% من مجموع المسافة المربّعة؛ وانحرافاتها المعيارية 18.6128 و1.0902 و1.8781. وبالتوحيد المعياري تصير الأنصبة 39.83% و37.53% و22.64%، وتتشارك قائمتا الجيران ثلاثةَ صفوف من خمسة، وينتقل الإيجارُ المتنبَّأ به من 239.0 إلى 253.0. فأيُّ العبارات صحيحة؟"
        },
        options: [
          {
            en: "Scaling is required here because the model's <em>answer</em> changes, not only its coefficients: a squared distance weights each column by the square of its spread, so <code>18.61&sup2;</code> against <code>1.09&sup2;</code> is a ratio of nearly 300 to 1 and &ldquo;most similar flat&rdquo; means &ldquo;flat with the most similar floor area&rdquo;. Standardising is a <em>choice</em> &mdash; it asserts that all three columns matter equally &mdash; but it is a choice you made rather than a consequence of metres being smaller units than rooms.",
            ar: "توحيدُ المقياس لازمٌ هنا لأن <em>جواب</em> النموذج يتغير لا معاملاته وحدها: فالمسافةُ المربّعة تُرجّح كل عمود بمربّع تبدّده، فتكون <code>18.61&sup2;</code> في مقابل <code>1.09&sup2;</code> نسبةَ ثلاثمئة إلى واحد تقريبًا ويكون معنى «أشبهُ شقة» «الشقةُ الأشبهُ مساحةً». والتوحيدُ المعياري <em>اختيار</em> &mdash; يزعم أن الأعمدة الثلاثة تهمّ بالتساوي &mdash; لكنه اختيارٌ اخترتَه أنت لا نتيجةٌ لكون المتر وحدةً أصغر من الغرفة."
          },
          {
            en: "Standardising is right because it moved the prediction from 239.0 to 253.0 and the flat actually asks 275, so the scaled neighbours are measurably the better ones.",
            ar: "التوحيدُ المعياري صحيح لأنه نقل التنبؤ من 239.0 إلى 253.0 والشقةُ تطلب 275 فعلًا، فيكون الجيرانُ الموحَّدون أفضلَ قياسًا."
          },
          {
            en: "The 99.11% shows that <code>area_m2</code> is by far the strongest predictor of rent in this file, so kNN is weighting it correctly and the unscaled distance is the honest one to keep.",
            ar: "الـ99.11% تُظهر أن <code>area_m2</code> أقوى متنبِّئ بالإيجار في هذا الملف بفارق كبير، فتُرجّحه kNN ترجيحًا صحيحًا ويكون المسافةُ غير الموحَّدة هي الأمينةَ التي تُبقى."
          },
          {
            en: "The three standardised shares are not exactly equal (39.83 / 37.53 / 22.64), so the standardisation did not finish its job: the parameters must have been fitted on different rows from the ones the distance was computed over.",
            ar: "الأنصبةُ المعيارية الثلاثة ليست متساوية بالضبط (‏39.83 و37.53 و22.64)، فلم يُتمّ التوحيدُ المعياري عمله: فلا بدّ أن الوسائط ضُبطت على صفوف تخالف التي حُسبت عليها المسافة."
          }
        ],
        answer: 0,
        hint: {
          en: "One option judges the scaler on a single row's prediction. Ask what evidence one listing can give about a model, and then ask what the standard deviations are doing inside a squared distance.",
          ar: "خيارٌ يحكم على المُقايِس بتنبؤ صفٍّ واحد. فاسأل أيَّ دليلٍ يستطيع إعلانٌ واحد أن يعطيه عن نموذج، ثم اسأل ماذا تفعل الانحرافاتُ المعيارية داخل مسافةٍ مربّعة."
        },
        explain: {
          en: "This is the one place in the lesson where scaling changes what the model <em>answers</em>, and not just how its coefficients read. A squared distance adds up squared differences, so each column enters weighted by the square of its spread: the area contributes <code>18.61&sup2; = 346</code> against the rooms' <code>1.09&sup2; = 1.19</code>, and 99.11% of the geometry belongs to one column while the other two are decoration. Standardising makes the three shares roughly equal, which is a defensible default and still a choice &mdash; the honest version of the claim is &ldquo;I have decided these columns matter equally&rdquo;, not &ldquo;I have removed a bias&rdquo;. The answer that points at the true rent of 275 is the tempting one, and it is tempting because it reaches for evidence; one listing is a sample of one, and the lesson's claim is about the geometry, which is measurable, rather than about accuracy, which this comparison cannot establish. The answer that reads 99.11% as predictive strength confuses spread with signal: the share is computed from the columns' standard deviations and the query point alone, and the rent never enters it &mdash; metres are simply smaller units than rooms. And the answer that wants the three shares to come out exactly equal expects a guarantee standardisation does not make: it sets each column's mean to 0 and its standard deviation to 1 over the whole column, which says nothing about how one particular query's distances will divide up. The rule from the lesson's table: distances and gradients need scaling (kNN, k-means, SVMs, neural networks, PCA, any penalised linear model), closed-form least squares cannot tell the difference at all, and trees never need it.",
          ar: "هذا هو الموضعُ الوحيد في الدرس الذي يغيّر فيه توحيدُ المقياس ما <em>يجيبه</em> النموذج لا كيف تُقرأ معاملاته وحدها. فالمسافةُ المربّعة تجمع فروقًا مربّعة، فيدخل كل عمود مُرجَّحًا بمربّع تبدّده: فتُسهم المساحة بـ<code>18.61&sup2; = 346</code> في مقابل <code>1.09&sup2; = 1.19</code> للغرف، وتكون 99.11% من الهندسة لعمود واحد والآخران زينة. والتوحيدُ المعياري يجعل الأنصبة الثلاثة متقاربة، وهذا افتراضٌ قابل للدفاع وهو اختيارٌ مع ذلك &mdash; والصيغةُ الأمينة للادّعاء «قرّرتُ أن هذه الأعمدة تهمّ بالتساوي» لا «حذفتُ تحيّزًا». والجوابُ الذي يشير إلى الإيجار الحقيقي 275 هو المغري، وهو مغرٍ لأنه يمدّ يده إلى دليل؛ وإعلانٌ واحد عيّنةٌ من واحد، وادّعاءُ الدرس عن الهندسة، وهي قابلة للقياس، لا عن الدقة، وهذه المقارنةُ لا تستطيع إثباتها. والجوابُ الذي يقرأ الـ99.11% قوةً تنبؤية يخلط التبدّدَ بالإشارة: فالنصيبُ محسوبٌ من انحرافات الأعمدة المعيارية ونقطةِ الاستعلام وحدها، ولا يدخل الإيجارُ فيه قط &mdash; فالأمتارُ وحداتٌ أصغر من الغرف بلا مزيد. والجوابُ الذي يريد الأنصبةَ الثلاثة أن تخرج متساوية بالضبط يتوقع ضمانًا لا يقدّمه التوحيد المعياري: فهو يجعل متوسطَ كل عمود صفرًا وانحرافَه المعياري واحدًا على العمود كلِّه، وهذا لا يقول شيئًا عن كيف ستنقسم مسافاتُ استعلامٍ بعينه. والقاعدةُ من جدول الدرس: المسافاتُ والتدرّجات تحتاج توحيدَ المقياس (‏kNN وk-means وآلاتُ المتّجهات الداعمة والشبكاتُ العصبية وتحليلُ المكوّنات الرئيسة وأيُّ نموذج خطي معاقَب)، والمربعاتُ الصغرى بالصيغة المغلقة لا تلاحظ الفرقَ أصلًا، والأشجارُ لا تحتاجه قط."
        }
      },

      /* ---------------------------------------------------------- 23 */
      {
        id: "t2l5q23", type: "ordercode", level: "medium",
        topics: ["t2-fitted-grown", "t2-encoder-next-month"],
        q: {
          en: "<code>fit_encoder(df)</code> and <code>apply_encoder(df, f)</code> are already defined: the first returns the ten parameters of stage 5, the second is a pure apply that can learn nothing because it has access to nothing else. Put the statements in the one order that runs and produces the three-row log &mdash; <code>360 &rarr; 360</code>, <code>120 &rarr; 120</code> and <code>85 &rarr; 85</code>, all three 16 columns wide, the last of them reporting <code>{'city': {'Beit Lahia': 2}}</code>.",
          ar: "‏<code>fit_encoder(df)</code> و<code>apply_encoder(df, f)</code> معرَّفتان أصلًا: فالأولى تعيد وسائطَ المرحلة 5 العشرة، والثانية تطبيقٌ محض لا يستطيع أن يتعلّم شيئًا لأنه لا يملك الوصول إلى غيرها. رتّب الأسطر بالترتيب الوحيد الذي يعمل ويُنتج السجلَّ ذا الأسطر الثلاثة &mdash; <code>360 &rarr; 360</code> و<code>120 &rarr; 120</code> و<code>85 &rarr; 85</code>، وعرضُ الثلاثة 16 عمودًا، وآخرها يُبلّغ عن <code>{'city': {'Beit Lahia': 2}}</code>."
        },
        items: [
          { code: "import pandas as pd" },
          { code: "flats, june = load(\"listings_raw.csv\"), load(\"listings_new.csv\")" },
          { code: "train = flats.sample(frac=0.75, random_state=3)   # 360 rows: the only rows a parameter may come from" },
          { code: "held  = flats.drop(train.index)                   # 120 rows: what is left, and the measurement" },
          { code: "fitted = fit_encoder(train)                       # FIT ONCE: ten parameters, from 360 rows" },
          { code: "rows = [apply_encoder(d, fitted)[1] for d in (train, held, june)]   # APPLY: nothing is recomputed" },
          { code: "print(pd.DataFrame(rows, index=[\"train\", \"held out\", \"June\"]).to_string())" }
        ],
        answer: [0, 1, 2, 3, 4, 5, 6],
        hint: {
          en: "Every statement needs a name the statements above it created, and two of the placements carry the lesson rather than the syntax: one is what the held-out rows are <em>defined</em> as, and one is the word &ldquo;once&rdquo;.",
          ar: "كل سطر يحتاج اسمًا أنشأته الأسطرُ فوقه، وموضعان يحملان الدرس لا القواعد النحوية: أحدهما ما تُعرَّف به الصفوفُ المحجوزة، والآخر كلمةُ «مرة واحدة»."
        },
        explain: {
          en: "The chain of names fixes most of it: <code>pd</code> before the <code>DataFrame</code>, the two frames before the split, <code>train</code> before <code>held</code>, <code>fitted</code> before any apply, <code>rows</code> before it can be printed. Two placements are the lesson. <code>held = flats.drop(train.index)</code> has to come after <code>train</code> not merely because of the name but because of what the held-out set <em>is</em>: it is defined as the complement of the training rows, so it cannot be sampled independently without risking an overlap that would quietly make the measurement meaningless. And <code>fit_encoder</code> is called exactly once, on <code>train</code> alone, <em>above</em> every apply &mdash; which is the whole of stage 5's discipline in one line's position. Note what you would get by moving it: called on <code>flats</code> it leaks, and the warning in the lesson is that the leak would be <em>undetectable from the parameters</em>, because the smallest and the largest flat both happen to be in the training rows, so an honest fit on 360 rows and a leaky fit on 480 both print <code>area_min 30.5, area_max 113.6</code>. Called once per frame, it would refit per batch, so March and June would no longer be comparable and the 16 columns could change width between batches. You prevent leakage by construction, never by inspection &mdash; and the construction here is a line's position.",
          ar: "سلسلةُ الأسماء تثبّت معظمه: فـ<code>pd</code> قبل <code>DataFrame</code>، والجدولان قبل التقسيم، و<code>train</code> قبل <code>held</code>، و<code>fitted</code> قبل أي تطبيق، و<code>rows</code> قبل أن يمكن طبعه. وموضعان هما الدرس. فـ<code>held = flats.drop(train.index)</code> يجب أن يأتي بعد <code>train</code> لا لأجل الاسم وحده بل لأجل ما <em>هي</em> المجموعةُ المحجوزة: فهي معرَّفةٌ بأنها مكمّلةُ صفوف التدريب، فلا يمكن أخذُها عيّنةً مستقلة دون خطر تقاطعٍ يجعل القياس بلا معنى بصمت. و<code>fit_encoder</code> تُنادى مرةً واحدة بالضبط، على <code>train</code> وحده، <em>فوق</em> كل تطبيق &mdash; وهذا انضباطُ المرحلة 5 كلُّه في موضع سطر واحد. ولاحظ ما كنت ستحصل عليه بتحريكه: فمُناداةً على <code>flats</code> يتسرّب، والتحذيرُ في الدرس أن التسرّب كان سيكون <em>غيرَ قابل للكشف من الوسائط</em>، لأن أصغر شقة وأكبرها كلتيهما في صفوف التدريب اتفاقًا، فيطبع الضبطُ الأمين على 360 صفًّا والضبطُ المتسرِّب على 480 كلاهما <code>area_min 30.5, area_max 113.6</code>. ومُناداةً مرةً لكل جدول يُعيد الضبطَ لكل دفعة، فلا يبقى آذار وحزيران قابلين للمقارنة ويمكن أن يتغير عرضُ الأعمدة الستة عشر بين الدفعات. فأنت تمنع التسرّبَ بالبناء لا بالتفتيش قط &mdash; والبناءُ هنا موضعُ سطر."
        }
      },

      /* ---------------------------------------------------------- 24 */
      {
        id: "t2l5q24", type: "write", level: "hard",
        topics: ["t2-scaler-fit-train", "t2-outside-zero-one"],
        q: {
          en: "Write the min&ndash;max scaler of <code>area_m2</code> as a fit/apply pair in the <code>(frame, log_row)</code> shape of <a href=\"#t2l1-s21\">Lesson&nbsp;1</a>. <code>fit_area_scaler(d)</code> takes the training frame and returns a dictionary with exactly the keys <code>area_min</code> and <code>area_max</code>, both learned from that frame and from nowhere else. <code>scale_area(d, f)</code> takes any frame and that dictionary, adds a column <code>area_minmax</code> computed from the <em>stored</em> parameters, and returns the frame beside a log row that records <code>rows_in</code>, <code>rows_out</code>, how many values it scaled, how many fell <strong>outside</strong> <code>[0, 1]</code>, and the <code>listing_id</code> of each one. Do not clip. Then fit on <code>train</code> and apply to <code>train</code>, <code>held</code> and <code>june</code>, printing the parameters and the three-row log.",
          ar: "اكتب مُقايِس الحدَّين لـ<code>area_m2</code> زوجَ ضبطٍ وتطبيق في شكل <code>(frame, log_row)</code> في <a href=\"#t2l1-s21\">الدرس 1</a>. فـ<code>fit_area_scaler(d)</code> تأخذ جدولَ التدريب وتعيد قاموسًا بالمفتاحين <code>area_min</code> و<code>area_max</code> بالضبط، متعلَّمَين من ذلك الجدول ولا من غيره. و<code>scale_area(d, f)</code> تأخذ أيَّ جدول وذلك القاموس، وتضيف عمودًا <code>area_minmax</code> محسوبًا من الوسائط <em>المخزَّنة</em>، وتعيد الجدولَ بجانب سطر سجل يسجّل <code>rows_in</code> و<code>rows_out</code> وكم قيمةً وحّد مقياسها وكم وقعت <strong>خارج</strong> <code>[0, 1]</code> و<code>listing_id</code> لكل واحدة. ولا تقصّ. ثم اضبط على <code>train</code> وطبّق على <code>train</code> و<code>held</code> و<code>june</code>، واطبع الوسائط والسجلَّ ذا الأسطر الثلاثة."
        },
        starter: code(
          "import pandas as pd",
          "",
          "# train: 360 rows   held: 120 rows   june: 85 listings nobody has read",
          "",
          "# your code here"
        ),
        lines: 18,
        checks: [
          {
            re: "def\\s+fit_area_scaler\\s*\\(\\s*\\w+",
            label: {
              en: "A fit, <code>fit_area_scaler</code>, taking the frame to learn from",
              ar: "ضبطٌ، <code>fit_area_scaler</code>، يأخذ الجدول الذي يتعلّم منه"
            }
          },
          {
            re: "[\"']area_min[\"']\\s*:",
            label: {
              en: "The dictionary stores <code>area_min</code> &hellip;",
              ar: "القاموس يخزّن <code>area_min</code> &hellip;"
            }
          },
          {
            re: "[\"']area_max[\"']\\s*:",
            label: {
              en: "&hellip; and <code>area_max</code>",
              ar: "&hellip; و<code>area_max</code>"
            }
          },
          {
            re: "\\.\\s*min\\s*\\(\\s*\\)",
            label: {
              en: "Both are <em>measured</em> on the frame (<code>.min()</code> / <code>.max()</code>), not written in by hand",
              ar: "وكلاهما <em>مقيسٌ</em> على الجدول (<code>.min()</code> و<code>.max()</code>) لا مكتوبٌ بيدك"
            }
          },
          {
            re: "def\\s+scale_area\\s*\\(\\s*\\w+\\s*,\\s*\\w+",
            label: {
              en: "An apply, <code>scale_area</code>, of two arguments: the frame and the fitted dictionary",
              ar: "تطبيقٌ، <code>scale_area</code>، بوسيطين: الجدول والقاموس المضبوط"
            }
          },
          {
            re: "\\[\\s*[\"']area_min[\"']\\s*\\]",
            label: {
              en: "The apply reads the stored minimum instead of recomputing one",
              ar: "التطبيق يقرأ الحدَّ الأدنى المخزَّن بدل أن يحسب واحدًا"
            }
          },
          {
            re: "<\\s*0",
            label: {
              en: "Values below 0 are counted &hellip;",
              ar: "القيم دون 0 معدودة &hellip;"
            }
          },
          {
            re: ">\\s*1",
            label: {
              en: "&hellip; and values above 1 as well",
              ar: "&hellip; والقيم فوق 1 أيضًا"
            }
          },
          {
            re: "return\\s+\\w+[^;]{0,400}?,\\s*\\{",
            label: {
              en: "The apply returns the frame beside a log row",
              ar: "التطبيق يعيد الجدول بجانب سطر سجل"
            }
          }
        ],
        forbid: [
          {
            re: "\\.\\s*clip\\s*\\(",
            label: {
              en: "<code>.clip(0, 1)</code> &mdash; it replaces a true statement about a real flat with a false one and throws the alarm away",
              ar: "‏<code>.clip(0, 1)</code> &mdash; تستبدل عبارةً صادقة عن شقة حقيقية بعبارةٍ كاذبة وترمي الإنذار"
            }
          }
        ],
        solution: {
          code: code(
            "import pandas as pd",
            "",
            "def fit_area_scaler(d):",
            "    \"\"\"FIT: two numbers, from the training rows and from nowhere else.\"\"\"",
            "    return {\"area_min\": float(d[\"area_m2\"].min()),",
            "            \"area_max\": float(d[\"area_m2\"].max())}",
            "",
            "def scale_area(d, f):",
            "    \"\"\"APPLY: pure. Nothing is recomputed, nothing is clipped, breaches are counted.\"\"\"",
            "    v = (d[\"area_m2\"] - f[\"area_min\"]) / (f[\"area_max\"] - f[\"area_min\"])",
            "    out = (v < 0) | (v > 1)",
            "    return d.assign(area_minmax=v), {",
            "        \"step\": \"min-max area_m2\", \"rows_in\": len(d), \"rows_out\": len(d),",
            "        \"scaled\": int(v.notna().sum()), \"outside [0,1]\": int(out.sum()),",
            "        \"breaches\": d.loc[out.fillna(False), \"listing_id\"].tolist()}",
            "",
            "fitted = fit_area_scaler(train)          # 360 rows, never the other 120",
            "print(\"fitted:\", fitted)",
            "rows = [scale_area(d, fitted)[1] for d in (train, held, june)]",
            "print(pd.DataFrame(rows, index=[\"train\", \"held out\", \"June\"]).to_string())"
          ),
          out: code(
            "fitted: {'area_min': 30.5, 'area_max': 113.6}",
            "                      step  rows_in  rows_out  scaled  outside [0,1] breaches",
            "train     min-max area_m2      360       360     341              0       []",
            "held out  min-max area_m2      120       120     113              0       []",
            "June      min-max area_m2       85        85      82              1   [7067]"
          ),
          en: "Two numbers, fitted once on 360 rows. Listing 7067 is a 114-square-metre flat, half a metre larger than anything in the training rows, so it scales to 1.004813 &mdash; and the log counts it instead of hiding it. Note that the honest fit on 360 rows and a leaky fit on all 480 would both have printed 30.5 and 113.6, because the smallest and the largest flat both happen to be training rows: the two fits are different <em>claims</em> even when they are the same number, so you prevent leakage by construction and never by inspection.",
          ar: "رقمان، مضبوطان مرةً على 360 صفًّا. والإعلان 7067 شقةٌ بـ114 مترًا مربعًا، أكبرُ بنصف متر من كل ما في صفوف التدريب، فيوحَّد مقياسُه إلى 1.004813 &mdash; ويعدّه السجلُّ بدل أن يُخفيه. ولاحظ أن الضبط الأمين على 360 صفًّا والضبطَ المتسرِّب على الـ480 كلها كانا سيطبعان 30.5 و113.6 كلاهما، لأن أصغر شقة وأكبرها كلتيهما من صفوف التدريب اتفاقًا: فالضبطان ادّعاءان <em>مختلفان</em> وإن كانا الرقمَ نفسه، فأنت تمنع التسرّب بالبناء لا بالتفتيش قط."
        },
        hint: {
          en: "The apply must be able to run on a single row next July, so it may read nothing from the frame it is given except <code>area_m2</code> and <code>listing_id</code>. The breach mask is <code>NaN</code> wherever the area is blank, which matters when you use it to index.",
          ar: "على التطبيق أن يستطيع العمل على صف واحد في تموز القادم، فلا يحقّ له أن يقرأ من الجدول الذي يُعطاه إلا <code>area_m2</code> و<code>listing_id</code>. وقناعُ الخرق <code>NaN</code> حيث تكون المساحة فارغة، وهذا يهمّ حين تستعمله فهرسًا."
        },
        explain: {
          en: "Everything in this function pair is the fit/apply split made concrete. The fit measures two numbers on the 360 training rows; the apply reads them and recomputes nothing, which is exactly what makes it runnable next July on one listing, on a server, with no access to the training data. The June row is the point of the exercise. Listing 7067 scales to 1.004813, and three claims about that number are worth keeping apart. <strong>It is not a bug:</strong> min&ndash;max promises <code>[0, 1]</code> on the rows it was fitted to and nothing more, so a value above 1 means one thing &mdash; this flat is larger than anything the parameters were learned from &mdash; and that is a true statement about a real flat. <strong>It is the alarm you wanted:</strong> count those per batch and you have a drift monitor for free; one in 82 is nothing, sixteen in 82 next month would be a market that has changed. <strong>And clipping it would be the bug:</strong> <code>v.clip(0, 1)</code> makes the number 1.000000, which asserts that listing 7067 is <em>exactly</em> as large as the largest flat anyone has ever seen &mdash; false, unfalsifiable and unlogged. Before the clip, 0 of the 82 June areas sit at exactly 1.0; after it, 1 does. Refitting is the other tempting repair and it is leakage: it makes March and June incomparable for no reason that exists in the data. Note the two counts the log keeps separate: <code>scaled</code> is 341 of 360 training rows because 19 areas are blank, and those blanks are Lesson 2's problem, not this step's.",
          ar: "كل شيء في هذا الزوج من الدوال هو انفصالُ الضبط والتطبيق مجسَّدًا. فالضبطُ يقيس رقمين على صفوف التدريب الـ360؛ والتطبيقُ يقرأهما ولا يحسب شيئًا، وهذا بالضبط ما يجعله قابلًا للتشغيل في تموز القادم على إعلان واحد، على خادم، بلا وصولٍ إلى بيانات التدريب. وسطرُ حزيران هو مقصود التمرين. فالإعلان 7067 يوحَّد مقياسه إلى 1.004813، وثلاثةُ ادّعاءات عن ذلك الرقم تستحقّ أن تُفصل. <strong>فهو ليس عطلًا:</strong> إذ يَعِد الحدّان بـ<code>[0, 1]</code> على الصفوف التي ضُبط عليها ولا بأكثر، فالقيمةُ فوق 1 تعني شيئًا واحدًا &mdash; أن هذه الشقة أكبرُ من كل ما تعلّمت منه الوسائط &mdash; وهذه عبارةٌ صادقة عن شقة حقيقية. <strong>وهو الإنذارُ الذي أردته:</strong> عُدّها لكل دفعة فيكون عندك مراقبُ انحراف مجانًا؛ فواحدةٌ من 82 لا شيء، وستَّ عشرةَ من 82 الشهر القادم سوقٌ تغيّرت. <strong>وأما قصُّه فهو العطل:</strong> فـ<code>v.clip(0, 1)</code> تجعل الرقم 1.000000، وهذا يزعم أن الإعلان 7067 <em>بالضبط</em> بحجم أكبر شقة رآها أحدٌ قط &mdash; وهو كاذبٌ وغيرُ قابل للتكذيب وغيرُ مسجَّل. وقبل القصّ لا تجلس أيٌّ من مساحات حزيران الـ82 عند 1.0 بالضبط؛ وبعده تجلس واحدة. وإعادةُ الضبط هي الإصلاحُ المغري الآخر وهي تسرّب: فهي تجعل آذار وحزيران غيرَ قابلين للمقارنة لسببٍ لا وجود له في البيانات. ولاحظ العدَّين الذين يُبقيهما السجلُّ منفصلين: فـ<code>scaled</code> هي 341 من صفوف التدريب الـ360 لأن 19 مساحة فارغة، وتلك الفراغات مشكلةُ الدرس 2 لا مشكلةُ هذه الخطوة."
        }
      }

    ]
  };
})();
