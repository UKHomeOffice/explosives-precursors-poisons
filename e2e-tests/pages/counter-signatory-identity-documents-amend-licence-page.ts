import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class counterSignatoryIdentityDocumentsAmendLicencePage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async britishPassportCounterSignatoryIdentityDocumentsAmendLicence(passportNumber: string): Promise<void> {
    await this.pickRadioByText('British passport');
    await this.page.locator('#amend-countersignatory-UK-passport-number').first().fill(passportNumber);
    await this.clickContinueButton();
  }

  async EEAPassportCounterSignatoryIdentityDocumentsAmendLicence(passportNumber: string): Promise<void> {
    await this.pickRadioByText('Passport from the EU, Switzerland, Norway, Iceland or Liechtenstein');
    await this.page.locator('#amend-countersignatory-EU-passport-number').first().fill(passportNumber);
    await this.clickContinueButton();
  }

  async UKDrivingLicenceCounterSignatoryIdentityDocumentsAmendLicence(drivingLicenceNumber: string): Promise<void> {
    await this.pickRadioByText('UK driving licence');
    await this.page.locator('#amend-countersignatory-Uk-driving-licence-number').first().fill(drivingLicenceNumber);
    await this.clickContinueButton();
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? 'Error: What is your countersignatory’s identity document?'
      : 'What is your countersignatory’s identity document?';
  }
}





