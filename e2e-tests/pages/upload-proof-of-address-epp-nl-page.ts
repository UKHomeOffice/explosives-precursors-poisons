import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class uploadProofOfAddressEppNLPage extends basePage {
  expectedPageTitle() {
    return "Upload evidence";
  }

  async answerEPPAddressProofUpload() {
    for (let i = 0; i < 2; i++) {
      const stillOnUploadPage = await this.page
        .getByRole('heading', { name: /Upload proof of address/i })
        .isVisible({ timeout: 1500 })
        .catch(() => false);

      if (!stillOnUploadPage) {
        break;
      }

      const fileInput = this.page.locator('#file-upload').first();
      if (await fileInput.count()) {
        await fileInput.setInputFiles(c.DUMMY_FILE);
      }
      await this.clickContinueButton();
    }
  }
}
