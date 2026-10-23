/* ============================================================
   The two index pages - the course home and a chapter home.

   Both are static HTML; this only fills in the parts that depend
   on what the reader has already done: the "continue where you
   stopped" link, the progress line on each chapter card, and the
   ticks and scores beside the lessons and tests of the open
   chapter. With an empty localStorage every one of these hides
   itself, so a first visit shows a clean page and not a row of
   zeroes.
   ============================================================ */
(function () {
  "use strict";

  function base() { return window.DA_BASE || ""; }
  function L(e) { return window.I18N ? window.I18N.pick(e) : (e && e.en) || ""; }
  function t(k, v) { return window.I18N ? window.I18N.t(k, v) : k; }

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  /* ---------------------------------------------------------- resume */

  function fillResume() {
    var host = document.getElementById("resume");
    if (!host || !window.PROGRESS || !window.COURSE) return;
    var last = window.PROGRESS.last();
    if (!last) { host.hidden = true; return; }
    var p = window.COURSE.page(last.chapter, last.id);
    if (!p) { host.hidden = true; return; }

    host.hidden = false;
    host.innerHTML = "";
    var a = document.createElement("a");
    a.className = "resume-link";
    a.href = base() + p.href;
    var lead = el("span", "mini");
    lead.setAttribute("data-ui", "resume");
    lead.textContent = t("resume");
    a.appendChild(lead);
    var name = el("span", "t");
    name.appendChild(el("span", "en", p.en));
    name.appendChild(el("span", "ar", p.ar));
    a.appendChild(name);
    host.appendChild(a);
  }

  /* ---------------------------------------------------------- chapter cards */

  function fillChapterCards() {
    var cards = document.querySelectorAll("[data-chapter-progress]");
    if (!window.PROGRESS) return;
    for (var i = 0; i < cards.length; i++) {
      var num = +cards[i].getAttribute("data-chapter-progress");
      var p = window.PROGRESS.chapterProgress(num);
      if (!p.total || !p.done) { cards[i].hidden = true; continue; }
      cards[i].hidden = false;
      cards[i].innerHTML = "";
      var bar = el("span", "bar");
      var fill = el("span", "fill");
      fill.style.width = p.pct + "%";
      bar.appendChild(fill);
      cards[i].appendChild(bar);
      cards[i].appendChild(el("span", "n", p.done + " / " + p.total));
    }
  }

  /* ---------------------------------------------------------- chapter page */

  /* Each lesson card on a chapter page gets a tick once opened, and
     each test card the score of its bank once answered. */
  function fillChapterPage() {
    if (!window.PROGRESS || !window.COURSE) return;
    var num = +(document.body.getAttribute("data-chapter") || 1);

    var marks = document.querySelectorAll("[data-page-state]");
    for (var i = 0; i < marks.length; i++) {
      var id = marks[i].getAttribute("data-page-state");
      var p = window.COURSE.page(num, id);
      if (!p) continue;

      if (p.bank) {
        var score = window.PROGRESS.bankScore(p.bank);
        if (!score) { marks[i].hidden = true; continue; }
        marks[i].hidden = false;
        marks[i].textContent = score.right + " / " + score.done;
        marks[i].className = "state score-chip";
      } else if (window.PROGRESS.isSeen(num, id)) {
        marks[i].hidden = false;
        marks[i].textContent = "✓";
        marks[i].className = "state seen-chip";
      } else {
        marks[i].hidden = true;
      }
    }
  }

  /* ---------------------------------------------------------- roadmap */

  /* The chapters still to be written, listed from the same registry
     the finished ones come from so the two can never drift apart. */
  function fillRoadmap() {
    var host = document.getElementById("roadmap");
    if (!host || !window.COURSE) return;
    var planned = window.COURSE.planned || [];
    host.innerHTML = "";
    for (var i = 0; i < planned.length; i++) {
      var li = el("li");
      li.appendChild(el("span", "n", String(planned[i].num)));
      var name = el("span", "t");
      name.appendChild(el("span", "en", planned[i].en));
      name.appendChild(el("span", "ar", planned[i].ar));
      li.appendChild(name);
      var tag = el("span", "soon");
      tag.setAttribute("data-ui", "soon");
      tag.textContent = t("soon");
      li.appendChild(tag);
      host.appendChild(li);
    }
  }

  function init() {
    fillResume();
    fillChapterCards();
    fillChapterPage();
    fillRoadmap();
    document.addEventListener("da:lang", fillResume);
  }

  window.HOME = { init: init };
})();
