/* Practical Chapter 1 - Lesson test 3: Jupyter Notebooks Done Right.
   24 questions: p1l3q01 ... p1l3q24. Topics: assets/data/topics/p1-l3.js */
window.DABanks = window.DABanks || {};
(function () {
  /* code(line, line, ...) -> one string with \n between lines */
  function code() { return Array.prototype.join.call(arguments, "\n"); }

  window.DABanks["p1-test-03"] = {
    title: {
      en: "Test 3 — Jupyter Notebooks Done Right",
      ar: "اختبار 3 — دفاتر Jupyter كما يجب"
    },
    intro: {
      en: "24 questions on the whole lesson: what a notebook really is (cells, a kernel and a JSON file), command and edit mode, what a cell shows and what <code>%</code> and <code>!</code> do, the hidden-state trap and Restart &amp; Run All, notebook hygiene (header, settings, paths, secrets), a first analysis of the cafeteria orders and the dirty rows that change it, sharing a notebook, and when to move to a script. Allow about 40 minutes. Several questions read short notebooks and sessions that you can answer without running anything. The hint, the answer and the explanation stay hidden until you ask for them: try first, then open them. A revealed answer is not counted, and the Review links under each question lead back to the part of the lesson it tests.",
      ar: "24 سؤالًا على الدرس كله: ما الدفتر حقًّا (خلايا ونواة وملف JSON)، ووضعا الأوامر والتحرير، وما تعرضه الخلية وما يفعله <code>%</code> و<code>!</code>، وفخّ الحالة الخفية و<code>Restart &amp; Run All</code>، ونظافة الدفتر (الترويسة والإعدادات والمسارات والأسرار)، وأول تحليل لطلبات الكافتيريا والصفوف المتسخة التي تغيّره، ومشاركة الدفتر، ومتى تنتقل إلى سكربت. خصّص نحو 40 دقيقة. تقرأ عدة أسئلة دفاتر وجلسات قصيرة يمكنك الإجابة عنها دون تشغيل شيء. التلميح والجواب والشرح مخفية حتى تطلبها: جرّب أولًا ثم افتحها. والجواب الذي يُظهَر لا يُحتسب، وروابط المراجعة تحت كل سؤال تعيدك إلى الجزء من الدرس الذي يختبره."
    },
    questions: [

      /* ---------------------------------------------------------- 01 */
      {
        id: "p1l3q01", type: "tf", level: "easy",
        topics: ["p1-nb-stale-outputs", "p1-nb-anatomy"],
        q: {
          en: "A notebook cell prints <code>validation accuracy: 0.91</code>, and the notebook is saved and committed. A month later someone edits the feature-selection cell above it (a different set of columns), changes nothing else, runs no cell, and saves again. True or false: the <code>0.91</code> stored in the file is still a measurement of the code as it now reads.",
          ar: "تطبع خلية في دفتر <code>validation accuracy: 0.91</code> ثم يُحفظ الدفتر ويُودَع في المستودع. وبعد شهر يعدّل شخص خلية اختيار الخصائص التي فوقها (مجموعة أعمدة مختلفة)، ولا يغيّر شيئًا آخر، ولا يشغّل أي خلية، ثم يحفظ من جديد. صح أم خطأ: الرقم <code>0.91</code> المخزَّن في الملف ما زال قياسًا للشيفرة كما تُقرأ الآن."
        },
        truth: false,
        hint: {
          en: "Where does the text <code>0.91</code> live, and what would have to run to replace it?",
          ar: "أين يعيش النص <code>0.91</code>؟ وماذا يجب أن يُشغَّل ليحلّ محلّه؟"
        },
        explain: {
          en: "False. A saved output is text written into the <code>.ipynb</code> the last time that cell ran. Editing a cell above it changes the code in the file but not that text, and nothing re-runs the cells below an edit, so the page now shows new code next to an old photograph. A reviewer who trusts it reports a model nobody can rebuild. Rule to carry away: treat every stored output, above all a metric, as a claim, and quote it only after Restart &amp; Run All has produced it again.",
          ar: "خطأ. الناتج المحفوظ نصّ كُتب في ملف <code>.ipynb</code> آخر مرة شُغّلت فيها تلك الخلية. وتعديل خلية فوقه يغيّر الشيفرة في الملف ولا يغيّر ذلك النص، ولا شيء يعيد تشغيل الخلايا التي تحت التعديل، فتعرض الصفحة الآن شيفرة جديدة بجانب صورة فوتوغرافية قديمة. والمراجع الذي يصدّقها يُبلّغ عن نموذج لا يستطيع أحد إعادة بنائه. القاعدة: عامل كل ناتج محفوظ، وأولها أي مقياس، على أنه ادّعاء، ولا تقتبسه إلا بعد أن يعيد <code>Restart &amp; Run All</code> إنتاجه."
        }
      },

      /* ---------------------------------------------------------- 02 */
      {
        id: "p1l3q02", type: "mcq", level: "easy",
        topics: ["p1-nb-anatomy", "p1-nb-ipynb-json"],
        q: {
          en: "A saved notebook is a plain JSON text file. A teammate opens it with <code>json.load</code>, with no Jupyter and no kernel running. Which of these can she actually read in it?",
          ar: "الدفتر المحفوظ ملف نصي عادي بصيغة JSON. تفتحه زميلة بالدالة <code>json.load</code> دون Jupyter ودون أي نواة شغّالة. أيّ مما يلي تستطيع أن تقرأه فيه فعلًا؟"
        },
        options: [
          {
            en: "The 771 rows of <code>orders</code>, stored as a table that she can load and use at once",
            ar: "صفوف <code>orders</code> الـ 771، مخزَّنة كجدول تستطيع تحميله واستعماله فورًا"
          },
          {
            en: "The value of every variable the kernel held when you saved, so she can carry on where you stopped",
            ar: "قيمة كل متغيّر كانت النواة تحمله عند الحفظ، فتتابع من حيث توقفتَ"
          },
          {
            en: "The text of every cell and the saved outputs, such as <code>(771, 8)</code> as plain text",
            ar: "نص كل خلية والنواتج المحفوظة، مثل <code>(771, 8)</code> نصًّا عاديًّا"
          },
          {
            en: "Only the Markdown cells, because the code and the outputs stay inside the kernel and are never written to disk",
            ar: "خلايا Markdown فقط، لأن الشيفرة والنواتج تبقى داخل النواة ولا تُكتب على القرص أبدًا"
          }
        ],
        answer: 2,
        hint: {
          en: "Ask which things are written to disk when you press <code>Ctrl+S</code>, and which exist only while a kernel process is alive.",
          ar: "اسأل: ما الذي يُكتب على القرص حين تضغط <code>Ctrl+S</code>، وما الذي لا يوجد إلا ما دامت عملية النواة حيّة؟"
        },
        explain: {
          en: "The file holds the source text of every cell and, for code cells, the outputs with their execution counts, all as plain text; the <code>kernelspec</code> only names which kernel to start next time. Variables and DataFrames exist only in the kernel's memory, so the file contains neither <code>orders</code> nor its 771 rows (tempting if you picture a notebook as a saved session). The claim that only Markdown is saved swaps the roles: Markdown, code and outputs are all in the file. Whatever a cell prints is stored, so one small plot adds kilobytes and a printed secret is saved too.",
          ar: "يحمل الملف نص كل خلية، وفي خلايا الشيفرة النواتج مع عدّادات تنفيذها، كلها نصًّا عاديًّا؛ أما <code>kernelspec</code> فيسمّي فقط النواة التي ستبدأ في المرة القادمة. والمتغيّرات وجداول DataFrame لا توجد إلا في ذاكرة النواة، فلا يحتوي الملف المتغيّر <code>orders</code> ولا صفوفه الـ 771 (وهذا مغرٍ إن تخيّلتَ الدفتر جلسةً محفوظة). والقول إن خلايا Markdown وحدها تُحفظ يقلب الأدوار: خلايا Markdown والشيفرة والنواتج كلها في الملف. وكل ما تطبعه خلية يُخزَّن، ولذلك يزيد مخطط صغير واحد حجم الملف بآلاف البايتات ويُحفظ السر المطبوع أيضًا."
        }
      },

      /* ---------------------------------------------------------- 03 */
      {
        id: "p1l3q03", type: "match", level: "easy",
        topics: ["p1-nb-shortcuts", "p1-nb-kernel-menu"],
        q: {
          en: "Match each situation with the action that fits it.",
          ar: "وصّل كل موقف بالإجراء المناسب له."
        },
        leftHead: { en: "Situation", ar: "الموقف" },
        rightHead: { en: "Action", ar: "الإجراء" },
        pairs: [
          {
            l: {
              en: "A cell is stuck in an endless loop, and you want to keep every variable in memory.",
              ar: "خلية عالقة في حلقة لا تنتهي، وتريد أن تُبقي كل المتغيّرات في الذاكرة."
            },
            r: {
              en: "Interrupt (<code>I I</code>)",
              ar: "المقاطعة (Interrupt)، أي <code>I I</code>"
            }
          },
          {
            l: {
              en: "You installed a package that the kernel had already imported, and you want a clean kernel.",
              ar: "ثبّتَّ حزمة كانت النواة قد استوردتها، وتريد نواة نظيفة."
            },
            r: {
              en: "Restart (variables are lost, outputs stay on the page)",
              ar: "إعادة التشغيل (Restart): تضيع المتغيّرات وتبقى النواتج على الصفحة"
            }
          },
          {
            l: {
              en: "You are about to quote a number or share the file and want to know whether the notebook really works.",
              ar: "توشك أن تقتبس رقمًا أو تشارك الملف وتريد أن تعرف هل يعمل الدفتر فعلًا."
            },
            r: {
              en: "<code>Restart &amp; Run All</code>",
              ar: "<code>Restart &amp; Run All</code>"
            }
          },
          {
            l: {
              en: "You want to run this cell and have a new empty cell waiting right below it.",
              ar: "تريد تشغيل هذه الخلية وأن تنتظرك تحتها خلية فارغة جديدة."
            },
            r: { en: "<code>Alt+Enter</code>", ar: "<code>Alt+Enter</code>" }
          },
          {
            l: {
              en: "You pressed <code>d d</code> on the wrong cell.",
              ar: "ضغطتَ <code>d d</code> على الخلية الخطأ."
            },
            r: {
              en: "<code>Z</code> in command mode (undo the delete)",
              ar: "<code>Z</code> في وضع الأوامر (تراجع عن الحذف)"
            }
          },
          {
            l: {
              en: "You want to run this cell and stay on it, to tweak it and run it again.",
              ar: "تريد تشغيل هذه الخلية والبقاء عليها لتعدّلها وتعيد تشغيلها."
            },
            r: { en: "<code>Ctrl+Enter</code>", ar: "<code>Ctrl+Enter</code>" }
          }
        ],
        hint: {
          en: "For each situation ask first whether the variables must survive, then whether you need one cell run or the whole notebook run again.",
          ar: "لكل موقف اسأل أولًا: هل يجب أن تبقى المتغيّرات؟ ثم: هل تحتاج إلى تشغيل خلية واحدة أم إلى تشغيل الدفتر كله من جديد؟"
        },
        explain: {
          en: "Interrupt stops the running cell, but the kernel and all its variables survive (so a half-finished loop leaves half-finished variables behind). Restart kills the process: every variable is gone and every output stays on the page; after installing a package the kernel had already imported you restart, because a loaded module is not replaced in memory. Restart &amp; Run All restarts and then runs every code cell once, top to bottom, which is the only honest answer to 'does this notebook work?'. For single cells: Shift+Enter runs and moves on, Ctrl+Enter runs and stays, Alt+Enter runs and inserts a cell below; <code>d d</code> deletes a cell and <code>z</code> brings it back (the variables it defined stay in the kernel either way).",
          ar: "تقاطع المقاطعة الخلية الجارية لكن النواة وكل متغيّراتها تبقى (فالحلقة نصف المنتهية تترك متغيّرات نصف منتهية). وتقتل إعادة التشغيل العملية: تزول كل المتغيّرات وتبقى كل النواتج على الصفحة؛ وبعد تثبيت حزمة كانت النواة قد استوردتها تعيد التشغيل لأن الوحدة المحمَّلة لا تُستبدل في الذاكرة. أما <code>Restart &amp; Run All</code> فتعيد التشغيل ثم تنفّذ كل خلية شيفرة مرة واحدة من الأعلى إلى الأسفل، وهي الجواب الصادق الوحيد عن سؤال «هل يعمل هذا الدفتر؟». وللخلايا المفردة: <code>Shift+Enter</code> تشغّل وتنتقل، و<code>Ctrl+Enter</code> تشغّل وتبقى، و<code>Alt+Enter</code> تشغّل وتُدخل خلية تحتها؛ و<code>d d</code> تحذف الخلية و<code>z</code> تعيدها (والمتغيّرات التي عرّفتها تبقى في النواة في الحالتين)."
        }
      },

      /* ---------------------------------------------------------- 04 */
      {
        id: "p1l3q04", type: "contrast", level: "medium",
        topics: ["p1-nb-modes", "p1-nb-shortcuts"],
        q: {
          en: "Place each statement under command mode, under edit mode, or under both.",
          ar: "ضع كل عبارة تحت وضع الأوامر أو تحت وضع التحرير أو تحت كليهما."
        },
        concepts: [
          { en: "Command mode", ar: "وضع الأوامر" },
          { en: "Edit mode", ar: "وضع التحرير" }
        ],
        rows: [
          {
            s: {
              en: "A text cursor is inside the cell and your keys type characters",
              ar: "يوجد مؤشر نصّي داخل الخلية وتكتب مفاتيحك حروفًا"
            },
            a: 1
          },
          {
            s: {
              en: "Single-letter keys act on whole cells: pressing <code>m</code> turns the cell into Markdown",
              ar: "مفاتيح الحروف المفردة تعمل على الخلايا كلها: الضغط على <code>m</code> يحوّل الخلية إلى Markdown"
            },
            a: 0
          },
          {
            s: {
              en: "<code>Shift+Enter</code> runs the cell",
              ar: "<code>Shift+Enter</code> تشغّل الخلية"
            },
            a: 2
          },
          {
            s: {
              en: "<code>Tab</code> completes a name such as <code>orders.gr</code>",
              ar: "تكمل <code>Tab</code> اسمًا مثل <code>orders.gr</code>"
            },
            a: 1
          },
          {
            s: {
              en: "You get here from the other mode by pressing <code>Esc</code>",
              ar: "تصل إليه من الوضع الآخر بالضغط على <code>Esc</code>"
            },
            a: 0
          },
          {
            s: {
              en: "<code>Ctrl+S</code> saves the notebook",
              ar: "<code>Ctrl+S</code> تحفظ الدفتر"
            },
            a: 2
          },
          {
            s: {
              en: "Pressing <code>d</code> twice deletes the selected cell (and <code>z</code> undoes it)",
              ar: "الضغط على <code>d</code> مرتين يحذف الخلية المحدَّدة (و<code>z</code> تتراجع عن الحذف)"
            },
            a: 0
          }
        ],
        hint: {
          en: "Ask whether the keystroke needs a text cursor, or whether it still works while the cell is only selected.",
          ar: "اسأل: هل يحتاج الضغط إلى مؤشر نصّي، أم يعمل والخلية محدَّدة فقط؟"
        },
        explain: {
          en: "In edit mode the cell has a text cursor and keys type characters, which is why <code>Tab</code> can complete a name. In command mode the cell itself is selected and single letters are commands: <code>m</code>, <code>a</code>, <code>b</code>, <code>d d</code> act on cells. <code>Esc</code> leads from edit to command mode, <code>Enter</code> (or a click inside the cell) leads back. <code>Shift+Enter</code> and <code>Ctrl+S</code> work in both. The practical danger: type 'data' while in command mode and <code>d d</code> deletes the cell, so glance at the colour bar or at the status line (<code>Mode: Command</code> or <code>Mode: Edit</code>) before typing. Menu names and colours vary slightly by version.",
          ar: "في وضع التحرير يكون للخلية مؤشر نصّي وتكتب المفاتيح حروفًا، ولذلك تستطيع <code>Tab</code> أن تكمل اسمًا. وفي وضع الأوامر تكون الخلية نفسها محدَّدة وتصير الحروف المفردة أوامر: <code>m</code> و<code>a</code> و<code>b</code> و<code>d d</code> تعمل على الخلايا. تنقلك <code>Esc</code> من التحرير إلى الأوامر، وتعيدك <code>Enter</code> (أو النقر داخل الخلية). و<code>Shift+Enter</code> و<code>Ctrl+S</code> تعملان في الوضعين. والخطر العملي: اكتب «data» وأنت في وضع الأوامر فتحذف <code>d d</code> الخلية، فألقِ نظرة على الشريط الملوّن أو على سطر الحالة (<code>Mode: Command</code> أو <code>Mode: Edit</code>) قبل الكتابة. وتختلف أسماء القوائم والألوان قليلًا باختلاف الإصدار."
        }
      },

      /* ---------------------------------------------------------- 05 */
      {
        id: "p1l3q05", type: "output", level: "easy",
        topics: ["p1-nb-last-expression"],
        q: {
          en: "<code>orders</code> is the raw cafeteria table (771 lines; <code>qty</code> runs from -1 to 3) and NumPy is 2.2, as in the lesson. This cell is run. Write exactly what appears under it, line by line, and leave out the <code>Out[n]:</code> label.",
          ar: "الجدول <code>orders</code> هو جدول الكافتيريا الخام (771 سطرًا؛ و<code>qty</code> بين -1 و3) وإصدار NumPy هو 2.2 كما في الدرس. تُشغَّل هذه الخلية. اكتب بالضبط ما يظهر تحتها، سطرًا سطرًا، واترك التسمية <code>Out[n]:</code>."
        },
        code: code(
          'total_qty = orders["qty"].sum()',
          'print("lines:", len(orders))',
          'orders["qty"].max()',
          'orders["qty"].min()'
        ),
        blanks: [
          { accept: ["lines: 771\nnp.int64(-1)"], lines: 2 }
        ],
        hint: {
          en: "How many of the four lines put anything under the cell? And recall how NumPy 2 displays a single number that comes out of pandas.",
          ar: "كم سطرًا من الأربعة يضع شيئًا تحت الخلية؟ وتذكّر كيف تعرض NumPy 2 عددًا مفردًا يخرج من pandas."
        },
        explain: {
          en: "Four statements run, but only two things appear. <code>print</code> writes <code>lines: 771</code> while the cell executes. The first line is an assignment, which displays nothing. Of the two bare expressions only the last one, <code>orders[\"qty\"].min()</code>, is shown (as <code>Out[n]</code>); the <code>max()</code> (3) was computed and thrown away without a word. With NumPy 2 a single number from pandas is shown with its type, <code>np.int64(-1)</code>, where older NumPy showed just -1. To see more than one result use <code>display()</code> or <code>print()</code>, or split the cell.",
          ar: "تُنفَّذ أربع عبارات لكن لا يظهر إلا شيئان. تكتب <code>print</code> السطر <code>lines: 771</code> أثناء تنفيذ الخلية. والسطر الأول تعيين ولا يعرض شيئًا. ومن العبارتين المجرّدتين لا تُعرض إلا الأخيرة <code>orders[\"qty\"].min()</code> (بالوسم <code>Out[n]</code>)؛ أما <code>max()</code> (وقيمتها 3) فحُسبت وأُهملت دون كلمة. ومع NumPy 2 يُعرض العدد المفرد الخارج من pandas مع نوعه <code>np.int64(-1)</code> بينما كانت NumPy الأقدم تعرض -1 فقط. ولرؤية أكثر من نتيجة استعمل <code>display()</code> أو <code>print()</code> أو قسّم الخلية."
        }
      },

      /* ---------------------------------------------------------- 06 */
      {
        id: "p1l3q06", type: "fill", level: "easy",
        topics: ["p1-nb-pip-env", "p1-nb-magics"],
        q: {
          en: "Your kernel runs from the project's virtual environment. Fill in the two blanks: first print which Python the kernel is running, then install seaborn into that same Python.",
          ar: "تعمل نواتك من البيئة الافتراضية للمشروع. املأ الفراغين: اطبع أولًا أيّ بايثون تشغّله النواة، ثم ثبّت seaborn في بايثون نفسه."
        },
        code: code(
          "import sys",
          "print(sys.____1____)                 # the Python this kernel is running",
          "____2____ install seaborn            # install into that same Python"
        ),
        blanks: [
          { accept: ["executable"] },
          { accept: ["%pip"] }
        ],
        hint: {
          en: "One attribute of <code>sys</code> holds the full path of the running interpreter. And of the two prefixes <code>!</code> and <code>%</code>, only one is handled by IPython itself rather than by the operating-system shell.",
          ar: "هناك خاصية واحدة في <code>sys</code> تحمل المسار الكامل للمفسّر الجاري. ومن البادئتين <code>!</code> و<code>%</code> تتولى IPython نفسها إحداهما فقط، أما الأخرى فتذهب إلى صدفة نظام التشغيل."
        },
        explain: {
          en: "<code>sys.executable</code> is the path of the Python the kernel runs, so it answers 'which Python?'. <code>%pip</code> is a magic that IPython routes to that very Python. <code>!pip</code> is handed to the operating-system shell, which uses whichever <code>pip</code> comes first on its PATH: that may belong to another Python, so the install reports success and the kernel still cannot import the package, or imports a different version. After installing a package the kernel had already imported, restart the kernel.",
          ar: "الخاصية <code>sys.executable</code> هي مسار بايثون الذي تشغّله النواة، فتجيب عن سؤال «أيّ بايثون؟». أما <code>%pip</code> فسحر توجّهه IPython إلى بايثون نفسه. بينما يُسلَّم <code>!pip</code> إلى صدفة نظام التشغيل التي تستعمل أول <code>pip</code> تجده في PATH: وقد يتبع بايثون آخر، فيعلن التثبيت نجاحه وتظل النواة عاجزة عن استيراد الحزمة، أو تستورد إصدارًا مختلفًا. وبعد تثبيت حزمة كانت النواة قد استوردتها أعِد تشغيل النواة."
        }
      },

      /* ---------------------------------------------------------- 07 */
      {
        id: "p1l3q07", type: "multi", level: "medium",
        topics: ["p1-nb-magics", "p1-nb-pip-env"],
        q: {
          en: "Which of these statements about magic commands and shell escapes are true? (Choose all that apply.)",
          ar: "أيّ هذه العبارات عن الأوامر السحرية وأوامر الصدفة صحيحة؟ (اختر كل ما ينطبق.)"
        },
        options: [
          {
            en: "<code>%timeit expr</code> runs the expression once and reports the exact time of that single run.",
            ar: "<code>%timeit expr</code> تشغّل العبارة مرة واحدة وتعطي الزمن الدقيق لتلك المرة."
          },
          {
            en: "<code>%%time</code> must be the first line of its cell, and it reports the time of the whole cell, run once.",
            ar: "يجب أن تكون <code>%%time</code> أول سطر في خليتها، وتعطي زمن الخلية كلها مرة واحدة."
          },
          {
            en: "A script started with plain <code>python</code> can run a line such as <code>%pwd</code>, because magics are part of the Python language.",
            ar: "يستطيع سكربت يُشغَّل بـ <code>python</code> العادي تنفيذ سطر مثل <code>%pwd</code> لأن الأوامر السحرية جزء من لغة بايثون."
          },
          {
            en: "<code>!python --version</code> is handed to the operating-system shell, so it can report a different Python from the one the kernel runs.",
            ar: "يُسلَّم <code>!python --version</code> إلى صدفة نظام التشغيل، فقد يذكر بايثون غير الذي تشغّله النواة."
          },
          {
            en: "<code>%who</code> lists the variables the kernel currently holds.",
            ar: "<code>%who</code> تسرد المتغيّرات التي تحتفظ بها النواة الآن."
          },
          {
            en: "<code>!pip install x</code> and <code>%pip install x</code> always install into the same Python, since both start with <code>pip</code>.",
            ar: "<code>!pip install x</code> و<code>%pip install x</code> تثبّتان دائمًا في بايثون نفسه، لأن كلتيهما تبدأ بـ <code>pip</code>."
          }
        ],
        answer: [1, 3, 4],
        hint: {
          en: "For each line ask who executes it: Python itself, IPython, or the operating-system shell.",
          ar: "لكل سطر اسأل: من ينفّذه؟ بايثون نفسه أم IPython أم صدفة نظام التشغيل؟"
        },
        explain: {
          en: "A line magic (<code>%</code>) uses the rest of its line and a cell magic (<code>%%</code>) uses the whole cell, so <code>%%time</code> has to be first and times the cell once. <code>%who</code> lists what the kernel holds. A <code>!</code> line goes to the shell, which finds programs through its own PATH, so <code>!python</code> and <code>!pip</code> may belong to another Python than the kernel's, while <code>%pip</code> is routed to the kernel's own. The false ones: <code>%timeit</code> repeats a one-line expression many times and reports a mean and a spread; magics are a notebook convenience that plain <code>python</code> does not understand, which is why <code>nbconvert --to script</code> leaves <code>get_ipython()</code> calls behind; and <code>!pip</code> and <code>%pip</code> are exactly the pair that can disagree.",
          ar: "السحر السطري (<code>%</code>) يستعمل بقية سطره والسحر الخلوي (<code>%%</code>) يستعمل الخلية كلها، ولذلك يجب أن تكون <code>%%time</code> الأولى وتقيس الخلية مرة واحدة. وتسرد <code>%who</code> ما تحتفظ به النواة. والسطر الذي يبدأ بـ <code>!</code> يذهب إلى الصدفة التي تجد البرامج عبر PATH الخاص بها، فقد يتبع <code>!python</code> و<code>!pip</code> بايثون غير بايثون النواة، أما <code>%pip</code> فيُوجَّه إلى بايثون النواة نفسه. والعبارات الخاطئة: <code>%timeit</code> تكرّر عبارة من سطر واحد مرات كثيرة وتعطي متوسطًا وتشتتًا؛ والأوامر السحرية ميزة في الدفتر لا يفهمها بايثون العادي، ولذلك يترك <code>nbconvert --to script</code> استدعاءات <code>get_ipython()</code>؛ و<code>!pip</code> و<code>%pip</code> هما بالضبط الزوج الذي قد يختلف."
        }
      },

      /* ---------------------------------------------------------- 08 */
      {
        id: "p1l3q08", type: "trace", level: "medium",
        topics: ["p1-nb-hidden-state", "p1-nb-drift-ways", "p1-nb-shortcuts"],
        q: {
          en: "The menu lists Tea at 3.0. These three cells are on the page, but the kernel ran them in the order 1, 2, 3, 2, 3, because cell 2 was run again 'to be sure'. Answer for the moment after that last run. (Type just the number.)",
          ar: "تذكر القائمة أن سعر Tea هو 3.0. هذه الخلايا الثلاث على الصفحة، لكن النواة شغّلتها بالترتيب 1 ثم 2 ثم 3 ثم 2 ثم 3، لأن الخلية 2 أُعيد تشغيلها «للتأكد». أجب عن اللحظة التي تلي آخر تشغيل. (اكتب الرقم فقط.)"
        },
        code: code(
          "# %% cell 1",
          "import pandas as pd",
          'menu = pd.read_csv("data/raw/cafeteria_menu.csv")',
          "",
          "# %% cell 2",
          'menu["list_price"] *= 1.10          # a 10% price rise',
          "",
          "# %% cell 3",
          'round(menu.loc[menu["item"] == "Tea", "list_price"].iloc[0], 2)'
        ),
        blanks: [
          {
            accept: ["5"],
            label: {
              en: "The number in the <code>In [ ]</code> label beside cell 3",
              ar: "الرقم في العنوان <code>In [ ]</code> بجانب الخلية 3"
            }
          },
          {
            accept: ["3.63", "np.float64(3.63)"],
            label: {
              en: "The value cell 3 displays",
              ar: "القيمة التي تعرضها الخلية 3"
            }
          },
          {
            accept: ["3.3", "np.float64(3.3)"],
            label: {
              en: "The value cell 3 would display after Restart &amp; Run All",
              ar: "القيمة التي ستعرضها الخلية 3 بعد <code>Restart &amp; Run All</code>"
            }
          }
        ],
        hint: {
          en: "The execution counter counts every run of any cell, not positions on the page. And <code>*=</code> acts on whatever the table holds at that moment.",
          ar: "يعدّ عدّاد التنفيذ كل تشغيل لأي خلية، لا مواضعها في الصفحة. والعملية <code>*=</code> تعمل على ما يحمله الجدول في تلك اللحظة."
        },
        explain: {
          en: "The kernel's runs were numbered 1 (cell 1), 2 (cell 2), 3 (cell 3), 4 (cell 2 again) and 5 (cell 3 again), so cell 3 now carries <code>In [5]</code>; the page reads In [1], In [4], In [5] from top to bottom, and the jump from 1 to 4 is the clue that something ran that the page does not show. Cell 2 uses <code>*=</code>, which changes the table in place, so its second run raised an already raised price: 3.0 becomes 3.3, then 3.63. Restart &amp; Run All reads the file again and runs each cell once, so it shows 3.3. Read top to bottom, the page can only ever produce 3.3: 3.63 belongs to the kernel's history, not to the notebook.",
          ar: "رُقّمت تشغيلات النواة هكذا: 1 (الخلية 1)، 2 (الخلية 2)، 3 (الخلية 3)، 4 (الخلية 2 مرة ثانية)، 5 (الخلية 3 مرة ثانية)، فتحمل الخلية 3 الآن <code>In [5]</code>؛ وتقرأ الصفحة In [1] وIn [4] وIn [5] من الأعلى إلى الأسفل، والقفزة من 1 إلى 4 هي الدليل على أن شيئًا شُغّل ولا تعرضه الصفحة. وتستعمل الخلية 2 العملية <code>*=</code> التي تغيّر الجدول في مكانه، فرفع تشغيلها الثاني سعرًا مرفوعًا أصلًا: يصير 3.0 هو 3.3 ثم 3.63. أما <code>Restart &amp; Run All</code> فتقرأ الملف من جديد وتشغّل كل خلية مرة واحدة فتعرض 3.3. والصفحة مقروءة من الأعلى إلى الأسفل لا تنتج إلا 3.3: فالرقم 3.63 يخص تاريخ النواة لا الدفتر."
        }
      },

      /* ---------------------------------------------------------- 09 */
      {
        id: "p1l3q09", type: "error", level: "medium",
        topics: ["p1-nb-run-all", "p1-nb-drift-ways", "p1-nb-hidden-state"],
        q: {
          en: "On the author's kernel this notebook ran fine: <code>MAX_PRICE = 50</code> was defined last week in a cell that she has since deleted, and her kernel still remembers it. A classmate runs Restart &amp; Run All and the run stops with <code>NameError: name 'MAX_PRICE' is not defined</code>. Click the line where it stops.",
          ar: "كان هذا الدفتر يعمل جيدًا على نواة صاحبته: فقد عُرّف <code>MAX_PRICE = 50</code> الأسبوع الماضي في خلية حذفتها بعد ذلك، وما زالت نواتها تتذكره. يشغّل زميل <code>Restart &amp; Run All</code> فيتوقف التشغيل بالخطأ <code>NameError: name 'MAX_PRICE' is not defined</code>. انقر السطر الذي يتوقف عنده."
        },
        code: code(
          "# %% cell 1",
          "import pandas as pd",
          'orders = pd.read_csv("data/raw/cafeteria_orders.csv")',
          'orders["line_total"] = orders["qty"] * orders["unit_price"]',
          "",
          "# %% cell 2",
          'clean = orders[orders["unit_price"] < MAX_PRICE]',
          "",
          "# %% cell 3",
          'clean["line_total"].sum()'
        ),
        answer: 7,
        solution: {
          code: code(
            "# %% cell 1",
            "import pandas as pd",
            "MAX_PRICE = 50          # every name the page uses is defined on the page",
            'orders = pd.read_csv("data/raw/cafeteria_orders.csv")'
          ),
          en: "The repair is not in the line that fails: the missing definition goes into the settings cell at the top, so a fresh kernel meets it first.",
          ar: "الإصلاح ليس في السطر الذي يفشل: التعريف الناقص مكانه خلية الإعدادات في الأعلى، فتلقاه أي نواة جديدة أولًا."
        },
        hint: {
          en: "Restart &amp; Run All replays only the text on the page. Which name is used there but defined nowhere there?",
          ar: "يعيد <code>Restart &amp; Run All</code> تشغيل النص الموجود في الصفحة فقط. أيّ اسم يُستعمل فيها ولا يُعرَّف في أي موضع منها؟"
        },
        explain: {
          en: "Line 7 is where a fresh kernel meets a name that exists nowhere on the page. Deleting a cell edits the page, not the kernel's memory, so on the author's kernel <code>MAX_PRICE</code> kept working until somebody started a clean kernel: this is the Version 1 defect of the what-if notebook, 'works on my machine'. Lines 3 and 4 are fine (they only read the file and multiply two columns), and line 10 never gets to run. The fix is not in line 7 either: define <code>MAX_PRICE</code> in the first cell. Restart &amp; Run All is the one test that replays exactly what the page contains.",
          ar: "السطر 7 هو الموضع الذي تلقى فيه النواة الجديدة اسمًا غير موجود في أي مكان من الصفحة. وحذف خلية يعدّل الصفحة لا ذاكرة النواة، فظل <code>MAX_PRICE</code> يعمل على نواة صاحبة الدفتر إلى أن بدأ أحدهم نواة نظيفة: وهذا عيب النسخة 1 من دفتر السؤال الافتراضي، «تعمل على جهازي». والسطران 3 و4 سليمان (يقرآن الملف ويضربان عمودين فقط)، والسطر 10 لا يصل دوره. والإصلاح ليس في السطر 7 كذلك: عرّف <code>MAX_PRICE</code> في الخلية الأولى. و<code>Restart &amp; Run All</code> هو الاختبار الوحيد الذي يعيد تشغيل ما في الصفحة بالضبط."
        }
      },

      /* ---------------------------------------------------------- 10 */
      {
        id: "p1l3q10", type: "compare", level: "medium",
        topics: ["p1-nb-run-all", "p1-nb-hidden-state"],
        q: {
          en: "Both notebooks print <code>np.float64(8156.95)</code> after Restart &amp; Run All. Then someone presses Shift+Enter on cell 3 and cell 4 a couple of extra times. Which statement is correct?",
          ar: "يطبع الدفتران كلاهما <code>np.float64(8156.95)</code> بعد <code>Restart &amp; Run All</code>. ثم يضغط أحدهم <code>Shift+Enter</code> على الخلية 3 والخلية 4 مرتين إضافيتين. أيّ العبارات صحيحة؟"
        },
        codeA: code(
          "# %% cell 1",
          "import pandas as pd",
          "STAFF_OFF = 0.10",
          "",
          "# %% cell 2",
          'orders = pd.read_csv("data/raw/cafeteria_orders.csv")',
          'orders["line_total"] = orders["qty"] * orders["unit_price"]',
          "",
          "# %% cell 3",
          'orders.loc[orders["customer_type"] == "Staff", "line_total"] *= 1 - STAFF_OFF',
          "",
          "# %% cell 4",
          'orders["line_total"].sum()'
        ),
        codeB: code(
          "# %% cell 1",
          "import pandas as pd",
          "STAFF_OFF = 0.10",
          "",
          "# %% cell 2",
          'orders = pd.read_csv("data/raw/cafeteria_orders.csv")',
          'orders["line_total"] = orders["qty"] * orders["unit_price"]',
          "",
          "# %% cell 3",
          'is_staff = orders["customer_type"] == "Staff"',
          'orders["whatif_total"] = orders["line_total"] * (1 - STAFF_OFF * is_staff)',
          "",
          "# %% cell 4",
          'orders["whatif_total"].sum()'
        ),
        options: [
          {
            en: "B is better: cell 3 derives a new column from <code>line_total</code>, which no cell modifies, so the answer stays <code>np.float64(8156.95)</code> however often cells 3 and 4 are run; the cost is one extra column and the habit of adding instead of rewriting.",
            ar: "ب أفضل: تشتق الخلية 3 عمودًا جديدًا من <code>line_total</code> الذي لا تعدّله أي خلية، فيبقى الجواب <code>np.float64(8156.95)</code> مهما أعدتَ تشغيل الخليتين 3 و4؛ والكلفة عمود إضافي وعادة أن تضيف لا أن تعيد الكتابة."
          },
          {
            en: "A is better: it changes <code>line_total</code> once, so every later cell sees the discounted figure, and running cell 3 again does no harm because only the Staff rows are touched.",
            ar: "أ أفضل: تغيّر <code>line_total</code> مرة واحدة فتراه كل خلية لاحقة مخفَّضًا، ولا ضرر من إعادة تشغيلها لأن الخصم يمسّ صفوف الموظفين فقط."
          },
          {
            en: "They are equivalent: both pass Restart &amp; Run All and give the same number, so extra Shift+Enter presses cannot separate them and that test is the only one that matters.",
            ar: "هما متكافئتان: كلتاهما تنجح في <code>Restart &amp; Run All</code> وتعطي الرقم نفسه، فلا تفرّق بينهما ضغطات <code>Shift+Enter</code> الإضافية، وهذا الاختبار هو الوحيد المهم."
          },
          {
            en: "B is better, because A depends on a <code>STAFF_OFF</code> that was defined in a deleted cell and so stops with <code>NameError</code> after a restart.",
            ar: "ب أفضل، لأن أ تعتمد على <code>STAFF_OFF</code> عُرّف في خلية محذوفة، فتتوقف بالخطأ <code>NameError</code> بعد إعادة تشغيل النواة."
          }
        ],
        answer: 0,
        hint: {
          en: "Run cell 3 of each version a second time in your head. What does the table hold afterwards?",
          ar: "شغّل الخلية 3 من كل نسخة مرة ثانية في رأسك. ماذا يحمل الجدول بعدها؟"
        },
        explain: {
          en: "A is Version 2 of the what-if notebook: it already defines <code>STAFF_OFF</code> in cell 1, so it does not fail with NameError (that was Version 1's defect), and it passes Restart &amp; Run All, which is why that test cannot separate the two. What A leaves open is the <code>*=</code> in cell 3: it rewrites <code>line_total</code> in place, so every extra Shift+Enter discounts values that were already discounted, and the page shows 7997.605, then 7854.1945. B (Version 3) derives <code>whatif_total</code> from a column nobody modifies (a True counts as 1 and a False as 0, so Staff rows are multiplied by 0.9 and the others by 1.0), which makes cell 3 safe to re-run. A cell should add or name things, not quietly rewrite what an earlier cell made.",
          ar: "أ هي النسخة 2 من دفتر السؤال الافتراضي: تعرّف <code>STAFF_OFF</code> في الخلية 1 أصلًا فلا تفشل بالخطأ NameError (وكان ذلك عيب النسخة 1)، وتنجح في <code>Restart &amp; Run All</code>، ولهذا لا يستطيع هذا الاختبار أن يفرّق بينهما. وما تتركه أ مفتوحًا هو العملية <code>*=</code> في الخلية 3: فهي تعيد كتابة <code>line_total</code> في مكانه، فيخفّض كل <code>Shift+Enter</code> إضافي قيمًا خُفّضت أصلًا، وتعرض الصفحة 7997.605 ثم 7854.1945. أما ب (النسخة 3) فتشتق <code>whatif_total</code> من عمود لا يعدّله أحد (القيمة True تُحسب 1 وFalse تُحسب 0، فتُضرب صفوف الموظفين في 0.9 وغيرها في 1.0)، فتصير الخلية 3 آمنة لإعادة التشغيل. على الخلية أن تضيف أو تسمّي، لا أن تعيد بصمت كتابة ما صنعته خلية سابقة."
        }
      },

      /* ---------------------------------------------------------- 11 */
      {
        id: "p1l3q11", type: "compare", level: "medium",
        topics: ["p1-nb-paths", "p1-nb-header-config"],
        q: {
          en: "Both notebooks have dropped the author-only path <code>C:\\Users\\me\\Desktop\\cafeteria_orders.csv</code> (Version 1). A expects the CSV files next to the notebook, B expects them in <code>data/raw</code>. Which statement is correct?",
          ar: "تخلّص الدفتران كلاهما من المسار الخاص بصاحبه <code>C:\\Users\\me\\Desktop\\cafeteria_orders.csv</code> (النسخة 1). يتوقع أ أن تكون ملفات CSV بجانب الدفتر، ويتوقع ب أن تكون في <code>data/raw</code>. أيّ العبارات صحيحة؟"
        },
        codeA: code(
          "import pandas as pd",
          "",
          'orders = pd.read_csv("cafeteria_orders.csv")',
          'menu = pd.read_csv("cafeteria_menu.csv")'
        ),
        codeB: code(
          "from pathlib import Path",
          "import pandas as pd",
          "",
          'DATA = Path("data/raw")',
          'ORDERS = DATA / "cafeteria_orders.csv"',
          'MENU = DATA / "cafeteria_menu.csv"',
          'assert ORDERS.exists(), f"Put cafeteria_orders.csv in {DATA.resolve()}"',
          "",
          "orders = pd.read_csv(ORDERS)",
          "menu = pd.read_csv(MENU)"
        ),
        options: [
          {
            en: "A is better: it is shorter and adds no extra names, and a relative path is read from wherever the notebook is saved, so it is portable by itself.",
            ar: "أ أفضل: هي أقصر ولا تضيف أسماء زائدة، والمسار النسبي يُقرأ من حيث يُحفظ الدفتر، فهي قابلة للنقل بذاتها."
          },
          {
            en: "B is better because <code>Path(\"data/raw\")</code> is found from any folder, so the notebook runs no matter where Jupyter was started or the notebook is moved.",
            ar: "ب أفضل لأن <code>Path(\"data/raw\")</code> يُعثر عليه من أي مجلد، فيعمل الدفتر أينما بدأ Jupyter أو نُقل الدفتر."
          },
          {
            en: "They are equivalent: both avoid the author's computer, and a relative path is all that portability needs, so the constant and the assert only add lines.",
            ar: "هما متكافئتان: كلتاهما تتجنب جهاز صاحب الدفتر، والمسار النسبي هو كل ما تحتاجه قابلية النقل، فالثابت والتأكيد يضيفان أسطرًا فقط."
          },
          {
            en: "B is better: the location is one constant and a missing file stops the notebook with a message naming the folder to fill; B still needs the notebook to start from the project folder.",
            ar: "ب أفضل: الموقع ثابت واحد والملف الناقص يوقف الدفتر برسالة تسمّي المجلد الذي يجب ملؤه؛ ويظل ب يحتاج إلى أن يبدأ الدفتر من مجلد المشروع."
          }
        ],
        answer: 3,
        hint: {
          en: "Relative to what? Ask where a path such as <code>data/raw</code> starts, and what each version does when the file is missing.",
          ar: "نسبي إلى ماذا؟ اسأل من أين يبدأ مسار مثل <code>data/raw</code>، وماذا تفعل كل نسخة حين يغيب الملف."
        },
        explain: {
          en: "A (Version 2) removes the author's computer from the page, but a relative path is read from the kernel's working directory: move the notebook into a subfolder and you get <code>FileNotFoundError</code>, and every cell that repeats the string needs editing. B (Version 3) keeps the location in one constant built with <code>pathlib</code>, whose <code>/</code> joins parts correctly on Windows, macOS and Linux, and the assert turns a missing file into a message that says which folder to fill. It is not independent of the working directory: <code>Path(\"data/raw\")</code> is still relative, so the notebook has to be started from the project folder (check with <code>%pwd</code>). Relative paths are necessary for portability, not sufficient.",
          ar: "أ (النسخة 2) تُزيل جهاز صاحب الدفتر من الصفحة، لكن المسار النسبي يُقرأ من مجلد العمل للنواة: انقل الدفتر إلى مجلد فرعي فتحصل على <code>FileNotFoundError</code>، ويلزم تعديل كل خلية تكرّر السلسلة. أما ب (النسخة 3) فتُبقي الموقع في ثابت واحد مبنيّ بـ <code>pathlib</code> التي تضم علامة <code>/</code> فيها الأجزاء ضمًّا صحيحًا في Windows وmacOS وLinux، ويحوّل التأكيد (assert) الملف الناقص إلى رسالة تقول أي مجلد يجب ملؤه. وهي ليست مستقلة عن مجلد العمل: فـ <code>Path(\"data/raw\")</code> ما زال نسبيًّا، فيجب أن يبدأ الدفتر من مجلد المشروع (تحقق بـ <code>%pwd</code>). المسارات النسبية لازمة لقابلية النقل لكنها غير كافية."
        }
      },

      /* ---------------------------------------------------------- 12 */
      {
        id: "p1l3q12", type: "complete", level: "easy",
        topics: ["p1-nb-paths", "p1-nb-header-config"],
        q: {
          en: "The first version of this notebook read <code>pd.read_csv(\"C:\\\\Users\\\\me\\\\Desktop\\\\cafeteria_orders.csv\")</code> and failed on every other computer. Complete the settings cell so that the file's location is one named constant, built with <code>pathlib</code> from the project's data folder.",
          ar: "قرأت النسخة الأولى من هذا الدفتر <code>pd.read_csv(\"C:\\\\Users\\\\me\\\\Desktop\\\\cafeteria_orders.csv\")</code> وفشلت على كل جهاز آخر. أكمل خلية الإعدادات بحيث يكون موقع الملف ثابتًا واحدًا مسمّى، مبنيًّا بـ <code>pathlib</code> من مجلد بيانات المشروع."
        },
        code: code(
          "from pathlib import Path",
          "import pandas as pd",
          "",
          'DATA = Path("data/raw")',
          "ORDERS = ____",
          'assert ORDERS.exists(), f"Put cafeteria_orders.csv in {DATA.resolve()}"',
          "",
          "orders = pd.read_csv(ORDERS)"
        ),
        options: [
          { code: 'DATA + "cafeteria_orders.csv"' },
          { code: 'DATA / "cafeteria_orders.csv"' },
          { code: '"DATA/cafeteria_orders.csv"' },
          { code: 'DATA.join("cafeteria_orders.csv")' }
        ],
        answer: 1,
        solution: {
          code: 'ORDERS = DATA / "cafeteria_orders.csv"',
          en: "The <code>/</code> operator of a <code>Path</code> joins the parts, whichever operating system the notebook runs on.",
          ar: "يضم المعامل <code>/</code> في الكائن <code>Path</code> الأجزاء مهما كان نظام التشغيل الذي يعمل عليه الدفتر."
        },
        hint: {
          en: "Which operator does a <code>Path</code> object use to join one more part to itself? Check each option for what it would do to the very next line.",
          ar: "أيّ معامل يستعمله الكائن <code>Path</code> لضم جزء آخر إلى نفسه؟ وانظر ماذا سيفعل كل خيار بالسطر التالي له مباشرة."
        },
        explain: {
          en: "A <code>Path</code> joins parts with <code>/</code>, giving another <code>Path</code>, so <code>.exists()</code> in the next line works and the same code runs on Windows, macOS and Linux. <code>DATA + \"...\"</code> raises <code>TypeError</code>, because a Path and a string cannot be added. <code>\"DATA/cafeteria_orders.csv\"</code> is only a string that contains the letters DATA, not the variable, and a string has no <code>.exists()</code>. <code>Path</code> has no <code>join</code> method (the method is called <code>joinpath</code>), and the operator is the idiom to learn. Version 1's absolute path described the author's computer; this constant describes the project, and one line changes when the data moves.",
          ar: "يضم الكائن <code>Path</code> الأجزاء بالمعامل <code>/</code> فيعطي <code>Path</code> آخر، فتعمل <code>.exists()</code> في السطر التالي ويعمل الكود نفسه في Windows وmacOS وLinux. أما <code>DATA + \"...\"</code> فيرفع <code>TypeError</code> لأن Path ونصًّا لا يُجمعان. وأما <code>\"DATA/cafeteria_orders.csv\"</code> فنص يحوي الحروف DATA لا المتغيّر، وليس للنص <code>.exists()</code>. وليس في <code>Path</code> دالة <code>join</code> (اسم الدالة <code>joinpath</code>)، والمعامل هو الأسلوب الذي يجب تعلّمه. وكان المسار المطلق في النسخة 1 يصف جهاز صاحبه؛ أما هذا الثابت فيصف المشروع، ويتغير سطر واحد حين تنتقل البيانات."
        }
      },

      /* ---------------------------------------------------------- 13 */
      {
        id: "p1l3q13", type: "multi", level: "hard",
        topics: ["p1-nb-hygiene"],
        q: {
          en: "A cell sets <code>os.environ[\"API_KEY\"] = \"sk-demo-123456\"</code> and then prints the key 'to check it'. The notebook has already been committed to a shared repository. Which actions are right? (Choose all that apply.)",
          ar: "تضبط خلية <code>os.environ[\"API_KEY\"] = \"sk-demo-123456\"</code> ثم تطبع المفتاح «للتأكد منه». وقد أُودع الدفتر فعلًا في مستودع مشترك. أيّ الإجراءات صحيحة؟ (اختر كل ما ينطبق.)"
        },
        options: [
          {
            en: "Delete that cell and its output and save again: once the file is saved, the key can no longer be found anywhere.",
            ar: "احذف تلك الخلية وناتجها واحفظ من جديد: فبعد حفظ الملف لا يمكن العثور على المفتاح في أي مكان."
          },
          {
            en: "From now on read the key at run time with <code>os.environ.get(\"API_KEY\")</code> instead of typing it into a cell, and never print it.",
            ar: "اقرأ المفتاح من الآن فصاعدًا وقت التشغيل بـ <code>os.environ.get(\"API_KEY\")</code> بدل كتابته في خلية، ولا تطبعه أبدًا."
          },
          {
            en: "Run Restart &amp; Run All without touching the code: it replaces the stored outputs, so the printed key disappears.",
            ar: "شغّل <code>Restart &amp; Run All</code> دون المساس بالشيفرة: فهي تستبدل النواتج المخزَّنة فيختفي المفتاح المطبوع."
          },
          {
            en: "Rotate the key (issue a new one and retire the old), because copies of the earlier file have already been shared.",
            ar: "بدّل المفتاح (أصدر مفتاحًا جديدًا وأبطل القديم)، لأن نسخًا من الملف السابق قد شورِكت فعلًا."
          },
          {
            en: "Move the key into a Markdown cell: Markdown cells never run, so they cannot leak anything.",
            ar: "انقل المفتاح إلى خلية Markdown: فخلايا Markdown لا تُشغَّل أبدًا، فلا تسرّب شيئًا."
          },
          {
            en: "Before sharing a notebook that displayed personal data, such as <code>head()</code> of a table of students, clear all outputs and save: outputs are stored in the file.",
            ar: "قبل مشاركة دفتر عرض بيانات شخصية، مثل <code>head()</code> لجدول طلاب، امسح كل النواتج واحفظ: فالنواتج مخزَّنة في الملف."
          }
        ],
        answer: [1, 3, 5],
        hint: {
          en: "Two of these are about where the secret travels (the file, the outputs), one is about copies that already left your hands.",
          ar: "اثنان منها عن الطريق الذي يسلكه السر (الملف والنواتج)، وواحد عن نسخ غادرت يدك فعلًا."
        },
        explain: {
          en: "Outputs are saved in the file, and so is every cell's source text, which is why a printed key or a <code>head()</code> of student names travels with the notebook. Reading the key from the environment at run time keeps it out of the file, and clearing outputs (Edit &rarr; Clear Outputs of All Cells, then save) removes what was displayed. Because copies were already committed, deleting the cell does not recall them: rotate the key. Restart &amp; Run All would run the <code>print</code> again and store the key again, and a Markdown cell is still text in the file. Rule: nothing secret in a cell or in an output.",
          ar: "النواتج محفوظة في الملف، وكذلك نص مصدر كل خلية، ولهذا يسافر المفتاح المطبوع أو <code>head()</code> لأسماء طلاب مع الدفتر. وقراءة المفتاح من البيئة وقت التشغيل تُبقيه خارج الملف، ومسح النواتج (Edit ← Clear Outputs of All Cells ثم الحفظ) يزيل ما عُرض. ولأن نسخًا أُودعت فعلًا فإن حذف الخلية لا يستردّها: بدّل المفتاح. أما <code>Restart &amp; Run All</code> فتعيد تشغيل <code>print</code> وتخزّن المفتاح من جديد، وخلية Markdown نص في الملف أيضًا. القاعدة: لا شيء سرّي في خلية ولا في ناتج."
        }
      },

      /* ---------------------------------------------------------- 14 */
      {
        id: "p1l3q14", type: "output", level: "hard",
        topics: ["p1-nb-spelling-variants", "p1-nb-dirty-rows"],
        q: {
          en: "Write exactly what the program prints (three lines).",
          ar: "اكتب بالضبط ما يطبعه البرنامج (ثلاثة أسطر)."
        },
        code: code(
          "import pandas as pd",
          "",
          'items = pd.Series(["Latte", "Latte ", "latte", "Water 500ml"])',
          "print(items.nunique())",
          "",
          "clean = items.str.strip().str.title()",
          "print(clean.nunique())",
          "",
          'menu = ["Latte", "Water 500ml"]',
          "print(clean.isin(menu).sum())"
        ),
        blanks: [
          { accept: ["4\n2\n3"], lines: 3 }
        ],
        hint: {
          en: "Merging the variants is one thing; ending up with the menu's own spelling is another. Compare each label of <code>clean</code> with the menu list, letter by letter.",
          ar: "دمج الصيغ المتعددة شيء، والوصول إلى إملاء القائمة نفسه شيء آخر. قارن كل تسمية في <code>clean</code> بقائمة المنيو حرفًا حرفًا."
        },
        explain: {
          en: "Strings are compared character by character, so <code>'Latte'</code>, <code>'Latte '</code> (trailing space) and <code>'latte'</code> are three labels, and with <code>'Water 500ml'</code> there are 4. After <code>strip().title()</code> the three Lattes are one label, so 2. The trap is the last line: <code>.title()</code> capitalises the letter after a digit, so <code>'Water 500ml'</code> becomes <code>'Water 500Ml'</code>, which is still one item but no longer the menu's spelling; only the three Lattes match, giving 3, not 4. In the cafeteria notebook a later join to the menu would silently lose that item. Merging variants is one step, matching the menu's spelling is another.",
          ar: "تُقارن السلاسل حرفًا حرفًا، فـ <code>'Latte'</code> و<code>'Latte '</code> (بفراغ في الآخر) و<code>'latte'</code> ثلاث تسميات، ومع <code>'Water 500ml'</code> يصير العدد 4. وبعد <code>strip().title()</code> تصير القهوات الثلاث تسمية واحدة، فالعدد 2. والفخ في السطر الأخير: تكبّر <code>.title()</code> الحرف الذي يلي الرقم، فتصير <code>'Water 500ml'</code> هي <code>'Water 500Ml'</code>، وهي ما زالت صنفًا واحدًا لكنها لم تعد إملاء القائمة؛ فلا تطابق القائمةَ إلا الأصناف Latte الثلاثة، والناتج 3 لا 4. وفي دفتر الكافتيريا كان الربط اللاحق بالقائمة سيفقد هذا الصنف بصمت. دمج الصيغ خطوة، ومطابقة إملاء القائمة خطوة أخرى."
        }
      },

      /* ---------------------------------------------------------- 15 */
      {
        id: "p1l3q15", type: "mcq", level: "hard",
        topics: ["p1-nb-chart-hour", "p1-nb-dirty-rows"],
        q: {
          en: "The manager asks which hour is busiest and whether it is clear-cut. On the raw file (771 lines), which of these gives an answer you can defend?",
          ar: "يسأل المدير أي ساعة هي الأكثر ازدحامًا وهل الأمر حاسم. على الملف الخام (771 سطرًا)، أيّ هذه الأسطر يعطي جوابًا تستطيع الدفاع عنه؟"
        },
        code: 'orders["hour"] = pd.to_datetime(orders["order_time"]).dt.hour',
        options: [
          { code: 'orders.drop_duplicates().groupby("hour")["order_id"].nunique().idxmax()' },
          { code: 'orders.groupby("hour")["order_id"].nunique().sort_values(ascending=False).head(3)' },
          { code: 'orders.groupby("hour")["order_id"].count().idxmax()' },
          { code: 'orders.groupby("hour")["order_id"].nunique().idxmax()' }
        ],
        answer: 1,
        hint: {
          en: "Two things can go wrong: what the code counts (lines or orders) and whether it can show a tie. Work out what each line returns.",
          ar: "قد يخطئ شيئان: ما الذي يعدّه الكود (أسطرًا أم طلبات) وهل يستطيع إظهار التعادل. اعرف ماذا يعيد كل سطر."
        },
        explain: {
          en: "<code>count()</code> counts lines, and a busy order has several of them: it names 13:00 (155 lines against 149 at 12:00), but the question is about orders. <code>nunique()</code> counts distinct order ids, which is the right unit, and gives 119 for both 12:00 and 13:00; <code>idxmax()</code> returns the first maximum, 12, and does not mention that 13 has the same count. Dropping duplicate lines first changes nothing here, because duplicates share their order id, so the tie survives and is hidden again. Only the sorted counts put 12: 119, 13: 119, 11: 99 on the page. The tie breaks only after the refund order of 13:45 (13:00 falls to 118) and the typo order of 13:43 (117) are removed. Print the counts next to whatever <code>idxmax()</code> returns.",
          ar: "تعدّ <code>count()</code> الأسطر، وللطلب المزدحم عدة أسطر: فتسمّي 13:00 (155 سطرًا مقابل 149 عند 12:00)، لكن السؤال عن الطلبات. وتعدّ <code>nunique()</code> أرقام الطلبات المميزة وهي الوحدة الصحيحة، وتعطي 119 للساعتين 12:00 و13:00؛ وتعيد <code>idxmax()</code> أول قيمة عظمى أي 12 ولا تذكر أن 13 لها العدد نفسه. وإسقاط الأسطر المكررة أولًا لا يغيّر شيئًا هنا لأن المكررات تشترك في رقم الطلب، فيبقى التعادل ويختفي من جديد. والأعداد المرتبة وحدها تضع 12: 119 و13: 119 و11: 99 على الصفحة. ولا ينكسر التعادل إلا بعد إزالة طلب الاسترجاع في 13:45 (تهبط 13:00 إلى 118) وطلب الخطأ المطبعي في 13:43 (117). اطبع الأعداد بجانب ما تعيده <code>idxmax()</code>."
        }
      },

      /* ---------------------------------------------------------- 16 */
      {
        id: "p1l3q16", type: "compare", level: "hard",
        topics: ["p1-nb-three-shapes"],
        q: {
          en: "Both versions give the same top three items after Restart &amp; Run All. B has a Markdown header and a Setup cell above it (not shown) that imports pandas and defines <code>DATA</code>. Which statement is correct?",
          ar: "تعطي النسختان الأصناف الثلاثة الأولى نفسها بعد <code>Restart &amp; Run All</code>. وفوق ب خلية ترويسة Markdown وخلية إعداد (غير ظاهرتين) تستورد pandas وتعرّف <code>DATA</code>. أيّ العبارات صحيحة؟"
        },
        codeA: code(
          "import pandas as pd",
          'orders = pd.read_csv("data/raw/cafeteria_orders.csv")',
          'orders["item"] = orders["item"].str.strip().str.title()',
          'orders["line_total"] = orders["qty"] * orders["unit_price"]',
          "orders = orders.drop_duplicates()",
          'orders = orders[(orders["qty"] > 0) & (orders["unit_price"] < 50)]',
          'revenue = orders.groupby("item")["line_total"].sum().sort_values(ascending=False)',
          "print(revenue.head(3))"
        ),
        codeB: code(
          "# %% Load",
          'orders = pd.read_csv(DATA / "cafeteria_orders.csv")',
          'orders["item"] = orders["item"].str.strip().str.title()',
          'orders["line_total"] = orders["qty"] * orders["unit_price"]',
          "",
          "# %% Clean: duplicates, refunds, price typo, missing price",
          "orders = orders.drop_duplicates()",
          'orders = orders[(orders["qty"] > 0) & (orders["unit_price"] < 50)]',
          "",
          "# %% Revenue by item",
          'revenue = orders.groupby("item")["line_total"].sum().sort_values(ascending=False)',
          "revenue.head(3)"
        ),
        options: [
          {
            en: "B is better: one idea per cell lets you look at <code>orders</code> between steps, re-run only the last cell after a mistake, and read the cleaning rules under their own heading; its cells do share the names <code>orders</code> and <code>revenue</code>, so a cell can still depend quietly on another having run.",
            ar: "ب أفضل: فكرة واحدة لكل خلية تتيح لك النظر في <code>orders</code> بين الخطوات، وإعادة تشغيل الخلية الأخيرة وحدها بعد خطأ، وقراءة قواعد التنظيف تحت عنوانها؛ لكن خلاياها تتشارك الاسمين <code>orders</code> و<code>revenue</code>، فقد تعتمد خلية بصمت على تشغيل أخرى."
          },
          {
            en: "A is better: when one line fails you fix it and re-run just that line, whereas B forces you to re-run the whole notebook from the first cell, so A is faster to repair.",
            ar: "أ أفضل: حين يفشل سطر تصلحه وتعيد تشغيل ذلك السطر وحده، بينما يجبرك ب على إعادة تشغيل الدفتر كله من الخلية الأولى، فإصلاح أ أسرع."
          },
          {
            en: "B is better because splitting the code into cells makes pandas cache the cleaned table between cells, so later cells run faster and the file is read only once.",
            ar: "ب أفضل لأن تقسيم الكود إلى خلايا يجعل pandas تخزّن الجدول المنظَّف مؤقتًا بين الخلايا، فتعمل الخلايا اللاحقة أسرع ويُقرأ الملف مرة واحدة."
          },
          {
            en: "B fixes everything A had: once each step has its own cell and each cell runs once, B can no longer suffer from hidden state, so it does not need Restart &amp; Run All.",
            ar: "ب تصلح كل ما في أ: فحين تكون لكل خطوة خليتها وتُشغَّل كل خلية مرة، لا يمكن أن تعاني ب من الحالة الخفية، فلا تحتاج إلى <code>Restart &amp; Run All</code>."
          }
        ],
        answer: 0,
        hint: {
          en: "Name what a single cell cannot do when line 7 fails. Then ask what B shares between its cells that A does not have to.",
          ar: "سمِّ ما لا تستطيعه الخلية الواحدة حين يفشل السطر 7. ثم اسأل: ما الذي تتشاركه خلايا ب ولا تحتاج أ إلى مشاركته؟"
        },
        explain: {
          en: "A is Version 1, one giant cell: you see only the last print, you cannot look at the table between steps, a failure in a late line means re-running everything from the file, and there is nowhere to write why <code>unit_price &lt; 50</code>. So the claim that A is faster to repair has it backwards. B is Version 2: one idea per cell, a header, the path in a <code>DATA</code> setting, the cleaning rules named. Splitting does not make pandas faster. And it is not free of risk: the cells share global names, so hidden state (Concept 4) becomes possible, which the claim that B is immune denies. The next step, Version 3, wraps the order-sensitive steps in functions that take what they need and return a result, at the cost of more lines and less visible intermediate tables.",
          ar: "أ هي النسخة 1، خلية عملاقة واحدة: لا ترى إلا آخر ما يُطبع، ولا تستطيع النظر في الجدول بين الخطوات، وفشل سطر متأخر يعني إعادة كل شيء من الملف، ولا مكان لتكتب لماذا <code>unit_price &lt; 50</code>. فالقول إن إصلاح أ أسرع مقلوب. وب هي النسخة 2: فكرة لكل خلية، وترويسة، والمسار في إعداد <code>DATA</code>، وقواعد التنظيف مسمّاة. والتقسيم لا يجعل pandas أسرع. وليس بلا مخاطرة: فالخلايا تتشارك أسماء عامة، فتصبح الحالة الخفية (المفهوم 4) ممكنة، وهذا ما ينفيه القول إن ب محصّنة منها. والخطوة التالية، النسخة 3، تلفّ الخطوات الحساسة للترتيب في دوال تأخذ ما تحتاجه وتعيد نتيجة، على حساب أسطر أكثر وجداول وسيطة أقل ظهورًا."
        }
      },

      /* ---------------------------------------------------------- 17 */
      {
        id: "p1l3q17", type: "write", level: "hard",
        topics: ["p1-nb-three-shapes", "p1-nb-run-all"],
        q: {
          en: "In the what-if notebook the Staff discount is applied by a cell that rewrites <code>line_total</code> in place. Write a function <code>whatif_total(orders, staff_off)</code> that returns the total revenue if Staff lines got <code>staff_off</code> off (0.10 means 10%). <code>orders</code> already has a <code>line_total</code> column. The function must not change the table it receives, so calling it twice, or with different discounts, always gives a fresh and correct answer.",
          ar: "في دفتر السؤال الافتراضي يُطبَّق خصم الموظفين بخلية تعيد كتابة <code>line_total</code> في مكانه. اكتب دالة <code>whatif_total(orders, staff_off)</code> تعيد إجمالي الإيراد لو حصلت أسطر الموظفين (Staff) على خصم <code>staff_off</code> (القيمة 0.10 تعني 10%). الجدول <code>orders</code> فيه العمود <code>line_total</code> أصلًا. يجب ألا تغيّر الدالة الجدول الذي تستلمه، فيعطي استدعاؤها مرتين، أو بخصومات مختلفة، جوابًا جديدًا وصحيحًا دائمًا."
        },
        lang: "python",
        starter: code(
          "def whatif_total(orders, staff_off):",
          "    # your code here"
        ),
        lines: 8,
        checks: [
          {
            re: "def\\s+whatif_total\\s*\\(\\s*orders\\s*,\\s*staff_off\\s*\\)",
            label: {
              en: "Define <code>whatif_total(orders, staff_off)</code>",
              ar: "عرّف <code>whatif_total(orders, staff_off)</code>"
            }
          },
          {
            re: "return\\b",
            label: {
              en: "<code>return</code> the total instead of printing it or storing it in the table",
              ar: "أعِد الإجمالي بـ <code>return</code> بدل طباعته أو تخزينه في الجدول"
            }
          },
          {
            re: "[\"']Staff[\"']",
            label: {
              en: "Pick out the Staff lines (<code>customer_type</code> equal to <code>\"Staff\"</code>)",
              ar: "حدّد أسطر الموظفين (<code>customer_type</code> تساوي <code>\"Staff\"</code>)"
            }
          },
          {
            re: "(1\\s*-\\s*staff_off|staff_off\\s*\\*|\\*\\s*staff_off)",
            label: {
              en: "Use <code>staff_off</code>: Staff lines are multiplied by <code>1 - staff_off</code>",
              ar: "استعمل <code>staff_off</code>: تُضرب أسطر الموظفين في <code>1 - staff_off</code>"
            }
          },
          {
            re: "\\.sum\\s*\\(",
            label: {
              en: "Add the lines up with <code>.sum()</code>",
              ar: "اجمع الأسطر بـ <code>.sum()</code>"
            }
          }
        ],
        forbid: [
          {
            re: "^(?!.*\\.copy\\s*\\().*orders\\s*(\\.\\s*loc\\s*\\[.*?\\]|\\[[^\\]]*\\])\\s*[-+*/]?=(?!=)",
            label: {
              en: "Writing into the table you were given, such as <code>orders.loc[...] *= ...</code> or <code>orders[\"x\"] = ...</code>",
              ar: "الكتابة في الجدول الذي استلمته، مثل <code>orders.loc[...] *= ...</code> أو <code>orders[\"x\"] = ...</code>"
            }
          }
        ],
        solution: {
          code: code(
            "def whatif_total(orders, staff_off):",
            '    is_staff = orders["customer_type"] == "Staff"',
            '    return (orders["line_total"] * (1 - staff_off * is_staff)).sum()',
            "",
            "print(whatif_total(orders, 0.10))",
            "print(whatif_total(orders, 0.20))",
            "print(whatif_total(orders, 0.10))"
          ),
          out: "8156.95\n7979.9\n8156.95",
          en: "The function builds the Staff mask and derives the discounted amounts as a new Series; it never writes into <code>orders</code>, so the third call repeats the first answer exactly.",
          ar: "تبني الدالة قناع الموظفين وتشتق المبالغ المخفَّضة سلسلةً جديدة؛ ولا تكتب في <code>orders</code> أبدًا، فيكرّر الاستدعاء الثالث الجواب الأول تمامًا."
        },
        hint: {
          en: "Think of the Staff lines as a True/False mask, and of the discount as something that applies on those lines only. Whatever you do, the function must not write into <code>orders</code>.",
          ar: "فكّر في أسطر الموظفين على أنها قناع صح/خطأ، وفي الخصم على أنه يُطبَّق على تلك الأسطر وحدها. وأيًّا كان ما تفعله فيجب ألا تكتب الدالة في <code>orders</code>."
        },
        explain: {
          en: "This is Version 3's idea in function form. The in-place version (<code>orders.loc[mask, \"line_total\"] *= 1 - STAFF_OFF</code>) corrupts the table a little more with every run: 8156.95, then 7997.605, then 7854.1945. A function that takes what it needs and returns a result cannot depend on a stale variable: with 0.10 it gives 8156.95, with 0.20 it gives 7979.9 (the correct 20% what-if from a fresh kernel), and calling it again gives 8156.95 again. Multiplying by <code>(1 - staff_off * is_staff)</code> uses the fact that True counts as 1 and False as 0. The cost is a layer of indirection, and the intermediate shapes are no longer visible unless you print them.",
          ar: "هذه فكرة النسخة 3 بصيغة دالة. والصيغة التي تعمل في المكان (<code>orders.loc[mask, \"line_total\"] *= 1 - STAFF_OFF</code>) تُفسد الجدول أكثر مع كل تشغيل: 8156.95 ثم 7997.605 ثم 7854.1945. أما الدالة التي تأخذ ما تحتاجه وتعيد نتيجة فلا تستطيع الاعتماد على متغيّر قديم: بالقيمة 0.10 تعطي 8156.95، وبالقيمة 0.20 تعطي 7979.9 (وهو جواب الـ 20% الصحيح من نواة جديدة)، واستدعاؤها مرة أخرى يعيد 8156.95. والضرب في <code>(1 - staff_off * is_staff)</code> يستفيد من أن True تُحسب 1 وFalse تُحسب 0. والكلفة طبقة غير مباشرة، وأن الأشكال الوسيطة لم تعد مرئية ما لم تطبعها."
        }
      },

      /* ---------------------------------------------------------- 18 */
      {
        id: "p1l3q18", type: "ordercode", level: "easy",
        topics: ["p1-nb-header-config", "p1-nb-run-all"],
        q: {
          en: "Put the cells of this notebook (it finds the busiest hours on the raw file) in an order that survives Restart &amp; Run All.",
          ar: "رتّب خلايا هذا الدفتر (يجد الساعات الأكثر ازدحامًا في الملف الخام) بترتيب ينجو من <code>Restart &amp; Run All</code>."
        },
        items: [
          { code: "from pathlib import Path\nimport pandas as pd" },
          { code: 'DATA = Path("data/raw")' },
          { code: 'orders = pd.read_csv(DATA / "cafeteria_orders.csv")' },
          { code: 'orders["hour"] = pd.to_datetime(orders["order_time"]).dt.hour' },
          { code: 'per_hour = orders.groupby("hour")["order_id"].nunique()' },
          { code: "print(per_hour.sort_values(ascending=False).head(3))" }
        ],
        hint: {
          en: "Each cell may use only names created by cells above it. Which cell must come first so that every other cell has what it needs?",
          ar: "لا تستعمل أي خلية إلا أسماء أنشأتها خلايا فوقها. أيّ خلية يجب أن تأتي أولًا ليجد كل ما بعدها ما يحتاجه؟"
        },
        explain: {
          en: "Every cell needs a name that the cell above it created: the imports give <code>Path</code> and <code>pd</code>, which <code>DATA</code> and <code>read_csv</code> use; <code>orders</code> must exist before the <code>hour</code> column is added; <code>per_hour</code> is grouped from the table with its hour column; and the print uses <code>per_hour</code>. Put the settings and imports first and the chain reads like a recipe. A cell that was run early on the author's kernel but sits late on the page is the classic way to get a notebook that works for its author and fails Restart &amp; Run All with a <code>NameError</code>. The run prints 12: 119, 13: 119, 11: 99, a tie to look at, not just an answer.",
          ar: "تحتاج كل خلية إلى اسم أنشأته الخلية التي فوقها: تعطي الاستيرادات <code>Path</code> و<code>pd</code> اللذين يستعملهما <code>DATA</code> و<code>read_csv</code>؛ ويجب أن يوجد <code>orders</code> قبل إضافة العمود <code>hour</code>؛ ويُجمَّع <code>per_hour</code> من الجدول الذي فيه عمود الساعة؛ وتستعمل الطباعة <code>per_hour</code>. ضع الإعدادات والاستيرادات أولًا فتُقرأ السلسلة كوصفة. والخلية التي شُغّلت مبكرًا على نواة صاحبها وهي متأخرة في الصفحة هي الطريقة الكلاسيكية لدفتر يعمل عند صاحبه ويفشل في <code>Restart &amp; Run All</code> بالخطأ <code>NameError</code>. ويطبع التشغيل 12: 119 و13: 119 و11: 99، وهو تعادل يستحق النظر لا مجرد جواب."
        }
      },

      /* ---------------------------------------------------------- 19 */
      {
        id: "p1l3q19", type: "fill", level: "easy",
        topics: ["p1-nb-nbconvert"],
        q: {
          en: "The manager has no Python. Fill in the two blanks of one command that runs every cell of <code>report.ipynb</code> in a fresh kernel and then writes a web page she can open, so that the numbers on it were just recomputed.",
          ar: "ليس عند المديرة بايثون. املأ فراغَي أمر واحد يشغّل كل خلايا <code>report.ipynb</code> في نواة جديدة ثم يكتب صفحة ويب تستطيع فتحها، بحيث تكون الأرقام فيها قد حُسبت للتو."
        },
        code: "jupyter nbconvert --to ____1____ ____2____ report.ipynb",
        blanks: [
          { accept: ["html"] },
          { accept: ["--execute"] }
        ],
        hint: {
          en: "One flag runs the notebook first (it is Restart &amp; Run All from the command line); one target format needs nothing but a browser.",
          ar: "راية واحدة تشغّل الدفتر أولًا (وهي <code>Restart &amp; Run All</code> من سطر الأوامر)؛ وصيغة هدف واحدة لا تحتاج إلا إلى متصفح."
        },
        explain: {
          en: "<code>--to html</code> writes a web page that opens offline for people without Python. <code>--execute</code> first runs every cell from a fresh kernel and stops at the first error. Without it nbconvert converts what is stored in the file, so after an edit the report holds the new code next to the old numbers: the photograph problem, now mailed to your manager. <code>--to script</code> would give a <code>.py</code> with the code only, and <code>--clear-output</code> would remove the numbers altogether. Remember that the HTML copies every stored output, so even a three-cell notebook can become a few hundred kilobytes.",
          ar: "يكتب <code>--to html</code> صفحة ويب تُفتح دون اتصال لأناس بلا بايثون. ويشغّل <code>--execute</code> أولًا كل خلية من نواة جديدة ويتوقف عند أول خطأ. وبدونه يحوّل nbconvert ما هو مخزَّن في الملف، فبعد تعديل يحمل التقرير الشيفرة الجديدة بجانب الأرقام القديمة: مشكلة الصورة الفوتوغرافية وقد أُرسلت إلى مديرك. أما <code>--to script</code> فيعطي ملف <code>.py</code> فيه الشيفرة وحدها، و<code>--clear-output</code> يزيل الأرقام كلها. وتذكّر أن ملف HTML ينسخ كل ناتج مخزَّن، فقد يبلغ حتى دفتر من ثلاث خلايا بضع مئات من الكيلوبايتات."
        }
      },

      /* ---------------------------------------------------------- 20 */
      {
        id: "p1l3q20", type: "mcq", level: "medium",
        topics: ["p1-nb-diffs"],
        q: {
          en: "Three people edit the same notebook, and their pull requests are full of changed <code>execution_count</code> numbers and pages of base64 image text. Which statement about the remedies is correct?",
          ar: "يحرّر ثلاثة أشخاص الدفتر نفسه، وطلبات الدمج عندهم مليئة بأرقام <code>execution_count</code> المتغيرة وصفحات من نص الصور بترميز base64. أيّ العبارات عن العلاجات صحيحة؟"
        },
        options: [
          {
            en: "<code>nbstripout</code> converts the notebook into a script when you commit, which is why the diffs become clean and the repository stops carrying outputs.",
            ar: "يحوّل <code>nbstripout</code> الدفتر إلى سكربت عند الإيداع، ولهذا تصير الفروق نظيفة ويكف المستودع عن حمل النواتج."
          },
          {
            en: "Git can be told to ignore just the <code>outputs</code> field of every notebook with one line in <code>.gitignore</code>, leaving the cells and the code in the repository.",
            ar: "يمكن إخبار Git بتجاهل الحقل <code>outputs</code> وحده في كل دفتر بسطر في <code>.gitignore</code>، مع إبقاء الخلايا والشيفرة في المستودع."
          },
          {
            en: "<code>nbdime</code> removes the outputs and the counters when you commit, so the repository only ever holds code, which is why its diffs are clean.",
            ar: "يزيل <code>nbdime</code> النواتج والعدّادات عند الإيداع، فلا يحمل المستودع إلا الشيفرة، ولهذا فروقه نظيفة."
          },
          {
            en: "<code>jupytext</code> keeps a plain-text <code>.py</code> twin that the team commits, so reviews show only code changes; the cost is a convention to keep the pair in sync, and the outputs are not in the <code>.py</code>.",
            ar: "يحتفظ <code>jupytext</code> بتوأم نصّي <code>.py</code> يودعه الفريق، فتُظهر المراجعات تغييرات الشيفرة فقط؛ والكلفة اصطلاح لإبقاء الزوج متزامنًا، والنواتج ليست في ملف <code>.py</code>."
          }
        ],
        answer: 3,
        hint: {
          en: "Sort the tools by what they do: remove (outputs), pair (with a text file), or compare (as notebooks). Which description fits which tool?",
          ar: "رتّب الأدوات بحسب ما تفعله: تزيل (النواتج) أو تقرن (بملف نصي) أو تقارن (كدفاتر). أيّ وصف يناسب أيّ أداة؟"
        },
        explain: {
          en: "Counters and outputs change on every run, even with no edit (the lesson's diff shows <code>execution_count</code> 1 become 3 after a second Run All). <code>jupytext</code> pairs the notebook with a percent-format <code>.py</code> that the team commits: clean code-only diffs, at the price of keeping the pair in sync and losing outputs in the text file. <code>nbstripout</code> is a Git filter that strips outputs and counters at commit time and leaves the cells, sources and kernel name; it does not make a script, and the repository then no longer shows results. <code>nbdime</code> diffs and merges notebooks as notebooks (cells, not JSON lines) and removes nothing. <code>.gitignore</code> works on whole files, not on a field inside one. For a one-person project, committing the notebook after Restart &amp; Run All is perfectly reasonable.",
          ar: "تتغير العدّادات والنواتج مع كل تشغيل حتى دون تعديل (يُظهر فرق الدرس <code>execution_count</code> وقد صار 1 هو 3 بعد تشغيل ثانٍ للكل). يقرن <code>jupytext</code> الدفتر بملف <code>.py</code> بصيغة percent يودعه الفريق: فروق نظيفة للشيفرة وحدها، بثمن إبقاء الزوج متزامنًا وغياب النواتج عن الملف النصي. و<code>nbstripout</code> مرشّح في Git يزيل النواتج والعدّادات عند الإيداع ويترك الخلايا والمصدر واسم النواة؛ ولا يصنع سكربتًا، ولا يعود المستودع يُظهر النتائج. أما <code>nbdime</code> فيقارن الدفاتر ويدمجها كدفاتر (خلايا لا أسطر JSON) ولا يزيل شيئًا. و<code>.gitignore</code> يعمل على ملفات كاملة لا على حقل داخل ملف. وفي مشروع الشخص الواحد يكفي إيداع الدفتر بعد <code>Restart &amp; Run All</code>."
        }
      },

      /* ---------------------------------------------------------- 21 */
      {
        id: "p1l3q21", type: "mcq", level: "medium",
        topics: ["p1-nb-tools-compared", "p1-nb-paths"],
        q: {
          en: "On Monday you uploaded <code>cafeteria_orders.csv</code> to Google Colab and the notebook ran perfectly. On Tuesday, with the notebook unchanged, Restart &amp; Run All stops at the <code>read_csv</code> cell with <code>FileNotFoundError</code>. What happened, and what is the fix?",
          ar: "رفعتَ يوم الاثنين الملف <code>cafeteria_orders.csv</code> إلى Google Colab وعمل الدفتر على ما يرام. ويوم الثلاثاء، والدفتر بلا تغيير، يتوقف <code>Restart &amp; Run All</code> عند خلية <code>read_csv</code> بالخطأ <code>FileNotFoundError</code>. ماذا حدث، وما الإصلاح؟"
        },
        options: [
          {
            en: "The <code>.ipynb</code> keeps a copy of every file it reads, but Colab dropped that copy overnight; saving the notebook again brings the data back with it.",
            ar: "يحتفظ ملف <code>.ipynb</code> بنسخة من كل ملف يقرؤه، لكن Colab أسقطت تلك النسخة في الليل؛ وحفظ الدفتر من جديد يعيد البيانات معه."
          },
          {
            en: "Colab's preinstalled pandas changed overnight and <code>read_csv</code> now looks in another folder; pin the version with <code>%pip install pandas==2.2.3</code> and run again.",
            ar: "تغيّر pandas المثبّتة مسبقًا في Colab في الليل وصارت <code>read_csv</code> تبحث في مجلد آخر؛ ثبّت الإصدار بـ <code>%pip install pandas==2.2.3</code> وشغّل من جديد."
          },
          {
            en: "Colab keeps your files on a temporary disk of its virtual machine; the runtime was recycled and took the upload with it. Mount Google Drive, or let the notebook download the file in its first cells.",
            ar: "تحتفظ Colab بملفاتك على قرص مؤقت في آلتها الافتراضية؛ وأُعيد تدوير بيئة التشغيل فذهب الملف المرفوع معها. اربط Google Drive، أو دع الدفتر ينزّل الملف في خلاياه الأولى."
          },
          {
            en: "Colab accepts only absolute paths from the second day on, so replace the relative path with a full one such as <code>C:\\Users\\me\\Desktop\\...</code> and run again.",
            ar: "لا تقبل Colab إلا المسارات المطلقة من اليوم الثاني، فاستبدل المسار النسبي بمسار كامل مثل <code>C:\\Users\\me\\Desktop\\...</code> وشغّل من جديد."
          }
        ],
        answer: 2,
        hint: {
          en: "Ask where the uploaded file physically lives, what a Colab session is, and what the <code>.ipynb</code> file contains (and does not contain).",
          ar: "اسأل: أين يقيم الملف المرفوع فعليًّا، وما جلسة Colab، وماذا يحتوي ملف <code>.ipynb</code> (وما الذي لا يحتويه)."
        },
        explain: {
          en: "In Colab the kernel runs on a virtual machine in Google's cloud, and the files you upload sit on that session's temporary disk, which disappears when the runtime is recycled. So the notebook fails the next day unless it mounts Google Drive or downloads its data itself. The idea that the <code>.ipynb</code> keeps a copy of the files it read is the Concept 1 misconception: it holds code and outputs, never the data files. A version difference would change numbers or behaviour, not make a file vanish. An absolute path from your own Windows desktop would be worse still (Version 1 of the paths example). It is the same notebook with a different environment: a package version, a working directory and a missing file are the usual surprises, which is why the header prints versions and the settings cell checks the data folder.",
          ar: "في Colab تعمل النواة على آلة افتراضية في سحابة Google، وتقيم الملفات التي ترفعها على القرص المؤقت لتلك الجلسة، وهو يختفي حين تُعاد تدوير بيئة التشغيل. فيفشل الدفتر في اليوم التالي ما لم يربط Google Drive أو ينزّل بياناته بنفسه. والقول إن ملف <code>.ipynb</code> يحتفظ بنسخة من الملفات التي قرأها هو مغالطة المفهوم 1: فهو يحمل الشيفرة والنواتج ولا يحمل ملفات البيانات. واختلاف الإصدار يغيّر أرقامًا أو سلوكًا ولا يجعل ملفًا يختفي. ومسار مطلق من سطح مكتب Windows عندك أسوأ (النسخة 1 من مثال المسارات). هو الدفتر نفسه في بيئة مختلفة: إصدار حزمة ومجلد عمل وملف ناقص هي المفاجآت المعتادة، ولذلك تطبع الترويسة الإصدارات وتفحص خلية الإعدادات مجلد البيانات."
        }
      },

      /* ---------------------------------------------------------- 22 */
      {
        id: "p1l3q22", type: "multi", level: "medium",
        topics: ["p1-nb-when-script"],
        q: {
          en: "Which of these are good reasons to move the analysis from the notebook into a script (functions in a module plus a <code>main</code>)? (Choose all that apply.)",
          ar: "أيّ هذه أسباب وجيهة لنقل التحليل من الدفتر إلى سكربت (دوال في وحدة مع دالة <code>main</code>)؟ (اختر كل ما ينطبق.)"
        },
        options: [
          {
            en: "You are exploring a new export and want to look at a table or a plot after every step.",
            ar: "تستكشف تصديرًا جديدًا وتريد أن تنظر إلى جدول أو مخطط بعد كل خطوة."
          },
          {
            en: "The revenue chart must be produced every Monday at 08:00 on a server where nobody is logged in.",
            ar: "يجب إنتاج مخطط الإيراد كل اثنين الساعة 08:00 على خادم لا يسجّل أحد دخوله إليه."
          },
          {
            en: "The notebook has grown past 50 cells.",
            ar: "تجاوز الدفتر 50 خلية."
          },
          {
            en: "A test file, or another notebook, needs to import <code>load_orders</code>.",
            ar: "يحتاج ملف اختبار، أو دفتر آخر، إلى استيراد <code>load_orders</code>."
          },
          {
            en: "A one-off report for one reader who will read it once.",
            ar: "تقرير لمرة واحدة لقارئ واحد سيقرؤه مرة واحدة."
          },
          {
            en: "The month and the input path should come from outside, so the same code can run on October's file.",
            ar: "يجب أن يأتي الشهر ومسار الإدخال من الخارج، ليعمل الكود نفسه على ملف تشرين الأول."
          }
        ],
        answer: [1, 3, 5],
        hint: {
          en: "Ask who or what will run the code and in what setting: a person who looks at results, or a scheduler, another program, a test.",
          ar: "اسأل: من أو ما الذي سيشغّل الكود وفي أي سياق: شخص ينظر إلى النتائج أم جدولة أم برنامج آخر أم اختبار."
        },
        explain: {
          en: "Move to a script when the work must run unattended (a schedule, a server), is long or heavy, must be imported by other code or tested, or needs parameters from outside such as a month or an input path. Exploring, teaching and one-off reports are what a notebook is best at: a script has no inline plots and no table to poke at, so graduating too early only slows the exploring down. Length alone is not a criterion either: 50 cells can be tidied with headings, a settings cell and functions without leaving the notebook. After the move, the notebook can import the module (with <code>%autoreload 2</code> while you still edit it) and the script runs with <code>python cafeteria_report.py data/raw/cafeteria_orders.csv</code>.",
          ar: "انتقل إلى سكربت حين يجب أن يعمل العمل دون إشراف (جدولة أو خادم)، أو يكون طويلًا أو ثقيلًا، أو يجب أن تستورده شيفرة أخرى أو يُختبر، أو يحتاج إلى معاملات من الخارج مثل الشهر أو مسار الإدخال. أما الاستكشاف والتدريس والتقارير لمرة واحدة فهي أفضل ما يؤديه الدفتر: فالسكربت بلا مخططات مضمَّنة ولا جدول تتحسسه، فالتخرّج المبكر يبطئ الاستكشاف فقط. والطول وحده ليس معيارًا: يمكن ترتيب 50 خلية بعناوين وخلية إعدادات ودوال دون مغادرة الدفتر. وبعد الانتقال يستطيع الدفتر استيراد الوحدة (مع <code>%autoreload 2</code> ما دمت تعدّلها) ويعمل السكربت بـ <code>python cafeteria_report.py data/raw/cafeteria_orders.csv</code>."
        }
      },

      /* ---------------------------------------------------------- 23 */
      {
        id: "p1l3q23", type: "error", level: "hard",
        topics: ["p1-nb-module-main"],
        q: {
          en: "This file, <code>cafeteria_report.py</code>, works when you run <code>python cafeteria_report.py</code>. But each time a notebook runs <code>from cafeteria_report import load_orders</code>, the whole CSV is read and the top-3 table is printed before the notebook has used anything. Click the line responsible.",
          ar: "يعمل هذا الملف <code>cafeteria_report.py</code> حين تشغّل <code>python cafeteria_report.py</code>. لكن كلما شغّل دفتر <code>from cafeteria_report import load_orders</code> يُقرأ ملف CSV كله ويُطبع جدول الأصناف الثلاثة الأولى قبل أن يستعمل الدفتر أي شيء. انقر السطر المسؤول."
        },
        code: code(
          '"""Print the top 3 items by revenue."""',
          "from pathlib import Path",
          "import pandas as pd",
          "",
          'DEFAULT = Path("data/raw/cafeteria_orders.csv")',
          "",
          "def load_orders(path):",
          "    orders = pd.read_csv(path)",
          '    orders["line_total"] = orders["qty"] * orders["unit_price"]',
          "    return orders",
          "",
          "def main(path):",
          "    orders = load_orders(path)",
          '    print(orders.groupby("item")["line_total"].sum().nlargest(3))',
          "",
          "main(DEFAULT)"
        ),
        answer: 16,
        solution: {
          code: code(
            'if __name__ == "__main__":',
            "    main(DEFAULT)"
          ),
          en: "The guard is true only when the file is run directly, so the same file works as a program and as a library.",
          ar: "الحارس صحيح فقط حين يُشغَّل الملف مباشرة، فيعمل الملف نفسه برنامجًا ومكتبة."
        },
        hint: {
          en: "What does Python do with a file's top-level statements when the file is imported instead of run?",
          ar: "ماذا يفعل بايثون بالعبارات التي في المستوى الأعلى من ملف حين يُستورَد الملف بدل أن يُشغَّل؟"
        },
        explain: {
          en: "Importing a module executes its top-level statements, exactly as running it does. Lines 7 to 14 only define functions, and defining runs nothing; line 16 calls <code>main</code> at the top level, so every import performs the whole job (in a version that took the path from <code>sys.argv</code> it would even crash inside a notebook). The guard <code>if __name__ == \"__main__\":</code> is true only when the file is run directly, not when it is imported, which is what lets one file serve as a program for a scheduler and as a library for notebooks and tests. Move the functions you trust into a module, add <code>main</code> and the guard, and import in the notebook.",
          ar: "استيراد وحدة ينفّذ عباراتها في المستوى الأعلى تمامًا كما يفعل تشغيلها. والأسطر من 7 إلى 14 تعرّف دوال فقط، والتعريف لا ينفّذ شيئًا؛ أما السطر 16 فيستدعي <code>main</code> في المستوى الأعلى، فيؤدي كل استيراد العمل كله (وفي نسخة تأخذ المسار من <code>sys.argv</code> كان سينهار حتى داخل الدفتر). والحارس <code>if __name__ == \"__main__\":</code> صحيح فقط حين يُشغَّل الملف مباشرة لا حين يُستورَد، وهذا ما يتيح لملف واحد أن يكون برنامجًا للجدولة ومكتبة للدفاتر والاختبارات. انقل الدوال التي تثق بها إلى وحدة، وأضف <code>main</code> والحارس، واستورد في الدفتر."
        }
      },

      /* ---------------------------------------------------------- 24 */
      {
        id: "p1l3q24", type: "order", level: "medium",
        topics: ["p1-nb-anatomy", "p1-nb-stale-outputs"],
        q: {
          en: "Put these events in the order in which they happen, from pressing Shift+Enter to the end of the story.",
          ar: "رتّب هذه الأحداث بحسب وقوعها، من الضغط على <code>Shift+Enter</code> إلى نهاية القصة."
        },
        items: [
          {
            en: "You press <code>Shift+Enter</code> on a code cell: the page sends the cell's text to the kernel.",
            ar: "تضغط <code>Shift+Enter</code> على خلية شيفرة: ترسل الصفحة نص الخلية إلى النواة."
          },
          {
            en: "The kernel, a separate Python process, executes the code and keeps every variable it creates in memory.",
            ar: "تنفّذ النواة، وهي عملية بايثون منفصلة، الشيفرة وتحتفظ في الذاكرة بكل متغيّر تنشئه."
          },
          {
            en: "The kernel sends the output back, and the page shows it under the cell with an <code>In [n]</code> label.",
            ar: "ترسل النواة الناتج، وتعرضه الصفحة تحت الخلية مع العنوان <code>In [n]</code>."
          },
          {
            en: "You press <code>Ctrl+S</code>: Jupyter writes the cells' code and the text of their outputs into the <code>.ipynb</code> file, but no variables.",
            ar: "تضغط <code>Ctrl+S</code>: يكتب Jupyter شيفرة الخلايا ونص نواتجها في ملف <code>.ipynb</code>، لكن لا متغيّرات."
          },
          {
            en: "You shut the notebook down: the kernel process ends and its variables are gone, while the file still holds the old output text.",
            ar: "تُغلق الدفتر: تنتهي عملية النواة وتزول متغيّراتها، ويبقى في الملف نص النواتج القديم."
          }
        ],
        answer: [0, 1, 2, 3, 4],
        hint: {
          en: "Follow one cell on its journey: first the page talks to the kernel, then the kernel answers, and only then does anything reach the disk.",
          ar: "تابع رحلة خلية واحدة: تتحدث الصفحة أولًا إلى النواة، ثم تجيب النواة، وبعد ذلك فقط يصل شيء إلى القرص."
        },
        explain: {
          en: "The order follows who holds what. Running sends the text to the kernel; the kernel executes it and keeps the variables; the output returns and the page shows it; saving writes code and output text to the file, never the variables; closing ends the kernel process. The last two steps explain the first silent failure of the lesson: next week the file still shows its old outputs, but the room (the kernel) is gone and a fresh, empty one starts when the file is opened. Reversing the last two steps gives the classic mistake 'the number is still on the page, so the kernel must still know it'. Outputs are a photograph; the kernel is the room.",
          ar: "يتبع الترتيب من يحمل ماذا. التشغيل يرسل النص إلى النواة؛ والنواة تنفّذه وتحتفظ بالمتغيّرات؛ ويعود الناتج وتعرضه الصفحة؛ والحفظ يكتب نص الشيفرة والنواتج في الملف ولا يكتب المتغيّرات أبدًا؛ والإغلاق ينهي عملية النواة. والخطوتان الأخيرتان تفسّران أول فشل صامت في الدرس: بعد أسبوع يعرض الملف نواتجه القديمة لكن الغرفة (النواة) زالت، وتبدأ نواة جديدة فارغة عند فتح الملف. وعكس الخطوتين الأخيرتين يعطي الخطأ الكلاسيكي «الرقم ما زال على الصفحة فلا بد أن النواة ما زالت تعرفه». النواتج صورة فوتوغرافية، والنواة هي الغرفة."
        }
      }

    ]
  };
})();
