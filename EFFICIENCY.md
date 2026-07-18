# Efficiency

## Design choices
- Next.js Server Components by default; Client Components only where interactivity is required (profile selector, route narration, query box).
- Venue and sensory data are pure functions evaluated on demand — no database round-trips, no persistent connections, and no state that can drift between server instances.
- No AI calls happen client-side; the client only ever talks to this app's own API routes.
- Minimal dependency footprint keeps bundle size and cold-start time low.

## Results
_To be filled in before submission: Lighthouse performance score (if measured) and any notable bundle-size figures from the production build._