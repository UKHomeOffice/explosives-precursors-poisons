import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class uploadBritishPassportEppNLPage extends basePage {
  expectedPageTitle() {
    return "Upload British passport";
  }

  async uploadBritishPassportEpp() {
    await this.uploadFirstFile(c.DUMMY_FILE);
    await this.clickContinueButton();
  }
}
