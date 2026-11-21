import type { LightboxImage } from '@/components/ui/Lightbox/Lightbox';
import { ResponsiveImage } from '@/components/ui/ResponsiveImage/ResponsiveImage';
import { asset } from '@/constants/site';
import type { MediaImage } from '@/data/types';
import { Item, Open, Row } from '@/pages/ProjectPage/ImageRow/ImageRow.styles';
import { imageProps } from '@/utils/media';

interface ImageRowProps {
  readonly images: readonly MediaImage[];
  /** Each image's width as a % of the content area (from the old site). */
  readonly widths: readonly number[];
  /** Alt text for each image, in order. */
  readonly alts: readonly string[];
  readonly priority?: boolean;
  /** Use the wider 72rem area. */
  readonly wide?: boolean;
  readonly onOpen: (image: LightboxImage) => void;
}

/** One row of project images; each opens full size in the lightbox. */
export function ImageRow({
  images,
  widths,
  alts,
  priority = false,
  wide = false,
  onOpen,
}: ImageRowProps) {
  const area = wide ? 1152 : 928;
  return (
    <Row $wide={wide}>
      {images.map((image, i) => {
        const alt = alts[i] ?? '';
        const width = widths[i] ?? 100;
        return (
          <Item key={image.src} $width={width} $single={images.length === 1}>
            <Open
              type="button"
              aria-label={`Enlarge: ${alt}`}
              onClick={() => {
                onOpen({ src: asset(image.src), alt, width: image.width, height: image.height });
              }}
            >
              <ResponsiveImage
                {...imageProps(image)}
                alt={alt}
                sizes={`(min-width: ${String(area + 64)}px) ${String(Math.round(area * (width / 100)))}px, ${String(images.length === 1 ? 100 : Math.round(width))}vw`}
                priority={priority && i === 0}
              />
            </Open>
          </Item>
        );
      })}
    </Row>
  );
}
