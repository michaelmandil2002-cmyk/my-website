import styled from 'styled-components';

import { media } from '@/styles/media';

/**
 * A row of project images laid out like the old Adobe Portfolio pages (each image at its
 * original width share, small gaps), in a 58rem (928px) area: a bit smaller than the old 1152px.
 */
export const Row = styled.ul<{ readonly $wide: boolean }>`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  /* The same gap between images and between rows, so spacing is even. */
  gap: 0.5rem;
  width: 100%;
  max-width: ${({ $wide }) => ($wide ? '72rem' : '58rem')};
  margin-inline: auto;
  padding: 0;
  list-style: none;

  /* Rows that follow each other sit close together, as on the old site. */
  & + & {
    margin-top: calc(0.5rem - var(--block-gap));
  }
`;

export const Item = styled.li<{ readonly $width: number; readonly $single: boolean }>`
  flex: 0 1 ${({ $width }) => String($width)}%;
  min-width: 0;

  /* On phones a lone image uses the full width. */
  ${({ $single }) => ($single ? 'flex-basis: 100%;' : '')}

  ${media.md} {
    flex-basis: ${({ $width }) => String($width)}%;
  }

  picture {
    display: block;
  }

  img {
    width: 100%;
    height: auto;
  }
`;

export const Open = styled.button`
  display: block;
  width: 100%;
  padding: 0;
  background: none;
  border: 0;
`;
