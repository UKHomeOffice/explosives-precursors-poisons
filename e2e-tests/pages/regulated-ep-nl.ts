import { Page } from '@playwright/test';
import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class RegulatedEpNLPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async selectRegulatedEPRadioButton(responseRegulated: string): Promise<void> {
    const normalized = (responseRegulated || '').toLowerCase() === c.YES.toLowerCase()
      ? c.YES.toLowerCase()
      : c.NO.toLowerCase();
    const radio = this.page.locator(`#new-renew-regulated-explosives-precursors-options-${normalized}`).first();
    if (await radio.isVisible().catch(() => false)) {
      await radio.check();
    } else if (normalized === c.YES.toLowerCase()) {
      await this.page.getByRole('radio', { name: /^yes$/i }).first().check();
    } else {
      await this.page.getByRole('radio', { name: /^no$/i }).first().check();
    }
    await this.clickContinueButton();
  }
  async expectedPageTitle(): Promise<string> {
    return (await this.page.title()) || '';
  }
}
