export type SensoryEventType = 'noise' | 'light' | 'both';
export type SensoryIntensity = 'low' | 'medium' | 'high';

export interface SensoryEvent {
  minute: number;
  name: string;
  type: SensoryEventType;
  intensity: SensoryIntensity;
  durationMinutes: number | null;
}

/**
 * Fixed match-day sensory schedule.
 * Minutes are relative to kickoff (minute 0). Negative = pre-kickoff.
 */
const SCHEDULE: SensoryEvent[] = [
  { minute: -15, name: 'Team Warm-Up Music',           type: 'noise', intensity: 'medium', durationMinutes: 10 },
  { minute:  -5, name: 'National Anthem',              type: 'both',  intensity: 'high',   durationMinutes: 3  },
  { minute:   0, name: 'Kickoff Pyrotechnics',         type: 'both',  intensity: 'high',   durationMinutes: 2  },
  { minute:  23, name: 'Goal Celebration — Home',      type: 'both',  intensity: 'high',   durationMinutes: 3  },
  { minute:  40, name: 'Pre-Halftime Music',           type: 'noise', intensity: 'medium', durationMinutes: 5  },
  { minute:  45, name: 'Halftime Show Begins',         type: 'both',  intensity: 'high',   durationMinutes: 15 },
  { minute:  60, name: 'Second Half Kickoff',          type: 'noise', intensity: 'medium', durationMinutes: 2  },
  { minute:  67, name: 'Goal Celebration — Away',      type: 'both',  intensity: 'high',   durationMinutes: 3  },
  { minute:  80, name: 'Crowd Surge — Late Drama',     type: 'noise', intensity: 'high',   durationMinutes: null },
  { minute:  90, name: 'Final Whistle Pyrotechnics',   type: 'both',  intensity: 'high',   durationMinutes: 4  },
  { minute:  92, name: 'Victory Celebration Music',    type: 'noise', intensity: 'medium', durationMinutes: 10 },
];

/**
 * Pure function — returns events active or upcoming within [minute, minute + windowMinutes).
 */
export function getSensoryEvents(currentMinute: number, windowMinutes = 30): SensoryEvent[] {
  const windowEnd = currentMinute + windowMinutes;
  return SCHEDULE.filter((ev) => {
    const evEnd = ev.durationMinutes !== null ? ev.minute + ev.durationMinutes : ev.minute + 1;
    const isActive   = ev.minute <= currentMinute && evEnd > currentMinute;
    const isUpcoming = ev.minute >= currentMinute && ev.minute < windowEnd;
    return isActive || isUpcoming;
  }).sort((a, b) => a.minute - b.minute);
}
