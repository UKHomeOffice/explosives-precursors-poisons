import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class whatIsYourNewNameRepPage extends basePage {
  private readonly titleSelect;
  private readonly middleNameInput;

  constructor(page: Page) {
    super(page);
    this.titleSelect = this.page.locator('#replace-new-name-title').first();
    this.middleNameInput = this.page.getByLabel('Middle names (optional)', { exact: true }).first();
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
    await this.titleSelect.selectOption({ label: title });
    await this.fillByLabel('First name', firstName);
    await this.fillField(this.middleNameInput, middleName);
    await this.fillByLabel('Last name', lastName);
    await this.fillDate(day, month, year);
    await this.clickContinueButton();
  }
  async expectedPageTitle(): Promise<string> {
    return (await this.page.title()) || '';
  }
}

