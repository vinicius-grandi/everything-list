import { Request, Response } from 'express';
import { Op, UpdateOptions } from 'sequelize';
import logger from 'jet-logger';
import * as jikanapi from '../../services/animes/jikanapi';
import db from '../models';
import type { DataAndPagination } from '../../services/animes/jikanapi.d';
import type {
  IQueryParams,
  QueryItem,
  QueryResult,
  getAnimeOrManga,
  getWeapon,
  getMovieOrBook,
} from './SearchController.d';
import { WeaponAttributes } from '../models/Weapon';
import getQueryItem from '../../utils/db/getQueryItem';
import getMovieSearch, { getMovieByTitle } from '../../services/movies/omdbapi';
import findOrCreateItem from '../../utils/db/findOrCreateItem';
import getBookSearch from '../../services/books/googlebooksapi';

const { Weapon } = db;

const SearchController = {
  queryItem: {
    an: async (method: getAnimeOrManga, query: string) =>
      method(query, 'getAnimeSearch', '&limit=10'),

    ma: async (method: getAnimeOrManga, query: string) =>
      method(query, 'getMangaSearch', '&limit=10'),

    we: async (method: getWeapon, query: string) =>
      method(query, { limit: 10 }),

    mo: async (method: getMovieOrBook, query: string) => method(query, false),

    bo: async (method: getMovieOrBook, query: string) => method(query, false),
  },

  async getAnimeOrManga(
    query: string,
    method: 'getAnimeSearch' | 'getMangaSearch',
    additionalParams: string,
  ) {
    const animeOrManga = (await jikanapi[method](
      `?q=${query}${additionalParams}`,
    )) as DataAndPagination;
    const meth = method === 'getMangaSearch' ? 'mangas' : 'animes';
    if (animeOrManga.data.length === 1) {
      const {
        mal_id: malId,
        images: {
          jpg: { image_url: imageUrl },
        },
        title,
      } = animeOrManga.data[0];
      return {
        id: malId,
        imagePath: imageUrl,
        list_name: meth,
        name: title,
      };
    }
    const promiseRes: Promise<QueryItem[]> = Promise.all(
      animeOrManga.data.map(
        async ({
          mal_id: malId,
          title,
          images: {
            jpg: { image_url: ImageUrl },
          },
        }) =>
          getQueryItem(
            malId,
            (
              await findOrCreateItem(
                malId,
                meth === 'animes' ? 'Anime' : 'Manga',
              )
            ).rating,
            ImageUrl,
            meth,
            title,
          ),
      ),
    );
    const res = await promiseRes;
    return animeOrManga === undefined ? null : res;
  },

  async getBook(query: string, justOneBook: boolean) {
    if (justOneBook) {
      const bookData = await getBookSearch(`?q=${query}&maxResults=1`);
      if (!bookData) return null;
      const [
        {
          volumeInfo: {
            title,
            imageLinks: { thumbnail },
          },
          id,
        },
      ] = bookData.items;
      const movieFromDb = await findOrCreateItem(id, 'Book');

      return getQueryItem(id, movieFromDb.rating, thumbnail, 'books', title);
    }
    const booksData = await getBookSearch(`?q=${query}&maxResults=10`);
    const data = booksData.items.map(async ({ volumeInfo, id }) =>
      getQueryItem(
        id,
        (await findOrCreateItem(id, 'Book')).rating,
        volumeInfo.imageLinks
          ? volumeInfo.imageLinks.thumbnail ??
              volumeInfo.imageLinks.smallThumbnail
          : null,
        'books',
        volumeInfo.title,
      ),
    );
    const res = await Promise.all(data);
    return res;
  },

  async getWeapon(query: string, options: Partial<UpdateOptions> = {}) {
    try {
      const weapon = await Weapon.findAll({
        where: {
          name: {
            [Op.iLike]: `%${query}%`,
          },
        },
        ...options,
      });
      if (!weapon) return null;
      if (weapon.length === 1) {
        const [{ id, rating, imagePath, name }] = weapon;
        return getQueryItem(id, rating, imagePath, 'weapons', name);
      }
      const res: QueryItem[] = weapon.map(
        ({ id, imagePath, name, rating }: WeaponAttributes & { id: number }) =>
          getQueryItem(id, rating, imagePath, 'weapons', name),
      );
      return res;
    } catch (error) {
      logger.err(error);
      return null;
    }
  },

  async getMovie(query: string, isJustOne: boolean) {
    if (isJustOne) {
      const { Poster, Title, imdbID } = await getMovieByTitle(`t=${query}`);
      const movieFromDb = await findOrCreateItem(imdbID, 'Movie');

      return getQueryItem(imdbID, movieFromDb.rating, Poster, 'movies', Title);
    }
    const movieData = await getMovieSearch(`s=${query}`);
    const data = movieData.Search.map(async ({ Poster, Title, imdbID }) =>
      getQueryItem(
        imdbID,
        (await findOrCreateItem(imdbID, 'Movie')).rating,
        Poster,
        'movies',
        Title,
      ),
    );
    const res = await Promise.all(data);
    return res;
  },

  async find(
    req: Request<unknown, unknown, unknown, IQueryParams>,
    res: Response,
  ) {
    const { q: query, f: filter } = req.query;
    const queryResult: QueryResult = [];
    try {
      if (filter === undefined) {
        const anime = (await this.getAnimeOrManga(
          query,
          'getAnimeSearch',
          '&limit=1',
        )) as QueryItem;
        const weapon = (await this.getWeapon(query, { limit: 1 })) as QueryItem;
        const manga = (await this.getAnimeOrManga(
          query,
          'getMangaSearch',
          '&limit=1',
        )) as QueryItem;
        const movie = (await this.getMovie(query, true)) as QueryItem;
        const book = (await this.getBook(query, true)) as QueryItem;

        queryResult.push(weapon, anime, manga, movie, book);
        return res.json(queryResult.filter((val) => val?.id !== undefined));
      }
      const methodsMap = new Map();

      const {
        getAnimeOrManga: getAnOrMn,
        getWeapon: getWe,
        getMovie: getMo,
        getBook: getBo,
      } = this;
      // filters
      methodsMap.set('ma', getAnOrMn);
      methodsMap.set('an', getAnOrMn);
      methodsMap.set('we', getWe);
      methodsMap.set('mo', getMo);
      methodsMap.set('bo', getBo);

      const queryItems: QueryItem[] = (await this.queryItem[filter](
        methodsMap.get(filter),
        query,
      )) as QueryItem[];
      return res.json(queryItems.filter((val) => val?.id !== undefined));
    } catch (error) {
      logger.err(error);
      return res.status(500).json({ msg: 'Internal Server Error' });
    }
  },
};

export default SearchController;
