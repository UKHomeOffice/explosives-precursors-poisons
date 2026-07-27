import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class checkYourAnswerNewAppEppNLPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async newAppSummaryPage(): Promise<void> {
    await this.clickContinueButton();
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? 'Error: Check your answers'
      : 'Check your answers';
  }
}





