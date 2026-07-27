import { basePage } from './base-page';

export class explosivesPrecursorSummaryNLPage extends basePage {
  async explosiveAndPrecursorsSummary() {
    await this.clickContinueButton();
  }
}