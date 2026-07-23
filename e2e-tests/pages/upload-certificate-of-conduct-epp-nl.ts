import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class UploadCertificateOfConductEppNLPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async uploadCertificateConductEpp(filePath: string): Promise<void> {
    await this.uploadFirstInput(filePath);
    await this.page.waitForLoadState('domcontentloaded').catch(() => undefined);

    const button = this.page.getByRole('button', { name: /^Continue$/i }).first();
      try {
        await button.waitFor({ state: 'visible', timeout: 5000 });
        await button.click();
        return;
      } catch {
        // Continue with fallback when this page auto-navigates or uses input submit.
      }

    const inputContinue = this.page.locator("input[value='Continue']").first();
    if (await inputContinue.isVisible().catch(() => false)) {
      await inputContinue.click();
    }
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? 'Error: Upload UK driving licence'
      : 'Upload UK driving licence';
  }
}



