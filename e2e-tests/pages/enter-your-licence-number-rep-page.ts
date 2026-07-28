import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class enterYourLicenceNumberRepPage extends basePage {
  private readonly byIdInput;
  private readonly byNameInput;
  private readonly byLabelInput;

  constructor(page: Page) {
    super(page);
    this.byIdInput = this.page.locator('#new-renew-licence-number, #replace-licence-number').first();
    this.byNameInput = this.page.locator('input[name="new-renew-licence-number"], input[name="replace-licence-number"]').first();
    this.byLabelInput = this.page.getByLabel('Licence number', { exact: true }).first();
  }

  async answerLicenceNumber(licenceNumber: string): Promise<void> {
    if (await this.byIdInput.isVisible().catch(() => false)) {
      await this.fillField(this.byIdInput, licenceNumber);
    } else {
      if (await this.byNameInput.isVisible().catch(() => false)) {
        await this.fillField(this.byNameInput, licenceNumber);
      } else {
        await this.fillField(this.byLabelInput, licenceNumber);
      }
    }
    await this.clickContinueButton();
  }
  async expectedPageTitle(): Promise<string> {
    return (await this.page.title()) || '';
  }
}

