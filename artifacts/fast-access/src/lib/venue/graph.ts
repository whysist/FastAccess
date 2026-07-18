export type NodeType =
  | 'gate'
  | 'junction'
  | 'section'
  | 'ramp'
  | 'elevator'
  | 'quiet_room'
  | 'sensory_area'
  | 'restroom'
  | 'service_animal_relief'
  | 'guest_services'
  | 'first_aid';

export type AccessType = 'step-free' | 'ramp' | 'elevator' | 'stairs-only';
export type NoiseLevel = 'low' | 'medium' | 'high';
export type Lighting = 'steady' | 'flashing';

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
  { id: 'gate-north',            label: 'North Gate',                    type: 'gate' },
  { id: 'gate-south',            label: 'South Gate',                    type: 'gate' },
  { id: 'gate-east',             label: 'East Gate',                     type: 'gate' },
  { id: 'gate-west',             label: 'West Gate',                     type: 'gate' },
  { id: 'junction-a',            label: 'Concourse A',                   type: 'junction' },
  { id: 'junction-b',            label: 'Concourse B',                   type: 'junction' },
  { id: 'section-101',           label: 'Section 101',                   type: 'section' },
  { id: 'section-102',           label: 'Section 102',                   type: 'section' },
  { id: 'section-103',           label: 'Section 103',                   type: 'section' },
  { id: 'section-104',           label: 'Section 104',                   type: 'section' },
  { id: 'section-105',           label: 'Section 105',                   type: 'section' },
  { id: 'section-106',           label: 'Section 106',                   type: 'section' },
  { id: 'section-107',           label: 'Section 107',                   type: 'section' },
  { id: 'section-108',           label: 'Section 108',                   type: 'section' },
  { id: 'ramp-1',                label: 'Ramp 1 (West)',                 type: 'ramp' },
  { id: 'ramp-2',                label: 'Ramp 2 (East)',                 type: 'ramp' },
  { id: 'elevator-1',            label: 'Elevator 1 (West)',             type: 'elevator' },
  { id: 'elevator-2',            label: 'Elevator 2 (East)',             type: 'elevator' },
  { id: 'quiet-room-1',          label: 'Quiet Room A',                  type: 'quiet_room' },
  { id: 'quiet-room-2',          label: 'Quiet Room B',                  type: 'quiet_room' },
  { id: 'sensory-area',          label: 'Sensory-Friendly Viewing Area', type: 'sensory_area' },
  { id: 'restroom-1',            label: 'Accessible Restroom (West)',    type: 'restroom' },
  { id: 'restroom-2',            label: 'Accessible Restroom (East)',    type: 'restroom' },
  { id: 'service-animal-relief', label: 'Service Animal Relief Area',    type: 'service_animal_relief' },
  { id: 'guest-services',        label: 'Guest Services',                type: 'guest_services' },
  { id: 'first-aid',             label: 'First Aid',                     type: 'first_aid' },
];

