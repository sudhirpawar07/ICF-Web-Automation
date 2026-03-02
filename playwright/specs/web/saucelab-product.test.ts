import { test, expect } from '@playwright/test';
import { POManager } from '../../pageobjects/POManager';
import * as allure from "allure-js-commons";

const datasets = require("../../testdata/loginTestData.json");

test.describe('Products Page Test Suite', () => {
      
    
    test.beforeEach(async ({ page, baseURL }) => {
        await page.goto(baseURL || 'https://www.saucedemo.com/');
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.validLogin(datasets[0].username, datasets[0].password);
    });

    test('Verify Product List', async ({ page }) => {
        allure.displayName("Verify Product List");
            allure.description(
                "This test is to validate the functionality of displaying the product list"
            );
            allure.epic("Products");
            allure.feature("Products Feature");
        const poManager = new POManager(page);
        const productsPage = poManager.getProductsPage();
        expect(await productsPage.productList).not.toBeNull();
        allure.logStep('Product List is displayed');
       
    });

  

});