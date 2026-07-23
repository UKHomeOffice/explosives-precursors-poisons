import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class ammoniumNitrateOrAbove16NitrogenNLPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async answerAmmoniumNitrate(reason: string, amount: string, amountUnit: string, concentration: string): Promise<void> {
    const reasonInput = this.page.locator('#why-need-precursor').first();
    const amountInput = this.page.locator('#how-much-precursor-amount').first();
    const amountUnitInput = this.page.locator('#how-much-precursor-unit').first();
    const concentrationInput = this.page.locator('#what-concentration-precursor').first();

    await this.fillField(reasonInput, reason);
    await this.fillField(amountInput, amount);
    await amountUnitInput.selectOption(amountUnit);
    await this.fillField(concentrationInput, concentration);
  }

  async storeInUkAddress(): Promise<void> {
    const homeStore = this.page.locator('#where-to-store-precursor-store-precursors-home-address-value').first();
    await homeStore.click();
  }

  async storeInOtherAddress(otherAddress: string): Promise<void> {
    const otherStore = this.page.locator('#where-to-store-precursor-store-precursors-other-address-value').first();
    const otherAddressInput = this.page.locator('#store-precursors-other-address').first();

    await otherStore.click();
    await this.fillField(otherAddressInput, otherAddress);
  }

  async useUkAddress(): Promise<void> {
    const homeUse = this.page.locator('#where-to-use-precursor-use-precursors-home-address-value').first();
    await homeUse.click();
  }

  async useOtherAddress(otherAddress: string): Promise<void> {
    const otherUse = this.page.locator('#where-to-use-precursor-use-precursors-other-address-value').first();
    const otherAddressInput = this.page.locator('#precursors-use-other-address').first();

    await otherUse.click();
    await this.fillField(otherAddressInput, otherAddress);
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? 'Error: Ammonium nitrate at or above 16% nitrogen'
      : 'Ammonium nitrate at or above 16% nitrogen';
  }
}