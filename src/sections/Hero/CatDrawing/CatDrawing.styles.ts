import styled, { css, keyframes } from 'styled-components';

import { CAT_STROKES } from '@/data/catDrawing';

/**
 * Plays once when the site opens: after a short beat the marker paints the drawing in, stroke
 * after stroke at one steady speed (body first, eyes and nose last), and the drawing stays.
 * No fades: the marker strokes cover every pixel of the drawing.
 */
const DURATION = 4.5;
const DELAY = 0.3;
const PAUSE = DURATION * 0.012;

const total = CAT_STROKES.reduce((sum, s) => sum + s.length, 0);
const drawingTime = DURATION - PAUSE * (CAT_STROKES.length - 1);
const paint = keyframes`
  from { visibility: visible; }
  to { visibility: visible; stroke-dashoffset: 0; }
`;

let elapsed = DELAY;
const strokeAnimations = CAT_STROKES.map((stroke, i) => {
  const start = elapsed;
  const duration = (stroke.length / total) * drawingTime;
  elapsed += duration + PAUSE;
  // The stored length is rounded. Extend the dash to cover the whole path.
  const dash = stroke.length + 1;
  return css`
    [data-stroke='${String(i)}'] {
      stroke-dasharray: ${dash};
      stroke-dashoffset: ${dash};
      animation: ${paint} ${duration.toFixed(4)}s linear ${start.toFixed(4)}s forwards;
    }
  `;
});

const finishedDrawing = css`
  img {
    opacity: 1;
  }

  svg {
    display: none;
  }
`;

export const Frame = styled.div<{ $ready: boolean; $failed: boolean }>`
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

  ${strokeAnimations}

  [data-stroke] {
    visibility: hidden;
    animation-play-state: ${({ $ready }) => ($ready ? 'running' : 'paused')};
  }

  ${({ $failed }) => $failed && finishedDrawing}

  /* No animation for people who ask for less motion: just the finished drawing. */
  @media (prefers-reduced-motion: reduce) {
    ${finishedDrawing}
  }
`;
