import { test } from '@playwright/test';
import { POManager } from '../../pageobjects/POManager';
import { footerHeaders } from '../../testdata/footer.data';
import{ FooterPage } from '../../pageobjects/FooterPage';

test.describe('Footer Validation - ICF', () => {

  test.beforeEach('Unlock ICF site', async ({ page }) => {
      const footerPage = new FooterPage(page);
    await page.goto('https://opti-inte.icf.com/');
  
  await footerPage.navigate();

  // Replace with actual password
  await footerPage.unlockSite('icfwebsite2026');
   await page.waitForLoadState('domcontentloaded');

  // Step 3: Scroll to bottom
  await page.keyboard.press('End');


 
});


  test('Validate Footer Complete', async ({ page }) => {

    const poManager = new POManager(page);
    const footer = poManager.getFooterPage();

    // ✅ Logo
    await footer.validateFooterLogo();

    // ✅ Headers
    await footer.validateFooterHeaders(footerHeaders);

    // ✅ Sections
    await footer.validateFooterSection('FEATURED EXPERTISE');
    await footer.validateFooterSection('INSIGHTS');
    await footer.validateFooterSection('ABOUT');
  });

});