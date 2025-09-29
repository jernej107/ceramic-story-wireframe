import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  featured_image_url: string | null;
  author: string;
  published_at: string | null;
  read_time_minutes: number;
  category_id: string | null;
  slug: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  categories?: {
    name: string;
  };
}

export const useBlogPosts = (publishedOnly = true, limit?: number) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        let query = supabase
          .from('blog_posts')
          .select(`
            *,
            categories:category_id (
              name
            )
          `)
          .order('published_at', { ascending: false });

        if (publishedOnly) {
          query = query.eq('is_published', true);
        }

        if (limit) {
          query = query.limit(limit);
        }

        const { data, error } = await query;

        if (error) {
          throw error;
        }

        setPosts(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [publishedOnly, limit]);

  return { posts, loading, error };
};