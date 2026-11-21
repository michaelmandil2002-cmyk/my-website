import { Large, Small, Title } from '@/components/ui/SectionHeading/SectionHeading.styles';

interface SectionHeadingProps {
  readonly id: string;
  /** First, smaller line. */
  readonly title: string;
  /** Second, large line. */
  readonly highlight: string;
}

/** Two-line section title: a smaller line over a large one. */
export function SectionHeading({ id, title, highlight }: SectionHeadingProps) {
  return (
    <Title id={id}>
      <Small>{title}</Small>
      <Large>{highlight}</Large>
    </Title>
  );
}
