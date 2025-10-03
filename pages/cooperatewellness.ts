import { Page } from '@playwright/test';

// ✅ Class for Valid Data Testing
export class CorporateWellnessValidDataPage {
  constructor(private page: Page) {}

  async navigateToWellnessPage() {
    await this.page.goto('https://www.practo.com/corporate-wellness');
  }

  async fillValidForm() {
    await this.page.fill('#name', 'Sutheeksha');
    await this.page.fill('#organizationName', 'Cognizant');
    await this.page.fill('#contactNumber', '9876543210');
    await this.page.fill('#email', 'sutheeksha@example.com');
    await this.page.selectOption('#organizationSize', { label: '1000+' });
    await this.page.selectOption('#interestedIn', { label: 'Health Checkups' });
  }

  async submitForm() {
    await this.page.click('button:has-text("Schedule a demo")');
  }

  async getSuccessMessage() {
    return await this.page.locator('.alert-message').textContent(); // Update selector if needed
  }

  async isSubmitButtonEnabled(): Promise<boolean> {
    return await this.page.locator('button:has-text("Schedule a demo")').isEnabled();
  }
}

