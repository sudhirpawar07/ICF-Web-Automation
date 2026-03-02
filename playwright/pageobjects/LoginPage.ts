import { test, expect, Locator, Page } from '@playwright/test';
import { AllureReporter } from 'allure-playwright';

export class LoginPage {
    page: Page;
    loginButton: Locator;
    userName: Locator;
    password: Locator;
    errMsg: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginButton = page.getByRole('button', { name: 'LOGIN' })
        this.userName = page.locator('[data-test="username"]');
        this.password = page.locator('[data-test="password"]');
        this.errMsg = page.locator('[data-test="error"]');

    }

    async validLogin(username: string, password: string) {
        //await this.userName.waitFor({state:'visible'});
        await this.userName.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
        await this.page.waitForLoadState('networkidle');

    }

    async validateErrMsg(expectedErrMsg: string) {
        const actualErrorMessage = await this.errMsg.textContent();
        if (actualErrorMessage?.includes(expectedErrMsg)) {
            console.log('Error message is correct');
        } else {
            throw new Error(`Error message does not match! Expected: "${expectedErrMsg}", but got: "${actualErrorMessage}"`);
        }
    }

}
module.exports = { LoginPage };