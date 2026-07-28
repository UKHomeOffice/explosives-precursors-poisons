import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class counterSignatoryContactDetailsEppNLPage extends basePage {
  private readonly phoneInput;
  private readonly emailInput;

  constructor(page: Page) {
    super(page);
    this.phoneInput = this.page.locator('#new-renew-countersignatory-phone-number').first();
    this.emailInput = this.page.locator('#new-renew-countersignatory-email').first();
  }

  async answerCounterSignatoryContactDetails(phone: string, email: string): Promise<void> {
    await this.fillField(this.phoneInput, phone);
    await this.fillField(this.emailInput, email);
    await this.clickContinueButton();
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? 'Error: Countersignatory\'s contact details'
      : 'Countersignatory\'s contact details';
  }
}





