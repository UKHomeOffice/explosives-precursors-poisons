import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class whatIsNameOnLicencePage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async answerNameOnLicence(titleValue: string, firstName: string, middleName: string, lastName: string): Promise<void> {
    const title = this.page.locator('#amend-name-title').first();
    if (await title.isVisible().catch(() => false)) {
      await title.selectOption(titleValue);
    }

    await this.page.locator('#amend-firstname').first().fill(firstName);
    const middle = this.page.locator('#amend-middlename').first();
    if (await middle.isVisible().catch(() => false)) {
      await middle.fill(middleName);
    }
    await this.page.locator('#amend-lastname').first().fill(lastName);
    await this.clickContinueButton();
  }
  async expectedPageTitle(): Promise<string> {
    return (await this.page.title()) || '';
  }
}

