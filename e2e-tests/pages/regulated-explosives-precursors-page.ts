import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class regulatedExplosivesPrecursorsPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async answerYesAmendExplosivePrecursorsOnLicence(value: string): Promise<void> {
    await this.chooseYesNo(value);
    await this.clickContinueButton();
  }

  async answerNoAmendExplosivePrecursorsOnLicence(value: string): Promise<void> {
    await this.chooseYesNo(value);
    await this.clickContinueButton();
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? 'Error: Regulated explosives precursors'
      : 'Regulated explosives precursors';
  }
}





