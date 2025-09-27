  </main>

  <!-- Footer -->
  <footer class="bg-foreground text-background py-16">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        <div class="lg:col-span-2">
          <h3 class="text-2xl font-bold mb-4"><?= $site->title()->or('TFstudio') ?></h3>
          <p class="text-background/80 leading-relaxed mb-6 max-w-md">
            <?= $site->footerDescription()->or('Creating unique, handcrafted ceramic pieces that bring warmth and character to your home. Each piece tells a story of craftsmanship and creativity.') ?>
          </p>
          <div class="flex space-x-4">
            <?php if($site->instagram()->isNotEmpty()): ?>
            <a href="<?= $site->instagram() ?>" target="_blank" rel="noopener noreferrer" class="text-background/80 hover:text-background ceramic-transition">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <?php endif ?>
            <?php if($site->facebook()->isNotEmpty()): ?>
            <a href="<?= $site->facebook() ?>" target="_blank" rel="noopener noreferrer" class="text-background/80 hover:text-background ceramic-transition">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <?php endif ?>
            <?php if($site->email()->isNotEmpty()): ?>
            <a href="mailto:<?= $site->email() ?>" class="text-background/80 hover:text-background ceramic-transition">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </a>
            <?php endif ?>
          </div>
        </div>
        
        <div>
          <h4 class="text-lg font-semibold mb-4">Quick Links</h4>
          <ul class="space-y-2">
            <li><a href="#featured" class="text-background/80 hover:text-background ceramic-transition">Featured Collections</a></li>
            <li><a href="#journal" class="text-background/80 hover:text-background ceramic-transition">Ceramic Journal</a></li>
            <li><a href="#about" class="text-background/80 hover:text-background ceramic-transition">About Us</a></li>
            <li><a href="#second-chance" class="text-background/80 hover:text-background ceramic-transition">Second Chance</a></li>
          </ul>
        </div>

        <div>
          <h4 class="text-lg font-semibold mb-4">Shop</h4>
          <ul class="space-y-2">
            <li><a href="<?= $site->shopUrl()->or('https://shop.tfstudio.website') ?>" target="_blank" rel="noopener noreferrer" class="text-background/80 hover:text-background ceramic-transition">All Collections</a></li>
            <li><a href="<?= $site->shopUrl()->or('https://shop.tfstudio.website') ?>/new" target="_blank" rel="noopener noreferrer" class="text-background/80 hover:text-background ceramic-transition">New Arrivals</a></li>
            <li><a href="<?= $site->shopUrl()->or('https://shop.tfstudio.website') ?>/sale" target="_blank" rel="noopener noreferrer" class="text-background/80 hover:text-background ceramic-transition">Second Chance</a></li>
            <li><a href="<?= $site->shopUrl()->or('https://shop.tfstudio.website') ?>/custom" target="_blank" rel="noopener noreferrer" class="text-background/80 hover:text-background ceramic-transition">Custom Orders</a></li>
          </ul>
        </div>
      </div>
      
      <div class="border-t border-background/20 pt-8 flex flex-col sm:flex-row justify-between items-center">
        <p class="text-background/60 text-sm">
          &copy; <?= date('Y') ?> <?= $site->title()->or('TFstudio') ?>. All rights reserved.
        </p>
        <div class="flex items-center space-x-6 mt-4 sm:mt-0">
          <a href="/privacy" class="text-background/60 hover:text-background text-sm ceramic-transition">Privacy Policy</a>
          <a href="/terms" class="text-background/60 hover:text-background text-sm ceramic-transition">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>

  <!-- Mobile Menu JavaScript -->
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
      const mobileMenu = document.getElementById('mobile-menu');
      const menuOpen = document.getElementById('menu-open');
      const menuClose = document.getElementById('menu-close');
      
      if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
          mobileMenu.classList.toggle('hidden');
          menuOpen.classList.toggle('hidden');
          menuClose.classList.toggle('hidden');
        });

        // Close menu when clicking on links
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
          link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
            menuOpen.classList.remove('hidden');
            menuClose.classList.add('hidden');
          });
        });
      }

      // Smooth scrolling for anchor links
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        });
      });
    });
  </script>

  <!-- Lazy loading for images -->
  <script>
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.style.backgroundImage = img.dataset.bg;
            observer.unobserve(img);
          }
        });
      });

      document.querySelectorAll('[data-bg]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  </script>
</body>
</html>