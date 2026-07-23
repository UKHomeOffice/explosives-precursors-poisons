import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class CheckYourAnswersRepPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async replaceCheckYouAnswers(): Promise<void> {
    await this.clickContinueButton();
  }
  async expectedPageTitle(): Promise<string> {
    return (await this.page.title()) || '';
  }
}
