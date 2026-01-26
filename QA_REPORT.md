# QA Automation End-to-End Test Report

**Evaluator**: Senior QA Automation Engineer (AI)
**Date**: 2026-01-26
**Application**: Sparkle Knowledge Yard (Next.js Web App)

## 1. Executive Summary
The application is a high-performance educational landing page built with **Next.js 16** and **TailwindCSS**. It utilizes **Upstash Redis** for data queuing and **Resend** for transactional emails. 

**Production Readiness Score**: 85/100
- **Strengths**: Modern stack, Server-Side Rendering (SSR), clear separation of concerns, secure cookie implementation.
- **Risks**: Lack of API rate limiting (Spam risk), hardcoded admin credentials pattern (secure if env vars managed well, but inflexible).

---

## 2. Phase 1: Application Discovery (Architecture)

### Entity Relationship Diagram
- **User (Guest)**: Interaction only (Form Submit). No DB persistence beyond logs/queue.
- **Admin**: Authenticated via Environment Variables (`ADMIN_ID`).
- **Data Flow**:
  1. `Contact Form` -> `API` -> `Email (Resend)`
  2. `Registration Popup` -> `API` -> `Redis Queue` -> `Email (Resend)`

### Core Routes
| Route | Type | Auth | Purpose |
|-------|------|------|---------|
| `/` | UI | Public | Landing Page |
| `/api/register-popup` | API | Public | Handle generic leads |
| `/api/send-email` | API | Public | Handle contact form |
| `/api/admin/login` | API | Public* | Admin Authentication |

---

## 3. Phase 2 & 3: User Journey & Positive Testing

### Flow A: Guest Registration (Popup)
- **Step 1**: User waits 5s on Home Page.
- **Step 2**: Popup appears.
- **Step 3**: User fills Name, Phone (+91), Email.
- **Step 4**: Clicks "Take the First Step".
- **Expected**:
  - UI shows "Thank you".
  - API returns `200 OK`.
  - Admin receives Email.
  - Data stored in Redis (`registration:REG-xyz`).
- **Status**: ✅ Code Validated (Static Analysis)

### Flow B: Admin Login
- **Step 1**: Admin posts JSON `{id, password}` to `/api/admin/login`.
- **Step 2**: Server validates against ENV variables.
- **Step 3**: Server sets `admin_session` cookie (HttpOnly).
- **Status**: ✅ Secure (HttpOnly, SameSite=Strict detected)

**Note**: User Login/Reset Password flows requested in the prompt **do not exist** in this codebase. This is a brochure/lead-gen site, not a SaaS.

---

## 4. Phase 4 & 7: Negative & Security Testing (Vulnerabilities)

### 🔴 Critical Findings
1. **No Rate Limiting on Public APIs**:
   - The `/api/register-popup` and `/api/send-email` endpoints accept requests without IP rate limiting.
   - **Risk**: A bot can flood your `Resend` quota (Email bombing) or fill your Redis storage.
   - **Recommendation**: Implement `@upstash/ratelimit` middleware.

2. **Basic Auth Timing Attack**:
   - In `/api/admin/login`: `if (id === ADMIN_ID && password === ADMIN_PASSWORD)`
   - **Risk**: Theoretically vulnerable to timing attacks (determining password length/content by response time).
   - **Recommendation**: Use `crypto.timingSafeEqual`.

### 🟡 Minor Findings
1. **Input Validation**:
   - `phone` accepts digits but strict length validation depends on frontend. Backend validates existence but not strict format for all country codes.

---

## 5. Phase 8: Performance Analysis
- **Image Optimization**: Uses `next/image` with `priority` on LCP elements. ✅
- **Animations**: Uses CSS animations (`blob`, `float`) which are performant. ✅
- **Backdrop Filters**: Heavy usage of `backdrop-blur`. May cause FPS drop on low-end mobile devices.
- **Redis Connection**: Serverless Redis (Upstash) usage is excellent for cold-start performance compared to standard TCP DBs.

---

## 6. Phase 9: Test Automation Suite

Since this is a Next.js app, **Playwright** is the recommended E2E testing tool.

### Recommended Action
Run the command below to install the test execution:
`npx playwright install`

I have generated a rigorous test file `tests/e2e/home.spec.ts` for you to run.
