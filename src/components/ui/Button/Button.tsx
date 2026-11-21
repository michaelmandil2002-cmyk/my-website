import { memo, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ReactNode } from 'react';

import {
  StyledButton,
  type ButtonSize,
  type ButtonVariant,
} from '@/components/ui/Button/Button.styles';

interface BaseProps {
  readonly children: ReactNode;
  readonly variant?: ButtonVariant;
  readonly size?: ButtonSize;
}

type ButtonAsButton = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & { readonly href?: undefined };

type ButtonAsLink = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & { readonly href: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

/** Renders a <button>, or an <a> when `href` is provided, with identical styling. */
function ButtonComponent({ variant = 'primary', size = 'md', children, ...rest }: ButtonProps) {
  if (rest.href !== undefined) {
    return (
      <StyledButton as="a" $variant={variant} $size={size} {...rest}>
        {children}
      </StyledButton>
    );
  }

  const { type = 'button', ...buttonProps } = rest;
  return (
    <StyledButton type={type} $variant={variant} $size={size} {...buttonProps}>
      {children}
    </StyledButton>
  );
}

export const Button = memo(ButtonComponent);
