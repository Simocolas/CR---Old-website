# Blog Management Guide

This guide explains how to add and manage blog posts for the Calgary City Roofing website.

## Current Blog System

The blog system is part of the WordPress export and consists of static HTML pages. Each blog post is a standalone HTML file in a subdirectory under `public/`.

### Blog Structure

```
public/
├── blog/
│   ├── roof-maintenance-guide/
│   │   └── index.html
│   ├── winter-roofing-tips/
│   │   └── index.html
│   └── [other posts]/
└── [other pages]/
```

---

## Adding a New Blog Post

### Method 1: Manual HTML Creation (Current System)

#### Step 1: Create Directory Structure

```bash
# Create new blog post directory
mkdir -p public/blog/your-post-slug

# Create the HTML file
touch public/blog/your-post-slug/index.html
```

#### Step 2: Copy Template

Option A - Copy from existing post:
```bash
# Find an existing blog post
cp public/blog/roof-maintenance-guide/index.html public/blog/your-post-slug/index.html
```

Option B - Use the template below (recommended)

#### Step 3: Edit Content

Open `public/blog/your-post-slug/index.html` and update:

1. **Meta tags** (in `<head>` section)
2. **Article title** (H1)
3. **Article content** (body)
4. **Author information**
5. **Publish date**
6. **Featured image**
7. **Categories/tags**

#### Step 4: Test Locally

```bash
npm run dev
# Visit http://localhost:3000/blog/your-post-slug/
```

#### Step 5: Commit and Deploy

```bash
git add public/blog/your-post-slug/
git commit -m "feat(blog): add post about [topic]"
git push origin main
```

---

## Blog Post Template

Use this template for new blog posts:

```html
<!DOCTYPE html>
<html lang="en-US">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- SEO Meta Tags -->
    <title>Your Blog Post Title | Calgary City Roofing Blog</title>
    <meta name="description" content="Your meta description (150-155 characters max)">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="https://www.calgarycityroofing.com/blog/your-post-slug/">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="article">
    <meta property="og:url" content="https://www.calgarycityroofing.com/blog/your-post-slug/">
    <meta property="og:title" content="Your Blog Post Title">
    <meta property="og:description" content="Your meta description">
    <meta property="og:image" content="https://www.calgarycityroofing.com/images/blog/your-featured-image.jpg">
    <meta property="article:published_time" content="2026-03-16T00:00:00+00:00">
    <meta property="article:author" content="Calgary City Roofing">
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:url" content="https://www.calgarycityroofing.com/blog/your-post-slug/">
    <meta name="twitter:title" content="Your Blog Post Title">
    <meta name="twitter:description" content="Your meta description">
    <meta name="twitter:image" content="https://www.calgarycityroofing.com/images/blog/your-featured-image.jpg">
    
    <!-- Schema.org Article Markup -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": "Your Blog Post Title",
      "description": "Your meta description",
      "image": "https://www.calgarycityroofing.com/images/blog/your-featured-image.jpg",
      "author": {
        "@type": "Organization",
        "name": "Calgary City Roofing & Exteriors"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Calgary City Roofing & Exteriors",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.calgarycityroofing.com/logo.png"
        }
      },
      "datePublished": "2026-03-16",
      "dateModified": "2026-03-16"
    }
    </script>
    
    <!-- Stylesheets -->
    <link rel="stylesheet" href="/wp-content/themes/growme/style.css">
</head>
<body class="blog-post">
    
    <!-- Header (Copy from existing page) -->
    <header class="site-header">
        <!-- Navigation, logo, etc. -->
    </header>
    
    <!-- Article Content -->
    <main class="blog-content">
        <article class="blog-post-article">
            <!-- Featured Image -->
            <div class="featured-image">
                <img 
                    src="/images/blog/your-featured-image.jpg" 
                    alt="Descriptive alt text for SEO"
                    width="1200"
                    height="630"
                >
            </div>
            
            <!-- Article Header -->
            <header class="article-header">
                <h1 class="article-title">Your Blog Post Title</h1>
                <div class="article-meta">
                    <span class="date">March 16, 2026</span>
                    <span class="author">By Calgary City Roofing</span>
                    <span class="category">Roof Maintenance</span>
                </div>
            </header>
            
            <!-- Article Body -->
            <div class="article-body">
                <p class="intro">
                    Your introductory paragraph. Make it engaging and include your target keyword
                    naturally in the first 100 words.
                </p>
                
                <h2>First Main Section</h2>
                <p>
                    Your content here. Keep paragraphs short (2-3 sentences). Use subheadings
                    every 300 words to break up the text.
                </p>
                
                <h3>Subsection</h3>
                <p>More detailed content...</p>
                
                <ul>
                    <li>Bullet point 1</li>
                    <li>Bullet point 2</li>
                    <li>Bullet point 3</li>
                </ul>
                
                <h2>Second Main Section</h2>
                <p>Continue your content...</p>
                
                <img 
                    src="/images/blog/supporting-image.jpg" 
                    alt="Descriptive alt text"
                    width="800"
                    height="500"
                    loading="lazy"
                >
                
                <h2>Conclusion</h2>
                <p>
                    Summarize your main points and include a call-to-action. For example:
                    "Need help with your Calgary roofing project? Contact us for a free quote!"
                </p>
            </div>
            
            <!-- Call to Action -->
            <div class="article-cta">
                <h3>Need Roofing Services in Calgary?</h3>
                <p>Get a free, no-obligation quote from Calgary's trusted roofing experts.</p>
                <a href="/contact/" class="btn btn-primary">Get Free Quote</a>
            </div>
            
            <!-- Related Posts (Optional) -->
            <aside class="related-posts">
                <h3>Related Articles</h3>
                <div class="related-posts-grid">
                    <a href="/blog/related-post-1/">
                        <img src="/images/blog/related-1.jpg" alt="Related post 1">
                        <h4>Related Post Title 1</h4>
                    </a>
                    <a href="/blog/related-post-2/">
                        <img src="/images/blog/related-2.jpg" alt="Related post 2">
                        <h4>Related Post Title 2</h4>
                    </a>
                </div>
            </aside>
        </article>
    </main>
    
    <!-- Footer (Copy from existing page) -->
    <footer class="site-footer">
        <!-- Footer content -->
    </footer>
    
</body>
</html>
```

