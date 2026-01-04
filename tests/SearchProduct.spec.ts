import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { SearchResultsPage } from "../pages/SearchResultsPage";
import { TestConfig } from "../test.config";

/**
 * steps
 * 1.Navigate to the application url
 * 2.enter  product and click search button
 * 3.verify the product is dislayed in search page
 */

//declare the reusable variables
let config: TestConfig;
let homePage: HomePage;
let searchresultsPage: SearchResultsPage;

//playwright hook - runs before each test
test.beforeEach(async ({ page }) => {
    //load configuration values like url and product name
    config = new TestConfig();
    await page.goto(config.appUrl);
    //Initialize page objects
    homePage = new HomePage(page);
    searchresultsPage = new SearchResultsPage(page);
});

//playwright hook runs after each test(optional cleanup)
test.afterEach(async ({ page }) => {
    await page.close();//close the browser tab after test
})

test('product search test @master @regression', async () => {
    //step2 : enter product and click search button
    await homePage.enterProductName(config.productName);
    await homePage.clickSearchbutton();

    //step 3: verify the product is displayed in search page
    const isSearchPageDisplayed = await searchresultsPage.isSearchResultsPageExists();
    expect(isSearchPageDisplayed).toBeTruthy();
    const isProductDisplayed= await searchresultsPage.isSearchProductExists(config.productName);
    expect(isProductDisplayed).toBeTruthy();



})
