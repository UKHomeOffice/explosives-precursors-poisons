import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class otherNamesSummaryPageNLPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async answerOtherNamesSummary(): Promise<void> {
    await this.clickContinueButton();
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? 'Error: Other names summary'
      : 'Other names summary';
  }
}





