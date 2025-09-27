#!/bin/bash

# TFstudio Kirby CMS Deployment Script
# This script pulls the latest changes and deploys the ceramic website to Kirby CMS

set -e  # Exit on any error

echo "🏺 TFstudio Ceramic Website - Kirby CMS Deployment"
echo "=================================================="

# Configuration
KIRBY_ROOT="/var/www/html"  # Change this to your Kirby installation path
PROJECT_ROOT="$(pwd)"
BACKUP_DIR="${KIRBY_ROOT}/backup-$(date +%Y%m%d-%H%M%S)"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    print_error "Not in a git repository. Please run this script from your project root."
    exit 1
fi

# Check if Kirby root exists
if [ ! -d "$KIRBY_ROOT" ]; then
    print_error "Kirby root directory not found: $KIRBY_ROOT"
    print_warning "Please update the KIRBY_ROOT variable in this script"
    exit 1
fi

echo "📁 Project Root: $PROJECT_ROOT"
echo "🌐 Kirby Root: $KIRBY_ROOT"
echo ""

# Step 1: Pull latest changes
echo "🔄 Step 1: Pulling latest changes from git..."
git pull origin main || git pull origin master
print_status "Git pull completed"

# Step 2: Create backup of existing Kirby files
echo "💾 Step 2: Creating backup..."
if [ -d "$KIRBY_ROOT/site" ] || [ -d "$KIRBY_ROOT/assets" ]; then
    mkdir -p "$BACKUP_DIR"
    [ -d "$KIRBY_ROOT/site" ] && cp -r "$KIRBY_ROOT/site" "$BACKUP_DIR/"
    [ -d "$KIRBY_ROOT/assets" ] && cp -r "$KIRBY_ROOT/assets" "$BACKUP_DIR/"
    print_status "Backup created at: $BACKUP_DIR"
else
    print_warning "No existing Kirby files found to backup"
fi

# Step 3: Create Kirby directory structure
echo "📂 Step 3: Creating Kirby directory structure..."
mkdir -p "$KIRBY_ROOT/site/templates"
mkdir -p "$KIRBY_ROOT/site/snippets"
mkdir -p "$KIRBY_ROOT/site/blueprints"
mkdir -p "$KIRBY_ROOT/assets/css"
mkdir -p "$KIRBY_ROOT/assets/images"
mkdir -p "$KIRBY_ROOT/assets/js"
print_status "Directory structure created"
chown -R 82:82 "$KIRBY_ROOT/site/templates"
chown -R 82:82 "$KIRBY_ROOT/site/snippets"
chown -R 82:82 "$KIRBY_ROOT/site/blueprints"
chown -R 82:82 "$KIRBY_ROOT/assets/css"
chown -R 82:82 "$KIRBY_ROOT/assets/images"
chown -R 82:82 "$KIRBY_ROOT/assets/js"
print_status "Permissions changed for created directories"

# Step 4: Copy Kirby templates and snippets
echo "📄 Step 4: Copying Kirby templates and snippets..."

# Copy main template
if [ -f "$PROJECT_ROOT/kirby-templates/home.php" ]; then
    cp "$PROJECT_ROOT/kirby-templates/home.php" "$KIRBY_ROOT/site/templates/"
    print_status "Copied home.php template"
else
    print_error "home.php template not found"
fi

# Copy header snippet
if [ -f "$PROJECT_ROOT/kirby-templates/header.php" ]; then
    cp "$PROJECT_ROOT/kirby-templates/header.php" "$KIRBY_ROOT/site/snippets/"
    print_status "Copied header.php snippet"
else
    print_error "header.php snippet not found"
fi

# Copy footer snippet
if [ -f "$PROJECT_ROOT/kirby-templates/footer.php" ]; then
    cp "$PROJECT_ROOT/kirby-templates/footer.php" "$KIRBY_ROOT/site/snippets/"
    print_status "Copied footer.php snippet"
else
    print_error "footer.php snippet not found"
fi

# Step 5: Copy styles
echo "🎨 Step 5: Copying CSS styles..."
if [ -f "$PROJECT_ROOT/kirby-templates/styles.css" ]; then
    cp "$PROJECT_ROOT/kirby-templates/styles.css" "$KIRBY_ROOT/assets/css/"
    print_status "Copied styles.css"
else
    print_error "styles.css not found"
fi

# Step 6: Copy images
echo "🖼️  Step 6: Copying ceramic images..."
if [ -d "$PROJECT_ROOT/src/assets" ]; then
    # Copy all ceramic images
    find "$PROJECT_ROOT/src/assets" -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" -o -name "*.webp" | while read img; do
        filename=$(basename "$img")
        cp "$img" "$KIRBY_ROOT/assets/images/"
        print_status "Copied image: $filename"
    done
else
    print_warning "Source assets directory not found"
fi

# Step 7: Create blueprint file
echo "📋 Step 7: Creating content blueprint..."
cat > "$KIRBY_ROOT/site/blueprints/home.yml" << 'EOF'
title: Homepage
icon: home

fields:
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
EOF

print_status "Created home.yml blueprint"

# Step 8: Create Kirby config if it doesn't exist
echo "⚙️  Step 8: Setting up Kirby configuration..."
if [ ! -f "$KIRBY_ROOT/site/config/config.php" ]; then
    mkdir -p "$KIRBY_ROOT/site/config"
    cat > "$KIRBY_ROOT/site/config/config.php" << 'EOF'
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
EOF
    print_status "Created Kirby configuration"
else
    print_warning "Kirby config already exists, skipping"
fi

# Step 9: Set proper permissions
echo "🔒 Step 9: Setting file permissions..."
find "$KIRBY_ROOT" -type f -exec chmod 644 {} \;
find "$KIRBY_ROOT" -type d -exec chmod 755 {} \;
print_status "File permissions set"

echo ""
echo "🎉 Deployment completed successfully!"
echo "=================================================="
print_status "Kirby templates and assets have been deployed"
print_status "Backup created at: $BACKUP_DIR"
print_warning "Next steps:"
echo "   1. Visit your Kirby panel at: ${KIRBY_ROOT%/}/panel"
echo "   2. Login and configure your content"
echo "   3. Upload your ceramic images through the panel"
echo "   4. Test the website functionality"
echo ""
