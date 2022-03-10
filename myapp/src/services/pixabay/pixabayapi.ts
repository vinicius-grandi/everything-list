import type { ImagesData } from './pixabayapi.d';

export const getImage = async (query: string): Promise<ImagesData> => {
  const response = await fetch(
    `https://pixabay.com/api/?key=26064061-081fe40bb4530553eb461e31b&q=${query}&image_type=photo`,
  );
  const images = await response.json();
  return images;
};
