# SEO Documentation - Calgary City Roofing

## Overview

This document outlines the SEO strategy, implementation details, and maintenance guidelines for the Calgary City Roofing website.

## Current SEO Implementation

### Technical SEO

- ✅ Yoast SEO metadata from WordPress export
- ✅ Schema.org structured data (Organization, LocalBusiness)
- ✅ Open Graph tags for social sharing
- ✅ Twitter Card metadata
- ✅ Canonical URLs
- ✅ Mobile-responsive design
- ⚠️ Sitemap needs generation (see TODO)
- ⚠️ No robots.txt file

### On-Page SEO Elements

Each page includes:
- Meta title (in `<title>` tag)
- Meta description
- H1 heading (single, descriptive)
- Alt text for images (from WordPress)
- Internal linking structure
- Schema markup

## Target Keywords

### Primary Keywords

| Keyword | Volume | Difficulty | Target Page |
|---------|--------|------------|-------------|
| Calgary roofing | High | Medium | Homepage |
| Roofing Calgary | High | Medium | Homepage |
| Calgary roofer | Medium | Medium | Homepage |
| Roof repair Calgary | Medium | Low | Services page |
| Roof replacement Calgary | Medium | Low | Services page |

### Secondary Keywords

| Keyword | Volume | Difficulty | Target Page |
|---------|--------|------------|-------------|
| Calgary roof installation | Low | Low | Services page |
| Emergency roof repair Calgary | Low | Low | Emergency services |
| Residential roofing Calgary | Low | Low | Residential page |
| Commercial roofing Calgary | Low | Low | Commercial page |
| Shingle roofing Calgary | Low | Low | Materials page |

### Location-Based Keywords

- Calgary NE roofing
- Calgary NW roofing
- Calgary SE roofing
- Calgary SW roofing
- [Specific neighborhoods]

## Page-by-Page SEO

### Homepage (index.html)

**Current Title**: Roofing Calgary | City Roofing & Exteriors

**Current Meta Description**: City Roofing & Exteriors takes pride in being the #1 Calgary Roofing Company. Get a free quote for your roof replacement or repair.

**Target Keywords**: Calgary roofing, roofing Calgary, Calgary roofer

**Optimization Status**: ✅ Optimized

**Notes**:
- Title is 49 characters (good)
- Meta description is 138 characters (good)
- H1 should be "Expert Roofing Services in Calgary"
- Main CTA: "Get Free Quote"

### Services Pages

**Optimization Checklist**:
- [ ] Unique title per service
- [ ] Descriptive meta descriptions (150-155 chars)
- [ ] Service-specific keywords
- [ ] Clear H1 headings
- [ ] Service schema markup
- [ ] High-quality images with alt text
- [ ] Clear CTAs
- [ ] Internal links to related services

### Blog Posts

**Optimization Checklist**:
- [ ] Target long-tail keywords
- [ ] Answer specific questions
- [ ] 1,000+ words for pillar content
- [ ] Article schema markup
- [ ] Author information
- [ ] Publish date
- [ ] Featured image with alt text
- [ ] Internal links (3-5 per post)
- [ ] Related posts section

## Schema.org Structured Data

### Organization Schema (Homepage)

```json
{
  "@type": "Organization",
  "name": "City Roofings & Exteriors",
  "url": "https://www.calgarycityroofing.com/",
  "logo": "https://www.calgarycityroofing.com/wp-content/uploads/2018/08/City-roofing-exteriors-footer-logo.svg",
  "sameAs": [
    "https://www.facebook.com/Calgary-City-Roofing-Exteriors-285331045462847",
    "https://www.linkedin.com/company/calgary-city-roofing-exteriors/"
  ]
}
```

### LocalBusiness Schema (Add This!)

