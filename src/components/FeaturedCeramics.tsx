import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import collection1 from "@/assets/ceramic-collection-1.jpg";
import collection2 from "@/assets/ceramic-collection-2.jpg";
import collection3 from "@/assets/ceramic-collection-3.jpg";

const FeaturedCeramics = () => {
  const collections = [
    {
      name: "Morning Collection",
      image: collection1,
    },
    {
      name: "Heart of Home",
      image: collection2,
    },
    {
      name: "Natural Beauty",
      image: collection3,
    },
  ];

  return (
    <section id="featured" className="py-12 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold mb-8 text-foreground">
            Signature Pieces
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {collections.map((collection, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="bg-white rounded-3xl border-2 border-border shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="p-[5px]">
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
              href="https://shop.tfstudio.website" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              View All Collections
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCeramics;