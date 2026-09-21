import { test, expect } from '@playwright/test';

const ROUTES = [
  '/',
  '/migration',
  '/performance',
  '/health-assessment',
  '/ai-consulting',
  '/contact',
  '/privacy',
  '/terms',
  '/cookies',
];

for (const route of ROUTES) {
  test(`${route} returns 200`, async ({ page }) => {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
  });
}
