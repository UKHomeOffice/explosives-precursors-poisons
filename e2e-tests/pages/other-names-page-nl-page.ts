import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class otherNamesPageNLPage extends basePage {
  expectedPageTitle() {
    return "Other names – Apply for an explosives and precursor chemicals licence";
  }

  async answerOtherNameDetails() {
    const titleSelect = this.page.getByLabel('Title', { exact: true });
    if (await titleSelect.count()) {
      await titleSelect.selectOption({ label: 'Mr' });
    }
    await this.fillByPartialLabelIfPresent('First name', c.FULL_NAME);
    await this.fillByPartialLabelIfPresent('Middle', c.MIDDLE_NAME);
    await this.fillByPartialLabelIfPresent('Last name', c.FULL_NAME);
    const [day, month, year] = c.DOB_1978.split('/');
    await this.page.locator('#new-renew-other-name-start-date-day').fill(day);
    await this.page.locator('#new-renew-other-name-start-date-month').fill(month);
    await this.page.locator('#new-renew-other-name-start-date-year').fill(year);
    await this.clickContinueButton();
  }
}
