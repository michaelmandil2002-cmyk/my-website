import { memo, useEffect } from 'react';

import { StyledVideo } from '@/components/ui/LazyVideo/LazyVideo.styles';
import { useInView } from '@/hooks/useInView';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export interface VideoSource {
  readonly src: string;
  /** e.g. 'video/webm; codecs="av01.0.05M.08"' or "video/mp4". List best-first. */
  readonly type: string;
}

export interface LazyVideoProps {
  readonly sources: readonly VideoSource[];
  /** Poster image shown before load. Strongly recommended to avoid blank frames. */
  readonly poster?: string;
  readonly width: number;
  readonly height: number;
  /** Decorative background-style video: muted, looped, inline, no controls. */
  readonly ambient?: boolean;
  /** Accessible label (required for non-ambient videos). */
  readonly label?: string;
  readonly className?: string;
}

/**
 * Defers fetching video until it approaches the viewport. Ambient videos only play
 * while visible and never autoplay for users who prefer reduced motion.
 */
function LazyVideoComponent({
  sources,
  poster,
  width,
  height,
  ambient = false,
  label,
  className,
}: LazyVideoProps) {
  const [ref, inView] = useInView<HTMLVideoElement>({ once: !ambient, rootMargin: '300px' });
  const reducedMotion = usePrefersReducedMotion();
  const shouldAutoplay = ambient && !reducedMotion;

  useEffect(() => {
    const video = ref.current;
    if (!video || !shouldAutoplay) return;

    if (inView) {
      video.play().catch(() => {
        /* Autoplay can be blocked by the browser; the poster remains visible. */
      });
    } else {
      video.pause();
    }
  }, [inView, shouldAutoplay, ref]);

  return (
    <StyledVideo
      ref={ref}
      className={className}
      poster={poster}
      width={width}
      height={height}
      $ratio={`${width} / ${height}`}
      preload="none"
      playsInline
      muted={ambient}
      loop={ambient}
      controls={!ambient}
      aria-label={label}
      aria-hidden={ambient || undefined}
    >
      {inView && sources.map((s) => <source key={s.src} src={s.src} type={s.type} />)}
    </StyledVideo>
  );
}

export const LazyVideo = memo(LazyVideoComponent);
