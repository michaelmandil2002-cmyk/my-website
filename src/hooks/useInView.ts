import { useEffect, useRef, useState, type RefObject } from 'react';

interface UseInViewOptions {
  /** Start loading slightly before the element enters the viewport. */
  readonly rootMargin?: string;
  readonly threshold?: number;
  /** Stop observing after the first intersection (default: true). */
  readonly once?: boolean;
}

/**
 * Tracks whether an element is visible using a single IntersectionObserver.
 * Only triggers a re-render when visibility actually changes.
 */
export function useInView<T extends Element>({
  rootMargin = '200px',
  threshold = 0,
  once = true,
}: UseInViewOptions = {}): [RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        setInView(entry.isIntersecting);
        if (entry.isIntersecting && once) observer.disconnect();
      },
      { rootMargin, threshold },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
    };
  }, [rootMargin, threshold, once]);

  return [ref, inView];
}
