import { Request, Response } from 'express';
import logger from 'jet-logger';
import { getAnimeSearch, getMangaSearch } from '../../services/animes/jikanapi';
import getBookSearch from '../../services/books/googlebooksapi';
import getQueryItem from '../../utils/db/getQueryItem';
import db from '../models';

const { Anime } = db;
type Lists = 'animes' | 'mangas' | 'books';

const ApiController = {
  async animes(animeId?: string, query = '?order_by=title') {
    const animeOrAnimes = await getAnimeSearch(query);
    const animes = Array.isArray(animeOrAnimes)
      ? animeOrAnimes
      : [animeOrAnimes];
    const data = animes.map((anime) => {
      const animeRating = Anime.findOrCreate({
        where: { id: anime.mal_id },
        defaults: {
          id: anime.mal_id,
          rating: 0,
        },
      });
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

  async books(page = 1) {
    const books = await getBookSearch(
      `a&maxResults=20&startIndex=${(page - 1) * 20}`,
    );
    const data = books.items.map((book) => {
      let rating = 0;
      if (db.Book) {
        const bookFromDB = db.Book.findOrCreate({
          where: { id: book.id },
          defaults: { id: book.id },
        });
        rating = bookFromDB.rating;
      }
      const {
        id,
        volumeInfo: {
          imageLinks: { thumbnail },
          title,
        },
      } = book;
      return getQueryItem(id, rating, thumbnail, 'animes', title);
    });
    return data;
  },

  async mangas(mangaId?: string, query = '?order_by=title') {
    const mangas = await getMangaSearch(query);
    const data = mangas.map((manga) => {
      let rating = 0;
      if (db.Manga) {
        const mangaFromDB = db.Manga.findOrCreate({
          where: { id: manga.mal_id },
          defaults: { id: manga.mal_id },
        });
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
    const list = req.baseUrl.slice(1) as Lists;
    try {
      const items = await this[list]();
      return res.json({ data: items });
    } catch (error) {
      logger.err(error);
      return res.json({ data: null });
    }
  },

  async getAnimeOrManga(req: Request, res: Response) {
    const list = req.baseUrl.slice(1) as Lists;
    const { id } = req.params;
    if (list === 'animes' || list === 'mangas') {
      const items = await this[list](id, `/${id}`);
      res.json({ data: items });
    }
    res.status(404).json({ error: 'not found' });
  },

  async getComments(req: Request, res: Response) {
    const { id } = req.params;
    const listName = req.baseUrl.slice(1);
    try {
      const reviews = await db.Review.findAll({
        where: {
          list_name: listName,
          item_id: id,
        },
        attributes: ['message', 'rating', 'created_at', 'updated_at'],
        include: {
          model: db.User,
          as: 'review_user',
          attributes: ['id', 'username'],
        },
      });

      return res.json(reviews);
    } catch (error) {
      logger.err(error);
      return res.status(500).json({ error: 'internal server error' });
    }
  },
};

export default ApiController;
