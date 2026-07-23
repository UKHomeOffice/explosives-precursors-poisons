import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class CriminalRecordSummaryEppNLPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async addAnotherCriminalRecord(): Promise<void> {
    await this.page.getByRole('link', { name: 'Add another offence', exact: true }).click();
  }

  async reviewSummaryContinue(): Promise<void> {
    await this.clickContinueButton();
  }

  async expectedPageTitle(): Promise<string> {
    return (await this.page.title()) || '';
  }
}


