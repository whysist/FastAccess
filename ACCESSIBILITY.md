# Accessibility

Accessibility is the core product of FastAccess, not a bolt-on feature, so it is held to the same bar throughout the whole app rather than checked once at the end.

## Standard
Targeting WCAG 2.1 AA across all views.

## Principles enforced in code
- Route type and sensory intensity are always conveyed through icon + text label together — never color alone.
- Route errors (no accessible route found for the selected profiles) are surfaced explicitly via `role="alert"`, not silently dropped.
- Full keyboard navigation: every interactive element (profile selector, route planning controls, query box) is reachable and operable via keyboard, with a visible focus state.
- `prefers-reduced-motion` is respected for any transition or animation.
- Color contrast meets AA minimums — verified by an automated scan, not just chosen by eye.

## Testing method
- **Automated:** `axe-core` (via `@axe-core/playwright`) run against the live app in `e2e/accessibility.spec.ts`, both on initial load and after interacting with the app (selecting a profile, planning a route).
- **Manual:** keyboard-only walkthrough of the profile selection → route planning flow.

## Results

**Zero axe violations**, confirmed by running `pnpm run test:e2e` directly — not asserted from design intent alone.

Getting there took real debugging, worth documenting honestly rather than presenting as a first-try pass:

1. **First scan** found `color-contrast` failures across nearly every muted-text element in the app (headings, captions, distance labels, timeline warnings) — all tracing to two design tokens: opacity-diluted `text-fa-ink/*` (as low as ~1.95:1 at 30% opacity, worst cases) and the base `fa-caution` amber (~3.15:1, failing even at full opacity). Fixed at the token level: a new solid `fa-ink-muted` (#4B5563, ~7.2:1) and a darkened `fa-caution` (#8A5A18, ~5.65:1).
2. **Second scan** still failed on the access-type legend in `RouteMap.tsx` — traced to a hardcoded hex color duplicated outside the Tailwind config (`ACCESS_COLOR['elevator']` was still the pre-darkened `#C77D22`), invisible to a grep for Tailwind classes since it was applied via inline `style={{color: ...}}`. Fixed directly, plus darkened the adjacent `stairs-only` gray, which passed AA (~4.63:1) but with almost no margin.
3. **Third scan** still failed on one element — the masthead tagline in `src/app/page.tsx`, missed because the earlier grep sweep was scoped to `src/components/` only. Found with certainty (not guessed) by upgrading the test's failure output to print the actual HTML and axe's measured colors, not just a CSS selector.

Each round was re-verified by an actual scan run, not assumed fixed from the contrast math alone.