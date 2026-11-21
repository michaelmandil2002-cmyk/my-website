import { test as base, expect, type Page } from '@playwright/test';

interface SiteFixtures {
  /** Collects console errors and same-origin requests that failed (4xx/5xx or network errors). */
  readonly problems: { readonly errors: string[]; readonly failedRequests: string[] };
}

/** Every test fails if the page logged an error or any of the site's own files failed to load. */
export const test = base.extend<SiteFixtures>({
  problems: [
    async ({ page, baseURL }, use) => {
      const origin = new URL(baseURL ?? 'http://localhost').origin;
      const errors: string[] = [];
      const failedRequests: string[] = [];
      page.on('pageerror', (error) => errors.push(error.message));
      page.on('console', (message) => {
        if (message.type() === 'error') errors.push(message.text());
      });
      page.on('response', (response) => {
        if (response.url().startsWith(origin) && response.status() >= 400) {
          failedRequests.push(`${String(response.status())} ${response.url()}`);
        }
      });
      page.on('requestfailed', (request) => {
        const reason = request.failure()?.errorText ?? '';
        // Cancelled loads are normal: lazy videos and images are dropped when the page changes.
        // Chromium reports "net::ERR_ABORTED", WebKit (Safari) "Load request cancelled".
        const cancelled = /ABORTED|cancel/i.test(reason);
        if (request.url().startsWith(origin) && !cancelled) {
          failedRequests.push(`${reason} ${request.url()}`);
        }
      });
      const problems = { errors, failedRequests };
      await use(problems);
      expect(problems.failedRequests, 'site files that failed to load').toEqual([]);
      expect(problems.errors, 'console errors').toEqual([]);
    },
    { auto: true },
  ],
});

export { expect };

/** Scrolls through the whole page so lazy images and videos start loading. */
export async function scrollToBottom(page: Page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight / 2) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 60));
    }
  });
}

/** Asserts nothing on the page is wider than the viewport (no sideways scrolling). */
export async function expectNoHorizontalScroll(page: Page) {
  const { scrollWidth, innerWidth } = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    innerWidth: window.innerWidth,
  }));
  expect(scrollWidth, 'page is wider than the screen').toBeLessThanOrEqual(innerWidth);
}

/** Asserts every visible <img> finished loading with real pixels. */
export async function expectImagesLoaded(page: Page) {
  const broken = await page.evaluate(() =>
    [...document.querySelectorAll('img')]
      .filter((img) => img.checkVisibility() && img.complete && img.naturalWidth === 0)
      .map((img) => img.currentSrc || img.src),
  );
  expect(broken, 'images that failed to load').toEqual([]);
}
