// This is just a sample test file for the Product page, real test file is product.spec.ts 
// which is using Page Object Model design pattern and data driven testing approach with JSON file as data source 

//**********   Do not review  ***********  //

import {test, expect} from '@playwright/test';
import { ProductPage } from '../../pages/ProductPage';
import { RandomDataGenerator } from '../../utils/RandomDataGenerator';

test('should store all products and add the desired product to cart', async ({page}) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await expect(page).toHaveURL(/inventory.html/);

  const product = page.locator(".inventory_item").filter({hasText: "Sauce Labs Backpack"});
    await product.locator("button").click();
    await expect(page.locator(".shopping_cart_badge")).toHaveText("1");
    await page.locator(".shopping_cart_link").click();
    console.log(await page.locator(".title").textContent());
    await expect(page.locator(".title")).toHaveText("Your Cart");
    
  const randomText =RandomDataGenerator.getRandomString(4);

  console.log(randomText);

});


