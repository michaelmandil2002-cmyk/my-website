import styled from 'styled-components';

/** Devices with a real hover (mouse / trackpad). Touch screens get no hover effects. */
const canHover = '@media (hover: hover) and (pointer: fine)';

export const CardLink = styled.a`
  display: block;
  text-decoration: none;
`;

/**
 * Image plus a white panel with the title and a one-line description.
 * Hover devices: the panel slides up over the bottom of the image on hover / focus.
 * Touch devices: the panel sits under the image, always visible, no animation.
 */
export const Frame = styled.div`
  position: relative;
  overflow: hidden;
`;

export const CardMedia = styled.div`
  /* Same crop as the thumbnails on the previous Adobe Portfolio site. */
  aspect-ratio: 202 / 158;
  background-color: ${({ theme }) => theme.colors.surface};

  picture,
  img {
    width: 100%;
    height: 100%;
  }
`;

export const TextCover = styled.div`
  display: flex;
  align-items: flex-end;
  height: 100%;
  padding: ${({ theme }) => theme.space.lg};
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  color: ${({ theme }) => theme.colors.onPrimary};
  background-color: ${({ theme }) => theme.colors.text};
`;

export const Panel = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xs};
  padding: ${({ theme }) => theme.space.md} ${({ theme }) => theme.space.lg}
    ${({ theme }) => theme.space.lg};
  background-color: ${({ theme }) => theme.colors.background};

  ${canHover} {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateY(100%);
    transition: transform ${({ theme }) => theme.transitions.base};

    ${CardLink}:hover &,
    ${CardLink}:focus-visible & {
      transform: none;
    }
  }
`;

export const CardTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  color: ${({ theme }) => theme.colors.text};
`;

export const Blurb = styled.p`
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: 1.4;
  color: ${({ theme }) => theme.colors.text};
`;
