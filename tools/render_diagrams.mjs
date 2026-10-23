#!/usr/bin/env node
/* ============================================================================
   render_diagrams.mjs - the offline diagram pipeline.

   src/diagrams/<id>.en.mmd + <id>.ar.mmd   (Mermaid sources, one pair per id;
        |                                    id = [a-z0-9][a-z0-9-]*)
        |  headless Chromium (Playwright) + node_modules/mermaid (no CDN, no network)
        v
   assets/diagrams/<id>.html                (a FRAGMENT, no <html>)

   Usage
     node tools/render_diagrams.mjs [--check] [--force] [--quiet] [--debug] [id ...]
       --check   render nothing; exit 1 if a fragment is missing/stale/orphaned or the
                 generated block of diagram.css is out of date
       --force   re-render even when the stored hash matches
       --debug   write the raw and the processed SVGs to .tmp/d/raw and .tmp/d/post
       --src=DIR --out=DIR   use other folders (the pipeline's own tests)
   Exit status is non-zero on any source error (file + Mermaid's message), when an SVG
   still holds a colour literal, a font under 12px or a foreign id, and with --check
   when something is stale. Valid diagrams are still rendered when another one fails.

   Source conventions
     * First line  %% alt: <accessible description>  becomes the SVG's <title>/aria-label.
     * No colours in sources (classDef fill:..., style, linkStyle colours fail the render).
       Emphasis without colour:  class NodeId dg-good | dg-bad | dg-warn | dg-hl | dg-mute
     * `backticks` mark a code / Latin span: plain text in English, an LTR island in Arabic.
       (Any other Latin phrase in an Arabic label is isolated automatically as well.)
     * Supported types: flowchart/graph, sequenceDiagram, classDiagram, erDiagram,
       stateDiagram-v2, mindmap, timeline, quadrantChart, pie (see STUBS). Others fail
       with "no shared stylesheet for diagram type" - add a stub and check the result.

   Fragment markup (exact)
     <!-- dg:<hash> -->
     <div class="dg" data-diagram="<id>"><div class="en"><svg id="dg-<id>-en" ...></div><div class="ar"><svg id="dg-<id>-ar" ...></div></div>

   Theming without doubling the SVGs
     Mermaid runs with theme "base" and EVERY colour-valued themeVariable set to a unique
     sentinel hex colour, so khroma never derives a colour of its own. Each sentinel is then
     replaced by a CSS custom property (var(--dg-node-fill) ...) that assets/css/diagram.css
     defines for light and dark. The few colours Mermaid hard-codes in attributes or its
     stylesheet are mapped explicitly (legacyAttr, CSS_PATCHES). Any colour literal left
     afterwards fails the render, so "nothing is unthemed" is proven on every run.
     (No light+dark fallback was needed for any supported type.)

   Weight: the fragment is markup only
     Mermaid's ~4-9 KB <style> per SVG is identical for every diagram of a type. A stub of
     each type is rendered once and its rules go into a generated block at the end of
     diagram.css as `.dg svg[data-t="<type>"] ...`; only rules that differ stay inline.
     Also: unused markers/symbols/ids are pruned, rough.js shapes become <rect> or thin
     polylines, per-word <tspan>s are merged, coordinates are rounded, ids are shortened
     (still unique per diagram and language). Text stays real <text>.

   Layout notes
     * htmlLabels are OFF: labels are SVG <text>, which never clips when the reader's
       font is a little wider than the one used for measuring.
     * Every diagram is MEASURED in an LTR page. The Arabic SVG is then shipped with
       direction:rtl and text-anchor start/end exchanged (SVG resolves them against
       direction), which puts each glyph run where the LTR measurement assumed it.
     * Wide diagrams (natural width > WIDE_PX) get data-wide and scroll sideways inside .dg
       on phones instead of shrinking their 16px text below ~11px.
   ============================================================================ */

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const SELF = fileURLToPath(import.meta.url);
const ROOT = path.resolve(path.dirname(SELF), '..');
let SRC_DIR = path.join(ROOT, 'src', 'diagrams');
let OUT_DIR = path.join(ROOT, 'assets', 'diagrams');
const CSS_FILE = path.join(ROOT, 'assets', 'css', 'diagram.css');
const MERMAID_JS = path.join(ROOT, 'node_modules', 'mermaid', 'dist', 'mermaid.min.js');
const MERMAID_PKG = path.join(ROOT, 'node_modules', 'mermaid', 'package.json');

const LANGS = ['en', 'ar'];
const WIDE_PX = 520;                       // natural width above which data-wide is set (16px text * 0.68 = 11px at 358px)
const MIN_FONT_PX = 12;                    // smallest font-size a diagram may use
const FONT = {
  en: '"Segoe UI", system-ui, Arial, sans-serif',
  ar: '"Segoe UI", "Noto Naskh Arabic", "Amiri", Tahoma, system-ui, sans-serif'
};

/* ----------------------------------------------------------------------------
   1. The theme contract: semantic --dg-* variables <- Mermaid theme variables.
   ---------------------------------------------------------------------------- */

// Every semantic variable, in a fixed order (the order fixes its sentinel).
const SEMANTIC = [
  'text', 'text-soft', 'on-line',
  'line', 'lifeline', 'grid',
  'bg', 'node-fill', 'node-stroke',
  'alt-fill', 'alt-stroke',
  'cluster-fill', 'cluster-stroke',
  'label-bg',
  'note-fill', 'note-stroke', 'note-text',
  'act-fill', 'act-stroke',
  'block-fill', 'block-stroke',
  'row-odd', 'row-even',
  'good', 'bad', 'warn', 'accent',
  'q1', 'q2', 'q3', 'q4', 'q-point', 'q-border',
  'pie-label', 'pie-stroke'
];
for (let i = 0; i < 12; i++) SEMANTIC.push('c' + i, 'c' + i + '-edge', 'c' + i + '-text');
for (let i = 1; i <= 12; i++) SEMANTIC.push('pie' + i);

// A unique, otherwise unlikely hex colour per semantic variable.
function sentinelFor(i) {
  const h = (n) => ('0' + n.toString(16)).slice(-2);
  return '#' + h(0x31 + i) + '7b' + h(0xe1 - i);
}
const SENTINEL = {};            // semantic -> '#xxxxxx'
const SEMANTIC_OF = {};         // '#xxxxxx' -> semantic
SEMANTIC.forEach((name, i) => {
  SENTINEL[name] = sentinelFor(i);
  SEMANTIC_OF[sentinelFor(i)] = name;
});