```json
{
  "@context": "https://schema.org",
  "@type": "RoofingContractor",
  "name": "Calgary City Roofing & Exteriors",
  "image": "https://www.calgarycityroofing.com/logo.jpg",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Your Street Address",
    "addressLocality": "Calgary",
    "addressRegion": "AB",
    "postalCode": "XXX XXX",
    "addressCountry": "CA"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "51.0447",
    "longitude": "-114.0719"
  },
  "url": "https://www.calgarycityroofing.com",
  "telephone": "+1-XXX-XXX-XXXX",
  "priceRange": "$$",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "08:00",
      "closes": "17:00"
    }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "XXX"
  }
}
```

**Action Required**: Add LocalBusiness schema to homepage

## SEO Maintenance Tasks

### Weekly

- [ ] Monitor Google Search Console for errors
- [ ] Check for broken links
- [ ] Review page speed scores
- [ ] Check mobile usability

### Monthly

- [ ] Review keyword rankings
- [ ] Publish 1-2 new blog posts
- [ ] Update outdated content
- [ ] Check competitor rankings
- [ ] Review and respond to online reviews

### Quarterly

- [ ] Full technical SEO audit
- [ ] Content gap analysis
- [ ] Backlink profile review
- [ ] Update target keyword list
- [ ] Refresh meta descriptions
- [ ] Update schema markup if needed

## Tools & Resources

### Essential SEO Tools

- **Google Search Console**: Monitor search performance
- **Google Analytics**: Track traffic and conversions
- **Google PageSpeed Insights**: Check page speed
- **Mobile-Friendly Test**: Verify mobile compatibility
- **Schema Markup Validator**: Test structured data

### Keyword Research

- Google Keyword Planner
- Ahrefs (paid)
- SEMrush (paid)
- Ubersuggest (freemium)
- AnswerThePublic

### Technical SEO

- Screaming Frog (crawling)
- GTmetrix (performance)
- WebPageTest (performance)
- Lighthouse (Chrome DevTools)

## Content Strategy

### Blog Post Ideas

**How-To Guides** (Target: Informational keywords)
- "How to Choose the Right Roofing Material for Calgary Climate"
- "What to Expect During a Roof Replacement in Calgary"
- "How to Prepare Your Home for a Roof Installation"
- "DIY Roof Inspection: What Calgary Homeowners Should Look For"

**Seasonal Content**
- "Spring Roof Maintenance Checklist for Calgary Homes"
- "How Calgary Winters Affect Your Roof"
- "Fall Roof Preparation: Getting Ready for Winter"

**Problem-Solving Content**
- "5 Signs Your Calgary Roof Needs Immediate Repair"
- "What to Do If You Have a Roof Leak in Calgary"
- "How to Handle Storm Damage to Your Calgary Roof"

**Comparison Content**
- "Asphalt vs. Metal Roofing: Which is Better for Calgary?"
- "Calgary Roofing Costs: 2026 Price Guide"
- "Insurance vs. Out-of-Pocket: Paying for Roof Repairs"

### Content Guidelines

**Word Count**:
- Homepage: 500-800 words
- Service pages: 800-1,200 words
- Blog posts: 1,000-2,000 words
- Pillar posts: 2,500+ words

**Structure**:
- Clear H1 (one per page)
- H2 subheadings every 300 words
- Short paragraphs (2-3 sentences)
- Bullet points for lists
- Images every 300-500 words

**Keywords**:
- Primary keyword in title
- Primary keyword in first paragraph
- Primary keyword in at least one H2
- Natural keyword density (1-2%)
- LSI keywords throughout

## Local SEO Strategy

### Google Business Profile

**Optimization Checklist**:
- [ ] Complete profile (100%)
- [ ] Add all service categories
- [ ] Upload 10+ photos
- [ ] Add service areas (Calgary neighborhoods)
- [ ] Post weekly updates
- [ ] Respond to all reviews within 24 hours
- [ ] Add Q&A answers

### Citations

Build consistent NAP (Name, Address, Phone) across:
- Yelp
- Yellow Pages Canada
- Better Business Bureau
- HomeStars
- Houzz
- Angi/HomeAdvisor
- Local directories

