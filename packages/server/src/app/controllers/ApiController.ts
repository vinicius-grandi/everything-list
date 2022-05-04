import { Request, Response } from 'express';
import logger from 'jet-logger';
import {
  getAnimeOrMangaById,
  getAnimeSearch,
} from '../../services/animes/jikanapi';
import getBookSearch, {
  getBookById,
} from '../../services/books/googlebooksapi';
import getMovieSearch, { getMovieById } from '../../services/movies/omdbapi';
import getQueryItem from '../../utils/db/getQueryItem';
import db from '../models';
import type { IQueryParams, Lists, ModelName } from './ApiController.d';

const { Anime } = db;

async function findOrCreateItem(id: string | number, list: ModelName) {
  const [itemFromDb] = await db[list].findOrCreate({
    where: { id },
    defaults: {
      id,
      rating: 0,
    },
  });
  return itemFromDb;
}

const ApiController = {
  async animes(page = 1, query = `?order_by=title&limit=20&page=${page}`) {
    const animeOrAnimes = await getAnimeSearch(query);

    if (!animeOrAnimes) return null;

    const animes = Array.isArray(animeOrAnimes.data)
      ? animeOrAnimes.data
      : [animeOrAnimes.data];

    const animesData = animes.map(async (anime) => {
      const [animeRating] = await Anime.findOrCreate({
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
    const data = await Promise.all(animesData);
    return {
      lastPage:
        'pagination' in animeOrAnimes
          ? animeOrAnimes.pagination.last_visible_page
          : 1,
      data,
    };
  },

  async books(
    page = 1,
    query = `?q=a&maxResults=20&startIndex=${(page - 1) * 20}`,
  ) {
    const books = await getBookSearch(query);
    if (books.items === undefined) {
      const id = query.slice(1);
      const [bookFromDB] = await db.Book.findOrCreate({
        where: { id },
        defaults: {
          id,
          rating: 0,
        },
      });
      return {
        ...books,
        rating: Number(bookFromDB.rating),
      };
    }
    const booksData = books.items.map(async (book) => {
      const [bookFromDB] = await db.Book.findOrCreate({
        where: { id: book.id },
        defaults: {
          id: book.id,
          rating: 0,
        },
      });
      const {
        id,
        volumeInfo: {
          imageLinks: { thumbnail },
          title,
        },
      } = book;
      return getQueryItem(
        id,
        Number(bookFromDB.rating),
        thumbnail,
        'books',
        title,
      );
    });
    const data = await Promise.all(booksData);
    return {
      lastPage: books.maxPage,
      data,
    };
  },

  async mangas(page = 1, query = `?order_by=title&limit=20&page=${page}`) {
    const mangaOrMangas = await getAnimeSearch(query, 'manga');

    if (!mangaOrMangas) return null;

    const mangas = Array.isArray(mangaOrMangas.data)
      ? mangaOrMangas.data
      : [mangaOrMangas.data];

    const animesData = mangas.map(async (manga) => {
      const [mangaRating] = await db.Manga.findOrCreate({
        where: { id: manga.mal_id },
        defaults: {
          id: manga.mal_id,
          rating: 0,
        },
      });
      const {
        mal_id: id,
        images: {
          jpg: { image_url: imagePath },
        },
        title,
      } = manga;
      return getQueryItem(
        id,
        mangaRating === null ? 0 : mangaRating.rating,
        imagePath,
        'animes',
        title,
      );
    });
    const data = await Promise.all(animesData);
    return {
      lastPage:
        'pagination' in mangaOrMangas
          ? mangaOrMangas.pagination.last_visible_page
          : 1,
      data,
    };
  },

  async movies(page = 1, query = `s=aaa&page=${page}`) {
    const movies = await getMovieSearch(query);
    const moviesData = movies.Search.map(async (movie) => {
      const [movieFromDB] = await db.Movie.findOrCreate({
        where: { id: movie.imdbID },
        defaults: {
          id: movie.imdbID,
          rating: 0,
        },
      });
      const { Title: title, imdbID: id, Poster: imagePath } = movie;
      return getQueryItem(
        id,
        Number(movieFromDB.rating),
        imagePath,
        'movies',
        title,
      );
    });
    const data = await Promise.all(moviesData);
    return {
      lastPage: movies.maxPage,
      data,
    };
  },

  async getItems(
    req: Request<unknown, unknown, unknown, IQueryParams>,
    res: Response,
  ) {
    const list = req.baseUrl.slice(1) as Lists;
    const { page } = req.query;
    try {
      const items = await this[list](Number(page) === 0 ? 1 : page);
      if (!items) {
        return { data: [null] };
      }
      const data = {
        pagination: {
          lastVisiblePage: items.lastPage,
        },
        data: items.data,
      };
      return res.json(data);
    } catch (error) {
      logger.err(error);
      return res.json({ data: null });
    }
  },
  item: {
    animes: async (id: string) => {
      const data = await getAnimeOrMangaById(Number(id));
      if (data) {
        const animeFromDb = await findOrCreateItem(id, 'Anime');
        data.rating = animeFromDb.rating;
        return data;
      }
      return data;
    },
    mangas: async (id: string) => {
      const data = await getAnimeOrMangaById(Number(id), 'manga');
      if (data) {
        const mangaFromDb = await findOrCreateItem(id, 'Manga');
        data.rating = mangaFromDb.rating;
        return data;
      }
      return data;
    },
    books: async (id: string) => {
      const data = await getBookById(id);
      if (data) {
        const bookFromDb = await findOrCreateItem(id, 'Book');
        const modifiedData = { ...data, rating: bookFromDb.rating };
        return modifiedData;
      }
      return data;
    },
    movies: async (id: string) => {
      const data = await getMovieById(id);
      if (data) {
        const movieFromDb = await findOrCreateItem(id, 'Movie');
        data.imdbRating = movieFromDb.rating;
        return data;
      }
      return data;
    },
  },

  async getOneItem(
    req: Request<{ id: string }, unknown, unknown, IQueryParams>,
    res: Response,
  ) {
    const list = req.baseUrl.slice(1) as Lists;
    const { id } = req.params;
    try {
      const item = await this.item[list](id);
      if (req.session.authenticated) {
        const verifyReview = await db.Review.findOne({
          where: {
            item_id: req.params.id,
            list_name: list,
            user_id: Number(req.session.user?.id),
          },
        });
        return res.json({
          data: item,
          reviewExists: verifyReview,
        });
      }
      return res.json({ data: item });
    } catch (error) {
      logger.err(error);
      return res.json({ data: null });
    }
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
          attributes: ['id', 'username', 'profile_picture'],
        },
        order: [['created_at', 'DESC']],
      });

      return res.json(reviews);
    } catch (error) {
      logger.err(error);
      return res.status(500).json({ error: 'internal server error' });
    }
  },
};

export default ApiController;
