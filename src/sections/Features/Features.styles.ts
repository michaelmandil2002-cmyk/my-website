import styled from 'styled-components';

import { media } from '@/styles/media';

export const StyledFeatures = styled.section`
  padding-block: ${({ theme }) => theme.space['2xl']};
  background-color: ${({ theme }) => theme.colors.surface};

  ${media.lg} {
    padding-block: ${({ theme }) => theme.space['3xl']};
  }
`;

export const Heading = styled.h2`
  margin-bottom: ${({ theme }) => theme.space.xl};
  font-size: ${({ theme }) => theme.fontSizes['2xl']};

  ${media.md} {
    font-size: 2rem;
  }
`;

export const Grid = styled.ul`
  display: grid;
  gap: ${({ theme }) => theme.space.lg};
  padding: 0;
  list-style: none;

  ${media.md} {
    grid-template-columns: repeat(3, 1fr);
  }
`;
