import { basePage } from './base-page';

export class yourMedicalHistoryEppNLPage extends basePage {
  expectedPageTitle() {
    return "Your medical history";
  }

  async selectMedicalAdviceAndReceivedTreatment(hasSeenDoctor: string, receivedTreatment: string) {
    await this.page
      .locator(`#new-renew-${hasSeenDoctor}-${receivedTreatment.toLowerCase()}`)
      .check();
  }
}
