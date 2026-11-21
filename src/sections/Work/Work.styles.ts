import styled from 'styled-components';

import { media } from '@/styles/media';

export const StyledWork = styled.section`
  padding-block: ${({ theme }) => theme.space['3xl']};

  ${media.lg} {
    padding-block: ${({ theme }) => theme.space['4xl']};
  }
`;

export const Filters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space.sm};
  margin-bottom: ${({ theme }) => theme.space.xl};
`;

export const Filter = styled.button`
  min-height: 2.75rem;
  padding: 0 ${({ theme }) => theme.space.md};
  color: ${({ theme }) => theme.colors.text};
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.full};
  cursor: pointer;
  transition:
    color ${({ theme }) => theme.transitions.fast},
    background-color ${({ theme }) => theme.transitions.fast},
    border-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.text};
  }

  &[aria-pressed='true'] {
    color: ${({ theme }) => theme.colors.onPrimary};
    background-color: ${({ theme }) => theme.colors.text};
    border-color: ${({ theme }) => theme.colors.text};
  }
`;

export const Grid = styled.ul`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: ${({ theme }) => theme.space['2xl']} ${({ theme }) => theme.space.lg};
  padding: 0;
  list-style: none;

  ${media.md} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  ${media.lg} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;
