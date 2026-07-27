import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class counterSignatoryIdentityDocumentsEppNLPage extends basePage {
  private readonly britishPassportInput;
  private readonly euPassportInput;
  private readonly drivingLicenceInput;

  constructor(page: Page) {
    super(page);
    this.britishPassportInput = this.page.locator('#new-renew-countersignatory-UK-passport-number').first();
    this.euPassportInput = this.page.locator('#new-renew-countersignatory-EU-passport-number').first();
    this.drivingLicenceInput = this.page.locator('#new-renew-countersignatory-Uk-driving-licence-number').first();
  }

  async britishPassportCounterSignatoryIdentityDocuments(passportNumber: string): Promise<void> {
    await this.pickRadioByText('British passport');
    await this.fillField(this.britishPassportInput, passportNumber);
    await this.clickContinueButton();
  }

  async EEAPassportCounterSignatoryIdentityDocuments(passportNumber: string): Promise<void> {
    await this.pickRadioByText('Passport from the EU, Switzerland, Norway, Iceland or Liechtenstein');
    await this.fillField(this.euPassportInput, passportNumber);
    await this.clickContinueButton();
  }

  async UKDrivingLicenceCounterSignatoryIdentityDocuments(drivingLicenceNumber: string): Promise<void> {
    await this.pickRadioByText('UK driving licence');
    await this.fillField(this.drivingLicenceInput, drivingLicenceNumber);
    await this.clickContinueButton();
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? 'Error: What is your countersignatory\'s identity document?'
      : 'What is your countersignatory\'s identity document?';
  }
}




