import { Page, Locator } from '@playwright/test';
import locators from '../locators/locators.json';
 
export class HospitalListingPage {
  readonly page: Page;
  readonly hospitalCards: Locator;
 
  constructor(page: Page) {
    this.page = page;
    this.hospitalCards = page.locator(locators.HospitalListingPage.hospitalCard);
  }
 
  async scrollToLoadHospitals() {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await this.page.waitForTimeout(3000);
  }
 
  async getHospitalCount(): Promise<number> {
    return await this.hospitalCards.count();
  }
 
  async getHospitalCard(index: number): Promise<Locator> {
    return this.hospitalCards.nth(index);
  }
 
  async getHospitalName(card: Locator): Promise<string> {
    const nameLocator = card.locator(locators.HospitalListingPage.hospitalName).first();
    if (await nameLocator.isVisible({ timeout: 3000 })) {
      return (await nameLocator.textContent())?.trim() || 'Unknown';
    }
    return 'Unknown';
  }
  async getHospitalLink(card: Locator): Promise<string | null> {
    const link = await card.locator(locators.HospitalListingPage.hospitalLink).first().getAttribute("href");
    return link?.startsWith("http") ? link : `https://www.practo.com${link}`;
  }
 
}