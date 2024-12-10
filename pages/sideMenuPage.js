import BasePage from './basePage'
import { baseUrl } from '../config'
import fs from 'fs'

export const sideMenuNames = "//span[contains(@class,'ml-5 transition-all')]";
export const sideMenuLogo = "//div[contains(@class,'flex overflow-hidden')]//img[1]";


class sideMenuPage extends BasePage {

	constructor(page) {
		super(page);
	}

    async sideMenu(menuItemName) {
		const menuItems = {
            Home: "//button[contains(.,'Home')]",
            Withdrawals: "//button[contains(.,'Withdrawals')]",
            Deposits: "//button[contains(.,'Deposits')]",
            Wallets: "//button[contains(.,'Wallets')]",
            Organization: "//button[contains(.,'Organization')]",
            Account: "//button[contains(.,'Account')]",
            Logout: "//button[contains(.,'Logout')]",
        };
        const menuItem = menuItems[menuItemName];
        if (!menuItem) {
            throw new Error(`Menu item "${menuItemName}" does not exist.`);
        }
        await this.waitAndClick(menuItem, `${menuItemName} Menu Item`);
	}

    async sideMenuNames() {
        await this.page.waitForSelector(sideMenuNames, { state: 'visible' });
        const menuTexts = await this.page.locator(sideMenuNames).allTextContents();
        return menuTexts;
    }

    async SideMenuLogo() {
		await this.page.waitForSelector(sideMenuLogo, { state: 'visible' });
		const logo = await this.page.$(sideMenuLogo);
		if (logo) {
			console.log("Logo is visible");
		} else {
			throw new Error('Logo not visible');
		}
	}


}

export default sideMenuPage;