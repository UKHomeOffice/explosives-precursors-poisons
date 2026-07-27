import { basePage } from './base-page';

export class enterYourLicenceNumberRepPage extends basePage {
  async answerLicenceNumber() {
    await this.clickContinueButton();
  }
}