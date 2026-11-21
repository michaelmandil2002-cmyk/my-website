import styled from 'styled-components';

import { media } from '@/styles/media';
import { sectionSpacing } from '@/styles/section';

export const StyledCareer = styled.section`
  ${sectionSpacing}
  /* Same light gray band as Disney Solitaire. */
  background-color: ${({ theme }) => theme.colors.band};
`;

export const Title = styled.h2`
  margin-bottom: ${({ theme }) => theme.space.xl};
  font-size: ${({ theme }) => theme.fontSizes.section};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: ${({ theme }) => theme.lineHeights.none};
  letter-spacing: ${({ theme }) => theme.letterSpacings.tight};
  color: ${({ theme }) => theme.colors.heading};
`;

export const List = styled.ol`
  max-width: 56rem;
  padding: 0;
  list-style: none;
  border-top: 1px solid ${({ theme }) => theme.colors.text};
`;

/** Phones: role, years, place and details stacked. Wider screens: years on the right. */
export const Item = styled.li`
  display: grid;
  gap: ${({ theme }) => theme.space.xs};
  padding-block: ${({ theme }) => theme.space.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  ${media.md} {
    grid-template-columns: minmax(0, 1fr) auto;
    column-gap: ${({ theme }) => theme.space.xl};
  }

  h3 {
    font-size: ${({ theme }) => theme.fontSizes.xl};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
  }

  h3,
  p,
  ul {
    grid-column: 1;
  }

  p {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  ul {
    display: grid;
    gap: ${({ theme }) => theme.space.xs};
    margin-top: ${({ theme }) => theme.space.xs};
    padding-left: 1.1em;
    color: ${({ theme }) => theme.colors.textMuted};
  }

  time {
    color: ${({ theme }) => theme.colors.textMuted};

    ${media.md} {
      grid-row: 1;
      grid-column: 2;
      text-align: right;
    }
  }
`;
