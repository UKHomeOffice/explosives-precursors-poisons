import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class poisonDetailsRepPage extends basePage {
  private readonly reasonInput;
  private readonly amountInput;
  private readonly unitSelect;
  private readonly compoundInput;
  private readonly concentrationInput;
  private readonly storeHomeOption;
  private readonly storeOtherOption;
  private readonly storageAddressInput;
  private readonly useHomeOption;
  private readonly useOtherOption;
  private readonly usageAddressInput;

  constructor(page: Page) {
    super(page);
    this.reasonInput = this.page.locator('#why-need-poison').first();
    this.amountInput = this.page.locator('#how-much-poison-amount').first();
    this.unitSelect = this.page.locator('#how-much-poison-unit').first();
    this.compoundInput = this.page.locator('#compound-or-salt').first();
    this.concentrationInput = this.page.locator('#what-concentration-poison').first();
    this.storeHomeOption = this.page.locator('#where-to-store-poison-store-poison-home-address-value').first();
    this.storeOtherOption = this.page.locator('#where-to-store-poison-store-poison-other-address-value').first();
    this.storageAddressInput = this.page.locator('#poison-store-other-address').first();
    this.useHomeOption = this.page.locator('#where-to-use-poison-use-poison-home-address').first();
    this.useOtherOption = this.page.locator('#where-to-use-poison-use-poison-other-address').first();
    this.usageAddressInput = this.page.locator('#poison-use-other-address').first();
  }

  async answerDNP(reason: string, amount: string, amountUnit: string, compoundOrSalt: string, concentration: string): Promise<void> {
    if (await this.reasonInput.isVisible().catch(() => false)) {
      await this.fillField(this.reasonInput, reason);
    }

    if (await this.amountInput.isVisible().catch(() => false)) {
      await this.fillField(this.amountInput, amount);
    }

    if (await this.unitSelect.isVisible().catch(() => false)) {
      const optionTexts = await this.unitSelect.locator('option').allTextContents();
      const matched = optionTexts.find((o) => o.trim().toLowerCase() === amountUnit.trim().toLowerCase()) || amountUnit;
      await this.unitSelect.selectOption({ label: matched });
    }

    if (await this.compoundInput.isVisible().catch(() => false)) {
      await this.fillField(this.compoundInput, compoundOrSalt);
    }

    if (await this.concentrationInput.isVisible().catch(() => false)) {
      await this.fillField(this.concentrationInput, concentration);
    }
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

    if (await this.storageAddressInput.isVisible().catch(() => false)) {
      await this.fillField(this.storageAddressInput, address);
    } else {
      await this.fillAny([
        'Storage address for the Thallium',
        'Storage address',
        'Address',
      ], address);
    }
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

    if (await this.usageAddressInput.isVisible().catch(() => false)) {
      await this.fillField(this.usageAddressInput, address);
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

