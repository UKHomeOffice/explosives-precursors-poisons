import { basePage } from './base-page';

export class poisonLicenceSummaryRepPage extends basePage {
  async PoisonOnLicenceSummaryRep() {
    await this.clickContinueButton();
  }
}