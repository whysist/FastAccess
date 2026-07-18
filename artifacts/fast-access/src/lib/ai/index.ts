// TODO: Wire up Claude tool-calling here (server-side only, via Next.js API routes).
// NEVER expose any API key to the client.

export interface AiQueryResult { answer: string; stub: true }
export interface AiDescribeResult { description: string; stub: true }

/** TODO: Replace with real Claude API call. Currently echoes with a stub message. */
export function queryAi(_text: string, _context?: string): AiQueryResult {
  return { answer: 'AI features are coming soon. Venue routing is fully functional now.', stub: true };
}

/** TODO: Replace with real Claude tool-calling to describe a venue node. */
export function describeNode(_nodeId: string, _profiles?: string[]): AiDescribeResult {
  return { description: 'Detailed AI-generated descriptions are coming soon. Use the route planner to navigate.', stub: true };
}
