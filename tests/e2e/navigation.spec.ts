import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should navigate to all main pages', async ({ page }) => {
    await page.goto('/');
    
    // Test navigation to About page
    await page.click('text=About Dave');
    await expect(page).toHaveURL('/about');
    await expect(page.locator('h1')).toContainText('About Dave');
    
    // Test navigation to Individual Coaching page
    await page.click('text=1-2-1 Coaching');
    await expect(page).toHaveURL('/individual-coaching');
    await expect(page.locator('h1')).toContainText('Individual Coaching');
    
    // Test navigation to Group Sessions page
    await page.click('text=Group Sessions');
    await expect(page).toHaveURL('/group-sessions');
    await expect(page.locator('h1')).toContainText('Group Sessions');
    
    // Test navigation to Contact page
    await page.click('text=Contact');
    await expect(page).toHaveURL('/contact');
    await expect(page.locator('h1')).toContainText('Get in Touch');
    
    // Test navigation back to Home
    await page.click('text=ONE FOR ALL');
    await expect(page).toHaveURL('/');
  });

  test('should have working mobile menu', async ({ page }) => {
    await page.goto('/');
    
    // Set viewport to mobile size
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Open mobile menu
    await page.click('button[aria-label="Menu"]');
    
    // Check if mobile menu items are visible
    await expect(page.locator('text=Home')).toBeVisible();
    await expect(page.locator('text=About Dave')).toBeVisible();
    await expect(page.locator('text=1-2-1 Coaching')).toBeVisible();
    await expect(page.locator('text=Group Sessions')).toBeVisible();
    await expect(page.locator('text=Contact')).toBeVisible();
    
    // Navigate using mobile menu
    await page.click('text=About Dave');
    await expect(page).toHaveURL('/about');
  });

  test('should have working theme toggle', async ({ page }) => {
    await page.goto('/');
    
    // Check if theme toggle is present
    const themeToggle = page.locator('button[aria-label="Toggle theme"]');
    await expect(themeToggle).toBeVisible();
    
    // Click theme toggle
    await themeToggle.click();
    
    // Verify theme change (this might need adjustment based on actual implementation)
    await expect(page.locator('html')).toHaveAttribute('class', /dark/);
  });

  test('should have working call-to-action buttons', async ({ page }) => {
    await page.goto('/');
    
    // Test "Book Now" button
    await page.click('text=Book Now');
    await expect(page).toHaveURL('/contact');
    
    // Go back and test "Parent Login" button
    await page.goto('/');
    await page.click('text=Parent Login');
    await expect(page).toHaveURL('/login');
  });
});