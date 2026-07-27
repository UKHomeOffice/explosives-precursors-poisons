import { basePage } from './base-page';

export class otherNamesSummaryPageNLPage extends basePage {
  expectedPageTitle() {
    return "Other names summary";
  }

  async answerOtherNamesSummary() {
    await this.clickContinueButton();
  }
}
