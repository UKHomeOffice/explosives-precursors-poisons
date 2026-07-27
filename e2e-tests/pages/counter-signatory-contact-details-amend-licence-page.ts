import { basePage } from './base-page';

export class counterSignatoryContactDetailsAmendLicencePage extends basePage {
  expectedPageTitle() {
    return "Countersignatory's contact details";
  }

  async answerCounterSignatoryContactDetailsAmendLicence() {
    await this.clickContinueButton();
  }
}
