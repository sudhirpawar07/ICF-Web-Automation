import { test, expect } from '@playwright/test';
import { POManager } from '../../pageobjects/POManager';
import { captureFailureLogs } from '../../utilities/logUtils';
import { customTest } from '../../testdata/test-base';
import * as allure from "allure-js-commons";

test.describe('Sauce Lab Login Feature', () => {

    //allure.suite('Sauce Lab Login Feature Testcases');
    // This will run before each test to open the base URL
    test.beforeEach(async ({ page, baseURL },testInfo) => {
        
        if (typeof baseURL === 'string') {
            await page.goto(baseURL);
            //allure.
           allure.label('Base URL', baseURL);
        } else {
            allure.severity('baseURL is not defined or not a string');
            throw new Error('baseURL is not defined or not a string');
        }
    });

    test.afterEach(async ({ page }, testInfo) => {
        console.log('Execution Status : ' + testInfo.status);
        if (testInfo.status === 'failed') {
            // Use the utility to capture failure logs if the test fails
            await captureFailureLogs(page, testInfo, new Error('Test failed in afterEach'));
        }

    });

    customTest('Valid Login - Standard User', async ({ page, validLoginTestData }, testInfo) => {

        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.validLogin(validLoginTestData.username, validLoginTestData.password);
        
        allure.displayName('Valid Login Testcases - Standard User');
        allure.description('This test is to validate the login functionality with valid credentials');
        allure.severity('critical');
        allure.epic('Login');
        allure.feature('Login Feature');
        allure.story('Valid Login');
        allure.tag("Login");
        testInfo.attach('Test Log Successfull', { body: 'Test execution started for verifying example.com', contentType: 'text/plain' });
        allure.step("Fetching Title",async()=>{
            const title = await page.title();
            expect(title).toBe(validLoginTestData.title);    
            console.log("Test Data Success - Valid");
        });
        
        

    });

    customTest('Invalid Login - Locked User', async ({ page, invalidLoginTestData }, testInfo) => {

        allure.displayName('Invalid Login Testcases - Locked User');
        allure.description('This test is to validate the login functionality with invalid credentials');
        allure.severity('critical');
        allure.epic('Login');
        allure.feature('Login Feature');
        allure.story('Invalid Login');
        allure.logStep("Trying to login with invalid creds");
        //allure.tag("Login");
        allure.logStep("Hello Deepak.");
        //allure.logStep("Invalid cred "+JSON.stringify(invalidLoginTestData));
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.validLogin(invalidLoginTestData.username, invalidLoginTestData.password);   
        allure.logStep("Verifying error message");
        if (invalidLoginTestData.errorMessage) {
                    await loginPage.validateErrMsg(invalidLoginTestData.errorMessage);
         } else {
                    throw new Error('Error message is missing for invalid login test data.');
                }
        ;
    });



});