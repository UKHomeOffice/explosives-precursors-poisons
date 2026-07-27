import { basePage } from './base-page';

export class namePageNLPage extends basePage {
  expectedPageTitle() {
    return "Your name – Apply for an explosives and precursor chemicals licence";
  }

  async answerNameDetails() {
    await this.answerName();
  }

  async answerNoToOtherNameQuestion() {
    await this.answerYesNo('No');
  }

  async answerYesToOtherNameQuestion() {
    await this.answerYesNo('Yes');
  }

  async assertPageTitle() {
    await this.assertHeadingContains('');
  }
}
