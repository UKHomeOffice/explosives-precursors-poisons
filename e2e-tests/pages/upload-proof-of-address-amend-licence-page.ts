import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class uploadProofOfAddressAmendLicencePage extends basePage {
  expectedPageTitle() {
    return "Upload proof of address";
  }

  async answerEPPAddressProofUpload() {
    await this.uploadFirstFile(c.DUMMY_FILE);
    await this.clickContinueButton();
  }
}
