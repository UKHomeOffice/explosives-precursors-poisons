import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class uploadCertificateOfConductEppNLPage extends basePage {
  private readonly continueButton;
  private readonly inputContinueButton;

  constructor(page: Page) {
    super(page);
    this.continueButton = this.page.getByRole('button', { name: /^Continue$/i }).first();
    this.inputContinueButton = this.page.locator("input[value='Continue']").first();
  }

  async uploadCertificateConductEpp(filePath: string): Promise<void> {
    await this.uploadFirstInput(filePath);
    await this.page.waitForLoadState('domcontentloaded').catch(() => undefined);

    try {
      await this.continueButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.continueButton.click();
      return;
    } catch {
      // Continue with fallback when this page auto-navigates or uses input submit.
    }

    if (await this.inputContinueButton.isVisible().catch(() => false)) {
      await this.inputContinueButton.click();
    }
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? 'Error: Upload UK driving licence'
      : 'Upload UK driving licence';
  }
}




