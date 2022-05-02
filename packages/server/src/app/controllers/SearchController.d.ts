import type { Anime } from '../../services/animes/jikanapi.d';

export type getAnimeOrManga = (
  query: string,
  method: 'getAnimeSearch' | 'getMangaSearch',
  additionalParams: string,
) => Promise<
  | Anime[]
  | {
      id: number;
      imagePath: string | null;
      list_name: string;
      name: string;
    }
  | null
>;

export type QueryItem = {
  list_name: string;
  rating: number;
  id: number | string;
  name: string;
  imagePath: string | null;
} | null;

export type QueryResult = QueryItem[];

export interface IQueryParams {
  q: string;
  f: 'an' | 'mg' | 'wp';
}

export type getWeapon = (
  query: string,
  options?: Partial<UpdateOptions>,
) => Promise<any>;
