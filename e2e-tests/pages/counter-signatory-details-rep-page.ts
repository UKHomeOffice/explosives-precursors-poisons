import { basePage } from './base-page';

export class counterSignatoryDetailsRepPage extends basePage {
  async answerCounterSignatoryDetails() {
    await this.clickContinueButton();
  }
}