import { basePage } from './base-page';

export class counterSignatoryAddressRepPage extends basePage {
  async answerCounterSignatoryAddress() {
    await this.clickContinueButton();
  }
}