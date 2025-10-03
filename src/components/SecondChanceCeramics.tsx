import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Recycle, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import secondChanceImage from "@/assets/second-chance-ceramics.jpg";

const SecondChanceCeramics = () => {
  const features = [
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Unique Character",
      description: "Each piece has its own story and charm that makes it one-of-a-kind",
    },
    {
      icon: <Recycle className="h-6 w-6" />,
      title: "Sustainable Choice",
      description: "Give beautiful ceramics a new life while supporting sustainable practices",
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "Affordable Beauty",
      description: "Discover quality handmade ceramics at accessible prices",
    },
  ];

  return (
    <section id="second-chance" className="py-12" style={{ backgroundColor: 'hsl(21 81% 54%)' }}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Second Chance 
              <span className="block text-white">Ceramics</span>
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Discover the beauty in imperfection with our collection of second-chance ceramics. 
              These pieces may have minor flaws, unique variations, or simply need a new home, 
              but they're no less beautiful for it.
            </p>

            <div className="space-y-6 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-white/90">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-[hsl(var(--button-dark))] text-[hsl(var(--button-dark-foreground))] hover:bg-[hsl(var(--button-dark))]/90 ceramic-shadow">
                <a href="https://shop.tfstudio.website" target="_blank" rel="noopener noreferrer">
                  Shop Second Chance
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-secondary">
                <Link to="/second-chance">Learn More</Link>
              </Button>
            </div>
          </div>

          <div>
            <Card className="border-2 border-primary/20 ceramic-shadow bg-card/80 backdrop-blur">
              <CardHeader className="pb-4">
                <img
                  src={secondChanceImage}
                  alt="Collection of unique second chance ceramics"
                  className="w-full h-80 object-cover rounded-lg"
                />
              </CardHeader>
              <CardContent>
                <CardTitle className="text-2xl font-semibold text-primary mb-3">
                  Beauty in Every Imperfection
                </CardTitle>
                <CardDescription className="text-foreground/70 leading-relaxed">
                  From slightly asymmetrical bowls to vases with unique color variations, 
                  our second-chance ceramics celebrate the unpredictable nature of the 
                  ceramic process and the beauty that emerges from it.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecondChanceCeramics;