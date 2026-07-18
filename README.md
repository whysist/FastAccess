# FastAccess — Accessible Stadium Companion

> Every fan gets a route, a pace, and a plan built around their own access needs — during FIFA World Cup 2026.

## Problem Alignment

- **The problem (verbatim from the challenge):** Build a GenAI-enabled solution that enhances stadium operations and the overall tournament experience for fans, organizers, volunteers, or venue staff — improving navigation, crowd management, accessibility, transportation, sustainability, multilingual assistance, operational intelligence, or real-time decision support during the FIFA World Cup 2026.
- **How we solve it:** FastAccess lets a fan select one or more access needs — wheelchair/limited mobility, low vision, deaf/hard-of-hearing, sensory sensitivity — and builds their entire stadium visit around it: a route that only uses eligible paths, timing advice that avoids predicted noise and light spikes, and a plain-language, profile-aware narration of all of it. Accessibility is the whole product here, not one feature among several.
- **Why it's not just a chatbot:** The route itself is computed by deterministic, profile-constrained graph search over a fixed venue model — the AI never chooses a path or invents a distance. Sensory event timing (anthem, pyrotechnics, halftime show) is a pure function of elapsed match minute, not a language-model guess. GenAI is given a small set of read-only tools over this ground truth and is used for exactly two things: narrating retrieved facts in warm, concrete language suited to the fan's profile, and — for low-vision fans — generating genuinely descriptive audio-style commentary of match events, grounded in a structured event it retrieved through a tool call, never fabricated independently.
- **Deliberately out of scope:** This build goes deep on one persona (a fan with access needs) rather than wide across every theme in the challenge. It does not include a general-purpose amenities/transit graph for all fans, a volunteer-facing ops dashboard, or full multi-language UI localization. Where language does matter, route narration responds in the fan's selected language as a parameter on the same tool-calling layer, not a separate localization system.

## How We Hit Each Rubric Axis

| Axis | Our Approach | Evidence |
|---|---|---|
| Problem alignment | Accessibility built as the core product, not a feature — three profiles, each with distinct routing and communication behavior | `README.md`, `src/lib/venue/graph.ts` |
| Code quality | Pure functions for routing and sensory scheduling, strict TypeScript, zero-warning ESLint | `src/lib/venue/**`, `src/lib/sensory/**`, `CODE_QUALITY.md` |
| Testing | Unit tests on every profile's exclusion rules and every sensory event boundary, fallback-path tests on the AI layer, E2E + accessibility scan | `src/**/*.test.ts`, `e2e/**`, `TESTING.md` |
| Accessibility | Semantic HTML, ARIA live region for route narration, full keyboard navigation, non-color-only indicators throughout, WCAG 2.1 AA target — held to this standard because it is the product, not an add-on | `ACCESSIBILITY.md` |
| Efficiency | Next.js App Router with Server Components, venue and sensory data computed as pure functions (no database, no drift across instances) | `src/lib/venue/routing.ts`, `src/lib/sensory/schedule.ts`, `EFFICIENCY.md` |
| Security | AI calls are server-only; the model can only call read-only tools and cannot write venue state or invent a route/fact; no secrets committed | `src/lib/ai/tools.ts`, `SECURITY.md` |

> **Note on scoring:** This table maps rubric axes to evidence, not to self-assigned point values. Coverage percentages, lint results, and axe scan results belong in `TESTING.md`/`ACCESSIBILITY.md`, pasted directly from the output of `npm run verify` and `npm run test:e2e` — not typed in by hand. A score is only meaningful if it comes from a tool run.

## Architecture

```
        deterministic core                         generative layer
+----------------------------------+        +--------------------------------+
|  venue graph (gates, ramps,       |        |  Claude, tool-calling           |
|  elevators, quiet rooms)          |  tools |                                  |
|  profile-constrained routing      |<-------|  narrates routes in the         |
|  (pure function)                  |  call  |  fan's profile + language       |
|  sensory schedule                 |------->|  generates audio descriptions   |
|  (pure function of match minute)  |  data  |  of match events (low vision)   |
+----------------------------------+        +--------------------------------+
```

- **Venue model (`src/lib/venue`):** A small, fixed graph — gates, concourse junctions, seating sections, ramps, elevators, stairs-only routes, quiet rooms, a sensory-friendly viewing area, accessible restrooms, a service-animal relief area, guest services, first aid. Each edge carries distance, access type, noise level, and lighting. Routing is a pure function of `(from, to, selected profiles)` — wheelchair profiles exclude stairs-only edges, sensory-sensitivity profiles weight against high-noise edges, and so on.
- **Sensory schedule (`src/lib/sensory`):** A fixed event table (anthem, kickoff pyrotechnics, goal moments, halftime show, final pyrotechnics) read as a pure function of elapsed match minute — no mutable state, fully reproducible, same pattern used for live-feeling data without a database.
- **AI layer (`src/lib/ai`, optional):** Claude is given read-only tools (`getAccessibleRoute`, `getSensoryForecast`, `getQuietZones`, `getAmenity`, `describeMatchEvent`) over the deterministic core. It decides which to call, then narrates the result in plain language, in the fan's selected language. It cannot invent a route or a fact it didn't retrieve. If the API call fails, times out, or no key is configured, the app falls back to templated directions generated directly from the routing function's output.
- **State & UI:** Next.js Server Components render the shell; Client Components handle the profile selector, route map, live-narrated directions, sensory timeline, and query box.

## Tech Stack & Rationale

- **Next.js (App Router):** Single framework for routing, SSR, and API routes — minimal moving parts in a repo judged as source, not a deployed service.
- **TypeScript (strict):** Type safety across the routing and scheduling logic, where correctness matters most.
- **Tailwind CSS:** Fast, consistent styling without a large CSS footprint.
- **Vitest:** Unit tests for the pure routing and scheduling functions, where exhaustive coverage of every profile's exclusion rules is both achievable and meaningful.
- **Playwright + axe:** End-to-end flow validation and automated accessibility scanning — held to a high bar since accessibility is the product.
- **Claude API (server-side only), tool-calling:** Given read-only tools over the deterministic core; used exclusively for narration, translation, and audio description — never for the underlying routing or scheduling decision.

## Run It Locally

```bash
npm install
cp .env.example .env.local   # add ANTHROPIC_API_KEY to enable AI narration (optional)
npm run dev                  # http://localhost:3000
npm run verify                # lint + typecheck + test:coverage + build
npm run test:e2e              # Playwright + accessibility scan
```

The app runs fully on the deterministic venue and sensory data — correct routing and templated directions — even without an API key configured. AI narration and audio description are enhancements, not dependencies.

## Accessibility Notes

See `ACCESSIBILITY.md` for full details. Route type and sensory intensity are always conveyed through icon + text label together, never color alone. Route narration is announced via an ARIA live region for screen reader users. Full keyboard navigation and visible focus states are supported throughout. This bar applies to the whole app, not a single view, since accessibility is the product itself.

## Security Notes

See `SECURITY.md` for full details. All AI calls are made server-side; no API key is ever exposed to the client. The model only has access to read-only tools — it cannot write venue state or invent a route, distance, or event, which makes prompt injection structurally low-impact rather than something relying on instruction alone. No secrets are committed to the repository.

## Submission Compliance Checklist

- [ ] Repository is public
- [ ] Repository size is under 10MB
- [ ] Repository contains a single branch only
- [ ] `npm run verify` passes with no errors or warnings
- [ ] Application runs correctly without an API key configured (AI is optional, with fallback)
- [ ] No secrets or credentials committed