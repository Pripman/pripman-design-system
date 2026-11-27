# @pripman/design-system

The shared design system for the apps on the pripman domain. It uses the looper palette (signal red, cool greys, accent
green, amber digital readouts), adds **oak wood** for panels and frames, and is dark by default with a light theme.

One package, three layers, one source of truth (the design tokens):

| Import | What |
| --- | --- |
| `@pripman/design-system/css` | Everything for CSS users: tokens + base + `.pds-*` components |
| `@pripman/design-system/tokens.css` | Only the CSS custom properties (`--pds-*`) |
| `@pripman/design-system/components.css` | Base + components without tokens |
| `@pripman/design-system/tailwind.css` | Tailwind v4 `@theme` mapping (`bg-surface`, `text-fg`, `bg-pds-oak-500` …) |
| `@pripman/design-system/tokens` | Resolved token values for JS/TS, plus `cssVar()` |
| `@pripman/design-system/tokens.json` | Flat token list with metadata |
| `@pripman/design-system/react` | React components (React 18+, ESM + CJS, typed, `"use client"`) |

Storybook showcase: `http://<server>:8075` (the `design-system` service in the omv-docker stack).

## Usage

```sh
npm install @pripman/design-system
```

**React / Next.js**

```tsx
// app/layout.tsx
import '@pripman/design-system/css';

// anywhere
import { Button, Card, CardBody } from '@pripman/design-system/react';

<Card variant="oak">
  <CardBody>
    <Button variant="primary">Record</Button>
  </CardBody>
</Card>;
```

**Tailwind v4** (e.g. budget_app)

```css
@import 'tailwindcss';
@import '@pripman/design-system/css';
@import '@pripman/design-system/tailwind.css';
```

**Plain HTML**

```html
<link rel="stylesheet" href="/node_modules/@pripman/design-system/dist/pds.css" />
<button class="pds-button pds-button--primary">Record</button>
```

**JS values** (e.g. drawing a waveform on a canvas)

```ts
import { themes, cssVar } from '@pripman/design-system/tokens';
ctx.strokeStyle = themes.dark.color.accent; // '#70b92f'
element.style.color = cssVar('color.oak.500'); // 'var(--pds-color-oak-500)'
```

**Themes.** Dark is the default. Put `data-theme="light"` on `<html>` or on any subtree to switch.

**Overriding.** Component CSS lives in the cascade layers `pds.base` and `pds.components`, so unlayered app CSS always
wins. To re-theme, override semantic tokens such as `--pds-color-primary`.

**Fonts.** The system uses Roboto and Roboto Mono, but doesn't bundle them. Load them in the app, for example with
`next/font/google` or `@fontsource/roboto`.

## Components (v0.1)

Button, Card (+ Header/Title/Body/Footer), TextField, TextArea, Select, Checkbox, Switch, Dialog (native `<dialog>`),
Tabs, Badge, Spinner, DigitalDisplay, Stack. Every component exists as plain CSS classes. The React components only render those
classes, so HTML and React output look identical.

## Development

```sh
npm install
npm run storybook        # http://localhost:6006
npm test                 # tokens (incl. WCAG contrast checks) + React components
npm run typecheck
npm run build            # dist/: tokens, CSS, React
```

```
tokens/primitive/*.json    raw palette, spacing, type, effects (DTCG format: $value/$type)
tokens/semantic/<theme>.json  semantic tokens per theme; may only reference primitives
src/css/                   base.css + components/*.css (use only var(--pds-*))
src/react/                 React components
scripts/                   build-tokens.mjs, build-css.mjs
stories/                   Storybook
```

**Adding a token.** Edit the JSON. Every theme must define the same semantic tokens, or the build fails. New
foreground/background pairs belong in the contrast checks in `tests/tokens.test.ts`.

**Adding a component.** Add `src/css/components/<name>.css`, a React wrapper in `src/react/`, export it from
`src/react/index.ts`, and add tests and a story with a "Plain HTML / CSS" variant.

## Releasing

Releases are published to npm by GitHub Actions (`.github/workflows/release.yml`) when a `v*` tag is pushed:

```sh
npm version minor        # or patch / major; bumps package.json and creates the tag
git push --follow-tags
```

The workflow checks that the tag matches `package.json`, runs the type check, tests and build, and publishes with
provenance. Authentication uses npm trusted publishing (OIDC), configured on npmjs.com for this repository and
`release.yml`. No npm token is stored anywhere. Renaming the workflow file breaks publishing until the trusted
publisher on npmjs.com is updated to match.

## License

MIT
