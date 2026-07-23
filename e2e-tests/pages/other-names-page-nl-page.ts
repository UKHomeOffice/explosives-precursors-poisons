import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class otherNamesPageNLPage extends basePage {
  private readonly titleSelect;
  private readonly middleNameInput;

  constructor(page: Page) {
    super(page);
    this.titleSelect = this.page.locator('#new-renew-other-name-title').first();
    this.middleNameInput = this.page.getByLabel('Middle names (optional)', { exact: true }).first();
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
    if (await this.titleSelect.isVisible().catch(() => false)) {
      await this.titleSelect.selectOption({ label: title });
    }

    await this.fillByLabel('First name', firstName);

    if (await this.middleNameInput.isVisible().catch(() => false)) {
      await this.fillField(this.middleNameInput, middleName);
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





