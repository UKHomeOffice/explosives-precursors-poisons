import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class otherNamesPageNLPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async answerOtherNameDetails(
    title: string,
    firstName: string,
    middleName: string,
    lastName: string,
    startDay: string,
    startMonth: string,
    startYear: string,
  ): Promise<void> {
    const titleSelect = this.page.locator('#new-renew-other-name-title').first();
    if (await titleSelect.isVisible().catch(() => false)) {
      await titleSelect.selectOption({ label: title });
    }

    await this.fillByLabel('First name', firstName);

    const middleNameInput = this.page.getByLabel('Middle names (optional)', { exact: true }).first();
    if (await middleNameInput.isVisible().catch(() => false)) {
      await middleNameInput.fill(middleName);
    }

    await this.fillByLabel('Last name', lastName);
    await this.fillDate(startDay, startMonth, startYear);
    await this.clickContinueButton();
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? 'Error: Other names – Apply for an explosives and precursor chemicals licence'
      : 'Other names – Apply for an explosives and precursor chemicals licence';
  }
}





