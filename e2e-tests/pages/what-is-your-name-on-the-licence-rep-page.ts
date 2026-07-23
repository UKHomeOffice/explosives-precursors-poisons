import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class whatIsYourNameOnTheLicenceRepPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async answerNameOnLicence(title: string, firstName: string, middleName: string, lastName: string): Promise<void> {
    const titleSelect = this.page.locator('#replace-title').first();
    if (await titleSelect.isVisible().catch(() => false)) {
      await titleSelect.selectOption({ label: title });
    }

    await this.fillByLabel('First name', firstName);

    const middle = this.page.getByLabel('Middle names (optional)', { exact: true }).first();
    if (await middle.isVisible().catch(() => false)) {
      await middle.fill(middleName);
    }

    await this.fillByLabel('Last name', lastName);
    await this.clickContinueButton();
  }
  async expectedPageTitle(): Promise<string> {
    return (await this.page.title()) || '';
  }
}

