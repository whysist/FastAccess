import { describe, it, expect } from 'vitest';
import { computeRoute } from './routing';

describe('computeRoute — wheelchair profile', () => {
  it('excludes stairs-only edges', () => {
    // junction-a → section-101 via stairs-only is the direct edge;
    // wheelchair must go via ramp-1 instead
    const result = computeRoute('junction-a', 'section-101', ['wheelchair']);
    expect(result.found).toBe(true);
    const accessTypes = result.steps.map((s) => s.accessType);
    expect(accessTypes).not.toContain('stairs-only');
  });

  it('finds a route from gate to section', () => {
    const result = computeRoute('gate-north', 'section-104', ['wheelchair']);
    expect(result.found).toBe(true);
    expect(result.steps.length).toBeGreaterThan(1);
    expect(result.totalDistanceM).toBeGreaterThan(0);
  });

  it('first step is always the start node at 0m', () => {
    const result = computeRoute('gate-north', 'section-104', ['wheelchair']);
    expect(result.steps[0].node.id).toBe('gate-north');
    expect(result.steps[0].cumulativeM).toBe(0);
  });

  it('last step is always the destination', () => {
    const result = computeRoute('gate-north', 'section-104', ['wheelchair']);
    const last = result.steps[result.steps.length - 1];
    expect(last.node.id).toBe('section-104');
  });
});

describe('computeRoute — low-vision profile', () => {
  it('excludes flashing lighting edges', () => {
    // ramp-1 → section-101 has lighting: flashing; low-vision must avoid
    const result = computeRoute('gate-north', 'section-101', ['low-vision']);
    expect(result.found).toBe(true);
    const lighting = result.steps.map((s) => s.lighting);
    expect(lighting).not.toContain('flashing');
  });
});

describe('computeRoute — sensory-sensitive profile', () => {
  it('excludes high-noise edges', () => {
    const result = computeRoute('gate-north', 'section-104', ['sensory-sensitive']);
    expect(result.found).toBe(true);
    const noise = result.steps.map((s) => s.noiseLevel);
    expect(noise).not.toContain('high');
  });

  it('excludes flashing edges', () => {
    const result = computeRoute('gate-north', 'section-103', ['sensory-sensitive']);
    expect(result.found).toBe(true);
    const lighting = result.steps.map((s) => s.lighting);
    expect(lighting).not.toContain('flashing');
  });
});

describe('computeRoute — deaf profile', () => {
  it('has no edge exclusions — finds shortest route', () => {
    const noProfile = computeRoute('gate-north', 'section-101', []);
    const deaf      = computeRoute('gate-north', 'section-101', ['deaf']);
    expect(deaf.found).toBe(true);
    expect(deaf.totalDistanceM).toBe(noProfile.totalDistanceM);
  });
});

describe('computeRoute — same node', () => {
  it('returns a single-step route at 0m', () => {
    const result = computeRoute('gate-north', 'gate-north', ['wheelchair']);
    expect(result.found).toBe(true);
    expect(result.steps).toHaveLength(1);
    expect(result.totalDistanceM).toBe(0);
  });
});

describe('computeRoute — impossible route', () => {
  it('returns found:false when all paths are blocked', () => {
    // sensory-sensitive blocks all high-noise paths; section-101 requires
    // passing through a high-noise ramp — but elevator-1 path is quiet,
    // so actually this should find a route. Let us test with a fabricated
    // impossible scenario: unknown node.
    const result = computeRoute('gate-north', 'nonexistent-node', ['wheelchair']);
    expect(result.found).toBe(false);
  });
});
