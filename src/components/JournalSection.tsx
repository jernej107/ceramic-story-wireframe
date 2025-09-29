import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { useBlogPosts } from "@/hooks/useBlogPosts";

const JournalSection = () => {
  const { posts, loading, error } = useBlogPosts(true, 3);

  if (loading) {
    return (
      <section id="journal" className="py-12 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-8 text-foreground">
              Studio Journal
            </h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
              Stories from the studio, insights into our ceramic process, and reflections 
              on the art of handmade pottery.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="rounded-3xl overflow-hidden">
                <CardHeader className="p-8">
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-4" />
                  <div className="h-6 bg-gray-200 rounded animate-pulse mb-4" />
                  <div className="h-20 bg-gray-200 rounded animate-pulse" />
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="journal" className="py-12 bg-background">
        <div className="container mx-auto px-6 text-center">
          <p className="text-red-500">Error loading blog posts: {error}</p>
        </div>
      </section>
    );
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'No date';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section id="journal" className="py-12 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold mb-8 text-foreground">
            Studio Journal
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            Stories from the studio, insights into our ceramic process, and reflections 
            on the art of handmade pottery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {posts.map((post) => (
            <Card key={post.id} className="group hover:-translate-y-2 transition-all duration-300 border-0 bg-white shadow-lg hover:shadow-xl rounded-3xl overflow-hidden">
              <CardHeader className="p-8">
                <div className="flex items-center gap-2 text-sm text-foreground/60 mb-4">
                  <Calendar size={16} />
                  <span>{formatDate(post.published_at)}</span>
                  <Clock size={16} />
                  <span>{post.read_time_minutes} min read</span>
                </div>
                {post.categories && (
                  <span className="inline-block px-4 py-2 bg-foreground/10 text-foreground text-xs font-bold rounded-full w-fit mb-4 uppercase tracking-wide">
                    {post.categories.name}
                  </span>
                )}
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

        <div className="text-center">
          <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 px-12 py-6 rounded-full text-lg font-medium">
            View All Posts
          </Button>
        </div>
      </div>
    </section>
  );
};

export default JournalSection;