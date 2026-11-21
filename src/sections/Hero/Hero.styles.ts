import styled from 'styled-components';

import { media } from '@/styles/media';

export const StyledHero = styled.section`
  padding-block: ${({ theme }) => theme.space['2xl']};

  ${media.lg} {
    padding-block: ${({ theme }) => theme.space['3xl']};
  }
`;

export const HeroGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space['2xl']};
  align-items: center;

  ${media.lg} {
    grid-template-columns: 1.1fr 1fr;
  }
`;

export const HeroCopy = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.lg};
`;

export const Eyebrow = styled.p`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.display};
  letter-spacing: -0.02em;
`;

export const Lead = styled.p`
  max-width: 36rem;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.lg};
`;

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space.md};
`;

export const Media = styled.div`
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
`;
