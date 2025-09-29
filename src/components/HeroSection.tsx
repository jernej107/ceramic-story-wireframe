import { Button } from "@/components/ui/button";
import { useStudioInfo } from "@/hooks/useStudioInfo";
import heroImage from "@/assets/hero-ceramics.jpg";

const HeroSection = () => {
  const { getSection, loading } = useStudioInfo();
  const heroInfo = getSection('hero');

  const title = heroInfo?.title || "Handcrafted Ceramic Art";
  const content = heroInfo?.content || "Discover unique, artisan-made ceramics that bring warmth and character to your home. Each piece tells a story of craftsmanship and creativity.";

  return (
    <>
      {/* Mobile Version - Image Background with Overlay */}
      <section className="lg:hidden relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-foreground/30"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 text-center text-white">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-8 leading-tight">
              {loading ? (
                <div className="animate-pulse">
                  <div className="h-12 bg-white/20 rounded mb-4"></div>
                  <div className="h-12 bg-white/20 rounded"></div>
                </div>
              ) : (
                title.split(' ').map((word, index) => (
                  <span key={index} className={index === 0 ? "block" : "block text-white"}>
                    {word}
                  </span>
                ))
              )}
            </h1>
            <p className="text-xl mb-12 max-w-2xl mx-auto leading-relaxed text-white/90">
              {loading ? (
                <div className="animate-pulse">
                  <div className="h-6 bg-white/20 rounded mb-2"></div>
                  <div className="h-6 bg-white/20 rounded mb-2"></div>
                  <div className="h-6 bg-white/20 rounded w-3/4 mx-auto"></div>
                </div>
              ) : (
                content
              )}
            </p>
            <div className="flex flex-col gap-6 justify-center items-center">
              <Button asChild size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-foreground text-lg px-12 py-6 rounded-full font-medium">
                <a href="https://shop.tfstudio.website" target="_blank" rel="noopener noreferrer">
                  Visit Shop
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Desktop Version - Half/Half Layout */}
      <section className="hidden lg:flex bg-background">
        <div className="w-full h-full flex">
          <div className="w-1/2 flex items-center justify-center px-12 bg-background">
            {/* Text Content - Left Side */}
            <div className="text-left space-y-8 max-w-lg px-5 py-[45px]">
              <h1 className="text-6xl xl:text-7xl font-bold leading-tight text-foreground">
                {loading ? (
                  <div className="animate-pulse">
                    <div className="h-16 bg-gray-200 rounded mb-4"></div>
                    <div className="h-16 bg-gray-200 rounded"></div>
                  </div>
                ) : (
                  title.split(' ').map((word, index) => (
                    <span key={index} className={index === 0 ? "block" : "block text-foreground"}>
                      {word}
                    </span>
                  ))
                )}
              </h1>
              <p className="text-xl xl:text-2xl leading-relaxed text-foreground/80">
                {loading ? (
                  <div className="animate-pulse">
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  </div>
                ) : (
                  content
                )}
              </p>
              <div className="flex gap-6 pt-4">
                <Button asChild size="lg" variant="outline" className="border-2 border-foreground text-foreground hover:bg-foreground hover:text-background text-lg px-12 py-6 rounded-full font-medium">
                  <a href="https://shop.tfstudio.website" target="_blank" rel="noopener noreferrer">
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
              style={{ backgroundImage: `url(${heroImage})` }}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;