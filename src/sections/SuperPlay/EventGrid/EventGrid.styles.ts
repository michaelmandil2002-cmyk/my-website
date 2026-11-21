import styled from 'styled-components';

import { media } from '@/styles/media';

export const StyledEventGrid = styled.section``;

/** Subtitle on the left, page arrows on the right. */
export const Bar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space.md};
  margin-bottom: ${({ theme }) => theme.space.md};

  h3 {
    margin-bottom: 0;
  }
`;

export const Pager = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
`;

export const Arrow = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text};
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.text};
  border-radius: ${({ theme }) => theme.radii.full};
  transition:
    color ${({ theme }) => theme.transitions.fast},
    background-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.onPrimary};
    background-color: ${({ theme }) => theme.colors.text};
  }
`;

export const Counter = styled.span`
  min-width: 3ch;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: center;
`;

/** Four videos: 2 rows of 2 from tablets up; one per row on phones. One equal gap. */
export const Grid = styled.ul`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: ${({ theme }) => theme.space.md};
  padding: 0;
  list-style: none;

  ${media.md} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const Item = styled.li`
  min-width: 0;
`;

export const Open = styled.button`
  display: block;
  width: 100%;
  padding: 0;
  background: none;
  border: 0;
`;
