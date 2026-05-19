
import { LoginPage } from './LoginPage';
import { Page } from '@playwright/test';
import { HomePage } from './HomePage';
import { FooterPage } from './FooterPage.ts';



export class POManager {
    loginPage: LoginPage;
    page: Page;
    homePage: HomePage;
  readonly footerPage: FooterPage;

 
    constructor(page: Page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
            this.homePage = new HomePage(this.page);
    this.footerPage = new FooterPage(page);

    }

    getLoginPage() {
        return this.loginPage;
    }


    getHomePage() {
    return this.homePage;
  }
  getFooterPage() {
    return this.footerPage;
  }

    
}
module.exports = { POManager };