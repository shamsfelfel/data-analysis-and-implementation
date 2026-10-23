/* ============================================================
   The course registry and the UI strings.

   One list describes the whole course: which chapters exist,
   which pages each chapter holds, in what reading order, and
   where each page lives on disk. Everything else - the drawer,
   the breadcrumbs, the previous/next pager, the service-worker
   precache list, even the build - reads this list rather than
   hard-coding a path.

   `href` is always relative to the site root. A page turns it
   into a working link by prefixing window.DA_BASE, which each
   page sets to the number of ../ it needs. That is what lets the
   same files serve from a domain root and from a GitHub Pages
   project subpath without a rewrite.
   ============================================================ */
(function () {
  "use strict";

  var CHAPTERS = [
    {
      num: 1,
      slug: "chapter-1",
      href: "chapters/chapter-1.html",
      ready: true,
      title: { en: "Object-Oriented Python", ar: "البرمجة الكائنية في بايثون" },
      blurb: {
        en: "Seven lessons that each open with code that hurts and rebuild it with the one OOP idea that fixes that exact pain.",
        ar: "سبعة دروس يبدأ كل منها بكود مؤلم ثم يعيد بناءه بالفكرة الكائنية الوحيدة التي تعالج ذلك الألم بعينه."
      },
      stats: { lessons: 7, questions: 144, exercises: 28, traces: 8 },
      pages: [
        { id: "chapter", kind: "chapter", href: "chapters/chapter-1.html",
          en: "Chapter 1 home", ar: "صفحة الفصل 1" },

        { id: "lesson-01", kind: "lesson", n: 1, href: "lessons/chapter-1-lesson-1.html",
          en: "Objects & Classes", ar: "الكائنات والأصناف" },
        { id: "test-01", kind: "test", of: 1, bank: "test-01", href: "tests/chapter-1-test-1.html",
          en: "Test 1", ar: "اختبار 1" },

        { id: "lesson-02", kind: "lesson", n: 2, href: "lessons/chapter-1-lesson-2.html",
          en: "State, __init__ & Methods", ar: "الحالة والمُنشئ والدوال" },
        { id: "test-02", kind: "test", of: 2, bank: "test-02", href: "tests/chapter-1-test-2.html",
          en: "Test 2", ar: "اختبار 2" },

        { id: "lesson-03", kind: "lesson", n: 3, href: "lessons/chapter-1-lesson-3.html",
          en: "Encapsulation", ar: "التغليف" },
        { id: "test-03", kind: "test", of: 3, bank: "test-03", href: "tests/chapter-1-test-3.html",
          en: "Test 3", ar: "اختبار 3" },

        { id: "lesson-04", kind: "lesson", n: 4, href: "lessons/chapter-1-lesson-4.html",
          en: "Abstraction & Clean Interfaces", ar: "التجريد والواجهات" },
        { id: "test-04", kind: "test", of: 4, bank: "test-04", href: "tests/chapter-1-test-4.html",
          en: "Test 4", ar: "اختبار 4" },

        { id: "lesson-05", kind: "lesson", n: 5, href: "lessons/chapter-1-lesson-5.html",
          en: "Inheritance & Composition", ar: "الوراثة والتركيب" },
        { id: "test-05", kind: "test", of: 5, bank: "test-05", href: "tests/chapter-1-test-5.html",
          en: "Test 5", ar: "اختبار 5" },

        { id: "lesson-06", kind: "lesson", n: 6, href: "lessons/chapter-1-lesson-6.html",
          en: "Polymorphism & Duck Typing", ar: "تعدد الأشكال" },
        { id: "test-06", kind: "test", of: 6, bank: "test-06", href: "tests/chapter-1-test-6.html",
          en: "Test 6", ar: "اختبار 6" },

        { id: "lesson-07", kind: "lesson", n: 7, href: "lessons/chapter-1-lesson-7.html",
          en: "Capstone: Two Styles, One Program", ar: "المشروع الختامي" },
        { id: "test-07", kind: "test", of: 7, bank: "test-07", href: "tests/chapter-1-test-7.html",
          en: "Test 7", ar: "اختبار 7" },

        { id: "lab", kind: "lab", href: "labs/chapter-1-lab.html",
          en: "Execution Lab", ar: "مختبر التنفيذ" },
        { id: "chapter-test-a", kind: "exam", bank: "chapter-test-a", href: "exams/chapter-1-exam-a.html",
          en: "Chapter Test A — Core", ar: "اختبار الفصل أ — الأساسيات" },
        { id: "chapter-test-b", kind: "exam", bank: "chapter-test-b", href: "exams/chapter-1-exam-b.html",
          en: "Chapter Test B — Advanced", ar: "اختبار الفصل ب — المتقدم" }
      ]
    }
  ];

  /* Chapters still to be written. They appear on the home page as
     the road ahead, greyed out and unlinked, so a reader can see
     where the course is going. Keep in step with README.md. */
  var PLANNED = [
    { num: 2,  en: "OOP Design Patterns for ML",        ar: "أنماط التصميم الكائني للتعلّم الآلي" },
    { num: 3,  en: "NumPy Fundamentals",                ar: "أساسيات NumPy" },
    { num: 4,  en: "NumPy for ML Math",                 ar: "NumPy لرياضيات التعلّم الآلي" },
    { num: 5,  en: "np.linalg and Linear Algebra",      ar: "np.linalg والجبر الخطي" },
    { num: 6,  en: "Pandas Fundamentals",               ar: "أساسيات Pandas" },
    { num: 7,  en: "Pandas Data Wrangling",             ar: "معالجة البيانات بـ Pandas" },
    { num: 8,  en: "Pandas Reshaping",                  ar: "إعادة تشكيل البيانات بـ Pandas" },
    { num: 9,  en: "Encoding and Scaling",              ar: "الترميز والتوحيد" },
    { num: 10, en: "Missing Data and Pipelines",        ar: "البيانات الناقصة وخطوط المعالجة" },
    { num: 11, en: "Regression: Derivation and scikit-learn",
                                                        ar: "الانحدار: الاشتقاق وscikit-learn" }
  ];

  var UI = {
    brand:    { en: "Python OOP by Example", ar: "البرمجة الكائنية بلغة بايثون" },
    menu:     { en: "Course", ar: "المقرر" },
    prev:     { en: "Previous", ar: "السابق" },
    next:     { en: "Next", ar: "التالي" },
    copy:     { en: "copy", ar: "نسخ" },
    copied:   { en: "copied", ar: "تم النسخ" },
    score:    { en: "Score: {a} / {b} correct", ar: "النتيجة: {a} من {b} صحيحة" },
    onpage:   { en: "On this page", ar: "في هذه الصفحة" },
    home:     { en: "Home", ar: "الرئيسية" },
    chapter:  { en: "Chapter {n}", ar: "الفصل {n}" },
    install:  { en: "Install", ar: "تثبيت" },
    offline:  { en: "Works fully offline", ar: "يعمل دون اتصال بالكامل" },
    resume:   { en: "Continue where you stopped", ar: "تابع من حيث توقّفت" },
    start:    { en: "Start the chapter", ar: "ابدأ الفصل" },
    soon:     { en: "Being written", ar: "قيد الكتابة" },
    top:      { en: "Back to top", ar: "إلى الأعلى" },
    lang:     { en: "العربية", ar: "English" },
    dark:     { en: "Dark", ar: "داكن" },
    light:    { en: "Light", ar: "فاتح" }
  };

  /* ---------------------------------------------------------- lookups */

  function chapter(num) {
    for (var i = 0; i < CHAPTERS.length; i++) {
      if (CHAPTERS[i].num === +num) return CHAPTERS[i];
    }
    return null;
  }

  /* The reading order of one chapter, as a flat list. The chapter
     home page is index 0, so "previous" from lesson 1 lands there. */
  function pages(num) {
    var c = chapter(num);
    return c ? c.pages : [];
  }

  function page(num, id) {
    var list = pages(num);
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return null;
  }

  function indexOf(num, id) {
    var list = pages(num);
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return i;
    return -1;
  }

  /* Every page that is a file of its own, across every chapter -
     what the service worker precaches and what the e2e suite walks. */
  function allPages() {
    var out = [];
    for (var i = 0; i < CHAPTERS.length; i++) {
      for (var j = 0; j < CHAPTERS[i].pages.length; j++) {
        out.push({ chapter: CHAPTERS[i].num, page: CHAPTERS[i].pages[j] });
      }
    }
    return out;
  }

  window.COURSE = {
    chapters: CHAPTERS,
    planned: PLANNED,
    UI: UI,
    chapter: chapter,
    pages: pages,
    page: page,
    indexOf: indexOf,
    allPages: allPages
  };
})();
