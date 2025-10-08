import { chromium, test } from '@playwright/test';
import { Homepage } from '../pages/Homepage';
import { HospitalDetailPage, HospitalListingPage} from '../pages/Hospital-details';
 
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
  for (let i = 0; i < count; i++) {
    const card = await listingPage.getHospitalCard(i);
    const cardText = await listingPage.getCardText(card);

    console.log(`🔍 Inspecting card ${i + 1}/${count}`);

    const name = await listingPage.getHospitalName(card);
    const is24x7 = cardText.includes("Open 24x7");
    const ratingMatch = cardText.match(/(\d\.\d)\s*\(\d+\s*rated\)/);
    const rating = ratingMatch ? parseFloat(ratingMatch[1]) : 0;

    if (is24x7 && rating > 3.5 && name !== 'Unknown') {
      const hospitalUrl = await listingPage.getHospitalLink(card);
      if (!hospitalUrl) continue;

      console.log(`➡️ Visiting: ${name} — Rating: ${rating}`);

      const hospitalPage = await context.newPage();
      const detailPage = new HospitalDetailPage(hospitalPage);

      try {
        await detailPage.navigateTo(hospitalUrl);
        await detailPage.expandReadMore();

        const hasParking = await detailPage.hasParking();
        const titleMatches = await detailPage.titleMatches(name);

        if (hasParking && titleMatches) {
          console.log(`✅ ${name} — Rating: ${rating} — Open 24x7 — Parking Available`);
        } else {
          console.log(`❌ ${name} — Rating: ${rating} — Conditions not fully met`);
        }
      } catch (error) {
        console.log(`⚠️ Failed to load ${hospitalUrl}: ${error}`);
      } finally {
        await hospitalPage.close();
      }
    } else {
      console.log(`⛔ Skipped: ${name} — Rating: ${rating} — 24x7: ${is24x7}`);
    }
  }

  await browser.close();
});
