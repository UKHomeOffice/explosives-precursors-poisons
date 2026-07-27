import { basePage } from './base-page';

export class checkYourAnswerNewAppEppNLPage extends basePage {
  expectedPageTitle() {
    return "Check your answers";
  }

  async newAppSummaryPage() {
    await this.clickContinueButton();
  }
}
