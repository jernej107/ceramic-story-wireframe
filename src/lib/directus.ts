const DIRECTUS_URL = import.meta.env.VITE_DIRECTUS_URL || 'http://localhost:8055';
const DIRECTUS_API_URL = import.meta.env.VITE_DIRECTUS_API_URL || 'http://localhost:8055';

export interface DirectusImage {
  id: string;
  filename_disk: string;
  filename_download: string;
  title?: string;
  description?: string;
  width: number;
  height: number;
}

export const getDirectusImageUrl = (imageId: string): string => {
  if (!imageId) return '';
  return `${DIRECTUS_URL}/assets/${imageId}`;
};

export const fetchFromDirectus = async (endpoint: string) => {
  const url = `${DIRECTUS_API_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Directus request failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Directus fetch error:', error);
    throw error;
  }
};
