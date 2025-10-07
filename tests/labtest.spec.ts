import { chromium, test } from '@playwright/test';
//import { PageFixture  } from '../fixtures/page-fixtures';
//import { Homepage } from '../pages/Homepage';
//import { HospitalListingPage, HospitalDetailPage } from '../pages/Hospital-details';
import {LabTestPage} from '../pages/Labtests';

test('Extract health packages and prices', async ({ }) => {
  const browser = await chromium.launch({
    headless: false,
    args: ['--disable-blink-features=AutomationControlled']
  });
 
  const context = await browser.newContext();
  const page = await context.newPage();
  const labt=new LabTestPage(page);
  await labt.navigate();
  await labt.handleModal();
  await labt.scrollToLoadPackages();
  await labt.extractPackages();
});
