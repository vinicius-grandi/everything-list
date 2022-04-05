import { Request, Response } from 'express';
import { getAnimeSearch, getMangaSearch } from '../../services/animes/jikanapi';
import getQueryItem from '../../utils/db/getQueryItem';
import db from '../models';

const { Anime } = db;
type lists = 'animes' | 'mangas';

const ApiController = {
  async animes(animeId?: string, query = '?order_by=title') {
    const animeOrAnimes = await getAnimeSearch(query);
    const animes = Array.isArray(animeOrAnimes)
      ? animeOrAnimes
      : [animeOrAnimes];
    const data = animes.map((anime) => {
      const animeRating = Anime.findByPk(animeId);
      const {
        mal_id: id,
        images: {
          jpg: { image_url: imagePath },
        },
        title,
      } = anime;
      return getQueryItem(
        id,
        animeRating === null ? 0 : animeRating.rating,
        imagePath,
        'animes',
        title,
      );
    });
    return data;
  },

  async mangas(mangaId?: string, query = '?order_by=title') {
    const mangas = await getMangaSearch(query);
    const data = mangas.map((manga) => {
      let rating = 0;
      if (db.Manga) {
        const mangaFromDB = db.Manga.findByPk(mangaId);
        rating = mangaFromDB.rating;
      }
      const {
        mal_id: id,
        images: {
          jpg: { image_url: imagePath },
        },
        title,
      } = manga;
      return getQueryItem(id, rating, imagePath, 'animes', title);
    });
    return data;
  },

  async getItems(req: Request, res: Response) {
    const list = req.baseUrl.slice(1) as lists;
    const items = await this[list]();

    res.json({ data: items });
  },

  async getAnimeOrManga(req: Request, res: Response) {
    const list = req.baseUrl.slice(1) as lists;
    const { id } = req.params;
    const items = await this[list](id, `/${id}`);

    res.json({ data: items });
  },

  async getComments(req: Request, res: Response) {
    const { id } = req.params;
    const listName = req.baseUrl.slice(1);
    const reviews = await db.Review.findAll({
      where: {
        list_name: listName,
        item_id: id,
      },
      attributes: ['message', 'rating', 'created_at', 'updated_at'],
      include: {
        model: db.User,
        as: 'review_user',
        attributes: ['username'],
      },
    });

    res.json(reviews);
  },
};

export default ApiController;
