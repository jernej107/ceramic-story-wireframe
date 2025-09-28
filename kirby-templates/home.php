<?php snippet('header') ?>

<!-- Hero Section -->
<section class="py-20 sm:py-32 bg-muted/30">
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
      <!-- Hero Content -->
      <div class="space-y-8">
        <div class="space-y-6">
          <h1 class="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight">
            <?= $page->heroTitle()->or('Handcrafted') ?>
            <span class="block" style="color: #1d1d1b;">
              <?= $page->heroSubtitle()->or('Ceramic Art') ?>
            </span>
          </h1>
          <p class="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl">
            <?= $page->heroDescription()->or('Discover unique, artisan-made ceramics that bring warmth and character to your home. Each piece tells a story of craftsmanship and creativity.') ?>
          </p>
        </div>
        <div class="flex flex-col sm:flex-row gap-4">
          <a href="#featured" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-lg font-medium bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 soft-shadow ceramic-transition">
            Explore Collection
          </a>
          <a href="<?= $site->shopUrl()->or('https://shop.tfstudio.website') ?>" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-lg font-medium border border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 ceramic-transition">
            Visit Shop
          </a>
        </div>
      </div>
      
      <!-- Hero Image -->
      <div class="order-first lg:order-last">
        <div class="aspect-square bg-cover bg-center rounded-2xl soft-shadow" style="background-image: url('/assets/images/hero-ceramics.jpg')"></div>
      </div>
    </div>
  </div>
</section>

<!-- Signature Pieces -->
<section id="featured" class="py-20 sm:py-32">
  <div class="container mx-auto px-4">
    <div class="text-center mb-16 sm:mb-20">
      <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
        <?= $page->collectionsTitle()->or('Signature Pieces') ?>
      </h2>
      <p class="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
        <?= $page->collectionsDescription()->or('Each ceramic piece is meticulously handcrafted, reflecting our commitment to quality and artistic expression. Discover collections that blend traditional techniques with contemporary design.') ?>
      </p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <?php 
      $collections = $page->collections()->toStructure();
      if ($collections->count() > 0): 
        foreach($collections as $collection): ?>
          <div class="group cursor-pointer">
            <div class="aspect-[4/3] bg-cover bg-center rounded-lg mb-4 transition-transform group-hover:scale-105" style="background-image: url('/assets/images/<?= $collection->imagename() ?>')"></div>
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold text-primary-foreground uppercase tracking-wide">
                <?= $collection->name() ?>
              </h3>
              <svg class="w-4 h-4 text-primary-foreground group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7-7l7 7-7 7"></path>
              </svg>
            </div>
          </div>
        <?php endforeach;
      else: ?>
        <!-- Default collections if no content is set -->
        <div class="bg-card rounded-2xl p-8 soft-shadow group cursor-pointer ceramic-transition hover:scale-105">
          <div class="aspect-square bg-cover bg-center rounded-xl mb-6" style="background-image: url('/assets/images/ceramic-collection-1.jpg')"></div>
          <div class="space-y-4">
            <h3 class="text-2xl font-bold text-card-foreground">Tableware</h3>
            <p class="text-muted-foreground leading-relaxed">Elegant dining pieces crafted for everyday luxury and special occasions.</p>
            <div class="flex items-center text-primary font-semibold group-hover:gap-3 gap-2 ceramic-transition">
              <span>Explore Collection</span>
              <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7-7l7 7-7 7"></path>
              </svg>
            </div>
          </div>
        </div>
        <div class="bg-card rounded-2xl p-8 soft-shadow group cursor-pointer ceramic-transition hover:scale-105">
          <div class="aspect-square bg-cover bg-center rounded-xl mb-6" style="background-image: url('/assets/images/ceramic-collection-2.jpg')"></div>
          <div class="space-y-4">
            <h3 class="text-2xl font-bold text-card-foreground">Decorative</h3>
            <p class="text-muted-foreground leading-relaxed">Artistic pieces that transform spaces with unique character and style.</p>
            <div class="flex items-center text-primary font-semibold group-hover:gap-3 gap-2 ceramic-transition">
              <span>Explore Collection</span>
              <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7-7l7 7-7 7"></path>
              </svg>
            </div>
          </div>
        </div>
        <div class="bg-card rounded-2xl p-8 soft-shadow group cursor-pointer ceramic-transition hover:scale-105">
          <div class="aspect-square bg-cover bg-center rounded-xl mb-6" style="background-image: url('/assets/images/ceramic-collection-3.jpg')"></div>
          <div class="space-y-4">
            <h3 class="text-2xl font-bold text-card-foreground">Garden</h3>
            <p class="text-muted-foreground leading-relaxed">Weather-resistant ceramics designed for outdoor beauty and durability.</p>
            <div class="flex items-center text-primary font-semibold group-hover:gap-3 gap-2 ceramic-transition">
              <span>Explore Collection</span>
              <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7-7l7 7-7 7"></path>
              </svg>
            </div>
          </div>
        </div>
      <?php endif; ?>
    </div>
  </div>
