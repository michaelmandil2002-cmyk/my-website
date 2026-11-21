import { theme, type Breakpoint } from '@/styles/theme';

/**
 * Mobile-first media query helpers: `${media.md} { ... }` applies at >= md.
 */
export const media = Object.fromEntries(
  Object.entries(theme.breakpoints).map(([key, px]) => [key, `@media (min-width: ${px}px)`]),
) as Record<Breakpoint, string>;
