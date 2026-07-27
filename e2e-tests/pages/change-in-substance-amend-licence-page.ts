import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class changeInSubstanceAmendLicencePage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async answerYesAmendSubstance(value: string): Promise<void> {
    await this.chooseYesNo(value);
    await this.clickContinueButton();
  }

  async answerNoAmendSubstance(value: string): Promise<void> {
    await this.chooseYesNo(value);
    await this.clickContinueButton();
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? 'Error: Change in substances'
      : 'Change in substances';
  }
}