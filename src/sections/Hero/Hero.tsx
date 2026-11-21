import { Button } from '@/components/ui/Button/Button';
import { Container } from '@/components/ui/Container/Container';
import { ResponsiveImage } from '@/components/ui/ResponsiveImage/ResponsiveImage';
import { SITE } from '@/constants/site';
import { SUPERPLAY_POSTS } from '@/data/superplay';
import type { MediaImage } from '@/data/types';
import {
  Actions,
  Bottom,
  Kicker,
  Lead,
  Name,
  Strip,
  StyledHero,
  Track,
} from '@/sections/Hero/Hero.styles';
import { imageProps } from '@/utils/media';

const STRIP: readonly MediaImage[] = SUPERPLAY_POSTS.flatMap((tile) =>
  tile.kind === 'image' && tile.image.width === tile.image.height ? [tile.image] : [],
).slice(0, 10);

export function Hero() {
  return (
    <StyledHero aria-labelledby="hero-title">
      <Container>
        <Kicker>{SITE.role} · Tattoo Artist</Kicker>
        <Name id="hero-title">{SITE.name}</Name>
        <Bottom>
          <Lead>
            Hi, I’m Michael! I design <em>playful</em> visuals for games, brands and screens, and
            right now I’m making Disney Solitaire art at Super Play.
          </Lead>
          <Actions>
            <Button href="#superplay" size="lg">
              See my work ↓
            </Button>
            <Button href="#contact" variant="secondary" size="lg">
              Get in touch ↗
            </Button>
          </Actions>
        </Bottom>
      </Container>

      {/* Decorative: the same posts appear (with alt text) in the Super Play section. */}
      <Strip aria-hidden="true">
        <Track>
          {[...STRIP, ...STRIP].map((image, index) => (
            <li key={`${image.src}-${String(index)}`}>
              <ResponsiveImage {...imageProps(image)} alt="" sizes="15rem" priority={index < 4} />
            </li>
          ))}
        </Track>
      </Strip>
    </StyledHero>
  );
}
