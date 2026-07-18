import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

function formatViolations(violations: Awaited<ReturnType<AxeBuilder['analyze']>>['violations']): string {
  if (violations.length === 0) return 'none';
  return violations
    .map(
      (v) =>
        `[${v.impact ?? 'unknown'}] ${v.id}: ${v.help}\n  affected: ${v.nodes
          .map((n) => n.target.join(' '))
          .join(', ')}`,
    )
    .join('\n\n');
}

test.describe('FastAccess — automated accessibility scan', () => {
  test('home page has zero axe violations on initial load', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const results = await new AxeBuilder({ page }).analyze();
    // Printed on failure via the custom message, instead of dumping axe's
    // full verbose result object into an unreadable toEqual() diff.
    expect(results.violations, formatViolations(results.violations)).toEqual([]);
  });

  test('home page has zero axe violations after selecting a profile and planning a route', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /low vision/i }).click();
    await page.getByRole('button', { name: /plan route/i }).click();
    await page.waitForLoadState('networkidle');

    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations, formatViolations(results.violations)).toEqual([]);
  });
});