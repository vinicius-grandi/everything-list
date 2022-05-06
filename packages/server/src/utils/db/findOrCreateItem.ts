import db from '../../app/models';
import type { ModelName } from '../../app/controllers/ApiController.d';

export default async function findOrCreateItem(
  id: string | number,
  list: ModelName,
) {
  const [itemFromDb] = await db[list].findOrCreate({
    where: { id },
    defaults: {
      id,
      rating: 0,
    },
  });
  return itemFromDb;
}
