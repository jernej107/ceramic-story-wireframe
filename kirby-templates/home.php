<?php snippet('header') ?>

<!-- Hero Section -->
<section class="relative min-h-screen flex items-center justify-center overflow-hidden">
  <!-- Background Image -->
  <div class="absolute inset-0 bg-cover bg-center bg-no-repeat" style="background-image: url('<?= $site->heroImage()->toFile()?->url() ?? 'assets/images/hero-ceramics.jpg' ?>')">
    <div class="absolute inset-0 bg-foreground/20"></div>
  </div>

  <!-- Hero Content -->
  <div class="relative z-10 container mx-auto px-4 text-center text-white">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight">
        <?= $page->heroTitle()->or('Handcrafted') ?>
        <span class="block hero-gradient bg-clip-text text-transparent">
          <?= $page->heroSubtitle()->or('Ceramic Art') ?>
        </span>
      </h1>
      <p class="text-lg sm:text-xl md:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed text-white/90">
        <?= $page->heroDescription()->or('Discover unique, artisan-made ceramics that bring warmth and character to your home. Each piece tells a story of craftsmanship and creativity.') ?>
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <a href="#featured" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-lg font-medium bg-primary text-primary-foreground hover:bg-primary/90 ceramic-shadow px-8 py-4 min-w-[200px]">
          Explore Collection
        </a>
        <a href="<?= $site->shopUrl()->or('https://shop.tfstudio.website') ?>" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-lg font-medium border border-white text-white hover:bg-white hover:text-foreground px-8 py-4 min-w-[200px]">
          Visit Shop
        </a>
      </div>
    </div>
  </div>
</section>

<!-- Featured Collections -->
<section id="featured" class="py-16 sm:py-20 bg-primary">
  <div class="container mx-auto px-4">
    <div class="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-8 mb-12 sm:mb-16">
      <div class="max-w-2xl">
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-primary-foreground">
          <?= $page->collectionsTitle()->or('NEW COLLECTIONS') ?>
        </h2>
        <p class="text-lg sm:text-xl text-primary-foreground/90 leading-relaxed">
          <?= $page->collectionsDescription()->or('Discover exclusive ceramic collections, created with love and attention to detail. Each piece is a work of art that adds individuality to your home.') ?>
        </p>
      </div>
      <a href="<?= $site->shopUrl()->or('https://shop.tfstudio.website') ?>" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 text-primary-foreground hover:text-primary-foreground/80 transition-colors group lg:flex-shrink-0 self-start">
        <span class="text-lg font-medium whitespace-nowrap">View All Collections</span>
        <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7-7l7 7-7 7"></path>
        </svg>
      </a>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <?php foreach($page->collections()->toStructure() as $collection): ?>
      <div class="group cursor-pointer">
        <div class="aspect-[4/3] bg-cover bg-center rounded-lg mb-4 transition-transform group-hover:scale-105" style="background-image: url('<?= $collection->image()->toFile()?->url() ?>')"></div>
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-primary-foreground uppercase tracking-wide">
            <?= $collection->name() ?>
          </h3>
          <svg class="w-4 h-4 text-primary-foreground group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7-7l7 7-7 7"></path>
          </svg>
        </div>
      </div>
      <?php endforeach ?>
    </div>
  </div>
</section>

<!-- Journal Section -->
<section id="journal" class="py-16 sm:py-20 subtle-gradient">
  <div class="container mx-auto px-4">
    <div class="text-center mb-12 sm:mb-16">
      <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-foreground">
        <?= $page->journalTitle()->or('Ceramic Journal') ?>
      </h2>
      <p class="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
        <?= $page->journalDescription()->or('Insights into our ceramic process, inspiration, and the stories behind each unique piece.') ?>
      </p>
    </div>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <?php foreach($page->journalPosts()->toStructure()->limit(3) as $post): ?>
      <article class="group ceramic-transition hover:scale-105">
        <div class="aspect-[4/3] bg-cover bg-center rounded-lg mb-4 soft-shadow" style="background-image: url('<?= $post->image()->toFile()?->url() ?>')"></div>
        <div class="space-y-3">
          <span class="text-sm text-primary font-medium uppercase tracking-wide"><?= $post->category() ?></span>
          <h3 class="text-xl font-semibold text-foreground group-hover:text-primary ceramic-transition">
            <?= $post->title() ?>
          </h3>
          <p class="text-muted-foreground leading-relaxed">
            <?= $post->excerpt() ?>
          </p>
          <div class="flex items-center justify-between pt-2">
            <time class="text-sm text-muted-foreground"><?= $post->date()->toDate('F j, Y') ?></time>
            <span class="text-primary font-medium text-sm group-hover:underline">Read More</span>
          </div>
        </div>
      </article>
      <?php endforeach ?>
    </div>
  </div>
