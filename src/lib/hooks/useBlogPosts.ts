import { useQuery } from '@tanstack/react-query';
import { fetchFromStrapi, StrapiImage } from '../strapi';

export interface Category {
  id: number;
  name: string;
  slug: string;
  type: 'blog' | 'product';
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: Category;
  featured_image: StrapiImage;
  author: string;
  published_at: string;
  read_time: number;
}

interface UseBlogPostsOptions {
  category?: string;
  limit?: number;
}

export const useBlogPosts = (options: UseBlogPostsOptions = {}) => {
  return useQuery({
    queryKey: ['blog-posts', options],
    queryFn: async () => {
      let endpoint = '/blog-posts?populate=*&sort=published_at:desc';
      
      if (options.category) {
        endpoint += `&filters[category][slug][$eq]=${options.category}`;
      }

      if (options.limit) {
        endpoint += `&pagination[limit]=${options.limit}`;
      }

      const response = await fetchFromStrapi(endpoint);
      return response.data?.map((item: any) => ({
        id: item.id,
        ...item.attributes,
      })) as BlogPost[];
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
