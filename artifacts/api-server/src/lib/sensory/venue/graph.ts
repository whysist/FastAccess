export type NodeType =
  | "gate"
  | "junction"
  | "section"
  | "ramp"
  | "elevator"
  | "quiet_room"
  | "sensory_area"
  | "restroom"
  | "service_animal_relief"
  | "guest_services"
  | "first_aid";

export type AccessType = "step-free" | "ramp" | "elevator" | "stairs-only";
export type NoiseLevel = "low" | "medium" | "high";
export type Lighting = "steady" | "flashing";

export interface VenueNode {
  id: string;
  label: string;
  type: NodeType;
}

export interface VenueEdge {
  from: string;
  to: string;
  distanceM: number;
  accessType: AccessType;
  noiseLevel: NoiseLevel;
  lighting: Lighting;
}

export const VENUE_NODES: VenueNode[] = [
  // Gates
  { id: "gate-north", label: "North Gate", type: "gate" },
  { id: "gate-south", label: "South Gate", type: "gate" },
  { id: "gate-east", label: "East Gate", type: "gate" },
  { id: "gate-west", label: "West Gate", type: "gate" },
  // Concourse junctions
  { id: "junction-a", label: "Concourse A", type: "junction" },
  { id: "junction-b", label: "Concourse B", type: "junction" },
  // Seating sections
  { id: "section-101", label: "Section 101", type: "section" },
  { id: "section-102", label: "Section 102", type: "section" },
  { id: "section-103", label: "Section 103", type: "section" },
  { id: "section-104", label: "Section 104", type: "section" },
  { id: "section-105", label: "Section 105", type: "section" },
  { id: "section-106", label: "Section 106", type: "section" },
  { id: "section-107", label: "Section 107", type: "section" },
  { id: "section-108", label: "Section 108", type: "section" },
  // Ramps
  { id: "ramp-1", label: "Ramp 1 (West)", type: "ramp" },
  { id: "ramp-2", label: "Ramp 2 (East)", type: "ramp" },
  // Elevators
  { id: "elevator-1", label: "Elevator 1 (West)", type: "elevator" },
  { id: "elevator-2", label: "Elevator 2 (East)", type: "elevator" },
  // Quiet rooms
  { id: "quiet-room-1", label: "Quiet Room A", type: "quiet_room" },
  { id: "quiet-room-2", label: "Quiet Room B", type: "quiet_room" },
  // Sensory area
  { id: "sensory-area", label: "Sensory-Friendly Viewing Area", type: "sensory_area" },
  // Restrooms
  { id: "restroom-1", label: "Accessible Restroom (West)", type: "restroom" },
  { id: "restroom-2", label: "Accessible Restroom (East)", type: "restroom" },
  // Service animal relief
  { id: "service-animal-relief", label: "Service Animal Relief Area", type: "service_animal_relief" },
  // Guest services
  { id: "guest-services", label: "Guest Services", type: "guest_services" },
  // First aid
  { id: "first-aid", label: "First Aid", type: "first_aid" },
];

