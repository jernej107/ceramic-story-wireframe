import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import featuredCeramics from "@/assets/featured-ceramics.jpg";
import { useState } from "react";
import { useBlogPosts } from "@/lib/hooks/useBlogPosts";
import { useCategories } from "@/lib/hooks/useCategories";
import { getDirectusImageUrl } from "@/lib/directus";
import { format } from "date-fns";

const Journal = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  
  // Fetch blog posts from Directus
  const { data: blogPosts, isLoading: postsLoading, error: postsError } = useBlogPosts({
    category: selectedCategory,
  });
  
  // Fetch categories from Directus
  const { data: categoriesData, isLoading: categoriesLoading } = useCategories({ 
    type: 'blog' 
  });
  
  // Prepare categories with "All" option
  const categories = categoriesData 
    ? [{ id: 0, name: "All", slug: undefined }, ...categoriesData]
    : [{ id: 0, name: "All", slug: undefined }];

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
        <section className="py-8 bg-background border-b border-border/20">
          <div className="container mx-auto px-4">
            {categoriesLoading ? (
              <div className="flex gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-10 w-24 bg-muted animate-pulse rounded-md" />
                ))}
              </div>
            ) : (
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={category.slug === selectedCategory ? "default" : "outline"}
                    className="whitespace-nowrap"
                    onClick={() => setSelectedCategory(category.slug)}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Journal Posts Grid */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            {postsLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i} className="border-0 ceramic-shadow overflow-hidden">
                    <div className="h-64 bg-muted animate-pulse" />
                    <CardHeader className="p-6">
                      <div className="h-4 bg-muted animate-pulse rounded mb-4" />
                      <div className="h-6 bg-muted animate-pulse rounded" />
                    </CardHeader>
                    <CardContent className="px-6 pb-6">
                      <div className="h-20 bg-muted animate-pulse rounded" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : postsError ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  Unable to load blog posts. Please try again later.
                </p>
              </div>
            ) : !blogPosts || blogPosts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No blog posts found{selectedCategory ? ' in this category' : ''}.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post) => {
                  const categoryName = typeof post.category === 'object' ? post.category.name : '';
                  const imageUrl = post.featured_image_url 
                    ? getDirectusImageUrl(post.featured_image_url)
                    : featuredCeramics;
                  const formattedDate = post.published_at 
                    ? format(new Date(post.published_at), 'MMMM dd, yyyy')
                    : '';
                  const readTime = post.read_time_minutes 
                    ? `${post.read_time_minutes} min read`
                    : '5 min read';
                  
                  return (
                    <Card key={post.id} className="group hover:-translate-y-2 ceramic-transition border-0 ceramic-shadow overflow-hidden">
                      <div className="relative overflow-hidden">
                        <img
                          src={imageUrl}
                          alt={post.title}
                          className="w-full h-64 object-cover group-hover:scale-110 ceramic-transition"
                        />
                        {categoryName && (
                          <div className="absolute top-4 left-4">
                            <span className="inline-block px-4 py-2 bg-primary text-primary-foreground text-xs font-bold rounded-full uppercase tracking-wide">
                              {categoryName}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <CardHeader className="p-6">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          {formattedDate && (
                            <div className="flex items-center gap-1">
                              <Calendar size={14} />
                              <span>{formattedDate}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <Clock size={14} />
                            <span>{readTime}</span>
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
                  );
                })}
              </div>
            )}
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
