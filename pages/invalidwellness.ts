import {Page} from '@playwright/test';

export class CorporateWellnessInvalidDataPage {
  constructor(private page: Page) {}

  async navigateToWellnessPage() {
    await this.page.goto('https://www.practo.com/corporate-wellness');
  }

  async fillInvalidForm() {
    await this.page.fill('#name', '');
    await this.page.fill('#organizationName', '');
    await this.page.fill('#contactNumber', '123');
    await this.page.fill('#email', 'invalid-email');
    await this.page.selectOption('#organizationSize', { label: 'Select' });
    await this.page.selectOption('#interestedIn', { label: 'Select' });
  }

  async isSubmitButtonEnabled(): Promise<boolean> {
    return await this.page.locator('button:has-text("Schedule a demo")').isEnabled();
  }

  async clickFAQ() {
    await this.page.click('text=FAQ');
  }

  async scrollToFAQSection() {
    const faqSection = this.page.locator('section:has-text("Frequently Asked Questions")'); // Adjust selector if needed
    await faqSection.scrollIntoViewIfNeeded();
  }

  async getErrorMessage() {
    return await this.page.locator('.alert-message').textContent(); // Update selector if needed
  }
}