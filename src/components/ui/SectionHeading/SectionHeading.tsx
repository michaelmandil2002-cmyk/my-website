import type { ReactNode } from 'react';

import {
  Aside,
  Eyebrow,
  Sans,
  Serif,
  StyledHeading,
  Title,
  Titles,
} from '@/components/ui/SectionHeading/SectionHeading.styles';

interface SectionHeadingProps {
  readonly id: string;
  /** First line, set in sans-serif. */
  readonly title: string;
  /** Second line, set in the display serif. */
  readonly serif: string;
  readonly eyebrow?: string;
  readonly aside?: ReactNode;
}

/** Two-line section title: a sans line over a large serif line. */
export function SectionHeading({ id, title, serif, eyebrow, aside }: SectionHeadingProps) {
  return (
    <StyledHeading>
      <Titles>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <Title id={id}>
          <Sans>{title}</Sans>
          <Serif>{serif}</Serif>
        </Title>
      </Titles>
      {aside && <Aside>{aside}</Aside>}
    </StyledHeading>
  );
}
