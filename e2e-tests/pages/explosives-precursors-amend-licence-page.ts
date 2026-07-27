import { basePage } from './base-page';

export class explosivesPrecursorsAmendLicencePage extends basePage {
  expectedPageTitle() {
    return "Explosives precursors";
  }

  async selectAmmonium() {
    await this.clickContinueButton();
  }

  async selectHexamine() {
    await this.clickContinueButton();
  }

  async selectHydrochloricAcid() {
    await this.clickContinueButton();
  }

  async selectHydrogenPeroxide() {
    await this.clickContinueButton();
  }

  async selectNitricAcid() {
    await this.clickContinueButton();
  }

  async selectNitromethane() {
    await this.clickContinueButton();
  }

  async selectPhosphoricAcid() {
    await this.clickContinueButton();
  }

  async selectPotassiumChlorate() {
    await this.clickContinueButton();
  }

  async selectPotassiumPerchlorate() {
    await this.clickContinueButton();
  }

  async selectSodiumChlorate() {
    await this.clickContinueButton();
  }

  async selectSodiumPerchlorate() {
    await this.clickContinueButton();
  }

  async selectSulfuricAcid() {
    await this.clickContinueButton();
  }
}
