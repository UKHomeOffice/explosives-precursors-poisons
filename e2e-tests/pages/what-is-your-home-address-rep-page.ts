import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class whatIsYourHomeAddressRepPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async answerHomeAddress(
    line1: string,
    line2: string,
    city: string,
    county: string,
    postcode: string,
    country: string,
  ): Promise<void> {
    await this.fillByLabel('Address line 1', line1);

    const line2Input = this.page.getByLabel('Address line 2 (optional)', { exact: true }).first();
    if (await line2Input.isVisible().catch(() => false)) {
      await line2Input.fill(line2);
    }

    await this.fillByLabel('Town or city', city);

    const countyInput = this.page.getByLabel('County, state, province (optional)', { exact: true }).first();
    if (await countyInput.isVisible().catch(() => false)) {
      await countyInput.fill(county);
    }

    const postcodeInput = this.page.getByLabel('Postcode (optional)', { exact: true }).first();
    if (await postcodeInput.isVisible().catch(() => false)) {
      await postcodeInput.fill(postcode);
    }

    const countryInput = this.page.getByLabel('Country of address', { exact: true }).first();
    if (await countryInput.isVisible().catch(() => false)) {
      await countryInput.fill(country);
      await countryInput.press('Tab');
    }

    await this.clickContinueButton();
  }
  async expectedPageTitle(): Promise<string> {
    return (await this.page.title()) || '';
  }
}

