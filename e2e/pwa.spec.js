/**
 * The progressive-web-app layer: the manifest that makes the course
 * installable, and the service worker that makes it work with the network off.
 *
 * Offline is the claim the course makes on its own home page, so it is tested
 * the only way that means anything — cut the network and load a page that was
 * never visited while online.
 */
const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const { ROOT, open, sitePages, serviceWorkerReady, precacheList } = require('./helpers');

test.describe('manifest', () => {
  test('is served, parses, and names icons that exist', async ({ request, baseURL }) => {
    const res = await request.get('/manifest.webmanifest');
    expect(res.status()).toBe(200);

    const manifest = JSON.parse(await res.text());
    expect(manifest.name).toBeTruthy();
    expect(manifest.start_url).toBeTruthy();
    expect(manifest.display).toBe('standalone');

    // Installability needs a 192 and a 512, and a maskable icon for Android.
    const sizes = manifest.icons.map((i) => i.sizes);
    expect(sizes).toContain('192x192');
    expect(sizes).toContain('512x512');
    expect(manifest.icons.some((i) => i.purpose === 'maskable')).toBe(true);

    for (const icon of manifest.icons) {
      const r = await request.get('/' + icon.src);
      expect(r.status(), `${icon.src} is missing`).toBe(200);
    }
    for (const s of manifest.shortcuts || []) {
      const r = await request.get('/' + s.url);
      expect(r.status(), `shortcut ${s.url} is missing`).toBe(200);
    }
  });

  test('every page links it, with the right number of ../', async ({ page }) => {
    for (const p of sitePages()) {
      await page.goto('/' + p.href);
      const href = await page.locator('link[rel="manifest"]').getAttribute('href');
      const resolved = await page.evaluate(
        (h) => new URL(h, location.href).pathname, href
      );
      expect(resolved, `${p.href} links the manifest wrongly`).toBe('/manifest.webmanifest');
    }
  });
});

test.describe('service worker', () => {
  test('registers and takes control', async ({ page }) => {
    await open(page, 'index.html');
    await serviceWorkerReady(page);

    const state = await page.evaluate(async () => {
      const reg = await navigator.serviceWorker.ready;
      return { active: !!reg.active, scriptURL: reg.active && reg.active.scriptURL };
    });
    expect(state.active).toBe(true);
    expect(state.scriptURL).toContain('/sw.js');
  });

  test('precaches every file the site is made of', async ({ request }) => {
    const listed = precacheList();

    // Everything it names must exist...
    for (const url of listed) {
      if (url === './') continue;
      const res = await request.get('/' + url);
      expect(res.status(), `sw.js precaches ${url}, which 404s`).toBe(200);
    }

    // ...and every page of the course must be named.
    for (const p of sitePages()) {
      expect(listed, `sw.js does not precache ${p.href}`).toContain(p.href);
    }

    // ...as must every stylesheet and script under assets/.
    const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
      e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]
    );
    const assets = walk(path.join(ROOT, 'assets'))
      .map((f) => path.relative(ROOT, f).split(path.sep).join('/'));
    for (const a of assets) {
      expect(listed, `sw.js does not precache ${a}`).toContain(a);
    }
  });

  test('the course still opens with the network off', async ({ page, context }) => {
    // Visit once online so the worker can install and fill its cache.
    await open(page, 'index.html');
    await serviceWorkerReady(page);
    await page.waitForTimeout(2500); // let the precache finish

    await context.setOffline(true);
    try {
      // A page never opened while online, to prove it is the precache
      // answering and not the browser's own HTTP cache.
      await page.goto('/lessons/chapter-1-lesson-4.html');
      await expect(page.locator('body')).toHaveAttribute('data-booted', '1');
      await expect(page.locator('main h1')).toBeVisible();

      // Styling and the engines came from the cache too, not just the HTML.
      const styled = await page.evaluate(
        () => getComputedStyle(document.body).backgroundColor
      );
      expect(styled).not.toBe('rgba(0, 0, 0, 0)');

      // And a test page, which needs its question bank as well.
      await page.goto('/tests/chapter-1-test-3.html');
      await expect(page.locator('body')).toHaveAttribute('data-booted', '1');
      expect(await page.locator('.qbox').count()).toBeGreaterThan(0);
    } finally {
      await context.setOffline(false);
    }
  });

  test('a page that was never cached falls back to the course home', async ({ page, context }) => {
    await open(page, 'index.html');
    await serviceWorkerReady(page);
    await page.waitForTimeout(2500);

    await context.setOffline(true);
    try {
      await page.goto('/chapters/chapter-9.html');
      // Not a browser error page: the shell is there.
      await expect(page.locator('header.topbar')).toBeVisible();
    } finally {
      await context.setOffline(false);
    }
  });
});

test.describe('offline by construction', () => {
  test('nothing is loaded from another origin', async ({ page }) => {
    const foreign = [];
    page.on('request', (r) => {
      const url = new URL(r.url());
      if (url.hostname !== '127.0.0.1' && url.hostname !== 'localhost') foreign.push(r.url());
    });
    for (const p of sitePages()) {
      await page.goto('/' + p.href);
      await expect(page.locator('body')).toHaveAttribute('data-booted', '1');
    }
    expect(foreign).toEqual([]);
  });

  test('no page references a CDN', () => {
    const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
      e.name.startsWith('.') || e.name === 'node_modules' ? []
        : e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]
    );
    const files = walk(ROOT).filter((f) => /\.(html|css|js)$/.test(f))
      .filter((f) => !f.includes('e2e') && !f.includes('playwright'));

    const offenders = [];
    for (const f of files) {
      const text = fs.readFileSync(f, 'utf8');
      if (/https?:\/\/(?!127\.0\.0\.1|localhost)[^"'\s)]+\.(js|css|woff2?)/i.test(text)) {
        offenders.push(path.relative(ROOT, f));
      }
    }
    expect(offenders).toEqual([]);
  });
});
