import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class CounterSignatoryAddressNLPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async answerCounterSignatoryAddress(
    addressLine1: string,
    addressLine2: string,
    city: string,
    postcode: string,
  ): Promise<void> {
    await this.page.locator('#new-renew-countersignatory-address-1').first().fill(addressLine1);

    const line2 = this.page.locator('#new-renew-countersignatory-address-2').first();
    if (await line2.isVisible().catch(() => false)) {
      await line2.fill(addressLine2);
    }

    await this.page.locator('#new-renew-countersignatory-town-or-city').first().fill(city);
    await this.page.locator('#new-renew-countersignatory-postcode').first().fill(postcode);
    await this.clickContinueButton();
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? 'Error: Countersignatory address'
      : 'Countersignatory address';
  }
}




