import { Page ,expect} from '@playwright/test';
import locators from '../locators/locators.json';
 
export class CooperateWellnessInvalidDataPage {
  constructor(private page: Page) {}
 
  async navigateToForm() {
    await this.page.goto('https://www.practo.com/', { waitUntil: 'domcontentloaded' });
    await this.page.getByText('For Corporates').first().click();
    await this.page.getByRole('link', { name: 'Health & Wellness Plans' }).click();
  }
 
  async fillInvalidFormData(data: any) {
    await this.page.getByRole('textbox', { name: 'Name', exact: true }).fill(data.Name);
    await this.page.getByRole('textbox', { name: 'Organization Name', exact: true }).fill(data.OrganizationName);
    await this.page.getByRole('textbox', { name: 'Contact Number', exact: true }).fill(data.ContactNumber);
    await this.page.getByRole('textbox', { name: 'Official Email ID', exact: true }).fill(data.Email);
    await this.page.locator(locators.invalid.orgSizeDropdown).selectOption(data.OrganizationSize);
    await this.page.locator(locators.invalid.interestDropdown).selectOption(data.InterestedIn);
  }
 
  async getSubmitButton() {
    const button = this.page.getByRole('button', { name: /schedule|submit|demo|contact/i }).first();
    await button.scrollIntoViewIfNeeded();
    await button.waitFor({ state: 'attached' });
    return button;
  }
 

  async clickFAQLink() {
    await this.page.locator('#header').getByText('FAQs').click();
  }

  async assertFAQVisible() {
    const faqHeading = this.page.getByRole('heading', { name: 'FAQs' });
    await faqHeading.scrollIntoViewIfNeeded();
    await expect(faqHeading).toBeVisible();
  }
}