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
  async scrollToLoadPackages() {
    await this.page.evaluate(() => window.scrollBy(0, 2000));
    await this.page.waitForTimeout(3000);
  }

  async extractPackages(limit: number = 3) {
    const count = await this.packageCards.count();
    //const results = [];
    const results: string[] = [];

    if (count === 0) {
      console.log('No health packages found.');
    } else {
      for (let i = 0; i < Math.min(limit, count); i++) {
        const card = this.packageCards.nth(i);
        const name = await card.locator('h3.c-package__title-line-two').textContent();
        const price = await card.locator('span.o-font-size--20.u-marginr--std').textContent();

        if (name && price) {
          const result = `${i + 1}. ${name.trim()} - ${price.trim()}`;
          console.log(result);
          results.push(result);
        }
      }
    }

    return results;
  }
}


  

  

