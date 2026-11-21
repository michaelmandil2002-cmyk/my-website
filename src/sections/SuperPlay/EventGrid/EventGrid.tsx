import { useState } from 'react';

import { LazyVideo } from '@/components/ui/LazyVideo/LazyVideo';
import { asset } from '@/constants/site';
import type { MediaVideo } from '@/data/types';
import { Subtitle } from '@/sections/SuperPlay/SuperPlay.styles';
import {
  Bar,
  Grid,
  Item,
  PauseButton,
  StyledEventGrid,
} from '@/sections/SuperPlay/EventGrid/EventGrid.styles';

interface EventGridProps {
  readonly title: string;
  readonly events: readonly MediaVideo[];
}

/**
 * All in-game event videos side by side. Each plays muted on loop while on screen
 * (never for reduced-motion users); one button pauses them all.
 */
export function EventGrid({ title, events }: EventGridProps) {
  const [paused, setPaused] = useState(false);

  return (
    <StyledEventGrid aria-labelledby="superplay-ingame">
      <Bar>
        <Subtitle id="superplay-ingame">{title}</Subtitle>
        <PauseButton
          type="button"
          aria-pressed={paused}
          onClick={() => {
            setPaused((prev) => !prev);
          }}
        >
          {paused ? '▶ Play videos' : '❚❚ Pause videos'}
        </PauseButton>
      </Bar>

      <Grid aria-label="In-game event videos">
        {events.map((event) => (
          <Item key={event.src}>
            <LazyVideo
              sources={[{ src: asset(event.src), type: 'video/mp4' }]}
              poster={asset(event.poster)}
              width={event.width}
              height={event.height}
              paused={paused}
              ambient
            />
          </Item>
        ))}
      </Grid>
    </StyledEventGrid>
  );
}
