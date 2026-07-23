import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class UploadProofOfAddressAmendLicencePage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async answerEPPAddressProofUpload(filePath: string): Promise<void> {
    const upload = this.page.locator('#file-upload').first();

    await upload.setInputFiles(filePath);
    await upload.setInputFiles(filePath);

    await this.clickContinueButton();
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? 'Error: Upload proof of address'
      : 'Upload proof of address';
  }
}




