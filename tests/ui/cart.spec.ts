import { expect } from '@playwright/test';
import { CartPage } from'../../pages/CartPage';
import { test } from '../../fixtures/LoggedInFixture';
import productData from '../../test-data/ui-data/productDetails.json';

test('Verify product can be added to cart, validated in cart page, and removed', async ({ loggedInPage, poManager }) => {
    const productPage = poManager.getProductPage();
    const cartPage = poManager.getCartPage(); 
    const productToSelect = productData.productToSelect;
    await productPage.clickProduct(productToSelect);

    await expect(loggedInPage.locator('.shopping_cart_badge')).toHaveText('1');
    await loggedInPage.locator('.shopping_cart_link').click();

    const cartProducts = await cartPage.getCartProducts();
    expect(cartProducts.some(item => item.name === productToSelect)).toBe(true);

    expect(await cartPage.isProductInCart(productToSelect)).toBe(true);
    await cartPage.removeProduct(productToSelect);
    expect(await cartPage.isProductInCart(productToSelect)).toBe(false);
    await loggedInPage.pause();
});

test('Verify checkout process completes successfully with correct total', async ({ loggedInPage, poManager }) => {
    const productPage = poManager.getProductPage();
    const cartPage = poManager.getCartPage(); 
    const productToSelect = productData.productToSelect;
    await productPage.clickProduct(productToSelect);

    // await expect(loggedInPage.locator('.shopping_cart_badge')).toHaveText('1');
    await loggedInPage.locator('.shopping_cart_link').click();

    await cartPage.completeCheckout('John', 'Doe', '12345');
    const total = await cartPage.getCheckoutTotal();
    expect(total).toBe('Total: $29.99'); // Replace with expected total based on your test data
    await loggedInPage.pause();
}); 

test('Verify checkout flow should be successful with valid data and total should be correct', async ({ loggedInPage, poManager }) => {
    const productPage = poManager.getProductPage();
    const cartPage = poManager.getCartPage(); 
    const productToSelect = productData.productToSelect;
    await productPage.clickProduct(productToSelect);

    await loggedInPage.locator('.shopping_cart_link').click();

    await cartPage.completeCheckout('John', 'Doe', '12345');
    const total = await cartPage.getCheckoutTotal();
    expect(total).toBe('Total: $29.99'); // Replace with expected total based on your test data
    expect(await cartPage.isProductInCart(productToSelect)).toBe(false); // Product should no longer be in cart after checkout
    await loggedInPage.pause();
});