import type { ReactNode } from 'react';

import {
  Aside,
  Eyebrow,
  Large,
  Small,
  StyledHeading,
  Title,
  Titles,
} from '@/components/ui/SectionHeading/SectionHeading.styles';

interface SectionHeadingProps {
  readonly id: string;
  /** First, smaller line. */
  readonly title: string;
  /** Second, large line. */
  readonly highlight: string;
  readonly eyebrow?: string;
  readonly aside?: ReactNode;
}

/** Two-line section title: a smaller line over a large one. */
export function SectionHeading({ id, title, highlight, eyebrow, aside }: SectionHeadingProps) {
  return (
    <StyledHeading>
      <Titles>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <Title id={id}>
          <Small>{title}</Small>
          <Large>{highlight}</Large>
        </Title>
      </Titles>
      {aside && <Aside>{aside}</Aside>}
    </StyledHeading>
  );
}
