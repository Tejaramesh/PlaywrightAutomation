import { Page, Locator } from "playwright";
import { LogoutPage } from "./LogoutPage";

export class MyAccountPage {

    private readonly page: Page;
    private readonly msgHeading: Locator;
    private readonly lnkLogout: Locator


    constructor(page: Page) {
        this.page = page;
        this.msgHeading = page.locator('h2:has-text("My Account")');
        this.lnkLogout = page.locator('a').filter({ hasText: 'Logout' }).last();
    }

    async isMyAccountDisplayed() {
        try {
            const isVisible = await this.msgHeading.isVisible();
            return isVisible;
        }
        catch (error) {
            console.log(`Error checking MyAccount page heading visibility ${error}`);
            return error;
        }
    }

    async clickLogout() {
        await this.lnkLogout.waitFor({ state: 'visible' });
        await this.lnkLogout.click();
        return new LogoutPage(this.page);
    }


}