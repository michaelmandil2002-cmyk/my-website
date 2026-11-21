#!/usr/bin/env node
/**
 * Checks that the deployed site is the built app and that its files load.
 * Usage: node scripts/check-live.mjs [url]   (retries for a few minutes while the CDN updates)
 */
const url = new URL(process.argv[2] ?? 'https://michaelmandil2002-cmyk.github.io/my-website/');
const ATTEMPTS = 12;
const WAIT_MS = 15_000;

async function check() {
  const page = await fetch(url, { cache: 'no-store' });
  if (!page.ok) return `page returned ${page.status}`;
  const html = await page.text();
  if (html.includes('/src/main.tsx') || html.includes('%BASE_URL%')) {
    return 'GitHub Pages is serving the raw source files, not the build. In the repo go to Settings → Pages → Build and deployment → Source and choose "GitHub Actions", then re-run the deploy workflow.';
  }
  const assets = [...html.matchAll(/(?:src|href)="([^"]+\.(?:js|css|svg))"/g)].map((m) => m[1]);
  if (!assets.some((a) => a.endsWith('.js'))) return 'no JS bundle referenced in index.html';
  for (const asset of [
    ...assets,
    'work/facewoof/thumb.jpg',
    'work/previews/poster/preview-01.jpg',
  ]) {
    const res = await fetch(new URL(asset, url), { method: 'HEAD', cache: 'no-store' });
    if (!res.ok) return `${asset} returned ${res.status}`;
  }
  return null;
}

for (let attempt = 1; attempt <= ATTEMPTS; attempt += 1) {
  const problem = await check();
  if (!problem) {
    console.log(`✓ ${url.href} is live and its files load.`);
    process.exit(0);
  }
  console.log(`✗ attempt ${attempt}/${ATTEMPTS}: ${problem}`);
  if (attempt < ATTEMPTS) await new Promise((resolve) => setTimeout(resolve, WAIT_MS));
}
process.exit(1);
