import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class whatIsYourNewAddressRepPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async answerNewAddress(
    line1: string,
    line2: string,
    city: string,
    county: string,
    postcode: string,
    country: string,
    day: string,
    month: string,
    year: string,
  ): Promise<void> {
    const line2Input = this.page.getByLabel('Address line 2 (optional)', { exact: true }).first();
    const countyInput = this.page.getByLabel('County, state, province (optional)', { exact: true }).first();
    const postcodeInput = this.page.getByLabel('Postcode (optional)', { exact: true }).first();
    const countryInput = this.page.getByLabel('Country of address', { exact: true }).first();

    await this.fillByLabel('Address line 1', line1);
    await this.fillField(line2Input, line2);
    await this.fillByLabel('Town or city', city);
    await this.fillField(countyInput, county);
    await this.fillField(postcodeInput, postcode);
    await this.fillField(countryInput, country);
    await this.fillDate(day, month, year);
    await this.clickContinueButton();
  }
  async expectedPageTitle(): Promise<string> {
    return (await this.page.title()) || '';
  }
}

