import { Card } from '@/components/ui/Card/Card';
import { Container } from '@/components/ui/Container/Container';
import { Grid, Heading, StyledFeatures } from '@/sections/Features/Features.styles';

interface Feature {
  readonly title: string;
  readonly description: string;
}

const FEATURES: readonly Feature[] = [
  {
    title: 'Performance first',
    description:
      'Lazy-loaded media, responsive images, code-split vendor chunks and zero web-font layout shift.',
  },
  {
    title: 'Accessible by default',
    description:
      'Semantic landmarks, skip link, visible focus styles, reduced-motion support and lint-enforced a11y.',
  },
  {
    title: 'Built to scale',
    description:
      'Strict TypeScript, a centralized theme, reusable components and clean @/ import aliases.',
  },
];

export function Features() {
  return (
    <StyledFeatures id="features" aria-labelledby="features-title">
      <Container>
        <Heading id="features-title">Features</Heading>
        <Grid>
          {FEATURES.map((feature) => (
            <li key={feature.title}>
              <Card title={feature.title}>{feature.description}</Card>
            </li>
          ))}
        </Grid>
      </Container>
    </StyledFeatures>
  );
}
