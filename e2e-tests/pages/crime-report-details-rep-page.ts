import { basePage } from './base-page';

export class crimeReportDetailsRepPage extends basePage {
  async answerCrimeDetails() {
    await this.clickContinueButton();
  }
}