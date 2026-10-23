/**
 * Shared helpers for the end-to-end suite.
 *
 * The page list is read out of src/registry.json rather than written here,
 * so a chapter added to the course is a chapter the suite starts walking
 * without anyone remembering to add it.
 */
const fs = require('fs');
const path = require('path');
const { expect } = require('@playwright/test');

const ROOT = path.join(__dirname, '..');

/** Every page of the site, as {chapter, track, id, kind, href, bank, n, en, ar}; read from the registry. */
function sitePages() {
  const reg = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/registry.json'), 'utf8'));
  const dirs = { lesson: 'lessons', test: 'tests', exam: 'exams', lab: 'labs', glossary: 'glossary' };
  const out = [{ chapter: null, track: null, id: 'home', kind: 'home', href: 'index.html',
                 en: reg.site.name.en, ar: reg.site.name.ar }];
  for (const ch of reg.chapters) {
    for (const p of ch.pages) {
      out.push({
        chapter: ch.key,
        track: ch.track,
        id: p.id,
        kind: p.kind,
        n: p.n || null,
        of: p.of || null,
        bank: p.bank || null,
        href: p.kind === 'chapter' ? `chapters/${ch.key}.html` : `${dirs[p.kind]}/${p.id}.html`,
        en: p.title.en,
        ar: p.title.ar,
      });
    }
  }
  return out;
}

/** The pages that carry a graded question bank. */
function bankPages() {
  return sitePages().filter((p) => p.bank);
}

/**
 * Open a page and wait for the shell to finish booting.
 *
 * app.js stamps data-booted on <body> as its last act, so waiting on that is
 * exact — no sleeping, and no race with an engine that is still rendering.
 */
async function open(page, href) {
  await page.goto('/' + href);
  await expect(page.locator('body')).toHaveAttribute('data-booted', '1');
}

/**
 * Collect everything the browser complained about while `fn` ran: console
 * errors, uncaught exceptions, failed requests and any response that was not
 * a success. A static site should produce none of these on any page.
 */
async function watchForProblems(page, fn) {
  const problems = [];
  const onConsole = (m) => {
    if (m.type() === 'error') problems.push('console: ' + m.text());
  };
  const onError = (e) => problems.push('uncaught: ' + e.message);
  const onFailed = (r) => problems.push('request failed: ' + r.url());
  const onResponse = (r) => {
    if (r.status() >= 400) problems.push(r.status() + ' ' + r.url());
  };

  page.on('console', onConsole);
  page.on('pageerror', onError);
  page.on('requestfailed', onFailed);
  page.on('response', onResponse);
  try {
    await fn();
  } finally {
    page.off('console', onConsole);
    page.off('pageerror', onError);
    page.off('requestfailed', onFailed);
    page.off('response', onResponse);
  }
  return problems;
}

/** Wait until the service worker has installed and taken control. */
async function serviceWorkerReady(page) {
  await page.evaluate(async () => {
    const reg = await navigator.serviceWorker.ready;
    if (!navigator.serviceWorker.controller) {
      await new Promise((resolve) => {
        navigator.serviceWorker.addEventListener('controllerchange', resolve, { once: true });
        if (reg.active && !navigator.serviceWorker.controller) {
          // Already active but not controlling: claim happens on activate.
          setTimeout(resolve, 1500);
        }
      });
    }
  });
}

/** The precache list the generated service worker ships with. */
function precacheList() {
  const sw = fs.readFileSync(path.join(ROOT, 'sw.js'), 'utf8');
  const block = /var PRECACHE = \[([\s\S]*?)\];/.exec(sw);
  if (!block) throw new Error('sw.js has no PRECACHE list');
  return [...block[1].matchAll(/"([^"]+)"/g)].map((m) => m[1]);
}

module.exports = {
  ROOT,
  sitePages,
  bankPages,
  open,
  watchForProblems,
  serviceWorkerReady,
  precacheList,
};
