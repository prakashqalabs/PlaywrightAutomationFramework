import {Page} from '@playwright/test';
import {LoginPage} from './LoginPage';
import {ProductPage} from './ProductPage';
import { CartPage } from './CartPage';

export class POManager
{
    private page: Page;
    private loginPage: LoginPage;
    private productPage: ProductPage;
    private cartPage: CartPage;
    
    constructor(page: Page)
    {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.productPage = new ProductPage(this.page);
        this.cartPage = new CartPage(this.page);
    }

    getLoginPage()
    {
        return this.loginPage;
    }

    getProductPage()
    {
        return this.productPage;
    }

    getCartPage()
    {
        return this.cartPage;
    }
}
