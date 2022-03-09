type hits = {
  id: number;
  pageURL: string;
  type: string;
  tags: string;
  previewURL: string;
  previewWidth: number;
  previewHeight: number;
  webformatURL: string;
  webformatWidth: number;
  webformatHeight: number;
  largeImageURL: string;
  imageWidth: number;
  imageHeight: number;
  imageSize: number;
  views: number;
  downloads: number;
  collections: number;
  likes: number;
  comments: number;
  user_id: number;
  user: string;
  userImageURL: string;
};

type ImagesData = {
  total: number;
  totalHits: number;
  hits: hits[];
};

export const getImage = async (query: string): Promise<ImagesData> => {
  const response = await fetch(
    `https://pixabay.com/api/?key=26064061-081fe40bb4530553eb461e31b&q=${query}&image_type=photo`,
  );
  const images = await response.json();
  return images;
};
