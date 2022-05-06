import { Lists } from '../../app/controllers/ApiController.d';
import type { QueryItem } from '../../app/controllers/SearchController.d';

export default function getQueryItem(
  id: number | string,
  rating: number,
  imagePath: string | null,
  listName: Lists | 'weapons',
  name: string,
) {
  const qItem: QueryItem = {
    id,
    rating,
    imagePath,
    list_name: listName,
    name,
  };

  return qItem;
}
