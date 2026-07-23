import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class counterSignatoryAddressAmendLicencePage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async answerCounterSignatoryAddressAmendLicence(
    addressLine1: string,
    addressLine2: string,
    city: string,
    postcode: string,
  ): Promise<void> {
    await this.page.locator('#amend-countersignatory-address-1').first().fill(addressLine1);
    const line2 = this.page.locator('#amend-countersignatory-address-2').first();
    if (await line2.isVisible().catch(() => false)) {
      await line2.fill(addressLine2);
    }
    await this.page.locator('#amend-countersignatory-town-or-city').first().fill(city);
    await this.page.locator('#amend-countersignatory-postcode').first().fill(postcode);
    await this.clickContinueButton();
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? 'Error: Countersignatory address'
      : 'Countersignatory address';
  }
}