### Reviews

**Target**: 50+ reviews, 4.5+ star average

**Strategy**:
1. Email customers 1 week after job completion
2. Provide direct link to Google review
3. Offer incentive (discount on future service)
4. Respond to all reviews (positive and negative)

## Technical Issues to Fix

### High Priority

1. **Generate sitemap.xml**
   - Include all pages
   - Exclude WordPress redirects (index*.html)
   - Submit to Google Search Console

2. **Create robots.txt**
   ```
   User-agent: *
   Allow: /
   Disallow: /api/
   Disallow: /wp-content/plugins/
   
   Sitemap: https://www.calgarycityroofing.com/sitemap.xml
   ```

3. **Clean up duplicate pages**
   - 200+ WordPress redirect files
   - Implement 301 redirects
   - Update internal links

4. **Fix canonical URLs**
   - Ensure all pages have proper canonical tags
   - Point redirects to final destination

### Medium Priority

5. **Optimize images**
   - Convert to WebP format
   - Add width/height attributes
   - Implement lazy loading
   - Compress file sizes

6. **Improve page speed**
   - Minify CSS/JS
   - Defer non-critical JavaScript
   - Optimize Core Web Vitals
   - Target: 90+ PageSpeed score

7. **Add breadcrumbs**
   - Help with navigation
   - Improve internal linking
   - Add BreadcrumbList schema

## Competitor Analysis

### Top Competitors

| Competitor | Domain Authority | Strategy | Strengths |
|------------|------------------|----------|-----------|
| Competitor 1 | XX | SEO + PPC | Strong blog |
| Competitor 2 | XX | PPC heavy | Google Ads |
| Competitor 3 | XX | Local SEO | Reviews |

**Action Items**:
- [ ] Analyze competitor keyword targeting
- [ ] Review competitor content topics
- [ ] Identify content gaps
- [ ] Monitor competitor backlinks

## Conversion Optimization

### Key Metrics

- Organic traffic: XXX/month (current)
- Conversion rate: X% (current)
- Top converting pages:
  1. Homepage
  2. Roof repair page
  3. Contact page

### CTA Optimization

**Current CTAs**:
- "Get Free Quote" (primary)
- "Call Now" (phone)
- "Contact Us" (form)

**A/B Test Ideas**:
- CTA button color (current vs. alternative)
- CTA copy ("Get Free Quote" vs. "Free Estimate")
- CTA placement (above fold vs. sticky header)
- Form length (short vs. detailed)

## Reporting

### Monthly SEO Report

Include:
1. **Traffic Metrics**
   - Organic sessions
   - New vs. returning users
   - Top landing pages
   - Bounce rate

2. **Ranking Changes**
   - Target keyword positions
   - New rankings
   - Lost rankings

3. **Conversions**
   - Contact form submissions
   - Phone calls
   - Conversion rate

4. **Technical Health**
   - Crawl errors
   - Page speed scores
   - Mobile usability issues

5. **Actions Taken**
   - New content published
   - Technical fixes completed
   - Links acquired

6. **Next Month Goals**
   - Specific keyword targets
   - Content to create
   - Technical improvements

---

## Quick Reference

### Meta Title Best Practices
- 50-60 characters
- Include primary keyword
- Include location (Calgary)
- Brand name at end
- Example: "Roof Repair Calgary | Fast & Reliable | City Roofing"

### Meta Description Best Practices
- 150-155 characters
- Include primary keyword
- Include call-to-action
- Summarize page content
- Example: "Expert roof repair in Calgary. Fast response, quality work, fair pricing. Serving Calgary for 20+ years. Get your free quote today!"

### Image Alt Text Best Practices
- Descriptive and concise
- Include keyword if relevant
- No keyword stuffing
- Example: "Calgary roofing contractor installing asphalt shingles on residential home"

---

**Last Updated**: March 2026
**Next Review**: June 2026
