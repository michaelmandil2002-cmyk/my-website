import styled from 'styled-components';

import { media } from '@/styles/media';

export const StyledSuperPlay = styled.section`
  padding-block: ${({ theme }) => theme.space['3xl']};
  background-color: ${({ theme }) => theme.colors.surface};

  ${media.lg} {
    padding-block: ${({ theme }) => theme.space['4xl']};
  }
`;

export const SubHeading = styled.h3`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space.md};
  margin-bottom: ${({ theme }) => theme.space.lg};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.medium};

  small {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    font-weight: ${({ theme }) => theme.fontWeights.regular};
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const Events = styled.ul`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: min(85%, 26rem);
  gap: ${({ theme }) => theme.space.md};
  margin-bottom: ${({ theme }) => theme.space['3xl']};
  padding: 0 0 ${({ theme }) => theme.space.md};
  overflow-x: auto;
  overscroll-behavior-x: contain;
  scroll-snap-type: x mandatory;
  list-style: none;

  ${media.md} {
    grid-auto-columns: 26rem;
  }
`;

export const Event = styled.li`
  scroll-snap-align: start;

  video {
    border-radius: ${({ theme }) => theme.radii.lg};
  }

  p {
    margin-top: ${({ theme }) => theme.space.sm};
    font-size: ${({ theme }) => theme.fontSizes.sm};
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const Grid = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${({ theme }) => theme.space.sm};
  padding: 0;
  list-style: none;

  ${media.md} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: ${({ theme }) => theme.space.md};
  }

  ${media.lg} {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

export const Tile = styled.li<{ readonly $wide: boolean }>`
  grid-column: ${({ $wide }) => ($wide ? 'span 2' : 'auto')};
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.md};

  ${media.md} {
    border-radius: ${({ theme }) => theme.radii.lg};
  }

  img,
  video {
    width: 100%;
    height: 100%;
    aspect-ratio: ${({ $wide }) => ($wide ? 'auto' : '1')};
    object-fit: cover;
  }
`;

export const TileButton = styled.button`
  display: block;
  width: 100%;
  height: 100%;
  padding: 0;
  background: none;
  border: 0;
  cursor: zoom-in;

  img {
    transition: transform ${({ theme }) => theme.transitions.base};
  }

  &:hover img {
    transform: scale(1.03);
  }
`;

export const More = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${({ theme }) => theme.space.xl};
`;
