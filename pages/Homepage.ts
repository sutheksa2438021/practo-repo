import { Page } from '@playwright/test';

export class HomePage {
  constructor(private page: Page) {}

  async navigateToHome() {
    await this.page.goto('https://www.practo.com/');
  }

  async selectCity(city: string) {
    await this.page.fill("input[placeholder='Search location']", city);
    await this.page.keyboard.press('Enter');
  }

  async clickSearchHospitals() {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await this.page.click('text=Search for hospitals');
  }
}