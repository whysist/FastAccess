import { buildGraph, getNodeById, type VenueEdge, type VenueNode } from './graph';

export type Profile = 'wheelchair' | 'low-vision' | 'deaf' | 'sensory-sensitive';

export interface RouteStep {
  node: VenueNode;
  distanceM: number;
  cumulativeM: number;
  accessType: VenueEdge['accessType'];
  noiseLevel: VenueEdge['noiseLevel'];
  lighting: VenueEdge['lighting'];
}

export interface RouteResult {
  steps: RouteStep[];
  totalDistanceM: number;
  profiles: string[];
  found: boolean;
}

function isEdgeAllowed(edge: VenueEdge, profiles: Profile[]): boolean {
  for (const profile of profiles) {
    switch (profile) {
      case 'wheelchair':
        if (edge.accessType === 'stairs-only') return false;
        break;
      case 'low-vision':
        if (edge.lighting === 'flashing') return false;
        break;
      case 'sensory-sensitive':
        if (edge.noiseLevel === 'high' || edge.lighting === 'flashing') return false;
        break;
      case 'deaf':
        // No edge exclusions — deaf users have no route constraints
        break;
    }
  }
  return true;
}

/**
 * Pure function — Dijkstra shortest path honouring profile constraints.
 * Returns found:false when no eligible path exists.
 */
export function computeRoute(
  fromNodeId: string,
  toNodeId: string,
  profiles: string[],
): RouteResult {
  const validProfiles = profiles.filter((p): p is Profile =>
    ['wheelchair', 'low-vision', 'deaf', 'sensory-sensitive'].includes(p),
  );

  if (fromNodeId === toNodeId) {
    const node = getNodeById(fromNodeId);
    if (!node) return { steps: [], totalDistanceM: 0, profiles: validProfiles, found: false };
    return {
      steps: [{ node, distanceM: 0, cumulativeM: 0, accessType: 'step-free', noiseLevel: 'low', lighting: 'steady' }],
      totalDistanceM: 0,
      profiles: validProfiles,
      found: true,
    };
  }

  const graph = buildGraph();
  const dist = new Map<string, number>();
  const prev = new Map<string, { nodeId: string; edge: VenueEdge } | null>();

  dist.set(fromNodeId, 0);

  // Simple priority queue (array + sort; graph is tiny ~26 nodes)
  type QEntry = { cost: number; nodeId: string };
  const queue: QEntry[] = [{ cost: 0, nodeId: fromNodeId }];

  while (queue.length > 0) {
    queue.sort((a, b) => a.cost - b.cost);
    const { cost, nodeId } = queue.shift()!;

    if (nodeId === toNodeId) break;
    if (cost > (dist.get(nodeId) ?? Infinity)) continue;

    for (const edge of graph.get(nodeId) ?? []) {
      if (!isEdgeAllowed(edge, validProfiles)) continue;
      const newCost = cost + edge.distanceM;
      if (newCost < (dist.get(edge.to) ?? Infinity)) {
        dist.set(edge.to, newCost);
        prev.set(edge.to, { nodeId, edge });
        queue.push({ cost: newCost, nodeId: edge.to });
      }
    }
  }

  if (!dist.has(toNodeId)) {
    return { steps: [], totalDistanceM: 0, profiles: validProfiles, found: false };
  }

  // Reconstruct path
  const path: { nodeId: string; edge: VenueEdge }[] = [];
  let cursor: string | undefined = toNodeId;
  while (cursor && cursor !== fromNodeId) {
    const entry = prev.get(cursor);
    if (!entry) break;
    path.unshift({ nodeId: cursor, edge: entry.edge });
    cursor = entry.nodeId;
  }

  const steps: RouteStep[] = [];
  const startNode = getNodeById(fromNodeId)!;
  const firstEdge = path[0]?.edge;
  steps.push({
    node: startNode,
    distanceM: 0,
    cumulativeM: 0,
    accessType: firstEdge?.accessType ?? 'step-free',
    noiseLevel: firstEdge?.noiseLevel ?? 'low',
    lighting: firstEdge?.lighting ?? 'steady',
  });

  let cumulative = 0;
  for (const { nodeId, edge } of path) {
    cumulative += edge.distanceM;
    const node = getNodeById(nodeId);
    if (!node) continue;
    steps.push({ node, distanceM: edge.distanceM, cumulativeM: cumulative, accessType: edge.accessType, noiseLevel: edge.noiseLevel, lighting: edge.lighting });
  }

  return { steps, totalDistanceM: dist.get(toNodeId)!, profiles: validProfiles, found: true };
}
