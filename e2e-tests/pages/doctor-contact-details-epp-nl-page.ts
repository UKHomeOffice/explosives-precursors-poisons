import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class doctorContactDetailsEppNLPage extends basePage {
  private readonly doctorNameInput;
  private readonly addressLine1Input;
  private readonly addressLine2Input;
  private readonly cityInput;
  private readonly countyInput;
  private readonly postcodeInput;
  private readonly countryInput;

  constructor(page: Page) {
    super(page);
    this.doctorNameInput = this.page.locator('#new-renew-doctor-name').first();
    this.addressLine1Input = this.page.locator('#new-renew-doctor-address-line-1').first();
    this.addressLine2Input = this.page.locator('#new-renew-doctor-address-line-2').first();
    this.cityInput = this.page.locator('#new-renew-doctor-town-city').first();
    this.countyInput = this.page.locator('#new-renew-doctor-county').first();
    this.postcodeInput = this.page.locator('#new-renew-doctor-postcode').first();
    this.countryInput = this.page.getByLabel('Country of address', { exact: true }).first();
  }

  async answerDoctorContactDetails(
    doctorName: string,
    addressLine1: string,
    addressLine2: string,
    city: string,
    countyValue: string,
    postcode: string,
    countryValue: string,
  ): Promise<void> {
    await this.fillField(this.doctorNameInput, doctorName);
    await this.fillField(this.addressLine1Input, addressLine1);
    await this.fillField(this.addressLine2Input, addressLine2);
    await this.fillField(this.cityInput, city);
    await this.fillField(this.countyInput, countyValue);
    await this.fillField(this.postcodeInput, postcode);
    await this.fillField(this.countryInput, countryValue);

    await this.clickContinueButton();
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? 'Error: Your doctor’s contact details'
      : 'Your doctor’s contact details';
  }
}




