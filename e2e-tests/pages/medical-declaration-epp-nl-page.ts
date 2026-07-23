import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class medicalDeclarationEppNLPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async MedicalDeclareEpp(): Promise<void> {
    await this.page.getByLabel('I have read and agree to this medical declaration', { exact: true }).first().check();
    await this.clickContinueButton();
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? 'Error: Medical declaration'
      : 'Medical declaration';
  }
}




