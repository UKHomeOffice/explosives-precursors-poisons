import { basePage } from './base-page';

export class uploadProofOfAddressRepPage extends basePage {
  async answerProofOfAddress() {
    await this.clickContinueButton();
  }
}