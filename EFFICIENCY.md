# Efficiency

## Design choices
- Next.js App Router; Client Components only where interactivity is required (profile selector, route planning, query box).
- Venue and sensory data are pure functions evaluated on demand — no database round-trips, no persistent connections, and no state that can drift between server instances.
- No AI calls happen client-side; the client only ever talks to this app's own API routes.
- Minimal dependency footprint: 4 production dependencies total (`next`, `react`, `react-dom`, `@google/genai`).

