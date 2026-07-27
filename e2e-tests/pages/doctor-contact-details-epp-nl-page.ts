import { basePage } from './base-page';

export class doctorContactDetailsEppNLPage extends basePage {
  expectedPageTitle() {
    return "Your doctor’s contact details";
  }

  async answerDoctorContactDetails() {
    await this.clickContinueButton();
  }
}
