# Security

## Data handling
FastAccess does not persist any fan data. There is no login, no database, no PII collection — a fan's selected profile and destination exist only in browser/session state for the duration of their visit to the app.

## AI call boundary
- All calls to the Claude API happen server-side only; no API key is ever sent to or accessible from the client.
- The model is given a fixed set of **read-only** tools (`getAccessibleRoute`, `getSensoryForecast`, `getQuietZones`, `getAmenity`, `describeMatchEvent`). It cannot write venue state, cannot invent a route or distance, and has no tool capable of taking any action beyond reading the deterministic core.
- This makes prompt injection structurally low-impact: even if a fan's free-text query contained adversarial instructions, there is no tool available to the model that could cause harm, corrupt state, or leak anything beyond what the read-only tools already expose.

## Secrets
- `.env.example` lists required variables (`ANTHROPIC_API_KEY`) with no real values.
- `.env.local` is gitignored; no secrets are committed at any point in history.

## Dependency & scan results
_To be filled in before submission: `npm audit` output, and confirmation that no secrets are present via a history scan (e.g. `git log -p | grep`-style check or a tool like `gitleaks`)._