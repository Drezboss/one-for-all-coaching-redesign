import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test('should fill out and submit contact form', async ({ page }) => {
    await page.goto('/contact');
    
    // Fill out the form
    await page.fill('input[name="name"]', 'John Doe');
    await page.fill('input[name="email"]', 'john.doe@example.com');
    await page.fill('input[name="phone"]', '1234567890');
    await page.fill('textarea[name="message"]', 'I would like to book a session for my son.');
    
    // Select service type
    await page.check('input[value="individual"]');
    
    // Submit the form
    await page.click('button[type="submit"]');
    
    // Check for success message or redirect
    await expect(page.locator('text=Thank you')).toBeVisible();
  });

  test('should validate required fields', async ({ page }) => {
    await page.goto('/contact');
    
    // Try to submit without filling required fields
    await page.click('button[type="submit"]');
    
    // Check for validation messages
    await expect(page.locator('text=Name is required')).toBeVisible();
    await expect(page.locator('text=Email is required')).toBeVisible();
    await expect(page.locator('text=Message is required')).toBeVisible();
  });

  test('should validate email format', async ({ page }) => {
    await page.goto('/contact');
    
    // Fill form with invalid email
    await page.fill('input[name="name"]', 'John Doe');
    await page.fill('input[name="email"]', 'invalid-email');
    await page.fill('textarea[name="message"]', 'Test message');
    
    await page.click('button[type="submit"]');
    
    // Check for email validation message
    await expect(page.locator('text=Please enter a valid email')).toBeVisible();
  });

  test('should allow selecting different service types', async ({ page }) => {
    await page.goto('/contact');
    
    // Test individual coaching selection
    await page.check('input[value="individual"]');
    await expect(page.locator('input[value="individual"]')).toBeChecked();
    
    // Test group sessions selection
    await page.check('input[value="group"]');
    await expect(page.locator('input[value="group"]')).toBeChecked();
    await expect(page.locator('input[value="individual"]')).not.toBeChecked();
    
    // Test general inquiry selection
    await page.check('input[value="general"]');
    await expect(page.locator('input[value="general"]')).toBeChecked();
  });

  test('should be accessible', async ({ page }) => {
    await page.goto('/contact');
    
    // Check for proper form labels
    await expect(page.locator('label[for="name"]')).toBeVisible();
    await expect(page.locator('label[for="email"]')).toBeVisible();
    await expect(page.locator('label[for="phone"]')).toBeVisible();
    await expect(page.locator('label[for="message"]')).toBeVisible();
    
    // Check for proper form structure
    await expect(page.locator('form')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });
});