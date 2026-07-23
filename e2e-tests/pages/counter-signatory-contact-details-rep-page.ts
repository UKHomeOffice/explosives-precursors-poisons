import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class counterSignatoryContactDetailsRepPage extends basePage {
  private readonly phoneInput;
  private readonly emailInput;

  constructor(page: Page) {
    super(page);
    this.phoneInput = this.page.locator('#replace-countersignatory-phone-number').first();
    this.emailInput = this.page.locator('#replace-countersignatory-email').first();
  }

  async answerCounterSignatoryContactDetails(phone: string, email: string): Promise<void> {
    await this.fillField(this.phoneInput, phone);
    await this.fillField(this.emailInput, email);
    await this.clickContinueButton();
  }

  async expectedPageTitle(): Promise<string> {
    return (await this.page.title()) || '';
  }
}

