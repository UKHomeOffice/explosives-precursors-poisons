import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class dNPPoisonEppNLPage extends basePage {
  private readonly reasonInput;
  private readonly amountInput;
  private readonly amountUnitSelect;
  private readonly compoundInput;
  private readonly concentrationInput;
  private readonly storeHomeOption;
  private readonly storeOtherOption;
  private readonly storeOtherAddressInput;
  private readonly useHomeOption;
  private readonly useOtherOption;
  private readonly useOtherAddressInput;

  constructor(page: Page) {
    super(page);
    this.reasonInput = this.page.locator('#why-need-poison').first();
    this.amountInput = this.page.locator('#how-much-poison-amount').first();
    this.amountUnitSelect = this.page.locator('#how-much-poison-unit').first();
    this.compoundInput = this.page.locator('#compound-or-salt').first();
    this.concentrationInput = this.page.locator('#what-concentration-poison').first();
    this.storeHomeOption = this.page.locator('#where-to-store-poison-store-poison-home-address-value').first();
    this.storeOtherOption = this.page.locator('#where-to-store-poison-store-poison-other-address-value').first();
    this.storeOtherAddressInput = this.page.locator('#store-poison-other-address').first();
    this.useHomeOption = this.page.locator('#where-to-use-poison-use-poison-home-address').or(this.page.locator('#where-to-use-poison-use-poison-home-address-value')).first();
    this.useOtherOption = this.page.locator('#where-to-use-poison-use-poison-other-address').or(this.page.locator('#where-to-use-poison-use-poison-other-address-value')).first();
    this.useOtherAddressInput = this.page.locator('#poison-use-other-address').first();
  }

  async answerDNP(reason: string, amount: string, amountUnit: string, compoundOrSalt: string, concentration: string): Promise<void> {
    await this.fillField(this.reasonInput, reason);
    await this.fillField(this.amountInput, amount);
    await this.amountUnitSelect.selectOption(amountUnit);
    await this.fillField(this.compoundInput, compoundOrSalt);
    await this.fillField(this.concentrationInput, concentration);
  }

  async storePoisonInUkAddress(): Promise<void> {
    await this.storeHomeOption.check();
  }

  async storePoisonInOtherAddress(otherAddress: string): Promise<void> {
    await this.storeOtherOption.check();
    await this.fillField(this.storeOtherAddressInput, otherAddress);
  }

  async usePoisonUkAddress(): Promise<void> {
    await this.useHomeOption.check();
  }

  async usePoisonOtherAddress(otherAddress: string): Promise<void> {
    if (!(await this.useOtherOption.isChecked().catch(() => false))) {
      const byLabel = this.page.getByRole('checkbox', { name: /^Other address$/i }).nth(1);
      if (await byLabel.isVisible().catch(() => false)) {
        await byLabel.check({ force: true });
      } else {
        await this.useOtherOption.check({ force: true });
      }
    }

    if (await this.useOtherAddressInput.isVisible().catch(() => false)) {
      await this.fillField(this.useOtherAddressInput, otherAddress);
    }
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? 'Error: 2,4-dinitrophenol (DNP) and its compounds including dinitrophenolate'
      : '2,4-dinitrophenol (DNP) and its compounds including dinitrophenolate';
  }
}




