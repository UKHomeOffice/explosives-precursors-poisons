import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class whichIdentityDocumentDoYouUseRepPage extends basePage {
  private readonly britishPassportInput;
  private readonly euPassportInput;
  private readonly drivingLicenceInput;

  constructor(page: Page) {
    super(page);
    this.britishPassportInput = this.page.locator('#replace-UK-passport-number').first();
    this.euPassportInput = this.page.locator('#replace-EU-passport-number').first();
    this.drivingLicenceInput = this.page.locator('#replace-driving-licence-number').first();
  }

  async answerIdentityDocBritishPassport(passportNumber: string): Promise<void> {
    await this.pickRadioByText('British passport');
    if (await this.britishPassportInput.isVisible().catch(() => false)) {
      await this.fillField(this.britishPassportInput, passportNumber);
    }
    await this.clickContinueButton();
  }

  async answerIdentityDocEU(passportNumber: string): Promise<void> {
    await this.pickRadioByText('Passport from the EU, Switzerland, Norway, Iceland or Liechtenstein');
    if (await this.euPassportInput.isVisible().catch(() => false)) {
      await this.fillField(this.euPassportInput, passportNumber);
    }
    await this.clickContinueButton();
  }

  async answerIdentityUKDrivingLicence(drivingLicenceNumber: string): Promise<void> {
    await this.pickRadioByText('UK driving licence');
    if (await this.drivingLicenceInput.isVisible().catch(() => false)) {
      await this.fillField(this.drivingLicenceInput, drivingLicenceNumber);
    }
    await this.clickContinueButton();
  }
  async expectedPageTitle(): Promise<string> {
    return (await this.page.title()) || '';
  }
}

