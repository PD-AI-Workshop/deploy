import { test } from '@playwright/test';
import { RegisterPage } from '../../pages/register.page';
import { TestDataGenerator } from '../../utils/test-data';

test.describe('Registration', () => {
    test('Successfull registration with valid data', async ({ page }) => {
        const registerPage = new RegisterPage(page);
        
        await registerPage.goto();
        await registerPage.register(
            TestDataGenerator.username(),
            TestDataGenerator.email(),
            'Password123!',
            'Password123!'
        );
        
        await registerPage.expectSuccessRegistration();
    });
});