import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class RegulatedPoisonsRepPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async answerYesRegulatedPoison(value: string): Promise<void> {
    await this.pickRadioByText(value);
    await this.clickContinueButton();
  }

  async answerNoRegulatedPoison(value: string): Promise<void> {
    await this.pickRadioByText(value);
    await this.clickContinueButton();
  }
  async expectedPageTitle(): Promise<string> {
    return (await this.page.title()) || '';
  }
}
