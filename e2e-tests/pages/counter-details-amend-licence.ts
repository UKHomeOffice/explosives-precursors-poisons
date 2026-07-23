import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class CounterDetailsAmendLicencePage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async answerCounterSignatoryDetailsAmendLicence(
    title: string,
    firstName: string,
    middleName: string,
    lastName: string,
    knownFor: string,
    knownHow: string,
    occupation: string,
  ): Promise<void> {
    await this.page.locator('#amend-countersignatory-title').first().selectOption(title);
    await this.page.locator('#amend-countersignatory-firstname').first().fill(firstName);
    const middle = this.page.locator('#amend-countersignatory-middlename').first();
    if (await middle.isVisible().catch(() => false)) {
      await middle.fill(middleName);
    }
    await this.page.locator('#amend-countersignatory-lastname').first().fill(lastName);
    await this.page.locator('#amend-countersignatory-years').first().selectOption({ label: knownFor });
    await this.page.locator('#amend-countersignatory-howyouknow').first().fill(knownHow);
    await this.page.locator('#amend-countersignatory-occupation').first().fill(occupation);
    await this.clickContinueButton();
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? 'Error: Countersignatory details'
      : 'Countersignatory details';
  }
}




