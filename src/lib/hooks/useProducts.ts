import { useQuery } from '@tanstack/react-query';
import { fetchFromStrapi, StrapiImage } from '../strapi';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  images: StrapiImage[];
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
      let endpoint = '/products?populate=*';
      
      const filters: string[] = [];
      
      if (options.secondChance !== undefined) {
        filters.push(`filters[is_second_chance][$eq]=${options.secondChance}`);
      }

      if (options.available !== undefined) {
        filters.push(`filters[is_available][$eq]=${options.available}`);
      }

      if (filters.length > 0) {
        endpoint += '&' + filters.join('&');
      }

      const response = await fetchFromStrapi(endpoint);
      return response.data?.map((item: any) => ({
        id: item.id,
        ...item.attributes,
      })) as Product[];
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