---

## Blog Post Checklist

Before publishing, verify:

### Content
- [ ] Title under 60 characters
- [ ] Meta description 150-155 characters
- [ ] Target keyword in first paragraph
- [ ] 1,000+ words (1,500-2,000 recommended)
- [ ] Clear H2 headings every 300 words
- [ ] Short paragraphs (2-3 sentences)
- [ ] Bullet points or numbered lists
- [ ] Call-to-action at end

### Images
- [ ] Featured image (1200x630px recommended)
- [ ] Featured image < 200KB
- [ ] Alt text on all images
- [ ] Width/height attributes set
- [ ] Lazy loading on supporting images
- [ ] 2-3 supporting images throughout post

### SEO
- [ ] Unique title tag
- [ ] Unique meta description
- [ ] Canonical URL set correctly
- [ ] Open Graph tags complete
- [ ] Twitter Card tags complete
- [ ] Article schema markup included
- [ ] Internal links to related pages (3-5)
- [ ] External links open in new tab

### Technical
- [ ] Tests in local environment
- [ ] Mobile-responsive
- [ ] All links work
- [ ] Images load correctly
- [ ] No console errors
- [ ] PageSpeed score > 80

---

## Blog SEO Best Practices

### Keyword Research

Before writing, research:
1. **Primary keyword**: Main topic (e.g., "Calgary roof maintenance")
2. **Secondary keywords**: Related topics (e.g., "roof inspection", "gutter cleaning")
3. **Long-tail keywords**: Specific phrases (e.g., "how often should I inspect my Calgary roof")

Tools:
- Google Keyword Planner
- AnswerThePublic
- Google Search autocomplete
- "People also ask" boxes

### On-Page SEO

**Title Optimization**:
```
Primary Keyword | Secondary Benefit | Brand
Example: "Calgary Roof Maintenance Guide | Extend Roof Life | City Roofing"
```

**First Paragraph**:
- Include primary keyword in first 100 words
- Answer the main question immediately
- Hook the reader

**Headings (H2/H3)**:
- Include keywords naturally
- Make them descriptive
- Use question format when appropriate

**Internal Linking**:
- Link to 3-5 related pages
- Use descriptive anchor text
- Link to service pages when relevant
- Link to other blog posts

**External Linking**:
- Link to authoritative sources
- Support claims with data
- Open in new tab (`target="_blank"`)

### Content Structure

**Introduction (100-150 words)**:
- State the problem
- Promise a solution
- Include primary keyword

**Body (800-1,500 words)**:
- Break into clear sections (H2)
- Use subheadings (H3) for subsections
- Short paragraphs
- Bullet points and lists
- Images every 300-500 words

**Conclusion (100-150 words)**:
- Summarize key points
- Call-to-action
- Link to contact/service page

---

## Blog Post Ideas (By Category)

### Maintenance Guides
- "Spring Roof Maintenance Checklist for Calgary Homeowners"
- "How Often Should You Inspect Your Roof in Calgary?"
- "DIY Roof Inspection: What to Look For"
- "Seasonal Roof Maintenance: Calgary Weather Edition"

### Problem-Solving
- "5 Signs Your Calgary Roof Needs Immediate Repair"
- "How to Handle a Roof Emergency in Calgary"
- "What to Do If You Find a Roof Leak"
- "Storm Damage: Insurance Claim Process in Calgary"

