import { Page, Locator } from '@playwright/test';
import { Product } from '../models/ui/product';

export class ProductPage {
    private page: Page;    
    private readonly productCards: Locator;
    private readonly productName: string;
    private readonly productPrice: string;
    private readonly productDescription: string;
    private readonly addToCartButton: string;
    private readonly cartButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productCards = page.locator('.inventory_list .inventory_item');
        this.productName = '.inventory_item_name';
        this.productPrice = '.inventory_item_price';
        this.productDescription = '.inventory_item_desc';
        this.addToCartButton = 'button';
        this.cartButton = page.locator(".shopping_cart_link");    
    }

    async getAllProducts(): Promise<Product[]> {

        const products: Product[] = [];
        // const count = await this.productCards.count();
        // for(let i = 0; i < count; i++) {
        //     const product = this.productCards.nth(i);

// the above code is refactored to use for...of loop which is more readable and easier to maintain,
//  and also eliminates the need to manually manage the index variable 'i' and the count of products.
        for(const product of await this.productCards.all()) {
            products.push({
                name: await product.locator(this.productName).innerText(),

                // price: await product.locator(this.productPrice).innerText(),

                // description: await product.locator(this.productDescription).innerText()
            });
        }

        return products;
    }

    //  click product is by directly using the product name locator and then clicking the desired product.

    async clickProduct(productName: string) {
        const product = this.productCards.filter({ hasText: productName });
        const count = await product.count();
        if (count === 0) {
            throw new Error(`Product not found: ${productName}`);
        }
        const addToCartButton = product.locator(this.addToCartButton);
        await addToCartButton.click();
        console.log(`Clicked product: ${productName}`);
    }
    async clickCart() {
        this.cartButton.click();
    }
}