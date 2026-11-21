import styled from 'styled-components';

import { media } from '@/styles/media';

export const StyledSuperPlay = styled.section`
  background-color: ${({ theme }) => theme.colors.band};
  padding-block: ${({ theme }) => theme.space['2xl']};

  ${media.lg} {
    padding-block: ${({ theme }) => theme.space['3xl']};
  }
`;

export const Title = styled.h2`
  margin-bottom: ${({ theme }) => theme.space.xl};
  font-size: ${({ theme }) => theme.fontSizes.section};
  color: ${({ theme }) => theme.colors.heading};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: ${({ theme }) => theme.lineHeights.none};
  letter-spacing: ${({ theme }) => theme.letterSpacings.tight};
`;

/** One sub-part of the section (Social, In-Game), with even space after it. */
export const Group = styled.section`
  margin-bottom: ${({ theme }) => theme.space['3xl']};
`;

export const Subtitle = styled.h3`
  margin-bottom: ${({ theme }) => theme.space.md};
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  letter-spacing: ${({ theme }) => theme.letterSpacings.snug};
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

export const Tile = styled.li`
  overflow: hidden;
  img,
  video {
    width: 100%;
    height: 100%;
    aspect-ratio: 1;
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
