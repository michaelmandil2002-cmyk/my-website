import styled, { keyframes } from 'styled-components';

import { media } from '@/styles/media';

export const StyledHero = styled.section`
  padding-top: ${({ theme }) => theme.space['2xl']};
  padding-bottom: ${({ theme }) => theme.space['3xl']};

  ${media.lg} {
    padding-top: ${({ theme }) => theme.space['3xl']};
  }
`;

export const Kicker = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const Name = styled.h1`
  margin-block: ${({ theme }) => theme.space.sm} ${({ theme }) => theme.space.xl};
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: ${({ theme }) => theme.fontSizes.display};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: ${({ theme }) => theme.lineHeights.none};
  letter-spacing: -0.035em;
  overflow-wrap: anywhere;
`;

export const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.lg};

  ${media.lg} {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
  }
`;

export const Lead = styled.p`
  max-width: 34rem;
  font-size: ${({ theme }) => theme.fontSizes.lg};

  em {
    font-family: ${({ theme }) => theme.fonts.serif};
    font-size: 1.2em;
  }
`;

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space.sm};
`;

const scroll = keyframes`
  to {
    transform: translateX(-50%);
  }
`;

export const Strip = styled.div`
  margin-top: ${({ theme }) => theme.space['2xl']};
  overflow: hidden;
  mask-image: linear-gradient(to right, transparent, #000 6%, #000 94%, transparent);
`;

export const Track = styled.ul`
  display: flex;
  gap: ${({ theme }) => theme.space.md};
  width: max-content;
  padding: 0;
  list-style: none;
  animation: ${scroll} 60s linear infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }

  li {
    flex: none;
    width: clamp(9rem, 30vw, 15rem);
    overflow: hidden;
    border-radius: ${({ theme }) => theme.radii.lg};
  }
`;
