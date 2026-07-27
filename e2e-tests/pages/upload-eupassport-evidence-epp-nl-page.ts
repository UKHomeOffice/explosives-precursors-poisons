import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class uploadEUPassportEvidenceEppNLPage extends basePage {
  expectedPageTitle() {
    return "Upload passport";
  }

  async uploadEUPassportEvidenceEpp() {
    await this.uploadFirstFile(c.DUMMY_FILE);
    await this.clickContinueButton();
  }
}
