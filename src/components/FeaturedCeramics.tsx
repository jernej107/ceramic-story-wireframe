import { Button } from "@/components/ui/button";
import { useCollections } from "@/lib/hooks/useCollections";
import { useStudioInfo } from "@/lib/hooks/useStudioInfo";
import { getDirectusImageUrl } from "@/lib/directus";
import vaseImage from "@/assets/vase.png";
import crockImage from "@/assets/crock.png";
import cupImage from "@/assets/cup.png";

const FeaturedCeramics = () => {
  const { data: collections, isLoading } = useCollections({ featured: true });
  const { data: studioInfo } = useStudioInfo();
  
  const fallbackCollections = [
    { name: "Textured Vase", image: vaseImage },
    { name: "Minimalist Crock", image: crockImage },
    { name: "Artisan Cup", image: cupImage },
  ];

  const displayCollections = collections && collections.length > 0 
    ? collections.slice(0, 3).map(c => ({
        name: c.name,
        image: c.featured_image ? getDirectusImageUrl(c.featured_image) : vaseImage
      }))
    : fallbackCollections;

  const shopUrl = studioInfo?.shop_url || "https://shop.tfstudio.website";

  return (
    <section id="featured" className="py-20 bg-card">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold mb-8 text-foreground">
            Signature Pieces
          </h2>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-pulse text-muted-foreground">Loading collections...</div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {displayCollections.map((collection, index) => (
                <div key={index} className="group cursor-pointer">
                  <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                    <div className="aspect-square bg-white flex items-center justify-center p-8">
                      <img 
                        src={collection.image} 
                        alt={collection.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="p-6 text-center bg-white">
                      <h3 className="text-xl font-bold uppercase tracking-wide text-foreground mb-1">
                        {collection.name}
                      </h3>
                      <p className="text-foreground/70 text-sm font-medium">Handcrafted Collection</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-foreground text-background hover:bg-foreground/90 px-12 py-6 rounded-full text-lg font-medium"
              >
                <a 
                  href={shopUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  View All Collections
                </a>
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default FeaturedCeramics;