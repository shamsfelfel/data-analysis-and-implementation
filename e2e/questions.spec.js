/**
 * The assessment engine.
 *
 * Eleven authored question types ride on five widgets, and the only honest way
 * to test grading is to answer a real question of each kind correctly and then
 * answer one wrongly. So these tests read the question bank the page loaded,
 * work out what the right answer is, and click it — no fixtures, no mocks, and
 * no risk of the suite passing against questions that are not the ones shipped.
 */
const { test, expect } = require('@playwright/test');
const { open, bankPages } = require('./helpers');

const TEST_PAGE = 'tests/chapter-1-test-1.html';

/**
 * Which widget a question ends up with — the same rules makeCard() applies,
 * because the type alone does not decide it: an `output` question with
 * options is multiple choice, and one with blanks is a typed answer.
 */
function widgetOf(q) {
  const kind = q.widget || q.type;
  if (q.type === 'output' && q.options) return 'choice';
  if (q.type === 'complete' && q.blanks) return 'text';
  if (q.type === 'trace' && q.options) return 'choice';
  if (q.type === 'error' && q.options) return 'choice';
  return {
    mcq: 'choice', multi: 'choice', tf: 'choice', compare: 'choice', complete: 'choice',
    output: 'text', fill: 'text', trace: 'text',
    order: 'order', match: 'match', error: 'pickline',
  }[kind] || 'choice';
}

/** Read a bank straight out of the page that loaded it. */
async function readBank(page, bank) {
  return page.evaluate((b) => {
    const spec = window.DABanks[b];
    return spec.questions.map((q) => ({
      id: q.id,
      type: q.type,
      widget: q.widget || null,
      hasOptions: !!q.options,
      hasBlanks: !!q.blanks,
      answer: q.answer === undefined ? null : q.answer,
      truth: q.truth === undefined ? null : q.truth,
      accept: q.blanks ? q.blanks.map((x) => x.accept[0]) : null,
      pairs: q.pairs ? q.pairs.length : null,
      items: q.items ? q.items.length : null,
    }));
  }, bank);
}

/** Answer one question correctly, through the controls a reader would use. */
async function answerCorrectly(page, q) {
  const card = page.locator(`#q-${q.id}`);
  const widget = widgetOf(q);

  if (widget === 'choice') {
    let want;
    if (q.type === 'tf' && !q.hasOptions) want = [q.truth ? 0 : 1];
    else want = Array.isArray(q.answer) ? q.answer : [q.answer];
    for (const i of want) await card.locator(`.opt[data-i="${i}"]`).click();
    return;
  }

  if (widget === 'text') {
    for (let i = 0; i < q.accept.length; i++) {
      await card.locator(`.fillin[data-i="${i}"]`).fill(q.accept[i]);
    }
    return;
  }

  if (widget === 'order') {
    // The pool is shuffled, so each line is picked by its item index.
    for (const i of q.answer) {
      await card.locator(`.order-pool button[data-i="${i}"]`).click();
    }
    return;
  }

  if (widget === 'match') {
    // pairs[i].l belongs with pairs[i].r — the right column is shuffled,
    // but each button still carries its original index.
    for (let i = 0; i < q.pairs; i++) {
      await card.locator(`[data-side="l"][data-i="${i}"]`).click();
      await card.locator(`[data-side="r"][data-i="${i}"]`).click();
    }
    return;
  }

  if (widget === 'pickline') {
    const lines = Array.isArray(q.answer) ? q.answer : [q.answer];
    for (const n of lines) await card.locator(`.pickcode button[data-n="${n}"]`).click();
    return;
  }

  throw new Error('no way to answer a ' + widget + ' question');
}

test.describe('answering', () => {
  test('a correct answer of every widget kind is graded right', async ({ page }) => {
    await open(page, TEST_PAGE);
    const questions = await readBank(page, 'test-01');

    // One question per widget — the first of each, so the set is stable.
    const byWidget = new Map();
    for (const q of questions) {
      const w = widgetOf(q);
      if (!byWidget.has(w)) byWidget.set(w, q);
    }
    expect([...byWidget.keys()].sort())
      .toEqual(['choice', 'match', 'order', 'pickline', 'text']);

    for (const [widget, q] of byWidget) {
      const card = page.locator(`#q-${q.id}`);
      await card.scrollIntoViewIfNeeded();
      await answerCorrectly(page, q);
      await card.locator('[data-a="check"]').click();

      await expect(card.locator('.verdict'), `${widget} (${q.id}) was not accepted`)
        .toHaveClass(/verdict ok/);
      await expect(card).toHaveAttribute('data-state', 'right');
    }
  });

  test('a wrong answer is graded wrong and says what was right', async ({ page }) => {
    await open(page, TEST_PAGE);
    const questions = await readBank(page, 'test-01');
    const q = questions.find((x) => x.type === 'tf');

    const card = page.locator(`#q-${q.id}`);
    await card.locator(`.opt[data-i="${q.truth ? 1 : 0}"]`).click();
    await card.locator('[data-a="check"]').click();

    await expect(card.locator('.verdict')).toHaveClass(/verdict no/);
    await expect(card).toHaveAttribute('data-state', 'wrong');
    await expect(card.locator('.opt.right')).toHaveCount(1);
  });

  test('checking nothing asks for an answer instead of marking it wrong', async ({ page }) => {
    await open(page, TEST_PAGE);
    const card = page.locator('.qbox').first();
    await card.locator('[data-a="check"]').click();
    await expect(card.locator('.verdict')).toBeVisible();
    await expect(card).not.toHaveAttribute('data-state', 'right');
  });

  test('a revealed answer is shown but not counted', async ({ page }) => {
    await open(page, TEST_PAGE);
    const card = page.locator('.qbox').first();
    await card.locator('[data-a="show"]').click();

    await expect(card.locator('.opt.right')).toHaveCount(1);
    await expect(card.locator('.verdict')).toBeVisible();
    // Shown, not right: it must not count towards the score.
    await expect(card).not.toHaveAttribute('data-state', 'right');
  });

  test('clear puts a question back to untouched', async ({ page }) => {
    await open(page, TEST_PAGE);
    const questions = await readBank(page, 'test-01');
    const q = questions.find((x) => widgetOf(x) === 'choice');
    const card = page.locator(`#q-${q.id}`);

    await answerCorrectly(page, q);
    await card.locator('[data-a="check"]').click();
    await expect(card).toHaveAttribute('data-state', 'right');

    await card.locator('[data-a="clear"]').click();
    await expect(card).not.toHaveAttribute('data-state', /.+/);
    await expect(card.locator('.opt[aria-pressed="true"]')).toHaveCount(0);
  });

  test('explanation and worked solution start closed', async ({ page }) => {
    await open(page, TEST_PAGE);
    const details = page.locator('.qbox details').first();
    await expect(details).not.toHaveAttribute('open', /.*/);
    await details.locator('summary').click();
    await expect(details).toHaveAttribute('open', '');
  });
});

