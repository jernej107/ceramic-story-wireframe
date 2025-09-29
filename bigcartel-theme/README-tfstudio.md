# TFstudio Big Cartel Theme

A sophisticated Big Cartel theme inspired by the beautiful TFstudio ceramic website aesthetic. This theme brings the same elegant design system and ceramic studio feel to your Big Cartel store.

## ✨ Features

### Design System
- **Color Palette**: Sage green (#a39f8e) and cream (#f0eae5) with dark text (#1d1d1b)
- **Typography**: Alan Sans font family for a clean, modern look
- **Ceramic Effects**: Soft shadows and gradients inspired by ceramic textures
- **Responsive Design**: Beautiful on all devices from mobile to desktop

### Key Components
- **Hero Section**: Eye-catching gradient background with call-to-action
- **Product Cards**: Elegant cards with hover effects and ceramic shadows
- **Navigation**: Clean sidebar navigation with organized categories
- **Product Pages**: Spacious layouts with beautiful image galleries
- **Cart Experience**: Streamlined shopping cart with TFstudio styling
- **SEO Optimized**: Proper meta tags, structured data, and semantic HTML

## 🚀 Installation

### Step 1: Enable Custom CSS
Your Big Cartel store needs a **Premium plan** to use custom CSS.

### Step 2: Apply Custom Styles
1. Go to your Big Cartel admin panel
2. Navigate to **Design** → **Edit HTML & CSS**
3. Replace the contents of your CSS file with the `theme-tfstudio.css` content

### Step 3: Update Theme Templates
Replace your existing template files with the TFstudio versions:
- `layout.html` → Use `layout-tfstudio.html`
- `home.html` → Use `home-tfstudio.html`
- `product.html` → Use `product-tfstudio.html`

### Step 4: Configure Theme Settings
Apply the color scheme and settings from `settings-tfstudio.json`:
- Background color: `#f0eae5`
- Primary colors: `#a39f8e`
- Text color: `#1d1d1b`
- Border radius: `12px`
- Font: Alan Sans

## 🎨 Customization

### Colors
Customize the color palette by updating these CSS variables in the `:root` section:

```css
:root {
  /* TFstudio Color Palette */
  --sage: #a39f8e;           /* Primary sage green */
  --cream: #f0eae5;          /* Background cream */
  --dark-text: #1d1d1b;      /* Text color */
  --warm-peach: #e7b099;     /* Accent color */
}
```

### Fonts
Change fonts by updating the font imports and variables:

```css
/* Change font import */
@import url('https://fonts.googleapis.com/css2?family=YourFont:wght@300;400;500;700&display=swap');

/* Update font variables */
--header-font: 'YourFont', sans-serif;
--body-font: 'YourFont', sans-serif;
```

### Layout
Adjust layout elements:

```css
/* Container widths */
.page {
  max-width: 1200px; /* Change max content width */
}

/* Product grid */
.product-list {
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); /* Adjust product card size */
}
```

## 📁 Template Structure

### `layout-tfstudio.html`
- Site wrapper with TFstudio navigation and footer
- SEO optimization with proper meta tags
- Structured data for better search visibility
- Mobile-responsive navigation
- Social media integration

### `home-tfstudio.html`
- Hero section with gradient background
- Featured products display
- Product categories section
- Newsletter signup integration

### `product-tfstudio.html`
- Image gallery with carousel
- Product details and options
- Add to cart functionality
- Related products section

### `theme-tfstudio.css`
- Complete design system
- TFstudio color palette and typography
- Responsive grid layouts
- Hover effects and animations
- Mobile optimization

### `settings-tfstudio.json`
- Pre-configured theme settings
- TFstudio color scheme
- Typography settings
- Layout preferences

## 🎯 Design Principles

### Color Usage
- **Sage Green (#a39f8e)**: Primary color for buttons, hovers, and accents
- **Cream (#f0eae5)**: Background and card backgrounds
- **Dark Text (#1d1d1b)**: All text content for optimal readability
- **Warm Peach (#e7b099)**: Accent color for special sections

### Typography Hierarchy
- **H1**: 2.5rem - Page titles and hero headings
- **H2**: 2rem - Section headings
- **H3**: 1.5rem - Subsection headings
- **Body**: 1rem - Regular content
- **Font Weight**: 400 (regular) and 500 (medium) for hierarchy

### Spacing & Layout
- **Border Radius**: 12px (0.75rem) for consistent rounded corners
- **Shadows**: Ceramic-inspired soft shadows for depth
- **Grid**: Responsive grid layout for products and content
- **Whitespace**: Generous spacing for a clean, modern feel

## 🔧 Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile**: iOS Safari, Chrome Mobile, Samsung Internet
- **Legacy**: Graceful degradation for older browsers

## ⚡ Performance Features

- **Optimized Loading**: Lazy loading for images
- **Minimal JavaScript**: Clean, efficient code
- **CSS Animations**: Smooth transitions and hover effects
- **Font Display**: Optimized font loading with `font-display: swap`

## 📱 Mobile Optimization

- **Responsive Grid**: Adapts to all screen sizes
- **Touch Interactions**: Optimized for mobile navigation
- **Image Handling**: Responsive images with proper sizing
- **Performance**: Fast loading on mobile networks

## 🎨 SEO Features

- **Structured Data**: JSON-LD markup for better search visibility
- **Meta Tags**: Optimized titles, descriptions, and Open Graph tags
- **Semantic HTML**: Proper heading hierarchy and landmarks
- **Image Alt Text**: Descriptive alt attributes for all images
- **Clean URLs**: SEO-friendly navigation structure

## 🛠️ Support & Customization

### Getting Help
1. Check the Big Cartel documentation for general theme support
2. Review this README for TFstudio-specific customization
3. Test changes in a staging environment before going live

### Making Changes
1. Always backup your existing theme before making changes
2. Test on different devices and browsers
3. Use browser developer tools to preview changes
4. Make incremental changes rather than large overhauls

### Custom Development
For advanced customizations beyond what's covered here:
1. Understand Big Cartel's Liquid templating system
2. Follow CSS best practices for maintainability
3. Test thoroughly across devices and browsers
4. Consider performance impact of any additions

## 🔄 Theme Updates

When updating the theme:
1. **Backup First**: Save your current theme files
2. **Review Changes**: Check what's different in the new version
3. **Merge Customizations**: Carefully integrate your custom changes
4. **Test Thoroughly**: Verify everything works as expected
5. **Deploy Gradually**: Consider rolling out to a test store first

## 📋 Compatibility Notes

- **Big Cartel Plan**: Requires Premium plan for custom CSS
- **Theme Features**: All standard Big Cartel features supported
- **Third-party Apps**: Compatible with most Big Cartel apps
- **Analytics**: Works with Google Analytics and other tracking codes

## 🚨 Important Notes

- This theme requires a Big Cartel Premium plan
- Always test changes in a development environment first
- Keep a backup of your original theme files
- Some customizations may need to be re-applied after theme updates

## 📞 Questions?

For theme-specific questions about the TFstudio design:
1. Review this documentation thoroughly
2. Check the original TFstudio website for design inspiration
3. Use browser developer tools to inspect and understand the CSS
4. Make incremental changes and test as you go

---

**TFstudio Big Cartel Theme** - Bringing ceramic studio elegance to your online store.