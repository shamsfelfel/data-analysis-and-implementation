/* ============================================================
   Language.

   The chapter prose is written twice in the markup - <span class="en">
   beside <span class="ar"> - and base.css hides one of them based on
   html[lang]. So switching language is one attribute flip, with no
   re-render and nothing to fetch. Everything the engines draw at run
   time instead asks t() for its label.

   The flip raises `da:lang` on document; the assessment engine and
   the execution lab listen for it and relabel themselves.
   ============================================================ */
(function () {
  "use strict";

  var KEY = "da.lang";
  var root = document.documentElement;

  function get() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function put(v) {
    try { localStorage.setItem(KEY, v); } catch (e) {}
  }

  function current() {
    return root.getAttribute("lang") === "ar" ? "ar" : "en";
  }

  /* A UI string by key, with {placeholders} filled from `vars`. */
  function t(key, vars) {
    var table = (window.COURSE && window.COURSE.UI) || {};
    var entry = table[key];
    var s = entry ? (entry[current()] || entry.en) : key;
    if (vars) {
      for (var k in vars) {
        if (Object.prototype.hasOwnProperty.call(vars, k)) {
          s = s.split("{" + k + "}").join(vars[k]);
        }
      }
    }
    return s;
  }

  /* Pick the right half of a bilingual {en, ar} value. */
  function pick(o) {
    if (!o) return "";
    if (typeof o === "string") return o;
    return o[current()] || o.en || "";
  }

  /* Anything carrying data-ui is a label the shell owns rather than
     the author. The shell builds most of them after init() has run,
     so this is also called once everything exists. */
  function relabel(scope) {
    var els = (scope || document).querySelectorAll("[data-ui]");
    for (var i = 0; i < els.length; i++) {
      els[i].textContent = t(els[i].getAttribute("data-ui"));
    }
  }

  function apply(lang) {
    lang = lang === "ar" ? "ar" : "en";
    root.setAttribute("lang", lang);
    root.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    put(lang);

    relabel();

    var title = document.querySelector("title");
    if (title && title.getAttribute("data-" + lang)) {
      document.title = title.getAttribute("data-" + lang);
    }

    try {
      document.dispatchEvent(new CustomEvent("da:lang", { detail: lang }));
    } catch (e) {
      /* IE-era fallback: the engines also poll on relabel(). */
    }
  }

  function toggle() { apply(current() === "ar" ? "en" : "ar"); }

  function init() { apply(get() || root.getAttribute("lang") || "en"); }

  window.I18N = {
    init: init,
    apply: apply,
    relabel: relabel,
    toggle: toggle,
    t: t,
    pick: pick,
    get lang() { return current(); }
  };
})();
