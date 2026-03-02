import {test, expect,Locator,Page} from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage
{
    firstProductAddToCart : Locator;
    product : Locator; 
    cartButton :Locator;
    page : Page;
    productList:Locator;

constructor(page:Page)
{   
    super(page); 
    this.page = page;
    this.firstProductAddToCart = page.locator('div').filter({ hasText: /^\$29\.99ADD TO CART$/ }).getByRole('button');
    this.cartButton =  page.locator('[data-icon="shopping-cart"]');
    this.productList= page.locator("//div[@class='inventory_item_name']")
    
}

async addProduct(productName:string)    
{   
   
   this.product=this.page.locator("//div[text()='"+productName+"']//parent::a//parent::div[@class='inventory_item_label']//following-sibling::div[@class='pricebar']//child::button")
   await this.product.click();
    
}

async clickCartButton()
{
    await this.cartButton.click();
}


}
module.exports = {ProductsPage};