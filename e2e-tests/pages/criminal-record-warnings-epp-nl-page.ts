import { basePage } from './base-page';

export class criminalRecordWarningsEppNLPage extends basePage {
  expectedPageTitle() {
    return "Criminal records, warnings and cautions";
  }

  async answerNoCriminalQuestions() {
    await this.answerYesNo('No');
  }

  async answerYesCriminalQuestions() {
    await this.answerYesNo('Yes');
  }
}
