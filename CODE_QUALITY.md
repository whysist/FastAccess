# Code Quality

## Principles
- All decision logic (routing, sensory scheduling) is written as pure functions with no side effects, making it exhaustively unit-testable and easy to reason about independent of the AI layer.
- Strict TypeScript throughout (`strict: true` in `tsconfig.json`) — no `any`, no implicit any.
- ESLint configured to fail on any warning, not just errors.
- No unnecessary dependencies: no UI kit beyond Tailwind, no state management library beyond React hooks, no ORM or database client.

## Commands
```bash
npm run lint       # ESLint, zero warnings allowed
npm run typecheck  # tsc --noEmit
```

## Results
_To be filled in from the actual lint/typecheck output before submission._