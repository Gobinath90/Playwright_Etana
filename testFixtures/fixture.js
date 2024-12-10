import { test as fixture } from '@playwright/test'
import LoginPage from '../pages/loginPage'
import LogoutPage from '../pages/logoutPage'
import HomePage from '../pages/homePage'
import SideMenuPage from '../pages/sideMenuPage'

const test = fixture.extend({
	loginPage: async ({ page }, use) => {
		await use(new LoginPage(page))
	},
	logoutPage: async ({ page }, use) => {
		await use(new LogoutPage(page))
	},

	homePage: async ({ page }, use) => {
		await use(new HomePage(page))
	},

	sideMenuPage: async ({ page }, use) => {
		await use(new SideMenuPage(page))
	}
})
export default test
