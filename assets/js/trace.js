/* ============================================================
   Step-through execution lab.

   A trace is authored, not interpreted: each step names the line
   that is about to run, the variables as they stand after it, and
   anything printed so far. That keeps the simulation honest about
   Python semantics (attribute lookup order, aliasing, super())
   which a toy interpreter would get wrong.

   window.DATrace.mount(hostElement, spec)
   spec = {
     id, title: {en, ar}, lede: {en, ar},
     code: "line\nline\n...",
     steps: [{ line: 3, vars: {name: "value"}, out: "printed\n",
               scope: {en, ar}, note: {en, ar} }]
   }
   `vars` is the full picture at that step, not a delta; the widget
   diffs consecutive steps itself to decide what to flash.
   ============================================================ */
(function () {
  "use strict";

  var UI = {
    start:  { en: "Start",    ar: "البداية" },
    prev:   { en: "◂ Back",   ar: "السابق ◂" },
    next:   { en: "Next ▸",   ar: "▸ التالي" },
    play:   { en: "▶ Run",    ar: "▶ تشغيل" },
    pause:  { en: "❚❚ Pause", ar: "❚❚ إيقاف" },
    vars:   { en: "Variables", ar: "المتغيرات" },
    out:    { en: "Output",   ar: "المُخرَج" },
    scope:  { en: "Running in", ar: "النطاق الحالي" },
    none:   { en: "nothing defined yet", ar: "لا شيء معرَّف بعد" },
    noout:  { en: "nothing printed yet", ar: "لم يُطبع شيء بعد" },
    step:   { en: "step {a} of {b}", ar: "خطوة {a} من {b}" }
  };

  function lang() {
    return document.documentElement.getAttribute("lang") === "ar" ? "ar" : "en";
  }

  function t(key) { return UI[key][lang()]; }

  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function paint(src) {
    return window.DAHighlight ? window.DAHighlight(src) : esc(src);
  }

  function bi(obj) {
    if (!obj) return "";
    return '<span class="en">' + (obj.en || "") + "</span>" +
           '<span class="ar">' + (obj.ar || "") + "</span>";
  }

  /* ---------- one mounted trace ---------- */
  function mount(host, spec) {
    var steps = spec.steps || [];
    var lines = String(spec.code).replace(/^\n/, "").replace(/\s+$/, "").split("\n");
    var at = 0;
    var timer = null;

    host.className = "trace";
    host.setAttribute("data-trace", spec.id || "");

    var html =
      "<h4>" + bi(spec.title) + "</h4>" +
      (spec.lede ? '<p class="lede">' + bi(spec.lede) + "</p>" : "") +
      '<div class="trace-grid">' +
        '<pre class="trace-code" aria-live="off"></pre>' +
        '<div class="trace-side">' +
          '<div class="trace-pane"><h5 data-t="scope"></h5>' +
            '<div class="trace-scope"></div></div>' +
          '<div class="trace-pane"><h5 data-t="vars"></h5>' +
            '<table class="vars"><tbody></tbody></table></div>' +
          '<div class="trace-pane"><h5 data-t="out"></h5>' +
            '<pre class="trace-out"></pre></div>' +
        "</div>" +
      "</div>" +
      '<div class="trace-note"></div>' +
      '<div class="trace-ctrl">' +
        '<button class="btn" data-a="reset" data-t="start"></button>' +
        '<button class="btn" data-a="prev" data-t="prev"></button>' +
        '<button class="btn primary" data-a="next" data-t="next"></button>' +
        '<button class="btn" data-a="play" data-t="play"></button>' +
        '<span class="step"></span>' +
        '<input class="trace-scrub" type="range" min="0" value="0" aria-label="step">' +
      "</div>";
    host.innerHTML = html;

    var codeEl  = host.querySelector(".trace-code");
    var varsEl  = host.querySelector(".vars tbody");
    var outEl   = host.querySelector(".trace-out");
    var scopeEl = host.querySelector(".trace-scope");
    var noteEl  = host.querySelector(".trace-note");
    var stepEl  = host.querySelector(".step");
    var scrub   = host.querySelector(".trace-scrub");
    scrub.max = String(Math.max(0, steps.length - 1));

    /* code body is static: only the row classes change per step */
    var rows = "";
    for (var i = 0; i < lines.length; i++) {
      rows += '<div class="row" data-line="' + (i + 1) + '">' +
              '<span class="ln">' + (i + 1) + "</span>" +
              '<span class="lx">' + paint(lines[i]) + "</span></div>";
    }
    codeEl.innerHTML = rows;
    var rowEls = codeEl.querySelectorAll(".row");

    function labels() {
      var ls = host.querySelectorAll("[data-t]");
      for (var i = 0; i < ls.length; i++) {
        var k = ls[i].getAttribute("data-t");
        if (k === "play") {
          ls[i].textContent = timer ? t("pause") : t("play");
        } else if (UI[k]) {
          ls[i].textContent = t(k);
        }
      }
    }

    function render() {
      var s = steps[at] || {};
      var prev = at > 0 ? (steps[at - 1].vars || {}) : {};
      var now = s.vars || {};

      for (var i = 0; i < rowEls.length; i++) {
        var n = i + 1;
        rowEls[i].classList.toggle("now", n === s.line);
        rowEls[i].classList.remove("done");
      }
      var active = codeEl.querySelector(".row.now");
      if (active && active.scrollIntoView) {
        var box = codeEl.getBoundingClientRect();
        var r = active.getBoundingClientRect();
        if (r.top < box.top || r.bottom > box.bottom) {
          active.scrollIntoView({ block: "nearest" });
        }
      }

      var keys = [], k;
      for (k in now) if (Object.prototype.hasOwnProperty.call(now, k)) keys.push(k);
      if (!keys.length) {
        varsEl.innerHTML = '<tr><td class="empty" colspan="2">' + t("none") + "</td></tr>";
      } else {
        var h = "";
        for (var j = 0; j < keys.length; j++) {
          k = keys[j];
          var ch = String(prev[k]) !== String(now[k]) ? " class=\"changed\"" : "";
          h += "<tr" + ch + '><td class="vn">' + esc(k) + '</td>' +
               '<td class="vv">' + esc(now[k]) + "</td></tr>";
        }
        varsEl.innerHTML = h;
      }

      if (s.out) {
        outEl.textContent = s.out;
      } else {
        outEl.innerHTML = '<span class="muted">' + t("noout") + "</span>";
      }

      scopeEl.innerHTML = s.scope ? bi(s.scope) : "<code>&lt;module&gt;</code>";
      noteEl.innerHTML = s.note ? bi(s.note) : "";
      noteEl.style.display = s.note ? "" : "none";
      stepEl.textContent = t("step")
        .replace("{a}", String(at + 1)).replace("{b}", String(steps.length));
      scrub.value = String(at);

      host.querySelector('[data-a="prev"]').disabled = at === 0;
      host.querySelector('[data-a="next"]').disabled = at >= steps.length - 1;
      labels();
    }

    function go(n) {
      at = Math.max(0, Math.min(steps.length - 1, n));
      render();
    }

    function stop() {
      if (timer) { clearInterval(timer); timer = null; }
      labels();
    }

    function play() {
      if (timer) { stop(); return; }
      if (at >= steps.length - 1) at = 0;
      timer = setInterval(function () {
        if (at >= steps.length - 1) { stop(); return; }
        go(at + 1);
      }, 1400);
      labels();
    }

    host.addEventListener("click", function (e) {
      var n = e.target;
      while (n && n !== host && !n.getAttribute("data-a")) n = n.parentNode;
      if (!n || n === host) return;
      var a = n.getAttribute("data-a");
      if (a === "next")  { stop(); go(at + 1); }
      if (a === "prev")  { stop(); go(at - 1); }
      if (a === "reset") { stop(); go(0); }
      if (a === "play")  { play(); }
    });

    scrub.addEventListener("input", function () {
      stop();
      go(parseInt(scrub.value, 10) || 0);
    });

    codeEl.addEventListener("click", function (e) {
      var n = e.target;
      while (n && n !== codeEl && !n.getAttribute("data-line")) n = n.parentNode;
      if (!n || n === codeEl) return;
      var want = parseInt(n.getAttribute("data-line"), 10);
      for (var i = 0; i < steps.length; i++) {
        var probe = (at + 1 + i) % steps.length;
        if (steps[probe].line === want) { stop(); go(probe); return; }
      }
    });

    render();
    return { render: render, go: go, stop: stop };
  }

  var mounted = [];

  /* Re-label every mounted trace when the language flips. */
  function relabel() {
    for (var i = 0; i < mounted.length; i++) mounted[i].render();
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

  /* A mounted trace draws its own labels, so it has to redraw when
     the language flips. The chapter prose does not - it carries both
     languages at once and lets CSS choose. */
  document.addEventListener("da:lang", relabel);

  window.DATrace = { mount: mount, mountAll: mountAll, relabel: relabel };
})();
