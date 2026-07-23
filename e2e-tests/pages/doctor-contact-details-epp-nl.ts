import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class DoctorContactDetailsEppNLPage extends basePage {
  constructor(page: Page) {
    super(page);
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
    await this.page.locator('#new-renew-doctor-name').first().fill(doctorName);
    await this.page.locator('#new-renew-doctor-address-line-1').first().fill(addressLine1);

    const line2 = this.page.locator('#new-renew-doctor-address-line-2').first();
    if (await line2.isVisible().catch(() => false)) {
      await line2.fill(addressLine2);
    }

    await this.page.locator('#new-renew-doctor-town-city').first().fill(city);

    const county = this.page.locator('#new-renew-doctor-county-state-province').first();
    if (await county.isVisible().catch(() => false)) {
      await county.fill(countyValue);
    }

    await this.page.locator('#new-renew-doctor-postcode').first().fill(postcode);

    const country = this.page.getByLabel('Country of address', { exact: true }).first();
    await country.fill(countryValue);
    await country.press('ArrowDown');
    await country.press('Enter');
    await country.press('Tab');

    await this.clickContinueButton();
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? 'Error: Your doctor’s contact details'
      : 'Your doctor’s contact details';
  }
}



