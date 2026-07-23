import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class counterSignatoryDetailsRepPage extends basePage {
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
    await this.page.locator('#replace-countersignatory-title').first().selectOption({ label: title });
    await this.page.locator('#replace-countersignatory-firstname').first().fill(firstName);

    const middle = this.page.locator('#replace-countersignatory-middlename').first();
    if (await middle.isVisible().catch(() => false)) {
      await middle.fill(middleName);
    }

    await this.page.locator('#replace-countersignatory-lastname').first().fill(lastName);
    await this.page.locator('#replace-countersignatory-years').first().selectOption({ label: knownFor });
    await this.page.locator('#replace-countersignatory-howyouknow').first().fill(knownHow);
    await this.page.locator('#replace-countersignatory-occupation').first().fill(occupation);
    await this.clickContinueButton();
  }
  async expectedPageTitle(): Promise<string> {
    return (await this.page.title()) || '';
  }
}