// Mermaid theme variable -> semantic variable. Anything colour-valued that is
// not listed here makes the run fail loudly (so a Mermaid upgrade that adds a
// variable cannot silently leak a derived colour).
const MAP = {
  background: 'bg', primaryColor: 'node-fill', primaryTextColor: 'text',
  secondaryColor: 'alt-fill', tertiaryColor: 'cluster-fill',
  primaryBorderColor: 'node-stroke', secondaryBorderColor: 'alt-stroke',
  tertiaryBorderColor: 'cluster-stroke',
  noteBkgColor: 'note-fill', noteBorderColor: 'note-stroke', noteTextColor: 'note-text',
  secondaryTextColor: 'text', tertiaryTextColor: 'text',
  lineColor: 'line', arrowheadColor: 'line', defaultLinkColor: 'line',
  textColor: 'text', border2: 'cluster-stroke', titleColor: 'text',
  nodeBkg: 'node-fill', mainBkg: 'node-fill', nodeBorder: 'node-stroke', nodeTextColor: 'text',
  clusterBkg: 'cluster-fill', clusterBorder: 'cluster-stroke',
  edgeLabelBackground: 'label-bg',
  actorBorder: 'node-stroke', actorBkg: 'node-fill', actorTextColor: 'text', actorLineColor: 'lifeline',
  labelBoxBkgColor: 'block-fill', labelBoxBorderColor: 'block-stroke',
  signalColor: 'line', signalTextColor: 'text', labelTextColor: 'text', loopTextColor: 'text',
  activationBorderColor: 'act-stroke', activationBkgColor: 'act-fill',
  sequenceNumberColor: 'on-line',
  rectBkgColor: 'cluster-fill', sectionBkgColor: 'cluster-fill', altSectionBkgColor: 'bg',
  sectionBkgColor2: 'node-fill', excludeBkgColor: 'cluster-fill',
  taskBorderColor: 'node-stroke', taskBkgColor: 'node-fill',
  activeTaskBorderColor: 'node-stroke', activeTaskBkgColor: 'node-fill',
  gridColor: 'grid', doneTaskBkgColor: 'alt-fill', doneTaskBorderColor: 'alt-stroke',
  critBorderColor: 'bad', critBkgColor: 'bad', todayLineColor: 'bad', vertLineColor: 'line',
  taskTextColor: 'text', taskTextOutsideColor: 'text', taskTextLightColor: 'text',
  taskTextDarkColor: 'text', taskTextClickableColor: 'accent',
  personBorder: 'node-stroke', personBkg: 'node-fill',
  rowOdd: 'row-odd', rowEven: 'row-even',
  attributeBackgroundColorOdd: 'row-odd', attributeBackgroundColorEven: 'row-even',
  transitionColor: 'line', transitionLabelColor: 'text', stateLabelColor: 'text',
  stateBkg: 'node-fill', labelBackgroundColor: 'label-bg',
  compositeBackground: 'cluster-fill', altBackground: 'cluster-fill',
  compositeTitleBackground: 'alt-fill', compositeBorder: 'node-stroke',
  innerEndBackground: 'line', specialStateColor: 'line',
  errorBkgColor: 'bad', errorTextColor: 'text',
  scaleLabelColor: 'text', classText: 'text',
  pieTitleTextColor: 'text', pieSectionTextColor: 'pie-label', pieLegendTextColor: 'text',
  pieStrokeColor: 'pie-stroke', pieOuterStrokeColor: 'pie-stroke',
  vennTitleTextColor: 'text', vennSetTextColor: 'text',
  wardleyEvolutionColor: 'bad',
  archEdgeColor: 'line', archEdgeArrowColor: 'line', archGroupBorderColor: 'line',
  quadrant1Fill: 'q1', quadrant2Fill: 'q2', quadrant3Fill: 'q3', quadrant4Fill: 'q4',
  quadrant1TextFill: 'text', quadrant2TextFill: 'text', quadrant3TextFill: 'text', quadrant4TextFill: 'text',
  quadrantPointFill: 'q-point', quadrantPointTextFill: 'text',
  quadrantXAxisTextFill: 'text', quadrantYAxisTextFill: 'text',
  quadrantInternalBorderStrokeFill: 'q-border', quadrantExternalBorderStrokeFill: 'q-border',
  quadrantTitleFill: 'text',
  requirementBackground: 'node-fill', requirementBorderColor: 'node-stroke', requirementTextColor: 'text',
  relationColor: 'line', relationLabelBackground: 'label-bg', relationLabelColor: 'text',
  branchLabelColor: 'text', tagLabelColor: 'text', tagLabelBackground: 'node-fill',
  tagLabelBorder: 'node-stroke', commitLabelColor: 'text', commitLabelBackground: 'alt-fill',
  emUiFill: 'node-fill', emUiStroke: 'node-stroke', emProcessorFill: 'node-fill',
  emProcessorStroke: 'node-stroke', emReadModelFill: 'node-fill', emReadModelStroke: 'node-stroke',
  emCommandFill: 'node-fill', emCommandStroke: 'node-stroke', emEventFill: 'node-fill',
  emEventStroke: 'node-stroke', emSwimlaneBackgroundOdd: 'row-odd',
  emSwimlaneBackgroundStroke: 'cluster-stroke', emArrowhead: 'line', emRelationStroke: 'line',
  gradientStart: 'node-stroke', gradientStop: 'alt-stroke'
};
for (let i = 0; i < 12; i++) {
  MAP['cScale' + i] = 'c' + i;
  MAP['cScalePeer' + i] = 'c' + i + '-edge';
  MAP['cScaleInv' + i] = 'c' + i + '-text';
  MAP['cScaleLabel' + i] = 'c' + i + '-text';
  MAP['pie' + (i + 1)] = 'pie' + (i + 1);
}
for (let i = 0; i < 8; i++) {
  MAP['git' + i] = 'c' + i; MAP['gitInv' + i] = 'c' + i + '-text';
  MAP['gitBranchLabel' + i] = 'c' + i + '-text';
  MAP['fillType' + i] = 'c' + i;
}
for (let i = 1; i <= 8; i++) MAP['venn' + i] = 'c' + (i - 1);
for (let i = 0; i < 5; i++) { MAP['surface' + i] = 'cluster-fill'; MAP['surfacePeer' + i] = 'cluster-stroke'; }

// Keys that look like colours by value but are not (or are handled otherwise).
const NOT_COLOUR_KEYS = new Set(['fontFamily', 'fontSize', 'dropShadow', 'fontWeight', 'noteFontWeight']);

const NAMED_COLOURS = new Set(('aliceblue antiquewhite aqua aquamarine azure beige bisque black blanchedalmond blue ' +
  'blueviolet brown burlywood cadetblue chartreuse chocolate coral cornflowerblue cornsilk crimson cyan darkblue ' +
  'darkcyan darkgoldenrod darkgray darkgreen darkgrey darkkhaki darkmagenta darkolivegreen darkorange darkorchid ' +
  'darkred darksalmon darkseagreen darkslateblue darkslategray darkslategrey darkturquoise darkviolet deeppink ' +
  'deepskyblue dimgray dimgrey dodgerblue firebrick floralwhite forestgreen fuchsia gainsboro ghostwhite gold ' +
  'goldenrod gray green greenyellow grey honeydew hotpink indianred indigo ivory khaki lavender lavenderblush ' +
  'lawngreen lemonchiffon lightblue lightcoral lightcyan lightgoldenrodyellow lightgray lightgreen lightgrey ' +
  'lightpink lightsalmon lightseagreen lightskyblue lightslategray lightslategrey lightsteelblue lightyellow lime ' +
  'limegreen linen magenta maroon mediumaquamarine mediumblue mediumorchid mediumpurple mediumseagreen ' +
  'mediumslateblue mediumspringgreen mediumturquoise mediumvioletred midnightblue mintcream mistyrose moccasin ' +
  'navajowhite navy oldlace olive olivedrab orange orangered orchid palegoldenrod palegreen paleturquoise ' +
  'palevioletred papayawhip peachpuff peru pink plum powderblue purple rebeccapurple red rosybrown royalblue ' +
  'saddlebrown salmon sandybrown seagreen seashell sienna silver skyblue slateblue slategray slategrey snow ' +
  'springgreen steelblue tan teal thistle tomato turquoise violet wheat white whitesmoke yellow yellowgreen').split(' '));

function looksLikeColour(v) {
  if (typeof v !== 'string') return false;
  const s = v.trim().toLowerCase();
  return /^#[0-9a-f]{3,8}$/.test(s) || /^(rgb|rgba|hsl|hsla)\(/.test(s) || NAMED_COLOURS.has(s);
}

/** Build the themeVariables object from Mermaid's own default key list. */
function buildThemeVariables(defaults) {
  const tv = {};
  const unmapped = [];
  for (const [k, v] of Object.entries(defaults)) {
    if (NOT_COLOUR_KEYS.has(k)) continue;
    if (MAP[k]) tv[k] = SENTINEL[MAP[k]];
    else if (looksLikeColour(v)) unmapped.push(k);
  }
  if (unmapped.length) {
    throw new Error('theme variables with no --dg-* mapping (add them to MAP in tools/render_diagrams.mjs): ' + unmapped.join(', '));
  }
  // behaviour switches that would otherwise add colour literals
  tv.useGradient = false;
  tv.pieOpacity = '1';
  tv.dropShadow = 'none';
  tv.darkMode = false;
  return tv;
}

function mermaidConfig(lang, themeVariables) {
  const font = FONT[lang];
  const common = { useMaxWidth: true };
  return {
    startOnLoad: false,
    securityLevel: 'strict',
    suppressErrorRendering: true,
    logLevel: 'fatal',
    theme: 'base',
    look: 'classic',
    themeVariables: Object.assign({ fontFamily: font, fontSize: '16px' }, themeVariables),
    fontFamily: font,
    htmlLabels: false,
    flowchart: Object.assign({ htmlLabels: false, curve: 'basis', nodeSpacing: 40, rankSpacing: 48, padding: 12, wrappingWidth: 220 }, common),
    sequence: Object.assign({ wrap: false, mirrorActors: true, actorMargin: 40, messageMargin: 36, boxMargin: 8,
      noteMargin: 12, width: 150, height: 44, messageFontSize: 16, noteFontSize: 15, actorFontSize: 16,
      messageFontFamily: font, noteFontFamily: font, actorFontFamily: font }, common),
    class: Object.assign({ htmlLabels: false }, common),
    er: Object.assign({ fontSize: 16, layoutDirection: 'TB', entityPadding: 14, minEntityWidth: 120, minEntityHeight: 60 }, common),
    state: Object.assign({ htmlLabels: false }, common),
    mindmap: Object.assign({ padding: 14, maxNodeWidth: 200 }, common),
    timeline: Object.assign({ disableMulticolor: false, leftMargin: 0 }, common),
    quadrantChart: Object.assign({ chartWidth: 520, chartHeight: 520, titleFontSize: 20, quadrantLabelFontSize: 16,
      xAxisLabelFontSize: 16, yAxisLabelFontSize: 16, pointLabelFontSize: 16, pointTextPadding: 8 }, common),
    pie: Object.assign({ textPosition: 0.6 }, common)
  };
}

/* ----------------------------------------------------------------------------
   2. Small CSS helpers (the <style> inside an SVG is machine-written, regular).
   ---------------------------------------------------------------------------- */

