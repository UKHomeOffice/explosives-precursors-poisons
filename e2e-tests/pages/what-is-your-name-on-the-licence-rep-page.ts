import { basePage } from './base-page';

export class whatIsYourNameOnTheLicenceRepPage extends basePage {
  async answerNameOnLicence() {
    await this.answerName();
  }
}