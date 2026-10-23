/* Topic tags of Theory 1, Lesson 4 (Flat Files: CSV and Excel). Each href is a heading id in src/content/t1/lesson-04.html. */
window.DATopics = window.DATopics || {};
(function (T) {
  T["t1-csv-layers"] = { href: "t1l4-s1", en: "the four layers of a CSV (bytes, characters, records, fields)", ar: "طبقات ملف CSV الأربع (بايتات وحروف وسجلّات وحقول)" };
  T["t1-csv-quoting"] = { href: "t1l4-s2", en: "quoting: why split(',') is not a CSV parser", ar: "التنصيص: لماذا ليست split(',') محلّلًا لملف CSV" };
  T["t1-csv-delimiter"] = { href: "t1l4-s4", en: "a wrong delimiter: one column and a data-filled index", ar: "فاصل خاطئ: عمود واحد وفهرس مليء بالبيانات" };
  T["t1-csv-decimal-thousands"] = { href: "t1l4-s7", en: "decimal= and thousands=", ar: "decimal= وthousands=" };
  T["t1-encoding-basics"] = { href: "t1l4-s9", en: "encodings, UTF-8, cp1256 and the BOM", ar: "الترميزات: UTF-8 وcp1256 وعلامة BOM" };
  T["t1-mojibake"] = { href: "t1l4-s10", en: "mojibake: the same bytes under the wrong encoding", ar: "الحروف المشوّهة: البايتات نفسها بترميز خاطئ" };
  T["t1-encoding-diagnose"] = { href: "t1l4-s11", en: "diagnosing an encoding from evidence", ar: "تشخيص الترميز من الدليل" };
  T["t1-read-csv-layout"] = { href: "t1l4-s12", en: "header, skiprows, names, usecols, nrows", ar: "header وskiprows وnames وusecols وnrows" };
  T["t1-id-leading-zeros"] = { href: "t1l4-s13", en: "IDs and leading zeros: dtype at read time", ar: "المعرّفات والأصفار البادئة: dtype عند القراءة" };
  T["t1-na-values"] = { href: "t1l4-s14", en: "na_values and keep_default_na", ar: "na_values وkeep_default_na" };
  T["t1-csv-reader-recipe"] = { href: "t1l4-s15", en: "the CSV reader recipe, version by version", ar: "وصفة قارئ CSV نسخةً بعد نسخة" };
  T["t1-parse-dates"] = { href: "t1l4-s16", en: "parse_dates and what a real date column unlocks", ar: "parse_dates وما يفتحه عمود تاريخ حقيقي" };
  T["t1-dayfirst-ambiguity"] = { href: "t1l4-s17", en: "day-first ambiguity: dayfirst and format", ar: "التباس اليوم أولًا: dayfirst وformat" };
  T["t1-mixed-date-formats"] = { href: "t1l4-s18", en: "mixed date formats make a column object", ar: "الصيغ المختلطة تجعل العمود object" };
  T["t1-date-parsing-evolve"] = { href: "t1l4-s19", en: "parsing dates: guess, preference, exact format and a count", ar: "تحليل التواريخ: تخمين وتفضيل وصيغة دقيقة وعدّ" };
  T["t1-excel-sheets"] = { href: "t1l4-s20", en: "workbooks, sheets and read_excel", ar: "الدفاتر والأوراق وread_excel" };
  T["t1-excel-title-rows"] = { href: "t1l4-s21", en: "Excel title rows: header= and comparing sheets", ar: "أسطر العنوان في Excel: header= ومقارنة الورقتين" };
  T["t1-excel-serial-dates"] = { href: "t1l4-s22", en: "Excel serial dates and the 1899-12-30 origin", ar: "التواريخ التسلسلية في Excel ونقطة الأصل 1899-12-30" };
  T["t1-excel-merged-formulas"] = { href: "t1l4-s23", en: "merged cells, formulas and mixed cell types", ar: "الخلايا المدمجة والمعادلات وأنواع الخلايا المختلطة" };
  T["t1-csv-write-roundtrip"] = { href: "t1l4-s24", en: "writing CSV safely and the round-trip check", ar: "كتابة CSV بأمان وفحص الذهاب والعودة" };
  T["t1-check-after-load"] = { href: "t1l4-s25", en: "checking the table right after a load", ar: "فحص الجدول فور التحميل" };
  T["t1-csv-vs-excel"] = { href: "t1l4-s26", en: "CSV versus Excel: an honest comparison", ar: "CSV مقابل Excel: مقارنة صريحة" };
})(window.DATopics);