/** Split CSS text into top-level rule strings, honouring nested braces. */
function splitRules(css) {
  const rules = [];
  let depth = 0, start = 0;
  for (let i = 0; i < css.length; i++) {
    const c = css[i];
    if (c === '{') depth++;
    else if (c === '}') {
      depth--;
      if (depth === 0) { rules.push(css.slice(start, i + 1)); start = i + 1; }
    } else if (c === ';' && depth === 0) { rules.push(css.slice(start, i + 1)); start = i + 1; }
  }
  if (css.slice(start).trim()) rules.push(css.slice(start));
  return rules;
}

// Rules Mermaid always emits that can never apply to our (classic, static) output.
const DEAD_RULE = [
  /\[data-look="neo"\]/, /\.katex/, /mermaidTooltip/, /^\s*@keyframes/, /edge-animation/, /^\s*#[^{]*\s:root\s*\{/,
  /\.actorPopupMenu/, /\.disabled\b/          // link popups (sequence) and disabled mindmap nodes: never used here
];

// Colours Mermaid hard-codes in a stylesheet rule instead of taking them from the theme.
// Only the listed ones are accepted; any other literal still fails the render.
const CSS_PATCHES = [
  { sel: /\.stateGroup \.alt-composit/, prop: 'fill', lit: '#e0e0e0', to: 'alt-fill' },
  { sel: /\.statediagram \.edgeLabel\b/, prop: 'color', lit: 'red', to: 'text' },
  // ER relationship labels are hard-coded to 14px; they are measured (renderRaw) and shown at 16px
  { sel: /\.edgeLabel \.label\s*$/, prop: 'font-size', lit: '14px', raw: '16px' },
  // class diagram cardinalities (1, *, 0..1) are hard-coded to 11px
  { sel: /\.edgeTerminals\s*$/, prop: 'font-size', lit: '11px', raw: '14px' }
];
function patchCss(css, used) {
  return splitRules(css).map((r) => {
    const open = r.indexOf('{');
    if (open < 0) return r;
    const head = r.slice(0, open);
    let out = r;
    CSS_PATCHES.forEach((p) => {
      if (!p.sel.test(head)) return;
      const re = new RegExp('(' + p.prop + '\\s*:\\s*)' + p.lit.replace(/[#.]/g, '\\$&') + '(?![\\w#])', 'i');
      out = out.replace(re, (m, pre) => { if (p.raw) return pre + p.raw; used.add(p.to); return pre + 'var(--dg-' + p.to + ')'; });
    });
    return out;
  }).join('');
}

// Colours Mermaid hard-codes in element ATTRIBUTES (sequence actors, notes, ER markers, timeline).
// Where its stylesheet also styles the element these are overridden anyway; we map them to the
// equivalent theme role so the result is identical either way.
function legacyAttr(cls, name, value) {
  const v = value.trim().toLowerCase();
  const c = ' ' + cls + ' ';
  const isBlack = v === 'black' || v === '#000' || v === '#000000';
  const isWhite = v === 'white' || v === '#fff' || v === '#ffffff';
  if (name === 'fill') {
    if (v === '#eaeaea') return 'node-fill';                                      // sequence actor box
    if (v === '#edf2ae') return /\snote\s/.test(c) ? 'note-fill' : 'act-fill';     // note / activation bar
    if (isWhite) return 'bg';                                                     // ER cardinality circles
    if (isBlack) return 'text';
  }
  if (name === 'stroke') {
    if (v === '#666') return /\snote\s/.test(c) ? 'note-stroke' : /\sactivation/.test(c) ? 'act-stroke' : 'node-stroke';
    if (v === '#999') return 'lifeline';                                          // sequence lifeline
    if (isBlack) return 'line';                                                   // arrow marks, timeline guides
  }
  return null;
}
function dropDeadRules(css) {
  return splitRules(css).filter((r) => !DEAD_RULE.some((re) => re.test(r.slice(0, r.indexOf('{') + 1)))).join('');
}

/** Declarations of a (possibly nested) rule list: [{rule, prop, value}] */
function declarations(css) {
  const out = [];
  (function walk(text) {
    splitRules(text).forEach((rule) => {
      const open = rule.indexOf('{');
      if (open < 0) return;
      const head = rule.slice(0, open).trim();
      const body = rule.slice(open + 1, rule.lastIndexOf('}'));
      if (/^@(media|supports)/.test(head)) { walk(body); return; }
      if (/^@/.test(head)) return;
      body.split(';').forEach((d) => {
        const i = d.indexOf(':');
        if (i < 0) return;
        out.push({ rule: head, prop: d.slice(0, i).trim().toLowerCase(), value: d.slice(i + 1).trim() });
      });
    });
  })(css);
  return out;
}

const NEUTRAL_WORDS = new Set(['none', 'transparent', 'currentcolor', 'inherit', 'initial', 'unset', 'revert']);

/** Colour literals in a CSS value (after var()/url()/strings are blanked out). */
function colourLiterals(prop, value) {
  if (/^(font|--|content|animation|transition|counter)/.test(prop)) return [];
  let v = value.replace(/var\([^)]*\)/g, ' ').replace(/url\([^)]*\)/g, ' ').replace(/"[^"]*"|'[^']*'/g, ' ');
  v = v.replace(/color-mix\(\s*in\s+[a-z-]+\s*,/g, ' ');
  const found = [];
  let m;
  const hexRe = /#[0-9a-fA-F]{3,8}\b/g;
  while ((m = hexRe.exec(v))) found.push(m[0]);
  const fnRe = /\b(rgba?|hsla?|hwb|lab|lch|oklab|oklch|color)\(/gi;
  while ((m = fnRe.exec(v))) found.push(m[0] + '...)');
  const wordRe = /[a-zA-Z]+/g;
  while ((m = wordRe.exec(v))) {
    const w = m[0].toLowerCase();
    if (NEUTRAL_WORDS.has(w)) continue;
    if (NAMED_COLOURS.has(w)) found.push(m[0]);
  }
  return found;
}

/* ----------------------------------------------------------------------------
   3. Post-processing of one rendered SVG.
   ---------------------------------------------------------------------------- */

const COLOUR_ATTRS = ['fill', 'stroke', 'stop-color', 'flood-color', 'lighting-color', 'color'];

function escapeAttr(s) {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function escapeText(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/** Replace sentinel hex colours - and rgb()/rgba() forms of them - by var(--dg-*). */
function sentinelsToVars(text, used) {
  let out = text.replace(/#[0-9a-fA-F]{6}\b/g, (m) => {
    const name = SEMANTIC_OF[m.toLowerCase()];
    if (!name) return m;
    used.add(name);
    return 'var(--dg-' + name + ')';
  });
  // khroma writes rgba(r, g, b, a) when a sentinel was faded; recover the sentinel.
  out = out.replace(/rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*(?:,\s*([\d.]+)\s*)?\)/g, (m, r, g, b, a) => {
    const h = (n) => ('0' + Math.round(parseFloat(n)).toString(16)).slice(-2);
    const name = SEMANTIC_OF['#' + h(r) + h(g) + h(b)];
    if (!name) return m;
    used.add(name);
    const alpha = a === undefined ? 1 : parseFloat(a);
    if (alpha >= 0.999) return 'var(--dg-' + name + ')';
    return 'color-mix(in srgb, var(--dg-' + name + ') ' + Math.round(alpha * 100) + '%, transparent)';
  });
  return out;
}

/** Walk every start tag; fn(tagName, attrs[{name,value}]) may return a new attrs array. */
function mapTags(svg, fn) {
  return svg.replace(/<([a-zA-Z][\w:-]*)((?:\s+[\w:.-]+(?:="[^"]*")?)*)\s*(\/?)>/g, (all, tag, rawAttrs, selfClose) => {
    const attrs = [];
    rawAttrs.replace(/\s+([\w:.-]+)(?:="([^"]*)")?/g, (_, n, v) => { attrs.push({ name: n, value: v === undefined ? null : v }); return ''; });
    const res = fn(tag, attrs);
    if (!res) return all;
    return '<' + tag + res.map((a) => ' ' + a.name + (a.value === null ? '' : '="' + a.value + '"')).join('') + selfClose + '>';
  });
}

function getAttr(attrs, name) {
  const a = attrs.find((x) => x.name === name);
  return a ? a.value : undefined;
}
function setAttr(attrs, name, value) {
  const a = attrs.find((x) => x.name === name);
  if (a) a.value = value; else attrs.push({ name, value });
}
function delAttr(attrs, name) {
  const i = attrs.findIndex((x) => x.name === name);
  if (i >= 0) attrs.splice(i, 1);
}

function swapAnchor(s) {
  return s.replace(/text-anchor(\s*[:=]\s*"?)(start|end)\b/g, (m, sep, v) => 'text-anchor' + sep + (v === 'start' ? 'end' : 'start'));
}

/* ---------- slimming: shared helpers ---------- */

const f1 = (n) => { const r = Math.round(n * 10) / 10; return Object.is(r, -0) || r === 0 ? '0' : String(r); };

/** Parse an absolute M/L/C/Z path (what rough.js writes) into polylines of its on-curve points. */
function parseRoughPath(d) {
  if (!/^[MLCZ0-9eE.,\s-]+$/.test(d)) return null;
  const toks = d.match(/[MLCZ]|-?(?:\d+\.?\d*|\.\d+)(?:e-?\d+)?/g);
  if (!toks) return null;
  const subs = [];
  let cur = null, i = 0, cmd = null, curveSegs = 0;
  const num = () => parseFloat(toks[i++]);
  while (i < toks.length) {
    if (/[MLCZ]/.test(toks[i])) cmd = toks[i++];
    if (cmd === 'M') { cur = { pts: [[num(), num()]], closed: false }; subs.push(cur); }
    else if (cmd === 'L') { if (!cur) return null; cur.pts.push([num(), num()]); }
    else if (cmd === 'C') { if (!cur) return null; i += 4; cur.pts.push([num(), num()]); curveSegs++; }
    else if (cmd === 'Z') { if (cur) cur.closed = true; }
    else return null;
  }
  return { subs, curveSegs };
}

/** Ramer-Douglas-Peucker on an open polyline. */
function rdp(pts, eps) {
  if (pts.length < 3) return pts;
  const [ax, ay] = pts[0], [bx, by] = pts[pts.length - 1];
  const dx = bx - ax, dy = by - ay, len = Math.hypot(dx, dy) || 1e-9;
  let idx = 0, dmax = -1;
  for (let k = 1; k < pts.length - 1; k++) {
    const dist = Math.abs((pts[k][0] - ax) * dy - (pts[k][1] - ay) * dx) / len;
    if (dist > dmax) { dmax = dist; idx = k; }
  }
  if (dmax <= eps) return [pts[0], pts[pts.length - 1]];
  return rdp(pts.slice(0, idx + 1), eps).slice(0, -1).concat(rdp(pts.slice(idx), eps));
}

function near(a, b, tol) { return Math.abs(a[0] - b[0]) <= tol && Math.abs(a[1] - b[1]) <= tol; }

/** Drop the duplicate second pass rough.js draws over the first. */
function dedupeSubs(subs) {
  const out = [];
  subs.forEach((s) => {
    const first = s.pts[0], last = s.pts[s.pts.length - 1];
    if (s.pts.every((p) => near(p, first, 0.05))) return;                // zero-length
    if (s.pts.length === 2 && out.some((o) => o.pts.length === 2 && near(o.pts[0], last, 0.6) && near(o.pts[1], first, 0.6))) return;   // same segment, reversed
    if (!out.some((o) => near(o.pts[0], first, 0.6) && near(o.pts[o.pts.length - 1], last, 0.6))) out.push(s);
  });
  return out;
}

function pathData(subs) {
  const pt = (p, prev) => f1(p[0]) + (p[1] < 0 && f1(p[1])[0] === '-' ? '' : ' ') + f1(p[1]);
  return subs.map((s) => {
    const p = rdp(s.pts, 0.12);
    return 'M' + pt(p[0]) + p.slice(1).map((q) => 'L' + pt(q)).join('') + (s.closed ? 'Z' : '');
  }).join('');
}

/** Is this outline (points on the boundary) a rounded rectangle? -> {x,y,w,h,r} */
function asRoundedRect(pts) {
  if (pts.length < 4) return null;
  const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
  const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
  const w = x1 - x0, h = y1 - y0;
  if (w < 4 || h < 4) return null;
  const p0 = pts[0];
  const cands = [];
  if (Math.abs(p0[1] - y0) < 0.3) cands.push(p0[0] - x0);
  if (Math.abs(p0[1] - y1) < 0.3) cands.push(p0[0] - x0);
  if (Math.abs(p0[0] - x0) < 0.3) cands.push(p0[1] - y0);
  cands.push(0, Math.min(w, h) / 2, 5, 4, 3, 8);
  const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
  let area = 0;
  for (let k = 0; k < pts.length; k++) { const a = pts[k], b = pts[(k + 1) % pts.length]; area += a[0] * b[1] - b[0] * a[1]; }
  area = Math.abs(area) / 2;
  for (const r0 of cands) {
    const r = Math.max(0, Math.min(r0, w / 2, h / 2));
    let ok = true;
    for (const p of pts) {
      const qx = Math.abs(p[0] - cx) - (w / 2 - r), qy = Math.abs(p[1] - cy) - (h / 2 - r);
      const sd = Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) + Math.min(Math.max(qx, qy), 0) - r;
      if (Math.abs(sd) > 0.5) { ok = false; break; }
    }
    if (!ok) continue;
    const want = w * h - (4 - Math.PI) * r * r;
    if (Math.abs(area - want) / want > 0.04) continue;
    return { x: x0, y: y0, w, h, r };
  }
  return null;
}

function parseAttrString(s) {
  const attrs = [];
  s.replace(/\s*([\w:.-]+)(?:="([^"]*)")?/g, (m, n, v) => { if (n) attrs.push({ name: n, value: v === undefined ? null : v }); return ''; });
  return attrs;
}
function attrString(attrs) { return attrs.map((a) => a.name + (a.value === null ? '' : '="' + a.value + '"')).join(' '); }

/** Compact rough.js shapes: rounded rectangles become <rect>, everything else a thin polyline. */
function slimPaths(svg, dropRectDefaults) {
  const info = (a) => {
    const attrs = parseAttrString(a);
    if (getAttr(attrs, 'id') !== undefined || getAttr(attrs, 'class') !== undefined || getAttr(attrs, 'marker-end') !== undefined) return null;
    const d = getAttr(attrs, 'd');
    if (!d) return null;
    const parsed = parseRoughPath(d);
    if (!parsed || parsed.curveSegs < 1 && parsed.subs.every((s) => s.pts.length < 3)) return null;
    const noFill = getAttr(attrs, 'fill') === 'none';
    const noStroke = getAttr(attrs, 'stroke') === 'none';
    return { attrs, parsed, kind: noStroke ? 'fill' : noFill ? 'stroke' : 'other' };
  };
  const styleOf = (I) => { const s = getAttr(I.attrs, 'style'); return s ? s.split(';').map((x) => x.trim()).filter(Boolean) : []; };
  // a fill outline followed by its stroke outline: one <rect>
  svg = svg.replace(/<path ([^>]*?)><\/path><path ([^>]*?)><\/path>/g, (all, a1, a2) => {
    const A = info(a1), B = info(a2);
    if (!A || !B || A.kind !== 'fill' || B.kind !== 'stroke' || A.parsed.subs.length !== 1) return all;
    const rr = asRoundedRect(A.parsed.subs[0].pts);
    if (!rr) return all;
    const bb = dedupeSubs(B.parsed.subs);
    const bpts = [].concat(...bb.map((s) => s.pts));
    const bx = [Math.min(...bpts.map((p) => p[0])), Math.max(...bpts.map((p) => p[0]))];
    const by = [Math.min(...bpts.map((p) => p[1])), Math.max(...bpts.map((p) => p[1]))];
    if (!bb.length || Math.abs(bx[0] - rr.x) > 0.6 || Math.abs(bx[1] - rr.x - rr.w) > 0.6 || Math.abs(by[0] - rr.y) > 0.6 || Math.abs(by[1] - rr.y - rr.h) > 0.6) return all;
    const decls = [...new Set(styleOf(A).concat(styleOf(B)))].filter((x) => !(dropRectDefaults && (x === 'fill:var(--dg-node-fill)' || x === 'stroke:var(--dg-node-stroke)')));
    return '<rect x="' + f1(rr.x) + '" y="' + f1(rr.y) + '" width="' + f1(rr.w) + '" height="' + f1(rr.h) + '"' +
      (rr.r > 0.2 ? ' rx="' + f1(rr.r) + '"' : '') + (decls.length ? ' style="' + decls.join(';') + '"' : '') + '/>';
  });
  // any other rough shape: thin polyline, first pass only
  svg = svg.replace(/<path ([^>]*?)><\/path>/g, (all, a) => {
    const I = info(a);
    if (!I) return all;
    const subs = dedupeSubs(I.parsed.subs);
    setAttr(I.attrs, 'd', pathData(subs));
    delAttr(I.attrs, 'stroke-dasharray');
    delAttr(I.attrs, 'stroke-width');
    return '<path ' + attrString(I.attrs) + '/>';
  });
  return svg;
}

/** Remove <marker>/<symbol>/<filter>/... nothing points at (Mermaid always emits the whole set). */
function pruneDefs(svg) {
  for (let pass = 0; pass < 3; pass++) {
    const before = svg;
    const whole = svg;
    svg = whole.replace(/<(marker|symbol|filter|linearGradient|radialGradient|clipPath|mask|pattern)\b[^>]*?\bid="([^"]+)"[^>]*>[\s\S]*?<\/\1>/g, (m, tag, id) =>
      (whole.indexOf('url(#' + id + ')') >= 0 || whole.indexOf('href="#' + id + '"') >= 0) ? m : '');
    svg = svg.replace(/<defs>\s*<\/defs>/g, '');
    if (svg === before) break;
  }
  return svg;
}

/** ids nothing refers to are noise (and a collision risk when many diagrams share a page). */
function pruneIds(svg, rootId) {
  const ref = new Set([rootId]);
  let m;
  const re = /url\(#([^)]+)\)|href="#([^"]+)"|aria-(?:labelledby|describedby)="([^"]+)"/g;
  while ((m = re.exec(svg))) (m[1] || m[2] || m[3]).split(/\s+/).forEach((x) => ref.add(x));
  return mapTags(svg, (tag, attrs) => {
    const id = getAttr(attrs, 'id');
    if (id === undefined || ref.has(id)) return null;
    delAttr(attrs, 'id');
    return attrs;
  });
}

/**
 * Arabic labels: every Latin phrase becomes an LTR island (Unicode isolates), so that
 * "pd.read_csv()", ".venv", "01_explore.ipynb", "Power BI Desktop" or "GET /schools?page=1"
 * keep their own order and punctuation inside a right-to-left line. A phrase is a run of ASCII
 * letters, digits and code punctuation (spaces allowed); trailing sentence punctuation and
 * unbalanced closing brackets stay outside. Spans the author already wrapped in backticks
 * (already isolates by now) are left alone.
 */
const LRI = '\u2066', PDI = '\u2069';
const LATIN_RUN = /[.#@+~-]?[A-Za-z0-9][A-Za-z0-9 _.\-\/\\:()\[\]=+*<>%$&'?!,;~^|"{}]*/g;
function isolateLatin(svg) {
  const dec = (t) => t.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&amp;/g, '&');
  const enc = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const wrap = (seg) => seg.replace(LATIN_RUN, (m) => {
    let r = m.replace(/[ .,;:!?-]+$/, '');
    const bal = (o, c) => { while (r.endsWith(c) && r.split(c).length > r.split(o).length) r = r.slice(0, -1); };
    bal('(', ')'); bal('[', ']'); bal('{', '}');
    r = r.replace(/[ .,;:!?-]+$/, '');
    if (!/[A-Za-z]/.test(r)) return m;
    return LRI + r + PDI + m.slice(r.length);
  });
  return svg.replace(/(<(?:tspan|text)\b[^>]*>)([^<]+)(<\/(?:tspan|text)>)/g, (m, open, text, close) => {
    const parts = dec(text).split(/(\u2066[^\u2069]*\u2069)/);
    return open + enc(parts.map((seg, i) => (i % 2 ? seg : wrap(seg))).join('')) + close;
  });
}

/** y + dy on a tspan is one absolute position; the text's own y is then dead weight. */
function tidyText(svg) {
  svg = svg.replace(/<tspan((?: [\w:-]+="[^"]*")*?) y="(-?[\d.]+)em" dy="(-?[\d.]+)em"/g, (m, pre, y, dy) => {
    const v = Math.round((parseFloat(y) + parseFloat(dy)) * 100) / 100;
    return '<tspan' + pre + ' y="' + v + 'em"';
  });
  return svg.replace(/<text y="-?[\d.]+"((?: [^>]*)?)><tspan((?: [\w:-]+="[^"]*")*) y="/g, '<text$1><tspan$2 y="');
}

/** Short, still unique ids: Mermaid's are "<svgId>-<long name>" and repeat in every url(#...). */
function shortenIds(svg, svgId) {
  const ids = [];
  svg.replace(/ id="([^"]+)"/g, (m, v) => { if (v !== svgId) ids.push(v); return m; });
  const tag = 'd' + sha(svgId).slice(0, 5);
  ids.sort((a, b) => b.length - a.length).forEach((old, i) => {
    if (old.length < tag.length + 4) return;
    const nu = tag + '-' + i;
    svg = svg.split('"' + old + '"').join('"' + nu + '"').split('"#' + old + '"').join('"#' + nu + '"').split('#' + old + ')').join('#' + nu + ')');
  });
  return svg;
}

/** Zero-size placeholder rects and attribute-less groups only add bytes. */
function tidyStructure(svg) {
  svg = svg.replace(/<rect(?: class="background")?(?: style="[^"]*")?><\/rect>/g, '');
  for (let i = 0; i < 6; i++) {
    const before = svg;
    svg = svg.replace(/<g>((?:(?!<g[ >])(?!<\/g>)[\s\S])*)<\/g>/g, '$1');
    if (svg === before) break;
  }
  return svg;
}

/** Mermaid writes one <tspan> per word, each with default attributes; merge them. */
function mergeTspans(svg) {
  const inner = '<tspan(?: font-style="normal")?(?: class="text-inner-tspan")?(?: font-weight="normal")?>([^<]*)<\\/tspan>';
  const re = new RegExp('(<tspan\\b[^>]*>)((?:' + inner + ')+)(<\\/tspan>)', 'g');
  svg = svg.replace(re, (m, open, run, _w, close) => {
    const text = run.replace(new RegExp(inner, 'g'), '$1');
    return open + text + close;
  });
  return svg.replace(/ class="text-outer-tspan row"/g, '');
}

function cleanStyleAttr(v) {
  const seen = new Set();
  const out = [];
  // split on ';' but not inside an entity such as &quot;
  v.split(/(?<!&\w{1,6});/).map((x) => x.trim().replace(/\s*:\s*/, ':')).forEach((x) => {
    if (!x || /(^|:)\s*undefined\s*$/.test(x) || x === 'undefined' || /^font-family\s*:/.test(x)) return;   // font is inherited from the svg
    if (seen.has(x)) return;
    seen.add(x); out.push(x);
  });
  return out.join(';');
}

/** Numbers with 2+ decimals -> 1 decimal (never touches relative path data, em/px units, exponents). */
function roundNumbers(name, value) {
  if (!/^(d|points|transform|x|y|x1|x2|y1|y2|cx|cy|r|rx|ry|width|height)$/.test(name)) return value;
  const relative = name === 'd' && /[a-df-y]/.test(value);             // relative commands accumulate: 2 decimals
  const digits = relative ? 100 : 10;
  const fmt = (n) => { const r = Math.round(n * digits) / digits; return r === 0 ? '0' : String(r); };
  let out = value.replace(/(?<![\d.])(-?)(\d+)\.(\d{2,})(?![\de%])(?!px|em|ex)/g, (m, sgn, i, f) => {
    const r = fmt(Number(i + '.' + f));
    return (sgn && r !== '0' ? '-' : '') + r;
  });
  if (name === 'd') out = out.replace(/\s+/g, ' ').replace(/ ?([a-zA-Z]) ?/g, '$1').replace(/, /g, ',');
  return out.replace(/, /g, ',');
}

/** Per-rule key that ignores the svg id and the (inherited) font family. '#id' -> '§'. */
function ruleKey(rule, svgId) {
  const k = rule.split('#' + svgId).join('§').replace(/font-family\s*:[^;}]*;?/g, '');
  return /\{\s*\}\s*$/.test(k) ? null : k;
}

function postProcess(svg, o) {
  const { id, lang, alt } = o;
  const used = o.used;
  const svgId = o.svgId || 'dg-' + id + '-' + lang;
  const problems = [];

  // ---- root geometry and type
  const rootMatch = svg.match(/^<svg\b[^>]*>/);
  if (!rootMatch) throw new Error('Mermaid returned no <svg> root');
  const vb = (rootMatch[0].match(/viewBox="([^"]+)"/) || [])[1];
  if (!vb) throw new Error('rendered SVG has no viewBox');
  const vbn = vb.split(/[\s,]+/).map(Number);
  const natW = Math.ceil(vbn[2]);
  const natH = Math.ceil(vbn[3]);
  const wide = natW > WIDE_PX;
  const type = (rootMatch[0].match(/aria-roledescription="([^"]*)"/) || [])[1] || 'unknown';
  const rootClass = (rootMatch[0].match(/class="([^"]*)"/) || [])[1] || '';

  // ---- the <style> block(s): drop dead rules, theme the rest
  svg = svg.replace(/<style>([\s\S]*?)<\/style>/g, (m, css) => '<style>' + dropDeadRules(css) + '</style>');

  // ---- sentinels -> custom properties
  svg = sentinelsToVars(svg, used);
  svg = svg.replace(/<style>([\s\S]*?)<\/style>/g, (m, css) => '<style>' + patchCss(css, used) + '</style>');

  // ---- tags: presentation attributes -> inline style; tidy; round
  svg = mapTags(svg, (tag, attrs) => {
    if (tag === 'svg' && getAttr(attrs, 'id') === svgId) return null; // root handled below
    let changed = false;
    let style = getAttr(attrs, 'style');
    for (const n of COLOUR_ATTRS) {
      let v = getAttr(attrs, n);
      if (v && !/var\(--dg-/.test(v)) {
        const role = legacyAttr(getAttr(attrs, 'class') || '', n, v);
        if (role) {
          used.add(role);
          // Mermaid's own CSS colours these (the attribute is a dead default): drop it
          if (/(^| )(actor|note|activation[0-9]|actor-line)( |$)/.test(getAttr(attrs, 'class') || '')) { delAttr(attrs, n); changed = true; continue; }
          v = 'var(--dg-' + role + ')'; setAttr(attrs, n, v);
        }
      }
      if (v !== undefined && v !== null && /var\(--dg-|color-mix\(/.test(v)) {
        delAttr(attrs, n);
        style = (style && style.trim() ? style.replace(/;?\s*$/, ';') + ' ' : '') + n + ':' + v + ';';
        changed = true;
      }
    }
    if (changed && style !== undefined) setAttr(attrs, 'style', style);
    for (const a of attrs) {
      if (a.value === null) continue;
      if (a.name === 'style') { const c = cleanStyleAttr(a.value); if (c !== a.value) { a.value = c; changed = true; } continue; }
      const r = roundNumbers(a.name, a.value);
      if (r !== a.value) { a.value = r; changed = true; }
    }
    for (const a of attrs.slice()) {
      const drop = /^data-(?!wide$)/.test(a.name) || a.name === 'font-family' ||
        (a.name === 'style' && a.value === '') ||
        (a.name === 'stroke-dasharray' && /^0( 0)?$/.test(a.value)) ||
        (a.name === 'alignment-baseline' && getAttr(attrs, 'dominant-baseline') === a.value) ||
        (a.name === 'class' && tag === 'tspan');
      if (drop) { delAttr(attrs, a.name); changed = true; }
      else if (a.name === 'class') {
        const uniq = [...new Set(a.value.split(/\s+/).filter(Boolean))].join(' ');
        if (uniq !== a.value) { a.value = uniq; changed = true; }
      }
    }
    if (tag === 'foreignObject') problems.push('foreignObject label found (htmlLabels must stay off)');
    return changed ? attrs : null;
  });

  // ---- markers/filters/symbols nothing points at (Mermaid always emits the whole set)
  svg = pruneDefs(svg);

  // ---- proof: no colour literal may remain (checked on the full stylesheet, before it is hoisted)
  const left = scanColours(svg);
  if (left.length) problems.push('colour literal(s) left after theming: ' + left.slice(0, 8).join(' | ') + (left.length > 8 ? ' ...' : '') + '  [colours belong in diagram.css; in a source use: class NodeId dg-good | dg-bad | dg-warn | dg-hl | dg-mute]');

  // ---- the stylesheet: rules identical to the shared per-type sheet (diagram.css) are dropped
  const styleMatch = svg.match(/<style>([\s\S]*?)<\/style>/);
  const rules = styleMatch ? splitRules(styleMatch[1]).map((r) => ({ text: r, key: ruleKey(r, svgId) })).filter((r) => r.key) : [];
  if (o.ref) return { type, keys: rules.map((r) => r.key), problems, used };
  const refKeys = o.refs && o.refs.get(type);
  const kept = rules.filter((r) => !refKeys || !refKeys.has(r.key));
  svg = svg.replace(/<style>[\s\S]*?<\/style>/, kept.length ? '<style>' + kept.map((r) => r.key.split('§').join('#' + svgId)).join('') + '</style>' : '');
  if (!refKeys) problems.push('no shared stylesheet for diagram type "' + type + '" (add a stub for it to STUBS in tools/render_diagrams.mjs)');

  // ---- shrink the markup
  const nodeRectDefault = !!refKeys && [...refKeys].some((k) => /\.node rect/.test(k) && k.includes('fill:var(--dg-node-fill)') && k.includes('stroke:var(--dg-node-stroke)'));
  svg = slimPaths(svg, nodeRectDefault);
  svg = pruneIds(svg, svgId);
  svg = mergeTspans(svg);
  svg = tidyStructure(svg);
  svg = tidyText(svg);
  svg = shortenIds(svg, svgId);
  if (lang === 'ar') svg = isolateLatin(svg);

  // ---- Arabic: text-anchor start/end are relative to direction; keep Mermaid's LTR geometry
  if (lang === 'ar') svg = swapAnchor(svg);

  // ---- every remaining id must be ours (many diagrams share one page)
  const stray = [];
  svg.replace(/\sid="([^"]+)"/g, (m, v) => { if (v !== svgId && v.indexOf('d' + sha(svgId).slice(0, 5) + '-') !== 0) stray.push(v); return m; });
  if (stray.length) problems.push('element id(s) not prefixed with ' + svgId + ': ' + stray.slice(0, 4).join(', '));

  // ---- root element
  const dir = lang === 'ar' ? 'rtl' : 'ltr';
  const rootAttrs = [];
  rootAttrs.push(['id', svgId]);
  if (rootClass) rootAttrs.push(['class', rootClass]);
  rootAttrs.push(['data-t', type]);
  rootAttrs.push(['xmlns', 'http://www.w3.org/2000/svg']);
  rootAttrs.push(['viewBox', vb]);
  // Arabic: direction:rtl gives labels the right base direction, but SVG resolves text-anchor
  // start/end against it, so Mermaid's LTR geometry needs the implicit "start" flipped as well
  // (explicit start/end were swapped above; "middle" is direction-free).
  rootAttrs.push(['style', 'width:100%;height:auto;max-width:' + natW + 'px;--dg-w:' + natW + 'px;direction:' + dir + (lang === 'ar' ? ';text-anchor:end' : '')]);
  if (wide) rootAttrs.push(['data-wide', '1']);
  if (alt) {
    rootAttrs.push(['role', 'img']);
    rootAttrs.push(['aria-label', escapeAttr(alt)]);
  } else {
    rootAttrs.push(['role', 'graphics-document document']);
  }
  const rootTag = '<svg' + rootAttrs.map(([n, v]) => ' ' + n + '="' + v + '"').join('') + '>';
  svg = rootTag + svg.slice(svg.match(/^<svg\b[^>]*>/)[0].length);
  if (alt) {
    // Mermaid may already have inserted a <title>; ours goes first.
    svg = svg.replace(/<title\b[^>]*>[\s\S]*?<\/title>/g, '');
    svg = svg.replace(/^(<svg[^>]*>)/, '$1<title>' + escapeText(alt) + '</title>');
  }

  return { svg, natW, natH, wide, problems, type };
}

/** Every colour literal still present in styles or colour-bearing attributes. */
function scanColours(svg) {
  const found = [];
  svg.replace(/<style>([\s\S]*?)<\/style>/g, (m, css) => {
    declarations(css).forEach((d) => colourLiterals(d.prop, d.value).forEach((c) => found.push(c + ' in ' + d.rule.slice(0, 60) + ' {' + d.prop + '}')));
    return m;
  });
  const tagRe = /<([a-zA-Z][\w:-]*)((?:\s+[\w:.-]+(?:="[^"]*")?)*)\s*\/?>/g;
  let t;
  while ((t = tagRe.exec(svg))) {
    const attrs = [];
    t[2].replace(/\s+([\w:.-]+)(?:="([^"]*)")?/g, (_, n, v) => { attrs.push({ name: n, value: v === undefined ? '' : v }); return ''; });
    for (const a of attrs) {
      if (COLOUR_ATTRS.indexOf(a.name) >= 0) colourLiterals(a.name, a.value).forEach((c) => found.push(c + ' in <' + t[1] + ' ' + a.name + '>'));
      if (a.name === 'style') a.value.split(';').forEach((dcl) => {
        const i = dcl.indexOf(':');
        if (i > 0) colourLiterals(dcl.slice(0, i).trim().toLowerCase(), dcl.slice(i + 1)).forEach((c) => found.push(c + ' in <' + t[1] + ' style>'));
      });
    }
  }
  return [...new Set(found)];
}

/* ----------------------------------------------------------------------------
   4. Sources, hashing, files.
   ---------------------------------------------------------------------------- */

function readSource(file) {
  return fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n');
}

/** `%% alt: ...` on the first non-blank line. */
function altOf(text) {
  const first = text.split('\n').find((l) => l.trim() !== '');
  const m = first && first.match(/^\s*%%\s*alt:\s*(.+?)\s*$/i);
  return m ? m[1] : '';
}

/** `code` spans: isolates for Arabic, plain text for English. */
function applyCodeSpans(text, lang) {
  return text.replace(/`([^`\n]+)`/g, (m, s) => (lang === 'ar' ? '\u2066' + s + '\u2069' : s));
}

function loadSources(onlyIds) {
  if (!fs.existsSync(SRC_DIR)) return { items: [], errors: ['missing folder ' + rel(SRC_DIR)] };
  const files = fs.readdirSync(SRC_DIR).filter((f) => f.endsWith('.mmd'));
  const ids = new Map();
  const errors = [];
  for (const f of files) {
    const m = f.match(/^(.+)\.(en|ar)\.mmd$/);
    if (!m) { errors.push(rel(path.join(SRC_DIR, f)) + ': file name must be <id>.en.mmd or <id>.ar.mmd'); continue; }
    if (!/^[a-z0-9][a-z0-9-]*$/.test(m[1])) { errors.push(rel(path.join(SRC_DIR, f)) + ': diagram id must match [a-z0-9][a-z0-9-]*'); continue; }
    if (!ids.has(m[1])) ids.set(m[1], {});
    ids.get(m[1])[m[2]] = path.join(SRC_DIR, f);
  }
  let list = [...ids.keys()].sort();
  if (onlyIds.length) {
    for (const want of onlyIds) if (!ids.has(want)) errors.push('unknown diagram id "' + want + '" (no src/diagrams/' + want + '.{en,ar}.mmd)');
    list = list.filter((i) => onlyIds.indexOf(i) >= 0);
  }
  const items = [];
  for (const id of list) {
    const e = ids.get(id);
    let ok = true;
    for (const l of LANGS) if (!e[l]) { errors.push(rel(SRC_DIR) + '/' + id + '.' + l + '.mmd is missing (every diagram needs both languages)'); ok = false; }
    if (!ok) continue;
    const src = {};
    for (const l of LANGS) src[l] = readSource(e[l]);
    items.push({ id, files: e, src });
  }
  return { items, errors, allIds: [...ids.keys()] };
}

function rel(p) { return path.relative(ROOT, p).replace(/\\/g, '/'); }
function sha(s) { return crypto.createHash('sha256').update(s).digest('hex'); }

let _salt = null;
function salt() {
  if (_salt) return _salt;
  const pkg = JSON.parse(fs.readFileSync(MERMAID_PKG, 'utf8'));
  _salt = sha(['dg-1', pkg.version, fs.readFileSync(SELF, 'utf8'),
    JSON.stringify([SENTINEL, MAP, FONT, WIDE_PX, MIN_FONT_PX])].join('\u0000')).slice(0, 16);
  return _salt;
}
function hashOf(item) {
  return sha([salt(), item.src.en, item.src.ar].join('\u0000')).slice(0, 16);
}
function outFile(id) { return path.join(OUT_DIR, id + '.html'); }
function storedHash(id) {
  const f = outFile(id);
  if (!fs.existsSync(f)) return null;
  const first = fs.readFileSync(f, 'utf8').split('\n', 1)[0];
  const m = first.match(/^<!-- dg:([0-9a-f]+) -->/);
  return m ? m[1] : null;
}

/** --dg-* names that diagram.css defines (light block and dark block). */
function cssVarCoverage() {
  if (!fs.existsSync(CSS_FILE)) return { light: new Set(), dark: new Set(), all: new Set(), missingFile: true };
  const css = fs.readFileSync(CSS_FILE, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
  const light = new Set(), dark = new Set();
  splitRules(css).forEach((rule) => {
    const open = rule.indexOf('{');
    if (open < 0) return;
    const head = rule.slice(0, open).trim();
    const body = rule.slice(open + 1);
    const names = [...body.matchAll(/(--dg-[a-z0-9-]+)\s*:/g)].map((m) => m[1].slice(5));
    if (/^:root$/.test(head)) names.forEach((n) => light.add(n));
    else if (/^:root\[data-theme="dark"\]$/.test(head)) names.forEach((n) => dark.add(n));
  });
  return { light, dark, all: new Set([...light, ...dark]) };
}

/* ----------------------------------------------------------------------------
   4b. The shared per-type stylesheet (generated block at the end of diagram.css).

   Mermaid writes a ~4-9 KB <style> into every SVG, identical for all diagrams of
   one type. We render a tiny stub of every supported type once, turn its rules into
   `.dg svg[data-t="<type>"] ...` rules in diagram.css, and strip exactly those rules
   from each fragment (anything diagram-specific - e.g. a classDef - stays inline).
   ---------------------------------------------------------------------------- */

const STUBS = [
  'flowchart TD\n  A["a"] --> B["b"]',
  'sequenceDiagram\n  participant A\n  A->>A: x',
  'classDiagram\n  class A',
  'erDiagram\n  A ||--o{ B : x',
  'stateDiagram-v2\n  [*] --> A',
  'mindmap\n  root((a))\n    b',
  'timeline\n  2020 : a',
  'quadrantChart\n  x-axis a --> b\n  y-axis c --> d\n  quadrant-1 a\n  quadrant-2 b\n  quadrant-3 c\n  quadrant-4 d\n  P: [0.5, 0.5]',
  'pie\n  "a" : 1\n  "b" : 2'
];
const CSS_BEGIN = '/* >>> GENERATED by tools/render_diagrams.mjs';
const CSS_END = '/* <<< GENERATED <<< */';

function typeCssBlock(refRules) {
  const out = [CSS_BEGIN + ' [dg-css:' + salt() + '] - the shared Mermaid rules per diagram type; do not edit between the markers >>> */'];
  for (const [type, keys] of refRules) {
    const sel = '.dg svg[data-t="' + type + '"]';
    out.push('/* ' + type + ' */');
    keys.forEach((k) => {
      out.push(k.split('§').join(sel));
      // Arabic: the same rule with text-anchor start/end exchanged (see postProcess)
      if (/text-anchor\s*:\s*(start|end)/.test(k)) out.push(swapAnchor(k).split('§').join('.dg .ar ' + sel.slice(4)));
    });
  }
  out.push(CSS_END);
  return out.join('\n');
}

function cssBlockSalt() {
  if (!fs.existsSync(CSS_FILE)) return null;
  const m = fs.readFileSync(CSS_FILE, 'utf8').match(/\/\* >>> GENERATED[^\n]*\[dg-css:([0-9a-f]+)\]/);
  return m ? m[1] : null;
}

function writeCssBlock(block) {
  let css = fs.readFileSync(CSS_FILE, 'utf8').replace(/\r\n/g, '\n');
  const a = css.indexOf(CSS_BEGIN);
  const b = css.indexOf(CSS_END);
  if (a >= 0 && b > a) css = css.slice(0, a) + block + css.slice(b + CSS_END.length);
  else css = css.replace(/\s*$/, '\n\n') + block + '\n';
  fs.writeFileSync(CSS_FILE, css, 'utf8');
}

/* ----------------------------------------------------------------------------
   5. Main.
   ---------------------------------------------------------------------------- */

/** Render one source in the page; returns the raw Mermaid SVG. */
async function renderRaw(page, cfg, svgId, text, lang) {
  return page.evaluate(async (a) => {
    // Always MEASURE in an LTR page: Mermaid positions many labels from getBBox(), and under
    // direction:rtl the box of a start-anchored text is mirrored (bbox.x < 0), which some of its
    // layout code accounts for and some does not. Measured LTR, the geometry is uniform; the
    // Arabic SVG is then switched to direction:rtl with start/end anchors exchanged (postProcess),
    // which puts every glyph run exactly where the LTR measurement assumed it.
    document.documentElement.setAttribute('lang', a.lang);
    document.documentElement.setAttribute('dir', 'ltr');
    if (!document.getElementById('dg-measure')) {
      const st = document.createElement('style');
      st.id = 'dg-measure';
      st.textContent = '.edgeLabel .label { font-size: 16px !important; } .edgeTerminals { font-size: 14px !important; }';   // keep in step with CSS_PATCHES
      document.head.appendChild(st);
    }
    mermaid.initialize(a.cfg);
    try {
      const r = await mermaid.render(a.svgId, a.text);
      return r.svg;
    } finally {
      document.querySelectorAll('[id="d' + a.svgId + '"],[id="' + a.svgId + '"]').forEach((n) => n.remove());
    }
  }, { cfg, svgId, text, lang });
}

/** Render a stub of every type -> Map(type -> ordered rule keys). */
async function buildRefs(page, themeVariables, failures) {
  const refs = new Map();
  for (let i = 0; i < STUBS.length; i++) {
    const svgId = 'dg-ref-' + i + '-en';
    let raw;
    try { raw = await renderRaw(page, mermaidConfig('en', themeVariables), svgId, STUBS[i], 'en'); }
    catch (e) { failures.push('reference stub ' + i + ': ' + String(e.message || e).split('\n')[0]); continue; }
    const r = postProcess(raw, { id: 'ref-' + i, lang: 'en', svgId, used: new Set(), ref: true });
    if (r.problems.length) { r.problems.forEach((p) => failures.push('reference stub "' + STUBS[i].split('\n')[0] + '": ' + p)); continue; }
    refs.set(r.type, r.keys);
  }
  return refs;
}

async function main() {
  const argv = process.argv.slice(2);
  const check = argv.includes('--check');
  const quiet = argv.includes('--quiet');
  const force = argv.includes('--force');
  const debug = argv.includes('--debug');      // dump raw + processed SVGs to .tmp/d/raw and .tmp/d/post
  // --src=DIR / --out=DIR redirect the folders (used by the pipeline's own tests)
  for (const a of argv) {
    if (a.startsWith('--src=')) SRC_DIR = path.resolve(a.slice(6));
    if (a.startsWith('--out=')) OUT_DIR = path.resolve(a.slice(6));
  }
  const ids = argv.filter((a) => !a.startsWith('--'));
  const log = (...a) => { if (!quiet) console.log(...a); };

  const { items, errors, allIds } = loadSources(ids);
  const failures = errors.slice();

  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  // classify
  const stale = [];
  const fresh = [];
  for (const it of items) {
    const h = hashOf(it);
    it.hash = h;
    if (!force && storedHash(it.id) === h) fresh.push(it); else stale.push(it);
  }

  // orphan fragments (generated by us, no sources any more)
  const orphans = [];
  if (!ids.length && fs.existsSync(OUT_DIR)) {
    for (const f of fs.readdirSync(OUT_DIR)) {
      if (!f.endsWith('.html')) continue;
      const id = f.slice(0, -5);
      if ((allIds || []).indexOf(id) < 0 && /^<!-- dg:/.test(fs.readFileSync(path.join(OUT_DIR, f), 'utf8').slice(0, 12))) orphans.push(id);
    }
  }

  const cssStale = cssBlockSalt() !== salt();

  if (check) {
    if (cssStale) failures.push('assets/css/diagram.css: the generated per-type block is ' + (cssBlockSalt() ? 'stale' : 'missing') + ' - run: node tools/render_diagrams.mjs');
    for (const it of stale) failures.push(rel(OUT_DIR) + '/' + it.id + '.html is ' + (fs.existsSync(outFile(it.id)) ? 'stale' : 'missing') + ' - run: node tools/render_diagrams.mjs ' + it.id);
    for (const o of orphans) failures.push(rel(OUT_DIR) + '/' + o + '.html has no source in ' + rel(SRC_DIR) + '/');
    if (failures.length) { failures.forEach((f) => console.error('FAIL ' + f)); console.error('diagrams: ' + failures.length + ' problem(s); ' + fresh.length + ' up to date'); process.exit(1); }
    log('diagrams: ' + fresh.length + ' up to date (--check)');
    return;
  }

  let rendered = 0;
  if (stale.length || cssStale) {
    const cov = cssVarCoverage();
    let browser;
    try {
      const { chromium } = require('@playwright/test');
      browser = await chromium.launch();
      const page = await browser.newPage();
      page.on('pageerror', (e) => failures.push('browser page error: ' + e.message));
      // the pipeline is offline by construction: any request to the network is a bug
      await page.route(/^https?:/i, (route) => { failures.push('network request blocked: ' + route.request().url()); return route.abort(); });
      await page.setContent('<!doctype html><html lang="en" dir="ltr"><head><meta charset="utf-8"></head><body></body></html>');
      await page.addScriptTag({ path: MERMAID_JS });
      const defaults = await page.evaluate(() => {
        mermaid.initialize({ startOnLoad: false, theme: 'base' });
        return mermaid.mermaidAPI.getConfig().themeVariables;
      });
      const themeVariables = buildThemeVariables(defaults);

      // the shared per-type stylesheet
      const failuresBefore = failures.length;
      const refs = await buildRefs(page, themeVariables, failures);
      const refSets = new Map([...refs].map(([t, k]) => [t, new Set(k)]));
      const refsOk = failures.length === failuresBefore;
      if (refsOk) {
        const block = typeCssBlock(refs);
        const cur = fs.readFileSync(CSS_FILE, 'utf8').replace(/\r\n/g, '\n');
        const a = cur.indexOf(CSS_BEGIN), b = cur.indexOf(CSS_END);
        if (a < 0 || b < 0 || cur.slice(a, b + CSS_END.length) !== block) { writeCssBlock(block); log('  diagram.css: per-type stylesheet written (' + (block.length / 1024).toFixed(1) + ' KB, ' + refs.size + ' types)'); }
      }

      await page.addStyleTag({ content: fs.readFileSync(CSS_FILE, 'utf8') });

      for (const it of (refsOk ? stale : [])) {
        const t0 = Date.now();
        const parts = {};
        const used = new Set();
        let bad = false;
        for (const lang of LANGS) {
          const file = rel(it.files[lang]);
          const svgId = 'dg-' + it.id + '-' + lang;
          const text = applyCodeSpans(it.src[lang], lang);
          let raw;
          try {
            raw = await renderRaw(page, mermaidConfig(lang, themeVariables), svgId, text, lang);
          } catch (e) {
            failures.push(file + ': ' + String(e.message || e).split('\n').filter(Boolean).slice(0, 6).join(' / '));
            bad = true; continue;
          }
          if (/aria-roledescription="error"/.test(raw)) {
            failures.push(file + ': Mermaid returned its error diagram (syntax error in text)');
            bad = true; continue;
          }
          try {
            if (debug) { fs.mkdirSync(path.join(ROOT, '.tmp', 'd', 'raw'), { recursive: true }); fs.writeFileSync(path.join(ROOT, '.tmp', 'd', 'raw', svgId + '.svg'), raw); }
            const r = postProcess(raw, { id: it.id, lang, alt: altOf(it.src[lang]), used, refs: refSets });
            if (debug) { fs.mkdirSync(path.join(ROOT, '.tmp', 'd', 'post'), { recursive: true }); fs.writeFileSync(path.join(ROOT, '.tmp', 'd', 'post', svgId + '.svg'), r.svg); }
            if (!r.problems.length) {
              // proof: every label is at least MIN_FONT_PX at natural size (computed in the real engine)
              const small = await page.evaluate((html) => {
                const d = document.createElement('div');
                d.className = 'dg';
                d.innerHTML = '<div class="' + html.lang + '">' + html.svg + '</div>';
                document.body.appendChild(d);
                const bad = [];
                d.querySelectorAll('text,tspan').forEach((t) => {
                  if (!t.textContent.trim() || t.children.length) return;
                  const px = parseFloat(getComputedStyle(t).fontSize);
                  if (px < 12) bad.push(px + 'px "' + t.textContent.trim().slice(0, 24) + '"');
                });
                d.remove();
                return bad;
              }, { svg: r.svg, lang });
              if (small.length) r.problems.push('text smaller than ' + MIN_FONT_PX + 'px: ' + small.slice(0, 4).join(', '));
            }
            if (r.problems.length) { r.problems.forEach((p) => failures.push(file + ': ' + p)); bad = true; continue; }
            parts[lang] = r;
          } catch (e) {
            failures.push(file + ': post-processing failed: ' + e.message);
            bad = true;
          }
        }
        if (bad) continue;

        // every custom property used must be defined for both themes
        // (the light block on :root is the contract; the dark block only overrides)
        const undef = [...used].filter((n) => !cov.light.has(n));
        if (undef.length && !cov.missingFile) {
          failures.push('assets/css/diagram.css (:root) lacks a definition for: ' + undef.map((n) => '--dg-' + n).join(', ') + ' (used by ' + it.id + ')');
          continue;
        }
        const html = '<!-- dg:' + it.hash + ' -->\n' +
          '<div class="dg" data-diagram="' + it.id + '"><div class="en">' + parts.en.svg + '</div><div class="ar">' + parts.ar.svg + '</div></div>\n';
        fs.writeFileSync(outFile(it.id), html, 'utf8');
        rendered++;
        log('  rendered ' + it.id + '  en ' + parts.en.natW + 'x' + parts.en.natH + (parts.en.wide ? ' wide' : '') +
          ' | ar ' + parts.ar.natW + 'x' + parts.ar.natH + (parts.ar.wide ? ' wide' : '') +
          '  ' + (html.length / 1024).toFixed(0) + ' KB  ' + (Date.now() - t0) + ' ms');
        for (const l of LANGS) if (!altOf(it.src[l])) log('  note: ' + rel(it.files[l]) + ' has no "%% alt:" first line (no accessible description)');
      }
    } catch (e) {
      failures.push('renderer: ' + (e && e.message ? e.message : e) + (debug && e && e.stack ? '\n' + e.stack : ''));
    } finally {
      if (browser) await browser.close();
    }
  }

  for (const o of orphans) {
    fs.unlinkSync(outFile(o));
    log('  removed orphan fragment ' + rel(OUT_DIR) + '/' + o + '.html');
  }

  log('diagrams: ' + rendered + ' rendered, ' + fresh.length + ' up to date' + (failures.length ? ', ' + failures.length + ' FAILED' : ''));
  if (failures.length) {
    failures.forEach((f) => console.error('FAIL ' + f));
    process.exit(1);
  }
}

main().catch((e) => { console.error('FAIL ' + (e && e.stack ? e.stack : e)); process.exit(1); });
