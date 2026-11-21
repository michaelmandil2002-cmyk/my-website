import { memo, useEffect, useState } from 'react';

import { StyledVideo } from '@/components/ui/LazyVideo/LazyVideo.styles';
import { useInView } from '@/hooks/useInView';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export interface LazyVideoProps {
  /** H.264 MP4: plays everywhere, including iPhone and Android. */
  readonly src: string;
  /** Poster image shown before load. Strongly recommended to avoid blank frames. */
  readonly poster?: string;
  readonly width: number;
  readonly height: number;
  /** Decorative background-style video: muted, looped, inline, autoplaying, no controls. */
  readonly ambient?: boolean;
  /** Accessible label (required for non-ambient videos). */
  readonly label?: string;
  readonly className?: string;
}

/**
 * Loads the video only once it first comes near the viewport, then keeps its source for good
 * (removing and re-adding a source leaves iOS Safari with a dead player). Ambient videos play
 * while on screen and pause off screen, with no controls or play button; they never autoplay
 * for reduced-motion users.
 */
function LazyVideoComponent({
  src,
  poster,
  width,
  height,
  ambient = false,
  label,
  className,
}: LazyVideoProps) {
  const [ref, inView] = useInView<HTMLVideoElement>({ once: false, rootMargin: '300px' });
  const [loaded, setLoaded] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const autoplay = ambient && !reducedMotion;

  // Once near the screen, attach the source permanently.
  useEffect(() => {
    if (inView) setLoaded(true);
  }, [inView]);

  // iOS checks the muted *attribute* (React only sets the property) before allowing
  // inline autoplay, so set it on mount, before the source is attached.
  useEffect(() => {
    const video = ref.current;
    if (!video || !ambient) return;
    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute('muted', '');
  }, [ambient, ref]);

  useEffect(() => {
    const video = ref.current;
    if (!video || !autoplay || !loaded) return;
    if (!inView) {
      video.pause();
      return;
    }
    // If the phone blocks autoplay (e.g. iOS Low Power Mode), try again on the visitor's first
    // touch or click anywhere: browsers allow playback once the page has a user gesture.
    const retry = () => {
      video.play().catch(() => {
        /* Still blocked; the poster stays. */
      });
    };
    let active = true;
    video.play().catch(() => {
      if (!active) return;
      document.addEventListener('touchend', retry, { once: true, passive: true });
      document.addEventListener('click', retry, { once: true });
    });
    return () => {
      active = false;
      document.removeEventListener('touchend', retry);
      document.removeEventListener('click', retry);
    };
  }, [inView, autoplay, loaded, ref]);

  return (
    <StyledVideo
      ref={ref}
      className={className}
      src={loaded ? src : undefined}
      poster={poster}
      width={width}
      height={height}
      $ratio={`${width} / ${height}`}
      preload={loaded ? 'auto' : 'none'}
      playsInline
      muted={ambient}
      loop={ambient}
      autoPlay={autoplay}
      controls={!ambient}
      aria-label={label}
      aria-hidden={ambient || undefined}
      $ambient={ambient}
    />
  );
}

export const LazyVideo = memo(LazyVideoComponent);
