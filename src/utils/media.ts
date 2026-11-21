import { asset } from '@/constants/site';
import type { MediaImage } from '@/data/types';

/** Props for <ResponsiveImage>: base-path-safe URLs plus a srcset when a smaller copy exists. */
export function imageProps(image: MediaImage) {
  const src = asset(image.src);
  return {
    src,
    width: image.width,
    height: image.height,
    ...(image.small && {
      srcSet: `${asset(image.small.src)} ${String(image.small.width)}w, ${src} ${String(image.width)}w`,
    }),
  };
}
