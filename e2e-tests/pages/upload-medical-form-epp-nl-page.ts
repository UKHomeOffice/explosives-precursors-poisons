import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class uploadMedicalFormEppNLPage extends basePage {
  expectedPageTitle() {
    return "Upload Your medical form(optional)";
  }

  async uploadMedicalFormEpp() {
    await this.uploadFirstFile(c.DUMMY_FILE);
    await this.clickContinueButton();
  }
}
