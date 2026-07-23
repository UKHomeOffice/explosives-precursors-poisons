import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class DeclarationAmendLicencePage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async answerDeclarationAmendLicence(): Promise<void> {
    const declaration = this.page.locator('#amend-declaration').first();
    if (await declaration.isVisible().catch(() => false)) {
      await declaration.check();
    } else {
      await this.page.getByLabel('I have read and agree to this declaration', { exact: true }).first().check();
    }
    const submit = this.page.getByRole('button', { name: /^submit$/i }).first();
    if (await submit.isVisible().catch(() => false)) {
      await submit.click();
      return;
    }

    await this.clickContinueButton();
  }
  async expectedPageTitle(): Promise<string> {
    return (await this.page.title()) || '';
  }
}
