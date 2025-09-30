import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import featuredCeramics from "@/assets/featured-ceramics.jpg";
import ceramicProcess from "@/assets/ceramic-process.jpg";
import secondChanceCeramics from "@/assets/second-chance-ceramics.jpg";

const Journal = () => {
  const journalPosts = [
    {
      title: "The Art of Ceramic Glazing",
      excerpt: "Explore the magical transformation that happens in the kiln when clay meets fire and creates beautiful ceramic glazes. From mixing raw materials to achieving the perfect finish, glazing is where science meets artistry.",
      date: "March 15, 2024",
      readTime: "5 min read",
      category: "Technique",
      image: featuredCeramics,
    },
    {
      title: "Finding Beauty in Imperfection",
      excerpt: "Discover how the Japanese philosophy of wabi-sabi influences our approach to creating authentic, imperfect ceramic pieces. Learn why slight variations make each piece unique and valuable.",
      date: "March 10, 2024",
      readTime: "7 min read",
      category: "Philosophy",
      image: secondChanceCeramics,
    },
    {
      title: "Behind the Wheel: A Day in the Studio",
      excerpt: "Take a peek into the daily rhythm of ceramic creation, from morning preparations to evening kiln loading. Experience the meditative process of working with clay and transforming raw earth into functional art.",
      date: "March 5, 2024",
      readTime: "4 min read",
      category: "Studio Life",
      image: ceramicProcess,
    },
    {
      title: "Sustainable Ceramic Practices",
      excerpt: "Our commitment to eco-friendly materials and processes in ceramic creation. Learn about recycling clay, minimizing waste, and creating pieces that last for generations.",
      date: "February 28, 2024",
      readTime: "6 min read",
      category: "Sustainability",
      image: featuredCeramics,
    },
    {
      title: "The History of Ceramic Art",
      excerpt: "From ancient pottery to contemporary design, explore the rich history of ceramic art and how traditional techniques continue to inspire modern creators.",
      date: "February 20, 2024",
      readTime: "8 min read",
      category: "History",
      image: ceramicProcess,
    },
    {
      title: "Choosing the Right Clay",
      excerpt: "Not all clay is created equal. Discover the different types of clay bodies we use in the studio and how each one brings unique characteristics to the finished piece.",
      date: "February 15, 2024",
      readTime: "5 min read",
      category: "Technique",
      image: secondChanceCeramics,
    },
  ];

  const categories = ["All", "Technique", "Philosophy", "Studio Life", "Sustainability", "History"];

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
                Studio
                <span className="block text-primary mt-2">Journal</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
                Stories from the studio, insights into our ceramic process, and reflections 
                on the art of handmade pottery.
              </p>
            </div>
          </div>
        </section>

        {/* Categories Filter */}
        <section className="py-8 bg-background sticky top-20 z-40 border-b border-border/20">
          <div className="container mx-auto px-4">
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={category === "All" ? "default" : "outline"}
                  className="whitespace-nowrap"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Journal Posts Grid */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {journalPosts.map((post, index) => (
                <Card key={index} className="group hover:-translate-y-2 ceramic-transition border-0 ceramic-shadow overflow-hidden">
                  <div className="relative overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-64 object-cover group-hover:scale-110 ceramic-transition"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="inline-block px-4 py-2 bg-primary text-primary-foreground text-xs font-bold rounded-full uppercase tracking-wide">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  
                  <CardHeader className="p-6">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    
                    <CardTitle className="text-2xl font-bold text-foreground group-hover:text-primary ceramic-transition mb-3">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="px-6 pb-6">
                    <CardDescription className="text-muted-foreground mb-6 leading-relaxed">
                      {post.excerpt}
                    </CardDescription>
                    <Button variant="ghost" className="p-0 h-auto font-semibold text-foreground hover:text-primary group/btn">
                      Read Full Article
                      <ArrowRight size={16} className="ml-2 group-hover/btn:translate-x-1 ceramic-transition" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-20 subtle-gradient">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Stay Inspired
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter for studio updates, new journal posts, and exclusive ceramic insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-6 py-3 rounded-full border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button size="lg" className="ceramic-shadow whitespace-nowrap">
                Subscribe
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Journal;
