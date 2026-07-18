'use client';

type AccessType = 'step-free' | 'ramp' | 'elevator' | 'stairs-only';

interface RouteStep {
  node: { id: string; label: string; type: string };
  distanceM: number;
  cumulativeM: number;
  accessType: AccessType;
  noiseLevel: 'low' | 'medium' | 'high';
  lighting: 'steady' | 'flashing';
}

interface RouteResult {
  steps: RouteStep[];
  totalDistanceM: number;
  profiles: string[];
  found: boolean;
}

const ACCESS_COLOR: Record<AccessType, string> = {
  'step-free': '#1A4D8F',
  'ramp':      '#2F6B5E',
  'elevator':  '#8A5A18', // was '#C77D22' -- the pre-darkened caution hex, hardcoded here
                           // separately from the tailwind.config.ts token, so the earlier
                           // config-level fix never touched this inline-styled duplicate
  'stairs-only': '#4B5563', // was '#6B7280' (~4.63:1, technically passed AA but with almost
                              // no margin) -- reusing the same value as fa-ink-muted for consistency
};

const ACCESS_LABEL: Record<AccessType, string> = {
  'step-free':   'Level',
  'ramp':        'Ramp',
  'elevator':    'Elevator',
  'stairs-only': 'Stairs',
};

function NodeTypeIcon({ type }: { type: string }) {
  switch (type) {
    case 'gate':      return <>▶</>;
    case 'elevator':  return <>⊡</>;
    case 'ramp':      return <>⟋</>;
    case 'section':   return <>■</>;
    default:          return <>●</>;
  }
}

interface Props {
  route: RouteResult;
}

export function RouteMap({ route }: Props) {
  if (!route.found || route.steps.length === 0) return null;

  return (
    <div className="mb-4" aria-label="Route map">
      {/* Legend */}
      <div className="flex flex-wrap gap-5 mb-5" aria-label="Access type legend">
        {(Object.entries(ACCESS_LABEL) as [AccessType, string][]).map(([type, label]) => (
          <span key={type} className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide">
            <span className="inline-block w-6 h-0.5" style={{ backgroundColor: ACCESS_COLOR[type] }} aria-hidden="true" />
            <span style={{ color: ACCESS_COLOR[type] }}>{label}</span>
          </span>
        ))}
      </div>

      {/* Station-line strip */}
      <div className="overflow-x-auto border border-fa-border bg-white p-6">
        <div className="min-w-max">

          {/* Node labels row */}
          <div className="flex items-end mb-2">
            {route.steps.map((step, i) => (
              <div key={step.node.id} className="flex items-end">
                <div className="w-28 text-center">
                  <div className="text-[11px] font-bold text-fa-ink leading-tight px-1">
                    {step.node.label}
                  </div>
                  <div className="text-[10px] text-fa-ink-muted uppercase tracking-wide mt-0.5">
                    {step.node.type.replace(/_/g, ' ')}
                  </div>
                </div>
                {i < route.steps.length - 1 && (
                  <div className="w-20" />
                )}
              </div>
            ))}
          </div>

          {/* Rail + nodes row */}
          <div className="flex items-center">
            {route.steps.map((step, i) => {
              const nextStep = route.steps[i + 1];
              const lineColor = nextStep ? ACCESS_COLOR[nextStep.accessType] : ACCESS_COLOR[step.accessType];
              return (
                <div key={step.node.id} className="flex items-center">
                  {/* Node circle */}
                  <div className="w-28 flex justify-center">
                    <div
                      className="w-5 h-5 rounded-full border-[3px] bg-white flex items-center justify-center relative z-10 text-[8px]"
                      style={{ borderColor: ACCESS_COLOR[step.accessType] }}
                      aria-hidden="true"
                    >
                      <NodeTypeIcon type={step.node.type} />
                    </div>
                  </div>
                  {/* Connector */}
                  {nextStep && (
                    <div
                      className="w-20 h-0.5 flex-shrink-0"
                      style={{ backgroundColor: lineColor }}
                      aria-hidden="true"
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Distance row */}
          <div className="flex items-start mt-2">
            {route.steps.map((step, i) => (
              <div key={step.node.id} className="flex">
                <div className="w-28 text-center font-mono text-[11px] text-fa-ink-muted">
                  {step.cumulativeM}m
                  {step.distanceM > 0 && (
                    <span className="text-[10px] text-fa-ink-muted ml-1">(+{step.distanceM})</span>
                  )}
                </div>
                {i < route.steps.length - 1 && <div className="w-20" />}
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Summary bar */}
      <div className="flex flex-wrap gap-6 mt-3 px-1 text-xs text-fa-ink-muted">
        <span>
          <span className="font-bold font-mono text-fa-ink">{route.totalDistanceM}m</span>
          <span className="ml-1">total distance</span>
        </span>
        <span>
          <span className="font-bold font-mono text-fa-ink">{route.steps.length}</span>
          <span className="ml-1">waypoints</span>
        </span>
        {route.profiles.length > 0 && (
          <span>
            Routed for{' '}
            <span className="font-bold text-fa-route">{route.profiles.join(', ')}</span>
          </span>
        )}
      </div>
    </div>
  );
}