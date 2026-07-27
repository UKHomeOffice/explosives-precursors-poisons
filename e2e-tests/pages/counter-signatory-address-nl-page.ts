import { basePage } from './base-page';

export class counterSignatoryAddressNLPage extends basePage {
  expectedPageTitle() {
    return "Countersignatory address";
  }

  async answerCounterSignatoryAddress() {
    await this.clickContinueButton();
  }
}
