import type { QueryItem } from '../../app/controllers/SearchController.d';

export default function getQueryItem(
  id: number,
  rating: number,
  imagePath: string | null,
  listName: string,
  name: string,
) {
  const qItem: QueryItem = {
    id,
    imagePath,
    list_name: listName,
    name,
  };

  return qItem;
}