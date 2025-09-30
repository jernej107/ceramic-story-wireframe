import { useQuery } from '@tanstack/react-query';
import { fetchFromStrapi } from '../strapi';

export interface Category {
  id: number;
  name: string;
  slug: string;
  type: 'blog' | 'product';
}

interface UseCategoriesOptions {
  type?: 'blog' | 'product';
}

export const useCategories = (options: UseCategoriesOptions = {}) => {
  return useQuery({
    queryKey: ['categories', options],
    queryFn: async () => {
      let endpoint = '/categories';
      
      if (options.type) {
        endpoint += `?filters[type][$eq]=${options.type}`;
      }

      const response = await fetchFromStrapi(endpoint);
      return response.data?.map((item: any) => ({
        id: item.id,
        ...item.attributes,
      })) as Category[];
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};
