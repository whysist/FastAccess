# Code Quality

## Principles
- All decision logic (routing, sensory scheduling) is written as pure functions with no side effects, making it exhaustively unit-testable and easy to reason about independent of the AI layer.
- Strict TypeScript throughout (`strict: true` in `tsconfig.json`) — verified, not just declared: zero `any` types anywhere in the codebase.
- No unnecessary dependencies — verified, not just intended: `next`, `react`, `react-dom`, and `@google/genai` are the only production dependencies. No UI kit, no state management library beyond React hooks, no ORM or database client.
- ESLint configured via Next.js's built-in `next lint` (`next/core-web-vitals` ruleset), pinned to ESLint 8.x for compatibility with Next 14's lint runner.

## Commands
```bash
cd artifacts/fast-access
pnpm run typecheck   # tsc --noEmit
pnpm exec next lint  # ESLint, next/core-web-vitals ruleset
```

## Results
- `pnpm run typecheck` — **zero errors**, confirmed after every structural change (the Gemini AI layer, the graph.ts fix, the accessibility fixes).
- `pnpm exec next lint` — **zero warnings or errors**. One real issue (an unused import in `src/lib/ai/tools.ts`) was found and fixed on first run; this is the result of the fix, not the first-try output.