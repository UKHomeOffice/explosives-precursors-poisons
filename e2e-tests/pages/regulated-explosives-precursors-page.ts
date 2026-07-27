import { basePage } from './base-page';

export class regulatedExplosivesPrecursorsPage extends basePage {
  expectedPageTitle() {
    return "Regulated explosives precursors";
  }

  async answerNoAmendExplosivePrecursorsOnLicence() {
    await this.answerYesNo('No');
  }

  async answerYesAmendExplosivePrecursorsOnLicence() {
    await this.answerYesNo('Yes');
  }
}
