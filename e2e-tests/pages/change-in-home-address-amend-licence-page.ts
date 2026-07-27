import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class changeInHomeAddressAmendLicencePage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async answerYesAmendHomeAddressOnLicence(value: string): Promise<void> {
    await this.chooseYesNo(value);
    await this.clickContinueButton();
  }

  async answerNoAmendHomeAddressOnLicence(value: string): Promise<void> {
    await this.chooseYesNo(value);
    await this.clickContinueButton();
  }
  async expectedPageTitle(): Promise<string> {
    return (await this.page.title()) || '';
  }
}

