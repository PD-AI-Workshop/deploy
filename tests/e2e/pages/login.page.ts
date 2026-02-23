import { Page, expect } from '@playwright/test';


export class LoginPage {
    constructor(private page: Page) {}

    private formTitle = this.page.getByTestId('login-title');
    private emailInput = this.page.getByTestId('login-input-email');
    private passwordInput = this.page.getByTestId('login-input-password');
    private submitButton = this.page.getByTestId('login-submit-button');

    async goto() {
        await this.page.goto('/login');
        await expect(this.formTitle).toHaveText('Вход в аккаунт');
    }

    async login(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.submitButton.click();
    }

    async expectSuccessLogin() {
        await expect(this.page).toHaveURL('/profile');
    }
}
