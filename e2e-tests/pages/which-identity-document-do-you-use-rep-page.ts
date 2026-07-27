import { basePage } from './base-page';

export class whichIdentityDocumentDoYouUseRepPage extends basePage {
  async answerIdentityDocBritishPassport() {
    await this.clickContinueButton();
  }

  async answerIdentityDocEU() {
    await this.clickContinueButton();
  }

  async answerIdentityUKDrivingLicence() {
    await this.clickContinueButton();
  }
}