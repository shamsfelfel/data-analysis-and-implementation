/**
 * The two settings that cross every page: language and theme.
 *
 * Both now have to survive a navigation, which they did not have to when the
 * course was one page and switching language never left the document. So the
 * interesting assertions here are the ones made *after* clicking through to
 * another page.
 */
const { test, expect } = require('@playwright/test');
const { open } = require('./helpers');

test.describe('language', () => {
  test('the toggle flips the whole page to Arabic and back', async ({ page }) => {
    await open(page, 'lessons/chapter-1-lesson-1.html');

    const html = page.locator('html');
    await expect(html).toHaveAttribute('lang', 'en');
    await expect(html).toHaveAttribute('dir', 'ltr');

    // English prose visible, Arabic hidden.
    await expect(page.locator('main h1 .en')).toBeVisible();
    await expect(page.locator('main h1 .ar')).toBeHidden();

    await page.locator('#langBtn').click();

    await expect(html).toHaveAttribute('lang', 'ar');
    await expect(html).toHaveAttribute('dir', 'rtl');
    await expect(page.locator('main h1 .ar')).toBeVisible();
    await expect(page.locator('main h1 .en')).toBeHidden();

    await page.locator('#langBtn').click();
    await expect(html).toHaveAttribute('lang', 'en');
  });

  test('the choice survives a navigation', async ({ page }) => {
    await open(page, 'chapters/chapter-1.html');
    await page.locator('#langBtn').click();
    await expect(page.locator('html')).toHaveAttribute('lang', 'ar');

    await page.locator('.pager a.next').click();
    await expect(page.locator('body')).toHaveAttribute('data-booted', '1');
    await expect(page.locator('html')).toHaveAttribute('lang', 'ar');
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  });

  test('the document title changes with the language', async ({ page }) => {
    await open(page, 'chapters/chapter-1.html');
    const english = await page.title();
    await page.locator('#langBtn').click();
    const arabic = await page.title();
    expect(arabic).not.toBe(english);
    expect(arabic).toContain('الفصل');
  });

  test('code stays left to right in an Arabic page', async ({ page }) => {
    await open(page, 'lessons/chapter-1-lesson-1.html');
    await page.locator('#langBtn').click();
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');

    const dir = await page.locator('pre.code').first().evaluate(
      (el) => getComputedStyle(el).direction
    );
    expect(dir).toBe('ltr');
  });

  test('the shell labels are translated, not just the prose', async ({ page }) => {
    await open(page, 'lessons/chapter-1-lesson-2.html');
    await page.locator('#langBtn').click();
    // "Previous" / "Next" on the pager come from the UI table.
    await expect(page.locator('.pager a.prev .mini')).toHaveText('السابق');
    await expect(page.locator('.pager a.next .mini')).toHaveText('التالي');
  });

  test('nothing overflows the viewport sideways in either direction', async ({ page }) => {
    for (const lang of ['en', 'ar']) {
      await open(page, 'lessons/chapter-1-lesson-5.html');
      if (lang === 'ar') await page.locator('#langBtn').click();
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth
      );
      expect(overflow, `${lang} page scrolls sideways`).toBeLessThanOrEqual(1);
    }
  });
});

test.describe('theme', () => {
  test('the toggle switches to dark and back', async ({ page }) => {
    await open(page, 'chapters/chapter-1.html');
    const html = page.locator('html');

    const before = await html.getAttribute('data-theme');
    await page.locator('#themeBtn').click();
    await expect(html).toHaveAttribute('data-theme', before === 'dark' ? 'light' : 'dark');

    await page.locator('#themeBtn').click();
    await expect(html).toHaveAttribute('data-theme', before || 'light');
  });

  test('dark actually repaints the page, it is not only an attribute', async ({ page }) => {
    await open(page, 'chapters/chapter-1.html');
    const light = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    await page.locator('#themeBtn').click();
    const dark = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    expect(dark).not.toBe(light);
  });

  test('the choice survives a navigation', async ({ page }) => {
    await open(page, 'chapters/chapter-1.html');
    await page.locator('#themeBtn').click();
    const chosen = await page.locator('html').getAttribute('data-theme');

    await page.locator('.pager a.next').click();
    await expect(page.locator('body')).toHaveAttribute('data-booted', '1');
    await expect(page.locator('html')).toHaveAttribute('data-theme', chosen);
  });

  test('a reader who has chosen nothing follows the operating system', async ({ browser }) => {
    const ctx = await browser.newContext({ colorScheme: 'dark' });
    const page = await ctx.newPage();
    await open(page, 'index.html');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    await ctx.close();
  });
});
