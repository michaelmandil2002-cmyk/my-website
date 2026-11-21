import styled from 'styled-components';

export const CardLink = styled.a`
  display: block;
  text-decoration: none;

  &:hover img {
    transform: scale(1.03);
  }
`;

export const CardMedia = styled.div`
  /* Same crop as the thumbnails on the previous Adobe Portfolio site. */
  aspect-ratio: 202 / 158;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.lg};
  background-color: ${({ theme }) => theme.colors.surface};

  picture,
  img {
    width: 100%;
    height: 100%;
  }

  img {
    transition: transform ${({ theme }) => theme.transitions.base};
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

export const CardTitle = styled.h3`
  margin-top: ${({ theme }) => theme.space.md};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;
