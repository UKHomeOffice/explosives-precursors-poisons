import { basePage } from './base-page';

export class refusedLicenceHistoryEppNLPage extends basePage {
  expectedPageTitle() {
    return "Revoked or refused licence history";
  }

  async addAnotherRefusal() {
    await this.page.getByRole('link', { name: 'Add another refusal or revocation' }).click();
  }

  async revokedLicenceHistory() {
    await this.clickContinueButton();
  }
}
