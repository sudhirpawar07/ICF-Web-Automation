import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class FooterPage extends BasePage {
  readonly footer: Locator;
   readonly passwordInput: Locator;
  readonly unlockButton: Locator;

  constructor(page: Page) {
    super(page);
    this.footer = page.locator('footer');
     this.passwordInput = page.locator('input[type="password"]');
    this.unlockButton = page.locator('button:has-text("Unlock")');
  }

   async navigate() {
    await this.page.goto('https://opti-inte.icf.com/');
  }

  async enterPassword(password: string) {
    await this.passwordInput.fill(password);
  }

     async clickUnlock() {
    await this.unlockButton.click();
  }

  async unlockSite(password: string) {
    await this.enterPassword(password);
    await this.clickUnlock();
  }
  // 🔹 LOGO
  async validateFooterLogo() {
    const logo = this.footer.locator('img[alt="BrandLogo.svg"]');

    await expect(logo).toBeVisible();

    const src = await logo.getAttribute('src');
    expect(src).toBeTruthy();

    const status = await this.getResponseStatus(src!);

    expect([200, 304]).toContain(status);
  }

  // 🔹 HEADERS
  async validateFooterHeaders(headers: string[]) {
    for (const headerText of headers) {
      const header = this.footer.locator(`h3:has-text("${headerText}")`);

      await expect(header).toBeVisible();

      const text = await header.textContent();
    }
  }

  // 🔹 SECTION VALIDATION
  async validateFooterSection(sectionName: string) {
   const section = this.footer.locator(`h3:has-text("${sectionName}")`).first();
await expect(section).toBeVisible();

const parent = section.locator('xpath=ancestor::div[1]');

    const links = section.locator('a');
    const count = await links.count();

    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const link = links.nth(i);

      // ✅ TEXT
      const text = await link.textContent();
      expect(text?.trim().length).toBeGreaterThan(0);

      // ✅ LINK
      const href = await link.getAttribute('href');
      expect(href).toBeTruthy();

      // Skip invalid links
      if (
        href &&
        !href.startsWith('#') &&
        !href.startsWith('mailto') &&
        !href.startsWith('tel')
      ) {
        const status = await this.getResponseStatus(href);
        expect(status).toBeLessThan(400);
      }

      // ✅ STYLE (basic)
      const fontSize = await link.evaluate(el =>
        window.getComputedStyle(el).fontSize
      );

      expect(fontSize).toBeTruthy();
    }
  }
}