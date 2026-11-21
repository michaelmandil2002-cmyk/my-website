import styled from 'styled-components';

import { media } from '@/styles/media';

export const StyledFooter = styled.footer`
  padding-block: ${({ theme }) => theme.space['2xl']};
  color: ${({ theme }) => theme.colors.textMuted};
  background-color: ${({ theme }) => theme.colors.surface};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export const FooterInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.md};
  font-size: ${({ theme }) => theme.fontSizes.sm};

  ${media.md} {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

export const FooterLink = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;
