import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class homePageEppPage extends basePage {
  private readonly acceptCookiesButton;
  private readonly hideCookieBannerButton;

  constructor(page: Page) {
    super(page);
    this.acceptCookiesButton = this.page.locator('#accept-cookies-button');
    this.hideCookieBannerButton = this.page.locator('#hide-cookie-banner');
  }

  async openEPPPage(): Promise<void> {
    await this.page.goto('/application-type');

    if (await this.acceptCookiesButton.isVisible().catch(() => false)) {
      await this.acceptCookiesButton.click();
    }

    if (await this.hideCookieBannerButton.isVisible().catch(() => false)) {
      await this.hideCookieBannerButton.click();
    }
  }
  async expectedPageTitle(): Promise<string> {
    return (await this.page.title()) || '';
  }
}

