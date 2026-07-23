import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class poisonsAmendLicencePage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  private async choose(label: string) {
    const select = this.page.locator('#poison-field').first();
    if (await select.isVisible().catch(() => false)) {
      await select.selectOption({ label });
    } else {
      await select.selectOption({ label }, { force: true });
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

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? 'Error: Poisons'
      : 'Poisons';
  }
}




