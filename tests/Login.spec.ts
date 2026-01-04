import { test, expect } from "@playwright/test";
import { TestConfig } from "../test.config";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { MyAccountPage } from "../pages/MyAccountPage";

let homePage: HomePage;
let loginPage: LoginPage;
let config: TestConfig;
let myaccountPage: MyAccountPage;

//this hook runs before each test
test.beforeEach(async ({ page }) => {
    //launch url
    config = new TestConfig();
    await page.goto(config.appUrl);

    //Initialze pageobjects
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    myaccountPage = new MyAccountPage(page);
})

//this hook will run after each test
test.afterEach(async ({ page }) => {
    //close browser
    //await page.close();
})


test('Login with valid credentials @master @sanity @regression', async () => {
    //in home page click myaccount and login links
    await homePage.clickMyAccount();
    await homePage.clickLogin();
    //in login page enter email and password and click login button
    await loginPage.setEmail(config.email);
    await loginPage.setPassword(config.password);
    await loginPage.clickLogin();

    //check whether logout button and My account text is visible
    const isLoggedIn = await myaccountPage.isMyAccountDisplayed();
    expect(isLoggedIn).toBeTruthy();
    await myaccountPage.clickLogout();


})

