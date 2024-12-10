import BasePage from './basePage';
//import { sidelogoutButton, logoutButton } from '../pageobjects/logoutPage';

export const sidelogoutButton = "//span[text()='Logout']";
export const logoutButton = "//button[text()='Logout']";



class LogoutPage extends BasePage {

	constructor(page) {
		super(page);
	}

	async logout() {
		await this.waitAndClick(logoutButton, "Logout Button")
	}

}

export default LogoutPage;