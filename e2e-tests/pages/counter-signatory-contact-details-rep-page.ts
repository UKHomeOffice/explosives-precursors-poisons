import { basePage } from './base-page';

export class counterSignatoryContactDetailsRepPage extends basePage {
  async answerCounterSignatoryContactDetails() {
    await this.clickContinueButton();
  }
}