import { test, expect } from '@playwright/test';

test('cookie banner appears on first load and "Accept all" dismisses it', async ({ page }) => {
  await page.goto('/');

  const banner = page.getByRole('dialog', { name: 'Cookie preferences' });
  await expect(banner).toBeVisible();

  await page.getByRole('button', { name: 'Accept all' }).click();
  await expect(banner).not.toBeVisible();
});
