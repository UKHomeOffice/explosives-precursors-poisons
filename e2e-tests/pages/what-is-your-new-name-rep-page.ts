import { basePage } from './base-page';

export class whatIsYourNewNameRepPage extends basePage {
  async answerNameOnLicence() {
    await this.answerName();
  }
}