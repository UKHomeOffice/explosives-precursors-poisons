import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class whatIsYourNameOnTheLicenceRepPage extends basePage {
  private readonly titleSelect;
  private readonly middleNameInput;

  constructor(page: Page) {
    super(page);
    this.titleSelect = this.page.locator('#replace-title').first();
    this.middleNameInput = this.page.getByLabel('Middle names (optional)', { exact: true }).first();
  }

  async answerNameOnLicence(title: string, firstName: string, middleName: string, lastName: string): Promise<void> {
    if (await this.titleSelect.isVisible().catch(() => false)) {
      await this.titleSelect.selectOption({ label: title });
    }

    await this.fillByLabel('First name', firstName);

    if (await this.middleNameInput.isVisible().catch(() => false)) {
      await this.fillField(this.middleNameInput, middleName);
    }

    await this.fillByLabel('Last name', lastName);
    await this.clickContinueButton();
  }
  async expectedPageTitle(): Promise<string> {
    return (await this.page.title()) || '';
  }
}

