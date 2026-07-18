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

function describeStep(step: RouteStep, index: number, total: number): string {
  if (index === 0) return `Start at ${step.node.label}.`;

  const via = {
    'step-free':   'Walk (level, step-free)',
    'ramp':        'Take the ramp',
    'elevator':    'Take the elevator',
    'stairs-only': 'Use the stairs',
  }[step.accessType];

  const isLast = index === total - 1;
  return `${via} ${step.distanceM}m to ${step.node.label}${isLast ? ' — you have arrived.' : '.'}`;
}

interface Props {
  route: RouteResult;
}

export function RouteNarration({ route }: Props) {
  if (!route.found || route.steps.length === 0) return null;

  return (
    <section aria-labelledby="narration-heading" className="mt-6 border-t border-fa-border pt-5">
      <h3
        id="narration-heading"
        className="text-xs font-bold tracking-[0.2em] uppercase text-fa-ink/50 mb-4"
      >
        Step-by-step directions
      </h3>

      {/* aria-live region — updates are announced to screen readers */}
      <ol
        aria-live="polite"
        aria-atomic="false"
        className="space-y-0"
        aria-label="Turn-by-turn directions"
      >
        {route.steps.map((step, i) => (
          <li
            key={step.node.id}
            className={[
              'flex items-start gap-4 py-3',
              i < route.steps.length - 1 ? 'border-b border-fa-border' : '',
            ].join(' ')}
          >
            {/* Step number */}
            <span
              className="font-mono text-[11px] text-fa-ink/40 w-6 flex-shrink-0 pt-0.5 select-none"
              aria-hidden="true"
            >
              {String(i + 1).padStart(2, '0')}
            </span>

            {/* Direction text */}
            <span className="text-sm text-fa-ink leading-relaxed flex-1">
              {describeStep(step, i, route.steps.length)}
            </span>

            {/* Distance badge (skip first step) */}
            {step.distanceM > 0 && (
              <span
                className="font-mono text-[11px] text-fa-ink/50 flex-shrink-0 pt-0.5"
                aria-label={`${step.distanceM} metres`}
              >
                {step.distanceM}m
              </span>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
