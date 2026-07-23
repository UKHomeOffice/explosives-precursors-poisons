import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class RefusedLicenceHistoryEppNLPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async addAnotherRefusal(): Promise<void> {
    await this.page.getByRole('link', { name: 'Add another refusal or revocation', exact: true }).click();
  }

  async revokedLicenceHistory(): Promise<void> {
    await this.clickContinueButton();
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? 'Error: Revoked or refused licence history'
      : 'Revoked or refused licence history';
  }
}



