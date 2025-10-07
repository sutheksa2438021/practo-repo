import { expect, Locator, Page } from '@playwright/test';

export class LabTestPage {
  readonly page: Page;
  readonly modalOverlay: Locator;
  readonly packageCards: Locator;

  constructor(page: Page) {
    this.page = page;
    this.modalOverlay = page.locator('.ReactModal__Overlay');
    this.packageCards = page.locator('div.c-package');
  }

  async navigate() {
    await this.page.goto('https://www.practo.com/tests?city=bangalore', { waitUntil: 'domcontentloaded' });
  }

  async handleModal() {
    try {
      if (await this.modalOverlay.isVisible({ timeout: 5000 })) {
        await this.page.mouse.click(0, 0);
        await expect(this.modalOverlay).toBeHidden({ timeout: 5000 });
      }
    } catch {}
  }

  
  }

