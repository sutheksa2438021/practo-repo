import { Page } from '@playwright/test';
//import { CooperateWellnessLocators } from '../locators/cooperatewellness.locators';
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
    await this.page.locator(locators.orgSizeDropdown).selectOption(data.OrganizationSize);
    await this.page.locator(locators.interestDropdown).selectOption(data.InterestedIn);
  }
}