import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

import { PROJECTS } from '@/data/projects';
import { SUPERPLAY_EVENTS, SUPERPLAY_POSTS } from '@/data/superplay';
import type { MediaImage, MediaVideo } from '@/data/types';

const PUBLIC_DIR = fileURLToPath(new URL('../../public/', import.meta.url));

const imagePaths = (image: MediaImage) => [image.src, ...(image.small ? [image.small.src] : [])];
const videoPaths = (video: MediaVideo) => [video.src, video.poster];

const projectPaths = PROJECTS.flatMap((project) => [
  ...(project.cover ? imagePaths(project.cover) : []),
  ...project.blocks.flatMap((block) => (block.kind === 'image' ? imagePaths(block.image) : [])),
]);
const superPlayPaths = [
  ...SUPERPLAY_POSTS.flatMap((tile) =>
    tile.kind === 'image' ? imagePaths(tile.image) : videoPaths(tile.video),
  ),
  ...SUPERPLAY_EVENTS.flatMap((event) => videoPaths(event.video)),
];

describe('media referenced by the site', () => {
  it.each([...new Set([...projectPaths, ...superPlayPaths])])('public/%s exists', (path) => {
    expect(path.startsWith('/'), 'paths must be relative to the base path').toBe(false);
    expect(existsSync(`${PUBLIC_DIR}${path}`)).toBe(true);
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
  });
});
