import { test, expect } from '@playwright/test';




test("redirect to login-page",async ({page}) => {
    
    const url = await page.goto('http://localhost:3000').then(() => page.url());
    // // const url = page.url()
    //  console.log('url nih boss');
    // console.log(JSON.stringify(url));
    // console.log(url);
    // expect to redirect into clerk login page
    await expect(page).toHaveURL("/sign-in?redirect_url=http%3A%2F%2Flocalhost%3A3000%2F")
     expect(page.url()).toEqual(expect.stringContaining("http://localhost:3000/sign-in?redirect_url="))
})

test("login-page",async ({page}) => {
    await page.goto('/sign-in')
    await expect(page).toHaveURL("/sign-in")
})


test("login-with-google",async ({page}) => {
    await page.goto('/sign-in')
    
    await page.getByAltText("Sign in with Google").click();
     page.fill('input[type="email"]',"azaenalabidin@student.ciputra.ac.id")
    await page.getByText("Next").click()
     page.fill('#password >> input[type="password"]',"2005-03-11")
    await page.getByText("Next").click()
    await expect(page).toHaveURL('/')
})


