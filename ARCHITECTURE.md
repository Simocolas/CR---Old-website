# Project Architecture

This document provides a comprehensive overview of the Calgary City Roofing website architecture, explaining how all components work together.

## Table of Contents

- [High-Level Overview](#high-level-overview)
- [Frontend Architecture](#frontend-architecture)
- [Backend Architecture](#backend-architecture)
- [Email System](#email-system)
- [Deployment Pipeline](#deployment-pipeline)
- [Data Flow](#data-flow)
- [Technology Stack](#technology-stack)
- [File Organization](#file-organization)

---

## High-Level Overview

### System Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         User's Browser                           │
└────────────┬────────────────────────────────────┬────────────────┘
             │                                     │
             │ Static Files                        │ Form Submission
             │ (HTML/CSS/JS)                       │ (POST)
             │                                     │
             v                                     v
┌─────────────────────────┐         ┌─────────────────────────────┐
│   Vercel Edge Network   │         │  Vercel Serverless Function │
│   (CDN)                 │         │  /api/send-email            │
│                         │         │                             │
│  - index.html           │         │  - Validates form data      │
│  - CSS/JS/Images        │         │  - Sends emails via Resend  │
│  - Static pages         │         │                             │
└─────────────────────────┘         └──────────────┬──────────────┘
                                                    │
                                                    │ HTTPS API Call
                                                    │
                                                    v
                                    ┌─────────────────────────────┐
                                    │      Resend Email API       │
                                    │                             │
                                    │  - Processes email          │
                                    │  - Delivers to recipients   │
                                    └─────────────────────────────┘
```

### Request Flow

1. **Static Page Request**:
   ```
   User → DNS → Vercel Edge (CDN) → HTML/CSS/JS → User's Browser
   ```

2. **Contact Form Submission**:
   ```
   User fills form → JavaScript validates → POST to /api/send-email
   → Serverless function validates → Resend API → Email sent
   → Response to user → Success message displayed
   ```

---

## Frontend Architecture

### Overview

The frontend is a **static website** exported from WordPress using HTTrack Website Copier. It consists of pre-rendered HTML pages with embedded CSS and JavaScript.

### Structure

```
public/
├── index.html                    # Homepage (main entry point)
├── index*.html                   # WordPress redirect artifacts (legacy)
├── wp-content/                   # WordPress theme assets
│   ├── themes/
│   │   └── growme/
│   │       ├── style.css         # Main stylesheet
│   │       ├── images/           # Theme images
│   │       └── js/               # Theme scripts
│   ├── plugins/                  # WordPress plugin assets
│   │   ├── elementor/            # Page builder CSS/JS
│   │   └── [other plugins]/
│   └── uploads/                  # User-uploaded content
├── services/                     # Service pages
│   ├── roof-repair/
│   ├── roof-replacement/
│   └── [other services]/
└── blog/                         # Blog posts
    └── [post-slug]/
        └── index.html
```

### Page Components

Each HTML page contains:

1. **Head Section** (`<head>`):
   - Meta tags (SEO)
   - Open Graph tags (social sharing)
   - Schema.org structured data (JSON-LD)
   - Stylesheet links
   - Script tags

2. **Header** (`<header>`):
   - Logo
   - Navigation menu
   - Contact information
   - Call-to-action buttons

3. **Main Content** (`<main>`):
   - Page-specific content
   - Elementor-generated sections
   - Contact forms
   - Service descriptions

4. **Footer** (`<footer>`):
   - Company information
   - Links (services, about, contact)
   - Social media links
   - Copyright notice

### JavaScript

**Location**: Inline in HTML or in `wp-content/themes/growme/js/`

**Key Functions**:
- Form validation
- Form submission to `/api/send-email`
- Navigation menu (mobile)
- Scroll animations
- Lazy loading

**Contact Form Example**:
```javascript
document.querySelector('#contact-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = {
    name: document.querySelector('#name').value,
    email: document.querySelector('#email').value,
    phone: document.querySelector('#phone').value,
    message: document.querySelector('#message').value
  };
  
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    
    if (response.ok) {
      // Show success message
    } else {
      // Show error message
    }
  } catch (error) {
    // Handle network error
  }
});
```

### CSS

**Architecture**:
- WordPress theme stylesheet (`wp-content/themes/growme/style.css`)
- Elementor plugin styles
- Additional plugin styles
- Inline styles (from WordPress)

**Issues** (see TODO):
- Multiple CSS files loaded (some unused)
- Inline styles mixed with external
- No CSS bundling/minification

---

## Backend Architecture

### Overview

The backend consists of **serverless functions** hosted on Vercel. These functions run on-demand when triggered by HTTP requests.

### Serverless Functions

**Location**: `api/` directory

#### `/api/send-email.js`

**Purpose**: Handle contact form submissions and send emails

**Method**: POST

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "555-1234",
  "address": "Calgary, AB",
  "service": "Roof Repair",
  "message": "I need help with..."
}
```

**Response (Success)**:
```json
{
  "success": true,
  "message": "Email sent successfully",
  "service": "resend"
}
```

**Response (Error)**:
```json
{
  "error": "Missing required fields: name and email are required"
}
```

**Function Flow**:
```javascript
1. Check request method (must be POST)
2. Extract form data from request body
3. Validate required fields (name, email)
4. Validate email format (regex)
5. Check for Resend API key
6. Prepare email data
7. Send emails via Resend (business + customer)
8. Return success response
9. (If error at any step, return error response)
```

#### Local Development Server

**File**: `server.js`

**Purpose**: Simulate Vercel environment locally

```javascript
const express = require('express');
const app = express();

// Serve static files from public/
app.use(express.static('public'));

// Email endpoint (same logic as api/send-email.js)
app.post('/api/send-email', async (req, res) => {
  // Same implementation as api/send-email.js
});

app.listen(3000);
```

---

## Email System

### Architecture

```
Contact Form
    │
    └─> POST /api/send-email
            │
            ├─> Validate form data
            │
            ├─> Prepare email content
            │
            └─> Resend API
                    │
                    ├─> Business notification email
                    │       └─> info@calgarycityroofing.com
                    │
                    └─> Customer confirmation email
                            └─> customer@email.com
```

### Email Templates

#### Business Notification Email

**To**: `BUSINESS_EMAIL` (info@calgarycityroofing.com)  
**From**: `FROM_EMAIL` (onboarding@resend.dev)  
**Subject**: 🚨 Contact Form Submission from [Name]

**Content**:
```html
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> John Doe</p>
<p><strong>Email:</strong> john@example.com</p>
<p><strong>Phone:</strong> 555-1234</p>
<p><strong>Address:</strong> Calgary, AB</p>
<p><strong>Service:</strong> Roof Repair</p>
<p><strong>Message:</strong> I need help with...</p>
```

#### Customer Confirmation Email

**To**: Customer's email  
**From**: `FROM_EMAIL` (onboarding@resend.dev)  
**Subject**: Thank you for contacting Calgary City Roofing

**Content**:
```html
<h2>Thank you for your inquiry!</h2>
<p>Hi [Name],</p>
<p>Thank you for contacting Calgary City Roofing & Exteriors...</p>
<p>We will review your request and get back to you within 24 hours.</p>
```

### Resend Configuration

**API Key**: Stored in environment variables
- Local: `.env.local` → `RESEND_API_KEY`
- Production: Vercel environment variables

**Rate Limits**:
- Free tier: 3,000 emails/month
- Daily limit: 100 emails/day

---

## Deployment Pipeline

### Git Workflow

```
Developer's Machine
    │
    ├─ Edit files
    ├─ Test locally (npm run dev)
    ├─ Commit changes (git commit)
    │
    └─> git push origin main
            │
            └─> GitHub Repository
                    │
                    └─> Webhook triggers Vercel
                            │
                            ├─> Build Process
                            │       ├─ Install dependencies (npm install)
                            │       ├─ No build needed (static files)
                            │       └─ Package serverless functions
                            │
                            └─> Deploy
                                    ├─ Static files → Edge Network (CDN)
                                    ├─ Serverless functions → Function runtime
                                    └─ Environment variables injected
                                            │
                                            └─> Live on www.calgarycityroofing.com
```

### Vercel Configuration

**File**: `vercel.json`

```json
{
  "functions": {
    "api/**": {
      "maxDuration": 10  // 10 second timeout for functions
    }
  },
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "X-Robots-Tag",
          "value": "noindex, nofollow"  // Don't index API endpoints
        }
      ]
    }
  ]
}
```

### Environment Variables

**Local** (`.env.local`):
```env
RESEND_API_KEY=re_xxxxx
BUSINESS_EMAIL=info@calgarycityroofing.com
FROM_EMAIL=onboarding@resend.dev
```

**Production** (Vercel Dashboard):
- Same variables configured in Vercel UI
- Encrypted and injected at runtime

---

## Data Flow

### 1. User Visits Website

```
User enters URL
    ↓
DNS lookup (calgarycityroofing.com → Vercel IP)
    ↓
Request routed to nearest Vercel Edge node
    ↓
CDN serves cached HTML file
    ↓
Browser loads HTML
    ↓
Browser requests CSS/JS/images
    ↓
CDN serves assets (cached)
    ↓
Page fully loaded
```

### 2. User Submits Contact Form

```
User fills form
    ↓
Client-side validation (JavaScript)
    ↓
Form data collected
    ↓
POST request to /api/send-email
    ↓
Request routed to Vercel serverless function
    ↓
Function validates data
    ↓
Function calls Resend API (2 emails)
    ↓
Resend sends emails
    ↓
Function returns success response
    ↓
JavaScript displays success message
    ↓
User sees confirmation
```

### 3. Error Handling Flow

```
Request → Serverless Function
    ↓
    ├─ Invalid method? → 405 Method Not Allowed
    ├─ Missing fields? → 400 Bad Request
    ├─ Invalid email? → 400 Bad Request
    ├─ API key missing? → 500 Internal Error
    ├─ Resend fails? → 500 Internal Error
    └─ All OK → 200 Success
```

---

## Technology Stack

### Frontend

| Technology | Purpose | Version |
|------------|---------|---------|
| HTML5 | Page structure | - |
| CSS3 | Styling | - |
| JavaScript | Interactivity | ES6+ |
| Elementor | Page builder (legacy) | - |

### Backend

| Technology | Purpose | Version |
|------------|---------|---------|
| Node.js | Runtime environment | 20.x |
| Express.js | Local dev server | 5.1.0 |
| Vercel Functions | Serverless runtime | - |

### Services

| Service | Purpose | Plan |
|---------|---------|------|
| Vercel | Hosting + Functions | Free |
| Resend | Email delivery | Free (3K/month) |
| GitHub | Version control | Free |

### Development

| Tool | Purpose |
|------|---------|
| Git | Version control |
| npm | Package management |
| dotenv | Environment variables |
| VS Code | Code editor (recommended) |

---

## File Organization

### Project Root

```
calgry-city-roofing/
│
├── api/                          # Serverless functions
│   ├── send-email.js            # Email handler
│   └── test-runtime.js          # Runtime testing
│
├── public/                       # Static website files
│   ├── index.html               # Homepage
│   ├── index*.html              # WordPress redirects (legacy)
│   ├── wp-content/              # WordPress assets
│   ├── services/                # Service pages
│   └── blog/                    # Blog posts
│
├── SEO/                         # SEO documentation
│   ├── README.md                # SEO guide
│   └── BLOG-GUIDE.md            # Blog management
│
├── server.js                    # Local Express server
├── package.json                 # Dependencies
├── vercel.json                  # Vercel config
├── .env.local                   # Local env vars (not in git)
├── .gitignore                   # Git ignore rules
├── README.md                    # Main documentation
├── CONTRIBUTING.md              # Contribution guidelines
└── ARCHITECTURE.md              # This file
```

### Dependencies

**Runtime Dependencies** (`dependencies`):
- `express`: ^5.1.0 - Web server for local development
- `resend`: ^2.1.0 - Email API client
- `dotenv`: ^17.2.3 - Environment variable loader

**Development Dependencies** (`devDependencies`):
- `serve`: ^14.2.5 - Simple static file server
- `vercel`: ^32.5.0 - Vercel CLI for local testing

---

## Security Considerations

### API Keys

- ✅ Stored in environment variables (never in code)
- ✅ Not committed to Git (in `.gitignore`)
- ✅ Different keys for local vs. production

### API Endpoints

- ✅ Input validation (all fields)
- ✅ Email format validation (regex)
- ✅ Rate limiting (Resend: 100/day)
- ⚠️ No CAPTCHA (see TODO)
- ⚠️ No request throttling (see TODO)

### Headers

- ✅ API endpoints not indexed by search engines
- ⚠️ No CORS restrictions (accepts all origins)
- ⚠️ No CSP headers (see TODO)

**Recommended Improvements**:
1. Add CAPTCHA to contact form
2. Add rate limiting per IP
3. Add CORS restrictions
4. Add Content Security Policy headers
5. Add HTTPS-only cookies if sessions added

---

## Performance Optimization

### Current State

- ✅ Static files cached by CDN
- ✅ Serverless functions (auto-scaling)
- ⚠️ No image optimization
- ⚠️ No CSS/JS minification
- ⚠️ Multiple CSS/JS files

### Recommended Improvements

1. **Images**:
   - Convert to WebP format
   - Add responsive images
   - Implement lazy loading
   - Add width/height attributes

2. **CSS/JS**:
   - Minify all files
   - Bundle related files
   - Remove unused CSS/JS
   - Defer non-critical JS

3. **HTML**:
   - Minify HTML
   - Remove WordPress comments
   - Clean up inline styles

4. **Caching**:
   - Add cache headers
   - Version CSS/JS files
   - Implement service worker

---

## Monitoring & Analytics

### Current Setup

- Google Analytics (embedded in pages)
- Google Tag Manager (embedded in pages)
- Vercel Analytics (available but not configured)

### Recommended Monitoring

1. **Application Monitoring**:
   - Vercel Analytics (track performance)
   - Sentry (error tracking)
   - LogRocket (session replay)

2. **Uptime Monitoring**:
   - UptimeRobot (free)
   - Pingdom (paid)

3. **Performance Monitoring**:
   - Google PageSpeed Insights
   - WebPageTest
   - Lighthouse CI

---

## Scalability

### Current Capacity

**Static Pages**:
- Unlimited (CDN-based)
- Sub-second load times globally
- No server to overload

**Serverless Functions**:
- Auto-scales with traffic
- 10-second timeout per request
- Concurrent execution limit (Vercel free tier)

**Email Service**:
- 3,000 emails/month (free tier)
- 100 emails/day limit
- Upgrade available if needed

### Growth Strategy

If traffic increases significantly:

1. **Stage 1** (current - 10K visits/month):
   - Current setup adequate
   - No changes needed

2. **Stage 2** (10K-100K visits/month):
   - Monitor email volume
   - Add page caching
   - Optimize images

3. **Stage 3** (100K+ visits/month):
   - Upgrade Resend plan if needed
   - Add CDN analytics
   - Consider paid Vercel plan
   - Add database if dynamic content needed

---

## Troubleshooting

### Common Issues

**Contact form not working**:
1. Check environment variables set
2. Verify Resend API key valid
3. Check browser console for errors
4. Check Vercel function logs

**Slow page load**:
1. Check PageSpeed Insights
2. Look for large images
3. Check for render-blocking resources
4. Verify CDN caching working

**Deployment failed**:
1. Check Vercel build logs
2. Verify package.json correct
3. Check for syntax errors
4. Ensure Node.js version correct

---

## Future Architecture

### Recommended Migration Path

**Phase 1: Clean up current system**
- Remove WordPress redirect files
- Fix duplicate headers
- Consolidate CSS/JS
- Optimize images

**Phase 2: Add build process**
- Introduce static site generator (Astro/Eleventy)
- Migrate blog to Markdown
- Auto-generate sitemap
- Add image optimization

**Phase 3: Enhance backend**
- Add request throttling
- Implement CAPTCHA
- Add form submission database
- Add email template system

**Phase 4: Improve monitoring**
- Add error tracking (Sentry)
- Add performance monitoring
- Add uptime monitoring
- Set up alerts

---

## Questions?

For more information:
- [README.md](README.md) - Project overview
- [CONTRIBUTING.md](CONTRIBUTING.md) - Development guidelines
- [SEO/README.md](SEO/README.md) - SEO documentation
- [SEO/BLOG-GUIDE.md](SEO/BLOG-GUIDE.md) - Blog management

---

**Last Updated**: March 2026
