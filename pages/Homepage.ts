import { Page } from '@playwright/test';
import locators from '../locators/locators.json';
 
export class Homepage {
  readonly page: Page;
 
  constructor(page: Page) {
    this.page = page;
  }
 
  async navigate() {
    await this.page.goto('https://www.practo.com', { waitUntil: 'domcontentloaded' });
  }
 
  async setLocation(city: string) {
    const locationInput = this.page.locator(locators.HomePage.locationInput);
    await locationInput.click();
    await locationInput.clear();
    await locationInput.fill(city);
    await this.page.keyboard.press('Enter');
    await this.page.waitForTimeout(2000);
  }
 
  async clickSearchHospitalsFooter() {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await this.page.waitForTimeout(2000);
    const hospitalLink = this.page.locator(locators.HomePage.searchHospitalsFooterLink);
    await hospitalLink.click();
    await this.page.waitForLoadState('domcontentloaded');
  }
}
 
 