import { Button } from "@/components/ui/button";
import { useStudioInfo } from "@/lib/hooks/useStudioInfo";
import { getDirectusImageUrl } from "@/lib/directus";
import heroImage from "@/assets/hero.jpg";
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
    <section className="relative min-h-screen w-full bg-background">
      {/* Navigation Overlay */}
      <Navigation />
      
      {/* Hero Content - Two Column Layout */}
      <div className="container mx-auto px-6 pt-32 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-8rem)]">
          {/* Left Column - Text Content */}
          <div className="space-y-6 lg:pr-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight text-foreground uppercase tracking-wide font-display">
              {heroTitle}
            </h1>
            <p className="text-base md:text-lg leading-relaxed text-foreground/80 font-body">
              {heroDescription}
            </p>
            <div className="pt-4">
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

          {/* Right Column - Image */}
          <div className="flex items-center justify-center">
            <img 
              src={heroImageUrl} 
              alt="Handcrafted ceramic piece" 
              className="w-full max-w-xl h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;