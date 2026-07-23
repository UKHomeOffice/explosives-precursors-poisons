import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class summaryPreviousAddressLast5YearsEppNLPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async answerSummaryForPreviousAddress(): Promise<void> {
    const heading = this.page.locator('h1').first();
    const text = (await heading.textContent().catch(() => '')) || '';
    if (!text.toLowerCase().includes('previous address')) {
      return;
    }
    await this.clickContinueButton();
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? 'Error: Previous addresses for last 5 years'
      : 'Previous addresses for last 5 years';
  }
}





