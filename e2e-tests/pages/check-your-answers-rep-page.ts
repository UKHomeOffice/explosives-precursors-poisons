import { basePage } from './base-page';

export class checkYourAnswersRepPage extends basePage {
  async replaceCheckYouAnswers() {
    await this.clickContinueButton();
  }
}