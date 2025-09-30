import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Award, Heart, Sparkles, Users } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import processImage from "@/assets/ceramic-process.jpg";
import heroImage from "@/assets/hero-ceramics.jpg";
import featuredCeramics from "@/assets/featured-ceramics.jpg";

const About = () => {
  const values = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Handcrafted with Love",
      description: "Every piece is created by hand with care, attention, and passion for the craft.",
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "Celebrating Imperfection",
      description: "We embrace the unique variations that make each ceramic piece one-of-a-kind.",
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Quality Materials",
      description: "Using premium clay bodies and carefully formulated glazes for lasting beauty.",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community Focused",
      description: "Building connections through shared appreciation for handmade ceramics.",
    },
  ];

  const timeline = [
    {
      year: "2019",
      title: "The Beginning",
      description: "TFstudio was founded with a simple pottery wheel and a passion for creating beautiful, functional ceramics.",
    },
    {
      year: "2020",
      title: "Growing the Studio",
      description: "Expanded our workspace and introduced new glazing techniques inspired by traditional methods.",
    },
    {
      year: "2021",
      title: "Second Chance Collection",
      description: "Launched our Second Chance program to celebrate beauty in imperfection and reduce waste.",
    },
    {
      year: "2022",
      title: "Community Workshops",
      description: "Started offering ceramic workshops to share our knowledge and passion with the community.",
    },
    {
      year: "2024",
      title: "Sustainable Practices",
      description: "Committed fully to eco-friendly materials and processes, minimizing our environmental impact.",
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
                About
                <span className="block text-primary mt-2">TFstudio</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
                Where traditional ceramic craftsmanship meets contemporary design, 
                creating pieces that bring warmth to everyday moments.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                  Our Ceramic
                  <span className="block text-primary">Story</span>
                </h2>
                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    Founded with a passion for handmade ceramics, TFstudio is more than just a pottery 
                    studio – it's a celebration of the ancient art of ceramics in the modern world.
                  </p>
                  <p>
                    Every piece that emerges from our kilns carries the mark of human hands, the 
                    unpredictability of fire, and the story of clay transformed. We believe in the 
                    beauty of imperfection, the warmth of handmade objects, and the joy of creating 
                    functional art for everyday life.
                  </p>
                  <p>
                    Our studio is a place where traditional techniques meet contemporary design, 
                    where each ceramic piece is born from a dialogue between the potter, the clay, 
                    and the creative spirit that guides our hands.
                  </p>
                </div>

                <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <h3 className="text-4xl font-bold text-primary mb-2">500+</h3>
                    <p className="text-muted-foreground">Pieces Created</p>
                  </div>
                  <div className="text-center">
                    <h3 className="text-4xl font-bold text-primary mb-2">5</h3>
                    <p className="text-muted-foreground">Years of Craft</p>
                  </div>
                  <div className="text-center">
                    <h3 className="text-4xl font-bold text-primary mb-2">200+</h3>
                    <p className="text-muted-foreground">Happy Customers</p>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <img
                  src={processImage}
                  alt="Ceramic artist working at pottery wheel in TFstudio"
                  className="w-full h-96 lg:h-[500px] object-cover rounded-2xl ceramic-shadow"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-foreground/20 to-transparent"></div>
              </div>
            </div>

            {/* Values Section */}
            <div className="mb-20">
              <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-foreground">
                Our Values
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {values.map((value, index) => (
                  <Card key={index} className="border-0 ceramic-shadow hover:scale-105 ceramic-transition text-center">
                    <CardContent className="pt-8 pb-6">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-6">
                        {value.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-3">
                        {value.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Timeline Section */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-foreground">
                Our Journey
              </h2>
              
              <div className="max-w-4xl mx-auto">
                {timeline.map((item, index) => (
                  <div key={index} className="relative pl-8 pb-12 last:pb-0">
                    {/* Timeline line */}
                    {index !== timeline.length - 1 && (
                      <div className="absolute left-[15px] top-8 w-0.5 h-full bg-border"></div>
                    )}
                    
                    {/* Timeline dot */}
                    <div className="absolute left-0 top-0 w-8 h-8 bg-primary rounded-full border-4 border-background"></div>
                    
                    {/* Content */}
                    <div className="ml-8">
                      <span className="inline-block px-4 py-1 bg-primary/10 text-primary text-sm font-bold rounded-full mb-3">
                        {item.year}
                      </span>
                      <h3 className="text-2xl font-bold text-foreground mb-2">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-lg">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Image Gallery Section */}
        <section className="py-20 subtle-gradient">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-foreground">
              Studio Life
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <img
                src={heroImage}
                alt="Ceramic workspace at TFstudio"
                className="w-full h-80 object-cover rounded-lg ceramic-shadow hover:scale-105 ceramic-transition"
              />
              <img
                src={processImage}
                alt="Hand-throwing pottery on the wheel"
                className="w-full h-80 object-cover rounded-lg ceramic-shadow hover:scale-105 ceramic-transition"
              />
              <img
                src={featuredCeramics}
                alt="Finished ceramic pieces at TFstudio"
                className="w-full h-80 object-cover rounded-lg ceramic-shadow hover:scale-105 ceramic-transition"
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Visit Our
              <span className="block text-primary mt-2">Studio</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Interested in learning more or visiting our studio? We'd love to share our passion for ceramics with you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="ceramic-shadow">
                <a href="https://shop.tfstudio.website" target="_blank" rel="noopener noreferrer">
                  Shop Our Collection
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/journal">
                  Read Our Journal
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
