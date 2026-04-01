# Calgary City Roofing Website

A modern, static website for Calgary City Roofing & Exteriors with integrated email contact functionality. This project was migrated from WordPress and is now hosted on Vercel as a static site with serverless functions.

## 📋 Table of Contents

- [Architecture Overview](#architecture-overview)
- [Quick Start](#quick-start)
- [Email System (Resend)](#email-system-resend)
- [Contributing Guidelines](#contributing-guidelines)
- [SEO Management](#seo-management)
- [Adding Blog Posts](#adding-blog-posts)
- [Deployment](#deployment)
- [TODO List](#todo-list)

---

## 🏗️ Architecture Overview

### Project Structure

```
calgry-city-roofing/
├── api/                          # Vercel serverless functions
│   ├── send-email.js            # Email handler (production)
│   └── test-runtime.js          # Runtime testing
├── public/                       # Static website files
│   ├── index.html               # Main homepage (203KB)
│   ├── index*.html              # WordPress redirect artifacts (see TODO)
│   ├── wp-content/              # WordPress theme assets (CSS, JS, images)
│   └── [other pages]/           # Service pages, blog posts
├── SEO/                         # SEO documentation (empty - see TODO)
├── server.js                    # Local development server (Express)
├── package.json                 # Node.js dependencies
├── vercel.json                  # Vercel deployment config
├── .env.local                   # Local environment variables (not in git)
└── README.md                    # This file
```

### Technology Stack

- **Frontend**: Static HTML/CSS/JavaScript (from WordPress/Elementor)
- **Backend**: Vercel Serverless Functions (Node.js)
- **Email Service**: Resend API (3,000 emails/month free)
- **Hosting**: Vercel (CDN + Edge Network)
- **Local Development**: Express.js server
- **Version Control**: Git + GitHub

### How It Works

1. **Static Site**: All pages are pre-rendered HTML from WordPress export (HTTrack)
2. **Dynamic Email**: Contact forms POST to `/api/send-email` serverless function
3. **Email Delivery**: Resend API sends emails to business and customer confirmation
4. **CDN Delivery**: Vercel serves static files globally via edge network

---

## 🚀 Quick Start

### Prerequisites

- Node.js 20.x or higher
- npm or yarn
- Vercel CLI (optional, for local serverless testing)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/calgry-city-roofing.git
   cd calgry-city-roofing
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create `.env.local` file:
   ```env
   RESEND_API_KEY=re_your_key_here
   BUSINESS_EMAIL=info@calgarycityroofing.com
   FROM_EMAIL=onboarding@resend.dev
   ```

4. **Run locally**
   
   Option A - Simple server (no serverless functions):
   ```bash
   npm run dev
   # Visit http://localhost:3000
   ```
   
   Option B - Vercel dev (includes serverless functions):
   ```bash
   npx vercel dev
   # Visit http://localhost:3000
   ```

---

## 📧 Email System (Resend)

### Why Resend?

- ✅ **3,000 emails/month FREE** (forever)
- ✅ **100 emails/day limit** (prevents overuse)
- ✅ **Modern API** - simpler than SendGrid/AWS SES
- ✅ **Great deliverability** - emails reach inboxes
- ✅ **Professional HTML emails**
- ✅ **No complicated setup**

### Setup Resend

1. Go to [resend.com](https://resend.com)
2. Sign up for free account
3. Go to "API Keys" section
4. Create new API key
5. Copy the key (starts with `re_`)
6. Add to `.env.local` (local) or Vercel environment variables (production)

### Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `RESEND_API_KEY` | Your Resend API key | `re_abc123...` |
| `BUSINESS_EMAIL` | Where contact emails are sent | `info@calgarycityroofing.com` |
| `FROM_EMAIL` | Sender email address | `onboarding@resend.dev` |

### Email Flow

1. User fills contact form on website
2. JavaScript POSTs to `/api/send-email`
3. Serverless function validates data
4. Two emails sent via Resend:
   - Business notification (to `BUSINESS_EMAIL`)
   - Customer confirmation (to user's email)
5. Success/error response returned to browser

---

## 🤝 Contributing Guidelines

### Branch Strategy

- `main` - Production branch (auto-deploys to Vercel)
- `develop` - Development branch (optional)
- `feature/*` - Feature branches
- `fix/*` - Bug fix branches

### Making Changes

1. **Create a branch**
   ```bash
   git checkout -b fix/your-fix-name
   # or
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Edit HTML files in `public/`
   - Update serverless functions in `api/`
   - Test locally before committing

3. **Test your changes**
   ```bash
   npm run dev
   # Test in browser at http://localhost:3000
   ```

4. **Commit with clear messages**
   ```bash
   git add .
   git commit -m "fix: update contact form validation"
   ```

5. **Push and create PR**
   ```bash
   git push -u origin fix/your-fix-name
   # Create Pull Request on GitHub
   ```

### Code Standards

- **HTML**: Keep WordPress/Elementor structure intact where possible
- **JavaScript**: Use modern ES6+ syntax
- **CSS**: Maintain existing class naming conventions
- **Comments**: Add comments for complex logic
- **Testing**: Test contact form after any email-related changes

---

## 🔍 SEO Management

### Current SEO Implementation

The site uses **Yoast SEO** metadata from the WordPress export:

- Meta descriptions
- Open Graph tags (Facebook/LinkedIn)
- Twitter Card tags
- Schema.org structured data
- Canonical URLs

### Updating SEO Metadata

#### For the Homepage (index.html)

1. Open `public/index.html`
2. Find the `<head>` section (lines 1-100)
3. Update these key tags:

```html
<!-- Page Title -->
<title>Your New Title | City Roofing & Exteriors</title>

<!-- Meta Description -->
<meta name="description" content="Your new description (155 chars max)" />

<!-- Open Graph (Facebook, LinkedIn) -->
<meta property="og:title" content="Your New Title" />
<meta property="og:description" content="Your new description" />
<meta property="og:image" content="https://yourdomain.com/image.jpg" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Your New Title" />
```

#### For Other Pages

- Each page in `public/` has its own SEO metadata in the `<head>` section
- Follow the same pattern as homepage
- Update page-specific titles and descriptions

#### SEO Checklist

- [ ] Title under 60 characters
- [ ] Meta description 150-155 characters
- [ ] Unique per page (no duplicates)
- [ ] Include target keywords naturally
- [ ] Open Graph image 1200x630px
- [ ] Test with [metatags.io](https://metatags.io/)

---

## 📝 Adding Blog Posts

### Current Blog Setup

Blog posts are static HTML pages in subdirectories under `public/`. They are part of the WordPress export.

### Adding a New Blog Post

#### Option 1: Manual HTML Creation (Current System)

1. **Create HTML file**
   ```bash
   # Create in appropriate directory
   public/blog/your-post-slug/index.html
   ```

2. **Copy template from existing post**
   - Use an existing blog post as template
   - Maintain header/footer structure
   - Update content area only

3. **Update metadata**
   - Change `<title>`
   - Update meta description
   - Set Open Graph tags
   - Add schema.org Article markup

4. **Test locally**
   ```bash
   npm run dev
   # Visit http://localhost:3000/blog/your-post-slug/
   ```

#### Option 2: Future Blog System (Recommended - See TODO)

The ideal setup would be:
- Markdown or MDX files for posts
- Build-time static generation (Next.js/Astro/Eleventy)
- Automatic SEO metadata
- Dynamic sitemap generation

This requires restructuring the project (see TODO list).

---

## 🚢 Deployment

### Automatic Deployment (Vercel)

The site auto-deploys when you push to `main`:

```bash
git push origin main
# Vercel automatically builds and deploys
# Check deployment at: https://vercel.com/dashboard
```

### Manual Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Environment Variables in Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select project: `calgry-city-roofing`
3. Settings → Environment Variables
4. Add:
   - `RESEND_API_KEY` (secret)
   - `BUSINESS_EMAIL`
   - `FROM_EMAIL`

### Deployment Checklist

- [ ] Environment variables set in Vercel
- [ ] Test contact form after deployment
- [ ] Check email delivery
- [ ] Verify SEO metadata (view source)
- [ ] Test on mobile devices
- [ ] Check Google Search Console

---

## 📝 TODO List

### HIGH Priority - Fix WordPress Artifacts

- [ ] **Clean up duplicate index files**
  - ~200+ `index*.html` files are HTTrack redirect artifacts
  - Options:
    1. Delete redirect files, update internal links to direct paths
    2. Implement 301 redirects in `vercel.json`
    3. Create redirect mapping in middleware
  - **Impact**: Reduces repo size, cleaner structure

- [ ] **Fix repeated headers issue**
  - Problem: Some pages have duplicate `<header>` elements from WordPress/Elementor
  - Solution: Extract header to partial/component (requires build system)
  - Current: Manually fix in each HTML file

- [ ] **Consolidate CSS/JS**
  - Multiple WordPress plugin CSS/JS files loaded
  - Many are unused after static export
  - Run audit, remove unused assets

### MEDIUM Priority - Improvements

- [ ] **Create blog system**
  - Migrate to Markdown/MDX posts
  - Implement static site generator (Astro/Next.js recommended)
  - Auto-generate blog list pages
  - Add RSS feed

- [ ] **SEO Documentation**
  - Create `SEO/README.md` with:
    - Current keyword strategy
    - Competitor analysis
    - Target keywords per page
    - Content guidelines
  - Document schema.org implementation

- [ ] **Improve build process**
  - Add HTML minification
  - Optimize images (WebP conversion)
  - Bundle and minify CSS/JS
  - Add sitemap generation

### LOW Priority - Nice to Have

- [ ] **Testing**
  - Add E2E tests for contact form (Playwright/Cypress)
  - Add API tests for `/api/send-email`
  - Add visual regression tests

- [ ] **Analytics**
  - Document Google Analytics/Tag Manager setup
  - Add conversion tracking
  - Add heat mapping (Hotjar)

- [ ] **Performance**
  - Implement lazy loading for images
  - Add service worker for offline support
  - Optimize Core Web Vitals

- [ ] **Accessibility**
  - Run WAVE/axe audit
  - Add ARIA labels where missing
  - Ensure keyboard navigation works
  - Test with screen readers

---

## 🐛 Troubleshooting

### Contact Form Not Sending Emails

1. Check environment variables are set
2. Verify Resend API key is valid
3. Check Vercel function logs: `vercel logs`
4. Test API endpoint: `curl -X POST http://localhost:3000/api/send-email`

### Local Development Issues

```bash
# Clear node modules and reinstall
rm -rf node_modules
npm install

# Verify Node version
node --version  # Should be 20.x

# Check for port conflicts
# Express server uses port 3000 by default
```

### Deployment Failures

- Check Vercel build logs
- Ensure `package.json` scripts are correct
- Verify Node.js version in `package.json` engines

---

## 📄 License

MIT License - Calgary City Roofing & Exteriors

---

## 📞 Support

For issues or questions:
- **Technical**: Create GitHub issue
- **Business**: info@calgarycityroofing.com
- **Emergency**: [Your phone number]

---

**Last Updated**: March 2026
