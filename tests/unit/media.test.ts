import { existsSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

import { SUPERPLAY_PREVIEWS } from '@/data/previews';
import { PROJECTS } from '@/data/projects';
import { SUPERPLAY_POSTS } from '@/data/superplay';
import type { MediaImage, MediaVideo } from '@/data/types';

const PUBLIC_DIR = fileURLToPath(new URL('../../public/', import.meta.url));

const imagePaths = (image: MediaImage) => [image.src, ...(image.small ? [image.small.src] : [])];
const videoPaths = (video: MediaVideo) => [video.src, video.poster];

const projectPaths = PROJECTS.flatMap((project) => [
  ...(project.cover ? imagePaths(project.cover) : []),
  ...project.blocks.flatMap((block) =>
    block.kind === 'row'
      ? block.images.flatMap(imagePaths)
      : block.kind === 'video'
        ? videoPaths(block.video)
        : [],
  ),
]);

const superPlayPaths = SUPERPLAY_POSTS.flatMap((tile) =>
  tile.kind === 'image' ? imagePaths(tile.image) : videoPaths(tile.video),
);
const previewPaths = SUPERPLAY_PREVIEWS.flatMap(videoPaths);
const referenced = new Set([...projectPaths, ...superPlayPaths, ...previewPaths]);

describe('media referenced by the site', () => {
  it.each([...referenced])('public/%s exists', (path) => {
    expect(path.startsWith('/'), 'paths must be relative to the base path').toBe(false);
    expect(existsSync(`${PUBLIC_DIR}${path}`)).toBe(true);
  });

  it('public/work has no unused files', () => {
    const files = readdirSync(`${PUBLIC_DIR}work`, { recursive: true, withFileTypes: true })
      .filter((entry) => entry.isFile() && !entry.name.startsWith('.'))
      .map((entry) => relative(PUBLIC_DIR, join(entry.parentPath, entry.name)));
    expect(files.filter((file) => !referenced.has(file))).toEqual([]);
  });
});

describe('Disney Solitaire previews', () => {
  it('are the 8 chosen In-Game clips (two pages of 4)', () => {
    expect(SUPERPLAY_PREVIEWS).toHaveLength(8);
    const removed = ['preview-03', 'preview-05', 'preview-06', 'preview-10'];
    expect(SUPERPLAY_PREVIEWS.filter((v) => removed.some((r) => v.src.includes(r)))).toEqual([]);
  });
});

describe('Disney Solitaire posts', () => {
  it('follow the numbering of the files in the "good" folder (1, 2, 3 ...)', () => {
    const numbers = SUPERPLAY_POSTS.map((tile) => {
      const src = tile.kind === 'image' ? tile.image.src : tile.video.src;
      return Number(/(\d+)\.(jpg|mp4)$/.exec(src)?.[1]);
    });
    expect(numbers).toEqual(numbers.map((_, i) => i + 1));
  });
});

describe('projects', () => {
  it('have unique slugs', () => {
    const slugs = PROJECTS.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it.each(PROJECTS.map((p) => [p.slug, p] as const))('%s has a title and content', (_, p) => {
    expect(p.title.trim()).not.toBe('');
    expect(p.blocks.length).toBeGreaterThan(0);
    if (p.blurb !== undefined) {
      expect(p.blurb.trim().length, 'short card description').toBeGreaterThan(10);
      expect(p.blurb.length).toBeLessThanOrEqual(90);
    }
  });

  it.each(PROJECTS.map((p) => [p.slug, p] as const))(
    '%s uses its thumbnail from the previous site',
    (slug, p) => {
      expect(p.cover?.src).toBe(`work/${slug}/thumb.jpg`);
    },
  );
});
