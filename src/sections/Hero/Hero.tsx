import { Button } from '@/components/ui/Button/Button';
import { Container } from '@/components/ui/Container/Container';
import { ResponsiveImage } from '@/components/ui/ResponsiveImage/ResponsiveImage';
import {
  Actions,
  Eyebrow,
  HeroCopy,
  HeroGrid,
  Lead,
  Media,
  StyledHero,
  Title,
} from '@/sections/Hero/Hero.styles';

// Files in /public are served from the configured base path (GitHub Pages safe).
const HERO_IMAGE = `${import.meta.env.BASE_URL}images/hero.svg`;

export function Hero() {
  return (
    <StyledHero aria-labelledby="hero-title">
      <Container>
        <HeroGrid>
          <HeroCopy>
            <Eyebrow>Welcome</Eyebrow>
            <Title id="hero-title">Build something fast, accessible and beautiful.</Title>
            <Lead>
              A minimal, production-ready starter with React, TypeScript, Vite and styled-components
              — tuned for performance and Core Web Vitals.
            </Lead>
            <Actions>
              <Button href="#features" size="lg">
                Explore features
              </Button>
              <Button href="#contact" variant="secondary" size="lg">
                Get in touch
              </Button>
            </Actions>
          </HeroCopy>

          <Media>
            {/* LCP image: eager + high priority. Add AVIF/WebP `sources` for raster images. */}
            <ResponsiveImage
              src={HERO_IMAGE}
              alt="Abstract illustration of a website layout"
              width={640}
              height={480}
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority
            />
          </Media>
        </HeroGrid>
      </Container>
    </StyledHero>
  );
}
