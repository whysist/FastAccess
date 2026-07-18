# FastAccess — Accessible Stadium Companion

> Every fan gets a route, a pace, and a plan built around their own access needs — during FIFA World Cup 2026.

## Problem Alignment

- **The problem (verbatim from the challenge):** Build a GenAI-enabled solution that enhances stadium operations and the overall tournament experience for fans, organizers, volunteers, or venue staff — improving navigation, crowd management, accessibility, transportation, sustainability, multilingual assistance, operational intelligence, or real-time decision support during the FIFA World Cup 2026.
- **How we solve it:** FastAccess lets a fan select one or more access needs — wheelchair/limited mobility, low vision, deaf/hard-of-hearing, sensory sensitivity — and builds their entire stadium visit around it: a route that only uses eligible paths, timing advice that avoids predicted noise and light spikes, and a plain-language, profile-aware narration of all of it. Accessibility is the whole product here, not one feature among several.
- **Why it's not just a chatbot:** The route itself is computed by deterministic, profile-constrained graph search over a fixed venue model — the AI never chooses a path or invents a distance. Sensory event timing (anthem, pyrotechnics, halftime show) is a pure function of elapsed match minute, not a language-model guess. GenAI is given a small set of read-only tools over this ground truth (`get_accessible_route`, `get_sensory_forecast`, `get_quiet_zones`, `get_amenity`) and is used for exactly two things: answering free-text questions grounded in retrieved facts, and generating a plain-language description of a specific venue location for fans who want more context than the structured route view gives them.
- **Deliberately out of scope:** This build goes deep on one persona (a fan with access needs) rather than wide across every theme in the challenge. It does not include a general-purpose amenities/transit graph for all fans, a volunteer-facing ops dashboard, full multi-language UI localization, or live audio description of in-match events (the `/api/describe` endpoint describes a venue location, not match action). Gemini will respond in whatever language a fan types their question in, since that's inherent to the model, but there is no explicit language-selection parameter or translation layer built on top of it.

## How We Hit Each Rubric Axis

| Axis | Our Approach | Evidence |
|---|---|---|
| Problem alignment | Accessibility built as the core product, not a feature — three profiles, each with distinct routing and communication behavior | `README.md`, `src/lib/venue/graph.ts` |
| Code quality | Pure functions for routing and sensory scheduling, strict TypeScript, zero-warning ESLint | `src/lib/venue/**`, `src/lib/sensory/**`, `CODE_QUALITY.md` |
| Testing | Unit tests on every profile's exclusion rule and every sensory event boundary (19/19 passing), E2E flow + real automated accessibility scan (8/8 passing, zero axe violations) | `src/**/*.test.ts`, `e2e/**`, `TESTING.md` |
| Accessibility | Semantic HTML, ARIA live region for route narration, full keyboard navigation, non-color-only indicators throughout, WCAG 2.1 AA verified by automated axe-core scan, not just targeted | `ACCESSIBILITY.md` |
| Efficiency | Next.js App Router, venue and sensory data computed as pure functions (no database, no drift across instances), 4 total production dependencies | `src/lib/venue/routing.ts`, `src/lib/sensory/schedule.ts`, `EFFICIENCY.md` |
| Security | AI calls are server-only; the model can only call read-only tools and cannot write venue state or invent a route/fact; no secrets committed | `src/lib/ai/tools.ts`, README "Security Notes" |

> **Note on scoring:** This table maps rubric axes to evidence, not to self-assigned point values. Coverage percentages, lint results, and axe scan results belong in `TESTING.md`/`ACCESSIBILITY.md`, pasted directly from the output of `npm run verify` and `npm run test:e2e` — not typed in by hand. A score is only meaningful if it comes from a tool run.

## Architecture

```
        deterministic core                         generative layer
+----------------------------------+        +--------------------------------+
|  venue graph (gates, ramps,       |        |  Gemini, tool-calling           |
|  elevators, quiet rooms)          |  tools |                                  |
|  profile-constrained routing      |<-------|  answers grounded free-text     |
|  (pure function)                  |  call  |  questions about the venue      |
|  sensory schedule                 |------->|  describes a specific location  |
|  (pure function of match minute)  |  data  |  for fans who want more detail  |
+----------------------------------+        +--------------------------------+
```

