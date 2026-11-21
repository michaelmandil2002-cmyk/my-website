# My Website

React 19 + TypeScript (strict) + Vite 7 + styled-components 6.

## Scripts

| Command           | Purpose                             |
| ----------------- | ----------------------------------- |
| `npm run dev`     | Start dev server                    |
| `npm run build`   | Type-check and build to `dist/`     |
| `npm run preview` | Serve the production build locally  |
| `npm run lint`    | ESLint (type-aware, a11y, hooks)    |
| `npm run format`  | Prettier                            |
| `npm run verify`  | Everything below, before publishing |
| `npm test`        | Unit + end-to-end tests             |

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

## Testing

- `npm run test:unit` — Vitest. Checks every image and video in `src/data` exists in `public/`.
- `npm run test:e2e` — Playwright. Builds the site with the GitHub Pages base path (`/my-website/`),
  serves the production build and tests it in Chromium at desktop and phone size: no 404s, no console
  errors, no horizontal scroll, every project page opens. First run: `npx playwright install chromium`.
- `npm run check:live` / `npm run test:e2e:live` — the same checks against the deployed site.

CI runs lint, format check, unit and e2e tests on every push and pull request; it deploys only from
`main` when they pass, then checks the live URL.

## Deploying to GitHub Pages

1. Push to a GitHub repo on `main`.
2. In **Settings → Pages**, set the source to **GitHub Actions**.
3. `.github/workflows/deploy.yml` builds with `BASE_PATH=/<repo>/`. For a user site or custom domain, change it to `/`.
