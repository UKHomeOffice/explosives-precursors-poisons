import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class AmendLicenceDetailsPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async answerYesAmendLicenceDetails(value: string): Promise<void> {
    await this.chooseYesNo(value);
    await this.clickContinueButton();
  }

  async answerNoAmendLicenceDetails(value: string): Promise<void> {
    await this.chooseYesNo(value);
    await this.clickContinueButton();
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? 'Error: Amend your licence'
      : 'Amend your licence';
  }
}




