/**
 * Progress: what the site remembers between pages and between visits.
 *
 * In one file this was free — nothing was ever unloaded. Across eighteen
 * files it is localStorage and nothing else, so it is worth proving that a
 * lesson opened in one page turn is still ticked in the next.
 */
const { test, expect } = require('@playwright/test');
const { open } = require('./helpers');

test('a first visit shows no progress at all', async ({ page }) => {
  await open(page, 'index.html');
  await expect(page.locator('#resume')).toBeHidden();
  await expect(page.locator('.chapter-progress')).toBeHidden();

  await open(page, 'chapters/chapter-1.html');
  await expect(page.locator('.state:not([hidden])')).toHaveCount(0);
});

test('opening a lesson ticks it on the chapter page', async ({ page }) => {
  await open(page, 'lessons/chapter-1-lesson-2.html');
  await open(page, 'chapters/chapter-1.html');

  const tick = page.locator('[data-page-state="lesson-02"]');
  await expect(tick).toBeVisible();
  await expect(tick).toHaveText('✓');
  await expect(page.locator('[data-page-state="lesson-05"]')).toBeHidden();
});

test('the chapter card on the home page counts lessons read', async ({ page }) => {
  await open(page, 'lessons/chapter-1-lesson-1.html');
  await open(page, 'lessons/chapter-1-lesson-2.html');
  await open(page, 'index.html');

  const bar = page.locator('.chapter-progress');
  await expect(bar).toBeVisible();
  await expect(bar).toContainText('2 / 7');
});

test('the home page offers to continue where you stopped', async ({ page }) => {
  await open(page, 'lessons/chapter-1-lesson-3.html');
  await open(page, 'index.html');

  const resume = page.locator('#resume');
  await expect(resume).toBeVisible();
  await expect(resume).toContainText('Encapsulation');

  await resume.locator('a').click();
  await expect(page.locator('body')).toHaveAttribute('data-page', 'lesson-03');
});

test('a test score shows on the chapter page', async ({ page }) => {
  await open(page, 'tests/chapter-1-test-1.html');

  // Answer one question, right or wrong — the chip reports right / answered.
  const card = page.locator('.qbox').first();
  await card.locator('.opt').first().click();
  await card.locator('[data-a="check"]').click();
  await expect(card).toHaveAttribute('data-state', /right|wrong/);

  await open(page, 'chapters/chapter-1.html');
  const chip = page.locator('[data-page-state="test-01"]');
  await expect(chip).toBeVisible();
  await expect(chip).toHaveText(/^[01] \/ 1$/);
});

test('the drawer marks pages already opened', async ({ page }) => {
  await open(page, 'lessons/chapter-1-lesson-6.html');
  await open(page, 'chapters/chapter-1.html');
  await page.locator('#menuBtn').click();
  await expect(page.locator('.drawer a[data-page-id="lesson-06"]')).toHaveClass(/seen/);
  await expect(page.locator('.drawer a[data-page-id="lesson-07"]')).not.toHaveClass(/seen/);
});

test('progress is per browser and does not leak off the device', async ({ page }) => {
  await open(page, 'lessons/chapter-1-lesson-1.html');

  // Nothing anywhere writes to a network endpoint.
  const posts = [];
  page.on('request', (r) => {
    if (r.method() !== 'GET') posts.push(r.method() + ' ' + r.url());
  });
  await open(page, 'tests/chapter-1-test-1.html');
  const card = page.locator('.qbox').first();
  await card.locator('.opt').first().click();
  await card.locator('[data-a="check"]').click();
  expect(posts).toEqual([]);
});
