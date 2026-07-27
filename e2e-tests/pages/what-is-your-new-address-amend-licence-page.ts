import { basePage } from './base-page';

export class whatIsYourNewAddressAmendLicencePage extends basePage {
  expectedPageTitle() {
    return "What is your new address?";
  }

  async answerNewAddress() {
    await this.clickContinueButton();
  }
}
