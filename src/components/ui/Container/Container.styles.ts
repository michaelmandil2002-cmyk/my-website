import styled from 'styled-components';

import { media } from '@/styles/media';

export const StyledContainer = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin-inline: auto;
  padding-inline: ${({ theme }) => theme.space.md};

  ${media.md} {
    padding-inline: ${({ theme }) => theme.space.xl};
  }
`;
