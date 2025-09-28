<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?= $page->title() ?> | <?= $site->title() ?></title>
  
  <!-- SEO Meta Tags -->
  <meta name="description" content="<?= $page->metaDescription()->or($site->description()) ?>">
  <meta name="keywords" content="<?= $page->metaKeywords()->or('ceramic art, handcrafted pottery, artisan ceramics, TFstudio') ?>">
  <meta name="author" content="<?= $site->author()->or('TFstudio') ?>">
  
  <!-- Open Graph -->
  <meta property="og:title" content="<?= $page->title() ?> | <?= $site->title() ?>">
  <meta property="og:description" content="<?= $page->metaDescription()->or($site->description()) ?>">
  <meta property="og:image" content="<?= $page->ogImage()->toFile()?->url() ?? $site->url() . '/assets/images/og-image.jpg' ?>">
  <meta property="og:url" content="<?= $page->url() ?>">
  <meta property="og:type" content="website">
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="<?= $page->title() ?> | <?= $site->title() ?>">
  <meta name="twitter:description" content="<?= $page->metaDescription()->or($site->description()) ?>">
  <meta name="twitter:image" content="<?= $page->ogImage()->toFile()?->url() ?? $site->url() . '/assets/images/og-image.jpg' ?>">
  
  <!-- Canonical URL -->
  <link rel="canonical" href="<?= $page->url() ?>">
  
  <!-- Favicon -->
  <link rel="icon" type="image/x-icon" href="<?= $site->url() ?>/favicon.ico">
  
  <!-- Preload Critical Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&display=swap" rel="stylesheet">
  
  <!-- Stylesheet -->
  <link rel="stylesheet" href="<?= $site->url() ?>/assets/css/styles.css">
  
  <!-- Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "<?= $site->title()->or('TFstudio') ?>",
    "description": "<?= $site->description()->or('Handcrafted ceramic art and pottery') ?>",
    "url": "<?= $site->url() ?>",
    "image": "<?= $site->url() ?>/assets/images/logo.jpg",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "<?= $site->country()->or('US') ?>"
    }
  }
  </script>
</head>
<body>
  <!-- Navigation -->
  <nav class="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b border-border/40">
    <div class="container mx-auto px-4">
      <div class="flex h-20 items-center justify-between">
        <!-- Logo -->
        <div class="flex items-center space-x-3">
          <h1 class="text-2xl font-bold text-foreground"><?= $site->title()->or('TFstudio') ?></h1>
          <span class="text-sm text-muted-foreground hidden sm:block font-medium">ceramic art</span>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <a href="#featured" class="text-foreground hover:text-primary ceramic-transition font-medium">Featured</a>
          <a href="#journal" class="text-foreground hover:text-primary ceramic-transition font-medium">Journal</a>
          <a href="#about" class="text-foreground hover:text-primary ceramic-transition font-medium">About</a>
          <a href="#second-chance" class="text-foreground hover:text-primary ceramic-transition font-medium">Second Chance</a>
          <a href="<?= $site->shopUrl()->or('https://shop.tfstudio.website') ?>" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 soft-shadow px-6 py-3 ceramic-transition">
            Shop
          </a>
        </div>

        <!-- Mobile Menu Button -->
        <button id="mobile-menu-toggle" class="md:hidden p-2 text-foreground hover:text-primary ceramic-transition rounded-lg">
          <svg id="menu-open" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
          <svg id="menu-close" class="w-6 h-6 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- Mobile Navigation -->
      <div id="mobile-menu" class="md:hidden py-6 border-t border-border/40 hidden">
        <div class="flex flex-col space-y-4">
          <a href="#featured" class="text-foreground hover:text-primary ceramic-transition font-medium py-2">Featured</a>
          <a href="#journal" class="text-foreground hover:text-primary ceramic-transition font-medium py-2">Journal</a>
          <a href="#about" class="text-foreground hover:text-primary ceramic-transition font-medium py-2">About</a>
          <a href="#second-chance" class="text-foreground hover:text-primary ceramic-transition font-medium py-2">Second Chance</a>
          <a href="<?= $site->shopUrl()->or('https://shop.tfstudio.website') ?>" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 soft-shadow px-6 py-3 w-fit ceramic-transition">
            Shop
          </a>
        </div>
      </div>
    </div>
  </nav>

  <main>