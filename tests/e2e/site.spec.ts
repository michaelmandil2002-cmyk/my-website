import { SUPERPLAY_PREVIEWS } from '@/data/previews';
import { PROJECTS } from '@/data/projects';
import { SUPERPLAY_POSTS } from '@/data/superplay';

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
  await expect(page.getByRole('heading', { level: 1, name: 'Hi, I’m Michael!' })).toBeVisible();
  for (const name of [/Selected\s*Work/, /Let’s make/]) {
    await expect(page.getByRole('heading', { level: 2, name })).toBeVisible();
  }
  await scrollToBottom(page);
  await expectImagesLoaded(page);
  await expectNoHorizontalScroll(page);
});

test('Disney Solitaire previews scroll, play and can be paused', async ({ page }) => {
  await page.goto('./#superplay');
  const videos = page.locator('#superplay [aria-hidden="true"] video');
  await expect(videos).toHaveCount(SUPERPLAY_PREVIEWS.length * 2);
  await expect(
    page.locator('section[aria-labelledby="hero-title"] video'),
    'hero has no videos',
  ).toHaveCount(0);
  const playing = () =>
    videos.evaluateAll((nodes) => nodes.filter((v) => !(v as HTMLVideoElement).paused).length);
  await expect.poll(playing, { message: 'no preview is playing' }).toBeGreaterThan(0);
  await page.getByRole('button', { name: /Pause previews/ }).click();
  await expect.poll(playing, { message: 'previews kept playing after pause' }).toBe(0);
  await page.getByRole('button', { name: /Play previews/ }).click();
  await expect.poll(playing).toBeGreaterThan(0);
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
  expect(await page.evaluate(() => window.scrollY), 'project page did not open at the top').toBe(0);
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

test('removed content stays off the site', async ({ page }) => {
  await page.goto('./');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  // The menu is collapsed on phones, so match the links whether or not they are visible.
  const navLinks = page.locator('header nav a');
  await expect(navLinks.filter({ hasText: 'Disney Solitaire' })).toHaveCount(1);
  await expect(navLinks.filter({ hasText: 'Super Play' })).toHaveCount(0);
  await expect(page.locator('a[href*="instagram.com"]'), 'Instagram links').toHaveCount(0);
  await expect(page.getByText(/instagram|mink\.tatts/i), 'Instagram mentions').toHaveCount(0);
  await expect(page.locator('#about'), 'About section').toHaveCount(0);
  for (const name of ['See my work', 'Get in touch']) {
    await expect(page.getByRole('link', { name: new RegExp(name) })).toHaveCount(0);
  }
  for (const text of [
    'Experience',
    'Education',
    'Skills',
    'Statement T-Shirts',
    'Recipe Page Design',
    'Anime Convention Design',
    'Aviv Geffen Album Cover',
  ]) {
    await expect(page.getByText(text, { exact: true })).toHaveCount(0);
  }
});

test('Super Play posts show under a "Disney Solitaire" title, enlarge and expand', async ({
  page,
}) => {
  await page.goto('./#superplay');
  const section = page.getByRole('region', { name: 'Disney Solitaire' });
  await expect(section.getByRole('heading', { level: 2 })).toHaveText('Disney Solitaire');
  await expect(section.getByText(/Featured|Social media/)).toHaveCount(0);
  await section
    .getByRole('button', { name: /^Enlarge/ })
    .first()
    .click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await section.getByRole('button', { name: /^Show all/ }).click();
  await expect(
    section.getByRole('list', { name: 'Disney Solitaire posts' }).getByRole('listitem'),
  ).toHaveCount(SUPERPLAY_POSTS.length);
});

test('preview posters are reachable', async ({ page, request }) => {
  await page.goto('./');
  const posters = await page
    .locator('video')
    .evaluateAll((nodes) => nodes.map((v) => (v as HTMLVideoElement).poster));
  expect(posters.length).toBeGreaterThan(0);
  for (const poster of [...new Set(posters)]) {
    expect((await request.get(poster)).ok(), poster).toBe(true);
  }
});

test('mobile menu opens and links to a section', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'menu button only exists on small screens');
  await page.goto('./#/work/facewoof');
  await page.getByRole('button', { name: 'Open menu' }).click();
  await page.getByRole('link', { name: 'Contact' }).click();
  await expect(page.getByRole('heading', { level: 2, name: /Let’s make/ })).toBeInViewport();
});
