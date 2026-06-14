import {test, expect} from '@playwright/test';
import loginData from '../../test-data/ui-data/loginData.json';   
import { POManager } from '../../pages/POManager';


test.describe('Data Driven Login Tests', () => {
  for (const data of loginData) {
    test(`Login test for ${data.username}`, async ({page}) => {
      const poManager = new POManager(page);
      const loginPage = poManager.getLoginPage();
      await loginPage.navigate();
      await loginPage.login(data.username, data.password);
      console.log(`Testing login with username: ${data.username} and password: ${data.password}`);
      if (data.username === 'incorrect_user') {
                await expect(page.locator('[data-test="error"]')).toBeVisible(); // ✅ assertion
            } else {
                await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html'); // ✅ assertion
            }    
    });
  }
})



// *************** Basic Tests ******************

// below are basic login tests without using fixtures and page object model, 
// which are now refactored to use those design patterns above


test.skip('login should be successful', async ({page}) => 
  {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
});

test.skip('Incorrect login', async ({page}) => 
     {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'random_user');
  await page.fill('#password', 'secret_password');
  await page.click('#login-button');
  await expect(page.locator('[data-test="error"]')).toBeVisible();
  await expect(page.locator('[data-test="error"]')).toHaveText("Epic sadface: Username and password do not match any user in this service")
});