import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class counterSignatoryContactDetailsEppNLPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async answerCounterSignatoryContactDetails(phone: string, email: string): Promise<void> {
    await this.page.locator('#new-renew-countersignatory-phone-number').first().fill(phone);
    await this.page.locator('#new-renew-countersignatory-email').first().fill(email);
    await this.clickContinueButton();
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? 'Error: Countersignatory\'s contact details'
      : 'Countersignatory\'s contact details';
  }
}





