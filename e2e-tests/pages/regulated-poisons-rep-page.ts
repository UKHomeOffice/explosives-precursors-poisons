import { basePage } from './base-page';

export class regulatedPoisonsRepPage extends basePage {
  async answerNoRegulatedPoison() {
    await this.answerYesNo('No');
  }

  async answerYesRegulatedPoison() {
    await this.answerYesNo('Yes');
  }
}