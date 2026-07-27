import { basePage } from './base-page';

export class ePDetailsRepPage extends basePage {
  async answerAmmoniumNitrate() {
    await this.clickContinueButton();
  }

  async storeInOtherAddress() {
    await this.clickContinueButton();
  }

  async storeInUkAddress() {
    await this.clickContinueButton();
  }

  async useOtherAddress() {
    await this.clickContinueButton();
  }

  async useUkAddress() {
    await this.clickContinueButton();
  }
}