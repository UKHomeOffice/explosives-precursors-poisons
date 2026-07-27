import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';
import { EppScenarioData } from '../utility-helper/epp-scenario-data';

export class yourDetailsPageNLPage extends basePage {
  expectedPageTitle() {
    return "Your details";
  }

  async answerHeightAndOccupation() {
    await this.fillByPartialLabelIfPresent('Height', '180');
    await this.fillByPartialLabelIfPresent('Occupation', 'Engineer');
    await this.clickContinueButton();
  }

  async answerSexFemale() {
    await this.selectRadio('Female');
    await this.clickContinueButton();
  }

  async answerSexMale() {
    await this.selectRadio('Male');
    await this.clickContinueButton();
  }

  async answerSexOther() {
    await this.selectRadio('X or other');
    await this.clickContinueButton();
  }

  async answerYourDetails(data?: EppScenarioData) {
    const [day, month, year] = c.DOB_1978.split('/');
    await this.page.locator('#new-renew-dob-day').fill(day);
    await this.page.locator('#new-renew-dob-month').fill(month);
    await this.page.locator('#new-renew-dob-year').fill(year);
    await this.fillByPartialLabelIfPresent('Place of birth', c.TOWN_OR_CITY);
    await this.fillByPartialLabelIfPresent('Country of birth', c.COUNTRY_UK);
    await this.fillByPartialLabelIfPresent('Country of nationality', c.COUNTRY_UK);
    const hasMoreNationality = (data?.doYouHaveMoreThanOneNationality ?? 'No').toLowerCase() === 'yes';
    const radioId = hasMoreNationality ? '#new-renew-more-nationalities-yes' : '#new-renew-more-nationalities-no';
    const labelFor = hasMoreNationality ? 'label[for="new-renew-more-nationalities-yes"]' : 'label[for="new-renew-more-nationalities-no"]';
    const radio = this.page.locator(radioId);

    await radio.click({ force: true }).catch(async () => {
      await this.page.locator(labelFor).click({ force: true });
    });

    const checked = await radio.isChecked().catch(() => false);
    if (!checked) {
      await this.page.getByRole('radio', { name: hasMoreNationality ? 'Yes' : 'No', exact: true }).click({ force: true });
    }

    const sex = (data?.whatIsYourSex ?? 'Male').toLowerCase();
    if (sex.includes('female')) {
      await this.selectRadio('Female');
    } else if (sex.includes('other') || sex.includes('x')) {
      await this.selectRadio('X or other');
    } else {
      await this.selectRadio('Male');
    }

    await this.fillByPartialLabelIfPresent('height', '180');
    await this.fillByPartialLabelIfPresent('Occupation', 'Engineer');
    await this.clickContinueButton();
  }

  async selectYesOrNoRadioOption(value = 'Yes') {
    await this.selectRadio(value);
  }
}
