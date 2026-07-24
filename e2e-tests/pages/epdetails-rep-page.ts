import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class ePDetailsRepPage extends basePage {
  private readonly reasonInput;
  private readonly amountInput;
  private readonly unitSelect;
  private readonly concentrationInput;
  private readonly storeHomeOption;
  private readonly storeOtherOption;
  private readonly useHomeOption;
  private readonly useOtherOption;

  constructor(page: Page) {
    super(page);
    this.reasonInput = this.page.locator('#why-need-precursor').first();
    this.amountInput = this.page.locator('#how-much-precursor-amount').first();
    this.unitSelect = this.page.locator('#how-much-precursor-unit').first();
    this.concentrationInput = this.page.locator('#what-concentration-precursor').first();
    this.storeHomeOption = this.page.locator('#where-to-store-precursor-store-precursors-home-address-value').first();
    this.storeOtherOption = this.page.locator('#where-to-store-precursor-store-precursors-other-address-value').first();
    this.useHomeOption = this.page.locator('#where-to-use-precursor-use-precursors-home-address-value').first();
    this.useOtherOption = this.page.locator('#where-to-use-precursor-use-precursors-other-address-value').first();
  }

  async answerAmmoniumNitrate(reason: string, amount: string, amountUnit: string, concentration: string): Promise<void> {
      await this.fillField(this.reasonInput, reason);
      await this.fillField(this.amountInput, amount);
      const optionTexts = await this.unitSelect.locator('option').allTextContents();
      const matched = optionTexts.find((o) => o.trim().toLowerCase() === amountUnit.trim().toLowerCase()) || amountUnit;
      await this.unitSelect.selectOption({ label: matched });
      await this.fillField(this.concentrationInput, concentration);
  }

  async storeInUkAddress(): Promise<void> {
    if (await this.storeHomeOption.isVisible().catch(() => false)) {
      await this.storeHomeOption.check();
      return;
    }
    await this.page.getByRole('checkbox').first().check();
  }

  async storeInOtherAddress(address: string): Promise<void> {
    if (await this.storeOtherOption.isVisible().catch(() => false)) {
      await this.storeOtherOption.check();
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
    if (await this.useHomeOption.isVisible().catch(() => false)) {
      await this.useHomeOption.check();
      return;
    }
    await this.page.getByRole('checkbox').nth(2).check();
  }

  async useOtherAddress(address: string): Promise<void> {
    if (await this.useOtherOption.isVisible().catch(() => false)) {
      await this.useOtherOption.check();
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

