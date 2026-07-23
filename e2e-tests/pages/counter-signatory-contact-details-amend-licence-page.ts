import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class counterSignatoryContactDetailsAmendLicencePage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async answerCounterSignatoryContactDetailsAmendLicence(phone: string, email: string): Promise<void> {
    await this.page.locator('#amend-countersignatory-phone-number').first().fill(phone);
    await this.page.locator('#amend-countersignatory-email').first().fill(email);
    await this.clickContinueButton();
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? 'Error: Countersignatory\'s contact details'
      : 'Countersignatory\'s contact details';
  }
}





