import { basePage } from './base-page';

export class youDoNotNeedToApplyForLicencePage extends basePage {
  expectedPageTitle() {
    return "You do not need to apply for a licence – Renew an explosives and precursor chemicals licence";
  }

  async assertPageTitle() {
    await this.assertHeadingContains('');
  }
}
