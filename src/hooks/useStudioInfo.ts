import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface StudioInfo {
  id: string;
  section_name: 'hero' | 'about' | 'featured' | 'footer';
  title: string | null;
  content: string | null;
  images: string[] | null;
  display_order: number;
  is_active: boolean;
  updated_at: string;
}

export const useStudioInfo = (sectionName?: 'hero' | 'about' | 'featured' | 'footer') => {
  const [studioInfo, setStudioInfo] = useState<StudioInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudioInfo = async () => {
      try {
        setLoading(true);
        let query = supabase
          .from('studio_info')
          .select('*')
          .eq('is_active', true)
          .order('display_order', { ascending: true });

        if (sectionName) {
          query = query.eq('section_name', sectionName);
        }

        const { data, error } = await query;

        if (error) {
          throw error;
        }

        setStudioInfo(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchStudioInfo();
  }, [sectionName]);

  const getSection = (section: 'hero' | 'about' | 'featured' | 'footer') => {
    return studioInfo.find(info => info.section_name === section);
  };

  return { studioInfo, loading, error, getSection };
};