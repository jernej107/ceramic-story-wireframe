# Kirby CMS Implementation Guide - TFstudio Ceramic Website

## Overview
This guide helps you implement the TFstudio ceramic website design in Kirby CMS with full mobile responsiveness and SEO optimization.

## File Structure
```
site/
├── templates/
│   └── home.php               # Main homepage template
├── snippets/
│   ├── header.php            # Header with navigation
│   └── footer.php            # Footer with links
└── blueprints/
    └── home.yml              # Content fields blueprint

assets/
├── css/
│   └── styles.css            # Complete stylesheet
├── images/
│   ├── hero-ceramics.jpg     # Hero background image
│   ├── ceramic-collection-1.jpg
│   ├── ceramic-collection-2.jpg
│   ├── ceramic-collection-3.jpg
│   ├── ceramic-process.jpg
│   └── second-chance-ceramics.jpg
└── js/
    └── app.js               # Optional JavaScript enhancements
```

## Kirby Blueprint (site/blueprints/home.yml)
```yaml
title: Homepage
icon: home

fields:
  content:
    type: blocks
    
  # Hero Section
  heroTitle:
    label: Hero Title
    type: text
    default: Handcrafted
    
  heroSubtitle:
    label: Hero Subtitle
    type: text
    default: Ceramic Art
    
  heroDescription:
    label: Hero Description
    type: textarea
    default: Discover unique, artisan-made ceramics that bring warmth and character to your home.
    
  heroImage:
    label: Hero Background Image
    type: files
    multiple: false
    
  # Collections Section
  collectionsTitle:
    label: Collections Title
    type: text
    default: NEW COLLECTIONS
    
  collectionsDescription:
    label: Collections Description
    type: textarea
    
  collections:
    label: Featured Collections
    type: structure
    fields:
      name:
        label: Collection Name
        type: text
      image:
        label: Collection Image
        type: files
        multiple: false
        
  # Journal Section
  journalTitle:
    label: Journal Title
    type: text
    default: Ceramic Journal
    
  journalDescription:
    label: Journal Description
    type: textarea
    
  journalPosts:
    label: Journal Posts
    type: structure
    fields:
      title:
        label: Post Title
        type: text
      excerpt:
        label: Post Excerpt
        type: textarea
      category:
        label: Category
        type: text
      date:
        label: Date
        type: date
      image:
        label: Featured Image
        type: files
        multiple: false
        
  # About Section
  aboutTitle:
    label: About Title
    type: text
    default: Our Ceramic Story
    
  aboutDescription:
    label: About Description
    type: textarea
    
  aboutImage:
    label: About Image
    type: files
    multiple: false
    
  yearsExperience:
    label: Years Experience
    type: text
    default: "8+"
    
  piecesCreated:
    label: Pieces Created
    type: text
    default: "500+"
    
  happyCustomers:
    label: Happy Customers
    type: text
    default: "200+"
    
  # Second Chance Section
  secondChanceTitle:
    label: Second Chance Title
    type: text
    default: Second Chance Ceramics
    
  secondChanceDescription:
    label: Second Chance Description
    type: textarea
    
  secondChanceImage:
    label: Second Chance Image
    type: files
    multiple: false
    
  # SEO Fields
  metaDescription:
    label: Meta Description
    type: textarea
    maxlength: 160
    
  metaKeywords:
    label: Meta Keywords
    type: text
    
  ogImage:
    label: Open Graph Image
    type: files
    multiple: false
```

## Site Configuration (site/config/config.php)
```php
<?php
return [
    'debug' => false,
    
    // Site settings
    'title' => 'TFstudio - Handcrafted Ceramic Art',
    'description' => 'Unique, artisan-made ceramics that bring warmth and character to your home.',
    'author' => 'TFstudio',
    'shopUrl' => 'https://shop.tfstudio.website',
    
    // SEO settings
    'meta' => [
        'title' => 'TFstudio - Handcrafted Ceramic Art',
        'description' => 'Discover unique, artisan-made ceramics. Each piece tells a story of craftsmanship and creativity.',
        'keywords' => 'ceramic art, handcrafted pottery, artisan ceramics, TFstudio'
    ],
    
    // Social media
    'social' => [
        'instagram' => 'https://instagram.com/tfstudio',
        'facebook' => 'https://facebook.com/tfstudio', 
        'email' => 'hello@tfstudio.website'
    ]
];
```

## Implementation Steps

### 1. Setup Kirby CMS
1. Download and install Kirby CMS
2. Create the file structure above
3. Copy the provided templates, snippets, and styles

### 2. Add Content Fields
1. Create the blueprint file `site/blueprints/home.yml`
2. Access the Kirby panel at `/panel`
3. Fill in the content fields with your ceramic business information

### 3. Upload Images
1. Upload all ceramic images to the `assets/images/` folder
2. Reference them in your content fields through the panel
3. Ensure images are optimized for web (JPEG format, compressed)

### 4. Mobile Optimizations Included
The design includes these mobile-responsive features:

**Navigation:**
- Collapsible mobile menu with hamburger icon
- Touch-friendly button sizes
- Proper spacing for mobile devices

**Layout:**
- Grid systems that adapt from 1 to 3 columns
- Flexible typography scaling (text-3xl to text-5xl)
- Responsive spacing (py-16 sm:py-20)
- Mobile-first approach with progressive enhancement

**Content Sections:**
- Collections header stacks vertically on mobile
- Hero content optimized for small screens
- Proper touch targets for all interactive elements

### 5. SEO Features Included
- Semantic HTML structure with proper heading hierarchy
- Meta tags for description, keywords, and author
- Open Graph and Twitter Card support
- Structured data for local business
- Canonical URLs
- Image alt attributes for accessibility
- Clean, crawlable URLs

### 6. Performance Optimizations
- CSS custom properties for consistent theming
- Minimal JavaScript for mobile menu functionality
- Optimized font loading with `font-display: swap`
- Lazy loading support for background images
- Efficient CSS without unnecessary framework bloat

## Customization Options

### Colors
Modify the CSS custom properties in `styles.css`:
```css
:root {
  --primary: 15 75% 50%;        /* Terracotta color */
  --background: 35 25% 97%;     /* Light cream */
  --foreground: 25 15% 15%;     /* Dark brown */
}
```

### Typography
Update font families in the CSS:
```css
:root {
  --font-display: 'Your Display Font', serif;
  --font-body: 'Your Body Font', sans-serif;
}
```

### Content
All content is editable through the Kirby panel, including:
- Hero section text and images
- Featured collections
- Journal posts
- About section statistics
- Contact information

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Progressive enhancement for older browsers
- Mobile-first responsive design
- Touch-friendly interactions

## Deployment
1. Upload files to your web server
2. Configure web server for Kirby CMS
3. Set proper file permissions
4. Update the shop URL in configuration
5. Test all functionality on mobile and desktop

This implementation provides a production-ready ceramic business website with excellent mobile responsiveness and SEO optimization, perfectly suited for Kirby CMS.