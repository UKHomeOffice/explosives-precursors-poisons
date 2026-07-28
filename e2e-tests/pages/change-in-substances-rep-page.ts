import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class changeInSubstancesRepPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async answerYesChangeInSubstances(value: string): Promise<void> {
    await this.pickRadioByText(value);
    await this.clickContinueButton();
  }

  async answerNoChangeInSubstances(value: string): Promise<void> {
    await this.pickRadioByText(value);
    await this.clickContinueButton();
  }
  async expectedPageTitle(): Promise<string> {
    return (await this.page.title()) || '';
  }
}

