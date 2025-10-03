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
      {/* Mobile Version */}
      <section className="lg:hidden relative min-h-screen flex items-center justify-center overflow-hidden" style={{ backgroundColor: '#d4978f' }}>
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{ backgroundImage: `url(${heroImageUrl})` }}
        />
        
        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-7xl sm:text-8xl font-bold mb-8 leading-none text-white uppercase tracking-tight">
              {heroTitle}
            </h1>
            <p className="text-xl mb-12 max-w-2xl mx-auto leading-relaxed text-white/90">
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

      {/* Desktop Version - Editorial Style with Overlay */}
      <section className="hidden lg:flex relative min-h-screen overflow-hidden" style={{ backgroundColor: '#d4978f' }}>
        {/* Background Image with Overlay Effect */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
          style={{ backgroundImage: `url(${heroImageUrl})` }}
        />
        
        {/* Large Typography Overlay */}
        <div className="relative z-10 w-full flex items-center justify-center px-12">
          <div className="text-center space-y-12 max-w-5xl">
            <h1 className="text-[10rem] xl:text-[12rem] font-bold leading-none text-white uppercase tracking-tighter">
              {heroTitle}
            </h1>
            <p className="text-2xl xl:text-3xl leading-relaxed text-white/90 max-w-3xl mx-auto">
              {heroDescription}
            </p>
            <div className="flex gap-6 justify-center pt-8">
              <Button asChild size="lg" className="bg-white text-[#d4978f] hover:bg-white/90 text-lg px-12 py-6 rounded-full font-medium">
                <a href={shopUrl} target="_blank" rel="noopener noreferrer">
                  Visit Shop
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;