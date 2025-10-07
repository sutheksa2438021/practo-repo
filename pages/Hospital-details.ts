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

  async getCardText(card: Locator): Promise<string> {
    return await card.innerText();
  }
}

export class HospitalDetailPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(url: string) {
    await this.page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await this.page.waitForTimeout(3000);
  }

  async expandReadMore() {
    const readMore = this.page.locator(locators.HospitalDetailPage.readMoreButton);
    if (await readMore.isVisible({ timeout: 3000 })) {
      await readMore.click();
      await this.page.waitForTimeout(2000);
    }
  }

  async hasParking(): Promise<boolean> {
    const bodyText = await this.page.locator(locators.HospitalDetailPage.bodyText).innerText();
    return bodyText.includes("Parking");
  }
   async titleMatches(name: string): Promise<boolean> {
    const title = await this.page.title();
    return title.toLowerCase().includes(name.toLowerCase());
 
  async getHospitalName(card: Locator): Promise<string> {
    const nameLocator = card.locator(locators.HospitalListingPage.hospitalName).first();
    if (await nameLocator.isVisible({ timeout: 3000 })) {
      return (await nameLocator.textContent())?.trim() || 'Unknown';
    }
    return 'Unknown';
  }
}
