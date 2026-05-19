import { Locator,expect, Page } from '@playwright/test';

export class BasePage {
    page: Page;
    cartIcon: Locator;
    sideBarOpenButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartIcon = page.locator("//a[contains(@class,'shopping_cart')]");
        this.sideBarOpenButton = page.locator("//button[text()='Open Menu']");
    }
  //    async captureScreenshot(name: string) {
  //   await this.page.screenshot({
  //     path: `screenshots/${name}-${Date.now()}.png`,
  //     fullPage: true
  //   });
  // }

    async clickCartIcon() {
        await this.cartIcon.click();
    }

    async clickSideBarOpenButton() {
        await this.sideBarOpenButton.click();
    }
  //   async navigate(url: string) {
  //   await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  // }

  async click(element: Locator) {
    await element.click();
  }

  async getText(element: Locator) {
    return await element.textContent();
  }

  
  async navigate(url: string) {
    await this.page.goto(url);
  }

  async getResponseStatus(url: string): Promise<number> {
    const response = await this.page.request.get(url);
    return response.status();
  }

  // async validateUpperCase(text: string) {
  //   expect(text).toBe(text.toUpperCase());
  // }
  async validateText(actual: string, expected: string) {
  expect(actual.trim()).toBe(expected);
}
}
    module.exports = { BasePage };