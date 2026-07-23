import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class CriminalRecordWarningsEppNLPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async answerYesCriminalQuestions(): Promise<void> {
    await this.page.getByRole('radio', { name: /^yes$/i }).first().check();
    await this.clickContinueButton();
  }

  async answerNoCriminalQuestions(): Promise<void> {
    await this.page.getByRole('radio', { name: /^no$/i }).first().check();
    await this.clickContinueButton();
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? 'Error: Criminal records, warnings and cautions'
      : 'Criminal records, warnings and cautions';
  }
}



