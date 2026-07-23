import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class NewAppDeclarationEppNLPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async clickCheckBoxNewApp(): Promise<void> {
    await this.page.getByRole('heading', { name: /^Declaration$/i }).first().waitFor({ state: 'visible' });

    const declaration = this.page.getByLabel('I have read and agree to this declaration', { exact: false }).first();
    if (await declaration.isVisible().catch(() => false)) {
      await declaration.check();
    } else {
      await this.page.locator('input[type="checkbox"]').first().check();
    }

    const submitToPayment = this.page.locator('#report-submit input, #report-submit button').first();
    if (await submitToPayment.isVisible().catch(() => false)) {
      await submitToPayment.click();
    } else {
      await this.clickContinueButton();
    }

    await this.page.getByRole('heading', { name: /Enter payment details|Enter card details/i }).first().waitFor({ state: 'visible' });
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? 'Error: Declaration'
      : 'Declaration';
  }
}




