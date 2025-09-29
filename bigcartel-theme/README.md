# TFstudio Big Cartel Theme

A sophisticated Big Cartel theme inspired by the TFstudio ceramic website aesthetic. This theme brings the elegant sage and cream color palette, refined typography, and ceramic-inspired design elements to your Big Cartel store.

## Theme Features

### Design System
- **Color Palette**: Sage green (#a39f8e) and cream (#f0eae5) with supporting colors
- **Typography**: Alan Sans font family for elegant, readable text
- **Shadows & Effects**: Ceramic-inspired soft shadows and subtle gradients
- **Responsive Design**: Mobile-first approach with elegant breakpoints

### Key Components
- **Sophisticated Product Cards**: Elevated design with hover effects
- **Elegant Navigation**: Clean, minimal navigation with smooth transitions
- **Beautiful Product Pages**: Gallery-style image display with detailed information
- **Professional Cart Experience**: Streamlined checkout process
- **SEO Optimized**: Built-in structured data and meta tags

## Installation Instructions

### Step 1: Enable Custom CSS (Big Cartel Premium Required)
1. Log into your Big Cartel admin panel
2. Go to Design > Customize your theme
3. Ensure you have a Premium plan to access custom CSS features

### Step 2: Apply Custom Styles
1. Copy the contents of `styles.css`
2. In your Big Cartel admin:
   - Go to Design > Edit HTML/CSS
   - Paste the custom CSS into the CSS section
   - Save changes

### Step 3: Update Theme Templates
1. **Layout Template**: Replace your layout.html with the provided version
2. **Home Page**: Update home.html with the new template
3. **Product Page**: Replace product.html with the enhanced version
4. **Additional Pages**: Update other templates as needed

### Step 4: Configure Theme Settings
1. Upload your logo in the admin panel
2. Set up your store description and meta information
3. Configure social media links
4. Add product categories and organize your inventory

## Customization Options

### Colors
The theme uses CSS custom properties for easy color customization:
```css
:root {
  --primary: #a39f8e;    /* Sage green */
  --background: #f0eae5;  /* Cream background */
  --collections: #e7b099; /* Warm peach accent */
}
```

### Typography
Alan Sans font is loaded from Google Fonts. To change fonts:
1. Update the @import statement in styles.css
2. Modify the --font-display and --font-body variables

### Layout Adjustments
- Grid layouts are responsive and automatically adjust
- Container max-width can be modified in the .container class
- Product card sizing can be adjusted in the .products-grid class

## Template Structure

### layout.html
- Main site wrapper with navigation and footer
- SEO meta tags and structured data
- Mobile-responsive navigation
- Social media integration

### home.html
- Hero section with store introduction
- Featured products grid
- Category showcase
- About section
- Newsletter signup

### product.html
- Image gallery with thumbnails
- Product information and pricing
- Options and quantity selection
- Add to cart functionality
- Related products

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile Safari and Chrome
- Responsive design for all screen sizes

## Performance Features
- Optimized image loading
- Minimal JavaScript for enhanced performance
- CSS-only animations and transitions
- Lazy loading support

## SEO Features
- Structured data (JSON-LD) for products and business info
- Open Graph and Twitter Card meta tags
- Canonical URLs
- Semantic HTML structure
- Image alt text optimization

## Support & Customization

### Basic Customization
Most visual elements can be customized through CSS variables without touching the core styles.

### Advanced Customization
For more complex changes:
1. Modify the CSS classes in styles.css
2. Update template structure in HTML files
3. Add custom JavaScript for enhanced functionality

### Best Practices
- Always backup your current theme before applying changes
- Test thoroughly on mobile devices
- Ensure all product images are high quality and properly sized
- Use consistent product photography for best results

## Theme Updates
To update the theme:
1. Backup your current customizations
2. Apply new CSS and template files
3. Merge any custom changes you've made
4. Test all functionality before going live

## Compatibility
- Big Cartel Premium plans required for custom CSS
- Works with all Big Cartel product types
- Compatible with Big Cartel's built-in features (cart, checkout, etc.)

---

For additional support or custom modifications, please refer to Big Cartel's documentation or consider hiring a designer familiar with Liquid templating and CSS.