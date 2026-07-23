import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class WhatIsYourDOBRepPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async answerDOB(day: string, month: string, year: string): Promise<void> {
    await this.fillDate(day, month, year);
    await this.clickContinueButton();
  }
  async expectedPageTitle(): Promise<string> {
    return (await this.page.title()) || '';
  }
}
