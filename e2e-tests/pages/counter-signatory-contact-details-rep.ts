import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class CounterSignatoryContactDetailsRepPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async answerCounterSignatoryContactDetails(phone: string, email: string): Promise<void> {
    await this.page.locator('#replace-countersignatory-phone-number').first().fill(phone);
    await this.page.locator('#replace-countersignatory-email').first().fill(email);
    await this.clickContinueButton();
  }
  async expectedPageTitle(): Promise<string> {
    return (await this.page.title()) || '';
  }
}
