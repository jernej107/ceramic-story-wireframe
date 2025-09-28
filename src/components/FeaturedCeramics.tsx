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
    <section id="featured" className="py-16 sm:py-20" style={{ backgroundColor: 'hsl(var(--collections))' }}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-8 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6" style={{ color: 'hsl(var(--collections-foreground))' }}>
              Signature Pieces
            </h2>
            <p className="text-lg sm:text-xl leading-relaxed" style={{ color: 'hsl(var(--collections-foreground) / 0.9)' }}>
              Discover exclusive ceramic collections, created with love and attention to detail. 
              Each piece is a work of art that adds individuality to your home.
            </p>
          </div>
          <a 
            href="https://shop.tfstudio.website" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 transition-colors group lg:flex-shrink-0 self-start"
            style={{ color: 'hsl(var(--collections-foreground))' }}
          >
            <span className="text-lg font-medium whitespace-nowrap">View All Collections</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {collections.map((collection, index) => (
            <div key={index} className="group cursor-pointer">
              <div 
                className="aspect-[4/3] bg-cover bg-center rounded-lg mb-4 transition-transform group-hover:scale-105"
                style={{ backgroundImage: `url(${collection.image})` }}
              />
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold uppercase tracking-wide" style={{ color: 'hsl(var(--collections-foreground))' }}>
                  {collection.name}
                </h3>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" style={{ color: 'hsl(var(--collections-foreground))' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCeramics;