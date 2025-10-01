import { useQuery } from '@tanstack/react-query';
import { fetchFromDirectus } from '../directus';

export interface Collection {
  id: number;
  name: string;
  description?: string;
  featured_image: string;
  gallery_images?: string[];
  display_order: number;
  is_featured: boolean;
}

interface UseCollectionsOptions {
  featured?: boolean;
}

export const useCollections = (options: UseCollectionsOptions = {}) => {
  return useQuery({
    queryKey: ['collections', options],
    queryFn: async () => {
      let endpoint = '/items/collections?fields=*&sort=display_order';
      
      if (options.featured) {
        endpoint += '&filter[is_featured][_eq]=true';
      }

      const response = await fetchFromDirectus(endpoint);
      return response.data as Collection[];
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
