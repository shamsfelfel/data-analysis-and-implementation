window.DABanks = window.DABanks || {};
(function () {
  /* code(line, line, ...) -> one string with \n between lines */
  function code() { return Array.prototype.join.call(arguments, "\n"); }

  window.DABanks["t1-exam-a"] = {
    title: {
      en: "Chapter Test A — Core",
      ar: "اختبار الفصل أ — الأساسيات"
    },
    intro: {
      en: "24 questions that sample the whole chapter, four per lesson: the ideas every student must own. They run in lesson order: the three shapes of data, what the values mean, containers and pandas dtypes, CSV and Excel, JSON and APIs, and validation with the capstone. Most are easy or medium; a few are hard. All outputs are from Python 3.13, pandas 2.2 and NumPy 2.2. Plan for about 40 minutes. Every question has a hint, an answer and an explanation, hidden until you ask for them: try first, then open them. A revealed answer is not counted.",
      ar: "24 سؤالًا تغطي الفصل كله بواقع أربعة أسئلة لكل درس: الأفكار التي يجب أن يتقنها كل طالب. تسير بترتيب الدروس: أشكال البيانات الثلاثة، ومعنى القيم، والحاويات وأنواع pandas، وملفات CSV وExcel، وJSON والواجهات البرمجية، ثم التحقق والمشروع الختامي. أغلبها سهل أو متوسط وقليل منها صعب. كل النواتج من Python 3.13 وpandas 2.2 وNumPy 2.2. خصّص نحو 40 دقيقة. لكل سؤال تلميح وجواب وشرح، وكلها مخفية حتى تطلبها: جرّب أولًا ثم افتحها. والجواب الذي يُظهَر لا يُحتسب."
    },
    questions: [
      {
        id: "t1ax01",
        type: "match",
        level: "easy",
        topics: [
          "t1-three-questions",
          "t1-shape-comparison",
          "t1-hybrid-shapes"
        ],
        q: {
          en: "Match each dataset to the first step it needs before a model can use it.",
          ar: "وصّل كل مجموعة بيانات بالخطوة الأولى التي تحتاجها قبل أن يتمكن نموذج من استخدامها."
        },
        pairs: [
          {
            l: {
              en: "A clinic's visit table: the same eight columns on every row, the names in a header row",
              ar: "جدول زيارات عيادة: الأعمدة الثمانية نفسها في كل صف، وأسماؤها في سطر العناوين"
            },
            r: {
              en: "Check the types and the blanks: the schema is already there",
              ar: "افحص الأنواع والخانات الفارغة: فالمخطط موجود أصلًا"
            }
          },
          {
            l: {
              en: "A JSON reply from a health-centre service in which only some centres carry a <code>pharmacy</code> key",
              ar: "ردّ JSON من خدمة المراكز الصحية لا يحمل مفتاح <code>pharmacy</code> إلا بعض المراكز"
            },
            r: {
              en: "Survey the keys, flatten the nesting and decide what a missing key means",
              ar: "استطلِع المفاتيح وسطّح التداخل وقرّر ما يعنيه المفتاح الغائب"
            }
          },
          {
            l: {
              en: "Four hundred photographs of damaged classrooms",
              ar: "أربعمئة صورة فوتوغرافية لصفوف متضررة"
            },
            r: {
              en: "Extract features (or compute embeddings) first: there are no fields yet",
              ar: "استخرج السمات (أو احسب التضمينات) أولًا: فلا حقول بعد"
            }
          },
          {
            l: {
              en: "Scanned parent-consent forms whose file names hold a date and a school code",
              ar: "استمارات موافقة أولياء الأمور ممسوحة ضوئيًّا، وفي أسماء ملفاتها تاريخ ورمز مدرسة"
            },
            r: {
              en: "Name the dominant shape: use the file-name fields as columns and extract features from the pixels",
              ar: "سمِّ الشكل الغالب: اعتمد حقول اسم الملف أعمدةً واستخرج السمات من البكسلات"
            }
          }
        ],
        leftHead: {
          en: "Dataset",
          ar: "مجموعة البيانات"
        },
        rightHead: {
          en: "First step",
          ar: "الخطوة الأولى"
        },
        hint: {
          en: "Ask the three questions in turn: do all records have the same fields, and where are the field names written down?",
          ar: "اطرح الأسئلة الثلاثة بالترتيب: هل لكل السجلات الحقول نفسها؟ وأين كُتبت أسماء الحقول؟"
        },
        explain: {
          en: "The shape decides the first step. A table keeps its schema outside the data, so the first job is to check types and blanks. A JSON reply carries its keys inside every record, so you first count which keys exist, flatten the nesting and decide what an absent key means. Photographs have no fields at all: features must be extracted (or an embedding computed) before any model sees a row. The scanned forms are a hybrid, mostly pixels with a little metadata, so you name the dominant shape and give each part its own first step. The tempting mistake is one loader for everything, because every file &lsquo;opens&rsquo; in Python and nothing complains.",
          ar: "الشكل هو الذي يحدّد الخطوة الأولى. الجدول يحتفظ بمخططه خارج البيانات، فأول عمل هو فحص الأنواع والخانات الفارغة. وردّ JSON يحمل مفاتيحه داخل كل سجل، فتبدأ بعدّ المفاتيح الموجودة ثم تسطّح التداخل وتقرّر ما يعنيه المفتاح الغائب. أما الصور فلا حقول فيها أصلًا: لا بد من استخراج السمات (أو حساب تضمين) قبل أن يرى أي نموذج صفًّا. والاستمارات الممسوحة بيانات هجينة، أغلبها بكسلات وفيها قليل من البيانات الوصفية، فتسمّي الشكل الغالب وتعطي كل جزء خطوته الأولى. والخطأ المغري هو استعمال محمِّل واحد لكل شيء، لأن كل ملف «يُفتح» في Python ولا يشكو شيء."
        }
      },
      {
        id: "t1ax02",
        type: "tf",
        level: "easy",
        topics: [
          "t1-advert-parser-evolution",
          "t1-not-found-and-ranges"
        ],
        q: {
          en: "A parser reads 200 landlord adverts into a table. Thirty adverts have no room count (the parser returned <code>None</code>), and 24 of those 30 are studios, which rarely state a number of rooms. (The counts are invented for this question.) True or false: calling <code>dropna()</code> is a harmless clean-up, because the 170 adverts that remain are just a smaller random sample of the same flats.",
          ar: "يحلّل برنامج 200 إعلان من إعلانات الملّاك إلى جدول. ثلاثون إعلانًا ليس فيها عدد غرف (أعاد المحلّل <code>None</code>)، و24 من هذه الثلاثين استوديوهات، وهي نادرًا ما تذكر عدد الغرف. (الأعداد مخترعة لهذا السؤال.) صح أم خطأ: استدعاء <code>dropna()</code> تنظيف لا ضرر فيه، لأن الإعلانات الـ170 الباقية مجرد عيّنة عشوائية أصغر من الشقق نفسها."
        },
        truth: false,
        hint: {
          en: "Ask who the 30 adverts are. A random handful, or a pattern?",
          ar: "اسأل: من هي الإعلانات الثلاثون؟ حفنة عشوائية أم نمط؟"
        },
        explain: {
          en: "False. The missing room counts are not random: 24 of the 30 rows are studios, so dropping them removes almost every studio from the data. A model trained on the remaining 170 has hardly seen one and will price studios badly, while every score computed on the same rows still looks fine. Which rows are missing is rarely random, so before you drop anything, count what you drop and ask who it was. Keep &lsquo;not found&rsquo; as a visible state (a <code>problems</code> column) and decide on purpose.",
          ar: "خطأ. أعداد الغرف الناقصة ليست عشوائية: 24 من الصفوف الثلاثين استوديوهات، فحذفها يُخرج من البيانات كل الاستوديوهات تقريبًا. والنموذج المدرَّب على الـ170 الباقية لم يرَ استوديو إلا نادرًا، فسيسعّره سعرًا سيئًا، بينما تبدو كل نتيجة تقييم محسوبة على الصفوف نفسها سليمة. وغالبًا ما تكون الصفوف الناقصة غير عشوائية، فقبل أن تحذف شيئًا عُدَّ ما تحذفه واسأل: من هم؟ وأبقِ «لم يُعثر عليه» حالةً ظاهرة (عمود <code>problems</code>) وقرّر عن قصد."
        }
      },
      {
        id: "t1ax03",
        type: "error",
        level: "medium",
        topics: [
          "t1-feature-extraction",
          "t1-regex-primer"
        ],
        q: {
          en: "This program should print <code>[True, False, False]</code>, because only the first advert allows pets. It prints <code>[True, True, False]</code> and nothing is raised. Click the line that is responsible.",
          ar: "يُفترض أن يطبع هذا البرنامج <code>[True, False, False]</code> لأن الإعلان الأول وحده يسمح بالحيوانات الأليفة. لكنه يطبع <code>[True, True, False]</code> ولا شيء يُرفع. انقر السطر المسؤول."
        },
        code: code(
          "import re",
          "",
          "ads = [",
          "    \"Pets allowed, ground floor, garden\",",
          "    \"Carpeted rooms, quiet street\",",
          "    \"Studio near the market, tiled floor\",",
          "]",
          "",
          "allows_pets = []",
          "for ad in ads:",
          "    allows_pets.append(\"pet\" in ad.lower())",
          "print(allows_pets)"
        ),
        answer: 11,
        solution: {
          code: "allows_pets.append(re.search(r\"\\bpets?\\b\", ad.lower()) is not None)",
          en: "Line 11 tests a substring: &ldquo;carpeted&rdquo; contains &ldquo;pet&rdquo;. The whole-word pattern <code>\\bpets?\\b</code> matches &ldquo;pets&rdquo; and &ldquo;pet&rdquo; but not &ldquo;carpeted&rdquo;.",
          ar: "السطر 11 يختبر نصًّا جزئيًّا: كلمة «carpeted» تحتوي «pet». أما النمط ذو الحدود <code>\\bpets?\\b</code> فيطابق «pets» و«pet» ولا يطابق «carpeted»."
        },
        hint: {
          en: "Look at the second advert and ask which of its letters the test is really finding.",
          ar: "انظر إلى الإعلان الثاني واسأل: أي حروف منه يعثر عليها الاختبار فعلًا؟"
        },
        explain: {
          en: "Line 11 asks whether the letters <code>pet</code> occur anywhere in the advert, and &ldquo;Car<em>pet</em>ed rooms&rdquo; contains them. The error is not random: every advert that mentions a carpet is flagged as pet-friendly, so a model trained on this feature would be taught it with full confidence. The cure is a whole-word pattern, <code>re.search(r\"\\bpets?\\b\", ad)</code>, and a habit: read a sample of the matches by eye. The loop and the print are innocent; they are the tempting wrong clicks, because the output has the right length and only one element is wrong.",
          ar: "السطر 11 يسأل هل تظهر الحروف <code>pet</code> في أي موضع من الإعلان، وعبارة «Car<em>pet</em>ed rooms» تحتويها. والخطأ ليس عشوائيًّا: كل إعلان يذكر سجّادة يُعدّ صديقًا للحيوانات الأليفة، فيتعلّم النموذج المدرَّب على هذه السمة ذلك بثقة تامة. والعلاج نمط بحدود الكلمة <code>re.search(r\"\\bpets?\\b\", ad)</code> وعادة: اقرأ عيّنة من المطابقات بعينك. أما الحلقة والطباعة فبريئتان، وهما النقرتان الخاطئتان المغريتان لأن الناتج بالطول الصحيح وعنصر واحد فقط خاطئ."
        }
      },
      {
        id: "t1ax04",
        type: "compare",
        level: "medium",
        topics: [
          "t1-optional-keys",
          "t1-schema-on-read"
        ],
        q: {
          en: "The registry promises that every school's <code>enrolment</code> object holds both a <code>boys</code> and a <code>girls</code> count. <code>schools</code> has four records, and school 303 breaks the promise: its object has <code>boys</code> only. (boys/girls: 210/190, 150/170, 240/absent, 180/200.) Which statement about the two versions is true?",
          ar: "يعد السجل بأن كل كائن <code>enrolment</code> في مدرسة يحمل عددَي <code>boys</code> و<code>girls</code>. في <code>schools</code> أربعة سجلات، والمدرسة 303 تُخلّ بالوعد: كائنها فيه <code>boys</code> فقط. (بنين/بنات: 210/190 و150/170 و240/غير موجود و180/200.) أيّ العبارات عن النسختين صحيحة؟"
        },
        codeA: code(
          "totals = [s[\"enrolment\"].get(\"boys\", 0) + s[\"enrolment\"].get(\"girls\", 0)",
          "          for s in schools]",
          "print(totals, sum(totals) / len(totals))"
        ),
        codeB: code(
          "totals = [s[\"enrolment\"][\"boys\"] + s[\"enrolment\"][\"girls\"] for s in schools]",
          "print(totals, sum(totals) / len(totals))"
        ),
        options: [
          {
            en: "A is better: it finishes and prints <code>[400, 320, 240, 380] 335.0</code>, while B crashes on school 303 and gives no answer at all.",
            ar: "أ أفضل: تنتهي وتطبع <code>[400, 320, 240, 380] 335.0</code>، بينما تتعطل ب عند المدرسة 303 فلا تعطي جوابًا."
          },
          {
            en: "B is better: its <code>KeyError: 'girls'</code> says that the source broke its promise. A quietly files school 303 as a school with 0 girls (total 240), and the mean 335.0 looks perfectly normal.",
            ar: "ب أفضل: خطأ <code>KeyError: 'girls'</code> فيها يقول إن المصدر أخلّ بوعده. أما أ فتسجّل المدرسة 303 بصمت مدرسةً بلا بنات (المجموع 240)، ويبدو المتوسط 335.0 طبيعيًّا تمامًا."
          },
          {
            en: "B is better only if it is wrapped in <code>try … except: continue</code>, so that the run goes on and the bad school is skipped.",
            ar: "ب أفضل بشرط أن تُحاط بـ<code>try … except: continue</code> ليستمر التشغيل وتُتخطّى المدرسة المعيبة."
          },
          {
            en: "They are equivalent: adding 0 changes no sum, so the default in A cannot distort anything.",
            ar: "النسختان متكافئتان: إضافة 0 لا تغيّر أي مجموع، فلا يمكن لقيمة أ الافتراضية أن تشوّه شيئًا."
          }
        ],
        answer: 1,
        hint: {
          en: "Ask what the number 0 claims about school 303, and who will ever hear about it.",
          ar: "اسأل: ماذا يدّعي الصفر عن المدرسة 303؟ ومن سيعلم بذلك أصلًا؟"
        },
        explain: {
          en: "The rule of the lesson: read with <code>[]</code> what the source promises on every record, and with <code>.get</code> only what may legitimately be absent. A turns the broken promise into a fact, &ldquo;0 girls&rdquo;, and the mean is then computed as if all four schools had been counted, with no word of warning. B's <code>KeyError</code> is annoying, but it names the missing key and stops the run while you can still ask the registry's owner. Wrapping B in <code>try/except: continue</code> brings the silence back, because the school simply vanishes from the count. A default of 0 is never neutral: it is a claim.",
          ar: "قاعدة الدرس: اقرأ بـ<code>[]</code> ما يعد به المصدر في كل سجل، وبـ<code>.get</code> ما يجوز غيابه فقط. تحوّل أ الوعد المخلَّ به إلى «حقيقة» هي «صفر بنات»، ثم يُحسب المتوسط كأن المدارس الأربع كلها عُدَّت، بلا أي تحذير. و<code>KeyError</code> في ب مزعج، لكنه يسمّي المفتاح الغائب ويوقف التشغيل وأنت ما زلت قادرًا على سؤال صاحب السجل. وإحاطة ب بـ<code>try/except: continue</code> تعيد الصمت، لأن المدرسة تختفي من العدّ. والقيمة الافتراضية 0 ليست محايدة أبدًا: إنها ادّعاء."
        }
      },
      {
        id: "t1ax05",
        type: "mcq",
        level: "easy",
        topics: [
          "t1-categorical-numerical",
          "t1-numbers-that-name"
        ],
        q: {
          en: "A clinic's visit table has four columns, and pandas stores all four as numbers. Which column is the only one whose mean answers a real question?",
          ar: "في جدول زيارات عيادة أربعة أعمدة تخزّنها pandas كلها أرقامًا. أيّ عمود هو الوحيد الذي يجيب متوسطه عن سؤال حقيقي؟"
        },
        options: [
          {
            en: "<code>visit_id</code>: 1, 2, 3 … 300, one number per visit",
            ar: "<code>visit_id</code>: ‏1 و2 و3 … 300، رقم لكل زيارة"
          },
          {
            en: "<code>ward_no</code>: 1 to 6, the ward where the patient was seen",
            ar: "<code>ward_no</code>: من 1 إلى 6، الجناح الذي عُولج فيه المريض"
          },
          {
            en: "<code>triage</code>: 1 = red, 2 = orange, 3 = yellow, 4 = green",
            ar: "<code>triage</code>: ‏1 = أحمر، 2 = برتقالي، 3 = أصفر، 4 = أخضر"
          },
          {
            en: "<code>wait_min</code>: minutes from arrival to the first examination",
            ar: "<code>wait_min</code>: الدقائق من الوصول إلى أول فحص"
          }
        ],
        answer: 3,
        hint: {
          en: "For each column ask: would the sum or the difference of two values ever answer a question you care about?",
          ar: "اسأل عن كل عمود: هل يجيب مجموع قيمتين أو الفرق بينهما عن سؤال يهمّك؟"
        },
        explain: {
          en: "<code>wait_min</code> is an amount: a mean waiting time is a real thing, and &ldquo;twice as long&rdquo; is a true statement. <code>visit_id</code> and <code>ward_no</code> are names written with digits, so their mean is a number made out of labels (the &ldquo;average visit&rdquo; is number 150.5, and ward 3.4 is no ward). <code>triage</code> is the tempting one, because it is a real order; but it is only an order, since nobody promised that the step from red to orange equals the step from yellow to green, so the legal summaries are the median and the counts. The storage type never decides the question; the meaning of a sum does.",
          ar: "<code>wait_min</code> كمّية: متوسط زمن الانتظار شيء حقيقي، وعبارة «ضعف المدة» عبارة صحيحة. أما <code>visit_id</code> و<code>ward_no</code> فأسماء مكتوبة بأرقام، فمتوسطهما رقم مصنوع من تسميات («الزيارة المتوسطة» هي الرقم 150.5، والجناح 3.4 ليس جناحًا). و<code>triage</code> هو المغري لأنه ترتيب حقيقي، لكنه ترتيب فقط: لم يعد أحد بأن الخطوة من الأحمر إلى البرتقالي تساوي الخطوة من الأصفر إلى الأخضر، فالملخّصان المشروعان هما الوسيط والتعداد. نوع التخزين لا يحسم السؤال أبدًا؛ يحسمه معنى المجموع."
        }
      },
      {
        id: "t1ax06",
        type: "contrast",
        level: "medium",
        topics: [
          "t1-interval",
          "t1-ratio",
          "t1-true-zero"
        ],
        q: {
          en: "Place each statement under <em>interval</em> data, under <em>ratio</em> data, under both, or under neither.",
          ar: "ضع كل عبارة تحت البيانات <em>الفترية</em> أو تحت البيانات <em>النسبية</em> أو تحت كلتيهما أو تحت لا هذه ولا تلك."
        },
        concepts: [
          {
            en: "Interval",
            ar: "فتري (Interval)"
          },
          {
            en: "Ratio",
            ar: "نسبي (Ratio)"
          }
        ],
        neither: true,
        rows: [
          {
            s: {
              en: "The step from 10 to 20 means the same as the step from 20 to 30",
              ar: "الخطوة من 10 إلى 20 تعني ما تعنيه الخطوة من 20 إلى 30"
            },
            a: 2
          },
          {
            s: {
              en: "&ldquo;Twice as much&rdquo; is a meaningful statement",
              ar: "عبارة «ضعف ذلك» لها معنى"
            },
            a: 1
          },
          {
            s: {
              en: "Zero means &ldquo;none of it&rdquo;, whatever the unit",
              ar: "الصفر يعني «لا شيء منه» أيًّا كانت الوحدة"
            },
            a: 1
          },
          {
            s: {
              en: "The mean and the standard deviation are legal summaries",
              ar: "المتوسط الحسابي والانحراف المعياري ملخّصان مشروعان"
            },
            a: 2
          },
          {
            s: {
              en: "Example: the calendar date on which a listing was posted",
              ar: "مثال: تاريخ نشر الإعلان في التقويم"
            },
            a: 0
          },
          {
            s: {
              en: "Adding a constant to every value (Celsius to Kelvin) keeps every legal statement true",
              ar: "إضافة ثابت إلى كل القيم (من سلسيوس إلى كلفن) تُبقي كل عبارة مشروعة صحيحة"
            },
            a: 0
          },
          {
            s: {
              en: "Its only legal measure of the centre is the mode",
              ar: "مقياس المركز المشروع الوحيد له هو المنوال"
            },
            a: 3
          }
        ],
        hint: {
          en: "Change the unit of the column and watch whether its zero stays where it was.",
          ar: "غيّر وحدة العمود وراقب: هل يبقى صفره في مكانه؟"
        },
        explain: {
          en: "Interval and ratio share everything about gaps: equal steps, differences, the mean and the standard deviation. They differ in one thing, the zero. A ratio column has a true zero that does not move when the unit changes (0 NIS is 0 USD), so ratios such as &ldquo;twice&rdquo; are facts, and only a stretch (multiplying by a constant) is a harmless re-labelling. An interval column has a zero that somebody chose (0&nbsp;&deg;C is 32&nbsp;&deg;F), so ratios are not facts, but both a stretch and a shift keep its statements true; calendar dates are interval too. A column whose only legal centre is the mode is nominal, which fits neither.",
          ar: "يشترك الفتري والنسبي في كل ما يتعلق بالفروق: خطوات متساوية وفروق ومتوسط وانحراف معياري. ويختلفان في شيء واحد هو الصفر. العمود النسبي له صفر حقيقي لا يتحرك حين تتغير الوحدة (0 شيكل هو 0 دولار)، فالنسب مثل «الضعف» حقائق، ولا يُعدّ إعادة تسمية بريئة إلا التمديد (الضرب في ثابت). والعمود الفتري صفره اختاره أحدهم (0&nbsp;&deg;م هو 32&nbsp;&deg;ف)، فالنسب ليست حقائق، لكن التمديد والإزاحة معًا يُبقيان عباراته صحيحة؛ والتواريخ التقويمية فترية أيضًا. أما العمود الذي مركزه المشروع الوحيد هو المنوال فاسمي، وهو لا هذا ولا ذاك."
        }
      },
      {
        id: "t1ax07",
        type: "trace",
        level: "medium",
        topics: [
          "t1-relabeling-test",
          "t1-ordinal",
          "t1-allowed-operations"
        ],
        q: {
          en: "Two batches of school damage assessments are compared under two numberings of the same three levels. After the program has run, what are the values of these four variables? (Type <code>X</code> or <code>Y</code>, and the level without quote marks.)",
          ar: "تُقارَن دفعتان من تقييمات تضرر المدارس بترقيمين مختلفين للمستويات الثلاثة نفسها. بعد انتهاء تنفيذ البرنامج، ما قيم المتغيرات الأربعة؟ (اكتب <code>X</code> أو <code>Y</code>، واكتب المستوى بلا علامات تنصيص.)"
        },
        code: code(
          "A = {\"slight\": 1, \"partial\": 2, \"total\": 3}",
          "B = {\"slight\": 1, \"partial\": 5, \"total\": 6}     # same order, wider gap",
          "",
          "X = [\"slight\", \"slight\", \"partial\", \"total\", \"total\"]",
          "Y = [\"slight\", \"partial\", \"partial\", \"partial\", \"partial\"]",
          "",
          "def mean(batch, code):",
          "    return sum(code[v] for v in batch) / len(batch)",
          "",
          "def median(batch, code):",
          "    s = sorted(batch, key=code.get)",
          "    return s[len(s) // 2]",
          "",
          "higher_a = \"X\" if mean(X, A) > mean(Y, A) else \"Y\"",
          "higher_b = \"X\" if mean(X, B) > mean(Y, B) else \"Y\"",
          "mid_x = median(X, B)",
          "mid_y = median(Y, A)"
        ),
        blanks: [
          {
            accept: [
              "X",
              "'X'",
              "\"X\""
            ],
            label: {
              en: "higher_a",
              ar: "higher_a"
            }
          },
          {
            accept: [
              "Y",
              "'Y'",
              "\"Y\""
            ],
            label: {
              en: "higher_b",
              ar: "higher_b"
            }
          },
          {
            accept: [
              "partial",
              "'partial'",
              "\"partial\""
            ],
            label: {
              en: "mid_x",
              ar: "mid_x"
            }
          },
          {
            accept: [
              "partial",
              "'partial'",
              "\"partial\""
            ],
            label: {
              en: "mid_y",
              ar: "mid_y"
            }
          }
        ],
        hint: {
          en: "Work out the two means under each numbering. For the medians, ask whether a new numbering can change the order of the levels.",
          ar: "احسب المتوسطين تحت كل ترقيم. وللوسيطين اسأل: هل يستطيع ترقيم جديد أن يغيّر ترتيب المستويات؟"
        },
        explain: {
          en: "Under numbering A the means are 2.0 for X and 1.8 for Y, so X looks worse; under B they are 3.8 and 4.2, so Y looks worse. Same schools, same order of the levels, opposite verdicts: the mean ranked the batches by the numbers we happened to choose. The median uses only the order, and the order did not change, so both batches have the median &lsquo;partial&rsquo; under either numbering. That is what &ldquo;legal at the ordinal level&rdquo; means. The tempting reply is to trust the mean because it is a number, but the gaps between the codes were never measured.",
          ar: "تحت الترقيم A يكون المتوسطان 2.0 لـX و1.8 لـY، فتبدو X أسوأ؛ وتحت B يكونان 3.8 و4.2، فتبدو Y أسوأ. المدارس نفسها وترتيب المستويات نفسه، والحكمان متعاكسان: لقد رتّب المتوسط الدفعتين بحسب أرقام اخترناها نحن اتفاقًا. أما الوسيط فيستعمل الترتيب وحده، والترتيب لم يتغير، فللدفعتين الوسيط «partial» تحت أي ترقيم. وهذا هو معنى «مشروع في المستوى الترتيبي». والرد المغري أن نثق بالمتوسط لأنه رقم، لكن الفجوات بين الرموز لم يقسها أحد."
        }
      },
      {
        id: "t1ax08",
        type: "multi",
        level: "hard",
        topics: [
          "t1-real-zero-kept",
          "t1-vanishing-zero",
          "t1-zero-in-identifiers"
        ],
        q: {
          en: "Three exports are full of zeros. Choose all the actions that are right.",
          ar: "ثلاثة ملفات مصدَّرة مليئة بالأصفار. اختر كل الإجراءات الصحيحة."
        },
        options: [
          {
            en: "In a table whose export writes every blank as 0, call <code>df.replace(0, np.nan)</code> on the whole table to be safe.",
            ar: "في جدول يكتب تصديره كل خانة فارغة صفرًا، استدعِ <code>df.replace(0, np.nan)</code> على الجدول كله احتياطًا."
          },
          {
            en: "<code>meals_served</code>: the export writes 0 for a day on which the form was not submitted, and a <code>submitted</code> column (yes/no) says which. Turn a 0 into <code>NaN</code> only where <code>submitted</code> is <code>no</code>, and report how many were turned.",
            ar: "<code>meals_served</code>: يكتب التصدير 0 ليومٍ لم يُرسَل فيه النموذج، وعمود <code>submitted</code> (نعم/لا) يبيّن أيّ الأيام. حوّل الصفر إلى <code>NaN</code> حيث <code>submitted</code> هو <code>no</code> فقط، وأبلِغ بعدد ما حوّلته."
          },
          {
            en: "<code>rain_mm</code> from a weather station: dry days are recorded as 0. Leave the zeros; they are measurements.",
            ar: "<code>rain_mm</code> من محطة طقس: الأيام الجافة تُسجَّل 0. اترك الأصفار، فهي قياسات."
          },
          {
            en: "<code>absent_pupils</code>: turn every 0 into <code>NaN</code>, because on a real school day somebody is always absent.",
            ar: "<code>absent_pupils</code>: حوّل كل 0 إلى <code>NaN</code> لأن في كل يوم دراسي حقيقي غائبًا واحدًا على الأقل."
          },
          {
            en: "<code>school_code</code>, with values such as <code>0071</code>: read the column as text (<code>dtype={\"school_code\": str}</code>) so that the leading zero is not lost.",
            ar: "<code>school_code</code> بقيم مثل <code>0071</code>: اقرأ العمود نصًّا (<code>dtype={\"school_code\": str}</code>) كي لا يضيع الصفر الأول."
          },
          {
            en: "<code>meals_served</code> again: leave every zero as it is, because zero is a number and the mean is still valid.",
            ar: "<code>meals_served</code> مرة أخرى: اترك كل صفر كما هو لأن الصفر رقم والمتوسط يبقى صالحًا."
          }
        ],
        answer: [1, 2, 4],
        hint: {
          en: "Ask of each zero what it means in its own column, and who can tell you.",
          ar: "اسأل عن كل صفر: ماذا يعني في عموده؟ ومن يستطيع أن يخبرك؟"
        },
        explain: {
          en: "A zero has several faces, and the same value needs a different action for each. A disguised zero is masked only where the data itself says so (the <code>submitted</code> column), and the count of masked cells is reported. The rain zero and the absent-pupils zero are real values (a dry day; a day on which everybody came), and erasing them turns facts into gaps and moves the mean. The 0 in <code>0071</code> is part of a name, so the repair is at the reader (text), not in the values. Replacing every zero in the table (first option) erases real zeros together with fake ones; leaving all zeros in <code>meals_served</code> (last option) lets non-answers drag the mean down. The rule: ask what zero means in this column, then act on that column only.",
          ar: "للصفر وجوه عدة، والقيمة نفسها تحتاج إجراءً مختلفًا لكل وجه. الصفر المقنَّع يُحوَّل إلى مفقود حيث تقول البيانات نفسها ذلك (عمود <code>submitted</code>) وحدها، ويُبلَّغ بعدد الخانات المحوَّلة. وصفر المطر وصفر الغياب قيمتان حقيقيتان (يوم جاف، ويوم حضر فيه الجميع)، ومحوهما يحوّل حقائق إلى فجوات ويحرّك المتوسط. والصفر في <code>0071</code> جزء من اسم، فالإصلاح عند القارئ (نص) لا في القيم. واستبدال كل صفر في الجدول (الخيار الأول) يمحو الأصفار الحقيقية مع المزيفة؛ وترك كل الأصفار في <code>meals_served</code> (الخيار الأخير) يترك غير الإجابات تسحب المتوسط إلى أسفل. القاعدة: اسأل ماذا يعني الصفر في هذا العمود، ثم تصرّف في هذا العمود وحده."
        }
      },
      {
        id: "t1ax09",
        type: "match",
        level: "easy",
        topics: [
          "t1-typed-table",
          "t1-category-ordered",
          "t1-nullable-dtypes"
        ],
        q: {
          en: "Match each column of a clinic register to the pandas dtype that says what the column really is.",
          ar: "وصّل كل عمود في سجل عيادة بنوع pandas الذي يقول ما هو العمود حقًّا."
        },
        pairs: [
          {
            l: {
              en: "<code>patient_id</code>: 0042, 0107 … identifiers with leading zeros",
              ar: "<code>patient_id</code>: ‏0042 و0107 … معرّفات لها أصفار في أولها"
            },
            r: {
              code: "string"
            }
          },
          {
            l: {
              en: "<code>ward</code>: six names that repeat over thousands of rows",
              ar: "<code>ward</code>: ستة أسماء تتكرر عبر آلاف الصفوف"
            },
            r: {
              code: "category"
            }
          },
          {
            l: {
              en: "<code>visit_date</code>: 2026-03-14",
              ar: "<code>visit_date</code>: ‏2026-03-14"
            },
            r: {
              code: "datetime64[ns]"
            }
          },
          {
            l: {
              en: "<code>children</code>: a whole-number count, blank when unknown",
              ar: "<code>children</code>: عدد صحيح يُترك فارغًا حين يكون مجهولًا"
            },
            r: {
              code: "Int64"
            }
          },
          {
            l: {
              en: "<code>triage</code>: red, orange, yellow, green, a ranking",
              ar: "<code>triage</code>: أحمر وبرتقالي وأصفر وأخضر، ترتيب"
            },
            r: {
              code: "CategoricalDtype(levels, ordered=True)"
            }
          },
          {
            l: {
              en: "<code>smoker</code>: yes, no or blank (unknown)",
              ar: "<code>smoker</code>: نعم أو لا أو فارغ (مجهول)"
            },
            r: {
              code: "boolean"
            }
          }
        ],
        leftHead: {
          en: "Column",
          ar: "العمود"
        },
        rightHead: {
          en: "dtype",
          ar: "نوع البيانات"
        },
        hint: {
          en: "Ask what the column is (a name, a ranking, a count with gaps, a date) before you ask how it is stored.",
          ar: "اسأل ما هو العمود (اسم أم ترتيب أم عدّ فيه فجوات أم تاريخ) قبل أن تسأل كيف يُخزَّن."
        },
        explain: {
          en: "The dtype should say what the column is. An identifier is a name, so it is <code>string</code>: read as a number it would lose its zeros. A few labels that repeat are a <code>category</code>, and a ranking is an <em>ordered</em> category, so that sorting and comparisons follow the ranking. A date must be <code>datetime64</code> to give you months and differences. A count with gaps is <code>Int64</code>: plain <code>int64</code> cannot hold a gap, and one blank would turn it into <code>float64</code>. A yes/no with unknowns is <code>boolean</code>, filled by an explicit map, never by <code>astype(bool)</code>, which makes every non-empty text True.",
          ar: "ينبغي أن يقول النوع ما هو العمود. المعرّف اسم، فهو <code>string</code>: ولو قُرئ رقمًا لفقد أصفاره. وقليل من التسميات المتكررة <code>category</code>، والترتيب فئة <em>مرتّبة</em> ليتبعه الفرز والمقارنة. والتاريخ يجب أن يكون <code>datetime64</code> ليعطيك الأشهر والفروق. والعدّ ذو الفجوات <code>Int64</code>: فنوع <code>int64</code> العادي لا يحمل فجوة، وخانة فارغة واحدة تحوّله إلى <code>float64</code>. ونعم/لا مع المجهول <code>boolean</code>، يُملأ بتعيين صريح، لا بـ<code>astype(bool)</code> التي تجعل كل نص غير فارغ True."
        }
      },
      {
        id: "t1ax10",
        type: "error",
        level: "medium",
        topics: [
          "t1-missing-spellings",
          "t1-nan-aggregations"
        ],
        q: {
          en: "The program should report that 4 of the 60 listings have no area (7%). It prints 0 and 0%, and nothing is raised. Click the line that is responsible.",
          ar: "يُفترض أن يُبلغ البرنامج أن 4 من الإعلانات الستين بلا مساحة (7%). لكنه يطبع 0 و0% ولا شيء يُرفع. انقر السطر المسؤول."
        },
        code: code(
          "import numpy as np",
          "import pandas as pd",
          "",
          "df = pd.read_csv(\"rental_listings.csv\")",
          "no_area = df[df[\"area_m2\"] == np.nan]",
          "print(len(df), \"listings,\", len(no_area), \"without an area\")",
          "share = len(no_area) / len(df)",
          "print(f\"{share:.0%} of the areas are missing\")"
        ),
        answer: 5,
        solution: {
          code: "no_area = df[df[\"area_m2\"].isna()]",
          en: "Line 5 compares with <code>np.nan</code>, which is never equal to anything, not even to itself. <code>.isna()</code> recognises a missing value.",
          ar: "السطر 5 يقارن بـ<code>np.nan</code> التي لا تساوي أي شيء، ولا حتى نفسها. أما <code>.isna()</code> فتتعرّف على القيمة المفقودة."
        },
        hint: {
          en: "Recall what the lesson says about <code>nan == nan</code>. How would you ask a column which cells are missing?",
          ar: "تذكّر ما قاله الدرس عن <code>nan == nan</code>. كيف تسأل عمودًا عن الخانات المفقودة فيه؟"
        },
        explain: {
          en: "<code>np.nan</code> is the floating-point &ldquo;not a number&rdquo;, and it is not equal to anything, not even to itself. So <code>df[\"area_m2\"] == np.nan</code> is False on all 60 rows, the filter keeps nothing, and the report says that no area is missing, a plausible and wrong answer. Ask with <code>.isna()</code>, which recognises every spelling of missing (NaN, None, NaT, <code>pd.NA</code>). The tempting wrong clicks are the later lines, because that is where the wrong number appears; the cause is the test on line 5.",
          ar: "<code>np.nan</code> هي «ليس رقمًا» في الفاصلة العائمة، ولا تساوي أي شيء حتى نفسها. لذلك فإن <code>df[\"area_m2\"] == np.nan</code> تعطي False على الصفوف الستين كلها، فلا يُبقي المرشِّح شيئًا، ويقول التقرير إنه لا مساحة مفقودة: جواب معقول وخاطئ. اسأل بـ<code>.isna()</code> التي تتعرّف على كل صور المفقود (NaN وNone وNaT و<code>pd.NA</code>). والنقرات الخاطئة المغرية هي الأسطر اللاحقة لأن الرقم الخاطئ يظهر فيها؛ أما السبب فهو الاختبار في السطر 5."
        }
      },
      {
        id: "t1ax11",
        type: "output",
        level: "easy",
        topics: [
          "t1-filter-new-column",
          "t1-missing-spellings"
        ],
        q: {
          en: "Six rents were read from a file, and two cells were blank. Write exactly what the program prints (four lines).",
          ar: "قُرئت ستة إيجارات من ملف، وكانت خانتان فارغتين. اكتب بالضبط ما يطبعه البرنامج (أربعة أسطر)."
        },
        code: code(
          "import pandas as pd",
          "",
          "rent = pd.Series([415.0, 445.0, None, 590.0, 315.0, None])",
          "print((rent > 400).sum())",
          "print((rent <= 400).sum())",
          "print(rent.isna().sum())",
          "print((rent > 400).sum() + (rent <= 400).sum() == len(rent))"
        ),
        blanks: [
          {
            accept: [
              "3\n1\n2\nFalse"
            ],
            lines: 4
          }
        ],
        hint: {
          en: "What does a comparison return when one side of it is a missing value?",
          ar: "ماذا تعيد المقارنة حين يكون أحد طرفيها قيمة مفقودة؟"
        },
        explain: {
          en: "A comparison with a missing value is neither true nor &ldquo;the opposite&rdquo;: it is simply False. So the two blank rents are in neither group: <code>&gt; 400</code> finds 3 (415, 445, 590), <code>&lt;= 400</code> finds only 1 (315), and 3 + 1 = 4, not 6. A report that says &ldquo;3 expensive, the rest cheap&rdquo; silently files the two unknown flats under &ldquo;cheap&rdquo;. After any mask, count what it leaves out (<code>isna().sum()</code> is 2), and the three counts add up to the 6 rows.",
          ar: "المقارنة مع قيمة مفقودة ليست صحيحة ولا «عكسها»: إنها False فقط. لذلك لا تقع الخانتان الفارغتان في أي من المجموعتين: <code>&gt; 400</code> تجد 3 (‏415 و445 و590)، و<code>&lt;= 400</code> تجد واحدًا فقط (‏315)، و3 + 1 = 4 لا 6. وتقرير يقول «3 غالية والباقي رخيص» يضع الشقتين المجهولتين بصمت تحت «رخيص». بعد أي قناع عُدَّ ما تركه خارجه (<code>isna().sum()</code> يساوي 2)، فتكتمل الأعداد الثلاثة إلى الصفوف الستة."
        }
      },
      {
        id: "t1ax12",
        type: "complete",
        level: "medium",
        topics: [
          "t1-category-ordered",
          "t1-coerce-and-count"
        ],
        q: {
          en: "The stage of each school is converted to an ordered category. Complete the line so that <code>lost</code> counts only the labels that the conversion itself turned into missing values (here 2: the typo &ldquo;Primry&rdquo; and the lower-case &ldquo;secondary&rdquo;), not the one cell that was already blank.",
          ar: "تُحوَّل مرحلة كل مدرسة إلى فئة مرتّبة. أكمل السطر ليعدّ <code>lost</code> فقط التسميات التي حوّلها التحويل نفسه إلى مفقودة (هنا 2: الخطأ الإملائي «Primry» و«secondary» بحروف صغيرة)، لا الخانة الواحدة التي كانت فارغة أصلًا."
        },
        code: code(
          "import pandas as pd",
          "",
          "stage = pd.CategoricalDtype([\"Primary\", \"Preparatory\", \"Secondary\"], ordered=True)",
          "raw = pd.Series([\"Primary\", \"Primry\", \"Secondary\", None, \"Preparatory\", \"secondary\"])",
          "level = raw.astype(stage)",
          "lost = ____",
          "print(lost)               # 2"
        ),
        options: [
          {
            code: "level.isna().sum()"
          },
          {
            code: "len(raw) - level.count()"
          },
          {
            code: "(level.isna() & raw.notna()).sum()"
          },
          {
            code: "(level.cat.codes == -1).sum()"
          }
        ],
        answer: 2,
        solution: {
          code: "lost = (level.isna() & raw.notna()).sum()",
          en: "Missing now and present before: the mask isolates what the conversion swallowed.",
          ar: "مفقودة الآن وكانت موجودة قبلًا: يعزل القناع ما ابتلعه التحويل."
        },
        hint: {
          en: "Which cells were already missing before the conversion? Your count must leave them out.",
          ar: "أيّ الخانات كانت مفقودة قبل التحويل؟ يجب أن يستبعدها عدّك."
        },
        explain: {
          en: "A closed list of categories is strict in a quiet way: a label that is not on the list raises no error, it becomes missing. The other three expressions count every missing cell after the conversion (or the code <code>-1</code>, which marks the same cells), so they include the blank that was already there and answer 3 instead of 2. Only the mask &ldquo;missing now and present before&rdquo; isolates what the conversion swallowed, and here it points at exactly the two spellings to repair. It is the same rule as for <code>pd.to_numeric(errors=\"coerce\")</code>: after any forgiving conversion, count what it swallowed.",
          ar: "قائمة الفئات المغلقة صارمة بهدوء: التسمية التي ليست في القائمة لا ترفع خطأً بل تصير مفقودة. أما التعبيرات الثلاثة الأخرى فتعدّ كل خانة مفقودة بعد التحويل (أو الرمز <code>-1</code> الذي يعلّم الخانات نفسها)، فتشمل الخانة الفارغة التي كانت موجودة أصلًا وتجيب 3 بدل 2. القناع «مفقودة الآن وكانت موجودة قبلًا» وحده يعزل ما ابتلعه التحويل، وهو هنا يشير بالضبط إلى الصيغتين الإملائيتين اللتين تحتاجان إلى إصلاح. وهي القاعدة نفسها في <code>pd.to_numeric(errors=\"coerce\")</code>: بعد أي تحويل متساهل عُدَّ ما ابتلعه."
        }
      },
      {
        id: "t1ax13",
        type: "output",
        level: "medium",
        topics: [
          "t1-na-values",
          "t1-csv-decimal-thousands"
        ],
        q: {
          en: "Write exactly what the program prints (three lines).",
          ar: "اكتب بالضبط ما يطبعه البرنامج (ثلاثة أسطر)."
        },
        code: code(
          "import io",
          "import pandas as pd",
          "",
          "txt = 'city,rent\\nGaza,\"1,350\"\\nRafah,860\\nJabalia,n/a\\n'",
          "df = pd.read_csv(io.StringIO(txt), thousands=\",\")",
          "print(df[\"rent\"].tolist())",
          "print(df[\"rent\"].dtype)",
          "print(df[\"rent\"].isna().sum())"
        ),
        blanks: [
          {
            accept: [
              "[1350.0, 860.0, nan]\nfloat64\n1"
            ],
            lines: 3
          }
        ],
        hint: {
          en: "Decide what each of the three cells becomes: what does the reader do with the quoted comma, and what does it do with <code>n/a</code> when nobody told it anything?",
          ar: "قرّر ما تصيره كل خانة من الخانات الثلاث: ماذا يفعل القارئ بالفاصلة المنصَّصة، وماذا يفعل بـ<code>n/a</code> حين لا يقول له أحد شيئًا؟"
        },
        explain: {
          en: "The cell <code>\"1,350\"</code> alone would make the whole column text, but <code>thousands=\",\"</code> tells the reader that the comma groups digits, so it becomes 1350. The text <code>n/a</code> is on pandas' default list of missing-value markers, so it becomes <code>NaN</code> without any argument. A column with a missing value is <code>float64</code>, not <code>int64</code>, and prints as floats: <code>[1350.0, 860.0, nan]</code>. The usual slips are to expect <code>object</code> because of the <code>n/a</code> (it is markers off the list, such as <code>-</code>, that do that), or to expect <code>[1350, 860, nan]</code>.",
          ar: "الخانة <code>\"1,350\"</code> وحدها كانت ستجعل العمود كله نصًّا، لكن <code>thousands=\",\"</code> تخبر القارئ أن الفاصلة تجمع الأرقام، فتصير 1350. والنص <code>n/a</code> في قائمة pandas الافتراضية لرموز القيم المفقودة، فيصير <code>NaN</code> دون أي وسيط. والعمود الذي فيه قيمة مفقودة من النوع <code>float64</code> لا <code>int64</code>، ويُطبع أعدادًا عشرية: <code>[1350.0, 860.0, nan]</code>. والزلّتان المعتادتان أن تتوقع <code>object</code> بسبب <code>n/a</code> (الرموز خارج القائمة مثل <code>-</code> هي التي تفعل ذلك)، أو أن تتوقع <code>[1350, 860, nan]</code>."
        }
      },
      {
        id: "t1ax14",
        type: "order",
        level: "easy",
        topics: [
          "t1-csv-layers",
          "t1-csv-reader-recipe"
        ],
        q: {
          en: "Put the stages of what <code>pd.read_csv</code> does with a file in the order in which they happen. Each stage depends on the one before it, and each can go wrong without an error.",
          ar: "رتّب مراحل ما تفعله <code>pd.read_csv</code> بالملف بالترتيب الذي تحدث به. كل مرحلة تعتمد على التي قبلها، وكل مرحلة قد تخطئ دون رسالة خطأ."
        },
        items: [
          {
            en: "Decode the bytes into characters (the encoding)",
            ar: "فكّ ترميز البايتات إلى أحرف (الترميز)"
          },
          {
            en: "Cut the characters into records, keeping a quoted line break inside its record",
            ar: "قطّع الأحرف إلى سجلات مع إبقاء فاصل السطر المنصَّص داخل سجله"
          },
          {
            en: "Cut each record into fields at the delimiter, keeping a quoted comma inside its field",
            ar: "قطّع كل سجل إلى حقول عند الفاصل مع إبقاء الفاصلة المنصَّصة داخل حقلها"
          },
          {
            en: "Turn the text of each field into a value: a number, a date or a missing value",
            ar: "حوّل نص كل حقل إلى قيمة: رقم أو تاريخ أو مفقود"
          },
          {
            en: "Assemble the columns into a DataFrame under the names of the header row",
            ar: "اجمع الأعمدة في جدول DataFrame بأسماء سطر العناوين"
          }
        ],
        answer: [0, 1, 2, 3, 4],
        hint: {
          en: "Start with what the file physically is, bytes, and ask at each stage what the next one needs.",
          ar: "ابدأ بما هو الملف فعليًّا، بايتات، واسأل في كل مرحلة عمّا تحتاجه المرحلة التالية."
        },
        explain: {
          en: "You cannot cut text you have not decoded, cannot split records into fields until you know where a record ends (a quoted line break does not end it), and cannot decide that <code>119,2</code> is a number until you have the field. The order is bytes, characters, records, fields, values, table. That is why a wrong choice shows up in a different place at each stage: a wrong encoding garbles letters, a wrong delimiter gives one column or shifted columns, a wrong decimal mark gives text where numbers should be. And because fixing one stage often exposes the next (a delimiter first, then the decimal comma), you fix one thing at a time and look again.",
          ar: "لا تستطيع تقطيع نص لم تفكّ ترميزه، ولا تقسيم السجلات إلى حقول قبل أن تعرف أين ينتهي السجل (فاصل السطر المنصَّص لا ينهيه)، ولا الحكم بأن <code>119,2</code> رقم قبل أن يكون لديك الحقل. الترتيب: بايتات فأحرف فسجلات فحقول فقيم فجدول. ولهذا يظهر الخطأ في كل مرحلة بشكل مختلف: ترميز خاطئ يشوّه الحروف، وفاصل خاطئ يعطي عمودًا واحدًا أو أعمدة مزاحة، وعلامة عشرية خاطئة تعطي نصًّا حيث ينبغي أن تكون أرقام. ولأن إصلاح مرحلة يكشف غالبًا التي بعدها (الفاصل أولًا ثم الفاصلة العشرية) تصلح شيئًا واحدًا في كل مرة ثم تنظر من جديد."
        }
      },
      {
        id: "t1ax15",
        type: "write",
        level: "hard",
        topics: [
          "t1-excel-title-rows",
          "t1-excel-serial-dates"
        ],
        q: {
          en: "The workbook <code>rental_listings.xlsx</code> has a sheet <code>Raw</code>: a title, an &ldquo;Exported&rdquo; line and an empty row, then the header row, then 40 listings. Its <code>listed_on</code> cells are Excel serial numbers stored as plain numbers (46038 means 16 January 2026). Write code that loads the sheet <code>Raw</code> with the right header row, turns <code>listed_on</code> into real dates and prints the earliest and the latest date.",
          ar: "في المصنَّف <code>rental_listings.xlsx</code> ورقة اسمها <code>Raw</code>: عنوان وسطر «Exported» وسطر فارغ، ثم سطر العناوين، ثم 40 إعلانًا. وخانات <code>listed_on</code> فيها أرقام Excel التسلسلية مخزَّنة أرقامًا عادية (الرقم 46038 يعني 16 يناير 2026). اكتب كودًا يحمّل الورقة <code>Raw</code> بسطر العناوين الصحيح، ويحوّل <code>listed_on</code> إلى تواريخ حقيقية، ويطبع أقدم تاريخ وأحدثه."
        },
        starter: code(
          "import pandas as pd",
          "",
          "# your code here"
        ),
        lines: 8,
        lang: "python",
        checks: [
          {
            re: "^(?=.*read_excel\\s*\\()(?=.*[\"']Raw[\"'])",
            label: {
              en: "<code>pd.read_excel</code> on the sheet <code>\"Raw\"</code>",
              ar: "<code>pd.read_excel</code> على الورقة <code>\"Raw\"</code>"
            }
          },
          {
            re: "(header\\s*=\\s*3|skiprows\\s*=\\s*3)",
            label: {
              en: "Say where the table starts: <code>header=3</code> (or <code>skiprows=3</code>)",
              ar: "قل أين يبدأ الجدول: <code>header=3</code> (أو <code>skiprows=3</code>)"
            }
          },
          {
            re: "to_datetime\\s*\\(",
            label: {
              en: "Convert with <code>pd.to_datetime</code>",
              ar: "حوّل بـ<code>pd.to_datetime</code>"
            }
          },
          {
            re: "unit\\s*=\\s*[\"']D[\"']",
            label: {
              en: "The numbers count days: <code>unit=\"D\"</code>",
              ar: "الأرقام تعدّ أيامًا: <code>unit=\"D\"</code>"
            }
          },
          {
            re: "origin\\s*=\\s*[\"']1899-12-30[\"']",
            label: {
              en: "Excel's origin: <code>origin=\"1899-12-30\"</code>",
              ar: "أصل العدّ في Excel: <code>origin=\"1899-12-30\"</code>"
            }
          },
          {
            re: "^(?=.*\\.min\\s*\\()(?=.*\\.max\\s*\\()(?=.*print\\s*\\()",
            label: {
              en: "Print the earliest and the latest date with <code>.min()</code> and <code>.max()</code>",
              ar: "اطبع أقدم تاريخ وأحدثه بـ<code>.min()</code> و<code>.max()</code>"
            }
          }
        ],
        forbid: [
          {
            re: "astype\\s*\\(\\s*[\"']datetime64",
            label: {
              en: "<code>astype(\"datetime64\")</code> (it reads the numbers as nanoseconds since 1970)",
              ar: "<code>astype(\"datetime64\")</code> (تقرأ الأرقام نانوثوانيَ منذ 1970)"
            }
          }
        ],
        solution: {
          code: code(
            "import pandas as pd",
            "",
            "raw = pd.read_excel(\"rental_listings.xlsx\", sheet_name=\"Raw\", header=3)",
            "raw[\"listed_on\"] = pd.to_datetime(raw[\"listed_on\"], unit=\"D\", origin=\"1899-12-30\")",
            "print(raw[\"listed_on\"].min(), raw[\"listed_on\"].max())"
          ),
          out: "2026-01-09 00:00:00 2026-05-05 00:00:00",
          en: "<code>header=3</code> skips the title, the &ldquo;Exported&rdquo; line and the blank row (rows are counted from 0 and the blank one counts). <code>unit=\"D\"</code> with Excel's origin turns 46038 into 16 January 2026. The earliest and latest dates are a sanity check: a 1970 or a 2096 would mean a wrong origin or unit.",
          ar: "<code>header=3</code> يتخطى العنوان وسطر «Exported» والسطر الفارغ (يبدأ العدّ من 0 ويُحسب السطر الفارغ). و<code>unit=\"D\"</code> مع أصل Excel يحوّلان 46038 إلى 16 يناير 2026. وأقدم تاريخ وأحدثه فحص معقولية: ظهور 1970 أو 2096 يعني أصلًا أو وحدة خاطئين."
        },
        hint: {
          en: "Two things must be said to the reader: where the header row is, and how the numbers in <code>listed_on</code> count time. The lesson names the day on which Excel's count starts.",
          ar: "يجب أن تقول للقارئ شيئين: أين سطر العناوين، وكيف تعدّ أرقام <code>listed_on</code> الزمن. وقد سمّى الدرس اليوم الذي يبدأ منه عدّ Excel."
        },
        explain: {
          en: "<code>read_excel</code> reads what is stored in the cells. With the defaults the title becomes the header, the table has 43 rows and every dtype is <code>object</code>; <code>header=3</code> fixes that. Excel stores a date as the number of days since 1899-12-30, so <code>to_datetime</code> needs both <code>unit=\"D\"</code> and that <code>origin</code>: without the unit the number is read as nanoseconds (a day in 1970), and without the origin it is counted from 1970 (the year 2096). Neither raises an error, which is why you print the earliest and latest date: they must fall inside the period of the data (9 January to 5 May 2026).",
          ar: "تقرأ <code>read_excel</code> ما هو مخزَّن في الخانات. وبالإعدادات الافتراضية يصير العنوان سطر العناوين، ويكون في الجدول 43 صفًّا وكل الأنواع <code>object</code>؛ و<code>header=3</code> يصلح ذلك. يخزّن Excel التاريخ عدد الأيام منذ 1899-12-30، فتحتاج <code>to_datetime</code> كلًّا من <code>unit=\"D\"</code> وهذا الـ<code>origin</code>: دون الوحدة يُقرأ الرقم نانوثوانيَ (يوم في 1970)، ودون الأصل يُعدّ من 1970 (فتظهر سنة 2096). ولا شيء من ذلك يرفع خطأً، ولهذا تطبع أقدم تاريخ وأحدثه: فيجب أن يقعا داخل فترة البيانات (من 9 يناير إلى 5 مايو 2026)."
        }
      },
      {
        id: "t1ax16",
        type: "fill",
        level: "easy",
        topics: [
          "t1-csv-write-roundtrip"
        ],
        q: {
          en: "Fill in the three blanks so that <code>df</code> is saved in the safe form for a colleague who opens the file in Excel and reads Arabic, and so that the round trip is proved.",
          ar: "املأ الفراغات الثلاثة ليُحفظ <code>df</code> بالصيغة الآمنة لزميل يفتح الملف في Excel ويقرأ العربية، وليثبت الذهاب والعودة سلامة الملف."
        },
        code: code(
          "import pandas as pd",
          "",
          "df.to_csv(\"listings_out.csv\", ____1____=False, sep=\";\", decimal=\",\",",
          "          encoding=\"____2____\")",
          "back = pd.read_csv(\"listings_out.csv\", sep=\";\", decimal=\",\", encoding=\"utf-8-sig\",",
          "                   dtype={\"listing_id\": \"string\"}, parse_dates=[\"listed_on\"])",
          "pd.testing.____3____(df, back)       # silent when the round trip changed nothing"
        ),
        blanks: [
          {
            accept: [
              "index"
            ]
          },
          {
            accept: [
              "utf-8-sig",
              "utf_8_sig",
              "UTF-8-SIG",
              "utf-8-SIG"
            ]
          },
          {
            accept: [
              "assert_frame_equal"
            ],
            wide: true
          }
        ],
        hint: {
          en: "Three questions: what does <code>to_csv</code> add as a first, unnamed column? Which encoding writes the BOM that Excel looks for? Which function of <code>pd.testing</code> names the first difference?",
          ar: "ثلاثة أسئلة: ماذا تضيف <code>to_csv</code> عموده الأول بلا اسم؟ وأي ترميز يكتب BOM الذي يبحث عنه Excel؟ وأي دالة في <code>pd.testing</code> تسمّي أول فرق؟"
        },
        explain: {
          en: "With the default <code>index=True</code>, <code>to_csv</code> writes the row numbers as an unnamed first column, which comes back as <code>Unnamed: 0</code>, a meaningless column that a model may even use as a feature. <code>encoding=\"utf-8-sig\"</code> writes the three BOM bytes so that Excel recognises the Arabic. <code>assert_frame_equal</code> raises, naming the first difference in values, dtypes or column order, and does nothing when the two tables are identical; a plain <code>equals</code> would only say False. The reader must repeat what the file cannot carry (the ID as text, the date column), because a CSV stores no types.",
          ar: "بالقيمة الافتراضية <code>index=True</code> تكتب <code>to_csv</code> أرقام الصفوف عمودًا أول بلا اسم، يعود <code>Unnamed: 0</code>، وهو عمود لا معنى له وقد يستعمله النموذج سمةً. و<code>encoding=\"utf-8-sig\"</code> يكتب بايتات BOM الثلاثة ليتعرّف Excel على العربية. أما <code>assert_frame_equal</code> فترفع خطأً يسمّي أول فرق في القيم أو الأنواع أو ترتيب الأعمدة، ولا تفعل شيئًا إذا تطابق الجدولان؛ بينما <code>equals</code> العادية تقول False فقط. ويجب أن يكرّر القارئ ما لا يستطيع الملف حمله (المعرّف نصًّا وعمود التاريخ) لأن CSV لا يخزّن أنواعًا."
        }
      },
      {
        id: "t1ax17",
        type: "tf",
        level: "easy",
        topics: [
          "t1-safe-access",
          "t1-key-census"
        ],
        q: {
          en: "<code>dig</code> is the helper of the lesson: it follows a path through nested data and returns the default for anything it cannot follow. After a refactor, the line below prints 0 for the 13 schools of the registry, with no error. True or false: this output alone cannot tell you whether no school has an e-mail or whether the path in the call is wrong.",
          ar: "<code>dig</code> هي دالة المساعدة في الدرس: تتبع مسارًا داخل بيانات متداخلة وتعيد القيمة الافتراضية لكل ما لا تستطيع تتبعه. بعد إعادة هيكلة، يطبع السطر أدناه 0 لمدارس السجل الثلاث عشرة دون أي خطأ. صح أم خطأ: هذا الناتج وحده لا يستطيع أن يخبرك هل لا مدرسة لها بريد إلكتروني أم أن المسار في الاستدعاء خاطئ."
        },
        code: code(
          "n = sum(dig(s, \"contact\", \"email\") is not None for s in schools)",
          "print(n, \"of\", len(schools), \"schools have an email\")     # 0 of 13 schools have an email"
        ),
        truth: true,
        hint: {
          en: "What does <code>dig</code> return for a key that is not there? Compare the path with the keys you counted in the registry.",
          ar: "ماذا تعيد <code>dig</code> لمفتاح غير موجود؟ قارن المسار بالمفاتيح التي عددتها في السجل."
        },
        explain: {
          en: "True. <code>dig</code> returns the default for anything it cannot follow, so an absent key, an explicit null and a mistyped key all give <code>None</code>. The path says <code>contact</code> but the registry's key is <code>contacts</code>; with the right path the answer is 3 of 13. A helper that never raises never complains either, so a 0 or a suspiciously round number must be checked against a count you trust (the key census), or backed by an assertion that at least one record produced a value. For keys that must exist, the crash of <code>[]</code> is the better tool.",
          ar: "صحيح. تعيد <code>dig</code> القيمة الافتراضية لكل ما لا تستطيع تتبعه، فالمفتاح الغائب والقيمة null الصريحة والمفتاح المكتوب خطأً كلها تعطي <code>None</code>. المسار هنا يقول <code>contact</code> بينما مفتاح السجل <code>contacts</code>؛ وبالمسار الصحيح يكون الجواب 3 من 13. والدالة التي لا ترفع خطأً لا تشتكي أيضًا، فيجب فحص الصفر أو الرقم المستدير بشكل مريب مقابل عدّ تثق به (إحصاء المفاتيح)، أو تدعيمه بتأكيد أن سجلًا واحدًا على الأقل أنتج قيمة. أما المفاتيح التي يجب أن توجد فأنسب أداة لها <code>[]</code> لأنها تتعطل عند غيابها."
        }
      },
      {
        id: "t1ax18",
        type: "error",
        level: "medium",
        topics: [
          "t1-api-key-secrets",
          "t1-status-codes"
        ],
        q: {
          en: "The environment variable <code>REGISTRY_API_KEY</code> was never set on this computer. Python raises nothing, and the server answers <code>401</code> to every request with a message about a &ldquo;missing or wrong API key&rdquo;. Click the line that lets the missing variable pass unnoticed.",
          ar: "لم يُضبط متغير البيئة <code>REGISTRY_API_KEY</code> قط على هذا الحاسوب. لا يرفع Python شيئًا، ويجيب الخادم بالرمز <code>401</code> عن كل طلب برسالة عن «مفتاح واجهة مفقود أو خاطئ». انقر السطر الذي يترك المتغير المفقود يمرّ دون أن يلاحظه أحد."
        },
        code: code(
          "import os",
          "",
          "API_KEY = os.environ.get(\"REGISTRY_API_KEY\")",
          "headers = {\"Authorization\": f\"Bearer {API_KEY}\"}",
          "resp = get(\"https://api.example.org/schools\", headers=headers)",
          "print(resp.status_code)"
        ),
        answer: 3,
        solution: {
          code: "API_KEY = os.environ[\"REGISTRY_API_KEY\"]",
          en: "Square brackets stop the program on this line with <code>KeyError: 'REGISTRY_API_KEY'</code>, which names the missing variable.",
          ar: "الأقواس المربعة توقف البرنامج عند هذا السطر بـ<code>KeyError: 'REGISTRY_API_KEY'</code> التي تسمّي المتغير المفقود."
        },
        hint: {
          en: "Follow the text that ends up after the word <code>Bearer</code>: where does it come from, and what is it when the variable does not exist?",
          ar: "تتبّع النص الذي يأتي بعد كلمة <code>Bearer</code>: من أين يأتي؟ وما هو حين لا يوجد المتغير؟"
        },
        explain: {
          en: "<code>os.environ.get(...)</code> returns <code>None</code> for a variable that is not set, and the f-string happily builds the header <code>Bearer None</code>. The slip then surfaces far away, as a 401 from the server, and a 401 sends you hunting for a wrong key. With <code>os.environ[\"REGISTRY_API_KEY\"]</code> the program stops on the very line, naming the variable. It is the rule for required things again: use <code>[]</code> for what must exist, and keep the key itself out of the code. The tempting wrong clicks are lines 4 and 5, where the 401 appears to come from.",
          ar: "تعيد <code>os.environ.get(...)</code> القيمة <code>None</code> لمتغير غير مضبوط، وتبني سلسلة f الترويسة <code>Bearer None</code> دون اعتراض. ثم تظهر الزلّة بعيدًا عن سببها في صورة رمز 401 من الخادم، والـ401 يدفعك إلى البحث عن مفتاح خاطئ. أما مع <code>os.environ[\"REGISTRY_API_KEY\"]</code> فيتوقف البرنامج عند السطر نفسه ويسمّي المتغير. وهي قاعدة الأشياء الواجبة مرة أخرى: استعمل <code>[]</code> لما يجب أن يوجد، وأبقِ المفتاح نفسه خارج الكود. والنقرتان الخاطئتان المغريتان هما السطران 4 و5 حيث يبدو أن الـ401 جاء منهما."
        }
      },
      {
        id: "t1ax19",
        type: "complete",
        level: "medium",
        topics: [
          "t1-status-codes",
          "t1-rate-limit-backoff"
        ],
        q: {
          en: "<code>action</code> turns a status code into one of four words: <code>read</code> (2xx), <code>follow</code> (3xx), <code>retry</code> (<code>429</code> and every 5xx: wait and ask again) and <code>fix</code> (every other 4xx: asking again cannot help). Which block completes it?",
          ar: "تحوّل <code>action</code> رمز الحالة إلى إحدى أربع كلمات: <code>read</code> (‏2xx) و<code>follow</code> (‏3xx) و<code>retry</code> (‏<code>429</code> وكل 5xx: انتظر واسأل ثانية) و<code>fix</code> (كل 4xx غير ذلك: السؤال ثانية لا ينفع). أيّ كتلة تكمّلها؟"
        },
        code: code(
          "def action(status):",
          "    if status < 300:",
          "        return \"read\"",
          "    if status < 400:",
          "        return \"follow\"",
          "    ____",
          "    return \"fix\""
        ),
        options: [
          {
            code: code(
              "if status == 429 or status >= 500:",
              "    return \"retry\""
            )
          },
          {
            code: code(
              "if status >= 500:",
              "    return \"retry\""
            )
          },
          {
            code: code(
              "if status >= 400:",
              "    return \"retry\""
            )
          },
          {
            code: code(
              "if status == 429:",
              "    return \"retry\""
            )
          }
        ],
        answer: 0,
        solution: {
          code: code(
            "def action(status):",
            "    if status < 300:",
            "        return \"read\"",
            "    if status < 400:",
            "        return \"follow\"",
            "    if status == 429 or status >= 500:",
            "        return \"retry\"",
            "    return \"fix\""
          ),
          en: "429 is a 4xx that belongs with the retries, so it is named before the catch-all <code>return \"fix\"</code>.",
          ar: "الرمز 429 من فئة 4xx لكنه يخص إعادة المحاولة، فيُذكر قبل <code>return \"fix\"</code> الشاملة."
        },
        hint: {
          en: "Test each block on three codes: 401, 429 and 503. Which block sends every one of them where it belongs?",
          ar: "جرّب كل كتلة على ثلاثة رموز: 401 و429 و503. أي كتلة ترسل كلًّا منها إلى مكانه الصحيح؟"
        },
        explain: {
          en: "Only the transient failures are worth another try: <code>429</code> (you were too fast) and the 5xx family (the server is struggling). A 401, 403 or 404 will fail again unchanged, so it must go to <code>fix</code>. The second block sends 429 to <code>fix</code> (a script that gives up on the one error that asks for patience); the third retries 401 and 404 for nothing and hides the real error behind slow attempts; the fourth leaves 500 and 503 to <code>fix</code>. The first block is the lesson's retry set: 429 plus the 5xx, tested before the catch-all.",
          ar: "الإخفاقات العابرة وحدها تستحق محاولة أخرى: ‏<code>429</code> (كنتَ سريعًا) وعائلة 5xx (الخادم متعثّر). أما 401 و403 و404 فتفشل ثانية دون تغيير، فيجب أن تذهب إلى <code>fix</code>. الكتلة الثانية ترسل 429 إلى <code>fix</code> (سكربت يستسلم عند الخطأ الوحيد الذي يطلب الصبر)؛ والثالثة تعيد محاولة 401 و404 بلا فائدة وتخفي الخطأ الحقيقي خلف محاولات بطيئة؛ والرابعة تترك 500 و503 إلى <code>fix</code>. والكتلة الأولى هي مجموعة إعادة المحاولة في الدرس: ‏429 مع 5xx، تُختبر قبل الحالة الشاملة."
        }
      },
      {
        id: "t1ax20",
        type: "output",
        level: "medium",
        topics: [
          "t1-json-dumps",
          "t1-json-syntax"
        ],
        q: {
          en: "A record is written as JSON text and read back. Write exactly what the program prints (three lines).",
          ar: "يُكتب سجل نص JSON ثم يُقرأ من جديد. اكتب بالضبط ما يطبعه البرنامج (ثلاثة أسطر)."
        },
        code: code(
          "import json",
          "",
          "rec = {\"school\": \"Rafah\", \"grades\": (7, 8, 9), 2026: True, \"email\": None}",
          "back = json.loads(json.dumps(rec))",
          "print(back)",
          "print(back == rec)",
          "print(json.dumps(back[\"email\"]))"
        ),
        blanks: [
          {
            accept: [
              "{'school': 'Rafah', 'grades': [7, 8, 9], '2026': True, 'email': None}\nFalse\nnull",
              "{\"school\": \"Rafah\", \"grades\": [7, 8, 9], \"2026\": True, \"email\": None}\nFalse\nnull"
            ],
            lines: 3
          }
        ],
        hint: {
          en: "JSON has fewer types than Python. For each of the four entries ask what JSON can store, and what Python gets back.",
          ar: "لـJSON أنواع أقل من Python. اسأل عن كل مدخل من الأربعة: ماذا يستطيع JSON أن يخزّن، وماذا تستعيد Python؟"
        },
        explain: {
          en: "JSON has no tuples and no integer keys. The tuple <code>(7, 8, 9)</code> is written as an array and comes back as the list <code>[7, 8, 9]</code>, and the key <code>2026</code> comes back as the text <code>'2026'</code>, so <code>back == rec</code> is <code>False</code>: the round trip is not an identity, and nothing is raised. The value <code>None</code> is written as <code>null</code> in lower case. Treat JSON as a message format, not as a way to store Python objects.",
          ar: "لا توجد في JSON صفوف tuple ولا مفاتيح عددية صحيحة. الصف <code>(7, 8, 9)</code> يُكتب مصفوفة ويعود القائمة <code>[7, 8, 9]</code>، والمفتاح <code>2026</code> يعود النص <code>'2026'</code>، فتكون <code>back == rec</code> هي <code>False</code>: الذهاب والعودة ليسا تطابقًا، ولا شيء يُرفع. والقيمة <code>None</code> تُكتب <code>null</code> بحروف صغيرة. عامِل JSON على أنه صيغة رسائل، لا وسيلة لحفظ كائنات Python."
        }
      },
      {
        id: "t1ax21",
        type: "match",
        level: "easy",
        topics: [
          "t1-format-decision-table",
          "t1-format-decision-tree",
          "t1-format-roundtrip"
        ],
        q: {
          en: "Match each situation to the format or source that fits it best.",
          ar: "وصّل كل موقف بالصيغة أو المصدر الأنسب له."
        },
        pairs: [
          {
            l: {
              en: "Archive one final flat table that every tool can open and that version control can compare line by line",
              ar: "أرشفة جدول مسطّح نهائي واحد تفتحه كل الأدوات ويمكن لنظام إدارة الإصدارات مقارنته سطرًا سطرًا"
            },
            r: {
              en: "CSV (UTF-8, with a dated file name)",
              ar: "CSV (بترميز UTF-8 واسم ملف مؤرَّخ)"
            }
          },
          {
            l: {
              en: "Hand a colleague a small formatted workbook with two sheets and a chart that she will annotate",
              ar: "تسليم زميلة مصنَّفًا صغيرًا منسَّقًا فيه ورقتان ومخطط ستضيف عليه ملاحظاتها"
            },
            r: {
              en: "Excel workbook (.xlsx)",
              ar: "مصنَّف Excel ‏(.xlsx)"
            }
          },
          {
            l: {
              en: "Records with optional, nested fields that arrive from a web service",
              ar: "سجلات ذات حقول اختيارية متداخلة تصل من خدمة ويب"
            },
            r: {
              en: "JSON",
              ar: "JSON"
            }
          },
          {
            l: {
              en: "Reload tomorrow, in Python, a cleaned table whose string IDs, ordered categories and <code>Int64</code> gaps must come back unchanged",
              ar: "إعادة تحميل جدول منظَّف غدًا في Python، على أن تعود معرّفاته النصية وفئاته المرتّبة وفجوات <code>Int64</code> فيه كما كانت"
            },
            r: {
              en: "Parquet",
              ar: "Parquet (باركيه)"
            }
          },
          {
            l: {
              en: "Many people add rows all day, and the store must refuse a row without a date",
              ar: "أشخاص كثيرون يضيفون صفوفًا طوال اليوم، ويجب أن يرفض المخزن أي صف بلا تاريخ"
            },
            r: {
              en: "A database with constraints",
              ar: "قاعدة بيانات ذات قيود"
            }
          },
          {
            l: {
              en: "Figures must be fresh every morning, and you want to keep a dated copy of what you fetched",
              ar: "الأرقام يجب أن تكون طازجة كل صباح، وتريد الاحتفاظ بنسخة مؤرَّخة مما جلبته"
            },
            r: {
              en: "An API, saved as a dated snapshot",
              ar: "واجهة برمجية API مع حفظ لقطة مؤرَّخة"
            }
          }
        ],
        leftHead: {
          en: "Situation",
          ar: "الموقف"
        },
        rightHead: {
          en: "Best fit",
          ar: "الأنسب"
        },
        hint: {
          en: "For each situation ask who produces or reads the data, whether it is nested, whether it must be fresh, and what must survive.",
          ar: "اسأل في كل موقف: من ينتج البيانات أو يقرؤها؟ وهل هي متداخلة؟ وهل يجب أن تكون طازجة؟ وما الذي يجب أن يبقى سليمًا؟"
        },
        explain: {
          en: "Choose by who produces the data, how fresh it must be, whether it is nested, and what has to survive. CSV is the exchange and archive format: tiny, readable everywhere, diff-able, but it carries no types. Excel is for a human reader who wants sheets, formatting and charts. JSON carries nesting and optional fields. Parquet is the one that keeps dtypes, ordered categories and gaps, at the price of a binary file and an extra package. A database is the answer when many writers need constraints that refuse bad rows, and an API when freshness matters, together with a dated copy of what you fetched. No format validates anything: format is about fidelity, validation is about truth.",
          ar: "اختر حسب من ينتج البيانات، ومدى طزاجتها المطلوبة، وهل هي متداخلة، وما الذي يجب أن يبقى سليمًا. CSV صيغة التبادل والأرشفة: صغير ومقروء في كل مكان وتسهل مقارنته، لكنه لا يحمل أنواعًا. وExcel لقارئ بشري يريد أوراقًا وتنسيقًا ومخططات. وJSON يحمل التداخل والحقول الاختيارية. وParquet هو الذي يحفظ الأنواع والفئات المرتّبة والفجوات، بثمن ملف ثنائي وحزمة إضافية. وقاعدة البيانات هي الجواب حين يحتاج كتّاب كثيرون إلى قيود ترفض الصفوف المعيبة، والـAPI حين تهم الطزاجة، مع نسخة مؤرَّخة مما جُلب. ولا صيغة تتحقق من شيء: الصيغة شأن الأمانة في الحفظ، والتحقّق شأن الحقيقة."
        }
      },
      {
        id: "t1ax22",
        type: "ordercode",
        level: "medium",
        topics: [
          "t1-data-lineage",
          "t1-validate-function",
          "t1-loader-versions"
        ],
        q: {
          en: "<code>RECIPE</code>, <code>SCHEMA</code>, <code>validate</code> and <code>decide</code> are already defined. Put the statements in an order that reads the file once, validates the table that was read, writes a lineage record that describes exactly the bytes that were parsed (even for a run that is going to stop), and only then stops a bad file.",
          ar: "المتغيرات <code>RECIPE</code> و<code>SCHEMA</code> والدالتان <code>validate</code> و<code>decide</code> معرَّفة سلفًا. رتّب الأسطر ترتيبًا يقرأ الملف مرة واحدة، ويتحقق من الجدول الذي قُرئ، ويكتب سجل نسب يصف بالضبط البايتات التي حُلِّلت (حتى للتشغيل الذي سيتوقف)، ثم يوقف الملف المعيب بعد ذلك فقط."
        },
        items: [
          {
            code: "raw_bytes = Path(path).read_bytes()"
          },
          {
            code: "df = pd.read_csv(io.BytesIO(raw_bytes), **RECIPE)"
          },
          {
            code: "problems = validate(df, SCHEMA)"
          },
          {
            code: code(
              "lineage = {\"file\": path, \"rows\": len(df), \"decision\": decide(problems),",
              "           \"sha256\": hashlib.sha256(raw_bytes).hexdigest()[:12]}"
            )
          },
          {
            code: "Path(\"lineage_2026-05-10.json\").write_text(json.dumps(lineage, indent=2))"
          },
          {
            code: code(
              "if lineage[\"decision\"] == \"STOP\":",
              "    raise SystemExit(\"see lineage_2026-05-10.json\")"
            )
          }
        ],
        answer: [0, 1, 2, 3, 4, 5],
        hint: {
          en: "Each statement needs a name that an earlier one created. Ask what the record has to contain, and what you will want to find, a month from now, in the record of a run that stopped.",
          ar: "كل سطر يحتاج اسمًا أنشأه سطر سابق. اسأل ماذا يجب أن يحتوي السجل، وماذا ستريد أن تجده بعد شهر في سجل تشغيلٍ توقف."
        },
        explain: {
          en: "The bytes are read once and the table is parsed from those same bytes, so the fingerprint describes the data the table was built from; if the file were fingerprinted in one place and opened with <code>read_csv(path)</code> in another, a colleague overwriting it in between would make the record lie. The validation needs the table; the record needs the decision, the row count and the fingerprint, so it comes after <code>validate</code>. It is written before the stop, because the record of a run that stopped is exactly the evidence you will want when someone asks &ldquo;why does this chart differ from last week's?&rdquo;. The stop comes last: <code>validate</code> only reports, and what the report means for the job is policy that lives in the caller.",
          ar: "تُقرأ البايتات مرة واحدة ويُحلَّل الجدول من البايتات نفسها، فتصف البصمة البيانات التي بُني منها الجدول؛ ولو بُصِم الملف في موضع وفُتح بـ<code>read_csv(path)</code> في موضع آخر، فإن زميلًا يكتب فوقه بين الخطوتين يجعل السجل يكذب. يحتاج التحقق إلى الجدول؛ ويحتاج السجل إلى القرار وعدد الصفوف والبصمة، فيأتي بعد <code>validate</code>. ويُكتب قبل التوقف لأن سجل التشغيل الذي توقف هو بالضبط الدليل الذي ستريده حين يسأل أحدهم «لماذا يختلف هذا الرسم البياني عن رسم الأسبوع الماضي؟». ويأتي التوقف أخيرًا: فـ<code>validate</code> تُبلغ فقط، وما يعنيه التقرير للمهمة سياسة تعيش عند المستدعي."
        }
      },
      {
        id: "t1ax23",
        type: "compare",
        level: "hard",
        topics: [
          "t1-assert-first-failure",
          "t1-validate-function"
        ],
        q: {
          en: "A nightly job checks a school file that has three defects: school 302 appears twice, one enrolment is <code>-5</code>, and one level is spelled <code>Prep</code>. <code>LEVELS</code> lists the three allowed spellings. Which statement about the two versions is correct?",
          ar: "تفحص مهمة ليلية ملف مدارس فيه ثلاثة عيوب: المدرسة 302 تظهر مرتين، وأحد أعداد الطلبة <code>-5</code>، وأحد المستويات مكتوب <code>Prep</code>. وتسرد <code>LEVELS</code> التهجئات الثلاث المسموحة. أيّ العبارات عن النسختين صحيحة؟"
        },
        codeA: code(
          "assert df[\"school_id\"].is_unique, \"repeated school_id\"",
          "assert df[\"students\"].min() >= 0, \"negative enrolment\"",
          "assert df[\"level\"].isin(LEVELS).all(), \"level outside the allowed set\"",
          "print(\"file accepted\")"
        ),
        codeB: code(
          "problems = []",
          "if not df[\"school_id\"].is_unique:",
          "    problems.append(\"repeated school_id\")",
          "if df[\"students\"].min() < 0:",
          "    problems.append(\"negative enrolment\")",
          "if not df[\"level\"].isin(LEVELS).all():",
          "    problems.append(\"level outside the allowed set\")",
          "print(problems or \"file accepted\")"
        ),
        options: [
          {
            en: "Both detect all three defects: A reports them one run at a time and B all at once, so the choice is only a matter of style.",
            ar: "كلتاهما تكشف العيوب الثلاثة: أ تُبلغ بها واحدًا في كل تشغيل، وب كلها دفعة واحدة، فالاختيار مسألة أسلوب فقط."
          },
          {
            en: "A is better as a guard: it stops the job at the first defect, so the bad file can never be used, and <code>assert</code> is the safest tool for an external file.",
            ar: "أ أفضل حارسًا: توقف المهمة عند أول عيب فلا يمكن استعمال الملف المعيب أبدًا، و<code>assert</code> أأمن أداة لملف خارجي."
          },
          {
            en: "B is better: one run reports all three defects and the caller decides what to do with them; and B's checks survive <code>python -O</code>, which removes every <code>assert</code> and would let A accept this very file.",
            ar: "ب أفضل: تشغيل واحد يبلغ بالعيوب الثلاثة ويقرر المستدعي ما يفعله بها؛ وفحوص ب تصمد أمام <code>python -O</code> الذي يزيل كل <code>assert</code> فتقبل أ هذا الملف نفسه."
          },
          {
            en: "B is better only because it prints a list: if A used <code>raise ValueError</code> instead of <code>assert</code>, A would report all three defects as well.",
            ar: "ب أفضل لأنها تطبع قائمة فقط: لو استعملت أ <code>raise ValueError</code> بدل <code>assert</code> لأبلغت هي أيضًا بالعيوب الثلاثة."
          }
        ],
        answer: 2,
        hint: {
          en: "Run A in your head: how many defects does it name before it stops? Then ask what happens to an <code>assert</code> line when Python is started with <code>-O</code>.",
          ar: "شغّل أ في ذهنك: كم عيبًا تسمّي قبل أن تتوقف؟ ثم اسأل: ماذا يحدث لسطر <code>assert</code> حين يُشغَّل Python بالخيار <code>-O</code>؟"
        },
        explain: {
          en: "A stops at the first defect: it names the repeated id, and the negative enrolment and the misspelled level cost two more runs. Raising <code>ValueError</code> instead of asserting would not help (last option), because any exception ends the function at the first failure; what B changes is that it collects instead of stopping. Worse, Python removes every <code>assert</code> when it runs with <code>-O</code>: A then prints <code>file accepted</code> for this file with three defects, while B still prints all three. So assertions suit your own invariants in a notebook, and a guard for an external file should return the list of problems and leave the decision to the caller.",
          ar: "تتوقف أ عند أول عيب: تسمّي المعرّف المكرَّر، ويكلّف عدد الطلبة السالب والمستوى المكتوب خطأً تشغيلين آخرين. واستعمال <code>raise ValueError</code> بدل التأكيد لا يفيد (الخيار الأخير) لأن أي استثناء ينهي الدالة عند أول إخفاق؛ أما ما تغيّره ب فهو أنها تجمع بدل أن تتوقف. والأسوأ أن Python يزيل كل <code>assert</code> حين يعمل بالخيار <code>-O</code>: فتطبع أ <code>file accepted</code> لهذا الملف ذي العيوب الثلاثة، بينما تطبع ب العيوب الثلاثة كلها. فالتأكيدات تناسب ثوابتك أنت في دفتر، أما حارس الملف الخارجي فيجب أن يعيد قائمة المشكلات ويترك القرار للمستدعي."
        }
      },
      {
        id: "t1ax24",
        type: "mcq",
        level: "easy",
        topics: [
          "t1-quality-dimensions",
          "t1-quality-report"
        ],
        q: {
          en: "A cleaned rent table passes every check you wrote: nothing is blank, no row or id repeats, every value is valid and in range, the spellings agree, and the newest listing is from yesterday. A colleague writes in the report: &ldquo;the data is 100% accurate&rdquo;. Which reply is right?",
          ar: "جدول إيجارات منظَّف يجتاز كل فحص كتبتَه: لا خانة فارغة، ولا صف أو معرّف مكرَّر، وكل قيمة صالحة وضمن المدى، والكتابة متسقة، وأحدث إعلان من أمس. يكتب زميل في التقرير: «البيانات دقيقة بنسبة 100%». أيّ ردّ هو الصحيح؟"
        },
        options: [
          {
            en: "Correct: completeness, uniqueness, validity, consistency and timeliness together are what accuracy means.",
            ar: "صحيح: الاكتمال والتفرّد والصلاحية والاتساق والحداثة مجتمعةً هي معنى الدقة."
          },
          {
            en: "Not shown: accuracy asks whether the values match the real world, and a file cannot testify against itself. A rent of 315 can pass every check and still be wrong if the landlord charges 350, so you need a second source, such as a receipt, a site visit or last year's file.",
            ar: "غير مثبت: الدقة تسأل هل تطابق القيم الواقع، والملف لا يشهد على نفسه. فإيجار 315 يجتاز كل فحص ويبقى خاطئًا إن كان المالك يتقاضى 350، فتحتاج إلى مصدر ثانٍ كإيصال أو زيارة ميدانية أو ملف العام الماضي."
          },
          {
            en: "Not shown: the table has too few rows, and with a few thousand rows the five checks would be enough to prove accuracy.",
            ar: "غير مثبت: عدد صفوف الجدول قليل، ومع بضعة آلاف من الصفوف تكفي الفحوص الخمسة لإثبات الدقة."
          },
          {
            en: "Not shown, but <code>validate()</code> would settle it: add an <code>accuracy</code> rule to the schema and the validator will compute it.",
            ar: "غير مثبت، لكن <code>validate()</code> ستحسمه: أضف قاعدة <code>accuracy</code> إلى المخطط فتحسبها دالة التحقق."
          }
        ],
        answer: 1,
        hint: {
          en: "Look at what each of the five checks compares the values with. Is any of them a comparison with the real world?",
          ar: "انظر إلى ما يقارن به كل فحص من الخمسة القيم. هل في أحدها مقارنة بالواقع؟"
        },
        explain: {
          en: "The five dimensions all compare the table with itself or with a rule: is it filled, repeated, in range, consistent, recent. Accuracy compares it with the world, and no check inside the file can do that. A rent of 315 is complete, unique, valid, consistent and timely, and still wrong if the true rent is 350. More rows do not help, and a validator only enforces the rules you wrote; it cannot invent a second witness. Be suspicious of any report that scores a table &ldquo;100% quality&rdquo; from the table alone, and say which dimensions were actually checked.",
          ar: "الأبعاد الخمسة كلها تقارن الجدول بنفسه أو بقاعدة: هل هو ممتلئ، ومكرَّر، وضمن المدى، ومتسق، وحديث. أما الدقة فتقارنه بالعالم، ولا فحص داخل الملف يستطيع ذلك. إيجار 315 مكتمل وفريد وصالح ومتسق وحديث، ويبقى خاطئًا إن كان الإيجار الحقيقي 350. وزيادة الصفوف لا تفيد، والمدقّق لا ينفّذ إلا القواعد التي كتبتَها، ولا يخترع شاهدًا ثانيًا. كن شكّاكًا في أي تقرير يمنح الجدول «جودة 100%» من الجدول وحده، وقل أي الأبعاد فُحصت فعلًا."
        }
      }
    ]
  };
})();
