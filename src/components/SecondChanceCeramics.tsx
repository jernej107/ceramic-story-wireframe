import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Recycle, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import secondChanceImage from "@/assets/second_chance.png";

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
    <section id="second-chance" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-5xl md:text-6xl font-bold mb-8 text-primary leading-tight">
              Second chance Ceramics
            </h2>
            <p className="text-lg text-foreground/70 mb-10 leading-relaxed">
              Discover the beauty in imperfection with our collection of second-chance ceramics. 
              These pieces may have minor flaws, unique variations, or simply need a new home, 
              but they're no less beautiful for it.
            </p>

            <div className="space-y-6 mb-10">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-card rounded-full flex items-center justify-center text-foreground">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-foreground/70 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="rounded-full px-10 py-6">
                <a href="https://shop.tfstudio.website" target="_blank" rel="noopener noreferrer">
                  Shop Second Chance
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-10 py-6">
                <Link to="/second-chance">Learn More</Link>
              </Button>
            </div>
          </div>

          <div className="h-full">
            <div className="bg-white h-full flex items-center justify-center">
              <img
                src={secondChanceImage}
                alt="Collection of unique second chance ceramics"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecondChanceCeramics;