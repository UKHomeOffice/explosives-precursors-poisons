import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class whatAreYourContactDetailsRepPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async answerContactDetails(phone: string, email: string): Promise<void> {
    await this.fillByLabel('Contact phone number', phone);
    await this.fillByLabel('Email address', email);
    await this.clickContinueButton();
  }
  async expectedPageTitle(): Promise<string> {
    return (await this.page.title()) || '';
  }
}

