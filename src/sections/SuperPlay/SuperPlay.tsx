import { useState } from 'react';

import { Button } from '@/components/ui/Button/Button';
import { Container } from '@/components/ui/Container/Container';
import { LazyVideo } from '@/components/ui/LazyVideo/LazyVideo';
import { Lightbox, type LightboxImage } from '@/components/ui/Lightbox/Lightbox';
import { ResponsiveImage } from '@/components/ui/ResponsiveImage/ResponsiveImage';
import { asset } from '@/constants/site';
import { SUPERPLAY_PREVIEWS } from '@/data/previews';
import { SUPERPLAY_POSTS } from '@/data/superplay';
import {
  Grid,
  More,
  Previews,
  StyledSuperPlay,
  Tile,
  TileButton,
  Title,
} from '@/sections/SuperPlay/SuperPlay.styles';
import { imageProps } from '@/utils/media';

const INITIAL_POSTS = 12;
const POST_ALT = 'Disney Solitaire social media post';

/** Disney Solitaire posts and ads made at Super Play. */
export function SuperPlay() {
  const [showAll, setShowAll] = useState(false);
  const [zoomed, setZoomed] = useState<LightboxImage | null>(null);
  const posts = showAll ? SUPERPLAY_POSTS : SUPERPLAY_POSTS.slice(0, INITIAL_POSTS);

  return (
    <StyledSuperPlay id="superplay" aria-labelledby="superplay-title">
      <Container>
        <Title id="superplay-title">Disney Solitaire</Title>
      </Container>

      <Previews videos={SUPERPLAY_PREVIEWS} />

      <Container>
        <Grid aria-label="Disney Solitaire posts">
          {posts.map((tile) =>
            tile.kind === 'video' ? (
              <Tile key={tile.video.src}>
                <LazyVideo
                  sources={[{ src: asset(tile.video.src), type: 'video/mp4' }]}
                  poster={asset(tile.video.poster)}
                  width={tile.video.width}
                  height={tile.video.height}
                  ambient
                />
              </Tile>
            ) : (
              <Tile key={tile.image.src}>
                <TileButton
                  type="button"
                  aria-label={`Enlarge ${POST_ALT}`}
                  onClick={() => {
                    setZoomed({
                      src: asset(tile.image.src),
                      alt: POST_ALT,
                      width: tile.image.width,
                      height: tile.image.height,
                    });
                  }}
                >
                  <ResponsiveImage
                    {...imageProps(tile.image)}
                    alt={POST_ALT}
                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                  />
                </TileButton>
              </Tile>
            ),
          )}
        </Grid>

        {SUPERPLAY_POSTS.length > INITIAL_POSTS && (
          <More>
            <Button
              variant="secondary"
              aria-expanded={showAll}
              onClick={() => {
                setShowAll((prev) => !prev);
              }}
            >
              {showAll ? 'Show less' : `Show all ${String(SUPERPLAY_POSTS.length)}`}
            </Button>
          </More>
        )}
      </Container>

      <Lightbox
        image={zoomed}
        onClose={() => {
          setZoomed(null);
        }}
      />
    </StyledSuperPlay>
  );
}
