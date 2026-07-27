import { basePage } from './base-page';

export class changeInSubstancesRepPage extends basePage {
  async answerNoChangeInSubstances() {
    await this.answerYesNo('No');
  }

  async answerYesChangeInSubstances() {
    await this.answerYesNo('Yes');
  }
}