import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class NamePageNLPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async answerNameDetails(titleText: string, firstName: string, middleName: string, lastName: string): Promise<void> {
    const title = this.page.getByLabel('Title', { exact: true }).first();
    if (await title.isVisible().catch(() => false)) {
      await title.selectOption({ label: titleText });
    }
    await this.fillAny(['First name', 'new-renew-first-name'], firstName);
    await this.fillAny(['Middle name', 'new-renew-middle-name'], middleName);
    await this.fillAny(['Last name', 'new-renew-last-name'], lastName);
  }

  async answerYesToOtherNameQuestion(): Promise<void> {
    await this.page.getByRole('radio', { name: /^yes$/i }).first().check();
    await this.clickContinueButton();
  }

  async answerNoToOtherNameQuestion(): Promise<void> {
    await this.page.getByRole('radio', { name: /^no$/i }).first().check();
    await this.clickContinueButton();
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? 'Error: Your name – Apply for an explosives and precursor chemicals licence'
      : 'Your name – Apply for an explosives and precursor chemicals licence';
  }
}



