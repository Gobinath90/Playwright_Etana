import BasePage from './basePage'
import { baseUrl } from '../config'
import fs from 'fs'
import { loginPageLogo, email, password, loginButton } from '../pageobjects/loginPage'

class LoginPage extends BasePage {

	constructor(page) {
		super(page);
	}

	async openApp() {
		await this.page.goto(baseUrl);
		return await this.page.waitForLoadState('domcontentloaded');
	}

	async verifyLoginPageLogo() {
		await this.page.waitForSelector(loginPageLogo, { state: 'visible' });
		const logo = await this.page.$(loginPageLogo);
		if (logo) {
			console.log("Logo is visible");
		} else {
			throw new Error('Logo not visible');
		}
	}

	async isEmailFieldVisible() {
		await this.page.waitForSelector(email, { state: 'visible' });
		return await this.page.isVisible(email);
	}

	async isPasswordFieldVisible() {
		await this.page.waitForSelector(password, { state: 'visible' });
		return await this.page.isVisible(password);
	}

	async isLoginButtonEnabled() {
		await this.page.waitForSelector(loginButton, { state: 'attached' });
		return await this.page.isEnabled(loginButton);
	}

	async enterEmail(text) {
		await this.waitAndFill(email, text, "email input")
	}

	async enterPassword(text) {
		await this.waitAndFill(password, text, "password input")
	}

	async clickLoginButton() {
		await this.waitAndClick(loginButton, "login button")
	}

	async errorMessage(message) {
		const errorLocator = await this.page.locator(".pb-4");
		switch (message) {
			case 'Please enter your email and password.':
			case 'Please enter your email.':
			case 'Please enter your password.':
			case 'Incorrect username or password.':
				await errorLocator.textContent(message);
				break;
			default:
				throw new Error(`Unknown error message: ${message}`);
		}
	}

	async loginCredentials(email, password) {
		await this.enterEmail(email);
		await this.enterPassword(password);
		await this.clickLoginButton();
	}

	async verifyLoginFormElements() {
		await this.isEmailFieldVisible();
		await this.isPasswordFieldVisible()
		await this.isLoginButtonEnabled()
	}

}

export default LoginPage;