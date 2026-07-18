import { FunctionDeclaration, Type } from '@google/genai';
import { computeRoute } from '@/lib/venue/routing';
import { VENUE_NODES } from '@/lib/venue/graph';
import { getSensoryEvents } from '@/lib/sensory/schedule';

// Read-only tool definitions exposed to Gemini. None of these can write
// venue state or invent a fact -- each one calls straight into the
// deterministic core (routing.ts, schedule.ts, graph.ts) and returns
// exactly what that pure function computes.

export const AI_TOOLS: FunctionDeclaration[] = [
  {
    name: 'get_accessible_route',
    description:
      "Get a step-free/eligible route between two venue locations for a given set of access profiles. Returns the actual path, distance, and access-type/noise/lighting per step, computed by deterministic graph search. Never state a route or distance without calling this first.",
    parametersJsonSchema: {
      type: 'object',
      properties: {
        from: { type: 'string', description: "Starting node id, e.g. 'gate-north'" },
        to: { type: 'string', description: "Destination node id, e.g. 'section-104'" },
        profiles: {
          type: 'array',
          items: {
            type: 'string',
            enum: ['wheelchair', 'low-vision', 'deaf', 'sensory-sensitive'],
          },
          description: 'Selected access profiles constraining the route',
        },
      },
      required: ['from', 'to'],
    },
  },
  {
    name: 'get_sensory_forecast',
    description:
      'Get upcoming or currently active sensory events (noise/light spikes such as pyrotechnics, anthem, halftime show) within a time window from the current match minute. Always call this before giving any timing advice.',
    parametersJsonSchema: {
      type: 'object',
      properties: {
        currentMinute: {
          type: 'number',
          description: 'Elapsed match minute (negative = pre-kickoff)',
        },
        windowMinutes: {
          type: 'number',
          description: 'How far ahead to look in minutes, defaults to 30',
        },
      },
      required: ['currentMinute'],
    },
  },
  {
    name: 'get_quiet_zones',
    description:
      'Get the list of quiet rooms and the sensory-friendly viewing area, with real distance computed from a given starting location. Always call this rather than guessing a distance.',
    parametersJsonSchema: {
      type: 'object',
      properties: {
        fromNodeId: {
          type: 'string',
          description: "Node id to measure distance from, e.g. the fan's section",
        },
      },
      required: ['fromNodeId'],
    },
  },
  {
    name: 'get_amenity',
    description:
      'Find the nearest amenity of a given type (accessible restroom, service animal relief area, guest services, first aid) from a starting location.',
    parametersJsonSchema: {
      type: 'object',
      properties: {
        type: {
          type: 'string',
          enum: ['restroom', 'service_animal_relief', 'guest_services', 'first_aid'],
        },
        fromNodeId: { type: 'string' },
      },
      required: ['type', 'fromNodeId'],
    },
  },
];

const AMENITY_TYPE_TO_NODE_TYPE: Record<string, string> = {
  restroom: 'restroom',
  service_animal_relief: 'service_animal_relief',
  guest_services: 'guest_services',
  first_aid: 'first_aid',
};

/**
 * Executes a tool call by name against the deterministic core. This is the
 * ONLY bridge between the model and venue data -- every branch calls a pure
 * function, writes nothing, and returns nothing the model could have invented.
 */
export function executeTool(toolName: string, args: Record<string, unknown>): unknown {
  switch (toolName) {
    case 'get_accessible_route': {
      const from = args.from as string;
      const to = args.to as string;
      const profiles = (args.profiles as string[] | undefined) ?? [];
      return computeRoute(from, to, profiles);
    }

    case 'get_sensory_forecast': {
      const currentMinute = args.currentMinute as number;
      const windowMinutes = (args.windowMinutes as number | undefined) ?? 30;
      return getSensoryEvents(currentMinute, windowMinutes);
    }

    case 'get_quiet_zones': {
      const fromNodeId = args.fromNodeId as string;
      const quietNodeTypes = new Set(['quiet_room', 'sensory_area']);
      return VENUE_NODES.filter((n) => quietNodeTypes.has(n.type)).map((n) => {
        const route = computeRoute(fromNodeId, n.id, []);
        return {
          id: n.id,
          label: n.label,
          type: n.type,
          distanceM: route.found ? route.totalDistanceM : null,
        };
      });
    }

    case 'get_amenity': {
      const type = args.type as string;
      const fromNodeId = args.fromNodeId as string;
      const targetType = AMENITY_TYPE_TO_NODE_TYPE[type];
      const candidates = VENUE_NODES.filter((n) => n.type === targetType);
      const withDistance = candidates
        .map((n) => {
          const route = computeRoute(fromNodeId, n.id, []);
          return {
            id: n.id,
            label: n.label,
            distanceM: route.found ? route.totalDistanceM : null,
          };
        })
        .filter((c): c is { id: string; label: string; distanceM: number } => c.distanceM !== null)
        .sort((a, b) => a.distanceM - b.distanceM);
      return withDistance[0] ?? null;
    }

    default:
      throw new Error(`Unknown tool: ${toolName}`);
  }
}