import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class WhichIdentityDocumentDoYouUseRepPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async answerIdentityDocBritishPassport(passportNumber: string): Promise<void> {
    await this.pickRadioByText('British passport');
    const passportInput = this.page.locator('#replace-UK-passport-number').first();
    if (await passportInput.isVisible().catch(() => false)) {
      await passportInput.fill(passportNumber);
    }
    await this.clickContinueButton();
  }

  async answerIdentityDocEU(passportNumber: string): Promise<void> {
    await this.pickRadioByText('Passport from the EU, Switzerland, Norway, Iceland or Liechtenstein');
    const passportInput = this.page.locator('#replace-EU-passport-number').first();
    if (await passportInput.isVisible().catch(() => false)) {
      await passportInput.fill(passportNumber);
    }
    await this.clickContinueButton();
  }

  async answerIdentityUKDrivingLicence(drivingLicenceNumber: string): Promise<void> {
    await this.pickRadioByText('UK driving licence');
    const licenceInput = this.page.locator('#replace-driving-licence-number').first();
    if (await licenceInput.isVisible().catch(() => false)) {
      await licenceInput.fill(drivingLicenceNumber);
    }
    await this.clickContinueButton();
  }
  async expectedPageTitle(): Promise<string> {
    return (await this.page.title()) || '';
  }
}
