import { test, expect, Locator, Page } from '@playwright/test';

export class OrderPage {
    orderConfirmationTitle: Locator;
    orderConfirmationMessage: Locator;
    page: Page;

    constructor(page: Page) {
        this.page = page;
        this.orderConfirmationTitle = page.getByRole('heading', { name: 'THANK YOU FOR YOUR ORDER' });
        this.orderConfirmationMessage = page.getByText('Your order has been');

    }

    async validateOrderConfirmation(expectedOrderConfirmationTitle: string) {
        const actualorderConfirmationTitle = await this.orderConfirmationTitle.textContent();

        if (actualorderConfirmationTitle?.includes(expectedOrderConfirmationTitle)) {
            console.log('Error message is correct');
        } else {
            throw new Error(`Error message does not match! Expected: "${expectedOrderConfirmationTitle}", but got: "${actualorderConfirmationTitle}"`);
        }
    }



}
module.exports = { OrderPage };