import { basePage } from './base-page';

export class counterSignatoryAddressAmendLicencePage extends basePage {
  expectedPageTitle() {
    return "Countersignatory address";
  }

  async answerCounterSignatoryAddressAmendLicence() {
    await this.clickContinueButton();
  }
}
