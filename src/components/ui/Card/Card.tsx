import { memo, type ReactNode } from 'react';

import { CardBody, CardTitle, StyledCard } from '@/components/ui/Card/Card.styles';

interface CardProps {
  readonly title: string;
  readonly children: ReactNode;
}

function CardComponent({ title, children }: CardProps) {
  return (
    <StyledCard>
      <CardTitle>{title}</CardTitle>
      <CardBody>{children}</CardBody>
    </StyledCard>
  );
}

export const Card = memo(CardComponent);
