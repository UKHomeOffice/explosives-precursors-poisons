import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class whatIsHomeAddressPageNLPage extends basePage {
  expectedPageTitle() {
    return "What is your home address?";
  }

  async answerHomeAddress() {
    await this.fillByPartialLabelIfPresent('Address line 1', c.ADDRESS_LINE_1);
    await this.fillByPartialLabelIfPresent('Address line 2', c.ADDRESS_LINE_2);
    await this.fillByPartialLabelIfPresent('Town or city', c.TOWN_OR_CITY);
    await this.fillByPartialLabelIfPresent('County', c.COUNTY);
    await this.fillByPartialLabelIfPresent('Postcode', c.POSTCODE);
    await this.fillByPartialLabelIfPresent('Country of address', c.COUNTRY_UK);

    await this.page.locator('#new-renew-home-address-moveto-date-day').fill('01');
    await this.page.locator('#new-renew-home-address-moveto-date-month').fill('01');
    await this.page.locator('#new-renew-home-address-moveto-date-year').fill('2018');
    await this.clickContinueButton();
  }
}
