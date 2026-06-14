import { test as base, Page, expect } from '@playwright/test';
import { LoginPage} from '../pages/LoginPage';
import login from '../test-data/ui-data/loginData.json';
import { POManager } from '../pages/POManager';

type LoggedInFixture = { loggedInPage: Page;
    poManager: POManager;  // ✅ tests get access to the page object manager
    
};

export const test = base.extend<LoggedInFixture>({

    poManager: async ({ page }, use) => {
        const poManager = new POManager(page);
        await use(poManager);  // ✅ tests get full access to all pages
    },

    loggedInPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.login(login[0].username, login[0].password);
        await use(page); // ✅ tests get access to the logged-in page   
    }
});

export { expect } from '@playwright/test';
