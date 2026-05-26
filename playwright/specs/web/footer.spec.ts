import { test } from '@playwright/test';
import { POManager } from '../../pageobjects/POManager';
import { footerHeaders } from '../../testdata/footer.data';
import { FooterPage } from '../../pageobjects/FooterPage';

test.describe('Footer Validation - ICF', () => {
  test.describe.configure({ timeout: 90000 });

  test.beforeEach('Unlock ICF site', async ({ page }) => {
    const footerPage = new FooterPage(page);
    await footerPage.navigate();
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
  await footer.validateFooterSection(footerHeaders[0]);
    await footer.validateFooterSection(footerHeaders[1]);
    await footer.validateFooterSection(footerHeaders[2]);

    // ✅ Links
      await footer.validateFooterUtilityLinks();
    
      // ✅ Social Media Icons
      await footer.validateFooterSocialLinks();

      // ✅ Bottom Links
      await footer.validateFooterBottomLinks();

  });


});