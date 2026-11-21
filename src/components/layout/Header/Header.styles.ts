import styled from 'styled-components';

import { media } from '@/styles/media';

export const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.zIndices.header};
  background-color: ${({ theme }) => theme.colors.backgroundTranslucent};
  backdrop-filter: saturate(180%) blur(10px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Bar = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${({ theme }) => theme.layout.headerHeight};
`;

export const Brand = styled.a`
  display: inline-flex;
  align-items: center;
  min-height: 2.75rem;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: 1;
  letter-spacing: ${({ theme }) => theme.letterSpacings.snug};
  text-decoration: none;
`;

export const MenuToggle = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  color: inherit;
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.sm};
  cursor: pointer;

  ${media.md} {
    display: none;
  }
`;

export const Nav = styled.nav<{ readonly $open: boolean }>`
  /* Mobile: dropdown panel overlays content (no layout shift). */
  position: absolute;
  top: 100%;
  right: 0;
  left: 0;
  display: ${({ $open }) => ($open ? 'block' : 'none')};
  padding: ${({ theme }) => theme.space.md};
  background-color: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.md};

  ${media.md} {
    position: static;
    display: block;
    padding: 0;
    background: none;
    border: 0;
    box-shadow: none;
  }
`;

export const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xs};
  padding: 0;
  list-style: none;

  ${media.md} {
    flex-direction: row;
    gap: ${({ theme }) => theme.space.lg};
  }
`;

export const NavItemLink = styled.a`
  display: flex;
  align-items: center;
  min-height: 2.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
  text-decoration: none;
  transition: color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;
