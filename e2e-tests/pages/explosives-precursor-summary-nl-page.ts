import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class explosivesPrecursorSummaryNLPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async addAnotherExplosivePrecursors(): Promise<void> {
    await this.clickContinueButton();
  }

  async explosiveAndPrecursorsSummary(): Promise<void> {
    await this.clickContinueButton();
  }
  async expectedPageTitle(): Promise<string> {
    return (await this.page.title()) || '';
  }
}

