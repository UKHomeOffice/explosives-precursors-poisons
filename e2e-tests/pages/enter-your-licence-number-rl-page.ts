import { basePage } from './base-page';

export class enterYourLicenceNumberRLPage extends basePage {
  async enterLicenceNumber() {
    await this.clickContinueButton();
  }
}