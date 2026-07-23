import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class WhatIsYourHomeAddressAmendLicencePage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async homeAddressAmendLicence(
    addressLine1: string,
    addressLine2: string,
    city: string,
    countyValue: string,
    postcodeValue: string,
    countryValue: string,
  ): Promise<void> {
    await this.fillAny(['Address line 1', 'Address line 1 (or building name)'], addressLine1);
    await this.fillAny(['Address line 2 (optional)', 'Address line 2'], addressLine2);
    await this.fillAny(['Town or city', 'Town'], city);
    await this.fillAny(['County (optional)', 'County'], countyValue);
    const postcode = this.page.locator('#amend-postcode').first();
    if (await postcode.isVisible().catch(() => false)) {
      await postcode.fill(postcodeValue);
    } else {
      await this.fillAny(['Postcode (optional)', 'Postcode'], postcodeValue);
    }

    const countryTypeahead = this.page.locator('#amend-country').first();
    if (await countryTypeahead.isVisible().catch(() => false)) {
      await countryTypeahead.fill(countryValue);
      await countryTypeahead.press('ArrowDown');
      await countryTypeahead.press('Enter');
      await countryTypeahead.press('Tab');
    } else {
      const countryByLabel = this.page.getByLabel(/Country of address|Country/i).first();
      if (await countryByLabel.isVisible().catch(() => false)) {
        await countryByLabel.fill(countryValue);
        await countryByLabel.press('ArrowDown');
        await countryByLabel.press('Enter');
        await countryByLabel.press('Tab');
      }
    }

    await this.clickContinueButton();
  }
  async expectedPageTitle(): Promise<string> {
    return (await this.page.title()) || '';
  }
}
