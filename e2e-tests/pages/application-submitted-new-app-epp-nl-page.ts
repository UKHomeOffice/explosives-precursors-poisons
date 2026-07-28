import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class applicationSubmittedNewAppEppNLPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? 'Error: You do not need to apply for a licence – Apply for an explosives and precursor chemicals licence'
      : 'You do not need to apply for a licence – Apply for an explosives and precursor chemicals licence';
  }
}

