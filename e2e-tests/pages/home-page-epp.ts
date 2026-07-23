import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class HomePageEppPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async openEPPPage(): Promise<void> {
    await this.page.goto('/application-type');

    const accept = this.page.locator('#accept-cookies-button');
    if (await accept.isVisible().catch(() => false)) {
      await accept.click();
    }

    const hide = this.page.locator('#hide-cookie-banner');
    if (await hide.isVisible().catch(() => false)) {
      await hide.click();
    }
  }
  async expectedPageTitle(): Promise<string> {
    return (await this.page.title()) || '';
  }
}
