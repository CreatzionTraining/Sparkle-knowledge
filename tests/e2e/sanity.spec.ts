import { test, expect } from '@playwright/test';

test.describe('Sparkle Knowledge Yard - Core Sanity Suite', () => {

    test.beforeEach(async ({ page }) => {
        // Sanity tests should be fast, but we keep some buffer for loading
        await page.goto('http://localhost:3000', { timeout: 30000 });
        await page.waitForLoadState('networkidle');
    });

    /**
     * 1. SMOKE CHECK
     * Verifies the application loads, the title is correct, and critical hero elements are present.
     */
    test('Sanity - Application Loads & Hero Visible', async ({ page }) => {
        await expect(page).toHaveTitle(/Sparkle Knowledge|Study Abroad|IELTS/i); // Adjust regex based on actual title

        // Check for Logo
        await expect(page.locator('nav').first()).toBeVisible();

        // Check for Main Value Proposition (Hero Text)
        await expect(page.locator('h1').first()).toBeVisible();

        // Check for Primary Call to Action
        const ctaButton = page.locator('a[href="#contact"]', { hasText: 'Book Free Demo' });
        await expect(ctaButton).toBeVisible();
        await expect(ctaButton).toBeEnabled();
    });

    /**
     * 2. CRITICAL NAVIGATION
     * Verifies that the user can navigate to the most important business section (Courses).
     */
    test('Sanity - Navigation to Courses', async ({ page }) => {
        // Navigate using the menu
        await page.locator('nav').getByText('Services').click();

        // Verify scrolling/navigation happens
        await expect(page.locator('#courses')).toBeInViewport({ timeout: 10000 });

        // Verify key content is loaded (at least one course card)
        const courseCards = page.locator('#courses .group.perspective-1000');
        await expect(courseCards.first()).toBeVisible();

        // Ensure we have multiple courses displayed (Test Prep is the core product)
        expect(await courseCards.count()).toBeGreaterThan(3);
    });

    /**
     * 3. CRITICAL BUSINESS FLOW (LEAD GENERATION)
     * Verifies that a user can successfully submit an enquiry.
     * This is the most critical path for business revenue.
     */
    test('Sanity - Contact Form Submission (Mocked)', async ({ page }) => {
        await page.goto('http://localhost:3000/#contact');

        // 1. Fill Critical Fields
        await page.fill('input[name="fullName"]', 'Sanity Check User');
        await page.fill('input[name="phone"]', '9876543210');
        await page.fill('input[name="email"]', 'sanity@test.com');

        // Dropdown selection (Course)
        await page.click('button:has-text("Select a course")');
        await page.click('li button:has-text("IELTS")');

        await page.fill('textarea[name="message"]', 'This is a sanity test enquiry.');

        // 2. Accept Terms (Compliance Check)
        await page.click('input[name="terms"]');

        // 3. Mock API Response (We strictly test frontend flow here, not backend email service)
        await page.route('**/api/send-email', async (route) => {
            await route.fulfill({ status: 200, body: JSON.stringify({ success: true }) });
        });

        // 4. Submit
        await page.click('button:has-text("Start Your Journey Here")');

        // 5. Verify Success Feedback
        const successModal = page.locator('text=Success!');
        await expect(successModal).toBeVisible({ timeout: 15000 });
        await expect(page.locator('text=Your message has been sent successfully')).toBeVisible();
    });

});
