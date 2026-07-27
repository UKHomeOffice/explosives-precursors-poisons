import { basePage } from './base-page';

export class uploadBritishPassportRepPage extends basePage {
  async answerBritishPassport() {
    await this.clickContinueButton();
  }
}