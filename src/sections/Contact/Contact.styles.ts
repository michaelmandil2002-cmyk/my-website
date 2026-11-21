import styled from 'styled-components';

import { media } from '@/styles/media';

export const StyledContact = styled.section`
  padding-block: ${({ theme }) => theme.space['3xl']};
  color: ${({ theme }) => theme.colors.onPrimary};
  background-color: ${({ theme }) => theme.colors.text};

  ${media.lg} {
    padding-block: ${({ theme }) => theme.space['4xl']};
  }
`;

export const Eyebrow = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  opacity: 0.7;
`;

export const Title = styled.h2`
  margin-block: ${({ theme }) => theme.space.md} ${({ theme }) => theme.space.xl};
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: ${({ theme }) => theme.fontSizes.section};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: ${({ theme }) => theme.lineHeights.none};
  letter-spacing: -0.03em;
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

  a {
    color: ${({ theme }) => theme.colors.onPrimary};
  }

  a:hover {
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.onPrimary};
    border-color: ${({ theme }) => theme.colors.onPrimary};
  }
`;