test.describe('the test as a whole', () => {
  test('the tally counts answers and the bar fills', async ({ page }) => {
    await open(page, TEST_PAGE);
    const questions = await readBank(page, 'test-01');
    const tally = page.locator('.testbar .tally');

    await expect(tally).toContainText('0');

    for (const q of questions.slice(0, 3)) {
      await page.locator(`#q-${q.id}`).scrollIntoViewIfNeeded();
      await answerCorrectly(page, q);
      await page.locator(`#q-${q.id} [data-a="check"]`).click();
    }

    await expect(tally).toContainText('3');
    const width = await page.locator('.testbar .bar > i').evaluate((el) => el.style.width);
    expect(parseFloat(width)).toBeGreaterThan(0);
  });

  test('"check everything" grades the lot and shows a result', async ({ page }) => {
    await open(page, TEST_PAGE);
    const questions = await readBank(page, 'test-01');

    for (const q of questions) {
      await page.locator(`#q-${q.id}`).scrollIntoViewIfNeeded();
      await answerCorrectly(page, q);
    }
    await page.locator('.testbar [data-a="all"]').click();

    const result = page.locator('.result');
    await expect(result).toBeVisible();
    await expect(result).toContainText('100');
    await expect(page.locator('.qbox[data-state="right"]')).toHaveCount(questions.length);
  });

  test('"start over" clears every answer', async ({ page }) => {
    await open(page, TEST_PAGE);
    const questions = await readBank(page, 'test-01');
    await answerCorrectly(page, questions[0]);
    await page.locator(`#q-${questions[0].id} [data-a="check"]`).click();
    await expect(page.locator('.qbox[data-state]')).toHaveCount(1);

    page.once('dialog', (d) => d.accept());
    await page.locator('.testbar [data-a="reset"]').click();
    await expect(page.locator('.qbox[data-state]')).toHaveCount(0);
  });

  test('the difficulty filters narrow the list', async ({ page }) => {
    await open(page, TEST_PAGE);
    const all = await page.locator('.qbox').count();

    await page.locator('.qfilter [data-f="easy"]').click();
    const easy = await page.locator('.qbox:visible').count();
    expect(easy).toBeGreaterThan(0);
    expect(easy).toBeLessThan(all);

    await page.locator('.qfilter [data-f="all"]').click();
    await expect(page.locator('.qbox:visible')).toHaveCount(all);
  });

  test('answers survive a reload', async ({ page }) => {
    await open(page, TEST_PAGE);
    const questions = await readBank(page, 'test-01');
    const q = questions.find((x) => widgetOf(x) === 'choice');

    await answerCorrectly(page, q);
    await page.locator(`#q-${q.id} [data-a="check"]`).click();
    await expect(page.locator(`#q-${q.id}`)).toHaveAttribute('data-state', 'right');

    await page.reload();
    await expect(page.locator('body')).toHaveAttribute('data-booted', '1');
    await expect(page.locator(`#q-${q.id}`)).toHaveAttribute('data-state', 'right');
  });

  test('each test page loads only its own bank', async ({ page }) => {
    // The whole point of the split: a lesson test must not drag the other
    // eight banks and 144 questions along with it.
    await open(page, TEST_PAGE);
    const loaded = await page.evaluate(() => Object.keys(window.DABanks));
    expect(loaded).toEqual(['test-01']);
  });
});

test.describe('every bank renders', () => {
  for (const p of bankPages()) {
    test(`${p.href} draws all of ${p.bank}`, async ({ page }) => {
      await open(page, p.href);
      const expected = await page.evaluate(
        (b) => window.DABanks[b].questions.length, p.bank
      );
      expect(expected).toBeGreaterThan(0);
      await expect(page.locator('.qbox')).toHaveCount(expected);
      // Every card got a widget; none rendered empty.
      await expect(page.locator('.qwidget:empty')).toHaveCount(0);
    });
  }
});
