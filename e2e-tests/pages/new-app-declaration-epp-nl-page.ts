import { basePage } from './base-page';

export class newAppDeclarationEppNLPage extends basePage {
  expectedPageTitle() {
    return "Declaration";
  }

  async clickCheckBoxNewApp() {
    await this.clickContinueButton();
  }
}
