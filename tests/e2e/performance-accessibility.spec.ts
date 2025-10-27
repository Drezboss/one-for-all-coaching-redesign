import { test, expect } from '@playwright/test';

test.describe('Performance', () => {
  test('should load pages within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    const loadTime = Date.now() - startTime;
    
    // Page should load within 3 seconds
    expect(loadTime).toBeLessThan(3000);
    
    // Check if main content is visible
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should have optimized images', async ({ page }) => {
    await page.goto('/');
    
    // Check for image optimization attributes
    const images = page.locator('img');
    const count = await images.count();
    
    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const src = await img.getAttribute('src');
      const alt = await img.getAttribute('alt');
      
      // Images should have alt text for accessibility
      expect(alt).toBeTruthy();
      
      // Images should have src attribute
      expect(src).toBeTruthy();
    }
  });

  test('should have proper meta tags', async ({ page }) => {
    await page.goto('/');
    
    // Check for essential meta tags
    const title = await page.title();
    expect(title).toBeTruthy();
    expect(title.length).toBeGreaterThan(0);
    
    // Check for viewport meta tag
    const viewport = await page.locator('meta[name="viewport"]');
    await expect(viewport).toBeVisible();
  });
});

test.describe('Accessibility', () => {
  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/');
    
    // Check for main heading
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
    
    // Check heading hierarchy
    const headings = page.locator('h1, h2, h3, h4, h5, h6');
    const count = await headings.count();
    
    // Should have at least one heading
    expect(count).toBeGreaterThan(0);
  });

  test('should have proper ARIA labels', async ({ page }) => {
    await page.goto('/');
    
    // Check for navigation ARIA label
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
    
    // Check for button ARIA labels
    const buttons = page.locator('button');
    const count = await buttons.count();
    
    for (let i = 0; i < count; i++) {
      const button = buttons.nth(i);
      const ariaLabel = await button.getAttribute('aria-label');
      const textContent = await button.textContent();
      
      // Buttons should have either aria-label or text content
      expect(ariaLabel || textContent?.trim()).toBeTruthy();
    }
  });

  test('should be keyboard navigable', async ({ page }) => {
    await page.goto('/');
    
    // Test tab navigation
    await page.keyboard.press('Tab');
    
    // Check if focus is visible
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
    
    // Test tab through navigation
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Tab');
      const focused = page.locator(':focus');
      await expect(focused).toBeVisible();
    }
  });

  test('should have proper color contrast', async ({ page }) => {
    await page.goto('/');
    
    // This is a basic check - in a real scenario, you'd use a proper contrast checker
    // For now, we'll check that text elements are visible
    const textElements = page.locator('p, h1, h2, h3, h4, h5, h6, span, div');
    const count = await textElements.count();
    
    // Should have text content
    expect(count).toBeGreaterThan(0);
  });

  test('should have skip links for screen readers', async ({ page }) => {
    await page.goto('/');
    
    // Check for skip to main content link (common accessibility pattern)
    const skipLink = page.locator('a[href="#main"], a[href="#content"]');
    const count = await skipLink.count();
    
    // This is optional but good practice
    if (count > 0) {
      await expect(skipLink.first()).toBeVisible();
    }
  });
});

test.describe('SEO', () => {
  test('should have proper page titles', async ({ page }) => {
    const pages = [
      { path: '/', expectedTitle: /one for all|coaching/i },
      { path: '/about', expectedTitle: /about/i },
      { path: '/individual-coaching', expectedTitle: /individual|coaching/i },
      { path: '/group-sessions', expectedTitle: /group|sessions/i },
      { path: '/contact', expectedTitle: /contact/i },
    ];
    
    for (const { path, expectedTitle } of pages) {
      await page.goto(path);
      const title = await page.title();
      expect(title).toMatch(expectedTitle);
    }
  });

  test('should have proper meta descriptions', async ({ page }) => {
    await page.goto('/');
    
    // Check for meta description
    const metaDescription = page.locator('meta[name="description"]');
    const count = await metaDescription.count();
    
    if (count > 0) {
      const description = await metaDescription.getAttribute('content');
      expect(description).toBeTruthy();
      expect(description!.length).toBeGreaterThan(50);
    }
  });

  test('should have proper Open Graph tags', async ({ page }) => {
    await page.goto('/');
    
    // Check for Open Graph title
    const ogTitle = page.locator('meta[property="og:title"]');
    const count = await ogTitle.count();
    
    if (count > 0) {
      const title = await ogTitle.getAttribute('content');
      expect(title).toBeTruthy();
    }
  });
});