import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { MyAccountPage } from "../pages/MyAccountPage";
import { LogoutPage } from "../pages/LogoutPage";
import { TestConfig } from "../test.config";

//assign variables for each page
let config: TestConfig;
let homepage: HomePage;
let loginpage: LoginPage;
let myacctpage: MyAccountPage;
let logoutpage: LogoutPage;

test.beforeEach('common actions', async ({ page }) => {
    //launch browser
    config = new TestConfig();
    await page.goto(config.appUrl);
    //create objects for each page
    homepage = new HomePage(page);
    loginpage = new LoginPage(page);
    myacctpage = new MyAccountPage(page);
    // logoutpage = new LogoutPage(page);

});


test.afterEach('common actions after each test', async ({ page }) => {
    await page.close();
})

test('user logout test @master @regression', async () => {
    //home page actions
    const ishomepageDisplayed = await homepage.isHomePageexists();
    expect(ishomepageDisplayed).toBeTruthy();
    await homepage.clickMyAccount();
    await homepage.clickLogin();

    //login page actions
    await loginpage.setEmail(config.email);
    await loginpage.setPassword(config.password);
    await loginpage.clickLogin();

    //verify Myaccount page and logout button is displayed in myaccount page
    const isMyacctDisplayed = await myacctpage.isMyAccountDisplayed();
    expect(isMyacctDisplayed).toBeTruthy();
    logoutpage = await myacctpage.clickLogout();

    //verfiy logout page and able to click on continue button
    const islogoutDisplayed = await logoutpage.isButtonDisplayed();
    expect(islogoutDisplayed).toBeTruthy();
    await logoutpage.continueButtonClick();
    expect(await homepage.isHomePageexists()).toBeTruthy()

})