import { basePage } from './base-page';

export class declarationAmendLicencePage extends basePage {
  async answerDeclarationAmendLicence() {
    await this.clickContinueButton();
  }
}