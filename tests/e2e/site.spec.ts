import { PROJECTS } from '@/data/projects';

import {
  expect,
  expectImagesLoaded,
  expectNoHorizontalScroll,
  scrollToBottom,
  test,
} from './fixtures';

test('serves the built site, not the source files', async ({ request }) => {
  const html = await (await request.get('./')).text();
  expect(html, 'raw source index.html is being served').not.toContain('/src/main.tsx');
  expect(html).not.toContain('%BASE_URL%');
  const script = /<script[^>]+src="([^"]+\.js)"/.exec(html)?.[1];
  expect(script, 'no built JS bundle in index.html').toBeTruthy();
  expect((await request.get(script ?? '')).ok(), 'JS bundle did not load').toBe(true);
});

test('home page renders every section with working media', async ({ page }) => {
  await page.goto('./');
  await expect(page.getByRole('heading', { level: 1, name: 'Michael Mandil' })).toBeVisible();
  for (const name of [/Super Play/, /Selected\s*Work/, /Hi, I’m Michael!/, /Let’s make/]) {
    await expect(page.getByRole('heading', { level: 2, name })).toBeVisible();
  }
  await scrollToBottom(page);
  await expectImagesLoaded(page);
  await expectNoHorizontalScroll(page);
});

test('every project page opens', async ({ page }) => {
  for (const project of PROJECTS) {
    await page.goto(`./#/work/${project.slug}`);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(project.title);
    await expect(page).toHaveTitle(new RegExp(project.title.replace(/[.*+?^${}()|[\]\\"]/g, '.')));
    await expectNoHorizontalScroll(page);
  }
  await expectImagesLoaded(page);
});

test('work card opens its project and "All work" returns to the grid', async ({ page }) => {
  await page.goto('./#work');
  const first = PROJECTS[0];
  if (!first) throw new Error('no projects');
  await page
    .getByRole('link', { name: new RegExp(first.title.slice(0, 10)) })
    .first()
    .click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(first.title);
  await page.getByRole('link', { name: '← All work' }).click();
  await expect(page.getByRole('heading', { level: 2, name: /Selected\s*Work/ })).toBeInViewport();
});

test('work filters narrow the grid', async ({ page }) => {
  await page.goto('./#work');
  const cards = page.locator('#work li a');
  const all = await cards.count();
  await page.getByRole('button', { name: 'Branding' }).click();
  await expect(page.getByRole('button', { name: 'Branding' })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  const branding = PROJECTS.filter((p) => p.category === 'Branding').length;
  await expect(cards).toHaveCount(branding);
  expect(branding).toBeLessThan(all);
});

test('Super Play posts enlarge, and media files are reachable', async ({ page, request }) => {
  await page.goto('./#superplay');
  await page
    .getByRole('button', { name: /^Enlarge/ })
    .first()
    .click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();

  await page.getByRole('button', { name: /^Show all/ }).click();
  await expect(page.getByRole('button', { name: 'Show less' })).toBeVisible();

  const videos = await page
    .locator('video')
    .evaluateAll((nodes) => nodes.map((v) => (v as HTMLVideoElement).poster));
  expect(videos.length).toBeGreaterThan(0);
  for (const poster of videos.slice(0, 3)) {
    expect((await request.get(poster)).ok(), poster).toBe(true);
  }
});

test('mobile menu opens and links to a section', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'menu button only exists on small screens');
  await page.goto('./#/work/facewoof');
  await page.getByRole('button', { name: 'Open menu' }).click();
  await page.getByRole('link', { name: 'About' }).click();
  await expect(page.getByRole('heading', { level: 2, name: 'Hi, I’m Michael!' })).toBeInViewport();
});
