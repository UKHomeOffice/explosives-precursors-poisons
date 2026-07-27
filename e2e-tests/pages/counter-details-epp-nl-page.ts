import { basePage } from './base-page';

export class counterDetailsEppNLPage extends basePage {
  expectedPageTitle() {
    return "Countersignatory details";
  }

  async answerCounterSignatoryDetails() {
    await this.clickContinueButton();
  }
}
