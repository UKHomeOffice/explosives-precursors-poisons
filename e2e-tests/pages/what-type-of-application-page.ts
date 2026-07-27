import { basePage } from './base-page';

export class whatTypeOfApplicationPage extends basePage {
  expectedPageTitle() {
    return "What type of application do you need to make? – Explosives precursors and poisons licensing";
  }

  async assertPageTitle() {
    await this.assertHeadingContains('');
  }

  async clickAmendLicence() {
    await this.selectRadio('Amend a licence');
    await this.clickContinueButton();
  }

  async clickApplyNewLicence() {
    await this.selectRadio('Apply for a new licence');
    await this.clickContinueButton();
  }

  async clickRenewApplication() {
    await this.selectRadio('Renew a licence');
    await this.clickContinueButton();
  }

  async clickReplaceApplication() {
    await this.selectRadio('Replace a licence');
    await this.clickContinueButton();
  }
}
