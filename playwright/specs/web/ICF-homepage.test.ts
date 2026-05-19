import { test, expect } from '@playwright/test';
import { POManager } from '../../pageobjects/POManager';
import * as allure from "allure-js-commons";

import { HomePage } from '../../pageobjects/HomePage';

test.describe('ICF Homepage Hero Block', () => {

  test('Validate Hero Components', async ({ page }) => {

    const heroPage = new HomePage(page);

    await heroPage.navigateToHome();

    // Validate Hero Section
   /* await expect(heroPage.heroSection).toBeVisible();

    // Validate Learn More button
    await expect(heroPage.learnMoreCTA).toBeVisible();

    // Validate bottom navigation
    await expect(heroPage.dataCentersTab).toBeVisible();
    await expect(heroPage.sightlineTab).toBeVisible();
    await expect(heroPage.fathomTab).toBeVisible();

     // Validate Pause button
    await expect(heroPage.pauseButton).toBeVisible();
*/
    // Click navigation
    await heroPage.clickDataCenters();
    await heroPage.clickSightline();
    await heroPage.clickFathom();
    await heroPage.clickLearnMoreCTA();

  });

});