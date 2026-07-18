'use client';

import { useState, useEffect, useCallback } from 'react';
import { VENUE_NODES } from '@/lib/venue/graph';
import { ProfileSelector } from './ProfileSelector';
import { RouteMap } from './RouteMap';
import { RouteNarration } from './RouteNarration';
import { SensoryTimeline, type SensoryEvent } from './SensoryTimeline';
import { QuietZoneFinder } from './QuietZoneFinder';
import { QueryBox } from './QueryBox';

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

function Divider() {
  return <div className="h-px bg-fa-border" aria-hidden="true" />;
}

function SectionHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="text-[11px] font-bold tracking-[0.2em] uppercase text-fa-ink-muted mb-5"
    >
      {children}
    </h2>
  );
}

function FieldLabel({ htmlFor, children }: { htmlFor?: string; children: React.ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-[10px] font-bold uppercase tracking-widest text-fa-ink-muted mb-1.5"
    >
      {children}
    </label>
  );
}

function WarningIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="flex-shrink-0">
      <path d="M7 1.5L13 12.5H1L7 1.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M7 5.5V8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="7" cy="10.5" r="0.75" fill="currentColor" />
    </svg>
  );
}

export function FastAccessApp() {
  const [profiles, setProfiles] = useState<string[]>(['wheelchair']);
  const [fromNode, setFromNode] = useState('gate-north');
  const [toNode, setToNode] = useState('section-104');
  const [route, setRoute] = useState<RouteResult | null>(null);
  const [routeLoading, setRouteLoading] = useState(false);
  const [routeError, setRouteError] = useState<string | null>(null);
  const [matchMinute, setMatchMinute] = useState(0);
  const [forecast, setForecast] = useState<SensoryEvent[]>([]);

  const planRoute = useCallback(async () => {
    setRouteLoading(true);
    setRouteError(null);
    try {
      const params = new URLSearchParams({ from: fromNode, to: toNode });
      profiles.forEach((p) => params.append('profiles', p));
      const res = await fetch(`/api/route?${params.toString()}`);
      if (res.status === 404) {
        const err = await res.json();
        setRouteError(err.error ?? 'No accessible route found with your selected profiles.');
        setRoute(null);
      } else if (!res.ok) {
        const err = await res.json();
        setRouteError(err.error ?? 'Route planning failed.');
        setRoute(null);
      } else {
        setRoute(await res.json());
      }
    } catch {
      setRouteError('Network error. Please try again.');
    } finally {
      setRouteLoading(false);
    }
  }, [fromNode, toNode, profiles]);

  const loadForecast = useCallback(async () => {
    try {
      const res = await fetch(`/api/forecast?minute=${matchMinute}&window=30`);
      if (res.ok) setForecast(await res.json());
    } catch {
      // silent — forecast is supplementary
    }
  }, [matchMinute]);

  // Initial load
  useEffect(() => {
    planRoute();
    loadForecast();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reload forecast when minute changes
  useEffect(() => {
    loadForecast();
  }, [loadForecast]);

  return (
    <div className="space-y-10">

      {/* ── Access Profile Selection ─────────────────────────────────── */}
      <section aria-labelledby="profiles-heading">
        <SectionHeading id="profiles-heading">Select Access Profiles</SectionHeading>
        <ProfileSelector selected={profiles} onChange={setProfiles} />
      </section>

      <Divider />

      {/* ── Route Planner ────────────────────────────────────────────── */}
      <section aria-labelledby="route-heading">
        <SectionHeading id="route-heading">Plan Route</SectionHeading>

        <div className="flex flex-wrap gap-4 items-end mb-6">
          {/* From */}
          <div>
            <FieldLabel htmlFor="from-select">From</FieldLabel>
            <select
              id="from-select"
              value={fromNode}
              onChange={(e) => setFromNode(e.target.value)}
              className="h-11 px-3 border border-fa-border bg-white text-fa-ink text-sm font-bold uppercase tracking-wide min-w-[210px]
                         focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-fa-route focus-visible:ring-offset-[3px]"
            >
              {VENUE_NODES.map((n) => (
                <option key={n.id} value={n.id}>{n.label}</option>
              ))}
            </select>
          </div>

          {/* To */}
          <div>
            <FieldLabel htmlFor="to-select">To</FieldLabel>
            <select
              id="to-select"
              value={toNode}
              onChange={(e) => setToNode(e.target.value)}
              className="h-11 px-3 border border-fa-border bg-white text-fa-ink text-sm font-bold uppercase tracking-wide min-w-[210px]
                         focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-fa-route focus-visible:ring-offset-[3px]"
            >
              {VENUE_NODES.map((n) => (
                <option key={n.id} value={n.id}>{n.label}</option>
              ))}
            </select>
          </div>

          {/* Plan button */}
          <div className="mt-auto">
            <button
              onClick={planRoute}
              disabled={routeLoading}
              aria-busy={routeLoading}
              className="h-11 px-7 bg-fa-route text-white font-bold text-sm uppercase tracking-wider
                         disabled:opacity-40 hover:bg-[#163f75] transition-colors
                         focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-fa-route focus-visible:ring-offset-[3px]"
            >
              {routeLoading ? 'Planning…' : 'Plan Route'}
            </button>
          </div>
        </div>

        {/* Error */}
        {routeError && (
          <p role="alert" className="flex items-start gap-2 text-fa-caution text-sm font-bold mb-6">
            <WarningIcon />
            {routeError}
          </p>
        )}

        {/* Route result */}
        {route && (
          <>
            <RouteMap route={route} />
            <RouteNarration route={route} />
          </>
        )}
      </section>

      <Divider />

      {/* ── Sensory Timeline + Quiet Zones ───────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        <section aria-labelledby="timeline-heading">
          <SectionHeading id="timeline-heading">Sensory Timeline (Next 30 min)</SectionHeading>
          <div className="flex items-center gap-3 mb-4">
            <FieldLabel htmlFor="minute-input">Match Minute</FieldLabel>
            <input
              id="minute-input"
              type="number"
              value={matchMinute}
              onChange={(e) => setMatchMinute(Number(e.target.value))}
              className="w-20 h-9 border border-fa-border px-3 font-mono text-sm bg-white text-fa-ink
                         focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-fa-route focus-visible:ring-offset-[3px]"
              aria-label="Current match minute"
            />
          </div>
          <SensoryTimeline events={forecast} currentMinute={matchMinute} />
        </section>

        <section aria-labelledby="quiet-heading">
          <SectionHeading id="quiet-heading">Nearest Quiet Zones</SectionHeading>
          <QuietZoneFinder currentNodeId={fromNode} profiles={profiles} />
        </section>
      </div>

      <Divider />

      {/* ── Natural Language Query ───────────────────────────────────── */}
      <section aria-labelledby="query-heading">
        <SectionHeading id="query-heading">Ask a Question</SectionHeading>
        <QueryBox />
      </section>

    </div>
  );
}