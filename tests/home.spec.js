import test from '../testFixtures/fixture';
import { expect } from '@playwright/test';
import fs from 'fs';
const testData = JSON.parse(fs.readFileSync(`./data/users.json`, `utf-8`));
import { LoginPage, LogoutPage, HomePage, SideMenuPage } from '../pages';

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

        await test.step('The admin user is redirected to the ETANATRUST DASHBOARD', async () => {
            expect(await homePage.isEtanaTrustVisible()).toBeTruthy();
            expect(await homePage.isDashboardVisible()).toBeTruthy();
            expect(await homePage.isAdminVisible()).toBeTruthy();
        });

        await test.step('Logout from the application', async () => {
            await sideMenuPage.sideMenu("Logout");
            await logoutPage.logout();
        });
    });

    test('@regression: Verify successful login and logout as an investor user', async () => {

        await test.step('Login as an Investor user', async () => {
            await loginPage.loginCredentials(testData.investor.email, testData.investor.password);
        });

        await test.step('Click on any other side menu options(Except Home)', async () => {
            await sideMenuPage.sideMenu("Withdrawals");
        });
        await test.step('Click on the "Home" menu item.', async () => {
            await sideMenuPage.sideMenu("Home");
        });

        await test.step('Logout from the application', async () => {
            await sideMenuPage.sideMenu("Logout");
            await logoutPage.logout();
        });
    });
});