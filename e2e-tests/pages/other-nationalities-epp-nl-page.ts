import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class otherNationalitiesEppNLPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async answerOtherNationalitiesQuestions(nationality: string): Promise<void> {
    const nationalityInput = this.page.locator('#new-renew-other-country-nationality').first();
    if (await nationalityInput.isVisible().catch(() => false)) {
      await nationalityInput.fill(nationality);
      await nationalityInput.press('ArrowDown');
      await nationalityInput.press('Enter');
      await nationalityInput.press('Tab');
    }

    await this.clickContinueButton();
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? 'Error: Other nationalities'
      : 'Other nationalities';
  }
}




