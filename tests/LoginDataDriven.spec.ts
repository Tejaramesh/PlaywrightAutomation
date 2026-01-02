import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { MyAccountPage } from "../pages/MyAccountPage";
import { LoginPage } from "..//pages/LoginPage";
import { TestConfig } from "../test.config";
import { DataProvider } from "../utils/dataProvider"


const jsonfilePath = "testdata/logindata.json";
const jsonFileData = DataProvider.getTestDatafromJson(jsonfilePath);

for (const data of jsonFileData) {

    test(`Login with JSON Data: ${data.testName} @datadriven`, async ({ page }) => {
        const config = new TestConfig();
        await page.goto(config.appUrl);
        const homepage = new HomePage(page);
        await homepage.clickMyAccount();
        await homepage.clickLogin();
        const loginpage = new LoginPage(page);
        await loginpage.setEmail(data.email);
        await loginpage.setPassword(data.password);
        await loginpage.clickLogin();
        if (data.expected.toLowerCase() === 'success') {
            const myaccPage = new MyAccountPage(page);
            const isLoggedIn = await myaccPage.isMyAccountDisplayed();
            expect(isLoggedIn).toBeTruthy();
        }
        else {
            const errormsg = await loginpage.getErrorMessage();
            expect(errormsg).toContain('Warning: ')
        }

    })
}