import styled from 'styled-components';

import { media } from '@/styles/media';

export const StyledContact = styled.section`
  padding-block: ${({ theme }) => theme.space['3xl']};
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.band};

  ${media.lg} {
    padding-block: ${({ theme }) => theme.space['4xl']};
  }

  :focus-visible {
    outline-color: ${({ theme }) => theme.colors.text};
  }
`;

export const Eyebrow = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

export const Title = styled.h2`
  margin-block: ${({ theme }) => theme.space.md} ${({ theme }) => theme.space.xl};
  font-size: ${({ theme }) => theme.fontSizes.section};
  color: ${({ theme }) => theme.colors.heading};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: ${({ theme }) => theme.lineHeights.none};
  letter-spacing: ${({ theme }) => theme.letterSpacings.tight};
`;

export const Email = styled.a`
  display: inline-block;
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  text-decoration-thickness: 1px;
  text-underline-offset: 0.2em;
  overflow-wrap: anywhere;

  &:hover {
    text-decoration-thickness: 2px;
  }
`;

export const Links = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space.sm};
  margin-top: ${({ theme }) => theme.space['2xl']};
`;
