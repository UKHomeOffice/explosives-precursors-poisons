import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class regulatedPoisonsAmendLicencePage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async yesNeedToAmendPoison(value: string): Promise<void> {
    await this.chooseYesNo(value);
    await this.clickContinueButton();
  }

  async noNeedToAmendPoison(value: string): Promise<void> {
    await this.chooseYesNo(value);
    await this.clickContinueButton();
  }

  async answerNeedToAmendPoison(value: string): Promise<boolean> {
    await this.chooseYesNo(value);
    await this.clickContinueButton();
    return (value || '').toLowerCase() === 'yes';
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? 'Error: Regulated poisons'
      : 'Regulated poisons';
  }
}





