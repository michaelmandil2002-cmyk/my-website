import { LazyVideo } from '@/components/ui/LazyVideo/LazyVideo';
import { asset } from '@/constants/site';
import type { MediaVideo } from '@/data/types';
import { Grid, Item, StyledEventGrid } from '@/sections/SuperPlay/EventGrid/EventGrid.styles';
import { Subtitle } from '@/sections/SuperPlay/SuperPlay.styles';

interface EventGridProps {
  readonly title: string;
  readonly events: readonly MediaVideo[];
}

/** All in-game event videos; each plays muted on loop while on screen. */
export function EventGrid({ title, events }: EventGridProps) {
  return (
    <StyledEventGrid aria-labelledby="superplay-ingame">
      <Subtitle id="superplay-ingame">{title}</Subtitle>
      <Grid aria-label="In-game event videos">
        {events.map((event) => (
          <Item key={event.src}>
            <LazyVideo
              src={asset(event.src)}
              poster={asset(event.poster)}
              width={event.width}
              height={event.height}
              ambient
            />
          </Item>
        ))}
      </Grid>
    </StyledEventGrid>
  );
}
