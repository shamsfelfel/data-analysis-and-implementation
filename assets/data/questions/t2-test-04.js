window.DABanks = window.DABanks || {};
(function () {
  /* code(line, line, ...) -> one string with \n between lines */
  function code() { return Array.prototype.join.call(arguments, "\n"); }

  window.DABanks["t2-test-04"] = {
    title: {
      en: "Test 4 — Outliers and Skew: Thresholds You Can Defend",
      ar: "اختبار 4 — القيم الشاذة والالتواء: حدودٌ تستطيع الدفاع عنها"
    },
    intro: {
      en: "24 questions on Lesson 4: telling a wrong value from a wrong unit from a rare but real one, looking at a column before measuring it, climbing the five rungs from an eyeballed cut-off to a domain limit plus a robust z, pricing the four actions against a held-out MAE, and measuring skew without being fooled by <code>expm1</code>. Note which frame each question is on: Concepts 2 to 5 measure the raw 503-row file, the later sections the 480-flat frame. Plan for about 50 minutes. Every question carries a hint, an answer and an explanation, hidden until you ask for them: try first, then open them. A revealed answer is not counted.",
      ar: "‏24 سؤالًا عن الدرس 4: التفريق بين قيمة خاطئة ووحدة خاطئة وقيمة نادرة لكنها حقيقية، والنظر في العمود قبل قياسه، وتسلُّق الدرجات الخمس من قطعٍ مقدَّر بالنظر إلى حدٍّ ميداني مع z حصينة، وتحديد ثمن الأعمال الأربعة مقابل متوسط خطأ مطلق على صفوف محجوزة، وقياس الالتواء بلا أن تخدعك <code>expm1</code>. ولاحظ على أي جدول يجري كل سؤال: فالمفاهيم من 2 إلى 5 تقيس الملف الخام ذا الـ503 صفوف، والأقسام اللاحقة تقيس جدول الـ480 شقة. خصّص نحو 50 دقيقة. لكل سؤال تلميح وجواب وشرح، وكلها مخفية حتى تطلبها: جرّب أولًا ثم افتحها. والجواب الذي يُظهَر لا يُحتسب."
    },
    questions: [

      /* ---------------------------------------------------------- 01 */
      {
        id: "t2l4q01", type: "tf", level: "easy",
        topics: ["t2-outlier-kinds", "t2-conflating-kinds"],
        q: {
          en: "True or false: the three things this lesson calls an outlier &mdash; a wrong value, a wrong unit and a rare but real value &mdash; differ in how far they sit from the middle of their column, so a rule with three thresholds instead of one could separate them and give each the action it deserves.",
          ar: "صح أم خطأ: الأشياء الثلاثة التي يسمّيها هذا الدرس قيمةً شاذة &mdash; قيمةٌ خاطئة، ووحدةٌ خاطئة، وقيمةٌ نادرة لكنها حقيقية &mdash; تختلف في مقدار بُعدها عن وسط عمودها، فقاعدةٌ بثلاثة حدود بدل حدٍّ واحد تستطيع أن تفرّقها وتعطي كلًّا منها العمل الذي تستحقه."
        },
        truth: false,
        hint: {
          en: "Put three of this file's numbers on the robust-z ruler and read them in order: the daily rate of 25, a perfectly ordinary 100-shekel studio, and the genuine 580-shekel flat in Gaza City. Does the order match the three kinds?",
          ar: "ضع ثلاثة من أرقام هذا الملف على مسطرة z الحصينة واقرأها بالترتيب: أجرةُ اليوم البالغة 25، واستوديو عاديّ تمامًا بمئة شيكل، وشقةُ الـ580 شيكلًا الحقيقية في مدينة غزة. فهل يطابق الترتيبُ الأنواعَ الثلاثة؟"
        },
        explain: {
          en: "False, and the three robust z-scores say why. The daily rate of 25 &mdash; the most obviously broken number at the bottom of the column &mdash; scores &minus;2.36, while an entirely honest 100-shekel studio scores &minus;1.35 and the genuine 580-shekel flat scores +5.13. A real home therefore sits twice as far from the middle as the broken cell does, so no ordering of thresholds can put them in different boxes. Every rule in this lesson computes a distance and nothing else, and 99999 and 580 differ in that one of them is <em>possible</em> &mdash; possibility is not in the file. The claim is tempting because distance really does identify the 99999, which scores 1346.3; what it cannot do is identify the <em>kind</em>, and conflating the kinds is the mistake the whole lesson exists to prevent.",
          ar: "خطأ، وتقول الدرجاتُ الحصينة الثلاث السبب. فأجرةُ اليوم البالغة 25 &mdash; وهي أظهرُ رقمٍ عطبًا في أسفل العمود &mdash; تحصل على &minus;2.36، في حين يحصل استوديو أمينٌ تمامًا بمئة شيكل على &minus;1.35 وتحصل شقةُ الـ580 الحقيقية على +5.13. فالبيتُ الحقيقي يجلس على ضعف بُعد الخليةِ المعطوبة عن الوسط، فلا ترتيبَ للحدود يستطيع أن يضعهما في صندوقين مختلفين. وكل قاعدة في هذا الدرس تحسب مسافةً ولا تحسب غيرها، و99999 و580 يختلفان في أن إحداهما <em>ممكنة</em> &mdash; والإمكان ليس في الملف. والادّعاءُ مغرٍ لأن المسافة تحدّد 99999 فعلًا، إذ تحصل على 1346.3؛ وما لا تستطيعه هو تحديدُ <em>النوع</em>، وخلطُ الأنواع هو الخطأ الذي وُجد هذا الدرس كله لمنعه."
        }
      },

      /* ---------------------------------------------------------- 02 */
      {
        id: "t2l4q02", type: "fill", level: "easy",
        topics: ["t2-quartile", "t2-iqr-fence"],
        q: {
          en: "Fill in the three blanks so that <code>fences()</code> returns the quartiles, the inter-quartile range and the two fences of the raw 484-rent column, and the last line counts what falls outside them.",
          ar: "املأ الفراغات الثلاثة لتعيد <code>fences()</code> الربيعَين والمدى الربيعي والسياجَين لعمود الإيجارات الخام ذي الـ484 قيمة، وليعدّ السطر الأخير ما يقع خارجهما."
        },
        code: code(
          "def fences(s, k=1.5):",
          "    \"\"\"Return the quartiles, the IQR and the two fences of a numeric series.\"\"\"",
          "    q1, q3 = s.quantile(____1____), s.quantile(.75)",
          "    iqr = q3 - q1",
          "    return {\"Q1\": q1, \"Q3\": q3, \"IQR\": iqr,",
          "            \"low\": q1 - ____2____ * iqr, \"high\": q3 + k * iqr}",
          "",
          "",
          "f = fences(raw[\"monthly_rent\"])",
          "print(\" \".join(\"%s=%.3f\" % kv for kv in f.items()))",
          "outside = (raw[\"monthly_rent\"] < f[\"low\"]) | (raw[\"monthly_rent\"] > f[\"high\"])",
          "print(\"values outside: %d\" % int(outside.____3____()))",
          "",
          "# Q1=153.750 Q3=255.000 IQR=101.250 low=1.875 high=406.875",
          "# values outside: 12"
        ),
        blanks: [
          { accept: [".25", "0.25"] },
          { accept: ["k"] },
          { accept: ["sum"] }
        ],
        hint: {
          en: "The first blank is the proportion a quarter of the way up a sorted column. The second must be the thing the caller can change, or <code>k</code> would only move one of the two fences. The third turns a column of <code>True</code> and <code>False</code> into a count.",
          ar: "الفراغ الأول هو النسبةُ عند رُبع الطريق في عمودٍ مرتَّب. والثاني يجب أن يكون الشيء الذي يستطيع المنادي تغييره، وإلا حرّك <code>k</code> سياجًا واحدًا من السياجَين. والثالث يحوّل عمودًا من <code>True</code> و<code>False</code> إلى عدّ."
        },
        explain: {
          en: "A quartile is a position in a sorted column: <code>quantile(.25)</code> reads the value a quarter of the way up, <code>quantile(.75)</code> three quarters of the way up, and the inter-quartile range <code>Q3 &minus; Q1</code> = 101.25 is the width of the middle half. Writing <code>1.5</code> into the second blank instead of <code>k</code> is the tempting slip, and it would run and print the same numbers at the default &mdash; then quietly move only the upper fence when somebody passed <code>k=2.0</code>. Read the third number of the output before you leave: the lower fence is <strong>1.875 shekels</strong>, below any rent that has ever existed, so on this column &ldquo;outside the fences&rdquo; means &ldquo;above the upper fence&rdquo; and nothing else &mdash; which is why the daily rate of 25 on listing 5208 passes. And <code>outside.sum()</code> works because summing booleans counts the <code>True</code>s.",
          ar: "الربيعُ موضعٌ في عمودٍ مرتَّب: فتقرأ <code>quantile(.25)</code> القيمةَ عند رُبع الطريق، و<code>quantile(.75)</code> القيمةَ عند ثلاثة أرباعه، والمدى الربيعي <code>Q3 &minus; Q1</code> = 101.25 عرضُ النصف الأوسط. وكتابةُ <code>1.5</code> في الفراغ الثاني بدل <code>k</code> هي الزلّة المغرية، وهي تعمل وتطبع الأرقام نفسها على القيمة الافتراضية &mdash; ثم تحرّك السياج الأعلى وحده بهدوء حين يمرّر أحدٌ <code>k=2.0</code>. واقرأ الرقم الثالث في المخرج قبل أن تمضي: السياجُ الأدنى <strong>1.875 شيكلًا</strong>، أي تحت أي إيجار وُجد قط، فتكون «خارج السياجَين» في هذا العمود «فوق السياج الأعلى» ولا شيء غيرها &mdash; ولهذا تعبر أجرةُ اليوم البالغة 25 في الإعلان 5208. و<code>outside.sum()</code> تعمل لأن جمع المنطقيات يعدّ قيم <code>True</code>."
        }
      },

      /* ---------------------------------------------------------- 03 */
      {
        id: "t2l4q03", type: "match", level: "easy",
        topics: ["t2-value-error", "t2-unit-error", "t2-rare-but-real"],
        q: {
          en: "Six listings this chapter's rules flag somewhere. Match each to what it is and to the action it needs. The file medians to compare against are: rent per m&sup2; 2.76, m&sup2; per room 23.7, deposit 1.0 months' rent.",
          ar: "ستة إعلانات تعلّمها قواعد هذا الفصل في مواضع. وصّل كلًّا منها بما هو وبالعمل الذي يحتاجه. ووسطاءُ الملف التي تقارن بها: الإيجار للمتر المربع 2.76، والمتر المربع للغرفة 23.7، والتأمين إيجارُ شهر واحد."
        },
        leftHead: { en: "The listing, and its numbers", ar: "الإعلان وأرقامه" },
        rightHead: { en: "What it is, and the action", ar: "ما هو، والعمل" },
        pairs: [
          {
            l: {
              en: "<strong>5062</strong> &mdash; Jabalia, rent 99999, 74.5&nbsp;m&sup2;, 3 rooms, deposit 150 (0.002 months), rent per m&sup2; 1342",
              ar: "<strong>5062</strong> &mdash; جباليا، إيجار 99999، و74.5 م&sup2;، وثلاث غرف، وتأمين 150 (‏0.002 شهر)، والإيجار للمتر 1342"
            },
            r: {
              en: "<strong>A wrong value</strong> the column cannot mean at all &mdash; a phone number in a rent box. Void the cell to <code>NaN</code> and keep the row, on <strong>every</strong> row including the held-out ones, because voiding an impossible value learns nothing from the data.",
              ar: "<strong>قيمةٌ خاطئة</strong> لا يمكن أن يعنيها العمود أصلًا &mdash; رقمُ هاتفٍ في خانة إيجار. أفرِغ الخليةَ إلى <code>NaN</code> وأبقِ الصف، في <strong>كل</strong> صف ومنه المحجوز، لأن إفراغ قيمة مستحيلة لا يتعلّم شيئًا من البيانات."
            }
          },
          {
            l: {
              en: "<strong>5208</strong> &mdash; Rafah, rent 25, 89.3&nbsp;m&sup2;, 4 rooms, deposit 135 (5.4 months), rent per m&sup2; 0.28",
              ar: "<strong>5208</strong> &mdash; رفح، إيجار 25، و89.3 م&sup2;، وأربع غرف، وتأمين 135 (‏5.4 أشهر)، والإيجار للمتر 0.28"
            },
            r: {
              en: "<strong>A wrong unit</strong> &mdash; a <em>daily</em> rate in a monthly column. Void and ask the source, because 135 is two months of 67.5 or three of 45 and the file cannot choose. No rule on the rent column alone reaches it; a cross-column ratio does.",
              ar: "<strong>وحدةٌ خاطئة</strong> &mdash; أجرةُ <em>يوم</em> في عمود شهري. أفرِغ واسأل المصدر، فـ135 شهران من 67.5 أو ثلاثة من 45 ولا يستطيع الملف أن يختار. ولا تبلغها قاعدةٌ على عمود الإيجار وحده؛ بل تبلغها نسبةٌ بين عمودين."
            }
          },
          {
            l: {
              en: "<strong>5015</strong> &mdash; Gaza, 0.0379&nbsp;m&sup2;, 1 room, rent 140, rent per m&sup2; 3694",
              ar: "<strong>5015</strong> &mdash; غزة، و0.0379 م&sup2;، وغرفة واحدة، وإيجار 140، والإيجار للمتر 3694"
            },
            r: {
              en: "<strong>A wrong unit</strong> &mdash; an area entered in dunum, and therefore <strong>recoverable</strong>. Multiply by 1000 to get 37.9&nbsp;m&sup2;, exactly the size one room predicts, behind a provenance flag and an <code>assert</code>.",
              ar: "<strong>وحدةٌ خاطئة</strong> &mdash; مساحةٌ أُدخلت بالدونم، فهي <strong>قابلة للاستعادة</strong>. اضرب في 1000 فتحصل على 37.9 م&sup2;، وهي بالضبط الحجمُ الذي تتنبأ به غرفةٌ واحدة، وراء علم مَنشأ و<code>assert</code>."
            }
          },
          {
            l: {
              en: "<strong>5319</strong> &mdash; Khan Younis, 12 rooms in 34.0&nbsp;m&sup2;, rent 120, 2.8&nbsp;m&sup2; per room",
              ar: "<strong>5319</strong> &mdash; خان يونس، واثنتا عشرة غرفة في 34.0 م&sup2;، وإيجار 120، و2.8 م&sup2; للغرفة"
            },
            r: {
              en: "<strong>A wrong value</strong> in a count column: 2.8&nbsp;m&sup2; per room against a median of 23.7, and the advert says three bedrooms. Void <code>rooms</code>, or repair it to 3 from the advert &mdash; on every row. <code>LIMITS[\"rooms\"] = (1, 8)</code> catches it with no second column.",
              ar: "<strong>قيمةٌ خاطئة</strong> في عمود عدّ: ‏2.8 م&sup2; للغرفة مقابل وسيط 23.7، والإعلان يقول ثلاث غرف نوم. أفرِغ <code>rooms</code>، أو أصلحها إلى 3 من الإعلان &mdash; في كل صف. ويلقطها <code>LIMITS[\"rooms\"] = (1, 8)</code> بلا عمود ثانٍ."
            }
          },
          {
            l: {
              en: "<strong>5019</strong> &mdash; Gaza, rent 580, 73.0&nbsp;m&sup2;, 3 rooms, good, deposit 580 (1.0 months), 24.3&nbsp;m&sup2; per room",
              ar: "<strong>5019</strong> &mdash; غزة، وإيجار 580، و73.0 م&sup2;، وثلاث غرف، وحالتها جيدة، وتأمين 580 (شهر واحد)، و24.3 م&sup2; للغرفة"
            },
            r: {
              en: "<strong>Rare but real</strong> &mdash; the most expensive home in the file, and every ratio in it is ordinary. There is nothing to repair. Keep it and flag it; if you drop it at all, drop it from the <strong>training rows only</strong>.",
              ar: "<strong>نادرةٌ لكنها حقيقية</strong> &mdash; أغلى بيت في الملف، وكل نسبةٍ فيه عادية. ولا شيء يُصلَح. أبقِه وعلّمه؛ وإن حذفتَه أصلًا فاحذفه من <strong>صفوف التدريب وحدها</strong>."
            }
          },
          {
            l: {
              en: "<strong>5408</strong> &mdash; Gaza, deposit 1155 (the largest in the file), rent 385, 78.2&nbsp;m&sup2;, 3 rooms",
              ar: "<strong>5408</strong> &mdash; غزة، وتأمين 1155 (أكبر تأمين في الملف)، وإيجار 385، و78.2 م&sup2;، وثلاث غرف"
            },
            r: {
              en: "<strong>Rare but real</strong>, and the quickest of the six to settle: 1155 is exactly 3&nbsp;&times;&nbsp;385, the flat's own rent. Three months' deposit on an expensive flat is not an error at all. Keep it; nothing is wrong.",
              ar: "<strong>نادرةٌ لكنها حقيقية</strong>، وأسرعُ الستة حسمًا: فـ1155 تساوي 3&nbsp;&times;&nbsp;385 بالضبط، أي إيجار الشقة نفسها. وتأمينُ ثلاثة أشهر على شقة غالية ليس خطأً أصلًا. أبقِه؛ لا شيء خاطئ."
            }
          }
        ],
        hint: {
          en: "Two of the six are recoverable, two must become <code>NaN</code>, and two need no repair at all. Divide before you match: a rent per m&sup2; a thousand times the median, or a deposit that is not a whole number of months, is a different signature from a number that is merely large.",
          ar: "اثنان من الستة قابلان للاستعادة، واثنان يجب أن يصيرا <code>NaN</code>، واثنان لا يحتاجان إصلاحًا أصلًا. فاقسم قبل أن تُوصّل: فالإيجارُ للمتر الذي يعلو الوسيطَ بألف ضعف، أو التأمينُ الذي ليس عددًا صحيحًا من الأشهر، بصمةٌ غيرُ بصمةِ رقمٍ كبيرٍ فقط."
        },
        explain: {
          en: "Three derived ratios settle all six without a single statistical threshold. A rent per m&sup2; of 1342 or 3694 against a median of 2.76 says the <em>scale</em> is wrong, and whether the digits are recoverable decides between voiding and converting: &times;1000 turns 0.0379 into exactly the 37.9&nbsp;m&sup2; one room predicts, while nothing turns 99999 into a rent. A deposit of 0.002 or 5.4 months against 378 of 380 recorded pairs at exactly 1, 2 or 3 is the only check in the chapter that finds <em>both</em> rent errors &mdash; the 25 is invisible to every rule on the rent column, since 25 is a perfectly ordinary number for a rent column to contain. And the two <em>rare but real</em> rows are the ones to be careful with, because every automatic rule flags them: 5019's rent is high and its rent per m&sup2;, m&sup2; per room and deposit months are all unremarkable, and 5408's enormous deposit is exactly three times its own rent. The actions differ in which rows they may touch, and that is the half most people skip: a repair is wrong in June as surely as in March, so it runs everywhere; deciding not to model expensive flats is a modelling choice, so it runs on the training rows only.",
          ar: "ثلاثُ نسب مستنبَطة تحسم الستة كلها بلا حدٍّ إحصائي واحد. فالإيجارُ للمتر البالغ 1342 أو 3694 مقابل وسيط 2.76 يقول إن <em>المقياس</em> خاطئ، وقابليةُ الأرقام للاستعادة هي التي تحسم بين الإفراغ والتحويل: فـ×1000 تحوّل 0.0379 إلى 37.9 م&sup2; بالضبط وهي ما تتنبأ به غرفةٌ واحدة، ولا شيء يحوّل 99999 إلى إيجار. وتأمينٌ قدره 0.002 أو 5.4 أشهر مقابل 378 من 380 زوجًا مسجَّلًا تساوي 1 أو 2 أو 3 بالضبط هو الفحصُ الوحيد في الفصل الذي يجد <em>خطأي</em> الإيجار كليهما &mdash; فالـ25 غيرُ مرئية لكل قاعدة على عمود الإيجار، إذ إن 25 رقمٌ عاديٌّ تمامًا لعمود إيجار أن يحتويه. والصفّان <em>النادران الحقيقيان</em> هما اللذان يجب الحذرُ فيهما، لأن كل قاعدة تلقائية تعلّمهما: فإيجار 5019 مرتفع، وإيجارُه للمتر ومترُه للغرفة وأشهرُ تأمينه كلها غير لافتة، وتأمينُ 5408 الهائل يساوي ثلاثة أمثال إيجاره بالضبط. والأعمالُ تختلف في أي الصفوف يحقّ لها أن تمسّ، وهذا هو النصف الذي يتخطّاه معظم الناس: فالإصلاحُ خاطئ في حزيران كما هو خاطئ في آذار بيقين، فيعمل في كل مكان؛ وقرارُ عدم نمذجة الشقق الغالية خيارُ نمذجة، فيعمل على صفوف التدريب وحدها."
        }
      },

      /* ---------------------------------------------------------- 04 */
      {
        id: "t2l4q04", type: "mcq", level: "easy",
        topics: ["t2-look-before-measure", "t2-binned-counts"],
        q: {
          en: "<code>describe()</code> on the raw rent column prints eight numbers: count 484, mean 416.3, std 4536.6, min 25.0, 25% 153.8, 50% 200.0, 75% 255.0, max 99999.0. Which of these can you <em>not</em> read off them &mdash; and is the thing that decides what you do next?",
          ar: "تطبع <code>describe()</code> على عمود الإيجار الخام ثمانية أرقام: العدّ 484، والمتوسط 416.3، والانحراف المعياري 4536.6، والأصغر 25.0، و25% ‏153.8، و50% ‏200.0، و75% ‏255.0، والأكبر 99999.0. فأيُّ هذه <em>لا</em> تستطيع قراءته منها &mdash; وهو الذي يحسم ما تفعله تاليًا؟"
        },
        options: [
          {
            en: "<strong>How many</strong> rents are up near the maximum. One, or forty? One value with an empty desert around it is a typo; forty is a premium segment whose deletion somebody senior has to sign. The summary hands you the extreme and withholds its weight.",
            ar: "<strong>كم</strong> إيجارًا قريبٌ من القيمة العظمى. واحدٌ أم أربعون؟ فقيمةٌ واحدة حولها صحراء خالية خطأُ إدخال؛ وأربعون قطاعٌ متميّز يجب أن يوقّع مسؤولٌ على حذفه. فالتلخيصُ يسلّمك المتطرفةَ ويحجب وزنها."
          },
          {
            en: "That the column is right-skewed. Eight order statistics can say how wide the column is but not which side carries the long tail, so the direction of the skew needs <code>Series.skew()</code> before anything else can be decided.",
            ar: "أن العمود ملتوٍ إلى اليمين. فثمانيةُ إحصاءات ترتيبية تستطيع أن تقول كم عرضُ العمود لا أيُّ جانبيه يحمل الذيل الطويل، فيحتاج اتجاهُ الالتواء <code>Series.skew()</code> قبل أن يُقرَّر شيء آخر."
          },
          {
            en: "That nineteen rents are missing. <code>count</code> reports only the values that are present, so the holes leave no trace in the summary and have to be counted separately with <code>isna()</code>.",
            ar: "أن تسعة عشر إيجارًا مفقودة. فلا يُبلّغ <code>count</code> إلا عن القيم الحاضرة، فلا تترك الثقوبُ أثرًا في التلخيص ويجب عدّها منفصلةً بـ<code>isna()</code>."
          },
          {
            en: "The width of the middle half of the column. The two quartiles are printed but the inter-quartile range is not, so the spread of the ordinary values cannot be judged from this output and the fence cannot be built from it.",
            ar: "عرضُ النصف الأوسط من العمود. فالربيعان مطبوعان والمدى الربيعي ليس مطبوعًا، فلا يمكن الحكم على تشتّت القيم العادية من هذا المخرج ولا بناءُ السياج منه."
          }
        ],
        answer: 0,
        hint: {
          en: "Three of the four claim something is hidden that one subtraction, one comparison or one row count would recover from the eight numbers in front of you. Try each recovery before you choose.",
          ar: "ثلاثةٌ من الأربعة تدّعي خفاءَ شيءٍ تستعيده عمليةُ طرحٍ واحدة أو مقارنةٌ واحدة أو عدُّ صفوفٍ واحد من الأرقام الثمانية أمامك. فجرّب كل استعادة قبل أن تختار."
          },
        explain: {
          en: "Between 255 and 99999 the summary is completely silent, and that gap is where the decision lives: <code>value_counts(bins=6)</code> answers it in one line &mdash; 483 values in the first bin, one in the last, four empty bins in between &mdash; and &ldquo;one row with an 83,000-shekel desert around it&rdquo; is the signature of a value error, where a premium segment would have neighbours. The skew answer is the tempting one, because the skew really is a separate call; but <code>mean 416.3</code> against <code>50% 200.0</code> already points the way, and for any column <code>mean &minus; median</code> has the same sign as the skew. The missing-value answer is exactly backwards: <code>count</code> 484 against a 503-row file is <em>how</em> you see the nineteen holes. And <code>Q3 &minus; Q1 = 101.25</code> is one subtraction, which is also the number the fence is built from.",
          ar: "بين 255 و99999 يصمت التلخيصُ صمتًا تامًّا، وفي تلك الفجوة يسكن القرار: فتجيب <code>value_counts(bins=6)</code> عنها في سطر واحد &mdash; ‏483 قيمة في المجال الأول وواحدة في الأخير وأربعة مجالات خالية بينهما &mdash; و«صفٌّ واحد حوله صحراء عرضها ثلاثة وثمانون ألف شيكل» بصمةُ خطأِ قيمة، أما القطاعُ المتميّز فله جيران. وجوابُ الالتواء هو المغري، لأن الالتواء نداءٌ منفصل فعلًا؛ لكن <code>mean 416.3</code> مقابل <code>50% 200.0</code> يشير إلى الجهة سلفًا، ولأي عمودٍ تكون إشارةُ <code>mean &minus; median</code> إشارةَ الالتواء. وجوابُ القيم المفقودة مقلوبٌ تمامًا: فـ<code>count</code> البالغ 484 مقابل ملفٍ من 503 صفوف هو <em>كيف</em> ترى الثقوبَ التسعة عشر. و<code>Q3 &minus; Q1 = 101.25</code> عمليةُ طرحٍ واحدة، وهي أيضًا الرقمُ الذي يُبنى منه السياج."
        }
      },

      /* ---------------------------------------------------------- 05 */
      {
        id: "t2l4q05", type: "output", level: "easy",
        topics: ["t2-eyeballed-threshold", "t2-threshold-next-month", "t2-filter-drops-blanks"],
        q: {
          en: "The threshold <code>1000</code> was eyeballed off March's histogram, and the same line is now run on June's batch. June has 85 rows, 83 of which carry a rent, the most expensive asking 440.0. Write exactly what the program prints.",
          ar: "الحدُّ <code>1000</code> قُدِّر بالنظر من رسم آذار التكراري، والسطرُ نفسه يُشغَّل الآن على دفعة حزيران. وفي حزيران 85 صفًّا، يحمل 83 منها إيجارًا، وأغلاها يطلب 440.0. اكتب بالضبط ما يطبعه البرنامج."
        },
        code: code(
          "new  = pd.read_csv(\"listings_new.csv\")",
          "kept = new[new[\"monthly_rent\"] < 1000]",
          "",
          "print(len(kept))",
          "print(int((new[\"monthly_rent\"] >= 1000).sum()))",
          "print(int(new[\"monthly_rent\"].isna().sum()))",
          "print(len(new) - len(kept))"
        ),
        blanks: [
          { accept: ["83\n0\n2\n2"], lines: 4 }
        ],
        hint: {
          en: "The second line counts what the threshold was written to remove. The fourth counts what the filter removed. They are not the same number, and the reason is what <code>NaN &lt; 1000</code> evaluates to.",
          ar: "السطرُ الثاني يعدّ ما كُتب الحدُّ لإزالته. والرابعُ يعدّ ما أزاله المرشّح. وليسا الرقمَ نفسه، والسببُ هو ما تساويه <code>NaN &lt; 1000</code>."
        },
        explain: {
          en: "Both halves of this output are bad. The threshold is now <strong>inert</strong>: it sits 560 shekels above the most expensive flat in the file, so it removes zero outliers &mdash; whatever is wrong with June's rents, this line will not find it. And it still deletes two rows, because a comparison against a missing value is <code>False</code>, never <code>True</code> and never missing, so the two blank rents are swept out along with nothing else. Four lines, four numbers, and only the second one is the number the author intended. The tempting answer for the last line is 0, read off the line above it: the filter kept 83 of 85, and the two it lost are exactly the rows it was never meant to touch. A threshold eyeballed from one batch's histogram is calibrated to that batch; the next one is a different batch, and the same line does something completely different without telling you.",
          ar: "شطرا هذا المخرج سيئان. فالحدُّ الآن <strong>خامل</strong>: إذ يعلو أغلى شقة في الملف بخمس مئة وستين شيكلًا، فيُزيل صفرًا من الشواذّ &mdash; فمهما كان الخطأ في إيجارات حزيران فلن يجده هذا السطر. وهو مع ذلك يحذف صفَّين، لأن المقارنة مع قيمةٍ مفقودة <code>False</code>، لا <code>True</code> قط ولا مفقودة قط، فيُكنَس الإيجاران الفارغان ولا شيء غيرهما. أربعةُ أسطر وأربعةُ أرقام، وواحدٌ ثانٍ منها فقط هو الرقمُ الذي قصده الكاتب. والجوابُ المغري للسطر الأخير هو 0، مقروءًا من السطر فوقه: فقد أبقى المرشّح 83 من 85، والصفّان اللذان فقدهما هما بالضبط الصفّان اللذان لم يُقصد أن يمسّهما. فالحدُّ المقدَّر بالنظر من رسمِ دفعةٍ واحدة معايَرٌ على تلك الدفعة؛ والدفعةُ التالية دفعةٌ أخرى، ويفعل السطرُ نفسه شيئًا مختلفًا تمامًا دون أن يخبرك."
        }
      },

      /* ---------------------------------------------------------- 06 */
      {
        id: "t2l4q06", type: "order", level: "easy",
        topics: ["t2-quantiles", "t2-text-histogram", "t2-look-at-rows"],
        q: {
          en: "Put the five ways of looking at the rent column in the order Concept 2 improves them, from the one that supports a single vague decision to the one that names a listing you could ring up. Each step answers the question the step before it could not.",
          ar: "رتّب الطرق الخمس للنظر في عمود الإيجار كما يحسّنها المفهوم 2، من التي تسند قرارًا واحدًا مبهمًا إلى التي تسمّي إعلانًا تستطيع أن تهاتفه. وكل خطوة تجيب السؤال الذي لم تستطعه الخطوةُ التي قبلها."
        },
        items: [
          {
            en: "<code>describe()</code> and a guess &mdash; eight numbers, from which the only decision available is &ldquo;something is wrong at the top, cut somewhere&rdquo;. Between 255 and 99999 the summary says nothing at all.",
            ar: "<code>describe()</code> وتخمين &mdash; ثمانيةُ أرقام، والقرارُ الوحيد المتاح منها «شيءٌ ما خاطئ في الأعلى، اقطع في مكان ما». وبين 255 و99999 لا يقول التلخيصُ شيئًا أصلًا."
          },
          {
            en: "<code>quantile([.01, .05, .25, .50, .75, .95, .99, 1.00])</code> &mdash; the 99th percentile is 475.85, so ninety-nine per cent of the rents are under 476 and the suspects are inside the last one per cent. Still no counts: &ldquo;under 1%&rdquo; of 484 is anything from one row to four.",
            ar: "<code>quantile([.01, .05, .25, .50, .75, .95, .99, 1.00])</code> &mdash; فالمئينُ التاسع والتسعون 475.85، أي أن تسعةً وتسعين بالمئة من الإيجارات تحت 476 والمتّهمون داخل الواحد بالمئة الأخير. ولا أعداد بعد: فـ«أقلّ من 1%» من 484 أيُّ شيء بين صف واحد وأربعة."
          },
          {
            en: "<code>value_counts(bins=6)</code> &mdash; weights at last, in the bluntest possible form: 483 values in the first bin, one in the last and four empty bins between them. One row, with an 83,000-shekel desert around it. Useless as a picture of the market, perfect as a diagnosis.",
            ar: "<code>value_counts(bins=6)</code> &mdash; أوزانٌ أخيرًا، بأفجّ صورة ممكنة: ‏483 قيمة في المجال الأول وواحدة في الأخير وأربعة مجالات خالية بينهما. صفٌّ واحد حوله صحراء عرضها ثلاثة وثمانون ألف شيكل. وهي صورةٌ للسوق بلا نفع، وتشخيصٌ تامّ."
          },
          {
            en: "Void the impossible cell <em>first</em>, then print a text histogram &mdash; the shape of the column at last: one peak between 136 and 247 and a right tail thinning 35, 12, 6, 3, 2. No gap anywhere, so there is no point at which to cut without separating flats from flats almost identical to them.",
            ar: "أفرِغ الخليةَ المستحيلة <em>أولًا</em>، ثم اطبع رسمًا تكراريًّا نصيًّا &mdash; شكلُ العمود أخيرًا: قمةٌ واحدة بين 136 و247 وذيلٌ أيمن يرقّ 35 ثم 12 ثم 6 ثم 3 ثم 2. ولا فجوة في أي موضع، فلا نقطةَ قطعٍ تقطع عندها بلا أن تفصل شققًا عن شققٍ تكاد تطابقها."
          },
          {
            en: "<code>nsmallest(5)</code> and <code>nlargest(5)</code> with <code>city</code>, <code>area_m2</code> and <code>rooms</code> beside the rent &mdash; the rows, not the numbers, which is the only way the 25 on a four-room 89.3&nbsp;m&sup2; flat in Rafah becomes visible at all.",
            ar: "<code>nsmallest(5)</code> و<code>nlargest(5)</code> مع <code>city</code> و<code>area_m2</code> و<code>rooms</code> بجانب الإيجار &mdash; الصفوف لا الأرقام، وهي الطريقةُ الوحيدة التي تصير بها الـ25 في شقةٍ من أربع غرف ومساحتها 89.3 م&sup2; في رفح مرئيةً أصلًا."
          }
        ],
        answer: [0, 1, 2, 3, 4],
        hint: {
          en: "Two of the five give you positions and no weights; one gives you weights and no shape; one gives you a shape and no rows. Sort them by what each one still cannot tell you.",
          ar: "اثنان من الخمسة يعطيانك مواضع بلا أوزان؛ وواحدٌ يعطيك أوزانًا بلا شكل؛ وواحدٌ يعطيك شكلًا بلا صفوف. فرتّبها بما لا يستطيع كلٌّ منها أن يخبرك به بعد."
        },
        explain: {
          en: "The ladder is driven by one question the previous rung cannot answer. <code>describe()</code> gives the extreme and withholds its weight; a percentile is a position, so <code>quantile()</code> narrows the suspects to the last one per cent and still cannot count them; equal-width bins finally count, and in doing so prove there is exactly <em>one</em> value up there. Only then is the repair justified, and only after the repair is a histogram readable &mdash; equal-width bins are computed from <code>min</code> and <code>max</code>, so a single impossible value makes every bin 16,687 shekels wide and the whole market lands in the first one. That is why <a href=\"#t2l1-h2\">the canonical order</a> puts values before outliers. And the last rung has no statistics in it at all: the smooth thinning of the tail tells you there is no gap to cut at, and printing the rows tells you that the cheapest flat in the file is a four-room 89.3&nbsp;m&sup2; dwelling asking 25 shekels &mdash; a daily rate no rule in the lesson detects.",
          ar: "يحرّك السُّلّمَ سؤالٌ واحد لا تستطيع الدرجةُ السابقة إجابته. فـ<code>describe()</code> تعطي المتطرفةَ وتحجب وزنها؛ والمئينُ موضعٌ، فتضيّق <code>quantile()</code> المتّهمين إلى الواحد بالمئة الأخير ولا تستطيع عدَّهم بعد؛ والمجالاتُ المتساوية العرض تعدّ أخيرًا، وتُثبت بذلك أن هناك قيمةً <em>واحدة</em> في الأعلى. وحينها فقط يكون الإصلاحُ مبرَّرًا، وبعد الإصلاح فقط يصير الرسمُ التكراري مقروءًا &mdash; فالمجالاتُ المتساوية العرض محسوبة من <code>min</code> و<code>max</code>، فتجعل قيمةٌ مستحيلة واحدة كل مجال عرضه 16,687 شيكلًا وتهبط السوق كلها في الأول. ولهذا يضع <a href=\"#t2l1-h2\">الترتيبُ القياسي</a> القيمَ قبل الشواذّ. والدرجةُ الأخيرة لا إحصاء فيها أصلًا: فرقُّ الذيل السلس يخبرك أنه لا فجوة تقطع عندها، وطبعُ الصفوف يخبرك أن أرخص شقة في الملف مسكنٌ من أربع غرف ومساحته 89.3 م&sup2; يطلب خمسة وعشرين شيكلًا &mdash; أي أجرةَ يومٍ لا يكشفها أي قاعدة في الدرس."
        }
      },

      /* ---------------------------------------------------------- 07 */
      {
        id: "t2l4q07", type: "tf", level: "easy",
        topics: ["t2-unit-error", "t2-domain-limit"],
        q: {
          en: "True or false: <code>repair_area_units()</code> may be applied to the held-out rows as well as the training rows, because a conversion factor of 1000 comes from the unit and not from the column &mdash; and yet <code>AREA_MIN_M2 = 5</code> is still a judgement, so a genuine 4&nbsp;m&sup2; storage room would be multiplied by a thousand without complaint.",
          ar: "صح أم خطأ: يجوز تطبيق <code>repair_area_units()</code> على الصفوف المحجوزة كما على صفوف التدريب، لأن معامل التحويل 1000 يأتي من الوحدة لا من العمود &mdash; ومع ذلك فإن <code>AREA_MIN_M2 = 5</code> ما زال حكمًا، فغرفةُ تخزينٍ حقيقية بأربعة أمتار مربعة ستُضرب في ألف بلا اعتراض."
        },
        code: code(
          "DUNUM_M2 = 1000          # 1 dunum = 1000 square metres",
          "AREA_MIN_M2 = 5          # no flat in this market is smaller than this",
          "",
          "",
          "def repair_area_units(frame, column=\"area_m2\"):",
          "    s = frame[column]",
          "    is_dunum = (s < AREA_MIN_M2).fillna(False)",
          "    fixed = s.mask(is_dunum, s * DUNUM_M2)",
          "    assert (fixed[is_dunum] >= AREA_MIN_M2).all(), \"a converted area is still impossible\"",
          "    return frame.assign(**{column: fixed, column + \"_from_dunum\": is_dunum}), is_dunum.sum()",
          "",
          "",
          "work, changed = repair_area_units(clean)      # 480 rows in, 480 rows out",
          "derived = work.loc[work[\"area_m2_from_dunum\"], \"area_m2\"]",
          "print(\"changed %d | range %.1f-%.1f m2\" % (changed, derived.min(), derived.max()))",
          "# changed 5 | range 37.9-87.8 m2"
        ),
        truth: true,
        hint: {
          en: "Two separate questions are being asked, and both have to be right for the whole claim to be true. The first is about <a href=\"#t2l1-h3\">fit and apply</a>: does anything here get <em>learned</em> from the data? The second is about what the constant on line 2 would do to a file this market has not sent yet.",
          ar: "سؤالان منفصلان مطروحان، ويجب أن يصحّا كلاهما ليصحّ الادّعاءُ كله. الأولُ عن <a href=\"#t2l1-h3\">الضبط والتطبيق</a>: هل يُتعلَّم شيءٌ هنا من البيانات؟ والثاني عمّا سيفعله الثابتُ في السطر 2 بملفٍّ لم ترسله هذه السوق بعد."
        },
        explain: {
          en: "True on both halves, and the second half is why the version is honest rather than correct. Nothing in this function is a <strong>fitted parameter</strong>: 1000 is the definition of a dunum and 5 is a claim about the market, so no row teaches the repair anything and applying it to the held-out quarter cannot leak &mdash; it is pure <a href=\"#t2l1-h3\">apply</a>, the same entitlement that let <a href=\"#t2l1-s26\">Lesson&nbsp;1</a> void the 99999 everywhere. The tempting objection is that the repair changes values and therefore looks like the capping that <em>must</em> be fitted on the training rows; the difference is where the number came from, not whether a value changed. And the concession is real: <code>(s &lt; 5)</code> would catch a true 4&nbsp;m&sup2; store room and silently make it 4000. What Version&nbsp;2 buys is not certainty but a named constant, an <code>assert</code> that fails loudly, a <code>area_m2_from_dunum</code> flag recording which five cells are derived, and a count in the log &mdash; so a reviewer can disagree with the number 5 instead of with your afternoon.",
          ar: "صحٌّ في الشطرين، والشطرُ الثاني هو سببُ كون النسخة أمينةً لا صحيحة. فلا شيء في هذه الدالة <strong>وسيطٌ مضبوط</strong>: فـ1000 تعريفُ الدونم و5 ادّعاءٌ عن السوق، فلا صفَّ يعلّم الإصلاحَ شيئًا ولا يمكن لتطبيقه على الرُبع المحجوز أن يسرّب &mdash; فهو <a href=\"#t2l1-h3\">تطبيقٌ</a> صِرف، وهو الحقُّ نفسه الذي أتاح لـ<a href=\"#t2l1-s26\">الدرس 1</a> أن يُفرِغ 99999 في كل مكان. والاعتراضُ المغري أن الإصلاح يغيّر قيمًا فيشبه تحديدَ السقف الذي <em>يجب</em> ضبطه على صفوف التدريب؛ والفرقُ في مصدر الرقم لا في تغيُّر قيمة. والتنازلُ حقيقي: فـ<code>(s &lt; 5)</code> ستلقط غرفةَ تخزينٍ حقيقية بأربعة أمتار وتجعلها 4000 بصمت. وما تشتريه النسخة 2 ليس اليقين بل ثابتًا مسمَّى، و<code>assert</code> يفشل بصوت عالٍ، وعلمَ <code>area_m2_from_dunum</code> يسجّل أيَّ الخلايا الخمس مستنبَطة، وعدًّا في السجل &mdash; فيستطيع المراجعُ أن يخالف الرقم 5 بدل أن يخالف أصيلك."
        }
      },

      /* ---------------------------------------------------------- 08 */
      {
        id: "t2l4q08", type: "mcq", level: "medium",
        topics: ["t2-zscore", "t2-zscore-breaks"],
        q: {
          en: "The twelve rows the IQR fence flagged, with their ordinary z-scores on the raw column. A flat asking 415 shekels &mdash; more than twice the median rent &mdash; has <code>z = &minus;0.0003</code>, so by this rule it is slightly <em>below</em> average. What is going on?",
          ar: "الصفوف الاثنا عشر التي علّمها السياجُ الربيعي، ودرجاتها المعيارية العادية على العمود الخام. فشقةٌ تطلب 415 شيكلًا &mdash; أي أكثر من ضعف وسيط الإيجار &mdash; درجتها <code>z = &minus;0.0003</code>، فهي بهذه القاعدة <em>تحت</em> المتوسط قليلًا. فما الذي يجري؟"
        },
        code: code(
          "mean 416.3202  std 4536.5870",
          "",
          " listing_id  monthly_rent        z  flagged_by_z",
          "       5281         415.0  -0.0003         False",
          "       5083         420.0   0.0008         False",
          "       5110         425.0   0.0019         False",
          "       5032         425.0   0.0019         False",
          "       5398         450.0   0.0074         False",
          "       5416         465.0   0.0107         False",
          "       5480         475.0   0.0129         False",
          "       5334         480.0   0.0140         False",
          "       5045         510.0   0.0206         False",
          "       5392         555.0   0.0306         False",
          "       5019         580.0   0.0361         False",
          "       5062       99999.0  21.9510          True"
        ),
        lang: "text",
        options: [
          {
            en: "Every reading is arithmetically correct and every one is nonsense, because the denominator is 4536.59 while the entire genuine market is 555 shekels wide. In units of this standard deviation the whole rental market of Gaza is 0.12 units across, so every real flat lands on top of the mean.",
            ar: "كل قراءة صحيحة حسابيًّا وكلٌّ منها هُراء، لأن المقام 4536.59 وسوق التأجير الحقيقية كلها عرضها 555 شيكلًا. فبوحدات هذا الانحراف المعياري يكون عرضُ سوق التأجير في غزة كلها 0.12 وحدة، فتهبط كل شقة حقيقية فوق المتوسط."
          },
          {
            en: "The 415-shekel flat genuinely is below average: the mean of this column is 416.32 and 415 is less than 416.32, so the sign of its z-score is reporting the column correctly and the real problem is only that the rule's threshold of 3 is too strict.",
            ar: "شقةُ الـ415 شيكلًا تحت المتوسط فعلًا: فمتوسطُ هذا العمود 416.32 و415 أقلُّ من 416.32، فإشارةُ درجتها المعيارية تُبلّغ عن العمود إبلاغًا صحيحًا والمشكلةُ الحقيقية أن حدَّ القاعدة البالغ 3 أشدُّ من اللازم فقط."
          },
          {
            en: "A z-score is only defined for a normally distributed column, and this one is right-skewed, so these readings are undefined rather than wrong and the rule has to be replaced by a rank-based one before any number can be read at all.",
            ar: "الدرجةُ المعيارية معرَّفة للعمود الموزَّع توزيعًا طبيعيًّا فقط، وهذا العمود ملتوٍ إلى اليمين، فهذه القراءات غيرُ معرَّفة لا خاطئة، ويجب استبدال القاعدة بقاعدةٍ مبنيّة على الرُّتب قبل أن يمكن قراءةُ أي رقم أصلًا."
          },
          {
            en: "<code>Series.std()</code> divides by <code>n &minus; 1</code> rather than <code>n</code>, which makes every z-score of a 484-row column too small; rescaling by the square root of 484/483 restores the readings and the rule then agrees with the fence.",
            ar: "تقسم <code>Series.std()</code> على <code>n &minus; 1</code> لا على <code>n</code>، فتصير كل درجة معيارية لعمودٍ من 484 صفًّا أصغر من حقّها؛ وإعادةُ القياس بجذر 484/483 تستعيد القراءات فتتفق القاعدةُ حينئذٍ مع السياج."
          }
        ],
        answer: 0,
        hint: {
          en: "Compute the threshold the rule is actually applying: <code>mean + 3 &times; std</code> with these two numbers. Then ask which of the two ingredients a single cell could have moved, and by how much.",
          ar: "احسب الحدَّ الذي تطبّقه القاعدة فعلًا: ‏<code>mean + 3 &times; std</code> بهذين الرقمين. ثم اسأل أيَّ المكوّنين كان يمكن لخليةٍ واحدة أن تحرّكه، وبكم."
        },
        explain: {
          en: "<code>mean + 3 &times; std</code> is about 14,026 shekels here, so nothing except the typo could possibly reach it, and the z-score of the most expensive home in the file is 0.036 &mdash; utterly unremarkable. The answer that calls 415 genuinely below average is the one worth sitting with, because it is <em>arithmetically true</em>: 415 really is less than 416.32. It mistakes a poisoned mean for the market. Void the one cell and the mean is 210.14, against which 415 is nearly double the average flat; the standard deviation falls from 4536.59 to 81.46 and the same rule flags six rows instead of one. The answer about normality overcorrects a real insight: these readings are perfectly well defined, and the robust z on this same skewed column reads 5.13 for the 580, so the problem is the denominator rather than the shape. And <code>n &minus; 1</code> changes <code>std</code> by about a tenth of a per cent on 484 rows &mdash; the kind of answer that comes from reading the docstring instead of the data. One extreme value inflating the spread until it hides every other extreme value has a name: <strong>masking</strong>, and the more broken your column, the cleaner <code>|z| &gt; 3</code> says it is.",
          ar: "‏<code>mean + 3 &times; std</code> نحو 14,026 شيكلًا هنا، فما كان يمكن لشيء غير خطأ الإدخال أن يبلغه، ودرجةُ أغلى بيت في الملف 0.036 &mdash; أي غيرُ لافتة قط. والجوابُ الذي يسمّي 415 تحت المتوسط فعلًا هو الذي يستحقّ التمهّل، لأنه <em>صحيحٌ حسابيًّا</em>: فـ415 أقلُّ من 416.32 حقًّا. وهو يحسب المتوسطَ المسمومَ سوقًا. فأفرِغ الخليةَ الواحدة فيصير المتوسط 210.14، و415 أمامه قريبٌ من ضعف الشقة المتوسطة؛ ويهبط الانحرافُ المعياري من 4536.59 إلى 81.46 فتعلّم القاعدةُ نفسها ستة صفوف بدل واحد. والجوابُ عن التوزيع الطبيعي يُفرط في تصحيح بصيرةٍ حقيقية: فهذه القراءات معرَّفة تعريفًا تامًّا، وz الحصينة على هذا العمود الملتوي نفسه تقرأ 5.13 للـ580، فالمشكلةُ المقامُ لا الشكل. و<code>n &minus; 1</code> يغيّر <code>std</code> بنحو عُشر الواحد بالمئة على 484 صفًّا &mdash; وهو نوعُ الأجوبة التي تأتي من قراءة التوثيق بدل البيانات. وللقيمةِ المتطرفة الواحدة التي تضخّم التشتّت حتى تُخفي كل قيمة متطرفة أخرى اسمٌ: <strong>الحَجْب</strong>، وكلما كان عمودك أعطب قالت <code>|z| &gt; 3</code> إنه أنظف."
        }
      },

      /* ---------------------------------------------------------- 09 */
      {
        id: "t2l4q09", type: "compare", level: "medium",
        topics: ["t2-outlier-rule-ladder", "t2-zscore-breaks"],
        q: {
          en: "Rungs two and three of the threshold ladder, both run on <code>clean</code>, the 480-flat frame with 461 rents. Which statement is correct?",
          ar: "الدرجتان الثانية والثالثة من سُلّم الحدود، وكلتاهما تعمل على <code>clean</code>، أي جدول الـ480 شقة الذي فيه 461 إيجارًا. فأيُّ العبارات صحيحة؟"
        },
        codeA: code(
          "g = fences(clean[\"monthly_rent\"])                       # Q1, Q3, IQR, low, high",
          "extreme = ((clean[\"monthly_rent\"] < g[\"low\"]) | (clean[\"monthly_rent\"] > g[\"high\"])).fillna(False)",
          "work = clean.assign(rent_extreme=extreme)",
          "",
          "print(\"fence [%.3f, %.3f] | flagged %d of %d rents\"",
          "      % (g[\"low\"], g[\"high\"], int(extreme.sum()), clean[\"monthly_rent\"].count()))",
          "print(\"rows %d -> %d (nothing deleted)\" % (len(clean), len(work)))",
          "",
          "# fence [5.000, 405.000] | flagged 12 of 461 rents",
          "# rows 480 -> 480 (nothing deleted)"
        ),
        codeB: code(
          "s = clean[\"monthly_rent\"]",
          "mu, sd = s.mean(), s.std()",
          "extreme = (((s - mu) / sd).abs() > 3).fillna(False)",
          "",
          "print(\"mean %.4f  std %.4f  |z| > 3 flagged %d\" % (mu, sd, int(extreme.sum())))",
          "print(clean.loc[extreme, [\"listing_id\", \"city\", \"monthly_rent\"]].to_string(index=False))",
          "",
          "# mean 427.1020  std 4648.3298  |z| > 3 flagged 1",
          "#  listing_id    city  monthly_rent",
          "#        5062 Jabalia       99999.0"
        ),
        options: [
          {
            en: "The version built from the quartiles is better: both of its two parameters are positions in a sorted column, so the 99999 cannot move them, and it finds the typo <em>and</em> the eleven expensive flats. What it still leaves open: the single <code>True</code> makes no distinction between a phone number and a family's home, and the <code>1.5</code> inside it is as conventional as the <code>3</code> beside it.",
            ar: "النسخةُ المبنيّة من الربيعَين أفضل: فوسيطاها كلاهما موضعان في عمودٍ مرتَّب، فلا تستطيع 99999 تحريكهما، وهي تجد خطأَ الإدخال <em>و</em>الشققَ الغالية الإحدى عشرة. وما يبقى مفتوحًا فيها: أن <code>True</code> الواحدة لا تفرّق بين رقم هاتف وبيت أسرة، وأن <code>1.5</code> فيها متعارفٌ بقدر <code>3</code> التي بجانبها."
          },
          {
            en: "The version expressed in standard deviations is better: a threshold of 3 has a probabilistic meaning for a bell-shaped column &mdash; about three values in a thousand &mdash; where <code>1.5 &times; IQR</code> is a convention with no reason behind it, so only one of the two numbers can be defended to a reviewer.",
            ar: "النسخةُ المعبَّر عنها بالانحرافات المعيارية أفضل: فللحدّ 3 معنًى احتمالي في عمودٍ جَرَسي &mdash; نحو ثلاث قيم في الألف &mdash; في حين أن <code>1.5 &times; IQR</code> عُرفٌ بلا سببٍ وراءه، فواحدٌ فقط من الرقمين يمكن الدفاع عنه أمام مراجع."
          },
          {
            en: "The version expressed in standard deviations is better because it is stricter: it flags only the row everybody agrees is broken and leaves the eleven real Gaza City homes alone, which is exactly the outcome the lesson spends Concept&nbsp;1 arguing for.",
            ar: "النسخةُ المعبَّر عنها بالانحرافات المعيارية أفضل لأنها أشدّ: فهي تعلّم الصفَّ الذي يتفق الجميع على عطبه وحده وتترك بيوتَ مدينة غزة الحقيقية الإحدى عشرة، وهذه بالضبط النتيجةُ التي ينفق المفهوم 1 في الحجّ لها."
          },
          {
            en: "They are equivalent on the question that matters, since both compute their threshold from the column rather than from somebody's eye &mdash; so both are fitted parameters, both carry the same leakage risk, and the choice between them is a matter of taste.",
            ar: "هما متكافئتان في السؤال المهمّ، فكلتاهما تحسب حدَّها من العمود لا من عين أحد &mdash; فكلتاهما وسيطٌ مضبوط، وكلتاهما تحمل خطرَ التسرّب نفسه، والاختيارُ بينهما مسألةُ ذوق."
          }
        ],
        answer: 0,
        hint: {
          en: "Look at the two printed denominators. One version's threshold was computed from ranks; the other's was computed from a sum that includes the very value the rule exists to catch. Then ask which of the two outputs would change if the typo had been typed differently.",
          ar: "انظر في المقامَين المطبوعَين. فحدُّ إحدى النسختين محسوبٌ من رُتب؛ وحدُّ الأخرى محسوبٌ من مجموعٍ يضمّ القيمةَ عينَها التي وُجدت القاعدةُ لتلقطها. ثم اسأل أيَّ المخرجَين كان سيتغيّر لو كُتب خطأُ الإدخال كتابةً أخرى."
        },
        explain: {
          en: "<code>sd = 4648.33</code> was computed from the 99999, so the rule is calibrated by its own target: the eleven expensive Gaza City flats get z-scores between <code>&minus;0.0003</code> and <code>0.0361</code> and the version reports a clean column that contains a phone number. The quartiles are read off ranks, so changing the largest rent from 580 to 99999 or to 10<sup>9</sup> does not move Q3 at all, and the fence of <code>[5.000, 405.000]</code> is the same whether the typo is there or not. The answer that prefers the standard-deviation form is the one to take seriously, because the lesson concedes exactly half of it: <code>3</code> really does have a probabilistic story and <code>1.5</code> really is a convention &mdash; it is just the wrong half to decide on, and <a href=\"#t2l4-s37\">appendix&nbsp;A</a> gives <code>1.5</code> a story too, at 2.698 standard deviations or one row in 143. The answer that praises the z-rule for being stricter mistakes luck for judgement: it reports one row because its denominator is fifty-six times too large, not because it approves of the eleven homes. And the two are not equivalent even though both thresholds are fitted: being fitted is a leakage question, and being destroyed by a single cell is a correctness question.",
          ar: "‏<code>sd = 4648.33</code> محسوبٌ من الـ99999، فالقاعدةُ معايَرةٌ بهدفها هو: فتحصل الشققُ الغالية الإحدى عشرة في مدينة غزة على درجاتٍ بين <code>&minus;0.0003</code> و<code>0.0361</code>، وتُبلّغ النسخةُ عن عمودٍ نظيف فيه رقمُ هاتف. أما الربيعان فمقروءان من الرُّتب، فتغييرُ أكبر إيجار من 580 إلى 99999 أو إلى 10<sup>9</sup> لا يحرّك Q3 أصلًا، والسياجُ <code>[5.000, 405.000]</code> هو هو سواءٌ وُجد خطأُ الإدخال أو لم يوجد. والجوابُ الذي يفضّل صورة الانحراف المعياري هو الذي يستحقّ أن يُؤخذ بجدّية، لأن الدرس يُقرّ بنصفه بالضبط: فللـ<code>3</code> حكايةٌ احتمالية فعلًا و<code>1.5</code> عُرفٌ فعلًا &mdash; إلا أنه النصفُ الخاطئ للحسم، ويعطي <a href=\"#t2l4-s37\">الملحقُ أ</a> للـ<code>1.5</code> حكايةً أيضًا، عند 2.698 انحرافًا معياريًّا أو صفٍّ من كل 143. والجوابُ الذي يمدح قاعدة z على شدّتها يحسب الحظَّ حكمًا: فهي تُبلّغ عن صفٍّ واحد لأن مقامها أكبر بستة وخمسين ضعفًا، لا لأنها توافق على البيوت الإحدى عشرة. وليستا متكافئتين وإن كان الحدّان مضبوطين كلاهما: فالضبطُ سؤالُ تسرّب، والانهيارُ بخليةٍ واحدة سؤالُ صواب."
        }
      },

      /* ---------------------------------------------------------- 10 */
      {
        id: "t2l4q10", type: "compare", level: "medium",
        topics: ["t2-action-remove", "t2-action-transform"],
        q: {
          en: "Two actions on the same thirteen flagged rows, both on the 503-row <code>base</code> frame with the typo already voided and the fence fitted on the 363 training rents. The baseline to compare against is 60.17 shekels of held-out MAE on 120 rents. Which statement is correct?",
          ar: "عملان في الصفوف المعلَّمة الثلاثة عشر نفسها، وكلاهما على جدول <code>base</code> ذي الـ503 صفوف وخطأُ الإدخال مُفرَغٌ سلفًا والسياجُ مضبوطٌ على إيجارات التدريب الـ363. والخطُّ القاعدي الذي يُقارن به 60.17 شيكلًا من متوسط الخطأ المطلق على 120 إيجارًا محجوزًا. فأيُّ العبارات صحيحة؟"
        },
        codeA: code(
          "work = base[~flag]",
          "print(\"rows %d -> %d | held-out rents left: %d\"",
          "      % (len(base), len(work),",
          "         work.loc[work.index.intersection(test.index), \"monthly_rent\"].count()))",
          "",
          "# rows 503 -> 490 | held-out rents left: 117",
          "# MAE train 55.74 | held out 55.47"
        ),
        codeB: code(
          "work = base.assign(monthly_rent=np.log1p(base[\"monthly_rent\"]))",
          "print(\"rows %d -> %d | values rewritten: 0 | reversible: %s | skew %.2f -> %.2f\"",
          "      % (len(base), len(work),",
          "         bool(np.allclose(np.expm1(work[\"monthly_rent\"]).dropna(), base[\"monthly_rent\"].dropna())),",
          "         base[\"monthly_rent\"].skew(), work[\"monthly_rent\"].skew()))",
          "",
          "# rows 503 -> 503 | values rewritten: 0 | reversible: True | skew 1.01 -> -0.47",
          "# MAE train 61.74 | held out 60.17"
        ),
        options: [
          {
            en: "The log transform is better on the one thing that decides it: its held-out error is measured on all 120 rents, so 60.17 is comparable with the baseline, while the removal's 55.47 was measured on 117 because it deleted three held-out flats. What the log still leaves open: it <em>finds</em> nothing, and the units are gone, so a mean cannot be carried back &mdash; 195.16 against the true 210.14.",
            ar: "التحويلُ اللوغاريتمي أفضل في الشيء الواحد الذي يحسم: فخطؤه على المحجوزة مقيسٌ على الإيجارات الـ120 كلها، فيكون 60.17 قابلًا للمقارنة بالخط القاعدي، في حين أن 55.47 للإزالة قيس على 117 لأنها حذفت ثلاث شقق محجوزة. وما يبقى مفتوحًا في اللوغاريتم: أنه لا <em>يجد</em> شيئًا، وأن الوحدات زالت، فلا يمكن إعادةُ متوسط &mdash; ‏195.16 مقابل 210.14 الحقيقية."
          },
          {
            en: "Removing the flagged rows is better, because it is the only one of the two that actually takes the extreme values out of the column: the log transform leaves every one of the thirteen in place, merely compressed, so a model fitted on it is still learning from them.",
            ar: "إزالةُ الصفوف المعلَّمة أفضل، لأنها الوحيدة من الاثنين التي تُخرج القيمَ المتطرفة من العمود فعلًا: فالتحويلُ اللوغاريتمي يُبقي الثلاثة عشر كلها في موضعها مضغوطةً فقط، فيكون النموذجُ المضبوط عليها ما زال يتعلّم منها."
          },
          {
            en: "The log transform is better, and the skew falling from 1.01 to &minus;0.47 is the proof: a column that symmetric can no longer mislead an estimator, so the held-out error must fall below the baseline once the predictions are carried back to shekels with <code>expm1</code>.",
            ar: "التحويلُ اللوغاريتمي أفضل، وهبوطُ الالتواء من 1.01 إلى &minus;0.47 هو البرهان: فعمودٌ بهذا التناظر لا يستطيع أن يضلّل مُقدِّرًا بعد، فيجب أن يهبط الخطأُ على المحجوزة تحت الخط القاعدي متى أُعيدت التنبؤاتُ إلى الشواكل بـ<code>expm1</code>."
          },
          {
            en: "They are equivalent in effect: both end with a column in which no rent is far from the middle &mdash; one by deleting the rows that were far out, the other by compressing the distance &mdash; so the choice is about whether downstream joins need the row count intact.",
            ar: "هما متكافئان في الأثر: فكلاهما ينتهي إلى عمودٍ لا إيجار فيه بعيدٌ عن الوسط &mdash; أحدهما بحذف الصفوف البعيدة والآخر بضغط المسافة &mdash; فيكون الاختيارُ عن هل تحتاج عمليات الدمج اللاحقة عددَ الصفوف سليمًا."
          }
        ],
        answer: 0,
        hint: {
          en: "Read the row counts and then the two reported errors, and ask what each error was measured on. One of the four options makes a prediction about the held-out MAE that the printed comment already contradicts.",
          ar: "اقرأ أعداد الصفوف ثم الخطأين المُبلَّغ عنهما، واسأل على أي شيء قيس كلُّ خطأ. وخيارٌ من الأربعة يتنبّأ بشيء عن الخطأ على المحجوزة يناقضه التعليقُ المطبوع سلفًا."
        },
        explain: {
          en: "A held-out error is only a number if the held-out set is fixed. Dropping three of its rows changes the question, so 55.47 and 60.17 are answers to different questions and the gap is mostly the exam getting shorter: apply the <em>same</em> removal to the training rows only and the honest figure is 60.00, so the real gain from removing eleven expensive flats is 0.17 shekels, not 4.70. The log transform touches no row and rewrites no value, and <code>expm1</code> recovers the column exactly &mdash; so the 580 flat is still distinguishable from the 555 flat, which removal cannot say. The answer that praises removal for actually taking the values out describes the two correctly and judges them by the wrong criterion: the question is what the ruler says, and the ruler was altered. The answer that predicts an improvement from the falling skew is refuted by the output itself: 60.17, identical to the baseline, because a logarithm preserves order and a median is defined by order alone, so <code>expm1(median of logs)</code> is <em>identically</em> the median. And they are not equivalent: one changed the data, the other changed the evaluation set.",
          ar: "الخطأُ على المحجوزة ليس رقمًا إلا إذا كانت المجموعةُ المحجوزة ثابتة. فحذفُ ثلاثة من صفوفها يغيّر السؤال، فيكون 55.47 و60.17 جوابين لسؤالين مختلفين، والفجوةُ في معظمها قِصَرُ الامتحان: فطبّق الإزالةَ <em>نفسها</em> على صفوف التدريب وحدها فيكون الرقمُ الأمين 60.00، أي أن الكسبَ الحقيقي من إزالة إحدى عشرة شقة غالية 0.17 شيكلًا لا 4.70. والتحويلُ اللوغاريتمي لا يمسّ صفًّا ولا يُعيد كتابة قيمة، وتستعيد <code>expm1</code> العمودَ بالضبط &mdash; فشقةُ الـ580 ما زالت متمايزة من شقة الـ555، وهذا ما لا تستطيع الإزالةُ قوله. والجوابُ الذي يمدح الإزالةَ على إخراجها القيمَ فعلًا يصف الاثنين وصفًا صحيحًا ويحكم عليهما بالمعيار الخاطئ: فالسؤالُ ما تقوله المسطرة، والمسطرةُ غُيّرت. والجوابُ الذي يتنبّأ بتحسّنٍ من هبوط الالتواء ينقضه المخرجُ نفسه: ‏60.17، مطابقٌ للخط القاعدي، لأن اللوغاريتم يحفظ الترتيب والوسيطُ معرَّف بالترتيب وحده، فتكون <code>expm1(median of logs)</code> هي الوسيطَ <em>عينَه</em>. وليسا متكافئين: فأحدهما غيّر البيانات والآخر غيّر مجموعةَ التقييم."
        }
      },

      /* ---------------------------------------------------------- 11 */
      {
        id: "t2l4q11", type: "contrast", level: "medium",
        topics: ["t2-iqr-fence", "t2-robust-z"],
        q: {
          en: "Place each statement under the <strong>1.5 &times; IQR fence</strong>, under the <strong>robust z</strong>, or under both. Every figure is this file's.",
          ar: "ضع كل عبارة تحت <strong>سياج 1.5 × المدى الربيعي</strong> أو تحت <strong>z الحصينة</strong> أو تحت كليهما. وكل رقمٍ هو رقمُ هذا الملف."
        },
        concepts: [
          { en: "The 1.5 &times; IQR fence", ar: "سياج 1.5 × المدى الربيعي" },
          { en: "The robust z (median, MAD, &times; 0.6745)", ar: "‏z الحصينة (الوسيط والانحراف المطلق × 0.6745)" }
        ],
        rows: [
          {
            s: {
              en: "Both of its parameters are read off positions in a sorted column, so a few arbitrary values cannot move them far &mdash; it is built from robust statistics.",
              ar: "وسيطاه كلاهما مقروءان من مواضع في عمودٍ مرتَّب، فلا تستطيع قيمٌ قليلة عشوائية تحريكهما بعيدًا &mdash; فهو مبنيٌّ من إحصاءات حصينة."
            },
            a: 2
          },
          {
            s: {
              en: "Needs one constant whose only job is a unit conversion &mdash; the MAD of a bell-shaped column is 0.6745 of its standard deviation &mdash; so that the familiar thresholds 3 and 3.5 keep roughly the meaning they had.",
              ar: "يحتاج ثابتًا واحدًا عملُه الوحيد تحويلُ وحدة &mdash; فالانحرافُ المطلق الوسيطي لعمودٍ جَرَسي 0.6745 من انحرافه المعياري &mdash; لتحفظ الحدودُ المعروفة 3 و3.5 معناها تقريبًا."
            },
            a: 1
          },
          {
            s: {
              en: "Gives every row a readable score you can watch approach the threshold: 465 is 3.58 out, 580 is 5.13, and the 99999 is 1346.3.",
              ar: "يعطي كل صفٍّ درجةً مقروءة تستطيع أن تراها تقترب من الحدّ: فـ465 تبعد 3.58، و580 تبعد 5.13، و99999 تبعد 1346.3."
            },
            a: 1
          },
          {
            s: {
              en: "Its threshold on this file was 406.875 fitted on all 484 rents, 408.750 after the typo was voided, and 397.500 fitted on the 363 training rents &mdash; three defensible choices and three different numbers.",
              ar: "حدُّه في هذا الملف 406.875 مضبوطًا على الإيجارات الـ484 كلها، و408.750 بعد إفراغ خطأ الإدخال، و397.500 مضبوطًا على إيجارات التدريب الـ363 &mdash; ثلاثةُ خيارات قابلة للدفاع وثلاثةُ أرقام مختلفة."
            },
            a: 0
          },
          {
            s: {
              en: "Fails to flag listing 5208's rent of 25 on this column, and no change of threshold rescues it, because 25 is a perfectly ordinary number for a rent column to contain.",
              ar: "يعجز عن تعليم إيجار الإعلان 5208 البالغ 25 في هذا العمود، ولا ينجده تغييرُ حدٍّ، لأن 25 رقمٌ عاديٌّ تمامًا لعمود إيجار أن يحتويه."
            },
            a: 2
          },
          {
            s: {
              en: "Flags all eleven of the genuine Gaza City flats from 415 to 580, every one of them a home.",
              ar: "يعلّم شققَ مدينة غزة الحقيقية الإحدى عشرة كلها من 415 إلى 580، وكلٌّ منها بيت."
            },
            a: 0
          },
          {
            s: {
              en: "The number multiplying its spread has a normal-theory story behind it: if the column were perfectly normal the thresholds would sit 2.698 standard deviations out and flag about one row in 143.",
              ar: "للرقم الذي يضرب تشتّتَه حكايةٌ من نظرية التوزيع الطبيعي وراءه: فلو كان العمود طبيعيًّا تمامًا لجلست الحدودُ على بُعد 2.698 انحرافًا معياريًّا ولعلّمت نحو صفٍّ من كل 143."
            },
            a: 0
          }
        ],
        hint: {
          en: "Two of the seven are true of both rules, and one of those two is the row most people get wrong because they expect the robust rule to repair everything. For the rest, ask whether the statement is about a <em>pair of ranks</em> or about a <em>per-row distance</em>.",
          ar: "اثنتان من السبع تصحّان في القاعدتين، وإحدى هاتين هي العبارةُ التي يُخطئ فيها معظم الناس لأنهم يتوقعون أن تُصلح القاعدةُ الحصينة كل شيء. وفي الباقي، اسأل هل العبارةُ عن <em>زوجِ رُتب</em> أم عن <em>مسافةٍ لكل صف</em>."
        },
        explain: {
          en: "Both rules are built from ranks, which is the whole reason either survives a broken column: Q1, Q3, the median and the MAD are all positions in a sorted list, and the MAD of the rent column is 50.0 whether the 99999 is present or not. What separates them is the shape of the answer. The fence returns a pair of bounds and therefore one bare <code>True</code> per row, and its bounds move with the rows it is fitted on &mdash; 406.875, 408.750, 397.500 &mdash; which is why it belongs in <code>fitted</code>. The robust z returns a <em>number per row</em>, which is why 0.6745 exists: it is a unit conversion onto the ordinary z's scale, not a tuning knob, and it lets you see 465 at 3.58 approaching the threshold rather than crossing a cliff. The fence flags all eleven genuine flats where the robust rule at 3.5 flags six of them, which is a difference of judgement and not of correctness. And the row that catches people is the 25: a robust rule is better than a fragile one, but <em>neither</em> reaches a value in the wrong unit, because &ldquo;wrong unit&rdquo; is not a distance. What finds it is <code>LIMITS[\"monthly_rent\"] = (50, 2000)</code>, or the <code>deposit / monthly_rent</code> ratio, and both of those are domain knowledge rather than statistics.",
          ar: "القاعدتان مبنيّتان من الرُّتب، وهذا كلُّ سبب نجاة أيٍّ منهما من عمود معطوب: فـQ1 وQ3 والوسيط والانحراف المطلق كلها مواضع في قائمة مرتَّبة، والانحرافُ المطلق لعمود الإيجار 50.0 سواءٌ وُجدت 99999 أو لم توجد. والذي يفرّقهما شكلُ الجواب. فالسياجُ يعيد زوجَ حدود فيعيد <code>True</code> مجرّدة لكل صف، وحدّاه يتحرّكان مع الصفوف المضبوط عليها &mdash; ‏406.875 و408.750 و397.500 &mdash; ولهذا ينتمي إلى <code>fitted</code>. وتعيد z الحصينة <em>رقمًا لكل صف</em>، ولهذا وُجدت 0.6745: فهي تحويلُ وحدة إلى مقياس z العادية لا مفتاحُ ضبط، وهي تتيح لك أن ترى 465 عند 3.58 تقترب من الحدّ لا تعبر جُرفًا. ويعلّم السياجُ الشققَ الحقيقية الإحدى عشرة كلها حيث تعلّم القاعدةُ الحصينة عند 3.5 ستًّا منها، وهذا اختلافُ حكمٍ لا اختلافُ صواب. والعبارةُ التي تُسقط الناس هي الـ25: فالقاعدةُ الحصينة خيرٌ من الهشّة، لكن <em>لا واحدة</em> منهما تبلغ قيمةً بالوحدة الخاطئة، لأن «الوحدة الخاطئة» ليست مسافة. والذي يجدها <code>LIMITS[\"monthly_rent\"] = (50, 2000)</code>، أو نسبةُ <code>deposit / monthly_rent</code>، وكلاهما معرفةٌ ميدانية لا إحصاء."
        }
      },

      /* ---------------------------------------------------------- 12 */
      {
        id: "t2l4q12", type: "error", level: "medium",
        topics: ["t2-outlier-rule-ladder", "t2-domain-limit"],
        q: {
          en: "The step should keep two findings apart: an <em>impossible</em> value and an <em>extreme</em> one. It prints <code>{'step': 'review monthly_rent', 'impossible': 2, 'extreme': 7}</code> where the reviewed version prints <code>'extreme': 6</code>, and listing 5062 comes out carrying <strong>both</strong> flags. Nothing raises. Click the offending line.",
          ar: "ينبغي للخطوة أن تُبقي نتيجتين منفصلتين: قيمةٌ <em>مستحيلة</em> وقيمةٌ <em>متطرفة</em>. وهي تطبع <code>{'step': 'review monthly_rent', 'impossible': 2, 'extreme': 7}</code> حيث تطبع النسخةُ المُراجَعة <code>'extreme': 6</code>، ويخرج الإعلانُ 5062 حاملًا <strong>العلمَين</strong>. ولا شيء يرفع خطأً. انقر السطر المخطئ."
        },
        code: code(
          "def review(frame, column, k=3.5, limits=LIMITS):",
          "    s = frame[column]",
          "    low, high = limits[column]",
          "    impossible = s.notna() & ~s.between(low, high)",
          "    ok = s",
          "    med = ok.median()",
          "    mad = (ok - med).abs().median()",
          "    extreme = ((0.6745 * (ok - med) / mad).abs() > k).fillna(False)",
          "    out = frame.assign(**{column + \"_impossible\": impossible,",
          "                          column + \"_extreme\": extreme})",
          "    return out, {\"step\": \"review \" + column, \"impossible\": int(impossible.sum()),",
          "                 \"extreme\": int(extreme.sum())}",
          "",
          "",
          "out, row = review(clean, \"monthly_rent\")      # LIMITS[\"monthly_rent\"] = (50, 2000)",
          "print(row)",
          "print(out.loc[out[\"listing_id\"] == 5062,",
          "              [\"monthly_rent\", \"monthly_rent_impossible\", \"monthly_rent_extreme\"]].to_string(index=False))"
        ),
        answer: 5,
        solution: {
          code: code(
            "    impossible = s.notna() & ~s.between(low, high)",
            "    ok = s.mask(impossible)          # an impossible value may not set the scale",
            "    med = ok.median()",
            "    mad = (ok - med).abs().median()"
          ),
          out: "{'step': 'review monthly_rent', 'impossible': 2, 'extreme': 6}\n monthly_rent  monthly_rent_impossible  monthly_rent_extreme\n      99999.0                     True                 False",
          en: "One <code>mask</code>. The domain rule runs <em>before</em> the statistic and its result is masked out of the median and the MAD, so an impossible value can never set the scale by which possible values are judged &mdash; and <code>extreme</code> becomes <code>False</code> for the row <code>impossible</code> already owns.",
          ar: "‏<code>mask</code> واحدة. فالقاعدةُ الميدانية تعمل <em>قبل</em> الإحصاء وتُحجَب نتيجتها عن الوسيط والانحراف المطلق، فلا تستطيع قيمةٌ مستحيلة أن تحدّد المقياسَ الذي تُحكَم به القيمُ الممكنة &mdash; وتصير <code>extreme</code> مساويةً <code>False</code> للصفّ الذي تملكه <code>impossible</code> سلفًا."
        },
        hint: {
          en: "The counts are both right for what the code did: there really are two impossible rents and the robust z really is above 3.5 on seven rows. So ask which <em>rows</em> the median and the MAD on the two lines below were allowed to see.",
          ar: "العدّان صحيحان لما فعله الكود: فهناك إيجاران مستحيلان فعلًا، وz الحصينة أعلى من 3.5 على سبعة صفوف فعلًا. فاسأل أيَّ <em>الصفوف</em> أُذن للوسيط والانحراف المطلق في السطرين أدناه أن يرياها."
        },
        explain: {
          en: "Line 5 hands the whole column to the statistic, impossible values included, so the 99999 is measured against a scale it was allowed to help build and then flagged by it: <code>extreme</code> is <code>True</code> on 5062 as well as <code>impossible</code>, and the two findings that Version&nbsp;5 exists to separate are stuck together again. On this column the damage is small and that is exactly what makes it dangerous &mdash; the MAD is 50.0 either way, because moving one of 461 distances cannot move their median, so the counts look almost right and nothing warns you. Change the typo to 999999 and the log is unchanged, which is how a reviewer discovers the bug months later. Line 8 is the tempting click, because it is the line that produces the wrong count; but the arithmetic there is the lesson's own recommended rule, and with <code>ok</code> masked properly it gives 6. The fix is one method call, and the rule it encodes is worth more than the line: <strong>run the domain rule first and keep its rows out of the scale</strong>, so that &ldquo;impossible&rdquo; and &ldquo;extreme&rdquo; stay two separately counted columns. Note what the repaired version does <em>not</em> change: listing 5208's rent of 25 is <code>impossible</code> and not <code>extreme</code> in both versions, since its robust z is only &minus;2.36.",
          ar: "يسلّم السطرُ 5 العمودَ كلَّه إلى الإحصاء، والقيمُ المستحيلة فيه، فتُقاس 99999 بمقياسٍ أُذن لها أن تشارك في بنائه ثم يعلّمها: فتكون <code>extreme</code> مساويةً <code>True</code> في 5062 كما <code>impossible</code>، وتلتصق مرةً أخرى النتيجتان اللتان وُجدت النسخة 5 لتفصلهما. والضررُ في هذا العمود صغير، وهذا بعينه ما يجعله خطيرًا &mdash; فالانحرافُ المطلق 50.0 في الحالتين، لأن تحريك مسافةٍ من 461 مسافة لا يستطيع تحريك وسيطها، فتبدو الأعدادُ شبه صحيحة ولا شيء يحذّرك. وغيّر خطأَ الإدخال إلى 999999 فيبقى السجلُّ كما هو، وهكذا يكتشف مراجعٌ العطبَ بعد أشهر. والسطرُ 8 هو النقرةُ المغرية، لأنه السطر الذي ينتج العدَّ الخاطئ؛ لكن الحساب فيه هو قاعدةُ الدرس الموصى بها، وبـ<code>ok</code> محجوبةً كما ينبغي يعطي 6. والعلاجُ نداءُ تابعٍ واحد، والقاعدةُ التي يُضمرها أنفعُ من السطر: <strong>شغّل القاعدةَ الميدانية أولًا وأبقِ صفوفها خارج المقياس</strong>، لتبقى «المستحيلة» و«المتطرفة» عمودَين معدودَين كلٌّ على حدة. ولاحظ ما لا تغيّره النسخةُ المُصلَحة: فإيجارُ الإعلان 5208 البالغ 25 <code>impossible</code> وليس <code>extreme</code> في النسختين، إذ إن z الحصينة له &minus;2.36 فقط."
        }
      },

      /* ---------------------------------------------------------- 13 */
      {
        id: "t2l4q13", type: "error", level: "hard",
        topics: ["t2-train-only-removal", "t2-actions-measured"],
        q: {
          en: "The step should flag every row against the stored fence and delete only the flagged <strong>training</strong> rows, so that the held-out error stays comparable with the chapter's 60.17 on 120 rents. Instead it prints <code>rows_out 490, flagged 13, dropped 13</code> and then <code>MAE train 55.74 | held out 55.47 on 117 rents</code>. Nothing raises, and the log is honest about what the function did. Click the offending line.",
          ar: "ينبغي للخطوة أن تعلّم كل صف في مقابل السياج المحفوظ وتحذف صفوف <strong>التدريب</strong> المعلَّمة وحدها، ليبقى الخطأُ على المحجوزة قابلًا للمقارنة بـ60.17 الفصل على 120 إيجارًا. لكنها تطبع <code>rows_out 490, flagged 13, dropped 13</code> ثم <code>MAE train 55.74 | held out 55.47 on 117 rents</code>. ولا شيء يرفع خطأً، والسجلُّ أمينٌ في وصف ما فعلته الدالة. انقر السطر المخطئ."
        },
        code: code(
          "def handle_outliers(frame, fitted, training_index):",
          "    f = fitted[\"rent_fence\"]                    # [17.5, 397.5], fitted on 363 training rents",
          "    s = frame[\"monthly_rent\"]",
          "    extreme = ((s < f[\"low\"]) | (s > f[\"high\"])).fillna(False)",
          "    out = frame.assign(rent_extreme=extreme)",
          "    out = out[~out[\"rent_extreme\"]]",
          "    return out, {\"step\": \"outliers monthly_rent\", \"rows_in\": len(frame), \"rows_out\": len(out),",
          "                 \"flagged\": int(extreme.sum()), \"dropped\": int(extreme.sum())}",
          "",
          "",
          "work, row = handle_outliers(base, fitted, train.index)",
          "print(pd.DataFrame([row]).to_string(index=False))",
          "",
          "t = work.loc[work.index.intersection(train.index)]",
          "h = work.loc[work.index.intersection(test.index)]",
          "m = t[\"monthly_rent\"].median()",
          "print(\"MAE train %.2f | held out %.2f on %d rents\"",
          "      % (mae(t[\"monthly_rent\"], m), mae(h[\"monthly_rent\"], m), h[\"monthly_rent\"].count()))"
        ),
        answer: 6,
        solution: {
          code: code(
            "    out = frame.assign(rent_extreme=extreme)",
            "    drop = extreme & out.index.isin(training_index)      # training rows only",
            "    out = out[~drop]",
            "    return out, {\"step\": \"outliers monthly_rent\", \"rows_in\": len(frame), \"rows_out\": len(out),",
            "                 \"flagged\": int(extreme.sum()), \"dropped\": int(drop.sum())}"
          ),
          out: "                 step  rows_in  rows_out  flagged  dropped\noutliers monthly_rent      503       493       13       10\nMAE train 55.74 | held out 60.00 on 120 rents",
          en: "One mask combined with <code>index.isin(training_index)</code>, and <code>dropped</code> counted from it rather than from <code>extreme</code>. Ten rows leave, the three flagged held-out flats stay and keep <code>rent_extreme=True</code>, and the error is measured on all 120 rents again.",
          ar: "قناعٌ واحد مضروبٌ في <code>index.isin(training_index)</code>، و<code>dropped</code> معدودٌ منه لا من <code>extreme</code>. فتخرج عشرةُ صفوف، وتبقى الشققُ المحجوزة المعلَّمة الثلاث حاملةً <code>rent_extreme=True</code>، ويُقاس الخطأ على الإيجارات الـ120 كلها مرةً أخرى."
        },
        hint: {
          en: "Every number in the log is true: thirteen rows were flagged and thirteen were dropped. So count the rents the held-out error was measured on, compare it with 120, and then find the line that decided which rows leave the frame. One of the function's three parameters is never used.",
          ar: "كل رقم في السجل صحيح: فثلاثةَ عشر صفًّا عُلّمت وثلاثةَ عشر حُذفت. فعُدّ الإيجارات التي قيس عليها الخطأ على المحجوزة، وقارنها بـ120، ثم جِد السطرَ الذي حسم أيَّ الصفوف تخرج من الجدول. وواحدٌ من وسائط الدالة الثلاثة لا يُستعمل قط."
        },
        explain: {
          en: "Line 6 drops every flagged row, wherever it came from, and three of the thirteen were held out &mdash; the flats asking 400, 420 and 475 shekels. So the reported 55.47 was measured on 117 rents while every other number in the chapter is measured on 120, and the comparison is meaningless: 55.47 and 60.17 are answers to different questions. Apply the same removal to the training rows only and the honest figure is <strong>60.00</strong>, so about ninety-six per cent of the apparent improvement was the exam getting shorter, and the real gain from deleting eleven homes is seventeen agorot &mdash; well inside the 1.5-shekel noise level of this split. The <code>dropped</code> count on line 8 is the tempting click, because <code>int(extreme.sum())</code> is obviously not a count of deletions in the corrected version; given line 6, though, it is telling the truth, and a log that truthfully reports a harmful action is doing its job. The clue is the unused <code>training_index</code>, and the structural defence is the rule to carry away: <strong>the held-out rows pass through repairs and stored thresholds only, never through a filter.</strong> Write it as <code>assert len(test) == N_TEST</code> and the first failure becomes a crash instead of a quarterly report.",
          ar: "يحذف السطرُ 6 كلَّ صفٍّ معلَّم من أي موضع جاء، وثلاثةٌ من الثلاثة عشر كانت محجوزة &mdash; وهي الشققُ التي تطلب 400 و420 و475 شيكلًا. فيكون 55.47 المُبلَّغ عنه مقيسًا على 117 إيجارًا في حين أن كل رقم آخر في الفصل مقيسٌ على 120، وتكون المقارنةُ بلا معنى: فـ55.47 و60.17 جوابان لسؤالين مختلفين. وطبّق الإزالةَ نفسها على صفوف التدريب وحدها فيكون الرقمُ الأمين <strong>60.00</strong>، أي أن نحو ستة وتسعين بالمئة من التحسّن الظاهر كان قِصَرَ الامتحان، وأن الكسبَ الحقيقي من حذف أحد عشر بيتًا سبعةَ عشر أغورة &mdash; وهي داخل مستوى الضجيج البالغ شيكلًا ونصفًا لهذا التقسيم. وعدُّ <code>dropped</code> في السطر 8 هو النقرةُ المغرية، لأن <code>int(extreme.sum())</code> ليس عدَّ محذوفات في النسخة المُصلَحة بَيِّنًا؛ لكنه بوجود السطر 6 يقول الحقّ، والسجلُّ الذي يُبلّغ بصدقٍ عن عملٍ ضارّ يؤدّي عمله. والقرينةُ هي <code>training_index</code> غير المستعمل، والدفاعُ البنيوي هو القاعدةُ التي تحملها: <strong>الصفوفُ المحجوزة تمرّ بالإصلاحات والحدودِ المحفوظة وحدها، ولا تمرّ بمرشّح قط.</strong> اكتبها <code>assert len(test) == N_TEST</code> فيصير أولُ إخفاق انهيارًا بدل أن يكون تقريرًا ربعيًّا."
        }
      },

      /* ---------------------------------------------------------- 14 */
      {
        id: "t2l4q14", type: "output", level: "medium",
        topics: ["t2-fence-is-fitted"],
        q: {
          en: "The fence is a fitted parameter, so it is fitted on the training rents only. The split is <code>random_state=3</code> on the 503-row file, which puts 363 of the 483 rents in the training set and 120 in the held-out set; the training quarter happens to hold slightly fewer cheap rents, so its Q1 is 160.00 against 152.50 on the whole column, and Q3 is 255.00 either way. Write exactly what the program prints.",
          ar: "السياجُ وسيطٌ مضبوط، فيُضبط على إيجارات التدريب وحدها. والتقسيمُ <code>random_state=3</code> على الملف ذي الـ503 صفوف، ويضع 363 من الإيجارات الـ483 في مجموعة التدريب و120 في المحجوزة؛ ويحتوي رُبعُ التدريب إيجاراتٍ رخيصة أقلَّ قليلًا، فيكون Q1 فيه 160.00 مقابل 152.50 على العمود كله، وQ3 ‏255.00 في الحالتين. اكتب بالضبط ما يطبعه البرنامج."
        },
        code: code(
          "g = fences(base.loc[train.index, \"monthly_rent\"])        # TRAINING rents only",
          "flag = ((base[\"monthly_rent\"] < g[\"low\"]) | (base[\"monthly_rent\"] > g[\"high\"])).fillna(False)",
          "",
          "print(\"%.1f %.1f\" % (g[\"low\"], g[\"high\"]))",
          "print(int(flag.sum()))",
          "print(int((flag & base.index.isin(train.index)).sum()))",
          "print(int((flag & base.index.isin(test.index)).sum()))"
        ),
        blanks: [
          { accept: ["17.5 397.5\n13\n10\n3"], lines: 4 }
        ],
        hint: {
          en: "Build the two fences from the two quartiles you were given, then remember that the fence fitted on the training rows is <em>applied</em> to every row. The last two lines must add up to the one above them.",
          ar: "ابنِ السياجَين من الربيعَين المعطيَين، ثم تذكّر أن السياجَ المضبوط على صفوف التدريب <em>يُطبَّق</em> على كل صف. وعلى السطرين الأخيرين أن يجمعا إلى السطر فوقهما."
        },
        explain: {
          en: "<code>IQR = 255.00 &minus; 160.00 = 95.00</code>, so the fences are <code>160 &minus; 142.5 = 17.5</code> and <code>255 + 142.5 = 397.5</code>. Note the direction: fitting on fewer cheap rents <em>raises</em> Q1, which narrows the IQR and pulls the upper fence <em>down</em> by nine shekels &mdash; so the honest fence flags <em>more</em> rows than the leaky one, thirteen instead of eleven. Two extra flats are flagged because of which rows happened to land in the training set, which is the clearest possible demonstration that a fence is a fitted parameter and not a fact about the data. The tempting answer for the last two lines is 13 and 0, on the reasoning that a parameter fitted on the training rows describes the training rows; but a stored threshold is <em>applied</em> everywhere, because applying it changes no value and so cannot leak. Remember those three held-out flats: they are the whole of <a href=\"#t2l4-h6\">Concept&nbsp;6</a>'s final argument.",
          ar: "‏<code>IQR = 255.00 &minus; 160.00 = 95.00</code>، فيكون السياجان <code>160 &minus; 142.5 = 17.5</code> و<code>255 + 142.5 = 397.5</code>. ولاحظ الاتجاه: فالضبطُ على إيجاراتٍ رخيصة أقلّ <em>يرفع</em> Q1، فيضيّق المدى الربيعي ويجرّ السياجَ الأعلى تسعةَ شواكل إلى <em>الأسفل</em> &mdash; فيعلّم السياجُ الأمين صفوفًا <em>أكثر</em> من المتسرّب، ثلاثةَ عشر بدل أحدَ عشر. وتُعلَّم شقتان أخريان بسبب أي الصفوف هبطت في مجموعة التدريب، وهذا أوضحُ بيانٍ ممكن أن السياجَ وسيطٌ مضبوط لا واقعةٌ عن البيانات. والجوابُ المغري للسطرين الأخيرين 13 و0، بحجّة أن الوسيطَ المضبوط على صفوف التدريب يصف صفوفَ التدريب؛ لكن الحدَّ المحفوظ <em>يُطبَّق</em> في كل مكان، لأن تطبيقَه لا يغيّر قيمةً فلا يستطيع أن يسرّب. وتذكّر تلك الشققَ المحجوزة الثلاث: فهي حجّةُ <a href=\"#t2l4-h6\">المفهوم 6</a> الختامية كلها."
        }
      },

      /* ---------------------------------------------------------- 15 */
      {
        id: "t2l4q15", type: "multi", level: "medium",
        topics: ["t2-train-only-removal", "t2-action-cap", "t2-action-transform"],
        q: {
          en: "Which of these may be applied to the <strong>held-out</strong> rows as well as the training rows? Choose all that apply. <code>monthly_rent</code> is the target the baseline predicts, and the stored fence is <code>[17.5, 397.5]</code>, fitted on the 363 training rents.",
          ar: "أيُّ هذه يجوز تطبيقه على الصفوف <strong>المحجوزة</strong> كما على صفوف التدريب؟ اختر كل ما ينطبق. و<code>monthly_rent</code> هو الهدفُ الذي يتنبأ به الخطُّ القاعدي، والسياجُ المحفوظ <code>[17.5, 397.5]</code> مضبوطٌ على إيجارات التدريب الـ363."
        },
        options: [
          {
            en: "Voiding listing 5062's rent of 99999 to <code>NaN</code>, because <code>LIMITS[\"monthly_rent\"] = (50, 2000)</code> says no flat in this market asks it.",
            ar: "إفراغُ إيجار الإعلان 5062 البالغ 99999 إلى <code>NaN</code>، لأن <code>LIMITS[\"monthly_rent\"] = (50, 2000)</code> يقول إن لا شقة في هذه السوق تطلبه."
          },
          {
            en: "Multiplying listing 5015's <code>area_m2</code> of 0.0379 by 1000, because the area was entered in dunum.",
            ar: "ضربُ <code>area_m2</code> للإعلان 5015 البالغ 0.0379 في 1000، لأن المساحة أُدخلت بالدونم."
          },
          {
            en: "Deleting the three held-out flats asking 400, 420 and 475 shekels, because the stored fence flags them as extreme.",
            ar: "حذفُ الشقق المحجوزة الثلاث التي تطلب 400 و420 و475 شيكلًا، لأن السياجَ المحفوظ يعلّمها متطرفة."
          },
          {
            en: "Running <code>np.log1p</code> over the whole rent column.",
            ar: "تشغيلُ <code>np.log1p</code> على عمود الإيجار كله."
          },
          {
            en: "Clipping the rents at the stored fence, so that no value in the column is above 397.5.",
            ar: "قصُّ الإيجارات عند السياج المحفوظ، فلا تكون قيمةٌ في العمود فوق 397.5."
          },
          {
            en: "Writing <code>rent_extreme = True</code> on a held-out row whose rent is above the stored fence of 397.5.",
            ar: "كتابةُ <code>rent_extreme = True</code> في صفٍّ محجوز إيجارُه فوق السياج المحفوظ البالغ 397.5."
          }
        ],
        answer: [0, 1, 3, 5],
        hint: {
          en: "Two questions decide each one, in order. Does it learn anything from the data? And does it change a <em>value</em>, or only add a column? One of the six changes values and still passes; one of them adds no column and still fails.",
          ar: "سؤالان يحسمان كلًّا منها، بالترتيب. هل يتعلّم شيئًا من البيانات؟ وهل يغيّر <em>قيمة</em> أم يضيف عمودًا فقط؟ فواحدٌ من الستة يغيّر قيمًا ومع ذلك يجوز؛ وواحدٌ منها لا يضيف عمودًا ومع ذلك لا يجوز."
        },
        explain: {
          en: "The test is one question: <em>am I correcting a recording error, or choosing which population to model?</em> A recording error is wrong in June as surely as in March, so a <code>LIMITS</code> void and a dunum conversion run everywhere &mdash; neither estimates a parameter, so there is nothing to leak, and that entitlement is why <a href=\"#t2l1-s26\">Lesson&nbsp;1</a> could void the 99999 in the held-out quarter and still report 60.17 honestly. <code>log1p</code> changes every value and is still safe, which is the answer most people get wrong: it fits nothing, so a row's transformed value depends on that row alone and on no other row in the file. Flagging a held-out row against a stored threshold is safe for the opposite reason &mdash; it changes no value at all, which is why flagging is the one action that is <em>always</em> available. The two that fail both move the goalposts. Deleting held-out rows changes the ruler: 55.47 on 117 rents instead of 60.00 on 120. And clipping is the subtler of the two, because capping a <em>feature</em> is an ordinary fitted transformation &mdash; here <code>monthly_rent</code> is the target, so clipping it writes thirteen false rents into the answer key, and listing 5019, which asks 580, would be recorded as asking 397.5.",
          ar: "الاختبارُ سؤالٌ واحد: <em>هل أصحّح خطأ تسجيل أم أختار المجتمع الذي أنمذجه؟</em> فخطأُ التسجيل خاطئ في حزيران كما هو خاطئ في آذار بيقين، فيعمل إفراغُ <code>LIMITS</code> وتحويلُ الدونم في كل مكان &mdash; فلا واحدٌ منهما يقدّر وسيطًا، فلا شيء يتسرّب، وذلك الحقُّ هو سببُ قدرة <a href=\"#t2l1-s26\">الدرس 1</a> على إفراغ 99999 في الرُبع المحجوز وإبلاغه 60.17 إبلاغًا أمينًا. و<code>log1p</code> تغيّر كل قيمة وهي آمنة مع ذلك، وهذا هو الجوابُ الذي يُخطئ فيه معظم الناس: فهي لا تضبط شيئًا، فتعتمد القيمةُ المحوَّلة لصفٍّ على ذلك الصف وحده ولا على أي صفٍّ آخر في الملف. وتعليمُ صفٍّ محجوز في مقابل حدٍّ محفوظ آمنٌ للسبب المعاكس &mdash; فهو لا يغيّر قيمةً أصلًا، ولهذا كان التعليمُ العملَ الوحيد المتاح <em>دائمًا</em>. والاثنان اللذان لا يجوزان ينقلان القائمَين. فحذفُ الصفوف المحجوزة يغيّر المسطرة: ‏55.47 على 117 إيجارًا بدل 60.00 على 120. والقصُّ ألطفهما، لأن قصَّ <em>خاصيةٍ</em> تحويلٌ مضبوط عادي &mdash; و<code>monthly_rent</code> هنا هو الهدف، فقصُّه يكتب ثلاثةَ عشر إيجارًا كاذبًا في ورقة الجواب، ويُسجَّل الإعلانُ 5019، الذي يطلب 580، أنه يطلب 397.5."
        }
      },

      /* ---------------------------------------------------------- 16 */
      {
        id: "t2l4q16", type: "trace", level: "hard",
        topics: ["t2-robust-z", "t2-mad-constant"],
        q: {
          en: "The robust rule, on the <strong>raw</strong> 484-rent column with the phone number still in it. The median of that column is 200.0, and the rents are 25 at the bottom and 99999 at the top. After the last line has run, what are the values of the four variables?",
          ar: "القاعدةُ الحصينة، على عمود الإيجارات <strong>الخام</strong> ذي الـ484 قيمة ورقمُ الهاتف فيه. ووسيطُ ذلك العمود 200.0، والإيجارات 25 في الأسفل و99999 في الأعلى. فبعد تنفيذ السطر الأخير، ما قيم المتغيرات الأربعة؟"
        },
        code: code(
          "r   = raw[\"monthly_rent\"]",
          "med = r.median()                                  # 200.0",
          "mad = (r - med).abs().median()",
          "rz  = 0.6745 * (r - med) / mad",
          "",
          "sd  = round(mad / 0.6745, 2)                      # the standard deviation the MAD implies",
          "n   = int((rz.abs() > 3.5).sum())",
          "low = round(rz[r == 25].iloc[0], 2)"
        ),
        blanks: [
          { accept: ["50.0", "50"], label: { en: "mad", ar: "mad" } },
          { accept: ["74.13"], label: { en: "sd", ar: "sd" } },
          { accept: ["7"], label: { en: "n", ar: "n" } },
          { accept: ["-2.36"], label: { en: "low", ar: "low" } }
        ],
        hint: {
          en: "Work out <code>mad</code> from what a median of absolute distances is: half the rents are within that distance of 200.0, and the quartiles of this column are 153.75 and 255.00. Everything else follows from that one number, and <code>low</code> needs no data beyond it.",
          ar: "استخرج <code>mad</code> من معنى وسيطِ المسافات المطلقة: فنصفُ الإيجارات داخل تلك المسافة من 200.0، وربيعا هذا العمود 153.75 و255.00. وكلُّ ما بقي يتبع ذلك الرقمَ الواحد، و<code>low</code> لا يحتاج بيانات غيره."
          },
        explain: {
          en: "The MAD is 50.0 &mdash; and it is 50.0 after the 99999 is voided too, because moving one of 484 distances cannot move their median. That single fact is the whole argument of the concept: the robust rule needs no stage-2 repair to work, where the ordinary z-score needs one desperately. The implied standard deviation is <code>50 / 0.6745 = 74.13</code>, against the raw column's <code>std</code> of 4536.59 and the repaired column's 81.46, so the robust rule's ruler is about the size of the market while the ordinary one's is sixty times too long. The threshold catches seven rows: the six genuine Gaza City flats from 465 to 580, plus the typo at 1346.3 &mdash; a score no plausible threshold could miss, where the ordinary z gave it 21.95. And <code>low</code> is the line to carry away. The daily rate of 25 scores <strong>&minus;2.36</strong>, comfortably inside any threshold anybody uses; a perfectly ordinary 100-shekel studio scores &minus;1.35, so the most obviously broken number in the column is barely one robust deviation further out than an honest cheap flat. Lowering the threshold below 2.36 to catch it would flag 24 rows &mdash; one rent in twenty. The value is not extreme; it is in the wrong unit, and &ldquo;wrong unit&rdquo; is not a distance.",
          ar: "الانحرافُ المطلق 50.0 &mdash; وهو 50.0 بعد إفراغ 99999 أيضًا، لأن تحريك مسافةٍ من 484 مسافة لا يستطيع تحريك وسيطها. وتلك الواقعةُ الواحدة هي حجّةُ المفهوم كلها: فالقاعدةُ الحصينة لا تحتاج إصلاحَ المرحلة 2 لتعمل، حيث تحتاجه الدرجةُ المعيارية العادية حاجةً شديدة. والانحرافُ المعياري الضمني <code>50 / 0.6745 = 74.13</code>، مقابل <code>std</code> العمود الخام البالغ 4536.59 والعمود المُصلَح 81.46، فتكون مسطرةُ القاعدة الحصينة بحجم السوق تقريبًا ومسطرةُ العادية أطولَ ستين ضعفًا. ويلقط الحدُّ سبعة صفوف: الشققَ الست الحقيقية في مدينة غزة من 465 إلى 580، مع خطأِ الإدخال عند 1346.3 &mdash; وهي درجةٌ لا يفوتها حدٌّ معقول، حيث أعطتها z العادية 21.95. و<code>low</code> هو السطرُ الذي تحمله معك. فأجرةُ اليوم البالغة 25 تحصل على <strong>&minus;2.36</strong>، أي داخل أي حدٍّ يستعمله أحد براحة؛ ويحصل استوديو عاديّ تمامًا بمئة شيكل على &minus;1.35، فيكون أظهرُ رقمٍ عطبًا في العمود أبعدَ بانحرافٍ حصين واحد بالكاد من شقةٍ رخيصة أمينة. وإهباطُ الحدّ تحت 2.36 لتلقطها يعلّم 24 صفًّا &mdash; أي إيجارًا من كل عشرين. فالقيمةُ غير متطرفة؛ بل هي بالوحدة الخاطئة، و«الوحدة الخاطئة» ليست مسافة."
        }
      },

      /* ---------------------------------------------------------- 17 */
      {
        id: "t2l4q17", type: "mcq", level: "medium",
        topics: ["t2-expm1-trap"],
        q: {
          en: "The mean rent per governorate, built two ways on the 503-row frame with the typo voided. <code>mean_rent</code> is the plain mean in shekels; <code>from_logs</code> is <code>np.expm1</code> of the mean of <code>np.log1p(monthly_rent)</code> within each group. Which statement about this table is correct?",
          ar: "متوسطُ الإيجار لكل محافظة، مبنيًّا بطريقتين على الجدول ذي الـ503 صفوف وخطأُ الإدخال مُفرَغ. فـ<code>mean_rent</code> المتوسطُ العادي بالشواكل؛ و<code>from_logs</code> هي <code>np.expm1</code> لمتوسط <code>np.log1p(monthly_rent)</code> داخل كل مجموعة. فأيُّ العبارات عن هذا الجدول صحيحة؟"
        },
        code: code(
          "               rents  mean_rent  from_logs",
          "Deir al-Balah     64     175.08     164.83",
          "Gaza             156     261.76     247.35",
          "Khan Younis      124     194.15     182.62",
          "North Gaza        54     182.50     176.12",
          "Rafah             85     182.71     168.64"
        ),
        lang: "text",
        options: [
          {
            en: "Every <code>from_logs</code> figure is below its <code>mean_rent</code>, and it will be on every right-skewed column: <code>expm1</code> inverts <code>log1p</code> on <em>values</em>, not on an average. Back-transform each value first, then average.",
            ar: "كلُّ رقمٍ في <code>from_logs</code> أدنى من <code>mean_rent</code> الذي بجانبه، وسيكون كذلك في كل عمود ملتوٍ إلى اليمين: فـ<code>expm1</code> تعكس <code>log1p</code> على <em>القيم</em> لا على متوسط. فأعِد تحويل كل قيمة أولًا ثم خُذ المتوسط."
          },
          {
            en: "<code>from_logs</code> is the median rent of each governorate, because <code>expm1</code> of a mean of logs is the geometric mean and the geometric mean of a column is its median.",
            ar: "‏<code>from_logs</code> هو وسيطُ إيجار كل محافظة، لأن <code>expm1</code> لمتوسط اللوغاريتمات هي المتوسطُ الهندسي والمتوسطُ الهندسي لعمودٍ هو وسيطه."
          },
          {
            en: "The gap is a small-sample effect: it is largest where the governorate has the fewest listings, so it shrinks as more rows arrive and will be negligible on a full year of data.",
            ar: "الفجوةُ أثرُ عيّنةٍ صغيرة: فهي أكبر حيث تكون إعلاناتُ المحافظة أقلّ، فتتقلّص كلما وصلت صفوفٌ أكثر وتكون مهملةً على سنةٍ كاملة من البيانات."
          },
          {
            en: "Four of the five are low and one is high, which is the rounding you expect from a transform that is only approximately invertible in floating point.",
            ar: "أربعةٌ من الخمسة أدنى وواحدٌ أعلى، وهذا هو التدويرُ الذي تتوقعه من تحويلٍ ليس قابلًا للعكس إلا تقريبًا في الفاصلة العائمة."
          }
        ],
        answer: 0,
        hint: {
          en: "Subtract each pair and look at the five gaps as a set: 10.25, 14.41, 11.53, 6.38, 14.07. Line them up against the <code>rents</code> column, and then against which governorate has the widest spread of rents.",
          ar: "اطرح كل زوج وانظر في الفجوات الخمس مجموعةً: ‏10.25 و14.41 و11.53 و6.38 و14.07. وصُفَّها في مقابل عمود <code>rents</code>، ثم في مقابل أي المحافظات أوسعُ تشتُّتِ إيجارات."
        },
        explain: {
          en: "All five are under-reported, by 6 to 14 shekels, and the direction is not an accident: averaging depends on the distances between values and the log changed those on purpose, so <code>expm1(mean of logs)</code> is systematically below the mean on any right-skewed column &mdash; 195.16 against 210.14 on the whole column, 7.13% low. The fix is one reordering: <code>np.expm1(lg).mean()</code> gives 210.1449 exactly, because that is just averaging the original rents. The small-sample answer is the tempting one, and the table refutes it in the clearest possible way: North Gaza has the <em>fewest</em> listings, 54, and the <em>smallest</em> gap, 6.38, while Gaza with 156 listings has the largest. The gap tracks the spread of each market (standard deviations 46.55 for North Gaza against 90.10 for Gaza), and it does not shrink with <em>n</em> at all. The geometric-mean answer is the sophisticated wrong one: <code>expm1</code> of a mean of <code>log1p</code> is very nearly the geometric mean, exactly so for <code>log</code>, and the geometric mean is <em>not</em> the median &mdash; on this column it is 195.16 where the median is 200.00, and the median is the one summary that round-trips exactly, because a logarithm cannot change which value sits in the middle of a sorted column. And rounding is not the explanation: the round trip on the values themselves is lossless to machine precision. A table like this is what ends up in a slide, and nobody checks it, because all five numbers are plausible and their <em>ordering</em> is correct.",
          ar: "الخمسةُ كلها مُبلَّغٌ عنها بأقلّ من حقّها، بستة إلى أربعة عشر شيكلًا، والاتجاهُ ليس مصادفة: فأخذُ المتوسط يعتمد على المسافات بين القيم واللوغاريتم غيّرها متعمِّدًا، فتكون <code>expm1(mean of logs)</code> أدنى من المتوسط بانتظام في أي عمود ملتوٍ إلى اليمين &mdash; ‏195.16 مقابل 210.14 على العمود كله، أي أدنى بـ7.13%. والعلاجُ إعادةُ ترتيبٍ واحدة: فـ<code>np.expm1(lg).mean()</code> تعطي 210.1449 بالضبط، لأن ذلك ليس إلا أخذَ متوسط الإيجارات الأصلية. وجوابُ العيّنة الصغيرة هو المغري، والجدولُ ينقضه بأوضح صورة ممكنة: فشمال غزة <em>أقلُّ</em> المحافظات إعلانات، ‏54، و<em>أصغرُها</em> فجوةً، ‏6.38، في حين أن غزة بـ156 إعلانًا أكبرُها. والفجوةُ تتبع تشتُّتَ كل سوق (الانحرافان المعياريان 46.55 لشمال غزة مقابل 90.10 لغزة)، ولا تتقلّص مع <em>n</em> أصلًا. وجوابُ المتوسط الهندسي هو الخاطئُ المتأنّق: فـ<code>expm1</code> لمتوسط <code>log1p</code> تكاد تكون المتوسطَ الهندسي، وهي كذلك بالضبط لـ<code>log</code>، والمتوسطُ الهندسي <em>ليس</em> الوسيط &mdash; فهو في هذا العمود 195.16 والوسيطُ 200.00، والوسيطُ هو التلخيصُ الوحيد الذي يعود بالضبط، لأن اللوغاريتم لا يستطيع أن يغيّر أيَّ قيمةٍ تقع في وسط عمود مرتَّب. والتدويرُ ليس التفسير: فالرحلةُ على القيم نفسها بلا فقد إلى دقة الآلة. وجدولٌ كهذا هو ما ينتهي إلى شريحة عرض، ولا يفحصه أحد، لأن الأرقام الخمسة كلها معقولة و<em>ترتيبها</em> صحيح."
        }
      },

      /* ---------------------------------------------------------- 18 */
      {
        id: "t2l4q18", type: "complete", level: "hard",
        topics: ["t2-domain-limit", "t2-unit-error"],
        q: {
          en: "The cross-column check that reaches what no rule on the rent column can. In this market a deposit is one, two or three months' rent. Complete the <code>odd</code> line so that the program prints the wanted output: the two exceptions among the 380 recorded pairs, and nothing else.",
          ar: "فحصُ الأعمدة المتقاطعة الذي يبلغ ما لا تبلغه أي قاعدة على عمود الإيجار. في هذه السوق يكون التأمينُ إيجارَ شهر أو شهرين أو ثلاثة. أكمل سطر <code>odd</code> ليطبع البرنامجُ المخرجَ المطلوب: الاستثناءَين في الأزواج الـ380 المسجَّلة، ولا شيء غيرهما."
        },
        code: code(
          "months = raw[\"deposit\"] / raw[\"monthly_rent\"]",
          "print(months.round(4).value_counts(dropna=False).to_string())",
          "",
          "odd = ____",
          "print(raw.loc[odd, [\"listing_id\", \"city\", \"monthly_rent\", \"deposit\"]]",
          "         .assign(months=months[odd].round(4)).to_string(index=False))",
          "",
          "# 1.0000    194",
          "# NaN       123",
          "# 2.0000    119",
          "# 3.0000     65",
          "# 5.4000      1",
          "# 0.0015      1",
          "#",
          "#  listing_id    city  monthly_rent  deposit  months",
          "#        5208   Rafah          25.0    135.0  5.4000",
          "#        5062 JABALIA       99999.0    150.0  0.0015"
        ),
        options: [
          { code: "months.notna() & ~months.round(6).isin([1.0, 2.0, 3.0])" },
          { code: "~months.round(6).isin([1.0, 2.0, 3.0])" },
          { code: "months.notna() & (months.round(6) > 3.0)" },
          { code: "months.round(6).isin([1.0, 2.0, 3.0])" }
        ],
        answer: 0,
        solution: {
          code: "odd = months.notna() & ~months.round(6).isin([1.0, 2.0, 3.0])",
          out: " listing_id    city  monthly_rent  deposit  months\n       5208   Rafah          25.0    135.0  5.4000\n       5062 JABALIA       99999.0    150.0  0.0015",
          en: "A violation needs two things: a ratio that <em>exists</em>, and a ratio that is not one of the three allowed values. Leave out <code>notna()</code> and the 123 rows with no deposit at all are reported as violations; make the test one-sided and the 99999's ratio of 0.0015 walks straight through.",
          ar: "الخرقُ يحتاج أمرين: نسبةً <em>موجودة</em>، ونسبةً ليست واحدةً من القيم الثلاث المسموحة. فأسقِط <code>notna()</code> فتُبلَّغ الصفوفُ الـ123 التي لا تأمين لها أصلًا خروقًا؛ واجعل الفحصَ أحاديَّ الجانب فتعبر نسبةُ 99999 البالغة 0.0015 مباشرةً."
        },
        hint: {
          en: "Read the <code>NaN 123</code> line of the first output before you choose, and then ask what each candidate says about a row that has no deposit. Then check both exceptions against each candidate: one of them is on the wrong side of 1.",
          ar: "اقرأ سطر <code>NaN 123</code> في المخرج الأول قبل أن تختار، ثم اسأل ماذا يقول كل مرشَّح عن صفٍّ لا تأمين له. ثم افحص الاستثناءَين في مقابل كل مرشَّح: فأحدهما على الجانب الخاطئ من 1."
        },
        explain: {
          en: "Three hundred and seventy-eight of the three hundred and eighty recorded deposits are <em>exactly</em> one, two or three months' rent, and the two exceptions are precisely this chapter's two rent errors and nothing else &mdash; which makes this one line more powerful than every statistic in the lesson, because it finds listing 5208's rent of 25, whose robust z is only &minus;2.36 and which sits comfortably inside the lower fence of 1.875. Dropping <code>notna()</code> reports 125 rows: a missing ratio is not in the allowed set either, so all 123 rows with no deposit are condemned for having nothing to check. The one-sided test is the subtle trap and it is worth more than the others: <code>&gt; 3.0</code> finds the 5.4 and misses the 0.0015, so it catches the daily rate and loses the phone number &mdash; a violation of a ratio can be too small as easily as too large. And inverting the test prints the 378 ordinary rows, which is the output you get when you forget which side of the <code>~</code> you are on. Be careful not to take the wrong lesson from how well this works: nothing in the file says a deposit should be a whole number of months. You knew it, because you know how renting works in Gaza, and then you wrote it as code. A ratio check is domain knowledge wearing an arithmetic disguise.",
          ar: "ثلاثُ مئة وثمانية وسبعون من التأمينات الثلاث مئة والثمانين المسجَّلة تساوي <em>بالضبط</em> إيجارَ شهر أو شهرين أو ثلاثة، والاستثناءان هما بالضبط خطآ الإيجار في هذا الفصل ولا شيء غيرهما &mdash; وهذا ما يجعل هذا السطرَ الواحد أقوى من كل إحصاء في الدرس، لأنه يجد إيجارَ الإعلان 5208 البالغ 25، وz الحصينة له &minus;2.36 فقط وهو يجلس داخل السياج الأدنى البالغ 1.875 براحة. وإسقاطُ <code>notna()</code> يُبلّغ عن 125 صفًّا: فالنسبةُ المفقودة ليست في المجموعة المسموحة أيضًا، فتُدان الصفوفُ الـ123 التي لا تأمين لها لأن لا شيء فيها يُفحص. والفحصُ أحاديُّ الجانب هو الفخُّ اللطيف وهو أنفعُ من غيره: فـ<code>&gt; 3.0</code> يجد الـ5.4 ويفوته الـ0.0015، فيلقط أجرةَ اليوم ويفقد رقمَ الهاتف &mdash; فخرقُ النسبة يمكن أن يكون صغيرًا جدًّا كما يمكن أن يكون كبيرًا جدًّا. وقلبُ الفحص يطبع الصفوفَ العادية الـ378، وهو المخرجُ الذي تحصل عليه حين تنسى على أي جانب من <code>~</code> أنت. واحذر أن تأخذ الدرسَ الخاطئ من جودة نتيجة هذا: فلا شيء في الملف يقول إن التأمين ينبغي أن يكون عددًا صحيحًا من الأشهر. بل أنت عرفتَ ذلك لأنك تعرف كيف يجري التأجير في غزة، ثم كتبتَه كودًا. ففحصُ النسبة معرفةٌ ميدانية في زيٍّ حسابي."
        }
      },

      /* ---------------------------------------------------------- 19 */
      {
        id: "t2l4q19", type: "fill", level: "easy",
        topics: ["t2-log1p", "t2-expm1-trap"],
        q: {
          en: "Fill in the three blanks so that the program prints the four numbers in the comment. The column is the 483 rents with the typo already voided; its true mean is 210.1449 and its true median 200.0.",
          ar: "املأ الفراغات الثلاثة ليطبع البرنامجُ الأرقامَ الأربعة في التعليق. والعمودُ هو الإيجارات الـ483 وخطأُ الإدخال مُفرَغٌ سلفًا؛ ومتوسطه الحقيقي 210.1449 ووسيطه الحقيقي 200.0."
        },
        code: code(
          "lg = np.____1____(base[\"monthly_rent\"])      # log(1 + x), so a zero would stay finite",
          "",
          "print(\"mean of the rents          : %.4f\" % base[\"monthly_rent\"].mean())",
          "print(\"expm1(mean of the logs)    : %.4f\" % np.expm1(lg.mean()))",
          "print(\"mean of expm1(the logs)    : %.4f\" % np.expm1(lg).____2____())",
          "print(\"expm1(median of the logs)  : %.4f\" % np.expm1(lg.____3____()))",
          "",
          "# mean of the rents          : 210.1449",
          "# expm1(mean of the logs)    : 195.1573",
          "# mean of expm1(the logs)    : 210.1449",
          "# expm1(median of the logs)  : 200.0000"
        ),
        blanks: [
          { accept: ["log1p"] },
          { accept: ["mean"] },
          { accept: ["median"] }
        ],
        hint: {
          en: "The first blank is the function whose inverse is <code>np.expm1</code>. The last two blanks are the two summaries the lesson compares, and the output tells you which of them comes back out of the transform unchanged.",
          ar: "الفراغُ الأول هو الدالةُ التي معكوسها <code>np.expm1</code>. والفراغان الأخيران هما التلخيصان الذي يقارنهما الدرس، والمخرجُ يخبرك أيُّهما يخرج من التحويل بلا تغيير."
        },
        explain: {
          en: "<code>np.log1p(x)</code> computes <code>log(1 + x)</code> and its inverse is <code>np.expm1</code>. Read the second and third lines together, because that pair is the whole trap: the same column, the same transform, and 195.1573 against 210.1449 &mdash; 7.13% low &mdash; for no reason other than the <em>order</em> of two operations. <code>expm1</code> inverts <code>log1p</code> exactly on values, so <code>expm1</code> first and then average is just averaging the original rents, which is why the third line is the true mean to four decimals. Summarise first and back-transform afterwards and you have reported a different quantity, low in a predictable direction on every right-skewed column. The fourth line is the compensation and the reason the lesson's own baseline was unaffected: a logarithm is strictly increasing, so it cannot change which value sits in the middle of a sorted column, and <code>expm1(median of logs)</code> is <em>identically</em> the median. The rule to carry away is six words: back-transform the values, then summarise.",
          ar: "تحسب <code>np.log1p(x)</code> المقدار <code>log(1 + x)</code> ومعكوسُها <code>np.expm1</code>. واقرأ السطرين الثاني والثالث معًا، فذلك الزوجُ هو الفخُّ كله: العمودُ نفسه والتحويلُ نفسه، و195.1573 مقابل 210.1449 &mdash; أي أدنى بـ7.13% &mdash; لا لسببٍ إلا <em>ترتيبِ</em> عمليتين. فـ<code>expm1</code> تعكس <code>log1p</code> بالضبط على القيم، فيكون <code>expm1</code> أولًا ثم المتوسطُ أخذًا لمتوسط الإيجارات الأصلية، ولهذا كان السطرُ الثالث المتوسطَ الحقيقي إلى أربع منازل. ولخّص أولًا وأعِد التحويل بعدَه فتكون قد أبلغتَ عن كميةٍ أخرى، أدنى في اتجاهٍ قابل للتنبؤ في كل عمود ملتوٍ إلى اليمين. والسطرُ الرابع هو التعويضُ وسببُ عدم تأثُّر الخط القاعدي في الدرس: فاللوغاريتم متزايد تمامًا، فلا يستطيع أن يغيّر أيَّ قيمةٍ تقع في وسط عمود مرتَّب، وتكون <code>expm1(median of logs)</code> هي الوسيطَ <em>عينَه</em>. والقاعدةُ التي تحملها خمسُ كلمات: أعِد تحويل القيم ثم لخّص."
        }
      },

      /* ---------------------------------------------------------- 20 */
      {
        id: "t2l4q20", type: "multi", level: "hard",
        topics: ["t2-log-limits", "t2-skew", "t2-log1p"],
        q: {
          en: "Which of these are true of <code>np.log1p</code> on this file? Choose all that apply. The measured figures are: rent skew 1.0100 to &minus;0.4651, <code>area_m2</code> skew &minus;0.4912 to &minus;5.7291, <code>deposit</code> 1.1334 to 0.0191; held-out MAE 60.17 with and without the transform.",
          ar: "أيُّ هذه يصحّ في <code>np.log1p</code> على هذا الملف؟ اختر كل ما ينطبق. والأرقامُ المقيسة: التواءُ الإيجار من 1.0100 إلى &minus;0.4651، والتواءُ <code>area_m2</code> من &minus;0.4912 إلى &minus;5.7291، و<code>deposit</code> من 1.1334 إلى 0.0191؛ ومتوسطُ الخطأ المطلق على المحجوزة 60.17 بالتحويل وبدونه."
        },
        options: [
          {
            en: "It makes <code>area_m2</code> decisively worse. The column is <em>already</em> left-skewed at &minus;0.4912 and <code>log1p</code> takes it to &minus;5.7291, because a log compresses large values and stretches small ones, which lengthens a left tail.",
            ar: "يجعل <code>area_m2</code> أسوأ بحسم. فالعمودُ ملتوٍ إلى اليسار <em>سلفًا</em> عند &minus;0.4912، وتأخذه <code>log1p</code> إلى &minus;5.7291، لأن اللوغاريتم يضغط القيمَ الكبيرة ويمدّ الصغيرة، فيُطيل الذيلَ الأيسر."
          },
          {
            en: "It <em>finds</em> nothing. A log has no threshold, so had stage&nbsp;2 not voided the 99999 it would still be in the column at <code>log1p</code> 11.51 against a median of 5.30 &mdash; and still in every mean the model learns from.",
            ar: "لا <em>يجد</em> شيئًا. فلا حدَّ للوغاريتم، فلو لم تُفرِغ المرحلة 2 القيمة 99999 لبقيت في العمود عند <code>log1p</code> 11.51 مقابل وسيط 5.30 &mdash; وبقيت في كل متوسطٍ يتعلّم منه النموذج."
          },
          {
            en: "It bought exactly zero shekels of held-out error against this lesson's baseline, because a logarithm preserves order and the median that makes the prediction is defined by order alone.",
            ar: "اشترى صفرًا من الشواكل في الخطأ على المحجوزة مقابل الخط القاعدي في هذا الدرس، لأن اللوغاريتم يحفظ الترتيب والوسيطَ الذي يُنتج التنبؤ معرَّفٌ بالترتيب وحده."
          },
          {
            en: "It changes which tail a symmetric fence can see. On the log column the fences come back as 70.25 and 550.47 shekels, so the lower fence finally bites and listing 5208's rent of 25 is flagged &mdash; the value no rule in Concepts&nbsp;3, 4 or&nbsp;5 could reach.",
            ar: "يغيّر أيَّ ذيلٍ يستطيع سياجٌ متناظر أن يراه. فعلى العمود اللوغاريتمي يعود السياجان 70.25 و550.47 شيكلًا، فيعضّ السياجُ الأدنى أخيرًا ويُعلَّم إيجارُ الإعلان 5208 البالغ 25 &mdash; وهي القيمةُ التي لم تستطع أي قاعدة في المفاهيم 3 أو 4 أو 5 أن تبلغها."
          },
          {
            en: "It cannot be applied to the held-out rows without leaking, because the mean of the logs is a parameter fitted on the training rows and every transformed value depends on it.",
            ar: "لا يمكن تطبيقه على الصفوف المحجوزة بلا تسرّب، لأن متوسطَ اللوغاريتمات وسيطٌ مضبوط على صفوف التدريب وكلُّ قيمة محوَّلة تعتمد عليه."
          },
          {
            en: "A gradient-boosted tree gains as much from it as a linear model does, since both are fitted on the transformed column and both see the same compressed tail.",
            ar: "تكسب الشجرةُ المعزَّزة بالتدرّج منه ما يكسبه النموذجُ الخطي، فكلاهما مضبوطٌ على العمود المحوَّل وكلاهما يرى الذيلَ المضغوط نفسه."
          }
        ],
        answer: [0, 1, 2, 3],
        hint: {
          en: "Two of the six are false, and each one gets a property of the transform exactly backwards. For the first, ask what <code>log1p</code> of a single cell depends on. For the second, ask what question a tree ever asks about a feature.",
          ar: "اثنان من الستة خطأ، ويقلب كلٌّ منهما خاصيةً في التحويل قلبًا تامًّا. ففي الأول، اسأل على أي شيء تعتمد <code>log1p</code> لخليةٍ واحدة. وفي الثاني، اسأل أيَّ سؤالٍ تسأله شجرةٌ عن خاصيةٍ قط."
        },
        explain: {
          en: "The leakage claim is exactly inverted, and the property it denies is rare enough in this chapter to be worth naming: <code>log1p</code> <strong>fits nothing</strong>. It is a pure function of each cell, so the transformed value of a row depends on that row alone and on no other row in the file &mdash; apply it to the training rows, the held-out rows and June's batch with the same single line and no stored parameter. Compare capping, whose bound is fitted, and whose application to a held-out row therefore depends on 363 other rows. The tree claim is the other inversion: a tree only ever asks &ldquo;is this feature above <em>t</em>?&rdquo;, and for every threshold on the raw column there is exactly one equivalent threshold on the logged one, so the tree it builds and the predictions it makes are identical. Trees, random forests and gradient boosting are invariant to any monotone transform of a feature; linear models, neural networks, k-means and PCA care enormously, because all of them measure a <em>squared</em> quantity. The four true statements are the honest account of the transform: check the sign of the skew first, because <code>area_m2</code> got ten times worse; a log is an alternative to <em>acting</em> on an outlier, never to <em>finding</em> one; it earns nothing against an order-based ruler; and the one thing it does change is which tail a symmetric rule can reach, which is why the shape problem of <a href=\"#t2l4-s19\">Concept&nbsp;4</a> did not have to be solved with a threshold at all.",
          ar: "ادّعاءُ التسرّب مقلوبٌ تمامًا، والخاصيةُ التي ينكرها نادرةٌ في هذا الفصل بما يستحقّ التسمية: فـ<code>log1p</code> <strong>لا تضبط شيئًا</strong>. فهي دالةٌ خالصة في كل خلية، فتعتمد القيمةُ المحوَّلة لصفٍّ على ذلك الصف وحده ولا على أي صفٍّ آخر في الملف &mdash; فطبّقها على صفوف التدريب والصفوف المحجوزة ودفعة حزيران بالسطر الواحد نفسه وبلا وسيط محفوظ. وقارن تحديدَ السقف الذي حدُّه مضبوط، وتطبيقُه على صفٍّ محجوز يعتمد إذن على 363 صفًّا آخر. وادّعاءُ الشجرة هو القلبُ الآخر: فالشجرةُ لا تسأل قط إلا «هل هذه الخاصيةُ فوق <em>t</em>؟»، ولكل حدٍّ على العمود الخام حدٌّ مكافئ واحد بالضبط على اللوغاريتمي، فتكون الشجرةُ التي تبنيها والتنبؤاتُ التي تُنتجها مطابقة. فالأشجارُ والغاباتُ العشوائية والتعزيزُ بالتدرّج لا تتغيّر بأي تحويل رتيب لخاصية؛ أما النماذجُ الخطية والشبكاتُ العصبية وk-means وتحليلُ المكوّنات الأساسية فتهتمّ اهتمامًا هائلًا، لأن كلها تقيس كميةً <em>مربَّعة</em>. والعباراتُ الصحيحة الأربع هي الحسابُ الأمين للتحويل: افحص إشارةَ الالتواء أولًا، فـ<code>area_m2</code> ساء عشرة أمثال؛ واللوغاريتم بديلٌ عن <em>العمل</em> في قيمة شاذة لا عن <em>إيجادها</em> قط؛ وهو لا يكسب شيئًا في مقابل مسطرةٍ مبنيّة على الترتيب؛ والشيءُ الوحيد الذي يغيّره هو أيُّ ذيلٍ تستطيع قاعدةٌ متناظرة أن تبلغه، ولهذا لم يكن يجب حلُّ مشكلةِ الشكل في <a href=\"#t2l4-s19\">المفهوم 4</a> بحدٍّ أصلًا."
        }
      },

      /* ---------------------------------------------------------- 21 */
      {
        id: "t2l4q21", type: "mcq", level: "hard",
        topics: ["t2-iqr-derivation", "t2-mad-constant", "t2-iqr-convention"],
        q: {
          en: "For a standard normal distribution the quartiles sit at &plusmn;0.674490 standard deviations. Two of this lesson's constants come out of that one number. Which statement uses it correctly?",
          ar: "في التوزيع الطبيعي المعياري يجلس الربيعان عند ±0.674490 من الانحراف المعياري. ومن ذلك الرقم الواحد يخرج ثابتان من ثوابت هذا الدرس. فأيُّ العبارات يستعمله استعمالًا صحيحًا؟"
        },
        code: code(
          "Q3 of a standard normal  : 0.674490 sd",
          "IQR of a standard normal : 1.348980 sd",
          "k = 1.5 -> fence at 2.6980 sd | both tails 0.00697660 | about 1 row in 143",
          "k = 2.0 -> fence at 3.3724 sd | both tails 0.00074503 | about 1 row in 1342",
          "k = 3.0 -> fence at 4.7214 sd | both tails 0.00000234 | about 1 row in 426996",
          "",
          "on monthly_rent: MAD 50.0000 -> implied sd 74.1290 | actual sd 81.4615"
        ),
        lang: "text",
        options: [
          {
            en: "A 1.5 &times; IQR fence sits at <code>0.674490 + 1.5 &times; 1.348980 = 2.6980</code> sd, which is about seven values in a thousand &mdash; frequent enough that a 500-row file shows a few, rare enough that each is worth a look. And by symmetry the MAD of a normal column <em>is</em> that same 0.674490 sd, so <code>1 / 0.674490 = 1.482602</code> converts a MAD into a standard deviation.",
            ar: "يجلس سياجُ 1.5 × المدى الربيعي عند <code>0.674490 + 1.5 &times; 1.348980 = 2.6980</code> من الانحراف المعياري، وهي نحو سبع قيم في الألف &mdash; وهو تكرارٌ كافٍ ليُظهر ملفٌّ من 500 صف بضعةً منها، ونُدرةٌ كافية ليستحق كلٌّ منها نظرة. وبالتناظر يكون الانحرافُ المطلق الوسيطي لعمودٍ طبيعي <em>هو</em> ذلك 0.674490 نفسه، فتحوّل <code>1 / 0.674490 = 1.482602</code> الانحرافَ المطلق إلى انحرافٍ معياري."
          },
          {
            en: "It proves that 1.5 is the correct multiplier, since 2.6980 sd is the point beyond which a value is no longer plausibly drawn from the distribution &mdash; which is why the fence found the 99999 and why its twelve flags are twelve errors.",
            ar: "يُثبت أن 1.5 هو المضاعفُ الصحيح، إذ إن 2.6980 من الانحراف المعياري هي النقطةُ التي لا تبقى القيمةُ بعدها مسحوبةً من التوزيع احتمالًا &mdash; ولهذا وجد السياجُ الـ99999 ولهذا كانت أعلامُه الاثنا عشر اثني عشر خطأً."
          },
          {
            en: "It shows that 0.6745 in the robust z is a knob to raise when a column is skewed, because 0.674490 is the MAD-to-sd ratio of a bell curve only &mdash; and on this column the implied 74.1290 against the actual 81.4615 is the proof that it needs raising.",
            ar: "يُبيّن أن 0.6745 في z الحصينة مفتاحٌ يُرفع حين يلتوي العمود، لأن 0.674490 هي نسبةُ الانحراف المطلق إلى المعياري في المنحنى الجَرَسي وحده &mdash; وفي هذا العمود يكون الضمنيُّ 74.1290 مقابل الفعلي 81.4615 برهانَ حاجته إلى الرفع."
          },
          {
            en: "It gives <code>k = 2.0</code> as the better default for a file this size: one row in 1342 is the conventional one-in-a-thousand rate, and on 503 rows it flags six rents rather than the eleven that 1.5 flags.",
            ar: "يعطي <code>k = 2.0</code> قيمةً افتراضية أفضل لملفٍّ بهذا الحجم: فصفٌّ من 1342 هو المعدّلُ المتعارف واحدٌ في الألف، وعلى 503 صفوف يعلّم ستة إيجارات بدل الأحد عشر التي يعلّمها 1.5."
          }
        ],
        answer: 0,
        hint: {
          en: "Two of the four turn a calculation into an authority it does not have. One of them reads the gap between 74.1290 and 81.4615 as a fault in the constant; ask what that gap would be if this column were a bell curve, and what it tells you that it is not.",
          ar: "اثنان من الأربعة يحوّلان حسابًا إلى سلطانٍ ليس له. وأحدهما يقرأ الفجوةَ بين 74.1290 و81.4615 عيبًا في الثابت؛ فاسأل كم كانت تلك الفجوة لو كان هذا العمود منحنًى جَرَسيًّا، وماذا تخبرك بأنه ليس كذلك."
        },
        explain: {
          en: "There is no derivation that <em>ends</em> in 1.5; what exists is a calculation that makes 1.5 a reasonable definition of &ldquo;worth investigating&rdquo; for a bell-shaped column, and the same 0.674490 does double duty as a unit conversion for the MAD. Note how little authority either number has here: on this skewed money column the 1.5 fence flags 2.48% of the rents where normal theory predicted 0.7%, three and a half times as many, and the extra flags are not errors &mdash; they are the shape of the market. The answer that calls 2.6980 sd the point beyond which a value is implausible is the tempting one, because the appendix really does compute a tail probability; a probability of 0.007 is not an impossibility, nothing in the arithmetic distinguishes the 99999 from the 580, and eleven of the twelve flags are homes. The answer about raising 0.6745 inverts its purpose: it is a unit conversion whose only job is to keep the thresholds 3 and 3.5 meaning roughly what they meant, and the knob is <code>k</code>. The gap between an implied 74.13 and an actual 81.46 is not a fault in the constant &mdash; it is a measurement of how far this column is from normal, which is the thing you wanted the robust rule for. And <code>k = 2.0</code> defeats the purpose: one row in 1342 means a 503-row file is expected to show <em>none at all</em>, so the rule would never ask you to look at anything. The choice of <code>k</code> is a choice of how many rows you want to read.",
          ar: "لا اشتقاق <em>ينتهي</em> إلى 1.5؛ والموجودُ حسابٌ يجعل 1.5 تعريفًا معقولًا لـ«يستحق التحقّق» في عمودٍ جَرَسي، ويؤدّي 0.674490 نفسه عملًا ثانيًا تحويلَ وحدةٍ للانحراف المطلق. ولاحظ قِلّةَ سلطان الرقمَين هنا: فعلى هذا العمود المالي الملتوي يعلّم سياجُ 1.5 ‏2.48% من الإيجارات حيث تنبّأت نظريةُ التوزيع الطبيعي بـ0.7%، أي ثلاثةً وضعفًا، والأعلامُ الزائدة ليست أخطاءً &mdash; بل هي شكلُ السوق. والجوابُ الذي يسمّي 2.6980 من الانحراف المعياري نقطةَ انتفاءِ الاحتمال هو المغري، لأن الملحقَ يحسب احتمالَ ذيلٍ فعلًا؛ واحتمالٌ قدره 0.007 ليس استحالة، ولا شيء في الحساب يفرّق 99999 من 580، وأحدَ عشر من الأعلام الاثني عشر بيوت. والجوابُ عن رفع 0.6745 يقلب غرضها: فهي تحويلُ وحدةٍ عملُه الوحيد أن تحفظ الحدود 3 و3.5 معناها تقريبًا، والمفتاحُ هو <code>k</code>. والفجوةُ بين ضمنيٍّ 74.13 وفعليٍّ 81.46 ليست عيبًا في الثابت &mdash; بل هي قياسٌ لبُعد هذا العمود عن الطبيعي، وهو الشيءُ الذي أردتَ القاعدةَ الحصينة له. و<code>k = 2.0</code> يُبطل الغرض: فصفٌّ من 1342 يعني أن يُتوقَّع ألّا يُظهر ملفٌّ من 503 صفوف <em>شيئًا أصلًا</em>، فلا تطلب القاعدةُ منك أن تنظر في شيء قط. فاختيارُ <code>k</code> اختيارٌ لعدد الصفوف التي تريد قراءتها."
        }
      },

      /* ---------------------------------------------------------- 22 */
      {
        id: "t2l4q22", type: "ordercode", level: "medium",
        topics: ["t2-fence-is-fitted", "t2-actions-measured"],
        q: {
          en: "<code>fences()</code> and <code>handle_outliers(frame, fitted, training_index)</code> are already defined. Put the statements in the one order that runs &mdash; and in which no threshold is learned from a row that is not allowed to teach it, and no statistic is read before the impossible cell has been repaired.",
          ar: "‏<code>fences()</code> و<code>handle_outliers(frame, fitted, training_index)</code> معرَّفتان سلفًا. رتّب الأسطر بالترتيب الوحيد الذي يعمل &mdash; والذي لا يُتعلَّم فيه حدٌّ من صفٍّ لا يحقّ له أن يعلّمه، ولا يُقرأ فيه إحصاءٌ قبل إصلاح الخلية المستحيلة."
        },
        items: [
          { code: "import pandas as pd" },
          { code: "raw = pd.read_csv(\"listings_raw.csv\")" },
          { code: "base = raw.assign(monthly_rent=raw[\"monthly_rent\"].mask(raw[\"monthly_rent\"] > 5000))" },
          { code: "train = base.sample(frac=0.75, random_state=3)" },
          { code: "fitted = {\"rent_fence\": fences(base.loc[train.index, \"monthly_rent\"])}" },
          { code: "work, row = handle_outliers(base, fitted, train.index)" },
          { code: "print(pd.DataFrame([row]).to_string(index=False))" }
        ],
        answer: [0, 1, 2, 3, 4, 5, 6],
        hint: {
          en: "Every statement needs a name the statements above it created. Two of the placements carry the lesson rather than the syntax: one is about <a href=\"#t2l1-h2\">the canonical order</a>, and one about which rows a threshold is entitled to see. And look carefully at which frame is handed to the last function call.",
          ar: "كل سطر يحتاج اسمًا أنشأته الأسطر فوقه. وموضعان يحملان الدرسَ لا القواعدَ النحوية: أحدهما عن <a href=\"#t2l1-h2\">الترتيب القياسي</a>، والآخر عن أي الصفوف يحقّ لحدٍّ أن يراها. وانظر بتأنٍّ في أيِّ جدولٍ يُسلَّم إلى نداء الدالة الأخير."
        },
        explain: {
          en: "The chain of names fixes most of it: <code>pd</code> before <code>read_csv</code>, <code>raw</code> before <code>base</code>, <code>train</code> before <code>fitted</code>, <code>fitted</code> before <code>handle_outliers</code>, <code>row</code> before it can be printed. Two placements are the lesson rather than the syntax. The <code>mask</code> comes before the split and before the fit, because stage&nbsp;2 of the canonical order has to have turned the 99999 into a hole first &mdash; a fence fitted on a column containing a phone number still works, since the quartiles are ranks, but anything measured in standard deviations does not, and the quartiles themselves do shift by a shekel and a quarter. And the split comes before <code>fences()</code>, because Q1 and Q3 are <strong>fitted parameters</strong>: fit them on all 483 rents and the fence is 408.750, fit them on the 363 training rents and it is 397.500, and only the second is honest for a pipeline you intend to measure. Note what is handed to <code>handle_outliers</code>: <code>base</code>, not <code>train</code>. The threshold is learned on a quarter of the rows and <em>applied</em> to every one of them, because applying a stored threshold changes no value and so cannot leak &mdash; the function flags all 503 rows and deletes only the ten flagged training ones.",
          ar: "سلسلةُ الأسماء تثبّت معظمه: فـ<code>pd</code> قبل <code>read_csv</code>، و<code>raw</code> قبل <code>base</code>، و<code>train</code> قبل <code>fitted</code>، و<code>fitted</code> قبل <code>handle_outliers</code>، و<code>row</code> قبل أن يمكن طبعه. وموضعان هما الدرسُ لا القواعدُ النحوية. فـ<code>mask</code> تأتي قبل التقسيم وقبل الضبط، لأن المرحلة 2 من الترتيب القياسي يجب أن تكون قد حوّلت 99999 إلى ثقب أولًا &mdash; فالسياجُ المضبوط على عمودٍ فيه رقمُ هاتف يعمل مع ذلك، إذ الربيعان رُتبتان، أما كلُّ ما يُقاس بالانحرافات المعيارية فلا يعمل، والربيعان نفساهما يتحرّكان شيكلًا وربعًا. ويأتي التقسيمُ قبل <code>fences()</code>، لأن Q1 وQ3 <strong>وسيطان مضبوطان</strong>: فاضبطهما على الإيجارات الـ483 كلها فيكون السياج 408.750، واضبطهما على إيجارات التدريب الـ363 فيكون 397.500، والثاني وحده أمينٌ لخط تحويلٍ تقصد قياسه. ولاحظ ما يُسلَّم إلى <code>handle_outliers</code>: ‏<code>base</code> لا <code>train</code>. فالحدُّ يُتعلَّم على رُبع الصفوف و<em>يُطبَّق</em> على كل صفٍّ منها، لأن تطبيقَ حدٍّ محفوظ لا يغيّر قيمةً فلا يستطيع أن يسرّب &mdash; فتعلّم الدالةُ الصفوفَ الـ503 كلها ولا تحذف إلا صفوفَ التدريب المعلَّمة العشرة."
        }
      },

      /* ---------------------------------------------------------- 23 */
      {
        id: "t2l4q23", type: "tf", level: "medium",
        topics: ["t2-target-derived-flag", "t2-action-flag"],
        q: {
          en: "True or false: grouping by <code>rent_extreme</code> and predicting each group's training median scores a held-out MAE of 55.02 &mdash; better than capping at 59.31, better than the honest removal at 60.00 and better than the five-governorate baseline of 56.42 that <a href=\"#t2l1-s27\">Lesson&nbsp;1</a> called a real improvement. So this is the one outlier feature worth keeping, provided the report says it was derived from the rent column.",
          ar: "صح أم خطأ: التجميعُ بـ<code>rent_extreme</code> والتنبؤُ بوسيط كل مجموعة في التدريب يحقّق خطأً محجوزًا 55.02 &mdash; أفضل من تحديد السقف عند 59.31، وأفضل من الإزالة الأمينة عند 60.00، وأفضل من خطّ المحافظات الخمس القاعدي البالغ 56.42 الذي سمّاه <a href=\"#t2l1-s27\">الدرس 1</a> تحسّنًا حقيقيًّا. فهذه هي الخاصيةُ الشاذة الوحيدة التي تستحقّ الاحتفاظ، بشرط أن يقول التقريرُ إنها مستنبَطة من عمود الإيجار."
        },
        code: code(
          "fl = base.assign(rent_extreme=flag)",
          "t, h = fl.loc[train.index], fl.loc[test.index]",
          "table = t.groupby(\"rent_extreme\", observed=True)[\"monthly_rent\"].median()   # FIT on train",
          "print(table.to_string())",
          "print(\"MAE train %.2f | held out %.2f\"",
          "      % (mae(t[\"monthly_rent\"], t[\"rent_extreme\"].map(table)),",
          "         mae(h[\"monthly_rent\"], h[\"rent_extreme\"].map(table))))",
          "",
          "# rent_extreme",
          "# False    195.0",
          "# True     457.5",
          "# MAE train 55.50 | held out 55.02",
          "",
          "#   at prediction time, on a listing whose rent is not known:",
          "#   rent_extreme = ?"
        ),
        truth: false,
        hint: {
          en: "Every number in the claim is correct, including the comparison with Lesson&nbsp;1. Read the last two comment lines of the program and ask what value the feature would take on a new listing that has just appeared on the site.",
          ar: "كلُّ رقم في الادّعاء صحيح، ومنه المقارنةُ بالدرس 1. فاقرأ آخر سطرَي تعليق في البرنامج واسأل أيَّ قيمةٍ تأخذها الخاصيةُ في إعلانٍ جديد ظهر على الموقع الآن."
        },
        explain: {
          en: "False, and no amount of reporting rescues it. <code>rent_extreme</code> was computed <em>from</em> <code>monthly_rent</code>, which is the column being predicted: the model is being told &ldquo;this flat's rent is above 397.5&rdquo; and asked to guess the rent. Read the fitted table and the fraud is visible in two numbers &mdash; <code>False &rarr; 195.0</code> and <code>True &rarr; 457.5</code> &mdash; a two-bucket lookup of the answer. At prediction time, on a listing whose rent you do not know, the feature cannot be computed at all, so in production the model silently receives a default and the breakthrough evaporates. This is <a href=\"#t2l1-h3\">leakage</a> in its purest form, a feature derived from the target, and it is the same mistake <a href=\"#t2l2-s22\">Lesson&nbsp;2</a> named for a missing-value indicator built on the target column. The transparency clause is what makes the claim tempting, and it is where it fails: disclosure usually does fix this kind of problem, but a number that cannot exist at prediction time is not made usable by a footnote. The rule is simple and absolute: <strong>a flag computed from column X may never be a feature in a model that predicts column X.</strong> It has exactly three legitimate uses &mdash; a report, a filter on the training rows, and a monitoring count &mdash; and they are enough.",
          ar: "خطأ، ولا يُنجيه قدرٌ من الإبلاغ. فـ<code>rent_extreme</code> محسوبٌ <em>من</em> <code>monthly_rent</code>، وهو العمودُ المتنبَّأ به: فيقال للنموذج «إيجارُ هذه الشقة فوق 397.5» ويُطلب منه أن يخمّن الإيجار. واقرأ الجدولَ المضبوط فيظهر الغشُّ في رقمين &mdash; ‏<code>False &rarr; 195.0</code> و<code>True &rarr; 457.5</code> &mdash; أي استخراجٌ من ورقة الجواب بصندوقين. ووقت التنبؤ، على إعلانٍ لا تعرف إيجاره، لا يمكن حسابُ الخاصية أصلًا، فيستقبل النموذجُ في الإنتاج قيمةً افتراضية بصمت ويتبخّر الفتح. وهذا <a href=\"#t2l1-h3\">التسرّب</a> في أنقى صوره، خاصيةٌ مستنبَطة من الهدف، وهو الخطأُ نفسه الذي <a href=\"#t2l2-s22\">سمّاه الدرس 2</a> لمؤشِّر قيمةٍ مفقودة مبنيٍّ على عمود الهدف. وشرطُ الشفافية هو ما يجعل الادّعاءَ مغريًا، وهو موضعُ سقوطه: فالإفصاحُ يُصلح هذا النوع من المشكلات عادةً، لكن رقمًا لا يمكن أن يوجد وقت التنبؤ لا تجعله حاشيةٌ قابلًا للاستعمال. والقاعدةُ بسيطة ومطلقة: <strong>العلمُ المحسوب من العمود X لا يجوز أن يكون خاصيةً قط في نموذجٍ يتنبأ بالعمود X.</strong> وله ثلاثةُ استعمالات مشروعة بالضبط &mdash; تقريرٌ، ومرشّحٌ على صفوف التدريب، وعدٌّ للمراقبة &mdash; وهي كافية."
        }
      },

      /* ---------------------------------------------------------- 24 */
      {
        id: "t2l4q24", type: "write", level: "hard",
        topics: ["t2-domain-limit", "t2-action-flag", "t2-robust-z"],
        q: {
          en: "Write <code>review_rent(d, fitted)</code> in the <code>(frame, log_row)</code> shape of <a href=\"#t2l4-s23\">Version&nbsp;5</a>, so that March's reviewed thresholds can be run on June's file unchanged. It must take the bounds from <code>fitted[\"limits\"][\"monthly_rent\"]</code> and the robust-z parameters from <code>fitted[\"rent_median\"]</code> and <code>fitted[\"rent_mad\"]</code>, never recomputing any of them; keep the two findings in two separate boolean columns <code>monthly_rent_impossible</code> and <code>monthly_rent_extreme</code> with a threshold of 3.5; delete nothing and never write into <code>d</code>; and return the new frame with one log row holding <code>step</code>, <code>rows_in</code>, <code>rows_out</code>, <code>impossible</code> and <code>extreme</code>. Then call it on June's 85 rows and print the log row as a one-row DataFrame.",
          ar: "اكتب <code>review_rent(d, fitted)</code> بشكل <code>(frame, log_row)</code> في <a href=\"#t2l4-s23\">النسخة 5</a>، حتى يمكن تشغيل حدود آذار المُراجَعة على ملف حزيران بلا تغيير. يجب أن تأخذ الحدَّين من <code>fitted[\"limits\"][\"monthly_rent\"]</code> ووسائطَ z الحصينة من <code>fitted[\"rent_median\"]</code> و<code>fitted[\"rent_mad\"]</code>، ولا تعيد حساب أيٍّ منها قطّ؛ وأن تُبقي النتيجتين في عمودين منطقيين منفصلين <code>monthly_rent_impossible</code> و<code>monthly_rent_extreme</code> بحدٍّ قدره 3.5؛ وألّا تحذف شيئًا ولا تكتب في <code>d</code> قطّ؛ وأن تعيد الجدولَ الجديد مع سطر سجلٍّ واحد فيه <code>step</code> و<code>rows_in</code> و<code>rows_out</code> و<code>impossible</code> و<code>extreme</code>. ثم نادِها على صفوف حزيران الـ85 واطبع سطرَ السجل جدولًا من صفٍّ واحد."
        },
        starter: code(
          "import pandas as pd",
          "",
          "new    = pd.read_csv(\"listings_new.csv\")      # 85 rows for June, 83 of them with a rent",
          "fitted = {\"limits\": {\"monthly_rent\": (50, 2000)},   # reviewed in March, written down",
          "          \"rent_median\": 200.0,                     # fitted on the 363 training rents",
          "          \"rent_mad\": 50.0}",
          "",
          "# your code here"
        ),
        lines: 14,
        checks: [
          {
            re: "def\\s+review_rent\\s*\\(\\s*\\w+\\s*,\\s*\\w+\\s*\\)",
            label: {
              en: "A function <code>review_rent</code> of two arguments: the frame and the fitted parameters",
              ar: "دالة <code>review_rent</code> بوسيطين: الجدول والوسائط المضبوطة"
            }
          },
          {
            re: "\\[\\s*[\"']limits[\"']\\s*\\]",
            label: {
              en: "The bounds come from <code>fitted[\"limits\"]</code>, not from a number typed into the step",
              ar: "الحدّان يأتيان من <code>fitted[\"limits\"]</code> لا من رقمٍ مكتوبٍ في الخطوة"
            }
          },
          {
            re: "\\.\\s*between\\s*\\(",
            label: {
              en: "The domain rule asks whether the value lies between the two bounds",
              ar: "القاعدة الميدانية تسأل هل القيمة بين الحدَّين"
            }
          },
          {
            re: "\\[\\s*[\"']rent_median[\"']\\s*\\]",
            label: {
              en: "The centre of the robust z is the stored <code>rent_median</code>",
              ar: "مركز z الحصينة هو <code>rent_median</code> المحفوظ"
            }
          },
          {
            re: "\\[\\s*[\"']rent_mad[\"']\\s*\\]",
            label: {
              en: "The spread of the robust z is the stored <code>rent_mad</code>",
              ar: "تشتُّت z الحصينة هو <code>rent_mad</code> المحفوظ"
            }
          },
          {
            re: "0\\s*\\.\\s*6745",
            label: {
              en: "The MAD is scaled by 0.6745, so the threshold keeps its usual meaning",
              ar: "الانحراف المطلق مقيسٌ بـ0.6745 ليحفظ الحدُّ معناه المعتاد"
            }
          },
          {
            re: "3\\s*\\.\\s*5",
            label: {
              en: "The robust-z threshold is 3.5",
              ar: "حدّ z الحصينة هو 3.5"
            }
          },
          {
            re: "monthly_rent_impossible\\s*=",
            label: {
              en: "A <code>monthly_rent_impossible</code> column for what the domain rule found",
              ar: "عمود <code>monthly_rent_impossible</code> لما وجدته القاعدة الميدانية"
            }
          },
          {
            re: "monthly_rent_extreme\\s*=",
            label: {
              en: "A separate <code>monthly_rent_extreme</code> column, so the two findings are never confused",
              ar: "عمود <code>monthly_rent_extreme</code> منفصل، فلا تُخلط النتيجتان قطّ"
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
            re: "return\\s+\\w+\\s*,\\s*\\{",
            label: {
              en: "Return the frame and the log row together",
              ar: "أعِد الجدول وسطر السجل معًا"
            }
          },
          {
            re: "[\"']rows_out[\"']\\s*:",
            label: {
              en: "The log row reports <code>rows_out</code> &mdash; the proof that nothing was deleted",
              ar: "سطر السجل يُبلّغ عن <code>rows_out</code> &mdash; وهو البرهان أن لا شيء حُذف"
            }
          }
        ],
        forbid: [
          {
            re: "\\.\\s*median\\s*\\(",
            label: {
              en: "recomputing the median or the MAD inside the step (that refits on June, and the two months stop being comparable)",
              ar: "إعادة حساب الوسيط أو الانحراف المطلق داخل الخطوة (فذلك إعادةُ ضبطٍ على حزيران، فيتوقف الشهران عن كونهما قابلين للمقارنة)"
            }
          },
          {
            re: "\\.\\s*dropna\\s*\\(",
            label: {
              en: "dropping the rows with a blank rent &mdash; this step flags, it never deletes",
              ar: "حذف الصفوف التي إيجارها فارغ &mdash; فهذه الخطوة تعلّم ولا تحذف قطّ"
            }
          },
          {
            re: "inplace\\s*=\\s*True",
            label: {
              en: "<code>inplace=True</code> (it writes into the caller's frame, returns <code>None</code>, and saves no memory)",
              ar: "<code>inplace=True</code> (يكتب في جدول المنادي ويعيد <code>None</code> ولا يوفّر ذاكرة)"
            }
          }
        ],
        solution: {
          code: code(
            "import pandas as pd",
            "",
            "new    = pd.read_csv(\"listings_new.csv\")",
            "fitted = {\"limits\": {\"monthly_rent\": (50, 2000)},",
            "          \"rent_median\": 200.0,",
            "          \"rent_mad\": 50.0}",
            "",
            "",
            "def review_rent(d, fitted):",
            "    \"\"\"Flag, never delete. The domain rule and the robust z both come from fitted.\"\"\"",
            "    low, high = fitted[\"limits\"][\"monthly_rent\"]",
            "    s = d[\"monthly_rent\"]",
            "    impossible = s.notna() & ~s.between(low, high)",
            "    rz = 0.6745 * (s - fitted[\"rent_median\"]) / fitted[\"rent_mad\"]",
            "    extreme = (rz.abs() > 3.5).fillna(False)",
            "    out = d.assign(monthly_rent_impossible=impossible,",
            "                   monthly_rent_extreme=extreme)",
            "    return out, {\"step\": \"review monthly_rent\", \"rows_in\": len(d), \"rows_out\": len(out),",
            "                 \"impossible\": int(impossible.sum()), \"extreme\": int(extreme.sum())}",
            "",
            "",
            "out, row = review_rent(new, fitted)",
            "print(pd.DataFrame([row]).to_string(index=False))"
          ),
          out: "               step  rows_in  rows_out  impossible  extreme\nreview monthly_rent       85        85           0        0",
          en: "Both parameters arrive from <code>fitted</code>, so June is judged by March's reviewed thresholds rather than by its own. <code>s.notna() &amp; ~s.between(low, high)</code> keeps a blank rent out of the impossible count, <code>fillna(False)</code> keeps it out of the extreme count, and <code>rows_in == rows_out == 85</code> is the proof that the step flagged and deleted nothing.",
          ar: "الوسيطان كلاهما يأتيان من <code>fitted</code>، فيُحكَم على حزيران بحدود آذار المُراجَعة لا بحدوده هو. و<code>s.notna() &amp; ~s.between(low, high)</code> تُبقي الإيجارَ الفارغ خارج عدّ المستحيلة، و<code>fillna(False)</code> تُبقيه خارج عدّ المتطرفة، و<code>rows_in == rows_out == 85</code> برهانُ أن الخطوةَ علّمت ولم تحذف شيئًا."
        },
        hint: {
          en: "Two zeros are a finding, not a failure &mdash; but they are only a finding if the thresholds came from somewhere other than June. Guard both counts against the two blank rents: a missing value is neither possible nor impossible, and <code>NaN &gt; 3.5</code> is <code>False</code> only after you say so.",
          ar: "الصفران نتيجةٌ لا إخفاق &mdash; لكنهما نتيجةٌ فقط إن كانت الحدود جاءت من موضعٍ غير حزيران. فاحمِ العدَّين من الإيجارين الفارغين: فالقيمةُ المفقودة ليست ممكنة ولا مستحيلة، و<code>NaN &gt; 3.5</code> تساوي <code>False</code> بعد أن تقول ذلك فقط."
        },
        explain: {
          en: "A step in this shape takes the frame and the fitted parameters and gives back a new frame plus one dictionary describing what it did, so a three-column review is a three-line table a colleague can read. Three details carry the question. The thresholds arrive as parameters: recompute the median and the MAD on June and the same 83 listings come out judged by a different ruler, for reasons that have nothing to do with any flat &mdash; and the stored robust z is worth exactly as much as the fact that it was stored, since its threshold in shekels is <code>200 + 3.5 &times; 50 / 0.6745 = 459.5</code> and June's most expensive flat asks 440. The findings stay in two columns, because <code>impossible</code> and <code>extreme</code> need different actions and a single <code>True</code> is how a phone number and a family's home end up side by side. And nothing is deleted: <code>rows_in</code> and <code>rows_out</code> are both 85, every decision deferred to a step that can price it. The output is two zeros, and that is a <em>useful</em> report line rather than an empty one: June contains no impossible rents and nothing unusual for the market the model learned from &mdash; a claim you can only make because the rules were written down in March and run unchanged. The classic wrong shortcut is <code>dropna()</code> on the rent before flagging; the two blank rents are rows Lesson&nbsp;2 already has a decision for, and a review step is not the place to re-open it.",
          ar: "الخطوةُ بهذا الشكل تأخذ الجدولَ والوسائطَ المضبوطة وتعيد جدولًا جديدًا مع قاموسٍ واحد يصف ما فعلته، فتكون مراجعةُ ثلاثة أعمدة جدولًا من ثلاثة أسطر يستطيع زميلٌ قراءته. وثلاثةُ تفاصيل تحمل السؤال. فالحدود تأتي وسائطَ: أعِد حسابَ الوسيط والانحراف المطلق على حزيران تخرج الإعلاناتُ الـ83 نفسها محكومًا عليها بمسطرةٍ أخرى لأسبابٍ لا علاقة لها بأي شقة &mdash; وz الحصينة المحفوظة تستحقّ بقدر كونها محفوظة بالضبط، إذ إن حدَّها بالشواكل <code>200 + 3.5 &times; 50 / 0.6745 = 459.5</code> وأغلى شقة في حزيران تطلب 440. والنتيجتان تبقيان في عمودين، لأن <code>impossible</code> و<code>extreme</code> يحتاجان عملين مختلفين، و<code>True</code> الواحدة هي كيف ينتهي رقمُ هاتفٍ وبيتُ أسرة جنبًا إلى جنب. ولا شيء يُحذف: فـ<code>rows_in</code> و<code>rows_out</code> كلاهما 85، وكل قرار مؤخَّر إلى خطوةٍ تستطيع تحديد ثمنه. والمخرجُ صفران، وهو سطرُ تقريرٍ <em>نافع</em> لا فارغ: فحزيران لا يحتوي إيجاراتٍ مستحيلة ولا شيئًا غيرَ معتادٍ في السوق التي تعلّم منها النموذج &mdash; وهو ادّعاءٌ لا تستطيعه إلا لأن القواعد كُتبت في آذار وشُغّلت بلا تغيير. والاختصارُ الخاطئ الكلاسيكي هو <code>dropna()</code> على الإيجار قبل التعليم؛ والإيجاران الفارغان صفّان للدرس 2 فيهما قرارٌ سلفًا، وخطوةُ المراجعة ليست موضعَ إعادة فتحه."
        }
      }

    ]
  };
})();
