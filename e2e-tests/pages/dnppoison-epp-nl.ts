import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class DNPPoisonEppNLPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async answerDNP(reason: string, amount: string, amountUnit: string, compoundOrSalt: string, concentration: string): Promise<void> {
    await this.page.locator('#why-need-poison').first().fill(reason);
    await this.page.locator('#how-much-poison-amount').first().fill(amount);
    await this.page.locator('#how-much-poison-unit').first().selectOption(amountUnit);
    await this.page.locator('#compound-or-salt').first().fill(compoundOrSalt);
    await this.page.locator('#what-concentration-poison').first().fill(concentration);
  }

  async storePoisonInUkAddress(): Promise<void> {
    await this.page.locator('#where-to-store-poison-store-poison-home-address-value').first().check();
  }

  async storePoisonInOtherAddress(otherAddress: string): Promise<void> {
    await this.page.locator('#where-to-store-poison-store-poison-other-address-value').first().check();
    await this.page.locator('#store-poison-other-address').first().fill(otherAddress);
  }

  async usePoisonUkAddress(): Promise<void> {
    const homeUse = this.page
      .locator('#where-to-use-poison-use-poison-home-address')
      .or(this.page.locator('#where-to-use-poison-use-poison-home-address-value'))
      .first();
    await homeUse.check();
  }

  async usePoisonOtherAddress(otherAddress: string): Promise<void> {
    const otherUse = this.page
      .locator('#where-to-use-poison-use-poison-other-address')
      .or(this.page.locator('#where-to-use-poison-use-poison-other-address-value'))
      .first();
    if (!(await otherUse.isChecked().catch(() => false))) {
      const byLabel = this.page.getByRole('checkbox', { name: /^Other address$/i }).nth(1);
      if (await byLabel.isVisible().catch(() => false)) {
        await byLabel.check({ force: true });
      } else {
        await otherUse.check({ force: true });
      }
    }

    const otherUseAddress = this.page.locator('#poison-use-other-address').first();
    if (await otherUseAddress.isVisible().catch(() => false)) {
      await otherUseAddress.fill(otherAddress);
    }
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? 'Error: 2,4-dinitrophenol (DNP) and its compounds including dinitrophenolate'
      : '2,4-dinitrophenol (DNP) and its compounds including dinitrophenolate';
  }
}



