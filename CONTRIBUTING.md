# Contributing to Calgary City Roofing Website

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Standards](#code-standards)
- [Testing Guidelines](#testing-guidelines)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Pull Request Process](#pull-request-process)
- [Common Tasks](#common-tasks)

---

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- Git
- Code editor (VS Code recommended)
- Basic knowledge of HTML, CSS, JavaScript

### First-Time Setup

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/your-username/calgry-city-roofing.git
   cd calgry-city-roofing
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create `.env.local`:
   ```env
   RESEND_API_KEY=re_your_test_key_here
   BUSINESS_EMAIL=test@example.com
   FROM_EMAIL=onboarding@resend.dev
   ```

4. **Start development server**
   ```bash
   npm run dev
   # Visit http://localhost:3000
   ```

5. **Verify setup**
   - Homepage loads correctly
   - Navigation works
   - Contact form displays (don't test submission yet)

---

## Development Workflow

### Branching Strategy

We use a feature branch workflow:

```
main (production)
  └── feature/your-feature
  └── fix/your-fix
  └── docs/your-docs
```

### Branch Naming Conventions

| Type | Prefix | Example |
|------|--------|---------|
| New feature | `feature/` | `feature/add-testimonials` |
| Bug fix | `fix/` | `fix/contact-form-validation` |
| Documentation | `docs/` | `docs/update-readme` |
| Refactoring | `refactor/` | `refactor/email-service` |
| Performance | `perf/` | `perf/optimize-images` |

### Typical Workflow

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make changes**
   - Edit files
   - Test locally
   - Commit incrementally

3. **Keep branch updated**
   ```bash
   git fetch origin
   git rebase origin/main
   ```

4. **Push changes**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Open Pull Request**
   - Go to GitHub
   - Create PR from your branch to `main`
   - Fill in PR template
   - Request review

---

## Code Standards

### HTML

**Guidelines**:
- Maintain existing WordPress/Elementor structure
- Use semantic HTML5 elements
- Add meaningful `id` and `class` attributes
- Include alt text for all images
- Keep accessibility in mind (ARIA labels)

**Example**:
```html
<!-- Good -->
<section id="services" class="services-section">
  <h2 class="section-heading">Our Services</h2>
  <img src="roofing.jpg" alt="Calgary roofing installation service" />
</section>

<!-- Bad -->
<div>
  <div>Our Services</div>
  <img src="roofing.jpg" /> <!-- Missing alt text -->
</div>
```

### CSS

**Guidelines**:
- Don't modify WordPress theme CSS directly
- Add custom CSS in separate file
- Use existing class naming conventions
- Prefer classes over IDs for styling
- Keep specificity low

**Example**:
```css
/* Good */
.custom-cta-button {
  background-color: #007bff;
  padding: 12px 24px;
  border-radius: 4px;
}

/* Bad */
#header div.container ul li a.button {
  /* Too specific */
}
```

### JavaScript

**Guidelines**:
- Use modern ES6+ syntax
- Use `const` and `let`, avoid `var`
- Add comments for complex logic
- Handle errors gracefully
- Validate user input

**Example**:
```javascript
// Good
const submitContactForm = async (formData) => {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    
    if (!response.ok) {
      throw new Error('Submission failed');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// Bad
var submit = function(data) {
  // No error handling
  fetch('/api/send-email', {
    method: 'POST',
    body: data
  });
}
```

### Serverless Functions (API)

**Guidelines**:
- Always validate input
- Return proper HTTP status codes
- Log errors for debugging
- Handle timeouts gracefully
- Don't expose sensitive data in responses

**Example**:
```javascript
module.exports = async function handler(req, res) {
  // Check method
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Validate input
    const { email } = req.body;
    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Invalid email' });
    }

    // Process request
    // ...

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
```

---

## Testing Guidelines

### Manual Testing Checklist

Before submitting a PR, test:

#### Visual Testing
- [ ] Page loads correctly on desktop
- [ ] Page loads correctly on mobile (375px width)
- [ ] Page loads correctly on tablet (768px width)
- [ ] All images load
- [ ] No layout breaks
- [ ] Fonts render correctly

#### Functional Testing
- [ ] All links work (internal and external)
- [ ] Navigation menu works
- [ ] Contact form displays correctly
- [ ] Form validation works
- [ ] Error messages display properly
- [ ] Success messages display properly

#### Cross-Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (if on Mac)
- [ ] Edge (latest)

#### Contact Form Testing (Use Test API Key!)

```bash
# Test with curl
curl -X POST http://localhost:3000/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "555-1234",
    "message": "Test message"
  }'
```

Expected response:
```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

### Automated Testing (Future)

Once testing framework is added:
```bash
# Run unit tests
npm test

# Run E2E tests
npm run test:e2e
```

---

## Commit Message Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/) format:

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

| Type | Description | Example |
|------|-------------|---------|
| `feat` | New feature | `feat(contact): add phone validation` |
| `fix` | Bug fix | `fix(email): handle empty subject line` |
| `docs` | Documentation | `docs(readme): update setup instructions` |
| `style` | Code style (no functional change) | `style(css): format contact form styles` |
| `refactor` | Code refactoring | `refactor(api): extract email templates` |
| `perf` | Performance improvement | `perf(images): add lazy loading` |
| `test` | Add/update tests | `test(email): add API endpoint tests` |
| `chore` | Maintenance tasks | `chore(deps): update dependencies` |

### Examples

**Simple commit**:
```bash
git commit -m "fix(email): validate email format before sending"
```

**Detailed commit**:
```bash
git commit -m "feat(contact): add CAPTCHA to contact form

- Add hCaptcha widget to form
- Validate token on backend
- Add error handling for failed validation
- Update tests

Closes #42"
```

### Best Practices

- Use present tense ("add" not "added")
- Keep subject line under 50 characters
- Capitalize first letter of subject
- No period at end of subject
- Add body for complex changes
- Reference issue numbers in footer

---

## Pull Request Process

### Before Creating PR

1. **Update your branch**
   ```bash
   git fetch origin
   git rebase origin/main
   ```

2. **Test thoroughly**
   - Run all manual tests
   - Check on multiple browsers
   - Test on mobile device

3. **Review your changes**
   ```bash
   git diff origin/main
   ```

4. **Clean up commits** (optional)
   ```bash
   git rebase -i origin/main
   # Squash "fix typo" commits into main commits
   ```

### Creating the PR

1. **Push your branch**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Go to GitHub and create PR**

3. **Fill in PR template**:
   ```markdown
   ## Description
   Brief description of changes
   
   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Documentation update
   - [ ] Refactoring
   
   ## Testing
   How to test this PR
   
   ## Screenshots (if applicable)
   Before/after screenshots
   
   ## Checklist
   - [ ] Code follows style guidelines
   - [ ] Self-review completed
   - [ ] Comments added for complex code
   - [ ] No new warnings generated
   - [ ] Tested on multiple browsers
   - [ ] Tested on mobile
   ```

4. **Request review**
   - Add reviewers
   - Link related issues
   - Add labels

### After Creating PR

1. **Respond to review comments**
   - Address all feedback
   - Push additional commits if needed

2. **Keep PR updated**
   ```bash
   git fetch origin
   git rebase origin/main
   git push --force-with-lease
   ```

3. **Wait for approval**
   - At least 1 approval required
   - All checks must pass

4. **Merge**
   - Squash and merge (preferred)
   - Or merge commit (for feature branches with multiple contributors)

---

## Common Tasks

### Updating SEO Metadata

**File**: `public/index.html` (or respective page)

**Location**: `<head>` section (lines 1-100)

**What to update**:
```html
<!-- Page title -->
<title>Your New Title | City Roofing</title>

<!-- Meta description -->
<meta name="description" content="Your description (155 chars max)" />

<!-- Open Graph -->
<meta property="og:title" content="Your Title" />
<meta property="og:description" content="Your description" />
```

**Test**: Use [metatags.io](https://metatags.io/) to preview

### Adding a New Service Page

1. **Create HTML file**
   ```bash
   public/services/your-service/index.html
   ```

2. **Copy template from existing service page**
   ```bash
   cp public/services/roof-repair/index.html public/services/your-service/index.html
   ```

3. **Update content**
   - Change title
   - Update meta description
   - Replace body content
   - Update internal links

4. **Add to navigation**
   - Edit header navigation in main pages
   - Add to sitemap (when generated)

### Updating Contact Form

**Frontend**: `public/index.html` (search for "contact form")

**Backend**: `api/send-email.js`

**Testing**:
```javascript
// Add test mode in send-email.js
if (process.env.NODE_ENV === 'development') {
  console.log('Would send email:', emailData);
  return res.status(200).json({ success: true, test: true });
}
```

### Adding Images

1. **Optimize image first**
   - Use [TinyPNG](https://tinypng.com/) or ImageOptim
   - Convert to WebP if possible
   - Target: < 200KB per image

2. **Add to public folder**
   ```bash
   public/images/your-image.jpg
   ```

3. **Use in HTML**
   ```html
   <img 
     src="/images/your-image.jpg" 
     alt="Descriptive alt text for SEO"
     width="800" 
     height="600"
     loading="lazy"
   />
   ```

### Debugging Email Function

**View logs locally**:
```bash
npm run dev
# Check terminal output when form is submitted
```

**View logs on Vercel**:
```bash
vercel logs
# Or visit Vercel dashboard → Project → Logs
```

**Common issues**:
- API key not set (check `.env.local`)
- CORS errors (check request origin)
- Rate limiting (Resend: 100 emails/day on free plan)
- Invalid email format (add frontend validation)

---

## Getting Help

### Documentation

- Main README: [README.md](README.md)
- SEO docs: [SEO/README.md](SEO/README.md)
- This guide: [CONTRIBUTING.md](CONTRIBUTING.md)

### Communication

- **Questions**: Open GitHub Discussion
- **Bug reports**: Create GitHub Issue
- **Feature requests**: Create GitHub Issue with `enhancement` label
- **Security issues**: Email directly (don't open public issue)

### Issue Templates

When creating an issue, use these templates:

**Bug Report**:
```markdown
## Bug Description
Clear description of the bug

## Steps to Reproduce
1. Go to...
2. Click on...
3. See error

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- Browser: Chrome 120
- Device: Desktop
- OS: Windows 11
```

**Feature Request**:
```markdown
## Feature Description
Clear description of the feature

## Use Case
Why this feature is needed

## Proposed Solution
How you think it should work

## Alternatives Considered
Other ways to solve this problem
```

---

## Code of Conduct

### Our Standards

- Be respectful and inclusive
- Accept constructive criticism gracefully
- Focus on what's best for the project
- Show empathy towards others

### Unacceptable Behavior

- Harassment or discriminatory comments
- Trolling or insulting comments
- Public or private harassment
- Publishing others' private information

### Enforcement

Violations will result in:
1. Warning
2. Temporary ban
3. Permanent ban

---

## Recognition

Contributors will be recognized in:
- GitHub contributors page
- Release notes (for significant contributions)
- Company website (optional, with permission)

---

## Questions?

If you have questions not covered here:
1. Check [README.md](README.md)
2. Search existing GitHub issues
3. Open a new GitHub Discussion
4. Reach out to maintainers

---

**Thank you for contributing!** 🎉

Every contribution, no matter how small, helps make this project better.
