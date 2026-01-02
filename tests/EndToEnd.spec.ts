import { test, expect, Page } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { LogoutPage } from "../pages/LogoutPage";
import { MyAccountPage } from "../pages/MyAccountPage";
import { ProductPage } from "../pages/ProductPage";
import { RegistrationPage } from "../pages/RegistrationPage";
import { SearchResultsPage } from "../pages/SearchResultsPage";
import { TestConfig } from "../test.config";
import { RandomDataGenerator } from "../utils/RandomDataGenerator";

let page: Page;
let config: TestConfig;
let homePage: HomePage;
let loginPage: LoginPage;
let regPage: RegistrationPage;
let myacctPage: MyAccountPage;
let productPage: ProductPage;
let searchresultPage: SearchResultsPage;
let logoutPage: LogoutPage;

test('End to End Opencart application test @endToend', async ({ page }) => {
    test.slow();
    config = new TestConfig();
    await page.goto(config.appUrl);
    const email = await performResistration(page);
    await performLogout(page);
    await performLogin(page, email);
    await performSearchProduct(page);
    await performAddToCart(page);
})


async function performResistration(page: Page) {

    //click my account and register  link in home page
    homePage = new HomePage(page);
    const homePageExistsCheck = await homePage.isHomePageexists();
    expect(homePageExistsCheck).toBeTruthy();
    homePage.clickMyAccount();
    homePage.clickRegister();

    //fill registration page details
    regPage = new RegistrationPage(page);
    await regPage.setFirstName(RandomDataGenerator.getFirstName());
    await regPage.setLastName(RandomDataGenerator.getLastName());
    const email = RandomDataGenerator.getEmail();
    await regPage.setEmail(email);
    await regPage.setTelephone(RandomDataGenerator.getPhoneNumber());
    await regPage.setPassword('test123');
    await regPage.setPasswordConfirm('test123');
    await regPage.checkPrivacyPolicy();
    await regPage.clickContinue();
    const confirmMessage = await regPage.getConfirmationMessage();
    expect(confirmMessage).toEqual('Your Account Has Been Created!');
    return email;
}

async function performLogout(page: Page) {
    myacctPage = new MyAccountPage(page);
    logoutPage = new LogoutPage(page);
    homePage = new HomePage(page);

    logoutPage = await myacctPage.clickLogout();

    //verfiy logout page and able to click on continue button
    const islogoutDisplayed = await logoutPage.isButtonDisplayed();
    expect(islogoutDisplayed).toBeTruthy();
    await logoutPage.continueButtonClick();
    expect(await homePage.isHomePageexists()).toBeTruthy()

}

async function performLogin(page: Page, email: string) {
    loginPage = new LoginPage(page);
    myacctPage = new MyAccountPage(page);
    //in home page click myaccount and login links
    await homePage.clickMyAccount();
    await homePage.clickLogin();
    //in login page enter email and password and click login button
    await loginPage.setEmail(email);
    await loginPage.setPassword('test123');
    await loginPage.clickLogin();

    //check whether logout button and My account text is visible
    const isLoggedIn = await myacctPage.isMyAccountDisplayed();
    expect(isLoggedIn).toBeTruthy();
}

async function performSearchProduct(page: Page) {
    searchresultPage = new SearchResultsPage(page);
    homePage = new HomePage(page);
    //step2 : enter product and click search button
    await homePage.enterProductName(config.productName);
    await homePage.clickSearchbutton();

    //step 3: verify the product is displayed in search page
    const isSearchPageDisplayed = await searchresultPage.isSearchResultsPageExists();
    expect(isSearchPageDisplayed).toBeTruthy();
    const isProductDisplayed = await searchresultPage.isSearchProductExists(config.productName);
    expect(isProductDisplayed).toBeTruthy();
}

async function performAddToCart(page: Page) {
    searchresultPage = new SearchResultsPage(page);
    productPage = new ProductPage(page);
    //click on product
    await searchresultPage.selectProduct(config.productName);
    // //* 4.add quantity from config.json file
    await productPage.setQuantity(config.productQuantity);
    // //5.click add to cart button
    await productPage.addToCart();
    // //6.verify success message
    expect(await productPage.isConfirmMessageDisplayed()).toBeTruthy();
    await productPage.clickItemsRedirctToCart();
    await productPage.clickViewCart();
}