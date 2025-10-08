import { chromium, test, expect } from '@playwright/test';
import { CooperateWellnessInvalidDataPage } from '../pages/invalidwellness';
import {readCSV} from '../utils/readCSV';
 
type WellnessFormData = {
  Name: string;
  OrganizationName: string;
  ContactNumber: string;
  Email: string;
  OrganizationSize: string;
  InterestedIn: string;
};
 
const invalidData = readCSV('invalidtestdata.csv') as WellnessFormData[];
 
for (const data of invalidData) {
  test(`Form should not submit with invalid data: ${data.Name}`, async () => {
    // Launch Chromium with automation detection disabled
    const browser = await chromium.launch({
      headless: false,
      args: ['--disable-blink-features=AutomationControlled']
    });
 
    const context = await browser.newContext();
    const page = await context.newPage();
 
    const wellnessPage = new CooperateWellnessInvalidDataPage(page);
 
    await wellnessPage.navigateToForm();
    await wellnessPage.fillInvalidFormData(data);
     const submitButton = await wellnessPage.getSubmitButton();
 
    // Scroll into view and wait for visibility
    await submitButton.scrollIntoViewIfNeeded();
    await submitButton.waitFor({ state: 'attached' });
 
    await expect(submitButton).toBeDisabled();
 
    console.log(`Assertion Passed: Submission button is disabled for ${data.Name}`);
    // FAQ part of the test remains the same in function calls
    await wellnessPage.clickFAQLink();
    console.log("Clicked the 'FAQs' link.");

    await wellnessPage.assertFAQVisible();
    console.log("Assertion Passed: The 'FAQs' section is visible after clicking the link.");
            
    // Close the browser after the test, as per Code 2's pattern
    await browser.close();
    });
}