</section>

<!-- Journal Section -->
<section id="journal" class="py-20 sm:py-32 bg-muted/30">
  <div class="container mx-auto px-4">
    <div class="text-center mb-16 sm:mb-20">
      <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
        <?= $page->journalTitle()->or('Studio Journal') ?>
      </h2>
      <p class="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
        <?= $page->journalDescription()->or('Behind-the-scenes insights into our creative process, techniques, and the artistry that goes into each handcrafted piece.') ?>
      </p>
    </div>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <?php 
      $posts = $page->journalPosts()->toStructure()->limit(3);
      if ($posts->count() > 0):
        foreach($posts as $post): ?>
          <article class="group ceramic-transition hover:scale-105">
            <div class="aspect-[4/3] bg-cover bg-center rounded-lg mb-4 soft-shadow" style="background-image: url('/assets/images/<?= $post->imagename() ?>')"></div>
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
        <?php endforeach;
      else: ?>
        <!-- Default journal posts if no content is set -->
        <article class="bg-card rounded-2xl p-8 soft-shadow group cursor-pointer ceramic-transition hover:scale-105">
          <div class="aspect-[4/3] bg-cover bg-center rounded-xl mb-6" style="background-image: url('/assets/images/featured-ceramics.jpg')"></div>
          <div class="space-y-4">
            <span class="text-sm text-primary font-semibold uppercase tracking-wide">PROCESS</span>
            <h3 class="text-2xl font-bold text-card-foreground group-hover:text-primary ceramic-transition">
              The Art of Glazing
            </h3>
            <p class="text-muted-foreground leading-relaxed">
              Exploring the delicate balance between chemistry and artistry in our glazing process.
            </p>
            <div class="flex items-center justify-between pt-4 border-t border-border">
              <time class="text-sm text-muted-foreground">March 15, 2024</time>
              <span class="text-primary font-semibold text-sm flex items-center gap-2 group-hover:gap-3 ceramic-transition">
                Read More
                <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7-7l7 7-7 7"></path>
                </svg>
              </span>
            </div>
          </div>
        </article>
        <article class="bg-card rounded-2xl p-8 soft-shadow group cursor-pointer ceramic-transition hover:scale-105">
          <div class="aspect-[4/3] bg-cover bg-center rounded-xl mb-6" style="background-image: url('/assets/images/ceramic-process.jpg')"></div>
          <div class="space-y-4">
            <span class="text-sm text-primary font-semibold uppercase tracking-wide">DESIGN</span>
            <h3 class="text-2xl font-bold text-card-foreground group-hover:text-primary ceramic-transition">
              Finding Beauty in Imperfection
            </h3>
            <p class="text-muted-foreground leading-relaxed">
              How traditional Japanese aesthetics influence our contemporary ceramic designs.
            </p>
            <div class="flex items-center justify-between pt-4 border-t border-border">
              <time class="text-sm text-muted-foreground">March 10, 2024</time>
              <span class="text-primary font-semibold text-sm flex items-center gap-2 group-hover:gap-3 ceramic-transition">
                Read More
                <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7-7l7 7-7 7"></path>
                </svg>
              </span>
            </div>
          </div>
        </article>
        <article class="bg-card rounded-2xl p-8 soft-shadow group cursor-pointer ceramic-transition hover:scale-105">
          <div class="aspect-[4/3] bg-cover bg-center rounded-xl mb-6" style="background-image: url('/assets/images/second-chance-ceramics.jpg')"></div>
          <div class="space-y-4">
            <span class="text-sm text-primary font-semibold uppercase tracking-wide">SUSTAINABILITY</span>
            <h3 class="text-2xl font-bold text-card-foreground group-hover:text-primary ceramic-transition">
              Sustainable Ceramic Practices
            </h3>
            <p class="text-muted-foreground leading-relaxed">
              Our commitment to eco-friendly materials and processes in ceramic creation.
            </p>
            <div class="flex items-center justify-between pt-4 border-t border-border">
              <time class="text-sm text-muted-foreground">March 5, 2024</time>
              <span class="text-primary font-semibold text-sm flex items-center gap-2 group-hover:gap-3 ceramic-transition">
                Read More
                <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7-7l7 7-7 7"></path>
                </svg>
              </span>
            </div>
          </div>
        </article>
      <?php endif; ?>
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
        <div class="aspect-[4/3] bg-cover bg-center rounded-lg ceramic-shadow" style="background-image: url('/assets/images/<?= $page->aboutImagename()->or('ceramic-process.jpg') ?>')"></div>
      </div>
    </div>
  </div>
</section>

<!-- Second Chance Ceramics -->
<section id="second-chance" class="py-16 sm:py-20 ceramic-gradient">
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      <div class="aspect-[4/3] bg-cover bg-center rounded-lg soft-shadow" style="background-image: url('/assets/images/<?= $page->secondChanceImagename()->or('second-chance-ceramics.jpg') ?>')"></div>
      
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