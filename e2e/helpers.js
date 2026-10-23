/**
 * Shared helpers for the end-to-end suite.
 *
 * The page list is read out of assets/js/course.js rather than written here,
 * so a chapter added to the course is a chapter the suite starts walking
 * without anyone remembering to add it.
 */
const fs = require('fs');
const path = require('path');
const { expect } = require('@playwright/test');

const ROOT = path.join(__dirname, '..');

/** Every page of the site, as {chapter, id, kind, href, bank, en, ar}. */
function sitePages() {
  const src = fs.readFileSync(path.join(ROOT, 'assets/js/course.js'), 'utf8');
  const out = [{ chapter: null, id: 'home', kind: 'home', href: 'index.html', en: 'Course home' }];

  const chapterRe = /\{\s*\n\s*num:\s*(\d+),([\s\S]*?)\n    \}/g;
  let ch;
  while ((ch = chapterRe.exec(src)) !== null) {
    const num = Number(ch[1]);
    const pageRe = /\{\s*id:\s*"([^"]+)",\s*kind:\s*"([^"]+)"([\s\S]*?)\}/g;
    let m;
    while ((m = pageRe.exec(ch[2])) !== null) {
      const tail = m[3];
      const href = /href:\s*"([^"]+)"/.exec(tail);
      const bank = /bank:\s*"([^"]+)"/.exec(tail);
      const en = /\ben:\s*"((?:[^"\\]|\\.)*)"/.exec(tail);
      out.push({
        chapter: num,
        id: m[1],
        kind: m[2],
        href: href ? href[1] : null,
        bank: bank ? bank[1] : null,
        en: en ? en[1] : m[1],
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
