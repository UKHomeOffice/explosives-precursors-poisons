import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class declarationAmendLicencePage extends basePage {
  private readonly declarationCheckbox;
  private readonly declarationLabelCheckbox;
  private readonly submitButton;

  constructor(page: Page) {
    super(page);
    this.declarationCheckbox = this.page.locator('#amend-declaration').first();
    this.declarationLabelCheckbox = this.page.getByLabel('I have read and agree to this declaration', { exact: true }).first();
    this.submitButton = this.page.getByRole('button', { name: /^submit$/i }).first();
  }

  async answerDeclarationAmendLicence(): Promise<void> {
    if (await this.declarationCheckbox.isVisible().catch(() => false)) {
      await this.declarationCheckbox.check();
    } else {
      await this.declarationLabelCheckbox.check();
    }
    if (await this.submitButton.isVisible().catch(() => false)) {
      await this.submitButton.click();
      return;
    }

    await this.clickContinueButton();
  }
  async expectedPageTitle(): Promise<string> {
    return (await this.page.title()) || '';
  }
}

