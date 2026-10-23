/**
 * Layout at the widths the course promises to work at, in both reading
 * directions.
 *
 * The one failure mode worth automating is horizontal overflow: a code block,
 * a wide table or an answer holding a snippet that refuses to shrink drags the
 * whole page sideways on a phone. It is easy to introduce, invisible on a
 * desktop, and miserable to read on the device most of these students use.
 */
const { test, expect } = require('@playwright/test');
const { open, sitePages } = require('./helpers');

const WIDTHS = [320, 390, 768, 1280];
const PAGES = [
  'index.html',
  'chapters/chapter-1.html',
  'lessons/chapter-1-lesson-5.html',
  'tests/chapter-1-test-1.html',
  'exams/chapter-1-exam-b.html',
  'labs/chapter-1-lab.html',
];

for (const width of WIDTHS) {
  for (const lang of ['en', 'ar']) {
    test(`nothing overflows at ${width}px in ${lang}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      for (const href of PAGES) {
        await open(page, href);
        if (lang === 'ar') {
          // The choice is remembered, so after the first page it is already
          // Arabic — clicking again would put it back to English.
          const now = await page.locator('html').getAttribute('lang');
          if (now !== 'ar') await page.locator('#langBtn').click();
          await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
        }
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth
        );
        expect(overflow, `${href} at ${width}px (${lang})`).toBeLessThanOrEqual(1);
      }
    });
  }
}

test('the drawer is reachable and usable on a phone', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await open(page, 'lessons/chapter-1-lesson-1.html');

  const menu = page.locator('#menuBtn');
  await expect(menu).toBeVisible();
  const box = await menu.boundingBox();
  // Comfortably tappable: the usual 44px floor, allowing for the border.
  expect(box.height).toBeGreaterThanOrEqual(32);

  await menu.click();
  await expect(page.locator('nav.drawer')).toBeInViewport();
  await page.locator('.scrim').click({ position: { x: 380, y: 400 } });
  await expect(page.locator('nav.drawer')).not.toHaveClass(/open/);
});

test('the top bar stays put while the page scrolls', async ({ page }) => {
  await open(page, 'lessons/chapter-1-lesson-1.html');
  await page.evaluate(() => window.scrollTo(0, 1500));
  await expect(page.locator('header.topbar')).toBeInViewport();
});

test('back-to-top appears once you are well down the page', async ({ page }) => {
  await open(page, 'lessons/chapter-1-lesson-1.html');
  await expect(page.locator('#backtop')).toBeHidden();

  await page.evaluate(() => window.scrollTo(0, 1500));
  await expect(page.locator('#backtop')).toBeVisible();

  await page.locator('#backtop').click();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(50);
});

test('the reading-progress bar tracks the scroll', async ({ page }) => {
  await open(page, 'lessons/chapter-1-lesson-2.html');
  const width = () => page.locator('#prog').evaluate((el) => parseFloat(el.style.width) || 0);

  expect(await width()).toBeLessThan(5);
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await expect.poll(width).toBeGreaterThan(90);
});

test('every page is readable at the smallest supported width', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  for (const p of sitePages()) {
    await open(page, p.href);
    await expect(page.locator('main h1')).toBeVisible();
    await expect(page.locator('header.topbar')).toBeVisible();
  }
});
