import { basePage } from './base-page';

export class whatAreYourContactDetailsAmendLicencePage extends basePage {
  expectedPageTitle() {
    return "What are your contact details?";
  }

  async whatAreYourContactDetailsAmend() {
    await this.answerContactDetails();
  }
}
