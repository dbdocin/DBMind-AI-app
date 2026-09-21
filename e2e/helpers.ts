import type { Page } from '@playwright/test';

/** Dismisses the first-visit cookie banner via "Accept all" so it doesn't
 *  visually overlap form controls in tests that don't care about consent. */
export async function acceptCookies(page: Page): Promise<void> {
  const acceptButton = page.getByRole('button', { name: 'Accept all' });
  if (await acceptButton.isVisible().catch(() => false)) {
    await acceptButton.click();
  }
}
