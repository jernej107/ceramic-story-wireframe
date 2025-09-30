import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Recycle, Sparkles, ArrowLeft, Star } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import secondChanceImage from "@/assets/second-chance-ceramics.jpg";
import ceramicCollection1 from "@/assets/ceramic-collection-1.jpg";
import ceramicCollection2 from "@/assets/ceramic-collection-2.jpg";
import ceramicCollection3 from "@/assets/ceramic-collection-3.jpg";

const SecondChance = () => {
  const features = [
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Unique Character",
      description: "Each piece has its own story and charm that makes it one-of-a-kind. Minor variations in glaze or form add personality.",
    },
    {
      icon: <Recycle className="h-6 w-6" />,
      title: "Sustainable Choice",
      description: "Give beautiful ceramics a new life while supporting sustainable practices and reducing waste in our craft.",
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "Affordable Beauty",
      description: "Discover quality handmade ceramics at accessible prices, making artisan pottery available to everyone.",
    },
  ];

  const secondChanceItems = [
    {
      image: ceramicCollection1,
      title: "Tableware Collection",
      description: "Bowls, plates, and mugs with unique glaze patterns",
      discount: "30% off",
    },
    {
      image: ceramicCollection2,
      title: "Decorative Pieces",
      description: "Vases and sculptural items with character variations",
      discount: "40% off",
    },
    {
      image: ceramicCollection3,
      title: "Garden Ceramics",
      description: "Outdoor planters with natural imperfections",
      discount: "25% off",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 ceramic-gradient overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Link 
                to="/" 
                className="inline-flex items-center gap-2 text-foreground hover:text-primary ceramic-transition mb-8"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground">
                Second Chance
                <span className="block text-primary mt-2">Ceramics</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
                Every ceramic piece has its own journey. Celebrate the beauty in imperfection 
                with pieces that are perfectly imperfect.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="ceramic-shadow">
                  <a href="https://shop.tfstudio.website" target="_blank" rel="noopener noreferrer">
                    Shop the Collection
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
              <div className="order-2 lg:order-1">
                <img
                  src={secondChanceImage}
                  alt="Collection of unique second chance ceramics showcasing beauty in imperfection"
                  className="w-full h-[500px] object-cover rounded-lg ceramic-shadow"
                />
              </div>

              <div className="order-1 lg:order-2">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                  What Makes Them
                  <span className="block text-primary">Special?</span>
                </h2>
                
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Our Second Chance collection celebrates the unpredictable nature of ceramic art. 
                  These pieces may have slight asymmetries, unique color variations, or subtle surface 
                  textures that emerged during the firing process.
                </p>

                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Rather than considering these characteristics as flaws, we see them as signatures 
                  of the handmade process – proof that each piece was crafted by human hands and 
                  shaped by the elemental forces of earth and fire.
                </p>

                <div className="flex items-center gap-3 text-primary mb-8">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <span className="text-foreground ml-2">Loved by our community</span>
                </div>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
              {features.map((feature, index) => (
                <Card key={index} className="border-0 ceramic-shadow hover:scale-105 ceramic-transition">
                  <CardContent className="pt-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Available Collections */}
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                Available Collections
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Browse our current selection of second chance ceramics, each offering unique pieces at special prices.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {secondChanceItems.map((item, index) => (
                <Card key={index} className="border-0 ceramic-shadow overflow-hidden group">
                  <div className="relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-64 object-cover group-hover:scale-110 ceramic-transition"
                    />
                    <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full font-semibold">
                      {item.discount}
                    </div>
                  </div>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {item.description}
                    </p>
                    <Button asChild variant="outline" className="w-full">
                      <a href="https://shop.tfstudio.website" target="_blank" rel="noopener noreferrer">
                        View Collection
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 subtle-gradient">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Ready to Find Your
              <span className="block text-primary mt-2">Perfect Piece?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Visit our shop to explore the full Second Chance collection and give a unique ceramic piece a new home.
            </p>
            <Button asChild size="lg" className="ceramic-shadow">
              <a href="https://shop.tfstudio.website" target="_blank" rel="noopener noreferrer">
                Browse All Second Chance Ceramics
              </a>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SecondChance;