const RAW_EDGES: VenueEdge[] = [
  // Gates → Concourse A
  { from: 'gate-north', to: 'junction-a', distanceM: 80,  accessType: 'step-free', noiseLevel: 'medium', lighting: 'steady' },
  { from: 'gate-south', to: 'junction-a', distanceM: 100, accessType: 'step-free', noiseLevel: 'medium', lighting: 'steady' },
  // Gates → Concourse B
  { from: 'gate-east',  to: 'junction-b', distanceM: 90,  accessType: 'step-free', noiseLevel: 'medium', lighting: 'steady' },
  { from: 'gate-west',  to: 'junction-b', distanceM: 95,  accessType: 'step-free', noiseLevel: 'medium', lighting: 'steady' },
  // Concourses connected
  { from: 'junction-a', to: 'junction-b', distanceM: 120, accessType: 'step-free', noiseLevel: 'high',   lighting: 'steady' },
  // Concourse A → access routes
  { from: 'junction-a', to: 'ramp-1',     distanceM: 40,  accessType: 'ramp',      noiseLevel: 'medium', lighting: 'steady' },
  { from: 'junction-a', to: 'elevator-1', distanceM: 35,  accessType: 'step-free', noiseLevel: 'low',    lighting: 'steady' },
  // Concourse B → access routes
  { from: 'junction-b', to: 'ramp-2',     distanceM: 45,  accessType: 'ramp',      noiseLevel: 'medium', lighting: 'steady' },
  { from: 'junction-b', to: 'elevator-2', distanceM: 40,  accessType: 'step-free', noiseLevel: 'low',    lighting: 'steady' },
  // Elevator 1 → Sections 103, 104 (steady lighting)
  { from: 'elevator-1', to: 'section-103', distanceM: 25, accessType: 'elevator', noiseLevel: 'high', lighting: 'steady' },
  { from: 'elevator-1', to: 'section-104', distanceM: 35, accessType: 'elevator', noiseLevel: 'high', lighting: 'steady' },
  // Elevator 2 → Sections 107, 108 (steady lighting)
  { from: 'elevator-2', to: 'section-107', distanceM: 25, accessType: 'elevator', noiseLevel: 'high', lighting: 'steady' },
  { from: 'elevator-2', to: 'section-108', distanceM: 35, accessType: 'elevator', noiseLevel: 'high', lighting: 'steady' },
  // Ramp 1 → Sections 101, 102 (flashing lights near pitch-side)
  { from: 'ramp-1', to: 'section-101', distanceM: 20, accessType: 'ramp', noiseLevel: 'high', lighting: 'flashing' },
  { from: 'ramp-1', to: 'section-102', distanceM: 30, accessType: 'ramp', noiseLevel: 'high', lighting: 'flashing' },
  // Ramp 2 → Sections 105, 106 (flashing)
  { from: 'ramp-2', to: 'section-105', distanceM: 20, accessType: 'ramp', noiseLevel: 'high', lighting: 'flashing' },
  { from: 'ramp-2', to: 'section-106', distanceM: 30, accessType: 'ramp', noiseLevel: 'high', lighting: 'flashing' },
  // Stairs-only shortcuts
  { from: 'junction-a', to: 'section-101', distanceM: 30, accessType: 'stairs-only', noiseLevel: 'high', lighting: 'steady' },
  { from: 'junction-a', to: 'section-102', distanceM: 35, accessType: 'stairs-only', noiseLevel: 'high', lighting: 'steady' },
  { from: 'junction-b', to: 'section-105', distanceM: 30, accessType: 'stairs-only', noiseLevel: 'high', lighting: 'steady' },
  { from: 'junction-b', to: 'section-106', distanceM: 35, accessType: 'stairs-only', noiseLevel: 'high', lighting: 'steady' },
  // Amenities from Concourse A
  { from: 'junction-a', to: 'quiet-room-1', distanceM: 50, accessType: 'step-free', noiseLevel: 'low',    lighting: 'steady' },
  { from: 'junction-a', to: 'sensory-area', distanceM: 70, accessType: 'step-free', noiseLevel: 'low',    lighting: 'steady' },
  { from: 'junction-a', to: 'restroom-1',   distanceM: 30, accessType: 'step-free', noiseLevel: 'low',    lighting: 'steady' },
  { from: 'junction-a', to: 'guest-services', distanceM: 20, accessType: 'step-free', noiseLevel: 'medium', lighting: 'steady' },
  // Amenities from Concourse B
  { from: 'junction-b', to: 'quiet-room-2', distanceM: 55, accessType: 'step-free', noiseLevel: 'low', lighting: 'steady' },
  { from: 'junction-b', to: 'restroom-2',   distanceM: 30, accessType: 'step-free', noiseLevel: 'low', lighting: 'steady' },
  { from: 'junction-b', to: 'first-aid',    distanceM: 25, accessType: 'step-free', noiseLevel: 'low', lighting: 'steady' },
  // Service animal relief from North Gate
  { from: 'gate-north', to: 'service-animal-relief', distanceM: 40, accessType: 'step-free', noiseLevel: 'low', lighting: 'steady' },
];

export type AdjacencyMap = Map<string, VenueEdge[]>;

export function buildGraph(): AdjacencyMap {
  const adj: AdjacencyMap = new Map();
  const add = (e: VenueEdge) => {
    const list = adj.get(e.from) ?? [];
    list.push(e);
    adj.set(e.from, list);
  };
  for (const edge of RAW_EDGES) {
    add(edge);
    add({ ...edge, from: edge.to, to: edge.from });
  }
  return adj;
}

export function getNodeById(id: string): VenueNode | undefined {
  return VENUE_NODES.find((n) => n.id === id);
}
