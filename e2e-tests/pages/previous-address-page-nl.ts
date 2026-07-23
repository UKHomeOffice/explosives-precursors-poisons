import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class PreviousAddressPageNLPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async answerPreviousHomeAddress(
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
    const line1 = this.page.locator('input[name="new-renew-previous-home-address-line1"]').first();
    if (!(await line1.isVisible().catch(() => false))) {
      return;
    }

    await line1.fill(addressLine1);
    await this.page.locator('input[name="new-renew-previous-home-address-line2"]').first().fill(addressLine2);
    await this.page.locator('input[name="new-renew-previous-home-address-town"]').first().fill(city);
    await this.page.locator('input[name="new-renew-previous-home-address-county"]').first().fill(county);
    await this.page.locator('input[name="new-renew-previous-home-address-postcode"]').first().fill(postcode);

    const country = this.page.locator('#new-renew-previous-home-address-country').first();
    if (await country.isVisible().catch(() => false)) {
      await country.fill(countryValue);
      await country.press('ArrowDown');
      await country.press('Enter');
      await country.press('Tab');
    }

    await this.fillDate(day, month, year);
    await this.clickContinueButton();
  }

  async addPreviousAddress(): Promise<void> {
    await this.clickContinueButton();
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? 'Error: Previous address'
      : 'Previous address';
  }
}




