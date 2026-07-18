# Testing

## Strategy
- **Unit tests (Vitest):** Exhaustive coverage of the deterministic core — every access profile's exclusion rule in `src/lib/venue/routing.ts` (e.g., wheelchair profile must never return a path containing a `stairs-only` edge), and every boundary in `src/lib/sensory/schedule.ts` (event start/end minutes, intensity transitions).
- **E2E (Playwright):** Core flow — masthead renders, default profile selection, toggling profiles, route planning end to end, keyboard focus visibility.
- **Accessibility scan:** `axe-core` run via `@axe-core/playwright`, both on initial load and after interacting with the app (selecting a profile, planning a route) — not just a single static snapshot.

## Commands
```bash
cd artifacts/fast-access
pnpm run test           # unit tests
pnpm run test:e2e       # Playwright E2E + axe accessibility scan
```

## Results

**Unit tests: 19/19 passing**
- `src/lib/venue/routing.test.ts` — 10 tests (every profile's exclusion rule, combined-profile intersection, unreachable-destination handling, same-start-and-end edge case)
- `src/lib/sensory/schedule.test.ts` — 9 tests (event window boundaries, sort order, empty-range handling)

**E2E: 8/8 passing**
- `profile-route.spec.ts` — 6 tests (masthead, default profile, toggling, initial route render, plan-route flow, focus-visible check)
- `accessibility.spec.ts` — 2 tests, **zero axe violations**, both on initial load and after selecting a profile and planning a route

The accessibility scan is not a first-try pass — three real `color-contrast` violations were found and fixed during development: two Tailwind opacity-diluted text tokens that fell below WCAG AA (a widespread pattern, standardized to a single solid `fa-ink-muted` token across all seven components plus the masthead), and one hardcoded hex color inside `RouteMap.tsx`'s legend that had been duplicated outside the Tailwind token system and so wasn't touched by the first round of fixes. Each fix was re-verified by re-running the actual scan, not assumed from the color math alone.

