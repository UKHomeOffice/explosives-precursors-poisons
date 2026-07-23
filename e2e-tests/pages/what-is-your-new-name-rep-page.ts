import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class whatIsYourNewNameRepPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async answerNameOnLicence(
    title: string,
    firstName: string,
    middleName: string,
    lastName: string,
    day: string,
    month: string,
    year: string,
  ): Promise<void> {
    const titleSelect = this.page.locator('#replace-new-name-title').first();
    if (await titleSelect.isVisible().catch(() => false)) {
      await titleSelect.selectOption({ label: title });
    }

    await this.fillByLabel('First name', firstName);

    const middle = this.page.getByLabel('Middle names (optional)', { exact: true }).first();
    if (await middle.isVisible().catch(() => false)) {
      await middle.fill(middleName);
    }

    await this.fillByLabel('Last name', lastName);
    await this.fillDate(day, month, year);
    await this.clickContinueButton();
  }
  async expectedPageTitle(): Promise<string> {
    return (await this.page.title()) || '';
  }
}

