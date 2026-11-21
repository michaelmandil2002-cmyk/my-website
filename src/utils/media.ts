import { asset } from '@/constants/site';
import type { LightboxImage } from '@/components/ui/Lightbox/Lightbox';
import type { MediaImage, MediaVideo } from '@/data/types';

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

/** A video as an item for the full-screen preview. */
export function videoPreview(video: MediaVideo, alt: string): LightboxImage {
  return {
    kind: 'video',
    src: asset(video.src),
    poster: asset(video.poster),
    width: video.width,
    height: video.height,
    alt,
  };
}
