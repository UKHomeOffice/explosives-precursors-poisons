import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class uploadUKDrivingLicenceEvidenceEppNLPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async uploadUKDrivingLicenceEpp(filePath: string): Promise<void> {
    await this.uploadFirstInput(filePath);
    await this.clickContinueButton();
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? 'Error: Upload UK driving licence'
      : 'Upload UK driving licence';
  }
}




