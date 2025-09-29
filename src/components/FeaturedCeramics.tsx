import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useCollections } from "@/hooks/useCollections";

const FeaturedCeramics = () => {
  const { collections, loading, error } = useCollections(true);

  if (loading) {
    return (
      <section id="featured" className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-8 text-foreground">
              Signature Pieces
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[1, 2, 3].map((i) => (
              <div key={i} className="group cursor-pointer">
                <div className="bg-white rounded-3xl border-2 border-[#1d1d1d] shadow-lg">
                  <div className="p-[10px]">
                    <div className="aspect-[4/3] bg-gray-200 rounded-2xl animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="featured" className="py-12 bg-white">
        <div className="container mx-auto px-6 text-center">
          <p className="text-red-500">Error loading collections: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="featured" className="py-12 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold mb-8 text-foreground">
            Signature Pieces
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {collections.map((collection) => (
            <div key={collection.id} className="group cursor-pointer">
              <div className="bg-white rounded-3xl border-2 border-[#1d1d1d] shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="p-[10px]">
                  <div 
                    className="aspect-[4/3] bg-cover bg-center rounded-2xl relative overflow-hidden"
                    style={{ backgroundImage: `url(${collection.featured_image_url})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-center">
                      <h3 className="text-xl font-bold uppercase tracking-wide text-white mb-1 drop-shadow-lg">
                        {collection.name}
                      </h3>
                      <p className="text-white/90 text-sm font-medium drop-shadow-md">
                        {collection.description || 'Handcrafted Collection'}
                      </p>
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
              href="https://shop.tfstudio.website" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              View All Collections
              <ArrowRight size={20} className="ml-2" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCeramics;