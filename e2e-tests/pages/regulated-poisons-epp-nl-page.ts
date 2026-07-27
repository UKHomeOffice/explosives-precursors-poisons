import { Page } from '@playwright/test';
import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class regulatedPoisonsEppNLPage extends basePage {
  private readonly yesChoice;
  private readonly noChoice;

  constructor(page: Page) {
    super(page);
    this.yesChoice = this.page.locator('#new-renew-poisons-options-yes').first();
    this.noChoice = this.page.locator('#new-renew-poisons-options-no').first();
  }

  async selectRegulatedPoisonRadioButton(responseRegulated: string): Promise<void> {
    const normalized = (responseRegulated || '').toLowerCase() === c.YES.toLowerCase()
      ? c.YES.toLowerCase()
      : c.NO.toLowerCase();
    const radio = normalized === c.YES.toLowerCase() ? this.yesChoice : this.noChoice;
    if (await radio.isVisible().catch(() => false)) {
      await radio.check();
    } else if (normalized === c.YES.toLowerCase()) {
      await this.yesChoice.check();
    } else {
      await this.noChoice.check();
    }
    await this.clickContinueButton();
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? 'Error: Regulated poisons'
      : 'Regulated poisons';
  }
}




