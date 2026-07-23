import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class PoisonDetailsRepPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async answerDNP(reason: string, amount: string, amountUnit: string, compoundOrSalt: string, concentration: string): Promise<void> {
    const reasonInput = this.page.locator('#why-need-poison').first();
    if (await reasonInput.isVisible().catch(() => false)) {
      await reasonInput.fill(reason);
    }

    const amountInput = this.page.locator('#how-much-poison-amount').first();
    if (await amountInput.isVisible().catch(() => false)) {
      await amountInput.fill(amount);
    }

    const unitSelect = this.page.locator('#how-much-poison-unit').first();
    if (await unitSelect.isVisible().catch(() => false)) {
      const optionTexts = await unitSelect.locator('option').allTextContents();
      const matched = optionTexts.find((o) => o.trim().toLowerCase() === amountUnit.trim().toLowerCase()) || amountUnit;
      await unitSelect.selectOption({ label: matched });
    }

    const compoundInput = this.page.locator('#compound-or-salt').first();
    if (await compoundInput.isVisible().catch(() => false)) {
      await compoundInput.fill(compoundOrSalt);
    }

    const concentrationInput = this.page.locator('#what-concentration-poison').first();
    if (await concentrationInput.isVisible().catch(() => false)) {
      await concentrationInput.fill(concentration);
    }
  }

  async storeInUkAddress(): Promise<void> {
    const home = this.page.locator('#where-to-store-poison-store-poison-home-address-value').first();
    if (await home.isVisible().catch(() => false)) {
      await home.check();
      return;
    }
    await this.page.getByRole('checkbox').first().check();
  }

  async storeInOtherAddress(address: string): Promise<void> {
    const other = this.page.locator('#where-to-store-poison-store-poison-other-address-value').first();
    if (await other.isVisible().catch(() => false)) {
      await other.check();
    } else {
      await this.page.getByRole('checkbox', { name: /other address/i }).first().check();
    }

    const storageAddress = this.page.locator('#poison-store-other-address').first();
    if (await storageAddress.isVisible().catch(() => false)) {
      await storageAddress.fill(address);
    } else {
      await this.fillAny([
        'Storage address for the Thallium',
        'Storage address',
        'Address',
      ], address);
    }
  }

  async useUkAddress(): Promise<void> {
    const home = this.page.locator('#where-to-use-poison-use-poison-home-address').first();
    if (await home.isVisible().catch(() => false)) {
      await home.check();
      return;
    }
    await this.page.getByRole('checkbox').nth(2).check();
  }

  async useOtherAddress(address: string): Promise<void> {
    const other = this.page.locator('#where-to-use-poison-use-poison-other-address').first();
    if (await other.isVisible().catch(() => false)) {
      await other.check();
    } else {
      await this.page.getByRole('checkbox', { name: /other address/i }).last().check();
    }

    const usageAddress = this.page.locator('#poison-use-other-address').first();
    if (await usageAddress.isVisible().catch(() => false)) {
      await usageAddress.fill(address);
    } else {
      await this.fillAny([
        'Usage address for the Thallium',
        'Usage address',
        'Address',
      ], address);
    }
  }
  async expectedPageTitle(): Promise<string> {
    return (await this.page.title()) || '';
  }
}
