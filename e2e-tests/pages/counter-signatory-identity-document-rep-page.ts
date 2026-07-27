import { basePage } from './base-page';

export class counterSignatoryIdentityDocumentRepPage extends basePage {
  async answerCounterSignatoryDocBritishPassport() {
    await this.clickContinueButton();
  }

  async answerCounterSignatoryDocEU() {
    await this.clickContinueButton();
  }

  async answerCounterSignatoryDocUKDrivingLicence() {
    await this.clickContinueButton();
  }
}