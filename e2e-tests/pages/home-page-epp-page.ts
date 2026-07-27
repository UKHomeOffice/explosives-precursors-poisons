import { basePage } from './base-page';

export class homePageEppPage extends basePage {
  async openEPPPage() {
    await this.navigateTo('/');
    await this.acceptCookiesIfVisible();
    await this.clickStartNowIfVisible();
  }
}