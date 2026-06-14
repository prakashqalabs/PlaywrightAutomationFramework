import { expect } from '@playwright/test';
import { POManager } from '../../pages/POManager';
import { test } from '../../fixtures/LoggedInFixture';
import productData from "../../test-data/ui-data/productDetails.json";

test("Verify desired product from JSON should be added to cart successfully", async ({loggedInPage,poManager}) => {

//     const loginPage = new LoginPage(page);
//     const poManager = new POManager(loggedInPage);
    const productPage = poManager.getProductPage();
    const products = await productPage.getAllProducts();

    console.log("All products listed : ", products);
    const productToSelect = productData.productToSelect;
    await productPage.clickProduct(productToSelect);
    await expect(loggedInPage.locator(".shopping_cart_badge")).toHaveText("1");
    await loggedInPage.pause();
    
});


