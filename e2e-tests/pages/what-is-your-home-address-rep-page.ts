import { basePage } from './base-page';

export class whatIsYourHomeAddressRepPage extends basePage {
  async answerHomeAddress() {
    await this.answerAddress();
  }
}