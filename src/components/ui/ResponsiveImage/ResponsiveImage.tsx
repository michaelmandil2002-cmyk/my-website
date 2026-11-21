import { memo } from 'react';

import { StyledImg, StyledPicture } from '@/components/ui/ResponsiveImage/ResponsiveImage.styles';

export interface ImageSource {
  /** e.g. "/img/hero-640.avif 640w, /img/hero-1280.avif 1280w" */
  readonly srcSet: string;
  /** MIME type, e.g. "image/avif" or "image/webp". */
  readonly type: string;
}

export interface ResponsiveImageProps {
  readonly src: string;
  readonly alt: string;
  /** Intrinsic width and height are required to reserve space and prevent layout shift (CLS). */
  readonly width: number;
  readonly height: number;
  /** Modern-format sources, listed best-first (AVIF, then WebP). The <img> is the fallback. */
  readonly sources?: readonly ImageSource[];
  readonly srcSet?: string;
  readonly sizes?: string;
  /** Set for above-the-fold / LCP images: loads eagerly with high fetch priority. */
  readonly priority?: boolean;
  readonly fit?: 'cover' | 'contain';
  readonly className?: string;
}

function ResponsiveImageComponent({
  src,
  alt,
  width,
  height,
  sources = [],
  srcSet,
  sizes = '100vw',
  priority = false,
  fit = 'cover',
  className,
}: ResponsiveImageProps) {
  return (
    <StyledPicture className={className}>
      {sources.map((source) => (
        <source key={source.type} srcSet={source.srcSet} type={source.type} sizes={sizes} />
      ))}
      <StyledImg
        src={src}
        srcSet={srcSet}
        sizes={srcSet ? sizes : undefined}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        $fit={fit}
      />
    </StyledPicture>
  );
}

export const ResponsiveImage = memo(ResponsiveImageComponent);
