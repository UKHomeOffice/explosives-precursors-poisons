import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class otherNationalitiesEppNLPage extends basePage {
  private readonly nationalityInput;

  constructor(page: Page) {
    super(page);
    this.nationalityInput = this.page.locator('#new-renew-other-country-nationality').first();
  }

  async answerOtherNationalitiesQuestions(nationality: string): Promise<void> {
    if (await this.nationalityInput.isVisible().catch(() => false)) {
      await this.fillField(this.nationalityInput, nationality);
      await this.nationalityInput.press('Tab');
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




