import { basePage } from './base-page';

export class criminalRecordSummaryEppNLPage extends basePage {
  async addAnotherCriminalRecord() {
    await this.page.getByRole('link', { name: 'Add another offence' }).click();
  }

  async reviewSummaryContinue() {
    await this.clickContinueButton();
  }
}