export class TestDataGenerator {
        static uniqueId(): string {
        return Date.now().toString() + Math.floor(Math.random() * 1000).toString();
    }

    static username(prefix: string = 'testuser'): string {
        return `${prefix}_${this.uniqueId()}`;
    }

    static email(domain: string = 'example.com'): string {
        return `test_${this.uniqueId()}@${domain}`;
    }

    static password(length: number = 12): string {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
        let password = '';
        for (let i = 0; i < length; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return password + 'A1!';
    }
}