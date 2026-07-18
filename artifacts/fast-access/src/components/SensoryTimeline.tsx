'use client';

export interface SensoryEvent {
  minute: number;
  name: string;
  type: 'noise' | 'light' | 'both';
  intensity: 'low' | 'medium' | 'high';
  durationMinutes: number | null;
}

function IntensityIcon({ intensity }: { intensity: SensoryEvent['intensity'] }) {
  const bars = intensity === 'high' ? 3 : intensity === 'medium' ? 2 : 1;
  return (
    <span className="inline-flex items-end gap-[2px]" aria-hidden="true">
      {[1, 2, 3].map((b) => (
        <span
          key={b}
          className="w-[3px] inline-block rounded-sm"
          style={{
            height: b === 1 ? 6 : b === 2 ? 9 : 12,
            backgroundColor: b <= bars
              ? intensity === 'high' ? '#C77D22' : '#2F6B5E'
              : '#E4E1DC',
          }}
        />
      ))}
    </span>
  );
}

function TypeIcon({ type }: { type: SensoryEvent['type'] }) {
  if (type === 'noise') {
    return (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path d="M2 5h3l3-3v12l-3-3H2V5z" fill="currentColor" />
        <path d="M10 4.5c1 .8 1.5 1.7 1.5 2.5s-.5 1.7-1.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      </svg>
    );
  }
  if (type === 'light') {
    return (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <circle cx="7" cy="7" r="2.5" fill="currentColor" />
        <path d="M7 1v1.5M7 11.5V13M1 7h1.5M11.5 7H13M2.6 2.6l1.1 1.1M10.3 10.3l1.1 1.1M2.6 11.4l1.1-1.1M10.3 3.7l1.1-1.1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2 5h3l3-3v12l-3-3H2V5z" fill="currentColor" />
      <circle cx="10" cy="7" r="2" fill="currentColor" />
    </svg>
  );
}

function formatMinute(m: number): string {
  if (m < 0) return `−${String(Math.abs(m)).padStart(2, '0')}`;
  return String(m).padStart(2, '0');
}

interface Props {
  events: SensoryEvent[];
  currentMinute: number;
}

export function SensoryTimeline({ events, currentMinute }: Props) {
  if (events.length === 0) {
    return (
      <p className="text-sm text-fa-ink-muted py-4">
        No sensory events in the next 30 minutes from minute {currentMinute}.
      </p>
    );
  }

  return (
    <div
      role="list"
      aria-label="Upcoming sensory events"
      className="border border-fa-border"
    >
      {/* Header row */}
      <div className="flex items-center gap-4 px-4 py-2 bg-fa-ink/5 border-b border-fa-border">
        <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-fa-ink-muted w-10">Min</span>
        <span className="text-[10px] font-bold uppercase tracking-widest text-fa-ink-muted flex-1">Event</span>
        <span className="text-[10px] font-bold uppercase tracking-widest text-fa-ink-muted w-20 text-right">Intensity</span>
      </div>

      {events.map((ev, i) => {
        const isActive = ev.minute <= currentMinute && (
          ev.durationMinutes === null || ev.minute + ev.durationMinutes > currentMinute
        );
        return (
          <div
            key={`${ev.minute}-${ev.name}`}
            role="listitem"
            aria-label={`Minute ${ev.minute}: ${ev.name}, ${ev.intensity} intensity`}
            className={[
              'flex items-center gap-4 px-4 py-3',
              i < events.length - 1 ? 'border-b border-fa-border' : '',
              isActive ? 'bg-fa-caution/5' : '',
            ].join(' ')}
          >
            {/* Time marker */}
            <span
              className={[
                'font-mono text-sm font-bold w-10 flex-shrink-0',
                isActive ? 'text-fa-caution' : 'text-fa-ink-muted',
              ].join(' ')}
              aria-hidden="true"
            >
              {formatMinute(ev.minute)}
            </span>

            {/* Event details */}
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <span
                className={isActive ? 'text-fa-caution' : 'text-fa-ink-muted'}
              >
                <TypeIcon type={ev.type} />
              </span>
              <span className="text-sm text-fa-ink font-medium truncate">{ev.name}</span>
              {isActive && (
                <span className="text-[10px] font-bold uppercase tracking-wide text-fa-caution bg-fa-caution/10 px-1.5 py-0.5 flex-shrink-0">
                  Now
                </span>
              )}
            </div>

            {/* Intensity indicator — icon + label, never color alone */}
            <div
              className="flex items-center gap-1.5 w-20 justify-end flex-shrink-0"
              aria-hidden="true"
            >
              <span className={`text-xs font-bold uppercase tracking-wide ${ev.intensity === 'high' ? 'text-fa-caution' : 'text-fa-calm'}`}>
                {ev.intensity}
              </span>
              <IntensityIcon intensity={ev.intensity} />
            </div>
          </div>
        );
      })}
    </div>
  );
}