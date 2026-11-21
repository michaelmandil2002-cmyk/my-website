/** Paths are relative to /public; wrap them with `asset()` before use. */
export interface MediaImage {
  readonly src: string;
  readonly width: number;
  readonly height: number;
  /** Smaller copy for srcset on narrow screens. */
  readonly small?: { readonly src: string; readonly width: number };
}

export interface MediaVideo {
  readonly src: string;
  readonly poster: string;
  readonly width: number;
  readonly height: number;
}

export type ProjectBlock =
  | { readonly kind: 'heading'; readonly text: string }
  | { readonly kind: 'text'; readonly text: string }
  | { readonly kind: 'image'; readonly image: MediaImage };

export type ProjectCategory =
  'UX / UI' | 'Branding' | 'Illustration' | 'Social Media' | 'Graphic Design';

export interface Project {
  readonly slug: string;
  readonly title: string;
  readonly category: ProjectCategory;
  readonly summary: string;
  /** Optional one line shown on the Work card. */
  readonly blurb?: string;
  readonly cover?: MediaImage;
  readonly blocks: readonly ProjectBlock[];
}
