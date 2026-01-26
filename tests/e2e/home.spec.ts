
import { test, expect } from '@playwright/test';

test.describe('Sparkle Knowledge Yard - E2E User Journey', () => {

    // ------------------------------------------------
    // UI & Content Validation
    // ------------------------------------------------
    test('should load the homepage with critical elements', async ({ page }) => {
        await page.goto('https://sparkleknowledgeyard.com/');

        // Check Title
        await expect(page).toHaveTitle(/Sparkle/);

        // Check Hero Text
        await expect(page.locator('text=Unlock Your Global Potential')).toBeVisible();

        // Check Navigation
        const navbar = page.locator('nav');
        await expect(navbar).toBeVisible();
    });

    // ------------------------------------------------
    // Contact Form Submission (Positive Test)
    // ------------------------------------------------
    test('should successfully submit contact form', async ({ page }) => {
        await page.goto('http://localhost:3000');

        // Scroll to contact section
        await page.locator('#contact').scrollIntoViewIfNeeded();

        // Fill Form inputs with autocomplete attributes
        await page.fill('input[name="fullName"]', 'QA Automation Test');
        await page.fill('input[name="phone"]', '9876543210');
        await page.fill('input[name="email"]', 'qa@test.com');
        await page.fill('textarea[name="message"]', 'This is an automated E2E test message.');

        // Check Terms
        await page.locator('input[name="terms"]').check();

        // Mock API response to avoid sending real emails during test
        await page.route('**/api/send-email', async route => {
            const json = { success: true };
            await route.fulfill({ json });
        });

        // Click Submit
        await page.click('button[type="submit"]');

        // Expect Success Message (Modal)
        // Correct assertion: Wait for the modal "Message Sent!" text to appear
        await expect(page.locator('text=Message Sent!')).toBeVisible();
    });

    // ------------------------------------------------
    // Mobile Responsiveness (Responsive Test)
    // ------------------------------------------------
    test('should render correctly on mobile iphone 12', async ({ page }) => {
        // Set viewport to iPhone 12 Pro dimensions
        await page.setViewportSize({ width: 390, height: 844 });

        await page.goto('http://localhost:3000');

        // Check Hamburger Menu existence
        // Assuming there is a mobile menu button (often with aria-label or specific class)
        // await expect(page.locator('button[aria-label="Menu"]')).toBeVisible();

        // Ensure "Testimonials" are scrollable or visible
        await expect(page.locator('text=Student Success Stories')).toBeVisible();
    });

    // ------------------------------------------------
    // Registration Popup Flow (Time-based Event)
    // ------------------------------------------------
    test('should show registration popup after delay', async ({ page }) => {
        await page.goto('http://localhost:3000');

        // Fast-forward time or wait
        // Note: Testing time-based popups is tricky, usually we force it via console
        // Here we just wait 6s (popup sets for 5s)
        await page.waitForTimeout(6000);

        const popup = page.locator('text=Empower Your Academic Future');
        await expect(popup).toBeVisible();

        // Close it
        await page.click('button[aria-label="Close"]');
        await expect(popup).not.toBeVisible();
    });

});
