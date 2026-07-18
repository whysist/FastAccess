---
name: FastAccess Next.js setup
description: Key constraints and decisions for the FastAccess Next.js 14 app in artifacts/fast-access
---

## Rules

- **next.config must be `.mjs`** — Next.js 14 rejects `next.config.ts` at runtime with a hard error. Always use `next.config.mjs` (ESM, no TypeScript).
- **React 18 pinned** — workspace catalog uses React 19; Next.js 14 officially targets React 18. `package.json` overrides with `react@18.3.1` and `react-dom@18.3.1`.
- **Tailwind v3, not v4** — Tailwind v4 has a different config format. v3 used here with `tailwind.config.ts` + `postcss.config.mjs` + `autoprefixer`.
- **No UI library** — All components are plain HTML + Tailwind. No radix, shadcn, lucide, or any other component library. Inline SVG icons only.
- **Self-contained** — All API routes live in `src/app/api/*/route.ts`. The `artifacts/api-server` is NOT used by this app.
- **Design tokens** — Custom Tailwind colors: `fa-bg`, `fa-ink`, `fa-route` (#1A4D8F), `fa-calm` (#2F6B5E), `fa-caution` (#C77D22), `fa-border` (#E4E1DC). Fonts: Atkinson Hyperlegible (body), IBM Plex Mono (numbers).
- **Accessibility rules** — 3px solid #1A4D8F focus rings; no border-radius > 4px; icon+text label on every color-coded element; `prefers-reduced-motion` in globals.css; `aria-live="polite"` on directions.
- **No database** — All venue data is hardcoded in `src/lib/venue/graph.ts` (28 nodes) and `src/lib/sensory/schedule.ts`.

**Why:** User explicitly rejected the original React+Vite build and demanded a "real Next.js 14 App Router single app, no database, no UI toolkits."

**How to apply:** Any future changes to this app must preserve these constraints. If adding features, keep API routes inside `src/app/api/`, keep all components Tailwind-only, and keep React pinned at 18.
