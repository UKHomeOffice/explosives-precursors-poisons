import { basePage } from './base-page';

export class otherLicencesEppNLPage extends basePage {
  expectedPageTitle() {
    return "Other licences";
  }

  async selectOtherLicences(licenceType: string, response: string) {
    await this.page
      .locator(`#new-renew-other-${licenceType}-licence-${response.toLowerCase()}`)
      .check();
  }
}
