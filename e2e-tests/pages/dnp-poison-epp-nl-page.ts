import { basePage } from './base-page';

export class dnpPoisonEppNLPage extends basePage {
  expectedPageTitle() {
    return "2,4-dinitrophenol (DNP) and its compounds including dinitrophenolate";
  }

  async answerDNP() {
    await this.clickContinueButton();
  }

  async storePoisonInOtherAddress() {
    await this.clickContinueButton();
  }

  async storePoisonInUkAddress() {
    await this.clickContinueButton();
  }

  async usePoisonOtherAddress() {
    await this.clickContinueButton();
  }

  async usePoisonUkAddress() {
    await this.clickContinueButton();
  }
}
