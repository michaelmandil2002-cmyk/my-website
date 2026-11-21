import styled from 'styled-components';

import { media } from '@/styles/media';

export const StyledHeading = styled.header`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.md};
  margin-bottom: ${({ theme }) => theme.space['2xl']};

  ${media.md} {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
    gap: ${({ theme }) => theme.space.xl};
  }
`;

export const Titles = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.sm};
  min-width: 0;
`;

export const Eyebrow = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.section};
  color: ${({ theme }) => theme.colors.heading};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: ${({ theme }) => theme.lineHeights.none};
  letter-spacing: ${({ theme }) => theme.letterSpacings.tight};
`;

export const Small = styled.span`
  display: block;
  font-size: 0.62em;
  letter-spacing: ${({ theme }) => theme.letterSpacings.tighter};
`;

export const Large = styled.span`
  display: block;
`;

export const Aside = styled.div`
  max-width: 28rem;
  color: ${({ theme }) => theme.colors.textMuted};

  ${media.md} {
    text-align: right;
  }
`;
