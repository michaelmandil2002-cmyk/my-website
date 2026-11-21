import styled from 'styled-components';

import { CatDrawing } from '@/sections/Hero/CatDrawing/CatDrawing';
import { media } from '@/styles/media';

/** Fills the first screen (below the header), so the next section starts only after scrolling. */
export const StyledHero = styled.section`
  display: flex;
  align-items: center;
  min-height: calc(100vh - ${({ theme }) => theme.layout.headerHeight});
  min-height: calc(100svh - ${({ theme }) => theme.layout.headerHeight});
  padding-block: ${({ theme }) => theme.space.xl};

  > * {
    flex: 1;
  }
`;

/**
 * Phones: the drawing on top, then the text.
 * Desktop: text and drawing side by side as one compact group, centered on the page.
 */
export const Layout = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space.xl};
  align-items: center;

  ${media.lg} {
    grid-template-columns: minmax(0, 36rem) minmax(0, 22rem);
    justify-content: center;
    column-gap: 4rem;
  }
`;

export const Text = styled.div`
  min-width: 0;
`;

export const Art = styled(CatDrawing)`
  order: -1;
  justify-self: center;
  width: 100%;
  max-width: 15rem;
  height: auto;

  ${media.lg} {
    order: 0;
    justify-self: center;
    max-width: 22rem;
  }
`;

export const Name = styled.h1`
  margin-block: ${({ theme }) => theme.space.sm} ${({ theme }) => theme.space.xl};
  font-size: ${({ theme }) => theme.fontSizes.display};
  color: ${({ theme }) => theme.colors.heading};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: ${({ theme }) => theme.lineHeights.none};
  letter-spacing: ${({ theme }) => theme.letterSpacings.tighter};
  overflow-wrap: anywhere;
`;

export const Lead = styled.p`
  max-width: 38rem;
  font-size: ${({ theme }) => theme.fontSizes.lg};

  ${media.lg} {
    font-size: ${({ theme }) => theme.fontSizes.xl};
  }
`;
