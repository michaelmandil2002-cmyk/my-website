# My Website

React 19 + TypeScript (strict) + Vite 7 + styled-components 6.

## Scripts

| Command           | Purpose                            |
| ----------------- | ---------------------------------- |
| `npm run dev`     | Start dev server                   |
| `npm run build`   | Type-check and build to `dist/`    |
| `npm run preview` | Serve the production build locally |
| `npm run lint`    | ESLint (type-aware, a11y, hooks)   |
| `npm run format`  | Prettier                           |

## Structure

```
src/
  components/
    layout/   Header, Footer, MainLayout
    ui/       Button, Card, Container, ResponsiveImage, LazyVideo, SkipLink
  sections/   Page sections (Hero, Features)
  hooks/      useInView, usePrefersReducedMotion
  styles/     theme, GlobalStyle, media queries, theme typings
  constants/  Site metadata and navigation
```

Each component has a `Name.tsx` and a `Name.styles.ts`. Import with the `@/` alias (`@/components/ui`).

## Media

- **Images:** use `<ResponsiveImage>` with `width`/`height` (prevents layout shift). Pass AVIF/WebP via `sources`
  and `srcSet`/`sizes` for responsive variants. Set `priority` only on the above-the-fold (LCP) image.
- **Video:** use `<LazyVideo>`. It loads nothing until near the viewport (`preload="none"`), always pass a `poster`,
  and use `ambient` for muted looping background clips (paused off-screen, disabled for reduced motion).
- Put static media in `public/` and reference it via `` `${import.meta.env.BASE_URL}path` `` so it works on GitHub Pages.

## Deploying to GitHub Pages

1. Push to a GitHub repo on `main`.
2. In **Settings → Pages**, set the source to **GitHub Actions**.
3. `.github/workflows/deploy.yml` builds with `BASE_PATH=/<repo>/`. For a user site or custom domain, change it to `/`.
