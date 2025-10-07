import { chromium, test } from '@playwright/test';
import { Homepage } from '../pages/Homepage';
import { HospitalListingPage} from '../pages/Hospital-details';
 
test.setTimeout(180000);
 
test('Hospital search and validation on Practo', async () => {
  const browser = await chromium.launch({
    headless: false,
    args: ['--disable-blink-features=AutomationControlled']
  });
 
  const context = await browser.newContext();
  const page = await context.newPage();
 
  const homepage = new Homepage(page);
  await homepage.navigate();
  await homepage.setLocation('Bangalore');
  await homepage.clickSearchHospitalsFooter();
 
  const listingPage = new HospitalListingPage(page);
  await listingPage.scrollToLoadHospitals();
 
  const count = await listingPage.getHospitalCount();
  console.log("Hospitals with 24x7, Rating > 3.5 and Parking:\n");
});