import { useQuery } from '@tanstack/react-query';
import { fetchFromStrapi, StrapiImage } from '../strapi';

export interface Collection {
  id: number;
  name: string;
  description?: string;
  featured_image: StrapiImage;
  gallery_images?: StrapiImage[];
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
      let endpoint = '/collections?populate=*&sort=display_order:asc';
      
      if (options.featured) {
        endpoint += '&filters[is_featured][$eq]=true';
      }

      const response = await fetchFromStrapi(endpoint);
      return response.data?.map((item: any) => ({
        id: item.id,
        ...item.attributes,
      })) as Collection[];
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
