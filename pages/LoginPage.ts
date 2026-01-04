import { Page, Locator } from "@playwright/test";


export class LoginPage {

    //variables
    private readonly page: Page;
    private readonly Email: Locator;
    private readonly Password: Locator;
    private readonly btnLogin: Locator;
    private readonly errorMessage: Locator;

    //constructor
    constructor(page: Page) {
        this.page = page;
        this.Email = page.getByLabel('E-Mail Address');
        this.Password = page.getByLabel('Password');
        this.btnLogin = page.locator('input.btn.btn-primary');
        this.errorMessage = page.locator('div.alert.alert-danger.alert-dismissible');
    }

    //action methods

    async setEmail(email: string) {
        await this.Email.fill(email)
    }
    async setPassword(password: string) {
        await this.Password.fill(password);
    }
    async clickLogin() {
        await this.btnLogin.click();
    }

    async getErrorMessage() {
        return await this.errorMessage.textContent() as string;
    }


    async Login(email: string, password: string) {
        await this.Email.fill(email);
        await this.Password.fill(password);
        await this.btnLogin.click();
    }
}