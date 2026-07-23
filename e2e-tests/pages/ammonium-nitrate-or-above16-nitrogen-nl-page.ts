import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class ammoniumNitrateOrAbove16NitrogenNLPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async answerAmmoniumNitrate(reason: string, amount: string, amountUnit: string, concentration: string): Promise<void> {
    await this.page.locator('#why-need-precursor').first().fill(reason);
    await this.page.locator('#how-much-precursor-amount').first().fill(amount);
    await this.page.locator('#how-much-precursor-unit').first().selectOption(amountUnit);
    await this.page.locator('#what-concentration-precursor').first().fill(concentration);
  }

  async storeInUkAddress(): Promise<void> {
    const homeStore = this.page.locator('#where-to-store-precursor-store-precursors-home-address-value').first();
    if (!(await homeStore.isChecked().catch(() => false))) {
      await homeStore.click();
    }
  }

  async storeInOtherAddress(otherAddress: string): Promise<void> {
    const otherStore = this.page.locator('#where-to-store-precursor-store-precursors-other-address-value').first();
    if (!(await otherStore.isChecked().catch(() => false))) {
      await otherStore.click();
    }
    await this.page.locator('#store-precursors-other-address').first().fill(otherAddress);
  }

  async useUkAddress(): Promise<void> {
    const homeUse = this.page.locator('#where-to-use-precursor-use-precursors-home-address-value').first();
    if (!(await homeUse.isChecked().catch(() => false))) {
      await homeUse.click();
    }
  }

  async useOtherAddress(otherAddress: string): Promise<void> {
    const otherUse = this.page.locator('#where-to-use-precursor-use-precursors-other-address-value').first();
    if (!(await otherUse.isChecked().catch(() => false))) {
      await otherUse.click();
    }
    await this.page.locator('#precursors-use-other-address').first().fill(otherAddress);
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? 'Error: Ammonium nitrate at or above 16% nitrogen'
      : 'Ammonium nitrate at or above 16% nitrogen';
  }
}




