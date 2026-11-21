import { createGlobalStyle } from 'styled-components';

/** A black dot with a thin white ring (so it stays visible on black areas and videos). */
const circleCursor = (size: number) => {
  const r = size / 2;
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${String(size)}' height='${String(size)}'><circle cx='${String(r)}' cy='${String(r)}' r='${String(r - 1)}' fill='#111111' stroke='#ffffff' stroke-width='1.5'/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}") ${String(r)} ${String(r)}`;
};

export const GlobalStyle = createGlobalStyle`
  /* Mouse users get a black circle cursor; it grows over anything clickable. */
  @media (hover: hover) and (pointer: fine) {
    html {
      cursor: ${circleCursor(16)}, auto;
    }

    a,
    button,
    [role='button'],
    label,
    select,
    summary {
      cursor: ${circleCursor(28)}, pointer !important;
    }
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  * {
    margin: 0;
  }

  html {
    -webkit-text-size-adjust: 100%;
    text-size-adjust: 100%;
    scroll-padding-top: ${({ theme }) => theme.layout.headerHeight};
  }

  @media (prefers-reduced-motion: no-preference) {
    html {
      scroll-behavior: smooth;
    }
  }

  body {
    min-height: 100dvh;
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: ${({ theme }) => theme.fontSizes.base};
    line-height: ${({ theme }) => theme.lineHeights.base};
    letter-spacing: ${({ theme }) => theme.letterSpacings.normal};
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.background};
    -webkit-font-smoothing: antialiased;
    overflow-x: clip;
  }

  ::selection {
    color: ${({ theme }) => theme.colors.onPrimary};
    background-color: ${({ theme }) => theme.colors.text};
  }

  img,
  picture,
  video,
  canvas,
  svg {
    display: block;
    max-width: 100%;
    height: auto;
  }

  input,
  button,
  textarea,
  select {
    font: inherit;
    letter-spacing: inherit;
  }

  h1,
  h2,
  h3,
  h4 {
    line-height: ${({ theme }) => theme.lineHeights.tight};
    text-wrap: balance;
  }

  p {
    text-wrap: pretty;
  }

  a {
    color: inherit;
  }

  :focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;
