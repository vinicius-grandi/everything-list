import { Request, Response } from 'express';
import { Op } from 'sequelize';
import * as jikanapi from '../../services/animes/jikanapi';
import db from '../models';
import type { Anime } from '../../services/animes/jikanapi.d';

type QueryItem = {
  list_name: string;
  id: number;
  name: string;
  imagePath: string | null;
} | null;

type QueryResult = QueryItem[];

const { Weapon } = db;

const SearchController = {
  async getAnimeOrManga(
    query: string,
    fn: 'getAnimeSearch' | 'getMangaSearch',
  ) {
    const [animeOrManga] = (await jikanapi[fn](
      `?q=${query}&limit=1`,
    )) as Anime[];
    return animeOrManga === undefined
      ? null
      : {
          id: animeOrManga.mal_id,
          imagePath: animeOrManga.images.jpg.image_url,
          list_name: 'animes',
          name: animeOrManga.title,
        };
  },

  async getWeapon(query: string) {
    const weapon = await Weapon.findOne({
      where: {
        name: {
          [Op.iLike]: `%${query}%`,
        },
      },
      attributes: ['name', 'id'],
    });
    return weapon;
  },

  async find(req: Request, res: Response) {
    const { q: query } = req.query;
    const queryResult: QueryResult = [];
    const anime = await this.getAnimeOrManga(query as string, 'getAnimeSearch');
    const weapon = await this.getWeapon(query as string);
    const manga = await this.getAnimeOrManga(query as string, 'getMangaSearch');

    queryResult.push(weapon, anime, manga);
    return res.json(queryResult.filter((val) => val !== null));
  },
};

export default SearchController;
