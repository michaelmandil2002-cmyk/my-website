const breakpoints = {
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;

export type Breakpoint = keyof typeof breakpoints;

export const theme = {
  colors: {
    primary: '#4f46e5',
    primaryHover: '#4338ca',
    onPrimary: '#ffffff',
    text: '#0f172a',
    textMuted: '#475569',
    background: '#ffffff',
    surface: '#f8fafc',
    border: '#e2e8f0',
    focus: '#f59e0b',
  },
  fonts: {
    body: "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    mono: "ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace",
  },
  fontSizes: {
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    display: 'clamp(2.25rem, 5vw + 1rem, 3.75rem)',
  },
  fontWeights: {
    regular: 400,
    medium: 500,
    bold: 700,
  },
  lineHeights: {
    tight: 1.15,
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
  },
  radii: {
    sm: '0.375rem',
    md: '0.75rem',
    lg: '1.25rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px rgb(15 23 42 / 0.06)',
    md: '0 4px 16px rgb(15 23 42 / 0.08)',
  },
  layout: {
    maxWidth: '72rem',
    headerHeight: '4rem',
  },
  zIndices: {
    header: 100,
    skipLink: 1000,
  },
  transitions: {
    fast: '150ms ease',
  },
  breakpoints,
} as const;

export type AppTheme = typeof theme;
