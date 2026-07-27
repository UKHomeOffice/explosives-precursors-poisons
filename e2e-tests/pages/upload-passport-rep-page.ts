import { basePage } from './base-page';

export class uploadPassportRepPage extends basePage {
  async answerEUPassport() {
    await this.clickContinueButton();
  }
}