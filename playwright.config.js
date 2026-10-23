// @ts-check
/**
 * Playwright configuration.
 *
 * The suite drives the built site over http rather than file://, because two
 * of the things worth testing — the service worker and the install prompt —
 * only exist in a secure context, and localhost counts as one.
 *
 * `webServer` starts scripts/test-server.py, not scripts/dev-server.py: the
 * dev server sends `Cache-Control: no-store`, which is exactly what you want
 * while authoring and exactly what you must not have while testing that the
 * course caches itself for offline use.
 */
const { defineConfig, devices } = require('@playwright/test');

const PORT = Number(process.env.PORT || 8099);

module.exports = defineConfig({
  testDir: './e2e',
  // The pages are static, so a failure is a real failure and not a flake.
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]]
                           : [['list'], ['html', { open: 'never' }]],

  use: {
    baseURL: `http://127.0.0.1:${PORT}`,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    // Animations are decoration here; turning them off removes the only
    // source of timing flake in the suite (the smooth scroll, the drawer).
    reducedMotion: 'reduce',
  },

  webServer: {
    command: `python scripts/test-server.py ${PORT}`,
    url: `http://127.0.0.1:${PORT}/index.html`,
    // Never inherit a server someone left running: it may be serving an older
    // build, or be the stock http.server, whose listen queue these workers
    // overflow. Starting our own is cheap and removes a class of false failure.
    reuseExistingServer: false,
    stdout: 'ignore',
    stderr: 'pipe',
  },

  projects: [
    {
      name: 'desktop',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 900 } },
    },
    {
      name: 'phone',
      use: { ...devices['Pixel 7'] },
    },
  ],
});
