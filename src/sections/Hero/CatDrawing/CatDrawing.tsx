import { asset } from '@/constants/site';
import { CAT_MARKER_WIDTH, CAT_STROKES, CAT_VIEWBOX } from '@/data/catDrawing';
import { Frame } from '@/sections/Hero/CatDrawing/CatDrawing.styles';

interface CatDrawingProps {
  readonly src: string;
  readonly srcSet: string;
  readonly sizes: string;
  readonly width: number;
  readonly height: number;
  readonly className?: string;
}

const MASK_ID = 'cat-marker';
const [, , VIEW_W, VIEW_H] = CAT_VIEWBOX.split(' ').map(Number);

/** One part's marker strokes, each tagged with its place in the drawing order. */
function strokes(part: 'body' | 'face') {
  return (
    <g stroke="#fff" strokeWidth={CAT_MARKER_WIDTH[part]}>
      {CAT_STROKES.map((s, i) =>
        s.part === part ? <path key={s.d} d={s.d} pathLength={1} data-stroke={i} /> : null,
      )}
    </g>
  );
}

/**
 * The hand-drawn cat, painted in once as if by a marker. The art itself never changes: a
 * stroke moving along the drawing's centre lines uncovers the real image underneath.
 */
export function CatDrawing({ src, srcSet, sizes, width, height, className }: CatDrawingProps) {
  return (
    <Frame className={className}>
      <img
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        width={width}
        height={height}
        alt="Hand-drawn illustration of a cat"
        fetchPriority="high"
      />
      <svg viewBox={CAT_VIEWBOX} aria-hidden="true" focusable="false">
        <defs>
          <mask id={MASK_ID} maskUnits="userSpaceOnUse">
            <g fill="none" strokeLinecap="round" strokeLinejoin="round">
              {strokes('body')}
              {/* The eye and nose pixels in black: keeps the body's marker off them till the end. */}
              <image href={asset('art/cat-face.png')} width={VIEW_W} height={VIEW_H} />
              {strokes('face')}
            </g>
          </mask>
        </defs>
        <image href={src} width={VIEW_W} height={VIEW_H} mask={`url(#${MASK_ID})`} />
      </svg>
    </Frame>
  );
}
