import { basePage } from './base-page';

export class whatIsYourNewNameAmendLicencePage extends basePage {
  async answerYourNewName() {
    await this.clickContinueButton();
  }
}