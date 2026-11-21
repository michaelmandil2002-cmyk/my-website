export const SITE = {
  name: 'Michael Mandil',
  role: 'Graphic Designer & Illustrator',
  email: 'michaelmandil2002@gmail.com',
} as const;

export interface NavLink {
  readonly label: string;
  readonly href: string;
}

export const NAV_LINKS: readonly NavLink[] = [
  { label: 'Disney Solitaire', href: '#superplay' },
  { label: 'Work', href: '#work' },
  { label: 'Career', href: '#career' },
  { label: 'Contact', href: '#contact' },
];

export const SOCIAL_LINKS: readonly NavLink[] = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/michael-mandil/' },
];

/** Builds a URL for a file in /public that works under the GitHub Pages base path. */
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;
