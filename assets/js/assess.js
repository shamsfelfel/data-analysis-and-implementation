/* ============================================================
   Assessment engine.

   Question banks are data (src/data/*.js -> window.DABanks);
   this file turns them into cards, grades them, remembers the
   answers and reports which topics are weak.

   Eleven authored question types ride on five interaction
   primitives, so there are five widgets and not eleven:

     choice   mcq · multi · tf · compare · complete · output(choice)
     text     fill · output(typed) · trace(value)
     order    order
     match    match
     pickline error

   Every card shows its own difficulty and the topics it covers,
   each topic linking back to the exact heading that teaches it.
   Explanation and worked solution are <details>, closed on load.
   ============================================================ */
(function () {
  "use strict";

  /* ---------------------------------------------------------- i18n */

  var UI = {
    check:    { en: "Check", ar: "تحقّق" },
    recheck:  { en: "Check again", ar: "أعد التحقّق" },
    showme:   { en: "Show the answer", ar: "أظهر الجواب" },
    clear:    { en: "Clear", ar: "أفرغ" },
    why:      { en: "Why", ar: "لماذا" },
    sol:      { en: "Worked solution", ar: "الحل المفصّل" },
    ok:       { en: "Correct.", ar: "صحيح." },
    no:       { en: "Not right.", ar: "غير صحيح." },
    part:     { en: "Partly right — {a} of {b} pieces.", ar: "صحيح جزئيًا — {a} من {b}." },
    revealed: { en: "Answer shown — this one is not counted.", ar: "تم إظهار الجواب — لا تُحسب هذه." },
    pickone:  { en: "Choose an answer first.", ar: "اختر جوابًا أولًا." },
    typeone:  { en: "Type an answer first.", ar: "اكتب جوابًا أولًا." },
    orderall: { en: "Place every line first.", ar: "ضع كل السطور أولًا." },
    matchall: { en: "Match every pair first.", ar: "وصّل كل الأزواج أولًا." },
    pickline: { en: "Click the line you think is wrong.", ar: "انقر السطر الذي تظنه خطأ." },
    covers:   { en: "Covers:", ar: "يغطي:" },
    tally:    { en: "<b>{d}</b> of <b>{t}</b> answered &middot; <b>{r}</b> correct",
                ar: "أُجيب عن <b>{d}</b> من <b>{t}</b> &middot; <b>{r}</b> صحيحة" },
    checkall: { en: "Check everything", ar: "تحقّق من الكل" },
    resetall: { en: "Start over", ar: "ابدأ من جديد" },
    all:      { en: "All", ar: "الكل" },
    lvEasy:   { en: "Easy", ar: "سهل" },
    lvMedium: { en: "Medium", ar: "متوسط" },
    lvHard:   { en: "Hard", ar: "صعب" },
    unseen:   { en: "Unanswered", ar: "بلا إجابة" },
    missed:   { en: "Missed", ar: "الأخطاء" },
    resTitle: { en: "Your result", ar: "نتيجتك" },
    resSub:   { en: "{r} correct out of {t} answered ({p}%).",
                ar: "{r} صحيحة من {t} مُجابة ({p}%)." },
    byLevel:  { en: "By difficulty", ar: "حسب المستوى" },
    byTopic:  { en: "By topic", ar: "حسب الموضوع" },
    weak:     { en: "Worth re-reading before you move on",
                ar: "يستحق إعادة القراءة قبل أن تكمل" },
    strongAll:{ en: "Nothing stands out as weak. Go on to the next lesson.",
                ar: "لا يوجد ضعف واضح. تابع إلى الدرس التالي." },
    level:    { en: "Level", ar: "المستوى" },
    topic:    { en: "Topic", ar: "الموضوع" },
    right:    { en: "Correct", ar: "صحيح" },
    asked:    { en: "Asked", ar: "المطروح" },
    yourpick: { en: "Your answer", ar: "جوابك" },
    correctis:{ en: "Correct answer", ar: "الجواب الصحيح" },
    blank:    { en: "blank {n}", ar: "الفراغ {n}" },
    codeA:    { en: "Version A", ar: "النسخة أ" },
    codeB:    { en: "Version B", ar: "النسخة ب" },
    pool:     { en: "Available lines", ar: "السطور المتاحة" },
    slots:    { en: "Your order", ar: "ترتيبك" },
    trueL:    { en: "True", ar: "صح" },
    falseL:   { en: "False", ar: "خطأ" },
    outHint:  { en: "Type exactly what the program prints, one line per line of output.",
                ar: "اكتب ما يطبعه البرنامج بالضبط، سطرًا لكل سطر مُخرَج." }
  };

  var TYPES = {
    mcq:      { en: "Multiple choice",         ar: "اختيار من متعدد" },
    multi:    { en: "Choose all that apply",   ar: "اختر كل ما ينطبق" },
    tf:       { en: "True / False",            ar: "صح أو خطأ" },
    fill:     { en: "Fill in the blank",       ar: "أكمل الفراغ" },
    order:    { en: "Put in order",            ar: "رتّب الخطوات" },
    match:    { en: "Match the pairs",         ar: "وصّل بين العمودين" },
    error:    { en: "Find the error",          ar: "اعثر على الخطأ" },
    complete: { en: "Complete the code",       ar: "أكمل الكود" },
    compare:  { en: "Compare two versions",    ar: "قارن بين نسختين" },
    output:   { en: "Write the output",        ar: "اكتب المُخرَج" },
    trace:    { en: "Trace the value",         ar: "تتبّع القيمة" }
  };

  var LEVELS = {
    easy:   { en: "Easy",   ar: "سهل" },
    medium: { en: "Medium", ar: "متوسط" },
    hard:   { en: "Hard",   ar: "صعب" }
  };

  function lang() {
    return document.documentElement.getAttribute("lang") === "ar" ? "ar" : "en";
  }
  function L(k) { return (UI[k] || { en: k, ar: k })[lang()]; }
  /* Both languages as spans, for labels that are written into markup
     once and must survive a language switch without being re-rendered. */
  function LB(k) {
    var o = UI[k] || { en: k, ar: k };
    return '<span class="en">' + o.en + '</span><span class="ar">' + o.ar + "</span>";
  }
  function pick(o) { return o ? (o[lang()] || o.en || "") : ""; }

  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function bi(o) {
    if (!o) return "";
    if (typeof o === "string") return esc(o);
    return '<span class="en">' + (o.en || "") + "</span>" +
           '<span class="ar">' + (o.ar || "") + "</span>";
  }
  function codeBlock(src, extra) {
    return '<pre class="code' + (extra ? " " + extra : "") + '"><code>' +
           esc(String(src).replace(/^\n/, "").replace(/\s+$/, "")) + "</code></pre>";
  }

  /* ---------------------------------------------------------- storage */

  function load(key) {
    try {
      var raw = localStorage.getItem("da.bank." + key);
      return raw ? JSON.parse(raw) : {};
    } catch (e) { return {}; }
  }
  function save(key, obj) {
    try { localStorage.setItem("da.bank." + key, JSON.stringify(obj)); } catch (e) {}
  }

  /* ---------------------------------------------------------- topics */

  /* A topic chip links to the heading that teaches the idea. That
     heading now lives on another page, so the anchor id is resolved
     through the map the build writes (assets/js/anchors.js) and
     prefixed with the path back to the site root. An id the map does
     not know is left as a plain in-page anchor rather than dropped,
     so a half-built chapter still renders. */
  function topicHref(anchor) {
    var map = window.DAAnchors || {};
    var page = map[anchor];
    if (!page) return "#" + anchor;
    var here = (document.body && document.body.getAttribute("data-path")) || "";
    if (page === here) return "#" + anchor;
    return (window.DA_BASE || "") + page + "#" + anchor;
  }

  function topicChips(ids) {
    var reg = window.DATopics || {};
    if (!ids || !ids.length) return "";
    var h = '<div class="qtopics"><span>' + LB("covers") + "</span>";
    for (var i = 0; i < ids.length; i++) {
      var t = reg[ids[i]];
      if (!t) continue;
      h += '<a href="' + esc(topicHref(t.href)) + '">' + bi(t) + "</a>";
    }
    return h + "</div>";
  }

  /* ---------------------------------------------------------- helpers */

  function normLine(s) {
    return String(s == null ? "" : s).replace(/\s+/g, " ").trim();
  }
  function normOut(s) {
    var rows = String(s == null ? "" : s).replace(/\r/g, "").split("\n");
    var out = [];
    for (var i = 0; i < rows.length; i++) out.push(rows[i].replace(/\s+$/, "").replace(/^\s+/, ""));
    while (out.length && out[out.length - 1] === "") out.pop();
    while (out.length && out[0] === "") out.shift();
    return out.join("\n");
  }
  function accepts(list, given, asOutput) {
    var g = asOutput ? normOut(given) : normLine(given);
    for (var i = 0; i < list.length; i++) {
      var w = asOutput ? normOut(list[i]) : normLine(list[i]);
      if (w === g) return true;
    }
    return false;
  }
  /* Deterministic per-question shuffle: the pool looks mixed but does
     not jump around when the card re-renders or the language flips. */
  function shuffled(n, seedText) {
    var idx = [], i;
    for (i = 0; i < n; i++) idx.push(i);
    var seed = 0;
    for (i = 0; i < seedText.length; i++) seed = (seed * 31 + seedText.charCodeAt(i)) % 2147483647;
    function rnd() { seed = (seed * 1103515245 + 12345) % 2147483647; return seed / 2147483647; }
    for (i = n - 1; i > 0; i--) {
      var j = Math.floor(rnd() * (i + 1));
      var tmp = idx[i]; idx[i] = idx[j]; idx[j] = tmp;
    }
    return idx;
  }

  /* ========================================================== widgets
     Each widget exposes the same contract:
       read()            -> payload or null when nothing is entered
       write(payload)    -> restore a payload
       grade(payload)    -> { right, got, total }
       mark(payload)     -> paint right/wrong on the controls
       reveal()          -> show the correct answer
       clear()           -> back to untouched
       lock(bool)        -> disable/enable input
       answerHtml()      -> the correct answer, for the verdict line
  */

  function wChoice(q, host) {
    var multi = q.type === "multi" || q.multi === true;
    var opts = q.options || [];
    var ans = multi ? (q.answer || []).slice().sort() : [q.answer];
    var order = q.noshuffle ? shuffled(opts.length, "x").sort(function (a, b) { return a - b; })
                            : shuffled(opts.length, q.id);
    var h = '<ul class="answers" data-multi="' + (multi ? 1 : 0) + '">';
    for (var i = 0; i < order.length; i++) {
      var oi = order[i];
      var o = opts[oi];
      var body = (typeof o === "object" && (o.en || o.ar)) ? bi(o)
               : (o && o.code) ? codeBlock(o.code) : esc(o);
      h += '<li><button type="button" class="opt" aria-pressed="false" data-i="' + oi + '">' +
           '<span class="tick"></span><span class="ob">' + body + "</span></button></li>";
    }
    host.innerHTML = h + "</ul>";
    var btns = host.querySelectorAll(".opt");

    host.addEventListener("click", function (e) {
      var n = e.target;
      while (n && n !== host && !n.classList.contains("opt")) n = n.parentNode;
      if (!n || n === host || n.disabled) return;
      var on = n.getAttribute("aria-pressed") === "true";
      if (!multi) {
        for (var i = 0; i < btns.length; i++) btns[i].setAttribute("aria-pressed", "false");
      }
      n.setAttribute("aria-pressed", on && multi ? "false" : (multi ? "true" : "true"));
      if (!multi) n.setAttribute("aria-pressed", "true");
      host.dispatchEvent(new CustomEvent("qtouch", { bubbles: true }));
    });

    function read() {
      var got = [];
      for (var i = 0; i < btns.length; i++) {
        if (btns[i].getAttribute("aria-pressed") === "true") {
          got.push(parseInt(btns[i].getAttribute("data-i"), 10));
        }
      }
      return got.length ? got.sort() : null;
    }
    return {
      read: read,
      write: function (p) {
        if (!p) return;
        for (var i = 0; i < btns.length; i++) {
          var at = parseInt(btns[i].getAttribute("data-i"), 10);
          btns[i].setAttribute("aria-pressed", p.indexOf(at) > -1 ? "true" : "false");
        }
      },
      grade: function (p) {
        p = p || [];
        var hit = 0, bad = 0, i;
        for (i = 0; i < p.length; i++) (ans.indexOf(p[i]) > -1 ? hit++ : bad++);
        return { right: hit === ans.length && bad === 0, got: Math.max(0, hit - bad), total: ans.length };
      },
      mark: function (p) {
        p = p || [];
        for (var i = 0; i < btns.length; i++) {
          var at = parseInt(btns[i].getAttribute("data-i"), 10);
          var isA = ans.indexOf(at) > -1, chose = p.indexOf(at) > -1;
          btns[i].classList.toggle("right", isA);
          btns[i].classList.toggle("wrong", chose && !isA);
        }
      },
      reveal: function () {
        for (var i = 0; i < btns.length; i++) {
          var at = parseInt(btns[i].getAttribute("data-i"), 10);
          btns[i].classList.toggle("right", ans.indexOf(at) > -1);
          btns[i].setAttribute("aria-pressed", ans.indexOf(at) > -1 ? "true" : "false");
        }
      },
      clear: function () {
        for (var i = 0; i < btns.length; i++) {
          btns[i].setAttribute("aria-pressed", "false");
          btns[i].classList.remove("right", "wrong");
        }
      },
      lock: function (on) {
        for (var i = 0; i < btns.length; i++) btns[i].disabled = !!on;
      },
      answerHtml: function () {
        var out = [];
        for (var i = 0; i < ans.length; i++) {
          var o = opts[ans[i]];
          out.push((typeof o === "object" && (o.en || o.ar)) ? bi(o)
                 : (o && o.code) ? "<code>" + esc(o.code) + "</code>" : esc(o));
        }
        return out.join(" &nbsp;+&nbsp; ");
      },
      empty: L("pickone")
    };
  }

  function wText(q, host) {
    var blanks = q.blanks || [];
    var asOutput = q.type === "output";
    var h = '<div class="fills">';
    if (asOutput) h += '<p class="fill-hint">' + LB("outHint") + "</p>";
    for (var i = 0; i < blanks.length; i++) {
      var b = blanks[i];
      var lab = b.label ? bi(b.label)
              : (blanks.length > 1 ? L("blank").replace("{n}", String(i + 1)) : "");
      h += '<div class="fill-row">' + (lab ? '<span class="lab">' + lab + "</span>" : "");
      if (b.lines) {
        h += '<textarea class="fillin" data-i="' + i + '" spellcheck="false" rows="' +
             b.lines + '"></textarea>';
      } else {
        h += '<input class="fillin' + (b.wide ? " wide" : "") + '" type="text" data-i="' + i +
             '" spellcheck="false" autocapitalize="off" autocorrect="off"' +
             (b.ph ? ' placeholder="' + esc(b.ph) + '"' : "") + ">";
      }
      h += "</div>";
      if (b.hint) h += '<p class="fill-hint">' + bi(b.hint) + "</p>";
    }
    host.innerHTML = h + "</div>";
    var ins = host.querySelectorAll(".fillin");
    host.addEventListener("input", function () {
      host.dispatchEvent(new CustomEvent("qtouch", { bubbles: true }));
    });

    function read() {
      var v = [], any = false;
      for (var i = 0; i < ins.length; i++) {
        v.push(ins[i].value);
        if (String(ins[i].value).trim()) any = true;
      }
      return any ? v : null;
    }
    return {
      read: read,
      write: function (p) {
        if (!p) return;
        for (var i = 0; i < ins.length && i < p.length; i++) ins[i].value = p[i];
      },
      grade: function (p) {
        p = p || [];
        var hit = 0;
        for (var i = 0; i < blanks.length; i++) {
          if (accepts(blanks[i].accept, p[i], asOutput || blanks[i].lines)) hit++;
        }
        return { right: hit === blanks.length, got: hit, total: blanks.length };
      },
      mark: function (p) {
        p = p || [];
        for (var i = 0; i < ins.length; i++) {
          var ok = accepts(blanks[i].accept, p[i], asOutput || blanks[i].lines);
          ins[i].classList.toggle("right", ok);
          ins[i].classList.toggle("wrong", !ok);
        }
      },
      reveal: function () {
        for (var i = 0; i < ins.length; i++) {
          ins[i].value = blanks[i].accept[0];
          ins[i].classList.add("right");
          ins[i].classList.remove("wrong");
        }
      },
      clear: function () {
        for (var i = 0; i < ins.length; i++) {
          ins[i].value = "";
          ins[i].classList.remove("right", "wrong");
        }
      },
      lock: function (on) {
        for (var i = 0; i < ins.length; i++) ins[i].readOnly = !!on;
      },
      answerHtml: function () {
        var out = [];
        for (var i = 0; i < blanks.length; i++) {
          out.push("<code>" + esc(blanks[i].accept[0]) + "</code>");
        }
        return out.join(blanks.length > 1 ? " &middot; " : "");
      },
      empty: L("typeone")
    };
  }

  function wOrder(q, host) {
    var items = q.items || [];
    var ans = q.answer || [];
    var order = shuffled(items.length, q.id + "o");

    host.innerHTML =
      '<p class="order-sep">' + LB("pool") + '</p><ul class="order-pool"></ul>' +
      '<p class="order-sep">' + LB("slots") + '</p><ul class="order-slots"></ul>';
    var pool = host.querySelector(".order-pool");
    var slots = host.querySelector(".order-slots");

    function cell(i) {
      var o = items[i];
      var body = (o && o.code) ? "<code>" + esc(o.code) + "</code>" : bi(o);
      return '<li><button type="button" data-i="' + i + '">' + body + "</button></li>";
    }
    function fill(seq) {
      var inSlots = seq || [];
      var ph = "", i;
      for (i = 0; i < inSlots.length; i++) ph += cell(inSlots[i]);
      slots.innerHTML = ph;
      var pl = "";
      for (i = 0; i < order.length; i++) {
        if (inSlots.indexOf(order[i]) === -1) pl += cell(order[i]);
      }
      pool.innerHTML = pl;
    }
    fill([]);

    host.addEventListener("click", function (e) {
      var n = e.target;
      while (n && n !== host && n.tagName !== "BUTTON") n = n.parentNode;
      if (!n || n === host || n.disabled) return;
      var i = parseInt(n.getAttribute("data-i"), 10);
      var cur = read() || [];
      if (n.parentNode.parentNode === slots) {
        cur.splice(cur.indexOf(i), 1);
      } else {
        cur.push(i);
      }
      fill(cur);
      host.dispatchEvent(new CustomEvent("qtouch", { bubbles: true }));
    });

    function read() {
      var bs = slots.querySelectorAll("button"), v = [];
      for (var i = 0; i < bs.length; i++) v.push(parseInt(bs[i].getAttribute("data-i"), 10));
      return v.length ? v : null;
    }
    return {
      read: read,
      write: function (p) { if (p) fill(p); },
      grade: function (p) {
        p = p || [];
        var hit = 0;
        for (var i = 0; i < ans.length; i++) if (p[i] === ans[i]) hit++;
        return { right: hit === ans.length && p.length === ans.length, got: hit, total: ans.length };
      },
      mark: function (p) {
        p = p || [];
        var bs = slots.querySelectorAll("button");
        for (var i = 0; i < bs.length; i++) {
          var ok = p[i] === ans[i];
          bs[i].classList.toggle("right", ok);
          bs[i].classList.toggle("wrong", !ok);
        }
      },
      reveal: function () {
        fill(ans.slice());
        var bs = slots.querySelectorAll("button");
        for (var i = 0; i < bs.length; i++) bs[i].classList.add("right");
      },
      clear: function () { fill([]); },
      lock: function (on) {
        var bs = host.querySelectorAll("button");
        for (var i = 0; i < bs.length; i++) bs[i].disabled = !!on;
      },
      answerHtml: function () {
        var out = [];
        for (var i = 0; i < ans.length; i++) {
          var o = items[ans[i]];
          out.push((i + 1) + ". " + ((o && o.code) ? "<code>" + esc(o.code) + "</code>" : pick(o)));
        }
        return out.join("<br>");
      },
      empty: L("orderall")
    };
  }

  function wMatch(q, host) {
    var pairs = q.pairs || [];
    var order = shuffled(pairs.length, q.id + "m");
    var picks = [];   /* picks[leftIndex] = right original index */
    var sel = -1;
    var i;

    var hl = '<div><p class="colhead">' + bi(q.leftHead || { en: "Item", ar: "العنصر" }) + "</p><ul>";
    for (i = 0; i < pairs.length; i++) {
      hl += '<li><button type="button" data-side="l" data-i="' + i + '">' +
            '<span class="tagno" hidden></span>' +
            ((pairs[i].l && pairs[i].l.code) ? "<code>" + esc(pairs[i].l.code) + "</code>"
                                             : bi(pairs[i].l)) + "</button></li>";
    }
    hl += "</ul></div>";
    var hr = '<div><p class="colhead">' + bi(q.rightHead || { en: "Matches", ar: "المقابل" }) + "</p><ul>";
    for (i = 0; i < order.length; i++) {
      var ri = order[i];
      hr += '<li><button type="button" data-side="r" data-i="' + ri + '">' +
            '<span class="tagno" hidden></span>' +
            ((pairs[ri].r && pairs[ri].r.code) ? "<code>" + esc(pairs[ri].r.code) + "</code>"
                                               : bi(pairs[ri].r)) + "</button></li>";
    }
    hr += "</ul></div>";
    host.innerHTML = '<div class="match">' + hl + hr + "</div>";

    var lefts = host.querySelectorAll('[data-side="l"]');
    var rights = host.querySelectorAll('[data-side="r"]');

    function badge(btn, n) {
      var t = btn.querySelector(".tagno");
      if (n == null) { t.hidden = true; t.textContent = ""; }
      else { t.hidden = false; t.textContent = String(n); }
    }
    function repaint() {
      var i, k;
      for (i = 0; i < lefts.length; i++) {
        var li = parseInt(lefts[i].getAttribute("data-i"), 10);
        var has = picks[li] != null;
        badge(lefts[i], has ? li + 1 : null);
        lefts[i].classList.toggle("sel", sel === li);
        lefts[i].classList.toggle("done", has);
      }
      for (i = 0; i < rights.length; i++) {
        var ri = parseInt(rights[i].getAttribute("data-i"), 10);
        var owner = null;
        for (k = 0; k < picks.length; k++) if (picks[k] === ri) owner = k;
        badge(rights[i], owner != null ? owner + 1 : null);
        rights[i].classList.toggle("done", owner != null);
      }
    }
    repaint();

    host.addEventListener("click", function (e) {
      var n = e.target;
      while (n && n !== host && n.tagName !== "BUTTON") n = n.parentNode;
      if (!n || n === host || n.disabled) return;
      var side = n.getAttribute("data-side");
      var i = parseInt(n.getAttribute("data-i"), 10);
      if (side === "l") {
        if (picks[i] != null) { picks[i] = null; sel = -1; }
        else sel = (sel === i ? -1 : i);
      } else {
        for (var k = 0; k < picks.length; k++) if (picks[k] === i) picks[k] = null;
        if (sel > -1) { picks[sel] = i; sel = -1; }
      }
      repaint();
      host.dispatchEvent(new CustomEvent("qtouch", { bubbles: true }));
    });

    function read() {
      var any = false, v = [];
      for (var i = 0; i < pairs.length; i++) {
        v.push(picks[i] == null ? null : picks[i]);
        if (picks[i] != null) any = true;
      }
      return any ? v : null;
    }
    return {
      read: read,
      write: function (p) { if (p) { picks = p.slice(); sel = -1; repaint(); } },
      grade: function (p) {
        p = p || [];
        var hit = 0, done = 0;
        for (var i = 0; i < pairs.length; i++) {
          if (p[i] != null) done++;
          if (p[i] === i) hit++;
        }
        return { right: hit === pairs.length, got: hit, total: pairs.length, done: done };
      },
      mark: function (p) {
        p = p || [];
        for (var i = 0; i < lefts.length; i++) {
          var li = parseInt(lefts[i].getAttribute("data-i"), 10);
          var ok = p[li] === li;
          lefts[i].classList.toggle("right", ok);
          lefts[i].classList.toggle("wrong", !ok);
        }
      },
      reveal: function () {
        picks = [];
        for (var i = 0; i < pairs.length; i++) picks.push(i);
        sel = -1; repaint();
        for (i = 0; i < lefts.length; i++) lefts[i].classList.add("right");
      },
      clear: function () {
        picks = []; sel = -1; repaint();
        for (var i = 0; i < lefts.length; i++) lefts[i].classList.remove("right", "wrong");
      },
      lock: function (on) {
        var bs = host.querySelectorAll("button");
        for (var i = 0; i < bs.length; i++) bs[i].disabled = !!on;
      },
      answerHtml: function () {
        var out = [];
        for (var i = 0; i < pairs.length; i++) {
          var l = (pairs[i].l && pairs[i].l.code) ? pairs[i].l.code : pick(pairs[i].l);
          var r = (pairs[i].r && pairs[i].r.code) ? pairs[i].r.code : pick(pairs[i].r);
          out.push(esc(l) + " &rarr; " + esc(r));
        }
        return out.join("<br>");
      },
      empty: L("matchall")
    };
  }

  function wPickline(q, host) {
    var lines = String(q.code).replace(/^\n/, "").replace(/\s+$/, "").split("\n");
    var ans = (typeof q.answer === "number") ? [q.answer] : (q.answer || []);
    var h = '<div class="pickcode">';
    for (var i = 0; i < lines.length; i++) {
      var n = i + 1;
      var dead = q.skip && q.skip.indexOf(n) > -1;
      h += '<button type="button" data-n="' + n + '"' + (dead ? " disabled" : "") + '>' +
           '<span class="ln">' + n + "</span>" +
           '<span class="lx">' +
           (window.DAHighlight ? window.DAHighlight(lines[i]) : esc(lines[i])) +
           "</span></button>";
    }
    host.innerHTML = h + "</div>" +
      '<p class="pickcode-note">' + LB("pickline") + "</p>";
    var btns = host.querySelectorAll(".pickcode button");

    host.addEventListener("click", function (e) {
      var n = e.target;
      while (n && n !== host && n.tagName !== "BUTTON") n = n.parentNode;
      if (!n || n === host || n.disabled) return;
      var want = ans.length > 1;
      if (!want) {
        for (var i = 0; i < btns.length; i++) btns[i].classList.remove("sel");
        n.classList.add("sel");
      } else {
        n.classList.toggle("sel");
      }
      host.dispatchEvent(new CustomEvent("qtouch", { bubbles: true }));
    });

    function read() {
      var v = [];
      for (var i = 0; i < btns.length; i++) {
        if (btns[i].classList.contains("sel")) v.push(parseInt(btns[i].getAttribute("data-n"), 10));
      }
      return v.length ? v : null;
    }
    return {
      read: read,
      write: function (p) {
        if (!p) return;
        for (var i = 0; i < btns.length; i++) {
          var n = parseInt(btns[i].getAttribute("data-n"), 10);
          btns[i].classList.toggle("sel", p.indexOf(n) > -1);
        }
      },
      grade: function (p) {
        p = p || [];
        var hit = 0, bad = 0, i;
        for (i = 0; i < p.length; i++) (ans.indexOf(p[i]) > -1 ? hit++ : bad++);
        return { right: hit === ans.length && bad === 0, got: Math.max(0, hit - bad), total: ans.length };
      },
      mark: function (p) {
        p = p || [];
        for (var i = 0; i < btns.length; i++) {
          var n = parseInt(btns[i].getAttribute("data-n"), 10);
          var isA = ans.indexOf(n) > -1, chose = p.indexOf(n) > -1;
          btns[i].classList.remove("sel");
          btns[i].classList.toggle("right", isA);
          btns[i].classList.toggle("wrong", chose && !isA);
        }
      },
      reveal: function () {
        for (var i = 0; i < btns.length; i++) {
          var n = parseInt(btns[i].getAttribute("data-n"), 10);
          btns[i].classList.remove("sel");
          btns[i].classList.toggle("right", ans.indexOf(n) > -1);
        }
      },
      clear: function () {
        for (var i = 0; i < btns.length; i++) btns[i].classList.remove("sel", "right", "wrong");
      },
      lock: function (on) {
        for (var i = 0; i < btns.length; i++) {
          if (!(q.skip && q.skip.indexOf(parseInt(btns[i].getAttribute("data-n"), 10)) > -1)) {
            btns[i].disabled = !!on;
          }
        }
      },
      answerHtml: function () {
        var out = [];
        for (var i = 0; i < ans.length; i++) {
          out.push("<code>" + ans[i] + ": " + esc(lines[ans[i] - 1].trim()) + "</code>");
        }
        return out.join("<br>");
      },
      empty: LB("pickline")
    };
  }

  var WIDGETS = {
    mcq: wChoice, multi: wChoice, tf: wChoice, compare: wChoice,
    complete: wChoice, output: wText, fill: wText, trace: wText,
    order: wOrder, match: wMatch, error: wPickline
  };

  /* ========================================================== one card */

  function makeCard(q, n, bank) {
    var kind = q.widget || q.type;
    /* a few types can be authored either way; the data decides */
    if (q.type === "output" && q.options) kind = "mcq";
    if (q.type === "complete" && q.blanks) kind = "fill";
    if (q.type === "trace" && q.options) kind = "mcq";
    if (q.type === "error" && q.options) kind = "mcq";

    var el = document.createElement("article");
    el.className = "qbox";
    el.id = "q-" + q.id;
    el.setAttribute("data-level", q.level || "medium");
    el.setAttribute("data-qid", q.id);

    var tf = q.type === "tf";
    if (tf && !q.options) {
      q = Object.create(q);
      q.options = [{ en: UI.trueL.en, ar: UI.trueL.ar }, { en: UI.falseL.en, ar: UI.falseL.ar }];
      q.answer = q.truth ? 0 : 1;
      q.noshuffle = true;
    }

    var stem = "";
    if (q.type === "compare" && q.codeA) {
      stem += '<div class="cmp"><div><h5>' + LB("codeA") + "</h5>" + codeBlock(q.codeA) +
              "</div><div><h5>" + LB("codeB") + "</h5>" + codeBlock(q.codeB) + "</div></div>";
    } else if (q.code && kind !== "error") {
      stem += codeBlock(q.code);
    }
    if (q.after) stem += "<p>" + bi(q.after) + "</p>";

    el.innerHTML =
      '<div class="qhead">' +
        '<span class="qnum">' + (bank.mode === "inline" ? "?" : "Q" + n) + "</span>" +
        '<span class="chip lv-' + (q.level || "medium") + '">' +
          bi(LEVELS[q.level] || LEVELS.medium) + "</span>" +
        '<span class="chip kind">' + bi(TYPES[q.type] || TYPES.mcq) + "</span>" +
        topicChips(q.topics) +
      "</div>" +
      '<div class="qstem"><p>' + bi(q.q) + "</p>" + stem + "</div>" +
      '<div class="qwidget"></div>' +
      '<div class="qactions">' +
        '<button type="button" class="btn primary" data-a="check"></button>' +
        '<button type="button" class="btn" data-a="show"></button>' +
        '<button type="button" class="btn" data-a="clear"></button>' +
      "</div>" +
      '<div class="verdict" hidden></div>' +
      (q.explain ? '<details class="xp"><summary></summary><div class="inner">' +
                   "<p>" + bi(q.explain) + "</p></div></details>" : "") +
      (q.solution ? '<details class="sl"><summary></summary><div class="inner">' +
                    (q.solution.code ? codeBlock(q.solution.code, "good") : "") +
                    (q.solution.out ? '<div class="output">' + esc(q.solution.out) + "</div>" : "") +
                    (q.solution.en || q.solution.ar ? "<p>" + bi(q.solution) + "</p>" : "") +
                    "</div></details>" : "");

    var widget = (WIDGETS[kind] || wChoice)(q, el.querySelector(".qwidget"));
    var verdict = el.querySelector(".verdict");
    var state = null;

    function relabel() {
      el.querySelector('[data-a="check"]').textContent = state ? L("recheck") : L("check");
      el.querySelector('[data-a="show"]').textContent = L("showme");
      el.querySelector('[data-a="clear"]').textContent = L("clear");
      var xp = el.querySelector(".xp > summary");
      if (xp) xp.textContent = L("why");
      var sl = el.querySelector(".sl > summary");
      if (sl) sl.textContent = L("sol");
      if (state) paintVerdict(state, true);
    }

    function paintVerdict(st, quiet) {
      verdict.hidden = false;
      if (st.kind === "right") {
        verdict.className = "verdict ok";
        verdict.innerHTML = L("ok");
      } else if (st.kind === "part") {
        verdict.className = "verdict part";
        verdict.innerHTML = L("part").replace("{a}", st.got).replace("{b}", st.total) +
          '<div style="font-weight:400;margin-top:6px">' + L("correctis") + ": " +
          widget.answerHtml() + "</div>";
      } else if (st.kind === "shown") {
        verdict.className = "verdict part";
        verdict.innerHTML = L("revealed");
      } else {
        verdict.className = "verdict no";
        verdict.innerHTML = L("no") +
          '<div style="font-weight:400;margin-top:6px">' + L("correctis") + ": " +
          widget.answerHtml() + "</div>";
      }
      if (!quiet) { /* nothing extra */ }
    }

    function check(silent) {
      var p = widget.read();
      if (!p) {
        if (!silent) {
          verdict.hidden = false;
          verdict.className = "verdict part";
          verdict.textContent = widget.empty;
        }
        return null;
      }
      var g = widget.grade(p);
      var kindName = g.right ? "right" : (g.got > 0 ? "part" : "wrong");
      state = { kind: kindName, got: g.got, total: g.total, payload: p };
      widget.mark(p);
      widget.lock(true);
      paintVerdict(state);
      el.setAttribute("data-state", g.right ? "right" : "wrong");
      if (q.explain) el.querySelector(".xp").open = !g.right;
      bank.record(q.id, state);
      relabel();
      return state;
    }

    el.querySelector(".qactions").addEventListener("click", function (e) {
      var b = e.target;
      while (b && b.tagName !== "BUTTON") b = b.parentNode;
      if (!b) return;
      var a = b.getAttribute("data-a");
      if (a === "check") { widget.lock(false); check(false); }
      if (a === "show") {
        widget.clear();
        widget.reveal();
        widget.lock(true);
        state = { kind: "shown", got: 0, total: 1, payload: null };
        el.setAttribute("data-state", "wrong");
        paintVerdict(state);
        if (q.explain) el.querySelector(".xp").open = true;
        if (q.solution) el.querySelector(".sl").open = true;
        bank.record(q.id, state);
        relabel();
      }
      if (a === "clear") {
        widget.clear();
        widget.lock(false);
        state = null;
        verdict.hidden = true;
        el.removeAttribute("data-state");
        bank.record(q.id, null);
        relabel();
      }
    });

    el.addEventListener("qtouch", function () {
      if (state) return;
      verdict.hidden = true;
    });

    relabel();

    return {
      el: el,
      q: q,
      relabel: relabel,
      check: function () { widget.lock(false); return check(true); },
      restore: function (st) {
        if (!st) return;
        if (st.kind === "shown") {
          widget.reveal(); widget.lock(true);
          state = st; paintVerdict(state);
          el.setAttribute("data-state", "wrong");
        } else if (st.payload) {
          widget.write(st.payload);
          widget.mark(st.payload);
          widget.lock(true);
          state = st;
          paintVerdict(state);
          el.setAttribute("data-state", st.kind === "right" ? "right" : "wrong");
        }
        relabel();
      },
      state: function () { return state; },
      reset: function () {
        widget.clear(); widget.lock(false);
        state = null; verdict.hidden = true;
        el.removeAttribute("data-state");
        relabel();
      }
    };
  }

  /* ========================================================== one bank */

  function renderBank(host) {
    var id = host.getAttribute("data-bank");
    var spec = (window.DABanks || {})[id];
    if (!spec) { host.innerHTML = ""; return null; }
    var mode = spec.mode || host.getAttribute("data-mode") || "test";
    var saved = load(id);
    var cards = [];

    var bank = {
      id: id,
      mode: mode,
      record: function (qid, st) {
        if (st) saved[qid] = { k: st.kind, g: st.got, t: st.total, p: st.payload };
        else delete saved[qid];
        save(id, saved);
        refresh();
      }
    };

    var frag = document.createDocumentFragment();

    var bar = null, tally = null, barFill = null, result = null;
    if (mode !== "inline") {
      if (spec.intro) {
        var intro = document.createElement("div");
        intro.className = "testhead";
        intro.innerHTML =
          "<h4>" + bi(spec.title || { en: "Test", ar: "اختبار" }) + "</h4>" +
          "<p>" + bi(spec.intro) + "</p>" +
          '<div class="meta"><span>' + spec.questions.length + " " +
          '<span class="en">questions</span><span class="ar">سؤالًا</span>' + "</span>" +
          '<span data-levelmix></span></div>';
        var mix = { easy: 0, medium: 0, hard: 0 };
        for (var mi = 0; mi < spec.questions.length; mi++) {
          mix[spec.questions[mi].level || "medium"]++;
        }
        intro.querySelector("[data-levelmix]").innerHTML =
          "<b>" + mix.easy + "</b> " + bi(LEVELS.easy) + " &middot; " +
          "<b>" + mix.medium + "</b> " + bi(LEVELS.medium) + " &middot; " +
          "<b>" + mix.hard + "</b> " + bi(LEVELS.hard);
        frag.appendChild(intro);
      }

      bar = document.createElement("div");
      bar.className = "testbar";
      bar.innerHTML =
        '<span class="tally"></span>' +
        '<button type="button" class="btn" data-a="all"></button>' +
        '<button type="button" class="btn" data-a="reset"></button>' +
        '<span class="bar"><i></i></span>';
      frag.appendChild(bar);
      tally = bar.querySelector(".tally");
      barFill = bar.querySelector(".bar > i");

      var filter = document.createElement("div");
      filter.className = "qfilter";
      filter.innerHTML =
        '<button type="button" data-f="all" aria-pressed="true"></button>' +
        '<button type="button" data-f="easy" aria-pressed="false"></button>' +
        '<button type="button" data-f="medium" aria-pressed="false"></button>' +
        '<button type="button" data-f="hard" aria-pressed="false"></button>' +
        '<button type="button" data-f="unseen" aria-pressed="false"></button>' +
        '<button type="button" data-f="missed" aria-pressed="false"></button>';
      frag.appendChild(filter);
      bank.filterEl = filter;
    }

    for (var i = 0; i < spec.questions.length; i++) {
      var card = makeCard(spec.questions[i], i + 1, bank);
      cards.push(card);
      frag.appendChild(card.el);
    }

    if (mode !== "inline") {
      result = document.createElement("div");
      result.className = "result";
      result.hidden = true;
      frag.appendChild(result);
    }

    host.innerHTML = "";
    host.appendChild(frag);

    /* ---- restore ---- */
    for (i = 0; i < cards.length; i++) {
      var st = saved[cards[i].q.id];
      if (st) cards[i].restore({ kind: st.k, got: st.g, total: st.t, payload: st.p });
    }

    /* ---- toolbar behaviour ---- */
    function counts() {
      var done = 0, right = 0;
      for (var i = 0; i < cards.length; i++) {
        var s = cards[i].state();
        if (!s) continue;
        done++;
        if (s.kind === "right") right++;
      }
      return { done: done, right: right, total: cards.length };
    }

    function buildResult() {
      var c = counts();
      if (!c.done) { result.hidden = true; return; }
      var pct = Math.round((c.right / c.done) * 100);
      var lv = { easy: [0, 0], medium: [0, 0], hard: [0, 0] };
      var tp = {};
      var reg = window.DATopics || {};
      for (var i = 0; i < cards.length; i++) {
        var s = cards[i].state();
        if (!s) continue;
        var q = cards[i].q;
        var l = q.level || "medium";
        lv[l][1]++;
        if (s.kind === "right") lv[l][0]++;
        var ts = q.topics || [];
        for (var j = 0; j < ts.length; j++) {
          if (!tp[ts[j]]) tp[ts[j]] = [0, 0];
          tp[ts[j]][1]++;
          if (s.kind === "right") tp[ts[j]][0]++;
        }
      }
      var h = "<h3>" + L("resTitle") + '</h3><div class="big">' + pct + "%</div>" +
              '<p class="sub">' + L("resSub").replace("{r}", c.right)
                 .replace("{t}", c.done).replace("{p}", pct) + "</p>";
      h += "<table><thead><tr><th>" + L("level") + "</th><th>" + L("right") +
           "</th><th>" + L("asked") + "</th></tr></thead><tbody>";
      var keys = ["easy", "medium", "hard"];
      for (i = 0; i < keys.length; i++) {
        if (!lv[keys[i]][1]) continue;
        h += "<tr><td>" + pick(LEVELS[keys[i]]) + "</td><td>" + lv[keys[i]][0] +
             "</td><td>" + lv[keys[i]][1] + "</td></tr>";
      }
      h += "</tbody></table>";

      var weak = [], k;
      for (k in tp) {
        if (!Object.prototype.hasOwnProperty.call(tp, k)) continue;
        if (tp[k][1] >= 1 && tp[k][0] / tp[k][1] < 0.6 && reg[k]) weak.push(k);
      }
      h += '<div class="weak"><h4>' + L("weak") + "</h4>";
      if (!weak.length) {
        h += "<p>" + L("strongAll") + "</p>";
      } else {
        h += '<ul class="seelist">';
        for (i = 0; i < weak.length; i++) {
          h += '<li><a href="#' + reg[weak[i]].href + '">' + bi(reg[weak[i]]) + "</a> &mdash; " +
               tp[weak[i]][0] + "/" + tp[weak[i]][1] + "</li>";
        }
        h += "</ul>";
      }
      h += "</div>";
      result.innerHTML = h;
      result.hidden = false;
    }

    function refresh() {
      if (!bar) return;
      var c = counts();
      tally.innerHTML = L("tally").replace("{d}", c.done)
        .replace("{t}", c.total).replace("{r}", c.right);
      barFill.style.width = (c.total ? (c.done / c.total) * 100 : 0) + "%";
      bar.querySelector('[data-a="all"]').textContent = L("checkall");
      bar.querySelector('[data-a="reset"]').textContent = L("resetall");
      var fb = bank.filterEl.querySelectorAll("[data-f]");
      var names = { all: "all", easy: "lvEasy", medium: "lvMedium", hard: "lvHard",
                    unseen: "unseen", missed: "missed" };
      for (var i = 0; i < fb.length; i++) {
        fb[i].textContent = L(names[fb[i].getAttribute("data-f")]);
      }
      buildResult();
    }

    if (bar) {
      bar.addEventListener("click", function (e) {
        var b = e.target;
        while (b && b.tagName !== "BUTTON") b = b.parentNode;
        if (!b) return;
        var a = b.getAttribute("data-a");
        if (a === "all") {
          for (var i = 0; i < cards.length; i++) if (!cards[i].state()) cards[i].check();
          refresh();
          if (result) result.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        if (a === "reset") {
          for (var j = 0; j < cards.length; j++) { cards[j].reset(); saved[cards[j].q.id] = null; }
          saved = {};
          save(id, saved);
          refresh();
          if (result) result.hidden = true;
        }
      });

      bank.filterEl.addEventListener("click", function (e) {
        var b = e.target;
        while (b && b.tagName !== "BUTTON") b = b.parentNode;
        if (!b) return;
        var f = b.getAttribute("data-f");
        var bs = bank.filterEl.querySelectorAll("[data-f]");
        for (var i = 0; i < bs.length; i++) {
          bs[i].setAttribute("aria-pressed", bs[i] === b ? "true" : "false");
        }
        for (i = 0; i < cards.length; i++) {
          var s = cards[i].state();
          var lvl = cards[i].q.level || "medium";
          var show = f === "all" ? true
                   : f === "unseen" ? !s
                   : f === "missed" ? !!(s && s.kind !== "right")
                   : lvl === f;
          cards[i].el.hidden = !show;
        }
      });
    }

    refresh();

    return {
      id: id,
      relabel: function () {
        for (var i = 0; i < cards.length; i++) cards[i].relabel();
        refresh();
      }
    };
  }

  /* ========================================================== boot */

  var banks = [];

  function renderAll(scope) {
    var hosts = (scope || document).querySelectorAll("[data-bank]");
    for (var i = 0; i < hosts.length; i++) {
      if (hosts[i].getAttribute("data-rendered")) continue;
      hosts[i].setAttribute("data-rendered", "1");
      var b = renderBank(hosts[i]);
      if (b) banks.push(b);
    }
  }

  function relabel() {
    for (var i = 0; i < banks.length; i++) banks[i].relabel();
  }

  /* app.js calls renderAll once the language is settled, so there is
     no self-boot here: a bank rendered before I18N.init() would draw
     its labels in the wrong language and then have to redraw them. */
  document.addEventListener("da:lang", relabel);

  window.DAAssess = { renderAll: renderAll, relabel: relabel };
})();
