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
    this.page.setDefaultNavigationTimeout(90000);
    await this.page.goto('https://opti-inte.icf.com/', {
      waitUntil: 'domcontentloaded',
      timeout: 90000,
    });
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

    // ✅ Visible
    await expect(header).toBeVisible();

    // ✅ Get actual text
    const text = (await header.textContent())?.trim();


    // ✅ Validate CSS uppercase style
    await expect(header).toHaveCSS('text-transform', 'uppercase');

    console.log(`✅ Header verified in uppercase style: ${text}`);
  }
  }

   // 🔹 SECTION VALIDATION
  async validateFooterSection(sectionName: string) {
    // Section Heading
    const section = this.footer
      .locator(`h3:has-text("${sectionName}")`)
      .first();

    await expect(section).toBeVisible();

    // Parent container of section
    const parent = section.locator('xpath=ancestor::div[1]');

    // All links inside section
    const links = parent.locator('a');

    const count = await links.count();

    // Validate links exist
    expect(count).toBeGreaterThan(0);

    // Validate each link
    for (let i = 0; i < count; i++) {
      const link = links.nth(i);

      // ✅ Validate link text
      const text = await link.textContent();
      console.log(text);
      expect(text?.trim().length).toBeGreaterThan(0);

      // ✅ Validate href
      const href = await link.getAttribute('href');
      expect(href).toBeTruthy();

      // ✅ Validate link visible
      await expect(link).toBeVisible();
    }
  }

// 🔹 UTILITY LINKS
   async validateFooterUtilityLinks() {

  const links = this.page.locator('[data-testid="footer-utility-link"]');

  const count = await links.count();

  expect(count).toBeGreaterThan(0);

  for (let i = 0; i < count; i++) {

    const link = links.nth(i);

    await expect(link).toBeVisible();

    const text = (await link.textContent())?.trim();

    // ✅ Validate text exists
    expect(text).toBeTruthy();

    // ✅ Validate href exists
    const href = await link.getAttribute('href');
    expect(href).toBeTruthy();

    console.log(`✅ Footer link verified: ${text} -> ${href}`);
  }
}

//Validate Social Media links
async validateFooterSocialLinks() {

  const socialLinks = this.page.locator('[data-testid="footer-social-link"]');

  const count = await socialLinks.count();

  expect(count).toBeGreaterThan(0);

  for (let i = 0; i < count; i++) {

    const link = socialLinks.nth(i);

    await expect(link).toBeVisible();

    const ariaLabel = await link.getAttribute('aria-label');
    expect(ariaLabel).toBeTruthy();

    const href = await link.getAttribute('href');
    expect(href).toBeTruthy();

    console.log(`✅ Social link: ${ariaLabel} -> ${href}`);
  }
}


//validate bottom links
async validateFooterBottomLinks() {

  const links = this.page.locator('[data-testid="footer-bottom-link"]');

  const count = await links.count();

  expect(count).toBeGreaterThan(0);

  for (let i = 0; i < count; i++) {

    const link = links.nth(i);

    await expect(link).toBeVisible();

    const text = (await link.textContent())?.trim();

    // ✅ Validate text exists
    expect(text).toBeTruthy();

    // ✅ Validate href exists
    const href = await link.getAttribute('href');
    expect(href).toBeTruthy();

    console.log(`✅ Footer bottom link verified: ${text} -> ${href}`);
  }
}
}