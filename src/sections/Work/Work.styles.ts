import styled from 'styled-components';

import { media } from '@/styles/media';
import { sectionSpacing } from '@/styles/section';

export const StyledWork = styled.section`
  ${sectionSpacing}
`;

export const Grid = styled.ul`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  /* One gap, the same between cards side by side and between rows. */
  gap: ${({ theme }) => theme.space.lg};
  padding: 0;
  list-style: none;

  ${media.md} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  ${media.lg} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;
