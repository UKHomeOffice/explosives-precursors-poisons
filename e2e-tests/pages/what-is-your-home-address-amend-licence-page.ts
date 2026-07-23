import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class whatIsYourHomeAddressAmendLicencePage extends basePage {
  private readonly postcodeInput;
  private readonly countryTypeaheadInput;

  constructor(page: Page) {
    super(page);
    this.postcodeInput = this.page.locator('#amend-postcode').first();
    this.countryTypeaheadInput = this.page.locator('#amend-country').first();
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
    if (await this.postcodeInput.isVisible().catch(() => false)) {
      await this.fillField(this.postcodeInput, postcodeValue);
    } else {
      await this.fillAny(['Postcode (optional)', 'Postcode'], postcodeValue);
    }

    if (await this.countryTypeaheadInput.isVisible().catch(() => false)) {
      await this.fillField(this.countryTypeaheadInput, countryValue);
      await this.countryTypeaheadInput.press('Tab');
    } else {
      const countryByLabel = this.page.getByLabel(/Country of address|Country/i).first();
      if (await countryByLabel.isVisible().catch(() => false)) {
        await this.fillField(countryByLabel, countryValue);
        await countryByLabel.press('Tab');
      }
    }

    await this.clickContinueButton();
  }
  async expectedPageTitle(): Promise<string> {
    return (await this.page.title()) || '';
  }
}

