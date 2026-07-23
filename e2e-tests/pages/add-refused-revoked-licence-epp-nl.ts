import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class AddRefusedRevokedLicenceEppNLPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async reasonAndDateFirearmRefused(reason: string, day: string, month: string, year: string): Promise<void> {
    await this.page.locator('#new-renew-licence-type-Firearms').first().check();
    await this.page.locator('#new-renew-why-licence-refused').first().fill(reason);
    await this.fillDate(day, month, year);
    await this.clickContinueButton();
  }

  async reasonAndDateShotGunRefused(reason: string, day: string, month: string, year: string): Promise<void> {
    await this.page.locator('#new-renew-licence-type-Shotgun').first().check();
    await this.page.locator('#new-renew-why-licence-refused').first().fill(reason);
    await this.fillDate(day, month, year);
    await this.clickContinueButton();
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? 'Error: Add a refused or revoked licence'
      : 'Add a refused or revoked licence';
  }
}



