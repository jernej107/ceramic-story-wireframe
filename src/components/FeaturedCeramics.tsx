import { Button } from "@/components/ui/button";
import { useCollections } from "@/lib/hooks/useCollections";
import { useStudioInfo } from "@/lib/hooks/useStudioInfo";
import { getDirectusImageUrl } from "@/lib/directus";
import collection1 from "@/assets/ceramic-collection-1.jpg";
import collection2 from "@/assets/ceramic-collection-2.jpg";
import collection3 from "@/assets/ceramic-collection-3.jpg";

const FeaturedCeramics = () => {
  const { data: collections, isLoading } = useCollections({ featured: true });
  const { data: studioInfo } = useStudioInfo();
  
  const fallbackCollections = [
    { name: "Morning Collection", image: collection1 },
    { name: "Heart of Home", image: collection2 },
    { name: "Natural Beauty", image: collection3 },
  ];

  const displayCollections = collections && collections.length > 0 
    ? collections.slice(0, 3).map(c => ({
        name: c.name,
        image: c.featured_image ? getDirectusImageUrl(c.featured_image) : collection1
      }))
    : fallbackCollections;

  const shopUrl = studioInfo?.shop_url || "https://shop.tfstudio.website";

  return (
    <section id="featured" className="py-12 bg-white">
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
                  <div className="bg-white rounded-3xl border-2 border-[#1d1d1d] shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                    <div className="p-[10px]">
                      <div 
                        className="aspect-[4/3] bg-cover bg-center rounded-2xl relative overflow-hidden"
                        style={{ backgroundImage: `url(${collection.image})` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4 text-center">
                          <h3 className="text-xl font-bold uppercase tracking-wide text-white mb-1 drop-shadow-lg">
                            {collection.name}
                          </h3>
                          <p className="text-white/90 text-sm font-medium drop-shadow-md">Handcrafted Collection</p>
                        </div>
                      </div>
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