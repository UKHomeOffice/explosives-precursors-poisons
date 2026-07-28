import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class poisonsAmendLicencePage extends basePage {
  private readonly poisonSelect;

  constructor(page: Page) {
    super(page);
    this.poisonSelect = this.page.locator('#poison-field').first();
  }

  private async choose(label: string) {
    if (await this.poisonSelect.isVisible().catch(() => false)) {
      await this.poisonSelect.selectOption({ label });
    } else {
      await this.poisonSelect.selectOption({ label }, { force: true });
    }
    await this.clickContinueButton();
  }

  async select24Dinitrophenol(): Promise<void> {
    await this.choose('2,4- Dinitrophenol and derivatives including sodium dinitrophenolate');
  }

  async selectAluminiumPhosphide(): Promise<void> {
    await this.choose('Aluminium phosphide');
  }

  async selectAluminiumSulfide(): Promise<void> {
    await this.choose('Aluminium sulfide');
  }

  async selectArsenicCompounds(): Promise<void> {
    await this.choose('Arsenic and its compounds');
  }

  async selectBariumSalts(): Promise<void> {
    await this.choose('Barium salts');
  }

  async selectBromomethane(): Promise<void> {
    await this.choose('Bromomethane');
  }

  async selectCalciumSulfide(): Promise<void> {
    await this.choose('Calcium sulfide');
  }

  async selectCalciumPhosphide(): Promise<void> {
    await this.choose('Calcium phosphide');
  }

  async selectChloropicrin(): Promise<void> {
    await this.choose('Chloropicrin');
  }

  async selectFluoroaceticAcid(): Promise<void> {
    await this.choose('Fluoroacetic acid and its salts; fluoracetamide');
  }

  async selectHydrogenCyanide(): Promise<void> {
    await this.choose('Hydrogen cyanide and metal cyanides');
  }

  async selectLeadAcetates(): Promise<void> {
    await this.choose('Lead acetates; compound of lead with acids from fixed oils');
  }

  async selectMagnesiumPhosphide(): Promise<void> {
    await this.choose('Magnesium phosphide');
  }

  async selectMagnesiumSulfide(): Promise<void> {
    await this.choose('Magnesium sulfide');
  }

  async selectMercuryCompounds(): Promise<void> {
    await this.choose('Mercury and its compounds');
  }

  async selectOxalicAcid(): Promise<void> {
    await this.choose('Oxalic acid above 10% (weight by weight)');
  }

  async selectPhenols(): Promise<void> {
    await this.choose('Phenols above 60% w/w and their compounds');
  }

  async selectPhosphorusYellow(): Promise<void> {
    await this.choose('Phosphorus yellow');
  }

  async selectSodiumSulfide(): Promise<void> {
    await this.choose('Sodium sulfide');
  }

  async selectStrychnine(): Promise<void> {
    await this.choose('Strychnine, its salts and quaternary compounds');
  }

  async selectThalliumSalts(): Promise<void> {
    await this.choose('Thallium and its salts');
  }

  async selectZincPhosphide(): Promise<void> {
    await this.choose('Zinc phosphide');
  }

  async selectPoisonFromList(poison: string): Promise<void> {
    const map: Record<string, () => Promise<void>> = {
      '2,4- Dinitrophenol and derivatives including sodium dinitrophenolate': () => this.select24Dinitrophenol(),
      '2,4-dinitrophenol and its compounds including dinitrophenolate': () => this.select24Dinitrophenol(),
      'Aluminium phosphide': () => this.selectAluminiumPhosphide(),
      'Aluminium sulfide': () => this.selectAluminiumSulfide(),
      'Arsenic and its compounds': () => this.selectArsenicCompounds(),
      'Barium salts': () => this.selectBariumSalts(),
      'Bromomethane': () => this.selectBromomethane(),
      'Calcium sulfide': () => this.selectCalciumSulfide(),
      'Calcium phosphide': () => this.selectCalciumPhosphide(),
      'Chloropicrin': () => this.selectChloropicrin(),
      'Fluoroacetic acid and its salts; fluoracetamide': () => this.selectFluoroaceticAcid(),
      'Hydrogen cyanide and metal cyanides': () => this.selectHydrogenCyanide(),
      'Lead acetates; compound of lead with acids from fixed oils': () => this.selectLeadAcetates(),
      'Magnesium phosphide': () => this.selectMagnesiumPhosphide(),
      'Magnesium sulfide': () => this.selectMagnesiumSulfide(),
      'Mercury and its compounds': () => this.selectMercuryCompounds(),
      'Oxalic acid above 10% (weight by weight)': () => this.selectOxalicAcid(),
      'Phenols above 60% w/w and their compounds': () => this.selectPhenols(),
      'Phosphorus yellow': () => this.selectPhosphorusYellow(),
      'Sodium sulfide': () => this.selectSodiumSulfide(),
      'Strychnine, its salts and quaternary compounds': () => this.selectStrychnine(),
      'Thallium and its salts': () => this.selectThalliumSalts(),
      'Zinc phosphide': () => this.selectZincPhosphide(),
    };

    if (!map[poison]) {
      throw new Error(`Unsupported poison: ${poison}`);
    }

    await map[poison]();
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? 'Error: Poisons'
      : 'Poisons';
  }
}




