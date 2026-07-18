import { buildGraph, getNodeById, type VenueEdge, type VenueNode } from "./graph.js";

export type Profile = "wheelchair" | "low-vision" | "deaf" | "sensory-sensitive";

export interface RouteStep {
  node: VenueNode;
  distanceM: number;
  cumulativeM: number;
  accessType: VenueEdge["accessType"];
  noiseLevel: VenueEdge["noiseLevel"];
  lighting: VenueEdge["lighting"];
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
      case "wheelchair":
        if (edge.accessType === "stairs-only") return false;
        break;
      case "low-vision":
        if (edge.lighting === "flashing") return false;
        break;
      case "sensory-sensitive":
        if (edge.noiseLevel === "high") return false;
        if (edge.lighting === "flashing") return false;
        break;
      case "deaf":
        // No edge exclusions for deaf profile
        break;
    }
  }
  return true;
}

/**
 * Pure function: Dijkstra shortest path respecting profile constraints.
 * Returns RouteResult with found=false if no eligible path exists.
 */
export function computeRoute(
  fromNodeId: string,
  toNodeId: string,
  profiles: string[],
): RouteResult {
  const validProfiles = profiles.filter((p): p is Profile =>
    ["wheelchair", "low-vision", "deaf", "sensory-sensitive"].includes(p),
  );

  const graph = buildGraph();

  // Priority queue entries: [cost, nodeId, path of {nodeId, edge}]
  type PathEntry = { via: string; edge: VenueEdge };
  type QueueEntry = { cost: number; nodeId: string; path: PathEntry[] };

  const dist = new Map<string, number>();
  const queue: QueueEntry[] = [];

  dist.set(fromNodeId, 0);
  queue.push({ cost: 0, nodeId: fromNodeId, path: [] });

  // Simple min-heap via sorted insertion — small graph so O(n log n) is fine
  const enqueue = (entry: QueueEntry) => {
    queue.push(entry);
    queue.sort((a, b) => a.cost - b.cost);
  };

  while (queue.length > 0) {
    const current = queue.shift()!;
    const { cost, nodeId, path } = current;

    if (nodeId === toNodeId) {
      // Reconstruct steps
      const steps: RouteStep[] = [];
      let cumulative = 0;

      // First step: the start node with zero distance
      const startNode = getNodeById(fromNodeId);
      if (!startNode) break;

      if (path.length === 0) {
        // Start equals destination
        steps.push({
          node: startNode,
          distanceM: 0,
          cumulativeM: 0,
          accessType: "step-free",
          noiseLevel: "low",
          lighting: "steady",
        });
      } else {
        steps.push({
          node: startNode,
          distanceM: 0,
          cumulativeM: 0,
          accessType: path[0].edge.accessType,
          noiseLevel: path[0].edge.noiseLevel,
          lighting: path[0].edge.lighting,
        });

        for (const { via, edge } of path) {
          cumulative += edge.distanceM;
          const node = getNodeById(via);
          if (!node) continue;
          steps.push({
            node,
            distanceM: edge.distanceM,
            cumulativeM: cumulative,
            accessType: edge.accessType,
            noiseLevel: edge.noiseLevel,
            lighting: edge.lighting,
          });
        }
      }

      return {
        steps,
        totalDistanceM: cost,
        profiles: validProfiles,
        found: true,
      };
    }

    if (cost > (dist.get(nodeId) ?? Infinity)) continue;

    const neighbors = graph.get(nodeId) ?? [];
    for (const edge of neighbors) {
      if (!isEdgeAllowed(edge, validProfiles)) continue;

      const newCost = cost + edge.distanceM;
      if (newCost < (dist.get(edge.to) ?? Infinity)) {
        dist.set(edge.to, newCost);
        enqueue({
          cost: newCost,
          nodeId: edge.to,
          path: [...path, { via: edge.to, edge }],
        });
      }
    }
  }

  return {
    steps: [],
    totalDistanceM: 0,
    profiles: validProfiles,
    found: false,
  };
}
