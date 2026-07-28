import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class summaryPreviousAddressLast5YearsEppNLPage extends basePage {
  private readonly heading;

  constructor(page: Page) {
    super(page);
    this.heading = this.page.locator('h1').first();
  }

  async answerSummaryForPreviousAddress(): Promise<void> {
    const text = (await this.heading.textContent().catch(() => '')) || '';
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





