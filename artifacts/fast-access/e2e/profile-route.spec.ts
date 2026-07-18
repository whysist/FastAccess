import { test, expect } from '@playwright/test';

test.describe('FastAccess — profile selection and routing', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('renders the FastAccess masthead', async ({ page }) => {
    // The heading's DOM text is "FastAccess" -- visual all-caps comes from
    // a CSS text-transform, not the underlying text content -- so match
    // case-insensitively rather than asserting a specific casing.
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/fastaccess/i);
  });

  test('wheelchair profile is selected by default', async ({ page }) => {
    const btn = page.getByRole('button', { name: /wheelchair/i });
    await expect(btn).toHaveAttribute('aria-pressed', 'true');
  });

  test('can toggle a second profile on and off', async ({ page }) => {
    const lowVision = page.getByRole('button', { name: /low vision/i });
    await expect(lowVision).toHaveAttribute('aria-pressed', 'false');

    await lowVision.click();
    await expect(lowVision).toHaveAttribute('aria-pressed', 'true');

    await lowVision.click();
    await expect(lowVision).toHaveAttribute('aria-pressed', 'false');
  });

  test('initial route from North Gate to Section 104 renders', async ({ page }) => {
    // Scope to the route map specifically -- "North Gate"/"Section 104"
    // also appear as <option> text in the From/To selects, which makes an
    // unscoped page-wide text search ambiguous by design.
    const routeMap = page.getByLabel('Route map');
    await expect(routeMap.getByText('North Gate')).toBeVisible();
    await expect(routeMap.getByText('Section 104')).toBeVisible();
  });

  test('selecting a profile and clicking Plan Route returns a valid route', async ({ page }) => {
    // Ensure wheelchair is selected
    const wheelchairBtn = page.getByRole('button', { name: /wheelchair/i });
    if ((await wheelchairBtn.getAttribute('aria-pressed')) !== 'true') {
      await wheelchairBtn.click();
    }

    // Change destination
    await page.selectOption('#to-select', 'section-107');
    await page.getByRole('button', { name: /plan route/i }).click();

    // Wait for route to render, scoped to the route map to avoid matching
    // the still-present <option value="section-107"> in the two selects.
    await expect(page.getByLabel('Route map').getByText('Section 107')).toBeVisible({ timeout: 5000 });
  });

  test('all interactive elements have visible focus rings', async ({ page }) => {
    // Tab to the first profile card and verify focus styling
    await page.keyboard.press('Tab');
    const focused = page.locator(':focus-visible');
    await expect(focused).toHaveCount(1);
  });
});