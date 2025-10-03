import { Button } from "@/components/ui/button";
import { useStudioInfo } from "@/lib/hooks/useStudioInfo";
import { getDirectusImageUrl } from "@/lib/directus";
import heroImage from "@/assets/hero-ceramics.jpg";

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
    <>
      {/* Mobile Version - Orange Background */}
      <section className="lg:hidden relative min-h-screen flex items-center justify-center overflow-hidden bg-secondary">
        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-8 leading-tight text-secondary-foreground">
              {heroTitle}
            </h1>
            <p className="text-xl mb-12 max-w-2xl mx-auto leading-relaxed text-secondary-foreground/90">
              {heroDescription}
            </p>
            <div className="flex flex-col gap-6 justify-center items-center">
              <Button asChild size="lg" className="bg-[hsl(var(--button-dark))] text-[hsl(var(--button-dark-foreground))] hover:bg-[hsl(var(--button-dark))]/90 text-lg px-12 py-6 rounded-full font-medium">
                <a href={shopUrl} target="_blank" rel="noopener noreferrer">
                  Visit Shop
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Desktop Version - Half/Half Layout with Orange */}
      <section className="hidden lg:flex">
        <div className="w-full h-full flex">
          <div className="w-1/2 flex items-center justify-center px-12 bg-secondary">
            {/* Text Content - Left Side */}
            <div className="text-left space-y-8 max-w-lg px-5 py-[45px]">
              <h1 className="text-6xl xl:text-7xl font-bold leading-tight text-secondary-foreground">
                {heroTitle}
              </h1>
              <p className="text-xl xl:text-2xl leading-relaxed text-secondary-foreground/90">
                {heroDescription}
              </p>
              <div className="flex gap-6 pt-4">
                <Button asChild size="lg" className="bg-[hsl(var(--button-dark))] text-[hsl(var(--button-dark-foreground))] hover:bg-[hsl(var(--button-dark))]/90 text-lg px-12 py-6 rounded-full font-medium">
                  <a href={shopUrl} target="_blank" rel="noopener noreferrer">
                    Visit Shop
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Image - Right Side Full Bleed */}
          <div className="w-1/2 relative">
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${heroImageUrl})` }}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;