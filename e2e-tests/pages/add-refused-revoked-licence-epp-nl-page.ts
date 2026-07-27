import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class addRefusedRevokedLicenceEppNLPage extends basePage {
  private readonly reasonInput;
  private readonly firearmsOption;
  private readonly shotgunOption;

  constructor(page: Page) {
    super(page);
    this.reasonInput = this.page.locator('#new-renew-why-licence-refused').first();
    this.firearmsOption = this.page.locator('#new-renew-licence-type-Firearms').first();
    this.shotgunOption = this.page.locator('#new-renew-licence-type-Shotgun').first();
  }

  async reasonAndDateFirearmRefused(reason: string, day: string, month: string, year: string): Promise<void> {
    await this.firearmsOption.check();
    await this.fillField(this.reasonInput, reason);
    await this.fillDate(day, month, year);
    await this.clickContinueButton();
  }

  async reasonAndDateShotGunRefused(reason: string, day: string, month: string, year: string): Promise<void> {
    await this.shotgunOption.check();
    await this.fillField(this.reasonInput, reason);
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