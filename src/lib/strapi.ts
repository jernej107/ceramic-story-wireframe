const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_URL = import.meta.env.VITE_STRAPI_API_URL || 'http://localhost:1337/api';

export interface StrapiImage {
  id: number;
  url: string;
  alternativeText?: string;
  caption?: string;
  width: number;
  height: number;
}

export interface StrapiImageData {
  data: {
    id: number;
    attributes: StrapiImage;
  };
}

export const getStrapiImageUrl = (url: string): string => {
  if (url.startsWith('http')) {
    return url;
  }
  return `${STRAPI_URL}${url}`;
};

export const fetchFromStrapi = async (endpoint: string) => {
  const url = `${STRAPI_API_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Strapi request failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Strapi fetch error:', error);
    throw error;
  }
};
