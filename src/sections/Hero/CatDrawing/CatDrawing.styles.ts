import styled, { css, keyframes } from 'styled-components';

import { CAT_STROKES } from '@/data/catDrawing';

/**
 * Plays once when the site opens: after a short beat the marker paints the drawing in, stroke
 * after stroke at one steady speed (body first, eyes and nose last), and the drawing stays.
 * No fades: the marker strokes cover every pixel of the drawing.
 */
const DURATION = '4.5s';
const DELAY = '0.3s';
const DRAW_START = 0;
const DRAW_END = 100;
/** A short pen-up pause between strokes, as a share of the drawing time. */
const PAUSE = 0.012;

const total = CAT_STROKES.reduce((sum, s) => sum + s.length, 0);
const drawShare = 1 - PAUSE * (CAT_STROKES.length - 1);
const pct = (n: number) => `${n.toFixed(2)}%`;

let elapsed = 0;
const strokeAnimations = CAT_STROKES.map((stroke, i) => {
  const start = DRAW_START + (DRAW_END - DRAW_START) * elapsed;
  elapsed += (stroke.length / total) * drawShare + PAUSE;
  const end = DRAW_START + (DRAW_END - DRAW_START) * (elapsed - PAUSE);
  const paint = keyframes`
    0%, ${pct(start)} { stroke-dashoffset: 1; }
    ${pct(Math.max(end, start + 0.01))}, 100% { stroke-dashoffset: 0; }
  `;
  return css`
    [data-stroke='${String(i)}'] {
      animation-name: ${paint};
    }
  `;
});

export const Frame = styled.div`
  position: relative;

  img {
    display: block;
    width: 100%;
    height: auto;
    /* Kept for its alt text and layout; the painted copy in the SVG is what shows. */
    opacity: 0;
  }

  svg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }

  [data-stroke] {
    stroke-dasharray: 1;
    stroke-dashoffset: 1;
    animation-duration: ${DURATION};
    animation-delay: ${DELAY};
    animation-timing-function: linear;
    animation-fill-mode: both;
  }

  ${strokeAnimations}

  /* No animation for people who ask for less motion: just the finished drawing. */
  @media (prefers-reduced-motion: reduce) {
    img {
      opacity: 1;
    }

    svg {
      display: none;
    }
  }
`;
