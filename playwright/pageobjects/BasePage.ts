import { Locator, Page } from '@playwright/test';

export class BasePage {
    page: Page;
    cartIcon: Locator;
    sideBarOpenButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartIcon = page.locator("//a[contains(@class,'shopping_cart')]");
        this.sideBarOpenButton = page.locator("//button[text()='Open Menu']");
    }

    async clickCartIcon() {
        await this.cartIcon.click();
    }

    async clickSideBarOpenButton() {
        await this.sideBarOpenButton.click();
    }
}
    module.exports = { BasePage };