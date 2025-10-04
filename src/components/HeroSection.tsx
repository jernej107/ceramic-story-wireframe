import { Button } from "@/components/ui/button";
import { useStudioInfo } from "@/lib/hooks/useStudioInfo";
import { getDirectusImageUrl } from "@/lib/directus";
import heroImage from "@/assets/hero-terracotta-vase.jpg";
import Navigation from "@/components/Navigation";

const HeroSection = () => {
  const { data: studioInfo, isLoading } = useStudioInfo();

  const heroTitle = studioInfo?.hero_title || "Handcrafted Ceramic Art";
  const heroDescription = studioInfo?.hero_description || "Discover unique, artisan-made ceramics that bring warmth and character to your home. Each piece tells a story of craftsmanship and creativity.";
  const heroImageUrl = studioInfo?.hero_image ? getDirectusImageUrl(studioInfo.hero_image) : heroImage;
  const shopUrl = studioInfo?.shop_url || "https://shop.tfstudio.website";

  if (isLoading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </section>
    );
  }

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Navigation Overlay */}
      <Navigation />
      
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImageUrl})` }}
      >
        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-5xl mx-auto space-y-8">
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-tight text-white uppercase tracking-wide">
              {heroTitle}
            </h1>
            <p className="text-base md:text-lg lg:text-xl leading-relaxed text-white/90 max-w-2xl mx-auto font-medium">
              {heroDescription}
            </p>
            <div className="flex justify-center pt-6">
              <Button 
                asChild 
                size="lg" 
                className="bg-primary text-primary-foreground hover:bg-primary/90 text-base px-10 py-6 rounded-full font-bold uppercase tracking-wide"
              >
                <a href={shopUrl} target="_blank" rel="noopener noreferrer">
                  Visit Shop
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;