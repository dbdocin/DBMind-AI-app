import { test, expect } from '@playwright/test';
import { acceptCookies } from './helpers';

test.use({ viewport: { width: 375, height: 667 } });

// Regression test for a real bug: `backdrop-filter` on the sticky header
// made it a containing block for any `position: fixed` descendant, so the
// mobile off-canvas menu anchored to the 72px header box instead of the
// real viewport and glitched while scrolling. Fixed by rendering the menu
// as a sibling of <header>, not a child — see components/layout/Header.tsx.
test('regression: opening the mobile menu shows every nav link without scrolling', async ({ page }) => {
  await page.goto('/');
  await acceptCookies(page);

  await page.getByRole('button', { name: 'Toggle menu' }).click();

  const mobileNav = page.getByRole('navigation', { name: 'Mobile' });
  const labels = ['Home', 'Migration', 'Performance', 'Health Assessment', 'AI Consulting', 'Contact'];
  for (const label of labels) {
    await expect(mobileNav.getByRole('link', { name: label, exact: true })).toBeInViewport();
  }
});
