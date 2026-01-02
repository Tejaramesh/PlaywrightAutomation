import { test, expect } from "@playwright/test";
import { TestConfig } from "../test.config";
import { HomePage } from "../pages/HomePage";
import { RegistrationPage } from "../pages/RegistrationPage";
import { RandomDataGenerator } from "../utils/RandomDataGenerator";


let homePage: HomePage;
let registrationPage: RegistrationPage;
let config:TestConfig;



test.beforeEach('common actions', async ({ page }) => {
    //launch url
     config = new TestConfig();
    await page.goto(config.appUrl);
    homePage = new HomePage(page);
    registrationPage = new RegistrationPage(page);

})

test.afterEach('common actions', async ({ page }) => {
    await page.close();
})

test('user registration test @master @sanity @regression', async () => {


    //click my account and register  link in home page
    const homePageExistsCheck = await homePage.isHomePageexists();
    expect(homePageExistsCheck).toBeTruthy();
    homePage.clickMyAccount();
    homePage.clickRegister();

    //fill registration page details
    await registrationPage.setFirstName(RandomDataGenerator.getFirstName());
    await registrationPage.setLastName(RandomDataGenerator.getLastName());
    await registrationPage.setEmail(RandomDataGenerator.getEmail());
    await registrationPage.setTelephone(RandomDataGenerator.getPhoneNumber());

    const password = RandomDataGenerator.getPassword();
    await registrationPage.setPassword(password);
    await registrationPage.setPasswordConfirm(password);
    await registrationPage.checkPrivacyPolicy();
    await registrationPage.clickContinue();
    const confirmMessage = await registrationPage.getConfirmationMessage();
    expect(confirmMessage).toEqual('Your Account Has Been Created!');






})