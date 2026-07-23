import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class WhatTypeOfApplicationPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async clickApplyNewLicence(): Promise<void> {
    await this.pickRadioByText('Apply for a new licence');
    await this.clickContinueButton();
  }

  async clickAmendLicence(): Promise<void> {
    await this.pickRadioByText('Amend a licence');
    await this.clickContinueButton();
  }

  async clickRenewApplication(): Promise<void> {
    await this.pickRadioByText('Renew a licence');
    await this.clickContinueButton();
  }

  async clickReplaceApplication(): Promise<void> {
    await this.pickRadioByText('Replace a licence');
    await this.clickContinueButton();
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? 'Error: What type of application do you need to make? – Explosives precursors and poisons licensing'
      : 'What type of application do you need to make? – Explosives precursors and poisons licensing';
  }
}



