/**
 * What a lesson page itself has to do: colour its code, let you copy it,
 * hide its worked solutions until asked, and run the small inline quizzes
 * that punctuate the prose.
 *
 * These all used to be wired once for a document that held every lesson.
 * Now they are wired per page, which is the thing worth checking.
 */
const { test, expect } = require('@playwright/test');
const { open, sitePages } = require('./helpers');

const LESSON = 'lessons/chapter-1-lesson-1.html';
const LESSONS = sitePages().filter((p) => p.kind === 'lesson');

test('code blocks are syntax coloured', async ({ page }) => {
  await open(page, LESSON);
  const first = page.locator('pre.code > code').first();
  await expect(first).toHaveAttribute('data-done', '1');
  await expect(first.locator('.t-kw').first()).toBeVisible();
});

test('every code block gets a copy button, and it copies', async ({ page, context, browserName }) => {
  test.skip(browserName !== 'chromium', 'clipboard permissions are chromium-only here');
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await open(page, LESSON);

  const blocks = await page.locator('pre.code').count();
  await expect(page.locator('pre.code .copy')).toHaveCount(blocks);

  const block = page.locator('pre.code').first();
  // textContent, not innerText: the highlighter wrapped the source in
  // spans, and innerText would reflow it. The button copies the source.
  const source = (await block.locator('code').textContent()).trim();
  await block.locator('.copy').click();

  await expect(block.locator('.copy')).toHaveText('copied');
  // Windows puts CRLF on the clipboard whatever the page wrote, so compare
  // on line content rather than on the platform's line-ending convention.
  const clip = await page.evaluate(() => navigator.clipboard.readText());
  expect(clip.replace(/\r\n/g, '\n').trim()).toBe(source);
});

test('a worked solution stays shut until it is opened', async ({ page }) => {
  await open(page, LESSON);
  const solution = page.locator('details.solution').first();
  await expect(solution).not.toHaveAttribute('open', /.*/);
  await expect(solution.locator('pre.code')).toBeHidden();

  await solution.locator('summary').click();
  await expect(solution).toHaveAttribute('open', '');
  await expect(solution.locator('pre.code').first()).toBeVisible();
});

test('an inline quiz answers once and then reveals', async ({ page }) => {
  await open(page, LESSON);
  const quiz = page.locator('.quiz').first();
  const options = quiz.locator('.opt');
  const n = await options.count();
  expect(n).toBeGreaterThan(1);

  await expect(quiz.locator('.feedback')).toBeHidden();

  // Pick the one marked wrong, so both halves of the behaviour are tested:
  // the wrong choice is flagged and the right one is revealed anyway.
  const wrong = quiz.locator('.opt[data-correct="false"]').first();
  await wrong.click();

  await expect(quiz).toHaveAttribute('data-answered', '1');
  await expect(quiz).toHaveAttribute('data-correct', '0');
  await expect(wrong).toHaveClass(/wrong/);
  await expect(quiz.locator('.opt.right')).toHaveCount(1);
  await expect(quiz.locator('.feedback')).toBeVisible();

  // One attempt only: every option is disabled once an answer is in.
  for (let i = 0; i < n; i++) await expect(options.nth(i)).toBeDisabled();
});

test('the lesson score appears only once something is answered', async ({ page }) => {
  await open(page, LESSON);
  const score = page.locator('.score').first();
  await expect(score).toBeHidden();

  await page.locator('.quiz').first().locator('.opt[data-correct="true"]').click();
  await expect(score).toBeVisible();
  await expect(score).toContainText('1');
});

test.describe('all seven lessons', () => {
  for (const p of LESSONS) {
    test(`${p.href} has prose, code and exercises`, async ({ page }) => {
      await open(page, p.href);
      await expect(page.locator('main h1')).toHaveCount(1);
      expect(await page.locator('pre.code').count()).toBeGreaterThan(0);
      expect(await page.locator('section.exercise').count()).toBeGreaterThan(0);
      // Every exercise ships its worked solution, closed.
      const exercises = await page.locator('section.exercise').count();
      expect(await page.locator('section.exercise details.solution').count())
        .toBeGreaterThanOrEqual(exercises);
      // No question bank is loaded on a lesson: that weight belongs to tests.
      expect(await page.evaluate(() => typeof window.DABanks)).toBe('undefined');
    });
  }
});
