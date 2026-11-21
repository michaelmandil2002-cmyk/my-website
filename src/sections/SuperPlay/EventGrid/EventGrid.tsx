import { useState } from 'react';

import { LazyVideo } from '@/components/ui/LazyVideo/LazyVideo';
import type { LightboxImage } from '@/components/ui/Lightbox/Lightbox';
import { asset } from '@/constants/site';
import type { MediaVideo } from '@/data/types';
import {
  Arrow,
  Bar,
  Counter,
  Grid,
  Item,
  Open,
  Pager,
  StyledEventGrid,
} from '@/sections/SuperPlay/EventGrid/EventGrid.styles';
import { Subtitle } from '@/sections/SuperPlay/SuperPlay.styles';
import { videoPreview } from '@/utils/media';

const PER_PAGE = 4;

interface EventGridProps {
  readonly title: string;
  readonly events: readonly MediaVideo[];
  /** Opens a video in the full-screen preview. */
  readonly onOpen: (item: LightboxImage) => void;
}

/**
 * In-game event videos, 4 at a time (2 rows of 2); arrows show the next or previous 4 and wrap
 * around. Each video plays muted on loop while on screen.
 */
export function EventGrid({ title, events, onOpen }: EventGridProps) {
  const pages = Math.max(1, Math.ceil(events.length / PER_PAGE));
  const [page, setPage] = useState(0);
  const visible = events.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);
  const go = (step: number) => {
    setPage((current) => (current + step + pages) % pages);
  };

  return (
    <StyledEventGrid aria-labelledby="superplay-ingame">
      <Bar>
        <Subtitle id="superplay-ingame">{title}</Subtitle>
        {pages > 1 && (
          <Pager>
            <Arrow
              type="button"
              aria-label="Previous videos"
              onClick={() => {
                go(-1);
              }}
            >
              ←
            </Arrow>
            <Counter aria-live="polite">
              {String(page + 1)} / {String(pages)}
            </Counter>
            <Arrow
              type="button"
              aria-label="Next videos"
              onClick={() => {
                go(1);
              }}
            >
              →
            </Arrow>
          </Pager>
        )}
      </Bar>

      <Grid aria-label="In-game event videos">
        {visible.map((event) => (
          <Item key={event.src}>
            <Open
              type="button"
              aria-label="Enlarge Disney Solitaire in-game video"
              onClick={() => {
                onOpen(videoPreview(event, 'Disney Solitaire in-game video'));
              }}
            >
              <LazyVideo
                src={asset(event.src)}
                poster={asset(event.poster)}
                width={event.width}
                height={event.height}
                ambient
              />
            </Open>
          </Item>
        ))}
      </Grid>
    </StyledEventGrid>
  );
}
