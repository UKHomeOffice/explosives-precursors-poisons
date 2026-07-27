import { basePage } from './base-page';

export class poisonsOnLicenceSummaryNLPage extends basePage {
  async PoisonOnLicenceSummary() {
    await this.clickContinueButton();
  }
}