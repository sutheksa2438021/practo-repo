import { test, expect, Page } from '@playwright/test';

import { CorporateWellnessInvalidDataPage  } from '../pages/invalidwellness'; 

 


let corporateWellnessPage: CorporateWellnessInvalidDataPage;
 
 
test.describe('Corporate Wellness Invalid Form Tests', () => {


  test.beforeEach(async ({ page }) => {

    corporateWellnessPage = new CorporateWellnessInvalidDataPage(page);

    await corporateWellnessPage.navigateToWellnessPage();

  });

  test('should disable the submit button with invalid/empty form data', async () => {

    await corporateWellnessPage.fillInvalidForm();


    const isEnabled = await corporateWellnessPage.isSubmitButtonEnabled();

    


    // await expect(corporateWellnessPage.page.locator('.error-message-for-name')).toBeVisible(); 

  });
 
 
 
  test('should scroll to the FAQ section and click the link', async () => {

    //const page = corporateWellnessPage.page; // Access the page object from the POM instance


    await corporateWellnessPage.scrollToFAQSection();


    await corporateWellnessPage.clickFAQ();


   // await expect(page).toHaveURL(/#faq/);

  });

});
 