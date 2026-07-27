import { basePage } from './base-page';

export class regulatedPoisonsEppNLPage extends basePage {
  expectedPageTitle() {
    return "Regulated poisons";
  }

  async selectRegulatedPoisonRadioButton(responseRegulated: string) {
    await this.page
      .locator(`#new-renew-poisons-options-${responseRegulated.toLowerCase()}`)
      .check();
    await this.clickContinueButton();
  }
}
