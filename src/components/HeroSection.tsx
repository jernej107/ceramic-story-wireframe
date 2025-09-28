import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-ceramics.jpg";

const HeroSection = () => {
  return (
    <section className="min-h-screen bg-background flex items-center">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Text Content - Left Side */}
          <div className="text-left order-2 lg:order-1">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight text-foreground">
              Handcrafted
              <span className="block hero-gradient bg-clip-text text-transparent">
                Ceramic Art
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-8 leading-relaxed text-foreground/80">
              Discover unique, artisan-made ceramics that bring warmth and character to your home. 
              Each piece tells a story of craftsmanship and creativity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" variant="default" className="ceramic-shadow text-lg px-8 py-4 min-w-[200px]">
                <a href="#featured">Explore Collection</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8 py-4 min-w-[200px]">
                <a href="https://shop.tfstudio.website" target="_blank" rel="noopener noreferrer">
                  Visit Shop
                </a>
              </Button>
            </div>
          </div>

          {/* Image - Right Side */}
          <div className="order-1 lg:order-2">
            <div 
              className="aspect-square lg:aspect-[4/5] bg-cover bg-center bg-no-repeat rounded-2xl ceramic-shadow hover-scale"
              style={{ backgroundImage: `url(${heroImage})` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;