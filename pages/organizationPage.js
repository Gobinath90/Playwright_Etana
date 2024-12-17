import BasePage from './basePage'

export const adminInvestorarrowLocator = "(//span[@class='pr-2'])";
export const adminInvestorTextLocator = "//span[@class='pr-2']/following-sibling::span";
export const organisationTextLocator = "//span[text()='Organization']";
export const OrganisationSearchLocator = "//input[@placeholder='Search users']";
export const validSearchLocator = "//tr[contains(@class,'border-y border-dotted')]//mark[1]";
export const invalidSearchLocator= "(//div[contains(@class,'text-center py-5')])";
export const adminNewUserButtonLocator = "//button[contains(.,'Invite New User')]";
export const inviteUsertoOrganizationLocator = "//div[text()='Invite User to Organization']";
export const nameLocator = "//input[@placeholder='Name']";
export const familynameLocator = "//input[@placeholder='Family Name']";
export const emailaddressLocator = "//input[@placeholder='new.user@example.com']";
export const accessroleadmin ="//button[contains(.,'Admin')]";
export const accessrolemanager ="//button[contains(.,'Manager')]";
export const cancelButton = "//button[text()='Cancel']";
export const submitButton = "//button[text()='Submit']";
export const newadminnameLocator = "//span[normalize-space(text())='peru@etana.com']";
export const toastermessageCheck = "//div[contains(text(), 'Invitation email sent to peru@etana.com')]"
export const toasterEditCheck = "//div[contains(text(), 'User updated')]"
export const adminPreviousIconLocator = "//span[contains(@class,'flex justify-between')]//div)[1]";
export const adminNextIconLocator = "(//div[contains(@class,'flex text-white')])[1]";
export const investorPreviousIconLocator = "(//span[contains(@class,'flex justify-between')]//div)[3]";
export const investorNextIconLocator = "(//span[contains(@class,'flex justify-between')]//div)[4]";
export const getTableRowCountLocator = "(//table[contains(@class,'w-full whitespace-nowrap')]//tbody//tr)";
export const adminsarrowLocator = "(//span[@class='pr-2'])[1]";
export const investorarrowLocator = "(//span[@class='pr-2'])[2]";
export const editIconLocator = "(//tr[contains(@class,'border-y border-dotted')]//button)[1]";
export const aftereditIconLocator = "(//tr[contains(@class,'border-y border-dotted')]//button)[2]";
export const DeleteIconLocator = "(//tr[contains(@class,'border-y border-dotted')]//button)[3]";
export const EnterEmailAddress = "//input[contains(@class,'text-right flex')]"

class OrganizationPage extends BasePage {

    constructor(page) {
        super(page);
    }

    async verifyOrganizationTitle() {
        const OrganizationTitle = await this.getTextContent(organisationTextLocator, "Organization Title")
        return OrganizationTitle;
    }

    async clickdownArrowButton() {
         await this.clickAllElements(adminInvestorarrowLocator)
         await this.page.waitForSelector(adminInvestorTextLocator, { state: 'visible' });
         const admininvestorNames = await this.getAllElementsFromList(adminInvestorTextLocator);
         return admininvestorNames;
    }

    async enterSearch(searchvalue){
        await this.waitAndFill(OrganisationSearchLocator, searchvalue, 'searchText');
        const validSearch = await this.getTextContent(validSearchLocator, "validSearch");
        return validSearch;
    }

    async enterInvalidSearch(text){
        await this.waitAndFill(OrganisationSearchLocator, text, 'InvalidsearchText');
        const invalidSearch = await this.getAllElementsFromList(invalidSearchLocator);
        console.log(invalidSearch);
        return invalidSearch;
    }

    async getAdminInviteNewUser(){
        await this.isElementVisible(adminNewUserButtonLocator, "Invite New User Button is not Visible")
        const inviteNewUserButton = await this.getTextContent(adminNewUserButtonLocator, "InviteNewwUserButton");
        return inviteNewUserButton;
    }

    async clickAdminInviteNewUser(){
        await this.waitAndClick(adminNewUserButtonLocator, "clickInviteNewUserButton");
        const inviteUserData = await this.getTextContent(inviteUsertoOrganizationLocator ,"Invite User to Organization Locator");
        return inviteUserData;
    }

    async fillAndInviteUserForm(name, familyName, email){
        await this.waitAndFill(nameLocator, name, "EnterName Data");
        await this.waitAndFill(familynameLocator, familyName, "EnterFamilyName Data");
        await this.waitAndFill(emailaddressLocator, email, "EnterEmailAddress Data");
        await this.waitAndClick(accessroleadmin, "click Admin role");
    }

    async clickCancelButton(){
        await this.waitAndClick(cancelButton, "click Cancel Button");
    }

    async clickSubmitButton(){
        await this.waitAndClick(submitButton, "click Submit Button");
    }

    async checkAdminToasterMessage(text){
        const admintoasterdata  = await this.getTextContent(`//div[contains(text(), 'Invitation email sent to ${text}')]`, 'check toaster Message')
        return admintoasterdata;
    }

    async clickeditIcon(){
        await this.isElementVisible(editIconLocator, "Edit Icon is not visible")
        await this.waitAndClick(editIconLocator, "click Edit Icon");
    }

    async clickDeleteIcon(){
        await this.isElementVisible(DeleteIconLocator, "Delete is not visible")
        await this.waitAndClick(DeleteIconLocator, "click Delete Icon");
    }

    async inputEmailAddress(text){
        await this.waitAndFill(EnterEmailAddress, text, "Enter Email Address");
    }

    async editfirstlastname(emailaddress,firstname,lastname){
        const firstNameField = this.page.locator(`//tr[td/span/mark[contains(text(), '${emailaddress}')]]/td[2]//input`);
        const lastNameField = this.page.locator(`//tr[td/span/mark[contains(text(), '${emailaddress}')]]/td[3]//input`);
        await firstNameField.fill(firstname); 
        await lastNameField.fill(lastname);
        await this.waitAndClick(aftereditIconLocator, "click After Edit Icon");
        const toasteditMessage = await this.getTextContent(toasterEditCheck, 'Check edit toaster Message');
        return toasteditMessage;
    }





    // async verifyAccountTitle() {
    //     const accountTitle = await this.getTextContent(accountTitleLocator, "Account Title");
    //     return accountTitle;
    // }

    // async getAccountDetails() {
    //     await this.getTextContent(subLocator, 'Sub');
    //     await this.getTextContent(firstNameLocator, 'First Name');
    //     await this.getTextContent(lastNameLocator, 'Last Name');
    //     await this.getTextContent(emailLocator, 'Email');
    // }

    // async verifyWebhookDetails() {
    //     await this.hoverAndGetTextContent(webhookUrlLocator, webhookUrlTextLocator, 'Webhook URL');
    //     await this.hoverAndGetTextContent(apiKeyLocator, apiKeyTextLocator, 'Private Key');
    //     await this.hoverAndGetTextContent(webhookKeyLocator, webhookKeyTextLocator, 'API Key');

    // }
}

export default OrganizationPage;