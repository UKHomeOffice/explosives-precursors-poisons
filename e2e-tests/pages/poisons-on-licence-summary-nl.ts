import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class PoisonsOnLicenceSummaryNLPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async addAnotherPoison(): Promise<void> {
    await this.page.getByRole('link', { name: 'Add another explosives precursors', exact: true }).click();
  }

  async PoisonOnLicenceSummary(): Promise<void> {
    await this.clickContinueButton();
  }
  async expectedPageTitle(): Promise<string> {
    return (await this.page.title()) || '';
  }
}
