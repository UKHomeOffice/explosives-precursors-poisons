import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class uploadProofOfAddressAmendLicencePage extends basePage {
  private readonly uploadInput;

  constructor(page: Page) {
    super(page);
    this.uploadInput = this.page.locator('#file-upload').first();
  }

  async answerEPPAddressProofUpload(filePath: string): Promise<void> {
    await this.uploadInput.setInputFiles(filePath);
    await this.uploadInput.setInputFiles(filePath);

    await this.clickContinueButton();
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? 'Error: Upload proof of address'
      : 'Upload proof of address';
  }
}