</section>

<!-- About Section -->
<section id="about" class="py-16 sm:py-20 bg-card">
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      <div class="space-y-8">
        <div>
          <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-card-foreground">
            <?= $page->aboutTitle()->or('Our Ceramic Story') ?>
          </h2>
          <p class="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8">
            <?= $page->aboutDescription()->or('Founded with a passion for handcrafted ceramics, TFstudio creates unique pieces that blend traditional techniques with contemporary design. Each piece is carefully crafted to bring warmth and character to your everyday moments.') ?>
          </p>
        </div>
        
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8">
          <div class="text-center">
            <div class="text-2xl sm:text-3xl font-bold text-primary mb-2"><?= $page->yearsExperience()->or('8+') ?></div>
            <div class="text-sm text-muted-foreground uppercase tracking-wide">Years Crafting</div>
          </div>
          <div class="text-center">
            <div class="text-2xl sm:text-3xl font-bold text-primary mb-2"><?= $page->piecesCreated()->or('500+') ?></div>
            <div class="text-sm text-muted-foreground uppercase tracking-wide">Pieces Created</div>
          </div>
          <div class="text-center sm:col-span-1 col-span-2">
            <div class="text-2xl sm:text-3xl font-bold text-primary mb-2"><?= $page->happyCustomers()->or('200+') ?></div>
            <div class="text-sm text-muted-foreground uppercase tracking-wide">Happy Customers</div>
          </div>
        </div>
      </div>
      
      <div class="order-first lg:order-last">
        <div class="aspect-[4/3] bg-cover bg-center rounded-lg ceramic-shadow" style="background-image: url('<?= $page->aboutImage()->toFile()?->url() ?? 'assets/images/ceramic-process.jpg' ?>'"></div>
      </div>
    </div>
  </div>
</section>

<!-- Second Chance Ceramics -->
<section id="second-chance" class="py-16 sm:py-20 ceramic-gradient">
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      <div class="aspect-[4/3] bg-cover bg-center rounded-lg soft-shadow" style="background-image: url('<?= $page->secondChanceImage()->toFile()?->url() ?? 'assets/images/second-chance-ceramics.jpg' ?>')"></div>
      
      <div class="space-y-6">
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
          <?= $page->secondChanceTitle()->or('Second Chance Ceramics') ?>
        </h2>
        <p class="text-lg sm:text-xl text-muted-foreground leading-relaxed">
          <?= $page->secondChanceDescription()->or('Every ceramic piece has its own journey. Our Second Chance collection celebrates the beauty in imperfection - pieces with unique characteristics, slight variations, or one-of-a-kind features that make them special.') ?>
        </p>
        <div class="space-y-4">
          <div class="flex items-start gap-3">
            <div class="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
            <p class="text-muted-foreground">Unique character pieces with natural variations</p>
          </div>
          <div class="flex items-start gap-3">
            <div class="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
            <p class="text-muted-foreground">Sustainable approach to ceramic artistry</p>
          </div>
          <div class="flex items-start gap-3">
            <div class="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
            <p class="text-muted-foreground">Special pricing for distinctive pieces</p>
          </div>
        </div>
        <a href="<?= $site->shopUrl()->or('https://shop.tfstudio.website') ?>" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-lg font-medium bg-primary text-primary-foreground hover:bg-primary/90 ceramic-shadow px-8 py-4">
          Explore Second Chance
        </a>
      </div>
    </div>
  </div>
</section>

<?php snippet('footer') ?>