import { Page, Locator } from "playwright";
import { HomePage } from "./HomePage";

export class LogoutPage {

    private readonly page: Page;
    private readonly btnContinue: Locator
    private readonly continuebtnisDisplayed: Locator



    constructor(page: Page) {
        this.page = page;
        this.btnContinue = page.getByRole('link', { name: 'Continue' });
        this.continuebtnisDisplayed = page.getByRole('link', { name: 'Continue' });
    }

    async continueButtonClick() {
        await this.btnContinue.click();
        return new HomePage(this.page);
    }

    async isButtonDisplayed() {
        try {
             return await this.continuebtnisDisplayed.isVisible();
             return new HomePage(this.page);
        }
        catch (error) {
            console.log(`Error message is displayed while checking continue button is visible ${error}`);
        }
    }


}