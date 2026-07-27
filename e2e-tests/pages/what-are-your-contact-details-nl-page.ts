import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class whatAreYourContactDetailsNLPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async whatAreYourContactDetailsEPP(phoneValue: string, emailValue: string): Promise<void> {
    const phone = this.page.getByLabel('Contact phone number', { exact: true }).first();
    const email = this.page.getByLabel('Email address', { exact: true }).first();

    await this.fillField(phone, phoneValue);
    await this.fillField(email, emailValue);
    await this.clickContinueButton();
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? 'Error: What are your contact details?'
      : 'What are your contact details?';
  }
}




