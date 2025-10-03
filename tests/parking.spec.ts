import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/Homepage';
import { HospitalDetailsPage } from '../pages/Hospital-details';

test.describe('Hospital Search and Verification', () => {
  let homePage: HomePage;
  let hospitalPage: HospitalDetailsPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    hospitalPage = new HospitalDetailsPage(page);

    await homePage.navigateToHome();
    await homePage.selectCity('Bangalore');
    await homePage.clickSearchHospitals();
  });

  test('Verify hospital pages for 24x7 hospitals with rating > 3.5', async ({ page }) => {
    await hospitalPage.applyFilters();

    const cards = await hospitalPage.getHospitalCards();
    const matchingHospitals: { name: string; rating: number; link: any }[] = [];

    

        });
});