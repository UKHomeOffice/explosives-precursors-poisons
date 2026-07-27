import { basePage } from './base-page';

export class whatIsYourNewAddressRepPage extends basePage {
  async answerNewAddress() {
    await this.clickContinueButton();
  }
}