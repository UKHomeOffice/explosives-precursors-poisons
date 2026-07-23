import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class whichIdentityDocUseEppNLPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async answerIdentityDocBritishPassport(passportNumber: string): Promise<void> {
    await this.pickRadioByText('British passport');
    await this.page.getByLabel('What is your passport number?', { exact: true }).first().fill(passportNumber);
    await this.clickContinueButton();
  }

  async answerIdentityDocEU(passportNumber: string): Promise<void> {
    await this.pickRadioByText('Passport from the EU, Switzerland, Norway, Iceland or Liechtenstein');
    const euPassportNumber = this.page.locator('#new-renew-EU-passport-number').first();
    if (await euPassportNumber.count()) {
      await euPassportNumber.fill(passportNumber);
    } else {
      await this.page.getByLabel('What is your passport number?', { exact: true }).first().fill(passportNumber);
    }
    await this.clickContinueButton();
  }

  async answerIdentityUKDrivingLicence(drivingLicenceNumber: string): Promise<void> {
    await this.pickRadioByText('UK driving licence');
    await this.page
      .getByLabel('What is your driving licence number?', { exact: true })
      .first()
      .fill(drivingLicenceNumber);
    await this.clickContinueButton();
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? 'Error: Which identity document do you want to use?'
      : 'Which identity document do you want to use?';
  }
}




