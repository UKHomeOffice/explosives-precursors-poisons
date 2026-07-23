import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class whatIsHomeAddressPageNLPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async answerHomeAddress(
    addressLine1: string,
    addressLine2: string,
    city: string,
    county: string,
    postcode: string,
    countryValue: string,
    day: string,
    month: string,
    year: string,
  ): Promise<void> {
    await this.page.locator('input[name="new-renew-home-address-line1"]').first().fill(addressLine1);
    await this.page.locator('input[name="new-renew-home-address-line2"]').first().fill(addressLine2);
    await this.page.locator('input[name="new-renew-home-address-town"]').first().fill(city);
    await this.page.locator('input[name="new-renew-home-address-county"]').first().fill(county);
    await this.page.locator('input[name="new-renew-home-address-postcode"]').first().fill(postcode);

    const country = this.page.locator('#new-renew-home-address-country').first();
    if (await country.isVisible().catch(() => false)) {
      await country.fill(countryValue);
      await country.press('Tab');
    }

    await this.fillDate(day, month, year);
    await this.clickContinueButton();
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? 'Error: What is your home address?'
      : 'What is your home address?';
  }
}




