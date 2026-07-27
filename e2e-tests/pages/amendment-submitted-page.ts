import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class amendmentSubmittedPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? 'Error: Amendment submitted – Amend an explosives and precursor chemicals licence'
      : 'Amendment submitted – Amend an explosives and precursor chemicals licence';
  }
}




