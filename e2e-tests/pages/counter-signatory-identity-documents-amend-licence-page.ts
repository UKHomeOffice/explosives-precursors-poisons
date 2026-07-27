import { basePage } from './base-page';

export class counterSignatoryIdentityDocumentsAmendLicencePage extends basePage {
  expectedPageTitle() {
    return "What is your countersignatory’s identity document?";
  }

  async britishPassportCounterSignatoryIdentityDocumentsAmendLicence() {
    await this.clickContinueButton();
  }

  async EEAPassportCounterSignatoryIdentityDocumentsAmendLicence() {
    await this.clickContinueButton();
  }

  async UKDrivingLicenceCounterSignatoryIdentityDocumentsAmendLicence() {
    await this.clickContinueButton();
  }
}
