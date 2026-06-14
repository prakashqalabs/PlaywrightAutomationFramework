import { Page, Locator } from '@playwright/test';
import { Product } from '../models/ui/product';

export class CartPage {
    private readonly cartItems: Locator;
    private readonly itemName = '.inventory_item_name';
    private readonly itemPrice = '.inventory_item_price';
    private readonly removeButton = 'button';
    private readonly checkoutButton = '[data-test="checkout"]';
    private readonly firstName: Locator;
    private readonly lastName: Locator;
    private readonly postalCode: Locator;
    private readonly continueButton: Locator;
    private readonly totalLabel: Locator;
    private readonly finishCheckoutButton: Locator;


    constructor(private page: Page) {
        this.cartItems = this.page.locator('.cart_list .cart_item');
        this.firstName = this.page.locator('#first-name');
        this.lastName = this.page.locator('#last-name');
        this.postalCode = this.page.locator('#postal-code');
        this.continueButton = this.page.locator('[data-test="continue"]');
        this.totalLabel = this.page.locator('.summary_total_label');
        this.finishCheckoutButton = this.page.locator('[data-test="finish"]');
    }

    async getCartProducts(): Promise<Product[]> {
        const products: Product[] = [];
        const count = await this.cartItems.count();

        for (let i = 0; i < count; i++) {
            const item = this.cartItems.nth(i);
            products.push({
                name: await item.locator(this.itemName).innerText(),
                // price: await item.locator(this.itemPrice).innerText(),
                // description: ''
            } as Product);
        }

        return products;
    }

    async getCartItemCount(): Promise<number> {
        return await this.cartItems.count();
    }

    async removeProduct(productName: string): Promise<void> {
        const product = this.cartItems.filter({ hasText: productName }).first();
        const count = await product.count();
        if (count === 0) {
            throw new Error(`Cart item not found: ${productName}`);
        }
        await product.locator(this.removeButton).click();
    }

    async isProductInCart(productName: string): Promise<boolean> {
        const product = this.cartItems.filter({ hasText: productName });
        return (await product.count()) > 0;
    }

    async clickCheckout(): Promise<void> {
        await this.page.locator(this.checkoutButton).click();
    }

    async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string): Promise<void> {
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.postalCode.fill(postalCode);
    }

    async submitCheckout(): Promise<void> {
        await this.continueButton.click();
    }

    async getCheckoutTotal(): Promise<string> {
        return await this.totalLabel.innerText();
    }

    async completeCheckout(firstName: string, lastName: string, postalCode: string): Promise<void> {
        await this.clickCheckout();
        await this.fillCheckoutInformation(firstName, lastName, postalCode);
        await this.submitCheckout();
        await this.finishCheckoutButton.click();
    }
}
