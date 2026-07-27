import { basePage } from './base-page';

export class counterDetailsAmendLicencePage extends basePage {
  expectedPageTitle() {
    return "Countersignatory details";
  }

  async answerCounterSignatoryDetailsAmendLicence() {
    await this.clickContinueButton();
  }
}
