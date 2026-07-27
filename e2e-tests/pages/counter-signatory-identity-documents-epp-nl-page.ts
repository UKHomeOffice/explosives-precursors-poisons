import { basePage } from './base-page';

export class counterSignatoryIdentityDocumentsEppNLPage extends basePage {
  expectedPageTitle() {
    return "What is your countersignatory's identity document?";
  }

  async britishPassportCounterSignatoryIdentityDocuments() {
    await this.clickContinueButton();
  }

  async EEAPassportCounterSignatoryIdentityDocuments() {
    await this.clickContinueButton();
  }

  async UKDrivingLicenceCounterSignatoryIdentityDocuments() {
    await this.clickContinueButton();
  }
}
