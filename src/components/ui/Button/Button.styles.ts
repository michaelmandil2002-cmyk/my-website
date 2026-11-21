import styled, { css } from 'styled-components';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'md' | 'lg';

interface StyledButtonProps {
  readonly $variant: ButtonVariant;
  readonly $size: ButtonSize;
}

const variants = {
  primary: css`
    color: ${({ theme }) => theme.colors.onPrimary};
    background-color: ${({ theme }) => theme.colors.primary};

    &:hover {
      background-color: ${({ theme }) => theme.colors.primaryHover};
    }
  `,
  secondary: css`
    color: ${({ theme }) => theme.colors.text};
    background-color: transparent;
    border-color: currentColor;

    &:hover {
      color: ${({ theme }) => theme.colors.onPrimary};
      background-color: ${({ theme }) => theme.colors.primary};
      border-color: ${({ theme }) => theme.colors.primary};
    }
  `,
  ghost: css`
    color: ${({ theme }) => theme.colors.text};
    background-color: transparent;

    &:hover {
      background-color: ${({ theme }) => theme.colors.surface};
    }
  `,
} as const;

const sizes = {
  md: css`
    min-height: 2.75rem;
    padding: 0 ${({ theme }) => theme.space.lg};
    font-size: ${({ theme }) => theme.fontSizes.base};
  `,
  lg: css`
    min-height: 3.25rem;
    padding: 0 ${({ theme }) => theme.space.xl};
    font-size: ${({ theme }) => theme.fontSizes.lg};
  `,
} as const;

export const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space.sm};
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.radii.full};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-decoration: none;
  cursor: pointer;
  white-space: nowrap;
  transition:
    color ${({ theme }) => theme.transitions.fast},
    background-color ${({ theme }) => theme.transitions.fast},
    border-color ${({ theme }) => theme.transitions.fast};

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${({ $variant }) => variants[$variant]}
  ${({ $size }) => sizes[$size]}
`;
