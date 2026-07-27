import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class explosivesPrecursorsAmendLicencePage extends basePage {
  private readonly precursorSelect;

  constructor(page: Page) {
    super(page);
    this.precursorSelect = this.page.locator('#precursor-field').first();
  }

  private async choose(label: string) {
    await this.precursorSelect.selectOption({ label });
    await this.clickContinueButton();
  }

  async selectAmmonium(): Promise<void> {
    await this.choose('Ammonium nitrate at or above 16% nitrogen');
  }

  async selectHexamine(): Promise<void> {
    await this.choose('Hexamine');
  }

  async selectHydrochloricAcid(): Promise<void> {
    await this.choose('Hydrochloric acid above 10% (weight by weight)');
  }

  async selectHydrogenPeroxide(): Promise<void> {
    await this.choose('Hydrogen peroxide above 12% (weight by weight)');
  }

  async selectNitromethane(): Promise<void> {
    await this.choose('Nitromethane above 30% (weight by weight)');
  }

  async selectNitricAcid(): Promise<void> {
    await this.choose('Nitric acid above 3% (weight by weight)');
  }

  async selectPhosphoricAcid(): Promise<void> {
    await this.choose('Phosphoric acid above 30% (weight by weight)');
  }

  async selectPotassiumChlorate(): Promise<void> {
    await this.choose('Potassium chlorate above 40% (weight by weight)');
  }

  async selectPotassiumPerchlorate(): Promise<void> {
    await this.choose('Potassium perchlorate above 40% (weight by weight)');
  }

  async selectSodiumChlorate(): Promise<void> {
    await this.choose('Sodium chlorate above 40% (weight by weight)');
  }

  async selectSodiumPerchlorate(): Promise<void> {
    await this.choose('Sodium perchlorate above 40% (weight by weight)');
  }

  async selectSulfuricAcid(): Promise<void> {
    await this.choose('Sulfuric acid above 15% (weight by weight)');
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? 'Error: Explosives precursors'
      : 'Explosives precursors';
  }
}




