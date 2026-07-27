import { basePage } from './base-page';

export class dateOfBirthForLicencePage extends basePage {
  async answerDobLicence() {
    await this.clickContinueButton();
  }
}