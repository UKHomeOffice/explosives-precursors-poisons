import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class YourDetailsPageNLPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  private async fillTypeahead(fieldId: string, value: string) {
    const input = this.page.locator(`#${fieldId}`).first();
    if (await input.isVisible().catch(() => false)) {
      await input.fill(value);
      await input.press('ArrowDown');
      await input.press('Enter');
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

    const birthPlaceById = this.page.locator('#new-renew-birth-place').first();
    if (await birthPlaceById.isVisible().catch(() => false)) {
      await birthPlaceById.fill(birthPlace);
    } else {
      await this.fillAny(['Place of birth', 'Birth place'], birthPlace);
    }

    await this.fillTypeahead('new-renew-birth-country', birthCountry);
    await this.fillTypeahead('new-renew-country-nationality', nationality);
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

  async answerHeightAndOccupation(heightValue: string, occupationValue: string): Promise<void> {
    const height = this.page.locator('input[name="new-renew-your-height"]').first();
    if (await height.isVisible().catch(() => false)) {
      await height.fill(heightValue);
    }

    const occupation = this.page.locator('input[name="new-renew-occupation"]').first();
    if (await occupation.isVisible().catch(() => false)) {
      await occupation.fill(occupationValue);
    }

    await this.clickContinueButton();
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? 'Error: Your details'
      : 'Your details';
  }
}



