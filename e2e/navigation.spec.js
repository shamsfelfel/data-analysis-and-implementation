/**
 * Getting around the site.
 *
 * Splitting one file into eighteen moved every link from a hash to a path,
 * which is exactly the kind of change that works on the page you happened to
 * check and breaks on the one you did not. So every page is opened, and the
 * reading order is walked end to end through the pager rather than by typing
 * URLs — if the next button on Lesson 4 points at a file that is not there,
 * the walk stops there and says so.
 */
const { test, expect } = require('@playwright/test');
const { sitePages, open, watchForProblems } = require('./helpers');

const PAGES = sitePages();

test.describe('every page', () => {
  for (const p of PAGES) {
    test(`${p.href} loads clean`, async ({ page }) => {
      const problems = await watchForProblems(page, async () => {
        await open(page, p.href);
      });
      expect(problems).toEqual([]);

      // A page that booted has a shell and a title of its own.
      await expect(page.locator('header.topbar')).toBeVisible();
      await expect(page.locator('main section.page')).toBeVisible();
      await expect(page).toHaveTitle(/Python OOP by Example/);
      await expect(page.locator('footer.site')).toBeVisible();
    });
  }
});

test('the home page links to the chapter', async ({ page }) => {
  await open(page, 'index.html');
  await page.locator('a.chapter-card').first().click();
  await expect(page).toHaveURL(/chapters\/chapter-1\.html$/);
  await expect(page.locator('body')).toHaveAttribute('data-page', 'chapter');
});

test('the chapter page links to every lesson, test, the lab and both exams', async ({ page }) => {
  await open(page, 'chapters/chapter-1.html');

  const expected = PAGES.filter((p) => p.chapter === 1 && p.kind !== 'chapter');
  for (const p of expected) {
    // The href keeps its anchor (../tests/...html#test-01), so match inside.
    const link = page.locator(`main a[href*="${p.href.split('/').pop()}"]`).first();
    await expect(link, `no link to ${p.href}`).toHaveCount(1);
  }
});

test('the pager walks the whole chapter in order', async ({ page }) => {
  const order = PAGES.filter((p) => p.chapter === 1);
  await open(page, order[0].href);

  for (let i = 1; i < order.length; i++) {
    await page.locator('.pager a.next').click();
    await expect(page.locator('body')).toHaveAttribute('data-booted', '1');
    await expect(page.locator('body'), `step ${i} landed on the wrong page`)
      .toHaveAttribute('data-page', order[i].id);
  }

  // And back again, so "previous" is tested too and not assumed.
  for (let i = order.length - 2; i >= 0; i--) {
    await page.locator('.pager a.prev').click();
    await expect(page.locator('body')).toHaveAttribute('data-page', order[i].id);
  }
});

test('the drawer lists the chapter and marks the open page', async ({ page }) => {
  await open(page, 'lessons/chapter-1-lesson-3.html');
  await page.locator('#menuBtn').click();

  const drawer = page.locator('nav.drawer');
  await expect(drawer).toHaveClass(/open/);
  await expect(drawer.locator('a[data-page-id="lesson-03"]')).toHaveAttribute('aria-current', 'page');

  // Every page of the chapter is reachable from here.
  const inChapter = PAGES.filter((p) => p.chapter === 1);
  await expect(drawer.locator('ol a')).toHaveCount(inChapter.length + 1); // + course home

  await drawer.locator('a[data-page-id="test-05"]').click();
  await expect(page.locator('body')).toHaveAttribute('data-page', 'test-05');
});

test('Escape closes the drawer', async ({ page }) => {
  await open(page, 'chapters/chapter-1.html');
  await page.locator('#menuBtn').click();
  await expect(page.locator('nav.drawer')).toHaveClass(/open/);
  await page.keyboard.press('Escape');
  await expect(page.locator('nav.drawer')).not.toHaveClass(/open/);
});

test('breadcrumbs lead back up', async ({ page }) => {
  await open(page, 'tests/chapter-1-test-2.html');
  const crumbs = page.locator('main .crumbs');
  await expect(crumbs.locator('a')).toHaveCount(2);
  await crumbs.locator('a').nth(1).click();
  await expect(page.locator('body')).toHaveAttribute('data-page', 'chapter');
});

test('the on-this-page list jumps to a heading', async ({ page }) => {
  await open(page, 'lessons/chapter-1-lesson-1.html');
  await page.locator('#menuBtn').click();

  const jump = page.locator('#jumpList a').first();
  await expect(jump).toBeVisible();
  const href = await jump.getAttribute('href');
  await jump.click();
  await expect(page.locator('main ' + href)).toBeInViewport();
});

test('a topic chip links to the lesson that teaches it', async ({ page }) => {
  await open(page, 'tests/chapter-1-test-1.html');
  const chip = page.locator('.qtopics a').first();
  const href = await chip.getAttribute('href');

  // The heading lives on another page now, so the link has to be a path.
  expect(href).toMatch(/^\.\.\/lessons\/chapter-1-lesson-\d\.html#/);

  await chip.click();
  await expect(page.locator('body')).toHaveAttribute('data-chapter', '1');
  const anchor = href.split('#')[1];
  await expect(page.locator('#' + anchor)).toBeVisible();
});

test('in-lesson cross references point at real pages', async ({ page }) => {
  await open(page, 'tests/chapter-1-test-1.html');
  const link = page.locator('main .callout a').first();
  await link.click();
  await expect(page.locator('body')).toHaveAttribute('data-page', 'lesson-01');
});
