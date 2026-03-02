import { test as baseTest, expect } from '@playwright/test';

// Define the structure of your test data for type safety
interface TestData {
    username: string;
    password: string;
    title?: string; // Optional, as invalid login data won't have a title
    errorMessage?: string; // Optional, for invalid login cases
}

// Extend the base test with custom data
export const customTest = baseTest.extend<{
    validLoginTestData: TestData;
    invalidLoginTestData: TestData;  // Array for multiple invalid login sets
}>({
    validLoginTestData: {
        username: 'standard_user',
        password: 'secret_sauce',
        title: 'Swag Labs'
    },
    invalidLoginTestData:
    {
        username: 'locked_out_user',
        password: 'secret_sauce',
        errorMessage: 'Epic sadface: Sorry, this user has been locked out.'
    }
});

// Now you can use `customTest` in your test files, which will automatically include both valid and invalid login data
