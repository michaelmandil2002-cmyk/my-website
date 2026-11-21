import styled from 'styled-components';

import { media } from '@/styles/media';

export const StyledFooter = styled.footer`
  padding-block: ${({ theme }) => theme.space.lg};
  color: ${({ theme }) => theme.colors.textMuted};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export const FooterInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.sm};
  font-size: ${({ theme }) => theme.fontSizes.sm};

  ${media.md} {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

export const FooterLinks = styled.ul`
  display: flex;
  flex-wrap: wrap;
  column-gap: ${({ theme }) => theme.space.lg};
  padding: 0;
  list-style: none;

  a {
    display: inline-flex;
    align-items: center;
    min-height: 2.75rem;
    text-decoration: none;
  }

  a:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;
