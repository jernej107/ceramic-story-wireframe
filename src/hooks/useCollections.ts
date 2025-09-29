import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Collection {
  id: string;
  name: string;
  description: string | null;
  featured_image_url: string | null;
  gallery_images: string[] | null;
  is_featured: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export const useCollections = (featuredOnly = false) => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        setLoading(true);
        let query = supabase
          .from('collections')
          .select('*')
          .order('display_order', { ascending: true });

        if (featuredOnly) {
          query = query.eq('is_featured', true);
        }

        const { data, error } = await query;

        if (error) {
          throw error;
        }

        setCollections(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, [featuredOnly]);

  return { collections, loading, error };
};