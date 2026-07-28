import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class newAppDeclarationEppNLPage extends basePage {
  private readonly declarationCheckbox;
  private readonly fallbackCheckbox;
  private readonly submitToPaymentButton;
  private readonly paymentHeading;

  constructor(page: Page) {
    super(page);
    this.declarationCheckbox = this.page.getByLabel('I have read and agree to this declaration', { exact: false }).first();
    this.fallbackCheckbox = this.page.locator('input[type="checkbox"]').first();
    this.submitToPaymentButton = this.page.locator('#report-submit input, #report-submit button').first();
    this.paymentHeading = this.page.getByRole('heading', { name: /Enter payment details|Enter card details/i }).first();
  }

  async clickCheckBoxNewApp(): Promise<void> {
    await this.page.getByRole('heading', { name: /^Declaration$/i }).first().waitFor({ state: 'visible' });

    if (await this.declarationCheckbox.isVisible().catch(() => false)) {
      await this.declarationCheckbox.check();
    } else {
      await this.fallbackCheckbox.check();
    }

    if (await this.submitToPaymentButton.isVisible().catch(() => false)) {
      await this.submitToPaymentButton.click();
    } else {
      await this.clickContinueButton();
    }

    await this.paymentHeading.waitFor({ state: 'visible' });
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? 'Error: Declaration'
      : 'Declaration';
  }
}





