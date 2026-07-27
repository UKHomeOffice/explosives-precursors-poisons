import { basePage } from './base-page';

export class whyDoYouNeedReplacementLicenceRepPage extends basePage {
  async licenceIsDamaged() {
    await this.clickContinueButton();
  }

  async licenceIsDestroyed() {
    await this.clickContinueButton();
  }

  async licenceIsLost() {
    await this.clickContinueButton();
  }

  async licenceWasStolen() {
    await this.clickContinueButton();
  }
}