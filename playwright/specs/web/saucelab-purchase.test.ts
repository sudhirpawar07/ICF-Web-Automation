import { test, expect } from '@playwright/test';
import { POManager } from '../../pageobjects/POManager';
import { captureFailureLogs } from '../../utilities/logUtils';
const productData = require("../../testdata/prodcustTestData.json");
import * as allure from "allure-js-commons";

test.describe('Sauce Lab testing', () => {

    // This will run before each test to open the base URL
    test.beforeEach(async ({ page, baseURL }, testInfo) => {
        if (typeof baseURL === 'string') {
            await page.goto(baseURL);
            
        } else {
            throw new Error('baseURL is not defined or not a string');
        }

        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        const cartPage = poManager.getCartPage();
        const productsPage = poManager.getProductsPage();
        await loginPage.validLogin('standard_user', 'secret_sauce');
        await productsPage.addProduct(productData.name);
        await productsPage.clickCartButton(); 
        await cartPage.clickCheckout();
        
    });

    test.afterEach(async ({ page }, testInfo) => {
        console.log('Execution Status : '+testInfo.status);
        // if (testInfo.status === 'failed') {
        //     // Capture the error message if the test failed
        //     testInfo.attach('Failure Log', { body: `Test failed with error: ${testInfo.error?.message}`, contentType: 'text/plain' });
        // }
        // Capture screenshot and attach for debugging purposes
        //   const screenshot = await page.screenshot();
        //   testInfo.attach('Failure Screenshot', { body: screenshot, contentType: 'image/png' });
        if (testInfo.status === 'failed') {
            // Use the utility to capture failure logs if the test fails
            await captureFailureLogs(page, testInfo, new Error('Test failed in afterEach'));
        }

    });

    test('Valid buy functionality', async ({ page, baseURL }, testInfo) => {
        
        const poManager = new POManager(page);
        const checkoutPage = poManager.getCheckoutPage();
        const cartPage = poManager.getCartPage();
        const orderPage = poManager.getOrderPage();
        const productsPage = poManager.getProductsPage();
        await checkoutPage.enterInfo('MyFirstName','MyLastName', 'zipcode');
        await checkoutPage.clickContinue();
        await checkoutPage.clickFinish();
        await orderPage.validateOrderConfirmation('THANK YOU FOR YOUR ORDER');  
    });


});