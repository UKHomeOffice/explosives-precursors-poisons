import { basePage } from './base-page';

export class haveAnyOfYourDetailsChangedRepPage extends basePage {
  async answerNoHaveDetailsChanged() {
    await this.answerYesNo('No');
  }

  async answerYesHaveDetailsChanged() {
    await this.answerYesNo('Yes');
  }
}