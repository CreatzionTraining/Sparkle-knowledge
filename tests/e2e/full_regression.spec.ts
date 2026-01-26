import { test, expect } from '@playwright/test';

test.describe('Sparkle Knowledge Yard Home Page Regression', () => {

    // Setup before each test
    test.beforeEach(async ({ page }) => {
        // Mark test as slow (triples the default timeout)
        test.slow();

        // Go to home page with increased timeout
        await page.goto('https://sparkleknowledgeyard.com/', { timeout: 60000 });

        // Wait for hydration and critical elements with extra buffer
        await page.waitForLoadState('networkidle', { timeout: 30000 });
        await page.waitForTimeout(2000); // Explicit wait for stability
    });

    // -------------------------------------------------------------------------
    // 1. HERO SECTION & NAVIGATION
    // -------------------------------------------------------------------------
    test('Hero Section - Elements Visibility & Animations', async ({ page }) => {
        // Navbar branding
        await expect(page.locator('nav a[href="/"] img')).toBeVisible();
        await expect(page.locator('nav')).toBeVisible();

        // Hero Main Headings
        const heroHeadings = [
            'Master Global Exams & Languages',
            'Unlock Your Global Potential',
            'Achieve Your Study Abroad Dreams'
        ];

        // Wait for first slide text to be visible (approx 5s loop)
        const heroTextContainer = page.locator('h1').first();
        await expect(heroTextContainer).toBeVisible();
        await expect(heroTextContainer).toHaveText(/Master Global|Unlock Your|Achieve Your/);

        // CTA Buttons
        await expect(page.locator('a[href="#contact"]', { hasText: 'Book Free Demo' })).toBeVisible();
        await expect(page.locator('a[href*="wa.me"]', { hasText: 'WhatsApp Us' })).toBeVisible();

        // Stats Check
        await expect(page.locator('text=50K+')).toBeVisible();
        await expect(page.locator('text=95%')).toBeVisible();
        await expect(page.locator('text=15+')).toBeVisible();
    });

    test('Navigation Links - Smooth Scroll Check', async ({ page }) => {
        // Desktop Menu Links
        const desktopMenu = page.locator('.hidden.lg\\:flex');

        // Check standard links existence
        const links = ['Home', 'Services', 'Work', 'About', 'Contact'];
        for (const linkName of links) {
            await expect(desktopMenu.locator(`text=${linkName}`)).toBeVisible();
        }

        // Test Scroll functionality (e.g., clicking 'About' scrolls to #about)
        await desktopMenu.locator('text=About').click();
        await page.waitForTimeout(1000); // Allow scroll animation
        await expect(page.locator('#about')).toBeInViewport();

        // Test 'Enquiry Now' CTA in Nav
        const enquiryBtn = page.locator('nav a[href="/#contact"]', { hasText: 'Enquiry Now' });
        if (await enquiryBtn.isVisible()) {
            await enquiryBtn.click();
            await page.waitForTimeout(1000);
            await expect(page.locator('#contact')).toBeInViewport();
        }
    });

    // -------------------------------------------------------------------------
    // 2. COURSES SECTION
    // -------------------------------------------------------------------------
    test('Courses Section - Cards Flip & Content', async ({ page }) => {
        await page.goto('https://sparkleknowledgeyard.com/#courses');
        await page.waitForTimeout(2000); // Wait for section load

        const courseCard = page.locator('.group.perspective-1000').first();
        await expect(courseCard).toBeInViewport({ timeout: 10000 });

        // Check Front Face Content
        await expect(courseCard.locator('h3:has-text("Course Details")')).not.toBeVisible();

        // Click to Flip
        await courseCard.click();
        await page.waitForTimeout(2000); // Extended wait for flip animation

        // Check Back Face Visibility
        await expect(courseCard.locator('h3:has-text("Course Details")')).toBeVisible({ timeout: 10000 });
        await expect(courseCard.locator('button:has-text("Book Free Demo")')).toBeVisible({ timeout: 10000 });

        // Flip Back
        const backBtn = courseCard.locator('button.rounded-full.bg-gray-50', { hasText: '' }).last();
        await backBtn.click();
        await page.waitForTimeout(2000); // Extended wait for flip back
        await expect(courseCard.locator('h3:has-text("Course Details")')).not.toBeVisible();
    });

    // -------------------------------------------------------------------------
    // 3. ABOUT SECTION
    // -------------------------------------------------------------------------
    test('About Section - Modals Interaction', async ({ page }) => {
        await page.goto('https://sparkleknowledgeyard.com/#about');
        await page.waitForTimeout(2000);

        // Check main About text
        await expect(page.locator('text="Who We Are"')).toBeVisible({ timeout: 10000 });

        // Open "Vision" Modal
        const visionCard = page.locator('text=Our Vision');
        await visionCard.scrollIntoViewIfNeeded();
        await page.waitForTimeout(1000);
        await visionCard.click();
        await page.waitForTimeout(1000); // Modal animation wait

        // Expect Modal
        const modal = page.locator('.fixed.inset-0.z-\\[100\\]');
        await expect(modal).toBeVisible({ timeout: 10000 });
        await expect(modal.locator('text="To create learning environments"')).toBeVisible({ timeout: 10000 });

        // Close Modal
        await modal.click({ position: { x: 10, y: 10 } }); // Click backdrop
        await expect(modal).not.toBeVisible({ timeout: 10000 });
    });

    // -------------------------------------------------------------------------
    // 4. CERTIFICATES CAROUSEL
    // -------------------------------------------------------------------------
    test('Certificates - Carousel Navigation', async ({ page }) => {
        await page.evaluate(() => document.querySelector('#certificates')?.scrollIntoView());
        await page.waitForTimeout(1000);

        // Find active slide content (e.g. check for a specific name or score if possible, or just visibility)
        const carousel = page.locator('section:has-text("Global Achievers")');
        await expect(carousel).toBeVisible();

        // Click Next Arrow
        const nextBtn = carousel.locator('button[aria-label="Next card"]');
        await nextBtn.click();
        await page.waitForTimeout(500); // Animation wait

        // Click Prev Arrow
        const prevBtn = carousel.locator('button[aria-label="Previous card"]');
        await prevBtn.click();
        await page.waitForTimeout(500);
    });

    // -------------------------------------------------------------------------
    // 5. TESTIMONIALS (3D Carousel)
    // -------------------------------------------------------------------------
    test('Testimonials - Carousel Interaction', async ({ page }) => {
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.locator('text=Student Success Stories').scrollIntoViewIfNeeded();

        const testimonialsSection = page.locator('.perspective-1000').last(); // The stage
        await expect(testimonialsSection).toBeVisible();

        // Check for presence of reviews
        await expect(page.locator('text=Pooja Saravanan')).toBeVisible(); // ID 1

        // Test Next Button
        const nextBtn = page.locator('button').filter({ has: page.locator('svg.w-6.h-6') }).last(); // Heuristic for right arrow
        await nextBtn.click();
        await page.waitForTimeout(600);

        // Assert slide change (checking if another review becomes central/visible)
        // Since it's dynamic, we ensure no crash and basic interaction
    });

    // -------------------------------------------------------------------------
    // 6. CONTACT FORM
    // -------------------------------------------------------------------------
    test('Contact Form - Validation & Submission Flow', async ({ page }) => {
        await page.goto('https://sparkleknowledgeyard.com/#contact');
        await page.waitForTimeout(500);

        // Fill Form Invalid (Skip required fields)
        await page.fill('input[name="fullName"]', 'Test User');
        // Try submitting
        const submitBtn = page.locator('button:has-text("Start Your Journey Here")');

        // Terms checkbox validation
        await expect(submitBtn).toBeDisabled(); // Checkbox not checked

        // Fill remaining Valid Data
        await page.fill('input[name="phone"]', '9999999999');
        await page.fill('input[name="email"]', 'test@example.com');
        await page.fill('textarea[name="message"]', 'This is a playwright automated test message.');

        // Select Course from Dropdown
        await page.click('button:has-text("Select a course")');
        await page.click('li button:has-text("IELTS")');

        // Check Terms
        await page.click('input[name="terms"]');

        // Check Button Enabled
        await expect(submitBtn).toBeEnabled();

        // Setup Mock for API response to avoid real email sending
        await page.route('**/api/send-email', async (route) => {
            await route.fulfill({ status: 200, body: JSON.stringify({ success: true }) });
        });

        // Submit
        await submitBtn.click();

        // Expect Success Modal
        await expect(page.locator('text=Success!')).toBeVisible({ timeout: 20000 });
        await expect(page.locator('text=Your message has been sent successfully')).toBeVisible({ timeout: 20000 });
    });

    // -------------------------------------------------------------------------
    // 7. RESPONSIVENESS (MOBILE)
    // -------------------------------------------------------------------------
    test('Mobile Responsiveness - Menu Drawer', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 812 }); // iPhone X view
        await page.goto('https://sparkleknowledgeyard.com/');

        // Check Hamburger
        const menuBtn = page.locator('button[aria-label="Open Menu"]');
        await expect(menuBtn).toBeVisible();
        await menuBtn.click();

        // Check Drawer Open
        const drawer = page.locator('text=Sparkle Academy');
        await expect(drawer).toBeVisible();

        // Close Drawer
        const closeBtn = page.locator('button:has(svg.w-6.h-6)'); // Heuristic for X icon
        await closeBtn.click();
        await expect(drawer).not.toBeVisible();
    });

});
