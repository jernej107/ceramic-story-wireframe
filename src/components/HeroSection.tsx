import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-ceramics.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-foreground/20"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Handcrafted
            <span className="block hero-gradient bg-clip-text text-transparent">
              Ceramic Art
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed text-white/90">
            Discover unique, artisan-made ceramics that bring warmth and character to your home. 
            Each piece tells a story of craftsmanship and creativity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" variant="default" className="ceramic-shadow text-lg px-8 py-6">
              <a href="#featured">Explore Collection</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-foreground text-lg px-8 py-6">
              <a href="https://shop.tfstudio.website" target="_blank" rel="noopener noreferrer">
                Visit Shop
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;