import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import featuredImage from "@/assets/featured-ceramics.jpg";

const FeaturedCeramics = () => {
  const featuredItems = [
    {
      name: "Terra Collection Vase",
      description: "Handcrafted terracotta vase with organic texture",
      price: "$89",
      image: featuredImage,
    },
    {
      name: "Artisan Bowl Set",
      description: "Three-piece ceramic bowl set in cream glaze",
      price: "$125",
      image: featuredImage,
    },
    {
      name: "Studio Mug Series",
      description: "Daily ceramic mugs with unique character",
      price: "$45",
      image: featuredImage,
    },
  ];

  return (
    <section id="featured" className="py-20 subtle-gradient">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Featured Ceramics
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Discover our handpicked selection of ceramic pieces, each uniquely crafted 
            with passion and attention to detail.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredItems.map((item, index) => (
            <Card key={index} className="group hover:scale-105 ceramic-transition ceramic-shadow border-0 bg-card/80 backdrop-blur">
              <CardHeader className="pb-4">
                <div 
                  className="aspect-square bg-cover bg-center rounded-lg mb-4"
                  style={{ backgroundImage: `url(${item.image})` }}
                />
                <CardTitle className="text-xl font-semibold text-card-foreground">
                  {item.name}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {item.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-primary">{item.price}</span>
                  <Button size="sm" variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground ceramic-transition">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button asChild size="lg" variant="default" className="ceramic-shadow">
            <a href="https://shop.tfstudio.website" target="_blank" rel="noopener noreferrer">
              View Full Collection
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCeramics;