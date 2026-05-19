import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';



export class HomePage extends BasePage {

  readonly heroSection: Locator;
  readonly learnMoreCTA: Locator;

  readonly dataCentersTab: Locator;
  readonly sightlineTab: Locator;
  readonly fathomTab: Locator;
  // readonly learnMoreCTA: Locator;

  readonly pauseButton: Locator;

  constructor(page: Page) {
    super(page);

    // HERO SECTION
    this.heroSection = page.locator('.hero-carousel-module');

    // HERO CTA
    this.learnMoreCTA = this.heroSection.locator('a:has-text("Learn More")').first();

    // HERO NAVIGATION TABS (FIXED)
    this.dataCentersTab = page.locator('.hero-carousel-module__navigation-item-title', { hasText: 'Data Centers' });

    this.sightlineTab = page.locator('.hero-carousel-module__navigation-item-title', { hasText: 'ICF Sightline' });

    this.fathomTab = page.locator('.hero-carousel-module__navigation-item-title', { hasText: 'ICF Fathom' });

    // HERO PAUSE BUTTON
    this.pauseButton = page.locator('.hero-carousel-module button[aria-label*="pause"]');

  }

  async navigateToHome() {
 await this.page.goto('https://www.icf.com/', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  await this.page.waitForSelector('.hero-carousel-module');  }

  async clickDataCenters() {
    await this.dataCentersTab.click();
  }

  async clickSightline() {
    await this.sightlineTab.click();
  }

  async clickFathom() {
    await this.fathomTab.click();
  }
  async clickLearnMoreCTA(){
   await this.learnMoreCTA.click()
    await this.page.screenshot({
    path: `screenshots/learn-more-navigation-${Date.now()}.png`,
    fullPage: true
  });
  }

}