import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class whichIdentityDocUseEppNLPage extends basePage {
  private readonly euPassportInput;
  private readonly passportNumberLabelInput;
  private readonly drivingLicenceLabelInput;

  constructor(page: Page) {
    super(page);
    this.euPassportInput = this.page.locator('#new-renew-EU-passport-number').first();
    this.passportNumberLabelInput = this.page.getByLabel('What is your passport number?', { exact: true }).first();
    this.drivingLicenceLabelInput = this.page.getByLabel('What is your driving licence number?', { exact: true }).first();
  }

  async answerIdentityDocBritishPassport(passportNumber: string): Promise<void> {
    await this.pickRadioByText('British passport');
    await this.fillField(this.passportNumberLabelInput, passportNumber);
    await this.clickContinueButton();
  }

  async answerIdentityDocEU(passportNumber: string): Promise<void> {
    await this.pickRadioByText('Passport from the EU, Switzerland, Norway, Iceland or Liechtenstein');
    if (await this.euPassportInput.count()) {
      await this.fillField(this.euPassportInput, passportNumber);
    } else {
      await this.fillField(this.passportNumberLabelInput, passportNumber);
    }
    await this.clickContinueButton();
  }

  async answerIdentityUKDrivingLicence(drivingLicenceNumber: string): Promise<void> {
    await this.pickRadioByText('UK driving licence');
    await this.fillField(this.drivingLicenceLabelInput, drivingLicenceNumber);
    await this.clickContinueButton();
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? 'Error: Which identity document do you want to use?'
      : 'Which identity document do you want to use?';
  }
}




