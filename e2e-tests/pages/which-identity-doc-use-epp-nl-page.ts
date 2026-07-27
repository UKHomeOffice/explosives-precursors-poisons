import { basePage } from './base-page';

export class whichIdentityDocUseEppNLPage extends basePage {
  expectedPageTitle() {
    return "Which identity document do you want to use?";
  }

  async answerIdentityDocBritishPassport() {
    await this.page.locator('#new-renew-applicant-Id-type-UK-passport').check();
    await this.page.locator('#new-renew-UK-passport-number').fill('120897A');
    await this.clickContinueButton();
  }

  async answerIdentityDocEU() {
    await this.page.locator('#new-renew-applicant-Id-type-EU-passport').check();
    await this.page.locator('#new-renew-EU-passport-number').fill('120897A');
    await this.clickContinueButton();
  }

  async answerIdentityUKDrivingLicence() {
    await this.page.locator('#new-renew-applicant-Id-type-Uk-driving-licence').check();
    await this.page.locator('#new-renew-Uk-driving-licence-number').fill('MORGA657054SM9IJ');
    await this.clickContinueButton();
  }
}
