import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class counterSignatoryIdentityDocumentsEppNLPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async britishPassportCounterSignatoryIdentityDocuments(passportNumber: string): Promise<void> {
    await this.pickRadioByText('British passport');
    await this.page.locator('#new-renew-countersignatory-UK-passport-number').first().fill(passportNumber);
    await this.clickContinueButton();
  }

  async EEAPassportCounterSignatoryIdentityDocuments(passportNumber: string): Promise<void> {
    await this.pickRadioByText('Passport from the EU, Switzerland, Norway, Iceland or Liechtenstein');
    await this.page.locator('#new-renew-countersignatory-EU-passport-number').first().fill(passportNumber);
    await this.clickContinueButton();
  }

  async UKDrivingLicenceCounterSignatoryIdentityDocuments(drivingLicenceNumber: string): Promise<void> {
    await this.pickRadioByText('UK driving licence');
    await this.page.locator('#new-renew-countersignatory-Uk-driving-licence-number').first().fill(drivingLicenceNumber);
    await this.clickContinueButton();
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? 'Error: What is your countersignatory\'s identity document?'
      : 'What is your countersignatory\'s identity document?';
  }
}




