import { basePage } from './base-page';

export class uploadCertificateOfGoodConductRepPage extends basePage {
  async answerCertificateOfGoodConduct() {
    await this.clickContinueButton();
  }
}