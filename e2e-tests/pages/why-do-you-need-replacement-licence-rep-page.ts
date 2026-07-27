import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class whyDoYouNeedReplacementLicenceRepPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async licenceWasStolen(): Promise<void> {
    await this.pickRadioByText('Licence was stolen');
    await this.clickContinueButton();
  }

  async licenceIsLost(): Promise<void> {
    await this.pickRadioByText('Licence is lost');
    await this.clickContinueButton();
  }

  async licenceIsDamaged(): Promise<void> {
    await this.pickRadioByText('Licence is damaged');
    await this.clickContinueButton();
  }

  async licenceIsDestroyed(): Promise<void> {
    await this.pickRadioByText('Licence is destroyed');
    await this.clickContinueButton();
  }
  async expectedPageTitle(): Promise<string> {
    return (await this.page.title()) || '';
  }
}

