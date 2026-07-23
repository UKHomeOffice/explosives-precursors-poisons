import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class enterYourLicenceNumberRepPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async answerLicenceNumber(licenceNumber: string): Promise<void> {
    const byId = this.page.locator('#new-renew-licence-number, #replace-licence-number').first();
    if (await byId.isVisible().catch(() => false)) {
      await byId.fill(licenceNumber);
    } else {
      const byName = this.page.locator('input[name="new-renew-licence-number"], input[name="replace-licence-number"]').first();
      if (await byName.isVisible().catch(() => false)) {
        await byName.fill(licenceNumber);
      } else {
        await this.page.getByLabel('Licence number', { exact: true }).first().fill(licenceNumber);
      }
    }
    await this.clickContinueButton();
  }
  async expectedPageTitle(): Promise<string> {
    return (await this.page.title()) || '';
  }
}

