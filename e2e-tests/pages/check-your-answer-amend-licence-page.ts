import { basePage } from './base-page';

export class checkYourAnswerAmendLicencePage extends basePage {
  expectedPageTitle() {
    return "Check your answers";
  }

  async checkYourAnswers() {
    await this.clickContinueButton();
  }
}
