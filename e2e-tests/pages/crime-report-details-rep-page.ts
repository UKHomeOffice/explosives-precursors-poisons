import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class crimeReportDetailsRepPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async answerCrimeDetails(policeForce: string, crimeNumber: string): Promise<void> {
    await this.fillByLabel('Which police force did you report this to?', policeForce);
    await this.fillByLabel('Crime number', crimeNumber);
    await this.clickContinueButton();
  }
  async expectedPageTitle(): Promise<string> {
    return (await this.page.title()) || '';
  }
}

