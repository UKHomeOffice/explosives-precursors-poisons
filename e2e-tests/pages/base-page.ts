import { expect, Locator, Page } from '@playwright/test';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class basePage {
  readonly page: Page;
  readonly continueButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.continueButton = page.getByRole('button', { name: 'Continue' }).or(page.locator("input[value='Continue']"));
  }

  async assertPageTitleContains(titleText: string) {
    await expect(this.page.locator('h1')).toContainText(titleText);
  }

  async assertPageTitle(page: Page, title: string) {
    await expect(page).toHaveTitle(title + ' – GOV.UK');
  }

  async clickContinueButton() {
    const button = this.page.locator('button:visible').filter({ hasText: /^Continue$/ }).first();
    if (await button.isVisible().catch(() => false)) {
      await button.click();
      return;
    }

    const inputContinue = this.page.locator("input[value='Continue']").first();
    if (await inputContinue.isVisible().catch(() => false)) {
      await inputContinue.click();
      return;
    }

    await this.page.getByRole('button', { name: /continue/i }).first().click();
  }

  async selectRadio(optionText: string) {
    await this.page.getByRole('radio', { name: optionText, exact: true }).check();
  }

  async fillField(locator: Locator, value: string) {
    await locator.fill(value);
    await this.page.keyboard.press('Tab');
  }


  async fillByLabel(label: string, value: string) {
    const input = this.page.getByLabel(label, { exact: true }).first();
    await this.fillField(input, value);
  }

  async uploadFirstInput(filePath: string) {
    const input = this.page.locator('input[type="file"]').first(); await input.setInputFiles(filePath);
  }

  async clickLinkByText(text: string) {
    await this.page.getByRole('link', { name: text, exact: true }).click();
  }

  protected async chooseYesNo(value: string) {
    const normalized = (value || '').toLowerCase();
    if (normalized === c.YES.toLowerCase()) {
      await this.page.getByRole('radio', { name: /^yes$/i }).first().check();
      return;
    }
    await this.page.getByRole('radio', { name: /^no$/i }).first().check();
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

    await this.page.locator('input[type="radio"]').first().check();
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

    const firstCheckbox = this.page.locator('input[type="checkbox"]').first();
    if (await firstCheckbox.isVisible().catch(() => false)) {
      await firstCheckbox.check();
      return;
    }

    const firstRadio = this.page.locator('input[type="radio"]').first();
    if (await firstRadio.isVisible().catch(() => false)) {
      await firstRadio.check();
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