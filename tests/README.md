# QA Testing Suite for One For All Coaching Website

This directory contains comprehensive tests for the One For All Coaching website, covering unit tests, component tests, and end-to-end tests.

## Test Structure

```
tests/
├── e2e/                          # End-to-end tests using Playwright
│   ├── navigation.spec.ts        # Navigation functionality tests
│   ├── contact-form.spec.ts      # Contact form tests
│   ├── responsive.spec.ts        # Responsive design tests
│   └── performance-accessibility.spec.ts # Performance & accessibility tests
└── README.md                     # This file

client/src/
├── components/__tests__/         # Component unit tests
│   └── Navigation.test.tsx       # Navigation component tests
├── pages/__tests__/              # Page unit tests
│   ├── Home.test.tsx             # Home page tests
│   └── Contact.test.tsx          # Contact page tests
└── test/                         # Test setup
    └── setup.ts                  # Test environment configuration
```

## Test Types

### 1. Unit Tests (Vitest)
- **Location**: `client/src/components/__tests__/` and `client/src/pages/__tests__/`
- **Framework**: Vitest with React Testing Library
- **Purpose**: Test individual components and pages in isolation

### 2. End-to-End Tests (Playwright)
- **Location**: `tests/e2e/`
- **Framework**: Playwright
- **Purpose**: Test complete user workflows across different browsers and devices

## Running Tests

### Unit Tests
```bash
# Run all unit tests
npm run test

# Run tests in watch mode
npm run test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

### End-to-End Tests
```bash
# Run all E2E tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui

# Run specific test file
npx playwright test tests/e2e/navigation.spec.ts

# Run tests in specific browser
npx playwright test --project=chromium
```

## Test Categories

### 1. Navigation Tests
- Desktop navigation functionality
- Mobile menu behavior
- Theme toggle functionality
- Call-to-action button behavior

### 2. Contact Form Tests
- Form field validation
- Form submission
- Service type selection
- Accessibility compliance

### 3. Responsive Design Tests
- Cross-device compatibility
- Mobile navigation
- Touch target sizes
- Orientation handling

### 4. Performance & Accessibility Tests
- Page load times
- Image optimization
- ARIA compliance
- Keyboard navigation
- SEO optimization

## Test Coverage

### Functional Testing
- ✅ Navigation between pages
- ✅ Form submission and validation
- ✅ User interactions
- ✅ Responsive design
- ✅ Cross-browser compatibility

### Non-Functional Testing
- ✅ Performance (load times)
- ✅ Accessibility (WCAG compliance)
- ✅ SEO optimization
- ✅ Mobile responsiveness

### Browser Support
- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari/WebKit
- ✅ Mobile Chrome
- ✅ Mobile Safari

## Continuous Integration

The tests are configured to run in CI environments with:
- Parallel test execution
- Screenshot capture on failure
- Video recording on failure
- HTML test reports

## Debugging Tests

### Unit Tests
```bash
# Run specific test file
npm run test Navigation.test.tsx

# Run tests in debug mode
npm run test -- --debug
```

### E2E Tests
```bash
# Run tests in headed mode
npx playwright test --headed

# Run tests in debug mode
npx playwright test --debug

# Show test report
npx playwright show-report
```

## Best Practices

1. **Test Isolation**: Each test should be independent and not rely on other tests
2. **Descriptive Names**: Use clear, descriptive test names that explain what is being tested
3. **Arrange-Act-Assert**: Structure tests with clear setup, action, and verification phases
4. **Accessibility First**: Always test for accessibility compliance
5. **Mobile First**: Test mobile functionality before desktop
6. **Performance Awareness**: Monitor test execution times and optimize slow tests

## Adding New Tests

### Unit Tests
1. Create test file in appropriate `__tests__` directory
2. Import component/page to test
3. Mock external dependencies
4. Write test cases using React Testing Library
5. Run tests to verify

### E2E Tests
1. Create test file in `tests/e2e/`
2. Use Playwright's page object model
3. Test complete user workflows
4. Include accessibility checks
5. Test across multiple viewports

## Common Issues & Solutions

### Test Failures
- Check if development server is running
- Verify test selectors match actual DOM elements
- Ensure mocks are properly configured
- Check for timing issues in E2E tests

### Performance Issues
- Use `page.waitForLoadState()` for network requests
- Implement proper test timeouts
- Use test data instead of real API calls
- Optimize test setup and teardown

## Reporting

Test results are available in:
- Console output for unit tests
- HTML reports for E2E tests (`playwright-report/`)
- Coverage reports for unit tests
- Screenshots and videos for failed E2E tests