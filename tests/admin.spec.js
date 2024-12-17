import test from '../testFixtures/fixture';
import { expect } from '@playwright/test';
import fs from 'fs';
import { LoginPage, LogoutPage, HomePage, SideMenuPage, AccountPage, OrganizationPage } from '../pages';

const testData = JSON.parse(fs.readFileSync(`./data/users.json`, `utf-8`));
// Utility to initialize page objects
const initializePages = (page) => {
    return {
        loginPage: new LoginPage(page),
        logoutPage: new LogoutPage(page),
        homePage: new HomePage(page),
        sideMenuPage: new SideMenuPage(page),
        accountPage: new AccountPage(page),
        organizationPage: new OrganizationPage(page),
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

    test('@regression: Verify that the Webhook Key and API Key values are displayed', async () => {
        await test.step('Click on show button and get the Text for Webhook Key', async () => {
            await accountPage.clickWebhookKey();
        });
        await test.step('Click on show button and get the Text for API Key', async () => {
            await accountPage.clickApiKey();

        });
    });

    test('@regression: Verify Webhook and API key copy functionality', async ({ page }) => {
        await test.step('Copy Webhook key and verify status message', async () => {
            const webhookMessage = await accountPage.copyWebhookKey();
            expect(webhookMessage).toBe("Webhook key copied to clipboard.");
            await page.waitForTimeout(3000);
        });

        await test.step('Copy API key and verify status message', async () => {
            const apiKeyMessage = await accountPage.copyApiKey();
            expect(apiKeyMessage).toBe("API key copied to clipboard.");
        });
    });

    test('@regression: Verify visibility of Save and Cancel buttons on Edit Info', async () => {
        await test.step('Click on Edit Info button', async () => {
            await accountPage.clickEditInfo();
        });

        await test.step('Check visibility of Save and Cancel buttons', async () => {
            await accountPage.checkAndEditInfo();
        });
    });

    test('@regression: Verify User Information Editing (FirstName and LastName) and cancel changes', async () => {
        await test.step('Click on Edit Info button', async () => {
            await accountPage.clickEditInfo();
        });

        await test.step('Edit User Information and cancel changes', async () => {
            await accountPage.editInfo(testData.admin.firstName, testData.admin.lastName);
            await accountPage.clickCancelChanges();
        });
    });

    test('@regression: Verify User Information Editing (FirstName and LastName) and save changes', async () => {
        await test.step('Click on Edit Info button', async () => {
            await accountPage.clickEditInfo();
        });

        await test.step('Edit User Information and save changes', async () => {
            await accountPage.editInfo(testData.admin.firstName, testData.admin.lastName);
            await accountPage.clickSaveChanges();
        });
    });

    test('@regression: Verify account is verified', async () => {
        await test.step('Check if account is verified', async () => {
            await accountPage.checkVerifiedVisible();
        });
    });



});


