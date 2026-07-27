import { basePage } from './base-page';

export class whatIsNameOnLicencePage extends basePage {
  async answerNameOnLicence() {
    await this.answerName();
  }
}