import { Page } from '@playwright/test';
import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class otherLicencesEppNLPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async selectOtherLicences(licenceType: string, response: string): Promise<void> {
    const normalized = (response || '').toLowerCase() === c.YES.toLowerCase()
      ? c.YES.toLowerCase()
      : c.NO.toLowerCase();
    const selector = `input[type="radio"][name*="${licenceType}"][value="${normalized}"]`;
    const radio = this.page.locator(selector).first();
    if (await radio.isVisible().catch(() => false)) {
      await radio.check();
      return;
    }

    if (normalized === c.YES.toLowerCase()) {
      await this.page.getByRole('radio', { name: /^yes$/i }).first().check();
      return;
    }

    await this.page.getByRole('radio', { name: /^no$/i }).first().check();
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? 'Error: Other licences'
      : 'Other licences';
  }
}




