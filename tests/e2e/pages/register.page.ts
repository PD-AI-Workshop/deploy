import { Page, expect } from '@playwright/test';


export class RegisterPage {
    constructor(private page: Page) {}

    private formTitle = this.page.getByTestId('register-title');
    private usernameInput = this.page.getByTestId('register-input-username');
    private emailInput = this.page.getByTestId('register-input-email');
    private passwordInput = this.page.getByTestId('register-input-password');
    private passwordConfirmInput = this.page.getByTestId('register-input-confirmPassword');
    private submitButton = this.page.getByTestId('register-submit-button');
    private notification = this.page.getByTestId('notification-message');

    async goto() {
        await this.page.goto('/register');
        await expect(this.formTitle).toHaveText('Регистрация');
    }

    async register(username: string, email: string, password: string, confirmPassword?: string) {
        await this.usernameInput.fill(username);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.passwordConfirmInput.fill(confirmPassword || password);
        await this.submitButton.click();
    }

    async expectSuccessRegistration() {
        await expect(this.notification).toHaveText('Регистрация прошла успешно!');
    }
}
