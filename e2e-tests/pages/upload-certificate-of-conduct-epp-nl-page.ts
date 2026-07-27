import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class uploadCertificateOfConductEppNLPage extends basePage {
  expectedPageTitle() {
    return "Upload UK driving licence";
  }

  async uploadCertificateConductEpp() {
    await this.uploadFirstFile(c.DUMMY_FILE);
    await this.clickContinueButton();
  }
}
