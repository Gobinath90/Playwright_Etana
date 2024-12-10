import BasePage from './basePage'

export const accountTitleLocator = "//h1[text()='My Account']";
export const subLocator = "//div[text()='Sub']/following-sibling::div";
export const firstNameLocator = "//div[text()='First Name']/following-sibling::div";
export const lastNameLocator = "//div[text()='Last Name']/following-sibling::div";
export const emailLocator = "//div[text()='Email']/following-sibling::span";
export const webhookUrlLocator = "//span[text()='Webhook URL']/following-sibling::div";
export const webhookUrlTextLocator = "//div[text()='Notifications about transactions can be sent as HTTP requests to a given URL.']";
export const webhookKeyLocator = "//span[text()='Webhook Key']/following-sibling::div";
export const webhookKeyTextLocator = "//div[text()='Use this 32-byte key to decode webhooks with AES.']";
export const apiKeyLocator = "//span[text()='API Key']/following-sibling::div";
export const apiKeyTextLocator = "//span[text()='To use the Etana Digital API, include this key as a header in each HTTP request:']";


class AccountPage extends BasePage {
    constructor(page) {
        super(page);
    }
    
    async verifyAccountTitle() {
        const accountTitle = await this.getTextContent(accountTitleLocator, "Account Title");
        return accountTitle;
    }

    async getAccountDetails() {
        await this.getTextContent(subLocator, 'Sub');
        await this.getTextContent(firstNameLocator, 'First Name');
        await this.getTextContent(lastNameLocator, 'Last Name');
        await this.getTextContent(emailLocator, 'Email');
    }

    async verifyWebhookDetails() {
        await this.hoverAndGetTextContent(webhookUrlLocator, webhookUrlTextLocator, 'Webhook URL');
        await this.hoverAndGetTextContent(apiKeyLocator, apiKeyTextLocator, 'Private Key');
        await this.hoverAndGetTextContent(webhookKeyLocator, webhookKeyTextLocator, 'API Key');

    }
}

export default AccountPage;