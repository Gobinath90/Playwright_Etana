import test from '../testFixtures/fixture';
import { expect } from '@playwright/test';
import fs from 'fs';
import { LoginPage, LogoutPage, HomePage, SideMenuPage, AccountPage } from '../pages';

const testData = JSON.parse(fs.readFileSync(`./data/users.json`, `utf-8`));
// Utility to initialize page objects
const initializePages = (page) => {
    return {
        loginPage: new LoginPage(page),
        logoutPage: new LogoutPage(page),
        homePage: new HomePage(page),
        sideMenuPage: new SideMenuPage(page),
        accountPage: new AccountPage(page),
    };
};

test.describe('Home Screen Testcase Verification', () => {
    let loginPage, logoutPage, homePage, sideMenuPage;

    test.beforeEach(async ({ page }) => {
        ({ loginPage, logoutPage, homePage, sideMenuPage } = initializePages(page));
        await test.step('Open the application and login with admin credentials', async () => {
            await loginPage.openApp();
            await loginPage.loginCredentials(testData.admin.email, testData.admin.password);
        });
    });


    test('@regression: Verify admin user navigation and side menu interactions.', async ({ page }) => {
        await test.step('Navigate using side menu options', async () => {
            await sideMenuPage.sideMenu("Account");
            await sideMenuPage.sideMenu("Home");
            expect(await homePage.isAdminVisible()).toBeTruthy();

        });
    });

    test('@regression: Verify side menu structure and logo display.', async ({ page }) => {
        await test.step('Verify side menu items and logo', async () => {
            await sideMenuPage.SideMenuLogo();
            const menuTexts = await sideMenuPage.sideMenuNames();
            expect(menuTexts).toEqual(['Home', 'Withdrawals', 'Deposits', 'Wallets', 'Organization', 'Account', 'Logout']);
        });

    });

    test('@regression: Verify hamburger menu toggles side panel visibility.', async ({ page }) => {
        await test.step('Toggle side panel visibility using hamburger menu', async () => {
            const hamburgerMenu = page.locator('.pt-5');
            await hamburgerMenu.click();
            await hamburgerMenu.click();
        });

    });

    test('@regression: Verify user information and currency details on home screen.', async ({ page }) => {
        await test.step('Verify user welcome message', async () => {
            const welcomeMessage = await page.locator('.text-lg').textContent();
            expect(welcomeMessage).toContain('Welcome back');
        });

        await test.step('Verify currency type display', async () => {
            await page.waitForTimeout(5000);
            const currencyTypes = await homePage.checkCurrencyType();
            console.log('Currency Types:', currencyTypes);
            expect(currencyTypes).toEqual(['ADA:', 'APT:', 'AVAX:', 'BTC:', 'ETH:', 'LINK:', 'MATIC:', 'POLYX:', 'SOL:', 'SUI:', 'TRX:', 'UNI:', 'USDC:', 'USDT:', 'WND:', 'XLM:', 'XRP:']);
        });

        await test.step('Verify currency values', async () => {
            const currencyValues = await homePage.checkCurrencyValue();
            console.log('Currency Values:', currencyValues);
        });

    });

    test('@regression: Verify notifications functionality.', async ({ page }) => {
        await test.step('Check notifications display', async () => {
            const notificationIcon = page.locator('.relative');
            await notificationIcon.click();
            const notificationText = await page.locator("//div[normalize-space(text())='No notifications']").textContent();
            expect(notificationText).toBe('No notifications');
        });
    });
});

test.describe('Account Screen Testcase Verification', () => {
    let loginPage, logoutPage, homePage, sideMenuPage, accountPage;

    test.beforeEach(async ({ page }) => {
        ({ loginPage, logoutPage, homePage, sideMenuPage, accountPage } = initializePages(page));

        await test.step('Open the application, login, and navigate to Account page', async () => {
            await loginPage.openApp();
            await loginPage.loginCredentials(testData.admin.email, testData.admin.password);
            await sideMenuPage.sideMenu('Account');
            await page.waitForTimeout(2000);
        });
    });


    test('@regression: Verify Account Page Title', async () => {
        await test.step('Verify the account page title is correct', async () => {
            const accountTitle = await accountPage.verifyAccountTitle();
            expect(accountTitle).toBe('My Account');
        });
    });

    test('@regression: Verify Account Details Display', async () => {
        await test.step('Verify account details (Sub, Name, Email) are displayed correctly', async () => {
            await accountPage.getAccountDetails();
        });
    });

    test('@regression: Verify Webhook and API Key Details', async () => {
        await test.step('Verify Webhook URL, Webhook Key, and API Key information is displayed correctly', async () => {
            await accountPage.verifyWebhookDetails();
        });
    });

});

