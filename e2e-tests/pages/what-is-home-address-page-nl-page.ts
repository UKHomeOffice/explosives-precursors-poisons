import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class whatIsHomeAddressPageNLPage extends basePage {
  public readonly line1Input;
  private readonly line2Input;
  private readonly cityInput;
  private readonly countyInput;
  private readonly postcodeInput;
  private readonly countryInput;

  constructor(page: Page) {
    super(page);
    this.line1Input = this.page.locator('input[name="new-renew-home-address-line1"]').first();
    this.line2Input = this.page.locator('input[name="new-renew-home-address-line2"]').first();
    this.cityInput = this.page.locator('input[name="new-renew-home-address-town"]').first();
    this.countyInput = this.page.locator('input[name="new-renew-home-address-county"]').first();
    this.postcodeInput = this.page.locator('input[name="new-renew-home-address-postcode"]').first();
    this.countryInput = this.page.locator('#new-renew-home-address-country').first();
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
    await this.fillField(this.line1Input, addressLine1);
    await this.fillField(this.line2Input, addressLine2);
    await this.fillField(this.cityInput, city);
    await this.fillField(this.countyInput, county);
    await this.fillField(this.postcodeInput, postcode);
    await this.fillField(this.countryInput, countryValue);
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




