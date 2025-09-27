import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight } from "lucide-react";

const JournalSection = () => {
  const journalPosts = [
    {
      title: "The Art of Ceramic Glazing",
      excerpt: "Explore the magical transformation that happens in the kiln when clay meets fire and creates beautiful ceramic glazes.",
      date: "March 15, 2024",
      readTime: "5 min read",
      category: "Technique",
    },
    {
      title: "Finding Beauty in Imperfection",
      excerpt: "Discover how the Japanese philosophy of wabi-sabi influences our approach to creating authentic, imperfect ceramic pieces.",
      date: "March 10, 2024",
      readTime: "7 min read",
      category: "Philosophy",
    },
    {
      title: "Behind the Wheel: A Day in the Studio",
      excerpt: "Take a peek into the daily rhythm of ceramic creation, from morning preparations to evening kiln loading.",
      date: "March 5, 2024",
      readTime: "4 min read",
      category: "Studio Life",
    },
  ];

  return (
    <section id="journal" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Studio Journal
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Stories from the studio, insights into our ceramic process, and reflections 
            on the art of handmade pottery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {journalPosts.map((post, index) => (
            <Card key={index} className="group hover:scale-105 ceramic-transition soft-shadow border-0 bg-card">
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <Calendar size={16} />
                  <span>{post.date}</span>
                  <Clock size={16} />
                  <span>{post.readTime}</span>
                </div>
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full w-fit mb-3">
                  {post.category}
                </span>
                <CardTitle className="text-xl font-semibold text-card-foreground group-hover:text-primary ceramic-transition">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground mb-4 leading-relaxed">
                  {post.excerpt}
                </CardDescription>
                <Button variant="ghost" className="p-0 h-auto font-semibold text-primary hover:text-primary/80 group">
                  Read More 
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 ceramic-transition" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" variant="outline" className="ceramic-transition">
            View All Posts
          </Button>
        </div>
      </div>
    </section>
  );
};

export default JournalSection;