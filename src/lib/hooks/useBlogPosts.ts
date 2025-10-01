import { useQuery } from '@tanstack/react-query';
import { fetchFromDirectus } from '../directus';

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
  category: Category | number;
  featured_image: string;
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
      let endpoint = '/items/blog_posts?fields=*,category.*&sort=-published_at';
      
      if (options.category) {
        endpoint += `&filter[category][slug][_eq]=${options.category}`;
      }

      if (options.limit) {
        endpoint += `&limit=${options.limit}`;
      }

      const response = await fetchFromDirectus(endpoint);
      return response.data as BlogPost[];
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
