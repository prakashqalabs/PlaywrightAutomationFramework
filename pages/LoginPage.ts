import { Locator, Page } from '@playwright/test';

declare const process: { env: { BASE_URL?: string } };

export class LoginPage {

    private enterUsername: Locator;
    private enterPassword: Locator;
    private signInButton: Locator;

    constructor(private page: Page) 
    {
        this.enterUsername = this.page.locator("#user-name");
        this.enterPassword = this.page.locator("#password");
        this.signInButton = this.page.locator("#login-button");
    }

    async navigate() 
    {
        // await this.page.goto('/'); 
        await this.page.goto(`${process.env.BASE_URL}`); // ✅ using BASE_URL from environment variables
        console.log(`Navigated to URL: ${process.env.BASE_URL}`); // ✅ logging the URL for verification
    }

    async login(username: string, password: string) 
    {
        await this.enterUsername.fill(username);
        await this.enterPassword.fill(password);
        await this.signInButton.click();
    }
}