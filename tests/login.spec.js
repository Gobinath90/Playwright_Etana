import test from '../testFixtures/fixture'
import { expect } from '@playwright/test';
import fs from 'fs'
const testData = JSON.parse(fs.readFileSync(`./data/users.json`, `utf-8`))
import { baseUrl, title } from '../config'
import { LoginPage } from '../pages';

const AUTHOR_NAME = 'John Doe';

test.describe('Admin user login and logout flow verification', () => {
  let loginPage;

  // Log the author name at the beginning of the test suite
  test.beforeAll(async () => {
    console.log(`Test Suite Author: ${AUTHOR_NAME}`);
  });

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.openApp();
  });


  test('@regression: Verify visibility of logo, fields, and login button on the login page', async () => {
    await test.step('Open the app and check logo', async () => {
      await loginPage.verifyLoginPageLogo();
      expect(await loginPage.getTitle()).toBe(title);
      expect(await loginPage.getUrl()).toContain(baseUrl);
    });

    await test.step('Check login form fields visibility and button state', async () => {
      await loginPage.verifyLoginFormElements();
    });
  });

  test('@regression: Verify visibility of error message on Login screen when no credentials are entered', async () => {
    await test.step('Click on the Login button without entering credentials', async () => {
      await loginPage.clickLoginButton();
    });
    await test.step('Verify the error message is visible', async () => {
      await loginPage.errorMessage("Please enter your email and password.");
    });
  });

  test('@regression: Verify visibility of error message on Login screen when only email is entered', async () => {
    await test.step('Enter email credentials', async () => {
      await loginPage.enterEmail(testData.invalid.email);
      await loginPage.clickLoginButton();
    });
    await test.step('Verify the error message is visible', async () => {
      await loginPage.errorMessage("Please enter your password.");
    });
  });

  test('@regression: Verify visibility of error message on Login screen when only password is entered', async () => {
    await test.step('Enter password credentials', async () => {
      await loginPage.enterPassword(testData.invalid.password);
      await loginPage.clickLoginButton();
    });
    await test.step('Verify the error message is visible', async () => {
      await loginPage.errorMessage("Please enter your email.");
    });
  });

  test('@regression: Verify visibility of error message on Login screen when invalid credentials are entered', async () => {
    await test.step('Enter invalid email and password credentials', async () => {
      await loginPage.enterEmail(testData.admin.email);
      await loginPage.enterPassword(testData.invalid.password);
      await loginPage.clickLoginButton();
    });
    await test.step('Verify the error message is visible', async () => {
      await loginPage.errorMessage("Incorrect username or password.");
    });
  });

});