import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

// *********For Test Environments using .env files*********
const env = process.env.TEST_ENV || 'test';

// 
// const env = process.env.TEST_ENV || 'dev';


dotenv.config({
  path: path.resolve(__dirname, `env-files/.env.${env}`),  // ✅ correct path
  override: true
});
console.log("BASE_URL =", process.env.BASE_URL);
console.log("USERNAME =", process.env.USERNAME);
console.log("PASSWORD =", process.env.PASSWORD);
/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: 'tests',
  // to set the baseURL for all the tests, we can use the global use property in the config file. This way we don't have to specify the URL in each test case, and if we need to change it, we can do it in one place.

  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  // forbidOnly: !!process.env.CI,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */

  // /* Retry on CI only */
  // retries: process.env.CI ? 2 : 0,
  // /* Opt out of parallel tests on CI. */
  // workers: process.env.CI ? 1 : undefined,

  retries: 1,
  workers: 1,  // for sequential execution of test cases or disabling parelell execution
  timeout: 30 * 1000,

  expect: {
    timeout: 10000,
  },

  reporter: [
    ['html'],
    // ['allure-playwright']
  ],

  //---------------For single browser
  projects: [
    {
      name: 'API Tests',
      testMatch: '**/tests/api/**/*.spec.ts',
      use: {
        extraHTTPHeaders: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      }
    },
    {
      name: 'UI Tests',                  
      testMatch: '**/tests/ui/**/*.spec.ts',
      use: {
        browserName: 'chromium',
        channel: 'chrome',
        headless: false,
        launchOptions: {
          args: ['--start-maximized', '--disable-notifications'],
        },
        baseURL: process.env.BASE_URL,   // ✅ reads from .env file
        screenshot: 'only-on-failure',  //off, on, only-on-failure
        trace: 'off',
        video: 'off',
        //retain-on-failure (best), off,on
      },
    },
  ]


  // **************************************************************

  /* Configure projects for multiple and major browsers below in global config*/

  // use: {
  //   headless: false,
  //   screenshot: 'on',
  //   trace:'off',
  //   video: 'off',
  //       //retain-on-failure (best), off,on

  //   launchOptions: {
  //     args: ['--start-maximized'], }

  //     // For Chrome
  //     // args: ['--start-maximized', '--disable-notifications'],

  //     // For Firefox
  //     // viewport: null,
  //     // args: ['--start-maximized', '--disable-notifications']   

  //     //   For Webkit
  //     //   args: ['--start-maximized', '--disable-notifications']

  //   },
  //   },
  // },

  // projects: [
  //   {
  //     name: 'chromium',
  //     use: { ...devices['Desktop Chrome'] },
  //   },

  //   {
  //     name: 'Chrome',
  //     use: {
  //       browserName: 'chromium',
  //       channel: 'chrome',
  //       viewport: null, // correct way to maximize the browser in chrome 
  //       launchOptions: {
  //   args: ['--start-maximized']
  // } 
  //       // headless: false, ---------- Already globally defined
  //       // screenshot: 'on', --------- Already globally defined
  //     },
  //   },
  //   {
  //     name: 'Firefox',
  //     use: {
  //       browserName: 'firefox',
  //       viewport: null, // correct way to maximize the browser in firefox
  //       // headless: false, ---------- Already globally defined
  //       // screenshot: 'on', --------- Already globally defined
  //     },

  // {
  //   name: 'webkit',
  //   use: { ...devices['Desktop Safari'] },
  // },

  /* Test against mobile viewports. */
  // {
  //   name: 'Mobile Chrome',
  //   use: { ...devices['Pixel 5'] },
  // },
  // {
  //   name: 'Mobile Safari',
  //   use: { ...devices['iPhone 12'] },
  // },

  /* Test against branded browsers. */
  // {
  //   name: 'Microsoft Edge',
  //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
  // },
  // {
  //   name: 'Google Chrome',
  //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
  // },
  // ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
