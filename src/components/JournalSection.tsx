import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { useBlogPosts } from "@/lib/hooks/useBlogPosts";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const JournalSection = () => {
  const { data: posts, isLoading } = useBlogPosts({ limit: 3 });

  const fallbackPosts = [
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

  const displayPosts = posts && posts.length > 0
    ? posts.map(p => ({
        title: p.title,
        excerpt: p.excerpt,
        date: format(new Date(p.published_at), "MMMM d, yyyy"),
        readTime: `${p.read_time} min read`,
        category: typeof p.category === 'object' && p.category !== null && 'name' in p.category ? p.category.name : "Uncategorized",
      }))
    : fallbackPosts;

  return (
    <section id="journal" className="py-12 bg-accent">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold mb-8 text-accent-foreground">
            Studio Journal
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            Stories from the studio, insights into our ceramic process, and reflections 
            on the art of handmade pottery.
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-pulse text-muted-foreground">Loading posts...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {displayPosts.map((post, index) => (
            <Card key={index} className="group hover:-translate-y-2 transition-all duration-300 border-0 bg-background shadow-lg hover:shadow-xl rounded-3xl overflow-hidden">
              <CardHeader className="p-8">
                <div className="flex items-center gap-2 text-sm text-foreground/60 mb-4">
                  <Calendar size={16} />
                  <span>{post.date}</span>
                  <Clock size={16} />
                  <span>{post.readTime}</span>
                </div>
                <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-xs font-bold rounded-full w-fit mb-4 uppercase tracking-wide">
                  {post.category}
                </span>
                <CardTitle className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <CardDescription className="text-foreground/70 mb-6 leading-relaxed text-base">
                  {post.excerpt}
                </CardDescription>
                <Button variant="ghost" className="p-0 h-auto font-bold text-foreground hover:text-primary group text-base">
                  Read More 
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
            ))}
          </div>
        )}

        <div className="text-center">
          <Button asChild size="lg" className="bg-[hsl(var(--button-dark))] text-[hsl(var(--button-dark-foreground))] hover:bg-[hsl(var(--button-dark))]/90 px-12 py-6 rounded-full text-lg font-medium">
            <Link to="/journal">View All Posts</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default JournalSection;