import { basePage } from './base-page';

export class medicalDeclarationEppNLPage extends basePage {
  expectedPageTitle() {
    return "Medical declaration";
  }

  async MedicalDeclareEpp() {
    await this.page.getByRole('checkbox', { name: /I have read and agree to this medical declaration/i }).check();
    await this.clickContinueButton();
  }
}
