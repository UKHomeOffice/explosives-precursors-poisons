import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class ExplosivesPrecursorSummaryAmendLicencePage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async explosiveAndPrecursorsSummaryAmendLicence(): Promise<void> {
    await this.clickContinueButton();
  }
  async expectedPageTitle(): Promise<string> {
    return (await this.page.title()) || '';
  }
}
