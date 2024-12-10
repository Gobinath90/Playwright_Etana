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
export const saveChanges = "//button[contains(.,'Save Changes')]";
export const cancelChanges = "//button[contains(.,'Cancel')]";
export const editInfoButton = "//p[text()='Edit Info']";
export const firstNamefield = "//input[@placeholder='Enter your first name']";
export const lastNamefield = "//input[@placeholder='Enter your last name']";
export const verifiedText = "//span[text()='Verified']";
export const webhookKeyShow = "(//span[@class='flex space-x-1']//div)[2]";
export const webhookKeyValue = "(//div[contains(@class,'flex text-xs')]//span)[1]";
export const apiKeyShow = "(//span[@class='flex space-x-1']//div)[4]";
export const apiKeyValue = "(//span[@class='md:min-w-64'])[2]";
export const apikeyCopyIcon = "(//span[@class='flex space-x-1']//div)[3]";
export const statusMessage = "//div[@role='status']";
export const webhookkeyCopyIcon = "(//span[@class='flex space-x-1']//div)[1]";


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

    async checkAndEditInfo(firstName, lastName) {
        const isSaveVisible = await this.isElementVisible(saveChanges, "Save Changes");
        const isCancelVisible = await this.isElementVisible(cancelChanges, "Cancel button");
    
        if (isSaveVisible && isCancelVisible) {
            console.log("Save Changes and Cancel buttons are visible, proceeding with edit.");
        } else {
            console.log("Save Changes and/or Cancel buttons are not visible, skipping edit.");
        }
        return isSaveVisible && isCancelVisible;
    }

    async clickEditInfo() {
        await this.page.click(editInfo, "Edit Info");
    }

    async editInfo(firstName, lastName){
        await this.enterFirstNameField(firstName);
        await this.enterLastNameField(lastName);
    }

    async enterFirstNameField(firstName) {
        await this.waitAndFill(firstNamefield, firstName, "First Name");
    }

    async enterLastNameField(lastName) {
        await this.waitAndFill(lastNamefield, lastName, "Last Name");
    }

    async clickSaveChanges() {
        await this.page.click(saveChanges, "Save Changes");
    }
    async clickCancelChanges() {
        await this.page.click(cancelChanges, "Cancel");
    }

    async checkVerifiedVisible() {
        const isVerifiedVisible = await this.isElementVisible(verifiedText, "Verified status");
    
        if (isVerifiedVisible) {
            console.log("Verified status is visible. Proceeding with further actions.");
        } else {
            console.log("Verified status is not visible. Skipping further actions.");
        }
        return isVerifiedVisible;
    }

    async clickWebhookKey(){
        await this.waitAndClick(webhookKeyShow, "Webhook Key Show");
        await this.getTextContent(webhookKeyValue, "Webhook Key Value");
        await this.waitAndClick(webhookKeyShow, "Webhook Key Hide");

    }

    async clickApiKey(){
        await this.waitAndClick(webhookKeyShow, "API Key Show");
        await this.getTextContent(apiKeyValue, "API Key Value");
        await this.waitAndClick(webhookKeyShow, "API Key Hide");

    }

    async copyApiKey() {
        await this.waitAndClick(apikeyCopyIcon, "API key Copy Icon");
        return await this.page.locator(statusMessage).textContent();
    }

    async copyWebhookKey() {
        await this.waitAndClick(webhookkeyCopyIcon, "Webhook key Copy Icon");
        return await this.page.locator(statusMessage).textContent();
    }







}

export default AccountPage;