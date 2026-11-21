import { useSyncExternalStore } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

function subscribe(callback: () => void): () => void {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener('change', callback);
  return () => {
    mql.removeEventListener('change', callback);
  };
}

const getSnapshot = (): boolean => window.matchMedia(QUERY).matches;
const getServerSnapshot = (): boolean => false;

export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
