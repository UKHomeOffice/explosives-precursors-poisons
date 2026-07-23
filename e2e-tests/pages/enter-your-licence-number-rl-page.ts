import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class enterYourLicenceNumberRLPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async enterLicenceNumber(licenceNumber: string): Promise<void> {
    await this.page.locator('#new-renew-licence-number').first().fill(licenceNumber);
    await this.clickContinueButton();
  }
  async expectedPageTitle(): Promise<string> {
    return (await this.page.title()) || '';
  }
}

