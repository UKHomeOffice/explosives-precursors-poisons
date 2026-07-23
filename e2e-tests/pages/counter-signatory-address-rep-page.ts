import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class counterSignatoryAddressRepPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async answerCounterSignatoryAddress(addressLine1: string, addressLine2: string, city: string, postcode: string): Promise<void> {
    await this.page.locator('#replace-countersignatory-address-1').first().fill(addressLine1);
    const line2 = this.page.locator('#replace-countersignatory-address-2').first();
    if (await line2.isVisible().catch(() => false)) {
      await line2.fill(addressLine2);
    }
    await this.page.locator('#replace-countersignatory-town-or-city').first().fill(city);
    await this.page.locator('#replace-countersignatory-postcode').first().fill(postcode);
    await this.clickContinueButton();
  }
  async expectedPageTitle(): Promise<string> {
    return (await this.page.title()) || '';
  }
}

