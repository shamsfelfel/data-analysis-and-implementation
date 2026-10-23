/* ============================================================
   Code-execution step-through widget.

   A trace is DATA, produced by running the program in CPython
   (tools/trace_gen.py) or written by hand for Excel / Power BI /
   Jupyter walkthroughs. Each step carries the full picture - the
   line about to run, the variables, the call stack, the output so
   far - and this file only DRAWS it: typed values become cells,
   tables, trees, bars, a spreadsheet grid, a pipeline. The widget
   diffs consecutive steps itself to decide what to flag.

   window.DATrace = { mount(host, spec), mountAll(scope), relabel() }
   Host:  <div data-trace-id="x"></div>   spec = window.DATraces["x"]

   step = { line, vars:{name:V}, locals:{name:V}|null, frame:"fn"|null,
            fid, stack:[{fn,fid,args:{name:V},line}], out, note:{en,ar},
            ret:V, end:true, error:{type,msg} }
   V    = {t:"num|str|bool", v:"..."} | {t:"none"} | {t:"nan"} |
          {t:"list", kind:"list|tuple|set|ndarray", v:[V]} |
          {t:"dict", v:[[V,V]]} | {t:"df", ...} | {t:"series", ...} |
          {t:"obj", cls, v:[[attr,V]]} | {t:"repr", v} |
          {t:"sheet", ...} | {t:"flow", nodes, active}
   ============================================================ */
