import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class yourDetailsPageNLPage extends basePage {
  private readonly birthPlaceInput;
  private readonly birthCountryInput;
  private readonly nationalityInput;
  private readonly heightInput;
  private readonly occupationInput;

  constructor(page: Page) {
    super(page);
    this.birthPlaceInput = this.page.locator('#new-renew-birth-place').first();
    this.birthCountryInput = this.page.locator('#new-renew-birth-country').first();
    this.nationalityInput = this.page.locator('#new-renew-country-nationality').first();
    this.heightInput = this.page.locator('input[name="new-renew-your-height"]').first();
    this.occupationInput = this.page.locator('input[name="new-renew-occupation"]').first();
  }

  private async fillTypeahead(input: import('@playwright/test').Locator, value: string, fieldId: string) {
    if (await input.isVisible().catch(() => false)) {
      await this.fillField(input, value);
      await input.press('Tab');
      return;
    }

    const hiddenSelect = this.page.locator(`select[name="${fieldId}"]`).first();
    if (await hiddenSelect.count()) {
      await hiddenSelect.selectOption({ label: value }, { force: true });
    }
  }

  async answerYourDetails(day: string, month: string, year: string, birthPlace: string, birthCountry: string, nationality: string): Promise<void> {
    await this.fillDate(day, month, year);

    if (await this.birthPlaceInput.isVisible().catch(() => false)) {
      await this.fillField(this.birthPlaceInput, birthPlace);
    } else {
      await this.fillAny(['Place of birth', 'Birth place'], birthPlace);
    }

    await this.fillTypeahead(this.birthCountryInput, birthCountry, 'new-renew-birth-country');
    await this.fillTypeahead(this.nationalityInput, nationality, 'new-renew-country-nationality');
  }

  async answerSexMale(): Promise<void> {
    await this.pickRadioByText('Male');
  }

  async answerSexFemale(): Promise<void> {
    await this.pickRadioByText('Female');
  }

  async answerSexOther(): Promise<void> {
    await this.pickRadioByText('X or other');
  }

  async answerSexAndHeightQuestion(sex: string, heightValue: string, occupationValue: string): Promise<void> {
    if (sex === 'Male') {
      await this.answerSexMale();
    } else if (sex === 'Female') {
      await this.answerSexFemale();
    } else {
      await this.answerSexOther();
    }

    await this.answerHeightAndOccupation(heightValue, occupationValue);
  }

  async answerHeightAndOccupation(heightValue: string, occupationValue: string): Promise<void> {
    await this.fillField(this.heightInput, heightValue);
    await this.fillField(this.occupationInput, occupationValue);
    await this.clickContinueButton();
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? 'Error: Your details'
      : 'Your details';
  }
}