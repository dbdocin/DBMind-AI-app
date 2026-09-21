import { test, expect, type Page } from '@playwright/test';
import { acceptCookies } from './helpers';

/** Fills step 1 (Contact) and step 2 (Your database) with the minimum valid
 *  data, advancing to step 3 (Project & consent). Shared by both the happy
 *  path and the consent-validation regression test below. */
async function advanceToConsentStep(page: Page): Promise<void> {
  await page.goto('/contact');
  await acceptCookies(page);

  // Step 1 — Contact
  await page.getByLabel('Name').fill('Test User');
  await page.getByLabel('Work email').fill('test.user@example.com');
  await page.getByRole('button', { name: 'Next' }).click();

  // Step 2 — Your database
  await page.getByRole('checkbox', { name: 'Database Health Assessment' }).click();
  await page.getByRole('checkbox', { name: 'PostgreSQL' }).click();
  await page.getByLabel('Environment').selectOption({ label: 'AWS' });
  await page.getByRole('button', { name: 'Next' }).click();

  await expect(page.getByText('Project & consent')).toBeVisible();
}

test('full assessment wizard flow succeeds and shows a DBM- reference', async ({ page }) => {
  await advanceToConsentStep(page);

  // Step 3 — Project & consent. Despite a comment in ConsentSection.tsx
  // claiming only privacy consent is required, AssessmentWizard's
  // validateStep() actually enforces both privacy and terms — see
  // components/assessment/AssessmentWizard.tsx's step-2 validation.
  await page.locator('input[type="checkbox"]').nth(0).check(); // privacy
  await page.locator('input[type="checkbox"]').nth(1).check(); // terms
  await page.getByRole('button', { name: 'Request my assessment' }).click();

  // Generous timeout: the dev server compiles /api/leads on-demand on its
  // first hit, which can comfortably exceed the default 5s assertion window.
  await expect(page.getByText('Assessment request received')).toBeVisible({ timeout: 15_000 });
  await expect(page.getByText(/^DBM-\d+$/)).toBeVisible();
});

test('regression: submitting without privacy consent shows an inline error, not silence', async ({ page }) => {
  await advanceToConsentStep(page);

  // Deliberately leave the privacy checkbox unchecked and submit anyway.
  // This used to fail silently: AssessmentWizard's SET_STEP action
  // unconditionally cleared `errors`, so a SET_ERRORS dispatch immediately
  // followed by SET_STEP wiped out the very error it had just set. Fixed via
  // a dedicated JUMP_TO_STEP_WITH_ERRORS action — see
  // components/assessment/AssessmentWizard.tsx.
  await page.getByRole('button', { name: 'Request my assessment' }).click();

  await expect(page.getByText('You must agree to this to submit the form')).toBeVisible();
  // And the submission must not have gone through.
  await expect(page.getByText('Assessment request received')).not.toBeVisible();
});
