import { test, expect } from '@playwright/test';




test("redirect to login-page",async ({page}) => {
    const url = await page.goto('http://localhost:3000').then(() => page.url());
    // const url = page.url()
     console.log('url nih boss');
    console.log(JSON.stringify(url));
    console.log(url);
    
    // expect to redirect into clerk login page
     expect(url).toEqual(expect.stringContaining("http://localhost:3000/sign-in?redirect_url="))
})

test("login-page",async ({page}) => {
    await page.goto('/sign-in')

    await expect(page).toHaveURL("/sign-in")
})
