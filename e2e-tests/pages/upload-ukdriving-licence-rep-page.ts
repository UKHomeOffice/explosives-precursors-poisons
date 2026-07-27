import { basePage } from './base-page';

export class uploadUKDrivingLicenceRepPage extends basePage {
  async answerUKDrivingLicence() {
    await this.clickContinueButton();
  }
}