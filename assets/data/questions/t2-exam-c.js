window.DABanks = window.DABanks || {};
(function () {
  /* code(line, line, ...) -> one string with \n between lines */
  function code() { return Array.prototype.join.call(arguments, "\n"); }

  window.DABanks["t2-exam-c"] = {
    title: {
      en: "Chapter Test C — Advanced",
      ar: "اختبار الفصل ج — المتقدم"
    },
    intro: {
      en: "24 questions on the hard corners of the chapter, and they cross lesson boundaries. Three different ways a <em>better</em> number means a worse method; rules that cannot see what you need, and the one cross-column check that can; the same scaler in two different stages; a mechanism that says where the holes are and not what the values were; what a pipeline whose three assertions all pass still gets wrong; and the threads that run back into Theory&nbsp;1 and Practical&nbsp;1. Every number comes from the 503 scraped rows, the 480 real flats and the 85 June listings of this chapter. Plan for about 60 minutes. Every question carries a hint, an answer and an explanation, hidden until you ask for them: try first, then open them. A revealed answer is not counted.",
      ar: "‏24 سؤالًا على الزوايا الصعبة في الفصل، وهي تعبر حدود الدروس. ثلاث طرق مختلفة يكون فيها الرقم <em>الأفضل</em> منهجًا أسوأ؛ وقواعدُ لا ترى ما تحتاجه، والفحصُ الوحيد العابر للأعمدة الذي يراه؛ والمُقايِس نفسه في مرحلتين مختلفتين؛ وآليةٌ تقول أين الثقوب لا ما كانت القيم؛ وما يبقى خاطئًا في مسارٍ تنجح تأكيداته الثلاثة كلها؛ والخيوط الممتدة رجوعًا إلى النظري&nbsp;1 والعملي&nbsp;1. وكل رقم من الصفوف الـ503 المسحوبة والشقق الـ480 الحقيقية وإعلانات حزيران الـ85 في هذا الفصل. قدّر نحو 60 دقيقة. ولكل سؤال تلميح وجواب وشرح، مخفيّة حتى تطلبها: جرّب أولًا ثم افتحها. والجواب المكشوف لا يُحسب."
    },
    questions: [

      /* ---------------------------------------------------------- 01 */
      {
        id: "t2cx01", type: "contrast", level: "medium",
        topics: ["t2-mar", "t2-mnar", "t2-mechanism-evidence"],
        q: {
          en: "Two of this file's three missing-data mechanisms. Place each statement under the deposit's MAR, under the rent's MNAR, or under both.",
          ar: "اثنتان من آليات الفقد الثلاث في هذا الملف. ضع كل عبارة تحت MAR في التأمين أو تحت MNAR في الإيجار أو تحت كلتيهما."
        },
        concepts: [
          {
            en: "<code>deposit</code> &mdash; MAR: blank in 123 of 503 rows, and 103 of those are every single row of Noor&nbsp;Estates and Diwan&nbsp;Rentals",
            ar: "‏<code>deposit</code> &mdash; MAR: فارغ في 123 من 503 صفوف، و103 منها هي كل صفوف Noor&nbsp;Estates وDiwan&nbsp;Rentals بلا استثناء"
          },
          {
            en: "<code>monthly_rent</code> &mdash; MNAR: blank in 19 of 503 rows, where the site prints <em>price on request</em>",
            ar: "‏<code>monthly_rent</code> &mdash; MNAR: فارغ في 19 من 503 صفوف، حيث يطبع الموقع <em>السعر عند الطلب</em>"
          }
        ],
        rows: [
          {
            s: {
              en: "Can be established as a fact about this file: &ldquo;74 of 74 rows of this agency are blank&rdquo; is a count, not an inference",
              ar: "يمكن إثباتها واقعةً عن هذا الملف: فـ«74 من 74 صفًّا لهذه الوكالة فارغة» عدٌّ لا استنتاج"
            },
            a: 0
          },
          {
            s: {
              en: "Cannot be established from the file at all; the grounds are a sentence you learn by reading the site or asking whoever wrote the scraper",
              ar: "لا يمكن إثباتها من الملف أصلًا؛ فالمستند جملةٌ تعرفها بقراءة الموقع أو بسؤال من كتب الساحب (scraper)"
            },
            a: 1
          },
          {
            s: {
              en: "The rows that have a value are not a fair sample of the column, so one global number written into the holes is biased &mdash; unlike <code>area_m2</code>, whose blank rows look like the rest",
              ar: "الصفوفُ التي لها قيمة ليست عيّنة عادلة من العمود، فرقمٌ عامٌّ واحد يُكتب في الثقوب متحيّز &mdash; بخلاف <code>area_m2</code> التي تشبه صفوفُها الفارغة بقيّتها"
            },
            a: 2
          },
          {
            s: {
              en: "Filling the hole from the very column the blank depends on was measured and came out <em>worse</em> than one global number: 164.01 shekels of error a hole against 156.41 over five splits",
              ar: "تعويضُ الثقب من العمود نفسه الذي يتوقف عليه الفراغ قِيسَ فخرج <em>أسوأ</em> من رقم عامٍّ واحد: 164.01 شيكلًا من الخطأ للثقب مقابل 156.41 على خمس تقسيمات"
            },
            a: 0
          },
          {
            s: {
              en: "Hiding the nineteen dearest of the 483 published values and filling them with the median costs 242.37 shekels a hole, against 58.95 when nineteen values are hidden at random",
              ar: "إخفاءُ أغلى تسعة عشر من القيم الـ483 المنشورة وتعويضها بالوسيط يكلّف 242.37 شيكلًا للثقب، مقابل 58.95 عند إخفاء تسعة عشر عشوائيًّا"
            },
            a: 1
          },
          {
            s: {
              en: "Names where the holes are without naming what the values were, so the mechanism is a reason to look and never a licence to fill",
              ar: "تسمّي أين الثقوب دون أن تسمّي ما كانت القيم، فالآليةُ سببٌ للنظر لا رخصةٌ للتعويض"
            },
            a: 2
          },
          {
            s: {
              en: "The honest decision is to delete the rows, because the hole is in the column the model predicts and no fill can ever be checked against anything",
              ar: "القرارُ الأمين حذفُ الصفوف، لأن الثقب في العمود الذي يتنبأ به النموذج ولا يمكن التحقق من أي تعويض في مقابل شيء"
            },
            a: 1
          }
        ],
        hint: {
          en: "Ask of each row: is it a count you can run on the file, or a claim about why a value is absent? And keep &ldquo;where the hole is&rdquo; apart from &ldquo;what the value was&rdquo; &mdash; two of these rows are true of both columns for exactly that reason.",
          ar: "اسأل عن كل سطر: هل هو عدٌّ تستطيع تشغيله على الملف، أم ادّعاءٌ عن سببِ غياب القيمة؟ وافصل «أين الثقب» عن «ما كانت القيمة» &mdash; فسطران من هذه صحيحان للعمودين لهذا السبب بالضبط."
        },
        explain: {
          en: "MAR is the mechanism you can get closest to: whether a deposit is blank depends on <code>agency</code>, a column in front of you, and two agencies at exactly 100% against eighteen between 0 and 11 is a step rather than a gradient &mdash; a fact, not an inference. MNAR is the opposite: the rent is blank <em>because</em> the rent is high, and the hidden value is the one thing the file does not contain, so the 3.58-rooms-against-3.04 table is only proxy evidence and the real grounds are the sentence <em>price on request</em>. Both mechanisms make the observed rows an unfair sample, which is why both bias a global fill, and both name the location of the hole rather than its value &mdash; which is the trap in &ldquo;MAR by agency, therefore fill per agency&rdquo;: measured, that rule scored 164.01 against the global median's 156.41, because almost all of the available signal is in the <em>rent</em> (deposit&ndash;rent correlation 0.6034 against 0.1375 with its own agency's mean). The target column is different in kind: 242.37 shekels a hole is what a fill costs when the hidden values are all on one side of it, and a fabricated label can never be validated &mdash; so the rows go.",
          ar: "‏MAR أقربُ الآليات إلى الإثبات: فكون التأمين فارغًا يتوقف على <code>agency</code>، وهو عمودٌ أمامك، ووكالتان عند 100% بالضبط مقابل ثماني عشرة بين 0 و11 درجةٌ لا تدرّج &mdash; واقعةٌ لا استنتاج. وMNAR عكسها: الإيجار فارغ <em>لأن</em> الإيجار مرتفع، والقيمةُ المخفيّة هي الشيء الوحيد الذي لا يحتويه الملف، فجدولُ 3.58 غرفة مقابل 3.04 قرينةٌ بالوكالة فحسب، والمستندُ الحقيقي جملةُ <em>السعر عند الطلب</em>. والآليتان كلتاهما تجعلان الصفوفَ المرصودة عيّنةً غير عادلة، ولهذا تتحيّز عندهما جميعًا التعويضاتُ العامة، وكلتاهما تسمّي موضعَ الثقب لا قيمته &mdash; وهذا هو الفخّ في «التأمين MAR بالوكالة، فليكن التعويض بالوكالة»: فهذه القاعدة مقيسةً سجّلت 164.01 مقابل 156.41 للوسيط العام، لأن جُلّ الإشارة المتاحة في <em>الإيجار</em> (ارتباط التأمين بالإيجار 0.6034 مقابل 0.1375 بمتوسط وكالته). وعمودُ الهدف مختلفٌ في جنسه: فـ242.37 شيكلًا للثقب هو ثمنُ التعويض حين تكون القيمُ المخفيّة كلها في جهة واحدة منه، ولا يمكن التحقق من لافتةٍ مختلقة أبدًا &mdash; فتذهب الصفوف."
        }
      },

      /* ---------------------------------------------------------- 02 */
      {
        id: "t2cx02", type: "compare", level: "hard",
        topics: ["t2-scale-after-repair", "t2-pipeline-order", "t2-domain-limit"],
        q: {
          en: "The same scaler, two lines apart in the pipeline. Both programs start from the 480 flats that stages&nbsp;1 and&nbsp;2's structural work produced; the only difference is whether <code>LIMITS</code> has voided the two impossible rents &mdash; listing&nbsp;5062's phone number of 99999 and listing&nbsp;5208's daily rate of 25 &mdash; before the two parameters are learned. Which statement is correct?",
          ar: "المُقايِس نفسه، وبينهما سطران في المسار. يبدأ البرنامجان من الشقق الـ480 التي أنتجها العملُ البنيوي للمرحلتين&nbsp;1 و&nbsp;2؛ والفرقُ الوحيد هل أبطل <code>LIMITS</code> الإيجارين المستحيلين &mdash; رقمُ الهاتف 99999 في الإعلان&nbsp;5062 والأجرةُ اليومية 25 في الإعلان&nbsp;5208 &mdash; قبل تعلُّم الوسيطين. أي عبارة صحيحة؟"
        },
        codeA: code(
          "flats = make_comparable(\"listings_raw.csv\")[0]      # 480 flats; values not repaired yet",
          "",
          "r = flats[\"monthly_rent\"]",
          "v = (r - r.min()) / (r.max() - r.min())",
          "",
          "print(\"count %d  25%% %.6f  50%% %.6f  75%% %.6f\"",
          "      % (v.notna().sum(), v.quantile(.25), v.quantile(.5), v.quantile(.75)))",
          "print(\"values below 0.01: %d of %d\" % ((v < 0.01).sum(), v.notna().sum()))",
          "",
          "# count 461  25% 0.001300  50% 0.001750  75% 0.002301",
          "# values below 0.01: 460 of 461"
        ),
        codeB: code(
          "flats = make_comparable(\"listings_raw.csv\")[0]      # 480 flats",
          "",
          "r = flats[\"monthly_rent\"]",
          "r = r.mask(r.notna() & ~r.between(*LIMITS[\"monthly_rent\"]))   # stage 2: (50, 2000)",
          "v = (r - r.min()) / (r.max() - r.min())",
          "",
          "print(\"count %d  25%% %.6f  50%% %.6f  75%% %.6f\"",
          "      % (v.notna().sum(), v.quantile(.25), v.quantile(.5), v.quantile(.75)))",
          "print(\"values below 0.01: %d of %d\" % ((v < 0.01).sum(), v.notna().sum()))",
          "",
          "# count 459  25% 0.198113  50% 0.283019  75% 0.386792",
          "# values below 0.01: 3 of 459"
        ),
        options: [
          {
            en: "A is broken because min&ndash;max is the wrong scaler for a skewed money column; standardising the same unrepaired rents instead would have put the quartiles where B's are.",
            ar: "‏A معطوبة لأن توحيد الحدَّين مُقايِسٌ خاطئ لعمود مالٍ ملتوٍ؛ ولو وُحِّدت الإيجاراتُ غير المُصلحة نفسها معياريًّا لوقعت الأرباعُ حيث أرباع B."
          },
          {
            en: "B leaks and A does not: <code>LIMITS</code> was read off the whole file, so B's parameters have seen rows that nothing is allowed to learn from, while A's minimum and maximum are honest readings of the column as it arrived.",
            ar: "‏B تتسرّب وA لا: فـ<code>LIMITS</code> قُرئت من الملف كله، فرأت وسائطُ B صفوفًا لا يحقّ لشيء أن يتعلّم منها، أما حدَّا A الأدنى والأعلى فقراءتان أمينتان للعمود كما وصل."
          },
          {
            en: "The scaler is identical in both and the stage it runs in is not. Min&ndash;max's two fitted parameters <em>are</em> the extremes of the column, so a phone number and a daily rate set both of them and 460 of 461 real rents land below 0.01; repairing the values first spreads the same market over [0,&nbsp;1] without one character of the arithmetic changing. Scaling is the last stage precisely because its parameters are the values stage&nbsp;2 exists to remove.",
            ar: "المُقايِس واحدٌ في كلتيهما، والمرحلةُ التي يعمل فيها ليست كذلك. فوسيطا توحيد الحدَّين المضبوطان <em>هما</em> طرفا العمود، فيضبطهما رقمُ هاتف وأجرةٌ يومية معًا فتهبط 460 من 461 إيجارًا حقيقيًّا دون 0.01؛ وإصلاحُ القيم أولًا يبسط السوقَ نفسها على [0،&nbsp;1] دون أن يتغير حرفٌ من الحساب. وتوحيدُ المقياس آخرُ مرحلة لأن وسائطه بالضبط هي القيم التي وُجدت المرحلةُ&nbsp;2 لإزالتها."
          },
          {
            en: "A's printed quartiles are misleading but its scaled column is still usable, because min&ndash;max is monotone: it preserves every ordering, so any threshold a model would choose is unchanged.",
            ar: "أرباعُ A المطبوعة مضلِّلة لكن عمودَها المُوحَّد ما زال صالحًا، لأن توحيد الحدَّين رتيبٌ: فهو يحفظ كل ترتيب، فلا يتغير أي حدٍّ يختاره نموذج."
          }
        ],
        answer: 2,
        hint: {
          en: "Compare the two lines of arithmetic character by character, then compare what <code>min()</code> and <code>max()</code> were computed over. And ask what <code>LIMITS</code>'s six numbers were read off &mdash; the column, or the market?",
          ar: "قارن سطري الحساب حرفًا حرفًا، ثم قارن ما حُسب عليه <code>min()</code> و<code>max()</code>. واسأل من أين قُرئت أرقامُ <code>LIMITS</code> الستة &mdash; من العمود أم من السوق؟"
        },
        explain: {
          en: "Not one character of the scaling differs: the whole difference is one <code>mask</code> two lines earlier. Min&ndash;max is the one scaler whose two parameters <em>are</em> extreme values, so a single cell that is not a rent owns the denominator: the range becomes 99974 instead of 530, and the real market &mdash; quartiles 155, 200 and 255 shekels &mdash; is squeezed into 0.0013 to 0.0023, a band about one two-hundredth of the output wide. That is why scaling is stage&nbsp;5 and values are stage&nbsp;2, and why Lesson&nbsp;1 states the principle as &ldquo;a stage may only learn from data that no later stage will change&rdquo;. The tempting wrong answer is the one about monotonicity: it is perfectly true, and it is a defence only for a tree. A linear model, a gradient-descent fit, kNN and the first layer of a network all read that column as a constant with rounding error; the loss still falls, the run looks healthy, and a regularised model drives the weight to zero and drops the feature without a word. Nor is standardising a rescue &mdash; on the same unrepaired column it gives quartiles of &minus;0.0585, &minus;0.0489 and &minus;0.0370: less obviously broken, equally dead. And <code>LIMITS</code> cannot leak, because its six numbers are a claim about this market, written down and reviewable; they fit nothing, so B is a pure apply that may run on any frame.",
          ar: "لا يختلف حرفٌ واحد من توحيد المقياس: فكلُّ الفرق <code>mask</code> واحدة قبله بسطرين. وتوحيدُ الحدَّين هو المُقايِس الوحيد الذي وسيطاه <em>هما</em> قيمتان طرفيّتان، فتملك خليةٌ واحدة ليست إيجارًا المقسومَ عليه: فيصير المدى 99974 بدل 530، ويُضغط السوقُ الحقيقي &mdash; أرباعه 155 و200 و255 شيكلًا &mdash; في 0.0013 إلى 0.0023، نطاقٌ عرضُه نحو جزء من مئتين من المخرَج. ولهذا توحيدُ المقياس هو المرحلة&nbsp;5 والقيمُ هي المرحلة&nbsp;2، ولهذا يصوغ الدرس&nbsp;1 المبدأ: «لا يحقّ لمرحلةٍ أن تتعلّم إلا من بيانات لن تغيّرها مرحلةٌ لاحقة». والجوابُ الخاطئ المغري هو الذي عن الرتابة: فهو صحيح تمامًا، وهو دفاعٌ عن الشجرة وحدها. أما النموذجُ الخطي والضبطُ بالانحدار التدرّجي وkNN والطبقةُ الأولى من شبكة فتقرأ ذلك العمودَ كله ثابتًا بخطأ تقريب؛ وتظل الخسارةُ تنزل، وتبدو التشغيلةُ سليمة، ويدفع نموذجٌ مُنظَّم ذلك الوزنَ إلى الصفر فيُسقط الخاصيةَ بلا كلمة. وليس التوحيدُ المعياري نجاةً &mdash; فعلى العمود غير المُصلح نفسه يعطي أرباعًا &minus;0.0585 و&minus;0.0489 و&minus;0.0370: أقلُّ ظهورًا في عطبه، وميتٌ مثله. و<code>LIMITS</code> لا يمكن أن تتسرّب، لأن أرقامها الستة ادّعاءٌ عن هذه السوق مكتوبٌ وقابلٌ للمراجعة؛ فهي لا تضبط شيئًا، فتكون B تطبيقًا محضًا يجوز تشغيله على أي جدول."
        }
      },

      /* ---------------------------------------------------------- 03 */
      {
        id: "t2cx03", type: "output", level: "medium",
        topics: ["t2-domain-limit", "t2-robust-z", "t2-deposit-rule"],
        q: {
          en: "Write exactly what the program prints. The frame is the 503 rows as scraped: nothing repaired, and in particular not one deposit filled. In this market a deposit is quoted as a whole number of months' rent. The last two lines are the lower <code>1.5&nbsp;&times;&nbsp;IQR</code> fence of the rent column and the robust z of listing&nbsp;5208's rent of 25.",
          ar: "اكتب بالضبط ما يطبعه البرنامج. الجدولُ هو الصفوف الـ503 كما سُحبت: لا شيء مُصلَح، ولا تأمينٌ واحد معوَّض على وجه الخصوص. وفي هذه السوق يُعلَن التأمينُ عددًا صحيحًا من شهور الإيجار. والسطران الأخيران هما السياجُ الأدنى <code>1.5&nbsp;&times;&nbsp;IQR</code> لعمود الإيجار وz الحصينة لإيجار الإعلان&nbsp;5208 البالغ 25."
        },
        code: code(
          "months = (raw[\"deposit\"] / raw[\"monthly_rent\"]).round(4)",
          "print(int(months.notna().sum()), int(months.isin([1.0, 2.0, 3.0]).sum()))",
          "print(raw.loc[months.notna() & ~months.isin([1.0, 2.0, 3.0]), \"listing_id\"].tolist())",
          "",
          "s = raw[\"monthly_rent\"]",
          "q1, q3 = s.quantile(.25), s.quantile(.75)",
          "print(\"%.4f\" % (q1 - 1.5 * (q3 - q1)))",
          "",
          "med = s.median()",
          "mad = (s - med).abs().median()",
          "print(\"%.4f\" % (0.6745 * (25 - med) / mad))"
        ),
        blanks: [
          { accept: ["380 378\n[5208, 5062]\n1.8750\n-2.3607"], lines: 4 }
        ],
        hint: {
          en: "380 rows have both a deposit and a rent. Two of the ratios are not whole months &mdash; and you already know which two listings in this chapter carry a rent that is not a rent. For the last two lines, Q1 is 153.75, Q3 is 255.00, the median is 200.0 and the MAD is 50.0.",
          ar: "‏380 صفًّا لها تأمين وإيجار معًا. ونسبتان ليستا شهورًا صحيحة &mdash; وأنت تعرف أصلًا أي إعلانين في هذا الفصل يحملان إيجارًا ليس إيجارًا. وأما السطران الأخيران فـQ1 هو 153.75 وQ3 هو 255.00 والوسيط 200.0 والانحرافُ المطلق الوسيطي 50.0."
        },
        explain: {
          en: "378 of the 380 recorded pairs are exactly one, two or three months, and the two exceptions are precisely the chapter's two rent errors: listing&nbsp;5208 at 5.4000 months (135 shekels of deposit against a 25-shekel &ldquo;rent&rdquo;) and listing&nbsp;5062 at 0.0015 (150 against a phone number). The last two lines are why that matters. The lower fence is 1.8750, so in this column the fence can only ever flag from above &mdash; all twelve of its flags are high &mdash; and the robust z is &minus;2.3607 against a threshold of 3.5, which reads &ldquo;a bit cheap&rdquo;. No statistic computed on the rent column alone reaches a daily rate; one ratio across two columns does. Two cautions the lesson is careful about. The arithmetic is a disguise: nothing in any file says a deposit is a whole number of months, so which pairs relate, what the relation is and how exact it has to be are all domain knowledge. And the check must run <em>here</em>, in stage&nbsp;2 &mdash; Lesson&nbsp;2's deposit rule computes a blank deposit as <code>months &times; monthly_rent</code> for 117 of the flats, so run afterwards the ratio would be testing its own fill.",
          ar: "‏378 من الأزواج الـ380 المسجّلة هي شهرٌ أو شهران أو ثلاثة بالضبط، والاستثناءان هما بعينهما خطأا الإيجار في هذا الفصل: الإعلان&nbsp;5208 عند 5.4000 شهرًا (135 شيكلًا تأمينًا مقابل «إيجار» 25) والإعلان&nbsp;5062 عند 0.0015 (150 مقابل رقم هاتف). والسطران الأخيران هما سببُ أهمية ذلك. فالسياجُ الأدنى 1.8750، فلا يستطيع السياجُ في هذا العمود أن يعلّم إلا من فوق &mdash; وأعلامُه الاثنا عشر كلها عالية &mdash; وz الحصينة &minus;2.3607 مقابل عتبة 3.5، وهي تقول «رخيصٌ قليلًا». ولا يبلغ أي إحصاء يُحسب على عمود الإيجار وحده أجرةً يومية؛ وتبلغها نسبةٌ واحدة بين عمودين. وتحذيران يحرص الدرس عليهما. الحسابُ تلبيس: فليس في أي ملف ما يقول إن التأمين عددٌ صحيح من الشهور، فأيُّ الأزواج يترابط وما العلاقة وكم يلزم أن تكون مضبوطة، كلُّها معرفةٌ ميدانية. وينبغي أن يُشغَّل الفحصُ <em>هنا</em>، في المرحلة&nbsp;2 &mdash; فقاعدةُ التأمين في الدرس&nbsp;2 تحسب التأمينَ الفارغ <code>months &times; monthly_rent</code> لـ117 من الشقق، فلو شُغِّل بعدها لكانت النسبةُ تختبر تعويضَها هي."
        }
      },

      /* ---------------------------------------------------------- 04 */
      {
        id: "t2cx04", type: "mcq", level: "hard",
        topics: ["t2-target-encoding", "t2-other-bucket", "t2-held-out-check"],
        q: {
          en: "Six encodings of <code>agency</code>, each scored on rows nobody fitted anything on, and the whole comparison repeated for <code>random_state</code> 0 to 9 because a single split cannot separate numbers this close. Mean held-out MAE over the ten splits: <strong>one constant 61.26</strong>; leaky target encoding (fitted on all 459 labelled rows) 61.20; frequency encoding 62.11; one-hot of the top&nbsp;5 plus <code>Other</code> 62.20; full one-hot of all eighteen 63.58; honest out-of-fold target encoding 63.63. Against the constant, the four honest encodings win in 1, 2, 2 and 1 of the ten splits; the leaky one wins in 6. Which reading is correct?",
          ar: "ستةُ ترميزات لـ<code>agency</code>، كلٌّ مقيسٌ على صفوف لم يضبط عليها أحدٌ شيئًا، وأُعيدت المقارنةُ كلها لـ<code>random_state</code> من 0 إلى 9 لأن تقسيمًا واحدًا لا يفرّق بين أرقامٍ بهذا التقارب. متوسطُ MAE المحجوز على التقسيمات العشر: <strong>ثابتٌ واحد 61.26</strong>؛ والترميزُ بالهدف المتسرّب (مضبوطًا على الصفوف الـ459 المُلافتة كلها) 61.20؛ والترميزُ بالتكرار 62.11؛ والترميزُ الأحادي لأكبر&nbsp;5 مع <code>Other</code> 62.20؛ والترميزُ الأحادي الكامل للثماني عشرة 63.58؛ والترميزُ بالهدف الأمين خارج الطيّة 63.63. ومقابل الثابت تفوز الترميزاتُ الأمينة الأربعة في 1 و2 و2 و1 من التقسيمات العشر؛ ويفوز المتسرّبُ في 6. أي قراءة صحيحة؟"
        },
        options: [
          {
            en: "Frequency encoding is the best honest encoder at 62.11, so it is the one to ship: one column, no leak, and its gap to the constant is well inside the ruler's noise.",
            ar: "الترميزُ بالتكرار أفضلُ مُرمِّز أمين عند 62.11، فهو ما يُشحَن: عمودٌ واحد وبلا تسرّب، وفجوتُه إلى الثابت داخلَ ضجيج المسطرة جيدًا."
          },
          {
            en: "The full one-hot lost at 63.58 because eighteen columns over 480 rows is too many parameters, and bucketing the tail fixes that &mdash; which is why top&nbsp;5 plus <code>Other</code> reads 62.20.",
            ar: "خسر الترميزُ الأحادي الكامل عند 63.58 لأن ثمانية عشر عمودًا على 480 صفًّا وسائطُ أكثر من اللازم، ويُصلح ذلك جمعُ الذيل في دلو &mdash; ولهذا يقرأ أكبر&nbsp;5 مع <code>Other</code> 62.20."
          },
          {
            en: "Ten splits cannot separate 61.20 from 61.26, so the leak left no trace in the measurement, and the honest conclusion is that leakage does not matter for a one-column encoder.",
            ar: "عشرُ تقسيمات لا تفرّق 61.20 من 61.26، فلم يترك التسرّبُ أثرًا في القياس، والاستنتاجُ الأمين أن التسرّب لا يهمّ في مُرمِّزٍ بعمود واحد."
          },
          {
            en: "The only row that beats predicting one constant is the one that is cheating, so the right answer for <code>agency</code> on this file is not to encode it at all. The leaky column is computed from the rents of the very rows it is applied to, so its 61.20 measures nothing; and the win counts are the trace of that &mdash; 6 of ten against 1 or 2. Lesson&nbsp;1 said the same thing from another direction (a median per agency moved the held-out error from 60.17 to 62.25) and so did Lesson&nbsp;2 (the deposit correlates 0.6034 with the rent and 0.1375 with its own agency's mean): the agency predicts <em>whether</em> a value is missing far better than it predicts what the value is.",
            ar: "السطرُ الوحيد الذي يتغلّب على التنبؤ بثابتٍ واحد هو الذي يغشّ، فالجوابُ الصحيح لـ<code>agency</code> في هذا الملف ألّا تُرمَّز أصلًا. فالعمودُ المتسرّب محسوبٌ من إيجارات الصفوف نفسها التي يُطبَّق عليها، فـ61.20 عنده لا تقيس شيئًا؛ وأعدادُ الفوز هي أثرُ ذلك &mdash; 6 من عشر مقابل 1 أو 2. وقال الدرس&nbsp;1 الشيءَ نفسه من جهة أخرى (وسيطٌ لكل وكالة نقل الخطأ المحجوز من 60.17 إلى 62.25) وكذلك الدرس&nbsp;2 (يرتبط التأمينُ 0.6034 بالإيجار و0.1375 بمتوسط وكالته): فالوكالةُ تتنبأ <em>هل</em> القيمةُ مفقودة أحسنَ بكثير من تنبّئها بما هي القيمة."
          }
        ],
        answer: 3,
        hint: {
          en: "Read the table as a ladder and notice where the constant sits in it. Then ask what the leaky encoder's column is a function of, and whether a number produced that way can be compared with the others at all.",
          ar: "اقرأ الجدولَ سُلّمًا ولاحظ موضعَ الثابت فيه. ثم اسأل عن أيِّ شيء يكون عمودُ المُرمِّز المتسرّب دالةً، وهل يمكن مقارنةُ رقمٍ أُنتج هكذا بالبقية أصلًا."
        },
        explain: {
          en: "Every honest encoding of <code>agency</code> in that table makes the held-out error <em>worse</em> than knowing nothing about the agency at all, and the one row that beats the constant beats it by cheating: target encoding fitted on all 459 labelled rows gives each flat a column built from its own rent, which is why its fitted line comes back as intercept 0.000000 and slope 1.000000 &mdash; the signature of the leak. So the lowest held-out number in the table is the fraud, and the right decision for this column on this file is to leave it out. The answer about frequency encoding is the tempting one because its first half is true &mdash; it is the best of the honest encoders, and that was not the prediction &mdash; but &ldquo;inside the noise&rdquo; is a reason not to add a column, never a reason to add one. The bucket answer gets the mechanism right and the conclusion wrong: pooling the tail does lift 63.58 to 62.20, and 62.20 still loses to encoding nothing. And the near-tie answer draws exactly the wrong lesson: a leaked measurement cannot detect leakage, which is why you prevent it by construction and never by inspection.",
          ar: "كلُّ ترميزٍ أمين لـ<code>agency</code> في ذلك الجدول يجعل الخطأ المحجوز <em>أسوأ</em> من ألّا تعرف عن الوكالة شيئًا، والسطرُ الوحيد الذي يتغلّب على الثابت يتغلّب عليه بالغشّ: فالترميزُ بالهدف مضبوطًا على الصفوف الـ459 المُلافتة كلها يعطي كل شقة عمودًا مبنيًّا من إيجارها، ولهذا يعود خطُّه المضبوط بمقطع 0.000000 وميل 1.000000 &mdash; وهي بصمةُ التسرّب. فأدنى رقمٍ محجوز في الجدول هو الاحتيال، والقرارُ الصحيح لهذا العمود في هذا الملف تركُه خارجًا. والجوابُ عن الترميز بالتكرار هو المغري لأن نصفه الأول صحيح &mdash; فهو أفضلُ المُرمِّزات الأمينة، وما كان ذلك متوقعًا &mdash; لكن «داخل الضجيج» سببٌ لعدم إضافة عمود لا سببٌ لإضافته. وجوابُ الدلو يصيب الآليةَ ويخطئ الاستنتاج: فجمعُ الذيل يرفع 63.58 إلى 62.20 فعلًا، و62.20 ما زالت تخسر أمام ألّا ترمّز شيئًا. وجوابُ التعادل القريب يستخلص الدرسَ الخاطئ بعينه: فالقياسُ المتسرّب لا يكشف التسرّب، ولهذا تمنعه بالبناء لا بالتفتيش أبدًا."
        }
      },

      /* ---------------------------------------------------------- 05 */
      {
        id: "t2cx05", type: "error", level: "hard",
        topics: ["t2-dedupe-before-split", "t2-raw-key-merge", "t2-merge-defences"],
        q: {
          en: "The script should enrich the listings from the reference table and then hold a quarter of the <em>flats</em> back. <code>make_comparable</code> is the chapter's stages&nbsp;1 and&nbsp;2: it canonicalises the city, turns 503 rows into one row per flat, and learns nothing, so it may be run on any frame. The script raises nothing and prints the three numbers in the comment. <strong>Click every line that is wrong.</strong>",
          ar: "ينبغي للبرنامج أن يُثري الإعلانات من جدول المرجع ثم يحجز ربعَ <em>الشقق</em>. و<code>make_comparable</code> هي المرحلتان&nbsp;1 و&nbsp;2 في الفصل: تُعيِّر المدينة وتحوّل 503 صفوف إلى صفٍّ لكل شقة ولا تتعلّم شيئًا، فيجوز تشغيلها على أي جدول. ولا يرفع البرنامجُ شيئًا ويطبع الأرقامَ الثلاثة في التعليق. <strong>انقر كل سطر مخطئ.</strong>"
        },
        code: code(
          "raw = pd.read_csv(\"listings_raw.csv\")        # 503 rows, 480 real flats",
          "ref = pd.read_csv(\"city_reference.csv\")      # one row per city, canonically spelled",
          "",
          "enriched = raw.merge(ref, on=\"city\", how=\"inner\")",
          "",
          "train = enriched.sample(frac=0.75, random_state=3)",
          "held  = enriched.drop(train.index)",
          "",
          "train = make_comparable(train)[0]",
          "held  = make_comparable(held)[0]",
          "",
          "print(\"rows\", len(enriched), \"train\", len(train), \"held out\", len(held))",
          "print(\"flats in both halves:\",",
          "      len(set(train[\"listing_id\"]) & set(held[\"listing_id\"])))",
          "",
          "# rows 316 train 229 held out 78",
          "# flats in both halves: 5"
        ),
        answer: [4, 6],
        solution: {
          code: code(
            "raw = pd.read_csv(\"listings_raw.csv\")        # 503 rows, 480 real flats",
            "ref = pd.read_csv(\"city_reference.csv\")      # one row per city, canonically spelled",
            "",
            "flats = make_comparable(raw)[0]              # stages 1 and 2 FIRST: 503 rows -> 480 flats",
            "",
            "n = len(flats)",
            "enriched = flats.merge(ref, on=\"city\", how=\"left\", validate=\"m:1\", indicator=True)",
            "assert len(enriched) == n, \"the reference join changed the row count\"",
            "",
            "train = enriched.sample(frac=0.75, random_state=3)",
            "held  = enriched.drop(train.index)",
            "",
            "print(\"rows\", len(enriched), \"train\", len(train), \"held out\", len(held))",
            "print(\"unmatched:\", int((enriched[\"_merge\"] == \"left_only\").sum()))",
            "print(\"flats in both halves:\",",
            "      len(set(train[\"listing_id\"]) & set(held[\"listing_id\"])))"
          ),
          out: code(
            "rows 480 train 360 held out 120",
            "unmatched: 0",
            "flats in both halves: 0"
          ),
          en: "Two lines, two different ways of being wrong. The join must be <code>how=\"left\"</code> on a <em>canonical</em> city, defended by <code>validate=\"m:1\"</code> and a row-count assertion; and the split must be taken after stage&nbsp;1, on flats rather than on rows.",
          ar: "سطران وطريقتان مختلفتان للخطأ. فلا بد أن يكون الدمج <code>how=\"left\"</code> على مدينةٍ <em>معيارية</em>، محصَّنًا بـ<code>validate=\"m:1\"</code> وتأكيدٍ لعدد الصفوف؛ ولا بد أن يُؤخذ التقسيمُ بعد المرحلة&nbsp;1، على شقق لا على صفوف."
        },
        hint: {
          en: "Two numbers in the comment are the evidence. 316 is not 503 &mdash; what did the join match on, and what does an inner join do with a row that matches nothing? And the last number is not 0 &mdash; the file holds 503 rows and 480 flats, so which of the two was split?",
          ar: "رقمان في التعليق هما الدليل. فـ316 ليست 503 &mdash; على أي شيء دمج، وما يفعله الدمجُ الداخلي بصفٍّ لا يوافق شيئًا؟ والرقمُ الأخير ليس 0 &mdash; فالملفّ فيه 503 صفوف و480 شقة، فأيُّهما قُسِّم؟"
        },
        explain: {
          en: "The join is on the <em>raw</em> city, where five canonical cities wear 26 spellings, so only the 316 rows that happen to be spelled canonically match, and <code>how=\"inner\"</code> deletes the other 187 without a word. It even looks like an improvement: one of the rows it throws away is listing&nbsp;5062, whose rent is a phone number, so the mean rent reads 213.39 instead of 416.32. The repair is to canonicalise first and then join with <code>how=\"left\"</code>, <code>validate=\"m:1\"</code> and an assertion on the row count &mdash; a merge is the only operation that can both delete rows and duplicate them, and the duplication direction is the one <code>indicator=</code> cannot see. The second line is subtler and worse: the 503 rows describe 480 flats, so a split taken before stage&nbsp;1 straddles the 14 byte-for-byte repeats and the 9 reposts, and the same flat lands in both halves. That is leakage of the crudest possible kind &mdash; the model is tested on flats it was trained on &mdash; and nothing in the output hints at it, because both frames have exactly the shapes you expected. On the full 503 rows the same seed puts ten flats on both sides; deduplicate first and it is zero. Deduplicate before you split, always, and in that order.",
          ar: "الدمجُ على المدينة <em>الخام</em>، حيث تلبس خمسُ مدن معيارية 26 تهجئة، فلا توافق إلا الصفوفُ الـ316 التي وافق أن تهجئتها معيارية، ويحذف <code>how=\"inner\"</code> الـ187 الأخرى بلا كلمة. بل يبدو ذلك تحسينًا: فأحدُ الصفوف التي يرميها هو الإعلان&nbsp;5062 الذي إيجارُه رقمُ هاتف، فيقرأ متوسطُ الإيجار 213.39 بدل 416.32. والإصلاحُ أن تُعيِّر أولًا ثم تدمج بـ<code>how=\"left\"</code> و<code>validate=\"m:1\"</code> وتأكيدٍ لعدد الصفوف &mdash; فالدمجُ هو العملية الوحيدة التي تستطيع حذفَ الصفوف وتكرارَها معًا، وجهةُ التكرار هي التي لا يراها <code>indicator=</code>. والسطرُ الثاني أخفى وأسوأ: فالصفوف الـ503 تصف 480 شقة، فتقسيمٌ يُؤخذ قبل المرحلة&nbsp;1 يشطر المكرَّرات الأربعةَ عشر حرفًا بحرف وإعاداتِ النشر التسع، فتهبط الشقةُ نفسها في الشطرين. وذلك تسرّبٌ من أفجّ ما يكون &mdash; فيُختبر النموذجُ على شقق دُرِّب عليها &mdash; ولا شيء في المخرَج يُلمّح إليه، لأن للجدولين بالضبط الأشكالَ التي توقعتها. وعلى الصفوف الـ503 كلها تضع البذرةُ نفسها عشرَ شقق في الجهتين؛ واحذف المكرّر أولًا فتصير صفرًا. احذف المكرّر قبل أن تقسم، دائمًا، وبهذا الترتيب."
        }
      },

      /* ---------------------------------------------------------- 06 */
      {
        id: "t2cx06", type: "match", level: "medium",
        topics: ["t2-actions-measured", "t2-held-out-check", "t2-target-encoding"],
        q: {
          en: "Five numbers from this chapter that look like progress. Match each one to the reason it is not, and to the honest figure beside it.",
          ar: "خمسةُ أرقام من هذا الفصل تبدو تقدّمًا. وصّل كلًّا منها بسببِ ألّا يكون كذلك، وبالرقم الأمين بجانبه."
        },
        leftHead: { en: "The number that looks like progress", ar: "الرقم الذي يبدو تقدّمًا" },
        rightHead: { en: "Why it is not, and the honest figure", ar: "لماذا ليس كذلك، والرقم الأمين" },
        pairs: [
          {
            l: {
              en: "55.47 shekels held out, after dropping every row the fence flagged",
              ar: "‏55.47 شيكلًا محجوزًا، بعد حذف كل صفٍّ علّمه السياج"
            },
            r: {
              en: "the three flagged <em>held-out</em> flats went with the rest, so it scored itself on 117 rents instead of 120; removing in the training rows only reads 60.00",
              ar: "ذهبت الشققُ الثلاث <em>المحجوزة</em> المعلَّمة مع البقية، فقاس نفسه على 117 إيجارًا بدل 120؛ والحذفُ من صفوف التدريب وحدها يقرأ 60.00"
            }
          },
          {
            l: {
              en: "61.20 shekels over ten splits, from a single target-encoded <code>agency</code> column",
              ar: "‏61.20 شيكلًا على عشر تقسيمات، من عمود <code>agency</code> واحد مرمَّز بالهدف"
            },
            r: {
              en: "the column is computed from the rents of the rows it is applied to, so it is the answer wearing a feature's clothes; out of fold it reads 63.63 and one constant reads 61.26",
              ar: "العمودُ محسوبٌ من إيجارات الصفوف التي يُطبَّق عليها، فهو الجوابُ في ثوب خاصية؛ وخارج الطيّة يقرأ 63.63 والثابتُ الواحد يقرأ 61.26"
            }
          },
          {
            l: {
              en: "35.63 shekels held out, after adding <code>deposit</code> to the ten-column matrix",
              ar: "‏35.63 شيكلًا محجوزًا، بعد إضافة <code>deposit</code> إلى المصفوفة ذات الأعمدة العشرة"
            },
            r: {
              en: "for 87 of the 360 training flats Lesson&nbsp;2's rule computed that deposit as a multiple of the rent, and you will not have it when you need the prediction; without it the matrix reads 36.96",
              ar: "في 87 من شقق التدريب الـ360 حسبت قاعدةُ الدرس&nbsp;2 ذلك التأمينَ مضاعفًا للإيجار، ولن يكون عندك حين تحتاج التنبؤ؛ وبدونه تقرأ المصفوفةُ 36.96"
            }
          },
          {
            l: {
              en: "53.57 shekels of training error, from a median per raw city spelling",
              ar: "‏53.57 شيكلًا من خطأ التدريب، من وسيطٍ لكل تهجئة مدينة خام"
            },
            r: {
              en: "26 groups over the training rows memorise spellings rather than cities; held out it reads 59.45, while the five canonical cities read 58.23",
              ar: "‏26 مجموعة على صفوف التدريب تحفظ التهجئات لا المدن؛ ومحجوزًا يقرأ 59.45، على حين تقرأ المدنُ المعيارية الخمس 58.23"
            }
          },
          {
            l: {
              en: "0.0000 shekels of training error, from a median per <code>listing_id</code>",
              ar: "‏0.0000 شيكل من خطأ التدريب، من وسيطٍ لكل <code>listing_id</code>"
            },
            r: {
              en: "one fitted parameter per row is a lookup table wearing a model's clothes; only 10 of the 126 held-out listings carry an id the fit has ever seen",
              ar: "وسيطٌ مضبوط لكل صف جدولُ بحثٍ في ثوب نموذج؛ ولا يحمل إلا 10 من الإعلانات الـ126 المحجوزة معرّفًا رآه الضبطُ قط"
            }
          }
        ],
        hint: {
          en: "Three of these five are the same failure in three costumes: the measurement itself moved. For each, ask what the number was computed <em>over</em>, and whether the thing being measured could have known the answer in advance.",
          ar: "ثلاثةٌ من هذه الخمسة عطبٌ واحد في ثلاثة أثواب: فقد تحرّك القياسُ نفسه. فاسأل عن كلٍّ: على ماذا حُسب الرقم، وهل كان لِما يُقاس أن يعرف الجوابَ مسبقًا."
        },
        explain: {
          en: "Three different ways a better number means a worse method. The first changes the <em>exam</em>: delete the flagged rows everywhere and the three expensive held-out flats asking 400, 420 and 475 shekels are no longer in the evaluation set, so 96% of the apparent 4.70-shekel gain is the test getting shorter. The second and third change the <em>feature</em>: a column computed from the target is the answer, whether it comes from a target encoder or from Lesson&nbsp;2's deposit rule, and both flatter the held-out score as well as the training one, which is why &ldquo;it improved both columns&rdquo; is not a defence. The last two change the <em>number of parameters</em>: 26 city spellings and 480 listing ids both fit the training rows beautifully and have nothing to say about a row they have not seen. The habits that catch all five: report train and held out together, never change the denominator mid-comparison (<code>assert len(test) == N_TEST</code>), and ask of every feature whether you will have it at the moment you need the prediction.",
          ar: "ثلاثُ طرق مختلفة يكون فيها الرقمُ الأفضل منهجًا أسوأ. فالأولى تغيّر <em>الامتحان</em>: احذف الصفوفَ المعلَّمة في كل مكان فتخرج الشققُ الثلاث المحجوزة الغالية التي تطلب 400 و420 و475 شيكلًا من مجموعة التقييم، فيكون 96% من الكسب الظاهر البالغ 4.70 شيكلًا هو قِصَرُ الاختبار. والثانية والثالثة تغيّران <em>الخاصية</em>: فعمودٌ محسوب من الهدف هو الجواب، سواء جاء من مُرمِّز بالهدف أو من قاعدة التأمين في الدرس&nbsp;2، وكلاهما يُجمّل الدرجةَ المحجوزة كما يُجمّل التدريبية، ولهذا لا يكون «حسّن العمودين» دفاعًا. والأخيران يغيّران <em>عددَ الوسائط</em>: فستٌّ وعشرون تهجئة مدينة و480 معرّف إعلان كلاهما يضبط صفوفَ التدريب ضبطًا بديعًا ولا يقول شيئًا عن صفٍّ لم يره. والعاداتُ التي تمسك الخمسة جميعًا: أبلغ التدريبَ والمحجوزَ معًا، ولا تغيّر المقسومَ عليه في منتصف مقارنة (<code>assert len(test) == N_TEST</code>)، واسأل عن كل خاصية هل ستكون عندك في اللحظة التي تحتاج فيها التنبؤ."
        }
      },

      /* ---------------------------------------------------------- 07 */
      {
        id: "t2cx07", type: "tf", level: "easy",
        topics: ["t2-train-only-removal", "t2-actions-measured"],
        q: {
          en: "Two outlier actions on the same 503-row frame, with the fence fitted on the 363 training rents and thirteen rows flagged. Dropping <em>every</em> flagged row reads 55.47 shekels of held-out error; dropping only the flagged <em>training</em> rows reads 60.00, against 60.17 for keeping everything. <strong>True or false:</strong> 55.47 is the lowest number on the same ruler, so dropping every flagged row is the better of the two actions.",
          ar: "عملان على الشواذّ في الجدول ذي الـ503 صفوف نفسه، والسياجُ مضبوطٌ على إيجارات التدريب الـ363 وثلاثةَ عشر صفًّا معلَّمًا. فحذفُ <em>كل</em> صف معلَّم يقرأ 55.47 شيكلًا من الخطأ المحجوز؛ وحذفُ صفوف <em>التدريب</em> المعلَّمة وحدها يقرأ 60.00، مقابل 60.17 لإبقاء كل شيء. <strong>صح أم خطأ:</strong> ‏55.47 أدنى رقم على المسطرة نفسها، فحذفُ كل صف معلَّم هو الأفضل من العملين."
        },
        truth: false,
        hint: {
          en: "It is not the same ruler. Count the held-out rents each of the two numbers was averaged over.",
          ar: "ليست المسطرةَ نفسها. فعُدَّ الإيجاراتِ المحجوزة التي حُسب عليها متوسطُ كلٍّ من الرقمين."
        },
        explain: {
          en: "55.47 was averaged over 117 held-out rents and 60.00 over 120. Three of the flagged rows were held-out flats &mdash; they ask 400, 420 and 475 shekels &mdash; so dropping the flagged rows everywhere did not make the predictions better, it deleted the three hardest questions from the exam. The honest gain over keeping everything is 60.17 to 60.00, seventeen agorot, comfortably inside the shekel-or-two noise of a single split on 120 rows. Hence the rule: repair anywhere &mdash; voiding an impossible value and converting a dunum area are pure applies that may touch every row &mdash; but <em>remove</em> only in the training rows, because removing a held-out row changes the measurement rather than the method. The cheap defence is one line: <code>assert len(test) == N_TEST</code>. And these are eleven real families' homes; a model that never sees a rent above 406.875 reports the top of this market as nonexistent.",
          ar: "حُسب متوسطُ 55.47 على 117 إيجارًا محجوزًا و60.00 على 120. وثلاثةٌ من الصفوف المعلَّمة كانت شققًا محجوزة &mdash; تطلب 400 و420 و475 شيكلًا &mdash; فحذفُ الصفوف المعلَّمة في كل مكان لم يجوّد التنبؤات، بل حذف أصعبَ ثلاثة أسئلة من الامتحان. والكسبُ الأمين على إبقاء كل شيء من 60.17 إلى 60.00، سبعةَ عشر أغورة، داخلَ ضجيج الشيكل أو الشيكلين لتقسيمٍ واحد على 120 صفًّا بأريحية. ومن ثَمّ القاعدة: أصلِح في أي مكان &mdash; فإبطالُ قيمة مستحيلة وتحويلُ مساحة بالدونم تطبيقان محضان يجوز أن يمسّا كل صف &mdash; أما <em>الإزالة</em> ففي صفوف التدريب وحدها، لأن إزالةَ صفٍّ محجوز تغيّر القياسَ لا المنهج. والدفاعُ الرخيص سطرٌ واحد: <code>assert len(test) == N_TEST</code>. وهذه بيوتُ إحدى عشرة أسرة حقيقية؛ ونموذجٌ لا يرى إيجارًا فوق 406.875 يُبلّغ أن أعلى هذه السوق غيرُ موجود."
        }
      },

      /* ---------------------------------------------------------- 08 */
      {
        id: "t2cx08", type: "trace", level: "hard",
        topics: ["t2-zscore-breaks", "t2-robust-z", "t2-pipeline-order"],
        q: {
          en: "The textbook outlier rule, asked whether a worse typo would make it work. The column is the 484 published rents of the raw file, whose largest value is listing&nbsp;5062's 99999 &mdash; a phone number typed into a rent field. <code>worse</code> is the same column with that one cell made two digits longer. After the last line has run, what are the values of the four variables?",
          ar: "قاعدةُ الشواذّ المدرسية، مسؤولةً هل كان خطأُ إدخال أسوأ سيجعلها تعمل. العمودُ هو الإيجارات الـ484 المنشورة في الملف الخام، وأكبرُ قيمة فيه 99999 في الإعلان&nbsp;5062 &mdash; رقمُ هاتف كُتب في خانة إيجار. و<code>worse</code> هو العمودُ نفسه وقد صارت تلك الخليةُ الواحدة أطولَ برقمين. بعد تنفيذ السطر الأخير، ما قيم المتغيّرات الأربعة؟"
        },
        code: code(
          "r = raw[\"monthly_rent\"].dropna()        # 484 rents; mean 416.3202, std 4536.5870",
          "n = len(r)",
          "",
          "cap     = (n - 1) / np.sqrt(n)          # the algebraic ceiling on any one value's |z|",
          "z_now   = ((r - r.mean()) / r.std()).max()",
          "",
          "worse   = r.replace(99999.0, 9999999.0)   # the same typo, two digits longer",
          "z_worse = ((worse - worse.mean()) / worse.std()).max()",
          "",
          "flags   = int((((worse - worse.mean()) / worse.std()).abs() > 3).sum())"
        ),
        blanks: [
          { accept: ["21.9545", "21.95", "21.954545", "21.9545454545"],
            label: { en: "cap", ar: "cap" } },
          { accept: ["21.9510", "21.951", "21.95"],
            label: { en: "z_now", ar: "z_now" } },
          { accept: ["21.9545", "21.95", "21.954545"],
            label: { en: "z_worse", ar: "z_worse" } },
          { accept: ["1"], label: { en: "flags", ar: "flags" } }
        ],
        hint: {
          en: "<code>n</code> is 484, so the ceiling is 483 divided by 22. Then ask what the standard deviation in the denominator is made of when one value is a thousand times every other: as that value grows, which grows faster &mdash; the numerator or the divisor?",
          ar: "‏<code>n</code> هو 484، فالسقفُ 483 مقسومًا على 22. ثم اسأل مِمَّ يتكوّن الانحرافُ المعياري في المقام حين تكون قيمةٌ واحدة ألفَ ضعف كل ما عداها: فحين تنمو تلك القيمة، أيُّهما ينمو أسرع &mdash; البسطُ أم المقسومُ عليه؟"
        },
        explain: {
          en: "<code>cap</code> is 21.9545, <code>z_now</code> is 21.9510, <code>z_worse</code> is 21.9545 and <code>flags</code> is 1. The z-score divides a distance from the mean by a standard deviation computed from the same values, so a single dominating value is measured against its own distance: as it grows, the numerator and the divisor grow together, and its |z| climbs towards (n&nbsp;&minus;&nbsp;1)/&radic;n and never past it. On 484 rents that ceiling is 21.9545, and the 99999 already scores 21.9510 &mdash; 99.98% of the way there. So making the typo a hundred times worse moves the score by three ten-thousandths and the flag count not at all: <code>|z| &gt; 3</code> reports exactly one outlier whatever you type in that cell, while the IQR fence on the same column flags twelve. The rule is calibrated by its own target, and the fix is not a different threshold. Either repair the value first &mdash; void it in stage&nbsp;2 and <code>|z| &gt; 3</code> flags six of the eleven genuinely expensive flats, because the std falls from 4536.5870 to 81.4615 &mdash; or use a statistic that cannot be moved by one cell: the robust z's median is 200.0 and its MAD is 50.0 with the phone number in the column or out of it, because moving one of 484 distances cannot move their median.",
          ar: "‏<code>cap</code> هو 21.9545 و<code>z_now</code> هو 21.9510 و<code>z_worse</code> هو 21.9545 و<code>flags</code> هو 1. فالدرجةُ المعيارية تقسم بُعدًا عن المتوسط على انحرافٍ معياري محسوبٍ من القيم نفسها، فتُقاس القيمةُ المتغلّبة الواحدة في مقابل بُعدها هي: فحين تنمو ينمو البسطُ والمقسومُ عليه معًا، فتصعد |z| عندها نحو (n&nbsp;&minus;&nbsp;1)/&radic;n ولا تتجاوزه قط. وعلى 484 إيجارًا ذلك السقفُ 21.9545، و99999 تسجّل 21.9510 أصلًا &mdash; أي 99.98% من الطريق. فجعلُ خطأ الإدخال أسوأ مئة مرة ينقل الدرجةَ ثلاثةَ أعشار الألف ولا ينقل عددَ الأعلام شيئًا: فـ<code>|z| &gt; 3</code> تُبلّغ عن شاذٍّ واحد بالضبط مهما كتبت في تلك الخلية، على حين يعلّم سياجُ المدى الربيعي على العمود نفسه اثني عشر. فالقاعدةُ معيَّرة بهدفها هي، وليس العلاجُ عتبةً أخرى. فإما أن تُصلح القيمةَ أولًا &mdash; أبطِلها في المرحلة&nbsp;2 فتعلّم <code>|z| &gt; 3</code> ستًّا من الشقق الإحدى عشرة الغالية حقًّا، لأن الانحراف ينزل من 4536.5870 إلى 81.4615 &mdash; وإما أن تستخدم إحصاءً لا تحرّكه خليةٌ واحدة: فوسيطُ z الحصينة 200.0 وانحرافُها المطلق الوسيطي 50.0 برقم الهاتف في العمود أو بدونه، لأن تحريكَ بُعدٍ من 484 بُعدًا لا يحرّك وسيطَها."
        }
      },

      /* ---------------------------------------------------------- 09 */
      {
        id: "t2cx09", type: "compare", level: "hard",
        topics: ["t2-groupby-nan-bug", "t2-index-alignment", "t2-transform"],
        q: {
          en: "The same mistake twice: assigning the result of a <code>groupby</code> straight into a column. A's frame keeps the file's own row labels; B's has been reindexed to 0&hellip;479 first. Both run, both print, neither warns. Which statement is correct?",
          ar: "الخطأ نفسه مرتين: إسنادُ ناتج <code>groupby</code> مباشرةً إلى عمود. فجدولُ A يُبقي لافتات صفوف الملف نفسها؛ وجدولُ B أُعيد ترقيمه إلى 0&hellip;479 أولًا. وكلاهما يعمل ويطبع ولا يحذّر أيٌّ منهما."
        },
        codeA: code(
          "flats = make_comparable(\"listings_raw.csv\")[0]       # 480 flats; labels are the file's row numbers",
          "",
          "flats[\"city_median\"] = flats.groupby(\"city\")[\"monthly_rent\"].median()",
          "print(\"filled:\", int(flats[\"city_median\"].notna().sum()), \"of\", len(flats))",
          "",
          "# filled: 0 of 480"
        ),
        codeB: code(
          "rows = make_comparable(\"listings_raw.csv\")[0].reset_index(drop=True)   # labels 0 ... 479",
          "",
          "rows[\"rooms_median\"] = rows.groupby(\"rooms\")[\"monthly_rent\"].median()",
          "print(\"filled:\", int(rows[\"rooms_median\"].notna().sum()), \"of\", len(rows))",
          "",
          "# filled: 5 of 480"
        ),
        options: [
          {
            en: "A fails because <code>city</code> is text and B works because <code>rooms</code> is numeric, so the fix is to cast the group key to a number before assigning.",
            ar: "‏A تفشل لأن <code>city</code> نصّ وB تعمل لأن <code>rooms</code> رقمي، فالإصلاحُ أن تحوّل مفتاحَ المجموعة إلى رقم قبل الإسناد."
          },
          {
            en: "Both are the same bug &mdash; an assignment aligns by index <em>label</em>, and a <code>groupby</code> result is indexed by the group key &mdash; and B is the dangerous one. A's keys are city names, which match no row label, so every cell comes out blank and you find out at once. B's keys are the room counts 1.0 to 5.0, which do look like row labels, so five cells get a number: the median rent of whatever room count shares that label, right only when the label happens to equal that row's own <code>rooms</code>. 475 blanks and a few numbers that are right by luck is harder to notice than 480 blanks. Both are fixed by <code>transform(\"median\")</code>, which returns one value per original row.",
            ar: "كلتاهما العطبُ نفسه &mdash; فالإسنادُ يصطفّ بـ<em>لافتة</em> الفهرس، وناتجُ <code>groupby</code> مفهرسٌ بمفتاح المجموعة &mdash; وB هي الخطيرة. فمفاتيحُ A أسماءُ مدن لا توافق أي لافتة صف، فتخرج كل خلية فارغة فتعرف فورًا. ومفاتيحُ B أعدادُ الغرف 1.0 إلى 5.0، وهي تشبه لافتاتِ الصفوف فعلًا، فتأخذ خمسُ خلايا رقمًا: وسيطَ إيجار أيِّ عدد غرف يشترك في تلك اللافتة، صحيحًا فقط حين توافق اللافتةُ <code>rooms</code> ذلك الصف. و475 فراغًا وبضعةُ أرقام صحيحة بالحظ أصعبُ ملاحظةً من 480 فراغًا. ويُصلح كلتيهما <code>transform(\"median\")</code> التي تعيد قيمةً لكل صف أصلي."
          },
          {
            en: "Both are fixed by calling <code>.reset_index()</code> on the <code>groupby</code> result, which turns the group key back into a column so that pandas can align on it.",
            ar: "يُصلح كلتيهما نداءُ <code>.reset_index()</code> على ناتج <code>groupby</code>، فيعيد مفتاحَ المجموعة عمودًا فتستطيع pandas الاصطفافَ عليه."
          },
          {
            en: "A is the dangerous one: 0 of 480 is a number the pipeline's blank-cell assertion cannot see, while B's five filled cells raise a <code>SettingWithCopyWarning</code> that tells you to look.",
            ar: "‏A هي الخطيرة: فـ0 من 480 رقمٌ لا يراه تأكيدُ الخلايا الفارغة في المسار، على حين ترفع خلايا B الخمس المملوءة <code>SettingWithCopyWarning</code> يخبرك أن تنظر."
          }
        ],
        answer: 1,
        hint: {
          en: "Print the index of <code>flats.groupby(\"city\")[\"monthly_rent\"].median()</code> and the index of the frame, and ask what pandas does when it is told to line up two objects whose labels do not overlap. Then ask which of A's and B's two index sets <em>partly</em> overlap.",
          ar: "اطبع فهرسَ <code>flats.groupby(\"city\")[\"monthly_rent\"].median()</code> وفهرسَ الجدول، واسأل ما تفعله pandas حين يُطلب منها أن تصفّ شيئين لا تتقاطع لافتاتهما. ثم اسأل أيُّ مجموعتي فهارس في A وB تتقاطعان <em>جزئيًّا</em>."
        },
        explain: {
          en: "An assignment into a column aligns by index label &mdash; that is the definition of assignment in pandas, so neither version can warn &mdash; and a <code>groupby</code> aggregation is indexed by the group key, which is a city name in A and a room count in B. A's five city names overlap none of the 480 integer labels, so all 480 cells are blank: loud, immediate, harmless. B's keys are 1.0 to 5.0, which overlap the row labels 1 to 5, so five cells receive a number that has nothing to do with the flat on that row &mdash; it is the median rent of the room count that happens to share the label. Occasionally a filled cell is right, and that is luck, not correctness. 475 blanks would fail the pipeline's &ldquo;no blank cell in the matrix&rdquo; assertion; a quiet handful of plausible numbers in a column you then use as a feature would not. The casting answer is tempting because it describes the symptom accurately and draws the wrong conclusion: B did not work. <code>reset_index()</code> turns the aggregation into a two-column DataFrame, which is a type error rather than an alignment fix. And <code>SettingWithCopyWarning</code> is about writing into a slice, not about alignment. The two-second check is <code>s.index.equals(df.index)</code>; the habit is that if you are assigning the result of a <code>groupby</code>, you wanted <code>transform</code>.",
          ar: "الإسنادُ إلى عمود يصطفّ بلافتة الفهرس &mdash; وهذا تعريفُ الإسناد في pandas، فلا تستطيع أي نسخة أن تحذّر &mdash; وتجميعُ <code>groupby</code> مفهرسٌ بمفتاح المجموعة، وهو اسمُ مدينة في A وعددُ غرف في B. وأسماءُ مدن A الخمسة لا تتقاطع مع أي من اللافتات الصحيحة الـ480، فتكون الخلايا الـ480 كلها فارغة: صاخبٌ وفوريٌّ وغيرُ ضار. ومفاتيحُ B هي 1.0 إلى 5.0، وهي تتقاطع مع لافتات الصفوف 1 إلى 5، فتتلقى خمسُ خلايا رقمًا لا علاقة له بالشقة في ذلك الصف &mdash; إنه وسيطُ إيجار عدد الغرف الذي وافق أن يشترك في اللافتة. وقد تكون الخليةُ المملوءة صحيحةً أحيانًا، وذاك حظٌّ لا صحة. و475 فراغًا كانت ستُفشل تأكيدَ «لا خليةَ فارغة في المصفوفة» في المسار؛ أما حفنةٌ هادئة من أرقام معقولة في عمود تستخدمه خاصيةً بعد ذلك فلا. وجوابُ التحويل مغرٍ لأنه يصف العَرَضَ بدقة ويستخلص الاستنتاجَ الخاطئ: فـB لم تعمل. و<code>reset_index()</code> يحوّل التجميعَ إلى جدولٍ بعمودين، وهذا خطأُ نوع لا إصلاحُ اصطفاف. و<code>SettingWithCopyWarning</code> عن الكتابة في شريحة لا عن الاصطفاف. والفحصُ في ثانيتين <code>s.index.equals(df.index)</code>؛ والعادةُ أنك إذا كنت تُسند ناتجَ <code>groupby</code> فأنت أردت <code>transform</code>."
        }
      },

      /* ---------------------------------------------------------- 10 */
      {
        id: "t2cx10", type: "multi", level: "hard",
        topics: ["t2-domain-limit", "t2-robust-z", "t2-log1p"],
        q: {
          en: "Listing&nbsp;5208 is a flat in Rafah with four rooms and 89.3&nbsp;m&sup2;, and its <code>monthly_rent</code> is 25 &mdash; a daily rate typed into a monthly field. Which of these statements about it are true? (Choose all that apply.)",
          ar: "الإعلان&nbsp;5208 شقةٌ في رفح بأربع غرف و89.3&nbsp;م&sup2;، و<code>monthly_rent</code> عندها 25 &mdash; أجرةٌ يومية كُتبت في خانة شهرية. أي العبارات عنه صحيح؟ (اختر كل ما ينطبق.)"
        },
        options: [
          {
            en: "The <code>1.5&nbsp;&times;&nbsp;IQR</code> fence on the raw rent column cannot reach it: with Q1 at 153.75 and an IQR of 101.25 the lower fence is 1.8750, below anything anyone could type into a rent field, so in this column the fence can only ever flag from above &mdash; all twelve of its flags are high.",
            ar: "لا يبلغه سياجُ <code>1.5&nbsp;&times;&nbsp;IQR</code> على عمود الإيجار الخام: فمع Q1 عند 153.75 ومدًى ربيعي 101.25 يكون السياجُ الأدنى 1.8750، أي دون أي شيء يستطيع أحدٌ كتابته في خانة إيجار، فلا يستطيع السياجُ في هذا العمود أن يعلّم إلا من فوق &mdash; وأعلامُه الاثنا عشر كلها عالية."
          },
          {
            en: "Its robust z is &minus;2.3607 against a threshold of 3.5, and dropping the threshold below 2.36 to catch it would flag 24 rents, about 5% of the column.",
            ar: "‏z الحصينة عنده &minus;2.3607 مقابل عتبة 3.5، وإنزالُ العتبة دون 2.36 لالتقاطه كان سيعلّم 24 إيجارًا، نحو 5% من العمود."
          },
          {
            en: "<code>deposit / monthly_rent</code> does reach it: the ratio is exactly 1, 2 or 3 in 378 of the 380 recorded pairs, and here it is 5.4000.",
            ar: "و<code>deposit / monthly_rent</code> يبلغه فعلًا: فالنسبةُ هي 1 أو 2 أو 3 بالضبط في 378 من الأزواج الـ380 المسجّلة، وهي هنا 5.4000."
          },
          {
            en: "The <code>1.5&nbsp;&times;&nbsp;IQR</code> fence on <code>np.log1p(monthly_rent)</code> does reach it: the fences come back at 71.71 and 543.78 shekels and flag eight values, five of them low &mdash; taking logs is what makes the lower fence bite.",
            ar: "وسياجُ <code>1.5&nbsp;&times;&nbsp;IQR</code> على <code>np.log1p(monthly_rent)</code> يبلغه فعلًا: فيعود السياجان عند 71.71 و543.78 شيكلًا ويعلّمان ثماني قيم خمسٌ منها منخفضة &mdash; وأخذُ اللوغاريتم هو ما يجعل السياجَ الأدنى يَعضّ."
          },
          {
            en: "It is an outlier in the statistical sense, so the right action is the chapter's default for an outlier: flag it and keep the value, because a rare value may still be real.",
            ar: "هو شاذٌّ بالمعنى الإحصائي، فالعملُ الصحيح هو الافتراضيّ في الفصل للشاذّ: علّمه وأبقِ القيمة، لأن القيمةَ النادرة قد تكون حقيقية."
          },
          {
            en: "The ratio check is pure arithmetic, so unlike <code>LIMITS</code> it needs no domain knowledge: the file itself tells you a deposit is a whole number of months.",
            ar: "فحصُ النسبة حسابٌ محض، فهو بخلاف <code>LIMITS</code> لا يحتاج معرفةً ميدانية: فالملفُّ نفسه يخبرك أن التأمين عددٌ صحيح من الشهور."
          }
        ],
        answer: [0, 1, 2, 3],
        hint: {
          en: "Four of the six are measurements you could run on the file. The two that are not ask you to classify the 25 &mdash; which of this chapter's three kinds of outlier is it? &mdash; and to say where the sentence &ldquo;a deposit is one, two or three months' rent&rdquo; actually comes from.",
          ar: "أربعةٌ من الستة قياساتٌ تستطيع تشغيلها على الملف. والاثنان الآخران يطلبان منك أن تصنّف الـ25 &mdash; أيُّ أنواع الشواذّ الثلاثة في هذا الفصل هو؟ &mdash; وأن تقول من أين تأتي جملةُ «التأمين شهرٌ أو شهران أو ثلاثة» حقًّا."
        },
        explain: {
          en: "The four true statements are four different rules, and only two of them find the daily rate. The fence on the raw column is structurally blind here: its lower edge is 1.8750, so no rent anybody could write falls below it, and every one of its twelve flags is high. The robust z is correct and unhelpful &mdash; &minus;2.3607 means &ldquo;a bit cheap&rdquo;, and buying the 25 by lowering the threshold costs 24 flagged rents for a human to read. What does work is a cross-column ratio (5.4000 months against the 378-of-380 rule) and, interestingly, the fence computed on <code>log1p</code>, where the lower fence rises from 1.88 to 71.71 shekels and finally bites. The two false statements are the ones worth the mistake. The 25 is not a rare-but-real value, it is a <em>wrong value</em> &mdash; this chapter keeps the three kinds apart precisely because they need different actions, and a wrong value is voided in stage&nbsp;2, applied to every row including the held-out ones, while a rare-but-real value is flagged and kept and removed, if at all, from the training rows only. And the ratio check is domain knowledge wearing an arithmetic disguise: nothing in any file says which columns relate, that the relation is a whole multiple, or how exact it must be. Those three facts came from the market, the same place <code>LIMITS</code>'s six numbers came from.",
          ar: "العباراتُ الصحيحة الأربع أربعُ قواعد مختلفة، ولا يجد الأجرةَ اليومية منها إلا اثنتان. فالسياجُ على العمود الخام أعمى بنيويًّا هنا: حدُّه الأدنى 1.8750، فلا يقع دونه إيجارٌ يستطيع أحدٌ كتابته، وكلُّ أعلامه الاثني عشر عالية. وz الحصينة صحيحةٌ وغيرُ مُجدية &mdash; فـ&minus;2.3607 تعني «رخيصٌ قليلًا»، وشراءُ الـ25 بإنزال العتبة يكلّف 24 إيجارًا معلَّمًا ليقرأها إنسان. والذي يعمل فعلًا نسبةٌ عابرة للأعمدة (5.4000 شهرًا مقابل قاعدة 378 من 380)، وكذلك &mdash; وهذا طريف &mdash; السياجُ محسوبًا على <code>log1p</code>، حيث يصعد السياجُ الأدنى من 1.88 إلى 71.71 شيكلًا فيَعضّ أخيرًا. والعبارتان الخاطئتان تستحقّان الخطأ. فالـ25 ليست قيمةً نادرة لكنها حقيقية، بل <em>قيمةٌ خاطئة</em> &mdash; وهذا الفصل يفصل الأنواعَ الثلاثة بالضبط لأنها تحتاج أعمالًا مختلفة، فالقيمةُ الخاطئة تُبطَل في المرحلة&nbsp;2 مطبَّقةً على كل صف بما فيها المحجوزة، أما النادرةُ الحقيقية فتُعلَّم وتُبقى وتُزال &mdash; إن أُزيلت &mdash; من صفوف التدريب وحدها. وفحصُ النسبة معرفةٌ ميدانية في ثوب حساب: فليس في أي ملف ما يقول أيُّ الأعمدة يترابط، ولا أن العلاقةَ مضاعفٌ صحيح، ولا كم يلزم أن تكون مضبوطة. وهذه الوقائعُ الثلاث جاءت من السوق، وهو المكانُ نفسه الذي جاءت منه أرقامُ <code>LIMITS</code> الستة."
        }
      },

      /* ---------------------------------------------------------- 11 */
      {
        id: "t2cx11", type: "contrast", level: "medium",
        topics: ["t2-normalisation", "t2-floor-decision", "t2-mad-constant"],
        q: {
          en: "Every repair in this chapter is made of two kinds of thing, and Lesson&nbsp;3 insists on keeping them apart: a <em>rule</em>, which follows from the notation or the unit and which nobody could disagree with, and a <em>decision</em>, which is a human claim about this market or this source. Place each statement under the rule, under the decision, or under both.",
          ar: "كلُّ إصلاح في هذا الفصل مصنوعٌ من نوعين من الأشياء، ويُلحّ الدرس&nbsp;3 على الفصل بينهما: <em>قاعدةٌ</em> تتبع الكتابةَ أو الوحدة ولا يستطيع أحدٌ أن يخالفها، و<em>قرارٌ</em> هو ادّعاءٌ بشري عن هذه السوق أو عن هذا المصدر. ضع كل عبارة تحت القاعدة أو تحت القرار أو تحت كليهما."
        },
        concepts: [
          {
            en: "A <strong>rule</strong> &mdash; it follows from the notation, the unit or the arithmetic, so there is nothing in it for a reviewer to disagree with",
            ar: "<strong>قاعدة</strong> &mdash; تتبع الكتابةَ أو الوحدة أو الحساب، فليس فيها ما يخالفه مراجع"
          },
          {
            en: "A <strong>decision</strong> &mdash; a claim about Gaza's rental market or about the site this file was scraped from, which another analyst could read and argue with",
            ar: "<strong>قرار</strong> &mdash; ادّعاءٌ عن سوق الإيجار في غزة أو عن الموقع الذي سُحب منه هذا الملف، يستطيع محلّلٌ آخر أن يقرأه ويجادل فيه"
          }
        ],
        rows: [
          {
            s: {
              en: "<code>.str.strip().str.lower()</code> and collapsing runs of spaces, which takes <code>city</code> from 26 strings to 11",
              ar: "‏<code>.str.strip().str.lower()</code> وضغطُ سلاسل المسافات، وهو ما ينقل <code>city</code> من 26 نصًّا إلى 11"
            },
            a: 0
          },
          {
            s: {
              en: "<code>CITY_MAP</code>'s eleven keys resolving to five names, which is the step from 11 to 5 &mdash; because <code>khan yunis</code> and <code>khan younis</code> differ by more than formatting",
              ar: "مفاتيحُ <code>CITY_MAP</code> الأحد عشر وهي تُحسم إلى خمسة أسماء، وهذه هي الخطوةُ من 11 إلى 5 &mdash; لأن <code>khan yunis</code> و<code>khan younis</code> تختلفان بأكثر من التنسيق"
            },
            a: 1
          },
          {
            s: {
              en: "<code>.str.title()</code>, which looks like the first kind and belongs to the second: it asserts that case is the <em>only</em> difference two spellings can have, and it renames 40 correctly spelled <code>Deir al-Balah</code> rows",
              ar: "‏<code>.str.title()</code> التي تبدو من النوع الأول وهي من الثاني: فهي تزعم أن حالةَ الأحرف هي الفرقُ <em>الوحيد</em> الذي قد يكون بين تهجئتين، وتعيد تسميةَ 40 صفًّا مهجّأً بصواب إلى <code>Deir al-Balah</code>"
            },
            a: 1
          },
          {
            s: {
              en: "The <code>0.6745</code> the robust z multiplies by: the quartiles of a standard normal sit at &plusmn;0.674490 standard deviations and the MAD of a normal <em>is</em> that distance, so the constant turns a MAD of 50.0 into an implied standard deviation of 74.1290",
              ar: "العاملُ <code>0.6745</code> الذي تضرب به z الحصينة: فأرباعُ التوزيع المعياري تقع عند &plusmn;0.674490 انحرافًا معياريًّا، والانحرافُ المطلق الوسيطي لتوزيعٍ معياري <em>هو</em> تلك المسافة، فيحوّل الثابتُ انحرافًا مطلقًا وسيطيًّا 50.0 إلى انحرافٍ معياري ضمني 74.1290"
            },
            a: 0
          },
          {
            s: {
              en: "Multiplying the five areas that were recorded in dunum by 1000, because one dunum <em>is</em> a thousand square metres",
              ar: "ضربُ المساحات الخمس المسجّلة بالدونم في 1000، لأن الدونمَ <em>هو</em> ألفُ متر مربع"
            },
            a: 0
          },
          {
            s: {
              en: "<code>AREA_MIN_M2 = 5</code>, the threshold that decides <em>which</em> areas get multiplied &mdash; so a genuine four-square-metre storage room would be turned into four thousand",
              ar: "‏<code>AREA_MIN_M2 = 5</code>، العتبةُ التي تحدّد <em>أيَّ</em> المساحات تُضرَب &mdash; فغرفةُ تخزينٍ حقيقية بأربعة أمتار مربعة كانت ستصير أربعةَ آلاف"
            },
            a: 1
          },
          {
            s: {
              en: "Belongs in the log with a count beside it, and is carried to next month's file unchanged rather than re-derived from it",
              ar: "مكانُه السجلُّ وبجانبه عدد، ويُحمَل إلى ملف الشهر القادم بلا تغيير بدل أن يُستنبَط منه"
            },
            a: 2
          }
        ],
        hint: {
          en: "One test separates almost all of them: could a second analyst, reading your code and knowing this market, reasonably have written something else? Two rows are the ones students get backwards &mdash; one piece of arithmetic that looks like a judgement, and one tidy-looking string method that is a claim about meaning.",
          ar: "فحصٌ واحد يفصل معظمَها: هل كان لمحلّل ثانٍ، يقرأ كودك ويعرف هذه السوق، أن يكتب شيئًا آخر على وجه معقول؟ وسطران هما ما يقلبه الطلاب &mdash; حسابٌ يبدو حكمًا، وتابعُ نصوصٍ أنيقُ المظهر هو ادّعاءٌ عن المعنى."
        },
        explain: {
          en: "This is the shape of every repair in the chapter: normalise by rule, finish by map, and report what the map did not cover. A rule follows from the notation or the unit &mdash; lower-casing removes a difference that was never meaning, and one dunum is a thousand square metres by definition, so neither can be wrong about a flat. A decision is a sentence about the world: that <code>khan yunis</code> and <code>khan younis</code> are one city, that a ground floor is floor zero, that nothing under five square metres is a real area. Decisions are not defects &mdash; the chapter's whole argument is that they should be written down, counted and reviewable rather than hidden inside an operator &mdash; but they can be wrong, and a reviewer has to be able to find them. The two rows students get backwards are the ones to carry away. <code>.str.title()</code> wears the costume of a rule and is a decision, and a damaging one: it claims case is the only difference, which leaves eleven groups instead of five, and it renames 40 already-correct rows because the canonical spelling of Deir al-Balah carries a lower-case Arabic article &mdash; the same defect Practical&nbsp;1 Lesson&nbsp;6 admitted when its rule&nbsp;R4 turned 76 correct &ldquo;Water 500ml&rdquo; lines into &ldquo;Water 500Ml&rdquo;. And the 0.6745 that scales the MAD goes the other way: it looks like a tuning knob and is a unit conversion, because the quartiles of a standard normal sit at &plusmn;0.674490 standard deviations and the MAD of a normal <em>is</em> that distance, so <code>MAD / 0.6745</code> turns 50.0 into an implied standard deviation of 74.1290. The <code>3.5</code> it is then compared against is a convention, and so are the six numbers in <code>LIMITS</code> &mdash; while masking a cell that falls outside bounds already written down is pure arithmetic. The last row is true of both kinds, and it is the chapter's answer to all of this: whichever a step is made of, it belongs in the log and in <code>fitted</code>, not in somebody's memory.",
          ar: "هذا هو شكلُ كل إصلاح في الفصل: عيّر بقاعدة، وأتمِم بخريطة، وأبلِغ عما لم تغطّه الخريطة. فالقاعدةُ تتبع الكتابةَ أو الوحدة &mdash; فتصغيرُ الأحرف يُزيل فرقًا لم يكن معنًى قط، والدونمُ ألفُ متر مربع بالتعريف، فلا يستطيع أيٌّ منهما أن يُخطئ في حقّ شقة. وأما القرارُ فجملةٌ عن العالم: أن <code>khan yunis</code> و<code>khan younis</code> مدينةٌ واحدة، وأن الطابقَ الأرضي هو الطابقُ صفر، وأن ما دون خمسة أمتار مربعة ليس مساحةً حقيقية. والقراراتُ ليست عيوبًا &mdash; فحجّةُ الفصل كلها أنها ينبغي أن تُكتب وتُعدّ وتُراجَع لا أن تُخبَّأ داخل مُعامِل &mdash; لكنها قد تكون خاطئة، ولا بد أن يستطيع المراجعُ أن يجدها. والسطران الذان يقلبهما الطلابُ هما ما يُحمَل من هذا السؤال. فـ<code>.str.title()</code> تلبس ثوبَ القاعدة وهي قرار، وقرارٌ ضار: إذ تزعم أن حالةَ الأحرف هي الفرقُ الوحيد، فتترك إحدى عشرة مجموعة بدل خمس، وتعيد تسميةَ 40 صفًّا صحيحًا أصلًا لأن التهجئةَ المعيارية لدير البلح تحمل أداةَ تعريف عربية صغيرة &mdash; وهو العطبُ نفسه الذي أقرّ به العملي&nbsp;1 الدرس&nbsp;6 حين حوّلت قاعدتُه&nbsp;R4 ستةً وسبعين سطرًا صحيحًا من «Water 500ml» إلى «Water 500Ml». والعاملُ 0.6745 الذي يقيس الانحرافَ المطلق الوسيطي يسير في الاتجاه المضادّ: فهو يبدو مفتاحَ ضبطٍ وهو تحويلُ وحدات، لأن أرباعَ التوزيع المعياري تقع عند &plusmn;0.674490 انحرافًا معياريًّا، والانحرافُ المطلق الوسيطي لتوزيعٍ معياري <em>هو</em> تلك المسافة، فتحوّل <code>MAD / 0.6745</code> القيمةَ 50.0 إلى انحرافٍ معياري ضمني 74.1290. أما الـ<code>3.5</code> التي تُقارن به بعد ذلك فعُرف، وكذلك الأرقامُ الستة في <code>LIMITS</code> &mdash; على حين أن حجبَ خليةٍ تقع خارج حدودٍ مكتوبةٍ أصلًا حسابٌ محض. والسطرُ الأخير صحيحٌ للنوعين، وهو جوابُ الفصل عن هذا كله: فمن أيٍّ منهما كانت الخطوةُ مصنوعة، فمكانُها السجلُّ و<code>fitted</code> لا ذاكرةُ أحد."
        }
      },
      /* ---------------------------------------------------------- 12 */
      {
        id: "t2cx12", type: "output", level: "hard",
        topics: ["t2-canonical-map", "t2-city-spellings", "p1-rules-r1-r5"],
        q: {
          en: "Write exactly what the program prints. This is the thread back to rule&nbsp;R4 of <a href=\"#p1-lesson-06\">Practical&nbsp;1 Lesson&nbsp;6</a>, where <code>item.str.strip().str.title()</code> was one line applied to every row of the cafeteria's item column. Here the same rule meets the 503 raw city values, beside the canonical map that replaced it. <code>canonicalise</code> strips, lower-cases and collapses runs of spaces, then maps through <code>CITY_MAP</code>'s eleven keys; it leaves nothing unmatched on this file. The canonical spelling of one city carries a lower-case Arabic article.",
          ar: "اكتب بالضبط ما يطبعه البرنامج. هذا هو الخيطُ رجوعًا إلى القاعدة&nbsp;R4 في <a href=\"#p1-lesson-06\">العملي&nbsp;1 الدرس&nbsp;6</a>، حيث كانت <code>item.str.strip().str.title()</code> سطرًا واحدًا مطبَّقًا على كل صف من عمود الصنف في المقصف. وهنا تلقى القاعدةُ نفسها قيمَ المدن الخام الـ503، بجانب الخريطة المعيارية التي حلّت محلها. و<code>canonicalise</code> تشذّب وتصغّر وتضغط سلاسلَ المسافات ثم تربط عبر مفاتيح <code>CITY_MAP</code> الأحد عشر؛ ولا تترك شيئًا غير مطابق في هذا الملف. والتهجئةُ المعيارية لإحدى المدن تحمل أداةَ تعريف عربية صغيرة."
        },
        code: code(
          "city   = raw[\"city\"]",
          "titled = city.str.strip().str.title()              # Practical 1 Lesson 6, rule R4",
          "canon  = canonicalise(city, CITY_MAP)[0]           # Theory 2 Lesson 3",
          "",
          "print(city.nunique(), titled.nunique(), canon.nunique())",
          "print(int((titled != city).sum()), int((canon != city).sum()))",
          "print(int(((city == canon) & (titled != canon)).sum()))"
        ),
        blanks: [
          { accept: ["26 11 5\n169 187\n40"], lines: 3 }
        ],
        hint: {
          en: "The first line is the headline of the whole thread: 26 spellings, and what each rule gets them down to. For the last line, ask which rows are <em>already</em> spelled the canonical way &mdash; and what Title Case does to <code>Deir al-Balah</code>.",
          ar: "السطرُ الأول هو عنوانُ الخيط كله: ستٌّ وعشرون تهجئة، وإلامَ تُنزلها كلُّ قاعدة. وأما السطرُ الأخير فاسأل أيُّ الصفوف مهجّأةٌ <em>أصلًا</em> بالطريقة المعيارية &mdash; وما تفعله Title Case بـ<code>Deir al-Balah</code>."
        },
        explain: {
          en: "Title Case gets 26 spellings down to 11 and stops, because the six transliteration collisions &mdash; Khan Younis / Khan-Younis / Khan Yunis, Jabalia / Jabalya / Jabaliya, Deir al-Balah / Deir al Balah / Deir-al-Balah &mdash; differ by more than case, and no rule about letters can decide that they are three cities rather than nine. 169 rows change, and the 40 is the cost nobody counts: 316 of the 503 rows arrive already canonical, and because the canonical spelling of Deir al-Balah has a lower-case Arabic article, <code>.title()</code> turns all 40 of its correct rows into <code>Deir Al-Balah</code> &mdash; a label nothing else recognises. That is precisely the defect Practical&nbsp;1 Lesson&nbsp;6 admitted in its own appendix, where R4 renamed 76 correct &ldquo;Water 500ml&rdquo; lines to &ldquo;Water 500Ml&rdquo; and matched nothing in the raw menu. The canonical map changes more rows (187) and damages none, because it splits the job in two: a rule removes differences that are formatting, an explicit map resolves differences that are decisions, and the step reports what the map did not cover. On the ruler the two are almost indistinguishable &mdash; 58.5619 against 58.2301 held out, inside the noise &mdash; which is the honest point: the payoff is not accuracy, it is five stable columns instead of twenty-six unstable ones, a key that joins to <code>city_reference.csv</code>, and a column that is comparable with next month's.",
          ar: "تُنزل Title Case ستًّا وعشرين تهجئة إلى إحدى عشرة ثم تتوقف، لأن تصادماتِ النقل الحرفي الستة &mdash; Khan Younis / Khan-Younis / Khan Yunis، وJabalia / Jabalya / Jabaliya، وDeir al-Balah / Deir al Balah / Deir-al-Balah &mdash; تختلف بأكثر من حالة الأحرف، ولا تستطيع قاعدةٌ عن الحروف أن تقرّر أنها ثلاثُ مدن لا تسع. وتتغير 169 صفًّا، والأربعون هي الثمنُ الذي لا يعدّه أحد: فـ316 من الصفوف الـ503 تصل معيارية أصلًا، ولأن التهجئةَ المعيارية لـDeir al-Balah فيها أداةُ تعريف عربية صغيرة، تحوّل <code>.title()</code> صفوفَها الأربعين الصحيحة كلها إلى <code>Deir Al-Balah</code> &mdash; لافتةٌ لا يعرفها شيءٌ آخر. وهذا بعينه العطبُ الذي أقرّ به العملي&nbsp;1 الدرس&nbsp;6 في ملحقه، حيث أعادت R4 تسمية 76 سطرًا صحيحًا من «Water 500ml» إلى «Water 500Ml» فلم توافق شيئًا في قائمة الطعام الخام. والخريطةُ المعيارية تغيّر صفوفًا أكثر (187) ولا تُفسد شيئًا، لأنها تشطر العملَ شطرين: قاعدةٌ تُزيل فروقًا هي تنسيق، وخريطةٌ صريحة تحسم فروقًا هي قرارات، والخطوةُ تُبلّغ عما لم تغطّه الخريطة. وعلى المسطرة لا يكاد يُفرَّق بينهما &mdash; 58.5619 مقابل 58.2301 محجوزًا، داخلَ الضجيج &mdash; وهذه هي النقطةُ الأمينة: فالمردودُ ليس الدقّة، بل خمسةُ أعمدة مستقرّة بدل ستة وعشرين متقلّبة، ومفتاحٌ يدمج مع <code>city_reference.csv</code>، وعمودٌ قابلٌ للمقارنة بعمود الشهر القادم."
        }
      },

      /* ---------------------------------------------------------- 13 */
      {
        id: "t2cx13", type: "mcq", level: "medium",
        topics: ["t2-mechanism-evidence", "t2-mnar", "t2-missing-decision-table"],
        q: {
          en: "Your decision log has a <code>mechanism</code> column, and whatever goes in it has to survive a reviewer asking &ldquo;how do you know?&rdquo;. Which of these may you write there as a statement about this file?",
          ar: "في سجل قراراتك عمودُ <code>mechanism</code>، وما يُكتب فيه لا بد أن ينجو من مراجعٍ يسأل «وما أدراك؟». فأيُّ هذه يجوز أن تكتبه هناك عبارةً عن هذا الملف؟"
        },
        options: [
          {
            en: "<code>monthly_rent</code>: MNAR &mdash; the 19 blank-rent flats average 3.58 rooms against 3.04 and 81.5&nbsp;m&sup2; against 71.8, which proves the blank depends on the hidden rent.",
            ar: "‏<code>monthly_rent</code>: ‏MNAR &mdash; فالشققُ الـ19 الفارغةُ الإيجار متوسطُها 3.58 غرفة مقابل 3.04 و81.5&nbsp;م&sup2; مقابل 71.8، وهذا يُثبت أن الفراغ يتوقف على الإيجار المخفيّ."
          },
          {
            en: "<code>area_m2</code>: MCAR &mdash; the blank rows and the rest agree on every column compared, which establishes that the blank depends on nothing at all.",
            ar: "‏<code>area_m2</code>: ‏MCAR &mdash; فالصفوفُ الفارغة والبقية تتفق على كل عمود قُورن، وهذا يُثبت أن الفراغ لا يتوقف على شيء أصلًا."
          },
          {
            en: "<code>deposit</code>: MAR by agency &mdash; 74 of 74 rows of Noor&nbsp;Estates and 29 of 29 of Diwan&nbsp;Rentals are blank, against eighteen agencies between 0% and 11%.",
            ar: "‏<code>deposit</code>: ‏MAR بالوكالة &mdash; فـ74 من 74 صفًّا لـNoor&nbsp;Estates و29 من 29 لـDiwan&nbsp;Rentals فارغة، مقابل ثماني عشرة وكالة بين 0% و11%."
          },
          {
            en: "<code>condition</code>: the evidence is weak in every direction, so leave the column out of the log until somebody can name its mechanism.",
            ar: "‏<code>condition</code>: القرائنُ ضعيفة في كل اتجاه، فاترك العمودَ خارج السجل حتى يستطيع أحدٌ تسميةَ آليته."
          }
        ],
        answer: 2,
        hint: {
          en: "Only one of the four is a <em>count</em> you can run on the file. For the other three, ask what each would still look like if the real reason were something the file does not contain.",
          ar: "واحدٌ فقط من الأربعة <em>عدٌّ</em> تستطيع تشغيله على الملف. وأما الثلاثةُ الأخرى فاسأل كيف كان كلٌّ منها سيبدو لو كان السببُ الحقيقي شيئًا لا يحتويه الملف."
        },
        explain: {
          en: "MAR is the one mechanism you can get close to establishing, because the thing the blank depends on is a column in front of you: &ldquo;74 of 74 rows of this agency are blank&rdquo; is a count, and two agencies at exactly 100% against eighteen between 0 and 11 is a step rather than a gradient. The MNAR answer is tempting because the four comparisons really do all point one way &mdash; but proxy evidence of that kind shows dependence on columns you can <em>see</em>, which is the definition of MAR; MNAR can never be established from the file, by construction, and the actual grounds are the sentence &ldquo;the site prints price on request for premium listings&rdquo;, learned by reading the site or asking the scraper's author. The MCAR answer overstates in the other direction: MCAR cannot be proved, only failed to be disproved &mdash; a scraper that died halfway through a run, one careless agent, or flats with no floor plan would all come out flat in every in-file comparison, so the honest wording is &ldquo;consistent with MCAR, on twenty-seven rows&rdquo;. And the answer that would keep <code>condition</code> out of the log altogether gives up too early: <code>unknown</code> is a professional answer and belongs in the table, because the decision it justifies &mdash; fill 36 cells with the mode and flag them &mdash; has to be recorded whether or not anyone can name why the cells are empty.",
          ar: "‏MAR هي الآليةُ الوحيدة التي يمكنك أن تقارب إثباتها، لأن ما يتوقف عليه الفراغُ عمودٌ أمامك: فـ«74 من 74 صفًّا لهذه الوكالة فارغة» عدٌّ، ووكالتان عند 100% بالضبط مقابل ثماني عشرة بين 0 و11 درجةٌ لا تدرّج. وجوابُ MNAR مغرٍ لأن المقارناتَ الأربع تشير فعلًا إلى جهة واحدة &mdash; لكن قرينةً بالوكالة من هذا النوع تُظهر توقُّفًا على أعمدة <em>تراها</em>، وذاك تعريفُ MAR؛ وMNAR لا يمكن إثباتها من الملف قط، بحكم البناء، والمستندُ الحقيقي جملةُ «يطبع الموقع السعر عند الطلب للإعلانات الراقية»، تُعرَف بقراءة الموقع أو بسؤال من كتب الساحب. وجوابُ MCAR يبالغ في الجهة الأخرى: فـMCAR لا تُثبَت بل يُعجَز عن دحضها &mdash; فساحبٌ مات في منتصف تشغيلة، أو وكيلٌ واحد مُهمل، أو شققٌ بلا مخطّط، كلُّها كانت ستخرج مستويةً في كل مقارنة داخل الملف، فالصياغةُ الأمينة «متوافق مع MCAR، على سبعة وعشرين صفًّا». والجوابُ الذي يُخرج <code>condition</code> من السجل أصلًا يستسلم مبكرًا: فـ<code>unknown</code> جوابٌ مهنيّ ومكانُه الجدول، لأن القرارَ الذي يبرّره &mdash; عبّئ 36 خلية بالمنوال وعلّمها &mdash; لا بد أن يُسجَّل سواء استطاع أحدٌ تسميةَ سببِ فراغ الخلايا أو لا."
        }
      },

      /* ---------------------------------------------------------- 14 */
      {
        id: "t2cx14", type: "complete", level: "hard",
        topics: ["t2-group-imputation", "t2-fit-apply", "t2-transform"],
        q: {
          en: "Lesson&nbsp;2 decided that <code>area_m2</code> takes a median per room count with a global fallback, and Lesson&nbsp;1 decided that a fitted parameter is read and never recomputed. Complete the one line so that the step prints the commented output &mdash; and so that handing it the held-out flats or June's batch could not change a single parameter.",
          ar: "قرّر الدرس&nbsp;2 أن <code>area_m2</code> تأخذ وسيطًا لكل عدد غرف مع بديل عامّ، وقرّر الدرس&nbsp;1 أن الوسيطَ المضبوط يُقرأ ولا يُعاد حسابه قط. أكمل السطرَ الواحد ليطبع البرنامجُ المخرَجَ في التعليق &mdash; وبحيث لا يستطيع تسليمُه الشققَ المحجوزة أو دفعةَ حزيران أن يغيّر وسيطًا واحدًا."
        },
        code: code(
          "fitted = {\"area_by_rooms\": {1.0: 38.5, 2.0: 54.9, 3.0: 72.2, 4.0: 88.0, 5.0: 104.75},",
          "          \"area_median\": 74.05}        # fitted on the 360 training flats, and nowhere else",
          "",
          "def impute_area(d, f):",
          "    group  = ____1____",
          "    filled = d[\"area_m2\"].fillna(group).fillna(f[\"area_median\"])",
          "    return d.assign(area_m2=filled, area_was_missing=d[\"area_m2\"].isna()), {",
          "        \"step\": \"impute area_m2\", \"rows_in\": len(d), \"rows_out\": len(d),",
          "        \"cells\": int(d[\"area_m2\"].isna().sum()),",
          "        \"fell back\": int((d[\"area_m2\"].isna() & group.isna()).sum())}",
          "",
          "out, row = impute_area(flats, fitted)      # flats: the 480 March flats, 26 blank areas",
          "print(row)",
          "print(\"still blank:\", int(out[\"area_m2\"].isna().sum()))",
          "",
          "# {'step': 'impute area_m2', 'rows_in': 480, 'rows_out': 480, 'cells': 26, 'fell back': 0}",
          "# still blank: 0"
        ),
        options: [
          { code: "d.groupby(\"rooms\")[\"area_m2\"].transform(\"median\")" },
          { code: "d.groupby(\"rooms\")[\"area_m2\"].median()" },
          { code: "d[\"rooms\"].map(f[\"area_by_rooms\"])" },
          { code: "d[\"area_m2\"].fillna(f[\"area_median\"]).groupby(d[\"rooms\"]).transform(\"median\")" }
        ],
        answer: 2,
        solution: {
          code: code(
            "def impute_area(d, f):",
            "    group  = d[\"rooms\"].map(f[\"area_by_rooms\"])     # a LOOKUP: one value per row, learned elsewhere",
            "    filled = d[\"area_m2\"].fillna(group).fillna(f[\"area_median\"])",
            "    return d.assign(area_m2=filled, area_was_missing=d[\"area_m2\"].isna()), {",
            "        \"step\": \"impute area_m2\", \"rows_in\": len(d), \"rows_out\": len(d),",
            "        \"cells\": int(d[\"area_m2\"].isna().sum()),",
            "        \"fell back\": int((d[\"area_m2\"].isna() & group.isna()).sum())}"
          ),
          out: code(
            "{'step': 'impute area_m2', 'rows_in': 480, 'rows_out': 480, 'cells': 26, 'fell back': 0}",
            "still blank: 0"
          ),
          en: "<code>.map()</code> against the stored dictionary is a lookup, not a computation: it returns one value per original row (so <code>fillna</code> aligns) and it cannot see any other row, so the step is a pure apply whatever frame it is handed.",
          ar: "‏<code>.map()</code> في مقابل القاموس المخزَّن بحثٌ لا حساب: يعيد قيمةً لكل صف أصلي (فتصطفّ <code>fillna</code>) ولا يستطيع أن يرى أي صف آخر، فتكون الخطوةُ تطبيقًا محضًا على أيِّ جدول سُلِّم إليه."
        },
        hint: {
          en: "Two of the four compute the medians from the frame they are handed, which is a different thing from reading five numbers that are already written down. Of the two that do not, one returns one value per row and one returns one value per group.",
          ar: "اثنان من الأربعة يحسبان الوسائطَ من الجدول المسلَّم إليهما، وذاك شيءٌ آخر غير قراءةِ خمسة أرقام مكتوبة أصلًا. ومن الاثنين الباقيين واحدٌ يعيد قيمةً لكل صف وواحدٌ يعيد قيمةً لكل مجموعة."
        },
        explain: {
          en: "<code>d[\"rooms\"].map(f[\"area_by_rooms\"])</code> is the only completion that is both a lookup and the right shape. It reads the five numbers the fit already stored, so running the step on the held-out flats or on June cannot change a parameter &mdash; and it returns one value per original row, aligned on the frame's own index, which is what <code>fillna</code> needs. The <code>transform(\"median\")</code> completion is the tempting one, because it is the right shape and the lesson's own one-liner for exploring: handed the whole 480-flat frame it computes the five medians from rows the model will be tested on, so the fill leaks, and handed June it quietly fills June's flats with June's medians, which makes the two months incomparable for a reason no flat caused. The bare <code>.median()</code> is the alignment bug of this chapter: it is indexed by the room count, so inside <code>fillna</code> it matches by row <em>label</em>, fills a handful of cells by coincidence and leaves the rest blank &mdash; and a matrix with blank cells is exactly what the pipeline's second assertion exists to refuse. The last completion fills before it groups, so the medians are computed from values it invented. Note what the <code>fell back</code> field is for: on this file every blank area belongs to a flat with 1 to 5 rooms, so nothing falls back; on June's batch the same field is the line that would tell you a seven-room flat arrived with no area and got the global median.",
          ar: "‏<code>d[\"rooms\"].map(f[\"area_by_rooms\"])</code> هو الإكمالُ الوحيد الذي هو بحثٌ وبالشكل الصحيح معًا. فهو يقرأ الأرقامَ الخمسة التي خزّنها الضبطُ أصلًا، فلا يستطيع تشغيلُ الخطوة على الشقق المحجوزة أو على حزيران أن يغيّر وسيطًا &mdash; ويعيد قيمةً لكل صف أصلي مصطفّةً على فهرس الجدول نفسه، وهو ما تحتاجه <code>fillna</code>. وإكمالُ <code>transform(\"median\")</code> هو المغري، لأنه الشكلُ الصحيح وسطرُ الدرس نفسه للاستكشاف: فمسلَّمًا إليه الجدولُ ذو الـ480 شقة يحسب الوسائطَ الخمسة من صفوف سيُختبر عليها النموذج، فيتسرّب التعويض، ومسلَّمًا إليه حزيران يعبّئ شققَ حزيران بوسائط حزيران بهدوء، فيصير الشهران غيرَ قابلين للمقارنة لسبب لم تُحدثه شقة. و<code>.median()</code> المجرّدة هي عطبُ الاصطفاف في هذا الفصل: فهي مفهرسةٌ بعدد الغرف، فتوافق داخل <code>fillna</code> بـ<em>لافتة</em> الصف، فتعبّئ حفنةَ خلايا بالمصادفة وتترك البقيةَ فارغة &mdash; ومصفوفةٌ فيها خلايا فارغة هي بعينها ما وُجد تأكيدُ المسار الثاني لرفضه. والإكمالُ الأخير يعبّئ قبل أن يُجمّع، فتُحسب الوسائطُ من قيم اختلقها هو. ولاحظ لماذا وُجد حقلُ <code>fell back</code>: فعلى هذا الملف تنتمي كلُّ مساحة فارغة إلى شقة من غرفة إلى خمس، فلا يرتدّ شيء؛ وعلى دفعة حزيران يكون الحقلُ نفسه هو السطرَ الذي يخبرك أن شقةً بسبع غرف وصلت بلا مساحة فأخذت الوسيطَ العامّ."
        }
      },

      /* ---------------------------------------------------------- 15 */
      {
        id: "t2cx15", type: "error", level: "medium",
        topics: ["t2-fitted-categories", "t2-shape-mismatch", "t2-unseen-report"],
        q: {
          en: "<code>fitted[\"city_levels\"]</code> is the category list fitted on March's 480 flats. The step should encode any frame against that list, whatever the frame contains, and report what the list does not cover. It raises nothing, it reports Beit Lahia correctly, and it prints the two lines in the comment. Click the offending line.",
          ar: "‏<code>fitted[\"city_levels\"]</code> هي قائمةُ الفئات المضبوطة على شقق آذار الـ480. وينبغي للخطوة أن ترمّز أيَّ جدول في مقابل تلك القائمة، أيًّا كان ما فيه، وأن تُبلّغ عما لا تغطّيه القائمة. ولا ترفع شيئًا، وتُبلّغ عن Beit Lahia بصواب، وتطبع السطرين في التعليق. انقر السطر المخطئ."
        },
        code: code(
          "CITY_LEVELS = fitted[\"city_levels\"]   # ['Deir al-Balah', 'Gaza', 'Jabalia', 'Khan Younis', 'Rafah']",
          "",
          "def encode_city(d, f):",
          "    levels = sorted(set(f[\"city_levels\"]) | set(d[\"city\"].dropna()))",
          "    cats   = pd.Categorical(d[\"city\"], categories=levels)",
          "    D      = pd.get_dummies(cats, prefix=\"city\", dtype=\"int8\")",
          "    unseen = d.loc[~d[\"city\"].isin(f[\"city_levels\"]), \"city\"].value_counts()",
          "    return D, {\"step\": \"encode city\", \"columns\": D.shape[1],",
          "               \"unseen\": \"none\" if unseen.empty else unseen.to_dict()}",
          "",
          "Dm, rm = encode_city(march, fitted)   # the 480 March flats",
          "Dj, rj = encode_city(june,  fitted)   # the 85 June listings, 2 of them in Beit Lahia",
          "print(rm[\"columns\"], rj[\"columns\"])",
          "print(list(Dj.columns)[0])",
          "",
          "# 5 6",
          "# city_Beit Lahia"
        ),
        answer: 4,
        solution: {
          code: code(
            "def encode_city(d, f):",
            "    levels = list(f[\"city_levels\"])          # the fitted list, and only the fitted list",
            "    cats   = pd.Categorical(d[\"city\"], categories=levels)",
            "    D      = pd.get_dummies(cats, prefix=\"city\", dtype=\"int8\")",
            "    unseen = d.loc[~d[\"city\"].isin(f[\"city_levels\"]), \"city\"].value_counts()",
            "    return D, {\"step\": \"encode city\", \"columns\": D.shape[1],",
            "               \"all_zero_rows\": int((D.sum(axis=1) == 0).sum()),",
            "               \"unseen\": \"none\" if unseen.empty else unseen.to_dict()}"
          ),
          out: code(
            "5 5",
            "city_Deir al-Balah"
          ),
          en: "Replace the union with the stored list. June's two Beit Lahia listings then encode as five zeros, the <code>unseen</code> field names them, and the extra <code>all_zero_rows</code> count makes the hole visible in the data as well as in the report.",
          ar: "استبدل الاتحادَ بالقائمة المخزَّنة. فيُرمَّز إعلانا Beit Lahia في حزيران حينئذ خمسةَ أصفار، ويسمّيهما حقلُ <code>unseen</code>، ويجعل عدُّ <code>all_zero_rows</code> الإضافيُّ الثقبَ مرئيًّا في البيانات كما في التقرير."
        },
        hint: {
          en: "The two printed numbers should be the same number. Ask which of the two frames each line of the function is allowed to read &mdash; and what <code>sorted()</code> does to the position of a city whose name begins with B.",
          ar: "ينبغي أن يكون الرقمان المطبوعان رقمًا واحدًا. فاسأل أيَّ الجدولين يحقّ لكل سطر في الدالة أن يقرأ &mdash; وما تفعله <code>sorted()</code> بموضع مدينةٍ يبدأ اسمُها بحرف B."
        },
        explain: {
          en: "The entire point of fitting a category list is that the apply may not change it, and that line grows it from whichever frame is being encoded. March contains only the five fitted cities, so March comes out five columns wide; June brings Beit Lahia, so June comes out six &mdash; and because the list is sorted, <code>city_Beit Lahia</code> lands first and every column after it shifts by one. A model trained on March's five columns is then handed a matrix in which the weight for <code>city_Deir al-Balah</code> reads <code>city_Beit Lahia</code>, <code>city_Gaza</code>'s weight reads Deir al-Balah, and so on down the block. Nothing raises: the dtype is right, no cell is blank, and the column names are all perfectly sensible strings. Widening a fitted list is a <em>schema</em> change, not a data fix &mdash; a refit on a March matrix that holds the wider list would give that column no variance at all, since not one March flat is in Beit Lahia &mdash; so the honest options are to refit on data that contains the new city, to map it onto the governorate Jabalia already shares, or to leave the list alone, encode the two rows as five zeros and act when <code>unseen</code> reaches twenty. The step's own report was already doing the right thing; it was the encoding beside it that decided to be helpful.",
          ar: "كلُّ معنى ضبطِ قائمة فئات أنه لا يحقّ للتطبيق أن يغيّرها، وذلك السطرُ يُنمّيها من أيِّ جدول يُرمَّز. فآذار لا يحتوي إلا المدنَ الخمس المضبوطة، فيخرج آذار بعرض خمسة أعمدة؛ ويأتي حزيران بـBeit Lahia، فيخرج بستة &mdash; ولأن القائمةَ مرتَّبة تهبط <code>city_Beit Lahia</code> أولًا ويتزحزح كلُّ عمود بعدها واحدًا. فيُسلَّم نموذجٌ دُرِّب على أعمدة آذار الخمسة مصفوفةً يقرأ فيها وزنُ <code>city_Deir al-Balah</code> قيمةَ <code>city_Beit Lahia</code>، ويقرأ وزنُ <code>city_Gaza</code> قيمةَ Deir al-Balah، وهكذا إلى آخر الكتلة. ولا يرفع شيءٌ شيئًا: فالنوعُ صحيح ولا خليةَ فارغة وأسماءُ الأعمدة كلها نصوصٌ معقولة تمامًا. وتوسيعُ قائمة مضبوطة تغييرُ <em>مخطَّط</em> لا إصلاحُ بيانات &mdash; فإعادةُ الضبط على مصفوفة آذار بالقائمة الأوسع كانت ستعطي ذلك العمودَ تشتّتًا صفرًا، إذ ليست شقةٌ واحدة من آذار في Beit Lahia &mdash; فالخياراتُ الأمينة أن تعيد الضبطَ على بيانات فيها المدينةُ الجديدة، أو أن تربطها بالمحافظة التي تشاركها Jabalia أصلًا، أو أن تترك القائمةَ وترمّز الصفين خمسةَ أصفار وتتحرّك حين تبلغ <code>unseen</code> عشرين. فتقريرُ الخطوة كان يفعل الصوابَ أصلًا؛ وإنما الترميزُ بجانبه هو الذي قرّر أن يكون نافعًا."
        }
      },

      /* ---------------------------------------------------------- 16 */
      {
        id: "t2cx16", type: "mcq", level: "hard",
        topics: ["t2-fitted-in-memory", "t2-level-insertion", "t2-pipeline-assertions"],
        q: {
          en: "June's form has started offering <code>very good</code> between <code>good</code> and <code>excellent</code>, so somebody edits the module constant to <code>COND_ORDER = [\"poor\", \"fair\", \"good\", \"very good\", \"excellent\"]</code>. The stored <code>fitted</code> artefact still says four levels, and the model's weights were fitted on the four-level code. The pipeline runs on March: 480 rows in, 480 out, a matrix 480&nbsp;&times;&nbsp;18 with the same eighteen column names and no blank cell, and all three assertions pass. 75 of the 480 flats &mdash; every one of the <code>excellent</code> ones &mdash; now carry <code>condition_code</code> 4 where they carried 3, and Lesson&nbsp;5 measured the slope of that column at 25.05 shekels a step. Which statement is correct?",
          ar: "بدأ نموذجُ حزيران يعرض <code>very good</code> بين <code>good</code> و<code>excellent</code>، فيحرّر أحدُهم ثابتَ الوحدة إلى <code>COND_ORDER = [\"poor\", \"fair\", \"good\", \"very good\", \"excellent\"]</code>. وما زال أثرُ <code>fitted</code> المخزَّن يقول أربعةَ مستويات، وأوزانُ النموذج مضبوطةٌ على الرمز الرباعي. ويعمل المسارُ على آذار: 480 صفًّا داخلًا و480 خارجًا، ومصفوفةٌ 480&nbsp;&times;&nbsp;18 بأسماء الأعمدة الثمانية عشر نفسها وبلا خليةٍ فارغة، وتنجح التأكيداتُ الثلاثة كلها. و75 من الشقق الـ480 &mdash; وهي كلُّ ما هو <code>excellent</code> &mdash; تحمل الآن <code>condition_code</code> أربعةً حيث كانت تحمل ثلاثة، وقاس الدرس&nbsp;5 ميلَ ذلك العمود عند 25.05 شيكلًا للخطوة. أي عبارة صحيحة؟"
        },
        options: [
          {
            en: "The blank-cell assertion should have caught it: <code>very good</code> does not occur in March, so the 480 March flats get <code>&lt;NA&gt;</code> in <code>condition_code</code> and the matrix is full of holes.",
            ar: "كان ينبغي لتأكيد الخلايا الفارغة أن يمسكه: فـ<code>very good</code> لا تقع في آذار، فتأخذ شققُ آذار الـ480 <code>&lt;NA&gt;</code> في <code>condition_code</code> وتكون المصفوفةُ مليئةً بالثقوب."
          },
          {
            en: "The three assertions cannot see it, because an ordered code is one column whose <em>name</em> does not change when its <em>meaning</em> does. They check that the row count is unchanged since stage&nbsp;1, that no cell is blank, and that the column set equals <code>fitted[\"columns\"]</code> &mdash; and a renumbering inside a single column breaks none of the three. Had <code>condition</code> been one-hot encoded instead, a fifth level would have added a column and the column-set assertion would have fired.",
            ar: "لا تستطيع التأكيداتُ الثلاثة أن تراه، لأن الرمزَ المرتَّب عمودٌ واحد لا يتغير <em>اسمُه</em> حين يتغير <em>معناه</em>. فهي تفحص أن عددَ الصفوف لم يتغير منذ المرحلة&nbsp;1، وأن لا خليةَ فارغة، وأن مجموعةَ الأعمدة تساوي <code>fitted[\"columns\"]</code> &mdash; وإعادةُ الترقيم داخل عمود واحد لا تخرق أيًّا من الثلاثة. ولو كانت <code>condition</code> مرمَّزة ترميزًا أحاديًّا لكان مستوًى خامس قد أضاف عمودًا فانطلق تأكيدُ مجموعة الأعمدة."
          },
          {
            en: "It is not a problem as long as the whole pipeline is re-run, because the matrix and the model are then rebuilt together from the same constant.",
            ar: "ليست مشكلةً ما دام المسارُ كلُّه يُعاد تشغيله، لأن المصفوفةَ والنموذج يُعاد بناؤهما حينئذ معًا من الثابت نفسه."
          },
          {
            en: "The fix is to add <code>very good</code> to <code>fitted[\"cond_order\"]</code> as well, so that the artefact and the module agree; the codes then match and the 75 flats are correctly numbered.",
            ar: "الإصلاحُ أن تضيف <code>very good</code> إلى <code>fitted[\"cond_order\"]</code> أيضًا فيتفق الأثرُ والوحدة؛ فتتوافق الرموزُ وتُرقَّم الشققُ الـ75 ترقيمًا صحيحًا."
          }
        ],
        answer: 1,
        hint: {
          en: "List the three assertions and ask of each what it would have to compare in order to notice. Then ask what <em>would</em> have changed if the same column had been encoded as four 0/1 columns instead of one integer.",
          ar: "اسرد التأكيداتِ الثلاثة واسأل عن كلٍّ ما كان عليه أن يقارن ليلاحظ. ثم اسأل ما <em>كان</em> سيتغير لو رُمِّز العمودُ نفسه أربعةَ أعمدة 0/1 بدل عدد صحيح واحد."
        },
        explain: {
          en: "Inserting a level renumbers every level above it, so <code>excellent</code> moves from 3 to 4 and the model &mdash; still carrying weights fitted on the four-level code &mdash; over-predicts those 75 flats by one step each, about 25 shekels. The reason nothing fires is structural: the three assertions are guards on the <em>shape</em> of the answer (the row count, the absence of blanks, the column set), and an ordinal encoding puts the whole meaning of a column inside its values rather than its name. The one-hot contrast is the useful half of the insight: four 0/1 columns would have become five, <code>list(X.columns) == fitted[\"columns\"]</code> would have failed, and the stale artefact would have been caught by the cheapest check in the pipeline. The blank-cell answer is wrong because adding an unused level to a <code>CategoricalDtype</code> does not unmap anything &mdash; March's four values still have codes. Re-running everything misses the point twice: nothing stops the <em>next</em> person scoring with yesterday's weights, and nothing makes the edit visible as a diff of the artefact, which is exactly the gap Lesson&nbsp;6 admits (<code>fitted</code> is a dict in memory, undated, not attributed to a file or to 480 rows). And copying the new order into <code>fitted</code> hides the problem rather than fixing it: this is a schema change, so the honest options are a refit on five levels or mapping <code>very good</code> onto <code>good</code> and logging it. What you may not do is edit <code>COND_ORDER</code> and keep scoring with yesterday's weights.",
          ar: "إدخالُ مستوًى يعيد ترقيمَ كل مستوًى فوقه، فتنتقل <code>excellent</code> من 3 إلى 4 ويبالغ النموذجُ &mdash; وهو ما زال يحمل أوزانًا مضبوطة على الرمز الرباعي &mdash; في تنبؤ تلك الشقق الـ75 بخطوة لكلٍّ منها، نحو 25 شيكلًا. وسببُ ألّا ينطلق شيءٌ بنيويّ: فالتأكيداتُ الثلاثة حُرّاسٌ على <em>شكل</em> الجواب (عددُ الصفوف وغيابُ الفراغات ومجموعةُ الأعمدة)، والترميزُ الترتيبي يضع معنى العمود كلَّه في قيمه لا في اسمه. والمقابلةُ بالترميز الأحادي هي النصفُ المفيد من الفكرة: فأربعةُ أعمدة 0/1 كانت ستصير خمسة، وكانت <code>list(X.columns) == fitted[\"columns\"]</code> ستفشل، فيمسك الأثرَ البائتَ أرخصُ فحص في المسار. وجوابُ الخلايا الفارغة خاطئ لأن إضافةَ مستوًى غير مستخدم إلى <code>CategoricalDtype</code> لا تفكّ ربطَ شيء &mdash; فقيمُ آذار الأربع ما زالت لها رموز. وإعادةُ تشغيل كل شيء تفوت المقصودَ مرتين: فلا شيء يمنع <em>التالي</em> من التقييم بأوزان الأمس، ولا شيء يجعل التحريرَ مرئيًّا فرقًا في الأثر، وهذه بعينها الفجوةُ التي يقرّ بها الدرس&nbsp;6 (<code>fitted</code> قاموسٌ في الذاكرة، غيرُ مؤرَّخ ولا منسوب إلى ملف ولا إلى 480 صفًّا). ونسخُ الترتيب الجديد إلى <code>fitted</code> يخفي المشكلةَ لا يصلحها: فهذا تغييرُ مخطَّط، فالخياران الأمينان إعادةُ ضبطٍ على خمسة مستويات أو ربطُ <code>very good</code> بـ<code>good</code> وتسجيلُ ذلك. وما لا يجوز هو أن تحرّر <code>COND_ORDER</code> وتظلّ تقيّم بأوزان الأمس."
        }
      },

      /* ---------------------------------------------------------- 17 */
      {
        id: "t2cx17", type: "fill", level: "medium",
        topics: ["t2-merge-defences", "t2-fan-out", "t2-clean-key-merge"],
        q: {
          en: "A merge is the only operation in this chapter that can both delete rows and duplicate them, so the reference join carries three defences. Fill in the three blanks. The city column has already been canonicalised, and <code>REF</code> holds one row per city.",
          ar: "الدمجُ هو العملية الوحيدة في هذا الفصل التي تستطيع حذفَ الصفوف وتكرارَها معًا، فيحمل دمجُ المرجع ثلاثةَ تحصينات. املأ الفراغات الثلاثة. وقد عُيِّر عمودُ المدينة أصلًا، ويحمل <code>REF</code> صفًّا واحدًا لكل مدينة."
        },
        code: code(
          "n = len(flats)                       # 480 flats, city already canonical",
          "",
          "out = flats.merge(REF, on=\"city\", how=\"left\",",
          "                  validate=\"____1____\",     # one reference row per city, many flats per city",
          "                  ____2____=True)           # so an unmatched flat is counted, never guessed at",
          "",
          "____3____ len(out) == n, \"the reference join changed the row count: %d -> %d\" % (n, len(out))",
          "",
          "print(\"%d -> %d rows | unmatched %d\"",
          "      % (n, len(out), int((out[\"_merge\"] == \"left_only\").sum())))",
          "",
          "# 480 -> 480 rows | unmatched 0"
        ),
        blanks: [
          { accept: ["m:1", "m:1 ", "\"m:1\"", "'m:1'"],
            label: { en: "the relationship you are claiming", ar: "العلاقة التي تدّعيها" } },
          { accept: ["indicator"], label: { en: "the keyword that counts", ar: "الكلمة المفتاحية التي تعدّ" } },
          { accept: ["assert"], label: { en: "the statement that refuses", ar: "العبارة التي ترفض" } }
        ],
        hint: {
          en: "Name the two things that can go wrong in a merge &mdash; a row that matches nothing, and a row that matches twice &mdash; and which keyword belongs to each. The third blank is one word and it is the only one of the three that stops the program.",
          ar: "سمِّ الشيئين اللذين قد يختلّا في دمج &mdash; صفٌّ لا يوافق شيئًا، وصفٌّ يوافق مرتين &mdash; وأيُّ كلمة مفتاحية لأيٍّ منهما. والفراغُ الثالث كلمةٌ واحدة وهو الوحيد من الثلاثة الذي يوقف البرنامج."
        },
        explain: {
          en: "The three defences cover two opposite failures and overlap on purpose. <code>validate=\"m:1\"</code> is the strong one, because it fires <em>before</em> the frame exists: append a second Gaza row to the reference and it raises <code>MergeError: Merge keys are not unique in right dataset; not a many-to-one merge</code>. <code>indicator=True</code> catches the other direction &mdash; a flat whose city matches nothing &mdash; and on the raw city column it reports <code>left_only: 187</code>, which is the 187 rows an inner join would have deleted in silence. The row-count assertion is the belt to those braces, and it is not redundant: duplication is the failure <code>indicator=</code> cannot see, because a reference row that appears twice makes 644 rows of 480 flats and every one of the 644 genuinely came from both sides, so the indicator cheerfully reports <code>both: 644</code>. The fan-out is worth its own sentence: 480 flats become 644, the mean rent moves from 211.05 to 223.59 and the median from 200.0 to 210.0, and a flat duplicated before a split lands on both sides of it. Note that <code>how=\"left\"</code> promises only that no left row is lost; it never promises that no left row is duplicated.",
          ar: "التحصيناتُ الثلاثة تغطّي عطبين متعاكسين وتتداخل عن قصد. فـ<code>validate=\"m:1\"</code> هو القويّ، لأنه ينطلق <em>قبل</em> أن يوجد الجدول: أضِف صفَّ Gaza ثانيًا إلى المرجع فيرفع <code>MergeError: Merge keys are not unique in right dataset; not a many-to-one merge</code>. و<code>indicator=True</code> يمسك الجهةَ الأخرى &mdash; شقةٌ لا توافق مدينتُها شيئًا &mdash; وعلى عمود المدينة الخام يُبلّغ <code>left_only: 187</code>، وهي الصفوفُ الـ187 التي كان الدمجُ الداخلي سيحذفها بصمت. وتأكيدُ عدد الصفوف هو الحزامُ لتلك الحمّالة، وهو ليس زائدًا: فالتكرارُ هو العطبُ الذي لا يراه <code>indicator=</code>، لأن صفَّ مرجعٍ يظهر مرتين يصنع 644 صفًّا من 480 شقة وكلُّ واحد من الـ644 جاء من الجهتين حقًّا، فيُبلّغ المؤشِّرُ مطمئنًّا <code>both: 644</code>. والتمدّدُ يستحقّ جملتَه: 480 شقة تصير 644، وينتقل متوسطُ الإيجار من 211.05 إلى 223.59 والوسيطُ من 200.0 إلى 210.0، وشقةٌ كُرِّرت قبل تقسيمٍ تهبط في جهتيه. ولاحظ أن <code>how=\"left\"</code> يوعد فقط بألّا يُفقَد صفٌّ أيسر؛ ولا يوعد قط بألّا يُكرَّر صفٌّ أيسر."
        }
      },

      /* ---------------------------------------------------------- 18 */
      {
        id: "t2cx18", type: "multi", level: "hard",
        topics: ["t2-keep-last", "t2-fitted-in-memory", "t2-one-split"],
        q: {
          en: "Stage&nbsp;1 sorts on the parsed date and keeps the last row per <code>listing_id</code>. Run the step on its own output and it returns the same 480 flats with the same values in every column &mdash; and 215 of the 480 <em>positions</em> hold a different flat, because <code>sort_values</code> does not default to a stable sort. Passing <code>kind=\"stable\"</code> makes a re-run byte-identical. Which of these conclusions does that support? (Choose all that apply.)",
          ar: "ترتّب المرحلةُ&nbsp;1 على التاريخ المحلَّل وتُبقي آخرَ صف لكل <code>listing_id</code>. شغّل الخطوةَ على مخرَجها فتعيد الشققَ الـ480 نفسها بالقيم نفسها في كل عمود &mdash; و215 من <em>المواضع</em> الـ480 تحمل شقةً أخرى، لأن <code>sort_values</code> لا تتخذ ترتيبًا مستقرًّا افتراضًا. وتمريرُ <code>kind=\"stable\"</code> يجعل إعادةَ التشغيل مطابقةً حرفًا بحرف. فأيَّ هذه الاستنتاجات يدعم ذلك؟ (اختر كل ما ينطبق.)"
        },
        options: [
          {
            en: "The 480 flats, the eighteen columns and every value in them are reproducible; it is only the row order that is not.",
            ar: "الشققُ الـ480 والأعمدةُ الثمانية عشر وكلُّ قيمة فيها قابلةٌ للإعادة؛ وإنما ترتيبُ الصفوف ليس كذلك."
          },
          {
            en: "<code>sample(frac=0.75, random_state=3)</code> selects by <em>position</em>, so two runs with the same seed hold back different flats &mdash; which means every measured number in Lessons&nbsp;4, 5 and&nbsp;6 would move by a shekel or two.",
            ar: "تختار <code>sample(frac=0.75, random_state=3)</code> بـ<em>الموضع</em>، فتحجز تشغيلتان بالبذرة نفسها شققًا مختلفة &mdash; أي أن كلَّ رقم مقيس في الدروس&nbsp;4 و5 و6 سيتحرّك شيكلًا أو شيكلين."
          },
          {
            en: "Switching to <code>kind=\"stable\"</code> is a one-word change and still a versioned one, precisely because it changes which flats are held back.",
            ar: "الانتقالُ إلى <code>kind=\"stable\"</code> تغييرُ كلمةٍ واحدة وهو مع ذلك تغييرٌ ذو إصدار، وذلك بالضبط لأنه يغيّر أيَّ الشقق تُحجَز."
          },
          {
            en: "The pipeline's three assertions would have caught it: the row count is unchanged, so the blank-cell and column-set checks fire in its place.",
            ar: "كانت تأكيداتُ المسار الثلاثة ستمسكه: فعددُ الصفوف لم يتغير، فينطلق فحصُ الخلايا الفارغة ومجموعةِ الأعمدة بدلًا منه."
          },
          {
            en: "On this one axis Practical&nbsp;1 Lesson&nbsp;6 is still ahead of this chapter, because its golden answer is dated and re-reconciled per period.",
            ar: "على هذا المحور وحده ما زال العملي&nbsp;1 الدرس&nbsp;6 متقدّمًا على هذا الفصل، لأن جوابه الذهبي مؤرَّخٌ ويُعاد توفيقه لكل فترة."
          },
          {
            en: "The instability comes from <code>drop_duplicates(keep=\"last\")</code>, which picks an arbitrary row among rows that tie; sorting on the raw <code>listed_on</code> text instead would remove it.",
            ar: "عدمُ الاستقرار من <code>drop_duplicates(keep=\"last\")</code> التي تختار صفًّا كيفما كان بين الصفوف المتعادلة؛ والترتيبُ على نص <code>listed_on</code> الخام بدلًا منه كان سيُزيله."
          }
        ],
        answer: [0, 1, 2, 4],
        hint: {
          en: "Separate &ldquo;which flats, with which values&rdquo; from &ldquo;in which order&rdquo;, then ask which of the two the split depends on. And read the answer that blames <code>drop_duplicates(keep=\"last\")</code> against Lesson&nbsp;3: what does a text sort do with <code>13/05/2026</code> and <code>2026-05-28</code>?",
          ar: "افصل «أيُّ الشقق وبأيّ قيم» عن «بأيّ ترتيب»، ثم اسأل على أيِّهما يتوقف التقسيم. واقرأ الجوابَ الذي يلوم <code>drop_duplicates(keep=\"last\")</code> في مقابل الدرس&nbsp;3: ما يفعله ترتيبُ النصوص بـ<code>13/05/2026</code> و<code>2026-05-28</code>؟"
        },
        explain: {
          en: "Everything about the answer is reproducible except the order of the rows, and the order is exactly what the split reads: <code>sample()</code> selects positions, so an unstable sort upstream means a different quarter of the file is held back on a different run, and every held-out figure in the second half of the chapter is quoted to four decimal places from one particular ordering. That is why the one-word fix is a versioned change rather than a free improvement &mdash; it would move the measurements it is supposed to stabilise &mdash; and it is why the chapter concedes that Practical&nbsp;1 Lesson&nbsp;6's dated golden answer is ahead of it here: a number you can re-derive is worth more than a number you can only recompute. The assertions answer is the one worth getting wrong: they check the row count, the absence of blank cells and the column set, and a reordering leaves all three intact, which is the same blindness that lets an edited <code>COND_ORDER</code> renumber 75 flats. And the answer that blames <code>drop_duplicates(keep=\"last\")</code> misdiagnoses: <code>keep=\"last\"</code> is perfectly deterministic <em>given</em> an order, and sorting on the raw text would be worse, not better &mdash; <code>'13/05/2026' &lt; '2026-05-28'</code> is <code>True</code>, so every slash-formatted date sorts before every ISO one, and Lesson&nbsp;3's version was right only because all 23 slash rows happened to be the older copies.",
          ar: "كلُّ شيء في الجواب قابلٌ للإعادة إلا ترتيبَ الصفوف، والترتيبُ هو بالضبط ما يقرؤه التقسيم: فـ<code>sample()</code> تختار مواضع، فيعني ترتيبٌ غيرُ مستقرّ في الأعلى أن ربعًا آخر من الملف يُحجَز في تشغيلة أخرى، وكلُّ رقم محجوز في النصف الثاني من الفصل مذكورٌ بأربع منازل عشرية من ترتيبٍ واحد بعينه. ولهذا يكون إصلاحُ الكلمة الواحدة تغييرًا ذا إصدار لا تحسينًا مجانيًّا &mdash; فهو سيحرّك القياساتَ التي يُفترض أن يُثبّتها &mdash; ولهذا يُقرّ الفصلُ بأن الجوابَ الذهبي المؤرَّخ في العملي&nbsp;1 الدرس&nbsp;6 متقدّمٌ عليه هنا: فرقمٌ تستطيع إعادةَ استنباطه أثمنُ من رقمٍ لا تستطيع إلا إعادةَ حسابه. وجوابُ التأكيدات هو الذي يستحقّ الخطأ: فهي تفحص عددَ الصفوف وغيابَ الخلايا الفارغة ومجموعةَ الأعمدة، وإعادةُ الترتيب تُبقي الثلاثةَ سليمة، وهو العمى نفسه الذي يُمكّن <code>COND_ORDER</code> المحرَّرة من إعادة ترقيم 75 شقة. والجوابُ الذي يلوم <code>drop_duplicates(keep=\"last\")</code> يُخطئ التشخيص: فـ<code>keep=\"last\"</code> حاسمةٌ تمامًا <em>بعد</em> ترتيب، والترتيبُ على النص الخام كان سيكون أسوأ لا أحسن &mdash; فـ<code>'13/05/2026' &lt; '2026-05-28'</code> تساوي <code>True</code>، فيتقدّم كلُّ تاريخ بالشرطة المائلة كلَّ تاريخ ISO، وما كانت نسخةُ الدرس&nbsp;3 صحيحةً إلا لأن الصفوف الـ23 بالمائلة وافق أن تكون النسخَ الأقدم."
        }
      },

      /* ---------------------------------------------------------- 19 */
      {
        id: "t2cx19", type: "compare", level: "hard",
        topics: ["t2-fitted-in-memory", "t2-group-imputation", "t2-pipeline-assertions"],
        q: {
          en: "Lesson&nbsp;6 ends by admitting that <code>fitted</code> is a dictionary in memory that nothing writes down. Two attempts to fix that. Both store the eighteen parameters, both load them back and re-run stage&nbsp;3 on the same 480 March flats, and both leave the matrix 480&nbsp;&times;&nbsp;18 with no blank cell and the same column names, so all three assertions pass in both. Which statement is correct?",
          ar: "يُنهي الدرس&nbsp;6 بالإقرار بأن <code>fitted</code> قاموسٌ في الذاكرة لا يكتبه شيء. وهاتان محاولتان لإصلاح ذلك. وكلتاهما تخزّن الوسائطَ الثمانية عشر وتعيد تحميلها وتشغّل المرحلة&nbsp;3 على شقق آذار الـ480 نفسها، وكلتاهما تُبقي المصفوفةَ 480&nbsp;&times;&nbsp;18 بلا خليةٍ فارغة وبأسماء الأعمدة نفسها، فتنجح التأكيداتُ الثلاثة في كلتيهما."
        },
        codeA: code(
          "import json",
          "",
          "json.dump(fitted, open(\"fitted.json\", \"w\"))      # 18 parameters, straight out of memory",
          "f = json.load(open(\"fitted.json\"))",
          "",
          "out, row = impute_area(flats, f)                 # 26 blank areas among the 480 flats",
          "print(\"filled from a rooms group:\", row[\"cells\"] - row[\"fell back\"])",
          "print(\"fell back to the global median:\", row[\"fell back\"])",
          "",
          "# filled from a rooms group: 0",
          "# fell back to the global median: 26"
        ),
        codeB: code(
          "import json",
          "",
          "def plain(f):                                    # keys JSON can carry back unchanged",
          "    g = {\"rooms=%g\" % k: v for k, v in f[\"area_by_rooms\"].items()}",
          "    return dict(f, area_by_rooms=g, fitted_at=\"2026-06-30\", rows_fitted_on=480)",
          "",
          "def load_fitted(path):",
          "    f = json.load(open(path))",
          "    f[\"area_by_rooms\"] = {float(k.split(\"=\")[1]): v for k, v in f[\"area_by_rooms\"].items()}",
          "    return f",
          "",
          "json.dump(plain(fitted), open(\"fitted.json\", \"w\"))",
          "f = load_fitted(\"fitted.json\")",
          "",
          "out, row = impute_area(flats, f)",
          "assert out[\"area_m2\"].equals(X[\"area_m2\"]), \"the loaded parameters do not reproduce the matrix\"",
          "print(\"filled from a rooms group:\", row[\"cells\"] - row[\"fell back\"])",
          "",
          "# filled from a rooms group: 26"
        ),
        options: [
          {
            en: "A fails loudly and B is the ceremony around it: <code>.map()</code> with string keys against a float column raises a <code>TypeError</code>, which is the whole reason B's cast exists.",
            ar: "‏A تفشل بصوت عالٍ وB هي الطقسُ حولها: فـ<code>.map()</code> بمفاتيح نصية في مقابل عمودٍ عشري ترفع <code>TypeError</code>، وهذا كلُّ سببِ وجود تحويل B."
          },
          {
            en: "A is fine for this dictionary and would only break on a key JSON cannot represent, such as a tuple; the parameter to worry about is <code>rent_fence</code>, which comes back as a list instead of a tuple.",
            ar: "‏A سليمةٌ لهذا القاموس ولن تنكسر إلا على مفتاح لا يستطيع JSON تمثيله، كالمجموعة المرتَّبة؛ والوسيطُ الذي يُقلق هو <code>rent_fence</code> الذي يعود قائمةً بدل مجموعة مرتَّبة."
          },
          {
            en: "Both are equivalent once <code>fitted_at</code> and <code>rows_fitted_on</code> are written, because what the artefact was missing was a date and a row count, not a key format.",
            ar: "كلتاهما متكافئتان متى كُتب <code>fitted_at</code> و<code>rows_fitted_on</code>، لأن ما كان ينقص الأثرَ تاريخٌ وعددُ صفوف لا صيغةُ مفاتيح."
          },
          {
            en: "A is the trap inside the fix. JSON has no numeric keys, so <code>area_by_rooms</code>'s keys come back as the strings <code>'1.0'</code> &hellip; <code>'5.0'</code>, <code>.map()</code> matches nothing, and all 26 blank areas are filled with the global median instead of their room group's. Nothing raises, no shape changes, no cell is blank and the column set is unchanged &mdash; so none of the three assertions can see it. B is what makes an artefact trustworthy: keys that survive the round trip, a cast back on load, and an assertion that the loaded parameters reproduce the matrix they produced.",
            ar: "‏A هي الفخُّ داخل الإصلاح. فليس في JSON مفاتيحُ عددية، فتعود مفاتيحُ <code>area_by_rooms</code> نصوصًا <code>'1.0'</code> &hellip; <code>'5.0'</code>، فلا توافق <code>.map()</code> شيئًا، فتُعبَّأ المساحاتُ الفارغة الـ26 كلها بالوسيط العامّ بدل وسيط مجموعة غرفها. ولا يرفع شيءٌ شيئًا ولا شكلَ يتغير ولا خليةَ فارغة ومجموعةُ الأعمدة كما هي &mdash; فلا يستطيع أيٌّ من التأكيدات الثلاثة أن يراه. وB هي ما يجعل الأثرَ موثوقًا: مفاتيحُ تنجو من الرحلة، وتحويلٌ عند التحميل، وتأكيدٌ أن الوسائطَ المحمَّلة تُنتج المصفوفةَ التي أنتجتها."
          }
        ],
        answer: 3,
        hint: {
          en: "Read the two printed numbers in A: 0 and 26. The fill did happen, so nothing refused to run &mdash; what did the lookup fail to find? Then ask which of the pipeline's three assertions could possibly have noticed.",
          ar: "اقرأ الرقمين المطبوعين في A: صفر و26. فالتعويضُ حدث، فلم يرفض شيءٌ أن يعمل &mdash; فماذا أخفق البحثُ في إيجاده؟ ثم اسأل أيُّ تأكيدات المسار الثلاثة كان يمكن أن يلاحظ."
        },
        explain: {
          en: "JSON keys are strings, always, so <code>json.dump</code> quietly turns <code>{1.0: 38.5, &hellip;}</code> into <code>{\"1.0\": 38.5, &hellip;}</code> and the loaded dictionary can never match a float <code>rooms</code> value again. Every one of the 26 blank areas then takes the global median instead of its room group's, which is a real difference of about twelve square metres a cell and over thirty at the worst &mdash; and it is invisible to every check the pipeline has, because the shape, the dtypes, the blank count and the column names are all exactly what they were. That is the point of the question: an assertion guards the shape of an answer, not its correctness, and the three the chapter ships are deliberately cheap. The tuple answer is the tempting one because its second half is true &mdash; <code>rent_fence</code> does come back as a list &mdash; and harmless, since it is only ever unpacked; mistaking the harmless symptom for the damaging one is exactly how this bug survives review. The <code>TypeError</code> answer is wrong because <code>.map()</code> on a key it cannot find returns <code>NaN</code>; it does not complain. And a date and a row count are necessary and not sufficient: they make the artefact <em>auditable</em>, while the cast and the golden-matrix assertion are what make it <em>usable</em>.",
          ar: "مفاتيحُ JSON نصوصٌ دائمًا، فتحوّل <code>json.dump</code> بهدوء <code>{1.0: 38.5، &hellip;}</code> إلى <code>{\"1.0\": 38.5، &hellip;}</code> فلا يستطيع القاموسُ المحمَّل أن يوافق قيمةَ <code>rooms</code> العشرية بعدها قط. فتأخذ كلُّ واحدة من المساحات الفارغة الـ26 الوسيطَ العامَّ بدل وسيط مجموعة غرفها، وذاك فرقٌ حقيقي نحو اثني عشر مترًا مربعًا للخلية وفوق الثلاثين في أسوأ حالة &mdash; وهو غيرُ مرئيّ لكل فحص في المسار، لأن الشكلَ والأنواعَ وعددَ الفراغات وأسماءَ الأعمدة كلها بالضبط كما كانت. وهذا هو مقصودُ السؤال: فالتأكيدُ يحرس شكلَ الجواب لا صوابه، والثلاثةُ التي يشحنها الفصل رخيصةٌ عن قصد. وجوابُ المجموعة المرتَّبة هو المغري لأن نصفه الثاني صحيح &mdash; فـ<code>rent_fence</code> يعود قائمةً فعلًا &mdash; وغيرُ ضار، إذ لا يُفكّ إلا تفكيكًا؛ وخلطُ العَرَض غير الضارّ بالضارّ هو بعينه كيف ينجو هذا العطبُ من المراجعة. وجوابُ <code>TypeError</code> خاطئ لأن <code>.map()</code> على مفتاح لا تجده تعيد <code>NaN</code>؛ ولا تشتكي. والتاريخُ وعددُ الصفوف لازمان لا كافيان: فهما يجعلان الأثرَ <em>قابلًا للتدقيق</em>، أما التحويلُ وتأكيدُ المصفوفة الذهبية فهما ما يجعله <em>قابلًا للاستعمال</em>."
        }
      },

      /* ---------------------------------------------------------- 20 */
      {
        id: "t2cx20", type: "mcq", level: "medium",
        topics: ["t2-outer-unmatched", "t2-dummy-trap", "t2-no-feature-eng"],
        q: {
          en: "The reference join is defended, matches all 480 flats and brings in <code>km_to_gaza_city</code>: Gaza&nbsp;0.0, Jabalia&nbsp;6.8, Deir&nbsp;al-Balah&nbsp;14.2, Khan&nbsp;Younis&nbsp;23.5, Rafah&nbsp;34.0. Added to the ten-column matrix that already holds the five city dummies, it moves the held-out error from 37.0908 to 37.0908 &mdash; exactly. The rank of <code>[1, five dummies]</code> is 5 of 6, and with the distance it is 5 of 7. Drop the five dummies and keep the distance alone and the held-out error reads 46.5113, against 40.6052 for the dummies alone. Which reading is correct?",
          ar: "دمجُ المرجع محصَّن، ويوافق الشققَ الـ480 كلها، ويُدخل <code>km_to_gaza_city</code>: غزة&nbsp;0.0، وجباليا&nbsp;6.8، ودير&nbsp;البلح&nbsp;14.2، وخان&nbsp;يونس&nbsp;23.5، ورفح&nbsp;34.0. ومضافًا إلى المصفوفة ذات الأعمدة العشرة التي تحمل أصلًا مؤشِّرات المدن الخمسة، ينقل الخطأَ المحجوز من 37.0908 إلى 37.0908 &mdash; بالضبط. ورتبةُ <code>[1, five dummies]</code> هي 5 من 6، ومع المسافة 5 من 7. وأسقِط المؤشِّراتَ الخمسة وأبقِ المسافةَ وحدها فيقرأ الخطأُ المحجوز 46.5113، مقابل 40.6052 للمؤشِّرات وحدها. أي قراءة صحيحة؟"
        },
        options: [
          {
            en: "0.0000 means the reference file is wrong &mdash; a distance ought to predict a rent &mdash; so the join must be matching the wrong rows; the 480-row count after <code>validate=\"m:1\"</code> only proves that nothing was duplicated.",
            ar: "‏0.0000 تعني أن ملفَّ المرجع خاطئ &mdash; فالمسافةُ ينبغي أن تتنبأ بإيجار &mdash; فلا بد أن الدمجَ يوافق صفوفًا خاطئة؛ وعددُ الصفوف 480 بعد <code>validate=\"m:1\"</code> لا يُثبت إلا أن شيئًا لم يُكرَّر."
          },
          {
            en: "The distance is a continuous ratio-scale column and the dummies are nominal, so they cannot be carrying the same information; 0.0000 is the ruler's noise and a second split would separate them.",
            ar: "المسافةُ عمودٌ متصل بمقياس نسبة والمؤشِّراتُ اسمية، فلا يمكن أن تحمل المعلومةَ نفسها؛ فـ0.0000 ضجيجُ المسطرة وتقسيمٌ ثانٍ كان سيفرّق بينهما."
          },
          {
            en: "The distance is a function of the city, so once the five dummies are in the matrix it adds nothing at all: <code>np.linalg.lstsq</code> reproduces the kilometres from the dummies to a residual of about 1e&minus;25, and on a rank-deficient matrix it quietly returns the minimum-norm solution instead of failing. The information is real &mdash; 46.51 against 40.61 says distance alone is a worse but genuine predictor &mdash; and it is already present. The join still earns its place, because it is the only reason the pipeline can say anything about Beit Lahia, which has a distance and no dummy.",
            ar: "المسافةُ دالةٌ للمدينة، فمتى كانت المؤشِّراتُ الخمسة في المصفوفة لم تُضف شيئًا أصلًا: فـ<code>np.linalg.lstsq</code> تُنتج الكيلومتراتَ من المؤشِّرات ببقيّةٍ نحو 1e&minus;25، وعلى مصفوفةٍ ناقصةِ الرتبة تعيد بهدوء حلَّ أصغر معيار بدل أن تفشل. والمعلومةُ حقيقية &mdash; فـ46.51 مقابل 40.61 تقول إن المسافةَ وحدها متنبِّئٌ أسوأ لكنه أصيل &mdash; وهي حاضرةٌ أصلًا. ويظل الدمجُ يستحقّ مكانه، لأنه السببُ الوحيد لاستطاعة المسار أن يقول شيئًا عن Beit Lahia التي لها مسافةٌ ولا مؤشِّرَ لها."
          },
          {
            en: "Dropping the five dummies and keeping the distance is the right trade: one column instead of five for 46.51 against 40.61, which is well inside the shekel-or-two noise of a single split.",
            ar: "إسقاطُ المؤشِّرات الخمسة وإبقاءُ المسافة هو المقايضةُ الصحيحة: عمودٌ واحد بدل خمسة مقابل 46.51 في مقابل 40.61، وذلك داخلَ ضجيج الشيكل أو الشيكلين لتقسيمٍ واحد بأريحية."
          }
        ],
        answer: 2,
        hint: {
          en: "The two rank figures are the whole answer: adding a column raised the number of columns and not the rank. Ask what that means about writing the kilometres as a combination of the dummies &mdash; and then ask whether 46.51 against 40.61 is a small difference on this ruler.",
          ar: "رقما الرتبة هما الجوابُ كله: فإضافةُ عمود رفعت عددَ الأعمدة ولم ترفع الرتبة. فاسأل ما يعنيه ذلك عن كتابة الكيلومترات تأليفًا من المؤشِّرات &mdash; ثم اسأل هل 46.51 في مقابل 40.61 فرقٌ صغير على هذه المسطرة."
        },
        explain: {
          en: "Each city has exactly one distance, so the kilometre column is a linear combination of the five city dummies: adding it takes the matrix from six columns to seven while the rank stays at 5, and <code>lstsq</code> reproduces the kilometres from the dummies to a residual of about 1e&minus;25. A rank-deficient matrix does not raise &mdash; <code>lstsq</code> returns the minimum-norm solution, which is also why the coefficients of a full one-hot block are not interpretable without naming a reference level &mdash; so the only sign is a feature that cost a column and bought exactly zero. The answer blaming the reference file is wrong: the join is correct, with 0 unmatched. The answer about measurement scales is the subtler mistake: nominal and ratio are claims about what you may <em>do</em> with a column, not about how much information it carries, and a nominal column with five levels can carry a continuous quantity perfectly when the quantity is constant within each level. And dropping the dummies is a real loss, not a free simplification: 46.51 against 40.61 is nearly six shekels, far outside the shekel-or-two noise this chapter keeps quoting. The join stays anyway, for two reasons the ruler cannot see: it is the only thing in the pipeline that has a number for Beit Lahia, a town with two June listings and no dummy, and it is what lets the report say &ldquo;rent falls with distance from the centre&rdquo; in a sentence a person can check.",
          ar: "لكل مدينة مسافةٌ واحدة بالضبط، فعمودُ الكيلومترات تأليفٌ خطي من مؤشِّرات المدن الخمسة: فإضافتُه تنقل المصفوفةَ من ستة أعمدة إلى سبعة وتبقى الرتبةُ 5، وتُنتج <code>lstsq</code> الكيلومتراتَ من المؤشِّرات ببقيّةٍ نحو 1e&minus;25. والمصفوفةُ ناقصةُ الرتبة لا ترفع شيئًا &mdash; فـ<code>lstsq</code> تعيد حلَّ أصغر معيار، وهذا أيضًا سببُ ألّا تكون معاملاتُ كتلةِ ترميز أحادي كاملة قابلةً للتفسير دون تسمية مستوًى مرجعي &mdash; فالعلامةُ الوحيدة خاصيةٌ كلّفت عمودًا واشترت صفرًا بالضبط. والجوابُ الذي يلوم ملفَّ المرجع خاطئ: فالدمجُ صحيح وبلا شيء غير مطابق. والجوابُ عن مقاييس القياس هو الخطأ الأخفى: فالاسميةُ والنسبةُ ادّعاءان عما <em>يحقّ</em> لك فعلُه بعمود، لا عن كم معلومةٍ يحملها، ويستطيع عمودٌ اسمي بخمسة مستويات أن يحمل كمّيةً متصلة حملًا تامًّا متى كانت الكمّيةُ ثابتةً داخل كل مستوى. وإسقاطُ المؤشِّرات خسارةٌ حقيقية لا تبسيطٌ مجاني: فـ46.51 في مقابل 40.61 نحو ستة شواكل، أي خارجَ ضجيج الشيكل أو الشيكلين الذي يذكره هذا الفصل كثيرًا بمسافة بعيدة. ويبقى الدمجُ مع ذلك لسببين لا تراهما المسطرة: فهو الشيءُ الوحيد في المسار الذي له رقمٌ لـBeit Lahia، وهي بلدةٌ لها إعلانان في حزيران ولا مؤشِّرَ لها، وهو ما يُمكّن التقريرَ من أن يقول «ينزل الإيجار مع البُعد عن المركز» في جملةٍ يستطيع إنسانٌ فحصَها."
        }
      },

      /* ---------------------------------------------------------- 21 */
      {
        id: "t2cx21", type: "ordercode", level: "hard",
        topics: ["t2-canonical-order", "t2-dedupe-before-split", "t2-transform-listings"],
        q: {
          en: "The whole chapter in eight statements. <code>make_comparable</code> is stages&nbsp;1 and&nbsp;2 and learns nothing; <code>s2_enrich</code> is the <code>m:1</code> reference join with its row-count assertion; <code>transform_listings(df, fitted=None)</code> fits stages&nbsp;3 to&nbsp;5 when it is given no parameters and is a pure apply when it is given them. Put the statements in the one order that both runs and never lets a parameter be learned from a row that is not allowed to teach it.",
          ar: "الفصلُ كله في ثماني عبارات. فـ<code>make_comparable</code> هي المرحلتان&nbsp;1 و&nbsp;2 ولا تتعلّم شيئًا؛ و<code>s2_enrich</code> هي دمجُ المرجع <code>m:1</code> مع تأكيد عدد صفوفه؛ و<code>transform_listings(df, fitted=None)</code> تضبط المراحلَ&nbsp;3 إلى&nbsp;5 إذا لم تُعطَ وسائط وتكون تطبيقًا محضًا إذا أُعطيتها. رتّب العباراتِ بالترتيب الوحيد الذي يعمل ولا يدع وسيطًا يُتعلَّم من صفٍّ لا يحقّ له أن يعلّمه."
        },
        items: [
          { code: "raw, ref, june = read(\"listings_raw.csv\"), read(\"city_reference.csv\"), read(\"listings_new.csv\")" },
          { code: "frame, log = make_comparable(raw)              # 503 rows -> 480 flats; learns nothing, so it may go first" },
          { code: "frame, row = s2_enrich(frame, None)            # the m:1 join: a fan-out here would put one flat on both sides" },
          { code: "train = frame.sample(frac=0.75, random_state=3)   # 360 flats: the only rows a parameter may come from" },
          { code: "held  = frame.drop(train.index)                  # 120 flats: the measurement, and nothing else" },
          { code: "X,  report,  fitted = transform_listings(train)                 # FIT ONCE: 18 parameters, from 360 flats" },
          { code: "Xh, report_h, _    = transform_listings(held, fitted=fitted)    # APPLY: nothing is recomputed" },
          { code: "Xj, report_j, _    = transform_listings(june, fitted=fitted)    # APPLY: 18 columns, unseen reported" }
        ],
        answer: [0, 1, 2, 3, 4, 5, 6, 7],
        hint: {
          en: "The chain of names fixes most of it. Two placements carry the chapter instead of the syntax: one is the step that turns rows into flats, and one is the only operation that can change a row count in both directions. Both of them belong on the same side of the split &mdash; which side?",
          ar: "سلسلةُ الأسماء تُثبّت معظمه. وموضعان يحملان الفصلَ لا القواعدَ النحوية: أحدهما الخطوةُ التي تحوّل الصفوفَ شققًا، والآخر العمليةُ الوحيدة التي تستطيع تغييرَ عدد الصفوف في الجهتين. وكلاهما في جهةٍ واحدة من التقسيم &mdash; فأيُّ جهة؟"
        },
        explain: {
          en: "Most of the order is forced by names: <code>frame</code> before it can be enriched, <code>train</code> before <code>held</code> (which is <em>defined</em> as the complement, so it cannot be sampled separately without risking an overlap that would quietly make the measurement meaningless), <code>fitted</code> before any apply. Two placements are the chapter itself. <code>make_comparable</code> has to come before the split because the 503 rows describe 480 flats: split first and the same seed puts ten flats on both sides of the line, which is leakage of the crudest kind and leaves no trace in any shape. And <code>s2_enrich</code> has to come before the split too, for a different reason &mdash; a merge is the only operation that can both delete rows and duplicate them, and a duplicated reference row turns 480 flats into 644 whose copies land on both sides. Both steps are allowed above the split only because they are pure applies: canonicalising a city with a written map, parsing a date, deduplicating on a business key and joining a reference table learn nothing from the rows they are given. Everything that <em>does</em> learn &mdash; the medians, the mode, the deposit multiple, the fence, the MAD, the category lists, the scaler's extremes, the column order &mdash; is inside the single call that is made without <code>fitted</code>, exactly once, on <code>train</code> alone. The last two lines are then the same function with the same parameters, which is why June comes out eighteen columns wide and why its report, not its shape, is what tells you Beit Lahia arrived.",
          ar: "معظمُ الترتيب تفرضه الأسماء: <code>frame</code> قبل أن يُثرى، و<code>train</code> قبل <code>held</code> (وهي <em>معرَّفة</em> بالمتمّم، فلا يمكن أن تُعيَّن على حدة دون خطر تقاطعٍ يُفرغ القياسَ من معناه بهدوء)، و<code>fitted</code> قبل أي تطبيق. وموضعان هما الفصلُ نفسه. فلا بد أن تتقدّم <code>make_comparable</code> التقسيمَ لأن الصفوف الـ503 تصف 480 شقة: اقسم أولًا فتضع البذرةُ نفسها عشرَ شقق في جهتي الخط، وذاك تسرّبٌ من أفجّ ما يكون ولا يترك أثرًا في أي شكل. ولا بد أن تتقدّم <code>s2_enrich</code> التقسيمَ أيضًا لسبب آخر &mdash; فالدمجُ هو العملية الوحيدة التي تستطيع حذفَ الصفوف وتكرارَها معًا، وصفُّ مرجعٍ مكرَّر يحوّل 480 شقة إلى 644 تهبط نسخُها في الجهتين. ولا يجوز وضعُ الخطوتين فوق التقسيم إلا لأنهما تطبيقان محضان: فتعييرُ مدينة بخريطةٍ مكتوبة وتحليلُ تاريخٍ وحذفُ المكرّر بمفتاح تجاري ودمجُ جدول مرجع لا تتعلّم شيئًا من الصفوف المسلَّمة إليها. وكلُّ ما <em>يتعلّم</em> &mdash; الوسائطُ والمنوالُ ومضاعفُ التأمين والسياجُ والانحرافُ المطلق الوسيطي وقوائمُ الفئات وطرفا المُقايِس وترتيبُ الأعمدة &mdash; داخلَ النداء الواحد الذي يُجرى بلا <code>fitted</code>، مرةً واحدة بالضبط، على <code>train</code> وحدها. فيكون السطران الأخيران الدالةَ نفسها بالوسائط نفسها، ولهذا يخرج حزيران بعرض ثمانية عشر عمودًا، ولهذا يكون تقريرُه لا شكلُه هو ما يخبرك بوصول Beit Lahia."
        }
      },

      /* ---------------------------------------------------------- 22 */
      {
        id: "t2cx22", type: "tf", level: "easy",
        topics: ["t2-pipeline-assertions", "t2-fitted-in-memory", "t2-one-split"],
        q: {
          en: "<code>transform_listings</code> returns a matrix of 480 rows and 18 columns; the row count is unchanged since stage&nbsp;1, no cell in the matrix is blank, and the column set equals <code>fitted[\"columns\"]</code> &mdash; so all three of its assertions pass. <strong>True or false:</strong> the output is therefore correct.",
          ar: "تعيد <code>transform_listings</code> مصفوفةً من 480 صفًّا و18 عمودًا؛ وعددُ الصفوف لم يتغير منذ المرحلة&nbsp;1، ولا خليةَ فارغة في المصفوفة، ومجموعةُ الأعمدة تساوي <code>fitted[\"columns\"]</code> &mdash; فتنجح تأكيداتُها الثلاثة كلها. <strong>صح أم خطأ:</strong> فالمخرَجُ إذن صحيح."
        },
        truth: false,
        hint: {
          en: "Read what each assertion actually compares. Is any of the three looking at a <em>value</em>?",
          ar: "اقرأ ما يقارنه كلُّ تأكيد فعلًا. فهل ينظر أيٌّ من الثلاثة إلى <em>قيمة</em>؟"
        },
        explain: {
          en: "The three assertions refuse a badly <em>shaped</em> frame; they cannot certify a correct one. All three check structure &mdash; a row count, the absence of blanks, a set of column names &mdash; and the chapter lists what sails straight past them. Editing <code>COND_ORDER</code> renumbers 75 of the 480 flats, every assertion passing, because an ordered code is one column whose name does not change when its meaning does. A <code>fitted</code> dictionary reloaded from JSON with string keys fills all 26 blank areas with the global median instead of their room group's, and nothing about the matrix looks different. The row order is not even reproducible, because <code>sort_values</code> is not stable, so 215 of 480 positions hold a different flat on a re-run. What the assertions buy is real and narrow: they catch a fan-out or a stray <code>dropna</code>, a fill whose fallback was deleted, and a stale artefact or a renamed column &mdash; the three failures that would otherwise train a model on duplicated rows, hand it a NaN some libraries silently read as zero, or feed an eighteen-column matrix to a model expecting seventeen. Correctness is what the held-out ruler and the per-batch report are for, and the chapter is careful to add that even the ruler is one split and one seed.",
          ar: "التأكيداتُ الثلاثة ترفض جدولًا سيّئَ <em>الشكل</em>؛ ولا تستطيع أن تُصدّق على جدولٍ صحيح. فالثلاثةُ كلها تفحص البنيةَ &mdash; عددَ صفوف وغيابَ فراغات ومجموعةَ أسماء أعمدة &mdash; ويسرد الفصلُ ما يمرّ بها مرورًا سهلًا. فتحريرُ <code>COND_ORDER</code> يعيد ترقيمَ 75 من الشقق الـ480 وكلُّ تأكيد ناجح، لأن الرمزَ المرتَّب عمودٌ واحد لا يتغير اسمُه حين يتغير معناه. وقاموسُ <code>fitted</code> المُعاد تحميله من JSON بمفاتيح نصية يعبّئ المساحاتِ الفارغة الـ26 كلها بالوسيط العامّ بدل وسيط مجموعة غرفها، ولا شيء في المصفوفة يبدو مختلفًا. وترتيبُ الصفوف ليس قابلًا للإعادة أصلًا، لأن <code>sort_values</code> غيرُ مستقرّة، فتحمل 215 من 480 موضعًا شقةً أخرى في إعادة التشغيل. وما تشتريه التأكيداتُ حقيقيٌّ وضيّق: فهي تمسك تمدّدًا أو <code>dropna</code> شاردة، وتعويضًا حُذف بديلُه، وأثرًا بائتًا أو عمودًا أُعيدت تسميته &mdash; وهي الأعطابُ الثلاثة التي كانت لولاها ستدرّب نموذجًا على صفوف مكرَّرة، أو تسلّمه NaN تقرؤه بعضُ المكتبات صفرًا بصمت، أو تُطعم مصفوفةً بثمانية عشر عمودًا نموذجًا يتوقع سبعةَ عشر. أما الصوابُ فلأجله وُجدت المسطرةُ المحجوزة والتقريرُ لكل دفعة، ويحرص الفصلُ على أن يضيف أن المسطرةَ نفسها تقسيمٌ واحد وبذرةٌ واحدة."
        }
      },

      /* ---------------------------------------------------------- 23 */
      {
        id: "t2cx23", type: "mcq", level: "hard",
        topics: ["t1-levels-of-measurement", "t2-level-to-encoder", "t2-impute-centre"],
        q: {
          en: "<code>condition</code> is ordinal &mdash; <code>poor &lt; fair &lt; good &lt; excellent</code> &mdash; and arrives with 36 blanks. <a href=\"#t1l2-s1\">Theory&nbsp;1 Lesson&nbsp;2</a> wrote the measurement level down as a human judgement in a dictionary beside the data and used it to refuse a mean; Lesson&nbsp;2 of this chapter let the level choose the legal <em>fill</em> (the mode, which moves <code>good</code> from 37.4% to 44.5% of the column); Lesson&nbsp;5 let it choose the legal <em>encoder</em>, and priced it: the alphabetical <code>cat.codes</code> scores 63.31 shekels held out and the declared order 59.48. June then brings a level nobody declared, <code>very good</code>. Which statement is correct?",
          ar: "‏<code>condition</code> ترتيبي &mdash; <code>poor &lt; fair &lt; good &lt; excellent</code> &mdash; ويصل بـ36 فراغًا. وكتب <a href=\"#t1l2-s1\">النظري&nbsp;1 الدرس&nbsp;2</a> مستوى القياس حكمًا بشريًّا في قاموس بجانب البيانات واستخدمه لرفض المتوسط؛ وأتاح الدرس&nbsp;2 في هذا الفصل للمستوى أن يختار <em>التعويضَ</em> المشروع (المنوال، الذي ينقل <code>good</code> من 37.4% إلى 44.5% من العمود)؛ وأتاح له الدرس&nbsp;5 أن يختار <em>المُرمِّزَ</em> المشروع وسعّره: فـ<code>cat.codes</code> الأبجدية تسجّل 63.31 شيكلًا محجوزًا والترتيبُ المعلَن 59.48. ثم يأتي حزيران بمستوًى لم يعلنه أحد، <code>very good</code>. أي عبارة صحيحة؟"
        },
        options: [
          {
            en: "The level has travelled from a judgement written beside the data, to a dtype, to the choice of fill, to the choice of encoder &mdash; and the 3.83 shekels between 63.31 and 59.48 is the first time in the course that the measurement level has a price. What none of that changes: the level is still a human judgement nothing checks, so a wrong one produces a perfectly legal-looking matrix; the integer code also asserts that consecutive levels are <em>equally spaced</em>, which the file cannot verify (the medians step 20, 20, 25 and the means 25.95, 19.64, 33.55); and <code>very good</code> cannot be placed on the scale from the file at all.",
            ar: "سافر المستوى من حكمٍ مكتوب بجانب البيانات، إلى نوعٍ، إلى اختيار التعويض، إلى اختيار المُرمِّز &mdash; والشواكلُ 3.83 بين 63.31 و59.48 هي أولُ مرة في هذا المقرر يكون لمستوى القياس ثمن. وما لا يغيّره ذلك كلُّه: فالمستوى ما زال حكمًا بشريًّا لا يفحصه شيء، فيُنتج الخاطئُ منه مصفوفةً تبدو مشروعةً تمامًا؛ والرمزُ الصحيح يزعم كذلك أن المستوياتِ المتتالية <em>متساوية التباعد</em>، وهذا ما لا يستطيع الملفُّ التحقق منه (فتخطو الوسائطُ 20 و20 و25 وتخطو المتوسطاتُ 25.95 و19.64 و33.55)؛ و<code>very good</code> لا يمكن إنزالها على المقياس من الملف أصلًا."
          },
          {
            en: "Because the level is now enforced by a measurement, a wrong level would show up as a worse held-out error, so the ruler has turned the judgement into a check.",
            ar: "لأن المستوى صار الآن مُنفَّذًا بقياس، فالمستوى الخاطئ كان سيظهر خطأً محجوزًا أسوأ، فحوّلت المسطرةُ الحكمَ فحصًا."
          },
          {
            en: "The 36 blanks should take an <code>unknown</code> level inserted into the order between <code>fair</code> and <code>good</code>, which is both the honest fill and what the encoder needs.",
            ar: "ينبغي أن تأخذ الفراغاتُ الـ36 مستوى <code>unknown</code> مُدخلًا في الترتيب بين <code>fair</code> و<code>good</code>، وهو التعويضُ الأمين وما يحتاجه المُرمِّز معًا."
          },
          {
            en: "Filling the 36 cells with the mode is illegal for an ordinal column, because the mode is a nominal statistic; the median level is the legal fill, and it would not have moved <code>good</code> at all.",
            ar: "تعويضُ الخلايا الـ36 بالمنوال غيرُ مشروع لعمود ترتيبي، لأن المنوال إحصاءٌ اسمي؛ والمستوى الوسيط هو التعويضُ المشروع، وما كان سينقل <code>good</code> شيئًا."
          }
        ],
        answer: 0,
        hint: {
          en: "Three of the four make a claim about what the measurement level now <em>settles</em>. Check each against the chapter's own honesty: which statistics are legal on an ordinal column, what an integer code assumes beyond order, and whether a 3.83-shekel measurement can audit a judgement.",
          ar: "ثلاثةٌ من الأربعة تدّعي شيئًا عما <em>يحسمه</em> مستوى القياس الآن. فافحص كلًّا منها في مقابل أمانة الفصل نفسه: أيُّ الإحصاءات مشروعٌ على عمود ترتيبي، وما يزعمه الرمزُ الصحيح فوق الترتيب، وهل يستطيع قياسٌ بـ3.83 شيكلًا أن يدقّق حكمًا."
        },
        explain: {
          en: "This is the T-MEANING thread arriving at a price. Theory&nbsp;1 Lesson&nbsp;2 made the level a judgement written as data; Lesson&nbsp;3 of that chapter put it into the dtype; Lesson&nbsp;2 here made it decide the legal fill, Lesson&nbsp;3 made the ordered dtype real so that <code>condition &gt; \"fair\"</code> is a legal comparison over 255 of the 447 non-blank flats, and Lesson&nbsp;5 made it decide the legal encoder &mdash; and 3.83 shekels is the level, priced. What is still open is the honest part. Nothing checks the judgement, so a column given the wrong level produces a matrix that looks exactly as legal as a right one; the ruler cannot audit it, which is why &ldquo;a worse error would reveal a wrong level&rdquo; is the tempting mistake &mdash; on this column one ordered code and three dummies differ by 0.03 shekels, so the ruler can barely see the question at all. The integer code also smuggles in equal spacing: the medians happen to step 20, 20 and 25, which flatters it, and the means step 25.95, 19.64 and 33.55, which does not. The <code>unknown</code> answer is wrong in an instructive way: an unknown condition has no position on a scale of quality, so it is ordered <em>outside</em> the scale and needs an encoder decision, not a slot between two levels. And the mode answer inverts the rule &mdash; the mode is perfectly legal for an ordinal column and it is the <em>mean</em> that is not; the median level here is also <code>good</code>, so it would move the column by exactly as much.",
          ar: "هذا خيطُ «ما يحقّ لي بهذا العمود؟» وقد وصل إلى ثمن. فجعل النظري&nbsp;1 الدرس&nbsp;2 المستوى حكمًا مكتوبًا بياناتٍ؛ ووضعه الدرس&nbsp;3 من ذلك الفصل في النوع؛ وجعله الدرس&nbsp;2 هنا يحدّد التعويضَ المشروع، وجعل الدرس&nbsp;3 النوعَ المرتَّب حقيقيًّا فصارت <code>condition &gt; \"fair\"</code> مقارنةً مشروعة على 255 من الشقق الـ447 غير الفارغة، وجعله الدرس&nbsp;5 يحدّد المُرمِّزَ المشروع &mdash; و3.83 شيكلًا هي المستوى مسعَّرًا. وما يبقى مفتوحًا هو الجزءُ الأمين. فلا شيء يفحص الحكم، فعمودٌ أُعطي مستوًى خاطئًا يُنتج مصفوفةً تبدو مشروعةً كمصفوفة الصحيح تمامًا؛ ولا تستطيع المسطرةُ تدقيقَه، ولهذا يكون «خطأٌ أسوأ كان سيكشف مستوًى خاطئًا» هو الغلطَ المغري &mdash; فعلى هذا العمود يختلف رمزٌ مرتَّب واحد وثلاثةُ مؤشِّرات بـ0.03 شيكل، فلا تكاد المسطرةُ ترى السؤالَ أصلًا. ويُدخل الرمزُ الصحيح كذلك تساويَ التباعد خفيةً: فتخطو الوسائطُ 20 و20 و25 اتفاقًا فتُجمّله، وتخطو المتوسطاتُ 25.95 و19.64 و33.55 فلا تُجمّله. وجوابُ <code>unknown</code> خاطئٌ خطأً مُعلِّمًا: فالحالةُ المجهولة لا موضعَ لها على مقياس جودة، فتُرتَّب <em>خارج</em> المقياس وتحتاج قرارَ مُرمِّز لا خانةً بين مستويين. وجوابُ المنوال يقلب القاعدة &mdash; فالمنوالُ مشروعٌ تمامًا لعمود ترتيبي، وإنما <em>المتوسط</em> هو غيرُ المشروع؛ والمستوى الوسيط هنا هو <code>good</code> أيضًا، فكان سينقل العمودَ بالقدر نفسه بالضبط."
        }
      },

      /* ---------------------------------------------------------- 24 */
      {
        id: "t2cx24", type: "write", level: "hard",
        topics: ["t2-domain-limit", "t2-deposit-rule", "t2-frame-log-row"],
        q: {
          en: "Write <code>check_deposit_ratio(d, fitted)</code>, the cross-column check that reaches what no statistic on the rent column can. It is a stage&nbsp;2 step in the <code>(frame, log_row)</code> shape of <a href=\"#t2l1-s21\">Lesson&nbsp;1</a>. It must take the allowed multiples from <code>fitted[\"deposit_months\"]</code> and never write them in by hand; compute <code>deposit / monthly_rent</code>; put the ratio and a boolean <code>rent_ratio_odd</code> on the frame; <strong>delete nothing</strong>; and return a log row recording <code>rows_in</code>, <code>rows_out</code>, how many pairs it could compare, how many it flagged, and the <code>listing_id</code> of every flagged row. Then run it on the raw 503 rows &mdash; before Lesson&nbsp;2 fills a single deposit &mdash; and print the log row.",
          ar: "اكتب <code>check_deposit_ratio(d, fitted)</code>، الفحصَ العابر للأعمدة الذي يبلغ ما لا يبلغه أيُّ إحصاء على عمود الإيجار. وهو خطوةٌ في المرحلة&nbsp;2 بشكل <code>(frame, log_row)</code> في <a href=\"#t2l1-s21\">الدرس&nbsp;1</a>. ولا بد أن يأخذ المضاعفاتِ المسموحة من <code>fitted[\"deposit_months\"]</code> ولا يكتبها بيده قط؛ وأن يحسب <code>deposit / monthly_rent</code>؛ وأن يضع النسبةَ ومنطقيًّا <code>rent_ratio_odd</code> على الجدول؛ و<strong>لا يحذف شيئًا</strong>؛ وأن يعيد سطرَ سجلّ يسجّل <code>rows_in</code> و<code>rows_out</code> وكم زوجًا استطاع مقارنته وكم علّم و<code>listing_id</code> لكل صف معلَّم. ثم شغّله على الصفوف الـ503 الخام &mdash; قبل أن يعوّض الدرس&nbsp;2 تأمينًا واحدًا &mdash; واطبع سطرَ السجل."
        },
        starter: code(
          "import pandas as pd",
          "",
          "FITTED = {\"deposit_months\": [1.0, 2.0, 3.0]}   # in this market a deposit is a whole number of months",
          "",
          "# raw: the 503 rows as scraped. Nothing repaired, nothing imputed.",
          "",
          "# your code here"
        ),
        lines: 18,
        checks: [
          {
            re: "def\\s+check_deposit_ratio\\s*\\(\\s*\\w+\\s*,\\s*\\w+",
            label: {
              en: "A step of two arguments: the frame, and the fitted dictionary",
              ar: "خطوةٌ بوسيطين: الجدول والقاموس المضبوط"
            }
          },
          {
            re: "\\[\\s*[\"']deposit_months[\"']\\s*\\]",
            label: {
              en: "The allowed multiples are read from <code>fitted</code>, not typed into the step",
              ar: "المضاعفاتُ المسموحة تُقرأ من <code>fitted</code> لا تُكتب في الخطوة"
            }
          },
          {
            re: "\\[\\s*[\"']deposit[\"']\\s*\\]\\s*/\\s*\\w+\\s*\\[\\s*[\"']monthly_rent[\"']\\s*\\]",
            label: {
              en: "The ratio is the deposit over the rent &mdash; the cross-column comparison itself",
              ar: "النسبةُ هي التأمين على الإيجار &mdash; المقارنةُ العابرة للأعمدة نفسها"
            }
          },
          {
            re: "\\.\\s*isin\\s*\\(",
            label: {
              en: "Membership against the allowed list, so a fourth legal multiple needs no new code",
              ar: "العضويةُ في مقابل القائمة المسموحة، فلا يحتاج مضاعفٌ مشروع رابع كودًا جديدًا"
            }
          },
          {
            re: "rent_ratio_odd",
            label: {
              en: "The finding is a named flag column on the frame",
              ar: "النتيجةُ عمودُ عَلَمٍ مسمًّى على الجدول"
            }
          },
          {
            re: "return\\s+\\w+[^;]{0,500}?,\\s*\\{",
            label: {
              en: "The step returns the frame beside a log row",
              ar: "الخطوةُ تعيد الجدولَ بجانب سطر سجل"
            }
          },
          {
            re: "listing_id",
            label: {
              en: "The log names the flagged listings, so a person can ring the agency",
              ar: "السجلُّ يسمّي الإعلاناتِ المعلَّمة، فيستطيع إنسانٌ أن يهاتف الوكالة"
            }
          }
        ],
        forbid: [
          {
            re: "\\.\\s*dropna\\s*\\(|\\.\\s*drop\\s*\\(",
            label: {
              en: "deleting the rows &mdash; a stage-2 finding is a flag with a count, never a deletion",
              ar: "حذفُ الصفوف &mdash; فنتيجةُ المرحلة 2 عَلَمٌ بعدد لا حذفٌ أبدًا"
            }
          },
          {
            re: "\\.\\s*fillna\\s*\\(",
            label: {
              en: "filling the deposit first &mdash; Lesson&nbsp;2 computes 117 of them from the rent, so the check would be testing its own fill",
              ar: "تعويضُ التأمين أولًا &mdash; فالدرس&nbsp;2 يحسب 117 منها من الإيجار، فيكون الفحصُ مختبرًا تعويضَه هو"
            }
          }
        ],
        solution: {
          code: code(
            "import pandas as pd",
            "",
            "FITTED = {\"deposit_months\": [1.0, 2.0, 3.0]}",
            "",
            "def check_deposit_ratio(d, fitted):",
            "    \"\"\"Stage 2, cross-column. Flags and counts; it never deletes a row.\"\"\"",
            "    months = (d[\"deposit\"] / d[\"monthly_rent\"]).round(4)",
            "    odd    = months.notna() & ~months.isin(fitted[\"deposit_months\"])",
            "    return d.assign(deposit_months=months, rent_ratio_odd=odd), {",
            "        \"step\": \"check deposit / monthly_rent\",",
            "        \"rows_in\": len(d), \"rows_out\": len(d),",
            "        \"pairs\": int(months.notna().sum()), \"odd\": int(odd.sum()),",
            "        \"note\": \"allowed %s; odd %s\" % (fitted[\"deposit_months\"],",
            "                                        d.loc[odd, \"listing_id\"].tolist())}",
            "",
            "out, row = check_deposit_ratio(raw, FITTED)",
            "print(row)"
          ),
          out: code(
            "{'step': 'check deposit / monthly_rent', 'rows_in': 503, 'rows_out': 503, 'pairs': 380, 'odd': 2, 'note': 'allowed [1.0, 2.0, 3.0]; odd [5208, 5062]'}"
          ),
          en: "<code>months.notna() &amp;</code> is what keeps the 123 rows with no deposit out of the flag: a comparison with <code>NaN</code> is <code>False</code>, so without it <code>~months.isin(...)</code> would mark every missing pair as odd and the log would read 125 instead of 2. The two it does find are listing&nbsp;5208 at 5.4 months and listing&nbsp;5062 at 0.0015 &mdash; exactly the chapter's two rent errors, and the only route to the daily rate of 25.",
          ar: "‏<code>months.notna() &amp;</code> هي ما يُبقي الصفوفَ الـ123 التي لا تأمينَ لها خارجَ العَلَم: فالمقارنةُ مع <code>NaN</code> هي <code>False</code>، فبدونها كانت <code>~months.isin(...)</code> ستعلّم كلَّ زوج مفقود شاذًّا فيقرأ السجلُّ 125 بدل 2. والاثنان اللذان يجدهما هما الإعلان&nbsp;5208 عند 5.4 شهرًا والإعلان&nbsp;5062 عند 0.0015 &mdash; وهما بالضبط خطأا الإيجار في هذا الفصل، والطريقُ الوحيد إلى الأجرة اليومية 25."
        },
        hint: {
          en: "Three things decide whether this step is right. The multiples come from the dictionary, so a market that starts allowing four months is a parameter change and not a code change. The flag must exclude the rows that have no deposit at all &mdash; there are 123 of them, and a comparison with a missing value is <code>False</code>. And the log needs the ids, because the whole point of a flag is that somebody reads it.",
          ar: "ثلاثةُ أشياء تحدّد هل هذه الخطوة صحيحة. فالمضاعفاتُ من القاموس، فسوقٌ تبدأ تسمح بأربعة شهور تغييرُ وسيط لا تغييرُ كود. ولا بد أن يستثني العَلَمُ الصفوفَ التي لا تأمينَ لها أصلًا &mdash; وهي 123 صفًّا، والمقارنةُ مع قيمة مفقودة <code>False</code>. ويحتاج السجلُّ المعرّفات، لأن كلَّ معنى العَلَم أن يقرأه أحد."
        },
        explain: {
          en: "This is the one check in the chapter that finds the daily rate of 25. Every rule built on the rent column alone reads listing&nbsp;5208 as slightly cheap and nothing more: the lower IQR fence is 1.8750 so it cannot flag from below at all, the robust z is &minus;2.3607 against a threshold of 3.5, and lowering the threshold to 2.3 to catch it would flag 24 rents for a human to read. A ratio across two columns settles it in one line, because <code>deposit / monthly_rent</code> is exactly 1, 2 or 3 in 378 of the 380 recorded pairs and the two exceptions are precisely the two rent errors. Three details are the difference between a step and a one-liner. Reading the multiples from <code>fitted</code> means a market that starts allowing four months is a parameter change, not a code change. Flagging instead of deleting is the chapter's rule for every stage-2 finding, and it is what lets Lesson&nbsp;6 assert that the row count has not moved since stage&nbsp;1. And the check has to run <em>before</em> stage&nbsp;3: Lesson&nbsp;2's deposit rule computes a blank deposit as <code>months &times; monthly_rent</code> for 117 flats, so afterwards the ratio would mostly be testing its own arithmetic. One honest caveat the lesson insists on: this is domain knowledge in an arithmetic disguise &mdash; nothing in any file says which columns relate, that the relation is a whole multiple, or how exact it has to be. And the check narrows without repairing: 135 shekels of deposit is two months of 67.5 or three of 45, both plausible Rafah rents, so the cell is voided and flagged and somebody rings the agency.",
          ar: "هذا هو الفحصُ الوحيد في الفصل الذي يجد الأجرةَ اليومية 25. فكلُّ قاعدة مبنيّة على عمود الإيجار وحده تقرأ الإعلان&nbsp;5208 رخيصًا قليلًا ولا شيء غير ذلك: فالسياجُ الربيعي الأدنى 1.8750 فلا يستطيع التعليمَ من أسفل أصلًا، وz الحصينة &minus;2.3607 مقابل عتبة 3.5، وإنزالُ العتبة إلى 2.3 لالتقاطه كان سيعلّم 24 إيجارًا ليقرأها إنسان. وتحسمه نسبةٌ بين عمودين في سطر واحد، لأن <code>deposit / monthly_rent</code> هي 1 أو 2 أو 3 بالضبط في 378 من الأزواج الـ380 المسجّلة، والاستثناءان هما بعينهما خطأا الإيجار. وثلاثةُ تفاصيل هي الفرقُ بين خطوةٍ وسطرٍ عابر. فقراءةُ المضاعفات من <code>fitted</code> تعني أن سوقًا تبدأ تسمح بأربعة شهور تغييرُ وسيط لا تغييرُ كود. والتعليمُ بدل الحذف هو قاعدةُ الفصل لكل نتيجة في المرحلة&nbsp;2، وهو ما يُمكّن الدرسَ&nbsp;6 من تأكيد أن عددَ الصفوف لم يتحرّك منذ المرحلة&nbsp;1. ولا بد أن يُشغَّل الفحصُ <em>قبل</em> المرحلة&nbsp;3: فقاعدةُ التأمين في الدرس&nbsp;2 تحسب التأمينَ الفارغ <code>months &times; monthly_rent</code> لـ117 شقة، فبعدها تكون النسبةُ في معظمها مختبرةً حسابَها هي. وتحذيرٌ أمين يُلحّ عليه الدرس: هذه معرفةٌ ميدانية في ثوب حساب &mdash; فليس في أي ملف ما يقول أيُّ الأعمدة يترابط، ولا أن العلاقةَ مضاعفٌ صحيح، ولا كم يلزم أن تكون مضبوطة. والفحصُ يضيّق ولا يُصلح: فـ135 شيكلًا تأمينًا هي شهران من 67.5 أو ثلاثة من 45، وكلاهما إيجارٌ معقول في رفح، فتُبطَل الخليةُ وتُعلَّم ويهاتف أحدٌ الوكالة."
        }
      }
    ]
  };
})();
