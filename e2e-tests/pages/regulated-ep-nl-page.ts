import { basePage } from './base-page';

export class regulatedEpNLPage extends basePage {
  async selectRegulatedEPRadioButton(responseRegulated: string) {
    await this.page
      .locator(`#new-renew-regulated-explosives-precursors-options-${responseRegulated.toLowerCase()}`)
      .check();
    await this.clickContinueButton();
  }
}