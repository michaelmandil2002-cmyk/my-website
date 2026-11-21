export const SITE = {
  name: 'My Website',
  tagline: 'A fast, accessible starting point.',
} as const;

export interface NavLink {
  readonly label: string;
  readonly href: string;
}

export const NAV_LINKS: readonly NavLink[] = [
  { label: 'Home', href: '#top' },
  { label: 'Features', href: '#features' },
  { label: 'Contact', href: '#contact' },
];
