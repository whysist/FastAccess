import { describe, it, expect } from 'vitest';
import { getSensoryEvents } from './schedule';

describe('getSensoryEvents', () => {
  it('returns kickoff pyro at minute 0 within a 30-min window', () => {
    const events = getSensoryEvents(0, 30);
    const names = events.map((e) => e.name);
    expect(names).toContain('Kickoff Pyrotechnics');
  });

  it('returns events within the window, not beyond it', () => {
    // At minute 0 with window 5, only minute 0–4 events should appear
    const events = getSensoryEvents(0, 5);
    for (const ev of events) {
      const evEnd = ev.durationMinutes !== null ? ev.minute + ev.durationMinutes : ev.minute + 1;
      // Either it starts within the window or is currently active
      const startsInWindow = ev.minute >= 0 && ev.minute < 5;
      const isActive = ev.minute <= 0 && evEnd > 0;
      expect(startsInWindow || isActive).toBe(true);
    }
  });

  it('includes active events even if they started before current minute', () => {
    // National Anthem starts at -5 with 3 min duration; at minute -3 it is active
    const events = getSensoryEvents(-3, 10);
    const anthem = events.find((e) => e.name === 'National Anthem');
    expect(anthem).toBeDefined();
  });

  it('does not include events entirely before the current minute', () => {
    // At minute 10, warm-up music (starts -15, lasts 10 mins, ends -5) should not appear
    const events = getSensoryEvents(10, 30);
    const warmUp = events.find((e) => e.name === 'Team Warm-Up Music');
    expect(warmUp).toBeUndefined();
  });

  it('returns events sorted by minute ascending', () => {
    const events = getSensoryEvents(-20, 120);
    for (let i = 1; i < events.length; i++) {
      expect(events[i].minute).toBeGreaterThanOrEqual(events[i - 1].minute);
    }
  });

  it('returns halftime show at minute 45', () => {
    const events = getSensoryEvents(44, 5);
    const halftime = events.find((e) => e.name === 'Halftime Show Begins');
    expect(halftime).toBeDefined();
    expect(halftime?.intensity).toBe('high');
  });

  it('returns final whistle at minute 90', () => {
    const events = getSensoryEvents(88, 10);
    const final = events.find((e) => e.name === 'Final Whistle Pyrotechnics');
    expect(final).toBeDefined();
  });

  it('returns empty array when well outside all events', () => {
    const events = getSensoryEvents(200, 10);
    expect(events).toHaveLength(0);
  });

  it('uses 30-minute default window', () => {
    const explicit = getSensoryEvents(0, 30);
    const def      = getSensoryEvents(0);
    expect(def).toEqual(explicit);
  });
});
