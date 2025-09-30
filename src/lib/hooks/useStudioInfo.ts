import { useQuery } from '@tanstack/react-query';
import { fetchFromStrapi, StrapiImage } from '../strapi';

export interface StudioInfo {
  hero_title: string;
  hero_subtitle?: string;
  hero_description: string;
  hero_image: StrapiImage;
  about_title: string;
  about_description: string;
  about_image: StrapiImage;
  years_experience: string;
  pieces_created: string;
  shop_url: string;
}

export const useStudioInfo = () => {
  return useQuery({
    queryKey: ['studio-info'],
    queryFn: async () => {
      const response = await fetchFromStrapi('/studio-info?populate=*');
      return response.data?.attributes as StudioInfo | null;
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};
