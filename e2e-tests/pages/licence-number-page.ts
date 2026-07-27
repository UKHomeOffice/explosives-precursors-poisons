import { basePage } from './base-page';

export class licenceNumberPage extends basePage {
  async enterLicenceNumberToAmend() {
    await this.clickContinueButton();
  }
}