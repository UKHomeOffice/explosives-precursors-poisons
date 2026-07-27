import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class whatIsNameOnLicencePage extends basePage {
  private readonly titleSelect;
  private readonly firstNameInput;
  private readonly middleNameInput;
  private readonly lastNameInput;

  constructor(page: Page) {
    super(page);
    this.titleSelect = this.page.locator('#amend-name-title').first();
    this.firstNameInput = this.page.locator('#amend-firstname').first();
    this.middleNameInput = this.page.locator('#amend-middlename').first();
    this.lastNameInput = this.page.locator('#amend-lastname').first();
  }

  async answerNameOnLicence(titleValue: string, firstName: string, middleName: string, lastName: string): Promise<void> {
    await this.titleSelect.selectOption(titleValue);
    await this.fillField(this.firstNameInput, firstName);
    await this.fillField(this.middleNameInput, middleName);
    await this.fillField(this.lastNameInput, lastName);
    await this.clickContinueButton();
  }
  
  async expectedPageTitle(): Promise<string> {
    return (await this.page.title()) || '';
  }
}

