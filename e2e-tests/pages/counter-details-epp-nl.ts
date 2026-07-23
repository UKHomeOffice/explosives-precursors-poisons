import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class CounterDetailsEppNLPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async answerCounterSignatoryDetails(
    title: string,
    firstName: string,
    middleName: string,
    lastName: string,
    knownFor: string,
    knownHow: string,
    occupation: string,
  ): Promise<void> {
    await this.page.locator('#new-renew-countersignatory-title').first().selectOption({ label: title });
    await this.page.locator('#new-renew-countersignatory-firstname').first().fill(firstName);

    const middle = this.page.locator('#new-renew-countersignatory-middlename').first();
    if (await middle.isVisible().catch(() => false)) {
      await middle.fill(middleName);
    }

    await this.page.locator('#new-renew-countersignatory-lastname').first().fill(lastName);
    await this.page.locator('#new-renew-countersignatory-years').first().selectOption({ label: knownFor });
    await this.page.locator('#new-renew-countersignatory-howyouknow').first().fill(knownHow);
    await this.page.locator('#new-renew-countersignatory-occupation').first().fill(occupation);
    await this.clickContinueButton();
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? 'Error: Countersignatory details'
      : 'Countersignatory details';
  }
}




