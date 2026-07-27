import { basePage } from './base-page';

export class otherNationalitiesEppNLPage extends basePage {
  expectedPageTitle() {
    return "Other nationalities";
  }

  async answerOtherNationalitiesQuestions() {
    const nationality = this.page.getByLabel(/other country of nationality/i).first();
    await nationality.fill('France');
    await nationality.press('Enter');
    await this.clickContinueButton();
  }
}
