import { expect } from '@playwright/test'

class BasePage {
	constructor(page) {
		this.page = page
	}

	async open(url) {
		console.log(`Opening URL: ${url}`)
		return await this.page.goto(url)
	}

	async getTitle() {
		const title = await this.page.title()
		console.log(`Page title: ${title}`)
		return title
	}

	async pause() {
		console.log('Pausing test...')
		return await this.page.pause()
	}

	async getUrl() {
		const currentUrl = this.page.url()
		console.log(`Current URL: ${currentUrl}`)
		return currentUrl
	}

	async wait(timeout = 10000) {
		console.log(`Waiting for ${timeout}ms...`)
		return await this.page.waitForTimeout(timeout)
	}

	async waitForPageLoad() {
		console.log('Waiting for page load...')
		return await this.page.waitForLoadState('domcontentloaded')
	}

	async waitAndClick(locator, label) {
		const element = this.page.locator(locator);
		await this.waitForElementToBeVisible(element);
        console.log(`Clicking on ${label}`);
        await element.click();
	}

	async waitAndHardClick(selector) {
		console.log(`Hard clicking on ${selector}`)
		return await this.page.$eval(selector, element => element.click())
	}

	async waitAndFill(selector, text, elementName) {
		console.log(`Filling ${elementName} with ${text}`)
		return await this.page.fill(selector, text)
	}

	async keyPress(selector, key) {
		console.log(`Pressing ${key} on ${selector}`)
		return await this.page.press(selector, key)
	}

	async takeScreenShot() {
		console.log('Taking screenshot...')
		const screenshot = await this.page.screenshot()
		return expect(screenshot).toMatchSnapshot('MyScreenShot.png')
	}

	async verifyElementText(selector, text, elementName) {
		const textValue = await this.page.textContent(selector)
		console.log(`Verifying text of ${elementName}: expected ${text}, got ${textValue.trim()}`)
		return expect(textValue.trim()).toBe(text)
	}

	async verifyElementContainsText(selector, text, elementName) {
		const element = await this.page.locator(selector)
		console.log(`Checking if ${elementName} contains text: ${text}`)
		return await expect(element).toContainText(text)
	}

	async verifyJSElementValue(selector, expectedValue) {
		const actualValue = await this.page.$eval(selector, element => element.value)
		console.log(`Verifying element ${selector} value: expected '${expectedValue}', got '${actualValue.trim()}'`)
		return expect(actualValue.trim()).toBe(expectedValue)
	}

	async selectValueFromDropdown(selector, text) {
		console.log(`Selecting value ${text} from dropdown ${selector}`)
		const dropdown = await this.page.locator(selector)
		return await dropdown.selectOption({ value: text })
	}

	async verifyElementAttribute(selector, attribute, value) {
		const attrValue = await this.page.getAttribute(selector, attribute)
		console.log(`Verifying ${attribute} of ${selector}: expected ${value}, got ${attrValue.trim()}`)
		return expect(attrValue.trim()).toBe(value)
	}

	async getAllElementsFromList(selector) {
		const rows = await this.page.locator(selector);
		const allItems = await rows.allTextContents();
		console.log(`All elements: ${allItems}`);
		return allItems;
	}


	async getFirstElementFromTheList(selector) {
		const rows = await this.page.locator(selector)
		const firstItem = await rows.nth(0).textContent()
		console.log(`First element: ${firstItem}`)
		return firstItem
	}

	async getLastElementFromTheList(selector) {
		const rows = await this.page.locator(selector)
		const count = await rows.count()
		const lastItem = await rows.nth(count - 1).textContent()
		console.log(`Last element: ${lastItem}`)
		return lastItem
	}

	async clickAllElements(selector) {
		console.log(`Clicking all elements in ${selector}`)
		const rows = await this.page.locator(selector)
		const count = await rows.count()
		for (let i = 0; i < count; ++i) {
			await rows.nth(i).click()
			console.log(`Clicked element ${i + 1}`)
		}
	}

	async clickAllLinksInNewTabs(selector) {
		const rows = this.page.locator(selector)
		const count = await rows.count()
		console.log(`Clicking ${count} links in new tabs...`)
		for (let i = 0; i < count; i++) {
			console.log(`Opening link ${i + 1} in a new tab`)
			await rows.nth(i).click({ modifiers: ['Control', 'Shift'] })
		}
	}

	async isElementVisible(selector, errorMessage) {
		const element = this.page.locator(selector)
		try {
			const isVisible = await element.isVisible()
			console.log(`Element ${selector} is visible`)
			return isVisible
		} catch (error) {
			console.log(`Element ${selector} is NOT visible`)
			throw new Error(`${errorMessage}`)
		}
	}
	async isElementNotVisible(selector) {
		const element = this.page.locator(selector)
		try {
			const isHidden = await element.isHidden()
			console.log(`Element ${selector} is ${isHidden ? 'hidden' : 'NOT hidden'}`)
			return isHidden
		} catch (error) {
			console.log(`Element ${selector} is NOT visible`)
			throw new Error(`${errorMessage}`)
		}

		async function isElementEnabled(selector, errorMessage) {
			const element = this.page.locator(selector)
			const isEnabled = await element.isEnabled()
			if (!isEnabled) {
				console.log(`Element ${selector} is disabled`)
				throw new Error(errorMessage)
			}
			console.log(`Element ${selector} is enabled`)
			return isEnabled
		}

		async function isElementChecked(selector, errorMessage) {
			const element = this.page.locator(selector)
			const isChecked = await element.isChecked()
			if (!isChecked) {
				console.log(`Element ${selector} is not checked`)
				throw new Error(errorMessage)
			}
			console.log(`Element ${selector} is checked`)
			return isChecked
		}
	}

	async waitForElementToBeVisible(element) {
		//console.log(`Waiting for element to be visible: ${element}`);
		await element.waitFor({ state: 'visible' });
	}

	async getTextContent(locator, label) {
        const element = this.page.locator(locator);
        const text = await element.textContent();
		console.log(`Text of ${label}:`, text.trim());
        return text.trim();
    }

	async waitAndHover(locator) {
        const element = this.page.locator(locator);
        await element.waitFor({ state: 'visible' });
        await element.hover();
    }

	async hoverAndGetTextContent(locator, textLocator, text) {
		const element = this.page.locator(locator);
		await this.waitForElementToBeVisible(element);
		await element.hover();
		return await this.getTextContent(textLocator);
    }

	async decipherPassword(){
		const key ='SmartWork@1234';
		// ENCRYPT
		const cipher = CryptoJS.AES.encrypt('SmartWork@1234', key);
		console.log(cipher.toString());

		// DECRYPT
		const bytes = CryptoJS.AES.decrypt(cipher.toString(), key).toString(CryptoJS.enc.Utf8);
		console.log(originalText);
	}





}
export default BasePage

