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

test('mouse cursor is a black dot with a white outline', async ({ page, isMobile }) => {
  test.skip(isMobile, 'touch screens have no cursor');
  await page.goto('./');
  const cursorOf = (selector: string) =>
    page
      .locator(selector)
      .first()
      .evaluate((el) => decodeURIComponent(getComputedStyle(el).cursor));
  const [base, link, button] = await Promise.all([
    cursorOf('body'),
    cursorOf('header nav a'),
    cursorOf('header button'),
  ]);
  expect(base).toContain("fill='#111111'");
  expect(base).toContain("stroke='#fff'");
  expect(base).toContain("stroke-width='2'");
  expect(base).toContain("width='22'");
  expect(link.split(')')[0]).toBe(base.split(')')[0]);
  expect(button.split(')')[0]).toBe(base.split(')')[0]);
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
  await expect
    .poll(() => cat.evaluate((img) => (img as HTMLImageElement).naturalWidth), {
      message: 'cat image loaded',
    })
    .toBeGreaterThan(0);
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
  await expect(grid.getByRole('listitem')).toHaveCount(4);
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

test('In-Game arrows page through the videos 4 at a time', async ({ page }) => {
  expect(SUPERPLAY_PREVIEWS, 'two pages of 4').toHaveLength(8);
  await page.goto('./#superplay');
  const grid = page.getByRole('list', { name: 'In-game event videos' });
  await grid.scrollIntoViewIfNeeded();
  const posters = () =>
    grid
      .locator('video')
      .evaluateAll((v) => v.map((el) => (el as HTMLVideoElement).poster.split('/').pop()));
  await expect(grid.getByRole('listitem')).toHaveCount(4);
  const first = await posters();
  await expect(page.getByText('1 / 2')).toBeVisible();
  await page.getByRole('button', { name: 'Next videos' }).click();
  await expect(page.getByText('2 / 2')).toBeVisible();
  await expect(grid.getByRole('listitem')).toHaveCount(4);
  const second = await posters();
  expect(
    second.some((p) => first.includes(p)),
    'page 2 shows different videos',
  ).toBe(false);
  const firstVideo = grid.locator('video').first();
  await expect.poll(() => firstVideo.evaluate((v) => !(v as HTMLVideoElement).paused)).toBe(true);
  await page.getByRole('button', { name: 'Next videos' }).click();
  await expect(page.getByText('1 / 2'), 'wraps back to the first page').toBeVisible();
  await page.getByRole('button', { name: 'Previous videos' }).click();
  await expect(page.getByText('2 / 2')).toBeVisible();
});

test('clicking a video opens it isolated in the preview, playing', async ({ page }) => {
  await page.goto('./#superplay');
  const grid = page.getByRole('list', { name: 'In-game event videos' });
  await grid.scrollIntoViewIfNeeded();
  await grid
    .getByRole('button', { name: /Enlarge/ })
    .first()
    .click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  const video = dialog.locator('video');
  await expect(video).toHaveAttribute('src', /\.mp4$/);
  await expect.poll(() => video.evaluate((v) => !(v as HTMLVideoElement).paused)).toBe(true);
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
});

test('the cat is painted in by a marker once on entry (and stays still for reduced motion)', async ({
  page,
}) => {
  await page.goto('./');
  const frame = page.getByRole('img', { name: 'Hand-drawn illustration of a cat' }).locator('..');
  // The real drawing is uncovered by wide marker strokes, not redrawn as thin lines.
  const art = frame.locator('svg > image');
  await expect(art).toHaveAttribute('href', /art\/cat\.png$/);
  await expect(art).toHaveAttribute('mask', 'url(#cat-marker)');
  const strokes = frame.locator('svg mask path[data-stroke]');
  expect(await strokes.count()).toBeGreaterThan(3);
  const widths = await frame
    .locator('svg mask g[stroke-width]')
    .evaluateAll((gs) => gs.map((g) => Number(g.getAttribute('stroke-width'))));
  expect(widths, 'body marker, then the wider face marker').toHaveLength(2);
  expect(widths[0], 'marker is wide enough to cover the crayon lines').toBeGreaterThanOrEqual(30);
  expect(widths[1], 'and the filled-in eyes').toBeGreaterThan(widths[0] ?? 0);
  // Body first, eyes and nose last (their pixels are held back until then); no fades anywhere.
  await expect(frame.locator('svg mask image')).toHaveAttribute('href', /art\/cat-face\.png$/);
  const parts = await strokes.evaluateAll((paths) => paths.map((p) => p.closest('mask') !== null));
  expect(parts.length).toBeGreaterThan(3);
  const names = await strokes.evaluateAll((paths) =>
    paths.map((p) => getComputedStyle(p).animationName),
  );
  expect(names.every((n) => n !== 'none')).toBe(true);
  const timing = await strokes
    .first()
    .evaluate((p) => [
      getComputedStyle(p).animationIterationCount,
      getComputedStyle(p).animationFillMode,
    ]);
  expect(timing, 'plays once and the drawing stays').toEqual(['1', 'forwards']);
  await expect(strokes.first()).toHaveCSS('animation-play-state', 'running');
  await expect(strokes.first()).toHaveCSS('visibility', 'visible');
  await expect(strokes.last()).toHaveCSS('visibility', 'hidden');
  // The last stroke ends fully drawn (allowing for floating-point dust like 2.8e-13px).
  await expect
    .poll(() => strokes.last().evaluate((p) => parseFloat(getComputedStyle(p).strokeDashoffset)), {
      timeout: 6000,
    })
    .toBeLessThan(0.01);
  const fades = await frame.evaluate((el) =>
    [el, ...el.querySelectorAll('img, svg')].map((n) => getComputedStyle(n).animationName),
  );
  expect(
    fades.every((n) => n === 'none'),
    'nothing fades in or out',
  ).toBe(true);
  const img = frame.locator('img');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(frame.locator('svg')).toBeHidden();
  await expect.poll(() => img.evaluate((el) => getComputedStyle(el).opacity)).toBe('1');
});

test('work cards have one even gap across and down', async ({ page, isMobile }) => {
  test.skip(isMobile, 'one column on phones, with the title under each image');
  await page.goto('./#work');
  const boxes = await page
    .locator('#work li')
    .evaluateAll((items) =>
      items.slice(0, 4).map((li) => li.getBoundingClientRect().toJSON() as DOMRect),
    );
  const [a, b, , d] = boxes;
  if (!a || !b || !d) throw new Error('work grid not rendered');
  const across = b.x - (a.x + a.width);
  const down = d.y - (a.y + a.height);
  expect(across).toBeGreaterThan(0);
  expect(Math.abs(across - down), `across ${String(across)} vs down ${String(down)}`).toBeLessThan(
    1.5,
  );
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

test('tattoo card shows its title and description', async ({ page }) => {
  await page.goto('./#work');
  const card = page.locator('#work li a', { hasText: 'Tattoo Artist' });
  await expect(card.locator('h3')).toHaveText("I'm Also A Tattoo Artist!");
  await expect(card.locator('h3 + p')).toHaveText(/I love putting art on people/);
});

test('career lists Superplay first (spelled as one word), newest to oldest', async ({ page }) => {
  await page.goto('./#career');
  const items = page.locator('#career li');
  await expect(items.first().locator('h3')).toHaveText('Monetization & Social Artist');
  await expect(items.first()).toContainText('Superplay · Disney Solitaire');
  await expect(items.first()).toContainText('over 700K followers');
  await expect(page.getByText('Super Play')).toHaveCount(0);
  await expect(items.first()).toContainText('Sole artist behind the game’s social media');
  await expect(items.first()).toContainText('2025 — Present');
  await expect(page.locator('#career').getByText(/Education|Skills/)).toHaveCount(0);
  await expect(page.locator('#career').getByText(/IDF|NCO|Harucon/)).toHaveCount(0);
  await expect(page.locator('#career')).toContainText('Content & AI Marketing Strategist');
});

test('sections have even spacing; Career is a gray band like Disney Solitaire', async ({
  page,
}) => {
  await page.goto('./');
  const look = (id: string) =>
    page.evaluate((sectionId) => {
      const section = document.getElementById(sectionId);
      if (!section) return null;
      const style = getComputedStyle(section);
      return { top: style.paddingTop, bottom: style.paddingBottom, bg: style.backgroundColor };
    }, id);
  const [superplay, work, career, contact] = await Promise.all(
    ['superplay', 'work', 'career', 'contact'].map(look),
  );
  for (const section of [work, career, contact]) {
    expect(section?.top).toBe(superplay?.top);
    expect(section?.bottom).toBe(superplay?.bottom);
  }
  expect(career?.bg, 'Career gray like Disney Solitaire').toBe(superplay?.bg);
});

test('project image rows match the old site (Baby Chick)', async ({ page, isMobile }) => {
  await page.goto('./#/work/baby-chick');
  await scrollToBottom(page);
  const rows = page.locator('article ul');
  await expect(rows).toHaveCount(3);
  const boxes = (row: number) =>
    rows
      .nth(row)
      .locator('img')
      .evaluateAll((imgs) =>
        imgs.map((img) => img.getBoundingClientRect()).map((r) => ({ w: r.width, h: r.height })),
      );
  const [single, pair, trio] = await Promise.all([boxes(0), boxes(1), boxes(2)]);
  const content = await rows.first().evaluate((ul) => ul.getBoundingClientRect().width);
  if (!isMobile) {
    expect(Math.abs((single[0]?.w ?? 0) - content * 0.5), 'painting at half width').toBeLessThan(3);
  }
  for (const row of [pair, trio]) {
    const heights = row.map((b) => b.h);
    // Within 2%: the old site's poster pair also differs by ~10px (824 vs 814) at 1152px wide.
    const spread = (Math.max(...heights) - Math.min(...heights)) / Math.max(...heights);
    expect(spread, 'images in a row share one height').toBeLessThan(0.02);
  }
  await page
    .getByRole('button', { name: /^Enlarge:/ })
    .first()
    .click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
});

test('To Cake page plays the kiosk video from the old site', async ({ page }) => {
  await page.goto('./#/work/to-cake-or-not-to-cake');
  const video = page.locator('article video');
  await expect(video).toHaveCount(1);
  await video.scrollIntoViewIfNeeded();
  await expect(video).toHaveAttribute('src', /to-cake-or-not-to-cake\/video\.mp4$/);
  await expect.poll(() => video.evaluate((v) => !(v as HTMLVideoElement).paused)).toBe(true);
});

test('Singular One ran 2024 — 2025; tattoo card has no healed-work line', async ({ page }) => {
  await page.goto('./#career');
  await expect(page.locator('#career li', { hasText: 'Singular One' }).first()).toContainText(
    '2024 — 2025',
  );
  await page.goto('./#work');
  await expect(page.locator('#work').getByText(/healed/i)).toHaveCount(0);
});

test('tattoo page shows a 3 × 5 grid of big square photos with even spacing', async ({
  page,
  isMobile,
}) => {
  await page.goto('./#/work/tattoo-artist');
  const rows = page.locator('article ul');
  await expect(rows).toHaveCount(5);
  for (let i = 0; i < 5; i += 1) await expect(rows.nth(i).locator('li')).toHaveCount(3);
  const boxes = await page.locator('article ul img').evaluateAll((imgs) =>
    imgs
      .slice(0, 4)
      .map((img) => img.getBoundingClientRect())
      .map((r) => ({ x: r.x, y: r.y, w: r.width, h: r.height })),
  );
  const [a, b, , d] = boxes;
  if (!a || !b || !d) throw new Error('tattoo images missing');
  expect(Math.abs(a.w - a.h), 'square photos').toBeLessThan(2);
  const across = b.x - (a.x + a.w);
  const down = d.y - (a.y + a.h);
  expect(
    Math.abs(across - down),
    `even spacing (across ${String(across)}, down ${String(down)})`,
  ).toBeLessThan(1.5);
  if (!isMobile) expect(a.w, 'bigger than the standard rows').toBeGreaterThan(330);
});

test('work has no filters or count; only project pages center their text', async ({ page }) => {
  await page.goto('./#work');
  await expect(page.getByRole('group', { name: /Filter projects/ })).toHaveCount(0);
  await expect(page.getByText(/\d+ projects/)).toHaveCount(0);
  const homeAligns = await page.evaluate(() =>
    ['#work-title', '#superplay-title', '#career-title', '#contact-title', 'h1'].map((sel) => {
      const el = document.querySelector(sel);
      return el ? getComputedStyle(el).textAlign : 'missing';
    }),
  );
  expect(new Set(homeAligns), 'home page stays left-aligned').toEqual(new Set(['start']));

  await page.goto('./#/work/smartfit');
  const projectAligns = await page.evaluate(() =>
    ['article h1', 'article h2', 'article p'].map((sel) => {
      const el = document.querySelector(sel);
      return el ? getComputedStyle(el).textAlign : 'missing';
    }),
  );
  expect(new Set(projectAligns), 'project pages are centered').toEqual(new Set(['center']));
});

test('link previews show only the title, no description', async ({ page }) => {
  await page.goto('./');
  await expect(
    page.locator('meta[name="description"], meta[property="og:description"]'),
  ).toHaveCount(0);
  await expect(page).toHaveTitle('Michael - Graphic Designer');
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    'content',
    'Michael - Graphic Designer',
  );
});

test('removed content stays off the site', async ({ page }) => {
  await page.goto('./');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  // The menu is collapsed on phones, so match the links whether or not they are visible.
  const navLinks = page.locator('header nav a');
  await expect(navLinks.filter({ hasText: 'Disney Solitaire' })).toHaveCount(1);
  await expect(navLinks.filter({ hasText: /super ?play/i })).toHaveCount(0);
  await expect(page.locator('a[href*="instagram.com"]'), 'Instagram links').toHaveCount(0);
  // Instagram the platform can appear in career text; no account links or handles.
  await expect(
    page.getByText(/(?:^|\s)@[a-z]|mink\.tatts|instagram\.com/i),
    'Instagram handles',
  ).toHaveCount(0);
  await expect(page.locator('#about'), 'About section').toHaveCount(0);
  for (const name of ['See my work', 'Get in touch']) {
    await expect(page.getByRole('link', { name: new RegExp(name) })).toHaveCount(0);
  }
  for (const text of [
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

test('Superplay posts show under a "Disney Solitaire" title, enlarge and expand', async ({
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
