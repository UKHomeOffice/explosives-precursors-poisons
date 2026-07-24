import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class counterSignatoryDetailsRepPage extends basePage {
  private readonly titleSelect;
  private readonly firstNameInput;
  private readonly middleNameInput;
  private readonly lastNameInput;
  private readonly yearsSelect;
  private readonly howYouKnowInput;
  private readonly occupationInput;

  constructor(page: Page) {
    super(page);
    this.titleSelect = this.page.locator('#replace-countersignatory-title').first();
    this.firstNameInput = this.page.locator('#replace-countersignatory-firstname').first();
    this.middleNameInput = this.page.locator('#replace-countersignatory-middlename').first();
    this.lastNameInput = this.page.locator('#replace-countersignatory-lastname').first();
    this.yearsSelect = this.page.locator('#replace-countersignatory-years').first();
    this.howYouKnowInput = this.page.locator('#replace-countersignatory-howyouknow').first();
    this.occupationInput = this.page.locator('#replace-countersignatory-occupation').first();
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
    await this.titleSelect.selectOption({ label: title });
    await this.fillField(this.firstNameInput, firstName);
    await this.fillField(this.middleNameInput, middleName);
    await this.fillField(this.lastNameInput, lastName);
    await this.yearsSelect.selectOption({ label: knownFor });
    await this.fillField(this.howYouKnowInput, knownHow);
    await this.fillField(this.occupationInput, occupation);
    await this.clickContinueButton();
  }
  async expectedPageTitle(): Promise<string> {
    return (await this.page.title()) || '';
  }
}