### Educational
- "Roofing Materials Guide: Best Options for Calgary Climate"
- "Understanding Calgary Roofing Permits and Regulations"
- "What to Expect During a Roof Replacement"
- "Roofing Terminology: A Homeowner's Glossary"

### Comparisons
- "Asphalt vs. Metal: Which Roofing is Better for Calgary?"
- "DIY vs. Professional Roof Repair: Which Should You Choose?"
- "Roof Repair vs. Replacement: How to Decide"

### Seasonal
- "Preparing Your Calgary Roof for Winter"
- "Fall Roof Maintenance: Getting Ready for Snow"
- "How Calgary Winters Affect Your Roof"
- "Spring Thaw: Preventing Ice Dam Damage"

### Cost Guides
- "Calgary Roofing Costs: 2026 Price Guide"
- "How to Save Money on Roof Replacement in Calgary"
- "Is Roof Repair or Replacement More Cost-Effective?"
- "Roofing Insurance: What's Covered in Calgary?"

---

## Blog Promotion

After publishing a new post:

### Social Media
- [ ] Share on Facebook
- [ ] Share on LinkedIn
- [ ] Share on Twitter/X
- [ ] Share in relevant Facebook groups
- [ ] Share in local Calgary community groups

### Email Marketing
- [ ] Add to newsletter
- [ ] Send to email subscribers
- [ ] Include in monthly digest

### Internal Promotion
- [ ] Add to blog list page
- [ ] Link from homepage (if featured)
- [ ] Add to related posts on other blogs
- [ ] Link from relevant service pages

### External Promotion
- [ ] Submit to Google for indexing
- [ ] Share in Calgary forums
- [ ] Answer related questions on Reddit/Quora
- [ ] Reach out for backlinks

---

## Blog Maintenance

### Monthly Tasks
- [ ] Review analytics for top posts
- [ ] Update outdated information
- [ ] Fix broken links
- [ ] Refresh images if needed
- [ ] Respond to comments (if enabled)

### Quarterly Tasks
- [ ] Full content audit
- [ ] Update SEO metadata
- [ ] Refresh old posts with new info
- [ ] Add new internal links
- [ ] Check for keyword cannibalization

### Annual Tasks
- [ ] Review entire blog strategy
- [ ] Archive or remove poor-performing posts
- [ ] Consolidate similar posts
- [ ] Major redesign if needed

---

## Measuring Success

### Key Metrics

Track these for each post:

**Traffic**:
- Pageviews
- Unique visitors
- Average time on page
- Bounce rate

**Engagement**:
- Scroll depth
- Clicks on CTA
- Social shares
- Comments

**Conversions**:
- Contact form submissions from post
- Phone calls attributed to post
- Quote requests

**SEO**:
- Google rankings for target keywords
- Impressions in search results
- Click-through rate from search

### Tools

- Google Analytics: Traffic and behavior
- Google Search Console: Search performance
- Hotjar: User behavior and heatmaps
- Google Tag Manager: Track specific events

---

## Future Blog System (Recommended)

The current manual HTML system works but has limitations. Consider migrating to:

### Option 1: Static Site Generator

**Astro** (Recommended):
- Write posts in Markdown
- Automatic blog list generation
- Fast build times
- Easy to migrate from WordPress

**Eleventy** (Alternative):
- Flexible templating
- Great for blogs
- Large community

### Option 2: Headless CMS

**Contentful/Sanity**:
- Visual editor for non-technical users
- API-driven content
- Version control
- Scheduled publishing

**WordPress Headless**:
- Keep WordPress as CMS
- Use Next.js for frontend
- Best of both worlds

### Migration Path

1. **Phase 1**: Document current blog structure
2. **Phase 2**: Choose new system
3. **Phase 3**: Create migration script
4. **Phase 4**: Migrate posts (can do gradually)
5. **Phase 5**: Set up redirects from old URLs
6. **Phase 6**: Test thoroughly
7. **Phase 7**: Deploy new system

---

## Resources

### Writing Tools
- Grammarly (grammar checking)
- Hemingway App (readability)
- CoSchedule Headline Analyzer (titles)
- WordCounter (word count)

### SEO Tools
- Yoast SEO (WordPress plugin, for reference)
- Rank Math (alternative)
- SEMrush Writing Assistant
- Clearscope (content optimization)

### Image Tools
- Canva (featured images)
- Unsplash (stock photos)
- TinyPNG (compression)
- Photopea (image editing)

---

## Questions?

See main documentation:
- [README.md](../README.md) - General project info
- [SEO/README.md](README.md) - SEO guidelines
- [CONTRIBUTING.md](../CONTRIBUTING.md) - Development guidelines

---

**Happy blogging!** 📝
