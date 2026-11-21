import { useState } from 'react';

import { Container } from '@/components/ui/Container/Container';
import { LazyVideo } from '@/components/ui/LazyVideo/LazyVideo';
import { Controls, PauseButton, Strip, Track } from '@/components/ui/VideoStrip/VideoStrip.styles';
import { asset } from '@/constants/site';
import type { MediaVideo } from '@/data/types';

interface VideoStripProps {
  readonly videos: readonly MediaVideo[];
  readonly className?: string;
}

/**
 * Full-width, endlessly scrolling row of muted looping videos with a pause control.
 * Only clips on screen load and play; reduced-motion users get still frames.
 */
export function VideoStrip({ videos, className }: VideoStripProps) {
  const [paused, setPaused] = useState(false);

  return (
    <div className={className}>
      {/* Decorative; the list repeats once so the loop is seamless. */}
      <Strip aria-hidden="true">
        <Track $paused={paused}>
          {[...videos, ...videos].map((video, index) => (
            <li key={`${video.src}-${String(index)}`}>
              <LazyVideo
                sources={[{ src: asset(video.src), type: 'video/mp4' }]}
                poster={asset(video.poster)}
                width={video.width}
                height={video.height}
                paused={paused}
                ambient
              />
            </li>
          ))}
        </Track>
      </Strip>

      <Container>
        <Controls>
          <PauseButton
            type="button"
            aria-pressed={paused}
            onClick={() => {
              setPaused((prev) => !prev);
            }}
          >
            {paused ? '▶ Play previews' : '❚❚ Pause previews'}
          </PauseButton>
        </Controls>
      </Container>
    </div>
  );
}
