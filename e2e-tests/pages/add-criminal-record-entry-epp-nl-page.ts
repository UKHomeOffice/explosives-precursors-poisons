import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class addCriminalRecordEntryEppNLPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async answerCriminalRecordEntry(offenceName: string, country: string, day: string, month: string, year: string): Promise<void> {
    const offenceNameInput = this.page.getByLabel('Name of offence', { exact: true }).first();
    await this.fillField(offenceNameInput, offenceName);

    const countryInput = this.page.getByLabel('Which country was the offence committed in?', { exact: true }).first();
    await this.fillField(countryInput, country);

    await this.fillDate(day, month, year);
    await this.clickContinueButton();
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? 'Error: Add criminal record entry'
      : 'Add criminal record entry';
  }
}