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

  async selectPrecursorFromList(precursor: string): Promise<void> {
    const map: Record<string, () => Promise<void>> = {
      'Ammonium nitrate at or above 16% nitrogen': () => this.selectAmmonium(),
      'Hexamine': () => this.selectHexamine(),
      'Hydrochloric acid above 10% (weight by weight)': () => this.selectHydrochloricAcid(),
      'Hydrogen peroxide above 12% (weight by weight)': () => this.selectHydrogenPeroxide(),
      'Nitric acid above 3% (weight by weight)': () => this.selectNitricAcid(),
      'Nitromethane above 30% (weight by weight)': () => this.selectNitromethane(),
      'Phosphoric acid above 30% (weight by weight)': () => this.selectPhosphoricAcid(),
      'Potassium chlorate above 40% (weight by weight)': () => this.selectPotassiumChlorate(),
      'Potassium perchlorate above 40% (weight by weight)': () => this.selectPotassiumPerchlorate(),
      'Sodium chlorate above 40% (weight by weight)': () => this.selectSodiumChlorate(),
      'Sodium perchlorate above 40% (weight by weight)': () => this.selectSodiumPerchlorate(),
      'Sulfuric acid above 15% (weight by weight)': () => this.selectSulfuricAcid(),
    };

    if (!map[precursor]) {
      throw new Error(`Unsupported explosive precursor: ${precursor}`);
    }

    await map[precursor]();
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? 'Error: Explosives precursors'
      : 'Explosives precursors';
  }
}




