import { test as base, request } from '@playwright/test';
import { TestDataGenerator } from '../utils/test-data';

export const test = base.extend<{
  testUser: { username: string; email: string; password: string; id?: number };
}>({
  testUser: async ({}, use) => {
    const user = {
      username: TestDataGenerator.username(),
      email: TestDataGenerator.email(),
      password: 'Password123!',
      role: 'user',
      is_active: true,
      is_superuser: false,
      is_verified: false,
    };

    const apiContext = await request.newContext({
      baseURL: 'http://localhost:8000/',
    });
    
    const response = await apiContext.post('api/auth/register', {
      data: user,
    });
    
    if (!response.ok()) {
      throw new Error(`Failed to create test user: ${response.status()}`);
    }
    
    const userData = await response.json();
    const fullUser = { ...user, id: userData.id };

    await use(fullUser);
  },
});

export { expect } from '@playwright/test';