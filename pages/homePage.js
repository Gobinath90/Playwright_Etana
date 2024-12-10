import BasePage from './basePage'
import { baseUrl } from '../config'
import fs from 'fs'

export const headerText = "//h1[text()='ETANATRUST']";
export const dashboardText = "//span[text()='DASHBOARD']";
export const investorLocator = "//div[text()='INVESTOR']";
export const adminLocator = "//div[text()='ADMIN']";



class HomePage extends BasePage {

	constructor(page) {
		super(page);
	}


	async isEtanaTrustVisible() {
		await this.page.waitForSelector(headerText, { state: 'visible' });
		return await this.page.isVisible(headerText);
	}

	async isDashboardVisible() {
		await this.page.waitForSelector(dashboardText, { state: 'visible' });
		return await this.page.isVisible(dashboardText);
	}

	async isInvestorVisible() {
		await this.page.waitForSelector(investorLocator, { state: 'visible' });
		return await this.page.isVisible(investorLocator);
	}
	async isAdminVisible() {
		await this.page.waitForSelector(adminLocator, { state: 'visible' });
		return await this.page.isVisible(adminLocator);
	}

	async checkCurrencyType() {
		await this.page.waitForSelector("//div[@class='w-3/5 max-w-sm text-sm md:text-lg']//div[@class='grid grid-cols-2']/span[@class='text-gray-300 text-left min-w-fit']", { state: 'visible' });
        const CurrencyType = await this.page.locator("//div[@class='w-3/5 max-w-sm text-sm md:text-lg']//div[@class='grid grid-cols-2']/span[@class='text-gray-300 text-left min-w-fit']").allTextContents();
        return CurrencyType;
    }

	async checkCurrencyValue() {
		await this.page.waitForSelector("(//span[contains(@class,'text-gray-300 text-left')]/following-sibling::span)", { state: 'visible' });
        const CurrencyValue = await this.page.locator("(//span[contains(@class,'text-gray-300 text-left')]/following-sibling::span)").allTextContents();
        return CurrencyValue;
    }
}

export default HomePage;