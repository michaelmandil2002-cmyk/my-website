const breakpoints = {
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;

export type Breakpoint = keyof typeof breakpoints;

export const theme = {
  /** Cream, pink, cobalt and purple from "The Hecate Kin" reference; magenta deepened for readable buttons. */
  colors: {
    primary: '#c8207a',
    primaryHover: '#a81866',
    onPrimary: '#ffffff',
    text: '#360678',
    textMuted: '#5e4a86',
    /** Large titles: the reference's cobalt blue. */
    heading: '#2442cc',
    background: '#fff6e7',
    backgroundTranslucent: 'rgb(255 246 231 / 0.9)',
    /** Image and video placeholders while loading. */
    surface: '#f6ead6',
    /** Bright pale pink behind the Disney Solitaire and Contact sections. */
    band: '#ffe6eb',
    border: '#f2b4c0',
    focus: '#2442cc',
    overlay: 'rgb(54 6 120 / 0.94)',
  },
  fonts: {
    body: "'Google Sans', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    mono: "ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace",
  },
  fontSizes: {
    xs: '0.8125rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': 'clamp(1.75rem, 3vw + 1rem, 2.75rem)',
    section: 'clamp(2.5rem, 6vw + 1rem, 5rem)',
    display: 'clamp(2.75rem, 10vw, 8.5rem)',
  },
  fontWeights: {
    regular: 400,
    medium: 500,
    bold: 600,
  },
  letterSpacings: {
    /** Body text, buttons, labels. */
    normal: '-0.025em',
    /** Logo and small headings. */
    snug: '-0.035em',
    /** Section and page headings. */
    tight: '-0.05em',
    /** Largest titles. */
    tighter: '-0.06em',
  },
  lineHeights: {
    none: 0.9,
    tight: 1.1,
    base: 1.6,
  },
  space: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '5rem',
    '4xl': '8rem',
  },
  radii: {
    sm: '0.375rem',
    md: '0.75rem',
    lg: '1.25rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px rgb(17 17 17 / 0.06)',
    md: '0 8px 24px rgb(17 17 17 / 0.08)',
  },
  layout: {
    maxWidth: '84rem',
    readingWidth: '42rem',
    headerHeight: '4rem',
  },
  zIndices: {
    header: 100,
    skipLink: 1000,
  },
  transitions: {
    fast: '150ms ease',
    base: '300ms ease',
  },
  breakpoints,
} as const;

export type AppTheme = typeof theme;
