import { expect, Locator, Page } from '@playwright/test';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class basePage {
  readonly page: Page;
  readonly continueButton: Locator;
  private readonly pageTitle;
  private readonly visibleContinueButton;
  private readonly inputContinueButton;
  private readonly fallbackContinueButton;
  private readonly firstFileInput;
  private readonly yesRadio;
  private readonly noRadio;
  private readonly firstRadioInput;
  private readonly firstCheckboxInput;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('h1');
    this.visibleContinueButton = page.locator('button:visible').filter({ hasText: /^Continue$/ }).first();
    this.inputContinueButton = page.locator("input[value='Continue']").first();
    this.fallbackContinueButton = page.getByRole('button', { name: /continue/i }).first();
    this.firstFileInput = page.locator('input[type="file"]').first();
    this.yesRadio = page.getByRole('radio', { name: /^yes$/i }).first();
    this.noRadio = page.getByRole('radio', { name: /^no$/i }).first();
    this.firstRadioInput = page.locator('input[type="radio"]').first();
    this.firstCheckboxInput = page.locator('input[type="checkbox"]').first();
    this.continueButton = page.getByRole('button', { name: 'Continue' }).or(page.locator("input[value='Continue']"));
  }

  async assertPageTitleContains(titleText: string) {
    await expect(this.pageTitle).toContainText(titleText);
  }

  async assertPageTitle(page: Page, title: string) {
    await expect(page).toHaveTitle(title + ' – GOV.UK');
  }

  async clickContinueButton() {
    if (await this.visibleContinueButton.isVisible().catch(() => false)) {
      await this.visibleContinueButton.click();
      return;
    }

    if (await this.inputContinueButton.isVisible().catch(() => false)) {
      await this.inputContinueButton.click();
      return;
    }

    await this.fallbackContinueButton.click();
  }

  async selectRadio(optionText: string) {
    await this.page.getByRole('radio', { name: optionText, exact: true }).check();
  }

  async fillField(locator: Locator, value: string) {
    await locator.clear();
    await locator.fill(value);
    await this.page.keyboard.press('Tab');
  }

  async fillByLabel(label: string, value: string) {
    const input = this.page.getByLabel(label, { exact: true }).first();
    await this.fillField(input, value);
  }

  async uploadFirstInput(filePath: string) {
    await this.firstFileInput.setInputFiles(filePath);
  }

  async clickLinkByText(text: string) {
    await this.page.getByRole('link', { name: text, exact: true }).click();
  }

  protected async chooseYesNo(value: string) {
    const normalized = (value || '').toLowerCase();
    if (normalized === c.YES.toLowerCase()) {
      await this.yesRadio.check();
      return;
    }
    await this.noRadio.check();
  }

  protected async pickRadioByText(text: string) {
    const strict = this.page.getByRole('radio', { name: text }).first();
    if (await strict.isVisible().catch(() => false)) {
      await strict.check();
      return;
    }

    const loose = this.page.getByRole('radio', { name: new RegExp(text, 'i') }).first();
    if (await loose.isVisible().catch(() => false)) {
      await loose.check();
      return;
    }

    const byValue = this.page.locator(`input[type="radio"][value="${text.toLowerCase()}"]`).first();
    if (await byValue.isVisible().catch(() => false)) {
      await byValue.check();
      return;
    }

    await this.firstRadioInput.check();
  }

  protected async pickCheckboxByText(text: string) {
    const strict = this.page.getByRole('checkbox', { name: text }).first();
    if (await strict.isVisible().catch(() => false)) {
      await strict.check();
      return;
    }

    const loose = this.page.getByRole('checkbox', { name: new RegExp(text, 'i') }).first();
    if (await loose.isVisible().catch(() => false)) {
      await loose.check();
      return;
    }

    const byLabel = this.page.getByLabel(new RegExp(text, 'i')).first();
    if (await byLabel.isVisible().catch(() => false)) {
      await byLabel.check();
      return;
    }

    if (await this.firstCheckboxInput.isVisible().catch(() => false)) {
      await this.firstCheckboxInput.check();
      return;
    }

    if (await this.firstRadioInput.isVisible().catch(() => false)) {
      await this.firstRadioInput.check();
    }
  }

  protected async fillAny(labels: string[], value: string) {
    for (const label of labels) {
      const control = this.page.getByLabel(label, { exact: true }).first();
      if (await control.isVisible().catch(() => false)) {
        await this.fillField(control, value);
        return;
      }
    }
  }

  protected async fillDate(day: string, month: string, year: string) {
    await this.fillAny(['Day', 'day'], day);
    await this.fillAny(['Month', 'month'], month);
    await this.fillAny(['Year', 'year'], year);
  }
}