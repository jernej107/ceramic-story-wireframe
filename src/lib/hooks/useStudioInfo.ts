import { useQuery } from '@tanstack/react-query';
import { fetchFromDirectus, DirectusImage } from '../directus';

export interface StudioInfo {
  hero_title: string;
  hero_subtitle?: string;
  hero_description: string;
  hero_image: string;
  about_title: string;
  about_description: string;
  about_image: string;
  years_experience: string;
  pieces_created: string;
  shop_url: string;
}

export const useStudioInfo = () => {
  return useQuery({
    queryKey: ['studio-info'],
    queryFn: async () => {
      const response = await fetchFromDirectus('/items/studio_info?fields=*');
      return response.data?.[0] as StudioInfo | null;
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};