// Directed edges — we also add reverse edges in buildGraph()
const RAW_EDGES: VenueEdge[] = [
  // Gates → Concourse A
  { from: "gate-north", to: "junction-a", distanceM: 80, accessType: "step-free", noiseLevel: "medium", lighting: "steady" },
  { from: "gate-south", to: "junction-a", distanceM: 100, accessType: "step-free", noiseLevel: "medium", lighting: "steady" },
  // Gates → Concourse B
  { from: "gate-east", to: "junction-b", distanceM: 90, accessType: "step-free", noiseLevel: "medium", lighting: "steady" },
  { from: "gate-west", to: "junction-b", distanceM: 95, accessType: "step-free", noiseLevel: "medium", lighting: "steady" },
  // Concourse A ↔ B (step-free main corridor)
  { from: "junction-a", to: "junction-b", distanceM: 120, accessType: "step-free", noiseLevel: "high", lighting: "steady" },
  // Concourse A → Ramp 1
  { from: "junction-a", to: "ramp-1", distanceM: 40, accessType: "ramp", noiseLevel: "medium", lighting: "steady" },
  // Concourse B → Ramp 2
  { from: "junction-b", to: "ramp-2", distanceM: 45, accessType: "ramp", noiseLevel: "medium", lighting: "steady" },
  // Concourse A → Elevator 1
  { from: "junction-a", to: "elevator-1", distanceM: 35, accessType: "step-free", noiseLevel: "low", lighting: "steady" },
  // Concourse B → Elevator 2
  { from: "junction-b", to: "elevator-2", distanceM: 40, accessType: "step-free", noiseLevel: "low", lighting: "steady" },
  // Elevator 1 → Sections 103, 104
  { from: "elevator-1", to: "section-103", distanceM: 25, accessType: "elevator", noiseLevel: "high", lighting: "steady" },
  { from: "elevator-1", to: "section-104", distanceM: 35, accessType: "elevator", noiseLevel: "high", lighting: "steady" },
  // Elevator 2 → Sections 107, 108
  { from: "elevator-2", to: "section-107", distanceM: 25, accessType: "elevator", noiseLevel: "high", lighting: "steady" },
  { from: "elevator-2", to: "section-108", distanceM: 35, accessType: "elevator", noiseLevel: "high", lighting: "steady" },
  // Ramp 1 → Sections 101, 102
  { from: "ramp-1", to: "section-101", distanceM: 20, accessType: "ramp", noiseLevel: "high", lighting: "flashing" },
  { from: "ramp-1", to: "section-102", distanceM: 30, accessType: "ramp", noiseLevel: "high", lighting: "flashing" },
  // Ramp 2 → Sections 105, 106
  { from: "ramp-2", to: "section-105", distanceM: 20, accessType: "ramp", noiseLevel: "high", lighting: "flashing" },
  { from: "ramp-2", to: "section-106", distanceM: 30, accessType: "ramp", noiseLevel: "high", lighting: "flashing" },
  // Stairs-only shortcuts
  { from: "junction-a", to: "section-101", distanceM: 30, accessType: "stairs-only", noiseLevel: "high", lighting: "steady" },
  { from: "junction-a", to: "section-102", distanceM: 35, accessType: "stairs-only", noiseLevel: "high", lighting: "steady" },
  { from: "junction-b", to: "section-105", distanceM: 30, accessType: "stairs-only", noiseLevel: "high", lighting: "steady" },
  { from: "junction-b", to: "section-106", distanceM: 35, accessType: "stairs-only", noiseLevel: "high", lighting: "steady" },
  // Amenities from Concourse A
  { from: "junction-a", to: "quiet-room-1", distanceM: 50, accessType: "step-free", noiseLevel: "low", lighting: "steady" },
  { from: "junction-a", to: "sensory-area", distanceM: 70, accessType: "step-free", noiseLevel: "low", lighting: "steady" },
  { from: "junction-a", to: "restroom-1", distanceM: 30, accessType: "step-free", noiseLevel: "low", lighting: "steady" },
  { from: "junction-a", to: "guest-services", distanceM: 20, accessType: "step-free", noiseLevel: "medium", lighting: "steady" },
  // Amenities from Concourse B
  { from: "junction-b", to: "quiet-room-2", distanceM: 55, accessType: "step-free", noiseLevel: "low", lighting: "steady" },
  { from: "junction-b", to: "restroom-2", distanceM: 30, accessType: "step-free", noiseLevel: "low", lighting: "steady" },
  { from: "junction-b", to: "first-aid", distanceM: 25, accessType: "step-free", noiseLevel: "low", lighting: "steady" },
  // Service animal relief from gate-north
  { from: "gate-north", to: "service-animal-relief", distanceM: 40, accessType: "step-free", noiseLevel: "low", lighting: "steady" },
];

export type AdjacencyMap = Map<string, (VenueEdge & { originalTo: string })[]>;

export function buildGraph(): AdjacencyMap {
  const adj: AdjacencyMap = new Map();

  const addEdge = (edge: VenueEdge) => {
    const list = adj.get(edge.from) ?? [];
    list.push({ ...edge, originalTo: edge.to });
    adj.set(edge.from, list);
  };

  for (const edge of RAW_EDGES) {
    addEdge(edge);
    // Add reverse edge with same properties
    addEdge({ ...edge, from: edge.to, to: edge.from });
  }

  return adj;
}

export function getNodeById(id: string): VenueNode | undefined {
  return VENUE_NODES.find((n) => n.id === id);
}