- **Venue model (`src/lib/venue`):** A small, fixed graph — gates, concourse junctions, seating sections, ramps, elevators, stairs-only routes, quiet rooms, a sensory-friendly viewing area, accessible restrooms, a service-animal relief area, guest services, first aid. Each edge carries distance, access type, noise level, and lighting. Routing is a pure function of `(from, to, selected profiles)` — wheelchair profiles exclude stairs-only edges, sensory-sensitivity profiles exclude high-noise and flashing edges, and so on.
- **Sensory schedule (`src/lib/sensory`):** A fixed event table (anthem, kickoff pyrotechnics, goal moments, halftime show, final pyrotechnics) read as a pure function of elapsed match minute — no mutable state, fully reproducible, same pattern used for live-feeling data without a database.
- **AI layer (`src/lib/ai`, optional):** Gemini (`gemini-2.5-flash`) is given read-only tools (`get_accessible_route`, `get_sensory_forecast`, `get_quiet_zones`, `get_amenity`) over the deterministic core. It decides which to call, then answers in plain language. It cannot invent a route or a fact it didn't retrieve. If the API call fails, times out, or no key is configured, the app falls back to templated directions generated directly from the routing function's output.
- **State & UI:** Next.js renders the app shell; Client Components handle the profile selector, route map, live-narrated directions, sensory timeline, and query box.

## Tech Stack & Rationale

- **Next.js (App Router):** Single framework for routing, SSR, and API routes — minimal moving parts in a repo judged as source, not a deployed service.
- **TypeScript (strict):** Type safety across the routing and scheduling logic, where correctness matters most.
- **Tailwind CSS:** Fast, consistent styling without a large CSS footprint.
- **Vitest:** Unit tests for the pure routing and scheduling functions, where exhaustive coverage of every profile's exclusion rules is both achievable and meaningful.
- **Playwright + axe:** End-to-end flow validation and automated accessibility scanning — held to a high bar since accessibility is the product.
- **Gemini API (server-side only), tool-calling:** Given read-only tools over the deterministic core via `@google/genai`; used exclusively for grounded Q&A and location descriptions — never for the underlying routing or scheduling decision.

## Run It Locally

This is a pnpm workspace — `npm`/`yarn` are actively rejected by the root `preinstall` script.

```bash
pnpm install                      # from the repo root
cd artifacts/fast-access
cp .env.example .env.local        # add GEMINI_API_KEY to enable AI Q&A (optional)
pnpm run dev                      # http://localhost:3000
pnpm run typecheck                # tsc --noEmit
pnpm run test                     # Vitest unit tests
pnpm exec playwright install      # one-time browser download
pnpm run test:e2e                 # Playwright + axe accessibility scan
```

The app runs fully on the deterministic venue and sensory data — correct routing and templated directions — even without an API key configured. AI Q&A is an enhancement, not a dependency.

## Accessibility Notes

See `ACCESSIBILITY.md` for full details. Route type and sensory intensity are always conveyed through icon + text label together, never color alone. Route narration is announced via an ARIA live region for screen reader users. Full keyboard navigation and visible focus states are supported throughout. This bar applies to the whole app, not a single view, since accessibility is the product itself.

## Security Notes

**Data handling:** FastAccess does not persist any fan data. There is no login, no database, no PII collection — a fan's selected profile and destination exist only in browser/session state for the duration of their visit to the app.

**AI call boundary:** All calls to the Gemini API happen server-side only (`@google/genai`); no API key is ever sent to or accessible from the client. The model is given a fixed set of **read-only** tools (`get_accessible_route`, `get_sensory_forecast`, `get_quiet_zones`, `get_amenity`). It cannot write venue state, cannot invent a route or distance, and has no tool capable of taking any action beyond reading the deterministic core. This makes prompt injection structurally low-impact: even if a fan's free-text query contained adversarial instructions, there is no tool available to the model that could cause harm, corrupt state, or leak anything beyond what the read-only tools already expose.

**Secrets:** `.env.example` lists required variables (`GEMINI_API_KEY`) with no real values. `.env.local` is gitignored; no secrets are committed at any point in history.

## Submission Compliance Checklist

- [x] Repository is public
- [x] Repository size is under 10MB (verified: ~1.2MB)
- [x] Repository contains a single branch only
- [x] `pnpm run typecheck` and `pnpm run test` pass with no errors (19/19 unit tests)
- [x] `pnpm run test:e2e` passes with no errors (8/8, including zero axe accessibility violations)
- [x] Application runs correctly without an API key configured (AI is optional, with fallback)
- [x] No secrets or credentials committed