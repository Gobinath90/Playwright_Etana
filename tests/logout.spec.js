import test from '../testFixtures/fixture'
import { expect } from '@playwright/test';
import fs from 'fs'
const testData = JSON.parse(fs.readFileSync(`./data/users.json`, `utf-8`))
import { baseUrl, title } from '../config'
import { LoginPage, LogoutPage, HomePage, SideMenuPage } from '../pages';
import * as allure from "allure-js-commons";



test.describe('Admin user login and logout flow verification', () => {
  let loginPage, logoutPage, homePage, sideMenuPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    logoutPage = new LogoutPage(page);
    homePage = new HomePage(page);
    sideMenuPage = new SideMenuPage(page);
    await loginPage.openApp();
  });

  test('@regression: Verify successful login and logout as an admin user', async () => {
    await test.step('Login as an admin user', async () => {
      await loginPage.loginCredentials(testData.admin.email, testData.admin.password);
    });

    await test.step('The investor user is redirected to the ETANATRUST DASHBOARD', async () => {
      expect(await homePage.isEtanaTrustVisible()).toBeTruthy();
      expect(await homePage.isDashboardVisible()).toBeTruthy();
      expect(await homePage.isAdminVisible()).toBeTruthy();
    });

    await test.step('Logout from the application', async () => {
      await sideMenuPage.sideMenu("Logout");
      await logoutPage.logout();
    });
  });

  test('@regression: Verify successful login and logout as an investor user', async ({ page }) => {
    await allure.owner("John Doe");
    await allure.tags("Web interface", "Authentication");
    await allure.severity("critical");

    await test.step('Login as an Investor user', async () => {
      await loginPage.loginCredentials(testData.investor.email, testData.investor.password);
    });

    await test.step('The investor user is redirected to the ETANATRUST DASHBOARD', async () => {
      expect(await homePage.isEtanaTrustVisible()).toBeTruthy();
      expect(await homePage.isDashboardVisible()).toBeTruthy();
      expect(await homePage.isInvestorVisible()).toBeTruthy();
    });

    await test.step('Logout from the application', async () => {
      await sideMenuPage.sideMenu("Logout");
      await logoutPage.logout();
    });
  });
});