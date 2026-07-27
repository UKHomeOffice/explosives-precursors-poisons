import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class uploadPassportRepPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async answerEUPassport(filePath: string): Promise<void> {
    await this.uploadFirstInput(filePath);
    await this.clickContinueButton();
  }
  async expectedPageTitle(): Promise<string> {
    return (await this.page.title()) || '';
  }
}

