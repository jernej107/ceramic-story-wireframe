import { useQuery } from '@tanstack/react-query';
import { fetchFromDirectus } from '../directus';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  images: string[];
  collection: any;
  is_second_chance: boolean;
  is_available: boolean;
}

interface UseProductsOptions {
  secondChance?: boolean;
  available?: boolean;
}

export const useProducts = (options: UseProductsOptions = {}) => {
  return useQuery({
    queryKey: ['products', options],
    queryFn: async () => {
      let endpoint = '/items/products?fields=*';
      
      const filters: string[] = [];
      
      if (options.secondChance !== undefined) {
        filters.push(`filter[is_second_chance][_eq]=${options.secondChance}`);
      }

      if (options.available !== undefined) {
        filters.push(`filter[is_available][_eq]=${options.available}`);
      }

      if (filters.length > 0) {
        endpoint += '&' + filters.join('&');
      }

      const response = await fetchFromDirectus(endpoint);
      return response.data as Product[];
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
