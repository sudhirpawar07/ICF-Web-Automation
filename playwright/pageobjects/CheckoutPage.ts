import {test, expect,Locator,Page} from '@playwright/test';

export class CheckoutPage
{
    firstName :Locator;
    lastName :Locator;
    zipCode :Locator;
    continue :Locator;
    finish :Locator;
    page : Page;

constructor(page:Page)
{
    this.page = page;
    this.firstName =  page.locator('[data-test="firstName"]');
    this.lastName =  page.locator('[data-test="lastName"]');
    this.zipCode =  page.locator('[data-test="postalCode"]');
    this.continue = page.getByRole('button', { name: 'CONTINUE' });
    this.finish = page.getByRole('link', { name: 'FINISH' });
}

async enterInfo(firstname:string,lastname:string,zipcode:string)
{
    console.log("Waiting for the first name field...");
    await this.page.waitForLoadState('networkidle'); 
    await this.firstName.waitFor({ state: 'visible', timeout: 5000 });
    console.log("Filling in the first name...");
    await this.firstName.fill(firstname);
    await this.lastName.fill(lastname);
    await this.zipCode.fill(zipcode);
}

async clickContinue()
{
    await this.continue.click();
}

async clickFinish()
{
    await this.finish.click();
}

}
module.exports = {CheckoutPage};