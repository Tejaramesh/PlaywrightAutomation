import { Page, Locator } from "@playwright/test";

export class HomePage {

    //locator
    private readonly page: Page;
    private readonly lnkMyAccount: Locator;
    private readonly lnkLogin: Locator;
    private readonly lnkRegister: Locator;
    private readonly txtSearchBox: Locator;
    private readonly btnSearch: Locator;
    //constructor

    constructor(page: Page) {
        this.page = page;
        this.lnkMyAccount = page.locator('span:has-text("My Account")');
        this.lnkRegister = page.getByText('Register');
        this.lnkLogin = page.getByText('Login');
        this.txtSearchBox = page.getByPlaceholder('Search');
        this.btnSearch = page.locator('i.fa.fa-search');
    }
    //action methods

    async isHomePageexists() {

        const title = await this.page.title();
        if (title) {
            return true;
        }
        else {
            return false;
        }

    }

    //click My Account link
    async clickMyAccount() {
        try {
            await this.lnkMyAccount.click();
        }
        catch (error) {
            console.error(`Error clicking My Account link: ${error}`);
            throw error;
        }

    }


    //click Login link

    async clickLogin() {
        try {
            await this.lnkLogin.click();
        }
        catch (error) {
            console.error(`Error clicking Login link: ${error}`);
            throw error;
        }
    }


    async clickRegister() {

        try {
            await this.lnkRegister.click();
        }
        catch (error) {
            console.error(`error clicking on register link ${error}`);
        }
    }

    //Enter Product Name in search box

    async enterProductName(pName: String) {
        try {
            await this.txtSearchBox.fill(pName as string);
        }
        catch (error) {
            console.error(`Error entering product name: ${error}`);
            throw error;
        }

    }

    //click search button
    async clickSearchbutton() {
        try {
            await this.btnSearch.click();
        }
        catch (error) {
            console.error(`Error clicking search button: ${error}`);
        }
    }





}