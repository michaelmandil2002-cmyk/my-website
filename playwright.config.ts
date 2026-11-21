import { defineConfig, devices } from '@playwright/test';

/**
 * End-to-end tests run against the production build served under the same base path as
 * GitHub Pages (/my-website/), so they catch the problems a dev server hides.
 * Set E2E_BASE_URL to run the same suite against the live site instead.
 */
const BASE_PATH = process.env.BASE_PATH ?? '/my-website/';
const PORT = 4173;
const liveUrl = process.env.E2E_BASE_URL;
const isCI = Boolean(process.env.CI);
const runWebKit = isCI || process.platform !== 'darwin' || Boolean(process.env.E2E_WEBKIT);

export default defineConfig({
  testDir: './tests/e2e',
  tsconfig: './tsconfig.test.json',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 1 : 0,
  reporter: isCI ? [['github'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: liveUrl ?? `http://localhost:${String(PORT)}${BASE_PATH}`,
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
    // Safari's engine on an iPhone: the strictest about inline video autoplay. Runs in CI
    // (Linux); Playwright's WebKit build does not start on macOS 14, so it is skipped there.
    ...(runWebKit ? [{ name: 'iphone', use: { ...devices['iPhone 14'] } }] : []),
  ],
  ...(!liveUrl && {
    webServer: {
      command: `npx vite preview --port ${String(PORT)} --strictPort`,
      url: `http://localhost:${String(PORT)}${BASE_PATH}`,
      env: { BASE_PATH },
      reuseExistingServer: !isCI,
    },
  }),
});
