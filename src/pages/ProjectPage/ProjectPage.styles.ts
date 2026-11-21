import styled from 'styled-components';

import { media } from '@/styles/media';

export const StyledProject = styled.article`
  padding-block: ${({ theme }) => theme.space.xl} ${({ theme }) => theme.space['3xl']};
`;

export const Back = styled.a`
  display: inline-flex;
  align-items: center;
  min-height: 2.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const Head = styled.header`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.md};
  max-width: ${({ theme }) => theme.layout.readingWidth};
  margin-block: ${({ theme }) => theme.space.xl} ${({ theme }) => theme.space['2xl']};

  h1 {
    font-family: ${({ theme }) => theme.fonts.serif};
    font-size: ${({ theme }) => theme.fontSizes.section};
    font-weight: ${({ theme }) => theme.fontWeights.regular};
    line-height: ${({ theme }) => theme.lineHeights.none};
    letter-spacing: -0.03em;

    &:focus {
      outline: none;
    }
  }

  p {
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
`;

export const Category = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.lg};

  ${media.md} {
    gap: ${({ theme }) => theme.space.xl};
  }

  h2 {
    max-width: ${({ theme }) => theme.layout.readingWidth};
    margin-top: ${({ theme }) => theme.space.lg};
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
  }

  p {
    max-width: ${({ theme }) => theme.layout.readingWidth};
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }

  /* Text that follows a heading sits closer to it. */
  h2 + p {
    margin-top: calc(-1 * ${({ theme }) => theme.space.md});
  }
`;

export const Figure = styled.figure`
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.lg};
`;

export const Next = styled.a`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.sm};
  margin-top: ${({ theme }) => theme.space['3xl']};
  padding-top: ${({ theme }) => theme.space.xl};
  text-decoration: none;
  border-top: 1px solid ${({ theme }) => theme.colors.text};

  span {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    color: ${({ theme }) => theme.colors.textMuted};
  }

  strong {
    font-family: ${({ theme }) => theme.fonts.serif};
    font-size: ${({ theme }) => theme.fontSizes['3xl']};
    font-weight: ${({ theme }) => theme.fontWeights.regular};
    line-height: ${({ theme }) => theme.lineHeights.tight};
  }

  &:hover strong {
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 0.15em;
  }
`;

export const NotFound = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => theme.space.lg};
  padding-block: ${({ theme }) => theme.space['3xl']};

  h1 {
    font-family: ${({ theme }) => theme.fonts.serif};
    font-size: ${({ theme }) => theme.fontSizes.section};
    font-weight: ${({ theme }) => theme.fontWeights.regular};
  }
`;
