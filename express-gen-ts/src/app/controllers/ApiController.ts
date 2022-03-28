import { Request, Response } from 'express';
import { getAnimeSearch, getMangaSearch } from '../../services/animes/jikanapi';
import getQueryItem from '../../utils/db/getQueryItem';

type lists = 'animes' | 'mangas';

const ApiController = {
  async animes() {
    const animes = await getAnimeSearch('?order_by=title');
    const data = animes.map((anime) => {
      const {
        mal_id: id,
        images: {
          jpg: { image_url: imagePath },
        },
        title,
      } = anime;
      return getQueryItem(id, imagePath, 'animes', title);
    });
    return data;
  },

  async mangas() {
    return getMangaSearch('?order_by=title');
  },

  async getItems(req: Request, res: Response) {
    const list = req.baseUrl.slice(1) as lists;
    const items = await this[list]();

    res.json({ data: items });
  },
};

export default ApiController;
