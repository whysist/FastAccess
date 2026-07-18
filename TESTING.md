# Testing

## Strategy
- **Unit tests (Vitest):** Exhaustive coverage of the deterministic core — every access profile's exclusion rule in `src/lib/venue/routing.ts` (e.g., wheelchair profile must never return a path containing a `stairs-only` edge), and every boundary in `src/lib/sensory/schedule.ts` (event start/end minutes, intensity transitions).
- **AI fallback tests:** The AI layer (`src/lib/ai`) is tested for its *fallback behavior* — what happens when the Claude API call fails, times out, or no key is configured — not for exact AI output text, since that is inherently non-deterministic and asserting on it would be false rigor.
- **E2E (Playwright):** Core flow — select a profile, request a route, see a rendered path and narrated directions.
- **Accessibility scan:** `axe-core` run against every page as part of the E2E suite.

## Commands
```bash
npm run test           # unit tests
npm run test:coverage  # unit tests with coverage report
npm run test:e2e       # Playwright + axe accessibility scan
npm run verify          # lint + typecheck + test:coverage + build, all in one
```

## Results
_To be filled in from the actual output of the commands above before submission — paste the real test count and coverage percentage here, not a hand-typed estimate._   