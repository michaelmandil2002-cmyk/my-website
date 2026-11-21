import styled from 'styled-components';

import { media } from '@/styles/media';

export const StyledHero = styled.section`
  padding-top: ${({ theme }) => theme.space['2xl']};
  padding-bottom: ${({ theme }) => theme.space['3xl']};

  ${media.lg} {
    padding-top: ${({ theme }) => theme.space['3xl']};
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
