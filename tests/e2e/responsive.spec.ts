import { test, expect } from '@playwright/test';

test.describe('Responsive Design', () => {
  const viewports = [
    { width: 1920, height: 1080, name: 'Desktop' },
    { width: 1024, height: 768, name: 'Tablet' },
    { width: 375, height: 667, name: 'Mobile' },
  ];

  for (const viewport of viewports) {
    test(`should display correctly on ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await page.goto('/');
      
      // Check if main elements are visible
      await expect(page.locator('nav')).toBeVisible();
      await expect(page.locator('h1')).toBeVisible();
      
      // Check if navigation is accessible
      if (viewport.width < 768) {
        // Mobile: menu button should be visible
        await expect(page.locator('button[aria-label="Menu"]')).toBeVisible();
      } else {
        // Desktop: navigation links should be visible
        await expect(page.locator('text=About Dave')).toBeVisible();
        await expect(page.locator('text=1-2-1 Coaching')).toBeVisible();
      }
    });
  }

  test('should have proper mobile navigation', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Open mobile menu
    await page.click('button[aria-label="Menu"]');
    
    // Check if mobile menu is visible
    await expect(page.locator('text=Home')).toBeVisible();
    await expect(page.locator('text=About Dave')).toBeVisible();
    await expect(page.locator('text=1-2-1 Coaching')).toBeVisible();
    await expect(page.locator('text=Group Sessions')).toBeVisible();
    await expect(page.locator('text=Contact')).toBeVisible();
    
    // Close mobile menu by clicking outside
    await page.click('body');
    await expect(page.locator('text=Home')).not.toBeVisible();
  });

  test('should have proper touch targets on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Check if buttons have minimum touch target size (44px)
    const buttons = page.locator('button');
    const count = await buttons.count();
    
    for (let i = 0; i < count; i++) {
      const button = buttons.nth(i);
      const box = await button.boundingBox();
      if (box) {
        expect(box.width).toBeGreaterThanOrEqual(44);
        expect(box.height).toBeGreaterThanOrEqual(44);
      }
    }
  });

  test('should handle orientation changes', async ({ page }) => {
    await page.goto('/');
    
    // Test landscape orientation
    await page.setViewportSize({ width: 667, height: 375 });
    await expect(page.locator('nav')).toBeVisible();
    
    // Test portrait orientation
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('nav')).toBeVisible();
  });
});

test.describe('Cross-Browser Compatibility', () => {
  test('should work across different browsers', async ({ page }) => {
    await page.goto('/');
    
    // Test basic functionality
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('nav')).toBeVisible();
    
    // Test navigation
    await page.click('text=About Dave');
    await expect(page).toHaveURL('/about');
    
    // Test form functionality
    await page.goto('/contact');
    await page.fill('input[name="name"]', 'Test User');
    await expect(page.locator('input[name="name"]')).toHaveValue('Test User');
  });

  test('should handle JavaScript errors gracefully', async ({ page }) => {
    // Navigate to pages and check for console errors
    const pages = ['/', '/about', '/individual-coaching', '/group-sessions', '/contact'];
    
    for (const path of pages) {
      const consoleErrors: string[] = [];
      page.on('console', msg => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });
      
      await page.goto(path);
      await page.waitForLoadState('networkidle');
      
      // Log any console errors for debugging
      if (consoleErrors.length > 0) {
        console.log(`Console errors on ${path}:`, consoleErrors);
      }
    }
  });
});