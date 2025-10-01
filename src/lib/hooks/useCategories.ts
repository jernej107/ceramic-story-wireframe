import { useQuery } from '@tanstack/react-query';
import { fetchFromDirectus } from '../directus';

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
      let endpoint = '/items/categories?fields=*';
      
      if (options.type) {
        endpoint += `&filter[type][_eq]=${options.type}`;
      }

      const response = await fetchFromDirectus(endpoint);
      return response.data as Category[];
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};