test.describe.only('Organization Screen Testcase Verification', () => {
    let loginPage, sideMenuPage, organizationPage;

    test.beforeEach(async ({ page }) => {
        ({ loginPage, sideMenuPage, organizationPage } = initializePages(page));

        await test.step('Open the application, login, and navigate to Organization page', async () => {
            await loginPage.openApp();
            await loginPage.loginCredentials(testData.admin.email, testData.admin.password);
            await sideMenuPage.sideMenu('Organization');
            await page.waitForTimeout(2000);
        });
    });

    test('@regression: Verify Organization Page Title', async () => {
        await test.step('Verify the Organization Page title is correct', async () => {
            const organizationTitle = await organizationPage.verifyOrganizationTitle();
            expect(organizationTitle).toEqual("Organization");
        });
    });

    test('@regression: Verify that the Organization User Page displays both Admin and Investor users correctly.', async () => {
        await test.step('Check for the presence of two separate list views:', async () => {
            const admininvestortext = await organizationPage.clickdownArrowButton();
            expect(admininvestortext).toEqual(['Admins', 'Investors']);
        });
    });

    test('@regression: Verify that the search results display the correct users based on the email address entered.', async () => {
        await test.step('Enter an Registered email address in the search field:', async () => {
            const searchData = await organizationPage.enterSearch("tester2024@gmail.com");
            expect(searchData).toEqual("tester2024@gmail.com");
        });
    });

    test('@regression: Verify that when an unregistered email address is searched, appropriate messages are displayed.', async () => {
        await test.step('Enter an unregistered email address in the search field.', async () => {
            const invalidsearchData = await organizationPage.enterInvalidSearch(testData.invalid.email);
            expect(invalidsearchData).toEqual(["No admins", "No investors"]);
        });
    });

    test('@regression: Verify that the admin user can see the "Invite New User" button on the Organization User page.', async () => {
        await test.step('Review the page for the "Invite New User" button.', async () => {
            const InviteNewUserData = await organizationPage.getAdminInviteNewUser();
            expect(InviteNewUserData).toEqual("Invite New User");
        });
    });

    test('@regression: Verify the Organization User Page Opens After Inviting a New User', async () => {
        await test.step('Click on the "Invite New User" button. ', async () => {
            const inviteUsertoOrganizationData = await organizationPage.clickAdminInviteNewUser();
            expect(inviteUsertoOrganizationData).toEqual("Invite User to Organization");
        });
    });

    test('@regression: Verify that Clicking Cancel Does Not Add the User', async () => {

        await test.step('Click on the "Invite New User" button. ', async () => {
            const inviteUsertoOrganizationData = await organizationPage.clickAdminInviteNewUser();
            expect(inviteUsertoOrganizationData).toEqual("Invite User to Organization");
        });

        await test.step('Fill the form with Name, Family Name, Email Address, and select an access role (Admin/Manager) ', async () => {
            await organizationPage.fillAndInviteUserForm("tesingNew", "testExits", "testnew2024@gmail.com");
        });

        await test.step('Click on the "Cancel" button.', async () => {
            await organizationPage.clickCancelButton();
        });

        await test.step('Observe that the user is redirected to the Organization User page.', async () => {
            const organizationTitle = await organizationPage.verifyOrganizationTitle();
            expect(organizationTitle).toEqual("Organization");
        });
    });

    test('@regression: Verify Adding a New User Invited', async () => {

        await test.step('Click on the "Invite New User" button. ', async () => {
            const inviteUsertoOrganizationData = await organizationPage.clickAdminInviteNewUser();
            expect(inviteUsertoOrganizationData).toEqual("Invite User to Organization");
        });

        await test.step('Fill the form with Name, Family Name, Email Address, and select an access role (Admin/Manager) ', async () => {
            await organizationPage.fillAndInviteUserForm("tesingNew", "testExits", "testnew2030@gmail.com");
        });

        await test.step('Click on the "Submit" button.', async () => {
            await organizationPage.clickSubmitButton();
        });

        await test.step('Observe that the user is redirected to the Organization User page.', async () => {
            const admintoasterData = await organizationPage.checkAdminToasterMessage("testnew2030@gmail.com");
            expect(admintoasterData).toEqual("Invitation email sent to testnew2030@gmail.com");
        });

        await test.step('Locate the new user in the role-based list view.', async () => {

            const searchData = await organizationPage.enterSearch("testnew2030@gmail.com");
            expect(searchData).toEqual("testnew2030@gmail.com");
        });
    });

    test('@regression: Verify User Invitation and Display on Organization User Page', async () => {

        await test.step('Locate the new user in the role-based list view.', async () => {
            const searchData = await organizationPage.enterSearch("testnew2030@gmail.com");
            expect(searchData).toEqual("testnew2030@gmail.com");
        });

    });

    test('@regression: Verify Editing User Details for Admin / Investor Users', async () => {

        await test.step('Locate the new user in the role-based list view.', async () => {
            const searchData = await organizationPage.enterSearch("testnew2030@gmail.com");
            expect(searchData).toEqual("testnew2030@gmail.com");
        });

        await test.step('Click on the Edit icon.', async () => {
            await organizationPage.clickeditIcon();
        });

        await test.step('Edit the First Name and Last Name, and then Click on the tick icon to save changes.', async () => {
            const toasterEditMessage = await organizationPage.editfirstlastname("testnew2030@gmail.com", "Newtest", "Testing");
            expect(toasterEditMessage).toEqual("User updated");
        });
    });

    test('@regression: Verify Admin User Actions on Organization User Page', async () => {

        await test.step('Locate the new user in the role-based list view.', async () => {
            const searchData = await organizationPage.enterSearch("testnew2030@gmail.com");
            expect(searchData).toEqual("testnew2030@gmail.com");
        });

        await test.step('Click on the Delete icon next to a specific user.', async () => {
            await organizationPage.clickDeleteIcon();
        });

        await test.step('Click on the "Cancel" button in the deletion confirmation prompt.', async () => {
            await organizationPage.clickCancelButton();
        });

        await test.step('Observe the user interface after canceling the deletion', async () => {
            const searchData = await organizationPage.enterSearch("testnew2030@gmail.com");
            expect(searchData).toEqual("testnew2030@gmail.com");
        });
    });

    test('@regression: Verify Deleting User Details for Admin / Investor Users', async () => {

        await test.step('Locate the new user in the role-based list view.', async () => {
            const searchData = await organizationPage.enterSearch("testnew2030@gmail.com");
            expect(searchData).toEqual("testnew2030@gmail.com");
        });

        await test.step('Click on the Delete icon next to a specific user.', async () => {
            await organizationPage.clickDeleteIcon();
        });

        await test.step('Enter the email address and click on the "Submit" button.', async () => {
            await organizationPage.inputEmailAddress("testnew2030@gmail.com");
            await organizationPage.clickSubmitButton();
        });

        await test.step('Search for the deleted user again in the search field.', async () => {
            const invalidsearchData = await organizationPage.enterInvalidSearch("testnew2030@gmail.com");
            expect(invalidsearchData).toEqual(["No admins", "No investors"]);
        });

    });

});