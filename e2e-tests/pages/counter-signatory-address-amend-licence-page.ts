import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class counterSignatoryAddressAmendLicencePage extends basePage {
  private readonly line1Input;
  private readonly line2Input;
  private readonly cityInput;
  private readonly postcodeInput;

  constructor(page: Page) {
    super(page);
    this.line1Input = this.page.locator('#amend-countersignatory-address-1').first();
    this.line2Input = this.page.locator('#amend-countersignatory-address-2').first();
    this.cityInput = this.page.locator('#amend-countersignatory-town-or-city').first();
    this.postcodeInput = this.page.locator('#amend-countersignatory-postcode').first();
  }

  async answerCounterSignatoryAddressAmendLicence(
    addressLine1: string,
    addressLine2: string,
    city: string,
    postcode: string,
  ): Promise<void> {
    await this.fillField(this.line1Input, addressLine1);
    await this.fillField(this.line2Input, addressLine2);
    await this.fillField(this.cityInput, city);
    await this.fillField(this.postcodeInput, postcode);
    await this.clickContinueButton();
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? 'Error: Countersignatory address'
      : 'Countersignatory address';
  }
}