(function () {
  "use strict";

  /* ------------------------------------------------------------ labels */

  var UI = {
    start:   { en: "Start",   ar: "البداية" },
    prev:    { en: "◂ Back", ar: "▸ السابق" },
    next:    { en: "Next ▸", ar: "التالي ◂" },
    play:    { en: "▶ Run",  ar: "▶ تشغيل" },
    pause:   { en: "❚❚ Pause", ar: "❚❚ إيقاف" },
    speed:   { en: "Speed",   ar: "السرعة" },
    scrub:   { en: "Step",    ar: "الخطوة" },
    step:    { en: "step {a} of {b}", ar: "الخطوة {a} من {b}" },
    vars:    { en: "Variables", ar: "المتغيرات" },
    globals: { en: "Global variables", ar: "المتغيرات العامة" },
    locals:  { en: "Locals of {fn}",   ar: "المتغيرات المحلية في {fn}" },
    stack:   { en: "Call stack", ar: "مكدس الاستدعاءات" },
    out:     { en: "Output so far", ar: "المُخرَجات حتى الآن" },
    note:    { en: "What's happening", ar: "ماذا يحدث الآن" },
    none:    { en: "nothing defined yet", ar: "لا شيء معرَّف بعد" },
    nolocal: { en: "no local variables yet", ar: "لا متغيرات محلية بعد" },
    noout:   { en: "nothing printed yet", ar: "لم يُطبع شيء بعد" },
    about:   { en: "About to run line {n}.", ar: "على وشك تنفيذ السطر {n}." },
    done:    { en: "The program has finished.", ar: "انتهى البرنامج." },
    retnote: { en: "{fn} is returning {v} to its caller.", ar: "تُرجِع {fn} القيمة {v} إلى مستدعيها." },
    returns: { en: "returns", ar: "تُرجِع" },
    line:    { en: "line {n}", ar: "السطر {n}" },
    main:    { en: "main program", ar: "البرنامج الرئيسي" },
    lnew:    { en: "new", ar: "جديد" },
    lchg:    { en: "changed", ar: "تغيّر" },
    legend:  { en: "Highlights compare with the previous step", ar: "التظليل مقارنةً بالخطوة السابقة" },
    err:     { en: "Error", ar: "خطأ" },
    items:   { en: "{n} items", ar: "{n} عناصر" },
    item1:   { en: "1 item", ar: "عنصر واحد" },
    empty:   { en: "empty", ar: "فارغ" },
    keys:    { en: "{n} keys", ar: "{n} مفاتيح" },
    key1:    { en: "1 key", ar: "مفتاح واحد" },
    moreRows: { en: "… {n} more rows", ar: "… {n} صفوف أخرى" },
    moreCols: { en: "{n} more columns", ar: "{n} أعمدة أخرى" },
    moreItems: { en: "{n} more", ar: "{n} أخرى" },
    was:     { en: "was", ar: "كان" },
    removedRows: { en: "removed rows", ar: "صفوف محذوفة" },
    removedCols: { en: "removed columns", ar: "أعمدة محذوفة" },
    shape:   { en: "shape", ar: "الشكل" },
    result:  { en: "result", ar: "النتيجة" },
    cell:    { en: "cell", ar: "الخلية" },
    clickline: { en: "Jump to the next step on this line", ar: "اذهب إلى الخطوة التالية على هذا السطر" },
    failed:  { en: "This step-through could not be drawn.", ar: "تعذّر رسم هذه الخطوات." },
    badstep: { en: "This step could not be drawn.", ar: "تعذّر رسم هذه الخطوة." },
    aria:    { en: "Step-through of a program", ar: "تنفيذ البرنامج خطوة بخطوة" }
  };

  function lang() {
    return document.documentElement.getAttribute("lang") === "ar" ? "ar" : "en";
  }

  function t(key, vars) {
    var e = UI[key];
    var s = e ? (e[lang()] || e.en) : key;
    if (vars) {
      for (var k in vars) {
        if (Object.prototype.hasOwnProperty.call(vars, k)) s = s.split("{" + k + "}").join(vars[k]);
      }
    }
    return s;
  }

  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function bi(obj) {
    if (!obj) return "";
    return '<span class="en">' + (obj.en || "") + '</span><span class="ar">' + (obj.ar || obj.en || "") + "</span>";
  }

  function pick(o) {
    if (!o) return "";
    if (typeof o === "string") return o;
    return o[lang()] || o.en || "";
  }

  function every(arr, fn) {
    for (var i = 0; i < arr.length; i++) if (!fn(arr[i], i)) return false;
    return true;
  }

  function has(o, k) { return Object.prototype.hasOwnProperty.call(o, k); }

  function keysOf(o) {
    var r = [];
    for (var k in o) if (has(o, k)) r.push(k);
    return r;
  }

  /* ------------------------------------------------------------ highlight */

  /* Highlight the whole program once (so triple-quoted strings work),
     then cut the HTML into lines, closing and re-opening any span that
     straddles a line break. */
  function splitHighlighted(html) {
    var lines = [], cur = "", open = [];
    var re = /(<span[^>]*>|<\/span>|\n)/g;
    var last = 0, m, i;
    while ((m = re.exec(html)) !== null) {
      cur += html.slice(last, m.index);
      last = m.index + m[0].length;
      if (m[0] === "\n") {
        for (i = 0; i < open.length; i++) cur += "</span>";
        lines.push(cur);
        cur = open.join("");
      } else if (m[0] === "</span>") {
        open.pop();
        cur += m[0];
      } else {
        open.push(m[0]);
        cur += m[0];
      }
    }
    cur += html.slice(last);
    lines.push(cur);
    return lines;
  }

  function paintLines(code, lg) {
    var plain = code.split("\n");
    var fn = window.DAHighlight;
    if (!fn || lg === "text") return plain.map(esc);
    /* An old highlighter that ignores the language would colour Excel as Python. */
    if (lg !== "python" && fn.length < 2) return plain.map(esc);
    try {
      var html = fn(code, lg);
      var lines = splitHighlighted(html);
      if (lines.length !== plain.length) return plain.map(esc);
      return lines;
    } catch (e) {
      return plain.map(esc);
    }
  }

  /* ------------------------------------------------------------ value helpers */

  function normV(v) {
    if (v === null || v === undefined) return { t: "none" };
    if (typeof v === "string") return { t: "repr", v: v };
    if (typeof v === "number") return { t: "num", v: String(v) };
    if (typeof v === "boolean") return { t: "bool", v: v ? "True" : "False" };
    if (typeof v === "object" && v.t) return v;
    return { t: "repr", v: "?" };
  }

  function same(a, b) {
    if (a === b) return true;
    try { return JSON.stringify(a) === JSON.stringify(b); } catch (e) { return false; }
  }

  /* Change convention: P === undefined -> nothing to compare with (no flag);
     P === null -> the item did not exist before (new); else changed or not. */
  function flagOf(V, P) {
    if (P === undefined) return "";
    if (P === null) return " new";
    return same(V, P) ? "" : " chg";
  }

  function pyStr(s) {
    var q = "'";
    if (s.indexOf("'") >= 0 && s.indexOf('"') < 0) q = '"';
    var r = s.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t");
    if (q === "'") r = r.replace(/'/g, "\\'");
    return q + r + q;
  }

  function isScalar(V) {
    var k = V.t;
    return k === "num" || k === "str" || k === "bool" || k === "none" || k === "nan" || k === "repr";
  }

  function scalarText(V) {
    switch (V.t) {
      case "num": return V.v;
      case "str": return pyStr(V.v) + (V.more ? "…" : "");
      case "bool": return V.v;
      case "none": return "None";
      case "nan": return "nan";
      case "repr": return V.v;
    }
    return "?";
  }

  function valClass(V) {
    switch (V.t) {
      case "num": return "num";
      case "str": return "str";
      case "bool": return "bool";
      case "none": return "none";
      case "nan": return "nan";
    }
    return "rep";
  }

  function typeTag(V) {
    switch (V.t) {
      case "num": return V.ty || (/^-?\d+$/.test(V.v) ? "int" : "float");
      case "str": return "str";
      case "bool": return "bool";
      case "none": return "NoneType";
      case "nan": return "float";
      case "repr": return V.ty || "object";
    }
    return V.t;
  }

  function isNumeric(V) {
    return V.t === "num" && isFinite(parseFloat(V.v));
  }

  function rawSummary(V, d) {
    if (d > 2) return "…";
    var parts, i, s, open, close;
    switch (V.t) {
      case "list":
        parts = [];
        for (i = 0; i < V.v.length && i < 6; i++) parts.push(rawSummary(V.v[i], d + 1));
        s = parts.join(", ") + (V.v.length > 6 || V.more ? ", …" : "");
        open = V.kind === "tuple" ? "(" : V.kind === "set" ? "{" : "[";
        close = V.kind === "tuple" ? ")" : V.kind === "set" ? "}" : "]";
        if (V.kind === "ndarray") return "array(" + open + s + close + ")";
        return open + s + close;
      case "dict":
        parts = [];
        for (i = 0; i < V.v.length && i < 4; i++) {
          parts.push(rawSummary(V.v[i][0], d + 1) + ": " + rawSummary(V.v[i][1], d + 1));
        }
        return "{" + parts.join(", ") + (V.v.length > 4 || V.more ? ", …" : "") + "}";
      case "df": return "DataFrame (" + V.shape[0] + " × " + V.shape[1] + ")";
      case "series": return "Series (" + (V.len != null ? V.len : V.values.length) + ")";
      case "obj":
        parts = [];
        for (i = 0; i < V.v.length && i < 3; i++) parts.push(V.v[i][0] + "=" + rawSummary(V.v[i][1], d + 1));
        return V.cls + "(" + parts.join(", ") + (V.v.length > 3 ? ", …" : "") + ")";
      case "sheet": return "sheet";
      case "flow": return "flow";
    }
    return scalarText(V);
  }

  function summary(V, max) {
    var s = rawSummary(V, 0);
    max = max || 40;
    return s.length > max ? s.slice(0, max - 1) + "…" : s;
  }

  function depthOf(V) {
    var d = 0, i;
    if (V.t === "list") {
      for (i = 0; i < V.v.length; i++) d = Math.max(d, depthOf(V.v[i]));
      return d + 1;
    }
    if (V.t === "dict") {
      for (i = 0; i < V.v.length; i++) d = Math.max(d, depthOf(V.v[i][1]));
      return d + 1;
    }
    if (V.t === "obj") {
      for (i = 0; i < V.v.length; i++) d = Math.max(d, depthOf(V.v[i][1]));
      return d + 1;
    }
    return 0;
  }

  function dictLookup(P, keyV) {
    /* the value stored under the same key in the previous dict, null if absent */
    if (!P || P.t !== "dict") return undefined;
    var ks = scalarText(keyV);
    for (var i = 0; i < P.v.length; i++) {
      if (P.v[i][0].t === keyV.t && scalarText(P.v[i][0]) === ks) return P.v[i][1];
    }
    return null;
  }

  function pairLookup(P, name) {
    if (!P || P.t !== "obj") return undefined;
    for (var i = 0; i < P.v.length; i++) if (P.v[i][0] === name) return P.v[i][1];
    return null;
  }

  /* ------------------------------------------------------------ pointers */

  var INDEX_RE = /^(i|j|k|m|ii|jj|idx|index|lo|hi|low|high|mid|left|right|l|r|pos|ptr|start|end|stop|cur|curr|current|pivot|first|last|[a-z]+_idx|idx_[a-z]+|[a-z]+_index)$/;

  /* which integer variables of the same scope point into this list? */
  function pointerMap(name, V, env) {
    var map = {}, any = false, names, i, sib, k, n;
    var cfg = env.pointers;
    if (cfg === false) return null;
    if (cfg && has(cfg, name)) {
      names = cfg[name];
    } else {
      names = [];
      for (k in env.siblings) if (has(env.siblings, k) && INDEX_RE.test(k)) names.push(k);
    }
    for (i = 0; i < names.length; i++) {
      sib = env.siblings[names[i]];
      if (!sib || sib.t !== "num" || !/^-?\d+$/.test(sib.v)) continue;
      n = parseInt(sib.v, 10);
      if (n < 0 || n >= V.v.length) continue;
      (map[n] = map[n] || []).push(names[i]);
      any = true;
    }
    return any ? map : null;
  }

  /* ------------------------------------------------------------ small renderers */

  function listLabel(V) {
    var n = V.n != null ? V.n : V.v.length;
    var cnt = n === 0 ? t("empty") : n === 1 ? t("item1") : t("items", { n: n });
    if (V.kind === "ndarray") {
      var sh = V.shape ? "(" + V.shape.join(", ") + (V.shape.length === 1 ? "," : "") + ")" : "";
      return "ndarray · " + (V.dtype || "") + " · " + sh;
    }
    return (V.ty || V.kind || "list") + " · " + cnt;
  }

  function cellText(V) {
    return isScalar(V) ? scalarText(V) : summary(V, 22);
  }

  function cellsHtml(V, P, ptrs) {
    var items = V.v, pv = (P && P.t === "list") ? P.v : null;
    var isSet = V.kind === "set";
    var h = '<div class="cells">', i, it, fl, nm;
    for (i = 0; i < items.length; i++) {
      it = items[i];
      fl = pv ? (i < pv.length ? flagOf(it, pv[i]) : " new") : "";
      h += '<div class="cw">' + (isSet ? "" : '<span class="ci">' + i + "</span>") +
           '<span class="cell ' + valClass(it) + fl + '">' + esc(cellText(it)) + "</span>";
      if (ptrs) {
        nm = ptrs[i];
        h += '<span class="cp">' + (nm ? "▲ " + esc(nm.join(", ")) : "") + "</span>";
      }
      h += "</div>";
    }
    if (V.more) {
      h += '<div class="cw more"><span class="ci">…</span><span class="cell rep">+' +
           ((V.n || items.length) - items.length) + "</span></div>";
    }
    if (!items.length) h += '<span class="empty-note">' + esc(t("empty")) + "</span>";
    return h + "</div>";
  }

  /* HTML/CSS bar chart: values above, labels below, optional pointers */
  function barsHtml(vals, labels, flags, ptrs) {
    var lo = 0, hi = 0, i, v;
    for (i = 0; i < vals.length; i++) { if (vals[i] < lo) lo = vals[i]; if (vals[i] > hi) hi = vals[i]; }
    if (hi === lo) hi = lo + 1;
    var span = hi - lo;
    var h = '<div class="bars">';
    for (i = 0; i < vals.length; i++) {
      v = vals[i];
      var bottom = (Math.min(v, 0) - lo) / span * 100;
      var height = Math.abs(v) / span * 100;
      h += '<div class="bcol' + (flags[i] || "") + '" title="' + esc(labels[i] + ": " + v) + '">' +
           '<span class="bv">' + esc(String(v)) + "</span>" +
           '<div class="bplot"><div class="bbar" style="bottom:' + bottom.toFixed(2) + "%;height:" + height.toFixed(2) + '%"></div></div>' +
           '<span class="bi">' + esc(labels[i]) + "</span>";
      if (ptrs) h += '<span class="cp">' + (ptrs[i] ? "▲ " + esc(ptrs[i].join(", ")) : "") + "</span>";
      h += "</div>";
    }
    return h + "</div>";
  }

  function gridHtml(rows, P, rowLabel, colHeads) {
    /* rows: array of list-V; used for matrices / 2-D ndarrays */
    var pr = (P && P.t === "list") ? P.v : null;
    var ncol = 0, i, j;
    for (i = 0; i < rows.length; i++) ncol = Math.max(ncol, rows[i].v.length);
    var h = '<div class="scroll" data-keep="grid"><table class="mgrid"><thead><tr><th></th>';
    for (j = 0; j < ncol; j++) h += "<th>" + (colHeads ? esc(colHeads[j]) : j) + "</th>";
    h += "</tr></thead><tbody>";
    for (i = 0; i < rows.length; i++) {
      h += "<tr><th>" + (rowLabel ? esc(rowLabel[i]) : i) + "</th>";
      for (j = 0; j < ncol; j++) {
        var c = rows[i].v[j];
        if (!c) { h += "<td></td>"; continue; }
        var pc = pr ? (pr[i] && pr[i].t === "list" ? (j < pr[i].v.length ? pr[i].v[j] : null) : null) : undefined;
        h += '<td class="' + valClass(c) + flagOf(c, pc) + '">' + esc(cellText(c)) + "</td>";
      }
      h += "</tr>";
    }
    return h + "</tbody></table></div>";
  }

  function recordsHtml(V, P) {
    /* a list of flat dicts drawn as a table: row per dict, column per key */
    var cols = [], seen = {}, i, j, k;
    for (i = 0; i < V.v.length; i++) {
      for (j = 0; j < V.v[i].v.length; j++) {
        k = V.v[i].v[j][0].v;
        if (!has(seen, k)) { seen[k] = true; cols.push(k); }
      }
    }
    var pv = (P && P.t === "list") ? P.v : null;
    var h = '<div class="scroll" data-keep="rec"><table class="mgrid rec"><thead><tr><th></th>';
    for (j = 0; j < cols.length; j++) h += "<th>" + esc(cols[j]) + "</th>";
    h += "</tr></thead><tbody>";
    for (i = 0; i < V.v.length; i++) {
      var rowNew = pv && i >= pv.length;
      h += '<tr class="' + (rowNew ? "new" : "") + '"><th>' + i + "</th>";
      for (j = 0; j < cols.length; j++) {
        var cell = null, d = V.v[i].v, m;
        for (m = 0; m < d.length; m++) if (d[m][0].v === cols[j]) cell = d[m][1];
        if (!cell) { h += '<td class="none"></td>'; continue; }
        var pc;
        if (!pv) pc = undefined;
        else if (i >= pv.length || pv[i].t !== "dict") pc = null;
        else pc = dictLookup(pv[i], { t: "str", v: cols[j] });
        h += '<td class="' + valClass(cell) + flagOf(cell, pc) + '">' + esc(cellText(cell)) + "</td>";
      }
      h += "</tr>";
    }
    return h + "</tbody></table></div>";
  }

  function miniHtml(V, P) {
    var pv = (P && P.t === "list") ? P.v : null, h = '<span class="mini">', i;
    for (i = 0; i < V.v.length; i++) {
      h += '<span class="mc ' + valClass(V.v[i]) + (pv ? (i < pv.length ? flagOf(V.v[i], pv[i]) : " new") : "") +
           '">' + esc(cellText(V.v[i])) + "</span>";
    }
    if (V.more) h += '<span class="mc rep">…</span>';
    return h + "</span>";
  }

  function inlineVal(V, P, depth) {
    var fl = flagOf(V, P);
    if (isScalar(V)) return '<span class="iv ' + valClass(V) + fl + '">' + esc(scalarText(V)) + "</span>";
    if (V.t === "list" && V.v.length <= 12 && every(V.v, isScalar)) {
      return '<span class="ivbox' + fl + '">' + miniHtml(V, P) + "</span>";
    }
    if (V.t === "dict" && depth < 1 && V.v.length <= 8) {
      return '<span class="ivbox' + fl + '">' + kvHtml(V.v, P, "dict", depth + 1) + "</span>";
    }
    return '<span class="iv rep' + fl + '">' + esc(summary(V, 44)) + "</span>";
  }

  /* two-column card: key -> value (dict) or attribute -> value (obj) */
  function kvHtml(pairs, P, mode, depth) {
    var h = '<table class="kv"><tbody>', i, k, v, pv, fl;
    for (i = 0; i < pairs.length; i++) {
      k = pairs[i][0]; v = pairs[i][1];
      if (mode === "obj") {
        pv = P === undefined ? undefined : pairLookup(P, k);
        h += '<tr class="' + (pv === null ? "new" : "") + '"><th class="k attr">' + esc(k) + "</th><td>" + inlineVal(v, pv, depth) + "</td></tr>";
      } else {
        pv = P === undefined ? undefined : dictLookup(P, k);
        fl = pv === null ? " new" : "";
        h += '<tr class="' + fl + '"><th class="k ' + valClass(k) + '">' + esc(cellText(k)) + "</th><td>" + inlineVal(v, pv, depth) + "</td></tr>";
      }
    }
    return h + "</tbody></table>";
  }

  /* ------------------------------------------------------------ tree */

  function treeNode(label, V, P, bud, depth) {
    bud.n--;
    var fl = flagOf(V, P);
    var kids = "", k, i, key, pv, shown, extra;
    if (isScalar(V)) {
      return '<div class="tn"><div class="tl leaf ' + valClass(V) + fl + '">' +
             (label !== null ? '<span class="tk">' + esc(label) + "</span>" : "") +
             '<span class="tv">' + esc(scalarText(V)) + "</span></div></div>";
    }
    var badge, items = [], more = 0;
    if (V.t === "list") {
      badge = (V.kind === "tuple" ? "( )" : V.kind === "set" ? "{ }" : "[ ]") + " " + (V.n != null ? V.n : V.v.length);
      for (i = 0; i < V.v.length; i++) {
        pv = P && P.t === "list" ? (i < P.v.length ? P.v[i] : null) : undefined;
        items.push(["[" + i + "]", V.v[i], pv]);
      }
      more = (V.n != null ? V.n : V.v.length) - items.length;
    } else if (V.t === "dict") {
      badge = "{ } " + (V.n != null ? V.n : V.v.length);
      for (i = 0; i < V.v.length; i++) {
        key = V.v[i][0];
        items.push([isScalar(key) ? (key.t === "str" ? key.v : scalarText(key)) : summary(key, 20), V.v[i][1], P === undefined ? undefined : dictLookup(P, key)]);
      }
      more = (V.n != null ? V.n : V.v.length) - items.length;
    } else if (V.t === "obj") {
      badge = V.cls;
      for (i = 0; i < V.v.length; i++) items.push([V.v[i][0], V.v[i][1], P === undefined ? undefined : pairLookup(P, V.v[i][0])]);
    } else {
      return '<div class="tn"><div class="tl leaf rep' + fl + '">' +
             (label !== null ? '<span class="tk">' + esc(label) + "</span>" : "") +
             '<span class="tv">' + esc(summary(V, 40)) + "</span></div></div>";
    }
    var limit = depth === 0 ? 8 : 5;
    shown = Math.min(items.length, limit);
    extra = items.length - shown + (more > 0 ? more : 0);
    for (i = 0; i < shown; i++) {
      if (bud.n <= 0) { extra += shown - i; break; }
      kids += '<div class="tkid">' + treeNode(items[i][0], items[i][1], items[i][2], bud, depth + 1) + "</div>";
    }
    if (extra > 0) {
      kids += '<div class="tkid"><div class="tn"><div class="tl leaf more"><span class="tv">… +' + extra + "</span></div></div></div>";
    }
    return '<div class="tn"><div class="tl box' + fl + '">' +
           (label !== null ? '<span class="tk">' + esc(label) + "</span>" : "") +
           '<span class="tb">' + esc(badge) + "</span></div>" +
           (kids ? '<div class="tkids">' + kids + "</div>" : "") + "</div>";
  }

  function treeHtml(name, V, P) {
    return '<div class="scroll tree" data-keep="tree">' + treeNode(name, V, P, { n: 70 }, 0) + "</div>";
  }

  /* ------------------------------------------------------------ DataFrame / Series */

  var NUM_DT = /^(u?int|float|complex|Int|UInt|Float)/;

  /* Leading / trailing spaces are the classic silent data bug: draw them as dots.
     Returns [html, extraClass]. */
  function cellShow(cell, numeric) {
    if (cell === "" && !numeric) return ['<span class="ws">""</span>', " na"];
    if (!numeric && /^\s|\s$/.test(cell)) {
      var dots = function (m) { return new Array(m.length + 1).join("·"); };
      return ['<span class="wsd">' + esc(cell.replace(/^\s+/, dots).replace(/\s+$/, dots)) + "</span>", " wsp"];
    }
    return [esc(cell), ""];
  }
  var NA_RE = /^(NaN|NaT|None|<NA>)$/;

  function dfMeta(badge, shapeTxt, wasTxt, flag, extra) {
    return '<div class="dfmeta"><span class="badge">' + esc(badge) + '</span><span class="badge shape' + flag + '">' +
           esc(shapeTxt) + "</span>" + (wasTxt ? '<span class="was">' + esc(wasTxt) + "</span>" : "") + (extra || "") + "</div>";
  }

  function bodyDf(V, P) {
    var Pd = (P && P.t === "df") ? P : null;
    var colIdx = {}, rowIdx = {}, j, i, uniq = true;
    if (Pd) {
      for (j = 0; j < Pd.cols.length; j++) if (!has(colIdx, Pd.cols[j])) colIdx[Pd.cols[j]] = j;
      for (i = 0; i < Pd.index.length; i++) {
        if (has(rowIdx, Pd.index[i])) uniq = false;
        rowIdx[Pd.index[i]] = i;
      }
      var seen = {};
      for (i = 0; i < V.index.length; i++) {
        if (has(seen, V.index[i])) uniq = false;
        seen[V.index[i]] = true;
      }
    }
    var shapeChg = Pd && (Pd.shape[0] !== V.shape[0] || Pd.shape[1] !== V.shape[1]);
    var h = dfMeta("DataFrame", V.shape[0] + " × " + V.shape[1],
                   shapeChg ? t("was") + " " + Pd.shape[0] + " × " + Pd.shape[1] : "", shapeChg ? " chg" : "");
    h += '<div class="scroll" data-keep="df"><table class="dft"><thead><tr class="hd"><th class="ix">' + esc(V.index_name || "") + "</th>";
    var newCol = [];
    for (j = 0; j < V.cols.length; j++) {
      newCol[j] = Pd && !has(colIdx, V.cols[j]);
      h += '<th class="' + (newCol[j] ? "new" : "") + '">' + esc(V.cols[j]) + "</th>";
    }
    if (V.shape[1] > V.cols.length) h += '<th class="more">… ' + esc(t("moreCols", { n: V.shape[1] - V.cols.length })) + "</th>";
    h += '</tr><tr class="dt"><th class="ix"></th>';
    for (j = 0; j < V.cols.length; j++) {
      var dtFlag = "";
      if (newCol[j]) dtFlag = " new";
      else if (Pd && Pd.dtypes[colIdx[V.cols[j]]] !== V.dtypes[j]) dtFlag = " chg";
      h += '<th class="' + dtFlag + '">' + esc(V.dtypes[j]) + "</th>";
    }
    h += "</tr></thead><tbody>";
    for (i = 0; i < V.rows.length; i++) {
      var pi = -1, rowNew = false;
      if (Pd) {
        if (uniq) { if (has(rowIdx, V.index[i])) pi = rowIdx[V.index[i]]; else rowNew = true; }
        else if (i < Pd.rows.length) pi = i; else rowNew = true;
      }
      h += '<tr class="' + (rowNew ? "new" : "") + '"><th class="ix">' + esc(V.index[i]) + "</th>";
      for (j = 0; j < V.cols.length; j++) {
        var cell = V.rows[i][j], cls = NUM_DT.test(V.dtypes[j]) ? "n" : "s";
        if (NA_RE.test(cell)) cls += " na";
        if (Pd) {
          if (newCol[j] || rowNew) cls += " new";
          else if (pi >= 0 && Pd.rows[pi][colIdx[V.cols[j]]] !== cell) cls += " chg";
        }
        var cs = cellShow(cell, cls.charAt(0) === "n");
        h += '<td class="' + cls + cs[1] + '" title="' + esc(cell) + '">' + cs[0] + "</td>";
      }
      h += "</tr>";
    }
    h += "</tbody></table></div>";
    if (V.shape[0] > V.rows.length) h += '<div class="dfnote">' + esc(t("moreRows", { n: V.shape[0] - V.rows.length })) + "</div>";
    if (Pd && !Pd.more && !V.more) {
      var gone = [];
      for (i = 0; i < Pd.index.length; i++) {
        if (uniq) { if (V.index.indexOf(Pd.index[i]) < 0) gone.push(Pd.index[i]); }
      }
      if (gone.length) h += '<div class="dfnote gone">− ' + esc(t("removedRows")) + ": " + esc(gone.join(", ")) + "</div>";
      var goneC = [];
      for (j = 0; j < Pd.cols.length; j++) if (V.cols.indexOf(Pd.cols[j]) < 0) goneC.push(Pd.cols[j]);
      if (goneC.length) h += '<div class="dfnote gone">− ' + esc(t("removedCols")) + ": " + esc(goneC.join(", ")) + "</div>";
    }
    return { label: "DataFrame · " + V.shape[0] + " × " + V.shape[1], html: h };
  }

  function bodySeries(V, P, viz) {
    var Ps = (P && P.t === "series") ? P : null;
    var n = V.len != null ? V.len : V.values.length;
    var pIdx = {}, i;
    if (Ps) for (i = 0; i < Ps.index.length; i++) pIdx[Ps.index[i]] = i;
    var flags = [];
    for (i = 0; i < V.values.length; i++) {
      if (!Ps) flags.push("");
      else if (!has(pIdx, V.index[i])) flags.push(" new");
      else flags.push(Ps.values[pIdx[V.index[i]]] !== V.values[i] ? " chg" : "");
    }
    var lenChg = Ps && (Ps.len != null ? Ps.len : Ps.values.length) !== n;
    var nums = [], ok = V.values.length > 0 && !/^(object|string|bool|category)/.test(V.dtype);
    for (i = 0; ok && i < V.values.length; i++) {
      var f = parseFloat(V.values[i]);
      if (!isFinite(f)) ok = false; else nums.push(f);
    }
    var h = dfMeta("Series", t("items", { n: n }), lenChg ? t("was") + " " + (Ps.len != null ? Ps.len : Ps.values.length) : "",
                   lenChg ? " chg" : "", '<span class="badge dt">' + esc(V.dtype) + "</span>" + (V.name != null ? '<span class="badge nm">' + esc(V.name) + "</span>" : ""));
    if (viz === "bars" && ok) {
      h += barsHtml(nums, V.index, flags, null);
    } else {
      h += '<div class="scroll" data-keep="ser"><table class="dft"><thead><tr class="hd"><th class="ix">' + esc(V.index_name || "") +
           "</th><th>" + esc(V.name != null ? V.name : "") + '</th></tr><tr class="dt"><th class="ix"></th><th>' + esc(V.dtype) + "</th></tr></thead><tbody>";
      for (i = 0; i < V.values.length; i++) {
        var cls = (ok ? "n" : "s") + (NA_RE.test(V.values[i]) ? " na" : "") + flags[i];
        var vs = cellShow(V.values[i], ok);
        h += '<tr class="' + (flags[i] === " new" ? "new" : "") + '"><th class="ix">' + esc(V.index[i]) + '</th><td class="' + cls + vs[1] + '">' + vs[0] + "</td></tr>";
      }
      h += "</tbody></table></div>";
    }
    if (n > V.values.length) h += '<div class="dfnote">' + esc(t("moreRows", { n: n - V.values.length })) + "</div>";
    return { label: "Series · " + V.dtype, html: h };
  }

  /* ------------------------------------------------------------ spreadsheet / flow */

  function colLetter(i) {
    var s = "";
    i++;
    while (i > 0) { var r = (i - 1) % 26; s = String.fromCharCode(65 + r) + s; i = Math.floor((i - 1) / 26); }
    return s;
  }

  function colIndex(letters) {
    var n = 0;
    for (var i = 0; i < letters.length; i++) n = n * 26 + (letters.charCodeAt(i) - 64);
    return n - 1;
  }

  function refCells(ref, set) {
    var m = /^([A-Z]+)(\d+)(?::([A-Z]+)(\d+))?$/.exec(ref);
    if (!m) return;
    var c1 = colIndex(m[1]), r1 = parseInt(m[2], 10), c2 = m[3] ? colIndex(m[3]) : c1, r2 = m[4] ? parseInt(m[4], 10) : r1;
    for (var c = Math.min(c1, c2); c <= Math.max(c1, c2); c++) {
      for (var r = Math.min(r1, r2); r <= Math.max(r1, r2); r++) set[colLetter(c) + r] = true;
    }
  }

  function sheetRows(V) {
    var rows = [];
    if (V.cols && V.cols.length) rows.push(V.cols);
    for (var i = 0; i < (V.rows || []).length; i++) rows.push(V.rows[i]);
    return rows;
  }

  function bodySheet(V, P) {
    var rows = sheetRows(V), prows = (P && P.t === "sheet") ? sheetRows(P) : null;
    var hl = {}, i, j, ncol = 0;
    for (i = 0; i < (V.hl || []).length; i++) refCells(V.hl[i], hl);
    var active = V.active || (V.hl && V.hl.length ? V.hl[0].split(":")[0] : "");
    for (i = 0; i < rows.length; i++) ncol = Math.max(ncol, rows[i].length);
    var hasHeader = !!(V.cols && V.cols.length);
    var h = '<div class="fbar"><span class="fname">' + esc(active) + '</span><span class="ffx">fx</span><span class="ftxt">' +
            esc(V.formula || "") + "</span>";
    if (V.result !== undefined && V.result !== null && V.result !== "") {
      h += '<span class="fres" title="' + esc(t("result")) + '">= ' + esc(V.result) + "</span>";
    }
    h += '</div><div class="scroll" data-keep="sheet"><table class="sheet"><thead><tr><th class="corner"></th>';
    for (j = 0; j < ncol; j++) h += "<th>" + colLetter(j) + "</th>";
    h += "</tr></thead><tbody>";
    for (i = 0; i < rows.length; i++) {
      h += '<tr class="' + (hasHeader && i === 0 ? "hdr" : "") + '"><th>' + (i + 1) + "</th>";
      for (j = 0; j < ncol; j++) {
        var val = rows[i][j], ref = colLetter(j) + (i + 1), cls = "";
        val = val === undefined || val === null ? "" : String(val);
        if (has(hl, ref)) cls += " sel";
        if (ref === active) cls += " act";
        if (prows) {
          var pv = prows[i] && prows[i][j] !== undefined && prows[i][j] !== null ? String(prows[i][j]) : "";
          if (pv !== val) cls += " chg";
        }
        if (/^-?[\d.,]+%?$/.test(val)) cls += " n";
        h += '<td class="' + cls + '" data-ref="' + ref + '">' + esc(val) + "</td>";
      }
      h += "</tr>";
    }
    h += "</tbody></table></div>";
    return { label: "sheet", html: h };
  }

  function bodyFlow(V, P) {
    var nodes = V.nodes || [], act = V.active, h = '<div class="flow">', i, lab;
    var pact = (P && P.t === "flow") ? P.active : undefined;
    for (i = 0; i < nodes.length; i++) {
      lab = typeof nodes[i] === "string" ? nodes[i] : (nodes[i].label || nodes[i].en || "");
      if (i) h += '<span class="fa" aria-hidden="true">▸</span>';
      h += '<div class="fn' + (i === act ? " act" : i < act ? " done" : "") + (pact !== undefined && i === act && pact !== act ? " chg" : "") + '"' +
           (i === act ? ' aria-current="step"' : "") + '><span class="fi">' + (i + 1) + '</span><span class="fl">' + esc(lab) + "</span></div>";
    }
    return { label: "pipeline", html: h + "</div>" };
  }

  /* ------------------------------------------------------------ lists / dicts / objects */

  function bodyList(name, V, P, env, viz) {
    var items = V.v || [], label = listLabel(V);
    var Pl = (P && P.t === "list") ? P : undefined;
    var allScalar = every(items, isScalar), i;
    if (viz === "tree") return { label: label, html: treeHtml(name, V, P) };
    var matrix = items.length > 0 && every(items, function (r) { return r.t === "list" && every(r.v, isScalar); });
    if (matrix) return { label: label, html: gridHtml(items, Pl) };
    var records = items.length > 0 && every(items, function (x) {
      return x.t === "dict" && every(x.v, function (kv) { return kv[0].t === "str" && isScalar(kv[1]); });
    });
    if ((viz === "table" || !viz) && records) {
      return { label: (V.ty || V.kind || "list") + " · " + t("items", { n: V.n != null ? V.n : items.length }) + " (dict)", html: recordsHtml(V, Pl ? P : undefined) };
    }
    if (allScalar) {
      var ptrs = pointerMap(name, V, env);
      if (viz === "bars" && items.length && every(items, isNumeric)) {
        var vals = [], labels = [], flags = [];
        for (i = 0; i < items.length; i++) {
          vals.push(parseFloat(items[i].v));
          labels.push(String(i));
          flags.push(Pl ? (i < Pl.v.length ? flagOf(items[i], Pl.v[i]) : " new") : "");
        }
        return { label: label, html: barsHtml(vals, labels, flags, ptrs) };
      }
      return { label: label, html: cellsHtml(V, Pl, ptrs) };
    }
    return { label: label, html: treeHtml(name, V, P) };
  }

  function bodyDict(name, V, P, env, viz) {
    var n = V.n != null ? V.n : V.v.length;
    var label = (V.ty || "dict") + " · " + (n === 0 ? t("empty") : n === 1 ? t("key1") : t("keys", { n: n }));
    var Pd = (P && P.t === "dict") ? P : undefined, i;
    if (viz === "tree" || (viz !== "dict" && depthOf(V) >= 3)) return { label: label, html: treeHtml(name, V, P) };
    if (viz === "bars" && V.v.length && every(V.v, function (kv) { return isNumeric(kv[1]); })) {
      var vals = [], labs = [], flags = [];
      for (i = 0; i < V.v.length; i++) {
        vals.push(parseFloat(V.v[i][1].v));
        labs.push(V.v[i][0].t === "str" ? V.v[i][0].v : scalarText(V.v[i][0]));
        var pv = Pd ? dictLookup(Pd, V.v[i][0]) : undefined;
        flags.push(flagOf(V.v[i][1], pv));
      }
      return { label: label, html: barsHtml(vals, labs, flags, null) };
    }
    if (!V.v.length) return { label: label, html: '<span class="empty-note">' + esc(t("empty")) + "</span>" };
    return { label: label, html: '<div class="scroll" data-keep="kv">' + kvHtml(V.v, Pd, "dict", 0) + "</div>" +
             (V.more ? '<div class="dfnote">' + esc(t("moreItems", { n: n - V.v.length })) + "</div>" : "") };
  }

  function bodyObj(V, P) {
    var Po = (P && P.t === "obj") ? P : undefined;
    return { label: V.cls, html: '<div class="scroll" data-keep="obj">' + kvHtml(V.v, Po, "obj", 0) + "</div>" };
  }

  function bodyFor(name, V, P, env) {
    var viz = env.viz ? env.viz[name] : undefined;
    switch (V.t) {
      case "list": return bodyList(name, V, P, env, viz);
      case "dict": return bodyDict(name, V, P, env, viz);
      case "df": return bodyDf(V, P);
      case "series": return bodySeries(V, P, viz);
      case "obj": return bodyObj(V, P);
      case "sheet": return bodySheet(V, P);
      case "flow": return bodyFlow(V, P);
    }
    return { label: V.t, html: '<span class="iv rep">' + esc(summary(V, 80)) + "</span>" };
  }

  /* one variable: scalars become chips, everything else a wide card */
  function varHtml(name, V, P, env) {
    V = normV(V);
    var fl = P === undefined ? "" : (P === null ? " new" : (same(V, P) ? "" : " chg"));
    if (isScalar(V)) {
      var txt = scalarText(V);
      return '<div class="vc sc' + fl + (txt.length > 26 ? " long" : "") + '" data-var="' + esc(name) + '">' +
             '<span class="vn">' + esc(name) + '</span><span class="vv ' + valClass(V) + '">' + esc(txt) + "</span>" +
             '<span class="vt">' + esc(typeTag(V)) + "</span></div>";
    }
    var b;
    try { b = bodyFor(name, V, P === null ? undefined : P, env); } catch (e) {
      b = { label: V.t, html: '<span class="iv rep">' + esc(summary(V, 80)) + "</span>" };
    }
    return '<div class="vc wide t-' + esc(V.t) + fl + '" data-var="' + esc(name) + '">' +
           '<div class="vh"><span class="vn">' + esc(name) + '</span><span class="vk">' + esc(b.label) + "</span></div>" +
           '<div class="vb">' + b.html + "</div></div>";
  }

  function blockHtml(vars, prevVars, spec, emptyKey) {
    var names = keysOf(vars || {});
    if (!names.length) return '<div class="vitems"><span class="empty-note">' + esc(t(emptyKey)) + "</span></div>";
    var env = { viz: spec.viz || {}, pointers: spec.pointers, siblings: {} }, i;
    for (i = 0; i < names.length; i++) env.siblings[names[i]] = normV(vars[names[i]]);
    var h = '<div class="vitems" dir="ltr">';
    for (i = 0; i < names.length; i++) {
      var P;
      if (!prevVars) P = undefined;
      else P = has(prevVars, names[i]) ? normV(prevVars[names[i]]) : null;
      try {
        h += varHtml(names[i], vars[names[i]], P, env);
      } catch (e) {
        h += '<div class="vc sc chg"><span class="vn">' + esc(names[i]) + '</span><span class="vv rep">?</span></div>';
      }
    }
    return h + "</div>";
  }

  /* ------------------------------------------------------------ call stack */

  function stackHtml(step, prevStep) {
    var st = step.stack || [], h = "", k, i;
    if (!st.length) return '<span class="empty-note">—</span>';
    var prevIds = {};
    if (prevStep && prevStep.stack) {
      for (i = 0; i < prevStep.stack.length; i++) prevIds[(prevStep.stack[i].fid != null ? prevStep.stack[i].fid : prevStep.stack[i].fn + "#" + i)] = true;
    }
    h = '<div class="stk" dir="ltr">';
    for (k = st.length - 1; k >= 0; k--) {
      var fr = st[k], top = k === st.length - 1;
      var id = fr.fid != null ? fr.fid : fr.fn + "#" + k;
      var isMod = fr.fn === "<module>";
      var args = [], an, argTxt = "";
      if (fr.args) {
        for (an in fr.args) if (has(fr.args, an)) args.push(esc(an) + '=<span class="sa ' + valClass(normV(fr.args[an])) + '">' + esc(summary(normV(fr.args[an]), 26)) + "</span>");
      }
      if (!isMod) argTxt = "(" + args.join(", ") + ")";
      var cls = "fr" + (top ? " top" : "") + (isMod ? " mod" : "") + (prevStep && !has(prevIds, id) ? " new" : "") +
                (top && step.error ? " err" : "") + (top && step.ret ? " ret" : "");
      h += '<div class="' + cls + '"><div class="fhd"><span class="fnm">' + (isMod ? '<span class="fmod">' + esc(t("main")) + "</span>" : esc(fr.fn)) +
           '</span><span class="fag">' + argTxt + '</span>' + (fr.line != null ? '<span class="fln">' + esc(t("line", { n: fr.line })) + "</span>" : "") + "</div>";
      if (top && step.ret) {
        h += '<div class="frv"><span class="frl">' + esc(t("returns")) + '</span> <span class="frx ' + valClass(normV(step.ret)) + '">' +
             esc(summary(normV(step.ret), 60)) + "</span></div>";
      }
      h += "</div>";
    }
    return h + "</div>";
  }

  /* ------------------------------------------------------------ mount */

  function intro(spec) {
    return "<h4>" + bi(spec.title) + "</h4>" + (spec.lede ? '<p class="lede">' + bi(spec.lede) + "</p>" : "");
  }

  function mount(host, spec) {
    try {
      return mountInner(host, spec);
    } catch (e) {
      host.className = "trace";
      host.innerHTML = '<div class="trace-fail" role="alert">' + esc(t("failed")) + " <code>" + esc(e && e.message ? e.message : e) + "</code></div>";
      return { render: function () {}, go: function () {}, stop: function () {} };
    }
  }

  function mountInner(host, spec) {
    var steps = [], i;
    for (i = 0; i < (spec.steps || []).length; i++) if (spec.steps[i] && typeof spec.steps[i] === "object") steps.push(spec.steps[i]);
    var code = String(spec.code || "").replace(/\s+$/, "");
    var lg = spec.lang || "python";
    var codeLines = code ? paintLines(code, lg) : [];
    var at = 0, timer = null, speed = 1;

    var layout = spec.layout || host.getAttribute("data-layout") || "";
    host.className = "trace" + (codeLines.length ? "" : " nocode") + (lg === "text" ? " prose" : "") + (layout === "stack" ? " stack" : "");
    host.setAttribute("data-trace", spec.id || "");
    host.setAttribute("tabindex", "0");
    host.setAttribute("role", "group");

    var hasStack = false, hasLocals = false, hasOut = false;
    for (i = 0; i < steps.length; i++) {
      if (steps[i].stack && steps[i].stack.length > 1) hasStack = true;
      if (steps[i].locals) hasLocals = true;
      if (steps[i].out) hasOut = true;
    }
    if (hasLocals) hasStack = true;

    host.innerHTML = intro(spec) +
      '<div class="trace-grid">' +
        '<div class="trace-left">' +
          '<div class="trace-codewrap"><pre class="trace-code" dir="ltr"></pre></div>' +
          '<div class="trace-note" aria-live="polite"><h5 data-t="note"></h5><div class="trace-note-body"></div></div>' +
        "</div>" +
        '<div class="trace-side">' +
          '<div class="trace-pane p-vars"><h5><span data-t="vars"></span><span class="legend" title="" data-title="legend">' +
            '<i class="sw new"></i><span data-t="lnew"></span><i class="sw chg"></i><span data-t="lchg"></span></span></h5>' +
            '<div class="sub pv-gsub" hidden><span class="subt" data-t="globals"></span></div>' +
            '<div class="pv-globals"></div><div class="pv-locals"></div></div>' +
          (hasStack ? '<div class="trace-pane p-stack"><h5 data-t="stack"></h5><div class="trace-stack"></div></div>' : "") +
          (hasOut ? '<div class="trace-pane p-out"><h5 data-t="out"></h5><pre class="trace-out" dir="ltr"></pre></div>' : "") +
        "</div>" +
      "</div>" +
      '<div class="trace-ctrl">' +
        '<button type="button" class="btn" data-a="reset" data-t="start"></button>' +
        '<button type="button" class="btn" data-a="prev" data-t="prev"></button>' +
        '<button type="button" class="btn primary" data-a="next" data-t="next"></button>' +
        '<button type="button" class="btn" data-a="play" data-t="play"></button>' +
        '<label class="speedl"><span data-t="speed"></span> <select class="trace-speed" data-a-sel="speed">' +
          '<option value="0.5">0.5×</option><option value="1" selected>1×</option><option value="2">2×</option></select></label>' +
        '<span class="step" aria-live="off"></span>' +
        '<input class="trace-scrub" type="range" min="0" value="0" data-t-aria="scrub">' +
      "</div>";

    var codeEl = host.querySelector(".trace-code");
    var gEl = host.querySelector(".pv-globals");
    var lEl = host.querySelector(".pv-locals");
    var gsubEl = host.querySelector(".pv-gsub");
    var stEl = host.querySelector(".trace-stack");
    var outEl = host.querySelector(".trace-out");
    var noteEl = host.querySelector(".trace-note-body");
    var noteBox = host.querySelector(".trace-note");
    var stepEl = host.querySelector(".step");
    var scrub = host.querySelector(".trace-scrub");
    var speedEl = host.querySelector(".trace-speed");
    scrub.max = String(Math.max(0, steps.length - 1));

    /* static code body; only row classes change per step */
    var rows = "", firstVisit = {}, hasStep = {};
    for (i = 0; i < steps.length; i++) {
      var ln = steps[i].line;
      if (ln != null) { hasStep[ln] = true; if (!has(firstVisit, ln)) firstVisit[ln] = i; }
    }
    for (i = 0; i < codeLines.length; i++) {
      rows += '<div class="row' + (hasStep[i + 1] ? " go" : "") + '" data-line="' + (i + 1) + '"' +
              (hasStep[i + 1] ? ' title="' + esc(t("clickline")) + '"' : "") + '><span class="ln">' + (i + 1) +
              '</span><span class="lx">' + (codeLines[i] || " ") + "</span></div>";
    }
    codeEl.innerHTML = '<div class="rows">' + rows + "</div>";
    var rowEls = codeEl.querySelectorAll(".row");

    function labels() {
      var ls = host.querySelectorAll("[data-t]"), j, k;
      for (j = 0; j < ls.length; j++) {
        k = ls[j].getAttribute("data-t");
        if (k === "play") ls[j].textContent = timer ? t("pause") : t("play");
        else if (spec.labels && spec.labels[k] && typeof spec.labels[k] === "object") ls[j].textContent = pick(spec.labels[k]);
        else if (UI[k]) ls[j].textContent = t(k);
      }
      var tl = host.querySelectorAll("[data-title]");
      for (j = 0; j < tl.length; j++) tl[j].setAttribute("title", t(tl[j].getAttribute("data-title")));
      var rg = codeEl.querySelectorAll(".row.go");
      for (j = 0; j < rg.length; j++) rg[j].setAttribute("title", t("clickline"));
      scrub.setAttribute("aria-label", t("scrub"));
      speedEl.setAttribute("aria-label", t("speed"));
      host.setAttribute("aria-label", pick(spec.title) || t("aria"));
    }

    function prevLocalsStep(n) {
      var cur = steps[n], j;
      if (cur.fid != null) {
        for (j = n - 1; j >= 0; j--) if (steps[j].fid === cur.fid) return steps[j];
        return null;
      }
      return n > 0 && steps[n - 1].frame === cur.frame ? steps[n - 1] : null;
    }

    function keepScroll(root, fn) {
      var saved = {}, els = root.querySelectorAll("[data-keep]"), j, key;
      for (j = 0; j < els.length; j++) {
        var holder = els[j].closest ? els[j].closest(".vc") : null;
        key = (holder ? holder.getAttribute("data-var") : "") + "|" + els[j].getAttribute("data-keep");
        saved[key] = [els[j].scrollLeft, els[j].scrollTop];
      }
      fn();
      els = root.querySelectorAll("[data-keep]");
      for (j = 0; j < els.length; j++) {
        var h2 = els[j].closest ? els[j].closest(".vc") : null;
        key = (h2 ? h2.getAttribute("data-var") : "") + "|" + els[j].getAttribute("data-keep");
        if (has(saved, key)) { els[j].scrollLeft = saved[key][0]; els[j].scrollTop = saved[key][1]; }
      }
    }

    function render() {
      var s = steps[at];
      if (!s) {
        noteEl.innerHTML = '<span class="muted">' + esc(t("badstep")) + "</span>";
        labels();
        return;
      }
      var prev = at > 0 ? steps[at - 1] : null;
      var j;

      /* ---- code pane ---- */
      var cur = s.line, nowEl = null;
      for (j = 0; j < rowEls.length; j++) {
        var n = j + 1, el = rowEls[j];
        var isNow = n === cur;
        el.className = "row" + (hasStep[n] ? " go" : "") + (isNow ? " now" + (s.end ? " fin" : "") + (s.error ? " err" : "") :
                       (has(firstVisit, n) && firstVisit[n] < at ? " seen" : ""));
        if (isNow) nowEl = el;
      }
      if (nowEl) {
        var top = nowEl.offsetTop, bottom = top + nowEl.offsetHeight;
        var vt = codeEl.scrollTop, vb = vt + codeEl.clientHeight;
        if (top < vt + 4 || bottom > vb - 4) codeEl.scrollTop = Math.max(0, top - codeEl.clientHeight / 2 + nowEl.offsetHeight / 2);
      }

      /* ---- variables ---- */
      try {
        keepScroll(gEl, function () { gEl.innerHTML = blockHtml(s.vars || {}, prev ? (prev.vars || {}) : null, spec, "none"); });
        if (s.locals) {
          var pl = prevLocalsStep(at);
          var fn = s.frame || (s.stack && s.stack.length ? s.stack[s.stack.length - 1].fn : "");
          keepScroll(lEl, function () {
            lEl.innerHTML = '<div class="sub"><span class="subt">' + esc(t("locals", { fn: fn })) + "</span></div>" +
                            blockHtml(s.locals, pl ? (pl.locals || {}) : null, spec, "nolocal");
          });
          lEl.hidden = false;
          gsubEl.hidden = false;
        } else {
          lEl.innerHTML = "";
          lEl.hidden = true;
          gsubEl.hidden = true;
        }
      } catch (e1) {
        gEl.innerHTML = '<div class="trace-fail">' + esc(t("badstep")) + "</div>";
      }

      /* ---- call stack ---- */
      if (stEl) {
        try { stEl.innerHTML = stackHtml(s, prev); } catch (e2) { stEl.innerHTML = ""; }
      }

      /* ---- output ---- */
      var o = s.out || "";
      if (!outEl) {
        /* no step prints anything: the panel is not drawn */
      } else if (o) {
        var po = prev && prev.out ? prev.out : "";
        if (prev && o.length > po.length && o.indexOf(po) === 0) {
          outEl.innerHTML = esc(po) + '<span class="newout">' + esc(o.slice(po.length)) + "</span>";
        } else {
          outEl.textContent = o;
        }
        outEl.scrollTop = outEl.scrollHeight;
      } else {
        outEl.innerHTML = '<span class="muted">' + esc(t("noout")) + "</span>";
      }

      /* ---- note ---- */
      var nh = "";
      if (s.error) {
        nh += '<div class="errline"><b>' + esc(s.error.type || t("err")) + "</b>" + (s.error.msg ? ": <code>" + esc(s.error.msg) + "</code>" : "") + "</div>";
      }
      if (s.note) {
        nh += "<div>" + (typeof s.note === "string" ? esc(s.note) : pick(s.note)) + "</div>";
      } else if (s.end) {
        nh += "<div>" + esc(t("done")) + "</div>";
      } else if (s.ret) {
        nh += "<div>" + esc(t("retnote", { fn: s.frame || "", v: summary(normV(s.ret), 40) })) + "</div>";
      } else if (!s.error) {
        nh += '<div class="muted">' + esc(t("about", { n: s.line == null ? "" : s.line })) + "</div>";
      }
      noteEl.innerHTML = nh;

      stepEl.textContent = t("step", { a: at + 1, b: steps.length });
      scrub.value = String(at);
      host.querySelector('[data-a="prev"]').disabled = at === 0;
      host.querySelector('[data-a="next"]').disabled = at >= steps.length - 1;
      host.setAttribute("data-step", String(at));
      labels();
    }

    function go(n) {
      at = Math.max(0, Math.min(steps.length - 1, n));
      render();
    }

    function stop() {
      if (timer) { clearInterval(timer); timer = null; }
      noteBox.setAttribute("aria-live", "polite");
      labels();
    }

    function startTimer() {
      if (timer) clearInterval(timer);
      timer = setInterval(function () {
        if (at >= steps.length - 1) { stop(); return; }
        go(at + 1);
      }, 1400 / speed);
    }

    function play() {
      if (timer) { stop(); return; }
      if (at >= steps.length - 1) at = 0;
      noteBox.setAttribute("aria-live", "off");
      startTimer();
      go(at);
    }

    host.addEventListener("click", function (e) {
      var n = e.target;
      while (n && n !== host && !(n.getAttribute && n.getAttribute("data-a"))) n = n.parentNode;
      if (!n || n === host) return;
      var a = n.getAttribute("data-a");
      if (a === "next")  { stop(); go(at + 1); }
      if (a === "prev")  { stop(); go(at - 1); }
      if (a === "reset") { stop(); go(0); }
      if (a === "play")  { play(); }
    });

    speedEl.addEventListener("change", function () {
      speed = parseFloat(speedEl.value) || 1;
      if (timer) startTimer();
    });

    scrub.addEventListener("input", function () {
      stop();
      go(parseInt(scrub.value, 10) || 0);
    });

    codeEl.addEventListener("click", function (e) {
      var n = e.target;
      while (n && n !== codeEl && !(n.getAttribute && n.getAttribute("data-line"))) n = n.parentNode;
      if (!n || n === codeEl) return;
      var want = parseInt(n.getAttribute("data-line"), 10);
      for (var j = 0; j < steps.length; j++) {
        var probe = (at + 1 + j) % steps.length;
        if (steps[probe].line === want) { stop(); go(probe); return; }
      }
    });

    host.addEventListener("keydown", function (e) {
      var tg = e.target && e.target.tagName;
      if (tg === "INPUT" || tg === "SELECT" || tg === "TEXTAREA") return;
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      var rtl = document.documentElement.getAttribute("dir") === "rtl";
      var k = e.key;
      if (k === "ArrowRight" || k === "ArrowLeft") {
        var fwd = (k === "ArrowRight") !== rtl;
        stop(); go(at + (fwd ? 1 : -1));
        e.preventDefault();
      } else if (k === "Home") {
        stop(); go(0); e.preventDefault();
      } else if (k === "End") {
        stop(); go(steps.length - 1); e.preventDefault();
      } else if ((k === " " || k === "Spacebar") && tg !== "BUTTON") {
        play(); e.preventDefault();
      }
    });

    if (!steps.length) {
      host.querySelector(".trace-grid").innerHTML = '<div class="trace-fail">' + esc(t("badstep")) + "</div>";
    }
    labels();
    render();
    return { render: render, go: go, stop: stop, get step() { return at; } };
  }

  /* ------------------------------------------------------------ page glue */

  var mounted = [];

  /* Re-label every mounted trace when the language flips. */
  function relabel() {
    for (var i = 0; i < mounted.length; i++) {
      try { mounted[i].render(); } catch (e) {}
    }
  }

  function mountAll(scope) {
    var hosts = (scope || document).querySelectorAll("[data-trace-id]");
    for (var i = 0; i < hosts.length; i++) {
      var host = hosts[i];
      if (host.getAttribute("data-mounted")) continue;
      var spec = (window.DATraces || {})[host.getAttribute("data-trace-id")];
      if (!spec) continue;
      host.setAttribute("data-mounted", "1");
      mounted.push(mount(host, spec));
    }
  }

  document.addEventListener("da:lang", relabel);

  window.DATrace = { mount: mount, mountAll: mountAll, relabel: relabel };
})();
