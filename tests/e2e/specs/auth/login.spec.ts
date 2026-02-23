import { test } from '../../fixtures/test-user';
import { LoginPage } from '../../pages/login.page';

test.describe('Login', () => {
    test('Successfull login with valid data', async ({ page, testUser }) => {
        const loginPage = new LoginPage(page);
        
        await loginPage.goto();
        await loginPage.login(testUser.email, testUser.password);
        await loginPage.expectSuccessLogin();
    });
});