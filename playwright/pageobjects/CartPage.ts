import {test, expect,Locator,Page} from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage
{
    checkout :Locator;
    page : Page;
    removeButton : Locator;

constructor(page:Page)
{   
    super(page);
    this.page = page;
    this.checkout =  page.getByRole('link', { name: 'CHECKOUT' });
    this.removeButton = page.locator("//button[text()='REMOVE']");
}

async clickCheckout()
{
    await this.checkout.click();
}
async clickRemoveButton()
{
    await this.removeButton.click(); 
    
}
}
module.exports = {CartPage};