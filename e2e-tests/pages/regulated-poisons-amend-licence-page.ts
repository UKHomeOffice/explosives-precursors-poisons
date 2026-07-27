import { basePage } from './base-page';

export class regulatedPoisonsAmendLicencePage extends basePage {
  expectedPageTitle() {
    return "Regulated poisons";
  }

  async noNeedToAmendPoison() {
    await this.clickContinueButton();
  }

  async yesNeedToAmendPoison() {
    await this.clickContinueButton();
  }
}
