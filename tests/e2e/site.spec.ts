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

test('header shows the hand-lettered logo', async ({ page }) => {
  await page.goto('./');
  const logo = page.getByRole('banner').getByRole('img', { name: 'Michael Mandil' });
  await expect(logo).toBeVisible();
  expect(await logo.evaluate((img) => (img as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  await expect(logo).toHaveAttribute('src', /logo\.png$/);
});

test('mouse cursor is a black circle, larger over links', async ({ page, isMobile }) => {
  test.skip(isMobile, 'touch screens have no cursor');
  await page.goto('./');
  const cursorOf = (selector: string) =>
    page
      .locator(selector)
      .first()
      .evaluate((el) => getComputedStyle(el).cursor);
  const base = await cursorOf('body');
  const link = await cursorOf('header nav a');
  expect(base).toContain('data:image/svg+xml');
  expect(decodeURIComponent(base)).toContain('<circle');
  expect(decodeURIComponent(base)).toContain("fill='#111111'");
  expect(decodeURIComponent(link)).toContain("width='28'");
});

test('uses the custom favicon', async ({ page, request }) => {
  await page.goto('./');
  const href = await page.locator('link[rel="icon"]').getAttribute('href');
  expect(href, 'favicon link').toMatch(/favicon\.ico$/);
  const res = await request.get(href ?? '');
  expect(res.ok(), 'favicon.ico loads').toBe(true);
  expect((await res.body()).subarray(0, 4).toString('hex'), 'is an .ico file').toBe('00000100');
});

test('home page renders every section with working media', async ({ page }) => {
  await page.goto('./');
  await expect(page.getByRole('heading', { level: 1, name: 'Hi, I’m Michael!' })).toBeVisible();
  const cat = page.getByRole('img', { name: 'Hand-drawn illustration of a cat' });
  await expect(cat).toBeVisible();
  expect(await cat.evaluate((img) => (img as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  for (const name of [/Selected\s*Work/, /Let’s make/]) {
    await expect(page.getByRole('heading', { level: 2, name })).toBeVisible();
  }
  await scrollToBottom(page);
  await expectImagesLoaded(page);
  await expectNoHorizontalScroll(page);
});

test('Disney Solitaire event videos autoplay and keep playing after scrolling away', async ({
  page,
}) => {
  await page.goto('./#superplay');
  await expect(
    page.locator('section[aria-labelledby="hero-title"] video'),
    'hero has no videos',
  ).toHaveCount(0);
  const grid = page.getByRole('list', { name: 'In-game event videos' });
  await expect(grid.getByRole('listitem')).toHaveCount(SUPERPLAY_PREVIEWS.length);
  await expect(
    page.getByRole('button', { name: /Pause|Play videos/ }),
    'no pause button',
  ).toHaveCount(0);
  await expect(grid.locator('p, strong'), 'videos have no titles or dates').toHaveCount(0);

  const first = grid.locator('video').first();
  const playing = () => first.evaluate((v) => !(v as HTMLVideoElement).paused);
  // Videos only play while on screen, so bring the In-Game grid into view first.
  await first.scrollIntoViewIfNeeded();
  await expect.poll(playing, { message: 'video did not autoplay' }).toBe(true);

  // Phones used to lose the source when a video left the screen; it must come back playing.
  await page.evaluate(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  });
  await expect.poll(playing, { message: 'video kept playing off screen' }).toBe(false);
  await first.scrollIntoViewIfNeeded();
  await expect(first).toHaveAttribute('src', /\.mp4$/);
  await expect.poll(playing, { message: 'video did not resume after scrolling back' }).toBe(true);
});

test('first screen shows only the intro; Disney Solitaire starts after scrolling', async ({
  page,
}) => {
  await page.goto('./');
  await expect(page.getByRole('heading', { level: 1 })).toBeInViewport({ ratio: 1 });
  await expect(page.getByRole('img', { name: 'Hand-drawn illustration of a cat' })).toBeInViewport({
    ratio: 1,
  });
  await expect(page.locator('h1 + p'), 'whole bio visible').toBeInViewport({ ratio: 1 });
  await expect(page.locator('#superplay-title')).not.toBeInViewport();
});

test('cat sits above the title on phones and beside it on desktop', async ({ page, isMobile }) => {
  await page.goto('./');
  const cat = await page
    .getByRole('img', { name: 'Hand-drawn illustration of a cat' })
    .boundingBox();
  const title = await page.getByRole('heading', { level: 1 }).boundingBox();
  if (!cat || !title) throw new Error('hero not rendered');
  if (isMobile) {
    expect(cat.y + cat.height, 'cat is above the title').toBeLessThanOrEqual(title.y);
  } else {
    expect(cat.x, 'cat is to the right of the title').toBeGreaterThan(title.x + title.width / 2);
    const viewport = page.viewportSize()?.width ?? 0;
    expect(viewport - (cat.x + cat.width), 'cat keeps clear of the screen edge').toBeGreaterThan(
      48,
    );
  }
});

test('images and videos have square corners', async ({ page }) => {
  for (const path of ['./', './#/work/facewoof']) {
    await page.goto(path);
    await scrollToBottom(page);
    // A rounded corner shows up either on the media itself or on a clipping ancestor.
    const rounded = await page.evaluate(() =>
      [...document.querySelectorAll('main img, main video')].flatMap((el) => {
        const hits: string[] = [];
        let node: Element | null = el;
        for (let depth = 0; node && depth < 4; depth += 1, node = node.parentElement) {
          const style = getComputedStyle(node);
          const clips = node === el || style.overflow !== 'visible';
          if (clips && style.borderTopLeftRadius !== '0px') {
            hits.push(
              `${(el as HTMLImageElement).currentSrc || el.tagName} (${node.tagName} ${style.borderTopLeftRadius})`,
            );
          }
        }
        return hits;
      }),
    );
    expect(rounded, `rounded media on ${path}`).toEqual([]);
  }
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

test('work cards: title and description panel slides up on hover, sits under the image on touch', async ({
  page,
  isMobile,
}) => {
  await page.goto('./#work');
  // The first card (tattoos) has no description; use the second.
  const card = page.locator('#work li a').nth(1);
  await card.scrollIntoViewIfNeeded();
  const title = card.locator('h3');
  const blurb = card.locator('h3 + p');
  await expect(blurb).not.toBeEmpty();
  const style = (el: Element) => {
    const computed = getComputedStyle(el);
    return { color: computed.color, weight: Number(computed.fontWeight) };
  };
  const titleStyle = await title.evaluate(style);
  const blurbStyle = await blurb.evaluate(style);
  expect(titleStyle.color, 'black title').toBe('rgb(17, 17, 17)');
  expect(blurbStyle.color, 'black description').toBe('rgb(17, 17, 17)');
  expect(titleStyle.weight, 'title bolder than description').toBeGreaterThan(blurbStyle.weight);
  const panel = title.locator('..');
  const transform = () => panel.evaluate((el) => getComputedStyle(el).transform);
  const image = card.locator('img').first();
  const imageBox = async () => {
    const box = await image.boundingBox();
    if (!box) throw new Error('no image');
    return box;
  };

  if (isMobile) {
    await expect.poll(transform, { message: 'touch: no slide animation' }).toBe('none');
    const panelBox = await panel.boundingBox();
    expect((panelBox?.y ?? 0) + 1, 'touch: panel sits under the image').toBeGreaterThanOrEqual(
      (await imageBox()).y + (await imageBox()).height,
    );
    await card.hover();
    expect(await image.evaluate((el) => getComputedStyle(el).transform), 'touch: no zoom').toBe(
      'none',
    );
  } else {
    await expect
      .poll(transform, { message: 'hidden below the image until hover' })
      .not.toBe('none');
    await card.hover();
    await expect.poll(transform, { message: 'slides up on hover' }).toBe('none');
    expect(await image.evaluate((el) => getComputedStyle(el).transform), 'no zoom on hover').toBe(
      'none',
    );
    // Compare with the card frame: the image itself zooms 3% on hover and pokes past it.
    const panelBox = await panel.boundingBox();
    const frameBox = await panel.locator('..').boundingBox();
    expect(
      Math.abs(
        (panelBox?.y ?? 0) +
          (panelBox?.height ?? 0) -
          ((frameBox?.y ?? 0) + (frameBox?.height ?? 0)),
      ),
      'panel sits at the bottom of the image',
    ).toBeLessThan(2);
  }
});

test('tattoo card shows only its title, no description', async ({ page }) => {
  await page.goto('./#work');
  const card = page.locator('#work li a', { hasText: 'Tattoo Artist' });
  await expect(card.locator('h3')).toHaveText("I'm Also A Tattoo Artist!");
  await expect(card.locator('h3 + p')).toHaveCount(0);
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

test('Disney Solitaire shows Social first, then In-Game', async ({ page }) => {
  await page.goto('./#superplay');
  await expect(page.locator('#superplay h3')).toHaveText(['Social', 'In-Game']);
});

test('in-game videos are evenly spaced', async ({ page }) => {
  await page.goto('./#superplay');
  const gaps = await page.getByRole('list', { name: 'In-game event videos' }).evaluate((ul) => {
    const style = getComputedStyle(ul);
    return [style.rowGap, style.columnGap];
  });
  expect(gaps[0], 'row gap equals column gap').toBe(gaps[1]);
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
  // "Show all" only appears when there are more posts than the first view shows (12).
  const showAll = section.getByRole('button', { name: /^Show all/ });
  if (SUPERPLAY_POSTS.length > 12) await showAll.click();
  else await expect(showAll).toHaveCount(0);
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
