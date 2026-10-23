/**
 * The Execution Lab.
 *
 * A trace is only useful if the three panels agree with each other: the line
 * highlighted is the line about to take effect, the variables are the picture
 * after it, and the output is everything printed so far. The authored steps
 * are the reference, so these tests step the widget and compare it with them.
 */
const { test, expect } = require('@playwright/test');
const { open } = require('./helpers');

const LAB = 'labs/chapter-1-lab.html';

test('every authored trace is mounted', async ({ page }) => {
  await open(page, LAB);
  const authored = await page.evaluate(() => Object.keys(window.DATraces).length);
  expect(authored).toBeGreaterThan(0);
  await expect(page.locator('.trace[data-trace]')).toHaveCount(authored);
  await expect(page.locator('[data-trace-id]:not([data-mounted])')).toHaveCount(0);
});

test('Next walks the first program to its last step', async ({ page }) => {
  await open(page, LAB);
  const trace = page.locator('.trace').first();
  const id = await trace.getAttribute('data-trace');
  const steps = await page.evaluate((t) => window.DATraces[t].steps.length, id);

  await expect(trace.locator('.step')).toContainText('1');
  await expect(trace.locator('[data-a="prev"]')).toBeDisabled();

  for (let i = 1; i < steps; i++) {
    await trace.locator('[data-a="next"]').click();
  }
  await expect(trace.locator('.step')).toContainText(String(steps));
  await expect(trace.locator('[data-a="next"]')).toBeDisabled();
});

test('the highlighted line matches the authored step', async ({ page }) => {
  await open(page, LAB);
  const trace = page.locator('.trace').first();
  const id = await trace.getAttribute('data-trace');
  const steps = await page.evaluate((t) => window.DATraces[t].steps.map((s) => s.line), id);

  for (let i = 0; i < Math.min(steps.length, 6); i++) {
    if (i) await trace.locator('[data-a="next"]').click();
    const shown = await trace.locator('.trace-code .row.now .ln').innerText();
    expect(Number(shown), `step ${i + 1} highlights the wrong line`).toBe(steps[i]);
  }
});

test('the variables panel fills as the program runs', async ({ page }) => {
  await open(page, LAB);
  const trace = page.locator('.trace').first();
  const id = await trace.getAttribute('data-trace');
  const steps = await page.evaluate((t) => window.DATraces[t].steps, id);

  // Find the first step that defines anything, and walk to it.
  const firstWithVars = steps.findIndex((s) => s.vars && Object.keys(s.vars).length);
  expect(firstWithVars).toBeGreaterThanOrEqual(0);

  for (let i = 0; i < firstWithVars; i++) await trace.locator('[data-a="next"]').click();

  const names = Object.keys(steps[firstWithVars].vars);
  for (const name of names) {
    await expect(trace.locator('table.vars')).toContainText(name);
  }
});

test('printed output accumulates', async ({ page }) => {
  await open(page, LAB);
  const trace = page.locator('.trace').first();
  const id = await trace.getAttribute('data-trace');
  const steps = await page.evaluate((t) => window.DATraces[t].steps, id);

  const lastWithOut = steps.map((s) => s.out).lastIndexOf(
    [...steps].reverse().find((s) => s.out)?.out
  );
  test.skip(lastWithOut < 0, 'this program prints nothing');

  for (let i = 0; i < lastWithOut; i++) await trace.locator('[data-a="next"]').click();
  await expect(trace.locator('.trace-out')).toContainText(steps[lastWithOut].out.trim().split('\n')[0]);
});

test('the scrubber jumps straight to a step', async ({ page }) => {
  await open(page, LAB);
  const trace = page.locator('.trace').first();
  const id = await trace.getAttribute('data-trace');
  const steps = await page.evaluate((t) => window.DATraces[t].steps.length, id);
  const target = Math.min(4, steps - 1);

  await trace.locator('.trace-scrub').fill(String(target));
  await trace.locator('.trace-scrub').dispatchEvent('input');
  await expect(trace.locator('.step')).toContainText(String(target + 1));
});

test('clicking a line jumps to where it runs', async ({ page }) => {
  await open(page, LAB);
  const trace = page.locator('.trace').first();
  const id = await trace.getAttribute('data-trace');
  const lines = await page.evaluate((t) => window.DATraces[t].steps.map((s) => s.line), id);

  // A line that is reached later in the program, not the first one.
  const wanted = lines[Math.min(3, lines.length - 1)];
  await trace.locator(`.trace-code .row`).nth(wanted - 1).click();
  await expect(trace.locator('.trace-code .row.now .ln')).toHaveText(String(wanted));
});

test('Start puts the program back to the beginning', async ({ page }) => {
  await open(page, LAB);
  const trace = page.locator('.trace').first();
  await trace.locator('[data-a="next"]').click();
  await trace.locator('[data-a="next"]').click();
  await expect(trace.locator('.step')).toContainText('3');

  await trace.locator('[data-a="reset"]').click();
  await expect(trace.locator('.step')).toContainText('1');
});

test('Run plays the program through on its own', async ({ page }) => {
  await open(page, LAB);
  const trace = page.locator('.trace').first();
  const id = await trace.getAttribute('data-trace');
  const steps = await page.evaluate((t) => window.DATraces[t].steps.length, id);

  await trace.locator('[data-a="play"]').click();
  await expect(trace.locator('.step')).toContainText(String(steps), { timeout: 30000 });
});

test('the lab relabels itself in Arabic', async ({ page }) => {
  await open(page, LAB);
  const trace = page.locator('.trace').first();
  await expect(trace.locator('[data-a="next"]')).toContainText('Next');

  await page.locator('#langBtn').click();
  await expect(trace.locator('[data-a="next"]')).toContainText('التالي');
  await expect(trace.locator('[data-t="vars"]')).toContainText('المتغيرات');
});
