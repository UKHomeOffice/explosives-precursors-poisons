import { basePage } from './base-page';

export class haveYouReportedTheTheftRepPage extends basePage {
  async answerNoReportedTheft() {
    await this.answerYesNo('No');
  }

  async answerYesReportedTheft() {
    await this.answerYesNo('Yes');
  }
}