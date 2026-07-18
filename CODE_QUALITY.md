# Code Quality

## Principles
- All decision logic (routing, sensory scheduling) is written as pure functions with no side effects, making it exhaustively unit-testable and easy to reason about independent of the AI layer.
- Strict TypeScript throughout (`strict: true` in `tsconfig.json`).
- No unnecessary dependencies — verified, not just intended: `next`, `react`, `react-dom`, and `@google/genai` are the only production dependencies. No UI kit, no state management library beyond React hooks, no ORM or database client.

## Commands
```bash
cd artifacts/fast-access
pnpm run typecheck  # tsc --noEmit
```

## Results
`pnpm run typecheck` passes with zero errors, confirmed after every structural change (the Gemini AI layer, the graph.ts fix, the accessibility fixes).

