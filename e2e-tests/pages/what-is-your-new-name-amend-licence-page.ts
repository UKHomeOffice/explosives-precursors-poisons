import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class whatIsYourNewNameAmendLicencePage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async answerYourNewName(
    titleValue: string,
    firstName: string,
    middleName: string,
    lastName: string,
    day: string,
    month: string,
    year: string,
  ): Promise<void> {
    const title = this.page.getByLabel('Title', { exact: true }).first();
    if (await title.isVisible().catch(() => false)) {
      await title.selectOption({ label: titleValue });
    }

    await this.fillAny(['First name'], firstName);
    await this.fillAny(['Middle names (optional)', 'Middle name'], middleName);
    await this.fillAny(['Last name'], lastName);
    await this.fillDate(day, month, year);
    await this.clickContinueButton();
  }
  async expectedPageTitle(): Promise<string> {
    return (await this.page.title()) || '';
  }
}

