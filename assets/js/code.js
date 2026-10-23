/* ============================================================
   Python syntax colouring, copy buttons, and the inline quizzes
   that punctuate a lesson.

   The highlighter is one regular expression over the few token
   classes a teaching example actually uses - strings, comments,
   self/cls, keywords, the builtins the course calls, numbers.
   It is not a parser and does not try to be: it runs on fixed,
   already-correct code that was written to be read.

   The execution lab borrows the same tokeniser through
   window.DAHighlight, so a line looks identical whether it is
   sitting in a code block or stepping through the trace.
   ============================================================ */
(function () {
  "use strict";

  var KW = ("False|None|True|and|as|assert|async|await|break|class|continue|def|del|elif|else|except|" +
            "finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|raise|return|try|while|with|yield").split("|");
  var BUILTIN = ("print|len|range|str|int|float|bool|list|dict|set|tuple|sum|min|max|sorted|enumerate|zip|" +
                 "round|abs|input|open|isinstance|hasattr|getattr|setattr|type|property|staticmethod|classmethod|" +
                 "super|object|Exception|ValueError|TypeError|KeyError|AttributeError|NotImplementedError|ABC|" +
                 "abstractmethod|dataclass|datetime|date|Decimal").split("|");

  var RE = new RegExp(
    '("""[\\s\\S]*?"""|\'\'\'[\\s\\S]*?\'\'\'|"(?:[^"\\\\\\n]|\\\\.)*"|\'(?:[^\'\\\\\\n]|\\\\.)*\')' +
    '|(#[^\\n]*)' +
    '|\\b(self|cls)\\b' +
    '|\\b(' + KW.join('|') + ')\\b' +
    '|\\b(' + BUILTIN.join('|') + ')\\b' +
    '|\\b(\\d+(?:\\.\\d+)?)\\b', 'g');

  function esc(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function highlight(src) {
    var out = "", last = 0, m;
    RE.lastIndex = 0;
    while ((m = RE.exec(src)) !== null) {
      out += esc(src.slice(last, m.index));
      var cls = m[1] ? "t-str" : m[2] ? "t-com" : m[3] ? "t-self" :
                m[4] ? "t-kw" : m[5] ? "t-fn" : "t-num";
      out += '<span class="' + cls + '">' + esc(m[0]) + "</span>";
      last = m.index + m[0].length;
    }
    return out + esc(src.slice(last));
  }

  window.DAHighlight = highlight;

  /* ---------------------------------------------------------- copy */

  function label(key) {
    return window.I18N ? window.I18N.t(key) : key;
  }

  function addCopy(code, src) {
    var btn = document.createElement("button");
    btn.className = "copy";
    btn.setAttribute("data-ui", "copy");
    btn.type = "button";
    btn.textContent = label("copy");

    btn.onclick = function () {
      var done = function () {
        btn.textContent = label("copied");
        setTimeout(function () { btn.textContent = label("copy"); }, 1400);
      };
      var started = false;
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(src).then(done, function () {});
          started = true;
        }
      } catch (e) {}
      if (!started) {
        /* file:// and older browsers have no async clipboard. */
        var ta = document.createElement("textarea");
        ta.value = src;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand("copy"); done(); } catch (e2) {}
        document.body.removeChild(ta);
      }
    };
    code.parentNode.appendChild(btn);
  }

  function paint(scope) {
    var codes = (scope || document).querySelectorAll("pre.code > code");
    for (var i = 0; i < codes.length; i++) {
      var code = codes[i];
      if (code.getAttribute("data-done")) continue;
      var src = code.textContent.replace(/^\n/, "").replace(/\s+$/, "");
      code.innerHTML = highlight(src);
      code.setAttribute("data-done", "1");
      addCopy(code, src);
    }
  }

  /* ---------------------------------------------------------- inline quizzes */

  /* A lesson quiz is a single question with its answer revealed on
     the first click: one attempt, no grading, no storage. The graded
     banks on the test pages are a different engine entirely. */
  function wireQuizzes(scope) {
    var quizzes = (scope || document).querySelectorAll(".quiz");
    for (var i = 0; i < quizzes.length; i++) {
      (function (quiz) {
        if (quiz.getAttribute("data-wired")) return;
        quiz.setAttribute("data-wired", "1");
        var opts = quiz.querySelectorAll(".opt");
        for (var j = 0; j < opts.length; j++) {
          opts[j].onclick = function () {
            if (quiz.getAttribute("data-answered")) return;
            quiz.setAttribute("data-answered", "1");
            var correct = this.getAttribute("data-correct") === "true";
            quiz.setAttribute("data-correct", correct ? "1" : "0");
            for (var k = 0; k < opts.length; k++) {
              opts[k].disabled = true;
              if (opts[k].getAttribute("data-correct") === "true") {
                opts[k].classList.add("right");
              }
            }
            if (!correct) this.classList.add("wrong");
            var fb = quiz.querySelector(".feedback");
            if (fb) fb.hidden = false;
            updateScores();
          };
        }
      })(quizzes[i]);
    }
  }

  /* The running tally a lesson shows after its first answered quiz. */
  function updateScores() {
    var boxes = document.querySelectorAll(".score");
    var quizzes = document.querySelectorAll(".quiz");
    var total = quizzes.length, right = 0, done = 0;
    for (var j = 0; j < quizzes.length; j++) {
      if (quizzes[j].getAttribute("data-answered")) {
        done++;
        if (quizzes[j].getAttribute("data-correct") === "1") right++;
      }
    }
    for (var i = 0; i < boxes.length; i++) {
      boxes[i].textContent = (window.I18N ? window.I18N.t("score") : "{a}/{b}")
        .replace("{a}", right).replace("{b}", total);
      boxes[i].style.display = done ? "inline-block" : "none";
    }
  }

  function init() {
    paint(document);
    wireQuizzes(document);
    updateScores();
    document.addEventListener("da:lang", updateScores);
  }

  window.CODE = { init: init, paint: paint, highlight: highlight };
})();
