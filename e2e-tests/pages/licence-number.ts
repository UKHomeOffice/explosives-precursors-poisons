import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class LicenceNumberPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async enterLicenceNumberToAmend(licenceNumber: string): Promise<void> {
    await this.page.locator('#amend-licence-number').first().fill(licenceNumber);
    await this.clickContinueButton();
  }
  async expectedPageTitle(): Promise<string> {
    return (await this.page.title()) || '';
  }
}
