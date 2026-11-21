import { css } from 'styled-components';

import { media } from '@/styles/media';

/** The same vertical space for every content section, so the gaps between them are even. */
export const sectionSpacing = css`
  padding-block: ${({ theme }) => theme.space['3xl']};

  ${media.lg} {
    padding-block: ${({ theme }) => theme.space['4xl']};
  }
`;
