# Efficiency

## Design choices
- Next.js App Router; Client Components only where interactivity is required (profile selector, route planning, query box).
- Venue and sensory data are pure functions evaluated on demand — no database round-trips, no persistent connections, and no state that can drift between server instances.
- No AI calls happen client-side; the client only ever talks to this app's own API routes.
- Minimal dependency footprint: 4 production dependencies total (`next`, `react`, `react-dom`, `@google/genai`).

## Results

**Lighthouse, run against the live production deployment (Chrome DevTools):**

| Category | Score |
|---|---|
| Performance | 100 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

Measured against the real deployed app, not a local dev build.