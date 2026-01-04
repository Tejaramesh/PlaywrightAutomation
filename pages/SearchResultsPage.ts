import { Page, Locator } from "playwright";

export class SearchResultsPage {
    //variable dec
    private readonly page: Page
    private readonly searchPageHeader: Locator;
    private readonly searchProducts: Locator;
    //constructor
    constructor(page: Page) {
        this.page = page;
        this.searchPageHeader = page.locator('#content h1');
        this.searchProducts = page.locator('h4 a');
    }

    //action methods

    //verfiy if the search results page exists by checking the header text

    async isSearchResultsPageExists(): Promise<boolean> {

        try {
            const headerText = await this.searchPageHeader.textContent();
            return headerText?.includes('Search -') ?? false;
        }
        catch (error) {
            console.log(`getting error on checking searchpage header : ${error}`);
            return false;
        }
    }

    async isSearchProductExists(productName: string) {
        try {
            const products = await this.searchProducts.all();
            for (let productlocator of products) {
                const product = (await productlocator.innerText());
                if (product === productName) {
                    return true;
                }
            }
        }
        catch (error) {
            console.log(`Error checking product existence: ${error}`);
        }
        return false;

    }

    async selectProduct(productName: string) {
        try {
            const products = await this.searchProducts.all();
            for (let productlocator of products) {
                const product = (await productlocator.innerText());
                if (product === productName) {
                    await productlocator.click();
                    break;
                }
            }
        }

        catch (error) {
            console.log(`Error selecting the product ${error}`);
        }
        return null;

    }
}
