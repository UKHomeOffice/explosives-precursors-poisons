import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class ePDetailsRepPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async answerAmmoniumNitrate(reason: string, amount: string, amountUnit: string, concentration: string): Promise<void> {
    const reasonInput = this.page.locator('#why-need-precursor').first();
    if (await reasonInput.isVisible().catch(() => false)) {
      await reasonInput.fill(reason);
    }

    const amountInput = this.page.locator('#how-much-precursor-amount').first();
    if (await amountInput.isVisible().catch(() => false)) {
      await amountInput.fill(amount);
    }

    const unitSelect = this.page.locator('#how-much-precursor-unit').first();
    if (await unitSelect.isVisible().catch(() => false)) {
      const optionTexts = await unitSelect.locator('option').allTextContents();
      const matched = optionTexts.find((o) => o.trim().toLowerCase() === amountUnit.trim().toLowerCase()) || amountUnit;
      await unitSelect.selectOption({ label: matched });
    }

    const concentrationInput = this.page.locator('#what-concentration-precursor').first();
    if (await concentrationInput.isVisible().catch(() => false)) {
      await concentrationInput.fill(concentration);
    }
  }

  async storeInUkAddress(): Promise<void> {
    const home = this.page.locator('#where-to-store-precursor-store-precursors-home-address-value').first();
    if (await home.isVisible().catch(() => false)) {
      await home.check();
      return;
    }
    await this.page.getByRole('checkbox').first().check();
  }

  async storeInOtherAddress(address: string): Promise<void> {
    const other = this.page.locator('#where-to-store-precursor-store-precursors-other-address-value').first();
    if (await other.isVisible().catch(() => false)) {
      await other.check();
    } else {
      await this.page.getByRole('checkbox', { name: /other address/i }).first().check();
    }

    await this.fillAny([
      'Storage address for the Nitromethane',
      'Storage address',
      'Address',
    ], address);
  }

  async useUkAddress(): Promise<void> {
    const home = this.page.locator('#where-to-use-precursor-use-precursors-home-address-value').first();
    if (await home.isVisible().catch(() => false)) {
      await home.check();
      return;
    }
    await this.page.getByRole('checkbox').nth(2).check();
  }

  async useOtherAddress(address: string): Promise<void> {
    const other = this.page.locator('#where-to-use-precursor-use-precursors-other-address-value').first();
    if (await other.isVisible().catch(() => false)) {
      await other.check();
    } else {
      await this.page.getByRole('checkbox', { name: /other address/i }).last().check();
    }

    await this.fillAny([
      'Usage address for the Nitromethane',
      'Usage address',
      'Address',
    ], address);
  }
  async expectedPageTitle(): Promise<string> {
    return (await this.page.title()) || '';
  }
}

