import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class ChangeInHomeAddressRepPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async answerYesChangeInHomeAddress(value: string): Promise<void> {
    await this.pickRadioByText(value);
    await this.clickContinueButton();
  }

  async answerNoChangeInHomeAddress(value: string): Promise<void> {
    await this.pickRadioByText(value);
    await this.clickContinueButton();
  }
  async expectedPageTitle(): Promise<string> {
    return (await this.page.title()) || '';
  }
}
