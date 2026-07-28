import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class counterDetailsAmendLicencePage extends basePage {
  private readonly titleDropdown;
  private readonly firstNameInput;
  private readonly middleNameInput;
  private readonly lastNameInput;
  private readonly yearsDropdown;
  private readonly howYouKnowInput;
  private readonly occupationInput;

  constructor(page: Page) {
    super(page);
    this.titleDropdown = this.page.locator('#amend-countersignatory-title').first();
    this.firstNameInput = this.page.locator('#amend-countersignatory-firstname').first();
    this.middleNameInput = this.page.locator('#amend-countersignatory-middlename').first();
    this.lastNameInput = this.page.locator('#amend-countersignatory-lastname').first();
    this.yearsDropdown = this.page.locator('#amend-countersignatory-years').first();
    this.howYouKnowInput = this.page.locator('#amend-countersignatory-howyouknow').first();
    this.occupationInput = this.page.locator('#amend-countersignatory-occupation').first();
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
    await this.titleDropdown.selectOption(title);

    await this.fillField(this.firstNameInput, firstName);
    await this.fillField(this.middleNameInput, middleName);
    await this.fillField(this.lastNameInput, lastName);
    await this.yearsDropdown.selectOption({ label: knownFor });
    await this.fillField(this.howYouKnowInput, knownHow);
    await this.fillField(this.occupationInput, occupation);
    await this.clickContinueButton();
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? 'Error: Countersignatory details'
      : 'Countersignatory details';
  }
}





