import styled from 'styled-components';

import { media } from '@/styles/media';

export const StyledHero = styled.section`
  padding-top: ${({ theme }) => theme.space['2xl']};
  padding-bottom: ${({ theme }) => theme.space['3xl']};

  ${media.lg} {
    padding-top: ${({ theme }) => theme.space['3xl']};
  }
`;

/** Phones: text, then the drawing below. Desktop: text left, drawing right. */
export const Layout = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space.xl};
  align-items: center;

  ${media.lg} {
    grid-template-columns: minmax(0, 3fr) minmax(0, 2fr);
    gap: ${({ theme }) => theme.space['2xl']};
  }
`;

export const Text = styled.div`
  min-width: 0;
`;

export const Art = styled.img`
  justify-self: center;
  width: 100%;
  max-width: 18rem;
  height: auto;

  ${media.lg} {
    justify-self: end;
    max-width: 24rem;
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
`;
