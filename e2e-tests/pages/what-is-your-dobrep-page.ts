import { basePage } from './base-page';

export class whatIsYourDOBRepPage extends basePage {
  async answerDOB() {
    await this.clickContinueButton();
  }
}