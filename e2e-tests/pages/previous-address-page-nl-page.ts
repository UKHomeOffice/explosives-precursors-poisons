import { basePage } from './base-page';

export class previousAddressPageNLPage extends basePage {
  expectedPageTitle() {
    return "Previous address";
  }

  async answerPreviousHomeAddress() {
    await this.clickContinueButton();
  }
}
