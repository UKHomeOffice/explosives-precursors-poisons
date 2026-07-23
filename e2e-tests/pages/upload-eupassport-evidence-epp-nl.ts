import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class UploadEUPassportEvidenceEppNLPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async uploadEUPassportEvidenceEpp(filePath: string): Promise<void> {
    await this.uploadFirstInput(filePath);
    await this.clickContinueButton();
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? 'Error: Upload passport'
      : 'Upload passport';
  }
}



