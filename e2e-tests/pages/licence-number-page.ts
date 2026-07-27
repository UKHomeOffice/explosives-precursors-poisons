import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class licenceNumberPage extends basePage {
  private readonly licenceNumberInput;

  constructor(page: Page) {
    super(page);
    this.licenceNumberInput = this.page.locator('#amend-licence-number').first();
  }

  async enterLicenceNumberToAmend(licenceNumber: string): Promise<void> {
    await this.fillField(this.licenceNumberInput, licenceNumber);
    await this.clickContinueButton();
  }
  async expectedPageTitle(): Promise<string> {
    return (await this.page.title()) || '';
  }
}

