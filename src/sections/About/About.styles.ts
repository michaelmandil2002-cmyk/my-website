import styled from 'styled-components';

import { media } from '@/styles/media';

export const StyledAbout = styled.section`
  padding-block: ${({ theme }) => theme.space['3xl']};
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  ${media.lg} {
    padding-block: ${({ theme }) => theme.space['4xl']};
  }
`;

export const Layout = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space['2xl']};

  ${media.lg} {
    grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
    gap: ${({ theme }) => theme.space['3xl']};
  }
`;

export const Intro = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.lg};

  h2 {
    font-family: ${({ theme }) => theme.fonts.serif};
    font-size: ${({ theme }) => theme.fontSizes.section};
    font-weight: ${({ theme }) => theme.fontWeights.regular};
    line-height: ${({ theme }) => theme.lineHeights.none};
    letter-spacing: -0.03em;
  }

  p {
    max-width: 30rem;
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
`;

export const Details = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space['2xl']};
`;

export const Group = styled.div`
  h3 {
    padding-bottom: ${({ theme }) => theme.space.sm};
    margin-bottom: ${({ theme }) => theme.space.xs};
    font-size: ${({ theme }) => theme.fontSizes.sm};
    font-weight: ${({ theme }) => theme.fontWeights.regular};
    color: ${({ theme }) => theme.colors.textMuted};
    border-bottom: 1px solid ${({ theme }) => theme.colors.text};
  }
`;

export const Timeline = styled.ul`
  padding: 0;
  list-style: none;

  li {
    display: grid;
    gap: ${({ theme }) => theme.space.xs};
    padding-block: ${({ theme }) => theme.space.md};
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};

    ${media.sm} {
      grid-template-columns: minmax(0, 1fr) auto;
      column-gap: ${({ theme }) => theme.space.lg};
    }
  }

  strong {
    font-weight: ${({ theme }) => theme.fontWeights.medium};
  }

  span {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  time {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    color: ${({ theme }) => theme.colors.textMuted};

    ${media.sm} {
      grid-row: 1 / span 2;
      grid-column: 2;
      text-align: right;
    }
  }
`;

export const Tags = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space.sm};
  padding: ${({ theme }) => theme.space.md} 0 0;
  list-style: none;

  li {
    padding: ${({ theme }) => theme.space.xs} ${({ theme }) => theme.space.md};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radii.full};
  }
`;
