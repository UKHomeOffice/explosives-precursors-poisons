import { basePage } from './base-page';

export class summaryPreviousAddressLast5YearsEppNLPage extends basePage {
  expectedPageTitle() {
    return "Previous addresses for last 5 years";
  }

  async answerSummaryForPreviousAddress() {
    await this.clickContinueButton();
  }
}
