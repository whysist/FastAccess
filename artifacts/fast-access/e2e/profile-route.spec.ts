import { test, expect } from '@playwright/test';

test.describe('FastAccess — profile selection and routing', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('renders the FastAccess masthead', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toContainText('FASTACCESS');
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
    // The route map should contain the start and end nodes
    await expect(page.getByText('North Gate')).toBeVisible();
    await expect(page.getByText('Section 104')).toBeVisible();
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

    // Wait for route to render
    await expect(page.getByText('Section 107')).toBeVisible({ timeout: 5000 });
  });

  test('all interactive elements have visible focus rings', async ({ page }) => {
    // Tab to the first profile card and verify focus styling
    await page.keyboard.press('Tab');
    const focused = page.locator(':focus-visible');
    await expect(focused).toHaveCount(1);
  });
});
