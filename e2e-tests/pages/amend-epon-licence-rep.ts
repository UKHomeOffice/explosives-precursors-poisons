import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class AmendEPOnLicenceRepPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async answerYesAmendEPRep(value: string): Promise<void> {
    await this.pickRadioByText(value);
    await this.clickContinueButton();
  }

  async answerNoAmendEPRep(value: string): Promise<void> {
    await this.pickRadioByText(value);
    await this.clickContinueButton();
  }
  async expectedPageTitle(): Promise<string> {
    return (await this.page.title()) || '';
  }
}
