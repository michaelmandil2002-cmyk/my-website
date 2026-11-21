import styled from 'styled-components';

import { media } from '@/styles/media';

export const StyledEventGrid = styled.section``;

/** Phones: one full-width video per row. Tablets: two. Desktop: three. One equal gap. */
export const Grid = styled.ul`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: ${({ theme }) => theme.space.md};
  padding: 0;
  list-style: none;

  ${media.md} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  ${media.lg} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

export const Item = styled.li`
  min-width: 0;
`;
