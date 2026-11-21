import type { ElementType, ReactNode } from 'react';

import { StyledContainer } from '@/components/ui/Container/Container.styles';

interface ContainerProps {
  readonly children: ReactNode;
  readonly as?: ElementType;
  readonly className?: string;
}

/** Centers content and applies consistent horizontal gutters. */
export function Container({ children, as, className }: ContainerProps) {
  return (
    <StyledContainer as={as} className={className}>
      {children}
    </StyledContainer>
  );
}
