import { test, expect } from '@playwright/test';
import { CorporateWellnessValidDataPage } from '../pages/cooperatewellness';
 
test.describe('Corporate Wellness Form - Valid Data Submission', () => {
  let wellnessPage: CorporateWellnessValidDataPage;
 
  test.beforeEach(async ({ page }) => {
    wellnessPage = new CorporateWellnessValidDataPage(page);
    await wellnessPage.navigateToWellnessPage();
  });
 
  test('should enable submit button and show success message with valid input', async () => {
    await wellnessPage.fillValidForm();
 
    const isEnabled = await wellnessPage.isSubmitButtonEnabled();
    expect(isEnabled).toBe(true);
 
    await wellnessPage.submitForm();
 
    const successMessage = await wellnessPage.getSuccessMessage();
    expect(successMessage).toContain('Thank you'); // Adjust expected text based on actual message
  });
});