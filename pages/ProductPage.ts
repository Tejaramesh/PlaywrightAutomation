import { Page, Locator } from "playwright";

export class ProductPage {

    private readonly page: Page;
    private readonly txtQuantity: Locator;
    private readonly btnCart: Locator;
    private readonly cnfmMessage: Locator;
    private readonly btnAddItems: Locator;
    private readonly lnkViewCart: Locator

    constructor(page: Page) {
        this.page = page;
        this.txtQuantity = page.getByLabel('Qty');
        this.btnCart = page.locator('button:has-text("Add to Cart")');
        this.cnfmMessage = page.locator('div.alert.alert-success.alert-dismissible:visible');
        this.btnAddItems = page.locator('button.btn.btn-inverse.btn-block.btn-lg.dropdown-toggle');
        this.lnkViewCart = page.getByText('View Cart');
    }
    async setQuantity(qty: string): Promise<void> {
        await this.txtQuantity.fill('');
        await this.txtQuantity.fill(qty);
    }
    async addToCart(): Promise<void> {
        await this.btnCart.click();
    }
    async isConfirmMessageDisplayed(): Promise<boolean> {
        try {
            if (this.cnfmMessage) {
                return true;
            }
        }
        catch (error) {
            console.log(`confirmation message not found: ${error}`)
        }
        return false;
    }

    async clickItemsRedirctToCart(): Promise<void> {
        await this.btnAddItems.click();
    }
    async clickViewCart() {
        await this.lnkViewCart.click();
    }
}