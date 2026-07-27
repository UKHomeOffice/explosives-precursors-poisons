import { basePage } from './base-page';

export class whatAreYourContactDetailsNLPage extends basePage {
  expectedPageTitle() {
    return "What are your contact details?";
  }

  async whatAreYourContactDetailsEPP() {
    await this.answerContactDetails();
  }
}
