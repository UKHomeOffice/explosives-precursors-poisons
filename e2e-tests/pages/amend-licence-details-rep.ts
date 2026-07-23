import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class AmendLicenceDetailsRepPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async answerYesLicenceDetails(value: string): Promise<void> {
    await this.pickRadioByText(value);
    await this.clickContinueButton();
  }

  async answerNoLicenceDetails(value: string): Promise<void> {
    await this.pickRadioByText(value);
    await this.clickContinueButton();
  }
  async expectedPageTitle(): Promise<string> {
    return (await this.page.title()) || '';
  }
}
