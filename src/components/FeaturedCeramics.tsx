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
    <section id="featured" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold mb-8 text-foreground">
            Signature Pieces
          </h2>
          <p className="text-xl leading-relaxed max-w-3xl mx-auto text-foreground/70">
            Discover exclusive ceramic collections, created with love and attention to detail. 
            Each piece is a work of art that adds individuality to your home.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {collections.map((collection, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div 
                  className="aspect-[4/3] bg-cover bg-center rounded-2xl mb-6"
                  style={{ backgroundImage: `url(${collection.image})` }}
                />
                <div className="text-center">
                  <h3 className="text-xl font-bold uppercase tracking-wide text-foreground mb-2">
                    {collection.name}
                  </h3>
                  <p className="text-foreground/60 text-sm font-medium">Handcrafted Collection</p>
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