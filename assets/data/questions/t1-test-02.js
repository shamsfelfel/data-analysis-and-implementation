/* Test 2 — What the Values Mean (Theory chapter 1, Lesson 2).
   24 questions: easy 8 / medium 10 / hard 6. Every output was produced by running the code
   (Python 3.13, pandas 2.2.3). The school-conditions columns, the attendance, book-count and
   satisfaction counts are invented for teaching, as the lesson says. */
window.DABanks = window.DABanks || {};
(function () {
  function L(lines) { return lines.join("\n"); }

  window.DABanks["t1-test-02"] = {
    title: { en: "Test 2 — What the Values Mean", ar: "اختبار 2 — ماذا تعني القيم؟" },
    intro: {
      en: "Twenty-four questions on Lesson 2: families and levels of measurement, the vanishing zero, declaring a level in pandas, encoding a level for a model, and honest reporting of contested scales. Allow about 40 minutes; most questions take one or two minutes. The hint, the answer and the explanation stay hidden until you ask for them or answer. The damage, temperature and repair-time columns of the school sheet and every count in this test are invented for teaching; they are not assessment results.",
      ar: "أربعة وعشرون سؤالًا عن الدرس 2: العائلتان ومستويات القياس، والصفر المتبخّر، وإعلان المستوى في pandas، وترميز المستوى لنموذج، والعرض الصادق للمقاييس الخلافية. خصّص نحو 40 دقيقة؛ ومعظم الأسئلة يحتاج إلى دقيقة أو دقيقتين. يبقى التلميح والجواب والشرح مخفيّة إلى أن تطلبها أو تجيب. أعمدة الضرر والحرارة ومدة الإصلاح في ورقة المدارس وكل عدّ في هذا الاختبار مختلقة لأغراض التعليم، وليست نتائج تقييم حقيقية."
    },
    questions: [

      /* ---------------- Concept 1 ---------------- */
      { id: "t1l2q01", type: "tf", level: "easy", topics: ["t1-numbers-that-name", "t1-categorical-numerical"],
        q: { en: 'In the rental table, <code>df.select_dtypes("number").columns</code> returns exactly the columns whose averages are meaningful.',
             ar: 'في جدول الإيجارات، تُرجع <code>df.select_dtypes("number").columns</code> بالضبط الأعمدة التي يكون لمتوسطها معنى.' },
        truth: false,
        hint: { en: 'Which information does <code>select_dtypes</code> use to choose, and does pandas know what your columns mean?',
                ar: 'أي معلومة تستعملها <code>select_dtypes</code> لتختار، وهل يعرف pandas ماذا تعني أعمدتك؟' },
        explain: { en: 'False. <code>select_dtypes</code> chooses by <em>storage</em>, so it returned <code>listing_id</code>, <code>monthly_rent</code>, <code>area_m2</code> and <code>rooms</code>. The first of them is an int64 label whose mean (1030.5) describes no listing. The claim is tempting because the result looks like “the numeric columns”, but the meaning lives in a person’s head: write it down once, in a dictionary such as <code>FAMILY</code>, and select by that.',
                   ar: 'خطأ. تختار <code>select_dtypes</code> بحسب <em>التخزين</em>، فأعادت <code>listing_id</code> و<code>monthly_rent</code> و<code>area_m2</code> و<code>rooms</code>. والأول تسمية مخزّنة int64 ومتوسطها (1030.5) لا يصف أي إعلان. والعبارة مغرية لأن الناتج يبدو «الأعمدة الرقمية»، لكن المعنى يعيش في رأس الإنسان: اكتبه مرة واحدة في قاموس مثل <code>FAMILY</code> واختر بحسبه.' } },

      /* ---------------- Concept 2 ---------------- */
      { id: "t1l2q02", type: "match", level: "medium", topics: ["t1-relabeling-test", "t1-levels-of-measurement", "t1-interval"],
        q: { en: 'Each column of the school sheet may be re-labelled in exactly one way without throwing information away. Match each column to the re-labelling it allows.',
             ar: 'يمكن إعادة تسمية قيم كل عمود في ورقة المدارس بطريقة واحدة بالضبط دون أن تضيع معلومة. وصّل كل عمود بإعادة التسمية التي يسمح بها.' },
        leftHead: { en: 'Column', ar: 'العمود' },
        rightHead: { en: 'Re-labelling that keeps every answer', ar: 'إعادة التسمية التي تحفظ كل جواب' },
        pairs: [
          { l: { code: "governorate" },
            r: { en: 'Any renaming at all (Gaza to “G”, Rafah to “R”)', ar: 'أي إعادة تسمية إطلاقًا (غزة إلى «غ» ورفح إلى «ر»)' } },
          { l: { code: "damage_level" },
            r: { en: 'Any renaming that keeps the order (1, 2, 3 becomes 1, 5, 6)', ar: 'أي إعادة تسمية تحفظ الترتيب (تصير 1 و2 و3 هي 1 و5 و6)' } },
          { l: { code: "classroom_temp_c" },
            r: { en: 'A stretch and a shift (°C to °F)', ar: 'تمدّد وإزاحة معًا (من °م إلى °ف)' } },
          { l: { code: "repair_weeks" },
            r: { en: 'A stretch only (weeks to days)', ar: 'تمدّد فقط (من الأسابيع إلى الأيام)' } }
        ],
        hint: { en: 'Decide each column’s level first, then recall what that level may be re-labelled by. Each rung of the ladder allows fewer re-labellings than the one below.',
                ar: 'قرّر مستوى كل عمود أولًا، ثم تذكّر بماذا يجوز تغيير تسمية قيم ذلك المستوى. كل درجة في السلّم تسمح بإعادات تسمية أقل من الدرجة التي تحتها.' },
        explain: { en: 'Nominal values may be renamed freely. Ordinal values may be renamed in any way that keeps the order, so 1, 2, 3 may become 1, 5, 6. Interval values allow a stretch and a shift, because their zero is arbitrary (Celsius to Fahrenheit). Ratio values allow a stretch only, because the true zero must stay at zero (weeks to days). The more a level lets you do with the numbers, the fewer re-labellings it permits, and a statistic is legal only if it survives every re-labelling its level allows.',
                   ar: 'يقبل الاسمي أي إعادة تسمية. ويقبل الترتيبي ما يحفظ الترتيب فقط، فيجوز أن تصير 1 و2 و3 هي 1 و5 و6. ويقبل الفتري التمدّد والإزاحة لأن صفره اعتباطي (من السلسيوس إلى الفهرنهايت). ويقبل النسبي التمدّد وحده لأن صفره الحقيقي يجب أن يبقى صفرًا (من الأسابيع إلى الأيام). فكلما سمح المستوى بعمليات أكثر على الأرقام قلّت إعادات التسمية الجائزة له، ولا يكون الإحصاء جائزًا إلا إذا صمد أمام كل إعادة تسمية يسمح بها مستوى العمود.' } },

      { id: "t1l2q03", type: "contrast", level: "medium", topics: ["t1-nominal", "t1-ordinal", "t1-allowed-operations"],
        neither: true,
        q: { en: 'For each statement, say whether it holds for nominal columns only, for ordinal columns only, for both, or for neither.',
             ar: 'قرّر لكل عبارة هل تصدق على الأعمدة الاسمية فقط، أم الترتيبية فقط، أم كليهما، أم لا على أيٍّ منهما.' },
        concepts: [
          { en: 'Nominal (e.g. <code>governorate</code>)', ar: 'اسمي (مثل <code>governorate</code>)' },
          { en: 'Ordinal (e.g. <code>damage_level</code>)', ar: 'ترتيبي (مثل <code>damage_level</code>)' }
        ],
        rows: [
          { s: { en: 'Counting how many rows hold each value is a legal summary.', ar: 'عدّ الصفوف التي تحمل كل قيمة ملخص جائز.' }, a: 2 },
          { s: { en: 'Sorting the values from lowest to highest means something.', ar: 'لفرز القيم من الأدنى إلى الأعلى معنى.' }, a: 1 },
          { s: { en: 'Renaming the values with random letters loses no information.', ar: 'استبدال القيم بحروف عشوائية لا يُضيّع أي معلومة.' }, a: 0 },
          { s: { en: 'The median is a legal measure of the centre.', ar: 'الوسيط مقياس جائز للمركز.' }, a: 1 },
          { s: { en: 'Sorting the bars of a bar chart from tallest to shortest keeps the chart honest.', ar: 'ترتيب أعمدة الرسم من الأطول إلى الأقصر يُبقي الرسم صادقًا.' }, a: 0 },
          { s: { en: 'The mode is a legal measure of the centre.', ar: 'المنوال مقياس جائز للمركز.' }, a: 2 },
          { s: { en: 'The mean of numeric codes given to the values is a legal measure of the centre.', ar: 'المتوسط الحسابي لرموز عددية تُعطى للقيم مقياس جائز للمركز.' }, a: 3 }
        ],
        hint: { en: 'Ordinal keeps everything nominal has and adds an order. Ask what that order buys, and what it still does not give you.',
                ar: 'الترتيبي يحتفظ بكل ما في الاسمي ويضيف ترتيبًا. اسأل: ماذا يتيح هذا الترتيب؟ وماذا لا يتيحه بعد؟' },
        explain: { en: 'Counting and the mode need only “same or different”, so both levels allow them. The order, and with it sorting and the median, is exactly what ordinal adds. Two statements are nominal-only because they depend on there being no order: random letters lose nothing only when there is no order to lose, and sorting bars by height keeps a chart honest only when there is no scale to scramble. The mean of codes belongs to neither level: even ordinal data has unknown gaps, so the codes’ sizes are an invention.',
                   ar: 'العدّ والمنوال لا يحتاجان إلا إلى «متطابق أو مختلف»، فيسمح بهما المستويان. والترتيب، ومعه الفرز والوسيط، هو بالضبط ما يضيفه الترتيبي. وعبارتان تخصان الاسمي وحده لأنهما تفترضان غياب الترتيب: فالحروف العشوائية لا تُضيّع شيئًا إلا إذا لم يكن هناك ترتيب يضيع، وترتيب الأعمدة بحسب الارتفاع لا يُبقي الرسم صادقًا إلا إذا لم يكن على المحور سلّم يختلط. أما متوسط الرموز فلا يجوز لأيٍّ منهما: حتى البيانات الترتيبية مسافاتها مجهولة، فأحجام الرموز اختلاق.' } },

      /* ---------------- Concept 3 ---------------- */
      { id: "t1l2q04", type: "output", level: "medium", topics: ["t1-true-zero", "t1-interval", "t1-ratio"], lang: "python",
        q: { en: 'Rents are converted from shekels (NIS) to dollars at 3.6 NIS per USD (an assumption made for this exercise). Type exactly what the program prints (four lines).',
             ar: 'تُحوَّل الإيجارات من الشيكل إلى الدولار بسعر 3.6 شيكل للدولار (افتراض وُضع لهذا التمرين). اكتب بالضبط ما يطبعه البرنامج (أربعة أسطر).' },
        code: L([
          'def to_f(c):',
          '    return c * 9 / 5 + 32',
          '',
          'rent_nis = [200, 500]',
          'temp_c = [15, 30]',
          'rent_usd = [r / 3.6 for r in rent_nis]',
          'print(round(rent_nis[1] / rent_nis[0], 2))',
          'print(round(rent_usd[1] / rent_usd[0], 2))',
          'print(round(temp_c[1] / temp_c[0], 2))',
          'print(round(to_f(temp_c[1]) / to_f(temp_c[0]), 2))'
        ]),
        blanks: [ { accept: ["2.5\n2.5\n2.0\n1.46"], lines: 4 } ],
        hint: { en: 'Work out the Fahrenheit values first. Which of the two quantities still has the same ratio after the unit changes?',
                ar: 'احسب قيم الفهرنهايت أولًا. أي الكميتين تحتفظ بالنسبة نفسها بعد تغيير الوحدة؟' },
        explain: { en: 'It prints 2.5, 2.5, 2.0 and 1.46. Changing currency multiplies both rents by the same constant, so 500 / 200 survives: 0 NIS is 0 USD, a true zero. Changing °C to °F also shifts the zero (0 °C is 32 °F): 15 °C and 30 °C become 59 °F and 86 °F, a ratio of 1.46 instead of 2.0. So “twice as warm” was a fact about the thermometer, not about the weather. On an interval scale only differences survive; ratios need a true zero.',
                   ar: 'يطبع 2.5 ثم 2.5 ثم 2.0 ثم 1.46. تغيير العملة يضرب الإيجارين في ثابت واحد، فتصمد النسبة 500 / 200: فـ 0 شيكل يساوي 0 دولار، أي صفر حقيقي. أما تغيير °م إلى °ف فيُزيح الصفر أيضًا (0 °م تساوي 32 °ف): فتصير 15 °م و30 °م هي 59 °ف و86 °ف، أي نسبة 1.46 بدل 2.0. فـ«ضعف الدفء» كان حقيقة عن الميزان لا عن الطقس. في المقياس الفتري تصمد الفروق وحدها؛ والنسب تحتاج إلى صفر حقيقي.' } },

      { id: "t1l2q05", type: "fill", level: "easy", topics: ["t1-zero-in-identifiers", "t1-numbers-that-name"], lang: "python",
        q: { en: 'School codes such as <code>007</code> are names that happen to be written with digits. Fill the blanks so that <code>read_csv</code> keeps the leading zeros.',
             ar: 'رموز المدارس مثل <code>007</code> أسماء تصادف أنها مكتوبة بأرقام. أكمل الفراغين ليحتفظ <code>read_csv</code> بالأصفار البادئة.' },
        code: L([
          'import io',
          'import pandas as pd',
          '',
          'raw = "school_code,students\\n007,455\\n042,553\\n"',
          'codes = pd.read_csv(io.StringIO(raw), ____1____={"school_code": ____2____})',
          'print(codes["school_code"].tolist())'
        ]),
        blanks: [
          { accept: ["dtype"], label: { en: 'keyword', ar: 'اسم المعامل' } },
          { accept: ["str", '"str"', "'str'", "object", '"object"', "'object'", '"string"', "'string'"], label: { en: 'type', ar: 'النوع' } }
        ],
        hint: { en: 'The first blank is the argument that tells <code>read_csv</code> the type of a column; the second is the Python type for text.',
                ar: 'الفراغ الأول هو المعامل الذي يخبر <code>read_csv</code> بنوع العمود؛ والثاني هو نوع النص في بايثون.' },
        explain: { en: '<code>dtype={"school_code": str}</code> says, at read time, that the column is a name. Without it pandas parses <code>007</code> as the integer 7 and nothing complains: the codes become 7 and 42 and no longer match the paper forms. The program then prints <code>[\'007\', \'042\']</code>. The cure is to state the type up front; Lesson 4 teaches <code>dtype=</code> properly.',
                   ar: 'العبارة <code>dtype={"school_code": str}</code> تقول عند القراءة إن العمود اسم. ومن دونها يحلّل pandas القيمة <code>007</code> عددًا صحيحًا هو 7 ولا يعترض شيء: تصير الرموز 7 و42 ولا تطابق الاستمارات الورقية. ويطبع البرنامج بعدها <code>[\'007\', \'042\']</code>. والعلاج أن تذكر النوع مسبقًا؛ ويعلّم الدرس 4 المعامل <code>dtype=</code> بتفصيل.' } },

      { id: "t1l2q06", type: "error", level: "medium", topics: ["t1-real-zero-kept", "t1-vanishing-zero"], lang: "python",
        q: { en: 'A clinic log has two columns. In <code>fridge_temp_c</code> a reading of <code>0.0</code> is real (and an alarm). In <code>pupils_present</code> the export wrote <code>0</code> for classes that were not counted. The program should report an honest mean for each. Click the line whose rule silently damages the result.',
             ar: 'في سجل عيادة عمودان. في <code>fridge_temp_c</code> القراءة <code>0.0</code> حقيقية (وهي إنذار). وفي <code>pupils_present</code> كتب التصدير <code>0</code> للصفوف التي لم تُعدّ. يجب أن يعرض البرنامج متوسطًا صادقًا لكلٍّ منهما. انقر السطر الذي تُفسد قاعدته النتيجة بصمت.' },
        code: L([
          'import numpy as np',
          'import pandas as pd',
          'log = pd.DataFrame({',
          '    "fridge_temp_c":  [4.1, 3.8, 0.0, 5.2, 4.4],',
          '    "pupils_present": [31, 0, 28, 0, 30],',
          '    "counted":        [True, False, True, False, True]})',
          'log["pupils_present"] = log["pupils_present"].mask(~log["counted"])',
          'log = log.replace(0, np.nan)',
          'print(log["fridge_temp_c"].mean())',
          'print(log["pupils_present"].mean())'
        ]),
        answer: 8,
        hint: { en: 'One line applies a single rule to every zero in the table. Does 0 mean the same thing in both columns?',
                ar: 'سطر واحد يطبّق قاعدة واحدة على كل صفر في الجدول. هل يعني الصفر الشيء نفسه في العمودين؟' },
        explain: { en: 'Line 8. The mask on line 7 already blanks the disguised zeros of <code>pupils_present</code>, using the <code>counted</code> column, so the table-wide <code>replace(0, np.nan)</code> adds nothing there, yet it erases the real fridge reading of 0.0. The printed mean rises from the true 3.5 to 4.375 and the alarm disappears. Line 7 is tempting to blame because it also creates missing values, but it acts only where the log says nobody counted. The rule: ask what zero means in each column, then act on that column only.',
                   ar: 'السطر 8. فالقناع في السطر 7 يُفرغ أصلًا الأصفار المتنكّرة في <code>pupils_present</code> بالاعتماد على العمود <code>counted</code>، فلا يضيف <code>replace(0, np.nan)</code> على مستوى الجدول كله شيئًا هناك، لكنه يمحو القراءة الحقيقية 0.0 في الثلاجة. فيرتفع المتوسط المطبوع من الحقيقي 3.5 إلى 4.375 ويختفي الإنذار. ومن المغري لوم السطر 7 لأنه يصنع قيمًا مفقودة أيضًا، لكنه لا يعمل إلا حيث يقول السجل إن أحدًا لم يعدّ. القاعدة: اسأل ماذا يعني الصفر في كل عمود، ثم تصرّف في ذلك العمود وحده.' },
        solution: { code: L([
                      'log["pupils_present"] = log["pupils_present"].mask(~log["counted"])',
                      'print(log["fridge_temp_c"].mean())      # 3.5: the real 0.0 stays',
                      'print(log["pupils_present"].mean())'
                    ]),
                    en: 'Delete line 8: the mask on line 7 is the only rule the data justifies.',
                    ar: 'احذف السطر 8: فالقناع في السطر 7 هو القاعدة الوحيدة التي تبرّرها البيانات.' } },

      { id: "t1l2q07", type: "compare", level: "hard", topics: ["t1-vanishing-zero", "t1-real-zero-kept"], lang: "python",
        q: { en: 'The attendance table <code>log</code> was exported with every blank written as <code>0</code>. Its <code>present</code> column holds 31, 0, 28, 0, 30, 0, 26, 33 for eight classes; classes 2 and 6 have status <code>not_reported</code> and all the others <code>reported</code> (class 4 truly had 0 pupils present: it was on a trip). Both versions try to give the mean attendance. Version A prints <code>29.6 over 5</code> and version B prints <code>24.7 over 6</code>. Which statement is true?',
             ar: 'صُدّر جدول الحضور <code>log</code> وكل خانة فارغة فيه مكتوبة <code>0</code>. يحمل عمود <code>present</code> القيم 31 و0 و28 و0 و30 و0 و26 و33 لثمانية صفوف؛ حالة الصفين 2 و6 هي <code>not_reported</code> وحالة الباقي <code>reported</code> (والصف 4 كان فيه صفر حاضرين فعلًا: كان في رحلة). تحاول النسختان إعطاء متوسط الحضور. تطبع النسخة A القيمة <code>29.6 over 5</code> وتطبع B القيمة <code>24.7 over 6</code>. أي عبارة صحيحة؟' },
        codeA: L([
          'import numpy as np',
          'p = log["present"].replace(0, np.nan)',
          'print(p.mean().round(1), "over", p.count())'
        ]),
        codeB: L([
          'bad = log["status"] == "not_reported"',
          'p = log["present"].mask(bad)',
          'print(p.mean().round(1), "over", p.count())'
        ]),
        options: [
          { en: 'A is better: a zero in a count column can never be a real answer, so blanking every zero gives the cleanest mean, even though it rests on fewer classes.',
            ar: 'A أفضل: الصفر في عمود العدّ لا يمكن أن يكون إجابة حقيقية، فإفراغ كل صفر يعطي أنظف متوسط وإن استند إلى صفوف أقل.' },
          { en: 'The two give the same mean, because <code>mean()</code> skips missing values whichever zeros were turned into missing, so the choice is only style.',
            ar: 'النسختان تعطيان المتوسط نفسه، لأن <code>mean()</code> يتخطى القيم المفقودة أيًّا كانت الأصفار التي صارت مفقودة، فالاختيار مسألة ذوق فقط.' },
          { en: 'B is better: it blanks only the rows marked <code>not_reported</code>, so the real zero stays. It works only because a status column exists, and 24.7 describes the six classes that answered.',
            ar: 'B أفضل: فهي تُفرغ الصفوف المعلَّمة <code>not_reported</code> فقط، فيبقى الصفر الحقيقي. لكنها تنجح لأن عمود حالة موجود، والقيمة 24.7 تصف الصفوف الستة التي أجابت.' },
          { en: 'B is better, and its 24.7 is the mean attendance of all eight classes, because <code>mean()</code> fills in the classes that did not report.',
            ar: 'B أفضل، و24.7 هي متوسط حضور الصفوف الثمانية كلها، لأن <code>mean()</code> يملأ الصفوف التي لم تُبلّغ.' }
        ],
        answer: 2,
        hint: { en: 'Compare which rows end up missing in each version, then ask whether every zero in this column was a blank.',
                ar: 'قارن أي الصفوف تصير مفقودة في كل نسخة، ثم اسأل: هل كان كل صفر في هذا العمود خانة فارغة؟' },
        explain: { en: 'B. Version A applies one rule to a column in which 0 means two things: it blanks the two silent classes but also the class that truly had 0 present, so its mean overshoots (29.6 over 5). Version B blanks only the rows whose status is <code>not_reported</code> (24.7 over 6). They differ because they blank different rows, so “the same mean” is wrong, and <code>mean()</code> never fills anything in. B still has limits: without a status column you would have to ask the data owner, and its mean describes the responders, not necessarily all eight classes. Always report how many rows a mean rests on.',
                   ar: 'B. تطبّق النسخة A قاعدة واحدة على عمود للصفر فيه معنيان: فهي تُفرغ الصفين الصامتين لكنها تُفرغ أيضًا الصف الذي كان فيه صفر حاضرين فعلًا، فيتجاوز متوسطها الحد (29.6 على 5). أما B فتُفرغ الصفوف التي حالتها <code>not_reported</code> فقط (24.7 على 6). وهما تختلفان لأنهما تُفرغان صفوفًا مختلفة، فعبارة «المتوسط نفسه» خاطئة، و<code>mean()</code> لا يملأ شيئًا أبدًا. وفي B حدود: من دون عمود حالة عليك أن تسأل صاحب البيانات، ومتوسطها يصف المجيبين لا الصفوف الثمانية كلها بالضرورة. اذكر دائمًا على كم صفًّا يستند المتوسط.' } },

      { id: "t1l2q08", type: "write", level: "hard", topics: ["t1-vanishing-zero", "t1-real-zero-kept"], lang: "python",
        q: { en: 'The export of a book-count form wrote every blank as <code>0</code>. A zero is a real answer only where <code>status</code> is <code>reported</code>. Using the table below, write code that blanks only the disguised zeros of <code>books</code>, then prints one line such as <code>mean 86.5 over 4 of 6 classes</code>: the mean, the number of classes it rests on, and the number of rows.',
             ar: 'كتب تصدير استمارة عدّ الكتب كل خانة فارغة <code>0</code>. ولا يكون الصفر إجابة حقيقية إلا حيث تكون <code>status</code> هي <code>reported</code>. بالاعتماد على الجدول أدناه، اكتب كودًا يُفرغ الأصفار المتنكّرة في <code>books</code> فقط، ثم يطبع سطرًا واحدًا مثل <code>mean 86.5 over 4 of 6 classes</code>: المتوسط، وعدد الصفوف التي يستند إليها، وعدد الصفوف الكلي.' },
        code: L([
          'import pandas as pd',
          '',
          'form = pd.DataFrame({',
          '    "class_id": [1, 2, 3, 4, 5, 6],',
          '    "books":    [120, 0, 85, 0, 0, 141],',
          '    "status":   ["reported", "not_reported", "reported",',
          '                 "reported", "not_reported", "reported"]})'
        ]),
        starter: '# your code below\n',
        lines: 7,
        checks: [
          { re: '(==|!=)\\s*["\']not_reported["\']|\\.(eq|ne)\\s*\\(\\s*["\']not_reported["\']', label: { en: 'Uses the status column: the rows to blank are the ones marked not_reported', ar: 'يعتمد عمود الحالة: الصفوف التي تُفرغ هي المعلَّمة not_reported' } },
          { re: '\\.mask\\s*\\(|\\.where\\s*\\(|np\\.nan|pd\\.NA|None', label: { en: 'Turns exactly those zeros into missing values (mask, where or NaN)', ar: 'يحوّل هذه الأصفار تحديدًا إلى قيم مفقودة (mask أو where أو NaN)' } },
          { re: '\\.mean\\s*\\(', label: { en: 'Takes the mean of the masked column', ar: 'يحسب متوسط العمود بعد الإفراغ' } },
          { re: '\\.count\\s*\\(|notna\\s*\\(\\s*\\)\\s*\\.sum|notnull\\s*\\(\\s*\\)\\s*\\.sum', label: { en: 'Counts how many values the mean rests on', ar: 'يعدّ كم قيمة يستند إليها المتوسط' } },
          { re: 'print\\s*\\(', label: { en: 'Prints the report line', ar: 'يطبع سطر التقرير' } }
        ],
        forbid: [
          { re: 'replace\\s*\\(\\s*0', label: { en: 'replace(0, np.nan): it would erase the real zero as well', ar: 'replace(0, np.nan): فهي تمحو الصفر الحقيقي أيضًا' } }
        ],
        solution: {
          code: L([
            'form["books"] = form["books"].mask(form["status"] == "not_reported")',
            'n = form["books"].count()',
            'print("mean", round(form["books"].mean(), 1), "over", n, "of", len(form), "classes")'
          ]),
          out: 'mean 86.5 over 4 of 6 classes',
          en: 'Only the two rows marked not_reported become missing; the real zero of class 4 stays in the mean.',
          ar: 'لا يصير مفقودًا إلا الصفان المعلَّمان not_reported؛ ويبقى الصفر الحقيقي للصف 4 في المتوسط.'
        },
        hint: { en: 'You need three things: which rows to blank, the mean of what is left, and how many values are left.',
                ar: 'تحتاج إلى ثلاثة أشياء: أي الصفوف تُفرغ، ومتوسط ما تبقّى، وكم قيمة تبقّت.' },
        explain: { en: 'The status column is the evidence: only rows marked <code>not_reported</code> are blanks, so the 0 of class 4 (reported) is a real answer and stays. <code>mask</code> (or <code>where</code>) blanks exactly those rows, <code>mean()</code> skips them, and <code>count()</code> tells the reader that the mean rests on 4 of 6 rows. The shortcut <code>replace(0, np.nan)</code> would also erase the real zero and print 115.3 over 3: higher, and resting on half the rows.',
                   ar: 'عمود الحالة هو الدليل: لا تكون الخانة فارغة إلا في الصفوف المعلَّمة <code>not_reported</code>، فصفر الصف 4 (مبلَّغ) إجابة حقيقية ويبقى. و<code>mask</code> (أو <code>where</code>) يُفرغ هذه الصفوف تحديدًا، و<code>mean()</code> يتخطاها، و<code>count()</code> يخبر القارئ بأن المتوسط يستند إلى 4 من 6 صفوف. أما الاختصار <code>replace(0, np.nan)</code> فيمحو الصفر الحقيقي أيضًا ويطبع 115.3 على 3: أعلى، ويستند إلى نصف الصفوف.' } },

      /* ---------------- Concept 4 ---------------- */
      { id: "t1l2q09", type: "mcq", level: "easy", topics: ["t1-discrete-continuous", "t1-ratio"],
        q: { en: '<code>rooms</code> is a count: the 60 listings have 1 to 5 rooms. Its mean is 3.17, and a colleague objects: “No flat has 3.17 rooms, so this mean is meaningless.” What is the best reply?',
             ar: '<code>rooms</code> عدّ: لدى الإعلانات الستين من غرفة إلى 5 غرف. ومتوسطها 3.17، ويعترض زميل: «لا شقة فيها 3.17 غرفة، فهذا المتوسط بلا معنى». ما أفضل ردّ؟' },
        options: [
          { en: 'Report the mode instead: a discrete column is really nominal, so a mean is never allowed for it.',
            ar: 'اعرض المنوال بدلًا منه: العمود المنفصل اسمي في الحقيقة، فلا يجوز له متوسط أبدًا.' },
          { en: 'Round every room count to a whole number first, because the mean of a discrete column must itself be a whole number.',
            ar: 'قرّب كل عدد غرف إلى عدد صحيح أولًا، لأن متوسط العمود المنفصل يجب أن يكون هو نفسه عددًا صحيحًا.' },
          { en: 'The mean is legal only because rooms is stored as float64 here; with whole-number storage it would be meaningless.',
            ar: 'المتوسط جائز هنا لأن rooms مخزّن بنوع float64 فقط؛ ولو خُزّن أعدادًا صحيحة لما كان له معنى.' },
          { en: 'The mean is fine: rooms is a ratio column, and a statistic need not be a value that some row can take.',
            ar: 'المتوسط سليم: فـ rooms عمود نسبي، والإحصاء لا يلزم أن يكون قيمة يحملها صف ما.' }
        ],
        answer: 3,
        hint: { en: 'What makes a statistic legal at a level of measurement: the answer being a possible row, or the column having equal gaps and a true zero?',
                ar: 'ما الذي يجعل الإحصاء جائزًا عند مستوى قياس: كون الجواب صفًّا ممكنًا، أم كون العمود ذا مسافات متساوية وصفر حقيقي؟' },
        explain: { en: 'A count of rooms is ratio data: the gaps are equal and zero rooms would mean no room, so sums, means and “twice as many” are meaningful. A mean describes the column as a whole, not any row, so 3.17 rooms per listing is as legitimate as 2.4 children per family. Discrete does not mean nominal, rounding first throws information away, and storage never decides the level: <code>rooms</code> prints as float64 only because one blank forced a NaN into the column.',
                   ar: 'عدد الغرف بيانات نسبية: مسافاته متساوية وصفره يعني انعدام الغرف، فللمجاميع والمتوسطات وعبارة «ضعف العدد» معنى. والمتوسط يصف العمود كله لا صفًّا بعينه، فمتوسط 3.17 غرفة لكل إعلان مشروع مثل 2.4 طفل لكل أسرة. والمنفصل لا يعني الاسمي، والتقريب أولًا يُضيّع معلومات، والتخزين لا يحدّد المستوى أبدًا: فـ <code>rooms</code> يُطبع float64 لأن فراغًا واحدًا أدخل NaN إلى العمود فقط.' } },

      { id: "t1l2q10", type: "mcq", level: "easy", topics: ["t1-allowed-operations", "t1-ordinal", "t1-nominal"],
        q: { en: 'You draw a bar chart of counts and sort the bars from tallest to shortest to make it tidy. Which statement is right?',
             ar: 'ترسم مخطط أعمدة للأعداد وترتّب الأعمدة من الأطول إلى الأقصر لتبدو مرتبة. أي عبارة صحيحة؟' },
        options: [
          { en: 'It is harmless for <code>governorate</code> but scrambles <code>damage_level</code> (slight &lt; partial &lt; total).',
            ar: 'لا ضرر منه مع <code>governorate</code> لكنه يخلط <code>damage_level</code> (طفيف &lt; جزئي &lt; كلّي).' },
          { en: 'It is harmless for both: bar height is just a count, so the order of the bars carries no meaning.',
            ar: 'لا ضرر منه مع أيٍّ منهما: ارتفاع العمود مجرد عدّ، فلا معنى لترتيب الأعمدة.' },
          { en: 'It misleads for both: any reordering of bars implies an order that the data does not have.',
            ar: 'يضلّل في الحالتين: أي إعادة ترتيب للأعمدة توحي بترتيب ليس في البيانات.' },
          { en: 'It is harmless for <code>damage_level</code>, because it has an order, but it scrambles <code>governorate</code>.',
            ar: 'لا ضرر منه مع <code>damage_level</code> لأن له ترتيبًا، لكنه يخلط <code>governorate</code>.' }
        ],
        answer: 0,
        hint: { en: 'Which of the two columns has a scale along the axis that a reader will follow from left to right?',
                ar: 'أي العمودين له سلّم على المحور يتبعه القارئ من اليسار إلى اليمين؟' },
        explain: { en: 'A nominal axis has no natural order to break, so sorting by size is fine and even helps the eye. An ordinal axis is a scale: bars sorted by height would put “partial” first and “total” in the middle, and the reader would read a different story. Reordering bars of a nominal column implies nothing, so it does not mislead there. Draw ordinal bars in scale order, empty categories included (that is what <code>value_counts().sort_index()</code> gives on an ordered category); the last option reverses the rule.',
                   ar: 'المحور الاسمي ليس له ترتيب طبيعي يمكن كسره، فالفرز بالحجم لا بأس به بل يساعد العين. أما المحور الترتيبي فسلّم: ترتيب الأعمدة بالارتفاع سيضع «جزئي» أولًا و«كلّي» في الوسط، فيقرأ القارئ قصة أخرى. وإعادة ترتيب أعمدة عمود اسمي لا توحي بشيء فلا تضلّل هناك. ارسم الأعمدة الترتيبية بترتيب السلّم مع الفئات الفارغة (وهذا ما يعطيه <code>value_counts().sort_index()</code> على فئة مرتّبة)؛ والخيار الأخير يعكس القاعدة.' } },

      { id: "t1l2q11", type: "order", level: "easy", topics: ["t1-level-questions", "t1-levels-of-measurement"],
        q: { en: 'Put the steps in the order you take them when you look for the level of an unknown column.',
             ar: 'رتّب الخطوات بالترتيب الذي تتبعه حين تبحث عن مستوى عمود مجهول.' },
        items: [
          { en: 'Can the values be put in a natural order? If not, the column is nominal.',
            ar: 'هل يمكن ترتيب القيم ترتيبًا طبيعيًّا؟ إن لم يمكن فالعمود اسمي.' },
          { en: 'Are the gaps between neighbours equal and known? If not, the column is ordinal.',
            ar: 'هل المسافات بين الجارات متساوية ومعلومة؟ إن لم تكن فالعمود ترتيبي.' },
          { en: 'Does zero stay “none of it” when the unit changes? If zero moves, it is interval; if not, ratio.',
            ar: 'هل يبقى الصفر «لا شيء منه» حين تتغير الوحدة؟ إن تحرّك الصفر فالعمود فتري، وإلا فنسبي.' },
          { en: 'Before any calculation, check whether the suspicious values (0, −1, 999) are measurements or masks for missing data.',
            ar: 'قبل أي حساب، تحقّق هل القيم المريبة (0 و−1 و999) قياسات أم أقنعة لبيانات مفقودة.' }
        ],
        answer: [0, 1, 2, 3],
        hint: { en: 'Each question makes sense only if the previous one was answered “yes”.',
                ar: 'لا يكون لكل سؤال معنى إلا إذا أُجيب عن السؤال السابق بـ«نعم».' },
        explain: { en: 'Order comes first: if the values cannot be ordered, the column is nominal and you stop. Equal gaps come next, since without them the column is only ordinal. Only a column with equal gaps can have a zero that either moves with the unit (interval) or stays (ratio). The last step precedes every calculation: even a correct level gives a confident wrong answer when the 0, −1 or 999 in the column are masks for missing data.',
                   ar: 'الترتيب أولًا: إن تعذّر ترتيب القيم فالعمود اسمي وتتوقف. وتأتي المسافات المتساوية بعده، فمن دونها يبقى العمود ترتيبيًّا فقط. ولا يكون لعمود صفر يتحرّك مع الوحدة (فتري) أو يثبت (نسبي) إلا إذا كانت مسافاته متساوية. والخطوة الأخيرة تسبق كل حساب: فحتى المستوى الصحيح يعطي جوابًا خاطئًا واثقًا إذا كانت الأصفار أو −1 أو 999 في العمود أقنعة لبيانات مفقودة.' } },

      /* ---------------- Concept 5 ---------------- */
      { id: "t1l2q12", type: "output", level: "easy", topics: ["t1-declare-category", "t1-numbers-that-name"], lang: "python",
        q: { en: '<code>school_id</code> (201 to 213) is an identifier, so a careful analyst declares it a category. What happens when this program runs?',
             ar: 'المعرّف <code>school_id</code> (من 201 إلى 213) معرّف، لذلك يعلنه المحلل الحريص فئة (category). ماذا يحدث عند تشغيل هذا البرنامج؟' },
        code: L([
          'import pandas as pd',
          '',
          'schools = pd.read_csv("school_conditions_demo.csv")',
          'schools["school_id"] = schools["school_id"].astype("category")',
          'print(schools["school_id"].mean())'
        ]),
        options: [
          { code: "207.0" },
          { code: "nan" },
          { code: "TypeError: 'Categorical' with dtype category does not support reduction 'mean'" },
          { code: "201" }
        ],
        answer: 2,
        hint: { en: 'What can pandas still do with a column that you have told it holds names, not quantities?',
                ar: 'ماذا يبقى بوسع pandas أن يفعله بعمود أخبرتَه أنه يحمل أسماء لا مقادير؟' },
        explain: { en: 'The mean of a category column is refused with a <code>TypeError</code>. Before the declaration, <code>mean()</code> would happily print 207.0, an average of labels that means nothing. Declaring the level turns that silent wrong answer into a loud error, which is exactly the point: pandas now enforces the judgement you wrote down. It does not return <code>nan</code> (that would be another quiet failure) and it does not fall back to the first category or the mode.',
                   ar: 'يُرفض متوسط عمود category بخطأ <code>TypeError</code>. وقبل الإعلان كان <code>mean()</code> سيطبع بكل رضا 207.0، متوسط تسميات لا معنى له. فإعلان المستوى يحوّل هذا الجواب الخاطئ الصامت إلى خطأ صاخب، وهذا هو المقصود: صار pandas يفرض الحكم الذي دوّنته. ولا يُرجع <code>nan</code> (فهذا فشل هادئ آخر) ولا يرجع إلى الفئة الأولى أو المنوال.' } },

      { id: "t1l2q13", type: "ordercode", level: "medium", topics: ["t1-ordered-categorical", "t1-ordinal"], lang: "python",
        q: { en: 'Put these statements in an order that finds the median damage level of a batch in which two assessments are missing.',
             ar: 'رتّب هذه العبارات بحيث تجد وسيط مستوى الضرر في دفعة ينقصها تقييمان.' },
        items: [
          { code: 'import pandas as pd' },
          { code: 'DAMAGE = pd.CategoricalDtype(["slight", "partial", "total"], ordered=True)' },
          { code: 'answers = pd.Series(["partial", None, "slight", None, "total", "partial"], dtype=DAMAGE)' },
          { code: 'known = answers.dropna()' },
          { code: 'codes = known.cat.codes' },
          { code: 'middle = codes.quantile(0.5, interpolation="lower")' },
          { code: 'print(DAMAGE.categories[int(middle)])' }
        ],
        answer: [0, 1, 2, 3, 4, 5, 6],
        hint: { en: 'A name must exist before it is used, and the missing assessments have to be gone before the answers become codes.',
                ar: 'يجب أن يوجد الاسم قبل أن يُستخدم، ويجب أن تغيب التقييمات الناقصة قبل أن تصير الإجابات رموزًا.' },
        explain: { en: 'pandas has no median for a category, so you work on the codes: import, declare the order, build the series, drop the missing answers, take the codes, take the middle one, and translate the code back to a name. <code>dropna()</code> must come before <code>cat.codes</code>: a missing value has the code −1, which sorts below every real category. Skip the drop and the median of this batch comes out as “slight” instead of “partial”, with no error. <code>interpolation="lower"</code> picks the lower neighbour when the middle falls between two categories.',
                   ar: 'لا وسيط في pandas للفئات، فتعمل على الرموز: استيراد، ثم إعلان الترتيب، ثم بناء السلسلة، ثم حذف الإجابات المفقودة، ثم أخذ الرموز، ثم أخذ الأوسط، ثم ترجمة الرمز إلى اسم. ويجب أن يسبق <code>dropna()</code> الأمر <code>cat.codes</code>: فالقيمة المفقودة رمزها −1 وهو يقع تحت كل فئة حقيقية. فإن أهملت الحذف خرج وسيط هذه الدفعة «طفيف» بدل «جزئي» دون أي خطأ. و<code>interpolation="lower"</code> يختار الجار الأدنى حين يقع الوسط بين فئتين.' } },

      { id: "t1l2q14", type: "write", level: "medium", topics: ["t1-ordered-categorical", "t1-declare-category"], lang: "python",
        q: { en: 'The column <code>level</code> of the school sheet was loaded as plain text. Write code that (1) declares the order Primary &lt; Preparatory &lt; Secondary as an ordered category, (2) prints the lowest stage present, and (3) prints the number of schools at each stage in scale order.',
             ar: 'حُمّل العمود <code>level</code> في ورقة المدارس نصًّا عاديًّا. اكتب كودًا (1) يعلن الترتيب ابتدائي &lt; إعدادي &lt; ثانوي (Primary &lt; Preparatory &lt; Secondary) فئةً مرتّبة، (2) ويطبع أدنى مرحلة موجودة، (3) ويطبع عدد المدارس في كل مرحلة بترتيب السلّم.' },
        code: L([
          'import pandas as pd',
          '',
          'schools = pd.read_csv("school_conditions_demo.csv")'
        ]),
        starter: '# your code below\n',
        lines: 6,
        checks: [
          { re: 'Categorical(Dtype)?\\s*\\(', label: { en: 'Declares a categorical type (CategoricalDtype or Categorical)', ar: 'يعلن نوعًا فئويًّا (CategoricalDtype أو Categorical)' } },
          { re: 'ordered\\s*=\\s*True', label: { en: 'Marks the order as real with ordered=True', ar: 'يجعل الترتيب حقيقيًّا بالمعامل ordered=True' } },
          { re: '["\']Primary["\']\\s*,\\s*["\']Preparatory["\']\\s*,\\s*["\']Secondary["\']', label: { en: 'Lists the stages from lowest to highest', ar: 'يسرد المراحل من الأدنى إلى الأعلى' } },
          { re: '\\.min\\s*\\(', label: { en: 'Prints the lowest stage with min()', ar: 'يطبع أدنى مرحلة بالدالة min()' } },
          { re: 'value_counts\\s*\\(\\s*\\)\\s*\\.sort_index\\s*\\(|value_counts\\s*\\(\\s*sort\\s*=\\s*False', label: { en: 'Counts the schools per stage in scale order (value_counts with sort_index)', ar: 'يعدّ المدارس في كل مرحلة بترتيب السلّم (value_counts مع sort_index)' } }
        ],
        solution: {
          code: L([
            'LEVELS = pd.CategoricalDtype(["Primary", "Preparatory", "Secondary"], ordered=True)',
            'schools["level"] = schools["level"].astype(LEVELS)',
            'print(schools["level"].min())',
            'print(schools["level"].value_counts().sort_index())'
          ]),
          out: 'Primary\nlevel\nPrimary        4\nPreparatory    5\nSecondary      4\nName: count, dtype: int64',
          en: 'After the cast, min() and the counts both follow the declared order.',
          ar: 'بعد التحويل يتبع min() والأعداد كلاهما الترتيب المعلَن.'
        },
        hint: { en: 'An ordered category needs the list of categories in order, and a flag that says the order is real.',
                ar: 'الفئة المرتّبة تحتاج إلى قائمة الفئات بالترتيب، وإلى معامل يقول إن الترتيب حقيقي.' },
        explain: { en: 'The ordered <code>CategoricalDtype</code> is how pandas learns the order. After the cast, <code>min()</code> returns “Primary”; on plain text it would return “Preparatory”, the alphabetically first, with no warning. A plain <code>value_counts()</code> sorts by frequency (Preparatory first), while <code>.sort_index()</code> lists the stages in scale order. Without <code>ordered=True</code> the categories are only names, and <code>min()</code> and order comparisons are refused.',
                   ar: 'النوع <code>CategoricalDtype</code> المرتّب هو الطريقة التي يتعلم بها pandas الترتيب. وبعد التحويل يعيد <code>min()</code> القيمة «Primary»؛ أما على نص عادي فكان سيعيد «Preparatory» الأولى أبجديًّا دون أي تحذير. و<code>value_counts()</code> العادية ترتّب بالتكرار (فتأتي Preparatory أولًا)، بينما يسرد <code>.sort_index()</code> المراحل بترتيب السلّم. ومن دون <code>ordered=True</code> تكون الفئات أسماء فقط، ويُرفض <code>min()</code> ومقارنات الترتيب.' } },

      { id: "t1l2q15", type: "multi", level: "medium", topics: ["t1-numeric-and-date-dtypes", "t1-interval", "t1-ratio"], lang: "python",
        q: { en: 'Which statements are true for this code? Choose all that apply.',
             ar: 'أي العبارات صحيحة بالنسبة إلى هذا الكود؟ اختر كل ما ينطبق.' },
        code: L([
          'dates = pd.to_datetime(pd.Series(["2026-01-16", "2026-03-01", "2026-05-05"]))',
          'rooms = pd.read_csv("rental_listings.csv")["rooms"]    # one blank: prints as float64'
        ]),
        options: [
          { en: '<code>dates[2] - dates[0]</code> is a duration (109 days): the gap between two points in time is meaningful.',
            ar: '<code>dates[2] - dates[0]</code> مدة (109 أيام): الفرق بين نقطتين من الزمن له معنى.' },
          { en: '<code>dates[0] + dates[1]</code> gives the date half-way between them.',
            ar: '<code>dates[0] + dates[1]</code> يعطي التاريخ الواقع في منتصف المسافة بينهما.' },
          { en: '<code>(dates[2] - dates[0]) / (dates[1] - dates[0])</code> is legal, because a duration has a true zero and can be divided by another duration.',
            ar: '<code>(dates[2] - dates[0]) / (dates[1] - dates[0])</code> جائز، لأن للمدة صفرًا حقيقيًّا ويمكن قسمتها على مدة أخرى.' },
          { en: 'Dates are ratio data, so “2026 is twice as late as 1013” is a legal statement.',
            ar: 'التواريخ بيانات نسبية، فعبارة «2026 ضعف 1013 تأخرًا» عبارة جائزة.' },
          { en: '<code>rooms.astype("Int64")</code> gives back whole numbers and shows the one blank as <code>&lt;NA&gt;</code>.',
            ar: '<code>rooms.astype("Int64")</code> يعيد الأعداد الصحيحة ويعرض الفراغ الواحد بالشكل <code>&lt;NA&gt;</code>.' }
        ],
        answer: [0, 2, 4],
        hint: { en: 'Subtracting two dates gives a duration. Ask what a duration has that a date does not.',
                ar: 'طرح تاريخين يعطي مدة. اسأل: ماذا للمدة ليس للتاريخ؟' },
        explain: { en: 'A point in time (datetime64) is interval data: differences are real, so <code>dates[2] - dates[0]</code> is a duration. A duration is ratio data, so dividing one by another is legal (here 109 / 44, about 2.48). Adding two dates is refused with a <code>TypeError</code>, and the year 0 is not “no time”, so “twice as late” is not a legal claim about dates. <code>Int64</code> (capital I) is the whole-number type that can hold a missing value, which is why <code>rooms</code> can return to integers.',
                   ar: 'نقطة الزمن (datetime64) بيانات فترية: فروقها حقيقية، فـ <code>dates[2] - dates[0]</code> مدة. والمدة بيانات نسبية، فقسمة إحداها على الأخرى جائزة (هنا 109 / 44، أي نحو 2.48). أما جمع تاريخين فيُرفض بخطأ <code>TypeError</code>، والسنة 0 ليست «انعدام الزمن»، فعبارة «ضعف التأخر» غير جائزة عن التواريخ. و<code>Int64</code> (بحرف I كبير) نوع الأعداد الصحيحة الذي يتسع لقيمة مفقودة، ولهذا يستطيع <code>rooms</code> أن يعود إلى الأعداد الصحيحة.' } },

      { id: "t1l2q16", type: "compare", level: "medium", topics: ["t1-summary-by-level", "t1-numbers-that-name", "t1-levels-of-measurement"], lang: "python",
        q: { en: 'Both versions summarise the rental table. Which statement is true?',
             ar: 'تلخّص النسختان جدول الإيجارات. أي عبارة صحيحة؟' },
        codeA: L([
          'import pandas as pd',
          'df = pd.read_csv("rental_listings.csv")',
          'print(df.describe())'
        ]),
        codeB: L([
          'import pandas as pd',
          'df = pd.read_csv("rental_listings.csv")',
          'LEVEL = {"listing_id": "nominal",',
          '         "governorate": "nominal",',
          '         "furnished": "nominal",',
          '         "rooms": "ratio",',
          '         "monthly_rent": "ratio",',
          '         "area_m2": "ratio"}',
          'for col, lvl in LEVEL.items():',
          '    s = df[col]',
          '    if lvl == "nominal":',
          '        top = s.mode().iloc[0]',
          '        print(col, s.nunique(), top)',
          '    else:',
          '        print(col, s.mean(), s.median())'
        ]),
        options: [
          { en: 'B is better: its <code>LEVEL</code> dictionary records your judgement. A picks by storage: it drops <code>governorate</code> and <code>furnished</code> silently and gives <code>listing_id</code> a mean of 1030.5.',
            ar: 'B أفضل: فقاموس <code>LEVEL</code> فيها يدوّن حكمك. أما A فتختار بحسب التخزين: تُسقط <code>governorate</code> و<code>furnished</code> بصمت وتعطي <code>listing_id</code> متوسطًا قدره 1030.5.' },
          { en: 'A is safer: <code>describe()</code> reports only statistics that are legal for each column, so nothing in its table can mislead.',
            ar: 'A أكثر أمانًا: فـ <code>describe()</code> لا يعرض إلا إحصاءات جائزة لكل عمود، فلا شيء في جدولها يضلّل.' },
          { en: 'The two are equivalent for the numeric columns, so the choice between them is only a matter of style and typing effort.',
            ar: 'النسختان متكافئتان بالنسبة إلى الأعمدة العددية، فالاختيار بينهما مسألة ذوق وجهد كتابة فقط.' },
          { en: 'B is better and finished: because it is driven by the level of each column, nothing it prints can mislead in any way.',
            ar: 'B أفضل وهي تامة: فهي مبنية على مستوى كل عمود، فلا شيء مما تطبعه يمكن أن يضلّل بأي وجه.' }
        ],
        answer: 0,
        hint: { en: 'Look at which columns appear in the table that A prints, and at what B asks for each level.',
                ar: 'انظر أي الأعمدة تظهر في الجدول الذي تطبعه A، وماذا تطلب B لكل مستوى.' },
        explain: { en: 'A chooses by storage: only the four numeric columns appear, <code>governorate</code> and <code>furnished</code> vanish without a word, and <code>listing_id</code> gets a mean (1030.5) and quartiles as if it were a quantity. B states each level once and picks the statistic by it. B is not finished, though: it prints instead of returning (nothing can reuse or test it), it still prints a “mode” for <code>listing_id</code> (1001, a label nobody should read), and <code>mode().iloc[0]</code> silently keeps the first of any tie. Those are the defects the lesson’s <code>summary_for</code> fixes.',
                   ar: 'تختار A بحسب التخزين: لا تظهر إلا الأعمدة العددية الأربعة، ويختفي <code>governorate</code> و<code>furnished</code> دون كلمة، ويأخذ <code>listing_id</code> متوسطًا (1030.5) وأرباعًا كأنه مقدار. أما B فتذكر كل مستوى مرة واحدة وتختار الإحصاء بحسبه. لكن B لم تنتهِ: فهي تطبع بدل أن تُرجع (فلا يستطيع شيء إعادة استعمالها أو اختبارها)، وما زالت تطبع «منوالًا» لـ <code>listing_id</code> (1001، وهو تسمية لا ينبغي لأحد أن يقرأها)، و<code>mode().iloc[0]</code> يحتفظ بصمت بأول قيمة في أي تعادل. وهذه هي العيوب التي تصلحها <code>summary_for</code> في الدرس.' } },

      { id: "t1l2q17", type: "complete", level: "medium", topics: ["t1-summary-by-level", "t1-counting-nominal"], lang: "python",
        q: { en: 'In the school sheet <code>schools</code>, three governorates tie for the most schools (3 each). Choose the expression that fills the gap so that the nominal branch of a summary function reports the mode and leaves the tie visible.',
             ar: 'في ورقة المدارس <code>schools</code> تتعادل ثلاث محافظات في أكثر عدد من المدارس (3 لكل منها). اختر التعبير الذي يملأ الفراغ بحيث يعرض فرع الاسمي في دالة الملخص المنوال ويُبقي التعادل ظاهرًا.' },
        code: L([
          'def nominal_summary(s):',
          '    return {"n": int(s.count()), "distinct": int(s.nunique()), "mode": ???}',
          '',
          'print(nominal_summary(schools["governorate"]))'
        ]),
        options: [
          { code: 's.mode()[0]' },
          { code: 's.mode().tolist()' },
          { code: 's.value_counts().idxmax()' },
          { code: 's.max()' }
        ],
        answer: 1,
        hint: { en: 'The mode is not always one value. Which expression returns every value that ties?',
                ar: 'المنوال ليس قيمة واحدة دائمًا. أي تعبير يعيد كل قيمة تتعادل؟' },
        explain: { en: '<code>mode()</code> returns all tied values, and <code>.tolist()</code> keeps them, so the report shows <code>[\'Gaza\', \'Khan Younis\', \'Rafah\']</code>. Both <code>s.mode()[0]</code> and <code>s.value_counts().idxmax()</code> silently keep one winner (Gaza) and hide the tie: the defect that Version 2 of the lesson’s summary still had. <code>s.max()</code> is not a count at all: it returns the alphabetically last name (Rafah), which needs an order that a nominal column does not have.',
                   ar: 'يعيد <code>mode()</code> كل القيم المتعادلة، و<code>.tolist()</code> يحتفظ بها، فيعرض التقرير <code>[\'Gaza\', \'Khan Younis\', \'Rafah\']</code>. أما <code>s.mode()[0]</code> و<code>s.value_counts().idxmax()</code> فيُبقيان بصمت فائزًا واحدًا (Gaza) ويخفيان التعادل: وهو العيب الذي بقي في ملخص النسخة 2 في الدرس. و<code>s.max()</code> ليس عدًّا أصلًا: فهو يعيد الاسم الأخير أبجديًّا (Rafah) وهذا يحتاج إلى ترتيب ليس للعمود الاسمي.' },
        solution: { code: L([
                      'def nominal_summary(s):',
                      '    return {"n": int(s.count()), "distinct": int(s.nunique()), "mode": s.mode().tolist()}',
                      '',
                      'print(nominal_summary(schools["governorate"]))'
                    ]),
                    out: "{'n': 13, 'distinct': 5, 'mode': ['Gaza', 'Khan Younis', 'Rafah']}",
                    en: 'Keep the mode as a list so that ties show.',
                    ar: 'احتفظ بالمنوال قائمةً ليظهر التعادل.' } },

      { id: "t1l2q18", type: "error", level: "hard", topics: ["t1-summary-by-level", "t1-ordered-categorical"], lang: "python",
        q: { en: 'This program should print the median school stage. It runs without any error and prints a valid stage name, but the wrong one. Click the line that causes it.',
             ar: 'يفترض أن يطبع هذا البرنامج وسيط مرحلة المدرسة. يعمل دون أي خطأ ويطبع اسم مرحلة صالحًا، لكنه خاطئ. انقر السطر المسبّب.' },
        code: L([
          'import pandas as pd',
          'schools = pd.read_csv("school_conditions_demo.csv")',
          'ORDER = ["Primary", "Prepatory", "Secondary"]',
          'level = schools["level"].astype(pd.CategoricalDtype(ORDER, ordered=True))',
          'codes = level.cat.codes',
          'middle = codes.quantile(0.5, interpolation="lower")',
          'print("median level:", ORDER[int(middle)])'
        ]),
        answer: 3,
        hint: { en: 'A value that is not on the list of categories raises no error. Compare the list with the data.',
                ar: 'القيمة التي ليست في قائمة الفئات لا تثير خطأ. قارن القائمة بالبيانات.' },
        explain: { en: 'Line 3: “Prepatory” is misspelled, so the five Preparatory schools are not among the categories. <code>astype</code> turns them silently into missing values with the code −1, and −1 sorts below every real category, so the middle of the thirteen codes drops to 0 and the program prints “Primary” instead of “Preparatory”. Lines 5 to 7 are correct; the bug sits where a judgement is typed by hand. This is what Version 3 of the lesson’s <code>summary_for</code> still leaves open: nothing checks <code>ORDER</code> against the data. A cheap guard is <code>assert level.notna().all()</code> right after the cast.',
                   ar: 'السطر 3: كُتبت «Prepatory» خطأً، فلا تقع المدارس الإعدادية الخمس بين الفئات. فيحوّلها <code>astype</code> بصمت إلى قيم مفقودة رمزها −1، والرمز −1 يقع تحت كل فئة حقيقية، فينزل أوسط الرموز الثلاثة عشر إلى 0 ويطبع البرنامج «Primary» بدل «Preparatory». والأسطر 5 إلى 7 صحيحة؛ العلّة حيث يُكتب الحكم باليد. وهذا ما تتركه النسخة 3 من <code>summary_for</code> في الدرس مفتوحًا: لا شيء يفحص <code>ORDER</code> مقابل البيانات. وحارس رخيص هو <code>assert level.notna().all()</code> بعد التحويل مباشرة.' },
        solution: { code: L([
                      'ORDER = ["Primary", "Preparatory", "Secondary"]',
                      'level = schools["level"].astype(pd.CategoricalDtype(ORDER, ordered=True))',
                      'assert level.notna().all()      # a typo in ORDER now stops the program'
                    ]),
                    en: 'Fix the spelling and assert that the cast produced no missing values.',
                    ar: 'صحّح الإملاء وتأكد (assert) أن التحويل لم يُنتج قيمًا مفقودة.' } },

      /* ---------------- Concept 6 ---------------- */
      { id: "t1l2q19", type: "mcq", level: "hard", topics: ["t1-model-beliefs", "t1-encoding-by-level"], lang: "python",
        q: { en: 'A linear model predicts <code>repair_weeks</code> from <code>governorate</code> (numbered by order of appearance) and <code>damage_level</code> (coded from a declared order). The same 13 schools are fitted twice, once in file order and once with the rows shuffled. How should the two sets of weights be read?',
             ar: 'يتنبأ نموذج خطي بـ <code>repair_weeks</code> من <code>governorate</code> (مرقّمة بحسب أول ظهور) و<code>damage_level</code> (مرمّزة من ترتيب معلَن). تُلاءَم المدارس الثلاث عشرة نفسها مرتين: مرة بترتيب الملف ومرة بعد خلط الصفوف. كيف تُقرأ مجموعتا الأوزان؟' },
        code: L([
          'def encode(df):',
          '    gov = {g: i for i, g in enumerate(df["governorate"].unique())}   # order of appearance',
          '    dmg = df["damage_level"].astype(DAMAGE).cat.codes               # slight 0, partial 1, total 2',
          '    return np.column_stack([df["governorate"].map(gov), dmg])',
          '',
          '# weights [intercept, governorate, damage_level]',
          '# file order   [-0.37 -0.33 18.42]',
          '# shuffled     [-2.09  0.69 18.12]'
        ]),
        options: [
          { en: 'Both weights are stable enough: the changes between the two runs are small, so the encodings are fine and the model can be used as it is.',
            ar: 'الوزنان مستقران بما يكفي: فالتغيّرات بين التشغيلين صغيرة، فالترميزان سليمان ويمكن استعمال النموذج كما هو.' },
          { en: 'Neither weight can be trusted: an ordinal column cannot be given numeric codes at all, so <code>damage_level</code> must be one-hot encoded too.',
            ar: 'لا يمكن الوثوق بأيٍّ من الوزنين: فالعمود الترتيبي لا يجوز أن تُعطى له رموز عددية أصلًا، فيجب ترميز <code>damage_level</code> ترميزًا أحاديًّا أيضًا.' },
          { en: 'The damage weight can be trusted (about 18 weeks per level in both runs); the governorate weight cannot, because its codes depend on the row order. The nominal column needs one-hot columns.',
            ar: 'يمكن الوثوق بوزن الضرر (نحو 18 أسبوعًا لكل مستوى في المرتين)، ولا يمكن الوثوق بوزن المحافظة لأن رموزها تعتمد على ترتيب الصفوف. والعمود الاسمي يحتاج إلى أعمدة ترميز أحادي.' },
          { en: 'The governorate weight moved because the second run saw different schools, so the two sets of weights cannot be compared.',
            ar: 'تغيّر وزن المحافظة لأن التشغيل الثاني رأى مدارس مختلفة، فلا يمكن مقارنة مجموعتي الأوزان.' }
        ],
        answer: 2,
        hint: { en: 'After shuffling, does code 1 still stand for the same thing in each column?',
                ar: 'بعد الخلط، هل ما زال الرمز 1 يعني الشيء نفسه في كل عمود؟' },
        explain: { en: 'In file order Gaza is 0, Khan Younis 1 and Rafah 2; after shuffling Deir al-Balah is 0, Gaza 1 and Khan Younis 4. The model draws one straight line through an arbitrary list of places, so the weight (−0.33, then +0.69: a sign flip, not small noise) and every prediction depend on how the file happened to be sorted. The damage codes come from a declared order, so they mean the same in both runs and the weight stays near 18 weeks per level. The fix for the nominal column is one-hot (<code>get_dummies</code>), which invents no order or distance. The last option is wrong: the schools are the same thirteen. The third is too strict: declared-order codes are right for ordinal data, and their remaining cost is the equal-steps assumption, not instability.',
                   ar: 'بترتيب الملف تكون غزة 0 وخان يونس 1 ورفح 2؛ وبعد الخلط تصير دير البلح 0 وغزة 1 وخان يونس 4. يرسم النموذج خطًّا مستقيمًا واحدًا عبر قائمة أماكن اعتباطية، فيعتمد الوزن (−0.33 ثم +0.69: انقلاب في الإشارة لا ضجيج صغير) وكل تنبؤ على الطريقة التي رُتّب بها الملف مصادفة. أما رموز الضرر فمصدرها ترتيب معلَن، فتعني الشيء نفسه في المرتين ويبقى الوزن قرب 18 أسبوعًا لكل مستوى. وعلاج العمود الاسمي هو الترميز الأحادي (<code>get_dummies</code>) الذي لا يختلق ترتيبًا ولا مسافة. والخيار الأخير خاطئ: فالمدارس هي الثلاث عشرة نفسها. والثالث متشدد أكثر من اللازم: فرموز الترتيب المعلَن سليمة للبيانات الترتيبية، وثمنها الباقي افتراض الخطوات المتساوية لا عدم الاستقرار.' } },

      { id: "t1l2q20", type: "contrast", level: "hard", topics: ["t1-one-hot", "t1-encoding-by-level", "t1-model-beliefs"],
        neither: true,
        q: { en: 'For each statement, say whether it describes one-hot columns, ordered codes (0, 1, 2 from a declared order), both, or neither.',
             ar: 'قرّر لكل عبارة هل تصف أعمدة الترميز الأحادي، أم الرموز المرتّبة (0 و1 و2 من ترتيب معلَن)، أم كليهما، أم لا هذا ولا ذاك.' },
        concepts: [
          { en: 'One-hot columns (for a nominal column)', ar: 'أعمدة الترميز الأحادي (لعمود اسمي)' },
          { en: 'Ordered codes (for an ordinal column)', ar: 'الرموز المرتّبة (لعمود ترتيبي)' }
        ],
        rows: [
          { s: { en: 'Invents no order and no distance between the categories.', ar: 'لا يختلق ترتيبًا ولا مسافة بين الفئات.' }, a: 0 },
          { s: { en: 'Keeps the order that the data really has.', ar: 'يحفظ الترتيب الذي في البيانات فعلًا.' }, a: 1 },
          { s: { en: 'Turns one column into several 0/1 columns, so the table gets wider.', ar: 'يحوّل عمودًا واحدًا إلى عدة أعمدة 0/1 فيزداد الجدول عرضًا.' }, a: 0 },
          { s: { en: 'Gives the same model weights whatever order the rows come in (it passes the shuffle test).', ar: 'يعطي أوزان النموذج نفسها أيًّا كان ترتيب الصفوف (ينجح في اختبار الخلط).' }, a: 2 },
          { s: { en: 'Assumes that every step between neighbouring categories is the same size.', ar: 'يفترض أن كل خطوة بين فئتين متجاورتين بالحجم نفسه.' }, a: 1 },
          { s: { en: 'Should be standardised like a quantity, because its numbers are distances.', ar: 'ينبغي توحيد مقياسه كالمقادير، لأن أرقامه مسافات.' }, a: 3 },
          { s: { en: 'Is the right treatment for an identifier such as <code>school_id</code>.', ar: 'هو المعالجة الصحيحة لمعرّف مثل <code>school_id</code>.' }, a: 3 }
        ],
        hint: { en: 'Think of the shuffle test, and of what each encoding assumes about the distance between two categories.',
                ar: 'فكّر في اختبار الخلط، وفي ما يفترضه كل ترميز عن المسافة بين فئتين.' },
        explain: { en: 'One-hot columns invent no order and no distance but make the table wider; ordered codes keep the real order at the price of assuming equal steps (in the sheet the real damage steps are about 8 and 29 weeks). Both give the same weights whatever the row order, because their meaning is fixed by a declared rule and not by the file. Neither is a quantity, so neither is standardised like one: their numbers are not distances. An identifier gets neither encoding: it names one row, so it is left out of the model.',
                   ar: 'أعمدة الترميز الأحادي لا تختلق ترتيبًا ولا مسافة لكنها توسّع الجدول؛ والرموز المرتّبة تحفظ الترتيب الحقيقي بثمن افتراض خطوات متساوية (والخطوتان الحقيقيتان في الورقة نحو 8 و29 أسبوعًا). وكلاهما يعطي الأوزان نفسها أيًّا كان ترتيب الصفوف، لأن معناهما تحدده قاعدة معلنة لا الملف. وليس أيٌّ منهما مقدارًا، فلا يوحَّد مقياسه كالمقادير: فأرقامه ليست مسافات. والمعرّف لا يأخذ أيًّا من الترميزين: فهو يسمّي صفًّا واحدًا، ولذلك يُترك خارج النموذج.' } },

      /* ---------------- Concept 7 ---------------- */
      { id: "t1l2q21", type: "compare", level: "hard", topics: ["t1-likert", "t1-grey-zone"], lang: "python",
        q: { en: 'Two teacher-training workshops, X and Y, were each rated by 20 teachers on a 1-to-5 scale (the counts are invented for this test). <code>survey</code> has one row per teacher: <code>workshop</code>, <code>score</code> (1 to 5) and <code>answer</code>, an ordered category from “very dissatisfied” to “very satisfied”. Which statement is true?',
             ar: 'قيّم 20 معلّمًا كلًّا من ورشتَي تدريب المعلمين X وY على مقياس من 1 إلى 5 (الأعداد مختلقة لهذا الاختبار). في <code>survey</code> صف لكل معلّم: <code>workshop</code> و<code>score</code> (من 1 إلى 5) و<code>answer</code> وهي فئة مرتّبة من «غير راضٍ إطلاقًا» إلى «راضٍ جدًّا». أي عبارة صحيحة؟' },
        codeA: L([
          'by = survey.groupby("workshop")',
          'print(by["score"].mean().round(1))'
        ]),
        codeB: L([
          'for name, g in survey.groupby("workshop"):',
          '    a = g["answer"]',
          '    n = a.value_counts().sort_index()',
          '    good = (a >= "satisfied").mean()',
          '    bad = (a <= "dissatisfied").mean()',
          '    pct = f"{good:.0%} {bad:.0%}"',
          '    print(name, n.tolist(), pct)'
        ]),
        after: { en: 'Version A prints <code>3.0</code> for X and <code>3.0</code> for Y. Version B prints one line per workshop: the five counts in scale order, then the share “satisfied or better”, then the share “dissatisfied or worse”:<br><code>X [8, 1, 2, 1, 8] 45% 45%</code><br><code>Y [1, 3, 12, 3, 1] 20% 20%</code>',
                 ar: 'تطبع النسخة A القيمة <code>3.0</code> لـ X والقيمة <code>3.0</code> لـ Y. وتطبع النسخة B سطرًا لكل ورشة: الأعداد الخمسة بترتيب السلّم، ثم نسبة «راضٍ أو أفضل»، ثم نسبة «غير راضٍ أو أسوأ»:<br><code>X [8, 1, 2, 1, 8] 45% 45%</code><br><code>Y [1, 3, 12, 3, 1] 20% 20%</code>' },
        options: [
          { en: 'A is better: equal means (3.0) show that the teachers rated the two workshops equally, and one number per workshop is easier to compare than a list.',
            ar: 'A أفضل: تساوي المتوسطين (3.0) يبيّن أن المعلمين قيّموا الورشتين بالتساوي، والرقم الواحد لكل ورشة أسهل مقارنة من قائمة.' },
          { en: 'A is better: the mean is the strongest statistic available, and 1-to-5 answers are interval data, so the mean is fully legal here.',
            ar: 'A أفضل: المتوسط أقوى الإحصاءات المتاحة، وإجابات 1 إلى 5 بيانات فترية، فالمتوسط جائز هنا تمامًا.' },
          { en: 'They say the same thing: a mean of 3.0 means “neutral”, so the percentages of B only restate in more words what A already shows.',
            ar: 'تقولان الشيء نفسه: المتوسط 3.0 يعني «محايد»، فنسب B تعيد قول ما تُظهره A بكلمات أكثر.' },
          { en: 'B is better: the equal means hide that X splits the teachers into two camps while Y is mostly neutral. B shows the spread and the shares at both ends, though its cut-offs are a choice the report must state.',
            ar: 'B أفضل: فتساوي المتوسطين يخفي أن X تقسم المعلمين إلى معسكرين بينما Y محايدة في معظمها. وتُظهر B التوزيع والنسبتين عند الطرفين، وإن كانت حدودها اختيارًا يجب أن يذكره التقرير.' }
        ],
        answer: 3,
        hint: { en: 'What two very different groups of answers could produce the same average?',
                ar: 'أي مجموعتين مختلفتين جدًّا من الإجابات قد تعطيان المتوسط نفسه؟' },
        explain: { en: 'A mean squeezes a whole distribution into one number, and two very different distributions can squeeze into the same one. In X, 16 of 20 teachers chose an extreme (8 very dissatisfied, 8 very satisfied); in Y, 12 of 20 chose “neutral”. So the code 3 is only the arithmetic centre of X, and “neutral” describes almost nobody there. A single 1-to-5 item is ordinal, so the mean’s equal-steps assumption is exactly what nobody measured. B respects the ordinal level: the distribution in scale order plus the shares at the two ends. It is still a headline, not the whole truth, because its cut-offs are a choice.',
                   ar: 'يضغط المتوسط توزيعًا كاملًا في رقم واحد، ويمكن لتوزيعين مختلفين جدًّا أن ينضغطا إلى الرقم نفسه. في X اختار 16 من 20 معلمًا طرفًا (8 غير راضين إطلاقًا و8 راضون جدًّا)، وفي Y اختار 12 من 20 «محايد». فالرمز 3 مجرد المركز الحسابي لـ X، و«محايد» لا تصف أحدًا تقريبًا هناك. والبند الواحد من 1 إلى 5 ترتيبي، فافتراض الخطوات المتساوية في المتوسط هو بالضبط ما لم يقسه أحد. وتحترم B المستوى الترتيبي: التوزيع بترتيب السلّم مع النسبتين عند الطرفين. وهي مع ذلك عنوان لا الحقيقة كلها، لأن حدودها اختيار.' } },

      { id: "t1l2q22", type: "trace", level: "medium", topics: ["t1-grey-zone", "t1-ratio"], lang: "python",
        q: { en: 'Three schools asked their parents whether they were satisfied (the counts are invented for this test). After the program has run, what are the values of <code>avg_of_pcts</code> and <code>overall</code>?',
             ar: 'سألت ثلاث مدارس أولياء أمورها هل هم راضون (الأعداد مختلقة لهذا الاختبار). بعد تشغيل البرنامج، ما قيمتا <code>avg_of_pcts</code> و<code>overall</code>؟' },
        code: L([
          'groups = {"A": (9, 10), "B": (20, 40), "C": (6, 50)}   # (satisfied, parents asked)',
          'pcts = []',
          'sat = total = 0',
          'for name, (yes, n) in groups.items():',
          '    pcts.append(100 * yes / n)',
          '    sat += yes',
          '    total += n',
          'avg_of_pcts = round(sum(pcts) / len(pcts), 1)',
          'overall = round(100 * sat / total, 1)'
        ]),
        blanks: [
          { accept: ["50.7"], label: { en: 'avg_of_pcts', ar: 'avg_of_pcts' } },
          { accept: ["35.0", "35"], label: { en: 'overall', ar: 'overall' } }
        ],
        hint: { en: '<code>avg_of_pcts</code> treats each school as one voice; <code>overall</code> counts parents. Work the loop out school by school.',
                ar: '<code>avg_of_pcts</code> يعامل كل مدرسة صوتًا واحدًا؛ و<code>overall</code> يعدّ أولياء الأمور. اجرِ الحلقة مدرسة مدرسة.' },
        explain: { en: 'The three percentages are 90.0, 50.0 and 12.0, so averaging them gives 50.7: each school counts as one voice, although school C asked 50 parents and school A only 10. The overall share counts parents: 35 satisfied out of 100, which is 35.0. A percentage is a ratio value, yet averaging percentages of groups of different sizes gives the wrong overall percentage. Keep the counts behind a percentage and recompute the share from them.',
                   ar: 'النسب الثلاث هي 90.0 و50.0 و12.0، فمتوسطها 50.7: تُحسب كل مدرسة صوتًا واحدًا مع أن المدرسة C سألت 50 وليًّا والمدرسة A عشرة فقط. أما النسبة الكلية فتعدّ أولياء الأمور: 35 راضيًا من 100، أي 35.0. والنسبة المئوية قيمة نسبية، لكن متوسط نسب لمجموعات مختلفة الحجم يعطي نسبة كلية خاطئة. احتفظ بالأعداد خلف كل نسبة وأعد حساب النسبة منها.' } },

      { id: "t1l2q23", type: "tf", level: "easy", topics: ["t1-indicator-mean", "t1-nominal"],
        q: { en: 'A yes/no column coded 1 and 0 is nominal, yet its mean can still be meaningful: it is the share of “yes” answers.',
             ar: 'العمود نعم/لا المرمّز 1 و0 اسمي، ومع ذلك قد يكون لمتوسطه معنى: إنه نسبة إجابات «نعم».' },
        truth: true,
        hint: { en: 'What do you get when you add up a column that holds only 1s and 0s?',
                ar: 'ماذا تحصل حين تجمع عمودًا لا يحمل إلا 1 و0؟' },
        explain: { en: 'True. This is the one famous exception: the sum of a 0/1 column counts the ones, so the mean is the share of ones. It works because of how the 0/1 was <em>defined</em> (1 means yes), not because the number 1 is a quantity. In the rental table <code>df["furnished"].eq("yes").mean()</code> is 0.317, which is 19 of 60 listings. The exception does not extend to a column of cities coded 0, 1, 2: its mean is still an accident.',
                   ar: 'صحيح. وهذا هو الاستثناء المشهور الوحيد: مجموع العمود 0/1 يعدّ الآحاد، فالمتوسط هو نسبة الآحاد. وهو ينجح بسبب طريقة <em>تعريف</em> الصفر والواحد (1 تعني نعم)، لا لأن الرقم 1 مقدار. ففي جدول الإيجارات يساوي <code>df["furnished"].eq("yes").mean()</code> القيمة 0.317، أي 19 من 60 إعلانًا. ولا يمتد الاستثناء إلى عمود مدن مرمّزة 0 و1 و2: فمتوسطه ما زال مصادفة حسابية.' } },

      { id: "t1l2q24", type: "tf", level: "easy", topics: ["t1-scheme-limits"],
        q: { en: 'The school stage (Primary &lt; Preparatory &lt; Secondary) is an ordinal column, so it must be treated as ordinal in every analysis.',
             ar: 'مرحلة المدرسة (ابتدائي &lt; إعدادي &lt; ثانوي) عمود ترتيبي، فيجب أن يُعامل ترتيبيًّا في كل تحليل.' },
        truth: false,
        hint: { en: 'Does the level belong to the column alone, or also to the question you ask about it?',
                ar: 'هل يعود المستوى إلى العمود وحده، أم إلى السؤال الذي تطرحه عنه أيضًا؟' },
        explain: { en: 'False. The level belongs to the question as well as the column. Ranking schools by stage uses the order, so it is ordinal; asking only “is this a secondary school?” turns the column into a yes/no indicator, which is nominal. The four-level scheme is a map, not a law: some data fit no box (time of day wraps around), and following it to the letter sometimes refuses a useful quick calculation.',
                   ar: 'خطأ. يعود المستوى إلى السؤال كما يعود إلى العمود. فترتيب المدارس بحسب المرحلة يستعمل الترتيب فهو ترتيبي؛ أما السؤال «هل هذه مدرسة ثانوية؟» فيحوّل العمود إلى مؤشر نعم/لا، وهو اسمي. ومخطط المستويات الأربعة خريطة لا قانون: فبعض البيانات لا يلائم أي صندوق (الوقت من اليوم يلتف على نفسه)، والتزامه حرفيًّا يرفض أحيانًا حسابًا سريعًا مفيدًا.' } }

    ]
  };
})();
