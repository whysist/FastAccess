'use client';

import { useMemo } from 'react';
import { computeRoute } from '@/lib/venue/routing';
import { VENUE_NODES } from '@/lib/venue/graph';

const QUIET_NODE_IDS = ['quiet-room-1', 'quiet-room-2', 'sensory-area'];

const NODE_TYPE_LABEL: Record<string, string> = {
  quiet_room:   'Quiet Room',
  sensory_area: 'Sensory-Friendly Viewing',
};

interface Props {
  currentNodeId: string;
  profiles: string[];
}

export function QuietZoneFinder({ currentNodeId, profiles }: Props) {
  const zones = useMemo(() => {
    return QUIET_NODE_IDS.map((id) => {
      const node = VENUE_NODES.find((n) => n.id === id)!;
      // Use the fan's actually selected access profiles so the distance
      // shown reflects a route they can genuinely take -- not always a
      // wheelchair-constrained path regardless of who's asking.
      const result = computeRoute(currentNodeId, id, profiles);
      return { node, distanceM: result.found ? result.totalDistanceM : null };
    }).sort((a, b) => (a.distanceM ?? Infinity) - (b.distanceM ?? Infinity));
  }, [currentNodeId, profiles]);

  return (
    <ul className="border border-fa-border" aria-label="Nearest quiet zones and sensory-friendly areas">
      {zones.map(({ node, distanceM }, i) => (
        <li
          key={node.id}
          className={[
            'flex items-start justify-between gap-4 px-4 py-4',
            i < zones.length - 1 ? 'border-b border-fa-border' : '',
          ].join(' ')}
        >
          <div className="flex items-start gap-3">
            {/* Calm indicator dot + icon */}
            <div className="mt-1 flex-shrink-0">
              <div className="w-3 h-3 rounded-full bg-fa-calm" aria-hidden="true" />
            </div>

            <div>
              <div className="font-bold text-sm text-fa-ink">{node.label}</div>
              <div className="text-xs font-bold uppercase tracking-wide text-fa-calm mt-0.5">
                {NODE_TYPE_LABEL[node.type] ?? node.type}
              </div>
              <div className="text-xs text-fa-ink/50 mt-1">
                Low noise · Steady lighting
              </div>
            </div>
          </div>

          {/* Distance */}
          <div className="text-right flex-shrink-0">
            {distanceM !== null ? (
              <>
                <div className="font-mono text-sm font-bold text-fa-ink">~{distanceM}m</div>
                <div className="text-[10px] text-fa-ink/40 mt-0.5">step-free</div>
              </>
            ) : (
              <div className="text-xs text-fa-ink/40">No route</div>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}