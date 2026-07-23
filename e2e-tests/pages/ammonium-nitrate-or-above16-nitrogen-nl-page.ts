import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class ammoniumNitrateOrAbove16NitrogenNLPage extends basePage {
  private readonly reasonInput;
  private readonly amountInput;
  private readonly amountUnitInput;
  private readonly concentrationInput;
  private readonly homeStoreOption;
  private readonly otherStoreOption;
  private readonly storeOtherAddressInput;
  private readonly homeUseOption;
  private readonly otherUseOption;
  private readonly useOtherAddressInput;

  constructor(page: Page) {
    super(page);
    this.reasonInput = this.page.locator('#why-need-precursor').first();
    this.amountInput = this.page.locator('#how-much-precursor-amount').first();
    this.amountUnitInput = this.page.locator('#how-much-precursor-unit').first();
    this.concentrationInput = this.page.locator('#what-concentration-precursor').first();
    this.homeStoreOption = this.page.locator('#where-to-store-precursor-store-precursors-home-address-value').first();
    this.otherStoreOption = this.page.locator('#where-to-store-precursor-store-precursors-other-address-value').first();
    this.storeOtherAddressInput = this.page.locator('#store-precursors-other-address').first();
    this.homeUseOption = this.page.locator('#where-to-use-precursor-use-precursors-home-address-value').first();
    this.otherUseOption = this.page.locator('#where-to-use-precursor-use-precursors-other-address-value').first();
    this.useOtherAddressInput = this.page.locator('#precursors-use-other-address').first();
  }

  async answerAmmoniumNitrate(reason: string, amount: string, amountUnit: string, concentration: string): Promise<void> {
    await this.fillField(this.reasonInput, reason);
    await this.fillField(this.amountInput, amount);
    await this.amountUnitInput.selectOption(amountUnit);
    await this.fillField(this.concentrationInput, concentration);
  }

  async storeInUkAddress(): Promise<void> {
    await this.homeStoreOption.click();
  }

  async storeInOtherAddress(otherAddress: string): Promise<void> {
    await this.otherStoreOption.click();
    await this.fillField(this.storeOtherAddressInput, otherAddress);
  }

  async useUkAddress(): Promise<void> {
    await this.homeUseOption.click();
  }

  async useOtherAddress(otherAddress: string): Promise<void> {
    await this.otherUseOption.click();
    await this.fillField(this.useOtherAddressInput, otherAddress);
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? 'Error: Ammonium nitrate at or above 16% nitrogen'
      : 'Ammonium nitrate at or above 16% nitrogen';
  }
}