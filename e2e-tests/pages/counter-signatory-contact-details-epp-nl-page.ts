import { basePage } from './base-page';

export class counterSignatoryContactDetailsEppNLPage extends basePage {
  expectedPageTitle() {
    return "Countersignatory's contact details";
  }

  async answerCounterSignatoryContactDetails() {
    await this.clickContinueButton();
  }
}
