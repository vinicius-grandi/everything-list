import { Request, Response } from 'express';
import { Op, UpdateOptions } from 'sequelize';
import logger from 'jet-logger';
import * as jikanapi from '../../services/animes/jikanapi';
import db from '../models';
import type { Anime } from '../../services/animes/jikanapi.d';
import type {
  IQueryParams,
  QueryItem,
  QueryResult,
  getAnimeOrManga,
  getWeapon,
} from './SearchController.d';
import { WeaponAttributes } from '../models/Weapon';

const { Weapon, Anime } = db;

const SearchController = {
  queryItem: {
    an: async (method: getAnimeOrManga, query: string) =>
      method(query, 'getAnimeSearch', '&limit=10'),

    mg: async (method: getAnimeOrManga, query: string) =>
      method(query, 'getMangaSearch', '&limit=10'),

    wp: async (method: getWeapon, query: string) =>
      method(query, { limit: 10 }),
  },

  async getAnimeOrManga(
    query: string,
    method: 'getAnimeSearch' | 'getMangaSearch',
    additionalParams: string,
  ) {
    const animeOrManga = (await jikanapi[method](
      `?q=${query}${additionalParams}`,
    )) as Anime[];
    const meth = method === 'getMangaSearch' ? 'mangas' : 'animes';
    if (animeOrManga.length === 1) {
      const {
        mal_id: malId,
        images: {
          jpg: { image_url: imageUrl },
        },
        title,
      } = animeOrManga[0];
      return {
        id: malId,
        imagePath: imageUrl,
        list_name: meth,
        name: title,
      };
    }
    const promiseRes: Promise<QueryItem[]> = Promise.all(
      animeOrManga.map(async (elem) => ({
        id: elem.mal_id,
        rating: (
          await db[meth === 'animes' ? 'Anime' : 'Manga'].findOrCreate({
            where: { id: elem.mal_id },
            defaults: { id: elem.mal_id, rating: 0 },
          })
        )[0].rating,
        imagePath: elem.images.jpg.image_url,
        list_name: meth,
        name: elem.title,
      })),
    );
    const res = await promiseRes;
    return animeOrManga === undefined ? null : res;
  },

  async getWeapon(query: string, options: Partial<UpdateOptions> = {}) {
    try {
      const weapon = await Weapon.findAll({
        where: {
          name: {
            [Op.iLike]: `%${query}%`,
          },
        },
        attributes: ['name', 'id', 'imagePath'],
        ...options,
      });
      if (!weapon) return null;
      if (weapon.length === 1) {
        return {
          id: weapon[0].id,
          imagePath: weapon[0].imagePath,
          list_name: 'weapons',
          name: weapon[0].name,
        };
      }
      const res: QueryItem[] = weapon.map(
        (elem: WeaponAttributes & { id: number }) => ({
          id: elem.id,
          imagePath: elem.imagePath,
          list_name: 'weapons',
          name: elem.name,
        }),
      );
      return res;
    } catch (error) {
      logger.err(error);
      return null;
    }
  },

  async find(
    req: Request<unknown, unknown, unknown, IQueryParams>,
    res: Response,
  ) {
    const { q: query, f: filter } = req.query;
    const queryResult: QueryResult = [];
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

      queryResult.push(weapon, anime, manga);
      return res.json(queryResult.filter((val) => val?.id !== undefined));
    }
    const methodsMap = new Map();

    // filters
    methodsMap.set('mg', this.getAnimeOrManga);
    methodsMap.set('an', this.getAnimeOrManga);
    methodsMap.set('wp', this.getWeapon);

    const queryItems: QueryItem[] = await this.queryItem[filter](
      methodsMap.get(filter),
      query,
    );
    return res.json(queryItems.filter((val) => val?.id !== undefined));
  },
};

export default SearchController;
