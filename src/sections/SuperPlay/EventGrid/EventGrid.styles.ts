import styled from 'styled-components';

import { media } from '@/styles/media';

export const StyledEventGrid = styled.section``;

export const Bar = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space.md};
  margin-bottom: ${({ theme }) => theme.space.md};

  h3 {
    margin-bottom: 0;
  }
`;

export const PauseButton = styled.button`
  min-height: 2.75rem;
  padding: 0 ${({ theme }) => theme.space.md};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  background: none;
  border: 0;
  border-radius: ${({ theme }) => theme.radii.full};
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.background};
  }
`;

export const Grid = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${({ theme }) => theme.space.sm};
  padding: 0;
  list-style: none;

  ${media.md} {
    gap: ${({ theme }) => theme.space.md};
  }

  ${media.lg} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

export const Item = styled.li`
  min-width: 0;
`;
