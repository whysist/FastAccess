# Accessibility

Accessibility is the core product of FastAccess, not a bolt-on feature, so it is held to the same bar throughout the whole app rather than checked once at the end.

## Standard
Targeting WCAG 2.1 AA across all views.

## Principles enforced in code
- Severity, route type, and sensory intensity are always conveyed through icon + text label together — never color alone.
- Route narration is delivered through an ARIA live region (`aria-live="polite"`) so screen reader users are informed as directions update, without needing to navigate to find them.
- Full keyboard navigation: every interactive element (profile checkboxes, route selection, query box) is reachable and operable via keyboard, with a visible focus state.
- `prefers-reduced-motion` is respected for any transition or animation.
- Color contrast meets AA minimums across text and interactive elements.

## Testing method
- Automated: `axe-core` run via Playwright against every route (`e2e/accessibility.spec.ts`).
- Manual: full keyboard-only walkthrough of the profile selection -> route planning flow.

## Results
_To be filled in from the actual `npm run test:e2e` output before submission — not hand-typed. Paste the axe scan summary and note any violations found and fixed, or confirm zero violations with the run's timestamp._