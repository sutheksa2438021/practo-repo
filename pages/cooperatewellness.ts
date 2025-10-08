import { Page } from '@playwright/test';
import locators from '../locators/locators.json';

export class CorporateWellnessValidDataPage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('https://www.practo.com/', { waitUntil: 'domcontentloaded' });
  }

  async sendSms(phone: string) {
    await this.page.locator(locators.valid.phoneInput).fill(phone);
    await this.page.locator(locators.valid.sendSmsButton).click();
  }

  async verifySuccessMessage() {
    await this.page.locator(locators.valid.successMessage).waitFor({ state: 'visible', timeout: 15000 });
  }
}
